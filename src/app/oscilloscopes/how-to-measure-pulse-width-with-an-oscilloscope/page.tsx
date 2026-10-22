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
  "How to measure pulse width with an oscilloscope: the 50% amplitude rule, +width and −width, cursors vs auto measurements, single-shot capture and narrow pulses.";

export const metadata = buildMetadata({
  title: "How to Measure Pulse Width With an Oscilloscope",
  description,
  path: "/oscilloscopes/how-to-measure-pulse-width-with-an-oscilloscope",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;
const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;
const hantek = picks.find((p) => p.name === "Hantek DSO2D10")!;

const link = "text-accent hover:underline";

/** Anatomy of a single pulse: 10/50/90% levels and where +width and −width are measured. */
function PulseAnatomy() {
  return (
    <svg
      viewBox="0 0 340 190"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram of a pulse showing the 50 percent amplitude level and the positive and negative width measured between 50 percent crossings"
    >
      <defs>
        <marker id="pw-arr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" className="fill-accent" />
        </marker>
      </defs>
      {/* reference levels */}
      {[
        { y: 40, t: "100%" },
        { y: 50, t: "90%" },
        { y: 90, t: "50%" },
        { y: 130, t: "10%" },
        { y: 140, t: "0%" },
      ].map((l) => (
        <g key={l.t}>
          <line x1="44" x2="330" y1={l.y} y2={l.y} className="stroke-border" strokeWidth={l.t === "50%" ? 1.2 : 0.7} strokeDasharray="3 3" />
          <text x="38" y={l.y + 3} fontSize="9" textAnchor="end" className="fill-muted">{l.t}</text>
        </g>
      ))}
      {/* the pulse: slow edges so the 50% points are visible */}
      <path d="M44 140 H70 L90 40 H230 L250 140 H306 L326 40" fill="none" className="stroke-foreground" strokeWidth="2" strokeLinejoin="round" />
      {/* 50% crossings */}
      <circle cx="80" cy="90" r="3.5" className="fill-accent" />
      <circle cx="240" cy="90" r="3.5" className="fill-accent" />
      <circle cx="316" cy="90" r="3.5" className="fill-accent" />
      {/* +width */}
      <line x1="80" x2="240" y1="104" y2="104" className="stroke-accent" strokeWidth="1.5" markerStart="url(#pw-arr)" markerEnd="url(#pw-arr)" />
      <text x="160" y="118" fontSize="10" textAnchor="middle" className="fill-accent">+width (50% to 50%)</text>
      {/* −width */}
      <line x1="240" x2="316" y1="76" y2="76" className="stroke-accent" strokeWidth="1.5" strokeDasharray="4 2" markerStart="url(#pw-arr)" markerEnd="url(#pw-arr)" />
      <text x="278" y="70" fontSize="10" textAnchor="middle" className="fill-accent">−width</text>
      <text x="160" y="32" fontSize="9" textAnchor="middle" className="fill-muted">top (high level)</text>
      <text x="270" y="154" fontSize="9" textAnchor="middle" className="fill-muted">base (low level)</text>
      <text x="170" y="180" fontSize="9" textAnchor="middle" className="fill-muted">Edges drawn slow on purpose: measuring at 0% or 100% would give a different answer</text>
    </svg>
  );
}

export default function HowToMeasurePulseWidthWithAnOscilloscopePage() {
  return (
    <HowToShell
      title="How to Measure Pulse Width With an Oscilloscope"
      description={description}
      published="2026-10-22"
      path="/oscilloscopes/how-to-measure-pulse-width-with-an-oscilloscope"
      category="oscilloscopes"
      intro={
        <>
          To measure pulse width with an oscilloscope, trigger on the pulse&apos;s leading edge, set the
          timebase so the pulse spans several divisions, and read the time between the rising and falling
          edges at 50% of the pulse amplitude. The scope&apos;s automatic +Width measurement does this for
          you; two time cursors let you check it by eye. For a pulse that only happens once, arm a single
          capture instead of letting the scope run.
        </>
      }
      aside={{
        image: siglent.image,
        alt: "Siglent SDS1104X-E four-channel 100MHz digital oscilloscope, front view",
        caption: (
          <>
            The Siglent SDS1104X-E (100MHz, 4 channels, 1 GSa/s) is our pick for growing into. Any digital
            scope with a trigger and cursors can measure pulse width; see the{" "}
            <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={link}>
              SDS1104X-E review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-pulse-width-means", label: "What pulse width means" },
        { id: "connect-and-scale", label: "Connect and scale" },
        { id: "choose-the-timebase", label: "Choose the timebase" },
        { id: "trigger-on-the-edge", label: "Trigger on the leading edge" },
        { id: "auto-vs-cursors", label: "Automatic width vs cursors" },
        { id: "single-shot-pulses", label: "Capture a one-off pulse" },
        { id: "pulse-width-trigger", label: "The pulse-width trigger" },
        { id: "very-narrow-pulses", label: "Very narrow pulses" },
        { id: "pulse-width-vs-duty-cycle", label: "Pulse width vs duty cycle" },
        { id: "which-scope", label: "Which scope you need" },
      ]}
      faq={[
        {
          q: "Why is pulse width measured at 50% of the amplitude?",
          a: "Real edges take time to rise and fall, so the base and the top of a pulse are not sharp corners. Measuring at the halfway point gives one repeatable answer that sits in the steepest part of each edge, where noise moves the crossing least. It is the convention most scope measurement menus and datasheets use, so your number will match theirs.",
        },
        {
          q: "What is the difference between +width and −width?",
          a: "+Width is the time a pulse spends above the 50% level, from a rising crossing to the next falling crossing. −Width is the time spent below it, from a falling crossing to the next rising one. For an active-low signal, such as many reset and chip-select lines, the −width is the pulse you actually care about.",
        },
        {
          q: "Why does my scope show the pulse width as invalid or with a question mark?",
          a: "Usually the scope cannot find both edges on screen. Either the timebase is so slow that the pulse is only a few samples wide, or so fast that one edge is off screen. The vertical scale also matters: if the pulse is clipped at the top of the screen, the scope cannot find its true top level. Adjust both until the whole pulse is visible.",
        },
        {
          q: "How narrow a pulse can my oscilloscope measure?",
          a: "As a rule of thumb, a pulse should be at least three to five times wider than the scope's own rise time, which is roughly 0.35 divided by its bandwidth. A 50MHz scope has a rise time of about 7 ns, so pulses narrower than a few tens of nanoseconds will look rounded and lower in amplitude, and their width reading becomes unreliable.",
        },
        {
          q: "Can a multimeter measure pulse width?",
          a: "Not directly. Some multimeters show frequency and duty cycle, and for a steady, repeating signal you can work out the high time as duty cycle divided by frequency. That gives only an average, though. It cannot measure a single pulse, show a pulse that varies from one to the next, or reveal slow edges and ringing that distort the timing.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-measure-pwm-duty-cycle-with-an-oscilloscope",
          title: "How to Measure PWM Duty Cycle with an Oscilloscope",
          desc: "When the pulse repeats at a fixed rate, turn high time and period into a duty cycle and an average voltage.",
        },
        {
          href: "/oscilloscopes/how-to-trigger-an-oscilloscope",
          title: "How to Trigger an Oscilloscope",
          desc: "Source, slope, level and the Auto, Normal and Single modes this guide relies on.",
        },
      ]}
    >
      <Callout title="Check where the ground clip goes">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            A bench scope&apos;s probe ground is tied to mains earth. Clip it only to the circuit&apos;s
            ground; on any other node it creates a short through the scope.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="what-pulse-width-means" className="text-xl font-semibold mb-3">What pulse width means on an oscilloscope</h2>
        <p className="text-muted leading-7 mb-4">
          A pulse is a brief excursion from one level to another and back. Its width is how long that
          excursion lasts, but because no edge is perfectly vertical you need an agreed point on each edge
          to measure from. The standard choice is the 50% level: halfway between the pulse&apos;s base
          (low) level and its top (high) level.
        </p>
        <Figure caption={<>Positive width is measured from the rising edge&apos;s 50% crossing to the falling edge&apos;s 50% crossing. Negative width runs from that falling crossing to the next rising one.</>}>
          <PulseAnatomy />
        </Figure>
        <KeyIdea title="Two widths, one signal">
          +Width is the time above 50%; −width is the time below it. On a repeating signal the two add up to
          one period. For an active-low line, such as a reset or chip-select, the −width is the real pulse.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={1} id="connect-and-scale">Connect the probe and scale the pulse</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Use a 10x probe with the channel&apos;s probe setting matched, and make sure it is compensated:
          a miscompensated probe rounds or spikes the edges and shifts the 50% crossings. Our guide to{" "}
          <Link href="/oscilloscopes/how-to-compensate-an-oscilloscope-probe" className={link}>
            compensating an oscilloscope probe
          </Link>{" "}
          takes a minute and is worth doing first.
        </p>
        <p className="text-muted leading-7">
          Choose DC coupling so the base level stays where it really is, then set V/div so the pulse
          fills four to six divisions without clipping off the top. The scope needs the whole top and base to find 50%.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="choose-the-timebase">Choose a timebase that spreads the pulse out</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The most common mistake is a timebase that is far too slow. If a pulse covers a fraction of a
          division, its edges are only a few samples wide. Aim for three to five divisions.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Too slow: the pulses are slivers under half a division wide, so the edges and the width are hard to resolve.</>}>
            <ScopeScreen wave="pulse" cycles={4} amplitude={2} labels={{ left: "500 µs/div", right: "too compressed" }} />
          </Figure>
          <Figure caption={<>Better: one pulse spans four divisions, with both 50% crossings clearly on screen.</>}>
            <ScopeScreen
              wave="pulse"
              cycles={0.5}
              amplitude={2}
              shift={3}
              triggerLevel={0}
              marks={[{ x1: 3, y1: 4, x2: 7, y2: 4, text: "4 div" }]}
              labels={{ left: "50 µs/div", right: "+width = 200 µs" }}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4 mb-4">
          Divide the expected width by four and round to the nearest 1-2-5 timebase step:
        </p>
        <DataTable
          head={["Expected pulse width", "Starting time/div", "Pulse spans about"]}
          rows={[
            ["1 µs", "200 ns/div", "5 divisions"],
            ["10 µs", "2 µs/div", "5 divisions"],
            ["200 µs", "50 µs/div", "4 divisions"],
            ["1 ms", "200 µs/div", "5 divisions"],
          ]}
          mono={[1]}
        />
      </section>

      <section>
        <StepHeading n={3} id="trigger-on-the-edge">Trigger on the leading edge</StepHeading>
        <p className="text-muted leading-7">
          Set an edge trigger on the channel carrying the pulse. For a positive pulse choose the rising
          slope; for an active-low pulse choose falling. Put the trigger level near the middle of the
          swing, which is also the 50% point, so the leading edge lands on the trigger position each sweep
          and the trailing edge sits a predictable distance to its right. Our{" "}
          <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope" className={link}>
            oscilloscope triggering guide
          </Link>{" "}
          explains slope, level and holdoff in full.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="auto-vs-cursors">Read the width: automatic measurement vs cursors</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Open the measure menu and add +Width (sometimes called Positive Pulse Width) and, if relevant,
          −Width. The scope finds the top and base levels, works out 50%, and reports the time between
          crossings, often averaged across every pulse in the capture.
        </p>
        <p className="text-muted leading-7 mb-4">
          Time cursors are the cross-check. Place cursor A where the rising edge crosses mid-swing and cursor
          B where the falling edge crosses the same height; the readout shows Δt between them.
        </p>
        <Figure caption={<>Time cursors A and B on the two 50% crossings. The Δt readout is the pulse width; it should agree with the automatic +Width value.</>}>
          <ScopeScreen
            wave="pulse"
            cycles={0.5}
            amplitude={2}
            shift={3}
            marks={[
              { x1: 3, y1: 1, x2: 3, y2: 7, text: "A" },
              { x1: 7, y1: 1, x2: 7, y2: 7, text: "B" },
              { x1: 3, y1: 4.6, x2: 7, y2: 4.6, text: "Δt = 200 µs" },
            ]}
            labels={{ left: "50 µs/div", right: "cursors" }}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={5} id="single-shot-pulses">Capture a one-off pulse with Single mode</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Many pulses you need to time do not repeat: a reset line releasing at power-up, a sensor&apos;s
          one-shot output, a button press. In Auto mode the scope keeps sweeping and the pulse flashes past.
          Instead:
        </p>
        <ol className="space-y-2 list-decimal pl-5 text-muted leading-7">
          <li>Set V/div and time/div for the pulse you expect, using the table above as a guide.</li>
          <li>Set the edge trigger on the leading edge, with the level halfway through the expected swing.</li>
          <li>Press Single. The scope arms and waits.</li>
          <li>Make the event happen. The scope captures one trigger and stops.</li>
          <li>Measure the frozen pulse with the automatic width or cursors.</li>
        </ol>
      </section>

      <section>
        <h2 id="pulse-width-trigger" className="text-xl font-semibold mb-3">Using the pulse-width trigger</h2>
        <p className="text-muted leading-7">
          Many digital scopes offer a pulse-width trigger, which fires only on pulses that are wider than,
          narrower than, or within a time you set. It turns a measurement into a search. If a sensor pulse
          should always be 200 µs but occasionally comes out short, set the trigger to fire on pulses
          narrower than 180 µs and leave it in Normal or Single mode. The screen stays still until a short
          one arrives, then captures it. Menu names vary, so check your scope&apos;s manual.
        </p>
      </section>

      <section>
        <h2 id="very-narrow-pulses" className="text-xl font-semibold mb-3">Very narrow pulses: when bandwidth sets the limit</h2>
        <p className="text-muted leading-7 mb-4">
          Every scope has its own rise time, approximately 0.35 ÷ bandwidth for a typical front end. A pulse
          that is only a few times wider than that gets its corners rounded and its top pulled down, so the
          50% level shifts and the width reading drifts. As a rule of thumb, keep the pulse at least three to
          five times wider than the scope&apos;s rise time, and use a sample rate that puts several samples
          on each edge. Our{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            oscilloscope bandwidth explainer
          </Link>{" "}
          covers why.
        </p>
        <Figure caption={<>Approximate scope rise time from the 0.35 ÷ bandwidth rule of thumb, for the bandwidths of the scopes in our reviews. Narrowest reliable pulse is roughly three to five times this.</>}>
          <BarChart
            log
            items={[
              { label: "200kHz (FNIRSI DSO152)", value: 1750, display: "≈ 1.75 µs" },
              { label: "50MHz (Rigol DS1054Z)", value: 7, display: "≈ 7 ns", highlight: true },
              { label: "100MHz (Siglent, Hantek)", value: 3.5, display: "≈ 3.5 ns" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="pulse-width-vs-duty-cycle" className="text-xl font-semibold mb-3">Pulse width vs duty cycle</h2>
        <p className="text-muted leading-7">
          Pulse width is an absolute time, and it applies to any pulse, repeating or not. Duty cycle is a
          ratio: the width divided by the period of a repeating signal. If you are setting a servo position
          or checking a single strobe, width is the number that matters. If you are checking a motor or LED
          dimming signal that repeats at a fixed rate, our guide to{" "}
          <Link href="/oscilloscopes/how-to-measure-pwm-duty-cycle-with-an-oscilloscope" className={link}>
            measuring PWM duty cycle with an oscilloscope
          </Link>{" "}
          adds the period and average-voltage side.
        </p>
      </section>

      <section>
        <h2 id="which-scope" className="text-xl font-semibold mb-3">Which oscilloscope you need for pulse width</h2>
        <p className="text-muted leading-7 mb-6">
          For microcontroller and logic pulses down to tens of nanoseconds, a 50MHz to 100MHz scope at
          1 GSa/s is a comfortable fit. A pocket scope at 200kHz suits only slow pulses in the
          millisecond range. Compare the full line-up in our{" "}
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
              note: "50MHz, 4 channels, 1 GSa/s, with a large 7-inch display. Our best overall pick.",
            },
            {
              name: "Siglent SDS1104X-E",
              image: siglent.image,
              alt: "Siglent SDS1104X-E four-channel digital oscilloscope",
              href: "/oscilloscopes/siglent-sds1104x-e-review",
              note: "100MHz, 4 channels, 1 GSa/s, and a well-regarded, intuitive interface.",
            },
            {
              name: "Hantek DSO2D10",
              image: hantek.image,
              alt: "Hantek DSO2D10 two-channel oscilloscope with built-in waveform generator",
              href: "/oscilloscopes/hantek-dso2d10-review",
              note: "100MHz, 2 channels, 1 GSa/s, plus a built-in waveform generator in a compact unit.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
