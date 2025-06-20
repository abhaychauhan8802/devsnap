import { BiLike, BiSolidLike } from "react-icons/bi";
import { FaBookmark } from "react-icons/fa";
import { FaLink, FaRegBookmark } from "react-icons/fa6";
import { MdOutlineMessage } from "react-icons/md";
import { Link } from "react-router";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { usePostStore } from "@/features/posts/usePostStore";
import { useAuthStore } from "@/store/useAuthStore";
import { getInitials } from "@/utils/getInitials";

const PostCard = ({ post }) => {
  const { authUser } = useAuthStore();
  const { likePost, setPost, bookmarkPost } = usePostStore();

  const authUserPostsLikes = post.likes.includes(authUser._id);
  const postbookmarked = authUser?.bookmarks?.includes(post._id);

  const handleLike = (e) => {
    e.stopPropagation();
    e.preventDefault();
    likePost(post);
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    e.preventDefault();
    bookmarkPost(post);
  };

  const handleCopyPostLink = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    await navigator.clipboard.writeText(
      `${import.meta.env.VITE_BASE_URL}/post/${post._id}`,
    );

    toast.message("🔗 Copy link to clipboard");
  };

  return (
    <Link
      className="inline-block"
      to={`/post/${post._id}`}
      onClick={() => {
        setPost(post);
      }}
    >
      <div className="border w-[320px] h-[380px] rounded-2xl bg-neutral-50/80 dark:bg-zinc-900 p-4 hover:border-neutral-400 dark:hover:border-zinc-500 cursor-pointer flex flex-col justify-between">
        {/* User info */}
        <div className="flex gap-2 items-center ">
          <Avatar className="size-9">
            <AvatarImage
              src={post.author.profilePicture}
              alt="profilePicture"
            />
            <AvatarFallback className="bg-gray-800 dark:bg-gray-600 text-white text-xs font-semibold">
              {getInitials(post.author.username)}
            </AvatarFallback>
          </Avatar>

          <span className="text-md font-medium text-text-secondary">
            {post.author.username}
          </span>
        </div>

        {/* post */}
        <div className="">
          <h1 className="text-2xl font-bold text-text-primary line-clamp-2">
            {post.title}
          </h1>

          <div className="w-full h-[160px] mt-5 rounded-xl overflow-hidden">
            {post.image && (
              <img src={post.image} alt="img" className="object-cover" />
            )}
          </div>
        </div>

        {/* buttons */}
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="secondary"
              className={`flex gap-2 items-center z-10 hover:bg-green-500/20 dark:hover:dark:bg-green-600/50 ${authUserPostsLikes && "bg-green-300/20 dark:bg-green-600/50"}`}
              onClick={handleLike}
            >
              {authUserPostsLikes ? (
                <>
                  <BiSolidLike className="text-green-600 dark:text-green-400" />
                  <span className="text-green-600 dark:text-green-400">
                    {post.likes.length}
                  </span>
                </>
              ) : (
                <>
                  <BiLike />
                  <span>{post.likes.length}</span>
                </>
              )}
            </Button>

            <Button variant="ghost">
              <MdOutlineMessage />
              <span>{post.comments.length}</span>
            </Button>
            <Button variant="ghost" onClick={handleBookmark}>
              {postbookmarked ? <FaBookmark /> : <FaRegBookmark />}
            </Button>
          </div>
          <div>
            <Button variant="ghost" onClick={handleCopyPostLink}>
              <FaLink />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
