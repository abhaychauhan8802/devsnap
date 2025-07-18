import { useEffect } from "react";
import { useLocation } from "react-router";

import PostCard from "@/features/posts/components/PostCard";
import useBreakPoints from "@/hooks/useBreakPoints";

import { useUserStore } from "../useUserStore";

const UserPostFeed = ({ userId }) => {
  const { getUserPosts, userPosts, loading } = useUserStore();

  const { isMobile } = useBreakPoints();

  useEffect(() => {
    if (userId) {
      getUserPosts(userId);
    }
  }, [userId, getUserPosts]);

  if (loading) return <h1>loading...</h1>;

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2">
        {userPosts?.length !== 0 ? (
          userPosts?.map((post, idx) => (
            <PostCard
              idx={idx}
              key={idx}
              post={post}
              varient={isMobile ? "default" : "wide"}
            />
          ))
        ) : (
          <div className="text-center">
            <span>User don't have any post</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPostFeed;
