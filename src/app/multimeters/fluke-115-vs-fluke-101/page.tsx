// Specs per Fluke, as already used on this site's fluke-115-review, fluke-115-vs-fluke-117 and fluke-117-vs-fluke-101 pages:
// - Fluke 115: product page + spec tab https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-115
//   and the 114/115/116/117 datasheet (2793260b, 08/2020) https://media.fluke.com/ce54d963-3be9-4e70-8a3e-b1060070fdfd_original%20file.pdf
//   (True RMS, CAT III 600V, 6,000 counts + 33-segment bar graph, DC V 600.0 mV to 600 V ±(0.5% + 2), AC V ±(1.0% + 3),
//   6 A / 10 A AC/DC with 1 mA best resolution, 40 MΩ ±(0.9% + 1), 1 nF to 9,999 µF, 50 kHz (2020 manual: 99.99 kHz),
//   Min/Max/Avg + hold, backlight, 167 × 84 × 46 mm, 550 g, one 9 V about 400 h, 3-year warranty)
// - Fluke 101: product page (India; not on fluke.com US)
//   https://www.fluke.com/en-in/product/electrical-testing/digital-multimeters/fluke-101, datasheet and users manual
//   (130 × 65 × 27 mm, 160 g, CAT III 600V, two AAA, 1-year warranty, 1 m drop, 6.000 to 600.0 V DC ±(0.5% + 3),
//   AC V 1.0% + 3 with no True RMS claim, 40 MΩ, frequency 10 Hz to 100 kHz, duty cycle 0.1% to 99.9%, diode,
//   continuity, no current function, two input jacks, hold listed as absent on the India page, no backlight mentioned)
// Conflict: Fluke's 101 documents give top capacitance as 100 µF or 1,000 µF. Stated on the page.
// Electronics section (added 2026-10-29): 101 ohms 400.0 Ω ±(0.5% + 3), capacitance from 50.00 nF and frequency with no
// published accuracy, per the en-in page notes on /multimeters/fluke-107-vs-fluke-101; 115 600.0 Ω range, continuity
// below about 20 Ω / 500 µs and 2.000 V diode test per /multimeters/fluke-115-review. Worked readings are illustrative.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-115-vs-fluke-101";

export const metadata = buildMetadata({
  title: "Fluke 115 vs Fluke 101: Which Should You Buy?",
  description:
    "Fluke 115 vs Fluke 101: a True RMS field meter with 10 A current against a 160 g pocket Fluke with no amps. Specs, electronics use, warranty and which to buy.",
  image: picks.find((p) => p.name === "Fluke 115")!.image,
  path: "/multimeters/fluke-115-vs-fluke-101",
});

const link = "text-accent hover:underline";

/** Front faces and thickness of both meters drawn to the same scale (1 mm = 1.1 px), from Fluke's stated dimensions. */
function SizeDiagram() {
  const s = 1.1;
  const base = 210;
  const m115 = { w: 84 * s, h: 167 * s, d: 46 * s };
  const m101 = { w: 65 * s, h: 130 * s, d: 27 * s };
  return (
    <svg
      viewBox="0 0 340 246"
      className="w-full h-auto"
      role="img"
      aria-label="Scale drawing of the Fluke 115 and Fluke 101. The 115 front face is 167 by 84 millimeters and 46 millimeters thick; the 101 is 130 by 65 millimeters and 27 millimeters thick, about half the volume."
    >
      {/* Fluke 115 front and side */}
      <rect x="20" y={base - m115.h} width={m115.w} height={m115.h} rx="8" className="fill-surface stroke-foreground" strokeWidth="1.4" />
      <rect x="30" y={base - m115.h + 12} width={m115.w - 20} height="36" rx="3" className="fill-accent/20 stroke-border" strokeWidth="1" />
      <circle cx={20 + m115.w / 2} cy={base - m115.h / 2 + 18} r="22" className="fill-none stroke-border" strokeWidth="1.2" />
      <rect x={20 + m115.w + 8} y={base - m115.h} width={m115.d} height={m115.h} rx="6" className="fill-surface stroke-border" strokeWidth="1.2" strokeDasharray="4 3" />
      <text x={20 + m115.w / 2} y={base + 16} fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">
        Fluke 115
      </text>
      <text x={20 + m115.w / 2} y={base + 29} fontSize="8.5" textAnchor="middle" className="fill-muted">
        167 × 84 mm, 550 g
      </text>
      <text x={20 + m115.w + 8 + m115.d / 2} y={base + 16} fontSize="8.5" textAnchor="middle" className="fill-muted">
        46 mm
      </text>

      {/* Fluke 101 front and side */}
      <rect x="190" y={base - m101.h} width={m101.w} height={m101.h} rx="8" className="fill-surface stroke-accent" strokeWidth="1.4" />
      <rect x="198" y={base - m101.h + 10} width={m101.w - 16} height="28" rx="3" className="fill-accent/20 stroke-border" strokeWidth="1" />
      <circle cx={190 + m101.w / 2} cy={base - m101.h / 2 + 14} r="17" className="fill-none stroke-border" strokeWidth="1.2" />
      <rect x={190 + m101.w + 8} y={base - m101.h} width={m101.d} height={m101.h} rx="5" className="fill-surface stroke-border" strokeWidth="1.2" strokeDasharray="4 3" />
      <text x={190 + m101.w / 2} y={base + 16} fontSize="10" fontWeight="700" textAnchor="middle" className="fill-accent">
        Fluke 101
      </text>
      <text x={190 + m101.w / 2} y={base + 29} fontSize="8.5" textAnchor="middle" className="fill-muted">
        130 × 65 mm, 160 g
      </text>
      <text x={190 + m101.w + 8 + m101.d / 2} y={base + 16} fontSize="8.5" textAnchor="middle" className="fill-muted">
        27 mm
      </text>
      <text x="170" y="14" fontSize="8.5" textAnchor="middle" className="fill-muted">
        Drawn to one scale. Dashed outline = side view (thickness).
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 115 vs Fluke 101: Which Should I Buy?",
  path,
  published: "2026-10-27",
  updated: "2026-10-29",
  intro:
    "Buy the Fluke 115 if you will ever need to measure current or read AC on electronic loads: it is True RMS and handles 10 A, and the Fluke 101 measures no current at all. Buy the 101 only as a pocket-sized second meter for voltage, continuity, frequency and duty cycle. Both are CAT III 600V Flukes with 6,000-count displays, but the 115 is a full field-service meter and the 101 is closer to a compact voltage tester with extra functions.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 115")!,
    reviewHref: "/multimeters/fluke-115-review",
    imageAlt: "Fluke 115 True RMS field-service multimeter, front view",
    chooseIf: [
      "You need amps, whether a motor's running current or a heater element's draw",
      "You measure on LED drivers, dimmers, variable-speed blowers or other non-sine loads, where True RMS matters",
      "You want a backlight, Min/Max/Avg recording and a 3-year warranty from Fluke US",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 101")!,
    imageAlt: "Fluke 101 compact basic digital multimeter, front view",
    chooseIf: [
      "You only check voltage, continuity, diodes and fuses, and never measure current",
      "You want frequency to 100 kHz and duty cycle in a meter that fits a shirt pocket",
      "You need a light backup meter for a tool bag or vehicle and accept a 1-year warranty on an import",
    ],
  },
  extraSpecs: [
    { label: "True RMS", a: "Yes", b: "Not claimed by Fluke" },
    { label: "Current", a: "6 A and 10 A AC/DC (1 mA best resolution)", b: "None; two input jacks only" },
    { label: "Display", a: "6,000 counts + 33-segment bar graph", b: "6,000 counts" },
    { label: "Lowest DC volts range", a: "600.0 mV (0.1 mV steps)", b: "6.000 V (1 mV steps)" },
    { label: "DC volts accuracy", a: "±(0.5% + 2)", b: "±(0.5% + 3)" },
    { label: "Resistance", a: "To 40 MΩ", b: "To 40 MΩ" },
    { label: "Capacitance", a: "1 nF to 9,999 µF", b: "Fluke sources conflict: 100 µF or 1,000 µF" },
    { label: "Frequency / duty cycle", a: "To 50 kHz (2020 manual: 99.99 kHz) / Not stated", b: "10 Hz to 100 kHz / 0.1–99.9% (product page), 1–99% (datasheet)" },
    { label: "Min/Max, hold, backlight", a: "Min/Max/Avg, hold, backlight", b: "Min/Max not stated; hold listed as absent; no backlight mentioned" },
    { label: "Size / weight", a: "167 × 84 × 46 mm, 550 g", b: "130 × 65 × 27 mm, 160 g" },
    { label: "Battery", a: "One 9 V, about 400 h", b: "Two AAA (life not stated)" },
    { label: "Drop rating", a: "Not stated", b: "1 m" },
    { label: "Warranty / US sale", a: "3 years; sold by Fluke US", b: "1 year; Amazon listing is a third-party import" },
  ],
  differences: [
    "Current: the 115 reads AC and DC amps on 6 A and 10 A ranges; the 101 has only two jacks and no current function.",
    "True RMS: Fluke specifies the 115 as True RMS and makes no such claim for the 101, so the 101's AC readings are trustworthy on clean sine waves only.",
    "Low-voltage resolution: the 115's 600.0 mV range resolves 0.1 mV; the 101's lowest range is 6.000 V.",
    "Signal functions favor the 101: frequency to 100 kHz on its spec and duty cycle (0.1–99.9% per Fluke's product page, 1–99% per its datasheet), neither of which the 115's datasheet matches.",
    "Size: the 101 weighs 160 g against 550 g and is 27 mm thick against 46 mm.",
    "Same on paper: CAT III 600V, 6,000 counts, 600 V maximum, auto-ranging, resistance to 40 MΩ and near-identical DC accuracy.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">The decision in one question: do you measure amps?</h2>
        <p className="text-muted leading-7 mb-4">
          Most buyers comparing these two expect a step up in quality or accuracy. On voltage and resistance there
          isn&apos;t much of one: Fluke gives the 115 ±(0.5% + 2) on DC volts and the 101 ±(0.5% + 3). On a 12.00 V
          reading that is ±0.08 V against ±0.09 V, a difference no one will notice. The real split is in what each
          meter can measure at all.
        </p>
        <p className="text-muted leading-7 mb-4">
          The 101 has just two input jacks and no current function. That rules out checking a motor&apos;s
          running amps, confirming a heating element draws what its rating says, or finding a parasitic drain in series
          with a battery. The 115 handles all of these up to 10 A. If any of them is in your future, the comparison is
          over and the 115 is the meter. If you truly only verify voltage, continuity and components, keep reading,
          because the 101 has real advantages.
        </p>
        <KeyIdea title="Clamp-on is an alternative, not a fix">
          Some 101 owners add a clamp meter for current instead of buying a larger multimeter. That works for AC
          loads, but a clamp needs a single conductor to close around and many can&apos;t read DC. A 115 measures DC
          amps in series, which a basic AC clamp can&apos;t. Our{" "}
          <Link href="/multimeters/fluke-117-vs-fluke-t5-600" className={link}>
            Fluke 117 vs Fluke T5-600
          </Link>{" "}
          comparison covers the tester-with-a-jaw route.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Size, weight and warranty compared</h2>
        <Figure caption={<>Both meters drawn to the same scale from Fluke&apos;s dimensions. The 101 has a little over half the 115&apos;s front area and well under half its volume.</>}>
          <SizeDiagram />
        </Figure>
        <div className="mt-4 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Weight in grams per Fluke. The 101 is under a third of the 115.</>}>
            <BarChart
              items={[
                { label: "Fluke 115", value: 550, display: "550 g" },
                { label: "Fluke 101", value: 160, display: "160 g", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Warranty in years per Fluke. The 115 is covered three times as long.</>}>
            <BarChart
              items={[
                { label: "Fluke 115", value: 3, display: "3 years", highlight: true },
                { label: "Fluke 101", value: 1, display: "1 year" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The volume arithmetic: 167 × 84 × 46 mm is about 645 cm³ for the 115, and 130 × 65 × 27 mm is about 228 cm³
          for the 101, roughly 35% of the size. That is the difference between a meter that lives in a holster or tool
          case and one that rides in a jacket pocket. The 101 also carries a 1 m drop rating; Fluke&apos;s data for the
          115 doesn&apos;t state one. Power differs too: the 115 runs about 400 hours on one 9 V, while the 101 takes two
          AAA cells and Fluke doesn&apos;t state a life figure.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Function by function</h2>
        <DataTable
          head={["Function", "Fluke 115", "Fluke 101", "Edge"]}
          rows={[
            ["AC volts on electronic loads", "True RMS, ±(1.0% + 3)", "No True RMS claim", "115"],
            ["Millivolt signals", "600.0 mV range", "Starts at 6.000 V", "115"],
            ["Current", "6 A / 10 A AC and DC", "None", "115"],
            ["Capacitance", "1 nF to 9,999 µF", "100 µF or 1,000 µF (sources conflict)", "115"],
            ["Frequency", "50 kHz (manual: 99.99 kHz)", "10 Hz to 100 kHz", "101"],
            ["Duty cycle", "Not stated", "0.1–99.9% (product page) / 1–99% (datasheet)", "101"],
            ["Watching a changing value", "33-segment bar graph, Min/Max/Avg", "Digits only", "115"],
            ["Dim panels and crawlspaces", "Backlight", "No backlight mentioned", "115"],
            ["Pocket carry", "550 g, 46 mm thick", "160 g, 27 mm thick", "101"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The capacitance line deserves a note. Fluke&apos;s own 101 documents disagree on the top of the range, one
          giving 100 µF and another 1,000 µF. Either way, the 115&apos;s 9,999 µF covers the large filter capacitors in
          power supplies and inverters that the 101 may not. The 101&apos;s duty-cycle reading is its most useful
          extra: it lets you check a PWM fan or dimmer control signal, which the 115&apos;s datasheet doesn&apos;t list.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 115 vs 101 for electronics</h2>
        <p className="text-muted leading-7 mb-4">
          On a hobby or repair bench the question changes. Mains current matters less, and what counts is how finely
          each meter resolves small signals, whether it can size a component, and whether it can tell you what a
          switching circuit is doing. Here the two Flukes trade wins, and neither is a complete bench meter.
        </p>
        <DataTable
          head={["Bench task", "Fluke 115", "Fluke 101", "Better here"]}
          rows={[
            ["Sensor output or shunt drop under 0.6 V", "600.0 mV DC range, 0.1 mV steps", "Lowest DC range 6.000 V, 1 mV steps", "115"],
            ["Low-value resistor", "600.0 Ω range, ±(0.9% + 1)", "400.0 Ω range, ±(0.5% + 3)", "Close; 101 on paper"],
            ["Microcontroller sleep or standby current", "No mA or µA range; 1 mA best step", "No current function", "Neither"],
            ["Electrolytic filter capacitor", "1 nF to 9,999 µF, ±(1.9% + 2)", "50.00 nF up to 100 or 1,000 µF; accuracy not stated", "115"],
            ["Oscillator, clock or PWM frequency", "To 50 kHz (2020 manual: 99.99 kHz)", "10 Hz to 100 kHz; accuracy not stated", "101"],
            ["PWM duty cycle", "Not stated", "0.1–99.9% (product page) / 1–99% (datasheet)", "101"],
            ["Diode and LED check", "2.000 V test", "Diode test listed, voltage not stated", "115 (documented)"],
            ["Continuity on traces and jumpers", "Beeps below about 20 Ω; catches 500 µs dropouts", "Buzzer listed; threshold not stated", "115 (documented)"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The millivolt row is where the 115 pulls ahead for sensor and current-shunt work. Take an illustrative
          250.0 mV reading. Using the ±(0.5% + 2) figure Fluke quotes for the 115&apos;s DC ranges, the window is
          1.25 mV plus 2 × 0.1 mV, about ±1.45 mV. The 101 has to read that signal on its 6.000 V range as 0.250 V,
          and ±(0.5% + 3) gives 1.25 mV plus 3 × 1 mV, about ±4.25 mV. The 115&apos;s window is roughly a third the
          size, and its display shows a fourth significant digit the 101 can&apos;t.
        </p>
        <div className="mt-4 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Meter tolerance on an illustrative 250 mV DC reading, in mV, worked from Fluke&apos;s specs. Lower is better.</>}>
            <BarChart
              items={[
                { label: "Fluke 115", value: 1.45, display: "±1.45 mV", highlight: true },
                { label: "Fluke 101", value: 4.25, display: "±4.25 mV" },
              ]}
            />
          </Figure>
          <Figure caption={<>Tolerance on an illustrative 100 Ω resistor, in ohms. The 101&apos;s 400 Ω range is slightly tighter.</>}>
            <BarChart
              items={[
                { label: "Fluke 115", value: 1.0, display: "±1.0 Ω" },
                { label: "Fluke 101", value: 0.8, display: "±0.8 Ω", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Resistance runs the other way, slightly. A 100 Ω part on the 115 allows 0.9 Ω plus one 0.1 Ω count, ±1.0 Ω;
          on the 101 it is 0.5 Ω plus three counts, ±0.8 Ω. Neither gap would change a pass or fail on a 1% or 5%
          resistor. Capacitance is a clearer split: a 4,700 µF reservoir capacitor in an amplifier or bench supply sits
          inside the 115&apos;s range, while both of the 101&apos;s published ceilings stop short of it. Fluke also
          publishes no capacitance or frequency accuracy for the 101, so its readings there are indications rather
          than specified measurements.
        </p>
        <p className="text-muted leading-7 mt-4">
          For signals, the 101&apos;s duty-cycle mode is the one function the 115 doesn&apos;t list, and it is the
          quickest way to confirm a fan controller or LED dimmer is actually changing its command. The gap both meters
          share is low current: the 115 resolves only whole milliamps through its 6 A range, and the 101 has no current
          input at all. If you measure battery-powered boards in sleep mode, read{" "}
          <Link href="/multimeters/how-to-measure-microamps-with-a-multimeter" className={link}>
            how to measure microamps with a multimeter
          </Link>{" "}
          and look at a meter with µA ranges, such as the 17B+ in our{" "}
          <Link href="/multimeters/fluke-17b-plus-vs-fluke-101" className={link}>
            Fluke 17B+ vs Fluke 101
          </Link>{" "}
          comparison.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 115 or 101: which should you buy?</h2>
        <DataTable
          head={["Situation", "Buy", "Reason"]}
          rows={[
            ["Your first and only meter", "Fluke 115", "Current and True RMS cover jobs the 101 can't attempt"],
            ["Appliance, HVAC or motor repair", "Fluke 115", "Running amps and large run capacitors"],
            ["Car battery drain hunting", "Fluke 115", "DC amps in series; the 101 has no current input"],
            ["Glovebox or tool-bag backup", "Fluke 101", "160 g, 1 m drop rating, two AAA cells"],
            ["Checking outlets, fuses and switches only", "Fluke 101", "Voltage and continuity are all the job needs"],
            ["PWM, fan and dimmer signals", "Fluke 101", "Duty cycle and 100 kHz frequency"],
            ["LED drivers and variable-speed loads", "Fluke 115", "True RMS reads non-sine AC correctly"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Skip the 101 if you are buying one meter to learn on: you&apos;ll hit its missing current function within
          weeks. Skip the 115 if you already own a capable meter and just want something small for quick checks; its
          extra weight buys features your main meter already has. The{" "}
          <Link href="/multimeters/fluke-107-vs-fluke-101" className={link}>
            Fluke 107 vs Fluke 101
          </Link>{" "}
          comparison covers a pocket Fluke that does measure current, and{" "}
          <Link href="/multimeters/fluke-115-vs-fluke-117" className={link}>
            Fluke 115 vs Fluke 117
          </Link>{" "}
          covers the 115&apos;s bigger sibling.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">How we compared them</h2>
        <p className="text-muted leading-7 mb-4">
          OhmSavvy bought and used a Fluke 115, which is why it carries our Hands-on Tested badge; read the{" "}
          <Link href="/multimeters/fluke-115-review" className={link}>
            Fluke 115 review
          </Link>{" "}
          for that write-up. We haven&apos;t tested a Fluke 101, so its side of this page is desk research against
          Fluke&apos;s 101 product page, datasheet and manual. The 101 isn&apos;t listed on Fluke&apos;s US site, and
          its Amazon listing comes through a third-party importer. All figures for both meters are Fluke&apos;s
          published specifications, not our measurements.
        </p>
        <Callout title="Same CAT III 600V limit on both">
          Both meters are rated CAT III 600V: fine for panels, branch circuits and receptacles, not for the meter base
          or service drop. Use test leads rated at least as high as the meter, prove the meter on a known live source
          before and after testing a circuit you plan to touch, and call a licensed electrician for service-entrance
          work.
        </Callout>
      </section>
    </>
  ),
  bottomLine:
    "The Fluke 115 is the right buy for nearly everyone: True RMS, 10 A current, a wide capacitance range, a backlight and a 3-year warranty make it a complete field meter. The Fluke 101 makes sense only as a light pocket meter for voltage, continuity, frequency and duty cycle, ideally alongside a meter that measures current.",
  faqs: [
    {
      question: "Can the Fluke 101 measure current?",
      answer:
        "No. The 101 has only two input jacks, and Fluke lists no current function for it. To read amps you need a meter with current ranges, such as the Fluke 115 with its 6 A and 10 A AC/DC ranges, or a clamp meter for AC loads where you can isolate a single conductor.",
    },
    {
      question: "Is the Fluke 101 True RMS?",
      answer:
        "Fluke doesn't describe it as True RMS, so treat it as average-responding. On a clean utility sine wave that makes little difference. On LED drivers, dimmers, switch-mode power supplies and variable-speed motors, its AC readings can drift from the true value. The Fluke 115 is True RMS on both AC volts and AC amps.",
    },
    {
      question: "Is the Fluke 101 accurate enough for household electrical work?",
      answer:
        "For voltage checks, yes. Fluke specifies its DC volts at ±(0.5% + 3), almost the same as the 115's ±(0.5% + 2), and it carries the same CAT III 600V rating. What limits it in household work is the lack of current measurement and of a backlight, not its accuracy.",
    },
    {
      question: "Why is the Fluke 101 hard to find from Fluke in the US?",
      answer:
        "Fluke doesn't list the 101 on its US website; it is sold in markets such as India. The Amazon.com listing comes from a third-party importer, and the meter carries a one-year warranty rather than the 115's three years. Check the seller and warranty terms before buying if long-term support matters to you.",
    },
    {
      question: "How much smaller is the Fluke 101 than the Fluke 115?",
      answer:
        "Considerably. Fluke lists the 101 at 130 × 65 × 27 mm and 160 g, and the 115 at 167 × 84 × 46 mm and 550 g. By volume the 101 is about 35% of the 115, and it weighs under a third as much, which is why it fits a shirt or jacket pocket.",
    },
    {
      question: "Which is better for HVAC work, the Fluke 115 or 101?",
      answer:
        "The 115, though neither is ideal. It reads compressor and blower current and tests run capacitors up to 9,999 µF. Neither meter has a microamp range for flame sensors or a temperature input, so HVAC technicians usually step up to a meter with both; our HVAC multimeter guide lists options.",
    },
    {
      question: "Is the Fluke 115 or Fluke 101 better for electronics projects?",
      answer:
        "It depends on the project. The 115 resolves 0.1 mV on its 600.0 mV range, sizes capacitors up to 9,999 µF and documents its diode and continuity specs, so it suits sensor, power-supply and amplifier work. The 101 reads duty cycle and frequency to 100 kHz, which helps on PWM and timer circuits. Neither has mA or µA ranges for sleep-current checks.",
    },
    {
      question: "Can the Fluke 115 or 101 measure a microcontroller's sleep current?",
      answer:
        "Not usefully. The 115's only current ranges are 6 A and 10 A, so its smallest step is 1 mA, far coarser than the microamps a sleeping board draws. The 101 has no current input at all. For that job you need a meter with dedicated µA ranges, such as the Fluke 17B+ with its 400.0 µA range.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 115 review", href: "/multimeters/fluke-115-review" },
    { label: "Fluke 115 vs Fluke 117", href: "/multimeters/fluke-115-vs-fluke-117" },
    { label: "Fluke 117 vs Fluke 101", href: "/multimeters/fluke-117-vs-fluke-101" },
    { label: "Fluke 107 vs Fluke 101", href: "/multimeters/fluke-107-vs-fluke-101" },
    { label: "Fluke 101 vs Fluke T5-600", href: "/multimeters/fluke-101-vs-fluke-t5-600" },
    { label: "Fluke 115 vs Klein MM400", href: "/multimeters/fluke-115-vs-klein-mm400" },
    { label: "Best multimeter for HVAC technicians", href: "/multimeters/best-multimeter-for-hvac-technicians" },
  ],
};

export default function Fluke115VsFluke101Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
