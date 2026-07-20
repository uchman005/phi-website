// ---------------------------------------------------------------------------
// Best-effort in-memory rate limiter for the PayPal API routes.
//
// This is a fixed-window counter keyed by client IP, held in a module-level
// Map. It only limits requests handled by the *same warm server instance* —
// on serverless platforms with multiple concurrent instances (or after a
// cold start) each instance keeps its own counts, so a determined attacker
// spread across instances isn't fully stopped. It still meaningfully raises
// the bar against casual abuse and buggy client retry loops.
//
// For guaranteed cross-instance limiting in production, front this with a
// shared store (e.g. Upstash Redis, Vercel Edge Config) — swap the
// implementation below without changing call sites.
// ---------------------------------------------------------------------------

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

// Periodically drop expired buckets so the map doesn't grow unbounded under
// sustained load; cheap probabilistic sweep, no timers to clean up.
function sweep() {
  if (Math.random() > 0.02) return;
  const now = Date.now();
  for (const [key, bucket] of buckets) {
    if (now > bucket.resetAt) buckets.delete(key);
  }
}

export interface RateLimitResult {
  ok: boolean;
  retryAfterSeconds?: number;
}

export function checkRateLimit(
  key: string,
  max: number,
  windowMs: number
): RateLimitResult {
  sweep();
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }

  if (bucket.count >= max) {
    return { ok: false, retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count += 1;
  return { ok: true };
}

/** Best-effort client IP from standard proxy headers (Vercel, most CDNs set x-forwarded-for). */
export function clientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}
