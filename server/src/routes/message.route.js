import express from "express";

import { getMessage, sendMessage } from "../controllers/message.controller.js";
import verifyToken from "../middlewares/verifyToken.middleware.js";

const router = express.Router();

router.post("/send/:id", verifyToken, sendMessage);
router.get("/all/:id", verifyToken, getMessage);

export default router;
