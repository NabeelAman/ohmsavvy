import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Rigol DHO924S: 250MHz, 4 channels, 12-bit, 1.25 GSa/s, 50 Mpts, 1 Mwfms/s (UltraAcquire). Per
// rigolna.com/products/digital-oscilloscopes/dho900 (checked 2026-10-25), matching this site's DHO924S Pick.
// Siglent SDS1202X-E: 200MHz, 2 channels, 1 GSa/s (1 ch)/500 MSa/s (2 ch), 14 Mpts (1 ch), 100,000 wfm/s (400,000
// sequence mode), 7" 800x480, standard I2C/SPI/UART/CAN/LIN decode. Matching this site's existing SDS1202X-E Pick.

const path = "/oscilloscopes/rigol-dho924s-vs-siglent-sds1202x-e";

const dho924s = picks.find((p) => p.name === "Rigol DHO924S")!;
const sds1202xe = picks.find((p) => p.name === "Siglent SDS1202X-E")!;

export const metadata = buildMetadata({
  title: "Rigol DHO924S vs Siglent SDS1202X-E",
  description:
    "Rigol DHO924S vs Siglent SDS1202X-E: four channels at 250 MHz with 12-bit resolution against two channels at 200 MHz with faster capture and serial decode.",
  path: "/oscilloscopes/rigol-dho924s-vs-siglent-sds1202x-e",
  image: dho924s.image,
});

const link = "text-accent hover:underline";

/** Staircase path approximating a straight ramp with n equal steps inside a w × h box. */
function stairPath(x0: number, y0: number, w: number, h: number, n: number) {
  const dx = w / n;
  const dy = h / n;
  let d = `M${x0} ${y0 + h}`;
  for (let i = 0; i < n; i++) {
    d += ` H${x0 + dx * (i + 1)} V${y0 + h - dy * (i + 1)}`;
  }
  return d;
}

/**
 * Quantization: the same slow ramp digitized coarsely (8-bit) and finely (12-bit). Step counts are scaled
 * down to stay visible; the real ratio of levels is 256 to 4,096 (16 to 1).
 */
function ResolutionDiagram() {
  const panels = [
    { x: 14, label: "SDS1202X-E: 8-bit", sub: "256 levels", steps: 6, cls: "stroke-muted" },
    { x: 182, label: "DHO924S: 12-bit", sub: "4,096 levels (16x finer)", steps: 24, cls: "stroke-accent" },
  ];
  return (
    <svg
      viewBox="0 0 340 180"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram: the same ramp signal digitized by an 8-bit scope shows coarse visible steps, while a 12-bit scope follows the ramp in steps 16 times finer; on a 1 V per division setting across 8 divisions that is about 31 mV per step versus about 2 mV"
    >
      {panels.map((p) => (
        <g key={p.label}>
          <text x={p.x} y="16" fontSize="9.5" fontWeight="700" className={p.steps > 6 ? "fill-accent" : "fill-foreground"}>
            {p.label}
          </text>
          <text x={p.x} y="29" fontSize="8.5" className="fill-muted">
            {p.sub}
          </text>
          <rect x={p.x} y="36" width="144" height="96" rx="4" className="fill-surface stroke-border" strokeWidth="1" />
          <line x1={p.x + 8} y1="124" x2={p.x + 136} y2="44" className="stroke-foreground" strokeWidth="1" strokeDasharray="3 3" />
          <path d={stairPath(p.x + 8, 44, 128, 80, p.steps)} className={`fill-none ${p.cls}`} strokeWidth="2" />
        </g>
      ))}
      <text x="170" y="152" fontSize="8.5" textAnchor="middle" className="fill-foreground">
        Dashed: real signal. Solid: recorded steps (scaled for visibility).
      </text>
      <text x="170" y="168" fontSize="8.5" textAnchor="middle" className="fill-muted">
        At 1 V/div, 8 divisions: ≈31 mV steps (8-bit) vs ≈2 mV (12-bit)
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Rigol DHO924S vs Siglent SDS1202X-E: Which Is Better?",
  path,
  published: "2026-10-25",
  intro:
    "These two trade channel count and resolution against bandwidth and documentation. The DHO924S doubles the channel count and adds 12-bit resolution with a higher 250 MHz rating; the SDS1202X-E counters with a faster waveform capture rate and clearly documented standard serial decode.",
  a: {
    pick: dho924s,
    imageAlt: "Rigol DHO924S four-channel 250 MHz oscilloscope, front panel",
    chooseIf: [
      "You need four channels rather than two",
      "You want 12-bit vertical resolution for finer amplitude detail",
      "Your signals run up toward 250 MHz",
      "You want the deepest documented memory (50 Mpts)",
    ],
  },
  b: {
    pick: sds1202xe,
    imageAlt: "Siglent SDS1202X-E two-channel 200 MHz oscilloscope, front panel",
    chooseIf: [
      "Two channels are enough for your work",
      "You want standard serial trigger and decode confirmed out of the box",
      "You're hunting rare glitches and want a faster waveform capture rate",
      "You want the lower-cost option in this pair",
    ],
  },
  extraSpecs: [
    { label: "Bandwidth", a: "250MHz", b: "200MHz" },
    { label: "Channels", a: "4", b: "2" },
    { label: "Vertical resolution", a: "12-bit", b: "8-bit" },
    { label: "Sample rate, 1 channel", a: "1.25 GSa/s", b: "1 GSa/s" },
    { label: "Memory depth", a: "50 Mpts", b: "14 Mpts (1 ch)" },
    { label: "Waveform capture rate", a: "Up to 1 Mwfms/s (UltraAcquire)", b: "100,000 wfm/s (400,000 sequence mode)" },
    { label: "Serial trigger and decode", a: "Not called out as standard in this Pick's sourcing", b: "I2C, SPI, UART, CAN, LIN (standard)" },
    { label: "Digital channels", a: "16, with optional PLA2216 probe", b: "Not applicable" },
    { label: "Display", a: "Touchscreen (size not stated in this Pick's sourcing)", b: "7-inch, 800 × 480" },
  ],
  differences: [
    "Channel count: 4 on the DHO924S against 2 on the SDS1202X-E — the single biggest practical difference.",
    "Resolution: 12-bit on the DHO924S against 8-bit on the SDS1202X-E, giving finer amplitude detail per sample.",
    "Bandwidth: 250 MHz against 200 MHz, a moderate edge for the DHO924S.",
    "Memory: 50 Mpts documented for the DHO924S against 14 Mpts for the SDS1202X-E — more than 3x deeper.",
    "Waveform capture rate: the SDS1202X-E's documented 100,000-400,000 wfm/s is a clearly stated, fast figure; the DHO924S's 1 Mwfms/s figure applies specifically to UltraAcquire mode.",
    "Serial decode: only the SDS1202X-E lists standard serial trigger/decode (I2C, SPI, UART, CAN, LIN) in this Pick's sourcing.",
    "Digital channels: only the DHO924S supports an optional 16-channel logic probe (PLA2216, sold separately).",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          The DHO924S wins on channel count, resolution, bandwidth and memory depth; the SDS1202X-E counters with
          clearly documented serial decode and a fast capture rate. Neither is a strict upgrade of the other.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Channel count: the DHO924S doubles the SDS1202X-E&apos;s channels.</>}>
            <BarChart
              items={[
                { label: "DHO924S", value: 4, display: "4", highlight: true },
                { label: "SDS1202X-E", value: 2, display: "2" },
              ]}
            />
          </Figure>
          <Figure caption={<>Memory depth: the DHO924S documents more than 3x the SDS1202X-E&apos;s figure.</>}>
            <BarChart
              items={[
                { label: "DHO924S", value: 50, display: "50 Mpts", highlight: true },
                { label: "SDS1202X-E", value: 14, display: "14 Mpts" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          More channels and deeper memory help when you need to capture several signals at once or hold a longer
          event at full detail. A fast, clearly documented capture rate plus built-in serial decode helps when
          you&apos;re chasing an intermittent digital-bus fault. Which matters more depends on the shape of your typical
          debugging session.
        </p>
        <div className="mt-6">
          <Figure caption={<>Ideal quantization only: real-world noise blurs the smallest steps on any scope.</>}>
            <ResolutionDiagram />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The 8-bit versus 12-bit line in the spec table is easy to skim past, so here is the arithmetic behind it.
          An 8-bit converter splits the vertical span into 2⁸ = 256 levels; a 12-bit one splits it into 2¹² = 4,096.
          If the screen spans eight vertical divisions at 1 V/div, that 8 V range gives steps of about 31 mV on the
          SDS1202X-E and roughly 2 mV on the DHO924S, assuming the converter covers exactly the visible screen. You
          notice the difference when you zoom into a small detail riding on a bigger signal: power-supply ripple on a
          12 V rail, a sensor output that moves by a few millivolts, or the tail of a slow settling waveform. In
          those cases the coarser scope often forces you to change the volts-per-division setting just to see the
          detail; the finer one can keep the whole signal on screen and still resolve it. Analog noise and the
          front-end amplifier set the practical floor, so 12 bits does not guarantee a 16x cleaner trace.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Rigol DHO924S vs Siglent SDS1202X-E: which is better?</h2>
        <p className="text-muted leading-7 mb-4">
          With both scopes pulling in different directions on channel count versus documented decode, the right
          pick depends on what your bench actually needs.
        </p>
        <h3 className="text-lg font-semibold mb-2">If you need four channels or finer resolution: the DHO924S</h3>
        <p className="text-muted leading-7 mb-4">
          Multi-rail power supplies, multi-point digital debugging, or any work that benefits from 12-bit vertical
          detail over 8-bit point toward the DHO924S. Its 50 Mpts of memory also means a longer capture window at
          full sample rate.
        </p>
        <h3 className="text-lg font-semibold mb-2">If two channels are enough and you want confirmed decode: the SDS1202X-E</h3>
        <p className="text-muted leading-7 mb-4">
          When your work is mostly two-signal comparisons on digital buses, the SDS1202X-E&apos;s clearly documented
          standard serial trigger/decode and fast capture rate make it the more straightforward, lower-cost choice.
        </p>
        <KeyIdea title="More channels and resolution come with less-detailed documentation here">
          It&apos;s not unusual for a higher-tier scope&apos;s sourcing to be lighter on some specifics (like confirmed
          standard serial decode) simply because the available documentation focused elsewhere. Don&apos;t read the
          DHO924S&apos;s lack of a stated serial-decode line as proof it lacks the feature — verify current Rigol
          documentation directly if that capability is a must-have.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Better fit", "Why"]}
          rows={[
            ["Need four channels at once", "Rigol DHO924S", "4 channels vs. 2"],
            ["Want confirmed standard serial decode", "Siglent SDS1202X-E", "I2C/SPI/UART/CAN/LIN documented as standard"],
            ["Want finer vertical detail", "Rigol DHO924S", "12-bit vs. 8-bit"],
            ["Hunting rare glitches, want a fast capture rate", "Siglent SDS1202X-E", "100,000-400,000 wfm/s documented"],
            ["Want the deepest memory for long captures", "Rigol DHO924S", "50 Mpts vs. 14 Mpts"],
            ["Want the lower-cost option", "Siglent SDS1202X-E", "Fewer channels, 8-bit, simpler platform"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Want to see the SDS1202X-E against a two-channel Rigol rival instead? See{" "}
          <Link href="/oscilloscopes/rigol-ds1202z-e-vs-siglent-sds1202x-e" className={link}>
            Rigol DS1202Z-E vs Siglent SDS1202X-E
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
        <Callout title="Confirm the AWG claim before relying on it">
          This Amazon listing for the DHO924S adds &quot;with AWG&quot; to its title, but Rigol&apos;s own product page
          doesn&apos;t confirm a built-in generator for this exact model. If a signal generator is part of your
          plan, verify directly with the seller or Rigol before buying.
        </Callout>
      </section>
    </>
  ),
  bottomLine:
    "The Rigol DHO924S and Siglent SDS1202X-E pull in different directions: more channels, finer resolution and deeper memory on the DHO924S, against confirmed standard serial decode and a faster documented capture rate on the SDS1202X-E. Choose based on channel count and resolution needs first, then decode requirements.",
  faqs: [
    {
      question: "Is the Rigol DHO924S better than the Siglent SDS1202X-E?",
      answer:
        "It has more channels (4 vs 2), finer resolution (12-bit vs 8-bit), more bandwidth (250 MHz vs 200 MHz) and deeper memory (50 Mpts vs 14 Mpts). The SDS1202X-E counters with confirmed standard serial decode and a faster documented waveform capture rate, so 'better' depends on what you need.",
    },
    {
      question: "Does the Rigol DHO924S include a built-in signal generator?",
      answer:
        "This Amazon listing's title adds \"with AWG,\" but Rigol's own product page doesn't confirm a built-in generator for the DHO924S specifically. Verify with the seller or Rigol's current documentation before assuming one is included.",
    },
    {
      question: "Can the DHO924S do logic analysis?",
      answer:
        "Yes, with the separate PLA2216 logic probe, which adds 16 digital channels. It's not confirmed to be bundled with this Amazon listing, so check before assuming it's included.",
    },
    {
      question: "Which has the faster waveform capture rate?",
      answer:
        "The Siglent SDS1202X-E documents a clear figure: up to 100,000 wfm/s in normal mode and 400,000 in sequence mode. The DHO924S's 1 Mwfms/s figure applies specifically to its UltraAcquire mode, which works differently from a standard capture rate.",
    },
    {
      question: "Does 12-bit resolution matter for a beginner oscilloscope?",
      answer:
        "It matters most when the detail you care about is small compared with the whole signal, such as millivolt ripple on a supply rail or a slowly drifting sensor. With 4,096 levels instead of 256, the DHO924S can resolve that detail without zooming in. For logic signals and general waveform checks, the SDS1202X-E's 8 bits are usually enough.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "Rigol DS1202Z-E vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-ds1202z-e-vs-siglent-sds1202x-e" },
    { label: "Rigol DHO814 vs Rigol DHO804", href: "/oscilloscopes/rigol-dho814-vs-rigol-dho804" },
  ],
};

export default function RigolDho924sVsSiglentSds1202xEPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
