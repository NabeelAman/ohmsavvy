import Link from "@/components/AppLink";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// HANMATEK DOS1102: 110 MHz, rise time 3 ns or less, 500 MS/s per channel (1 GS/s combined), 10K record length, 7-inch
// 800 x 480, 2 ns/div-1000 s/div, 20 mV/div-5 V/div, 1 MOhm +/-2% || 20 pF, 400 V max input (DC+AC pk-pk), edge and
// video triggers (auto/normal/single), 30 auto measurements, math + - x / and FFT, 16 stored waveforms, USB device plus
// USB flash disk, DC 5 V 2 A, 301 x 152 x 70 mm, about 1.1 kg, per the DOS1102 user manual section 5 (linked from
// https://hanmatek.com/pages/manuals-center); no serial decoding per the FAQ on
// https://hanmatek.com/products/hanmatek-dos1102-110mhz-2ch-oscilloscope; the DOS1102S adds a 10 MHz signal source per
// https://hanmatek.com/ (as recorded 2026-10-24 on /oscilloscopes/hanmatek-dos1102-vs-hantek-dso2c10). Amazon
// https://www.amazon.com/dp/B0833YFNKP (HANMATEK store, In Stock at ZIP 10001, checked 2026-11-08): "500 MS/s *2", record
// "not less than 10K", at least 16 stored waveform groups, 65535-color 800 x 480 screen, four cursor modes, probe
// multipliers 1X/10X/100X/1000X, built-in 6-digit hardware frequency meter 2 Hz-20 MHz, current measurement scaling
// 100.0 mA/V-1 kA/V, 30 automatic measurements with a custom menu, LabVIEW and SCPI support, DC powered.
// FNIRSI 1014D: 100 MHz x 2, 1 GSa/s real time (two-channel rate not stated), 8-bit, 7-inch 800 x 480, memory "240Kbit",
// rise time <3 ns, 1 MOhm, AC/DC, timebase 50 s/div-10 ns/div, 40 V (1X) / 400 V (10X), rising/falling edge trigger with
// Auto/Normal/Single, external trigger input 0-40 V, 12 auto parameters, FFT, X-Y, roll, cursors, 1 GB storage for 1000
// screenshots + 1000 waveforms, USB export, DDS generator 2.5 Vpp with 14 standard signals + 1 custom (sine to 10 MHz,
// other waves to 2 MHz, custom to 1 MHz), 310 x 145 x 70 mm, 5 V 2A/3A/4A per https://www.fnirsi.com/products/1014d (spec
// tables as recorded 2026-10-24). Item weight 3.46 lb and a kit of two 1X/10X probes plus a P4100 100X probe per
// https://www.amazon.com/dp/B097T5NRTZ (In Stock at ZIP 10001, checked 2026-11-08).
// HANMATEK doesn't state ADC bits; FNIRSI doesn't state the 1014D's vertical sensitivity range in our sources.
// Samples-per-cycle figures are our arithmetic.

const path = "/oscilloscopes/hanmatek-dos1102-vs-fnirsi-1014d";
const dos = picks.find((p) => p.name === "HANMATEK DOS1102")!;
const fnirsi = picks.find((p) => p.name === "FNIRSI 1014D")!;

export const metadata = buildMetadata({
  title: "HANMATEK DOS1102 vs FNIRSI 1014D: 5 V Benches",
  description:
    "HANMATEK DOS1102 vs FNIRSI 1014D: two 7-inch scopes on 5 V power. One measures more, one adds a signal generator. Sample-rate split, charts and a verdict.",
  path: "/oscilloscopes/hanmatek-dos1102-vs-fnirsi-1014d",
  image: dos.image,
});

const link = "text-accent hover:underline";

/** Two-channel sampling: HANMATEK states 500 MS/s on each channel; FNIRSI states only the one-channel 1 GSa/s. */
function ChannelSplitDiagram() {
  const cyc = 120; // px per cycle of a 50 MHz sine (20 ns)
  const wave = (x0: number, y0: number) => {
    let d = `M${x0} ${y0}`;
    for (let i = 1; i <= 240; i++) {
      const x = x0 + i;
      const y = y0 - 16 * Math.sin((2 * Math.PI * i) / cyc);
      d += ` L${x} ${y.toFixed(1)}`;
    }
    return d;
  };
  const dots = (x0: number, y0: number, step: number) =>
    Array.from({ length: Math.floor(240 / step) + 1 }, (_, k) => {
      const i = k * step;
      return { x: x0 + i, y: y0 - 16 * Math.sin((2 * Math.PI * i) / cyc) };
    });
  return (
    <svg
      viewBox="0 0 400 220"
      className="w-full h-auto"
      role="img"
      aria-label="HANMATEK DOS1102 vs FNIRSI 1014D sampling diagram: with both channels on, the DOS1102 takes a sample every 2 ns on each channel, ten samples per cycle of a 50 MHz sine; the FNIRSI 1014D takes a sample every 1 ns with one channel on, but FNIRSI does not state its rate with both channels on."
    >
      <text x="12" y="18" fontSize="10" fontWeight="700" className="fill-foreground">HANMATEK DOS1102, both channels on</text>
      <text x="12" y="31" fontSize="8.5" className="fill-muted">500 MS/s each: a dot every 2 ns, 10 per 50 MHz cycle</text>
      <path d={wave(140, 70)} className="fill-none stroke-border" strokeWidth="1" />
      {dots(140, 70, 12).map((p, i) => (
        <circle key={`a${i}`} cx={p.x} cy={p.y} r="2.2" className="fill-accent" />
      ))}
      <text x="12" y="74" fontSize="8.5" className="fill-foreground">CH1 and CH2</text>
      <text x="12" y="118" fontSize="10" fontWeight="700" className="fill-foreground">FNIRSI 1014D</text>
      <text x="12" y="131" fontSize="8.5" className="fill-muted">1 GSa/s with one channel: a dot every 1 ns</text>
      <path d={wave(140, 162)} className="fill-none stroke-border" strokeWidth="1" />
      {dots(140, 162, 6).map((p, i) => (
        <circle key={`b${i}`} cx={p.x} cy={p.y} r="1.8" className="fill-foreground" />
      ))}
      <text x="12" y="166" fontSize="8.5" className="fill-foreground">CH1 only</text>
      <text x="12" y="206" fontSize="9" className="fill-muted">Both channels on: rate not stated by FNIRSI</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "HANMATEK DOS1102 vs FNIRSI 1014D",
  path,
  published: "2026-11-08",
  intro:
    "HANMATEK DOS1102 vs FNIRSI 1014D pits two of the few 7-inch bench scopes that run from a 5 V supply instead of mains. Both have two channels at 100–110 MHz and an 800 × 480 screen. The DOS1102 is the better measuring tool: 30 automatic measurements, a 6-digit frequency counter, a stated 500 MS/s on each channel and PC control. The 1014D is the better stimulus tool: a built-in signal generator and a 100X probe in the kit. If you need to make signals, buy the FNIRSI; if you need to measure them more thoroughly, buy the HANMATEK.",
  a: {
    pick: dos,
    imageAlt: "HANMATEK DOS1102 110 MHz two-channel oscilloscope",
    chooseIf: [
      "You want 30 automatic measurements and a 6-digit hardware frequency counter",
      "You want the two-channel sample rate stated plainly (500 MS/s each)",
      "You plan to log or control the scope from a PC with SCPI or LabVIEW",
      "You use a current clamp and want amps-per-volt scaling built in",
    ],
  },
  b: {
    pick: fnirsi,
    imageAlt: "FNIRSI 1014D oscilloscope with built-in DDS signal generator",
    chooseIf: [
      "You need a signal source and don't own a function generator",
      "You want to keep many captures: 1000 waveforms and 1000 screenshots on board",
      "You want an external trigger input",
      "You want a P4100 100X probe included for higher-voltage work",
    ],
  },
  extraSpecs: [
    { label: "Two-channel sample rate", a: "500 MS/s per channel (1 GS/s combined)", b: "Not stated (1 GSa/s with one channel)" },
    { label: "Record length", a: "10K points", b: "\"240Kbit\" (points per channel not stated)" },
    { label: "Signal generator", a: "None (the DOS1102S adds one)", b: "DDS: sine to 10 MHz, others to 2 MHz, 2.5 Vpp" },
    { label: "Automatic measurements", a: "30", b: "12" },
    { label: "Frequency counter", a: "6-digit hardware, 2 Hz–20 MHz (Amazon)", b: "Not listed" },
    { label: "Triggers", a: "Edge, video; Auto, Normal, Single", b: "Rising/falling edge; Auto, Normal, Single; external input" },
    { label: "Vertical range", a: "20 mV/div to 5 V/div", b: "Not stated in our sources" },
    { label: "Timebase", a: "2 ns/div to 1000 s/div", b: "10 ns/div to 50 s/div" },
    { label: "Saved waveforms", a: "16 groups, plus USB flash disk", b: "1000 waveforms and 1000 screenshots (1 GB), USB export" },
    { label: "PC control", a: "SCPI, LabVIEW (Amazon)", b: "Not listed" },
    { label: "Maximum input", a: "400 V (DC + AC peak-to-peak)", b: "40 V (1X), 400 V (10X)" },
    { label: "Power", a: "DC 5 V, 2 A", b: "5 V, 2A/3A/4A" },
    { label: "Size and weight", a: "301 × 152 × 70 mm, about 1.1 kg", b: "310 × 145 × 70 mm, 3.46 lb (Amazon)" },
  ],
  differences: [
    "Generator: the 1014D has one; the DOS1102 doesn't. HANMATEK sells the DOS1102S with a 10 MHz signal source for buyers who want one.",
    "Sampling with both channels on: HANMATEK's manual states 500 MS/s per channel. FNIRSI states 1 GSa/s but not the two-channel split.",
    "Measurements: 30 automatic measurements plus a 6-digit hardware frequency counter on the DOS1102, against 12 parameters on the 1014D.",
    "Bandwidth: 110 MHz against 100 MHz. On a scope this close, that 10% gap won't decide anything.",
    "Storage: the 1014D keeps 1000 waveforms and 1000 screenshots internally; the DOS1102 stores 16 waveform groups and saves to a USB stick.",
    "Timebase: the DOS1102 reaches 2 ns/div and 1000 s/div; the 1014D 10 ns/div and 50 s/div. The DOS1102 zooms further in and can sweep slower.",
    "Weight: about 1.1 kg for the DOS1102 against 3.46 lb (about 1.57 kg) on the 1014D listing.",
    "Neither carries our Hands-on Tested badge; both assessments are desk research from published specs.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          On the core scope specs these two are close. The charts show where they part: measurement tools, timebase reach
          and weight.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Rated bandwidth. Close enough that it shouldn&apos;t drive the choice.</>}>
            <BarChart
              items={[
                { label: "HANMATEK DOS1102", value: 110, display: "110 MHz", highlight: true },
                { label: "FNIRSI 1014D", value: 100, display: "100 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Automatic measurements listed by each maker.</>}>
            <BarChart
              items={[
                { label: "HANMATEK DOS1102", value: 30, display: "30", highlight: true },
                { label: "FNIRSI 1014D", value: 12, display: "12" },
              ]}
            />
          </Figure>
          <Figure caption={<>Fastest timebase setting: lower zooms further into an edge.</>}>
            <BarChart
              items={[
                { label: "FNIRSI 1014D", value: 10, display: "10 ns/div" },
                { label: "HANMATEK DOS1102", value: 2, display: "2 ns/div", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Weight: HANMATEK&apos;s manual against the 1014D&apos;s Amazon item weight.</>}>
            <BarChart
              items={[
                { label: "FNIRSI 1014D", value: 1.57, display: "about 1.57 kg" },
                { label: "HANMATEK DOS1102", value: 1.1, display: "about 1.1 kg", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Both are 7-inch, 800 × 480 and both run from 5 V, which keeps them light and fanless next to the mains bench
          scopes they compete with. HANMATEK doesn&apos;t state the DOS1102&apos;s ADC resolution; FNIRSI lists 8-bit for
          the 1014D.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">HANMATEK DOS1102 vs FNIRSI 1014D with both channels running</h2>
        <p className="text-muted leading-7 mb-4">
          Most two-channel scopes share one converter, so turning on the second channel halves the rate each one gets.
          HANMATEK says so plainly: 500 MS/s per channel, 1 GS/s combined. FNIRSI quotes 1 GSa/s and stops there. If the
          1014D follows the usual pattern, it also drops to 500 MSa/s per channel, but FNIRSI doesn&apos;t confirm it.
        </p>
        <Figure caption={<>Illustrative: a 50 MHz sine sampled at each stated rate. Ten points per cycle is plenty to draw the shape.</>}>
          <ChannelSplitDiagram />
        </Figure>
        <p className="text-muted leading-7 my-4">
          At 500 MS/s each channel gets a sample every 2 ns. That is ten samples per cycle at 50 MHz and about 4.5 at the
          DOS1102&apos;s full 110 MHz, so the two-channel shape holds up well into the tens of MHz. For comparing an input
          and an output, or a clock and data line, the stated figure is what you want to know before buying.
        </p>
        <h3 className="text-lg font-semibold mb-2">Measurement depth on the DOS1102</h3>
        <p className="text-muted leading-7 mb-4">
          The 6-digit hardware counter, rated 2 Hz to 20 MHz on the Amazon listing, reads a crystal or a PWM frequency to a
          resolution the on-screen period measurement can&apos;t match. Current scaling from 100.0 mA/V to 1 kA/V means a
          clamp probe&apos;s output shows directly in amps. Probe multipliers run to 1000X, and SCPI plus LabVIEW support let
          a PC pull readings for logging. None of that matters for a first look at a waveform; it matters a lot for repair
          and production checks where you write the numbers down.
        </p>
        <h3 className="text-lg font-semibold mb-2">Stimulus on the 1014D</h3>
        <p className="text-muted leading-7 mb-4">
          The 1014D&apos;s generator makes 14 standard waveforms plus a custom shape, sine to 10 MHz and the rest to 2 MHz,
          at 2.5 Vpp. Feed it into an amplifier, a filter or a logic input and watch the result on the other channel. The
          external trigger input (0–40 V) is also handy when a separate sync pulse marks the event you want. The{" "}
          <Link href="/oscilloscopes/fnirsi-1014d-vs-owon-sds1102" className={link}>
            FNIRSI 1014D vs OWON SDS1102 page
          </Link>{" "}
          works through what the generator saves you in more detail.
        </p>
        <KeyIdea title="The third option: the DOS1102S">
          HANMATEK&apos;s site lists the DOS1102S, which adds a 10 MHz signal source to the same scope. It isn&apos;t one of
          our checked picks, so we haven&apos;t confirmed its Amazon availability. If you like the DOS1102&apos;s
          measurement set but want a generator, it is worth looking up before settling on the 1014D.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Pick", "One-line reason"]}
          rows={[
            ["Audio, filter or amplifier testing", "FNIRSI 1014D", "Its own sine source drives the circuit"],
            ["Repair bench that logs readings", "HANMATEK DOS1102", "30 measurements, frequency counter, SCPI and LabVIEW"],
            ["Checking a crystal or PWM frequency precisely", "HANMATEK DOS1102", "6-digit hardware counter to 20 MHz"],
            ["Motor or supply current with a clamp probe", "HANMATEK DOS1102", "Built-in amps-per-volt scaling"],
            ["Student with no other instruments", "FNIRSI 1014D", "Scope and generator in one"],
            ["Keeping a library of captures on the scope", "FNIRSI 1014D", "1000 waveforms and 1000 screenshots on board"],
            ["Slow drift over many minutes", "HANMATEK DOS1102", "Timebase to 1000 s/div"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What both can and can&apos;t do</h2>
        <p className="text-muted leading-7 mb-4">
          With the three-to-five-times rule, both show signals up to about 20–35 MHz at close to true size: audio, switching
          supplies, PWM, I2C, UART and SPI clocks of a few MHz. Neither decodes serial buses; HANMATEK&apos;s FAQ says the
          DOS1102 doesn&apos;t, and FNIRSI doesn&apos;t list it. Both have short memory (10K points against an unclear
          &quot;240Kbit&quot;), so long single-shot captures lose time resolution. For decoding and deep memory on a
          budget, see{" "}
          <Link href="/oscilloscopes/hanmatek-dos1102-vs-hantek-dso2c10" className={link}>
            HANMATEK DOS1102 vs Hantek DSO2C10
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/hantek-dso2c10-vs-fnirsi-1014d" className={link}>
            Hantek DSO2C10 vs FNIRSI 1014D
          </Link>
          .
        </p>
        <Callout title="Low-voltage power doesn't mean isolated">
          A 5 V adapter makes these light, but once the scope is connected to a grounded PC, USB stick host or adapter with
          an earth pin, the probe ground clips can still be tied to earth. Never clip a ground lead to a mains-live point.
          HANMATEK&apos;s 400 V and FNIRSI&apos;s 400 V (10X) are input limits, not CAT safety ratings. Use a differential
          probe for line voltage, and call an electrician for anything on the mains side you are unsure of.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The trust question: whose numbers are cleaner?</h2>
        <p className="text-muted leading-7 mb-4">
          Neither is spotless. HANMATEK&apos;s manual is clear, but its product-page FAQ carries copied figures (250 MSa/s,
          12,000 points, 3.5-inch) that belong to another model, and the Amazon title says &quot;500 MS/s *2&quot; while the
          front badge says 1GSa/s. Read the manual and they agree: 500 MS/s on each channel. FNIRSI&apos;s spec table is
          tidy but leaves out the two numbers a two-channel buyer most needs, the split sample rate and points per channel.
          On transparency, the DOS1102 edges it.
        </p>
        <p className="text-muted leading-7">
          More matchups:{" "}
          <Link href="/oscilloscopes/fnirsi-1014d-vs-rigol-ds1202z-e" className={link}>
            FNIRSI 1014D vs Rigol DS1202Z-E
          </Link>
          ,{" "}
          <Link href="/oscilloscopes/rigol-dho804-vs-fnirsi-1014d" className={link}>
            Rigol DHO804 vs FNIRSI 1014D
          </Link>{" "}
          and the{" "}
          <Link href="/oscilloscopes/best-oscilloscopes-for-electronics-repair" className={link}>
            electronics repair scope picks
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Choose the HANMATEK DOS1102 if you measure more than you stimulate: 30 automatic measurements, a 6-digit counter, a clearly stated 500 MS/s per channel, PC control and about 1.1 kg. Choose the FNIRSI 1014D if you need a signal source on the same bench: its DDS generator and 100X probe make it the more complete starter kit.",
  chooseNeitherIf:
    "You need to decode I2C, UART or SPI, or capture long single events at full speed. Both have short memory and no serial decoding; a scope like the Hantek DSO2C10 covers that.",
  faqs: [
    {
      question: "Does the HANMATEK DOS1102 have a signal generator?",
      answer:
        "No. HANMATEK lists a 10 MHz signal source only on the DOS1102S variant. The FNIRSI 1014D has a DDS generator built in, with sine output to 10 MHz, other standard waveforms to 2 MHz and a custom shape to 1 MHz, at 2.5 Vpp.",
    },
    {
      question: "Is the DOS1102 1 GSa/s or 500 MS/s?",
      answer:
        "Both, depending on how you count. HANMATEK's manual gives 500 MS/s per channel, 1 GS/s combined, which matches the Amazon title's \"500 MS/s *2\" and the front-panel 1GSa/s badge. With both channels on, each one samples at 500 MS/s.",
    },
    {
      question: "Can both scopes run without mains power?",
      answer:
        "Both run from a 5 V supply rather than a mains lead: the DOS1102 from 5 V 2 A, the 1014D from a 5 V adapter rated 2, 3 or 4 A. Neither has a built-in battery, and neither maker says a USB power bank is supported, so plan on the supplied adapter.",
    },
    {
      question: "Which one has more automatic measurements?",
      answer:
        "The HANMATEK DOS1102, with 30 automatic measurements and a customizable measurement menu, plus a 6-digit hardware frequency counter rated 2 Hz to 20 MHz on its Amazon listing. FNIRSI lists 12 automatic parameters for the 1014D, along with cursors, FFT and X-Y mode.",
    },
    {
      question: "Which is better for a beginner?",
      answer:
        "Usually the FNIRSI 1014D, because a beginner rarely owns a function generator and the built-in one lets you practice on known signals. Pick the DOS1102 if you are learning on real repair work, where measurements, a frequency counter and current-probe scaling get used more than a test signal.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "HANMATEK DOS1102 vs Hantek DSO2C10", href: "/oscilloscopes/hanmatek-dos1102-vs-hantek-dso2c10" },
    { label: "FNIRSI 1014D vs OWON SDS1102", href: "/oscilloscopes/fnirsi-1014d-vs-owon-sds1102" },
    { label: "Hantek DSO2C10 vs FNIRSI 1014D", href: "/oscilloscopes/hantek-dso2c10-vs-fnirsi-1014d" },
    { label: "FNIRSI 1014D vs Rigol DS1202Z-E", href: "/oscilloscopes/fnirsi-1014d-vs-rigol-ds1202z-e" },
    { label: "Rigol DHO804 vs FNIRSI 1014D", href: "/oscilloscopes/rigol-dho804-vs-fnirsi-1014d" },
    { label: "FNIRSI 1013D Plus vs FNIRSI 1014D", href: "/oscilloscopes/fnirsi-1013d-plus-vs-fnirsi-1014d" },
    { label: "Best oscilloscopes for electronics repair", href: "/oscilloscopes/best-oscilloscopes-for-electronics-repair" },
    { label: "Oscilloscope sample rate explained", href: "/oscilloscopes/oscilloscope-sample-rate-explained" },
  ],
};

export default function HanmatekDos1102VsFnirsi1014dPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
