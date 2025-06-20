import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongodb connected");
  } catch (error) {
    console.log("mongodb connection error", error.message);
  }
};

export default connectDB;
