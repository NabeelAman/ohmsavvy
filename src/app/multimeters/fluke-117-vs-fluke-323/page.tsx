import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-117-vs-fluke-323";

export const metadata = buildMetadata({
  title: "Fluke 117 vs Fluke 323",
  description:
    "Fluke 117 vs Fluke 323: a general-purpose multimeter against a dedicated True RMS clamp meter. Which one you actually need depends on how you measure current.",
  path: "/multimeters/fluke-117-vs-fluke-323",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 117 vs Fluke 323",
  path,
  published: "2026-10-22",
  intro:
    "These aren't really competing for the same job. The 117 is a general-purpose multimeter — voltage, resistance, continuity, diode test, and current through leads in series. The 323 is a dedicated True RMS clamp meter built around one thing: reading AC current by clamping around a conductor, without ever breaking the circuit open. The real question isn't which is \"better\" — it's which measurement technique your work actually needs.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 117")!,
    reviewHref: "/multimeters/fluke-117-review",
    imageAlt: "Fluke 117 digital multimeter",
    chooseIf: [
      "You need the full range of a general multimeter: voltage, resistance, continuity, diode test",
      "Your current measurements are occasional, not a daily, repeated task",
      "You're fine breaking the circuit open (or using leads in series) when you do need a current reading",
      "You want one tool that covers electronics and electrical troubleshooting broadly",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 323")!,
    reviewHref: undefined,
    imageAlt: "Fluke 323 True RMS clamp meter",
    chooseIf: [
      "You measure AC current often enough that breaking circuits open every time is impractical",
      "You work on live panels or running equipment where a no-disconnect reading matters",
      "You specifically need True RMS accuracy on non-sinusoidal AC current, like variable-speed drives",
      "You don't need resistance, continuity, diode test, or DC current measurement from the same tool",
    ],
  },
  extraSpecs: [
    { label: "Primary function", a: "General multimeter (leads, in-circuit)", b: "Clamp current meter (no circuit break)" },
    { label: "Current measurement", a: "Through leads, in series, up to the meter's rated current", b: "Clamped around a conductor, up to 400A AC" },
    { label: "DC current", a: "Yes, through leads", b: "No — AC current only" },
    { label: "Resistance, continuity, diode test", a: "Yes", b: "No" },
    { label: "Accuracy", a: "True RMS", b: "True RMS" },
    { label: "Safety rating", a: "CAT III 600V", b: "CAT III 600V / CAT IV 300V" },
  ],
  differences: [
    "The 117 measures current by putting the meter in series within the circuit, which means disconnecting a wire; the 323 clamps around a conductor and reads current without ever opening the circuit.",
    "The 323 reads AC current only, up to 400A; the 117's current ranges cover both AC and DC through its leads, but at much lower maximum current than a clamp meter handles.",
    "The 117 is a full general-purpose multimeter — voltage, resistance, continuity, diode test — where the 323 is built around current measurement specifically, with voltage reading available but no resistance, continuity, or diode function.",
    "The 323 adds a CAT IV 300V rating on top of CAT III 600V, useful for work closer to a panel's main feed; the 117 is CAT III 600V only.",
    "Both are True RMS, so neither has the \"average-responding\" accuracy problem on distorted AC waveforms that some budget meters do.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Two different ways to measure current</h2>
        <p className="text-muted leading-7 mb-4">
          This is the actual decision driver between these two tools — not which has more features, but
          which current-measurement method fits how you work.
        </p>
        <Figure
          caption={
            <>
              In-series measurement (117) requires breaking the circuit open to insert the meter. Clamp
              measurement (323) reads the magnetic field around a conductor from outside it, with the
              circuit never disturbed.
            </>
          }
        >
          <svg viewBox="0 0 300 140" className="w-full h-auto" role="img" aria-label="Diagram comparing in-series current measurement with a multimeter versus clamp current measurement">
            <g>
              <text x="75" y="20" fontSize="10" textAnchor="middle" className="fill-foreground">117: in-series (leads)</text>
              <line x1="20" y1="60" x2="70" y2="60" className="stroke-foreground" strokeWidth="2" />
              <rect x="70" y="48" width="40" height="24" className="fill-none stroke-accent" strokeWidth="2" />
              <text x="90" y="64" fontSize="9" textAnchor="middle" className="fill-accent">meter</text>
              <line x1="110" y1="60" x2="150" y2="60" className="stroke-foreground" strokeWidth="2" />
              <text x="75" y="95" fontSize="9" textAnchor="middle" className="fill-muted">circuit broken open to insert meter</text>
            </g>
            <g>
              <text x="225" y="20" fontSize="10" textAnchor="middle" className="fill-foreground">323: clamp (no break)</text>
              <line x1="170" y1="60" x2="280" y2="60" className="stroke-foreground" strokeWidth="2" />
              <circle cx="225" cy="60" r="20" className="fill-none stroke-accent" strokeWidth="3" />
              <text x="225" y="95" fontSize="9" textAnchor="middle" className="fill-muted">jaw clamps around the wire, circuit stays intact</text>
            </g>
          </svg>
        </Figure>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Which tool actually fits your work</h2>
        <DataTable
          head={["Situation", "Better fit", "Why"]}
          rows={[
            ["General electrical/electronics troubleshooting", "Fluke 117", "Full range of functions: voltage, resistance, continuity, diode test"],
            ["Checking current on live panels or running equipment often", "Fluke 323", "No-disconnect clamp reading, faster and safer for repeated checks"],
            ["DC current measurement", "Fluke 117", "The 323 reads AC current only"],
            ["Large AC current on a motor, feeder, or branch circuit", "Fluke 323", "Clamp range reaches 400A; in-series leads aren't built for that"],
            ["Want one tool that does everything reasonably well", "Fluke 117", "The 323 deliberately trades general function for clamp-current speed"],
          ]}
        />
        <div className="mt-4">
          <KeyIdea title="Many electricians carry both">
            This isn&apos;t really an either/or choice for anyone doing regular electrical work — a clamp
            meter and a standard multimeter solve different, complementary problems. See our{" "}
            <Link href="/multimeters/clamp-meter-buying-guide" className={link}>
              clamp meter buying guide
            </Link>{" "}
            for more on when the clamp method specifically earns its place alongside a standard meter, and
            our{" "}
            <Link href="/multimeters/fluke-117-vs-fluke-117-323-kit" className={link}>
              117 vs 117/323 kit comparison
            </Link>{" "}
            if you&apos;re deciding whether to just buy both together.
          </KeyIdea>
        </div>
      </section>
    </>
  ),
  bottomLine:
    "Don't compare these as if one replaces the other — they solve different problems. If you only need one tool and your work is general troubleshooting, the 117 covers far more ground. If you're specifically measuring AC current often, especially on live circuits where disconnecting isn't practical, the 323's clamp method is the better fit, even though it drops resistance, continuity, and diode test entirely. Many working electricians end up owning both.",
  faqs: [
    {
      question: "Can the Fluke 323 replace a standard multimeter entirely?",
      answer:
        "No — it specifically drops resistance, continuity, and diode test to focus on current and basic voltage measurement via clamp and leads. For general electrical/electronics troubleshooting beyond current checks, you'd still want a standard multimeter like the 117 alongside it.",
    },
    {
      question: "Why can't the Fluke 323 measure DC current?",
      answer:
        "Clamp current measurement for AC relies on sensing the alternating magnetic field a changing current produces; measuring DC current with a clamp meter requires a different (Hall-effect) sensing method, which the 323 isn't built with. A standard multimeter's leads, like the 117's, measure DC current directly instead.",
    },
    {
      question: "Is the 323's CAT IV 300V rating actually better than the 117's CAT III 600V?",
      answer:
        "They cover different things, not a strict better-or-worse: CAT IV extends closer to a service entrance or main feed at a given voltage, while CAT III 600V covers standard panels and branch circuits at a higher voltage ceiling. Match the rating to the specific point in the system you're working at, not just the number.",
    },
    {
      question: "Do I need both a 117 and a 323, or can I just buy the 117/323 kit?",
      answer:
        "The kit bundles both tools at a combined price — see our dedicated comparison of the 117 against the 117/323 kit for whether the bundle makes sense over buying just the 117 alone.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Clamp Meter Buying Guide", href: "/multimeters/clamp-meter-buying-guide" },
    { label: "Fluke 117 vs Fluke 117/323 Kit", href: "/multimeters/fluke-117-vs-fluke-117-323-kit" },
    { label: "Fluke 117 vs Fluke 87V", href: "/multimeters/fluke-117-vs-fluke-87v" },
  ],
};

export default function Fluke117VsFluke323Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
