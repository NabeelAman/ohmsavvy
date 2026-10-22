import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, DataTable, Figure, InfoCards } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-87v-vs-fluke-179";

export const metadata = buildMetadata({
  title: "Fluke 87V vs Fluke 179",
  description:
    "Fluke 87V vs Fluke 179: same CAT IV 600V rating and lifetime warranty, but the 87V adds 0.05% DC accuracy, peak capture and 200 kHz. Which to buy.",
  path: "/multimeters/fluke-87v-vs-fluke-179",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 87V vs Fluke 179",
  path,
  published: "2026-10-22",
  intro:
    "Fluke 87V vs Fluke 179 is the choice between Fluke's two top general-purpose meters. Both are True RMS, rated CAT III 1000V and CAT IV 600V, read temperature and carry a lifetime warranty. The 87V is the industrial troubleshooter, with tighter DC accuracy, a 19,999-count high-resolution mode and 250 µs peak capture; the 179 covers most of the same ground in a lighter package.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 87V")!,
    reviewHref: "/multimeters/fluke-87v-review",
    imageAlt: "Fluke 87V industrial True RMS multimeter, front view",
    chooseIf: [
      "You troubleshoot motor drives and industrial controls where peak capture and high resolution help",
      "You need the tightest DC voltage accuracy Fluke offers in a handheld here",
      "You want temperature down to −200 °C and frequency to 200 kHz",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 179")!,
    imageAlt: "Fluke 179 True RMS digital multimeter, front view",
    chooseIf: [
      "You want CAT IV 600V and True RMS without paying for industrial extras you won't use",
      "Auto Hold and Min/Max-Average recording cover your intermittent faults",
      "You do HVAC, electrical maintenance or electronics rather than drive work",
    ],
  },
  extraSpecs: [
    { label: "Basic DC accuracy", a: "±(0.05% + 1)", b: "±(0.09% + 2)" },
    { label: "Display", a: "6,000 counts; 19,999 high-res mode", b: "6,000 counts + bar graph" },
    { label: "Max voltage", a: "1000V AC/DC", b: "1000V AC/DC" },
    { label: "Resistance", a: "Up to 50 MΩ", b: "Up to 50 MΩ" },
    { label: "Capacitance", a: "Up to 9,999 µF", b: "10,000 µF (Fluke also lists 9,999 µF)" },
    { label: "Frequency", a: "Up to 200 kHz, plus duty cycle", b: "Up to 100 kHz" },
    { label: "Temperature", a: "−200 °C to 1090 °C (excluding probe)", b: "−40 °C to 400 °C, thermocouple included" },
    { label: "Capture features", a: "Peak capture (250 µs), Touch Hold", b: "Auto Hold, Min/Max-Average" },
    { label: "Weight", a: "355 g (624 g with holster)", b: "420 g" },
    { label: "Battery life", a: "About 400 hours", b: "About 200 hours" },
    { label: "Warranty", a: "Lifetime", b: "Lifetime" },
  ],
  differences: [
    "The 87V's basic DC accuracy is ±(0.05% + 1) against the 179's ±(0.09% + 2), per Fluke's specifications.",
    "The 87V adds a 19,999-count high-resolution mode and captures peaks as short as 250 µs; the 179 stays at 6,000 counts.",
    "The 87V reads frequency to 200 kHz and temperature from −200 °C; the 179 reaches 100 kHz and −40 °C to 400 °C.",
    "The 179 includes Auto Hold and Min/Max-Average recording for intermittent readings.",
    "Fluke quotes about 400 hours of battery life for the 87V against about 200 hours for the 179.",
    "Both share CAT III 1000V / CAT IV 600V and a lifetime warranty, so safety and support are equal.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Accuracy and range, charted</h2>
        <p className="text-muted leading-7 mb-4">
          On paper the gap is about precision and reach rather than safety. A lower DC accuracy figure means a
          reading closer to the true value; a higher frequency limit lets you check faster signals such as drive
          carrier frequencies.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Basic DC accuracy (% of reading, lower is better): the 87V is almost twice as tight.</>}>
            <BarChart
              items={[
                { label: "Fluke 87V", value: 0.05, display: "±0.05%", highlight: true },
                { label: "Fluke 179", value: 0.09, display: "±0.09%" },
              ]}
            />
          </Figure>
          <Figure caption={<>Maximum frequency: the 87V reads to 200 kHz, the 179 to 100 kHz.</>}>
            <BarChart
              items={[
                { label: "Fluke 87V", value: 200, display: "200 kHz", highlight: true },
                { label: "Fluke 179", value: 100, display: "100 kHz" },
              ]}
            />
          </Figure>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Who each meter is built for</h2>
        <InfoCards
          items={[
            { label: "Drive technician", desc: "87V: peak capture and 200 kHz frequency for variable-frequency drives." },
            { label: "Industrial electrician", desc: "Either: both are CAT IV 600V with lifetime warranties." },
            { label: "HVAC technician", desc: "179: temperature probe included, Min/Max-Average for cycling loads." },
            { label: "Electronics bench", desc: "87V: 19,999-count mode resolves small DC changes." },
            { label: "Maintenance generalist", desc: "179: covers most jobs with less to learn." },
            { label: "Long shifts", desc: "87V: about twice the quoted battery life." },
          ]}
        />
        <div className="mt-4">
          <DataTable
            head={["Shared by both", "Detail"]}
            rows={[
              ["True RMS", "AC volts and amps"],
              ["Safety", "CAT III 1000V / CAT IV 600V"],
              ["Current", "10A AC/DC with microamp resolution"],
              ["Warranty", "Lifetime"],
            ]}
          />
        </div>
        <p className="text-muted leading-7 mt-4">
          If neither needs CAT IV, compare the{" "}
          <Link href="/multimeters/fluke-117-vs-fluke-87v" className={link}>
            Fluke 117 vs Fluke 87V
          </Link>{" "}
          instead.
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Buy the Fluke 87V if you troubleshoot drives and industrial controls: tighter accuracy, high resolution, peak capture and longer battery life justify it. For HVAC, maintenance and mixed electrical work, the Fluke 179 gives the same CAT IV 600V safety and lifetime warranty with fewer features you won't use.",
  faqs: [
    {
      question: "Do the Fluke 87V and 179 have the same safety rating?",
      answer:
        "Yes. Fluke rates both CAT III 1000V and CAT IV 600V, so both can be used from the service entrance down to branch circuits.",
    },
    {
      question: "Which is more accurate, the 87V or the 179?",
      answer:
        "The 87V. Fluke lists its basic DC accuracy as ±(0.05% + 1) against ±(0.09% + 2) for the 179, and the 87V adds a 19,999-count high-resolution mode.",
    },
    {
      question: "Does the Fluke 179 have peak capture?",
      answer:
        "Fluke doesn't list it for the 179. The 87V captures transients as short as 250 µs; the 179 instead offers Auto Hold and Min/Max-Average recording.",
    },
    {
      question: "Which has the better temperature range?",
      answer:
        "The 87V reads from −200 °C to 1090 °C (the probe itself limits this; the supplied 80BK covers −40 °C to 260 °C). The 179 reads −40 °C to 400 °C with its included thermocouple.",
    },
    {
      question: "Is the Fluke 87V worth it over the 179 for HVAC work?",
      answer:
        "Usually not. HVAC work rarely needs 0.05% DC accuracy or peak capture, and the 179's temperature probe and Min/Max-Average cover most calls. Choose the 87V if you also service variable-frequency drives.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 117 vs Fluke 87V", href: "/multimeters/fluke-117-vs-fluke-87v" },
    { label: "Fluke 87V review", href: "/multimeters/fluke-87v-review" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
  ],
};

export default function Fluke87VVsFluke179Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
