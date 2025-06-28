import MessageSidebar from "./MessageSidebar";
import UserMessages from "./UserMessages";

const Message = () => {
  return (
    <div className="h-full w-full flex overflow-hidden scrollbar-none">
      <MessageSidebar />
      <UserMessages />
    </div>
  );
};

export default Message;
