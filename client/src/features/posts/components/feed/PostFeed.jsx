import { useState } from "react";
import { Link } from "react-router";

import { Logo } from "@/components";
import UserAvatar from "@/components/common/UserAvatar";
import SuggestedUser from "@/features/users/components/SuggestedUser";
import { cn } from "@/lib/utils";
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
    <>
      <div className="h-14 border-b sticky top-0 bg-background z-20 flex items-center px-4 sm:hidden">
        <div className="scale-70">
          <Logo />
        </div>
      </div>
      <div className="flex gap-5 sm:px-4">
        <div className="max-w-2xl w-full mx-auto px-4">
          <div className="flex border-b sm:sticky top-0 bg-background/60 backdrop-blur-3xl z-20">
            {tabs.map((tab, idx) => (
              <button
                key={idx}
                className={cn(
                  "flex items-center justify-center gap-1 cursor-pointer px-2 py-3 hover:bg-secondary text-text-muted flex-1",
                  currentTab === tab.name &&
                    "border-b-2 border-primary text-text-primary font-semibold",
                )}
                onClick={() => handleTabSwitch(tab.name)}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
          <div className="mt-2 sm:mt-6">
            {currentTab === "foryou" && <ForYouPosts />}
            {currentTab === "followings" && <FollowingsPosts />}
          </div>
        </div>

        <div className="w-[300px] border-l shrink-0 hidden lg:inline-block sticky space-y-4 px-5 top-0 h-screen">
          <div className="relative">
            <h1 className="py-4 font-semibold">Current User</h1>
            <Link
              to={`/user/${authUser?.username}`}
              className="flex gap-3 items-center hover:bg-background/80"
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
    </>
  );
};

export default PostFeed;
