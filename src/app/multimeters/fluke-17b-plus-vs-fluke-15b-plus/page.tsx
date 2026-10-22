import { ContentLinks } from "@/components/ContentLinks";
import { DataTable, Figure, FlowDiagram, InfoCards } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-17b-plus-vs-fluke-15b-plus";

export const metadata = buildMetadata({
  title: "Fluke 17B+ vs Fluke 15B+",
  description:
    "Fluke 17B+ vs Fluke 15B+: the same body and CAT rating, but the 17B+ adds temperature, frequency, duty cycle, MIN MAX and relative mode. Which to buy.",
  path: "/multimeters/fluke-17b-plus-vs-fluke-15b-plus",
});

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 17B+ vs Fluke 15B+",
  path,
  published: "2026-10-22",
  intro:
    "Fluke 17B+ vs Fluke 15B+ is a comparison of two meters built on one platform. They share the case, the CAT III 600V / CAT II 1000V rating, the 4,000-count backlit display and the µA-to-10A current ranges, so the decision rests entirely on five functions the 17B+ adds and the 15B+ leaves out.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 17B+")!,
    imageAlt: "Fluke 17B+ digital multimeter, front view",
    chooseIf: [
      "You check appliance, HVAC or 3D-printer temperatures and want the Type K probe in the box",
      "You work on PWM, motor speed or supply circuits where frequency and duty cycle matter",
      "You want MIN MAX to catch a dipping supply and relative mode to zero out lead resistance",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 15B+")!,
    imageAlt: "Fluke 15B+ digital multimeter, front view",
    chooseIf: [
      "You only measure volts, amps, ohms, continuity and capacitance",
      "You want the fewest buttons possible: just HOLD and RANGE",
      "You'd rather not pay for functions you won't use",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "4,000 counts, backlit", b: "4,000 counts, backlit" },
    { label: "Max voltage", a: "1000V AC/DC", b: "1000V AC/DC" },
    { label: "Current ranges", a: "400 µA to 10A AC/DC", b: "µA, mA and A ranges to 10A AC/DC" },
    { label: "Capacitance", a: "Up to 1,000 µF", b: "Up to 1,000 µF" },
    { label: "Frequency / duty cycle", a: "To 100 kHz; 1% to 99%", b: "No" },
    { label: "Temperature", a: "−55 °C to 400 °C, Type K probe included", b: "No" },
    { label: "MIN MAX / relative", a: "Yes / Yes", b: "No / No" },
    { label: "Hazardous-voltage LED", a: "Lights at 30V or more", b: "No" },
    { label: "Size / weight", a: "183 × 91 × 49.5 mm, 455 g", b: "183 × 91 × 49.5 mm, 455 g" },
    { label: "Battery / warranty", a: "2 × AA, 500 h minimum; 2 years", b: "2 × AA, 500 h minimum; 2 years" },
  ],
  differences: [
    "Only the 17B+ measures temperature; Fluke includes a Type K probe covering −55 °C to 400 °C.",
    "Only the 17B+ reads frequency (to 100 kHz) and duty cycle; Fluke's datasheet marks both as not available on the 15B+.",
    "MIN MAX recording and relative mode are 17B+ only, per Fluke's users manual.",
    "The 17B+ has a warning LED that lights at 30V or more; the 15B+ has no such indicator.",
    "Everything else matches: same 183 × 91 × 49.5 mm, 455 g case, same safety rating, same 4,000-count display and 1,000 µF capacitance range.",
    "Neither is described by Fluke as True RMS, so both are best kept to ordinary sine-wave mains and electronics work.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">The five functions only the 17B+ has</h2>
        <p className="text-muted leading-7 mb-4">
          Put the two side by side and the dials tell the story: the 17B+ has extra positions and buttons, the
          15B+ stops at the basics. These are the additions, each confirmed in Fluke&apos;s 15B+/17B+ datasheet.
        </p>
        <InfoCards
          items={[
            { label: "Temperature", desc: "Type K probe included; −55 °C to 400 °C." },
            { label: "Frequency", desc: "Reads up to 100 kHz on its Hz range." },
            { label: "Duty cycle", desc: "1% to 99%, for PWM and switching signals." },
            { label: "MIN MAX", desc: "Records the lowest and highest reading over time." },
            { label: "Relative", desc: "Zeroes a reference, such as lead resistance." },
            { label: "30V warning LED", desc: "Lights when the input reaches hazardous voltage." },
          ]}
        />
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Do you need the extras? A quick decision path</h2>
        <Figure caption={<>If none of the middle steps describes your work, the 15B+ does everything you need.</>}>
          <FlowDiagram
            steps={[
              { label: "Basic checks", sub: "Volts, amps, ohms, continuity" },
              { label: "Need temperature?", sub: "Yes: 17B+" },
              { label: "Need Hz or duty?", sub: "Yes: 17B+" },
              { label: "Logging dips?", sub: "MIN MAX: 17B+" },
              { label: "None of these", sub: "15B+ is enough" },
            ]}
          />
        </Figure>
        <div className="mt-4">
          <DataTable
            head={["Typical task", "15B+ handles it?", "17B+ handles it?"]}
            rows={[
              ["Checking an outlet or battery", "Yes", "Yes"],
              ["Measuring a motor's running current", "Yes", "Yes"],
              ["Reading a thermostat sensor's temperature", "No", "Yes"],
              ["Checking a PWM fan signal's duty cycle", "No", "Yes"],
              ["Catching a brief voltage sag", "No", "Yes (MIN MAX)"],
            ]}
          />
        </div>
      </section>
    </>
  ),
  bottomLine:
    "Buy the 17B+ unless you are sure you will never need temperature, frequency or MIN MAX; the extra functions make it the more useful meter for electronics and appliance work. The 15B+ suits anyone who wants a simple, tough Fluke for volts, amps and ohms. Either way, check the 17B+ listing, as its Amazon photo shows the newer 17B MAX.",
  faqs: [
    {
      question: "What is the difference between the Fluke 17B+ and 15B+?",
      answer:
        "The 17B+ adds temperature (with a Type K probe), frequency to 100 kHz, duty cycle, MIN MAX recording, relative mode and a 30V hazardous-voltage LED. The case, safety rating, display, current ranges and capacitance range are the same.",
    },
    {
      question: "Are the Fluke 17B+ and 15B+ True RMS?",
      answer:
        "Fluke doesn't describe either as True RMS in its datasheet, manual or product pages. For variable-speed drives and other distorted waveforms, a True RMS meter such as the Fluke 117 is the better tool.",
    },
    {
      question: "Do the 17B+ and 15B+ measure microamps?",
      answer:
        "Yes. Both have µA, mA and A ranges up to 10A AC and DC, protected by 440 mA and 11 A fuses rated at 1000V.",
    },
    {
      question: "Is the 17B+ the same size as the 15B+?",
      answer:
        "Yes. Fluke lists both at 183 × 91 × 49.5 mm and 455 g, running on two AA batteries with at least 500 hours of life.",
    },
    {
      question: "Why does the Amazon 17B+ listing show a 17B MAX?",
      answer:
        "The listing's main photo shows a meter printed 17B MAX, the newer model, so the listing may now ship the successor. Check the product details before you order if you specifically want the 17B+.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 17B+ vs Fluke 117", href: "/multimeters/fluke-17b-plus-vs-fluke-117" },
    { label: "Fluke 15B+ vs Fluke 107", href: "/multimeters/fluke-15b-plus-vs-fluke-107" },
    { label: "Best multimeter for beginners", href: "/multimeters/best-multimeter-for-beginners" },
  ],
};

export default function Fluke17BPlusVsFluke15BPlusPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
