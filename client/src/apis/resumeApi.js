import { axiosInstance } from "./axiosInstance.js";

const uploadResumeApi = async (resume) => {
    const response = await axiosInstance.post("/resume/upload");
    return response.data;
};

const getOwnResumeApi = async (userId) => {
    const response = await axiosInstance.get(`/resume/getresume/${userId}`);
    return response.data;
};

const deleteResume = async (resumeId) => {
    const response = await axiosInstance.delete(`/resume/${resumeId}`);
    return response.data;
};

const getAllResume = async () => {
    const response = await axiosInstance.get("/resume/getall");
    return response.data;
};

const analysisResumeApi = async (analysisData) => {
    const response = await axiosInstance.post("/resume/analysis", analysisData);
    return response.data;
};

export {
    uploadResumeApi,
    getOwnResumeApi,
    getAllResume,
    deleteResume,
    analysisResumeApi,
};
