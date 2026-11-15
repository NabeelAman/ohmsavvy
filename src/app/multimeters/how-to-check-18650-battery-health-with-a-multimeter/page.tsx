import Link from "@/components/AppLink";
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
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "Check 18650 battery health with a multimeter in three readings: resting voltage, a 7-day self-discharge check and voltage sag under load to estimate resistance.";

export const metadata = buildMetadata({
  title: "How to Check 18650 Battery Health With a Meter",
  description,
  path: "/multimeters/how-to-check-18650-battery-health-with-a-multimeter",
});

const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;
const fluke15 = picks.find((p) => p.name === "Fluke 15B+")!;
const fluke115 = picks.find((p) => p.name === "Fluke 115")!;

const link = "text-accent hover:underline";

/** Voltage sag: open-circuit voltage, then the drop when a known load is connected, and R = ΔV / I. */
function VoltageSagDiagram() {
  return (
    <svg
      viewBox="0 0 340 190"
      className="w-full h-auto"
      role="img"
      aria-label="Graph of an 18650 cell's voltage over a few seconds: it rests at 4.10 volts, drops instantly when a 1 amp load is connected, and the size of that instant step divided by the load current gives the cell's internal resistance."
    >
      {/* axes */}
      <line x1="40" y1="20" x2="40" y2="160" className="stroke-foreground" strokeWidth="1.5" />
      <line x1="40" y1="160" x2="320" y2="160" className="stroke-foreground" strokeWidth="1.5" />
      <text x="34" y="44" fontSize="9" textAnchor="end" className="fill-muted">4.10 V</text>
      <text x="34" y="104" fontSize="9" textAnchor="end" className="fill-muted">3.98 V</text>
      <text x="180" y="178" fontSize="9" textAnchor="middle" className="fill-muted">time (seconds)</text>
      {/* trace */}
      <path d="M40 40 H130 V100 C180 104 240 108 300 112" className="stroke-accent" strokeWidth="2.5" fill="none" />
      {/* annotation */}
      <g className="stroke-foreground" strokeWidth="1.2" strokeDasharray="4 3">
        <line x1="130" y1="40" x2="160" y2="40" />
        <line x1="130" y1="100" x2="160" y2="100" />
      </g>
      <path d="M155 44 V96" className="stroke-foreground" strokeWidth="1.4" />
      <text x="165" y="66" fontSize="10" fontWeight="700" className="fill-foreground">ΔV = 0.12 V</text>
      <text x="165" y="80" fontSize="9" className="fill-muted">R ≈ 0.12 V ÷ 1 A = 0.12 Ω</text>
      <text x="70" y="32" fontSize="9" className="fill-muted">resting, no load</text>
      <text x="200" y="128" fontSize="9" className="fill-muted">1 A load connected</text>
      <line x1="130" y1="150" x2="130" y2="166" className="stroke-accent" strokeWidth="1.5" />
      <text x="130" y="150" fontSize="9" textAnchor="middle" className="fill-accent">load on</text>
    </svg>
  );
}

export default function HowToCheck18650BatteryHealthWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Check 18650 Battery Health With a Multimeter"
      description={description}
      published="2026-11-15"
      path="/multimeters/how-to-check-18650-battery-health-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          You can check 18650 battery health with a multimeter by taking three readings: the resting voltage after
          a full charge, the voltage again after the cell sits for a week, and the drop in voltage when you connect
          a known load. A healthy cell rests near 4.2 V when full, loses only a few hundredths of a volt in a week,
          and sags very little under a 1 A load; a worn or damaged cell fails one or more of those checks. This
          guide covers those three quick health checks, what the numbers mean, and when a cell should go to the
          recycler instead of back into a flashlight, vape or battery pack.
        </>
      }
      aside={{
        image: astro.image,
        alt: "AstroAI DM6000AR multimeter for 18650 cell voltage and sag readings",
        caption: (
          <>
            A 6,000-count meter like the AstroAI DM6000AR shows cell voltage to the nearest millivolt in the 6 V
            range. See our{" "}
            <Link href="/multimeters/astroai-dm6000ar-review" className={link}>
              AstroAI DM6000AR review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-health-means", label: "What battery health means" },
        { id: "causes", label: "Symptoms and likely causes" },
        { id: "inspect", label: "1. Inspect the cell" },
        { id: "resting-voltage", label: "2. Read the resting voltage" },
        { id: "self-discharge", label: "3. Run a self-discharge check" },
        { id: "voltage-sag", label: "4. Measure voltage sag under load" },
        { id: "score", label: "5. Score the cell" },
        { id: "health-table", label: "Health thresholds at a glance" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "What voltage is a dead 18650 battery?",
          a: "Most Li-ion 18650 cells are designed to stop discharging at about 2.5 to 3.0 V, depending on the maker. A cell that rests below about 2.5 V has been over-discharged, and one below about 2.0 V may have internal copper damage. Many experienced users and chargers refuse to recover cells that low, and the safest choice is to recycle them.",
        },
        {
          q: "Can a multimeter test 18650 internal resistance?",
          a: "Not directly. The ohms range sends a tiny current and can't measure a live cell. You can estimate it from voltage sag: read the open-circuit voltage, connect a known load, read again, and divide the drop by the load current. A dedicated four-wire AC internal-resistance meter gives a more precise figure, but the sag method is enough to spot bad cells.",
        },
        {
          q: "How long should an 18650 hold its charge sitting on a shelf?",
          a: "A healthy Li-ion cell loses only a few percent of its charge per month at room temperature, which looks like a drop of a few hundredths of a volt after a week. A cell that falls 0.1 V or more in a week, or keeps falling the next week, has abnormal self-discharge and is often hiding an internal micro-short.",
        },
        {
          q: "Is a used 18650 from a laptop pack safe to reuse?",
          a: "It can be, but only after it passes every check: no damage to the wrap, a resting voltage that never fell below the maker's cutoff, a stable self-discharge week, low sag under load and a capacity test. Cells pulled from packs often come from groups where one cell failed, so test each one individually and label them.",
        },
        {
          q: "Does a reading of 4.2 V mean my 18650 is healthy?",
          a: "No. 4.2 V only tells you the charger finished. A cell that has lost half its capacity still charges to 4.2 V. Health shows up in how the cell behaves over time and under load: how fast it self-discharges, how far it sags with a load and, for the full picture, how many milliamp-hours it delivers in a timed discharge.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-lithium-battery-capacity-with-a-multimeter",
          title: "How to Test Lithium Battery Capacity",
          desc: "The timed discharge that turns current and time into a real mAh figure.",
        },
        {
          href: "/multimeters/how-to-test-a-battery-protection-circuit-with-a-multimeter",
          title: "How to Test a Battery Protection Circuit",
          desc: "Protected 18650s and packs have a BMS that can trip and read 0 V.",
        },
      ]}
    >
      <Callout title="18650 cells store a lot of energy">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            A shorted 18650 can deliver tens of amps and heat up in seconds. Keep the probes, loose wire ends and
            metal tools away from both ends at the same time, and take off rings and metal watch straps.
          </li>
          <li>
            A torn wrap is a short waiting to happen: the whole can is the negative terminal. Re-wrap the cell
            before testing or recycle it.
          </li>
          <li>
            Don&apos;t charge or load a cell that is swollen, dented, leaking, rusted or hot. Put it in a metal tin
            outdoors and take it to a battery drop-off point.
          </li>
          <li>
            Never leave a load test unattended, and work on a non-flammable surface. If a cell vents or smokes,
            move away and call 911 if anything nearby catches fire.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="what-health-means" className="text-xl font-semibold mb-3">
          What &quot;battery health&quot; means for an 18650
        </h2>
        <p className="text-muted leading-7 mb-4">
          An 18650 is a cylindrical lithium-ion cell 18 mm in diameter and 65 mm long, with a nominal voltage of
          3.6 or 3.7 V and a full-charge voltage of 4.2 V for most chemistries. As it ages, three things change.
          Its capacity shrinks, so it runs for less time. Its internal resistance rises, so its voltage drops more
          when you draw current and it warms up faster. And in some failures it develops an internal leak path,
          so it slowly drains itself even on a shelf.
        </p>
        <p className="text-muted leading-7">
          A multimeter can see all three, but not in a single reading. Capacity needs a long, timed discharge,
          which our{" "}
          <Link href="/multimeters/how-to-test-lithium-battery-capacity-with-a-multimeter" className={link}>
            lithium battery capacity test
          </Link>{" "}
          covers step by step. This page focuses on the faster checks that catch the dangerous and the clearly
          worn cells first: resting voltage, a one-week self-discharge check and an internal resistance estimate
          from voltage sag. Together they take about ten minutes of hands-on time spread over a week, and they
          tell you whether a cell is even worth a full capacity test.
        </p>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and likely causes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Flashlight dims fast, then cuts out", "High internal resistance", "Voltage sag test (step 4)", "Retire it from high-drain use"],
            ["Charged cell is flat a week later", "Internal micro-short (self-discharge)", "Self-discharge check (step 3)", "Recycle; don't reuse"],
            ["Cell reads 0 V or under 1 V", "Over-discharged, or protection board tripped", "Resting voltage; look for a PCB at the + end", "Protected cell: reset in charger. Bare cell: recycle"],
            ["Charger stops well short of 4.2 V", "Charger fault, or cell can't reach full", "Read the cell straight off the charger", "Try another charger; recycle if repeatable"],
            ["Cell gets hot on a modest load", "High resistance or internal damage", "Sag test; feel the can", "Stop using it"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="inspect">Inspect the cell before you connect anything</StepHeading>
        <p className="text-muted leading-7">
          Look at the wrap, the top cap and the bottom. Tears in the plastic sleeve, a dented can, rust, a sweet
          solvent smell or a crusty residue around the positive cap are all reasons to stop. Note the model
          printed on the wrap and look up its datasheet; it gives the rated capacity, the maximum continuous
          discharge current and the discharge cutoff voltage, all of which you will compare against. Check
          whether the cell is &quot;protected&quot;: a protected 18650 is usually a few millimeters longer and has
          a small circuit board under the wrap at one end, which changes how you read a 0 V result.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="resting-voltage">Read the resting voltage</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Charge the cell in a proper lithium charger until it finishes, then leave it alone for at least an hour.
          Set the meter to DC volts (the 6 V range if it has manual ranging), touch the red probe to the positive
          button and the black probe to the flat negative end, and write down the reading to three decimal
          places. A healthy Li-ion 18650 typically rests between about 4.15 and 4.20 V an hour after a full
          charge.
        </p>
        <Figure caption={<>Illustrative resting reading on a good 18650 one hour after the charger finished.</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="4.182" unit="V" mode="DC V  resting" />
            <p className="text-sm text-muted leading-6">
              Write it down with the date and time. You&apos;ll compare it against the same cell in seven days.
            </p>
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          If the cell came to you discharged, read it before charging too. A bare cell that rests below about
          2.5 V has spent time below its safe window; below about 2.0 V copper from the current collector can
          dissolve and later form internal shorts. Battery makers don&apos;t support recharging cells from that
          state, and the honest advice is to recycle them. A protected cell that reads 0 V usually has a tripped
          protection board rather than a dead cell; see the{" "}
          <Link href="/multimeters/how-to-test-a-battery-protection-circuit-with-a-multimeter" className={link}>
            battery protection circuit test
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={3} id="self-discharge">Run a one-week self-discharge check</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Put the fully charged cell somewhere cool and safe, out of any device, with nothing touching its ends.
          After seven days, read it again with the same meter. Lithium-ion cells have low self-discharge: makers
          typically quote a few percent per month at room temperature. Near full charge, where the voltage curve
          is fairly steep, that works out to a drop of only a few hundredths of a volt in a week.
        </p>
        <p className="text-muted leading-7 mb-4">
          A cell that loses 0.1 V or more in seven days is losing charge many times faster than normal. The usual
          reason is an internal micro-short, a tiny conductive path through the separator. These cells may still
          power a flashlight for now, but internal shorts are the failure mode behind many lithium fires, so they
          shouldn&apos;t go back into service. The illustrative results below compare three cells.
        </p>
        <Figure caption={<>Voltage lost over seven days from a full charge (illustrative). Cell A is normal; B is borderline, so repeat for another week; C has abnormal self-discharge.</>}>
          <BarChart
            items={[
              { label: "Cell A", value: 0.02, display: "0.02 V", highlight: true },
              { label: "Cell B", value: 0.06, display: "0.06 V" },
              { label: "Cell C", value: 0.21, display: "0.21 V" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={4} id="voltage-sag">Measure voltage sag to estimate internal resistance</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A multimeter&apos;s ohms range can&apos;t measure a cell&apos;s internal resistance, because the cell is a
          voltage source and the meter&apos;s test current is tiny. Instead, use Ohm&apos;s law on a voltage step.
          Put the cell in a holder, clip the meter across the holder terminals on DC volts, and note the resting
          reading. Then connect a known load, such as a 3.9 Ω, 10 W resistor, which draws about 4.1 V ÷ 3.9 Ω ≈
          1.05 A, and read the voltage in the first second or two.
        </p>
        <Figure caption={<>The instant drop when a load is connected is the internal resistance at work. The slow slope after it is the cell discharging.</>}>
          <VoltageSagDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4 mb-4">
          Divide the drop by the current: R = ΔV ÷ I. In the illustrative example above, 4.10 V falls to 3.98 V
          with about 1 A flowing, so R ≈ 0.12 V ÷ 1 A = 0.12 Ω, or 120 mΩ. That includes the holder and the
          wiring, so it is an upper bound. For a better current figure, put a second meter on DC amps in series
          with the resistor (our guide on{" "}
          <Link href="/multimeters/how-to-measure-milliamps-with-a-multimeter" className={link}>
            measuring current with a multimeter
          </Link>{" "}
          shows the connection). Disconnect the load after a few seconds; this is a pulse test, not a discharge.
        </p>
        <p className="text-muted leading-7">
          Datasheets for good 18650s typically quote AC internal resistance in the tens of milliohms. A DC sag
          test reads higher than an AC figure, so compare cells against each other on the same rig rather than
          against the datasheet number. A cell that sags two or three times as much as its siblings is the weak
          one, and in a series pack it is the cell that hits cutoff first and drags the whole pack down.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="score">Score the cell and decide</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Put the three results together. A cell that rests near 4.2 V, holds within a few hundredths of a volt
          for a week and sags no more than its matched siblings is healthy enough to be worth a capacity test.
          A cell that fails the self-discharge check is out regardless of the others. A cell that only fails the
          sag test can still serve in a low-drain job such as a remote or a small LED light, where it never has
          to deliver much current.
        </p>
        <Figure caption={<>The 18650 health check in order. Any red flag at an early step ends the test.</>}>
          <FlowDiagram
            steps={[
              { label: "Inspect", sub: "Wrap, dents, leaks" },
              { label: "Charge", sub: "Rest 1 h, read V" },
              { label: "Wait 7 days", sub: "Read V again" },
              { label: "Sag test", sub: "R = ΔV ÷ I" },
              { label: "Capacity", sub: "Only if it passed" },
            ]}
          />
        </Figure>
        <KeyIdea title="Health is behavior, not a voltage">
          Every working 18650 charges to about 4.2 V. A cell shows its health in how well it holds that voltage
          on a shelf and how little it drops when you ask it for current.
        </KeyIdea>
      </section>

      <section>
        <h2 id="health-table" className="text-xl font-semibold mb-3">18650 health thresholds at a glance</h2>
        <p className="text-muted leading-7 mb-4">
          These are typical guide values for Li-ion 18650s (NMC, NCA and similar chemistries) at room temperature.
          Your cell&apos;s datasheet overrides them, and LiFePO4 cells in the 18650 size follow a lower voltage
          scale entirely (about 3.6 V full, 3.2 V nominal).
        </p>
        <DataTable
          head={["Check", "Healthy", "Borderline", "Retire"]}
          rows={[
            ["Resting V, 1 h after full charge", "4.15–4.20 V", "4.05–4.15 V", "Won't reach 4.0 V"],
            ["Voltage lost over 7 days", "Under about 0.03 V", "0.03–0.1 V (repeat)", "0.1 V or more"],
            ["Resting V when found discharged", "Above about 3.0 V", "2.5–3.0 V", "Below about 2.5 V"],
            ["Sag at about 1 A vs matched cells", "Similar", "About 1.5× the others", "2× or more"],
            ["Capacity vs rating", "80% or more", "70–80%", "Under 70%"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The capacity row needs the timed test from the{" "}
          <Link href="/multimeters/how-to-test-lithium-battery-capacity-with-a-multimeter" className={link}>
            capacity guide
          </Link>
          . If your 18650s live in an e-bike or scooter pack, the{" "}
          <Link href="/multimeters/how-to-test-an-ebike-battery-with-a-multimeter" className={link}>
            e-bike battery test
          </Link>{" "}
          shows how to check a whole pack from its output before you open anything. For laptop packs, see{" "}
          <Link href="/multimeters/how-to-test-a-laptop-battery-with-a-multimeter" className={link}>
            how to test a laptop battery with a multimeter
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter to use for 18650 health checks</h2>
        <p className="text-muted leading-7 mb-6">
          The self-discharge and sag checks both depend on small voltage differences, so resolution matters more
          than anything else. A 6,000-count meter reads a 4 V cell to 1 mV on its 6 V range; a 4,000-count meter
          drops to its 40 V range above 4 V on many models and shows only 10 mV steps. Use the same meter for the
          day-one and day-seven readings so its own error cancels out. A second meter with a current range helps
          for the sag test.
        </p>
        <ProductStrip
          title="Meters for 18650 health checks"
          items={[
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR True RMS digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "6,000-count resolution with auto and manual ranging, so you can lock the range and read cell voltage to the millivolt.",
            },
            {
              name: "Fluke 15B+",
              image: fluke15.image,
              alt: "Fluke 15B+ digital multimeter",
              href: "/multimeters/fluke-15b-plus-review",
              note: "µA to 10A current ranges make it a good series ammeter for the sag test, alongside a voltage meter.",
            },
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 True RMS digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "True RMS with a 6,000-count backlit display: one durable meter for cell voltages and everyday electrical work.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
