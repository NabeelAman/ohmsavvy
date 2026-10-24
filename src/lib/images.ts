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

// Amazon's CDN serves its own smaller renditions of a listing photo when the
// size token in the file name changes (`._SL1500_.jpg` -> `._SL320_.jpg`, also
// `._AC_SL1500_`, `._SX522_`). Picking one of those is not re-hosting or
// modifying the image: it's the same Amazon URL family, served by Amazon.
const AMAZON_SIZE_TOKEN = /\._((?:AC_)?(?:SL|SX|SY|UL|SS))(\d+)_\.(jpe?g|png|webp)$/i;
// A few fixed sizes rather than exact pixel counts, so slots of similar size
// share one URL (and one browser-cache entry).
const AMAZON_RENDITIONS = [160, 320, 480, 640, 800];

/**
 * The URL to render for a product photo shown in a slot whose longest side is
 * at most `slotPx` CSS pixels. Amazon listing photos (passed to next/image as
 * `unoptimized`, so they get no srcset) are swapped for Amazon's own rendition
 * at about 2x the slot, for high-DPI screens; every other URL is returned
 * unchanged and resized by the image optimizer as before. The stored Pick
 * `image` string is never changed: use this only at the <Image src> call site.
 */
export function productImageSrc(src: string, slotPx: number): string {
  let url: URL;
  try {
    url = new URL(src);
  } catch {
    return src;
  }
  if (url.hostname !== "m.media-amazon.com") return src;
  const m = url.pathname.match(AMAZON_SIZE_TOKEN);
  if (!m) return src;
  const original = Number(m[2]);
  const want = AMAZON_RENDITIONS.find((r) => r >= slotPx * 2) ?? AMAZON_RENDITIONS[AMAZON_RENDITIONS.length - 1];
  if (want >= original) return src;
  url.pathname = url.pathname.replace(AMAZON_SIZE_TOKEN, `._${m[1]}${want}_.${m[3]}`);
  return url.toString();
}
