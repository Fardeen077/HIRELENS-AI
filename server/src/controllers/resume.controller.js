import { Resume } from "../models/resume.model.js";
import cloudinary from "../config/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import fs from "fs";
import { ApiError } from "../utils/ApiError.js";
import { analyzeResume } from "../utils/ai.helper.js"
import extractResumeText from "../utils/extractResumeText.js"

const uploadResume = asyncHandler(async (req, res) => {
    // upload logic
    const userId = req.user._id;
    if (!req.file) {
        throw new ApiError(400, "Resume file is required")
    }
    console.log(req.file);

    const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
        "resource_type": "auto"
    });

    console.log("req.file", req.file);
    console.log("Before upload");

    console.log(cloudinaryResponse);

    const resume = await Resume.create({
        userId: req.user._id,
        fileName: req.file.originalname,
        fileUrl: cloudinaryResponse.secure_url,
        publicId: cloudinaryResponse.public_id
    });

    await fs.promises.unlink(req.file.path);

    return res.status(201).json(new ApiResponse(201, { resume }, "Resume uploaded successfully"));
});

const analysisResume = asyncHandler(async (req, res) => {
    const { jobDescription, resumeId } = req.body;
    const userId = req.user._id;

    if (!resumeId || !jobDescription) {
        throw new ApiError(400, "resumeId  or jobDescription is required")
    }

    const resume = await Resume.findOne({
        _id: resumeId,
        userId
    });

    if (!resume) {
        throw new ApiError(404, "resume not found");
    }

    const resumeExtract = await extractResumeText(resume.fileUrl);

    const result = await analyzeResume(resumeExtract, jobDescription);

    // console.log("Extracted text length:", resumeExtract.length);
    // console.log("Extracted text FULL:", JSON.stringify(resumeExtract));
    // console.log("Extracted text preview:", resumeExtract.slice(0, 300));

    // save result in mongodb
    resume.rating = result.matchScore;
    resume.matchedSkills = result.matchedSkills;
    resume.missingSkills = result.missingSkills;
    resume.strengths = result.strengths;
    resume.weaknesses = result.weaknesses;
    resume.suggestions = result.suggestions;
    resume.feedback = result.feedback;
    resume.analyzedAt = new Date();

    await resume.save();

    return res.status(200).json(new ApiResponse(200, resume, "Resume analyzed successfully"))
});

const getMyResumes = asyncHandler(async (req, res) => {
    // fetch single resumes
    const resume = await Resume.find({ userId: req.user._id });
    if (resume.length === 0) {
        throw new ApiError(404, "No resume found")
    }
    return res.status(200).json(new ApiResponse(200, resume, "Resume fetched successfully"));
});

const getAllResumes = asyncHandler(async (req, res) => {
    // fetched all resume for admin
    const allResumes = await Resume.find();
    if (!allResumes) {
        throw new ApiError(404, "No resume found")
    }
    return res.status(200).json(new ApiResponse(200, allResumes, "All resume fetched successfully"));
})

const deleteResume = asyncHandler(async (req, res) => {
    // delete resume
    const { resumeId } = req.params;
    const resuma = await Resume.findOneAndDelete({
        _id: resumeId,
        userId: req.user._id,
    });

    if (!resuma) {
        throw new ApiError(404, "Resume not found");
    };

    return res.status(200).json(new ApiResponse(200, {}, "Resume deleted successfully"));
});

export {
    uploadResume,
    getMyResumes,
    deleteResume,
    getAllResumes,
    analysisResume
};