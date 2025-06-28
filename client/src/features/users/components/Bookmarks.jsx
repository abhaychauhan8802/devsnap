import { useEffect } from "react";

import PostCard from "@/features/posts/components/PostCard";

import { useUserStore } from "../useUserStore";

const Bookmarks = () => {
  const { getUserBookmarks, userBookmarks, loading } = useUserStore();

  useEffect(() => {
    if (userBookmarks?.length === 0) {
      getUserBookmarks();
    }
  }, []);

  if (loading) return <h1>loading...</h1>;

  return (
    <div className="w-full">
      <div className="flex flex-col gap-8">
        {userBookmarks.length !== 0 ? (
          userBookmarks?.map((post, idx) => (
            <PostCard key={idx} post={post} type="wide" />
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
