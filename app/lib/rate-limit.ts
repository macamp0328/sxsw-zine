type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const MAX_BUCKETS = 5_000;
// Best-effort per-process guard; use a shared store or platform firewall for distributed enforcement.
const buckets = new Map<string, RateLimitEntry>();

function pruneBuckets(now: number) {
  buckets.forEach((entry, key) => {
    if (entry.resetAt <= now) {
      buckets.delete(key);
    }
  });

  if (buckets.size <= MAX_BUCKETS) {
    return;
  }

  const keysToDelete = buckets.size - MAX_BUCKETS;
  Array.from(buckets.keys())
    .slice(0, keysToDelete)
    .forEach((key) => buckets.delete(key));
}

export function isRateLimited(
  key: string,
  {
    limit,
    windowMs,
  }: {
    limit: number;
    windowMs: number;
  },
): boolean {
  const now = Date.now();
  pruneBuckets(now);

  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  existing.count += 1;
  return existing.count > limit;
}
