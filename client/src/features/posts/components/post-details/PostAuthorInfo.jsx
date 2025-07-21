import { Link } from "react-router";

import UserAvatar from "@/components/common/UserAvatar";
import { Button } from "@/components/ui/button";
import SuggestedUser from "@/features/users/components/SuggestedUser";
import { useUserStore } from "@/features/users/useUserStore";
import { useAuthStore } from "@/store/useAuthStore";

import { formatDate } from "../../utils/formatDate";

const PostAuthorInfo = ({ post }) => {
  const { followAndUnfollow } = useUserStore();
  const { authUser } = useAuthStore();

  const isFollowing = authUser?.followings?.includes(post?.author?._id);

  const handleFollowUnfollow = () => {
    followAndUnfollow(post?.author?._id);
  };

  return (
    <div className="w-[300px] border-l shrink-0 hidden lg:inline-block sticky space-y-4 px-5 top-0 h-screen pt-5">
      <div className="relative">
        <Link to={`/user/${post?.author?.username}`}>
          <UserAvatar
            avatarStyle="size-16"
            profilePicture={post?.author?.profilePicture}
          />
        </Link>

        <div className="flex flex-col leading-4 mt-2">
          <span className="text-lg font-medium text-text-secondary">
            {post?.author?.name}
          </span>
          <span className="text-md text-text-muted mt-3">
            @{post?.author?.username}
            <span className="text-text-muted/50 pl-2">
              Joined {formatDate(post?.author?.createdAt)}
            </span>
          </span>
          <span className="mt-2 text-text-secondary">{post?.author?.bio}</span>
        </div>

        {authUser._id !== post?.author?._id && (
          <Button
            className="absolute top-4 right-0"
            variant={isFollowing ? "secondary" : "default"}
            onClick={handleFollowUnfollow}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        )}
      </div>

      <hr />

      <div className="">
        <SuggestedUser />
      </div>
    </div>
  );
};

export default PostAuthorInfo;
