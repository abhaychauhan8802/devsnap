import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import axiosInstance from "@/lib/axios";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      authUser: null,
      loading: false,
      checkAuthLoading: false,
      onlineUsers: [],
      socket: null,

      checkAuth: async () => {
        set({ checkAuthLoading: true });
        try {
          const res = await axiosInstance.get("/auth/auth-profile");

          set({ authUser: res.data.message });
        } catch (error) {
          console.log("Error in checking auth");
          set({ authUser: null });
        } finally {
          set({ checkAuthLoading: false });
        }
      },

      login: async (data) => {
        set({ loading: true });
        try {
          const res = await axiosInstance.post("/auth/login", data);

          set({ authUser: res.data.message });
          toast.success("Login successfully");
        } catch (error) {
          toast.error(error?.response?.data?.message);
        } finally {
          set({ loading: false });
        }
      },

      register: async (data) => {
        set({ loading: true });

        try {
          const res = await axiosInstance.post("/auth/register", data);

          set({ authUser: res.data.message });
          toast.success("Account created");
        } catch (error) {
          toast.error(error?.response?.data?.message);
        } finally {
          set({ loading: false });
        }
      },

      logout: async () => {
        try {
          const res = await axiosInstance.post("/auth/logout");

          set({ authUser: null });
          toast.success(res.data.message);
        } catch (error) {
          toast.error(error?.response?.data?.message);
        }
      },
    }),
    {
      name: "auth-user",
      partialize: (state) => ({ authUser: state.authUser }),
    },
  ),
);
