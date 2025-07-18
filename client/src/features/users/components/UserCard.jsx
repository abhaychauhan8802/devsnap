import { useNavigate } from "react-router";

import UserAvatar from "@/components/common/UserAvatar";
import { Button } from "@/components/ui/button";
import useBreakPoints from "@/hooks/useBreakPoints";
import { useAuthStore } from "@/store/useAuthStore";

import { useUserStore } from "../useUserStore";

const UserCard = ({ follower, following }) => {
  const { followAndUnfollow, removeFollower, user } = useUserStore();
  const { authUser } = useAuthStore();

  const { isMobile } = useBreakPoints();

  const isFollowing = authUser?.followings?.includes(following?._id);
  const isFollower = authUser?.followers?.includes(follower?._id);

  const navigate = useNavigate();

  const handleFollowUnfollow = (e) => {
    e.stopPropagation();
    e.preventDefault();
    followAndUnfollow(following?._id);
  };

  return (
    <div className="hover:bg-card/80 rounded-xl py-3 px-4 mb-1">
      {follower ? (
        <div
          onClick={() => navigate(`/user/${follower?.username}`)}
          className="flex justify-between items-center cursor-pointer z-0"
        >
          <div className="flex gap-3 items-center">
            <UserAvatar
              profilePicture={follower?.profilePicture}
              avatarStyle={isMobile ? "size-9" : "size-11"}
            />
            <div className="flex flex-col leading-4">
              <span className="font-semibold text-text-secondary text-sm sm:text-[16px]">
                {follower?.name}
              </span>
              <span className="text-text-muted text-xs sm:text-sm">
                @{follower?.username}
              </span>
            </div>
          </div>
          <div className="flex gap-1 items-center">
            {authUser?._id === user?._id && (
              <>
                <Button
                  variant="secondary"
                  className="z-20"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isFollower) removeFollower(follower?._id);
                  }}
                >
                  Remove
                </Button>
              </>
            )}
          </div>
        </div>
      ) : (
        <div
          onClick={() => navigate(`/user/${following?.username}`)}
          className="flex justify-between items-center"
        >
          <div className="flex gap-3 items-center">
            <UserAvatar
              profilePicture={following?.profilePicture}
              avatarStyle={isMobile ? "size-9" : "size-11"}
            />
            <div className="flex flex-col leading-4">
              <span className="font-semibold text-text-secondary text-sm sm:text-[16px]">
                {following?.name}
              </span>
              <span className="text-text-muted text-xs sm:text-sm">
                @{following?.username}
              </span>
            </div>
          </div>
          <div className="flex gap-1 items-center">
            {authUser._id === user?._id &&
              (isFollowing ? (
                <>
                  <Button
                    variant="secondary"
                    onClick={handleFollowUnfollow}
                    size={isMobile ? "sm" : "default"}
                  >
                    Unfollow
                  </Button>
                </>
              ) : (
                <Button
                  size={isMobile ? "sm" : "default"}
                  onClick={handleFollowUnfollow}
                >
                  Follow
                </Button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;
