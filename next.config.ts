import type { NextConfig } from "next";

const csp = [
  "default-src 'self'",
  // 'unsafe-inline' is required here — not optional. Without it, Next.js's
  // own inline hydration payload scripts (`self.__next_f.push(...)`) get
  // blocked by this exact policy, silently breaking client-side hydration
  // on every static page (confirmed via testing: React event handlers
  // never fired, window.gtag/dataLayer never initialized). A nonce-based
  // CSP avoids this but requires forcing every page to dynamic rendering
  // (losing static generation), which isn't worth it for a static content
  // site. This is Next.js's own documented "without nonces" baseline.
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  // Fonts are now self-hosted via next/font (served from our own origin
  // at build time), so no external font-related CSP allowances are needed.
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  // Product photos come from many manufacturer CDNs (Fluke, Rigol,
  // Siglent, etc.) rather than one host, so this allows any HTTPS image
  // source rather than an ever-growing per-domain allowlist. Images can't
  // execute script, so this doesn't weaken the policy's real protections.
  "img-src 'self' data: https:",
  "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com",
  "object-src 'none'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

// Hostnames serving verified product photos (automation/content-queue.json's
// verifiedRoster). Add a new entry here whenever a product from a new
// manufacturer/retailer domain is added to a picks array — next/image refuses
// to optimize any host not explicitly allowlisted.
const PRODUCT_IMAGE_HOSTS = [
  "assets.craftsman.com",
  "assets.southwire.com",
  "cdn.astroai.com",
  "data.kleintools.com",
  "e42.psgsm.net",
  "hakkousa.com",
  "kaiweets.com",
  "m.media-amazon.com",
  "media.fluke.com",
  "meters.uni-trend.com",
  "pine64.org",
  "ueeshop.ly200-cdn.com",
  "valuetronics.com",
  "www.extech.com",
  "www.milwaukeetool.com",
  "www.weller-tools.com",
];

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: PRODUCT_IMAGE_HOSTS.map((hostname) => ({ protocol: "https" as const, hostname })),
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "(?<vercelHost>.*\\.vercel\\.app)" }],
        destination: "https://ohmsavvy.com/:path*",
        permanent: true,
      },
      // Temporary stopgaps until real category hub pages exist — not
      // permanent, since these will be replaced by actual pages, not
      // redirects, once the Reviews/Comparisons/Guides structure ships.
      { source: "/multimeters", destination: "/multimeters/best-multimeters", permanent: false },
      { source: "/soldering-irons", destination: "/soldering-irons/best-soldering-irons", permanent: false },
      { source: "/oscilloscopes", destination: "/oscilloscopes/best-beginner-oscilloscopes", permanent: false },
    ];
  },
};

export default nextConfig;
