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
  "Test a refrigerator defrost heater with a multimeter: work out the expected ohms from its wattage, check continuity and insulation, and find an open element.";

export const metadata = buildMetadata({
  title: "How to Test a Refrigerator Defrost Heater",
  description,
  path: "/multimeters/how-to-test-a-refrigerator-defrost-heater-with-a-multimeter",
});

const fluke115 = picks.find((p) => p.name === "Fluke 115")!;
const fluke106 = picks.find((p) => p.name === "Fluke 106")!;
const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;

const link = "text-accent hover:underline";

/** Two heater types and the two measurements: terminal-to-terminal and terminal-to-sheath. */
function HeaterTestDiagram() {
  return (
    <svg
      viewBox="0 0 380 220"
      className="w-full h-auto"
      role="img"
      aria-label="Two multimeter tests on a defrost heater. Test A puts the probes on the heater's two terminals and should show a steady resistance of a few tens of ohms on a 120 volt heater; OL means the element is broken. Test B puts one probe on a terminal and the other on the metal sheath or mounting bracket and should read OL; any resistance there means the element is leaking to the metal casing."
    >
      {/* heater body */}
      <rect x="60" y="80" width="260" height="26" rx="13" className="fill-surface stroke-foreground" strokeWidth="2" />
      <polyline points="78,93 90,86 102,100 114,86 126,100 138,86 150,100 162,86 174,100 186,86 198,100 210,86 222,100 234,86 246,100 258,86 270,100 282,86 302,93" fill="none" className="stroke-accent" strokeWidth="1.6" />
      <text x="190" y="72" fontSize="9" textAnchor="middle" className="fill-muted">resistance wire inside a glass tube or metal sheath</text>
      {/* terminals */}
      <line x1="60" y1="93" x2="30" y2="93" className="stroke-foreground" strokeWidth="2" />
      <line x1="320" y1="93" x2="350" y2="93" className="stroke-foreground" strokeWidth="2" />
      <circle cx="30" cy="93" r="4" className="fill-foreground" />
      <circle cx="350" cy="93" r="4" className="fill-foreground" />
      {/* bracket */}
      <rect x="170" y="106" width="40" height="14" className="fill-muted" opacity="0.5" />
      <text x="190" y="134" fontSize="8" textAnchor="middle" className="fill-muted">sheath / bracket</text>
      {/* test A */}
      <path d="M30 97 L 30 160 L 110 160" fill="none" className="stroke-accent" strokeWidth="1.5" strokeDasharray="4 3" />
      <path d="M350 97 L 350 160 L 270 160" fill="none" className="stroke-accent" strokeWidth="1.5" strokeDasharray="4 3" />
      <rect x="110" y="146" width="160" height="28" rx="6" className="fill-surface stroke-accent" strokeWidth="1.6" />
      <text x="190" y="164" fontSize="10" textAnchor="middle" className="fill-accent" fontWeight="700">A: terminal to terminal = ohms</text>
      {/* test B */}
      <path d="M30 89 L 30 30 L 120 30" fill="none" className="stroke-foreground" strokeWidth="1.5" strokeDasharray="4 3" />
      <rect x="120" y="16" width="160" height="28" rx="6" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <text x="200" y="34" fontSize="10" textAnchor="middle" className="fill-foreground" fontWeight="700">B: terminal to sheath = OL</text>
      <path d="M280 30 L 300 30 L 300 52 L 200 52 L 200 106" fill="none" className="stroke-foreground" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="190" y="205" fontSize="9" textAnchor="middle" className="fill-muted">Unplug the refrigerator and disconnect the heater before both tests</text>
    </svg>
  );
}

export default function HowToTestARefrigeratorDefrostHeaterPage() {
  return (
    <HowToShell
      title="How to Test a Refrigerator Defrost Heater With a Multimeter"
      description={description}
      published="2026-11-18"
      path="/multimeters/how-to-test-a-refrigerator-defrost-heater-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a refrigerator defrost heater with a multimeter, unplug the fridge, disconnect the heater and measure
          the resistance across its two terminals: a good heater shows a steady value close to its rated voltage squared
          divided by its wattage, which on a 120 V heater usually works out to a few tens of ohms, while OL means the
          element is broken. Then check from each terminal to the metal sheath or bracket, which should read OL. An open
          heater is one of the most common reasons a frost-free refrigerator ices up its coil and stops cooling the
          fresh-food section. Below is how to calculate the right number for your heater, take both readings, and
          rule out the rest of the defrost circuit.
        </>
      }
      aside={{
        image: fluke115.image,
        alt: "Fluke 115 digital multimeter for measuring heater resistance",
        caption: (
          <>
            Any meter with a 0 to 200 Ω or auto-ranging ohms function works; the Fluke 115 adds a quick continuity
            beeper. See our{" "}
            <Link href="/multimeters/fluke-115-review" className={link}>
              Fluke 115 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-it-works", label: "What the defrost heater does" },
        { id: "causes", label: "Symptoms and likely causes" },
        { id: "calculate", label: "1. Calculate the expected resistance" },
        { id: "unplug", label: "2. Unplug and reach the heater" },
        { id: "resistance", label: "3. Measure terminal to terminal" },
        { id: "insulation", label: "4. Check terminal to sheath" },
        { id: "harness", label: "5. Test the loop from the harness" },
        { id: "replace", label: "6. Replace and verify" },
        { id: "chart", label: "Resistance by heater wattage" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "What should a defrost heater read on a multimeter?",
          a: "It should read a definite, steady resistance close to the rated voltage squared divided by the rated watts. A 120 V, 400 W heater works out to 36 Ω, for example, and a 600 W one to 24 Ω. Use the wattage printed on your heater or listed in the parts catalog. OL means the element is broken, and near 0 Ω suggests a short.",
        },
        {
          q: "How do I know if my defrost heater is bad?",
          a: "Thick, even frost covering the whole evaporator coil, a fresh-food section that slowly warms while the freezer stays fairly cold, and an evaporator fan that sounds muffled or scrapes ice are the classic signs. Confirm with the meter: a heater reading OL across its terminals is open and needs replacing. A heater with continuity to its metal sheath should also be replaced.",
        },
        {
          q: "Can I test the defrost heater without removing it?",
          a: "Usually yes. Once the rear freezer panel is off you can disconnect the heater's two wire connectors and measure across them with the heater still in place. On some models you can measure through the harness at the control board or timer instead, but that reading also includes the defrost thermostat, which is only closed when it is cold.",
        },
        {
          q: "Does a defrost heater read differently when hot?",
          a: "Slightly. The resistance wire in most heating elements is a nickel-chromium alloy chosen because its resistance changes little with temperature, so a cold reading lands close to the value calculated from the rating. Expect it to be within roughly 10 percent of the calculated figure rather than exact, and judge an OL or near-zero reading as the clear fault.",
        },
        {
          q: "Why does my new defrost heater not fix the frost problem?",
          a: "Because the heater is only one part of a series loop. If the defrost thermostat stays open, the timer or control board never enters defrost, or a thermal fuse in the loop has blown, the new heater never gets power. Test the thermostat when cold, check any thermal fuse, and confirm the timer or board actually switches to defrost.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-refrigerator-defrost-thermostat-with-a-multimeter",
          title: "How to Test a Refrigerator Defrost Thermostat",
          desc: "The temperature switch in series with the heater, and how to chill it for a valid test.",
        },
        {
          href: "/multimeters/how-to-measure-resistance-of-a-heating-element-with-a-multimeter",
          title: "How to Measure a Heating Element's Resistance",
          desc: "The general method and the watts-to-ohms math for any heater.",
        },
      ]}
    >
      <Callout title="Unplug the refrigerator first">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            The defrost heater runs on 120 V AC. Unplug the refrigerator rather than relying on the temperature control,
            and never measure resistance on a circuit that has power.
          </li>
          <li>
            A heater that has just run can be hot. Give it a few minutes before touching it, and handle glass-tube
            heaters gently because the tube can crack.
          </li>
          <li>
            Don&apos;t chip ice off the evaporator with a sharp tool. A punctured tube releases refrigerant and ends in a
            sealed-system repair.
          </li>
          <li>
            Scorched wiring, a melted connector or a heater that tripped the breaker means a short to ground. Leave the
            fridge unplugged and get an appliance technician.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="how-it-works" className="text-xl font-semibold mb-3">What the defrost heater does</h2>
        <p className="text-muted leading-7 mb-4">
          In a frost-free refrigerator, moisture in the air freezes onto the evaporator coil every time the door opens.
          Several times a day, a timer or control board pauses cooling and powers a defrost heater mounted under or along
          the coil. The heater melts the frost, the water runs down a drain to a pan near the compressor, and a defrost
          thermostat in series with the heater switches it off once the coil is clear. When the heater fails open, frost
          keeps building until air can no longer flow through the coil.
        </p>
        <p className="text-muted leading-7 mb-4">
          Most household defrost heaters fall into three families. Glass-tube radiant heaters run a coiled resistance
          wire inside a quartz or glass tube under the coil. Metal-sheath heaters, sometimes called calrod style, are a
          bent metal tube woven through the coil. Foil heaters bond a resistance wire to aluminum tape on the coil. All
          three test the same way with a meter.
        </p>
        <Figure caption={<>Two checks on a disconnected heater: resistance between the terminals, and OL from each terminal to the metal sheath or bracket.</>}>
          <HeaterTestDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and likely causes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Whole coil frosted solid, fridge warm", "Open defrost heater", "Terminal-to-terminal ohms (step 3)", "Replace the heater"],
            ["Coil frosted, heater reads correct ohms", "Thermostat open or no defrost signal", "Cold thermostat test; timer", "Thermostat, timer or board"],
            ["Breaker or GFCI trips during defrost", "Heater shorted to its sheath", "Terminal-to-sheath (step 4)", "Replace heater; check wiring"],
            ["Frost only on the bottom of the coil", "Partly blocked drain or weak defrost", "Pour warm water into the drain", "Clear the drain; check heater"],
            ["Ice in the freezer floor", "Frozen defrost drain", "Look for ice in the trough", "Thaw and clear the drain"],
            ["Heater reads correct, fuse in loop open", "Blown thermal fuse or limiter", "Continuity on the fuse", "Replace fuse; find why it blew"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="calculate">Calculate the expected resistance</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Find the heater&apos;s rated voltage and wattage. They are often printed on the heater or its label, and
          always listed in the replacement part&apos;s specifications. Because power equals voltage squared divided by
          resistance, the expected resistance is R = V² ÷ P. For a 120 V, 400 W heater: 120 × 120 = 14,400, and
          14,400 ÷ 400 = 36 Ω. For a 120 V, 600 W heater, 14,400 ÷ 600 = 24 Ω. Write your number down before you
          measure, so a reading that looks plausible but is far off still stands out.
        </p>
        <p className="text-muted leading-7">
          The same arithmetic is explained for ovens, water heaters and other elements in{" "}
          <Link href="/multimeters/how-to-measure-resistance-of-a-heating-element-with-a-multimeter" className={link}>
            how to measure the resistance of a heating element
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={2} id="unplug">Unplug the refrigerator and reach the heater</StepHeading>
        <p className="text-muted leading-7">
          Unplug the refrigerator and move food to a cooler. Remove the freezer shelves and the rear panel covering the
          evaporator; on bottom-freezer models this is usually behind the drawer. The heater sits along the bottom of the
          coil or woven through it, with two wires ending in push-on connectors. If the coil is a block of ice, let it
          melt naturally or with a fan before you work on the connectors.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="resistance">Measure terminal to terminal</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Disconnect both heater wires. Touch your meter probes together on the ohms range and note the lead reading,
          then place one probe on each heater terminal. A good heater shows a steady value close to your calculation,
          typically within about 10 percent. OL means the resistance wire is broken, often visibly at a cracked glass
          tube or a corroded end. A reading of only an ohm or two on a heater rated a few hundred watts suggests a short
          inside it.
        </p>
        <Figure caption={<>Illustrative reading on a 120 V, 400 W heater, close to the calculated 36 Ω, beside an open element.</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="35.4" unit="Ω" mode="Ω  good heater" />
            <MeterReadout value="OL" unit="Ω" mode="Ω  open element" />
          </div>
        </Figure>
      </section>

      <section>
        <StepHeading n={4} id="insulation">Check from each terminal to the sheath</StepHeading>
        <p className="text-muted leading-7">
          Keep the meter on its highest ohms range. Place one probe on a heater terminal and the other on the metal
          sheath, end cap or mounting bracket, and repeat for the other terminal. Both should read OL. Any measurable
          resistance means the element is leaking to its casing, which can trip a GFCI or breaker during defrost and is
          a reason to replace the heater even if its main resistance is fine. A glass-tube heater has no metal sheath, but
          check to its metal end clips the same way.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="harness">Test the whole loop from the harness</StepHeading>
        <p className="text-muted leading-7">
          On many models you can measure the complete defrost loop at the timer or control board connector. With the
          coil still frozen, the defrost thermostat is closed, so the loop should read close to the heater&apos;s
          resistance. If the heater alone reads correctly but the loop reads OL, the thermostat, a thermal fuse or a
          wire in between is open. Our{" "}
          <Link href="/multimeters/how-to-test-a-refrigerator-defrost-thermostat-with-a-multimeter" className={link}>
            defrost thermostat guide
          </Link>{" "}
          covers how to chill that part for a valid test.
        </p>
      </section>

      <section>
        <StepHeading n={6} id="replace">Replace the heater and verify</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Order the exact replacement for your model number, since length, mounting and wattage vary. Many replacement
          heaters come with new wire connectors. Fit it in the same position, reconnect, replace the panel and plug the
          refrigerator in. After a day, look at the coil: a working defrost system leaves only a light, even frost. If the
          heater tested good, the problem lies with the thermostat or control instead.
        </p>
        <Figure caption={<>Defrost heater test order: calculate, isolate, measure, check insulation, then prove the loop.</>}>
          <FlowDiagram
            steps={[
              { label: "Calculate", sub: "R = V² ÷ P" },
              { label: "Isolate", sub: "Unplug, disconnect" },
              { label: "Ohms", sub: "Close to calculated" },
              { label: "Sheath", sub: "Should read OL" },
              { label: "Loop", sub: "Thermostat and fuse" },
            ]}
          />
        </Figure>
        <KeyIdea title="Know the number before you measure">
          The heater&apos;s wattage tells you what a good heater should read. A steady value near V² ÷ P is good,
          OL is open, and any reading from a terminal to the metal sheath is a reason to replace it.
        </KeyIdea>
      </section>

      <section>
        <h2 id="chart" className="text-xl font-semibold mb-3">Expected resistance by heater wattage at 120 V</h2>
        <p className="text-muted leading-7 mb-4">
          The bars below are worked examples from R = V² ÷ P at 120 V, not values for a particular model. Use them to
          sanity-check your own reading once you know your heater&apos;s rated wattage. Notice that higher wattage means
          lower resistance, which surprises many people: a lower resistance lets more current flow at the same voltage.
        </p>
        <Figure caption={<>Calculated resistance for 120 V heaters of common sizes (R = 14,400 ÷ watts). Worked examples; check your heater&apos;s rating.</>}>
          <BarChart
            items={[
              { label: "250 W", value: 57.6, display: "57.6 Ω" },
              { label: "350 W", value: 41.1, display: "41.1 Ω" },
              { label: "400 W", value: 36, display: "36 Ω", highlight: true },
              { label: "500 W", value: 28.8, display: "28.8 Ω" },
              { label: "600 W", value: 24, display: "24 Ω" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The current follows from Ohm&apos;s law: a 400 W heater on 120 V draws 400 ÷ 120 ≈ 3.3 A while it runs. That
          is well within a typical kitchen circuit, which is why a defrost heater that trips a breaker is almost always
          shorted rather than simply drawing its normal load.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter to use on a defrost heater</h2>
        <p className="text-muted leading-7 mb-6">
          Any digital meter with an ohms range reads a defrost heater accurately enough. A high top resistance range helps
          the terminal-to-sheath check, and a backlight helps inside a dark freezer. Our{" "}
          <Link href="/multimeters/best-multimeter-for-home-use" className={link}>
            home-use multimeter guide
          </Link>{" "}
          compares more options.
        </p>
        <ProductStrip
          title="Meters for refrigerator heater testing"
          items={[
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 True RMS digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "Auto-ranging ohms, a quick continuity beeper and True RMS AC volts at CAT III 600V for the outlet checks too.",
            },
            {
              name: "Fluke 106",
              image: fluke106.image,
              alt: "Fluke 106 palm-sized digital multimeter",
              href: "/multimeters/fluke-106-review",
              note: "Compact CAT III 600V meter with resistance to 40 MΩ, enough range for the terminal-to-sheath leakage check.",
            },
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR True RMS digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "Budget 6,000-count meter with auto and manual ranging; resolves a heater's tens of ohms clearly for occasional repairs.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
