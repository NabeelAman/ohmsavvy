// Specs per Fluke, checked 2026-10-26:
// - Fluke 101 product page (India): https://www.fluke.com/en-in/product/electrical-testing/digital-multimeters/fluke-101
//   DC V 6.000/60.00/600.0 V ±(0.5% + 3); AC V 600.0 mV to 600.0 V (40-500 Hz) ±(1.0% + 3), 600 mV ±(3.0% + 3);
//   resistance 400.0 Ω to 40.00 MΩ, ±(0.5% + 2) mid ranges, ±(1.5% + 3) on 40 MΩ; capacitance 50.00 nF to 1000 µF (no accuracy
//   stated); frequency 10 Hz to 100 kHz; diode and continuity with buzzer; 2 × AAA; 130 × 65 × 27 mm; 160 g; 1 m drop per
//   IEC 61010-1; CAT III 600 V; 1-year warranty; auto shutoff. The Pick also records a 6,000-count display, and that
//   capacitance limits differ between Fluke documents (100 µF / 1,000 µF).
// - Fluke T5-600 product page: https://www.fluke.com/en-us/product/electrical-testing/basic-testers/fluke-t5-600
//   AC V to 600 V, 1 V resolution, ±(1.5% + 2); DC V to 600 V, 1 V resolution, ±(1% + 1); auto AC/DC; AC current 100.0 A,
//   0.1 A resolution, ±(3% + 3), 50/60 Hz, 12.9 mm jaw opening, max 1/0 THHN; no DC current; resistance to 1000 Ω, 1 Ω
//   resolution, ±(1% + 2); continuity on below 25 Ω, off above 400 Ω; averaging AC response; 2 × AA, 400 h alkaline;
//   30.5 × 51 × 203 mm; 300 g; 3 m (10 ft) drop; CAT III 600 V; 2-year warranty; probe storage in the back.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea, MeterReadout } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-101-vs-fluke-t5-600";

export const metadata = buildMetadata({
  title: "Fluke 101 vs Fluke T5-600",
  description:
    "Fluke 101 vs Fluke T5-600: the 101 can't measure current at all, the T5-600 reads up to 100A AC. Signals, size and safety compared, plus a verdict.",
  path: "/multimeters/fluke-101-vs-fluke-t5-600",
});

const link = "text-accent hover:underline";

/** Why only one of the two can read current: two jacks on the 101, a magnetic sensing fork on the T5-600. */
function CurrentPathDiagram() {
  return (
    <svg
      viewBox="0 0 340 190"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram: the Fluke 101 has only COM and volts-ohms input jacks, so there is no path for current to flow through the meter; the Fluke T5-600's OpenJaw fork slips over one conductor and senses the magnetic field that AC current creates around it, without breaking the circuit"
    >
      <text x="80" y="16" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">Fluke 101</text>
      <rect x="35" y="26" width="90" height="120" rx="12" className="fill-surface stroke-border" strokeWidth="1.4" />
      <rect x="47" y="38" width="66" height="34" rx="4" className="fill-accent/10 stroke-border" strokeWidth="1" />
      <text x="80" y="60" fontSize="11" textAnchor="middle" className="fill-foreground">V · Ω · Hz</text>
      <circle cx="60" cy="122" r="8" className="fill-foreground" />
      <circle cx="100" cy="122" r="8" className="fill-[#e5484d]" />
      <text x="60" y="140" fontSize="8" textAnchor="middle" className="fill-muted">COM</text>
      <text x="100" y="140" fontSize="8" textAnchor="middle" className="fill-muted">VΩ</text>
      <text x="80" y="162" fontSize="9" textAnchor="middle" className="fill-muted">two jacks, no amps input:</text>
      <text x="80" y="174" fontSize="9" textAnchor="middle" className="fill-muted">current can&apos;t be measured</text>

      <text x="250" y="16" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">Fluke T5-600 OpenJaw</text>
      <line x1="250" y1="26" x2="250" y2="176" className="stroke-accent" strokeWidth="4" strokeLinecap="round" />
      <text x="258" y="36" fontSize="8.5" className="fill-accent">one conductor</text>
      {[16, 26, 36].map((r) => (
        <ellipse key={r} cx="250" cy="96" rx={r + 10} ry={r / 2.6} className="fill-none stroke-muted" strokeWidth="1" strokeDasharray="3 3" />
      ))}
      <path d="M205 80 H236 M205 112 H236 M205 80 V112" className="fill-none stroke-foreground" strokeWidth="5" strokeLinecap="round" />
      <text x="200" y="130" fontSize="8.5" textAnchor="end" className="fill-muted">open fork,</text>
      <text x="200" y="141" fontSize="8.5" textAnchor="end" className="fill-muted">12.9 mm gap</text>
      <text x="300" y="100" fontSize="8.5" textAnchor="middle" className="fill-muted">magnetic</text>
      <text x="300" y="111" fontSize="8.5" textAnchor="middle" className="fill-muted">field</text>
      <text x="250" y="186" fontSize="8.5" textAnchor="middle" className="fill-muted">AC only, to 100 A; circuit stays closed</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 101 vs Fluke T5-600",
  path,
  published: "2026-10-22",
  updated: "2026-10-26",
  intro:
    "Fluke 101 vs Fluke T5-600 is the simplest current question in the Fluke range: only one of them measures current at all. The 101 is Fluke's smallest meter, with voltage, resistance, capacitance, frequency and diode test but no current jack. The T5-600 reads AC current up to 100A through its open jaw, and gives up the 101's signal and component functions, plus fine voltage resolution, to do it. Electricians checking loads want the T5-600; anyone measuring batteries, sensors or components wants the 101.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 101")!,
    imageAlt: "Fluke 101 basic multimeter, front view",
    chooseIf: [
      "You need frequency, duty cycle, capacitance or a diode test",
      "You want the lightest possible Fluke, at 160 g",
      "You need readings finer than 1 V, such as battery state of charge",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke T5-600")!,
    imageAlt: "Fluke T5-600 electrical tester with OpenJaw",
    chooseIf: [
      "You need to know how much current a circuit draws",
      "You want a two-year warranty and a model sold on Fluke's US site",
      "You want a tester rated for a 3 m drop",
    ],
  },
  extraSpecs: [
    { label: "Instrument type", a: "Basic digital multimeter", b: "Electrical tester" },
    { label: "Current", a: "None", b: "To 100.0A AC via open jaw, ±(3% + 3)" },
    { label: "Voltage", a: "To 600V AC/DC, 0.001 V best resolution", b: "To 600V AC/DC, 1 V resolution, automatic AC/DC" },
    { label: "Resistance", a: "To 40 MΩ", b: "To 1,000 Ω" },
    { label: "Capacitance", a: "Yes (Fluke lists 100 µF and 1,000 µF in different documents)", b: "No" },
    { label: "Frequency / duty cycle", a: "To 100 kHz; 1–99%", b: "No" },
    { label: "Diode test", a: "Yes", b: "Not listed" },
    { label: "AC response", a: "Not stated as True RMS", b: "Averaging" },
    { label: "Battery", a: "2 × AAA", b: "2 × AA, 400 h alkaline" },
    { label: "Weight", a: "160 g", b: "300 g" },
    { label: "Drop rating", a: "1 m", b: "3 m (10 ft)" },
    { label: "Warranty", a: "1 year", b: "2 years" },
    { label: "US availability", a: "Import listings only", b: "Sold on fluke.com US" },
  ],
  differences: [
    "The T5-600 measures AC current up to 100A; the 101 has no current function.",
    "The 101 adds frequency to 100 kHz, duty cycle, capacitance and diode test, which the T5-600 lacks.",
    "Resistance runs to 40 MΩ on the 101 but only 1,000 Ω on the T5-600.",
    "The T5-600 shows voltage in whole volts; the 101 resolves down to a millivolt on its 6 V range.",
    "The 101 weighs 160 g, 140 g less than the T5-600, and is much shorter at 130 mm against 203 mm.",
    "Fluke warrants the T5-600 for two years and the 101 for one; the 101 isn't sold on Fluke's US site.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one measures</h2>
        <InfoCards
          items={[
            { label: "Fluke 101", desc: "Voltage, resistance to 40 MΩ, capacitance, frequency, duty cycle, diode, continuity." },
            { label: "Fluke T5-600", desc: "Voltage with auto AC/DC, resistance to 1,000 Ω, continuity, AC current to 100A." },
            { label: "Neither", desc: "DC current or temperature; and Fluke describes neither as True RMS." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          These two are often cross-shopped because both are small, yellow and CAT III 600V, but they are built for
          different jobs. The 101 is a pocket multimeter for components and low-voltage circuits. The T5-600 is an
          electrician&apos;s tester that answers three questions fast: is it live, is it continuous, and how much current
          is it pulling. We haven&apos;t bought either for testing; everything here comes from Fluke&apos;s published
          specifications.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 101 vs T5-600 spec by spec</h2>
        <DataTable
          head={["Spec", "Fluke 101", "Fluke T5-600"]}
          rows={[
            ["DC volts", "6.000 / 60.00 / 600.0 V, ±(0.5% + 3)", "To 600 V, 1 V resolution, ±(1% + 1)"],
            ["AC volts", "600.0 mV to 600.0 V, ±(1.0% + 3)", "To 600 V, 1 V resolution, ±(1.5% + 2)"],
            ["AC/DC selection", "Separate dial positions", "Automatic"],
            ["AC current", "None", "100.0 A, 0.1 A resolution, ±(3% + 3)"],
            ["DC current", "None", "None"],
            ["Resistance", "400.0 Ω to 40.00 MΩ", "To 1,000 Ω, 1 Ω resolution, ±(1% + 2)"],
            ["Continuity", "Yes, with buzzer", "Beeps below 25 Ω, silent above 400 Ω"],
            ["Capacitance", "50.00 nF to 1,000 µF ranges", "No"],
            ["Frequency", "10 Hz to 100 kHz", "No"],
            ["Size", "130 × 65 × 27 mm", "203 × 51 × 30.5 mm"],
            ["Safety rating", "CAT III 600V", "CAT III 600V"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Top of the resistance range, log scale. The 101 reaches 40,000 times higher.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 101", value: 40_000_000, display: "40 MΩ", highlight: true },
                { label: "Fluke T5-600", value: 1_000, display: "1,000 Ω" },
              ]}
            />
          </Figure>
          <Figure caption={<>Finest voltage step on screen, log scale. Smaller is better for low-voltage work.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 101 (6 V range)", value: 0.001, display: "0.001 V", highlight: true },
                { label: "Fluke T5-600", value: 1, display: "1 V" },
              ]}
            />
          </Figure>
          <Figure caption={<>Weight in grams from Fluke&apos;s specifications.</>}>
            <BarChart
              items={[
                { label: "Fluke 101", value: 160, display: "160 g", highlight: true },
                { label: "Fluke T5-600", value: 300, display: "300 g" },
              ]}
            />
          </Figure>
          <Figure caption={<>Rated drop height in meters. The T5-600 is built for ladders and panels.</>}>
            <BarChart
              items={[
                { label: "Fluke 101", value: 1, display: "1 m" },
                { label: "Fluke T5-600", value: 3, display: "3 m", highlight: true },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Why one reads amps and the other can&apos;t</h2>
        <p className="text-muted leading-7 mb-4">
          A conventional multimeter measures current by putting itself in series: you break the circuit and route the
          current through a fused shunt behind a dedicated amps jack. The 101 has only two jacks, COM and V/Ω, so that
          path doesn&apos;t exist. The T5-600 takes the other route. Its OpenJaw fork slips around a single conductor and
          senses the magnetic field that alternating current creates, so the circuit never opens.
        </p>
        <Figure caption={<>The 101 has no amps input; the T5-600 senses current through the field around one wire.</>}>
          <CurrentPathDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Two limits follow from that design. The fork only senses changing fields, so it can&apos;t read DC current from
          a battery or solar string. And it must go around one conductor: around a whole cord, the hot and neutral
          currents cancel and the display reads near zero. Fluke rates the gap at 12.9 mm, enough for wire up to 1/0
          THHN. For the wider topic, see{" "}
          <Link href="/multimeters/can-you-measure-current-without-breaking-the-circuit-with-a-multimeter" className={link}>
            measuring current without breaking the circuit
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What the resolution gap means on a car battery</h2>
        <p className="text-muted leading-7 mb-4">
          Whole-volt resolution is fine for confirming 120 V at a receptacle, but it hides the detail that low-voltage
          work depends on. Take a 12 V battery. On the 101&apos;s 60 V range, a reading of 12.60 V carries a tolerance
          of 0.5% × 12.60 + 3 × 0.01 = ±0.09 V. The T5-600 would show 13, with a tolerance of 1% × 13 + 1 = ±1.1 V, so a
          healthy battery and a half-flat one can show the same number.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <Figure caption={<>Illustrative only: a resting 12 V battery on the 101.</>}>
            <MeterReadout value="12.60" unit="V DC" mode="DC V  60 V range" />
          </Figure>
          <Figure caption={<>Illustrative only: the same battery on the T5-600.</>}>
            <MeterReadout value="13" unit="V DC" mode="AUTO V  1 V steps" />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The same arithmetic runs the other way for current. A 1.5 A load on the T5-600 reads to ±(3% × 1.5 + 0.3) =
          ±0.35 A, rough but useful for spotting an overloaded circuit. On a 15 A load the error is about ±0.75 A, which
          is plenty to compare against a breaker rating. Our guide to{" "}
          <Link href="/multimeters/how-to-test-a-car-battery-with-a-multimeter" className={link}>
            testing a car battery with a multimeter
          </Link>{" "}
          explains which voltages matter.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 101 vs T5-600: which should you buy?</h2>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["Electrician checking loads on branch circuits", "Fluke T5-600", "AC current to 100 A without opening the circuit"],
            ["Electronics hobbyist", "Fluke 101", "Millivolt resolution, diode test, capacitance and frequency"],
            ["Car or battery owner", "Fluke 101", "Resolves 12.60 V; the T5-600 shows whole volts only"],
            ["HVAC tech checking a compressor's draw", "Fluke T5-600", "Reads running amps on one conductor"],
            ["Appliance repair, element and switch checks", "Either", "Both read low resistance and continuity"],
            ["Tester that lives on a ladder or in a van", "Fluke T5-600", "3 m drop rating and stored probes"],
            ["Needs DC current", "Neither", "Look at the Fluke 107 or 15B+"],
          ]}
        />
        <div className="mt-4">
          <KeyIdea title="If you need both current and signals">
            Neither tool covers everything. A pocket meter such as the Fluke 107 adds current to the 101&apos;s
            signal functions; compare them in{" "}
            <Link href="/multimeters/fluke-107-vs-fluke-101" className={link}>
              Fluke 107 vs Fluke 101
            </Link>
            .
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Use cases in practice</h2>
        <p className="text-muted leading-7 mb-4">
          On a service call the T5-600 earns its place by speed. The meter picks AC or DC on its own, the probes stow in
          the back, and a quick slip of the fork over a motor lead tells you whether it pulls its nameplate current. It
          is a go/no-go tool, which is why Fluke designed its protection circuit to tolerate a longer connection to a
          voltage source than a solenoid tester.
        </p>
        <p className="text-muted leading-7">
          The 101 suits the bench, the glovebox and the hobby drawer. Reading a sensor&apos;s 0.45 V output, checking a
          PWM fan signal&apos;s frequency, or confirming a resistor is 47 kΩ rather than 4.7 kΩ are all jobs the T5-600
          simply can&apos;t do. When the 101 shows OL on resistance, our{" "}
          <Link href="/multimeters/what-does-ol-mean-on-a-multimeter" className={link}>
            guide to OL on a multimeter
          </Link>{" "}
          explains what it means.
        </p>
      </section>

      <Callout title="Safety: CAT III 600V is the ceiling for both">
        Both tools are rated CAT III 600V, which covers panels, feeders and branch circuits, not the service drop or meter
        base. Test on a known live source before and after checking a circuit is dead, keep fingers behind the probe
        guards, and never clamp a bare conductor you could touch. If you find voltage where there shouldn&apos;t be any, or
        a breaker that won&apos;t hold, stop and call a licensed electrician.
      </Callout>
    </>
  ),
  bottomLine:
    "Choose the T5-600 if you ever need to know how much current something draws; the 101 simply can't tell you. Choose the 101 for light electronics, battery and signal work, where frequency, duty cycle, diode test, millivolt resolution and a 160 g body matter, and current never does.",
  faqs: [
    {
      question: "Does the Fluke 101 measure amps?",
      answer:
        "No. The 101 has only two input jacks, COM and V/Ω, and no current function on the dial, so it can't read amps in any form. If you need current from a pocket Fluke, the 107 and 106 add 4 A and 10 A ranges, and the T5-600 reads AC current up to 100 A through its open jaw.",
    },
    {
      question: "Can the Fluke T5-600 measure DC current?",
      answer:
        "No. Fluke specifies the T5-600's current function for AC at 50/60 Hz only, up to 100.0 A, and its own product Q&A confirms it can't measure DC amps. The OpenJaw fork senses a changing magnetic field, so batteries, solar strings and automotive DC circuits need a DC-capable clamp meter or a meter with fused amps inputs.",
    },
    {
      question: "Can the T5-600 measure frequency or capacitance?",
      answer:
        "No. The T5-600 measures voltage, continuity, resistance to 1,000 Ω and AC current, and nothing else. Frequency to 100 kHz, duty cycle, capacitance and diode test are all on the Fluke 101. If you need those plus current in one tool, a pocket meter such as the Fluke 107 covers both sets.",
    },
    {
      question: "Are the Fluke 101 and T5-600 both CAT III 600V?",
      answer:
        "Yes. Fluke rates both at CAT III 600V, so either is suitable for distribution panels, feeders and branch circuits in a building. Neither carries a CAT IV rating, so don't use them at the meter base, service drop or outdoor feeds; for that work, look at the Fluke 87V or Fluke 179.",
    },
    {
      question: "Why is the Fluke 101 hard to find in the US?",
      answer:
        "Fluke sells the 101 in markets such as India and Malaysia but doesn't list it on its US site, so US listings come from third-party importers. It carries a one-year warranty, against two years for the T5-600. Check the seller and the warranty terms on the listing before buying.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 106 vs Fluke 101", href: "/multimeters/fluke-106-vs-fluke-101" },
    { label: "Fluke 117 vs Fluke T5-600", href: "/multimeters/fluke-117-vs-fluke-t5-600" },
    { label: "Fluke 107 vs Fluke T5-600", href: "/multimeters/fluke-107-vs-fluke-t5-600" },
    { label: "How to measure AC current with a clamp meter", href: "/multimeters/how-to-measure-ac-current-with-a-clamp-meter" },
    { label: "What does OL mean on a multimeter?", href: "/multimeters/what-does-ol-mean-on-a-multimeter" },
  ],
};

export default function Fluke101VsFlukeT5600Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
