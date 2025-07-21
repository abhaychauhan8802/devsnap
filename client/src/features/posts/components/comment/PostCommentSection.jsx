import { usePostStore } from "../../usePostStore";
import AddComment from "./AddComment";
import CommentCard from "./CommentCard";

const PostCommentSection = () => {
  const { post } = usePostStore();

  return (
    <div id="comments" className="mt-5">
      <h3 className="text-xl font-semibold ">
        Comments {post?.comments?.length}
      </h3>
      <AddComment />
      <hr className="mt-8" />
      {post && <CommentCard />}
    </div>
  );
};

export default PostCommentSection;
