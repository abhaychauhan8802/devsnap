import { useState } from "react";
import { IoMdMenu } from "react-icons/io";

import MenuMore from "@/components/common/MenuMore";
import UserAvatar from "@/components/common/UserAvatar";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/features/posts/utils/formatDate";
import useBreakPoints from "@/hooks/useBreakPoints";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";

import { useUserStore } from "../useUserStore";
import Bookmarks from "./Bookmarks";
import EditProfile from "./EditProfile";
import UserFollowDialog from "./UserFollowDialog";
import UserPostFeed from "./UserPostFeed";

const tabs = [
  {
    name: "Posts",
  },
  {
    name: "Bookmarks",
  },
];

const Profile = ({ user }) => {
  const { authUser } = useAuthStore();
  const { followAndUnfollow } = useUserStore();

  const [open, setOpen] = useState(false);
  const [defaultValue, setDefaultValue] = useState(null);

  const isFollowing = authUser?.followings.includes(user?._id);

  const { isMobile } = useBreakPoints();

  const [selectedTab, setSelectedTab] = useState("Posts");

  const handleFollowUnfollow = () => {
    followAndUnfollow(user?._id);
  };

  return (
    <>
      <div className="h-14 border-b sticky top-0 bg-background z-20 flex items-center justify-between px-4 sm:hidden">
        <h3 className="text-lg font-bold">Profile</h3>
        <MenuMore>
          <div className="p-2 rounded-lg flex items-center justify-center text-text-secondary cursor-pointer">
            <IoMdMenu size={20} align="end" />
          </div>
        </MenuMore>
      </div>
      <div>
        <div className="max-w-2xl w-full mx-auto px-4">
          <div className="w-full shrink-0 h-fit mt-5">
            <div>
              <div className="flex gap-6">
                <UserAvatar
                  profilePicture={user?.profilePicture}
                  avatarStyle={isMobile ? "size-16" : "size-36"}
                />

                <div>
                  <div className="flex flex-col leading-1 pb-2">
                    <span className="text-lg sm:text-2xl font-bold text-text-secondary">
                      {user?.name}
                    </span>
                    <span className="text-md text-text-muted mt-1">
                      @{user?.username}
                    </span>
                  </div>
                  <span className="text-text-muted/70 text-sm">
                    Joined {formatDate(user?.createdAt)}
                  </span>

                  {!isMobile && (
                    <div className="mt-3 flex flex-col">
                      <div className="flex gap-3">
                        <span className="font-bold">
                          {user?.posts?.length}{" "}
                          <span className="font-normal text-text-secondary">
                            posts
                          </span>
                        </span>
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

                      <UserFollowDialog
                        open={open}
                        setOpen={setOpen}
                        defaultValue={defaultValue}
                        setDefaultValue={setDefaultValue}
                        userId={user?._id}
                      />
                    </div>
                  )}
                </div>
              </div>

              {isMobile && (
                <div className="mt-3 flex flex-col">
                  <div className="flex justify-between px-2">
                    <span className="font-bold flex flex-col items-center">
                      {user?.posts?.length}{" "}
                      <span className="font-normal text-text-secondary">
                        posts
                      </span>
                    </span>
                    <span
                      className="font-bold cursor-pointer flex flex-col items-center"
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
                      className="font-bold cursor-pointer flex flex-col items-center"
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

                  <UserFollowDialog
                    open={open}
                    setOpen={setOpen}
                    defaultValue={defaultValue}
                    setDefaultValue={setDefaultValue}
                    userId={user?._id}
                  />
                </div>
              )}

              <div className="mt-3">
                {user?.bio ? (
                  <span className="mt-2 text-text-secondary">{user?.bio}</span>
                ) : (
                  ""
                )}
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
            </div>
          </div>

          <div className="w-full my-5">
            <div className="flex border-b">
              {tabs.map((tab, idx) => {
                if (tab.name === "Bookmarks" && authUser?._id !== user?._id) {
                  if (tab.name === selectedTab) setSelectedTab("Posts");
                  return;
                }
                return (
                  <button
                    key={idx}
                    className={cn(
                      "flex items-center justify-center gap-1 cursor-pointer px-2 py-3 hover:bg-secondary text-text-muted flex-1",
                      selectedTab === tab.name &&
                        "border-b-2 border-primary text-text-primary font-semibold",
                    )}
                    onClick={() => setSelectedTab(tab.name)}
                  >
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </div>
            <div className="mt-6">
              {selectedTab === "Posts" && <UserPostFeed userId={user?._id} />}
              {selectedTab === "Bookmarks" && authUser?._id === user?._id && (
                <Bookmarks userId={user?._id} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
