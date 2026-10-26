import { getPicks } from "@/lib/catalog";
import { getContentByCategoryGrouped, type Category } from "@/lib/content";
import { Nav, type NavMenu } from "./Nav";
import { SearchButton } from "./SearchPalette";

const MAX_MENU_GUIDES = 8;

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
    const howToCount = g["how-to-guide"]?.length ?? 0;
    const buyingGuides = [...(g["use-case-guide"] ?? []), ...(g["buying-guide"] ?? [])];
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
        ...(howToCount
          ? [{ href: `/${category}/guides`, label: "How-to & troubleshooting", desc: `${howToCount} step-by-step guides` }]
          : []),
      ],
      // The panel has room for about 8 rows; a long list ran off the bottom of the
      // screen, so the rest sit behind a "See all" link to the guides index.
      guides: buyingGuides.slice(0, MAX_MENU_GUIDES).map((e) => ({
        href: e.href,
        label: e.title,
        desc: e.description,
      })),
      guidesMore:
        buyingGuides.length > MAX_MENU_GUIDES
          ? { href: `/${category}/guides`, label: `See all ${buyingGuides.length} buying guides` }
          : undefined,
    };
  });

  return <Nav menus={menus} search={<SearchButton />} />;
}
