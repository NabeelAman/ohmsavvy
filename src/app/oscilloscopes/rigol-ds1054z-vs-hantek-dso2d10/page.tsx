// Rigol DS1054Z extras per the DS1000Z datasheet DSA20100-2020-09
// (https://www.rigol.com/dam/global/downloads/brochures/en/data-sheet/oscilloscopes/DS1000Z_DataSheet_EN.pdf):
// 8-bit (12-bit high-res mode), 7-inch 800x480, up to 30,000 wfm/s, 1 GSa/s (1 ch) / 500 MSa/s (2 ch) / 250 MSa/s (3-4 ch),
// decode Parallel, RS232/UART, I2C, SPI, USB host/device + LAN, 100-240 V AC 50 W max, no generator (-S models only).
// Conflict: https://www.rigol.com/intl/products/oscilloscope/DS1000Z.html says 12M standard / 24M optional memory and
// lists bus triggering/decoding as options; the datasheet lists 24 Mpts and decoding with no option label (checked 2026-10-24).
// Hantek DSO2D10 extras per http://www.hantek.com/products/detail/17182 (checked 2026-10-24): 1 GSa/s (1 ch) / 500 MSa/s (2 ch),
// 8 Mpts (1 ch) / 4 Mpts (2 ch), 8-bit with 12-bit high-resolution mode, UART/RS232, I2C, SPI, CAN and LIN trigger and decode,
// 7-inch 800 x 480, under 30 W; generator 1 channel, 25 MHz, 200 MSa/s, 12-bit, sine/square/ramp/Exp/noise/DC, Arb1-Arb4,
// 4 KSa length, 10 mV-7 Vpp high impedance, 5 mV-3.5 Vpp into 50 ohm, 50 ohm output impedance. Waveform update rate not stated.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10";

export const metadata = buildMetadata({
  title: "Rigol DS1054Z vs Hantek DSO2D10",
  description:
    "Rigol DS1054Z vs Hantek DSO2D10: four channels at 50MHz against two at 100MHz with a built-in waveform generator. Specs, charts and which one suits your bench.",
  path: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10",
});

const link = "text-accent hover:underline";

/**
 * An SPI transfer has four lines. With four channels every line is on screen at once;
 * with two you see the clock and one data line and must re-capture to see the rest.
 */
function SpiChannelsDiagram() {
  const lines = [
    { name: "CS", y: 34, d: "M70 24 H96 V44 H286 V24 H320", two: false },
    { name: "SCK", y: 74, d: "M70 84 H110 V64 H124 V84 H138 V64 H152 V84 H166 V64 H180 V84 H194 V64 H208 V84 H222 V64 H236 V84 H250 V64 H264 V84 H320", two: true },
    { name: "MOSI", y: 114, d: "M70 124 H104 V104 H132 V124 H160 V104 H216 V124 H244 V104 H272 V124 H320", two: true },
    { name: "MISO", y: 154, d: "M70 164 H118 V144 H146 V164 H202 V144 H230 V164 H258 V144 H286 V164 H320", two: false },
  ];
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram of an SPI transfer with four signals, chip select, clock, MOSI and MISO. A four-channel Rigol DS1054Z shows all four together; a two-channel Hantek DSO2D10 shows only the clock and one data line per capture."
    >
      {lines.map((l) => (
        <g key={l.name}>
          <text x="8" y={l.y + 4} fontSize="10.5" fontWeight="600" className="fill-foreground">
            {l.name}
          </text>
          <path d={l.d} className={`fill-none ${l.two ? "stroke-accent" : "stroke-muted"}`} strokeWidth="2" />
        </g>
      ))}
      <rect x="64" y="56" width="262" height="76" rx="6" className="fill-none stroke-accent" strokeWidth="1.2" strokeDasharray="5 3" />
      <text x="196" y="190" fontSize="9.5" textAnchor="middle" className="fill-muted">
        Dashed box: what two channels capture at once. All four rows: what four channels capture.
      </text>
    </svg>
  );
}

/** One instrument versus two: where the stimulus comes from in a filter or amplifier test. */
function StimulusDiagram() {
  return (
    <svg
      viewBox="0 0 340 190"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram comparing test setups. Top: the Hantek DSO2D10's built-in generator output feeds the circuit under test, and channels 1 and 2 measure input and output. Bottom: the Rigol DS1054Z needs a separate function generator to feed the circuit, while its channels measure the result."
    >
      <text x="8" y="16" fontSize="10" fontWeight="700" className="fill-accent">Hantek DSO2D10: one box</text>
      <rect x="8" y="24" width="110" height="56" rx="8" className="fill-surface stroke-accent" strokeWidth="1.5" />
      <text x="63" y="46" fontSize="9.5" textAnchor="middle" className="fill-foreground">Scope + generator</text>
      <text x="63" y="62" fontSize="8.5" textAnchor="middle" className="fill-muted">GEN OUT, CH1, CH2</text>
      <rect x="210" y="30" width="110" height="44" rx="6" className="fill-surface stroke-border" strokeWidth="1.2" />
      <text x="265" y="56" fontSize="9.5" textAnchor="middle" className="fill-foreground">Circuit under test</text>
      <path d="M118 40 H210" className="stroke-accent" strokeWidth="1.8" />
      <text x="164" y="35" fontSize="8.5" textAnchor="middle" className="fill-accent">stimulus</text>
      <path d="M210 64 H118" className="stroke-foreground" strokeWidth="1.4" strokeDasharray="4 3" />
      <text x="164" y="76" fontSize="8.5" textAnchor="middle" className="fill-muted">CH1 in, CH2 out</text>

      <text x="8" y="112" fontSize="10" fontWeight="700" className="fill-muted">Rigol DS1054Z: scope plus a second box</text>
      <rect x="8" y="120" width="96" height="56" rx="8" className="fill-surface stroke-border" strokeWidth="1.5" />
      <text x="56" y="146" fontSize="9.5" textAnchor="middle" className="fill-foreground">Function</text>
      <text x="56" y="160" fontSize="9.5" textAnchor="middle" className="fill-foreground">generator</text>
      <rect x="128" y="126" width="88" height="44" rx="6" className="fill-surface stroke-border" strokeWidth="1.2" />
      <text x="172" y="152" fontSize="9.5" textAnchor="middle" className="fill-foreground">Circuit</text>
      <rect x="240" y="120" width="92" height="56" rx="8" className="fill-surface stroke-border" strokeWidth="1.5" />
      <text x="286" y="146" fontSize="9.5" textAnchor="middle" className="fill-foreground">DS1054Z</text>
      <text x="286" y="160" fontSize="8.5" textAnchor="middle" className="fill-muted">CH1 to CH4</text>
      <path d="M104 148 H128" className="stroke-foreground" strokeWidth="1.8" />
      <path d="M216 148 H240" className="stroke-foreground" strokeWidth="1.4" strokeDasharray="4 3" />
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Rigol DS1054Z vs Hantek DSO2D10",
  path,
  published: "2026-10-26",
  intro:
    "The Rigol DS1054Z vs Hantek DSO2D10 choice is four channels against a built-in signal source. Both are 1 GSa/s benchtop scopes with 7-inch 800 × 480 screens. The Rigol gives you four channels at 50MHz; the Hantek has two channels at 100MHz plus a one-channel 25 MHz waveform generator in the same case. Pick the Rigol if you watch several signals at once, the Hantek if you feed test signals into circuits.",
  a: {
    pick: picks.find((p) => p.name === "Rigol DS1054Z")!,
    reviewHref: "/oscilloscopes/rigol-ds1054z-review",
    imageAlt: "Rigol DS1054Z four-channel 50MHz digital oscilloscope, front view",
    chooseIf: [
      "You need to watch three or four signals at once, such as all four lines of an SPI bus",
      "You're a beginner who wants four channels and plenty of community tutorials",
      "You already own a signal source, or your circuits make their own signals",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Hantek DSO2D10")!,
    reviewHref: "/oscilloscopes/hantek-dso2d10-review",
    imageAlt: "Hantek DSO2D10 two-channel oscilloscope with built-in waveform generator, front view",
    chooseIf: [
      "You test filters, amplifiers or sensor inputs and need a known signal to feed in",
      "You want bandwidth headroom above 50MHz and two channels are enough",
      "You want CAN and LIN decoding listed as standard alongside UART, I2C and SPI",
    ],
  },
  extraSpecs: [
    { label: "Sample rate, all channels on", a: "250 MSa/s per channel (3–4 ch)", b: "500 MSa/s per channel (2 ch)" },
    { label: "Sample rate, 2 channels on", a: "500 MSa/s", b: "500 MSa/s" },
    { label: "Memory depth", a: "Rigol conflicts: 12 Mpts standard / 24 Mpts optional (product page); 24 Mpts (datasheet)", b: "8 Mpts (1 ch); 4 Mpts (2 ch)" },
    { label: "Vertical resolution", a: "8-bit; 12-bit high-resolution mode", b: "8-bit; 12-bit high-resolution mode" },
    { label: "Waveform update rate", a: "Up to 30,000 wfms/s", b: "Not stated by Hantek" },
    { label: "Serial decode", a: "Parallel, RS232/UART, I2C, SPI (option per product page)", b: "UART/RS232, I2C, SPI, CAN, LIN" },
    { label: "Built-in generator", a: "None (generator is on the -S models)", b: "1 channel, 25 MHz, 200 MSa/s, 12-bit" },
    { label: "Generator amplitude", a: "Not applicable", b: "10 mV–7 Vpp (high impedance); 5 mV–3.5 Vpp (50 Ω)" },
    { label: "Display", a: "7-inch, 800 × 480", b: "7-inch, 800 × 480" },
    { label: "Power", a: "100–240 V AC, 50 W max", b: "Mains, under 30 W" },
    { label: "Interfaces", a: "USB host and device, LAN", b: "Not compared in our sources" },
  ],
  differences: [
    "Channels: four on the Rigol against two on the Hantek, so the Rigol can show a whole SPI transfer or a three-phase set in one capture.",
    "Bandwidth: 50MHz on the Rigol against 100MHz on the Hantek, both with a 1 GSa/s single-channel maximum.",
    "Only the Hantek has a waveform generator: one channel to 25 MHz with sine, square, ramp, exponential, noise, DC and four arbitrary slots.",
    "With every channel on, the Hantek keeps 500 MSa/s per channel; the Rigol drops to 250 MSa/s per channel with three or four on.",
    "Hantek lists CAN and LIN decoding as standard; Rigol's DS1000Z decoding covers parallel, UART, I2C and SPI, and its product page calls bus decoding an option.",
    "Our ratings are editorial, not user scores: the DS1054Z carries 4.8 and our Hands-on Tested badge; the DSO2D10 carries 4.3 from desk research against Hantek's specs.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">DS1054Z vs DSO2D10 spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          The headline 1 GSa/s figure is the same on both, but it only holds with one channel on. Both scopes split one
          sampling budget across the channels you enable, so the number that matters is the per-channel rate in the
          configuration you actually use. Bandwidth and channel count pull in opposite directions here.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Rated analog bandwidth, per Rigol and Hantek. Higher passes faster edges.</>}>
            <BarChart
              items={[
                { label: "Rigol DS1054Z", value: 50, display: "50 MHz" },
                { label: "Hantek DSO2D10", value: 100, display: "100 MHz", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Per-channel sample rate with every channel on, per each maker&apos;s published specs.</>}>
            <BarChart
              items={[
                { label: "Rigol, 4 channels on", value: 250, display: "250 MSa/s" },
                { label: "Rigol, 2 channels on", value: 500, display: "500 MSa/s" },
                { label: "Hantek, 2 channels on", value: 500, display: "500 MSa/s", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <div className="mt-4">
          <Figure caption={<>Signals each scope can show at the same moment. The Hantek&apos;s generator is an output, not an input.</>}>
            <BarChart
              items={[
                { label: "Rigol DS1054Z inputs", value: 4, display: "4 channels", highlight: true },
                { label: "Hantek DSO2D10 inputs", value: 2, display: "2 channels" },
                { label: "Hantek generator output", value: 1, display: "1 channel" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The usual rule of thumb is to choose bandwidth three to five times the highest frequency you want to see
          clearly. On that basis the Rigol is comfortable to roughly 10 to 17 MHz and the Hantek to roughly 20 to 33 MHz.
          A common approximation for rise time is 0.35 divided by bandwidth, which gives about 7 ns for the Rigol and
          about 3.5 ns for the Hantek. Those are textbook estimates, not measurements, but they show where the extra
          100MHz helps: sharp logic edges and fast clocks. For background, read{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            what oscilloscope bandwidth means
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>
          .
        </p>
        <p className="text-muted leading-7 mt-4">
          Samples per cycle tell the same story with arithmetic. A 10 MHz clock on the Rigol with four channels on gets
          250 ÷ 10 = 25 samples per cycle; on the Hantek with both channels on it gets 500 ÷ 10 = 50. Both are far above
          the Nyquist minimum of two, so either scope draws a usable 10 MHz waveform. The gap only shows on faster signals
          or when you zoom into a single edge.
        </p>
        <div className="mt-4">
          <KeyIdea title="Where the makers' documents leave gaps">
            Rigol&apos;s DS1000Z datasheet lists 24 Mpts of memory and serial decoding without an option label, while its
            product page says 12 Mpts standard with 24 Mpts optional and lists bus decoding as an option. Hantek doesn&apos;t
            publish a waveform update rate for the DSO2D10, so we can&apos;t compare how quickly each scope redraws. We
            list both conflicts rather than pick the friendlier figure.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When four channels beat a built-in generator</h2>
        <p className="text-muted leading-7 mb-4">
          Many beginner projects end up on a serial bus. SPI uses four lines: chip select, clock, data out and data in.
          With the DS1054Z you can put all four on screen and trigger on chip select, so one capture shows the whole
          transaction. With the DSO2D10 you watch the clock and one data line, then move a probe and capture again. That
          works when the fault repeats, and it is a real nuisance when it doesn&apos;t.
        </p>
        <Figure caption={<>An SPI transfer has four signals. Two channels show the clock and one data line per capture.</>}>
          <SpiChannelsDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The same applies to a motor driver with three phase outputs, a power supply where you want input, output and
          enable together, or a microcontroller timing problem across several pins. If that sounds like your bench, four
          channels matter more than the generator. Our{" "}
          <Link href="/oscilloscopes/best-oscilloscope-for-arduino-projects" className={link}>
            best oscilloscope for Arduino projects
          </Link>{" "}
          guide ranks scopes for exactly this kind of work.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When the built-in generator wins</h2>
        <p className="text-muted leading-7 mb-4">
          Some work starts with a test signal rather than a running circuit. To check a low-pass filter, an audio
          amplifier or a sensor input, you inject a known sine or square wave and compare input with output. The
          DSO2D10 does that from one box: its generator reaches 25 MHz at 200 MSa/s with 12-bit resolution, and puts out
          10 mV to 7 Vpp into a high-impedance load. Channel 1 watches the input and channel 2 the output, which is
          exactly the two-channel job.
        </p>
        <Figure caption={<>The Hantek feeds and measures from one instrument; the Rigol needs a separate source.</>}>
          <StimulusDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The DS1054Z has no generator; Rigol puts one only on its -S models. You can still do stimulus-response work with
          it, but you need a function generator or a microcontroller that outputs the test signal. Our guide to{" "}
          <Link href="/oscilloscopes/how-to-use-oscilloscope-bandwidth-measurement-for-an-amplifier" className={link}>
            measuring an amplifier&apos;s bandwidth with an oscilloscope
          </Link>{" "}
          shows the method. Hantek also sells the same scope without the generator as the DSO2C10, compared in{" "}
          <Link href="/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d10" className={link}>
            Hantek DSO2C10 vs DSO2D10
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Rigol DS1054Z vs Hantek DSO2D10: which should you buy?</h2>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["Student learning on Arduino and SPI or I2C buses", "Rigol DS1054Z", "Four channels show a whole bus transfer in one capture"],
            ["Audio or filter hobbyist", "Hantek DSO2D10", "Built-in generator supplies the test tone; two channels compare in and out"],
            ["CAN or LIN automotive tinkerer", "Hantek DSO2D10", "Hantek lists CAN and LIN decoding; Rigol's DS1000Z list stops at SPI"],
            ["Motor driver or three-phase work", "Rigol DS1054Z", "Three phases plus a reference need more than two inputs"],
            ["Fast logic edges, clocks above 20 MHz", "Hantek DSO2D10", "100MHz passes faster edges than 50MHz"],
            ["Small desk, one instrument only", "Hantek DSO2D10", "Scope and signal source share one case"],
            ["Wants the most tutorials and forum help", "Rigol DS1054Z", "Years as a default beginner scope"],
            ["Already owns a function generator", "Rigol DS1054Z", "The Hantek's main extra is one you already have"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If you want four channels and 100MHz together, see{" "}
          <Link href="/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" className={link}>
            Hantek DSO2D10 vs Siglent SDS1104X-E
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" className={link}>
            Rigol DS1054Z vs Siglent SDS1104X-E
          </Link>
          . For a 12-bit option, read{" "}
          <Link href="/oscilloscopes/rigol-dho804-vs-hantek-dso2d10" className={link}>
            Rigol DHO804 vs Hantek DSO2D10
          </Link>
          .
        </p>
      </section>

      <Callout title="Safety: neither is a mains probe">
        Both are ground-referenced bench scopes: each probe&apos;s ground clip connects to mains earth through the power
        cord. Clipping it onto a live or non-isolated circuit, such as the primary side of a switching supply, creates a
        short through the scope. Use an isolation transformer on the circuit or a differential probe, and never float the
        scope by defeating its earth.
      </Callout>
    </>
  ),
  bottomLine:
    "Buy the Rigol DS1054Z if you watch more than two signals at a time or want the scope most beginner tutorials assume; its four channels and our hands-on testing make it the safer general pick. Buy the Hantek DSO2D10 if your work starts with a test signal, such as filters, amplifiers and sensor inputs, or if you want 100MHz and CAN or LIN decoding and two channels are enough. Decide by which you'd run out of first: channels or a signal source.",
  faqs: [
    {
      question: "Is 50MHz enough for a beginner?",
      answer:
        "Usually. By the three-to-five-times rule of thumb, 50MHz is comfortable on signals up to roughly 10 to 17MHz, which covers most microcontroller, audio and power-supply projects. The Hantek's 100MHz adds headroom for fast logic edges and clocks above 20MHz, where the Rigol starts to round off the corners of square waves.",
    },
    {
      question: "Can the Rigol DS1054Z generate signals?",
      answer:
        "No. Rigol puts the built-in generator on its -S models, and the DS1054Z has none. For stimulus-response tests you need a separate function generator or a microcontroller that outputs the test signal. The Hantek DSO2D10 has a one-channel generator to 25 MHz built in, which is its main advantage in this comparison.",
    },
    {
      question: "Does the Hantek DSO2D10 decode serial buses?",
      answer:
        "Yes. Hantek lists UART/RS232, I2C, SPI, CAN and LIN triggering and decoding on the DSO2D10. Rigol's DS1000Z datasheet lists parallel, RS232/UART, I2C and SPI decoding, and Rigol's product page describes bus decoding as an option, so check what your DS1054Z includes before relying on it.",
    },
    {
      question: "Which has more memory, the DS1054Z or the DSO2D10?",
      answer:
        "The Rigol, on Rigol's figures. Its datasheet lists 24 Mpts, though its product page says 12 Mpts standard with 24 Mpts optional. Hantek lists 8 Mpts with one channel and 4 Mpts with two. Deeper memory keeps the sample rate high on longer captures, useful for catching an event several milliseconds after the trigger.",
    },
    {
      question: "Can I use a two-channel scope for SPI debugging?",
      answer:
        "Yes, with patience. Put the clock on one channel and a data line on the other, trigger on the clock, and move the second probe between lines across repeated captures. It works when the transfer repeats identically. For a one-off glitch, or to see chip select against data, a four-channel scope like the DS1054Z is far easier.",
    },
  ],
  roundup: {
    label: "See all beginner oscilloscope picks",
    href: "/oscilloscopes/best-beginner-oscilloscopes",
  },
  related: [
    { label: "Rigol DS1054Z review", href: "/oscilloscopes/rigol-ds1054z-review" },
    { label: "Hantek DSO2D10 review", href: "/oscilloscopes/hantek-dso2d10-review" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Hantek DSO2C10 vs DSO2D10", href: "/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d10" },
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
  ],
};

export default function RigolDs1054zVsHantekDso2d10Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
