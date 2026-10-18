// Single source of truth for every published guide/review/comparison page.
// sitemap.ts and each category's cross-link sections (<ContentLinks>) both read
// from this list — add an entry here once, and the new page is automatically
// in the sitemap AND linked from somewhere else on the site (never an orphan).

export type Category = "multimeters" | "soldering-irons" | "oscilloscopes";
export type ContentType = "use-case-guide" | "buying-guide" | "review" | "comparison";

export type ContentEntry = {
  category: Category;
  type: ContentType;
  title: string;
  description: string;
  href: string;
};

export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  "use-case-guide": "Shop by use case",
  "buying-guide": "Buying guide",
  review: "Product reviews",
  comparison: "Comparisons",
};

export const content: ContentEntry[] = [
  // Multimeters
  {
    category: "multimeters",
    type: "use-case-guide",
    title: "For Electricians",
    description: "CAT III/IV picks for panel work",
    href: "/multimeters/best-multimeter-for-electricians",
  },
  {
    category: "multimeters",
    type: "use-case-guide",
    title: "For Automotive",
    description: "RPM, dwell, and duty-cycle ready",
    href: "/multimeters/best-multimeter-for-automotive",
  },
  {
    category: "multimeters",
    type: "use-case-guide",
    title: "For Home & DIY",
    description: "Easy, affordable, no overkill",
    href: "/multimeters/best-multimeter-for-home-use",
  },
  {
    category: "multimeters",
    type: "buying-guide",
    title: "Multimeter Buying Guide",
    description: "CAT ratings, True RMS, and more explained",
    href: "/multimeters/multimeter-buying-guide",
  },
  {
    category: "multimeters",
    type: "review",
    title: "Fluke 117 Review",
    description: "A closer look at our Best Overall pick",
    href: "/multimeters/fluke-117-review",
  },
  {
    category: "multimeters",
    type: "comparison",
    title: "Fluke 117 vs Fluke 87V",
    description: "Which Fluke tier actually fits your work",
    href: "/multimeters/fluke-117-vs-fluke-87v",
  },

  // Soldering irons
  {
    category: "soldering-irons",
    type: "buying-guide",
    title: "Soldering Iron Buying Guide",
    description: "Wattage, temperature control, and tips explained",
    href: "/soldering-irons/soldering-iron-buying-guide",
  },
  {
    category: "soldering-irons",
    type: "review",
    title: "Hakko FX888D Review",
    description: "A closer look at our Best Overall pick",
    href: "/soldering-irons/hakko-fx888d-review",
  },
  {
    category: "soldering-irons",
    type: "comparison",
    title: "Hakko vs Weller",
    description: "Fast heat-up vs. ESD-safe construction",
    href: "/soldering-irons/hakko-fx888d-vs-weller-we1010na",
  },

  // Oscilloscopes
  {
    category: "oscilloscopes",
    type: "buying-guide",
    title: "Oscilloscope Buying Guide",
    description: "Bandwidth, sample rate, and channels explained",
    href: "/oscilloscopes/oscilloscope-buying-guide",
  },
  {
    category: "oscilloscopes",
    type: "review",
    title: "Rigol DS1054Z Review",
    description: "A closer look at our Best Overall pick",
    href: "/oscilloscopes/rigol-ds1054z-review",
  },
  {
    category: "oscilloscopes",
    type: "comparison",
    title: "Rigol vs Siglent",
    description: "50MHz value vs. 100MHz headroom",
    href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e",
  },
];

export function getContentByCategory(category: Category): ContentEntry[] {
  return content.filter((c) => c.category === category);
}

export function getContentByCategoryGrouped(category: Category): Partial<Record<ContentType, ContentEntry[]>> {
  const entries = getContentByCategory(category);
  const grouped: Partial<Record<ContentType, ContentEntry[]>> = {};
  for (const entry of entries) {
    (grouped[entry.type] ??= []).push(entry);
  }
  return grouped;
}
