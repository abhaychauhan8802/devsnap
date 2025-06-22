import express from "express";

import {
  editProfile,
  followOrUnfollow,
  getProfile,
  getSuggestedUsers,
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

router.get("/profile/:username", getProfile);

export default router;
