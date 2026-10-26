import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// FNIRSI DPOS350P: 350MHz, 2 channels, 1 GSa/s, 50,000 wfm/s refresh, 1ns rise time, 8-16bit high-res mode, 50MHz
// DDS generator (14 waveforms + custom, 50MHz sine/10MHz square), 350MHz spectrum analyzer (200kHz-350MHz FFT, 32K
// points, 3D waterfall), 50MHz frequency response analyzer (100Hz-50MHz sweep), 7" 1024x600 touchscreen. Matching
// this site's existing DPOS350P Pick, per the official Amazon listing (B0F6K8H5CT, manufacturer FNIRSI) (checked
// 2026-10-24). Memory depth and input ratings were not in that sourcing (fnirsi.com returned HTTP 429 on 2026-10-26).
// FNIRSI 1014D per https://www.fnirsi.com/products/1014d (spec tables, checked 2026-10-24): 100MHz, 2 channels,
// 1 GSa/s (per-channel rate with both on not stated), 8-bit, 7" 800x480, memory written as "240Kbit", rise time <3 ns,
// 1 MOhm input, AC/DC coupling, timebase to 10 ns/div, max test voltage 40 V (1X probe) / 400 V (10X probe), DDS
// generator 2.5 Vpp, 14 standard signals + 1 custom, sine to 10 MHz, other waves to 2 MHz, custom to 1 MHz; FFT, X-Y,
// roll mode, USB export; 5 V adapter power. Amazon kit (B097T5NRTZ) adds two 1X/10X probes plus a P4100 100X probe.

const path = "/oscilloscopes/fnirsi-dpos350p-vs-fnirsi-1014d";

const dpos350p = picks.find((p) => p.name === "FNIRSI DPOS350P")!;
const t1014d = picks.find((p) => p.name === "FNIRSI 1014D")!;

export const metadata = buildMetadata({
  title: "FNIRSI DPOS350P vs 1014D: Which Offers More?",
  description:
    "FNIRSI DPOS350P vs 1014D: a 350 MHz 4-in-1 scope, generator, spectrum and frequency response analyzer against a simpler 100 MHz scope with a generator.",
  path: "/oscilloscopes/fnirsi-dpos350p-vs-fnirsi-1014d",
  image: dpos350p.image,
});

const link = "text-accent hover:underline";

// Log-frequency axis from 100 Hz to 1 GHz.
const AX0 = 116;
const AXW = 214;
const fx = (hz: number) => AX0 + ((Math.log10(hz) - 2) * AXW) / 7;

type Span = { from: number; to: number; text: string; strong?: boolean };
const COVERAGE: { label: string; dpos?: Span; t1014?: Span; note1014?: string }[] = [
  { label: "Scope bandwidth", dpos: { from: 100, to: 350e6, text: "to 350 MHz", strong: true }, t1014: { from: 100, to: 100e6, text: "to 100 MHz" } },
  { label: "Generator, sine", dpos: { from: 100, to: 50e6, text: "to 50 MHz", strong: true }, t1014: { from: 100, to: 10e6, text: "to 10 MHz" } },
  { label: "Spectrum analyzer", dpos: { from: 200e3, to: 350e6, text: "200 kHz–350 MHz", strong: true }, note1014: "FFT view only" },
  { label: "Freq. response sweep", dpos: { from: 100, to: 50e6, text: "100 Hz–50 MHz", strong: true }, note1014: "none" },
];

/** Frequency coverage of each built-in instrument, on a log axis, per the FNIRSI listing and spec tables. */
function CoverageDiagram() {
  const top = 30;
  const rowH = 44;
  const H = top + rowH * COVERAGE.length + 22;
  const ticks = [
    { hz: 1e3, t: "1k" },
    { hz: 1e4, t: "10k" },
    { hz: 1e5, t: "100k" },
    { hz: 1e6, t: "1M" },
    { hz: 1e7, t: "10M" },
    { hz: 1e8, t: "100M" },
    { hz: 1e9, t: "1G" },
  ];
  return (
    <svg
      viewBox={`0 0 340 ${H}`}
      className="w-full h-auto"
      role="img"
      aria-label="Diagram on a log frequency axis from 100 Hz to 1 GHz: the DPOS350P scope reaches 350 MHz against 100 MHz on the 1014D; its generator sine reaches 50 MHz against 10 MHz; only the DPOS350P has a spectrum analyzer from 200 kHz to 350 MHz and a frequency response sweep from 100 Hz to 50 MHz."
    >
      <rect x="6" y="6" width="10" height="7" rx="2" className="fill-accent" />
      <text x="20" y="13" fontSize="9" className="fill-foreground">DPOS350P</text>
      <rect x="76" y="6" width="10" height="7" rx="2" className="fill-muted" />
      <text x="90" y="13" fontSize="9" className="fill-foreground">1014D</text>
      {ticks.map((t) => (
        <g key={t.t}>
          <line x1={fx(t.hz)} x2={fx(t.hz)} y1={top - 6} y2={H - 18} className="stroke-border" strokeWidth="0.6" />
          <text x={fx(t.hz)} y={H - 6} fontSize="8.5" textAnchor="middle" className="fill-muted">
            {t.t}
          </text>
        </g>
      ))}
      <text x={AX0} y={H - 6} fontSize="8.5" textAnchor="middle" className="fill-muted">
        100
      </text>
      {COVERAGE.map((row, r) => {
        const y = top + rowH * r;
        return (
          <g key={row.label}>
            <text x="6" y={y + 16} fontSize="9.5" className="fill-foreground">
              {row.label}
            </text>
            {row.dpos && (
              <g>
                <rect x={fx(row.dpos.from)} y={y + 4} width={fx(row.dpos.to) - fx(row.dpos.from)} height="12" rx="3" className="fill-accent" />
                <text x={fx(row.dpos.to) - 3} y={y + 13.5} fontSize="8" textAnchor="end" fill="#ffffff">
                  {row.dpos.text}
                </text>
              </g>
            )}
            {row.t1014 ? (
              <g>
                <rect x={fx(row.t1014.from)} y={y + 21} width={fx(row.t1014.to) - fx(row.t1014.from)} height="12" rx="3" className="fill-muted" />
                <text x={fx(row.t1014.to) - 3} y={y + 30.5} fontSize="8" textAnchor="end" fill="#ffffff">
                  {row.t1014.text}
                </text>
              </g>
            ) : (
              <text x={AX0 + 2} y={y + 31} fontSize="8.5" className="fill-muted">
                1014D: {row.note1014}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "FNIRSI DPOS350P vs 1014D: Which Model Offers More?",
  path,
  published: "2026-10-25",
  updated: "2026-10-26",
  intro:
    "Both are FNIRSI benchtop-style scopes with two channels, 1 GSa/s and a built-in signal generator, but the DPOS350P is a considerably more ambitious instrument: 3.5 times the bandwidth, a generator that reaches five times higher, and two extra instruments, a spectrum analyzer and a frequency response analyzer, on the same touchscreen. The 1014D is the simpler, longer-established option with a bundled high-voltage probe.",
  a: {
    pick: dpos350p,
    imageAlt: "FNIRSI DPOS350P 4-in-1 oscilloscope, generator, spectrum analyzer and frequency response analyzer, front view",
    chooseIf: [
      "You need more bandwidth: 350 MHz against the 1014D's 100 MHz",
      "You want a spectrum analyzer and frequency response analyzer built in",
      "You want a stronger generator (up to 50 MHz sine vs 10 MHz)",
      "You're comfortable with a new, more complex device without a long independent track record",
    ],
  },
  b: {
    pick: t1014d,
    imageAlt: "FNIRSI 1014D two-channel 100 MHz benchtop oscilloscope with signal generator, front view",
    chooseIf: [
      "100 MHz bandwidth comfortably covers your signals",
      "You want a simpler device with a shorter learning curve",
      "You want the bundled probe kit (two 1X/10X probes plus a 100X HV probe)",
      "You'd rather buy the lower-complexity, lower-cost option",
    ],
  },
  extraSpecs: [
    { label: "Bandwidth", a: "350MHz", b: "100MHz" },
    { label: "Channels", a: "2", b: "2" },
    { label: "Sample rate", a: "1 GSa/s", b: "1 GSa/s (2-channel rate not stated)" },
    { label: "Vertical resolution", a: "8–16 bit high-res mode", b: "8-bit" },
    { label: "Waveform refresh rate", a: "50,000 wfm/s", b: "Not stated" },
    { label: "Rise time (maker figure)", a: "1 ns", b: "<3 ns" },
    { label: "Signal generator", a: "14 waveforms + custom, up to 50MHz sine / 10MHz square", b: "14 standard + 1 custom, 2.5 Vpp; sine to 10MHz, others to 2MHz" },
    { label: "Spectrum analyzer", a: "200kHz–350MHz FFT, 32K points, 3D waterfall", b: "FFT display mode only" },
    { label: "Frequency response analyzer", a: "100Hz–50MHz sweep", b: "None" },
    { label: "Display", a: "7-inch, 1024 × 600, touchscreen", b: "7-inch, 800 × 480" },
    { label: "Memory", a: "Not stated in our sourcing", b: "Quoted by FNIRSI as \"240Kbit\"" },
    { label: "Max test voltage", a: "Not stated in our sourcing", b: "40 V (1X probe), 400 V (10X probe)" },
    { label: "Included probes", a: "Not stated in our sourcing", b: "Two 1X/10X probes plus a P4100 100X HV probe (Amazon kit)" },
  ],
  differences: [
    "Bandwidth: 350 MHz on the DPOS350P against 100 MHz on the 1014D, 3.5 times more.",
    "Extra instruments: only the DPOS350P includes a spectrum analyzer and a frequency response analyzer alongside the oscilloscope and generator. The 1014D is scope-plus-generator, with an FFT display mode on the scope.",
    "Generator: the DPOS350P's 50 MHz sine / 10 MHz square output is five times the 1014D's 10 MHz sine / 2 MHz other-waveform generator.",
    "Speed figures: FNIRSI quotes a 1 ns rise time and 50,000 wfm/s for the DPOS350P, and a rise time under 3 ns for the 1014D with no refresh rate stated.",
    "Both share the same 1 GSa/s peak sample rate and two-channel count.",
    "Maturity: the 1014D is the longer-established model; the DPOS350P is newer, with no independent long-term reviews yet. Neither has been tested hands-on by OhmSavvy.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          The DPOS350P leads on nearly every scope-side spec and adds two instruments the 1014D doesn&apos;t have at all.
          The charts focus on the numbers that separate them most: bandwidth, generator reach and the rise time FNIRSI
          quotes for each front end.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Bandwidth: the DPOS350P offers 3.5 times the 1014D&apos;s rated bandwidth.</>}>
            <BarChart
              items={[
                { label: "DPOS350P", value: 350, display: "350 MHz", highlight: true },
                { label: "1014D", value: 100, display: "100 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Generator sine-wave output: the DPOS350P reaches five times higher.</>}>
            <BarChart
              items={[
                { label: "DPOS350P, sine", value: 50, display: "50 MHz", highlight: true },
                { label: "1014D, sine", value: 10, display: "10 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Generator square-wave output: 10 MHz against 2 MHz.</>}>
            <BarChart
              items={[
                { label: "DPOS350P, square", value: 10, display: "10 MHz", highlight: true },
                { label: "1014D, square", value: 2, display: "2 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Rise time as quoted by FNIRSI. Lower is faster; the 1014D figure is an upper limit (&quot;&lt;3 ns&quot;).</>}>
            <BarChart
              items={[
                { label: "DPOS350P", value: 1, display: "1 ns", highlight: true },
                { label: "1014D", value: 3, display: "<3 ns" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Those rise-time figures line up with the bandwidths. The common approximation is rise time ≈ 0.35 ÷
          bandwidth, which gives about 1 ns at 350 MHz and 3.5 ns at 100 MHz; FNIRSI&apos;s &lt;3 ns claim for the 1014D
          is slightly better than that rule of thumb, so treat it as the maker&apos;s figure rather than a measured one. In
          practice, a logic edge of around 2 ns will look close to true on the DPOS350P and visibly slowed on the 1014D.
          For more on how bandwidth limits edges, see{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            what oscilloscope bandwidth is
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each built-in instrument covers</h2>
        <p className="text-muted leading-7 mb-4">
          A four-in-one box is easier to judge when you lay its instruments out on one frequency axis. The diagram below
          does that on a log scale from 100 Hz to 1 GHz, using FNIRSI&apos;s published ranges. The 1014D appears only where
          it has an equivalent function.
        </p>
        <Figure
          caption={
            <>
              Frequency coverage of each instrument, log scale. The DPOS350P&apos;s spectrum analyzer and frequency response
              sweep have no counterpart on the 1014D.
            </>
          }
        >
          <CoverageDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Two things stand out. First, the DPOS350P&apos;s generator reaches 50 MHz, which means it can drive a test signal
          right into the range where its scope still has 7x headroom; the 1014D&apos;s 10 MHz sine sits ten times below its
          own 100 MHz bandwidth, which is fine for audio, sensor and filter work but not for checking anything near the
          scope&apos;s upper end. Second, the frequency response analyzer covers 100 Hz to 50 MHz, exactly the span its
          generator can produce. That makes sense: a frequency response analyzer is a generator and a scope working
          together, stepping a sine through a range of frequencies and plotting how much comes out of the circuit at each
          step.
        </p>
        <p className="text-muted leading-7 mt-4">
          On the 1014D you can do the same job by hand: set the generator to a frequency, read the input and output
          amplitudes on channels 1 and 2, work out the ratio, then move to the next frequency. For a simple RC low-pass
          filter with a 1.6 kHz corner (1 kΩ and 100 nF, since f = 1 ÷ 2πRC), ten manual points across 100 Hz to 100 kHz
          take a few minutes and show the roll-off clearly. The DPOS350P automates that sweep and draws the curve, which
          matters once you are tuning a filter and want to see the change after every component swap.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">FNIRSI DPOS350P vs 1014D: which model offers more?</h2>
        <p className="text-muted leading-7 mb-4">
          On raw capability the DPOS350P wins almost every category. The real question is whether you need that
          capability, or whether it adds cost and complexity you won&apos;t use.
        </p>
        <h3 className="text-lg font-semibold mb-2">If you need more than a scope and a basic generator: the DPOS350P</h3>
        <p className="text-muted leading-7 mb-4">
          RF and EMI troubleshooting benefits directly from a built-in spectrum analyzer: a switching regulator&apos;s
          harmonics, a noisy clock or an unwanted oscillation show up as peaks you can identify by frequency. Testing
          filters or amplifiers is easier with a frequency response analyzer that sweeps and plots the result
          automatically. If your bench work touches any of that, the DPOS350P replaces what would otherwise be several
          separate instruments, and its 1024 × 600 touchscreen gives those extra views more room than the 1014D&apos;s 800 ×
          480 panel.
        </p>
        <h3 className="text-lg font-semibold mb-2">If you just need a straightforward scope with a generator: the 1014D</h3>
        <p className="text-muted leading-7 mb-4">
          For general electronics work, such as checking a microcontroller signal, driving a simple filter or basic
          debugging, the 1014D&apos;s 100 MHz and 10 MHz generator cover the job without the DPOS350P&apos;s added
          complexity, learning curve or unproven track record. Its Amazon kit also includes a P4100 100X probe, the
          accessory you need before looking at anything above the 400 V FNIRSI lists for a 10X probe.
        </p>
        <KeyIdea title="More instruments mean more to learn">
          A four-in-one device like the DPOS350P packs real capability into one touchscreen, but each extra instrument is
          its own thing to learn to use well: a spectrum analyzer has resolution bandwidth and span settings, and a
          frequency response sweep needs sensible start, stop and amplitude values. If you won&apos;t use those two
          instruments, the simpler 1014D may serve you better day to day, not just at a lower price.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Better fit", "Why"]}
          rows={[
            ["RF/EMI troubleshooting or filter/amplifier testing", "FNIRSI DPOS350P", "Built-in spectrum and frequency response analyzers"],
            ["Signals approaching or above 30 MHz", "FNIRSI DPOS350P", "350 MHz keeps 3–5x headroom where the 1014D runs out"],
            ["General electronics debugging, nothing exotic", "FNIRSI 1014D", "Covers the job without extra complexity"],
            ["Want a high-voltage probe in the box", "FNIRSI 1014D", "Amazon kit includes a P4100 100X probe"],
            ["Want the longer-established model", "FNIRSI 1014D", "The DPOS350P is new, with no long-term reviews yet"],
            ["Need a test signal above 10 MHz", "FNIRSI DPOS350P", "50 MHz sine vs 10 MHz"],
            ["Learning scope basics first", "FNIRSI 1014D", "Fewer modes to learn before the scope makes sense"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Want to see the 1014D against a Hantek alternative instead? See{" "}
          <Link href="/oscilloscopes/hantek-dso2c10-vs-fnirsi-1014d" className={link}>
            Hantek DSO2C10 vs FNIRSI 1014D
          </Link>{" "}
          or{" "}
          <Link href="/oscilloscopes/hantek-dso2d15-vs-fnirsi-1014d" className={link}>
            Hantek DSO2D15 vs FNIRSI 1014D
          </Link>
          , and for a name-brand 12-bit option,{" "}
          <Link href="/oscilloscopes/rigol-dho804-vs-fnirsi-1014d" className={link}>
            Rigol DHO804 vs FNIRSI 1014D
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
        <div className="mt-4 space-y-4">
          <Callout title="The DPOS350P is a newer, unproven entrant">
            Unlike the 1014D, the DPOS350P is a new product without independent long-term reviews yet, and our sourcing
            doesn&apos;t state its memory depth or input voltage limits. Its feature set on paper is strong, but factor
            that uncertainty into the decision if you&apos;re risk-averse about buying something newer.
          </Callout>
          <Callout title="Mains and high voltage">
            FNIRSI lists the 1014D&apos;s maximum test voltage as 40 V with a 1X probe and 400 V with a 10X probe. Those
            are input limits, not a safety rating for mains work. Don&apos;t clip either scope&apos;s ground lead to a
            mains-referenced point; use a differential probe for offline power supplies and leave building wiring to a
            licensed electrician.
          </Callout>
        </div>
      </section>
    </>
  ),
  bottomLine:
    "The FNIRSI DPOS350P outclasses the 1014D on nearly every spec: 3.5 times the bandwidth, a generator that reaches five times higher, and a spectrum analyzer and frequency response analyzer the 1014D doesn't have. But it's also newer, more complex and less proven. Choose the DPOS350P if you'll actually use that extra capability; choose the simpler, longer-established 1014D if a straightforward 100 MHz scope with a basic generator covers your work.",
  faqs: [
    {
      question: "Is the FNIRSI DPOS350P strictly better than the 1014D?",
      answer:
        "On documented specs, yes: 350 MHz against 100 MHz, a 50 MHz generator against 10 MHz, and a spectrum analyzer and frequency response analyzer the 1014D doesn't have. The trade-offs are more complexity, a shorter track record, and no stated memory depth or input limits in the sourcing we verified.",
    },
    {
      question: "Does the FNIRSI 1014D have a spectrum analyzer?",
      answer:
        "Not as a separate instrument. FNIRSI lists an FFT mode on the 1014D, which shows the frequency content of a captured waveform, alongside X-Y and roll modes. A dedicated spectrum analyzer with a 200 kHz to 350 MHz range, 32K-point FFT and a 3D waterfall display is only on the DPOS350P.",
    },
    {
      question: "Which comes with a better accessory kit?",
      answer:
        "The 1014D's Amazon kit is the better documented: two 1X/10X probes plus a P4100 100X high-voltage probe. The DPOS350P's included accessories weren't stated in the sourcing we verified, so check the current listing's package contents before buying if probes matter to you.",
    },
    {
      question: "Is the DPOS350P a good choice for a first oscilloscope?",
      answer:
        "It can be, but its four-instrument feature set has a steeper learning curve than the simpler 1014D. If you're new to oscilloscopes and don't yet need a spectrum analyzer or frequency response analyzer, the 1014D lets you learn triggering, timebase and probing with fewer menus in the way.",
    },
    {
      question: "What is a frequency response analyzer used for?",
      answer:
        "It measures how a circuit's output changes with frequency. The analyzer feeds a sine into the circuit, steps it across a range, 100 Hz to 50 MHz on the DPOS350P, and plots output against input at each step. That shows a filter's corner frequency or an amplifier's usable bandwidth without taking readings by hand.",
    },
    {
      question: "Can the FNIRSI 1014D measure 120 V mains?",
      answer:
        "Not safely as a beginner. FNIRSI lists 400 V maximum with a 10X probe, and the kit includes a 100X probe, but the scope's ground clip still connects to whatever it touches. Clipping it to a mains-referenced point can cause a short. Use a differential probe or an isolated setup, and leave building wiring to an electrician.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "Hantek DSO2C10 vs FNIRSI 1014D", href: "/oscilloscopes/hantek-dso2c10-vs-fnirsi-1014d" },
    { label: "Hantek DSO2D15 vs FNIRSI 1014D", href: "/oscilloscopes/hantek-dso2d15-vs-fnirsi-1014d" },
    { label: "Rigol DHO804 vs FNIRSI 1014D", href: "/oscilloscopes/rigol-dho804-vs-fnirsi-1014d" },
    { label: "FNIRSI 1013D Plus vs FNIRSI 1014D", href: "/oscilloscopes/fnirsi-1013d-plus-vs-fnirsi-1014d" },
    { label: "Hantek 1008C vs Hantek DSO2C10", href: "/oscilloscopes/hantek-1008c-vs-hantek-dso2c10" },
    { label: "OWON HDS272S vs FNIRSI 2C53T", href: "/oscilloscopes/owon-hds272s-vs-fnirsi-2c53t" },
  ],
};

export default function FnirsiDpos350pVsFnirsi1014dPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
