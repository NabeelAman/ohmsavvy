// Specs per maker sources:
// - Fluke 115: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-115 and the 114/115/116/117
//   datasheet (2793260b, 08/2020) https://media.fluke.com/ce54d963-3be9-4e70-8a3e-b1060070fdfd_original%20file.pdf, as cited
//   on /multimeters/fluke-115-review and /multimeters/fluke-115-vs-klein-mm400 (checked 2026-10-26):
//   True RMS; DC V 600.0 mV-600.0 V ±(0.5% + 2); AC V ±(1.0% + 3) DC-500 Hz, ±(2.0% + 3) 500 Hz-1 kHz; A AC/DC 6.000 A and
//   10.00 A (DC ±(1.0% + 3), AC ±(1.5% + 3) 45-500 Hz), 1 mA best resolution, no mA or µA range; resistance to 40.00 MΩ;
//   continuity detects opens/shorts of 500 µs or longer; capacitance to 9,999 µF; frequency to 50.00 kHz; 6,000 counts
//   + 33-segment bar graph; Min/Max/Avg; backlight; CAT III 600 V; one 9 V battery, 400 h typical without backlight;
//   167 x 84 x 46 mm, 550 g; 3-year warranty. Hands-on tested by the owner (handsOnTested: true).
// - KAIWEETS HT118E: https://kaiweets.com/products/ht118e-20000-counts-digital-multimeter ("Parameters" table and
//   description, checked 2026-10-29): 20000 counts; DC V 200 mV/2/20/200/1000 V ±(0.08% + 5); AC V 200 mV-750 V
//   ±(1.0% + 25); DC A 200 µA/2000 µA/20 mA/200 mA ±(0.5% + 5), 10 A ±(1.0% + 15); AC A 200 µA-200 mA ±(1.0% + 25),
//   10 A ±(1.5% + 25); resistance 200 Ω-2 MΩ ±(1.0% + 15), 20/100 MΩ ±(3.0% + 25); capacitance 20 nF to 2 mF ±(4.0% + 50);
//   frequency 200 Hz to 10 MHz ±(1.0% + 10); duty 1-99%; temperature -20 to 1000 °C ±(1.0% + 2 °C); NCV and Live with
//   sound and light alarm; Min/Max/Average; lit input jacks; flashlight; backlight; auto-ranging; IEC CAT III 1000V,
//   CAT IV 600V, CE, RoHS; double ceramic fuse; 3-year warranty. Official Amazon listing B0B7WFPB4T (checked 2026-10-29)
//   repeats these, adds FCC, "36-Month after-sale service", thermocouple, batteries and case in the box, item weight
//   362.87 g (not stated whether that includes the case).
//   Neither KAIWEETS source we read calls the HT118E True RMS, and AC bandwidth and battery life aren't published;
//   the catalog Pick lists "True RMS". The page states this conflict. Per-range resolution isn't published:
//   0.01 µA, 0.01 mA, 0.01 V and 0.001 V below follow from 20,000 counts on the published ranges (as on the Pick).
// Amazon.com availability checked 2026-10-29 with Chrome at ZIP 10001: both In Stock with Add to Cart.
// Worked tolerances are arithmetic on published specs; example currents and voltages are illustrative, not measurements.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { pickByName } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-115-vs-kaiweets-ht118e";

export const metadata = buildMetadata({
  title: "Fluke 115 vs KAIWEETS HT118E: Better Value?",
  description:
    "Fluke 115 vs KAIWEETS HT118E: microamp ranges, 20,000 counts and temperature against documented True RMS and AC accuracy. Which multimeter is the better value?",
  image: picks.find((p) => p.name === "Fluke 115")!.image,
  path: "/multimeters/fluke-115-vs-kaiweets-ht118e",
});

const link = "text-accent hover:underline";

/** The 115's and HT118E's lowest current resolution on a log scale, with a few-µA flame-sensor signal for reference. */
function CurrentResolutionDiagram() {
  // Log scale from 0.001 µA to 10,000 µA across x = 30..330 (7 decades, about 43 px each).
  const x = (uA: number) => 30 + ((Math.log10(uA) + 3) / 7) * 300;
  const ticks = [0.01, 1, 100, 10000];
  return (
    <svg
      viewBox="0 0 360 150"
      className="w-full h-auto"
      role="img"
      aria-label="Log-scale diagram of the smallest current step each meter can show: the KAIWEETS HT118E resolves 0.01 microamps, the Fluke 115 resolves 1 milliamp, which is 1,000 microamps; a typical flame-sensor signal of a few microamps sits between them, readable only on the HT118E"
    >
      <line x1="30" x2="330" y1="80" y2="80" className="stroke-border" strokeWidth="1.2" />
      {ticks.map((t) => (
        <g key={t}>
          <line x1={x(t)} x2={x(t)} y1="76" y2="84" className="stroke-muted" strokeWidth="1" />
          <text x={x(t)} y="98" fontSize="8.5" textAnchor="middle" className="fill-muted">
            {t >= 1000 ? `${t / 1000} mA` : `${t} µA`}
          </text>
        </g>
      ))}
      <rect x={x(2)} y="66" width={x(6) - x(2)} height="28" rx="4" className="fill-accent" opacity="0.15" />
      <text x={(x(2) + x(6)) / 2} y="122" fontSize="8.5" textAnchor="middle" className="fill-foreground">
        Flame-sensor signal, a few µA
      </text>
      <circle cx={x(0.01)} cy="80" r="5" className="fill-accent" />
      <text x={x(0.01)} y="54" fontSize="9.5" fontWeight="600" textAnchor="middle" className="fill-accent">
        HT118E: 0.01 µA
      </text>
      <circle cx={x(1000)} cy="80" r="5" className="fill-foreground" />
      <text x={x(1000)} y="54" fontSize="9.5" fontWeight="600" textAnchor="middle" className="fill-foreground">
        Fluke 115: 1 mA
      </text>
      <text x="180" y="18" fontSize="10" fontWeight="600" textAnchor="middle" className="fill-foreground">
        Smallest current step each meter can display
      </text>
      <text x="180" y="142" fontSize="8" textAnchor="middle" className="fill-muted">
        HT118E step derived from 20,000 counts on its 200 µA range; KAIWEETS doesn&apos;t print it
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 115 vs KAIWEETS HT118E: Which Multimeter Offers Better Value?",
  path,
  published: "2026-10-29",
  intro:
    "Fluke 115 vs KAIWEETS HT118E is a rare matchup where the cheap meter has the longer spec sheet. The HT118E cost roughly a fifth of the Fluke's price on Amazon when we checked, yet it adds microamp and milliamp ranges, temperature, 20,000 counts and a higher printed CAT rating. Buy it for HVAC flame sensors, parasitic battery drain and bench electronics. Buy the Fluke 115 for field service on drives, lighting and motor circuits, where you need True RMS that the maker documents and AC accuracy that holds up digit for digit. We bought and tested the 115 on our own bench; the HT118E is desk research.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 115")!,
    imageAlt: "Fluke 115 True RMS field-service multimeter, front view",
    chooseIf: [
      "You troubleshoot variable-speed drives, LED lighting or other non-sine loads and need documented True RMS",
      "You want tight AC accuracy: ±(1.0% + 3) against the HT118E's ±(1.0% + 25)",
      "You want a meter we have bought and tested ourselves, with fully published specs",
    ],
  },
  b: {
    pick: pickByName("KAIWEETS HT118E")!,
    imageAlt: "KAIWEETS HT118E 20,000-count digital multimeter with protective case, front view",
    chooseIf: [
      "You need microamps or milliamps: flame sensors, sleep current, parasitic drain",
      "You want temperature, duty cycle and non-contact voltage on one dial",
      "You want the most DC precision per dollar: ±(0.08% + 5) on volts",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "6,000 counts + 33-segment bar graph", b: "20,000 counts" },
    { label: "AC response", a: "True RMS (Fluke)", b: "Not stated by KAIWEETS; our catalog lists True RMS" },
    { label: "DC volts accuracy", a: "±(0.5% + 2)", b: "±(0.08% + 5)" },
    { label: "AC volts accuracy", a: "±(1.0% + 3) up to 500 Hz", b: "±(1.0% + 25); bandwidth not stated" },
    { label: "Max voltage", a: "600V AC/DC", b: "1000V DC / 750V AC" },
    { label: "Current ranges", a: "6 A and 10 A only (1 mA best resolution)", b: "200 µA, 2,000 µA, 20 mA, 200 mA, 10 A" },
    { label: "Resistance", a: "Up to 40 MΩ", b: "Up to 100 MΩ" },
    { label: "Capacitance", a: "Up to 9,999 µF", b: "20 nF to 2 mF (2,000 µF)" },
    { label: "Frequency", a: "Up to 50 kHz", b: "Up to 10 MHz, plus duty cycle" },
    { label: "Temperature", a: "No", b: "-20°C to 1000°C, thermocouple included" },
    { label: "Non-contact voltage", a: "No", b: "Yes, with sound and light alarm" },
    { label: "CAT rating", a: "CAT III 600V", b: "CAT III 1000V / CAT IV 600V (KAIWEETS)" },
    { label: "Battery", a: "One 9V, about 400 hours", b: "Included; type and life not stated" },
    { label: "Size / weight", a: "167 × 84 × 46 mm, 550 g", b: "Not stated for the meter alone" },
    { label: "Warranty", a: "3 years", b: "3 years" },
  ],
  differences: [
    "Small currents: the HT118E has 200 µA, 2,000 µA, 20 mA and 200 mA ranges; the Fluke 115 goes no lower than its 6 A range, with 1 mA as its finest step.",
    "AC voltage: Fluke documents True RMS and ±(1.0% + 3) up to 500 Hz for the 115; KAIWEETS publishes ±(1.0% + 25) with no frequency band and, in the sources we read, no True RMS claim.",
    "DC voltage: on paper the HT118E is far tighter, ±(0.08% + 5) against ±(0.5% + 2), with 20,000 counts against 6,000.",
    "Extras: the HT118E adds temperature, duty cycle, non-contact voltage, a flashlight and lit input jacks; the 115 has none of them.",
    "Safety rating: KAIWEETS prints CAT III 1000V and CAT IV 600V for the HT118E; the Fluke 115 is CAT III 600V.",
    "Both carry a 3-year warranty, so the length of cover doesn't separate them.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Microamps and milliamps: the HT118E&apos;s clearest win</h2>
        <p className="text-muted leading-7 mb-4">
          The Fluke 115 is built for amps, not fractions of them. Its current input tops out at 10 A, and its finest
          step is 1 mA, so anything that draws less than a few milliamps reads as zero or close to it. The HT118E
          has four ranges below 1 A, starting at 200 µA. That single difference decides the purchase for two big
          groups of buyers: HVAC technicians checking flame-rectification current, and anyone chasing a battery that
          goes flat overnight.
        </p>
        <Figure caption={<>A flame-sensor signal of a few microamps is far below the Fluke 115&apos;s 1 mA resolution and well within the HT118E&apos;s 200 µA range.</>}>
          <CurrentResolutionDiagram />
        </Figure>
        <h3 className="text-lg font-semibold mt-6 mb-3">Worked scenario: a furnace flame sensor and a car&apos;s overnight drain</h3>
        <p className="text-muted leading-7 mb-4">
          Take an illustrative flame-sensor reading of 4.00 µA in series with the sensor lead. On the HT118E&apos;s
          200 µA range the published accuracy is ±(0.5% + 5 digits). At 20,000 counts a digit on that range is
          0.01 µA, so the tolerance is 0.5% × 4.00 + 5 × 0.01 = ±0.07 µA: the true current lies between 3.93
          and 4.07 µA. The Fluke 115 can&apos;t take the reading at all; 4 µA is 0.000004 A, and its display shows
          0.000 A.
        </p>
        <DataTable
          head={["Illustrative reading", "Fluke 115 shows", "KAIWEETS HT118E shows", "HT118E tolerance"]}
          rows={[
            ["4.00 µA flame-sensor current", "0.000 A", "4.00 µA (200 µA range)", "±0.07 µA"],
            ["35 mA parasitic drain, key off", "0.035 A, ±3.4 mA", "35.00 mA (200 mA range)", "±0.23 mA"],
            ["8 A space-heater load (AC)", "8.00 A, ±0.15 A", "8 A on the 10 A range", "±(1.5% + 25 digits); digit size not stated"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The drain row shows the Fluke can read milliamps, just coarsely: 35 mA appears as 0.035 A, and its DC
          tolerance of 1.0% × 0.035 + 3 × 0.001 = ±0.0034 A is about a tenth of the reading. The HT118E on its
          200 mA range works out to 0.5% × 35.00 + 5 × 0.01 = ±0.23 mA. For a parasitic-drain hunt, where you pull
          fuses one at a time and watch a reading drop by a few milliamps, that finer step is what you&apos;re paying
          for. Our guide to{" "}
          <Link href="/multimeters/how-to-measure-parasitic-battery-drain" className={link}>
            measuring parasitic battery drain
          </Link>{" "}
          walks through the fuse-pull method.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Mains AC on motors and drives: where the Fluke 115 earns its price</h2>
        <p className="text-muted leading-7 mb-4">
          More counts don&apos;t mean more accuracy. On an ordinary 120 V outlet the two meters come out almost
          level. The Fluke 115 on its 600.0 V range: 1.0% × 120.0 + 3 × 0.1 = ±1.5 V. The HT118E on its 200 V range,
          where a digit is 0.01 V: 1.0% × 120.00 + 25 × 0.01 = ±1.45 V. Its extra digit is swallowed by a
          25-digit error term, eight times larger than the Fluke&apos;s.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Published tolerance on a 120 V AC reading: effectively a tie.</>}>
            <BarChart
              items={[
                { label: "Fluke 115", value: 1.5, display: "±1.5 V" },
                { label: "KAIWEETS HT118E", value: 1.45, display: "±1.45 V" },
              ]}
            />
          </Figure>
          <Figure caption={<>Published tolerance on a 12.60 V DC reading: the HT118E is about five times tighter.</>}>
            <BarChart
              items={[
                { label: "Fluke 115", value: 0.083, display: "±0.083 V" },
                { label: "KAIWEETS HT118E", value: 0.015, display: "±0.015 V", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The real gap is what each maker leaves out. Fluke states that the 115 is True RMS and that its AC accuracy
          holds up to 500 Hz, and to ±(2.0% + 3) up to 1 kHz. KAIWEETS gives one AC figure with no frequency band,
          and neither its product page nor its Amazon listing, as we read them, calls the HT118E True RMS, even though
          our own catalog entry lists it that way. On the output of a variable-speed drive, where the fundamental
          shifts and harmonics ride on top, the 115 has published specs for the job and the HT118E doesn&apos;t. Until
          KAIWEETS confirms True RMS and a bandwidth, treat its AC readings on electronic loads as indicative, not
          exact.
        </p>
        <div className="mt-4">
          <KeyIdea title="What the extra money buys">
            With the Fluke you get fewer functions but a spec sheet with no gaps: AC bandwidth, continuity response
            down to 500 µs dropouts, battery life and weight are all published, and it&apos;s a meter we&apos;ve had
            on our own bench. The HT118E publishes a wider range of functions but leaves those details blank. If
            your work is mains troubleshooting on drives and lighting, that completeness is worth paying for. See our{" "}
            <Link href="/multimeters/fluke-115-review" className={link}>
              Fluke 115 review
            </Link>{" "}
            for how it handles day to day.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Job", "Better value", "Deciding spec"]}
          rows={[
            ["HVAC flame-sensor current", "KAIWEETS HT118E", "200 µA range; the 115 has no µA range"],
            ["Supply and return air temperatures", "KAIWEETS HT118E", "Thermocouple included; the 115 has no temperature input"],
            ["Car parasitic drain", "KAIWEETS HT118E", "20 mA and 200 mA ranges"],
            ["Drives, LED lighting, switch-mode loads", "Fluke 115", "Documented True RMS with a stated AC bandwidth"],
            ["Motor-run and supply capacitors", "Either", "9,999 µF vs 2,000 µF; both cover typical run capacitors"],
            ["12 V and 24 V DC systems, battery banks", "KAIWEETS HT118E", "±(0.08% + 5) DC volts"],
            ["Arduino and logic-level PWM", "KAIWEETS HT118E", "Duty cycle and frequency to 10 MHz"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For low-current work beyond these two, our roundup of the{" "}
          <Link href="/multimeters/best-multimeters-for-measuring-microamps" className={link}>
            best multimeters for measuring microamps
          </Link>{" "}
          ranks the HT118E against meters with published burden voltage. If you&apos;re choosing between Fluke
          models, the{" "}
          <Link href="/multimeters/fluke-115-vs-fluke-117" className={link}>
            Fluke 115 vs Fluke 117
          </Link>{" "}
          comparison covers what the 117&apos;s electrician features add.
        </p>
        <div className="mt-4">
          <Callout title="A higher printed CAT rating isn't the whole story">
            KAIWEETS rates the HT118E CAT III 1000V and CAT IV 600V, which on paper covers the meter base and
            service entrance, where the Fluke 115&apos;s CAT III 600V rating stops. The certifications KAIWEETS lists
            alongside it (CE, RoHS and FCC) aren&apos;t a third-party test of that rating, and neither of its pages we
            read names a testing lab. Whatever meter you use, the service entrance has no breaker upstream to limit
            a fault, so leave work there to the utility or a licensed electrician.
          </Callout>
        </div>
      </section>
    </>
  ),
  bottomLine:
    "On value, the KAIWEETS HT118E wins for most buyers: microamp and milliamp ranges, temperature, 20,000 counts and tighter DC accuracy at roughly a fifth of the price. The Fluke 115 is worth the premium if your work is mains troubleshooting on drives, lighting and motor circuits, where documented True RMS, a published AC bandwidth and our own bench time with it count for more than extra functions.",
  faqs: [
    {
      question: "Is the KAIWEETS HT118E True RMS?",
      answer:
        "The sources we checked don't say. KAIWEETS's HT118E product page and its official Amazon listing describe 20,000 counts, AC and DC voltage and current, and the full function list, but neither calls the meter True RMS, though our own catalog lists it that way. The Fluke 115 is True RMS per Fluke. If True RMS matters to you, confirm with KAIWEETS before buying.",
    },
    {
      question: "Can the Fluke 115 measure a flame sensor's microamps?",
      answer:
        "No. Its current ranges are 6 A and 10 A, with 1 mA as its finest step, so a signal of a few microamps reads as zero. The HT118E's 200 µA range resolves 0.01 µA, a figure derived from 20,000 counts because KAIWEETS doesn't print it. For a Fluke that reads microamps, see the Fluke 116 or 87V.",
    },
    {
      question: "Does CAT IV 600V make the HT118E safer than the Fluke 115?",
      answer:
        "On paper, the HT118E is rated for more locations: CAT IV 600V covers the service entrance, while the Fluke 115's CAT III 600V stops at the distribution panel. A printed rating is only as good as the testing behind it, and KAIWEETS lists CE, RoHS and FCC rather than a named safety lab. For panel and branch-circuit work, both ratings are enough.",
    },
    {
      question: "Which has the better warranty, the Fluke 115 or the HT118E?",
      answer:
        "They're level at three years each. Fluke gives the 115 a 3-year warranty, and KAIWEETS offers 3 years on its product page, described on the Amazon listing as 36 months of after-sale service. So warranty length doesn't decide this comparison; the measurement functions and published specs do.",
    },
    {
      question: "Which meter is better for 12 V automotive and solar work?",
      answer:
        "The HT118E, on paper. Its DC volts accuracy is ±(0.08% + 5), so a 12.60 V reading is good to about ±0.015 V, against about ±0.083 V on the Fluke 115. It also has 20 mA and 200 mA ranges for parasitic drain and a 10 A range. Both handle a typical 12 V system's voltages comfortably.",
    },
    {
      question: "Has OhmSavvy tested both meters?",
      answer:
        "Only the Fluke 115. The owner bought and tested it on our own bench, which is why it carries our Hands-on Tested badge. The KAIWEETS HT118E assessment is desk research from KAIWEETS's product page and its official Amazon listing. Every tolerance on this page is arithmetic on published specs, and the example currents are illustrative, not our measurements.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 115 review", href: "/multimeters/fluke-115-review" },
    { label: "Fluke 115 vs Fluke 117", href: "/multimeters/fluke-115-vs-fluke-117" },
    { label: "Fluke 115 vs Klein MM400", href: "/multimeters/fluke-115-vs-klein-mm400" },
    { label: "Best multimeters for measuring microamps", href: "/multimeters/best-multimeters-for-measuring-microamps" },
    { label: "Best multimeter for HVAC technicians", href: "/multimeters/best-multimeter-for-hvac-technicians" },
    { label: "How to measure parasitic battery drain", href: "/multimeters/how-to-measure-parasitic-battery-drain" },
  ],
};

export default function Fluke115VsKaiweetsHt118ePage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
