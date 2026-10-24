import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  HowToShell,
  InfoCards,
  KeyIdea,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to test an ignition coil with a multimeter: primary and secondary resistance, power and ground at the plug, and why a coil can pass yet still misfire.";

export const metadata = buildMetadata({
  title: "How to Test an Ignition Coil With a Multimeter",
  description,
  path: "/multimeters/how-to-test-an-ignition-coil-with-a-multimeter",
});

const fluke87v = picks.find((p) => p.name === "Fluke 87V")!;

const link = "text-accent hover:underline";

export default function HowToTestAnIgnitionCoilWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Car Ignition Coil With a Multimeter"
      description={description}
      path="/multimeters/how-to-test-an-ignition-coil-with-a-multimeter"
      category="multimeters"
      published="2026-10-24"
      intro={
        <>
          To test an ignition coil with a multimeter, you measure the resistance of its two windings with
          the coil disconnected, then check that the harness plug supplies power and a ground or trigger
          signal. Those checks catch open or shorted windings and wiring faults. They can&apos;t prove a
          coil will fire reliably under heat and load, and on many modern coils with built-in drivers the
          resistance test doesn&apos;t apply at all, so knowing which coil you have comes first.
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
        { id: "coil-types", label: "Identify the coil type" },
        { id: "how-a-coil-works", label: "How the two windings work" },
        { id: "primary-resistance", label: "Measure primary resistance" },
        { id: "secondary-resistance", label: "Measure secondary resistance" },
        { id: "power-and-ground", label: "Check power and ground at the plug" },
        { id: "limitations", label: "What a resistance test misses" },
      ]}
      faq={[
        {
          q: "What resistance should an ignition coil have?",
          a: "It depends on the coil. As a general pattern, the primary winding reads low, often under a few ohms, and the secondary reads much higher, usually in the thousands of ohms. The service manual or coil maker gives the actual range for your part, and that figure is the one to compare against.",
        },
        {
          q: "Can I test a coil-on-plug coil with a multimeter?",
          a: "Only partly. Many coil-on-plug units have the driver transistor built in and a three- or four-pin connector, so there is no direct path to the primary winding to measure. On those you can check supply voltage and ground at the harness plug, but judging the coil itself takes a spark tester, a swap test or a scope.",
        },
        {
          q: "Will a bad ignition coil always set a check engine light?",
          a: "Not always. A coil that fails completely usually causes a misfire the engine computer detects and logs, but an intermittent coil may only misfire under load or when hot, and the misfire may not be frequent enough to set a code straight away. A scan tool's misfire counters can help spot it.",
        },
        {
          q: "Should I measure the coil hot or cold?",
          a: "Resistance specifications are usually quoted at a stated temperature, often room temperature, and copper winding resistance rises as it heats. Measure at the temperature the manual specifies. If a coil only misbehaves when hot, testing it cold and again after a drive can reveal a change, though a dynamic test is more conclusive.",
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
        </ul>
      </Callout>

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
          <svg viewBox="0 0 300 150" className="w-full h-auto" role="img" aria-label="Diagram of an ignition coil showing a low-resistance primary winding and a high-resistance secondary winding feeding the spark plug">
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
        <StepHeading n={2} id="primary-resistance">Measure primary resistance</StepHeading>
        <p className="text-muted leading-7">
          With the ignition off, unplug the coil connector. Set the meter to its lowest ohms range, touch
          the probe tips together and note the reading, or use the relative function to zero it. Then probe
          the two primary terminals: positive feed and the driver or negative side. A typical primary reads
          under a few ohms, so lead resistance is a meaningful share of the result. Our guide to{" "}
          <Link href="/multimeters/how-to-measure-resistance-in-ohms-with-a-digital-multimeter" className={link}>
            measuring resistance with a digital multimeter
          </Link>{" "}
          explains ranges and lead compensation if this is new.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="secondary-resistance">Measure secondary resistance</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Move to a kilohm range and probe from the high-voltage output to the secondary return. On a
          canister coil that is usually the center tower to one of the primary terminals; on a waste-spark
          pack it is between the two towers of a pair; on a two-pin coil-on-plug, from the spring inside the
          boot to the terminal the manual names. Some coil designs include a diode in the secondary that
          blocks an ordinary ohmmeter, so follow the manual&apos;s probe points.
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
          close to battery voltage. Check the ground pin for continuity to the engine or battery negative.
          On three- and four-pin coils this is the main meter test available. The trigger signal from the
          engine computer is a fast pulse that a meter can&apos;t display properly; that is a job for a
          scope or a dedicated ignition tester.
        </p>
      </section>

      <section>
        <h2 id="limitations" className="text-xl font-semibold mb-3">What a resistance test misses</h2>
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
          .
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
    </HowToShell>
  );
}
