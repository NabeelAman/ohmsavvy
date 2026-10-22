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
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to check a motor winding for a short with a multimeter: lock out the motor, compare winding resistances, test each winding to the frame, then go further.";

export const metadata = buildMetadata({
  title: "How to Check a Motor Winding for a Short",
  description,
  path: "/multimeters/how-to-check-a-motor-winding-for-a-short-with-a-multimeter",
});

const fluke87v = picks.find((p) => p.name === "Fluke 87V")!;
const fluke117 = picks.find((p) => p.name === "Fluke 117")!;
const klein = picks.find((p) => p.name === "Klein Tools MM400")!;

const link = "text-accent hover:underline";

export default function HowToCheckAMotorWindingForAShortWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Check a Motor Winding for a Short With a Multimeter"
      description={description}
      published="2026-10-22"
      path="/multimeters/how-to-check-a-motor-winding-for-a-short-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To check a motor winding for a short with a multimeter, you lock the motor out, disconnect its
          leads, compare the resistance of each winding against the others, and then test every winding
          against the motor frame. Those two tests catch open windings, badly unbalanced windings and hard
          shorts to ground. They do not catch everything: a few shorted turns or weak insulation can pass a
          multimeter test and still fail in service. This guide covers both tests, how to read the numbers,
          single-phase and DC motors, and when you need an insulation tester instead.
        </>
      }
      aside={{
        image: fluke87v.image,
        alt: "Fluke 87V industrial digital multimeter, front view",
        caption: (
          <>
            The Fluke 87V (True RMS, CAT III 1000V / CAT IV 600V) is the professional pick in our roundup,
            built for daily industrial work. See our{" "}
            <Link href="/multimeters/fluke-87v-review" className={link}>
              Fluke 87V review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "lock-out-the-motor", label: "Lock out and disconnect the motor" },
        { id: "identify-the-leads", label: "Identify the winding leads" },
        { id: "compare-windings", label: "Compare winding-to-winding resistance" },
        { id: "worked-comparison", label: "Worked comparison: reading the imbalance" },
        { id: "winding-to-frame", label: "Test each winding to the frame" },
        { id: "what-a-meter-misses", label: "What a multimeter cannot see" },
        { id: "single-phase-motors", label: "Single-phase motors: start and run windings" },
        { id: "dc-motors", label: "DC motors: field, armature and brushes" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "What resistance should a motor winding read?",
          a: "There is no universal value. Small motors often read a few ohms to tens of ohms per winding, while large industrial motors can read well under one ohm. The motor manufacturer or a rewind shop record may list it, but the most useful check is comparison: the three windings of a three-phase motor should read almost the same as each other.",
        },
        {
          q: "What reading to ground means a motor is bad?",
          a: "On a multimeter, any steady resistance reading between a winding and the frame, rather than OL, points to a ground fault and the motor should not be run. A pass on the meter is not proof of good insulation, though. Insulation resistance is judged with an insulation tester at a suitable test voltage, against the minimum given by the manufacturer or the applicable standard.",
        },
        {
          q: "Can I test a motor winding while it is still connected to the VFD?",
          a: "Do not. The drive output stage sits across the motor leads, so resistance readings include it, and an insulation tester can damage the drive. A drive also holds charged DC bus capacitors after it is switched off. Isolate, wait the time the drive manual specifies, confirm zero volts, then disconnect the motor leads at the drive or terminal box before testing.",
        },
        {
          q: "Why does a motor keep tripping when its windings test good?",
          a: "The winding may have a turn-to-turn short or insulation weakness that a low-voltage meter cannot reveal, or the cause may be outside the motor: a seized bearing or overloaded machine, a lost supply phase, a failing starter contact or capacitor, or a wrongly set overload. Measure the running current on each phase with a clamp meter and compare it with the nameplate.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-measure-resistance-of-a-heating-element-with-a-multimeter",
          title: "How to Measure Resistance of a Heating Element",
          desc: "The same two checks, resistance and short-to-ground, applied to appliance heating elements.",
        },
        {
          href: "/multimeters/how-to-measure-ac-current-with-a-clamp-meter",
          title: "How to Measure AC Current With a Clamp Meter",
          desc: "Compare the running current on each phase, the live check that complements a winding test.",
        },
      ]}
    >
      <Callout title="Safety first: motors, drives and capacitors">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Lock out and tag out the supply at the isolator, then prove it dead with a voltage tester at the
            motor terminals before you touch anything. Resistance tests are only ever made on a dead circuit.
          </li>
          <li>
            A variable frequency drive (VFD) keeps its DC bus capacitors charged after the supply is
            switched off. Wait the discharge time given in the drive manual and measure zero volts before
            disconnecting the motor leads.
          </li>
          <li>
            Single-phase motors with start or run capacitors can hold a charge too. Discharge the capacitor
            safely, following the equipment manual, before testing.
          </li>
          <li>
            A permanent-magnet or DC motor generates voltage when its shaft turns. Keep the shaft still
            while measuring, or the reading is meaningless and the meter can be stressed.
          </li>
        </ul>
      </Callout>

      <section>
        <p className="text-muted leading-7 mb-4">
          The whole procedure follows the same order every time: isolate, measure the windings against each
          other, measure them against the frame, and escalate to better test equipment when the meter passes
          a motor that is still misbehaving.
        </p>
        <Figure
          caption={
            <>
              The test order. Steps 3 and 4 are what a multimeter can do; step 5 is where it runs out. A motor
              that fails step 3 or 4 has a fault, but a motor that passes both is not proven healthy.
            </>
          }
        >
          <FlowDiagram
            steps={[
              { label: "Lock out", sub: "Isolate, prove dead, discharge" },
              { label: "Disconnect", sub: "Lift leads from drive or starter" },
              { label: "Winding vs winding", sub: "Readings should match closely" },
              { label: "Winding vs frame", sub: "Should read OL" },
              { label: "Escalate", sub: "Insulation or surge test if needed" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="lock-out-the-motor">Lock out and disconnect the motor</StepHeading>
        <p className="text-muted leading-7">
          Once the supply is locked off and proven dead, open the motor terminal box and disconnect the
          supply cable or lift the motor leads at the starter or drive. Measuring with the cable still
          connected puts the contactor, overload, drive output or other loads in parallel with the windings,
          and those paths change the reading. Photograph the connections first so they go back the same
          way, including any links between terminals.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="identify-the-leads">Identify the winding leads</StepHeading>
        <p className="text-muted leading-7">
          The nameplate or the diagram inside the terminal box cover shows how the windings are brought out.
          A simple three-phase motor has three leads, usually marked T1, T2, T3 or U, V, W. Six- and
          nine-lead motors bring out both ends of each winding, joined by links for star (wye) or delta. If
          you can remove the links, you can measure each winding on its own, which gives clearer readings. A
          single-phase motor has run and start windings, usually with a common lead, covered further down.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="compare-windings">Compare winding-to-winding resistance</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set the meter to its lowest resistance range, short the probe tips together and press REL (or note
          the lead reading) so lead resistance is subtracted; the method is in our guide to{" "}
          <Link href="/multimeters/how-to-measure-resistance-in-ohms-with-a-digital-multimeter" className={link}>
            measuring resistance in ohms
          </Link>
          . Then measure T1 to T2, T2 to T3 and T1 to T3, pressing the probes firmly onto clean metal.
        </p>
        <p className="text-muted leading-7 mb-4">
          On a star-connected motor each reading is two windings in series; on a delta motor it is one
          winding in parallel with the other two. Either way, the three readings should be close to equal.
          Guidance commonly treats a spread of more than a few percent as worth investigating, but the motor
          manufacturer or rewind shop sets the actual limit. Take all readings at the same time, because
          copper resistance rises with temperature, and a motor that has just been running reads higher than
          one that has cooled.
        </p>
        <p className="text-muted leading-7">
          A reading of OL on any pair means an open circuit: a broken winding, a burnt connection or a loose
          lead. Our page on{" "}
          <Link href="/multimeters/what-does-ol-mean-on-a-multimeter" className={link}>
            what OL means on a multimeter
          </Link>{" "}
          covers the display itself. A single coil, such as a valve solenoid, has nothing to compare against,
          so it is judged against its rated value instead; see{" "}
          <Link href="/multimeters/how-to-test-a-solenoid-valve-coil-resistance-with-a-multimeter" className={link}>
            how to test a solenoid valve coil resistance
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="worked-comparison" className="text-xl font-semibold mb-3">Worked comparison: reading the imbalance</h2>
        <p className="text-muted leading-7 mb-4">
          A simple way to express the spread is the largest difference from the average, divided by the
          average. These are illustrative readings from star-connected motors, not values for any particular
          model.
        </p>
        <DataTable
          head={["Motor", "T1–T2", "T2–T3", "T1–T3", "Imbalance", "What it suggests"]}
          rows={[
            ["A", "4.20 Ω", "4.22 Ω", "4.18 Ω", "≈ 0.5%", "Balanced; move on to the frame test"],
            ["B", "4.20 Ω", "3.70 Ω", "3.70 Ω", "≈ 8.6%", "Both readings involving T3 are low: suspect the T3 winding"],
            ["C", "4.20 Ω", "OL", "OL", "n/a", "Open in the T3 winding or its connection"],
            ["D", "0.62 Ω", "0.63 Ω", "0.62 Ω", "≈ 1.1%", "One count apart: below what the meter can resolve"],
          ]}
          mono={[1, 2, 3, 4]}
        />
        <p className="text-muted leading-7 mt-4 mb-4">
          For motor B the average is (4.20 + 3.70 + 3.70) ÷ 3 ≈ 3.87 Ω, the largest difference is 4.20 − 3.87
          = 0.33 Ω, and 0.33 ÷ 3.87 ≈ 8.6%. The pattern matters more than the percentage: in a star motor, the
          winding common to both low readings is the suspect, here T3.
        </p>
        <Figure
          caption={
            <>
              Motor B&apos;s three readings. T2–T3 and T1–T3 both read 3.70 Ω against 4.20 Ω for T1–T2. The
              winding they share, T3, has lost resistance, which is consistent with shorted turns.
            </>
          }
        >
          <BarChart
            items={[
              { label: "T1–T2", value: 4.2, display: "4.20 Ω" },
              { label: "T2–T3", value: 3.7, display: "3.70 Ω", highlight: true },
              { label: "T1–T3", value: 3.7, display: "3.70 Ω", highlight: true },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Motor D shows the limit of the method. On larger motors the windings read below an ohm, and a meter
          with 0.01 Ω or 0.1 Ω resolution, plus some variation in probe contact, cannot separate a healthy
          winding from a slightly shorted one. Low-resistance ohmmeters that use a four-wire connection are
          made for exactly this.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="winding-to-frame">Test each winding to the frame</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Switch to the highest resistance range. Put one probe on bare metal of the motor frame, such as the
          earth terminal or a scraped spot free of paint, and touch the other probe to each motor lead in
          turn. Keep your fingers off both probe tips, or the meter reads your body resistance. A healthy
          winding reads OL, meaning the resistance to the frame is above the meter&apos;s highest range.
        </p>
        <Figure
          caption={
            <>
              Winding T1 to the frame on the highest resistance range: OL, above the meter&apos;s top range.
              That is a pass for a hard short only. Any steady reading in ohms, kilohms or a few megohms means
              current has a path to the frame.
            </>
          }
        >
          <div className="max-w-xs mx-auto">
            <MeterReadout value="OL" unit="MΩ" mode="Ω  T1 to frame" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          A winding that reads a definite resistance to the frame has a ground fault and should not be
          re-energised. Damp windings can read low as well, and a motor that has stood in a wet location
          may recover after drying, but that is a decision for an insulation test, not the multimeter. The
          same frame test is used on appliances; see{" "}
          <Link href="/multimeters/how-to-measure-resistance-of-a-heating-element-with-a-multimeter" className={link}>
            measuring the resistance of a heating element
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="what-a-meter-misses" className="text-xl font-semibold mb-3">What a multimeter cannot see</h2>
        <p className="text-muted leading-7 mb-4">
          A winding contains many turns of wire. If two adjacent turns short together, the resistance drops by
          only the share of wire they bypass, which can be a fraction of a percent: less than the normal
          spread between readings. Yet that shorted loop behaves like a shorted transformer secondary when
          the motor runs, carrying high current and overheating until the insulation around it fails.
        </p>
        <p className="text-muted leading-7 mb-4">
          Insulation is the other blind spot. A multimeter measures resistance with a few volts at most.
          Insulation that is cracked, contaminated or damp can read OL at that voltage and still break down at
          the motor&apos;s operating voltage and its switching spikes. An insulation resistance tester, often
          called a megger, applies a DC test voltage chosen for the motor&apos;s voltage rating and reads
          the leakage in megohms; the test voltage and pass limit come from the motor manufacturer or the
          applicable standard.
        </p>
        <DataTable
          head={["Fault", "Multimeter catches it?", "Better tool"]}
          rows={[
            ["Open winding or broken lead", "Yes, OL between leads", "Multimeter is enough"],
            ["Hard short from winding to frame", "Yes, a reading instead of OL", "Insulation tester to confirm"],
            ["Many shorted turns in a small winding", "Sometimes, as one low reading", "Low-resistance ohmmeter, inductance comparison"],
            ["A few shorted turns in a large winding", "Rarely", "Surge tester, running current per phase"],
            ["Weak or damp insulation", "Usually not, still reads OL", "Insulation resistance tester"],
          ]}
        />
        <div className="mt-5">
          <KeyIdea title="Use the running current as a cross-check">
            When a motor is fit to run, measure the current on each phase with a clamp meter and compare them
            with each other and the nameplate. A clear imbalance on a balanced supply points back at the
            motor. Our guide to{" "}
            <Link href="/multimeters/how-to-measure-ac-current-with-a-clamp-meter" className={link}>
              measuring AC current with a clamp meter
            </Link>{" "}
            covers the method.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 id="single-phase-motors" className="text-xl font-semibold mb-3">Single-phase motors: start and run windings</h2>
        <p className="text-muted leading-7 mb-4">
          Single-phase induction motors have a run winding and a start (auxiliary) winding, often with a
          common lead, and their resistances are not supposed to match. The start winding usually uses finer
          wire and reads higher than the run winding, though the actual values come from the manufacturer.
          The useful check is internal consistency: with leads common (C), start (S) and run (R), C–S plus
          C–R should equal S–R, because S–R measures both windings in series.
        </p>
        <p className="text-muted leading-7">
          A start winding that reads OL, or a sum that does not add up, points to a fault. Failed start or
          run capacitors and stuck centrifugal switches cause many of the same symptoms as a bad winding,
          so check them too; see{" "}
          <Link href="/multimeters/how-to-test-a-capacitor-with-a-multimeter" className={link}>
            how to test a capacitor with a multimeter
          </Link>{" "}
          and, for HVAC and appliance fans,{" "}
          <Link href="/multimeters/how-to-test-a-fan-motor-capacitor-with-a-multimeter" className={link}>
            how to test a fan motor capacitor
          </Link>
          . Fan motors on electronics are a different case, covered in{" "}
          <Link href="/multimeters/how-to-test-a-4-wire-fan-motor-with-a-multimeter" className={link}>
            how to test a 4 wire fan motor
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="dc-motors" className="text-xl font-semibold mb-3">DC motors: field, armature and brushes</h2>
        <p className="text-muted leading-7 mb-4">
          On a wound-field DC motor, measure the field winding on its own terminals and compare it with the
          manufacturer&apos;s figure or an identical motor. The armature is tested at the commutator: with
          the brushes lifted or removed, measure between adjacent commutator bars all the way round. The
          readings should be very similar; a markedly low pair suggests a shorted coil, and a high or OL pair
          suggests an open coil or a broken connection to that bar. These are small resistances, so null the
          leads first.
        </p>
        <p className="text-muted leading-7">
          For small brushed permanent-magnet motors, measure across the two terminals and turn the shaft
          slowly by hand between readings. A reading that jumps to OL at certain positions points to worn
          brushes, a dirty commutator or an open armature coil. Finally, test the terminals and the armature
          to the frame, exactly as for an AC motor.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which meter to use</h2>
        <p className="text-muted leading-7 mb-6">
          Motor work happens on industrial and building supplies, so choose a meter whose CAT rating suits the
          installation, with a clear low-resistance range and a REL function for nulling the leads. The
          meters below are from our{" "}
          <Link href="/multimeters/best-multimeters" className={link}>
            best multimeters
          </Link>{" "}
          roundup, and our{" "}
          <Link href="/multimeters/best-multimeter-for-electricians" className={link}>
            best multimeter for electricians
          </Link>{" "}
          guide compares them for trade use.
        </p>
        <ProductStrip
          title="Meters in our reviews"
          items={[
            {
              name: "Fluke 87V",
              image: fluke87v.image,
              alt: "Fluke 87V digital multimeter",
              href: "/multimeters/fluke-87v-review",
              note: "True RMS, CAT III 1000V / CAT IV 600V. The step-up pick for daily professional and industrial use.",
            },
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 digital multimeter",
              href: "/multimeters/fluke-117-review",
              note: "True RMS, auto-ranging, CAT III 600V. The meter working electricians buy with their own money.",
            },
            {
              name: "Klein Tools MM400",
              image: klein.image,
              alt: "Klein Tools MM400 digital multimeter",
              href: "/multimeters/klein-mm400-review",
              note: "Auto-ranging, CAT III 600V. Aimed at tradespeople and home electrical work.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
