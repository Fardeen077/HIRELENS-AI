import mongoose, { Schema } from "mongoose";

const resumeSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
    fileUrl: {
        type: String,
        required: true,
    },
    publicId: {
        type: String,
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100,
        default: null,
    },
    matchedSkills: [{
        type: String,
    }],

    missingSkills: [{
        type: String,
    }],

    strengths: [{
        type: String,
    }],

    weaknesses: [{
        type: String,
    }],

    suggestions: [{
        type: String,
    }],
    feedback: [{
        type: String,
        default: "",
    }],
    analyzedAt: {
        type: Date,
        default: null,
    },
}, { timestamps: true });

export const Resume = mongoose.model("Resume", resumeSchema);