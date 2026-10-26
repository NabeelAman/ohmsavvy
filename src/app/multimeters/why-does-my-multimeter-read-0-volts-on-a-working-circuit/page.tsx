import Link from "next/link";
import {
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
  "A meter reading 0.00 V on a live circuit usually means both probes are on one node, COM has no reference, the AC/DC mode is wrong, or a lead is broken.";

export const metadata = buildMetadata({
  title: "Why Does My Multimeter Read 0 Volts?",
  description,
  path: "/multimeters/why-does-my-multimeter-read-0-volts-on-a-working-circuit",
});

const fluke117 = picks.find((p) => p.name === "Fluke 117")!;
const fluke87v = picks.find((p) => p.name === "Fluke 87V")!;
const uniT = picks.find((p) => p.name === "UNI-T UT139C")!;

const link = "text-accent hover:underline";

/**
 * A 12 V battery, a closed switch and a lamp, with labeled test points.
 * Meter 1 spans the supply (A to G) and reads 12 V; meter 2 has both probes
 * on the return wire (C and G) and reads 0 V because there is no potential
 * difference between two points on the same conductor.
 */
function ProbePlacementDiagram() {
  return (
    <svg
      viewBox="0 0 360 240"
      className="w-full h-auto"
      role="img"
      aria-label="Circuit diagram of a 12 volt battery, a closed switch and a lamp with test points A, B, C and G. A meter across points A and G, which span the supply, reads 12.0 volts. A second meter with both probes on the return wire, points C and G, reads 0.00 volts because both probes touch the same node."
    >
      <g className="stroke-foreground" strokeWidth="1.8" fill="none" strokeLinecap="round">
        {/* battery leads */}
        <path d="M50 92 V40 H128" />
        <path d="M50 116 V170 H260" />
        {/* closed switch */}
        <path d="M134 40 L168 40" />
        <path d="M174 40 H260 V88" />
        {/* lamp */}
        <circle cx="260" cy="105" r="17" />
        <path d="M248 93 L272 117 M272 93 L248 117" />
        <path d="M260 122 V170" />
      </g>
      {/* battery plates */}
      <line x1="36" y1="92" x2="64" y2="92" className="stroke-foreground" strokeWidth="2.4" />
      <line x1="42" y1="100" x2="58" y2="100" className="stroke-foreground" strokeWidth="2.4" />
      <line x1="36" y1="108" x2="64" y2="108" className="stroke-foreground" strokeWidth="2.4" />
      <line x1="42" y1="116" x2="58" y2="116" className="stroke-foreground" strokeWidth="2.4" />
      {/* switch contacts */}
      <circle cx="131" cy="40" r="3" className="fill-surface stroke-foreground" strokeWidth="1.5" />
      <circle cx="171" cy="40" r="3" className="fill-surface stroke-foreground" strokeWidth="1.5" />
      {/* test points */}
      <g className="fill-accent">
        <circle cx="90" cy="40" r="3.5" />
        <circle cx="215" cy="40" r="3.5" />
        <circle cx="230" cy="170" r="3.5" />
        <circle cx="90" cy="170" r="3.5" />
      </g>
      <g fontSize="11" fontWeight="700" className="fill-accent">
        <text x="86" y="30">A</text>
        <text x="211" y="30">B</text>
        <text x="236" y="164">C</text>
        <text x="96" y="164">G</text>
      </g>
      {/* meter 1: across the supply, A to G */}
      <g className="stroke-accent" strokeWidth="1.6" fill="none" strokeDasharray="4 3">
        <path d="M90 40 V86" />
        <path d="M90 124 V170" />
      </g>
      <circle cx="90" cy="105" r="18" className="fill-surface stroke-accent" strokeWidth="2" />
      <text x="90" y="109" fontSize="11" fontWeight="700" textAnchor="middle" className="fill-accent">12.0</text>
      {/* meter 2: both probes on the return wire, C and G */}
      <g className="stroke-accent" strokeWidth="1.6" fill="none" strokeDasharray="4 3">
        <path d="M230 170 V205 H180" />
        <path d="M90 170 V205 H140" />
      </g>
      <circle cx="160" cy="205" r="18" className="fill-surface stroke-accent" strokeWidth="2" />
      <text x="160" y="209" fontSize="11" fontWeight="700" textAnchor="middle" className="fill-accent">0.00</text>
      <g fontSize="10" className="fill-foreground">
        <text x="14" y="84">12 V</text>
        <text x="151" y="30" textAnchor="middle">switch</text>
        <text x="286" y="108">lamp</text>
      </g>
      <g fontSize="9.5" className="fill-muted">
        <text x="112" y="100">across the</text>
        <text x="112" y="112">supply</text>
        <text x="186" y="232" textAnchor="middle">both probes on the same return wire</text>
      </g>
    </svg>
  );
}

export default function WhyDoesMyMultimeterRead0VoltsPage() {
  return (
    <HowToShell
      title="Why Does My Multimeter Read 0 Volts on a Working Circuit?"
      description={description}
      path="/multimeters/why-does-my-multimeter-read-0-volts-on-a-working-circuit"
      category="multimeters"
      published="2026-10-25"
      intro={
        <>
          A multimeter reads 0 volts on a working circuit when its two probes have no potential difference
          between them: both are on the same node, the black lead is not connected to the circuit&apos;s return,
          or the meter is set to AC on a DC circuit. If none of those apply, the meter or its leads are not
          delivering the signal (a broken lead, HOLD or REL engaged, a lead in the amps jack), or that section
          of the circuit really is dead even though the rest of the device works. A 30-second test on a fresh
          AA battery tells you which side of that line you are on.
        </>
      }
      aside={{
        image: fluke117.image,
        alt: "Fluke 117 True RMS digital multimeter",
        caption: (
          <>
            A meter you trust makes it easier to believe a 0 V reading. See our{" "}
            <Link href="/multimeters/fluke-117-review" className={link}>
              Fluke 117 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-zero-means", label: "What a zero reading actually says" },
        { id: "causes", label: "Causes at a glance" },
        { id: "step-known-source", label: "1. Verify on a known source" },
        { id: "step-leads", label: "2. Check the leads and jacks" },
        { id: "step-display", label: "3. Rule out HOLD, REL and mode" },
        { id: "step-reference", label: "4. Fix the probe placement" },
        { id: "step-trace", label: "5. Trace the real 0 V upstream" },
        { id: "scenarios", label: "Probe placement and expected readings" },
        { id: "meters", label: "Meters for live troubleshooting" },
      ]}
      faq={[
        {
          q: "Why does my multimeter read 0 volts but the light is on?",
          a: "If the lamp is lit, voltage is present across it, so a 0 V reading means the probes are not spanning the lamp or the supply. The most common reason is that both probes sit on the same wire, such as two points on the return conductor. Put the red probe on the feed side and the black probe on the return side, and the reading should appear.",
        },
        {
          q: "Can a blown fuse in my multimeter cause a 0 volt reading?",
          a: "Usually not. On most meters the internal fuses protect only the mA and A jacks, and the voltage input does not pass through them. A blown current fuse affects voltage readings only if the red lead is plugged into a current jack by mistake. If the meter reads 0 V on every source with the red lead in the V jack, suspect the leads or the input circuit instead.",
        },
        {
          q: "Why does my multimeter read 0 on DC but shows a voltage on AC?",
          a: "On the DC function the meter averages the signal. A pure AC waveform averages to almost nothing, so a wall outlet or transformer secondary can read near 0 V DC while reading the full value on V AC. The reverse can also happen on some meters. Check the AC or DC indicator on the display and match it to the source before trusting any reading.",
        },
        {
          q: "How do I know if my multimeter leads are broken?",
          a: "Set the meter to continuity or the lowest ohms range and touch the probe tips together. Healthy leads beep and read a fraction of an ohm. OL, or a reading that jumps when you flex the cable near the probe or the plug, means a broken conductor. Wiggle each lead along its length while watching the display; the break is usually near a strain relief.",
        },
        {
          q: "Why does my multimeter show 0.00 after I press the REL button?",
          a: "REL (relative, often shown as a delta symbol) stores the current reading and subtracts it from everything that follows. If you pressed it while measuring a voltage, that voltage becomes the new zero and the display shows 0.00 or close to it. Press REL again, or turn the dial off and on, to clear the stored offset and return to absolute readings.",
        },
        {
          q: "Where should I put the black probe when testing voltage in a car?",
          a: "On a known good ground: the battery negative terminal is the most reliable, and a clean, unpainted chassis or engine bolt usually works. Paint, rust or a floating bracket can give 0 V or a low, wandering reading even on a live circuit. If a reading looks wrong, move the black probe directly to battery negative and measure again before suspecting the circuit.",
        },
      ]}
      next={[
        {
          href: "/multimeters/why-does-my-multimeter-show-the-wrong-voltage",
          title: "Why Does My Multimeter Show the Wrong Voltage?",
          desc: "Readings that are off rather than zero: range, True RMS, loading and calibration.",
        },
        {
          href: "/multimeters/why-does-a-multimeter-fuse-blow-when-measuring-current",
          title: "Why Does a Multimeter Fuse Blow When Measuring Current?",
          desc: "What a lead left in the amps jack does to the meter, and how to replace the fuse.",
        },
        {
          href: "/multimeters/unstable-multimeter-readings",
          title: "What Causes Unstable Multimeter Readings?",
          desc: "When the number jumps around instead of sitting at zero.",
        },
      ]}
    >
      <Callout title="Safety: treat a 0 V reading as unproven">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Never assume a circuit is dead because the meter shows 0 V. Every cause on this page, from a broken
            lead to HOLD mode, can show zero on a live conductor. Prove the meter on a known live source before
            and after you test.
          </li>
          <li>
            On mains, use a meter and leads rated for the location: CAT III 600V or better for household branch
            circuits and panels. Keep your fingers behind the probe guards.
          </li>
          <li>
            Never bypass or bridge a fuse, in the meter or in the circuit, to get a reading. Panel and fixed
            wiring faults are work for a licensed electrician.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="what-zero-means" className="text-xl font-semibold mb-3">What a zero reading actually says</h2>
        <p className="text-muted leading-7 mb-4">
          A voltmeter never measures the voltage &quot;at&quot; a point. It measures the difference between
          whatever the red probe touches and whatever the black probe touches. Zero is therefore a perfectly
          honest answer in several situations: when the two probes share the same conductor, when there is no
          connection between the black probe and the part of the circuit the red probe is on, and when the
          section you are testing has genuinely lost its supply. Only one of those means the device is faulty.
        </p>
        <p className="text-muted leading-7 mb-4">
          The other group of zeros comes from the meter side. The signal never reaches the display because a
          lead is broken inside its insulation, the red lead is in a current jack, the display is frozen by
          HOLD, a REL offset is canceling the reading, or the function is set to the wrong kind of voltage.
          These are worth ruling out first because they take seconds and they are invisible: a broken lead
          looks exactly like a good one.
        </p>
        <p className="text-muted leading-7">
          This page deals with the flat 0 or 0.00 case. If your meter shows a number that is merely too high,
          too low, or the wrong sign, our guide to{" "}
          <Link href="/multimeters/why-does-my-multimeter-show-the-wrong-voltage" className={link}>
            why a multimeter shows the wrong voltage
          </Link>{" "}
          covers range errors, True RMS limits and loading, and{" "}
          <Link href="/multimeters/why-does-my-multimeter-show-negative-voltage" className={link}>
            negative voltage readings
          </Link>{" "}
          have their own explainer.
        </p>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Causes at a glance</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["0.00 V on a lit lamp or running motor", "Both probes on the same node", "Are the two points joined by plain wire, with no source or load between them?", "Move one probe so a source or load sits between the probes"],
            ["0 V, or a few mV that wander", "Black lead has no reference (floating section, wrong ground, painted chassis)", "With power off, check continuity from the COM contact point to supply negative", "Clip COM to the supply's own negative or a known good ground"],
            ["Near 0 on a battery or DC rail", "Dial on V AC with a DC source", "Look for AC, DC or ~ beside the digits", "Select V DC, or use auto AC/DC if the meter has it"],
            ["Near 0 on an outlet or transformer", "Dial on V DC with an AC source", "Same display check", "Select V AC"],
            ["0 V everywhere, including a fresh AA", "Open test lead or broken probe wire", "Short the tips on continuity: OL or flicker means a break", "Replace the lead set"],
            ["0 V everywhere, leads test fine", "Red lead in the A or mA jack", "Check which jack the red plug sits in", "Move it to the V jack, then check the current fuse"],
            ["Display stuck at 0 and does not change", "HOLD engaged", "Look for an H or HOLD icon", "Press HOLD to release"],
            ["Shows 0.00 on a source that read correctly a moment ago", "REL or delta offset stored", "Look for REL or a delta symbol", "Press REL again or cycle the dial"],
            ["0 V on known sources, other functions work", "Damaged voltage input, often after an overload", "Known-source test with good leads and a fresh battery", "Have the meter repaired or replace it"],
            ["0 V at one point, correct voltage nearer the source", "Section genuinely unpowered: open fuse, switch, connector, regulator", "Measure from the source outward until the voltage disappears", "Repair the open point you found"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="step-known-source">Verify on a known source</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Before you touch the circuit again, prove the meter. Set it to V DC, plug the black lead into COM and
          the red lead into the V jack, and measure a fresh alkaline AA cell: red on the button end, black on
          the flat end. A new AA typically reads about 1.5 to 1.6 V; a used one reads lower but never zero
          unless it is completely flat. A 9 V battery or a USB charger (about 5 V between the outer pins) works
          too. If you work on mains, also check a known-good outlet on V AC.
        </p>
        <Figure caption="Illustrative readings: a fresh AA on V DC (left) proves the meter, leads and input. If the same setup shows 0.00 on the cell (right), the fault is in the meter or leads, not the circuit.">
          <div className="grid grid-cols-2 gap-4">
            <MeterReadout value="1.58" unit="V DC" mode="fresh AA, illustrative" />
            <MeterReadout value="0.00" unit="V DC" mode="meter side fault" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          This single test splits the problem in half. A correct reading on the cell means the meter is fine
          and the zero is about where you are probing, so skip to step 4. A zero on the cell means the
          circuit was never the problem, and steps 2 and 3 will find the cause.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="step-leads">Check the leads and jacks</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Test leads fail more often than meters. The fine copper strands break where the cable flexes most,
          at the probe handle and at the banana plug, and the insulation hides the break completely. Turn the
          dial to continuity or the lowest ohms range and touch the probe tips together: a good set beeps and
          reads a fraction of an ohm. OL means one conductor is open. If it beeps only some of the time, flex
          each cable along its length while watching the display; the reading will drop out at the break. The
          meaning of that OL display is explained in our guide to{" "}
          <Link href="/multimeters/what-does-ol-mean-on-a-multimeter" className={link}>
            what OL means on a multimeter
          </Link>
          .
        </p>
        <p className="text-muted leading-7 mb-4">
          Then look at the jacks. Voltage is measured with the red lead in the jack marked V (often shared with
          Ω and the diode symbol). If the red lead is in the A or mA jack, most meters show zero on the voltage
          function, because the voltage input is no longer connected to anything. Worse, the current jack
          connects your probes through a very low resistance, so touching a battery or outlet in that state
          shorts it through the meter.
        </p>
        <p className="text-muted leading-7">
          This is also the only situation where a blown meter fuse matters for voltage. On most meters the
          internal fuses sit only in the current paths, behind the mA and A jacks, and the V input never
          passes through them. A meter with a blown current fuse will still read volts correctly with the red
          lead in the V jack. If your fuse has gone, our article on{" "}
          <Link href="/multimeters/why-does-a-multimeter-fuse-blow-when-measuring-current" className={link}>
            why a multimeter fuse blows when measuring current
          </Link>{" "}
          explains what caused it and how to choose the correct replacement.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="step-display">Rule out HOLD, REL and the wrong mode</StepHeading>
        <p className="text-muted leading-7 mb-4">
          <strong>HOLD</strong> freezes the display at the last value, which is often 0.00 if you pressed it
          before connecting the probes. The tell is an H or HOLD icon and a display that does not move at all,
          not even by one digit, as you move the probes. <strong>REL</strong> (relative, sometimes a delta
          symbol) is subtler: it stores the present reading and subtracts it from everything after. Press it
          by accident while measuring 12 V and that 12 V now displays as 0.00. Both buttons sit close to the
          dial on most meters and are easy to nudge. Our{" "}
          <Link href="/multimeters/multimeter-symbols-explained" className={link}>
            multimeter symbols guide
          </Link>{" "}
          shows what each icon looks like.
        </p>
        <p className="text-muted leading-7 mb-4">
          <strong>AC versus DC.</strong> On the DC function a meter reports the average of the signal. A pure
          sine wave spends equal time above and below zero, so its average is essentially zero, and an outlet
          measured on V DC can sit at or near 0. Point the AC function at a steady battery and many meters show
          0 or a few millivolts for the opposite reason: the AC function looks for a changing signal and
          ignores the steady part. The{" "}
          <Link href="/multimeters/ac-vs-dc-voltage" className={link}>
            AC vs DC voltage guide
          </Link>{" "}
          explains the difference. On a meter with automatic AC/DC selection the mistake mostly disappears;
          the Fluke 117&apos;s AutoVolt feature, which the Fluke 115 lacks, selects AC or DC for you.
        </p>
        <p className="text-muted leading-7">
          <strong>Range.</strong> On a manual-ranging meter, a range far above the signal can round a small
          voltage down to zero: 0.04 V on a 600 V range has no digit to show up in. Drop to the lowest range
          that does not show OL, or let an auto-ranging meter settle for a second before you read it.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="step-reference">Fix the probe placement</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Once the meter reads a known source correctly, a zero on the circuit is about the two points you
          chose. In the diagram below, the battery drives current through a closed switch and a lamp. The
          meter across A and G spans the battery, so it reads the full 12 V. The second meter has both probes
          on the return wire, C and G. That wire has almost no resistance and carries the same current
          everywhere, so the voltage drop along it is a few millivolts at most, and the meter shows 0.00. The
          lamp is lit and the circuit works; the probes simply have nothing between them.
        </p>
        <Figure caption="Probe placement decides the reading. Across the supply (A to G) the meter reads 12 V; with both probes on the return wire (C to G) there is no potential difference, so it reads 0 V even though the lamp is lit. Readings are illustrative.">
          <ProbePlacementDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4 mb-4">
          The same thing happens across any closed switch, any intact fuse and any short length of wire. In
          fact, 0 V across a closed switch or a good fuse with current flowing is the correct, healthy result;
          the full supply voltage across them would mean they are open. That is the basis of testing a fuse in
          place, described in our guide to{" "}
          <Link href="/multimeters/how-to-test-a-fuse-without-removing-it" className={link}>
            testing a fuse without removing it
          </Link>
          .
        </p>
        <p className="text-muted leading-7">
          The opposite mistake is a black probe with no reference at all. In an isolated section, such as the
          secondary of a transformer, the output of an isolated DC-DC converter, a floating battery pack, or a
          chassis bracket insulated by paint, the black probe touches metal that has no connection to the
          circuit the red probe is on. With no complete path for the meter&apos;s tiny input current, the
          reading sits at zero or drifts around a few millivolts. In a car, clip COM to the battery negative
          terminal or a clean, unpainted engine bolt; on a circuit board, clip it to the supply&apos;s own
          ground pin, not to the metal case. If you see a wandering number instead of a flat zero, the
          symptoms overlap with those in{" "}
          <Link href="/multimeters/unstable-multimeter-readings" className={link}>
            unstable multimeter readings
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={5} id="step-trace">Trace the real 0 V upstream</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Sometimes the meter is right and the section really is dead. A device can &quot;work&quot; while
          one part of it has no power: a blown fuse on one branch, a relay that never closed, a voltage
          regulator held off by its enable pin, a connector pushed half home, or one leg of a split supply that
          has failed. The radio plays but the dash light circuit is dead; the board&apos;s LED glows but the
          3.3 V rail reads zero.
        </p>
        <FlowDiagram
          steps={[
            { label: "Source", sub: "Full voltage at the supply?" },
            { label: "Protection", sub: "Both sides of the fuse" },
            { label: "Control", sub: "Switch, relay, regulator" },
            { label: "Load", sub: "Find where it drops to 0" },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Keep the black probe on one solid reference and walk the red probe outward from the source: supply
          output, then each side of the fuse, then each side of the switch or relay contacts, then the
          connector pins, then the load. The voltage is present up to a certain point and gone after it. The
          open part is between your last good reading and your first zero. For a car fuse that shows power on
          one side only, our walkthrough on{" "}
          <Link href="/multimeters/car-fuse-power-on-one-side-only" className={link}>
            power on one side of a car fuse
          </Link>{" "}
          follows that exact path.
        </p>
      </section>

      <section>
        <h2 id="scenarios" className="text-xl font-semibold mb-3">Probe placement and expected readings</h2>
        <p className="text-muted leading-7 mb-4">
          Using the 12 V circuit in the diagram, this is what a healthy meter should show at each pair of
          points, with the switch closed and then open. Notice how many of the correct answers are zero. The
          values are idealized: real wiring drops a little voltage, so expect a few millivolts where the table
          says 0 and slightly under 12 V across the lamp.
        </p>
        <DataTable
          head={["Red probe", "Black probe", "Switch closed (lamp on)", "Switch open (lamp off)", "Why"]}
          rows={[
            ["A (battery +)", "G (battery −)", "12 V", "12 V", "Spans the source; always reads the battery"],
            ["B (after switch)", "G", "12 V", "0 V", "Switch open: B is cut off from the supply"],
            ["A", "B (across switch)", "0 V", "12 V", "A closed switch has no drop; an open one has it all"],
            ["B", "C (across lamp)", "12 V", "0 V", "The load drops the voltage only while current flows"],
            ["C", "G (same return wire)", "0 V", "0 V", "Same node: no potential difference in either state"],
            ["A", "Painted bracket (no connection)", "0 V or drifting mV", "0 V or drifting mV", "Black probe has no reference to the circuit"],
          ]}
          mono={[2, 3]}
        />
      </section>

      <section>
        <KeyIdea title="Zero is a difference, not a level">
          A voltmeter shows the difference between its two probes. Before deciding the circuit is dead, prove
          the meter on a fresh AA (about 1.5 to 1.6 V), then make sure a source or a load sits between your
          probes and that the black lead is connected to the circuit&apos;s own return.
        </KeyIdea>
      </section>

      <section>
        <h2 id="meters" className="text-xl font-semibold mb-3">Meters for live troubleshooting</h2>
        <p className="text-muted leading-7 mb-4">
          Any working meter will show the zeros described here; what changes is how easily you can trust it.
          These picks come from our verified multimeter list.
        </p>
        <ProductStrip
          title="Meters from our verified picks"
          items={[
            {
              name: fluke117.name,
              image: fluke117.image,
              alt: "Fluke 117 True RMS electrician's multimeter",
              href: "/multimeters/fluke-117-review",
              note: "True RMS, CAT III 600V, auto-ranging, with built-in NCV detection. Hands-on Tested.",
            },
            {
              name: fluke87v.name,
              image: fluke87v.image,
              alt: "Fluke 87V industrial True RMS multimeter",
              href: "/multimeters/fluke-87v-review",
              note: "CAT III 1000V / CAT IV 600V, 19,999-count high-resolution mode and an analog bar graph. Hands-on Tested.",
            },
            {
              name: uniT.name,
              image: uniT.image,
              alt: "UNI-T UT139C True RMS multimeter",
              href: "/multimeters/uni-t-ut139c-review",
              note: "Budget True RMS, 6,000-count, CAT III 600V, with auto and manual ranging and NCV.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
