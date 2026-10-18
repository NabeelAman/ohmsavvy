import type { MetadataRoute } from "next";

const staticRoutes = [
  "",
  "/about",
  "/privacy-policy",
  "/terms-of-service",
  "/multimeters/best-multimeters",
  "/multimeters/best-multimeter-for-electricians",
  "/multimeters/best-multimeter-for-automotive",
  "/multimeters/best-multimeter-for-home-use",
  "/multimeters/multimeter-buying-guide",
  "/soldering-irons/best-soldering-irons",
  "/soldering-irons/soldering-iron-buying-guide",
  "/oscilloscopes/best-beginner-oscilloscopes",
  "/oscilloscopes/oscilloscope-buying-guide",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.map((route) => ({
    url: `https://ohmsavvy.com${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
