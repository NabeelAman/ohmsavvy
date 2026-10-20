import type { MetadataRoute } from "next";
import { content } from "@/lib/content";
import { LOCALES } from "@/lib/i18n";

// Translated pilot pages: homepage + flagship review, in each pilot locale.
const TRANSLATED_PAGES = ["", "/multimeters/fluke-117-review"];
const localeRoutes = LOCALES.flatMap((locale) => TRANSLATED_PAGES.map((p) => `/${locale}${p}`));

const staticPages = [
  "",
  "/about",
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
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [...staticPages, ...content.map((c) => c.href), ...localeRoutes];
  return routes.map((route) => ({
    url: `https://ohmsavvy.com${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
