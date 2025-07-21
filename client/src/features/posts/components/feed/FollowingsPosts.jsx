import { Loader2Icon } from "lucide-react";
import { useRef } from "react";
import { useCallback } from "react";
import { useEffect } from "react";

import useBreakPoints from "@/hooks/useBreakPoints";

import { usePostStore } from "../../usePostStore";
import PostCard from "../common/PostCard";
import PostSkeleton from "../common/PostSkeleton";

const limit = 15;
const FollowingsPosts = () => {
  const {
    posts,
    setPosts,
    appendPosts,
    pagination,
    setHasMore,
    postLoading,
    getFollowingPosts,
  } = usePostStore();

  const { isMobile } = useBreakPoints();

  const observer = useRef();

  const loadMorePosts = async () => {
    const newPosts = await getFollowingPosts({
      skip: pagination.following.skip,
      limit,
    });

    if (newPosts?.length === 0) {
      setHasMore(false, "following");
      return;
    }
    appendPosts(newPosts, limit, "following");
  };

  const lastPostRef = useCallback(
    (node) => {
      if (postLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && pagination.following.hasMore) {
          loadMorePosts();
        }
      });

      if (node) observer.current.observe(node);
    },
    [postLoading, pagination.following.hasMore, pagination.following.skip],
  );

  useEffect(() => {
    const initialFetch = async () => {
      const firstBatch = await getFollowingPosts({
        skip: pagination.following.skip,
        limit,
      });
      setPosts(firstBatch, limit, "following");
      console.log("Initial fetch call");
    };

    if (posts?.following?.length === 0) {
      initialFetch();
    }
  }, []);

  if (posts?.following?.length === 0 && postLoading) {
    return (
      <div className="w-full min-h-full flex justify-center items-center">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {posts?.following?.map((post, idx) => {
        const isLast = idx === posts?.following?.length - 1;

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
      {postLoading && [1, 2, 3].map((itm) => <PostSkeleton key={itm} />)}
      {!pagination.following.hasMore && (
        <p className="text-center text-sm text-gray-400 mb-5">
          There are no more posts to show
        </p>
      )}
    </div>
  );
};

export default FollowingsPosts;
