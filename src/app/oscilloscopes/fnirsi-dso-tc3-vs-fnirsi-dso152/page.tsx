import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// FNIRSI DSO-TC3 per https://www.fnirsi.com/products/dso-tc3 and the DSO-TC3 manual V1.9
// (https://cdn.shopify.com/s/files/1/0694/8310/2426/files/DSO-TC3_Manual-V1.9-2023.03.29.pdf, checked 2026-10-24):
// 500 kHz, 10 MSa/s, 1 input, 2.4-inch screen, built-in 3.7 V lithium battery with USB-C charging, 400 V max test
// voltage, 1 MOhm input, generator sine/square/pulse/triangle/ramp 1-100 kHz at 0-3.3 V plus DC; component tester
// capacitance 25 pF-100 mF, resistance 0.01 Ohm-50 MOhm, inductance 10 uH-1000 mH; size 79x103x31 mm; ADC bits and
// memory not stated. Weight 250 g per the Amazon listing B0BV9X733J.
// FNIRSI DSO152: 200 kHz, 1 channel, 2.5 MSa/s per this site's Pick. Edge-rounding diagram uses the standard
// single-pole approximation (rise time ~ 0.35 / bandwidth, tau = rise time / 2.2) and is labeled illustrative.

const path = "/oscilloscopes/fnirsi-dso-tc3-vs-fnirsi-dso152";

export const metadata = buildMetadata({
  title: "FNIRSI DSO-TC3 vs DSO152 for Beginners",
  description:
    "FNIRSI DSO-TC3 vs FNIRSI DSO152 for beginners: a 500kHz scope with a component tester and generator against a 200kHz pocket scope. Charts and verdict.",
  path: "/oscilloscopes/fnirsi-dso-tc3-vs-fnirsi-dso152",
});

const link = "text-accent hover:underline";

/** One period of a 100 kHz square wave as each scope's bandwidth would round it (single-pole model, illustrative). */
function EdgeRoundingDiagram() {
  const x0 = 34;
  const w = 296;
  const top = 26;
  const h = 110;
  const T = 11; // µs shown
  const px = (t: number) => x0 + (t / T) * w;
  const py = (v: number) => top + h - v * h;
  const trace = (riseUs: number) => {
    const tau = riseUs / 2.2;
    const v6 = 1 - Math.exp(-5 / tau);
    return Array.from({ length: 221 }, (_, i) => {
      const t = (T * i) / 220;
      const v = t < 1 ? 0 : t < 6 ? 1 - Math.exp(-(t - 1) / tau) : v6 * Math.exp(-(t - 6) / tau);
      return `${px(t).toFixed(1)},${py(v).toFixed(1)}`;
    }).join(" ");
  };
  const ideal = [
    [0, 0],
    [1, 0],
    [1, 1],
    [6, 1],
    [6, 0],
    [11, 0],
  ]
    .map(([t, v]) => `${px(t).toFixed(1)},${py(v).toFixed(1)}`)
    .join(" ");
  return (
    <svg
      viewBox="0 0 340 178"
      className="w-full h-auto"
      role="img"
      aria-label="Illustrative diagram: one period of a 100 kHz square wave. The ideal edges are vertical. The DSO-TC3, with an estimated 0.7 microsecond rise time, rounds each edge slightly; the DSO152, with an estimated 1.75 microsecond rise time, rounds them much more, using a large part of each 5 microsecond half-cycle."
    >
      <line x1={x0} x2={x0 + w} y1={py(0)} y2={py(0)} className="stroke-border" strokeWidth="0.6" />
      <line x1={x0} x2={x0 + w} y1={py(1)} y2={py(1)} className="stroke-border" strokeWidth="0.6" strokeDasharray="2 3" />
      <text x={x0 - 4} y={py(1) + 3} fontSize="8" textAnchor="end" className="fill-muted">high</text>
      <text x={x0 - 4} y={py(0) + 3} fontSize="8" textAnchor="end" className="fill-muted">low</text>
      <polyline points={ideal} className="stroke-foreground" strokeWidth="1" strokeDasharray="4 3" fill="none" />
      <polyline points={trace(0.7)} className="stroke-accent" strokeWidth="2" fill="none" />
      <polyline points={trace(1.75)} className="stroke-muted" strokeWidth="2" fill="none" />
      {[0, 2, 4, 6, 8, 10].map((t) => (
        <text key={t} x={px(t)} y={top + h + 14} fontSize="8" textAnchor="middle" className="fill-muted">
          {t} µs
        </text>
      ))}
      <line x1="40" x2="56" y1="10" y2="10" className="stroke-foreground" strokeWidth="1" strokeDasharray="4 3" />
      <text x="60" y="13" fontSize="8.5" className="fill-foreground">ideal</text>
      <line x1="96" x2="112" y1="10" y2="10" className="stroke-accent" strokeWidth="2" />
      <text x="116" y="13" fontSize="8.5" className="fill-foreground">DSO-TC3 (≈0.7 µs)</text>
      <line x1="210" x2="226" y1="10" y2="10" className="stroke-muted" strokeWidth="2" />
      <text x="230" y="13" fontSize="8.5" className="fill-foreground">DSO152 (≈1.75 µs)</text>
      <text x={px(3.5)} y={top + h + 30} fontSize="8.5" textAnchor="middle" className="fill-muted">
        Each half-cycle lasts 5 µs at 100 kHz
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "FNIRSI DSO-TC3 vs FNIRSI DSO152",
  path,
  published: "2026-10-24",
  intro:
    "FNIRSI DSO-TC3 vs FNIRSI DSO152 is a choice between two single-channel pocket scopes from the same maker, aimed at people learning what a waveform looks like. The DSO152 is a plain oscilloscope: 200kHz of bandwidth and 2.5 MSa/s. The DSO-TC3 raises that to 500kHz and 10 MSa/s and adds a component tester and a 6-waveform signal generator, on a 2.4-inch screen with a built-in rechargeable battery.",
  a: {
    pick: picks.find((p) => p.name === "FNIRSI DSO-TC3")!,
    imageAlt: "FNIRSI DSO-TC3 pocket oscilloscope, component tester and signal generator",
    chooseIf: [
      "You want a signal generator to feed known waveforms into the scope while you learn",
      "You also want to identify and check transistors, MOSFETs, diodes, capacitors, resistors and inductors",
      "Your signals reach past the audio band, toward 100kHz",
      "You want a stated built-in rechargeable battery with USB-C charging",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "FNIRSI DSO152")!,
    reviewHref: "/oscilloscopes/fnirsi-dso152-review",
    imageAlt: "FNIRSI DSO152 pocket digital oscilloscope",
    chooseIf: [
      "You only want a scope, as the simplest and most affordable way to see a waveform",
      "Your signals are audio-range or slower",
      "You already own a signal source and a component tester, or don't need them",
    ],
  },
  extraSpecs: [
    { label: "Form factor", a: "Pocket-sized, fold-out stand", b: "Pocket-sized" },
    { label: "Comfortable signal range (3–5× rule)", a: "Up to roughly 100–170kHz", b: "Up to roughly 40–65kHz" },
    { label: "Signal generator", a: "Sine, square, pulse, triangle, ramp 1–100 kHz at 0–3.3 V, plus DC", b: "Not in our verified data" },
    { label: "Component tester ranges", a: "C 25 pF–100 mF, R 0.01 Ω–50 MΩ, L 10 µH–1,000 mH", b: "Not in our verified data" },
    { label: "Max test voltage", a: "400 V (per FNIRSI)", b: "Not in our verified data" },
    { label: "Size / weight", a: "79 × 103 × 31 mm, 250 g", b: "Not in our verified data" },
  ],
  differences: [
    "Bandwidth: 500kHz on the DSO-TC3 against 200kHz on the DSO152, 2.5 times more. By the 3–5× rule that moves the comfortable ceiling from roughly 40–65kHz to roughly 100–170kHz.",
    "Sample rate: 10 MSa/s against 2.5 MSa/s, four times faster, so the DSO-TC3 takes 20 samples per cycle at its bandwidth limit against 12.5 on the DSO152.",
    "The DSO-TC3 adds a component tester (transistors, MOSFETs, diodes, capacitance, resistance, inductance) and a 6-waveform signal generator up to 100kHz. Neither function is in our verified data for the DSO152.",
    "Both have one input channel, so neither can show two signals side by side.",
    "FNIRSI states the DSO-TC3's 2.4-inch screen, built-in rechargeable battery and USB-C charging. Our verified DSO152 data does not state its screen size or power source, so we can't compare those directly.",
    "FNIRSI does not state the DSO-TC3's ADC resolution or memory depth, and neither appears in our DSO152 data either.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          These two are far closer than a pocket scope and a bench scope, so the charts use a linear scale. The
          gaps are real but modest: 2.5 times the bandwidth and 4 times the sample rate. Every number comes from
          the maker&apos;s published specs in our beginner roundup; the last chart is derived from them.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Analog bandwidth (the −3 dB point): the DSO-TC3 has 2.5 times the DSO152&apos;s.</>}>
            <BarChart
              items={[
                { label: "FNIRSI DSO-TC3", value: 500_000, display: "500kHz", highlight: true },
                { label: "FNIRSI DSO152", value: 200_000, display: "200kHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Maximum sample rate: 10 MSa/s against 2.5 MSa/s, four times faster.</>}>
            <BarChart
              items={[
                { label: "FNIRSI DSO-TC3", value: 10_000_000, display: "10 MSa/s", highlight: true },
                { label: "FNIRSI DSO152", value: 2_500_000, display: "2.5 MSa/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Samples per cycle at each scope&apos;s own bandwidth limit (sample rate ÷ bandwidth). Both are well above the Nyquist minimum of 2.</>}>
            <BarChart
              items={[
                { label: "FNIRSI DSO-TC3", value: 20, display: "20 per cycle", highlight: true },
                { label: "FNIRSI DSO152", value: 12.5, display: "12.5 per cycle" },
              ]}
            />
          </Figure>
          <Figure caption={<>Highest signal frequency each is comfortable on, using the 5× end of the 3–5× rule (bandwidth ÷ 5).</>}>
            <BarChart
              items={[
                { label: "FNIRSI DSO-TC3", value: 100_000, display: "≈100kHz", highlight: true },
                { label: "FNIRSI DSO152", value: 40_000, display: "≈40kHz" },
              ]}
            />
          </Figure>
        </div>
        <div className="mt-4">
          <DataTable
            head={["Function", "FNIRSI DSO-TC3", "FNIRSI DSO152"]}
            rows={[
              ["Oscilloscope", "1 channel, 500kHz, 10 MSa/s", "1 channel, 200kHz, 2.5 MSa/s"],
              ["Component tester", "Yes: transistors, MOSFETs, diodes, C, R, L", "Not in our verified data"],
              ["Signal generator", "Yes: 6 waveforms, up to 100kHz", "Not in our verified data"],
              ["Screen", "2.4-inch", "Not stated in our verified data"],
              ["Power", "Built-in rechargeable battery, USB-C charging", "Not stated in our verified data"],
              ["ADC resolution / memory depth", "Not stated by FNIRSI", "Not stated in our verified data"],
            ]}
          />
        </div>
        <p className="text-muted leading-7 mt-4">
          For what bandwidth and sample rate actually mean on screen, see{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            what oscilloscope bandwidth is
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>
          . The same ideas apply at MSa/s, just a thousand times slower.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which is better for beginners?</h2>
        <p className="text-muted leading-7 mb-4">
          For most beginners the DSO-TC3 is the better learning tool, and the reason isn&apos;t its extra
          bandwidth. It is the built-in signal generator. When you first use a scope, the hardest part is often
          having something sensible to look at. With the DSO-TC3 you can generate a waveform of a known shape
          and frequency, feed it into the scope input, and practice setting the timebase, the volts per division
          and the trigger until the trace sits still. Because you know what the answer should be, every mistake
          in your settings shows up straight away. The DSO152 can teach the same controls, but only if you
          already have a circuit or a separate generator producing a signal.
        </p>
        <p className="text-muted leading-7 mb-4">
          The component tester is the second beginner advantage. Sorting out which leg of a transistor is which,
          checking whether a salvaged capacitor is still within its value, or confirming a diode&apos;s direction
          are everyday jobs when you start building circuits, and the DSO-TC3 covers them in the same box. FNIRSI
          lists wide ranges, capacitance from 25 pF to 100 mF, resistance from 0.01 Ω to 50 MΩ and inductance from
          10 µH to 1,000 mH, but doesn&apos;t state the tester&apos;s accuracy, so treat it as a sorting and
          sanity-check tool rather than a precision instrument.
        </p>
        <p className="text-muted leading-7 mb-4">
          The DSO152 makes more sense when you want the simplest possible scope and nothing else. Its data calls
          it an extremely affordable entry point, and for a beginner who mostly wants to watch audio signals or a
          slow PWM pin, its 200kHz is enough. Its review covers that role in more detail:{" "}
          <Link href="/oscilloscopes/fnirsi-dso152-review" className={link}>
            FNIRSI DSO152 review
          </Link>
          .
        </p>
        <KeyIdea title="Neither one is a bench scope">
          Both have a single channel, and both top out below the speed of most digital buses. A beginner who
          already knows they will debug Arduino or microcontroller projects should look at a 2- or 4-channel bench
          scope instead; our{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            beginner oscilloscope roundup
          </Link>{" "}
          and the{" "}
          <Link href="/oscilloscopes/fnirsi-1014d-vs-fnirsi-dso-tc3" className={link}>
            FNIRSI 1014D vs FNIRSI DSO-TC3
          </Link>{" "}
          comparison cover that step.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["If you are…", "Pick", "Why"]}
          rows={[
            ["A complete beginner learning scope controls", "FNIRSI DSO-TC3", "Its built-in generator gives you known signals to practice on"],
            ["Building your first circuits from parts", "FNIRSI DSO-TC3", "The component tester checks transistors, diodes, capacitors and more"],
            ["Watching audio signals only", "FNIRSI DSO152", "200kHz covers the audio band; it is the simpler scope-only tool"],
            ["Checking signals between about 40kHz and 100kHz", "FNIRSI DSO-TC3", "Its 500kHz bandwidth keeps that range within the 3–5× rule"],
            ["Spending as little as possible to try a scope", "FNIRSI DSO152", "Its verified data calls it an extremely affordable entry point"],
            ["Needing to compare two signals at once", "Neither", "Both are single-channel; look at a 2- or 4-channel scope"],
            ["Debugging I2C, SPI or fast logic", "Neither", "Those clocks and edges need megahertz of bandwidth"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t measure</h2>
        <p className="text-muted leading-7 mb-4">
          A scope&apos;s bandwidth is the frequency at which a sine wave is shown about 3 dB low, roughly 70% of
          its true amplitude. The usual rule of thumb is to pick a scope with 3–5 times the frequency of the
          signal you want to see, and more for square waves, whose sharp edges contain harmonics well above the
          fundamental.
        </p>
        <h3 className="text-lg font-semibold mb-2">FNIRSI DSO152: audio range and slower</h3>
        <p className="text-muted leading-7 mb-4">
          At 200kHz, the DSO152 is comfortable up to roughly 40–65kHz. That covers the audio band (up to about
          20kHz), the ripple on a linear power supply, slow sensor outputs and low-frequency PWM. A square wave of
          a few kilohertz will look square; one at 50kHz will already show softened edges.
        </p>
        <h3 className="text-lg font-semibold mb-2">FNIRSI DSO-TC3: a little further</h3>
        <p className="text-muted leading-7 mb-4">
          At 500kHz, the DSO-TC3 is comfortable up to roughly 100–170kHz. That takes in everything the DSO152 can
          show, plus higher-frequency PWM and ultrasonic signals around 40kHz with more margin. A 100kHz I2C clock
          sits right at the edge of its comfortable range: you can see that it is toggling, but don&apos;t trust
          its edge shape. Megahertz SPI clocks, most switching regulators and fast logic are beyond both scopes.
        </p>
        <KeyIdea title="How rounded the edges get">
          A common approximation puts a scope&apos;s own fastest displayable rise time at about 0.35 divided by its
          bandwidth: roughly 0.7 µs for the DSO-TC3 and 1.75 µs for the DSO152. A 100kHz square wave spends only 5
          µs in each half-cycle, so on the DSO152 each edge eats about a third of that, and on the DSO-TC3 about a
          seventh. The exact figure depends on each front end&apos;s response, but the DSO-TC3&apos;s edges will
          look noticeably sharper on the same signal.
        </KeyIdea>
        <div className="mt-4">
          <Figure
            caption={
              <>
                Illustrative, not a measurement: a 100 kHz square wave as a simple single-pole model of each scope&apos;s
                bandwidth would draw it, using the 0.35 ÷ bandwidth rise-time estimate.
              </>
            }
          >
            <EdgeRoundingDiagram />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The model makes the 3–5× rule visible. At 100 kHz the DSO-TC3&apos;s trace reaches the top within about a
          seventh of each half-cycle and then sits flat, so the waveform still reads as a square wave. The DSO152 spends
          about a third of each half-cycle climbing, which turns the same signal into something closer to a shark fin.
          Drop the signal to 20 kHz, inside the DSO152&apos;s comfortable range, and each half-cycle stretches to 25 µs;
          its 1.75 µs edge then takes only 7% of that, and both scopes draw a convincing square wave.
        </p>
        <div className="mt-4">
          <Callout title="Mains and high voltage">
            FNIRSI lists a 400 V maximum test voltage for the DSO-TC3, and the DSO152&apos;s rating isn&apos;t in our
            verified data. A maximum input figure is not a safety category, so don&apos;t connect either one to mains
            wiring or high-voltage circuits; leave those to a licensed electrician. Low-voltage hobby circuits are what
            these pocket tools are for.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where to go next</h2>
        <p className="text-muted leading-7">
          If either pocket scope leaves you wanting a second channel or more bandwidth, the next step is a bench
          scope. See{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-fnirsi-dso152" className={link}>
            Rigol DS1054Z vs FNIRSI DSO152
          </Link>
          ,{" "}
          <Link href="/oscilloscopes/fnirsi-dso152-vs-hantek-dso2d10" className={link}>
            FNIRSI DSO152 vs Hantek DSO2D10
          </Link>
          ,{" "}
          <Link href="/oscilloscopes/fnirsi-dso152-vs-siglent-sds1104x-e" className={link}>
            FNIRSI DSO152 vs Siglent SDS1104X-E
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/fnirsi-1014d-vs-fnirsi-dso-tc3" className={link}>
            FNIRSI 1014D vs FNIRSI DSO-TC3
          </Link>
          , or start from the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "For a beginner, the FNIRSI DSO-TC3 is the better buy of the two: 2.5 times the bandwidth, four times the sample rate, and a signal generator and component tester that make learning faster. The FNIRSI DSO152 still makes sense as the simplest, most affordable scope-only way to see audio-range waveforms. Neither replaces a multi-channel bench scope for microcontroller or digital work.",
  chooseNeitherIf:
    "Neither if your work is microcontroller or digital-bus debugging: both are single-channel entry scopes, so you need a multi-channel bench scope like the Rigol DS1054Z instead.",
  faqs: [
    {
      question: "Is the FNIRSI DSO-TC3 better than the DSO152 for a beginner?",
      answer:
        "For most beginners, yes. Its 500kHz bandwidth and 10 MSa/s beat the DSO152's 200kHz and 2.5 MSa/s, and its built-in signal generator gives you known waveforms to practice scope controls on. The DSO152 is the simpler scope-only choice if you only want to watch audio-range signals.",
    },
    {
      question: "Does the FNIRSI DSO152 have a signal generator or component tester?",
      answer:
        "Neither appears in our verified DSO152 data, which describes it as a pocket-sized single-channel scope. The DSO-TC3 is the one with both: a 6-waveform generator up to 100kHz and a tester for transistors, MOSFETs, diodes, capacitance, resistance and inductance.",
    },
    {
      question: "Can either FNIRSI pocket scope show two signals at once?",
      answer:
        "No. The DSO-TC3 and the DSO152 each have a single input channel, so you can't compare an input with an output or a clock with a data line. For that you need a two-channel scope such as the FNIRSI 1014D or a four-channel bench scope.",
    },
    {
      question: "Can the FNIRSI DSO-TC3 check I2C or Arduino signals?",
      answer:
        "Only roughly. A 100kHz I2C clock sits at the edge of the DSO-TC3's comfortable range of about 100–170kHz, so you can confirm activity but not trust the edge shape. Faster I2C modes, SPI and most microcontroller timing work need a bench scope with megahertz of bandwidth and at least two channels.",
    },
    {
      question: "What does FNIRSI not state about the DSO-TC3?",
      answer:
        "FNIRSI does not state the DSO-TC3's ADC resolution or memory depth. Those affect how fine vertical detail looks and how long a stretch of signal you can capture at full sample rate, so we can't compare them against other scopes. Our verified DSO152 data doesn't state either figure.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "FNIRSI DSO152 review", href: "/oscilloscopes/fnirsi-dso152-review" },
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "FNIRSI 1014D vs FNIRSI DSO-TC3", href: "/oscilloscopes/fnirsi-1014d-vs-fnirsi-dso-tc3" },
    { label: "Rigol DS1054Z vs FNIRSI DSO152", href: "/oscilloscopes/rigol-ds1054z-vs-fnirsi-dso152" },
    { label: "FNIRSI DSO152 vs Hantek DSO2D10", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-dso2d10" },
    { label: "FNIRSI DSO152 vs Siglent SDS1104X-E", href: "/oscilloscopes/fnirsi-dso152-vs-siglent-sds1104x-e" },
    { label: "Hantek 2D72 vs FNIRSI 2C53T", href: "/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
    { label: "Hantek DSO2D10 vs Siglent SDS1104X-E", href: "/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs OWON VDS1022I", href: "/oscilloscopes/rigol-ds1054z-vs-owon-vds1022i" },
    { label: "Rigol DS1054Z vs OWON SDS1102", href: "/oscilloscopes/rigol-ds1054z-vs-owon-sds1102" },
  ],
};

export default function FnirsiDsoTc3VsFnirsiDso152Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
