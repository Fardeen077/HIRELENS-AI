import { create } from "zustand";
import {
    uploadResumeApi,
    getOwnResumeApi,
    getAllResume,
    deleteResume,
    analysisResumeApi,
} from "../apis/authApi"

const useResumeStore = create((set) => ({
    reumes: [],
    isReumeLoading: false,
    error: null,
}))