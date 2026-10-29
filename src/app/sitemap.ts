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

// Segmented by template family (not just URL count, which is nowhere near the
// 50,000 limit): if GSC shows one family indexing worse than the others, a
// per-sitemap breakdown makes that visible immediately instead of hiding it
// inside one flat list.
const SEGMENTS = {
  core: staticPages,
  reviews: content.filter((c) => c.type === "review").map((c) => c.href),
  comparisons: content.filter((c) => c.type === "comparison").map((c) => c.href),
  guides: content
    .filter((c) => c.type === "use-case-guide" || c.type === "buying-guide" || c.type === "how-to-guide")
    .map((c) => c.href),
  locales: localeRoutes,
} as const;

export function generateSitemaps() {
  return Object.keys(SEGMENTS).map((id) => ({ id }));
}

// Cached so each segment is prerendered at build: under cacheComponents, a
// bare new Date() would run a function on every crawler request instead.
export default async function sitemap({ id }: { id: string }): Promise<MetadataRoute.Sitemap> {
  "use cache";
  cacheLife("max");
  const routes = SEGMENTS[id as keyof typeof SEGMENTS] ?? [];
  return routes.map((route) => ({
    url: `https://ohmsavvy.com${route}`,
    lastModified: lastModFor(route),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
