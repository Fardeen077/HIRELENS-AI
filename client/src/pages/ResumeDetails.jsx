import React from 'react'
import useResumeStore from '../store/useResumeStore';
import { useEffect } from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useParams } from 'react-router-dom';

function ResumeDetails() {
    const { id } = useParams();
    const getResumeId = useResumeStore((s) => s.getResumeId);

    const selectedResume = useResumeStore(
        (s) => s.selectedResume
    );

    const isResumeLoading = useResumeStore(
        (s) => s.isResumeLoading
    );

    const error = useResumeStore((s) => s.error);
    
    useEffect(() => {
        console.log("API calling...");
        getResumeId(id);
    }, [id, getResumeId]);

    if (isResumeLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-3">

                <AiOutlineLoading3Quarters
                    className="text-orange-500 animate-spin"
                    size={40}
                />

                <p className="text-gray-400 text-sm">
                    Loading Resume Details...
                </p>

            </div>
        );
    }

    return (
        <div className="min-h-screen p-6">

            {selectedResume && (
                <div className="text-white">

                    <h1 className="text-2xl font-bold">
                        {selectedResume.fileName}
                    </h1>

                    <h2 className="text-orange-500 text-3xl font-bold mt-4">
                        {selectedResume.matchScore}/100
                    </h2>

                    <h3 className="mt-5 font-semibold">
                        Matched Skills
                    </h3>

                    {selectedResume.matchedSkills?.map((skill, i) => (
                        <p key={i} className="text-gray-300">
                            {skill}
                        </p>
                    ))}

                </div>
            )}

            {error && (
                <p className="text-red-400" role="alert">
                    {error}
                </p>
            )}

        </div>
    )
}

export default ResumeDetails;
