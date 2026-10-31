import React, { useEffect } from 'react'
import useResumeStore from '../store/useResumeStore'
function Resumes() {
    const getOwnResume = useResumeStore((s) => s.getOwnResume);
    const myResumes = useResumeStore((s) => s.myResumes);

    useEffect(() => {
        getOwnResume()
    }, [getOwnResume]);

    // const getPreviewUrl = (url) => {
    //     return url
    //         .replace("/raw/upload/", "/image/upload/")
    //         .replace(".pdf", ".jpg");
    // };
    return (
        <div>
            Resumes

            <div className='mt-5'>
                <ul>
                    {myResumes.map((resume) => (
                        <li key={resume._id}>
                            <h3>{resume.fileName}</h3>
                            {/* <img
                                src={getPreviewUrl(resume.fileUrl)}
                                alt={resume.fileName}
                                className="w-48 h-60  rounded-lg"
                            /> */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Resumes
