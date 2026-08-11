import { create } from "zustand";
import {
    uploadResumeApi,
    getOwnResumeApi,
    getAllResumeApi,
    deleteResumeApi,
    analysisResumeApi,
} from "../apis/authApi"

const useResumeStore = create((set) => ({
    reumes: [],
    isReumeLoading: true,
    error: null,

    uploadResume: async (resume) => {
        set({ isReumeLoading: true, error: null });
        try {
            const res = await uploadResumeApi(resume);
            set({ isReumeLoading: false, resume: res.data });
            return res.data;
        } catch (error) {
            set({ isReumeLoading: false, error: error?.response?.data?.message || "failed to upload resume" });
            throw error;
        }
    },

    getOwnResume: async (userId) => {
        set({ isReumeLoading: true, error: null });
        try {
            const res = await getOwnResumeApi(userId);
            set({ isReumeLoading: false, resume: res.data })
            return res.data;
        } catch (error) {
            set({ isReumeLoading: false, error: error?.response?.data?.message || "failed to fetch own resume" });
            throw error;
        }
    },

    getAllResume: async () => {
        set({ isReumeLoading: true, error: null });
        try {
            const res = await getAllResumeApi();
            set({ isReumeLoading: false, resume: res.data });
            return res.data;
        } catch (error) {
            set({ isReumeLoading: false, error: error?.response?.data?.message || "failed to fetch all resumes" });
            throw error;
        }
    },

    deleteResume: async () => {
        set({ isReumeLoading: true, error: null });
        try {
            const res = await deleteResumeApi()
            set({ isReumeLoading: false, resume: res.data });
            return res.data;
        } catch (error) {
            set({ isReumeLoading: false, error: error?.response?.data?.message || "failed to fetch" });
            throw error;
        }
    },

    analysisResume: async (analysisData) => {
        set({ isReumeLoading: true, error: null });
        try {
            const res = await analysisResumeApi(analysisData)
            set({ isReumeLoading: false, resume: res.data });
            return res.data;
        } catch (error) {
            set({ isReumeLoading: false, error: error?.response?.data?.message || "failed to fetch" });
            throw error;
        }
    },
}))