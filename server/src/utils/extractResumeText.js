// 1 get cv from cloudinary 
// 2 donwload cv from Cloudinary
// 3 extract text 
// 4 return text 

import pdfparser from "pdf-parse"
import axios from "axios";
import { ApiError } from "./ApiError";

const extractResumeText = async (fileUrl) => {
    try {
        const response = await axios.get(fileUrl, {
            responseType: "arraybuffer",
        });

        const resumaDownload = Buffer.from(response.data);

        const pdfData = await pdfparser(resumaDownload);

        if (!pdfData.text || !pdfData.text.trim()) {
            throw new ApiError(400, "No text found in resume.");
        }
        return pdfData.text;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        // Axios-specific errors (download fail, 404, timeout, etc.)
        if (axios.isAxiosError(error)) {
            throw new ApiError(400, "Failed to download resume from URL.");
        }
        throw new ApiError(500, `Internal error: ${error.message}`);
    }
}
export default extractResumeText;

