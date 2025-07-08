import { useEffect } from "react";
import { Link } from "react-router";

import UserAvatar from "@/components/common/UserAvatar";

import { useUserStore } from "../useUserStore";

const SuggestedUser = () => {
  const { suggestedUsers, getSuggested } = useUserStore();

  useEffect(() => {
    getSuggested();
  }, [getSuggested]);

  return (
    <div className="border rounded-xl bg-card overflow-hidden">
      <h2 className="p-4">Suggested users</h2>
      <div className="">
        {suggestedUsers.map((user, _) => (
          <Link
            to={`/user/${user?.username}`}
            key={user._id}
            className="flex items-center gap-4 px-4 py-3 cursor-pointer border-t hover:bg-background/80"
          >
            <UserAvatar
              avatarStyle="size-12"
              profilePicture={user?.profilePicture}
            />

            <div className="flex flex-col leading-5">
              <span className="text-lg font-medium text-text-secondary">
                {user?.name}
              </span>
              <span className="text-md text-text-muted">@{user?.username}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuggestedUser;
