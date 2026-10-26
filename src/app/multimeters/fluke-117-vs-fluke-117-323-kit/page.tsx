// Specs per Fluke, checked 2026-10-26:
// - Fluke 117/323 kit page (contents and both tools' specs):
//   https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-117-323-kit
//   (117 with silicone leads and holster; 323 with leads and soft case; TL175 leads; TPAK hanger; soft carrying case)
// - Fluke 323 page: https://www.fluke.com/en-us/product/electrical-testing/clamp-meters/fluke-323
//   (400.0 A AC True RMS, ±(2% + 5) at 45 to 65 Hz; 600.0 V AC/DC; 400.0 Ω / 4000 Ω; 30 mm max conductor;
//   CAT III 600 V / CAT IV 300 V; 265 g; 2-year warranty; no DC current)
// - Fluke 117: 6.000 A and 10.00 A AC/DC, 20 A for 30 s; 550 g; 3-year warranty (kit page and 110 Series datasheet).
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-117-vs-fluke-117-323-kit";

export const metadata = buildMetadata({
  title: "Fluke 117 vs Fluke 117/323 Kit",
  description:
    "Fluke 117 vs the 117/323 kit: the same multimeter, with or without a bundled True RMS clamp meter. Whether the extra cost is worth it depends on one thing.",
  path: "/multimeters/fluke-117-vs-fluke-117-323-kit",
});

const link = "text-accent hover:underline";

/** Series current measurement with the 117 against clamping the 323 around one conductor. */
function SeriesVsClampDiagram() {
  return (
    <svg
      viewBox="0 0 360 180"
      className="w-full h-auto"
      role="img"
      aria-label="Two ways to measure current. Left: the circuit is opened and the Fluke 117 is wired in series, so all the load current, up to 10 amps, flows through the meter's fused input. Right: the Fluke 323's jaw closes around one intact conductor and senses its magnetic field, up to 400 amps AC, with no break in the circuit."
    >
      <text x="88" y="14" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">117: in series</text>
      <rect x="14" y="30" width="148" height="100" rx="8" className="fill-none stroke-border" strokeWidth="1" strokeDasharray="4 3" />
      <path d="M30 120 V50 H66" className="fill-none stroke-foreground" strokeWidth="2" />
      <path d="M110 50 H146 V120 H30" className="fill-none stroke-foreground" strokeWidth="2" />
      <circle cx="66" cy="50" r="3" className="fill-foreground" />
      <circle cx="110" cy="50" r="3" className="fill-foreground" />
      <path d="M66 50 V72 H78 M98 72 H110 V50" className="fill-none stroke-accent" strokeWidth="1.8" />
      <circle cx="88" cy="72" r="11" className="fill-surface stroke-accent" strokeWidth="2" />
      <text x="88" y="76" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-accent">A</text>
      <text x="88" y="44" fontSize="8.5" textAnchor="middle" className="fill-muted">circuit opened</text>
      <rect x="128" y="78" width="14" height="28" rx="2" className="fill-surface stroke-foreground" strokeWidth="1.5" />
      <text x="135" y="118" fontSize="8" textAnchor="middle" className="fill-muted">load</text>
      <text x="22" y="92" fontSize="8" className="fill-muted">supply</text>
      <text x="88" y="148" fontSize="9" textAnchor="middle" className="fill-foreground">All current flows through the meter</text>
      <text x="88" y="162" fontSize="8.5" textAnchor="middle" className="fill-muted">10 A max (20 A for 30 s), fused</text>

      <text x="272" y="14" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">323: clamp</text>
      <rect x="198" y="30" width="148" height="100" rx="8" className="fill-none stroke-border" strokeWidth="1" strokeDasharray="4 3" />
      <path d="M214 120 V50 H330 V120 H214" className="fill-none stroke-foreground" strokeWidth="2" />
      <rect x="312" y="78" width="14" height="28" rx="2" className="fill-surface stroke-foreground" strokeWidth="1.5" />
      <text x="319" y="118" fontSize="8" textAnchor="middle" className="fill-muted">load</text>
      <ellipse cx="262" cy="50" rx="17" ry="14" className="fill-none stroke-accent" strokeWidth="4" />
      <path d="M262 64 V96" className="stroke-accent" strokeWidth="5" strokeLinecap="round" />
      {[22, 28].map((r) => (
        <ellipse key={r} cx="262" cy="50" rx={r + 6} ry={r - 2} className="fill-none stroke-accent" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.6" />
      ))}
      <text x="272" y="148" fontSize="9" textAnchor="middle" className="fill-foreground">Jaw senses the field; wire stays intact</text>
      <text x="272" y="162" fontSize="8.5" textAnchor="middle" className="fill-muted">400 A AC max, one conductor only</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 117 vs Fluke 117/323 Kit",
  path,
  published: "2026-10-22",
  updated: "2026-10-26",
  intro:
    "This isn't a comparison between two different meters: the 117/323 kit includes the 117 itself, plus a 323 True RMS clamp meter, an extra set of TL175 test leads, a TPAK magnetic hanger and a carrying case. The real question is whether you'll use the 323's clamp current capability, which reaches 400A AC without opening the circuit, enough to justify the kit's higher price over the 117 on its own.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 117")!,
    reviewHref: "/multimeters/fluke-117-review",
    imageAlt: "Fluke 117 digital multimeter",
    chooseIf: [
      "You rarely need AC current on live circuits, or loads stay under 10A where series measurement works",
      "You want the lowest-cost way into the 117's True RMS, VoltAlert and LoZ feature set",
      "You already own a separate clamp meter, or don't need one",
      "You'd rather add a clamp later once you know you need it",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 117/323 Kit")!,
    reviewHref: undefined,
    imageAlt: "Fluke 117/323 multimeter and clamp meter combo kit",
    chooseIf: [
      "You want both a general multimeter and a clamp meter from day one, without separate purchases",
      "You regularly read motor, feeder or appliance current above 10A",
      "You want the included carrying case and TPAK hanger for keeping both tools organized",
      "You'd otherwise buy a 323 separately within the year",
    ],
  },
  extraSpecs: [
    {
      label: "Includes",
      a: "Fluke 117 with test leads and holster",
      b: "Fluke 117 + Fluke 323 (with leads and soft case) + TL175 leads + TPAK + carrying case",
    },
    { label: "Clamp AC current", a: "No", b: "Yes, 400.0 A AC True RMS (via the 323)" },
    { label: "Series current (meter in circuit)", a: "6.000 A and 10.00 A AC/DC; 20 A for 30 s", b: "Same, via the included 117" },
    { label: "DC current by clamp", a: "No", b: "No (the 323 reads AC current only)" },
    { label: "Largest conductor clamped", a: "Not applicable", b: "30 mm (600 MCM)" },
    { label: "Safety ratings", a: "117: CAT III 600V", b: "117: CAT III 600V; 323: CAT III 600V / CAT IV 300V" },
    { label: "Weight", a: "550 g", b: "550 g (117) + 265 g (323)" },
    { label: "Warranty", a: "3 years", b: "3 years (117); 2 years (323)" },
    { label: "Carrying case", a: "Not included", b: "Included soft case" },
  ],
  differences: [
    "The kit is the 117 plus a Fluke 323 True RMS clamp meter, TL175 test leads, a TPAK magnetic hanger and a carrying case, not a different or upgraded multimeter.",
    "Buying the kit costs more upfront than the 117 alone; whether it beats buying the 117 and a 323 separately depends on the day's prices for all three listings.",
    "The 323 adds no-disconnect AC current measurement up to 400A, 40 times the 117's 10A continuous limit.",
    "The 323 cannot read DC current, so DC loads above 10A (battery banks, vehicle starters) still need a different tool.",
    "If you don't need clamp current measurement, the kit's extra cost buys you a tool you won't use.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 117 vs 117/323 kit spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          The 117 in the box is identical, so the only specs that differ are the ones the 323 brings. Two numbers
          sum it up: how much current you can read, and how you have to connect to read it.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Highest continuous AC current, on a log scale: 10A in series on the 117, 400A by clamp on the 323.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 117 (series)", value: 10, display: "10 A" },
                { label: "Fluke 323 (clamp)", value: 400, display: "400 A", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Weight of each tool in grams, per Fluke. The clamp is under half the multimeter&apos;s weight.</>}>
            <BarChart
              items={[
                { label: "Fluke 117", value: 550, display: "550 g" },
                { label: "Fluke 323", value: 265, display: "265 g", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The clamp is not a second multimeter. Fluke lists the 323 with 600 V AC and DC, resistance on 400 Ω and
          4000 Ω ranges, and continuity, but no capacitance, frequency, diode test or DC current. Its AC current
          accuracy is ±(2% + 5 digits) at 45 to 65 Hz. Treat it as the current tool and the 117 as everything else.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Series meter vs clamp: what changes on the job</h2>
        <p className="text-muted leading-7 mb-4">
          To read current with the 117 you switch off, open the circuit, wire the meter into the gap so the load
          current runs through its fused A input, then power up. That works on a lamp circuit or a small motor, but
          it&apos;s slow and it&apos;s capped at 10A continuous. The 323 reads the magnetic field around one
          conductor, so you close the jaw around a live wire and read the current without disturbing anything.
        </p>
        <Figure caption={<>Why the clamp is faster and reaches higher currents: no break in the circuit, nothing flows through the meter.</>}>
          <SeriesVsClampDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Clamp one conductor at a time. Around a whole cable the outgoing and returning currents cancel and the
          display reads near zero, which is the most common clamp-meter mistake. Our{" "}
          <Link href="/multimeters/how-to-measure-ac-current-with-a-clamp-meter" className={link}>
            guide to measuring AC current with a clamp meter
          </Link>{" "}
          covers line splitters and reading small currents, and the{" "}
          <Link href="/multimeters/can-you-measure-current-without-breaking-the-circuit-with-a-multimeter" className={link}>
            no-break current explainer
          </Link>{" "}
          shows what a multimeter alone can and can&apos;t do.
        </p>
        <div className="mt-4">
          <Callout title="Respect the ratings on each tool">
            The 117 is CAT III 600V; the 323 adds CAT IV 300V, which allows origin-of-installation work only on
            systems up to 300 V to earth. The 117 has no CAT IV rating at all. Never put the 117&apos;s A input across a voltage source, and keep
            series current measurements under 10A. If you aren&apos;t qualified to work inside a live panel, call a
            licensed electrician.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Your situation", "Better choice", "Why"]}
          rows={[
            ["You'll read motor, feeder or appliance amps regularly", "117/323 Kit", "400A AC by clamp, no circuit break"],
            ["You only need general multimeter functions", "Fluke 117 alone", "No reason to pay for a clamp meter you won't use"],
            ["You already own a clamp meter from another brand", "Fluke 117 alone", "The kit's 323 would be redundant"],
            ["Your current work is mostly DC (solar, vehicles)", "Fluke 117 alone", "The 323 has no DC current; look at a DC clamp instead"],
            ["You're equipping a toolkit from scratch", "117/323 Kit", "Both measurement types and a case in one purchase"],
          ]}
        />
        <div className="mt-4">
          <KeyIdea title="Still deciding if you need a clamp meter at all?">
            See our{" "}
            <Link href="/multimeters/fluke-117-vs-fluke-323" className={link}>
              Fluke 117 vs Fluke 323 comparison
            </Link>{" "}
            for a closer look at what the clamp meter adds and gives up compared to a standard multimeter, and our{" "}
            <Link href="/multimeters/clamp-meter-buying-guide" className={link}>
              clamp meter buying guide
            </Link>{" "}
            for the broader buying considerations.
          </KeyIdea>
        </div>
        <p className="text-muted leading-7 mt-4">
          A useful test: think of the last ten electrical jobs you did. If two or more involved finding out how many
          amps a breaker, motor or appliance was drawing, the kit earns its place. If current only came up when
          you were checking a fuse or a battery, the 117 alone is the better spend.
        </p>
      </section>
    </>
  ),
  bottomLine:
    "There's no meaningful downside to the 117 itself in either option: the kit simply adds a 323 clamp meter, TL175 leads, a TPAK hanger and a case on top of it. Buy the kit if you have a real, regular need for AC current above 10A or without breaking the circuit. Buy the 117 alone if you don't, rather than paying for a clamp meter you won't use.",
  faqs: [
    {
      question: "Is the Fluke 117 inside the kit a different or lesser version?",
      answer:
        "No. Fluke lists the same 117 in the kit, with its own silicone test leads and holster, so its True RMS, VoltAlert, LoZ and 3-year warranty are unchanged. The kit simply bundles the 323 clamp meter and accessories alongside it rather than selling it alone.",
    },
    {
      question: "Does the kit save money compared to buying both tools separately?",
      answer:
        "Often, but not always: street prices for the kit and both tools move independently. Compare the current Amazon price of the kit against the 117 and the 323 listed separately on the day you buy, since a promotion on either can change the answer.",
    },
    {
      question: "Can I buy just the 323 clamp meter later if I start with the 117 alone?",
      answer:
        "Yes. The 323 is sold on its own, so starting with the 117 and adding a 323 later is a sensible path if you're not sure you'll need clamp current. You give up the bundled case and TPAK, but you avoid paying for a tool that might sit unused.",
    },
    {
      question: "What's the TPAK included in the kit?",
      answer:
        "It's Fluke's ToolPak magnetic meter hanger. A strap and magnet let you hang the meter on a steel panel door or enclosure at eye level, leaving both hands free for the probes. It's a small accessory, but it makes panel work noticeably easier and safer.",
    },
    {
      question: "Can the Fluke 323 measure DC current from a car or solar system?",
      answer:
        "No. Fluke lists AC current only for the 323, so it reads nothing useful around a battery cable or solar string. For DC current under 10A you can wire the 117 in series; above that you'd need a clamp meter that specifically lists DC amps.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 117 vs Fluke 323", href: "/multimeters/fluke-117-vs-fluke-323" },
    { label: "Fluke 15B+ vs Fluke 117/323 Kit", href: "/multimeters/fluke-15b-plus-vs-fluke-117-323-kit" },
    { label: "Clamp Meter Buying Guide", href: "/multimeters/clamp-meter-buying-guide" },
  ],
};

export default function Fluke117VsFluke117323KitPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
