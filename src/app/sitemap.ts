import type { MetadataRoute } from "next";
import { cacheLife } from "next/cache";
import { content } from "@/lib/content";
import { LOCALES } from "@/lib/i18n";
import lastModJson from "@/lib/sitemap-lastmod.json";

const lastModMap = lastModJson as Record<string, string>;
const lastModFor = (route: string) => lastModMap[route === "" ? "/" : route] ?? new Date().toISOString();

// Translated pilot pages: homepage + flagship review, in each pilot locale.
const TRANSLATED_PAGES = ["", "/multimeters/fluke-117-review"];
const localeRoutes = LOCALES.flatMap((locale) => TRANSLATED_PAGES.map((p) => `/${locale}${p}`));

const staticPages = [
  "",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms-of-service",
  "/multimeters/best-multimeters",
  "/soldering-irons/best-soldering-irons",
  "/oscilloscopes/best-beginner-oscilloscopes",
  // Category listing pages (<CategoryListing>), one per category + type.
  "/multimeters/reviews",
  "/multimeters/comparisons",
  "/soldering-irons/reviews",
  "/soldering-irons/comparisons",
  "/oscilloscopes/reviews",
  "/oscilloscopes/comparisons",
  // Guide index pages (<GuideListing>), one per category.
  "/multimeters/guides",
  "/soldering-irons/guides",
  "/oscilloscopes/guides",
];

const allRoutes = [...staticPages, ...content.map((c) => c.href), ...localeRoutes];

// Single flat sitemap at /sitemap.xml: 522 URLs is far under the 50,000-URL
// limit, so generateSitemaps()'s per-segment split isn't needed for scale —
// and in Next 16 it only serves /sitemap/[id].xml with no auto-generated
// index at /sitemap.xml, which is what robots.txt/GSC/submit-gsc-sitemap.mjs
// all expect. Cached so this is prerendered at build: under cacheComponents,
// a bare new Date() would run a function on every crawler request instead.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  "use cache";
  cacheLife("max");
  return allRoutes.map((route) => ({
    url: `https://ohmsavvy.com${route}`,
    lastModified: lastModFor(route),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
