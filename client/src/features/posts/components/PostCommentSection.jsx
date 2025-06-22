import { usePostStore } from "../usePostStore";
import AddComment from "./AddComment";
import PostComments from "./PostComments";

const PostCommentSection = ({ isCommentOpen }) => {
  const { post } = usePostStore();

  return (
    <div id="comments">
      {isCommentOpen && <AddComment />}
      {post && <PostComments />}
    </div>
  );
};

export default PostCommentSection;
