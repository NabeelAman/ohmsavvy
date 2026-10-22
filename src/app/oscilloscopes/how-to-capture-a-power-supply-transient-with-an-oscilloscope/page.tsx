import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  KeyIdea,
  ScopeScreen,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-beginner-oscilloscopes/page";

const description =
  "How to capture a power supply transient with an oscilloscope: build a load step, zoom on the rail, trigger on the dip, then measure undershoot and recovery.";

export const metadata = buildMetadata({
  title: "Capture a Power Supply Transient on a Scope",
  description,
  path: "/oscilloscopes/how-to-capture-a-power-supply-transient-with-an-oscilloscope",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;

const link = "text-accent hover:underline";

// Illustrative load-step response of a regulated rail (screen pixels, y down).
// Load switches on at x = 80 and off at x = 220; the rail dips, recovers to a
// slightly lower level (load regulation), then overshoots on release.
const ON = 80;
const OFF = 220;
const NOM = 50;
const bump = (t: number) => 40 * (Math.exp(-t / 16) - Math.exp(-t / 2));
const rail = (x: number) => {
  if (x < ON) return NOM;
  if (x < OFF) {
    const t = x - ON;
    return NOM + 4 - 4 * Math.exp(-t / 2) + bump(t);
  }
  const t = x - OFF;
  return NOM + 4 * Math.exp(-t / 2) - bump(t);
};
const xs = Array.from({ length: 321 }, (_, i) => i);
const railPts = xs.map((x) => `${x},${rail(x).toFixed(1)}`).join(" ");
const dipY = Math.max(...xs.filter((x) => x < OFF).map(rail));
const overY = Math.min(...xs.map(rail));
const recoverX = Math.max(...xs.filter((x) => x >= ON && x < OFF && Math.abs(rail(x) - (NOM + 4)) > 2)) + 1;

export default function CapturePowerSupplyTransientPage() {
  return (
    <HowToShell
      title="How to Capture a Power Supply Transient With an Oscilloscope"
      description={description}
      published="2026-10-22"
      path="/oscilloscopes/how-to-capture-a-power-supply-transient-with-an-oscilloscope"
      category="oscilloscopes"
      intro={
        <>
          A regulator that measures a perfect 5.00 V on a multimeter can still sag for a few hundred
          microseconds every time a motor, radio or processor core wakes up, and that brief dip is often
          what resets the circuit. To capture a power supply transient with an oscilloscope you
          provoke the event on purpose with a controlled load step, magnify the rail so a small dip
          fills the screen, and trigger on the dip itself. This guide focuses on load transients, the
          most common case, with a short section on input-side events.
        </>
      }
      aside={{
        image: rigol.image,
        alt: "Rigol DS1054Z four-channel digital bench oscilloscope",
        caption: (
          <>
            With four channels you can watch the rail, the load-switch gate and a current-sense resistor
            together; see the Rigol DS1054Z in our{" "}
            <Link href="/oscilloscopes/rigol-ds1054z-review" className={link}>
              full review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-happens", label: "What a load transient looks like" },
        { id: "load-step", label: "Build a simple load step" },
        { id: "probe-rail", label: "Probe the rail without pickup" },
        { id: "zoom-rail", label: "Zoom on the rail: DC offset or AC" },
        { id: "trigger-dip", label: "Trigger on the dip or the gate" },
        { id: "measure", label: "Measure undershoot and recovery" },
        { id: "input-side", label: "Input-side transients" },
        { id: "troubleshooting", label: "Troubleshooting" },
      ]}
      faq={[
        {
          q: "How big a load step should I use?",
          a: "Match what the real circuit does. If the datasheet of the load, or of the regulator, specifies a step such as 10% to 90% of rated current, use that. Otherwise step between the circuit's idle current and its peak current. A step larger than the regulator's rating tells you about current limiting, not transient response.",
        },
        {
          q: "Does the speed of the load step matter?",
          a: "Yes. A faster current step usually produces a deeper initial dip, because the output capacitors and their inductance carry the change before the control loop can react. Regulator datasheets often state the slew rate of their test step in amps per microsecond. Note your step's edge speed, visible on the gate or current channel, alongside the result.",
        },
        {
          q: "Why is there a sharp spike at the very edge of the dip?",
          a: "Partly real and partly measurement. The parasitic inductance of the output capacitors and board traces produces a sharp voltage step when current changes quickly. A long probe ground lead adds its own pickup on top. Re-measure with a tip-and-barrel connection right at the output capacitor; whatever remains is the circuit.",
        },
        {
          q: "Can I use AC coupling to measure the recovery time?",
          a: "For fast recoveries, yes. AC coupling blocks the DC level through a high-pass filter, so a dip that lasts a long time compared with that filter's time constant gets distorted and appears to recover on its own. If the recovery takes milliseconds, use DC coupling with offset instead.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-measure-ripple-voltage-with-an-oscilloscope",
          title: "How to Measure Ripple Voltage",
          desc: "Read the steady-state ripple on the same rail, using the same zoom and probing technique.",
        },
        {
          href: "/oscilloscopes/how-to-measure-a-switching-power-supply-waveform-with-an-oscilloscope",
          title: "Measure a Switching Supply Waveform",
          desc: "Look at the gate drive and switch node that sit behind the rail you are testing.",
        },
      ]}
    >
      <section id="what-happens">
        <h2 className="text-xl font-semibold mb-3">What a load transient looks like</h2>
        <p className="text-muted leading-7 mb-4">
          When load current jumps, the output capacitors supply the difference for the first moments,
          and the rail sags until the regulator&apos;s control loop responds. The loop then pulls the
          rail back, sometimes with a little ringing. When the load drops away, the opposite happens:
          the rail briefly rises above nominal. Two numbers describe the result: the undershoot (or
          overshoot) amplitude and the recovery time back to within a tolerance band. Start-up
          behaviour is a separate test, covered in its own guide.
        </p>
        <Figure
          caption={
            <>
              CH2 (blue) is the gate drive of the load switch; CH1 (green) is the rail, magnified around
              its nominal level. The rail dips when the load turns on, settles slightly lower because of
              load regulation, and overshoots when the load turns off.
            </>
          }
        >
          <svg viewBox="0 0 320 180" className="w-full h-auto" role="img" aria-label="Load transient waveform with gate drive on channel 2 and the rail on channel 1 dipping at load-on and overshooting at load-off, with undershoot and recovery time marked">
            <rect x="0" y="0" width="320" height="180" rx="4" className="fill-[#0f1a14]" />
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <line key={i} x1={i * 32} y1="0" x2={i * 32} y2="165" stroke="#2c4a3a" strokeWidth="0.6" strokeDasharray="2 3" />
            ))}
            <line x1="0" y1={NOM} x2="320" y2={NOM} stroke="#2c4a3a" strokeWidth="1.2" />
            <path d={`M0 152 H${ON} V128 H${OFF} V152 H320`} fill="none" stroke="#5BB3E8" strokeWidth="1.8" />
            <polyline points={railPts} fill="none" stroke="#7CFC9A" strokeWidth="2" strokeLinejoin="round" />
            <line x1={ON + 22} y1={NOM} x2={ON + 22} y2={dipY} stroke="#ffd56b" strokeWidth="1.3" />
            <text x={ON + 26} y={dipY - 2} fontSize="9" fill="#ffd56b">undershoot</text>
            <line x1={ON} y1="104" x2={recoverX} y2="104" stroke="#ffd56b" strokeWidth="1.3" />
            <line x1={recoverX} y1="96" x2={recoverX} y2="112" stroke="#ffd56b" strokeWidth="1" />
            <text x={ON + 2} y="118" fontSize="9" fill="#ffd56b">recovery time</text>
            <line x1={OFF + 18} y1={NOM} x2={OFF + 18} y2={overY} stroke="#ffd56b" strokeWidth="1.3" />
            <text x={OFF + 22} y={overY + 4} fontSize="9" fill="#ffd56b">overshoot</text>
            <text x="6" y={NOM - 5} fontSize="9" fill="#9fe3b4">rail nominal</text>
            <text x="6" y="146" fontSize="9" fill="#5BB3E8">CH2 gate</text>
            <text x="316" y="175" fontSize="9" textAnchor="end" fill="#9fe3b4">CH1 50 mV/div, offset to nominal</text>
          </svg>
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="load-step">Build a simple load step</StepHeading>
        <p className="text-muted leading-7 mb-4">
          An N-channel MOSFET switching a power resistor gives a clean, repeatable step. Choose the
          resistor for the step current you want (R = V ÷ I; a 5 V rail and a 1 A step needs 5 Ω), drive
          the gate from a function generator with a low-frequency square wave, and keep the on-time short
          so the resistor and MOSFET stay cool: at 1 A from 5 V the resistor dissipates 5 W while on, but
          at a 10% duty cycle the average is 0.5 W. A small resistor in the source leg lets you watch the
          current as a voltage. Connect the step close to the output capacitors, where the real load
          would sit.
        </p>
        <Figure
          caption={
            <>
              A MOSFET load step. The generator switches the gate; the load resistor sets the step current;
              the optional source resistor gives a current signal for CH3. CH1 measures the rail at the
              output capacitor and CH2 the gate.
            </>
          }
        >
          <svg viewBox="0 0 340 200" className="w-full h-auto" role="img" aria-label="Circuit diagram of a power supply output with a load resistor and N-channel MOSFET switch driven by a function generator, with probe points for rail, gate and current sense">
            <g className="stroke-foreground" strokeWidth="1.6" fill="none">
              <rect x="10" y="40" width="70" height="60" rx="4" className="fill-surface" />
              <path d="M80 55 H230 M80 160 H300" />
              <path d="M120 55 V95 M108 95 H132 M108 102 H132 M120 102 V160" />
              <rect x="222" y="62" width="16" height="34" rx="2" className="fill-surface" />
              <path d="M230 55 V62 M230 96 V112" />
              <path d="M230 112 V122 M222 122 V142 M216 126 V138 M230 122 H222 M230 142 H222 M230 142 V150" />
              <rect x="224" y="150" width="12" height="8" rx="1" className="fill-surface" />
              <path d="M230 158 V160" />
              <path d="M216 132 H180" />
              <rect x="140" y="120" width="40" height="24" rx="3" className="fill-surface" />
              <path d="M300 160 V168 M290 168 H310 M294 173 H306 M298 178 H302" />
            </g>
            <g className="stroke-accent" strokeWidth="2" fill="none">
              <line x1="120" y1="55" x2="120" y2="20" />
              <line x1="198" y1="132" x2="198" y2="100" />
              <line x1="230" y1="147" x2="270" y2="147" />
            </g>
            <circle cx="120" cy="55" r="4" className="fill-accent" />
            <circle cx="198" cy="132" r="3.5" className="fill-accent" />
            <circle cx="230" cy="147" r="3" className="fill-accent" />
            <g fontSize="10" className="fill-foreground">
              <text x="45" y="66" textAnchor="middle">Supply</text>
              <text x="45" y="79" textAnchor="middle">output</text>
              <text x="138" y="100" fontSize="9">C out</text>
              <text x="244" y="82" fontSize="9">R load</text>
              <text x="160" y="136" textAnchor="middle" fontSize="9">Gen</text>
              <text x="120" y="14" textAnchor="middle" className="fill-accent">CH1 rail</text>
              <text x="198" y="94" textAnchor="middle" className="fill-accent">CH2 gate</text>
              <text x="274" y="150" className="fill-accent" fontSize="9">CH3 I</text>
              <text x="170" y="192" textAnchor="middle" fontSize="9" className="fill-muted">MOSFET plus sense resistor to ground; generator ground to the same return</text>
            </g>
          </svg>
        </Figure>
      </section>

      <section>
        <StepHeading n={2} id="probe-rail">Probe the rail without picking up noise</StepHeading>
        <p className="text-muted leading-7">
          The standard 15 cm ground clip forms a loop that picks up magnetic fields from switching
          regulators and adds spikes that look like part of the transient. Remove the probe&apos;s
          hat and ground clip and use a tip-and-barrel connection: the tip touches the positive
          terminal of the output capacitor, and a short ground spring wrapped around the barrel touches
          its ground terminal. This is the same technique used for{" "}
          <Link href="/oscilloscopes/how-to-measure-ripple-voltage-with-an-oscilloscope" className={link}>
            measuring ripple voltage
          </Link>
          , and it matters just as much here. Turn on the channel&apos;s 20 MHz bandwidth limit to hold
          back switching noise; load transients play out over microseconds to milliseconds, so the
          limit removes noise without changing their shape much.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="zoom-rail">Zoom on the rail: DC with offset, or AC coupling</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A 100 mV dip on a 5 V rail is invisible at 1 V/div. You need around 20 to 50 mV/div with the
          rail centred on screen, and there are two ways to get there.
        </p>
        <DataTable
          head={["Method", "How", "Strength", "Weakness"]}
          rows={[
            ["DC coupling with offset", "Set the channel offset to the nominal rail voltage, then raise sensitivity", "Shows the true level, slow recoveries and load regulation", "Offset range is limited at high sensitivity on some scopes"],
            ["AC coupling", "Block the DC level and raise sensitivity", "Works on any scope, no offset needed", "Distorts slow recoveries and hides the DC shift from load regulation"],
          ]}
        />
        <p className="mt-4 text-muted leading-7">
          Prefer DC with offset whenever the scope&apos;s offset range reaches the rail voltage at your
          chosen V/div; it is the only way to see that the rail settled at a slightly lower level under
          load, which is part of the answer.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="trigger-dip">Trigger on the dip, or on the load-switch gate</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With a controlled load step, trigger on CH2, the MOSFET gate, rising edge, Normal mode. The
          gate is clean, so the transient lands in exactly the same place every sweep and you can even
          average. For a transient you do not control, such as a dip caused by firmware switching
          something on, trigger on the rail itself: edge trigger, falling slope, level a little below
          nominal, Single mode. Only a real sag crosses that line.
        </p>
        <Figure
          caption={
            <>
              Waiting for an uncontrolled sag: the rail, DC coupled and offset so nominal sits on the
              centre line, with a falling-edge trigger level (T) half a division below it.
            </>
          }
        >
          <ScopeScreen wave="flat" triggerLevel={-0.5} labels={{ left: "CH1 50 mV/div, offset 5 V, Single", right: "200 µs/div" }} />
        </Figure>
      </section>

      <section>
        <StepHeading n={5} id="measure">Measure undershoot amplitude and recovery time</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Stop the acquisition. Put one horizontal cursor on the rail level before the step and the
          other at the bottom of the dip: the difference is the undershoot. Then decide on a tolerance
          band, such as ±1% of nominal or the regulation the load needs, and place vertical cursors from
          the load step edge to the moment the rail re-enters that band for good. Repeat on the falling
          edge of the gate for overshoot. Peak detect or a single capture shows the worst dip; averaging
          shows a cleaner typical response.
        </p>
        <FlowDiagram
          steps={[
            { label: "Step the load", sub: "MOSFET + resistor, gate from generator" },
            { label: "Zoom the rail", sub: "DC offset, 20 to 50 mV/div" },
            { label: "Trigger", sub: "Gate edge, or rail falling below nominal" },
            { label: "Measure", sub: "ΔV undershoot, time back into band" },
          ]}
        />
        <div className="mt-5">
          <KeyIdea title="Deep dip or slow recovery?">
            The two numbers point to different parts of the supply. A deep, fast dip usually involves the
            output capacitance and its inductance. A shallow dip with a long, sluggish or ringing recovery
            points more toward the regulator&apos;s control loop. Our guide to{" "}
            <Link href="/oscilloscopes/how-to-measure-a-switching-power-supply-waveform-with-an-oscilloscope" className={link}>
              switching supply waveforms
            </Link>{" "}
            shows how to check the switching behaviour at the same time.
          </KeyIdea>
        </div>
      </section>

      <section id="input-side">
        <h2 className="text-xl font-semibold mb-3">Input-side transients</h2>
        <p className="text-muted leading-7 mb-4">
          Disturbances can also arrive from the input: a supply input sagging when a motor on the same
          source starts, a hot-plug spike when a connector is pushed in, or a battery dipping under load.
          Put CH1 on the input and CH2 on the output, trigger on the input with a falling edge just below
          its normal level (or rising for a spike), and check whether the output holds regulation through
          the event. For narrow input spikes, the techniques in{" "}
          <Link href="/oscilloscopes/how-to-capture-a-brief-voltage-spike-with-an-oscilloscope" className={link}>
            capturing a brief voltage spike
          </Link>{" "}
          apply.
        </p>
      </section>

      <section>
        <h2 id="troubleshooting" className="text-xl font-semibold mb-3">Troubleshooting a transient capture</h2>
        <DataTable
          head={["Symptom", "Likely cause", "Fix"]}
          rows={[
            ["Sharp spikes at every switching edge", "Ground-lead pickup from the regulator", "Tip-and-barrel probing and the 20 MHz limit"],
            ["Dip appears to recover by itself even with a long load pulse", "AC coupling high-pass effect", "Use DC coupling with offset"],
            ["Trace off screen after raising sensitivity", "DC level not offset", "Set channel offset to the rail voltage"],
            ["Single never triggers on an uncontrolled sag", "Trigger level too far below nominal", "Move the level closer to nominal in small steps"],
            ["Load resistor or MOSFET gets hot", "Duty cycle too high", "Shorten the on-time or lower the repetition rate"],
          ]}
        />
      </section>

      <section id="safety">
        <Callout title="Mains-powered supplies and hot loads">
          Measure on the low-voltage output side of a mains-powered supply, where the output is isolated
          and referenced to earth by your scope ground. Never clip the scope ground to the primary side;
          that needs a differential probe. Load resistors and MOSFETs can get hot enough to burn, even at
          low duty cycles, so mount them on a heatsink and keep fingers clear.
        </Callout>
      </section>
    </HowToShell>
  );
}
