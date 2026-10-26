import Link from "next/link";
import {
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
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to test a microswitch with a multimeter: find COM, NO and NC, check continuity pressed and released, measure contact resistance and spot worn switches.";

export const metadata = buildMetadata({
  title: "How to Test a Microswitch With a Multimeter",
  description,
  path: "/multimeters/how-to-test-a-microswitch-with-a-multimeter",
});

const kaiweets = picks.find((p) => p.name === "KAIWEETS KM200s")!;
const fluke115 = picks.find((p) => p.name === "Fluke 115")!;
const ex330 = picks.find((p) => p.name === "Extech EX330")!;

const link = "text-accent hover:underline";

function MicroswitchDiagram() {
  return (
    <svg
      viewBox="0 0 320 200"
      className="w-full h-auto"
      role="img"
      aria-label="Side view of a snap-action microswitch with a roller lever, its COM, NO and NC tabs, and meter probes on COM and NO"
    >
      {/* body */}
      <rect x="70" y="70" width="170" height="70" rx="4" className="fill-surface stroke-foreground" strokeWidth="1.8" />
      {/* plunger */}
      <rect x="182" y="58" width="12" height="12" className="fill-muted stroke-foreground" strokeWidth="1.2" />
      {/* lever arm with roller */}
      <g className="stroke-accent" strokeWidth="2.4" fill="none" strokeLinecap="round">
        <line x1="82" y1="66" x2="250" y2="44" />
      </g>
      <circle cx="82" cy="66" r="3" className="fill-foreground" />
      <circle cx="256" cy="40" r="9" className="fill-surface stroke-accent" strokeWidth="2" />
      {/* tabs */}
      <g className="fill-muted stroke-foreground" strokeWidth="1.2">
        <rect x="92" y="140" width="14" height="26" />
        <rect x="148" y="140" width="14" height="26" />
        <rect x="204" y="140" width="14" height="26" />
      </g>
      {/* probes */}
      <g strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M99 166 V186 H40" className="stroke-foreground" />
        <path d="M155 166 V178 H290" className="stroke-accent" strokeDasharray="4 3" />
      </g>
      <g fontSize="10" className="fill-foreground" textAnchor="middle">
        <text x="99" y="156">C</text>
        <text x="155" y="156">NO</text>
        <text x="211" y="156">NC</text>
        <text x="155" y="110">snap-action body</text>
      </g>
      <g fontSize="9" className="fill-muted">
        <text x="200" y="22">roller lever</text>
        <text x="200" y="88">plunger</text>
        <text x="14" y="198">COM probe</text>
        <text x="236" y="194">NO probe</text>
        <text x="10" y="40">Tab order varies:</text>
        <text x="10" y="52">read the molded marks</text>
      </g>
    </svg>
  );
}

export default function HowToTestAMicroswitchWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Microswitch With a Multimeter"
      description={description}
      published="2026-10-22"
      path="/multimeters/how-to-test-a-microswitch-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a microswitch with a multimeter, unplug the appliance, pull the wires off the switch, and
          check continuity between COM and NO, then COM and NC, first with the actuator released and then
          pressed. A good microswitch swaps cleanly between the two and reads close to 0 Ω when closed. The
          tests below cover the appliance and electronics switches that fail most often: microwave door
          interlocks, kettles, washing machine door locks and mouse buttons.
        </>
      }
      aside={{
        image: kaiweets.image,
        alt: "KAIWEETS KM200s True RMS digital multimeter",
        caption: (
          <>
            The KAIWEETS KM200s (True RMS, auto-ranging, CAT II 600V) is our budget pick for home use, and its
            continuity and resistance ranges cover appliance switch checks. See our{" "}
            <Link href="/multimeters/kaiweets-km200s-review" className={link}>
              KM200s review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "where-microswitches-are", label: "Where appliance microswitches hide" },
        { id: "identify-terminals", label: "Identify COM, NO and NC" },
        { id: "pressed-and-released", label: "Continuity pressed and released" },
        { id: "contact-resistance", label: "Measure contact resistance" },
        { id: "microwave-interlocks", label: "Microwave door interlocks" },
        { id: "kettles-locks-mice", label: "Kettles, door locks and mouse buttons" },
        { id: "worn-or-sticking", label: "Worn or sticking switches" },
      ]}
      faq={[
        {
          q: "Why does my microwave keep blowing its fuse when I open the door?",
          a: "Often a failed door interlock. Most microwaves have a monitor switch that deliberately shorts the supply if the other interlocks fail to open with the door, which blows the fuse. Replacing only the fuse just repeats it. Unplug, discharge the high-voltage capacitor safely, test every interlock out of circuit, and replace the faulty switch and the fuse together.",
        },
        {
          q: "Can a microswitch click but not work?",
          a: "Yes. The click is the spring mechanism snapping over, which can happen even when the contacts are burnt, pitted or no longer touching. Only a continuity or resistance reading proves the circuit actually closes. A switch that clicks normally but reads OL or several ohms across COM and NO when pressed is faulty.",
        },
        {
          q: "What resistance should a closed microswitch read?",
          a: "Typically a fraction of an ohm once you subtract your test lead resistance, which is normally around 0.1 to 0.3 Ω on its own. A closed reading that sits at a few ohms, or wanders as you press harder, points to dirty or arc-damaged contacts. For a mains appliance switch that carries real current, that switch should be replaced.",
        },
        {
          q: "Can I test a mouse microswitch without desoldering it?",
          a: "Often, yes. Unplug the mouse or remove its battery, open the case and probe the switch pins on the board while clicking. The surrounding circuit can add parallel paths, so an odd reading is not conclusive. Desoldering at least the COM pin gives a clean test, which also lets you check for the erratic contact that causes double-clicks.",
        },
        {
          q: "Are all three-pin microswitches interchangeable?",
          a: "No. Match the body size, the actuator type and length, the terminal style, the operating force and the current and voltage rating printed on the body. An appliance switch rated for mains current must be replaced with one carrying at least the same rating, and an interlock should be the part specified for that model.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-limit-switch-with-a-digital-multimeter",
          title: "How to Test a Limit Switch With a Digital Multimeter",
          desc: "Industrial and machine limit switches, including the live voltage test in control circuits.",
        },
        {
          href: "/multimeters/how-to-test-a-push-button-switch-with-a-multimeter",
          title: "How to Test a Push Button With a Multimeter",
          desc: "Tactile and panel buttons, momentary vs latching, and finding pin pairs.",
        },
      ]}
    >
      <Callout title="Unplug first, and treat microwaves with extra care">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Appliance microswitches switch mains: 230 V in the UK and Europe, 120 V in North America. Unplug the
            appliance at the socket before removing any cover; switching it off is not enough.
          </li>
          <li>
            A microwave&apos;s high-voltage capacitor can hold a charge of several thousand volts after the
            oven is unplugged, enough to kill. If you are not trained to discharge it safely, do not open the
            outer case. Interlock switches are reachable, but only after that capacitor is dealt with.
          </li>
          <li>Never bypass or bridge a door interlock to &quot;test&quot; an appliance with power on.</li>
        </ul>
      </Callout>

      <section>
        <h2 id="where-microswitches-are" className="text-xl font-semibold mb-3">Where appliance microswitches hide</h2>
        <p className="text-muted leading-7 mb-4">
          A microswitch is a small snap-action switch: a light push trips an internal spring that flips the
          contacts quickly, however slowly you press. Doors, lids and levers use them to report position.
        </p>
        <InfoCards
          items={[
            { label: "Microwave door", desc: "Two or three interlocks, plus a monitor switch, decide whether the magnetron may run." },
            { label: "Kettle", desc: "A switch in the base or handle, flipped by the lever and released by the thermostat at boiling." },
            { label: "Washing machine", desc: "The door lock assembly includes a switch that tells the board the door is shut and latched." },
            { label: "Mouse buttons", desc: "Tiny three-pin switches under each button; worn ones cause unwanted double-clicks." },
            { label: "Lever and roller", desc: "Longer actuators reach doors and cams in tumble dryers, dishwashers and vending gear." },
            { label: "Pin plunger", desc: "The bare switch, pressed directly by a molded tab or button cap." },
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="identify-terminals">Identify COM, NO and NC on the switch</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Most microswitches have three spade or solder tabs. COM is the common contact, NO (normally open)
          connects to COM only while the actuator is pressed, and NC (normally closed) connects at rest and
          breaks when pressed. The letters are usually molded beside each tab, sometimes as C, 1, 2 and 4
          on European parts. Some appliance switches have only two tabs, so they are either NO or NC.
        </p>
        <Figure
          caption={
            <>
              A typical roller-lever microswitch. Photograph the wiring before pulling any spade connectors
              off, then probe COM with one lead and NO or NC with the other.
            </>
          }
        >
          <MicroswitchDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Take at least one wire off first, or other wiring can create a parallel path and a false beep. New
          to continuity mode? See{" "}
          <Link href="/multimeters/how-to-use-a-multimeter" className={link}>
            how to use a multimeter
          </Link>{" "}
          covers the settings.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="pressed-and-released">Test continuity with the actuator pressed and released</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set the meter to continuity. With the lever untouched, test COM to NC, then COM to NO. Press the
          actuator fully, hold it, and repeat both. Press by hand on the lever or plunger rather than relying
          on the door or cam, so you know the switch is actually being operated.
        </p>
        <DataTable
          head={["Probes on", "Actuator released", "Actuator pressed"]}
          rows={[
            ["COM and NC", "Beep, near 0 Ω", "OL (open)"],
            ["COM and NO", "OL (open)", "Beep, near 0 Ω"],
            ["NO and NC", "OL", "OL"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          NO to NC should never connect; if it does, the switch is internally damaged. OL simply means the
          resistance is above the meter&apos;s range, which is exactly what an open contact should show. See{" "}
          <Link href="/multimeters/what-does-ol-mean-on-a-multimeter" className={link}>
            what OL means on a multimeter
          </Link>{" "}
          for how each mode displays it.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="contact-resistance">Measure contact resistance in ohms</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A beep only proves resistance is below the meter&apos;s continuity threshold, which on many meters is
          tens of ohms. For a switch carrying a kettle element or a motor, that is not good enough. Switch to
          the lowest ohms range, touch the probe tips together and note the lead resistance, then measure the
          closed contact and subtract it.
        </p>
        <Figure
          caption={
            <>
              Illustrative readings across a closed COM to NO contact, lead resistance already subtracted. A
              healthy contact typically sits well under an ohm (left); a reading of several ohms that changes
              with finger pressure (right) means pitted or contaminated contacts.
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="0.08" unit="Ω" mode="Ω  healthy contact" />
            <MeterReadout value="4.7" unit="Ω" mode="Ω  worn contact" />
          </div>
        </Figure>
      </section>

      <section id="click-vs-function">
        <KeyIdea title="The click is not the test">
          A crisp click tells you the snap spring is working. It says nothing about the contacts, which can be
          burnt flat or coated in carbon while the mechanism still sounds perfect. Always trust the meter
          reading over the sound.
        </KeyIdea>
      </section>

      <section>
        <h2 id="microwave-interlocks" className="text-xl font-semibold mb-3">Testing microwave door interlock switches</h2>
        <p className="text-muted leading-7 mb-4">
          Microwaves typically use a primary and a secondary interlock that close when the door shuts, plus a
          monitor switch wired across the supply that closes when the door opens. If a primary switch welds
          shut, opening the door lets the monitor switch short the line and blow the fuse on purpose, so a
          repeatedly blown fuse is a strong hint that an interlock has failed.
        </p>
        <p className="text-muted leading-7">
          With the oven unplugged and the capacitor safely discharged, remove each switch&apos;s connectors and
          test them one at a time with the door open and shut. Note which tabs each wire came from, as the
          monitor switch usually uses COM and NC while the others use COM and NO. Fit the exact replacement
          parts listed for that model. The same reasoning helps with a blown plug fuse on other appliances:
          our guide to{" "}
          <Link href="/multimeters/how-to-test-a-13-amp-plug-fuse-with-a-multimeter" className={link}>
            testing a 13 amp plug fuse
          </Link>{" "}
          shows how to confirm it.
        </p>
      </section>

      <section>
        <h2 id="kettles-locks-mice" className="text-xl font-semibold mb-3">Kettles, washing machine door locks and mouse buttons</h2>
        <ul className="space-y-3 list-disc pl-5 text-muted leading-7">
          <li>
            <strong className="text-foreground">Kettles:</strong> the switch usually sits in the handle or base
            with the thermostat. Unplug, let it cool and empty it, then check continuity across the switch with
            the lever up and down. A kettle that will not stay on may have a worn latch rather than bad
            contacts, so check the mechanism too.
          </li>
          <li>
            <strong className="text-foreground">Washing machine door locks:</strong> the lock assembly often
            contains a heated bimetal or solenoid as well as the switch. Use the wiring diagram on the
            assembly or in the service manual to find the switch pair, and don&apos;t mistake the heater&apos;s
            resistance reading for the switch contacts.
          </li>
          <li>
            <strong className="text-foreground">Mouse buttons:</strong> these switch only a low-voltage logic
            signal, so the risk is low. A button that double-clicks usually has a worn contact that bounces as
            it closes. A meter is too slow to see bounce, so a steady reading does not clear the switch; the{" "}
            <Link href="/multimeters/how-to-test-a-push-button-switch-with-a-multimeter" className={link}>
              push button testing guide
            </Link>{" "}
            explains why.
          </li>
        </ul>
        <p className="text-muted leading-7 mt-4">
          Machine-mounted switches are often tested live in their control circuit instead; see{" "}
          <Link href="/multimeters/how-to-test-a-limit-switch-with-a-digital-multimeter" className={link}>
            how to test a limit switch
          </Link>{" "}
          for that approach.
        </p>
      </section>

      <section>
        <h2 id="worn-or-sticking" className="text-xl font-semibold mb-3">Spotting worn or sticking microswitches</h2>
        <DataTable
          head={["Symptom on the meter", "What it usually means"]}
          rows={[
            ["Swaps cleanly, under an ohm when closed", "Switch is fine; check the actuator, door alignment or wiring"],
            ["COM to NO stays OL when pressed", "Contacts burnt or worn, or plunger not traveling far enough"],
            ["COM to NO beeps even when released", "Welded contacts, a common microwave interlock fault"],
            ["Closed reading of several ohms, or drifting", "Pitted, oxidised or contaminated contacts"],
            ["Beep crackles or cuts out as you press slowly", "Worn contact or weak snap spring"],
            ["Plunger stays down or returns slowly", "Sticking mechanism, often grease, limescale or heat damage"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          A bent lever, flat-spotted roller or cracked door hook can stop a good switch being pressed. If a
          reading flickers with the actuator held still, check the probe contact before blaming the switch.
        </p>
      </section>
      <section>
        <h2 id="meters-for-microswitches" className="text-xl font-semibold mb-3">Meters for appliance switch testing</h2>
        <p className="text-muted leading-7 mb-6">
          A microswitch test needs a quick continuity beeper and an ohms range that reads below one ohm clearly,
          since contact resistance is what separates a good switch from a pitted one. Appliance work also means
          confirming the machine is unplugged and any capacitor discharged, which is where a meter with a
          proper CAT rating earns its place. Compare options in our{" "}
          <Link href="/multimeters/best-multimeter-for-beginners" className={link}>
            best multimeter for beginners
          </Link>{" "}
          guide.
        </p>
        <ProductStrip
          title="Meters for appliance microswitches"
          items={[
            {
              name: "KAIWEETS KM200s",
              image: kaiweets.image,
              alt: "KAIWEETS KM200s True RMS digital multimeter",
              href: "/multimeters/kaiweets-km200s-review",
              note: "Auto-ranging True RMS with a backlit screen that helps inside dim appliance cabinets; CAT II 600V.",
            },
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 True RMS digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "Hands-on tested. CAT III 600V and a 6,000-count display, built for repeated appliance and field service calls.",
            },
            {
              name: "Extech EX330",
              image: ex330.image,
              alt: "Extech EX330 compact digital multimeter",
              href: "/multimeters/extech-ex330-review",
              note: "Pocket-sized CAT III 600V meter with NCV; Extech does not list it as True RMS, which doesn't matter for switches.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
