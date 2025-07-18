import { useState } from "react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/store/useAuthStore";

import UserAvatar from "../../../components/common/UserAvatar";
import { usePostStore } from "../usePostStore";

const AddComment = () => {
  const { authUser } = useAuthStore();
  const { post, addComment } = usePostStore();

  const [comment, setComment] = useState("");
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  const navigate = useNavigate();

  const handleAddComment = (e) => {
    e.preventDefault();
    addComment({ postId: post._id, text: comment });
    setComment("");
  };

  return (
    <form onSubmit={handleAddComment} className="mt-5">
      <div className="flex flex-col gap-3">
        <div
          onClick={() => navigate(`/user/${authUser?.username}`)}
          className="flex items-center gap-2 cursor-pointer w-fit"
        >
          <UserAvatar
            avatarStyle="size-10"
            profilePicture={authUser?.profilePicture}
          />

          {/* Name and username */}
          <div className="flex flex-col leading-4">
            <span className="text-md font-medium text-text-secondary">
              {authUser?.name}
            </span>
            <span className="text-sm text-text-muted">
              @{authUser?.username}
            </span>
          </div>
        </div>

        {isCommentOpen ? (
          <>
            <Textarea
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              placeholder="Type your comment here"
              className="resize-none w-full word-wrap h-24 scrollbar bg-accent/40"
            />

            <Button
              disabled={!comment}
              type="submit"
              className="w-fit self-end"
            >
              Comment
            </Button>
          </>
        ) : (
          <div
            className="bg-accent/40 px-4 py-2 rounded-lg text-sm cursor-pointer border"
            onClick={() => setIsCommentOpen(true)}
          >
            Write your comment here
          </div>
        )}
      </div>
    </form>
  );
};

export default AddComment;
