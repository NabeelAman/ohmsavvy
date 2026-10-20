import Link from "next/link";
import { Callout, DataTable, Figure, HowToShell, InfoCards, KeyIdea, ScopeScreen, StepHeading } from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-beginner-oscilloscopes/page";

export const metadata = buildMetadata({
  title: "How to Use an Oscilloscope: First Session Guide",
  description:
    "How to use an oscilloscope, step by step: connect and set the probe, press Autoset, adjust V/div and time/div, set the trigger, and take first measurements.",
  path: "/oscilloscopes/how-to-use-an-oscilloscope",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;

const link = "text-accent hover:underline";

export default function HowToUseAnOscilloscopePage() {
  return (
    <HowToShell
      title="How to Use an Oscilloscope"
      path="/oscilloscopes/how-to-use-an-oscilloscope"
      category="oscilloscopes"
      intro={
        <>
          Learning how to use an oscilloscope is mostly about four controls: vertical scale, horizontal
          scale, trigger, and measurements. This guide walks through a complete first session, from
          plugging in the probe to reading a stable waveform, using the test signal built into almost
          every scope so you can practise without touching a real circuit.
        </>
      }
      aside={{
        image: rigol.image,
        alt: "A four-channel benchtop digital oscilloscope with its front-panel controls",
        caption: (
          <>
            The steps below apply to nearly any digital scope, including the 4-channel Rigol DS1054Z in
            our{" "}
            <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
              beginner oscilloscope picks
            </Link>
            .
          </>
        ),
      }}
      next={[
        {
          href: "/oscilloscopes/how-to-read-an-oscilloscope",
          title: "How to Read an Oscilloscope Screen",
          desc: "Turn divisions on the grid into volts, milliseconds and hertz, with worked examples.",
        },
        {
          href: "/oscilloscopes/how-to-trigger-an-oscilloscope",
          title: "How to Trigger an Oscilloscope",
          desc: "Edge trigger, level, slope and Auto/Normal/Single modes, and how to stop a rolling waveform.",
        },
      ]}
    >
      <Callout title="Safety before your first connection">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            On a mains-powered bench scope, the probe&apos;s ground clip is normally connected to mains
            earth through the power cord. Clip it only to a point that is at earth potential or to the
            ground of a low-voltage circuit. Clipping it to a point that isn&apos;t at earth potential,
            such as anywhere on a mains-connected, non-isolated circuit, creates a short through the
            ground lead that can cause damage, fire or injury.
          </li>
          <li>
            Never remove or defeat the scope&apos;s earth connection (&quot;floating&quot; the scope) to
            get around this. For mains-referenced circuits, use an isolation transformer on the device
            under test, a differential probe, or an isolated-channel or handheld scope rated for the job.
          </li>
          <li>
            Check the maximum input voltage and CAT rating printed on your probe and scope. Standard
            1x/10x probes are not for mains work unless their rating explicitly covers it. For a first
            session, stick to the scope&apos;s own test output and low-voltage battery or USB circuits.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 className="text-xl font-semibold mb-3">The controls you&apos;ll use in every session</h2>
        <p className="text-muted leading-7 mb-5">
          Front panels differ between brands, but the same groups of controls appear on nearly every
          digital storage oscilloscope. Find each one on your scope before you start; the labels may be
          slightly different (Autoset vs Auto, Scale vs Volts/Div).
        </p>
        <InfoCards
          items={[
            { label: "Vertical (V/div)", desc: "Sets how many volts each vertical grid division represents, per channel." },
            { label: "Vertical position", desc: "Moves the trace up or down without changing its size." },
            { label: "Horizontal (time/div)", desc: "Sets how much time each horizontal division represents." },
            { label: "Trigger", desc: "Decides when the scope starts drawing, so repeating signals stand still." },
            { label: "Autoset / Auto", desc: "Makes the scope pick starting scale and trigger settings for you." },
            { label: "Run/Stop and Single", desc: "Freeze the display, or capture one triggered event and hold it." },
          ]}
        />
      </section>

      <section>
        <StepHeading n={1}>Power on and reset to a known state</StepHeading>
        <p className="text-muted leading-7">
          Plug the scope into an earthed outlet and switch it on. Many scopes have a Default Setup (or
          Default/Factory) button that clears whatever settings the last user left behind. Pressing it
          first means every step below starts from the same place: one channel on, DC coupling, a
          moderate vertical and horizontal scale, and an edge trigger. If you can&apos;t find the button,
          check your model&apos;s manual, as the location varies.
        </p>
      </section>

      <section>
        <StepHeading n={2}>Connect the probe and match the 1x/10x setting</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Push the probe&apos;s BNC connector onto the Channel 1 input and twist it to lock. Most probes
          supplied with a scope have a 1x/10x switch on the body. Set it to 10x: it divides the signal by
          ten, puts much less load on the circuit, and is the position most general measurements use.
        </p>
        <p className="text-muted leading-7">
          Then open the Channel 1 menu and set the probe ratio (sometimes called attenuation) to 10x as
          well. This is the step beginners most often miss. If the probe is on 10x but the channel is set
          to 1x, every voltage on screen reads ten times too small. Some scopes detect the probe
          automatically; many don&apos;t, so check.
        </p>
      </section>

      <section>
        <StepHeading n={3}>Hook up to the built-in test signal</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Almost every scope has a small probe compensation output on the front panel, usually two
          terminals: one signal tab and one ground. It produces a square wave, commonly around 1 kHz; the
          exact frequency and amplitude vary by model, so check your manual or the label next to the
          terminals.
        </p>
        <p className="text-muted leading-7">
          Clip the probe&apos;s ground lead to the ground terminal and hook the probe tip onto the signal
          tab. This is a safe signal to learn on, and it doubles as a check that your probe is working
          and correctly{" "}
          <Link href="/oscilloscopes/how-to-compensate-an-oscilloscope-probe" className={link}>
            compensated
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={4}>Press Autoset</StepHeading>
        <p className="text-muted leading-7 mb-5">
          Press Autoset (or Auto). The scope looks at the incoming signal and picks a vertical scale, a
          horizontal scale and a trigger level that should give you a few stable cycles on screen. For
          the test signal you should see a square wave with flat tops and sharp corners. If the corners
          show spikes or rounded edges, the probe needs compensating before you trust any square-wave
          measurement.
        </p>
        <Figure
          caption={
            <>
              A typical result after Autoset on the test output: a square wave at 1 V/div and 200 µs/div.
              Each cycle spans 5 divisions, so the period is 5 × 200 µs = 1 ms (1 kHz). The dashed T line
              is the trigger level. Your scope&apos;s output level and frequency may differ.
            </>
          }
        >
          <ScopeScreen
            wave="square"
            cycles={2}
            amplitude={1.5}
            triggerLevel={0.5}
            labels={{ left: "1 V/div", right: "200 µs/div" }}
            marks={[{ x1: 0, y1: 7, x2: 5, y2: 7, text: "5 div = 1 ms" }]}
          />
        </Figure>
        <p className="mt-4 text-muted leading-7">
          Autoset is a starting point, not the answer. It picks settings that show the signal; it
          doesn&apos;t know what you actually want to look at. The next three steps are how you take
          control.
        </p>
      </section>

      <section>
        <StepHeading n={5}>Adjust the vertical scale (V/div) and position</StepHeading>
        <p className="text-muted leading-7">
          Turn the Channel 1 vertical scale knob one click at a time and watch the waveform grow or
          shrink. Smaller V/div values make the signal taller. Aim to have the waveform fill most of the
          screen height without its top or bottom running off the edge, because a clipped waveform gives
          wrong measurements. Use the vertical position knob to slide the trace up or down. The small
          marker at the left edge of the screen shows where 0 V sits for that channel; keep track of it,
          because readings are taken relative to that line.
        </p>
      </section>

      <section>
        <StepHeading n={6}>Adjust the horizontal scale (time/div)</StepHeading>
        <p className="text-muted leading-7">
          Now turn the horizontal scale knob. A faster setting (fewer microseconds per division)
          stretches the waveform out so you can see edge detail; a slower setting squeezes more cycles
          onto the screen. For most measurements, two to four complete cycles is a good view: enough to
          see that the signal repeats, with each cycle wide enough to count divisions accurately. The
          horizontal position knob shifts the view earlier or later in time relative to the trigger
          point.
        </p>
      </section>

      <section>
        <StepHeading n={7}>Set the trigger so the waveform stands still</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The trigger tells the scope where in the signal to start each sweep. Without a sensible trigger,
          a repeating waveform drifts or rolls across the screen. For a first session, set the trigger to:
        </p>
        <ul className="space-y-2 text-muted leading-7 list-disc pl-5 mb-4">
          <li>
            <strong className="text-foreground">Type: Edge</strong>, the default on most scopes.
          </li>
          <li>
            <strong className="text-foreground">Source: CH1</strong>, the channel your probe is on.
          </li>
          <li>
            <strong className="text-foreground">Slope: Rising</strong>, so the sweep starts as the signal
            goes up.
          </li>
          <li>
            <strong className="text-foreground">Level:</strong> somewhere between the signal&apos;s lowest
            and highest point, roughly the middle.
          </li>
        </ul>
        <p className="text-muted leading-7">
          Move the trigger level above the top of the waveform and the display will either freeze on
          the last capture or start drifting unstably, depending on whether the scope is in Normal or Auto mode. Bring it back inside
          the signal and the picture locks again. Seeing that happen once teaches more than any
          explanation. The{" "}
          <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope" className={link}>
            trigger guide
          </Link>{" "}
          covers modes, holdoff and single-shot capture in depth.
        </p>
      </section>

      <section>
        <StepHeading n={8}>Take your first measurements</StepHeading>
        <p className="text-muted leading-7 mb-4">
          There are three ways to measure, and it&apos;s worth trying all of them on the test signal:
        </p>
        <ul className="space-y-2 text-muted leading-7 list-disc pl-5 mb-4">
          <li>
            <strong className="text-foreground">Count divisions.</strong> Height in divisions × V/div gives
            voltage; width of one cycle × time/div gives the period, and frequency is 1 ÷ period. See{" "}
            <Link href="/oscilloscopes/how-to-read-an-oscilloscope" className={link}>
              how to read an oscilloscope screen
            </Link>
            .
          </li>
          <li>
            <strong className="text-foreground">Automatic measurements.</strong> Open the Measure menu and
            add peak-to-peak voltage and frequency. The scope calculates them from the captured data and
            shows the values on screen.
          </li>
          <li>
            <strong className="text-foreground">Cursors.</strong> Two movable lines you place by hand. The
            scope shows the voltage or time difference between them, which is useful for measuring one
            specific feature.
          </li>
        </ul>
        <p className="text-muted leading-7">
          If the automatic frequency reading roughly agrees with what you worked out by counting
          divisions, your probe ratio, scales and trigger are all set correctly. For more detail, see
          how to{" "}
          <Link href="/oscilloscopes/how-to-measure-voltage-with-an-oscilloscope" className={link}>
            measure voltage
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/how-to-measure-frequency-with-an-oscilloscope" className={link}>
            measure frequency
          </Link>{" "}
          with an oscilloscope.
        </p>
      </section>

      <section>
        <StepHeading n={9}>Move to a real (low-voltage) circuit</StepHeading>
        <p className="text-muted leading-7">
          Once the test signal behaves, try a safe real signal, such as a PWM pin on a USB-powered
          microcontroller board. Connect the ground clip to the circuit&apos;s ground first, then touch the
          probe tip to the point you want to see, and press Autoset again. Keep the ground lead short and
          the circuit low-voltage. If you&apos;re not sure whether a scope is even the right tool for a
          job, our{" "}
          <Link href="/oscilloscopes/oscilloscope-vs-multimeter" className={link}>
            oscilloscope vs multimeter
          </Link>{" "}
          guide explains when a{" "}
          <Link href="/multimeters/how-to-use-a-multimeter" className={link}>
            multimeter
          </Link>{" "}
          is quicker.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Quick reference: starting settings</h2>
        <p className="text-muted leading-7 mb-4">
          A sensible starting point for a repeating low-voltage signal on a typical digital scope.
          Autoset will usually land close to this, and you fine-tune from there.
        </p>
        <DataTable
          head={["Setting", "Start with", "Why"]}
          rows={[
            ["Probe switch", "10x", "Less circuit loading; standard for general use"],
            ["Channel probe ratio", "10x (match the probe)", "Otherwise voltages read 10 times too small"],
            ["Coupling", "DC", "Shows the full signal, including any DC level"],
            ["V/div", "Waveform fills most of the height", "Better resolution without clipping"],
            ["Time/div", "2 to 4 cycles on screen", "Enough cycles to see repetition and count divisions"],
            ["Trigger", "Edge, rising, CH1, level mid-signal", "Gives a stable picture on most repeating signals"],
          ]}
        />
      </section>

      <KeyIdea title="If the screen looks wrong, check these first">
        <ul className="space-y-1 list-disc pl-5">
          <li>Flat line: is the channel switched on, the probe tip and ground actually connected, and the trace on screen (vertical position)?</li>
          <li>Rolling or blurred waveform: trigger source on the wrong channel, or level outside the signal.</li>
          <li>Voltage ten times too small or too large: probe switch and channel probe ratio don&apos;t match.</li>
          <li>Rounded or spiky square-wave corners: probe needs compensating.</li>
        </ul>
      </KeyIdea>

      <section>
        <h2 className="text-xl font-semibold mb-3">Which scope should you practise on?</h2>
        <p className="text-muted leading-7">
          Any digital scope with a probe compensation output will do. If you&apos;re still choosing, a
          bench model such as the{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-review" className={link}>
            Rigol DS1054Z
          </Link>{" "}
          (50MHz, 4 channels) or{" "}
          <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={link}>
            Siglent SDS1104X-E
          </Link>{" "}
          (100MHz, 4 channels) has the full set of controls described here. Pocket units like the{" "}
          <Link href="/oscilloscopes/fnirsi-dso152-review" className={link}>
            FNIRSI DSO152
          </Link>{" "}
          (200kHz, 1 channel) follow the same ideas with fewer knobs. The{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            buying guide
          </Link>{" "}
          explains which specs matter, and{" "}
          <Link href="/oscilloscopes/what-is-an-oscilloscope" className={link}>
            what is an oscilloscope
          </Link>{" "}
          covers the different types.
        </p>
      </section>
    </HowToShell>
  );
}
