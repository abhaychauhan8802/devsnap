import { create } from "zustand";

import axiosInstance from "@/lib/axios";
import { useAuthStore } from "@/store/useAuthStore";

export const useUserStore = create((set, get) => ({
  user: null,
  suggestedUsers: [],
  userPosts: [],
  userBookmarks: [],
  loading: false,

  getUserProfile: async ({ userId }) => {
    try {
      const res = await axiosInstance.get(`/profile/${userId}`);
      set({ user: res.data.user });
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  },

  getUserPosts: async (userId) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get(`/post/user/${userId}`);
      set({ userPosts: res.data.posts });
    } catch (error) {
      console.log(error?.response?.data?.message);
    } finally {
      set({ loading: false });
    }
  },

  getUserBookmarks: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get(`/post/bookmarks`);
      set({ userBookmarks: res.data.bookmarks });
    } catch (error) {
      console.log(error?.response?.data?.message);
    } finally {
      set({ loading: false });
    }
  },

  getUser: async (username) => {
    try {
      const res = await axiosInstance.get(`/user/profile/${username}`);
      set({ user: res.data.user });
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  },

  getSuggested: async () => {
    try {
      const res = await axiosInstance("/user/suggested");
      set({ suggestedUsers: res?.data?.users });
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  },

  followAndUnfollow: async (userId) => {
    const { authUser } = useAuthStore.getState();
    const followings = authUser.followings || [];

    try {
      await axiosInstance.post(`/user/followorunfollow/${userId}`);

      const isFollowing = followings.includes(userId);

      const updatedFollowings = isFollowing
        ? followings.filter((id) => id !== userId) // Unfollow
        : [...followings, userId]; // Follow

      useAuthStore.setState({
        authUser: {
          ...authUser,
          followings: updatedFollowings,
        },
      });

      console.log(`${isFollowing ? "Unfollowed" : "Followed"} user: ${userId}`);
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  },
}));
