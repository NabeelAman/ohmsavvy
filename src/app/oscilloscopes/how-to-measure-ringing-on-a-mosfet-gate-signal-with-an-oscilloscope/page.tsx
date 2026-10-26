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
  "How to measure ringing on a MOSFET gate signal with an oscilloscope: probe gate to source, read ring frequency and peak Vgs, and damp it with layout and Rg.";

export const metadata = buildMetadata({
  title: "Measure Ringing on a MOSFET Gate With a Scope",
  description,
  path: "/oscilloscopes/how-to-measure-ringing-on-a-mosfet-gate-signal-with-an-oscilloscope",
});

const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;
const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;
const sds1202 = picks.find((p) => p.name === "Siglent SDS1202X-E")!;
const dho804 = picks.find((p) => p.name === "Rigol DHO804")!;
const bw = (p: typeof siglent) => p.specs.find((s) => s.label === "Bandwidth")!.value;

const link = "text-accent hover:underline";

// Illustrative turn-on gate waveform (screen px, y down): 0 V at y = 150,
// final Vgs at y = 40. RC rise to the plateau, Miller plateau, then the
// final rise with a damped ring on top.
const gateV = (x: number) => {
  if (x < 40) return 150;
  if (x < 70) return 150 - (55 * (1 - Math.exp(-(x - 40) / 10))) / (1 - Math.exp(-3));
  if (x < 150) return 95 - ((x - 70) / 80) * 3;
  const t = x - 150;
  return 40 + 52 * Math.exp(-t / 10) - 16 * Math.exp(-t / 28) * Math.sin((2 * Math.PI * t) / 18);
};
const gatePts = Array.from({ length: 321 }, (_, x) => `${x},${gateV(x).toFixed(1)}`).join(" ");
const peakY = Math.min(...Array.from({ length: 321 }, (_, x) => gateV(x)));

export default function MeasureMosfetGateRingingPage() {
  return (
    <HowToShell
      title="How to Measure Ringing on a MOSFET Gate Signal With an Oscilloscope"
      description={description}
      published="2026-10-22"
      path="/oscilloscopes/how-to-measure-ringing-on-a-mosfet-gate-signal-with-an-oscilloscope"
      category="oscilloscopes"
      intro={
        <>
          A gate drive that rings can push Vgs past the MOSFET&apos;s rating, or dip back toward the
          threshold and turn the device partly on again at the wrong moment. To measure ringing on a
          MOSFET gate signal with an oscilloscope you have to probe in a way that does not create
          ringing of its own, and know which features of the gate waveform are normal. This guide
          covers the shape of a healthy gate waveform, how to probe low-side and high-side gates
          safely, what to measure, and the gate-drive fixes that damp it.
        </>
      }
      aside={{
        image: siglent.image,
        alt: "Siglent SDS1104X-E four-channel digital oscilloscope",
        caption: (
          <>
            Gate ringing is often tens of megahertz, so bandwidth matters; the Siglent SDS1104X-E in our{" "}
            <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={link}>
              full review
            </Link>{" "}
            lists {bw(siglent)}.
          </>
        ),
      }}
      toc={[
        { id: "gate-anatomy", label: "Anatomy of a gate waveform" },
        { id: "why-rings", label: "Why the gate rings" },
        { id: "probe-low-side", label: "Probe a low-side gate" },
        { id: "high-side", label: "High-side gates need isolation" },
        { id: "capture", label: "Capture the switching edge" },
        { id: "measure", label: "Measure ring frequency and peak Vgs" },
        { id: "fixes", label: "Damp the ringing" },
        { id: "troubleshooting", label: "Troubleshooting" },
        { id: "which-scope", label: "Scopes with enough bandwidth" },
      ]}
      faq={[
        {
          q: "Is the flat step in the middle of the gate rise a fault?",
          a: "No. That is the Miller plateau. While the drain voltage swings, the gate current goes into charging the gate-drain capacitance, so Vgs pauses at a level set by the device's threshold and the load current. A plateau that is very long simply means the driver is supplying little current; ringing on top of it is what to investigate.",
        },
        {
          q: "How much gate ringing is acceptable?",
          a: "Two limits matter. The peak must stay well inside the gate-source absolute maximum in the datasheet, often ±20 V for standard parts and lower for many logic-level ones. And during the off state, ringing must never climb back toward the threshold voltage, which could turn the device partly on. A margin of a few volts from each limit is a sensible design target.",
        },
        {
          q: "Will a bigger gate resistor always fix ringing?",
          a: "It damps the gate loop, but it also slows switching, which raises switching loss and heat in the MOSFET, and it lengthens the Miller plateau. Treat it as a tuning knob alongside layout: shorten the loop first, then raise the resistor only as far as needed. Separate turn-on and turn-off resistors with a diode let you tune each edge independently.",
        },
        {
          q: "Why does the ringing look worse with the standard ground clip?",
          a: "The long ground lead and the probe input capacitance form their own resonant circuit, typically in the tens of megahertz, which is the same range as real gate ringing. Fast gate edges excite it. Switching to a short ground spring at the source pin removes most of that artefact, so whatever ringing is left belongs to the circuit.",
        },
        {
          q: "Can I measure gate ringing with a multimeter?",
          a: "No. A meter averages over far too long a time to show nanosecond events. A multimeter is useful for static checks on the device itself, such as a diode test across the body diode, but the gate waveform needs a scope.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-measure-a-switching-power-supply-waveform-with-an-oscilloscope",
          title: "Measure a Switching Supply Waveform",
          desc: "See the gate drive in context with the switch node and output ripple of a converter.",
        },
        {
          href: "/oscilloscopes/how-to-measure-signal-overshoot-and-ringing-with-an-oscilloscope",
          title: "How to Measure Overshoot and Ringing",
          desc: "The general method for overshoot percentage, ring frequency and settling on any edge.",
        },
      ]}
    >
      <section id="gate-anatomy">
        <h2 className="text-xl font-semibold mb-3">Anatomy of a MOSFET gate waveform</h2>
        <p className="text-muted leading-7 mb-4">
          Turning a MOSFET on is not a clean square edge at the gate. Vgs first climbs as the driver
          charges the gate-source capacitance, and the drain current starts to flow once Vgs passes the
          threshold. Then Vgs flattens into the Miller plateau while the drain voltage falls, because the
          driver&apos;s current is busy charging the gate-drain capacitance. When the drain has finished
          moving, Vgs rises again to the driver&apos;s final voltage. Ringing usually shows up at the
          sharp corners, especially at the end of the rise and the start of the fall.
        </p>
        <Figure
          caption={
            <>
              An illustrative turn-on edge: initial rise, Miller plateau, final rise with ringing. The
              peak of the ring must stay clear of the datasheet&apos;s Vgs absolute maximum (dashed red).
            </>
          }
        >
          <svg viewBox="0 0 320 175" className="w-full h-auto" role="img" aria-label="MOSFET gate voltage waveform showing the initial rise past threshold, the flat Miller plateau, the final rise to drive voltage with ringing, and the absolute maximum limit">
            <rect x="0" y="0" width="320" height="175" rx="4" className="fill-[#0f1a14]" />
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <line key={i} x1={i * 32} y1="0" x2={i * 32} y2="160" stroke="#2c4a3a" strokeWidth="0.6" strokeDasharray="2 3" />
            ))}
            <line x1="0" y1="14" x2="320" y2="14" stroke="#ff7a7a" strokeWidth="1" strokeDasharray="5 3" />
            <text x="316" y="11" fontSize="9" textAnchor="end" fill="#ff7a7a">Vgs absolute max</text>
            <line x1="0" y1="118" x2="320" y2="118" stroke="#2c4a3a" strokeWidth="1" strokeDasharray="4 3" />
            <text x="316" y="114" fontSize="9" textAnchor="end" fill="#9fe3b4">threshold</text>
            <polyline points={gatePts} fill="none" stroke="#7CFC9A" strokeWidth="2" strokeLinejoin="round" />
            <line x1="76" y1="104" x2="144" y2="104" stroke="#ffd56b" strokeWidth="1.2" />
            <text x="110" y="116" fontSize="9" textAnchor="middle" fill="#ffd56b">Miller plateau</text>
            <line x1="164" y1={peakY} x2="164" y2="40" stroke="#ffd56b" strokeWidth="1.2" />
            <text x="170" y={peakY + 8} fontSize="9" fill="#ffd56b">peak Vgs (ringing)</text>
            <text x="250" y="52" fontSize="9" fill="#9fe3b4">final drive level</text>
            <text x="6" y="146" fontSize="9" fill="#9fe3b4">0 V</text>
            <text x="6" y="170" fontSize="9" fill="#9fe3b4">CH1 Vgs, gate to source</text>
          </svg>
        </Figure>
      </section>

      <section id="why-rings">
        <h2 className="text-xl font-semibold mb-3">Why the gate rings</h2>
        <p className="text-muted leading-7 mb-4">
          The gate loop runs from the driver output, through the gate resistor and the trace to the gate,
          through the gate-source capacitance, and back from the source to the driver&apos;s ground. That
          loop has inductance from its traces and package leads, and with the gate capacitance it forms
          a resonant LC circuit. A fast driver edge excites it, and the gate resistor (plus the
          driver&apos;s own output resistance) is the only thing damping it. The wider the loop, the more
          inductance, the lower the ring frequency and the less damping a given resistor provides. The
          general theory of overshoot and ringing on any edge is in our{" "}
          <Link href="/oscilloscopes/how-to-measure-signal-overshoot-and-ringing-with-an-oscilloscope" className={link}>
            overshoot and ringing guide
          </Link>
          .
        </p>
        <BarChart
          items={[
            { label: "5 nH loop", value: 50, display: "≈ 50 MHz", highlight: true },
            { label: "10 nH loop", value: 36, display: "≈ 36 MHz" },
            { label: "20 nH loop", value: 25, display: "≈ 25 MHz" },
            { label: "40 nH loop", value: 18, display: "≈ 18 MHz" },
          ]}
        />
        <p className="mt-4 text-muted leading-7">
          The chart applies f = 1 ÷ (2π√LC) with an illustrative 2 nF of effective gate capacitance.
          Real values depend on the device and layout, but the pattern holds: ringing in the tens of
          megahertz is normal territory. A scope whose bandwidth is close to the ring frequency shows the
          ring smaller than it is; the Rigol DS1054Z, for example, lists {bw(rigol)}, so a 50 MHz ring
          would be noticeably attenuated on it.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="probe-low-side">Probe a low-side gate from gate to source</StepHeading>
        <p className="text-muted leading-7 mb-4">
          What matters to the MOSFET is the voltage between its own gate and source pins. For a low-side
          device, whose source sits at or near ground, put the 10x probe tip on the gate pin and the short
          ground spring directly on the source pin. Do not use the long ground clip, and do not ground the
          probe to a convenient ground point elsewhere on the board: during fast switching, the source
          lead and the trace to ground carry a large di/dt, and the voltage across that inductance would
          be added to your reading. Our guide to{" "}
          <Link href="/oscilloscopes/how-to-connect-an-oscilloscope-probe-correctly" className={link}>
            connecting a probe correctly
          </Link>{" "}
          explains why a long ground lead rings by itself.
        </p>
        <Figure
          caption={
            <>
              Good: probe tip on the gate pin, ground spring on the source pin, a loop only millimeters
              across. Avoid: a long ground clip to board ground several centimeters away, which adds its
              own ringing and the voltage drop along the source path.
            </>
          }
        >
          <svg viewBox="0 0 340 190" className="w-full h-auto" role="img" aria-label="Probing diagram comparing a short ground spring from gate to source pin with a long ground clip to distant board ground">
            <g className="stroke-foreground" strokeWidth="1.6" fill="none">
              <rect x="10" y="60" width="44" height="34" rx="3" className="fill-surface" />
              <path d="M54 77 H66" />
              <rect x="66" y="71" width="22" height="12" rx="2" className="fill-surface" />
              <path d="M88 77 H110 M110 64 V90 M116 60 V94 M116 66 H136 V40 M116 88 H136 V130 M116 77 H126" />
              <path d="M136 130 V150 M120 150 H152 M126 156 H146 M132 162 H140" />
              <rect x="190" y="60" width="44" height="34" rx="3" className="fill-surface" />
              <path d="M234 77 H246" />
              <rect x="246" y="71" width="22" height="12" rx="2" className="fill-surface" />
              <path d="M268 77 H290 M290 64 V90 M296 60 V94 M296 66 H316 V40 M296 88 H316 V130" />
              <path d="M316 130 V150 M300 150 H332 M306 156 H326 M312 162 H320" />
            </g>
            <g className="stroke-accent" strokeWidth="2" fill="none">
              <line x1="104" y1="77" x2="104" y2="24" />
              <path d="M104 90 q16 6 32 6" strokeWidth="1.8" />
              <line x1="284" y1="77" x2="284" y2="24" />
              <path d="M284 30 Q240 110 214 150" strokeDasharray="4 3" strokeWidth="1.4" />
            </g>
            <circle cx="104" cy="77" r="3.5" className="fill-accent" />
            <circle cx="136" cy="96" r="2.5" className="fill-accent" />
            <circle cx="284" cy="77" r="3.5" className="fill-accent" />
            <circle cx="214" cy="150" r="2.5" className="fill-accent" />
            <path d="M190 150 H232" className="stroke-foreground" strokeWidth="1.6" />
            <g fontSize="9" className="fill-foreground">
              <text x="32" y="81" textAnchor="middle">Driver</text>
              <text x="77" y="68" textAnchor="middle">Rg</text>
              <text x="142" y="44">D</text>
              <text x="142" y="126">S</text>
              <text x="212" y="81" textAnchor="middle">Driver</text>
              <text x="257" y="68" textAnchor="middle">Rg</text>
              <text x="322" y="44" textAnchor="end">D</text>
              <text x="200" y="164">board GND</text>
              <text x="70" y="16" fontSize="10" className="fill-accent">Good: spring at S</text>
              <text x="230" y="16" fontSize="10" fill="#ff7a7a">Avoid: long clip</text>
              <text x="170" y="182" textAnchor="middle" className="fill-muted">ground the probe at the source pin, not elsewhere on the board</text>
            </g>
          </svg>
        </Figure>
      </section>

      <section id="high-side">
        <h2 className="text-xl font-semibold mb-3">High-side gates need a differential or isolated probe</h2>
        <p className="text-muted leading-7 mb-4">
          In a half-bridge or a high-side switch, the MOSFET&apos;s source is the switch node. It jumps
          between ground and the full supply voltage every cycle, often with fast edges. A standard probe
          ground on a bench scope is tied to mains earth, so clipping it to that source shorts the switch
          node to earth. To see a high-side Vgs you need a differential probe rated for the common-mode
          voltage and with good common-mode rejection at the switching speed, or an isolated measurement
          system designed for it.
        </p>
        <Callout title="Never float the scope">
          Do not clip a bench scope&apos;s ground to a high-side source or switch node, and never defeat
          the scope&apos;s mains earth by lifting the ground pin or using an adapter to &quot;float&quot;
          it. That puts the whole chassis, every BNC and every probe ground at the switch-node voltage,
          where touching it can kill. Use a differential probe or an isolated-input instrument rated for
          the voltage, and stay within the CAT and voltage ratings of every part of the setup.
        </Callout>
      </section>

      <section>
        <StepHeading n={2} id="capture">Capture the switching edge</StepHeading>
        <p className="text-muted leading-7">
          Set the channel to DC coupling and 10x, with the full bandwidth on: the 20 MHz limit that helps
          with rail ripple would hide most gate ringing. Choose a V/div that puts the full drive swing
          across about six divisions, leaving room above for the overshoot. Trigger on the gate channel,
          rising edge for turn-on or falling for turn-off, with the level around half the drive voltage,
          and use Normal mode. Then set the timebase so a few hundred nanoseconds around the edge fill the
          screen; at 50 ns/div individual ring cycles are easy to count. If a second channel is free, put
          it on the drain to see where the plateau lines up with the drain transition.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="measure">Measure the ring frequency and peak Vgs</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Stop the acquisition on a clear edge. Put one horizontal cursor on the final drive level and
          another at the highest point of the ring; the top cursor&apos;s absolute value is the peak Vgs
          to compare with the datasheet&apos;s absolute maximum. For the frequency, place vertical
          cursors on the same point of two ring peaks several cycles apart, divide the time by the number
          of cycles, and take the reciprocal. Repeat on the turn-off edge, where the concern is the
          opposite: how far the ring rises back toward the threshold while the device should be off, and
          how far it swings negative.
        </p>
        <Figure
          caption={
            <>
              A ringing gate edge at a fast timebase: the peak above the final level is the overshoot,
              and timing three ring cycles with cursors gives the ring frequency.
            </>
          }
        >
          <ScopeScreen
            wave="square-ring"
            cycles={1}
            amplitude={2}
            shift={2}
            marks={[
              { x1: 1.9, y1: 2, x2: 1.9, y2: 1.4, text: "peak" },
              { x1: 2.05, y1: 0.9, x2: 3.72, y2: 0.9, text: "3 ring cycles" },
            ]}
            labels={{ left: "CH1 Vgs 5 V/div", right: "50 ns/div" }}
          />
        </Figure>
        <div className="mt-4">
          <KeyIdea title="Compare with the device, not a rule">
            Check the gate-source absolute maximum and the threshold voltage range in your MOSFET&apos;s
            datasheet, and judge the peak and the off-state ringing against those. If you are unsure the
            device is healthy at all, a quick static check with a meter, as in{" "}
            <Link href="/multimeters/how-to-test-a-mosfet-with-a-digital-multimeter" className={link}>
              testing a MOSFET with a multimeter
            </Link>
            , comes first.
          </KeyIdea>
        </div>
      </section>

      <section id="fixes">
        <h2 className="text-xl font-semibold mb-3">Damp the ringing: gate-drive fixes</h2>
        <p className="text-muted leading-7 mb-4">
          Re-measure after each change, one at a time, so you know which one helped. Layout changes
          remove the cause; resistor and ferrite changes treat the symptom and cost switching speed.
        </p>
        <DataTable
          head={["Fix", "What it does", "Trade-off"]}
          rows={[
            ["Raise the gate resistor", "Adds damping to the gate LC loop", "Slower edges, longer Miller plateau, more switching loss"],
            ["Move the driver closer to the MOSFET", "Shrinks loop inductance, raises and damps the ring", "May need a board re-spin"],
            ["Return the driver ground straight to the source pin", "Keeps power current out of the gate loop", "Needs care in layout; use a Kelvin source pin if the package has one"],
            ["Ferrite bead in series with the gate", "Adds loss at the ring frequency", "Must be chosen for the ring frequency; can slow edges"],
            ["Gate-source clamp (Zener or TVS)", "Limits peak Vgs", "Clamps the symptom only; adds capacitance"],
            ["Separate turn-on and turn-off resistors", "Tunes each edge on its own", "One more resistor and a diode"],
          ]}
        />
      </section>

      <section>
        <h2 id="troubleshooting" className="text-xl font-semibold mb-3">Troubleshooting gate ringing measurements</h2>
        <DataTable
          head={["Symptom", "Likely cause", "Fix"]}
          rows={[
            ["Ringing shrinks a lot with the ground spring", "Probe ground-lead resonance", "Keep the spring at the source pin"],
            ["Ringing looks smaller than expected at full speed", "Scope or probe bandwidth near the ring frequency", "Turn off the 20 MHz limit; use more bandwidth"],
            ["Large spikes that track the drain current", "Probe grounded away from the source", "Move the ground to the source pin itself"],
            ["Gate rises again after turn-off", "Drain dv/dt coupling through gate-drain capacitance", "Lower turn-off gate resistance or add a negative off-bias"],
            ["Scope trips the RCD or sparks on connection", "Probe ground on a high-side or mains node", "Disconnect and use a differential probe"],
          ]}
        />
        <p className="mt-4 text-muted leading-7">
          For the rest of a converter, including the switch node, our guide to{" "}
          <Link href="/oscilloscopes/how-to-measure-a-switching-power-supply-waveform-with-an-oscilloscope" className={link}>
            switching power supply waveforms
          </Link>{" "}
          picks up where the gate leaves off.
        </p>
      </section>

      <section>
        <h2 id="which-scope" className="text-xl font-semibold mb-3">Scopes with enough bandwidth for gate ringing</h2>
        <p className="text-muted leading-7 mb-4">
          Pick the scope from the ring frequency you expect. Using the common rule of thumb that bandwidth
          should be several times the highest frequency you need to see, a gate ring in the 18 to 50 MHz
          range from the loop examples above points toward 100 MHz at minimum, and toward 200 MHz for
          the tightest, fastest loops. Two channels cover gate and
          drain; a four-channel scope adds the switch node and the driver input on the same capture.
        </p>
        <ProductStrip
          title="Scopes for gate-drive work"
          items={[
            {
              name: "Siglent SDS1104X-E",
              image: siglent.image,
              alt: "Siglent SDS1104X-E four-channel benchtop digital oscilloscope",
              href: "/oscilloscopes/siglent-sds1104x-e-review",
              note: "Hands-on tested. 100MHz on 4 channels, so gate, drain, switch node and driver input fit at once.",
            },
            {
              name: "Siglent SDS1202X-E",
              image: sds1202.image,
              alt: "Siglent SDS1202X-E two-channel benchtop digital oscilloscope",
              href: "/oscilloscopes/siglent-sds1104x-e-vs-siglent-sds1202x-e",
              note: "200MHz on two channels, the most headroom here for fast rings on gate and drain.",
            },
            {
              name: "Rigol DHO804",
              image: dho804.image,
              alt: "Rigol DHO804 four-channel 12-bit oscilloscope with touchscreen",
              href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e",
              note: "Hands-on tested. 12-bit resolution resolves small Vgs overshoot; its 70MHz limits fast rings.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
