import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/oscilloscopes/picoscope-2204a-vs-digilent-analog-discovery-3";

export const metadata = buildMetadata({
  title: "PicoScope 2204A vs Digilent Analog Discovery 3",
  description:
    "PicoScope 2204A vs Digilent Analog Discovery 3: two USB scopes compared on bandwidth, resolution, generators, logic channels and software.",
  path: "/oscilloscopes/picoscope-2204a-vs-digilent-analog-discovery-3",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "PicoScope 2204A vs Digilent Analog Discovery 3",
  path,
  published: "2026-10-22",
  intro:
    "PicoScope 2204A vs Digilent Analog Discovery 3 is a choice between a focused USB oscilloscope and a USB lab-in-a-box. Both are two-channel, USB-powered and run on Windows, macOS and Linux. The PicoScope is a 10 MHz, 8-bit scope with polished software and serial decoding; the Analog Discovery 3 adds 14-bit resolution, a two-channel generator, 16 logic channels and power supplies.",
  a: {
    pick: picks.find((p) => p.name === "PicoScope 2204A")!,
    imageAlt: "PicoScope 2204A USB oscilloscope with BNC inputs",
    chooseIf: [
      "You want BNC inputs and standard scope probes out of the box",
      "You value PicoScope 7's 38 serial decoders, mask testing and spectrum view",
      "You only need a scope and a simple generator up to 100 kHz",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Digilent Analog Discovery 3")!,
    imageAlt: "Digilent Analog Discovery 3 USB instrument in green housing",
    chooseIf: [
      "You want a scope, generator, logic analyzer and ±5V supplies in one device",
      "You want 14-bit resolution and three times the bandwidth",
      "You'll script tests in Python, C, LabVIEW or MATLAB",
    ],
  },
  extraSpecs: [
    { label: "Vertical resolution", a: "8-bit (up to 12-bit enhanced in software)", b: "14-bit" },
    { label: "Memory", a: "8 kS capture; streaming up to 100 MS", b: "Not published on Digilent's shop page" },
    { label: "Signal generator", a: "1 channel, 0.1 Hz–100 kHz, ±2V", b: "2 channels, 14-bit, ±5V, 12 MHz (BNC adapter)" },
    { label: "Logic channels", a: "None", b: "16 digital I/O at up to 125 MS/s" },
    { label: "Power supplies", a: "None", b: "Programmable ±0.5 to ±5V" },
    { label: "Inputs", a: "BNC", b: "Flywire; BNC adapter sold separately" },
    { label: "Input range", a: "Not detailed here", b: "±25V" },
    { label: "Size / power", a: "142 × 92 × 18.8 mm, under 0.2 kg; USB powered", b: "Pocket-sized; USB-C powered" },
  ],
  differences: [
    "The Analog Discovery 3 reaches 30+ MHz with its BNC adapter against the PicoScope's 10 MHz.",
    "The AD3 is a 14-bit instrument; the 2204A is 8-bit, with software-enhanced resolution up to 12 bits.",
    "The AD3 adds a two-channel generator, 16 logic channels and programmable ±5V supplies; the PicoScope has a single generator to 100 kHz.",
    "The PicoScope has BNC inputs built in; the AD3 needs its separately sold BNC adapter for full bandwidth and standard probes.",
    "Pico lists 38 built-in serial decoders; the AD3 decodes SPI, I2C, UART, CAN and JTAG through its logic channels and protocol analyzer.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Bandwidth and resolution compared</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Analog bandwidth: the AD3 figure needs the BNC adapter.</>}>
            <BarChart
              items={[
                { label: "Analog Discovery 3", value: 30, display: "30+ MHz", highlight: true },
                { label: "PicoScope 2204A", value: 10, display: "10 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Native ADC resolution in bits.</>}>
            <BarChart
              items={[
                { label: "Analog Discovery 3", value: 14, display: "14-bit", highlight: true },
                { label: "PicoScope 2204A", value: 8, display: "8-bit" },
              ]}
            />
          </Figure>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">What each device replaces on a bench</h2>
        <InfoCards
          items={[
            { label: "Oscilloscope", desc: "Both: 2 channels. Pico 10 MHz 8-bit; AD3 30+ MHz 14-bit." },
            { label: "Signal generator", desc: "Pico: 1 channel to 100 kHz. AD3: 2 channels, 12 MHz with adapter." },
            { label: "Logic analyzer", desc: "AD3 only: 16 channels plus pattern generation." },
            { label: "Power supply", desc: "AD3 only: programmable ±5V rails." },
            { label: "Spectrum analysis", desc: "Both, in PicoScope 7 or WaveForms." },
            { label: "Network / impedance", desc: "AD3 only, in WaveForms." },
          ]}
        />
        <div className="mt-4">
          <DataTable
            head={["Use", "Better fit"]}
            rows={[
              ["Audio and sensor signals with standard probes", "PicoScope 2204A"],
              ["Microcontroller courses and embedded debugging", "Analog Discovery 3"],
              ["Automated tests from Python or MATLAB", "Analog Discovery 3"],
              ["Long captures by USB streaming", "PicoScope 2204A"],
            ]}
          />
        </div>
        <div className="mt-4">
          <KeyIdea title="USB scopes need a computer">
            Neither has a screen of its own. If you want a standalone instrument, compare a benchtop such as the
            ones in our{" "}
            <Link href="/oscilloscopes/best-oscilloscope-for-arduino-projects" className={link}>
              Arduino oscilloscope guide
            </Link>
            .
          </KeyIdea>
        </div>
      </section>
    </>
  ),
  bottomLine:
    "Buy the Digilent Analog Discovery 3 if you want the most capability per desk inch: more bandwidth, 14-bit resolution, a dual generator, logic analysis and power supplies. Buy the PicoScope 2204A if you want a simple, compact scope with BNC inputs and Pico's polished software for audio, sensors and slow serial buses.",
  faqs: [
    {
      question: "Do I need a computer for either device?",
      answer: "Yes. Both are USB instruments. The PicoScope uses PicoScope 7 and the AD3 uses WaveForms, each on Windows, macOS or Linux.",
    },
    {
      question: "Can I use normal scope probes with the Analog Discovery 3?",
      answer: "Only with Digilent's BNC adapter, sold separately, which Digilent also says is needed for maximum bandwidth.",
    },
    {
      question: "How many serial protocols can the PicoScope decode?",
      answer: "Pico's datasheet lists 38 built-in decoders; Pico's Amazon listing says 40, likely reflecting newer software.",
    },
    {
      question: "Which is better for students?",
      answer:
        "The Analog Discovery 3, because one device covers scope, generator, logic and supply exercises. The PicoScope suits students who only need a scope.",
    },
    {
      question: "How deep is the AD3's memory?",
      answer:
        "Digilent's shop page doesn't publish the buffer size, so we don't quote one. The PicoScope has 8 kS capture memory and can stream up to 100 MS over USB.",
    },
  ],
  roundup: { label: "See the full oscilloscope roundup", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Best oscilloscope for a home electronics lab", href: "/oscilloscopes/best-oscilloscope-for-home-electronics-lab" },
    { label: "Analog vs digital oscilloscope", href: "/oscilloscopes/analog-vs-digital-oscilloscope" },
    { label: "What is an oscilloscope?", href: "/oscilloscopes/what-is-an-oscilloscope" },
  ],
};

export default function PicoScope2204aVsAnalogDiscovery3Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
