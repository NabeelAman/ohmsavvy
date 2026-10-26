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
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to check a 9V battery with a multimeter under load: size a load resistor with Ohm's law, read loaded voltage, know when alkaline, lithium or NiMH is spent.";

export const metadata = buildMetadata({
  title: "Check a 9V Battery With a Multimeter Under Load",
  description,
  path: "/multimeters/how-to-check-a-9v-battery-with-a-multimeter-under-load",
});

const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;
const fluke107 = picks.find((p) => p.name === "Fluke 107")!;
const kaiweets = picks.find((p) => p.name === "KAIWEETS KM200s")!;

const link = "text-accent hover:underline";

function LoadTestDiagram() {
  return (
    <svg
      viewBox="0 0 320 190"
      className="w-full h-auto"
      role="img"
      aria-label="Top view of a 9V battery with a 470 ohm resistor clipped across its terminals and the meter probes, set to DC volts, touching the same two terminals"
    >
      {/* battery top */}
      <rect x="30" y="60" width="130" height="80" rx="8" className="fill-surface stroke-foreground" strokeWidth="1.8" />
      {/* positive: small round stud */}
      <circle cx="70" cy="100" r="10" className="fill-muted stroke-foreground" strokeWidth="1.6" />
      {/* negative: larger hexagonal stud */}
      <polygon points="120,86 134,93 134,107 120,114 106,107 106,93" className="fill-muted stroke-foreground" strokeWidth="1.6" />
      <text x="70" y="132" fontSize="10" textAnchor="middle" className="fill-foreground">+ (small)</text>
      <text x="120" y="132" fontSize="10" textAnchor="middle" className="fill-foreground">− (hex)</text>
      {/* resistor across terminals via clip leads */}
      <path d="M70 90 V40 H92" className="stroke-foreground" strokeWidth="1.6" fill="none" />
      <path d="M92 40 l4 -6 l6 12 l6 -12 l6 12 l6 -12 l4 6" className="stroke-accent" strokeWidth="2" fill="none" strokeLinejoin="round" />
      <path d="M124 40 H140 V86" className="stroke-foreground" strokeWidth="1.6" fill="none" />
      <path d="M140 86 L128 92" className="stroke-foreground" strokeWidth="1.6" />
      <text x="108" y="22" fontSize="10" textAnchor="middle" className="fill-accent">470 Ω load</text>
      {/* probes to meter */}
      <path d="M78 104 C 120 160, 200 160, 230 128" className="stroke-accent" strokeWidth="2" fill="none" />
      <path d="M126 110 C 160 175, 240 175, 262 128" className="stroke-foreground" strokeWidth="2" fill="none" strokeDasharray="4 3" />
      {/* meter */}
      <rect x="210" y="50" width="80" height="78" rx="8" className="fill-surface stroke-foreground" strokeWidth="1.8" />
      <rect x="220" y="60" width="60" height="26" rx="3" className="fill-muted" />
      <text x="250" y="78" fontSize="12" fontWeight="700" textAnchor="middle" className="fill-foreground">8.94</text>
      <text x="250" y="104" fontSize="10" textAnchor="middle" className="fill-accent">V DC</text>
      <text x="250" y="118" fontSize="9" textAnchor="middle" className="fill-muted">COM / V</text>
      <text x="250" y="30" fontSize="9" textAnchor="middle" className="fill-muted">Meter in parallel,</text>
      <text x="250" y="42" fontSize="9" textAnchor="middle" className="fill-muted">never on an amps range</text>
    </svg>
  );
}

export default function HowToCheckA9vBatteryWithAMultimeterUnderLoadPage() {
  return (
    <HowToShell
      title="How to Check a 9V Battery With a Multimeter Under Load"
      description={description}
      published="2026-10-22"
      path="/multimeters/how-to-check-a-9v-battery-with-a-multimeter-under-load"
      category="multimeters"
      intro={
        <>
          To check a 9V battery with a multimeter under load, first read its open-circuit voltage on DC volts,
          then connect a resistor of about 470 Ω across the terminals and read the voltage again after a few
          seconds. A healthy battery barely drops; a tired one sags well below its open-circuit figure. The
          loaded reading is the one that tells you whether a smoke alarm, guitar pedal or test meter will keep
          working.
        </>
      }
      aside={{
        image: astro.image,
        alt: "AstroAI DM6000AR True RMS digital multimeter",
        caption: (
          <>
            Any meter with a DC volts range will do this test. The AstroAI DM6000AR (True RMS, 6,000-count,
            auto and manual ranging) is aimed at electronics work. See our{" "}
            <Link href="/multimeters/astroai-dm6000ar-review" className={link}>
              DM6000AR review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "why-load-matters", label: "Open-circuit vs loaded voltage" },
        { id: "choose-a-resistor", label: "Choose a load resistor" },
        { id: "run-the-test", label: "Run the load test" },
        { id: "typical-readings", label: "Typical readings by chemistry" },
        { id: "chemistry-notes", label: "Alkaline, lithium and NiMH notes" },
        { id: "smoke-alarms", label: "Why smoke alarms chirp" },
        { id: "never-measure-current", label: "Never measure current across it" },
        { id: "meters", label: "Meters for battery checks" },
      ]}
      faq={[
        {
          q: "What voltage is a dead 9V battery?",
          a: "It depends on the chemistry and on whether it is loaded. As a typical rule, an alkaline 9V that reads under about 7.2 V with a light load of around 20 mA is spent for most devices. Many devices give up sooner, near 7.5 to 8 V. Lithium 9V batteries usually hold close to 9 V until almost empty, then fall quickly.",
        },
        {
          q: "Why does my 9V battery read 9 volts but not work?",
          a: "An open-circuit reading draws almost no current, so even a worn battery with high internal resistance can show near 9 V. Once a device draws current, the voltage collapses. Put a resistor of a few hundred ohms across it and read again: a large drop shows the battery cannot deliver current any more, whatever the unloaded figure says.",
        },
        {
          q: "What resistor should I use to load test a 9V battery?",
          a: "A 470 Ω resistor rated at 0.5 W is a good general choice. It draws roughly 19 mA at 9 V and dissipates about 0.17 W, which is within its rating with margin. For a lighter test, 1 kΩ draws about 9 mA. Only apply the load for a few seconds while you take the reading.",
        },
        {
          q: "Can I test a 9V battery with the battery test function on my meter?",
          a: "Yes, if your meter has one. A battery test range places a small built-in load across the probes and reads the voltage, which is the same idea as the resistor method. The load value varies by meter, so the manual's figures for 9V cells are the ones to compare against rather than general charts.",
        },
        {
          q: "How long does a 9V battery last in a smoke alarm?",
          a: "It varies with the alarm, the chemistry and how often it is tested. Many manufacturers suggest replacing a replaceable 9V cell at least once a year, and many fire services suggest testing alarms weekly or monthly. Sealed ten-year alarms have a built-in lithium battery and are replaced as a whole unit when they signal end of life.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-check-a-12v-power-supply-under-load",
          title: "How to Check a 12V Power Supply Under Load",
          desc: "The same loaded-voltage idea applied to a mains adapter or bench supply.",
        },
        {
          href: "/multimeters/how-to-use-a-multimeter",
          title: "How to Use a Multimeter",
          desc: "DC volts, ohms and current modes, and which socket each one needs.",
        },
      ]}
    >
      <section>
        <h2 id="why-load-matters" className="text-xl font-semibold mb-3">Open-circuit vs loaded voltage</h2>
        <p className="text-muted leading-7 mb-4">
          A multimeter on DC volts has an input resistance of around 10 MΩ, so it draws almost nothing from the
          battery. That open-circuit reading shows the chemistry&apos;s resting voltage, but it hides the
          battery&apos;s internal resistance, which rises as the cells wear. Under load, current through that
          internal resistance drops voltage inside the battery, and the terminal reading falls.
        </p>
        <p className="text-muted leading-7">
          This is a different job from{" "}
          <Link href="/multimeters/how-to-test-a-car-battery-with-a-multimeter" className={link}>
            testing a car battery
          </Link>
          , where the engine&apos;s starter provides a huge load, or{" "}
          <Link href="/multimeters/how-to-check-a-12v-leisure-battery-with-a-multimeter" className={link}>
            checking a 12V leisure battery
          </Link>
          , where resting voltage maps to state of charge for lead-acid cells. A 9V battery is six small
          alkaline cells (or three lithium, or six to eight NiMH) in one case, and you supply the load
          yourself, much as you would when{" "}
          <Link href="/multimeters/how-to-check-a-12v-power-supply-under-load" className={link}>
            checking a 12V power supply under load
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={1} id="choose-a-resistor">Choose a load resistor with Ohm&apos;s law</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Aim for roughly 10 to 25 mA, which is similar to what many small devices draw while active. Ohm&apos;s
          law gives the resistance: R = V ÷ I, so 9 V ÷ 0.02 A = 450 Ω, and the nearest common value is 470 Ω.
          Then size the wattage: P = V² ÷ R, so 81 ÷ 470 ≈ 0.17 W. A 0.25 W resistor would run close to its
          limit and warm up, so a 0.5 W part gives comfortable margin.
        </p>
        <DataTable
          head={["Resistor", "Current at 9 V", "Power at 9 V", "Suggested rating"]}
          rows={[
            ["1 kΩ", "≈ 9 mA", "≈ 0.08 W", "0.25 W"],
            ["680 Ω", "≈ 13 mA", "≈ 0.12 W", "0.25 W or 0.5 W"],
            ["470 Ω", "≈ 19 mA", "≈ 0.17 W", "0.5 W"],
            ["390 Ω", "≈ 23 mA", "≈ 0.21 W", "0.5 W"],
          ]}
          mono={[1, 2]}
        />
      </section>

      <section>
        <StepHeading n={2} id="run-the-test">Run the 9V battery load test</StepHeading>
        <ol className="space-y-2 list-decimal pl-5 text-muted leading-7 mb-4">
          <li>Set the meter to DC volts, with the black lead in COM and the red lead in V.</li>
          <li>Read the open-circuit voltage: red on the small round positive stud, black on the hexagonal negative.</li>
          <li>Clip the resistor across the two terminals with crocodile leads, or use a 9V battery snap.</li>
          <li>Keep the probes on the terminals and read after about five seconds, the same time for every battery.</li>
          <li>Remove the load. Write down both numbers and the drop between them.</li>
        </ol>
        <Figure
          caption={
            <>
              The load resistor and the meter probes both connect across the same two terminals. The meter reads
              voltage in parallel; the resistor supplies the current draw.
            </>
          }
        >
          <LoadTestDiagram />
        </Figure>
        <Figure
          caption={
            <>
              Illustrative readings from a part-used alkaline 9V: 8.71 V open-circuit (left) falling to 7.35 V
              across a 470 Ω load (right). A drop of more than a volt at this light load is a sign the battery
              is near the end.
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="8.71" unit="V" mode="DC V  open circuit" />
            <MeterReadout value="7.35" unit="V" mode="DC V  470 Ω load" />
          </div>
        </Figure>
      </section>

      <section>
        <h2 id="typical-readings" className="text-xl font-semibold mb-3">Typical 9V battery readings: alkaline vs lithium vs NiMH</h2>
        <p className="text-muted leading-7 mb-4">
          The figures below are typical values at room temperature with a load of about 20 mA. Brands differ,
          and a device&apos;s own cut-off voltage is what finally matters, so treat them as a guide.
        </p>
        <DataTable
          head={["Chemistry", "Fresh, open circuit", "Usable, loaded", "Replace or recharge, loaded"]}
          rows={[
            ["Alkaline (6LR61)", "≈ 9.3 to 9.6 V", "Above ≈ 8 V", "Below ≈ 7.2 V"],
            ["Lithium (Li-MnO2)", "≈ 9.5 to 9.9 V", "Above ≈ 8.5 V", "Below ≈ 8 V"],
            ["NiMH, 7-cell (8.4 V nominal)", "≈ 9.5 to 10 V off the charger", "Above ≈ 8 V", "Below ≈ 7.5 V"],
            ["Carbon-zinc (6F22)", "≈ 9 to 9.5 V", "Above ≈ 8 V", "Below ≈ 7.2 V"],
          ]}
        />
        <Figure caption={<>Typical loaded voltage below which each 9V chemistry is treated as spent, at about 20 mA.</>}>
          <BarChart
            items={[
              { label: "Alkaline", value: 7.2, display: "≈ 7.2 V" },
              { label: "Lithium", value: 8.0, display: "≈ 8.0 V", highlight: true },
              { label: "NiMH (7-cell)", value: 7.5, display: "≈ 7.5 V" },
              { label: "Carbon-zinc", value: 7.2, display: "≈ 7.2 V" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="chemistry-notes" className="text-xl font-semibold mb-3">Alkaline, lithium and NiMH: what changes</h2>
        <ul className="space-y-3 list-disc pl-5 text-muted leading-7">
          <li>
            <strong className="text-foreground">Alkaline</strong> voltage slides steadily over its life, so the
            loaded reading is a fair guide to how much is left.
          </li>
          <li>
            <strong className="text-foreground">Lithium</strong> 9V cells have a flat discharge curve: they
            read close to 9 V for most of their life, then drop sharply. A healthy reading says little about
            remaining capacity, so replace on the schedule the device maker suggests.
          </li>
          <li>
            <strong className="text-foreground">NiMH</strong> 9V packs are sold as 7.2 V, 8.4 V or 9.6 V
            nominal (six, seven or eight cells). Scale the thresholds to the label: about 1.0 to 1.1 V per cell
            under load means recharge.
          </li>
          <li>
            <strong className="text-foreground">USB-rechargeable lithium-ion</strong> 9V batteries often contain
            a regulator that holds the output near 9 V and then cuts off, so voltage cannot show their charge.
          </li>
        </ul>
      </section>

      <section>
        <h2 id="smoke-alarms" className="text-xl font-semibold mb-3">Why smoke alarms chirp with a battery that reads fine</h2>
        <p className="text-muted leading-7 mb-4">
          A smoke alarm draws only a tiny standby current, but its sensor checks and horn pull short bursts of
          much higher current. Its low-battery circuit judges the voltage during those bursts. A worn battery can
          read close to 9 V on your meter and still dip below the alarm&apos;s threshold under that pulse, which
          triggers the chirp.
        </p>
        <p className="text-muted leading-7">
          Battery voltage also falls as temperature drops, which is one reason alarms often start chirping in
          the early hours when the heating has been off. A loaded reading gives a far better verdict than an
          open-circuit one. If a fresh, loaded-tested battery does not stop the chirp, the alarm itself may be
          signaling end of life: check its manual.
        </p>
      </section>

      <section>
        <h2 id="never-measure-current" className="text-xl font-semibold mb-3">Never measure current across a 9V battery&apos;s terminals</h2>
        <Callout title="Don't put the meter on amps across the battery">
          On a current range, the meter is a near-short circuit, typically a fraction of an ohm. Placed straight
          across the terminals, it lets a fresh 9V battery push far more current than any device would draw,
          typically an amp or more. That can blow the meter&apos;s fuse, heat the battery, and tells you nothing
          useful. Current is measured in series with a load; see{" "}
          <Link href="/multimeters/how-to-measure-milliamps-with-a-multimeter" className={link}>
            how to measure milliamps
          </Link>{" "}
          for the right way. Also keep 9V batteries away from coins and keys, and tape the terminals of used
          ones before recycling: the studs sit close together and short easily.
        </Callout>
        <KeyIdea title="One number to remember">
          The drop matters as much as the reading. A battery that loses only a few tenths of a volt under a
          470 Ω load is healthy, whatever its chemistry; one that loses a volt or more is close to finished.
        </KeyIdea>
      </section>
      <section>
        <h2 id="meters" className="text-xl font-semibold mb-3">Meters for battery checks</h2>
        <p className="text-muted leading-7 mb-6">
          Any digital meter reads DC volts well enough for a loaded battery test. These picks add useful resolution or portability for a drawer of spare batteries.
        </p>
        <ProductStrip
          title="Meters for 9V battery testing"
          items={[
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR True RMS digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "Its 6,000-count resolution shows the tenths-of-a-volt drop under load that separates a healthy battery from a tired one.",
            },
            {
              name: "Fluke 107",
              image: fluke107.image,
              alt: "Fluke 107 palm-sized digital multimeter",
              href: "/multimeters/fluke-117-vs-fluke-107",
              note: "A 200 g palm-sized Fluke rated CAT III 600V, small enough to live next to the smoke alarm spares.",
            },
            {
              name: "KAIWEETS KM200s",
              image: kaiweets.image,
              alt: "KAIWEETS KM200s True RMS digital multimeter",
              href: "/multimeters/kaiweets-km200s-review",
              note: "An inexpensive auto-ranging meter that picks the right DC volts range for you, a sensible first meter for household checks.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
