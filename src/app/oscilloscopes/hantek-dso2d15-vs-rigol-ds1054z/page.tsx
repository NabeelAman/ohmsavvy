import Link from "@/components/AppLink";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Hantek DSO2D15: 150 MHz, rise time at BNC 2.4 ns, 2 channels, 1 GSa/s (1 ch) / 500 MSa/s (2 ch), 8 Mpts (1 ch) /
// 4 Mpts (2 ch), 8-bit with high-res mode up to 12-bit, 2 mV/div to 10 V/div, 2 ns/div to 100 s/div, 14 trigger types,
// RS232/UART, I2C, SPI, CAN, LIN decode, 1-channel generator (25 MHz sine, 10 MHz square/arbitrary), 300 V CAT II,
// 7-inch 800 x 480, <30 W, 1900 g, per http://www.hantek.com/products/detail/17182 (checked 2026-11-08).
// Rigol DS1054Z: 50 MHz, 4 channels, 1 GSa/s (1 ch) / 500 MSa/s (2 ch) / 250 MSa/s (3-4 ch), 24 Mpts (1 ch) / 12 Mpts
// (2 ch) / 6 Mpts (3-4 ch), calculated rise time 7 ns, 1 mV/div to 10 V/div, 5 ns/div to 50 s/div, 30,000 wfms/s,
// decoding Parallel, RS232/UART, I2C, SPI (2 buses), 7-inch 800 x 480, 3.2 kg, 313.1 x 160.8 x 122.4 mm, 100-240 V,
// 50 W max, three-year warranty, per Rigol's DS1000Z datasheet
// https://www.rigol.com/dam/global/downloads/brochures/en/data-sheet/oscilloscopes/DS1000Z_DataSheet_EN.pdf (checked
// 2026-11-08). Conflict: https://www.rigol.com/intl/products/oscilloscope/DS1000Z.html lists 12M standard / 24M
// optional memory and bus decode as an option (as recorded on this site's DS1054Z pages, checked 2026-10-24).
// DS1054Z is owner-tested (handsOnTested on its Pick); no test results are claimed here. Both ASINs buyable on
// Amazon.com at ZIP 10001 (checked 2026-11-08). The displayed-rise-time figures use the standard root-sum-of-squares
// approximation and are labeled as calculated.

const path = "/oscilloscopes/hantek-dso2d15-vs-rigol-ds1054z";
const d15 = picks.find((p) => p.name === "Hantek DSO2D15")!;
const ds1054z = picks.find((p) => p.name === "Rigol DS1054Z")!;

export const metadata = buildMetadata({
  title: "Hantek DSO2D15 vs Rigol DS1054Z: Speed or Inputs",
  description:
    "Hantek DSO2D15 vs Rigol DS1054Z: 150 MHz with a 2.4 ns rise time and a generator, or 4 channels at 50 MHz. We do the edge-timing math for both scopes.",
  path: "/oscilloscopes/hantek-dso2d15-vs-rigol-ds1054z",
  image: d15.image,
});

const link = "text-accent hover:underline";

/** How each scope draws the same 5 ns edge: the slower scope smears it out. */
function EdgeDiagram() {
  return (
    <svg
      viewBox="0 0 400 200"
      className="w-full h-auto"
      role="img"
      aria-label="Hantek DSO2D15 vs Rigol DS1054Z edge diagram: a logic edge that really rises in 5 nanoseconds is drawn by the 150 MHz Hantek DSO2D15 as about 5.5 nanoseconds and by the 50 MHz Rigol DS1054Z as about 8.6 nanoseconds, because each scope's own rise time adds to the signal's."
    >
      <path d="M40 160 H380" className="stroke-border" strokeWidth="1" />
      <path d="M40 40 H380" className="stroke-border" strokeWidth="1" strokeDasharray="3 3" />
      {[0, 5, 10, 15, 20].map((ns) => (
        <g key={ns}>
          <path d={`M${110 + ns * 12} 160 V165`} className="stroke-muted" strokeWidth="1" />
          <text x={110 + ns * 12} y="177" fontSize="8.5" textAnchor="middle" className="fill-muted">
            {ns} ns
          </text>
        </g>
      ))}
      <path d="M40 160 H110 L170 40 H380" className="stroke-foreground fill-none" strokeWidth="1.2" strokeDasharray="4 3" />
      <path d="M40 160 H104 C124 160 158 40 180 40 H380" className="stroke-accent fill-none" strokeWidth="2" />
      <path d="M40 160 H92 C130 160 180 40 222 40 H380" className="stroke-muted fill-none" strokeWidth="2" />
      <text x="230" y="70" fontSize="9" className="fill-foreground">dashed: real 5 ns edge</text>
      <text x="230" y="86" fontSize="9" className="fill-accent">DSO2D15 draws ≈ 5.5 ns</text>
      <text x="230" y="102" fontSize="9" className="fill-muted">DS1054Z draws ≈ 8.6 ns</text>
      <text x="40" y="194" fontSize="8.5" className="fill-muted">10–90% rise; calculated with the root-sum-of-squares rule, not a measurement</text>
      <text x="40" y="30" fontSize="8.5" className="fill-muted">logic high</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Hantek DSO2D15 vs Rigol DS1054Z",
  path,
  published: "2026-11-08",
  intro:
    "Hantek DSO2D15 vs Rigol DS1054Z is a trade between speed and inputs. The DSO2D15 is a two-channel, 150 MHz scope with a 2.4 ns rise time, a 25 MHz generator and CAN and LIN decoding. The DS1054Z has four channels at 50 MHz, a calculated 7 ns rise time and up to 24 Mpts of memory, and it is one of the scopes our owner has tested hands-on. This page works out how much each scope's own rise time distorts the edges you measure, then sorts the jobs where four inputs matter more.",
  a: {
    pick: d15,
    imageAlt: "Hantek DSO2D15 150 MHz two-channel oscilloscope with generator",
    chooseIf: [
      "You time edges faster than about 20 ns, such as fast logic or MOSFET gate drive",
      "You look at clocks above 10 MHz and want them drawn as squares",
      "You want a built-in signal source and CAN or LIN decoding",
      "Two channels cover what you probe at once",
    ],
  },
  b: {
    pick: ds1054z,
    imageAlt: "Rigol DS1054Z four-channel 50 MHz digital oscilloscope",
    chooseIf: [
      "You watch SPI clock, chip select and both data lines together",
      "You want deep memory, up to 24 Mpts on one channel per Rigol's datasheet",
      "You want a scope our owner has tested hands-on",
      "Your signals stay under about 10 MHz, which covers most hobby and repair work",
    ],
  },
  extraSpecs: [
    { label: "Rise time", a: "2.4 ns (at BNC, typical)", b: "7 ns (calculated, per Rigol)" },
    { label: "Sample rate, all channels on", a: "500 MSa/s (2 ch)", b: "250 MSa/s (3–4 ch)" },
    { label: "Memory depth", a: "8 Mpts (1 ch); 4 Mpts (2 ch)", b: "24 Mpts (1 ch); 6 Mpts (3–4 ch), datasheet; product page says 12M std" },
    { label: "Fastest timebase", a: "2 ns/div", b: "5 ns/div" },
    { label: "Most sensitive range", a: "2 mV/div", b: "1 mV/div" },
    { label: "Serial decoding", a: "UART, I2C, SPI, CAN, LIN", b: "Parallel, UART, I2C, SPI (option per product page)" },
    { label: "Built-in generator", a: "1 ch, 25 MHz sine", b: "None" },
    { label: "Weight", a: "1.9 kg", b: "3.2 kg" },
    { label: "OhmSavvy assessment", a: "Desk research", b: "Hands-on Tested" },
  ],
  differences: [
    "Bandwidth: 150 MHz on the Hantek against 50 MHz on the Rigol, three times higher. Rise time follows: 2.4 ns against 7 ns.",
    "Channels: four on the DS1054Z, two on the DSO2D15. With three or four on, the Rigol samples each at 250 MSa/s.",
    "Memory: Rigol's datasheet gives 24 Mpts on one channel, three times the Hantek's 8 Mpts. Rigol's product page lists 12 Mpts standard with 24 Mpts optional.",
    "Generator: the DSO2D15 has a one-channel source to 25 MHz sine; the DS1054Z has none (that's the S models).",
    "Decoding: the Hantek adds CAN and LIN; the Rigol adds parallel. Both list UART, I2C and SPI.",
    "Sensitivity: the DS1054Z goes down to 1 mV/div, the DSO2D15 to 2 mV/div.",
    "The DS1054Z carries our Hands-on Tested badge; the DSO2D15 assessment is desk research from Hantek's spec table.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          The Hantek wins the speed rows and the Rigol wins the capacity rows. Neither scope leads across the board,
          which is why the right pick depends on the circuit you&apos;re probing.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Rated bandwidth (-3 dB). The DSO2D15 is three times the DS1054Z.</>}>
            <BarChart
              items={[
                { label: "Hantek DSO2D15", value: 150, display: "150 MHz", highlight: true },
                { label: "Rigol DS1054Z", value: 50, display: "50 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Analog inputs. The DS1054Z doubles them.</>}>
            <BarChart
              items={[
                { label: "Rigol DS1054Z", value: 4, display: "4 channels", highlight: true },
                { label: "Hantek DSO2D15", value: 2, display: "2 channels" },
              ]}
            />
          </Figure>
          <Figure caption={<>Scope rise time: Hantek&apos;s typical figure, Rigol&apos;s calculated one. Shorter is faster.</>}>
            <BarChart
              items={[
                { label: "Rigol DS1054Z", value: 7, display: "7 ns" },
                { label: "Hantek DSO2D15", value: 2.4, display: "2.4 ns", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Maximum memory on one channel. The DS1054Z bar uses Rigol&apos;s datasheet figure.</>}>
            <BarChart
              items={[
                { label: "Rigol DS1054Z", value: 24, display: "24 Mpts", highlight: true },
                { label: "Hantek DSO2D15", value: 8, display: "8 Mpts" },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">How much each scope slows the edges you measure</h2>
        <p className="text-muted leading-7 mb-4">
          Every scope has its own rise time, and it adds to the signal&apos;s. The standard approximation is root sum
          of squares: displayed rise time ≈ √(signal² + scope²). Probes add a term too, but with a decent 10X probe the
          scope dominates. Plug in each scope&apos;s figure and the gap gets concrete.
        </p>
        <DataTable
          head={["Real edge (10–90%)", "DSO2D15 shows", "Error", "DS1054Z shows", "Error"]}
          rows={[
            ["2 ns (fast CMOS)", "3.1 ns", "+56%", "7.3 ns", "+264%"],
            ["5 ns (74HC logic)", "5.5 ns", "+11%", "8.6 ns", "+72%"],
            ["10 ns", "10.3 ns", "+3%", "12.2 ns", "+22%"],
            ["20 ns", "20.1 ns", "+1%", "21.2 ns", "+6%"],
            ["50 ns (slow GPIO, gate driver)", "50.1 ns", "~0%", "50.5 ns", "+1%"],
          ]}
        />
        <p className="text-muted leading-7 my-4">
          Calculated, not measured. Worked example for the 5 ns row: √(5² + 7²) = √74 = 8.6 ns on the Rigol, and √(5² +
          2.4²) = √30.8 = 5.5 ns on the Hantek. The usual target is a scope three to five times faster than the edge.
          That puts the DS1054Z&apos;s comfortable floor near 20 to 35 ns and the DSO2D15&apos;s near 7 to 12 ns.
        </p>
        <Figure
          caption={
            <>
              One 5 ns edge, drawn as each scope would show it. The DS1054Z still shows the transition and its timing,
              but not how fast it really is.
            </>
          }
        >
          <EdgeDiagram />
        </Figure>
        <KeyIdea title="Slow edges level the field">
          Most hobby signals, from Arduino GPIO and I2C to motor PWM and supply ripple, have edges well above 20 ns.
          At 50 ns the two scopes disagree by half a nanosecond. The DSO2D15&apos;s speed only pays off when you
          actually work with fast logic, gate drive, ringing or clocks above about 10 MHz.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Hantek DSO2D15 vs Rigol DS1054Z: which should you buy?</h2>
        <DataTable
          head={["Job", "Pick", "Why"]}
          rows={[
            ["Debugging SPI with CLK, CS, MOSI and MISO at once", "DS1054Z", "Four inputs; the Hantek needs two passes"],
            ["Measuring MOSFET gate rise and ringing", "DSO2D15", "2.4 ns adds about 11% to a 5 ns edge; 7 ns adds 72%"],
            ["Looking at a 20 MHz clock", "DSO2D15", "150 MHz keeps its 5th harmonic (100 MHz)"],
            ["Reading CAN or LIN in a car module", "DSO2D15", "Decodes both; Rigol lists neither for the DS1054Z"],
            ["Comparing three sensor phases or a 3-phase motor drive", "DS1054Z", "Three or four signals on one timebase"],
            ["Driving a filter with a test signal", "DSO2D15", "Built-in 25 MHz generator"],
            ["Long single captures with zoom", "DS1054Z", "Up to 24 Mpts per Rigol's datasheet"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t measure</h2>
        <h3 className="text-lg font-semibold mb-2">Hantek DSO2D15: fast edges, two at a time</h3>
        <p className="text-muted leading-7 mb-4">
          The DSO2D15 handles edge timing, ringing and clocks into the tens of MHz, and its generator and five
          decoders make it a compact embedded-debug bench. Its limits: two inputs, so you can&apos;t see a full SPI
          transaction at once, and 500 MSa/s per channel with both on, which is 3.3 samples per cycle at 150 MHz.
          It&apos;s 8-bit, so small signals on big offsets show coarse steps, and its high-res mode trades speed for
          resolution.
        </p>
        <h3 className="text-lg font-semibold mb-2">Rigol DS1054Z: more inputs, slower edges</h3>
        <p className="text-muted leading-7 mb-4">
          The DS1054Z suits multi-signal timing: bus lines, sequenced supplies, multi-phase PWM. Rigol lists up to
          30,000 waveforms per second and a 1 mV/div range, half the Hantek&apos;s smallest setting. The 7 ns rise time
          makes it a poor tool for measuring edges faster than about 20 ns; it will show that they happen, and when, but
          will report them slower than they are. With three or four channels on, each samples at 250 MSa/s.
        </p>
        <Callout title="Both are earth-referenced mains instruments">
          Neither scope is isolated. Hantek rates the DSO2D15&apos;s inputs at 300 V CAT II; Rigol&apos;s DS1000Z
          datasheet lists CAT I 300 Vrms and CAT II 100 Vrms. For a car this is fine on the 12 V side; for mains-side
          circuits, use a differential probe and don&apos;t clip a ground lead to a live node. Leave household wiring to
          an electrician.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where the DS1054Z&apos;s paperwork gets messy</h2>
        <p className="text-muted leading-7 mb-4">
          Rigol&apos;s DS1000Z datasheet lists 24 Mpts and parallel, UART, I2C and SPI decoding with no option label.
          Its product page lists 12 Mpts standard, 24 Mpts optional, and calls bus trigger and decode an option. If deep
          memory or decoding is why you&apos;re choosing the Rigol, confirm what your unit ships with. Hantek&apos;s
          spec table for the DSO2D15 has no such split; its decoding and 8 Mpts are listed as standard.
        </p>
        <p className="text-muted leading-7">
          The DS1054Z&apos;s other matchups are{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" className={link}>
            Rigol DS1054Z vs Hantek DSO2D10
          </Link>
          , which looks at channels against the generator,{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-rigol-ds1202z-e" className={link}>
            Rigol DS1054Z vs DS1202Z-E
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/rigol-ds1102z-e-vs-rigol-ds1054z" className={link}>
            Rigol DS1102Z-E vs DS1054Z
          </Link>
          . For the Hantek, see{" "}
          <Link href="/oscilloscopes/hantek-dso2d15-vs-hantek-dso2d10" className={link}>
            Hantek DSO2D15 vs DSO2D10
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/hantek-dso2d15-vs-fnirsi-1014d" className={link}>
            Hantek DSO2D15 vs FNIRSI 1014D
          </Link>
          . Our{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-review" className={link}>
            Rigol DS1054Z review
          </Link>{" "}
          covers that scope on its own, and{" "}
          <Link href="/oscilloscopes/how-to-measure-rise-time-with-oscilloscope-cursors" className={link}>
            measuring rise time with cursors
          </Link>{" "}
          shows the technique.
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Pick the Rigol DS1054Z if you need to see three or four signals together or want deep memory, and your edges are slower than about 20 ns, which covers most hobby and repair benches. Pick the Hantek DSO2D15 if you measure fast edges or clocks above 10 MHz, or want a built-in generator and CAN or LIN decoding, and two inputs at a time are enough.",
  chooseNeitherIf:
    "You need four channels and fast edges at once. A four-channel 100 MHz scope such as the Siglent SDS1104X-E covers both better than either of these, at a higher price.",
  faqs: [
    {
      question: "Is 150 MHz overkill compared to the DS1054Z's 50 MHz?",
      answer:
        "For most hobby work, yes. Arduino, I2C, UART and PWM edges are slow enough that 50 MHz reads them within a few percent. The extra bandwidth matters for edges under about 20 ns, clocks above 10 MHz, and ringing on fast switching nodes, where the DS1054Z's 7 ns rise time inflates what you see.",
    },
    {
      question: "Can the Hantek DSO2D15 replace a four-channel scope for SPI?",
      answer:
        "Not fully. With two channels you can watch clock and one data line, or chip select and clock, and decode SPI from those, but not see all four lines in the same capture. The DS1054Z shows CLK, CS, MOSI and MISO together, which is how most SPI timing faults are found.",
    },
    {
      question: "Has OhmSavvy tested the Hantek DSO2D15?",
      answer:
        "No. The Rigol DS1054Z is one of the scopes our owner has bought and tested hands-on, and it carries our Hands-on Tested badge. The DSO2D15 assessment is desk research from Hantek's published spec table, and the rise-time figures on this page are calculated, not measured.",
    },
    {
      question: "Does the DS1054Z have a signal generator?",
      answer:
        "No. In Rigol's DS1000Z range, the built-in two-channel 25 MHz source is on the S models such as the DS1104Z-S Plus. The Hantek DSO2D15 has a one-channel generator with 25 MHz sine and 10 MHz square and arbitrary waves, up to 7 Vpp into high impedance.",
    },
    {
      question: "Which one is easier to carry around?",
      answer:
        "The Hantek DSO2D15. Hantek lists it at 1900 g and 318 × 110 × 150 mm, while Rigol's datasheet gives the DS1054Z 3.2 kg and 313.1 × 160.8 × 122.4 mm. Both run on mains power, so neither is a field instrument, but the Hantek is the lighter bench scope to move around.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Rigol DS1054Z review", href: "/oscilloscopes/rigol-ds1054z-review" },
    { label: "Hantek DSO2D15 vs Hantek DSO2D10", href: "/oscilloscopes/hantek-dso2d15-vs-hantek-dso2d10" },
    { label: "Hantek DSO2D15 vs FNIRSI 1014D", href: "/oscilloscopes/hantek-dso2d15-vs-fnirsi-1014d" },
    { label: "Hantek DSO2C10 vs Hantek DSO2D15", href: "/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d15" },
    { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs Rigol DS1202Z-E", href: "/oscilloscopes/rigol-ds1054z-vs-rigol-ds1202z-e" },
    { label: "Rigol DS1102Z-E vs Rigol DS1054Z", href: "/oscilloscopes/rigol-ds1102z-e-vs-rigol-ds1054z" },
    { label: "Rigol DS1054Z vs Hantek DSO5102P", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso5102p" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Rigol DHO802 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho802-vs-rigol-ds1054z" },
    { label: "Rigol DS1102Z-E vs Hantek DSO2D15", href: "/oscilloscopes/rigol-ds1102z-e-vs-hantek-dso2d15" },
    { label: "How to measure rise time with cursors", href: "/oscilloscopes/how-to-measure-rise-time-with-oscilloscope-cursors" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
  ],
};

export default function HantekDso2d15VsRigolDs1054zPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
