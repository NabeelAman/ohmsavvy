import type { NextConfig } from "next";

const ADSENSE_HOSTS = [
  "https://pagead2.googlesyndication.com",
  "https://*.googlesyndication.com",
  "https://*.doubleclick.net",
  "https://*.googleadservices.com",
  "https://*.google.com",
  "https://*.gstatic.com",
  "https://*.adtrafficquality.google",
].join(" ");

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
  // AdSense: the loader comes from pagead2.googlesyndication.com, and it pulls
  // further scripts and ad iframes from Google's ad hosts listed here and in
  // frame-src/connect-src (including the EEA consent message from fundingchoices).
  `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com ${ADSENSE_HOSTS}`,
  `frame-src ${ADSENSE_HOSTS}`,
  // Fonts are now self-hosted via next/font (served from our own origin
  // at build time), so no external font-related CSP allowances are needed.
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  // Product photos come from many manufacturer CDNs (Fluke, Rigol,
  // Siglent, etc.) rather than one host, so this allows any HTTPS image
  // source rather than an ever-growing per-domain allowlist. Images can't
  // execute script, so this doesn't weaken the policy's real protections.
  "img-src 'self' data: https:",
  // formspree.io: the /contact form posts there with fetch().
  `connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://formspree.io ${ADSENSE_HOSTS}`,
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
  "cdn11.bigcommerce.com",
  "data.kleintools.com",
  "e42.psgsm.net",
  "hakkousa.com",
  "kaiweets.com",
  "m.media-amazon.com",
  "media.fluke.com",
  "media.kleintools.io",
  "meters.uni-trend.com",
  "pine64.org",
  "ueeshop.ly200-cdn.com",
  "valuetronics.com",
  "www.brymen.com",
  "www.extech.com",
  "www.fnirsi.com",
  "www.hantek.com",
  "www.milwaukeetool.com",
  "www.weller-tools.com",
];

// Paths only vulnerability scanners request (WordPress, PHP, leaked env/git
// files). Unmatched URLs render the 404 page in a Vercel Function, so every
// probe cost an invocation. Rewriting them to a static file answers from the
// CDN instead; X-Robots-Tag keeps those URLs out of search indexes.
const SCANNER_PROBES = ["/:path(wp-.*)", "/:path(.*\\.php)", "/:path(\\.env.*)", "/:path(\\.git/.*)"];

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: PRODUCT_IMAGE_HOSTS.map((hostname) => ({ protocol: "https" as const, hostname })),
    // Product photos at a given URL never change, so keep optimized copies for
    // 31 days instead of the 4-hour default: fewer re-transformations (billed)
    // and a long browser cache lifetime.
    minimumCacheTTL: 2678400,
    // Default list minus 2048 and 3840. No image slot on the site is wider than
    // about 400 CSS px, or the mobile viewport (100vw sizes), so those widths
    // were only ever used as next/image's fallback `src`, which still cost a
    // transformation each when a crawler or old browser fetched it.
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
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      ...SCANNER_PROBES.map((source) => ({
        source,
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      })),
    ];
  },
  async rewrites() {
    return {
      beforeFiles: SCANNER_PROBES.map((source) => ({ source, destination: "/blocked.txt" })),
    };
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "(?<vercelHost>.*\\.vercel\\.app)" }],
        destination: "https://ohmsavvy.com/:path*",
        permanent: true,
      },
      // Duplicate comparison (same pair, reversed) consolidated into the older, better-linked URL.
      {
        source: "/oscilloscopes/digilent-analog-discovery-3-vs-picoscope-2204a",
        destination: "/oscilloscopes/picoscope-2204a-vs-digilent-analog-discovery-3",
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
