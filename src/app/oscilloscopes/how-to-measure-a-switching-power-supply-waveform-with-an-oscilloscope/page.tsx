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
  "How to measure a switching power supply waveform with an oscilloscope: probe a DC-DC converter switch node, read frequency and duty cycle, and spot ringing.";

export const metadata = buildMetadata({
  title: "Measure a Switching Power Supply Waveform",
  description,
  path: "/oscilloscopes/how-to-measure-a-switching-power-supply-waveform-with-an-oscilloscope",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;
const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;
const hantek = picks.find((p) => p.name === "Hantek DSO2D10")!;

const link = "text-accent hover:underline";

/** Simplified buck converter with the three useful probe points marked. */
function BuckDiagram() {
  const point = (x: number, y: number, n: string) => (
    <g>
      <circle cx={x} cy={y} r="9" className="fill-accent stroke-accent" />
      <text x={x} y={y + 3.5} fontSize="10" fontWeight="700" textAnchor="middle" className="fill-accent-foreground">{n}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 340 190" className="w-full h-auto" role="img" aria-label="Simplified buck converter schematic with probe points at the gate, switch node and output">
      <g className="stroke-foreground" strokeWidth="1.6" fill="none" strokeLinecap="round">
        {/* input */}
        <path d="M20 50 H90" />
        {/* high-side switch */}
        <rect x="90" y="38" width="40" height="24" rx="3" className="fill-surface" />
        <path d="M110 62 V80" />
        <path d="M110 38 V24 H70" strokeDasharray="3 3" />
        {/* switch node to inductor */}
        <path d="M130 50 H160" />
        <path d="M160 50 q8 -14 16 0 q8 -14 16 0 q8 -14 16 0 q8 -14 16 0" />
        <path d="M224 50 H300" />
        {/* diode / low-side switch */}
        <path d="M150 50 V110" />
        <rect x="138" y="110" width="24" height="26" rx="3" className="fill-surface" />
        <path d="M150 136 V160" />
        {/* output cap */}
        <path d="M270 50 V96 M258 96 H282 M258 104 H282 M270 104 V160" />
        {/* ground rail */}
        <path d="M20 160 H300" />
      </g>
      <g fontSize="9.5" className="fill-muted" textAnchor="middle">
        <text x="20" y="42" textAnchor="start" className="fill-foreground">V in</text>
        <text x="110" y="76" textAnchor="start" dx="4">switch</text>
        <text x="66" y="20">gate drive</text>
        <text x="192" y="34">inductor</text>
        <text x="150" y="152" textAnchor="end" dx="-16">low-side</text>
        <text x="300" y="42" textAnchor="end" className="fill-foreground">V out</text>
        <text x="20" y="176" textAnchor="start">0 V / ground</text>
      </g>
      {point(66, 36, "1")}
      {point(150, 50, "2")}
      {point(300, 66, "3")}
      <text x="170" y="188" fontSize="9" textAnchor="middle" className="fill-muted">1 gate drive · 2 switch node (SW pin) · 3 output, for ripple</text>
    </svg>
  );
}

export default function HowToMeasureASwitchingPowerSupplyWaveformPage() {
  return (
    <HowToShell
      title="How to Measure a Switching Power Supply Waveform With an Oscilloscope"
      description={description}
      published="2026-10-22"
      path="/oscilloscopes/how-to-measure-a-switching-power-supply-waveform-with-an-oscilloscope"
      category="oscilloscopes"
      intro={
        <>
          To measure a switching power supply waveform with an oscilloscope, probe the switch node (the SW
          pin, where the switching transistor meets the inductor) of a low-voltage DC-DC converter, ground the
          probe right beside it with a ground spring, trigger on the rising edge and read the frequency and
          duty cycle. A healthy buck converter shows a clean rectangular pulse whose duty cycle is close to
          V out ÷ V in. This guide explains where to probe, which settings to use, and how to read what you
          see.
        </>
      }
      aside={{
        image: siglent.image,
        alt: "Siglent SDS1104X-E four-channel digital oscilloscope, front view",
        caption: (
          <>
            A 100MHz scope such as the Siglent SDS1104X-E leaves headroom for switching edges. See our{" "}
            <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={link}>
              SDS1104X-E review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "where-to-probe", label: "Where to probe a DC-DC converter" },
        { id: "connect-short-ground", label: "Connect with a short ground" },
        { id: "set-up-the-scope", label: "Set up the scope" },
        { id: "read-frequency-duty", label: "Read frequency and duty cycle" },
        { id: "expected-duty", label: "Expected duty cycle for a buck" },
        { id: "what-the-shape-tells-you", label: "What the waveform shape tells you" },
        { id: "mains-smps", label: "Mains-input supplies" },
        { id: "which-scope", label: "Which scope to use" },
      ]}
      faq={[
        {
          q: "What should a switch node waveform look like?",
          a: "On a buck converter it is a rectangular pulse train: high at roughly the input voltage while the top switch is on, then near 0 V (or slightly below, by a diode drop) while it is off. Expect some overshoot and a short burst of ringing on each edge. A clean, regular train at a fixed frequency means the converter is regulating normally.",
        },
        {
          q: "Why does my switching regulator's waveform keep skipping pulses?",
          a: "Many regulators enter a power-saving mode at light load, often called burst, pulse-skipping or PFM mode, where they switch in short groups and then pause. Add a load resistor or connect the real load and the pulses usually become continuous. Irregular skipping under full load is more suspicious and can point to instability.",
        },
        {
          q: "Is the ringing on the switch node a fault?",
          a: "Some ringing is normal: the switch's capacitance and the board's stray inductance form a resonant circuit. First swap the probe's ground clip for a ground spring, because a long ground lead adds ringing of its own. If large ringing remains with a short ground, layout or snubbing may need attention.",
        },
        {
          q: "How do I calculate duty cycle from the scope?",
          a: "Duty cycle is on-time divided by period, times 100%. Measure the time the pulse is high and the time for one full cycle, using divisions, cursors or the measure menu. For example, 0.5 µs high in a 2.5 µs period is 20%.",
        },
        {
          q: "Can I probe the primary side of a mains-powered SMPS?",
          a: "Not with a standard earthed scope and passive probe. The primary side is at mains potential and the scope ground is earthed, so the ground clip would short it. Use a high-voltage differential probe rated for the job, or measure only the low-voltage secondary side.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-measure-ripple-voltage-with-an-oscilloscope",
          title: "How to Measure Ripple Voltage With an Oscilloscope",
          desc: "AC coupling, bandwidth limit and short grounds for the output ripple.",
        },
        {
          href: "/oscilloscopes/oscilloscope-bandwidth-for-switching-power-supplies",
          title: "Oscilloscope Bandwidth for Switching Supplies",
          desc: "Work out how much bandwidth your switching edges really need.",
        },
      ]}
    >
      <Callout title="Start on low-voltage converters only">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            The method here is for DC-DC converters powered from a bench supply, battery or USB, such as buck
            modules and regulator boards.
          </li>
          <li>
            Inside a mains-powered SMPS, everything on the primary side (before the transformer) is at mains
            potential and the bulk capacitor can stay charged after unplugging. Do not clip an earthed scope
            probe there.
          </li>
          <li>Never remove the scope&apos;s earth to float it.</li>
        </ul>
      </Callout>

      <section>
        <h2 id="where-to-probe" className="text-xl font-semibold mb-3">Where to probe a DC-DC converter</h2>
        <p className="text-muted leading-7 mb-4">
          A buck converter chops the input into pulses and smooths them with an inductor and capacitor. Three
          points tell you most of what is going on:
        </p>
        <Figure caption={<>A simplified buck converter. Point 2, the switch node, carries the waveform this guide is about.</>}>
          <BuckDiagram />
        </Figure>
        <DataTable
          head={["Probe point", "What you see", "What it tells you"]}
          rows={[
            ["1 Gate drive", "Pulse train at the controller's drive voltage", "Whether the controller is switching at all"],
            ["2 Switch node (SW)", "Rectangular pulses from about 0 V to V in", "Frequency, duty cycle, edge quality"],
            ["3 Output", "Steady DC with small ripple", "Regulation and ripple (separate guide)"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="connect-short-ground">Connect with a short ground</StepHeading>
        <p className="text-muted leading-7">
          Power the converter off. Set the probe to 10x and fit a ground spring if you have one, then find a
          ground pad or the output capacitor&apos;s negative terminal right beside the switch. Hold or tack the
          probe so the tip sits on the SW pin or the inductor terminal it connects to. Switch nodes have fast
          edges, and the long ground clip lead turns those into ringing that is not really there. Then
          power up.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="set-up-the-scope">Set up the scope</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Use DC coupling so the 0 V level stays on screen, and choose a V/div that fits the input voltage
          into about six divisions: 5 V/div for a 24 V input. Trigger on the rising edge at roughly half the
          input voltage. Converters typically switch somewhere between a few hundred kilohertz and a few
          megahertz, so start at 1 µs/div and adjust until two or three cycles fill the screen.
        </p>
        <FlowDiagram
          steps={[
            { label: "10x + spring", sub: "Short ground at the switch" },
            { label: "DC coupling", sub: "V/div to fit V in" },
            { label: "Rising edge", sub: "Trigger at half V in" },
            { label: "Timebase", sub: "2 to 3 cycles on screen" },
          ]}
        />
      </section>

      <section>
        <StepHeading n={3} id="read-frequency-duty">Read frequency and duty cycle</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Count divisions for one full period and for the high part of the pulse, or add frequency and positive
          duty cycle in the measure menu. The worked example below is a converter stepping 24 V down to 5 V.
        </p>
        <Figure
          caption={
            <>
              Switch node at 500 ns/div: one period spans 5 divisions (2.5 µs, so 400 kHz) and the high time is
              1 division (0.5 µs), giving 20% duty, close to 5 V ÷ 24 V.
            </>
          }
        >
          <ScopeScreen
            wave="pulse"
            cycles={2}
            amplitude={2}
            offset={1}
            triggerLevel={1}
            marks={[
              { x1: 0, y1: 0.5, x2: 5, y2: 0.5, text: "T = 5 div = 2.5 µs" },
              { x1: 0, y1: 5.6, x2: 1, y2: 5.6, text: "t on" },
            ]}
            labels={{ left: "CH1 5 V/div", right: "500 ns/div" }}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The same on-time and period method is covered in more depth in{" "}
          <Link href="/oscilloscopes/how-to-measure-pwm-duty-cycle-with-an-oscilloscope" className={link}>
            how to measure PWM duty cycle
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="expected-duty" className="text-xl font-semibold mb-3">Expected duty cycle for a buck converter</h2>
        <p className="text-muted leading-7 mb-4">
          In an ideal buck converter running continuously, duty cycle equals V out ÷ V in. Real converters
          need slightly more to cover switch and inductor losses, so a measured figure a few percent above the
          ideal is normal.
        </p>
        <Figure caption={<>Ideal duty cycle for common step-down conversions. Measured values usually sit a little higher.</>}>
          <BarChart
            items={[
              { label: "24 V → 5 V", value: 21, display: "≈ 21%", highlight: true },
              { label: "12 V → 3.3 V", value: 27.5, display: "≈ 28%" },
              { label: "12 V → 5 V", value: 41.7, display: "≈ 42%" },
              { label: "5 V → 3.3 V", value: 66, display: "66%" },
            ]}
          />
        </Figure>
        <KeyIdea title="Boost converters run the other way">
          For a boost converter the ideal relationship is duty = 1 − (V in ÷ V out), so stepping 5 V up to 12 V
          needs roughly 58% duty. If the measured value is far from the ideal for your topology, check the
          load and input voltage before suspecting the controller.
        </KeyIdea>
      </section>

      <section>
        <h2 id="what-the-shape-tells-you" className="text-xl font-semibold mb-3">What the waveform shape tells you</h2>
        <Figure caption={<>Overshoot and decaying ringing after each edge. Some is normal; check your ground connection before judging it.</>}>
          <ScopeScreen wave="square-ring" cycles={2} amplitude={2.5} labels={{ left: "switch node ringing" }} />
        </Figure>
        <div className="mt-4">
          <DataTable
            head={["What you see", "Likely cause"]}
            rows={[
              ["Clean pulses, steady frequency", "Normal regulation"],
              ["Ringing that shrinks with a ground spring", "Probe ground lead, not the circuit"],
              ["Groups of pulses with gaps at light load", "Burst or pulse-skipping power-save mode"],
              ["Duty cycle wobbling, edges jittering", "Possible instability; check input, load and feedback"],
              ["No pulses, gate drive missing", "Controller not starting: enable pin, input voltage, fault"],
              ["Switch node stuck high or low", "Failed switch or controller in a protection state"],
            ]}
          />
        </div>
        <p className="text-muted leading-7 mt-4">
          To see the edges properly you need enough bandwidth; our guide to{" "}
          <Link href="/oscilloscopes/oscilloscope-bandwidth-for-switching-power-supplies" className={link}>
            oscilloscope bandwidth for switching supplies
          </Link>{" "}
          works that out from rise time. For the output side, follow{" "}
          <Link href="/oscilloscopes/how-to-measure-ripple-voltage-with-an-oscilloscope" className={link}>
            how to measure ripple voltage
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="mains-smps" className="text-xl font-semibold mb-3">Mains-input supplies</h2>
        <p className="text-muted leading-7">
          Chargers, laptop bricks and PC supplies are switching supplies too, but their primary switch sits
          at rectified mains voltage, well over 300 V in the UK. Probing it needs a differential probe rated
          for that voltage, or an isolation arrangement set up by someone trained to use it. On the low-voltage
          secondary side, the output and any secondary-side regulators can be probed with the method above.
        </p>
      </section>

      <section>
        <h2 id="which-scope" className="text-xl font-semibold mb-3">Which scope to use</h2>
        <p className="text-muted leading-7 mb-6">
          Frequency and duty cycle on a few-hundred-kilohertz converter are within reach of any bench scope.
          For a clear view of edges and ringing, more bandwidth helps, and a second channel lets you show gate
          drive and switch node together. Compare models in our{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            best beginner oscilloscopes
          </Link>{" "}
          roundup.
        </p>
        <ProductStrip
          title="Scopes in our reviews"
          items={[
            {
              name: "Siglent SDS1104X-E",
              image: siglent.image,
              alt: "Siglent SDS1104X-E four-channel 100MHz digital bench oscilloscope",
              href: "/oscilloscopes/siglent-sds1104x-e-review",
              note: "100MHz, 4 channels: bandwidth headroom for switching edges.",
            },
            {
              name: "Rigol DS1054Z",
              image: rigol.image,
              alt: "Rigol DS1054Z four-channel 50MHz digital bench oscilloscope",
              href: "/oscilloscopes/rigol-ds1054z-review",
              note: "50MHz, 4 channels, strong community documentation.",
            },
            {
              name: "Hantek DSO2D10",
              image: hantek.image,
              alt: "Hantek DSO2D10 two-channel 100MHz oscilloscope with built-in waveform generator",
              href: "/oscilloscopes/hantek-dso2d10-review",
              note: "100MHz, 2 channels and a built-in waveform generator.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
