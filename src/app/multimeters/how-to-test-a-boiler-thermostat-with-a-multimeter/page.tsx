import Link from "next/link";
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
  "How to test a boiler thermostat with a multimeter: isolate the fused spur, check the stat switches on call for heat, and tell a stat fault from a boiler one.";

export const metadata = buildMetadata({
  title: "How to Test a Boiler Thermostat With a Multimeter",
  description,
  path: "/multimeters/how-to-test-a-boiler-thermostat-with-a-multimeter",
});

const kaiweets = picks.find((p) => p.name === "KAIWEETS KM200s")!;
const klein = picks.find((p) => p.name === "Klein Tools MM400")!;
const fluke115 = picks.find((p) => p.name === "Fluke 115")!;

const link = "text-accent hover:underline";

/** Room thermostat as a switch in the switched-live loop between the wiring center / boiler and the call-for-heat input. */
function SwitchedLiveDiagram() {
  return (
    <svg viewBox="0 0 340 200" className="w-full h-auto" role="img" aria-label="Diagram of a room thermostat switching the live feed back to the boiler">
      <g className="stroke-foreground" strokeWidth="1.6" fill="none" strokeLinecap="round">
        <rect x="14" y="40" width="96" height="110" rx="6" className="fill-surface" />
        <rect x="230" y="40" width="96" height="110" rx="6" className="fill-surface" />
        {/* permanent live out to stat COM */}
        <path d="M110 70 H230" />
        {/* switched live back */}
        <path d="M230 120 H200" />
        <path d="M150 120 H110" />
        {/* switch contact inside stat */}
        <path d="M200 120 L162 104" className="stroke-accent" strokeWidth="2.2" />
        <circle cx="200" cy="120" r="3" className="fill-accent stroke-accent" />
        <circle cx="150" cy="120" r="3" className="fill-foreground" />
      </g>
      <g fontSize="10" className="fill-foreground" textAnchor="middle">
        <text x="62" y="32">Boiler / wiring center</text>
        <text x="278" y="32">Room thermostat</text>
        <text x="62" y="74" className="fill-muted">Live out</text>
        <text x="62" y="124" className="fill-muted">Call for heat in</text>
        <text x="278" y="74" className="fill-muted">COM (often 1 or L)</text>
        <text x="278" y="124" className="fill-muted">Call for heat (often 3)</text>
        <text x="175" y="62" className="fill-muted">permanent live</text>
        <text x="170" y="168" className="fill-accent">switched live: closes when heat is wanted</text>
      </g>
      <text x="170" y="190" fontSize="9" textAnchor="middle" className="fill-muted">
        Terminal numbers vary by brand: always confirm against the thermostat&apos;s own manual
      </text>
    </svg>
  );
}

export default function HowToTestABoilerThermostatPage() {
  return (
    <HowToShell
      title="How to Test a Boiler Thermostat With a Multimeter"
      description={description}
      published="2026-10-22"
      path="/multimeters/how-to-test-a-boiler-thermostat-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a boiler thermostat with a multimeter, isolate the heating circuit at its fused spur, take the
          room thermostat off its backplate, and check continuity between its common and call-for-heat terminals
          as you turn the setpoint up and down. A working stat closes (beep, near 0 Ω) when you ask for heat and
          opens (OL) when you don&apos;t. This guide covers wired 230V stats, low-voltage and wireless types, and
          where your job stops and a Gas Safe engineer&apos;s starts.
        </>
      }
      aside={{
        image: kaiweets.image,
        alt: "KAIWEETS KM200s True RMS digital multimeter",
        caption: (
          <>
            A continuity beeper is the main function you need here. The KAIWEETS KM200s is our budget pick for
            home use; see the{" "}
            <Link href="/multimeters/kaiweets-km200s-review" className={link}>
              KM200s review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "which-thermostat", label: "Which thermostat are you testing?" },
        { id: "isolate", label: "Isolate and prove dead" },
        { id: "find-terminals", label: "Find the terminals" },
        { id: "continuity-test", label: "Continuity test on call for heat" },
        { id: "live-test", label: "Optional live voltage check" },
        { id: "wireless-and-low-voltage", label: "Wireless and low-voltage stats" },
        { id: "results", label: "Reading the results" },
        { id: "not-the-stat", label: "When the stat is fine" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "Can I test the thermostat inside my combi boiler myself?",
          a: "No. The boiler's own control thermostat and its NTC temperature sensors sit inside the sealed casing next to gas components. In the UK, work inside a gas appliance is for a Gas Safe registered engineer. You can test the external room thermostat, programmer output and wiring to it once the circuit is isolated.",
        },
        {
          q: "Why does my room thermostat click but the boiler doesn't fire?",
          a: "A click means the relay or bimetal contact is moving, but the contacts themselves can be burnt and fail to pass current. Check continuity across COM and call-for-heat with the stat demanding heat. If that reads near 0 Ω, the stat is switching and the fault is further along: the programmer, a zone valve, wiring or the boiler.",
        },
        {
          q: "What are terminals 1, 2 and 3 on a room thermostat?",
          a: "On many UK mechanical stats, 1 is the common (live in), 3 is the call-for-heat output, 2 is a satisfied or cooling output and N feeds an accelerator heater. Brands differ, and digital stats often use L, N, COM, NO and NC instead. Always read the label on the backplate or the installation manual before probing.",
        },
        {
          q: "Do batteries matter when testing a digital thermostat?",
          a: "Yes. Many battery-powered digital stats hold their relay in its last state or stop switching when batteries are low, and some show no obvious warning. Fit fresh batteries before you test, then repeat the continuity check. A stat that only works on new batteries simply needed them.",
        },
        {
          q: "Is it legal to replace a room thermostat myself in England?",
          a: "Like-for-like replacement of a room thermostat on an existing circuit is generally treated as minor electrical work, but it must still be done safely and to BS 7671. Altering circuits can fall under Part P notification. If you're unsure, use a registered electrician or heating engineer.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-electrical-wires-with-a-multimeter",
          title: "How to Test Electrical Wires With a Multimeter",
          desc: "Continuity and break-finding on the cable run between the stat and the boiler.",
        },
        {
          href: "/multimeters/how-to-use-a-multimeter",
          title: "How to Use a Multimeter",
          desc: "Continuity, resistance and AC volts explained for first-time users.",
        },
      ]}
    >
      <Callout title="Isolate first: room stats switch 230V">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Most wired UK room thermostats carry mains voltage. Switch off and remove the fuse at the heating
            system&apos;s fused spur, then prove the terminals dead with a voltage tester you have checked on a
            known live source.
          </li>
          <li>
            Never open the boiler casing. Its internal thermostat, sensors and controls are Gas Safe engineer
            territory, and so is anything to do with the gas valve or flue.
          </li>
          <li>Continuity and resistance tests must only be done with the circuit dead.</li>
        </ul>
      </Callout>

      <section>
        <h2 id="which-thermostat" className="text-xl font-semibold mb-3">Which thermostat are you testing?</h2>
        <p className="text-muted leading-7 mb-4">
          &quot;Boiler thermostat&quot; can mean three different parts. Only the first two are things a
          householder should put a meter on:
        </p>
        <InfoCards
          items={[
            { label: "Wired room stat", desc: "On the wall, switches the 230V call for heat. Mechanical dial or digital. The focus of this guide." },
            { label: "Wireless stat + receiver", desc: "Battery stat on the wall, receiver box near the boiler holds the relay. Test the receiver output." },
            { label: "Boiler's own stat/sensors", desc: "Inside the casing: flow temperature control and NTC sensors. Gas Safe engineer only." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          A thermostat is a switch. In the usual layout it sits in a loop: a permanent live runs out from the
          boiler or wiring center to the stat, and when the room is colder than the setpoint the stat closes and
          sends that live back as the &quot;switched live&quot; that tells the boiler to fire.
        </p>
        <Figure caption={<>The room stat completes the switched-live loop. Testing it means checking that this contact closes and opens on command.</>}>
          <SwitchedLiveDiagram />
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="isolate">Isolate the heating circuit and prove it dead</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Find the fused connection unit (spur) that supplies the boiler and controls, usually next to the boiler
          or the hot water cylinder. Switch it off and take the fuse out so nobody can restore power while
          you work. Some systems also have a separate spur for a wiring center or pump, so check the system
          isn&apos;t fed from two places.
        </p>
        <p className="text-muted leading-7">
          Unscrew the thermostat from its backplate (usually one screw underneath) and prove every terminal dead
          with a voltage indicator or your meter on AC volts, testing between each terminal and earth and
          between each pair.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="find-terminals">Find the common and call-for-heat terminals</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Before disconnecting anything, photograph the wiring. You only need to identify two terminals: the
          common that receives the live, and the output that goes live on demand. Typical markings:
        </p>
        <DataTable
          head={["Stat type", "Common / live in", "Call for heat", "Other terminals"]}
          rows={[
            ["Mechanical dial (many UK brands)", "1", "3", "2 = satisfied, N = accelerator neutral"],
            ["Digital, relay output", "COM or C", "NO (normally open)", "NC, L and N for power"],
            ["Programmable stat replacing a timer", "L or COM", "CH ON or 3", "HW ON/OFF on combined units"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          These are common patterns, not a rule. The diagram printed in the backplate or the manual is the
          authority for your model.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="continuity-test">Continuity test as you change the setpoint</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set the meter to continuity (or the lowest Ω range). Many stats are designed to be tested on the
          backplate terminals with the stat body clipped back on; on others the contacts are in the stat body
          itself. Either way, the circuit stays dead.
        </p>
        <ol className="space-y-2 list-decimal pl-5 text-muted leading-7 mb-4">
          <li>Put one probe on common and the other on call for heat.</li>
          <li>Turn the setpoint well above room temperature. You should hear a click and get a beep or a reading under about 1 Ω.</li>
          <li>Turn it well below room temperature. The beep stops and the meter shows OL.</li>
          <li>Repeat a few times. Each change should switch cleanly, with no flickering reading.</li>
        </ol>
        <Figure caption={<>Typical readings across common and call-for-heat on a healthy stat: closed when calling for heat (left), open when satisfied (right).</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="0.3" unit="Ω" mode="Ω  calling for heat" />
            <MeterReadout value="OL" unit="Ω" mode="Ω  satisfied" />
          </div>
        </Figure>
        <KeyIdea title="Mechanical stats have a dead band">
          A bimetal stat needs the dial to move a degree or two past room temperature before it snaps over, and
          it won&apos;t snap back at exactly the same point. Turn the dial firmly from end to end rather than
          nudging it near room temperature.
        </KeyIdea>
      </section>

      <section>
        <h2 id="live-test" className="text-xl font-semibold mb-3">Optional: a live voltage check (competent persons only)</h2>
        <p className="text-muted leading-7">
          An electrician may instead restore power and measure AC volts from the call-for-heat terminal to
          neutral: around 230V when calling for heat and close to 0V when satisfied. That proves the whole
          chain to the stat including the programmer output, but it means working on live terminals. If you
          aren&apos;t trained and equipped for live testing, stick to the dead continuity test above. Your
          meter must be rated at least CAT II 300V for this, and preferably CAT III.
        </p>
      </section>

      <section>
        <h2 id="wireless-and-low-voltage" className="text-xl font-semibold mb-3">Wireless and low-voltage thermostats</h2>
        <p className="text-muted leading-7 mb-4">
          With a wireless stat, the battery unit on the wall has no output terminals to test. The switching
          happens in the receiver near the boiler, which usually has a status LED and a manual override button.
          Isolated, its COM and NO terminals can be checked for continuity just like a wired stat, using the
          receiver&apos;s own manual test or override to switch the relay.
        </p>
        <p className="text-muted leading-7">
          Some modern stats talk to the boiler over a low-voltage two-wire bus such as OpenTherm. These carry a
          data signal, not a simple switch, so a continuity test proves nothing. Check the wiring for continuity
          and let the boiler&apos;s own diagnostics, or an engineer, do the rest.
        </p>
      </section>

      <section>
        <h2 id="results" className="text-xl font-semibold mb-3">Reading the results</h2>
        <DataTable
          head={["What you see", "Likely meaning"]}
          rows={[
            ["Beep on heat demand, OL when turned down", "Thermostat is switching correctly"],
            ["OL whatever the setting", "Burnt or open contact, failed relay, or flat batteries in a digital stat"],
            ["Beep whatever the setting", "Welded contacts or stuck relay: boiler would run non-stop"],
            ["Reading that flickers or sits at several ohms", "Pitted contacts: likely to fail intermittently"],
            ["Stat fine, but no live reaches common", "Fault upstream: programmer, wiring center or fuse"],
          ]}
        />
        <Figure caption={<>Where to look next, in order. Each step either clears or catches one link in the chain.</>}>
          <FlowDiagram
            steps={[
              { label: "Programmer on?", sub: "CH set to ON" },
              { label: "Stat switching?", sub: "COM to call-for-heat" },
              { label: "Wiring intact?", sub: "Continuity to boiler" },
              { label: "Zone valve?", sub: "On S-plan/Y-plan" },
              { label: "Boiler fault", sub: "Call Gas Safe" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="not-the-stat" className="text-xl font-semibold mb-3">When the thermostat tests fine</h2>
        <p className="text-muted leading-7">
          If the stat switches cleanly, check the cable back to the boiler or wiring center for a broken core
          using the method in{" "}
          <Link href="/multimeters/how-to-test-electrical-wires-with-a-multimeter" className={link}>
            how to test electrical wires
          </Link>
          . On systems with a hot water cylinder, a sticking motorised zone valve can stop the boiler firing even
          with a good stat. Beyond that, a boiler showing a fault code or locking out needs a Gas Safe registered
          engineer.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter you need</h2>
        <p className="text-muted leading-7 mb-6">
          Any meter with a continuity beeper handles the dead test. For live checks on 230V heating controls,
          choose a meter rated at least CAT III with well-shrouded leads. Compare options in our{" "}
          <Link href="/multimeters/best-multimeter-for-home-use" className={link}>
            best multimeter for home use
          </Link>{" "}
          guide.
        </p>
        <ProductStrip
          title="Meters in our reviews"
          items={[
            {
              name: "KAIWEETS KM200s",
              image: kaiweets.image,
              alt: "KAIWEETS KM200s True RMS digital multimeter",
              href: "/multimeters/kaiweets-km200s-review",
              note: "True RMS, CAT II 600V, auto-ranging. Our budget pick for home use and beginners.",
            },
            {
              name: "Klein Tools MM400",
              image: klein.image,
              alt: "Klein Tools MM400 auto-ranging digital multimeter",
              href: "/multimeters/klein-mm400-review",
              note: "Auto-ranging, CAT III 600V, with temperature and capacitance. Not True RMS; discontinued by Klein.",
            },
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 True RMS digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "True RMS, CAT III 600V Fluke field-service meter. Hands-on tested by OhmSavvy.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
