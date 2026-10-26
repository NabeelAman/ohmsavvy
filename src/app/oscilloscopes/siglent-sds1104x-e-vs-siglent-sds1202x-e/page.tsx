// Specs per Siglent, checked 2026-10-26:
// - SDS1000X-E series page: https://siglentna.com/digital-oscilloscopes/sds1000x-e-series-super-phosphor-oscilloscopes/
//   SDS1104X-E 100 MHz, 4 channels; SDS1202X-E 200 MHz, 2 channels + EXT trigger input; both up to 1 GSa/s, 7 Mpts/ch
//   non-interleaved and 14 Mpts interleaved, 100,000 wfm/s (400,000 sequence mode), 500 µV/div to 10 V/div, 7-inch 800 × 480,
//   edge/slope/pulse width/window/runt/interval/dropout/pattern/video triggers, free IIC/SPI/UART/RS232/CAN/LIN decode,
//   1 Mpt FFT, history and sequence up to 80,000 frames/segments, USB host, USB device, LAN, Pass/Fail, trigger out.
//   SLA1016 16-channel MSO option and Bode plot/web control are shown for the four-channel models only.
// - Pick notes (best-beginner-oscilloscopes): 500 MSa/s per channel when channels share an ADC; USB AWG module and Wi-Fi
//   for the four-channel models only. The series page lists the SAG1021I AWG as an accessory without splitting it by model,
//   so the page states that conflict.
// Rise-time figures use the standard 0.35/bandwidth approximation and are labeled approximate.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/oscilloscopes/siglent-sds1104x-e-vs-siglent-sds1202x-e";

export const metadata = buildMetadata({
  title: "Siglent SDS1104X-E vs SDS1202X-E",
  description:
    "Siglent SDS1104X-E vs Siglent SDS1202X-E: four channels at 100 MHz or two at 200 MHz. Sample rate, memory, options and which X-E model to buy.",
  path: "/oscilloscopes/siglent-sds1104x-e-vs-siglent-sds1202x-e",
});

const link = "text-accent hover:underline";

/** Illustrative: the same fast edge as drawn by a 100 MHz and a 200 MHz front end. */
function EdgeResponseDiagram() {
  // Simple first-order step responses; time axis 0..20 ns mapped to x = 40..320.
  const x = (ns: number) => 40 + (ns / 20) * 280;
  const y = (v: number) => 140 - v * 100;
  const curve = (tau: number) =>
    Array.from({ length: 41 }, (_, i) => {
      const t = i * 0.5;
      const start = 4;
      const v = t < start ? 0 : 1 - Math.exp(-(t - start) / tau);
      return `${x(t).toFixed(1)},${y(v).toFixed(1)}`;
    }).join(" ");
  return (
    <svg
      viewBox="0 0 340 185"
      className="w-full h-auto"
      role="img"
      aria-label="Illustrative diagram: an ideal fast step edge drawn by a 200 MHz oscilloscope rises in about 1.75 nanoseconds, while a 100 MHz oscilloscope draws the same edge more slowly, in about 3.5 nanoseconds, so the slower scope makes fast edges look slower than they are"
    >
      <rect x="40" y="30" width="280" height="120" className="fill-[#0f1a14]" rx="4" />
      {[0, 5, 10, 15, 20].map((t) => (
        <line key={t} x1={x(t)} x2={x(t)} y1="30" y2="150" stroke="#2c4a3a" strokeWidth="0.6" strokeDasharray="2 3" />
      ))}
      <line x1="40" x2="320" y1={y(0.1)} y2={y(0.1)} stroke="#2c4a3a" strokeWidth="0.6" />
      <line x1="40" x2="320" y1={y(0.9)} y2={y(0.9)} stroke="#2c4a3a" strokeWidth="0.6" />
      <text x="36" y={y(0.9) + 3} fontSize="8" textAnchor="end" className="fill-muted">90%</text>
      <text x="36" y={y(0.1) + 3} fontSize="8" textAnchor="end" className="fill-muted">10%</text>
      <polyline points={`${x(0)},${y(0)} ${x(4)},${y(0)} ${x(4)},${y(1)} ${x(20)},${y(1)}`} fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="1.2" strokeDasharray="4 3" />
      <polyline points={curve(0.8)} fill="none" stroke="#7CFC9A" strokeWidth="2" />
      <polyline points={curve(1.6)} fill="none" stroke="#5BB3E8" strokeWidth="2" />
      {[0, 5, 10, 15, 20].map((t) => (
        <text key={t} x={x(t)} y="163" fontSize="8" textAnchor="middle" className="fill-muted">
          {t} ns
        </text>
      ))}
      <text x="44" y="20" fontSize="8.5" fill="#7CFC9A">200 MHz: about 1.75 ns</text>
      <text x="170" y="20" fontSize="8.5" fill="#5BB3E8">100 MHz: about 3.5 ns</text>
      <text x="180" y="180" fontSize="8.5" textAnchor="middle" className="fill-muted">Dashed: the real edge. Rise times are approximate (0.35 ÷ bandwidth).</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Siglent SDS1104X-E vs Siglent SDS1202X-E",
  path,
  published: "2026-10-22",
  updated: "2026-10-26",
  intro:
    "Siglent SDS1104X-E vs Siglent SDS1202X-E is a straight trade between channels and bandwidth inside the same X-E family. Both share 1 GSa/s, 14 Mpts, 100,000 waveforms per second and standard serial decoding. The SDS1104X-E gives you four channels at 100 MHz plus the MSO and Bode-plot options; the SDS1202X-E doubles the bandwidth to 200 MHz on two channels. Most buyers are better served by four channels; buy the 200 MHz model only if fast edges are your daily work.",
  a: {
    pick: picks.find((p) => p.name === "Siglent SDS1104X-E")!,
    reviewHref: "/oscilloscopes/siglent-sds1104x-e-review",
    imageAlt: "Siglent SDS1104X-E four-channel oscilloscope",
    chooseIf: [
      "You need to watch three or four signals at once, such as SPI plus a reset line",
      "You may add the 16-channel MSO option later",
      "You want Bode plots of filters and amplifiers with a Siglent generator",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Siglent SDS1202X-E")!,
    imageAlt: "Siglent SDS1202X-E 200 MHz two-channel oscilloscope",
    chooseIf: [
      "Edge speed matters more than channel count, as in switching supplies",
      "Two channels plus an external trigger input cover your work",
      "You don't need the MSO or Bode-plot options",
    ],
  },
  extraSpecs: [
    { label: "Sample rate, all channels on", a: "500 MSa/s per channel", b: "500 MSa/s per channel" },
    { label: "Memory depth", a: "14 Mpts; 7 Mpts with all channels on", b: "14 Mpts (1 ch); 7 Mpts per channel (2 ch)" },
    { label: "Waveform rate", a: "100,000 wfm/s; 400,000 sequence", b: "100,000 wfm/s; 400,000 sequence" },
    { label: "Rise time (approx., 0.35/BW)", a: "About 3.5 ns", b: "About 1.75 ns" },
    { label: "Vertical sensitivity", a: "500 µV/div to 10 V/div", b: "500 µV/div to 10 V/div" },
    { label: "Display", a: "7-inch 800 × 480", b: "7-inch 800 × 480" },
    { label: "Serial decode", a: "I2C, SPI, UART/RS232, CAN, LIN", b: "I2C, SPI, UART/RS232, CAN, LIN" },
    { label: "External trigger input", a: "Not listed", b: "Yes (2 + EXT)" },
    { label: "MSO (16 digital)", a: "Optional", b: "Not available" },
    { label: "USB AWG module", a: "Optional (25 MHz)", b: "Not available per our Pick notes; see below" },
    { label: "Bode plot / Wi-Fi", a: "Yes, with a Siglent generator / optional dongle", b: "Not available" },
  ],
  differences: [
    "The SDS1202X-E has 200 MHz of bandwidth, double the SDS1104X-E's 100 MHz.",
    "The SDS1104X-E has four analog channels; the SDS1202X-E has two plus an external trigger input.",
    "Siglent offers the 16-channel MSO, Bode plot and Wi-Fi only on the four-channel X-E models.",
    "Both reach 1 GSa/s and drop to 500 MSa/s per channel when channels share an ADC.",
    "Memory, waveform rate, display size, triggers and the standard decode list are the same on both.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">At a glance</h2>
        <InfoCards
          items={[
            { label: "Same platform", desc: "1 GSa/s, 14 Mpts, 100,000 wfm/s, 7-inch screen, same triggers." },
            { label: "SDS1104X-E", desc: "Four channels at 100 MHz, MSO and Bode-plot options." },
            { label: "SDS1202X-E", desc: "Two channels at 200 MHz, plus an EXT trigger input." },
            { label: "Free decode", desc: "I2C, SPI, UART/RS232, CAN and LIN on both." },
            { label: "Deep history", desc: "Up to 80,000 recorded frames or segments on both." },
            { label: "Verdict", desc: "Multi-signal debugging: 1104X-E. Fast edges on two signals: 1202X-E." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The owner has bought and used the SDS1104X-E, which is why it carries our Hands-on Tested badge; the
          SDS1202X-E is assessed from Siglent&apos;s published specifications. Because both share one platform, the
          menus, triggers and measurement tools behave the same.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">SDS1104X-E vs SDS1202X-E spec by spec</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Analog bandwidth per Siglent.</>}>
            <BarChart
              items={[
                { label: "SDS1202X-E", value: 200, display: "200 MHz", highlight: true },
                { label: "SDS1104X-E", value: 100, display: "100 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Analog channels, plus optional digital channels on the four-channel model.</>}>
            <BarChart
              items={[
                { label: "SDS1104X-E (with MSO)", value: 20, display: "4 + 16 digital", highlight: true },
                { label: "SDS1104X-E", value: 4, display: "4 analog" },
                { label: "SDS1202X-E", value: 2, display: "2 analog" },
              ]}
            />
          </Figure>
          <Figure caption={<>Approximate rise time, ns (0.35 ÷ bandwidth). Lower draws faster edges more faithfully.</>}>
            <BarChart
              items={[
                { label: "SDS1104X-E", value: 3.5, display: "≈3.5 ns" },
                { label: "SDS1202X-E", value: 1.75, display: "≈1.75 ns", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Samples per period of a 50 MHz signal at 500 MSa/s per channel. Identical on both.</>}>
            <BarChart
              items={[
                { label: "SDS1104X-E, all channels", value: 10, display: "10 samples" },
                { label: "SDS1202X-E, both channels", value: 10, display: "10 samples" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The sampling side is a tie: with every channel running, each scope samples at 500 MSa/s, so a 50 MHz signal
          gets 500 ÷ 50 = 10 samples per cycle on either model. Where they part is the analog front end that sits before
          the ADC, and that decides how sharp a fast edge looks.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What double the bandwidth buys on a real edge</h2>
        <p className="text-muted leading-7 mb-4">
          A scope&apos;s front end has its own rise time, roughly 0.35 divided by bandwidth: about 3.5 ns at 100 MHz and
          1.75 ns at 200 MHz. What you see on screen is approximately the square root of the signal&apos;s rise time
          squared plus the scope&apos;s rise time squared. For a 5 ns edge, that works out to √(25 + 12.25) ≈ 6.1 ns on
          the SDS1104X-E, about 22% slow, and √(25 + 3.06) ≈ 5.3 ns on the SDS1202X-E, about 6% slow.
        </p>
        <Figure caption={<>Illustrative only: the same step drawn by a 200 MHz (green) and a 100 MHz (blue) front end.</>}>
          <EdgeResponseDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          For a 20 ns edge from a slow microcontroller pin, the error on the 100 MHz model falls to about 1.5%, which is
          why most hobby work never notices the difference. It matters on switch nodes of modern converters, fast logic
          families and ringing measurements. Our guides to{" "}
          <Link href="/oscilloscopes/how-to-measure-rise-time-with-oscilloscope-cursors" className={link}>
            measuring rise time with cursors
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            oscilloscope bandwidth
          </Link>{" "}
          go deeper.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">SDS1104X-E vs SDS1202X-E: which should you buy?</h2>
        <DataTable
          head={["Project", "Better fit", "Why"]}
          rows={[
            ["SPI, I2C and multi-signal debugging", "SDS1104X-E", "Four channels, MSO option"],
            ["Switching supplies and fast edges", "SDS1202X-E", "200 MHz shows faster rise times"],
            ["Filter and amplifier frequency response", "SDS1104X-E", "Bode plot with a Siglent generator"],
            ["Comparing an input with an output", "Either", "Two channels are enough"],
            ["Motor drive with three phases plus a trigger", "SDS1104X-E", "Needs four analog channels"],
            ["Student lab learning the basics", "SDS1104X-E", "More channels for the same platform"],
            ["Ringing on a MOSFET gate", "SDS1202X-E", "More bandwidth for the overshoot detail"],
            ["Catching a rare glitch", "Either", "Same 100,000 wfm/s and 80,000-frame history"],
          ]}
        />
        <div className="mt-4">
          <KeyIdea title="How much bandwidth do you need?">
            A common rule is a bandwidth three to five times the highest frequency you measure. Our guide to{" "}
            <Link href="/oscilloscopes/oscilloscope-bandwidth-for-switching-power-supplies" className={link}>
              oscilloscope bandwidth for switching power supplies
            </Link>{" "}
            works through examples.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Use cases in practice</h2>
        <p className="text-muted leading-7 mb-4">
          Embedded debugging usually needs more signals than speed. An SPI transaction is a clock, MOSI, MISO and chip
          select: four lines that the SDS1104X-E shows at once, and with the decode running you read bytes on screen. On
          the SDS1202X-E you&apos;d watch two lines and infer the rest. The four-channel model&apos;s MSO option extends
          that to 16 logic channels, which is where a parallel bus or a state machine becomes visible.
        </p>
        <p className="text-muted leading-7 mb-4">
          Power electronics is the opposite case. On a buck converter&apos;s switch node you usually want the switch
          voltage and the inductor current, and the detail you&apos;re after is the edge and the ringing that follows it.
          There, the SDS1202X-E&apos;s extra bandwidth matters more than extra inputs, and its EXT input can trigger from
          a gate signal without spending a channel.
        </p>
        <p className="text-muted leading-7">
          One documentation conflict to note: the Siglent datasheet notes on our product records list the USB AWG module for
          the four-channel models, while the series web page lists the SAG1021I as an accessory without separating models.
          Confirm with Siglent before buying an SDS1202X-E for its generator. For a full look at the four-channel model,
          read our{" "}
          <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={link}>
            Siglent SDS1104X-E review
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Most hobbyists and students should buy the SDS1104X-E: four channels and the MSO and Bode-plot upgrade path matter more often than extra bandwidth. Buy the SDS1202X-E if your work centers on fast edges and two channels plus an external trigger will always be enough.",
  faqs: [
    {
      question: "Can the SDS1202X-E add logic channels?",
      answer:
        "No. Siglent shows the SLA1016 16-channel MSO option, Bode plot and web control for the four-channel X-E models only, so the SDS1202X-E stays a two-channel analog scope. If you expect to debug parallel buses or many logic lines, choose the SDS1104X-E or pair the two-channel scope with a separate logic analyzer.",
    },
    {
      question: "Do both scopes have the same sample rate?",
      answer:
        "Yes. Both reach 1 GSa/s and run at 500 MSa/s per channel when the channels sharing an ADC are both on. That gives about 10 samples per cycle of a 50 MHz signal on either model. The difference between them is analog bandwidth, not sampling, so the same signal is sampled equally well on both.",
    },
    {
      question: "Is serial decoding standard on both Siglent X-E models?",
      answer:
        "Yes. Siglent lists I2C, SPI, UART/RS232, CAN and LIN trigger and decode as free, standard features across the SDS1000X-E series, so neither model needs a paid license. On the four-channel model you can show the clock, data and chip-select lines of an SPI bus at once while decoding.",
    },
    {
      question: "Which has more memory, the SDS1104X-E or SDS1202X-E?",
      answer:
        "They match. Siglent lists 14 Mpts when a channel has an ADC's memory to itself and 7 Mpts per channel when channels share it. At 500 MSa/s, 7 Mpts holds 14 ms of signal, enough for a full UART frame or a power-up sequence. Both also keep up to 80,000 history frames.",
    },
    {
      question: "Is 100 MHz enough for Arduino and Raspberry Pi work?",
      answer:
        "For most microcontroller buses, yes. I2C, UART and typical SPI clocks run well under 50 MHz, and a 100 MHz scope draws their edges with little distortion. Fast edges on high-speed SPI or SDIO benefit from more bandwidth. Our Arduino scope guide explains how bandwidth relates to the signals you'll measure.",
    },
  ],
  roundup: { label: "See the full oscilloscope roundup", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Siglent SDS1104X-E review", href: "/oscilloscopes/siglent-sds1104x-e-review" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Rigol DHO804 vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1202x-e" },
    { label: "Best oscilloscope for Arduino projects", href: "/oscilloscopes/best-oscilloscope-for-arduino-projects" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
  ],
};

export default function SiglentSds1104xeVsSds1202xePage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
