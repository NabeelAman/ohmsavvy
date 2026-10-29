// Specs per maker, checked 2026-10-26 unless noted:
// - Hantek 2D72 per Hantek's Hantek2000 series page: https://www.hantek.com/products/detail/13174
//   (70 MHz; 250 MSa/s single, 125 MSa/s dual; record 6K single, 3K per channel dual; 8-bit; 10 mV/div to 10 V/div;
//   rise time ≤5 ns typical; max input 150 Vrms; timebase 5 ns/div to 500 s/div; AWG 1 channel: sine 1 Hz–25 MHz,
//   square 1 Hz–10 MHz, ramp 1 Hz–1 MHz, EXP 1 Hz–5 MHz, 2.5 Vpp into 50 Ω / 5 Vpp high impedance, 12-bit;
//   DMM 4,000 counts, 600 V AC/DC, 10 A AC/DC; 2.8-inch 320 × 240; battery 2600 mAh × 2; 199 × 98 × 40 mm; 624 g).
//   Hantek's Amazon listing says the package contains no lithium batteries (per this site's Pick).
// - FNIRSI 2C53T per https://www.fnirsi.com/products/2c53t (checked 2026-10-24, as recorded on this site's Pick and
//   the FNIRSI 2C53T vs 1014D page): 50 MHz, 250 MS/s, 1 Kpts, ±400 V max measured voltage, timebase 10 ns–20 s;
//   meter 19,999 counts True RMS, DC 1000 V, AC 750 V, current to 9.999 A, resistance to 19.999 MΩ, capacitance to
//   99.99 mF, temperature, diode, continuity; generator 13 waveforms, 0–50 kHz, 0–3 V; 2.8-inch 320 × 240;
//   3,000 mAh, up to 6 h; USB-C 5 V/1 A charging; 167 × 89 × 35 mm; 300 g. Vertical resolution not stated.
// Effective sample-rate figures below are record length divided by time on screen, not measurements.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t";

export const metadata = buildMetadata({
  title: "Hantek 2D72 vs FNIRSI 2C53T",
  description:
    "Hantek 2D72 vs FNIRSI 2C53T: two handheld 3-in-1 scope, multimeter and generator tools compared on bandwidth, record length, meter counts and weight.",
  path: "/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t",
});

const link = "text-accent hover:underline";

const BLOCKS: { name: string; hantek: string; fnirsi: string; winner: "h" | "f" }[] = [
  { name: "Oscilloscope", hantek: "70 MHz · 6K record", fnirsi: "50 MHz · 1K record", winner: "h" },
  { name: "Multimeter", hantek: "4,000 counts · 600 V", fnirsi: "19,999 counts · True RMS", winner: "f" },
  { name: "Generator", hantek: "Sine to 25 MHz", fnirsi: "13 waves to 50 kHz", winner: "h" },
  { name: "Carrying", hantek: "624 g · 199 × 98 × 40 mm", fnirsi: "300 g · 167 × 89 × 35 mm", winner: "f" },
];

/** Three instruments in one box: which maker put its effort where. */
function ThreeInOneDiagram() {
  const rowH = 44;
  const top = 30;
  return (
    <svg
      viewBox={`0 0 360 ${top + rowH * BLOCKS.length + 6}`}
      className="w-full h-auto"
      role="img"
      aria-label="Diagram: the Hantek 2D72 is stronger in the oscilloscope section (70 MHz, 6K record) and generator (sine to 25 MHz); the FNIRSI 2C53T is stronger in the multimeter (19,999 counts, True RMS) and in weight and size (300 g)"
    >
      <text x="150" y="18" fontSize="11" fontWeight="700" textAnchor="middle" className="fill-foreground">Hantek 2D72</text>
      <text x="290" y="18" fontSize="11" fontWeight="700" textAnchor="middle" className="fill-foreground">FNIRSI 2C53T</text>
      {BLOCKS.map((b, i) => {
        const y = top + i * rowH;
        return (
          <g key={b.name}>
            <text x="6" y={y + 24} fontSize="10" fontWeight="600" className="fill-muted">
              {b.name}
            </text>
            <rect
              x="86"
              y={y + 4}
              width="128"
              height={rowH - 10}
              rx="7"
              strokeWidth="1.4"
              className={b.winner === "h" ? "fill-accent/15 stroke-accent" : "fill-surface stroke-border"}
            />
            <text x="150" y={y + 25} fontSize="9" textAnchor="middle" className={b.winner === "h" ? "fill-accent" : "fill-foreground"}>
              {b.hantek}
            </text>
            <rect
              x="226"
              y={y + 4}
              width="128"
              height={rowH - 10}
              rx="7"
              strokeWidth="1.4"
              className={b.winner === "f" ? "fill-accent/15 stroke-accent" : "fill-surface stroke-border"}
            />
            <text x="290" y={y + 25} fontSize="9" textAnchor="middle" className={b.winner === "f" ? "fill-accent" : "fill-foreground"}>
              {b.fnirsi}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Hantek 2D72 vs FNIRSI 2C53T",
  path,
  published: "2026-10-22",
  updated: "2026-10-26",
  intro:
    "Hantek 2D72 vs FNIRSI 2C53T compares two battery-powered handhelds that each combine a two-channel oscilloscope, a multimeter and a signal generator behind a 2.8-inch 320 × 240 screen. The Hantek has the stronger scope and generator; the FNIRSI has the far better multimeter and weighs half as much.",
  a: {
    pick: picks.find((p) => p.name === "Hantek 2D72")!,
    imageAlt: "Hantek 2D72 handheld oscilloscope, multimeter and signal generator",
    chooseIf: [
      "You need a usable signal generator: sine output to 25 MHz",
      "70 MHz of bandwidth and a 6K record matter more than meter resolution",
      "You want a fold-out stand for bench use",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "FNIRSI 2C53T")!,
    imageAlt: "FNIRSI 2C53T handheld oscilloscope multimeter with blue trim",
    chooseIf: [
      "The multimeter is your main tool: 19,999 counts and True RMS",
      "You want the lightest kit at 300 g with a built-in 3,000 mAh battery",
      "Your scope work stays at audio and low-frequency signals",
    ],
  },
  extraSpecs: [
    { label: "Sample rate, 2 channels", a: "125 MSa/s", b: "Not stated separately" },
    { label: "Record length", a: "6K (1 ch); 3K per channel (2 ch)", b: "1 Kpts" },
    { label: "Vertical resolution", a: "8-bit", b: "Not stated by FNIRSI" },
    { label: "Vertical scale", a: "10 mV/div to 10 V/div", b: "Not stated in the same form" },
    { label: "Timebase", a: "5 ns/div to 500 s/div", b: "10 ns to 20 s" },
    { label: "Scope max input", a: "150 Vrms", b: "±400 V" },
    { label: "Signal generator", a: "Sine to 25 MHz, square to 10 MHz", b: "13 waveforms, up to 50 kHz" },
    { label: "Generator amplitude", a: "2.5 Vpp into 50 Ω; 5 Vpp high-Z", b: "0 to 3 V" },
    { label: "Multimeter", a: "4,000 counts; 600 V AC/DC; 10 A", b: "19,999 counts, True RMS; 1000 V DC, 750 V AC; 9.999 A" },
    { label: "Screen", a: "2.8-inch, 320 × 240", b: "2.8-inch, 320 × 240" },
    { label: "Size / weight", a: "199 × 98 × 40 mm, 624 g", b: "167 × 89 × 35 mm, 300 g" },
    { label: "Battery", a: "2 × 2,600 mAh per Hantek; listing says none included", b: "Built-in 3,000 mAh, up to 6 h" },
  ],
  differences: [
    "The Hantek reaches 70 MHz against the FNIRSI's 50 MHz; both quote 250 MSa/s.",
    "The Hantek's generator runs a sine wave to 25 MHz; the FNIRSI's stops at 50 kHz.",
    "The FNIRSI's multimeter is 19,999-count True RMS and reads to 1000 V DC; the Hantek's is 4,000-count and stops at 600 V.",
    "The Hantek records 6K samples on one channel against the FNIRSI's 1 Kpts.",
    "The FNIRSI weighs 300 g against the Hantek's 624 g.",
    "Hantek's website lists two 2,600 mAh lithium batteries, while its Amazon listing says the package has none; check before you buy.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">At a glance</h2>
        <InfoCards
          items={[
            { label: "Same screen", desc: "2.8-inch, 320 × 240, two scope channels at 250 MSa/s headline." },
            { label: "Hantek extra: generator", desc: "Sine to 25 MHz, 500 times the FNIRSI's 50 kHz ceiling." },
            { label: "Hantek extra: record", desc: "6K samples on one channel against 1K." },
            { label: "FNIRSI extra: meter", desc: "19,999 counts, True RMS, 1000 V DC." },
            { label: "FNIRSI extra: weight", desc: "300 g, under half the Hantek's 624 g." },
            { label: "Verdict", desc: "Signals and generator: Hantek. Meter-first field work: FNIRSI." },
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Hantek 2D72 vs FNIRSI 2C53T spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          These numbers show how differently the makers balanced their 3-in-1 designs. Hantek spent its budget on the
          scope and generator; FNIRSI on the meter and the battery. Both headline 250 MSa/s, but the Hantek halves to
          125 MSa/s per channel with both channels on, and FNIRSI doesn&apos;t publish a two-channel figure.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Highest generator frequency, log scale: the Hantek reaches 500 times higher.</>}>
            <BarChart
              log
              items={[
                { label: "Hantek 2D72", value: 25000000, display: "25 MHz", highlight: true },
                { label: "FNIRSI 2C53T", value: 50000, display: "50 kHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Multimeter display counts: the FNIRSI resolves about five times more steps.</>}>
            <BarChart
              items={[
                { label: "FNIRSI 2C53T", value: 19999, display: "19,999 counts", highlight: true },
                { label: "Hantek 2D72", value: 4000, display: "4,000 counts" },
              ]}
            />
          </Figure>
          <Figure caption={<>Scope record length, single channel, in samples.</>}>
            <BarChart
              items={[
                { label: "Hantek 2D72", value: 6000, display: "6K", highlight: true },
                { label: "FNIRSI 2C53T", value: 1000, display: "1K" },
              ]}
            />
          </Figure>
          <Figure caption={<>Weight in grams, per each maker&apos;s spec page.</>}>
            <BarChart
              items={[
                { label: "FNIRSI 2C53T", value: 300, display: "300 g", highlight: true },
                { label: "Hantek 2D72", value: 624, display: "624 g" },
              ]}
            />
          </Figure>
        </div>
        <div className="mt-4">
          <Figure caption={<>Where each maker put its effort. Shaded boxes are the stronger side of each section.</>}>
            <ThreeInOneDiagram />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Why record length limits both</h2>
        <p className="text-muted leading-7 mb-4">
          A scope fills its record across the time on screen, so the real sample rate is record length divided by that
          time, capped at the headline rate. Short records mean the 250 MSa/s figure only applies on the fastest
          timebases. The table works it through for one channel.
        </p>
        <DataTable
          head={["Time on screen", "Hantek 2D72 (6K)", "FNIRSI 2C53T (1K)"]}
          rows={[
            ["10 µs", "250 MSa/s (capped)", "100 MSa/s"],
            ["1 ms", "6 MSa/s", "1 MSa/s"],
            ["10 ms", "600 kSa/s", "100 kSa/s"],
            ["100 ms", "60 kSa/s", "10 kSa/s"],
          ]}
          mono={[1, 2]}
        />
        <p className="text-muted leading-7 mt-4">
          At 10 ms on screen, about half a cycle of 50 Hz mains, the FNIRSI samples at about 100 kSa/s,
          which still draws a 1 kHz tone with 100 points per cycle but can&apos;t show a 1 MHz switching edge. The
          Hantek is six times better there, yet both fall far behind a benchtop with millions of points.
        </p>
        <div className="mt-4">
          <KeyIdea title="Short records limit handhelds">
            With 1K to 6K samples, both scopes must slow their sampling on long timebases. For serious waveform
            work a benchtop is still better; see{" "}
            <Link href="/oscilloscopes/oscilloscope-vs-multimeter" className={link}>
              oscilloscope vs multimeter
            </Link>{" "}
            for when each tool earns its place.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Hantek 2D72 vs FNIRSI 2C53T: which should you buy?</h2>
        <DataTable
          head={["Job", "Better fit", "Why"]}
          rows={[
            ["Testing filters and amplifiers with a signal", "Hantek 2D72", "Generator to 25 MHz, 2.5 Vpp into 50 Ω"],
            ["Electrical and battery measurements", "FNIRSI 2C53T", "19,999-count True RMS meter"],
            ["Glancing at a PWM or sensor signal in the field", "Either", "Both are two-channel at 250 MSa/s"],
            ["Carrying in a small tool bag", "FNIRSI 2C53T", "300 g against 624 g"],
            ["Car sensor and injector waveforms", "Hantek 2D72", "Longer record holds more of a slow signal"],
            ["Audio tone and speaker checks", "Either", "Both generators cover the audio band"],
            ["Reading 800 V DC on a solar string", "FNIRSI 2C53T", "Meter reads to 1000 V DC; the Hantek stops at 600 V"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Use cases in practice</h2>
        <p className="text-muted leading-7 mb-4">
          If your day starts with a multimeter, the FNIRSI makes more sense. Its 19,999-count True RMS meter handles
          distorted waveforms from drives and switching supplies better than an average-responding meter, and its 3,000 mAh battery is built in, so there is nothing to
          source separately. The scope is a backup for a quick look at a signal rather than a debugging tool.
        </p>
        <p className="text-muted leading-7 mb-4">
          If your day starts with signals, the Hantek is the better kit. A generator that reaches 25 MHz can sweep a
          filter or drive an amplifier input, and 70 MHz with a 5 ns rise time shows faster edges than the FNIRSI&apos;s
          50 MHz. Our guide to{" "}
          <Link href="/oscilloscopes/how-to-use-oscilloscope-bandwidth-measurement-for-an-amplifier" className={link}>
            measuring an amplifier&apos;s bandwidth
          </Link>{" "}
          shows the job where a wide-range generator pays off.
        </p>
        <p className="text-muted leading-7">
          For car work, see our{" "}
          <Link href="/oscilloscopes/best-oscilloscopes-for-automotive-diagnostics" className={link}>
            best oscilloscopes for automotive diagnostics
          </Link>
          , and for another FNIRSI handheld matchup, see{" "}
          <Link href="/oscilloscopes/owon-hds272s-vs-fnirsi-2c53t" className={link}>
            OWON HDS272S vs FNIRSI 2C53T
          </Link>
          .
        </p>
      </section>

      <Callout title="Safety: check the input limits before probing mains">
        Hantek lists 150 Vrms as the 2D72&apos;s maximum scope input, and FNIRSI quotes ±400 V for the 2C53T, but neither
        spec page we checked gives a CAT rating. Mains peaks about 170 V on a 120 V circuit, which is beyond the
        Hantek&apos;s scope input. Use the multimeter inputs for mains voltage, never the scope probes, keep to the
        meter&apos;s stated limits, and call a licensed electrician for anything in a panel.
      </Callout>
    </>
  ),
  bottomLine:
    "Buy the Hantek 2D72 if the scope and signal generator are the point: more bandwidth, a longer record and a generator that reaches 25 MHz. Buy the FNIRSI 2C53T if you mainly want a high-resolution True RMS multimeter with a basic scope attached, in a lighter package.",
  chooseNeitherIf:
    "You need to probe mains voltage directly: the 2D72's scope input is rated only 150 Vrms, below a 120 V outlet's peak, and FNIRSI gives no CAT rating for the 2C53T's ±400 V scope input either — use a meter's rated inputs for mains, not either scope's probes.",
  faqs: [
    {
      question: "Which handheld has the better multimeter?",
      answer:
        "The FNIRSI 2C53T. FNIRSI lists a 19,999-count True RMS meter that reads to 1000 V DC and 750 V AC, with current to 9.999 A, capacitance and temperature. Hantek lists a 4,000-count meter on the 2D72 with 600 V AC and DC and 10 A ranges, which covers basic checks but resolves about five times fewer steps.",
    },
    {
      question: "Does the Hantek 2D72 come with batteries?",
      answer:
        "Sources disagree. Hantek's site lists two 2,600 mAh lithium cells, while the Hantek-store Amazon listing says the package contains no lithium batteries. Check the listing's package contents before ordering, and buy matching cells if they aren't included. The FNIRSI has its battery built in.",
    },
    {
      question: "Can either scope measure mains voltage on its scope input?",
      answer:
        "Not the Hantek: its scope input is rated 150 Vrms, below the roughly 170 V peak of a 120 V outlet. FNIRSI lists ±400 V on the 2C53T's scope input but no CAT rating. Measure mains on the multimeter inputs instead; our mains frequency guide covers safer ways to view it.",
    },
    {
      question: "Which is better for audio work?",
      answer:
        "Both cover audio frequencies on the scope side, and both generators produce test tones across the audible range. The Hantek's generator goes far beyond audio, to 25 MHz on sine, and its 6K record holds more cycles of a low tone. The FNIRSI's generator reaches 50 kHz, which is still enough for speaker and amplifier checks.",
    },
    {
      question: "Do they have the same screen?",
      answer:
        "Yes, both use a 2.8-inch, 320 × 240 color display. That is small for waveform work, so neither shows fine detail the way a 7-inch benchtop does. The Hantek adds a fold-out stand for bench use, while the FNIRSI is the smaller body at 167 × 89 × 35 mm against 199 × 98 × 40 mm.",
    },
  ],
  roundup: { label: "See the full oscilloscope roundup", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "FNIRSI 2C53T vs FNIRSI 1014D", href: "/oscilloscopes/fnirsi-2c53t-vs-fnirsi-1014d" },
    { label: "OWON HDS272S vs FNIRSI 2C53T", href: "/oscilloscopes/owon-hds272s-vs-fnirsi-2c53t" },
    { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
    { label: "How to measure mains frequency with an oscilloscope", href: "/oscilloscopes/how-to-measure-mains-frequency-with-an-oscilloscope" },
    { label: "FNIRSI DSO152 review", href: "/oscilloscopes/fnirsi-dso152-review" },
  ],
};

export default function Hantek2d72VsFnirsi2c53tPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
