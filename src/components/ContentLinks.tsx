import Link from "next/link";
import { getContentByCategoryGrouped, type Category, type ContentEntry } from "@/lib/content";
import { ContentCard } from "./ContentCard";

const CATEGORY_LABELS: Record<Category, string> = {
  multimeters: "multimeter",
  "soldering-irons": "soldering iron",
  oscilloscopes: "oscilloscope",
};

const REVIEW_LIMIT = 4;
const COMPARISON_LIMIT = 3;

function SectionHeader({ label, viewAll }: { label: string; viewAll?: { href: string; text: string } }) {
  return (
    <div className="flex items-baseline justify-between gap-4 mb-4">
      <h2 className="font-display text-xs text-muted uppercase tracking-wide">{label}</h2>
      {viewAll && (
        <Link href={viewAll.href} className="text-sm font-medium text-accent hover:underline whitespace-nowrap">
          {viewAll.text}
        </Link>
      )}
    </div>
  );
}

/**
 * "More from this category" block at the foot of category pages: guides as
 * compact links, then a capped set of review and comparison cards (with
 * verified product photos) and a "View all" link to the full listing page.
 * Pass `current` to leave the page you're on out of the list.
 */
export function ContentLinks({ category, current }: { category: Category; current?: string }) {
  const grouped = getContentByCategoryGrouped(category);
  const notCurrent = (e: ContentEntry) => e.href !== current;

  const guides = [...(grouped["use-case-guide"] ?? []), ...(grouped["buying-guide"] ?? [])].filter(notCurrent);
  const allReviews = grouped.review ?? [];
  const allComparisons = grouped.comparison ?? [];
  const reviews = allReviews.filter(notCurrent).slice(0, REVIEW_LIMIT);
  const comparisons = allComparisons.filter(notCurrent).slice(0, COMPARISON_LIMIT);

  if (guides.length + reviews.length + comparisons.length === 0) return null;

  const label = CATEGORY_LABELS[category];

  return (
    <section className="border-t border-border bg-surface-raised">
      <div className="mx-auto max-w-6xl px-6 py-14 space-y-12">
        <p className="text-2xl font-semibold">More {label} guides and reviews</p>

        {guides.length > 0 && (
          <div>
            <SectionHeader label="Guides" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {guides.map((g) => (
                <Link
                  key={g.href}
                  href={g.href}
                  className="group min-w-0 flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-4 py-3 hover:border-accent transition-colors"
                >
                  <span className="min-w-0">
                    <span className="block font-medium leading-snug group-hover:text-accent transition-colors">
                      {g.title}
                    </span>
                    <span className="block text-xs text-muted mt-0.5 truncate">{g.description}</span>
                  </span>
                  <span className="text-accent shrink-0">→</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {reviews.length > 0 && (
          <div>
            <SectionHeader
              label="Product reviews"
              viewAll={{ href: `/${category}/reviews`, text: `View all ${allReviews.length} reviews →` }}
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {reviews.map((e) => (
                <ContentCard key={e.href} entry={e} />
              ))}
            </div>
          </div>
        )}

        {comparisons.length > 0 && (
          <div>
            <SectionHeader
              label="Comparisons"
              viewAll={{ href: `/${category}/comparisons`, text: `View all ${allComparisons.length} comparisons →` }}
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {comparisons.map((e) => (
                <ContentCard key={e.href} entry={e} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
