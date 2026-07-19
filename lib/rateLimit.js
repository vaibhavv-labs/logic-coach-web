import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

// Redis connection - fail gracefully if credentials are not provided (so we can fail-open)
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

let redis = null;
if (redisUrl && redisToken) {
  redis = new Redis({
    url: redisUrl,
    token: redisToken,
  });
}

// In-memory cache to prevent fetching rate limit state multiple times per request
const ephemeralCache = new Map();

/**
 * Creates a rate limiter instance for a specific endpoint.
 * 
 * @param {string} endpoint - The namespace for the endpoint (e.g., 'chat', 'generate')
 * @param {number} defaultRequests - Default max requests if env var is missing
 * @param {string} defaultWindow - Default window if env var is missing (e.g., '60 s')
 */
const createLimiter = (endpoint, defaultRequests, defaultWindow) => {
  const requests = parseInt(process.env[`RATE_LIMIT_${endpoint.toUpperCase()}_REQUESTS`] || defaultRequests);
  const windowStr = process.env[`RATE_LIMIT_${endpoint.toUpperCase()}_WINDOW`] || defaultWindow;

  if (!redis) {
    return null; // Return null if Redis is not configured
  }

  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(requests, windowStr),
    ephemeralCache,
    prefix: `ai:${endpoint}`,
  });
};

// Define limiters per endpoint (Defaults can be overridden via .env)
const limiters = {
  chat: createLimiter('chat', 15, '60 s'),
  dsa: createLimiter('dsa', 15, '60 s'),
  generate: createLimiter('generate', 10, '60 s'),
  complexity: createLimiter('complexity', 10, '60 s'),
};

/**
 * Extract client identifier based on priority:
 * 1. Firebase Auth UID (if authenticated)
 * 2. x-forwarded-for header
 * 3. x-real-ip header
 * 4. request.ip
 * 5. Fallback anonymous identifier
 */
export function getClientIdentifier(request, uid = null) {
  if (uid) return uid;

  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    // x-forwarded-for can be a comma-separated list of IPs. Get the first one.
    return forwardedFor.split(',')[0].trim();
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  // Next.js specific request.ip (available in Edge runtime or via middleware)
  if (request.ip) return request.ip;

  return "anonymous-fallback-ip";
}

/**
 * Enforces rate limiting for a specific endpoint.
 * 
 * FAILURE STRATEGY: Fail-Open.
 * If Redis is unavailable or unconfigured, we allow the request to proceed. 
 * Why? If Upstash goes down, blocking all users (Fail-Closed) breaks the entire application. 
 * By failing open, the worst-case scenario is that we hit the native Gemini API quotas (which return 429s anyway).
 * This ensures the best uptime while maintaining a secondary safety net.
 * 
 * @param {string} endpoint - The endpoint key (e.g., 'chat')
 * @param {Request} request - The Next.js Request object
 * @param {string} uid - The optional Firebase Auth UID
 * @returns {object} { success, limit, remaining, reset }
 */
export async function enforceRateLimit(endpoint, request, uid = null) {
  const identifier = getClientIdentifier(request, uid);
  const limiter = limiters[endpoint];

  if (!limiter) {
    // Fail-open if Redis is not configured
    console.warn(`[RATE_LIMIT] Redis not configured or limiter missing for ${endpoint}. Failing OPEN.`);
    return { success: true, limit: -1, remaining: -1, reset: 0, identifier };
  }

  try {
    const result = await limiter.limit(identifier);
    
    // Log every event
    console.log(`[RATE_LIMIT] Endpoint: ${endpoint} | ID: ${identifier} | Success: ${result.success} | Remaining: ${result.remaining} | Reset: ${new Date(result.reset).toISOString()}`);
    
    return { ...result, identifier };
  } catch (error) {
    // Fail-open if Upstash throws an error (e.g. network timeout)
    console.error(`[RATE_LIMIT] Error communicating with Redis for ${endpoint}. Failing OPEN. Error:`, error);
    return { success: true, limit: -1, remaining: -1, reset: 0, identifier };
  }
}
