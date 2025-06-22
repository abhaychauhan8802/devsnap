import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

import PostCommentSection from "./PostCommentSection";
import PostActionButtons from "./common/PostActionButtons";
import UserAvatar from "./common/UserAvatar";

const PostContent = ({ post }) => {
  const navigate = useNavigate();

  const [isCommentOpen, setIsCommentOpen] = useState(false);

  return (
    <div className="max-w-5xl w-full mx-auto pr-8">
      <div>
        {/* Back button */}
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full size-10 -ml-4 mb-5"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft />
        </Button>

        {/* User info */}
        <div className="flex gap-2 items-center justify-center cursor-pointer w-fit">
          {/* Avatar */}
          <Link
            to={`/user/${post?.author?.username}`}
            className="flex items-center gap-2"
          >
            <UserAvatar avatarStyle="size-10" post={post} />

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
          <Button className="lg:hidden ml-4">Follow</Button>
        </div>

        {/* Post info */}
        <div className="my-7">
          {/* post title */}
          <h1 className="font-bold text-4xl text-text-primary mb-8">
            {post?.title}
          </h1>

          {/* post image */}
          {post?.image && (
            <AspectRatio ratio={16 / 9} className="rounded-lg overflow-hidden">
              <img
                src={post?.image}
                alt="image"
                className="object-cover w-full h-full"
              />
            </AspectRatio>
          )}

          {/* post content */}
          <div className="mt-10 text-text-secondary text-lg">
            <p>{post?.text}</p>
          </div>
        </div>

        {/* Actions buttons */}
        <div>
          <PostActionButtons
            post={post}
            mainStyle="border rounded-xl p-3"
            setIsCommentOpen={setIsCommentOpen}
          />
        </div>

        {/* Post comments */}
        <PostCommentSection isCommentOpen={isCommentOpen} />
      </div>
    </div>
  );
};

export default PostContent;
