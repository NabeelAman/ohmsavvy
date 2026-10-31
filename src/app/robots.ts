import type { MetadataRoute } from "next";

// Blocked explicitly: AI-training crawlers and high-volume SEO-tool bots
// that scrape all 547+ pages repeatedly but send no search traffic back —
// a real contributor to the Vercel ISR-read usage spike (2026-10-31), given
// GSC shows near-zero human traffic on this site so far. Google/Bing and
// unlisted/unknown bots remain allowed under the wildcard rule.
const BLOCKED_BOTS = [
  "GPTBot",
  "ChatGPT-User",
  "CCBot",
  "Bytespider",
  "PetalBot",
  "Amazonbot",
  "Applebot-Extended",
  "SemrushBot",
  "AhrefsBot",
  "MJ12bot",
  "DotBot",
  "BLEXBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...BLOCKED_BOTS.map((userAgent) => ({ userAgent, disallow: "/" })),
    ],
    sitemap: "https://ohmsavvy.com/sitemap.xml",
  };
}
