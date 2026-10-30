import Image from "next/image";
import Link from "next/link";
import { getPicks, picksForEntry } from "@/lib/catalog";
import { content, type Category, type ContentEntry } from "@/lib/content";
import { productImageSrc, skipOptimizer } from "@/lib/images";
import { ContentCard } from "./ContentCard";
import { FaqAccordion } from "./FaqAccordion";
import { GuideCard } from "./GuideCard";
import { START_HERE } from "./GuideListing";
import { PhotoPlaceholder } from "./PhotoPlaceholder";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Eyebrow } from "./ui/Eyebrow";
import { Stars } from "./ui/Stars";

// Category landing page (/multimeters, /soldering-irons, /oscilloscopes): the
// parent of every review, comparison and guide in its category, so breadcrumbs
// and the header menu point here. Lists are built from content.ts, so a new
// page shows up on its hub without editing this file.

const SITE = "https://ohmsavvy.com";

const CATEGORY: Record<Category, { label: string; noun: string; text: string; bg: string; border: string; soft: string; roundup: { href: string; title: string } }> = {
  multimeters: {
    label: "Multimeters",
    noun: "multimeter",
    text: "text-cat-multimeters",
    bg: "bg-cat-multimeters",
    border: "border-cat-multimeters",
    soft: "from-cat-multimeters/15",
    roundup: { href: "/multimeters/best-multimeters", title: "Best Multimeters" },
  },
  "soldering-irons": {
    label: "Soldering Irons",
    noun: "soldering iron",
    text: "text-cat-soldering",
    bg: "bg-cat-soldering",
    border: "border-cat-soldering",
    soft: "from-cat-soldering/15",
    roundup: { href: "/soldering-irons/best-soldering-irons", title: "Best Soldering Irons" },
  },
  oscilloscopes: {
    label: "Oscilloscopes",
    noun: "oscilloscope",
    text: "text-cat-oscilloscopes",
    bg: "bg-cat-oscilloscopes",
    border: "border-cat-oscilloscopes",
    soft: "from-cat-oscilloscopes/15",
    roundup: { href: "/oscilloscopes/best-beginner-oscilloscopes", title: "Best Beginner Oscilloscopes" },
  },
};

const TOP_PICKS = 6;
const USE_CASE_CARDS = 6;
const COMPARISON_CARDS = 6;
const COMPARISON_LINKS = 30;
const GUIDE_LINKS = 12;

/** Roundup anchors use the same slug as ReviewArticle: "Fluke 17B+" -> "fluke-17b+". */
const anchorOf = (name: string) => name.toLowerCase().replace(/\s+/g, "-");
const reviewHrefFor = (name: string) => content.find((e) => e.type === "review" && e.title === `${name} Review`)?.href;

/** How-tos split by search intent: measuring/testing, fixing a fault, and explainers. */
function groupHowTos(entries: ContentEntry[]) {
  const howTo = entries.filter((e) => /^how to /i.test(e.title));
  const fix = entries.filter(
    (e) =>
      !/^how to /i.test(e.title) &&
      /^(why|what causes|diagnosing)|\b(won't|doesn't|isn't|not|no|keeps?|no-crank|reads|only|fault|unstable)\b/i.test(e.title),
  );
  const explain = entries.filter((e) => !howTo.includes(e) && !fix.includes(e));
  return { howTo, fix, explain };
}

function SectionHead({ id, eyebrow, title, intro, link }: { id: string; eyebrow: string; title: string; intro?: React.ReactNode; link?: { href: string; label: string } }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
      <div className="max-w-3xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={id} className="scroll-mt-28 text-2xl sm:text-3xl font-semibold leading-tight">
          {title}
        </h2>
        {intro && <p className="mt-2 text-muted leading-7">{intro}</p>}
      </div>
      {link && (
        <Link prefetch={false} href={link.href} className="py-1 text-sm font-medium text-accent hover:underline">
          {link.label} →
        </Link>
      )}
    </div>
  );
}

function LinkColumn({ title, entries, more }: { title: string; entries: ContentEntry[]; more: { href: string; count: number } }) {
  if (entries.length === 0) return null;
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-surface p-5 shadow-sm">
      <h3 className="font-semibold">{title}</h3>
      <ul className="mt-3 flex-1 divide-y divide-border">
        {entries.slice(0, GUIDE_LINKS).map((g) => (
          <li key={g.href}>
            <Link prefetch={false} href={g.href} className="group flex items-start justify-between gap-3 py-2.5 text-sm">
              <span className="group-hover:text-accent transition-colors">{g.title}</span>
              <span className="text-muted" aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>
      {entries.length > GUIDE_LINKS && (
        <Link prefetch={false} href={more.href} className="mt-3 py-1 text-sm font-medium text-accent hover:underline">
          See all {entries.length} →
        </Link>
      )}
    </div>
  );
}

export function CategoryHub({
  category,
  path,
  heading,
  intro,
  criteria,
  faqs,
}: {
  category: Category;
  path: string;
  heading: string;
  /** Two or three short paragraphs: answer first, then what the hub covers. */
  intro: React.ReactNode[];
  /** "How to choose" points: the specs that decide a purchase in this category. */
  criteria: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
}) {
  const c = CATEGORY[category];
  const inCat = content.filter((e) => e.category === category);
  // Pages about products Amazon no longer sells stay listed, but after the current ones.
  const retiredLast = (list: ContentEntry[]) => {
    const retired = (e: ContentEntry) => picksForEntry(e).some((p) => p.unavailable);
    return [...list.filter((e) => !retired(e)), ...list.filter(retired)];
  };
  const reviews = retiredLast(inCat.filter((e) => e.type === "review"));
  const comparisons = retiredLast(inCat.filter((e) => e.type === "comparison"));
  const useCases = inCat.filter((e) => e.type === "use-case-guide");
  const buying = inCat.filter((e) => e.type === "buying-guide");
  const start = inCat.find((e) => e.href === START_HERE[category]);
  const { howTo, fix, explain } = groupHowTos(inCat.filter((e) => e.type === "how-to-guide" && e.href !== START_HERE[category]));
  const guideCount = inCat.length - reviews.length - comparisons.length;

  const picks = getPicks(category)
    .filter((p) => !p.unavailable)
    .slice(0, TOP_PICKS)
    .map((p) => {
      const review = reviewHrefFor(p.name);
      return {
        ...p,
        bestFor: p.specs.find((s) => s.label === "Best for")?.value,
        href: review ?? `${c.roundup.href}#${anchorOf(p.name)}`,
        linkLabel: review ? "Read review" : "See in roundup",
      };
    });

  const toc = [
    { id: "top-picks", label: "Top picks" },
    { id: "by-job", label: "Best for your job" },
    { id: "how-to-choose", label: "How to choose" },
    { id: "reviews", label: "Reviews" },
    { id: "comparisons", label: "Comparisons" },
    { id: "guides", label: "Guides" },
    { id: "faq", label: "FAQ" },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: heading,
      url: `${SITE}${path}`,
      isPartOf: { "@type": "WebSite", name: "OhmSavvy", url: SITE },
      mainEntity: {
        "@type": "ItemList",
        name: `Top ${c.noun} picks`,
        itemListElement: picks.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, url: `${SITE}${p.href}` })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: c.label, item: `${SITE}${path}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-surface-raised">
        <div className={`absolute top-0 inset-x-0 h-1 ${c.bg}`} />
        <div className="relative mx-auto max-w-6xl px-6 pt-8 pb-10 sm:pt-12">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-muted">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">Home</Link>
              </li>
              <li aria-hidden="true">›</li>
              <li aria-current="page" className="text-foreground">{c.label}</li>
            </ol>
          </nav>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <div>
              <Eyebrow className={c.text}>{c.label.toUpperCase()} · REVIEWS, COMPARISONS AND GUIDES</Eyebrow>
              <h1 className="text-3xl sm:text-5xl leading-[1.1]">{heading}</h1>
              <div className="mt-5 max-w-3xl space-y-4 text-base sm:text-lg text-muted leading-7">
                {intro.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={c.roundup.href}>{c.roundup.title}: ranked</Button>
                {start && (
                  <Link
                    prefetch={false}
                    href={start.href}
                    className="inline-flex items-center rounded-md border border-border px-5 py-2.5 text-sm font-medium hover:border-accent hover:text-accent transition-colors"
                  >
                    New to it? {start.title}
                  </Link>
                )}
              </div>
            </div>
            <dl className="grid grid-cols-3 gap-3 lg:grid-cols-1">
              {[
                { value: reviews.length, label: "in-depth reviews", href: `/${category}/reviews` },
                { value: comparisons.length, label: "head-to-head comparisons", href: `/${category}/comparisons` },
                { value: guideCount, label: "buying and how-to guides", href: `/${category}/guides` },
              ].map((s) => (
                <Link
                  prefetch={false}
                  key={s.label}
                  href={s.href}
                  className="rounded-xl border border-border bg-surface p-3 sm:p-4 hover:border-accent transition-colors"
                >
                  <dt className="order-2 text-xs text-muted leading-4">{s.label}</dt>
                  <dd className={`font-display text-2xl font-semibold ${c.text}`}>{s.value}</dd>
                </Link>
              ))}
            </dl>
          </div>
          <nav aria-label="On this page" className="mt-8 -mx-6 px-6 flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap">
            {toc.map((t) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                className="shrink-0 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted hover:border-accent hover:text-accent transition-colors"
              >
                {t.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Top picks */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <SectionHead
          id="top-picks"
          eyebrow="OUR TOP PICKS"
          title={`The ${c.noun}s we recommend first`}
          intro={
            <>
              The top of our ranked roundup. A <strong className="text-foreground">Hands-on Tested</strong> badge means we bought and tested that
              exact unit; every other pick is spec-verified research.
            </>
          }
          link={{ href: c.roundup.href, label: `Full ${c.roundup.title.toLowerCase()} list` }}
        />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {picks.map((p, i) => (
            <li key={p.name} className="flex min-w-0 flex-col rounded-2xl border border-border bg-surface shadow-sm overflow-hidden">
              <Link prefetch={false} href={p.href} className={`relative block h-40 bg-gradient-to-b ${c.soft} to-transparent`}>
                <span className="absolute left-3 top-3 z-10 rounded-full bg-surface px-2 py-0.5 font-mono text-xs shadow-sm">#{i + 1}</span>
                {p.image ? (
                  <Image
                    src={productImageSrc(p.image, 240)}
                    unoptimized={skipOptimizer(p.image)}
                    alt={p.name}
                    fill
                    sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
                    className="object-contain p-5"
                  />
                ) : (
                  <PhotoPlaceholder category={category} size="sm" />
                )}
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="signal">{p.badge}</Badge>
                  {p.handsOnTested && <Badge variant="accent">Hands-on Tested</Badge>}
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-snug">
                  <Link prefetch={false} href={p.href} className="hover:text-accent transition-colors">
                    {p.name}
                  </Link>
                </h3>
                <div className="mt-1">
                  <Stars rating={p.rating} />
                </div>
                <p className="mt-2 flex-1 text-sm text-muted leading-6">{p.bottomLine}</p>
                {p.bestFor && (
                  <p className="mt-3 text-xs text-muted">
                    <span className="font-medium text-foreground">Best for:</span> {p.bestFor}
                  </p>
                )}
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Button href={p.ctaHref} className="px-3! py-1.5! text-xs!">Check price on Amazon</Button>
                  <Link prefetch={false} href={p.href} className="py-1.5 text-xs font-medium text-muted hover:text-accent">
                    {p.linkLabel}
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* By job */}
      {useCases.length + buying.length > 0 && (
        <section className="border-t border-border bg-surface-raised">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <SectionHead
              id="by-job"
              eyebrow="BEST FOR YOUR JOB"
              title={`Best ${c.noun}s by job and budget`}
              intro="Start from what you'll actually use it for. Each list ranks verified picks for that one job."
              link={{ href: `/${category}/guides`, label: "All guides" }}
            />
            {useCases.length > 0 && (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {useCases.slice(0, USE_CASE_CARDS).map((e) => (
                  <div key={e.href} className="flex min-w-0">
                    <GuideCard entry={e} />
                  </div>
                ))}
              </div>
            )}
            {useCases.length > USE_CASE_CARDS && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {useCases.slice(USE_CASE_CARDS).map((e) => (
                  <li key={e.href}>
                    <Link
                      prefetch={false}
                      href={e.href}
                      className="inline-block rounded-full border border-border bg-surface px-3 py-1.5 text-sm hover:border-accent hover:text-accent transition-colors"
                    >
                      {e.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {buying.length > 0 && (
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {buying.map((g) => (
                  <li key={g.href}>
                    <Link
                      prefetch={false}
                      href={g.href}
                      className="group flex h-full items-start gap-3 rounded-xl border border-border bg-surface p-4 hover:border-accent transition-colors"
                    >
                      <span className="mt-0.5 rounded bg-signal-bg px-1.5 py-0.5 font-display text-xs uppercase text-signal">Buying guide</span>
                      <span className="min-w-0">
                        <span className="block font-medium leading-snug group-hover:text-accent transition-colors">{g.title}</span>
                        <span className="mt-1 block text-sm text-muted leading-5">{g.description}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {/* How to choose */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <SectionHead
          id="how-to-choose"
          eyebrow="HOW TO CHOOSE"
          title={`What matters when you buy a ${c.noun}`}
          intro="The specs that decide whether a tool suits your work, in the order we weigh them."
        />
        <ol className="grid gap-5 sm:grid-cols-2">
          {criteria.map((k, i) => (
            <li key={k.title} className="rounded-2xl border border-border bg-surface-raised p-6 shadow-sm">
              <div className="flex items-baseline gap-3">
                <span className={`font-mono text-sm ${c.text}`}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-semibold">{k.title}</h3>
              </div>
              <p className="mt-2 text-sm text-muted leading-6">{k.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Reviews */}
      {reviews.length > 0 && (
        <section className="border-t border-border bg-surface-raised">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <SectionHead
              id="reviews"
              eyebrow="IN-DEPTH REVIEWS"
              title={`${c.label.replace(/s$/, "")} reviews`}
              intro="One product per page: verified specs, strengths, limits and who should buy it."
              link={{ href: `/${category}/reviews`, label: `All ${reviews.length} reviews` }}
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((e) => (
                <ContentCard key={e.href} entry={e} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Comparisons */}
      {comparisons.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-14">
          <SectionHead
            id="comparisons"
            eyebrow="HEAD TO HEAD"
            title={`${c.label.replace(/s$/, "")} comparisons`}
            intro="Two close rivals, spec by spec, with a clear answer on which one to buy for your work."
            link={{ href: `/${category}/comparisons`, label: `All ${comparisons.length} comparisons` }}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {comparisons.slice(0, COMPARISON_CARDS).map((e) => (
              <ContentCard key={e.href} entry={e} />
            ))}
          </div>
          {comparisons.length > COMPARISON_CARDS && (
            <ul className="mt-6 grid gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
              {comparisons.slice(COMPARISON_CARDS, COMPARISON_CARDS + COMPARISON_LINKS).map((e) => (
                <li key={e.href} className="border-b border-border">
                  <Link prefetch={false} href={e.href} className="group flex items-center justify-between gap-3 py-2.5 text-sm">
                    <span className="group-hover:text-accent transition-colors">{e.title}</span>
                    <span className="text-muted" aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* Guides */}
      <section className="border-t border-border bg-surface-raised">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <SectionHead
            id="guides"
            eyebrow="LEARN AND TROUBLESHOOT"
            title={`${c.label.replace(/s$/, "")} guides and troubleshooting`}
            intro="Step-by-step measurements, fixes for the faults people actually hit, and the specs explained in plain English."
            link={{ href: `/${category}/guides`, label: `All ${guideCount} guides` }}
          />
          {start && (
            <Link
              prefetch={false}
              href={start.href}
              className="group mb-6 flex flex-col gap-3 rounded-2xl border-2 border-accent/40 bg-surface p-6 shadow-sm hover:border-accent transition-colors sm:flex-row sm:items-center sm:justify-between"
            >
              <span>
                <span className={`font-display text-xs uppercase tracking-wide ${c.text}`}>Start here</span>
                <span className="mt-1 block text-lg font-semibold group-hover:text-accent transition-colors">{start.title}</span>
                <span className="mt-1 block text-sm text-muted">{start.description}</span>
              </span>
              <span className="shrink-0 text-sm font-medium text-accent">Read the guide →</span>
            </Link>
          )}
          <div className="grid gap-5 lg:grid-cols-3">
            <LinkColumn title="How to measure and test" entries={howTo} more={{ href: `/${category}/guides`, count: howTo.length }} />
            <LinkColumn title="Troubleshooting" entries={fix} more={{ href: `/${category}/guides`, count: fix.length }} />
            <LinkColumn title="Specs and concepts explained" entries={explain} more={{ href: `/${category}/guides`, count: explain.length }} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-6 py-14 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <Eyebrow>FAQ</Eyebrow>
          <h2 id="faq" className="scroll-mt-28 text-2xl sm:text-3xl font-semibold leading-tight">
            {c.label} FAQ
          </h2>
          <p className="mt-3 text-muted leading-7">Quick answers to the questions buyers ask most. Each links on to the full guide.</p>
          <div className="mt-6 flex flex-col gap-2 text-sm">
            <Link prefetch={false} href={c.roundup.href} className="py-1 font-medium text-accent hover:underline">{c.roundup.title} →</Link>
            <Link prefetch={false} href={`/${category}/reviews`} className="py-1 text-accent hover:underline">All {c.noun} reviews →</Link>
            <Link prefetch={false} href={`/${category}/comparisons`} className="py-1 text-accent hover:underline">All {c.noun} comparisons →</Link>
            <Link prefetch={false} href={`/${category}/guides`} className="py-1 text-accent hover:underline">All {c.noun} guides →</Link>
          </div>
        </div>
        <FaqAccordion items={faqs} />
      </section>
    </div>
  );
}
