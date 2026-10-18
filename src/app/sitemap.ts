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
  "/multimeters/fluke-117-review",
  "/multimeters/fluke-117-vs-fluke-87v",
  "/soldering-irons/best-soldering-irons",
  "/soldering-irons/soldering-iron-buying-guide",
  "/soldering-irons/hakko-fx888d-review",
  "/soldering-irons/hakko-fx888d-vs-weller-we1010na",
  "/oscilloscopes/best-beginner-oscilloscopes",
  "/oscilloscopes/oscilloscope-buying-guide",
  "/oscilloscopes/rigol-ds1054z-review",
  "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.map((route) => ({
    url: `https://ohmsavvy.com${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
