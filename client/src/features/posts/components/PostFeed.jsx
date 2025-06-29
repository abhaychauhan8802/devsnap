import { Loader2Icon } from "lucide-react";
import { Bell } from "lucide-react";
import { useEffect } from "react";

import { Logo, ThemeToggle } from "@/components";
import { Button } from "@/components/ui/button";
import useBreakPoints from "@/hooks/useBreakPoints";

import { usePostStore } from "../usePostStore";
import PostCard from "./PostCard";

const PostFeed = () => {
  const { posts, postLoading, getAllPost } = usePostStore();

  const { isMobile, isDesktop } = useBreakPoints();

  useEffect(() => {
    if (posts.length === 0) {
      getAllPost();
    }
  }, [getAllPost, posts.length]);

  if (postLoading) {
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
        {posts.map((post, idx) => (
          <PostCard
            key={idx}
            post={post}
            varient={isDesktop || isMobile ? "default" : "wide"}
          />
        ))}
      </div>
    </div>
  );
};

export default PostFeed;
