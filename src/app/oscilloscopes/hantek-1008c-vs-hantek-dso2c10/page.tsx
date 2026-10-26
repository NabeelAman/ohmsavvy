import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Hantek 1008C: 8 channels, 12-bit, 2.4 MSa/s (1 ch), 4K points, 1 MOhm inputs to 400V peak, 8-channel LVTTL
// generator to 250kHz, 100kHz bandwidth per manual (shared across 1008A/B/C), 80+ automotive diagnostic functions,
// USB-powered, no screen. Matching this site's existing 1008C Pick, per hantek.com's shared 1008 spec table and the
// official Amazon listing (B00BSR98KW) (checked 2026-10-24). Ignition probe inclusion unclear for this exact ASIN.
// Hantek DSO2C10: 100MHz, 2 channels, 1 GSa/s (1 ch)/500 MSa/s (2 ch), 8-bit (12-bit high-res), 8 Mpts (1 ch)/4 Mpts
// (2 ch), 7" 800x480 display, UART/I2C/SPI/CAN/LIN decode, no generator, mains power. Matching this site's existing
// DSO2C10 Pick, per hantek.com (checked 2026-10-24).

const path = "/oscilloscopes/hantek-1008c-vs-hantek-dso2c10";

const h1008c = picks.find((p) => p.name === "Hantek 1008C")!;
const dso2c10 = picks.find((p) => p.name === "Hantek DSO2C10")!;

export const metadata = buildMetadata({
  title: "Hantek 1008C vs DSO2C10: Automotive vs Bench",
  description:
    "Hantek 1008C vs DSO2C10: an 8-channel automotive diagnostic USB scope against a 2-channel 100 MHz bench scope with a screen. Very different tools.",
  path: "/oscilloscopes/hantek-1008c-vs-hantek-dso2c10",
  image: dso2c10.image,
});

const link = "text-accent hover:underline";

/** Signal chains: 1008C = 8 inputs into a screenless USB box that needs a Windows PC; DSO2C10 = 2 inputs into a standalone scope. */
function SignalChainDiagram() {
  const box = "fill-surface stroke-border";
  return (
    <svg
      viewBox="0 0 340 214"
      className="w-full h-auto"
      role="img"
      aria-label="Two signal chains. Top: eight vehicle signals enter the Hantek 1008C, a screenless USB acquisition box, which sends data over USB to a Windows PC that provides the display, power and automotive software. Bottom: two signals enter the Hantek DSO2C10, a standalone mains-powered scope with its own 7-inch screen and serial decoding"
    >
      <defs>
        <marker id="sc-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0L10 5L0 10z" className="fill-foreground" />
        </marker>
      </defs>
      <text x="6" y="14" fontSize="10" fontWeight="700" className="fill-accent">Hantek 1008C</text>
      {Array.from({ length: 8 }, (_, i) => (
        <line key={i} x1="10" x2="74" y1={26 + i * 9} y2={26 + i * 9} className="stroke-accent" strokeWidth="1.3" />
      ))}
      <text x="10" y="106" fontSize="8.5" className="fill-muted">8 sensor inputs</text>
      <rect x="76" y="20" width="84" height="74" rx="6" className={box} strokeWidth="1.2" />
      <text x="118" y="48" fontSize="9.5" textAnchor="middle" className="fill-foreground">USB box</text>
      <text x="118" y="62" fontSize="8.5" textAnchor="middle" className="fill-muted">no screen</text>
      <text x="118" y="75" fontSize="8.5" textAnchor="middle" className="fill-muted">2.4 MSa/s</text>
      <path d="M160 57 H208" className="stroke-foreground fill-none" strokeWidth="1.4" markerEnd="url(#sc-arr)" />
      <text x="184" y="51" fontSize="8.5" textAnchor="middle" className="fill-muted">USB</text>
      <text x="184" y="72" fontSize="8" textAnchor="middle" className="fill-muted">(power too)</text>
      <rect x="210" y="24" width="124" height="66" rx="6" className={box} strokeWidth="1.2" />
      <text x="272" y="44" fontSize="9.5" textAnchor="middle" className="fill-foreground">Windows PC</text>
      <text x="272" y="60" fontSize="8.5" textAnchor="middle" className="fill-muted">display + controls</text>
      <text x="272" y="74" fontSize="8.5" textAnchor="middle" className="fill-muted">automotive library</text>

      <line x1="6" x2="334" y1="122" y2="122" className="stroke-border" strokeWidth="0.8" strokeDasharray="4 3" />

      <text x="6" y="142" fontSize="10" fontWeight="700" className="fill-foreground">Hantek DSO2C10</text>
      {[0, 1].map((i) => (
        <line key={i} x1="10" x2="74" y1={164 + i * 16} y2={164 + i * 16} className="stroke-accent" strokeWidth="1.3" />
      ))}
      <text x="10" y="204" fontSize="8.5" className="fill-muted">2 probe inputs</text>
      <rect x="76" y="150" width="190" height="56" rx="6" className={box} strokeWidth="1.2" />
      <rect x="160" y="158" width="96" height="40" rx="3" className="fill-accent/10 stroke-accent" strokeWidth="1" />
      <text x="208" y="176" fontSize="8.5" textAnchor="middle" className="fill-foreground">7-inch screen</text>
      <text x="208" y="189" fontSize="8" textAnchor="middle" className="fill-muted">+ serial decode</text>
      <text x="84" y="172" fontSize="9.5" className="fill-foreground">Standalone</text>
      <text x="84" y="186" fontSize="8.5" className="fill-muted">1 GSa/s</text>
      <path d="M318 178 H268" className="stroke-foreground fill-none" strokeWidth="1.4" markerEnd="url(#sc-arr)" />
      <text x="300" y="170" fontSize="8.5" textAnchor="middle" className="fill-muted">mains</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Hantek 1008C vs DSO2C10: Automotive vs Bench Testing",
  path,
  published: "2026-10-25",
  intro:
    "These two Hantek products share a brand but almost nothing else. The 1008C is a screen-less, USB-powered, eight-channel automotive diagnostic tool built for a Windows laptop. The DSO2C10 is a self-contained, two-channel, 100 MHz general-purpose bench oscilloscope. They aren't really competing for the same buyer — this comparison exists to help you figure out which category you actually need.",
  a: {
    pick: h1008c,
    imageAlt: "Hantek 1008C 8-channel USB automotive diagnostic oscilloscope",
    chooseIf: [
      "You're diagnosing automotive sensors, actuators, ignition or bus signals",
      "You need eight channels at once (e.g. comparing multiple cylinders or sensors)",
      "You already have a Windows laptop to run it from, and don't need a standalone screen",
      "You want built-in automotive-specific diagnostic functions and a signal simulator",
    ],
  },
  b: {
    pick: dso2c10,
    imageAlt: "Hantek DSO2C10 two-channel 100 MHz benchtop oscilloscope with screen",
    chooseIf: [
      "You need a general-purpose bench scope with its own screen",
      "Your work is electronics or embedded projects, not automotive-specific diagnostics",
      "You want serial decoding for UART, I2C, SPI, CAN or LIN",
      "You want a scope that works standalone, without a laptop",
    ],
  },
  extraSpecs: [
    { label: "Channels", a: "8", b: "2" },
    { label: "Bandwidth", a: "100kHz (per manual)", b: "100MHz" },
    { label: "Sample rate", a: "2.4 MSa/s (1 ch)", b: "1 GSa/s (1 ch); 500 MSa/s (2 ch)" },
    { label: "Memory", a: "4K points", b: "8 Mpts (1 ch); 4 Mpts (2 ch)" },
    { label: "Display", a: "None — requires a Windows PC", b: "7-inch, 800 × 480, built in" },
    { label: "Signal generator", a: "8-channel LVTTL, up to 250kHz (crank/cam simulation)", b: "None (per Hantek's spec table)" },
    { label: "Serial decode", a: "Not applicable (automotive function library instead)", b: "UART, I2C, SPI, CAN, LIN" },
    { label: "Power", a: "USB-powered from the host PC", b: "Mains power" },
    { label: "Primary use case", a: "Automotive sensor/actuator/ignition diagnostics", b: "General electronics bench work" },
  ],
  differences: [
    "Category: the 1008C is a specialized 8-channel automotive diagnostic DAQ with no screen; the DSO2C10 is a general-purpose 2-channel bench oscilloscope with a built-in display. They solve fundamentally different problems.",
    "Channel count: 8 on the 1008C against 2 on the DSO2C10 — useful for comparing multiple automotive sensors at once, but at far lower bandwidth and sample rate.",
    "Bandwidth and speed: the DSO2C10's 100 MHz and 1 GSa/s dwarf the 1008C's 100 kHz and 2.4 MSa/s — the 1008C is built for slow automotive signals, not general electronics.",
    "Generator: the 1008C's 8-channel LVTTL generator exists specifically to simulate crank/cam sensor signals; the DSO2C10 has none at all.",
    "Decoding: only the DSO2C10 lists serial bus trigger/decode (UART, I2C, SPI, CAN, LIN), including the CAN and LIN vehicle-network buses; the 1008C offers its automotive function library instead.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Comparing these two on a single chart is almost misleading — they&apos;re built for different signal speeds
          entirely. The numbers below illustrate just how far apart they are, not which one is &quot;better.&quot;
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Channel count: the 1008C has four times as many inputs.</>}>
            <BarChart
              items={[
                { label: "Hantek 1008C", value: 8, display: "8", highlight: true },
                { label: "Hantek DSO2C10", value: 2, display: "2" },
              ]}
            />
          </Figure>
          <Figure caption={<>Bandwidth, log scale: the DSO2C10 is rated 1,000x higher.</>}>
            <BarChart
              log
              items={[
                { label: "DSO2C10", value: 100_000_000, display: "100 MHz", highlight: true },
                { label: "1008C", value: 100_000, display: "100 kHz" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The 1008C&apos;s low bandwidth isn&apos;t a weakness for its intended job — automotive sensor, actuator and
          ignition signals are mostly slow by electronics standards, and its real value is the eight simultaneous
          channels, built-in automotive diagnostic library and crank/cam signal simulator. Using it as a general
          electronics scope, or using the DSO2C10 for multi-sensor engine diagnostics, would usually be the wrong
          tool either way.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where the screen, power and software live</h2>
        <p className="text-muted leading-7 mb-4">
          The spec gap is easier to understand once you follow a signal from the probe tip to your eyes. The two
          Hantek products split that job very differently, and the split decides where you can use them.
        </p>
        <Figure
          caption={
            <>
              The 1008C digitizes eight inputs and hands everything else to a Windows PC over USB; the DSO2C10 does
              acquisition, display and decoding in one mains-powered box.
            </>
          }
        >
          <SignalChainDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The 1008C is really the front half of an instrument. It draws its power from the USB port and depends on
          the laptop for the display, the controls and Hantek&apos;s automotive function library, so in a workshop
          the laptop on the fender is part of the kit. The upside is eight simultaneous 12-bit channels, each with a 1 MΩ
          input rated to 400V peak, viewed on a laptop screen that is usually larger than any handheld display.
        </p>
        <p className="text-muted leading-7 mb-4">
          The DSO2C10 is the whole instrument. Plug it into the wall, clip on two probes and it runs on its own
          7-inch screen, with 8 Mpts of memory and serial decoding built in. It is also worth knowing that two of
          its decoders, CAN and LIN, are vehicle-network protocols, so it can read bus traffic on a car&apos;s
          network even though it lacks the 1008C&apos;s eight channels and ready-made engine tests. For a broader
          look at scopes chosen for car work, see our{" "}
          <Link href="/oscilloscopes/best-oscilloscopes-for-automotive-diagnostics" className={link}>
            automotive oscilloscope picks
          </Link>
          .
        </p>
        <Callout title="Ignition and mains voltages need the right probe">
          The 1008C&apos;s inputs are rated to 400V peak, and secondary ignition voltages run far higher, so ignition
          work needs a proper inductive or high-voltage probe, never a direct connection. The DSO2C10&apos;s probes
          are likewise not for direct contact with mains wiring. If you aren&apos;t sure of a circuit&apos;s voltage,
          measure it with a rated multimeter first or leave it to a qualified technician.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Hantek 1008C vs DSO2C10: automotive vs bench testing</h2>
        <p className="text-muted leading-7 mb-4">
          The right question here isn&apos;t &quot;which has better specs&quot; — it&apos;s &quot;which job are you actually
          doing.&quot;
        </p>
        <h3 className="text-lg font-semibold mb-2">If you&apos;re diagnosing a vehicle: the 1008C</h3>
        <p className="text-muted leading-7 mb-4">
          Eight channels let you compare multiple cylinder ignition patterns, sensor outputs or actuator signals at
          once — something a 2-channel bench scope simply can&apos;t do. Hantek&apos;s 80+ built-in automotive
          diagnostic functions and the crank/cam signal simulator are purpose-built for this job, and the low
          bandwidth is a non-issue since automotive signals rarely need more.
        </p>
        <h3 className="text-lg font-semibold mb-2">If you&apos;re working on electronics or embedded projects: the DSO2C10</h3>
        <p className="text-muted leading-7 mb-4">
          Standalone operation, a real screen, and 100 MHz of bandwidth with serial decoding make the DSO2C10 the
          right tool for microcontroller, sensor and digital-bus debugging — none of which the 1008C is built to
          do.
        </p>
        <KeyIdea title="Check your ignition probe before relying on it">
          Hantek&apos;s shared 1008-series spec page lists an ignition/HV probe as included across the 1008A, 1008B and
          1008C, but this exact 1008C listing&apos;s own included-components list doesn&apos;t itemize one.
          Confirm with the seller before assuming it&apos;s in the box if ignition testing is part of your plan.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Better fit", "Why"]}
          rows={[
            ["Automotive sensor, actuator or ignition diagnostics", "Hantek 1008C", "8 channels, automotive function library, signal simulator"],
            ["General electronics or embedded projects", "Hantek DSO2C10", "100 MHz, standalone screen, serial decode"],
            ["Need to compare multiple automotive channels at once", "Hantek 1008C", "8 channels vs. 2"],
            ["Debugging UART, I2C, SPI, CAN or LIN buses", "Hantek DSO2C10", "Only this one lists serial decode"],
            ["Want a standalone tool without a laptop", "Hantek DSO2C10", "Built-in 7-inch screen; the 1008C needs a PC"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Want to see the DSO2C10 against its generator-equipped sibling instead? See{" "}
          <Link href="/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d15" className={link}>
            Hantek DSO2C10 vs DSO2D15
          </Link>
          . The{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            beginner oscilloscope roundup
          </Link>{" "}
          ranks both, and the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>{" "}
          explains every spec from scratch.
        </p>
        <Callout title="Not really a head-to-head">
          Unlike most comparisons on this site, these two aren&apos;t really alternatives to each other — they
          serve different jobs entirely. If you need both automotive diagnostics and general electronics bench
          work, you may eventually want one of each rather than picking just one.
        </Callout>
      </section>
    </>
  ),
  bottomLine:
    "The Hantek 1008C and DSO2C10 aren't real alternatives — the 1008C is a specialized 8-channel automotive diagnostic tool with no screen of its own, while the DSO2C10 is a general-purpose 2-channel bench scope with 100 MHz of bandwidth and a built-in display. Choose based on the job: automotive sensor/actuator/ignition work points to the 1008C, general electronics and embedded debugging points to the DSO2C10.",
  faqs: [
    {
      question: "Can the Hantek 1008C be used for general electronics work?",
      answer:
        "Not really — its 100 kHz bandwidth (per Hantek's manual) and 2.4 MSa/s sample rate are far too slow for most general electronics signals. It's purpose-built for automotive sensor, actuator and ignition diagnostics, where signals are typically much slower.",
    },
    {
      question: "Does the Hantek 1008C have its own screen?",
      answer:
        "No — it's a USB-powered data acquisition device that requires a Windows PC to display and analyze waveforms. The DSO2C10, by contrast, is a standalone scope with its own 7-inch display.",
    },
    {
      question: "Does the Hantek 1008C come with an ignition probe?",
      answer:
        "It's unclear for this specific listing. Hantek's shared 1008A/B/C specification page lists an ignition/HV probe as included, but this exact ASIN's own included-components list doesn't itemize one. Confirm with the seller before assuming it's included.",
    },
    {
      question: "Why would someone buy both of these?",
      answer:
        "Because they serve genuinely different purposes — the 1008C for automotive diagnostic work across multiple channels, and the DSO2C10 for general electronics bench work with serial decoding. A shop doing both kinds of work might reasonably own both rather than choosing one.",
    },
    {
      question: "Can the Hantek DSO2C10 read a car's CAN bus?",
      answer:
        "It can decode it. Hantek lists CAN and LIN among the DSO2C10's trigger and decode protocols, alongside UART, I2C and SPI, so you can trigger on CAN frames and read their contents on screen. What it can't do is watch eight sensors at once or run guided engine tests; that is the job the 1008C's channel count and automotive function library are built for.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "Hantek DSO2C10 vs Hantek DSO2D15", href: "/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d15" },
    { label: "Hantek DSO2C10 vs FNIRSI 1014D", href: "/oscilloscopes/hantek-dso2c10-vs-fnirsi-1014d" },
    { label: "OWON HDS272S vs FNIRSI 2C53T", href: "/oscilloscopes/owon-hds272s-vs-fnirsi-2c53t" },
  ],
};

export default function Hantek1008cVsHantekDso2c10Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
