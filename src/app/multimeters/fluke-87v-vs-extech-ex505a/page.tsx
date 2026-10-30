// Specs per maker sources, checked 2026-10-29:
// - Fluke 87V: product page and spec tab (https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-87v),
//   as cited on /multimeters/fluke-87v-vs-fluke-87v-max and /multimeters/fluke-87v-vs-fluke-289: True RMS; CAT III 1000V /
//   CAT IV 600V; 6,000 counts, 19,999 high-res; DC V ±(0.05% + 1); AC V ±(0.7% + 2), 20 kHz bandwidth, low-pass filter
//   3 dB at 1 kHz; peak capture 250 µs; 60 mA range ±(0.2% + 4) (83V/87V detailed specs, per /multimeters/fluke-28-ii-vs-fluke-87v);
//   0.01 µA DC resolution; 10 A (20 A for 30 s); 50 MΩ; 9,999 µF; 200 kHz; -200 to 1090 °C excluding probe; IP30
//   (comparison table); drop "3 meters" (comparison table) vs "1 Meter drop per IEC 61010-1" (spec tab); 355 g (624 g in
//   holster); one 9 V, about 400 h; lifetime warranty; no LoZ or NCV listed.
// - Extech EX505A: Extech EX505A Pick in src/lib/multimeter-catalog.ts (extech.com, EX5xxA datasheet Rev. 1/24/24, EX505A
//   user manual): 6000 counts; CAT IV 600V / CAT III 1000V (manual); DC V ±(0.5% + 5); AC V bandwidth 50 Hz-1 kHz (sine)
//   or 50/60 Hz (all waveforms); DC current ±(1.0% + 3) and ±(1.5% + 3) as the manual's table groups the ranges (we use
//   ±(1.5% + 3) as the worst case on 60 mA); 600.0 µA to 10 A; 60 MΩ (40 MΩ on extech.com); 99.99 mF; Type K -20 to
//   760°C, supplied probe rated 250°C; no LoZ and no low-pass filter on the EX505A per the datasheet; IP67 (tested by
//   Bureau Veritas, per manual); 2 m drop; 365 g; one 9 V; APO about 15 min; 3-year warranty. Datasheet bullet "0.09%"
//   conflicts with its own table (±0.5%).
// Amazon (Playwright, Chrome, ZIP 10001, 2026-10-29): both ASINs in stock with Add to Cart; 87V about 3.8x the EX505A.
// Fluke 87V is owner hands-on tested; the EX505A assessment is desk research. Worked readings are arithmetic on the
// published specs, not measurements.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { pickByName } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-87v-vs-extech-ex505a";
const fluke = pickByName("Fluke 87V")!;
const extech = pickByName("Extech EX505A")!;

export const metadata = buildMetadata({
  title: "Fluke 87V vs Extech EX505A: Industrial Testing",
  description:
    "Fluke 87V vs Extech EX505A: same CAT IV 600V rating, but the Fluke filters drive outputs and reads DC 10x tighter; the Extech is IP67 at a quarter the price.",
  image: fluke.image,
  path: "/multimeters/fluke-87v-vs-extech-ex505a",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 87V vs Extech EX505A: Which Is Better for Industrial Testing?",
  path,
  published: "2026-10-29",
  intro:
    "Both meters carry the same CAT IV 600V / CAT III 1000V rating, so the choice comes down to the work itself. Plant technicians who troubleshoot variable-frequency drives, calibrate 4–20 mA loops or chase intermittent faults should buy the Fluke 87V: it has a low-pass filter, 250 µs peak capture and DC accuracy ten times tighter. Buy the Extech EX505A for washdown areas, outdoor yards and rough sites, where its IP67 housing matters more than precision. The 87V cost nearly four times as much on Amazon when we checked.",
  a: {
    pick: fluke,
    imageAlt: "Fluke 87V industrial True RMS multimeter, front view",
    chooseIf: [
      "You measure variable-frequency drive outputs and need a low-pass filter",
      "You calibrate or verify 4–20 mA loops and 24 V DC supplies against tight tolerances",
      "You need peak capture for inrush and transients, or temperature to 1090 °C with a suitable probe",
    ],
  },
  b: {
    pick: extech,
    imageAlt: "Extech EX505A IP67 industrial multimeter kit with case, leads, strap and thermocouple",
    chooseIf: [
      "The meter will get wet, dusty or dropped: it is IP67 with a 2 m drop rating",
      "Your work is 50/60 Hz mains, motors and controls rather than drive outputs",
      "You need capacitance beyond 10,000 µF, up to 99.99 mF",
    ],
  },
  extraSpecs: [
    { label: "Safety category", a: "CAT III 1000V / CAT IV 600V", b: "CAT IV 600V / CAT III 1000V (manual)" },
    { label: "Display", a: "6,000 counts; 19,999 high-res mode", b: "6,000 counts" },
    { label: "DC volts accuracy", a: "±(0.05% + 1)", b: "±(0.5% + 5)" },
    { label: "AC volts band", a: "To 20 kHz; low-pass filter 3 dB at 1 kHz", b: "50 Hz–1 kHz sine, 50/60 Hz other waveforms; no filter" },
    { label: "Peak capture", a: "250 µs", b: "Not listed" },
    { label: "60 mA DC range accuracy", a: "±(0.2% + 4)", b: "±(1.0% to 1.5% + 3), by range grouping" },
    { label: "Finest current step", a: "0.01 µA DC", b: "0.1 µA" },
    { label: "Capacitance", a: "To 9,999 µF", b: "To 99.99 mF" },
    { label: "Temperature", a: "-200 to 1090 °C, probe extra", b: "-20 to 760°C; supplied probe rated 250°C" },
    { label: "Ingress / drop", a: "IP30; drop 3 m or 1 m (Fluke sources differ)", b: "IP67; 2 m drop" },
    { label: "LoZ / NCV", a: "Neither listed", b: "Neither listed (LoZ on EX520A/EX530A only)" },
    { label: "Weight / battery", a: "355 g (624 g in holster); 9 V, about 400 h", b: "365 g; one 9 V" },
    { label: "Warranty", a: "Lifetime", b: "3 years" },
  ],
  differences: [
    "The 87V has a low-pass filter for drive outputs; Extech's datasheet gives the filter only to the EX520A and EX530A, not the EX505A.",
    "Fluke specifies 87V DC volts at ±(0.05% + 1); the EX505A is ±(0.5% + 5), ten times the percentage term.",
    "The EX505A is IP67 and drop-tested to 2 m; Fluke's comparison table lists the 87V at IP30.",
    "The 87V has 250 µs peak capture and a 19,999-count high-resolution mode; Extech lists neither on the EX505A.",
    "Extech specifies the EX505A's AC volts for non-sine waveforms at 50/60 Hz only; Fluke gives the 87V a 20 kHz bandwidth.",
    "The EX505A reads capacitance to 99.99 mF, ten times the 87V's 9,999 µF.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">A 480 V drive running a conveyor at 40 Hz</h2>
        <p className="text-muted leading-7 mb-4">
          This is the job that splits the pair. A drive feeding a 480 V motor at reduced speed produces a PWM waveform,
          not a sine wave, at a fundamental below 60 Hz. Fluke built the 87V for it: a low-pass filter rolls off at 3 dB
          at 1 kHz so the meter reports something close to the fundamental the motor sees. Extech&apos;s manual for the
          EX505A specifies AC volts from 50 Hz to 1 kHz for sine waves and at 50/60 Hz for all other waveforms, and the
          datasheet marks the low-pass filter as absent on this model.
        </p>
        <p className="text-muted leading-7 mb-4">
          Put those together and a 40 Hz PWM output falls outside the EX505A&apos;s specification twice over: it is below
          50 Hz, and it isn&apos;t a sine. The meter will display a number, but Extech makes no accuracy claim for it.
          The 87V, with its filter, gives a reading you can compare phase to phase and against the drive&apos;s own
          display. We cover drive measurement on the 87V in more depth in{" "}
          <Link href="/multimeters/fluke-87v-vs-fluke-179" className={link}>
            Fluke 87V vs Fluke 179
          </Link>
          , which is the comparison to read if drives are your main job.
        </p>
        <KeyIdea title="If you want Extech with a filter">
          Extech&apos;s datasheet gives LoZ and the low-pass filter to the EX520A and EX530A in the same IP67 housing.
          Neither is on our verified list yet, so we can&apos;t recommend one here; check that model&apos;s datasheet
          before assuming the EX505A has the same functions.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">A 4–20 mA loop and a 24 V DC supply: where 0.05% shows</h2>
        <p className="text-muted leading-7 mb-4">
          Instrument technicians feel the accuracy gap more than electricians do. Worked on each maker&apos;s spec for a
          transmitter reading 12.00 mA: the 87V&apos;s 60 mA range at ±(0.2% + 4 digits) allows ±(0.024 + 0.04) =
          ±0.064 mA. Extech&apos;s manual table groups its DC current ranges at ±(1.0% + 3) and ±(1.5% + 3), and the
          layout doesn&apos;t make clear which applies to 60.00 mA, so we take the looser figure: ±(0.18 + 0.03) = ±0.21
          mA. Across a 16 mA span that is 0.4% of span on the Fluke against 1.3% on the Extech.
        </p>
        <p className="text-muted leading-7 mb-4">
          The same pattern holds on a 24.00 V control supply read on the 60 V range: the 87V allows ±(0.012 + 0.01) =
          ±0.022 V and the EX505A ±(0.12 + 0.05) = ±0.17 V. Both are fine for &quot;is the supply up?&quot;. Only the
          Fluke is tight enough to judge a supply against a ±1% tolerance with margin.
        </p>
        <Figure caption={<>Allowed error on a 12.00 mA loop reading, as a percentage of the 16 mA span. Worst-case grouping used for the EX505A.</>}>
          <BarChart
            items={[
              { label: "Fluke 87V", value: 0.4, display: "±0.4% of span", highlight: true },
              { label: "Extech EX505A", value: 1.3, display: "±1.3% of span" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          For loop work specifically, our{" "}
          <Link href="/multimeters/best-multimeters-for-4-20ma-loop-testing" className={link}>
            4–20 mA loop testing picks
          </Link>{" "}
          include process meters that source as well as measure.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Washdown, rain and drops: what IP67 buys</h2>
        <p className="text-muted leading-7 mb-4">
          The EX505A&apos;s strongest card is its housing. Extech says it is double-molded, rated IP67 (tested by
          Bureau Veritas, per the manual) and drop-tested to 2 m. IP67 means dust-tight and protected against temporary
          immersion. Fluke&apos;s comparison table lists the standard 87V at IP30, which means no rated water
          protection, and Fluke&apos;s own pages differ on its drop rating: 3 m in the comparison table, 1 m in the spec
          tab&apos;s shock line.
        </p>
        <p className="text-muted leading-7 mb-4">
          On a food plant&apos;s washdown floor, a wastewater site or an outdoor substation yard, that difference
          decides more than any accuracy figure. The EX505A also comes with a carrying case, magnetic hanging strap and
          Type K bead probe, though Extech rates that probe only to 250°C even though the meter reads to 760°C. If
          you want the 87V&apos;s filter and accuracy in a sealed body, Fluke&apos;s 87V MAX is IP67; we compare it in{" "}
          <Link href="/multimeters/fluke-87v-vs-fluke-87v-max" className={link}>
            Fluke 87V vs 87V MAX
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Plant jobs side by side</h2>
        <DataTable
          head={["Job", "Fluke 87V", "Extech EX505A"]}
          rows={[
            ["480 V drive output at 40 Hz", "Low-pass filter, 3 dB at 1 kHz", "Outside spec (non-sine, below 50 Hz)"],
            ["Loop at 12.00 mA", "±0.064 mA", "Up to ±0.21 mA"],
            ["24.00 V control supply", "±0.022 V", "±0.17 V"],
            ["Motor inrush or a dropout", "250 µs peak capture", "Not listed"],
            ["Washdown area or rain", "IP30", "IP67"],
            ["20,000 µF bus capacitor (de-energized)", "Over its 9,999 µF limit", "Within 99.99 mF, ±10%"],
            ["Bearing at 120°C", "With a suitable probe (extra)", "Supplied probe, rated to 250°C"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          We bought and tested the 87V on our own bench, and the{" "}
          <Link href="/multimeters/fluke-87v-review" className={link}>
            Fluke 87V review
          </Link>{" "}
          explains what that covered. The EX505A assessment comes from Extech&apos;s manual, datasheet and product page;
          we haven&apos;t had one on the bench. For a wider field, the{" "}
          <Link href="/multimeters/best-multimeter-for-electricians" className={link}>
            best multimeter for electricians
          </Link>{" "}
          roundup ranks CAT IV meters across price tiers.
        </p>
        <div className="mt-4">
          <Callout title="CAT IV needs CAT IV leads and real PPE">
            Both meters are rated CAT IV 600V and CAT III 1000V, which covers a 480 V motor control center and the
            service entrance. The rating only holds with leads rated the same, and it doesn&apos;t replace arc-flash
            PPE, lockout/tagout or a qualified person. Before measuring capacitance on a drive, lock it out and confirm
            the DC bus has discharged per the drive maker&apos;s instructions.
          </Callout>
        </div>
      </section>
    </>
  ),
  chooseNeitherIf:
    "You need both drive-output accuracy and a waterproof meter. The Fluke 87V MAX keeps the 87V's filter and ±(0.05% + 1) DC accuracy in an IP67 body with a 4 m drop rating.",
  bottomLine:
    "For industrial testing the Fluke 87V is the better meter: a low-pass filter for drives, 250 µs peak capture and DC accuracy ten times tighter make it the right tool for maintenance and instrumentation work. The Extech EX505A is the better buy where the meter takes abuse, with the same CAT IV 600V rating, IP67 sealing and a 2 m drop rating at roughly a quarter of the price, as long as you don't need to read drive outputs.",
  faqs: [
    {
      question: "Does the Extech EX505A have a low-pass filter?",
      answer:
        "No. Extech's EX5xxA datasheet lists the low-pass filter and LoZ for the EX520A and EX530A and marks both as absent on the EX505A. The manual also specifies AC volts for non-sine waveforms at 50/60 Hz only, so drive outputs fall outside its accuracy specification. The Fluke 87V's filter is rated 3 dB at 1 kHz.",
    },
    {
      question: "Is the Fluke 87V waterproof?",
      answer:
        "Fluke's comparison table lists the standard 87V at IP30, which means protection against solid objects but no rated water protection. The Extech EX505A is IP67, dust-tight and protected against temporary immersion. If you want Fluke's measuring performance in a sealed meter, the Fluke 87V MAX is rated IP67 with a 4 m drop rating.",
    },
    {
      question: "Is the EX505A accurate enough for 4–20 mA work?",
      answer:
        "For checking that a loop is alive and roughly where it should be, yes. On a 12.00 mA signal, the manual's looser DC current figure allows about ±0.21 mA, or 1.3% of a 16 mA span. The Fluke 87V allows about ±0.064 mA on the same reading. For calibration against a tight tolerance, the Fluke is the better choice.",
    },
    {
      question: "What is the difference between the Extech EX505 and EX505A?",
      answer:
        "Extech lists the EX505A as the current model that replaces the discontinued EX505. The EX505A is a 6,000-count True RMS meter rated CAT IV 600V / CAT III 1000V with IP67 sealing and a 2 m drop rating. We compared only the EX505A here, using its 2024 datasheet and current manual; we didn't verify the older EX505's specifications.",
    },
    {
      question: "Why does the Extech datasheet say 0.09% accuracy?",
      answer:
        "The EX5xxA datasheet covers three models, and one feature bullet says 0.09% next to the EX505A heading. The same datasheet's specification table gives the EX505A ±0.5% basic accuracy and the EX520A ±0.09%, and the EX505A manual specifies DC volts at ±(0.5% + 5). We use the manual's figure and treat the bullet as an error.",
    },
    {
      question: "Can the EX505A measure high temperatures?",
      answer:
        "The meter reads Type K thermocouples from -20 to 760°C, but Extech rates the supplied bead probe only to 250°C and warns that exceeding it can damage the probe and the meter. For hotter surfaces you need a separately rated probe. The Fluke 87V reads -200 to 1090 °C, with the probe sold separately and its own rating applying.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 87V vs Fluke 179", href: "/multimeters/fluke-87v-vs-fluke-179" },
    { label: "Fluke 87V vs Fluke 87V MAX", href: "/multimeters/fluke-87v-vs-fluke-87v-max" },
    { label: "Fluke 87V vs Hioki DT4256", href: "/multimeters/fluke-87v-vs-hioki-dt4256" },
    { label: "Best multimeters for 4–20 mA loop testing", href: "/multimeters/best-multimeters-for-4-20ma-loop-testing" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
  ],
};

export default function Fluke87VVsExtechEx505aPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
