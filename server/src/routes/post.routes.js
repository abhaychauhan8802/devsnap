import express from "express";

import {
  addComment,
  addNewPost,
  bookmarkPost,
  deletePost,
  dislikePost,
  getAllPost,
  getAuthPost,
  getCommentsOfPost,
  getPost,
  likePost,
} from "../controllers/post.controller.js";
import upload from "../middlewares/multer.middleware.js";
import verifyToken from "../middlewares/verifyToken.middleware.js";

const router = express.Router();

router.post("/addpost", verifyToken, upload.single("image"), addNewPost);
router.delete("/delete/:id", verifyToken, deletePost);
router.get("/all", verifyToken, getAllPost);
router.get("/:id", verifyToken, getPost);
router.get("/post/all", verifyToken, getAuthPost);
router.post("/:id/like", verifyToken, likePost);
router.post("/:id/dislike", verifyToken, dislikePost);
router.post("/:id/comment", verifyToken, addComment);
router.get("/:id/comment/all", verifyToken, getCommentsOfPost);
router.post("/:id/bookmark", verifyToken, bookmarkPost);

export default router;
