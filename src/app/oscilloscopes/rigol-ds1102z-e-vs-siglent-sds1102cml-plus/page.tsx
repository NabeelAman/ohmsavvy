import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/oscilloscopes/rigol-ds1102z-e-vs-siglent-sds1102cml-plus";

export const metadata = buildMetadata({
  title: "Rigol DS1102Z-E vs Siglent SDS1102CML+",
  description:
    "Rigol DS1102Z-E vs Siglent SDS1102CML+: two 100 MHz, two-channel benchtop scopes compared on memory depth, decoding, update rate and value.",
  path: "/oscilloscopes/rigol-ds1102z-e-vs-siglent-sds1102cml-plus",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Rigol DS1102Z-E vs Siglent SDS1102CML+",
  path,
  published: "2026-10-22",
  intro:
    "Rigol DS1102Z-E vs Siglent SDS1102CML+ pits two 100 MHz, two-channel benchtop scopes with 1 GSa/s and 7-inch 800 × 480 screens against each other. On paper they look alike; in use, the Rigol's 24 Mpts of memory and standard serial decoding set it well apart from the Siglent, whose memory is 40 Kpts in normal mode.",
  a: {
    pick: picks.find((p) => p.name === "Rigol DS1102Z-E")!,
    imageAlt: "Rigol DS1102Z-E two-channel 100 MHz oscilloscope",
    chooseIf: [
      "You capture long records, such as a full serial packet at a fast timebase",
      "You want UART, I2C, SPI and parallel decoding without extra cost",
      "You want hardware recording and playback of up to 60,000 frames",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Siglent SDS1102CML+")!,
    imageAlt: "Siglent SDS1102CML+ two-channel 100 MHz oscilloscope",
    chooseIf: [
      "You mostly view repetitive waveforms in a classroom or on a basic bench",
      "You want a 6-digit frequency counter and pass/fail testing",
      "You find it at a clear discount to the Rigol",
    ],
  },
  extraSpecs: [
    { label: "Memory depth", a: "24 Mpts (1 ch); 12 Mpts (2 ch)", b: "40 Kpts normal; 2 Mpts long-memory" },
    { label: "Vertical resolution", a: "8-bit (12-bit High Resolution mode)", b: "8-bit" },
    { label: "Waveform rate", a: "Up to 30,000 wfms/s", b: "Not stated by Siglent" },
    { label: "Serial decoding", a: "Parallel, RS232/UART, I2C, SPI", b: "None listed" },
    { label: "Equivalent-time sampling", a: "Not listed", b: "Up to 50 GSa/s" },
    { label: "Measurements and math", a: "Not detailed here", b: "32 measurements; +, −, ×, ÷, FFT" },
    { label: "Display", a: "7-inch 800 × 480, intensity graded", b: "7-inch 800 × 480" },
    { label: "Interfaces", a: "USB host/device, LAN (LXI), Aux out", b: "USB host/device, LAN, Pass/Fail" },
  ],
  differences: [
    "Rigol's datasheet gives the DS1102Z-E 24 Mpts of memory; Siglent lists 40 Kpts in normal mode and 2 Mpts in long-memory mode for the SDS1102CML+, and its Amazon listing says 1 Mpts.",
    "The DS1102Z-E includes serial decoding of parallel, UART, I2C and SPI buses; Siglent lists no serial decoding for the CML+.",
    "Rigol states up to 30,000 waveforms per second; Siglent doesn't state an update rate for the CML+.",
    "The CML+ offers equivalent-time sampling up to 50 GSa/s for repetitive signals, plus a 6-digit frequency counter.",
    "Both are 100 MHz, two-channel, 1 GSa/s scopes with a 7-inch 800 × 480 screen.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Memory depth: the real difference</h2>
        <p className="text-muted leading-7 mb-4">
          Memory decides how long the scope can keep sampling at full speed. At 1 GSa/s, 24 Mpts holds 24 ms of
          signal; 40 Kpts holds 40 µs. Beyond that, a scope has to lower its sample rate to fit the timebase.
        </p>
        <Figure caption={<>Maximum record length on a log scale: Rigol single-channel against Siglent&apos;s two modes.</>}>
          <BarChart
            log
            items={[
              { label: "Rigol DS1102Z-E", value: 24000000, display: "24 Mpts", highlight: true },
              { label: "Siglent, long-memory", value: 2000000, display: "2 Mpts" },
              { label: "Siglent, normal mode", value: 40000, display: "40 Kpts" },
            ]}
          />
        </Figure>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Time captured at full sample rate</h2>
        <DataTable
          head={["Scope and mode", "Memory", "Time at 1 GSa/s"]}
          rows={[
            ["Rigol DS1102Z-E, one channel", "24 Mpts", "24 ms"],
            ["Siglent SDS1102CML+, long memory", "2 Mpts", "2 ms"],
            ["Siglent SDS1102CML+, normal", "40 Kpts", "40 µs"],
          ]}
          mono={[1, 2]}
        />
        <div className="mt-4">
          <KeyIdea title="Why this matters for serial buses">
            A slow UART byte can last around a millisecond, so a short record forces a lower sample rate and loses
            edge detail. Our guide to{" "}
            <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
              what GSa/s means
            </Link>{" "}
            explains the trade-off.
          </KeyIdea>
        </div>
      </section>
    </>
  ),
  bottomLine:
    "The Rigol DS1102Z-E is the better buy for almost everyone: far deeper memory, standard serial decoding and a stated 30,000 wfms/s update rate on the same 100 MHz, two-channel base. The Siglent SDS1102CML+ only makes sense for basic classroom viewing at a clearly lower price.",
  faqs: [
    {
      question: "How much memory does the SDS1102CML+ have?",
      answer:
        "Siglent lists 40 Kpts in normal mode and 2 Mpts in long-memory mode; its Amazon listing says 1 Mpts. We use Siglent's own figures and flag the conflict.",
    },
    {
      question: "Does the Rigol DS1102Z-E decode serial buses?",
      answer: "Yes. Rigol's datasheet lists parallel, RS232/UART, I2C and SPI decoding, two decodes at a time.",
    },
    {
      question: "Are both scopes 100 MHz?",
      answer: "Yes. Both are 100 MHz, two-channel scopes with 1 GSa/s maximum real-time sampling.",
    },
    {
      question: "Is the SDS1102CML+ discontinued?",
      answer: "Siglent North America still sells it new; we found no discontinued notice.",
    },
    {
      question: "Which is better for students?",
      answer:
        "The DS1102Z-E, because deep memory and decoding stay useful as projects grow. The CML+ covers basic waveform viewing and frequency measurement.",
    },
  ],
  roundup: { label: "See the full oscilloscope roundup", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Rigol DHO804 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" },
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "Best oscilloscope for a home electronics lab", href: "/oscilloscopes/best-oscilloscope-for-home-electronics-lab" },
  ],
};

export default function RigolDs1102zeVsSiglentSds1102cmlPlusPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
