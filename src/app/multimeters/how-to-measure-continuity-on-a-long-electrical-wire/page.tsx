import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  MeterReadout,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to measure continuity on a long electrical wire when the ends are too far apart: the loop method, long leads, expected resistance by AWG, and ghost voltage.";

export const metadata = buildMetadata({
  title: "How to Measure Continuity on a Long Wire",
  description,
  path: "/multimeters/how-to-measure-continuity-on-a-long-electrical-wire",
});

const klein = picks.find((p) => p.name === "Klein Tools MM400")!;
const fluke179 = picks.find((p) => p.name === "Fluke 179")!;
const fluke117 = picks.find((p) => p.name === "Fluke 117")!;

const link = "text-accent hover:underline";

/** Loop method: the far end of the wire under test is jumpered to a known-good return conductor. */
function LoopMethodDiagram() {
  return (
    <svg
      viewBox="0 0 340 190"
      className="w-full h-auto"
      role="img"
      aria-label="Loop method for a long wire. At the near end a multimeter connects to the wire under test and to a known-good return conductor in the same cable. The two conductors run a long distance to the far end, where a jumper joins them. The meter reads the resistance of both conductors plus the jumper."
    >
      {/* Meter */}
      <rect x="12" y="55" width="62" height="70" rx="6" className="fill-surface stroke-border" strokeWidth="1.5" />
      <text x="43" y="85" textAnchor="middle" fontSize="12" className="fill-foreground">Ω</text>
      <text x="43" y="102" textAnchor="middle" fontSize="9" className="fill-muted">meter</text>
      {/* Leads */}
      <path d="M74 75 H100" className="stroke-accent" strokeWidth="2" />
      <path d="M74 105 H100" className="stroke-foreground" strokeWidth="2" />
      {/* Conductors */}
      <path d="M100 75 H160" className="stroke-accent" strokeWidth="3" />
      <path d="M100 105 H160" className="stroke-foreground" strokeWidth="3" />
      <path d="M160 75 H200" className="stroke-accent" strokeWidth="3" strokeDasharray="5 5" />
      <path d="M160 105 H200" className="stroke-foreground" strokeWidth="3" strokeDasharray="5 5" />
      <path d="M200 75 H290" className="stroke-accent" strokeWidth="3" />
      <path d="M200 105 H290" className="stroke-foreground" strokeWidth="3" />
      {/* Cable jacket hint */}
      <rect x="110" y="64" width="170" height="52" rx="10" className="stroke-border" strokeWidth="1" fill="none" />
      {/* Jumper */}
      <path d="M290 75 H310 V105 H290" className="stroke-accent" strokeWidth="2.5" fill="none" />
      <circle cx="310" cy="90" r="4" className="fill-accent" />
      <text x="180" y="56" textAnchor="middle" fontSize="10" className="fill-accent">wire under test</text>
      <text x="180" y="132" textAnchor="middle" fontSize="10" className="fill-muted">known-good return</text>
      <text x="304" y="128" textAnchor="middle" fontSize="10" className="fill-muted">jumper</text>
      <text x="180" y="96" textAnchor="middle" fontSize="9" className="fill-muted">long run</text>
      <text x="43" y="150" textAnchor="middle" fontSize="10" className="fill-foreground">Near end</text>
      <text x="300" y="150" textAnchor="middle" fontSize="10" className="fill-foreground">Far end</text>
      <text x="170" y="178" textAnchor="middle" fontSize="10" className="fill-muted">
        Reading = wire + return + jumper + meter leads
      </text>
    </svg>
  );
}

export default function HowToMeasureContinuityOnALongElectricalWirePage() {
  return (
    <HowToShell
      title="How to Measure Continuity on a Long Electrical Wire"
      description={description}
      published="2026-10-22"
      path="/multimeters/how-to-measure-continuity-on-a-long-electrical-wire"
      category="multimeters"
      intro={
        <>
          To measure continuity on a long electrical wire whose ends are too far apart for both probes, join the
          far end to a known-good conductor, such as another wire in the same cable or the ground wire, then test
          the loop from the near end. A low reading means the wire is continuous; OL means it is broken. You can
          also run a long test lead back along the route. Either way, the circuit must be de-energised first.
        </>
      }
      aside={{
        image: klein.image,
        alt: "Klein Tools MM400 auto-ranging multimeter, front view",
        caption: (
          <>
            The Klein Tools MM400 (auto-ranging, CAT III 600V, 4,000-count) handles the resistance and
            continuity readings a long-run test needs. It is not True RMS and has no low-impedance mode. See our{" "}
            <Link href="/multimeters/klein-mm400-review" className={link}>
              MM400 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "the-problem", label: "Why long wires are awkward" },
        { id: "isolate-the-circuit", label: "De-energise and isolate" },
        { id: "loop-method", label: "The loop method" },
        { id: "long-test-lead", label: "Using a long test lead" },
        { id: "expected-resistance-by-awg", label: "Expected resistance by AWG" },
        { id: "fish-tape", label: "Testing with a fish tape" },
        { id: "reading-the-results", label: "Reading the results" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "How much resistance is too much for a long wire?",
          a: "Compare the reading with the expected copper resistance for that gauge and length. For a loop, double the run length. A result close to the calculation, plus a few tenths of an ohm for leads and connections, is a pass. A reading several times higher than expected suggests a corroded splice, a loose terminal or broken strands, even if the meter still beeps.",
        },
        {
          q: "Why does my meter beep on one long wire but not another?",
          a: "The continuity beeper only sounds below a threshold set by the meter, often in the tens of ohms, depending on the model. A long run of thin wire can exceed it while still being perfectly intact. Switch to resistance mode and compare the actual value with the expected figure for its gauge and length instead of relying on the beep.",
        },
        {
          q: "Can I use the ground wire to test continuity on a long run?",
          a: "Yes, if the ground conductor itself is known to be good and the circuit is isolated. Jumper the suspect wire to ground at the far end and measure between them at the near end. Remove the jumper afterwards. Using conduit or a metal box as the return also works, but those paths are less predictable, so treat the result as pass or fail.",
        },
        {
          q: "What is ghost voltage on a disconnected wire?",
          a: "It is voltage coupled capacitively from nearby live conductors into a wire that is not connected to anything. A high-impedance digital meter can display tens of volts that collapse as soon as any load is applied. A low-impedance (LoZ) mode loads the wire enough to make ghost voltage disappear, while a real supply stays put.",
        },
        {
          q: "How do I identify which wire is which in a long cable?",
          a: "Twist two conductors together at the far end, then measure pairs at the near end until one reads low: those are the two you joined. Mark them, move the jumper to a different pair and repeat. With three or more conductors this identifies every wire. Remove all jumpers before reconnecting the circuit.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-electrical-wires-with-a-multimeter",
          title: "How to Test Electrical Wires With a Multimeter",
          desc: "Find opens and shorts on wires you can reach end to end, including automotive wiring.",
        },
        {
          href: "/multimeters/multimeter-continuity-beep-intermittent",
          title: "Why Does My Multimeter's Continuity Beep Cut Out?",
          desc: "Diagnose a beep that comes and goes on a connection that should be solid.",
        },
      ]}
    >
      <Callout title="Confirm the wire is dead before any resistance test">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Switch off and lock out the breaker, then confirm zero volts at both ends with a voltage test on a
            meter rated for the circuit&apos;s CAT category.
          </li>
          <li>
            Disconnect the wire from loads and devices at both ends. Anyone working at the far end must know
            the circuit is under test.
          </li>
          <li>Never push a metal fish tape into a box or conduit that holds live conductors.</li>
        </ul>
      </Callout>

      <section>
        <h2 id="the-problem" className="text-xl font-semibold mb-3">Why long wires are awkward to test</h2>
        <p className="text-muted leading-7 mb-4">
          A continuity test needs a closed path from one probe, through the wire, to the other probe. On a short
          lead or a car harness both ends are within arm&apos;s reach; our guide to{" "}
          <Link href="/multimeters/how-to-test-electrical-wires-with-a-multimeter" className={link}>
            testing electrical wires with a multimeter
          </Link>{" "}
          covers that case. On a cable run between rooms, floors or buildings, the far end may be tens of meters
          away. You need a way to bring the far end back to the meter, and you need to know what a long but healthy
          wire should read, because its resistance is no longer close to zero.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="isolate-the-circuit">De-energise and isolate the circuit</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Long runs bring a hazard that short wires rarely do: induced voltage. A dead conductor that runs
          alongside live cables can pick up a capacitively coupled &quot;ghost&quot; voltage, and a disconnected
          run may still be connected to something you didn&apos;t expect at the far end.
        </p>
        <p className="text-muted leading-7">
          Use the voltage range first. If you see a reading, find its source before going any further. A
          low-impedance mode, where your meter has one, loads the wire so ghost voltage collapses while a genuine
          supply does not. Only switch to continuity or resistance once the wire reads zero, because any voltage
          on the conductor will upset the reading and can damage the meter.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="loop-method">Use the loop method: jumper the far end</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Pick a return conductor you trust: another core in the same cable, the ground conductor, or a spare wire
          pulled alongside. At the far end, join it to the wire under test with a wire nut, a clip lead or a
          terminal block. At the near end, measure resistance between the two.
        </p>
        <Figure caption={<>The loop method. The meter sees both conductors in series, so the expected reading is roughly double the resistance of a single run.</>}>
          <LoopMethodDiagram />
        </Figure>
        <ol className="space-y-2 list-decimal pl-5 text-muted leading-7 mt-4">
          <li>Short your probe tips together and note the lead resistance, or use the meter&apos;s relative mode to zero it.</li>
          <li>Measure across the two conductors at the near end with the far-end jumper in place.</li>
          <li>Remove the jumper and measure again. You should now see OL. A low reading without the jumper means the two conductors are shorted to each other or connected through something else.</li>
        </ol>
        <KeyIdea title="Why the second reading matters">
          The jumper-off test proves the low reading came through your jumper and not through a parallel path,
          the same trap described in{" "}
          <Link href="/multimeters/how-to-measure-resistance-in-a-parallel-circuit" className={link}>
            measuring resistance in a parallel circuit
          </Link>
          .
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={3} id="long-test-lead">Use a long test lead instead</StepHeading>
        <p className="text-muted leading-7">
          When no return conductor is available, run a temporary lead back from the far end: a reel of hookup wire
          or a spare extension cord conductor works. Connect it to the far end of the wire under test, bring it back
          to the meter, and measure. Measure the temporary lead on its own as well, by joining its ends, and
          subtract its resistance from the total.
        </p>
      </section>

      <section>
        <h2 id="expected-resistance-by-awg" className="text-xl font-semibold mb-3">Expected resistance of long copper wire by AWG</h2>
        <p className="text-muted leading-7 mb-4">
          Copper resistance depends on gauge, length and temperature. The figures below are typical values for
          solid annealed copper at 20 °C; stranded wire reads slightly higher, and resistance rises by roughly
          0.4% per °C as the wire warms. Use them to judge whether a measured value is plausible.
        </p>
        <DataTable
          head={["AWG", "Ω per 100 ft (single conductor)", "Ω per 100 m", "100 ft run, loop of 2"]}
          rows={[
            ["22", "≈ 1.61", "≈ 5.30", "≈ 3.23 Ω"],
            ["20", "≈ 1.02", "≈ 3.33", "≈ 2.03 Ω"],
            ["18", "≈ 0.64", "≈ 2.09", "≈ 1.28 Ω"],
            ["16", "≈ 0.40", "≈ 1.32", "≈ 0.80 Ω"],
            ["14", "≈ 0.25", "≈ 0.83", "≈ 0.50 Ω"],
            ["12", "≈ 0.16", "≈ 0.52", "≈ 0.32 Ω"],
            ["10", "≈ 0.10", "≈ 0.33", "≈ 0.20 Ω"],
          ]}
          mono={[1, 2, 3]}
        />
        <Figure caption={<>Typical loop resistance for a 100 ft run tested with the loop method (200 ft of copper in total). Thinner wire reads noticeably higher.</>}>
          <BarChart
            items={[
              { label: "22 AWG", value: 3.23, display: "≈ 3.23 Ω" },
              { label: "20 AWG", value: 2.03, display: "≈ 2.03 Ω" },
              { label: "18 AWG", value: 1.28, display: "≈ 1.28 Ω" },
              { label: "16 AWG", value: 0.8, display: "≈ 0.80 Ω" },
              { label: "14 AWG", value: 0.5, display: "≈ 0.50 Ω", highlight: true },
              { label: "12 AWG", value: 0.32, display: "≈ 0.32 Ω" },
              { label: "10 AWG", value: 0.2, display: "≈ 0.20 Ω" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Scale linearly with length: a 250 ft run of 14 AWG tested as a loop is about 500 ft of copper, roughly
          1.26 Ω. On very thin cable over long distances, the total can exceed the meter&apos;s beep threshold even
          though nothing is broken, so read the number rather than waiting for a tone.
        </p>
      </section>

      <section>
        <h2 id="fish-tape" className="text-xl font-semibold mb-3">Testing with a fish tape while pulling cable</h2>
        <p className="text-muted leading-7 mb-4">
          A steel fish tape is already a long conductor that reaches the far end. Once it is pushed through an
          empty conduit, hook the far end of the wire to its head and measure between the tape at the near end and
          the wire. Steel has far higher resistance than copper, so treat this as a pass-or-fail continuity check
          rather than a resistance figure.
        </p>
        <p className="text-muted leading-7">
          When pulling new cable, loop-test each conductor again after the pull, so damage from a sharp bend or a
          burr at a fitting shows up before the walls are closed.
        </p>
      </section>

      <section>
        <h2 id="reading-the-results" className="text-xl font-semibold mb-3">Reading the results</h2>
        <Figure caption={<>A typical loop reading for 100 ft of 14 AWG two-conductor cable after zeroing the leads: close to the 0.50 Ω expected.</>}>
          <MeterReadout value="0.52" unit="Ω" mode="Ω  loop, leads zeroed" />
        </Figure>
        <DataTable
          head={["Reading", "What it usually means"]}
          rows={[
            ["Close to the expected value; OL with jumper removed", "Wire is continuous and not shorted"],
            ["OL with the jumper in place", "Open somewhere in the wire, return or jumper. Swap the return to isolate it"],
            ["Several times higher than expected", "Corroded splice, loose terminal or broken strands"],
            ["Low reading with the jumper removed", "Conductors shorted together, or a load still connected"],
            ["Reading drifts or won't settle", "Residual voltage, cable capacitance charging, or a poor probe contact"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For a beep that cuts in and out as you flex the cable, see{" "}
          <Link href="/multimeters/multimeter-continuity-beep-intermittent" className={link}>
            why a continuity beep cuts out
          </Link>
          . If the display shows OL and you aren&apos;t sure why, our explainer on{" "}
          <Link href="/multimeters/what-does-ol-mean-on-a-multimeter" className={link}>
            what OL means on a multimeter
          </Link>{" "}
          covers every case.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter suits long cable runs</h2>
        <p className="text-muted leading-7 mb-6">
          Any meter with a resistance range can do the loop test. For building wiring, choose one rated for the
          CAT category of the circuit, since the same meter does the dead test first.
        </p>
        <ProductStrip
          title="Meters in our reviews"
          items={[
            {
              name: "Klein Tools MM400",
              image: klein.image,
              alt: "Klein Tools MM400 auto-ranging multimeter",
              href: "/multimeters/klein-mm400-review",
              note: "Auto-ranging, CAT III 600V, with temperature and capacitance. Not True RMS; discontinued by Klein.",
            },
            {
              name: "Fluke 179",
              image: fluke179.image,
              alt: "Fluke 179 digital multimeter",
              href: "/multimeters/fluke-87v-vs-fluke-179",
              note: "CAT IV 600V / CAT III 1000V for runs back to the service entrance, with a 6,000-count display for low-ohm readings.",
            },
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 True RMS electrician's multimeter",
              href: "/multimeters/fluke-117-review",
              note: "True RMS, CAT III 600V, with non-contact voltage detection built in for a quick first check.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
