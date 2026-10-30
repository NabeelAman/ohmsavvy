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
  "Discharge it, lift one leg, then read it in capacitance mode. Why capacitor readings look wrong: tolerance, stray pF, range limits, parallel parts and ESR.";

export const metadata = buildMetadata({
  title: "How to Test a Capacitor With a Multimeter",
  description,
  path: "/multimeters/how-to-test-a-capacitor-with-a-multimeter",
});

const fluke115 = picks.find((p) => p.name === "Fluke 115")!;
const fluke179 = picks.find((p) => p.name === "Fluke 179")!;
const ex330 = picks.find((p) => p.name === "Extech EX330")!;

const link = "text-accent hover:underline";

export default function HowToTestACapacitorWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Capacitor With a Multimeter (and Why the Reading Looks Wrong)"
      description={description}
      published="2026-10-20"
      updated="2026-10-26"
      path="/multimeters/how-to-test-a-capacitor-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a capacitor with a multimeter, discharge it, free at least one leg from the circuit, set
          the meter to capacitance (the –|(– or F position) and compare the reading with the value printed
          on the part, allowing for its tolerance. If the meter has no capacitance mode, an ohms check still
          tells you whether the part is shorted or open, though not whether it has drifted. Most &quot;bad&quot;
          readings people worry about are not bad parts at all, so this guide also explains the six reasons
          a healthy capacitor can read wrong.
        </>
      }
      aside={{
        image: fluke115.image,
        alt: "Fluke 115 digital multimeter, which has a capacitance range",
        caption: (
          <>
            The Fluke 115 reads capacitance from 1 nF up to 9,999 µF. See our{" "}
            <Link href="/multimeters/fluke-115-review" className={link}>
              Fluke 115 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "safety", label: "Discharge first: how much energy is stored" },
        { id: "causes", label: "Why a capacitor reading looks wrong" },
        { id: "steps", label: "Step-by-step test" },
        { id: "in-circuit", label: "In-circuit readings and parallel parts" },
        { id: "tolerance", label: "Is the reading inside tolerance?" },
        { id: "esr", label: "Aging electrolytics and ESR" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "Can you test a capacitor with a voltmeter?",
          a: "Only partly. A plain voltmeter has no capacitance range, so it can't give you a microfarad value. What it can do: charge the capacitor briefly through a resistor and watch the voltage climb toward the source voltage, then discharge it and watch the voltage drop — a cap that won't hold a charge at all, or that reads zero resistance to charge, is shorted or open. For an actual value against tolerance, you need a meter with a capacitance (F) range.",
        },
        {
          q: "Can a capacitor read the correct microfarads and still be bad?",
          a: "Yes. A capacitance range measures stored charge, not internal resistance. An electrolytic that has dried out can still show close to its marked value while its equivalent series resistance has climbed enough to cause ripple, hum or a power supply that will not start. If the symptom fits and the value looks fine, check ESR with a dedicated ESR meter or simply replace the part.",
        },
        {
          q: "How long should a multimeter take to measure a large capacitor?",
          a: "Small values settle almost instantly, but large electrolytics take longer because the meter charges them with a modest test current and times the result. Several seconds for a few thousand microfarads is normal. Wait for the number to stop changing before you write it down, and do not move the probes while it is still counting.",
        },
        {
          q: "Do I need to observe polarity when testing a capacitor?",
          a: "For electrolytic and tantalum capacitors, put the red lead on the positive terminal and black on the negative, marked by the stripe on the can. The meter's test voltage is low, so a reversed connection is unlikely to damage the part, but it can give a less stable reading. Ceramic and film capacitors are not polarized, so either way round works.",
        },
        {
          q: "What does OL mean in capacitance mode?",
          a: "OL in capacitance mode usually means the value is above the range the meter can measure, or the part is shorted so the meter cannot charge it. Check the maker's maximum capacitance in the manual. If the capacitor is well within that limit and still shows OL, measure it in ohms; a near-zero resistance confirms an internal short.",
        },
        {
          q: "Can I test a capacitor with an analog multimeter?",
          a: "An analog meter on a high ohms range gives a clear charge kick on electrolytics: the needle swings toward zero ohms, then drifts back toward infinity as the part charges. A larger capacitor gives a slower return. That shows the part is not open or shorted, but it gives no number, so a digital capacitance range is still needed to check value against tolerance.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-check-a-ceramic-capacitor-with-a-multimeter",
          title: "How to Check a Ceramic Capacitor",
          desc: "Reading 104-style codes and testing small pF and nF parts.",
        },
        {
          href: "/multimeters/how-to-test-a-fan-motor-capacitor-with-a-multimeter",
          title: "How to Test a Fan Motor Capacitor",
          desc: "Run capacitors in HVAC units and ceiling fans, including dual caps.",
        },
      ]}
    >
      <Callout title="Stored charge can hurt you after the power is off">
        <ul className="space-y-2 list-disc pl-5">
          <li>Unplug the equipment, then check the capacitor terminals in DC volts before touching them.</li>
          <li>Bleed the charge through a resistor, never a screwdriver. A dead short can weld metal, throw sparks and damage the part.</li>
          <li>
            Microwave ovens, old CRT sets, flash units and large power supplies can hold lethal energy. If you are
            not sure how to discharge a specific part, leave it to a qualified technician.
          </li>
        </ul>
      </Callout>

      <section id="safety" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">Discharge first: how much energy is stored</h2>
        <p className="text-muted leading-7 mb-4">
          The energy in a charged capacitor is E = ½CV², so voltage matters far more than size. A 100 µF
          capacitor on a 25 V rail holds about 0.03 joules, roughly nothing. A 470 µF bulk capacitor sitting at
          400 V after the rectifier in a mains power supply holds ½ × 0.00047 × 400² ≈ 37.6 J, enough for a
          painful and dangerous shock and enough to blow the input protection on many meters if you put them in
          a resistance or capacitance range across it. The chart shows how quickly the numbers grow. These are
          worked examples from the formula, not measurements.
        </p>
        <Figure caption="Stored energy E = ½CV² for four example capacitors (log scale). Worked examples, not measured values.">
          <BarChart
            log
            items={[
              { label: "100 µF at 25 V (logic board)", value: 0.031, display: "0.03 J" },
              { label: "470 µF at 50 V (audio amp)", value: 0.59, display: "0.59 J" },
              { label: "2,200 µF at 63 V (linear supply)", value: 4.4, display: "4.4 J" },
              { label: "470 µF at 400 V (mains SMPS)", value: 37.6, display: "37.6 J", highlight: true },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          A resistor discharges the part along an exponential curve with time constant τ = R × C. After five
          time constants, under 1% of the starting voltage is left. For the 470 µF supply capacitor and a
          10 kΩ resistor, τ = 10,000 × 0.00047 = 4.7 s, so allow about 24 s. The resistor briefly sees
          V²/R = 400² ÷ 10,000 = 16 W at the moment of contact, which is why a 1/4 W part can crack; use a
          power resistor with insulated clip leads, or a purpose-made discharge tool. Then confirm the
          terminals read close to 0 V DC before going further.
        </p>
      </section>

      <section id="causes" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">Why a capacitor reading looks wrong</h2>
        <p className="text-muted leading-7 mb-4">
          Before you order a replacement, rule out the measurement. These six causes explain most cases where a
          healthy capacitor appears to &quot;test bad&quot;. The left column is what you see; work across the row.
        </p>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["Reads 15–20% low or high", "Normal factory tolerance", "Look for a tolerance letter or ±% on the body", "Accept anything inside the band"],
            ["Tiny part reads 0 or a few pF too many", "Lead and stray capacitance, or below the meter's resolution", "Read the meter with leads open; check its lowest range", "Use REL/zero, short leads, or an LCR meter"],
            ["OL or blank on a big electrolytic", "Above the meter's maximum range", "Compare the marked µF with the manual's top range", "Use a meter with a higher range"],
            ["Reads far higher in-circuit", "Other capacitors in parallel", "Lift one leg and measure again", "Always confirm out of circuit"],
            ["Number jumps or the meter warns", "Leftover charge on the part", "DC volts across the terminals", "Discharge through a resistor, then retest"],
            ["Value fine, circuit still faulty", "Aged electrolytic with high ESR", "Bulged vent, ESR meter, or swap test", "Replace with same µF, voltage and temperature rating"],
          ]}
        />
        <KeyIdea title="A capacitance reading is a range check, not a pass/fail score">
          Compare the reading with the marked value plus or minus its tolerance. A 100 µF ±20% electrolytic that
          reads 84 µF is in specification. One that reads 30 µF, OL, or 0 Ω is not.
        </KeyIdea>
      </section>

      <section id="steps" className="scroll-mt-28 space-y-8">
        <div>
          <StepHeading n={1}>Power down and discharge</StepHeading>
          <p className="text-muted leading-7">
            Unplug the equipment and wait a minute; many supplies have bleeder resistors that do some of the
            work. Measure DC volts across the capacitor. If it reads more than a volt or two, bleed it through
            a resistor as described above and measure again. Leftover charge upsets a capacitance reading, so an
            erratic number at this stage is a clue to discharge again rather than a fault in the part.
          </p>
        </div>
        <div>
          <StepHeading n={2}>Lift one leg, or remove the part</StepHeading>
          <p className="text-muted leading-7">
            Desolder one lead of a through-hole capacitor and bend it clear of its pad, or remove a surface-mount
            part fully. One free leg is enough to break every parallel path. If that is not practical, treat the
            in-circuit result only as a hint and read the section below on what parallel parts do to it.
          </p>
        </div>
        <div>
          <StepHeading n={3}>Read the markings</StepHeading>
          <p className="text-muted leading-7">
            Note the capacitance, voltage and tolerance. Electrolytics print the value directly, such as
            470 µF 25 V, often with M for ±20%. Film and ceramic parts use a three-digit code plus a letter: J is
            ±5%, K is ±10% and M is ±20%. Write the acceptable window down before you measure so the meter
            cannot anchor your judgment.
          </p>
        </div>
        <div>
          <StepHeading n={4}>Zero the leads on small values</StepHeading>
          <p className="text-muted leading-7">
            For anything under about 1 nF, hold the leads where you will use them, with the tips apart, and
            note what the meter shows. That is the capacitance of the leads and the meter input. If your meter
            has a relative (REL or Δ) button, press it now so the offset is subtracted automatically.
          </p>
        </div>
        <div>
          <StepHeading n={5}>Measure in capacitance mode</StepHeading>
          <p className="text-muted leading-7 mb-4">
            Select the capacitance range, connect red to the positive lead of a polarized part, and wait for the
            reading to settle. Large values can take several seconds to appear.
          </p>
          <div className="max-w-xs mx-auto">
            <Figure caption="Illustrative reading: a 100 µF ±20% capacitor showing 92.4 µF, comfortably inside its 80–120 µF window.">
              <MeterReadout value="92.4" unit="µF" mode="CAPACITANCE" />
            </Figure>
          </div>
        </div>
        <div>
          <StepHeading n={6}>No capacitance mode? Use ohms as a short/open check</StepHeading>
          <p className="text-muted leading-7">
            Set a high resistance range and connect the probes. A good electrolytic reads low at first and climbs
            toward OL as the meter&apos;s small test current charges it. A reading that sticks near 0 Ω means a
            short; an instant OL on a large electrolytic suggests an open part. Small ceramics charge too fast
            for this to show anything, so it only works on larger values.
          </p>
        </div>
      </section>

      <section id="in-circuit" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">In-circuit readings and parallel parts</h2>
        <p className="text-muted leading-7 mb-4">
          Capacitors in parallel add. When the meter&apos;s probes sit across a capacitor that is still soldered
          in, it also sees every other capacitor connected between the same two nodes, which on a power rail
          can be several. Resistors across the same nodes leak away the meter&apos;s charging current, which
          makes the reading unstable or simply wrong.
        </p>
        <Figure caption="In circuit, the meter sees the target capacitor plus everything wired across the same two nodes. Values are illustrative.">
          <svg
            viewBox="0 0 360 200"
            className="w-full h-auto"
            role="img"
            aria-label="Circuit diagram: a multimeter in capacitance mode connected across a 10 microfarad capacitor that is still soldered to a board; a 1 microfarad capacitor, a 100 nanofarad capacitor and a 4.7 kilohm resistor share the same two rails, so the meter reads about 11.1 microfarads plus leakage instead of 10"
          >
            <g className="stroke-foreground" strokeWidth="1.6" fill="none">
              <line x1="40" y1="40" x2="330" y2="40" />
              <line x1="40" y1="140" x2="330" y2="140" />
              {/* target C */}
              <line x1="90" y1="40" x2="90" y2="84" />
              <line x1="90" y1="96" x2="90" y2="140" />
              {/* C2 */}
              <line x1="170" y1="40" x2="170" y2="84" />
              <line x1="170" y1="96" x2="170" y2="140" />
              <line x1="158" y1="84" x2="182" y2="84" />
              <line x1="158" y1="96" x2="182" y2="96" />
              {/* C3 */}
              <line x1="240" y1="40" x2="240" y2="84" />
              <line x1="240" y1="96" x2="240" y2="140" />
              <line x1="228" y1="84" x2="252" y2="84" />
              <line x1="228" y1="96" x2="252" y2="96" />
              {/* R */}
              <line x1="310" y1="40" x2="310" y2="70" />
              <rect x="302" y="70" width="16" height="40" />
              <line x1="310" y1="110" x2="310" y2="140" />
            </g>
            <g className="stroke-accent" strokeWidth="2.4">
              <line x1="76" y1="84" x2="104" y2="84" />
              <line x1="76" y1="96" x2="104" y2="96" />
            </g>
            <text x="112" y="94" fontSize="10" className="fill-accent">10 µF</text>
            <text x="186" y="94" fontSize="10" className="fill-foreground">1 µF</text>
            <text x="256" y="94" fontSize="10" className="fill-foreground">100 nF</text>
            <text x="324" y="94" fontSize="10" className="fill-foreground">4.7k</text>
            <circle cx="60" cy="40" r="3" className="fill-accent" />
            <circle cx="60" cy="140" r="3" className="fill-foreground" />
            <line x1="60" y1="40" x2="20" y2="20" className="stroke-accent" strokeWidth="1.4" />
            <line x1="60" y1="140" x2="20" y2="180" className="stroke-foreground" strokeWidth="1.4" />
            <text x="40" y="30" fontSize="9" className="fill-muted">+ probe</text>
            <text x="40" y="160" fontSize="9" className="fill-muted">COM probe</text>
            <text x="120" y="172" fontSize="10" className="fill-foreground">Meter sees 10 + 1 + 0.1 = 11.1 µF</text>
            <text x="120" y="188" fontSize="9" className="fill-muted">plus leakage through the resistor</text>
          </svg>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The arithmetic is simple: 10 µF + 1 µF + 0.1 µF = 11.1 µF, an 11% error before the resistor makes
          things worse. On a motherboard rail with dozens of decoupling capacitors, the number can be many times
          the marked value of any single part. An in-circuit reading that is lower than the marked value is
          more telling, because parallel parts can only add capacitance, so a low reading points at the target
          or at leakage. Even then, confirm it with the part lifted.
        </p>
      </section>

      <section id="tolerance" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">Is the reading inside tolerance?</h2>
        <p className="text-muted leading-7 mb-4">
          Capacitors are made to much looser tolerances than resistors. Typical figures, which vary by series
          and maker, are ±20% for aluminum electrolytics, ±10% or ±20% for tantalum, ±5% or ±10% for film and
          anywhere from ±5% to a very wide −20/+80% for some high-capacitance ceramics. Ceramic X7R and Y5V
          parts also lose capacitance with DC bias and temperature, so a datasheet is the final word. The table
          turns typical markings into the reading window you should accept.
        </p>
        <DataTable
          head={["Marked value", "Tolerance", "Accept a reading between", "Typical type"]}
          mono={[0, 2]}
          rows={[
            ["100 µF", "±20% (M)", "80 – 120 µF", "Aluminum electrolytic"],
            ["470 µF", "±20% (M)", "376 – 564 µF", "Aluminum electrolytic"],
            ["10 µF", "±10% (K)", "9 – 11 µF", "Tantalum"],
            ["1 µF", "±5% (J)", "0.95 – 1.05 µF", "Film"],
            ["100 nF (104)", "±10% (K)", "90 – 110 nF", "X7R ceramic"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Remember that the meter has its own error on top. Fluke specifies the 115&apos;s 100 µF to 1,000 µF
          readings at 1.9% + 2 counts, and its accuracy above 1,000 µF is much looser. Stack that on the part
          tolerance and a reading a few percent outside the printed window is not proof of failure. Small pF
          parts also run into resolution: the 115&apos;s lowest capacitance range is 1,000 nF with 1 nF
          steps, so a 47 pF part is simply too small for it, and the display will read near zero even though
          the capacitor is fine. Use an LCR meter or a meter with a pF range for those.
        </p>
      </section>

      <section id="esr" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">Aging electrolytics and ESR</h2>
        <p className="text-muted leading-7">
          Aluminum electrolytics wear out. Heat slowly dries the electrolyte, and the first thing that suffers
          is equivalent series resistance (ESR), the small resistance in series with the ideal capacitor. A
          filter capacitor whose ESR has risen will still show its marked microfarads on a multimeter, yet it
          can no longer smooth ripple, so a supply hums, a monitor clicks on and off, or a router reboots.
          Your multimeter cannot measure ESR. Look for a domed or leaking vent on top of the can, measure ESR
          with a dedicated ESR meter, or swap the part for one with the same capacitance, an equal or higher
          voltage rating and the same temperature rating (105 °C if the original was). If the capacitance reads
          well below tolerance as well, the part is far gone and the decision is easy.
        </p>
      </section>

      <section id="which-meter" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">Which meter to use</h2>
        <p className="text-muted leading-7 mb-5">
          Any meter with a capacitance range will check value against tolerance. The figure that separates
          them is the top of the range. The Fluke 179 reads to 10,000 µF, enough for large audio and supply
          filter cans; the Fluke 115 goes to 9,999 µF; the Fluke 17B+ and 15B+ stop at 1,000 µF, which covers
          most board-level work but not a big power supply reservoir. For capacitors you meet on HVAC equipment,
          see{" "}
          <Link href="/multimeters/how-to-test-a-fan-motor-capacitor-with-a-multimeter" className={link}>
            the fan motor capacitor guide
          </Link>
          , and for small ceramics,{" "}
          <Link href="/multimeters/how-to-check-a-ceramic-capacitor-with-a-multimeter" className={link}>
            the ceramic capacitor guide
          </Link>
          . If you are new to meters, start with{" "}
          <Link href="/multimeters/how-to-use-a-multimeter" className={link}>
            how to use a multimeter
          </Link>
          .
        </p>
        {/* Fluke 115 capacitance 1,000 nF lowest range (1 nF resolution), 9,999 µF top, 1.9% + 2 for 100–1,000 µF per https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-115 */}
        <ProductStrip
          title="Meters with a capacitance range"
          items={[
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 True RMS digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "Capacitance from 1 nF to 9,999 µF, True RMS, CAT III 600V. Hands-on tested.",
            },
            {
              name: "Fluke 179",
              image: fluke179.image,
              alt: "Fluke 179 True RMS digital multimeter with bar graph",
              href: "/multimeters/best-multimeters",
              note: "Capacitance to 10,000 µF for big filter capacitors, plus CAT IV 600V.",
            },
            {
              name: "Extech EX330",
              image: ex330.image,
              alt: "Extech EX330 mini auto-ranging multimeter",
              href: "/multimeters/extech-ex330-review",
              note: "Compact meter with capacitance, temperature and built-in NCV.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
