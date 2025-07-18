import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";
import { useRef } from "react";
import { useCallback } from "react";

import SuggestedUser from "@/features/users/components/SuggestedUser";
import useBreakPoints from "@/hooks/useBreakPoints";

import PostCard from "../../posts/components/PostCard";
import PostSkeleton from "../../posts/components/PostSkeleton";
import { usePostStore } from "../../posts/usePostStore";
import SearchBar from "./common/SearchBar";

const limit = 15;

const Explore = () => {
  const {
    posts,
    setPosts,
    appendPosts,
    pagination,
    setHasMore,
    postLoading,
    getAllPosts,
  } = usePostStore();

  const { isMobile } = useBreakPoints();

  const observer = useRef();

  const loadMorePosts = async () => {
    const newPosts = await getAllPosts({
      skip: pagination.explore.skip,
      limit,
    });

    if (newPosts.length === 0) {
      setHasMore(false, "explore");
      return;
    }
    appendPosts(newPosts, limit, "explore");
  };

  const lastPostRef = useCallback(
    (node) => {
      if (postLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && pagination.explore.hasMore) {
          loadMorePosts();
        }
      });

      if (node) observer.current.observe(node);
    },
    [postLoading, pagination.explore.hasMore, pagination.explore.skip],
  );

  useEffect(() => {
    const initialFetch = async () => {
      const firstBatch = await getAllPosts({
        skip: pagination.explore.skip,
        limit,
      });
      setPosts(firstBatch, limit, "explore");
    };

    if (posts?.explore?.length === 0) {
      initialFetch();
    }
  }, []);

  if (posts?.explore?.length === 0 && postLoading) {
    return (
      <div className="w-full min-h-full flex justify-center items-center">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex gap-5 sm:px-4">
      <div className="max-w-2xl w-full mx-auto px-4">
        <div className="sticky top-0 bg-background z-20 py-2">
          <SearchBar />
        </div>

        <div className="mt-2 flex flex-col">
          {posts?.explore?.map((post, idx) => {
            const isLast = idx === posts?.explore?.length - 1;

            return (
              <PostCard
                ref={isLast ? lastPostRef : null}
                key={idx}
                idx={idx}
                post={post}
                varient={isMobile ? "default" : "wide"}
              />
            );
          })}
          {postLoading &&
            [1, 2, 3].map((itm) => (
              <PostSkeleton key={itm} type={isMobile ? "default" : "wide"} />
            ))}
          {!pagination.explore.hasMore && (
            <p className="text-center text-sm text-gray-400 mb-5">
              There are no more posts to show
            </p>
          )}
        </div>
      </div>

      <div className="w-[300px] border-l shrink-0 hidden lg:inline-block sticky space-y-4 px-5 top-0 h-screen">
        <SuggestedUser />
      </div>
    </div>
  );
};

export default Explore;
