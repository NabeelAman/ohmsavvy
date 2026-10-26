import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
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
  "How to measure resistance in ohms with a digital multimeter: setting the dial, Ω, kΩ and MΩ, lead resistance, color codes, tolerance and OL readings.";

export const metadata = buildMetadata({
  title: "Measure Resistance in Ohms With a Multimeter",
  description,
  path: "/multimeters/how-to-measure-resistance-in-ohms-with-a-digital-multimeter",
});

const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;
const unit = picks.find((p) => p.name === "UNI-T UT139C")!;
const fluke87 = picks.find((p) => p.name === "Fluke 87V")!;

const link = "text-accent hover:underline";

/** A resistor with its color bands and the two meter probes on its leads. */
function ResistorProbeDiagram() {
  return (
    <svg viewBox="0 0 340 150" className="w-full h-auto" role="img" aria-label="A 4.7 kilohm resistor with yellow, violet, red and gold bands, probed at each lead by a multimeter">
      <line x1="20" y1="70" x2="110" y2="70" className="stroke-foreground" strokeWidth="2" />
      <line x1="230" y1="70" x2="320" y2="70" className="stroke-foreground" strokeWidth="2" />
      <rect x="110" y="50" width="120" height="40" rx="14" fill="#d9c49a" className="stroke-foreground" strokeWidth="1.5" />
      <rect x="128" y="50" width="10" height="40" fill="#e8c200" />
      <rect x="148" y="50" width="10" height="40" fill="#7b3fb5" />
      <rect x="168" y="50" width="10" height="40" fill="#d63a2f" />
      <rect x="204" y="50" width="10" height="40" fill="#c9a227" />
      {/* probes */}
      <path d="M38 70 L24 110" stroke="#d63a2f" strokeWidth="5" strokeLinecap="round" />
      <path d="M302 70 L316 110" className="stroke-foreground" strokeWidth="5" strokeLinecap="round" />
      <g fontSize="10.5" className="fill-muted" textAnchor="middle">
        <text x="170" y="38">band 1, 2, 3 then tolerance band</text>
        <text x="170" y="110">yellow 4 · violet 7 · red ×100 · gold ±5%</text>
        <text x="30" y="128" className="fill-foreground">red (V/Ω)</text>
        <text x="310" y="128" className="fill-foreground">black (COM)</text>
        <text x="170" y="144" className="fill-accent">47 × 100 = 4,700 Ω = 4.7 kΩ</text>
      </g>
    </svg>
  );
}

export default function HowToMeasureResistanceInOhmsPage() {
  return (
    <HowToShell
      title="How to Measure Resistance in Ohms With a Digital Multimeter"
      description={description}
      published="2026-10-22"
      path="/multimeters/how-to-measure-resistance-in-ohms-with-a-digital-multimeter"
      category="multimeters"
      intro={
        <>
          To measure resistance in ohms with a digital multimeter, power off the circuit, plug the black lead into COM
          and the red into the V/Ω socket, turn the dial to Ω and touch one probe to each end of the component. The
          display shows the value in ohms (Ω), kilohms (kΩ) or megohms (MΩ). Getting a trustworthy number takes a
          little more than that, though: knowing which unit is on screen, subtracting the leads&apos; own
          resistance on low values, and understanding why the same resistor can read differently on a circuit
          board. This guide covers each of those, with worked examples.
        </>
      }
      aside={{
        image: astro.image,
        alt: "AstroAI DM6000AR True RMS digital multimeter, front view",
        caption: (
          <>
            The AstroAI DM6000AR offers both auto and manual ranging with a 6,000-count display, which makes it a
            handy meter to learn resistance ranges on. See our{" "}
            <Link href="/multimeters/astroai-dm6000ar-review" className={link}>
              DM6000AR review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-is-an-ohm", label: "What an ohm is" },
        { id: "units-and-prefixes", label: "Ω, kΩ and MΩ" },
        { id: "set-up-the-meter", label: "Set up the meter" },
        { id: "null-the-leads", label: "Null the lead resistance" },
        { id: "take-the-reading", label: "Take the reading" },
        { id: "manual-ranges", label: "Choosing a manual range" },
        { id: "color-code", label: "Check against the color code" },
        { id: "tolerance", label: "Is it within tolerance?" },
        { id: "in-circuit", label: "Why in-circuit readings mislead" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "Why does my multimeter show OL on the ohms setting?",
          a: "OL means the resistance is higher than the selected range can display. With the probes apart it is normal, because air is an open circuit. On a component it means either the range is too low (step up on a manual meter) or the part is open circuit, such as a broken resistor, a blown fuse or a burnt-out element.",
        },
        {
          q: "Does it matter which way round the probes go when measuring resistance?",
          a: "Not for a plain resistor, which reads the same in both directions. It does matter for anything containing a diode or transistor junction, where the reading changes with polarity. If a component gives two very different readings when you swap the probes, it is not a simple resistance.",
        },
        {
          q: "Why do I get a slightly different reading each time?",
          a: "Small variations come from probe pressure, dirty contacts and the meter's last digit. Body resistance also matters on high values: holding both probe tips and the resistor leads with your fingers puts your skin in parallel, which noticeably lowers readings in the hundreds of kilohms and above. Hold the probes by their grips only.",
        },
        {
          q: "Can I measure resistance with the circuit switched on?",
          a: "No. The meter measures resistance by passing its own small test current and reading the voltage it produces. Any external voltage corrupts that and can damage the meter. Switch off, unplug, remove batteries and discharge capacitors before using the Ω range.",
        },
        {
          q: "What does a reading like 0.000 MΩ mean?",
          a: "You are on a range far too high for the part, so a small value rounds to zero. Auto-ranging meters avoid this, but on a manual meter step down until the reading shows several significant digits without going OL.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-measure-resistance-in-a-parallel-circuit",
          title: "How to Measure Resistance in a Parallel Circuit",
          desc: "Why parallel paths lower the reading, and how to calculate what you should expect.",
        },
        {
          href: "/multimeters/what-does-ol-mean-on-a-multimeter",
          title: "What Does OL Mean on a Multimeter?",
          desc: "Over limit, open circuit or wrong range: how to tell which one you are looking at.",
        },
      ]}
    >
      <Callout title="Resistance is a dead-circuit test">
        <ul className="space-y-2 list-disc pl-5">
          <li>Switch off and disconnect power, and remove batteries from the device you are testing.</li>
          <li>
            Discharge any large capacitors before probing. Stored charge can upset the reading and, in mains
            equipment, give a dangerous shock.
          </li>
          <li>
            Many meters protect the Ω range against an accidental voltage, but that protection has limits. Do not
            rely on it.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="what-is-an-ohm" className="text-xl font-semibold mb-3">What an ohm is, and how the meter finds it</h2>
        <p className="text-muted leading-7">
          Resistance is how strongly something opposes the flow of current, measured in ohms (Ω). One ohm allows one
          amp to flow when one volt is applied, which is Ohm&apos;s law: R = V ÷ I. A digital multimeter uses that
          relationship directly. On the Ω range it drives a small, known current through whatever sits between the
          probes, measures the voltage that appears, and divides one by the other. That is why the circuit must be
          unpowered: any other voltage present gets folded into the sum.
        </p>
      </section>

      <section>
        <h2 id="units-and-prefixes" className="text-xl font-semibold mb-3">Ω, kΩ and MΩ: reading the units</h2>
        <p className="text-muted leading-7 mb-4">
          The most common resistance mistake is misreading the prefix. An auto-ranging meter moves the decimal point
          and changes the unit as the value changes, so always read the small unit symbol beside the number.
        </p>
        <DataTable
          head={["Display shows", "Unit", "Equals", "Typical example"]}
          rows={[
            ["0.8", "Ω (ohms)", "0.8 Ω", "Shorted probes, a fuse, a speaker coil"],
            ["470.0", "Ω (ohms)", "470 Ω", "LED current-limiting resistor"],
            ["4.70", "kΩ (kilohms)", "4,700 Ω", "Pull-up resistor"],
            ["100.0", "kΩ (kilohms)", "100,000 Ω", "Bias resistor, potentiometer"],
            ["1.00", "MΩ (megohms)", "1,000,000 Ω", "High-value resistor, scope input"],
          ]}
          mono={[0, 2]}
        />
      </section>

      <section>
        <StepHeading n={1} id="set-up-the-meter">Set up the meter</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Put the black lead in COM and the red lead in the socket marked V/Ω (often shared with volts). Turn the
          dial to the Ω symbol. On some meters Ω shares a dial position with continuity, diode and capacitance, and
          a SELECT or FUNC button steps between them; make sure the display shows Ω and not the diode or beep
          symbol.
        </p>
        <InfoCards
          items={[
            { label: "COM", desc: "Black lead. The common or negative input for every measurement." },
            { label: "V/Ω", desc: "Red lead for resistance. Never the A or mA socket." },
            { label: "Ω on the dial", desc: "May share a position with continuity, diode or capacitance." },
            { label: "RANGE", desc: "Forces manual ranging on auto meters; press again to step range." },
            { label: "REL / Δ", desc: "Relative mode: zeroes the display, used to null lead resistance." },
            { label: "HOLD", desc: "Freezes the reading so you can look away from awkward test points." },
          ]}
        />
      </section>

      <section>
        <StepHeading n={2} id="null-the-leads">Null the lead resistance</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Touch the probe tips firmly together. The display should show a small number, often a few tenths of an
          ohm: that is the resistance of the leads, probe tips and sockets. It does not matter when you measure
          10 kΩ, but it is a large error on a 1 Ω part. Press REL (or Δ) while the tips are shorted to subtract it
          automatically, or simply note it and take it away from later readings.
        </p>
        <Figure
          caption={
            <>
              Example readings: shorted leads reading 0.3 Ω (left), then a 4.7 kΩ resistor reading 4.69 kΩ
              (right). On a value this size the 0.3 Ω of lead resistance is far too small to matter.
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="0.3" unit="Ω" mode="Ω  leads shorted" />
            <MeterReadout value="4.69" unit="kΩ" mode="Ω  4.7k resistor" />
          </div>
        </Figure>
      </section>

      <section>
        <StepHeading n={3} id="take-the-reading">Take the reading</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Touch one probe to each lead or terminal of the component and wait for the display to settle. Press
          firmly enough to break through oxide on old leads. Keep your fingers off the metal: on values above about
          100 kΩ, your own skin resistance in parallel will drag the reading down.
        </p>
        <Figure caption={<>Reading a 4-band resistor: the first two bands give digits, the third the multiplier and the last the tolerance.</>}>
          <ResistorProbeDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="manual-ranges" className="text-xl font-semibold mb-3">Choosing a range on a manual meter</h2>
        <p className="text-muted leading-7 mb-4">
          On a manual-ranging meter, the number printed by each Ω position is the highest value it can show. Pick
          the lowest range that is still above the value you expect. The table shows what a 4.7 kΩ resistor
          typically looks like on each range of a common 2,000-count meter.
        </p>
        <DataTable
          head={["Range selected", "Display", "Verdict"]}
          rows={[
            ["200 Ω", "1 (over range)", "Too low"],
            ["2 kΩ", "1 (over range)", "Too low"],
            ["20 kΩ", "4.69", "Best: most digits of detail"],
            ["200 kΩ", "4.7", "Readable, less resolution"],
            ["2 MΩ", "0.005", "Far too high: almost all detail lost"],
          ]}
          mono={[1]}
        />
        <p className="text-muted leading-7 mt-4">
          If the value is unknown, start at the highest range and step down until the reading is no longer near
          zero, stopping just before it shows over range.
        </p>
      </section>

      <section>
        <h2 id="color-code" className="text-xl font-semibold mb-3">Check against the resistor color code</h2>
        <DataTable
          head={["Color", "Digit", "Multiplier", "Tolerance"]}
          rows={[
            ["Black", "0", "×1", "—"],
            ["Brown", "1", "×10", "±1%"],
            ["Red", "2", "×100", "±2%"],
            ["Orange", "3", "×1k", "—"],
            ["Yellow", "4", "×10k", "—"],
            ["Green", "5", "×100k", "±0.5%"],
            ["Blue", "6", "×1M", "±0.25%"],
            ["Violet", "7", "×10M", "±0.1%"],
            ["Gray", "8", "—", "—"],
            ["White", "9", "—", "—"],
            ["Gold", "—", "×0.1", "±5%"],
            ["Silver", "—", "×0.01", "±10%"],
          ]}
        />
        <KeyIdea title="Brown and red bands confuse everyone">
          Under poor light, brown, red and orange are easily mistaken for each other. When the colors are in doubt,
          the meter reading settles it: it is the quickest way to sort a mixed bag of resistors.
        </KeyIdea>
      </section>

      <section>
        <h2 id="tolerance" className="text-xl font-semibold mb-3">Is the reading within tolerance?</h2>
        <p className="text-muted leading-7 mb-4">
          Tolerance is how far a resistor may legitimately be from its marked value. A 4.7 kΩ ±5% part is in spec
          anywhere from 4.465 kΩ to 4.935 kΩ, so 4.69 kΩ is a pass. Your meter adds its own small error on top,
          usually stated as ±(% of reading + counts) in its manual.
        </p>
        <Figure
          caption={
            <>
              How far a 4.7 kΩ resistor may be from its marked value, in either direction, for each common
              tolerance band.
            </>
          }
        >
          <BarChart
            items={[
              { label: "±1% (brown)", value: 47, display: "± 47 Ω" },
              { label: "±2% (red)", value: 94, display: "± 94 Ω" },
              { label: "±5% (gold)", value: 235, display: "± 235 Ω", highlight: true },
              { label: "±10% (silver)", value: 470, display: "± 470 Ω" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="in-circuit" className="text-xl font-semibold mb-3">Why in-circuit readings mislead</h2>
        <p className="text-muted leading-7 mb-4">
          On a board, the meter cannot tell your resistor from everything else wired between the same two points.
          Any parallel path lowers the reading, so an in-circuit measurement is usually lower than the marked value.
          Semiconductor junctions can also conduct the meter&apos;s test current and skew the result. For a
          definitive answer, lift one leg of the part and measure it on its own. Our guide to{" "}
          <Link href="/multimeters/how-to-measure-resistance-in-a-parallel-circuit" className={link}>
            measuring resistance in a parallel circuit
          </Link>{" "}
          shows how to calculate what the meter should see.
        </p>
        <Figure caption={<>A reliable resistance measurement, step by step.</>}>
          <FlowDiagram
            steps={[
              { label: "Power off", sub: "Unplug, discharge" },
              { label: "Leads in", sub: "COM and V/Ω" },
              { label: "Null", sub: "Short tips, press REL" },
              { label: "Probe", sub: "Fingers off the metal" },
              { label: "Check", sub: "Unit, then tolerance" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Very low resistances, below about 1 Ω, are hard for an ordinary two-wire meter because contact and lead
          resistance are a similar size to the value itself. Null the leads and press hard; for precise milliohm
          work, a dedicated low-resistance meter is the proper tool.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter to use for resistance</h2>
        <p className="text-muted leading-7 mb-6">
          Every digital multimeter measures resistance. A relative (REL) button and a display with more counts help
          with low values and fine comparisons. For the basics of every other range, start with{" "}
          <Link href="/multimeters/how-to-use-a-multimeter" className={link}>
            how to use a multimeter
          </Link>
          , and see{" "}
          <Link href="/multimeters/multimeter-accuracy-for-electronics-repair" className={link}>
            multimeter accuracy for electronics repair
          </Link>{" "}
          for how to read accuracy specs.
        </p>
        <ProductStrip
          title="Meters from our reviews"
          items={[
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR True RMS digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "True RMS, 6,000-count, auto and manual ranging. Popular for electronics projects.",
            },
            {
              name: "UNI-T UT139C",
              image: unit.image,
              alt: "UNI-T UT139C True RMS digital multimeter",
              href: "/multimeters/uni-t-ut139c-review",
              note: "True RMS, 6,000-count, auto and manual ranging at a budget price.",
            },
            {
              name: "Fluke 87V",
              image: fluke87.image,
              alt: "Fluke 87V industrial digital multimeter",
              href: "/multimeters/fluke-87v-review",
              note: "6,000-count display with a 19,999-count high-resolution mode, useful for fine resistance comparisons.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
