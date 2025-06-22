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
      <div className="grid justify-center grid-cols-[repeat(auto-fit,_minmax(320px,_320px))] gap-8">
        {userBookmarks?.map((post, idx) => (
          <PostCard key={idx} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Bookmarks;
