import { Link } from "react-router";
import { useNavigate } from "react-router";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { usePostStore } from "@/features/posts/usePostStore";
import { useAuthStore } from "@/store/useAuthStore";

import PostActionButtons from "./common/PostActionButtons";
import UserAvatar from "./common/UserAvatar";

const PostCard = ({ post }) => {
  const { authUser } = useAuthStore();
  const { setPost } = usePostStore();

  const navigate = useNavigate();

  const handeUserProfile = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const authUsername = authUser?.username;
    const postAuthorUsername = post?.author?.username;

    if (authUsername !== postAuthorUsername) {
      navigate(`/user/${postAuthorUsername}`);
    } else {
      navigate("/profile");
    }
  };

  return (
    <Link
      className="inline-block"
      to={`/post/${post._id}`}
      onClick={() => {
        setPost(post);
      }}
    >
      <Card className={`grid hover:border hover:border-primary`}>
        <CardContent className="w-full">
          <div className="flex gap-2 items-center" onClick={handeUserProfile}>
            <UserAvatar avatarStyle="size-9" post={post} />

            <span className="text-md font-medium text-text-secondary">
              {post.author.username}
            </span>
          </div>

          {/* post */}
          <div className="mt-3">
            <h1 className="text-2xl font-bold text-text-primary line-clamp-2 h-16">
              {post.title}
            </h1>

            <div className="w-full h-[160px] mt-5 rounded-xl overflow-hidden">
              {post.image && (
                <img src={post.image} alt="img" className="object-cover" />
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
