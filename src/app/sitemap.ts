import type { MetadataRoute } from "next";
import { content } from "@/lib/content";

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
  const routes = [...staticPages, ...content.map((c) => c.href)];
  return routes.map((route) => ({
    url: `https://ohmsavvy.com${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
