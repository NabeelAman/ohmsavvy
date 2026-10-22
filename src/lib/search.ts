import { getPicks } from "./catalog";
import { content, type Category, type ContentType } from "./content";

export type SearchGroup = "Products" | "Reviews" | "Comparisons" | "Guides" | "Top picks";

export type SearchItem = {
  title: string;
  href: string;
  group: SearchGroup;
  desc: string;
  category: Category;
  image?: string;
  rating?: number;
  badge?: string;
  /** Extra words to match on (product names, specs) that aren't shown. */
  keywords?: string;
};

const GROUP_BY_TYPE: Record<ContentType, SearchGroup> = {
  review: "Reviews",
  comparison: "Comparisons",
  "use-case-guide": "Guides",
  "buying-guide": "Guides",
  "how-to-guide": "Guides",
};

const ROUNDUPS: { category: Category; title: string; href: string; desc: string }[] = [
  { category: "multimeters", title: "Best multimeters", href: "/multimeters/best-multimeters", desc: "Every multimeter we recommend, ranked" },
  { category: "soldering-irons", title: "Best soldering irons", href: "/soldering-irons/best-soldering-irons", desc: "Bench stations to USB-C portables" },
  {
    category: "oscilloscopes",
    title: "Best beginner oscilloscopes",
    href: "/oscilloscopes/best-beginner-oscilloscopes",
    desc: "Bandwidth and channels, explained",
  },
];

/** Everything the header search can find, built on the server from the registry and verified picks. */
export function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  for (const r of ROUNDUPS) {
    items.push({ ...r, group: "Top picks", keywords: `best top ${r.category}` });
  }

  for (const category of ["multimeters", "soldering-irons", "oscilloscopes"] as Category[]) {
    const roundup = ROUNDUPS.find((r) => r.category === category)!;
    for (const p of getPicks(category)) {
      const review = content.find((e) => e.type === "review" && e.title === `${p.name} Review`);
      items.push({
        title: p.name,
        href: review?.href ?? roundup.href,
        group: "Products",
        desc: p.bottomLine,
        category,
        image: p.image,
        rating: p.rating,
        badge: p.badge,
        keywords: p.specs.map((s) => `${s.label} ${s.value}`).join(" "),
      });
    }
  }

  for (const e of content) {
    items.push({
      title: e.title,
      href: e.href,
      group: GROUP_BY_TYPE[e.type],
      desc: e.description,
      category: e.category,
      keywords: e.picks?.join(" "),
    });
  }

  return items;
}
