import { Button } from "./ui/Button";

export type CategoryHeroStat = { value: string; label: string };

const categoryAccent: Record<string, string> = {
  multimeters: "text-cat-multimeters",
  soldering: "text-cat-soldering",
  oscilloscopes: "text-cat-oscilloscopes",
};

const categoryAccentBg: Record<string, string> = {
  multimeters: "bg-cat-multimeters",
  soldering: "bg-cat-soldering",
  oscilloscopes: "bg-cat-oscilloscopes",
};

export function CategoryHero({
  category,
  label,
  heading,
  tagline,
  description,
  primaryCta,
  secondaryCta,
  stats,
}: {
  category: "multimeters" | "soldering" | "oscilloscopes";
  label: string;
  heading: string;
  tagline: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  stats: CategoryHeroStat[];
}) {
  const accent = categoryAccent[category];
  const accentBg = categoryAccentBg[category];

  return (
    <>
      {/* Adapts to the active theme (light or dark) like the rest of the
          site, rather than being locked to one look. */}
      <section className="relative overflow-hidden bg-surface-raised border-b border-border">
        <div
          className={`absolute inset-0 opacity-[0.08] ${accentBg}`}
          style={{
            maskImage: "repeating-linear-gradient(115deg, black 0 2px, transparent 2px 60px)",
            WebkitMaskImage: "repeating-linear-gradient(115deg, black 0 2px, transparent 2px 60px)",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-6 pt-20 pb-16 text-center">
          <p className={`font-display text-xs uppercase tracking-[0.2em] ${accent}`}>{label}</p>
          <p className="mt-4 text-sm text-muted">{tagline}</p>
          <h1 className="mt-2 text-4xl sm:text-5xl leading-tight text-foreground">{heading}</h1>
          <p className="mt-5 max-w-xl mx-auto text-muted leading-7">{description}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href={primaryCta.href}>{primaryCta.label}</Button>
            <a
              href={secondaryCta.href}
              className={`inline-flex items-center gap-2 rounded-md border px-5 py-2.5 text-sm font-medium border-border hover:border-current transition-colors ${accent}`}
            >
              {secondaryCta.label}
            </a>
          </div>
        </div>
      </section>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-4xl px-6 py-6 grid grid-cols-3 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className={`font-display text-xl sm:text-2xl font-semibold ${accent}`}>{s.value}</div>
              <div className="mt-1 text-xs text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
