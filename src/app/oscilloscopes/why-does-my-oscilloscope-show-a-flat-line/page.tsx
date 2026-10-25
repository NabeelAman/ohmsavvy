import Link from "next/link";
import { BarChart, Callout, DataTable, Figure, HowToShell, KeyIdea, ProductStrip, ScopeScreen, StepHeading } from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-beginner-oscilloscopes/page";

const description =
  "An oscilloscope shows a flat line when a channel is off, the probe isn't connected, or volts/div, coupling or timebase hide the signal. Find it step by step.";

export const metadata = buildMetadata({
  title: "Why Does My Oscilloscope Show a Flat Line?",
  description,
  path: "/oscilloscopes/why-does-my-oscilloscope-show-a-flat-line",
});

const ds1054z = picks.find((p) => p.name === "Rigol DS1054Z")!;
const sds1104 = picks.find((p) => p.name === "Siglent SDS1104X-E")!;
const fnirsi = picks.find((p) => p.name === "FNIRSI 2C53T")!;

const link = "text-accent hover:underline";

/** Probe path from scope input to circuit, with the connection points that most often leave a flat trace. */
function ProbeConnectionDiagram() {
  const faults = [
    { x: 20, y: 162, n: "1", text: "Wrong channel, or channel off" },
    { x: 20, y: 178, n: "2", text: "1x/10x probe and channel mismatch" },
    { x: 20, y: 194, n: "3", text: "Broken probe cable" },
    { x: 240, y: 162, n: "4", text: "Tip not gripping the test point" },
    { x: 240, y: 178, n: "5", text: "Ground clip not on ground" },
  ];
  return (
    <svg
      viewBox="0 0 440 204"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram of a passive probe from the oscilloscope's channel input to a circuit, with five numbered failure points: the wrong channel selected or turned off at the scope, a 1x or 10x switch that doesn't match the channel setting, a broken probe cable, the probe tip not gripping the test point, and the ground clip not attached to circuit ground"
    >
      {/* scope front */}
      <rect x="10" y="20" width="104" height="96" rx="8" className="fill-surface stroke-foreground" strokeWidth="1.4" />
      <rect x="20" y="30" width="84" height="46" rx="3" fill="#0f1a14" />
      <line x1="24" y1="53" x2="100" y2="53" stroke="#7CFC9A" strokeWidth="2" />
      <circle cx="40" cy="96" r="8" className="fill-surface stroke-foreground" strokeWidth="1.4" />
      <circle cx="84" cy="96" r="8" className="fill-surface stroke-foreground" strokeWidth="1.4" />
      <text x="40" y="99" fontSize="8" textAnchor="middle" className="fill-foreground">CH1</text>
      <text x="84" y="99" fontSize="8" textAnchor="middle" className="fill-muted">CH2</text>
      {/* cable */}
      <path d="M40 104 C40 130 120 128 150 100 S 230 70 270 78" fill="none" className="stroke-foreground" strokeWidth="2.2" />
      {/* probe body */}
      <rect x="268" y="70" width="58" height="16" rx="6" className="fill-muted" />
      <rect x="284" y="66" width="14" height="6" rx="2" className="fill-accent" />
      <text x="291" y="62" fontSize="8" textAnchor="middle" className="fill-foreground">1x/10x</text>
      <line x1="326" y1="78" x2="356" y2="78" className="stroke-foreground" strokeWidth="2" />
      {/* ground lead */}
      <path d="M300 86 C300 112 340 116 384 120" fill="none" className="stroke-foreground" strokeWidth="1.6" strokeDasharray="4 3" />
      {/* circuit */}
      <rect x="356" y="40" width="76" height="94" rx="6" className="fill-surface stroke-foreground" strokeWidth="1.4" />
      <circle cx="362" cy="78" r="4" className="fill-accent" />
      <text x="400" y="70" fontSize="9" textAnchor="middle" className="fill-foreground">Test point</text>
      <rect x="380" y="114" width="22" height="10" rx="2" className="fill-muted" />
      <text x="410" y="108" fontSize="9" textAnchor="middle" className="fill-foreground">GND</text>
      {/* fault markers */}
      {[
        { cx: 40, cy: 118, n: "1" },
        { cx: 291, cy: 48, n: "2" },
        { cx: 150, cy: 86, n: "3" },
        { cx: 352, cy: 94, n: "4" },
        { cx: 352, cy: 128, n: "5" },
      ].map((m) => (
        <g key={m.n}>
          <circle cx={m.cx} cy={m.cy} r="8" className="fill-accent" />
          <text x={m.cx} y={m.cy + 3.5} fontSize="10" fontWeight="700" textAnchor="middle" fill="#ffffff">{m.n}</text>
        </g>
      ))}
      {faults.map((f) => (
        <text key={f.n} x={f.x} y={f.y} fontSize="10" className="fill-foreground">
          {f.n}: {f.text}
        </text>
      ))}
    </svg>
  );
}

export default function WhyDoesMyOscilloscopeShowAFlatLinePage() {
  return (
    <HowToShell
      title="Why Does My Oscilloscope Show a Flat Line When a Signal Is Present?"
      description={description}
      path="/oscilloscopes/why-does-my-oscilloscope-show-a-flat-line"
      category="oscilloscopes"
      published="2026-10-25"
      intro={
        <>
          An oscilloscope shows a flat line when a signal is present because either the signal isn&apos;t
          reaching the input, or the scope&apos;s settings are drawing it too small, too far off-screen or too
          stretched out to see. The usual culprits are a channel that is off or not the one displayed, a probe
          tip or ground clip that isn&apos;t really connected, a volts/div setting far too large, AC coupling
          hiding a DC level, and a timebase that is wildly wrong for the signal. Work through them in the order
          below and you will either find the setting that hides the signal, or prove the signal genuinely
          isn&apos;t there.
        </>
      }
      aside={{
        image: ds1054z.image,
        alt: "Rigol DS1054Z four-channel digital oscilloscope",
        caption: (
          <>
            Learning a bench scope&apos;s controls takes a little time. Our{" "}
            <Link href="/oscilloscopes/rigol-ds1054z-review" className={link}>
              Rigol DS1054Z review
            </Link>{" "}
            walks through one in detail.
          </>
        ),
      }}
      toc={[
        { id: "two-kinds", label: "Two kinds of flat line" },
        { id: "causes", label: "Causes, checks and fixes" },
        { id: "step-prove", label: "1. Prove the scope on the calibration output" },
        { id: "step-channel", label: "2. Check the channel is on and selected" },
        { id: "step-probe", label: "3. Check the probe connection" },
        { id: "step-scale", label: "4. Fix the vertical scale and position" },
        { id: "step-coupling", label: "5. Check the input coupling" },
        { id: "step-timebase", label: "6. Fix the timebase" },
        { id: "step-trigger", label: "7. Check the trigger mode" },
        { id: "step-input", label: "8. Check bandwidth limit and 50 Ω input" },
        { id: "genuinely-flat", label: "When the signal really isn't there" },
      ]}
      faq={[
        {
          q: "Why does my oscilloscope show a straight line with the probe connected?",
          a: "Either nothing is reaching the input or the settings hide it. Touch the probe to the scope's calibration output: if a square wave appears, the scope and probe work, and the problem is your circuit connection or settings such as volts/div, coupling or timebase. If it stays flat on the calibration output, check that the channel is on, the probe is in the displayed channel, and the probe isn't damaged.",
        },
        {
          q: "Why does a DC voltage show as a flat line at zero on my scope?",
          a: "The channel is probably set to AC coupling. AC coupling puts a capacitor in series with the input, which blocks any steady DC level and passes only the changes. A clean 5 V rail has almost no changes, so it lands on the zero line. Switch the channel to DC coupling and the trace jumps up to the real voltage, provided the volts/div setting leaves room for it on screen.",
        },
        {
          q: "What does it mean when the trace is off the screen on an oscilloscope?",
          a: "The vertical position or offset has moved the trace above or below the visible graticule, or a large DC level at a small volts/div setting has pushed it there. Most scopes show a small arrow at the edge pointing toward the trace. Press the vertical position knob, which zeros the offset on many models, or use the scope's Auto or Autoset function to bring the trace back.",
        },
        {
          q: "Does a 10x probe make the signal look smaller?",
          a: "Only if the scope channel is set to 1x. A 10x probe divides the signal by ten before it reaches the input, and the channel's probe setting multiplies it back. With the probe on 10x and the channel on 1x, the trace is drawn ten times too small and the readings are a tenth of the real value. Set the probe switch and the channel's probe menu to match.",
        },
        {
          q: "Why is my oscilloscope screen frozen and not updating?",
          a: "The trigger is probably in Normal or Single mode and no event is crossing the trigger level, so the scope keeps showing the last capture or nothing at all. It can also be stopped with the Run/Stop button. Switch the trigger to Auto, which draws the trace even without a trigger, then set the trigger level inside the signal and return to Normal if you need it.",
        },
        {
          q: "Can a broken oscilloscope probe show a flat line?",
          a: "Yes. The center conductor of a passive probe is very fine and can break inside the cable, usually near the probe head or the BNC, and a tip or hook can lose contact. The scope then sees nothing and draws a flat line. Swap in a second probe on the same channel, or try the suspect probe on the calibration output while flexing the cable gently.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-read-an-oscilloscope",
          title: "How to Read an Oscilloscope",
          desc: "Graticule, volts/div and time/div explained from the screen up.",
        },
        {
          href: "/oscilloscopes/how-to-stop-an-oscilloscope-waveform-from-drifting",
          title: "How to Stop an Oscilloscope Waveform From Drifting",
          desc: "Once the trace is visible, make it hold still.",
        },
        {
          href: "/oscilloscopes/why-oscilloscope-waveform-is-noisy",
          title: "Why Does an Oscilloscope Waveform Look Noisy?",
          desc: "The opposite problem: too much on the trace rather than nothing.",
        },
      ]}
    >
      <section id="two-kinds">
        <h2 className="text-xl font-semibold mb-3">Two kinds of flat line</h2>
        <p className="text-muted leading-7 mb-4">
          A flat trace has two very different explanations, and telling them apart early saves a lot of
          knob-twiddling. In the first, nothing is reaching the input: the channel is off, the probe is in a
          different socket, the tip has slipped off the test point or the probe cable has broken. In the second,
          the signal is reaching the input perfectly well, but the scope is drawing it in a way that looks flat:
          a sliver at the wrong scale, a trace pushed off the screen, a DC level stripped away by AC coupling, or
          a timebase that shows a tiny fraction of one cycle. The calibration-output test in step 1 splits these
          two groups in seconds.
        </p>
        <Figure caption="The same 100 mV, 1 kHz square wave on two settings. Left: at 5 V/div it is 0.02 divisions tall, which is less than the width of the trace. Right: at 50 mV/div it fills two divisions. Illustrative screens.">
          <div className="grid grid-cols-2 gap-4">
            <ScopeScreen wave="flat" labels={{ left: "CH1 5 V/div", right: "looks flat" }} />
            <ScopeScreen wave="square" cycles={3} amplitude={1} labels={{ left: "CH1 50 mV/div", right: "2 div p-p" }} />
          </div>
        </Figure>
      </section>

      <section id="causes">
        <h2 className="text-xl font-semibold mb-3">Causes, checks and fixes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["No trace or a line that never moves", "Channel off, or probe in a different channel", "Look for the channel's label and color on screen", "Turn the channel on; move the probe to the displayed input"],
            ["Flat even on the calibration output", "Broken probe or cable", "Swap in a second probe", "Replace the probe"],
            ["Flat on the circuit, fine on calibration", "Tip or ground clip not connected", "Check the tip grips the test point and the clip is on ground", "Reattach both; use a hook tip or a probe point"],
            ["Readings ten times too small or large", "1x/10x mismatch between probe and channel", "Compare the probe switch with the channel's probe menu", "Set both to the same factor"],
            ["Thin, nearly flat line", "Volts/div far too large", "Read the volts/div setting against the expected size", "Turn volts/div down until the signal fills several divisions"],
            ["Trace missing, edge arrow showing", "Vertical position or offset off-screen", "Look for an arrow at the top or bottom edge", "Zero the position; use Auto or Autoset"],
            ["DC rail sits on the zero line", "AC coupling", "Check the channel's coupling setting", "Switch to DC coupling"],
            ["Flat line that is not zero", "Timebase far too fast for a slow signal", "Multiply time/div by 10 and compare with the signal period", "Slow the timebase until a few cycles fit"],
            ["Screen frozen or blank", "Trigger in Normal or Single, or scope stopped", "Check trigger mode and Run/Stop status", "Set trigger to Auto and press Run"],
            ["Fast signal much smaller than expected", "Bandwidth limit or filter on", "Look for a BW or filter indicator", "Turn the limit off for fast signals"],
            ["Signal shrinks to almost nothing", "50 Ω input loading a high-impedance source", "Check the channel's input impedance setting", "Set the input to 1 MΩ"],
            ["Flat on every setting and probe", "Signal genuinely absent", "Confirm with a meter at the same point", "Troubleshoot the circuit, not the scope"],
          ]}
        />
      </section>

      <section id="step-prove">
        <StepHeading n={1}>Prove the scope on the calibration output</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Before touching your circuit, give the scope a signal you know exists. Most scopes have a probe
          compensation terminal on the front panel, typically a square wave of around 1 kHz at a few volts, with
          a ground tab next to it; the exact figures are usually printed beside the terminal or in the manual.
          Hook the probe tip to it, clip the ground lead to the ground tab, and press Auto or Autoset if your scope
          has it.
        </p>
        <p className="text-muted leading-7">
          A square wave appearing proves the channel, the probe and the cable are all working, and the problem is
          either your connection to the circuit or a setting that suits the calibration signal but not yours. A
          flat line here means the problem is in the scope setup or the probe itself, so continue with steps 2 and
          3. While you are on that terminal, check that the square wave has flat tops and square corners; if not,
          the probe needs adjusting, as explained in{" "}
          <Link href="/oscilloscopes/how-to-compensate-an-oscilloscope-probe" className={link}>
            how to compensate an oscilloscope probe
          </Link>
          .
        </p>
      </section>

      <section id="step-channel">
        <StepHeading n={2}>Check the channel is on and selected</StepHeading>
        <p className="text-muted leading-7">
          It sounds obvious, but it catches everyone. On a four-channel scope, the probe plugged into CH2 does
          nothing if only CH1 is switched on, and an idle CH1 draws exactly the flat line you are staring at. Each
          channel normally has its own button that lights when the channel is on, and its trace is drawn in that
          channel&apos;s color with a small marker at the left edge. Make sure the color of the trace you are
          watching matches the channel the probe is in. If you are using math or a reference waveform, confirm
          you are not looking at a stored trace instead of the live one.
        </p>
      </section>

      <section id="step-probe">
        <StepHeading n={3}>Check the probe connection</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A probe has two connections and both must be made. The tip must actually grip the node you want, not
          sit on solder mask or a lead coated in flux, and the ground clip must be on the circuit&apos;s ground. A
          probe with no ground connection does not give a clean flat line; it usually shows hum and noise instead,
          so a perfectly flat trace points more toward the tip, the cable or the settings. Make sure the BNC is
          pushed fully on and twisted until it locks.
        </p>
        <Figure caption="Five places between the scope and the circuit where a signal can disappear before it is ever drawn.">
          <ProbeConnectionDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Then check the attenuation. A 10x probe divides the signal by ten, and the scope multiplies it back only
          if its channel probe setting is also 10x. With the probe on 10x and the channel on 1x, a 1 V signal is
          drawn and measured as 0.1 V; the other way round, it shows as 10 V. Neither makes a signal vanish on
          its own, but combined with a large volts/div setting a mismatch is often what turns a small signal into
          a flat line. The full connection routine is in{" "}
          <Link href="/oscilloscopes/how-to-connect-an-oscilloscope-probe-correctly" className={link}>
            how to connect an oscilloscope probe correctly
          </Link>
          .
        </p>
      </section>

      <section id="step-scale">
        <StepHeading n={4}>Fix the vertical scale and position</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The graticule on most scopes is eight divisions tall, and the volts/div setting decides how much voltage
          each division represents. A signal&apos;s height in divisions is simply its peak-to-peak voltage divided
          by volts/div. That is why a small signal at a large setting turns into a line: a 100 mV signal at 5
          V/div is 0.1 ÷ 5 = 0.02 divisions tall, thinner than the trace itself. Turn volts/div down until the
          signal fills roughly half to three-quarters of the screen.
        </p>
        <DataTable
          head={["Volts/div", "Arithmetic (100 mV p-p)", "Height on screen"]}
          mono={[2]}
          rows={[
            ["5 V/div", "0.1 ÷ 5", "0.02 div (looks flat)"],
            ["1 V/div", "0.1 ÷ 1", "0.1 div"],
            ["200 mV/div", "0.1 ÷ 0.2", "0.5 div"],
            ["50 mV/div", "0.1 ÷ 0.05", "2 div"],
            ["20 mV/div", "0.1 ÷ 0.02", "5 div"],
          ]}
        />
        <div className="mt-4">
          <BarChart
            items={[
              { label: "5 V/div", value: 0.02, display: "0.02 div" },
              { label: "1 V/div", value: 0.1, display: "0.1 div" },
              { label: "200 mV/div", value: 0.5, display: "0.5 div" },
              { label: "50 mV/div", value: 2, display: "2 div", highlight: true },
              { label: "20 mV/div", value: 5, display: "5 div", highlight: true },
            ]}
          />
        </div>
        <p className="text-muted leading-7 mt-4">
          If changing volts/div makes no difference at all, the trace may be off the screen. The vertical position
          control, sometimes called offset, moves the trace up and down, and a large DC level at a small volts/div
          can push it out of view as well. Many scopes show an arrow at the screen edge pointing at the missing
          trace, and on many models pressing the position knob returns it to center. The screen layout itself is
          covered in{" "}
          <Link href="/oscilloscopes/how-to-read-an-oscilloscope" className={link}>
            how to read an oscilloscope
          </Link>
          .
        </p>
      </section>

      <section id="step-coupling">
        <StepHeading n={5}>Check the input coupling</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Each channel can usually be set to DC coupling, AC coupling or ground. AC coupling places a capacitor in
          series with the input, which blocks the steady part of a signal and passes only what changes; the
          low-frequency cutoff is typically a few hertz, depending on the scope. That is ideal for looking at small
          ripple on a supply, but it means a clean DC rail has nothing left to show: a steady 5 V sits right on the
          zero line, indistinguishable from no signal at all. The ground setting disconnects the input entirely and
          always draws a flat line by design.
        </p>
        <Figure caption="A steady 5 V rail at 2 V/div. Left: AC coupling removes the DC level, so the trace sits flat on the center line. Right: DC coupling shows it 2.5 divisions above center. Illustrative screens.">
          <div className="grid grid-cols-2 gap-4">
            <ScopeScreen wave="flat" labels={{ left: "AC coupled", right: "0 V?" }} />
            <ScopeScreen wave="flat" offset={2.5} labels={{ left: "DC coupled", right: "5 V" }} />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Set the channel to DC coupling whenever you need to know the actual voltage, then switch to AC only when
          you want to magnify the small variation on top of a large DC level.
        </p>
      </section>

      <section id="step-timebase">
        <StepHeading n={6}>Fix the timebase</StepHeading>
        <p className="text-muted leading-7">
          The horizontal axis usually spans ten divisions, so the full screen shows ten times the time/div
          setting. If that window is a tiny slice of the signal&apos;s period, you only ever see a short, nearly
          straight piece of it. A 50 Hz signal has a 20 ms period; at 10 ns/div the screen covers 10 × 10 ns = 100
          ns, which is 100 ns ÷ 20 ms = 0.000005 of one cycle, so the trace looks like a flat line at whatever
          voltage the signal happened to be at. The same thing happens with a single slow edge, such as a supply
          ramping up: zoomed in on either side of it, the trace is flat. Go the other way and set the timebase
          very slow, and many scopes switch to a roll display where a fast signal can turn into a solid band or a
          misleading aliased shape. A good starting point is a setting where two to five cycles fit across the
          screen: for a 1 kHz signal with a 1 ms period, that is roughly 200 µs to 500 µs per division.
        </p>
      </section>

      <section id="step-trigger">
        <StepHeading n={7}>Check the trigger mode</StepHeading>
        <p className="text-muted leading-7">
          In Normal mode the scope only draws a new trace when the signal crosses the trigger level, and in Single
          mode it captures one event and stops. If the trigger level is above or below the signal, or the trigger
          source is a different channel, the scope simply waits, leaving either a frozen old capture or a blank
          screen. Auto mode draws the trace even without a trigger, which makes it the right mode for finding a
          signal. Check that the scope isn&apos;t stopped with the Run/Stop button, set Auto, then put the trigger
          level inside the signal. The full procedure is in{" "}
          <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope" className={link}>
            how to trigger an oscilloscope
          </Link>
          , and if the trace appears but slides sideways, see{" "}
          <Link href="/oscilloscopes/how-to-stop-an-oscilloscope-waveform-from-drifting" className={link}>
            how to stop a waveform drifting
          </Link>
          .
        </p>
      </section>

      <section id="step-input">
        <StepHeading n={8}>Check bandwidth limit and 50 Ω input</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Many scopes offer a bandwidth limit, commonly around 20 MHz, plus digital filters. They are useful for
          cleaning up noise on slow signals, as covered in{" "}
          <Link href="/oscilloscopes/why-oscilloscope-waveform-is-noisy" className={link}>
            why an oscilloscope waveform looks noisy
          </Link>
          , but left on, they shrink anything faster than the limit and can reduce short pulses to a small bump.
          Turn them off when looking at fast signals.
        </p>
        <p className="text-muted leading-7">
          Some scopes also let each channel switch between the standard 1 MΩ input and 50 Ω. A 50 Ω input is meant
          for 50 Ω sources and cables; connected to a high-impedance circuit, it forms a voltage divider with the
          source. A source with 10 kΩ of output impedance driving 50 Ω delivers 50 ÷ (10,000 + 50), about 0.5%
          of its voltage, so a 1 V signal arrives as roughly 5 mV and looks flat at most settings. Set the input to
          1 MΩ for ordinary probing with passive probes.
        </p>
      </section>

      <Callout title="Never clip the ground lead to a mains-referenced point">
        On a typical bench scope the probe&apos;s ground clip is connected to mains earth through the power cord.
        Clipping it to a point that sits at a mains potential, such as the primary side of a non-isolated power
        supply, creates a short through the probe and the scope, which can destroy the probe and the circuit and
        is dangerous. Never defeat the scope&apos;s earth to get around this. Use an isolation transformer, a
        differential probe or a battery-powered scope rated for the job, and if you are unsure whether a point is
        mains-referenced, don&apos;t probe it.
      </Callout>

      <section id="genuinely-flat">
        <h2 className="text-xl font-semibold mb-3">When the signal really isn&apos;t there</h2>
        <p className="text-muted leading-7">
          If the scope passes the calibration test, the probe is firmly connected, the channel is on in DC coupling
          with the trigger in Auto, and the line is still flat across several volts/div and time/div settings, the
          scope is probably telling the truth. Confirm with a multimeter at the same point: a DC reading that
          matches the flat line&apos;s level means the node is steady, and a reading of zero means nothing is
          arriving. At that point the fault is in the circuit, perhaps a stopped oscillator, an enable pin held
          off, a missing supply or a broken track, and the scope has done its job by ruling out the measurement
          setup.
        </p>
      </section>

      <section>
        <KeyIdea title="In short">
          Test on the calibration output first. If that works, the scope and probe are fine, so check the tip and
          ground clip, then volts/div, position, coupling, timebase and trigger in that order. A 100 mV signal at
          5 V/div is only 0.02 divisions tall; at 50 mV/div it is 2. Use DC coupling, Auto trigger and a 1 MΩ
          input while searching.
        </KeyIdea>
      </section>

      <ProductStrip
        title="Beginner scopes that make finding a signal easier"
        items={[
          { name: ds1054z.name, image: ds1054z.image, alt: "Rigol DS1054Z oscilloscope", href: "/oscilloscopes/rigol-ds1054z-review", note: "Four channels, 50MHz and 1 GSa/s on a large 7-inch display." },
          { name: sds1104.name, image: sds1104.image, alt: "Siglent SDS1104X-E oscilloscope", href: "/oscilloscopes/siglent-sds1104x-e-review", note: "Four channels at 100MHz with a well-regarded, intuitive UI." },
          { name: fnirsi.name, image: fnirsi.image, alt: "FNIRSI 2C53T handheld oscilloscope and multimeter", href: "/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t", note: "Two-channel 50 MHz handheld with a 19,999-count True RMS multimeter built in." },
        ]}
      />
    </HowToShell>
  );
}
