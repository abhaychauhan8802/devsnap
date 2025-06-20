import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import connectDB from "./lib/db.js";
import AuthRouter from "./routes/auth.routes.js";
import MessageRouter from "./routes/message.route.js";
import PostRouter from "./routes/post.routes.js";
import UserRouter from "./routes/user.routes.js";

dotenv.config();

const app = express();

// middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.get("/test", (req, res) => {
  res.send("Server is running");
});

app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);
app.use("/api/post", PostRouter);
app.use("/api/message", MessageRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listen on port ${PORT}`);
  connectDB();
});
