import type { NextConfig } from "next";

const csp = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https://m.media-amazon.com https://images-na.ssl-images-amazon.com",
  "connect-src 'self'",
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

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
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
