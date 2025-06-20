import { useEffect } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { getInitials } from "@/utils/getInitials";

import { formatDate } from "../utils/formatDate";

const PostAuthorInfo = ({ post }) => {
  const { suggestedUsers, getSuggested } = useAuthStore();

  useEffect(() => {
    getSuggested();
  }, [getSuggested]);

  console.log(suggestedUsers);

  return (
    <div className="w-[400px] pt-5 hidden lg:block">
      <div className="relative border p-4 rounded-2xl">
        <Avatar className="size-14 cursor-pointer">
          <AvatarImage
            src={post?.author?.profilePicture}
            alt="profilePicture"
          />
          <AvatarFallback className="bg-gray-800 dark:bg-gray-600 text-white text-sm font-semibold">
            {getInitials(post?.author?.username)}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col leading-4 mt-2">
          <span className="text-lg font-medium text-text-secondary">
            {post?.author?.name}
          </span>
          <span className="text-md text-text-muted mt-3">
            @{post?.author?.username}{" "}
            <span className="text-text-muted/50">
              Joined {formatDate(post?.author?.createdAt)}
            </span>
          </span>
          <span className="mt-2 text-text-secondary">{post?.author?.bio}</span>
        </div>

        <Button className="absolute top-4 right-4">Follow</Button>
      </div>

      <div className="mt-4 border rounded-2xl">
        <h2 className="p-4">More users</h2>
        <div className="">
          {suggestedUsers.map((user, _) => (
            <div
              key={user._id}
              className="flex items-center gap-4 px-4 py-3 cursor-pointer border-t"
            >
              <Avatar className="size-12 ">
                <AvatarImage src={user?.profilePicture} alt="profilePicture" />
                <AvatarFallback className="bg-gray-800 dark:bg-gray-600 text-white text-sm font-semibold">
                  {getInitials(user?.username)}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col leading-5">
                <span className="text-lg font-medium text-text-secondary">
                  {post?.author?.name}
                </span>
                <span className="text-md text-text-muted">
                  @{post?.author?.username}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostAuthorInfo;
