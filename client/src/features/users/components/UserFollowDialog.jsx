import { useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useUserStore } from "../useUserStore";
import UserCard from "./UserCard";

const UserFollowDialog = ({
  open,
  setOpen,
  defaultValue,
  userId,
  setDefaultValue,
}) => {
  const { user, followers, followings, getFollowers, getFollowings } =
    useUserStore();

  useEffect(() => {
    if (defaultValue === "followers") {
      getFollowers(userId);
    }

    if (defaultValue === "followings") {
      getFollowings(userId);
    }
  }, [defaultValue, getFollowers, getFollowings, userId]);

  useEffect(() => {
    setOpen(false);
  }, [user]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-3 sm:max-w-[500px] h-[80vh]">
        <DialogHeader className="hidden">
          <DialogTitle>Followers and followings</DialogTitle>
          <DialogDescription>Followers and followings</DialogDescription>
        </DialogHeader>
        <Tabs
          value={defaultValue}
          onValueChange={setDefaultValue}
          className="h-full overflow-hidden"
        >
          <TabsList>
            <TabsTrigger value="followers" className="cursor-pointer">
              Followers
            </TabsTrigger>
            <TabsTrigger value="followings" className="cursor-pointer">
              Followings
            </TabsTrigger>
          </TabsList>
          <div className="h-full overflow-auto scrollbar-none">
            <TabsContent value="followers">
              {followers?.map((follower) => (
                <UserCard follower={follower} key={follower?._id} />
              ))}
            </TabsContent>
            <TabsContent value="followings">
              {followings?.map((following) => (
                <UserCard following={following} key={following?._id} />
              ))}
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default UserFollowDialog;
