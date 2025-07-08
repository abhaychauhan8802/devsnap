import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosAdd } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router";

import UserAvatar from "@/components/common/UserAvatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMessageStore } from "@/features/messages/useMessageStore";
import useBreakPoints from "@/hooks/useBreakPoints";
import { useAuthStore } from "@/store/useAuthStore";

import { useUserStore } from "../useUserStore";

const UserCard = ({ follower, following }) => {
  const { setSelectedUser } = useMessageStore();
  const { followAndUnfollow, removeFollower, user } = useUserStore();
  const { authUser } = useAuthStore();

  const { isMobile } = useBreakPoints();

  const isFollowing = authUser?.followings?.includes(following?._id);
  const isFollower = authUser?.followers?.includes(follower?._id);

  const handleFollowUnfollow = (e) => {
    e.stopPropagation();
    e.preventDefault();
    followAndUnfollow(following?._id);
  };

  return (
    <div className="bg-card hover:bg-card/80 rounded-xl py-3 px-4 mb-1">
      {follower ? (
        <Link
          to={`/user/${follower?.username}`}
          className="flex justify-between items-center"
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
            {authUser._id === user?._id && (
              <>
                <Link to="/messages">
                  <Button
                    onClick={() => setSelectedUser(following)}
                    size={isMobile ? "sm" : "default"}
                  >
                    Message
                  </Button>
                </Link>
                <Button
                  variant={isFollower ? "secondary" : "danger"}
                  size="icon"
                  className={`${isMobile && "size-8"}`}
                  onClick={() => {
                    if (isFollower) removeFollower(follower?._id);
                  }}
                >
                  {isFollower ? <RxCross2 /> : <IoIosAdd />}
                </Button>
              </>
            )}
          </div>
        </Link>
      ) : (
        <Link
          to={`/user/${following?.username}`}
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
                  <Link to="/messages">
                    <Button
                      onClick={() => setSelectedUser(following)}
                      size={isMobile ? "sm" : "default"}
                    >
                      Message
                    </Button>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`${isMobile && "size-8"}`}
                      >
                        <BsThreeDotsVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={handleFollowUnfollow}>
                        Unfollow
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
        </Link>
      )}
    </div>
  );
};

export default UserCard;
