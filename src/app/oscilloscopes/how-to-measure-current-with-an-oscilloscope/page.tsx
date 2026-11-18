import Link from "@/components/AppLink";
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
  "How to measure current with an oscilloscope: use a low-side shunt resistor and Ohm's law, or a current probe, and avoid the ground-clip short that ruins it.";

export const metadata = buildMetadata({
  title: "How to Measure Current With an Oscilloscope",
  description,
  path: "/oscilloscopes/how-to-measure-current-with-an-oscilloscope",
});

const fnirsi = picks.find((p) => p.name === "FNIRSI 2C53T")!;
const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;
const s1202 = picks.find((p) => p.name === "Siglent SDS1202X-E")!;

const link = "text-accent hover:underline";

/** Low-side shunt: supply, load, shunt to ground, probe across the shunt with ground clip on the ground end. */
function LowSideShuntDiagram() {
  return (
    <svg
      viewBox="0 0 360 210"
      className="w-full h-auto"
      role="img"
      aria-label="Low-side current shunt wiring for an oscilloscope. A DC supply on the left feeds a load. The return from the load passes through a small shunt resistor to ground. The oscilloscope probe tip touches the top of the shunt and the ground clip touches the grounded bottom end, so the scope reads the shunt voltage, which equals current times shunt resistance. A warning mark shows that clipping the ground lead to the high side of the circuit would short it through the scope's earth."
    >
      {/* supply */}
      <rect x="20" y="70" width="60" height="70" rx="6" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <text x="50" y="100" textAnchor="middle" fontSize="10" fontWeight="700" className="fill-foreground">DC</text>
      <text x="50" y="114" textAnchor="middle" fontSize="9" className="fill-muted">supply</text>
      <text x="74" y="66" fontSize="10" className="fill-foreground">+</text>
      {/* top wire to load */}
      <line x1="80" y1="80" x2="180" y2="80" className="stroke-foreground" strokeWidth="1.6" />
      <line x1="180" y1="80" x2="180" y2="40" className="stroke-foreground" strokeWidth="1.6" />
      <line x1="180" y1="40" x2="250" y2="40" className="stroke-foreground" strokeWidth="1.6" />
      <rect x="250" y="25" width="70" height="30" rx="4" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <text x="285" y="44" textAnchor="middle" fontSize="10" fontWeight="700" className="fill-foreground">LOAD</text>
      <line x1="320" y1="40" x2="340" y2="40" className="stroke-foreground" strokeWidth="1.6" />
      <line x1="340" y1="40" x2="340" y2="110" className="stroke-foreground" strokeWidth="1.6" />
      {/* shunt */}
      <rect x="330" y="110" width="20" height="40" className="fill-accent" opacity="0.45" />
      <text x="326" y="134" textAnchor="end" fontSize="10" fontWeight="700" className="fill-foreground">shunt</text>
      <line x1="340" y1="150" x2="340" y2="180" className="stroke-foreground" strokeWidth="1.6" />
      {/* ground return */}
      <line x1="340" y1="180" x2="50" y2="180" className="stroke-foreground" strokeWidth="1.6" />
      <line x1="50" y1="180" x2="50" y2="140" className="stroke-foreground" strokeWidth="1.6" />
      <line x1="190" y1="180" x2="190" y2="190" className="stroke-foreground" strokeWidth="1.6" />
      <line x1="178" y1="190" x2="202" y2="190" className="stroke-foreground" strokeWidth="1.6" />
      <line x1="183" y1="195" x2="197" y2="195" className="stroke-foreground" strokeWidth="1.6" />
      {/* probe */}
      <circle cx="340" cy="108" r="4" className="fill-accent" />
      <text x="300" y="98" fontSize="9" className="fill-accent">probe tip</text>
      <circle cx="340" cy="178" r="4" className="fill-accent" />
      <text x="292" y="172" fontSize="9" className="fill-accent">ground clip</text>
      {/* warning */}
      <text x="110" y="60" fontSize="9" className="fill-muted">never clip ground here</text>
      <line x1="140" y1="64" x2="140" y2="78" className="stroke-foreground" strokeWidth="1.2" strokeDasharray="3 2" />
      <text x="190" y="206" textAnchor="middle" fontSize="9" className="fill-muted">I = V(shunt) ÷ R(shunt)</text>
    </svg>
  );
}

export default function HowToMeasureCurrentWithAnOscilloscopePage() {
  return (
    <HowToShell
      title="How to Measure Current With an Oscilloscope"
      description={description}
      published="2026-11-18"
      path="/oscilloscopes/how-to-measure-current-with-an-oscilloscope"
      category="oscilloscopes"
      intro={
        <>
          An oscilloscope only measures voltage, so to measure current you either pass the current through a small
          known shunt resistor and read the voltage across it (I = V ÷ R), or you clamp a current probe around the
          wire, which converts current into a voltage the scope can display. With a 0.1 Ω shunt, every 100 mV on the
          screen is 1 A. This guide covers choosing the shunt, wiring it on the low side so the scope&apos;s ground
          clip can&apos;t short anything, scaling the channel to read amps, and when a current probe is the better
          tool.
        </>
      }
      aside={{
        image: siglent.image,
        alt: "Siglent SDS1104X-E four-channel benchtop digital oscilloscope",
        caption: (
          <>
            A four-channel scope such as the Siglent SDS1104X-E can show voltage and shunt current side by side. See our{" "}
            <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={link}>
              Siglent SDS1104X-E review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "two-ways", label: "Shunt or current probe" },
        { id: "problems", label: "Problems and fixes" },
        { id: "choose-shunt", label: "1. Choose the shunt" },
        { id: "low-side", label: "2. Wire it on the low side" },
        { id: "probe-setup", label: "3. Set the probe and channel" },
        { id: "scale", label: "4. Scale the reading to amps" },
        { id: "capture", label: "5. Capture and measure" },
        { id: "high-side", label: "High-side and mains current" },
        { id: "tools", label: "Scopes to use" },
      ]}
      faq={[
        {
          q: "Can an oscilloscope measure current directly?",
          a: "No. A scope input measures voltage, so current has to be converted first. A shunt resistor does it with Ohm's law, and a current probe does it with a magnetic sensor around the wire. Many scopes let you set the channel unit to amps and enter a scale factor, so the screen reads current directly once the conversion is set up.",
        },
        {
          q: "How do I measure inrush current with an oscilloscope?",
          a: "Put a low-side shunt or a DC-capable current probe in the supply return, set the scope to single-shot capture, and trigger on a rising edge just above the normal running current. Switch the device on and the scope freezes the surge. Read the peak with a cursor and divide by the shunt resistance. On mains-powered equipment, use a rated current probe rather than a shunt.",
        },
        {
          q: "What size shunt resistor should I use with an oscilloscope?",
          a: "Choose one that gives roughly 10 to 100 mV at the highest current you expect. That is large enough to read above noise and small enough not to disturb the circuit. For 1 A, 0.1 Ω gives 100 mV and dissipates 0.1 W. For 10 A, 0.01 Ω gives 100 mV and 1 W. Use a non-inductive, low-tolerance part rated well above that power.",
        },
        {
          q: "Why should I use a 1x probe setting for a current shunt?",
          a: "A 10x probe divides the signal by ten, so a 20 mV shunt signal arrives as 2 mV, close to the scope's noise floor. A 1x setting keeps the full signal. The trade-off is bandwidth: 1x probes are usually limited to a few megahertz, which is fine for most power and motor current but not for very fast edges.",
        },
        {
          q: "Can I measure AC mains current with an oscilloscope?",
          a: "Not with a shunt and an ordinary probe; the shunt sits at mains potential and the scope's ground clip is tied to earth. Use a current probe or clamp rated for the voltage category, which is isolated from the conductor, or a properly rated differential probe. If you are unsure, measure mains current with a clamp meter instead and leave the waveform to a qualified technician.",
        },
        {
          q: "What is the difference between a Hall-effect current probe and a current transformer?",
          a: "A Hall-effect probe senses the magnetic field directly, so it measures DC and AC and needs a battery or power supply. A current transformer measures only AC, because it relies on a changing field, but needs no power. For battery, motor startup and DC power supply work, choose a DC-capable Hall-effect probe.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-shunt-resistor-with-a-multimeter",
          title: "How to Test a Shunt Resistor With a Multimeter",
          desc: "Confirm the shunt's real resistance before you trust the scope reading.",
        },
        {
          href: "/oscilloscopes/how-to-use-oscilloscope-math-functions-to-subtract-two-signals",
          title: "How to Use Oscilloscope Math to Subtract Two Signals",
          desc: "The two-channel method for a high-side shunt.",
        },
      ]}
    >
      <Callout title="The ground clip is the hazard">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            On a mains-powered bench scope, every probe ground clip is connected to protective earth through the power
            cord. Clipping it to any point that isn&apos;t at ground potential creates a short circuit through the
            scope, which can melt the lead, damage the circuit and the scope, and cause injury.
          </li>
          <li>
            Never defeat the scope&apos;s earth connection with a cheater plug to &quot;float&quot; it. That puts the
            whole chassis at circuit voltage.
          </li>
          <li>
            Don&apos;t put shunts into mains wiring. For mains current use an isolated current probe or a clamp meter
            rated for the job, and leave live mains work to a qualified electrician.
          </li>
          <li>Shunts carrying several amps get hot. Use a part rated for the power and keep fingers off it.</li>
        </ul>
      </Callout>

      <section>
        <h2 id="two-ways" className="text-xl font-semibold mb-3">Shunt or current probe: the two ways to see current</h2>
        <p className="text-muted leading-7 mb-4">
          A shunt is the cheap, accurate route for low-voltage DC circuits: a small, precise resistor in series with
          the load, and Ohm&apos;s law. A current probe clamps around the wire without breaking it, is isolated from
          the conductor, and is the safe choice for higher voltages, but it costs more and has its own offset and
          bandwidth limits. A multimeter tells you the average current; the scope shows how it changes, such as the
          startup surge of a motor or the pulses drawn by a switching regulator.
        </p>
        <DataTable
          head={["Method", "Measures", "Strengths", "Limits"]}
          rows={[
            ["Low-side shunt + probe", "DC and AC", "Cheap, accurate, wide bandwidth", "Breaks the circuit; ground-referenced only"],
            ["Two-channel math (CH1 − CH2)", "DC and AC", "Allows a high-side shunt", "Poor rejection of large common-mode voltage"],
            ["Hall-effect current probe", "DC and AC", "No circuit break, isolated", "Needs zeroing; costlier; bandwidth limit"],
            ["Current transformer", "AC only", "Isolated, no power needed", "Cannot see DC or slow changes"],
          ]}
        />
      </section>

      <section>
        <h2 id="problems" className="text-xl font-semibold mb-3">Problems and fixes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["Circuit shuts down when the ground clip goes on", "Ground clip on a non-ground node", "Where is the clip?", "Move the shunt to the low side"],
            ["Trace buried in noise", "Shunt voltage too small, 10x probe", "Signal is under a few mV?", "1x setting, larger shunt, averaging"],
            ["Reading 10x too high or low", "Probe factor or unit scale wrong", "Probe menu vs probe switch", "Match probe setting; set A/V scale"],
            ["Spikes on every edge", "Shunt inductance or long ground lead", "Wire-wound shunt? Long lead?", "Non-inductive shunt; ground spring"],
            ["Load behaves differently with the shunt", "Shunt drop too large", "Shunt voltage at max current", "Smaller shunt value"],
            ["Current probe reads with nothing flowing", "Hall probe offset", "Reading with the jaw empty", "Zero (degauss) the probe before use"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="choose-shunt">Choose the shunt</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Aim for roughly 10 to 100 mV across the shunt at the highest current you expect. Below that, scope noise
          swamps the signal; above it, the shunt steals voltage from the load and gets hot. Power is I² × R, so pick a
          shunt rated at least twice the worst-case figure. The table works the arithmetic for common values.
        </p>
        <DataTable
          head={["Max current", "Shunt", "Voltage across it (I × R)", "Power (I² × R)"]}
          rows={[
            ["100 mA", "1 Ω", "100 mV", "10 mW"],
            ["1 A", "0.1 Ω", "100 mV", "0.1 W"],
            ["5 A", "0.02 Ω", "100 mV", "0.5 W"],
            ["10 A", "0.01 Ω", "100 mV", "1 W"],
            ["30 A", "0.001 Ω", "30 mV", "0.9 W"],
          ]}
        />
        <Figure caption={<>Power dissipated in the shunt at full current, from the table above (P = I² × R). Size the shunt&apos;s rating well above these figures.</>}>
          <BarChart
            items={[
              { label: "100 mA in 1 Ω", value: 0.01, display: "0.01 W" },
              { label: "1 A in 0.1 Ω", value: 0.1, display: "0.1 W" },
              { label: "5 A in 0.02 Ω", value: 0.5, display: "0.5 W" },
              { label: "10 A in 0.01 Ω", value: 1, display: "1 W", highlight: true },
              { label: "30 A in 0.001 Ω", value: 0.9, display: "0.9 W" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Use a metal-element or thick-film current-sense resistor, not a wire-wound one: wire-wound resistors have
          inductance that adds false spikes on fast current edges. Check the shunt&apos;s real value before trusting
          it; our guide to{" "}
          <Link href="/multimeters/how-to-test-a-shunt-resistor-with-a-multimeter" className={link}>
            testing a shunt resistor with a multimeter
          </Link>{" "}
          explains how to measure milliohms.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="low-side">Wire the shunt on the low side</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Put the shunt in the ground return, between the load&apos;s negative and the supply&apos;s negative. One
          end of the shunt is then at ground, so the probe&apos;s ground clip goes on that end and the tip goes on
          the other. Nothing gets shorted through the scope&apos;s earth. This is the single most important step: on
          the high side, between the positive supply and the load, the ground clip would connect the positive rail
          to earth.
        </p>
        <Figure caption={<>Low-side shunt wiring: the ground clip sits on the end of the shunt that is already at ground.</>}>
          <LowSideShuntDiagram />
        </Figure>
      </section>

      <section>
        <StepHeading n={3} id="probe-setup">Set the probe and the channel</StepHeading>
        <p className="text-muted leading-7">
          For small shunt voltages, switch the probe to 1x and set the channel&apos;s probe factor to match, so you
          get the full signal rather than a tenth of it. Use DC coupling so the average current shows as a level, not
          just the changes. If the current has fast edges, use the probe&apos;s short ground spring instead of the
          long clip lead, which picks up noise. Turn on the 20 MHz bandwidth limit if you only care about power-level
          changes; it cleans up the trace considerably. Our guide to{" "}
          <Link href="/oscilloscopes/how-to-measure-noise-floor-with-an-oscilloscope" className={link}>
            measuring the noise floor
          </Link>{" "}
          shows how small a signal your scope can resolve.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="scale">Scale the reading to amps</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Divide the voltage by the shunt resistance. With a 0.1 Ω shunt, 1 mV is 10 mA and 100 mV is 1 A. Many scopes
          let you change the channel unit from V to A and enter a probe ratio, so the screen and the automatic
          measurements read amps directly. For a 0.1 Ω shunt the ratio is 10 A per volt; check your scope&apos;s
          manual for how it labels this setting. Write the scale on a label next to the shunt so you don&apos;t
          misread it later.
        </p>
        <DataTable
          head={["Shunt", "1 mV on screen means", "Scale factor"]}
          rows={[
            ["1 Ω", "1 mA", "1 A/V"],
            ["0.1 Ω", "10 mA", "10 A/V"],
            ["0.01 Ω", "100 mA", "100 A/V"],
            ["0.001 Ω", "1 A", "1,000 A/V"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={5} id="capture">Capture and measure the current</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Trigger on a rising edge of the shunt channel at a level just above the normal current. For a repeating
          load such as a PWM motor, use normal trigger mode and read peak, average and RMS with the automatic
          measurements. For a one-off event such as the inrush when a device switches on, use single-shot mode and
          read the peak with a cursor. Put the supply voltage on a second channel to see how far it sags during the
          surge.
        </p>
        <Figure caption={<>Illustrative trace: a 0.1 Ω shunt at 50 mV/div showing current pulses from a switched load. Three divisions is 150 mV, or 1.5 A peak.</>}>
          <ScopeScreen
            wave="pulse"
            cycles={3}
            amplitude={1.5}
            offset={-1}
            labels={{ left: "CH1 50 mV/div  1x  DC", right: "200 µs/div" }}
            marks={[{ x1: 0.3, y1: 6.5, x2: 0.3, y2: 3.5, text: "150 mV = 1.5 A" }]}
          />
        </Figure>
        <Figure caption={<>Measuring current with an oscilloscope, in order.</>}>
          <FlowDiagram
            steps={[
              { label: "Shunt", sub: "10–100 mV at max" },
              { label: "Low side", sub: "Clip on ground end" },
              { label: "1x, DC", sub: "Probe factor matched" },
              { label: "Scale", sub: "A = V ÷ R" },
              { label: "Capture", sub: "Peak, average, RMS" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="high-side" className="text-xl font-semibold mb-3">High-side shunts and mains current</h2>
        <p className="text-muted leading-7 mb-4">
          Sometimes the shunt must sit in the positive lead, for example when the load&apos;s negative is bolted to a
          chassis. Then put CH1 on one end of the shunt and CH2 on the other, both with ground clips on circuit
          ground, and display CH1 − CH2 with the math function. It works for modest supply voltages, but the two
          channels each see the full rail, so small gain differences between them show up as error. Use the same
          probes, the same V/div on both, and compensate both probes first. Our guides to{" "}
          <Link href="/oscilloscopes/how-to-measure-a-differential-signal-with-a-two-channel-oscilloscope" className={link}>
            measuring a differential signal with two channels
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/how-to-compensate-an-oscilloscope-probe" className={link}>
            compensating a probe
          </Link>{" "}
          cover both steps.
        </p>
        <p className="text-muted leading-7">
          For mains-powered loads, a shunt is the wrong tool. Use an isolated current probe rated for the voltage
          category, or simply read the RMS current with a clamp meter; see{" "}
          <Link href="/multimeters/how-to-measure-ac-current-with-a-clamp-meter" className={link}>
            how to measure AC current with a clamp meter
          </Link>
          . To catch the moment a supply misbehaves under a current surge, our guide to{" "}
          <Link href="/oscilloscopes/how-to-capture-a-power-supply-transient-with-an-oscilloscope" className={link}>
            capturing a power supply transient
          </Link>{" "}
          pairs well with this one.
        </p>
        <KeyIdea title="Turn current into voltage, safely">
          A scope only sees voltage. A shunt in the ground return turns current into a few tens of millivolts with
          the ground clip on a point that is already grounded. Divide by the shunt value and the trace is in amps.
        </KeyIdea>
      </section>

      <section>
        <h2 id="tools" className="text-xl font-semibold mb-3">Scopes to use for current measurements</h2>
        <p className="text-muted leading-7 mb-6">
          Two channels are the minimum, so you can see voltage and current together; four channels let you watch
          supply, current and control signals at once. Fine vertical sensitivity matters for small shunt voltages.
          Compare more models in our{" "}
          <Link href="/oscilloscopes/best-oscilloscopes-for-power-supply-testing" className={link}>
            best oscilloscopes for power supply testing
          </Link>
          .
        </p>
        <ProductStrip
          title="Oscilloscopes for shunt and current probe work"
          items={[
            {
              name: "FNIRSI 2C53T",
              image: fnirsi.image,
              alt: "FNIRSI 2C53T handheld oscilloscope, multimeter and signal generator",
              href: "/oscilloscopes/owon-hds272s-vs-fnirsi-2c53t",
              note: "50MHz, two channels, a 19,999-count True RMS meter and a basic generator to 50 kHz in one handheld.",
            },
            {
              name: "Siglent SDS1104X-E",
              image: siglent.image,
              alt: "Siglent SDS1104X-E four-channel benchtop digital oscilloscope",
              href: "/oscilloscopes/siglent-sds1104x-e-review",
              note: "100MHz, 4 channels, 1 GSa/s: more bandwidth headroom than entry-level scopes.",
            },
            {
              name: "Siglent SDS1202X-E",
              image: s1202.image,
              alt: "Siglent SDS1202X-E two-channel 200MHz benchtop digital oscilloscope",
              href: "/oscilloscopes/siglent-sds1104x-e-vs-siglent-sds1202x-e",
              note: "200MHz on two channels, 1 GSa/s on one channel and 100,000 waveforms per second (Siglent spec).",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
