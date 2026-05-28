import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    // 100 requests per 60 seconds (updated at the end of the video)
    limiter: Ratelimit.slidingWindow(100, "60 s"), 
    analytics: true,
});

export default async function rateLimiter(req, res, next) {
    try {
        // Use an identifier like IP address or user ID (fallback to 'global')
        const identifier = req.ip || "global";
        const { success } = await ratelimit.limit(`my-rate-limit:${identifier}`);

        if (!success) {
            return res.status(429).json({
                message: "Too many requests, please try again later",
            });
        }

        next();
    } catch (error) {
        console.log("Rate limit error:", error);
        next();
    }
}