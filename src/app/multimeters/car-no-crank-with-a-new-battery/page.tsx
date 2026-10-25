import Link from "next/link";
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
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const description =
  "Car no-crank with a new battery? Check charge, terminals, cable voltage drop, starter relay, neutral switch, the S-terminal signal and the starter with a meter.";

export const metadata = buildMetadata({
  title: "Car No-Crank With a New Battery: What to Check",
  description,
  path: "/multimeters/car-no-crank-with-a-new-battery",
});

const all = getAllPicks("multimeters");
const fluke117 = all.find((p) => p.name === "Fluke 117")!;
const dm300 = all.find((p) => p.name === "Power Probe DM300AUTO")!;
const fluke88v = all.find((p) => p.name === "Fluke 88V")!;
const innova3320 = all.find((p) => p.name === "Innova 3320")!;

const link = "text-accent hover:underline";

export default function CarNoCrankWithANewBatteryPage() {
  return (
    <HowToShell
      title="Why Does My Car Have a No-Crank Problem Even With a New Battery?"
      description={description}
      published="2026-10-24"
      updated="2026-10-25"
      path="/multimeters/car-no-crank-with-a-new-battery"
      category="multimeters"
      intro={
        <>
          A car that will not crank with a new battery usually has a fault between the battery and the
          starter: a loose or corroded clamp, a high-resistance cable or ground strap, a blown main fuse,
          a starter relay or safety switch that never sends the start signal, or a starter motor that has
          failed. Less often the new battery itself is flat or faulty, which a resting-voltage reading
          settles in seconds. Fitting the battery is also when clamps get disturbed, grounds get knocked
          and fusible links get blown by a slipped wrench, so this guide starts with what changed during
          the swap, then follows the current path with a multimeter on DC volts, one link at a time,
          instead of replacing parts.
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
        { id: "causes", label: "Causes at a glance" },
        { id: "what-changed", label: "What changed during the swap" },
        { id: "diagnostic-order", label: "The diagnostic order" },
        { id: "confirm-the-battery", label: "Confirm the battery" },
        { id: "terminals-and-cables", label: "Terminals and cable voltage drop" },
        { id: "starter-relay-and-switches", label: "Starter relay and safety switches" },
        { id: "s-terminal-signal", label: "Signal at the solenoid S terminal" },
        { id: "starter-and-fusible-links", label: "Starter motor and fusible links" },
        { id: "summary-table", label: "Summary of readings" },
        { id: "meters", label: "Meters for this job" },
      ]}
      faq={[
        {
          q: "Can a new battery be the cause of a no-crank?",
          a: "It can. A new battery may not have been fully charged when fitted, may have been run down during repeated attempts to start, or can occasionally be faulty from the start. Measuring its resting voltage, then its voltage while someone tries to crank, rules it in or out in a minute. Around 12.6 V at rest and above about 9.6 V while cranking points elsewhere.",
        },
        {
          q: "Why do I hear a single click but the engine does not turn?",
          a: "A single click usually means the starter solenoid is receiving its control signal and trying to close, but not enough current is reaching the motor. Common causes are a voltage drop in the main cables or grounds, burnt solenoid contacts, or a starter motor that has failed. A voltage drop test while cranking separates the cables from the starter in a few minutes.",
        },
        {
          q: "Can the immobilizer stop the engine cranking?",
          a: "On some vehicles, yes. If the anti-theft system does not recognize the key, it may block the starter circuit, while on others it allows cranking but stops the engine from running. A flashing security light on the dash is a clue. Some cars also need a relearn after battery power is lost. Diagnosis needs a scan tool or dealer procedure, not a multimeter.",
        },
        {
          q: "Does tapping the starter prove it is faulty?",
          a: "If the engine cranks after a light tap on the starter body, the brushes or solenoid contacts are likely worn and sticking, which points to a starter that needs repair or replacement. It is a clue, not a test, so confirm that the starter is receiving full voltage at its main stud and S terminal and has a good ground before condemning it.",
        },
        {
          q: "What should battery voltage drop to while cranking?",
          a: "A commonly quoted rule of thumb is that a healthy battery stays above about 9.6 V while cranking at normal temperature. If voltage stays near 12.6 V and nothing turns, current is not flowing at all, which points to the control side, an open cable or the starter rather than the battery. A collapse far below 9.6 V points to the battery or a shorted starter.",
        },
        {
          q: "Could I have blown a fuse when I changed the battery?",
          a: "Yes. If a wrench touched the positive post and the body at the same time, or the clamps went on the wrong posts even briefly, the main fuse or a fusible link can open. The battery then reads normal but the dash stays dark or the starter gets nothing. Check the main fuses with a meter from each side to ground, and if polarity was reversed have the charging system checked too.",
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
        {
          href: "/multimeters/why-does-my-car-starter-click-but-the-engine-wont-start",
          title: "Why Does My Car Starter Click but the Engine Won't Start?",
          desc: "Compare cranking voltage at the battery with voltage at the starter terminal.",
        },
      ]}
    >
      <Callout title="Safety when testing a starting circuit">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            The starter circuit carries very high current. Keep tools and jewelry away from the battery
            positive terminal and the starter&apos;s main stud; a ring or wrench across them can burn
            through to the bone.
          </li>
          <li>
            Lead-acid batteries can give off hydrogen. Keep flames and sparks away, connect and disconnect
            clamps with everything switched off, and wear eye protection.
          </li>
          <li>
            Set the parking brake and keep the transmission in Park or neutral. If you bridge any starter
            terminals, the engine can turn over, so stay clear of the belts and fan.
          </li>
          <li>Leave the red lead in the V jack. Never use the current jacks on a starter circuit.</li>
          <li>
            Hybrids and many newer cars have high-voltage systems and push-button start logic. If yours
            is a hybrid or the wiring diagram is beyond you, call a mechanic or roadside assistance.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="no-crank-vs-no-start" className="text-xl font-semibold mb-3">No-crank is not the same as no-start</h2>
        <p className="text-muted leading-7">
          No-crank means the engine does not rotate at all when you turn the key: you hear silence, a
          click, or rapid clicking. No-start means the engine turns over normally but does not fire, which
          is a fuel, spark or immobilizer question. Everything below applies to the first case, where the
          starting circuit itself is not delivering enough current to the starter motor. This page
          focuses on what a battery swap can disturb; for a deeper look at a clicking starter, see{" "}
          <Link href="/multimeters/why-does-my-car-starter-click-but-the-engine-wont-start" className={link}>
            why a starter clicks but the engine won&apos;t start
          </Link>
          , and if the battery reads fine but the car still won&apos;t go, see{" "}
          <Link href="/multimeters/how-to-test-a-car-battery-that-reads-12-volts-but-wont-start" className={link}>
            a battery that reads 12 volts but won&apos;t start
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Causes at a glance</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Nothing at all, dash dark", "Clamp not tight, blown main fuse or fusible link", "Volts from battery post to clamp; volts across main fuses", "Tighten the clamp; replace the fuse and find why it blew"],
            ["Dash lights dim to nothing when you turn the key", "Battery flat, or a bad clamp contact", "Resting volts, then volts while cranking at the posts and clamps", "Charge the battery; clean and tighten the clamps"],
            ["Single heavy click, no crank", "Cable or ground voltage drop, burnt solenoid contacts", "Voltage drop on each side while cranking", "Repair the cable or ground; replace the starter"],
            ["Rapid clicking", "Battery or connection cannot hold voltage under load", "Volts at the starter main stud while cranking", "Charge or replace the battery; clean connections"],
            ["No click, dash normal", "Starter relay, neutral or clutch switch, start signal", "Volts at the relay coil and at the S terminal in start", "Swap the relay, adjust or replace the switch"],
            ["No click, security light flashing", "Immobilizer not recognizing the key", "Spare key; scan tool for security codes", "Dealer or auto locksmith"],
            ["Full voltage at S and main stud, no crank", "Failed starter motor", "Rule out the ground side first", "Replace or rebuild the starter (mechanic if access is hard)"],
          ]}
        />
      </section>

      <section>
        <h2 id="what-changed" className="text-xl font-semibold mb-3">What changed when the battery went in</h2>
        <p className="text-muted leading-7 mb-4">
          A no-crank that appears right after a battery swap almost always traces back to the swap itself,
          or to a fault that was there all along and was blamed on the old battery. Before testing the
          whole circuit, go over the things a battery change can disturb:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-muted leading-7">
          <li>
            <strong>Clamps that look tight but aren&apos;t.</strong> A clamp that turns on the post by hand
            can light the dash, which only draws a few amps, but cannot pass starter current. Different
            post sizes, a stretched clamp or a shim left out make this common.
          </li>
          <li>
            <strong>A ground strap knocked loose.</strong> Battery trays sit near the engine-to-body and
            body-to-battery grounds. One bolt disturbed during the swap can open the ground side.
          </li>
          <li>
            <strong>A blown main fuse or fusible link.</strong> A wrench bridging the positive post to the
            body, or clamps reversed for a moment, can open the main fuse. The battery reads normal but
            the car is dead.
          </li>
          <li>
            <strong>A battery that was never charged.</strong> Batteries sit on shelves and self-discharge.
            One fitted at 12.2 V and then cranked repeatedly may be flat within minutes.
          </li>
          <li>
            <strong>The original fault.</strong> If the old battery was replaced because the car would not
            crank, the real cause may be a starter, cable or relay that is still there.
          </li>
        </ul>
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
        <p className="text-muted leading-7 mb-4">
          New does not mean charged. Measure across the posts with everything off, ideally after the
          battery has rested for an hour or more. The table gives the approximate resting voltages for a
          12 V flooded lead-acid battery at room temperature; AGM batteries sit slightly higher, so check
          the maker&apos;s chart for yours.
        </p>
        <DataTable
          head={["Resting voltage (approx.)", "State of charge (approx.)", "What to do"]}
          rows={[
            ["12.6 V or more", "Fully charged", "Battery is not the obvious cause; move on"],
            ["About 12.4 V", "About 75%", "Should crank; charge it anyway"],
            ["About 12.2 V", "About 50%", "May only click; charge before testing further"],
            ["About 12.0 V", "About 25%", "Charge fully, then retest"],
            ["11.9 V or less", "Discharged", "Charge; if it won't hold charge, return the battery"],
          ]}
          mono={[0]}
        />
        <p className="text-muted leading-7 mt-4">
          Then watch the meter while a helper turns the key. If voltage collapses far below the commonly
          used 9.6 V guideline, charge and load-test the battery as described in{" "}
          <Link href="/multimeters/how-to-test-a-car-battery-with-a-multimeter" className={link}>
            how to test a car battery
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/how-to-test-a-12v-battery-under-load" className={link}>
            testing a 12 V battery under load
          </Link>
          . If it barely moves from resting voltage, very little current is flowing, so the problem lies
          further along. The chart compares illustrative cranking readings for the common cases.
        </p>
        <Figure caption={<>Illustrative readings at the battery posts while the key is held in start. The number that does not move is as telling as the one that collapses.</>}>
          <BarChart
            items={[
              { label: "Resting, fully charged", value: 12.6, display: "12.6 V" },
              { label: "Open cable or no start signal", value: 12.5, display: "12.5 V", highlight: true },
              { label: "Healthy crank", value: 10.2, display: "10.2 V" },
              { label: "Weak or flat battery", value: 7.8, display: "7.8 V" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={2} id="terminals-and-cables">Check terminals and cable voltage drop</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A fresh battery is often fitted onto old clamps. Corrosion between post and clamp, or under the
          insulation of the cable, adds resistance that only shows up when the starter tries to draw
          heavy current. Clean both clamps to bright metal and tighten them, then test each side of the
          circuit while cranking. A quick first check: put one probe on the battery post and the other on
          its own clamp while cranking. Any reading above a few tenths of a volt means that joint is bad.
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
          <svg viewBox="0 0 320 160" className="w-full h-auto" role="img" aria-label="Diagram of the two voltage drop tests: the meter across the positive cable from the battery positive post to the starter, and across the ground cable and strap from the engine block back to the battery negative post">
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
        <p className="text-muted leading-7 mt-4 mb-4">
          Commonly used guidelines are about 0.5 V or less on the positive side and about 0.2–0.3 V or
          less on the ground side; your service manual may give its own limits. The numbers explain why
          such small readings matter. Suppose the starter draws 150 A, an illustrative figure for a small
          engine. A 0.5 V drop at 150 A is a resistance of 0.5 ÷ 150 ≈ 0.0033 Ω, about 3 milliohms. A
          corroded clamp adding just 10 milliohms more drops another 150 × 0.010 = 1.5 V and turns
          150² × 0.010 = 225 W into heat at the post. That is enough to stop a starter, yet the same
          clamp passes the 2 or 3 amps the dash lights need with almost no loss, which is why the lights
          come on and the engine doesn&apos;t turn.
        </p>
        <p className="text-muted leading-7">
          The full procedure, including how to split a cable into sections to find the exact bad joint,
          is in our guide on{" "}
          <Link href="/multimeters/how-to-check-voltage-drop-on-a-car" className={link}>
            checking voltage drop on a car
          </Link>
          , and{" "}
          <Link href="/multimeters/how-to-test-a-car-ground-wire-with-a-multimeter" className={link}>
            testing a car ground wire
          </Link>{" "}
          covers the straps between engine, body and battery.
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
          turned to start, and the contact-side feed terminal should have battery voltage all the time.
        </p>
        <p className="text-muted leading-7">
          No signal at the relay coil points upstream. An automatic transmission has a neutral safety or
          range switch that only allows cranking in Park or neutral; a manual usually has a clutch pedal
          switch. Try starting in neutral, or with the pedal pressed firmly to the floor. The ignition
          switch itself, or a push-button start module, is the next link back. Many newer cars send the
          start request through the body or engine computer, so a wiring diagram for your vehicle is
          essential at this stage, and a dealer or auto electrician is the right call if the start
          request is handled by a module you can&apos;t test.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="s-terminal-signal">Measure the signal at the solenoid S terminal</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The starter solenoid has a small terminal, often marked S, that receives the start signal, and
          a large stud that carries battery current to the motor. Back-probe the S terminal with the
          black lead on the engine block, and have a helper hold the key in start for a moment.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 items-center mb-4">
          <Figure caption={<>Illustrative reading: the control side is working and the starter is being asked to run.</>}>
            <MeterReadout value="10.9" unit="V DC" mode="S terminal, key in start" />
          </Figure>
          <Figure caption={<>Illustrative reading: no start signal reaches the starter.</>}>
            <MeterReadout value="0.02" unit="V DC" mode="S terminal, key in start" />
          </Figure>
        </div>
        <KeyIdea title="The reading that splits the circuit">
          Near battery voltage at S while cranking means the whole control side is working, so the fault
          is in the solenoid, the motor or the main cables. Zero volts at S means the starter is not being
          asked to run, so go back to the relay, safety switch and start signal.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={5} id="starter-and-fusible-links">Check the starter motor, fusible links and immobilizer</StepHeading>
        <p className="text-muted leading-7 mb-4">
          If S has voltage, the main stud has battery voltage while cranking and both voltage drops are
          within limits, the starter itself is the most likely fault: worn brushes, burnt solenoid
          contacts or a seized armature. Fusible links or a main fuse between the battery and the rest of
          the car can also open; when one fails, the dash may stay dark while the battery posts read
          normally. Check across them with DC volts the same way as an ordinary fuse: battery voltage on
          both sides to ground means it is intact, voltage on one side only means it is open. Our guide
          to{" "}
          <Link href="/multimeters/car-fuse-power-on-one-side-only" className={link}>
            power on one side of a car fuse
          </Link>{" "}
          explains that reading.
        </p>
        <p className="text-muted leading-7">
          Finally, some anti-theft immobilizers block the starter circuit when they do not recognize the
          key, and a few vehicles need a security or idle relearn after the battery has been disconnected.
          That needs a scan tool or the owner&apos;s manual procedure, so rule out the electrical path
          above before suspecting it. Starter replacement on many engines means working under the car
          near the exhaust; if you can&apos;t support the car safely on stands, leave it to a mechanic.
        </p>
      </section>

      <section>
        <h2 id="summary-table" className="text-xl font-semibold mb-3">Summary of readings</h2>
        <DataTable
          head={["Measurement", "Points to"]}
          rows={[
            ["Battery well below 12.4 V at rest", "Charge the battery and retest"],
            ["Battery collapses very low while cranking", "Battery or a shorted starter"],
            ["Voltage between post and its own clamp while cranking", "That clamp: clean and tighten"],
            ["High voltage drop on positive or ground side", "Clamp, cable or ground strap"],
            ["Battery voltage on one side of the main fuse only", "Blown main fuse or fusible link"],
            ["No voltage at relay coil in start", "Safety switch, ignition switch or start request"],
            ["No voltage at S terminal", "Relay contacts or wire to starter"],
            ["Voltage at S and main stud, no crank", "Starter motor or solenoid"],
          ]}
        />
      </section>

      <section>
        <h2 id="meters" className="text-xl font-semibold mb-3">Meters for this job</h2>
        <p className="text-muted leading-7 mb-4">
          Every reading on this page is DC volts, so any working meter will do. A meter that records the
          lowest voltage during a crank saves you from watching the display and turning the key at the
          same time. These picks come from our verified battery-testing research.
        </p>
        <ProductStrip
          title="Meters that capture what happens during a crank"
          items={[
            {
              name: "Power Probe DM300AUTO",
              image: dm300.image,
              alt: "Power Probe DM300AUTO automotive multimeter",
              href: "/multimeters/best-multimeters-for-car-battery-testing#power-probe-dm300auto",
              note: "Guided cranking-voltage and alternator tests with on-screen pass/fail, True RMS, CAT IV 600V. Voltage accuracy is ±(2% + 3).",
            },
            {
              name: "Fluke 88V",
              image: fluke88v.image,
              alt: "Fluke 88V automotive digital multimeter",
              href: "/multimeters/best-multimeters-for-car-battery-testing#fluke-88v",
              note: "Min/Max/Average recording with a 250 µs Peak Min/Max to catch the lowest cranking dip; ±(0.1% + 1) DC.",
            },
            {
              name: "Innova 3320",
              image: innova3320.image,
              alt: "Innova 3320 auto-ranging digital multimeter",
              href: "/multimeters/best-multimeters-for-car-battery-testing#innova-3320",
              note: "Simple auto-ranging meter with a green/yellow/red battery-load LED test. Marked CAT I only, so keep it on the car.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
