import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-117-vs-fluke-179";

export const metadata = buildMetadata({
  title: "Fluke 117 vs Fluke 179",
  description:
    "Fluke 117 vs Fluke 179: both True RMS, but the 179 adds CAT IV 600V, temperature and 100 kHz frequency, while the 117 has NCV. Which suits your work.",
  path: "/multimeters/fluke-117-vs-fluke-179",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 117 vs Fluke 179",
  path,
  published: "2026-10-22",
  intro:
    "Both are True RMS Fluke meters with a strong reputation among electricians, but they're built for different tiers of work. The 117 is tuned for everyday residential and light commercial electrical work, with non-contact voltage detection as its standout convenience feature. The 179 is the more industrial, do-everything meter of Fluke's 170 series — CAT IV 600V, temperature, frequency to 100 kHz, and manual as well as automatic ranging, aimed at electronics and industrial maintenance work as much as electrical troubleshooting.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 117")!,
    reviewHref: "/multimeters/fluke-117-review",
    imageAlt: "Fluke 117 digital multimeter",
    chooseIf: [
      "You're a residential or light commercial electrician working standard panels and branch circuits",
      "Non-contact voltage detection is a feature you'll actually use day to day",
      "You don't need temperature measurement or frequency readings above 50 kHz",
      "You want Fluke's most accessible price point with full True RMS accuracy",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 179")!,
    reviewHref: undefined,
    imageAlt: "Fluke 179 True RMS digital multimeter",
    chooseIf: [
      "You need the CAT IV 600V rating for service-entrance or utility-adjacent work",
      "You regularly measure temperature as part of your troubleshooting",
      "You measure signals above 50 kHz, up to the 179's 100 kHz frequency range",
      "You want CAT III 1000V headroom for higher-voltage circuits",
    ],
  },
  extraSpecs: [
    { label: "Safety rating", a: "CAT III 600V", b: "CAT III 1000V / CAT IV 600V" },
    { label: "Display", a: "6,000 counts with 33-segment bar graph", b: "6,000 counts with analog bar graph" },
    { label: "Temperature", a: "No", b: "Yes, with supplied thermocouple" },
    { label: "Capacitance", a: "1 nF to 9,999 µF", b: "Up to 10,000 µF" },
    { label: "Frequency", a: "99.99 Hz to 50.00 kHz", b: "Up to 100 kHz" },
    { label: "Non-contact voltage detection (NCV)", a: "Yes", b: "No" },
    { label: "Min/Max-Average recording", a: "Yes", b: "Yes" },
  ],
  differences: [
    "The 179 adds a CAT IV 600V rating on top of CAT III 1000V, extending protection closer to a service entrance than the 117's CAT III 600V covers.",
    "The 179 measures temperature with its supplied thermocouple; the 117 doesn't measure temperature at all.",
    "The 179's frequency range reaches 100 kHz, double the 117's 50 kHz; capacitance is effectively the same (10,000 µF on the 179, 9,999 µF on the 117).",
    "Both have Min/Max-Average recording and a 6,000-count display with an analog bar graph for watching a changing signal, so neither gives those up.",
    "The 117 includes non-contact voltage detection (NCV); the 179 doesn't have this feature.",
    "Both meters are True RMS, so neither has the average-responding accuracy limitation some budget meters do.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Where the measurement ranges actually differ</h2>
        <p className="text-muted leading-7 mb-4">
          On capacitance the two are effectively level: the 117 reads up to 9,999 µF and the 179 up to
          10,000 µF, so both handle motor-run and power-supply capacitors. Frequency is where the 179
          reaches further, which matters mainly for electronics work rather than mains troubleshooting.
        </p>
        <Figure
          caption={<>Maximum frequency: the 179 reads up to 100 kHz, twice the 117&apos;s 50 kHz. Both comfortably cover mains and drive output frequencies.</>}
        >
          <BarChart
            items={[
              { label: "Fluke 117", value: 50, display: "50 kHz" },
              { label: "Fluke 179", value: 100, display: "100 kHz", highlight: true },
            ]}
          />
        </Figure>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Which one for which electrician</h2>
        <DataTable
          head={["Work type", "Better fit", "Why"]}
          rows={[
            ["Standard residential/light commercial panels", "Fluke 117", "NCV and everyday convenience features matter more here"],
            ["Service entrances or utility-adjacent work", "Fluke 179", "CAT IV 600V rating extends protection further"],
            ["HVAC, motor, or appliance temperature checks", "Fluke 179", "Only the 179 measures temperature"],
            ["Motor-run or supply capacitor testing", "Either", "Both read capacitance up to about 10,000 µF"],
            ["Quick voltage checks without touching a wire", "Fluke 117", "NCV is a 117 feature, not on the 179"],
          ]}
        />
        <div className="mt-4">
          <KeyIdea title="A residential electrician usually doesn't need the 179's extras">
            For the large majority of residential electrical work, the 117&apos;s CAT III 600V rating and
            NCV convenience cover the job — the 179&apos;s CAT IV rating, temperature, and wider frequency
            range matter more for industrial, HVAC, or electronics-adjacent work. See our{" "}
            <Link href="/multimeters/best-multimeter-for-electricians" className={link}>
              best multimeter for electricians
            </Link>{" "}
            guide for how this fits into the broader electrician-focused lineup.
          </KeyIdea>
        </div>
      </section>
    </>
  ),
  bottomLine:
    "For most residential and light commercial electricians, the 117 is the more practical choice — its CAT III 600V rating covers standard panel work, and NCV is a genuinely useful everyday convenience the 179 doesn't have. The 179 earns its higher price specifically for work that needs CAT IV protection, temperature measurement, or frequency readings above 50 kHz — industrial maintenance, HVAC, and electronics work more than routine residential troubleshooting. Pick based on the work you actually do, not just which meter has more total features.",
  faqs: [
    {
      question: "Is the Fluke 179 simply a better version of the 117?",
      answer:
        "Not exactly — it trades NCV for a higher CAT rating, temperature, and a wider frequency range. Both are True RMS, and each has a feature the other lacks, so it's a question of which capabilities your specific work needs, not a strict upgrade.",
    },
    {
      question: "Do residential electricians actually need CAT IV 600V?",
      answer:
        "Usually not — CAT III 600V, the 117's rating, covers standard panels and branch circuits, which is the vast majority of residential and light commercial work. CAT IV specifically matters at or near the service entrance and utility connection, a less common point of work for most residential electricians.",
    },
    {
      question: "Why doesn't the 179 have non-contact voltage detection if it's the more advanced meter?",
      answer:
        "NCV is a feature choice tied to the 117's design for electrician convenience, not a strict capability hierarchy — the 179 instead dedicates its design toward temperature, a higher safety rating, and a wider frequency range, more relevant to industrial and electronics troubleshooting than quick NCV checks.",
    },
    {
      question: "Can the 179 do everything the 117 can, plus more?",
      answer:
        "Almost, but not entirely — it lacks non-contact voltage detection, which the 117 has. Beyond that specific feature, the 179 generally extends further in range and added functions like temperature and a higher frequency range.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 17B+ vs Fluke 179", href: "/multimeters/fluke-17b-plus-vs-fluke-179" },
    { label: "Fluke 117 vs Fluke 87V", href: "/multimeters/fluke-117-vs-fluke-87v" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
  ],
};

export default function Fluke117VsFluke179Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
