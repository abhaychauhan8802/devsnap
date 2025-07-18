import { create } from "zustand";

import axiosInstance from "@/lib/axios";

export const useExploreStore = create((set, get) => ({
  searchPosts: [],
  searchUsers: [],

  getSearchPosts: async (searchTerm) => {
    try {
      const res = await axiosInstance.get(
        `/post/search?searchTerm=${searchTerm}`,
      );
      set({ searchPosts: res.data.posts });
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  },

  getSearchUsers: async (searchTerm) => {
    try {
      const res = await axiosInstance.get(
        `/user/search?searchTerm=${searchTerm}`,
      );

      set({ searchUsers: res.data.users });
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  },

  clearPosts: () => set({ searchPosts: [] }),
}));
