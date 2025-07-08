import sharp from "sharp";

import cloudinary from "../lib/cloudinary.js";
import { redis } from "../lib/redis.js";
import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { shuffleArray } from "../utils/shuffleArray.js";

export const addNewPost = async (req, res) => {
  try {
    const { title, text } = req.body;
    const image = req.file;
    const authorId = req.id;

    if (!text || !title)
      return res
        .status(400)
        .json({ success: false, message: "Post text and title is required" });

    let cloudResponse;

    if (image) {
      const optimizedImageBuffer = await sharp(image.buffer)
        .resize({ width: 800, height: 800, fit: "inside" })
        .toFormat("jpeg", { quality: 80 })
        .toBuffer();

      const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString("base64")}`;

      cloudResponse = await cloudinary.uploader.upload(fileUri, {
        folder: "devsnap/posts",
      });
    }

    const post = await Post.create({
      title,
      text,
      image: cloudResponse?.secure_url,
      author: authorId,
    });

    const user = await User.findById(authorId);

    if (user) {
      user.posts.push(post._id);
      await user.save();
    }

    await post.populate({ path: "author", select: "-password" });

    return res.status(201).json({
      success: true,
      message: "New post added",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });

    console.log("Error in addNewPost route", error.message);
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.id;

    const post = await Post.findById(postId);

    if (!post)
      return res
        .status(404)
        .json({ message: "Post not found", success: false });

    if (post.author.toString() !== userId)
      return res.status(403).json({ message: "Unauthorized" });

    await Post.findByIdAndDelete(postId);

    let user = await User.findById(userId);
    user.posts = user.posts.filter((id) => id.toString() !== postId);
    await user.save();

    await Comment.deleteMany({ post: postId });

    res.status(200).json({
      message: "Post deleted successfully",
      success: false,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });

    console.log("Error in deletePost route", error.message);
  }
};

export const searchPost = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;

    if (!searchTerm || typeof searchTerm !== "string")
      return res.status(400).json({ message: "Search Query is required" });

    const searchRegex = new RegExp(searchTerm, "i");

    const posts = await Post.find({
      $or: [
        { title: { $regex: searchRegex } },
        { text: { $regex: searchRegex } },
      ],
    });

    res.status(200).json({ success: true, posts });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });

    console.log("Error in searchPost route", error.message);
  }
};

export const getFollowingPosts = async (req, res) => {
  try {
    const userId = req.id;

    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 15;

    const user = await User.findById(userId).select("followings");

    const userFollowings = user.followings;

    const posts = await Post.find({ author: { $in: userFollowings } })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "author",
        select: "_id username name profilePicture bio createdAt",
      });

    res.status(200).json({
      success: true,
      message: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });

    console.log("Error in getFollowingPosts route", error.message);
  }
};
export const getFeedPosts = async (req, res) => {
  try {
    const userId = req.id;

    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 15;

    const posts = await Post.find({ author: { $ne: userId } })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "author",
        select: "_id username name profilePicture bio createdAt",
      });

    res.status(200).json({
      success: true,
      message: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });

    console.log("Error in getFeedPosts route", error.message);
  }
};

export const getAllPost = async (req, res) => {
  try {
    const userId = req.id;

    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 15;

    let shuffledIds = await redis.get(`explore:${userId}`);

    if (!shuffledIds) {
      const allPostIds = await Post.find({ author: { $ne: userId } })
        .select("_id")
        .lean();
      shuffledIds = shuffleArray(allPostIds.map((p) => p._id.toString()));

      await redis.setEx(`explore:${userId}`, 3600, JSON.stringify(shuffledIds));
    } else {
      shuffledIds = JSON.parse(shuffledIds);
    }

    const paginatedIds = shuffledIds.slice(
      Math.min(skip, shuffledIds.length),
      Math.min(skip + limit, shuffledIds.length),
    );

    const posts = await Post.find({ _id: { $in: [...paginatedIds] } }).populate(
      {
        path: "author",
        select: "_id username name profilePicture bio createdAt",
      },
    );

    res.status(200).json({
      success: true,
      message: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });

    console.log("Error in getAllPost route", error.message);
  }
};

export const getPost = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId).populate({
      path: "author",
      select: "_id username name profilePicture bio createdAt",
    });

    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    res.status(200).json({ success: true, post });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });

    console.log("Error in getPost route", error.message);
  }
};

export const getUserPost = async (req, res) => {
  try {
    const userId = req.params.id;

    const posts = await Post.find({ author: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "author",
        select: "name username profilePicture createdAt bio",
      });

    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });

    console.log("Error in getAuthPost route", error.message);
  }
};

export const likePost = async (req, res) => {
  try {
    const userId = req.id;
    const postId = req.params.id;

    const post = await Post.findById(postId);

    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    await post.updateOne({ $addToSet: { likes: userId } });
    await post.save();

    // implement socket io for real time notification

    return res.status(200).json({ success: true, message: "Post liked" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });

    console.log("Error in likePost route", error.message);
  }
};

export const dislikePost = async (req, res) => {
  try {
    const userId = req.id;
    const postId = req.params.id;

    const post = await Post.findById(postId);

    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    await post.updateOne({ $pull: { likes: userId } });
    await post.save();

    return res.status(200).json({ success: true, message: "Post disliked" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });

    console.log("Error in likePost route", error.message);
  }
};

export const addComment = async (req, res) => {
  try {
    const userId = req.id;
    const postId = req.params.id;

    const { text } = req.body;

    if (!text)
      return res
        .status(400)
        .json({ success: false, message: "Comment text is required" });

    let post = await Post.findById(postId);

    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    let comment = await Comment.create({
      text,
      author: userId,
      post: postId,
    });

    await post.comments.push(comment._id);
    await post.save();

    return res.status(201).json({
      success: true,
      message: "Comment Added",
      comment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });

    console.log("Error in addComments route", error.message);
  }
};

export const getCommentsOfPost = async (req, res) => {
  try {
    const postId = req.params.id;

    const comments = await Comment.find({ post: postId })
      .populate({
        path: "author",
        select: "_id name username profilePicture",
      })
      .sort({ createdAt: -1 });

    if (!comments)
      return res
        .status(404)
        .json({ success: false, message: "No comments found for this post" });

    res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });

    console.log("Error in getCommentsOfPost route", error.message);
  }
};

export const bookmarkPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const authorId = req.id;

    const post = await Post.findById(postId);

    if (!post)
      return res
        .status(404)
        .json({ message: "Post not found", success: false });

    const user = await User.findById(authorId);

    if (user.bookmarks.includes(post._id)) {
      await user.updateOne({ $pull: { bookmarks: post._id } });
      await user.save();

      return res.status(200).json({
        type: "unsaved",
        message: "Post removed from bookmark",
        success: true,
      });
    } else {
      await user.updateOne({ $addToSet: { bookmarks: post._id } });
      await user.save();

      return res
        .status(200)
        .json({ type: "saved", message: "Post bookmarked", success: true });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });

    console.log("Error in bookmarkPost route", error.message);
  }
};

export const getBookmarks = async (req, res) => {
  try {
    const userId = req.id;

    let user = await User.findById(userId).select("-password");

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    user = await user.populate({
      path: "bookmarks",
      populate: {
        path: "author",
        select: "name username profilePicture createdAt bio",
      },
    });

    res.status(200).json({ success: true, bookmarks: user.bookmarks });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });

    console.log("Error in getBookmarks route", error.message);
  }
};
