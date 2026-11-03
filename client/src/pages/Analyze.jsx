import React from 'react'
import useResumeStore from "../store/useResumeStore";
import { useLocation } from 'react-router-dom';

function Analyze() {

    const analysisResume = useResumeStore((s) => s.analysisResume);
    const location = useLocation();
    const { resumeId, jobDescription } = location.state || {};
    const [result, setResult] = useState(null);

    useEffact(() => {
        const handleAnalysisResume = async () => {
            if (!resumeId || !jobDescription) {
                console.log(error);
            }
            const analysisData = {
                resumeId,
                jobDescription
            };
            try {
                await analysisResume(analysisData);
                setResult(result);
            } catch (error) {
                console.log(error);
            }
        }
        handleAnalysisResume()
    }, [jobDescription, resumeId]);
    return (
        <div className='textwhite'>
            <h1>Resume Analysis</h1>
            <div>
                {/* analysisResume data */}
                {result && (
                    <div>
                        <h2>Analysis Complete</h2>
                        <div>
                            {JSON.stringify(result)}
                        </div>
                    </div>
                )}

            </div>
        </div>

    )
}

export default Analyze
