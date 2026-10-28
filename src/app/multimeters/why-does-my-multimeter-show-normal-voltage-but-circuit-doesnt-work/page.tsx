import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  KeyIdea,
  MeterReadout,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const description =
  "Multimeter shows normal voltage but the circuit doesn't work? Causes: no-load readings, corroded joints, bad grounds, weak supplies, ripple and control signals.";

export const metadata = buildMetadata({
  title: "Normal Voltage but Circuit Doesn't Work? Why",
  description,
  path: "/multimeters/why-does-my-multimeter-show-normal-voltage-but-circuit-doesnt-work",
});

const all = getAllPicks("multimeters");
const fluke87v = all.find((p) => p.name === "Fluke 87V")!;
const fluke88v = all.find((p) => p.name === "Fluke 88V")!;
const ht118a = all.find((p) => p.name === "KAIWEETS HT118A")!;

const link = "text-accent hover:underline";

/** One row of the diagram: battery, corroded joint, load terminals and a voltmeter across them. */
function Row({ oy, loaded }: { oy: number; loaded: boolean }) {
  return (
    <g>
      <text x="8" y={oy + 12} fontSize="11" fontWeight="600" className="fill-foreground">
        {loaded ? "Load connected and running" : "Load disconnected (open circuit)"}
      </text>
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        <line x1="40" y1={oy + 30} x2="40" y2={oy + 60} />
        <line x1="40" y1={oy + 70} x2="40" y2={oy + 100} />
        <line x1="40" y1={oy + 30} x2="110" y2={oy + 30} />
        <line x1="160" y1={oy + 30} x2="250" y2={oy + 30} />
        <line x1="40" y1={oy + 100} x2="250" y2={oy + 100} />
        {loaded && (
          <>
            <line x1="250" y1={oy + 30} x2="250" y2={oy + 45} />
            <rect x="240" y={oy + 45} width="20" height="40" rx="2" className="fill-surface" />
            <line x1="250" y1={oy + 85} x2="250" y2={oy + 100} />
          </>
        )}
      </g>
      <line x1="28" y1={oy + 60} x2="52" y2={oy + 60} className="stroke-foreground" strokeWidth="2.4" />
      <line x1="33" y1={oy + 70} x2="47" y2={oy + 70} className="stroke-foreground" strokeWidth="2.4" />
      <rect x="110" y={oy + 22} width="50" height="16" rx="3" className="fill-accent/20 stroke-accent" strokeWidth="1.6" />
      <circle cx="250" cy={oy + 30} r="3" className="fill-foreground" />
      <circle cx="250" cy={oy + 100} r="3" className="fill-foreground" />
      <g className="stroke-accent" strokeWidth="1.6" fill="none" strokeDasharray="4 3">
        <path d={`M250 ${oy + 30} H300 V${oy + 47}`} />
        <path d={`M300 ${oy + 83} V${oy + 100} H250`} />
      </g>
      <circle cx="300" cy={oy + 65} r="18" className="fill-surface stroke-accent" strokeWidth="2" />
      <g fontSize="10" className="fill-foreground">
        <text x="300" y={oy + 69} fontSize="12" fontWeight="700" textAnchor="middle" className="fill-accent">V</text>
        <text x="58" y={oy + 69}>12 V</text>
        <text x="135" y={oy + 52} textAnchor="middle">1 Ω joint</text>
        <text x="135" y={oy + 64} textAnchor="middle" className="fill-accent">
          {loaded ? "drops 1.71 V" : "drops ≈ 0 V"}
        </text>
        <text x="205" y={oy + 25} textAnchor="middle" className="fill-muted">
          {loaded ? "1.71 A" : "≈ 1 µA"}
        </text>
        {loaded && (
          <text x="234" y={oy + 69} textAnchor="end">6 Ω load</text>
        )}
        <text x="300" y={oy + 120} textAnchor="middle" className="fill-accent">
          {loaded ? "reads 10.29 V" : "reads 12.00 V"}
        </text>
      </g>
    </g>
  );
}

function LoadedVsUnloadedDiagram() {
  return (
    <svg
      viewBox="0 0 340 262"
      className="w-full h-auto"
      role="img"
      aria-label="Two circuit diagrams of a 12 volt battery feeding load terminals through a 1 ohm corroded joint, with a voltmeter across the terminals. With the load disconnected only about 1 microamp flows, the joint drops almost nothing and the meter reads 12.00 volts. With a 6 ohm load connected, 1.71 amps flows, the joint drops 1.71 volts and the meter reads 10.29 volts"
    >
      <Row oy={0} loaded={false} />
      <line x1="8" y1="130" x2="332" y2="130" className="stroke-border" strokeWidth="1" strokeDasharray="3 3" />
      <Row oy={136} loaded />
    </svg>
  );
}

export default function NormalVoltageButCircuitDoesntWorkPage() {
  return (
    <HowToShell
      title="Why Does My Multimeter Show a Normal Voltage but My Circuit Still Doesn't Work?"
      description={description}
      path="/multimeters/why-does-my-multimeter-show-normal-voltage-but-circuit-doesnt-work"
      category="multimeters"
      published="2026-10-26"
      updated="2026-10-29"
      intro={
        <>
          Your multimeter shows a normal voltage because a voltmeter draws almost no current, so it can read
          the full supply voltage through a corroded joint, a loose crimp or a weak battery that collapses the
          moment the circuit tries to draw real current. Measure again with the circuit switched on and
          working, directly at the load&apos;s own terminals, and the missing volts usually show up; if they
          don&apos;t, the fault is in a control signal, ripple on the supply or the load itself.
        </>
      }
      aside={{
        image: fluke87v.image,
        alt: "Fluke 87V True RMS multimeter used for measuring voltage under load",
        caption: (
          <>
            An analog bar graph makes a voltage that sags under load easy to watch. See our{" "}
            <Link href="/multimeters/fluke-87v-review" className={link}>
              Fluke 87V review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "why-meter-misses-it", label: "Why the meter can't see the fault" },
        { id: "causes", label: "Causes at a glance" },
        { id: "worked-example", label: "Worked example: one corroded joint" },
        { id: "device-wont-work", label: "Shows voltage, device won't work" },
        { id: "measure-under-load", label: "1. Measure under load" },
        { id: "at-the-load", label: "2. Measure at the load's terminals" },
        { id: "positive-side", label: "3. Split the drop: positive side" },
        { id: "ground-side", label: "4. Check the ground side" },
        { id: "source", label: "5. Check the source under load" },
        { id: "intermittent", label: "6. Catch intermittent dropouts" },
        { id: "signals-and-ripple", label: "7. Signals, enable lines and ripple" },
        { id: "the-load", label: "8. Suspect the load itself" },
        { id: "meters", label: "Meters that help" },
      ]}
      faq={[
        {
          q: "Why does my multimeter show voltage but the device won't work?",
          a: "A meter reading proves a voltage is present, not that the path can deliver current. The usual causes are coupled voltage on a dead wire, a high-resistance connection, a source that sags under load, an open ground or neutral, or a fault inside the device. Re-measure at the device's own terminals while it is switched on, or use LoZ, and the cause usually shows.",
        },
        {
          q: "Why does my outlet show 120 volts but nothing works when I plug it in?",
          a: "Most often a loose or burnt connection, frequently a back-stabbed terminal at that outlet or one upstream, passes the meter's tiny current but not the appliance's. An open neutral can also show 120 V hot to ground while hot to neutral fails under load. Measure all three pairs with a lamp plugged in, and call an electrician if the voltage collapses.",
        },
        {
          q: "Why does my battery read 12.6 volts but nothing works when I turn it on?",
          a: "A resting reading only proves the battery has surface voltage, not that it can deliver current. A sulfated or damaged battery, or a corroded terminal clamp, can show about 12.6 V with no load and then drop several volts the instant a load turns on. Measure across the battery posts and then across the clamps while the load is running. A big difference between the two points to the clamp.",
        },
        {
          q: "Can a multimeter tell me if a wire is bad when the voltage looks fine?",
          a: "Yes, but only if current is flowing. Put one probe at each end of the wire or connection with the circuit switched on and working, and read the voltage across it. A good short wire shows only millivolts, while a broken strand, corroded crimp or loose terminal shows a noticeable drop. With the circuit off, the same bad wire reads zero because there's no current to create a drop.",
        },
        {
          q: "Why does voltage drop when I connect a load?",
          a: "Every source and every wire has some resistance, and current through resistance always costs voltage (V = I × R). With a healthy supply and good wiring the loss is small. When the source is weak, the wire is too thin or a joint is corroded, the resistance is higher, so the voltage at the load falls further as current rises. That's why loaded readings reveal faults that open-circuit readings hide.",
        },
        {
          q: "Should I measure voltage with the circuit on or off?",
          a: "To diagnose a circuit that doesn't work, measure with it powered and trying to run, because faults like bad connections and weak supplies only appear under current. Use the voltage function with the leads in the COM and V jacks, keep clear of moving parts, and follow the safety rules for the voltage involved. Resistance and continuity tests are the ones that need the power off.",
        },
        {
          q: "What does a bad ground look like on a multimeter?",
          a: "Measure from the load's ground terminal to the source's negative terminal with the circuit running. A good ground reads close to zero, usually a few tens of millivolts at modest currents. A corroded or loose ground shows a larger reading that rises with current, and the load sees that much less voltage. Measured to chassis with the circuit off, the same ground looks perfectly normal.",
        },
        {
          q: "Can a power supply show the right voltage and still be bad?",
          a: "Yes. A supply can hold its rated voltage with nothing connected and then sag, shut down or fold back when the load draws current, especially if it's undersized, current-limited or has aging filter capacitors. It can also carry ripple that a DC reading averages away. Test it under a realistic load and check the AC voltage on the DC output, or look at it with an oscilloscope.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-check-voltage-drop-on-a-car",
          title: "How to Check Voltage Drop on a Car",
          desc: "The section-by-section voltage-drop test applied to starter, ground and charging cables.",
        },
        {
          href: "/multimeters/how-to-check-a-12v-power-supply-under-load",
          title: "How to Check a 12V Power Supply Under Load",
          desc: "Load a supply properly and see whether it holds its voltage.",
        },
        {
          href: "/multimeters/how-to-find-an-intermittent-electrical-fault-with-a-multimeter",
          title: "How to Find an Intermittent Electrical Fault",
          desc: "Min/Max recording, wiggle tests and half-splitting a harness.",
        },
        {
          href: "/multimeters/why-does-my-multimeter-read-0-volts-on-a-working-circuit",
          title: "Why Does My Multimeter Read 0 Volts on a Working Circuit?",
          desc: "The opposite problem: a working circuit that reads nothing.",
        },
      ]}
    >
      <Callout title="Safety: live circuits and batteries">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Loaded tests mean measuring a powered circuit. Use a meter and leads rated for the voltage (CAT III 600V
            or better on household branch circuits), keep the red lead in the V jack, and never leave it in an amps
            jack across a supply.
          </li>
          <li>
            A car or deep-cycle battery can deliver hundreds of amps into a short. Remove rings and watches, and keep
            tools and probe tips from bridging the terminals or touching chassis.
          </li>
          <li>
            Don&apos;t open mains-powered supplies or fixed wiring to chase a sag: capacitors inside can hold a
            dangerous charge after unplugging. Call a licensed electrician for building wiring, and 911 if anything
            is smoking or burning.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="why-meter-misses-it" className="text-xl font-semibold mb-3">
          Why the meter can&apos;t see the fault
        </h2>
        <p className="text-muted leading-7 mb-4">
          On its DC voltage function, a typical digital multimeter has an input impedance of around 10 MΩ. Across
          a 12 V source that lets through only about 1.2 µA (12 V ÷ 10,000,000 Ω). Voltage is lost across a
          resistance only in proportion to the current through it, so with 1.2 µA flowing even a badly corroded
          1 Ω joint drops about 1.2 µV, far below anything the display shows. A connection that has degraded to
          1,000 Ω still drops only about 1.2 mV. The meter honestly reports 12.00 V, and the reading tells you the
          source is there, not that it can push current through the path to the load.
        </p>
        <p className="text-muted leading-7">
          That is the whole trick behind this symptom. A voltage reading taken with nothing drawing current, or
          taken upstream of the bad spot, proves very little about a power path. A real load can draw amps
          instead of microamps, which is a million times more current, and every bit of hidden resistance
          suddenly costs volts. The fix is to make the circuit draw its normal current while you measure. This is
          different from the meter loading a high-impedance circuit, which is covered in{" "}
          <Link href="/multimeters/why-does-my-multimeter-show-the-wrong-voltage" className={link}>
            why a multimeter shows the wrong voltage
          </Link>
          , and from coupled voltage on a dead wire, covered in{" "}
          <Link
            href="/multimeters/why-does-my-multimeter-show-voltage-when-measuring-a-disconnected-circuit"
            className={link}
          >
            why a multimeter shows voltage on a disconnected circuit
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Causes at a glance</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Full voltage with the device unplugged; dead when plugged in", "Reading taken open-circuit", "Re-measure with the load connected and switched on", "Always judge supply voltage under normal load"],
            ["Voltage sags when the load starts; a connector feels warm", "Corroded joint, loose crimp or burnt contact on the positive side", "Measure the drop across each connector and wire while running", "Clean, re-crimp or replace the connector or terminal"],
            ["Positive side checks out but the load still sees low voltage", "High-resistance ground", "Measure load ground to source negative under load", "Clean and tighten the ground; add or replace the ground strap"],
            ["Voltage at the battery or supply terminals itself drops", "Weak battery, undersized or current-limited supply", "Measure at the source terminals with the load running; watch for a CC light", "Charge or replace the battery; raise the limit or fit a larger supply"],
            ["Normal at the supply, low at the device", "Measuring at the wrong point; long or thin wiring", "Measure at the load's own terminals", "Shorten the run or use heavier wire"],
            ["Works, then cuts out with vibration or heat", "Intermittent connection", "Min/Max recording plus a wiggle test", "Repair the joint found; replace a cracked solder joint or harness"],
            ["Correct supply voltage, but the device does nothing", "Missing enable, control, PWM or data signal", "Check the control input; use an oscilloscope for fast signals", "Trace the control circuit; ask the maker or a repair tech"],
            ["DC reads right, but the device resets, hums or behaves oddly", "Excessive ripple or noise on the DC rail", "AC volts on the DC rail, or a scope", "Replace the supply or its filter capacitors (qualified tech for mains units)"],
            ["Full voltage at the load terminals under load, still no function", "The load itself has failed", "Measure current draw or resistance; try a known-good part", "Replace the load"],
          ]}
        />
      </section>

      <section>
        <h2 id="worked-example" className="text-xl font-semibold mb-3">Worked example: one corroded joint</h2>
        <p className="text-muted leading-7 mb-4">
          Take a 12 V source feeding a 6 Ω load, which on a healthy circuit draws 2 A (12 ÷ 6) and dissipates 24 W
          (12 × 2). Now add a corroded connection of 1 Ω in series, a plausible figure for a green, crusty
          terminal or a crimp that has loosened. The total resistance becomes 7 Ω, so the current falls to about
          1.71 A (12 ÷ 7). The joint drops 1.71 V (1.71 × 1) and the load receives only about 10.29 V (1.71 × 6).
          The load&apos;s power falls to about 17.6 W, roughly 73% of normal, which is enough to make a motor
          stall, a relay chatter or an electronic device brown out and reset.
        </p>
        <Figure
          caption={
            <>
              Illustrative circuit: the same 1 Ω corroded joint is invisible to a voltmeter with the load
              disconnected and costs 1.71 V once 1.71 A flows. Values are calculated, not measured.
            </>
          }
        >
          <LoadedVsUnloadedDiagram />
        </Figure>
        <p className="text-muted leading-7 my-4">
          Meanwhile the joint itself dissipates about 2.9 W (1.71² × 1), all of it concentrated in a contact patch
          a few millimeters across, which is why bad connections run hot, oxidize faster and get worse over time.
          Smaller numbers still matter: just 0.5 Ω in series with a 2 A load drops 1 V (2 × 0.5) and turns 2 W
          into heat (2² × 0.5). The chart shows the voltage the 6 Ω load receives from a 12 V source as the joint
          resistance rises, alongside the reading you would get with the load disconnected.
        </p>
        <BarChart
          items={[
            { label: "Load off, any joint", value: 12, display: "12.00 V" },
            { label: "Load on, 0 Ω", value: 12, display: "12.00 V" },
            { label: "Load on, 0.1 Ω", value: 11.8, display: "11.80 V" },
            { label: "Load on, 0.5 Ω", value: 11.08, display: "11.08 V" },
            { label: "Load on, 1 Ω", value: 10.29, display: "10.29 V", highlight: true },
            { label: "Load on, 2 Ω", value: 9, display: "9.00 V" },
          ]}
        />
        <p className="text-muted leading-7 mt-4 text-sm">
          Calculated values: load voltage = 12 × 6 ÷ (6 + joint resistance), ignoring the source&apos;s own
          resistance. Real circuits add wire and source resistance on top.
        </p>
        <div className="mt-4 grid sm:grid-cols-2 gap-4 items-center">
          <Figure caption={<>Illustrative reading across the load terminals with the load unplugged.</>}>
            <MeterReadout value="12.00" unit="V DC" mode="load off" />
          </Figure>
          <Figure caption={<>Illustrative reading at the same terminals with the 6 Ω load running.</>}>
            <MeterReadout value="10.29" unit="V DC" mode="load on, 1.71 A" />
          </Figure>
        </div>
      </section>

      <KeyIdea title="The rule that finds most of these faults">
        A voltage reading only means something about a power path when normal current is flowing through it.
        Switch the circuit on, make it try to work, and measure at the load. Any volts missing there have been
        lost somewhere you can find with the meter.
      </KeyIdea>

      <section>
        <h2 id="device-wont-work" className="text-xl font-semibold mb-3">
          Why does my multimeter show voltage but the device won&apos;t work?
        </h2>
        <p className="text-muted leading-7 mb-4">
          When the meter shows voltage and the device still won&apos;t work, the reading has proved that a
          potential exists between your two probe points and nothing more. The worked example above puts numbers
          on the gap: the meter draws about 1.2 µA to read 12.00 V, while the 6 Ω load needs about 2 A, so the
          path has to carry well over a million times more current than your measurement drew. Five situations
          produce this symptom, and each leaves a different fingerprint once you take a second reading.
        </p>
        <ul className="space-y-3 list-disc pl-5 text-muted leading-7 mb-4">
          <li>
            <strong className="text-foreground">Voltage with no current capacity behind it.</strong> A wire that
            is broken or switched off upstream can still show tens of volts on a 10 MΩ input because it is coupled
            to live conductors nearby. That voltage can&apos;t supply even a milliamp, so the device sees nothing.
            It collapses on a LoZ setting, as explained in{" "}
            <Link
              href="/multimeters/why-does-my-multimeter-show-voltage-when-measuring-a-disconnected-circuit"
              className={link}
            >
              why a multimeter shows voltage on a disconnected circuit
            </Link>
            .
          </li>
          <li>
            <strong className="text-foreground">A high-resistance connection.</strong> The 1 Ω joint in the worked
            example is the mild version. A back-stabbed outlet terminal, a cracked solder joint or a crimp holding
            by one strand can reach many ohms; at that point the loaded voltage falls so far that the device
            won&apos;t even start, yet the unloaded reading stays perfect.
          </li>
          <li>
            <strong className="text-foreground">Voltage drop under load.</strong> A weak battery or undersized
            supply reads its nominal value at rest and sags as soon as current flows. Step 5 shows the arithmetic
            for a source with internal resistance.
          </li>
          <li>
            <strong className="text-foreground">An open ground or open neutral.</strong> The return path carries
            the same current as the supply side. If you measure from the positive terminal to chassis rather than
            to the device&apos;s own ground terminal, an open ground stays invisible: the reading is full voltage
            while the device has none across it. On household outlets, an open neutral typically leaves hot to
            ground normal while hot to neutral reads low, wanders, or drops to nothing when something is plugged in.
          </li>
          <li>
            <strong className="text-foreground">The device itself.</strong> If full voltage reaches the device&apos;s
            terminals while it is switched on, look inside it: an internal fuse, a tripped thermal cutout, an open
            door or lid interlock, a failed internal power supply or a dead control board.
          </li>
        </ul>
        <p className="text-muted leading-7 mb-4">
          On a 120 V receptacle, three readings sort most of these out. The table shows typical patterns, not
          exact values; the readings vary with the meter, the wiring and what else is on the circuit.
        </p>
        <DataTable
          head={["Hot to neutral", "Hot to ground", "Neutral to ground", "What it usually means"]}
          rows={[
            ["About 120 V, holds with a lamp plugged in", "About 120 V", "Near 0 V, a few volts at most under load", "Wiring is delivering; suspect the device or its cord"],
            ["About 120 V unloaded, sags hard with a load", "Sags with it", "Rises under load", "Loose or burnt connection on the hot or neutral; electrician"],
            ["Low, wandering or 0 V", "About 120 V", "Wandering", "Open neutral upstream; electrician"],
            ["About 120 V", "Low, wandering or 0 V", "Wandering", "Open equipment ground; device may run but is unsafe; electrician"],
            ["Tens of volts, collapses on LoZ", "Tens of volts, collapses on LoZ", "Near 0 V", "Hot open or breaker off; only coupled voltage present"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The fastest field version of the loaded test is to plug in a lamp or other simple load that you know
          works and measure again while it is on, or to switch the meter to LoZ if it has one. Either one forces
          the circuit to supply real current, which is the thing the bare voltage reading never asked of it. If
          the receptacle passes and the device still won&apos;t work, the problem has moved from the wiring to
          the device, and the steps below, especially 7 and 8, apply. An outlet that trips or won&apos;t reset is
          a separate fault, covered in{" "}
          <Link href="/multimeters/how-to-test-a-gfci-outlet-that-wont-reset" className={link}>
            how to test a GFCI outlet that won&apos;t reset
          </Link>
          .
        </p>
      </section>

      <section>
        <p className="text-muted leading-7 mb-4">
          The steps below work through the circuit in the order that finds the fault fastest: first prove whether
          voltage is actually missing at the load, then find which half of the loop is losing it, then look at
          things a DC voltage reading cannot show.
        </p>
        <FlowDiagram
          steps={[
            { label: "Load on", sub: "Measure while it runs" },
            { label: "At the load", sub: "Its own terminals" },
            { label: "Split the loop", sub: "Positive, then ground" },
            { label: "Source", sub: "Does it sag?" },
            { label: "Beyond DC", sub: "Signals, ripple, load" },
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="measure-under-load">Measure under load</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Reconnect everything, switch the circuit on and make it try to do its job: crank the engine, turn on the
          pump, press the button that should light the strip. Then measure. If the device has its own switch,
          the reading before and after it turns on is the most useful comparison you can make. A healthy circuit
          loses only a small fraction of a volt when the load starts; a circuit with a hidden fault loses volts,
          sometimes all of them.
        </p>
        <p className="text-muted leading-7">
          If the load runs only for an instant or draws current in bursts, the meter may not update fast enough to
          show the dip. That&apos;s where Min/Max recording, covered in step 6, earns its place. For batteries and
          bench supplies there are dedicated walkthroughs:{" "}
          <Link href="/multimeters/how-to-test-a-12v-battery-under-load" className={link}>
            how to test a 12V battery under load
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/how-to-check-a-12v-power-supply-under-load" className={link}>
            how to check a 12V power supply under load
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={2} id="at-the-load">Measure at the load&apos;s terminals</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A reading at the battery or the supply output tells you about the source, not about what reaches the
          device. Put the probes on the load&apos;s own power terminals, or back-probe its connector, so that
          every wire and joint in the path sits between the source and your meter. Wire resistance alone can
          matter on long runs: 18 AWG copper is roughly 6.4 Ω per 1,000 ft, so a 20 ft run out and 20 ft back is
          about 0.26 Ω, and at 2 A that costs about 0.5 V (2 × 0.26) before any connector is involved.
        </p>
        <p className="text-muted leading-7">
          If the voltage at the load is close to the source voltage under load, the wiring is fine and you can
          skip to step 7. If it is noticeably lower, the difference has been lost in the wiring and connections,
          and steps 3 and 4 find where. The same idea applies to single components; see{" "}
          <Link href="/multimeters/how-to-measure-voltage-across-a-resistor" className={link}>
            how to measure voltage across a resistor
          </Link>{" "}
          for the probe placement.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="positive-side">Split the drop: positive side</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With the load still running, put the red probe on the source&apos;s positive terminal and the black
          probe on the load&apos;s positive terminal. The meter now reads only the voltage lost along the positive
          path. Then move the probes inward one connection at a time: across a fuse, across a switch, across each
          connector and each length of wire. The section with the large reading is the fault. A good connector or
          fuse typically drops only millivolts to a few tenths of a volt depending on current; anything that stands
          out from its neighbors deserves a closer look.
        </p>
        <p className="text-muted leading-7">
          This direct reading is more sensitive than subtracting two large numbers, because the meter can use a
          low range. A bad joint shows as, say, 1.7 V instead of the difference between 12.0 V and 10.3 V. On
          vehicles the same technique is applied to starter and battery cables in{" "}
          <Link href="/multimeters/how-to-check-voltage-drop-on-a-car" className={link}>
            how to check voltage drop on a car
          </Link>
          , which also lists commonly used guideline limits.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="ground-side">Check the ground side</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Half of every circuit is the return path, and it fails just as often. Put the red probe on the
          load&apos;s ground terminal and the black probe on the source&apos;s negative terminal, with the circuit
          running. A good ground reads close to zero, typically tens of millivolts at modest currents. A corroded
          chassis bolt or a loose ground strap shows a reading that grows with current, and the load is short by
          exactly that amount.
        </p>
        <p className="text-muted leading-7">
          Grounds fool people because a ground point measured to chassis with the circuit off reads 0 V, which
          looks perfect. Only a loaded test shows the drop. On cars, a single bad engine or body ground can make
          several unrelated circuits misbehave at once; see{" "}
          <Link href="/multimeters/how-to-test-a-car-ground-wire-with-a-multimeter" className={link}>
            how to test a car ground wire
          </Link>{" "}
          for the specific points to check.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="source">Check the source under load</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Sometimes the wiring is fine and the source itself can&apos;t deliver. A battery behaves like a voltage
          source with an internal resistance in series. Healthy batteries keep that resistance low; a sulfated,
          aged or deeply discharged one does not. As an illustration, a source with 0.5 Ω of effective internal
          resistance that reads 12.6 V at rest loses 2 V when it delivers 4 A (4 × 0.5), and sits at 10.6 V under
          load. Measure directly across the battery posts or the supply&apos;s output terminals while the load
          runs: if the voltage sags there, the problem is the source, not the wiring. The car-specific version of
          this is in{" "}
          <Link href="/multimeters/how-to-test-a-car-battery-that-reads-12-volts-but-wont-start" className={link}>
            testing a car battery that reads 12 volts but won&apos;t start
          </Link>
          .
        </p>
        <p className="text-muted leading-7">
          Bench supplies and adapters fail differently. A bench supply set to a 1 A current limit feeding a load
          that wants 2 A at 12 V (6 Ω) switches into constant-current mode and holds 1 A, so the output falls to
          about 6 V (1 × 6). Many supplies show a CC light when this happens. Wall adapters and USB chargers that
          are overloaded may sag, fold back or shut down and restart in a cycle, which can look like a fault in
          the device. Check the current rating against what the load actually draws, including start-up surges.
        </p>
      </section>

      <section>
        <StepHeading n={6} id="intermittent">Catch intermittent dropouts</StepHeading>
        <p className="text-muted leading-7 mb-4">
          If the circuit works sometimes, a spot reading will usually show normal voltage because the fault
          isn&apos;t happening while you look. Connect the meter at the load, start Min/Max recording if the meter
          has it, and let the circuit run while you flex the harness, tap connectors, wiggle the plug and warm
          suspect areas. When the fault occurs, the minimum reading records how low the voltage fell even though
          the display has already recovered.
        </p>
        <p className="text-muted leading-7">
          Recording speed matters. Standard Min/Max on many handheld meters captures changes lasting on the order
          of 100 ms or more (check your manual), while peak modes on some meters catch much shorter events. For
          dropouts shorter than that, an oscilloscope with a single-shot trigger or persistence display is the
          better tool; see{" "}
          <Link
            href="/oscilloscopes/how-to-use-oscilloscope-persistence-to-find-intermittent-glitches"
            className={link}
          >
            using oscilloscope persistence to find intermittent glitches
          </Link>
          . The multimeter-only method is laid out in{" "}
          <Link href="/multimeters/how-to-find-an-intermittent-electrical-fault-with-a-multimeter" className={link}>
            how to find an intermittent electrical fault
          </Link>
          , and readings that jump around without a fault are covered in{" "}
          <Link href="/multimeters/unstable-multimeter-readings" className={link}>
            what causes unstable multimeter readings
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={7} id="signals-and-ripple">Signals, enable lines and ripple</StepHeading>
        <p className="text-muted leading-7 mb-4">
          If the supply holds its voltage at the load under load, power is not the problem. Many devices also need
          a control input to do anything: a motor driver needs its enable pin pulled high, an LED driver needs a
          PWM signal above 0% duty, a relay module needs its trigger input, and a digital board needs a valid
          clock or data stream. A multimeter on DC volts shows only the average of a changing signal, so a 5 V
          PWM signal at 50% duty reads about 2.5 V, and a data line that is toggling can read an unremarkable
          in-between value. A steady reading cannot tell you whether the signal is switching correctly. An
          oscilloscope can; see{" "}
          <Link href="/oscilloscopes/how-to-measure-pwm-duty-cycle-with-an-oscilloscope" className={link}>
            how to measure PWM duty cycle with an oscilloscope
          </Link>
          .
        </p>
        <p className="text-muted leading-7">
          Ripple is the other thing a DC reading hides. A DC rail with a large AC component can average to the
          correct voltage while dipping low enough on every cycle to reset a microcontroller or make audio gear
          hum. As a quick screen, switch the meter to AC volts and measure the same DC rail: on many meters the AC
          function blocks the DC level and shows the AC part on its own, though some meters measure AC+DC, so check
          the manual. Treat the number as approximate, because handheld meters specify AC accuracy over a limited
          frequency band and can under-read the high-frequency ripple of a switching supply. Ripple at 120 Hz on
          a 60 Hz linear supply points to filter capacitors; a proper measurement needs a scope, as described in{" "}
          <Link href="/oscilloscopes/how-to-measure-ripple-voltage-with-an-oscilloscope" className={link}>
            how to measure ripple voltage with an oscilloscope
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={8} id="the-load">Suspect the load itself</StepHeading>
        <p className="text-muted leading-7 mb-4">
          When the correct voltage is present at the load&apos;s terminals while it is switched on, the control
          signals are right and the supply is clean, the device itself has failed. Useful checks are measuring
          the current it draws (a reading of zero suggests an open winding, filament or internal fuse; a reading
          far above its rating suggests a short or a seized motor), measuring its resistance with the power
          disconnected, and swapping in a known-good part.
        </p>
        <p className="text-muted leading-7">
          Compare against the maker&apos;s rated current where one is published. A 12 V, 24 W lamp should draw
          about 2 A (24 ÷ 12) when running. A motor briefly draws several times its running current at start-up,
          so judge it once it is turning. If the device is mains-powered or sealed, stop at this point and hand it
          to a qualified repair technician.
        </p>
      </section>

      <section>
        <h2 id="meters" className="text-xl font-semibold mb-3">Meters that help</h2>
        <p className="text-muted leading-7 mb-4">
          Any working meter can run the loaded tests above. Min/Max recording and a fast analog bar graph make
          sags and dropouts easier to catch. These picks come from our verified multimeter list.
        </p>
        <ProductStrip
          title="Meters for catching voltage that sags under load"
          items={[
            {
              name: "Fluke 88V",
              image: fluke88v.image,
              alt: "Fluke 88V automotive multimeter",
              href: "/multimeters/best-multimeter-for-automotive#fluke-88v",
              note: "Min/Max/Average recording with 250 µs Peak Min/Max for dropouts, CAT III 1000V / CAT IV 600V. Average-responding, not True RMS.",
            },
            {
              name: "Fluke 87V",
              image: fluke87v.image,
              alt: "Fluke 87V True RMS industrial multimeter",
              href: "/multimeters/fluke-87v-review",
              note: "True RMS, a 19,999-count high-resolution mode and an analog bar graph that tracks changing readings. Hands-on Tested.",
            },
            {
              name: "KAIWEETS HT118A",
              image: ht118a.image,
              alt: "KAIWEETS HT118A True RMS digital multimeter",
              href: "/multimeters/best-multimeters-for-electricians-under-100#kaiweets-ht118a",
              note: "Budget True RMS, 6,000 counts, with Min/Max and an analog bar. Maker's page and manual disagree on max voltage.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
