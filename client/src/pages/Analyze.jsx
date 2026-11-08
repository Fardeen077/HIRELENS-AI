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
                    <p>Match Score: {analysisResult.matchScore}%</p>

                    <h3>Matched Skills</h3>
                    {analysisResult.matchedSkills?.length ? (
                        analysisResult.matchedSkills.map((skill, index) => <p key={index}>{skill}</p>)
                    ) : (
                        <p>No matched skills found.</p>
                    )}

                    <h3>Missing Skills</h3>
                    {analysisResult.missingSkills?.length ? (
                        analysisResult.missingSkills.map((skill, index) => <p key={index}>{skill}</p>)
                    ) : (
                        <p>No missing skills found.</p>
                    )}

                    <h3>Strengths</h3>
                    {analysisResult.strengths?.length ? (
                        analysisResult.strengths.map((skill, index) => <p key={index}>{skill}</p>)
                    ) : (
                        <p>No strengths found.</p>
                    )}

                    <h3>Suggestions</h3>
                    {analysisResult.suggestions?.length ? (
                        analysisResult.suggestions.map((item, index) => <p key={index}>{item}</p>)
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
