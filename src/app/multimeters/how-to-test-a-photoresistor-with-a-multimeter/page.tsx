import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  InfoCards,
  KeyIdea,
  MeterReadout,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to test a photoresistor with a multimeter: typical LDR dark and light resistance, the cover-and-light test, and checking an LDR divider in circuit.";

export const metadata = buildMetadata({
  title: "How to Test a Photoresistor With a Multimeter",
  description,
  path: "/multimeters/how-to-test-a-photoresistor-with-a-multimeter",
});

const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;

const link = "text-accent hover:underline";

/** LDR + fixed resistor voltage divider with the meter reading the output node. */
function LdrDividerDiagram() {
  return (
    <svg
      viewBox="0 0 340 230"
      className="w-full h-auto"
      role="img"
      aria-label="Voltage divider schematic: 5 volt supply, photoresistor on top, 10 kilohm resistor to ground, multimeter in DC volts measuring the middle node to ground"
    >
      <g className="stroke-foreground" strokeWidth="1.8" fill="none" strokeLinecap="round">
        {/* supply rail */}
        <path d="M120 24 V44" />
        {/* LDR body */}
        <circle cx="120" cy="72" r="20" className="fill-surface" />
        <path d="M108 64 H132 M108 72 H132 M108 80 H132" strokeWidth="1.2" />
        <path d="M120 92 V118" />
        {/* fixed resistor */}
        <rect x="110" y="128" width="20" height="44" rx="2" className="fill-surface" />
        <path d="M120 118 V128 M120 172 V196" />
        {/* ground */}
        <path d="M104 196 H136 M110 203 H130 M116 210 H124" />
        {/* tap to meter */}
        <path d="M120 118 H230 V128" className="stroke-accent" strokeDasharray="4 3" />
        <path d="M230 172 V196 H136" className="stroke-accent" strokeDasharray="4 3" />
      </g>
      {/* light arrows */}
      <g className="stroke-accent" strokeWidth="1.6" fill="none" strokeLinecap="round">
        <path d="M70 46 L94 62 M88 62 H94 V56" />
        <path d="M66 62 L90 78 M84 78 H90 V72" />
      </g>
      <circle cx="120" cy="118" r="3" className="fill-accent" />
      <rect x="200" y="128" width="60" height="44" rx="6" className="fill-surface stroke-accent" strokeWidth="2" />
      <text x="230" y="155" fontSize="13" fontWeight="700" textAnchor="middle" className="fill-accent">V DC</text>
      <g fontSize="10.5" className="fill-foreground">
        <text x="120" y="17" textAnchor="middle">+5 V</text>
        <text x="150" y="70">LDR</text>
        <text x="138" y="154">10 kΩ</text>
        <text x="236" y="112" textAnchor="middle">Vout (red probe)</text>
        <text x="270" y="212" textAnchor="middle">0 V (black probe)</text>
      </g>
      <text x="44" y="40" fontSize="10" className="fill-muted">light</text>
    </svg>
  );
}

export default function HowToTestAPhotoresistorWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Photoresistor With a Multimeter"
      description={description}
      published="2026-10-22"
      path="/multimeters/how-to-test-a-photoresistor-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a photoresistor with a multimeter, switch to resistance (Ω), hold one probe on each lead,
          then shade the sensor and shine light on it while you watch the display. A working LDR reads high
          in the dark, typically hundreds of kilohms up to several megohms, and falls to a few kilohms or
          less under bright light. A value that never moves, OL in good light, or near 0 Ω in darkness means
          the cell or its wiring has failed. Below are typical ranges, the cover-and-light test and an
          in-circuit check you can do with the power on.
        </>
      }
      aside={{
        image: astro.image,
        alt: "AstroAI DM6000AR True RMS digital multimeter, front view",
        caption: (
          <>
            The AstroAI DM6000AR (True RMS, 6,000-count, auto and manual ranging) is the electronics-hobbyist
            pick in our roundup; auto-ranging helps when an LDR swings from megohms to kilohms. See our{" "}
            <Link href="/multimeters/astroai-dm6000ar-review" className={link}>
              DM6000AR review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-an-ldr-works", label: "How a photoresistor works" },
        { id: "typical-resistance", label: "Typical dark and light resistance" },
        { id: "set-up-the-meter", label: "Set up the meter" },
        { id: "cover-and-light-test", label: "The cover-and-light test" },
        { id: "in-circuit-divider-check", label: "In-circuit divider check" },
        { id: "reading-the-result", label: "Reading the result" },
        { id: "common-mistakes", label: "Common mistakes" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "Does a photoresistor have polarity?",
          a: "No. A cadmium sulfide photoresistor is a plain resistive element, so it reads the same whichever way round the probes go and can be fitted either way in a circuit. If swapping the probes changes the reading noticeably, you are probably looking at a photodiode or phototransistor instead, and those need diode mode or a powered test.",
        },
        {
          q: "What resistance should a photoresistor have in the dark?",
          a: "Most small CdS cells used in hobby kits are specified at 1 MΩ or more in darkness, measured after they have been kept dark for several seconds. Some types reach tens of megohms. Check the datasheet for your part number, because dark resistance varies widely between series and even between cells from the same batch.",
        },
        {
          q: "Why does my LDR reading climb slowly after I cover it?",
          a: "That is normal. CdS cells react quickly when light arrives but recover slowly when it is removed, so resistance keeps rising for several seconds after you cover the sensor. Datasheets usually quote dark resistance after a set delay, often 10 seconds. Wait that long before judging the dark reading.",
        },
        {
          q: "Can I test a photoresistor without removing it from the board?",
          a: "Yes, with care. With the power off, a resistance reading taken in circuit includes any parallel paths, so it can read lower than the part alone, especially in darkness. With the power on, measure the DC voltage at the divider node instead and check that it swings as the light changes. That confirms both the LDR and its wiring.",
        },
        {
          q: "Is a photoresistor the same as a photodiode?",
          a: "No. A photoresistor simply changes resistance with light and has no junction, while a photodiode is a semiconductor junction that conducts in one direction and generates a small current when lit. Photodiodes respond far faster. On a multimeter, a photodiode shows a forward drop in diode mode; a photoresistor does not.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-thermistor-with-a-multimeter",
          title: "How to Test a Thermistor With a Multimeter",
          desc: "The same resistance-sensor approach applied to temperature: NTC vs PTC and the warming test.",
        },
        {
          href: "/multimeters/how-to-measure-voltage-across-a-resistor",
          title: "How to Measure Voltage Across a Resistor",
          desc: "Probe placement and polarity for the powered divider check covered on this page.",
        },
      ]}
    >
      <Callout title="Before you probe">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Resistance readings need an unpowered circuit. Switch off or unplug the device, or desolder one leg,
            before using the Ω range.
          </li>
          <li>
            Outdoor dusk-to-dawn sensors and some lamp controls run from mains voltage. Isolate the supply
            before handling them, and only do the powered voltage check on low-voltage circuits.
          </li>
          <li>
            Cadmium sulfide is toxic. Don&apos;t crush, sand or burn old cells; dispose of them as electronic
            waste.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="how-an-ldr-works" className="text-xl font-semibold mb-3">How a photoresistor (LDR) works</h2>
        <p className="text-muted leading-7 mb-4">
          A photoresistor, also called an LDR or CdS cell, is a ceramic disc coated with a zig-zag track of
          cadmium sulfide between two electrodes. In darkness the material has very few free charge carriers,
          so resistance is high. Light frees carriers and the resistance falls, steeply at first and then
          more gradually as brightness keeps increasing. It has no junction and no polarity.
        </p>
        <InfoCards
          items={[
            { label: "Dark resistance", desc: "The reading after the cell has been kept fully dark for a set time, often 10 seconds. Usually quoted as a minimum." },
            { label: "Light resistance", desc: "The reading at a stated light level, commonly 10 lux. Usually quoted as a range, such as 8 to 20 kΩ." },
            { label: "Recovery", desc: "How fast resistance climbs back after the light goes. CdS cells are slow here, taking seconds rather than milliseconds." },
          ]}
        />
      </section>

      <section>
        <h2 id="typical-resistance" className="text-xl font-semibold mb-3">Typical photoresistor resistance in dark and light</h2>
        <p className="text-muted leading-7 mb-4">
          Exact values depend on the series, so the datasheet always wins. As a rough guide for the common
          5 mm hobby cells, readings tend to land in these bands:
        </p>
        <Figure
          caption={
            <>
              Typical readings for a small 5 mm CdS cell, plotted on a log scale because the range spans more
              than three decades. These are representative values, not limits for any particular part.
            </>
          }
        >
          <BarChart
            log
            items={[
              { label: "Fully dark (10 s)", value: 2000, display: "≈ 1–10 MΩ", highlight: true },
              { label: "Dim room", value: 80, display: "≈ 50–200 kΩ" },
              { label: "Lit room (~10 lux)", value: 12, display: "≈ 5–20 kΩ" },
              { label: "Desk lamp close up", value: 1.5, display: "≈ 1–3 kΩ" },
              { label: "Direct sunlight", value: 0.3, display: "≈ 100 Ω–1 kΩ" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The ratio between dark and bright readings matters more than either number. A healthy cell usually
          changes by a factor of a hundred or more between a covered and a well-lit state.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="set-up-the-meter">Set up the meter</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Plug the black lead into COM and the red lead into the Ω jack, then select resistance. An
          auto-ranging meter follows the reading as it swings. On a manual meter, start on the 2 MΩ or 20 MΩ
          range for the dark reading and step down for the lit reading. If you are new to the resistance
          function, our guide on{" "}
          <Link href="/multimeters/how-to-use-a-multimeter" className={link}>
            how to use a multimeter
          </Link>{" "}
          covers the jacks and dial positions.
        </p>
        <p className="text-muted leading-7">
          Small crocodile clips or a breadboard make this test far easier than holding probes by hand. At
          megohm levels your skin is a parallel resistor too, so fingers across both leads can pull a dark
          reading well below its true value.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="cover-and-light-test">The cover-and-light test</StepHeading>
        <ol className="space-y-2 list-decimal pl-5 text-muted leading-7 mb-4">
          <li>Connect the probes across the two leads and note the reading in normal room light.</li>
          <li>
            Cover the sensing face completely with a fingertip, black tape or an upturned bottle cap. Wait
            about 10 seconds for the slow dark recovery, then note the reading.
          </li>
          <li>Uncover it and shine a phone torch or desk lamp straight at it from a few centimetres away.</li>
          <li>Repeat two or three times. The readings should repeat closely each cycle.</li>
        </ol>
        <Figure
          caption={
            <>
              Typical results for a small CdS cell: 1.62 MΩ after 10 seconds covered (left) and 1.84 kΩ under
              a torch held close (right). The direction and size of the swing tell you the cell works.
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="1.620" unit="MΩ" mode="Ω  covered, 10 s" />
            <MeterReadout value="1.842" unit="kΩ" mode="Ω  torch close" />
          </div>
        </Figure>
        <KeyIdea title="Watch the transition, not just the end points">
          Move your hand slowly over the cell. The reading should rise and fall smoothly with the shadow. A
          display that jumps between OL and a normal value as you move the leads points to a cracked solder
          joint or broken lead rather than a bad sensor.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={3} id="in-circuit-divider-check">How to test a photoresistor in a circuit</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Most circuits use the LDR as one half of a voltage divider feeding a comparator, transistor or
          microcontroller pin. With a low-voltage supply running, set the meter to DC volts, put the black
          probe on ground and the red probe on the node between the LDR and the fixed resistor. Then cover
          and light the sensor and watch the voltage move.
        </p>
        <Figure
          caption={
            <>
              A typical light-sensing divider. With the LDR on top, Vout rises as light increases; swap the two
              parts and it falls instead. Either way the voltage must move when the light changes.
            </>
          }
        >
          <LdrDividerDiagram />
        </Figure>
        <p className="text-muted leading-7 my-4">
          Vout equals the supply times the fixed resistor divided by the sum of both resistances. For the 5 V,
          10 kΩ circuit above, the expected values work out like this:
        </p>
        <DataTable
          head={["Light level", "LDR resistance (typical)", "Vout (calculated)"]}
          rows={[
            ["Covered", "1 MΩ", "≈ 0.05 V"],
            ["Dim", "50 kΩ", "≈ 0.83 V"],
            ["Lit room", "10 kΩ", "2.50 V"],
            ["Bright lamp", "1 kΩ", "≈ 4.55 V"],
          ]}
          mono={[1, 2]}
        />
        <p className="text-muted leading-7 mt-4">
          If the node sits at 0 V or at the full supply whatever you do, measure the supply first, then the
          LDR and fixed resistor separately with the power off. The method for each probe placement is the
          same as in{" "}
          <Link href="/multimeters/how-to-measure-voltage-across-a-resistor" className={link}>
            measuring voltage across a resistor
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="reading-the-result" className="text-xl font-semibold mb-3">Reading the result: good or bad photoresistor</h2>
        <DataTable
          head={["What you see", "Likely meaning"]}
          rows={[
            ["High when covered, low when lit, repeatable", "Good cell"],
            ["OL in every light level", "Open element or broken lead; check the joints"],
            ["Near 0 Ω even when covered", "Shorted cell, or a short across it on the board"],
            ["Changes only a little between dark and bright", "Degraded or heat-damaged cell, or a fogged window"],
            ["Drifts or jumps while the light is steady", "Poor contact, moisture or a cracked body"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Seeing OL on a covered cell is not automatically a fault: some cells exceed a meter&apos;s top range in
          full darkness. Our explainer on{" "}
          <Link href="/multimeters/what-does-ol-mean-on-a-multimeter" className={link}>
            what OL means on a multimeter
          </Link>{" "}
          explains why. The key test is whether the reading drops into range once light reaches it.
        </p>
      </section>

      <section>
        <h2 id="common-mistakes" className="text-xl font-semibold mb-3">Common photoresistor testing mistakes</h2>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>Reading the dark value instantly instead of waiting for the slow recovery.</li>
          <li>Letting light leak in around a fingertip, which keeps the dark reading low.</li>
          <li>Touching both metal probe tips, adding body resistance in parallel with the cell.</li>
          <li>Measuring resistance with the circuit powered, which gives nonsense values.</li>
          <li>Judging a cell against another part number&apos;s datasheet; ranges vary a lot between series.</li>
        </ul>
        <p className="text-muted leading-7 mt-4">
          If high-megohm readings wander even with a steady light, see{" "}
          <Link href="/multimeters/unstable-multimeter-readings" className={link}>
            why multimeter readings are unstable
          </Link>
          ; long leads and hand contact are frequent culprits at those values.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter works for LDR testing</h2>
        <p className="text-muted leading-7">
          Any digital meter with a resistance range that reaches a few megohms can run the cover-and-light
          test, and a DC volts range covers the in-circuit check. Auto-ranging is the main convenience, since
          the reading crosses several ranges in a single pass of your hand. Precision barely matters here
          because the swing is so large; for jobs where it does, see{" "}
          <Link href="/multimeters/multimeter-accuracy-for-electronics-repair" className={link}>
            multimeter accuracy for electronics repair
          </Link>
          , or compare options in our{" "}
          <Link href="/multimeters/best-multimeters" className={link}>
            best multimeters
          </Link>{" "}
          roundup.
        </p>
      </section>
    </HowToShell>
  );
}
