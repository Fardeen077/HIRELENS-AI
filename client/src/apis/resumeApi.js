import { axiosInstance } from "./axiosInstance.js";

const uploadResumeApi = async (resume) => {
     const formData = new FormData();
    formData.append("resume", resume);
    
    const response = await axiosInstance.post("/resume/upload", formData);
    return response.data;
};

const getOwnResumeApi = async (userId) => {
    const response = await axiosInstance.get(`/resume/getresume/${userId}`);
    return response.data;
};

const deleteResumeApi = async (resumeId) => {
    const response = await axiosInstance.delete(`/resume/${resumeId}`);
    return response.data;
};

const getAllResumeApi = async () => {
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
    getAllResumeApi,
    deleteResumeApi,
    analysisResumeApi,
};
