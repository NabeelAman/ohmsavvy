// Specs per maker sources, checked 2026-11-07:
// - KAIWEETS HT118A: https://kaiweets.com/products/ht118a-digital-multimeter (description, Specifications table,
//   Package Lists and feature panels): 6000-count resolution; DC V 600 mV/6/60/600/1000 V ±(0.5% + 3); AC V 600 mV
//   ±(0.8% + 3), 6/60/600/750 V ±(0.8% + 3); DC and AC current 600 µA/6000 µA/60 mA/600 mA ±(1.0% + 3), 10 A
//   ±(1.5% + 3); resistance 600 Ω to 60 MΩ ±(0.8% + 5); capacitance 10 nF to 10 mF ±(4.0% + 3), 100 mF ±(5.0% + 3);
//   frequency 10 Hz to 10 MHz ±(1.0% + 3); duty 1-99% ±(1.0% + 2); temperature -40 to 1000 °C ±(1.0% + 3), K-type
//   thermocouple included; continuity green under 30 Ω, red 30-60 Ω; display turns orange above 80 V; bar graph;
//   NCV and Live; jack LEDs; flashlight; kickstand; Min/Max/Average; IEC CAT III 1000V, CAT IV 600V; dual fuse and dual
//   PTC; 2 x AAA batteries in the package list; 3-year warranty. Conflicts on the same page: description text says
//   "up to 600V AC/DC" while the table says 1000 V DC / 750 V AC; display given as 2.9" in one place and 2.7 inch in
//   another. The HT118A Pick cites the user manual for 2 x AA (conflicts with the AAA package list). KAIWEETS's page
//   doesn't say True RMS; the Amazon listing B07SHLS639 title does ("TRMS"), and its bullets give 1000V DC / 750V AC.
// - KAIWEETS HT118E: https://kaiweets.com/products/ht118e-20000-counts-digital-multimeter (description, Specifications
//   table and Package Lists): 20000 counts; DC V 200 mV/2/20/200/1000 V ±(0.08% + 5); AC V 200 mV to 750 V
//   ±(1.0% + 25); DC A 200 µA/2000 µA/20 mA/200 mA ±(0.5% + 5), 10 A ±(1.0% + 15); AC A 200 µA-200 mA ±(1.0% + 25),
//   10 A ±(1.5% + 25); resistance 200 Ω to 2 MΩ ±(1.0% + 15), 20 and 100 MΩ ±(3.0% + 25); capacitance 20 nF to 2 mF
//   ±(4.0% + 50); frequency 200 Hz to 10 MHz ±(1.0% + 10); duty 1-99% ±(3.0% + 30); temperature -20 to 1000 °C
//   ±(1.0% + 2 °C); NCV and Live, screen turns red on a live wire; jack LEDs; flashlight; kickstand; Min/Max/Average;
//   IEC CAT III 1000V, CAT IV 600V; 2 x AAA; EVA case in the box; 3-year warranty. Neither KAIWEETS's page nor the
//   Amazon listing B0B7WFPB4T claims True RMS. Neither page lists a relative (REL) mode for either meter.
// - KAIWEETS user manuals for both models are image-only PDFs, so nothing is quoted from them directly.
// Amazon.com (Playwright, installed Chrome, ZIP 10001, 2026-11-07): B07SHLS639 In Stock, Add to Cart, sold by KAIWEETS
// Direct; B0B7WFPB4T In Stock, Add to Cart, sold by KAIWEETS Direct. KAIWEETS's own comparison table on the HT118E
// listing: HT118E 20000 counts auto; HT118A 6000 counts auto. Prices not shown on the page.
// Neither meter is hands-on tested. Resolution figures follow from range and count; worked error bands are arithmetic
// on the published accuracy and are labeled illustrative.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { pickByName } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/kaiweets-ht118a-vs-kaiweets-ht118e";
const ht118a = pickByName("KAIWEETS HT118A")!;
const ht118e = pickByName("KAIWEETS HT118E")!;

export const metadata = buildMetadata({
  title: "KAIWEETS HT118A vs HT118E: 6K vs 20K Counts",
  description:
    "KAIWEETS HT118A vs HT118E: the 20,000-count E wins on DC volts and µA, the 6,000-count A wins on AC volts, capacitance and True RMS. The math, job by job.",
  image: ht118e.image,
  path: "/multimeters/kaiweets-ht118a-vs-kaiweets-ht118e",
});

const link = "text-accent hover:underline";

/** Error bands on a number line: DC 12.6 V (E is tighter) and AC 120 V (A is tighter). */
function ErrorBandDiagram() {
  // DC row: center 12.6, scale ±0.1 V over 140 px each side
  const dc = (v: number) => 200 + (v / 0.1) * 140;
  // AC row: center 120, scale ±1.6 V over 140 px each side
  const ac = (v: number) => 200 + (v / 1.6) * 140;
  return (
    <svg
      viewBox="0 0 400 230"
      className="w-full h-auto"
      role="img"
      aria-label="Error-band diagram. Top: on a 12.6 volt DC battery the KAIWEETS HT118E's band is plus or minus 0.015 volts and the HT118A's is plus or minus 0.093 volts, so the HT118E is about six times tighter. Bottom: on a 120 volt AC outlet the HT118A's band is plus or minus 1.26 volts and the HT118E's is plus or minus 1.45 volts, because the HT118E's 25-digit term costs more than its extra resolution gains."
    >
      <text x="20" y="18" fontSize="10" fontWeight="700" className="fill-foreground">DC: 12.6 V car battery</text>
      <path d="M200 30 V96" className="stroke-foreground" strokeWidth="1" strokeDasharray="3 3" />
      <text x="200" y="108" fontSize="8" textAnchor="middle" className="fill-muted">12.600 V</text>
      <rect x={dc(-0.093)} y="40" width={dc(0.093) - dc(-0.093)} height="14" rx="3" className="fill-surface stroke-foreground" strokeWidth="1.2" />
      <text x={dc(0.093) + 4} y="51" fontSize="8" className="fill-foreground">HT118A ±0.093 V</text>
      <rect x={dc(-0.0151)} y="66" width={dc(0.0151) - dc(-0.0151)} height="14" rx="3" className="fill-accent/20 stroke-accent" strokeWidth="1.2" />
      <text x={dc(0.0151) + 4} y="77" fontSize="8" className="fill-foreground">HT118E ±0.015 V</text>

      <text x="20" y="132" fontSize="10" fontWeight="700" className="fill-foreground">AC: 120 V outlet</text>
      <path d="M200 142 V208" className="stroke-foreground" strokeWidth="1" strokeDasharray="3 3" />
      <text x="200" y="220" fontSize="8" textAnchor="middle" className="fill-muted">120.0 V</text>
      <rect x={ac(-1.26)} y="152" width={ac(1.26) - ac(-1.26)} height="14" rx="3" className="fill-accent/20 stroke-accent" strokeWidth="1.2" />
      <text x={ac(1.26) + 4} y="163" fontSize="8" className="fill-foreground">HT118A ±1.26 V</text>
      <rect x={ac(-1.45)} y="178" width={ac(1.45) - ac(-1.45)} height="14" rx="3" className="fill-surface stroke-foreground" strokeWidth="1.2" />
      <text x={ac(1.45) - 4} y="202" fontSize="8" textAnchor="end" className="fill-foreground">HT118E ±1.45 V</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "KAIWEETS HT118A vs HT118E: Do 20,000 Counts Beat 6,000?",
  path,
  published: "2026-11-07",
  intro:
    "KAIWEETS HT118A vs HT118E looks like an old model against its upgrade, and on DC it is: the HT118E reads 20,000 counts, ±(0.08% + 5) on DC volts and a 200 µA range. Read the rest of KAIWEETS's tables and it isn't that simple. The 6,000-count HT118A has the tighter AC volts spec, capacitance to 100 mF instead of 2 mF, and a True RMS claim on its Amazon listing that KAIWEETS never makes for the HT118E. Both are CAT III 1000V / CAT IV 600V with NCV, lit jacks and a 3-year warranty.",
  a: {
    pick: ht118a,
    imageAlt: "KAIWEETS HT118A 6,000-count multimeter with kickstand, one side of KAIWEETS HT118A vs HT118E",
    chooseIf: [
      "Most of your readings are AC: outlets, appliances, HVAC controls",
      "You measure large capacitors, up to 100 mF",
      "You want a True RMS claim, which only the HT118A's listing makes",
    ],
  },
  b: {
    pick: ht118e,
    imageAlt: "KAIWEETS HT118E 20,000-count multimeter, front view",
    chooseIf: [
      "You check DC rails and batteries and want 1 mV steps at 12.6 V",
      "You measure sleep current or flame-sensor current in the low microamps",
      "You want a carrying case in the box",
    ],
  },
  extraSpecs: [
    { label: "Display counts", a: "6,000", b: "20,000" },
    { label: "True RMS", a: "Claimed on the Amazon listing; not on kaiweets.com", b: "Not claimed by KAIWEETS" },
    { label: "DC volts accuracy", a: "±(0.5% + 3)", b: "±(0.08% + 5)" },
    { label: "AC volts accuracy", a: "±(0.8% + 3)", b: "±(1.0% + 25)" },
    { label: "Lowest current range", a: "600 µA (0.1 µA steps)", b: "200 µA (0.01 µA steps, implied)" },
    { label: "DC current accuracy, µA-mA", a: "±(1.0% + 3)", b: "±(0.5% + 5)" },
    { label: "Resistance", a: "600 Ω to 60 MΩ, ±(0.8% + 5)", b: "200 Ω to 100 MΩ, ±(1.0% + 15) low ranges" },
    { label: "Capacitance", a: "10 nF to 100 mF", b: "20 nF to 2 mF" },
    { label: "Temperature", a: "-40 to 1000 °C", b: "-20 to 1000 °C" },
    { label: "Live-voltage cue", a: "Display turns orange above 80 V", b: "Screen turns red on a live wire" },
    { label: "Batteries", a: "2 × AAA (package list) or 2 × AA (manual, per our Pick)", b: "2 × AAA" },
    { label: "In the box", a: "Leads, thermocouple, batteries, manual", b: "Same plus an EVA case" },
  ],
  differences: [
    "DC volts: ±(0.08% + 5) on the HT118E against ±(0.5% + 3) on the HT118A, about six times tighter at 12.6 V.",
    "AC volts: the HT118A's ±(0.8% + 3) beats the HT118E's ±(1.0% + 25); at 120 V that is ±1.26 V against ±1.45 V.",
    "Microamps: the HT118E's 200 µA range resolves 0.01 µA; the HT118A's 600 µA range resolves 0.1 µA.",
    "Capacitance: the HT118A reaches 100 mF; the HT118E stops at 2 mF, fifty times lower.",
    "True RMS: only the HT118A's Amazon listing claims it; KAIWEETS makes no True RMS claim for the HT118E anywhere we read.",
    "Same in both: CAT III 1000V / CAT IV 600V, 10 A, frequency to 10 MHz, NCV and Live, jack LEDs, flashlight, kickstand, Min/Max/Average and a 3-year warranty.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">KAIWEETS HT118A vs HT118E: where the extra counts pay off</h2>
        <p className="text-muted leading-7 mb-4">
          A meter&apos;s accuracy spec has two parts: a percentage of the reading, and a number of digits added on top.
          More counts shrink the size of each digit, but if the maker also raises the digit count, the gain can vanish.
          That is exactly what happens between these two meters. On DC the HT118E wins clearly. On AC it loses.
        </p>
        <Figure caption={<>Error bands worked from KAIWEETS&apos;s published accuracy. Illustrative: real readings fall anywhere inside the band.</>}>
          <ErrorBandDiagram />
        </Figure>
        <p className="text-muted leading-7 my-4">
          The DC math: on its 20.000 V range the HT118E adds 0.08% of 12.600 V, which is 0.0101 V, plus 5 digits of
          1 mV, so ±0.015 V. The HT118A on its 60.00 V range adds 0.5%, which is 0.063 V, plus 3 digits of 10 mV, so
          ±0.093 V. The AC math runs the other way. At 120 V the HT118E uses its 200.00 V range: 1.0% is 1.2 V, plus
          25 digits of 10 mV is 0.25 V, so ±1.45 V. The HT118A on its 600.0 V range: 0.8% is 0.96 V, plus 3 digits of
          0.1 V is 0.3 V, so ±1.26 V.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Error on a 150 µA sleep current, DC. HT118E 200 µA range; HT118A 600 µA range.</>}>
            <BarChart
              items={[
                { label: "KAIWEETS HT118A", value: 1.8, display: "±1.8 µA" },
                { label: "KAIWEETS HT118E", value: 0.8, display: "±0.80 µA", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Top capacitance range, log scale. The HT118A reaches 100 mF; the HT118E stops at 2 mF.</>}>
            <BarChart
              log
              items={[
                { label: "KAIWEETS HT118A", value: 100, display: "100 mF", highlight: true },
                { label: "KAIWEETS HT118E", value: 2, display: "2 mF" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The microamp math, for an illustrative 150 µA load: the HT118E reads it on its 200.00 µA range at
          ±(0.5% + 5), so 0.75 µA plus 0.05 µA, ±0.80 µA. The HT118A reads it on its 600.0 µA range at ±(1.0% + 3), so
          1.5 µA plus 0.3 µA, ±1.8 µA. Above 200 µA the E switches to its 2000.0 µA range and the gap narrows. KAIWEETS
          publishes no burden voltage for either meter; our guide to{" "}
          <Link href="/multimeters/how-to-measure-microamps-with-a-multimeter" className={link}>
            measuring microamps
          </Link>{" "}
          explains why that matters on a 3.3 V board.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The True RMS question</h2>
        <p className="text-muted leading-7 mb-4">
          KAIWEETS&apos;s own product pages don&apos;t use the words True RMS for either meter. The HT118A&apos;s Amazon
          title says &ldquo;TRMS&rdquo;, and our Pick&apos;s photo shows &ldquo;TRUE RMS&rdquo; printed on the meter.
          Neither the HT118E&apos;s listing nor its product page makes that claim.
        </p>
        <p className="text-muted leading-7 mb-4">
          It matters on non-sine AC. Variable-speed fans, LED drivers, dimmers and inverter outputs produce distorted
          waveforms, and an average-responding meter can misread them. On a clean 120 V outlet, either meter will do.
          For HVAC blower motors on variable drives or a cheap inverter in an RV, buy the meter that claims True RMS,
          which here is the HT118A. Our{" "}
          <Link href="/multimeters/do-i-need-true-rms-multimeter" className={link}>
            do I need a True RMS multimeter
          </Link>{" "}
          guide explains when the difference shows up.
        </p>
        <KeyIdea title="Read both terms of the accuracy spec">
          ±(1.0% + 25) on a 20,000-count meter can be looser than ±(0.8% + 3) on a 6,000-count meter, because 25 small
          digits add up to more than 3 large ones. Work the number for the signal you measure before paying for counts.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Job", "Pick", "Why"]}
          rows={[
            ["Car battery and charging voltage", "KAIWEETS HT118E", "±0.015 V at 12.6 V against ±0.093 V"],
            ["Parasitic drain on a parked car", "KAIWEETS HT118E", "±(0.5% + 5) on the 20 mA and 200 mA ranges"],
            ["Furnace flame-sensor current", "KAIWEETS HT118E", "200 µA range with finer steps"],
            ["Outlet and appliance AC voltage", "KAIWEETS HT118A", "±1.26 V at 120 V against ±1.45 V"],
            ["Variable-speed blower or inverter output", "KAIWEETS HT118A", "Its listing claims True RMS; the HT118E's doesn't"],
            ["Large electrolytic filter capacitor above 2 mF", "KAIWEETS HT118A", "Reads to 100 mF; the HT118E stops at 2 mF"],
            ["Outdoor temperature in a cold garage", "KAIWEETS HT118A", "Rated down to -40 °C against -20 °C"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For car and battery work, the HT118E is the better meter of the two. For house, HVAC and appliance work, the
          HT118A is. If you split your time, the HT118A&apos;s True RMS claim and 100 mF range cover more situations
          where the other meter can&apos;t give an answer at all, while the HT118E&apos;s advantages are about a tighter
          answer on readings both meters can take.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The trust question: KAIWEETS&apos;s pages disagree with themselves</h2>
        <p className="text-muted leading-7 mb-4">
          The HT118A&apos;s product page says it measures &ldquo;up to 600V AC/DC&rdquo; in one paragraph and lists
          1000 V DC and 750 V AC in the spec table, which also matches the Amazon listing. It gives the display as
          2.9 inches in one place and 2.7 inches in another, and its package list says 2 × AAA while the manual cited in
          our Pick says 2 × AA. The HT118E&apos;s page is cleaner but has a typo in its capacitance ranges, and neither
          page publishes AC bandwidth, burden voltage or battery life.
        </p>
        <p className="text-muted leading-7 mb-4">
          None of that makes either meter a bad buy at its price. It does mean you should treat the spec table as the
          best guide, check the voltage printed by the input jacks, and not assume a feature exists because a related
          model has it.
        </p>
        <Callout title="1000 V ratings on budget meters">
          Both meters claim CAT III 1000V / CAT IV 600V. Inspect the leads and case before high-energy work, keep
          fingers behind the lead guards, and test on a known live source before you trust a zero reading. For work
          inside a service panel, hire a licensed electrician. See{" "}
          <Link href="/multimeters/cat-iii-vs-cat-iv-multimeter" className={link}>
            CAT III vs CAT IV
          </Link>{" "}
          for what those ratings cover.
        </Callout>
        <p className="text-muted leading-7 mt-4">
          Each meter also goes up against a Fluke:{" "}
          <Link href="/multimeters/fluke-117-vs-kaiweets-ht118a" className={link}>
            Fluke 117 vs KAIWEETS HT118A
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/fluke-115-vs-kaiweets-ht118e" className={link}>
            Fluke 115 vs KAIWEETS HT118E
          </Link>
          . For car work, see the{" "}
          <Link href="/multimeters/best-multimeter-for-automotive" className={link}>
            best multimeter for automotive
          </Link>{" "}
          picks, and for small currents the{" "}
          <Link href="/multimeters/best-multimeters-for-measuring-microamps" className={link}>
            microamp meter picks
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "The KAIWEETS HT118E is the better DC meter: 20,000 counts, ±(0.08% + 5) on DC volts and a 200 µA range make it the pick for batteries, cars and sleep current. The KAIWEETS HT118A is the better AC and all-round meter: a tighter ±(0.8% + 3) AC spec, a True RMS claim on its listing, capacitance to 100 mF and temperature down to -40 °C.",
  chooseNeitherIf:
    "You need to rule out ghost voltage when proving circuits dead. Neither KAIWEETS lists LoZ; an electrician's meter such as the Fluke 117 has it.",
  faqs: [
    {
      question: "Is the KAIWEETS HT118E an upgrade over the HT118A?",
      answer:
        "On DC, yes: 20,000 counts against 6,000, ±(0.08% + 5) DC volts against ±(0.5% + 3), and a finer 200 µA range. On AC and capacitance, no. The HT118A has a tighter ±(0.8% + 3) AC volts spec, reads capacitors to 100 mF instead of 2 mF, and its Amazon listing claims True RMS, which KAIWEETS doesn't claim for the HT118E.",
    },
    {
      question: "Is the KAIWEETS HT118E True RMS?",
      answer:
        "KAIWEETS doesn't say so. Its HT118E product page and Amazon listing describe 20,000 counts, the ranges and the safety rating, but neither uses the words True RMS. The HT118A's Amazon title does say TRMS. If you measure distorted AC, such as variable-speed motors or inverter output, treat the HT118E as average-responding until KAIWEETS states otherwise.",
    },
    {
      question: "Which KAIWEETS meter is better for a car battery?",
      answer:
        "The HT118E. On a 12.6 V battery its 20.000 V range shows 1 mV steps and KAIWEETS's ±(0.08% + 5) spec gives about ±0.015 V. The HT118A shows 10 mV steps with about ±0.093 V. Both are good enough to tell a charged battery from a flat one, but the HT118E shows small voltage drops across cables and grounds more clearly.",
    },
    {
      question: "Do both KAIWEETS meters have the same safety rating?",
      answer:
        "Yes. KAIWEETS rates both CAT III 1000V and CAT IV 600V, with double ceramic fuses and thermistor protection on all ranges. One caution on the HT118A: its product page text also says 600V AC/DC, which conflicts with the 1000 V DC and 750 V AC in its own spec table and on Amazon. We use the spec table.",
    },
    {
      question: "Which KAIWEETS meter reads larger capacitors?",
      answer:
        "The HT118A. It reads capacitance up to 100 mF, at ±(5.0% + 3) on that top range and ±(4.0% + 3) below it. The HT118E stops at 2 mF with ±(4.0% + 50). That covers most filter capacitors in power supplies and amplifiers on either meter, but a 1 farad car-audio capacitor is beyond both, so use a dedicated tester for one.",
    },
  ],
  roundup: { label: "See all multimeter picks", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 117 vs KAIWEETS HT118A", href: "/multimeters/fluke-117-vs-kaiweets-ht118a" },
    { label: "Fluke 115 vs KAIWEETS HT118E", href: "/multimeters/fluke-115-vs-kaiweets-ht118e" },
    { label: "Best multimeter for automotive", href: "/multimeters/best-multimeter-for-automotive" },
    { label: "Best multimeters for measuring microamps", href: "/multimeters/best-multimeters-for-measuring-microamps" },
    { label: "Best True RMS multimeters under $100", href: "/multimeters/best-true-rms-multimeters-under-100" },
    { label: "Best multimeters for car battery testing", href: "/multimeters/best-multimeters-for-car-battery-testing" },
    { label: "How to measure parasitic battery drain", href: "/multimeters/how-to-measure-parasitic-battery-drain" },
  ],
};

export default function KaiweetsHt118aVsKaiweetsHt118ePage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
