import { create } from "zustand";

import axiosInstance from "@/lib/axios";

export const useExploreStore = create((set, get) => ({
  searchPosts: [],
  searchTerm: "",

  setSearchTerm: (text) => set({ searchTerm: text }),

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

  clearPosts: () => set({ searchPosts: [] }),
}));
