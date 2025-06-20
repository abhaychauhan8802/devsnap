import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/utils/getInitials";

const PostContent = ({ post }) => {
  const navigate = useNavigate();

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
        <div
          className="flex gap-2 items-center justify-center cursor-pointer w-fit"
          onClick={() => console.log("Click")}
        >
          {/* Avatar */}
          <Avatar className="size-10">
            <AvatarImage
              src={post?.author?.profilePicture}
              alt="profilePicture"
            />
            <AvatarFallback className="bg-gray-800 dark:bg-gray-600 text-white text-sm font-semibold">
              {getInitials(post?.author?.username)}
            </AvatarFallback>
          </Avatar>

          {/* Name and username */}
          <div className="flex flex-col leading-4">
            <span className="text-md font-medium text-text-secondary">
              {post?.author?.name}
            </span>
            <span className="text-sm text-text-muted">
              @{post?.author?.username}
            </span>
          </div>
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
        <div></div>
      </div>
    </div>
  );
};

export default PostContent;
