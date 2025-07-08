import { forwardRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePostStore } from "@/features/posts/usePostStore";
import { useUserStore } from "@/features/users/useUserStore";
import { useAuthStore } from "@/store/useAuthStore";

import UserAvatar from "../../../components/common/UserAvatar";
import PostActionButtons from "./common/PostActionButtons";

const PostCard = forwardRef(({ post, varient = "default" }, ref) => {
  const { authUser } = useAuthStore();
  const { setPost } = usePostStore();
  const { deleteUserPost } = useUserStore();

  const navigate = useNavigate();

  const authUsername = authUser?.username;
  const postAuthorUsername = post?.author?.username;

  const isWide = varient === "wide";

  const handleNavigate = (e) => {
    e.stopPropagation();
    e.preventDefault();

    navigate(`/user/${postAuthorUsername}`);
  };

  const handleDeletePost = (e) => {
    e.stopPropagation();
    deleteUserPost(post?._id);
  };

  return (
    <Link
      className="inline-block"
      to={`/post/${post._id}`}
      onClick={() => {
        setPost(post);
      }}
      ref={ref}
    >
      <Card className={`hover:bg-secondary/10`}>
        <CardContent className="w-full">
          {/* Post owner info */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center" onClick={handleNavigate}>
              <UserAvatar
                avatarStyle="size-9"
                profilePicture={post?.author?.profilePicture}
              />

              <span className="text-md font-medium text-text-secondary">
                {post.author.username}
              </span>
            </div>
            {authUsername === postAuthorUsername && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <BsThreeDotsVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleDeletePost}>
                    Delete Post
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* post */}
          <div
            className={`mt-4 flex flex-col gap-8 ${isWide && "flex-row justify-between"}`}
          >
            <div className="flex-[65%] flex flex-col justify-between">
              <h1
                className={`text-2xl font-bold text-text-primary line-clamp-2 h-16`}
              >
                {post.title}
              </h1>
              {isWide && (
                <div className="">
                  <PostActionButtons post={post} mainStyle="w-full" />
                </div>
              )}
            </div>

            <div
              className={`${isWide ? "aspect-5/4 flex-[35%]" : "aspect-video"} rounded-xl overflow-hidden`}
            >
              {post.image && (
                <img
                  src={post.image}
                  alt="img"
                  className="object-cover h-full w-full"
                />
              )}
            </div>
          </div>

          {/* buttons */}
          {!isWide && (
            <div className="mt-4">
              <PostActionButtons post={post} mainStyle="w-full" />
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
});

export default PostCard;
