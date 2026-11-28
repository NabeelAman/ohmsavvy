// Educational page. General engineering framing (accuracy specs, what tolerance means) is well-established and
// uncited per CONTENT_STANDARDS.md §1. Every product-specific figure below (accuracy %, count, CAT-rating
// discrepancy) is copied verbatim from an existing verified Pick's own specs array in
// src/lib/multimeter-catalog.ts / src/app/multimeters/best-multimeters/page.tsx — no new product research done here.
import Link from "@/components/AppLink";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  ProductStrip,
} from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const all = getAllPicks("multimeters");
const bm786 = all.find((p) => p.name === "EEVblog Brymen BM786")!;
const ht118e = all.find((p) => p.name === "KAIWEETS HT118E")!;
const mm325 = all.find((p) => p.name === "Klein Tools MM325")!;

const description =
  "Is a cheap multimeter accurate? Real tolerance figures across price tiers, and the CAT-rating discrepancies worth checking first.";

export const metadata = buildMetadata({
  title: "Is a Cheap Multimeter Accurate?",
  description,
  path: "/multimeters/is-a-cheap-multimeter-accurate",
  image: bm786.image,
});

const link = "text-accent hover:underline";

export default function IsACheapMultimeterAccuratePage() {
  return (
    <HowToShell
      title="Is a Cheap Multimeter Accurate?"
      description={description}
      published="2026-11-28"
      path="/multimeters/is-a-cheap-multimeter-accurate"
      category="multimeters"
      intro={
        <>
          A cheap multimeter is usually accurate enough for the number it displays — most budget meters today are
          still digitally accurate within a percent or two on basic DC voltage. The real gap between cheap and
          premium meters is resolution (how many digits of change it can actually show you) and, more importantly,
          whether the safety rating printed on the case or the Amazon listing actually matches what the meter&apos;s
          own manual states. That second gap is the one worth checking before you trust a budget meter near mains
          voltage.
        </>
      }
      aside={{
        image: bm786.image,
        alt: "EEVblog Brymen BM786 bench multimeter, a high-accuracy 60,000-count meter",
        caption: (
          <>
            At the top end, a meter like the Brymen BM786 publishes a precise 0.025% basic DC accuracy figure. Budget
            meters often simply don&apos;t publish one at all. See{" "}
            <Link href="/multimeters/what-cat-rating-do-i-need-for-home-wiring" className={link}>
              what CAT rating you actually need
            </Link>{" "}
            for the safety side of this question.
          </>
        ),
      }}
      toc={[
        { id: "answer", label: "The short answer" },
        { id: "accuracy", label: "What accuracy specs mean" },
        { id: "compare", label: "Real accuracy figures across price tiers" },
        { id: "cat", label: "The bigger gap: CAT rating honesty" },
        { id: "causes", label: "Symptoms and what they mean" },
        { id: "which-meter", label: "When cheap is fine, and when it isn't" },
      ]}
      faq={[
        {
          q: "Can I trust a $15 multimeter's reading?",
          a:
            "For basic DC voltage and continuity checks, generally yes — the underlying analog-to-digital conversion in even cheap meters is usually sound. What you often lose at the bottom of the price range is published accuracy specs at all (some budget meters state only a count resolution, not a tolerance percentage), plus features like True RMS that matter on non-sinusoidal AC signals.",
        },
        {
          q: "Why do two different multimeters give slightly different readings on the same circuit?",
          a:
            "Every meter has a tolerance band, commonly expressed as a percentage plus a number of counts (for example ±(0.05% + 5 digits)). Two meters within their own tolerance can legitimately disagree by a small amount. If the disagreement is large, suspect a wiring or loading issue rather than the meters themselves — see our guide on multimeter input impedance.",
        },
        {
          q: "Is the CAT safety rating on a cheap meter's case always accurate?",
          a:
            "Not always, and this is the more important accuracy question for a budget meter. We've found several verified picks where the case or Amazon listing states a higher CAT rating than the meter's own printed manual, which is the authoritative source. Always check the manual, not just the case silkscreen or the listing title.",
        },
        {
          q: "Does a higher price always mean better accuracy?",
          a:
            "Not strictly, but it correlates with published accuracy specs, resolution (count), and True RMS support. A meter that costs more because of extra safety certification or logging features isn't necessarily more accurate on basic DC volts than a mid-tier meter, but it's far more likely to state its accuracy precisely rather than leaving you to guess.",
        },
        {
          q: "What's more important than accuracy for a cheap multimeter?",
          a:
            "Safety rating honesty. A meter that's off by 0.1% on a voltage reading is a minor inconvenience. A meter whose CAT rating is inflated on its listing but not backed by its own manual is a real safety question if you're working anywhere near higher-energy circuits like a service panel.",
        },
      ]}
      next={[
        {
          href: "/multimeters/what-cat-rating-do-i-need-for-home-wiring",
          title: "What CAT Rating Do I Need for Home Wiring?",
          desc: "The safety-rating question that matters more than accuracy for most buyers.",
        },
        {
          href: "/multimeters/multimeter-input-impedance-explained",
          title: "Multimeter Input Impedance Explained",
          desc: "The other spec that silently affects what your meter actually shows you.",
        },
      ]}
    >
      <section>
        <h2 id="answer" className="text-xl font-semibold mb-3">The short answer</h2>
        <p className="text-muted leading-7">
          Yes, with two real caveats. First, the cheapest meters sometimes don&apos;t publish an accuracy percentage
          at all, just a count resolution, which makes it hard to know how much to trust a borderline reading.
          Second, and more importantly, a cheap meter&apos;s printed safety (CAT) rating on its case or Amazon
          listing doesn&apos;t always match what its own manual actually states — and the manual is the figure that
          counts.
        </p>
      </section>

      <section>
        <h2 id="accuracy" className="text-xl font-semibold mb-3">What an accuracy spec actually means</h2>
        <p className="text-muted leading-7 mb-4">
          A multimeter&apos;s accuracy is usually written as a percentage of the reading plus a number of &quot;digits&quot;
          (the smallest increment the display can show), for example ±(0.05% + 5 digits). On a 10.000 V reading,
          that&apos;s ±(0.005 V + 0.005 V) = ±0.010 V, so the true value is somewhere between 9.990 V and 10.010 V. The
          count (2,000, 6,000, 20,000, 60,000 and so on) is how many distinct values the display can show on its most
          sensitive range — a higher count means finer resolution, independent of the accuracy percentage itself.
        </p>
        <Callout title="Resolution and accuracy are two different numbers">
          A high-count meter can display more decimal places, but that doesn&apos;t automatically mean it&apos;s more
          accurate — a 60,000-count meter with a loose tolerance can show you a precise-looking number that&apos;s still
          wrong by more than a 2,000-count meter with a tight tolerance. Check both figures, not just the count.
        </Callout>
      </section>

      <section>
        <h2 id="compare" className="text-xl font-semibold mb-3">Real accuracy figures across price tiers</h2>
        <p className="text-muted leading-7 mb-4">
          These are the actual manufacturer-stated basic DC voltage accuracy figures for four already-verified picks
          on this site, spanning budget to bench-grade:
        </p>
        <Figure caption={<>Basic DC voltage accuracy, where the maker publishes one (lower is tighter). Klein&apos;s MM325 publishes no percentage figure at all.</>}>
          <BarChart
            items={[
              { label: "EEVblog Brymen BM786 (bench)", value: 0.025, display: "±0.025%", highlight: true },
              { label: "UNI-T UT61E+ (enthusiast)", value: 0.05, display: "±0.05%+5" },
              { label: "KAIWEETS HT118E (mid)", value: 0.08, display: "±0.08%+5" },
            ]}
          />
        </Figure>
        <DataTable
          head={["Meter", "Tier", "Basic DC accuracy", "Count"]}
          rows={[
            ["EEVblog Brymen BM786", "Bench-grade", "±0.025%", "60,000"],
            ["UNI-T UT61E+", "Enthusiast", "±(0.05% + 5 digits)", "22,000"],
            ["KAIWEETS HT118E", "Mid-range", "±(0.08% + 5 digits)", "20,000"],
            ["Klein Tools MM325", "Budget, basic", "Not stated by Klein", "2,000"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The pattern holds here: more expensive meters tend to publish tighter, more precise accuracy figures. But
          the Klein MM325 isn&apos;t inaccurate for what it does — it&apos;s a manual-ranging, 2,000-count meter for basic
          household and battery checks, and Klein simply doesn&apos;t publish a percentage tolerance for a meter at
          that level. Absence of a published figure isn&apos;t the same as the meter being wrong.
        </p>
      </section>

      <section>
        <h2 id="cat" className="text-xl font-semibold mb-3">The bigger gap: CAT rating honesty</h2>
        <p className="text-muted leading-7 mb-4">
          Across the picks we&apos;ve verified on this site, the more common and more consequential accuracy problem
          with budget meters isn&apos;t the number on the display — it&apos;s a safety (CAT) rating on the case or
          Amazon listing that doesn&apos;t match what the meter&apos;s own manual actually states. We&apos;ve found
          this discrepancy on more than one already-verified pick:
        </p>
        <DataTable
          head={["Meter", "Case / listing claims", "Manual actually states"]}
          rows={[
            ["KAIWEETS KM602", "CAT IV, per its Amazon listing", "CAT III 600V, per KAIWEETS's own manual"],
            ["OWON OW18E", "1000V CAT III / 600V CAT IV, per the case marking", "OWON's own page doesn't state a rating at all"],
            ["OWON B41T+", "1000V CAT III, per the case marking", "OWON's own page doesn't state a rating at all"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          In every case, the manufacturer&apos;s own manual or product page is the figure we trust, not the case
          silkscreen or the Amazon listing title — and that&apos;s the rating you should trust too. See our full
          breakdown of what a CAT rating is actually certifying for home wiring work.
        </p>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and what they mean</h2>
        <DataTable
          head={["What you notice", "Likely explanation", "What to do"]}
          rows={[
            ["Reading looks fine but the box has no accuracy spec", "Budget meter, basic-tier tolerance just isn't published", "Fine for basic checks; don't trust it for precision work"],
            ["Case says a higher CAT rating than you expected for the price", "Listing/case inflation, common on budget meters", "Check the actual printed manual, not the case or listing"],
            ["Two meters disagree by a noticeable amount", "Tolerance stack-up, or one meter loading the circuit", "Check each meter's accuracy spec and input impedance"],
            ["Reading is stable but implausible", "Likely a wiring, range, or probe contact issue, not accuracy", "Reseat probes, confirm the correct range is selected"],
          ]}
        />
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">When cheap is fine, and when it isn&apos;t</h2>
        <p className="text-muted leading-7 mb-6">
          A basic meter is genuinely fine for checking batteries, continuity, and whether an outlet has power. Step
          up in both accuracy and safety-rating confidence once you&apos;re working with variable-speed loads, anything
          you&apos;d call a precision reading, or any wiring where a wrong CAT assumption has real consequences.
        </p>
        <ProductStrip
          title="Where to look at each tier"
          items={[
            {
              name: "Klein Tools MM325",
              image: mm325.image,
              alt: "Klein Tools MM325 basic digital multimeter",
              href: "/multimeters/best-multimeter-under-100",
              note: "Manual-ranging, 2,000-count, no published accuracy percentage — fine for basic household checks.",
            },
            {
              name: "KAIWEETS HT118E",
              image: ht118e.image,
              alt: "KAIWEETS HT118E digital multimeter",
              href: "/multimeters/best-multimeters-for-electronics-repair",
              note: "20,000-count with a stated ±(0.08%+5) DC accuracy, a real step up from basic-tier meters.",
            },
            {
              name: "EEVblog Brymen BM786",
              image: bm786.image,
              alt: "EEVblog Brymen BM786 bench multimeter",
              href: "/multimeters/best-multimeters-for-measuring-microamps",
              note: "Bench-grade ±0.025% DC accuracy and 60,000 counts, for when precision genuinely matters.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
