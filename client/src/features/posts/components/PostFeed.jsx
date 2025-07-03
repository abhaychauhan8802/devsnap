import { Loader2Icon } from "lucide-react";
import { Bell } from "lucide-react";
import { useEffect } from "react";
import { useRef } from "react";
import { useCallback } from "react";

import { Logo, ThemeToggle } from "@/components";
import { Button } from "@/components/ui/button";
import useBreakPoints from "@/hooks/useBreakPoints";

import { usePostStore } from "../usePostStore";
import PostCard from "./PostCard";
import PostSkeleton from "./PostSkeleton";

const limit = 15;

const PostFeed = () => {
  const {
    posts,
    setPosts,
    appendPosts,
    skip,
    hasMore,
    setHasMore,
    postLoading,
    getAllPost,
  } = usePostStore();

  const { isMobile, isDesktop } = useBreakPoints();

  const observer = useRef();

  const loadMorePosts = async () => {
    const newPosts = await getAllPost({ skip, limit });

    if (newPosts.length === 0) {
      setHasMore(false);
      return;
    }
    appendPosts(newPosts, limit);
  };

  const lastPostRef = useCallback(
    (node) => {
      if (postLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && hasMore) {
          loadMorePosts();
        }
      });

      if (node) observer.current.observe(node);
    },
    [postLoading, hasMore, skip],
  );

  useEffect(() => {
    const initialFetch = async () => {
      const firstBatch = await getAllPost({ skip, limit });
      setPosts(firstBatch, limit);
    };

    if (posts.length === 0) {
      initialFetch();
    }
  }, []);

  if (posts.length === 0 && postLoading) {
    return (
      <div className="w-full min-h-full flex justify-center items-center">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-w-full">
      <div className="border-b flex justify-between items-center h-16 px-3 sm:px-6 lg:px-10 sticky top-0 bg-background z-20">
        <div className="scale-60 origin-left">
          <Logo />
        </div>

        <div className="flex gap-1 items-center">
          <Button variant="ghost" className="rounded-full" size="icon">
            <Bell />
          </Button>
          <ThemeToggle />
        </div>
      </div>

      <div
        className={`flex flex-col ${isDesktop && "grid justify-center grid-cols-[repeat(auto-fit,_minmax(320px,_320px))]"} gap-3 sm:gap-5 lg:gap-8 p-3 sm:p-6 lg:p-10`}
      >
        {posts.map((post, idx) => {
          const isLast = idx === posts.length - 1;

          return (
            <PostCard
              ref={isLast ? lastPostRef : null}
              key={idx}
              post={post}
              varient={isDesktop || isMobile ? "default" : "wide"}
            />
          );
        })}
        {postLoading && [1, 2, 3].map((itm) => <PostSkeleton key={itm} />)}
      </div>
      {!hasMore && (
        <p className="text-center text-sm text-gray-400 mb-5">
          There are no more posts to show
        </p>
      )}
    </div>
  );
};

export default PostFeed;
