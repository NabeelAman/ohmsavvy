import Link from "next/link";
import {
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
  "How to measure power supply startup time with an oscilloscope: probe input and output, single-trigger the turn-on, then read delay, rise time and overshoot.";

export const metadata = buildMetadata({
  title: "How to Measure Power Supply Startup Time",
  description,
  path: "/oscilloscopes/how-to-measure-power-supply-startup-time-with-an-oscilloscope",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;
const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;
const hantek = picks.find((p) => p.name === "Hantek DSO2D10")!;

const link = "text-accent hover:underline";

/** Probe placement: CH1 on the supply input (or enable pin), CH2 on the output, both grounds on the converter's ground. */
function ProbeSetup() {
  return (
    <svg
      viewBox="0 0 340 170"
      className="w-full h-auto"
      role="img"
      aria-label="Wiring diagram with a bench supply feeding a converter module, the CH1 probe on the converter input or enable pin, the CH2 probe on the output, and both probe grounds on the shared ground rail"
    >
      <rect x="12" y="40" width="70" height="56" rx="4" className="fill-surface stroke-foreground" strokeWidth="1.5" />
      <text x="47" y="64" fontSize="10" textAnchor="middle" className="fill-foreground">Source</text>
      <text x="47" y="78" fontSize="9" textAnchor="middle" className="fill-muted">(switched on)</text>
      <rect x="135" y="34" width="80" height="68" rx="4" className="fill-surface stroke-foreground" strokeWidth="1.5" />
      <text x="175" y="62" fontSize="10" textAnchor="middle" className="fill-foreground">Converter</text>
      <text x="175" y="76" fontSize="9" textAnchor="middle" className="fill-muted">under test</text>
      <rect x="270" y="46" width="56" height="44" rx="4" className="fill-surface stroke-foreground" strokeWidth="1.5" />
      <text x="298" y="72" fontSize="10" textAnchor="middle" className="fill-foreground">Load</text>
      <line x1="82" y1="52" x2="135" y2="52" className="stroke-foreground" strokeWidth="1.5" />
      <line x1="215" y1="52" x2="270" y2="52" className="stroke-foreground" strokeWidth="1.5" />
      <line x1="82" y1="88" x2="82" y2="130" className="stroke-foreground" strokeWidth="1.5" />
      <line x1="175" y1="102" x2="175" y2="130" className="stroke-foreground" strokeWidth="1.5" />
      <line x1="298" y1="90" x2="298" y2="130" className="stroke-foreground" strokeWidth="1.5" />
      <line x1="40" y1="130" x2="320" y2="130" className="stroke-foreground" strokeWidth="2" />
      <text x="40" y="146" fontSize="9" className="fill-muted">ground</text>
      <circle cx="108" cy="52" r="4" className="fill-accent" />
      <line x1="108" y1="48" x2="108" y2="18" className="stroke-accent" strokeWidth="1.5" />
      <text x="108" y="13" fontSize="10" textAnchor="middle" className="fill-accent">CH1: input / EN</text>
      <circle cx="242" cy="52" r="4" className="fill-accent" />
      <line x1="242" y1="48" x2="242" y2="18" className="stroke-accent" strokeWidth="1.5" />
      <text x="242" y="13" fontSize="10" textAnchor="middle" className="fill-accent">CH2: output</text>
      <circle cx="130" cy="130" r="3" className="fill-foreground" />
      <circle cx="230" cy="130" r="3" className="fill-foreground" />
      <text x="180" y="160" fontSize="9" textAnchor="middle" className="fill-muted">
        both probe ground clips on the converter&apos;s ground
      </text>
    </svg>
  );
}

/** Output ramps compared: a clean monotonic soft-start with 10% and 90% levels, a non-monotonic rise and an overshoot. */
function RampShapes() {
  const W = 100;
  const lvl = (f: number) => 120 - f * 90; // 0 V at y=120, nominal at y=30
  const clean = Array.from({ length: 51 }, (_, i) => {
    const t = i / 50;
    const v = t < 0.2 ? 0 : Math.min(1, (t - 0.2) / 0.5);
    return `${(t * W).toFixed(1)},${lvl(v).toFixed(1)}`;
  }).join(" ");
  const dip = Array.from({ length: 51 }, (_, i) => {
    const t = i / 50;
    let v = t < 0.2 ? 0 : Math.min(1, (t - 0.2) / 0.5);
    if (t > 0.42 && t < 0.56) v -= 0.18 * Math.sin(((t - 0.42) / 0.14) * Math.PI);
    return `${(t * W + 115).toFixed(1)},${lvl(v).toFixed(1)}`;
  }).join(" ");
  const over = Array.from({ length: 51 }, (_, i) => {
    const t = i / 50;
    const v = t < 0.2 ? 0 : t < 0.45 ? (t - 0.2) / 0.25 : 1 + 0.22 * Math.exp(-(t - 0.45) * 14) * Math.cos((t - 0.45) * 30);
    return `${(t * W + 230).toFixed(1)},${lvl(Math.min(v, 1.3)).toFixed(1)}`;
  }).join(" ");
  return (
    <svg
      viewBox="0 0 340 160"
      className="w-full h-auto"
      role="img"
      aria-label="Three output start-up waveforms: a clean monotonic ramp with the 10 percent and 90 percent levels marked, a ramp with a dip partway up, and a fast ramp that overshoots its final voltage"
    >
      {[0, 115, 230].map((x) => (
        <g key={x}>
          <rect x={x} y="10" width={W} height="120" rx="3" className="fill-[#0f1a14]" />
          <line x1={x} x2={x + W} y1={lvl(1)} y2={lvl(1)} stroke="#2c4a3a" strokeWidth="1" strokeDasharray="3 3" />
        </g>
      ))}
      <line x1="0" x2={W} y1={lvl(0.1)} y2={lvl(0.1)} stroke="#5BB3E8" strokeWidth="1" strokeDasharray="4 3" />
      <line x1="0" x2={W} y1={lvl(0.9)} y2={lvl(0.9)} stroke="#5BB3E8" strokeWidth="1" strokeDasharray="4 3" />
      <text x="4" y={lvl(0.9) - 3} fontSize="9" fill="#5BB3E8">90%</text>
      <text x="4" y={lvl(0.1) - 3} fontSize="9" fill="#5BB3E8">10%</text>
      <polyline points={clean} fill="none" stroke="#7CFC9A" strokeWidth="1.8" />
      <polyline points={dip} fill="none" stroke="#ffd56b" strokeWidth="1.8" />
      <polyline points={over} fill="none" stroke="#ffd56b" strokeWidth="1.8" />
      <text x="50" y="146" fontSize="10" textAnchor="middle" className="fill-foreground">Monotonic</text>
      <text x="165" y="146" fontSize="10" textAnchor="middle" className="fill-foreground">Non-monotonic</text>
      <text x="280" y="146" fontSize="10" textAnchor="middle" className="fill-foreground">Overshoot</text>
      <text x="170" y="158" fontSize="9" textAnchor="middle" className="fill-muted">dashed green line = nominal output</text>
    </svg>
  );
}

export default function HowToMeasurePowerSupplyStartupTimeWithAnOscilloscopePage() {
  return (
    <HowToShell
      title="How to Measure Power Supply Startup Time With an Oscilloscope"
      description={description}
      published="2026-10-22"
      path="/oscilloscopes/how-to-measure-power-supply-startup-time-with-an-oscilloscope"
      category="oscilloscopes"
      intro={
        <>
          To measure power supply startup time with an oscilloscope, put CH1 on the input (or the enable pin)
          and CH2 on the output, set a single trigger on CH1&apos;s rising edge, and use a slow timebase so the
          whole turn-on fits on screen. Startup time is the interval from the input being applied, or enable
          asserted, to the output reaching 90% of its final value or entering its regulation band. Measure it
          with cursors or the scope&apos;s delay measurement.
        </>
      }
      aside={{
        image: rigol.image,
        alt: "Rigol DS1054Z four-channel digital oscilloscope, front view",
        caption: (
          <>
            Two channels are enough for one rail; the four on the Rigol DS1054Z (50MHz, 1 GSa/s) let you watch
            the input and three outputs together. See the{" "}
            <Link href="/oscilloscopes/rigol-ds1054z-review" className={link}>
              DS1054Z review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-startup-time-means", label: "What startup time means" },
        { id: "connect-two-channels", label: "Connect two channels" },
        { id: "single-trigger", label: "Single trigger on the input edge" },
        { id: "read-the-delay", label: "Read the delay with cursors" },
        { id: "delay-vs-rise-time", label: "Start-up delay vs rise time" },
        { id: "check-the-ramp", label: "Soft-start, monotonic rise, overshoot" },
        { id: "inrush-current", label: "Inrush current at start-up" },
        { id: "power-sequencing", label: "Power sequencing of multiple rails" },
      ]}
      faq={[
        {
          q: "What is a typical power supply startup time?",
          a: "It varies widely with the design. Small DC-DC converters with internal soft-start often reach regulation within a few milliseconds, while larger supplies with big output capacitors, or adjustable soft-start set by an external capacitor, can take tens of milliseconds or more. The datasheet usually gives a typical figure and the test conditions, which you should copy when measuring.",
        },
        {
          q: "Should I trigger on the input voltage or the enable pin?",
          a: "It depends on what you need to know. Trigger on the enable pin when the input is already present and you care how fast the converter responds to a turn-on command. Trigger on the input when the supply starts as soon as power arrives. Datasheets often specify both, so match the reference your requirement or datasheet uses.",
        },
        {
          q: "Why does startup time change with load?",
          a: "The converter has to charge the output capacitance and supply the load at the same time, and soft-start usually limits how fast the output may rise. A heavier load takes some of the available current, so the ramp can slow. Some converters also enter current limit during start-up with large capacitive loads. Measure at the load your circuit really presents.",
        },
        {
          q: "How do I see overshoot at start-up if the timebase is slow?",
          a: "At slow timebases the scope may lower its sample rate, and a brief overshoot can fall between samples. Turn on peak detect if available, or take a second capture at a faster timebase with the trigger delayed to the moment the output reaches its final level. Then measure the peak above nominal with horizontal cursors.",
        },
        {
          q: "Can I measure startup time on a mains-powered supply?",
          a: "Yes, but do not clip a standard probe ground to the primary side. Measure the isolated low-voltage output, and time it from a secondary-side signal such as a power-good pin, or put a rated differential probe on the AC input. Switching the mains on gives a random point in the AC cycle, so repeat the capture several times.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-measure-a-switching-power-supply-waveform-with-an-oscilloscope",
          title: "How to Measure a Switching Power Supply Waveform",
          desc: "Switch node, gate drive and output ripple once the supply is running.",
        },
        {
          href: "/oscilloscopes/how-to-measure-propagation-delay-using-an-oscilloscope",
          title: "How to Measure Propagation Delay Using an Oscilloscope",
          desc: "The two-channel delay technique applied to logic gates and buffers.",
        },
      ]}
    >
      <Callout title="Safety: grounds, mains and stored energy">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            A scope probe ground clip is connected to mains earth through the scope. On the primary side of an
            off-line supply it can create a short circuit. Measure the isolated output, or use a rated
            differential probe.
          </li>
          <li>
            Large input and output capacitors can stay charged after power is removed. Discharge them before
            moving probes.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="what-startup-time-means" className="text-xl font-semibold mb-3">What power supply startup time means</h2>
        <p className="text-muted leading-7 mb-4">
          Startup time is measured from a defined start event to a defined end point. The start is usually the
          input voltage crossing a threshold, or the enable signal going high. The end is the output reaching
          90% of its nominal value, or settling within its regulation tolerance, which is a stricter test.
          Datasheets don&apos;t all use the same definition, so write down which one you used next to the
          number.
        </p>
        <DataTable
          head={["Term", "Usually measured from", "To"]}
          rows={[
            ["Turn-on (start-up) delay", "Input or enable applied", "Output starts to rise, often 10%"],
            ["Output rise time", "Output at 10%", "Output at 90%"],
            ["Startup time", "Input or enable applied", "Output at 90% or within regulation"],
            ["Power-good delay", "Output in regulation", "Power-good pin asserted"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="connect-two-channels">Connect two channels: input on CH1, output on CH2</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Clip CH1 to the converter input or its enable pin and CH2 to the output, as close to the converter
          as you can. Both ground clips go to the converter&apos;s ground, not to a distant point. Use DC
          coupling on both channels: AC coupling would hide the very step you are trying to time. Set each
          channel so its full swing uses most of the screen height without clipping.
        </p>
        <Figure caption={<>Probe placement for a single rail. Connect the real load, or an equivalent, since start-up behaviour depends on it.</>}>
          <ProbeSetup />
        </Figure>
      </section>

      <section>
        <StepHeading n={2} id="single-trigger">Single trigger on CH1&apos;s rising edge with a slow timebase</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set the trigger source to CH1, rising edge, at about half the input&apos;s final voltage, and choose
          Single mode so the scope captures one turn-on and stops. Move the trigger point one or two divisions
          from the left of the screen so the rest of the display shows what follows. Pick a timebase that
          spans a few times the expected startup time; if the datasheet says 5 ms, start at 2 ms/div. Arm the
          scope, then switch the supply on.
        </p>
        <p className="text-muted leading-7">
          If nothing captures, the edge may not reach the trigger level, or the input may already be present
          from a previous attempt. Our guide on{" "}
          <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope" className={link}>
            how to trigger an oscilloscope
          </Link>{" "}
          explains Single and Normal modes.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="read-the-delay">Read the delay with cursors or a delay measurement</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Place vertical (time) cursors at the CH1 trigger edge and at the point where CH2 reaches 90% of its
          final value. The delta is the startup time. Many scopes also have an automatic delay measurement
          between two channels; by default it usually measures between 50% points, so change the reference
          levels to 90% for CH2 if your scope allows it, or rely on cursors.
        </p>
        <Figure
          caption={
            <>
              Simplified view: CH1 (green) steps up at the trigger point, and CH2 (blue) follows after a delay.
              Real outputs ramp rather than jump; the next figure shows the shape.
            </>
          }
        >
          <ScopeScreen
            wave="square"
            cycles={0.5}
            amplitude={1}
            offset={2}
            shift={1}
            triggerLevel={2}
            second={{ wave: "square", cycles: 0.5, amplitude: 1.5, offset: -2, shift: 4.5, label: "CH2 output" }}
            marks={[{ x1: 1, y1: 4, x2: 4.5, y2: 4, text: "startup time" }]}
            labels={{ left: "CH1 input / EN", right: "2 ms/div" }}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The same two-channel timing method is used for logic in{" "}
          <Link href="/oscilloscopes/how-to-measure-propagation-delay-using-an-oscilloscope" className={link}>
            how to measure propagation delay
          </Link>
          , on a much faster timescale.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="delay-vs-rise-time">Start-up delay vs rise time</StepHeading>
        <p className="text-muted leading-7">
          Splitting the result into two parts tells you more. The delay from enable to the first 10% of output
          is the converter&apos;s internal wake-up: reference settling, undervoltage lockout and control
          circuits. The 10% to 90% portion is the output rise time, mostly set by soft-start and the output
          capacitance. Measure the second part with horizontal cursors at the 10% and 90% levels, exactly as in{" "}
          <Link href="/oscilloscopes/how-to-measure-rise-time-with-oscilloscope-cursors" className={link}>
            measuring rise time with oscilloscope cursors
          </Link>
          , just on a slower timebase.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="check-the-ramp">Check soft-start, monotonic rise and overshoot</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The shape of the ramp matters as much as its timing. Soft-start deliberately slows the rise to
          limit inrush and avoid overshoot, giving a smooth straight or gently curved ramp. Processors, FPGAs
          and memory often require a monotonic rail: one that only ever rises during start-up. A dip or
          plateau partway up, often caused by a load switching on at a threshold, can upset their reset
          circuits.
        </p>
        <Figure caption={<>Three start-up shapes. The left is the target; the middle dips partway up; the right rises fast and overshoots its nominal level.</>}>
          <RampShapes />
        </Figure>
        <KeyIdea title="Measure overshoot separately">
          Overshoot at start-up is the peak above the final output, usually quoted as a percentage. A slow
          timebase can miss a short peak, so confirm it with peak detect or a second, faster capture.
        </KeyIdea>
      </section>

      <section>
        <h2 id="inrush-current" className="text-xl font-semibold mb-3">Inrush current at start-up</h2>
        <p className="text-muted leading-7">
          Charging the input capacitors draws a surge of current when power is first applied. To see it, add a
          current probe on the input lead, or a small, low-value shunt resistor in the input return with the
          scope measuring across it; keep the shunt on the ground side so the probe ground clip stays at
          circuit ground. Trigger on the same CH1 edge and the current pulse appears alongside the voltage.
          A peak far larger than expected can trip upstream protection or a bench supply&apos;s current limit,
          which in turn stretches the startup time.
        </p>
      </section>

      <section>
        <h2 id="power-sequencing" className="text-xl font-semibold mb-3">Power sequencing of multiple rails</h2>
        <p className="text-muted leading-7 mb-4">
          Boards with several rails often specify an order, for example core voltage before I/O, and sometimes
          a minimum gap between them. Put the input or enable on CH1 and each rail on its own channel, then
          trigger on CH1 as before. Read each rail&apos;s 90% point with cursors and check the order and the
          spacing against the requirement. With two channels you can still do it pairwise, one rail at a time
          against the same trigger. For what happens after start-up, see{" "}
          <Link href="/oscilloscopes/how-to-measure-a-switching-power-supply-waveform-with-an-oscilloscope" className={link}>
            how to measure a switching power supply waveform
          </Link>
          .
        </p>
        <ProductStrip
          title="Scopes in our reviews, by channel count"
          items={[
            {
              name: "Rigol DS1054Z",
              image: rigol.image,
              alt: "Rigol DS1054Z four-channel digital oscilloscope",
              href: "/oscilloscopes/rigol-ds1054z-review",
              note: "4 channels, 50MHz, 1 GSa/s: input plus three rails in one capture.",
            },
            {
              name: "Siglent SDS1104X-E",
              image: siglent.image,
              alt: "Siglent SDS1104X-E four-channel digital oscilloscope",
              href: "/oscilloscopes/siglent-sds1104x-e-review",
              note: "4 channels, 100MHz, 1 GSa/s, with a well-regarded user interface.",
            },
            {
              name: "Hantek DSO2D10",
              image: hantek.image,
              alt: "Hantek DSO2D10 two-channel oscilloscope with built-in waveform generator",
              href: "/oscilloscopes/hantek-dso2d10-review",
              note: "2 channels, 100MHz, 1 GSa/s, plus a built-in waveform generator. Enough for one rail at a time.",
            },
          ]}
        />
        <p className="text-muted leading-7 mt-6">
          Compare all four scopes we cover in the{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            best beginner oscilloscopes
          </Link>{" "}
          roundup.
        </p>
      </section>
    </HowToShell>
  );
}
