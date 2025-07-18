import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useSearchParams } from "react-router";

import UserAvatar from "@/components/common/UserAvatar";
import PostCard from "@/features/posts/components/PostCard";
import SuggestedUser from "@/features/users/components/SuggestedUser";
import useBreakPoints from "@/hooks/useBreakPoints";

import { useExploreStore } from "../useExploreStore";
import SearchBar from "./common/SearchBar";

const Search = () => {
  const {
    getSearchPosts,
    clearPosts,
    searchPosts,
    searchUsers,
    getSearchUsers,
  } = useExploreStore();

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const { isMobile } = useBreakPoints();

  const query = searchParams.get("q");

  useEffect(() => {
    if (!query || query.trim() === "") {
      return navigate("/explore", { replace: true });
    }

    getSearchUsers(query);
    getSearchPosts(query);

    return () => {
      clearPosts();
    };
  }, [query]);

  console.log("searchPosts", searchPosts, "searchUsers", searchUsers);

  return (
    <div className="flex gap-5 sm:px-4">
      <div className="max-w-2xl w-full mx-auto px-4">
        <div className="sticky top-0 bg-background z-20 py-2">
          <SearchBar />
        </div>

        <div className="mt-2">
          {searchUsers?.length !== 0 && (
            <div className="pb-4">
              <h2 className="font-semibold text-lg">Users</h2>
              <div className="space-y-1">
                {searchUsers?.map((user, idx) => {
                  return (
                    <Link
                      to={`/user/${user?.username}`}
                      key={idx}
                      className="flex items-center gap-2 py-2 cursor-pointer hover:bg-accent/30 rounded-sm"
                    >
                      <UserAvatar
                        avatarStyle="size-12"
                        profilePicture={user?.profilePicture}
                      />
                      <div className="flex flex-col leading-5">
                        <span className="text-lg font-medium text-text-secondary">
                          {user?.name}
                        </span>
                        <span className="text-md text-text-muted">
                          @{user?.username}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
          <hr />
          {searchPosts?.length !== 0 && (
            <div className="py-4">
              <h2 className="font-semibold text-lg">Posts</h2>
              <div className={`flex flex-col gap-2`}>
                {searchPosts?.map((post, idx) => {
                  return (
                    <PostCard
                      key={idx}
                      idx={idx}
                      post={post}
                      varient={isMobile ? "default" : "wide"}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {searchPosts?.length === 0 && searchUsers?.length === 0 && (
            <div className="w-full text-center pt-10">
              <span className="font-medium text-xl">No result found</span>
            </div>
          )}
        </div>
      </div>

      <div className="w-[300px] border-l shrink-0 hidden lg:inline-block sticky space-y-4 px-5 top-0 h-screen">
        <SuggestedUser />
      </div>
    </div>
  );
};

export default Search;
