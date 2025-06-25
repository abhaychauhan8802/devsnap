import { usePostStore } from "../usePostStore";
import AddComment from "./AddComment";
import PostComments from "./PostComments";

const PostCommentSection = ({ isCommentOpen, setIsCommentOpen }) => {
  const { post } = usePostStore();

  return (
    <div id="comments">
      {isCommentOpen && <AddComment setIsCommentOpen={setIsCommentOpen} />}
      {post && <PostComments />}
    </div>
  );
};

export default PostCommentSection;
