// Specs per Fluke, checked 2026-10-26:
// - Fluke 17B+ product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-17b-plus
//   (no True RMS claim; DC ±(0.5% + 3), AC ±(1.0% + 3); 400 µA to 10 A at ±(1.5% + 3); 40 MΩ; 1,000 µF; 100 kHz;
//   −55 to 400 °C with Type K probe; 4,000 counts; 2 × AA, 500 h minimum; 455 g)
// - Fluke 179 product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-179
//   (True RMS; DC ±(0.09% + 2), AC ±(1.0% + 3); 10 A with 0.01 mA resolution; 50 MΩ; 10,000 µF ±(1.2% + 2); 100 kHz;
//   −40 to 400 °C; CAT III 1000 V / CAT IV 600 V; 420 g; one 9 V, about 200 h; lifetime warranty)
// Form-factor errors below are standard textbook values for an average-responding meter calibrated to read RMS on a sine.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Fluke 17B+ vs Fluke 179",
  description:
    "Fluke 17B+ vs Fluke 179: a feature-rich entry meter without True RMS against Fluke's full-featured 170-series meter. The accuracy gap is the real difference.",
  path: "/multimeters/fluke-17b-plus-vs-fluke-179",
});

const link = "text-accent hover:underline";

/** Same peak voltage, two waveforms: an average-responding meter is right on the sine and 11% high on the square. */
function FormFactorDiagram() {
  const sine = Array.from({ length: 49 }, (_, i) => {
    const px = 18 + i * 2.75;
    const py = 70 - Math.sin((i / 48) * 2 * Math.PI) * 40;
    return `${i === 0 ? "M" : "L"}${px.toFixed(1)} ${py.toFixed(1)}`;
  }).join(" ");
  const panel = (x0: number, title: string, wave: React.ReactNode, rms: number, avgRead: number, note: string) => (
    <g>
      <text x={x0 + 84} y="14" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">{title}</text>
      <line x1={x0 + 14} x2={x0 + 152} y1="70" y2="70" className="stroke-border" strokeWidth="1" />
      {wave}
      <line x1={x0 + 14} x2={x0 + 152} y1={70 - rms * 40} y2={70 - rms * 40} className="stroke-accent" strokeWidth="1.5" />
      <line x1={x0 + 14} x2={x0 + 152} y1={70 - avgRead * 40} y2={70 - avgRead * 40} className="stroke-muted" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x={x0 + 84} y="132" fontSize="8.5" textAnchor="middle" className="fill-accent">True RMS (179): {rms.toFixed(3)} × peak</text>
      <text x={x0 + 84} y="145" fontSize="8.5" textAnchor="middle" className="fill-muted">Average-responding: {avgRead.toFixed(3)} × peak</text>
      <text x={x0 + 84} y="160" fontSize="8.5" fontWeight="700" textAnchor="middle" className="fill-foreground">{note}</text>
    </g>
  );
  return (
    <svg
      viewBox="0 0 340 170"
      className="w-full h-auto"
      role="img"
      aria-label="Two waveforms with the same peak. On a sine wave the True RMS value and an average-responding meter's reading coincide at 0.707 times peak. On a square wave the true RMS is 1.000 times peak but an average-responding meter displays 1.111 times peak, about 11 percent high."
    >
      {panel(0, "Sine wave", <path d={sine} className="fill-none stroke-foreground" strokeWidth="2" />, 0.707, 0.707, "Both read correctly")}
      {panel(
        176,
        "Square wave",
        <path d="M194 30 H228 V110 H262 V30 H296 V110 H328" className="fill-none stroke-foreground" strokeWidth="2" />,
        1.0,
        1.111,
        "Averaging reads 11% high",
      )}
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 17B+ vs Fluke 179",
  path: "/multimeters/fluke-17b-plus-vs-fluke-179",
  published: "2026-10-22",
  updated: "2026-10-26",
  intro:
    "Both meters pack in features beyond basic voltage and resistance, including temperature and frequency, but they sit in different Fluke tiers. The 17B+ is a feature-rich entry-level meter that Fluke doesn't describe as True RMS. The 179 is the full-featured member of the 170 series: True RMS, a higher CAT rating, a wider capacitance range, tighter DC accuracy and Min/Max-Average recording. The AC measuring method matters more than the overlapping feature list suggests.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 17B+")!,
    reviewHref: undefined,
    imageAlt: "Fluke 17B+ digital multimeter",
    chooseIf: [
      "You're a student, hobbyist, or doing appliance repair on mostly clean sine-wave circuits",
      "You want temperature, frequency, relative mode and µA ranges at a lower price than the 179",
      "You value battery life: Fluke quotes 500 hours minimum on two AA cells",
      "You've confirmed your specific unit ships as the 17B+, not the newer 17B MAX shown in some listing photos",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 179")!,
    reviewHref: undefined,
    imageAlt: "Fluke 179 True RMS digital multimeter",
    chooseIf: [
      "You need True RMS accuracy on variable-speed drives, dimmers, or other electronic loads",
      "You need CAT IV 600V protection, not just CAT II 1000V / CAT III 600V",
      "You work with larger capacitors (up to 10,000 µF) than the 17B+'s 1,000 µF range covers",
      "You want Min/Max-Average recording and a lifetime warranty",
    ],
  },
  extraSpecs: [
    { label: "AC measurement", a: "Not stated as True RMS by Fluke", b: "True RMS" },
    { label: "Safety rating", a: "CAT III 600V / CAT II 1000V", b: "CAT III 1000V / CAT IV 600V" },
    { label: "Display", a: "4,000 counts", b: "6,000 counts with analog bar graph" },
    { label: "Basic DC volts accuracy", a: "±(0.5% + 3)", b: "±(0.09% + 2)" },
    { label: "Basic AC volts accuracy", a: "±(1.0% + 3)", b: "±(1.0% + 3)" },
    { label: "Current", a: "400 µA to 10A, µA/mA/A ranges", b: "Up to 10A, 0.01 mA finest step" },
    { label: "Resistance", a: "Up to 40 MΩ", b: "Up to 50 MΩ" },
    { label: "Capacitance", a: "Up to 1,000 µF, ±(5% + 5) on µF ranges", b: "Up to 10,000 µF, ±(1.2% + 2)" },
    { label: "Temperature", a: "−55 °C to 400 °C, Type K probe supplied", b: "−40 °C to 400 °C, thermocouple supplied" },
    { label: "Frequency", a: "Up to 100 kHz", b: "Up to 100 kHz" },
    { label: "Min/Max recording", a: "MIN MAX only", b: "Min/Max-Average" },
    { label: "Battery", a: "2 × AA, 500 h minimum", b: "One 9V, about 200 h typical" },
    { label: "Weight", a: "455 g", b: "420 g" },
  ],
  differences: [
    "Fluke doesn't describe the 17B+ as True RMS, while the 179 is. On clean sine-wave circuits this rarely matters, but on variable-speed drives, dimmers and other non-sinusoidal loads the 17B+'s AC readings can be meaningfully off where the 179's aren't.",
    "The 179 is rated CAT IV 600V on top of CAT III 1000V; the 17B+ tops out at CAT III 600V / CAT II 1000V, a lower safety margin for work near a service entrance.",
    "The 179's capacitance range reaches 10,000 µF against the 17B+'s 1,000 µF, a 10x difference that matters for larger motor-run or power-supply capacitors.",
    "The 179's basic DC accuracy is ±(0.09% + 2) against the 17B+'s ±(0.5% + 3), and its display resolves 6,000 counts with an analog bar graph against 4,000 counts.",
    "The 17B+ has dedicated µA ranges and runs at least 500 hours on two AA cells; the 179 steps current in 0.01 mA and Fluke quotes about 200 hours on a 9V.",
    "Both measure temperature and frequency, so those two functions aren't a differentiator.",
  ],
  sections: (
    <>
      <Callout title="Check which exact model your 17B+ listing ships">
        Some Amazon listings for the Fluke 17B+ show a product photo of the newer 17B MAX model instead.
        Confirm the listing title and any visible model markings match &quot;17B+&quot; specifically before
        buying, since the two are different products with different specifications.
      </Callout>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 17B+ vs 179 spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Both meters measure capacitance, but the range each covers is different enough to matter for real
          component testing. The same goes for DC accuracy, where the 179 is in a different class.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Maximum capacitance, on a log scale: the 179 covers a full order of magnitude more than the 17B+.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 17B+", value: 1000, display: "1,000 µF" },
                { label: "Fluke 179", value: 10000, display: "10,000 µF", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Basic DC volts accuracy, % of reading. Lower is better.</>}>
            <BarChart
              items={[
                { label: "Fluke 17B+", value: 0.5, display: "±0.5% + 3" },
                { label: "Fluke 179", value: 0.09, display: "±0.09% + 2", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Put into volts: on a 12.6 V battery, the 17B+ reads on its 40.00 V range and its spec allows
          ±(0.063 + 0.03) = ±0.093 V. The 179 reads on 60.00 V and allows ±(0.011 + 0.02) = ±0.031 V. Both
          figures come from Fluke&apos;s published specifications, not from testing. A 0.09 V window is fine for
          deciding whether a battery is charged; for the small voltage-drop readings used to find a bad cable
          connection, the 179&apos;s tighter window helps.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Average-responding vs True RMS, shown</h2>
        <p className="text-muted leading-7 mb-4">
          A meter that isn&apos;t True RMS rectifies the AC signal, takes its average, and multiplies by 1.111, the
          ratio that converts a sine wave&apos;s average to its RMS value. That shortcut is exact for a pure sine and
          wrong for everything else, because other waveforms have a different ratio. The 179 computes the RMS value
          directly, so its reading tracks the heating effect of the waveform whatever its shape.
        </p>
        <Figure caption={<>Two waveforms with the same peak. Solid line: true RMS. Dashed line: what an average-responding meter displays.</>}>
          <FormFactorDiagram />
        </Figure>
        <div className="mt-4">
          <DataTable
            head={["Waveform", "Where you meet it", "Average-responding error (typical textbook value)"]}
            rows={[
              ["Pure sine", "Utility power, resistive loads", "None"],
              ["Square wave", "Some inverters and UPS outputs", "About 11% high"],
              ["Triangle", "Some test and control signals", "About 4% low"],
              ["Narrow current pulses", "Switch-mode supplies, LED drivers, drives", "Low, often by a large margin"],
            ]}
          />
        </div>
        <div className="mt-4">
          <Figure caption={<>Size of the average-responding error for the two waveforms with fixed textbook values.</>}>
            <BarChart
              items={[
                { label: "Square wave", value: 11.1, display: "+11.1%" },
                { label: "Triangle wave", value: 3.8, display: "−3.8%" },
                { label: "Sine wave", value: 0, display: "0%" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The figures are standard form-factor arithmetic, not readings from either meter, and real equipment adds
          its own bandwidth and crest-factor limits. The point stands: if a 17B+ shows an odd current on a
          variable-speed fan or an LED fixture, the meter may be the cause, not the load. Our page on{" "}
          <Link href="/multimeters/why-does-my-multimeter-show-the-wrong-voltage" className={link}>
            why a multimeter shows the wrong voltage
          </Link>{" "}
          covers this and other causes.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Situation", "Better fit", "Why"]}
          rows={[
            ["Student or hobbyist learning electronics basics", "Fluke 17B+", "Lower price, still has temperature and frequency"],
            ["Working on drives, dimmers, or electronic loads professionally", "Fluke 179", "True RMS matters on non-sinusoidal AC"],
            ["Work near a service entrance or utility connection", "Fluke 179", "CAT IV 600V rating the 17B+ doesn't have"],
            ["Testing larger motor-run or supply capacitors", "Fluke 179", "10,000 µF range vs the 17B+'s 1,000 µF"],
            ["Microcontroller sleep current and sensor loops", "Fluke 17B+", "Dedicated 400 µA range with 0.1 µA steps"],
            ["Budget-conscious, mostly clean sine-wave circuits", "Fluke 17B+", "The True RMS gap rarely matters here"],
          ]}
        />
        <div className="mt-4">
          <KeyIdea title="True RMS is the deciding factor more than any single feature">
            Feature-for-feature, these meters look closer than the price gap suggests: both have temperature and
            frequency, and the 17B+ even has the finer low-current range. The decision usually comes down to whether
            you measure non-sinusoidal AC often enough to need True RMS. See our{" "}
            <Link href="/multimeters/multimeter-buying-guide" className={link}>
              multimeter buying guide
            </Link>{" "}
            for a fuller explanation, or our{" "}
            <Link href="/multimeters/best-true-rms-multimeters-under-100" className={link}>
              budget True RMS meters
            </Link>{" "}
            if you want the measuring method without the 179&apos;s other extras.
          </KeyIdea>
        </div>
      </section>
    </>
  ),
  bottomLine:
    "These two meters share more features than their price gap implies, since both measure temperature and frequency, but the 179 wins on the things that affect measurement reliability: True RMS, tighter DC accuracy, a higher CAT rating and a far wider capacitance range. If your work only touches clean sine-wave circuits and budget matters, the 17B+ is a reasonable, feature-rich entry meter with better battery life and µA ranges. For anything involving variable-speed drives, dimmers or larger capacitors, the 179's accuracy and range earn its higher price.",
  faqs: [
    {
      question: "Does the 17B+ give wrong readings, or just less accurate ones?",
      answer:
        "On clean, sinusoidal AC such as most outlets and simple resistive circuits, it reads within its published spec. The gap shows up on non-sinusoidal loads like variable-speed drives, dimmers and switch-mode supplies, where an average-responding meter can read noticeably off the true value, high on square waves and low on narrow pulses.",
    },
    {
      question: "Is the 17B MAX the same as the 17B+?",
      answer:
        "No, they're different products. Some Amazon listings for the 17B+ show a photo of the 17B MAX instead, so check the listing title and any visible model markings before buying. If the model matters to your work, confirm with the seller which one ships before you order.",
    },
    {
      question: "Why would anyone choose the 17B+ if the 179 is more capable overall?",
      answer:
        "Price, battery life and small currents. For work that never touches non-sinusoidal loads or CAT IV locations, the 17B+'s lower cost buys enough capability, and its dedicated µA ranges and 500-hour battery are genuine advantages. Paying more for accuracy and range you won't use isn't a better choice.",
    },
    {
      question: "Do both meters include the temperature probe, or is it sold separately?",
      answer:
        "Both include one. Fluke supplies a Type K thermocouple probe with the 17B+, reading −55 °C to 400 °C on the meter, and a thermocouple with the 179, which reads −40 °C to 400 °C. Supplied bead probes suit air and surface checks; immersion or high-heat work needs a dedicated probe.",
    },
    {
      question: "Which is more accurate for DC voltage, the 17B+ or the 179?",
      answer:
        "The 179, by a wide margin. Fluke lists ±(0.09% + 2) basic DC accuracy for the 179 against ±(0.5% + 3) for the 17B+. On a 12.6 V reading that works out to about ±0.03 V versus ±0.09 V. Both share the same ±(1.0% + 3) basic AC voltage figure.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 117 vs Fluke 179", href: "/multimeters/fluke-117-vs-fluke-179" },
    { label: "Fluke 17B+ vs Fluke 15B+", href: "/multimeters/fluke-17b-plus-vs-fluke-15b-plus" },
    { label: "Multimeter Buying Guide", href: "/multimeters/multimeter-buying-guide" },
  ],
};

export default function Fluke17bPlusVsFluke179Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current="/multimeters/fluke-17b-plus-vs-fluke-179" />
    </>
  );
}
