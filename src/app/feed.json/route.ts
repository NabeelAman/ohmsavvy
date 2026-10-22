import { getPicks, picksForEntry } from "@/lib/catalog";
import { content, type Category, type ContentType } from "@/lib/content";

// Machine-readable list of every publishable page, for the n8n Facebook
// autoposter (automation/n8n/). Built from the content registry, so a new
// review/comparison/guide shows up here as soon as its registry entry ships.
// Reads only static data, so it's prerendered at build time.

const SITE = "https://ohmsavvy.com";

const ROUNDUPS: { category: Category; title: string; description: string; href: string }[] = [
  {
    category: "multimeters",
    title: "Best Multimeters",
    description: "Every multimeter we recommend, ranked and compared on safety rating, accuracy and value.",
    href: "/multimeters/best-multimeters",
  },
  {
    category: "soldering-irons",
    title: "Best Soldering Irons",
    description: "Bench stations to USB-C portables, compared on heat-up time and temperature control.",
    href: "/soldering-irons/best-soldering-irons",
  },
  {
    category: "oscilloscopes",
    title: "Best Beginner Oscilloscopes",
    description: "Bandwidth, channels and sample rate explained, with the scopes worth buying.",
    href: "/oscilloscopes/best-beginner-oscilloscopes",
  },
];

type FeedType = ContentType | "roundup";

export function GET() {
  const items = [
    ...ROUNDUPS.map((r) => {
      const picks = getPicks(r.category);
      return {
        type: "roundup" as FeedType,
        category: r.category,
        title: r.title,
        description: r.description,
        url: `${SITE}${r.href}`,
        image: picks.find((p) => p.image)?.image ?? null,
        products: picks.map((p) => p.name),
        topPick: picks[0]
          ? { name: picks[0].name, rating: picks[0].rating, badge: picks[0].badge, bottomLine: picks[0].bottomLine }
          : null,
        handsOnTested: picks.some((p) => p.handsOnTested),
      };
    }),
    ...content.map((e) => {
      const picks = picksForEntry(e);
      return {
        type: e.type as FeedType,
        category: e.category,
        title: e.title,
        description: e.description,
        url: `${SITE}${e.href}`,
        image: picks.find((p) => p.image)?.image ?? null,
        products: picks.map((p) => p.name),
        topPick: picks[0]
          ? { name: picks[0].name, rating: picks[0].rating, badge: picks[0].badge, bottomLine: picks[0].bottomLine }
          : null,
        handsOnTested: picks.some((p) => p.handsOnTested),
      };
    }),
  ];

  return Response.json({ site: SITE, count: items.length, items });
}
