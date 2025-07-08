import bcrypt from "bcryptjs";

import { redis } from "../lib/redis.js";
import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(401).json({
        message: "Something is missing, please check!",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (user)
      return res.status(401).json({
        success: false,
        message: "User with this email address is already exist",
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    const userObj = newUser.toObject();

    const token = await generateToken(newUser._id);

    delete userObj.password;

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      user: userObj,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });

    console.log("Error in register route", error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        message: "Something is missing, please check!",
        success: false,
      });
    }

    let user = await User.findOne({ email }).lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    delete user.password;

    const token = await generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });

    console.log("Error in login route", error.message);
  }
};

export const logout = async (req, res) => {
  try {
    const userId = req.id;

    await redis.del(`user:${userId}`);

    res.clearCookie("token");

    res.status(200).json({ success: true, message: "logout successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });

    console.log("Error in logout route", error.message);
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.id;

    const cachedUser = await redis.get(`user:${userId}`);

    if (cachedUser) {
      return res.json({
        user: JSON.parse(cachedUser),
        success: true,
        source: "redis",
      });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "user not found" });
    }

    await redis.setEx(`user:${userId}`, 3600, JSON.stringify(user));

    res.status(200).json({ success: true, user, source: "mongodb" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });

    console.log("Error in getUserProfile route", error.message);
  }
};
