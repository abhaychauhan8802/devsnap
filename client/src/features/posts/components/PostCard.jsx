import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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

const PostCard = ({ post, type = "default" }) => {
  const { authUser } = useAuthStore();
  const { setPost } = usePostStore();
  const { deleteUserPost } = useUserStore();

  const navigate = useNavigate();

  const authUsername = authUser?.username;
  const postAuthorUsername = post?.author?.username;

  const wide = type === "wide";

  const handleNavigate = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (authUsername !== postAuthorUsername) {
      navigate(`/user/${postAuthorUsername}`);
    } else {
      navigate("/profile");
    }
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
    >
      <Card className={`hover:border hover:border-primary`}>
        <CardContent className="w-full">
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
          <div className={`mt-4 ${wide && "flex justify-between items-start"}`}>
            <h1
              className={`text-2xl font-bold text-text-primary line-clamp-2 h-16 ${wide && "w-1/2"}`}
            >
              {post.title}
            </h1>

            <div
              className={`aspect-video mt-5 rounded-xl overflow-hidden ${wide && "w-1/3 mt-0"}`}
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
        </CardContent>
        <CardFooter className="content-end py-0">
          <PostActionButtons post={post} mainStyle="w-full" />
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PostCard;
