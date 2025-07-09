import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";

import connectDB from "./src/lib/db.js";
import AuthRouter from "./src/routes/auth.routes.js";
import MessageRouter from "./src/routes/message.route.js";
import PostRouter from "./src/routes/post.routes.js";
import UserRouter from "./src/routes/user.routes.js";
import { app, server } from "./src/socket/socket.js";

dotenv.config();

const __dirname = path.resolve();

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

app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);
app.use("/api/post", PostRouter);
app.use("/api/message", MessageRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("/{*any}", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is listen on port ${PORT}`);
  connectDB();
});
