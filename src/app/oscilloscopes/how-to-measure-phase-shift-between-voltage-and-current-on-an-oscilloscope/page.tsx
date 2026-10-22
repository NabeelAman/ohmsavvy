import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  KeyIdea,
  ProductStrip,
  ScopeScreen,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-beginner-oscilloscopes/page";

const description =
  "How to measure phase shift between voltage and current on an oscilloscope: sense current, time the delay, and convert it to degrees and power factor.";

export const metadata = buildMetadata({
  title: "How to Measure Phase Shift: Voltage and Current",
  description,
  path: "/oscilloscopes/how-to-measure-phase-shift-between-voltage-and-current-on-an-oscilloscope",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;
const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;
const hantek = picks.find((p) => p.name === "Hantek DSO2D10")!;

const link = "text-accent hover:underline";

export default function HowToMeasurePhaseShiftVoltageCurrentPage() {
  return (
    <HowToShell
      title="How to Measure Phase Shift Between Voltage and Current on an Oscilloscope"
      description={description}
      published="2026-10-22"
      path="/oscilloscopes/how-to-measure-phase-shift-between-voltage-and-current-on-an-oscilloscope"
      category="oscilloscopes"
      intro={
        <>
          In a circuit with capacitance or inductance, the current does not peak at the same moment as
          the voltage. To measure phase shift between voltage and current on an oscilloscope, you put
          the voltage on one channel, a signal proportional to the current on the other, time the gap
          between matching points and convert it to degrees. From there, the cosine of that angle gives
          the power factor for sine waves. The catch is that a scope only measures voltage, so most of
          the work is getting a clean, safe current signal.
        </>
      }
      aside={{
        image: rigol.image,
        alt: "Rigol DS1054Z four-channel benchtop digital oscilloscope, front view",
        caption: (
          <>
            Any two-channel scope can make this measurement. The Rigol DS1054Z (50MHz, 4 channels, 1
            GSa/s) is our top beginner pick; see the{" "}
            <Link href="/oscilloscopes/rigol-ds1054z-review" className={link}>
              DS1054Z review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "why-current-shifts", label: "Why current and voltage shift apart" },
        { id: "sense-the-current", label: "Turn the current into a voltage" },
        { id: "connect-channels", label: "Connect voltage and current channels" },
        { id: "trigger-and-scale", label: "Trigger on the voltage and scale both" },
        { id: "measure-delay", label: "Measure the delay and the period" },
        { id: "phase-and-power-factor", label: "Convert to degrees and power factor" },
        { id: "rc-example", label: "Low-voltage RC example" },
        { id: "errors", label: "Errors that skew the angle" },
        { id: "which-scope", label: "Which scope you need" },
      ]}
      faq={[
        {
          q: "Does current lead or lag voltage in a capacitor?",
          a: "In a capacitive circuit the current leads the voltage, reaching its peak up to a quarter cycle (90°) earlier in a pure capacitor. In an inductive circuit, such as a motor or transformer winding, the current lags the voltage. On the scope, a leading current trace sits to the left of the voltage trace when you trigger on the voltage.",
        },
        {
          q: "Can I measure power factor with an oscilloscope?",
          a: "For sine-wave voltage and current, yes: power factor equals the cosine of the phase angle you measure. Many loads, such as switching power supplies and LED drivers, draw distorted, spiky current, and then cos φ only gives the displacement part. A power analyser or a scope with a power analysis option handles those loads properly.",
        },
        {
          q: "What value shunt resistor should I use?",
          a: "Small enough that it barely changes the circuit, large enough to give a readable signal. A common target is a shunt voltage of tens to a few hundred millivolts at the expected current, with the shunt well under 1% of the load impedance. Use a non-inductive resistor, because a wirewound shunt adds its own phase shift at higher frequencies.",
        },
        {
          q: "Why does my phase reading jump by 180 degrees?",
          a: "The current signal is inverted. That happens when the shunt or current probe is connected the opposite way round, for example a clamp facing backwards on the wire. Flip the probe, swap the shunt connections, or use the channel's invert setting, then check that the reading lands in a sensible range for the load.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-measure-phase-difference-oscilloscope",
          title: "How to Measure Phase Difference Between Two Signals",
          desc: "Cursor, automatic and XY Lissajous methods for any two same-frequency signals.",
        },
        {
          href: "/oscilloscopes/how-to-use-oscilloscope-math-functions-to-subtract-two-signals",
          title: "How to Use Oscilloscope Math to Subtract Two Signals",
          desc: "Read the voltage across a shunt that is not connected to ground with CH1 − CH2.",
        },
      ]}
    >
      <Callout title="Safety first: mains voltage and current need the right probes">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            The ground clip of a bench scope probe is connected to mains earth. Clipping it onto a live
            or neutral conductor, or onto a shunt resistor in a mains circuit, creates a short through
            the scope. Never float the scope by removing its earth.
          </li>
          <li>
            For mains measurements, read the voltage with a rated differential probe and the current
            with a current probe or clamp, or power the equipment under test from an isolation
            transformer. Keep within the CAT and voltage ratings printed on every probe and input.
          </li>
          <li>
            If you are learning the method, start with the low-voltage RC circuit below, driven from a
            signal generator, where nothing on the bench can hurt you.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="why-current-shifts" className="text-xl font-semibold mb-3">Why current and voltage shift apart</h2>
        <p className="text-muted leading-7 mb-4">
          In a resistor, current follows voltage exactly, so the phase shift is zero. A capacitor draws
          current to change its charge, so its current peaks while the voltage is still rising: current
          leads. An inductor resists changes in current, so its current peaks after the voltage: current
          lags. Real loads mix resistance with one or both, giving an angle somewhere between 0° and 90°
          either way.
        </p>
        <KeyIdea title="The two formulas">
          Phase shift φ = Δt ÷ T × 360°, where Δt is the time between matching points on the voltage
          and current waveforms and T is the period. For sine waves, power factor = cos φ.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={1} id="sense-the-current">Turn the current into a voltage the scope can read</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A scope input measures voltage only. To see current you need a sensor that produces a voltage
          proportional to it, with as little phase shift of its own as possible. The usual choices:
        </p>
        <DataTable
          head={["Current sensor", "How it works", "Watch out for"]}
          rows={[
            ["Shunt resistor", "Voltage across a small resistor = I × R, in phase with the current", "Must be non-inductive; on the high side it is not at ground potential"],
            ["Grounded sense resistor", "Shunt placed in the return leg so one end is at circuit ground", "Only safe on circuits where that point really is ground"],
            ["Current probe (clamp)", "Clamps around the wire and outputs a voltage per amp", "Rated bandwidth and DC capability vary; check the probe's specs"],
            ["Current transformer", "Isolated AC-only sensor with a burden resistor", "Adds its own phase error at low and high frequencies"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          A shunt reads in volts, so convert with I = V ÷ R: 100 mV across a 0.1 Ω shunt is 1 A. A
          current probe gives a scale such as 100 mV/A, which some scopes let you enter in the channel
          menu so the trace reads in amps directly. For phase, though, only the timing matters, so the
          scale can be anything readable. Most clamp meters, like those in{" "}
          <Link href="/multimeters/how-to-measure-ac-current-with-a-clamp-meter" className={link}>
            measuring AC current with a clamp meter
          </Link>
          , only display a number and have no waveform output, so they cannot be used for this.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="connect-channels">Connect the voltage to CH1 and the current to CH2</StepHeading>
        <p className="text-muted leading-7">
          Put the voltage across the load on CH1 and the current signal on CH2. On a low-voltage
          circuit, place the sense resistor in the ground return so both probes share one ground point
          and nothing is shorted through the scope. If the shunt has to sit on the high side, neither
          end is at ground, so measure it with a differential probe or with two channels and{" "}
          <Link href="/oscilloscopes/how-to-use-oscilloscope-math-functions-to-subtract-two-signals" className={link}>
            CH1 − CH2 math
          </Link>
          , which has accuracy limits explained in{" "}
          <Link href="/oscilloscopes/how-to-measure-a-differential-signal-with-a-two-channel-oscilloscope" className={link}>
            measuring a differential signal with two channels
          </Link>
          . Use 10x probes on both channels and compensate them first so neither probe adds its own
          shift.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="trigger-and-scale">Trigger on the voltage and scale both traces</StepHeading>
        <p className="text-muted leading-7">
          Trigger on CH1, the voltage, so it becomes the fixed reference and the current trace moves
          relative to it. Set the timebase to show two or three cycles, then adjust each channel&apos;s
          V/div so both waveforms are several divisions tall. They do not need to be the same height;
          only the timing of the zero crossings matters. Centre both traces on the middle line, or use
          AC coupling if one sits on a DC offset, because a shifted baseline moves the apparent zero
          crossing.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="measure-delay">Measure the delay and the period</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Place time cursors on a rising zero crossing of the voltage and the nearest rising zero
          crossing of the current. That gap is Δt. Then measure one full period T, or read the
          frequency and take T = 1 ÷ f. If the current crossing comes first, current leads; if it comes
          after, it lags. Many scopes offer an automatic phase or delay measurement between two
          channels; it does the same arithmetic, so check it against the cursors once.
        </p>
        <Figure
          caption={
            <>
              Voltage (green, CH1) and current sensed across a resistor (blue, CH2) at 200 µs/div. The
              period is 5 divisions (1 ms). The current&apos;s rising zero crossing comes 0.625 division
              (125 µs) before the voltage&apos;s, so the current leads by 125 ÷ 1000 × 360 = 45°.
            </>
          }
        >
          <ScopeScreen
            wave="sine"
            cycles={2}
            amplitude={2}
            second={{ wave: "sine", cycles: 2, amplitude: 1.42, shift: -0.625, label: "CH2 current" }}
            marks={[{ x1: 4.375, y1: 5.2, x2: 5, y2: 5.2, text: "Δt 125 µs" }]}
            labels={{ left: "CH1 & CH2 1 V/div", right: "200 µs/div" }}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Measuring across several cycles improves the accuracy of T, and turning on averaging steadies
          a noisy current trace. For general phase methods such as XY mode, see{" "}
          <Link href="/oscilloscopes/how-to-measure-phase-difference-oscilloscope" className={link}>
            how to measure phase difference
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={5} id="phase-and-power-factor">Convert the delay to degrees and power factor</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Divide Δt by the period and multiply by 360. For sine waves, take the cosine to get the power
          factor, and note whether the current leads (capacitive) or lags (inductive).
        </p>
        <DataTable
          head={["Frequency", "Period T", "Delay Δt", "Phase φ", "Power factor cos φ"]}
          rows={[
            ["1 kHz (figure)", "1 ms", "125 µs", "45°", "0.707"],
            ["50 Hz", "20 ms", "1 ms", "18°", "0.951"],
            ["50 Hz", "20 ms", "2 ms", "36°", "0.809"],
            ["60 Hz", "16.67 ms", "0.5 ms", "10.8°", "0.982"],
            ["60 Hz", "16.67 ms", "1.5 ms", "32.4°", "0.844"],
            ["50 Hz", "20 ms", "5 ms", "90°", "0 (pure reactance)"],
          ]}
          mono={[3, 4]}
        />
        <div className="mt-5">
          <Figure
            caption={
              <>
                Power factor falls slowly at first and then steeply: cos 30° = 0.866, cos 45° = 0.707,
                cos 60° = 0.5 and cos 80° ≈ 0.174.
              </>
            }
          >
            <BarChart
              items={[
                { label: "0°", value: 1, display: "1.000" },
                { label: "30°", value: 0.866, display: "0.866" },
                { label: "45°", value: 0.707, display: "0.707", highlight: true },
                { label: "60°", value: 0.5, display: "0.500" },
                { label: "80°", value: 0.174, display: "0.174" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The cos φ result is only the full power factor when both waveforms are clean sines. Loads with
          rectifiers, such as most switching power supplies, draw current in short pulses near the
          voltage peaks. The zero crossings can line up while the power factor is still poor, because the
          distortion lowers it too. Look at the current shape before you trust cos φ.
        </p>
      </section>

      <section>
        <h2 id="rc-example" className="text-xl font-semibold mb-3">Worked example: a low-voltage RC circuit</h2>
        <p className="text-muted leading-7 mb-4">
          This bench setup reproduces the figure above. A signal generator drives a 100 nF capacitor in
          series with a 1.6 kΩ resistor, with the resistor&apos;s far end at ground. CH1 goes on the
          generator output (the voltage across the whole RC), CH2 on the junction of C and R. The
          voltage across the resistor is the current times 1.6 kΩ, so CH2 shows the current&apos;s shape
          and timing.
        </p>
        <Figure caption={<>The steps in order. Swap step 1 for a current probe on anything mains-powered.</>}>
          <FlowDiagram
            steps={[
              { label: "Sense current", sub: "Shunt, grounded resistor or current probe" },
              { label: "Trigger on V", sub: "CH1 voltage is the reference" },
              { label: "Read Δt and T", sub: "Matching zero crossings, one period" },
              { label: "φ and PF", sub: "Δt ÷ T × 360°, then cos φ" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          At 1 kHz the capacitor&apos;s reactance is 1 ÷ (2π × 1000 × 100 nF) ≈ 1,592 Ω, almost equal to
          the resistor, so theory predicts the current leads by arctan(1592 ÷ 1600) ≈ 44.8°. With 2 V
          peak from the generator, the total impedance is about 2,257 Ω, the current peaks at about
          0.89 mA, and the resistor voltage peaks at about 1.42 V, the CH2 height in the figure. Reading
          125 µs out of a 1 ms period gives 45°, within cursor resolution of the calculation. Swap the
          capacitor for an inductor and the current trace moves to the right of the voltage instead.
        </p>
      </section>

      <section>
        <h2 id="errors" className="text-xl font-semibold mb-3">Errors that skew the angle</h2>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <strong className="text-foreground">Sensor phase error.</strong> Current probes and current
            transformers have their own delay, and wirewound shunts add inductance. At 50 or 60 Hz this
            is usually small; at higher frequencies check the sensor&apos;s specs.
          </li>
          <li>
            <strong className="text-foreground">Channel skew.</strong> Different probe types or cable
            lengths delay one channel. Some scopes offer a deskew setting; feed the same signal to both
            channels to check for a zero reading.
          </li>
          <li>
            <strong className="text-foreground">Inverted sensor.</strong> A reversed shunt or clamp
            adds 180°. A reading near 180° on an ordinary load almost always means this.
          </li>
          <li>
            <strong className="text-foreground">Offsets and noise.</strong> A DC offset or hum shifts
            the zero crossings. Use AC coupling, averaging, or the bandwidth limit on slow mains signals.
          </li>
        </ul>
      </section>

      <section>
        <h2 id="which-scope" className="text-xl font-semibold mb-3">Which scope you need for voltage and current phase</h2>
        <p className="text-muted leading-7 mb-4">
          Two channels are the minimum, and bandwidth is rarely the limit at mains or audio frequencies.
          A built-in signal generator is handy for the RC practice circuit. Compare models in our{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            best beginner oscilloscopes
          </Link>{" "}
          roundup.
        </p>
        <ProductStrip
          title="Two-channel-and-up scopes in our reviews"
          items={[
            {
              name: "Rigol DS1054Z",
              image: rigol.image,
              alt: "Rigol DS1054Z four-channel benchtop digital oscilloscope",
              href: "/oscilloscopes/rigol-ds1054z-review",
              note: "50MHz, 4 channels, 1 GSa/s; the default beginner recommendation for years.",
            },
            {
              name: "Hantek DSO2D10",
              image: hantek.image,
              alt: "Hantek DSO2D10 two-channel oscilloscope with built-in waveform generator",
              href: "/oscilloscopes/hantek-dso2d10-review",
              note: "100MHz, 2 channels, 1 GSa/s; an oscilloscope and waveform generator in one unit.",
            },
            {
              name: "Siglent SDS1104X-E",
              image: siglent.image,
              alt: "Siglent SDS1104X-E four-channel benchtop digital oscilloscope",
              href: "/oscilloscopes/siglent-sds1104x-e-review",
              note: "100MHz, 4 channels, 1 GSa/s; more bandwidth and a better UI than the Rigol.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
