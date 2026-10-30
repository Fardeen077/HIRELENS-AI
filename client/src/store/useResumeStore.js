import { create } from "zustand";
import {
    uploadResumeApi,
    getOwnResumeApi,
    getAllResumeApi,
    deleteResumeApi,
    analysisResumeApi,
} from "../apis/resumeApi"

const useResumeStore = create((set) => ({
    resumes: [],
    analysisResume:[],
    myResumes:[],
    isMyResumeLoading: false,
    isResumeLoading: true,
    error: null,

    uploadResume: async (resume) => {
        set({ isResumeLoading: true, error: null });
        try {
            const res = await uploadResumeApi(resume);
            set((state) => ({
                resumes: [res.data, ...state.resumes],
                isResumeLoading: false,
            }))
            return res.data;
        } catch (error) {
            set({ isResumeLoading: false, error: error?.response?.data?.message || "failed to upload resume" });
            throw error;
        }
    },

    getOwnResume: async (userId) => {
        set({ isResumeLoading: true, error: null });
        try {
            const res = await getOwnResumeApi(userId);
            set({ isMyResumeLoading: false, myResumes: res.data })
            console.log(res.data, "res 1");
            console.log(res,"res 2");
            
            return res.data;
            
        } catch (error) {
            set({ isResumeLoading: false, error: error?.response?.data?.message || "failed to fetch own resume" });
            throw error;
        }
    },

    getAllResume: async () => {
        set({ isResumeLoading: true, error: null });
        try {
            const res = await getAllResumeApi();
            set({ isResumeLoading: false, resumes: res.data });
            return res.data;
        } catch (error) {
            set({ isResumeLoading: false, error: error?.response?.data?.message || "failed to fetch all resumes" });
            throw error;
        }
    },

    deleteResume: async (resumeId) => {
        set({ isResumeLoading: true, error: null });
        try {
            const res = await deleteResumeApi(resumeId)
            set((state) => ({
                resumes: state.resumes.filter((item) => item._id !== resumeId),
                isResumeLoading: false,
            }));
            return res.data;
        } catch (error) {
            set({ isResumeLoading: false, error: error?.response?.data?.message || "failed to fetch" });
            throw error;
        }
    },

    analysisResume: async (analysisData) => {
        set({ isResumeLoading: true, error: null });
        try {
            const res = await analysisResumeApi(analysisData)
            set({ isResumeLoading: false, analysisResume: res.data });
            return res.data;
        } catch (error) {
            set({ isResumeLoading: false, error: error?.response?.data?.message || "failed to fetch" });
            throw error;
        }
    },
}));

export default useResumeStore