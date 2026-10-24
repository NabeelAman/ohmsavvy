import Link from "next/link";
import { content, type Category, type ContentEntry } from "@/lib/content";
import { GuideCard } from "./GuideCard";
import { Eyebrow } from "./ui/Eyebrow";

const CATEGORY: Record<Category, { label: string; noun: string; text: string; bg: string; roundup: string }> = {
  multimeters: { label: "Multimeters", noun: "Multimeter", text: "text-cat-multimeters", bg: "bg-cat-multimeters", roundup: "/multimeters/best-multimeters" },
  "soldering-irons": { label: "Soldering Irons", noun: "Soldering Iron", text: "text-cat-soldering", bg: "bg-cat-soldering", roundup: "/soldering-irons/best-soldering-irons" },
  oscilloscopes: { label: "Oscilloscopes", noun: "Oscilloscope", text: "text-cat-oscilloscopes", bg: "bg-cat-oscilloscopes", roundup: "/oscilloscopes/best-beginner-oscilloscopes" },
};

/** The "start here" how-to for each category, featured above the full list. */
export const START_HERE: Record<Category, string> = {
  multimeters: "/multimeters/how-to-use-a-multimeter",
  "soldering-irons": "/soldering-irons/how-to-use-a-soldering-iron",
  oscilloscopes: "/oscilloscopes/how-to-use-an-oscilloscope",
};

const SITE = "https://ohmsavvy.com";

function GuideRow({ entry, tone }: { entry: ContentEntry; tone: string }) {
  return (
    <Link
      href={entry.href}
      prefetch={false}
      className="group flex items-start gap-3 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent"
    >
      <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${tone}`} />
      <span className="min-w-0">
        <span className="block font-medium leading-snug group-hover:text-accent transition-colors">{entry.title}</span>
        <span className="mt-1 block text-sm text-muted leading-5">{entry.description}</span>
      </span>
    </Link>
  );
}

/** Index of every guide in a category: start here, buying guides, use-case guides, then all how-tos. */
export function GuideListing({ category, intro, path }: { category: Category; intro: string; path: string }) {
  const c = CATEGORY[category];
  const inCat = content.filter((e) => e.category === category);
  const start = inCat.find((e) => e.href === START_HERE[category]);
  const buying = inCat.filter((e) => e.type === "buying-guide");
  const useCases = inCat.filter((e) => e.type === "use-case-guide");
  const howTos = inCat.filter((e) => e.type === "how-to-guide" && e.href !== START_HERE[category]);
  const total = buying.length + useCases.length + howTos.length + (start ? 1 : 0);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${c.noun} Guides`,
      url: `${SITE}${path}`,
      hasPart: [start, ...buying, ...useCases, ...howTos]
        .filter((e): e is ContentEntry => !!e)
        .map((e) => ({ "@type": "Article", headline: e.title, url: `${SITE}${e.href}` })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: c.label, item: `${SITE}${c.roundup}` },
        { "@type": "ListItem", position: 3, name: "Guides", item: `${SITE}${path}` },
      ],
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <nav aria-label="Breadcrumb" className="mb-6 text-xs text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          </li>
          <li aria-hidden="true">›</li>
          <li>
            <Link href={c.roundup} className="hover:text-accent transition-colors">{c.label}</Link>
          </li>
          <li aria-hidden="true">›</li>
          <li aria-current="page" className="text-foreground">Guides</li>
        </ol>
      </nav>
      <Eyebrow>{c.label.toUpperCase()} · GUIDES</Eyebrow>
      <h1 className="text-3xl sm:text-4xl leading-tight">{c.noun} Guides</h1>
      <p className="mt-5 text-lg text-muted leading-7 max-w-3xl">{intro}</p>
      <p className="mt-3 text-sm text-muted">{total} guides</p>

      {start && (
        <Link
          href={start.href}
          className="group mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border-2 border-accent/40 bg-surface p-6 shadow-sm hover:border-accent transition-colors"
        >
          <div>
            <p className={`font-display text-[11px] uppercase tracking-wide ${c.text}`}>Start here</p>
            <p className="mt-2 text-xl font-semibold group-hover:text-accent transition-colors">{start.title}</p>
            <p className="mt-1 text-muted">{start.description}</p>
          </div>
          <span className="shrink-0 text-sm font-medium text-accent">Read the guide →</span>
        </Link>
      )}

      {buying.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Buying guides</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {buying.map((e) => (
              <GuideRow key={e.href} entry={e} tone={c.bg} />
            ))}
          </div>
        </div>
      )}

      {useCases.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Best picks by use case</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {useCases.map((e) => (
              <div key={e.href} className="flex">
                <GuideCard entry={e} />
              </div>
            ))}
          </div>
        </div>
      )}

      {howTos.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">How-to guides</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {howTos.map((e) => (
              <GuideRow key={e.href} entry={e} tone={c.bg} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-8 text-sm">
        <Link href={c.roundup} className="font-medium text-accent hover:underline">
          Best {c.noun.toLowerCase()}s
        </Link>
        <Link href={`/${category}/reviews`} className="text-accent hover:underline">
          All {c.noun.toLowerCase()} reviews
        </Link>
        <Link href={`/${category}/comparisons`} className="text-accent hover:underline">
          All {c.noun.toLowerCase()} comparisons
        </Link>
      </div>
    </section>
  );
}
