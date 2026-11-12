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
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to check LED polarity with a multimeter in diode mode, read the long leg and flat side, and what forward voltage to expect from red, blue and white LEDs.";

export const metadata = buildMetadata({
  title: "How to Check LED Polarity With a Multimeter",
  description,
  path: "/multimeters/how-to-check-led-polarity-with-a-multimeter",
});

const fluke107 = picks.find((p) => p.name === "Fluke 107")!;
const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;
const fluke17b = picks.find((p) => p.name === "Fluke 17B+")!;

const link = "text-accent hover:underline";

/** A 5 mm LED with its physical polarity clues, next to the schematic symbol and the two probe orientations. */
function PolarityDiagram() {
  return (
    <svg
      viewBox="0 0 360 220"
      className="w-full h-auto"
      role="img"
      aria-label="How to check LED polarity with a multimeter. A 5 millimeter LED has a longer leg for the anode and a shorter leg plus a flat edge on the rim for the cathode. With the red probe on the anode and black on the cathode, diode mode shows a forward voltage and the LED may glow. Reversed, the meter shows OL."
    >
      {/* LED body */}
      <path d="M50 40 a30 30 0 0 1 60 0 V110 H50 Z" className="fill-accent/15 stroke-foreground" strokeWidth="2" />
      <rect x="44" y="110" width="72" height="10" rx="2" className="fill-surface stroke-foreground" strokeWidth="2" />
      <line x1="116" y1="110" x2="116" y2="120" className="stroke-accent" strokeWidth="4" />
      <text x="122" y="118" fontSize="8" className="fill-accent">flat = cathode</text>
      {/* legs */}
      <line x1="66" y1="120" x2="66" y2="205" className="stroke-foreground" strokeWidth="2.5" />
      <line x1="94" y1="120" x2="94" y2="180" className="stroke-foreground" strokeWidth="2.5" />
      <text x="60" y="214" fontSize="8" textAnchor="end" className="fill-foreground">long leg</text>
      <text x="60" y="203" fontSize="8" textAnchor="end" className="fill-foreground">anode +</text>
      <text x="100" y="178" fontSize="8" className="fill-foreground">short leg</text>
      <text x="100" y="189" fontSize="8" className="fill-foreground">cathode −</text>
      {/* internal frame hint */}
      <path d="M66 110 V70 H74 V60" className="stroke-muted" strokeWidth="1.5" fill="none" />
      <path d="M94 110 V64 H80 V56 H94" className="stroke-muted" strokeWidth="1.5" fill="none" />
      <text x="80" y="30" fontSize="7" textAnchor="middle" className="fill-muted">larger anvil is</text>
      <text x="80" y="22" fontSize="7" textAnchor="middle" className="fill-muted">usually cathode</text>
      {/* schematic symbol */}
      <g transform="translate(190 30)">
        <line x1="0" y1="20" x2="30" y2="20" className="stroke-foreground" strokeWidth="1.8" />
        <path d="M30 6 V34 L56 20 Z" className="fill-accent/30 stroke-accent" strokeWidth="1.5" />
        <line x1="56" y1="6" x2="56" y2="34" className="stroke-accent" strokeWidth="2.5" />
        <line x1="56" y1="20" x2="86" y2="20" className="stroke-foreground" strokeWidth="1.8" />
        <text x="10" y="48" fontSize="8" className="fill-foreground">anode</text>
        <text x="60" y="48" fontSize="8" className="fill-foreground">cathode (bar)</text>
        <path d="M46 2 l8 -8 M52 4 l8 -8" className="stroke-accent" strokeWidth="1.2" />
      </g>
      {/* probe orientations */}
      <rect x="180" y="100" width="170" height="44" rx="4" className="fill-surface stroke-accent" strokeWidth="1.5" />
      <text x="265" y="117" fontSize="9" textAnchor="middle" className="fill-accent">red on anode, black on cathode</text>
      <text x="265" y="132" fontSize="9" textAnchor="middle" className="fill-muted">forward voltage shown, may glow</text>
      <rect x="180" y="156" width="170" height="44" rx="4" className="fill-surface stroke-foreground" strokeWidth="1.5" />
      <text x="265" y="173" fontSize="9" textAnchor="middle" className="fill-foreground">probes reversed</text>
      <text x="265" y="188" fontSize="9" textAnchor="middle" className="fill-muted">OL, LED stays dark</text>
    </svg>
  );
}

export default function HowToCheckLedPolarityWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Check LED Polarity With a Multimeter"
      description={description}
      published="2026-11-13"
      path="/multimeters/how-to-check-led-polarity-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To check LED polarity with a multimeter, set it to diode mode and touch the probes to the two leads: when
          the meter shows a forward voltage (and the LED often glows faintly), the red probe is on the anode (+) and
          the black probe is on the cathode (−). Reverse the probes and a good LED reads OL. On a new through-hole LED
          the longer leg is the anode and the flat edge on the rim marks the cathode, but trimmed legs, SMD parts and
          blue or white LEDs that won&apos;t light on some meters are where the meter test earns its keep.
        </>
      }
      aside={{
        image: fluke107.image,
        alt: "Fluke 107 palm-sized digital multimeter, front view",
        caption: (
          <>
            The Fluke 107 has a diode range to 2.000 V, enough for red, orange and yellow LEDs; blue and white ones will
            read open on it. See our{" "}
            <Link href="/multimeters/fluke-107-review" className={link}>
              Fluke 107 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "physical-clues", label: "Physical polarity clues" },
        { id: "problems", label: "Odd readings and what they mean" },
        { id: "diode-mode", label: "Set diode mode" },
        { id: "probe", label: "Probe and read" },
        { id: "reverse", label: "Reverse to confirm" },
        { id: "blue-white", label: "Blue or white LED reads OL both ways" },
        { id: "forward-voltage", label: "Forward voltage by color" },
        { id: "rgb", label: "RGB and bicolor LEDs" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "Which leg of an LED is positive?",
          a: "The longer leg is positive, the anode, on a new through-hole LED. The shorter leg is the cathode, and the rim of the plastic case is usually flattened on the cathode side. Once legs are trimmed or bent, those clues can disappear, so a quick diode-mode check is the reliable way to confirm which lead is which before you solder it in.",
        },
        {
          q: "What happens if you connect an LED backwards?",
          a: "In a low-voltage circuit it simply stays dark, because a reversed LED blocks current. The risk comes when the reverse voltage exceeds the LED's rating, which datasheets commonly give as about 5 V. Above that it can break down and fail. On an LED strip, reversed supply wires usually just leave the strip dark, but check the strip maker's documentation before trying it.",
        },
        {
          q: "Why does my LED not light up in diode mode?",
          a: "Either the meter's diode test supplies too little voltage or current, or the LED is faulty. Many meters apply around 2 to 3 V, and some only about 2 V, so blue, white and true-green LEDs with a forward voltage near 3 V may not conduct at all. Even when the meter shows a reading, the test current is often too low for a visible glow.",
        },
        {
          q: "How do I find the polarity of an SMD LED?",
          a: "Look for a mark on the package: a green or dark line, a notched or cut corner, or a symbol on the underside. These marks are not standardized between manufacturers, so the datasheet's package drawing is the only definitive reference. If you don't have it, put the meter in diode mode with sharp probes and see which orientation gives a forward reading.",
        },
        {
          q: "Can I check LED polarity in continuity mode?",
          a: "Sometimes, but it's less reliable. Continuity mode beeps below a low resistance threshold, and an LED rarely looks like a low resistance at continuity-test currents, so you usually get no beep in either direction. Diode mode is designed for this job: it pushes a small fixed current and displays the voltage across the junction, which tells you both polarity and roughly what color chemistry you have.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-diode-with-a-multimeter",
          title: "How to Test a Diode With a Multimeter",
          desc: "How diode mode works, and the forward drops of silicon, Schottky and germanium diodes.",
        },
        {
          href: "/multimeters/how-to-test-an-led-driver-with-a-multimeter",
          title: "How to Test an LED Driver With a Multimeter",
          desc: "Constant-current and constant-voltage drivers: input, output and current checks.",
        },
      ]}
    >
      <Callout title="Test LEDs with the power off">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Diode mode is a dead-circuit test. Never use it on an LED board that is still connected to its driver or
            supply; the meter can be damaged and the reading means nothing.
          </li>
          <li>
            LED bulbs, tubes and fixtures that run from 120 V contain mains-connected parts and capacitors that can hold
            a charge. Unplug them, or switch off the breaker for hardwired fixtures, and wait before opening the
            housing. If a ceiling fixture needs dismantling, an electrician is the safer route.
          </li>
          <li>
            When you power a single LED from a coin cell or bench supply to check it, use a series resistor. An LED
            connected straight to a supply stiffer than a coin cell can draw enough current to burn out in a moment.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="physical-clues" className="text-xl font-semibold mb-3">Physical clues: long leg, flat side and the anvil</h2>
        <p className="text-muted leading-7 mb-4">
          A standard 3 mm or 5 mm LED gives you three hints. The anode leg is longer. The cathode side of the plastic
          rim has a small flat. And looking through a clear lens, you can see two metal posts inside: the bigger,
          flag-shaped one that holds the chip is usually the cathode. That last clue is a common convention, not a
          rule, and some makers reverse it, so treat it as a tiebreaker only.
        </p>
        <Figure
          caption={
            <>
              Polarity clues on a 5 mm LED and the matching schematic symbol. The bar on the symbol is the cathode, the
              same side as the short leg and the flat.
            </>
          }
        >
          <PolarityDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Those hints fail in exactly the situations where you need them: legs trimmed to the same length after
          soldering, a salvaged LED with bent leads, a rim with no visible flat, or a surface-mount part with a mark you
          can&apos;t interpret. That is when the meter takes over.
        </p>
      </section>

      <section>
        <h2 id="problems" className="text-xl font-semibold mb-3">Odd readings and what they mean</h2>
        <DataTable
          head={["What you see", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["OL in both directions", "Blue/white LED above the meter's diode-test voltage, or LED open", "Try a red LED as a meter check; coin cell test", "Use the resistor test in step 4, or replace the LED"],
            ["Near 0 V in both directions", "LED shorted", "Repeat out of circuit", "Replace the LED"],
            ["A reading both ways, different values", "Bicolor LED, or a parallel path in circuit", "Lift one leg and retest", "Normal for bicolor; otherwise test out of circuit"],
            ["Reading shown but no glow", "Meter test current too low to light it", "Nothing wrong", "Normal; trust the reading"],
            ["LED strip dark after rewiring", "Supply wires reversed at the strip", "DC volts at strip input, red to +", "Swap the wires to match + and − marks"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="diode-mode">Set the meter to diode mode</StepHeading>
        <p className="text-muted leading-7">
          Turn the dial to the diode symbol, a triangle pointing at a bar. On many meters it shares a dial position
          with continuity or ohms, and you press a SELECT or FUNC button until the diode symbol shows on the display.
          Red lead in the VΩ jack, black in COM. Touch the probes together: the meter should read close to 0, and with
          the probes apart it should read OL.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="probe">Probe the LED and read the forward voltage</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Hold the LED out of circuit and touch red to one lead and black to the other. If the meter shows a voltage,
          typically 1.6 to 2.2 V for a red LED, the red probe is on the anode. Many meters also make the LED glow dimly.
          Dim a room light or shade the LED with your hand to see it. If you get OL, swap the probes.
        </p>
        <Figure
          caption={
            <>
              Illustrative diode-mode readings from a red LED: 1.78 V with red on the anode (left), OL with the probes
              reversed (right).
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="1.78" unit="V" mode="DIODE  forward" />
            <MeterReadout value="OL" unit="V" mode="DIODE  reversed" />
          </div>
        </Figure>
      </section>

      <section>
        <StepHeading n={3} id="reverse">Reverse the probes to confirm</StepHeading>
        <p className="text-muted leading-7">
          Always check the other direction. A good LED reads OL reversed. A reading in both directions means either a
          bicolor LED (two chips back to back) or, on a board, something wired across the LED such as a resistor or
          protection diode. Mark the anode with a pen or bend that leg before you put the LED down, because the whole
          point of the test is lost if you mix them up again.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="blue-white">If a blue or white LED reads OL both ways</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A meter can only display a forward voltage lower than the voltage its diode range applies. The Fluke 107, for
          example, applies about 2.0 V at under 0.6 mA, so a white LED needing roughly 3 V reads OL both ways even when
          it is perfect. Prove the meter with a red LED first. Then check the blue or white LED with a 3 V coin cell,
          whose internal resistance limits the current, or with a 5 V supply and a series resistor.
        </p>
        <p className="text-muted leading-7 mb-4">
          Size the resistor for a few milliamps: (5 V − 3 V) ÷ 0.005 A = 400 Ω, so the next common value, 470 Ω, gives
          (5 − 3) ÷ 470 ≈ 4.3 mA. That is plenty to see the LED light and well below the 20 mA many small LEDs are
          specified at. Whichever lead goes to the supply&apos;s + when it lights is the anode.
        </p>
        <KeyIdea title="OL both ways is not proof of a dead LED">
          On a meter with a low diode-test voltage, a healthy blue, white or true-green LED looks exactly like an open
          one. Know your meter&apos;s diode-test voltage from its manual before you throw parts away, and keep a known
          red LED in the drawer as a quick check that the meter and leads are working.
        </KeyIdea>
      </section>

      <section>
        <h2 id="forward-voltage" className="text-xl font-semibold mb-3">LED forward voltage by color</h2>
        <p className="text-muted leading-7 mb-4">
          Forward voltage depends on the semiconductor chemistry, which is why color predicts it. The ranges below are
          typical datasheet values at around 20 mA. A diode-mode reading is taken at a much smaller current, so expect
          it to sit a few tenths of a volt lower. Check the part&apos;s datasheet for exact figures.
        </p>
        <Figure caption={<>Typical LED forward voltage by color, midpoint of common datasheet ranges at about 20 mA. A meter with a 2.0 V diode test can only read the shorter bars.</>}>
          <BarChart
            items={[
              { label: "Infrared", value: 1.4, display: "~1.2–1.6 V" },
              { label: "Red", value: 2.0, display: "~1.8–2.2 V", highlight: true },
              { label: "Orange / amber", value: 2.05, display: "~1.9–2.2 V" },
              { label: "Yellow", value: 2.05, display: "~1.9–2.2 V" },
              { label: "Yellow-green", value: 2.2, display: "~2.0–2.4 V" },
              { label: "True green", value: 3.1, display: "~2.8–3.4 V" },
              { label: "Blue", value: 3.1, display: "~2.8–3.4 V" },
              { label: "White", value: 3.1, display: "~2.8–3.4 V" },
              { label: "Ultraviolet", value: 3.5, display: "~3.1–4.0 V" },
            ]}
          />
        </Figure>
        <DataTable
          head={["LED color", "Typical Vf at ~20 mA", "Readable on a 2.0 V diode test?"]}
          rows={[
            ["Red", "1.8–2.2 V", "Usually (reads lower at test current)"],
            ["Yellow / amber", "1.9–2.2 V", "Usually, may sit near the limit"],
            ["Yellow-green", "2.0–2.4 V", "Borderline"],
            ["Blue, white, true green", "2.8–3.4 V", "No; use a coin cell or resistor test"],
          ]}
        />
      </section>

      <section>
        <h2 id="rgb" className="text-xl font-semibold mb-3">RGB and bicolor LEDs</h2>
        <p className="text-muted leading-7 mb-4">
          A four-leg RGB LED holds three chips that share one lead, and the longest leg is that common lead. Put one
          probe on it and the other on the red-chip leg. If the reading appears with black on the common leg, it is
          common cathode; if it needs red on the common leg, it is common anode. Use the red chip for this, because its
          lower forward voltage reads on almost any meter. Common-anode parts are the norm on many{" "}
          <Link href="/multimeters/how-to-test-an-led-strip-with-a-multimeter" className={link}>
            RGB LED strips
          </Link>
          , where the strip&apos;s +12 V or +24 V pad is the shared anode.
        </p>
        <p className="text-muted leading-7">
          A two-leg bicolor LED has two chips in opposite directions and reads in both orientations, a different
          voltage each way. That is normal. The same diode-mode technique also works on the LEDs inside a fixture once
          its driver is unplugged; our{" "}
          <Link href="/multimeters/how-to-test-an-led-driver-with-a-multimeter" className={link}>
            LED driver test
          </Link>{" "}
          covers the other half of that job, and if your readings look off for an ordinary diode, see{" "}
          <Link href="/multimeters/why-does-my-multimeter-show-the-wrong-diode-voltage" className={link}>
            why a multimeter shows the wrong diode voltage
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which meter to use</h2>
        <p className="text-muted leading-7 mb-6">
          Any meter with a diode range will find polarity on red, orange and yellow LEDs. If you work with blue and
          white parts often, look up the diode-test voltage in the manual before you buy: the two Flukes below range to
          2.000 V, so plan on the coin-cell check for those colors. Sharp, thin probe tips help on SMD parts.
        </p>
        <ProductStrip
          title="Meters with diode test"
          items={[
            {
              name: "Fluke 107",
              image: fluke107.image,
              alt: "Fluke 107 palm-sized digital multimeter",
              href: "/multimeters/fluke-107-review",
              note: "Palm-sized, CAT III 600V, 6,000-count display. Diode range to 2.000 V at about 2.0 V open circuit, so blue and white LEDs read open.",
            },
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR True RMS digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "Budget True RMS, 6,000-count meter for electronics benches. AstroAI lists diode test among its functions.",
            },
            {
              name: "Fluke 17B+",
              image: fluke17b.image,
              alt: "Fluke 17B+ digital multimeter",
              href: "/multimeters/fluke-17b-plus-review",
              note: "Full-size Fluke with diode test, continuity, temperature and capacitance. Diode range to 2.000 V; not True RMS.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
