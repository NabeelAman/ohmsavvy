import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/lib/content";
import { skipOptimizer } from "@/lib/images";
import { ContentLinks } from "./ContentLinks";
import { Eyebrow } from "./ui/Eyebrow";

// Shared building blocks for "how-to" / explainer articles, extracted from the
// original how-to page design so every guide looks and reads the same.

const SITE = "https://ohmsavvy.com";

// Category landing pages redirect to their main roundup, so breadcrumbs link
// straight there instead of through a redirect.
const CATEGORY_HUB: Record<Category, { label: string; href: string }> = {
  multimeters: { label: "Multimeters", href: "/multimeters/best-multimeters" },
  "soldering-irons": { label: "Soldering Irons", href: "/soldering-irons/best-soldering-irons" },
  oscilloscopes: { label: "Oscilloscopes", href: "/oscilloscopes/best-beginner-oscilloscopes" },
};

export type TocEntry = { id: string; label: string };
export type FaqEntry = { q: string; a: string };

/** Page shell: breadcrumbs, eyebrow, H1, intro, optional product aside, contents, body, FAQ, next links, related content. */
export function HowToShell({
  title,
  description,
  intro,
  path,
  category,
  published,
  updated,
  aside,
  toc,
  faq,
  next,
  children,
}: {
  title: string;
  /** Same text as the page's meta description; used in the Article schema. */
  description: string;
  intro: React.ReactNode;
  path: string;
  category: Category;
  /** ISO date (YYYY-MM-DD). */
  published: string;
  updated?: string;
  aside?: { image?: string; alt: string; caption: React.ReactNode };
  /** Section list; each id must match an h2 id on the page. */
  toc?: TocEntry[];
  faq?: FaqEntry[];
  next: { href: string; title: string; desc: string }[];
  children: React.ReactNode;
}) {
  const hub = CATEGORY_HUB[category];
  const url = `${SITE}${path}`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Article",
      headline: title,
      description,
      url,
      mainEntityOfPage: url,
      ...(aside?.image ? { image: [aside.image] } : {}),
      datePublished: published,
      dateModified: updated ?? published,
      author: { "@type": "Organization", name: "OhmSavvy Research Team", url: `${SITE}/about` },
      publisher: { "@type": "Organization", name: "OhmSavvy", url: SITE },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: hub.label, item: `${SITE}${hub.href}` },
        { "@type": "ListItem", position: 3, name: title, item: url },
      ],
    },
  ];
  if (faq?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    });
  }
  const jsonLd = { "@context": "https://schema.org", "@graph": graph };

  return (
    <>
      <article className="mx-auto max-w-4xl px-6 py-16">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
        <nav aria-label="Breadcrumb" className="mb-5 text-xs text-muted">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            </li>
            <li aria-hidden="true">›</li>
            <li>
              <Link href={hub.href} className="hover:text-accent transition-colors">{hub.label}</Link>
            </li>
            <li aria-hidden="true">›</li>
            <li aria-current="page" className="text-foreground">{title}</li>
          </ol>
        </nav>
        <Eyebrow>HOW-TO GUIDE</Eyebrow>
        <div className={`grid gap-8 items-start ${aside ? "sm:grid-cols-[1fr_260px]" : ""}`}>
          <div>
            <h1 className="text-3xl sm:text-4xl leading-tight">{title}</h1>
            <div className="mt-5 text-lg text-muted leading-7">{intro}</div>
            <p className="mt-4 text-xs text-muted">
              By the <Link href="/about" className="underline underline-offset-2 hover:text-accent">OhmSavvy Research Team</Link>
              {" · "}
              <time dateTime={updated ?? published}>Updated {formatDate(updated ?? published)}</time>
            </p>
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

        {toc?.length ? (
          <nav aria-label="In this guide" className="mt-10 rounded-lg border border-border bg-surface p-5">
            <p className="font-display text-xs uppercase tracking-wide text-accent mb-3">In this guide</p>
            <ol className="grid sm:grid-cols-2 gap-x-8 gap-y-1.5 text-sm">
              {[...toc, ...(faq?.length ? [{ id: "faq", label: "Frequently asked questions" }] : [])].map((t, i) => (
                <li key={t.id} className="flex gap-2">
                  <span className="font-mono text-xs text-muted pt-0.5 w-5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <a href={`#${t.id}`} className="text-muted hover:text-accent transition-colors">{t.label}</a>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <div className="mt-12 space-y-10 [&_h2]:scroll-mt-28">{children}</div>

        {faq?.length ? (
          <section className="mt-12 scroll-mt-28" id="faq">
            <h2 className="text-xl font-semibold mb-4">Frequently asked questions</h2>
            <div className="divide-y divide-border rounded-lg border border-border">
              {faq.map((f) => (
                <div key={f.q} className="p-5">
                  <h3 className="font-medium">{f.q}</h3>
                  <p className="mt-2 text-muted leading-7">{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

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

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${months[m - 1]} ${d}, ${y}`;
}

/** Numbered step heading for sequential "how to" sections. */
export function StepHeading({ n, id, children }: { n: number; id?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="flex items-center gap-3 text-xl font-semibold mb-3">
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
 * Product photo cards linking to our reviews. Pass only products we have a
 * verified photo for; a missing image falls back to a plain name tile.
 */
export function ProductStrip({
  title,
  items,
}: {
  title: string;
  items: { name: string; image?: string; alt: string; href: string; note: string }[];
}) {
  return (
    <div>
      <p className="font-display text-xs uppercase tracking-wide text-accent mb-3">{title}</p>
      <div className={`grid gap-4 ${items.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
        {items.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="group rounded-lg border border-border bg-surface-raised shadow-sm overflow-hidden hover:border-accent transition-colors"
          >
            <div className="relative h-36 bg-surface">
              {p.image ? (
                <Image
                  src={p.image}
                  unoptimized={skipOptimizer(p.image)}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 640px) 260px, 100vw"
                  className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center font-display text-sm text-muted">{p.name}</div>
              )}
            </div>
            <div className="p-4 border-t border-border">
              <p className="font-medium text-sm group-hover:text-accent transition-colors">{p.name}</p>
              <p className="mt-1 text-xs text-muted leading-5">{p.note}</p>
              <p className="mt-2 text-xs font-medium text-accent">Read the review →</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/** Left-to-right process/signal-flow diagram; stacks vertically on phones. */
export function FlowDiagram({ steps }: { steps: { label: string; sub: string }[] }) {
  return (
    <ol className="flex flex-col sm:flex-row items-stretch gap-2">
      {steps.map((s, i) => (
        <li key={s.label} className="flex flex-col sm:flex-row items-center gap-2 flex-1 min-w-0">
          <div className="w-full flex-1 rounded-lg border border-border bg-surface p-3 text-center">
            <p className="font-mono text-[10px] text-accent">{String(i + 1).padStart(2, "0")}</p>
            <p className="font-display text-sm font-semibold leading-5">{s.label}</p>
            <p className="mt-1 text-xs text-muted leading-4">{s.sub}</p>
          </div>
          {i < steps.length - 1 && (
            <span aria-hidden="true" className="text-accent text-lg leading-none rotate-90 sm:rotate-0">
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

/**
 * Horizontal bar chart. `log` spaces values on a log10 scale, for quantities
 * that span several decades (bandwidth, sample rate, frequency).
 */
export function BarChart({
  items,
  log = false,
}: {
  items: { label: string; value: number; display: string; highlight?: boolean }[];
  log?: boolean;
}) {
  const vals = items.map((i) => (log ? Math.log10(i.value) : i.value));
  const max = Math.max(...vals);
  const min = log ? Math.min(...vals) - 0.5 : 0;
  return (
    <div className="space-y-3">
      {items.map((it, k) => {
        const pct = Math.max(4, ((vals[k] - min) / (max - min)) * 100);
        return (
          <div key={it.label} className="grid grid-cols-[minmax(0,9rem)_1fr] sm:grid-cols-[12rem_1fr] items-center gap-3">
            <span className="text-xs sm:text-sm leading-5">{it.label}</span>
            <div className="flex items-center gap-2 min-w-0">
              <div
                className={`h-5 rounded ${it.highlight ? "bg-accent" : "bg-accent/40"}`}
                style={{ width: `${pct * 0.78}%` }}
              />
              <span className="font-mono text-xs text-muted whitespace-nowrap">{it.display}</span>
            </div>
          </div>
        );
      })}
      {log && <p className="text-[11px] text-muted">Bars use a logarithmic scale: each step is ten times the last.</p>}
    </div>
  );
}

/**
 * Frequency response of a scope's front end: displayed amplitude vs signal
 * frequency as a fraction of rated bandwidth. Draws the two common textbook
 * models (single-pole and Gaussian); both pass through 70.7% at 1x bandwidth.
 */
export function ResponseChart() {
  const W = 320;
  const H = 200;
  const L = 40;
  const T = 12;
  const pw = W - L - 12;
  const ph = H - T - 34;
  // x axis: log10(f/BW) from -1 (0.1x) to log10(3) (3x)
  const xMin = -1;
  const xMax = Math.log10(3);
  const yMin = 30;
  const X = (r: number) => L + ((Math.log10(r) - xMin) / (xMax - xMin)) * pw;
  const Y = (pct: number) => T + ((100 - pct) / (100 - yMin)) * ph;
  const single = (r: number) => 100 / Math.sqrt(1 + r * r);
  const gauss = (r: number) => 100 * Math.exp(-(Math.LN2 / 2) * r * r);
  const path = (fn: (r: number) => number) =>
    Array.from({ length: 121 }, (_, i) => {
      const r = 10 ** (xMin + ((xMax - xMin) * i) / 120);
      return `${i ? "L" : "M"}${X(r).toFixed(1)},${Y(Math.max(yMin, fn(r))).toFixed(1)}`;
    }).join(" ");
  const ticks = [0.1, 0.2, 0.33, 0.5, 1, 2, 3];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Chart of displayed amplitude versus signal frequency relative to scope bandwidth">
      {[100, 90, 70.7, 50, 30].map((p) => (
        <g key={p}>
          <line x1={L} x2={L + pw} y1={Y(p)} y2={Y(p)} className="stroke-border" strokeWidth={p === 70.7 ? 1 : 0.6} strokeDasharray={p === 70.7 ? "4 3" : "2 3"} />
          <text x={L - 5} y={Y(p) + 3} fontSize="9" textAnchor="end" className="fill-muted">{p}%</text>
        </g>
      ))}
      {ticks.map((t) => (
        <g key={t}>
          <line x1={X(t)} x2={X(t)} y1={T} y2={T + ph} className="stroke-border" strokeWidth={t === 1 ? 1 : 0.5} strokeDasharray="2 3" />
          <text x={X(t)} y={T + ph + 13} fontSize="9" textAnchor="middle" className="fill-muted">{t === 0.33 ? "⅓" : t}×</text>
        </g>
      ))}
      <text x={L + pw / 2} y={H - 4} fontSize="9" textAnchor="middle" className="fill-muted">Signal frequency ÷ scope bandwidth</text>
      <path d={path(single)} fill="none" className="stroke-accent" strokeWidth="2" />
      <path d={path(gauss)} fill="none" className="stroke-foreground" strokeWidth="1.5" strokeDasharray="5 3" />
      <circle cx={X(1)} cy={Y(70.7)} r="3.5" className="fill-accent" />
      <text x={X(1) + 6} y={Y(70.7) - 6} fontSize="10" className="fill-foreground">−3 dB = 70.7%</text>
      <g fontSize="9">
        <line x1={L + 8} x2={L + 24} y1={Y(48)} y2={Y(48)} className="stroke-accent" strokeWidth="2" />
        <text x={L + 28} y={Y(48) + 3} className="fill-muted">Single-pole model</text>
        <line x1={L + 8} x2={L + 24} y1={Y(40)} y2={Y(40)} className="stroke-foreground" strokeWidth="1.5" strokeDasharray="5 3" />
        <text x={L + 28} y={Y(40) + 3} className="fill-muted">Gaussian model</text>
      </g>
    </svg>
  );
}

/**
 * Sampling on a scope-style screen: the real signal (faint), the sample points,
 * and the straight-line trace a scope would draw through them. With too few
 * samples per cycle the joined dots form a false, slower wave (aliasing).
 */
export function SamplingChart({ cycles, samples, label }: { cycles: number; samples: number; label?: string }) {
  const W = 300;
  const H = 160;
  const A = 55;
  const cy = H / 2;
  const sig = (t: number) => cy - A * Math.sin(2 * Math.PI * cycles * t);
  const truePts = Array.from({ length: 601 }, (_, i) => `${((i / 600) * W).toFixed(1)},${sig(i / 600).toFixed(1)}`).join(" ");
  const dots = Array.from({ length: samples + 1 }, (_, i) => ({ x: (i / samples) * W, y: sig(i / samples) }));
  return (
    <svg viewBox={`-6 -6 ${W + 12} ${H + 12}`} className="w-full h-auto" role="img" aria-label={label ?? "Sample points on a waveform"}>
      <rect x="0" y="0" width={W} height={H} rx="4" className="fill-[#0f1a14]" />
      {Array.from({ length: 11 }, (_, i) => (
        <line key={i} x1={(i * W) / 10} y1="0" x2={(i * W) / 10} y2={H} stroke="#2c4a3a" strokeWidth="0.6" strokeDasharray="2 3" />
      ))}
      <line x1="0" y1={cy} x2={W} y2={cy} stroke="#2c4a3a" strokeWidth="1" />
      <polyline points={truePts} fill="none" stroke="#7CFC9A" strokeOpacity="0.3" strokeWidth="1.5" />
      <polyline points={dots.map((d) => `${d.x.toFixed(1)},${d.y.toFixed(1)}`).join(" ")} fill="none" stroke="#ffd56b" strokeWidth="1.6" />
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="2.6" fill="#ffd56b" />
      ))}
      <text x="6" y={H - 8} fontSize="10" fill="#9fe3b4">real signal (faint) · samples + displayed trace (yellow)</text>
    </svg>
  );
}

/** Schematic of a 10x passive probe: 9 MΩ tip resistor with adjustable compensation capacitor, into the scope's 1 MΩ input. */
export function ProbeDiagram() {
  return (
    <svg viewBox="0 0 340 170" className="w-full h-auto" role="img" aria-label="Schematic of a 10x passive probe and scope input">
      <g className="stroke-foreground" strokeWidth="1.5" fill="none">
        {/* tip */}
        <circle cx="18" cy="60" r="5" className="fill-accent stroke-accent" />
        <line x1="23" y1="60" x2="60" y2="60" />
        {/* parallel R and C in probe */}
        <line x1="60" y1="30" x2="60" y2="95" />
        <line x1="140" y1="30" x2="140" y2="95" />
        <path d="M60 30 H78 l4 -7 l8 14 l8 -14 l8 14 l8 -14 l4 7 H140" />
        <path d="M60 95 H95 M95 84 V106 M105 84 V106 M105 95 H140" />
        <line x1="88" y1="114" x2="114" y2="76" className="stroke-accent" />
        <path d="M114 76 l-7 2 M114 76 l-1 7" className="stroke-accent" />
        {/* cable */}
        <line x1="140" y1="60" x2="220" y2="60" strokeDasharray="6 3" />
        {/* scope input */}
        <rect x="220" y="18" width="112" height="140" rx="6" className="stroke-border" />
        <line x1="220" y1="60" x2="250" y2="60" />
        <line x1="250" y1="60" x2="250" y2="70" />
        <line x1="310" y1="60" x2="250" y2="60" />
        <line x1="310" y1="60" x2="310" y2="70" />
        <path d="M250 70 l-6 4 l12 6 l-12 6 l12 6 l-12 6 l6 4 V120" />
        <path d="M310 70 V92 M299 92 H321 M299 100 H321 M310 100 V120" />
        <line x1="240" y1="120" x2="320" y2="120" />
        <path d="M272 120 V132 M262 132 H282 M266 137 H278 M270 142 H274" />
      </g>
      <g fontSize="10" className="fill-foreground">
        <text x="18" y="48" textAnchor="middle">Tip</text>
        <text x="100" y="18" textAnchor="middle">9 MΩ</text>
        <text x="100" y="128" textAnchor="middle" className="fill-accent">adjustable C</text>
        <text x="180" y="52" textAnchor="middle" className="fill-muted">cable</text>
        <text x="276" y="34" textAnchor="middle" className="fill-muted">Scope input</text>
        <text x="236" y="97" textAnchor="end">1 MΩ</text>
        <text x="326" y="99" textAnchor="start" fontSize="9" className="fill-muted">C</text>
      </g>
      <text x="170" y="165" fontSize="9" textAnchor="middle" className="fill-muted">9 MΩ + 1 MΩ divides the signal by 10; the trimmer matches the capacitive divider to it</text>
    </svg>
  );
}

/** Generic digital oscilloscope front panel, labelled by control group. Layout varies by model. */
export function FrontPanel() {
  const knob = (x: number, y: number, r = 11) => (
    <g>
      <circle cx={x} cy={y} r={r} className="fill-surface stroke-foreground" strokeWidth="1.3" />
      <line x1={x} y1={y} x2={x} y2={y - r + 3} className="stroke-foreground" strokeWidth="1.3" />
    </g>
  );
  return (
    <svg viewBox="0 0 360 210" className="w-full h-auto" role="img" aria-label="Labelled diagram of a typical digital oscilloscope front panel">
      <rect x="2" y="2" width="356" height="206" rx="10" className="fill-surface stroke-border" strokeWidth="1.5" />
      {/* screen */}
      <rect x="14" y="14" width="180" height="130" rx="4" className="fill-[#0f1a14]" />
      {Array.from({ length: 11 }, (_, i) => (
        <line key={`v${i}`} x1={14 + i * 18} y1="14" x2={14 + i * 18} y2="144" stroke="#2c4a3a" strokeWidth="0.5" />
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <line key={`h${i}`} x1="14" y1={14 + i * 16.25} x2="194" y2={14 + i * 16.25} stroke="#2c4a3a" strokeWidth="0.5" />
      ))}
      <polyline
        fill="none"
        stroke="#7CFC9A"
        strokeWidth="1.6"
        points={Array.from({ length: 121 }, (_, i) => `${(14 + i * 1.5).toFixed(1)},${(79 - 34 * Math.sin((i / 120) * 4 * Math.PI)).toFixed(1)}`).join(" ")}
      />
      {/* control groups */}
      <g fontSize="8.5" className="fill-muted" textAnchor="middle">
        <rect x="206" y="14" width="44" height="74" rx="4" className="fill-none stroke-border" />
        <text x="228" y="26">VERTICAL</text>
        <text x="228" y="80">V/div</text>
        <rect x="256" y="14" width="44" height="74" rx="4" className="fill-none stroke-border" />
        <text x="278" y="26">HORIZ.</text>
        <text x="278" y="80">time/div</text>
        <rect x="306" y="14" width="44" height="74" rx="4" className="fill-none stroke-border" />
        <text x="328" y="26">TRIGGER</text>
        <text x="328" y="80">level</text>
      </g>
      {knob(228, 52, 13)}
      {knob(278, 52, 13)}
      {knob(328, 52, 13)}
      {/* buttons */}
      <g fontSize="8" textAnchor="middle">
        {[
          ["Auto", 228],
          ["Run/Stop", 278],
          ["Single", 328],
        ].map(([t, x]) => (
          <g key={t as string}>
            <rect x={(x as number) - 21} y="98" width="42" height="16" rx="3" className="fill-accent/15 stroke-accent" strokeWidth="1" />
            <text x={x as number} y="109" className="fill-foreground">{t}</text>
          </g>
        ))}
      </g>
      {/* inputs */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <circle cx={30 + i * 40} cy="176" r="10" className="fill-surface-raised stroke-foreground" strokeWidth="1.3" />
          <circle cx={30 + i * 40} cy="176" r="3.5" className="fill-foreground" />
          <text x={30 + i * 40} y="200" fontSize="8.5" textAnchor="middle" className="fill-muted">CH{i + 1}</text>
        </g>
      ))}
      <g>
        <rect x="216" y="166" width="8" height="16" rx="1" className="fill-accent" />
        <path d="M236 182 V170 H244 V182 H252 V170" className="stroke-foreground fill-none" strokeWidth="1.2" />
        <text x="236" y="200" fontSize="8.5" textAnchor="middle" className="fill-muted">probe comp</text>
      </g>
      <text x="310" y="180" fontSize="8.5" textAnchor="middle" className="fill-muted">menus / measure</text>
      <rect x="282" y="186" width="56" height="8" rx="2" className="fill-none stroke-border" />
    </svg>
  );
}

/** A multimeter-style LCD readout, for side-by-side comparisons with a ScopeScreen. */
export function MeterReadout({ value, unit, mode }: { value: string; unit: string; mode: string }) {
  return (
    <svg viewBox="0 0 300 240" className="w-full h-auto" role="img" aria-label={`Multimeter display reading ${value} ${unit}`}>
      <rect x="20" y="10" width="260" height="220" rx="22" className="fill-[#f0b429]" />
      <rect x="44" y="34" width="212" height="96" rx="6" fill="#c9d4b8" />
      <text x="236" y="104" fontSize="44" textAnchor="end" fill="#1a1d21" fontFamily="ui-monospace, monospace">{value}</text>
      <text x="236" y="122" fontSize="13" textAnchor="end" fill="#1a1d21">{unit}</text>
      <text x="56" y="54" fontSize="11" fill="#1a1d21">{mode}</text>
      <circle cx="150" cy="182" r="30" fill="#2a2d31" />
      <line x1="150" y1="182" x2="150" y2="158" stroke="#f0b429" strokeWidth="4" strokeLinecap="round" />
    </svg>
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
