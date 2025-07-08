import { Link } from "react-router";

import UserAvatar from "@/components/common/UserAvatar";
import SuggestedUser from "@/features/users/components/SuggestedUser";
import { useAuthStore } from "@/store/useAuthStore";

import ForYouPosts from "./ForYouPosts";

const PostFeed = () => {
  const { authUser } = useAuthStore();

  return (
    <div className="flex gap-5 pt-5 px-4">
      <div className="max-w-2xl w-full mx-auto  pt-0 gap-5">
        <ForYouPosts />
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
