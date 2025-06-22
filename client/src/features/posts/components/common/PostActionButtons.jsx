import { BiLike, BiSolidLike } from "react-icons/bi";
import { FaBookmark } from "react-icons/fa";
import { FaLink, FaRegBookmark } from "react-icons/fa6";
import { MdOutlineMessage } from "react-icons/md";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";

import { usePostStore } from "../../usePostStore";

const PostActionButtons = ({ post, mainStyle = "", setIsCommentOpen }) => {
  const { authUser } = useAuthStore();
  const { likePost, bookmarkPost } = usePostStore();

  const navigate = useNavigate();

  const authUserPostsLikes = post?.likes?.includes(authUser?._id);
  const postbookmarked = authUser?.bookmarks?.includes(post?._id);

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

  const handleCommentBoxOpen = () => {
    if (!setIsCommentOpen) {
      return;
    }
    setIsCommentOpen((prev) => !prev);
  };

  return (
    <div className={`flex justify-between ${mainStyle}`}>
      <div className={`flex gap-2`}>
        <Button
          variant="ghost"
          className={`flex gap-2 items-center z-10 hover:bg-green-500/20 dark:hover:dark:bg-green-600/50 ${authUserPostsLikes && "bg-green-300/20 dark:bg-green-600/50"}`}
          onClick={handleLike}
        >
          {authUserPostsLikes ? (
            <>
              <BiSolidLike className="text-green-600 dark:text-green-400" />
              <span className="text-green-600 dark:text-green-400">
                {post?.likes?.length}
              </span>
            </>
          ) : (
            <>
              <BiLike />
              <span>{post?.likes?.length}</span>
            </>
          )}
        </Button>

        <Button variant="ghost" onClick={handleCommentBoxOpen}>
          <MdOutlineMessage />
          <span>{post?.comments?.length}</span>
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
  );
};

export default PostActionButtons;
