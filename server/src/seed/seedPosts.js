import dotenv from "dotenv";
import mongoose from "mongoose";

import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import postsData from "./postSeedData.js";

dotenv.config();

const generatePosts = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/devsnap",
    );
    console.log("✅ Connected to MongoDB");

    const users = await User.find();
    if (users.length === 0)
      throw new Error("No users found. Seed users first.");

    if (!postsData || postsData.length === 0)
      throw new Error("No posts in seed data.");

    // Shuffle posts so distribution is random
    const shuffledPosts = [...postsData].sort(() => Math.random() - 0.5);

    let postIndex = 0;

    for (const user of users) {
      // random number of posts (0 to 3)
      const postsForUser = Math.floor(Math.random() * 4);

      for (
        let i = 0;
        i < postsForUser && postIndex < shuffledPosts.length;
        i++
      ) {
        const postData = shuffledPosts[postIndex];
        postIndex++;

        // create post with author reference
        const post = await Post.create({
          ...postData,
          author: user._id,
        });

        // push post reference into user
        user.posts.push(post._id);
      }

      await user.save();
    }

    console.log("✅ Successfully seeded posts and distributed among users.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error generating posts:", error.message);
    process.exit(1);
  }
};

generatePosts();
