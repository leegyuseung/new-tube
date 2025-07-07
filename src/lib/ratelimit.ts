import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";

// redis setting
export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "10s"),
});
