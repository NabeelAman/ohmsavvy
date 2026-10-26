import Link from "next/link";
import {
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
  "How to measure signal overshoot and ringing with an oscilloscope: overshoot percentage, ringing frequency, settling time, and how to rule out probe artifacts.";

export const metadata = buildMetadata({
  title: "How to Measure Signal Overshoot and Ringing",
  description,
  path: "/oscilloscopes/how-to-measure-signal-overshoot-and-ringing-with-an-oscilloscope",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;
const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;
const hantek = picks.find((p) => p.name === "Hantek DSO2D10")!;

const link = "text-accent hover:underline";

export default function HowToMeasureSignalOvershootAndRingingPage() {
  return (
    <HowToShell
      title="How to Measure Signal Overshoot and Ringing With an Oscilloscope"
      description={description}
      published="2026-10-22"
      path="/oscilloscopes/how-to-measure-signal-overshoot-and-ringing-with-an-oscilloscope"
      category="oscilloscopes"
      intro={
        <>
          Overshoot is how far an edge flies past its final level; ringing is the decaying oscillation
          that follows. To measure signal overshoot and ringing with an oscilloscope, you zoom in on one
          edge, read three levels for the overshoot percentage, time the ring cycles for the ringing
          frequency, and note when the wiggle dies away. The hard part is proving the ringing is in the
          circuit and not in your probe, so this guide covers that too.
        </>
      }
      aside={{
        image: siglent.image,
        alt: "Siglent SDS1104X-E four-channel benchtop digital oscilloscope, front view",
        caption: (
          <>
            The Siglent SDS1104X-E (100MHz, 4 channels, 1 GSa/s) is one of the bench scopes in our
            reviews. Edge measurements like these need bandwidth headroom. See our{" "}
            <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={link}>
              SDS1104X-E review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "overshoot-vs-ringing", label: "Overshoot vs ringing" },
        { id: "set-up-probe", label: "Set up the probe and ground" },
        { id: "zoom-on-the-edge", label: "Zoom in on one edge" },
        { id: "overshoot-percentage", label: "Calculate overshoot %" },
        { id: "ringing-frequency", label: "Measure ringing frequency" },
        { id: "settling-time", label: "Read the settling time" },
        { id: "real-or-artifact", label: "Real ringing or probe artifact?" },
        { id: "bandwidth-needed", label: "Bandwidth you need" },
        { id: "which-scope", label: "Which scope you need" },
      ]}
      faq={[
        {
          q: "How much overshoot is acceptable on a digital signal?",
          a: "There is no single number. What matters is whether the peaks stay inside the receiving chip's absolute maximum input ratings and whether the ringing crosses back through its logic thresholds, which can cause false clocking. Both limits are in the datasheets of the parts involved. Overshoot that is safe on one logic family can be a problem on another.",
        },
        {
          q: "Does a higher bandwidth oscilloscope show more ringing?",
          a: "It can. A low-bandwidth scope, or one with its bandwidth limit switched on, filters out fast ringing and smooths overshoot, so the edge looks cleaner than it is. A wider-bandwidth scope reveals what is really there, but it also shows more probe-related ringing if the ground lead is long, so the probe setup matters more as bandwidth rises.",
        },
        {
          q: "Can a 10x probe cause overshoot?",
          a: "Yes. An overcompensated 10x probe adds a spike at every edge that decays smoothly without oscillating, and it can look like circuit overshoot. Adjusting the trimmer on the scope's calibration output removes it. A long ground lead causes a different artifact, a true damped oscillation, which a short ground spring usually removes.",
        },
        {
          q: "What is preshoot on an oscilloscope?",
          a: "Preshoot is a small excursion in the opposite direction just before an edge starts, so a rising edge dips slightly first. Many scopes offer it as an automatic measurement alongside overshoot, expressed as a percentage of the amplitude. It is calculated the same way as overshoot but before the edge, and definitions vary by brand, so check your manual.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-measure-a-square-wave-with-an-oscilloscope",
          title: "How to Measure a Square Wave With an Oscilloscope",
          desc: "Levels, period, duty cycle and 10-90% rise time on the same kind of signal.",
        },
        {
          href: "/oscilloscopes/oscilloscope-bandwidth-for-switching-power-supplies",
          title: "Oscilloscope Bandwidth for Switching Power Supplies",
          desc: "Why switch-node edges and their ringing need far more bandwidth than the switching frequency.",
        },
      ]}
    >
      <Callout title="Safety first: fast edges often live near high voltage">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            On a mains-powered bench scope, the probe&apos;s ground clip or ground spring is connected to
            mains earth. Connect it only to the circuit&apos;s ground. Touching it to any other voltage
            shorts that point to earth.
          </li>
          <li>
            The switch nodes where ringing is most often measured, in switching supplies and motor
            drives, are frequently not earth-referenced, and on the primary side they sit at mains
            potential. Use a rated differential probe or an isolation transformer on the device under
            test, and never float the scope. See{" "}
            <Link href="/oscilloscopes/oscilloscope-bandwidth-for-switching-power-supplies" className={link}>
              bandwidth for switching power supplies
            </Link>{" "}
            for the isolation options.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="overshoot-vs-ringing" className="text-xl font-semibold mb-3">Overshoot vs ringing</h2>
        <p className="text-muted leading-7 mb-4">
          When a fast edge drives a path that has some inductance and capacitance, the voltage does not
          stop neatly at its new level. It carries on past it (overshoot), swings back below it, and
          oscillates with shrinking amplitude until it settles (ringing). The two usually appear
          together, but they are measured differently: overshoot as a percentage of the step, ringing
          as a frequency and a settling time.
        </p>
        <KeyIdea title="The three numbers">
          Overshoot % = (peak − final) ÷ (final − initial) × 100. Ringing frequency = 1 ÷ ring period.
          Settling time = time from the edge until the signal stays inside a chosen band, such as ±2%,
          around its final level.
        </KeyIdea>
        <p className="text-muted leading-7 mt-4">
          Why measure them at all? Overshoot pushes an input above its supply rail or below ground, and
          every chip&apos;s datasheet sets absolute maximum limits on that. Ringing on a clock or data
          line can swing back through the logic threshold and be counted as an extra edge. On a power
          switch node, the ringing peak, not the supply voltage, is what the transistor has to
          withstand. In each case you need a number to compare with a datasheet limit, not just an
          impression that the edge looks messy.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="set-up-probe">Set up the probe and ground before you trust any ringing</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Most ringing that beginners see is created by the measurement. Three settings decide whether
          what you see is real:
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <strong className="text-foreground">Probe on 10x and compensated.</strong> The 1x setting has
            far less bandwidth and rounds off the very edge you want to measure. A miscompensated 10x
            probe adds its own overshoot; fix it with{" "}
            <Link href="/oscilloscopes/how-to-compensate-an-oscilloscope-probe" className={link}>
              probe compensation
            </Link>
            .
          </li>
          <li>
            <strong className="text-foreground">Short ground spring, not the long ground lead.</strong>{" "}
            The clip lead&apos;s inductance and the probe tip&apos;s capacitance form a resonant circuit
            that rings on every fast edge. Most probes come with a short spring that clips around the tip
            barrel; ground it right next to the point you are probing.
          </li>
          <li>
            <strong className="text-foreground">Bandwidth limit off.</strong> The 20MHz limit many scopes
            offer is useful for{" "}
            <Link href="/oscilloscopes/how-to-measure-ripple-voltage-with-an-oscilloscope" className={link}>
              ripple
            </Link>{" "}
            but hides fast ringing. Leave it off here.
          </li>
        </ul>
      </section>

      <section>
        <StepHeading n={2} id="zoom-on-the-edge">Trigger on the edge and zoom in</StepHeading>
        <p className="text-muted leading-7">
          Use edge triggering on the edge you want to study, rising or falling, with the level near the
          middle of the swing. Move the trigger point towards the left of the screen with horizontal
          position so the edge and everything after it is visible, then shorten the timebase until a few
          ring cycles fill the screen. Set V/div so the full step uses most of the screen height with
          room above it for the overshoot peak. If the trace is unstable, see{" "}
          <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope" className={link}>
            how to trigger an oscilloscope
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={3} id="overshoot-percentage">Read three levels and calculate overshoot %</StepHeading>
        <p className="text-muted leading-7 mb-4">
          You need the initial level (before the edge), the final level (where the signal settles) and
          the peak (the highest point just after a rising edge). Read the final level well after the
          ringing has died, not on a ring peak or trough.
        </p>
        <Figure
          caption={
            <>
              A 0–5 V rising edge at 1 V/div and 50 ns/div, ground marker 2.5 divisions below center. The
              step is 5 divisions (5 V) and the first peak rises 0.75 division (0.75 V) above the final
              level: 0.75 ÷ 5 × 100 = 15% overshoot.
            </>
          }
        >
          <ScopeScreen
            wave="square-ring"
            cycles={10 / 18}
            amplitude={2.5}
            shift={1}
            labels={{ left: "CH1 1 V/div  DC", right: "50 ns/div" }}
            marks={[
              { x1: 6, y1: 6.5, x2: 6, y2: 1.5, text: "step 5 div = 5 V" },
              { x1: 0.6, y1: 1.5, x2: 0.6, y2: 0.75, text: "+0.75 V" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4 mb-4">
          Peak = 5.75 V, final = 5 V, initial = 0 V, so overshoot = (5.75 − 5) ÷ (5 − 0) × 100 = 15%.
          The same formula works on a falling edge, where the overshoot is the dip below the final low
          level (often called undershoot): both the top and bottom of the fraction turn negative and the
          result stays positive.
        </p>
        <DataTable
          head={["Edge", "Initial", "Final", "Peak", "Overshoot"]}
          rows={[
            ["Rising, 5 V logic (figure)", "0 V", "5 V", "5.75 V", "0.75 ÷ 5 = 15%"],
            ["Rising, 3.3 V logic", "0 V", "3.3 V", "3.8 V", "0.5 ÷ 3.3 ≈ 15.2%"],
            ["Rising, 12 V gate drive", "0 V", "12 V", "13.2 V", "1.2 ÷ 12 = 10%"],
            ["Falling, 5 V logic", "5 V", "0 V", "−0.4 V", "−0.4 ÷ −5 = 8%"],
          ]}
          mono={[4]}
        />
        <p className="text-muted leading-7 mt-4">
          Many scopes offer overshoot and preshoot as automatic measurements, using their own top and
          base levels rather than your readings, so small differences from a hand calculation are normal.
          Check your manual for how your model defines them.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="ringing-frequency">Time the ring cycles for the ringing frequency</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Measure from one ring peak to the next. With only a few cycles visible, measuring across two
          or more and dividing is more accurate than reading a single one.
        </p>
        <Figure
          caption={
            <>
              The same edge. Ring peaks are 1 division apart at 50 ns/div, so two cycles span 2 divisions =
              100 ns, one ring period is 50 ns and the ringing frequency is 1 ÷ 50 ns = 20MHz.
            </>
          }
        >
          <ScopeScreen
            wave="square-ring"
            cycles={10 / 18}
            amplitude={2.5}
            shift={1}
            labels={{ left: "CH1 1 V/div  DC", right: "50 ns/div" }}
            marks={[{ x1: 1, y1: 0.4, x2: 3, y2: 0.4, text: "2 cycles = 100 ns" }]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The ringing frequency is a clue to its source. It is the resonant frequency of whatever
          inductance and capacitance are involved, f = 1 ÷ (2π√(LC)), so if it changes when you change
          the probe&apos;s ground connection, the probe is part of the resonant circuit.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="settling-time">Read the settling time</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Settling time is measured from the edge (often from its 50% crossing) to the moment the signal
          enters a tolerance band around the final level and stays there. The band is your choice or the
          datasheet&apos;s, commonly ±2% or ±5% of the step. Definitions vary, so state the band with the
          number.
        </p>
        <p className="text-muted leading-7">
          In the example, ±2% of a 5 V step is ±0.1 V. The trough 1.5 divisions after the edge still dips
          about 0.12 V below 5 V, while the peak at 2 divisions is only about 0.07 V above it, so the
          signal settles within ±2% in under 2 divisions, less than 100 ns. Voltage cursors set at 4.9 V
          and 5.1 V make this easy to see.
        </p>
      </section>

      <section>
        <h2 id="real-or-artifact" className="text-xl font-semibold mb-3">Is the ringing real or a probe artifact?</h2>
        <p className="text-muted leading-7 mb-4">
          Real ringing comes from the circuit: long traces or cables acting as unterminated transmission
          lines, wiring and package inductance, very fast drivers, and the parasitic inductance and
          capacitance at a power switch node. Artifacts come from the measurement. The test is to change
          the measurement and see whether the ringing changes.
        </p>
        <p className="text-muted leading-7 mb-4">
          The shape is a clue as well. A miscompensated probe produces a spike or a rounded corner that
          decays smoothly over a large part of the period, with no oscillation. A long ground lead
          produces a true damped oscillation at a fixed frequency on every fast edge, and that frequency
          shifts when you move or coil the lead. Real circuit ringing stays the same however you probe
          it, as long as you probe the same point with a short ground.
        </p>
        <Figure
          caption={
            <>
              Illustration of the same 0–5 V edge probed two ways at 1 V/div. Left: long ground lead, with
              overshoot and ringing. Right: short ground spring at the same point, clean edge. Ringing that
              disappears like this was created by the probe.
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <ScopeScreen
              wave="square-ring"
              cycles={10 / 18}
              amplitude={2.5}
              shift={1}
              labels={{ left: "Long ground lead", right: "50 ns/div" }}
            />
            <ScopeScreen
              wave="square"
              cycles={10 / 18}
              amplitude={2.5}
              shift={1}
              labels={{ left: "Ground spring", right: "50 ns/div" }}
            />
          </div>
        </Figure>
        <div className="mt-5">
          <Figure caption={<>Work through the checks in order; ringing that survives all four is very likely real.</>}>
            <FlowDiagram
              steps={[
                { label: "Compensate", sub: "Trim the 10x probe on the cal output" },
                { label: "Ground spring", sub: "Swap the long lead for a short spring" },
                { label: "Full bandwidth", sub: "Bandwidth limit off, probe on 10x" },
                { label: "Compare", sub: "Same reading at a nearby ground? Then real" },
              ]}
            />
          </Figure>
        </div>
        <div className="mt-5">
          <DataTable
            head={["Cause", "What it looks like", "Check or fix"]}
            rows={[
              ["Long probe ground lead", "Damped oscillation on every fast edge, changes when the lead is moved", "Use the short ground spring"],
              ["Overcompensated 10x probe", "Spike that decays smoothly, no oscillation", "Adjust the probe trimmer"],
              ["Probe on 1x", "Edges slowed, overshoot hidden", "Switch the probe and channel to 10x"],
              ["Bandwidth limit on", "Ringing smoothed or missing", "Turn the limit off for edge work"],
              ["Real circuit ringing", "Unchanged by the probe fixes above", "Termination, layout or damping in the circuit"],
            ]}
          />
        </div>
      </section>

      <section>
        <h2 id="bandwidth-needed" className="text-xl font-semibold mb-3">How much bandwidth you need to see ringing</h2>
        <p className="text-muted leading-7 mb-4">
          To show ringing at its true size, the scope and probe need bandwidth comfortably above the
          ringing frequency. The common 3-5x rule of thumb, explained in{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            what oscilloscope bandwidth means
          </Link>
          , turns the 20MHz ringing above into 60–100MHz. At the scope&apos;s rated bandwidth a sine reads
          about 70.7% of its real amplitude, so a scope near its limit understates both ringing and
          overshoot.
        </p>
        <DataTable
          head={["Ring period", "Ringing frequency (1 ÷ period)", "Bandwidth at 3-5x"]}
          rows={[
            ["200 ns", "5MHz", "15–25MHz"],
            ["50 ns", "20MHz", "60–100MHz"],
            ["10 ns", "100MHz", "300–500MHz"],
          ]}
          mono={[1, 2]}
        />
        <p className="text-muted leading-7 mt-4">
          If the ring period you measure is close to the scope&apos;s own rise time (about 0.35 ÷
          bandwidth), treat the reading as a lower limit: the real ringing may be faster and larger.
          For the edge-speed side of this, see{" "}
          <Link href="/oscilloscopes/how-to-measure-a-square-wave-with-an-oscilloscope" className={link}>
            how to measure a square wave
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="which-scope" className="text-xl font-semibold mb-3">Which scope you need for edge measurements</h2>
        <p className="text-muted leading-7 mb-4">
          Overshoot and ringing measurements are bandwidth-hungry, so this is bench-scope work. A 50MHz
          scope covers ringing in the low MHz range; a 100MHz scope covers more. Compare them in our{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            best beginner oscilloscopes
          </Link>{" "}
          roundup.
        </p>
        <ProductStrip
          title="Bench scopes in our reviews"
          items={[
            {
              name: "Siglent SDS1104X-E",
              image: siglent.image,
              alt: "Siglent SDS1104X-E four-channel benchtop digital oscilloscope",
              href: "/oscilloscopes/siglent-sds1104x-e-review",
              note: "100MHz, 4 channels, 1 GSa/s; more bandwidth than the Rigol, for projects that will get more demanding.",
            },
            {
              name: "Hantek DSO2D10",
              image: hantek.image,
              alt: "Hantek DSO2D10 two-channel oscilloscope with built-in waveform generator",
              href: "/oscilloscopes/hantek-dso2d10-review",
              note: "100MHz, 2 channels, 1 GSa/s; an oscilloscope and waveform generator in one unit.",
            },
            {
              name: "Rigol DS1054Z",
              image: rigol.image,
              alt: "Rigol DS1054Z four-channel benchtop digital oscilloscope",
              href: "/oscilloscopes/rigol-ds1054z-review",
              note: "50MHz, 4 channels, 1 GSa/s; the default beginner recommendation for years.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
