import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/lib/content";
import { skipOptimizer } from "@/lib/images";
import { ContentLinks } from "./ContentLinks";
import { Eyebrow } from "./ui/Eyebrow";

// Shared building blocks for "how-to" / explainer articles, extracted from the
// original how-to page design so every guide looks and reads the same.

/** Page shell: eyebrow, H1, intro, optional product aside, body, next links, related content. */
export function HowToShell({
  title,
  intro,
  path,
  category,
  aside,
  next,
  children,
}: {
  title: string;
  intro: React.ReactNode;
  path: string;
  category: Category;
  aside?: { image?: string; alt: string; caption: React.ReactNode };
  next: { href: string; title: string; desc: string }[];
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    url: `https://ohmsavvy.com${path}`,
    author: { "@type": "Organization", name: "OhmSavvy Research Team", url: "https://ohmsavvy.com/about" },
    publisher: { "@type": "Organization", name: "OhmSavvy", url: "https://ohmsavvy.com" },
  };
  return (
    <>
      <article className="mx-auto max-w-4xl px-6 py-16">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
        <Eyebrow>HOW-TO GUIDE</Eyebrow>
        <div className={`grid gap-8 items-start ${aside ? "sm:grid-cols-[1fr_260px]" : ""}`}>
          <div>
            <h1 className="text-3xl sm:text-4xl leading-tight">{title}</h1>
            <div className="mt-5 text-lg text-muted leading-7">{intro}</div>
          </div>
          {aside && (
            <div className="rounded-lg border border-border bg-surface-raised shadow-sm overflow-hidden">
              <div className="h-1.5 bg-accent" />
              {aside.image ? (
                <div className="relative h-40 bg-surface">
                  <Image
                    src={aside.image}
                    unoptimized={skipOptimizer(aside.image)}
                    alt={aside.alt}
                    fill
                    sizes="260px"
                    priority
                    className="object-contain p-4"
                  />
                </div>
              ) : null}
              <div className="px-4 py-3 text-xs text-muted leading-5">{aside.caption}</div>
            </div>
          )}
        </div>

        <div className="mt-12 space-y-10">{children}</div>

        <section className="mt-12 pt-2">
          <h2 className="text-xl font-semibold mb-4">Where to go next</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {next.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="group rounded-lg border border-border bg-surface p-5 hover:border-accent transition-colors"
              >
                <p className="font-medium group-hover:text-accent transition-colors">{n.title} →</p>
                <p className="mt-1 text-sm text-muted leading-6">{n.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </article>
      <ContentLinks category={category} current={path} />
    </>
  );
}

/** Numbered step heading for sequential "how to" sections. */
export function StepHeading({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-3 text-xl font-semibold mb-3">
      <span className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-accent text-accent-foreground font-display text-sm">
        {n}
      </span>
      {children}
    </h2>
  );
}

/** Safety/warning callout, using the warm warn-bg token reserved for exactly this. */
export function Callout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-accent/30 bg-warn-bg p-5">
      <p className="flex items-center gap-2 font-display text-sm font-semibold text-accent mb-2">
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M10 2.5l8 14.5H2L10 2.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M10 8v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="10" cy="14.5" r="0.9" fill="currentColor" />
        </svg>
        {title}
      </p>
      <div className="text-muted leading-7">{children}</div>
    </div>
  );
}

/** Neutral "key idea" box for definitions and rules of thumb. */
export function KeyIdea({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border border-l-4 border-l-accent bg-surface p-5">
      <p className="font-display text-xs uppercase tracking-wide text-accent mb-2">{title}</p>
      <div className="text-muted leading-7">{children}</div>
    </div>
  );
}

/** Small labelled card grid (controls, symbols, concepts). */
export function InfoCards({ items }: { items: { label: string; desc: string }[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {items.map((i) => (
        <div key={i.label} className="rounded-lg border border-border bg-surface-raised shadow-sm p-4">
          <p className="font-display text-sm font-semibold">{i.label}</p>
          <p className="mt-1 text-xs text-muted leading-5">{i.desc}</p>
        </div>
      ))}
    </div>
  );
}

/** Simple data table in the site's table style. */
export function DataTable({ head, rows, mono = [] }: { head: string[]; rows: string[][]; mono?: number[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-surface-raised border-b border-border text-left">
            {head.map((h) => (
              <th key={h} className="py-2.5 px-4 font-display text-xs text-muted uppercase">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.join("|")} className="border-b border-border last:border-0">
              {r.map((c, i) => (
                <td key={i} className={`py-2.5 px-4 ${i === 0 ? "" : "text-muted"} ${mono.includes(i) ? "font-mono font-medium text-foreground" : ""}`}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Wrapper for an inline diagram with a caption. */
export function Figure({ caption, children }: { caption: React.ReactNode; children: React.ReactNode }) {
  return (
    <figure className="rounded-lg border border-border bg-surface-raised shadow-sm p-4">
      {children}
      <figcaption className="mt-3 text-xs text-muted leading-5 text-center">{caption}</figcaption>
    </figure>
  );
}

/**
 * An oscilloscope screen: 10 x 8 graticule with a waveform. `wave` picks a
 * built-in shape; `marks` draws labelled measurement arrows in division units
 * (x 0-10 from the left, y 0-8 from the top).
 */
export function ScopeScreen({
  wave = "sine",
  cycles = 2,
  amplitude = 3,
  offset = 0,
  marks = [],
  labels,
  triggerLevel,
}: {
  wave?: "sine" | "square" | "square-over" | "square-under" | "pulse" | "flat";
  cycles?: number;
  /** Peak amplitude in divisions. */
  amplitude?: number;
  /** Vertical offset of the trace centre, in divisions (positive = up). */
  offset?: number;
  marks?: { x1: number; y1: number; x2: number; y2: number; text: string }[];
  labels?: { left?: string; right?: string };
  triggerLevel?: number;
}) {
  const W = 300;
  const H = 240;
  const dx = W / 10;
  const dy = H / 8;
  const cy = H / 2 - offset * dy;
  const pts: string[] = [];
  const n = 400;
  for (let i = 0; i <= n; i++) {
    const t = i / n; // 0..1 across the screen
    const phase = (t * cycles) % 1;
    let v = 0;
    if (wave === "sine") v = Math.sin(2 * Math.PI * t * cycles);
    else if (wave === "flat") v = 0;
    else if (wave === "pulse") v = phase < 0.2 ? 1 : -1;
    else {
      v = phase < 0.5 ? 1 : -1;
      const since = phase < 0.5 ? phase : phase - 0.5; // time since last edge
      if (wave === "square-over") v += (phase < 0.5 ? 1 : -1) * 0.35 * Math.exp(-since * 40);
      if (wave === "square-under") v *= 1 - Math.exp(-since * 18);
    }
    pts.push(`${(t * W).toFixed(1)},${(cy - v * amplitude * dy).toFixed(1)}`);
  }
  return (
    <svg viewBox={`-6 -6 ${W + 12} ${H + 12}`} className="w-full h-auto" role="img" aria-label="Oscilloscope screen diagram">
      <rect x="0" y="0" width={W} height={H} rx="4" className="fill-[#0f1a14]" />
      {Array.from({ length: 11 }, (_, i) => (
        <line key={`v${i}`} x1={i * dx} y1="0" x2={i * dx} y2={H} stroke="#2c4a3a" strokeWidth={i === 5 ? 1.2 : 0.6} strokeDasharray={i === 5 ? "" : "2 3"} />
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <line key={`h${i}`} x1="0" y1={i * dy} x2={W} y2={i * dy} stroke="#2c4a3a" strokeWidth={i === 4 ? 1.2 : 0.6} strokeDasharray={i === 4 ? "" : "2 3"} />
      ))}
      {typeof triggerLevel === "number" && (
        <>
          <line x1="0" y1={H / 2 - triggerLevel * dy} x2={W} y2={H / 2 - triggerLevel * dy} stroke="#f0b429" strokeWidth="0.8" strokeDasharray="5 4" />
          <text x={W - 4} y={H / 2 - triggerLevel * dy - 4} textAnchor="end" fontSize="10" fill="#f0b429">T</text>
        </>
      )}
      <polyline points={pts.join(" ")} fill="none" stroke="#7CFC9A" strokeWidth="2" strokeLinejoin="round" />
      {marks.map((m) => (
        <g key={m.text}>
          <line x1={m.x1 * dx} y1={m.y1 * dy} x2={m.x2 * dx} y2={m.y2 * dy} stroke="#ffd56b" strokeWidth="1.4" markerStart="url(#arr)" markerEnd="url(#arr)" />
          <text x={((m.x1 + m.x2) / 2) * dx + (m.x1 === m.x2 ? 6 : 0)} y={((m.y1 + m.y2) / 2) * dy - (m.y1 === m.y2 ? 6 : 0)} fontSize="11" fill="#ffd56b" textAnchor={m.x1 === m.x2 ? "start" : "middle"}>
            {m.text}
          </text>
        </g>
      ))}
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill="#ffd56b" />
        </marker>
      </defs>
      {labels?.left && <text x="6" y={H - 8} fontSize="10" fill="#9fe3b4">{labels.left}</text>}
      {labels?.right && <text x={W - 6} y={H - 8} fontSize="10" fill="#9fe3b4" textAnchor="end">{labels.right}</text>}
    </svg>
  );
}
