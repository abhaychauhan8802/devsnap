import { create } from "zustand";

export const useExploreStore = create((set, get) => ({
  posts: [],
}));
