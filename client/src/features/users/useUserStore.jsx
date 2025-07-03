import { toast } from "sonner";
import { create } from "zustand";

import axiosInstance from "@/lib/axios";
import { useAuthStore } from "@/store/useAuthStore";

export const useUserStore = create((set, get) => ({
  user: null,
  suggestedUsers: [],
  userPosts: [],
  userBookmarks: [],
  loading: false,
  isUpdatingProfile: false,
  followers: [],
  followings: [],

  getUserProfile: async ({ userId }) => {
    try {
      const res = await axiosInstance.get(`/profile/${userId}`);
      set({ user: res.data.user });
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  },

  editUserProfile: async ({ name, bio }, file) => {
    set({ isUpdatingProfile: true });
    try {
      const formData = new FormData();
      if (name) formData.append("name", name);
      if (bio) formData.append("bio", bio);
      if (file) formData.append("profilePhoto", file); // must match multer field

      const res = await axiosInstance.post("/user/profile/edit", formData);

      useAuthStore.setState({
        authUser: res.data.user,
      });

      toast.success(res.data.message);
    } catch (error) {
      console.log(error?.response?.data?.message);
    } finally {
      set({ isUpdatingProfile: false });
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

  deleteUserPost: async (postId) => {
    const { userPosts } = get();

    const updatedPosts = userPosts.filter((post) => post._id !== postId);

    const backupPosts = userPosts;

    set({ userPosts: updatedPosts });

    console.log(get().userPosts);

    try {
      const res = await axiosInstance.delete(`/post/delete/${postId}`);

      toast.success(res?.data?.message);
    } catch (error) {
      set({ userPosts: backupPosts });
      toast.error(error?.response?.data?.message);
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
    const { user } = get();
    const followings = authUser.followings || [];

    try {
      await axiosInstance.post(`/user/followorunfollow/${userId}`);

      const isFollowing = followings.includes(userId);

      const updatedFollowings = isFollowing
        ? followings.filter((id) => id !== userId) // Unfollow
        : [...followings, userId]; // Follow

      // Also update the user.followers (the person we are viewing)
      let updatedUser = user;
      if (user && user?._id === userId) {
        const updatedFollowers = isFollowing
          ? user.followers.filter((id) => id !== authUser._id) // remove follower
          : [...user.followers, authUser._id]; // add follower

        updatedUser = {
          ...user,
          followers: updatedFollowers,
        };
      }

      set({ user: updatedUser });

      useAuthStore.setState({
        authUser: {
          ...authUser,
          followings: updatedFollowings,
        },
      });
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  },

  removeFollower: async (userId) => {
    const { authUser } = useAuthStore.getState();
    const followers = authUser.followers || [];
    try {
      axiosInstance.delete(`/user/removefollower/${userId}`);

      const isFollower = followers.includes(userId);

      const updatedFollowers =
        isFollower && followers.filter((id) => id !== userId);

      useAuthStore.setState({
        authUser: {
          ...authUser,
          followers: updatedFollowers,
        },
      });

      set({ followers: updatedFollowers });
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  },

  getFollowers: async (userId) => {
    try {
      const res = await axiosInstance.get(`/user/${userId}/followers`);

      set({ followers: res?.data?.followers?.followers });
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  },

  getFollowings: async (userId) => {
    try {
      const res = await axiosInstance.get(`/user/${userId}/followings`);

      set({ followings: res?.data?.followings?.followings });
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  },
}));
