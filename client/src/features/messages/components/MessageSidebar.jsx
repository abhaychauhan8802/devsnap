import { useEffect } from "react";

import UserAvatar from "@/components/common/UserAvatar";
import { useAuthStore } from "@/store/useAuthStore";

import { useMessageStore } from "../useMessageStore";

const MessageSidebar = () => {
  const { chatContacts, getConversations, selectedUser, setSelectedUser } =
    useMessageStore();

  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getConversations();
  }, []);

  const handleUserMessages = (contact) => {
    setSelectedUser(contact);
  };

  return (
    <div className="md:border-r w-full md:w-[260px] h-full flex flex-col shrink-0">
      <div className="flex items-center border-b h-16 px-4">
        <h2 className="font-bold">Messages</h2>
      </div>
      <div className="py-5 px-4 flex flex-col gap-2 flex-1 overflow-auto scrollbar-none">
        {chatContacts.map((contact, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-3 cursor-pointer ${selectedUser?._id === contact?._id && "bg-accent/80"} hover:bg-accent/80 rounded-xl py-2 px-3`}
            onClick={() => handleUserMessages(contact)}
          >
            <div
              className={`rounded-full relative p-[1px] ${onlineUsers?.includes(contact?._id) && "border-2 border-green-500"}`}
            >
              <UserAvatar
                profilePicture={contact?.profilePicture}
                avatarStyle="size-11"
              />
              {onlineUsers?.includes(contact?._id) && (
                <span className="w-2 h-2 absolute bottom-0 right-1 bg-green-500 rounded-full" />
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-text-secondary text-md">
                {contact?.name}
              </span>
              <span className="font-medium text-sm text-text-muted">
                @{contact?.username}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageSidebar;
