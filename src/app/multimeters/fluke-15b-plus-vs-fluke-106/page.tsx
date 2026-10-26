// Specs per Fluke, checked 2026-10-26:
// - Fluke 15B+ product page spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-15b-plus
//   (4.000/40.00/400.0/1000 V ranges, DC ±(0.5% + 3), AC 40–500 Hz ±(1.0% + 3); 400.0 µA to 10.00 A AC/DC ±(1.5% + 3),
//   AC current 40–400 Hz; fuses 440 mA and 11 A; capacitance 40.00 nF to 1000 µF; diode 2.000 V, <0.6 mA;
//   4,000 counts, 3 updates/s, backlight; 2 × AA, 500 h minimum; 183 × 91 × 49.5 mm, 455 g; IP 40; 1000 V max to earth).
// - Fluke 106 product page spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-106
//   (6.000/60.00/600.0 V ranges, DC ±(0.5% + 3), AC 40–500 Hz ±(1.0% + 3); 4.000 A and 10.00 A AC/DC ±(1.5% + 3),
//   AC current 40–200 Hz; one 11 A fuse; capacitance 50.00 nF to 1000 µF; 6,000 counts, 3 updates/s;
//   2 × AAA, 200 h minimum; 142 × 69 × 28 mm, 200 g; CAT III 600V; IP 40).
// Diode test is a 107-only function in the 106/107 family per the Fluke 106/107 users manual.
// Worked accuracy and resolution figures below are arithmetic on those published specs, not measurements.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea, MeterReadout } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-15b-plus-vs-fluke-106";

export const metadata = buildMetadata({
  title: "Fluke 15B+ vs Fluke 106",
  description:
    "Fluke 15B+ vs Fluke 106: full µA-to-10A current ranges and a 1000V reading in a full-size case, or a 200 g pocket meter with a 6,000-count display. Compared.",
  path: "/multimeters/fluke-15b-plus-vs-fluke-106",
});

const link = "text-accent hover:underline";

/** Current paths inside each meter: the 15B+ has two fused current inputs, the 106 one. */
function CurrentPathDiagram() {
  const box = "fill-surface stroke-border";
  return (
    <svg
      viewBox="0 0 360 210"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram: the Fluke 15B+ routes current through either a 440 mA fused input for microamp and milliamp ranges or an 11 A fused input for amp ranges, while the Fluke 106 has only the 11 A fused input feeding its 4 A and 10 A ranges"
    >
      <text x="10" y="16" fontSize="11" fontWeight="700" className="fill-accent">Fluke 15B+</text>
      <rect x="10" y="26" width="70" height="26" rx="5" className={box} strokeWidth="1.2" />
      <text x="45" y="43" fontSize="9.5" textAnchor="middle" className="fill-foreground">µA / mA jack</text>
      <rect x="10" y="62" width="70" height="26" rx="5" className={box} strokeWidth="1.2" />
      <text x="45" y="79" fontSize="9.5" textAnchor="middle" className="fill-foreground">A jack</text>
      <line x1="80" y1="39" x2="120" y2="39" className="stroke-foreground" strokeWidth="1.5" />
      <line x1="80" y1="75" x2="120" y2="75" className="stroke-foreground" strokeWidth="1.5" />
      <rect x="120" y="30" width="62" height="18" rx="9" className="fill-accent/15 stroke-accent" strokeWidth="1.2" />
      <text x="151" y="43" fontSize="9" textAnchor="middle" className="fill-accent">440 mA fuse</text>
      <rect x="120" y="66" width="62" height="18" rx="9" className="fill-accent/15 stroke-accent" strokeWidth="1.2" />
      <text x="151" y="79" fontSize="9" textAnchor="middle" className="fill-accent">11 A fuse</text>
      <line x1="182" y1="39" x2="214" y2="39" className="stroke-foreground" strokeWidth="1.5" />
      <line x1="182" y1="75" x2="214" y2="75" className="stroke-foreground" strokeWidth="1.5" />
      <text x="218" y="36" fontSize="9" className="fill-foreground">400.0 µA, 4000 µA,</text>
      <text x="218" y="47" fontSize="9" className="fill-foreground">40.00 mA, 400.0 mA</text>
      <text x="218" y="79" fontSize="9" className="fill-foreground">4.000 A, 10.00 A</text>

      <line x1="10" y1="106" x2="350" y2="106" className="stroke-border" strokeWidth="0.8" strokeDasharray="4 3" />

      <text x="10" y="128" fontSize="11" fontWeight="700" className="fill-accent">Fluke 106</text>
      <rect x="10" y="138" width="70" height="26" rx="5" className={box} strokeWidth="1.2" />
      <text x="45" y="155" fontSize="9.5" textAnchor="middle" className="fill-foreground">A jack</text>
      <line x1="80" y1="151" x2="120" y2="151" className="stroke-foreground" strokeWidth="1.5" />
      <rect x="120" y="142" width="62" height="18" rx="9" className="fill-accent/15 stroke-accent" strokeWidth="1.2" />
      <text x="151" y="155" fontSize="9" textAnchor="middle" className="fill-accent">11 A fuse</text>
      <line x1="182" y1="151" x2="214" y2="151" className="stroke-foreground" strokeWidth="1.5" />
      <text x="218" y="155" fontSize="9" className="fill-foreground">4.000 A, 10.00 A</text>
      <text x="10" y="190" fontSize="9" className="fill-muted">No µA/mA input: the smallest current step is 0.001 A (1 mA).</text>
      <text x="10" y="203" fontSize="9" className="fill-muted">Both meters share the COM jack and a separate V/Ω jack (not drawn).</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 15B+ vs Fluke 106",
  path,
  published: "2026-10-22",
  updated: "2026-10-26",
  intro:
    "Fluke 15B+ vs Fluke 106 is a choice between two budget Flukes built for different pockets. The 15B+ is a full-size basic meter with microamp, milliamp and amp current ranges and a 1000V reading; the 106 is a palm-size meter with a finer 6,000-count display but only 4A and 10A current ranges. Both skip frequency and temperature.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 15B+")!,
    imageAlt: "Fluke 15B+ digital multimeter, front view",
    chooseIf: [
      "You need to read small currents in µA or mA",
      "You want a diode test as well as continuity",
      "You prefer a full-size meter with AA batteries",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 106")!,
    imageAlt: "Fluke 106 palm-sized digital multimeter, front view",
    chooseIf: [
      "You want the meter small enough for a pocket or glovebox",
      "You value a 6,000-count display",
      "Your current checks, if any, are in whole amps",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "4,000 counts, backlit", b: "6,000 counts" },
    { label: "Volts ranges", a: "4.000 / 40.00 / 400.0 / 1000 V", b: "6.000 / 60.00 / 600.0 V" },
    { label: "DC volts accuracy", a: "±(0.5% + 3)", b: "±(0.5% + 3)" },
    { label: "Safety rating detail", a: "CAT III 600V; 1000V max to earth", b: "CAT III 600V" },
    { label: "Current ranges", a: "400.0 µA to 10.00 A AC/DC", b: "4.000 A and 10.00 A AC/DC" },
    { label: "Current fuses", a: "440 mA and 11 A", b: "11 A" },
    { label: "AC current bandwidth", a: "40 to 400 Hz", b: "40 to 200 Hz" },
    { label: "Diode test", a: "Yes, 2.000 V range", b: "No" },
    { label: "Capacitance", a: "40.00 nF to 1,000 µF", b: "50.00 nF to 1,000 µF" },
    { label: "Frequency / temperature", a: "No / No", b: "No / No" },
    { label: "Size / weight", a: "183 × 91 × 49.5 mm, 455 g", b: "142 × 69 × 28 mm, 200 g" },
    { label: "Battery", a: "2 × AA, 500 h minimum", b: "2 × AAA, 200 h minimum" },
    { label: "Warranty", a: "1 year (users manual)", b: "2 years" },
  ],
  differences: [
    "The 15B+ measures from microamps up to 10A; the 106 starts at a 4A range, so small currents are out of reach.",
    "The 106's display counts to 6,000 against the 15B+'s 4,000.",
    "The 15B+ reads up to 1000V; the 106 is a 600V meter. Both carry a CAT III 600V rating.",
    "Only the 15B+ has a diode test; Fluke lists diode as a 107-only function in the 106/107 family.",
    "The 106 is 200 g and 28 mm thick; the 15B+ is 455 g and 49.5 mm thick.",
    "Identical where it counts for everyday checks: DC volts accuracy is ±(0.5% + 3) on both, and resistance runs to 40.00 MΩ on both.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">At a glance</h2>
        <InfoCards
          items={[
            { label: "Same basics", desc: "DC volts ±(0.5% + 3), resistance to 40 MΩ, capacitance to 1,000 µF on both." },
            { label: "15B+ extra: small current", desc: "Fused µA and mA ranges down to 0.1 µA resolution." },
            { label: "15B+ extra: diode test", desc: "A 2.000 V diode range the 106 doesn't have." },
            { label: "106 extra: resolution", desc: "6,000 counts, so a 5 V rail reads to the millivolt." },
            { label: "106 extra: size", desc: "200 g and 28 mm thick: under half the 15B+'s weight." },
            { label: "Verdict", desc: "Electronics and current work: 15B+. Glovebox and outlets: 106." },
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 15B+ vs 106 spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          On paper these are both basic meters, but the current inputs separate them sharply. The 15B+ has the
          fused µA/mA input most full-size meters carry; the 106 keeps only amp ranges to stay small. Fluke&apos;s spec
          tabs show the same voltage and resistance accuracy on both, so the real trade is current coverage against
          display resolution and pocket size.
        </p>
        <DataTable
          head={["Range", "Fluke 15B+", "Fluke 106"]}
          rows={[
            ["Microamps", "400.0 µA and 4000 µA", "No"],
            ["Milliamps", "40.00 mA and 400.0 mA", "No"],
            ["Up to 4A", "4.000 A", "4.000 A"],
            ["Up to 10A", "10.00 A", "10.00 A, for under 7 minutes at a time"],
            ["Current accuracy", "±(1.5% + 3)", "±(1.5% + 3)"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Display counts: the 106 resolves 50% more steps per range.</>}>
            <BarChart
              items={[
                { label: "Fluke 15B+", value: 4000, display: "4,000" },
                { label: "Fluke 106", value: 6000, display: "6,000", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Minimum battery life Fluke quotes, in hours.</>}>
            <BarChart
              items={[
                { label: "15B+ (2 × AA)", value: 500, display: "500 h", highlight: true },
                { label: "106 (2 × AAA)", value: 200, display: "200 h" },
              ]}
            />
          </Figure>
        </div>
        <div className="mt-4">
          <Figure
            caption={
              <>
                Worked arithmetic, not a measurement: the uncertainty on a 50 mA reading, in mA. The 15B+ reads it on its
                400.0 mA range; the 106 can only use its 4.000 A range, where the 3-count term is 3 mA.
              </>
            }
          >
            <BarChart
              items={[
                { label: "15B+, 400.0 mA range", value: 1.05, display: "±1.05 mA", highlight: true },
                { label: "106, 4.000 A range", value: 3.75, display: "±3.75 mA" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The arithmetic behind that chart: ±(1.5% of 50 mA + 3 counts). On the 15B+&apos;s 400.0 mA range a count is
          0.1 mA, so the band is 0.75 + 0.3 = ±1.05 mA. On the 106&apos;s 4.000 A range a count is 1 mA, so it becomes
          0.75 + 3 = ±3.75 mA, about ±7.5% of the reading. Below about 10 mA the 106 is effectively blind.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Why the 106 can&apos;t read milliamps</h2>
        <p className="text-muted leading-7 mb-4">
          Current is measured by passing it through a small internal shunt resistor and reading the voltage across it.
          A low range needs a larger shunt, which in turn needs its own lower-rated fuse so a mistake can&apos;t cook it.
          Fluke&apos;s spec tabs list two current fuses on the 15B+ (440 mA and 11 A) and only one on the 106 (11 A).
          That single fused input is why the palm-size meter starts at 4 A.
        </p>
        <Figure caption={<>The current paths, per the fuses and ranges Fluke publishes for each meter.</>}>
          <CurrentPathDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          In practice the missing input rules the 106 out of parasitic-drain checks on a car, standby current on a
          gadget and 4–20 mA loop work. Our guide to{" "}
          <Link href="/multimeters/how-to-measure-parasitic-battery-drain" className={link}>
            measuring parasitic battery drain
          </Link>{" "}
          shows the kind of 20 to 50 mA readings involved, and{" "}
          <Link href="/multimeters/how-to-measure-milliamps-with-a-multimeter" className={link}>
            measuring milliamps with a multimeter
          </Link>{" "}
          walks through the lead change the 15B+ needs.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where the 106&apos;s 6,000 counts help</h2>
        <p className="text-muted leading-7 mb-4">
          Count rating sets where each meter switches ranges. The 15B+ steps at 4.000, 40.00 and 400.0 V; the 106 at
          6.000, 60.00 and 600.0 V. So a reading between 4 and 6 volts lands on the 106&apos;s millivolt range but on the
          15B+&apos;s 10 mV range. For USB rails and 5 V logic that is a genuine gain. At 12 V or 120 V both meters
          show the same number of digits.
        </p>
        <DataTable
          head={["Typical reading", "15B+ range, resolution", "106 range, resolution"]}
          rows={[
            ["1.5 V cell", "4.000 V, 0.001 V", "6.000 V, 0.001 V"],
            ["5 V USB or logic rail", "40.00 V, 0.01 V", "6.000 V, 0.001 V"],
            ["12.6 V car battery", "40.00 V, 0.01 V", "60.00 V, 0.01 V"],
            ["120 V outlet", "400.0 V, 0.1 V", "600.0 V, 0.1 V"],
            ["480 V three-phase", "1000 V, 1 V", "600.0 V, 0.1 V"],
          ]}
          mono={[1, 2]}
        />
        <div className="mt-4 grid grid-cols-2 gap-4">
          <Figure caption={<>Illustrative only: a 5 V rail on the 15B+&apos;s 40.00 V range.</>}>
            <MeterReadout value="5.03" unit="V DC" mode="40.00 V range" />
          </Figure>
          <Figure caption={<>Illustrative only: the same rail on the 106&apos;s 6.000 V range.</>}>
            <MeterReadout value="5.031" unit="V DC" mode="6.000 V range" />
          </Figure>
        </div>
        <div className="mt-4">
          <KeyIdea title="Neither is True RMS">
            Fluke doesn&apos;t describe the 15B+ as True RMS and positions the 106 for work where True RMS isn&apos;t
            needed. For ordinary mains, batteries and resistors that&apos;s fine; on drives and electronic lighting,
            both can misread AC. If that is your work, look at our{" "}
            <Link href="/multimeters/best-true-rms-multimeters-under-100" className={link}>
              True RMS meters under $100
            </Link>
            .
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 15B+ vs 106: which should you buy?</h2>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["Electronics student or hobbyist", "Fluke 15B+", "mA and µA ranges plus a diode test for parts checks"],
            ["Car owner chasing a battery drain", "Fluke 15B+", "The 106 has no milliamp range to read a 20–50 mA draw"],
            ["Homeowner checking outlets and fuses", "Fluke 106", "Volts, continuity and resistance in a pocket-size body"],
            ["Glovebox or travel meter", "Fluke 106", "200 g and 28 mm thick; AAA cells are easy to find"],
            ["Appliance repair with motor current", "Either", "Both read 4 A and 10 A ranges at ±(1.5% + 3)"],
            ["Working on 5 V USB and logic rails", "Fluke 106", "Its 6.000 V range shows the millivolt digit"],
            ["Sensor loops at 4–20 mA", "Fluke 15B+", "Its 40.00 mA range reads to 0.01 mA"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If both feel limited, the{" "}
          <Link href="/multimeters/fluke-17b-plus-vs-fluke-15b-plus" className={link}>
            Fluke 17B+ vs 15B+
          </Link>{" "}
          comparison covers the step up that adds frequency and temperature, and{" "}
          <Link href="/multimeters/fluke-106-vs-fluke-107" className={link}>
            Fluke 106 vs 107
          </Link>{" "}
          shows what the pocket Fluke gains with frequency and a diode test.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Living with each meter</h2>
        <p className="text-muted leading-7 mb-4">
          The 15B+ is a bench and toolbag meter: at 183 mm long it sits flat on a workbench, and its AA cells are
          rated for at least 500 hours, two and a half times the 106&apos;s 200. It has a backlight, which helps under a
          sink or in a panel. The 106 is the one you will actually carry, because it slips into a jacket pocket and
          still has a CAT III 600V rating for household circuits. Fluke rates both IP 40, so neither is built for rain.
        </p>
        <p className="text-muted leading-7">
          The voltage ceiling rarely decides it. The 15B+ reads to 1000 V, but its CAT III rating is still 600 V, so
          for mains work the two meters sit in the same safety class. The extra range matters mainly for solar strings
          and other DC sources between 600 V and 1000 V, which few owners of a basic meter will probe.
        </p>
      </section>

      <Callout title="Safety on mains circuits">
        Both meters are rated CAT III 600V, which covers outlets, branch circuits and distribution panels, not the
        service drop or meter base. Never measure current on a circuit that can exceed the fuse rating, and keep the
        leads out of the A jack when you switch back to volts: a lead left in a current jack shorts the circuit
        through the fuse. If a panel reading surprises you, stop and call a licensed electrician.
      </Callout>
    </>
  ),
  bottomLine:
    "Choose the 15B+ if you need milliamp or microamp readings, a diode test or the longer AA battery life; it's the more capable basic meter. Choose the 106 if size matters most and your checks are voltage, continuity and the occasional amp reading.",
  faqs: [
    {
      question: "Does the Fluke 15B+ measure milliamps?",
      answer:
        "Yes. The 15B+ has 400.0 µA, 4000 µA, 40.00 mA and 400.0 mA ranges on a 440 mA fused input, plus 4 A and 10 A ranges on an 11 A fused input, all for AC and DC. The 106's smallest current range is 4.000 A, so it can't resolve anything finer than 1 mA.",
    },
    {
      question: "Is the Fluke 106 good enough for home electrical work?",
      answer:
        "For outlet voltage, continuity, fuses and resistance, yes. It is rated CAT III 600V, reads AC volts to ±(1.0% + 3) and fits in a pocket. It is not True RMS, has no milliamp range and no diode test, so for wiring faults or dimmer circuits a better-equipped meter is worth the extra size.",
    },
    {
      question: "Can the Fluke 106 test diodes?",
      answer:
        "No. Fluke's 106/107 manual marks diode test as a 107 feature. The 15B+ includes a diode test on its 2.000 V range, with about 2 V open-circuit and under 0.6 mA of test current, which is enough to check LEDs and rectifier diodes.",
    },
    {
      question: "Do either of them read frequency or temperature?",
      answer:
        "No. Fluke's datasheet lists frequency and temperature as unavailable on the 15B+, and the 106 has neither. If you need them, the Fluke 17B+ adds frequency, duty cycle and temperature to the 15B+ body, and the Fluke 107 adds frequency and duty cycle to the 106 body.",
    },
    {
      question: "Which is better for a beginner?",
      answer:
        "The 15B+, for its fuller current ranges and diode test, unless you specifically want a pocket meter. Beginners tend to grow into milliamp and component checks, and the 15B+ covers those. Both have simple rotary controls, auto-ranging and the same core accuracy, so neither is harder to learn.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 15B+ vs Fluke 107", href: "/multimeters/fluke-15b-plus-vs-fluke-107" },
    { label: "Fluke 106 vs Fluke 101", href: "/multimeters/fluke-106-vs-fluke-101" },
    { label: "Fluke 106 vs Fluke 107", href: "/multimeters/fluke-106-vs-fluke-107" },
    { label: "Fluke 17B+ vs Fluke 15B+", href: "/multimeters/fluke-17b-plus-vs-fluke-15b-plus" },
    { label: "Best multimeter for beginners", href: "/multimeters/best-multimeter-for-beginners" },
  ],
};

export default function Fluke15BPlusVsFluke106Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
