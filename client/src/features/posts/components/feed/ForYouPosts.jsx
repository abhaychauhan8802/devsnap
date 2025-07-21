import { Loader2Icon } from "lucide-react";
import { useRef } from "react";
import { useCallback } from "react";
import { useEffect } from "react";

import useBreakPoints from "@/hooks/useBreakPoints";

import { usePostStore } from "../../usePostStore";
import PostCard from "../common/PostCard";
import PostSkeleton from "../common/PostSkeleton";

const limit = 15;

const ForYouPosts = () => {
  const {
    posts,
    setPosts,
    appendPosts,
    pagination,
    setHasMore,
    postLoading,
    getFeedPost,
  } = usePostStore();

  const { isMobile } = useBreakPoints();

  const observer = useRef();

  const loadMorePosts = async () => {
    const newPosts = await getFeedPost({ skip: pagination.feed.skip, limit });

    if (newPosts?.length === 0) {
      setHasMore(false, "feed");
      return;
    }
    appendPosts(newPosts, limit, "feed");
  };

  const lastPostRef = useCallback(
    (node) => {
      if (postLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && pagination.feed.hasMore) {
          loadMorePosts();
        }
      });

      if (node) observer.current.observe(node);
    },
    [postLoading, pagination.feed.hasMore, pagination.feed.skip],
  );

  useEffect(() => {
    const initialFetch = async () => {
      const firstBatch = await getFeedPost({
        skip: pagination.feed.skip,
        limit,
      });
      setPosts(firstBatch, limit, "feed");
    };

    if (posts?.feed?.length === 0) {
      initialFetch();
    }
  }, []);

  if (posts?.feed?.length === 0 && postLoading) {
    return (
      <div className="w-full min-h-full flex justify-center items-center">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-0`}>
      {posts?.feed?.map((post, idx) => {
        const isLast = idx === posts?.feed?.length - 1;

        return (
          <PostCard
            ref={isLast ? lastPostRef : null}
            idx={idx}
            key={idx}
            post={post}
            varient={isMobile ? "default" : "wide"}
          />
        );
      })}
      {postLoading &&
        [1, 2, 3].map((itm) => (
          <PostSkeleton key={itm} type={isMobile ? "default" : "wide"} />
        ))}
      {!pagination.feed.hasMore && (
        <p className="text-center text-sm text-gray-400 mb-5">
          There are no more posts to show
        </p>
      )}
    </div>
  );
};

export default ForYouPosts;
