import { create } from "zustand";

export const useScrollStore = create((set) => ({
  scrollPositions: {},

  saveScroll: (path, position) =>
    set((state) => ({
      scrollPositions: { ...state.scrollPositions, [path]: position },
    })),

  getScroll: (path) => {
    const state = useScrollStore.getState();
    return state.scrollPositions[path] || 0;
  },

  clearScroll: () => set({ scrollPositions: {} }),
}));
