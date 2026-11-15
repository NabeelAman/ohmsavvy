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
  "Test AA batteries with a multimeter on DC volts, then under a small load. Voltage tables for alkaline, NiMH and lithium AA cells show good versus dead.";

export const metadata = buildMetadata({
  title: "How to Test AA Batteries With a Multimeter",
  description,
  path: "/multimeters/how-to-test-aa-batteries-with-a-multimeter",
});

const kaiweets = picks.find((p) => p.name === "KAIWEETS KM200s")!;
const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;
const extech = picks.find((p) => p.name === "Extech EX330")!;

const link = "text-accent hover:underline";

/** AA load test: cell in a holder, a 10 ohm resistor across it, and the meter reading volts across the cell. */
function AaLoadTestDiagram() {
  return (
    <svg
      viewBox="0 0 340 180"
      className="w-full h-auto"
      role="img"
      aria-label="Wiring for a load test on an AA battery: the AA cell sits in a holder with a 10 ohm resistor connected across its terminals, drawing about 150 milliamps, while a multimeter set to DC volts reads the voltage directly across the cell."
    >
      {/* AA cell, horizontal */}
      <rect x="40" y="70" width="110" height="40" rx="6" className="fill-surface stroke-foreground" strokeWidth="2" />
      <rect x="150" y="80" width="8" height="20" rx="2" className="fill-muted stroke-foreground" strokeWidth="1.5" />
      <text x="95" y="94" fontSize="11" fontWeight="700" textAnchor="middle" className="fill-foreground">AA 1.5 V</text>
      <text x="166" y="84" fontSize="11" fontWeight="700" className="fill-foreground">+</text>
      <text x="26" y="94" fontSize="11" fontWeight="700" className="fill-foreground">−</text>
      {/* wires to resistor */}
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        <path d="M158 90 H200 V40 H260" />
        <path d="M40 90 H30 V150 H290 V80" />
        <path d="M290 40 V50" />
        <path d="M260 40 H290" />
      </g>
      <rect x="278" y="50" width="24" height="30" rx="3" className="fill-surface stroke-foreground" strokeWidth="1.8" />
      <text x="272" y="62" fontSize="9" textAnchor="end" className="fill-foreground">10 Ω</text>
      <text x="272" y="74" fontSize="9" textAnchor="end" className="fill-muted">about 150 mA</text>
      {/* voltmeter */}
      <circle cx="110" cy="35" r="18" className="fill-surface stroke-accent" strokeWidth="2" />
      <text x="110" y="39" fontSize="12" fontWeight="700" textAnchor="middle" className="fill-accent">V</text>
      <g className="stroke-accent" strokeWidth="1.4" fill="none" strokeDasharray="4 3">
        <path d="M128 35 H154 V80" />
        <path d="M92 35 H46 V70" />
      </g>
      <text x="110" y="170" fontSize="9" textAnchor="middle" className="fill-muted">read volts across the cell while the load is connected</text>
    </svg>
  );
}

export default function HowToTestAaBatteriesWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test AA Batteries With a Multimeter"
      description={description}
      published="2026-11-15"
      path="/multimeters/how-to-test-aa-batteries-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test AA batteries with a multimeter, set it to DC volts, touch the red probe to the positive bump and
          the black probe to the flat end, and compare the reading with the chemistry: a fresh alkaline AA reads
          about 1.5–1.6 V, a charged NiMH rechargeable about 1.3–1.4 V, and a lithium AA about 1.7–1.8 V. For a
          verdict you can trust, repeat the reading with a small load across the cell, because a tired battery
          can show a healthy voltage with no current flowing and then collapse the moment a device asks for
          power. Below are the voltage tables for each AA type, a simple load test and the reasons a
          &quot;good&quot; reading can still fail in a device.
        </>
      }
      aside={{
        image: kaiweets.image,
        alt: "KAIWEETS KM200s multimeter for testing AA battery voltage",
        caption: (
          <>
            Any auto-ranging meter, such as the KAIWEETS KM200s, reads an AA cell on DC volts. See our{" "}
            <Link href="/multimeters/kaiweets-km200s-review" className={link}>
              KAIWEETS KM200s review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "aa-chemistries", label: "Know which AA you have" },
        { id: "causes", label: "Symptoms and likely causes" },
        { id: "set-up", label: "1. Set up the meter" },
        { id: "open-circuit", label: "2. Read the open-circuit voltage" },
        { id: "load-test", label: "3. Run a load test" },
        { id: "interpret", label: "4. Interpret the numbers" },
        { id: "sort", label: "5. Sort, recharge or recycle" },
        { id: "voltage-chart", label: "AA voltage chart" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "What voltage should a good AA battery read?",
          a: "A new alkaline AA usually reads about 1.55 to 1.65 V with no load and is still useful down to roughly 1.2 V for most devices. A charged NiMH rechargeable rests around 1.3 to 1.4 V. A fresh lithium AA, such as Energizer Ultimate Lithium, typically reads about 1.7 to 1.8 V. Always compare against the right chemistry.",
        },
        {
          q: "At what voltage is an AA battery dead?",
          a: "Battery makers usually rate alkaline capacity down to an end point of about 0.8 to 0.9 V under load, but many devices quit much earlier, often around 1.1 to 1.2 V. A NiMH cell is considered empty at about 1.0 V under load. If a cell reads under about 1.2 V resting, most gadgets will treat it as dead.",
        },
        {
          q: "Why does my AA battery read 1.5 V but not work?",
          a: "An unloaded reading barely loads the cell, because a multimeter draws almost no current. A worn alkaline cell has high internal resistance, so its voltage falls sharply when a device draws 100 mA or more. Test it with a small resistor across it, or read it inside the device while it is running, and the weak cell shows up.",
        },
        {
          q: "Can I test a rechargeable AA the same way?",
          a: "Yes, but use the NiMH numbers. A NiMH AA has a nominal 1.2 V and sits around 1.25 V for most of its discharge, so 1.25 V doesn't mean half empty the way it would for alkaline. Charge it, rest it an hour and test under load. A cell that drops below 1.1 V on a 150 mA load soon after charging has lost capacity.",
        },
        {
          q: "Is it safe to put a multimeter on amps across an AA battery?",
          a: "No. On the amps setting the meter is nearly a short circuit, so placing the probes across a battery pushes a very large current through the meter's fuse and can heat the cell. It also doesn't tell you anything useful about health. Use DC volts, with a resistor as the load when you want a loaded reading.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-check-a-9v-battery-with-a-multimeter-under-load",
          title: "How to Check a 9V Battery Under Load",
          desc: "The same load-test idea applied to a 9 V battery, with resistor sizing.",
        },
        {
          href: "/multimeters/how-to-test-a-coin-cell-battery-with-a-multimeter",
          title: "How to Test a Coin Cell Battery",
          desc: "CR2032 and button cells, where unloaded readings mislead even more.",
        },
      ]}
    >
      <Callout title="Small cells, real hazards">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Never short an AA, and don&apos;t carry loose cells in a pocket with keys or coins. A shorted lithium or
            NiMH AA can get hot enough to burn skin.
          </li>
          <li>
            Leaking alkaline cells contain potassium hydroxide, which irritates skin and eyes. Wear gloves, wipe
            corroded contacts with a cotton swab dipped in a little vinegar or lemon juice, and wash your hands.
          </li>
          <li>
            Never try to recharge alkaline or lithium primary AAs. Only NiMH (or cells marked as rechargeable) go in
            a charger.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="aa-chemistries" className="text-xl font-semibold mb-3">Know which AA you have first</h2>
        <p className="text-muted leading-7 mb-4">
          &quot;AA&quot; is a size, not a chemistry, and the three common types sit at different voltages. Alkaline
          AAs, the everyday disposable kind, start around 1.5–1.6 V and slide steadily down as they discharge, so
          voltage is a reasonable fuel gauge. NiMH rechargeables are labeled 1.2 V and hold a flat 1.2–1.3 V for
          most of their run, then fall off a cliff near the end. Lithium primary AAs (lithium iron disulfide,
          sold as &quot;lithium&quot; AA) start high, near 1.7–1.8 V with no load, and stay flat until they are
          almost empty.
        </p>
        <p className="text-muted leading-7">
          The label decides which numbers apply. A NiMH cell at 1.28 V is healthy and well charged; an alkaline
          cell at 1.28 V is more than half used. Mixing up the tables is the most common reason people throw out
          good rechargeables or keep using tired alkalines. There is also a fourth, less common type: 1.5 V
          lithium-ion AAs with a built-in regulator and USB charging. These read a steady 1.5 V until the internal
          circuit cuts off, so voltage tells you almost nothing about how full they are.
        </p>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and likely causes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Reads 1.5 V, device still dead", "High internal resistance", "Load test (step 3)", "Replace the cell"],
            ["Remote works, camera or toy doesn't", "Partly used alkaline, fine for low drain", "Loaded voltage under 1.2 V", "Move it to a clock or remote"],
            ["Rechargeables die fast after charging", "Aged NiMH cells", "Loaded voltage soon after charge", "Replace the set together"],
            ["One cell in a set reads much lower", "Mixed ages or a reversed cell", "Test each cell separately", "Replace the whole set"],
            ["Device dead with good cells", "Corroded or bent contacts", "Continuity across the contacts", "Clean contacts; check the switch"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="set-up">Set up the meter on DC volts</StepHeading>
        <p className="text-muted leading-7">
          Put the black lead in COM and the red lead in the V jack. Turn the dial to DC volts, marked V with a
          straight line (or V⎓). If your meter is manual-ranging, choose the 2 V or 6 V range for the best
          resolution; auto-ranging meters pick it for you. Don&apos;t use the amps jack or an amps setting: across a
          battery that is effectively a short. If your meter has a dedicated battery-test position, read its
          manual; it applies its own small load, which is handy but uses a fixed current you can&apos;t change.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="open-circuit">Read the open-circuit voltage</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Take the cell out of the device. Touch the red probe to the raised positive end and the black probe to
          the flat negative end, and hold steady for a second or two. A minus sign means the probes are reversed;
          the number is still correct. This is the open-circuit voltage: the cell with essentially no current
          flowing, because a digital meter&apos;s input resistance is typically 10 MΩ, so it draws well under a
          microamp.
        </p>
        <Figure caption={<>Illustrative readings: a fresh alkaline AA with no load (left) and the same type of cell after months in a TV remote (right).</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="1.604" unit="V" mode="DC V  new alkaline" />
            <MeterReadout value="1.312" unit="V" mode="DC V  used alkaline" />
          </div>
        </Figure>
      </section>

      <section>
        <StepHeading n={3} id="load-test">Run a simple load test</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The open-circuit number hides internal resistance. To expose it, draw a modest current while you read
          the voltage. A 10 Ω resistor rated for 1/2 W or more works well: by Ohm&apos;s law it draws I = V ÷ R =
          1.5 ÷ 10 = 0.15 A, about 150 mA, which is similar to many toys, flashlights and wireless controllers.
          Power is P = V² ÷ R = 2.25 ÷ 10 ≈ 0.23 W, so a 1/2 W part runs warm but safe for a few seconds.
        </p>
        <Figure caption={<>The AA load test: a 10 Ω resistor across the cell draws about 150 mA while the meter reads the voltage across the cell.</>}>
          <AaLoadTestDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Use a single AA battery holder or tape the resistor leads firmly to the ends, connect the load, wait two
          or three seconds and read the voltage. Then remove the load. You only need a short pulse; leaving the
          resistor on for minutes just drains the cell. No resistor handy? Read the batteries inside the device
          while it is switched on, probing the battery-box contacts, which gives you the voltage at the
          device&apos;s real current.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="interpret">Interpret the open-circuit and loaded numbers</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Subtract the loaded reading from the open-circuit reading. The difference divided by the current
          approximates the internal resistance: R = ΔV ÷ I. Say an alkaline cell reads 1.52 V open and 1.47 V on
          the 10 Ω load. ΔV = 0.05 V, and I ≈ 1.47 ÷ 10 = 0.147 A, so R ≈ 0.05 ÷ 0.147 ≈ 0.34 Ω, which is normal
          for a fresh alkaline AA (makers typically quote a few tenths of an ohm). A cell that reads 1.45 V open
          but 1.15 V loaded has R ≈ 0.30 ÷ 0.115 ≈ 2.6 Ω; it will run a wall clock but not a camera flash.
        </p>
        <Figure caption={<>Approximate voltage drop on a 150 mA load for AA cells in different states (illustrative, room temperature).</>}>
          <BarChart
            items={[
              { label: "New lithium AA", value: 0.03, display: "≈0.03 V", highlight: true },
              { label: "Charged NiMH", value: 0.04, display: "≈0.04 V" },
              { label: "New alkaline", value: 0.05, display: "≈0.05 V" },
              { label: "Worn alkaline", value: 0.3, display: "≈0.30 V" },
            ]}
          />
        </Figure>
        <KeyIdea title="Small drop, good cell">
          A battery that barely moves when you load it has low internal resistance and plenty left to give. A
          battery whose voltage sags several tenths of a volt under a 150 mA load is finished for anything but the
          lightest jobs, no matter what it read on the bench.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={5} id="sort">Sort, recharge or recycle</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Sort alkalines into three piles: above about 1.4 V loaded for high-drain gear, about 1.2–1.4 V for
          clocks and remotes, and anything lower for the recycling bin. Recharge NiMH cells that test low, then
          retest them an hour after charging; a NiMH cell that won&apos;t hold above about 1.2 V on the load test
          right after a full charge has reached the end of its useful life. In multi-cell devices, replace the
          whole set at once, because a weak cell in a series string can be driven into reverse by the stronger
          ones, which is a common cause of leaks.
        </p>
        <Figure caption={<>The AA test in five steps.</>}>
          <FlowDiagram
            steps={[
              { label: "Identify", sub: "Alkaline, NiMH, lithium" },
              { label: "DC volts", sub: "No-load reading" },
              { label: "Load", sub: "10 Ω for 3 s" },
              { label: "Compare", sub: "Drop and table" },
              { label: "Sort", sub: "Use, charge, recycle" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="voltage-chart" className="text-xl font-semibold mb-3">AA battery voltage chart by chemistry</h2>
        <p className="text-muted leading-7 mb-4">
          Typical values at room temperature. Makers&apos; datasheets differ slightly, so use these as guide
          values, and remember that cold weather lowers every reading, especially for alkaline cells.
        </p>
        <DataTable
          head={["State", "Alkaline (open)", "NiMH (rested)", "Lithium AA (open)"]}
          rows={[
            ["New or full", "1.55–1.65 V", "1.35–1.40 V", "1.75–1.80 V"],
            ["About half used", "about 1.35 V", "about 1.25 V", "about 1.70 V"],
            ["Nearly empty", "about 1.20 V", "about 1.15 V", "about 1.50 V"],
            ["Replace or recharge", "under 1.2 V", "under 1.1 V", "under 1.5 V"],
            ["Nominal label", "1.5 V", "1.2 V", "1.5 V"],
          ]}
          mono={[1, 2, 3]}
        />
        <p className="text-muted leading-7 mt-4">
          Lithium AAs have such a flat discharge that a reading of 1.70 V doesn&apos;t mean &quot;about half&quot;
          with any precision; it means &quot;not yet empty.&quot; Treat the middle rows for lithium as rough. For
          the bigger rectangular cell, see{" "}
          <Link href="/multimeters/how-to-check-a-9v-battery-with-a-multimeter-under-load" className={link}>
            how to check a 9V battery under load
          </Link>
          , and for lithium rechargeables such as 18650s, the{" "}
          <Link href="/multimeters/how-to-check-18650-battery-health-with-a-multimeter" className={link}>
            18650 health check
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter to use to test AA batteries</h2>
        <p className="text-muted leading-7 mb-6">
          Almost any working digital meter can read an AA, so this is a job where the cheapest dependable meter in
          the drawer is enough. Resolution to 0.01 V is plenty for sorting; 0.001 V helps if you want to calculate
          internal resistance from small drops. A backlight helps when you are reading cells inside a dim battery
          box. If the meter seems to read every cell low, check its own battery; our guide to{" "}
          <Link href="/multimeters/why-does-my-multimeter-show-the-wrong-voltage" className={link}>
            a multimeter showing the wrong voltage
          </Link>{" "}
          covers that.
        </p>
        <ProductStrip
          title="Meters for battery checks"
          items={[
            {
              name: "KAIWEETS KM200s",
              image: kaiweets.image,
              alt: "KAIWEETS KM200s True RMS digital multimeter",
              href: "/multimeters/kaiweets-km200s-review",
              note: "Auto-ranging and backlit, with True RMS for household AC jobs too. An easy first meter for battery sorting.",
            },
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR True RMS digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "6,000-count resolution shows the millivolt drops you need to estimate internal resistance under load.",
            },
            {
              name: "Extech EX330",
              image: extech.image,
              alt: "Extech EX330 mini multimeter",
              href: "/multimeters/extech-ex330-review",
              note: "Pocket-sized for the junk drawer or toolbox, with a 4,000-count display that resolves AA voltages to 1 mV.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
