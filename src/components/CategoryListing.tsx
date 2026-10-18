import Link from "next/link";
import { getContentByCategoryGrouped, type Category } from "@/lib/content";
import type { Pick } from "./ReviewArticle";
import { Badge } from "./ui/Badge";
import { Eyebrow } from "./ui/Eyebrow";
import { Stars } from "./ui/Stars";

const CATEGORY_LABELS: Record<Category, string> = {
  multimeters: "Multimeters",
  "soldering-irons": "Soldering Irons",
  oscilloscopes: "Oscilloscopes",
};

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

// Finds the verified Pick(s) an entry is about — by name in the title, or by
// the name's slug in the href (registry titles are sometimes shortened, e.g.
// "Hakko vs Weller"). Only already-verified images are reused, never sourced.
function picksForEntry(entry: { title: string; href: string }, picks: Pick[]): Pick[] {
  return picks
    .map((p) => {
      const titleAt = entry.title.indexOf(p.name);
      const hrefAt = entry.href.indexOf(slugify(p.name));
      return { p, at: titleAt >= 0 ? titleAt : hrefAt >= 0 ? hrefAt + 1000 : -1 };
    })
    .filter((m) => m.at >= 0)
    .sort((x, y) => x.at - y.at)
    .map((m) => m.p);
}

function Thumb({ pick }: { pick: Pick }) {
  return (
    <div className="h-28 flex-1 flex items-center justify-center rounded-md bg-gradient-to-b from-surface-raised to-surface">
      {pick.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={pick.image} alt={pick.name} className="w-full h-full object-contain p-3" loading="lazy" />
      ) : (
        <span className="px-3 text-center text-[11px] text-muted">Photo pending</span>
      )}
    </div>
  );
}

export function CategoryListing({
  category,
  type,
  picks,
  heading,
  intro,
  children,
}: {
  category: Category;
  type: "review" | "comparison";
  picks: Pick[];
  heading: string;
  intro: string;
  /** Cross-links rendered under the grid (kept in page.tsx so the link checker can see them). */
  children?: React.ReactNode;
}) {
  const entries = getContentByCategoryGrouped(category)[type] ?? [];

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <Eyebrow>
        {CATEGORY_LABELS[category].toUpperCase()} · {type === "review" ? "REVIEWS" : "COMPARISONS"}
      </Eyebrow>
      <h1 className="text-3xl sm:text-4xl leading-tight">{heading}</h1>
      <p className="mt-5 text-lg text-muted leading-7 max-w-3xl">{intro}</p>
      <p className="mt-3 text-sm text-muted">
        {entries.length} {type === "review" ? "reviews" : "comparisons"}
      </p>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {entries.map((entry) => {
          const matched = picksForEntry(entry, picks);
          return (
            <Link
              key={entry.href}
              href={entry.href}
              className="group rounded-lg border border-border bg-surface overflow-hidden shadow-sm hover:border-accent transition-colors flex flex-col"
            >
              <div className="h-1.5 bg-accent" />
              {matched.length > 0 && (
                <div className="flex gap-2 p-3 pb-0">
                  {matched.map((p) => (
                    <Thumb key={p.name} pick={p} />
                  ))}
                </div>
              )}
              <div className="p-5 flex flex-col gap-2 flex-1">
                {type === "review" && matched[0] && (
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="signal">{matched[0].badge}</Badge>
                    <Stars rating={matched[0].rating} />
                  </div>
                )}
                <p className="font-semibold group-hover:text-accent transition-colors">{entry.title}</p>
                <p className="text-sm text-muted leading-6">{entry.description}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {children && <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-x-6 gap-y-3 text-sm">{children}</div>}
    </section>
  );
}
