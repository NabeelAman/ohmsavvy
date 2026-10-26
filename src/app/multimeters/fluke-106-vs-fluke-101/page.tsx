// Specs per Fluke, checked 2026-10-26:
// - Fluke 106 product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-106
// - Fluke 106 datasheet (2-year warranty): https://media.fluke.com/715a70ff-286c-4b33-bc8c-b38b0159a2c1_original%20file.pdf
// - Fluke 106/107 Users Manual (three jacks: 10 A, COM, V/Ω; continuity below 70 Ω; auto power off 20 min):
//   https://media.fluke.com/8eaf269b-51d3-435f-9e69-b10800c0e4df_original%20file.pdf
// - Fluke 101 product page (India; not on fluke.com US): https://www.fluke.com/en-in/product/electrical-testing/digital-multimeters/fluke-101
//   (130 × 65 × 27 mm, 160 g, 1-year warranty, 1 m drop, frequency 10 Hz to 100 kHz, duty cycle 0.1% to 99.9%,
//   diode and continuity with buzzer, two AAA)
// Fixed 2026-10-26: the 101's duty-cycle range was given as 1–99%; Fluke's 101 page lists 0.1% to 99.9%.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-106-vs-fluke-101";

export const metadata = buildMetadata({
  title: "Fluke 106 vs Fluke 101",
  description:
    "Fluke 106 vs Fluke 101: the 106 reads current up to 10A, the smaller 101 can't read current but adds frequency and diode test. Specs, diagrams, verdict.",
  path: "/multimeters/fluke-106-vs-fluke-101",
});

const link = "text-accent hover:underline";

/** Input jacks seen from the front: the 106 has a separate 10A jack, the 101 only two. */
function JackDiagram() {
  const jack = (x: number, label: string, accent = false) => (
    <g key={label}>
      <circle cx={x} cy="40" r="13" className={accent ? "fill-accent/20 stroke-accent" : "fill-surface stroke-foreground"} strokeWidth="1.6" />
      <circle cx={x} cy="40" r="4.5" className="fill-foreground" />
      <text x={x} y="72" fontSize="10" textAnchor="middle" className="fill-muted">{label}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 340 120" className="w-full h-auto" role="img" aria-label="Input jacks: the Fluke 106 has three, including a 10 amp jack; the Fluke 101 has two">
      <text x="80" y="14" fontSize="11" textAnchor="middle" className="fill-foreground">Fluke 106</text>
      {[jack(35, "10A", true), jack(80, "COM"), jack(125, "V Ω")]}
      <text x="255" y="14" fontSize="11" textAnchor="middle" className="fill-foreground">Fluke 101</text>
      {[jack(225, "COM"), jack(285, "V Ω Hz")]}
      <line x1="170" y1="20" x2="170" y2="100" className="stroke-border" strokeDasharray="3 3" />
      <text x="170" y="114" fontSize="9" textAnchor="middle" className="fill-muted">No current jack on the 101, so no current measurement</text>
    </svg>
  );
}

/** Where the current flows when the 106 measures amps: through the 10 A jack, a fuse and a low-value shunt. */
function SeriesCurrentDiagram() {
  return (
    <svg
      viewBox="0 0 340 160"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram: to read current, the Fluke 106 is placed in series with the load so the full current passes in through its 10 amp jack, through an internal 11 amp fuse and a shunt, and out through COM"
    >
      <g className="stroke-foreground fill-none" strokeWidth="1.6" strokeLinecap="round">
        <path d="M30 40 H120 M220 40 H310 V120 H30 V40" />
      </g>
      <rect x="20" y="70" width="20" height="30" rx="3" className="fill-surface stroke-foreground" strokeWidth="1.4" />
      <text x="30" y="89" fontSize="9" textAnchor="middle" className="fill-foreground">+</text>
      <text x="14" y="112" fontSize="9" textAnchor="end" className="fill-muted">supply</text>
      <rect x="290" y="65" width="40" height="34" rx="4" className="fill-surface stroke-foreground" strokeWidth="1.4" />
      <text x="310" y="86" fontSize="9.5" textAnchor="middle" className="fill-foreground">Load</text>
      <rect x="120" y="18" width="100" height="44" rx="6" className="fill-accent/10 stroke-accent" strokeWidth="1.8" />
      <text x="133" y="35" fontSize="9" className="fill-accent">10A</text>
      <path d="M150 32 h8 l3 -5 l4 10 l4 -10 l4 10 l3 -5 h8" className="stroke-accent fill-none" strokeWidth="1.3" />
      <text x="200" y="35" fontSize="9" className="fill-accent">COM</text>
      <text x="170" y="54" fontSize="8.5" textAnchor="middle" className="fill-muted">11 A fuse + shunt</text>
      <text x="170" y="12" fontSize="9.5" textAnchor="middle" className="fill-foreground">Fluke 106 in series</text>
      <text x="170" y="140" fontSize="9" textAnchor="middle" className="fill-muted">All the load current passes through the meter. The 101 has no such path.</text>
      <text x="170" y="154" fontSize="9" textAnchor="middle" className="fill-muted">Leads on the V jack across a supply in this setup would be a short circuit.</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 106 vs Fluke 101",
  path,
  published: "2026-10-22",
  updated: "2026-10-26",
  intro:
    "The Fluke 106 vs Fluke 101 decision turns on one question: do you need to measure current? The 106 has 4A and 10A ranges; the 101 has only two input jacks and cannot read current at all. In return the 101 is smaller and lighter and adds frequency, duty cycle and a diode test that the 106 lacks. Both are CAT III 600V, 6,000-count meters that Fluke doesn't describe as True RMS.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 106")!,
    imageAlt: "Fluke 106 digital multimeter, front view",
    chooseIf: [
      "You need to measure a load's current up to 10A",
      "You want a two-year warranty and a model Fluke sells in the US",
      "You don't need diode or frequency readings",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 101")!,
    imageAlt: "Fluke 101 basic digital multimeter, front view",
    chooseIf: [
      "You only check voltage, resistance and continuity, never current",
      "You want frequency, duty cycle and a diode test in the smallest Fluke",
      "Every gram counts: it weighs 160 g",
    ],
  },
  extraSpecs: [
    { label: "Current", a: "4.000A and 10.00A ranges, AC/DC, ±(1.5% + 3)", b: "None (two jacks only)" },
    { label: "Max voltage", a: "600V AC/DC", b: "600V AC/DC" },
    { label: "DC volts accuracy", a: "±(0.5% + 3)", b: "0.5% + 3" },
    { label: "Resistance", a: "Up to 40 MΩ", b: "Up to 40 MΩ" },
    { label: "Capacitance", a: "50 nF to 1,000 µF", b: "Fluke's sources conflict: 100 µF or 1,000 µF" },
    { label: "Frequency / duty cycle", a: "No", b: "10 Hz to 100 kHz; duty cycle 0.1% to 99.9%" },
    { label: "Diode test", a: "No", b: "Yes" },
    { label: "Size", a: "142 × 69 × 28 mm", b: "130 × 65 × 27 mm" },
    { label: "Weight", a: "200 g", b: "160 g" },
    { label: "Battery", a: "2 × AAA, 200 h minimum", b: "2 × AAA (life not stated)" },
    { label: "Warranty", a: "2 years", b: "1 year" },
    { label: "US availability", a: "Sold on fluke.com US", b: "Not on fluke.com US; Amazon listing is an import" },
  ],
  differences: [
    "Only the 106 measures current; the 101 has a COM jack and a single input for everything else.",
    "The 101 adds frequency to 100 kHz, duty cycle and a diode test, none of which the 106 has.",
    "The 101 is 40 g lighter and a little smaller in every dimension.",
    "Fluke gives the 106 a two-year warranty and the 101 one year.",
    "Fluke's own 101 documents disagree on maximum capacitance (100 µF vs 1,000 µF); the 106 is listed to 1,000 µF.",
    "The 101 isn't sold on Fluke's US site, so US buyers get it through an import listing.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Why the 101 can&apos;t read current</h2>
        <p className="text-muted leading-7 mb-4">
          Measuring current means routing it through the meter, which needs a dedicated, fused current jack.
          The 106 has a 10A jack beside COM; the 101 has none, so no setting on its dial can read amps.
        </p>
        <Figure caption={<>Input jacks on each meter. The 106&apos;s extra jack (highlighted) is what makes current readings possible.</>}>
          <JackDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          A separate jack isn&apos;t a design quirk. In current mode the meter is deliberately close to a short
          circuit: a low-value shunt that drops only a small voltage while the full load current flows through it.
          Fluke protects that path on the 106 with an 11 A, 1000 V fast fuse. Sharing one jack between that shunt
          and the high-impedance voltage input would leave a dangerous short a single dial click away, so a two-jack
          meter like the 101 simply omits current.
        </p>
        <div className="mt-4">
          <Figure caption={<>Current measurement on the 106: break the circuit and let the load current pass through the meter.</>}>
            <SeriesCurrentDiagram />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 106 vs 101 spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Where both meters measure the same thing, Fluke&apos;s figures barely differ: 600 V on a 6,000-count
          display, 0.5% basic DC accuracy and resistance to 40 MΩ. The decision comes from the functions each one
          leaves out and from the practical details of size, warranty and where you can buy it.
        </p>
        <DataTable
          head={["Spec", "Fluke 106", "Fluke 101"]}
          rows={[
            ["Volts", "6.000 to 600.0 V AC/DC", "6.000 to 600.0 V AC/DC"],
            ["AC millivolts", "600.0 mV, ±(3.0% + 3)", "600.0 mV, 3.0% + 3"],
            ["Current", "4.000 A and 10.00 A, AC and DC", "None"],
            ["Resistance", "400.0 Ω to 40.00 MΩ", "400.0 Ω to 40.00 MΩ"],
            ["Capacitance", "50.00 nF to 1,000 µF", "50.00 nF up; top range 100 µF or 1,000 µF"],
            ["Frequency", "No", "10 Hz to 100 kHz"],
            ["Duty cycle", "No", "0.1% to 99.9%"],
            ["Diode test", "No", "Yes, with buzzer"],
            ["Continuity", "Beeps below 70 Ω", "Yes, with buzzer"],
            ["Drop rating", "Not stated", "1 m"],
            ["Battery life", "200 h minimum", "Not stated"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Weight from Fluke&apos;s specifications. The 101 is 20% lighter.</>}>
            <BarChart
              items={[
                { label: "Fluke 106", value: 200, display: "200 g" },
                { label: "Fluke 101", value: 160, display: "160 g", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Warranty length in years: the 106 per its Fluke datasheet, the 101 per Fluke&apos;s 101 page.</>}>
            <BarChart
              items={[
                { label: "Fluke 106", value: 2, display: "2 years", highlight: true },
                { label: "Fluke 101", value: 1, display: "1 year" },
              ]}
            />
          </Figure>
          <Figure caption={<>Case length in millimeters. Width and depth differ by only 4 mm and 1 mm.</>}>
            <BarChart
              items={[
                { label: "Fluke 106", value: 142, display: "142 mm" },
                { label: "Fluke 101", value: 130, display: "130 mm", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Case thickness in millimeters: almost identical, so both slip into a shirt pocket.</>}>
            <BarChart
              items={[
                { label: "Fluke 106", value: 28, display: "28 mm" },
                { label: "Fluke 101", value: 27, display: "27 mm", highlight: true },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Real jobs, and which meter handles them</h2>
        <p className="text-muted leading-7 mb-4">
          The 106 suits people whose questions are about loads: is the space heater drawing what its label says, is a
          motor pulling more than normal, or is a battery charger actually delivering current? With 4.000 A at 1 mA
          resolution and a 10.00 A range, it answers those directly, which the 101 cannot do at any price.
        </p>
        <p className="text-muted leading-7 mb-4">
          The 101 suits people whose questions are about signals and parts: is this LED or rectifier good, what
          frequency is this sensor putting out, what duty cycle is this fan controller commanding? Its diode test and
          100 kHz frequency range cover those, and the 1 m drop rating helps a meter that lives loose in a bag.
        </p>
        <DataTable
          head={["Task", "Fluke 106", "Fluke 101"]}
          rows={[
            ["Outlet or battery voltage", "Yes", "Yes"],
            ["Appliance current draw", "Yes, to 10 A", "No"],
            ["Continuity of a cable or fuse", "Yes", "Yes"],
            ["PWM or fan signal frequency", "No", "Yes"],
            ["Diode or LED check", "No", "Yes"],
            ["Charger output current", "Yes, in series", "No"],
          ]}
        />
        <div className="mt-4">
          <KeyIdea title="Need current without a current jack?">
            A clamp meter reads AC current around a single conductor without breaking the circuit, which pairs well
            with a 101. See{" "}
            <Link href="/multimeters/how-to-measure-ac-current-with-a-clamp-meter" className={link}>
              how to measure AC current with a clamp meter
            </Link>{" "}
            and{" "}
            <Link href="/multimeters/can-you-measure-current-without-breaking-the-circuit-with-a-multimeter" className={link}>
              whether a multimeter can measure current without breaking the circuit
            </Link>
            .
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 106 or 101: which should you buy?</h2>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["Homeowner checking appliances", "Fluke 106", "Reads running current; US warranty support"],
            ["Car owner with a glovebox meter", "Fluke 101", "Diode test for alternator diodes, duty cycle for injectors, 160 g"],
            ["Electronics hobbyist", "Fluke 101", "Frequency, duty cycle and diode test matter more than amps"],
            ["Solar or battery tinkerer", "Fluke 106", "DC current to 10 A for charge and load checks"],
            ["Electrician wanting a backup", "Fluke 106", "Current plus 2-year warranty; neither is True RMS"],
            ["Buyer who wants every function", "Neither", "The Fluke 107 has current and the 101's signal functions"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          That last row is worth a look: the Fluke 107 keeps the 106&apos;s body and current ranges and adds diode,
          frequency and duty cycle. Compare it in{" "}
          <Link href="/multimeters/fluke-106-vs-fluke-107" className={link}>
            Fluke 106 vs Fluke 107
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/fluke-107-vs-fluke-101" className={link}>
            Fluke 107 vs Fluke 101
          </Link>
          .
        </p>
      </section>

      <Callout title="Safety: never leave leads in the current jack">
        After measuring current on the 106, move the red lead back to the V Ω jack before you measure voltage. A lead
        left in the 10A jack and placed across a supply puts a near short across it; the fuse should open, but the
        arc can still hurt you. Both meters are CAT III 600V, so keep them off the service drop and meter base, and
        call a licensed electrician if a reading at the panel makes no sense.
      </Callout>
    </>
  ),
  bottomLine:
    "Pick the Fluke 106 if you will ever measure current: it's the only one of the two that can, and it carries a longer warranty and US availability. Pick the Fluke 101 only as an ultra-light voltage, continuity and signal checker, where its frequency and diode functions matter more than amps.",
  faqs: [
    {
      question: "Can the Fluke 101 measure current?",
      answer:
        "No. The 101 has only two input jacks, COM and one input for voltage, resistance and its other functions, and Fluke's documents list no current function. Measuring current in series needs a separate fused jack and shunt, which the 106 has. A 101 owner who needs AC current would pair it with a clamp meter.",
    },
    {
      question: "Which is smaller, the Fluke 101 or 106?",
      answer:
        "The 101, at 130 × 65 × 27 mm and 160 g, against the 106's 142 × 69 × 28 mm and 200 g. The difference is mostly length; both fit a jacket pocket. The 101 also carries a 1 m drop rating on Fluke's spec page, while Fluke's 106 page doesn't list one.",
    },
    {
      question: "Does the Fluke 106 measure frequency?",
      answer:
        "No. Fluke's 106/107 manual lists frequency and duty cycle as 107-only functions, along with the diode test. The 101 measures frequency from 10 Hz to 100 kHz and duty cycle, so for signal checks it is the more capable of these two, despite having no current function.",
    },
    {
      question: "What warranty do the Fluke 101 and 106 have?",
      answer:
        "Fluke's 106 datasheet gives two years, while Fluke's 101 page gives one year. Because the 101 isn't sold through Fluke's US site, warranty service for a US buyer may also be less straightforward than for the 106, so check the importer's terms on the Amazon listing before you buy.",
    },
    {
      question: "Is the Fluke 101 sold in the US?",
      answer:
        "Fluke's US site doesn't offer it; it's listed on Fluke's Indian and Malaysian sites. US Amazon listings come from third-party importers. If you want a palm-sized Fluke that Fluke sells and supports in the US, the 106 and 107 are the models to look at.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 106 vs Fluke 107", href: "/multimeters/fluke-106-vs-fluke-107" },
    { label: "Fluke 107 vs Fluke 101", href: "/multimeters/fluke-107-vs-fluke-101" },
    { label: "Fluke 117 vs Fluke 101", href: "/multimeters/fluke-117-vs-fluke-101" },
    { label: "Fluke 106 vs Fluke T5-600", href: "/multimeters/fluke-106-vs-fluke-t5-600" },
    { label: "Fluke 101 vs Fluke T5-600", href: "/multimeters/fluke-101-vs-fluke-t5-600" },
    { label: "Clamp meter buying guide", href: "/multimeters/clamp-meter-buying-guide" },
  ],
};

export default function Fluke106VsFluke101Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
