import { Link } from "react-router";

import UserAvatar from "@/components/common/UserAvatar";
import "@/components/tiptap/tiptap.css";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/features/users/useUserStore";
import { useAuthStore } from "@/store/useAuthStore";

import PostCommentSection from "../comment/PostCommentSection";
import PostActionButtons from "../common/PostActionButtons";

const PostContent = ({ post }) => {
  const { authUser } = useAuthStore();

  const { followAndUnfollow } = useUserStore();

  const isFollowing = authUser?.followings?.includes(post?.author?._id);

  const handleFollowUnfollow = () => {
    followAndUnfollow(post?.author?._id);
  };

  return (
    <div className="max-w-5xl w-full mx-auto lg:pr-8 pt-5">
      {/* post image */}
      {post?.image && (
        <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-md">
          <img
            src={post?.image}
            alt="image"
            className="object-cover w-full h-full"
          />
        </AspectRatio>
      )}

      <div className="pb-10">
        {/* User info */}
        <div
          className={`flex gap-2 items-center justify-center cursor-pointer w-fit ${post?.image && "mt-8"}`}
        >
          {/* Avatar */}
          <Link
            to={`/user/${post?.author?.username}`}
            className="flex items-center gap-2"
          >
            <UserAvatar
              avatarStyle="size-10"
              profilePicture={post?.author?.profilePicture}
            />

            {/* Name and username */}
            <div className="flex flex-col leading-4">
              <span className="text-md font-medium text-text-secondary">
                {post?.author?.name}
              </span>
              <span className="text-sm text-text-muted">
                @{post?.author?.username}
              </span>
            </div>
          </Link>
          {authUser._id !== post?.author?._id && (
            <Button
              className="lg:hidden ml-4"
              variant={isFollowing ? "secondary" : "default"}
              onClick={handleFollowUnfollow}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </Button>
          )}
        </div>

        {/* Post info */}
        <div className="my-7">
          {/* post title */}
          <h1 className="font-bold text-4xl text-text-primary">
            {post?.title}
          </h1>

          {/* post content */}
          <div className="mt-8 text-text-secondary text-lg">
            <p
              dangerouslySetInnerHTML={{ __html: post?.text }}
              className="ProseMirror"
            ></p>
          </div>
        </div>

        {/* Actions buttons */}
        <div>
          <PostActionButtons
            post={post}
            commentIcon={false}
            mainStyle="border rounded-xl p-1"
          />
        </div>

        {/* Post comments */}
        <PostCommentSection />
      </div>
    </div>
  );
};

export default PostContent;
