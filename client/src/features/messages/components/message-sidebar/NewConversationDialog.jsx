import { useEffect, useState } from "react";

import UserAvatar from "@/components/common/UserAvatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useExploreStore } from "@/features/explore/useExploreStore";
import { useUserStore } from "@/features/users/useUserStore";
import useBreakPoints from "@/hooks/useBreakPoints";
import { useAuthStore } from "@/store/useAuthStore";

import { useMessageStore } from "../../useMessageStore";

const NewConversationDialog = ({ children }) => {
  const { followings, getFollowings } = useUserStore();
  const { authUser } = useAuthStore();
  const { setSelectedUser } = useMessageStore();
  const { searchUsers, getSearchUsers } = useExploreStore();

  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { isMobile } = useBreakPoints();

  useEffect(() => {
    if (open) {
      getFollowings(authUser?._id);
    }
  }, [open]);

  //   const handleSearch = (e) => {
  //     e.preventDefault();
  //     getSearchUsers(searchTerm);
  //   };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer" asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="h-[80vh] sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>New message</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          {/* <form onSubmit={handleSearch}>
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form> */}

          <div>
            <div className="flex flex-col gap-4 overflow-auto scrollbar-none h-[70vh] pb-3">
              {followings?.map((following, idx) => (
                <div className="flex justify-between items-center" key={idx}>
                  <div className="flex gap-3 items-center">
                    <UserAvatar
                      profilePicture={following?.profilePicture}
                      avatarStyle={isMobile ? "size-9" : "size-11"}
                    />
                    <div className="flex flex-col leading-4">
                      <span className="font-semibold text-text-secondary text-sm sm:text-[16px]">
                        {following?.name}
                      </span>
                      <span className="text-text-muted text-xs sm:text-sm">
                        @{following?.username}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1 items-center">
                    <Button
                      variant="secondary"
                      className="z-20"
                      size="sm"
                      onClick={() => {
                        setSelectedUser(following);
                        setOpen(false);
                      }}
                    >
                      Message
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewConversationDialog;
