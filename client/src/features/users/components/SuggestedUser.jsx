import { useEffect } from "react";
import { Link } from "react-router";

import UserAvatar from "@/components/common/UserAvatar";

import { useUserStore } from "../useUserStore";

const SuggestedUser = () => {
  const { suggestedUsers, getSuggested } = useUserStore();

  useEffect(() => {
    if (suggestedUsers.length === 0) {
      getSuggested();
    }
  }, [getSuggested, suggestedUsers.length]);

  return (
    <div className="">
      <h2 className="py-4 font-semibold">Suggested users</h2>
      <div className="">
        {suggestedUsers.map((user) => (
          <Link
            to={`/user/${user?.username}`}
            key={user._id}
            className="flex items-center gap-4 py-3 cursor-pointer hover:bg-background/80"
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
