import { useEffect } from "react";

import PostCard from "@/features/posts/components/common/PostCard";
import useBreakPoints from "@/hooks/useBreakPoints";

import { useUserStore } from "../useUserStore";

const Bookmarks = () => {
  const { getUserBookmarks, userBookmarks, loading } = useUserStore();

  const { isMobile } = useBreakPoints();

  useEffect(() => {
    if (userBookmarks?.length === 0) {
      getUserBookmarks();
    }
  }, []);

  if (loading) return <h1>loading...</h1>;

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2">
        {userBookmarks.length !== 0 ? (
          userBookmarks?.map((post, idx) => (
            <PostCard
              key={idx}
              idx={idx}
              post={post}
              varient={isMobile ? "default" : "wide"}
            />
          ))
        ) : (
          <div>
            <span>Dont have any bookmark yet</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
