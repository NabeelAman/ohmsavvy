import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  ProductStrip,
  ScopeScreen,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-beginner-oscilloscopes/page";

const description =
  "How to use an oscilloscope to check a crystal oscillator: probe XTAL_OUT with a 10x probe, what a good waveform looks like, frequency, and why it won't start.";

export const metadata = buildMetadata({
  title: "How to Check a Crystal Oscillator With a Scope",
  description,
  path: "/oscilloscopes/how-to-use-an-oscilloscope-to-check-a-crystal-oscillator",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;
const hantek = picks.find((p) => p.name === "Hantek DSO2D10")!;
const fnirsi = picks.find((p) => p.name === "FNIRSI DSO152")!;

const link = "text-accent hover:underline";

/** Pierce oscillator: inverting amplifier and bias resistor inside the chip, crystal and two load capacitors outside. */
function PierceDiagram() {
  return (
    <svg
      viewBox="0 0 340 215"
      className="w-full h-auto"
      role="img"
      aria-label="Schematic of a Pierce crystal oscillator: an inverter and feedback resistor inside the chip, the crystal between the XTAL_IN and XTAL_OUT pins, and a load capacitor from each pin to ground, with the probe point on XTAL_OUT"
    >
      {/* chip boundary */}
      <rect x="66" y="6" width="210" height="80" rx="6" className="fill-surface stroke-border" strokeWidth="1.2" strokeDasharray="5 3" />
      <text x="72" y="20" fontSize="9" className="fill-muted">inside the chip</text>
      <g className="stroke-foreground" strokeWidth="1.6" fill="none" strokeLinejoin="round">
        {/* inverter */}
        <path d="M150 34 L150 70 L184 52 Z" className="fill-surface" />
        <circle cx="188" cy="52" r="4" className="fill-surface" />
        {/* wires into and out of the inverter */}
        <path d="M90 52 H150 M192 52 H250" />
        {/* feedback resistor Rf */}
        <path d="M112 52 V30 H148 M188 30 H228 V52" />
        <rect x="148" y="24" width="40" height="12" rx="2" className="fill-surface" />
        {/* pins down to the crystal */}
        <path d="M90 52 V128 M250 52 V128" />
        {/* crystal */}
        <path d="M90 128 H156 M184 128 H250" />
        <path d="M156 114 V142 M184 114 V142" />
        <rect x="162" y="117" width="16" height="22" rx="1" className="fill-surface" />
        {/* load capacitors and ground */}
        <path d="M90 128 V152 M78 152 H102 M78 160 H102 M90 160 V182" />
        <path d="M250 128 V152 M238 152 H262 M238 160 H262 M250 160 V182" />
        <path d="M78 182 H102 M83 187 H97 M88 192 H92" />
        <path d="M238 182 H262 M243 187 H257 M248 192 H252" />
      </g>
      {/* pin dots */}
      <circle cx="90" cy="86" r="3" className="fill-foreground" />
      <circle cx="250" cy="86" r="3" className="fill-foreground" />
      {/* probe point */}
      <path d="M318 104 L258 104" className="stroke-accent" strokeWidth="1.8" />
      <path d="M258 104 l8 -4 M258 104 l8 4" className="stroke-accent" strokeWidth="1.8" />
      <g fontSize="10" className="fill-foreground">
        <text x="168" y="20" textAnchor="middle" fontSize="9">Rf</text>
        <text x="84" y="104" textAnchor="end">XTAL_IN</text>
        <text x="246" y="76" textAnchor="end">XTAL_OUT</text>
        <text x="170" y="158" textAnchor="middle">crystal</text>
        <text x="110" y="160">C1</text>
        <text x="216" y="160">C2</text>
      </g>
      <text x="318" y="96" fontSize="10" textAnchor="end" className="fill-accent">10x probe</text>
      <text x="318" y="120" fontSize="9" textAnchor="end" className="fill-accent">here</text>
      <text x="170" y="210" fontSize="9" textAnchor="middle" className="fill-muted">Load capacitance seen by the crystal ≈ C1·C2 ÷ (C1 + C2) + stray</text>
    </svg>
  );
}

export default function HowToUseAnOscilloscopeToCheckACrystalOscillatorPage() {
  return (
    <HowToShell
      title="How to Use an Oscilloscope to Check a Crystal Oscillator"
      description={description}
      published="2026-10-22"
      path="/oscilloscopes/how-to-use-an-oscilloscope-to-check-a-crystal-oscillator"
      category="oscilloscopes"
      intro={
        <>
          To use an oscilloscope to check a crystal oscillator, probe the oscillator&apos;s output pin
          (XTAL_OUT) or a buffered clock output with a 10x probe, never a 1x one. A running crystal shows a
          roughly sinusoidal swing at the frequency marked on the can, which the scope&apos;s frequency
          measurement can confirm. A flat DC level means it is not oscillating. Because the probe&apos;s own
          capacitance can stop or pull the crystal, where and how you probe matters as much as what you see.
        </>
      }
      aside={{
        image: rigol.image,
        alt: "Rigol DS1054Z four-channel 50MHz digital oscilloscope, front view",
        caption: (
          <>
            The Rigol DS1054Z (50MHz, 4 channels, 1 GSa/s) has enough bandwidth for common microcontroller
            crystals in the 8 MHz to 16 MHz range. See our{" "}
            <Link href="/oscilloscopes/rigol-ds1054z-review" className={link}>
              DS1054Z review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "pierce-oscillator-basics", label: "How a crystal oscillator works" },
        { id: "probe-loading", label: "Why the probe can stop it" },
        { id: "set-up-the-probe", label: "Set up a 10x probe" },
        { id: "probe-the-output", label: "Probe the output, not the input" },
        { id: "good-waveform", label: "What a good waveform looks like" },
        { id: "measure-the-frequency", label: "Measure the frequency" },
        { id: "no-oscillation", label: "Signs of no oscillation" },
        { id: "start-up-problems", label: "Start-up problems" },
        { id: "bandwidth-needed", label: "Bandwidth you need" },
        { id: "which-scope", label: "Which scope to use" },
      ]}
      faq={[
        {
          q: "Should I probe XTAL_IN or XTAL_OUT?",
          a: "Probe XTAL_OUT, or better still a buffered clock output if the chip has one. The input pin is a high-impedance node at the start of the amplifier, so the probe's capacitance and resistance disturb it most and are more likely to stop the oscillation. The output is driven by the amplifier and tolerates the extra load better, though it is still affected.",
        },
        {
          q: "Why does my crystal stop when I touch it with the probe?",
          a: "The probe adds capacitance, typically around 10 to 15 pF for a 10x probe and much more for 1x, in parallel with a load capacitor that may itself be only 10 to 20 pF. That can push the circuit past the point where the amplifier has enough gain to sustain oscillation. If it stops, the oscillator may have little margin even without the probe, which is worth investigating.",
        },
        {
          q: "Can a multimeter test a crystal oscillator?",
          a: "Only crudely. A resistance check can find a crystal shorted by damage or contamination, since a good one reads open, and a DC voltage reading on the pins shows whether the chip is biasing them. A multimeter cannot show whether the crystal is actually oscillating or at what frequency with any confidence, which is the job of an oscilloscope or a frequency counter.",
        },
        {
          q: "Why does the scope show a slightly different frequency from the crystal marking?",
          a: "Two reasons. The probe's capacitance pulls the crystal slightly, usually lower. And the scope's own timebase has a tolerance, often tens of parts per million on hobby scopes, which is similar to or larger than the crystal's own tolerance. A reading within a small fraction of a percent confirms the right crystal is running, not that it is within its ppm specification.",
        },
        {
          q: "How do I check a 32.768 kHz watch crystal?",
          a: "Carefully, because these low-power oscillators run on very little drive and are easily stopped by probe loading. Use a 10x probe on the output pin, a slow timebase and a sensitive V/div. If the chip can route the real-time clock to an output pin, measure there instead. These crystals also start slowly, often taking hundreds of milliseconds or longer.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-measure-frequency-with-an-oscilloscope",
          title: "How to Measure Frequency with an Oscilloscope",
          desc: "Period, f = 1/T, cursors and the automatic counter, with notes on how accurate the reading is.",
        },
        {
          href: "/oscilloscopes/how-to-compensate-an-oscilloscope-probe",
          title: "How to Compensate an Oscilloscope Probe",
          desc: "Set the 10x probe's trimmer before probing a clock so the waveform shape is trustworthy.",
        },
      ]}
    >
      <Callout title="Before you probe">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Crystal pins are close together and close to other pins. Probe with the board unpowered first to
            position the tip, and use a spring ground so the clip cannot short anything.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="pierce-oscillator-basics" className="text-xl font-semibold mb-3">How a microcontroller crystal oscillator works</h2>
        <p className="text-muted leading-7 mb-4">
          Most microcontroller and clock circuits use the Pierce arrangement. Inside the chip, an inverting
          amplifier sits between two pins, XTAL_IN and XTAL_OUT, with a high-value resistor across it that
          biases it into its linear region. Outside, the crystal connects across the two pins and a load
          capacitor runs from each pin to ground. The crystal and capacitors form a filter that only passes
          the crystal&apos;s resonant frequency back to the amplifier&apos;s input, so it oscillates there.
         
        </p>
        <Figure caption={<>A Pierce oscillator. The probe point is the output pin, XTAL_OUT, which the internal amplifier drives.</>}>
          <PierceDiagram />
        </Figure>
        <KeyIdea title="Load capacitance">
          A crystal is cut to hit its marked frequency with a specified load capacitance. The two capacitors
          appear in series, plus a few picofarads of board and pin stray capacitance. Two 18 pF capacitors
          with about 3 pF of stray give roughly 18 × 18 ÷ 36 + 3 = 12 pF.
        </KeyIdea>
      </section>

      <section>
        <h2 id="probe-loading" className="text-xl font-semibold mb-3">Why the probe can stop or pull the crystal</h2>
        <p className="text-muted leading-7 mb-4">
          A probe is not invisible. Its tip capacitance appears in parallel with the load capacitor on
          whichever pin you touch, and on a crystal circuit that is a large change. Extra load shifts the
          frequency slightly, usually downwards, and reduces the loop gain. If the oscillator had little
          margin, it simply stops, and the scope shows a flat line that was caused by the measurement.
        </p>
        <Figure caption={<>Typical values only: a common 18 pF load capacitor against typical probe tip capacitance. A 1x probe can add several times the capacitor&apos;s own value.</>}>
          <BarChart
            items={[
              { label: "Load capacitor (example)", value: 18, display: "18 pF" },
              { label: "10x probe (typical)", value: 12.5, display: "≈ 10–15 pF", highlight: true },
              { label: "1x probe (typical)", value: 80, display: "≈ 50–100+ pF" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="set-up-the-probe">Set up a compensated 10x probe</StepHeading>
        <p className="text-muted leading-7">
          Switch the probe to 10x and set the channel to match. At 10x the probe presents around 10 MΩ and
          the lower capacitance shown above; at 1x it loads the circuit far more heavily and usually has too
          little bandwidth for a megahertz clock anyway. Compensate the probe on the scope&apos;s calibration
          output first, as described in{" "}
          <Link href="/oscilloscopes/how-to-compensate-an-oscilloscope-probe" className={link}>
            how to compensate an oscilloscope probe
          </Link>
          , and swap the long ground clip for a spring ground tip.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="probe-the-output">Probe the output pin, or a buffered clock</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The best place to look is a buffered clock output, if one exists. Many microcontrollers can route
          the system or oscillator clock to a general-purpose pin through a firmware setting, and some clock
          chips have a dedicated output. A buffered output is isolated from the crystal, so the probe cannot disturb it.
        </p>
        <p className="text-muted leading-7">
          Without one, probe XTAL_OUT. Avoid XTAL_IN: it is the amplifier&apos;s high-impedance input and
          the most sensitive node in the circuit. Ground the spring tip to the nearest ground pad, ideally
          the ground side of one of the load capacitors.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="good-waveform">Check that the waveform looks right</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set DC coupling, a timebase that shows a few cycles (about 50 ns/div for 8 MHz), and trigger on the
          rising edge at the middle of the swing. On XTAL_OUT a healthy oscillator usually shows a roughly
          sinusoidal waveform centred near the amplifier&apos;s bias point, often around half the supply.
          Amplitude depends on the chip and its drive setting, from a fraction of a volt to nearly rail to
          rail, so compare with a known-good board if you can. A buffered output looks like a square wave.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>XTAL_OUT on a running oscillator: a roughly sinusoidal swing at the crystal frequency.</>}>
            <ScopeScreen wave="sine" cycles={4} amplitude={1.5} triggerLevel={0} labels={{ left: "XTAL_OUT, 10x", right: "50 ns/div" }} />
          </Figure>
          <Figure caption={<>A buffered clock output from the same oscillator is a logic-level square wave.</>}>
            <ScopeScreen wave="square" cycles={4} amplitude={2} triggerLevel={0} labels={{ left: "clock out pin", right: "50 ns/div" }} />
          </Figure>
        </div>
      </section>

      <section>
        <StepHeading n={4} id="measure-the-frequency">Measure the frequency with the scope&apos;s counter</StepHeading>
        <p className="text-muted leading-7">
          Add a frequency measurement, or use the hardware frequency counter if your scope has one, which
          usually gives more digits. The reading should match the crystal marking closely, for example
          8.000 MHz. This confirms the right crystal is fitted and running at its fundamental rather than at
          a wrong frequency. It does not verify the crystal&apos;s ppm tolerance, because a hobby scope&apos;s
          timebase is not that accurate and the probe pulls the frequency slightly. For the measurement
          method itself, see{" "}
          <Link href="/oscilloscopes/how-to-measure-frequency-with-an-oscilloscope" className={link}>
            how to measure frequency with an oscilloscope
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="no-oscillation" className="text-xl font-semibold mb-3">Signs of no oscillation and what causes them</h2>
        <p className="text-muted leading-7 mb-4">
          A dead oscillator shows a steady DC level on both pins and no swing, often sitting at the bias
          point or pulled to a rail.
        </p>
        <Figure caption={<>Not oscillating: XTAL_OUT sits at a DC level with no swing at any timebase.</>}>
          <ScopeScreen wave="flat" offset={1} labels={{ left: "XTAL_OUT, DC coupled", right: "no oscillation" }} />
        </Figure>
        <div className="mt-4">
          <DataTable
            head={["Check", "Why it matters"]}
            rows={[
              ["Has firmware enabled the external oscillator?", "Many microcontrollers boot on an internal RC clock and only start the crystal when configured to"],
              ["Does it start with the probe removed?", "Test via a clock output or the chip's behavior; the probe may be what stops it"],
              ["Load capacitors fitted and the right value?", "Missing or wrong capacitors change the load and can stop oscillation"],
              ["Crystal correct for the circuit?", "Wrong frequency, wrong load capacitance or an overtone part can fail to start"],
              ["Solder joints and board clean?", "Cracked joints, a damaged crystal or flux residue leaking between pins all stop it"],
            ]}
          />
        </div>
      </section>

      <section>
        <h2 id="start-up-problems" className="text-xl font-semibold mb-3">Start-up problems</h2>
        <p className="text-muted leading-7">
          A crystal oscillator does not start instantly: the amplitude grows from noise over many cycles.
          Megahertz crystals typically start within milliseconds, while 32.768 kHz watch crystals can take
          hundreds of milliseconds or more. To watch it, put the scope in Single mode triggered on the supply
          rising or the reset line releasing, using a second channel, and set a timebase that covers the
          expected start-up. If the amplitude builds slowly, or the oscillator only starts when warm or with
          a finger near it, the circuit has marginal gain. Our{" "}
          <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope" className={link}>
            triggering guide
          </Link>{" "}
          explains Single mode.
        </p>
      </section>

      <section>
        <h2 id="bandwidth-needed" className="text-xl font-semibold mb-3">Oscilloscope bandwidth needed for a crystal oscillator</h2>
        <p className="text-muted leading-7 mb-4">
          A rule of thumb is at least three times the frequency to read a sine&apos;s amplitude within a few
          percent, and about five times for a square clock output so its edges look square. Below the
          frequency itself the scope barely shows the signal. Our{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            bandwidth explainer
          </Link>{" "}
          covers the roll-off.
        </p>
        <DataTable
          head={["Crystal", "Sine at XTAL_OUT (≈ 3×)", "Square clock out (≈ 5×)"]}
          rows={[
            ["32.768 kHz", "≈ 100 kHz", "≈ 165 kHz"],
            ["8 MHz", "≈ 24 MHz", "≈ 40 MHz"],
            ["16 MHz", "≈ 48 MHz", "≈ 80 MHz"],
            ["25 MHz", "≈ 75 MHz", "≈ 125 MHz"],
          ]}
          mono={[1, 2]}
        />
      </section>

      <section>
        <h2 id="which-scope" className="text-xl font-semibold mb-3">Which oscilloscope to use</h2>
        <p className="text-muted leading-7 mb-6">
          By that rule, a 200kHz pocket scope only suits watch crystals, a 50MHz scope covers common
          microcontroller crystals up to about 16 MHz, and 100MHz leaves headroom for faster clocks. Compare
          all the options in our{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            best beginner oscilloscopes
          </Link>{" "}
          roundup.
        </p>
        <ProductStrip
          title="Scopes in our reviews"
          items={[
            {
              name: "Rigol DS1054Z",
              image: rigol.image,
              alt: "Rigol DS1054Z four-channel digital oscilloscope",
              href: "/oscilloscopes/rigol-ds1054z-review",
              note: "50MHz, 4 channels, 1 GSa/s. Our best overall pick for general electronics.",
            },
            {
              name: "Hantek DSO2D10",
              image: hantek.image,
              alt: "Hantek DSO2D10 two-channel oscilloscope with built-in waveform generator",
              href: "/oscilloscopes/hantek-dso2d10-review",
              note: "100MHz, 2 channels, 1 GSa/s, with a built-in waveform generator.",
            },
            {
              name: "FNIRSI DSO152",
              image: fnirsi.image,
              alt: "FNIRSI DSO152 pocket single-channel oscilloscope",
              href: "/oscilloscopes/fnirsi-dso152-review",
              note: "200kHz, 1 channel, 2.5 MSa/s. Pocket-sized; suits only slow signals such as watch crystals.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
