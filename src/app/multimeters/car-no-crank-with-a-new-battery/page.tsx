import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  KeyIdea,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "Car no-crank with a new battery? Check charge, terminals, cable voltage drop, starter relay, neutral switch, the S-terminal signal and the starter with a meter.";

export const metadata = buildMetadata({
  title: "Car No-Crank With a New Battery: What to Check",
  description,
  path: "/multimeters/car-no-crank-with-a-new-battery",
});

const fluke117 = picks.find((p) => p.name === "Fluke 117")!;

const link = "text-accent hover:underline";

export default function CarNoCrankWithANewBatteryPage() {
  return (
    <HowToShell
      title="Why Does My Car Have a No-Crank Problem Even With a New Battery?"
      description={description}
      published="2026-10-24"
      path="/multimeters/car-no-crank-with-a-new-battery"
      category="multimeters"
      intro={
        <>
          A car with a no-crank problem and a new battery is telling you the battery was probably never
          the whole story. When you turn the key or press start and the engine does not turn over, the
          fault can be anywhere between the battery posts and the starter motor: a clamp, a cable, a
          ground strap, a relay, a safety switch, the start signal or the starter itself. A multimeter
          on DC volts lets you follow the current path one link at a time instead of replacing parts.
        </>
      }
      aside={{
        image: fluke117.image,
        alt: "Fluke 117 digital multimeter, front view",
        caption: (
          <>
            A no-crank diagnosis is almost entirely DC volts readings, many taken while someone turns the
            key. See our{" "}
            <Link href="/multimeters/fluke-117-review" className={link}>
              Fluke 117 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "no-crank-vs-no-start", label: "No-crank vs no-start" },
        { id: "diagnostic-order", label: "The diagnostic order" },
        { id: "confirm-the-battery", label: "Confirm the battery" },
        { id: "terminals-and-cables", label: "Terminals and cable voltage drop" },
        { id: "starter-relay-and-switches", label: "Starter relay and safety switches" },
        { id: "s-terminal-signal", label: "Signal at the solenoid S terminal" },
        { id: "starter-and-fusible-links", label: "Starter motor and fusible links" },
        { id: "summary-table", label: "Summary of readings" },
      ]}
      faq={[
        {
          q: "Can a new battery be the cause of a no-crank?",
          a: "It can. A new battery may not have been fully charged when fitted, may have been run down during attempts to start, or can occasionally be faulty from the start. Measuring its resting voltage and its voltage while you try to crank rules it in or out in a minute.",
        },
        {
          q: "Why do I hear a single click but the engine does not turn?",
          a: "A single click usually means the starter solenoid is receiving its control signal and trying to close, but not enough current is reaching the motor. Common causes are a voltage drop in the main cables or grounds, burnt solenoid contacts, or a starter motor that has failed. A voltage drop test while cranking separates the cables from the starter.",
        },
        {
          q: "Can the immobilizer stop the engine cranking?",
          a: "On some vehicles, yes. If the anti-theft system does not recognize the key, it may block the starter circuit, while on others it allows cranking but stops the engine from running. A flashing security light on the dash is a clue. Diagnosis needs a scan tool or dealer procedure, not a multimeter.",
        },
        {
          q: "Does tapping the starter prove it is faulty?",
          a: "If the engine cranks after a light tap on the starter body, the brushes or solenoid contacts are likely worn and sticking, which points to a starter that needs repair or replacement. It is a clue, not a test, so confirm that the starter is receiving full voltage and a good ground before condemning it.",
        },
        {
          q: "What should battery voltage drop to while cranking?",
          a: "A commonly quoted rule of thumb is that a healthy battery stays above about 9.6 V while cranking at normal temperature. If voltage stays near 12.6 V and nothing turns, current is not flowing at all, which points to the control side, an open cable or the starter rather than the battery.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-check-voltage-drop-on-a-car",
          title: "How to Check Voltage Drop on a Car",
          desc: "The full method for testing cables and grounds under cranking load.",
        },
        {
          href: "/multimeters/how-to-test-an-automotive-relay-with-a-multimeter",
          title: "How to Test an Automotive Relay",
          desc: "Bench-test the starter relay's coil and contacts.",
        },
      ]}
    >
      <Callout title="Safety when testing a starting circuit">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            The starter circuit carries very high current. Keep tools and jewelry away from the battery
            positive terminal and the starter&apos;s main stud.
          </li>
          <li>
            Set the parking brake and keep the transmission in Park or neutral. If you bridge any starter
            terminals, the engine can turn over, so stay clear of the belts and fan.
          </li>
          <li>Leave the red lead in the V jack. Never use the current jacks on a starter circuit.</li>
        </ul>
      </Callout>

      <section>
        <h2 id="no-crank-vs-no-start" className="text-xl font-semibold mb-3">No-crank is not the same as no-start</h2>
        <p className="text-muted leading-7">
          No-crank means the engine does not rotate at all when you turn the key: you hear silence, a
          click, or rapid clicking. No-start means the engine turns over normally but does not fire, which
          is a fuel, spark or immobilizer question. Everything below applies to the first case, where the
          starting circuit itself is not delivering enough current to the starter motor.
        </p>
      </section>

      <section>
        <h2 id="diagnostic-order" className="text-xl font-semibold mb-3">The diagnostic order</h2>
        <p className="text-muted leading-7 mb-5">
          Work from the battery outward. Each check is quick, and the order puts the most common and
          cheapest faults first.
        </p>
        <FlowDiagram
          steps={[
            { label: "Battery", sub: "Resting volts and volts while cranking" },
            { label: "Cables", sub: "Clamps, positive and ground voltage drop" },
            { label: "Control", sub: "Relay, neutral or clutch switch, start signal" },
            { label: "Starter", sub: "S-terminal volts, then the motor itself" },
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="confirm-the-battery">Confirm the battery&apos;s state of charge</StepHeading>
        <p className="text-muted leading-7">
          New does not mean charged. Measure across the posts with everything off: a fully charged
          12 V lead-acid battery rests at roughly 12.6 V, and a reading near 12.2 V means it is only about
          half charged. Then watch the meter while a helper turns the key. If voltage collapses far below
          the commonly used 9.6 V guideline, charge and load-test the battery as described in{" "}
          <Link href="/multimeters/how-to-test-a-car-battery-with-a-multimeter" className={link}>
            how to test a car battery
          </Link>
          . If it barely moves from resting voltage, very little current is flowing, so the problem lies
          further along.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="terminals-and-cables">Check terminals and cable voltage drop</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A fresh battery is often fitted onto old clamps. Corrosion between post and clamp, or under the
          insulation of the cable, adds resistance that only shows up when the starter tries to draw
          heavy current. Clean both clamps to bright metal and tighten them, then test each side of the
          circuit while cranking.
        </p>
        <Figure
          caption={
            <>
              Two voltage drop tests while cranking. Positive side: battery + post to the starter&apos;s
              main stud. Ground side: engine block to battery − post. Each reading is the voltage lost
              along that path.
            </>
          }
        >
          <svg viewBox="0 0 320 160" className="w-full h-auto" role="img" aria-label="Diagram of positive and ground side voltage drop test points between battery and starter">
            <g className="stroke-foreground" strokeWidth="1.6" fill="none">
              <rect x="14" y="54" width="70" height="44" rx="4" />
              <line x1="34" y1="54" x2="34" y2="46" />
              <line x1="64" y1="54" x2="64" y2="46" />
              <path d="M34 46 L34 24 L236 24 L236 56" />
              <rect x="210" y="56" width="96" height="44" rx="6" />
              <path d="M64 46 L64 40 L120 40 L120 132 L258 132 L258 100" />
            </g>
            <text x="49" y="80" fontSize="10" textAnchor="middle" className="fill-foreground">Battery</text>
            <text x="34" y="66" fontSize="10" textAnchor="middle" className="fill-foreground">+</text>
            <text x="64" y="66" fontSize="10" textAnchor="middle" className="fill-foreground">−</text>
            <text x="258" y="82" fontSize="10" textAnchor="middle" className="fill-foreground">Starter / block</text>
            <text x="140" y="18" fontSize="9" textAnchor="middle" className="fill-muted">Positive cable</text>
            <text x="190" y="148" fontSize="9" textAnchor="middle" className="fill-muted">Ground cable and strap</text>
            <path d="M34 34 Q135 4 236 46" className="stroke-accent" strokeWidth="1.4" strokeDasharray="3 2" fill="none" />
            <path d="M84 80 Q150 112 248 110" className="stroke-accent" strokeWidth="1.4" strokeDasharray="3 2" fill="none" />
            <text x="160" y="60" fontSize="9" textAnchor="middle" className="fill-accent">V across + side</text>
            <text x="170" y="122" fontSize="9" textAnchor="middle" className="fill-accent">V across ground side</text>
          </svg>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Commonly used guidelines are about 0.5 V or less on the positive side and about 0.2–0.3 V or
          less on the ground side; your service manual may give its own limits. The full procedure,
          including how to split a cable into sections to find the exact bad joint, is in our guide on{" "}
          <Link href="/multimeters/how-to-check-voltage-drop-on-a-car" className={link}>
            checking voltage drop on a car
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={3} id="starter-relay-and-switches">Check the starter relay and safety switches</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Most cars route the start signal through a starter relay in the underhood fuse box. Swapping it
          with an identical relay is a fast check, and our guide on{" "}
          <Link href="/multimeters/how-to-test-an-automotive-relay-with-a-multimeter" className={link}>
            testing an automotive relay
          </Link>{" "}
          covers bench testing. In the socket, the relay&apos;s coil should receive voltage when the key is
          turned to start.
        </p>
        <p className="text-muted leading-7">
          No signal at the relay coil points upstream. An automatic transmission has a neutral safety or
          range switch that only allows cranking in Park or neutral; a manual usually has a clutch pedal
          switch. Try starting in neutral, or with the pedal pressed firmly to the floor. The ignition
          switch itself, or a push-button start module, is the next link back. Many newer cars send the
          start request through the body or engine computer, so a wiring diagram for your vehicle is
          essential at this stage.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="s-terminal-signal">Measure the signal at the solenoid S terminal</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The starter solenoid has a small terminal, often marked S, that receives the start signal, and
          a large stud that carries battery current to the motor. Back-probe the S terminal with the
          black lead on the engine block, and have a helper hold the key in start for a moment.
        </p>
        <KeyIdea title="The reading that splits the circuit">
          Near battery voltage at S while cranking means the whole control side is working, so the fault
          is in the solenoid, the motor or the main cables. Zero volts at S means the starter is not being
          asked to run, so go back to the relay, safety switch and start signal.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={5} id="starter-and-fusible-links">Starter motor, fusible links and immobilizer</StepHeading>
        <p className="text-muted leading-7 mb-4">
          If S has voltage, the main stud has battery voltage while cranking and both voltage drops are
          within limits, the starter itself is the most likely fault: worn brushes, burnt solenoid
          contacts or a seized armature. Fusible links or a main fuse between the battery and the rest of
          the car can also open; when one fails, the dash may stay dark while the battery posts read
          normally. Check across them with DC volts the same way as an ordinary fuse.
        </p>
        <p className="text-muted leading-7">
          Finally, some anti-theft immobilizers block the starter circuit when they do not recognize the
          key. That needs a scan tool, so rule out the electrical path above before suspecting it.
        </p>
      </section>

      <section>
        <h2 id="summary-table" className="text-xl font-semibold mb-3">Summary of readings</h2>
        <DataTable
          head={["Measurement", "Points to"]}
          rows={[
            ["Battery well below 12.4 V at rest", "Charge the battery and retest"],
            ["Battery collapses very low while cranking", "Battery or a shorted starter"],
            ["High voltage drop on positive or ground side", "Clamp, cable or ground strap"],
            ["No voltage at relay coil in start", "Safety switch, ignition switch or start request"],
            ["No voltage at S terminal", "Relay contacts or wire to starter"],
            ["Voltage at S and main stud, no crank", "Starter motor or solenoid"],
          ]}
        />
      </section>
    </HowToShell>
  );
}
