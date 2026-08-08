import { axiosInstance } from "./axiosInstance.js";

const registerApi = async (userData) => {
    const response = await axiosInstance.post("/user/register", userData);
    return response.data
};

const loginApi = async (userData) => {
    const response = await axiosInstance.post("/user/login", userData);
    return response.data
};
const logoutApi = async () => {
    const response = await axiosInstance.post("/user/logout");
    return response.data
};
const getMeApi = async () => {
    const response = await axiosInstance.get("/user/me");
    return response.data
};
const updateProfileImageApi = async (file) => {
    // Create a FormData object to send the image as multipart/form-data.
    const formData = new FormData();
    formData.append("profilePic", file)
    const response = await axiosInstance.patch("/user/update-profile", formData);
    return response.data
};

export {
    registerApi,
    loginApi,
    logoutApi,
    getMeApi,
    updateProfileImageApi,
};