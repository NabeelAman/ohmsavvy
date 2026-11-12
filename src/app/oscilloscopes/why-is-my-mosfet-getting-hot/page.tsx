import Link from "@/components/AppLink";
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
  "Why is my MOSFET getting hot? Check gate drive, slow switching edges, Rds(on) conduction loss, ringing and the heatsink, with worked math and scope checks.";

export const metadata = buildMetadata({
  title: "Why Is My MOSFET Getting Hot? Causes and Fixes",
  description,
  path: "/oscilloscopes/why-is-my-mosfet-getting-hot",
});

const rigolDho804 = picks.find((p) => p.name === "Rigol DHO804")!;
const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;
const rigolDs1054z = picks.find((p) => p.name === "Rigol DS1054Z")!;

const link = "text-accent hover:underline";

/** Low-side MOSFET switch with gate resistor, pull-down, flyback diode and the heat path to ambient. */
function LowSideSwitchDiagram() {
  return (
    <svg
      viewBox="0 0 340 230"
      className="w-full h-auto"
      role="img"
      aria-label="Why is my MOSFET getting hot: a low-side N-channel MOSFET switching an inductive load. The gate is driven through a gate resistor with a pull-down resistor to source. A flyback diode sits across the load. Scope channel 1 measures gate to source, channel 2 measures drain to source. Heat flows from the junction through the case and heatsink to the air."
    >
      <g className="stroke-foreground" strokeWidth="1.8" fill="none" strokeLinecap="round">
        {/* supply and load */}
        <path d="M60 20 H200 V40" />
        <rect x="186" y="40" width="28" height="44" rx="3" className="fill-surface" />
        <path d="M200 84 V110" />
        {/* MOSFET */}
        <path d="M200 110 H186 M186 104 V124 M186 140 V160 M186 150 H200 V176" />
        <path d="M180 108 V156" strokeWidth="2.4" />
        <path d="M200 110 V104" />
        {/* gate */}
        <path d="M60 150 H96" />
        <rect x="96" y="144" width="30" height="12" rx="2" className="fill-surface" />
        <path d="M126 150 H174 V132 H180" />
        {/* pulldown */}
        <path d="M150 150 V170" />
        <rect x="144" y="170" width="12" height="20" rx="2" className="fill-surface" />
        <path d="M150 190 V200 H200" />
        <path d="M200 176 V210 H60" />
      </g>
      {/* flyback diode */}
      <g className="stroke-accent" strokeWidth="1.6" fill="none">
        <path d="M214 84 H240 V70 M240 54 V30 H200" />
        <path d="M232 70 H248 L240 54 Z" className="fill-accent" />
        <path d="M232 54 H248" />
      </g>
      {/* heatsink */}
      <g className="stroke-border" strokeWidth="1.4" fill="none">
        <path d="M262 112 V164 M272 112 V164 M282 112 V164 M292 112 V164 M302 112 V164" />
        <path d="M256 138 H308" />
      </g>
      <path d="M210 138 H252" className="stroke-accent" strokeWidth="1.6" strokeDasharray="4 3" />
      <g fontSize="9.5" className="fill-muted">
        <text x="60" y="14" className="fill-foreground">+12 V to +48 V</text>
        <text x="200" y="66" textAnchor="middle" className="fill-foreground">load</text>
        <text x="246" y="66">flyback</text>
        <text x="60" y="142">gate driver</text>
        <text x="111" y="170" textAnchor="middle">R gate</text>
        <text x="132" y="204" textAnchor="end">pull-down</text>
        <text x="206" y="100" className="fill-accent">CH2: Vds</text>
        <text x="100" y="128" className="fill-accent">CH1: Vgs</text>
        <text x="282" y="180" textAnchor="middle">heatsink</text>
        <text x="230" y="132" textAnchor="middle" className="fill-accent">heat</text>
        <text x="60" y="224">ground (source)</text>
      </g>
    </svg>
  );
}

export default function WhyIsMyMosfetGettingHotPage() {
  return (
    <HowToShell
      title="Why Is My MOSFET Getting Hot? Gate Drive, Switching Loss and Heatsinks"
      description={description}
      published="2026-11-13"
      path="/oscilloscopes/why-is-my-mosfet-getting-hot"
      category="oscilloscopes"
      intro={
        <>
          A MOSFET gets hot because it is turning electrical power into heat, and the usual reason is that it is
          not switching hard enough: the gate voltage is too low for the part, the switching edges are slow, or
          the current is too high for its on-resistance. Ringing, a missing flyback diode and an undersized
          heatsink make it worse. So when you ask why your MOSFET is getting hot, the fastest path is to measure
          the gate voltage, look at the edges on a scope and do the I² × Rds(on) arithmetic, which this guide
          walks through with worked numbers.
        </>
      }
      aside={{
        image: siglent.image,
        alt: "Siglent SDS1104X-E four-channel digital oscilloscope",
        caption: (
          <>
            Switching edges and gate ringing happen in nanoseconds. The Siglent SDS1104X-E offers 100MHz on four
            channels, enough to watch Vgs and Vds together. See our{" "}
            <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={link}>
              SDS1104X-E review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "where-heat-comes-from", label: "Where the heat comes from" },
        { id: "causes", label: "Symptoms, causes and fixes" },
        { id: "gate-voltage", label: "1. Measure the gate voltage" },
        { id: "conduction-loss", label: "2. Work out conduction loss" },
        { id: "switching-edges", label: "3. Look at the switching edges" },
        { id: "ringing", label: "4. Check for ringing and spikes" },
        { id: "heatsink", label: "5. Size the heatsink" },
        { id: "which-scope", label: "Which scope to use" },
      ]}
      faq={[
        {
          q: "How hot can a MOSFET get before it fails?",
          a: "Most power MOSFETs are rated for a maximum junction temperature of 150 °C or 175 °C, stated in the datasheet. The case runs cooler than the junction, so a case you cannot keep a finger on is already a warning. Aim to keep the junction well below the limit, since on-resistance rises with temperature and reliability drops quickly near the maximum.",
        },
        {
          q: "Can I drive a MOSFET directly from an Arduino pin?",
          a: "Only a logic-level MOSFET whose datasheet specifies Rds(on) at 4.5 V or lower, and only at low switching frequencies. A 5 V pin has limited current, so it charges the gate slowly and the edges are slow, adding switching loss. For PWM above a few kilohertz or currents of several amps, use a gate driver chip between the pin and the MOSFET.",
        },
        {
          q: "Why is my MOSFET hot when it is supposed to be off?",
          a: "Check the gate. With no pull-down resistor, a floating gate picks up charge and the MOSFET sits partly on, dissipating heavily. A damaged MOSFET with a leaky gate or a partial drain-to-source short does the same. Measure Vgs with the circuit commanded off; it should read close to 0 V. A 10 kΩ to 100 kΩ resistor from gate to source fixes a floating gate.",
        },
        {
          q: "Does a higher PWM frequency make a MOSFET hotter?",
          a: "Yes. Switching loss is paid once per edge, so doubling the frequency roughly doubles it, while conduction loss stays about the same. Motor and LED dimming circuits often run far higher frequencies than they need. If your MOSFET runs hot at 50 kHz and the edges are slow, dropping to 20 kHz or speeding up the gate drive can cut the heat substantially.",
        },
        {
          q: "What is the difference between Vgs(th) and the gate voltage I need?",
          a: "Vgs(th) is where the MOSFET only just starts to conduct, typically at 250 µA in the datasheet test. It is not a turn-on voltage. Rds(on) is specified at a much higher Vgs, usually 10 V for standard parts and 4.5 V or 2.5 V for logic-level parts. Drive the gate to at least the voltage the Rds(on) figure is quoted at.",
        },
        {
          q: "Can a multimeter tell me why my MOSFET is hot?",
          a: "Partly. A meter can confirm the DC gate voltage in a static on state and measure the drain-source voltage to estimate Rds(on). It cannot show switching edges, ringing or a gate that is partly on during PWM, because it averages. For PWM circuits a scope is the tool that finds the cause. A meter is still the right tool to check whether the MOSFET is already damaged.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-measure-ringing-on-a-mosfet-gate-signal-with-an-oscilloscope",
          title: "How to Measure Ringing on a MOSFET Gate Signal",
          desc: "Probe technique, ring frequency and how to damp gate ringing.",
        },
        {
          href: "/multimeters/how-to-test-a-mosfet-with-a-digital-multimeter",
          title: "How to Test a MOSFET With a Digital Multimeter",
          desc: "Body diode and gate-charge checks to find a damaged part.",
        },
        {
          href: "/oscilloscopes/how-to-measure-pwm-duty-cycle-with-an-oscilloscope",
          title: "How to Measure PWM Duty Cycle With an Oscilloscope",
          desc: "Set up the scope on the PWM signal that drives the gate.",
        },
      ]}
    >
      <Callout title="Heat, high voltage and scope grounds">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            A MOSFET case and heatsink can exceed 100 °C. Do not test temperature with a fingertip. Use a
            thermocouple or an infrared thermometer, and switch off before touching anything.
          </li>
          <li>
            A bench scope&apos;s probe ground clip is tied to mains earth. Clip it only to circuit ground. On a
            mains-powered circuit, a high-side switch or the primary of an offline supply, use differential
            probes or an isolated setup, or leave it to someone trained for it.
          </li>
          <li>
            Large bulk capacitors in motor drives and power supplies hold charge after power-off. Discharge and
            verify with a meter before reworking the board.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="where-heat-comes-from" className="text-xl font-semibold mb-3">Where MOSFET heat comes from</h2>
        <p className="text-muted leading-7 mb-4">
          A MOSFET has two loss mechanisms that matter in practice. Conduction loss happens while it is on: the
          drain current flows through the on-resistance, Rds(on), and the power is I² × Rds(on). Switching loss
          happens during each transition, when the device briefly carries current and blocks voltage at the same
          time. That overlap is short, but it repeats every cycle, so at tens of kilohertz it adds up. Both
          losses end up as heat that has to escape through the case and heatsink into the air.
        </p>
        <p className="text-muted leading-7">
          A MOSFET running hot is telling you one of those losses is larger than the design assumed, or the
          heat path is worse than assumed. The diagnostics below separate the two. Most of the time the cause is
          the gate drive, because weak gate drive raises both losses at once.
        </p>
        <Figure caption={<>A low-side MOSFET switch with the two scope channels you need (Vgs and Vds), the pull-down that keeps the gate off, the flyback diode across an inductive load, and the heat path to the heatsink.</>}>
          <LowSideSwitchDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Why is my MOSFET getting hot? Symptoms, causes and fixes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["Hot even at DC or low PWM frequency", "Gate voltage too low for the part (standard MOSFET on 3.3 V or 5 V logic)", "Meter or scope: Vgs when on", "Logic-level MOSFET, or a gate driver to 10–12 V"],
            ["Hot, and Vds when on is much higher than I × Rds(on)", "Not fully enhanced, or current higher than expected", "Measure Vds on and the load current", "Raise Vgs; pick lower Rds(on); check load current"],
            ["Heat climbs with PWM frequency", "Slow switching edges", "Scope: rise and fall time of Vds", "Stronger gate driver, smaller gate resistor, lower frequency"],
            ["Hot when it should be off", "Floating gate, no pull-down", "Vgs when commanded off", "10 kΩ–100 kΩ gate-to-source resistor"],
            ["Drain spikes far above supply on turn-off", "No flyback diode, or loop inductance", "Scope: Vds peak at turn-off", "Fit flyback diode; shorten the loop; snubber"],
            ["Bursts of ringing on gate or drain", "Layout inductance with gate capacitance", "Scope: ring amplitude and frequency", "Gate resistor, tighter layout, ferrite bead"],
            ["Losses look fine but it still runs hot", "Heatsink too small, poor contact", "Calculate temperature rise", "Larger heatsink, thermal pad or paste, airflow"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="gate-voltage">Measure the gate voltage against the datasheet</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Open the MOSFET&apos;s datasheet and find the Rds(on) line. It always states the gate voltage it was
          measured at. Standard MOSFETs are specified at Vgs = 10 V. Logic-level parts are specified at 4.5 V and
          sometimes 2.5 V as well. If the datasheet only gives Rds(on) at 10 V and your microcontroller drives the
          gate at 3.3 V, the MOSFET is barely on, even though it switches the load.
        </p>
        <p className="text-muted leading-7 mb-4">
          With power on and the output held steadily on, measure DC volts from gate to source at the MOSFET pins.
          Compare it with the Rds(on) test voltage. Do not compare it with Vgs(th), the gate threshold. Threshold
          is typically 1 to 4 V and is the point where the part passes only about 250 µA. A MOSFET held near its
          threshold is a resistor carrying load current, and it will overheat in seconds.
        </p>
        <p className="text-muted leading-7">
          While you are there, read Vds with the MOSFET on. Divide by the load current to get the real
          on-resistance. A 10 A load with 0.2 V across the MOSFET means 0.2 ÷ 10 = 20 mΩ. If you read 2 V, the
          MOSFET is at 200 mΩ and dissipating ten times more than it should. If you suspect the part is already
          damaged, pull it and run the checks in{" "}
          <Link href="/multimeters/how-to-test-a-mosfet-with-a-digital-multimeter" className={link}>
            how to test a MOSFET with a digital multimeter
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={2} id="conduction-loss">Work out the conduction loss: I² × Rds(on)</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Conduction loss is the easy one to calculate, and it often explains the heat on its own. Take a MOSFET
          rated at 20 mΩ at Vgs = 10 V, carrying 10 A at 100% duty:
        </p>
        <ul className="text-muted leading-7 mb-4 list-disc pl-5 space-y-1">
          <li>At 25 °C: P = 10² × 0.020 = 100 × 0.020 = 2.0 W.</li>
          <li>
            Rds(on) rises with temperature, typically to about 1.5 to 1.8 times its 25 °C value near 125 °C (the
            datasheet has a curve). Hot: P = 100 × 0.020 × 1.6 = 3.2 W.
          </li>
          <li>At 50% PWM duty, conduction loss scales with duty: 3.2 W × 0.5 = 1.6 W.</li>
          <li>
            The same part underdriven at a Vgs where its effective Rds(on) is 200 mΩ: P = 100 × 0.2 = 20 W. No
            small heatsink survives that.
          </li>
        </ul>
        <p className="text-muted leading-7">
          The current is squared, so it matters more than anything else. Doubling the load from 10 A to 20 A
          quadruples the conduction loss, from 2 W to 8 W at 25 °C. If your load draws more than you think (a
          stalled motor, an LED string with no current limit), the MOSFET heats up even with perfect gate drive.
          Measure the current, do not assume it.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="switching-edges">Look at the switching edges on a scope</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Put channel 1 on gate to source and channel 2 on drain to source, both probes grounded at the source
          pin for a low-side switch. Trigger on the rising edge of the gate. A healthy edge shows Vgs rising,
          pausing on a flat shelf (the Miller plateau, where the drain voltage falls), then climbing to the full
          drive level. Measure the Vds fall and rise time between the 10% and 90% points; our guide to{" "}
          <Link href="/oscilloscopes/how-to-measure-rise-time-with-oscilloscope-cursors" className={link}>
            measuring rise time with cursors
          </Link>{" "}
          shows the method.
        </p>
        <Figure
          caption={
            <>
              Illustrative gate waveforms. Left: a weak gate drive gives a slow, rounded edge, so the MOSFET spends
              a long time half-on during every transition. Right: a strong driver gives a sharp edge, with some
              overshoot and ringing to check in step 4.
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <ScopeScreen wave="square-under" cycles={2} amplitude={2.5} labels={{ left: "CH1 Vgs  slow edge", right: "5 V/div" }} />
            <ScopeScreen wave="square-ring" cycles={2} amplitude={2.5} labels={{ left: "CH1 Vgs  fast edge", right: "5 V/div" }} />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4 mb-4">
          Switching loss can be estimated with a standard approximation: P ≈ ½ × V × I × (tr + tf) × f. For a
          24 V, 10 A load switched at 20 kHz:
        </p>
        <ul className="text-muted leading-7 mb-4 list-disc pl-5 space-y-1">
          <li>With a gate driver giving 100 ns edges: ½ × 24 × 10 × 200 ns × 20,000 = 120 × 0.004 = 0.48 W.</li>
          <li>Driven from a weak logic pin with 1 µs edges: ½ × 24 × 10 × 2 µs × 20,000 = 120 × 0.04 = 4.8 W.</li>
          <li>The same weak drive at 40 kHz: 9.6 W. Frequency multiplies the problem.</li>
        </ul>
        <Figure caption={<>Total loss in the worked examples above. The first two bars are conduction only at 100% duty; the PWM bars add the hot 1.6 W conduction loss to the 20 kHz switching loss. Underdriving the gate is the single biggest heat source.</>}>
          <BarChart
            items={[
              { label: "10 A, 20 mΩ, fully on", value: 2.0, display: "2.0 W" },
              { label: "Same, Rds(on) hot (×1.6)", value: 3.2, display: "3.2 W" },
              { label: "50% PWM + fast edges", value: 2.08, display: "1.6 + 0.48 W" },
              { label: "50% PWM + slow edges", value: 6.4, display: "1.6 + 4.8 W" },
              { label: "Underdriven gate, 200 mΩ", value: 20, display: "20 W", highlight: true },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={4} id="ringing">Check for ringing and turn-off spikes</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Zoom in on the turn-off edge of Vds. With an inductive load (a motor, solenoid or relay coil) and no
          flyback diode, the drain voltage shoots far above the supply until the MOSFET&apos;s body breaks down in
          avalanche, which dumps the coil&apos;s stored energy into the MOSFET as heat on every cycle. A properly
          placed flyback diode clamps that spike to about one diode drop above the supply rail.
        </p>
        <p className="text-muted leading-7">
          Ringing on the gate is a separate issue. Stray inductance in the gate loop resonates with the gate
          capacitance, and if the ring dips back through the threshold the MOSFET partly turns on again, adding
          loss. If it overshoots the gate&apos;s maximum rating, often ±20 V, it damages the oxide. The method for
          measuring and damping it, including the ground-spring probe trick, is in our guide to{" "}
          <Link href="/oscilloscopes/how-to-measure-ringing-on-a-mosfet-gate-signal-with-an-oscilloscope" className={link}>
            measuring ringing on a MOSFET gate signal
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={5} id="heatsink">Check the heatsink with a thermal calculation</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Once you know the power, the temperature rise is power × thermal resistance. The datasheet gives
          junction-to-case (RθJC) and junction-to-ambient with no heatsink (RθJA). For a typical TO-220 part, RθJA
          is often around 60 °C/W. At 2 W with no heatsink, that is 2 × 60 = 120 °C above ambient, so 145 °C at a
          25 °C room: right at the limit.
        </p>
        <DataTable
          head={["Thermal path (TO-220, illustrative)", "Total °C/W", "Rise at 2 W", "Junction at 25 °C ambient"]}
          rows={[
            ["No heatsink (RθJA ≈ 60)", "60", "120 °C", "≈ 145 °C"],
            ["Small clip-on sink ≈ 20 °C/W + 1.5 case/pad", "21.5", "43 °C", "≈ 68 °C"],
            ["Finned sink ≈ 5 °C/W + 1.5 case/pad", "6.5", "13 °C", "≈ 38 °C"],
          ]}
          mono={[1, 2, 3]}
        />
        <p className="text-muted leading-7 mt-4 mb-4">
          The case/pad figure combines a typical RθJC of about 1 °C/W with about 0.5 °C/W for a thin thermal pad
          or paste; use the numbers from your datasheet and heatsink spec. A dry, uneven mount or an insulating
          pad that is too thick can easily add a few °C/W. Also check the PCB: a surface-mount MOSFET depends on
          copper area for cooling, and a small pad turns a 1 W loss into a hot spot.
        </p>
        <KeyIdea title="Fix the loss before you add aluminum">
          A bigger heatsink treats the symptom. If the gate voltage is below the Rds(on) test voltage, or the
          edges take a microsecond, fixing the drive can cut the heat by a factor of five or ten. Size the
          heatsink for the loss that remains after the drive is right.
        </KeyIdea>
      </section>

      <section>
        <h2 id="which-scope" className="text-xl font-semibold mb-3">Which oscilloscope to use for MOSFET switching</h2>
        <p className="text-muted leading-7 mb-6">
          You need at least two channels (Vgs and Vds together), and enough bandwidth to see edges in the tens of
          nanoseconds. Four channels let you add the PWM input and a current probe. For the bandwidth reasoning,
          read{" "}
          <Link href="/oscilloscopes/oscilloscope-bandwidth-for-switching-power-supplies" className={link}>
            oscilloscope bandwidth for switching power supplies
          </Link>
          , or compare models in our{" "}
          <Link href="/oscilloscopes/best-oscilloscopes-for-power-supply-testing" className={link}>
            best oscilloscopes for power supply testing
          </Link>
          .
        </p>
        <ProductStrip
          title="Scopes in our reviews"
          items={[
            {
              name: "Siglent SDS1104X-E",
              image: siglent.image,
              alt: "Siglent SDS1104X-E four-channel digital oscilloscope",
              href: "/oscilloscopes/siglent-sds1104x-e-review",
              note: "100MHz, 4 channels, 1 GSa/s. The most bandwidth here for fast MOSFET edges and gate ringing.",
            },
            {
              name: "Rigol DHO804",
              image: rigolDho804.image,
              alt: "Rigol DHO804 12-bit four-channel oscilloscope",
              href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e",
              note: "70 MHz, 4 channels and 12-bit vertical resolution, useful for seeing the Miller plateau and small Vds detail.",
            },
            {
              name: "Rigol DS1054Z",
              image: rigolDs1054z.image,
              alt: "Rigol DS1054Z four-channel digital oscilloscope",
              href: "/oscilloscopes/rigol-ds1054z-review",
              note: "50MHz, 4 channels, 1 GSa/s. Enough for gate drive at typical PWM frequencies on a tighter budget.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
