import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Rigol DHO914S and DHO924S per Rigol's DHO900 data sheet,
// https://beyondmeasure.rigoltech.com/acton/attachment/1579/f-bea3b849-2334-4a6c-8bb3-ed67dc16b97f/1/-/-/-/-/DHO900_DataSheet_EN.pdf
// (checked 2026-11-07): DHO914S 125 MHz, 2.8 ns typical rise; DHO924S 250 MHz, 1.4 ns typical rise. Shared: 4 analog
// channels, 16 digital inputs with the separately sold PLA2216 probe, 12-bit, 1.25 GSa/s / 625 MSa/s / 312.5 MSa/s
// (1 / 2 / 3-4 channels), 50 / 25 / 10 Mpts, 30,000 wfms/s vector and 1,000,000 UltraAcquire, 200 uV/div (magnified
// 1 mV/div) to 10 V/div, standard decode Parallel, RS232/UART, I2C, SPI, CAN, LIN, 7-inch 1024 x 600 touchscreen,
// USB-C 15 V 3 A (45 W max), 265.35 x 161.75 x 77.38 mm, 1.78 kg. Footnote [7]: only the DHO914S and DHO924S have the
// AFG and Bode plot. AFG: 1 channel, 156 MSa/s, 14-bit, sine 2 mHz to 25 MHz, square 2 mHz to 15 MHz, ramp to 150 kHz,
// arbitrary to 10 MHz (16 kpts), 2 mV to 10 V output range up to 10 MHz (2 mV to 5 V above), 50 ohm output.
// Bode plot start 10 Hz to 24.99 MHz, stop 100 Hz to 25 MHz, 10 to 300 points per octave.
// Standard probes: DHO914S four 150 MHz (PVP3150); DHO924S four 350 MHz (PVP2350).
// The DHO924S Pick says Rigol's web page doesn't confirm a generator; the data sheet footnote above does.
// Amazon (checked 2026-11-08, ZIP 10001): DHO924S B0H1HPY519 in stock (reseller listing); DHO914S B0CGHRL266 showed no
// buy box but "See All Buying Options" offers.
// Displayed rise times below use the standard root-sum-of-squares approximation and are labeled as estimates.

const path = "/oscilloscopes/rigol-dho914s-vs-rigol-dho924s";
const dho914s = picks.find((p) => p.name === "Rigol DHO914S")!;
const dho924s = picks.find((p) => p.name === "Rigol DHO924S")!;

export const metadata = buildMetadata({
  title: "Rigol DHO914S vs DHO924S: 125 or 250 MHz?",
  description:
    "Rigol DHO914S vs DHO924S: identical 12-bit scopes with the same 25 MHz generator and Bode plot, split by bandwidth. Edge-speed math shows who needs 250 MHz.",
  path: "/oscilloscopes/rigol-dho914s-vs-rigol-dho924s",
  image: dho924s.image,
});

const link = "text-accent hover:underline";

/** A 2 ns edge as each scope draws it: displayed rise ≈ √(edge² + scope²). */
function EdgeDiagram() {
  return (
    <svg
      viewBox="0 0 400 200"
      className="w-full h-auto"
      role="img"
      aria-label="Rigol DHO914S vs DHO924S edge diagram: a real 2 nanosecond edge is drawn as about 3.4 nanoseconds on the 125 MHz DHO914S, whose own rise time is 2.8 nanoseconds, and as about 2.4 nanoseconds on the 250 MHz DHO924S, whose own rise time is 1.4 nanoseconds."
    >
      <line x1="40" y1="160" x2="380" y2="160" className="stroke-border" strokeWidth="1" />
      {[0, 1, 2, 3, 4, 5, 6].map((ns) => (
        <g key={ns}>
          <line x1={60 + ns * 50} y1="157" x2={60 + ns * 50} y2="163" className="stroke-muted" strokeWidth="1" />
          <text x={60 + ns * 50} y="176" fontSize="8.5" textAnchor="middle" className="fill-muted">{ns} ns</text>
        </g>
      ))}
      <path d="M40 150 H110 L210 40 H380" className="fill-none stroke-foreground" strokeWidth="1" strokeDasharray="4 3" />
      <path d="M40 150 H110 C150 150 280 40 320 40 H380" className="fill-none stroke-muted" strokeWidth="2" />
      <path d="M40 150 H110 C140 150 220 40 250 40 H380" className="fill-none stroke-accent" strokeWidth="2" />
      <text x="40" y="20" fontSize="9" className="fill-foreground">Dashed: real 2 ns edge</text>
      <text x="170" y="20" fontSize="9" className="fill-accent">DHO924S: about 2.4 ns</text>
      <text x="290" y="20" fontSize="9" className="fill-muted">DHO914S: about 3.4 ns</text>
      <text x="200" y="194" fontSize="8.5" textAnchor="middle" className="fill-muted">√(2² + 1.4²) ≈ 2.4 ns and √(2² + 2.8²) ≈ 3.4 ns; estimates, not captures</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Rigol DHO914S vs DHO924S: Do You Need 250 MHz?",
  path,
  published: "2026-11-08",
  intro:
    "Rigol DHO914S vs DHO924S comes down to one line of Rigol's DHO900 data sheet: 125 MHz against 250 MHz. Both have four 12-bit channels, 16 digital inputs with the PLA2216 probe, 50 Mpts of memory, the same single-channel 25 MHz signal generator and the same Bode plot. The DHO924S also ships with 350 MHz probes instead of 150 MHz ones. The real question is how fast the edges on your bench are.",
  a: {
    pick: dho914s,
    imageAlt: "Rigol DHO914S 125 MHz 12-bit oscilloscope with built-in generator, front panel",
    chooseIf: [
      "Your fastest clocks are under about 25 MHz",
      "Most of your work is power, audio, sensors and slow buses",
      "You mainly bought for the generator and Bode plot, which are identical",
      "You'd rather put the price difference toward the PLA2216 logic probe",
    ],
  },
  b: {
    pick: dho924s,
    imageAlt: "Rigol DHO924S 250 MHz 12-bit oscilloscope with built-in generator, front panel",
    chooseIf: [
      "You look at edges of 2 ns or faster, such as modern logic or fast SPI",
      "You run one or two channels most of the time, where 250 MHz has sample rate behind it",
      "You want 350 MHz probes in the box",
      "You'd rather not outgrow the scope's bandwidth in a few years",
    ],
  },
  extraSpecs: [
    { label: "Rise time (typical)", a: "2.8 ns", b: "1.4 ns" },
    { label: "Probes in the box", a: "4 × 150 MHz passive", b: "4 × 350 MHz passive" },
    { label: "Memory, 1 / 2 / 3-4 channels", a: "50 / 25 / 10 Mpts", b: "50 / 25 / 10 Mpts" },
    { label: "Digital inputs", a: "16 (PLA2216 sold separately)", b: "16 (PLA2216 sold separately)" },
    { label: "Generator", a: "1 ch, sine to 25 MHz, square to 15 MHz, 14-bit", b: "1 ch, sine to 25 MHz, square to 15 MHz, 14-bit" },
    { label: "Bode plot", a: "10 Hz to 25 MHz", b: "10 Hz to 25 MHz" },
    { label: "Standard decode", a: "Parallel, UART, I2C, SPI, CAN, LIN", b: "Parallel, UART, I2C, SPI, CAN, LIN" },
    { label: "Power, size, weight", a: "USB-C 15 V 3 A; 265 × 162 × 77 mm; 1.78 kg", b: "USB-C 15 V 3 A; 265 × 162 × 77 mm; 1.78 kg" },
    { label: "Amazon (checked 2026-11-08)", a: "No buy box; offers via See All Buying Options", b: "In stock from a reseller (GuliTech)" },
  ],
  differences: [
    "Bandwidth: 125 MHz against 250 MHz, with typical rise times of 2.8 ns and 1.4 ns.",
    "Probes: Rigol ships 150 MHz probes with the DHO914S and 350 MHz probes with the DHO924S. A 150 MHz probe would hold back a 250 MHz scope.",
    "Everything else on Rigol's data sheet is identical: 12-bit, 1.25 GSa/s single-channel, 50 Mpts, 16 digital inputs, the generator, Bode plot, decoders, screen, power and size.",
    "Rigol's data sheet lists the generator and Bode plot on both S models (footnote 7). Our DHO924S product card flags it as unconfirmed because Rigol's series web page doesn't spell it out per model; the data sheet does.",
    "Neither is owner-tested; both assessments are desk research against Rigol's data sheet.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          With one difference on paper, the charts show what it does to real edges and where it stops helping.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Typical rise time per Rigol. Lower is faster.</>}>
            <BarChart
              items={[
                { label: "Rigol DHO914S", value: 2.8, display: "2.8 ns" },
                { label: "Rigol DHO924S", value: 1.4, display: "1.4 ns", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Estimated displayed rise of a real 2 ns edge: √(2² + scope²).</>}>
            <BarChart
              items={[
                { label: "DHO914S shows", value: 3.4, display: "about 3.4 ns" },
                { label: "DHO924S shows", value: 2.4, display: "about 2.4 ns", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Estimated displayed rise of a real 5 ns edge. The gap almost closes.</>}>
            <BarChart
              items={[
                { label: "DHO914S (5 ns edge)", value: 5.7, display: "about 5.7 ns" },
                { label: "DHO924S (5 ns edge)", value: 5.2, display: "about 5.2 ns", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Highest generator sine frequency, the same on both. Bode plot also stops at 25 MHz.</>}>
            <BarChart
              items={[
                { label: "DHO914S generator", value: 25, display: "25 MHz" },
                { label: "DHO924S generator", value: 25, display: "25 MHz" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The estimates use the standard root-sum-of-squares rule for cascaded rise times. On a 2 ns edge the DHO914S
          overstates rise time by about 70%, the DHO924S by about 20%. On a 5 ns edge the errors are about 15% and 4%,
          and both scopes tell you the same story. For the theory, see{" "}
          <Link href="/oscilloscopes/how-to-measure-rise-time-with-oscilloscope-cursors" className={link}>
            how to measure rise time with cursors
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Rigol DHO914S vs DHO924S: which should you buy?</h2>
        <DataTable
          head={["Job", "Pick", "Why"]}
          rows={[
            ["Filter and amplifier response with Bode plot", "Rigol DHO914S", "Bode plot stops at 25 MHz on both"],
            ["Signal integrity on 3.3 V logic with fast edges", "Rigol DHO924S", "1.4 ns rise time and 350 MHz probes"],
            ["Switching supply ripple and loop checks", "Rigol DHO914S", "125 MHz is plenty; the extra buys nothing"],
            ["SPI or QSPI flash at 50 MHz clocks", "Rigol DHO924S", "125 MHz is only 2.5 times that clock"],
            ["Student lab with generator and logic", "Rigol DHO914S", "Same features, more left for the PLA2216"],
            ["Four fast channels at once", "Neither, really", "312.5 MSa/s with four on limits both"],
            ["Single-channel edge and overshoot work", "Rigol DHO924S", "1.25 GSa/s is five samples per 250 MHz cycle"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t measure</h2>
        <h3 className="text-lg font-semibold mb-2">Rigol DHO914S: the generator is the point</h3>
        <p className="text-muted leading-7 mb-4">
          Most buyers of an S model want the built-in source. Rigol lists a single channel with sine to 25 MHz, square to
          15 MHz, ramp to 150 kHz and arbitrary waveforms to 10 MHz at 156 MSa/s and 14 bits, plus a Bode plot from 10 Hz
          to 25 MHz with up to 300 points per octave. All of that works the same on the DHO914S. Its 125 MHz input is
          comfortable to roughly 25 to 42 MHz by the three-to-five-times rule, which covers almost everything the generator
          can produce.
        </p>
        <h3 className="text-lg font-semibold mb-2">Rigol DHO924S: bandwidth that needs free channels</h3>
        <p className="text-muted leading-7 mb-4">
          250 MHz pays off on fast edges, overshoot and ringing. It has a catch: the sample rate is the same as the
          DHO914S. With one channel on, 1.25 GSa/s gives five samples per 250 MHz cycle. With two on, 625 MSa/s gives 2.5.
          With three or four on, 312.5 MSa/s falls below twice 250 MHz, so the top of the bandwidth can&apos;t be sampled
          properly. Use the DHO924S as a one- or two-channel fast scope and a four-channel slower one.
        </p>
        <Figure
          caption={
            <>
              How each scope draws a real 2 ns edge. The 250 MHz model stays close to the truth; the 125 MHz model adds
              about 1.4 ns. Estimates from Rigol&apos;s rise-time figures.
            </>
          }
        >
          <EdgeDiagram />
        </Figure>
        <div className="mt-4">
          <KeyIdea title="Bandwidth that the probe can't pass is wasted">
            Rigol ships 350 MHz probes with the DHO924S for a reason. If you move 150 MHz probes from an older scope onto
            it, the probe limits the system and much of the extra bandwidth disappears. Use a probe rated above the
            scope, and a short ground spring instead of the long clip for fast edges.
          </KeyIdea>
        </div>
        <div className="mt-4">
          <Callout title="Generator output and circuit voltages">
            Rigol lists a generator output range up to 10 V from a 50 Ω output, and the scope inputs are rated CAT I,
            300 Vrms. Don&apos;t connect the generator output to a powered node of a circuit, and keep both away from
            mains; use a differential probe for mains-referenced measurements.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The question with these two: buying them on Amazon</h2>
        <p className="text-muted leading-7 mb-4">
          On 2026-11-08 the DHO914S listing showed no buy box at a New York ZIP, only offers under &quot;See All Buying
          Options&quot;, and the DHO924S listing was in stock from a reseller, GuliTech, whose title adds &quot;with
          AWG&quot;. Rigol&apos;s data sheet backs that generator claim for the DHO924S. Check who the seller is and how
          warranty claims go before you order either one; neither is the RIGOL Official Store listing today.
        </p>
        <p className="text-muted leading-7">
          The DHO914S against an 8-bit rival is on{" "}
          <Link href="/oscilloscopes/rigol-dho914s-vs-siglent-sds1104x-e" className={link}>
            Rigol DHO914S vs Siglent SDS1104X-E
          </Link>
          ; the DHO924S against Siglent is on{" "}
          <Link href="/oscilloscopes/siglent-sds814x-hd-vs-rigol-dho924s" className={link}>
            Siglent SDS814X HD vs Rigol DHO924S
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/rigol-dho924s-vs-siglent-sds1202x-e" className={link}>
            Rigol DHO924S vs Siglent SDS1202X-E
          </Link>
          . If you don&apos;t need the generator, see{" "}
          <Link href="/oscilloscopes/rigol-dho814-vs-rigol-dho914" className={link}>
            Rigol DHO814 vs DHO914
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Buy the Rigol DHO914S if you want the scope, logic inputs, 25 MHz generator and Bode plot in one box and your clocks stay under about 25 MHz: every feature except bandwidth is identical. Buy the Rigol DHO924S if you measure edges near 2 ns or fast clocks on one or two channels at a time; its 250 MHz bandwidth, 1.4 ns rise time and 350 MHz probes show those edges far more faithfully.",
  chooseNeitherIf:
    "You need full bandwidth on all four channels at once. Both drop to 312.5 MSa/s with three or four channels on, which can't properly sample signals near 250 MHz.",
  faqs: [
    {
      question: "Does the Rigol DHO924S have a built-in signal generator?",
      answer:
        "Yes, per Rigol's DHO900 data sheet, which states that only the DHO914S and DHO924S have the arbitrary function generator and Bode plot. The Amazon listing title also says \"with AWG\". Rigol's series web page doesn't break this out per model, which is why some product summaries, including our own card, call it unconfirmed.",
    },
    {
      question: "Is the generator better on the DHO924S?",
      answer:
        "No. Rigol lists one generator specification for both S models: one channel at 156 MSa/s and 14 bits, sine to 25 MHz, square to 15 MHz, ramp to 150 kHz and arbitrary waveforms to 10 MHz. The Bode plot also runs to 25 MHz on both. The DHO924S's extra bandwidth applies only to the scope inputs.",
    },
    {
      question: "Can I upgrade a DHO914S to 250 MHz later?",
      answer:
        "Rigol's DHO900 data sheet lists the DHO914S and DHO924S as separate order numbers and doesn't list a bandwidth upgrade option. Assume the bandwidth you buy is the bandwidth you keep, and choose based on the fastest signals you expect in the next few years.",
    },
    {
      question: "Why does the DHO924S come with different probes?",
      answer:
        "Rigol lists 350 MHz passive probes as standard with the DHO924 and DHO924S and 150 MHz probes with the DHO914 and DHO914S. A probe's bandwidth adds to the scope's, so a 150 MHz probe on a 250 MHz scope would throw away much of the extra speed.",
    },
    {
      question: "What signals actually need 250 MHz?",
      answer:
        "Edges faster than about 3 ns, clocks above roughly 40 MHz, and overshoot or ringing on fast logic. Microcontroller GPIO, high-speed SPI and modern logic families can switch that fast. Power supplies, audio, sensors, I2C and UART don't come close, and 125 MHz shows them as well as 250 MHz does.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Rigol DHO914S vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho914s-vs-siglent-sds1104x-e" },
    { label: "Rigol DHO924S vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-dho924s-vs-siglent-sds1202x-e" },
    { label: "Siglent SDS814X HD vs Rigol DHO924S", href: "/oscilloscopes/siglent-sds814x-hd-vs-rigol-dho924s" },
    { label: "Rigol DHO814 vs Rigol DHO914", href: "/oscilloscopes/rigol-dho814-vs-rigol-dho914" },
    { label: "Rigol DHO914 vs Rigol DHO804", href: "/oscilloscopes/rigol-dho914-vs-rigol-dho804" },
    { label: "How to measure rise time with cursors", href: "/oscilloscopes/how-to-measure-rise-time-with-oscilloscope-cursors" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
  ],
};

export default function RigolDho914sVsRigolDho924sPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
