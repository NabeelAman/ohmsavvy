import Link from "@/components/AppLink";
import {
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
  "How to test a reversing valve solenoid coil: measure its resistance, check 24 VAC at the O/B terminal, do the magnet test and rule out a stuck valve.";

export const metadata = buildMetadata({
  title: "How to Test a Reversing Valve Solenoid Coil",
  description,
  path: "/multimeters/how-to-test-a-reversing-valve-solenoid-with-a-multimeter",
});

const fluke117 = picks.find((p) => p.name === "Fluke 117")!;
const brymen = picks.find((p) => p.name === "Brymen BM235")!;
const fluke17b = picks.find((p) => p.name === "Fluke 17B+")!;

const link = "text-accent hover:underline";

/** Control path from the thermostat O/B terminal to the reversing valve coil, with the test points. */
function ReversingValveDiagram() {
  return (
    <svg
      viewBox="0 0 340 210"
      className="w-full h-auto"
      role="img"
      aria-label="How to test a reversing valve coil: the thermostat O or B terminal sends 24 volts AC through the outdoor terminal board and defrost board to a solenoid coil on the pilot valve of the four-way reversing valve. Test point A reads coil resistance with power off, test point B reads 24 to 28 volts AC across the coil during a call, and the magnet test checks for pull at the coil's retaining nut."
    >
      {/* thermostat */}
      <rect x="8" y="20" width="70" height="60" rx="6" className="fill-surface stroke-foreground" strokeWidth="2" />
      <text x="43" y="42" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">thermostat</text>
      <text x="43" y="58" fontSize="9" textAnchor="middle" className="fill-accent">O or B</text>
      <text x="43" y="71" fontSize="9" textAnchor="middle" className="fill-muted">and C</text>
      {/* wires */}
      <g fill="none" strokeWidth="1.5" className="stroke-foreground">
        <path d="M78 45 H120" />
        <path d="M78 65 H120" />
      </g>
      {/* outdoor board */}
      <rect x="120" y="20" width="80" height="60" rx="6" className="fill-muted stroke-foreground" strokeWidth="2" />
      <text x="160" y="44" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">outdoor</text>
      <text x="160" y="58" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">board</text>
      <text x="160" y="72" fontSize="9" textAnchor="middle" className="fill-muted">O/B, C</text>
      <g fill="none" strokeWidth="1.5" className="stroke-accent">
        <path d="M200 40 H250 V110" />
        <path d="M200 60 H236 V110" />
      </g>
      {/* coil */}
      <rect x="216" y="110" width="54" height="44" rx="5" className="fill-surface stroke-accent" strokeWidth="2" />
      <text x="243" y="130" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-accent">coil</text>
      <text x="243" y="144" fontSize="9" textAnchor="middle" className="fill-muted">24 VAC</text>
      <circle cx="282" cy="132" r="7" className="fill-muted stroke-foreground" strokeWidth="1.5" />
      <text x="300" y="128" fontSize="9" className="fill-foreground">nut:</text>
      <text x="300" y="140" fontSize="9" className="fill-muted">magnet test</text>
      {/* valve body */}
      <rect x="60" y="150" width="140" height="34" rx="16" className="fill-surface stroke-foreground" strokeWidth="2" />
      <text x="130" y="171" fontSize="10" textAnchor="middle" className="fill-foreground">4-way valve body</text>
      <path d="M200 167 H216" className="stroke-foreground" strokeWidth="1.5" />
      <g className="stroke-foreground" strokeWidth="2">
        <line x1="90" y1="184" x2="90" y2="202" />
        <line x1="130" y1="184" x2="130" y2="202" />
        <line x1="170" y1="184" x2="170" y2="202" />
        <line x1="130" y1="150" x2="130" y2="132" />
      </g>
      <text x="130" y="126" fontSize="9" textAnchor="middle" className="fill-muted">from compressor</text>
      {/* test point labels */}
      <rect x="8" y="100" width="92" height="40" rx="4" className="fill-surface stroke-accent" strokeWidth="1.5" />
      <text x="54" y="116" fontSize="9" textAnchor="middle" className="fill-accent">A: ohms, power off</text>
      <text x="54" y="130" fontSize="9" textAnchor="middle" className="fill-accent">B: 24–28 VAC on call</text>
    </svg>
  );
}

export default function HowToTestAReversingValveSolenoidWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Reversing Valve Solenoid With a Multimeter"
      description={description}
      published="2026-11-13"
      path="/multimeters/how-to-test-a-reversing-valve-solenoid-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a reversing valve solenoid, measure the coil&apos;s resistance with the power off, then check for
          24 to 28 VAC across the coil when the thermostat energizes its O/B terminal. A coil that reads OL is open
          and needs replacing; a coil with the right voltage and resistance that still can&apos;t magnetize a
          screwdriver tip is weak, and a good coil on a valve that won&apos;t shift points to a stuck valve or a
          refrigerant problem. This is how to test a reversing valve coil without touching the refrigerant side, and
          how to decide when the job belongs to an HVAC technician.
        </>
      }
      aside={{
        image: fluke117.image,
        alt: "Fluke 117 True RMS multimeter, front view",
        caption: (
          <>
            The Fluke 117&apos;s low-impedance mode helps rule out ghost voltage on long thermostat runs. See our{" "}
            <Link href="/multimeters/fluke-117-review" className={link}>
              Fluke 117 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-it-does", label: "What the reversing valve solenoid does" },
        { id: "o-or-b", label: "O or B: when the coil should have power" },
        { id: "causes", label: "Symptoms, causes and fixes" },
        { id: "isolate", label: "1. Isolate and find the coil" },
        { id: "coil-resistance", label: "2. Measure coil resistance" },
        { id: "coil-voltage", label: "3. Check 24 V at O/B and the coil" },
        { id: "magnet-test", label: "4. Do the magnet test" },
        { id: "valve-or-coil", label: "5. Coil good, valve stuck?" },
        { id: "reading-results", label: "Reading the results" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "What are the symptoms of a bad reversing valve solenoid?",
          a: "The heat pump blows warm air when you want cooling, or cool air when you want heat, depending on whether the valve is energized for cooling or heating. It may also fail to defrost, so the outdoor coil ices up in winter. A hum or no click from the valve when the mode changes is another hint. A coil fault is cheap; a stuck valve is not.",
        },
        {
          q: "Does the reversing valve get power in heat or cool mode?",
          a: "It depends on the brand. Most heat pumps energize the valve in cooling, using the thermostat's O terminal. Rheem and Ruud, and some others, energize it in heating using the B terminal. During defrost, the board drives the valve to the cooling position on either type. The thermostat's O/B setting must match the equipment, or heating and cooling come out reversed.",
        },
        {
          q: "Can I replace a reversing valve coil myself?",
          a: "Often, yes. The coil slides over the pilot valve's stem and is held by a nut or clip, so it can be replaced without opening the refrigerant circuit. Match the voltage, usually 24 VAC, and the maker's part number. Power off, unplug the leads, swap the coil and reconnect. Replacing the valve body itself needs refrigerant recovery and brazing by a certified technician.",
        },
        {
          q: "Why does my heat pump only blow cold air in heat mode?",
          a: "If the system cools when set to heat, the reversing valve isn't shifting. Check the thermostat O/B setting first, then the coil voltage and resistance on this page. If those pass, the valve may be stuck or the system may lack the pressure difference it needs to shift. Backup heat failing at the same time can make it feel colder still.",
        },
        {
          q: "Can you tap a stuck reversing valve to free it?",
          a: "Technicians sometimes tap the valve body lightly with a rubber mallet while cycling the coil, which can free a sticky slide. It is a last attempt before replacement, not a fix, and hitting it hard can dent the body or damage brazed joints. Leave it to an HVAC technician, who can also check pressures to confirm the valve is really at fault.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-heat-pump-contactor-with-a-multimeter",
          title: "How to Test a Heat Pump Contactor With a Multimeter",
          desc: "The other 24 VAC coil in the outdoor unit: coil voltage, resistance and contact drop.",
        },
        {
          href: "/multimeters/how-to-test-a-thermostat-with-a-multimeter",
          title: "How to Test a Thermostat With a Multimeter",
          desc: "Check the thermostat end of the O/B call: voltages at the terminals and continuity.",
        },
      ]}
    >
      <Callout title="Before you open the outdoor unit">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            The coil runs on 24 VAC, but the cabinet also carries 208–240 VAC to the contactor, compressor and fan.
            Pull the disconnect, switch off the breaker and verify 0 V before reaching in.
          </li>
          <li>
            Discharge the run capacitor through a resistor and confirm 0 V. The reversing valve sits near the
            compressor, where the discharge line can be hot enough to burn.
          </li>
          <li>
            Never loosen fittings or cut into the refrigerant lines. Valve replacement needs an EPA-certified HVAC
            technician in the US.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="what-it-does" className="text-xl font-semibold mb-3">What the reversing valve solenoid does</h2>
        <p className="text-muted leading-7 mb-4">
          A heat pump moves heat in either direction by swapping which coil acts as the condenser. The four-way
          reversing valve does the swapping. Its main slide is moved by refrigerant pressure, steered by a small pilot
          valve, and the pilot is moved by the solenoid coil. So the coil never pushes the main slide itself. It
          only shifts a tiny pilot, and system pressure does the heavy work. That detail matters for diagnosis: a
          perfectly good coil can click the pilot while the main valve stays put if the compressor isn&apos;t running
          or the system is low on charge.
        </p>
        <InfoCards
          items={[
            { label: "Coil", desc: "A 24 VAC winding that slides over the pilot stem, held by a nut or clip. Replaceable without opening the system." },
            { label: "Pilot valve", desc: "A small solenoid valve with capillary tubes. It redirects pressure to either end of the main slide." },
            { label: "Main slide", desc: "Moves inside the valve body when there is enough pressure difference, usually with an audible whoosh." },
          ]}
        />
      </section>

      <section>
        <h2 id="o-or-b" className="text-xl font-semibold mb-3">O or B: when the coil should have power</h2>
        <p className="text-muted leading-7 mb-4">
          You can&apos;t judge a voltage reading until you know when the coil is meant to be powered. Most brands use
          an O-type valve, energized in cooling. Rheem and Ruud, along with some others, use a B-type valve,
          energized in heating. During defrost, the board puts the valve into the cooling position, which means
          energizing an O-type coil or de-energizing a B-type one.
        </p>
        <DataTable
          head={["System mode", "O-type valve (most brands)", "B-type valve (Rheem, Ruud)"]}
          rows={[
            ["Cooling", "Coil energized: 24–28 VAC", "Coil off: 0 V"],
            ["Heating", "Coil off: 0 V", "Coil energized: 24–28 VAC"],
            ["Defrost", "Coil energized by the board", "Coil off"],
            ["Off / fan only", "0 V on most thermostats", "0 V on most thermostats"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Some thermostats keep O energized whenever the system is in cool mode, even between calls, so a reading
          with no active call isn&apos;t always a fault. If heating and cooling are simply backwards after a new
          thermostat goes in, the O/B setting is wrong. Fix that in the thermostat menu before you test anything else.
        </p>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms, likely causes and fixes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Heat and cool reversed after new thermostat", "O/B setting wrong", "Thermostat installer menu", "Change the O/B setting"],
            ["Stuck in heating (O-type) or cooling (B-type)", "No 24 V reaching the coil", "AC volts across coil during the call: 0 V", "Trace O/B wire, thermostat, board"],
            ["24 V present, no click, no magnetism", "Open or weak coil", "Coil ohms: OL, or no pull on the magnet test", "Replace the coil"],
            ["Coil good, valve clicks, mode won't change", "Stuck slide or low pressure difference", "Line temperatures, system pressures", "HVAC technician"],
            ["Coil hot and burnt smell", "Shorted turns or wrong-voltage coil", "Coil ohms well below normal; label voltage", "Replace with the correct coil"],
            ["No defrost, coil iced", "Coil, board or defrost sensor", "Force defrost; check coil voltage", "See the defrost sensor guide"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="isolate">Isolate the unit and find the coil</StepHeading>
        <p className="text-muted leading-7">
          Pull the outdoor disconnect, switch off the breaker and verify dead. Remove the service panel and follow
          the large copper line from the top of the compressor. It runs to the reversing valve, a brass or copper
          cylinder with four line connections and a small pilot valve on its side. The coil is the black or gray
          block on the pilot, with two wires running back to the defrost board or a terminal block. Photograph the
          wiring before you pull anything off.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="coil-resistance">Test the reversing valve solenoid coil resistance</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Unplug the coil leads from the board or disconnect one wire so nothing is measured in parallel. Set the
          meter to ohms and read across the two leads. A good 24 VAC reversing valve coil reads a steady, finite
          value, commonly somewhere in the range of about 10 to 50 Ω, but makers differ, so trust the coil label or
          service data over any general figure. OL means the winding is open. A reading far below what a matching
          coil should show, or a coil that has visibly cooked, points to shorted turns.
        </p>
        <p className="text-muted leading-7">
          Also check each lead to the metal valve body. You should see OL. Any reading there means the insulation
          has broken down and the coil is leaking to ground, which can blow the low-voltage fuse.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="coil-voltage">Check 24 V at O/B and across the coil</StepHeading>
        <p className="text-muted leading-7 mb-4">
          In most split systems the 24 V transformer is indoors, so you can keep the outdoor disconnect pulled and
          still power the control circuit. Set the thermostat to the mode that should energize the coil: cooling for
          O-type, heating for B-type. Measure AC volts from O (or B) to C at the outdoor terminal board, then across
          the coil leads themselves. Both should read about 24 to 28 VAC.
        </p>
        <p className="text-muted leading-7 mb-4">
          Voltage at the terminal board but not at the coil means a broken wire, a bad plug or a board that
          isn&apos;t passing the signal on. No voltage at the terminal board means the problem is indoors or at the
          thermostat. Our guide to{" "}
          <Link href="/multimeters/how-to-test-a-thermostat-with-a-multimeter" className={link}>
            testing a thermostat with a multimeter
          </Link>{" "}
          covers that end, and{" "}
          <Link href="/multimeters/how-to-check-a-24v-transformer-with-a-multimeter" className={link}>
            checking a 24V transformer
          </Link>{" "}
          covers the supply.
        </p>
        <Figure caption={<>Where to measure: coil resistance with the power off (A), and coil voltage during a call (B), plus the magnet test at the coil nut.</>}>
          <ReversingValveDiagram />
        </Figure>
      </section>

      <section>
        <StepHeading n={4} id="magnet-test">Do the magnet test</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Voltage and resistance tell you the coil is wired and whole, but not that it is producing a field. With the
          coil energized, hold the tip of a steel screwdriver against the retaining nut or the end of the coil. A
          working coil grips the tip noticeably. Remove the call and the pull should disappear at once. No pull with
          24 VAC confirmed across the leads means the coil is bad, whatever the ohmmeter said.
        </p>
        <p className="text-muted leading-7 mb-4">
          You may also hear the pilot click as the coil switches. With the compressor off, the main slide usually
          won&apos;t move because there is no pressure difference to push it, so a click with no whoosh is normal
          at this stage. Don&apos;t pull the coil off its stem while it&apos;s energized; without the stem in place
          a solenoid coil can overheat.
        </p>
        <Figure
          caption={
            <>
              Illustrative readings: 26.1 VAC across the coil during a cooling call on an O-type system (left), and an
              open coil reading OL in ohms with the power off (right).
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="26.1" unit="V AC" mode="V~  coil, O energized" />
            <MeterReadout value="O.L" unit="MΩ" mode="Ω  open coil" />
          </div>
        </Figure>
      </section>

      <section>
        <StepHeading n={5} id="valve-or-coil">Coil good, valve stuck?</StepHeading>
        <p className="text-muted leading-7 mb-4">
          If the coil passes every check and the system still won&apos;t change modes with the compressor running,
          the fault is mechanical or refrigerant-side. A technician will compare the temperatures of the lines at the
          valve and read system pressures. A slide stuck halfway can leak hot gas into the suction side and make the
          unit perform badly in both modes. A system that is low on charge may not develop enough pressure difference
          to shift a healthy valve. Both are jobs for an HVAC technician with gauges and an EPA certification.
        </p>
        <Figure caption={<>The test order that separates a cheap coil fault from an expensive valve fault.</>}>
          <FlowDiagram
            steps={[
              { label: "O/B setting", sub: "Matches the brand?" },
              { label: "Coil ohms", sub: "Finite, not OL" },
              { label: "Coil volts", sub: "24–28 VAC on call" },
              { label: "Magnet test", sub: "Pulls a screwdriver" },
              { label: "Still stuck", sub: "Call an HVAC tech" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="reading-results" className="text-xl font-semibold mb-3">Reading the results</h2>
        <DataTable
          head={["Coil ohms", "Coil volts on call", "Magnet test", "Verdict"]}
          rows={[
            ["Finite, steady", "24–28 VAC", "Strong pull", "Coil good; check valve and pressures"],
            ["OL", "24–28 VAC", "No pull", "Open coil: replace the coil"],
            ["Finite, steady", "0 V", "No pull", "Coil fine; fault upstream in controls"],
            ["Finite, steady", "Under about 20 VAC", "Weak pull", "Low control voltage: check C wire and transformer"],
            ["Reading to valve body", "Any", "Any", "Insulation failure: replace the coil"],
          ]}
        />
        <div className="mt-6">
          <KeyIdea title="The coil only moves the pilot">
            Treat the electrical test and the mechanical one as two separate questions. The meter can prove the coil
            gets 24 V and makes a field. It cannot prove the main slide moves, because that needs the compressor
            running and enough pressure difference. Don&apos;t buy a valve on the strength of a meter reading alone.
          </KeyIdea>
        </div>
        <p className="text-muted leading-7 mt-4">
          The defrost board also drives this coil, so a unit that heats fine but never defrosts may have a good valve
          and a bad sensor. Check the{" "}
          <Link href="/multimeters/how-to-test-a-heat-pump-defrost-sensor-with-a-multimeter" className={link}>
            heat pump defrost sensor
          </Link>{" "}
          too, and if winter bills are the real complaint, read{" "}
          <Link href="/multimeters/why-does-my-heat-pump-use-too-much-electricity-in-cold-weather" className={link}>
            why a heat pump uses too much electricity in cold weather
          </Link>
          . The coil and its control path work like any small relay coil, which{" "}
          <Link href="/multimeters/how-to-test-a-relay-with-a-multimeter" className={link}>
            how to test a relay
          </Link>{" "}
          explains in more depth.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter to use for reversing valve coils</h2>
        <p className="text-muted leading-7 mb-6">
          Coil testing only needs AC volts and ohms, but the meter goes into a cabinet with 240 V in it, so choose one
          rated CAT III. A low-impedance (LoZ) mode is worth having: long thermostat cables pick up induced voltage
          that a high-impedance meter can show as a phantom reading of several volts, which looks like a weak call when there is none.
        </p>
        <ProductStrip
          title="Meters in our reviews"
          items={[
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 True RMS electrician multimeter",
              href: "/multimeters/fluke-117-review",
              note: "True RMS, CAT III 600V, NCV and a low-impedance mode for control wiring.",
            },
            {
              name: "Brymen BM235",
              image: brymen.image,
              alt: "Brymen BM235 True RMS multimeter",
              href: "/multimeters/brymen-bm235-vs-fluke-117",
              note: "True RMS with AutoV LoZ, NCV and Type-K temperature. CAT III 600V and CAT IV 300V.",
            },
            {
              name: "Fluke 17B+",
              image: fluke17b.image,
              alt: "Fluke 17B+ digital multimeter",
              href: "/multimeters/fluke-17b-plus-review",
              note: "CAT III 600V with temperature, frequency and MIN MAX. Not True RMS, which is fine for 24 V coil checks.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
