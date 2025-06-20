import express from "express";

import {
  getUserProfile,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";
import verifyToken from "../middlewares/verifyToken.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", verifyToken, logout);
router.get("/auth-profile", verifyToken, getUserProfile);

export default router;
