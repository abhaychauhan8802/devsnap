import cookie from "cookie";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";

dotenv.config();

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const userSocketMap = {};

export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];

io.use((socket, next) => {
  try {
    const cookies = socket.handshake.headers.cookie;
    if (!cookies) return next(new Error("No cookies"));

    const parsedCookies = cookie.parse(cookies);
    const token = parsedCookies.token;

    if (!token) return next(new Error("No access token"));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Socket auth error:", err.message);
    next(new Error("Authentication failed"));
  }
});

io.on("connection", async (socket) => {
  const userId = socket.userId;
  console.log("A user connected", socket.id);

  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  socket.on("typing", ({ to }) => {
    const receiverId = getReceiverSocketId(to);
    socket.to(receiverId).emit("userTyping", { from: userId });
  });

  socket.on("stopTyping", ({ to }) => {
    const receiverId = getReceiverSocketId(to);
    socket.to(receiverId).emit("userStopTyping", { from: userId });
  });

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", async () => {
    console.log("A user disconnect", socket.id);

    if (userId) {
      delete userSocketMap[userId];
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, server, io };
