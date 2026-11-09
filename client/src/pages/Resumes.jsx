
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useResumeStore from "../store/useResumeStore";

function Resumes() {
    const getOwnResume = useResumeStore((s) => s.getOwnResume);
    const myResumes = useResumeStore((s) => s.myResumes);

    const navigate = useNavigate();

    useEffect(() => {
        getOwnResume();
    }, [getOwnResume]);

    return (
        <div className="min-h-screen p-6 md:p-10">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold ">
                    My Resumes
                </h1>
                <p className="text-gray-400 mt-2">
                    Manage your uploaded resumes and analysis history.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">

                <div className="bg-[#1F2937] p-5 rounded-xl border border-gray-700">
                    <p className="text-gray-400">Total Resumes</p>
                    <h2 className="text-3xl font-bold text-white mt-2">
                        {myResumes.length}
                    </h2>
                </div>

                <div className="bg-[#1F2937] p-5 rounded-xl border border-gray-700">
                    <p className="text-gray-400">Analyzed Resumes</p>
                    <h2 className="text-3xl font-bold text-orange-500 mt-2">
                        {myResumes.filter(
                            (resume) => resume.rating != null
                        ).length}
                    </h2>
                </div>

            </div>

            {/* Resume History */}
            <div>
                <h2 className="text-xl font-semibold text-white mb-5">
                    Resume History
                </h2>

                {myResumes.length === 0 ? (
                    <div className="rounded-xl p-10 text-center">
                        <p className="text-gray-400">
                            No resumes uploaded yet.
                        </p>
                    </div>
                ) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

                        {myResumes.map((resume) => (

                            <div
                                key={resume._id}
                                onClick={() => navigate(`/resumes/${resume._id}`)}
                                className="border border-gray-700
                                rounded-xl p-5 cursor-pointer
                                hover:border-orange-500 transition duration-300"
                            >

                                <div className="flex items-center justify-between mb-5">
                                    <div className="bg-orange-500/10 p-3 rounded-lg">
                                        <span className="text-orange-500 text-2xl">
                                            PDF
                                        </span>
                                    </div>

                                    <span className={`text-xs px-3 py-1 rounded-full ${
                                        resume.rating != null
                                        ? "bg-green-500/10 text-green-400"
                                        : "bg-yellow-500/10 text-yellow-400"
                                    }`}>
                                        {resume.rating != null
                                            ? "Analyzed"
                                            : "Pending"}
                                    </span>
                                </div>

                                <h3 className="text-white font-semibold truncate">
                                    {resume.fileName}
                                </h3>

                                <p className="text-gray-400 text-sm mt-2">
                                    Uploaded Resume
                                </p>

                                <div className="border-t border-gray-700 mt-5 pt-4 flex justify-between items-center">

                                    <div>
                                        <p className="text-gray-400 text-xs">
                                            Match Score
                                        </p>

                                        <h2 className="text-orange-500 text-2xl font-bold">
                                            {resume.rating != null
                                                ? `${resume.rating}/100`
                                                : "N/A"}
                                        </h2>
                                    </div>

                                    <span className="text-orange-500 text-sm">
                                        View Details →
                                    </span>

                                </div>

                            </div>

                        ))}

                    </div>
                )}
            </div>

        </div>
    );
}

export default Resumes;
