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
    rating: {
        type: Number,
        min: 0,
        max: 100,
        default: null,
    },
    feedback: {
        type: String,
        default: "",
    },
    analyzedAt: {
        type: Date,
        default: null,
    }
}, { timeseries: true });

export const Resume = mongoose.model("Resume", resumeSchema);