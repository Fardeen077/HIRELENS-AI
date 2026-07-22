// 1 get cv from cloudinary 
// 2 donwload cv from Cloudinary
// 3 extract text 
// 4 return text 
// 6 clean 

import { PDFParse } from "pdf-parse";
import axios from "axios";
import { ApiError } from "./ApiError.js";

const extractResumeText = async (fileUrl) => {
    let parser;
    try {
        const response = await axios.get(fileUrl, {
            responseType: "arraybuffer",
        });

        const resumaDownload = Buffer.from(response.data);

         parser = new PDFParse({ data: resumaDownload });
        // console.log(parser);
        const result = await parser.getText();

        if (!result.text || !result.text.trim()) {
            throw new ApiError(400, "No text found in resume.");
        }
        
        return result.text;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        // Axios-specific errors (download fail, 404, timeout, etc.)
        if (axios.isAxiosError(error)) {
            throw new ApiError(400, "Failed to download resume from URL.");
        }
        throw new ApiError(500, `Internal error: ${error.message}`);
    } finally {
        if (parser) {
            await parser.destroy();
        }
    }
}
export default extractResumeText;

