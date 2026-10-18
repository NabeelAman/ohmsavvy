import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Stars } from "@/components/ui/Stars";
import { getPicks } from "@/lib/catalog";
import { content, type Category } from "@/lib/content";
import { skipOptimizer } from "@/lib/images";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "About Us: How We Test and Review",
  description: "How OhmSavvy reviews test equipment: top picks bought and hands-on tested by our testing team, every spec verified against manufacturer data, no paid placements.",
  path: "/about",
});

const CATEGORIES: Category[] = ["multimeters", "soldering-irons", "oscilloscopes"];

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

export default function AboutPage() {
  const all = CATEGORIES.flatMap((c) => getPicks(c).map((p) => ({ ...p, category: c })));
  const tested = all.filter((p) => p.handsOnTested);
  const reviewHref = (name: string) => content.find((e) => e.type === "review" && e.title === `${name} Review`)?.href;

  const stats = [
    { value: `${all.length}`, label: "Products reviewed" },
    { value: `${tested.length}`, label: "Hands-on tested in our lab" },
    { value: "100%", label: "Specs verified at the source" },
    { value: "$0", label: "Paid placements, ever" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About OhmSavvy",
    url: "https://ohmsavvy.com/about",
    mainEntity: {
      "@type": "Organization",
      name: "OhmSavvy",
      url: "https://ohmsavvy.com",
      description: "Reviews of multimeters, soldering irons and oscilloscopes, with top picks hands-on tested and every spec verified against manufacturer data.",
    },
  };

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
        <div className="relative mx-auto max-w-4xl px-6 py-16 sm:py-20 text-center">
          <Eyebrow className="text-accent">ABOUT OHMSAVVY</Eyebrow>
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

      <div className="mx-auto max-w-5xl space-y-20 px-6 py-16">
        {/* Two levels of review */}
        <section>
          <Reveal>
            <p className="font-display text-xs uppercase tracking-[0.15em] text-accent">How we review</p>
            <h2 className="mt-1 text-2xl sm:text-3xl font-semibold">Two levels of review, always labelled</h2>
            <p className="mt-3 max-w-3xl text-muted leading-7">
              Every product page tells you exactly how it was reviewed, so you never have to guess whether we&apos;ve
              had the tool in our hands.
            </p>
          </Reveal>
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
        </section>

        {/* Tested in our lab */}
        {tested.length > 0 && (
          <section>
            <Reveal>
              <p className="font-display text-xs uppercase tracking-[0.15em] text-accent">Tested in our lab</p>
              <h2 className="mt-1 text-2xl sm:text-3xl font-semibold">Tools our team has had on the bench</h2>
            </Reveal>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {tested.map((p, i) => {
                const href = reviewHref(p.name);
                const card = (
                  <div className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-accent/60 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                    <div className="relative m-3 mb-0 h-40 rounded-xl border border-border/60 bg-white overflow-hidden">
                      {p.image && (
                        <Image
                          src={p.image}
                          unoptimized={skipOptimizer(p.image)}
                          alt={p.name}
                          fill
                          sizes="(min-width: 1024px) 250px, 50vw"
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
                  <Reveal key={p.name} delay={i * 80} className="flex">
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
          </section>
        )}

        {/* Testing rule */}
        <Reveal>
          <section className="rounded-3xl border border-border bg-gradient-to-br from-accent/10 via-surface to-surface p-8 sm:p-10">
            <p className="font-display text-xs uppercase tracking-[0.15em] text-accent">Our testing rule</p>
            <h2 className="mt-1 text-2xl sm:text-3xl font-semibold">Every product we rate 4.8 gets tested in our lab</h2>
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
          </section>
        </Reveal>

        {/* Spec verification */}
        <section>
          <Reveal>
            <p className="font-display text-xs uppercase tracking-[0.15em] text-accent">Verification</p>
            <h2 className="mt-1 text-2xl sm:text-3xl font-semibold">How we verify every spec</h2>
          </Reveal>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2">
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
            <section id="how-were-funded" className="h-full scroll-mt-28 rounded-2xl border border-border bg-surface p-6">
              <h2 className="text-lg font-semibold">How we&apos;re funded</h2>
              <p className="mt-2 text-sm text-muted leading-6">
                As an Amazon Associate I earn from qualifying purchases. OhmSavvy is reader-supported: when you buy
                through a link on this site, we may earn a commission from Amazon at no extra cost to you. That&apos;s our only income: no advertising, no sponsored placements, no
                paid reviews.
              </p>
            </section>
          </Reveal>
        </div>

        {/* CTA */}
        <Reveal>
          <section className="text-center">
            <h2 className="text-2xl font-semibold">Start with our top picks</h2>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link href="/multimeters/best-multimeters" className="rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium hover:border-accent hover:text-accent transition-colors">
                Best multimeters
              </Link>
              <Link href="/soldering-irons/best-soldering-irons" className="rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium hover:border-accent hover:text-accent transition-colors">
                Best soldering irons
              </Link>
              <Link href="/oscilloscopes/best-beginner-oscilloscopes" className="rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium hover:border-accent hover:text-accent transition-colors">
                Best beginner oscilloscopes
              </Link>
            </div>
          </section>
        </Reveal>
      </div>
    </article>
  );
}
