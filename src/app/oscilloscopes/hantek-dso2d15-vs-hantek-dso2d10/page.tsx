import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Hantek DSO2D15 and DSO2D10: one DSO2000-series spec table covers both. Shared: 2 channels, 1 GSa/s (1 ch) / 500 MSa/s
// (2 ch), 8 Mpts (1 ch) / 4 Mpts (2 ch), 8-bit with a high-resolution mode up to 12-bit, 2 mV/div to 10 V/div,
// 1 MOhm || 13 pF inputs, 300 V CAT II and 300 Vrms max (10X probe), 2 ns/div to 100 s/div, 14 trigger types incl.
// UART/LIN/CAN/SPI/I2C, RS232/UART, I2C, SPI, CAN, LIN decode, 32 auto measurements, 1-channel generator (25 MHz sine,
// 10 MHz square/pulse/arbitrary, 1 MHz triangle, 200 MSa/s, 12-bit, 10 mV-7 Vpp high-Z), external trigger input on the
// generator models, 7-inch 800 x 480, <30 W, 1900 g, 318 x 110 x 150 mm, and "bandwidth reduced to 6MHz when using a 1X
// probe". Differences: bandwidth 150 MHz (DSO2D15) vs 100 MHz (DSO2D10); rise time at BNC 2.4 ns vs 3.5 ns. All per
// http://www.hantek.com/products/detail/17182 (checked 2026-11-08). Hantek doesn't state a waveform update rate.
// The DSO2D15 listing in its Pick (B08Y6KVMSV) bundles a P4100 100X probe, per that Pick. Both ASINs in stock on
// Amazon.com at ZIP 10001 (checked 2026-11-08). Harmonic and samples-per-cycle figures below are arithmetic on these specs.

const path = "/oscilloscopes/hantek-dso2d15-vs-hantek-dso2d10";
const d15 = picks.find((p) => p.name === "Hantek DSO2D15")!;
const d10 = picks.find((p) => p.name === "Hantek DSO2D10")!;

export const metadata = buildMetadata({
  title: "Hantek DSO2D15 vs DSO2D10: Is 150 MHz Worth It?",
  description:
    "Hantek DSO2D15 vs DSO2D10: the same DSO2000 scope with a 25 MHz generator, at 150 or 100 MHz. What the extra 50 MHz shows, with harmonic math.",
  path: "/oscilloscopes/hantek-dso2d15-vs-hantek-dso2d10",
  image: d15.image,
});

const link = "text-accent hover:underline";

/** Odd harmonics of a 10 MHz square wave against the two bandwidth limits. */
function HarmonicLadder() {
  const x0 = 34;
  const scale = 2.1; // px per MHz
  const base = 160;
  const harmonics = [1, 3, 5, 7, 9, 11, 13, 15];
  return (
    <svg
      viewBox="0 0 400 200"
      className="w-full h-auto"
      role="img"
      aria-label="Hantek DSO2D15 vs DSO2D10 harmonic chart: a 10 MHz square wave is built from odd harmonics at 10, 30, 50, 70, 90, 110, 130 and 150 MHz, each smaller than the last. The DSO2D10's 100 MHz bandwidth line falls after the 9th harmonic at 90 MHz; the DSO2D15's 150 MHz line reaches the 15th harmonic, so it keeps three more of them."
    >
      <path d={`M${x0} ${base} H${x0 + 165 * scale}`} className="stroke-foreground" strokeWidth="1.2" />
      {[0, 50, 100, 150].map((f) => (
        <text key={f} x={x0 + f * scale} y={base + 14} fontSize="8.5" textAnchor="middle" className="fill-muted">
          {f} MHz
        </text>
      ))}
      {harmonics.map((n) => {
        const x = x0 + n * 10 * scale;
        const h = 110 / n;
        return (
          <g key={n}>
            <rect x={x - 4} y={base - h} width="8" height={h} rx="1.5" className={n * 10 <= 100 ? "fill-accent" : "fill-accent/40"} />
            <text x={x} y={base - h - 4} fontSize="7.5" textAnchor="middle" className="fill-foreground">
              {n === 1 ? "1st" : n === 3 ? "3rd" : `${n}th`}
            </text>
          </g>
        );
      })}
      <path d={`M${x0 + 100 * scale} 22 V${base}`} className="stroke-foreground" strokeWidth="1.3" strokeDasharray="5 3" />
      <text x={x0 + 100 * scale - 4} y="20" fontSize="9" fontWeight="700" textAnchor="end" className="fill-foreground">
        DSO2D10: 100 MHz
      </text>
      <path d={`M${x0 + 150 * scale} 34 V${base}`} className="stroke-accent" strokeWidth="1.6" strokeDasharray="5 3" />
      <text x={x0 + 150 * scale} y="30" fontSize="9" fontWeight="700" textAnchor="middle" className="fill-accent">
        DSO2D15: 150 MHz
      </text>
      <text x="200" y="194" fontSize="8.5" textAnchor="middle" className="fill-muted">
        10 MHz square wave: odd harmonics, amplitude falls as 1/n
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Hantek DSO2D15 vs DSO2D10",
  path,
  published: "2026-11-08",
  intro:
    "Hantek DSO2D15 vs DSO2D10 is the simplest comparison in Hantek's bench range: one spec table, one chassis, one 25 MHz generator, and a single real difference. The DSO2D15 is rated 150 MHz with a 2.4 ns rise time; the DSO2D10 is rated 100 MHz with 3.5 ns. Sample rate, memory, triggers, decoding, screen and weight are identical. So the question is narrow: will you ever probe a signal where those extra 50 MHz change what you see?",
  a: {
    pick: d15,
    imageAlt: "Hantek DSO2D15 two-channel 150 MHz bench oscilloscope with built-in generator",
    chooseIf: [
      "You look at digital clocks above about 20 MHz and want their edges drawn close to true shape",
      "You measure rise times in the 5 to 10 ns range, where a 3.5 ns scope adds visible error",
      "You want the 100X P4100 probe that this listing bundles for higher-voltage work",
      "You'd rather buy the headroom once than outgrow 100 MHz in a year",
    ],
  },
  b: {
    pick: d10,
    imageAlt: "Hantek DSO2D10 two-channel 100 MHz bench oscilloscope with built-in generator",
    chooseIf: [
      "Your signals are audio, PWM, UART, I2C, SPI under 10 MHz or power-supply switching",
      "You want the same generator, decoding and memory for less money",
      "Most of your probing is at 1X, where Hantek limits both models to 6 MHz anyway",
      "You want to read our full DSO2D10 review before buying",
    ],
  },
  extraSpecs: [
    { label: "Rise time at BNC (typical)", a: "2.4 ns", b: "3.5 ns" },
    { label: "Memory depth", a: "8 Mpts (1 ch); 4 Mpts (2 ch)", b: "8 Mpts (1 ch); 4 Mpts (2 ch)" },
    { label: "Vertical resolution", a: "8-bit; high-res mode up to 12-bit", b: "8-bit; high-res mode up to 12-bit" },
    { label: "Built-in generator", a: "1 ch: 25 MHz sine, 10 MHz square/arbitrary", b: "1 ch: 25 MHz sine, 10 MHz square/arbitrary" },
    { label: "Serial trigger and decode", a: "UART, I2C, SPI, CAN, LIN", b: "UART, I2C, SPI, CAN, LIN" },
    { label: "Bandwidth with a 1X probe", a: "6 MHz", b: "6 MHz" },
    { label: "Samples per cycle at rated bandwidth, 2 ch on", a: "3.3 (500 MSa/s ÷ 150 MHz)", b: "5 (500 MSa/s ÷ 100 MHz)" },
    { label: "Display, power, weight", a: "7-inch 800 × 480; mains, <30 W; 1900 g", b: "7-inch 800 × 480; mains, <30 W; 1900 g" },
    { label: "In the box (this listing)", a: "Adds a P4100 100X probe", b: "Standard accessories" },
  ],
  differences: [
    "Bandwidth: 150 MHz on the DSO2D15 against 100 MHz on the DSO2D10, 50% more, from the same Hantek spec table.",
    "Rise time: Hantek lists 2.4 ns at the BNC for the DSO2D15 and 3.5 ns for the DSO2D10, so the D15 draws a fast edge about 30% sharper.",
    "Everything else Hantek publishes is identical: 1 GSa/s on one channel, 500 MSa/s on two, 8 Mpts of memory, 14 trigger types, five serial decoders and the 25 MHz generator.",
    "With both channels on, the DSO2D15 takes 3.3 samples per cycle at its rated bandwidth against 5 for the DSO2D10. The D15's top end leans harder on sin(x)/x interpolation.",
    "The DSO2D15 listing we link bundles a P4100 100X probe; the DSO2D10 listing doesn't mention one.",
    "Neither carries our Hands-on Tested badge; both assessments are desk research from Hantek's published spec table.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">The only spec that changes</h2>
        <p className="text-muted leading-7 mb-4">
          Hantek prints both models in one column-by-column table, and only two rows differ: bandwidth and rise time.
          The charts below show those two, plus the one derived figure that quietly favors the cheaper model.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Rated bandwidth (-3 dB) per Hantek&apos;s DSO2000 spec table.</>}>
            <BarChart
              items={[
                { label: "Hantek DSO2D15", value: 150, display: "150 MHz", highlight: true },
                { label: "Hantek DSO2D10", value: 100, display: "100 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Rise time at the BNC, typical. Shorter means faster edges are drawn closer to their true shape.</>}>
            <BarChart
              items={[
                { label: "Hantek DSO2D10", value: 3.5, display: "3.5 ns" },
                { label: "Hantek DSO2D15", value: 2.4, display: "2.4 ns", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Highest odd harmonic of a square wave that stays inside each bandwidth, for a 10 MHz clock.</>}>
            <BarChart
              items={[
                { label: "Hantek DSO2D15", value: 15, display: "15th (150 MHz)", highlight: true },
                { label: "Hantek DSO2D10", value: 9, display: "9th (90 MHz)" },
              ]}
            />
          </Figure>
          <Figure caption={<>Samples per cycle at each scope&apos;s rated bandwidth with both channels on (500 MSa/s).</>}>
            <BarChart
              items={[
                { label: "Hantek DSO2D10", value: 5, display: "5.0", highlight: true },
                { label: "Hantek DSO2D15", value: 3.3, display: "3.3" },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What 50 extra megahertz buys on a square wave</h2>
        <p className="text-muted leading-7 mb-4">
          A sine wave only needs bandwidth at its own frequency. A square wave, which is what every clock, PWM output
          and data line really is, is a sum of odd harmonics: the 3rd at a third of the size, the 5th at a fifth, and so
          on. A scope that cuts off the higher harmonics rounds the corners and slows the edges on screen. The usual
          rule for a square wave that still looks square is to keep at least the 5th harmonic, which means bandwidth of
          five times the clock.
        </p>
        <Figure
          caption={
            <>
              A 10 MHz square wave and its odd harmonics. The DSO2D10 keeps the first five (up to 90 MHz); the DSO2D15
              keeps eight (up to 150 MHz). Bars are drawn at 1/n of the fundamental, the textbook square-wave series.
            </>
          }
        >
          <HarmonicLadder />
        </Figure>
        <p className="text-muted leading-7 my-4">
          Run the five-times rule against each scope and the practical ceilings fall out: 100 MHz ÷ 5 = 20 MHz of
          clock on the DSO2D10, 150 MHz ÷ 5 = 30 MHz on the DSO2D15. Below 20 MHz both draw a clean square; between 20
          and 30 MHz the D15 still does and the D10 starts to round the corners; above 30 MHz both are
          showing you frequency and timing, not edge shape. For a 16 MHz Arduino crystal or an 8 MHz SPI clock, the
          two scopes will look the same.
        </p>
        <KeyIdea title="Rise time is the same story in nanoseconds">
          The standard approximation is rise time ≈ 0.35 ÷ bandwidth, and Hantek&apos;s numbers match it: 0.35 ÷ 100
          MHz = 3.5 ns, 0.35 ÷ 150 MHz = 2.3 ns (Hantek lists 2.4 ns). An edge needs to be roughly three to five times
          slower than the scope&apos;s own rise time to read accurately. That puts the DSO2D10&apos;s floor near 10 to 18
          ns and the DSO2D15&apos;s near 7 to 12 ns. If you work with 74HC logic, gate drivers or anything you plan to
          time with{" "}
          <Link href="/oscilloscopes/how-to-measure-rise-time-with-oscilloscope-cursors" className={link}>
            rise-time cursors
          </Link>
          , that is the range where the two models part ways.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Hantek DSO2D15 vs DSO2D10: which should you buy?</h2>
        <DataTable
          head={["Job", "Pick", "Why"]}
          rows={[
            ["Arduino, ESP32 and Raspberry Pi GPIO, UART, I2C", "DSO2D10", "Edges and clocks sit well inside 100 MHz"],
            ["Switch-mode supply ripple and switching nodes", "DSO2D10", "Hundreds of kHz to a few MHz; the 20 MHz limit filter helps both"],
            ["SPI or SDIO clocks from 20 to 30 MHz", "DSO2D15", "Keeps the 5th harmonic where the D10 loses it"],
            ["Measuring 5 to 10 ns logic edges", "DSO2D15", "2.4 ns rise time adds less error than 3.5 ns"],
            ["Checking a 25 MHz sine from the built-in generator", "Either", "Both pass 25 MHz with room to spare"],
            ["Higher-voltage work needing a 100X probe", "DSO2D15", "This listing includes a P4100 100X probe"],
            ["Lowest cost for the same features", "DSO2D10", "Same memory, decode and generator"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          My read: most buyers on a hobby or repair bench should take the DSO2D10 and spend the difference on a
          second good probe set. The DSO2D15 earns its place when you already know you work with fast digital edges or
          clocks in the 20 to 30 MHz band. If you are still deciding whether 100 MHz is enough at all, our{" "}
          <Link href="/oscilloscopes/50mhz-vs-100mhz-oscilloscope" className={link}>
            50 MHz vs 100 MHz guide
          </Link>{" "}
          walks through the same arithmetic one step down.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t measure</h2>
        <h3 className="text-lg font-semibold mb-2">Hantek DSO2D15: the same box with a higher ceiling</h3>
        <p className="text-muted leading-7 mb-4">
          With one channel on, 1 GSa/s against 150 MHz gives about 6.7 samples per cycle, comfortable for timing work.
          It shows 30 MHz clocks as squares, catches edges down to roughly 7 ns with fair accuracy and lets you see
          ringing on a fast gate signal that the D10 would partly smooth away. It can&apos;t make 8-bit vertical
          resolution any finer, decode a bus Hantek doesn&apos;t list (no USB, no I2S), or keep more than 4 Mpts per
          channel with both channels running.
        </p>
        <h3 className="text-lg font-semibold mb-2">Hantek DSO2D10: 100 MHz covers most benches</h3>
        <p className="text-muted leading-7 mb-4">
          Two channels at 500 MSa/s give 5 samples per cycle at 100 MHz, a healthier ratio than the D15 at its own
          limit. It handles audio, motor PWM, CAN and LIN, sensor outputs, microcontroller clocks to about 20 MHz and
          switching supplies, which is the work most people buy a two-channel bench scope for. Its limits are the same
          8-bit converter and 4 Mpts dual-channel memory, plus softer edges on anything faster than about 10 ns.
        </p>
        <Callout title="Probe setting decides more than the model">
          Hantek&apos;s table notes that bandwidth drops to 6 MHz with a probe set to 1X, on both models. At 1X a
          150 MHz DSO2D15 is a 6 MHz scope. Set the probe and the channel menu to 10X for anything fast. Both inputs
          are rated 300 V CAT II, with 300 Vrms maximum through a 10X probe; for mains-side work, use a differential
          probe rather than clipping the ground lead to a live conductor.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The weak point: 500 MSa/s across 150 MHz</h2>
        <p className="text-muted leading-7 mb-4">
          The DSO2D15&apos;s extra bandwidth comes without extra sampling. With both channels on, each gets 500 MSa/s,
          which is 3.3 samples per cycle at 150 MHz. Hantek lists sin(x)/x interpolation, which reconstructs a sine
          well at that ratio, but a single-shot glitch near the top of the band gets only two or three real samples.
          For repeating signals that is fine; for one-off events, switch off the second channel to get 1 GSa/s back.
          Hantek also doesn&apos;t publish a waveform update rate for either model, so we can&apos;t say how quickly
          either redraws intermittent faults.
        </p>
        <p className="text-muted leading-7">
          If the generator is the reason you&apos;re looking at this family, the{" "}
          <Link href="/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d15" className={link}>
            Hantek DSO2C10 vs DSO2D15
          </Link>{" "}
          page covers what it adds over the no-generator model. For other directions, see{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" className={link}>
            Rigol DS1054Z vs Hantek DSO2D10
          </Link>{" "}
          for four channels,{" "}
          <Link href="/oscilloscopes/hantek-dso5102p-vs-hantek-dso2d10" className={link}>
            Hantek DSO5102P vs DSO2D10
          </Link>{" "}
          for Hantek&apos;s older 100 MHz bench, and{" "}
          <Link href="/oscilloscopes/hantek-dso2d15-vs-rigol-ds1054z" className={link}>
            Hantek DSO2D15 vs Rigol DS1054Z
          </Link>{" "}
          for 150 MHz against four inputs. The{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            bandwidth explainer
          </Link>{" "}
          covers the -3 dB definition behind every number here.
        </p>
      </section>
    </>
  ),
  bottomLine:
    "The Hantek DSO2D10 is the right buy for most two-channel benches: 100 MHz, a 25 MHz generator, five serial decoders and 8 Mpts, all identical to its sibling. Pay for the Hantek DSO2D15 only if you work with clocks from 20 to 30 MHz or time edges faster than about 10 ns, where its 150 MHz and 2.4 ns rise time show a cleaner signal.",
  chooseNeitherIf:
    "You need more than two inputs at once, for example SPI's clock, chip select and both data lines together. Both are two-channel scopes; a four-channel model such as the Rigol DS1054Z fits that job better.",
  faqs: [
    {
      question: "Is the Hantek DSO2D15 just a DSO2D10 with more bandwidth?",
      answer:
        "On Hantek's published spec table, yes. Both have two channels, 1 GSa/s, 8 Mpts, the same 25 MHz generator, 14 trigger types, five serial decoders and a 7-inch 800 × 480 screen. The table differs only in bandwidth, 150 MHz against 100 MHz, and rise time, 2.4 ns against 3.5 ns.",
    },
    {
      question: "Can the DSO2D10's own generator show its limits?",
      answer:
        "Partly. The generator's square and arbitrary waves stop at 10 MHz, and a 10 MHz square keeps its 9th harmonic on the DSO2D10 and its 15th on the DSO2D15, so the D15 draws slightly sharper corners. Its 25 MHz sine sits well inside both bandwidths and will look the same on either scope.",
    },
    {
      question: "Does 150 MHz help with Arduino or ESP32 projects?",
      answer:
        "Rarely. A 16 MHz Arduino clock needs about 80 MHz to keep its 5th harmonic, and the buses you probe on these boards, UART, I2C and SPI at a few MHz, sit far lower. The DSO2D10 shows them just as well. The extra bandwidth matters for faster clocks and sharp edges, not typical maker projects.",
    },
    {
      question: "Why does Hantek list 6 MHz bandwidth for both models?",
      answer:
        "That figure applies with the probe set to 1X. A 1X probe loads the input with its cable capacitance, which limits bandwidth to about 6 MHz on both scopes, per Hantek's table. Switch the probe and the channel setting to 10X to get the rated 100 MHz or 150 MHz.",
    },
    {
      question: "Which one holds its value better as I learn more?",
      answer:
        "The DSO2D15 has more room before bandwidth becomes the limit, since a 30 MHz clock still looks square on it. But both share the same two-channel, 8-bit, 8 Mpts core, so if you outgrow one because you need four channels or deeper memory, you'll outgrow the other at the same point.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Hantek DSO2D10 review", href: "/oscilloscopes/hantek-dso2d10-review" },
    { label: "Hantek DSO2C10 vs Hantek DSO2D15", href: "/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d15" },
    { label: "Hantek DSO2C10 vs Hantek DSO2D10", href: "/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d10" },
    { label: "Hantek DSO2D15 vs FNIRSI 1014D", href: "/oscilloscopes/hantek-dso2d15-vs-fnirsi-1014d" },
    { label: "Hantek DSO2D15 vs Rigol DS1054Z", href: "/oscilloscopes/hantek-dso2d15-vs-rigol-ds1054z" },
    { label: "Hantek DSO5102P vs Hantek DSO2D10", href: "/oscilloscopes/hantek-dso5102p-vs-hantek-dso2d10" },
    { label: "Hantek DSO5102P vs Hantek DSO2D15", href: "/oscilloscopes/hantek-dso5102p-vs-hantek-dso2d15" },
    { label: "Rigol DS1102Z-E vs Hantek DSO2D15", href: "/oscilloscopes/rigol-ds1102z-e-vs-hantek-dso2d15" },
    { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
    { label: "Rigol DHO802 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho802-vs-hantek-dso2d10" },
    { label: "Siglent SDS1202X-E vs Hantek DSO2D10", href: "/oscilloscopes/siglent-sds1202x-e-vs-hantek-dso2d10" },
    { label: "50 MHz vs 100 MHz oscilloscope", href: "/oscilloscopes/50mhz-vs-100mhz-oscilloscope" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "Oscilloscope sample rate explained", href: "/oscilloscopes/oscilloscope-sample-rate-explained" },
  ],
};

export default function HantekDso2d15VsHantekDso2d10Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
