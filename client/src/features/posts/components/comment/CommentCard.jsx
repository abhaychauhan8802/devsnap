import { useEffect } from "react";
import { Link } from "react-router";

import UserAvatar from "@/components/common/UserAvatar";
import { cn } from "@/lib/utils";

import { usePostStore } from "../../usePostStore";

const CommentCard = () => {
  const { post, postComments, getPostComments } = usePostStore();

  useEffect(() => {
    if (post) {
      getPostComments(post?._id);
    }
  }, [post, getPostComments]);

  return (
    <div className="mt-5">
      {postComments.length !== 0 ? (
        <div className="flex flex-col">
          {postComments.map((comment, idx) => (
            <div
              key={idx}
              className={cn("p-4", idx !== 0 && "border-t border-muted/50")}
            >
              <Link
                to={`/user/${comment?.author?.username}`}
                className="flex gap-2 items-center justify-center cursor-pointer w-fit"
              >
                {/* Avatar */}
                <UserAvatar
                  avatarStyle="size-10"
                  profilePicture={comment?.author?.profilePicture}
                />

                {/* Name and username */}
                <div className="flex flex-col leading-4">
                  <span className="text-md font-medium text-text-secondary">
                    {comment?.author?.name}
                  </span>
                  <span className="text-sm text-text-muted">
                    @{comment?.author?.username}
                  </span>
                </div>
              </Link>

              <div className="py-4">
                <p>{comment?.text}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-text-secondary">
          Be the first to comment.
        </div>
      )}
    </div>
  );
};

export default CommentCard;
