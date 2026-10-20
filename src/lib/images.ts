/**
 * Image hosts that serve browsers fine but refuse Vercel's image optimizer
 * (the optimizer returns 502 OPTIMIZED_EXTERNAL_IMAGE_REQUEST_UNAUTHORIZED).
 * Images from these hosts are passed to next/image as `unoptimized`, so the
 * browser loads the original file directly instead of a blank tile.
 *
 * Found by requesting every product image through /_next/image on the live
 * site; re-run that check when adding a new host.
 */
const OPTIMIZER_BLOCKED_HOSTS = new Set([
  "hakkousa.com",
  // Amazon listing photos: served straight from Amazon, never re-hosted or
  // cached by our optimizer (Amazon content may not be stored or modified).
  "m.media-amazon.com",
]);

export function skipOptimizer(src: string): boolean {
  try {
    return OPTIMIZER_BLOCKED_HOSTS.has(new URL(src).hostname);
  } catch {
    return false;
  }
}
