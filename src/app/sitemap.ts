import type { MetadataRoute } from "next";
import { cacheLife } from "next/cache";
import { content } from "@/lib/content";
import { LOCALES } from "@/lib/i18n";

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

// Cached so the sitemap is prerendered at build: under cacheComponents, the
// bare new Date() below made it run a function on every crawler request.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  "use cache";
  cacheLife("max");
  const routes = [...staticPages, ...content.map((c) => c.href), ...localeRoutes];
  return routes.map((route) => ({
    url: `https://ohmsavvy.com${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
