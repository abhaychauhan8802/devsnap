import { createClient } from "redis";

export const redis = await createClient()
  .on("error", (err) => console.log("Redis error", err))
  .connect();
