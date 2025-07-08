import { useEffect } from "react";
import { replace, useNavigate } from "react-router";
import { useSearchParams } from "react-router";

import PostCard from "@/features/posts/components/PostCard";
import SuggestedUser from "@/features/users/components/SuggestedUser";
import useBreakPoints from "@/hooks/useBreakPoints";

import { useExploreStore } from "../useExploreStore";
import SearchBar from "./common/SearchBar";

const Search = () => {
  const { getSearchPosts, clearPosts, searchPosts } = useExploreStore();

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const { isMobile } = useBreakPoints();

  const query = searchParams.get("q");

  useEffect(() => {
    getSearchPosts(query);

    return () => {
      clearPosts();
    };
  }, [query]);

  console.log(query);

  if (query === "") {
    return navigate("/explore", replace);
  }

  return (
    <div className="flex gap-5 px-4">
      <div className="max-w-2xl w-full mx-auto">
        <div className="sticky top-0 bg-background z-20 py-2">
          <SearchBar />
        </div>

        <div className="mt-5 mb-5">
          <div className={`flex flex-col gap-4 px-3 sm:px-0`}>
            {searchPosts?.map((post, idx) => {
              const isLast = idx === searchPosts?.length - 1;

              return (
                <PostCard
                  // ref={isLast ? lastPostRef : null}
                  key={idx}
                  post={post}
                  varient={isMobile ? "default" : "wide"}
                />
              );
            })}
            {/* {postLoading &&
              [1, 2, 3].map((itm) => (
                <PostSkeleton key={itm} type={isMobile ? "default" : "wide"} />
              ))}
            {!pagination.explore.hasMore && (
              <p className="text-center text-sm text-gray-400 mb-5">
                There are no more posts to show
              </p>
            )} */}
          </div>
        </div>
      </div>

      <div className="w-[300px] shrink-0 hidden lg:inline-block sticky top-5 mt-5 h-fit">
        <SuggestedUser />
      </div>
    </div>
  );
};

export default Search;
