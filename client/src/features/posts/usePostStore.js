import { toast } from "sonner";
import { create } from "zustand";

import axiosInstance from "@/lib/axios";

import { useAuthStore } from "../../store/useAuthStore";

export const usePostStore = create((set, get) => ({
  posts: [],
  post: null,
  postLoading: false,

  getAllPost: async () => {
    set({ postLoading: true });
    try {
      const res = await axiosInstance.get("/post/all");
      set({ posts: res.data.message });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ postLoading: false });
    }
  },

  setPost: (post) => {
    set({ post: post });
  },

  getPost: async (postId) => {
    if (get().post) return;

    try {
      const res = await axiosInstance.get(`/post/${postId}`);
      set({ post: res.data.post });
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  },

  likePost: async (post) => {
    const authUserId = useAuthStore.getState().authUser._id;
    const liked = post.likes.includes(authUserId);

    const updatedPost = get().posts.map((p) => {
      if (p._id === post._id) {
        const updatedLikes = liked
          ? p.likes.filter((id) => id !== authUserId)
          : [...p.likes, authUserId];

        return { ...p, likes: updatedLikes };
      }

      return p;
    });

    const isLikeOfDislike = liked ? "dislike" : "like";

    set({ posts: updatedPost });
    try {
      await axiosInstance.post(`/post/${post._id}/${isLikeOfDislike}`);
    } catch (error) {
      const revertedPosts = get().posts.map((p) => {
        if (p._id === post._id) {
          return { ...p, likes: post.likes };
        }
        return p;
      });

      set({ posts: revertedPosts });
    }
  },

  bookmarkPost: async (post) => {
    const authUser = useAuthStore.getState().authUser;
    const userBookmarks = authUser.bookmarks;
    const postId = post._id;

    const alreadyBookmark = userBookmarks.includes(postId);

    const updatedBookmarks = alreadyBookmark
      ? userBookmarks.filter((b) => b !== postId)
      : [...userBookmarks, postId];

    const updatedUser = { ...authUser, bookmarks: updatedBookmarks };

    const prevAuthUser = { ...authUser };

    useAuthStore.setState({ authUser: updatedUser });

    try {
      const res = await axiosInstance.post(`/post/${post._id}/bookmark`);
      if (res.data.type === "saved") {
        toast.message("✅ Post save to bookmark");
      } else {
        toast.message("❌ Post remove from bookmark");
      }
    } catch (error) {
      useAuthStore.setState({ authUser: prevAuthUser });
    }
  },
}));
