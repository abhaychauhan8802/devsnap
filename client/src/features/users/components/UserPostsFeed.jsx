import { useEffect } from "react";

import PostCard from "@/features/posts/components/PostCard";

import { useUserStore } from "../useUserStore";

const UserPostsFeed = ({ userId }) => {
  const { getUserPosts, userPosts, loading } = useUserStore();

  useEffect(() => {
    if (userId) {
      getUserPosts(userId);
    }
  }, [userId, getUserPosts]);

  if (loading) return <h1>loading...</h1>;

  return (
    <div className="w-full">
      <div className="grid justify-center grid-cols-[repeat(auto-fit,_minmax(320px,_320px))] gap-8">
        {userPosts?.map((post, idx) => (
          <PostCard key={idx} post={post} />
        ))}
      </div>
    </div>
  );
};

export default UserPostsFeed;
