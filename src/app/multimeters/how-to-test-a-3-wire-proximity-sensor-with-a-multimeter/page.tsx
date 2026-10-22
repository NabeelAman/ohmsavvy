import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  HowToShell,
  InfoCards,
  KeyIdea,
  MeterReadout,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to test a 3 wire proximity sensor with a multimeter: brown, blue and black wires, PNP vs NPN outputs, powering it at 24 V DC and reading the output.";

export const metadata = buildMetadata({
  title: "How to Test a 3 Wire Proximity Sensor",
  description,
  path: "/multimeters/how-to-test-a-3-wire-proximity-sensor-with-a-multimeter",
});

const fluke117 = picks.find((p) => p.name === "Fluke 117")!;
const klein = picks.find((p) => p.name === "Klein Tools MM400")!;

const link = "text-accent hover:underline";

/** Bench wiring for PNP (load to 0 V) and NPN (pull-up to +V) sensors, meter from black to blue. */
function ProxWiringDiagram() {
  return (
    <svg
      viewBox="0 0 340 236"
      className="w-full h-auto"
      role="img"
      aria-label="Two bench wiring diagrams. Left, a PNP sensor: brown to plus 24 volts, blue to 0 volts, and a load resistor from the black output down to 0 volts. Right, an NPN sensor: brown and blue the same, with a pull-up resistor from the black output up to plus 24 volts. In both, the multimeter on DC volts reads between the black wire and the blue wire."
    >
      {[0, 172].map((dx, k) => (
        <g key={dx} transform={`translate(${dx} 0)`}>
          {/* rails */}
          <path d="M10 28 H158" className="stroke-foreground" strokeWidth="1.8" />
          <path d="M10 196 H158" className="stroke-foreground" strokeWidth="1.8" />
          {/* sensor body */}
          <rect x="18" y="80" width="56" height="64" rx="8" className="fill-surface stroke-border" strokeWidth="1.5" />
          <text x="46" y="108" fontSize="11" fontWeight="700" textAnchor="middle" className="fill-foreground">{k === 0 ? "PNP" : "NPN"}</text>
          <text x="46" y="123" fontSize="9" textAnchor="middle" className="fill-muted">sensor</text>
          {/* brown to +V, blue to 0 V */}
          <path d="M34 80 V28" className="stroke-foreground" strokeWidth="1.8" />
          <path d="M34 144 V196" className="stroke-foreground" strokeWidth="1.8" />
          <text x="38" y="58" fontSize="9" className="fill-muted">brown</text>
          <text x="38" y="176" fontSize="9" className="fill-muted">blue</text>
          {/* black output */}
          <path d="M74 112 H104" className="stroke-foreground" strokeWidth="1.8" />
          <text x="80" y="106" fontSize="9" className="fill-muted">black</text>
          {/* resistor: to 0 V for PNP, to +V for NPN */}
          {k === 0 ? (
            <>
              <path d="M104 112 V132 M104 172 V196" className="stroke-foreground" strokeWidth="1.8" />
              <rect x="96" y="132" width="16" height="40" className="fill-surface stroke-foreground" strokeWidth="1.5" />
              <text x="92" y="156" fontSize="9" textAnchor="end" className="fill-foreground">load</text>
              <text x="92" y="167" fontSize="9" textAnchor="end" className="fill-muted">to 0 V</text>
            </>
          ) : (
            <>
              <path d="M104 112 V92 M104 52 V28" className="stroke-foreground" strokeWidth="1.8" />
              <rect x="96" y="52" width="16" height="40" className="fill-surface stroke-foreground" strokeWidth="1.5" />
              <text x="92" y="66" fontSize="9" textAnchor="end" className="fill-foreground">pull-up</text>
              <text x="92" y="77" fontSize="9" textAnchor="end" className="fill-muted">to +V</text>
            </>
          )}
          {/* meter from black node to 0 V */}
          <path d="M104 112 H140 V134 M140 166 V196" className="stroke-accent" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
          <circle cx="140" cy="150" r="14" className="fill-surface stroke-accent" strokeWidth="2" />
          <text x="140" y="154" fontSize="11" fontWeight="700" textAnchor="middle" className="fill-accent">V</text>
        </g>
      ))}
      <text x="12" y="20" fontSize="10" className="fill-foreground">+24 V DC</text>
      <text x="12" y="214" fontSize="10" className="fill-foreground">0 V</text>
      <text x="170" y="230" fontSize="9.5" textAnchor="middle" className="fill-muted">PNP reads high when a target is present; NPN reads low</text>
    </svg>
  );
}

export default function HowToTestA3WireProximitySensorWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a 3 Wire Proximity Sensor With a Multimeter"
      description={description}
      published="2026-10-22"
      path="/multimeters/how-to-test-a-3-wire-proximity-sensor-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a 3 wire proximity sensor with a multimeter, power it from 10–30 V DC (24 V DC is standard)
          on brown and blue, then read DC volts between the black output and blue while you move a target in
          and out of range. A PNP sensor should swing from about 0 V to near the supply voltage; an NPN sensor
          should drop from near supply to about 0 V, provided a load or pull-up resistor is connected. If the
          status LED and the output both stay unchanged, the sensor or its wiring has failed.
        </>
      }
      aside={{
        image: fluke117.image,
        alt: "Fluke 117 True RMS digital multimeter, front view",
        caption: (
          <>
            The Fluke 117 (True RMS, CAT III 600V, built-in non-contact voltage detection) suits control-panel
            work where mains and 24 V DC circuits share a cabinet. See our{" "}
            <Link href="/multimeters/fluke-117-review" className={link}>
              Fluke 117 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "inductive-vs-capacitive", label: "Inductive vs capacitive sensors" },
        { id: "wire-colours", label: "Brown, blue and black wires" },
        { id: "pnp-vs-npn", label: "PNP (sourcing) vs NPN (sinking)" },
        { id: "power-the-sensor", label: "Power the sensor" },
        { id: "measure-the-output", label: "Measure the output with a target" },
        { id: "led-distance-no-nc", label: "Status LED, range and NO vs NC" },
        { id: "testing-on-the-machine", label: "Testing it on the machine" },
        { id: "fault-table", label: "Reading the result" },
      ]}
      faq={[
        {
          q: "How do I know if my proximity sensor is PNP or NPN?",
          a: "Check the label or part number first; many makers use a letter in the code. If it is unreadable, power it and fit a resistor from black to blue. If the black wire rises to near supply when a target is present, it is PNP. If nothing happens, move the resistor from black to brown: a black wire that drops near 0 V then means NPN.",
        },
        {
          q: "Why does my proximity sensor LED come on but the machine does not respond?",
          a: "The LED shows that the sensor has detected the target, not that the signal reached the controller. Measure at the PLC or relay input terminal. A correct voltage at the sensor but not at the input points to a broken cable or loose terminal. A correct voltage at the input points to the controller, its settings, or a PNP sensor wired to an NPN-type input.",
        },
        {
          q: "Can I test a proximity sensor with a 9 V battery?",
          a: "Sometimes, but it is below the usual 10 V minimum, so many sensors will not switch reliably or at all. Two 9 V batteries in series give 18 V, inside the typical 10–30 V DC range. A bench supply or the machine's own 24 V DC control supply is the better choice, with a resistor on the output.",
        },
        {
          q: "What should a proximity sensor read with no target present?",
          a: "For a normally open PNP sensor with a load resistor, close to 0 V between black and blue. For a normally open NPN sensor with a pull-up, close to the supply voltage. Normally closed versions read the opposite. With no resistor at all, the reading may float somewhere in between, which is not a fault on its own.",
        },
        {
          q: "Does a stainless steel or aluminium target change the sensing distance?",
          a: "Yes, for inductive sensors. Rated sensing distance is quoted for mild steel. Stainless steel, brass, aluminium and copper usually trigger at a noticeably shorter distance, often well under the rated figure; the datasheet gives correction factors. If a sensor fails only on a non-steel part, test it again with a steel target before replacing it.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-limit-switch-with-a-digital-multimeter",
          title: "Test a Limit Switch With a Digital Multimeter",
          desc: "The mechanical alternative to a proximity sensor, tested with continuity and voltage.",
        },
        {
          href: "/multimeters/how-to-check-a-24v-transformer-with-a-multimeter",
          title: "How to Check a 24V Transformer With a Multimeter",
          desc: "Checking the low-voltage control supply that many machines and panels run on.",
        },
      ]}
    >
      <Callout title="Lock out the machine before you reach in">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            A sensor that suddenly switches can start a conveyor, press or cylinder. Follow your site&apos;s
            lockout/tagout procedure, isolate stored air and hydraulic energy, and keep hands clear of moving
            parts.
          </li>
          <li>
            Sensors run at 24 V DC, but the same panel usually carries 230 V (UK) or 120 V (North America) mains
            and often three-phase supply. Use a meter rated for the panel and never probe terminals you have not
            identified.
          </li>
          <li>Where possible, unplug the sensor and test it on the bench instead.</li>
        </ul>
      </Callout>

      <section>
        <h2 id="inductive-vs-capacitive" className="text-xl font-semibold mb-3">Inductive vs capacitive proximity sensors</h2>
        <p className="text-muted leading-7 mb-4">
          Both types switch an electronic output when something comes close, with no physical contact. That
          makes them the non-contact cousin of the mechanical{" "}
          <Link href="/multimeters/how-to-test-a-limit-switch-with-a-digital-multimeter" className={link}>
            limit switch
          </Link>
          , and the reason you test them powered rather than with continuity.
        </p>
        <InfoCards
          items={[
            { label: "Inductive", desc: "Senses metal only, using an oscillating magnetic field. Range is a few millimetres to a few tens of millimetres, rated for mild steel." },
            { label: "Capacitive", desc: "Senses metal, plastic, wood, liquids and granules through changes in capacitance. Usually has a sensitivity adjuster screw." },
            { label: "Flush vs non-flush", desc: "Flush (shielded) heads mount level with metal and sense a shorter distance. Non-flush heads reach further but need clear space around the face." },
          ]}
        />
      </section>

      <section>
        <h2 id="wire-colours" className="text-xl font-semibold mb-3">Brown, blue and black: the 3 wire proximity sensor colours</h2>
        <p className="text-muted leading-7 mb-4">
          Most DC sensors follow the IEC colour convention. Treat it as typical, not guaranteed: check the label
          or datasheet, especially on older or non-European parts.
        </p>
        <DataTable
          head={["Wire (typical)", "Function", "M12 connector pin (typical)"]}
          rows={[
            ["Brown", "Supply positive, +10 to +30 V DC", "Pin 1"],
            ["Blue", "Supply 0 V (negative)", "Pin 3"],
            ["Black", "Switched output", "Pin 4"],
            ["White (4-wire types)", "Second or complementary output", "Pin 2"],
          ]}
        />
      </section>

      <section>
        <h2 id="pnp-vs-npn" className="text-xl font-semibold mb-3">PNP (sourcing) vs NPN (sinking) outputs</h2>
        <p className="text-muted leading-7 mb-4">
          The output is a transistor switch, and the type decides which way it switches. A PNP sensor sources
          current: when active, it connects the black wire to the positive supply, so the load sits between
          black and 0 V. An NPN sensor sinks current: when active, it connects black to 0 V, so the load sits
          between black and positive. Broadly, PNP is the norm in European machinery and NPN is common in Asian
          equipment, but both appear everywhere.
        </p>
        <Figure caption={<>Bench test wiring. A PNP needs a load from black to 0 V; an NPN needs a pull-up from black to +V. Without the resistor, an open transistor output has nothing to pull it either way.</>}>
          <ProxWiringDiagram />
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="power-the-sensor">Power the sensor at 10–30 V DC</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Connect brown to the positive and blue to the negative of a DC supply inside the sensor&apos;s range;
          24 V DC is the usual industrial control voltage. Then fit a resistor of roughly 2.2 to 4.7 kΩ, rated
          at least 0.5 W, as the load (PNP) or pull-up (NPN). At 24 V a 2.2 kΩ resistor draws about 11 mA, well
          under the typical output rating. Never connect the black output straight to a supply rail without a
          resistor: that is a short circuit when the output turns on.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="measure-the-output">Measure the output with and without a target</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set the meter to DC volts. Put the black probe on blue (0 V) and the red probe on the black output
          wire. Read it with nothing in front of the sensor, then bring a steel target (a spanner works) up to
          the face, inside the rated distance.
        </p>
        <Figure caption={<>Typical readings for a normally open PNP sensor on 24 V DC with a load resistor: near 0 V with no target, then about 1 to 2 V below the supply once the target is detected.</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="0.02" unit="V DC" mode="V  PNP, no target" />
            <MeterReadout value="22.9" unit="V DC" mode="V  PNP, target present" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          An NPN sensor with a pull-up reverses this: close to 24 V with no target, falling to roughly 1 V or
          less when it switches. Without a pull-up, an NPN output usually reads near 0 V in both states,
          because nothing lifts the black wire while the transistor is off and the meter&apos;s own input ties it to 0 V. That is the most common
          reason a good NPN sensor gets condemned. If you need a refresher on DC voltage mode, see{" "}
          <Link href="/multimeters/how-to-use-a-multimeter" className={link}>
            how to use a multimeter
          </Link>
          .
        </p>
        <KeyIdea title="Quick sanity check on supply current">
          In series on the mA range in the brown wire, an idle sensor typically draws a few milliamps to around
          20 mA. Far more than the datasheet figure points to an internal short.
        </KeyIdea>
      </section>

      <section>
        <h2 id="led-distance-no-nc" className="text-xl font-semibold mb-3">The status LED, sensing distance and NO vs NC</h2>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <strong className="text-foreground">Status LED:</strong> most sensors light an LED when the output
            is on. It is a useful first clue, but it only shows the sensor&apos;s internal state. A shorted or
            overloaded output can leave the LED lit with no voltage on the black wire.
          </li>
          <li>
            <strong className="text-foreground">Sensing distance:</strong> slide the target in slowly and note
            where it switches. Much shorter than rated suggests a damaged face, swarf or the wrong target metal.
          </li>
          <li>
            <strong className="text-foreground">NO vs NC:</strong> a normally open sensor turns its output on
            when a target arrives; a normally closed one turns it off. The part number or datasheet says which.
          </li>
        </ul>
      </section>

      <section>
        <h2 id="testing-on-the-machine" className="text-xl font-semibold mb-3">Testing a proximity sensor on the machine</h2>
        <p className="text-muted leading-7 mb-4">
          In place, the PLC or relay input already provides the load. With the machine locked out except for
          the 24 V DC control supply (as your procedure allows), trigger the sensor by hand and measure at the
          input terminal against 0 V, then at the sensor connector. A signal at the sensor but not at the input
          means a cable or terminal fault; flexing cables on moving axes are frequent culprits.
        </p>
      </section>

      <section>
        <h2 id="fault-table" className="text-xl font-semibold mb-3">Reading the result</h2>
        <DataTable
          head={["What you see", "Likely meaning"]}
          rows={[
            ["Output swings fully with target; LED follows", "Sensor is good; look at cable or controller"],
            ["No supply voltage between brown and blue", "Supply, fuse or wiring fault, not the sensor"],
            ["LED changes but output never moves", "Missing load or pull-up, or a failed output stage"],
            ["Nothing changes, supply present", "Dead sensor, or target material/distance out of range"],
            ["Output stuck on with no target", "Swarf on the face, nearby metal, or a shorted output"],
            ["Switches only very close or intermittently", "Damaged face, wrong target, or loose mounting"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          A replacement must match the output type, NO or NC function, supply range, thread size and flush style.
        </p>
        <ProductStrip
          title="Meters in our reviews for panel work"
          items={[
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 True RMS digital multimeter",
              href: "/multimeters/fluke-117-review",
              note: "True RMS, CAT III 600V, non-contact voltage detection built in.",
            },
            {
              name: "Klein Tools MM400",
              image: klein.image,
              alt: "Klein Tools MM400 auto-ranging digital multimeter",
              href: "/multimeters/klein-mm400-review",
              note: "Auto-ranging, CAT III 600V, 4,000-count backlit display; also reads temperature, capacitance, frequency and duty cycle.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
