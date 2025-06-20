import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";

import { usePostStore } from "../usePostStore";
import PostCard from "./PostCard";

const PostFeed = () => {
  const { posts, postLoading, getAllPost } = usePostStore();

  useEffect(() => {
    if (posts.length === 0) {
      getAllPost();
    }
  }, [getAllPost, posts.length]);

  if (postLoading) {
    return (
      <div className="w-full min-h-full flex justify-center items-center">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid justify-center grid-cols-[repeat(auto-fit,_minmax(320px,_320px))] gap-8 p-10">
        {posts.map((post, idx) => (
          <PostCard key={idx} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostFeed;
