import Link from "next/link";
import {
  Callout,
  CircuitDiagram,
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
  "How to measure milliamps with a multimeter: use the mA jack, break the circuit, connect the meter in series, start on the highest range and protect the fuse.";

export const metadata = buildMetadata({
  title: "How to Measure Milliamps With a Multimeter",
  description,
  path: "/multimeters/how-to-measure-milliamps-with-a-multimeter",
});

const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;
const unit = picks.find((p) => p.name === "UNI-T UT139C")!;
const fluke115 = picks.find((p) => p.name === "Fluke 115")!;

const link = "text-accent hover:underline";

export default function HowToMeasureMilliampsWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Measure Milliamps With a Multimeter"
      description={description}
      published="2026-10-21"
      path="/multimeters/how-to-measure-milliamps-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To measure milliamps with a multimeter, you move the red lead to the mA jack, open the circuit,
          and connect the meter in series so the current you want to measure flows through the meter
          itself. It is the one multimeter measurement that changes how you wire things up, and the one
          most likely to blow a fuse. This guide walks through each step, a worked example with the mA
          to amps conversion, and the mistakes that catch most people.
        </>
      }
      aside={{
        image: astro.image,
        alt: "AstroAI DM6000AR digital multimeter with test leads, front view",
        caption: (
          <>
            The AstroAI DM6000AR (True RMS, 6,000-count, auto-ranging) is the electronics-hobby pick in our
            roundup. Current ranges and fuse ratings differ between meters, so check the markings beside
            your own meter&apos;s jacks. See our{" "}
            <Link href="/multimeters/astroai-dm6000ar-review" className={link}>
              DM6000AR review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "find-the-current-jacks", label: "Find the mA and A jacks" },
        { id: "power-down-and-break", label: "Power down and break the circuit" },
        { id: "connect-in-series", label: "Connect the meter in series" },
        { id: "start-on-highest-range", label: "Start on the highest range" },
        { id: "read-and-convert", label: "Read and convert mA to A" },
        { id: "fuse-protection", label: "How the fuses protect your meter" },
        { id: "common-mistakes", label: "Common mistakes" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "Can I measure milliamps on the 10 A setting?",
          a: "Yes, and it is the safe way to start when you do not know the current. The catch is resolution: on many meters the 10 A range only shows hundredths of an amp, so 20 mA appears as 0.02 A and smaller currents may read zero. Once you know the current is within the mA rating, move to the mA jack for a finer reading.",
        },
        {
          q: "Why does my multimeter read zero when measuring current?",
          a: "The most common causes are a blown mA fuse, the red lead still in the voltage jack, the dial on the wrong current range or on AC instead of DC, or the meter connected across the circuit instead of in series. Check that the circuit is actually switched on, then test the fuse as your manual describes.",
        },
        {
          q: "How do I know if the mA fuse in my multimeter is blown?",
          a: "A blown mA fuse usually shows up as a steady zero on the mA range while the 10 A range still reads current on the same circuit. Many manuals describe a quick check using the resistance range and the jacks. Otherwise open the case with the leads removed and test the fuse for continuity. Replace it only with the exact type and rating listed.",
        },
        {
          q: "How many milliamps are in an amp?",
          a: "There are 1,000 milliamps in one amp, so divide milliamps by 1,000 to get amps and multiply amps by 1,000 to get milliamps. For example, 250 mA is 0.25 A and 0.045 A is 45 mA. One milliamp is also 1,000 microamps, which matters on meters that have a separate µA range.",
        },
        {
          q: "Do I need a True RMS meter to measure milliamps?",
          a: "Not for steady DC current, which is what most hobby and battery-powered circuits draw. True RMS matters when you measure AC current that is not a clean sine wave, such as current drawn by switching supplies or motor drives. For mA readings on DC circuits, any meter with a fused mA range does the job.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-measure-parasitic-battery-drain",
          title: "How to Measure Parasitic Battery Drain",
          desc: "The same series connection on a car battery: start on the 10 A range, wait for sleep, then step down.",
        },
        {
          href: "/multimeters/how-to-use-a-multimeter",
          title: "How to Use a Multimeter",
          desc: "Every mode on the dial, from DC volts and resistance to continuity, explained for beginners.",
        },
      ]}
    >
      <Callout title="Safety first: current mode is a near short circuit">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            In current mode the meter has a very low resistance between its leads. Touching the probes
            across a battery, a power supply output or any other voltage source shorts it through the
            meter. At best that blows the fuse; with a large battery and no fuse it can damage the meter
            and cause burns.
          </li>
          <li>
            Only open and probe circuits that are low-voltage DC, such as battery-powered projects,
            microcontroller boards and bench-supply experiments. Inserting a meter in series with a mains
            circuit is not a beginner job; use a{" "}
            <Link href="/multimeters/clamp-meter-buying-guide" className={link}>
              clamp meter
            </Link>{" "}
            or an electrician instead.
          </li>
          <li>
            When you finish, move the red lead back to the V/Ω jack straight away so your next voltage
            check does not short anything out.
          </li>
        </ul>
      </Callout>

      <section>
        <StepHeading n={1} id="find-the-current-jacks">Find the mA and A jacks on your meter</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Most digital multimeters have three or four input jacks. The black lead always stays in COM. For
          voltage and resistance the red lead goes in the V/Ω jack, but current uses one of the separate
          current jacks, each with its own fuse inside the meter. The maximum current and fuse rating are
          usually printed next to each jack.
        </p>
        <InfoCards
          items={[
            { label: "COM", desc: "Common, the black lead. It stays here for every measurement." },
            { label: "V Ω", desc: "Voltage, resistance and continuity. Never use it for current." },
            { label: "mA (or µA/mA)", desc: "Small currents, typically up to a few hundred milliamps. Protected by a lower-rated fuse." },
            { label: "A (often 10 A)", desc: "Large or unknown currents. Higher-rated fuse, and many meters limit how long you can measure at full current." },
            { label: "Dial", desc: "Set it to the current range that matches the jack, and to DC for battery and electronics work." },
            { label: "Not all meters", desc: "Some compact meters have one shared current jack or none at all. Check your manual." },
          ]}
        />
        <DataTable
          head={["Range / jack", "Typical use", "What to watch"]}
          rows={[
            ["µA (where fitted)", "Sleep and standby current of sensors and microcontrollers", "Often shares the mA jack; check the manual"],
            ["mA", "LEDs, small boards, relays, small loads", "Exceeding the marked maximum blows its fuse"],
            ["10 A (or A)", "Motors, lamps, car circuits, any unknown current", "Lower resolution; time limits at high current on many meters"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={2} id="power-down-and-break">Power down and break the circuit</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A voltmeter reads the difference between two points on a working circuit, but an ammeter has to
          count every bit of charge passing one point. The only way to do that is to make the current
          flow through the meter, which means opening the circuit and letting the meter bridge the gap.
        </p>
        <p className="text-muted leading-7">
          Switch off or disconnect the power first. Then choose a break point: unplug a battery lead,
          lift one leg of a resistor, remove a jumper wire on a breadboard, or disconnect the supply wire
          to the load. Any point in a simple series loop carries the same current, so pick whichever is
          easiest to reach. In a circuit with branches, break the specific branch you want to measure.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="connect-in-series">Connect the meter in series</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Put the red lead in the mA jack and the black lead in COM. Connect the red probe to the side of
          the break that leads back to the positive supply, and the black probe to the side that leads on
          to the load. The meter now forms part of the wire. If you reverse them, a digital meter simply
          shows a minus sign; nothing is damaged.
        </p>
        <Figure
          caption={
            <>
              The meter replaces a section of wire, so all of the current passes through it. With a 5 V
              supply and a 250 Ω resistor, Ohm&apos;s law predicts 5 ÷ 250 = 0.02 A, which is 20 mA.
            </>
          }
        >
          <CircuitDiagram
            mode="series"
            meter="mA"
            source="5 V supply"
            load="250 Ω"
            note="I = V ÷ R = 5 V ÷ 250 Ω = 0.02 A = 20 mA"
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Use alligator clips or clip-on probe tips if you can. Holding two probes against a circuit by
          hand for a minute is awkward, and a slipping probe briefly opens the circuit, which can reset a
          microcontroller and change what you are trying to measure.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="start-on-highest-range">Start on the highest range, then step down</StepHeading>
        <p className="text-muted leading-7 mb-4">
          If you do not know roughly how much current the circuit draws, start with the red lead in the
          10 A jack and the dial on the A range. Power the circuit and read the value. If it is comfortably
          below the maximum marked on the mA jack, switch the power off, move the red lead to the mA jack,
          select the mA range and power up again.
        </p>
        <p className="text-muted leading-7">
          Always move the lead with the power off. Changing jacks or ranges on a live circuit
          momentarily breaks the current path and can make the probes spark or slip, and pushing a large
          current into the mA jack even briefly can blow its fuse. Auto-ranging meters still need you to choose the correct jack; they
          only pick the decimal point within that jack&apos;s range.
        </p>
        <div className="mt-5">
          <KeyIdea title="Why not just stay on 10 A?">
            The 10 A range is built to survive large currents, so it shows coarse steps. On many meters it
            reads only to 0.01 A, which turns a 3 mA sleep current into a reading of 0.00. The mA range
            resolves far smaller steps, so once you know the current is small enough, use it.
          </KeyIdea>
        </div>
      </section>

      <section>
        <StepHeading n={5} id="read-and-convert">Read the display and convert mA to A</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Back to the example circuit: a 5 V supply driving a 250 Ω resistor. The prediction is 20 mA, and
          the same current shows very differently on the two ranges.
        </p>
        <Figure
          caption={
            <>
              Left: the mA range shows 20.0 mA. Right: the same 20 mA on a 10 A range that reads in
              hundredths of an amp shows 0.02 A. Same current, 1,000 mA per amp, but the mA range gives
              far finer detail.
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="20.0" unit="mA DC" mode="DC mA" />
            <MeterReadout value="0.02" unit="A DC" mode="DC A (10 A jack)" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-5 mb-4">
          To convert, remember that 1 A = 1,000 mA and 1 mA = 1,000 µA. Divide milliamps by 1,000 to get
          amps; multiply amps by 1,000 to get milliamps.
        </p>
        <DataTable
          head={["Reading", "Conversion", "Result"]}
          rows={[
            ["20 mA", "20 ÷ 1,000", "0.02 A"],
            ["250 mA", "250 ÷ 1,000", "0.25 A"],
            ["0.045 A", "0.045 × 1,000", "45 mA"],
            ["850 µA", "850 ÷ 1,000", "0.85 mA"],
            ["1.2 A", "1.2 × 1,000", "1,200 mA"],
          ]}
          mono={[1, 2]}
        />
        <p className="text-muted leading-7 mt-4">
          In practice the meter will rarely show exactly 20.0. Resistors have a tolerance (often ±1% or
          ±5%), the supply is never exactly 5 V, and the meter itself drops a small voltage across its
          internal shunt resistor, known as burden voltage. On a 5 V circuit that drop barely matters; on
          a 3.3 V or lower circuit drawing tens of milliamps it can noticeably reduce the current. If the
          reading looks a little low, that is a likely reason. Also check the resistor&apos;s power rating:
          5 V × 0.02 A = 0.1 W, so a common 1/4 W resistor is fine here.
        </p>
      </section>

      <section>
        <h2 id="fuse-protection" className="text-xl font-semibold mb-3">How the fuses protect your meter</h2>
        <p className="text-muted leading-7 mb-4">
          Inside the meter, current flows through a very low-value shunt resistor and the meter measures
          the tiny voltage across it. That shunt can only handle so much, so each current jack has its own
          fuse. The mA fuse is a lower rating than the 10 A fuse, which is why the mA jack is the one people
          blow most often.
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <strong className="text-foreground">Replace like for like.</strong> Use the exact current
            rating, voltage rating and fuse type listed in the manual. Quality meters use high
            breaking-capacity fuses that can safely interrupt a fault; a cheap glass fuse of the same amp
            rating is not equivalent.
          </li>
          <li>
            <strong className="text-foreground">A blown fuse is a symptom.</strong> It usually means the
            meter was connected across a voltage source, or the current was higher than the jack allows.
            Work out which before you try again.
          </li>
          <li>
            <strong className="text-foreground">Respect time limits.</strong> Many meters allow full-scale
            current on the 10 A jack only for a short time followed by a cool-down period. The manual
            gives the figures for your model.
          </li>
        </ul>
      </section>

      <section>
        <h2 id="common-mistakes" className="text-xl font-semibold mb-3">Common mistakes when measuring milliamps</h2>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <strong className="text-foreground">Probing across a battery in mA mode.</strong> This is the
            classic fuse-killer. The meter is a near short, so the battery dumps current through it. Current
            is always measured in series, never across a voltage source.
          </li>
          <li>
            <strong className="text-foreground">Forgetting to move the lead back.</strong> Leave the red
            lead in the mA jack, then try to check a battery voltage, and you short the battery through
            the meter. Make returning the lead to V/Ω a habit.
          </li>
          <li>
            <strong className="text-foreground">Wrong dial setting.</strong> The lead is in the mA jack but
            the dial is on V or on AC. You get zero, nonsense, or a blown fuse depending on the meter.
          </li>
          <li>
            <strong className="text-foreground">Measuring the wrong branch.</strong> In a circuit with
            parallel paths, breaking the main supply wire gives the total, not the current in one LED or
            one module.
          </li>
          <li>
            <strong className="text-foreground">Ignoring start-up surges.</strong> Motors, capacitors and
            some boards draw a brief surge when powered. If that surge can exceed the mA rating, start
            on the 10 A jack even if the steady current is small.
          </li>
        </ul>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which meter to use for milliamp measurements</h2>
        <p className="text-muted leading-7 mb-6">
          Almost any digital multimeter with a fused current input can measure milliamps; check the
          manual for the ranges and fuse ratings before you buy or before you measure. For electronics
          work, a higher display count helps you read small currents with more digits. The meters below
          are from our{" "}
          <Link href="/multimeters/best-multimeters" className={link}>
            best multimeters
          </Link>{" "}
          roundup, and the{" "}
          <Link href="/multimeters/multimeter-buying-guide" className={link}>
            multimeter buying guide
          </Link>{" "}
          explains display counts, True RMS and CAT ratings. Measuring battery drain on a car is the same
          idea at a larger scale; see{" "}
          <Link href="/multimeters/how-to-measure-parasitic-battery-drain" className={link}>
            how to measure parasitic battery drain
          </Link>
          .
        </p>
        <ProductStrip
          title="Meters in our reviews"
          items={[
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "True RMS, 6,000-count, auto-ranging. Our pick for low-voltage microcontroller and electronics projects.",
            },
            {
              name: "UNI-T UT139C",
              image: unit.image,
              alt: "UNI-T UT139C digital multimeter",
              href: "/multimeters/uni-t-ut139c-review",
              note: "True RMS and auto-ranging with a 6,000-count display and a CAT III 600V rating, at a budget price.",
            },
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "True RMS, auto-ranging, CAT III 600V. The 117's reliability without NCV or LoZ, for field and electronics work.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
