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
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

// Fluke 117 resistance ranges 600.0 Ω (0.1 Ω) to 40.00 MΩ; accuracy ±(0.9% + 1) on 600 Ω–6 MΩ and ±(5% + 2) on 40 MΩ per https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-117
// UNI-T UT61E+ REL mode and 0.01 Ω resolution, BM786 relative zero and 0.01 Ω resolution, Fluke 87V 19,999-count mode
// and analog bar graph: per the Picks in src/lib/multimeter-catalog.ts and src/app/multimeters/best-multimeters/page.tsx.

const path = "/multimeters/why-does-my-multimeter-resistance-reading-keep-changing";
const description =
  "Multimeter resistance reading keeps changing? Fix finger contact, charging capacitors, warm thermistors, dirty probes, lead resistance and range hunting.";

export const metadata = buildMetadata({
  title: "Multimeter Resistance Reading Keeps Changing?",
  description,
  path: "/multimeters/why-does-my-multimeter-resistance-reading-keep-changing",
});

const all = getAllPicks("multimeters");
const fluke87v = all.find((p) => p.name === "Fluke 87V")!;
const ut61e = all.find((p) => p.name === "UNI-T UT61E+")!;
const bm786 = all.find((p) => p.name === "EEVblog Brymen BM786")!;

const link = "text-accent hover:underline";

/** Meter, resistor under test and the extra path through the user's hands in parallel with it. */
function FingerPathDiagram() {
  return (
    <svg
      viewBox="0 0 400 230"
      className="w-full h-auto"
      role="img"
      aria-label="Circuit diagram of an ohmmeter connected across a 1 megohm resistor. A second, dashed path runs through the user's two hands and body, shown as an illustrative 500 kilohm resistance in parallel with the resistor. The meter sees both paths combined and reads about 333 kilohms instead of 1 megohm, and the value wanders as grip pressure and skin moisture change."
    >
      <text x="10" y="18" fontSize="12" fontWeight="600" className="fill-foreground">
        Holding both probe tips adds a second path
      </text>
      {/* meter */}
      <rect x="20" y="70" width="70" height="90" rx="10" className="fill-surface stroke-accent" strokeWidth="2" />
      <text x="55" y="112" fontSize="16" fontWeight="700" textAnchor="middle" className="fill-accent">Ω</text>
      <text x="55" y="132" fontSize="9" textAnchor="middle" className="fill-muted">meter</text>
      <text x="55" y="148" fontSize="9" textAnchor="middle" className="fill-foreground">333 kΩ?</text>
      {/* top and bottom rails */}
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        <path d="M90 90 H330 V105" />
        <path d="M90 140 H330 V125" />
        <line x1="200" y1="90" x2="200" y2="102" />
        <line x1="200" y1="128" x2="200" y2="140" />
      </g>
      <circle cx="200" cy="90" r="3" className="fill-foreground" />
      <circle cx="200" cy="140" r="3" className="fill-foreground" />
      <circle cx="330" cy="90" r="3" className="fill-foreground" />
      <circle cx="330" cy="140" r="3" className="fill-foreground" />
      {/* resistor under test */}
      <rect x="190" y="102" width="20" height="26" rx="2" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <text x="216" y="119" fontSize="10" className="fill-foreground">1 MΩ resistor</text>
      {/* body path */}
      <rect x="320" y="105" width="20" height="20" rx="2" className="fill-accent/20 stroke-accent" strokeWidth="1.6" strokeDasharray="4 3" />
      <text x="346" y="112" fontSize="10" className="fill-accent">your body</text>
      <text x="346" y="125" fontSize="10" className="fill-accent">≈ 500 kΩ</text>
      <text x="346" y="138" fontSize="9" className="fill-muted">(illustrative)</text>
      <g fontSize="9.5" className="fill-muted">
        <text x="150" y="84" textAnchor="middle">red probe + left hand</text>
        <text x="150" y="155" textAnchor="middle">black probe + right hand</text>
      </g>
      <text x="10" y="190" fontSize="10" className="fill-foreground">
        Parallel result: (1,000 × 500) ÷ (1,000 + 500) ≈ 333 kΩ
      </text>
      <text x="10" y="208" fontSize="10" className="fill-foreground">
        Grip and skin moisture change the body path, so the reading wanders.
      </text>
    </svg>
  );
}

export default function ResistanceReadingKeepsChangingPage() {
  return (
    <HowToShell
      title="Why Does My Multimeter Resistance Reading Keep Changing?"
      description={description}
      path={path}
      category="multimeters"
      published="2026-10-29"
      intro={
        <>
          A multimeter resistance reading keeps changing when something other than the part itself is in the
          measurement: your fingers on the probe tips, a capacitor that is still charging, a part that is warming
          up, a probe that isn&apos;t making solid contact, or a value sitting on the edge between two ranges. Hold
          the part by its body (not the leads), press the tips firmly onto clean metal, give the reading a few
          seconds and, if it still moves, the steps below find which of those is to blame. This page is about a
          single ohms reading that won&apos;t settle; if you get different but steady values on a circuit board, or
          your voltage readings jump around, see the linked guides instead.
        </>
      }
      aside={{
        image: fluke87v.image,
        alt: "Fluke 87V multimeter with analog bar graph for watching a resistance reading settle",
        caption: (
          <>
            A fast bar graph shows whether a reading is creeping one way or jumping at random. See our{" "}
            <Link href="/multimeters/fluke-87v-review" className={link}>
              Fluke 87V review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "settle-or-wander", label: "Settling vs wandering" },
        { id: "causes", label: "Causes at a glance" },
        { id: "fingers", label: "Why fingers matter on high ohms" },
        { id: "hands-off", label: "1. Take your hands off the metal" },
        { id: "contact", label: "2. Fix the probe contact" },
        { id: "capacitance", label: "3. Wait out a charging capacitor" },
        { id: "temperature", label: "4. Rule out temperature" },
        { id: "low-ohms", label: "5. Zero the leads on low values" },
        { id: "range", label: "6. Stop the range hunting" },
        { id: "power", label: "7. Confirm the part is unpowered" },
        { id: "how-much", label: "How much movement is normal?" },
        { id: "meters", label: "Meters that help" },
      ]}
      faq={[
        {
          q: "Why does my resistance reading go up slowly and then stop?",
          a: "A slow, steady climb that levels off is the signature of capacitance. The meter's test current charges any capacitor across the probes, and the reading only becomes the true resistance once it is full. Large electrolytics on high ohms ranges can take several seconds or longer. Wait for the number to stop moving, and discharge the capacitor before and after measuring.",
        },
        {
          q: "Does touching the probes affect resistance readings?",
          a: "Yes, mainly on high values. If you hold both metal tips, or both leads of the part, your body becomes a resistor in parallel with it. Against a 100 Ω part that barely matters; against 1 MΩ it can cut the reading by more than half, and it drifts as your grip changes. Hold the part by its body, use clip leads, or rest it on the bench.",
        },
        {
          q: "Why does my multimeter's last digit keep changing on ohms?",
          a: "A flicker of one or two counts in the last digit is normal. It sits inside the meter's specified accuracy, which includes a count allowance, plus tiny changes in probe contact. On a Fluke 117 measuring 4.700 kΩ, the spec allows about ±0.043 kΩ. Movement much larger than the accuracy limit points to contact, temperature or a part that genuinely varies.",
        },
        {
          q: "Why does resistance change when I measure a thermistor or sensor?",
          a: "Because that is its job. An NTC thermistor's resistance falls as it warms, commonly by a few percent per degree Celsius near room temperature, so warmth from your fingers or breath moves the reading within seconds. Hold it by its leads with clips, let it reach room temperature, and compare the stable value with the maker's resistance-versus-temperature table.",
        },
        {
          q: "How do I get a stable reading on a very low resistance?",
          a: "Short the probes, note the lead resistance and subtract it, or use a relative (REL or zero) mode if the meter has one. Press the tips hard onto clean metal and keep the pressure the same, because contact resistance of a tenth of an ohm or so swamps a milliohm-level part. For serious low-ohm work, a meter with 0.01 Ω resolution or a four-wire method helps.",
        },
      ]}
      next={[
        {
          href: "/multimeters/why-does-my-multimeter-show-different-resistance-values-on-a-circuit-board",
          title: "Why Resistance Readings Differ on a Circuit Board",
          desc: "Steady but different values in circuit: parallel paths and junctions.",
        },
        {
          href: "/multimeters/unstable-multimeter-readings",
          title: "What Causes Unstable Multimeter Readings?",
          desc: "Fluctuating voltage readings, and how to tell a real signal from a meter problem.",
        },
        {
          href: "/multimeters/how-to-measure-resistance-in-ohms-with-a-digital-multimeter",
          title: "How to Measure Resistance With a Digital Multimeter",
          desc: "The basic ohms procedure, ranges and probe technique.",
        },
        {
          href: "/multimeters/best-multimeters-for-measuring-low-resistance",
          title: "Best Multimeters for Measuring Low Resistance",
          desc: "Meters with fine ohms resolution and relative zero.",
        },
      ]}
    >
      <Callout title="Safety: resistance is a power-off test">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Only measure resistance on parts and circuits that are switched off, unplugged or disconnected from their
            battery. Check with the voltage function first, using a meter rated for the circuit.
          </li>
          <li>
            Discharge capacitors before probing. A charged power-supply or motor-run capacitor can damage the
            meter&apos;s ohms input and deliver a painful or dangerous shock.
          </li>
          <li>
            Heating elements, thermal fuses and motor windings can be hot right after use. Let them cool, both for
            your fingers and so the reading isn&apos;t drifting as they do. For fixed household wiring, call a
            licensed electrician.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="settle-or-wander" className="text-xl font-semibold mb-3">Settling vs wandering</h2>
        <p className="text-muted leading-7 mb-4">
          The way the number moves tells you most of what you need. A reading that climbs steadily in one direction
          and then stops is settling: something in the measurement is changing in a predictable way, usually a
          capacitor charging or a part warming or cooling to a steady temperature. A reading that jumps around at
          random, or changes every time you shift your grip, is wandering: the measurement path itself is
          unstable, because of poor contact, your body, electrical noise or a live circuit.
        </p>
        <p className="text-muted leading-7">
          The ohms function works by driving a small, known test current through the part and measuring the
          voltage that appears. On high ranges that current is tiny, so anything that adds or steals even a little
          current, like a fingertip, a damp board or noise picked up by long leads, shifts the result. On low
          ranges the current is larger but the resistance being measured is so small that a few hundredths of an
          ohm of contact change matter. Both ends of the scale are where readings misbehave.
        </p>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Causes at a glance</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["High-ohm reading drops and wanders while you hold it", "Body resistance in parallel", "Let go of the metal and watch the value", "Hold the part by its body or use clip leads"],
            ["Reading jumps when you press or tilt a probe", "Poor contact, oxide or dirty tips", "Press harder; rotate the tip; try another spot", "Clean the contact point and the probe tips"],
            ["Steady climb, then it stops (sometimes at OL)", "Capacitor charging from the test current", "Reverse the probes; the climb repeats", "Discharge first, then wait for it to settle"],
            ["Value slides in one direction for a minute", "Part warming or cooling (thermistor, element, coil)", "Note the temperature; watch over time", "Let it reach room temperature; don't hold it"],
            ["Low-ohm value shifts by tenths of an ohm", "Lead and contact resistance", "Short the probes and read the leads", "Subtract lead resistance or use REL/zero"],
            ["Display flips between Ω and kΩ", "Value on an autorange boundary", "Watch the range annunciator", "Lock a manual range"],
            ["Megohm reading never steadies", "Noise pickup and leakage on high ranges", "Shorten or twist leads; move away from mains cords", "Use clips, keep hands clear, dry the board"],
            ["Nonsense values, negative numbers or OL", "Part still powered", "Measure DC and AC volts across it", "De-energize and discharge, then retest"],
          ]}
        />
      </section>

      <section>
        <h2 id="fingers" className="text-xl font-semibold mb-3">Why fingers matter on high ohms</h2>
        <p className="text-muted leading-7 mb-4">
          Pinching a resistor lead and the probe tip together with each hand feels natural, and it&apos;s the most
          common reason a high-value reading won&apos;t sit still. Your body is a conductor. Hand-to-hand resistance
          at the low voltages an ohmmeter uses varies enormously with skin moisture, grip area and pressure, from
          roughly a hundred kilohms to a few megohms. That path sits directly in parallel with the part, so the meter
          reports the combination, and it changes every time your grip does.
        </p>
        <Figure
          caption={
            <>
              Illustrative circuit: a 500 kΩ body path in parallel with a 1 MΩ resistor makes the meter read about
              333 kΩ. The body value is an assumed example, not a measurement.
            </>
          }
        >
          <FingerPathDiagram />
        </Figure>
        <p className="text-muted leading-7 my-4">
          The error depends on the ratio between the part and your body. Using the same illustrative 500 kΩ body
          path, the parallel formula (R × 500 ÷ (R + 500), in kΩ) gives the readings below. A 1 kΩ resistor reads
          998 Ω, an error you&apos;d never notice; a 1 MΩ resistor reads about 333 kΩ, a third of its real value.
        </p>
        <BarChart
          items={[
            { label: "1 kΩ resistor, held", value: 99.8, display: "998 Ω (99.8%)" },
            { label: "10 kΩ resistor, held", value: 98, display: "9.80 kΩ (98%)" },
            { label: "100 kΩ resistor, held", value: 83.3, display: "83.3 kΩ (83%)" },
            { label: "1 MΩ resistor, held", value: 33.3, display: "333 kΩ (33%)", highlight: true },
          ]}
        />
        <p className="text-muted leading-7 mt-4 text-sm">
          Calculated reading as a percentage of the true value, assuming an illustrative 500 kΩ body path. Real
          body resistance varies widely, so the effect can be larger or smaller.
        </p>
      </section>

      <KeyIdea title="Find out which way it moves">
        A reading that creeps and stops is the part or a capacitor settling: wait it out. A reading that jumps
        when you move is the connection: fix the contact before you trust any number.
      </KeyIdea>

      <section>
        <StepHeading n={1} id="hands-off">Take your hands off the metal</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Lay the part on a dry, non-conductive surface and touch the probes to its leads without touching any
          metal yourself, or clip one lead on with an alligator clip so only one hand is involved. One hand on one
          probe doesn&apos;t create a parallel path; two hands, one on each side, does. If the reading jumps up and
          holds steady the moment you let go, you&apos;ve found the cause.
        </p>
        <p className="text-muted leading-7">
          The same idea applies to anything that bridges the two probe points: a damp workbench, flux residue on a
          board, or a component lying on an anti-static mat, which is deliberately slightly conductive. Above a few
          hundred kilohms, measure on clean, dry plastic or wood.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="contact">Fix the probe contact</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A tip resting lightly on a tarnished lead, a solder joint coated in flux or a plated terminal makes a
          contact whose resistance changes as you breathe. Press firmly, twist the tip a few degrees to cut through
          the surface film, and try a fresh spot. Clean old component leads with fine abrasive or a fiberglass pen.
          Worn or bent probe tips and leads with a cracked conductor inside cause the same symptoms; if wiggling the
          lead near its plug moves the reading, the leads are the problem. See{" "}
          <Link href="/multimeters/how-to-tell-if-multimeter-test-leads-are-bad" className={link}>
            how to tell if multimeter test leads are bad
          </Link>
          .
        </p>
        <p className="text-muted leading-7">
          Contact matters most on low values, which is where step 5 picks up. On high values it matters less than
          leakage and noise, covered in the range section further down.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="capacitance">Wait out a charging capacitor</StepHeading>
        <p className="text-muted leading-7 mb-4">
          If the part is a capacitor, or a circuit with one across it, the meter&apos;s test current has to charge it
          before the reading means anything. The value starts low and climbs; for a capacitor on its own it keeps
          climbing to OL, and in a circuit it levels off at the resistance of whatever else is connected. Bigger
          capacitors and higher ohms ranges (which use smaller test currents) take longer, from a blink for a small
          ceramic to many seconds for a large electrolytic. Reverse the probes and the climb starts again, which
          is a quick way to confirm capacitance is the cause.
        </p>
        <p className="text-muted leading-7">
          Discharge the capacitor safely, measure, and wait until the reading stops moving. If you want to know
          whether the capacitor itself is good, measure it properly with{" "}
          <Link href="/multimeters/how-to-test-a-capacitor-with-a-multimeter" className={link}>
            how to test a capacitor with a multimeter
          </Link>
          . Climbing readings caused by capacitors on a populated board, along with the parallel-path errors that come
          with in-circuit testing, are covered in{" "}
          <Link
            href="/multimeters/why-does-my-multimeter-show-different-resistance-values-on-a-circuit-board"
            className={link}
          >
            why resistance values differ on a circuit board
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={4} id="temperature">Rule out temperature</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Some parts are supposed to change. An NTC thermistor&apos;s resistance falls as it warms, typically by
          roughly 3 to 5% per °C near room temperature. As an illustration, a 10 kΩ (at 25 °C) thermistor that
          drops about 4% per degree reads around 8.2 kΩ after warming 5 °C between your fingertips (10 × 0.96⁵).
          Photoresistors change with light, so a hand shadow moves the reading too. Metal elements and copper
          windings move the other way: copper&apos;s resistance rises by about 0.4% per °C, so a motor winding
          measured straight after running reads high and falls as it cools.
        </p>
        <p className="text-muted leading-7">
          Let the part sit at room temperature, handle it with clip leads, and compare the stable value with the
          maker&apos;s table at that temperature. Sensor-specific procedures are in{" "}
          <Link href="/multimeters/how-to-test-a-thermistor-with-a-multimeter" className={link}>
            how to test a thermistor
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/how-to-test-a-photoresistor-with-a-multimeter" className={link}>
            how to test a photoresistor
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={5} id="low-ohms">Zero the leads on low values</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Below about 10 Ω, the leads and contacts are a real fraction of the answer. A typical pair of test leads
          plus contacts adds something like 0.1 to 0.3 Ω, and that figure moves with probe pressure. Measuring a
          0.5 Ω shunt, a lead total of 0.2 Ω makes the meter show 0.7 Ω, a 40% error, and a change in pressure of
          0.05 Ω shifts the reading by another 10%. That&apos;s why low readings seem to drift as you hold the probes.
        </p>
        <p className="text-muted leading-7 mb-4">
          Short the tips firmly, note the value, and subtract it, or press REL (relative or zero) if the meter has
          it so the display starts from zero. Then use the same firm pressure on the part. The UNI-T UT61E+&apos;s
          manual specifically tells you to use REL for low-ohm readings. A meter&apos;s resolution sets the floor
          too: the Fluke 117&apos;s lowest range is 600.0 Ω with 0.1 Ω resolution, so a value near 0.2 Ω can only
          ever flick between a couple of digits.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 items-center">
          <Figure caption={<>Illustrative: a 0.5 Ω shunt measured without zeroing the leads.</>}>
            <MeterReadout value="0.70" unit="Ω" mode="leads included" />
          </Figure>
          <Figure caption={<>Illustrative: the same shunt after REL with the tips shorted.</>}>
            <MeterReadout value="0.50" unit="Ω" mode="REL on" />
          </Figure>
        </div>
      </section>

      <section>
        <StepHeading n={6} id="range">Stop the range hunting</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Autoranging meters switch range when a reading crosses a limit, and a value sitting right on that limit
          can bounce between two ranges. On the Fluke 117, for example, the two lowest ohms ranges are 600.0 Ω and
          6.000 kΩ, so a part near 600 Ω can alternate between something like 599.8 Ω and 0.601 kΩ, and each
          switch takes a moment to settle. Press RANGE to lock the higher range and the hunting stops.
        </p>
        <p className="text-muted leading-7">
          High ranges are noisy for a different reason. Measuring tens of megohms means a very small test current,
          so mains hum picked up by long, looped leads, and leakage across a dusty or humid board, are a big share
          of the signal. Fluke&apos;s own spec reflects this: the 117 is rated ±(0.9% + 1) up to 6 MΩ but ±(5% + 2)
          on its 40.00 MΩ range. Keep leads short and close together, stay clear of power cords, and expect the
          least stability at the top of the scale.
        </p>
      </section>

      <section>
        <StepHeading n={7} id="power">Confirm the part is unpowered</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Any voltage across the part, from a battery still connected, a charged capacitor or an induced voltage on
          a long cable, adds to or fights against the meter&apos;s test voltage. The result can be a value that
          drifts with the stray voltage, a negative number or OL. Switch to DC and then AC volts and measure across
          the same points. If anything more than a few millivolts shows, disconnect and discharge before measuring
          ohms again.
        </p>
        <p className="text-muted leading-7">
          If the voltage reading itself is what&apos;s jumping around, that is a separate problem with its own
          causes; see{" "}
          <Link href="/multimeters/unstable-multimeter-readings" className={link}>
            what causes unstable multimeter readings
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="how-much" className="text-xl font-semibold mb-3">How much movement is normal?</h2>
        <p className="text-muted leading-7 mb-4">
          Every digital meter has an accuracy spec written as a percentage of the reading plus a number of counts,
          and a reading wobbling inside that window is behaving. Working through the Fluke 117&apos;s published spec
          shows the size of the allowance on a few common values.
        </p>
        <DataTable
          head={["True value", "Fluke 117 range", "Spec", "Allowed spread (calculated)"]}
          rows={[
            ["100.0 Ω", "600.0 Ω", "±(0.9% + 1)", "±1.0 Ω (0.9 + 0.1)"],
            ["4.700 kΩ", "6.000 kΩ", "±(0.9% + 1)", "±0.043 kΩ (0.0423 + 0.001)"],
            ["470.0 kΩ", "600.0 kΩ", "±(0.9% + 1)", "±4.3 kΩ (4.23 + 0.1)"],
            ["10.00 MΩ", "40.00 MΩ", "±(5% + 2)", "±0.52 MΩ (0.5 + 0.02)"],
          ]}
          mono={[0, 3]}
        />
        <p className="text-muted leading-7 mt-4">
          A last digit that flicks by one or two counts is ordinary. A reading that moves by more than the allowed
          spread, keeps moving in one direction, or changes when you touch something is one of the causes above.
          For more on what a spec line means in practice, see{" "}
          <Link href="/multimeters/multimeter-accuracy-for-electronics-repair" className={link}>
            multimeter accuracy for electronics repair
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="meters" className="text-xl font-semibold mb-3">Meters that help</h2>
        <p className="text-muted leading-7 mb-4">
          A relative-zero key, fine low-ohm resolution and a bar graph make drifting readings easier to judge. These
          picks come from our verified multimeter list.
        </p>
        <ProductStrip
          title="Meters for steady resistance readings"
          items={[
            {
              name: "Fluke 87V",
              image: fluke87v.image,
              alt: "Fluke 87V True RMS industrial multimeter",
              href: "/multimeters/fluke-87v-review",
              note: "19,999-count high-resolution mode and a 32-segment analog bar graph for watching a value settle. Hands-on Tested.",
            },
            {
              name: "UNI-T UT61E+",
              image: ut61e.image,
              alt: "UNI-T UT61E+ 22,000-count True RMS multimeter",
              href: "/multimeters/best-multimeters-for-electronics-repair#uni-t-ut61e+",
              note: "REL mode to zero the leads and 0.01 Ω resolution on its 220.00 Ω range, at a budget price.",
            },
            {
              name: "EEVblog Brymen BM786",
              image: bm786.image,
              alt: "EEVblog Brymen BM786 60,000-count multimeter",
              href: "/multimeters/best-multimeters-for-electronics-repair#eevblog-brymen-bm786",
              note: "60,000 counts, 0.01 Ω resolution on its 600.00 Ω range and a relative zero key.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
