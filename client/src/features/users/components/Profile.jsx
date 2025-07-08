import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

import UserAvatar from "@/components/common/UserAvatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/features/posts/utils/formatDate";
import { useAuthStore } from "@/store/useAuthStore";

import { useUserStore } from "../useUserStore";
import Bookmarks from "./Bookmarks";
import EditProfile from "./EditProfile";
import UserFollowDialog from "./UserFollowDialog";
import UserPostFeed from "./UserPostFeed";

const Profile = ({ user }) => {
  const { authUser, logout } = useAuthStore();
  const { followAndUnfollow } = useUserStore();

  const [open, setOpen] = useState(false);
  const [defaultValue, setDefaultValue] = useState(null);

  const isFollowing = authUser?.followings?.includes(user?._id);

  const [selectedTab, setSelectedTab] = useState("Posts");

  const handleFollowUnfollow = () => {
    followAndUnfollow(user?._id);
  };

  return (
    <>
      <div className="min-h-full">
        <div className="max-w-5xl w-full flex flex-col lg:flex-row-reverse gap-2 lg:gap-5 mx-auto px-5">
          <div>
            <Card className="w-full lg:w-[300px] shrink-0 h-fit mt-5 bg-card/30">
              <CardContent>
                <UserAvatar
                  profilePicture={user?.profilePicture}
                  avatarStyle="size-32"
                />

                <div className="flex flex-col leading-4 mt-5">
                  <span className="text-2xl font-bold text-text-secondary">
                    {user?.name}
                  </span>
                  <span className="text-md text-text-muted mt-1">
                    @{user?.username}
                  </span>
                  <span className="text-text-muted/50 mt-1">
                    Joined {formatDate(user?.createdAt)}
                  </span>
                </div>

                <div className="mt-2">
                  {user?.bio ? (
                    <span className="mt-2 text-text-secondary">
                      {user?.bio}
                    </span>
                  ) : (
                    ""
                  )}
                </div>

                <div className="mt-3 flex flex-col">
                  <div className="flex gap-3">
                    <span
                      className="font-bold cursor-pointer"
                      onClick={() => {
                        setDefaultValue("followers");
                        setOpen(true);
                      }}
                    >
                      {user?.followers?.length}{" "}
                      <span className="font-normal text-text-secondary">
                        followers
                      </span>
                    </span>
                    <span
                      className="font-bold cursor-pointer"
                      onClick={() => {
                        setDefaultValue("followings");
                        setOpen(true);
                      }}
                    >
                      {user?.followings?.length}{" "}
                      <span className="font-normal text-text-secondary">
                        followings
                      </span>
                    </span>
                  </div>
                  <span className="font-bold">
                    {user?.posts?.length}{" "}
                    <span className="font-normal text-text-secondary">
                      posts
                    </span>
                  </span>
                  <UserFollowDialog
                    open={open}
                    setOpen={setOpen}
                    defaultValue={defaultValue}
                    setDefaultValue={setDefaultValue}
                    userId={user?._id}
                  />
                </div>

                {authUser?._id !== user?._id ? (
                  <Button
                    className="mt-3"
                    variant={isFollowing ? "secondary" : "default"}
                    onClick={handleFollowUnfollow}
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </Button>
                ) : (
                  <EditProfile />
                )}
              </CardContent>
            </Card>
          </div>

          <div className="w-full">
            <Tabs
              defaultValue="Posts"
              onValueChange={setSelectedTab}
              className="w-full"
            >
              <TabsList className="border w-full h-10 overflow-hidden p-0 mt-5 sticky top-0 z-20">
                {["Posts", "Bookmarks"].map((title) => {
                  if (title === "Bookmarks" && authUser?._id !== user?._id)
                    return null;
                  return (
                    <TabsTrigger
                      key={title}
                      value={title}
                      className="rounded-none"
                    >
                      {title}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
              <TabsContent value="Posts" className="mt-4 mb-10">
                <UserPostFeed userId={user?._id} />
              </TabsContent>
              {authUser?._id === user?._id && (
                <TabsContent value="Bookmarks" className="mt-4 mb-10">
                  <Bookmarks />
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
