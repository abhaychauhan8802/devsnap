import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      maxLength: [200, "Title cannot exceed 200 characters"],
    },
    text: {
      type: String,
      required: [true, "Desc is required"],
      maxLength: [2000, "Post cannot exceed 2000 characters"],
    },
    image: {
      type: String,
      default: "",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.model("Post", postSchema);

export default Post;
