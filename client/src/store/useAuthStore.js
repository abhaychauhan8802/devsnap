import { io } from "socket.io-client";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import axiosInstance from "@/lib/axios";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

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

          setTimeout(() => {
            get().socketConnection();
          }, 100);
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

          setTimeout(() => {
            get().socketConnection();
          }, 100);
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

          setTimeout(() => {
            get().socketConnection();
          }, 100);
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

          get().socketDisconnection();
        } catch (error) {
          toast.error(error?.response?.data?.message);
        }
      },

      socketConnection: () => {
        const { authUser } = get();

        if (!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
          withCredentials: true,
        });

        socket.on("connect", () => {
          console.log("Socket connected");
        });

        socket.on("getOnlineUsers", (userIds) => {
          set({ onlineUsers: userIds });
        });

        set({ socket });
      },

      socketDisconnection: () => {
        if (get().socket?.connected) get().socket.disconnect();
      },
    }),
    {
      name: "auth-user",
      partialize: (state) => ({ authUser: state.authUser }),
    },
  ),
);
