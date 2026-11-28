// KAIWEETS KM602 and Klein Tools MM400 are both existing verified Picks (src/lib/multimeter-catalog.ts and
// src/app/multimeters/best-multimeters/page.tsx respectively). Every spec below is copied verbatim from those
// already-sourced Pick objects — no new product research performed for this comparison, per CONTENT_STANDARDS.md
// §1 ("An existing verified Pick object already in the codebase counts as already satisfying this rule").
// Neither meter is hands-on tested by OhmSavvy.
import Link from "@/components/AppLink";
import { ContentLinks } from "@/components/ContentLinks";
import { Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/kaiweets-km602-vs-klein-tools-mm400";
const all = getAllPicks("multimeters");
const km602 = all.find((p) => p.name === "KAIWEETS KM602")!;
const mm400 = all.find((p) => p.name === "Klein Tools MM400")!;

export const metadata = buildMetadata({
  title: "KAIWEETS KM602 vs Klein Tools MM400",
  description:
    "KAIWEETS KM602 vs Klein Tools MM400: a rechargeable True RMS meter with Smart mode against a discontinued, non-True-RMS meter.",
  path: "/multimeters/kaiweets-km602-vs-klein-tools-mm400",
  image: km602.image,
});

const link = "text-accent hover:underline";

/** Power source contrast: rechargeable lithium cell against a disposable-battery meter. */
function PowerDiagram() {
  return (
    <svg
      viewBox="0 0 320 150"
      className="w-full h-auto"
      role="img"
      aria-label="Power source comparison. The KAIWEETS KM602 has a built-in 1,200 milliamp-hour lithium battery charged by a cable. The Klein Tools MM400 runs on standard replaceable batteries. One never needs batteries bought again; the other is a familiar swap-and-go design."
    >
      <rect x="20" y="30" width="110" height="60" rx="8" className="fill-accent/30 stroke-accent" strokeWidth="1.8" />
      <text x="75" y="55" fontSize="10.5" fontWeight="700" textAnchor="middle" className="fill-foreground">KAIWEETS KM602</text>
      <text x="75" y="72" fontSize="9" textAnchor="middle" className="fill-muted">1,200 mAh li-ion</text>
      <text x="75" y="84" fontSize="9" textAnchor="middle" className="fill-muted">charges by cable</text>
      <rect x="190" y="30" width="110" height="60" rx="8" className="fill-surface stroke-foreground" strokeWidth="1.8" />
      <text x="245" y="55" fontSize="10.5" fontWeight="700" textAnchor="middle" className="fill-foreground">Klein Tools MM400</text>
      <text x="245" y="72" fontSize="9" textAnchor="middle" className="fill-muted">Replaceable</text>
      <text x="245" y="84" fontSize="9" textAnchor="middle" className="fill-muted">batteries</text>
      <text x="160" y="130" fontSize="10" textAnchor="middle" className="fill-muted">Rechargeable vs. replaceable — a real day-to-day difference</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "KAIWEETS KM602 vs Klein Tools MM400",
  path,
  published: "2026-11-28",
  intro:
    "KAIWEETS KM602 vs Klein Tools MM400 pits a rechargeable, True RMS meter with an automatic Smart mode against an auto-ranging meter Klein has now discontinued. The KM602 is the newer, more feature-rich design: True RMS, a color display, NCV and a built-in lithium battery. The MM400 is simpler, not True RMS, and Klein has replaced it with the MM420 — buy it only at a clear discount.",
  a: {
    pick: km602,
    imageAlt: "KAIWEETS KM602 rechargeable True RMS multimeter with Smart mode",
    chooseIf: [
      "You want True RMS accuracy on non-sinusoidal AC loads",
      "You'd rather charge a built-in battery than buy replacements",
      "You want Smart mode to auto-detect voltage, resistance or continuity",
      "You want built-in NCV to check for live wires before touching leads",
    ],
  },
  b: {
    pick: mm400,
    imageAlt: "Klein Tools MM400 auto-ranging digital multimeter",
    chooseIf: [
      "You find one at a steep discount since Klein discontinued it",
      "You want a 1 m drop rating for job-site rough handling",
      "Your work is mostly clean 60 Hz loads, where True RMS matters less",
      "You'd rather use standard replaceable batteries than a rechargeable cell",
    ],
  },
  extraSpecs: [
    { label: "AC response", a: "True RMS", b: "Not True RMS, per Klein's own page" },
    { label: "Display resolution", a: "6,000 counts, color display", b: "4,000 counts, backlit" },
    { label: "Power", a: "Built-in 1,200 mAh lithium, charges by cable", b: "Replaceable batteries" },
    { label: "Mode selection", a: "Smart mode (auto-detect) plus manual fallback", b: "Manual auto-ranging only" },
    { label: "Non-contact voltage (NCV)", a: "Yes", b: "No, per Klein's own page" },
    { label: "Safety rating", a: "CAT III 600V per KAIWEETS's manual; listing claims higher", b: "CAT III 600V" },
    { label: "Resistance top", a: "60 MΩ", b: "Not stated in the specs we have" },
    { label: "Current ranges", a: "600 mA, 6 A and 10 A; no µA range", b: "Not stated in the specs we have" },
    { label: "Drop rating", a: "Not stated", b: "1 m (3.3 ft)" },
    { label: "Availability", a: "Current production", b: "Discontinued by Klein; replaced by the MM420" },
  ],
  differences: [
    "True RMS: the KM602 is True RMS; Klein's own MM400 page doesn't claim True RMS.",
    "Power: the KM602 has a built-in 1,200 mAh lithium battery charged by cable; the MM400 uses standard replaceable batteries.",
    "Mode selection: only the KM602 has a Smart mode that automatically picks voltage, resistance or continuity.",
    "NCV: only the KM602 has a built-in non-contact voltage detector.",
    "Resolution: the KM602's display is 6,000 counts against the MM400's 4,000.",
    "Availability: Klein has discontinued the MM400 in favor of the MM420, which affects long-term support and parts.",
    "Both read temperature, capacitance, frequency and duty cycle, and neither is hands-on tested by OhmSavvy.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Rechargeable against replaceable</h2>
        <p className="text-muted leading-7 mb-4">
          The most visible day-to-day difference between these two isn&apos;t a measurement spec at all — it&apos;s
          how each one gets power. The KM602 builds in a 1,200 mAh lithium cell you charge by cable, so you never
          buy a battery for it again, as long as you remember to charge it. The MM400 uses standard replaceable
          batteries, the familiar swap-and-go approach that never leaves you waiting for a charge, but does mean
          keeping spares on hand.
        </p>
        <Figure caption={<>Rechargeable lithium cell against standard replaceable batteries.</>}>
          <PowerDiagram />
        </Figure>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Smart mode: one less decision to make</h2>
        <p className="text-muted leading-7 mb-4">
          The KM602&apos;s Smart mode starts up and automatically works out whether you&apos;re measuring voltage, resistance
          or continuity, with a manual fallback for anything else. The MM400 has no equivalent — it&apos;s auto-ranging
          within a function once you&apos;ve selected one, but you still choose the function yourself on the dial. For
          anyone who finds themselves second-guessing which setting to use, Smart mode removes that decision
          entirely.
        </p>
        <KeyIdea title="True RMS matters most on non-sinusoidal loads">
          The KM602&apos;s True RMS spec means it reads AC voltage and current correctly even on distorted waveforms, like
          those from variable-speed motors or LED drivers. Klein&apos;s own MM400 page makes no True RMS claim, so treat
          its readings on those kinds of loads as approximate, the same caution that applies to any non-True-RMS
          meter. Our{" "}
          <Link href="/multimeters/do-i-need-true-rms-multimeter" className={link}>
            True RMS explainer
          </Link>{" "}
          has the full picture.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">A discontinued meter is still worth knowing about</h2>
        <p className="text-muted leading-7 mb-4">
          Klein has discontinued the MM400 and replaced it with the MM420. That doesn&apos;t make an existing MM400
          a bad meter, but it does mean no further updates, and eventually thinner stock on Amazon as remaining units
          sell through. If you find one at a real discount, it&apos;s still a usable auto-ranging CAT III 600V meter with
          a 1 m drop rating. If you&apos;re buying new without a specific reason to want this exact model, the KM602 or
          the MM420 are both the more current options.
        </p>
        <Callout title="CAT rating: check the manual, not just the listing">
          KAIWEETS&apos;s own manual rates the KM602 CAT III 600V, while its Amazon listing claims a higher figure. Treat
          the manual as authoritative, not the listing. Our{" "}
          <Link href="/multimeters/what-cat-rating-do-i-need-for-home-wiring" className={link}>
            CAT rating guide
          </Link>{" "}
          covers what each category actually certifies.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Pick by job</h2>
        <DataTable
          head={["Task", "Better fit", "Reason"]}
          rows={[
            ["Checking a variable-speed motor or LED driver", "KAIWEETS KM602", "True RMS reads distorted AC correctly"],
            ["Confirming a switch leg is dead before working on it", "KAIWEETS KM602", "Built-in NCV, no extra tool needed"],
            ["A meter you grab without thinking about which mode", "KAIWEETS KM602", "Smart mode auto-detects the function"],
            ["Replacing a worn-out meter at a steep clearance price", "Klein Tools MM400", "Still usable, just discontinued by Klein"],
            ["Reading temperature, capacitance or frequency", "Either", "Both cover these functions"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For more on this pair&apos;s category, see the{" "}
          <Link href="/multimeters/best-multimeter-under-100" className={link}>
            best multimeters under $100
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/best-multimeter-for-electricians" className={link}>
            best multimeter for electricians
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "The KAIWEETS KM602 is the better all-around meter today: True RMS, a rechargeable battery, Smart mode and built-in NCV, all in current production. The Klein Tools MM400 is only worth buying at a clear discount, since Klein has discontinued it in favor of the MM420 and it isn't True RMS.",
  chooseNeitherIf:
    "You need a logging meter, a clamp function, or a higher CAT IV rating for service-entrance work. Neither meter offers these.",
  faqs: [
    {
      question: "Is the Klein Tools MM400 still available to buy?",
      answer:
        "It may still be found through Amazon and other retailers while stock lasts, but Klein has discontinued it and replaced it with the MM420. Buy it only at a clear discount, since you won't get further updates or the newer model's features.",
    },
    {
      question: "Does the KAIWEETS KM602 really never need batteries?",
      answer:
        "It has a built-in 1,200 mAh lithium cell charged by cable, so you never buy disposable batteries for it. You do need to remember to charge it, the same trade-off as any rechargeable device.",
    },
    {
      question: "Is the KM602's CAT rating really CAT III 600V?",
      answer:
        "Per KAIWEETS's own manual, yes, CAT III 600V. Its Amazon listing states a higher figure, but we treat the manufacturer's manual as the authoritative source, not the listing.",
    },
    {
      question: "Which meter has a non-contact voltage (NCV) detector?",
      answer:
        "Only the KAIWEETS KM602. Klein's own MM400 page states it has no NCV function and no low-impedance mode.",
    },
    {
      question: "Can either meter measure current without breaking the circuit?",
      answer:
        "No, both are standard multimeters that measure current in-line, not clamp meters. See our clamp meter buying guide if that's what you actually need.",
    },
  ],
  roundup: { label: "See all multimeter picks", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Klein MM400 vs Klein MM450", href: "/multimeters/klein-mm400-vs-klein-mm450" },
    { label: "Klein MM450 vs Extech EX330", href: "/multimeters/klein-mm450-vs-extech-ex330" },
    { label: "Do I need a True RMS multimeter?", href: "/multimeters/do-i-need-true-rms-multimeter" },
    { label: "What CAT rating do I need for home wiring?", href: "/multimeters/what-cat-rating-do-i-need-for-home-wiring" },
    { label: "Best multimeter under $100", href: "/multimeters/best-multimeter-under-100" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
  ],
};

export default function KaiweetsKm602VsKleinToolsMm400Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
