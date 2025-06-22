import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/store/useAuthStore";

import { usePostStore } from "../usePostStore";
import UserAvatar from "./common/UserAvatar";

const AddComment = () => {
  const { authUser } = useAuthStore();
  const { post, addComment } = usePostStore();

  const [comment, setComment] = useState("");

  const handleAddComment = (e) => {
    e.preventDefault();
    addComment({ postId: post._id, text: comment });
    setComment("");
  };

  return (
    <div>
      <form onSubmit={handleAddComment}>
        <Card className="mt-5 border rounded-xl py-3 gap-0">
          <CardHeader className="border-b [.border-b]:pb-1">
            <CardTitle className="py-2">
              <h4>Add your comment</h4>
            </CardTitle>
          </CardHeader>

          <CardContent className="border-b py-4">
            <div className="flex gap-4">
              <UserAvatar avatarStyle="size-12" user={authUser} />
              <Textarea
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                placeholder="Type your comment here"
                className="resize-none w-full h-20 border-0 bg-card dark:bg-card shadow-none focus-visible:ring-0"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end pt-3">
            <Button disabled={!comment} type="submit">
              Comment
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default AddComment;
