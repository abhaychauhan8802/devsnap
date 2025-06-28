import { create } from "zustand";

import axiosInstance from "@/lib/axios";
import { useAuthStore } from "@/store/useAuthStore";

export const useMessageStore = create((set, get) => ({
  selectedUser: null,
  chatContacts: [],
  messages: [],

  getConversations: async () => {
    try {
      const res = await axiosInstance.get("/message/all/users");
      set({ chatContacts: res?.data?.conversations });
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  },

  getMessages: async (receiverId) => {
    try {
      const res = await axiosInstance.get(`/message/all/${receiverId}`);

      set({ messages: res?.data?.messages });
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  },

  sendMessage: async (receiverId, textMessage) => {
    try {
      const res = await axiosInstance.post(`/message/send/${receiverId}`, {
        textMessage,
      });

      set({ messages: [res?.data?.message, ...get().messages] });
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    if (!socket || !socket.connected) {
      console.warn("Socket not available or not connected yet.");
      return;
    }

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;

      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [newMessage, ...get().messages],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;

    if (!socket || !socket.connected) {
      console.warn("Socket not available or not connected yet.");
      return;
    }

    socket.off("newMessage");
  },

  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },
}));
