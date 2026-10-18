import { CONTENT_TYPE_LABELS, getContentByCategoryGrouped, type Category, type ContentType } from "@/lib/content";

const TYPE_ORDER: ContentType[] = ["use-case-guide", "buying-guide", "review", "comparison"];

export function ContentLinks({ category }: { category: Category }) {
  const grouped = getContentByCategoryGrouped(category);
  const typesPresent = TYPE_ORDER.filter((t) => grouped[t]?.length);

  if (typesPresent.length === 0) return null;

  return (
    <>
      {typesPresent.map((type) => (
        <section key={type} className="mx-auto max-w-4xl px-6 py-12 border-t border-border">
          <p className="font-display text-xs text-muted uppercase tracking-wide mb-4">
            {CONTENT_TYPE_LABELS[type]}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {grouped[type]!.map((entry) => (
              <a
                key={entry.href}
                href={entry.href}
                className="rounded-lg border border-border bg-surface p-4 hover:border-accent transition-colors"
              >
                <p className="font-medium">{entry.title}</p>
                <p className="mt-1 text-sm text-muted">{entry.description}</p>
              </a>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
