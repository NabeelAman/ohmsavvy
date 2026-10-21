// Numbered FAQ accordion built on <details>, so answers are in the HTML for
// search engines and work without JavaScript. The first item starts open.

// Questions read better in the body font than the condensed display font
// that the global h3 rule applies (that rule is unlayered, so it beats
// utility classes; an inline style is the reliable override).
const QUESTION_STYLE = { fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: 0 } as const;

export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((f, i) => (
        <details
          key={f.q}
          open={i === 0}
          className="group rounded-2xl border border-border bg-surface shadow-sm transition-colors open:border-accent/40 open:shadow-md [&_summary::-webkit-details-marker]:hidden"
        >
          <summary className="flex cursor-pointer list-none items-start gap-4 p-5 sm:p-6">
            <span className="mt-0.5 font-display text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="flex-1 text-base sm:text-lg leading-snug" style={QUESTION_STYLE}>
              {f.q}
            </h3>
            <span
              aria-hidden="true"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-accent transition-all duration-200 group-open:rotate-45 group-open:border-accent group-open:bg-accent group-open:text-accent-foreground"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </span>
          </summary>
          <p className="faq-answer px-5 pb-6 pl-[3.25rem] sm:px-6 sm:pl-[3.75rem] text-muted leading-7">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
