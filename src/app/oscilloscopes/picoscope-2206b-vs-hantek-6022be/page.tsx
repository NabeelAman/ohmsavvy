import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// PicoScope 2206B extra facts (32 MS capture memory shared between active channels; 250 MS streaming with PicoScope 7;
// ETS 5 GS/s; AC/DC coupling; ±20 mV to ±20 V ranges; 1 MΩ ±1% || 16 pF; ±100 V overvoltage protection; 7 ns calculated rise
// time; generator 0.03 Hz–1 MHz, AWG 20 MS/s, 32 kS, 12-bit, ±2 V; serial decoding incl. CAN, I2C, SPI, UART, LIN, FlexRay;
// spectrum analyzer; mask testing; PicoScope 7 on Windows, macOS and Linux; 5-year warranty) per
// https://www.picotech.com/download/datasheets/picoscope-2000-series-data-sheet-en.pdf (checked 2026-10-24).
// Hantek 6022BE extra facts (1 MΩ / 25 pF, DC coupling, 20 mV–5 V/div, edge trigger, X-Y, FFT and + − × ÷ math,
// Windows 10/8/7/Vista/XP; memory not clearly assigned to this model) per https://hantek.com/products/detail/31 (checked 2026-10-24).

const path = "/oscilloscopes/picoscope-2206b-vs-hantek-6022be";

const pico = picks.find((p) => p.name === "PicoScope 2206B")!;
const hantek = picks.find((p) => p.name === "Hantek 6022BE")!;

export const metadata = buildMetadata({
  title: "PicoScope 2206B vs Hantek 6022BE",
  description:
    "PicoScope 2206B vs Hantek 6022BE: a 50 MHz USB scope with 32 MS of memory and an AWG against a 20 MHz budget PC scope. Charts, use cases and FAQs.",
  path: "/oscilloscopes/picoscope-2206b-vs-hantek-6022be",
});

const link = "text-accent hover:underline";

/**
 * The same 20 MHz sine (two cycles, 100 ns) sampled at the Hantek's 48 MS/s and at the PicoScope's two-channel
 * 250 MS/s. Sample spacing is 1 / rate: about 20.8 ns against 4 ns. The joined dots are what the software draws.
 */
function SampleSpacingDiagram() {
  const W = 320;
  const rowH = 74;
  const x0 = 14;
  const span = 290; // px for 100 ns
  const amp = 22;
  const rows = [
    { label: "Hantek 6022BE, 48 MS/s: a sample every ≈20.8 ns", stepNs: 1000 / 48, accent: false },
    { label: "PicoScope 2206B, 250 MS/s (2 ch): a sample every 4 ns", stepNs: 4, accent: true },
  ];
  const sig = (tNs: number) => Math.sin((2 * Math.PI * tNs) / 50); // 20 MHz = 50 ns period
  return (
    <svg
      viewBox={`0 0 ${W} ${rowH * 2 + 24}`}
      className="w-full h-auto"
      role="img"
      aria-label="Diagram: a 20 MHz sine sampled at 48 MS/s gets about five points across two cycles and the joined points form a jagged shape, while at 250 MS/s it gets 25 points and the drawn trace follows the real sine"
    >
      {rows.map((r, i) => {
        const cy = 40 + i * rowH;
        const truePts = Array.from({ length: 201 }, (_, k) => {
          const t = (k / 200) * 100;
          return `${(x0 + (t / 100) * span).toFixed(1)},${(cy - amp * sig(t)).toFixed(1)}`;
        }).join(" ");
        const n = Math.floor(100 / r.stepNs);
        const dots = Array.from({ length: n + 1 }, (_, k) => {
          const t = k * r.stepNs;
          return { x: x0 + (t / 100) * span, y: cy - amp * sig(t) };
        });
        return (
          <g key={r.label}>
            <text x={x0} y={cy - amp - 8} fontSize="9.5" className={r.accent ? "fill-accent" : "fill-foreground"}>
              {r.label}
            </text>
            <line x1={x0} x2={x0 + span} y1={cy} y2={cy} className="stroke-border" strokeWidth="0.8" />
            <polyline points={truePts} fill="none" className="stroke-muted" strokeOpacity="0.45" strokeWidth="1.2" />
            <polyline
              points={dots.map((d) => `${d.x.toFixed(1)},${d.y.toFixed(1)}`).join(" ")}
              fill="none"
              className={r.accent ? "stroke-accent" : "stroke-foreground"}
              strokeWidth="1.5"
            />
            {dots.map((d, k) => (
              <circle key={k} cx={d.x} cy={d.y} r="2.4" className={r.accent ? "fill-accent" : "fill-foreground"} />
            ))}
          </g>
        );
      })}
      <text x={x0} y={rowH * 2 + 18} fontSize="9" className="fill-muted">
        Faint line: the real 20 MHz signal over 100 ns. Dots and solid line: what each scope can draw.
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "PicoScope 2206B vs Hantek 6022BE",
  path,
  published: "2026-10-24",
  intro:
    "PicoScope 2206B vs Hantek 6022BE sets a well-specified USB oscilloscope against the cheapest PC scope in our roundup. Both are two-channel, 8-bit and powered over USB with no screen of their own. The PicoScope adds 50 MHz, 500 MS/s, a 32 MS buffer, a built-in generator and Pico's PicoScope 7 software; the Hantek offers 20 MHz and 48 MS/s on Windows for very little money.",
  a: {
    pick: pico,
    imageAlt: "PicoScope 2206B two-channel USB oscilloscope",
    chooseIf: [
      "You debug serial buses and want them decoded on screen (Pico lists CAN, I2C, SPI, UART, LIN and more)",
      "You want a signal source built in: a function generator and AWG up to 1 MHz",
      "You need long captures: 32 MS of buffer memory",
      "You work on macOS or Linux as well as Windows",
    ],
  },
  b: {
    pick: hantek,
    imageAlt: "Hantek 6022BE USB PC oscilloscope",
    chooseIf: [
      "Your budget is the deciding factor and you only want to learn the basics",
      "You have a Windows PC and look at audio, timers and slow PWM",
      "You are happy to read waveforms and bits manually with cursors",
      "You want a spare scope you won't mind leaving in a toolbox",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "None: PicoScope 7 on your computer", b: "None: Hantek's Windows software" },
    { label: "Vertical resolution", a: "8-bit (enhanced to 12-bit in software)", b: "8-bit" },
    { label: "Memory", a: "32 MS capture (shared between channels)", b: "Not clearly stated by Hantek" },
    { label: "Input coupling", a: "AC or DC", b: "DC only" },
    { label: "Input impedance", a: "1 MΩ ±1% || 16 pF", b: "1 MΩ || 25 pF" },
    { label: "Signal generator", a: "Function generator + AWG, 0.03 Hz to 1 MHz, ±2 V", b: "None" },
    { label: "Serial decoding", a: "CAN, I2C, SPI, UART, LIN, FlexRay and more", b: "None listed" },
    { label: "Software OS", a: "Windows, macOS, Linux", b: "Windows (10, 8, 7, Vista, XP listed)" },
    { label: "Warranty", a: "5 years", b: "Not stated by Hantek" },
  ],
  differences: [
    "Bandwidth: 50 MHz against 20 MHz, two and a half times as much.",
    "Sample rate: 500 MS/s on one PicoScope channel and 250 MS/s on two, against a 48 MS/s maximum on the Hantek.",
    "Memory: the PicoScope has a 32 MS buffer; Hantek's spec table doesn't clearly assign a memory figure to the 6022BE.",
    "The PicoScope includes a function generator and arbitrary waveform generator up to 1 MHz; the Hantek has no generator.",
    "Pico's datasheet lists serial decoding, a spectrum analyzer and mask testing in PicoScope 7; Hantek lists FFT, basic math and X-Y mode.",
    "PicoScope 7 runs on Windows, macOS and Linux; Hantek lists Windows only. The PicoScope also offers AC coupling, where the Hantek is DC-only.",
    "The Hantek's case for itself is price: its pick lists a very low price as the main advantage.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Both devices are small boxes with two BNC inputs and a USB cable, so the difference is entirely in
          what sits behind those inputs. The figures below are from Pico&apos;s 2000 Series datasheet and
          Hantek&apos;s 6022BE spec table. On every number both makers publish, the PicoScope is ahead by a wide
          margin.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Analog bandwidth (−3 dB): 50 MHz against 20 MHz.</>}>
            <BarChart
              items={[
                { label: "PicoScope 2206B", value: 50, display: "50 MHz", highlight: true },
                { label: "Hantek 6022BE", value: 20, display: "20 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Real-time sample rate, log scale. Pico states the two-channel rate; Hantek gives only a maximum.</>}>
            <BarChart
              log
              items={[
                { label: "PicoScope 2206B (1 ch)", value: 500_000_000, display: "500 MS/s", highlight: true },
                { label: "PicoScope 2206B (2 ch)", value: 250_000_000, display: "250 MS/s" },
                { label: "Hantek 6022BE (max)", value: 48_000_000, display: "48 MS/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Samples per cycle of a sine at each scope&apos;s bandwidth limit (sample rate ÷ bandwidth).</>}>
            <BarChart
              items={[
                { label: "PicoScope 2206B (1 ch)", value: 10, display: "10", highlight: true },
                { label: "PicoScope 2206B (2 ch)", value: 5, display: "5" },
                { label: "Hantek 6022BE", value: 2.4, display: "2.4" },
              ]}
            />
          </Figure>
          <Figure caption={<>Fastest edge each front end can show: Pico&apos;s calculated 7 ns, and about 17.5 ns for 20 MHz by the 0.35 ÷ bandwidth rule (lower is faster).</>}>
            <BarChart
              items={[
                { label: "PicoScope 2206B", value: 7, display: "7 ns", highlight: true },
                { label: "Hantek 6022BE", value: 17.5, display: "≈17.5 ns" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Sample rate and bandwidth work together. With one channel on, the PicoScope takes ten samples per cycle
          at its 50 MHz limit, enough to draw a recognizable sine; with both channels on, five. The Hantek&apos;s
          48 MS/s gives 2.4 samples per cycle at 20 MHz, barely above the Nyquist minimum of two, so the
          6022BE&apos;s usable range ends well before its rated bandwidth. For repetitive signals Pico also lists
          equivalent-time sampling (ETS) at 5 GS/s, which builds a waveform from many triggers. More on these
          specs in{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            our bandwidth explainer
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>
          .
        </p>
        <div className="mt-4">
          <Figure
            caption={
              <>
                One 20 MHz signal, two sample clocks. At 48 MS/s the Hantek takes roughly five samples across two
                cycles, so the trace it draws is a jagged outline; at 250 MS/s the PicoScope takes 25 and the drawn
                line follows the real sine.
              </>
            }
          >
            <SampleSpacingDiagram />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The spacing between dots is simply one divided by the sample rate: about 20.8 ns on the Hantek and 4 ns on
          the PicoScope with both channels running (2 ns with one). A 20 MHz sine completes a cycle every 50 ns, so the
          Hantek lands only two or three points on each cycle and the software has to guess the rest. That is why
          the 6022BE can confirm a 20 MHz signal exists but can&apos;t tell you whether it is clean, clipped or
          ringing, while the 2206B still draws a usable shape at the same frequency.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What you can measure with each</h2>
        <p className="text-muted leading-7 mb-4">
          Apply the 3–5× rule and the PicoScope covers signals up to roughly 10–17 MHz with good fidelity, while
          the Hantek&apos;s 20 MHz suggests 4–7 MHz. Because of its sample rate, the 6022BE is realistically a
          tool for signals in the low megahertz and below.
        </p>
        <h3 className="text-lg font-semibold mb-2">Jobs the Hantek 6022BE handles</h3>
        <p className="text-muted leading-7 mb-4">
          Audio signals, 555 timers, PWM for fans and LEDs, the 50 Hz frame of a hobby servo signal and slow
          sensor outputs are all well inside its range. You can check whether a UART line is toggling and count
          its bits at 9600 baud with cursors. What you can&apos;t do is read the bytes as text: Hantek lists no
          decoding, only an edge trigger, and no AC coupling, so a small ripple on a 12 V rail needs an external
          blocking capacitor before the 20 mV/div range can show it.
        </p>
        <h3 className="text-lg font-semibold mb-2">Jobs where the PicoScope 2206B is worth the step up</h3>
        <p className="text-muted leading-7 mb-4">
          An I2C or SPI bus running at a few megahertz, a CAN bus in a car project, or a UART exchange you want
          decoded into bytes: PicoScope 7 decodes these alongside the waveform. The 32 MS buffer matters for
          bursty traffic. At 500 MS/s on one channel it holds 64 ms of full-rate data, and shared across two
          channels at 250 MS/s it still covers 64 ms, long enough to capture a whole sensor transaction or a
          power-up sequence without dropping to a slow sample rate. The built-in AWG lets you inject a test
          tone into a filter or amplifier and watch the result on the second channel, without buying a separate
          generator, though at 1 MHz it is a low-frequency source.
        </p>
        <div className="mt-4">
          <KeyIdea title="Why memory depth decides your real sample rate">
            Capture time equals memory divided by sample rate. A scope with a short buffer must slow its sample
            rate to show a long time window, and fine detail disappears. With 32 MS, the PicoScope can keep
            sampling at hundreds of megasamples per second across tens of milliseconds. Hantek doesn&apos;t
            clearly state the 6022BE&apos;s buffer, so we can&apos;t calculate the same figure for it.
          </KeyIdea>
        </div>
        <div className="mt-4">
          <Callout title="Both share your computer's ground">
            Neither maker&apos;s spec sheet we checked lists USB isolation, so treat each probe&apos;s ground clip
            as connected to your computer, and through a desktop PC or earthed charger to mains earth. Pico rates
            the 2206B inputs at ±20 V full scale with ±100 V overvoltage protection; Hantek&apos;s range tops out
            at 5 V/div. Never probe mains directly with either. Use an isolated, rated differential probe.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Your situation", "Pick", "Reason"]}
          rows={[
            ["First scope, tight budget, Windows laptop", "Hantek 6022BE", "Very low price; enough for audio, timers and PWM"],
            ["Embedded work with I2C, SPI, UART or CAN", "PicoScope 2206B", "Serial decoding in PicoScope 7"],
            ["Filter or amplifier testing without a generator", "PicoScope 2206B", "Built-in function generator and AWG to 1 MHz"],
            ["Mac or Linux user", "PicoScope 2206B", "PicoScope 7 runs on all three; Hantek lists Windows"],
            ["Capturing a long, bursty sequence", "PicoScope 2206B", "32 MS buffer"],
            ["Supply ripple checks", "PicoScope 2206B", "AC coupling; the Hantek is DC-only"],
            ["A throw-in-the-bag spare for slow signals", "Hantek 6022BE", "Cheap, USB-powered, two channels"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For another budget USB scope against the Hantek, read{" "}
          <Link href="/oscilloscopes/owon-vds1022i-vs-hantek-6022be" className={link}>
            OWON VDS1022I vs Hantek 6022BE
          </Link>
          ; for Pico&apos;s cheaper sibling against a lab-in-a-box, see{" "}
          <Link href="/oscilloscopes/picoscope-2204a-vs-digilent-analog-discovery-3" className={link}>
            PicoScope 2204A vs Digilent Analog Discovery 3
          </Link>
          . If a standalone instrument suits you better, compare{" "}
          <Link href="/oscilloscopes/hantek-6022be-vs-hantek-dso2d10" className={link}>
            Hantek 6022BE vs Hantek DSO2D10
          </Link>
          ,{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-hantek-6022be" className={link}>
            Rigol DS1054Z vs Hantek 6022BE for beginners
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/fnirsi-dso152-vs-hantek-6022be" className={link}>
            FNIRSI DSO152 vs Hantek 6022BE
          </Link>
          , or start with the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>{" "}
          and the{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            full beginner roundup
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "The PicoScope 2206B is the far more capable instrument: 50 MHz, up to 500 MS/s, a 32 MS buffer, a built-in generator, serial decoding and software for Windows, macOS and Linux, backed by a 5-year warranty. The Hantek 6022BE is a learning tool for slow signals on a Windows PC, and its very low price is the reason to buy it. If you already know you'll debug microcontroller buses, skip the stepping stone and buy the PicoScope.",
  faqs: [
    {
      question: "Is the PicoScope 2206B worth it over the Hantek 6022BE?",
      answer:
        "If you'll use it beyond basic learning, yes. The 2206B has 2.5 times the bandwidth, over ten times the sample rate, a 32 MS buffer, a function generator and AWG, and serial decoding in PicoScope 7. The Hantek 6022BE suits someone who wants to see audio, timer and PWM waveforms on a Windows PC for the lowest possible outlay.",
    },
    {
      question: "Can the Hantek 6022BE decode I2C, SPI or UART?",
      answer:
        "Hantek lists no protocol decoding for the 6022BE: its software offers an edge trigger, FFT, basic math, X-Y mode and cursors. You can still see the bus waveforms and count bits manually at slow speeds. Pico's datasheet lists decoding for the 2206B, including CAN, I2C, SPI, UART, LIN and FlexRay.",
    },
    {
      question: "Does the PicoScope 2206B have a signal generator?",
      answer:
        "Yes. Pico lists a built-in function generator with sine, square, triangle, ramp, noise and other shapes from 0.03 Hz to 1 MHz, plus an arbitrary waveform generator with a 12-bit, 20 MS/s DAC and ±2 V output on a front-panel BNC. The Hantek 6022BE has no generator.",
    },
    {
      question: "Which of these USB scopes works on a Mac?",
      answer:
        "The PicoScope 2206B. Pico's PicoScope 7 software runs on Windows, macOS and Linux. Hantek lists only Windows versions (10, 8, 7, Vista and XP) for the 6022BE, so a Mac or Linux user would need a Windows machine or another scope.",
    },
    {
      question: "Are probes included with the PicoScope 2206B?",
      answer:
        "Pico's datasheet lists two x1/x10 probes, USB cables and a quick start guide in the kit. The Amazon listing we link doesn't spell out the box contents, so confirm with the seller before ordering if you don't already own probes.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "All oscilloscope comparisons", href: "/oscilloscopes/comparisons" },
    { label: "OWON VDS1022I vs Hantek 6022BE", href: "/oscilloscopes/owon-vds1022i-vs-hantek-6022be" },
    { label: "FNIRSI DSO152 vs Hantek 6022BE", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-6022be" },
    { label: "Hantek 6022BE vs Hantek DSO2D10", href: "/oscilloscopes/hantek-6022be-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs Hantek 6022BE", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-6022be" },
    { label: "PicoScope 2204A vs Digilent Analog Discovery 3", href: "/oscilloscopes/picoscope-2204a-vs-digilent-analog-discovery-3" },
    { label: "Rigol DS1054Z vs OWON VDS1022I", href: "/oscilloscopes/rigol-ds1054z-vs-owon-vds1022i" },
    { label: "OWON HDS2202S vs FNIRSI DSO152", href: "/oscilloscopes/owon-hds2202s-vs-fnirsi-dso152" },
    { label: "Hantek DSO2C10 vs Hantek DSO2D10", href: "/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d10" },
    { label: "Rigol DHO914 vs Rigol DHO804", href: "/oscilloscopes/rigol-dho914-vs-rigol-dho804" },
    { label: "Rigol DHO914S vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho914s-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1104Z-S Plus vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1104z-s-plus-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs OWON SDS1102", href: "/oscilloscopes/rigol-ds1054z-vs-owon-sds1102" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1202x-e" },
    { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs Hantek DSO5102P", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso5102p" },
    { label: "Rigol DS1054Z vs FNIRSI DSO152", href: "/oscilloscopes/rigol-ds1054z-vs-fnirsi-dso152" },
    { label: "Rigol DHO802 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho802-vs-rigol-ds1054z" },
    { label: "Rigol DHO802 vs FNIRSI DSO152", href: "/oscilloscopes/rigol-dho802-vs-fnirsi-dso152" },
    { label: "Rigol DHO802 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho802-vs-hantek-dso2d10" },
    { label: "Rigol DHO804 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" },
    { label: "Rigol DHO804 vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e" },
    { label: "Rigol DHO804 vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1202x-e" },
    { label: "Rigol DHO804 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho804-vs-hantek-dso2d10" },
    { label: "Rigol DHO804 vs FNIRSI 1014D", href: "/oscilloscopes/rigol-dho804-vs-fnirsi-1014d" },
    { label: "Hantek DSO5102P vs Rigol DHO804", href: "/oscilloscopes/hantek-dso5102p-vs-rigol-dho804" },
    { label: "Rigol DS1102Z-E vs Siglent SDS1102CML+", href: "/oscilloscopes/rigol-ds1102z-e-vs-siglent-sds1102cml-plus" },
    { label: "Siglent SDS1104X-E vs Siglent SDS1202X-E", href: "/oscilloscopes/siglent-sds1104x-e-vs-siglent-sds1202x-e" },
    { label: "Siglent SDS1104X-E vs Rigol DHO802", href: "/oscilloscopes/siglent-sds1104x-e-vs-rigol-dho802" },
    { label: "Siglent SDS1104X-E vs Hantek DSO5102P", href: "/oscilloscopes/siglent-sds1104x-e-vs-hantek-dso5102p" },
    { label: "Siglent SDS1202X-E vs Hantek DSO2D10", href: "/oscilloscopes/siglent-sds1202x-e-vs-hantek-dso2d10" },
    { label: "Hantek DSO2D10 vs Siglent SDS1104X-E", href: "/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" },
    { label: "FNIRSI DSO152 vs Hantek DSO2D10", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-dso2d10" },
    { label: "FNIRSI DSO152 vs Siglent SDS1104X-E", href: "/oscilloscopes/fnirsi-dso152-vs-siglent-sds1104x-e" },
    { label: "FNIRSI DSO-TC3 vs FNIRSI DSO152", href: "/oscilloscopes/fnirsi-dso-tc3-vs-fnirsi-dso152" },
    { label: "FNIRSI 1014D vs FNIRSI DSO-TC3", href: "/oscilloscopes/fnirsi-1014d-vs-fnirsi-dso-tc3" },
    { label: "Hantek 2D72 vs FNIRSI 2C53T", href: "/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t" },
  ],
};

export default function PicoScope2206bVsHantek6022bePage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
