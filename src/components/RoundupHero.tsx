import Image from "next/image";
import Link from "next/link";
import { content, type Category } from "@/lib/content";
import { productImageSrc, skipOptimizer } from "@/lib/images";
import type { Pick } from "./ReviewArticle";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Stars } from "./ui/Stars";
import { PhotoPlaceholder } from "./PhotoPlaceholder";

const SITE = "https://ohmsavvy.com";

const TONE: Record<Category, { text: string; bg: string; chip: string }> = {
  multimeters: { text: "text-cat-multimeters", bg: "bg-cat-multimeters", chip: "border-cat-multimeters/40" },
  "soldering-irons": { text: "text-cat-soldering", bg: "bg-cat-soldering", chip: "border-cat-soldering/40" },
  oscilloscopes: { text: "text-cat-oscilloscopes", bg: "bg-cat-oscilloscopes", chip: "border-cat-oscilloscopes/40" },
};

const slug = (name: string) => name.toLowerCase().replace(/\s+/g, "-");
const reviewHrefFor = (name: string) => content.find((e) => e.type === "review" && e.title === `${name} Review`)?.href;

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${months[m - 1]} ${d}, ${y}`;
}

/**
 * Header for a category's main "best of" roundup: breadcrumbs, H1, byline with
 * update date, the #1 pick with its buy button above the fold, quick jumps to
 * each pick by award, and links into the rest of the category (use-case
 * guides, buying guide, how-to, reviews, comparisons).
 */
export function RoundupHero({
  category,
  label,
  path,
  heading,
  description,
  updated,
  picks,
}: {
  category: Category;
  label: string;
  path: string;
  heading: string;
  description: string;
  /** ISO date (YYYY-MM-DD) the roundup was last reviewed. */
  updated: string;
  picks: Pick[];
}) {
  const tone = TONE[category];
  const top = picks[0];
  const topReview = reviewHrefFor(top.name);
  const tested = picks.filter((p) => p.handsOnTested).length;
  const inCategory = content.filter((e) => e.category === category);
  const useCases = inCategory.filter((e) => e.type === "use-case-guide");
  const buying = inCategory.filter((e) => e.type === "buying-guide");
  const howTos = inCategory.filter((e) => e.type === "how-to-guide");
  const howTo = howTos.find((e) => e.title.startsWith("How to Use")) ?? howTos[0];
  const reviews = inCategory.filter((e) => e.type === "review").length;
  const comparisons = inCategory.filter((e) => e.type === "comparison").length;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: label, item: `${SITE}${path}` },
    ],
  };

  return (
    <section className="relative overflow-hidden border-b border-border bg-surface-raised">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd).replace(/</g, "\\u003c") }} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top_left,black_15%,transparent_65%)]"
        style={{
          backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      <div className={`absolute inset-x-0 top-0 h-1 ${tone.bg}`} />

      <div className="relative mx-auto max-w-6xl px-6 pt-8 pb-10">
        <nav aria-label="Breadcrumb" className="text-xs text-muted">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            </li>
            <li aria-hidden="true">›</li>
            <li aria-current="page" className="text-foreground">{label}</li>
          </ol>
        </nav>

        <div className="mt-6 grid lg:grid-cols-[1fr_380px] gap-10 items-start">
          <div>
            <p className={`font-display text-xs uppercase tracking-[0.2em] ${tone.text}`}>{label} · Buyer&apos;s guide</p>
            <h1 className="mt-3 text-4xl sm:text-5xl leading-[1.1]">{heading}</h1>
            <p className="mt-5 max-w-2xl text-lg text-muted leading-7">{description}</p>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <span className="inline-flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 font-display text-xs text-accent">OS</span>
                <span>
                  By{" "}
                  <Link prefetch={false} href="/about" className="font-medium hover:text-accent">
                    OhmSavvy Research Team
                  </Link>
                </span>
              </span>
              <span className="text-muted">
                Updated <time dateTime={updated}>{formatDate(updated)}</time>
              </span>
            </div>

            <dl className="mt-6 grid grid-cols-3 max-w-lg divide-x divide-border rounded-xl border border-border bg-surface">
              {[
                { v: picks.length, l: "models compared" },
                { v: tested, l: "hands-on tested" },
                { v: reviews, l: "in-depth reviews" },
              ].map((s) => (
                <div key={s.l} className="px-4 py-3">
                  <dt className="sr-only">{s.l}</dt>
                  <dd>
                    <span className="block font-display text-2xl font-semibold text-accent">{s.v}</span>
                    <span className="block text-xs text-muted">{s.l}</span>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-7">
              <p className="font-display text-xs uppercase tracking-wide text-muted mb-2">Jump to the pick for you</p>
              <div className="flex flex-wrap gap-2">
                {picks.map((p) => (
                  <a
                    key={p.name}
                    href={`#${slug(p.name)}`}
                    className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs transition-colors hover:border-accent"
                  >
                    <span className="text-muted group-hover:text-accent">{p.badge}:</span>
                    <span className="font-medium">{p.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <aside className="rounded-2xl border border-border bg-surface shadow-lg overflow-hidden lg:sticky lg:top-24">
            <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-surface-raised">
              <span className="font-display text-xs uppercase tracking-wide text-accent">#1 · Our top pick</span>
              <Stars rating={top.rating} />
            </div>
            <a href={`#${slug(top.name)}`} className="relative block h-52 bg-white">
              {top.image ? (
                <Image
                  src={productImageSrc(top.image, 380)}
                  unoptimized={skipOptimizer(top.image)}
                  alt={`${top.name}, our top ${label.toLowerCase()} pick`}
                  fill
                  priority
                  sizes="380px"
                  className="object-contain p-6"
                />
              ) : (
                <PhotoPlaceholder category={category} size="md" />
              )}
            </a>
            <div className="p-5 border-t border-border">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="signal">{top.badge}</Badge>
                {top.handsOnTested && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
                    ✓ Hands-on Tested
                  </span>
                )}
              </div>
              <p className="mt-3 text-xl font-semibold">{top.name}</p>
              <p className="mt-1.5 text-sm text-muted leading-6">{top.bottomLine}</p>
              <Button href={top.ctaHref} className="mt-4 w-full">Check price on Amazon →</Button>
              <div className="mt-1.5 flex justify-center gap-4 text-xs font-medium">
                <a href={`#${slug(top.name)}`} className="py-1.5 text-accent hover:underline">Why we picked it ↓</a>
                {topReview && (
                  <Link prefetch={false} href={topReview} className="py-1.5 text-muted hover:text-accent">Full review →</Link>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <div className="relative border-t border-border bg-surface/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-4 flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap">
          <span className="shrink-0 self-center font-display text-xs uppercase tracking-wide text-muted mr-1">Shop by job:</span>
          {useCases.map((g) => (
            <Link
              key={g.href}
              prefetch={false}
              href={g.href}
              className={`shrink-0 rounded-full border ${tone.chip} px-3 py-1 text-xs ${tone.text} hover:bg-surface-raised transition-colors`}
            >
              {g.title}
            </Link>
          ))}
          {buying.map((g) => (
            <Link prefetch={false} key={g.href} href={g.href} className="shrink-0 rounded-full border border-border px-3 py-1 text-xs text-muted hover:text-accent hover:border-accent transition-colors">
              {g.title}
            </Link>
          ))}
          {howTo && (
            <Link prefetch={false} href={howTo.href} className="shrink-0 rounded-full border border-border px-3 py-1 text-xs text-muted hover:text-accent hover:border-accent transition-colors">
              {howTo.title}
            </Link>
          )}
          <Link prefetch={false} href={`/${category}/reviews`} className="shrink-0 rounded-full border border-border px-3 py-1 text-xs text-muted hover:text-accent hover:border-accent transition-colors">
            All reviews ({reviews})
          </Link>
          {comparisons > 0 && (
            <Link prefetch={false} href={`/${category}/comparisons`} className="shrink-0 rounded-full border border-border px-3 py-1 text-xs text-muted hover:text-accent hover:border-accent transition-colors">
              Comparisons ({comparisons})
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
