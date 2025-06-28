import mongoose from "mongoose";

import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const getConversations = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.id);

    let conversations = await Conversation.find({
      participants: userId,
    })
      .populate("participants", "_id name username profilePicture")
      .select("participants")
      .sort({ updatedAt: -1 })
      .lean();

    const chatUsers = conversations.map((conv) => {
      const otherUser = conv.participants.find(
        (p) => p._id.toString() !== userId.toString(),
      );

      return otherUser;
    });

    return res.status(200).json({ success: true, conversations: chatUsers });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });

    console.log("Error in getConversations route", error.message);
  }
};

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { textMessage: message } = req.body;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // establish the conversation if not started yet.
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) conversation.messages.push(newMessage._id);

    await Promise.all([conversation.save(), newMessage.save()]);

    // implement socket io for real time data transfer
    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(201).json({
      success: true,
      message: newMessage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });

    console.log("Error in sendMessage route", error.message);
  }
};

export const getMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;

    const messages = await Message.find({
      $or: [
        { senderId, receiverId }, // Messages sent by current user to other user
        { senderId: receiverId, receiverId: senderId }, // Messages sent by other user to current user
      ],
    }).sort({ createdAt: -1 });

    return res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });

    console.log("Error in getMessage route", error.message);
  }
};
