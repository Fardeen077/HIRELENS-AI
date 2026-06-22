import { Resume } from "../models/resume.model.js";
import cloudinary from "../config/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import fs from "fs";
import { ApiError } from "../utils/ApiError.js";

const uploadResume = asyncHandler(async (req, res) => {
    // upload logic
    if (!req.file) {
        throw new ApiError(400, "Resume file is required")
    }
    console.log("req.file:", req.file);

    const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "raw",
        folder: "resumes",
    });

    const resume = await Resume.create({
        userId: req.user._id,
        fileName: req.file.originalname,
        fileUrl: cloudinaryResponse.secure_url,
    });

    await fs.promises.unlink(req.file.path);

    return res.status(201).json(new ApiResponse(201, resume, "Resume uploaded successfully"));
});

const getMyResumes = asyncHandler(async (req, res) => {
    // fetch resumes
    const resume = await Resume.find({ user: req.user._id });
    if (resume.length === 0) {
        throw new ApiError(404, "No resume found")
    }
    return res.status(200).json(new ApiResponse(200, resume, "Resune fetch successfully"));
});

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
};