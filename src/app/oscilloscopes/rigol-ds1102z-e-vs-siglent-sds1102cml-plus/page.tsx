// Specs per maker, checked 2026-10-26:
// - Rigol DS1102Z-E: rigolna.com and the DS1000Z-E datasheet, as recorded on this site's DS1102Z-E Pick
//   (100 MHz, 2 channels, 1 GSa/s single / 500 MSa/s dual, 24 Mpts, 7-inch 800 × 480, up to 30,000 wfms/s,
//   up to 60,000-frame recording, 8-bit with a 12-bit High Resolution mode, standard parallel/RS232/UART/I2C/SPI decode).
// - Siglent SDS1102CML+: https://siglentna.com/digital-oscilloscopes/sds1000cml-series-digital-storage-oscilloscope/
//   (100 MHz, 2 + EXT, 1 GSa/s real-time, equivalent-time up to 50 GSa/s (series figure), 2 Mpts memory, capture rate
//   not given; Edge, Pulse, Video, Slope, Alternate triggers; 32 measurements, 5 shown at once; +, −, ×, ÷, FFT;
//   6-digit frequency counter; pass/fail mask testing; 7-inch 800 × 480 TFT; USB host, USB device (USBTMC),
//   LAN (VXI-11); digital recorder with 7 M of memory). 40 Kpts normal-mode memory per the Pick's Siglent NA sourcing;
//   Siglent's Amazon listing says 1 Mpts.
// Record-time figures below are memory divided by sample rate, not measurements.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
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

/** Equivalent-time sampling: a few samples per cycle, each taken at a slightly later point, rebuild a repetitive wave. */
function EquivalentTimeDiagram() {
  const W = 360;
  const cycleW = 90;
  const base = 70;
  const amp = 32;
  const wave = (x0: number, mid = base, a = amp) =>
    Array.from({ length: 46 }, (_, i) => {
      const x = x0 + (i / 45) * cycleW;
      const y = mid - Math.sin((i / 45) * Math.PI * 2) * a;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(" ");
  const offsets = [0.05, 0.3, 0.55, 0.8];
  return (
    <svg
      viewBox={`0 0 ${W} 242`}
      className="w-full h-auto"
      role="img"
      aria-label="Diagram: equivalent-time sampling takes one sample per trigger on successive cycles of a repeating waveform, each slightly later than the last, then assembles them into one finely sampled picture; it only works if the signal repeats exactly"
    >
      <text x="10" y="16" fontSize="10.5" fontWeight="700" className="fill-foreground">Repeating input, one sample per trigger</text>
      {[0, 1, 2, 3].map((c) => (
        <g key={c}>
          <path d={wave(10 + c * cycleW)} className="stroke-border fill-none" strokeWidth="1.4" />
          <circle
            cx={10 + c * cycleW + offsets[c] * cycleW * 0.5}
            cy={base - Math.sin(offsets[c] * 0.5 * Math.PI * 2) * amp}
            r="4"
            className="fill-accent"
          />
          <text x={10 + c * cycleW + 45} y="122" fontSize="9" textAnchor="middle" className="fill-muted">
            trigger {c + 1}
          </text>
        </g>
      ))}
      <path d="M180 132 V150" className="stroke-muted" strokeWidth="1.4" markerEnd="url(#et-arrow)" />
      <defs>
        <marker id="et-arrow" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" className="fill-muted" />
        </marker>
      </defs>
      <text x="10" y="164" fontSize="10.5" fontWeight="700" className="fill-accent">Assembled picture of one cycle</text>
      <path d={wave(135, 195, 22)} className="stroke-accent fill-none" strokeWidth="1.6" />
      {offsets.map((o) => (
        <circle key={o} cx={135 + o * cycleW * 0.5} cy={195 - Math.sin(o * 0.5 * Math.PI * 2) * 22} r="3.5" className="fill-accent" />
      ))}
      <text x={W / 2} y="236" fontSize="9" textAnchor="middle" className="fill-muted">
        Repeating signals only: one-off events need real-time sampling.
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Rigol DS1102Z-E vs Siglent SDS1102CML+",
  path,
  published: "2026-10-22",
  updated: "2026-10-26",
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
    { label: "Sample rate, 1 / 2 channels", a: "1 GSa/s / 500 MSa/s", b: "1 GSa/s real-time; per-channel split not stated" },
    { label: "Memory depth", a: "24 Mpts (1 ch); 12 Mpts (2 ch)", b: "40 Kpts normal; 2 Mpts long-memory" },
    { label: "Vertical resolution", a: "8-bit (12-bit High Resolution mode)", b: "8-bit" },
    { label: "Waveform rate", a: "Up to 30,000 wfms/s", b: "Not stated by Siglent" },
    { label: "Serial decoding", a: "Parallel, RS232/UART, I2C, SPI", b: "None listed" },
    { label: "Equivalent-time sampling", a: "Not listed", b: "Up to 50 GSa/s (series figure)" },
    { label: "Triggers", a: "Not detailed here", b: "Edge, pulse, video, slope, alternate" },
    { label: "Measurements and math", a: "Not detailed here", b: "32 measurements; +, −, ×, ÷, FFT" },
    { label: "Recording", a: "Up to 60,000 frames", b: "Digital recorder, 7 M memory" },
    { label: "Display", a: "7-inch 800 × 480, intensity graded", b: "7-inch 800 × 480" },
    { label: "Interfaces", a: "USB host/device, LAN (LXI), Aux out", b: "USB host/device, LAN, Pass/Fail" },
  ],
  differences: [
    "Rigol's datasheet gives the DS1102Z-E 24 Mpts of memory; Siglent lists 40 Kpts in normal mode and 2 Mpts in long-memory mode for the SDS1102CML+, and its Amazon listing says 1 Mpts.",
    "The DS1102Z-E includes serial decoding of parallel, UART, I2C and SPI buses; Siglent lists no serial decoding for the CML+.",
    "Rigol states up to 30,000 waveforms per second; Siglent doesn't state an update rate for the CML+.",
    "The CML+ offers equivalent-time sampling up to 50 GSa/s for repetitive signals, plus a 6-digit frequency counter and pass/fail mask testing.",
    "Both are 100 MHz, two-channel, 1 GSa/s scopes with a 7-inch 800 × 480 screen.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">At a glance</h2>
        <InfoCards
          items={[
            { label: "Same front end", desc: "100 MHz, two channels, 1 GSa/s, 7-inch 800 × 480 screen." },
            { label: "Rigol extra: memory", desc: "24 Mpts, 600 times the Siglent's normal-mode 40 Kpts." },
            { label: "Rigol extra: decoding", desc: "UART, I2C, SPI and parallel included." },
            { label: "Siglent extra: counter", desc: "A 6-digit frequency counter and pass/fail mask testing." },
            { label: "Siglent extra: ET sampling", desc: "Up to 50 GSa/s on repeating signals." },
            { label: "Verdict", desc: "Most buyers: Rigol. Basic classroom viewing on a budget: Siglent." },
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Rigol DS1102Z-E vs Siglent SDS1102CML+ spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Memory decides how long the scope can keep sampling at full speed. At 1 GSa/s, 24 Mpts holds 24 ms of
          signal; 40 Kpts holds 40 µs. Beyond that, a scope has to lower its sample rate to fit the timebase. The
          front-end numbers on the two spec sheets match, so memory, decoding and update rate are where the money
          goes.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
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
          <Figure caption={<>Signal captured at 1 GSa/s before the sample rate must drop, log scale, in microseconds.</>}>
            <BarChart
              log
              items={[
                { label: "Rigol, 1 channel", value: 24000, display: "24 ms", highlight: true },
                { label: "Siglent, long-memory", value: 2000, display: "2 ms" },
                { label: "Siglent, normal", value: 40, display: "40 µs" },
              ]}
            />
          </Figure>
        </div>
        <div className="mt-4">
          <DataTable
            head={["Scope and mode", "Memory", "Time at 1 GSa/s", "Sample rate with 100 ms on screen"]}
            rows={[
              ["Rigol DS1102Z-E, one channel", "24 Mpts", "24 ms", "≈ 240 MSa/s"],
              ["Siglent SDS1102CML+, long memory", "2 Mpts", "2 ms", "≈ 20 MSa/s"],
              ["Siglent SDS1102CML+, normal", "40 Kpts", "40 µs", "≈ 0.4 MSa/s"],
            ]}
            mono={[1, 2, 3]}
          />
        </div>
        <p className="text-muted leading-7 mt-4">
          The last column is memory divided by the time on screen, capped at 1 GSa/s, and scopes round to their own
          steps, so treat it as a guide. It shows why shallow memory hurts: at a slow timebase the Siglent in normal
          mode samples a thousand times slower than its headline figure.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">How the Siglent reaches 50 GSa/s</h2>
        <p className="text-muted leading-7 mb-4">
          The CML+&apos;s 50 GSa/s figure is equivalent-time sampling, not real-time. On a signal that repeats
          exactly, the scope takes a sample on each trigger, shifted slightly later each time, and stitches the
          results into one finely resolved cycle. It is a genuine way to see fast edges on a clock or a test signal,
          but it can&apos;t capture anything that happens once.
        </p>
        <Figure caption={<>Equivalent-time sampling rebuilds one cycle from many triggers. The Rigol doesn&apos;t list this mode.</>}>
          <EquivalentTimeDiagram />
        </Figure>
        <div className="mt-4">
          <KeyIdea title="Why this matters for serial buses">
            A UART byte at 9,600 baud lasts about a millisecond, and it never repeats exactly, so equivalent-time
            sampling can&apos;t help. A short record then forces a lower sample rate and loses edge detail. Our
            guide to{" "}
            <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
              what GSa/s means
            </Link>{" "}
            explains the trade-off.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Rigol DS1102Z-E vs SDS1102CML+: which should you buy?</h2>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["Debugging Arduino serial buses", "Rigol DS1102Z-E", "UART, I2C and SPI decoding plus 24 Mpts to hold whole packets"],
            ["Hunting an intermittent glitch", "Rigol DS1102Z-E", "Stated 30,000 wfms/s and 60,000-frame recording"],
            ["Teaching basic waveform viewing", "Siglent SDS1102CML+", "Simple controls, counter and pass/fail for lab exercises"],
            ["Measuring a clock's frequency precisely", "Either", "Both are 100 MHz; the Siglent adds a 6-digit counter"],
            ["Looking at fast edges on a repeating signal", "Either", "Same 100 MHz; Siglent's ET mode adds detail on repeats"],
            ["Logging long, slow signals", "Rigol DS1102Z-E", "Deep memory keeps the sample rate up on slow timebases"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Use cases in practice</h2>
        <p className="text-muted leading-7 mb-4">
          Students and hobbyists tend to outgrow a scope through serial buses and one-off events, and both point to
          the Rigol. Decoding turns an I2C transaction into readable addresses and bytes, and deep memory lets you
          capture the whole transaction at a sample rate high enough to see the edges. Our guide to{" "}
          <Link href="/oscilloscopes/how-to-use-oscilloscope-persistence-to-find-intermittent-glitches" className={link}>
            using persistence to find intermittent glitches
          </Link>{" "}
          shows why update rate matters too.
        </p>
        <p className="text-muted leading-7">
          The Siglent&apos;s strengths suit a classroom: 32 automatic measurements with five on screen, a frequency
          counter, and a pass/fail mask that flags when a waveform leaves a template. If a lab only needs students to
          read amplitude, period and phase on sine and square waves, it does that well. For a broader comparison, see
          the{" "}
          <Link href="/oscilloscopes/rigol-ds1102z-e-vs-rigol-ds1054z" className={link}>
            DS1102Z-E against the four-channel DS1054Z
          </Link>{" "}
          or our{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>
          .
        </p>
      </section>

      <Callout title="Safety: bench scope inputs are not for mains">
        Benchtop scope inputs like these are typically rated only for low-energy circuits, and their probe ground clips
        connect to earth through the power cord. Clipping ground to a live mains conductor creates a short circuit.
        Check each scope&apos;s input rating in its manual, use a rated differential probe for anything mains-connected,
        and leave panel work to a licensed electrician.
      </Callout>
    </>
  ),
  bottomLine:
    "The Rigol DS1102Z-E is the better buy for almost everyone: far deeper memory, standard serial decoding and a stated 30,000 wfms/s update rate on the same 100 MHz, two-channel base. The Siglent SDS1102CML+ only makes sense for basic classroom viewing at a clearly lower price.",
  faqs: [
    {
      question: "How much memory does the SDS1102CML+ have?",
      answer:
        "Siglent lists 40 Kpts in normal mode and 2 Mpts in long-memory mode; its Amazon listing says 1 Mpts. We use Siglent's own figures and flag the conflict. Either way it is far short of the Rigol DS1102Z-E's 24 Mpts, which matters as soon as you slow the timebase or capture a serial packet.",
    },
    {
      question: "Does the Rigol DS1102Z-E decode serial buses?",
      answer:
        "Yes. Rigol's datasheet lists parallel, RS232/UART, I2C and SPI decoding as standard, two decodes at a time. That lets you read bytes and addresses on screen instead of counting edges. Siglent lists no serial decoding for the SDS1102CML+, so on that scope you would decode by hand from the waveform.",
    },
    {
      question: "Are both scopes really 100 MHz?",
      answer:
        "Yes. Both are 100 MHz, two-channel scopes with 1 GSa/s maximum real-time sampling and a 7-inch 800 × 480 display. With both channels on, Rigol's figure halves to 500 MSa/s per channel; Siglent's page doesn't break down the two-channel rate. Either is comfortable on signals up to roughly 20 to 30 MHz.",
    },
    {
      question: "Is the SDS1102CML+ discontinued?",
      answer:
        "Siglent North America still sells it new, and we found no discontinued notice on its site. It is an older and simpler design than the Rigol, with no serial decoding and shallow memory, so check the live Amazon listing before buying, since stock on older models can come and go.",
    },
    {
      question: "Which is better for students, the DS1102Z-E or the SDS1102CML+?",
      answer:
        "The DS1102Z-E, because deep memory and decoding stay useful as projects grow from blinking LEDs to sensors and serial buses. The CML+ covers basic waveform viewing, automatic measurements and frequency counting, which is enough for an introductory lab but limiting once you start debugging microcontroller communications.",
    },
  ],
  roundup: { label: "See the full oscilloscope roundup", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Rigol DS1102Z-E vs Rigol DS1054Z", href: "/oscilloscopes/rigol-ds1102z-e-vs-rigol-ds1054z" },
    { label: "Rigol DS1202Z-E vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-ds1202z-e-vs-siglent-sds1202x-e" },
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
