import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/oscilloscopes/siglent-sds1104x-e-vs-siglent-sds1202x-e";

export const metadata = buildMetadata({
  title: "Siglent SDS1104X-E vs SDS1202X-E",
  description:
    "Siglent SDS1104X-E vs Siglent SDS1202X-E: four channels at 100 MHz or two at 200 MHz. Sample rate, memory, options and which X-E model to buy.",
  path: "/oscilloscopes/siglent-sds1104x-e-vs-siglent-sds1202x-e",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Siglent SDS1104X-E vs Siglent SDS1202X-E",
  path,
  published: "2026-10-22",
  intro:
    "Siglent SDS1104X-E vs Siglent SDS1202X-E is a straight trade between channels and bandwidth inside the same X-E family. Both share 1 GSa/s, 14 Mpts, 100,000 waveforms per second and standard serial decoding. The SDS1104X-E gives you four channels at 100 MHz plus the MSO, AWG and Bode-plot options; the SDS1202X-E doubles the bandwidth to 200 MHz on two channels.",
  a: {
    pick: picks.find((p) => p.name === "Siglent SDS1104X-E")!,
    reviewHref: "/oscilloscopes/siglent-sds1104x-e-review",
    imageAlt: "Siglent SDS1104X-E four-channel oscilloscope",
    chooseIf: [
      "You need to watch three or four signals at once, such as SPI plus a reset line",
      "You may add the 16-channel MSO option or the USB AWG module later",
      "You want Bode plots of filters and amplifiers with a Siglent generator",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Siglent SDS1202X-E")!,
    imageAlt: "Siglent SDS1202X-E 200 MHz two-channel oscilloscope",
    chooseIf: [
      "Edge speed matters more than channel count, as in switching supplies",
      "Two channels cover your work: input and output, or clock and data",
      "You don't need the MSO, AWG or Bode-plot options",
    ],
  },
  extraSpecs: [
    { label: "Sample rate, all channels on", a: "500 MSa/s per channel", b: "500 MSa/s per channel" },
    { label: "Memory depth", a: "14 Mpts; 7 Mpts with all channels on", b: "14 Mpts (1 ch); 7 Mpts per channel (2 ch)" },
    { label: "Waveform rate", a: "100,000 wfm/s; 400,000 sequence", b: "100,000 wfm/s; 400,000 sequence" },
    { label: "Display", a: "7-inch", b: "7-inch 800 × 480" },
    { label: "Serial decode", a: "I2C, SPI, UART, CAN, LIN", b: "I2C, SPI, UART, CAN, LIN" },
    { label: "MSO (16 digital)", a: "Optional", b: "Not available" },
    { label: "USB AWG module", a: "Optional (25 MHz)", b: "Not available" },
    { label: "Bode plot / Wi-Fi", a: "Yes, with a Siglent generator / optional dongle", b: "Not available" },
  ],
  differences: [
    "The SDS1202X-E has 200 MHz of bandwidth, double the SDS1104X-E's 100 MHz.",
    "The SDS1104X-E has four analog channels; the SDS1202X-E has two.",
    "Siglent offers the 16-channel MSO, the USB AWG module, Bode plot and Wi-Fi only on the four-channel X-E models.",
    "Both reach 1 GSa/s and drop to 500 MSa/s per channel when channels share an ADC.",
    "Memory, waveform rate, display size and the standard decode list are the same on both.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Bandwidth against channel count</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Analog bandwidth per Siglent.</>}>
            <BarChart
              items={[
                { label: "SDS1202X-E", value: 200, display: "200 MHz", highlight: true },
                { label: "SDS1104X-E", value: 100, display: "100 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Analog channels, plus optional digital channels on the four-channel model.</>}>
            <BarChart
              items={[
                { label: "SDS1104X-E (with MSO)", value: 20, display: "4 + 16 digital", highlight: true },
                { label: "SDS1104X-E", value: 4, display: "4 analog" },
                { label: "SDS1202X-E", value: 2, display: "2 analog" },
              ]}
            />
          </Figure>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Which projects suit which model</h2>
        <DataTable
          head={["Project", "Better fit", "Why"]}
          rows={[
            ["SPI, I2C and multi-signal debugging", "SDS1104X-E", "Four channels, MSO option"],
            ["Switching supplies and fast edges", "SDS1202X-E", "200 MHz shows faster rise times"],
            ["Filter and amplifier frequency response", "SDS1104X-E", "Bode plot with a Siglent generator"],
            ["Comparing an input with an output", "Either", "Two channels are enough"],
          ]}
        />
        <div className="mt-4">
          <KeyIdea title="How much bandwidth do you need?">
            A common rule is a bandwidth three to five times the highest frequency you measure. Our guide to{" "}
            <Link href="/oscilloscopes/oscilloscope-bandwidth-for-switching-power-supplies" className={link}>
              oscilloscope bandwidth for switching power supplies
            </Link>{" "}
            works through examples.
          </KeyIdea>
        </div>
      </section>
    </>
  ),
  bottomLine:
    "Most hobbyists and students should buy the SDS1104X-E: four channels and the MSO, AWG and Bode-plot upgrade path matter more often than extra bandwidth. Buy the SDS1202X-E if your work centers on fast edges and two channels will always be enough.",
  faqs: [
    {
      question: "Can the SDS1202X-E add logic channels?",
      answer: "No. Siglent's datasheet lists the 16-channel MSO option, the USB AWG module, Bode plot and Wi-Fi for the four-channel X-E models only.",
    },
    {
      question: "Do both scopes have the same sample rate?",
      answer: "Yes. Both reach 1 GSa/s and run at 500 MSa/s per channel when the channels sharing an ADC are both on.",
    },
    {
      question: "Is serial decoding standard on both?",
      answer: "Yes. Both include I2C, SPI, UART, CAN and LIN trigger and decode as standard.",
    },
    {
      question: "Which has more memory?",
      answer: "They match: 14 Mpts with one channel per ADC active, halving to 7 Mpts when channels share memory.",
    },
    {
      question: "Is 100 MHz enough for Arduino and Raspberry Pi work?",
      answer:
        "For most microcontroller buses, yes. See our Arduino scope guide for how bandwidth relates to the signals you'll measure.",
    },
  ],
  roundup: { label: "See the full oscilloscope roundup", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Best oscilloscope for Arduino projects", href: "/oscilloscopes/best-oscilloscope-for-arduino-projects" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
  ],
};

export default function SiglentSds1104xeVsSds1202xePage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
