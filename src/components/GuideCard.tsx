import Image from "next/image";
import { skipOptimizer } from "@/lib/images";
import Link from "next/link";
import { picksForEntry } from "@/lib/catalog";
import type { Category, ContentEntry } from "@/lib/content";
import { PhotoPlaceholder } from "./PhotoPlaceholder";

const TONE: Record<Category, { text: string; bg: string; soft: string }> = {
  multimeters: { text: "text-cat-multimeters", bg: "bg-cat-multimeters", soft: "from-cat-multimeters/15" },
  "soldering-irons": { text: "text-cat-soldering", bg: "bg-cat-soldering", soft: "from-cat-soldering/15" },
  oscilloscopes: { text: "text-cat-oscilloscopes", bg: "bg-cat-oscilloscopes", soft: "from-cat-oscilloscopes/15" },
};

const CATEGORY_LABEL: Record<Category, string> = {
  multimeters: "Multimeters",
  "soldering-irons": "Soldering irons",
  oscilloscopes: "Oscilloscopes",
};

/**
 * Visual card for a guide: a fanned stack of the verified product photos the
 * guide recommends over a soft category-tinted backdrop, then title, summary
 * and pick count. Buying guides (no picks) get a simple icon tile instead.
 */
export function GuideCard({ entry }: { entry: ContentEntry }) {
  const tone = TONE[entry.category];
  const picks = picksForEntry(entry).slice(0, 3);
  const count = entry.picks?.length ?? 0;
  const rotations = picks.length === 1 ? ["rotate-0"] : picks.length === 2 ? ["-rotate-6", "rotate-6"] : ["-rotate-6", "rotate-0", "rotate-6"];

  return (
    <Link
      href={entry.href}
      className="group w-full min-w-0 flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:border-accent/60 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <div className={`relative h-44 bg-gradient-to-br ${tone.soft} via-surface-raised to-surface overflow-hidden`}>
        {/* faint dotted texture */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.35]"
          style={{ backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)", backgroundSize: "14px 14px", color: "var(--border)" }}
        />
        <span
          className={`absolute left-3 top-3 z-10 rounded-full bg-surface/90 backdrop-blur px-2.5 py-1 font-display text-[10px] uppercase tracking-[0.15em] ${tone.text} shadow-sm`}
        >
          {CATEGORY_LABEL[entry.category]}
        </span>
        {picks.length > 0 ? (
          <div className="absolute inset-0 flex items-center justify-center pt-4">
            {picks.map((p, i) => (
              <div
                key={p.name}
                className={`relative -mx-2 h-28 w-24 rounded-xl border border-border/70 bg-white shadow-md ${rotations[i]} transition-transform duration-300 ease-out group-hover:rotate-0 group-hover:-translate-y-1 motion-reduce:transition-none ${
                  i === 1 ? "z-10 scale-110" : ""
                }`}
              >
                {p.image ? (
                  <Image src={p.image} unoptimized={skipOptimizer(p.image)} alt={p.name} fill sizes="96px" loading="lazy" className="object-contain p-2" />
                ) : (
                  <PhotoPlaceholder category={entry.category} size="xs" />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center pt-4">
            <span className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-surface shadow-md ${tone.text}`}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z" strokeLinejoin="round" />
                <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <p className="text-lg font-semibold leading-snug transition-colors group-hover:text-accent">{entry.title}</p>
        <p className="flex-1 text-sm leading-6 text-muted">{entry.description}</p>
        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="text-muted">{count > 0 ? `${count} picks compared` : "Buying guide"}</span>
          <span className="inline-flex items-center gap-1 font-medium text-accent">
            Explore
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
