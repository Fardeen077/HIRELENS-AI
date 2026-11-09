import { useEffect } from "react";
import useResumeStore from "../store/useResumeStore";
import { useLocation } from "react-router-dom";

function Analyze() {
    const analysisResume = useResumeStore((s) => s.analysisResume);
    const analysisResult = useResumeStore((s) => s.analysisResult);
    const location = useLocation();
    const { resumeId, jobDescription } = location.state || {};
    // console.log(jobDescription, resumeId, "from analyze"); 
    useEffect(() => {
        const handleAnalysisResume = async () => {
            if (!resumeId || !jobDescription) {
                console.log("Resume or JobDescription missing");
                return;
            }

            try {
                const result = await analysisResume({ resumeId, jobDescription });
                console.log("Analysis result:", result);
            } catch (error) {
                console.log(error?.response?.data?.message || error.message);
            }
        };

        handleAnalysisResume();
    }, [analysisResume, jobDescription, resumeId]);

    const hasAnalysisResult =
        analysisResult &&
        typeof analysisResult === "object" &&
        ("matchScore" in analysisResult || Array.isArray(analysisResult.matchedSkills));

    return (
        <div className="textwhite">
            <h1>Resume Analysis</h1>

            {!resumeId || !jobDescription ? (
                <p>Please open this page from the resume analysis flow.</p>
            ) : hasAnalysisResult ? (
                <div>
                    <h2>Analysis Complete</h2>
                    <p className={`text-3xl font-bold ${analysisResult.matchScore >= 80 ? "text-green-500" : analysisResult.matchScore >= 50 ? "text-orange-500" : "text-red-500"
                        }`}>Match Score: {analysisResult.matchScore}%</p>

                    <h3>Matched Skills</h3>
                    {analysisResult.matchedSkills?.length ? (
                        analysisResult.matchedSkills.map((skill, index) => <p key={index}
                        className="bg-green-500/10 text-green-500 border border-green-500/30 px-3 py-1 rounded-full">{skill}</p>)
                    ) : (
                        <p>No matched skills found.</p>
                    )}

                    <h3>Missing Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {analysisResult.missingSkills?.length ? (
                            analysisResult.missingSkills.map((skill, index) => <p key={index}
                            className="bg-red-500/10 text-red-400 border border-red-500/30 px-3 py-1 rounded-full">{skill}</p>)
                        ) : (
                            <p>No missing skills found.</p>
                        )}
                    </div>

                    <h3>Strengths</h3>
                    {analysisResult.strengths?.length ? (
                        analysisResult.strengths.map((skill, index) => <p className="text-green-400 mb-2" key={index}>{skill}</p>)
                    ) : (
                        <p>No strengths found.</p>
                    )}

                    <h3>Suggestions</h3>
                    {analysisResult.suggestions?.length ? (
                        analysisResult.suggestions.map((item, index) => <p className="text-orange-400 mb-2" key={index}>{item}</p>)
                    ) : (
                        <p>No suggestions available.</p>
                    )}
                </div>
            ) : (
                <p>Analyzing resume...</p>
            )}
        </div>
    );
}

export default Analyze;
