import Link from "next/link";
import {
  BarChart,
  Callout,
  CircuitDiagram,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  MeterReadout,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const description =
  "Circuit drawing too much current? Measure supply current in series, power up on a current limit, then find the fault by heat, isolation and voltage drop.";

export const metadata = buildMetadata({
  title: "Circuit Drawing Too Much Current? How to Fix It",
  description,
  path: "/multimeters/circuit-drawing-too-much-current",
});

const all = getAllPicks("multimeters");
const astroai = all.find((p) => p.name === "AstroAI DM6000AR")!;
const ut61e = all.find((p) => p.name === "UNI-T UT61E+")!;
const fluke87v = all.find((p) => p.name === "Fluke 87V")!;

const link = "text-accent hover:underline";

/** Millivolt drop along a supply trace: largest on the stretch carrying the fault current. */
function TraceDropDiagram() {
  return (
    <svg
      viewBox="0 0 340 170"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram of a supply trace feeding three parts, with millivolt readings between points along the trace that are largest on the stretch leading to the shorted part and near zero beyond it"
    >
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        <line x1="20" y1="60" x2="320" y2="60" strokeWidth="4" />
        <line x1="20" y1="130" x2="320" y2="130" />
        <rect x="85" y="80" width="20" height="30" rx="2" />
        <line x1="95" y1="60" x2="95" y2="80" />
        <line x1="95" y1="110" x2="95" y2="130" />
        <rect x="185" y="80" width="20" height="30" rx="2" className="stroke-accent" strokeWidth="2.2" />
        <line x1="195" y1="60" x2="195" y2="80" />
        <line x1="195" y1="110" x2="195" y2="130" />
        <rect x="270" y="80" width="20" height="30" rx="2" />
        <line x1="280" y1="60" x2="280" y2="80" />
        <line x1="280" y1="110" x2="280" y2="130" />
      </g>
      <g className="fill-accent">
        <circle cx="40" cy="60" r="3" />
        <circle cx="150" cy="60" r="3" />
        <circle cx="195" cy="60" r="3" />
        <circle cx="310" cy="60" r="3" />
      </g>
      <g fontSize="10" className="fill-foreground">
        <text x="20" y="22">supply in (current limited)</text>
        <text x="20" y="148">ground</text>
        <text x="211" y="99" className="fill-accent">short</text>
      </g>
      <g fontSize="9.5" textAnchor="middle" className="fill-muted">
        <text x="95" y="48">8 mV</text>
        <text x="172" y="48" className="fill-accent">4 mV</text>
        <text x="252" y="48">≈ 0 mV</text>
      </g>
      <text x="170" y="164" fontSize="9.5" textAnchor="middle" className="fill-muted">
        Illustrative: the drop stops where the fault current leaves the rail
      </text>
    </svg>
  );
}

export default function CircuitDrawingTooMuchCurrentPage() {
  return (
    <HowToShell
      title="Why Does My Electronic Circuit Draw Too Much Current? How to Troubleshoot It"
      description={description}
      path="/multimeters/circuit-drawing-too-much-current"
      category="multimeters"
      published="2026-10-24"
      updated="2026-10-25"
      intro={
        <>
          An electronic circuit draws too much current because something is giving the supply an easier path
          than the design intended: most often a shorted capacitor, a part fitted backwards, a solder bridge, a
          failed regulator or simply more load than you budgeted for. To fix it, measure the real current,
          compare it with what the circuit should need, then power the board from a current-limited supply and
          narrow the fault down by heat, by isolating sections and by small voltage drops along the copper. The
          current limit is what keeps the fault from destroying more parts while you look.
        </>
      }
      aside={{
        image: astroai.image,
        alt: "AstroAI DM6000AR digital multimeter",
        caption: (
          <>
            You need DC current, DC millivolts and resistance or continuity, which most digital multimeters
            provide. See our{" "}
            <Link href="/multimeters/astroai-dm6000ar-review" className={link}>
              AstroAI DM6000AR review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "causes", label: "Causes at a glance" },
        { id: "measure-supply-current", label: "Measure the supply current" },
        { id: "current-budget", label: "Work out the expected budget" },
        { id: "current-limited-supply", label: "Power up on a current limit" },
        { id: "fault-power", label: "Why the limit matters: P = I²R" },
        { id: "find-it-by-heat", label: "Find the hot spot" },
        { id: "split-the-circuit", label: "Split the circuit" },
        { id: "trace-voltage-drop", label: "Follow the voltage drop" },
        { id: "confirm", label: "Repair and confirm" },
        { id: "meters", label: "Meters for current work" },
      ]}
      faq={[
        {
          q: "How much extra current is too much?",
          a: "There is no universal threshold. Compare the reading with your own budget built from datasheet figures. A reading 10 to 30% above the estimate may only mean parts are drawing nearer their maximum figures, while a reading several times higher, one pinned at the supply's current limit, or one that keeps rising as the board warms points to a real fault that needs finding.",
        },
        {
          q: "Why does my circuit draw too much current only after it warms up?",
          a: "Leakage in semiconductors and some capacitors increases with temperature, and a marginal part can tip into failure once warm. A regulator running near its thermal limit or an oscillation that appears as parts heat can also do it. Log the current over time with a meter's Min/Max mode and use the heat-finding methods on the suspect area once the rise begins.",
        },
        {
          q: "Can I find a short with the power off?",
          a: "Often, yes. Measuring resistance between the supply rail and ground with the circuit unpowered shows whether a hard short exists, and low-ohm readings across different parts of the board can help locate it. Large capacitors on the rail read low briefly while they charge from the meter, so let the reading settle and test with the probes both ways round.",
        },
        {
          q: "Will a current-limited supply protect every component?",
          a: "It limits damage but doesn't guarantee safety. A small part directly across the rail can still overheat at currents the limit allows, since 1 A through a 1 Ω fault is still 1 W. Output capacitors on the supply can also deliver a brief surge before the limit takes over. Start with a low limit, connect before switching on, and raise it in small steps.",
        },
        {
          q: "Why does my multimeter blow its fuse when I measure current?",
          a: "On the amps or milliamps jack the meter is a near short circuit, so placing it across a supply, rather than in series, drives a large current through the fuse. A fault current above the range rating does the same. Start on the highest current range, break the circuit so the meter sits in series, and only then switch down to the mA range.",
        },
        {
          q: "What does it mean when my bench supply shows CC?",
          a: "CC means constant current: the load is trying to draw more than the current limit you set, so the supply holds the current at that limit and lets the voltage fall. On a working circuit it means the limit is set too low. On a faulty board that should draw far less, it confirms excess current, and the collapsed voltage tells you roughly how hard the short is.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-check-a-pcb-for-a-short-circuit-with-a-multimeter",
          title: "How to Check a PCB for a Short Circuit",
          desc: "Unpowered resistance and continuity methods for locating a short on a board.",
        },
        {
          href: "/multimeters/how-to-measure-current-consumption-of-an-arduino-with-a-multimeter",
          title: "How to Measure Arduino Current Consumption",
          desc: "Series current measurement applied to a common microcontroller board.",
        },
      ]}
    >
      <Callout title="Limit the energy before you look for the fault">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            A board that draws too much current can heat a part quickly enough to burn fingers, crack a package
            or split a capacitor. Keep your face away from the board on first power-up and wear eye protection.
          </li>
          <li>
            Don&apos;t try these methods on mains-powered circuits unless you are trained to do so. Work on the
            low-voltage side, powered from a bench supply or batteries.
          </li>
          <li>
            Lithium batteries can deliver tens of amps into a short. Never use one as the supply while hunting a
            fault; use a current-limited bench supply instead.
          </li>
          <li>
            Polarized electrolytic and tantalum capacitors fitted backwards can vent or ignite. Disconnect power at
            the first sign of smoke or a smell of burning.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Causes at a glance</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Supply in CC at once, rail near 0 V", "Shorted decoupling or bulk capacitor", "Rail-to-ground ohms with power off; hot spot at low limit", "Replace the capacitor"],
            ["Part hot within seconds of power-up", "Polarized part fitted backwards", "Check orientation marks on electrolytics, tantalums, diodes, ICs", "Refit the right way; replace if stressed"],
            ["High draw on a newly built board", "Solder bridge", "Inspect fine-pitch pins under magnification; beep pin to pin", "Remove with flux and wick"],
            ["Regulator very hot; output wrong", "Failed or overloaded regulator", "Measure its input and output voltage; lift its output", "Replace; check what it feeds"],
            ["Sudden high draw that clears on power cycle", "CMOS latch-up", "Note what happened just before (spike, hot-plugging)", "Fix the input or supply sequencing that triggers it"],
            ["Draw an order of magnitude off", "Wrong part value or pinout", "Compare markings with the bill of materials", "Fit the correct part"],
            ["Everything works but draw exceeds budget", "Excess load", "Add up motor, LED and module currents", "Larger supply, or reduce the load"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Solder bridges are one of the most frequent causes on newly assembled boards; our guide to{" "}
          <Link href="/soldering-irons/how-to-prevent-solder-bridges" className={link}>
            preventing solder bridges
          </Link>{" "}
          covers why they form and how to clear them. If you already know the board has a hard short with the
          power off, start with{" "}
          <Link href="/multimeters/how-to-check-a-pcb-for-a-short-circuit-with-a-multimeter" className={link}>
            how to check a PCB for a short circuit
          </Link>{" "}
          instead; this page is about boards that power up but pull more than they should.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="measure-supply-current">Measure the supply current</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Break the positive supply lead and put the multimeter in series, starting on the highest current
          range (often 10 A) and moving down only once you know the reading fits the lower range. Our guide to{" "}
          <Link href="/multimeters/how-to-measure-milliamps-with-a-multimeter" className={link}>
            measuring milliamps with a multimeter
          </Link>{" "}
          covers jack selection and fusing, and the walkthrough on{" "}
          <Link href="/multimeters/how-to-measure-current-consumption-of-an-arduino-with-a-multimeter" className={link}>
            measuring an Arduino&apos;s current consumption
          </Link>{" "}
          shows the same method on a real board.
        </p>
        <Figure
          caption={
            <>
              All of the circuit&apos;s current passes through the meter. If the bench supply has its own current
              display, use the meter to confirm it at low currents, where supply readouts are often coarse.
            </>
          }
        >
          <CircuitDiagram
            mode="series"
            meter="A"
            source="Bench supply"
            load="Circuit"
            note="Meter in the positive lead, highest current range first"
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Keep in mind that the meter&apos;s shunt drops a little voltage (its burden voltage), which grows with
          current. On a 3.3 V circuit drawing hundreds of milliamps that drop can be large enough to upset the
          circuit, so if the board misbehaves only with the meter in place, move up a range or measure the drop
          across a known resistor instead.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="current-budget">Work out the expected current budget</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A reading only means something against an expectation. Add up the typical supply current of each
          active part from its datasheet, the current through LEDs and their resistors, any pull-ups held low,
          and the quiescent current of each regulator. LED current is simple Ohm&apos;s law: a red LED with
          about 2 V across it, fed from 5 V through 330 Ω, draws (5 − 2) ÷ 330 ≈ 9.1 mA. A 10 kΩ pull-up held low
          at 5 V draws 5 ÷ 10,000 = 0.5 mA. Note which loads switch on later, such as motors, relays or radio
          transmitters, because their current arrives in bursts.
        </p>
        <DataTable
          head={["Item (illustrative 5 V board)", "Working", "Current"]}
          rows={[
            ["Microcontroller, running", "From its datasheet (example figure)", "15 mA"],
            ["2 × red LEDs on 330 Ω", "2 × (5 − 2) ÷ 330", "18.2 mA"],
            ["4 × 10 kΩ pull-ups held low", "4 × 5 ÷ 10,000", "2 mA"],
            ["Sensor module", "From its datasheet (example figure)", "5 mA"],
            ["Regulator quiescent current", "From its datasheet (example figure)", "5 mA"],
            ["Expected total", "Sum of the above", "≈ 45 mA"],
          ]}
          mono={[1, 2]}
        />
        <p className="text-muted leading-7 mt-4">
          With a budget of about 45 mA, a reading of 50 to 55 mA is unremarkable. A reading of 312 mA, seven
          times the budget, is a fault. If the supply is pinned at its limit with the voltage collapsed, the
          fault is a hard short rather than a part drawing a bit too much.
        </p>
        <div className="mt-4 grid sm:grid-cols-2 gap-4 items-center">
          <Figure caption={<>Illustrative value: roughly what the budget predicts for a healthy board.</>}>
            <MeterReadout value="47.6" unit="mA DC" mode="A⎓  in series" />
          </Figure>
          <Figure caption={<>Illustrative value: seven times the budget means something is wrong.</>}>
            <MeterReadout value="312" unit="mA DC" mode="A⎓  in series" />
          </Figure>
        </div>
      </section>

      <section>
        <StepHeading n={3} id="current-limited-supply">Power up on a current-limited supply</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set a bench supply to the circuit&apos;s voltage, set the current limit only a little above your
          budget (for the example board, perhaps 60 to 100 mA), then connect the board. If the supply drops into
          constant-current mode (usually shown by a CC indicator) and the voltage collapses, the board is drawing
          more than the limit. Raise the limit in small steps while watching for heat, rather than jumping
          straight to the full value. A low limit lets a fault reveal itself without vaporizing the evidence.
        </p>
        <Figure
          caption={
            <>
              Below the limit the supply holds its set voltage. When the load tries to draw more, the supply
              switches to constant current and the voltage falls to whatever the faulty load allows.
            </>
          }
        >
          <svg
            viewBox="0 0 300 160"
            className="w-full h-auto"
            role="img"
            aria-label="Graph of a bench supply output: voltage stays constant as current rises until the current limit, then the supply switches to constant current and the voltage falls"
          >
            <g className="stroke-foreground" strokeWidth="1.4" fill="none">
              <line x1="40" y1="130" x2="280" y2="130" />
              <line x1="40" y1="130" x2="40" y2="15" />
            </g>
            <path d="M40 40 L200 40 L200 130" className="stroke-accent" strokeWidth="2.2" fill="none" />
            <line x1="200" y1="20" x2="200" y2="130" className="stroke-muted" strokeWidth="1" strokeDasharray="3 3" />
            <text x="120" y="33" fontSize="9" textAnchor="middle" className="fill-foreground">constant voltage</text>
            <text x="206" y="88" fontSize="9" className="fill-foreground">constant</text>
            <text x="206" y="100" fontSize="9" className="fill-foreground">current</text>
            <text x="200" y="146" fontSize="9" textAnchor="middle" className="fill-accent">current limit</text>
            <text x="270" y="146" fontSize="9" textAnchor="middle" className="fill-muted">I</text>
            <text x="30" y="24" fontSize="9" textAnchor="middle" className="fill-muted">V</text>
          </svg>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The collapsed voltage is itself a clue. In CC mode the supply voltage equals the limit current times
          the fault&apos;s resistance, so R = V ÷ I. If the supply shows 0.10 V at a 1 A limit, the path to ground
          is about 0.10 ÷ 1 = 0.1 Ω: a dead short such as a failed capacitor. If it shows 3.0 V at 1 A, the load is
          about 3 Ω, more like an overloaded regulator or a part partly conducting.
        </p>
      </section>

      <section>
        <h2 id="fault-power" className="text-xl font-semibold mb-3">Why the limit matters: P = I²R</h2>
        <p className="text-muted leading-7 mb-4">
          The heat in a fault grows with the square of the current, P = I²R. Take an illustrative 1 Ω fault. At a
          0.1 A limit it dissipates 0.1² × 1 = 0.01 W, barely warm. At 1 A it is 1 W, enough to make a small
          part noticeably hot. At 3 A it is 9 W, enough to scorch a board. Small surface-mount resistors are
          commonly rated around 0.1 W (0603) to 0.25 W (1206), so a few watts concentrated in one part does real
          damage in seconds. Tripling the current makes nine times the heat.
        </p>
        <Figure caption={<>Heat in an illustrative 1 Ω fault at different current limits, from P = I²R.</>}>
          <BarChart
            items={[
              { label: "0.1 A limit", value: 0.01, display: "0.01 W" },
              { label: "0.5 A limit", value: 0.25, display: "0.25 W" },
              { label: "1 A limit", value: 1, display: "1 W", highlight: true },
              { label: "2 A limit", value: 4, display: "4 W" },
              { label: "3 A limit", value: 9, display: "9 W" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The aim is enough current to make the faulty part warmer than its neighbors, and no more. Start low,
          and raise the limit only until you can find the hot spot.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="find-it-by-heat">Find the hot spot</StepHeading>
        <p className="text-muted leading-7">
          The excess current turns into heat in the faulty part, so with the board powered at a safe current
          limit, look for where that heat appears. A careful fingertip near (not on) components works for
          low-voltage boards. Freeze spray frosts the board and melts first over the hot part. A thin film of
          isopropyl alcohol does the same in reverse, evaporating fastest where the board is warmest. A thermal
          camera shows the whole board at once and is the quickest option if you have one. Check the obvious
          candidates first: regulators, input protection diodes and the capacitors nearest the power input.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="split-the-circuit">Split the circuit</StepHeading>
        <p className="text-muted leading-7">
          If the hot spot isn&apos;t obvious, divide and conquer. Remove jumpers, zero-ohm links, ferrite beads or
          plug-in modules that separate one section from another, then power each part alone and compare its
          current with the matching lines of your budget. On a board with no links, lifting one pin of a series
          component or a regulator output can isolate a branch. Each split halves the area you have to search, so
          even a dense board usually yields in four or five steps. Unpowered resistance checks help here too.
        </p>
      </section>

      <section>
        <StepHeading n={6} id="trace-voltage-drop">Follow the voltage drop along the trace</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Copper traces have a small resistance, so heavy fault current produces a few millivolts of drop along
          them. Standard 1 oz copper is roughly 0.5 mΩ per square, so a trace 0.5 mm wide and 8 mm long (16
          squares) is about 8 mΩ. At a 1 A limit that gives 1 × 0.008 = 8 mV, easy to see on a meter&apos;s mV range.
          With the supply held at its current limit, set the meter to its most sensitive DC millivolt range and
          measure between points along the supply trace. The drop is largest on the stretch that carries the
          fault current and falls to zero past the point where the current leaves the rail, which leads you to
          the shorted component.
        </p>
        <Figure caption={<>Measure millivolts between points along the rail while the supply sits at its current limit. Illustrative values.</>}>
          <TraceDropDiagram />
        </Figure>
      </section>

      <section>
        <StepHeading n={7} id="confirm">Repair and confirm</StepHeading>
        <p className="text-muted leading-7">
          Replace the faulty part, then power up again on a low current limit and compare with the budget. A
          board can hide more than one fault, and a part that failed short may have taken its regulator or a
          trace with it. If the draw is now normal but the board still doesn&apos;t work, check the rails with
          the guide to{" "}
          <Link href="/multimeters/how-to-measure-a-voltage-regulator-output-with-a-multimeter" className={link}>
            measuring a voltage regulator&apos;s output
          </Link>
          , and repair any lifted copper with{" "}
          <Link href="/soldering-irons/how-to-repair-a-pcb-trace-using-solder-and-jumper-wire" className={link}>
            a solder and jumper-wire trace repair
          </Link>
          .
        </p>
      </section>

      <KeyIdea title="Budget, limit, locate">
        Know the current the board should draw, never power a suspect board without a limit set just above
        that number, and use heat, isolation and millivolt drops to walk to the fault. Confirming that the
        current returns to the budget after the repair is the only proof that the problem is gone.
      </KeyIdea>

      <section>
        <h2 id="meters" className="text-xl font-semibold mb-3">Meters for current work</h2>
        <p className="text-muted leading-7 mb-4">
          Any meter with DC current, millivolt and resistance ranges can follow this method. Finer resolution
          helps with small trace drops and low-ohm checks. These picks come from our verified multimeter list.
        </p>
        <ProductStrip
          title="Meters for budgets, current limits and millivolt drops"
          items={[
            {
              name: "AstroAI DM6000AR",
              image: astroai.image,
              alt: "AstroAI DM6000AR digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "True RMS, 6,000-count, auto and manual ranging. No CAT rating stated, so it suits low-voltage boards.",
            },
            {
              name: "UNI-T UT61E+",
              image: ut61e.image,
              alt: "UNI-T UT61E+ True RMS digital multimeter",
              href: "/multimeters/best-multimeters-for-electronics-repair#uni-t-ut61e+",
              note: "22,000-count with 0.01 µA and 0.01 Ω resolution, REL mode and a USB PC link. Burden voltage not published.",
            },
            {
              name: "Fluke 87V",
              image: fluke87v.image,
              alt: "Fluke 87V industrial True RMS multimeter",
              href: "/multimeters/fluke-87v-review",
              note: "True RMS with a 19,999-count high-resolution mode and an analog bar graph for changing readings. Hands-on Tested.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
