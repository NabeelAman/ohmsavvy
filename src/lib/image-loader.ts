"use client";

// Custom next/image loader (wired in next.config.ts as images.loaderFile).
// Product photos pre-rendered by automation/build-product-images.mjs are served as static WebP files from
// /img/p/. Anything else (a new photo not yet pre-rendered, or a local image) is used as-is: the site is a static
// export, so there is no /_next/image optimizer. Images rendered with `unoptimized` (Amazon listing photos,
// hakkousa.com) never reach this loader.
import manifest from "./product-image-manifest.json";

type Entry = { h: string; w: number[] };
const entries = manifest as Record<string, Entry>;

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }): string {
  const entry = entries[src];
  if (entry) {
    // Smallest pre-rendered width that covers the requested one; the largest if none does.
    const w = entry.w.find((x) => x >= width) ?? entry.w[entry.w.length - 1];
    return `/img/p/${entry.h}-${w}.webp`;
  }
  return src;
}
