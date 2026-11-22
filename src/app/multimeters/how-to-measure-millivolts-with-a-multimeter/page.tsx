import Link from "@/components/AppLink";
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
  "Measure millivolts with a multimeter: pick the mV range, cut lead offset, and read thermocouples, shunts, load cells and voltage drops, with the math.";

export const metadata = buildMetadata({
  title: "How to Measure Millivolts With a Multimeter",
  description,
  path: "/multimeters/how-to-measure-millivolts-with-a-multimeter",
});

const fluke87 = picks.find((p) => p.name === "Fluke 87V")!;
const fluke115 = picks.find((p) => p.name === "Fluke 115")!;
const fluke15 = picks.find((p) => p.name === "Fluke 15B+")!;

const link = "text-accent hover:underline";

/** A current shunt in a battery negative lead with the meter on mV across its sense screws. */
function ShuntDiagram() {
  return (
    <svg
      viewBox="0 0 360 190"
      className="w-full h-auto"
      role="img"
      aria-label="Measuring millivolts across a 100 A, 75 mV current shunt in the negative lead of a battery. The load current flows through the shunt's large bolts, and the multimeter set to DC millivolts connects to the shunt's two small sense screws, reading 37.5 mV, which means 50 amps."
    >
      {/* battery */}
      <rect x="20" y="60" width="60" height="70" rx="6" className="fill-surface stroke-foreground" strokeWidth="2" />
      <text x="50" y="98" fontSize="11" fontWeight="700" textAnchor="middle" className="fill-foreground">12 V</text>
      <text x="30" y="54" fontSize="11" fontWeight="700" className="fill-foreground">+</text>
      <text x="68" y="146" fontSize="11" fontWeight="700" className="fill-foreground">−</text>
      {/* load */}
      <rect x="290" y="60" width="50" height="70" rx="4" className="fill-surface stroke-foreground" strokeWidth="2" />
      <text x="315" y="98" fontSize="10" textAnchor="middle" className="fill-foreground">load</text>
      <g className="stroke-foreground" strokeWidth="2.4" fill="none">
        <path d="M35 60 V30 H315 V60" />
        <path d="M65 130 V160 H130" />
        <path d="M230 160 H315 V130" />
      </g>
      {/* shunt */}
      <rect x="130" y="150" width="100" height="20" rx="3" className="fill-surface stroke-accent" strokeWidth="2" />
      <text x="180" y="164" fontSize="9" textAnchor="middle" className="fill-accent" fontWeight="700">shunt 100 A / 75 mV</text>
      <circle cx="148" cy="150" r="3" className="fill-foreground" />
      <circle cx="212" cy="150" r="3" className="fill-foreground" />
      {/* meter */}
      <g className="stroke-accent" strokeWidth="1.4" fill="none" strokeDasharray="4 3">
        <path d="M148 150 V110 H160" />
        <path d="M212 150 V110 H200" />
      </g>
      <rect x="160" y="88" width="40" height="40" rx="5" className="fill-surface stroke-accent" strokeWidth="2" />
      <text x="180" y="108" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-accent">mV</text>
      <text x="180" y="121" fontSize="8" textAnchor="middle" className="fill-muted">37.5</text>
      <text x="180" y="80" fontSize="9" textAnchor="middle" className="fill-muted">sense screws only</text>
      <text x="180" y="22" fontSize="9" textAnchor="middle" className="fill-muted">50 A load current</text>
    </svg>
  );
}

export default function HowToMeasureMillivoltsWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Measure Millivolts With a Multimeter"
      description={description}
      published="2026-11-18"
      path="/multimeters/how-to-measure-millivolts-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To measure millivolts with a multimeter, plug the leads into COM and V, select DC (or AC) volts, and either
          turn the dial to the mV position or let an autoranging meter drop to its millivolt range by itself; then
          read the value marked mV, where 1 V equals 1,000 mV. The harder part is trusting a reading that small. This
          guide shows which range to use, how to remove lead and contact offsets, and how to turn millivolt readings
          from thermocouples, current shunts, load cells and connection voltage drops into temperatures, amps and
          verdicts, with the arithmetic shown.
        </>
      }
      aside={{
        image: fluke87.image,
        alt: "Fluke 87V industrial multimeter with 10 microvolt resolution for millivolt work",
        caption: (
          <>
            Fluke specifies 10 µV maximum DC resolution for the 87V, ten times finer than a 0.1 mV entry meter. See
            our{" "}
            <Link href="/multimeters/fluke-87v-review" className={link}>
              Fluke 87V review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "mv-basics", label: "Millivolts in one minute" },
        { id: "problems", label: "Problems and fixes" },
        { id: "set-up", label: "1. Set up the meter" },
        { id: "zero-the-leads", label: "2. Check the zero" },
        { id: "measure", label: "3. Measure and read" },
        { id: "shunt", label: "4. Shunt current from mV" },
        { id: "thermocouple", label: "5. Thermocouple mV" },
        { id: "voltage-drop", label: "6. Voltage drop in mV" },
        { id: "resolution", label: "Resolution by meter" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "How do I set my multimeter to millivolts?",
          a: "On a manual meter, turn the dial to the DC volts position marked 200m or similar; readings there are in millivolts. On an autoranging meter, select volts and connect the probes; the meter switches itself to its mV range when the signal is small enough, and the display shows mV. Some meters have a separate mV position on the dial.",
        },
        {
          q: "How many millivolts are in a volt?",
          a: "There are 1,000 millivolts in one volt. To convert mV to volts, divide by 1,000, so 750 mV is 0.75 V and 37.5 mV is 0.0375 V. To convert volts to mV, multiply by 1,000, so 0.2 V is 200 mV. One millivolt is in turn 1,000 microvolts (µV).",
        },
        {
          q: "Can a cheap multimeter measure millivolts accurately?",
          a: "For readings of tens to hundreds of millivolts, usually yes, within a few counts. A typical 4,000- or 6,000-count meter resolves 0.1 mV on its bottom range. Below about 5 mV, the fixed counts in the accuracy spec and offsets from leads and connections dominate, so a meter with 10 µV resolution, such as the Fluke 87V, is the better tool.",
        },
        {
          q: "How do I test a thermopile's millivolts?",
          a: "Set the meter to DC mV and measure across the thermopile's two leads at the gas valve with the pilot lit and fully heating the thermopile. Compare the reading with the appliance maker's minimum in the manual, both open-circuit and with the valve connected. A reading well below the maker's figure points to a weak thermopile, a dirty pilot flame or poor connections.",
        },
        {
          q: "Why does my multimeter show a few millivolts with the probes shorted?",
          a: "That residual reading is offset from the meter's input, small voltages created where dissimilar metals meet, and noise picked up by the leads. A count or two is normal. Note it and subtract it, or use the meter's REL (relative) button to zero it before measuring. A large or drifting offset can mean dirty probe tips or a weak meter battery.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-check-a-thermocouple-with-a-multimeter",
          title: "How to Check a Thermocouple",
          desc: "Furnace and water heater thermocouple tests, open-circuit and under load.",
        },
        {
          href: "/multimeters/how-to-test-a-shunt-resistor-with-a-multimeter",
          title: "How to Test a Shunt Resistor",
          desc: "Check a current shunt's resistance and calibration in place.",
        },
      ]}
    >
      <Callout title="Small readings, big circuits">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            A millivolt reading across a shunt or a connection does not mean the circuit is low voltage. The shunt may
            sit on a battery bank that can deliver hundreds of amps, or on a line-voltage circuit. Rate the meter and
            your precautions for the whole circuit.
          </li>
          <li>
            Keep the red lead in the V jack. Measuring millivolts across a shunt with the lead in the A jack shorts the
            shunt through the meter and can blow its fuse.
          </li>
          <li>
            Around gas appliances, test thermocouples and thermopiles only as the appliance maker describes. If you
            smell gas, leave and call the gas utility or 911 from outside.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="mv-basics" className="text-xl font-semibold mb-3">Millivolts in one minute</h2>
        <p className="text-muted leading-7 mb-4">
          A millivolt is one thousandth of a volt. Many sensors and checks produce signals in that range, which is
          why the mV range matters even if you mostly measure batteries and outlets. The table shows where millivolts
          turn up and what a reading means.
        </p>
        <DataTable
          head={["Source", "Typical signal", "What it tells you"]}
          rows={[
            ["Type K thermocouple", "4.096 mV at 100 °C (0 °C reference)", "Temperature difference across the junctions"],
            ["Current shunt rated 100 A / 75 mV", "0.75 mV per amp", "Current through the shunt"],
            ["Load cell rated 2 mV/V, 10 V excitation", "0 to 20 mV over full load", "Force or weight"],
            ["Gas appliance thermopile", "Hundreds of mV (maker's spec)", "Whether it can hold the gas valve open"],
            ["Voltage drop across a connection", "A few mV to hundreds of mV", "Whether the joint is clean and tight"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The thermocouple figure comes from the NIST ITS-90 reference tables, and the shunt and load cell figures
          are their ratings, explained in the steps below. Millivolt work is mostly DC; the AC mV range is for audio
          and small-signal checks, and its accuracy usually applies only over a limited frequency band. A car&apos;s
          oxygen sensor is another sub-volt signal, swinging between about 0.1 and 0.9 V; see{" "}
          <Link href="/multimeters/how-to-test-an-o2-sensor-with-a-multimeter" className={link}>
            how to test an O2 sensor with a multimeter
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="problems" className="text-xl font-semibold mb-3">Problems and fixes when measuring millivolts</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["Reads a few mV with nothing connected", "Floating input picks up noise", "Short the probes together", "Normal; measure only when connected"],
            ["Reading drifts slowly", "Thermal EMF at probe or clip contacts", "Hold still; let it settle", "Clean tips, same-metal clips, REL zero"],
            ["Reading jumps around", "Noise from motors, inverters, mains", "Watch the last digits", "Shorter, twisted leads; average or MIN MAX"],
            ["Shows V instead of mV", "Autorange chose a higher range", "Look at the unit", "Press RANGE to lock the mV range"],
            ["Negative mV", "Leads reversed", "Swap probes", "Normal; magnitude still valid"],
            ["Shunt reading far off expected amps", "Probes on the big bolts, not sense screws", "Check probe position", "Use the shunt's sense screws"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="set-up">Set up the meter for millivolts</StepHeading>
        <p className="text-muted leading-7">
          Plug the black lead into COM and the red lead into V. Select DC volts. On a manual-range meter, choose the
          lowest position, often marked 200m: the display then reads directly in millivolts with 0.1 mV resolution on
          a 2,000-count meter. On an autoranging meter, leave it on volts; when the signal is small it moves to its
          bottom range, which is 400.0 mV on the Fluke 15B+ and 600.0 mV on the Fluke 115, per Fluke&apos;s
          specifications. If the reading hovers near a range boundary and keeps switching, press RANGE until the mV
          range is locked. If the dial has a dedicated mV position, use it, because it often has better accuracy than
          letting the volts position autorange.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="zero-the-leads">Check the zero before you trust a small reading</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Touch the probe tips together and look at the display. A good meter reads 0.0 mV or within a count or two.
          That residue comes from the meter&apos;s input offset plus tiny thermocouple voltages wherever two different
          metals touch, such as a brass jack, a nickel-plated probe and a copper wire. Warming a joint with your
          fingers can shift it. If your meter has REL (relative) mode, as the Fluke 17B+ does, press it with the
          probes shorted to zero the offset; otherwise note the figure and subtract it.
        </p>
        <Figure caption={<>Illustrative readings: a 0.2 mV offset with the probes shorted, then 37.7 mV across a shunt. The corrected value is 37.5 mV.</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="0.2" unit="mV" mode="DC mV  probes shorted" />
            <MeterReadout value="37.7" unit="mV" mode="DC mV  across shunt" />
          </div>
        </Figure>
      </section>

      <section>
        <StepHeading n={3} id="measure">Measure and read the value</StepHeading>
        <p className="text-muted leading-7">
          Hold the probes firmly on clean metal, because a light, wobbly touch adds resistance and noise. Keep the
          leads short and close together so they enclose little area for magnetic pickup near motors or inverters.
          Let the reading settle for a few seconds, then read it with its unit: 37.5 mV is 0.0375 V. If the last
          digit wanders, record the middle value, or use MIN MAX to capture the range. Then apply the accuracy spec,
          because the counts term is large relative to a small reading. Fluke specifies the 115&apos;s DC volts as
          ±(0.5% + 2): on its 600.0 mV range a 37.5 mV reading is good to 0.19 + 0.2 = ±0.39 mV, about ±1%, but a
          5.0 mV reading is good to only ±0.23 mV, about ±4.5%.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="shunt">Convert shunt millivolts to amps</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A shunt is a precise low-value resistor rated by the current that produces its full-scale voltage, commonly
          50 mV or 75 mV. Battery monitors and DC panel meters read it the same way you can. Put the probes on the two
          small sense screws, not the big current bolts, so the bolt contact resistance isn&apos;t in your reading.
        </p>
        <Figure caption={<>A 100 A / 75 mV shunt in a battery negative lead. The meter reads millivolts across the sense screws; 37.5 mV means 50 A.</>}>
          <ShuntDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The arithmetic is a ratio: amps = measured mV ÷ rated mV × rated amps. For a 100 A / 75 mV shunt reading
          37.5 mV, that is 37.5 ÷ 75 × 100 = 50 A. Each millivolt is 100 ÷ 75 ≈ 1.33 A, so a ±0.39 mV meter
          uncertainty is about ±0.5 A. The shunt&apos;s resistance is 75 mV ÷ 100 A = 0.75 mΩ, which is why you
          measure the voltage across it rather than trying to read its resistance with the ohms range.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="thermocouple">Read a thermocouple&apos;s millivolts</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A thermocouple produces a voltage proportional to the temperature difference between its hot junction and
          the point where its wires meet copper. For Type K, the NIST reference table gives 4.096 mV at 100 °C with
          the reference at 0 °C, roughly 41 µV per degree in that range. So a 1 °C change is only 0.04 mV, below what
          a 0.1 mV meter can see; for temperature, use a meter with a Type K input, which applies the cold-junction
          correction for you.
        </p>
        <p className="text-muted leading-7">
          On gas appliances, the mV reading is used as a health check. A standing-pilot thermocouple or thermopile
          must produce enough voltage to hold the gas valve open, and the appliance maker states the minimum
          open-circuit and loaded figures. Measure with the pilot heating the tip fully and compare. Our{" "}
          <Link href="/multimeters/how-to-check-a-thermocouple-with-a-multimeter" className={link}>
            thermocouple guide
          </Link>{" "}
          walks through the furnace and water-heater test.
        </p>
      </section>

      <section>
        <StepHeading n={6} id="voltage-drop">Measure voltage drop in millivolts</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A connection that should be a near-perfect conductor shows up as millivolts when current flows through it.
          Put one probe on each side of a battery clamp, a crimp or a switch contact while the circuit carries its
          normal current. Divide the millivolts by the amps to get the joint resistance, and multiply by the amps
          again to get the heat. A joint dropping 50 mV at 10 A is 5 mΩ and dissipates 0.05 V × 10 A = 0.5 W; the
          same joint at 100 A of starter current drops 500 mV and dissipates 50 W, enough to make it hot.
        </p>
        <Figure caption={<>Heat in a joint at 10 A for different millivolt drops (P = V × I). The meter&apos;s mV range spots a bad connection before it scorches.</>}>
          <BarChart
            items={[
              { label: "5 mV drop (0.5 mΩ)", value: 0.05, display: "0.05 W" },
              { label: "50 mV drop (5 mΩ)", value: 0.5, display: "0.5 W", highlight: true },
              { label: "200 mV drop (20 mΩ)", value: 2, display: "2 W" },
              { label: "500 mV drop (50 mΩ)", value: 5, display: "5 W" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Compare each joint with an identical good one, or with the limit in the vehicle or equipment service manual.
          For cars, the{" "}
          <Link href="/multimeters/how-to-check-voltage-drop-on-a-car" className={link}>
            car voltage drop test
          </Link>{" "}
          shows the cranking and charging circuit checks in detail.
        </p>
        <Figure caption={<>The millivolt measurement routine.</>}>
          <FlowDiagram
            steps={[
              { label: "COM + V", sub: "Never the A jack" },
              { label: "Range", sub: "mV, locked if needed" },
              { label: "Zero", sub: "Short probes, REL" },
              { label: "Measure", sub: "Firm, still contact" },
              { label: "Convert", sub: "To °C, A or Ω" },
            ]}
          />
        </Figure>
        <KeyIdea title="At millivolts, the leads are part of the circuit">
          Offsets of a fraction of a millivolt from probes, clips and dissimilar metals don&apos;t matter at 12 V but
          can be several percent of a 5 mV signal. Zero the meter, keep contacts clean and still, and read the
          accuracy spec against the reading you actually got.
        </KeyIdea>
      </section>

      <section>
        <h2 id="resolution" className="text-xl font-semibold mb-3">Millivolt resolution by meter</h2>
        <p className="text-muted leading-7 mb-4">
          Resolution sets the smallest change you can see. The figures below are the makers&apos; DC volts
          specifications for three meters we cover.
        </p>
        <DataTable
          head={["Meter", "Bottom DC range", "Best resolution", "DC volts accuracy (maker)"]}
          rows={[
            ["Fluke 15B+", "400.0 mV", "0.1 mV (100 µV)", "±(0.5% + 3)"],
            ["Fluke 115", "600.0 mV", "0.1 mV (100 µV)", "±(0.5% + 2)"],
            ["Fluke 87V", "Hi-res mode", "0.01 mV (10 µV)", "±(0.05% + 1)"],
          ]}
          mono={[1, 2, 3]}
        />
        <Figure caption={<>Smallest step each meter shows on DC volts, in microvolts (lower is finer).</>}>
          <BarChart
            items={[
              { label: "Fluke 15B+", value: 100, display: "100 µV" },
              { label: "Fluke 115", value: 100, display: "100 µV" },
              { label: "Fluke 87V", value: 10, display: "10 µV", highlight: true },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter to use for millivolts</h2>
        <p className="text-muted leading-7 mb-6">
          For shunts, voltage drops and thermopiles, 0.1 mV resolution is enough. For thermocouple voltages, strain
          gauges and load cells, where the whole signal is a few millivolts, the 87V&apos;s 10 µV resolution and
          ±(0.05% + 1) DC accuracy make a real difference. For more on reading small currents rather than voltages,
          see{" "}
          <Link href="/multimeters/how-to-measure-milliamps-with-a-multimeter" className={link}>
            how to measure milliamps
          </Link>
          .
        </p>
        <ProductStrip
          title="Meters for millivolt work"
          items={[
            {
              name: "Fluke 87V",
              image: fluke87.image,
              alt: "Fluke 87V industrial True RMS multimeter",
              href: "/multimeters/fluke-87v-review",
              note: "10 µV resolution, ±(0.05% + 1) DC volts and a 19,999-count high-resolution mode for small sensor signals.",
            },
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 True RMS digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "600.0 mV bottom range with 0.1 mV resolution and ±(0.5% + 2) DC accuracy, plenty for shunts and voltage drops.",
            },
            {
              name: "Fluke 15B+",
              image: fluke15.image,
              alt: "Fluke 15B+ digital multimeter",
              href: "/multimeters/fluke-15b-plus-review",
              note: "400.0 mV range at 0.1 mV resolution in a simple, durable meter for basic millivolt checks.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
