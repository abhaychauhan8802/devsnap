import express from "express";

import {
  editProfile,
  followOrUnfollow,
  getFollowers,
  getFollowings,
  getProfile,
  getSuggestedUsers,
  removeFollower,
} from "../controllers/user.controller.js";
import upload from "../middlewares/multer.middleware.js";
import verifyToken from "../middlewares/verifyToken.middleware.js";

const router = express.Router();

router.post(
  "/profile/edit",
  verifyToken,
  upload.single("profilePhoto"),
  editProfile,
);
router.get("/suggested", verifyToken, getSuggestedUsers);

router.post("/followorunfollow/:id", verifyToken, followOrUnfollow);
router.delete("/removefollower/:id", verifyToken, removeFollower);

router.get("/profile/:username", getProfile);

router.get("/:id/followers", verifyToken, getFollowers);
router.get("/:id/followings", verifyToken, getFollowings);

export default router;
