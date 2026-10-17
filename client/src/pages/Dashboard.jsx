import { useRef } from "react";
import useAuthStore from "../store/useAuthStore"
import { FaCloudUploadAlt } from "react-icons/fa";
import useResumeStore from "../store/useResumeStore";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const authUser = useAuthStore((s) => s.authUser);
    const fileInputRef = useRef(null);
    const uploadResume = useResumeStore((s)=> s.uploadResume)
    const navigate = useNavigate();

    const handleUplaodResume = async (e) => {
        const resume = e.target.files[0]
        if (!resume) return
        try {
            console.log("Selected file:", resume.name);

            const res = await uploadResume(resume);
            navigate("/analyze")

            console.log("Upload response:", res);
        } catch (error) {
            console.log("Upload error:", error?.response?.data?.message || error.message)
        }
    }
    return (
        <div className="min-h-screen">
            <div className="flex flex-col gap-7">
                <h1 className="text-white justify-center flex">Welcome, {authUser?.username}</h1>

                <div className="flex justify-center">
                    <div
                        className="justify-center flex-col flex items-center cursor-pointer w-4xl h-50 rounded-2xl border-2 border-dashed border-gray-500"
                        onClick={() => fileInputRef.current.click()}
                    >
                        <FaCloudUploadAlt size={52} />
                        <p>Upload your resume</p>

                        <input type="file"
                            accept=".pdf,application/pdf"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleUplaodResume}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dashboard