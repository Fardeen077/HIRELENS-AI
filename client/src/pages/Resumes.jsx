import React, { useEffect } from 'react'
import useResumeStore from '../store/useResumeStore'
function Resumes() {
    const getOwnResume = useResumeStore((s) => s.getOwnResume);
    const myResumes = useResumeStore((s) => s.myResumes);

    useEffect(() => {
        getOwnResume()
    }, [getOwnResume]);
    return (
        <div className='text-white'>
            Resumes

            <div>
                <ul>
                    {myResumes.map((resume) => (
                        <li key={resume._id}>
                            {resume.fileName}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Resumes
