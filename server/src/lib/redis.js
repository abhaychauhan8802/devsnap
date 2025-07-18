import dotenv from "dotenv";
import { createClient } from "redis";

dotenv.config();

const redisURI = process.env.REDIS_URI;

export const redis = await createClient({ url: redisURI })
  .on("error", (err) => console.log("Redis error", err))
  .connect();
