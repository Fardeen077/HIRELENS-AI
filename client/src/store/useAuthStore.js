import { create } from "zustand"
import {
    registerApi,
    loginApi,
    logoutApi,
    getMeApi,
    updateProfileImageApi,
} from "../apis/authApi"

const useAuthStore = create((set) => ({
    isAuth: false,
    isCheckingAuth: true,
    isAuthLoading: true,
    authUser: null,
    error: null,

    register: async (userData) => {
        set({ isAuthLoading: true, error: null });
        try {
            const res = await registerApi(userData);
            set({ isAuthLoading: false, authUser: res.data.user, isAuth: true });
            console.log(res);
            
            return res.data;
        } catch (error) {
            set({ isAuthLoading: false, error: error?.response?.data?.message || "failed to fetch" });
            throw error;
        }
    },

    login: async (userData) => {
        set({ isAuthLoading: true, error: null });
        try {
            const res = await loginApi(userData);
            set({ isAuthLoading: false, authUser: res.data.user, isAuth: true });
            console.log(res);
            
            return res.data;
        } catch (error) {
            set({ isAuthLoading: false, error: error?.response?.data?.message || "failed to fetch" });
            throw error;
        }
    },

    getme: async () => {
        set({ isAuthLoading: true, error: null });
        try {
            const res = await getMeApi();
            set({ isAuthLoading: false, authUser: res.data.user, isAuth: true, isCheckingAuth: false });
            return res.data;
        } catch (error) {
            set({ isAuthLoading: false, error: error?.response?.data?.message || "failed to fetch", isAuth: false, isCheckingAuth: false });
            throw error;
        }
    },

    logout: async () => {
        set({ isAuthLoading: true, error: null });
        try {
            const res = await logoutApi();
            set({ isAuthLoading: false, authUser: null, isAuth: false });
            return res.data;
        } catch (error) {
            set({ isAuthLoading: false, error: error?.response?.data?.message || "failed to fetch", isCheckingAuth: false });
            throw error;
        }
    },
}))

export default useAuthStore;