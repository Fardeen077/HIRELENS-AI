import { create } from "zustand"
import {
    registerApi,
    loginApi,
    logoutApi,
    getMeApi,
    updateProfileApi,
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
            set({ isAuthLoading: false, authUser: res.data.user, isAuth: true })
            return res.data;
        } catch (error) {
            set({ isLoading: false, error: error?.response?.data?.message || "failed to fetch" });
            throw error;
        }
    },

    login: async (userData) => {
        set({ isAuthLoading: true, error: null });
        try {
            const res = await loginApi(userData);
            set({ isAuthLoading: false, authUser: res.data.user, isAuth: true })
            return res.data;
        } catch (error) {
            set({ isLoading: false, error: error?.response?.data?.message || "failed to fetch" });
            throw error;
        }
    },
    getme: async () => {
        set({ isAuthLoading: true, error: null });
        try {
            const res = await getMeApi();
            set({ isAuthLoading: false, authUser: res.data.user, isAuth: true, isCheckingAuth: true })
            return res.data;
        } catch (error) {
            set({ isLoading: false, error: error?.response?.data?.message, isAuth: false, isCheckingAuth: false || "failed to fetch" });
            throw error;
        }
    },
    logout: async () => {
        set({ isLoading: true, error: null });
        try {
            const res = await logoutApi();
            set({ isLoading: false, authUser: null, isAuth: false })
            return res.data;
        } catch (error) {
            set({ isLoading: false, error: error?.response?.data?.message || "failed to fetch" });
            throw error;
        }
    },
}))

export default useAuthStore;