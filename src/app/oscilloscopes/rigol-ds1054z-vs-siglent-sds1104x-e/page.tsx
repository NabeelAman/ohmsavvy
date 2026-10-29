// Specs per maker sources, checked 2026-10-26:
// - Rigol DS1054Z: Pick note (rigolna.com and the DS1000Z datasheet: 50 MHz, 4 channels, 1 GSa/s single channel,
//   250 MSa/s with 3-4 channels on, 7-inch display) and https://www.rigolna.com/products/digital-oscilloscopes/1000z/
//   (12 Mpts standard, 24 Mpts optional; RS232/UART, I2C and SPI trigger and decode as options; no bandwidth option listed).
// - Siglent SDS1104X-E: Pick note (100 MHz, 4 channels, 1 GSa/s, 500 MSa/s per channel with all on) and
//   https://siglentna.com/digital-oscilloscopes/sds1000x-e-series-super-phosphor-oscilloscopes/ (7 Mpts/ch, 14 Mpts
//   interleaved; 100,000 wfm/s, 400,000 wfm/s in sequence mode; 7-inch 800 × 480; free I2C, SPI, UART, RS232, CAN, LIN
//   decoding; 80,000-frame history; LAN and web control; 1 Mpt FFT; optional 16-channel MSO).
// - SDS1104X-E 8-bit resolution per Siglent's SDS1000X-E data sheet, https://siglentna.com/download/22005/ (as cited on
//   /oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e).
// Rise-time figures use the standard 0.35 / bandwidth approximation and are labeled as estimates.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e";

export const metadata = buildMetadata({
  title: "Rigol DS1054Z vs Siglent SDS1104X-E",
  description:
    "Rigol DS1054Z vs Siglent SDS1104X-E: 50 vs 100 MHz, 250 vs 500 MSa/s with four channels on, optional vs free serial decoding. Charts and who should buy which.",
  path: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e",
});

const link = "text-accent hover:underline";

/** Edge of a 20 MHz clock as drawn by a 50 MHz and a 100 MHz front end (single-pole estimate). */
function EdgeDiagram() {
  const x0 = 30;
  const pxPerNs = 5.6;
  const yHi = 40;
  const yLo = 140;
  const curve = (riseNs: number) => {
    const tau = riseNs / 2.2;
    const pts: string[] = [];
    for (let t = 0; t <= 50; t += 0.5) {
      // Rising edge at t = 0, falling edge at t = 25 ns.
      const v = t < 25 ? 1 - Math.exp(-t / tau) : (1 - Math.exp(-25 / tau)) * Math.exp(-(t - 25) / tau);
      pts.push(`${(x0 + t * pxPerNs).toFixed(1)},${(yLo - v * (yLo - yHi)).toFixed(1)}`);
    }
    return pts.join(" ");
  };
  const xe = (t: number) => x0 + t * pxPerNs;
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram: one cycle of a 20 MHz square clock. The ideal edge is vertical; a 100 MHz front end rounds it to roughly 3.5 ns, a 50 MHz front end to roughly 7 ns, so the 50 MHz trace spends a larger share of each half cycle still rising"
    >
      <polyline
        points={`${xe(0)},${yLo} ${xe(0)},${yHi} ${xe(25)},${yHi} ${xe(25)},${yLo} ${xe(50)},${yLo}`}
        className="fill-none stroke-border"
        strokeWidth="2"
        strokeDasharray="4 3"
      />
      <polyline points={curve(7)} className="fill-none stroke-muted" strokeWidth="2.2" />
      <polyline points={curve(3.5)} className="fill-none stroke-accent" strokeWidth="2.2" />
      <line x1={x0} y1="160" x2={xe(50)} y2="160" className="stroke-foreground" strokeWidth="1" />
      {[0, 25, 50].map((t) => (
        <g key={t}>
          <line x1={xe(t)} y1="157" x2={xe(t)} y2="163" className="stroke-foreground" strokeWidth="1" />
          <text x={xe(t)} y="175" fontSize="9" textAnchor="middle" className="fill-muted">
            {t} ns
          </text>
        </g>
      ))}
      <text x={xe(27)} y="58" fontSize="9" className="fill-accent">100 MHz: ≈3.5 ns edge</text>
      <text x={xe(27)} y="72" fontSize="9" className="fill-muted">50 MHz: ≈7 ns edge</text>
      <text x={xe(27)} y="86" fontSize="9" className="fill-muted">dashed: ideal clock</text>
      <text x="170" y="194" fontSize="8.5" textAnchor="middle" className="fill-muted">
        One 50 ns cycle of a 20 MHz clock; estimate, rise ≈ 0.35 ÷ bandwidth
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Rigol DS1054Z vs Siglent SDS1104X-E",
  path,
  published: "2026-10-26",
  intro:
    "Buy the Rigol DS1054Z if your signals stay below about 10 MHz and you want the cheapest proven four-channel bench scope; buy the Siglent SDS1104X-E if you work with faster clocks, SPI or CAN buses, or want serial decoding without paying for options. Both have four channels, 1 GSa/s and a 7-inch screen. The Siglent doubles the bandwidth to 100 MHz, keeps 500 MSa/s per channel with all four on against the Rigol's 250 MSa/s, and includes I2C, SPI, UART, CAN and LIN decoding as standard.",
  a: {
    pick: picks.find((p) => p.name === "Rigol DS1054Z")!,
    reviewHref: "/oscilloscopes/rigol-ds1054z-review",
    imageAlt: "Rigol DS1054Z four-channel digital oscilloscope, front panel",
    chooseIf: [
      "Your work is audio, Arduino-speed logic, PWM and power-supply ripple, well inside 50 MHz",
      "You want the lowest-cost four-channel bench scope with a huge library of tutorials",
      "You need 12 Mpts of standard memory and can live with paid decode options",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Siglent SDS1104X-E")!,
    reviewHref: "/oscilloscopes/siglent-sds1104x-e-review",
    imageAlt: "Siglent SDS1104X-E four-channel digital oscilloscope, front panel",
    chooseIf: [
      "You probe fast clocks, SPI or fast-edge switching, where 100 MHz and 500 MSa/s per channel help",
      "You want I2C, SPI, UART, CAN and LIN decoding included rather than bought as options",
      "You value a 100,000 wfm/s capture rate, history mode and LAN web control",
    ],
  },
  extraSpecs: [
    { label: "Sample rate, 3-4 channels on", a: "250 MSa/s per channel", b: "500 MSa/s per channel" },
    { label: "Memory depth", a: "12 Mpts standard; 24 Mpts optional", b: "7 Mpts/ch; 14 Mpts interleaved" },
    { label: "Waveform capture rate", a: "Not listed on Rigol's 1000Z page", b: "100,000 wfm/s; 400,000 in sequence mode" },
    { label: "Display", a: "7-inch", b: "7-inch 800 × 480" },
    { label: "Serial decoding", a: "Optional: RS232/UART, I2C, SPI", b: "Standard: I2C, SPI, UART/RS232, CAN, LIN" },
    { label: "History / segmented memory", a: "Not listed on Rigol's 1000Z page", b: "Up to 80,000 frames" },
    { label: "Remote control", a: "USB cable included; LAN not listed on the page", b: "USB device, LAN, browser web control" },
    { label: "Logic channels", a: "None (MSO1000Z is a separate model)", b: "Optional 16-channel MSO add-on" },
    { label: "Bandwidth upgrade", a: "None listed by Rigol", b: "None listed by Siglent" },
  ],
  differences: [
    "Bandwidth: 100 MHz on the Siglent against 50 MHz on the Rigol, which roughly halves the estimated rise time the scope adds to fast edges.",
    "Sample rate with three or four channels on: 500 MSa/s per channel on the Siglent, 250 MSa/s on the Rigol. With one channel both reach 1 GSa/s.",
    "Serial decoding: included on the Siglent for I2C, SPI, UART/RS232, CAN and LIN. On the Rigol, UART, I2C and SPI trigger and decode are paid options.",
    "Memory: the Rigol lists 12 Mpts standard (24 Mpts optional); the Siglent lists 7 Mpts per channel, or 14 Mpts interleaved.",
    "Capture tools: Siglent quotes 100,000 wfm/s, a 400,000 wfm/s sequence mode and an 80,000-frame history, useful for catching rare glitches.",
    "Both are four-channel, 1 GSa/s, 7-inch benchtop scopes, and both are owner-tested at OhmSavvy.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">At a glance</h2>
        <InfoCards
          items={[
            { label: "Same shape", desc: "Four channels, 1 GSa/s peak, 7-inch screen, mains-powered benchtop." },
            { label: "Siglent: speed", desc: "100 MHz bandwidth and 500 MSa/s per channel with all four on." },
            { label: "Siglent: decoding", desc: "I2C, SPI, UART, CAN and LIN decoding included." },
            { label: "Rigol: memory", desc: "12 Mpts standard, with a 24 Mpts option." },
            { label: "Rigol: ecosystem", desc: "A large user community and plenty of third-party documentation." },
            { label: "Verdict", desc: "Below 10 MHz on a budget: Rigol. Faster buses and decoding: Siglent." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The owner has bought and used both scopes, so both carry the Hands-on Tested badge, but the specs below come
          from Rigol&apos;s and Siglent&apos;s own pages. Single-scope detail is in the{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-review" className={link}>
            Rigol DS1054Z review
          </Link>{" "}
          and the{" "}
          <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={link}>
            Siglent SDS1104X-E review
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">DS1054Z vs SDS1104X-E spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          The headline &quot;1 GSa/s&quot; is the same on both boxes, but it only applies with one channel running.
          Four-channel scopes earn their keep with all four probes connected, and that is where the two split.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Rated analog bandwidth. The Siglent has twice the headroom.</>}>
            <BarChart
              items={[
                { label: "Rigol DS1054Z", value: 50, display: "50 MHz" },
                { label: "Siglent SDS1104X-E", value: 100, display: "100 MHz", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Sample rate per channel with three or four channels on.</>}>
            <BarChart
              items={[
                { label: "Rigol DS1054Z", value: 250, display: "250 MSa/s" },
                { label: "Siglent SDS1104X-E", value: 500, display: "500 MSa/s", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Estimated scope rise time, 0.35 ÷ bandwidth. Lower is better.</>}>
            <BarChart
              items={[
                { label: "Rigol DS1054Z", value: 7, display: "≈7 ns" },
                { label: "Siglent SDS1104X-E", value: 3.5, display: "≈3.5 ns", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Samples per cycle of a 20 MHz clock with four channels on (sample rate ÷ 20 MHz).</>}>
            <BarChart
              items={[
                { label: "Rigol DS1054Z", value: 12.5, display: "12.5" },
                { label: "Siglent SDS1104X-E", value: 25, display: "25", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          A common rule of thumb is to pick a scope with three to five times the bandwidth of the fastest fundamental
          you need to see with recognizable edges. By that rule the DS1054Z is comfortable to roughly 10 to 15 MHz,
          and the SDS1104X-E to roughly 20 to 30 MHz. An Arduino Uno&apos;s 16 MHz clock sits right at the Rigol&apos;s
          edge; its PWM, UART and I2C traffic, all well below 1 MHz, are easy for either.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What 50 MHz vs 100 MHz does to an edge</h2>
        <p className="text-muted leading-7 mb-4">
          A scope&apos;s front end behaves like a low-pass filter. Every edge you feed it comes out slower, by roughly
          0.35 divided by the bandwidth. On a 20 MHz clock, each half cycle lasts 25 ns, so a 7 ns rounded edge eats a
          noticeable share of it, while 3.5 ns keeps the trace looking square. That matters when you measure rise time,
          overshoot or setup-and-hold margins on fast logic; it does not matter for audio or a 1 kHz PWM signal.
        </p>
        <Figure caption={<>How each front end would draw the same 20 MHz clock. Illustrative estimate, not a capture.</>}>
          <EdgeDiagram />
        </Figure>
        <div className="mt-4">
          <KeyIdea title="Measured rise time includes the scope">
            If a signal&apos;s true edge is close to the scope&apos;s own rise time, the reading is inflated. A common
            correction is root-sum-of-squares: a real 5 ns edge measured through a 7 ns scope shows about √(5² + 7²) ≈
            8.6 ns, and through a 3.5 ns scope about 6.1 ns. For edge measurements, the faster front end is closer to
            the truth. Our guide to{" "}
            <Link href="/oscilloscopes/how-to-measure-rise-time-with-oscilloscope-cursors" className={link}>
              measuring rise time with cursors
            </Link>{" "}
            walks through the method.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Serial decoding: included or extra</h2>
        <p className="text-muted leading-7 mb-4">
          Decoding turns a burst of ones and zeros into readable bytes and addresses on screen. Siglent lists I2C,
          SPI, UART/RS232, CAN and LIN decoding as free on the SDS1000X-E series. Rigol lists RS232/UART, I2C and SPI
          trigger and decode for the 1000Z as options, and no CAN or LIN. If you debug sensor buses, automotive CAN or
          a misbehaving UART link, the Siglent arrives ready; on the Rigol, factor the decode option into the cost.
        </p>
        <DataTable
          head={["Protocol", "Rigol DS1054Z", "Siglent SDS1104X-E"]}
          rows={[
            ["UART / RS232", "Option", "Included"],
            ["I2C", "Option", "Included"],
            ["SPI", "Option", "Included"],
            ["CAN", "Not listed", "Included"],
            ["LIN", "Not listed", "Included"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For a worked example, see{" "}
          <Link href="/oscilloscopes/how-to-use-an-oscilloscope-to-diagnose-a-uart-communication-problem" className={link}>
            diagnosing a UART problem with an oscilloscope
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">DS1054Z vs SDS1104X-E: which should you buy?</h2>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["Student following a course", "Rigol DS1054Z", "Large community and documentation base; 50 MHz covers typical lab signals"],
            ["Arduino or Raspberry Pi hobbyist", "Either", "PWM, UART and I2C are far below 50 MHz; Siglent if you want free decoding"],
            ["Audio and amplifier work", "Rigol DS1054Z", "Audio is under 100 kHz; extra bandwidth adds nothing"],
            ["SPI, fast clocks, FPGA I/O", "Siglent SDS1104X-E", "100 MHz and 500 MSa/s per channel keep edges honest"],
            ["Automotive CAN or LIN", "Siglent SDS1104X-E", "CAN and LIN decoding included; Rigol lists neither"],
            ["Switching power supplies", "Siglent SDS1104X-E", "Faster front end shows switch-node ringing more faithfully"],
            ["Tightest budget", "Rigol DS1054Z", "Usually the cheaper of the two; check both listings on the day"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Also weighing a newer platform? Compare{" "}
          <Link href="/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" className={link}>
            Rigol DHO804 vs DS1054Z
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e" className={link}>
            Rigol DHO804 vs SDS1104X-E
          </Link>
          , or read{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            what oscilloscope bandwidth means
          </Link>
          .
        </p>
      </section>

      <Callout title="Safety: neither scope is for direct mains probing">
        Both are mains-powered bench scopes whose probe ground clips connect to protective earth. Clipping a ground lead
        to a non-ground point on a mains-referenced circuit, such as the primary side of an offline power supply, creates
        a short through the probe and can destroy the probe, the scope or the circuit. Use an isolation transformer on
        the device under test or a differential probe, and never defeat the scope&apos;s earth ground.
      </Callout>
    </>
  ),
  bottomLine:
    "Four channels and a 1 GSa/s peak are common ground. The Rigol DS1054Z remains the practical first scope for students and hobbyists whose signals stay below about 10 MHz. The Siglent SDS1104X-E earns its higher price with 100 MHz, twice the per-channel sample rate with all channels on, and free serial decoding, so buy it if you work on fast logic, buses or switching supplies.",
  chooseNeitherIf:
    "You need to probe a mains-referenced point directly: both are mains-powered bench scopes whose probe grounds tie to protective earth, so clipping a ground lead to a non-ground point on a live circuit can destroy the probe, the scope or the circuit — use an isolation transformer on the device under test or a differential probe instead.",
  faqs: [
    {
      question: "Is 50 MHz enough bandwidth for a beginner oscilloscope?",
      answer:
        "For most beginner work, yes. Audio, PWM, UART, I2C, power-supply ripple and most microcontroller signals sit well below 10 MHz, where a 50 MHz scope like the DS1054Z draws clean edges. You outgrow it with fast clocks, high-speed SPI, FPGA I/O or RF, where the SDS1104X-E's 100 MHz shows more of the true edge.",
    },
    {
      question: "Does the Siglent SDS1104X-E include serial decoding?",
      answer:
        "Yes. Siglent lists I2C, SPI, UART/RS232, CAN and LIN decoding as standard on the SDS1000X-E series. On the Rigol DS1054Z, RS232/UART, I2C and SPI trigger and decode are sold as options, and Rigol's 1000Z page doesn't list CAN or LIN decoding.",
    },
    {
      question: "Can the Rigol DS1054Z's bandwidth be upgraded past 50 MHz?",
      answer:
        "Rigol sells and specifies the DS1054Z as a 50 MHz scope, and its 1000Z page lists no official bandwidth upgrade, only an extended warranty option. Plan around 50 MHz. If you need more bandwidth with full manufacturer support, buy a scope rated higher as sold, such as the 100 MHz SDS1104X-E.",
    },
    {
      question: "Why does sample rate drop when I turn on more channels?",
      answer:
        "Both scopes share their converters between channels. With one channel on, all of it goes to that channel for 1 GSa/s. With three or four on, the Rigol drops to 250 MSa/s per channel and the Siglent to 500 MSa/s. For a 20 MHz signal that means 12.5 versus 25 samples per cycle.",
    },
    {
      question: "Which has more memory, the DS1054Z or the SDS1104X-E?",
      answer:
        "On paper the Rigol: 12 Mpts standard and 24 Mpts as an option, against the Siglent's 7 Mpts per channel or 14 Mpts interleaved. Deep memory keeps the sample rate high on long time bases. The Siglent offsets this with segmented sequence capture and an 80,000-frame history for rare events.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Rigol DS1054Z review", href: "/oscilloscopes/rigol-ds1054z-review" },
    { label: "Siglent SDS1104X-E review", href: "/oscilloscopes/siglent-sds1104x-e-review" },
    { label: "Rigol DHO804 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" },
    { label: "Rigol DHO804 vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "Best oscilloscope for Arduino projects", href: "/oscilloscopes/best-oscilloscope-for-arduino-projects" },
    { label: "Best oscilloscope for a home electronics lab", href: "/oscilloscopes/best-oscilloscope-for-home-electronics-lab" },
  ],
};

export default function RigolVsSiglentPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
