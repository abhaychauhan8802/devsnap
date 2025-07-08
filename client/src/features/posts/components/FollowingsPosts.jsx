import { Loader2Icon } from "lucide-react";
import { useRef } from "react";
import { useCallback } from "react";
import { useEffect } from "react";

import useBreakPoints from "@/hooks/useBreakPoints";

import { usePostStore } from "../usePostStore";
import PostCard from "./PostCard";
import PostSkeleton from "./PostSkeleton";

const limit = 15;
const FollowingsPosts = () => {
  const {
    followingPosts,
    setPosts,
    appendPosts,
    followingSkip,
    followingHasMore,
    setHasMore,
    postLoading,
    getFollowingPosts,
  } = usePostStore();

  const { isMobile } = useBreakPoints();

  const observer = useRef();

  const loadMorePosts = async () => {
    const newPosts = await getFollowingPosts({ skip: followingSkip, limit });

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
        if (entry.isIntersecting && followingHasMore) {
          loadMorePosts();
        }
      });

      if (node) observer.current.observe(node);
    },
    [postLoading, followingHasMore, followingSkip],
  );

  useEffect(() => {
    const initialFetch = async () => {
      const firstBatch = await getFollowingPosts({
        skip: followingSkip,
        limit,
      });
      setPosts(firstBatch, limit, "following");
    };

    if (followingPosts?.length === 0) {
      initialFetch();
    }
  }, []);

  if (followingPosts?.length === 0 && postLoading) {
    return (
      <div className="w-full min-h-full flex justify-center items-center">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-4 mt-5 px-3 sm:px-0`}>
      {followingPosts?.map((post, idx) => {
        const isLast = idx === followingPosts?.length - 1;

        return (
          <PostCard
            ref={isLast ? lastPostRef : null}
            key={idx}
            post={post}
            varient={isMobile ? "default" : "wide"}
          />
        );
      })}
      {postLoading && [1, 2, 3].map((itm) => <PostSkeleton key={itm} />)}
      {!followingHasMore && (
        <p className="text-center text-sm text-gray-400 mb-5">
          There are no more posts to show
        </p>
      )}
    </div>
  );
};

export default FollowingsPosts;
