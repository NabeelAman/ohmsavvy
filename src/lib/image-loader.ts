"use client";

// Custom next/image loader (wired in next.config.ts as images.loaderFile).
// Product photos pre-rendered by automation/build-product-images.mjs are served as static WebP files from
// /img/p/, which costs no Vercel image transformations. Anything else (a new photo not yet pre-rendered, or a
// local image) goes through the normal /_next/image optimizer exactly as before. Images rendered with
// `unoptimized` (Amazon listing photos, hakkousa.com) never reach this loader.
import manifest from "./product-image-manifest.json";

type Entry = { h: string; w: number[] };
const entries = manifest as Record<string, Entry>;

export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }): string {
  const entry = entries[src];
  if (entry) {
    // Smallest pre-rendered width that covers the requested one; the largest if none does.
    const w = entry.w.find((x) => x >= width) ?? entry.w[entry.w.length - 1];
    return `/img/p/${entry.h}-${w}.webp`;
  }
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality ?? 75}`;
}
