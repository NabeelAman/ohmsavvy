import Link from "next/link";
import { Callout, DataTable, Figure, HowToShell, InfoCards, KeyIdea, ScopeScreen } from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-beginner-oscilloscopes/page";

export const metadata = buildMetadata({
  title: "Oscilloscope vs Multimeter: Which to Use",
  description:
    "Oscilloscope vs multimeter: which tool fits which job, where they overlap, why a meter is better for steady values and a scope for signals changing over time.",
  path: "/oscilloscopes/oscilloscope-vs-multimeter",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;

const linkCls = "text-accent hover:underline";

export default function OscilloscopeVsMultimeterPage() {
  return (
    <HowToShell
      title="When to Use an Oscilloscope vs a Multimeter"
      path="/oscilloscopes/oscilloscope-vs-multimeter"
      category="oscilloscopes"
      intro={
        <>
          Oscilloscope vs multimeter is less a contest than a question of which job you are doing.
          A multimeter gives you one accurate number for a value that holds still: a battery
          voltage, a resistor, a current draw. An oscilloscope draws a signal as it changes over
          time, so you can see switching, ripple, noise and timing. This guide shows which tool
          fits which measurement, where they overlap, and why most electronics benches end up with
          both.
        </>
      }
      aside={{
        image: rigol.image,
        alt: "Rigol DS1054Z four-channel digital benchtop oscilloscope",
        caption: (
          <>
            A bench scope like the Rigol DS1054Z complements a multimeter rather than replacing it.
            Compare options in our{" "}
            <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={linkCls}>
              beginner scope picks
            </Link>
            .
          </>
        ),
      }}
      next={[
        {
          href: "/oscilloscopes/what-is-an-oscilloscope",
          title: "What Is an Oscilloscope?",
          desc: "What a scope shows, the main types, and the specs that matter when choosing one.",
        },
        {
          href: "/multimeters/how-to-use-a-multimeter",
          title: "How to Use a Multimeter",
          desc: "Every multimeter mode a beginner needs, from DC voltage to measuring current safely.",
        },
      ]}
    >
      <Callout title="Safety: the two tools are not interchangeable on mains">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            For checking outlets, household wiring and other mains circuits, the usual tool is a
            multimeter whose CAT rating covers that circuit, used with leads rated to match.
          </li>
          <li>
            A bench scope&apos;s probe ground clip is normally connected to mains earth through the
            power cord. Clipping it to a point that isn&apos;t at earth potential, such as anywhere
            on a mains-connected, non-isolated circuit, creates a short through the ground lead that
            can cause damage, fire or injury.
          </li>
          <li>
            Never remove or defeat the scope&apos;s earth to work around this. If you genuinely need
            to see a mains-side waveform, use an isolation transformer on the device under test, a
            differential probe, or an isolated-channel or handheld scope rated for the job.
          </li>
          <li>
            Check the maximum input and CAT rating on both the scope and the probe. Standard 1x/10x
            probes are not for mains work unless their rating explicitly covers it.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 className="text-xl font-semibold mb-3">The short answer</h2>
        <KeyIdea title="Rule of thumb">
          If the value you care about is steady, or you only need its average or RMS, reach for the
          multimeter. If you care about how the signal changes over time (its shape, frequency,
          edges, noise or timing against another signal), you need the oscilloscope.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Side by side</h2>
        <p className="text-muted leading-7 mb-4">
          The details vary by model, but the general split between the two instruments looks like
          this:
        </p>
        <DataTable
          head={["", "Multimeter", "Oscilloscope"]}
          rows={[
            ["What it shows", "A single number per measurement", "A graph of voltage against time"],
            ["Measures", "Voltage, resistance, continuity, usually current; often frequency, capacitance and more", "Voltage over time; time and frequency are derived from the trace"],
            ["Steady DC voltage", "Usually the more precise tool", "Works, but vertical accuracy is typically coarser"],
            ["Resistance and continuity", "Yes", "No"],
            ["Current", "Yes, wired in series (or a clamp meter)", "Only indirectly, e.g. via a shunt resistor or current probe"],
            ["Fast or changing signals", "Shows an average or RMS value, or an unstable reading", "Shows the actual waveform"],
            ["Comparing two signals", "No", "Yes, on a 2- or 4-channel scope"],
            ["Mains work", "Yes, with an appropriate CAT rating", "Only with isolation or differential probing"],
            ["Portability", "Pocket-sized and battery powered", "Mostly bench units; handhelds exist"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Jobs where the multimeter is the right tool</h2>
        <p className="text-muted leading-7 mb-5">
          Plenty of everyday electronics work never needs a scope. These are the measurements a
          multimeter does better, faster or more safely:
        </p>
        <InfoCards
          items={[
            { label: "Battery and supply checks", desc: "Is this rail at 5 V? One precise DC number is all you need." },
            { label: "Resistance", desc: "Checking resistor values and wiring, with the circuit unpowered." },
            { label: "Continuity", desc: "The beep test for fuses, cables, switches and solder joints." },
            { label: "Current draw", desc: "In series on low-voltage circuits, or a clamp meter for larger loads." },
            { label: "Outlets and mains wiring", desc: "With a CAT-rated meter and leads suited to the circuit." },
            { label: "Quick field checks", desc: "Pocketable, battery powered and fast to set up." },
          ]}
        />
        <p className="text-muted leading-7 mt-5">
          Our{" "}
          <Link href="/multimeters/how-to-use-a-multimeter" className={linkCls}>
            multimeter how-to
          </Link>{" "}
          covers each of these modes step by step, and the{" "}
          <Link href="/multimeters/best-multimeters" className={linkCls}>
            multimeter comparison
          </Link>{" "}
          lists spec-checked options.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Jobs where you need the oscilloscope</h2>
        <p className="text-muted leading-7 mb-4">
          The scope earns its place whenever the answer depends on what happens within a fraction of
          a second. A classic example is PWM, the rapid on-off switching a microcontroller uses to
          dim an LED or control a motor:
        </p>
        <Figure
          caption={
            <>
              A 0 to 5 V PWM signal at 2 V/div and 0.5 ms/div. One cycle spans 2 divisions (1 ms,
              so 1 kHz) and the signal is high for about 20% of each cycle. A multimeter on DC volts
              tends to show something near the 1 V average, depending on the meter; the scope
              shows the actual 5 V pulses.
            </>
          }
        >
          <ScopeScreen
            wave="pulse"
            cycles={5}
            amplitude={1.25}
            labels={{ left: "2 V/div", right: "0.5 ms/div" }}
            marks={[
              { x1: 0, y1: 2, x2: 2, y2: 2, text: "1 cycle = 2 div" },
              { x1: 2.6, y1: 2.75, x2: 2.6, y2: 5.25, text: "2.5 div = 5 V" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4 mb-4">Other jobs that call for a scope:</p>
        <ul className="space-y-2 text-muted leading-7 list-disc pl-5">
          <li>
            <strong className="text-foreground">Ripple and noise</strong> on a power rail. A meter
            may read a tidy 5.0 V while the scope shows switching noise riding on top.
          </li>
          <li>
            <strong className="text-foreground">Signal shape</strong>: whether a square wave has
            clean edges, ringing or slow, rounded transitions.
          </li>
          <li>
            <strong className="text-foreground">Digital communication</strong>: seeing UART, I2C or
            SPI activity, or confirming a clock line is actually toggling.
          </li>
          <li>
            <strong className="text-foreground">Timing between signals</strong>: on a multi-channel
            scope, how one edge lines up against another.
          </li>
          <li>
            <strong className="text-foreground">Intermittent faults</strong>: a single-shot
            capture can catch a brief dropout that a meter would never register. See{" "}
            <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope" className={linkCls}>
              how to trigger an oscilloscope
            </Link>
            .
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Where the two tools overlap</h2>
        <p className="text-muted leading-7 mb-4">
          Some measurements can be made with either instrument, and knowing the difference helps
          you pick the right one:
        </p>
        <ul className="space-y-3 text-muted leading-7 list-disc pl-5">
          <li>
            <strong className="text-foreground">DC voltage.</strong> Both read it. The multimeter is
            usually the more precise instrument for a steady value; the scope tells you whether the
            value is actually steady. Many entry-level scopes have a vertical accuracy of a few
            percent, so check your model&apos;s datasheet before relying on a scope for precise DC
            readings.
          </li>
          <li>
            <strong className="text-foreground">AC voltage.</strong> A True RMS multimeter gives
            the RMS value directly. A scope shows peak-to-peak and shape, and most digital scopes
            can calculate RMS too. For a pure sine, Vrms = Vpk ÷ √2; for other shapes, the
            relationship differs. Read more in{" "}
            <Link href="/oscilloscopes/how-to-measure-voltage-with-an-oscilloscope" className={linkCls}>
              how to measure voltage with an oscilloscope
            </Link>
            .
          </li>
          <li>
            <strong className="text-foreground">Frequency.</strong> Many multimeters have a Hz
            mode that works on clean, repetitive signals within the meter&apos;s rated range. A
            scope lets you see the waveform you are measuring, which matters when the signal is
            noisy or irregular. See{" "}
            <Link href="/oscilloscopes/how-to-measure-frequency-with-an-oscilloscope" className={linkCls}>
              how to measure frequency with an oscilloscope
            </Link>
            .
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Why most benches have both</h2>
        <p className="text-muted leading-7">
          A typical debugging session uses the two together. The multimeter confirms the basics
          (power is present, the rail is the right voltage, a connection is continuous), and the
          scope then answers the harder question of what the signal is doing. They are also cheap
          insurance against each other&apos;s blind spots: a meter can&apos;t show you noise, and a
          scope can&apos;t measure resistance. If you are starting out, a multimeter usually comes
          first because it covers more everyday jobs. Add a scope once your projects involve
          anything that switches, oscillates or communicates.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Choosing a scope to go with your meter</h2>
        <p className="text-muted leading-7">
          For hobby and repair work, an entry-level digital bench scope is the usual next step. The{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-review" className={linkCls}>
            Rigol DS1054Z
          </Link>{" "}
          (4 channels, 50MHz, 1 GSa/s) and{" "}
          <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={linkCls}>
            Siglent SDS1104X-E
          </Link>{" "}
          (4 channels, 100MHz, 1 GSa/s) are common choices, while the{" "}
          <Link href="/oscilloscopes/hantek-dso2d10-review" className={linkCls}>
            Hantek DSO2D10
          </Link>{" "}
          adds a built-in waveform generator to a 2-channel, 100MHz scope. If you only need to look
          at slow or audio-range signals, the pocket-sized{" "}
          <Link href="/oscilloscopes/fnirsi-dso152-review" className={linkCls}>
            FNIRSI DSO152
          </Link>{" "}
          (1 channel, 200kHz) is a much smaller step. The{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={linkCls}>
            oscilloscope buying guide
          </Link>{" "}
          explains how much{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={linkCls}>
            bandwidth
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={linkCls}>
            sample rate
          </Link>{" "}
          you really need. Once it arrives,{" "}
          <Link href="/oscilloscopes/how-to-use-an-oscilloscope" className={linkCls}>
            how to use an oscilloscope
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/how-to-read-an-oscilloscope" className={linkCls}>
            how to read the screen
          </Link>{" "}
          will get you to your first measurement.
        </p>
      </section>
    </HowToShell>
  );
}
