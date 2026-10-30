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
// Listing every guide put ~170 links and ~150 KB of HTML on every page (most of
// the mobile Total Blocking Time). The full list lives on /<category>/guides.
const GUIDE_LIMIT = 12;

// Words too common in our slugs to say two guides are about the same thing.
const STOPWORDS = new Set(
  "a an the to of in on for with and or vs is my your do does why how what can when use using best test testing check multimeter multimeters oscilloscope oscilloscopes soldering iron irons".split(" "),
);
const slugWords = (href: string) =>
  new Set(href.split("/").pop()!.split("-").filter((w) => w.length > 1 && !STOPWORDS.has(w)));

// The last few slots rotate per page, so guides with few topical neighbors still collect links.
const ROTATING = 3;

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(h, 31) + s.charCodeAt(i)) | 0;
  return h;
}

/** Guides sharing the most slug words with the current page first (ties keep registry order), then a per-page rotation. */
function relatedGuides(guides: ContentEntry[], current?: string): ContentEntry[] {
  if (!current) return guides.slice(0, GUIDE_LIMIT);
  const words = slugWords(current);
  const score = (g: ContentEntry) => [...slugWords(g.href)].filter((w) => words.has(w)).length;
  const ranked = guides
    .map((g, i) => ({ g, i, s: score(g) }))
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .map((x) => x.g);
  const top = ranked.slice(0, GUIDE_LIMIT - ROTATING);
  const rest = ranked.slice(GUIDE_LIMIT - ROTATING).sort((a, b) => hash(current + a.href) - hash(current + b.href));
  return [...top, ...rest.slice(0, ROTATING)];
}

function SectionHeader({ label, viewAll }: { label: string; viewAll?: { href: string; text: string } }) {
  return (
    <div className="flex items-baseline justify-between gap-4 mb-4">
      <h2 className="font-display text-xs text-muted uppercase tracking-wide">{label}</h2>
      {viewAll && (
        <Link href={viewAll.href} className="py-1 text-sm font-medium text-accent hover:underline whitespace-nowrap">
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

  const allGuides = [
    ...(grouped["use-case-guide"] ?? []),
    ...(grouped["buying-guide"] ?? []),
    ...(grouped["how-to-guide"] ?? []),
  ];
  const guides = relatedGuides(allGuides.filter(notCurrent), current);
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
            <SectionHeader
              label="Related guides"
              viewAll={{ href: `/${category}/guides`, text: `View all ${allGuides.length} guides →` }}
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {guides.map((g) => (
                // Not prefetched: viewport prefetch fires one billed edge request per link.
                <Link
                  key={g.href}
                  href={g.href}
                  prefetch={false}
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
