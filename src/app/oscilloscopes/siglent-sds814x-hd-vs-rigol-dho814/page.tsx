import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Siglent SDS814X HD: 100MHz, 4 channels, 12-bit, 2 GSa/s, 50 Mpts per channel, 7" 1024x600 capacitive touchscreen,
// 16 digital channels with optional SLA1016 probe. Per siglentna.com/digital-oscilloscopes/sds800x-hd-digital-
// storage-oscilloscope (checked 2026-10-25), matching this site's SDS814X HD Pick.
// Rigol DHO814: 100MHz, 4 channels, 12-bit, 1.25 GSa/s, 25 Mpts, up to 1 Mwfms/s (UltraAcquire), 7" 1024x600
// touchscreen. Matching this site's existing DHO814 Pick.

const path = "/oscilloscopes/siglent-sds814x-hd-vs-rigol-dho814";

const sds814xhd = picks.find((p) => p.name === "Siglent SDS814X HD")!;
const dho814 = picks.find((p) => p.name === "Rigol DHO814")!;

export const metadata = buildMetadata({
  title: "Siglent SDS814X HD vs Rigol DHO814 Compared",
  description:
    "Siglent SDS814X HD vs Rigol DHO814: both 100 MHz, 4-channel, 12-bit touchscreen scopes, but the Siglent samples faster and holds more memory per channel.",
  path: "/oscilloscopes/siglent-sds814x-hd-vs-rigol-dho814",
  image: sds814xhd.image,
});

const link = "text-accent hover:underline";

/**
 * Sample spacing on a 4 ns slice of signal, then the longest full-rate record each scope can hold
 * (memory depth divided by sample rate, using each Pick's headline maxima).
 */
function SampleWindowDiagram() {
  const sdsDots = Array.from({ length: 9 }, (_, i) => 40 + 30 * i);
  const dhoDots = Array.from({ length: 6 }, (_, i) => 40 + 48 * i);
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram: over 4 nanoseconds the SDS814X HD takes a sample every 0.5 ns and the DHO814 every 0.8 ns; dividing memory by sample rate gives a 25 ms full-rate record for the SDS814X HD and 20 ms for the DHO814"
    >
      <text x="40" y="22" fontSize="9.5" className="fill-accent">SDS814X HD: one sample every 0.5 ns (2 GSa/s)</text>
      <line x1="40" y1="38" x2="280" y2="38" className="stroke-border" strokeWidth="1" />
      {sdsDots.map((x) => (
        <circle key={x} cx={x} cy="38" r="4" className="fill-accent" />
      ))}
      <text x="40" y="62" fontSize="9.5" className="fill-foreground">DHO814: one sample every 0.8 ns (1.25 GSa/s)</text>
      <line x1="40" y1="78" x2="280" y2="78" className="stroke-border" strokeWidth="1" />
      {dhoDots.map((x) => (
        <circle key={x} cx={x} cy="78" r="4" className="fill-foreground" />
      ))}
      <line x1="40" y1="94" x2="280" y2="94" className="stroke-muted" strokeWidth="1" />
      {[0, 1, 2, 3, 4].map((ns) => (
        <g key={ns}>
          <line x1={40 + 60 * ns} y1="91" x2={40 + 60 * ns} y2="97" className="stroke-muted" strokeWidth="1" />
          <text x={40 + 60 * ns} y="108" fontSize="8.5" textAnchor="middle" className="fill-muted">
            {ns === 4 ? "4 ns" : ns}
          </text>
        </g>
      ))}
      <text x="40" y="132" fontSize="9.5" fontWeight="700" className="fill-foreground">Longest full-rate record = memory ÷ sample rate</text>
      <text x="40" y="150" fontSize="9" className="fill-accent">50 Mpts ÷ 2 GSa/s = 25 ms</text>
      <rect x="40" y="155" width="240" height="10" rx="3" className="fill-accent" />
      <text x="40" y="181" fontSize="9" className="fill-foreground">25 Mpts ÷ 1.25 GSa/s = 20 ms</text>
      <rect x="40" y="186" width="192" height="10" rx="3" className="fill-muted" />
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Siglent SDS814X HD vs Rigol DHO814 for Electronics Labs",
  path,
  published: "2026-10-25",
  intro:
    "These two are remarkably close on paper: both 100 MHz, 4-channel, 12-bit touchscreen scopes on a 7-inch 1024 × 600 display. The real separation is sample rate and memory depth, where the SDS814X HD leads on both, plus an optional logic-analyzer upgrade path the DHO814 doesn't offer.",
  a: {
    pick: sds814xhd,
    imageAlt: "Siglent SDS814X HD four-channel 100 MHz 12-bit oscilloscope, front panel",
    chooseIf: [
      "You want the fastest sample rate in this pair (2 GSa/s vs 1.25 GSa/s)",
      "You want the deepest memory (50 Mpts per channel)",
      "You might want to add 16-channel logic analysis later (optional SLA1016 probe)",
      "You want Siglent's control layout and software ecosystem",
    ],
  },
  b: {
    pick: dho814,
    imageAlt: "Rigol DHO814 four-channel 100 MHz 12-bit oscilloscope, front panel",
    chooseIf: [
      "You're already invested in Rigol's ecosystem and UltraVision interface",
      "A documented fast UltraAcquire capture rate matters for your work",
      "You want Rigol's touchscreen UI and menu conventions",
      "25 Mpts of memory is enough for your typical captures",
    ],
  },
  extraSpecs: [
    { label: "Bandwidth", a: "100MHz", b: "100MHz" },
    { label: "Channels", a: "4", b: "4" },
    { label: "Vertical resolution", a: "12-bit", b: "12-bit" },
    { label: "Sample rate", a: "2 GSa/s", b: "1.25 GSa/s" },
    { label: "Memory depth", a: "50 Mpts per channel", b: "25 Mpts" },
    { label: "Waveform capture rate", a: "Not stated in this Pick's sourcing", b: "Up to 1 Mwfms/s (UltraAcquire)" },
    { label: "Display", a: "7-inch, 1024 × 600, capacitive touchscreen", b: "7-inch, 1024 × 600, touchscreen" },
    { label: "Digital channels", a: "16, with optional SLA1016 probe", b: "Not applicable" },
    { label: "Serial decode", a: "Listed at series level (I2C/SPI/UART/CAN/LIN)", b: "Not called out in this Pick's sourcing" },
  ],
  differences: [
    "Sample rate: 2 GSa/s on the SDS814X HD against 1.25 GSa/s on the DHO814 — 60% faster.",
    "Memory depth: 50 Mpts per channel on the SDS814X HD against 25 Mpts on the DHO814 — double.",
    "Logic analysis: only the SDS814X HD supports an optional 16-channel logic probe (SLA1016, sold separately).",
    "Both share identical 100 MHz bandwidth, 4 channels, 12-bit resolution, and the same 7-inch 1024 × 600 touchscreen size.",
    "Documentation emphasis differs: the SDS814X HD's sourcing details decode protocols at the series level; the DHO814's sourcing details its UltraAcquire capture-rate mode instead.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          With bandwidth, channels, resolution and screen size all tied, the comparison comes down to two numbers:
          sample rate and memory depth. The Siglent leads on both.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Sample rate: the SDS814X HD samples 60% faster.</>}>
            <BarChart
              items={[
                { label: "SDS814X HD", value: 2000, display: "2 GSa/s", highlight: true },
                { label: "DHO814", value: 1250, display: "1.25 GSa/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Memory depth per channel: the SDS814X HD holds double.</>}>
            <BarChart
              items={[
                { label: "SDS814X HD", value: 50, display: "50 Mpts", highlight: true },
                { label: "DHO814", value: 25, display: "25 Mpts" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          A higher sample rate and deeper memory together mean the SDS814X HD can hold a longer capture window at
          full resolution before it has to slow down — useful when you don&apos;t know in advance how long an event
          will take to appear.
        </p>
        <div className="mt-6">
          <Figure
            caption={
              <>
                Top: sample points across a 4 ns slice. Bottom: memory divided by sample rate, using each scope&apos;s
                headline maxima. Arithmetic only, not a measurement.
              </>
            }
          >
            <SampleWindowDiagram />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The diagram turns the two headline numbers into something you can picture. At 2 GSa/s the Siglent places a
          point every half nanosecond, so a fast edge gets more dots drawn along its slope; at 1.25 GSa/s the Rigol
          leaves 0.8 ns between points. Divide each memory figure by its sample rate and you get the time span either
          scope can fill before it must drop to a slower rate: about 25 ms for the SDS814X HD and about 20 ms for the
          DHO814. The gap in record length is smaller than the 2:1 memory ratio suggests, because the Siglent also
          fills its memory faster. Treat both results as best cases: with more channels switched on, makers commonly
          share sample rate and memory between channels, so check each datasheet for the multi-channel figures.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Siglent SDS814X HD vs Rigol DHO814 for electronics labs</h2>
        <p className="text-muted leading-7 mb-4">
          With these two so closely matched on the headline specs, the deciding factors are the ones underneath.
        </p>
        <h3 className="text-lg font-semibold mb-2">If you want maximum sample rate and memory: the SDS814X HD</h3>
        <p className="text-muted leading-7 mb-4">
          The combination of 2 GSa/s and 50 Mpts per channel gives the SDS814X HD a real edge for capturing fast,
          unpredictable events in detail, and the optional logic-analyzer upgrade path adds flexibility if your
          needs grow.
        </p>
        <h3 className="text-lg font-semibold mb-2">If you&apos;re set on Rigol&apos;s ecosystem: the DHO814</h3>
        <p className="text-muted leading-7 mb-4">
          For labs already standardized on Rigol&apos;s UltraVision interface and menu conventions, the DHO814 delivers
          the same core bandwidth, channel count and resolution, with a documented fast UltraAcquire mode for its
          own kind of rapid-capture work.
        </p>
        <KeyIdea title="Matched headline specs, different depth underneath">
          When two scopes tie on bandwidth, channels and resolution, always check sample rate and memory depth next
          — they determine how much detail you actually get once you start capturing real signals, and here they&apos;re
          the real differentiators.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Better fit", "Why"]}
          rows={[
            ["Want the fastest sample rate available here", "Siglent SDS814X HD", "2 GSa/s vs. 1.25 GSa/s"],
            ["Want the deepest memory per channel", "Siglent SDS814X HD", "50 Mpts vs. 25 Mpts"],
            ["Already standardized on Rigol's interface", "Rigol DHO814", "Same UltraVision ecosystem as other Rigol scopes"],
            ["Want room to add logic analysis later", "Siglent SDS814X HD", "Optional SLA1016 16-channel probe"],
            ["Want a documented fast capture mode", "Rigol DHO814", "UltraAcquire mode up to 1 Mwfms/s"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Want to see the DHO814 against its own smaller sibling? See{" "}
          <Link href="/oscilloscopes/rigol-dho814-vs-rigol-dho804" className={link}>
            Rigol DHO814 vs DHO804
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
        <Callout title="This listing's SDS814X HD unit shows no printed model number">
          Unlike most Picks on this site, the exact-ASIN photo used for the SDS814X HD doesn&apos;t show a printed
          model number on the case — it&apos;s used here because it doesn&apos;t show a conflicting one either,
          under this site&apos;s current photo-verification rule for buyable-but-unlabeled units.
        </Callout>
      </section>
    </>
  ),
  bottomLine:
    "The Siglent SDS814X HD and Rigol DHO814 match almost exactly on bandwidth, channels, resolution and screen size, so the decision comes down to sample rate and memory depth, where the SDS814X HD leads (2 GSa/s and 50 Mpts vs. 1.25 GSa/s and 25 Mpts), plus an optional logic-analyzer upgrade path. Choose the DHO814 mainly if you're already standardized on Rigol's ecosystem.",
  faqs: [
    {
      question: "Are the Siglent SDS814X HD and Rigol DHO814 basically the same scope?",
      answer:
        "They're very close on headline specs — both 100 MHz, 4 channels, 12-bit, with a 7-inch 1024 × 600 touchscreen. The SDS814X HD samples faster (2 GSa/s vs 1.25 GSa/s) and holds more memory per channel (50 Mpts vs 25 Mpts), and supports an optional logic-analyzer probe the DHO814 doesn't.",
    },
    {
      question: "Can either of these add logic analysis channels?",
      answer:
        "Only the Siglent SDS814X HD, with its optional SLA1016 probe adding 16 digital channels. This site's sourcing for the Rigol DHO814 doesn't list an equivalent logic-analyzer option.",
    },
    {
      question: "Which has deeper memory?",
      answer:
        "The Siglent SDS814X HD, at 50 Mpts per channel against the Rigol DHO814's 25 Mpts — exactly double.",
    },
    {
      question: "Does the SDS814X HD's photo show the model number printed on the unit?",
      answer:
        "No — the exact-ASIN listing photo used for this Pick doesn't show a printed model number on the case. It's used anyway because it also doesn't show a conflicting model number, consistent with this site's photo rule for buyable-but-unlabeled units.",
    },
    {
      question: "How long can each scope record before it has to lower its sample rate?",
      answer:
        "Dividing memory by sample rate gives roughly 25 ms for the SDS814X HD (50 Mpts at 2 GSa/s) and about 20 ms for the DHO814 (25 Mpts at 1.25 GSa/s). Those are best-case figures from the headline maxima; longer time-base settings make either scope reduce its sample rate, and multi-channel operation can lower both numbers.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "Rigol DHO814 vs Rigol DHO804", href: "/oscilloscopes/rigol-dho814-vs-rigol-dho804" },
    { label: "Rigol DHO924S vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-dho924s-vs-siglent-sds1202x-e" },
  ],
};

export default function SiglentSds814xHdVsRigolDho814Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
