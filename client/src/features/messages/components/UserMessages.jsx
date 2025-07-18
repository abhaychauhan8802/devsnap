import { MessageCircleMore } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { IoSend } from "react-icons/io5";
import { useNavigate } from "react-router";
import { Link } from "react-router";

import UserAvatar from "@/components/common/UserAvatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/useAuthStore";

import { useMessageStore } from "../useMessageStore";

const UserMessages = () => {
  const { authUser, socket } = useAuthStore();
  const {
    selectedUser,
    messages,
    getMessages,
    sendMessage,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useMessageStore();

  const { onlineUsers } = useAuthStore();

  const [textMessage, setTextMessage] = useState("");
  const [typingUser, setTypingUser] = useState(null);
  const [dots, setDots] = useState(".");

  const navigate = useNavigate();

  const typingTimeoutRef = useRef(null);

  const handleTypingIndicator = () => {
    socket.emit("typing", { to: selectedUser?._id });

    clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stopTyping", { to: selectedUser?._id });
    }, 1000);
  };

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser?._id);
    }
  }, [getMessages, selectedUser]);

  useEffect(() => {
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser?._id, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(selectedUser?._id, textMessage);
    setTextMessage("");
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("userTyping", ({ from }) => {
      setTypingUser(from);
    });
    socket.on("userStopTyping", ({ from }) => {
      setTypingUser(null);
    });

    return () => {
      socket.off("userTyping");
      socket.off("userStopTyping");
    };
  }, [socket]);

  return (
    <>
      {selectedUser ? (
        <div className="h-full w-full flex flex-col">
          <div className="border-b h-16 flex items-center px-4">
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full size-10 sm:hidden"
                onClick={() => navigate(-1)}
              >
                <ChevronLeft />
              </Button>
              <Link
                className="flex items-center gap-2"
                to={`/user/${selectedUser?.username}`}
              >
                <div
                  className={`rounded-full relative p-[1px] ${onlineUsers?.includes(selectedUser?._id) && "border-2 border-green-500"}`}
                >
                  <UserAvatar
                    profilePicture={selectedUser?.profilePicture}
                    avatarStyle="size-8"
                  />
                  {onlineUsers?.includes(selectedUser?._id) && (
                    <span className="w-2 h-2 absolute bottom-0 right-1 bg-green-500 rounded-full" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-text-secondary text-sm">
                    {selectedUser?.name}
                  </span>
                  <span className="font-medium text-xs text-text-muted">
                    @{selectedUser?.username}
                  </span>
                </div>
              </Link>
            </div>
          </div>

          <div className="flex-1 flex flex-col-reverse gap-2 overflow-auto p-4 scrollbar">
            {typingUser && (
              <span className="self-start text-md text-text-muted">
                typing{dots}
              </span>
            )}
            {messages?.map((message, idx) => (
              <div
                key={idx}
                className={`${authUser?._id === message?.senderId ? "self-end bg-primary rounded-br-none text-primary-foreground" : "self-start bg-secondary rounded-bl-none"} py-2 px-4 rounded-xl`}
              >
                {message?.message}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="h-14 flex items-center px-4">
              <div className="flex gap-2 w-full">
                <Input
                  type="text"
                  placeholder="Type your message here"
                  value={textMessage}
                  onChange={(e) => {
                    setTextMessage(e.target.value);
                    handleTypingIndicator();
                  }}
                />
                <Button type="submit">
                  Send <IoSend />
                </Button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="h-full w-full flex justify-center items-center">
          <div className="flex items-center flex-col gap-4">
            <MessageCircleMore size={120} />
            <h3 className="font-semibold text-center">
              Start a chat by selecting a <br /> user from sidebar
            </h3>
          </div>
        </div>
      )}
    </>
  );
};

export default UserMessages;
