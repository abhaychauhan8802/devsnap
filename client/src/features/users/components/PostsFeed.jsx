import { useEffect } from "react";

import PostCard from "@/features/posts/components/PostCard";

import { useUserStore } from "../useUserStore";

const PostsFeed = ({ userId }) => {
  const { getUserPosts, userPosts, loading } = useUserStore();

  useEffect(() => {
    if (userId) {
      getUserPosts(userId);
    }
  }, [userId, getUserPosts]);

  if (loading) return <h1>loading...</h1>;

  return (
    <div className="w-full">
      <div className="flex flex-col gap-8">
        {userPosts?.length !== 0 ? (
          userPosts?.map((post, idx) => (
            <PostCard key={idx} post={post} type="wide" />
          ))
        ) : (
          <div>
            <span>User don't have any post</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsFeed;
