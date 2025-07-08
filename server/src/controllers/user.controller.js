import mongoose from "mongoose";

import cloudinary from "../lib/cloudinary.js";
import User from "../models/user.model.js";
import getDataUri from "../utils/datauri.js";

export const getProfile = async (req, res) => {
  try {
    const username = req.params.username;

    let user = await User.findOne({ username }).select("-password -bookmarks");

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });

    console.log("Error in getProfile route", error.message);
  }
};

export const editProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { name, bio } = req.body;
    const profilePicture = req.file;

    let cloudResponse;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Delete old profile picture from Cloudinary
    if (profilePicture && user.profilePicture) {
      const segments = user.profilePicture.split("/");
      const publicIdWithExt = segments[segments.length - 1]; // e.g., abc123.jpg
      const publicId = `devsnap/users/${publicIdWithExt.split(".")[0]}`;

      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.error("Failed to delete old profile picture:", err.message);
      }
    }

    // Upload new profile picture
    if (profilePicture) {
      const fileUri = getDataUri(profilePicture);
      cloudResponse = await cloudinary.uploader.upload(fileUri, {
        folder: "devsnap/users",
      });

      user.profilePicture = cloudResponse.secure_url;
    }

    if (name) user.name = name;
    if (bio) user.bio = bio;

    await user.save();

    return res.status(200).json({
      message: "Profile updated.",
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });

    console.log("Error in editProfile route", error.message);
  }
};

export const getSuggestedUsers = async (req, res) => {
  try {
    const userId = req.id;

    const suggestedUsers = await User.aggregate([
      { $match: { _id: { $ne: new mongoose.Types.ObjectId(userId) } } },
      { $sample: { size: 6 } },
      { $project: { name: 1, username: 1, profilePicture: 1 } },
    ]);

    if (!suggestedUsers) {
      return res.status(400).json({
        success: false,
        message: "Currently do not have any users",
      });
    }

    return res.status(200).json({
      success: true,
      users: suggestedUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });

    console.log("Error in getSuggestedUsers route", error.message);
  }
};

export const followOrUnfollow = async (req, res) => {
  try {
    const currentUser = req.id;
    const otherUser = req.params.id;

    if (currentUser === otherUser) {
      return res.status(400).json({
        message: "You cannot follow/unfollow yourself",
        success: false,
      });
    }

    const user = await User.findById(currentUser);
    const targetUser = await User.findById(otherUser);

    if (!user || !targetUser) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    const isFollowing = user.followings.includes(otherUser);

    if (isFollowing) {
      // unfollow logic
      await Promise.all([
        User.updateOne(
          { _id: currentUser },
          { $pull: { followings: otherUser } },
        ),
        User.updateOne(
          { _id: otherUser },
          { $pull: { followers: currentUser } },
        ),
      ]);

      return res
        .status(200)
        .json({ message: "Unfollowed successfully", success: true });
    } else {
      // follow logic
      await Promise.all([
        User.updateOne(
          { _id: currentUser },
          { $addToSet: { followings: otherUser } },
        ),
        User.updateOne(
          { _id: otherUser },
          { $addToSet: { followers: currentUser } },
        ),
      ]);

      return res
        .status(200)
        .json({ message: "followed successfully", success: true });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });

    console.log("Error in followOrUnfollow route", error.message);
  }
};

export const removeFollower = async (req, res) => {
  try {
    const currentUserId = req.id;
    const otherUserId = req.params.id;

    const currentUser = await User.findById(currentUserId);
    const otherUser = await User.findById(otherUserId);

    if (!currentUser || !otherUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    await Promise.all([
      User.updateOne(
        { _id: currentUserId },
        { $pull: { followers: otherUserId } },
      ),
      User.updateOne(
        { _id: otherUserId },
        { $pull: { followings: currentUserId } },
      ),
    ]);

    return res
      .status(200)
      .json({ message: "remove follower successfully", success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });

    console.log("Error in removeFollower route", error.message);
  }
};

export const getFollowers = async (req, res) => {
  try {
    const userId = req.params.id;

    const followers = await User.findById(userId).select("followers").populate({
      path: "followers",
      select: "name username profilePicture",
    });

    if (!followers)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, followers });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });

    console.log("Error in getFollowers route", error.message);
  }
};

export const getFollowings = async (req, res) => {
  try {
    const userId = req.params.id;

    const followings = await User.findById(userId)
      .select("followings")
      .populate({
        path: "followings",
        select: "name username profilePicture",
      });

    if (!followings)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, followings });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });

    console.log("Error in getFollowings route", error.message);
  }
};

export const searchUser = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;

    if (!searchTerm || typeof searchTerm !== "string")
      return res.status(400).json({ message: "Search Query is required" });

    const searchRegex = new RegExp(searchTerm, "i");

    const users = await User.find({
      $or: [
        { username: { $regex: searchRegex } },
        { name: { $regex: searchRegex } },
      ],
    }).sort({ username: 1, name: 1 });

    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });

    console.log("Error in getFollowings route", error.message);
  }
};
