import { useRef, useState } from "react";
import useAuthStore from "../store/useAuthStore"
import { FaCloudUploadAlt } from "react-icons/fa";
import useResumeStore from "../store/useResumeStore";
import {useNavigate } from "react-router-dom";

function Dashboard() {
    const authUser = useAuthStore((s) => s.authUser);
    // const analysisResume = useResumeStore((s) => s.analysisResume);
    const fileInputRef = useRef(null);
    const uploadResume = useResumeStore((s) => s.uploadResume)
    const navigate = useNavigate();
    const [resume, setResume] = useState(null);
    const [jobDescription, setJobDescription] = useState("");

    const handleUplaod = async () => {
        if (!resume || !jobDescription) {
            console.log("Resume or Jobdescription is required");
        }
        try {
            const uploadedResume = await uploadResume(resume);
            console.log(uploadedResume, "indashboard");

            const resumeId = uploadedResume?._id;
            console.log(resumeId);
            console.log(uploadedResume);

            if (!resumeId) {
                console.log("Resume id is required");
                return;
            }

            navigate("/analyze", {
                state: {
                    resumeId,
                    jobDescription
                }
            });
            fileInputRef.current.value = "";
            setResume(null);
            console.log(jobDescription, resumeId, "from dashboard");
            
        } catch (error) {
            console.log(error?.response?.data?.message || error.message);

        }
    }
    return (
        <div className="min-h-screen">
            <div className="flex flex-col gap-7">
                <h1 className="justify-center flex">Welcome, {authUser?.username}</h1>

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
                            onChange={(e) => setResume(e.target.files[0] || null)}
                        />
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center mt-20">
                <textarea
                    onChange={(e) => setJobDescription(e.target.value)}
                    type="text" placeholder="Plesae enter your Job Description"
                    className="boarder border-gray-500 outline-none border-2 rounded-2xl w-4xl h-50 text-start p-4 text-sm" />
            </div>
            <div className="justify-center items-center flex mt-15">
                <button className="bg-[#f97316] rounded p-2 cursor-pointer hover:bg-[#ea580c] w-30"
                    onClick={handleUplaod}
                >
                    Analize</button>
            </div>
        </div>
    )
}
export default Dashboard