import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import UserAvatar from "@/features/posts/components/common/UserAvatar";
import { formatDate } from "@/features/posts/utils/formatDate";
import { useAuthStore } from "@/store/useAuthStore";

import { useUserStore } from "../useUserStore";
import Bookmarks from "./Bookmarks";
import UserPostsFeed from "./UserPostsFeed";

const Profile = ({ user }) => {
  const { authUser } = useAuthStore();
  const { followAndUnfollow } = useUserStore();

  const isFollowing = authUser?.followings?.includes(user?._id);

  const [selectedTab, setSelectedTab] = useState("Posts");

  const handleFollowUnfollow = () => {
    followAndUnfollow(user?._id);
  };

  return (
    <div className="min-h-full w-full flex flex-row-reverse">
      <div className="w-[380px] border-l py-8 px-5">
        <UserAvatar user={user} avatarStyle="size-32" />

        <div className="flex flex-col leading-4 mt-5">
          <span className="text-2xl font-bold text-text-secondary">
            {user?.name}
          </span>
          <span className="text-md text-text-muted mt-3">
            @{user?.username}
          </span>
          <span className="text-text-muted/50 mt-1">
            Joined {formatDate(user?.createdAt)}
          </span>
        </div>

        <div className="mt-3 flex flex-col">
          <div className="flex gap-3">
            <span className="font-bold cursor-pointer">
              {user?.followers?.length}{" "}
              <span className="font-normal text-text-secondary">followers</span>
            </span>
            <span className="font-bold cursor-pointer">
              {user?.followings?.length}{" "}
              <span className="font-normal text-text-secondary">
                followings
              </span>
            </span>
          </div>
          <span className="font-bold cursor-pointer">
            {user?.posts?.length}{" "}
            <span className="font-normal text-text-secondary">posts</span>
          </span>
        </div>

        <div className="mt-2">
          {user?.bio ? (
            <span className="mt-2 text-text-secondary">{user?.bio}</span>
          ) : user?._id === authUser?._id ? (
            <Button variant="outline">
              <FaPlus /> Add bio
            </Button>
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
          <Button
            className="mt-3"
            // onClick={handleFollowUnfollow}
          >
            Edit Profile
          </Button>
        )}
      </div>

      <div className="w-full">
        <div className="border-b py-3 flex gap-2 px-5">
          {["Posts", "Bookmarks"].map((title, idx) => {
            if (title === "Bookmarks" && authUser?._id !== user?._id)
              return null;

            return (
              <div key={idx}>
                <Button
                  variant={selectedTab === title ? "outline" : "ghost"}
                  onClick={() => setSelectedTab(title)}
                >
                  {title}
                </Button>
              </div>
            );
          })}
        </div>

        <div className="mt-8 px-4 mb-10">
          <div>
            {selectedTab === "Posts" && <UserPostsFeed userId={user?._id} />}
          </div>
          <div>
            {authUser?._id === user?._id && selectedTab === "Bookmarks" && (
              <Bookmarks />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
