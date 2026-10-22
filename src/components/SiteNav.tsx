import { getPicks } from "@/lib/catalog";
import { getContentByCategoryGrouped, type Category } from "@/lib/content";
import { buildSearchIndex } from "@/lib/search";
import { Nav, type NavMenu } from "./Nav";
import { SearchButton } from "./SearchPalette";

const MENU_CONFIG: {
  category: Category;
  label: string;
  tone: NavMenu["tone"];
  roundup: { href: string; label: string; desc: string };
}[] = [
  {
    category: "multimeters",
    label: "Multimeters",
    tone: "multimeters",
    roundup: { href: "/multimeters/best-multimeters", label: "Best multimeters", desc: "Ranked and compared, every budget" },
  },
  {
    category: "soldering-irons",
    label: "Soldering Irons",
    tone: "soldering",
    roundup: { href: "/soldering-irons/best-soldering-irons", label: "Best soldering irons", desc: "Bench stations to USB-C portables" },
  },
  {
    category: "oscilloscopes",
    label: "Oscilloscopes",
    tone: "oscilloscopes",
    roundup: {
      href: "/oscilloscopes/best-beginner-oscilloscopes",
      label: "Best beginner oscilloscopes",
      desc: "Bandwidth and channels, explained",
    },
  },
];

// Server wrapper: builds the menu (including each category's verified top pick)
// here, so the client-side Nav never has to bundle the picks data itself.
export function SiteNav() {
  const menus: NavMenu[] = MENU_CONFIG.map(({ category, label, tone, roundup }) => {
    const g = getContentByCategoryGrouped(category);
    const top = getPicks(category)[0];
    const reviewCount = g.review?.length ?? 0;
    const comparisonCount = g.comparison?.length ?? 0;
    return {
      key: category,
      label,
      tone,
      href: roundup.href,
      match: `/${category}`,
      featured: {
        name: top.name,
        image: top.image,
        badge: top.badge,
        rating: top.rating,
        href: g.review?.find((r) => r.title.startsWith(top.name))?.href ?? roundup.href,
      },
      primary: [
        roundup,
        ...(reviewCount
          ? [{ href: `/${category}/reviews`, label: "All reviews", desc: `${reviewCount} in-depth reviews` }]
          : []),
        ...(comparisonCount
          ? [{ href: `/${category}/comparisons`, label: "Comparisons", desc: `${comparisonCount} head-to-head matchups` }]
          : []),
      ],
      guides: [...(g["use-case-guide"] ?? []), ...(g["buying-guide"] ?? [])].map((e) => ({
        href: e.href,
        label: e.title,
        desc: e.description,
      })),
    };
  });

  return <Nav menus={menus} search={<SearchButton items={buildSearchIndex()} />} />;
}
