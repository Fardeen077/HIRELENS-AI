import { create } from "zustand";
import {
    uploadResumeApi,
    getOwnResumeApi,
    getAllResumeApi,
    deleteResumeApi,
    analysisResumeApi,
    getResumeByIdApi
} from "../apis/resumeApi";

const unwrapResponseData = (response) => {
    if (!response) return null;

    if (response?.data && typeof response.data === "object") {
        if (Object.prototype.hasOwnProperty.call(response.data, "data")) {
            return response.data.data;
        }
        if (Object.prototype.hasOwnProperty.call(response.data, "resume")) {
            return response.data.resume;
        }
        return response.data;
    }

    return response;
};

const useResumeStore = create((set) => ({
    resumes: [],
    analysisResult: null,
    myResumes: [],
    isMyResumeLoading: false,
    isResumeLoading: false,
    error: null,
    selectedResume: null,

    uploadResume: async (resume) => {
        set({ isResumeLoading: true, error: null });
        try {
            const res = await uploadResumeApi(resume);
            const uploadedResume = unwrapResponseData(res) ?? null;
            set((state) => ({
                resumes: uploadedResume ? [uploadedResume, ...state.resumes] : state.resumes,
                isResumeLoading: false,
            }));
            return uploadedResume;
        } catch (error) {
            set({ isResumeLoading: false, error: error?.response?.data?.message || "failed to upload resume" });
            throw error;
        }
    },

    getOwnResume: async (userId) => {
        set({ isResumeLoading: true, error: null });
        try {
            const res = await getOwnResumeApi(userId);
            const data = unwrapResponseData(res) ?? [];
            set({ isMyResumeLoading: false, myResumes: data });
            return data;
        } catch (error) {
            set({ isResumeLoading: false, error: error?.response?.data?.message || "failed to fetch own resume" });
            throw error;
        }
    },

    getAllResume: async () => {
        set({ isResumeLoading: true, error: null });
        try {
            const res = await getAllResumeApi();
            const data = unwrapResponseData(res) ?? [];
            set({ isResumeLoading: false, resumes: data });
            return data;
        } catch (error) {
            set({ isResumeLoading: false, error: error?.response?.data?.message || "failed to fetch all resumes" });
            throw error;
        }
    },

    deleteResume: async (resumeId) => {
        set({ isResumeLoading: true, error: null });
        try {
            const res = await deleteResumeApi(resumeId);
            const data = unwrapResponseData(res) ?? {};
            set((state) => ({
                resumes: state.resumes.filter((item) => item._id !== resumeId),
                isResumeLoading: false,
            }));
            return data;
        } catch (error) {
            set({ isResumeLoading: false, error: error?.response?.data?.message || "failed to fetch" });
            throw error;
        }
    },

    analysisResume: async (analysisData) => {
        set({ isResumeLoading: true, error: null });
        try {
            const res = await analysisResumeApi(analysisData);
            const result = unwrapResponseData(res) ?? null;
            set({ isResumeLoading: false, analysisResult: result });
            return result;
        } catch (error) {
            set({ isResumeLoading: false, error: error?.response?.data?.message || "failed to analyze resume" });
            throw error;
        }
    },
    getResumeId: async (id) => {
        set({ isResumeLoading: true, error: null, selectedResume: null });
        try {
            const res = await getResumeByIdApi(id);
            const data = unwrapResponseData(res);
            set({ isResumeLoading: false, selectedResume: data });
            console.log("Store ID:", id);
            console.log("API Response:", res);
            return data;
        } catch (error) {
            set({
                isResumeLoading: false,
                error: error?.response?.data?.message || "failed to fetch resume",
                selectedResume: null
            });
        }
    }
}));

export default useResumeStore;