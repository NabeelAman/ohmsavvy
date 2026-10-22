import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t";

export const metadata = buildMetadata({
  title: "Hantek 2D72 vs FNIRSI 2C53T",
  description:
    "Hantek 2D72 vs FNIRSI 2C53T: two handheld 3-in-1 scope, multimeter and generator tools compared on bandwidth, record length, meter counts and weight.",
  path: "/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Hantek 2D72 vs FNIRSI 2C53T",
  path,
  published: "2026-10-22",
  intro:
    "Hantek 2D72 vs FNIRSI 2C53T compares two battery-powered handhelds that each combine a two-channel oscilloscope, a multimeter and a signal generator behind a 2.8-inch 320 × 240 screen. The Hantek has the stronger scope and generator; the FNIRSI has the far better multimeter and weighs half as much.",
  a: {
    pick: picks.find((p) => p.name === "Hantek 2D72")!,
    imageAlt: "Hantek 2D72 handheld oscilloscope, multimeter and signal generator",
    chooseIf: [
      "You need a usable signal generator: sine output to 25 MHz",
      "70 MHz of bandwidth and a 6K record matter more than meter resolution",
      "You want a fold-out stand for bench use",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "FNIRSI 2C53T")!,
    imageAlt: "FNIRSI 2C53T handheld oscilloscope multimeter with blue trim",
    chooseIf: [
      "The multimeter is your main tool: 19,999 counts and True RMS",
      "You want the lightest kit at 300 g with a built-in 3,000 mAh battery",
      "Your scope work stays at audio and low-frequency signals",
    ],
  },
  extraSpecs: [
    { label: "Sample rate, 2 channels", a: "125 MSa/s", b: "Not stated separately" },
    { label: "Record length", a: "6K (1 ch); 3K per channel (2 ch)", b: "1 Kpts" },
    { label: "Vertical resolution", a: "8-bit", b: "Not stated by FNIRSI" },
    { label: "Signal generator", a: "Sine to 25 MHz, square to 10 MHz", b: "13 waveforms, up to 50 kHz" },
    { label: "Multimeter", a: "4,000 counts", b: "19,999 counts, True RMS" },
    { label: "Screen", a: "2.8-inch, 320 × 240", b: "2.8-inch, 320 × 240" },
    { label: "Weight", a: "624 g", b: "300 g" },
    { label: "Battery", a: "Lithium; Hantek site and listing conflict on inclusion", b: "Built-in 3,000 mAh, up to 6 h" },
  ],
  differences: [
    "The Hantek reaches 70 MHz against the FNIRSI's 50 MHz; both quote 250 MSa/s.",
    "The Hantek's generator runs a sine wave to 25 MHz; the FNIRSI's stops at 50 kHz.",
    "The FNIRSI's multimeter is 19,999-count True RMS; the Hantek's is 4,000-count.",
    "The Hantek records 6K samples on one channel against the FNIRSI's 1 Kpts.",
    "The FNIRSI weighs 300 g against the Hantek's 624 g.",
    "Hantek's website lists two lithium batteries, while its Amazon listing says the package has none; check before you buy.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Generator range and meter resolution</h2>
        <p className="text-muted leading-7 mb-4">
          These two numbers show how differently the makers balanced their 3-in-1 designs.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Highest generator frequency, log scale: the Hantek reaches 500 times higher.</>}>
            <BarChart
              log
              items={[
                { label: "Hantek 2D72", value: 25000000, display: "25 MHz", highlight: true },
                { label: "FNIRSI 2C53T", value: 50000, display: "50 kHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Multimeter display counts: the FNIRSI resolves about five times more steps.</>}>
            <BarChart
              items={[
                { label: "FNIRSI 2C53T", value: 19999, display: "19,999 counts", highlight: true },
                { label: "Hantek 2D72", value: 4000, display: "4,000 counts" },
              ]}
            />
          </Figure>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Which handheld for which job</h2>
        <DataTable
          head={["Job", "Better fit", "Why"]}
          rows={[
            ["Testing filters and amplifiers with a signal", "Hantek 2D72", "Generator to 25 MHz"],
            ["Electrical and battery measurements", "FNIRSI 2C53T", "19,999-count True RMS meter"],
            ["Glancing at a PWM or sensor signal in the field", "Either", "Both are two-channel at 250 MSa/s"],
            ["Carrying in a small tool bag", "FNIRSI 2C53T", "300 g against 624 g"],
          ]}
        />
        <div className="mt-4">
          <KeyIdea title="Short records limit handhelds">
            With 1K to 6K samples, both scopes must slow their sampling on long timebases. For serious waveform
            work a benchtop is still better; see{" "}
            <Link href="/oscilloscopes/oscilloscope-vs-multimeter" className={link}>
              oscilloscope vs multimeter
            </Link>{" "}
            for when each tool earns its place.
          </KeyIdea>
        </div>
      </section>
    </>
  ),
  bottomLine:
    "Buy the Hantek 2D72 if the scope and signal generator are the point: more bandwidth, a longer record and a generator that reaches 25 MHz. Buy the FNIRSI 2C53T if you mainly want a high-resolution True RMS multimeter with a basic scope attached, in a lighter package.",
  faqs: [
    {
      question: "Which handheld has the better multimeter?",
      answer: "The FNIRSI 2C53T: FNIRSI lists a 19,999-count True RMS meter to 1000V DC and 750V AC. The Hantek's meter is 4,000-count.",
    },
    {
      question: "Does the Hantek 2D72 come with batteries?",
      answer:
        "Sources disagree. Hantek's site lists two 2,600 mAh lithium cells, while the Hantek-store Amazon listing says the package contains no lithium batteries. Check the listing before ordering.",
    },
    {
      question: "Can either scope measure mains voltage on its scope input?",
      answer:
        "FNIRSI lists a ±400V maximum on the 2C53T's scope input. Treat any mains work with care and use the multimeter inputs and correct ratings; see our mains frequency guide.",
    },
    {
      question: "Which is better for audio work?",
      answer:
        "Both cover audio frequencies on the scope side. The Hantek's generator can also produce test tones and sweeps far beyond audio, while the FNIRSI's generator reaches 50 kHz.",
    },
    {
      question: "Do they have the same screen?",
      answer: "Yes, both use a 2.8-inch, 320 × 240 colour display.",
    },
  ],
  roundup: { label: "See the full oscilloscope roundup", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
    { label: "How to measure mains frequency with an oscilloscope", href: "/oscilloscopes/how-to-measure-mains-frequency-with-an-oscilloscope" },
    { label: "FNIRSI DSO152 review", href: "/oscilloscopes/fnirsi-dso152-review" },
  ],
};

export default function Hantek2d72VsFnirsi2c53tPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
