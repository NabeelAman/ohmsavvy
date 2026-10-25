import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  MeterReadout,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const description =
  "Why your multimeter shows different resistance values on a circuit board: parallel paths, junctions and probe polarity, charging capacitors and lead resistance.";

export const metadata = buildMetadata({
  title: "Why Resistance Readings Differ on a Circuit Board",
  description,
  path: "/multimeters/why-does-my-multimeter-show-different-resistance-values-on-a-circuit-board",
});

const all = getAllPicks("multimeters");
const fluke87v = all.find((p) => p.name === "Fluke 87V")!;
const bm786 = all.find((p) => p.name === "EEVblog Brymen BM786")!;
const ut61e = all.find((p) => p.name === "UNI-T UT61E+")!;

const link = "text-accent hover:underline";

/** The resistor you probe is only one of several paths between the same two pads. */
function InCircuitPathsDiagram() {
  return (
    <svg
      viewBox="0 0 340 210"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram of a 1 kilohm resistor on a circuit board with the meter probes on its two pads. A 2.2 kilohm resistor, a diode junction and a capacitor elsewhere on the board connect between the same two nodes, so the meter measures all of them in parallel"
    >
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        {/* node rails */}
        <line x1="60" y1="30" x2="60" y2="180" />
        <line x1="280" y1="30" x2="280" y2="180" />
        {/* R1 target */}
        <line x1="60" y1="40" x2="140" y2="40" />
        <rect x="140" y="31" width="60" height="18" rx="2" className="stroke-accent" strokeWidth="2" />
        <line x1="200" y1="40" x2="280" y2="40" />
        {/* R2 parallel */}
        <line x1="60" y1="90" x2="140" y2="90" />
        <rect x="140" y="81" width="60" height="18" rx="2" />
        <line x1="200" y1="90" x2="280" y2="90" />
        {/* diode path */}
        <line x1="60" y1="130" x2="155" y2="130" />
        <polygon points="155,120 155,140 175,130" />
        <line x1="177" y1="120" x2="177" y2="140" />
        <line x1="177" y1="130" x2="280" y2="130" />
        {/* capacitor path */}
        <line x1="60" y1="170" x2="164" y2="170" />
        <line x1="164" y1="160" x2="164" y2="180" />
        <line x1="174" y1="160" x2="174" y2="180" />
        <line x1="174" y1="170" x2="280" y2="170" />
      </g>
      <circle cx="60" cy="40" r="4" className="fill-accent" />
      <circle cx="280" cy="40" r="4" className="fill-accent" />
      <g fontSize="10" className="fill-foreground">
        <text x="170" y="24" textAnchor="middle" className="fill-accent">R1 1 kΩ (the one you want)</text>
        <text x="170" y="114" textAnchor="middle">R2 2.2 kΩ elsewhere</text>
        <text x="220" y="124">junction</text>
        <text x="190" y="160">capacitor</text>
        <text x="14" y="44">red</text>
        <text x="290" y="44">COM</text>
      </g>
      <text x="170" y="203" fontSize="9.5" textAnchor="middle" className="fill-muted">
        the meter sees every path between the two pads at once
      </text>
    </svg>
  );
}

export default function WhyDoesMyMultimeterShowDifferentResistanceValuesOnACircuitBoardPage() {
  return (
    <HowToShell
      title="Why Does My Multimeter Show Different Resistance Values on a Circuit Board?"
      description={description}
      path="/multimeters/why-does-my-multimeter-show-different-resistance-values-on-a-circuit-board"
      category="multimeters"
      published="2026-10-25"
      intro={
        <>
          A multimeter shows different resistance values on a circuit board because the part you are probing is
          still connected to everything else: other resistors, semiconductor junctions and capacitors give the
          meter&apos;s test current extra paths, so the reading is usually lower than the marked value and can
          change with probe polarity or drift while you watch. The way to get a true value is to measure with
          the board unpowered and discharged, swap the probes to see what changes, and lift one leg of the part
          when it really matters.
        </>
      }
      aside={{
        image: bm786.image,
        alt: "EEVblog Brymen BM786 bench multimeter",
        caption: (
          <>
            A high-count meter with relative zero makes small in-circuit differences easier to read. See the
            BM786 in our{" "}
            <Link href="/multimeters/best-multimeters-for-electronics-repair#eevblog-brymen-bm786" className={link}>
              electronics repair meter guide
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-ohms-works", label: "What the ohms function actually does" },
        { id: "causes", label: "Causes at a glance" },
        { id: "power-off", label: "Power off and discharge first" },
        { id: "parallel-paths", label: "Parallel paths pull the reading down" },
        { id: "polarity", label: "Junctions and probe polarity" },
        { id: "drift", label: "Readings that climb or drift" },
        { id: "low-ohms", label: "Lead resistance on low values" },
        { id: "lift-a-leg", label: "Lift one leg for a true value" },
        { id: "meters", label: "Meters that help" },
      ]}
      faq={[
        {
          q: "Why is the resistance lower in circuit than the value printed on the resistor?",
          a: "Anything connected across the same two pads, such as other resistors, a transistor junction or an IC input, conducts some of the meter's test current, so the meter sees the combined parallel resistance. A combined value can only be lower than the smallest single path. Lift one leg of the resistor and measure again to read its own value.",
        },
        {
          q: "Why do I get a different reading when I reverse the probes?",
          a: "Because a semiconductor junction is somewhere in the parallel path. With one polarity the meter's test voltage may forward-bias it and current flows through it; with the other polarity it blocks. A plain resistor gives the same value both ways, so a reading that changes when you swap probes tells you a diode, transistor or IC is in the path.",
        },
        {
          q: "Why does the resistance reading keep going up on a circuit board?",
          a: "A capacitor in the path is charging from the meter's test current. While it charges it looks like a lower resistance, and as it fills the reading climbs until it settles or shows OL. Large electrolytic capacitors on high ohms ranges can take several seconds. Wait for the number to settle, and make sure the capacitor was discharged before you started.",
        },
        {
          q: "Is it safe to measure resistance on a board that is still powered?",
          a: "No. The ohms function works by pushing its own small current through the part, so any voltage already in the circuit corrupts the reading and can damage the meter if it is high enough. Disconnect power, remove batteries, and check the main filter capacitors with the voltage function before switching to resistance.",
        },
        {
          q: "Do I need to desolder a component to test it properly?",
          a: "Not always. If the in-circuit reading is close to the marked value and nothing obvious sits in parallel, the part is very likely fine. Desolder or lift one leg when the reading is clearly off, when swapping probes changes it, or when the schematic shows low-value parts in parallel. One leg is enough; the part does not need to come off the board.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-measure-resistance-in-a-parallel-circuit",
          title: "How to Measure Resistance in a Parallel Circuit",
          desc: "The parallel formula, worked examples and isolating one resistor.",
        },
        {
          href: "/multimeters/how-to-check-a-pcb-for-a-short-circuit-with-a-multimeter",
          title: "How to Check a PCB for a Short Circuit",
          desc: "Tracing a low-resistance fault across rails and components.",
        },
        {
          href: "/multimeters/how-to-test-a-transistor-in-circuit-with-a-multimeter",
          title: "How to Test a Transistor In Circuit",
          desc: "Junction checks when the part is still soldered in place.",
        },
      ]}
    >
      <Callout title="Mains-powered boards: discharge before you measure">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Unplug the equipment and remove any batteries. Switching it off at its own switch is not enough.
          </li>
          <li>
            Power supply filter capacitors can hold a dangerous charge after unplugging. Measure across them on
            the DC voltage function and discharge them through a suitably rated resistor, not a screwdriver.
          </li>
          <li>Only switch to resistance or continuity once the voltage reads at or near zero.</li>
        </ul>
      </Callout>

      <section>
        <h2 id="how-ohms-works" className="text-xl font-semibold mb-3">What the ohms function actually does</h2>
        <p className="text-muted leading-7 mb-4">
          A meter on resistance does not sense a resistor; it pushes a small, known current out of the red lead,
          measures the voltage that develops between the probes, and divides one by the other. That is a
          perfectly good method for a part sitting alone on the bench. On a board, though, the current leaves the
          red probe and takes every route available back to COM, and the meter has no way to tell which route
          went through the part you had in mind.
        </p>
        <p className="text-muted leading-7">
          The test current and the open-circuit voltage at the probes differ between meters and between ranges.
          On many meters that voltage is high enough on some ranges to switch on a silicon junction, which is why
          the same board can read differently on two meters, on two ranges of one meter, or with the probes swapped.
          The sections below explain each effect and how to separate it from a genuinely faulty part.
        </p>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Causes at a glance</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["Reads lower than the marked value", "Other components in parallel", "Look at the schematic or follow traces from both pads", "Lift one leg and re-measure"],
            ["Different value when probes are swapped", "Diode, transistor or IC junction in the path", "Compare both polarities; a plain resistor matches", "Lift one leg, or use the lower-voltage range if your meter has one"],
            ["Reading climbs steadily, then settles or shows OL", "Capacitor charging from the test current", "Watch for a rising number over a few seconds", "Wait for it to settle; discharge first next time"],
            ["Reading jumps or shows a negative-looking value", "Residual voltage on the board", "Measure DC volts across the same points", "Remove power and discharge, then re-test"],
            ["Low values read a fraction of an ohm high", "Test lead and contact resistance", "Short the probes together and note the reading", "Use REL or relative zero, or subtract it"],
            ["High values change when you hold the probes", "Your body in parallel with the part", "Re-test without touching both tips", "Hold only one probe, or use clips"],
            ["Readings vary across the board on high ohms", "Flux residue or contamination leakage", "Compare before and after cleaning the area", "Clean with isopropyl alcohol and let it dry"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="power-off">Power off and discharge first</StepHeading>
        <p className="text-muted leading-7">
          Any voltage left on the board adds to or subtracts from the meter&apos;s own test voltage, so the
          reading can come out too high, too low or meaningless, and on some boards it can stress the meter&apos;s
          input. Pull the plug, take out batteries and coin cells, and give large capacitors a minute to bleed down.
          Then measure the main supply capacitors on DC volts before you switch to ohms. On battery-powered boards
          with a backup cell or supercapacitor, remember that part of the circuit may still be alive with the main
          battery out.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="parallel-paths">Parallel paths pull the reading down</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The diagram shows a 1 kΩ resistor whose pads are also joined, through other traces, by a 2.2 kΩ
          resistor, a junction and a capacitor. With the board unpowered, the meter measures all of them at
          once. Ignoring the junction and capacitor for a moment, 1 kΩ in parallel with 2.2 kΩ is about 688 Ω,
          so a perfectly good resistor reads well below its marking. The full arithmetic, including three or more
          branches, is laid out in{" "}
          <Link href="/multimeters/how-to-measure-resistance-in-a-parallel-circuit" className={link}>
            how to measure resistance in a parallel circuit
          </Link>
          .
        </p>
        <Figure caption={<>Illustrative board section: the probes sit on R1&apos;s pads, but R2, a junction and a capacitor connect between the same two nodes.</>}>
          <InCircuitPathsDiagram />
        </Figure>
        <div className="mt-4 grid sm:grid-cols-2 gap-4 items-center">
          <Figure caption={<>Illustrative value: R1 measured in circuit, with R2 in parallel.</>}>
            <MeterReadout value="0.688" unit="kΩ" mode="Ω  in circuit" />
          </Figure>
          <Figure caption={<>Illustrative value: the same R1 with one leg lifted from its pad.</>}>
            <MeterReadout value="1.000" unit="kΩ" mode="Ω  one leg lifted" />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The rule of thumb that follows is useful when you are hunting a fault: an in-circuit reading can be
          lower than the true value but should never be meaningfully higher. If a resistor reads well above its
          marking in circuit, with the board unpowered and discharged, it has probably drifted high or gone open.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="polarity">Junctions and probe polarity</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A silicon junction begins to conduct noticeably at roughly 0.5 to 0.7 V, and a Schottky junction lower
          still, at around 0.2 to 0.3 V. If the meter&apos;s open-circuit voltage on the selected range exceeds that and the red
          lead is on the anode side, the junction joins the parallel paths and the reading drops. Swap the leads
          and the junction blocks, so the reading rises. Base-emitter junctions, protection diodes on IC pins and
          the body diode of a MOSFET all behave this way.
        </p>
        <p className="text-muted leading-7">
          That makes probe swapping a quick diagnostic: a resistor on its own reads the same in both directions,
          so any difference means a semiconductor is involved. Some meters use a lower test voltage on certain
          ohms ranges that stays below a silicon junction&apos;s turn-on point; your manual will say whether yours
          does. To test the junctions themselves, use the diode function, as covered in{" "}
          <Link href="/multimeters/how-to-test-a-diode-with-a-multimeter" className={link}>
            how to test a diode with a multimeter
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/why-does-my-multimeter-show-the-wrong-diode-voltage" className={link}>
            why a multimeter shows the wrong diode voltage
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={4} id="drift">Readings that climb or drift</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A capacitor across the probes starts out empty and soaks up the meter&apos;s test current, so the first
          number is low. As it charges, less current flows and the reading rises, sometimes to OL if nothing else
          is in parallel. Reverse the probes and the cap first has to discharge and recharge the other way, so the
          climb repeats. On high ohms ranges the test current is tiny and a large electrolytic can take several
          seconds to settle; on low ranges it settles faster.
        </p>
        <p className="text-muted leading-7">
          Drift of a different kind comes from temperature. Thermistors on the board change resistance as they
          warm, and even ordinary resistors move slightly if a hot iron has just been near them. If a reading
          wanders randomly rather than climbing steadily, check probe contact and the leads, and see{" "}
          <Link href="/multimeters/unstable-multimeter-readings" className={link}>
            what causes unstable multimeter readings
          </Link>{" "}
          for the measurement-side causes.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="low-ohms">Lead resistance on low values</StepHeading>
        <p className="text-muted leading-7">
          Test leads, plugs and probe contact typically add a few tenths of an ohm. That vanishes against a 10 kΩ
          resistor but swamps a 0.1 Ω current-sense resistor or a short between two rails. Short the probe tips
          together and note the reading, then subtract it, or use the REL (relative) button where your meter has
          one to zero the leads automatically. Press the tips firmly onto clean pads, because oxide and flux add
          resistance too. For values well under an ohm, a dedicated low-ohm or four-wire instrument is the right
          tool; our guide to the{" "}
          <Link href="/multimeters/best-multimeters-for-measuring-low-resistance" className={link}>
            best multimeters for measuring low resistance
          </Link>{" "}
          compares the options.
        </p>
      </section>

      <section>
        <StepHeading n={6} id="lift-a-leg">Lift one leg for a true value</StepHeading>
        <p className="text-muted leading-7">
          When the reading matters, isolate the part. On a through-hole board, heat one joint and pull that lead
          free of its pad with tweezers; on surface-mount parts, warm one end and slide it off its pad, or remove
          the part entirely with hot tweezers or hot air. Measuring between the lifted leg and the other pad then
          gives the component&apos;s own value with nothing in parallel. Resolder it afterward and inspect the
          joint. For a methodical walk through the whole resistance function, start with{" "}
          <Link href="/multimeters/how-to-measure-resistance-in-ohms-with-a-digital-multimeter" className={link}>
            how to measure resistance in ohms
          </Link>
          .
        </p>
      </section>

      <KeyIdea title="Read the number in context">
        In circuit, a resistance reading tells you the combined effect of every path between the two pads at the
        meter&apos;s test voltage. A low reading is normal, a polarity-dependent one points to a semiconductor, a
        climbing one points to a capacitor, and only a reading that is higher than the marked value is strong
        evidence of a bad part without lifting a leg.
      </KeyIdea>

      <section>
        <h2 id="meters" className="text-xl font-semibold mb-3">Meters that help</h2>
        <p className="text-muted leading-7 mb-4">
          Any working meter can do in-circuit checks, but high resolution and a relative-zero function make small
          differences and low values much easier to read. These come from our verified electronics picks.
        </p>
        <ProductStrip
          title="Meters for board-level resistance work"
          items={[
            {
              name: "UNI-T UT61E+",
              image: ut61e.image,
              alt: "UNI-T UT61E+ 22,000-count True RMS multimeter",
              href: "/multimeters/best-multimeters-for-electronics-repair#uni-t-ut61e+",
              note: "22,000 counts, 0.01 Ω resolution and REL mode to zero the test leads. Burden voltage not published.",
            },
            {
              name: "EEVblog Brymen BM786",
              image: bm786.image,
              alt: "EEVblog Brymen BM786 60,000-count multimeter",
              href: "/multimeters/best-multimeters-for-electronics-repair#eevblog-brymen-bm786",
              note: "60,000 counts with 0.01 Ω resolution, relative zero and fast latching continuity. No data logging.",
            },
            {
              name: "Fluke 87V",
              image: fluke87v.image,
              alt: "Fluke 87V industrial True RMS multimeter",
              href: "/multimeters/fluke-87v-review",
              note: "19,999-count high-resolution mode and an analog bar graph for watching a reading settle. Hands-on Tested.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
