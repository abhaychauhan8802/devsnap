import dotenv from "dotenv";
import mongoose from "mongoose";

import Post from "./models/post.model.js";
import User from "./models/user.model.js";

dotenv.config();

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const randomTitles = [
  "Building My First Full Stack App",
  "React vs Vue: My Thoughts",
  "Debugging Tips for Beginners",
  "Why I Switched to TypeScript",
  "Dark Mode Everything!",
  "",
  "5 Productivity Hacks for Developers",
  "From Zero to Backend Hero",
  "Learning Node.js the Hard Way",
  "",
  "CSS Tricks You Should Know",
  "How I Made My Portfolio Stand Out",
  "Deploying MERN Apps Made Easy",
  "",
  "Let's Talk About Clean Code",
];

const randomTexts = [
  "Just finished a cool project using the MERN stack. It was super fun and I learned a lot about authentication and API design.",
  "Trying out Tailwind CSS lately, and honestly it changed how I write frontend. Highly recommend!",
  "Struggled a bit with React Router but finally understood nested routes. Feeling accomplished!",
  "Started exploring MongoDB aggregations today. It's really powerful once you get the hang of it.",
  "Published my first npm package. Small utility, but a great learning experience!",
  "Working on an Instagram clone to practice my skills. Loving the process so far.",
  "Anyone else obsessed with customizing their VS Code theme? I change mine every week.",
  "Just discovered how useful Redux Toolkit is. So much simpler than raw Redux.",
  "I recently joined a hackathon team and built a real-time chat app. Learned a ton!",
  "Currently building a blog platform. Implemented markdown support today, woohoo!",
  "Had a rough time debugging a memory leak in my Node.js app, but I fixed it!",
  "This week, I focused on accessibility in my frontend work. It's so important and often overlooked.",
];

const randomImages = [
  "https://picsum.photos/800/600?random=1",
  "https://picsum.photos/800/600?random=2",
  "https://picsum.photos/800/600?random=3",
  "https://picsum.photos/800/600?random=4",
  "https://picsum.photos/800/600?random=5",
  "https://picsum.photos/800/600?random=6",
];

const generatePosts = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/devsnap",
    );
    console.log("Connected to DB");

    const users = await User.find();
    if (!users.length) throw new Error("No users found. Seed users first.");

    await Post.deleteMany();
    console.log("🗑️ Existing posts deleted");

    const posts = [];

    for (let i = 0; i < 40; i++) {
      const post = {
        title: getRandom(randomTitles),
        text: getRandom(randomTexts),
        image: getRandom(randomImages),
        author: getRandom(users)._id,
      };

      posts.push(post);
    }

    await Post.insertMany(posts);
    console.log("✅ 40 posts inserted successfully.");
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error inserting posts:", err);
    mongoose.disconnect();
  }
};

generatePosts();
