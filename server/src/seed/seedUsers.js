import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import mongoose from "mongoose";

import User from "../models/user.model.js";

dotenv.config();

const users = [
  {
    name: "Alice Johnson",
    username: "alice_dev",
    bio: "Frontend wizard & coffee addict",
    email: "alice.johnson@example.com",
    profilePicture: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    name: "Bob Singh",
    username: "bobby123",
    bio: "React enthusiast 🚀",
    email: "bob.singh@example.com",
    profilePicture: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    name: "Carla Mendes",
    username: "carlacodes",
    bio: "Full-stack dev & part-time artist",
    email: "carla.m@example.com",
    profilePicture: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    name: "David Lee",
    username: "dav_lee",
    bio: "Coding my way out of bugs",
    email: "david.lee@example.com",
    profilePicture: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    name: "Emily Zhao",
    username: "emilyz",
    bio: "Design-driven dev",
    email: "emily.zhao@example.com",
    profilePicture: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    name: "Farhan Ali",
    username: "farhan.codes",
    bio: "Backend lover, API expert",
    email: "farhan.ali@example.com",
    profilePicture: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    name: "Grace Patel",
    username: "gracep",
    bio: "React, Node, and good vibes 💻",
    email: "grace.patel@example.com",
    profilePicture: "https://randomuser.me/api/portraits/women/7.jpg",
  },
  {
    name: "Hassan Khan",
    username: "hassy_dev",
    bio: "MERN stack apprentice",
    email: "hassan.khan@example.com",
    profilePicture: "https://randomuser.me/api/portraits/men/8.jpg",
  },
  {
    name: "Isla Brown",
    username: "isla.codes",
    bio: "Building the future with JS",
    email: "isla.brown@example.com",
    profilePicture: "https://randomuser.me/api/portraits/women/9.jpg",
  },
  {
    name: "Jatin Mehra",
    username: "jatinm",
    bio: "Love open source and chai ☕",
    email: "jatin.mehra@example.com",
    profilePicture: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    name: "Kavya Iyer",
    username: "kavya.dev",
    bio: "JavaScript is life",
    email: "kavya.iyer@example.com",
    profilePicture: "https://randomuser.me/api/portraits/women/11.jpg",
  },
  {
    name: "Leo Martin",
    username: "leomartin",
    bio: "Into AI & automation",
    email: "leo.martin@example.com",
    profilePicture: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    name: "Mira Sen",
    username: "mira_sen",
    bio: "UX/UI + dev = ❤️",
    email: "mira.sen@example.com",
    profilePicture: "https://randomuser.me/api/portraits/women/13.jpg",
  },
  {
    name: "Nikhil Desai",
    username: "nik_des",
    bio: "Making backend magic",
    email: "nikhil.desai@example.com",
    profilePicture: "https://randomuser.me/api/portraits/men/14.jpg",
  },
  {
    name: "Olivia Wang",
    username: "oliv_codes",
    bio: "Pythonista turned JavaScripter",
    email: "olivia.wang@example.com",
    profilePicture: "https://randomuser.me/api/portraits/women/15.jpg",
  },
  {
    name: "Pranav Raj",
    username: "pranavraj",
    bio: "Tech explorer, code writer",
    email: "pranav.raj@example.com",
    profilePicture: "https://randomuser.me/api/portraits/men/16.jpg",
  },
  {
    name: "Queenie Das",
    username: "queenie.d",
    bio: "Typescript believer",
    email: "queenie.das@example.com",
    profilePicture: "https://randomuser.me/api/portraits/women/17.jpg",
  },
  {
    name: "Rohit Sharma",
    username: "rohit.codes",
    bio: "Crafting bugs & fixing them 🐞",
    email: "rohit.sharma@example.com",
    profilePicture: "https://randomuser.me/api/portraits/men/18.jpg",
  },
  {
    name: "Sara Ahmed",
    username: "sara.dev",
    bio: "Love clean code and dark theme",
    email: "sara.ahmed@example.com",
    profilePicture: "https://randomuser.me/api/portraits/women/19.jpg",
  },
  {
    name: "Tanishq Verma",
    username: "tanishqv",
    bio: "Web artisan from India 🇮🇳",
    email: "tanishq.verma@example.com",
    profilePicture: "https://randomuser.me/api/portraits/men/20.jpg",
  },
];

const connectAndSeed = async () => {
  const plainPassword = "12345678";

  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/devsnap",
    );
    console.log("Connected to MongoDB");

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Assign hashed password to each user
    const usersWithPassword = users.map((user) => ({
      ...user,
      password: hashedPassword,
    }));

    // await User.deleteMany(); // optional: clear old data
    await User.insertMany(usersWithPassword);
    console.log("Users added successfully!");

    mongoose.disconnect();
  } catch (err) {
    console.error("Error seeding users:", err);
    mongoose.disconnect();
  }
};

connectAndSeed();
