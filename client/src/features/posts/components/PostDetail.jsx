import { useEffect } from "react";
import { useParams } from "react-router";

import { usePostStore } from "../usePostStore";
import PostAuthorInfo from "./PostAuthorInfo";
import PostContent from "./PostContent";

const PostDetail = () => {
  const { post, getPost, postLoading } = usePostStore();

  const params = useParams();

  useEffect(() => {
    if (!post) {
      getPost(params.postId);
    }
  }, [getPost]);

  if (postLoading) return;

  return (
    <div className="flex pt-4 px-4 md:px-8 pb-10">
      <PostContent post={post} />
      <PostAuthorInfo post={post} />
    </div>
  );
};

export default PostDetail;
