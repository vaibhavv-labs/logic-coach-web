# Logic Coach - Incident Response Runbook

## Incident Severity Levels
- **SEV-1 (Critical):** Core functionality is completely broken for all users (e.g., login failure, AI response failure, database down). Requires immediate all-hands response.
- **SEV-2 (High):** Core functionality is degraded or broken for a subset of users, but a workaround exists.
- **SEV-3 (Low):** Non-critical bugs, UI glitches, or isolated edge cases.

## Initial Triage Checklist
1. **Reproduce the issue:** Can you reproduce the error locally or in production?
2. **Check Vercel Deployment:** Navigate to the Vercel Dashboard -> Deployments. Is the latest build successful? Are there any runtime errors in the Logs?
3. **Check Sentry:** Open the Sentry Dashboard. Filter by `environment:production`. Are there new, unhandled exceptions matching the issue timeframe?
4. **Identify the Scope:** Is the issue isolated to a specific user, endpoint, or the entire application?

## Vercel Troubleshooting
- **Issue:** 500 Internal Server Error on specific routes.
- **Action:** Check Vercel Function Logs for the specific route. Look for unhandled promise rejections or timeout errors (Vercel functions timeout after 10-15s on the hobby tier).
- **Issue:** Hydration mismatch or blank screen.
- **Action:** This is often a build optimization issue. Try redeploying the latest commit with "Use existing build cache" disabled.

## Firestore Troubleshooting
- **Issue:** `permission-denied` errors.
- **Action:** Check `firestore.rules`. Ensure the user has the correct authentication state and is accessing their own UID path.
- **Issue:** `failed-precondition` errors.
- **Action:** A query requires a composite index that hasn't been deployed. Check the Firebase Console -> Firestore -> Indexes and build the required index.

## Upstash Troubleshooting
- **Issue:** Legitimate users are getting `429 Too Many Requests`.
- **Action:** 
  1. Check Vercel Environment Variables: Are `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` correctly set?
  2. If Upstash is down or unreachable, the application is designed to Fail-Open (allow requests). If 429s are happening, it means the rate limit threshold (e.g., 15 requests / 60s) is genuinely being exceeded.
  3. To temporarily mitigate, increase the rate limits in Vercel Environment Variables (e.g., `RATE_LIMIT_CHAT_REQUESTS`).

## Gemini Troubleshooting
- **Issue:** AI responses are blank, taking too long, or failing completely.
- **Action:**
  1. Check the Google Cloud Console for the Gemini API. Look for quota exhaustion (429 Quota Exceeded) or billing issues.
  2. If the API is degraded globally, check the Google Cloud Status Dashboard.
  3. Ensure the API key restrictions in Google Cloud Console haven't accidentally blocked Vercel's IPs.

## Rollback Procedure
If a deployment introduces a SEV-1 or SEV-2 bug that cannot be fixed within 15 minutes, execute a rollback:
1. Open the Vercel Dashboard -> Deployments.
2. Locate the last known good deployment.
3. Click the three dots (⋮) and select **Promote to Production** (or **Revert**).
4. Verify the application is stable on the production URL.
5. **CRITICAL:** Ensure the rollback doesn't break due to a database schema change introduced in the bad deployment. (All schema changes must be forward-compatible).

## Post-Incident Checklist
- Write a post-mortem document answering:
  - What was the root cause?
  - How was it detected?
  - How was it resolved?
  - What steps are being taken to prevent recurrence (e.g., new tests, better monitoring)?
