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
  "How to check a potentiometer wiper with a multimeter: find the pins, measure end-to-end resistance, sweep the wiper for dropouts, and test it in circuit.";

export const metadata = buildMetadata({
  title: "How to Check a Potentiometer Wiper With a Meter",
  description,
  path: "/multimeters/how-to-check-a-potentiometer-wiper-with-a-multimeter",
});

const fluke87 = picks.find((p) => p.name === "Fluke 87V")!;
const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;
const kaiweets = picks.find((p) => p.name === "KAIWEETS KM200s")!;

const link = "text-accent hover:underline";

/** Inside view of a rotary pot: resistive track between two end pins, wiper contact on the middle pin. */
function PotPinoutDiagram() {
  return (
    <svg
      viewBox="0 0 340 210"
      className="w-full h-auto"
      role="img"
      aria-label="Inside a rotary potentiometer: a horseshoe-shaped resistive track runs between end pin 1 and end pin 3. A wiper attached to the shaft slides along the track and connects to the middle pin 2. Probes on pins 1 and 3 read the fixed total resistance; probes on pin 2 and an end pin read a value that changes with rotation."
    >
      {/* Track: arc */}
      <path d="M128 152 A60 60 0 1 1 212 152" className="stroke-muted" strokeWidth="12" fill="none" strokeLinecap="round" />
      <path d="M128 152 A60 60 0 1 1 212 152" className="stroke-foreground" strokeWidth="1" fill="none" strokeDasharray="2 4" />
      {/* Shaft centre and wiper */}
      <circle cx="170" cy="110" r="14" className="fill-surface stroke-border" strokeWidth="1.5" />
      <path d="M170 110 L212 68" className="stroke-accent" strokeWidth="3" strokeLinecap="round" />
      <circle cx="212" cy="68" r="5" className="fill-accent" />
      <text x="220" y="60" fontSize="10" className="fill-accent">wiper</text>
      {/* Pins */}
      <path d="M128 152 V185" className="stroke-foreground" strokeWidth="2" />
      <path d="M212 152 V185" className="stroke-foreground" strokeWidth="2" />
      <path d="M170 124 V185" className="stroke-accent" strokeWidth="2" />
      <rect x="118" y="185" width="20" height="10" className="fill-surface stroke-border" />
      <rect x="160" y="185" width="20" height="10" className="fill-surface stroke-border" />
      <rect x="202" y="185" width="20" height="10" className="fill-surface stroke-border" />
      <text x="118" y="207" textAnchor="middle" fontSize="10" className="fill-foreground">1 end</text>
      <text x="170" y="207" textAnchor="middle" fontSize="10" className="fill-accent">2 wiper</text>
      <text x="222" y="207" textAnchor="middle" fontSize="10" className="fill-foreground">3 end</text>
      <text x="40" y="70" fontSize="10" className="fill-muted">resistive</text>
      <text x="40" y="83" fontSize="10" className="fill-muted">track</text>
      <path d="M82 80 L112 90" className="stroke-border" strokeWidth="1" />
      <text x="262" y="120" fontSize="9" className="fill-muted">1↔3: fixed</text>
      <text x="262" y="134" fontSize="9" className="fill-muted">2↔1 or 3:</text>
      <text x="262" y="147" fontSize="9" className="fill-muted">varies</text>
    </svg>
  );
}

/** Wiper-to-low-end resistance vs rotation for a 10 kΩ linear (B) and a two-segment 10% log (A) pot. */
function TaperChart() {
  const x = (pct: number) => 50 + pct * 2.6;
  const y = (k: number) => 170 - k * 15;
  const log = [
    [0, 0],
    [50, 1],
    [100, 10],
  ];
  return (
    <svg
      viewBox="0 0 340 210"
      className="w-full h-auto"
      role="img"
      aria-label="Chart of wiper resistance against rotation for a 10 kilohm pot. The linear taper rises in a straight line from 0 to 10 kilohms, reaching 5 kilohms at half rotation. The typical log taper stays low, reaching only about 1 kilohm at half rotation, then rises steeply to 10 kilohms at full rotation."
    >
      <path d={`M${x(0)} ${y(0)} H${x(100)} M${x(0)} ${y(0)} V${y(10)}`} className="stroke-border" strokeWidth="1" fill="none" />
      {[0, 5, 10].map((k) => (
        <text key={k} x={x(0) - 6} y={y(k) + 3} textAnchor="end" fontSize="9" className="fill-muted">
          {k}k
        </text>
      ))}
      {[0, 50, 100].map((p) => (
        <text key={p} x={x(p)} y={y(0) + 14} textAnchor="middle" fontSize="9" className="fill-muted">
          {p}%
        </text>
      ))}
      <path d={`M${x(50)} ${y(0)} V${y(10)}`} className="stroke-border" strokeWidth="1" strokeDasharray="3 3" />
      <path d={`M${x(0)} ${y(0)} L${x(100)} ${y(10)}`} className="stroke-foreground" strokeWidth="2" fill="none" />
      <path d={`M${log.map(([p, k]) => `${x(p)} ${y(k)}`).join(" L")}`} className="stroke-accent" strokeWidth="2.5" fill="none" />
      <circle cx={x(50)} cy={y(5)} r="3.5" className="fill-foreground" />
      <circle cx={x(50)} cy={y(1)} r="3.5" className="fill-accent" />
      <text x={x(50) + 8} y={y(5) - 4} fontSize="10" className="fill-foreground">linear: 5 kΩ</text>
      <text x={x(50) - 8} y={y(1) - 6} textAnchor="end" fontSize="10" className="fill-accent">log: ≈1 kΩ</text>
      <text x={x(50)} y="204" textAnchor="middle" fontSize="10" className="fill-muted">rotation from low end</text>
    </svg>
  );
}

export default function HowToCheckAPotentiometerWiperWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Check a Potentiometer Wiper With a Multimeter"
      description={description}
      published="2026-10-22"
      path="/multimeters/how-to-check-a-potentiometer-wiper-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To check a potentiometer wiper with a multimeter, set the meter to resistance, measure between the
          wiper (usually the middle pin) and one end pin, and turn the shaft slowly from stop to stop. A good
          pot changes smoothly with no jumps or open-circuit flashes. Before that, measure end to end to confirm
          the track matches its marked value. This guide covers the full potentiometer test, including taper and
          an in-circuit voltage check.
        </>
      }
      aside={{
        image: fluke87.image,
        alt: "Fluke 87V industrial True RMS digital multimeter, front view",
        caption: (
          <>
            The Fluke 87V adds a 32-segment analog bar graph for watching readings change in real time, which
            suits a wiper sweep. Any resistance range works for the basic test. See our{" "}
            <Link href="/multimeters/fluke-87v-review" className={link}>
              Fluke 87V review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "identify-the-pins", label: "Identify end pins and wiper" },
        { id: "end-to-end-resistance", label: "Measure end-to-end resistance" },
        { id: "sweep-the-wiper", label: "Sweep the wiper" },
        { id: "linear-vs-log-taper", label: "Linear vs log taper" },
        { id: "in-circuit-voltage-check", label: "In-circuit voltage check" },
        { id: "reading-the-results", label: "Reading the results" },
        { id: "clean-or-replace", label: "Clean or replace?" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "What should a potentiometer read between the wiper and an end?",
          a: "Anything from close to zero up to the full rated value, depending on shaft position. At one stop the wiper-to-end reading sits at a few ohms; at the other it approaches the end-to-end value. The two wiper-to-end readings should always add up to roughly the total. What matters most is that the change is smooth through the whole rotation.",
        },
        {
          q: "What does B10K or A100K mean on a pot?",
          a: "The number is the end-to-end resistance: 10K is 10 kΩ, 100K is 100 kΩ. The letter is the taper. On most current parts from Asian manufacturers, A is logarithmic (audio) and B is linear, while C is reverse log. Some older European parts used different letters, so confirm with the datasheet if the reading doesn't match.",
        },
        {
          q: "Why is my potentiometer scratchy?",
          a: "Scratchiness is usually dirt, oxidation or wear on the carbon track where the wiper rides, so the contact briefly breaks or jumps as you turn it. In audio gear it shows up as crackle. On a meter you see the reading flick toward OL or jump. Contact cleaner can help an open-frame pot; a worn track needs a replacement.",
        },
        {
          q: "Can I test a potentiometer without removing it?",
          a: "Often, yes. With the device powered, measure DC volts from the grounded end to the wiper and turn the shaft; a smooth sweep from near zero to the supply voltage means the pot works. Resistance checks in circuit are less dependable, because other parts in parallel can lower the reading. Unplug it or lift a pin if the numbers look off.",
        },
        {
          q: "How do I know if a trimmer potentiometer is bad?",
          a: "Test it like a panel pot: check end to end against the printed code (103 means 10 kΩ), then turn the adjuster with a plastic tool while watching the wiper reading. Multi-turn trimmers change slowly over many turns, so expect gradual movement. A reading that sticks, jumps or goes open at some positions means the trimmer is faulty.",
        },
      ]}
      next={[
        {
          href: "/multimeters/unstable-multimeter-readings",
          title: "What Causes Unstable Multimeter Readings?",
          desc: "Separate a faulty part from bad probe contact, flat batteries or noise.",
        },
        {
          href: "/multimeters/how-to-measure-resistance-in-a-parallel-circuit",
          title: "How to Measure Resistance in a Parallel Circuit",
          desc: "Why in-circuit resistance readings come out low, and how to work around it.",
        },
      ]}
    >
      <Callout title="Resistance checks need the power off">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Unplug the device or remove its battery before any resistance measurement. Only the voltage-divider
            check later in this guide is done powered.
          </li>
          <li>
            In amplifiers and other mains-powered gear, filter capacitors can stay charged after unplugging.
            Discharge them before reaching inside, and keep powered tests to low-voltage circuits you understand.
          </li>
        </ul>
      </Callout>

      <section>
        <StepHeading n={1} id="identify-the-pins">Identify the end pins and the wiper</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A standard three-terminal pot has a resistive track with a pin at each end and a sliding contact,
          the wiper, connected to the third pin. On most rotary and slide pots the wiper is the middle pin, but
          trimmers and PCB parts sometimes differ, so confirm with the meter rather than assuming.
        </p>
        <Figure caption={<>Pins 1 and 3 connect to the ends of the track; pin 2 follows the wiper. That is why only readings involving pin 2 change with the shaft.</>}>
          <PotPinoutDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          To find the pins on an unknown part, measure all three pairs while turning the shaft. The pair whose
          reading stays fixed is the two ends; the remaining pin is the wiper.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="end-to-end-resistance">Measure end-to-end resistance against the marked value</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Put the probes on the two end pins. The reading should match the marked value, such as 10K or 103,
          within tolerance, and it should not move when you turn the shaft. Common carbon pots are often rated
          at ±20%, so a 10 kΩ part anywhere from about 8 kΩ to 12 kΩ is normal; cermet and precision parts are
          tighter. Check the datasheet when it matters.
        </p>
        <p className="text-muted leading-7">
          OL here means the track is broken or a terminal has cracked away. A value far outside tolerance, or one
          that changes with rotation, points to a damaged track or a misidentified pin.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="sweep-the-wiper">Sweep the wiper and watch for dropouts</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Move one probe to the wiper and keep the other on an end pin. Turn the shaft slowly from one stop to the
          other. A healthy pot&apos;s reading rises or falls steadily, from a few ohms at one end (the end
          resistance) to close to the full value at the other. Then repeat against the opposite end pin: the two
          readings at any position should add up to roughly the end-to-end value.
        </p>
        <Figure caption={<>Typical wiper readings for a healthy 10 kΩ linear pot at half rotation. Each side reads about half, and together they make up the total.</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="5.02" unit="kΩ" mode="Ω  wiper to pin 1" />
            <MeterReadout value="4.96" unit="kΩ" mode="Ω  wiper to pin 3" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Watch for a reading that flicks to OL, jumps by a large step, or hesitates and then catches up. Those
          are the meter equivalents of a scratchy or dead spot. Turn slowly and sweep several times, since a digital
          display updates only a few times a second.
        </p>
        <KeyIdea title="Tip for catching brief dropouts">
          A meter with an analog bar graph or a Min/Max function makes short dropouts easier to spot: a Max
          reading of OL after a sweep shows the wiper lost contact somewhere, even if you didn&apos;t see it happen.
        </KeyIdea>
      </section>

      <section>
        <h2 id="linear-vs-log-taper" className="text-xl font-semibold mb-3">Linear vs log taper readings at mid-rotation</h2>
        <p className="text-muted leading-7 mb-4">
          The taper describes how resistance spreads across the rotation. A linear pot reads about half its value
          at the midpoint. A log (audio) pot reads much less at the midpoint, commonly around 10% to 15% of its
          value measured from the low end, then climbs steeply. Many carbon audio pots approximate the curve with
          two straight segments, which is what the figures below assume.
        </p>
        <Figure caption={<>Wiper-to-low-end resistance for a 10 kΩ pot. A log pot reading 1 kΩ at mid-rotation is behaving correctly, not failing.</>}>
          <TaperChart />
        </Figure>
        <DataTable
          head={["Rotation", "Linear (B) 10 kΩ", "Typical log (A) 10 kΩ"]}
          rows={[
            ["0% (stop)", "A few ohms", "A few ohms"],
            ["25%", "≈ 2.5 kΩ", "≈ 0.5 kΩ"],
            ["50%", "≈ 5 kΩ", "≈ 1 kΩ"],
            ["75%", "≈ 7.5 kΩ", "≈ 5.5 kΩ"],
            ["100% (stop)", "≈ 10 kΩ", "≈ 10 kΩ"],
          ]}
          mono={[1, 2]}
        />
        <p className="text-muted leading-7 mt-4">
          The log column is approximate; real curves vary by manufacturer. Measure from the other end and a log pot
          reads about 9 kΩ at the midpoint instead.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="in-circuit-voltage-check">Check the wiper in circuit as a voltage divider</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Most pots are wired as voltage dividers: one end to a supply or signal, the other to ground, and the
          wiper delivering a fraction of the voltage. With the circuit powered, set the meter to DC volts, put the
          black probe on the grounded end and the red probe on the wiper, and turn the shaft. On a 5 V divider
          the reading should sweep smoothly from near 0 V to near 5 V. This is the same voltage measurement
          explained in{" "}
          <Link href="/multimeters/how-to-measure-voltage-across-a-resistor" className={link}>
            measuring voltage across a resistor
          </Link>
          , and it avoids the parallel-path errors that affect in-circuit resistance readings.
        </p>
        <FlowDiagram
          steps={[
            { label: "Identify pins", sub: "Fixed pair = ends" },
            { label: "End to end", sub: "Marked value ± tolerance" },
            { label: "Wiper sweep", sub: "Smooth, no OL flashes" },
            { label: "Taper check", sub: "Mid reading fits A or B" },
            { label: "Powered check", sub: "0 V to supply, smooth" },
          ]}
        />
      </section>

      <section>
        <h2 id="reading-the-results" className="text-xl font-semibold mb-3">Reading the results</h2>
        <DataTable
          head={["What the meter shows", "What it usually means"]}
          rows={[
            ["Correct end-to-end value, smooth sweep", "Good potentiometer"],
            ["OL end to end", "Open track or broken terminal: replace"],
            ["OL flashes or jumps during the sweep", "Dirty or worn track under the wiper"],
            ["Wiper reading stuck at one value", "Wiper detached from the shaft, or the shaft is slipping"],
            ["Wiper readings don't add up to the total", "Probe on the wrong pin, or a poor wiper contact"],
            ["Mid-rotation reading unexpected", "Check taper: a log pot reads low at the midpoint"],
          ]}
        />
      </section>

      <section>
        <h2 id="clean-or-replace" className="text-xl font-semibold mb-3">Clean or replace the potentiometer?</h2>
        <p className="text-muted leading-7 mb-4">
          Cleaning is worth trying when the end-to-end value is correct and the problem is crackle or brief
          dropouts. Spray a small amount of electronics contact cleaner into the opening near the terminals, then
          rotate the shaft fully back and forth a dozen or so times and test again. Avoid general-purpose
          lubricants, which can attract dust or attack the track.
        </p>
        <p className="text-muted leading-7">
          Replace the pot if the track is open, the value is out of tolerance, a dead spot returns after cleaning,
          or the part is sealed. Match the resistance, the taper letter, the shaft style and the mounting, and in
          power circuits the wattage rating too.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter suits a potentiometer test</h2>
        <p className="text-muted leading-7 mb-6">
          Any digital meter with resistance and DC volts ranges can run every step above. Auto-ranging saves you
          switching ranges as the wiper reading climbs from ohms to kilohms. If you&apos;re new to the resistance
          and voltage modes, read{" "}
          <Link href="/multimeters/how-to-use-a-multimeter" className={link}>
            how to use a multimeter
          </Link>{" "}
          first, and for wider comparisons see our{" "}
          <Link href="/multimeters/best-multimeters" className={link}>
            best multimeters
          </Link>{" "}
          roundup.
        </p>
        <ProductStrip
          title="Meters in our reviews"
          items={[
            {
              name: "Fluke 87V",
              image: fluke87.image,
              alt: "Fluke 87V industrial True RMS digital multimeter",
              href: "/multimeters/fluke-87v-review",
              note: "Analog bar graph that tracks fast-changing signals, plus a 19,999-count high-resolution mode.",
            },
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR True RMS digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "True RMS, 6,000-count, auto and manual ranging, aimed at electronics and microcontroller work.",
            },
            {
              name: "KAIWEETS KM200s",
              image: kaiweets.image,
              alt: "KAIWEETS KM200s True RMS digital multimeter",
              href: "/multimeters/kaiweets-km200s-review",
              note: "True RMS with smart auto-ranging and a backlit display. Our budget pick for home use and beginners.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
