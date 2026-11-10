import type { NextConfig } from "next";

// Security headers (CSP etc.), the scanner-probe rewrites and the redirects live in vercel.json: this site is a
// static export (output: "export"), and next.config headers()/rewrites()/redirects() don't run for one.

const nextConfig: NextConfig = {
  // Static export (2026-11-11): Vercel serves the site as plain files from its CDN. Prerendered Next.js pages were
  // metered as ISR reads + Fast Origin Transfer on every CDN cache miss (and every deploy purges the cache); both
  // went over the Hobby plan's monthly limits (1.3M/1M reads, 10.5/10 GB). Static files use neither.
  output: "export",
  images: {
    // Product photos pre-rendered by automation/build-product-images.mjs are served as static WebP from /img/p/
    // by this loader. A photo not yet in src/lib/product-image-manifest.json is used straight from its source URL
    // (there is no /_next/image optimizer in a static export). Amazon listing photos render `unoptimized`.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    // Default list minus 2048 and 3840: no image slot on the site is wider than about 400 CSS px or the mobile
    // viewport, so those widths were never needed.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
