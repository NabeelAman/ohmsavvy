import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  InfoCards,
  KeyIdea,
  MeterReadout,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const description =
  "How to test an ignition coil with a multimeter: primary and secondary resistance, power and ground at the plug, and why a coil can pass yet still misfire.";

export const metadata = buildMetadata({
  title: "How to Test an Ignition Coil With a Multimeter",
  description,
  path: "/multimeters/how-to-test-an-ignition-coil-with-a-multimeter",
});

const all = getAllPicks("multimeters");
const fluke87v = all.find((p) => p.name === "Fluke 87V")!;
const innova3340 = all.find((p) => p.name === "Innova 3340")!;

const link = "text-accent hover:underline";

/** Primary current building during dwell (illustrative 0.6 Ω, 3 mH coil at 14 V), then collapsing at switch-off. */
function DwellDiagram() {
  return (
    <svg
      viewBox="0 0 320 170"
      className="w-full h-auto"
      role="img"
      aria-label="Graph of ignition coil primary current against time: current rises along a curve from zero to about 7.7 amps after 2 milliseconds of dwell, then the driver switches off, current drops to zero and the collapsing field fires the spark; a dashed line shows the current would keep rising toward 12.8 amps at 4 milliseconds if dwell continued"
    >
      <g className="stroke-foreground" strokeWidth="1.2" fill="none">
        <line x1="40" y1="20" x2="40" y2="130" />
        <line x1="40" y1="130" x2="290" y2="130" />
      </g>
      <g className="stroke-muted" strokeWidth="1">
        <line x1="80" y1="130" x2="80" y2="134" />
        <line x1="120" y1="130" x2="120" y2="134" />
        <line x1="160" y1="130" x2="160" y2="134" />
        <line x1="200" y1="130" x2="200" y2="134" />
      </g>
      <path
        d="M40 130 L60 115.2 L80 102 L100 89.7 L120 78.6"
        className="stroke-accent"
        strokeWidth="2.2"
        fill="none"
      />
      <path d="M120 78.6 L120 130" className="stroke-accent" strokeWidth="2.2" />
      <path
        d="M120 78.6 L160 60 L200 44.6"
        className="stroke-muted"
        strokeWidth="1.4"
        strokeDasharray="4 3"
        fill="none"
      />
      <circle cx="120" cy="78.6" r="3" className="fill-accent" />
      <g fontSize="9" className="fill-muted">
        <text x="40" y="146" textAnchor="middle">0</text>
        <text x="80" y="146" textAnchor="middle">1</text>
        <text x="120" y="146" textAnchor="middle">2</text>
        <text x="160" y="146" textAnchor="middle">3</text>
        <text x="200" y="146" textAnchor="middle">4</text>
        <text x="245" y="146" textAnchor="middle">time, ms</text>
        <text x="34" y="16" textAnchor="end">A</text>
        <text x="206" y="42">12.8 A if dwell</text>
        <text x="206" y="53">kept going</text>
      </g>
      <g fontSize="9.5" className="fill-foreground">
        <text x="56" y="74">7.7 A at 2 ms</text>
        <text x="126" y="112">driver off:</text>
        <text x="126" y="123">spark fires</text>
      </g>
      <text x="165" y="164" fontSize="9" textAnchor="middle" className="fill-muted">
        Illustrative: 0.6 Ω, 3 mH primary on a 14 V supply
      </text>
    </svg>
  );
}

export default function HowToTestAnIgnitionCoilWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Car Ignition Coil With a Multimeter"
      description={description}
      path="/multimeters/how-to-test-an-ignition-coil-with-a-multimeter"
      category="multimeters"
      published="2026-10-24"
      updated="2026-10-25"
      intro={
        <>
          To test an ignition coil with a multimeter, unplug it and measure the resistance of its two
          windings: the primary typically reads well under a few ohms and the secondary typically reads
          thousands of ohms, and both must fall within the service manual&apos;s range. Then check that the
          harness plug supplies battery voltage and a good ground. Those checks catch open or shorted
          windings and wiring faults. They can&apos;t prove a coil will fire reliably under heat and load,
          and on many modern coils with built-in drivers the resistance test doesn&apos;t apply at all, so
          knowing which coil you have comes first.
        </>
      }
      aside={{
        image: fluke87v.image,
        alt: "Fluke 87V digital multimeter, front view",
        caption: (
          <>
            Coil checks use the ohms range and DC volts; low-ohm primary readings benefit from a meter
            with a relative or zero function to remove lead resistance. See our{" "}
            <Link href="/multimeters/fluke-87v-review" className={link}>
              Fluke 87V review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "causes", label: "Symptoms and causes" },
        { id: "coil-types", label: "Identify the coil type" },
        { id: "how-a-coil-works", label: "How the two windings work" },
        { id: "the-numbers", label: "The numbers behind a spark" },
        { id: "primary-resistance", label: "Measure primary resistance" },
        { id: "secondary-resistance", label: "Measure secondary resistance" },
        { id: "power-and-ground", label: "Check power and ground at the plug" },
        { id: "limitations", label: "Confirm with a dynamic test" },
        { id: "meters", label: "Meters for this job" },
      ]}
      faq={[
        {
          q: "How do you check ignition coil resistance?",
          a: "Unplug the coil, set the multimeter to ohms, and measure across the primary terminals, then across the secondary (or the secondary terminal to the tower on a can-style coil). Compare both readings to the service manual's range for that coil — primary is typically under a few ohms, secondary typically several thousand. On coil-on-plug units with a built-in driver, there's often no primary winding to reach this way; check supply voltage and ground at the connector instead.",
        },
        {
          q: "What resistance should an ignition coil have?",
          a: "It depends on the coil. As a general pattern, the primary winding reads low, often under a couple of ohms, and the secondary reads much higher, usually several thousand ohms. The service manual or coil maker gives the actual range for your part and the temperature it applies at, and that figure is the one to compare against, not a generic chart.",
        },
        {
          q: "Can I test a coil-on-plug coil with a multimeter?",
          a: "Only partly. Many coil-on-plug units have the driver transistor built in and a three- or four-pin connector, so there is no direct path to the primary winding to measure. On those you can check supply voltage and ground at the harness plug, but judging the coil itself takes a spark tester, a swap test or a scope.",
        },
        {
          q: "Will a bad ignition coil always set a check engine light?",
          a: "Not always. A coil that fails completely usually causes a misfire the engine computer detects and logs, but an intermittent coil may only misfire under load or when hot, and the misfire may not be frequent enough to set a code straight away. A scan tool's misfire counters can help spot it before the light comes on.",
        },
        {
          q: "Should I measure the coil hot or cold?",
          a: "Resistance specifications are usually quoted at a stated temperature, often room temperature, and copper winding resistance rises by roughly 0.4% per degree Celsius as it heats. Measure at the temperature the manual specifies. If a coil only misbehaves when hot, testing it cold and again after a drive can reveal a change, though a dynamic test is more conclusive.",
        },
        {
          q: "What are the symptoms of a bad ignition coil?",
          a: "The common signs are a misfire you can feel as a stumble or shake, especially under acceleration or load, a rough idle, a flashing check engine light, a misfire code naming one cylinder, poorer fuel economy and, if the coil fails completely, a dead cylinder. A failing coil can also damage the catalytic converter, so do not keep driving with a flashing light.",
        },
        {
          q: "Can a bad spark plug make an ignition coil fail?",
          a: "Yes. A worn plug with a wide gap needs more voltage to fire, which pushes the coil's secondary harder on every spark and stresses its insulation. Oil or water in the plug well can also track high voltage down the outside of the boot. When you replace a failed coil, check the plug gap and condition and fix any oil leak into the well.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-solenoid-coil-with-a-multimeter",
          title: "How to Test a Solenoid Coil",
          desc: "The same winding-resistance logic applied to valve and starter solenoids.",
        },
        {
          href: "/oscilloscopes/best-oscilloscopes-for-automotive-diagnostics",
          title: "Best Oscilloscopes for Automotive Diagnostics",
          desc: "Scopes that can show the ignition waveform a multimeter can't.",
        },
        {
          href: "/multimeters/how-to-test-a-fuel-injector-with-a-multimeter",
          title: "How to Test a Fuel Injector",
          desc: "Rule out the fuel side of a single-cylinder misfire.",
        },
      ]}
    >
      <Callout title="High voltage: keep clear while the engine runs or cranks">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            An ignition coil produces many thousands of volts at the secondary output. Never touch the coil
            tower, plug wires or boot while the engine is running or cranking, and never hold a lead
            against them by hand.
          </li>
          <li>
            Do all resistance checks with the ignition off and the coil connector unplugged. Applying an
            ohmmeter to a powered circuit gives false readings and can damage the meter.
          </li>
          <li>
            Don&apos;t crank the engine with a coil output disconnected and ungrounded. The spark seeks
            another path, which can damage the coil, the engine computer or you. Use a proper spark tester.
          </li>
          <li>
            If you have a pacemaker or other implanted medical device, leave running ignition tests to
            someone else. Hybrid vehicles also carry high-voltage battery circuits; leave orange cables
            alone and use a qualified mechanic for anything near them.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and causes</h2>
        <p className="text-muted leading-7 mb-4">
          A coil test usually starts with a misfire code that names one cylinder, a stumble under
          acceleration, or a misfire that only appears once the engine is hot. The table maps each
          complaint to the check that confirms it.
        </p>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Misfire code on one cylinder", "Failed coil, plug or boot on that cylinder", "Swap the coil to another cylinder; see if the code follows", "Replace the coil (and check the plug)"],
            ["Dead cylinder, coil reads OL", "Open primary or secondary winding", "Ohms across each winding, connector unplugged", "Replace the coil"],
            ["Misfire only under load or when hot", "Insulation breaking down at high voltage", "Spark tester at the rated gap; swap test", "Replace the coil; check for oil in the plug well"],
            ["Several cylinders misfire at once", "Shared coil feed, fuse, relay or ground", "DC volts and ground at each coil connector", "Repair the feed or ground"],
            ["No spark on any cylinder", "Coil feed, crank sensor or engine computer", "Feed volts at the coil; crank sensor signal", "Mechanic or auto electrician if the feed is good"],
            ["Coil passes every meter test, misfire remains", "Plug, boot, injector or compression", "Plug inspection; injector test; compression test", "Work through the other causes or see a mechanic"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="coil-types">Identify the coil type</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Before reaching for the meter, look at how many pins the coil connector has and where the
          high-voltage output goes. That tells you which of these tests you can actually do:
        </p>
        <InfoCards
          items={[
            { label: "Canister coil", desc: "Older single coil feeding a distributor. Primary and secondary are both reachable; the classic resistance test applies." },
            { label: "Coil pack (waste spark)", desc: "One coil fires two cylinders at once. Primary pins on the connector, secondary between the paired towers." },
            { label: "Coil-on-plug, two pins", desc: "Sits on each plug, driven by the engine computer. Primary is usually measurable; secondary may be." },
            { label: "Coil-on-plug, 3-4 pins", desc: "Driver electronics built in. Resistance tests are not meaningful; check power and ground instead." },
          ]}
        />
      </section>

      <section>
        <h2 id="how-a-coil-works" className="text-xl font-semibold mb-3">How the two windings work</h2>
        <p className="text-muted leading-7 mb-4">
          A coil is a step-up transformer. The primary has relatively few turns of thicker wire; the
          secondary has a great many turns of very fine wire. When the driver switches off the primary
          current, the collapsing magnetic field induces a much higher voltage in the secondary, enough to
          jump the plug gap. That construction explains the readings you should expect: low resistance on
          the primary, far higher on the secondary.
        </p>
        <Figure
          caption={
            <>
              The primary (left) is a short, low-resistance winding fed from battery voltage and switched to
              ground. The secondary (right) is a long, fine winding whose output goes to the spark plug.
            </>
          }
        >
          <svg viewBox="0 0 300 150" className="w-full h-auto" role="img" aria-label="Diagram of an ignition coil: a low-resistance primary winding fed from +12 volts and switched by the driver sits beside an iron core, and a high-resistance secondary winding of many turns feeds the spark plug">
            <g className="stroke-foreground" strokeWidth="1.6" fill="none">
              <path d="M90 35 q-14 7 0 14 q-14 7 0 14 q-14 7 0 14 q-14 7 0 14" />
              <path d="M150 30 q12 5 0 10 q12 5 0 10 q12 5 0 10 q12 5 0 10 q12 5 0 10 q12 5 0 10" />
              <line x1="90" y1="35" x2="40" y2="35" />
              <line x1="90" y1="91" x2="40" y2="91" />
              <line x1="150" y1="30" x2="230" y2="30" />
              <line x1="150" y1="90" x2="230" y2="90" />
            </g>
            <line x1="118" y1="25" x2="118" y2="100" className="stroke-muted" strokeWidth="2" />
            <line x1="124" y1="25" x2="124" y2="100" className="stroke-muted" strokeWidth="2" />
            <circle cx="40" cy="35" r="3" className="fill-accent" />
            <circle cx="40" cy="91" r="3" className="fill-accent" />
            <circle cx="230" cy="30" r="3" className="fill-accent" />
            <circle cx="230" cy="90" r="3" className="fill-accent" />
            <text x="40" y="24" fontSize="9" textAnchor="middle" className="fill-foreground">+12 V</text>
            <text x="40" y="108" fontSize="9" textAnchor="middle" className="fill-foreground">to driver</text>
            <text x="230" y="20" fontSize="9" textAnchor="middle" className="fill-foreground">to plug</text>
            <text x="230" y="108" fontSize="9" textAnchor="middle" className="fill-foreground">return</text>
            <text x="75" y="134" fontSize="10" textAnchor="middle" className="fill-accent">Primary: low ohms</text>
            <text x="210" y="134" fontSize="10" textAnchor="middle" className="fill-accent">Secondary: kilohms</text>
          </svg>
        </Figure>
      </section>

      <section>
        <h2 id="the-numbers" className="text-xl font-semibold mb-3">The numbers behind a spark</h2>
        <p className="text-muted leading-7 mb-4">
          Typical ranges help you recognize a reading that is wildly wrong, but they vary between designs,
          so the service manual always wins. As a broad guide, coil-on-plug primaries often read somewhere
          around 0.3 to 1 Ω, older canister primaries around 0.5 to 2 Ω, and secondaries commonly several
          thousand ohms, often somewhere in the 5 to 15 kΩ region. The chart puts illustrative values on a
          log scale, because the secondary is roughly ten thousand times the primary.
        </p>
        <Figure caption={<>Illustrative typical values, not a specification. Note how close the test leads come to a coil-on-plug primary, which is why zeroing the leads matters.</>}>
          <BarChart
            log
            items={[
              { label: "Test leads", value: 0.2, display: "~0.2 Ω" },
              { label: "COP primary", value: 0.6, display: "~0.6 Ω", highlight: true },
              { label: "Canister primary", value: 1.5, display: "~1.5 Ω" },
              { label: "Secondary", value: 8000, display: "~8 kΩ", highlight: true },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4 mb-4">
          A low primary resistance does not mean a huge current, because the winding&apos;s inductance
          makes current build up gradually while the driver holds it on, a period called dwell. Take an
          illustrative primary of 0.6 Ω and 3 mH on a 14 V running supply. Current could eventually reach
          14 ÷ 0.6 ≈ 23 A, but it rises with a time constant of L ÷ R = 0.003 ÷ 0.6 = 5 ms. After a 2 ms
          dwell it has reached 23.3 × (1 − e<sup>−0.4</sup>) ≈ 23.3 × 0.33 ≈ 7.7 A. The energy stored is
          ½ × L × I² = 0.5 × 0.003 × 7.7² ≈ 0.089 J, about 89 mJ, and that is what the spark spends.
        </p>
        <Figure caption={<>Illustrative primary current during dwell. The engine computer sets the dwell time, so it controls peak current and spark energy.</>}>
          <DwellDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The same picture explains two meter readings. Shorted primary turns lower both resistance and
          inductance, so current rises faster and the driver works harder. And a secondary that reads
          correctly can still fail, because the spark may need many kilovolts to jump a worn plug gap, and
          an ohmmeter applies only a volt or so. Measuring resistance proves the copper is continuous; it
          says nothing about the insulation at full voltage.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="primary-resistance">Measure primary resistance</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With the ignition off, unplug the coil connector. Set the meter to its lowest ohms range, touch
          the probe tips together and note the reading, or use the relative function to zero it. Then probe
          the two primary terminals: positive feed and the driver or negative side. A typical primary reads
          under a few ohms, so lead resistance is a meaningful share of the result: 0.2 Ω of lead on a
          0.6 Ω coil inflates the reading by a third. Our guide to{" "}
          <Link href="/multimeters/how-to-measure-resistance-in-ohms-with-a-digital-multimeter" className={link}>
            measuring resistance with a digital multimeter
          </Link>{" "}
          explains ranges and lead compensation if this is new.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 items-center">
          <Figure caption={<>Illustrative reading: a coil-on-plug primary before zeroing the leads.</>}>
            <MeterReadout value="0.8" unit="Ω" mode="Ω  leads included" />
          </Figure>
          <Figure caption={<>Illustrative reading: the same coil with the relative function zeroing out 0.2 Ω of lead.</>}>
            <MeterReadout value="0.6" unit="Ω" mode="Ω  REL on" />
          </Figure>
        </div>
      </section>

      <section>
        <StepHeading n={3} id="secondary-resistance">Measure secondary resistance</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Move to a kilohm range and probe from the high-voltage output to the secondary return. On a
          canister coil that is usually the center tower to one of the primary terminals; on a waste-spark
          pack it is between the two towers of a pair; on a two-pin coil-on-plug, from the spring inside the
          boot to the terminal the manual names. Some coil designs include a diode in the secondary that
          blocks an ordinary ohmmeter, so follow the manual&apos;s probe points. Finally, check from each
          winding to the coil body or mounting bracket, which should read OL.
        </p>
        <DataTable
          head={["Result", "Likely meaning"]}
          rows={[
            ["Within the manual's range on both windings", "Windings intact; move on to power, ground and dynamic tests"],
            ["OL or infinite on either winding", "Open winding or broken internal connection"],
            ["Well below the specified range", "Shorted turns inside the winding"],
            ["Any continuity from a winding to the coil body or bracket", "Insulation breakdown; replace the coil"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={4} id="power-and-ground">Check power and ground at the plug</StepHeading>
        <p className="text-muted leading-7">
          A coil that tests well but gets no supply will still produce no spark. With the connector unplugged
          and the ignition switched on, measure DC volts from the feed pin to a clean ground; it should be
          close to battery voltage, typically about 12.4 to 12.6 V with the engine off. A feed that reads a
          volt or more low points to a corroded fuse terminal or connector. Check the ground pin for
          continuity to the engine or battery negative, or better, a{" "}
          <Link href="/multimeters/how-to-check-voltage-drop-on-a-car" className={link}>
            voltage drop test
          </Link>{" "}
          while cranking. On three- and four-pin coils this is the main meter test available. The trigger
          signal from the engine computer is a fast pulse that a meter can&apos;t display properly; that is
          a job for a scope or a dedicated ignition tester. If no coil gets a trigger at all, the{" "}
          <Link href="/multimeters/how-to-test-a-crankshaft-position-sensor-with-a-multimeter" className={link}>
            crankshaft position sensor
          </Link>{" "}
          is a common culprit.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="limitations">Confirm with a dynamic test</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Resistance measures the copper, not the insulation under the stress of tens of kilovolts. A coil
          with a hairline crack in its casing or breaking-down internal insulation can read perfectly and
          still misfire when hot, under acceleration or in damp weather. Resistance tests are also less
          useful on coils with integrated drivers, as above, and the coil itself often isn&apos;t
          designed to be serviced. The same open/short/in-range logic applies to other wound parts, as in
          our guide to{" "}
          <Link href="/multimeters/how-to-test-a-solenoid-coil-with-a-multimeter" className={link}>
            testing a solenoid coil
          </Link>
          . If the coil, plug and wiring all pass and the misfire stays, check the fuel side with our{" "}
          <Link href="/multimeters/how-to-test-a-fuel-injector-with-a-multimeter" className={link}>
            fuel injector test
          </Link>{" "}
          or have a mechanic run a compression test.
        </p>
        <KeyIdea title="Dynamic tests that confirm a suspect coil">
          An adjustable spark tester shows whether the coil can fire across a set gap. A swap test, moving a
          suspect coil-on-plug to another cylinder and seeing whether the misfire follows it, is simple and
          often decisive. An oscilloscope shows the firing and burn time of every event; see our pick of the{" "}
          <Link href="/oscilloscopes/best-oscilloscopes-for-automotive-diagnostics" className={link}>
            best oscilloscopes for automotive diagnostics
          </Link>
          .
        </KeyIdea>
      </section>

      <section>
        <h2 id="meters" className="text-xl font-semibold mb-3">Meters for this job</h2>
        <p className="text-muted leading-7 mb-4">
          Primary readings under an ohm reward a meter with good low-ohm resolution and a relative mode;
          an inductive RPM pickup adds a quick check that each coil is firing. These picks come from our
          verified multimeter list.
        </p>
        <ProductStrip
          title="Meters for coil resistance and ignition checks"
          items={[
            {
              name: "Fluke 87V",
              image: fluke87v.image,
              alt: "Fluke 87V industrial True RMS multimeter",
              href: "/multimeters/fluke-87v-review",
              note: "True RMS, CAT IV 600V, with a 19,999-count high-resolution mode and an analog bar graph. Hands-on Tested.",
            },
            {
              name: "Innova 3340",
              image: innova3340.image,
              alt: "Innova 3340 automotive engine-analyzer multimeter",
              href: "/multimeters/best-multimeter-for-automotive#innova-3340",
              note: "RPM to 10,000 with the included inductive clamp (conventional, DIS and coil-on-plug), plus dwell. CAT II 600V.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
