import Link from "@/components/AppLink";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  InfoCards,
  KeyIdea,
  MeterReadout,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to test a dryer thermostat with a multimeter: unplug the 240 V dryer, check the cycling and high-limit thermostats for continuity and read the results.";

export const metadata = buildMetadata({
  title: "How to Test a Dryer Thermostat With a Multimeter",
  description,
  path: "/multimeters/how-to-test-a-dryer-thermostat-with-a-multimeter",
});

const fluke115 = picks.find((p) => p.name === "Fluke 115")!;
const fluke17b = picks.find((p) => p.name === "Fluke 17B+")!;
const kaiweets = picks.find((p) => p.name === "KAIWEETS KM200s")!;

const link = "text-accent hover:underline";

/** Series heating circuit of an electric dryer: L1, high-limit, cycling thermostat, element, motor switch, L2. */
function DryerHeatCircuitDiagram() {
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full h-auto"
      role="img"
      aria-label="How to test a dryer thermostat: simplified electric dryer heating circuit. Current flows from L1 through the cycling thermostat on the blower housing, the high-limit thermostat on the heater housing, the heating element of about 10 ohms and the motor's centrifugal switch to L2. Any open part in the chain stops the heat, so each thermostat is tested on its own for continuity at room temperature."
    >
      <text x="20" y="24" fontSize="10" fontWeight="700" className="fill-foreground">L1 (120 V)</text>
      <text x="320" y="24" fontSize="10" fontWeight="700" textAnchor="end" className="fill-foreground">L2 (120 V)</text>
      <text x="170" y="24" fontSize="9" textAnchor="middle" className="fill-muted">240 V across the chain</text>
      <g fill="none" strokeWidth="1.8" className="stroke-foreground">
        <path d="M30 32 V80 H44" />
        <path d="M104 80 H120" />
        <path d="M180 80 H196" />
        <path d="M256 80 H270 V130" />
        <path d="M270 170 V186 H310 V32" />
      </g>
      {/* cycling thermostat */}
      <rect x="44" y="64" width="60" height="32" rx="4" className="fill-surface stroke-accent" strokeWidth="2" />
      <text x="74" y="78" fontSize="9" fontWeight="700" textAnchor="middle" className="fill-accent">cycling</text>
      <text x="74" y="90" fontSize="8" textAnchor="middle" className="fill-muted">opens ~135–160 °F</text>
      {/* high limit */}
      <rect x="120" y="64" width="60" height="32" rx="4" className="fill-surface stroke-accent" strokeWidth="2" />
      <text x="150" y="78" fontSize="9" fontWeight="700" textAnchor="middle" className="fill-accent">high-limit</text>
      <text x="150" y="90" fontSize="8" textAnchor="middle" className="fill-muted">opens ~250 °F</text>
      {/* element */}
      <rect x="196" y="64" width="60" height="32" rx="4" className="fill-muted stroke-foreground" strokeWidth="2" />
      <text x="226" y="78" fontSize="9" fontWeight="700" textAnchor="middle" className="fill-foreground">element</text>
      <text x="226" y="90" fontSize="8" textAnchor="middle" className="fill-muted">≈ 10 Ω</text>
      {/* motor switch */}
      <rect x="240" y="130" width="60" height="40" rx="4" className="fill-surface stroke-foreground" strokeWidth="2" />
      <text x="270" y="147" fontSize="9" fontWeight="700" textAnchor="middle" className="fill-foreground">motor</text>
      <text x="270" y="160" fontSize="8" textAnchor="middle" className="fill-muted">switch</text>
      {/* meter probe hint */}
      <g fill="none" strokeWidth="1.4" strokeDasharray="4 3" className="stroke-accent">
        <path d="M50 96 V130 H90" />
        <path d="M98 96 V122" />
      </g>
      <rect x="30" y="130" width="130" height="38" rx="4" className="fill-surface stroke-accent" strokeWidth="1.5" />
      <text x="95" y="145" fontSize="9" textAnchor="middle" className="fill-accent">wires off, ohms across</text>
      <text x="95" y="159" fontSize="9" textAnchor="middle" className="fill-muted">cool: near 0 Ω = good</text>
    </svg>
  );
}

export default function HowToTestADryerThermostatWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Dryer Thermostat With a Multimeter"
      description={description}
      published="2026-11-13"
      path="/multimeters/how-to-test-a-dryer-thermostat-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a dryer thermostat with a multimeter, unplug the dryer, pull the wires off the thermostat and
          measure resistance across its two terminals at room temperature. A good cycling or high-limit thermostat
          reads close to 0 Ω when cool, and OL means it has failed open and the dryer won&apos;t heat. The same check
          answers how to test a dryer cycling thermostat with a multimeter, but a cycling thermostat that sticks
          closed still passes this test, so the last step on this page shows how to catch one that has stopped
          opening. This guide sticks to the thermostats; the one-shot thermal fuse has its own guide.
        </>
      }
      aside={{
        image: fluke115.image,
        alt: "Fluke 115 True RMS digital multimeter, front view",
        caption: (
          <>
            Any meter with a resistance range will test a dryer thermostat. The Fluke 115 adds True RMS for the
            live voltage checks. See our{" "}
            <Link href="/multimeters/fluke-115-review" className={link}>
              Fluke 115 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "thermostat-types", label: "Cycling, high-limit and thermal fuse" },
        { id: "causes", label: "Symptoms, causes and fixes" },
        { id: "unplug", label: "1. Unplug the dryer" },
        { id: "find-them", label: "2. Find the thermostats" },
        { id: "continuity", label: "3. Test continuity at room temperature" },
        { id: "bias-heater", label: "4. Check the bias heater" },
        { id: "rest-of-circuit", label: "5. Check the rest of the heat circuit" },
        { id: "stuck-closed", label: "6. Catch a cycling thermostat stuck closed" },
        { id: "reading-results", label: "Reading the results" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "What happens when a dryer cycling thermostat goes bad?",
          a: "If it fails open, the dryer tumbles but never heats. If it sticks closed, the heat stays on until the high-limit thermostat trips, so clothes come out very hot, the cabinet gets hot to the touch and the thermal fuse may blow. If it drifts and opens too early, loads take two or three cycles to dry, which is easy to blame on the vent.",
        },
        {
          q: "Should a dryer thermostat have continuity?",
          a: "Yes, at room temperature. Both the cycling thermostat and the high-limit thermostat are normally closed switches, so a good one reads close to 0 ohms, or beeps on the continuity setting, when cool. They open only when heated past their rated temperature and close again as they cool. A reading of OL at room temperature means the thermostat has failed.",
        },
        {
          q: "What is the difference between a high-limit thermostat and a thermal fuse?",
          a: "The high-limit thermostat resets itself. It opens if the heater housing overheats and closes again once it cools. A thermal fuse is a one-shot safety device that opens permanently and must be replaced. Some dryers pair the high-limit with a one-shot thermal cutoff mounted on the heater housing, and both are usually replaced together when the cutoff has blown.",
        },
        {
          q: "Can I bypass a dryer thermostat to test it?",
          a: "Don't run a dryer with a thermostat jumped out, even briefly. The cycling and high-limit thermostats are what stop the heater from reaching dangerous temperatures, and a dryer full of lint with no limit can catch fire. Test each part with the power off using the meter instead. If you need to prove the heater works, measure the element's resistance rather than jumping around it.",
        },
        {
          q: "Why does my dryer keep blowing thermostats or thermal fuses?",
          a: "Almost always airflow. A lint-packed vent, a crushed flexible duct behind the dryer, or a blocked outside hood traps heat in the drum and trips the limits. A cycling thermostat stuck closed or a heating element touching the housing can do it too. Clean and check the entire vent run before fitting new parts, or the replacements will fail the same way.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-thermal-fuse-with-a-multimeter",
          title: "How to Test a Thermal Fuse With a Multimeter",
          desc: "The one-shot fuse that sits beside the thermostats, and why it blew.",
        },
        {
          href: "/multimeters/how-to-measure-resistance-of-a-heating-element-with-a-multimeter",
          title: "How to Measure Resistance of a Heating Element",
          desc: "Work out the expected ohms from the wattage and test for an open or a short to ground.",
        },
      ]}
    >
      <Callout title="Electric dryers run on 240 V">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            An electric dryer in North America is fed at 240 V, usually from a 30 A circuit through a NEMA 14-30
            (four-prong) or older 10-30 (three-prong) receptacle. Turning the dryer off at its controls does not
            remove power from the terminal block or the internal wiring.
          </li>
          <li>
            Unplug it. If it is hard-wired, switch off its double-pole breaker and confirm 0 V at the terminal block
            between L1, L2 and neutral with your meter before removing any panel.
          </li>
          <li>
            Gas dryers run on 120 V but add a gas supply. Shut the gas valve before moving the dryer, and if you smell
            gas, leave the house and call the gas utility or 911 from outside.
          </li>
          <li>
            Let the dryer cool for at least half an hour after use. The heater housing and thermostats can be hot
            enough to burn, and a warm thermostat may read open when it is actually fine.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="thermostat-types" className="text-xl font-semibold mb-3">Cycling thermostat, high-limit thermostat and thermal fuse</h2>
        <p className="text-muted leading-7 mb-4">
          Most dryers have two thermostats and at least one fuse, and they look much alike: small round discs with
          two or more spade terminals. They do different jobs, so a symptom points to a different part depending on
          which one has failed.
        </p>
        <InfoCards
          items={[
            { label: "Cycling (operating) thermostat", desc: "On the blower housing or exhaust duct. Opens and closes in normal use to hold drying temperature." },
            { label: "High-limit thermostat", desc: "On the heater housing (electric) or burner funnel (gas). Opens only if the heater overheats." },
            { label: "Thermal fuse", desc: "A one-shot safety device. Opens permanently on overheating. In the heat or motor circuit, by brand." },
          ]}
        />
        <p className="text-muted leading-7 mt-4 mb-4">
          The rated temperature is usually stamped on each part, and the replacement must match. The chart shows
          where each typically opens. The figures are common ballpark values, not specifications for any one model.
        </p>
        <Figure caption={<>Typical opening temperatures for dryer heat controls. Ranges vary by maker and model; the number stamped on your part is the one that counts.</>}>
          <BarChart
            items={[
              { label: "Cycling thermostat (low)", value: 135, display: "≈ 135 °F" },
              { label: "Cycling thermostat (high)", value: 160, display: "≈ 160 °F" },
              { label: "Thermal fuse (many designs)", value: 196, display: "≈ 190–200 °F" },
              { label: "High-limit thermostat", value: 250, display: "≈ 250 °F", highlight: true },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms, likely causes and fixes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Tumbles, no heat (electric)", "High-limit or cycling thermostat open, element open, thermal fuse or cutoff blown", "Continuity on each part, element ohms", "Replace the open part; clean the vent"],
            ["Tumbles, no heat (gas)", "High-limit open, flame sensor, igniter or gas valve coils", "Continuity on the thermostat; igniter ohms", "Replace part; appliance tech for gas valve"],
            ["Very hot clothes, hot cabinet", "Cycling thermostat stuck closed or blocked vent", "Exhaust temperature never cycles", "Clean vent; replace cycling thermostat"],
            ["Loads need two cycles", "Restricted vent or cycling thermostat opening early", "Vent airflow; exhaust temperature profile", "Clean vent first, then thermostat"],
            ["Dryer won't start at all", "Thermal fuse in the motor circuit (some brands), door switch", "Continuity on the fuse and door switch", "Replace the fuse and find why it blew"],
            ["Heat on with timer off", "Element shorted to housing", "Element to cabinet ohms: should be OL", "Unplug now; replace element"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="unplug">Unplug the dryer and confirm it is dead</StepHeading>
        <p className="text-muted leading-7">
          Pull the plug and move the cord well away from the receptacle so nobody plugs it back in while you work.
          For a hard-wired dryer, switch off its breaker, then set the meter to AC volts and confirm 0 V across L1
          and L2 at the dryer&apos;s terminal block, and from each to neutral. Don&apos;t trust the dryer&apos;s own
          controls or a dead drum light as proof that power is off.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="find-them">Find the thermostats</StepHeading>
        <p className="text-muted leading-7">
          On many dryers the back panel comes off with a row of screws and gives access to the blower housing and
          heater; others open from the front or the bottom kick panel. Look up the model number, usually on a label
          inside the door frame, and find the parts diagram. The cycling thermostat sits on the blower housing or the
          exhaust duct where the air leaves the drum. The high-limit sits on the heater housing of an electric dryer,
          or on the combustion chamber of a gas one. Photograph the wiring before you remove a single terminal.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="continuity">Test the dryer thermostat for continuity at room temperature</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Pull both wires off the thermostat, or at least one, so the meter isn&apos;t reading through the element or
          motor in parallel. Set the meter to ohms, or to continuity if it beeps, and touch the probes to the two
          main terminals. Touch the probe tips together first to see the lead resistance, typically a few tenths of
          an ohm.
        </p>
        <p className="text-muted leading-7 mb-4">
          A good thermostat at room temperature reads close to 0 Ω, within about an ohm of the shorted-lead reading.
          OL means the contacts have failed open. A reading that wanders, or that changes when you tap the body,
          means the contacts are burnt and the part should go too. Test the high-limit the same way. Our{" "}
          <Link href="/multimeters/how-to-test-continuity-with-a-multimeter" className={link}>
            continuity testing guide
          </Link>{" "}
          explains the beeper threshold if your meter beeps on a part that still reads a few ohms.
        </p>
        <Figure
          caption={
            <>
              Illustrative readings across a dryer thermostat at room temperature: 0.3 Ω is a closed, healthy
              thermostat (left); OL is an open one that will stop the heat (right).
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="0.3" unit="Ω" mode="Ω  closed, good" />
            <MeterReadout value="O.L" unit="MΩ" mode="Ω  open, failed" />
          </div>
        </Figure>
      </section>

      <section>
        <StepHeading n={4} id="bias-heater">Check the bias heater on a cycling thermostat</StepHeading>
        <p className="text-muted leading-7">
          Some cycling thermostats have three terminals. Two are the switch you just tested; the third, with one of
          the others, connects a tiny bias heater built into the thermostat. On low and medium heat settings the timer
          or control powers that heater, which warms the disc so it opens at a lower drum temperature. Measure across
          the heater terminals: it should read a finite resistance, often in the kilohm range depending on the part.
          OL means the heater is open, and the usual symptom is that every heat setting feels the same. Check the
          wiring diagram on the dryer to identify which terminals belong to the heater.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="rest-of-circuit">Check the rest of the heat circuit</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The thermostats are in series with the element, so one good thermostat proves nothing about the others.
          While the panel is off, test the thermal fuse and any thermal cutoff for continuity, then the element. A
          5,400 W element at 240 V should measure about R = V² ÷ P = 240² ÷ 5,400 ≈ 10.7 Ω. Our guide to{" "}
          <Link href="/multimeters/how-to-measure-resistance-of-a-heating-element-with-a-multimeter" className={link}>
            measuring a heating element&apos;s resistance
          </Link>{" "}
          covers the short-to-ground test too, and{" "}
          <Link href="/multimeters/how-to-test-a-thermal-fuse-with-a-multimeter" className={link}>
            how to test a thermal fuse
          </Link>{" "}
          covers the fuse and why it blew.
        </p>
        <Figure caption={<>A simplified electric dryer heat circuit: every part is in series, so one open part stops the heat.</>}>
          <DryerHeatCircuitDiagram />
        </Figure>
        <div className="mt-6">
          <DataTable
            head={["Part", "Good reading (cool, wires off)", "Failed reading"]}
            rows={[
              ["Cycling thermostat", "Near 0 Ω", "OL, or erratic"],
              ["Cycling thermostat bias heater", "Finite, often kilohms", "OL"],
              ["High-limit thermostat", "Near 0 Ω", "OL"],
              ["Thermal fuse or cutoff", "Near 0 Ω", "OL (replace, find the cause)"],
              ["5,400 W element at 240 V", "≈ 10.7 Ω", "OL, or any reading to the cabinet"],
            ]}
            mono={[1]}
          />
        </div>
      </section>

      <section>
        <StepHeading n={6} id="stuck-closed">Catch a cycling thermostat that is stuck closed</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Room-temperature continuity can&apos;t find a thermostat that no longer opens, because a stuck-closed part
          and a healthy part both read 0 Ω when cool. Watch it work instead. Clear the vent, reassemble the dryer, slip
          a Type K thermocouple bead into the exhaust at the outside hood or where the duct leaves the dryer, and run
          a load of damp towels on high heat.
        </p>
        <p className="text-muted leading-7 mb-4">
          A healthy dryer shows exhaust temperature climbing, then falling and climbing again as the cycling
          thermostat turns the heat off and on, typically swinging somewhere between about 120 °F and 160 °F on a
          high setting. Exhaust that keeps rising without ever dipping, until the high-limit trips, points to a
          cycling thermostat that has stuck closed or a vent so restricted the thermostat never sees enough air.
          Readings depend on the dryer and the vent run, so look at the pattern more than the exact numbers.
        </p>
        <KeyIdea title="Continuity finds open thermostats, not stuck ones">
          A cool thermostat that reads OL is bad, full stop. One that reads 0 Ω is only half tested. If the complaint
          is overheating rather than no heat, the exhaust temperature test is the one that answers the question.
        </KeyIdea>
        <div className="mt-6">
          <Figure caption={<>Troubleshooting order for a dryer with no heat or too much heat.</>}>
            <FlowDiagram
              steps={[
                { label: "Unplug", sub: "Verify 0 V" },
                { label: "Vent", sub: "Clear the whole run" },
                { label: "Thermostats", sub: "Near 0 Ω when cool" },
                { label: "Fuse, element", sub: "Continuity, ≈ 10.7 Ω" },
                { label: "Run test", sub: "Exhaust temp cycles" },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 id="reading-results" className="text-xl font-semibold mb-3">Reading the results</h2>
        <p className="text-muted leading-7 mb-4">
          An open high-limit or blown thermal fuse is rarely the root cause. These parts open because something made
          the dryer run hot, and the usual suspect is the vent. Replace the failed part, then clean the lint trap
          housing, the duct behind the dryer and the outside hood, and replace crushed foil duct with rigid or
          semi-rigid metal. If a new thermal fuse blows within weeks, test the cycling thermostat with the exhaust
          method above and check the element for a short to the housing.
        </p>
        <p className="text-muted leading-7">
          Thermostats in other appliances fail in the same ways. For a household HVAC thermostat, see{" "}
          <Link href="/multimeters/how-to-test-a-thermostat-with-a-multimeter" className={link}>
            how to test a thermostat with a multimeter
          </Link>
          . If the dryer element, wiring or gas valve is the problem and you aren&apos;t comfortable with it, call an
          appliance repair technician, and for a damaged 240 V receptacle or a breaker that trips, call an
          electrician.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter to use for dryer thermostats</h2>
        <p className="text-muted leading-7 mb-6">
          A resistance range and a continuity beeper are all the bench test needs, so almost any meter will do. A
          temperature input with a Type K probe makes the stuck-closed check possible, and a CAT III rating matters if
          you plan to measure voltage at the terminal block or the receptacle.
        </p>
        <ProductStrip
          title="Meters in our reviews"
          items={[
            {
              name: "Fluke 17B+",
              image: fluke17b.image,
              alt: "Fluke 17B+ digital multimeter with temperature probe",
              href: "/multimeters/fluke-17b-plus-review",
              note: "CAT III 600V with temperature from the supplied Type K probe, so it can run the exhaust check too. Not True RMS.",
            },
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 True RMS digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "True RMS, CAT III 600V and a 6,000-count backlit display for continuity, ohms and receptacle voltage.",
            },
            {
              name: "KAIWEETS KM200s",
              image: kaiweets.image,
              alt: "KAIWEETS KM200s True RMS digital multimeter",
              href: "/multimeters/kaiweets-km200s-review",
              note: "Budget True RMS meter with NCV. Fine for unplugged appliance tests; its CAT II rating isn't meant for panel work.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
