import { usePostStore } from "../usePostStore";
import AddComment from "./AddComment";
import CommentCard from "./CommentCard";

const PostCommentSection = () => {
  const { post } = usePostStore();

  return (
    <div id="comments">
      <AddComment />
      {post && <CommentCard />}
    </div>
  );
};

export default PostCommentSection;
