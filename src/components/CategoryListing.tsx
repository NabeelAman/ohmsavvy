import { getContentByCategoryGrouped, type Category } from "@/lib/content";
import { ContentCard } from "./ContentCard";
import { Eyebrow } from "./ui/Eyebrow";

const CATEGORY_LABELS: Record<Category, string> = {
  multimeters: "Multimeters",
  "soldering-irons": "Soldering Irons",
  oscilloscopes: "Oscilloscopes",
};

export function CategoryListing({
  category,
  type,
  heading,
  intro,
  children,
}: {
  category: Category;
  type: "review" | "comparison";
  heading: string;
  intro: string;
  /** Cross-links rendered under the grid (kept in page.tsx so the link checker can see them). */
  children?: React.ReactNode;
}) {
  const entries = getContentByCategoryGrouped(category)[type] ?? [];

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <Eyebrow>
        {CATEGORY_LABELS[category].toUpperCase()} · {type === "review" ? "REVIEWS" : "COMPARISONS"}
      </Eyebrow>
      <h1 className="text-3xl sm:text-4xl leading-tight">{heading}</h1>
      <p className="mt-5 text-lg text-muted leading-7 max-w-3xl">{intro}</p>
      <p className="mt-3 text-sm text-muted">
        {entries.length} {type === "review" ? "reviews" : "comparisons"}
      </p>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {entries.map((entry) => (
          <ContentCard key={entry.href} entry={entry} />
        ))}
      </div>

      {children && <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-x-6 gap-y-3 text-sm">{children}</div>}
    </section>
  );
}
