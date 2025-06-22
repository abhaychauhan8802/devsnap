import { toast } from "sonner";
import { create } from "zustand";

import axiosInstance from "@/lib/axios";

import { useAuthStore } from "../../store/useAuthStore";

export const usePostStore = create((set, get) => ({
  posts: [],
  post: null,
  postLoading: false,
  postComments: [],

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
    set({ postLoading: true });
    try {
      const res = await axiosInstance.get(`/post/${postId}`);
      set({ post: res.data.post });
    } catch (error) {
      console.log(error.response?.data?.message);
    } finally {
      set({ postLoading: false });
    }
  },

  likePost: async (post) => {
    const authUserId = useAuthStore.getState().authUser._id;
    const liked = post.likes.includes(authUserId);

    const updatedPostData = {
      ...post,
      likes: liked
        ? post.likes.filter((id) => id !== authUserId)
        : [...post.likes, authUserId],
    };

    const updatedPost = get().posts.map((p) =>
      p._id === post._id ? updatedPostData : p,
    );

    const isLikeOfDislike = liked ? "dislike" : "like";

    set({
      posts: updatedPost,
      post: updatedPostData,
    });
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

  getPostComments: async (postId) => {
    try {
      const res = await axiosInstance.get(`/post/${postId}/comment/all`);
      set({ postComments: res?.data?.comments });
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  },

  addComment: async ({ postId, text }) => {
    const authUser = useAuthStore.getState().authUser;
    const { post, postComments, posts } = get();

    const postBackup = post;
    const commentsBackup = postComments;
    const postsBackup = posts;

    const tempComment = {
      _id: Math.random().toString(36).slice(2),
      author: authUser,
      text,
      createdAt: new Date().toISOString(),
    };

    const updatedPostComments = [tempComment, ...commentsBackup];

    const updatedPost = {
      ...post,
      comments: [...post.comments, tempComment],
    };

    const updatedPosts = posts.map((p) =>
      p._id === postId ? { ...p, comments: [...p.comments, tempComment] } : p,
    );

    set({
      postComments: updatedPostComments,
      post: updatedPost,
      posts: updatedPosts,
    });

    try {
      await axiosInstance.post(`/post/${postId}/comment`, { text });
    } catch (error) {
      console.log(error?.response?.data?.message);

      set({
        postComments: commentsBackup,
        post: postBackup,
        posts: postsBackup,
      });
    }
  },
}));
