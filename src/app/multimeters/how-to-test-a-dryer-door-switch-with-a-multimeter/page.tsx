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
  "Dryer won't start? Test the door switch with a multimeter: continuity with the plunger pressed, OL released, plus the drum-light contact on 3-terminal switches.";

export const metadata = buildMetadata({
  title: "How to Test a Dryer Door Switch With a Multimeter",
  description,
  path: "/multimeters/how-to-test-a-dryer-door-switch-with-a-multimeter",
});

const fluke115 = picks.find((p) => p.name === "Fluke 115")!;
const extech = picks.find((p) => p.name === "Extech EX330")!;
const fluke15 = picks.find((p) => p.name === "Fluke 15B+")!;

const link = "text-accent hover:underline";

/** Three-terminal door switch: COM to NO when the door is shut (start circuit), COM to NC when open (drum light). */
function DoorSwitchDiagram() {
  return (
    <svg
      viewBox="0 0 380 220"
      className="w-full h-auto"
      role="img"
      aria-label="Three-terminal dryer door switch. The common terminal connects to the normally open terminal when the door is closed and pushes the plunger in, which completes the start circuit to the motor. When the door is open the plunger is released and the common terminal connects to the normally closed terminal instead, which lights the drum light on models that have one. Two-terminal switches have only the start circuit contact."
    >
      {/* switch body */}
      <rect x="120" y="60" width="140" height="100" rx="8" className="fill-surface stroke-foreground" strokeWidth="2" />
      <text x="190" y="52" fontSize="10" textAnchor="middle" className="fill-foreground" fontWeight="700">door switch</text>
      {/* plunger */}
      <rect x="180" y="20" width="20" height="40" rx="3" className="fill-muted" opacity="0.6" />
      <text x="214" y="32" fontSize="9" className="fill-muted">plunger (door presses it)</text>
      {/* COM */}
      <circle cx="140" cy="110" r="5" className="fill-foreground" />
      <text x="140" y="134" fontSize="9" textAnchor="middle" className="fill-foreground" fontWeight="700">COM</text>
      {/* moving contact pressed to NO */}
      <line x1="140" y1="110" x2="236" y2="88" className="stroke-accent" strokeWidth="3" />
      {/* NO */}
      <circle cx="240" cy="86" r="5" className="fill-accent" />
      <text x="240" y="78" fontSize="9" textAnchor="middle" className="fill-accent" fontWeight="700">NO</text>
      {/* NC */}
      <circle cx="240" cy="136" r="5" className="fill-foreground" />
      <text x="240" y="152" fontSize="9" textAnchor="middle" className="fill-foreground" fontWeight="700">NC</text>
      {/* wires */}
      <line x1="245" y1="86" x2="330" y2="86" className="stroke-accent" strokeWidth="2" />
      <text x="330" y="78" fontSize="9" textAnchor="end" className="fill-accent">to start circuit</text>
      <line x1="245" y1="136" x2="330" y2="136" className="stroke-foreground" strokeWidth="2" />
      <text x="330" y="128" fontSize="9" textAnchor="end" className="fill-muted">to drum light</text>
      <line x1="135" y1="110" x2="40" y2="110" className="stroke-foreground" strokeWidth="2" />
      <text x="40" y="102" fontSize="9" className="fill-muted">supply</text>
      <text x="190" y="190" fontSize="9" textAnchor="middle" className="fill-muted">Door shut: COM–NO closed, COM–NC open</text>
      <text x="190" y="204" fontSize="9" textAnchor="middle" className="fill-muted">Door open: COM–NO open, COM–NC closed</text>
    </svg>
  );
}

export default function HowToTestADryerDoorSwitchPage() {
  return (
    <HowToShell
      title="How to Test a Dryer Door Switch With a Multimeter"
      description={description}
      published="2026-11-18"
      path="/multimeters/how-to-test-a-dryer-door-switch-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a dryer door switch with a multimeter, unplug the dryer, disconnect the switch and measure continuity
          across its start-circuit terminals: it should beep or read close to 0 Ω with the plunger pressed in and read OL
          when the plunger is released. A switch that stays open when pressed stops the dryer from starting even though
          the door is shut. On three-terminal switches, the second contact works the opposite way and lights the drum
          lamp when the door opens. This guide covers both types, how to read the terminals, and the other parts that
          cause the same no-start symptom.
        </>
      }
      aside={{
        image: fluke115.image,
        alt: "Fluke 115 digital multimeter for testing a dryer door switch",
        caption: (
          <>
            A loud, fast continuity beeper makes switch testing quick. See our{" "}
            <Link href="/multimeters/fluke-115-review" className={link}>
              Fluke 115 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-it-works", label: "How the door switch works" },
        { id: "causes", label: "Symptoms and likely causes" },
        { id: "quick-check", label: "1. Quick checks first" },
        { id: "unplug", label: "2. Unplug and reach the switch" },
        { id: "label", label: "3. Label the wires" },
        { id: "continuity", label: "4. Test the start contact" },
        { id: "light-contact", label: "5. Test the drum-light contact" },
        { id: "actuator", label: "6. Check the door and actuator" },
        { id: "chart", label: "What good contacts read" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "How do I know if my dryer door switch is bad?",
          a: "The dryer won't start even though the door is firmly shut, you may hear no click when you close the door, and the drum light may stay on or never come on. On many electronic models the display shows a door-open message. Confirm with a meter: no continuity across the start contact with the plunger pressed means the switch has failed.",
        },
        {
          q: "Should a dryer door switch have continuity?",
          a: "Only in the right position. The start-circuit contact should have continuity, close to 0 Ω, when the plunger is pressed as it is with the door shut, and read OL when released. On a three-terminal switch, the drum-light contact does the opposite: continuity when the plunger is out, OL when it is pressed in.",
        },
        {
          q: "Can I bypass a dryer door switch to test the dryer?",
          a: "Don't run a dryer with the door switch bypassed. The switch exists so the drum stops when the door opens, and bypassing it leaves a spinning drum and hot air reachable by hands, children and pets. A meter test on the unplugged switch answers the question safely, and a replacement switch is an inexpensive part.",
        },
        {
          q: "Why does my dryer not start but the light comes on?",
          a: "Power is reaching the dryer, so the problem lies in the start circuit. Common causes are a failed door switch contact, a blown thermal fuse in the motor circuit, a broken start switch or a bad drive motor. If the drum light goes out when you close the door, the switch is moving, but its start contact may still be open. Test it with a meter.",
        },
        {
          q: "Is the door switch the same on gas and electric dryers?",
          a: "Often the same part family within a brand. Both gas and electric dryers run the motor and controls on 120 V; an electric dryer adds 240 V for its heating element. The door switch sits in the 120 V start or control circuit on most models. Always use the part number for your model, since terminal layout and mounting vary.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-thermal-fuse-with-a-multimeter",
          title: "How to Test a Thermal Fuse",
          desc: "The other common reason a dryer won't start, tested the same way.",
        },
        {
          href: "/multimeters/how-to-test-a-dryer-thermostat-with-a-multimeter",
          title: "How to Test a Dryer Thermostat",
          desc: "Cycling and high-limit thermostats behind no-heat and overheating problems.",
        },
      ]}
    >
      <Callout title="Dryers run on 120 V and 240 V">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Unplug the dryer before removing any panel. An electric dryer is fed with 240 V, and even a gas dryer has 120 V
            at the switch.
          </li>
          <li>
            On a gas dryer, don&apos;t disturb the gas line or valve. If you smell gas, leave the house and call the gas
            utility from outside.
          </li>
          <li>
            Sheet-metal edges inside a dryer cabinet are sharp. Wear gloves and take a photo of the wiring before
            disconnecting anything.
          </li>
          <li>
            Never run the dryer with the door switch bypassed or taped down. Scorched wiring or a burning smell means
            stop and call an appliance technician.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="how-it-works" className="text-xl font-semibold mb-3">How a dryer door switch works</h2>
        <p className="text-muted leading-7 mb-4">
          The door switch is a small plunger or lever switch mounted behind the door opening. Closing the door pushes the
          plunger in, which closes a contact in the start circuit so the motor can run. Opening the door releases the
          plunger, breaking that circuit so the drum stops. On many dryers with a drum light, the switch has a third
          terminal: a normally closed contact that powers the lamp while the door is open.
        </p>
        <Figure caption={<>A three-terminal door switch: the start contact closes with the door shut, and the drum-light contact closes with the door open.</>}>
          <DoorSwitchDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          On many newer electronic dryers, the door switch doesn&apos;t carry motor current at all. It sends a signal to
          the control board, which then refuses to start and may display a door message. The meter test on the switch
          is the same either way: the contact must close when pressed and open when released. The general technique for
          small snap-action switches is covered in{" "}
          <Link href="/multimeters/how-to-test-a-microswitch-with-a-multimeter" className={link}>
            how to test a microswitch
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and likely causes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Won't start, door shut, light works", "Door switch start contact open", "Continuity pressed (step 4)", "Replace the door switch"],
            ["Won't start, switch tests good", "Blown thermal fuse", "Continuity on the fuse", "Replace fuse; clean the vent"],
            ["Drum light stays off with door open", "Bulb, or light contact open", "Bulb, then NC contact (step 5)", "Replace bulb or switch"],
            ["Starts only if door is pushed hard", "Worn actuator or sagging door", "Inspect the strike and hinge (step 6)", "Replace actuator or adjust door"],
            ["Stops mid-cycle when bumped", "Intermittent switch contact", "Wiggle while reading ohms", "Replace the door switch"],
            ["Nothing at all, no light, no display", "No power to the dryer", "Breaker and outlet voltage", "Reset breaker; electrician for outlet"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="quick-check">Do the quick checks first</StepHeading>
        <p className="text-muted leading-7">
          Make sure the dryer has power: is the drum light on, or does the display light up? If nothing at all happens,
          check the breaker; an electric dryer uses a two-pole breaker, and a single tripped half can leave the light
          working while the heating fails. Close the door and listen for a click from the switch. Look at the
          door&apos;s strike or tab for damage. If the light and display work but the motor won&apos;t start, the
          door switch is a prime suspect.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="unplug">Unplug the dryer and reach the switch</StepHeading>
        <p className="text-muted leading-7">
          Unplug the dryer and pull it away from the wall. On many top-loading-panel dryers, the switch is reached by
          lifting the top panel or removing the front panel, held by a few screws or clips. On some front-control
          models it is accessible after removing the door frame trim. Your model&apos;s service sheet, often taped inside
          the cabinet, shows the route. The switch usually clips into a square hole in the front panel behind the door
          opening.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="label">Label the wires before disconnecting</StepHeading>
        <p className="text-muted leading-7">
          Photograph the switch and its wires, then pull the connectors off. Three-terminal switches are usually marked
          COM (common), NO (normally open) and NC (normally closed), or numbered. If the markings aren&apos;t clear, the
          service sheet&apos;s wiring diagram shows which terminal goes to the start circuit. Getting these swapped on
          reassembly is a common reason a dryer won&apos;t start after a repair, or runs with the door open.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="continuity">Test the start contact</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set the meter to continuity or the lowest ohms range. Touch the leads together first; that small number is your
          lead resistance. Put one probe on COM and the other on NO (on a two-terminal switch, just the two terminals).
          With the plunger released you should see OL. Press the plunger fully in, as the door would: the meter should
          beep and read close to your lead resistance. Press and release it a few times. A reading that stays OL, flickers
          or sits at several ohms means worn contacts.
        </p>
        <Figure caption={<>Illustrative start-contact readings: OL with the plunger out, near 0 Ω with it pressed.</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="OL" unit="Ω" mode="Ω  plunger released" />
            <MeterReadout value="0.2" unit="Ω" mode="Ω  plunger pressed" />
          </div>
        </Figure>
      </section>

      <section>
        <StepHeading n={5} id="light-contact">Test the drum-light contact</StepHeading>
        <p className="text-muted leading-7">
          On a three-terminal switch, move the probe from NO to NC. Now the results reverse: close to 0 Ω with the
          plunger released, OL with it pressed. If the drum light never works, check the bulb first; it is cheaper and
          fails more often than the switch. If the bulb is good but this contact reads OL when released, the switch
          needs replacing even if the dryer still starts. The continuity method is explained in{" "}
          <Link href="/multimeters/how-to-test-continuity-with-a-multimeter" className={link}>
            how to test continuity with a multimeter
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={6} id="actuator">Check the door and actuator</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A good switch can still fail to start the dryer if the door doesn&apos;t press its plunger far enough. Look for a
          broken plastic strike on the door, a sagging hinge or a cracked switch mount. With the panel off, close the door
          and see whether the plunger moves fully in. If the switch tests good on the bench, the actuator is the next
          suspect, then the thermal fuse; see{" "}
          <Link href="/multimeters/how-to-test-a-thermal-fuse-with-a-multimeter" className={link}>
            how to test a thermal fuse
          </Link>
          .
        </p>
        <Figure caption={<>Dryer door switch test order: power, access, label, then both contacts and the actuator.</>}>
          <FlowDiagram
            steps={[
              { label: "Power", sub: "Light or display on?" },
              { label: "Unplug", sub: "Reach the switch" },
              { label: "Label", sub: "COM, NO, NC" },
              { label: "Start contact", sub: "Pressed ≈ 0 Ω" },
              { label: "Actuator", sub: "Strike and hinge" },
            ]}
          />
        </Figure>
        <KeyIdea title="Pressed means closed for the start contact">
          With the plunger pressed, the start contact must read close to 0 Ω; released, it must read OL. Anything else,
          including a reading that flickers as you press it, means the switch should be replaced.
        </KeyIdea>
      </section>

      <section>
        <h2 id="chart" className="text-xl font-semibold mb-3">What good and worn contacts read</h2>
        <p className="text-muted leading-7 mb-4">
          A clean switch contact adds almost nothing to your lead resistance, often only a tenth of an ohm or so.
          Pitted or burnt contacts can read a few ohms, or jump between values as you press the plunger. On a circuit
          carrying motor current, that extra resistance turns into heat at the contact, which pits it further. The values
          below are illustrative, to show what to compare against.
        </p>
        <Figure caption={<>Illustrative ohms readings on the start contact with the plunger pressed. Compare against your own shorted-lead reading.</>}>
          <BarChart
            items={[
              { label: "Leads shorted", value: 0.15, display: "0.15 Ω" },
              { label: "Good switch", value: 0.2, display: "0.2 Ω", highlight: true },
              { label: "Worn contacts", value: 2.5, display: "2.5 Ω" },
              { label: "Badly pitted", value: 8, display: "8 Ω, unstable" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          A meter&apos;s continuity beeper typically sounds below a threshold of tens of ohms, so a worn contact can still
          beep. Read the ohms value as well as listening for the beep. A reading that wanders as you hold the plunger
          steady is a fault even if its lowest value looks good; see{" "}
          <Link href="/multimeters/multimeter-continuity-beep-intermittent" className={link}>
            why a continuity beep is intermittent
          </Link>{" "}
          for how to tell switch faults from lead problems.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter to use on dryer parts</h2>
        <p className="text-muted leading-7 mb-6">
          Any meter with a continuity beeper and an ohms range works on the switch. For checking the 120/240 V outlet
          as well, choose one rated CAT III 600V. The{" "}
          <Link href="/multimeters/best-multimeter-for-home-use" className={link}>
            home-use multimeter guide
          </Link>{" "}
          compares more meters.
        </p>
        <ProductStrip
          title="Meters for dryer repairs"
          items={[
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 True RMS digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "Fast continuity beeper and clear ohms readings, plus CAT III 600V for testing the dryer outlet.",
            },
            {
              name: "Extech EX330",
              image: extech.image,
              alt: "Extech EX330 compact digital multimeter",
              href: "/multimeters/extech-ex330-review",
              note: "Pocket-sized CAT III 600V meter with continuity and a built-in non-contact voltage detector, at a low price.",
            },
            {
              name: "Fluke 15B+",
              image: fluke15.image,
              alt: "Fluke 15B+ digital multimeter",
              href: "/multimeters/fluke-15b-plus-review",
              note: "Durable, simple CAT III 600V meter for continuity, resistance and outlet voltage on household appliances.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
