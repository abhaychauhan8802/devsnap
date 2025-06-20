import { useEffect } from "react";
import { useParams } from "react-router";

import { usePostStore } from "../usePostStore";
import PostAuthorInfo from "./PostAuthorInfo";
import PostContent from "./PostContent";

const PostDetail = () => {
  const { post, getPost } = usePostStore();

  const params = useParams();

  useEffect(() => {
    getPost(params.postId);
  }, [getPost]);

  return (
    <div className="flex pt-4 px-8 pb-10">
      <PostContent post={post} />
      <PostAuthorInfo post={post} />
    </div>
  );
};

export default PostDetail;
