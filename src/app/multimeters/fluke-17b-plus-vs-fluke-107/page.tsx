// Specs per Fluke, checked 2026-10-26:
// - Fluke 17B+ product page spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-17b-plus
//   (4.000/40.00/400.0/1000 V, DC ±(0.5% + 3), AC 40–500 Hz ±(1.0% + 3); 400.0 mV DC and AC; 400.0 µA to 10.00 A AC/DC
//   ±(1.5% + 3), AC current 40–400 Hz; fuses 440 mA and 11 A; capacitance 40.00 nF to 1000 µF; frequency 10 Hz–100 kHz
//   ±(0.1% + 3); duty 1–99%; temperature −55 to 400 °C, 2% ±1 °C (50–400 °C), ±2 °C (0–50 °C), 9% ±2 °C (−55–0 °C);
//   4,000 counts, 3 updates/s, backlight; 2 × AA, 500 h minimum; 183 × 91 × 49.5 mm, 455 g; IP 40).
// - Fluke 107 product page spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-107
//   (6.000/60.00/600.0 V, DC ±(0.5% + 3), AC ±(1.0% + 3); 600.0 mV AC; 4.000 A and 10.00 A AC/DC ±(1.5% + 3),
//   AC current 40–200 Hz; one 11 A fuse; capacitance 50.00 nF to 1000 µF; frequency 10 Hz–100 kHz ±(0.1% + 3);
//   duty 1–99%; diode 2.000 V; 6,000 counts, backlit; 2 × AAA, 200 h minimum; 142 × 69 × 28 mm, 200 g; 1 m drop;
//   2-year warranty in the box contents; "not a true-RMS" per Fluke's Q&A).
// Worked accuracy figures below are arithmetic on those published specs, not measurements.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-17b-plus-vs-fluke-107";

export const metadata = buildMetadata({
  title: "Fluke 17B+ vs Fluke 107",
  description:
    "Fluke 17B+ vs Fluke 107: both read frequency and duty cycle, but the 17B+ adds temperature, mA ranges and MIN MAX while the 107 is half the size. Compared.",
  image: picks.find((p) => p.name === "Fluke 17B+")!.image,
  path: "/multimeters/fluke-17b-plus-vs-fluke-107",
});

const link = "text-accent hover:underline";

const SHARED = ["AC/DC volts", "Amps (4 A, 10 A)", "Ohms to 40 MΩ", "Continuity", "Diode test", "Capacitance", "Frequency", "Duty cycle"];
const ONLY_17B = ["Temperature", "µA and mA", "MIN MAX", "Relative", "DC millivolts", "1000 V reading"];
const ONLY_107 = ["6,000 counts", "200 g body", "1 m drop rating"];

/** Overlap diagram: what both meters do, and what only one does. */
function OverlapDiagram() {
  return (
    <svg
      viewBox="0 0 380 230"
      className="w-full h-auto"
      role="img"
      aria-label="Overlap diagram: the Fluke 17B+ and Fluke 107 share volts, 4 A and 10 A current, resistance, continuity, diode, capacitance, frequency and duty cycle; only the 17B+ has temperature, microamp and milliamp ranges, MIN MAX, relative mode, DC millivolts and a 1000 V reading; only the 107 has 6,000 counts, a 200 g body and a 1 m drop rating"
    >
      <ellipse cx="140" cy="118" rx="128" ry="100" className="fill-accent/10 stroke-accent" strokeWidth="1.5" />
      <ellipse cx="240" cy="118" rx="128" ry="100" className="fill-accent/5 stroke-foreground" strokeWidth="1.5" />
      <text x="70" y="14" fontSize="11" fontWeight="700" className="fill-accent">Fluke 17B+</text>
      <text x="268" y="14" fontSize="11" fontWeight="700" className="fill-foreground">Fluke 107</text>
      {ONLY_17B.map((t, i) => (
        <text key={t} x="58" y={72 + i * 16} fontSize="9.5" textAnchor="middle" className="fill-foreground">
          {t}
        </text>
      ))}
      {SHARED.map((t, i) => (
        <text key={t} x="190" y={62 + i * 16} fontSize="9.5" textAnchor="middle" className="fill-foreground">
          {t}
        </text>
      ))}
      {ONLY_107.map((t, i) => (
        <text key={t} x="322" y={100 + i * 16} fontSize="9.5" textAnchor="middle" className="fill-foreground">
          {t}
        </text>
      ))}
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 17B+ vs Fluke 107",
  path,
  published: "2026-10-22",
  updated: "2026-10-26",
  intro:
    "Fluke 17B+ vs Fluke 107 is closer than it looks: unlike most pocket meters, the 107 reads frequency, duty cycle, capacitance and diodes, so it covers much of what the 17B+ does. What the bigger meter adds is temperature, microamp and milliamp ranges, MIN MAX, relative mode and a higher voltage ceiling, while the 107 counts to 6,000 in a 200 g case.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 17B+")!,
    imageAlt: "Fluke 17B+ digital multimeter, front view",
    chooseIf: [
      "You want temperature readings with a probe included",
      "You measure small currents in µA or mA, such as standby or sensor loops",
      "You log fluctuating readings with MIN MAX or need relative mode",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 107")!,
    imageAlt: "Fluke 107 palm-sized digital multimeter, front view",
    chooseIf: [
      "You want frequency and duty cycle in something that fits a pocket",
      "You value a 6,000-count display over extra functions",
      "You want a meter Fluke rates for a 1 m drop",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "4,000 counts, backlit", b: "6,000 counts, backlit" },
    { label: "Max voltage", a: "1000V AC/DC", b: "600V AC/DC" },
    { label: "Safety rating detail", a: "CAT III 600V; 1000V max to earth", b: "CAT III 600V" },
    { label: "Current ranges", a: "400.0 µA to 10.00 A AC/DC", b: "4.000 A and 10.00 A AC/DC only" },
    { label: "Millivolts", a: "400.0 mV AC and DC", b: "600.0 mV AC" },
    { label: "Frequency / duty cycle", a: "10 Hz to 100 kHz / 1–99%", b: "10 Hz to 100 kHz / 1–99%" },
    { label: "Temperature", a: "−55 °C to 400 °C, probe included", b: "No" },
    { label: "MIN MAX / relative", a: "Yes / Yes", b: "Not stated / Not stated" },
    { label: "Drop rating", a: "Not stated", b: "1 m" },
    { label: "Size / weight", a: "183 × 91 × 49.5 mm, 455 g", b: "142 × 69 × 28 mm, 200 g" },
    { label: "Battery", a: "2 × AA, 500 h minimum", b: "2 × AAA, 200 h minimum" },
  ],
  differences: [
    "Both measure frequency, duty cycle, capacitance, diodes and continuity with the same frequency accuracy, ±(0.1% + 3), so the 107 loses less than most pocket meters.",
    "The 17B+ adds a temperature function with a Type K probe, plus MIN MAX recording and relative mode.",
    "The 17B+ has µA and mA current ranges on a 440 mA fused input; the 107's current starts at its 4.000 A range.",
    "The 107's display reaches 6,000 counts; the 17B+ stops at 4,000.",
    "The 17B+ reads up to 1000V; the 107 is limited to 600V. Both are rated CAT III 600V.",
    "The 107 is 142 × 69 × 28 mm and 200 g, less than half the 17B+'s 455 g, and Fluke rates it for a 1 m drop.",
    "Neither is True RMS: Fluke states the 107 is not, and makes no True RMS claim for the 17B+.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">At a glance</h2>
        <InfoCards
          items={[
            { label: "Shared core", desc: "Volts, 4 A and 10 A, ohms, capacitance, diode, frequency and duty cycle." },
            { label: "17B+ extra: temperature", desc: "Type K probe included, −55 °C to 400 °C." },
            { label: "17B+ extra: small current", desc: "400.0 µA to 400.0 mA ranges the 107 lacks." },
            { label: "17B+ extra: MIN MAX", desc: "Captures highs and lows, plus relative zeroing." },
            { label: "107 extra: portability", desc: "200 g, 28 mm thick, rated for a 1 m drop." },
            { label: "Verdict", desc: "HVAC, appliance and electronics: 17B+. Pocket and glovebox: 107." },
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 17B+ vs 107 spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Fluke&apos;s spec tabs give the two meters identical accuracy on every function they share: ±(0.5% + 3) on DC
          volts, ±(1.0% + 3) on AC volts, ±(1.5% + 3) on current and ±(0.1% + 3) on frequency. What differs is where
          each one switches ranges, which functions exist at all, and the box they come in.
        </p>
        <DataTable
          head={["Function", "Fluke 17B+", "Fluke 107", "Same?"]}
          rows={[
            ["Volts ranges", "4.000 V to 1000 V", "6.000 V to 600.0 V", "Differ"],
            ["DC volts accuracy", "±(0.5% + 3)", "±(0.5% + 3)", "Same"],
            ["AC volts, 40–500 Hz", "±(1.0% + 3)", "±(1.0% + 3)", "Same"],
            ["Current ranges", "400.0 µA to 10.00 A", "4.000 A and 10.00 A", "Differ"],
            ["AC current bandwidth", "40 to 400 Hz", "40 to 200 Hz", "Differ"],
            ["Resistance", "400.0 Ω to 40.00 MΩ", "400.0 Ω to 40.00 MΩ", "Same"],
            ["Capacitance", "40.00 nF to 1000 µF", "50.00 nF to 1000 µF", "Near"],
            ["Frequency", "10 Hz to 100 kHz, ±(0.1% + 3)", "10 Hz to 100 kHz, ±(0.1% + 3)", "Same"],
            ["Duty cycle", "1% to 99%", "1% to 99%", "Same"],
            ["Diode test", "2.000 V", "2.000 V", "Same"],
            ["Temperature", "−55 °C to 400 °C", "No", "17B+ only"],
            ["Battery life", "500 h minimum, 2 × AA", "200 h minimum, 2 × AAA", "Differ"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Body length and thickness in millimeters, from Fluke&apos;s specifications.</>}>
            <BarChart
              items={[
                { label: "17B+ length", value: 183, display: "183 mm" },
                { label: "107 length", value: 142, display: "142 mm", highlight: true },
                { label: "17B+ thickness", value: 49.5, display: "49.5 mm" },
                { label: "107 thickness", value: 28, display: "28 mm", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Smallest current step, in µA, log scale: 17B+ on its 400.0 µA range against the 107 on 4.000 A.</>}>
            <BarChart
              log
              items={[
                { label: "17B+ (400.0 µA)", value: 0.1, display: "0.1 µA", highlight: true },
                { label: "107 (4.000 A)", value: 1000, display: "1,000 µA" },
              ]}
            />
          </Figure>
        </div>
        <div className="mt-4">
          <Figure caption={<>Feature overlap, per Fluke&apos;s spec tabs. The middle column is what you keep if you choose the 107.</>}>
            <OverlapDiagram />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What the temperature function is worth</h2>
        <p className="text-muted leading-7 mb-4">
          The 17B+ ships with a Type K probe and reads −55 °C to 400 °C. Fluke&apos;s accuracy is banded: ±2 °C from
          0 to 50 °C, 2% ±1 °C above 50 °C, and 9% ±2 °C below freezing. Worked through, that is the spread below. It
          is plenty for a supply-air check, a heatsink or a freezer, though a dedicated thermometer is better for
          refrigerant superheat.
        </p>
        <Figure caption={<>Worked arithmetic on Fluke&apos;s 17B+ temperature spec, ± °C at three example readings. Not measured.</>}>
          <BarChart
            items={[
              { label: "−20 °C (freezer)", value: 3.8, display: "±3.8 °C" },
              { label: "25 °C (room)", value: 2, display: "±2.0 °C", highlight: true },
              { label: "200 °C (heatsink)", value: 5, display: "±5.0 °C" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The 107 has no thermocouple input at all, so for temperature you&apos;d carry a separate thermometer. Our
          guide to{" "}
          <Link href="/multimeters/how-to-check-a-thermocouple-with-a-multimeter" className={link}>
            checking a thermocouple with a multimeter
          </Link>{" "}
          shows the millivolt side of the same job, which the 107 can only do on AC.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 17B+ vs 107: which should you buy?</h2>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["Appliance or HVAC hobbyist", "Fluke 17B+", "Temperature probe included, plus mA for small control circuits"],
            ["Car owner chasing a battery drain", "Fluke 17B+", "Its 400.0 mA range reads the 20–50 mA a drain test needs"],
            ["Checking PWM fans and dimmers", "Either", "Both read frequency to 100 kHz and duty cycle 1–99%"],
            ["Glovebox or backpack meter", "Fluke 107", "200 g, 28 mm thick, 1 m drop rating"],
            ["Electronics with 5 V rails", "Fluke 107", "Its 6.000 V range shows the millivolt digit"],
            ["Watching a drifting reading", "Fluke 17B+", "MIN MAX captures the highs and lows for you"],
            ["Solar or DC above 600 V", "Fluke 17B+", "Reads to 1000 V; the 107 stops at 600 V"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For the pocket line-up, see{" "}
          <Link href="/multimeters/fluke-106-vs-fluke-107" className={link}>
            Fluke 106 vs 107
          </Link>
          ; for the full-size step up to True RMS, see{" "}
          <Link href="/multimeters/fluke-17b-plus-vs-fluke-117" className={link}>
            Fluke 17B+ vs 117
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Use cases in practice</h2>
        <p className="text-muted leading-7 mb-4">
          On a workbench the 17B+ earns its size. Relative mode zeros a reference reading so
          you see only the change, MIN MAX holds the dip when a motor starts, and the microamp range reads sleep current on a
          battery-powered board. Its two AA cells are rated for at least 500 hours, so it rarely dies mid-job.
        </p>
        <p className="text-muted leading-7 mb-4">
          Away from the bench the 107 makes more sense. It reads the frequency of a generator, the duty cycle of a
          fan controller and the capacitance of a start capacitor, which covers most quick field checks, and
          Fluke rates it to survive a 1 m drop. What it can&apos;t do is read a current
          below a few tens of milliamps with useful resolution: on its 4.000 A range one count is 1 mA.
        </p>
        <KeyIdea title="A note on True RMS">
          Neither meter is True RMS, so both read clean sine-wave mains correctly but can misread the chopped
          waveforms of dimmers, drives and switch-mode supplies. If that is your work, step up to a True RMS meter
          such as the Fluke 117 or 115.
        </KeyIdea>
      </section>

      <Callout title="Safety: both are CAT III 600V meters">
        The 17B+ displays up to 1000 V, but both meters carry a CAT III 600V rating, so neither belongs at a service
        entrance or meter base. Check the leads are in the volts jack before probing an outlet, because a lead left in
        the A jack shorts the circuit through the fuse. On a hot heatsink or stove element, let the 17B+&apos;s probe do the
        touching, not your hand, and call an electrician for anything inside a panel you aren&apos;t trained to open.
      </Callout>
    </>
  ),
  bottomLine:
    "Pick the 107 if you want frequency and duty cycle in a pocket-size meter with a finer display; it covers most everyday electronics checks. Pick the 17B+ if temperature, milliamp ranges, MIN MAX logging or readings above 600V matter, and you don't mind a full-size meter.",
  faqs: [
    {
      question: "Does the Fluke 107 measure frequency like the 17B+?",
      answer:
        "Yes. Fluke lists frequency from 10 Hz to 100 kHz and duty cycle from 1% to 99% on both meters, with the same ±(0.1% + 3) frequency accuracy. Its sibling, the Fluke 106, lacks both functions, which is the main reason to choose the 107 over the 106.",
    },
    {
      question: "Is the Fluke 107 True RMS?",
      answer:
        "No. Fluke states plainly that the 107 is not a True RMS meter, and it makes no True RMS claim for the 17B+ either. Both read pure sine-wave mains accurately, but on variable-speed drives, LED drivers and dimmers their AC readings can be off. For that work, look at a True RMS Fluke such as the 115 or 117.",
    },
    {
      question: "Can the Fluke 107 measure milliamps?",
      answer:
        "Not usefully. The 107 has only 4.000 A and 10.00 A current ranges on a single 11 A fused input, so its smallest step is 1 mA and its accuracy band on a 50 mA load is several milliamps wide. The 17B+ has dedicated 40.00 mA and 400.0 mA ranges, plus microamp ranges.",
    },
    {
      question: "Can the Fluke 107 measure temperature?",
      answer:
        "No. Temperature is a 17B+ feature here, using its included Type K probe across −55 °C to 400 °C. Fluke rates it at ±2 °C between 0 and 50 °C and 2% ±1 °C above that, which suits supply-air, pipe and heatsink checks. The 107 has no thermocouple input.",
    },
    {
      question: "Which has more resolution, the 17B+ or the 107?",
      answer:
        "The 107, with a 6,000-count display against the 17B+'s 4,000 counts. In practice that matters between 4 V and 6 V, and between 400 V and 600 V, where the 107 stays on a finer range. A 5 V rail reads to 0.001 V on the 107 and 0.01 V on the 17B+.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 117 vs Fluke 107", href: "/multimeters/fluke-117-vs-fluke-107" },
    { label: "Fluke 106 vs Fluke 107", href: "/multimeters/fluke-106-vs-fluke-107" },
    { label: "Fluke 17B+ vs Fluke 106", href: "/multimeters/fluke-17b-plus-vs-fluke-106" },
    { label: "Fluke 17B+ vs Fluke 117", href: "/multimeters/fluke-17b-plus-vs-fluke-117" },
    { label: "How to measure parasitic battery drain", href: "/multimeters/how-to-measure-parasitic-battery-drain" },
  ],
};

export default function Fluke17BPlusVsFluke107Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
