import { toast } from "sonner";
import { create } from "zustand";

import axiosInstance from "@/lib/axios";

import { useAuthStore } from "../../store/useAuthStore";
import { useUserStore } from "../users/useUserStore";

export const usePostStore = create((set, get) => ({
  posts: {
    feed: [],
    explore: [],
    following: [],
  },
  pagination: {
    feed: {
      skip: 0,
      hasMore: true,
    },
    explore: {
      skip: 0,
      hasMore: true,
    },
    following: {
      skip: 0,
      hasMore: true,
    },
  },
  post: null,
  postLoading: false,
  postComments: [],
  isAddingPost: false,

  setHasMore: (value, type) => {
    set((state) => ({
      pagination: {
        ...state.pagination,
        [type]: { ...state.pagination[type], hasMore: value },
      },
    }));
  },

  getAllPosts: async ({ skip, limit }) => {
    set({ postLoading: true });
    try {
      const res = await axiosInstance.get(
        `/post/all?skip=${skip}&limit=${limit}`,
      );

      return res.data.message;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ postLoading: false });
    }
  },

  getFeedPost: async ({ skip, limit }) => {
    set({ postLoading: true });
    try {
      const res = await axiosInstance.get(
        `/post/feed?skip=${skip}&limit=${limit}`,
      );

      return res.data.message;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ postLoading: false });
    }
  },

  getFollowingPosts: async ({ skip, limit }) => {
    set({ postLoading: true });
    try {
      const res = await axiosInstance.get(
        `/post/following?skip=${skip}&limit=${limit}`,
      );

      return res.data.message;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ postLoading: false });
    }
  },

  setPosts: (posts, skipValue, type) => {
    set((state) => ({
      posts: {
        ...state.posts,
        [type]: posts,
      },
      pagination: {
        ...state.pagination,
        [type]: {
          ...state.pagination[type],
          skip: skipValue,
        },
      },
    }));
  },

  appendPosts: (newPosts, skipValue, type) => {
    set((state) => ({
      posts: {
        ...state.posts,
        [type]: [...state.posts[type], ...newPosts],
      },
      pagination: {
        ...state.pagination,
        [type]: {
          ...state.pagination[type],
          skip: state.pagination[type].skip + skipValue,
        },
      },
    }));
  },

  addPost: async ({ title, imageFile, text }) => {
    set({ isAddingPost: true });
    try {
      const formData = new FormData();
      if (title) formData.append("title", title);
      if (text) formData.append("text", text);
      if (imageFile) formData.append("image", imageFile);

      const res = await axiosInstance.post("/post/addpost", formData);

      toast.success(res?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isAddingPost: false });
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
    const { userPosts, userBookmarks } = useUserStore.getState();

    const isLikeOfDislike = liked ? "dislike" : "like";

    const updatedPostData = {
      ...post,
      likes: liked
        ? post.likes.filter((id) => id !== authUserId)
        : [...post.likes, authUserId],
    };

    const postKeys = ["feed", "explore", "following"];

    const newPostStoreState = {
      posts: {},
    };

    postKeys.forEach((key) => {
      const current = get().posts[key];
      newPostStoreState.posts[key] = current.map((p) =>
        p._id === post._id ? updatedPostData : p,
      );
    });

    const updatedUserPost = userPosts.map((p) =>
      p._id === post._id ? updatedPostData : p,
    );

    const updatedUserBookmarks = userBookmarks.map((p) =>
      p._id === post._id ? updatedPostData : p,
    );

    if (get().post?._id === post._id) {
      newPostStoreState["post"] = updatedPostData;
    }

    set(newPostStoreState);

    useUserStore.setState({
      userPosts: updatedUserPost,
      userBookmarks: updatedUserBookmarks,
    });
    try {
      await axiosInstance.post(`/post/${post._id}/${isLikeOfDislike}`);
    } catch (error) {
      console.log("Error when like post", error?.response?.data?.message);
    }
  },

  bookmarkPost: async (post) => {
    const authUser = useAuthStore.getState().authUser;
    const userBookmarks = authUser.bookmarks;
    const postId = post._id;

    const alreadyBookmark = userBookmarks?.includes(postId);

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
    const { post, postComments, feedPosts, explorePosts } = get();

    const postBackup = post;
    const commentsBackup = postComments;
    const feedPostsBackup = feedPosts;
    const explorePostsBackup = explorePosts;

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

    const updatedFeedPosts = feedPosts.map((p) =>
      p._id === postId ? { ...p, comments: [...p.comments, tempComment] } : p,
    );

    const updatedExplorePosts = explorePosts.map((p) =>
      p._id === postId ? { ...p, comments: [...p.comments, tempComment] } : p,
    );

    set({
      postComments: updatedPostComments,
      post: updatedPost,
      feedPosts: updatedFeedPosts,
      explorePosts: updatedExplorePosts,
    });

    try {
      await axiosInstance.post(`/post/${postId}/comment`, { text });
    } catch (error) {
      console.log(error?.response?.data?.message);

      set({
        postComments: commentsBackup,
        post: postBackup,
        feedPosts: feedPostsBackup,
        explorePosts: explorePostsBackup,
      });
    }
  },
}));
