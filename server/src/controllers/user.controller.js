import cloudinary from "../lib/cloudinary.js";
import User from "../models/user.model.js";
import getDataUri from "../utils/datauri.js";

export const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    let user = await User.findById(userId)
      .populate({
        path: "posts",
        createdAt: -1,
      })
      .select("-password -bookmarks");

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

    if (profilePicture) {
      const fileUri = getDataUri(profilePicture);
      cloudResponse = await cloudinary.uploader.upload(fileUri, {
        folder: "devsnap/users",
      });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (profilePicture) user.profilePicture = cloudResponse.secure_url;

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
    const suggestedUsers = await User.find({ _id: { $ne: req.id } })
      .select("-password")
      .limit(6);

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

    // mai check krunga ki follow krna hai ya unfollow
    const isFollowing = user.followings.includes(otherUser);

    if (isFollowing) {
      // unfollow logic
      await Promise.all([
        User.updateOne(
          { _id: currentUser },
          { $pull: { following: otherUser } },
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
          { $push: { following: otherUser } },
        ),
        User.updateOne(
          { _id: otherUser },
          { $push: { followers: currentUser } },
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
