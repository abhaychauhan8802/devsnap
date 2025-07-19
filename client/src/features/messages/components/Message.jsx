import { useEffect } from "react";

import useBreakPoints from "@/hooks/useBreakPoints";

import { useMessageStore } from "../useMessageStore";
import UserMessages from "./UserMessages";
import MessageSidebar from "./message-sidebar/MessageSidebar";

const Message = () => {
  const { selectedUser, setSelectedUser } = useMessageStore();

  const { isMid } = useBreakPoints();

  useEffect(() => {
    if (selectedUser) {
      window.history.pushState({ selectedUser: true }, "");
    }

    const handlePopState = (e) => {
      if (selectedUser) {
        setSelectedUser(null);
        window.history.pushState(null, "");
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [selectedUser]);

  return (
    <>
      {isMid ? (
        <div className="w-full">
          {selectedUser ? <UserMessages /> : <MessageSidebar />}
        </div>
      ) : (
        <div className="h-screen w-full flex overflow-hidden scrollbar-none">
          <MessageSidebar />
          <UserMessages />
        </div>
      )}
    </>
  );
};

export default Message;
