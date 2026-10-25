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
  "Why your multimeter shows the wrong voltage: AC/DC or range mix-ups, leads in the amps jack, a weak battery, True RMS limits, circuit loading and ghost voltage.";

export const metadata = buildMetadata({
  title: "Why Does My Multimeter Show the Wrong Voltage?",
  description,
  path: "/multimeters/why-does-my-multimeter-show-the-wrong-voltage",
});

const all = getAllPicks("multimeters");
const fluke117 = all.find((p) => p.name === "Fluke 117")!;
const fluke87v = all.find((p) => p.name === "Fluke 87V")!;
const ht118a = all.find((p) => p.name === "KAIWEETS HT118A")!;

const link = "text-accent hover:underline";

/** A 10 MΩ meter across the lower leg of a 1 MΩ / 1 MΩ divider pulls the midpoint down. */
function LoadingDiagram() {
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full h-auto"
      role="img"
      aria-label="Circuit diagram: a 10 volt source feeds two 1 megohm resistors in series, and a multimeter with 10 megohm input impedance connected across the lower resistor lowers the midpoint voltage from 5.00 volts to about 4.76 volts"
    >
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        {/* source and outer loop */}
        <line x1="50" y1="30" x2="50" y2="88" />
        <line x1="50" y1="112" x2="50" y2="170" />
        <line x1="50" y1="30" x2="160" y2="30" />
        <line x1="50" y1="170" x2="270" y2="170" />
        {/* divider */}
        <line x1="160" y1="30" x2="160" y2="42" />
        <rect x="150" y="42" width="20" height="38" rx="2" />
        <line x1="160" y1="80" x2="160" y2="112" />
        <rect x="150" y="112" width="20" height="38" rx="2" />
        <line x1="160" y1="150" x2="160" y2="170" />
        {/* meter branch */}
        <line x1="160" y1="96" x2="270" y2="96" className="stroke-accent" />
        <line x1="270" y1="96" x2="270" y2="114" className="stroke-accent" />
        <circle cx="270" cy="133" r="19" className="stroke-accent" strokeWidth="2" />
        <line x1="270" y1="152" x2="270" y2="170" className="stroke-accent" />
      </g>
      {/* battery plates */}
      <line x1="36" y1="88" x2="64" y2="88" className="stroke-foreground" strokeWidth="2.4" />
      <line x1="42" y1="96" x2="58" y2="96" className="stroke-foreground" strokeWidth="2.4" />
      <line x1="36" y1="104" x2="64" y2="104" className="stroke-foreground" strokeWidth="2.4" />
      <line x1="42" y1="112" x2="58" y2="112" className="stroke-foreground" strokeWidth="2.4" />
      <circle cx="160" cy="96" r="3" className="fill-accent" />
      <g fontSize="10" className="fill-foreground">
        <text x="20" y="80">10 V</text>
        <text x="178" y="64">R1 1 MΩ</text>
        <text x="178" y="134">R2 1 MΩ</text>
        <text x="270" y="137" textAnchor="middle" className="fill-accent">V</text>
        <text x="296" y="128">meter</text>
        <text x="296" y="141">10 MΩ</text>
      </g>
      <text x="200" y="88" fontSize="9.5" className="fill-muted">midpoint</text>
      <text x="170" y="192" fontSize="9.5" textAnchor="middle" className="fill-muted">
        expected 5.00 V; with the meter attached ≈ 4.76 V
      </text>
    </svg>
  );
}

export default function WhyDoesMyMultimeterShowTheWrongVoltagePage() {
  return (
    <HowToShell
      title="Why Does My Multimeter Show the Wrong Voltage?"
      description={description}
      path="/multimeters/why-does-my-multimeter-show-the-wrong-voltage"
      category="multimeters"
      published="2026-10-25"
      intro={
        <>
          A multimeter that shows the wrong voltage is usually set up wrong rather than broken: the dial is
          on AC when the source is DC (or on mV instead of V), a lead sits in the amps jack, or the battery
          is low. The rest of the time the meter is reading something real that you didn&apos;t expect, such
          as a distorted waveform, its own loading effect on a high-impedance circuit, a ghost voltage, or a
          different reference point, and a quick check against a known source tells you which.
        </>
      }
      aside={{
        image: fluke87v.image,
        alt: "Fluke 87V True RMS digital multimeter",
        caption: (
          <>
            A True RMS meter with a high-resolution mode makes small voltage errors easier to spot. See our{" "}
            <Link href="/multimeters/fluke-87v-review" className={link}>
              Fluke 87V review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-wrong-means", label: "What counts as a wrong reading" },
        { id: "causes", label: "Causes at a glance" },
        { id: "setup-checks", label: "Check the setup first" },
        { id: "known-source", label: "Compare against a known source" },
        { id: "real-but-unexpected", label: "Readings that are real but unexpected" },
        { id: "loading", label: "When the meter loads the circuit" },
        { id: "calibration", label: "Accuracy and calibration" },
        { id: "meters", label: "Meters that help" },
      ]}
      faq={[
        {
          q: "Why does my multimeter read a few volts on DC when I measure a wall outlet?",
          a: "On the DC function, a meter averages the AC sine wave, which comes out near zero, so you often see a small, wandering number rather than 120 V. That is a setup error, not a fault. Switch to V AC (V~) and the reading should land near your nominal mains voltage. Some meters, such as those with automatic AC/DC selection, avoid the mistake entirely.",
        },
        {
          q: "Why do two multimeters show different voltages on the same circuit?",
          a: "Small differences are normal: each meter has its own accuracy specification, and two in-spec meters can disagree by a few counts. Larger gaps usually mean one meter is average-responding and the waveform is distorted, one has a weak battery, or the circuit has high source impedance so each meter's input loads it differently. Test both on a steady battery to separate these.",
        },
        {
          q: "Can a low battery make a multimeter read voltage wrong?",
          a: "Yes. As the battery sags, the meter's internal reference and analog circuitry can drift before the low-battery symbol appears, and readings may come out high, low or unstable. Many meters stay accurate until the indicator shows, but not all do. If readings suddenly look odd, fit a fresh battery before chasing a fault in the circuit.",
        },
        {
          q: "Why does my multimeter show voltage on a wire that is switched off?",
          a: "A disconnected conductor that runs beside live wires can pick up a coupled voltage that a 10 MΩ input displays as tens of volts. It has almost no current behind it and collapses under a load. A low-impedance (LoZ) mode, or a second test with a small load, separates this ghost voltage from a real backfeed. Treat the wire as live until you have proven otherwise.",
        },
        {
          q: "How do I know if my multimeter needs calibration?",
          a: "Measure a stable known source, such as a voltage reference module, a calibrated meter's reading of the same battery, or a precision reference IC, and compare the difference with your meter's published accuracy for that range. If it is outside spec with a fresh battery and good leads, have the meter calibrated or replaced. Professional users often calibrate annually.",
        },
      ]}
      next={[
        {
          href: "/multimeters/unstable-multimeter-readings",
          title: "What Causes Unstable Multimeter Readings?",
          desc: "When the number won't settle, rather than settling on the wrong value.",
        },
        {
          href: "/multimeters/ac-vs-dc-voltage",
          title: "AC vs. DC Voltage",
          desc: "What each setting measures and what RMS means on an AC reading.",
        },
        {
          href: "/multimeters/why-does-my-multimeter-show-voltage-when-measuring-a-disconnected-circuit",
          title: "Why Does My Multimeter Show Voltage on a Disconnected Circuit?",
          desc: "Ghost voltage, open neutrals and how to prove a circuit is dead.",
        },
      ]}
    >
      <Callout title="Mains voltage safety">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Use a meter and leads rated for the job (CAT III 600V or better for household branch circuits) and
            keep fingers behind the probe guards.
          </li>
          <li>
            Confirm the leads are in the COM and V jacks before touching a live circuit. A lead left in the A or mA
            jack turns the meter into a short circuit.
          </li>
          <li>Do not open panels or fixed wiring to chase a reading; that is work for a licensed electrician.</li>
        </ul>
      </Callout>

      <section>
        <h2 id="what-wrong-means" className="text-xl font-semibold mb-3">What counts as a wrong reading</h2>
        <p className="text-muted leading-7 mb-4">
          Before blaming the meter, decide what you expected and why. A 9 V battery that reads 8.4 V is probably
          just partly used. A US outlet that reads 118 V or 123 V is normal, because utility voltage is allowed
          to vary around the 120 V nominal. A reading only counts as wrong when it disagrees with the source by
          more than the meter&apos;s stated accuracy plus normal variation in the circuit, or when it is
          obviously impossible: 0.3 V on an outlet that powers a lamp, or 47 V on a 5 V USB port.
        </p>
        <p className="text-muted leading-7">
          Wrong readings fall into two groups. Setup errors come from the dial, the jacks, the leads or the
          battery, and they are fixed in seconds. Measurement effects are cases where the meter is accurately
          reporting what is at its input, but that is not the value you wanted: the waveform is not a clean
          sine, the meter&apos;s own resistance changes the circuit, a floating conductor is picking up a
          coupled voltage, or the black lead is on a different reference than you think.
        </p>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Causes at a glance</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["Near zero or random small number on an outlet", "Dial on V DC instead of V AC", "Look for the ~ or ⎓ symbol in the display", "Select V AC, or use auto AC/DC if the meter has it"],
            ["Reading 1,000 times too large or too small", "mV function or range instead of V", "Check the unit label (mV vs V) on the display", "Select the V function; let auto-range settle"],
            ["Reads 0, blown fuse, or a spark on contact", "Red lead in the A or mA jack", "Check which jack the red lead sits in", "Move it to the V jack; check the current fuse"],
            ["Readings drift, read high or low across all ranges", "Weak meter battery", "Low-battery symbol; swap in a fresh battery", "Replace the battery and re-test"],
            ["AC reading on a dimmer, VFD or inverter disagrees between meters", "Average-responding meter on a non-sine wave", "Compare with a True RMS meter", "Use a True RMS meter for distorted waveforms"],
            ["Lower than expected on a high-value divider or sensor", "Meter input impedance loading the circuit", "Compare with the source impedance (MΩ range)", "Measure at a lower-impedance point or allow for loading"],
            ["Tens of volts on a switched-off or open wire", "Ghost (coupled) voltage on a floating conductor", "Re-test with LoZ mode or a small load", "Treat as live until proven dead; see the ghost-voltage guide"],
            ["Correct size but wrong sign, or unexpected offset", "Black lead on a different reference point", "Trace where COM is connected", "Measure between the two points you actually care about"],
            ["Consistently off on a known source", "Meter out of calibration", "Compare with a reference or second meter", "Calibrate or replace the meter"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="setup-checks">Check the setup first</StepHeading>
        <p className="text-muted leading-7 mb-4">
          <strong>Function.</strong> AC and DC are separate positions on most dials, or one position with a
          SELECT button that toggles between them. Measure a car battery on V AC and many meters show close to
          zero; measure a wall outlet on V DC and you get a small number that wanders. Many dials also have a
          separate mV position for small signals. On mV, a 1.5 V cell either shows OL or forces the meter into
          a range that confuses the reading, so check the unit printed beside the digits, not just the dial.
          If you switch between AC and DC circuits all day, a meter with automatic AC/DC selection removes the
          step: Fluke lists AutoVolt as one of the features the 117 adds over the 115.
        </p>
        <p className="text-muted leading-7 mb-4">
          <strong>Range.</strong> On a manual-range meter, a range set far above the signal throws away
          resolution: 0.4 V on the 600 V range may display as 0.0 or 0.4 with no further digits. A range set
          below the signal shows OL. Auto-ranging meters handle this, but they need a moment to settle, and a
          reading taken while the meter is still stepping through ranges can be wrong.
        </p>
        <p className="text-muted leading-7 mb-4">
          <strong>Jacks.</strong> Voltage is measured with the red lead in the V (often V/Ω) jack. The A and mA
          jacks connect the leads across a low-value shunt resistor, so a lead left there after a current test
          reads almost nothing and, on a source that can deliver current, blows the meter&apos;s fuse or worse.
          Meters with lit or guarded jacks, such as Klein&apos;s Lead-Alert models, make this mistake easier to
          catch.
        </p>
        <p className="text-muted leading-7">
          <strong>Battery and leads.</strong> A weak battery can shift readings before the low-battery symbol
          appears on some meters, so a fresh one is the cheapest test there is. Then short the probe tips
          together on the resistance range: a reading that jumps or stays high points to a damaged lead or a
          loose plug, which can also make voltage readings flicker or read low on high-impedance sources.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="known-source">Compare against a known source</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Once the setup is right, measure something whose voltage you can trust. Good choices are a voltage
          reference module or precision reference IC, a regulated bench supply checked by a second meter, or a
          fresh alkaline AA cell (typically around 1.5 to 1.6 V when new, so it is a sanity check rather than a
          calibration standard). For AC, a known-good outlet is a reasonable reference for spotting gross
          errors, since the utility keeps it near nominal.
        </p>
        <p className="text-muted leading-7">
          If the meter reads the reference correctly, the meter is fine and the problem is in the circuit or in
          how you are measuring it. If it reads the reference wrong on DC as well as AC, with a fresh battery and
          good leads, suspect the meter itself. Our guide to{" "}
          <Link href="/multimeters/how-to-measure-a-voltage-reference-with-a-multimeter" className={link}>
            measuring a voltage reference
          </Link>{" "}
          covers how to do this carefully.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="real-but-unexpected">Readings that are real but unexpected</StepHeading>
        <p className="text-muted leading-7 mb-4">
          <strong>True RMS vs average-responding.</strong> Most budget and some name-brand meters measure the
          average of the rectified AC waveform and scale it as if the signal were a pure sine wave. On a clean
          sine that gives the right answer. On a chopped or distorted waveform, from a dimmer, a variable-speed
          drive, a modified-sine inverter or a switching supply, the scaling no longer fits and the reading can
          be noticeably high or low depending on the waveform shape. A True RMS meter computes the effective
          value directly, so it stays meaningful on those signals within its bandwidth and crest-factor limits.
          Fluke&apos;s own product pages state that the 106 and 107 are not True RMS, while the 115, 117 and 87V
          are, which is a useful example of the split even within one brand. The{" "}
          <Link href="/multimeters/ac-vs-dc-voltage" className={link}>
            AC vs DC voltage guide
          </Link>{" "}
          explains what an RMS figure represents.
        </p>
        <p className="text-muted leading-7 mb-4">
          <strong>Ghost voltage.</strong> A wire that is switched off but runs alongside live conductors can
          show a convincing AC voltage on a high-impedance meter, because the input barely loads the tiny
          coupled current. That is covered in depth in{" "}
          <Link href="/multimeters/why-does-my-multimeter-show-voltage-when-measuring-a-disconnected-circuit" className={link}>
            why a multimeter shows voltage on a disconnected circuit
          </Link>
          .
        </p>
        <p className="text-muted leading-7">
          <strong>Reference point.</strong> A voltage is always between two points. Clip COM to chassis in a car
          and probe a sensor output, and you include any voltage dropped in the sensor&apos;s ground path. Probe
          a split-rail circuit from the wrong rail and you see the sum of two supplies. If the size of the
          number looks right but the sign is reversed, see{" "}
          <Link href="/multimeters/why-does-my-multimeter-show-negative-voltage" className={link}>
            why a multimeter shows negative voltage
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={4} id="loading">When the meter loads the circuit</StepHeading>
        <p className="text-muted leading-7 mb-4">
          On its DC voltage function a typical digital multimeter presents an input impedance of around 10 MΩ.
          Across a battery or a regulated rail that is negligible. Across a node fed through resistors in the
          megohm range, such as a high-value divider, a pH or piezo sensor, or a reference with a large output
          resistor, the meter becomes part of the circuit and drags the voltage down. The diagram shows the
          effect with two 1 MΩ resistors: the meter&apos;s 10 MΩ in parallel with the lower resistor makes about
          0.91 MΩ, so the midpoint sits nearer 4.76 V than 5 V.
        </p>
        <Figure caption={<>Illustrative circuit: a 10 MΩ meter across the lower half of a 1 MΩ / 1 MΩ divider. The meter is reading accurately; it is the circuit that changed when you connected it.</>}>
          <LoadingDiagram />
        </Figure>
        <div className="mt-4 grid sm:grid-cols-2 gap-4 items-center">
          <Figure caption={<>Illustrative value: what the divider math predicts with nothing attached.</>}>
            <MeterReadout value="5.00" unit="V DC" mode="expected, unloaded" />
          </Figure>
          <Figure caption={<>Illustrative value: the same node with a 10 MΩ meter connected.</>}>
            <MeterReadout value="4.76" unit="V DC" mode="V⎓  10 MΩ input" />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The tell is that the error grows as the circuit&apos;s resistance grows, and that a meter with a
          different input impedance gives a different answer. Check the input impedance in your meter&apos;s
          manual (some differ between AC and DC, and LoZ modes are deliberately low), measure at a buffered or
          lower-impedance point if the design has one, or calculate the loading and correct for it. For more
          on measuring across individual parts, see{" "}
          <Link href="/multimeters/how-to-measure-voltage-across-a-resistor" className={link}>
            how to measure voltage across a resistor
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={5} id="calibration">Accuracy and calibration</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Every meter&apos;s accuracy is written as a percentage of the reading plus a number of counts on the
          last digit, and it differs by function and range. A spec of ±(0.5% + 2) on a 6.000 V range allows a
          5.000 V source to read anywhere from about 4.973 to 5.027 V, so two good meters can disagree in the
          last digits without either being wrong. AC accuracy is usually looser than DC and is specified only
          over a frequency band. The{" "}
          <Link href="/multimeters/multimeter-accuracy-for-electronics-repair" className={link}>
            multimeter accuracy guide
          </Link>{" "}
          walks through reading these specs.
        </p>
        <p className="text-muted leading-7">
          A meter that is consistently outside its own spec on a trusted reference, after the battery and leads
          have been ruled out, has drifted or been damaged, often by an overload on the wrong function. Inexpensive
          meters are usually replaced rather than calibrated. Higher-end meters can be sent to an accredited lab,
          and anyone whose work depends on traceable readings normally does that on a fixed schedule.
        </p>
      </section>

      <KeyIdea title="The fastest way to find the cause">
        Fix the dial, the jacks and the battery, then measure a source you trust. If that reading is right,
        stop suspecting the meter and look at the waveform, the circuit&apos;s impedance and your reference
        point instead.
      </KeyIdea>

      <section>
        <h2 id="meters" className="text-xl font-semibold mb-3">Meters that help</h2>
        <p className="text-muted leading-7 mb-4">
          No meter prevents every mistake, but some features remove whole rows from the table above: True RMS
          for distorted AC, automatic AC/DC selection, and LoZ for ghost voltages. These picks come from our
          verified multimeter list.
        </p>
        <ProductStrip
          title="Meters with True RMS and mistake-proofing features"
          items={[
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 True RMS electrician's multimeter",
              href: "/multimeters/fluke-117-review",
              note: "True RMS, CAT III 600V, with AutoVolt AC/DC selection, LoZ and NCV. Hands-on Tested.",
            },
            {
              name: "Fluke 87V",
              image: fluke87v.image,
              alt: "Fluke 87V industrial True RMS multimeter",
              href: "/multimeters/fluke-87v-review",
              note: "True RMS with a 19,999-count high-resolution mode and CAT IV 600V. Hands-on Tested.",
            },
            {
              name: "KAIWEETS HT118A",
              image: ht118a.image,
              alt: "KAIWEETS HT118A True RMS digital multimeter",
              href: "/multimeters/best-multimeters-for-electricians-under-100#kaiweets-ht118a",
              note: "Budget True RMS, 6,000-count, with NCV and Min/Max. Maker's page and manual disagree on max voltage.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
