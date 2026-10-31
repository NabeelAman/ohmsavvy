// Merged stat row + trust badges, floated as a card overlapping the hero's
// bottom edge: puts the site's E-E-A-T signals (no sponsored picks, specs
// checked at the source) as high on the page as the numbers, instead of a
// separate "How we review" section a visitor has to scroll past to reach.
export function ProofBar({
  stats,
  badges,
}: {
  stats: { value: string; label: string }[];
  badges: string[];
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface px-6 py-5 shadow-xl shadow-foreground/5 ring-1 ring-black/[0.03] flex flex-wrap items-center gap-x-8 gap-y-3">
      <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
        {stats.map((s) => (
          <div key={s.label} className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-semibold text-accent">{s.value}</span>
            <span className="text-xs sm:text-sm text-muted">{s.label}</span>
          </div>
        ))}
      </div>
      <div className="hidden sm:block h-6 w-px bg-border" aria-hidden="true" />
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-muted">
        {badges.map((b) => (
          <span key={b} className="inline-flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="shrink-0 text-signal">
              <path d="M2 7.5l3 3 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}
