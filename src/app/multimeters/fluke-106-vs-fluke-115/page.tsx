// Fluke 106 per https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-106 and the Fluke
// 106/107 Users Manual, as cited on /multimeters/fluke-117-vs-fluke-106 and /multimeters/fluke-106-vs-fluke-114
// (checked 2026-10-26/27): average-responding, positioned for "everyday applications, where true-rms accuracy isn't
// needed"; 6,000 counts, 3 updates/s; DC V 6/60/600 V ±(0.5% + 3); AC V 40-500 Hz ±(1.0% + 3); AC mV 600.0 mV
// ±(3.0% + 3); volts input >10 MΩ, <100 pF; current 4.000 A / 10.00 A AC and DC ±(1.5% + 3), AC current 40-200 Hz, no mA
// or µA ranges; resistance 400.0 Ω to 40.00 MΩ; capacitance 50 nF to 1,000 µF, readings take up to 18 s to settle;
// continuity beeps below 70 Ω; auto power off after 20 min; 2 × AAA, 200 h minimum; 142 × 69 × 28 mm, 200 g; IP40;
// CAT III 600V; diode, frequency and duty cycle are 107 only. Conflicts: the Pick's verdict mentions data hold, but
// Fluke's 106 page doesn't list hold or a backlight; warranty 2 years per the 106/107 documentation, while the 106 page
// states none. Amazon B0GPF3FDT7 "Fluke 106 (U.S.)" in stock at ZIP 10001 (checked 2026-11-08).
// Fluke 115 per https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-115 and the
// 114/115/116/117 datasheet (2793260b, 08/2020), as cited on /multimeters/fluke-15b-plus-vs-fluke-115: True RMS;
// CAT III 600V; 6,000 counts at 4 updates/s plus a 33-segment bar graph at 32/s; backlight; DC V ±(0.5% + 2); AC V
// ±(1.0% + 3), 45-500 Hz; 6.000 A and 10.00 A only, DC ±(1.0% + 3), AC ±(1.5% + 3), 1 mA best resolution; 40 MΩ;
// 1 nF to 9,999 µF; frequency to 50 kHz (2020 manual: 99.99 kHz); continuity below about 20 Ω, catches opens and
// shorts of 500 µs or longer; Min/Max/Avg with elapsed time; one 9 V, 400 h typical; 167 × 84 × 46 mm; 550 g;
// 3-year warranty. Amazon B000OCFFMW in stock at ZIP 10001 (checked 2026-11-08).
// Worked tolerances on this page are arithmetic on those published specs; the 45 Ω example is illustrative.
import Link from "@/components/AppLink";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-106-vs-fluke-115";
const f106 = picks.find((p) => p.name === "Fluke 106")!;
const f115 = picks.find((p) => p.name === "Fluke 115")!;

export const metadata = buildMetadata({
  title: "Fluke 106 vs 115: Pocket Meter or Field Meter?",
  description:
    "Fluke 106 vs 115: continuity thresholds, capacitance range, current ranges and True RMS compared with Fluke's own numbers, plus which one to carry.",
  path: "/multimeters/fluke-106-vs-fluke-115",
  image: f115.image,
});

const link = "text-accent hover:underline";

/** Continuity beep thresholds on a resistance scale, with an illustrative 45 Ω path that only the 106 calls "continuous". */
function ContinuityDiagram() {
  const x0 = 30;
  const x1 = 370;
  const max = 100;
  const px = (ohm: number) => x0 + (ohm / max) * (x1 - x0);
  return (
    <svg
      viewBox="0 0 400 200"
      className="w-full h-auto"
      role="img"
      aria-label="Fluke 106 vs 115 continuity thresholds on a 0 to 100 ohm scale: the Fluke 115 beeps below about 20 ohms and the Fluke 106 below 70 ohms. An illustrative 45 ohm path, such as a corroded connection or a long thin wire, makes the 106 beep but not the 115."
    >
      <text x={x0} y="18" fontSize="10" fontWeight="700" className="fill-foreground">Where each meter beeps on continuity</text>
      {/* scale */}
      <line x1={x0} x2={x1} y1="150" y2="150" className="stroke-foreground" strokeWidth="1.2" />
      {[0, 20, 40, 60, 70, 80, 100].map((o) => (
        <g key={o}>
          <line x1={px(o)} x2={px(o)} y1="146" y2="154" className="stroke-foreground" strokeWidth="1" />
          <text x={px(o)} y="168" fontSize="8.5" textAnchor="middle" className="fill-muted">{o} Ω</text>
        </g>
      ))}
      {/* 115 band */}
      <rect x={px(0)} y="40" width={px(20) - px(0)} height="30" rx="3" className="fill-accent/30 stroke-accent" strokeWidth="1" />
      <text x={px(0) + 4} y="34" fontSize="9" fontWeight="700" className="fill-foreground">Fluke 115: beeps below about 20 Ω</text>
      {/* 106 band */}
      <rect x={px(0)} y="90" width={px(70) - px(0)} height="30" rx="3" className="fill-accent/15 stroke-foreground" strokeWidth="1" />
      <text x={px(0) + 4} y="84" fontSize="9" fontWeight="700" className="fill-foreground">Fluke 106: beeps below 70 Ω</text>
      {/* 45 ohm marker */}
      <line x1={px(45)} x2={px(45)} y1="40" y2="150" className="stroke-accent" strokeWidth="1.6" strokeDasharray="4 3" />
      <circle cx={px(45)} cy="150" r="3.5" className="fill-accent" />
      <text x={px(45) + 6} y="62" fontSize="8.5" className="fill-muted">45 Ω path: 115 silent</text>
      <text x={px(45) + 6} y="110" fontSize="8.5" className="fill-accent">106 beeps</text>
      <text x={x0} y="190" fontSize="8.5" className="fill-muted">45 Ω is an illustrative value; thresholds are Fluke&apos;s published figures.</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 106 vs 115",
  path,
  published: "2026-11-08",
  intro:
    "Fluke 106 vs 115 sets Fluke's cheapest current-measuring pocket meter against its field-service meter. Both show 6,000 counts, both are CAT III 600V and both read up to 10 A. The 115 adds True RMS, a bar graph, frequency, Min/Max/Avg, a backlight and capacitance to 9,999 µF. The 106 weighs 200 g against 550 g, fits a shirt pocket and costs less. The differences that catch buyers out are smaller ones, like where each meter beeps on continuity.",
  a: {
    pick: f106,
    reviewHref: "/multimeters/fluke-106-review",
    imageAlt: "Fluke 106 palm-sized digital multimeter, front view",
    chooseIf: [
      "You want a 200 g Fluke for a glovebox, a toolbag pocket or a homeowner's drawer",
      "You check batteries, outlets, fuses and heater elements, all sine-wave or DC work",
      "A 4 A range is useful to you, with 1 mA steps like the 115",
      "You accept no frequency, no backlight and no bar graph",
    ],
  },
  b: {
    pick: f115,
    reviewHref: "/multimeters/fluke-115-review",
    imageAlt: "Fluke 115 True RMS field service multimeter, front view",
    chooseIf: [
      "You measure LED drivers, electronic ballasts, dimmers or drive inputs, where True RMS matters",
      "You want a tighter continuity beep and a bar graph for intermittent faults",
      "You test run capacitors and supply capacitors above 1,000 µF",
      "You want Min/Max/Avg, frequency to 50 kHz and a backlight",
    ],
  },
  extraSpecs: [
    { label: "AC response", a: "Average-responding (not True RMS)", b: "True RMS" },
    { label: "Display", a: "6,000 counts, 3 updates/s", b: "6,000 counts, 4 updates/s, 33-segment bar graph" },
    { label: "DC volts accuracy", a: "±(0.5% + 3)", b: "±(0.5% + 2)" },
    { label: "AC volts accuracy", a: "±(1.0% + 3), 40–500 Hz", b: "±(1.0% + 3), 45–500 Hz" },
    { label: "Current ranges", a: "4.000 A and 10.00 A; AC 40–200 Hz", b: "6.000 A and 10.00 A" },
    { label: "Capacitance", a: "50 nF to 1,000 µF; up to 18 s to settle", b: "1 nF to 9,999 µF" },
    { label: "Continuity beep", a: "Below 70 Ω", b: "Below about 20 Ω; catches 500 µs opens and shorts" },
    { label: "Frequency", a: "None (107 only)", b: "To 50 kHz" },
    { label: "Min/Max/Avg, backlight", a: "Not listed by Fluke", b: "Yes, both" },
    { label: "Battery", a: "2 × AAA, 200 h minimum", b: "One 9 V, about 400 h typical" },
    { label: "Size and weight", a: "142 × 69 × 28 mm, 200 g; IP40", b: "167 × 84 × 46 mm, 550 g" },
    { label: "Warranty", a: "2 years (106/107 documentation)", b: "3 years" },
  ],
  differences: [
    "True RMS: the 115 is True RMS. Fluke positions the 106 for work where True RMS isn't needed.",
    "Continuity: the 106 beeps below 70 Ω, the 115 below about 20 Ω, and the 115 also catches opens and shorts as short as 500 µs.",
    "Capacitance: the 106 tops out at 1,000 µF and can take up to 18 seconds to settle; the 115 reaches 9,999 µF.",
    "Current: the 106 has 4 A and 10 A ranges, the 115 has 6 A and 10 A. Neither has a mA or µA range.",
    "Extras: the 115 adds frequency, Min/Max/Avg, a 33-segment bar graph and a backlight. Fluke lists none of these on the 106.",
    "Size: the 106 is 200 g and 28 mm thick; the 115 is 550 g and 46 mm thick.",
    "Warranty: 2 years on the 106 per its documentation, 3 years on the 115.",
    "The Fluke 115 carries our Hands-on Tested badge; the 106 assessment is desk research from Fluke's published specs.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Same 6,000 counts, near-identical basic accuracy</h2>
        <p className="text-muted leading-7 mb-4">
          On a car battery or a wall outlet these two meters will agree to within a digit or two. Fluke gives both an
          AC volts spec of ±(1.0% + 3). On DC the 106 allows one extra digit, ±(0.5% + 3) against ±(0.5% + 2).
        </p>
        <p className="text-muted leading-7 mb-4">
          Worked on a 12.60 V reading, both on their 60 V range with 0.01 V steps: the 106 allows 0.063 V plus 0.03 V,
          so ±0.093 V. The 115 allows 0.063 V plus 0.02 V, so ±0.083 V. On a 120.0 V outlet, both allow 1.2 V plus 0.3
          V, so ±1.5 V. Neither difference changes a decision you would make with the reading. If you only ever check
          batteries and sine-wave outlets, the 106 measures them as well as the 115 does.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Worst-case tolerance on a 12.60 V battery, from each maker spec. The gap is one digit.</>}>
            <BarChart
              items={[
                { label: "Fluke 106", value: 0.093, display: "±0.093 V" },
                { label: "Fluke 115", value: 0.083, display: "±0.083 V", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Top of the capacitance range, log scale. The 115 reaches about ten times higher.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 106", value: 1000, display: "1,000 µF" },
                { label: "Fluke 115", value: 9999, display: "9,999 µF", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          True RMS is the big accuracy difference, and it only shows up on distorted waveforms. The{" "}
          <Link href="/multimeters/fluke-117-vs-fluke-106" className={link}>
            Fluke 117 vs 106
          </Link>{" "}
          page works through that arithmetic, and the 115 is True RMS just as the 117 is. If your loads
          are LED drivers, computer supplies, dimmers or variable-speed equipment, take the 115.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Continuity: 70 Ω against 20 Ω</h2>
        <p className="text-muted leading-7 mb-4">
          This is the difference most spec tables leave out. The 106 beeps on anything below 70 Ω. The 115 beeps below
          about 20 Ω and, per Fluke&apos;s datasheet, also catches opens and shorts that last 500 µs or longer.
        </p>
        <Figure
          caption={
            <>
              Beep thresholds from Fluke&apos;s published specs. A path between the two thresholds beeps on the 106 and
              stays silent on the 115.
            </>
          }
        >
          <ContinuityDiagram />
        </Figure>
        <p className="text-muted leading-7 my-4">
          A wide threshold isn&apos;t wrong; it is a different design choice. For a fuse, a switch or a broken extension
          cord, both meters give the same answer, because good paths read under 1 Ω and broken ones read open. The 106
          can mislead on paths that are poor but not open, such as a corroded ground strap, a loose crimp or a small
          resistor in a circuit you thought was a plain wire. Those beep happily on the 106. On the 115 they stay
          silent, and the display shows the actual resistance.
        </p>
        <KeyIdea title="Read the number, not just the beep">
          On either meter, glance at the display when it beeps. A wire should read well under 1 Ω plus the leads. A
          reading of tens of ohms on a path that should be copper is a fault, even when the 106 beeps. Our guide to{" "}
          <Link href="/multimeters/how-to-test-continuity-with-a-multimeter" className={link}>
            testing continuity
          </Link>{" "}
          covers lead resistance and how to zero it out.
        </KeyIdea>
        <p className="text-muted leading-7 mt-4">
          The 500 µs capture matters for intermittent faults. Wiggle a harness or a cord while watching the 115 and it
          will register a break too short to see on the display. The 106 updates three times a second with no bar
          graph and no capture spec, so a brief dropout can pass between readings. The{" "}
          <Link href="/multimeters/how-to-find-an-intermittent-electrical-fault-with-a-multimeter" className={link}>
            intermittent fault guide
          </Link>{" "}
          shows the method.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Current and capacitors on a service call</h2>
        <p className="text-muted leading-7 mb-4">
          Both meters measure current through the leads only on amp ranges: 4 A and 10 A on the 106, 6 A and 10 A on
          the 115. Neither has a milliamp or microamp range. The 106&apos;s AC current spec covers 40–200 Hz, which is
          fine for 60 Hz loads. On either meter, a reading of a 6 A space heater uses the 10 A input; the 106 switches
          to its 10 A range above 4 A, the 115 above 6 A.
        </p>
        <p className="text-muted leading-7 mb-4">
          For capacitors, the 106 covers 50 nF to 1,000 µF, and Fluke&apos;s manual warns readings can take up to 18
          seconds to settle. That handles a motor-run capacitor rated in tens of µF. It doesn&apos;t handle the large
          electrolytics in an amplifier or inverter, which often exceed 1,000 µF; the 115 reads to 9,999 µF. The 115
          also starts at 1 nF, so small film capacitors are within its range where the 106 starts at 50 nF.
        </p>
        <Callout title="Discharge before you measure">
          Capacitors in furnaces, condensers and power supplies can hold a dangerous charge after the power is off. Both
          meters are CAT III 600V, but neither protects you from touching a charged terminal. Switch off, verify zero
          volts with the meter, discharge the capacitor safely, then switch to capacitance. If you are unsure how,
          call an HVAC technician or electrician.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Size, battery and the backup-meter question</h2>
        <p className="text-muted leading-7 mb-4">
          The 106 is 142 × 69 × 28 mm and 200 g. The 115 is 167 × 84 × 46 mm and 550 g, which is closer to a hand
          tool than a pocket item. The 106 runs on two AAA cells with a 200-hour minimum; the 115 on one 9 V battery at
          about 400 hours typical. Fluke gives a minimum for one and a typical figure for the other, so don&apos;t read
          the gap as an exact two to one.
        </p>
        <p className="text-muted leading-7">
          A common setup in a service van is a 115 or 117 as the main meter and a palm-size meter as the backup that
          lives in a jacket. The 106 suits that backup role for voltage and resistance checks. If you want the backup
          to also do frequency and diode test, the{" "}
          <Link href="/multimeters/fluke-106-vs-fluke-107" className={link}>
            Fluke 106 vs 107
          </Link>{" "}
          page shows what the 107 adds for little extra size.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 106 vs 115: which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Better fit", "Why"]}
          rows={[
            ["Homeowner checking outlets, batteries and fuses", "Fluke 106", "Same basic accuracy at 200 g"],
            ["Glovebox or backup meter", "Fluke 106", "28 mm thick, two AAA cells"],
            ["LED drivers, dimmers, drive inputs", "Fluke 115", "True RMS"],
            ["Loose crimps, corroded grounds, intermittent cords", "Fluke 115", "Beeps below about 20 Ω and catches 500 µs breaks"],
            ["Large supply capacitors", "Fluke 115", "Reads to 9,999 µF against 1,000 µF"],
            ["Working in a dark panel or crawlspace", "Fluke 115", "Backlight; Fluke lists none on the 106"],
            ["Checking a PWM or frequency signal", "Fluke 115", "Frequency to 50 kHz; the 106 has none"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Our verdict: the 115 is the better meter for anyone who fixes things for a living, mainly for True RMS and
          the tighter continuity test. The 106 is the right buy when weight and size come first and your loads are
          batteries, heaters and plain mains. For other 115 matchups, see{" "}
          <Link href="/multimeters/fluke-107-vs-fluke-115" className={link}>
            Fluke 107 vs 115
          </Link>
          ,{" "}
          <Link href="/multimeters/fluke-115-vs-fluke-101" className={link}>
            Fluke 115 vs 101
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/fluke-115-vs-fluke-117" className={link}>
            Fluke 115 vs 117
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "The Fluke 115 is the better working meter: True RMS, a continuity beep below about 20 Ω with 500 µs capture, capacitance to 9,999 µF, frequency, Min/Max/Avg and a backlight. The Fluke 106 matches its basic volts accuracy at 200 g, so it suits a backup or household meter for batteries, outlets and fuses.",
  chooseNeitherIf:
    "You need milliamps or microamps for sensor loops, parasitic drain or flame rods: neither meter has a mA or µA range. Look at the Fluke 179 or a meter with dedicated low-current ranges.",
  faqs: [
    {
      question: "Is the Fluke 106 True RMS?",
      answer:
        "No. Fluke describes the 106 as suited to everyday applications where True RMS accuracy isn't needed. It reads sine-wave mains and DC correctly, but on distorted waveforms from LED drivers, dimmers or switch-mode supplies its AC reading can be wrong. The Fluke 115 is True RMS.",
    },
    {
      question: "Why does my Fluke 106 beep on a bad connection?",
      answer:
        "Its continuity beeper sounds below 70 Ω, so a corroded joint or loose crimp reading 30 or 50 Ω still beeps. The Fluke 115 beeps only below about 20 Ω. On either meter, check the number on the display: a good wire reads well under 1 Ω plus lead resistance.",
    },
    {
      question: "Can the Fluke 106 measure milliamps?",
      answer:
        "No. It has 4.000 A and 10.00 A ranges, so its finest current step is 1 mA and it has no microamp range. The Fluke 115 is the same, with 6.000 A and 10.00 A ranges. For 4 to 20 mA loops or parasitic drain, a meter with mA ranges such as the Fluke 179 reads with finer resolution.",
    },
    {
      question: "Does the Fluke 106 have a backlight?",
      answer:
        "Fluke's 106 product page doesn't list a backlight or data hold, although our Pick summary mentions hold, so check the unit you receive. The Fluke 115 has a backlight and Min/Max/Avg recording. If you often work in panels, attics or under sinks, the backlight is a practical reason to choose the 115.",
    },
    {
      question: "How much lighter is the Fluke 106 than the 115?",
      answer:
        "Fluke gives 200 g for the 106 and 550 g for the 115, so the 106 weighs about a third as much. It is also 28 mm thick against 46 mm, small enough for a shirt pocket. The 115 is a full-size meter meant for a holster or tool pouch.",
    },
    {
      question: "Which has the longer warranty, the Fluke 106 or 115?",
      answer:
        "The Fluke 115 carries a 3-year warranty. The 106/107 documentation gives the 106 two years, while the current US product page for the 106 states no term. If warranty length matters to you, confirm it with the seller before buying.",
    },
  ],
  roundup: { label: "See all multimeter picks", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 106 review", href: "/multimeters/fluke-106-review" },
    { label: "Fluke 115 review", href: "/multimeters/fluke-115-review" },
    { label: "Fluke 117 vs Fluke 106", href: "/multimeters/fluke-117-vs-fluke-106" },
    { label: "Fluke 106 vs Fluke 107", href: "/multimeters/fluke-106-vs-fluke-107" },
    { label: "Fluke 106 vs Fluke 101", href: "/multimeters/fluke-106-vs-fluke-101" },
    { label: "Fluke 106 vs Fluke 114", href: "/multimeters/fluke-106-vs-fluke-114" },
    { label: "Fluke 106 vs Fluke T5-600", href: "/multimeters/fluke-106-vs-fluke-t5-600" },
    { label: "Fluke 107 vs Fluke 115", href: "/multimeters/fluke-107-vs-fluke-115" },
    { label: "Fluke 115 vs Fluke 101", href: "/multimeters/fluke-115-vs-fluke-101" },
    { label: "Fluke 115 vs Fluke 117", href: "/multimeters/fluke-115-vs-fluke-117" },
    { label: "Fluke 15B+ vs Fluke 106", href: "/multimeters/fluke-15b-plus-vs-fluke-106" },
    { label: "Fluke 17B+ vs Fluke 106", href: "/multimeters/fluke-17b-plus-vs-fluke-106" },
    { label: "How to test continuity with a multimeter", href: "/multimeters/how-to-test-continuity-with-a-multimeter" },
    { label: "Do I need a True RMS multimeter?", href: "/multimeters/do-i-need-true-rms-multimeter" },
  ],
};

export default function Fluke106VsFluke115Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
