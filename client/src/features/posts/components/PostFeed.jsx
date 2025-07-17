import { useState } from "react";
import { Link } from "react-router";

import UserAvatar from "@/components/common/UserAvatar";
import SuggestedUser from "@/features/users/components/SuggestedUser";
import { useAuthStore } from "@/store/useAuthStore";

import FollowingsPosts from "./FollowingsPosts";
import ForYouPosts from "./ForYouPosts";

const tabs = [
  {
    name: "foryou",
    label: "For You",
  },
  {
    name: "followings",
    label: "Followings",
  },
];

const PostFeed = () => {
  const { authUser } = useAuthStore();

  const [currentTab, setCurrentTab] = useState(
    sessionStorage.getItem("currentTab") || "foryou",
  );

  const handleTabSwitch = (tab) => {
    sessionStorage.setItem("currentTab", tab);
    setCurrentTab(tab);
  };

  return (
    <div className="flex gap-5 pt-3 px-4">
      <div className="max-w-2xl w-full mx-auto pt-0 px-4">
        <div className="flex gap-3 border-b">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              className={`flex items-center gap-1 cursor-pointer px-2 py-2 ${currentTab === tab.name && "border-b-2 border-primary text-primary"}`}
              onClick={() => handleTabSwitch(tab.name)}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
        <div className="mt-6">
          {currentTab === "foryou" && <ForYouPosts />}
          {currentTab === "followings" && <FollowingsPosts />}
        </div>
      </div>

      <div className="w-[300px] shrink-0 hidden lg:inline-block sticky top-5 h-fit space-y-4">
        <div className="relative border rounded-xl bg-card overflow-hidden">
          <h1 className=" border-b p-4">Current User</h1>
          <Link
            to={`/user/${authUser?.username}`}
            className="flex gap-3 items-center p-4 hover:bg-background/80"
          >
            <UserAvatar
              avatarStyle="size-12"
              profilePicture={authUser?.profilePicture}
            />

            <div className="flex flex-col">
              <span className="text-lg font-medium text-text-secondary">
                {authUser?.name}
              </span>
              <span className="text-md text-text-muted">
                @{authUser?.username}
              </span>
            </div>
          </Link>
        </div>
        <SuggestedUser />
      </div>
    </div>
  );
};

export default PostFeed;
