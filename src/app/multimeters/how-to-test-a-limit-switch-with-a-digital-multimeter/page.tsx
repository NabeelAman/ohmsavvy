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
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to test a limit switch with a digital multimeter: find COM, NO and NC, check continuity released and actuated, then read the voltage across it live.";

export const metadata = buildMetadata({
  title: "Test a Limit Switch With a Digital Multimeter",
  description,
  path: "/multimeters/how-to-test-a-limit-switch-with-a-digital-multimeter",
});

const fluke87v = picks.find((p) => p.name === "Fluke 87V")!;

const link = "text-accent hover:underline";

export default function HowToTestALimitSwitchWithADigitalMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Limit Switch With a Digital Multimeter"
      description={description}
      path="/multimeters/how-to-test-a-limit-switch-with-a-digital-multimeter"
      category="multimeters"
      published="2026-10-22"
      intro={
        <>
          A limit switch tells a machine that something has reached the end of its travel: a door closed, a
          carriage at home, a 3D printer axis at zero. To test a limit switch with a digital multimeter you
          check its contacts twice, once released and once pressed, and confirm they swap state cleanly. On
          equipment that is already wired and powered, a voltage reading across the switch gives the same
          answer without disconnecting anything.
        </>
      }
      aside={{
        image: fluke87v.image,
        alt: "Fluke 87V industrial digital multimeter",
        caption: (
          <>
            For industrial control panels, a meter rated for the circuit matters. See our{" "}
            <Link href="/multimeters/fluke-87v-review" className={link}>
              Fluke 87V review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "safety", label: "Lock out the machine first" },
        { id: "terminals", label: "COM, NO and NC terminals" },
        { id: "released", label: "1. Check the released state" },
        { id: "actuated", label: "2. Actuate and recheck" },
        { id: "live-test", label: "3. Live voltage test in the circuit" },
        { id: "wear-and-bounce", label: "Mechanical wear and contact bounce" },
        { id: "endstops", label: "3D printer endstops vs industrial switches" },
        { id: "diagnosis", label: "Reading the results" },
      ]}
      faq={[
        {
          q: "Why does my limit switch read closed when it isn't pressed?",
          a: "You are probably measuring between COM and NC, which is closed at rest by design. Move the probe to the NO terminal: it should read open until the actuator is pressed. If COM to NO reads closed with the switch released, the contacts are welded or stuck, or the actuator isn't fully returning.",
        },
        {
          q: "Should a limit switch be wired normally open or normally closed?",
          a: "It depends on the machine, but safety and end-of-travel circuits are often wired normally closed so that a broken wire or loose terminal looks the same as a tripped switch and stops the motion. Many 3D printer boards default to this too. Check the wiring diagram or firmware setting before assuming a reading is wrong.",
        },
        {
          q: "How do I test an optical or Hall-effect endstop?",
          a: "Not with continuity, because there are no mechanical contacts. Power it normally, set the meter to DC volts, and measure between the signal pin and ground. The signal should switch between near 0V and near the supply voltage as you block the optical slot or bring the magnet close. Which state means triggered depends on the module.",
        },
        {
          q: "What voltage should I see across a closed limit switch?",
          a: "Close to zero, typically well under a volt in a control circuit. A closed contact should drop almost nothing. If you read several volts across a switch that should be closed, its contacts have high resistance from wear, contamination or arcing, and it is starving whatever it feeds of voltage.",
        },
        {
          q: "Can a multimeter detect contact bounce?",
          a: "Not really. Bounce lasts a few milliseconds, far quicker than a multimeter display updates. The continuity beeper may chirp unevenly, which is a hint, but an oscilloscope across the contacts is the proper tool for seeing bounce. A switch that bounces badly is usually worn and is often easier to replace than to debounce in software.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-rotary-switch-with-a-multimeter",
          title: "How to Test a Rotary Switch With a Multimeter",
          desc: "Mapping a switch with many positions instead of just two states.",
        },
        {
          href: "/multimeters/best-multimeter-for-electricians",
          title: "Best Multimeter for Electricians",
          desc: "Meters rated for the 120V and 240V control circuits many limit switches sit in.",
        },
      ]}
    >
      <section id="safety">
        <Callout title="Lock out the machine before touching a limit switch">
          Pressing a limit switch by hand can start or stop motion on equipment that is powered. Follow your
          site&apos;s lockout/tagout procedure for continuity tests. For the live voltage test, keep clear of
          moving parts, don&apos;t actuate switches on running machinery, and use a meter with a CAT rating
          suited to the control voltage.
        </Callout>
      </section>

      <section>
        <h2 id="terminals" className="text-xl font-semibold mb-3">COM, NO and NC terminals</h2>
        <p className="text-muted leading-7 mb-4">
          Most small limit switches and microswitches are single-pole, double-throw changeover types with three
          terminals. Industrial limit switches often instead carry two separate contacts, one normally open and
          one normally closed, each with its own pair of terminals. Either way, the markings are usually
          moulded next to the terminals.
        </p>
        <InfoCards
          items={[
            { label: "COM (C)", desc: "Common. The moving contact; every reading starts here." },
            { label: "NO", desc: "Normally open. Connects to COM only while the actuator is pressed." },
            { label: "NC", desc: "Normally closed. Connected to COM at rest, opens when pressed." },
          ]}
        />
        <Figure
          caption={
            <>
              A changeover limit switch at rest and pressed. Released, COM connects to NC; pressing the lever
              moves the contact over to NO. A good switch is never connected to both at once.
            </>
          }
        >
          <svg viewBox="0 0 320 140" className="w-full h-auto" role="img" aria-label="Diagram of a limit switch's COM, NO and NC contacts in the released and actuated states">
            {[0, 160].map((dx, i) => (
              <g key={dx} transform={`translate(${dx},0)`}>
                <g className="stroke-foreground" strokeWidth="1.6" fill="none">
                  <line x1="15" y1="80" x2="50" y2="80" />
                  <circle cx="50" cy="80" r="3" className="fill-foreground" />
                  <line x1="50" y1="80" x2="100" y2={i === 0 ? 100 : 60} className="stroke-accent" strokeWidth="2.4" />
                  <circle cx="104" cy="58" r="3" />
                  <circle cx="104" cy="102" r="3" />
                  <line x1="107" y1="58" x2="140" y2="58" />
                  <line x1="107" y1="102" x2="140" y2="102" />
                </g>
                <text x="15" y="72" fontSize="9" className="fill-muted">COM</text>
                <text x="118" y="52" fontSize="9" className={i === 1 ? "fill-accent" : "fill-muted"}>NO</text>
                <text x="118" y="118" fontSize="9" className={i === 0 ? "fill-accent" : "fill-muted"}>NC</text>
                <text x="78" y="22" fontSize="10" textAnchor="middle" className="fill-foreground">{i === 0 ? "Released" : "Actuated"}</text>
                <text x="78" y="134" fontSize="9" textAnchor="middle" className="fill-muted">{i === 0 ? "COM–NC closed" : "COM–NO closed"}</text>
              </g>
            ))}
          </svg>
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="released">Check the released state</StepHeading>
        <p className="text-muted leading-7">
          With power locked out, disconnect at least one wire from the switch so the rest of the circuit
          can&apos;t create a parallel path. Set the meter to continuity. With the actuator untouched, COM to NC
          should beep and COM to NO should read OL. Switch to ohms and note the closed reading: it should be a
          fraction of an ohm above your shorted test leads.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="actuated">Actuate and recheck</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Press the lever, plunger or roller through its full travel and hold it. Now COM to NO should beep and
          COM to NC should read OL. Then press it slowly several times while listening: the change should
          happen at the same point in the stroke each time, with a crisp click and a clean beep, not a crackle.
        </p>
        <FlowDiagram
          steps={[
            { label: "Lock out", sub: "Isolate, lift one wire" },
            { label: "Released", sub: "COM–NC closed, NO open" },
            { label: "Actuated", sub: "COM–NO closed, NC open" },
            { label: "Repeat slowly", sub: "Same trip point every time" },
          ]}
        />
      </section>

      <section>
        <StepHeading n={3} id="live-test">Live voltage test in the control circuit</StepHeading>
        <p className="text-muted leading-7 mb-4">
          When a switch is wired in series with a coil, relay input or PLC input, you can test it powered.
          Set the meter to AC or DC volts to match the control supply and probe across the two terminals in
          use. A closed contact reads close to 0V because it drops almost nothing. An open contact reads close
          to the full supply voltage, because the load on the other side ties that terminal back to the
          opposite supply line. A switch that should be closed but reads full voltage is open; one that reads
          a few volts is passing current through dirty or burnt contacts.
        </p>
        <Figure
          caption={
            <>
              A closed limit switch in a 24VDC control circuit reading 0.04V across its contacts: a healthy
              closed contact. The same switch reading close to 24V while it should be closed has failed open.
            </>
          }
        >
          <div className="max-w-xs mx-auto">
            <MeterReadout value="0.04" unit="VDC" mode="V  across closed switch" />
          </div>
        </Figure>
      </section>

      <section id="wear-and-bounce">
        <KeyIdea title="Mechanical wear and contact bounce">
          Limit switches fail mechanically as often as electrically: a worn roller, a bent lever arm, a loose
          mounting that lets the target miss the actuator, or a plunger that no longer travels far enough to
          trip. Every contact also bounces for a few milliseconds when it closes. A meter can&apos;t show that,
          but an erratic beep on slow actuation is a sign of worn contacts; our{" "}
          <Link href="/multimeters/multimeter-continuity-beep-intermittent" className={link}>
            intermittent continuity guide
          </Link>{" "}
          helps separate a bad switch from a bad probe connection.
        </KeyIdea>
      </section>

      <section>
        <h2 id="endstops" className="text-xl font-semibold mb-3">3D printer endstops vs industrial limit switches</h2>
        <p className="text-muted leading-7">
          Mechanical 3D printer endstops are small microswitches on a breakout board, switching a logic-level
          signal at 5V or 3.3V. Unplug the endstop cable and test the switch&apos;s contacts directly, then
          compare with what the firmware reports: Marlin-based printers, for example, list each endstop&apos;s
          state with the M119 command. Industrial limit switches use the same contact logic but are sealed,
          heavier units in 24V or 120V control circuits, where the live voltage test above is usually the
          faster check. For broken leads to the switch, see{" "}
          <Link href="/multimeters/how-to-test-electrical-wires-with-a-multimeter" className={link}>
            how to test electrical wires
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="diagnosis" className="text-xl font-semibold mb-3">Reading the results</h2>
        <DataTable
          head={["What you find", "Likely cause"]}
          rows={[
            ["Contacts swap cleanly, near 0 Ω when closed", "Healthy switch; check wiring, mounting and the target"],
            ["COM–NO never closes when pressed", "Contact worn or burnt, or actuator not travelling far enough"],
            ["COM–NC stays closed when pressed", "Welded contact or jammed mechanism"],
            ["Closed contact reads several ohms or drifts", "Dirty, oxidised or arcing-damaged contacts"],
            ["Trip point varies from press to press", "Worn spring, loose lever or failing mechanism"],
            ["Several volts across a closed switch, live", "High contact resistance under load; replace the switch"],
          ]}
        />
      </section>
    </HowToShell>
  );
}
