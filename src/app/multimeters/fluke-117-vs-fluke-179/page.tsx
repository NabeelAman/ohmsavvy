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
    "Fluke 117 vs Fluke 179: both True RMS, but the 179 adds CAT IV 600V, temperature, far higher capacitance, and a bar graph. Whether residential electricians need it.",
  path: "/multimeters/fluke-117-vs-fluke-179",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 117 vs Fluke 179",
  path,
  published: "2026-10-22",
  intro:
    "Both are True RMS Fluke meters with a strong reputation among electricians, but they're built for different tiers of work. The 117 is tuned for everyday residential and light commercial electrical work, with non-contact voltage detection as its standout convenience feature. The 179 is the more industrial, do-everything meter of Fluke's 170 series — CAT IV 600V, temperature, a far wider capacitance range, and an analog bar graph, aimed at electronics and industrial maintenance work as much as electrical troubleshooting.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 117")!,
    reviewHref: "/multimeters/fluke-117-review",
    imageAlt: "Fluke 117 digital multimeter",
    chooseIf: [
      "You're a residential or light commercial electrician working standard panels and branch circuits",
      "Non-contact voltage detection is a feature you'll actually use day to day",
      "You don't need temperature measurement or the 179's wider capacitance range",
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
      "You work on motor-run capacitors or other components needing capacitance up to 10,000 µF",
      "You want Min/Max-Average recording and an analog bar graph for watching changing signals",
    ],
  },
  extraSpecs: [
    { label: "Safety rating", a: "CAT III 600V", b: "CAT III 1000V / CAT IV 600V" },
    { label: "Display", a: "Standard", b: "6,000 counts with analog bar graph" },
    { label: "Temperature", a: "No", b: "Yes, with supplied thermocouple" },
    { label: "Capacitance", a: "Not a standout feature", b: "Up to 10,000 µF" },
    { label: "Frequency", a: "Not a standout feature", b: "Up to 100 kHz" },
    { label: "Non-contact voltage detection (NCV)", a: "Yes", b: "No" },
    { label: "Min/Max-Average recording", a: "No", b: "Yes" },
  ],
  differences: [
    "The 179 adds a CAT IV 600V rating on top of CAT III 1000V, extending protection closer to a service entrance than the 117's CAT III 600V covers.",
    "The 179 measures temperature with its supplied thermocouple; the 117 doesn't measure temperature at all.",
    "The 179's capacitance range reaches 10,000 µF, far beyond what the 117 is built for, useful for motor-run and larger power-supply capacitors.",
    "The 179 includes Min/Max-Average recording and an analog bar graph for watching a changing signal in real time; the 117 has neither.",
    "The 117 includes non-contact voltage detection (NCV); the 179 doesn't have this feature.",
    "Both meters are True RMS, so neither has the average-responding accuracy limitation some budget meters do.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">The 179&apos;s capacitance range, in perspective</h2>
        <p className="text-muted leading-7 mb-4">
          Capacitance range is one of the starkest differences between these two meters, and it maps
          directly onto what kind of components you can actually test.
        </p>
        <Figure
          caption={<>Maximum capacitance, on a log scale: the 179 reaches far beyond typical electronics-scale capacitors into motor-run capacitor territory.</>}
        >
          <BarChart
            log
            items={[
              { label: "Fluke 117", value: 1, display: "Not a standout feature" },
              { label: "Fluke 179", value: 10000, display: "10,000 µF", highlight: true },
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
            ["Motor-run or supply capacitor testing", "Fluke 179", "Capacitance range far exceeds the 117's"],
            ["Quick voltage checks without touching a wire", "Fluke 117", "NCV is a 117 feature, not on the 179"],
          ]}
        />
        <div className="mt-4">
          <KeyIdea title="A residential electrician usually doesn't need the 179's extras">
            For the large majority of residential electrical work, the 117&apos;s CAT III 600V rating and
            NCV convenience cover the job — the 179&apos;s CAT IV rating, temperature, and capacitance
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
    "For most residential and light commercial electricians, the 117 is the more practical choice — its CAT III 600V rating covers standard panel work, and NCV is a genuinely useful everyday convenience the 179 doesn't have. The 179 earns its higher price specifically for work that needs CAT IV protection, temperature measurement, or a wide capacitance range — industrial maintenance, HVAC, and electronics work more than routine residential troubleshooting. Pick based on the work you actually do, not just which meter has more total features.",
  faqs: [
    {
      question: "Is the Fluke 179 simply a better version of the 117?",
      answer:
        "Not exactly — it trades NCV for a higher CAT rating, temperature, wider capacitance, and Min/Max-Average recording. Both are True RMS, and each has a feature the other lacks, so it's a question of which capabilities your specific work needs, not a strict upgrade.",
    },
    {
      question: "Do residential electricians actually need CAT IV 600V?",
      answer:
        "Usually not — CAT III 600V, the 117's rating, covers standard panels and branch circuits, which is the vast majority of residential and light commercial work. CAT IV specifically matters at or near the service entrance and utility connection, a less common point of work for most residential electricians.",
    },
    {
      question: "Why doesn't the 179 have non-contact voltage detection if it's the more advanced meter?",
      answer:
        "NCV is a feature choice tied to the 117's design for electrician convenience, not a strict capability hierarchy — the 179 instead dedicates its design toward temperature, wider capacitance, and recording functions more relevant to industrial and electronics troubleshooting than quick NCV checks.",
    },
    {
      question: "Can the 179 do everything the 117 can, plus more?",
      answer:
        "Almost, but not entirely — it lacks non-contact voltage detection, which the 117 has. Beyond that specific feature, the 179 generally extends further in range and added functions like temperature and capacitance.",
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
