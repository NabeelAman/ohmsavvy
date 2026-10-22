import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  InfoCards,
  KeyIdea,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks as meterPicks } from "../../multimeters/best-multimeters/page";
import { picks } from "../best-beginner-oscilloscopes/page";

const description =
  "Why does an oscilloscope show different voltage readings from a multimeter? RMS vs peak-to-peak, crest factor, bandwidth, probe ratio, coupling and loading.";

export const metadata = buildMetadata({
  title: "Why Scope and Multimeter Voltage Readings Differ",
  description,
  path: "/oscilloscopes/why-does-an-oscilloscope-show-different-voltage-readings-from-a-multimeter",
});

const hantek = picks.find((p) => p.name === "Hantek DSO2D10")!;
const fluke = meterPicks.find((p) => p.name === "Fluke 117")!;
const extech = meterPicks.find((p) => p.name === "Extech EX330")!;

const link = "text-accent hover:underline";

/** One sine wave labelled with the three numbers people compare: peak, peak-to-peak and RMS. */
function SineLevels() {
  const pts: string[] = [];
  for (let i = 0; i <= 220; i += 2) {
    pts.push(`${10 + i},${(100 - 70 * Math.sin((2 * Math.PI * i) / 110)).toFixed(1)}`);
  }
  return (
    <svg
      viewBox="0 0 320 200"
      className="w-full h-auto"
      role="img"
      aria-label="A sine wave of 10 volts peak-to-peak with lines marking plus 5 volts peak, 3.54 volts RMS, zero volts and minus 5 volts, and an arrow spanning the full peak-to-peak height"
    >
      <defs>
        <marker id="slArr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill="#ffd56b" />
        </marker>
      </defs>
      <rect x="0" y="0" width="320" height="200" rx="4" fill="#0f1a14" />
      <line x1="10" y1="30" x2="250" y2="30" stroke="#2c4a3a" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="10" y1="100" x2="250" y2="100" stroke="#2c4a3a" strokeWidth="1.2" />
      <line x1="10" y1="170" x2="250" y2="170" stroke="#2c4a3a" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="10" y1="50.5" x2="250" y2="50.5" stroke="#5BB3E8" strokeWidth="1.2" strokeDasharray="6 4" />
      <polyline points={pts.join(" ")} fill="none" stroke="#7CFC9A" strokeWidth="2" strokeLinejoin="round" />
      <text x="64" y="24" fontSize="10" fill="#9fe3b4">peak +5 V</text>
      <text x="64" y="64" fontSize="10" fill="#5BB3E8">RMS 3.54 V</text>
      <text x="14" y="114" fontSize="10" fill="#9fe3b4">0 V</text>
      <text x="64" y="188" fontSize="10" fill="#9fe3b4">−5 V</text>
      <line x1="266" y1="32" x2="266" y2="168" stroke="#ffd56b" strokeWidth="1.4" markerStart="url(#slArr)" markerEnd="url(#slArr)" />
      <text x="272" y="96" fontSize="10" fill="#ffd56b">10 Vpp</text>
      <text x="272" y="110" fontSize="10" fill="#ffd56b">(scope)</text>
    </svg>
  );
}

export default function WhyDoesAnOscilloscopeShowDifferentVoltageReadingsFromAMultimeterPage() {
  return (
    <HowToShell
      title="Why Does an Oscilloscope Show Different Voltage Readings from a Multimeter?"
      description={description}
      published="2026-10-22"
      path="/oscilloscopes/why-does-an-oscilloscope-show-different-voltage-readings-from-a-multimeter"
      category="oscilloscopes"
      intro={
        <>
          An oscilloscope shows different voltage readings from a multimeter mostly because the two report
          different quantities: the scope usually shows peak-to-peak or instantaneous voltage, while a meter
          on AC volts shows an RMS value. Most of the remaining gaps come from the meter&apos;s limited AC
          bandwidth, a probe ratio set wrong on the scope, or mismatched coupling. On a steady DC level, a
          difference of a few percent is normal, because a scope&apos;s vertical accuracy is coarser than a
          meter&apos;s.
        </>
      }
      aside={{
        image: hantek.image,
        alt: "Hantek DSO2D10 two-channel digital oscilloscope with built-in waveform generator",
        caption: (
          <>
            The Hantek DSO2D10 (100MHz, 2 channels, 1 GSa/s) is one of the scopes in our reviews. Its
            built-in waveform generator is handy for feeding a known signal to both instruments. See our{" "}
            <Link href="/oscilloscopes/hantek-dso2d10-review" className={link}>
              DSO2D10 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "the-usual-causes", label: "The usual causes" },
        { id: "peak-to-peak-vs-rms", label: "Peak-to-peak vs RMS" },
        { id: "true-rms-and-crest-factor", label: "True RMS, average-responding and crest factor" },
        { id: "meter-bandwidth", label: "Meter bandwidth" },
        { id: "probe-ratio", label: "Probe attenuation mismatch" },
        { id: "coupling", label: "DC vs AC coupling" },
        { id: "accuracy", label: "Vertical accuracy vs meter accuracy" },
        { id: "loading", label: "Input impedance and loading" },
        { id: "noise-and-averaging", label: "Noise and averaging" },
        { id: "comparison-table", label: "Sine, square and PWM compared" },
        { id: "troubleshooting-order", label: "What to check first" },
      ]}
      faq={[
        {
          q: "Which is more accurate, an oscilloscope or a multimeter?",
          a: "For a steady DC voltage, or the RMS of a low-frequency AC signal within its rated bandwidth, the multimeter is usually more accurate. The scope wins when the signal is fast, non-sinusoidal or changing, because it measures the actual waveform rather than one filtered number.",
        },
        {
          q: "Why does my scope read 2.83 times my multimeter on a sine wave?",
          a: "Because the scope is showing peak-to-peak and the meter is showing RMS. For a pure sine, peak-to-peak equals 2√2, about 2.83, times the RMS value. Both readings are correct. Switch the scope to its Vrms measurement, or divide the peak-to-peak figure by 2.83, and the two should agree closely.",
        },
        {
          q: "Why does my multimeter read low on a high-frequency signal?",
          a: "Most handheld meters are only specified for AC voltage up to somewhere between a few hundred hertz and a few kilohertz, depending on model and range. Above that the reading falls away. A scope's bandwidth is far higher, so it keeps showing the true amplitude. Check your meter's manual.",
        },
        {
          q: "Can a scope probe set to the wrong ratio cause a 10 times error?",
          a: "Yes. If a 10x probe is used with the channel set to 1x, the scope shows a tenth of the real voltage; the other way round, it shows ten times too much. Match the channel's probe setting to the switch on the probe, then compare again.",
        },
        {
          q: "Why do the readings disagree on a 5 V DC rail?",
          a: "Usually by only a little, and that is expected. An entry-level scope's DC accuracy is often around ±3% of full scale, which can be over 0.2 V at 1 V/div, while a handheld meter is typically far tighter. Ripple and noise also lift the scope's peak values. Trust the meter for the DC number.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-measure-voltage-with-an-oscilloscope",
          title: "How to Measure Voltage With an Oscilloscope",
          desc: "Reading peak-to-peak, RMS and DC levels correctly from the screen and the measure menu.",
        },
        {
          href: "/oscilloscopes/oscilloscope-vs-multimeter",
          title: "When to Use an Oscilloscope vs a Multimeter",
          desc: "A different question: which tool suits which job, and why most benches keep both.",
        },
      ]}
    >
      <Callout title="Compare on safe signals">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Compare on low-voltage signals, such as a function generator. A standard scope probe is not a mains test lead.
          </li>
          <li>
            A bench scope&apos;s ground clip is earthed through its power cord. Clip it only to the
            circuit&apos;s 0 V on an isolated, low-voltage supply, never to a non-isolated mains circuit.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="the-usual-causes" className="text-xl font-semibold mb-3">Why an oscilloscope shows different voltage readings from a multimeter: the usual causes</h2>
        <p className="text-muted leading-7 mb-4">
          Before blaming either instrument, check they are measuring the same thing. One of these usually explains the gap:
        </p>
        <InfoCards
          items={[
            { label: "Different quantity", desc: "Peak-to-peak or peak on the scope, RMS on the meter." },
            { label: "Wave shape", desc: "A meter that is not True RMS misreads non-sine waves." },
            { label: "Frequency", desc: "The meter's AC range rolls off far below the scope's bandwidth." },
            { label: "Probe ratio", desc: "A 1x/10x mismatch makes the scope read ten times off." },
            { label: "Coupling", desc: "One instrument includes the DC level and the other doesn't." },
            { label: "Accuracy and loading", desc: "A few percent of scope error, or a probe loading a weak node." },
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="peak-to-peak-vs-rms">Peak-to-peak vs RMS</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Feed a 10 Vpp sine to both and the scope shows 10 V crest to trough while the meter shows 3.54 V. Neither is wrong: for a pure sine, RMS is the peak divided by √2, so Vpp = 2√2 × Vrms, roughly 2.83 times.
        </p>
        <Figure caption={<>A 10 Vpp sine: 5 V peak, 3.54 V RMS. A scope&apos;s default Vpp readout and a meter&apos;s AC volts reading describe the same wave with different numbers.</>}>
          <SineLevels />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Compare like with like by turning on the scope&apos;s Vrms measurement, as shown in{" "}
          <Link href="/oscilloscopes/how-to-measure-voltage-with-an-oscilloscope" className={link}>
            how to measure voltage with an oscilloscope
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={2} id="true-rms-and-crest-factor">True RMS, average-responding meters and crest factor</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Many lower-cost meters are average-responding: they rectify the signal, average it, and multiply by about 1.11, a ratio that is correct only for a sine. On a ±5 V square wave the true RMS is 5.00 V, but that shortcut displays about 5.55 V, around 11% high. A True RMS meter calculates the real RMS instead.
        </p>
        <p className="text-muted leading-7">
          True RMS meters have a limit too: crest factor, peak divided by RMS. A sine&apos;s is 1.41 and a square wave&apos;s 1.0, but narrow pulses go much higher. Meters specify a maximum, often about 3 near full scale; beyond it even a True RMS reading loses accuracy.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="meter-bandwidth">The multimeter&apos;s AC bandwidth is low</StepHeading>
        <p className="text-muted leading-7">
          A handheld meter&apos;s AC voltage accuracy is typically specified only up to a few hundred hertz
          or a few kilohertz, depending on model and range. A 20 kHz sine may read well under its true RMS on the meter while the scope shows it correctly, and square or PWM waves suffer at lower frequencies because their harmonics fall outside that range. The scope reads low too near its own, far higher limit; see{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            what oscilloscope bandwidth means
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={4} id="probe-ratio">A probe attenuation mismatch</StepHeading>
        <p className="text-muted leading-7">
          A factor of exactly ten between the instruments almost always means the channel&apos;s probe setting doesn&apos;t match the 1x/10x switch on the probe. Fix the channel menu, then check the probe: a miscompensated 10x probe rounds or peaks square-wave corners, which shifts Vpp. See{" "}
          <Link href="/oscilloscopes/how-to-compensate-an-oscilloscope-probe" className={link}>
            how to compensate an oscilloscope probe
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={5} id="coupling">DC vs AC coupling</StepHeading>
        <p className="text-muted leading-7">
          On AC volts most meters report only the AC component; on DC volts, the average. The scope follows its coupling setting. Take a 5 V rail with 100 mVpp of
          triangular ripple: the meter on DC shows about 5.00 V, the meter on AC shows about 29 mV (the RMS
          of a triangle is Vpp ÷ 2√3, if the ripple is within its bandwidth), and the scope on AC coupling
          shows 100 mVpp. 
        </p>
      </section>

      <section>
        <StepHeading n={6} id="accuracy">Scope vertical accuracy vs meter accuracy</StepHeading>
        <p className="text-muted leading-7">
          Entry-level scopes typically quote DC gain accuracy of around ±3% of full scale. At 1 V/div, full scale is 8 divisions or 8 V, so a 5.00 V rail could legitimately show roughly 4.76 V to 5.24 V. A typical handheld meter is accurate to a fraction of a percent on DC, so trust it for the number.
        </p>
      </section>

      <section>
        <StepHeading n={7} id="loading">Input impedance and loading</StepHeading>
        <p className="text-muted leading-7">
          Meters typically present about 10 MΩ on DC volts; a scope input is 1 MΩ, or about 10 MΩ through a 10x probe. On high-impedance nodes that matters. Picture a divider of two 1 MΩ resistors across 10 V, which should give 5 V. A 1x probe puts
          1 MΩ in parallel with the lower resistor, leaving 0.5 MΩ, so the node falls to 10 × 0.5 ÷ 1.5 =
          3.33 V. With 10 MΩ, as from the meter or a 10x probe, the node reads about 4.76 V. 
        </p>
      </section>

      <section>
        <StepHeading n={8} id="noise-and-averaging">Noise and averaging</StepHeading>
        <p className="text-muted leading-7">
          A meter integrates its input over a fraction of a second, so noise averages away. A scope&apos;s Vpp and Vmax include every spike, so peak figures read high on a noisy signal. Use Vavg or Vrms, turn on averaging or the bandwidth limit, and see{" "}
          <Link href="/oscilloscopes/how-to-measure-noise-floor-with-an-oscilloscope" className={link}>
            measuring the noise floor
          </Link>{" "}
          to judge how much noise comes from the setup itself.
        </p>
      </section>

      <section>
        <h2 id="comparison-table" className="text-xl font-semibold mb-3">What each instrument shows for a sine, a square and a PWM signal</h2>
        <p className="text-muted leading-7 mb-4">
          Worked figures at 1 kHz. Many handhelds are not accurate on square or PWM harmonics at that frequency, so treat the meter columns as best case.
        </p>
        <DataTable
          head={["Signal", "Scope Vpp", "Scope Vrms", "True RMS meter, AC V", "Average-responding meter, AC V", "Meter, DC V"]}
          rows={[
            ["Sine, 10 Vpp", "10.0 V", "3.54 V", "3.54 V", "3.54 V", "0 V"],
            ["Square, ±5 V", "10.0 V", "5.00 V", "5.00 V", "≈ 5.55 V", "0 V"],
            ["PWM, 0–5 V, 20% duty", "5.00 V", "2.24 V", "2.00 V", "≈ 1.78 V", "1.00 V"],
          ]}
          mono={[1, 2, 3, 4, 5]}
        />
        <p className="text-muted leading-7 mt-4 mb-4">
          In the PWM row, the scope&apos;s Vrms includes the 1 V DC average (√(2² + 1²) ≈ 2.24 V), while an AC-coupled meter sees only the 2.00 V AC component.
        </p>
        <Figure caption={<>One 0–5 V, 20% duty PWM signal, five valid readings. The values are worked from the waveform, not measured, and assume each instrument is within its bandwidth.</>}>
          <BarChart
            items={[
              { label: "Scope Vpp", value: 5, display: "5.00 V" },
              { label: "Scope Vrms (AC + DC)", value: 2.24, display: "2.24 V" },
              { label: "True RMS meter, AC V", value: 2, display: "2.00 V", highlight: true },
              { label: "Average-responding, AC V", value: 1.78, display: "≈ 1.78 V" },
              { label: "Meter, DC V", value: 1, display: "1.00 V" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="troubleshooting-order" className="text-xl font-semibold mb-3">What to check first</h2>
        <Figure caption={<>Work through these in order; the first two explain most disagreements.</>}>
          <FlowDiagram
            steps={[
              { label: "Quantity", sub: "Vrms on the scope, not Vpp" },
              { label: "Probe ratio", sub: "Channel matches the probe" },
              { label: "Coupling", sub: "Both AC or both DC" },
              { label: "Frequency", sub: "Inside the meter's AC range?" },
              { label: "Loading", sub: "10x probe on weak nodes" },
            ]}
          />
        </Figure>
        <KeyIdea title="Use a known reference">
          Feed both instruments a 100 Hz sine from a function generator. If they agree on RMS, the original gap came from the signal or the settings. For which tool to reach for in the first place, see{" "}
          <Link href="/oscilloscopes/oscilloscope-vs-multimeter" className={link}>
            oscilloscope vs multimeter
          </Link>
          .
        </KeyIdea>
        <div className="mt-6">
          <ProductStrip
            title="Meters from our picks, and how they read AC"
            items={[
              {
                name: "Fluke 117",
                image: fluke.image,
                alt: "Fluke 117 True RMS digital multimeter",
                href: "/multimeters/fluke-117-review",
                note: "True RMS, CAT III 600V, auto-ranging, with built-in non-contact voltage detection.",
              },
              {
                name: "Extech EX330",
                image: extech.image,
                alt: "Extech EX330 compact auto-ranging multimeter",
                href: "/multimeters/extech-ex330-review",
                note: "Auto-ranging, CAT III 600V. Extech doesn't state True RMS, so check before relying on it for non-sine AC.",
              },
            ]}
          />
        </div>
      </section>
    </HowToShell>
  );
}
