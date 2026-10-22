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
  "How to test a zener diode with a digital multimeter: the diode-mode forward check, a bench setup to measure breakdown voltage, and resistor sizing maths.";

export const metadata = buildMetadata({
  title: "How to Test a Zener Diode With a Multimeter",
  description,
  path: "/multimeters/how-to-test-a-zener-diode-with-a-digital-multimeter",
});

const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;
const unit = picks.find((p) => p.name === "UNI-T UT139C")!;
const fluke87 = picks.find((p) => p.name === "Fluke 87V")!;

const link = "text-accent hover:underline";

/** Bench test circuit: DC supply, series resistor, zener reverse-biased, meter across the zener. */
function ZenerBenchDiagram() {
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full h-auto"
      role="img"
      aria-label="Zener test circuit: the positive terminal of a DC supply feeds a series resistor, which connects to the cathode of the zener diode. The zener anode returns to the supply negative. A multimeter on DC volts connects across the zener, red probe on the cathode."
    >
      {/* Supply */}
      <rect x="14" y="70" width="60" height="60" rx="6" className="fill-surface stroke-border" strokeWidth="1.5" />
      <text x="44" y="96" textAnchor="middle" fontSize="11" className="fill-foreground">DC</text>
      <text x="44" y="111" textAnchor="middle" fontSize="10" className="fill-muted">supply</text>
      <text x="80" y="66" fontSize="11" className="fill-foreground">+</text>
      <text x="80" y="146" fontSize="11" className="fill-foreground">−</text>
      {/* Top wire to resistor */}
      <path d="M74 80 H96 V40 H118" className="stroke-foreground" strokeWidth="1.5" fill="none" />
      {/* Resistor zigzag */}
      <path d="M118 40 l5 -7 l8 14 l8 -14 l8 14 l8 -14 l8 14 l5 -7" className="stroke-foreground" strokeWidth="1.5" fill="none" />
      <text x="143" y="22" textAnchor="middle" fontSize="10" className="fill-muted">R (series)</text>
      {/* Wire to zener cathode node */}
      <path d="M168 40 H210 V78" className="stroke-foreground" strokeWidth="1.5" fill="none" />
      {/* Zener: cathode at top, anode at bottom (reverse biased) */}
      <path d="M198 92 L222 92 L210 78 Z" className="fill-accent stroke-accent" strokeWidth="1.2" />
      <path d="M196 78 L224 78" className="stroke-accent" strokeWidth="2" fill="none" />
      <path d="M196 78 L192 84 M224 78 L228 72" className="stroke-accent" strokeWidth="2" fill="none" />
      <text x="230" y="98" fontSize="10" className="fill-muted">zener</text>
      <path d="M210 92 V160 H96 V120 H74" className="stroke-foreground" strokeWidth="1.5" fill="none" />
      {/* Meter across zener */}
      <circle cx="210" cy="60" r="3" className="fill-accent" />
      <circle cx="210" cy="140" r="3" className="fill-foreground" />
      <path d="M210 60 H303 V70" className="stroke-accent" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
      <path d="M210 140 H303 V130" className="stroke-foreground" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
      <rect x="276" y="70" width="54" height="60" rx="6" className="fill-surface stroke-border" strokeWidth="1.5" />
      <text x="303" y="96" textAnchor="middle" fontSize="11" className="fill-foreground">V DC</text>
      <text x="303" y="112" textAnchor="middle" fontSize="9" className="fill-muted">meter</text>
      <text x="292" y="56" fontSize="9" className="fill-muted">red</text>
      <text x="292" y="154" fontSize="9" className="fill-muted">black</text>
      <text x="170" y="190" textAnchor="middle" fontSize="10" className="fill-muted">
        Cathode (band) toward +, through R. Meter reads Vz.
      </text>
    </svg>
  );
}

export default function HowToTestAZenerDiodeWithADigitalMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Zener Diode With a Digital Multimeter"
      description={description}
      published="2026-10-22"
      path="/multimeters/how-to-test-a-zener-diode-with-a-digital-multimeter"
      category="multimeters"
      intro={
        <>
          To test a zener diode with a digital multimeter, start in diode mode: a good zener reads about
          0.6–0.7 V forward and OL in reverse, just like an ordinary silicon diode. That proves it isn&apos;t
          shorted or open, but it can&apos;t show the zener voltage. To measure that, feed the zener from a DC
          supply through a series resistor and read the voltage across it on the DC volts range. This guide
          covers both tests and the maths for picking the resistor.
        </>
      }
      aside={{
        image: astro.image,
        alt: "AstroAI DM6000AR True RMS digital multimeter, front view",
        caption: (
          <>
            The AstroAI DM6000AR (True RMS, 6,000-count, auto and manual ranging) is aimed at electronics
            projects; any meter with diode and DC volts modes can run both zener tests. See our{" "}
            <Link href="/multimeters/astroai-dm6000ar-review" className={link}>
              DM6000AR review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-makes-a-zener-different", label: "What makes a zener different" },
        { id: "diode-mode-check", label: "Diode-mode forward check" },
        { id: "why-the-meter-cannot-show-vz", label: "Why the meter can't show Vz" },
        { id: "bench-test", label: "Measure the breakdown voltage" },
        { id: "sizing-the-resistor", label: "Sizing the series resistor" },
        { id: "reading-the-results", label: "Good, shorted, open or drifted" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "Can I test a zener diode in circuit?",
          a: "Partly. With the board powered, you can measure the DC voltage across the zener and compare it with its rating: a regulator zener should sit close to its marked voltage. Unpowered diode-mode checks in circuit are less reliable, because parallel parts can make a good zener look shorted. If a reading looks wrong, lift one leg before condemning it.",
        },
        {
          q: "How do I read the markings on a zener diode?",
          a: "Small glass zeners are often printed with the voltage directly, such as 5V1 for 5.1 V or 12 for 12 V, sometimes with a series prefix like BZX55C. Others carry a part number, for example 1N4733A, which you look up in a datasheet to get the zener voltage and test current. The band always marks the cathode.",
        },
        {
          q: "Can I use a 9V battery to test a zener diode?",
          a: "Yes, for zeners rated a few volts below 9 V. A 9 V battery and a series resistor of around 1 kΩ make a simple test source for a 5.1 V zener, giving a few milliamps. It can't test zeners above roughly 7 V, because the battery needs headroom above the zener voltage to push current through the resistor.",
        },
        {
          q: "Why does my zener read lower than its rated voltage?",
          a: "Zener voltage depends on current. The rated figure is specified at a test current on the datasheet, and at much lower current the reading is usually somewhat below it, especially for zeners under about 6 V, which have a soft knee. Tolerance matters too: a 5% part can legitimately read a little high or low.",
        },
        {
          q: "What is the difference between a zener and a regular diode test?",
          a: "The forward check is the same: both read about 0.6-0.7 V in diode mode. A regular rectifier is only expected to block in reverse, so the test ends there. A zener is designed to conduct in reverse at a set voltage, so a complete test also measures that breakdown voltage with an external supply and resistor.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-diode-with-a-multimeter",
          title: "How to Test a Diode With a Multimeter",
          desc: "The general diode-mode method for rectifiers, signal diodes, Schottkys and LEDs.",
        },
        {
          href: "/multimeters/how-to-test-a-bridge-rectifier-with-a-multimeter",
          title: "How to Test a Bridge Rectifier With a Multimeter",
          desc: "Apply the same forward and reverse checks to all four diodes in a bridge.",
        },
      ]}
    >
      <Callout title="Keep the test at low voltage">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Remove power before any diode-mode or resistance check, and discharge nearby capacitors in a power
            supply before you touch the board.
          </li>
          <li>
            For the bench test, use a current-limited bench supply or a battery, never a mains-derived source
            without isolation. Always include the series resistor: a zener connected straight across a supply
            will overheat and fail.
          </li>
          <li>Small zeners get hot if the resistor is too small. Check the power figures below before switching on.</li>
        </ul>
      </Callout>

      <section>
        <h2 id="what-makes-a-zener-different" className="text-xl font-semibold mb-3">What makes a zener different</h2>
        <p className="text-muted leading-7 mb-4">
          In the forward direction a zener behaves like any silicon junction. The difference is in reverse:
          an ordinary rectifier blocks until it is damaged, while a zener is built to break down cleanly at a
          specified voltage (Vz) and hold close to it across a range of currents. Zeners serve as references, clamps and simple
          shunt regulators. Our general guide to{" "}
          <Link href="/multimeters/how-to-test-a-diode-with-a-multimeter" className={link}>
            testing a diode with a multimeter
          </Link>{" "}
          covers the forward and reverse diode-mode checks for rectifiers, LEDs and Schottkys. This page goes
          further and measures the zener voltage itself.
        </p>
        <InfoCards
          items={[
            { label: "Vz", desc: "Zener (breakdown) voltage, the figure printed on the part, e.g. 5V1 = 5.1 V." },
            { label: "Izt", desc: "Test current at which the datasheet specifies Vz. Measure near it for a fair comparison." },
            { label: "Power", desc: "Common small glass zeners are 0.5 W; larger axial parts are 1 W or more." },
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="diode-mode-check">Do the diode-mode forward check</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With the zener out of circuit, or with one leg lifted, select diode mode. Put the red probe on the
          anode and the black probe on the cathode (the end with the band). A healthy part typically shows
          around 0.6–0.7 V, the normal silicon forward drop at the meter&apos;s small test current. Swap the
          probes: the display should read OL for most zeners.
        </p>
        <Figure
          caption={
            <>
              Typical diode-mode readings for a good 5.1 V zener: a forward drop near 0.65 V (left) and OL in
              reverse (right), because the meter&apos;s test voltage is below the zener voltage.
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="0.652" unit="V" mode="diode  forward" />
            <MeterReadout value="OL" unit="" mode="diode  reverse" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          There is one exception. A low-voltage zener, say 2.4 V or 2.7 V, can break down at the meter&apos;s
          open-circuit test voltage and show a reading in reverse too. That is not a short: a shorted part reads
          close to zero both ways, usually with the continuity beeper sounding.
        </p>
      </section>

      <section>
        <h2 id="why-the-meter-cannot-show-vz" className="text-xl font-semibold mb-3">Why a multimeter can&apos;t show the zener voltage directly</h2>
        <p className="text-muted leading-7 mb-4">
          Diode mode works by pushing a small, fixed current through the part and displaying the voltage that
          develops. The source inside the meter has a limited compliance voltage, commonly in the region of 2 to
          3.5 V depending on the model, so it simply cannot reach the breakdown point of a 5.1 V or 12 V zener.
          The display reads OL because the meter has run out of voltage, not because the zener has failed.
        </p>
        <KeyIdea title="Two tests, two questions">
          Diode mode answers &quot;is the junction intact?&quot; The bench test answers &quot;does it break down
          at the right voltage?&quot; A zener can pass the first and still fail the second if it has drifted.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={2} id="bench-test">Measure the breakdown voltage with a supply and resistor</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Build the circuit below on a breadboard or with clip leads. The zener is connected in reverse: the
          cathode (band) goes toward the positive side through the series resistor, the anode goes to the
          negative. Set the meter to DC volts and put it directly across the zener.
        </p>
        <Figure caption={<>The bench setup. The resistor sets the current; the meter reads the voltage across the zener, which should settle close to its rating.</>}>
          <ZenerBenchDiagram />
        </Figure>
        <ol className="space-y-2 list-decimal pl-5 text-muted leading-7 mt-4">
          <li>Choose a supply voltage a few volts above Vz, for example 12 V for a 5.1 V part.</li>
          <li>Calculate the resistor (next section) and fit the nearest standard value at or above it.</li>
          <li>Switch on and read the DC voltage across the zener once it settles.</li>
          <li>
            Optional: raise the supply a few volts. The zener voltage should barely move while the voltage
            across the resistor takes up the difference. That flat response is the zener working.
          </li>
        </ol>
        <p className="text-muted leading-7 mt-4">
          If you want the actual current, measure the voltage across the resistor and divide by its value, the
          method explained in{" "}
          <Link href="/multimeters/how-to-measure-voltage-across-a-resistor" className={link}>
            measuring voltage across a resistor
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="sizing-the-resistor" className="text-xl font-semibold mb-3">Sizing the series resistor: the maths</h2>
        <p className="text-muted leading-7 mb-4">
          The resistor drops whatever voltage the zener doesn&apos;t, so by Ohm&apos;s law:
        </p>
        <p className="font-mono text-sm bg-surface border border-border rounded-md p-3 mb-4">
          R = (Vsupply − Vz) ÷ Iz
        </p>
        <p className="text-muted leading-7 mb-4">
          For a 5.1 V zener on 12 V at 5 mA: (12 − 5.1) ÷ 0.005 = 1,380 Ω. A standard 1.5 kΩ gives about
          4.6 mA. The resistor dissipates 6.9 V × 4.6 mA, roughly 32 mW, and the zener about 23 mW, both well
          inside a 0.25 W resistor and a 0.5 W zener. For a precise comparison, aim for the Izt in the datasheet;
          1 W parts are often specified at tens of milliamps, so recheck both power figures if you raise the
          current.
        </p>
        <DataTable
          head={["Zener", "Supply", "Target Iz", "Calculated R", "Standard R"]}
          rows={[
            ["3.3 V", "9 V", "5 mA", "1,140 Ω", "1.2 kΩ"],
            ["5.1 V", "12 V", "5 mA", "1,380 Ω", "1.5 kΩ"],
            ["9.1 V", "15 V", "5 mA", "1,180 Ω", "1.2 kΩ"],
            ["12 V", "18 V", "5 mA", "1,200 Ω", "1.2 kΩ"],
            ["15 V", "24 V", "5 mA", "1,800 Ω", "1.8 kΩ"],
          ]}
          mono={[3, 4]}
        />
        <p className="text-muted leading-7 mt-4">
          These are worked examples at a modest test current suited to small zeners, not datasheet limits.
        </p>
      </section>

      <section>
        <h2 id="reading-the-results" className="text-xl font-semibold mb-3">Good, shorted, open or drifted: reading the results</h2>
        <Figure caption={<>A typical bench reading for a healthy 5.1 V, 5% zener at about 4.6 mA: within its tolerance band of roughly 4.85 to 5.36 V.</>}>
          <MeterReadout value="5.08" unit="V" mode="DC V  across zener" />
        </Figure>
        <DataTable
          head={["What you see", "What it usually means"]}
          rows={[
            ["≈0.6–0.7 V forward, OL reverse; bench reading near Vz", "Good zener"],
            ["Near 0 V in both directions, beeper sounds", "Shorted junction, a common failure after overload"],
            ["OL in both directions; bench reading equals the supply", "Open zener: no current flows, so no drop across R"],
            ["Forward check passes but bench reading is well off Vz", "Drifted part, wrong part fitted, or test current far from Izt"],
            ["Bench reading creeps down as the part warms", "Often normal for higher-voltage zeners; heavy drift suggests overheating or damage"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Judge closeness with your meter&apos;s accuracy in mind; our guide to{" "}
          <Link href="/multimeters/multimeter-accuracy-for-electronics-repair" className={link}>
            multimeter accuracy for electronics repair
          </Link>{" "}
          explains how to read a ±(% + counts) spec.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter you need to test a zener</h2>
        <p className="text-muted leading-7 mb-6">
          Both tests need only diode mode and a DC volts range, which almost every digital meter has. A higher
          count display shows the zener voltage with more digits, which helps when comparing a reference zener
          against a tight tolerance. For basics on modes and probe sockets, start with{" "}
          <Link href="/multimeters/how-to-use-a-multimeter" className={link}>
            how to use a multimeter
          </Link>
          .
        </p>
        <ProductStrip
          title="Meters in our reviews"
          items={[
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR True RMS digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "True RMS, 6,000-count, auto and manual ranging. Aimed at microcontroller and electronics projects.",
            },
            {
              name: "UNI-T UT139C",
              image: unit.image,
              alt: "UNI-T UT139C True RMS digital multimeter",
              href: "/multimeters/uni-t-ut139c-review",
              note: "True RMS, 6,000-count, CAT III 600V, with both auto and manual ranging at a budget price.",
            },
            {
              name: "Fluke 87V",
              image: fluke87.image,
              alt: "Fluke 87V industrial True RMS digital multimeter",
              href: "/multimeters/fluke-87v-review",
              note: "6,000-count main display with a 19,999-count high-resolution mode, for finer voltage readings.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
