import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Stars } from "@/components/ui/Stars";
import { getPicks } from "@/lib/catalog";
import { content, type Category } from "@/lib/content";
import { productImageSrc, skipOptimizer } from "@/lib/images";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "About Us: How We Test and Review",
  description: "How OhmSavvy reviews test equipment: top picks bought and hands-on tested by our testing team, every spec verified against manufacturer data, no paid placements.",
  path: "/about",
});

const CATEGORIES: { category: Category; label: string; href: string; text: string; bg: string; judge: string[] }[] = [
  {
    category: "multimeters",
    label: "Multimeters",
    href: "/multimeters/best-multimeters",
    text: "text-cat-multimeters",
    bg: "bg-cat-multimeters",
    judge: [
      "CAT safety rating for the circuits you'll actually measure",
      "True RMS for modern, non-sinusoidal loads",
      "Resolution, auto-ranging and useful extras like NCV and low-impedance mode",
    ],
  },
  {
    category: "soldering-irons",
    label: "Soldering Irons",
    href: "/soldering-irons/best-soldering-irons",
    text: "text-cat-soldering",
    bg: "bg-cat-soldering",
    judge: [
      "Power and heat-up time",
      "Temperature control and how steady it holds",
      "Tip choice and availability, and portable vs bench use",
    ],
  },
  {
    category: "oscilloscopes",
    label: "Oscilloscopes",
    href: "/oscilloscopes/best-beginner-oscilloscopes",
    text: "text-cat-oscilloscopes",
    bg: "bg-cat-oscilloscopes",
    judge: [
      "Bandwidth against the signals you'll measure (the 3-5x rule)",
      "Sample rate and channel count",
      "How approachable it is for a first-time user",
    ],
  },
];

const SPEC_STEPS = [
  {
    title: "Manufacturer data first",
    body: "Every spec (CAT safety ratings, bandwidth, sample rate, True RMS support, wattage) is checked against the manufacturer's own datasheet or product page, or the product's official Amazon listing. Never a reseller's copy or another review site.",
  },
  {
    title: "Conflicts called out",
    body: "When sources disagree or a spec is ambiguous, we say so in the review instead of quietly picking one number.",
  },
  {
    title: "Owner feedback cross-checked",
    body: "We look for patterns across verified-purchase reviews to catch reliability problems that spec sheets never show.",
  },
  {
    title: "A clear verdict",
    body: "Every review says who a product suits, who should skip it, and what the realistic alternatives are.",
  },
];

const NEVER = [
  ["Sell rankings", "No brand can pay for a placement, a higher rating or a favourable review."],
  ["Invent test results", "We never publish a measurement or finding we didn't actually get on our own bench."],
  ["Badge before testing", "Hands-on Tested goes on a product only after its testing is complete."],
  ["Show the wrong photo", "If we can't confirm a photo is the exact model, the slot shows a labelled \"Photo coming soon\" illustration instead of guessing."],
  ["Fake people", "No invented author bios or credentials. We publish as the OhmSavvy team."],
  ["Skip the safety notes", "Guides that touch mains or high voltage say so plainly, with the ratings and precautions that apply."],
];

const FAQS = [
  {
    q: "Do brands pay OhmSavvy for reviews or placements?",
    a: "No. Brands can't pay for a review, a placement or a rating, and we have no sponsorship deals with manufacturers. We're funded mainly by Amazon affiliate commission when a reader buys through one of our links, at no extra cost to them, and we may also show display ads from Google. Advertisers have no say in what we review or how we rate it.",
  },
  {
    q: "Do you test every product you review?",
    a: "Every product we rate 4.8 is bought and hands-on tested by our testing team, and carries a Hands-on Tested badge. Other products are reviewed through desk research against manufacturer data and the official listing, and each of those reviews says so.",
  },
  {
    q: "Does a higher commission affect the rankings?",
    a: "No. Rankings come from the specs, owner feedback and, for top picks, our own testing. A cheaper tool can and does outrank a pricier one when it suits the job better.",
  },
  {
    q: "Why do some products show Photo coming soon?",
    a: "Because we only show a photo we can confirm is the exact model. Many budget tools share a body with other brands, so when we can't verify the image, we leave the slot empty rather than risk showing the wrong product.",
  },
  {
    q: "What happens when a spec or product changes?",
    a: "We correct the page as soon as we catch it, whether a spec turns out to be wrong, a listing changes, or a product is discontinued.",
  },
];

const TOC = [
  ["mission", "Why we exist"],
  ["coverage", "What we cover"],
  ["how-we-review", "How we review"],
  ["ratings", "Our ratings"],
  ["standards", "Standards"],
  ["how-were-funded", "Funding"],
  ["faq", "FAQ"],
];

function SectionTitle({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: React.ReactNode }) {
  return (
    <Reveal>
      <p className="font-display text-xs uppercase tracking-[0.15em] text-accent">{eyebrow}</p>
      <h2 className="mt-1 text-2xl sm:text-3xl font-semibold">{title}</h2>
      {intro && <p className="mt-3 max-w-3xl text-muted leading-7">{intro}</p>}
    </Reveal>
  );
}

export default function AboutPage() {
  const all = CATEGORIES.flatMap((c) => getPicks(c.category).map((p) => ({ ...p, category: c.category })));
  const tested = all.filter((p) => p.handsOnTested);
  const reviewHref = (name: string) => content.find((e) => e.type === "review" && e.title === `${name} Review`)?.href;
  const published = content.length;

  const stats = [
    { value: `${all.length}`, label: "Products reviewed" },
    { value: `${tested.length}`, label: "Hands-on tested in our lab" },
    { value: `${published}`, label: "Guides, reviews & comparisons" },
    { value: "$0", label: "Paid placements, ever" },
  ];

  // Rating bands, counted live from the product data so the page can't drift
  // from what the reviews actually say.
  const bands = [
    {
      range: "4.8",
      title: "Top-rated · bought and tested",
      desc: "Our strongest recommendations. Every product at this rating has been bought and hands-on tested by our team.",
      items: all.filter((p) => p.rating >= 4.8),
    },
    {
      range: "4.5–4.7",
      title: "Strong picks",
      desc: "Excellent for the job they're recommended for, with minor trade-offs. Reviewed against manufacturer data and owner feedback.",
      items: all.filter((p) => p.rating >= 4.5 && p.rating < 4.8),
    },
    {
      range: "4.0–4.4",
      title: "Right for a specific need",
      desc: "Good value or a good fit for one kind of buyer, with clear limitations that each review spells out.",
      items: all.filter((p) => p.rating < 4.5),
    },
  ];
  const maxBand = Math.max(...bands.map((b) => b.items.length));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About OhmSavvy",
      url: "https://ohmsavvy.com/about",
      mainEntity: {
        "@type": "Organization",
        name: "OhmSavvy",
        url: "https://ohmsavvy.com",
        description:
          "Reviews of multimeters, soldering irons and oscilloscopes, with top picks hands-on tested and every spec verified against manufacturer data.",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://ohmsavvy.com" },
        { "@type": "ListItem", position: 2, name: "About", item: "https://ohmsavvy.com/about" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-surface-raised">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)", backgroundSize: "18px 18px", color: "var(--accent)" }}
        />
        <div className="relative mx-auto max-w-4xl px-6 pt-8 pb-16 sm:pb-20 text-center">
          <nav aria-label="Breadcrumb" className="text-left text-xs text-muted">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">Home</Link>
              </li>
              <li aria-hidden="true">›</li>
              <li aria-current="page" className="text-foreground">About</li>
            </ol>
          </nav>
          <Eyebrow className="mt-10 text-accent">ABOUT OHMSAVVY</Eyebrow>
          <h1 className="text-4xl sm:text-5xl leading-tight">
            Specs verified on paper.
            <br />
            <span className="bg-gradient-to-r from-accent to-cat-soldering bg-clip-text text-transparent">Top picks tested on our bench.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted leading-8">
            OhmSavvy covers the tools that live on an electronics workbench: multimeters, soldering irons and
            oscilloscopes. Our testing team buys our top-rated picks and puts them to work in our lab, and every spec
            on the site is checked against the manufacturer&apos;s own data.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-6 py-8 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl font-semibold text-accent">{s.value}</div>
              <div className="mt-1 text-xs text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* On this page */}
      <nav aria-label="On this page" className="sticky top-[75px] z-30 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl gap-2 overflow-x-auto px-6 py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TOC.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="shrink-0 rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      <div className="mx-auto max-w-5xl space-y-20 px-6 py-16 [&_section[id]]:scroll-mt-36">
        {/* Mission */}
        <section id="mission" className="grid gap-10 lg:grid-cols-[1fr_1.1fr] items-start">
          <SectionTitle eyebrow="Why we exist" title="Buying test gear shouldn't take an engineering degree" />
          <Reveal delay={80}>
            <div className="space-y-4 text-muted leading-7">
              <p>
                Spec sheets for multimeters, soldering irons and oscilloscopes are dense, and the numbers that matter
                (a CAT rating, True RMS, bandwidth, temperature stability) are easy to misread. And it isn&apos;t always
                clear whether a &quot;best of&quot; list is ranked on merit or on commission.
              </p>
              <p>
                OhmSavvy exists to close that gap: explain which specs actually matter for the work you do, check every
                number at its source, test our top picks ourselves, and tell you plainly who each tool is for and who
                should skip it.
              </p>
              <p className="font-medium text-foreground">
                The goal is simple: you buy the right tool once, and it&apos;s safe for the job.
              </p>
            </div>
          </Reveal>
        </section>

        {/* Coverage */}
        <section id="coverage">
          <SectionTitle
            eyebrow="What we cover"
            title="Three categories, covered in depth"
            intro="Each category has a ranked roundup, individual reviews, head-to-head comparisons, use-case guides and how-to guides."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {CATEGORIES.map((c, i) => {
              const entries = content.filter((e) => e.category === c.category);
              const count = (t: string) => entries.filter((e) => e.type === t).length;
              const picks = getPicks(c.category);
              return (
                <Reveal key={c.category} delay={i * 80} className="flex">
                  <Link
                    href={c.href}
                    className="group flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:border-accent/60"
                  >
                    <div className={`h-1 ${c.bg}`} />
                    <div className="flex flex-1 flex-col p-6">
                      <span className={`font-display text-xs uppercase tracking-wide ${c.text}`}>{c.label}</span>
                      <p className="mt-2 text-lg font-semibold">{picks.length} products compared</p>
                      <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
                        {[
                          ["Reviews", count("review")],
                          ["Compares", count("comparison")],
                          ["Guides", count("use-case-guide") + count("buying-guide") + count("how-to-guide")],
                        ].map(([l, v]) => (
                          <div key={l as string} className="rounded-lg bg-surface-raised py-2">
                            <dd className="font-display text-xl font-semibold">{v}</dd>
                            <dt className="text-[11px] text-muted">{l}</dt>
                          </div>
                        ))}
                      </dl>
                      <span className="mt-5 text-sm font-medium text-accent">See the roundup →</span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Two levels of review */}
        <section id="how-we-review">
          <SectionTitle
            eyebrow="How we review"
            title="Two levels of review, always labelled"
            intro={<>Every product page tells you exactly how it was reviewed, so you never have to guess whether we&apos;ve had the tool in our hands.</>}
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border-2 border-accent/40 bg-surface p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3" />
                      <path d="M7.5 15h9" />
                    </svg>
                  </span>
                  <Badge variant="accent">Hands-on Tested</Badge>
                </div>
                <h3 className="mt-4 text-xl font-semibold">Bought and tested in our lab</h3>
                <p className="mt-2 text-muted leading-7">
                  Our testing team buys the unit, puts it to work on our electronics bench, and checks how it holds up
                  against its published specs and our written assessment. Only then does the badge go on.
                </p>
                <p className="mt-3 text-sm font-medium text-accent">
                  {tested.length} {tested.length === 1 ? "product" : "products"} tested so far
                </p>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="h-full rounded-2xl border border-border bg-surface p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-signal-bg text-signal">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M6 3h8l4 4v14H6V3Z" />
                      <path d="M14 3v4h4M9 13l2 2 4-4.5" />
                    </svg>
                  </span>
                  <Badge variant="signal">Spec-Verified</Badge>
                </div>
                <h3 className="mt-4 text-xl font-semibold">Researched against the source</h3>
                <p className="mt-2 text-muted leading-7">
                  Products without the badge are reviewed through desk research: every spec checked against manufacturer
                  data or the official Amazon listing, plus patterns in verified-purchase reviews. Each of these
                  reviews says plainly that we haven&apos;t bench-tested the unit yet.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Tested in our lab */}
          {tested.length > 0 && (
            <div className="mt-14">
              <Reveal>
                <h3 className="text-xl font-semibold">Tools our team has had on the bench</h3>
              </Reveal>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
                {tested.map((p, i) => {
                  const href = reviewHref(p.name);
                  const card = (
                    <div className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-accent/60 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                      <div className="relative m-3 mb-0 h-36 rounded-xl border border-border/60 bg-white overflow-hidden">
                        {p.image && (
                          <Image
                            src={productImageSrc(p.image, 200)}
                            unoptimized={skipOptimizer(p.image)}
                            alt={p.name}
                            fill
                            sizes="(min-width: 1024px) 200px, 50vw"
                            className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                          />
                        )}
                        <span className="absolute left-2 top-2 rounded-full bg-accent px-2.5 py-1 text-[10px] font-semibold text-accent-foreground shadow">
                          ✓ Tested
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col gap-1.5 p-4">
                        <span className="font-semibold leading-snug">{p.name}</span>
                        <Stars rating={p.rating} />
                        <span className="mt-auto pt-2 text-sm font-medium text-accent">Read the review →</span>
                      </div>
                    </div>
                  );
                  return (
                    <Reveal key={p.name} delay={i * 70} className="flex">
                      {href ? (
                        <Link href={href} className="flex w-full">
                          {card}
                        </Link>
                      ) : (
                        card
                      )}
                    </Reveal>
                  );
                })}
              </div>
            </div>
          )}

          {/* Testing rule */}
          <Reveal className="mt-14">
            <div className="rounded-3xl border border-border bg-gradient-to-br from-accent/10 via-surface to-surface p-8 sm:p-10">
              <p className="font-display text-xs uppercase tracking-[0.15em] text-accent">Our testing rule</p>
              <h3 className="mt-1 text-2xl sm:text-3xl font-semibold">Every product we rate 4.8 gets tested in our lab</h3>
              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                {[
                  ["Top picks are tested", "Every product earning our 4.8 rating is bought and hands-on tested by our team."],
                  ["The badge comes last", "A product only carries the Hands-on Tested badge after its testing is complete, never before."],
                  ["Only real findings", "We never publish measurements or results we didn't actually get on our own bench."],
                ].map(([t, b]) => (
                  <div key={t}>
                    <p className="font-semibold">{t}</p>
                    <p className="mt-1.5 text-sm text-muted leading-6">{b}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Spec verification */}
          <div className="mt-14">
            <Reveal>
              <h3 className="text-xl font-semibold">How we verify every spec</h3>
            </Reveal>
            <ol className="mt-6 grid gap-4 sm:grid-cols-2">
              {SPEC_STEPS.map((s, i) => (
                <Reveal key={s.title} delay={i * 60}>
                  <li className="flex h-full gap-4 rounded-2xl border border-border bg-surface p-5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent font-display text-sm font-semibold text-accent-foreground">
                      {i + 1}
                    </span>
                    <span>
                      <span className="block font-semibold">{s.title}</span>
                      <span className="mt-1 block text-sm text-muted leading-6">{s.body}</span>
                    </span>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* What we judge */}
          <div className="mt-14">
            <Reveal>
              <h3 className="text-xl font-semibold">What we judge in each category</h3>
              <p className="mt-2 max-w-3xl text-muted leading-7">
                Different tools fail in different ways, so each category is scored on the specs that decide real use.
              </p>
            </Reveal>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {CATEGORIES.map((c, i) => (
                <Reveal key={c.category} delay={i * 70}>
                  <div className="h-full rounded-2xl border border-border bg-surface p-6">
                    <span className={`font-display text-xs uppercase tracking-wide ${c.text}`}>{c.label}</span>
                    <ul className="mt-3 space-y-2.5">
                      {c.judge.map((j) => (
                        <li key={j} className="flex gap-2.5 text-sm text-muted leading-6">
                          <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${c.bg}`} />
                          {j}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Ratings */}
        <section id="ratings">
          <SectionTitle
            eyebrow="Our ratings"
            title="What our ratings mean"
            intro="Ratings are a single editorial score out of 5 from the OhmSavvy team, not an average of customer reviews. The counts below come straight from the products on the site."
          />
          <div className="mt-8 space-y-4">
            {bands.map((b, i) => (
              <Reveal key={b.range} delay={i * 70}>
                <div className="grid gap-4 rounded-2xl border border-border bg-surface p-5 sm:grid-cols-[9rem_1fr_14rem] sm:items-center">
                  <div>
                    <p className="font-display text-3xl font-semibold text-accent whitespace-nowrap">{b.range}</p>
                    <p className="text-xs text-muted">out of 5</p>
                  </div>
                  <div>
                    <p className="font-semibold">{b.title}</p>
                    <p className="mt-1 text-sm text-muted leading-6">{b.desc}</p>
                  </div>
                  <div>
                    <div className="h-2.5 rounded-full bg-surface-raised overflow-hidden">
                      <div className={`h-full rounded-full ${i === 0 ? "bg-accent" : "bg-accent/50"}`} style={{ width: `${(b.items.length / maxBand) * 100}%` }} />
                    </div>
                    <p className="mt-1.5 text-xs text-muted">
                      {b.items.length} {b.items.length === 1 ? "product" : "products"}
                      {i === 0 && ` · ${b.items.filter((p) => p.handsOnTested).length} of ${b.items.length} hands-on tested`}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Standards */}
        <section id="standards">
          <SectionTitle
            eyebrow="Editorial standards"
            title="What we will never do"
            intro="These rules apply to every page on the site, from roundups and reviews to how-to guides."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {NEVER.map(([t, b], i) => (
              <Reveal key={t} delay={i * 50}>
                <div className="flex h-full gap-3 rounded-2xl border border-border bg-surface p-5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cat-soldering/15 text-cat-soldering" aria-hidden>
                    ✕
                  </span>
                  <div>
                    <p className="font-semibold">{t}</p>
                    <p className="mt-1 text-sm text-muted leading-6">{b}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-6">
            <div className="rounded-2xl border border-border border-l-4 border-l-accent bg-surface p-5">
              <p className="font-semibold">Corrections</p>
              <p className="mt-1 text-sm text-muted leading-6">
                If a spec turns out to be wrong, a listing changes or a product is discontinued, we correct the page as
                soon as we catch it rather than waiting for a scheduled update.
              </p>
            </div>
          </Reveal>
        </section>

        {/* Team, rankings, funding */}
        <div className="grid gap-5 md:grid-cols-3">
          <Reveal>
            <section className="h-full rounded-2xl border border-border bg-surface p-6">
              <h2 className="text-lg font-semibold">Who&apos;s behind OhmSavvy</h2>
              <p className="mt-2 text-sm text-muted leading-6">
                OhmSavvy is run by a research team that writes and verifies every review and a testing team that
                handles hands-on testing in our lab. We publish under the OhmSavvy name and never invent author bios or
                credentials: if a byline ever claims a specific qualification, it&apos;s genuinely true.
              </p>
            </section>
          </Reveal>
          <Reveal delay={80}>
            <section className="h-full rounded-2xl border border-border bg-surface p-6">
              <h2 className="text-lg font-semibold">How rankings work</h2>
              <p className="mt-2 text-sm text-muted leading-6">
                Rankings are never influenced by which brand pays the highest commission. A cheaper tool can outrank a
                pricier one if the specs, owner feedback and our testing say so. Manufacturers can&apos;t pay for
                placement or a favourable review.
              </p>
            </section>
          </Reveal>
          <Reveal delay={160}>
            <section id="how-were-funded" className="h-full rounded-2xl border border-border bg-surface p-6">
              <h2 className="text-lg font-semibold">How we&apos;re funded</h2>
              <p className="mt-2 text-sm text-muted leading-6">
                As an Amazon Associate I earn from qualifying purchases. OhmSavvy is reader-supported: when you buy
                through a link on this site, we may earn a commission from Amazon at no extra cost to you. We may also show display ads from Google, which are labelled as ads and
                kept out of our rankings. No sponsored placements, no paid reviews.
              </p>
            </section>
          </Reveal>
        </div>

        {/* FAQ */}
        <section id="faq">
          <SectionTitle eyebrow="FAQ" title="Questions about how we work" />
          <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-surface">
            {FAQS.map((f) => (
              <details key={f.q} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <h3 className="font-medium">{f.q}</h3>
                  <span className="shrink-0 text-xl leading-none text-accent transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted leading-6">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <Reveal>
          <section className="rounded-3xl border border-border bg-surface-raised px-6 py-10 text-center">
            <h2 className="text-2xl font-semibold">Start with our top picks</h2>
            <p className="mx-auto mt-2 max-w-xl text-muted">Every roundup leads with the pick we&apos;d buy ourselves, then the best option for each kind of buyer.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {CATEGORIES.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium hover:border-accent hover:text-accent transition-colors"
                >
                  Best {c.label.toLowerCase()}
                </Link>
              ))}
            </div>
          </section>
        </Reveal>
      </div>
    </article>
  );
}
