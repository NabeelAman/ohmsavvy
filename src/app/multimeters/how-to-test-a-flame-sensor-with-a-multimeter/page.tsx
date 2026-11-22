import Link from "@/components/AppLink";
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

const all = getAllPicks("multimeters");
const fluke116 = all.find((p) => p.name === "Fluke 116")!;
const cl445 = all.find((p) => p.name === "Klein Tools CL445")!;
const fluke87 = all.find((p) => p.name === "Fluke 87V")!;

const description =
  "How to test a furnace flame sensor with a multimeter: read flame current in DC microamps, what a good reading is, and how to fix a weak or zero signal.";

export const metadata = buildMetadata({
  title: "How to Test a Flame Sensor With a Multimeter",
  description,
  path: "/multimeters/how-to-test-a-flame-sensor-with-a-multimeter",
  image: fluke116.image,
});

const link = "text-accent hover:underline";

/** Flame rectification loop: board -> sensor wire -> meter in series -> rod -> flame -> burner ground -> board. */
function FlameCircuitDiagram() {
  return (
    <svg
      viewBox="0 0 360 210"
      className="w-full h-auto"
      role="img"
      aria-label="Flame rectification circuit. The furnace control board sends AC voltage up the flame sensor wire. A multimeter set to DC microamps is wired in series between the wire and the sensor terminal. The current crosses the flame from the sensor rod to the grounded burner and returns to the board through the chassis ground."
    >
      {/* control board */}
      <rect x="14" y="70" width="78" height="62" rx="6" className="fill-surface stroke-foreground" strokeWidth="1.8" />
      <text x="53" y="96" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">Control</text>
      <text x="53" y="110" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">board</text>
      <text x="53" y="124" fontSize="8" textAnchor="middle" className="fill-muted">AC out on FS</text>
      {/* wire to meter */}
      <path d="M92 86 H140" className="stroke-foreground" strokeWidth="1.6" fill="none" />
      <text x="96" y="80" fontSize="8" className="fill-muted">sensor wire</text>
      {/* meter */}
      <circle cx="160" cy="86" r="20" className="fill-surface stroke-accent" strokeWidth="2" />
      <text x="160" y="90" fontSize="11" fontWeight="700" textAnchor="middle" className="fill-accent">µA</text>
      <text x="160" y="122" fontSize="8" textAnchor="middle" className="fill-muted">meter in series</text>
      <path d="M180 86 H232" className="stroke-foreground" strokeWidth="1.6" fill="none" />
      {/* rod */}
      <rect x="232" y="80" width="18" height="12" className="fill-muted" />
      <text x="241" y="74" fontSize="8" textAnchor="middle" className="fill-muted">ceramic</text>
      <path d="M250 86 H300" className="stroke-foreground" strokeWidth="3" fill="none" />
      <text x="276" y="78" fontSize="8" textAnchor="middle" className="fill-muted">rod</text>
      {/* flame */}
      <path d="M286 150 C276 128 292 112 290 92 C302 108 312 126 300 150 Z" className="fill-accent" opacity="0.35" />
      <path d="M294 150 C290 136 298 126 297 112 C304 124 306 138 302 150 Z" className="fill-accent" opacity="0.6" />
      {/* burner */}
      <rect x="262" y="150" width="76" height="14" rx="3" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <text x="300" y="181" fontSize="8" textAnchor="middle" className="fill-muted">grounded burner</text>
      {/* ground return */}
      <path d="M262 157 H53 V132" className="stroke-foreground" strokeWidth="1.4" fill="none" strokeDasharray="5 3" />
      <text x="150" y="152" fontSize="8" textAnchor="middle" className="fill-muted">return through chassis ground</text>
      <text x="14" y="24" fontSize="9" className="fill-muted">The flame conducts and rectifies the AC,</text>
      <text x="14" y="37" fontSize="9" className="fill-muted">so a small DC current flows only while it burns.</text>
    </svg>
  );
}

export default function HowToTestAFlameSensorWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Flame Sensor With a Multimeter"
      description={description}
      published="2026-11-22"
      path="/multimeters/how-to-test-a-flame-sensor-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a furnace flame sensor with a multimeter, set the meter to DC microamps, wire it in series between the
          flame sensor wire and the sensor terminal, and read the current while the burners are lit. A clean sensor in a
          good flame usually reads a few microamps; a reading near zero, or one that sits below the control
          board&apos;s minimum, explains a furnace that lights for a few seconds and then shuts off. A resistance check
          can&apos;t prove the sensor works, because the signal only exists while the flame is burning. This guide shows
          the series hookup, the readings that matter, and what to fix when the number is low.
        </>
      }
      aside={{
        image: fluke116.image,
        alt: "Fluke 116 HVAC multimeter with a microamp range for flame sensor testing",
        caption: (
          <>
            The Fluke 116 has a 600.0 µA range with 0.1 µA resolution, the resolution you need to read flame current.
            Meters without a µA range can&apos;t do this test. See our{" "}
            <Link href="/multimeters/best-multimeter-for-hvac-technicians" className={link}>
              HVAC multimeter guide
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-it-works", label: "How a flame sensor works" },
        { id: "causes", label: "Symptoms and likely causes" },
        { id: "setup", label: "1. Pick the range and find the sensor" },
        { id: "series", label: "2. Wire the meter in series" },
        { id: "run", label: "3. Run a heat cycle and read" },
        { id: "judge", label: "4. Judge the reading" },
        { id: "clean", label: "5. Clean and retest" },
        { id: "ground", label: "6. Check ground and the insulator" },
        { id: "readings", label: "Typical flame current readings" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "What should a flame sensor read in microamps?",
          a: "Most residential furnaces show a few microamps of DC flame current from a clean sensor in a steady flame, often somewhere between about 2 and 6 µA, though some systems run higher. The figure that matters is your control board's minimum, printed in the furnace manual or on the board label. A reading at or just above that minimum is marginal and usually leads to random shutdowns.",
        },
        {
          q: "Can I test a flame sensor with a multimeter resistance setting?",
          a: "Only partly. Ohms can show that the rod and terminal are one continuous piece of metal and that the ceramic insulator isn't leaking to the bracket, which should read open. It can't show whether the sensor produces enough current in a real flame, because the signal depends on flame contact, carbon and oxide on the rod, and burner ground. The microamp test is the real check.",
        },
        {
          q: "Why does my furnace light then shut off after a few seconds?",
          a: "The control board watches the flame current during a short trial period after ignition. If it doesn't see enough current, it closes the gas valve, usually within a few seconds, and tries again a set number of times before locking out. A dirty or poorly grounded flame sensor is the most common cause, but a weak flame, low gas pressure or reversed line polarity on some boards can do the same.",
        },
        {
          q: "How do I clean a furnace flame sensor?",
          a: "Turn off power and gas, remove the single screw holding the sensor, and rub the metal rod lightly with fine steel wool or a fine abrasive pad until the dull coating is gone. Avoid coarse sandpaper, which scratches the rod and can leave grit. Don't touch the ceramic with oily fingers. Refit it so the rod sits in the flame, then retest the microamps.",
        },
        {
          q: "Why does my meter show a negative microamp reading?",
          a: "The current only flows one way through a rectifying flame, so the meter's sign simply depends on which lead is on the wire side and which is on the sensor side. A steady negative number of the right size is a valid reading; swap the leads if you prefer a positive value. A reading that jumps between positive and negative, or sits at zero, points to a bad connection.",
        },
        {
          q: "How long does a furnace flame sensor last?",
          a: "There is no fixed life. Many sensors work for years with an occasional cleaning, while others coat up quickly where combustion air is dusty or contains chemicals. Replace the sensor if the ceramic is cracked, the rod is pitted, bent or badly eroded, or the microamps stay low after cleaning with the ground and flame checked. Use the part number the furnace maker specifies.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-measure-microamps-with-a-multimeter",
          title: "How to Measure Microamps With a Multimeter",
          desc: "The µA range, burden voltage and series wiring in more depth, beyond furnace work.",
        },
        {
          href: "/multimeters/how-to-check-a-thermocouple-with-a-multimeter",
          title: "How to Check a Thermocouple With a Multimeter",
          desc: "The millivolt test for standing-pilot appliances, which prove flame a different way.",
        },
      ]}
    >
      <Callout title="Gas, 120 V and hot metal">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            If you smell gas, don&apos;t touch switches or the furnace. Leave the building and call your gas utility or
            911 from outside.
          </li>
          <li>
            The furnace has 120 V AC on the board, blower and inducer, and the flame sensor wire carries an AC voltage
            from the control. Switch the furnace off at its service switch before connecting or removing leads.
          </li>
          <li>
            The burner box and sensor bracket get hot enough to burn skin within seconds of firing. Route the meter leads
            away from the flame and the blower, and keep hands clear while it runs.
          </li>
          <li>
            Don&apos;t jumper safety switches or hold the gas valve open to keep the burners lit. If the furnace keeps
            locking out after these checks, call a licensed HVAC technician.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="how-it-works" className="text-xl font-semibold mb-3">
          How a furnace flame sensor works
        </h2>
        <p className="text-muted leading-7 mb-4">
          A flame sensor is a bare metal rod held in a ceramic insulator and positioned so the burner flame washes over
          its tip. The control board puts an AC voltage on the rod. With no flame, the rod is insulated from everything
          and no current flows. When the gas lights, the flame is full of ions and conducts, and because the grounded
          burner presents a much larger surface to the flame than the thin rod does, it conducts better in one direction
          than the other. The result is a tiny DC current, measured in millionths of an amp, that the board reads as
          proof of flame. This is called flame rectification.
        </p>
        <p className="text-muted leading-7">
          The scale explains why the sensor fails so easily. A few microamps is a few millionths of an amp, so a thin
          layer of oxide or silicate on the rod, a loose ground screw, or a flame that only touches part of the rod can
          cut the signal by more than half. The board doesn&apos;t care that the flame looks fine to you; it sees only
          the current.
        </p>
        <Figure caption={<>How the flame current flows, and where the meter goes: in series with the sensor wire, so all of the flame current passes through it.</>}>
          <FlameCircuitDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and likely causes</h2>
        <p className="text-muted leading-7 mb-4">
          Most people test the flame sensor because the furnace short-cycles: the inducer starts, the igniter glows, the
          burners light, and then the gas shuts off a few seconds later. Several faults look the same from the outside,
          so match yours below before buying parts.
        </p>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Lights, shuts off after a few seconds", "Coated flame sensor rod", "Microamps low, rise after cleaning (step 5)", "Clean the rod; replace if pitted"],
            ["Low reading even after cleaning", "Poor burner or chassis ground", "Ohms from burner to board ground (step 6)", "Clean and tighten ground screws"],
            ["Zero reading with burners lit", "Broken wire, loose terminal, cracked insulator", "Continuity of the wire; ohms rod to bracket", "Replace wire or sensor"],
            ["Reading jumps around", "Rod at edge of flame, lazy flame", "Watch the flame on the rod while reading", "Reposition rod; tech for gas pressure"],
            ["Board flashes flame or polarity code", "Reversed line polarity or weak neutral", "Board fault code chart; outlet tester or ohms", "Electrician or HVAC tech"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="setup">Pick the microamp range and find the sensor</StepHeading>
        <p className="text-muted leading-7">
          Your meter needs a DC microamp range, ideally with 0.1 µA resolution. A milliamp range is too coarse: 3 µA is
          0.003 mA, which most meters display as 0.00. Plug the red lead into the µA (or µA/mA) jack, not the 10 A jack,
          and set the dial to DC µA. Then open the burner access panel. The flame sensor is the single rod with one wire,
          usually at the far end of the burner row from the igniter, held to the burner box by one screw. On many
          furnaces it is on the last burner so that it proves the flame carried across all of them.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="series">Wire the meter in series</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With power off, pull the wire off the sensor terminal. Clip one meter lead to the sensor terminal and the other
          to the loose wire, so the current now has to pass through the meter on its way to the rod. Alligator clips
          make this much easier than handheld probes, because you&apos;ll be reading the meter with the furnace running.
          Make sure the clips and bare wire can&apos;t touch the sheet metal, or the signal will short to ground and read
          zero.
        </p>
        <p className="text-muted leading-7">
          Some techs instead read across a test point or use a meter with a built-in flame-current adapter. Use the
          method in your furnace service manual if it specifies one. The series method above works on most hot surface
          and spark ignition furnaces that use a separate flame rod.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="run">Run a heat cycle and read the meter</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Restore power, close the blower door switch if you must (or hold it closed safely per the manual), and call for
          heat at the thermostat. Watch the meter as the burners light. The reading should jump from zero to a steady
          value within a second or two and stay there. Note the number in the first few seconds, before the board would
          normally drop out, and again after a minute if the furnace keeps running.
        </p>
        <Figure caption={<>Illustrative reading from a clean sensor in a steady flame, meter in series on the DC µA range.</>}>
          <MeterReadout value="3.8" unit="µA" mode="DC µA  in series" />
        </Figure>
      </section>

      <section>
        <StepHeading n={4} id="judge">Judge the reading against the board&apos;s minimum</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Find the minimum flame current in the furnace installation manual or on the control board label. Many
          residential controls need somewhere around 0.5 to 1 µA just to hold the flame, and they behave much more
          reliably with a comfortable margin above that. Work it out as a ratio: if the board needs 1.0 µA and you read
          1.2 µA, you have only 20% margin, and a little more oxide or a gust in the burner box will drop you out. At
          4.0 µA the margin is 300%, and the sensor isn&apos;t your problem.
        </p>
        <KeyIdea title="Margin, not just a number">
          A flame sensor rarely fails all at once. The current slides down as the rod coats, and the furnace starts
          short-cycling when it falls below the board&apos;s threshold. Compare your reading with that threshold and
          with the reading after cleaning.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={5} id="clean">Clean the rod and retest</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Turn off power and gas supply to the furnace, remove the sensor screw and slide the sensor out. A rod that looks
          dull, white or brown has an insulating coating. Polish only the metal rod with fine steel wool or a fine
          non-woven abrasive pad until it is uniformly bright, wipe it, and refit it in exactly the same position. Then
          repeat steps 2 and 3. The chart shows the kind of change cleaning makes on a coated rod.
        </p>
        <Figure caption={<>Illustrative flame current readings on one furnace whose control needs about 1 µA. Cleaning the coated rod restores a wide margin; a loose ground cuts it again.</>}>
          <BarChart
            items={[
              { label: "Coated rod", value: 0.7, display: "0.7 µA", highlight: true },
              { label: "After cleaning", value: 3.6, display: "3.6 µA" },
              { label: "Clean, loose ground", value: 1.1, display: "1.1 µA", highlight: true },
              { label: "Clean, ground fixed", value: 3.8, display: "3.8 µA" },
              { label: "Board minimum", value: 1.0, display: "about 1 µA" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={6} id="ground">Check the ground path and the insulator</StepHeading>
        <p className="text-muted leading-7 mb-4">
          If the reading stays low after cleaning, look at the return path. The flame current comes back through the
          burner, the burner box, the furnace cabinet and the ground wire to the board. With power off, set the meter to
          ohms and measure from the burner to the board&apos;s ground terminal. It should read close to zero, well under
          a couple of ohms. A higher reading usually means a rusty mounting screw or a loose green wire; clean and
          tighten it. If the ground is fine, also confirm the furnace&apos;s 120 V supply has correct polarity, since
          many boards need hot and neutral the right way round to sense flame.
        </p>
        <p className="text-muted leading-7">
          Next measure from the sensor terminal to the metal bracket with the sensor out. It should read open (OL); any
          resistance at all means a crack or carbon track across the ceramic, which leaks the signal away. A sensor with
          a cracked insulator, or one that still reads low with good flame, a clean rod and a solid ground, needs
          replacing with the furnace maker&apos;s part. Flame problems that remain after that, such as a yellow, lifting
          or lazy flame, are for a licensed HVAC technician with a manometer.
        </p>
      </section>

      <section>
        <h2 id="readings" className="text-xl font-semibold mb-3">
          Typical flame sensor current readings
        </h2>
        <p className="text-muted leading-7 mb-4">
          General guidance for residential gas furnaces that use a separate flame rod. Your control&apos;s published
          minimum overrides this table, and some systems run higher currents than shown.
        </p>
        <DataTable
          head={["Reading (DC)", "What it usually means", "Action"]}
          rows={[
            ["0 µA", "Open circuit, shorted lead, rod not in flame", "Check clips, wire and insulator"],
            ["Below the board minimum", "Board can't prove flame", "Clean rod, check ground, retest"],
            ["Within about 1 µA of the minimum", "Marginal, random lockouts likely", "Clean, then look for a deeper cause"],
            ["About 2 to 6 µA", "Typical healthy range on many furnaces", "Sensor is not the problem"],
            ["Unsteady, swinging", "Flame lifting or rod at flame edge", "Reposition rod; tech for combustion"],
          ]}
          mono={[0]}
        />
        <p className="text-muted leading-7 mt-4">
          Older standing-pilot furnaces and water heaters don&apos;t use a flame rod; they prove the pilot with a
          thermocouple that generates millivolts. That test is different and is covered in{" "}
          <Link href="/multimeters/how-to-check-a-thermocouple-with-a-multimeter" className={link}>
            how to check a thermocouple with a multimeter
          </Link>
          . If you need the background on series current measurement and burden voltage, see{" "}
          <Link href="/multimeters/how-to-measure-microamps-with-a-multimeter" className={link}>
            how to measure microamps with a multimeter
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter to use for flame sensor testing</h2>
        <p className="text-muted leading-7 mb-6">
          The deciding spec is a DC microamp range with 0.1 µA resolution. Many general-purpose meters skip it, which is
          why HVAC meters list it prominently. All three below have it, and a set of alligator-clip leads makes the
          series hookup far easier. For the wider HVAC kit, our{" "}
          <Link href="/multimeters/best-multimeter-for-hvac-technicians" className={link}>
            best multimeters for HVAC technicians
          </Link>{" "}
          guide compares more options.
        </p>
        <ProductStrip
          title="Meters with a microamp range for flame sensors"
          items={[
            {
              name: "Fluke 116",
              image: fluke116.image,
              alt: "Fluke 116 HVAC digital multimeter",
              href: "/multimeters/best-multimeter-for-hvac-technicians",
              note: "600.0 µA AC/DC range at 0.1 µA resolution, Type K temperature and capacitance. No mA or amp ranges.",
            },
            {
              name: "Klein Tools CL445",
              image: cl445.image,
              alt: "Klein Tools CL445 HVAC clamp meter",
              href: "/multimeters/best-multimeter-for-hvac-technicians",
              note: "HVAC clamp meter that reads 600.0 µA DC through the leads, plus 600 A AC clamp current with inrush.",
            },
            {
              name: "Fluke 87V",
              image: fluke87.image,
              alt: "Fluke 87V True RMS industrial multimeter",
              href: "/multimeters/fluke-87v-review",
              note: "Hands-on tested. Industrial meter with a µA range, temperature and an analog bar graph for unsteady signals.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
