import Link from "@/components/AppLink";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Rigol DS1102Z-E and DS1202Z-E share one DS1000Z-E datasheet (PCX01100-2020-04),
// https://beyondmeasure.rigoltech.com/acton/attachment/1579/f-f55c8579-4293-4d7f-aec4-ef7ea08ad8dc/1/-/-/-/-/DS1000Z-E%20Datasheet-EN.pdf
// linked from https://www.rigolna.com/products/digital-oscilloscopes/1000z/ (checked 2026-11-08). Shared: 2 analog
// channels, 1 GSa/s (1 ch) / 500 MSa/s (2 ch), 24 Mpts (1 ch) / 12 Mpts (2 ch) standard, 30,000 wfms/s, up to 60,000
// frames recording, 8-bit (high resolution 12 bits max), 500 uV/div to 10 V/div, 1 MOhm || 15 pF, CAT I 300 Vrms /
// CAT II 100 Vrms, 2 ns/div to 50 s/div, RS232/UART, I2C, SPI triggers, Parallel/UART/I2C/SPI decoding on 2 buses,
// 7-inch 800 x 480, USB, LAN, Aux, 100-240 V 50 W max, 2.9 kg, 313.1 x 160.8 x 122.4 mm, three-year warranty.
// Differences: bandwidth (and single-shot bandwidth) 200 MHz vs 100 MHz; calculated rise time 1.75 ns vs 3.5 ns;
// standard probes two PVP2350 350 MHz (DS1202Z-E) vs two PVP3150 150 MHz (DS1102Z-E).
// The DS1202Z-E Pick's ASIN (B0H1J12LDJ) is sold by a reseller per the Pick; box contents on Amazon may differ from
// Rigol's standard accessories. Both ASINs buyable on Amazon.com at ZIP 10001 (checked 2026-11-08). System
// bandwidth figures use the root-sum-of-squares rise-time approximation (t = 0.35 / BW) and are labeled as calculated.

const path = "/oscilloscopes/rigol-ds1102z-e-vs-rigol-ds1202z-e";
const ds1102 = picks.find((p) => p.name === "Rigol DS1102Z-E")!;
const ds1202 = picks.find((p) => p.name === "Rigol DS1202Z-E")!;

export const metadata = buildMetadata({
  title: "Rigol DS1102Z-E vs DS1202Z-E: 100 or 200 MHz",
  description:
    "Rigol DS1102Z-E vs DS1202Z-E: one datasheet, two bandwidths. What 200 MHz adds, why the bundled 350 MHz probes matter, and the system-bandwidth math.",
  path: "/oscilloscopes/rigol-ds1102z-e-vs-rigol-ds1202z-e",
  image: ds1202.image,
});

const link = "text-accent hover:underline";

/** Probe and scope rise times add: the signal chain sets the real bandwidth. */
function ProbeChainDiagram() {
  const rows = [
    { y: 40, probe: "PVP3150 150 MHz", scope: "DS1102Z-E 100 MHz", sys: "≈ 83 MHz", w: 83 },
    { y: 100, probe: "PVP3150 150 MHz", scope: "DS1202Z-E 200 MHz", sys: "≈ 120 MHz", w: 120 },
    { y: 160, probe: "PVP2350 350 MHz", scope: "DS1202Z-E 200 MHz", sys: "≈ 173 MHz", w: 173 },
  ];
  return (
    <svg
      viewBox="0 0 400 215"
      className="w-full h-auto"
      role="img"
      aria-label="Rigol DS1102Z-E vs DS1202Z-E probe chain diagram: a signal passes through a probe and then the scope, and their rise times add. The DS1102Z-E with its bundled 150 MHz PVP3150 probes works out to about 83 MHz overall. The DS1202Z-E with the same 150 MHz probes reaches about 120 MHz. The DS1202Z-E with its bundled 350 MHz PVP2350 probes reaches about 173 MHz."
    >
      <defs>
        <marker id="pc-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0L10 5L0 10z" className="fill-foreground" />
        </marker>
      </defs>
      {rows.map((r, i) => (
        <g key={r.y}>
          <text x="8" y={r.y + 4} fontSize="9" className="fill-muted">signal</text>
          <path d={`M40 ${r.y} H62`} className="stroke-foreground" strokeWidth="1.2" markerEnd="url(#pc-arr)" />
          <rect x="64" y={r.y - 14} width="96" height="28" rx="5" className="fill-surface stroke-border" strokeWidth="1" />
          <text x="112" y={r.y + 3} fontSize="8.5" textAnchor="middle" className="fill-foreground">{r.probe}</text>
          <path d={`M160 ${r.y} H180`} className="stroke-foreground" strokeWidth="1.2" markerEnd="url(#pc-arr)" />
          <rect x="182" y={r.y - 14} width="104" height="28" rx="5" className={i === 2 ? "fill-accent/10 stroke-accent" : "fill-surface stroke-border"} strokeWidth="1.2" />
          <text x="234" y={r.y + 3} fontSize="8.5" textAnchor="middle" className="fill-foreground">{r.scope}</text>
          <path d={`M286 ${r.y} H300`} className="stroke-foreground" strokeWidth="1.2" markerEnd="url(#pc-arr)" />
          <rect x="302" y={r.y - 6} width={r.w * 0.45} height="12" rx="2" className={i === 2 ? "fill-accent" : "fill-accent/40"} />
          <text x="302" y={r.y + 22} fontSize="8.5" className="fill-foreground">{r.sys} overall</text>
        </g>
      ))}
      <text x="8" y="208" fontSize="8" className="fill-muted">Calculated: rise ≈ 0.35 ÷ BW, then √(probe² + scope²). Not a measurement.</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Rigol DS1102Z-E vs DS1202Z-E",
  path,
  published: "2026-11-08",
  intro:
    "Rigol DS1102Z-E vs DS1202Z-E is a pure bandwidth decision. Rigol covers both models in one DS1000Z-E datasheet, and every row is shared except three: bandwidth (100 MHz against 200 MHz), calculated rise time (3.5 ns against 1.75 ns) and the standard probes (150 MHz PVP3150s against 350 MHz PVP2350s). Memory, sample rate, decoding, triggers, screen, size and the three-year warranty are identical. The probes turn out to matter almost as much as the scope, so this page works through the whole signal chain.",
  a: {
    pick: ds1102,
    imageAlt: "Rigol DS1102Z-E 100 MHz two-channel oscilloscope",
    chooseIf: [
      "Your clocks stay under about 15 to 20 MHz and your edges are slower than 10 ns",
      "You work mostly with audio, power, PWM, UART, I2C and SPI",
      "You want the same memory, decode and warranty for less money",
      "You plan to probe at 1X often, where probe bandwidth limits both scopes",
    ],
  },
  b: {
    pick: ds1202,
    imageAlt: "Rigol DS1202Z-E 200 MHz two-channel oscilloscope",
    chooseIf: [
      "You look at clocks from 20 to 40 MHz and want them drawn as squares",
      "You measure edges in the 3 to 10 ns range or check ringing on fast lines",
      "You want Rigol's 350 MHz PVP2350 probes, standard with this model per the datasheet",
      "You'd rather have headroom now than replace a 100 MHz scope later",
    ],
  },
  extraSpecs: [
    { label: "Rise time (calculated, Rigol)", a: "3.5 ns", b: "1.75 ns" },
    { label: "Standard probes (Rigol datasheet)", a: "2 × PVP3150, 150 MHz", b: "2 × PVP2350, 350 MHz" },
    { label: "System bandwidth with bundled probes (calculated)", a: "≈ 83 MHz", b: "≈ 173 MHz" },
    { label: "Samples per cycle at rated bandwidth, 2 ch on", a: "5 (500 MSa/s ÷ 100 MHz)", b: "2.5 (500 MSa/s ÷ 200 MHz)" },
    { label: "Memory depth", a: "24 Mpts (1 ch); 12 Mpts (2 ch)", b: "24 Mpts (1 ch); 12 Mpts (2 ch)" },
    { label: "Capture rate", a: "Up to 30,000 wfms/s", b: "Up to 30,000 wfms/s" },
    { label: "Decoding", a: "Parallel, UART, I2C, SPI (2 buses)", b: "Parallel, UART, I2C, SPI (2 buses)" },
    { label: "Vertical range", a: "500 µV/div to 10 V/div", b: "500 µV/div to 10 V/div" },
    { label: "Size and weight", a: "313.1 × 160.8 × 122.4 mm, 2.9 kg", b: "313.1 × 160.8 × 122.4 mm, 2.9 kg" },
  ],
  differences: [
    "Bandwidth: 200 MHz on the DS1202Z-E against 100 MHz on the DS1102Z-E, per one shared Rigol datasheet.",
    "Rise time: Rigol calculates 1.75 ns for the DS1202Z-E and 3.5 ns for the DS1102Z-E.",
    "Probes: Rigol lists two 350 MHz PVP2350 probes as standard on the DS1202Z-E and two 150 MHz PVP3150s on the DS1102Z-E. Amazon box contents can differ from Rigol's list, so check the listing.",
    "Sampling doesn't scale with bandwidth: both run 1 GSa/s on one channel and 500 MSa/s on two, so the DS1202Z-E gets 2.5 samples per cycle at 200 MHz with both channels on.",
    "Everything else is the same: 24 Mpts, 30,000 wfms/s, UART/I2C/SPI triggers, four decoders, 500 µV/div, 7-inch 800 × 480 screen, 2.9 kg, three-year warranty.",
    "Neither carries our Hands-on Tested badge; both assessments are desk research from Rigol's datasheet.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Only three datasheet rows differ. The charts show them, plus the samples-per-cycle figure that limits how
          much of the DS1202Z-E&apos;s extra bandwidth you get with both channels running.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Rated bandwidth (-3 dB) from Rigol&apos;s DS1000Z-E datasheet.</>}>
            <BarChart
              items={[
                { label: "Rigol DS1202Z-E", value: 200, display: "200 MHz", highlight: true },
                { label: "Rigol DS1102Z-E", value: 100, display: "100 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Calculated rise time per Rigol. Shorter draws fast edges more faithfully.</>}>
            <BarChart
              items={[
                { label: "Rigol DS1102Z-E", value: 3.5, display: "3.5 ns" },
                { label: "Rigol DS1202Z-E", value: 1.75, display: "1.75 ns", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Bandwidth of the standard probes Rigol lists for each model.</>}>
            <BarChart
              items={[
                { label: "PVP2350 (DS1202Z-E)", value: 350, display: "350 MHz", highlight: true },
                { label: "PVP3150 (DS1102Z-E)", value: 150, display: "150 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Samples per cycle at each scope&apos;s rated bandwidth with both channels on.</>}>
            <BarChart
              items={[
                { label: "Rigol DS1102Z-E", value: 5, display: "5.0", highlight: true },
                { label: "Rigol DS1202Z-E", value: 2.5, display: "2.5" },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The probe is part of the bandwidth</h2>
        <p className="text-muted leading-7 mb-4">
          A scope&apos;s rated bandwidth is measured at the BNC. Your signal also passes through a probe, and the two
          rise times combine. The standard approximation: rise time ≈ 0.35 ÷ bandwidth for each part, then system
          rise time ≈ √(probe² + scope²). Running Rigol&apos;s numbers through it gives a result most buyers never see
          on a listing.
        </p>
        <Figure
          caption={
            <>
              Calculated system bandwidth for three probe-and-scope combinations. Rigol&apos;s bundled probes are
              matched to each model; swapping the DS1202Z-E&apos;s probes for 150 MHz ones gives up about 50 MHz.
            </>
          }
        >
          <ProbeChainDiagram />
        </Figure>
        <DataTable
          head={["Combination", "Probe rise", "Scope rise", "System rise", "System bandwidth"]}
          rows={[
            ["DS1102Z-E + PVP3150", "2.33 ns", "3.5 ns", "4.2 ns", "≈ 83 MHz"],
            ["DS1202Z-E + PVP3150", "2.33 ns", "1.75 ns", "2.9 ns", "≈ 120 MHz"],
            ["DS1202Z-E + PVP2350", "1.0 ns", "1.75 ns", "2.0 ns", "≈ 173 MHz"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Worked example for the first row: 0.35 ÷ 150 MHz = 2.33 ns for the probe; √(2.33² + 3.5²) = √17.7 = 4.2 ns;
          0.35 ÷ 4.2 ns ≈ 83 MHz. The real figures depend on the ground lead and probe tip, and a long ground clip
          can cut them further. Treat these as a guide to scale, not measurements.
        </p>
        <KeyIdea title="What the extra headroom shows">
          With the five-times rule for square waves, the DS1102Z-E keeps the 5th harmonic of clocks to about 17 MHz
          with its bundled probes (83 ÷ 5), and the DS1202Z-E to about 35 MHz (173 ÷ 5). On edges, the DS1202Z-E&apos;s
          2 ns system rise time reads a 10 ns edge as about 10.2 ns; the DS1102Z-E&apos;s 4.2 ns reads it as about 10.8
          ns. Both calculated the same way.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Rigol DS1102Z-E vs DS1202Z-E: which should you buy?</h2>
        <DataTable
          head={["Job", "Pick", "Why"]}
          rows={[
            ["Arduino, Raspberry Pi GPIO, I2C, UART", "DS1102Z-E", "Signals sit far inside 83 MHz system bandwidth"],
            ["Audio, power supplies, motor PWM", "DS1102Z-E", "Bandwidth isn't the limit; save the money"],
            ["25 to 33 MHz SPI or SDIO clocks", "DS1202Z-E", "Keeps the 5th harmonic with its own probes"],
            ["Ringing and overshoot on fast logic", "DS1202Z-E", "2 ns system rise time against 4.2 ns"],
            ["Single-shot capture of a fast event", "DS1202Z-E with one channel", "1 GSa/s gives 5 samples per cycle at 200 MHz"],
            ["Student lab bench", "DS1102Z-E", "Same controls and features at the lower price"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t measure</h2>
        <h3 className="text-lg font-semibold mb-2">Rigol DS1102Z-E: 100 MHz is enough for most benches</h3>
        <p className="text-muted leading-7 mb-4">
          With its bundled probes, the DS1102Z-E covers clocks to roughly 17 MHz cleanly and edges down to about 13 to
          21 ns with good accuracy (three to five times its 4.2 ns system rise). That spans most hobby, repair and
          student work. Its 24 Mpts memory, decoders and 500 µV/div range are exactly those of its sibling.
        </p>
        <h3 className="text-lg font-semibold mb-2">Rigol DS1202Z-E: headroom with a sampling caveat</h3>
        <p className="text-muted leading-7 mb-4">
          The DS1202Z-E doubles the clock ceiling and halves the edge floor. The caveat is sampling: with both
          channels on, 500 MSa/s gives 2.5 samples per cycle at 200 MHz, barely above the Nyquist limit of 2. Repetitive
          signals still reconstruct with sin(x)/x interpolation, but for single-shot work near the top of its band,
          turn the second channel off and get 1 GSa/s back.
        </p>
        <Callout title="Rated inputs, not isolation">
          Rigol rates both models CAT I 300 Vrms and CAT II 100 Vrms at the input, and both ground their probe
          returns to mains earth. Don&apos;t probe mains-side circuits with a standard probe and ground clip; use a
          differential probe, and leave household wiring to an electrician.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The trust question: what ships in the box</h2>
        <p className="text-muted leading-7 mb-4">
          The DS1202Z-E&apos;s value depends partly on its 350 MHz probes. Rigol&apos;s datasheet lists them as standard,
          but the Amazon listing in our Pick is sold through a reseller, and listings sometimes bundle different
          accessories. Check the listing&apos;s &quot;included components&quot; before buying. If it ships with 150 MHz
          probes, the calculated system bandwidth falls to about 120 MHz, which still beats the DS1102Z-E but by less.
        </p>
        <p className="text-muted leading-7">
          The DS1202Z-E&apos;s other matchups are{" "}
          <Link href="/oscilloscopes/rigol-ds1202z-e-vs-siglent-sds1202x-e" className={link}>
            Rigol DS1202Z-E vs Siglent SDS1202X-E
          </Link>
          ,{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-rigol-ds1202z-e" className={link}>
            Rigol DS1054Z vs DS1202Z-E
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/rigol-ds1202z-e-vs-rigol-dho802" className={link}>
            Rigol DS1202Z-E vs DHO802
          </Link>
          . For the DS1102Z-E, see{" "}
          <Link href="/oscilloscopes/rigol-ds1102z-e-vs-rigol-ds1054z" className={link}>
            Rigol DS1102Z-E vs DS1054Z
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/rigol-ds1102z-e-vs-hantek-dso2d15" className={link}>
            Rigol DS1102Z-E vs Hantek DSO2D15
          </Link>
          . Our{" "}
          <Link href="/oscilloscopes/how-to-compensate-an-oscilloscope-probe" className={link}>
            probe compensation guide
          </Link>{" "}
          helps you get the bandwidth you paid for.
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Buy the Rigol DS1102Z-E unless you know you need more than about 17 MHz of clean clock or edges faster than about 13 ns: it shares every other spec with its sibling. Buy the Rigol DS1202Z-E for fast digital work, where its 200 MHz and Rigol's 350 MHz standard probes roughly double the usable system bandwidth, as long as the listing includes those probes.",
  chooseNeitherIf:
    "You need more than two inputs or finer vertical detail. Both are two-channel, 8-bit scopes; a four-channel Rigol DS1054Z or a 12-bit Rigol DHO802 suits those jobs better.",
  faqs: [
    {
      question: "Is the DS1202Z-E the same scope as the DS1102Z-E?",
      answer:
        "Rigol describes both in one DS1000Z-E datasheet, and only bandwidth, calculated rise time and standard probes differ. Sample rate, 24 Mpts memory, 30,000 wfms/s, triggers, decoding, screen, size, weight and the three-year warranty are listed identically. The DS1202Z-E is rated 200 MHz, the DS1102Z-E 100 MHz.",
    },
    {
      question: "Do I need the 350 MHz probes with the DS1202Z-E?",
      answer:
        "To get most of its bandwidth, yes. By the standard rise-time calculation, the DS1202Z-E reaches about 173 MHz with 350 MHz probes but only about 120 MHz with 150 MHz probes. Rigol lists PVP2350 350 MHz probes as standard for the DS1202Z-E; confirm the Amazon listing includes them.",
    },
    {
      question: "Is 200 MHz too much for 1 GSa/s?",
      answer:
        "On one channel, 1 GSa/s gives 5 samples per cycle at 200 MHz, a workable ratio with sin(x)/x interpolation. With both channels on, each gets 500 MSa/s, or 2.5 samples per cycle at 200 MHz, which is tight for single-shot captures. Repeating signals are fine either way.",
    },
    {
      question: "Which one should a student buy?",
      answer:
        "The DS1102Z-E for most students. Lab signals in electronics courses, from RC circuits to microcontroller buses, sit well inside its roughly 83 MHz system bandwidth with the bundled probes. It has the same memory, decoders, triggers and warranty as the DS1202Z-E, so nothing else is lost.",
    },
    {
      question: "Can I use the DS1102Z-E's probes on the DS1202Z-E?",
      answer:
        "Yes, they share the same BNC inputs and Rigol lists its passive probes as compatible across its scopes. The trade-off is bandwidth: the calculated system figure with 150 MHz PVP3150 probes is about 120 MHz on the DS1202Z-E, against about 173 MHz with the 350 MHz PVP2350 probes.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Rigol DS1202Z-E vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-ds1202z-e-vs-siglent-sds1202x-e" },
    { label: "Rigol DS1054Z vs Rigol DS1202Z-E", href: "/oscilloscopes/rigol-ds1054z-vs-rigol-ds1202z-e" },
    { label: "Rigol DS1202Z-E vs Rigol DHO802", href: "/oscilloscopes/rigol-ds1202z-e-vs-rigol-dho802" },
    { label: "Rigol DS1102Z-E vs Rigol DS1054Z", href: "/oscilloscopes/rigol-ds1102z-e-vs-rigol-ds1054z" },
    { label: "Rigol DS1102Z-E vs Hantek DSO2D15", href: "/oscilloscopes/rigol-ds1102z-e-vs-hantek-dso2d15" },
    { label: "Rigol DS1102Z-E vs Hantek DSO5102P", href: "/oscilloscopes/rigol-ds1102z-e-vs-hantek-dso5102p" },
    { label: "Rigol DS1102Z-E vs Siglent SDS1102CML+", href: "/oscilloscopes/rigol-ds1102z-e-vs-siglent-sds1102cml-plus" },
    { label: "How to compensate an oscilloscope probe", href: "/oscilloscopes/how-to-compensate-an-oscilloscope-probe" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "Why does connecting a probe change the signal?", href: "/oscilloscopes/why-does-connecting-an-oscilloscope-probe-change-the-signal" },
  ],
};

export default function RigolDs1102zEVsRigolDs1202zEPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
