import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// FNIRSI 1014D: 100 MHz x 2, 1 GSa/s real time, Single/Normal/Auto trigger, one-button AUTO with adaptive 25/50/75%
// trigger, 7-inch 800 x 480, cursors, Lissajous (X-Y) and FFT; DDS generator 2.5 Vpp, 1 Hz steps, 14 function signals
// plus a custom signal, up to 1000 custom signals stored; item model 1014D; item weight 3.46 lb per
// https://www.amazon.com/dp/B097T5NRTZ (checked 2026-11-07, In Stock at ZIP 10001). 8-bit; rising/falling edge trigger;
// external trigger input 0-40 V; generator sine to 10 MHz, other waves to 2 MHz, custom to 1 MHz; 12 auto parameters;
// rise time <3 ns; 1 MOhm input; max test voltage 40 V (1X) / 400 V (10X); memory written as "240Kbit"; 1 GB storage for
// 1000 screenshots + 1000 waveforms; 310 x 145 x 70 mm; 5 V 2A/3A/4A supply per https://www.fnirsi.com/products/1014d
// (spec tables as recorded 2026-10-24; the page now renders its specs as images, so the text was not re-read on
// 2026-11-07). FNIRSI doesn't state the per-channel sample rate with both channels on or the generator's output impedance.
// Hantek DSO2D10 per https://www.hantek.com/products/detail/17182 (checked 2026-11-07): 100 MHz, 2 ch, 1 GSa/s (1 ch) /
// 500 MSa/s (2 ch), 8 Mpts (1 ch) / 4 Mpts (2 ch), 8-bit with up to 12-bit high-res acquisition, 2 mV/div-10 V/div,
// 2 ns/div-100 s/div, rise time 3.5 ns typical, bandwidth reduced to 6 MHz with a 1X probe, 1 MOhm || 13 pF, 300 V CAT II,
// triggers edge, pulse width, video, slope, overtime, window, pattern, interval, under-amp, UART, LIN, CAN, SPI, IIC;
// decode RS232/UART, I2C, SPI, CAN, LIN; math + - x / FFT; 32 auto measurements; generator 1 ch, 200 MSa/s, 12-bit,
// sine 0.1 Hz-25 MHz, square/pulse to 10 MHz, triangle to 1 MHz, "sampling wave" (ramp) to 1 MHz, exponential to 5 MHz,
// Arb1-Arb4 to 10 MHz, 4 KSa arbitrary length, 10 mV-7 Vpp into high impedance, 5 mV-3.5 Vpp into 50 ohm, +/-3.5 V
// offset, 50 ohm output impedance; 7-inch 800 x 480; 100-240 VAC, under 30 W; 318 x 110 x 150 mm; 1900 g.
// Amazon https://www.amazon.com/dp/B0D6B7HRMG (checked 2026-11-07, "Only 3 left in stock" at ZIP 10001) matches those
// specs but gives item weight 6.28 lb, and its bullet list of kit contents (car voltage tester, test leads, jumper wires)
// differs from the package list further down the same listing (scope, USB cable, 2 PP-150 probes, 2 BNC clip leads).

const path = "/oscilloscopes/fnirsi-1014d-vs-hantek-dso2d10";
const fnirsi = picks.find((p) => p.name === "FNIRSI 1014D")!;
const hantek = picks.find((p) => p.name === "Hantek DSO2D10")!;

export const metadata = buildMetadata({
  title: "FNIRSI 1014D vs Hantek DSO2D10: 2-in-1 Scopes",
  description:
    "FNIRSI 1014D vs Hantek DSO2D10: two 100 MHz scopes with built-in generators. Generator ranges, triggers, decoding and power compared, with a clear verdict.",
  path: "/oscilloscopes/fnirsi-1014d-vs-hantek-dso2d10",
  image: hantek.image,
});

const link = "text-accent hover:underline";

/** Top frequency of each generator by waveform, on one log axis from 100 kHz to 100 MHz. */
function GeneratorRangeDiagram() {
  const L = 92;
  const R = 386;
  const x = (f: number) => L + ((Math.log10(f) - 5) / 3) * (R - L);
  const ticks = [
    { f: 1e5, t: "100 kHz" },
    { f: 1e6, t: "1 MHz" },
    { f: 1e7, t: "10 MHz" },
    { f: 1e8, t: "100 MHz" },
  ];
  const rows = [
    { label: "Sine", f: 10e6, h: 25e6, fn: "10 MHz", hn: "25 MHz" },
    { label: "Square", f: 2e6, h: 10e6, fn: "2 MHz", hn: "10 MHz" },
    { label: "Triangle, ramp", f: 2e6, h: 1e6, fn: "2 MHz", hn: "1 MHz" },
    { label: "Custom / arb", f: 1e6, h: 10e6, fn: "1 MHz", hn: "10 MHz" },
  ];
  return (
    <svg
      viewBox="0 0 400 236"
      className="w-full h-auto"
      role="img"
      aria-label="FNIRSI 1014D vs Hantek DSO2D10 generator ranges on a log frequency axis. Sine: 10 MHz on the FNIRSI, 25 MHz on the Hantek. Square: 2 MHz against 10 MHz. Triangle and ramp: 2 MHz on the FNIRSI against 1 MHz on the Hantek. Custom or arbitrary waveforms: 1 MHz against 10 MHz."
    >
      <rect x="96" y="6" width="10" height="8" className="fill-accent" />
      <text x="110" y="14" fontSize="9" className="fill-foreground">FNIRSI 1014D</text>
      <rect x="200" y="6" width="10" height="8" className="fill-muted/60" />
      <text x="214" y="14" fontSize="9" className="fill-foreground">Hantek DSO2D10</text>
      {ticks.map((t, i) => (
        <g key={t.f}>
          <line x1={x(t.f)} x2={x(t.f)} y1="24" y2="200" className="stroke-border" strokeWidth="0.6" strokeDasharray="2 3" />
          <text x={x(t.f)} y="214" fontSize="8.5" textAnchor={i === 0 ? "start" : i === ticks.length - 1 ? "end" : "middle"} className="fill-muted">
            {t.t}
          </text>
        </g>
      ))}
      {rows.map((r, i) => {
        const y = 34 + i * 42;
        return (
          <g key={r.label}>
            <text x="4" y={y + 14} fontSize="9.5" className="fill-foreground">{r.label}</text>
            <rect x={L} y={y} width={x(r.f) - L} height="11" rx="2" className="fill-accent" />
            <text x={x(r.f) + 4} y={y + 9} fontSize="8.5" className="fill-foreground">{r.fn}</text>
            <rect x={L} y={y + 15} width={x(r.h) - L} height="11" rx="2" className="fill-muted/60" />
            <text x={x(r.h) + 4} y={y + 24} fontSize="8.5" className="fill-foreground">{r.hn}</text>
          </g>
        );
      })}
      <text x="4" y="230" fontSize="8" className="fill-muted">Bars start at 100 kHz for scale; both generators go down to low Hz.</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "FNIRSI 1014D vs Hantek DSO2D10",
  path,
  published: "2026-11-07",
  intro:
    "FNIRSI 1014D vs Hantek DSO2D10 is the closest match-up in budget two-in-one scopes: both are 100 MHz, two-channel, 1 GSa/s benchtops with a 7-inch 800 × 480 screen and a one-channel signal generator built in. The headline specs tie. The generators don't. The Hantek's goes to 25 MHz sine and 7 Vpp and adds serial triggers, decoding and 8 Mpts of memory; the FNIRSI wins on triangle and ramp frequency, runs from a 5 V supply and weighs less.",
  a: {
    pick: fnirsi,
    imageAlt: "FNIRSI 1014D two-channel benchtop oscilloscope with built-in signal generator",
    chooseIf: [
      "You want triangle or ramp waves up to 2 MHz, twice the Hantek's 1 MHz ceiling",
      "You'd like to run the scope from a 5 V supply instead of a mains cord",
      "You want a 100X high-voltage probe in the box (the Amazon kit includes one)",
      "You'll store lots of custom generator shapes: FNIRSI says up to 1,000",
    ],
  },
  b: {
    pick: hantek,
    imageAlt: "Hantek DSO2D10 two-channel oscilloscope with 25 MHz arbitrary waveform generator",
    chooseIf: [
      "You need sine output above 10 MHz or square waves above 2 MHz",
      "You want more than 2.5 Vpp out of the generator: Hantek lists 7 Vpp into high impedance",
      "You debug UART, I2C, SPI, CAN or LIN and want the scope to trigger on and decode them",
      "You want a stated 4 Mpts per channel with both channels running",
    ],
  },
  extraSpecs: [
    { label: "Sample rate, both channels on", a: "Not stated", b: "500 MSa/s" },
    { label: "Memory", a: "\"240Kbit\" (FNIRSI's wording)", b: "8 Mpts (1 ch), 4 Mpts (2 ch)" },
    { label: "Generator sine / square", a: "10 MHz / 2 MHz", b: "25 MHz / 10 MHz" },
    { label: "Generator amplitude", a: "2.5 Vpp (load not stated)", b: "10 mV–7 Vpp high-Z, 5 mV–3.5 Vpp into 50 Ω" },
    { label: "Triggers", a: "Rising/falling edge; Auto, Normal, Single; external input", b: "14 types incl. UART, LIN, CAN, SPI, I2C" },
    { label: "Serial decoding", a: "None listed", b: "RS232/UART, I2C, SPI, CAN, LIN" },
    { label: "Auto measurements", a: "12", b: "32, with statistics" },
    { label: "Rise time", a: "Under 3 ns", b: "3.5 ns typical" },
    { label: "Power", a: "5 V adapter (2 A/3 A/4 A)", b: "100–240 VAC, under 30 W" },
    { label: "Size and weight", a: "310 × 145 × 70 mm; 3.46 lb per Amazon", b: "318 × 110 × 150 mm; 1,900 g per Hantek" },
  ],
  differences: [
    "Generator speed: the Hantek's sine goes to 25 MHz and its square to 10 MHz, against 10 MHz and 2 MHz on the FNIRSI. The FNIRSI is faster only on triangle and ramp, 2 MHz against 1 MHz.",
    "Generator level: Hantek lists 10 mV to 7 Vpp into high impedance and a 50 Ω output. FNIRSI lists a single 2.5 Vpp figure and doesn't say into what load.",
    "Triggers and decoding: the 1014D triggers on a rising or falling edge. The DSO2D10 lists 14 trigger types and decodes UART, I2C, SPI, CAN and LIN.",
    "Memory: Hantek states 8 Mpts on one channel and 4 Mpts on two. FNIRSI writes \"240Kbit\" and doesn't convert it to points.",
    "Sampling with both channels on: Hantek says 500 MSa/s per channel. FNIRSI doesn't say.",
    "Power and weight: the 1014D runs from a 5 V adapter and weighs 3.46 lb per its Amazon listing. The DSO2D10 takes mains, draws under 30 W and weighs 1,900 g per Hantek.",
    "Neither has our Hands-on Tested badge; this is desk research from Hantek's and FNIRSI's published specs and their Amazon listings.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">The generators side by side</h2>
        <p className="text-muted leading-7 mb-4">
          The generator is the reason to buy either of these over a plain scope, and it&apos;s where they really
          differ. Hantek&apos;s is a proper arbitrary waveform generator: 200 MSa/s, 12-bit, four user arbitrary slots
          of 4 KSa each, burst and modulation output, and an amplitude you can set from 10 mV to 7 Vpp. FNIRSI&apos;s is
          a DDS source with 14 preset shapes plus custom signals, 1 Hz frequency steps and a fixed 2.5 Vpp output level.
        </p>
        <Figure
          caption={
            <>
              Highest output frequency per waveform, log scale, from FNIRSI&apos;s 1014D spec table and Hantek&apos;s
              DSO2000 spec table. Hantek wins three rows of four; triangle and ramp go to the FNIRSI.
            </>
          }
        >
          <GeneratorRangeDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Read the chart by job. To clock a microcontroller, drive a 4 MHz crystal input or check a filter&apos;s
          corner at 15 MHz, the Hantek is the only one that gets there. To feed a slow triangle into a comparator or
          sweep an audio amp with a ramp, the FNIRSI&apos;s 2 MHz ceiling is plenty, and it beats Hantek&apos;s 1 MHz.
          Most hobby use sits below 1 MHz, where both generators work.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <Figure caption={<>Maximum generator amplitude. Hantek&apos;s 7 Vpp is into high impedance; into 50 Ω it&apos;s 3.5 Vpp.</>}>
            <BarChart
              items={[
                { label: "Hantek DSO2D10", value: 7, display: "7 Vpp", highlight: true },
                { label: "FNIRSI 1014D", value: 2.5, display: "2.5 Vpp" },
              ]}
            />
          </Figure>
          <Figure caption={<>Trigger types each maker lists. FNIRSI&apos;s one type is edge, rising or falling.</>}>
            <BarChart
              items={[
                { label: "Hantek DSO2D10", value: 14, display: "14 types", highlight: true },
                { label: "FNIRSI 1014D", value: 1, display: "Edge only" },
              ]}
            />
          </Figure>
          <Figure caption={<>Built-in automatic measurements. Hantek adds statistics (max, min, standard deviation).</>}>
            <BarChart
              items={[
                { label: "Hantek DSO2D10", value: 32, display: "32", highlight: true },
                { label: "FNIRSI 1014D", value: 12, display: "12" },
              ]}
            />
          </Figure>
          <Figure caption={<>Weight. FNIRSI&apos;s figure is Amazon&apos;s 3.46 lb; Hantek&apos;s is its own 1,900 g.</>}>
            <BarChart
              items={[
                { label: "Hantek DSO2D10", value: 1.9, display: "1.9 kg" },
                { label: "FNIRSI 1014D", value: 1.57, display: "1.57 kg", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <div className="mt-4">
          <KeyIdea title="Why 2.5 Vpp versus 7 Vpp matters">
            A 5 V logic input usually wants close to 5 V to register a clean high. Hantek&apos;s 7 Vpp ceiling (with
            DC offset up to ±3.5 V into high impedance) covers a 0–5 V square with room to spare. FNIRSI&apos;s
            2.5 Vpp won&apos;t reach a 5 V logic threshold on its own and is marginal even for 3.3 V parts. For audio
            and filter work at line level, 2.5 Vpp is plenty.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">FNIRSI 1014D vs Hantek DSO2D10 as scopes</h2>
        <p className="text-muted leading-7 mb-4">
          On the scope side the raw numbers match: 100 MHz, two channels, 1 GSa/s with one channel on, 8-bit, 7-inch
          800 × 480. FNIRSI quotes a rise time under 3 ns, Hantek 3.5 ns typical, which is the textbook 0.35 ÷ 100 MHz.
          The gap opens in what each does with a captured signal.
        </p>
        <p className="text-muted leading-7 mb-4">
          The DSO2D10 triggers on pulse width, runt (&quot;under amp&quot;), slope, window, pattern and timeout
          conditions, and on UART, LIN, CAN, SPI and I2C frames, then decodes those buses on screen. Its 4 Mpts per
          channel with both channels on means a longer capture at full speed. The 1014D has edge triggering, an
          external trigger input rated 0–40 V, FFT, X-Y and roll mode. That covers learning, audio, power supply ripple
          and PWM. It doesn&apos;t cover finding one bad byte in a serial stream.
        </p>
        <p className="text-muted leading-7 mb-4">
          Hantek also states that bandwidth drops to 6 MHz with the probe on 1X. That&apos;s normal for 1X probes and
          a reason to leave them on 10X. FNIRSI doesn&apos;t give a 1X figure for the 1014D. For the memory question in
          more depth, the same FNIRSI is set against Hantek&apos;s 150 MHz sibling on{" "}
          <Link href="/oscilloscopes/hantek-dso2d15-vs-fnirsi-1014d" className={link}>
            Hantek DSO2D15 vs FNIRSI 1014D
          </Link>
          , and the generator-free Hantek on{" "}
          <Link href="/oscilloscopes/hantek-dso2c10-vs-fnirsi-1014d" className={link}>
            Hantek DSO2C10 vs FNIRSI 1014D
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Pick", "Why"]}
          rows={[
            ["Clocking a microcontroller or feeding a 5 V logic input", "Hantek DSO2D10", "Square to 10 MHz and up to 7 Vpp; the FNIRSI stops at 2 MHz and 2.5 Vpp"],
            ["Debugging I2C, SPI, UART or CAN", "Hantek DSO2D10", "Protocol triggers and decoding; the FNIRSI has neither"],
            ["Audio amps, filters and op-amp labs", "FNIRSI 1014D", "Both generators cover audio; the FNIRSI also does triangle and ramp to 2 MHz"],
            ["Powering the scope from a 5 V supply", "FNIRSI 1014D", "FNIRSI specifies a 5 V adapter; the Hantek takes 100–240 VAC directly"],
            ["Measuring up to a few hundred volts on a car or power stage", "FNIRSI 1014D", "The Amazon kit adds a 100X probe; the Hantek kit has two standard probes"],
            ["Long captures with both channels running", "Hantek DSO2D10", "4 Mpts per channel stated; FNIRSI's \"240Kbit\" isn't explained"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The paperwork on each</h2>
        <p className="text-muted leading-7 mb-4">
          Hantek&apos;s spec table answers more questions than FNIRSI&apos;s. FNIRSI leaves three things
          open on the 1014D: what &quot;240Kbit&quot; means in sample points, the sample rate per channel with both
          channels on, and the generator&apos;s output impedance. If any of those matters to your work, that&apos;s a
          point for the Hantek.
        </p>
        <p className="text-muted leading-7 mb-4">
          The DSO2D10&apos;s Amazon listing has its own loose ends. Its item weight reads 6.28 lb, well above
          Hantek&apos;s 1,900 g, which is probably the boxed weight. Its bullet list of kit contents includes a car
          voltage tester, test leads and jumper wires, while the package list lower on the same page lists only the
          scope, a USB cable, two PP-150 probes and two BNC clip leads. Check the current listing before you count on
          the extras. At the time of our check it showed only three left in stock.
        </p>
        <Callout title="Mains and high voltage">
          Hantek rates the DSO2D10&apos;s inputs at 300 V CAT II and a maximum of 300 Vrms with a 10X probe. FNIRSI
          gives the 1014D a 400 V maximum test voltage with a 10X probe but no CAT rating. Both scopes have their
          input grounds tied together, so never clip a probe ground to a live mains conductor. Use a differential
          probe or an isolated measurement setup, and call an electrician for work on building wiring.
        </Callout>
        <p className="text-muted leading-7 mt-4">
          More on the Hantek in our{" "}
          <Link href="/oscilloscopes/hantek-dso2d10-review" className={link}>
            Hantek DSO2D10 review
          </Link>
          . If you&apos;re weighing the FNIRSI against a slimmer, generator-free bench scope, see{" "}
          <Link href="/oscilloscopes/fnirsi-1014d-vs-owon-sds1102" className={link}>
            FNIRSI 1014D vs OWON SDS1102
          </Link>
          ; for its tablet cousin, see{" "}
          <Link href="/oscilloscopes/fnirsi-1013d-plus-vs-fnirsi-1014d" className={link}>
            FNIRSI 1013D Plus vs FNIRSI 1014D
          </Link>
          . The{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>{" "}
          explains each spec from the ground up.
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Buy the Hantek DSO2D10 if the generator has to do real work: 25 MHz sine, 10 MHz square, up to 7 Vpp, plus serial triggers, decoding and 4 Mpts per channel. Buy the FNIRSI 1014D if your signals live in audio and low-MHz territory, you want triangle and ramp to 2 MHz, a 5 V supply and a 100X probe in the box, and you can live with edge triggering.",
  chooseNeitherIf:
    "You need more than two channels, such as clock, data, chip select and an analog line at once. Both have two inputs; a four-channel bench scope like the Rigol DHO804 is the better tool for that.",
  faqs: [
    {
      question: "Is the Hantek DSO2D10's generator better than the FNIRSI 1014D's?",
      answer:
        "For most jobs, yes. Hantek lists sine to 25 MHz, square to 10 MHz, arbitrary waves to 10 MHz and up to 7 Vpp into high impedance. FNIRSI lists sine to 10 MHz, other waves to 2 MHz, custom waves to 1 MHz and 2.5 Vpp. The FNIRSI is ahead only on triangle and ramp, at 2 MHz against 1 MHz.",
    },
    {
      question: "Can the FNIRSI 1014D decode I2C or SPI?",
      answer:
        "Not according to FNIRSI. Its 1014D triggers on rising or falling edges and offers FFT, X-Y and roll mode, but no protocol decoding is listed. You can still see I2C or SPI waveforms and read the bits by eye. The Hantek DSO2D10 triggers on and decodes UART, I2C, SPI, CAN and LIN.",
    },
    {
      question: "Does either scope run on battery?",
      answer:
        "Neither has a battery listed. The FNIRSI 1014D runs from a 5 V adapter rated 2 A, 3 A or 4 A. FNIRSI doesn't say whether a USB power bank can run it. The Hantek DSO2D10 runs from 100 to 240 VAC mains and draws under 30 W.",
    },
    {
      question: "Why is the FNIRSI 1014D's memory given in Kbit?",
      answer:
        "FNIRSI writes the 1014D's memory as \"240Kbit\" and doesn't convert it to sample points or say whether it's per channel. With an 8-bit converter, 240 kilobits would be about 30,000 samples, but that's our arithmetic, not FNIRSI's claim. Hantek states 8 Mpts on one channel and 4 Mpts with both on.",
    },
    {
      question: "Which is easier for a beginner?",
      answer:
        "The FNIRSI 1014D has fewer menus to learn: one trigger type, 12 automatic measurements and a one-button AUTO. The Hantek DSO2D10 has 14 trigger types, 32 measurements and serial decoding, which is more to learn but leaves more room to grow. If you already know you'll work on microcontroller buses, start with the Hantek.",
    },
    {
      question: "Which one is heavier and larger?",
      answer:
        "The Hantek. Hantek lists 318 × 110 × 150 mm and 1,900 g; FNIRSI lists 310 × 145 × 70 mm for the 1014D, and its Amazon listing gives 3.46 lb, about 1.57 kg. The FNIRSI is shallower on the bench, at 70 mm against 110 mm.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Hantek DSO2D10 review", href: "/oscilloscopes/hantek-dso2d10-review" },
    { label: "Hantek DSO2D15 vs FNIRSI 1014D", href: "/oscilloscopes/hantek-dso2d15-vs-fnirsi-1014d" },
    { label: "Hantek DSO2C10 vs FNIRSI 1014D", href: "/oscilloscopes/hantek-dso2c10-vs-fnirsi-1014d" },
    { label: "Hantek DSO2C10 vs Hantek DSO2D10", href: "/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d10" },
    { label: "FNIRSI 1014D vs OWON SDS1102", href: "/oscilloscopes/fnirsi-1014d-vs-owon-sds1102" },
    { label: "FNIRSI 1013D Plus vs FNIRSI 1014D", href: "/oscilloscopes/fnirsi-1013d-plus-vs-fnirsi-1014d" },
    { label: "FNIRSI DPOS350P vs FNIRSI 1014D", href: "/oscilloscopes/fnirsi-dpos350p-vs-fnirsi-1014d" },
    { label: "Rigol DHO804 vs FNIRSI 1014D", href: "/oscilloscopes/rigol-dho804-vs-fnirsi-1014d" },
    { label: "Rigol DHO804 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho804-vs-hantek-dso2d10" },
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
  ],
};

export default function Fnirsi1014dVsHantekDso2d10Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
