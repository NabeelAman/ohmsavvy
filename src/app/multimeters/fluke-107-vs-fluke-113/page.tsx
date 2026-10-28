// Specs per the Fluke 107 Pick (src/app/multimeters/best-multimeters/page.tsx) and the Fluke 113 Pick
// (src/lib/multimeter-catalog.ts), plus the sources already cited on this site (checked 2026-10-26/27):
// - Fluke 107 per fluke-107-vs-fluke-101 and fluke-106-vs-fluke-107 (Fluke 107 product page, Fluke 106/107 Users
//   Manual): DC V 6.000/60.00/600.0 V ±(0.5% + 3); AC V 40-500 Hz ±(1.0% + 3); AC mV 600.0 mV ±(3.0% + 3); volts input
//   >10 MΩ, <100 pF; DC and AC (40-200 Hz) current 4.000 A / 10.00 A ±(1.5% + 3), 0.001 A best resolution, no mA/µA;
//   resistance 400.0 Ω to 40.00 MΩ; capacitance 50.00 nF to 1,000 µF, ±(2% + 5) nF ranges, ±(5% + 5) µF ranges, up
//   to 18 s to settle; frequency 10 Hz to 100 kHz ±(0.1% + 3); duty cycle 1-99%; diode 2.000 V ±10%; continuity beeps
//   below 70 Ω; 6,000 counts, 3 updates/s; backlight (auto-off 2 min); data hold; 2 × AAA, 200 h minimum;
//   142 × 69 × 28 mm, 200 g; IP40; 1 m drop; CAT III 600 V; 2-year warranty; "not a true-RMS"; TL75 leads and
//   SmartStrap magnetic lanyard included.
// - Fluke 113 per fluke-113-vs-fluke-115 and fluke-113-vs-fluke-117 (Fluke 113 product page and spec tab, Amazon
//   listing B004Q05ODI): VCHEK LoZ volts 6.000/60.00/600.0 V, ±(2.0% + 3) DC and 45-500 Hz, ±(4.0% + 3) 500 Hz-1 kHz,
//   input about 3 kΩ, 3 V DC minimum in autorange; VCHEK falls back to continuity when no voltage is present;
//   resistance 600.0 Ω to 60.00 kΩ; capacitance 1,000 nF to 9,999 µF, ±(1.9% + 2) to 1,000 µF, ±(5% + 20) on the
//   9,999 µF range; continuity beeps <20 Ω, off >250 Ω; diode 2.000 V ±(2.0% + 3); 6,000 counts, 4/s; backlight;
//   Min/Max; auto and manual ranging; IEC 61010-2-033 CAT IV 600 V; 9 V, about 300 h without backlight;
//   167.1 × 85.1 × 46.0 mm, 404 g; two jacks, no current; frequency not listed; warranty for a new unit not stated;
//   LoZ phase-to-earth can trip a GFCI/RCD. Conflicts: Amazon bullet says CAT III 600 V / CAT IV 300 V; True RMS is
//   in the Amazon title and on the meter label but only in a footnote on fluke.com.
// Typical LED forward voltages and the voltage-divider arithmetic are standard values, hedged on the page.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const all = getAllPicks("multimeters");
const path = "/multimeters/fluke-107-vs-fluke-113";
const link = "text-accent hover:underline";

export const metadata = buildMetadata({
  title: "Fluke 107 vs 113 Comparison for Basic Testing",
  description:
    "Fluke 107 vs 113 comparison: a pocket meter with amps, Hz and a 50 nF range against a VCHEK utility meter rated CAT IV 600V. Which suits basic tests?",
  image: all.find((p) => p.name === "Fluke 113")!.image,
  path: "/multimeters/fluke-107-vs-fluke-113",
});

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 107 vs Fluke 113: Which Meter Is Better for Basic Testing?",
  path,
  published: "2026-10-29",
  intro:
    "For basic testing around the house, the bench or the car, the Fluke 107 is the better meter. It reads current, frequency, small capacitors and resistance up to 40 MΩ, all things the Fluke 113 can't do. The 113 wins a narrower contest: confirming whether building wiring is live or dead, where its VCHEK low-impedance position, CAT IV 600V rating and automatic fallback to continuity make it quicker and safer. This Fluke 107 vs 113 comparison walks through the everyday jobs one at a time.",
  a: {
    pick: all.find((p) => p.name === "Fluke 107")!,
    imageAlt: "Fluke 107 palm-sized digital multimeter with backlit display, front view",
    chooseIf: [
      "You test AA, 9 V and car batteries, fuses, resistors and small electronics",
      "You need current up to 10 A, frequency or duty cycle",
      "You want a 200 g meter that fits a glovebox or pocket",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 113")!,
    imageAlt: "Fluke 113 True RMS utility multimeter with VCHEK, front view",
    chooseIf: [
      "Your basic test is proving a circuit live or dead before you touch it",
      "You work near the service entrance and want Fluke's CAT IV 600V rating",
      "You check large motor-run or filter capacitors up to 9,999 µF",
    ],
  },
  extraSpecs: [
    { label: "Volts input", a: "Over 10 MΩ (normal)", b: "About 3 kΩ (VCHEK LoZ only)" },
    { label: "DC volts accuracy", a: "±(0.5% + 3)", b: "±(2.0% + 3)" },
    { label: "Small DC voltages", a: "6.000 V range, any level", b: "3 V DC minimum in autorange" },
    { label: "Current", a: "4 A and 10 A, AC/DC", b: "None" },
    { label: "Resistance", a: "400 Ω to 40 MΩ", b: "600 Ω to 60 kΩ" },
    { label: "Capacitance", a: "50 nF to 1,000 µF", b: "1,000 nF to 9,999 µF" },
    { label: "Frequency / duty cycle", a: "10 Hz to 100 kHz; 1–99%", b: "Not stated" },
    { label: "Diode test", a: "2.000 V, ±10%", b: "2.000 V, ±(2.0% + 3)" },
    { label: "Continuity beep", a: "Below 70 Ω", b: "Below 20 Ω; automatic in VCHEK" },
    { label: "True RMS", a: "No (Fluke: \"not a true-RMS\")", b: "Per Amazon and meter label; fluke.com footnote only" },
    { label: "Safety rating", a: "CAT III 600V", b: "CAT IV 600V per Fluke (Amazon: CAT III 600V / CAT IV 300V)" },
    { label: "Size / weight", a: "142 × 69 × 28 mm, 200 g", b: "167.1 × 85.1 × 46.0 mm, 404 g" },
    { label: "Battery", a: "2 × AAA, 200 h minimum", b: "One 9 V, about 300 h without backlight" },
    { label: "Warranty", a: "2 years", b: "Not stated for a new unit" },
  ],
  differences: [
    "The 107 reads volts through a conventional input of over 10 MΩ; the 113 reads volts only through VCHEK, a low-impedance input of about 3 kΩ.",
    "The 107 measures current on 4 A and 10 A ranges plus frequency and duty cycle; the 113 has no current input and Fluke lists no frequency function.",
    "Resistance stops at 60 kΩ on the 113 against 40 MΩ on the 107.",
    "The 107's capacitance starts at a 50 nF range; the 113's starts at 1,000 nF but reaches 9,999 µF, ten times the 107's 1,000 µF top.",
    "Fluke rates the 113 CAT IV 600V and the 107 CAT III 600V, and the 113's Amazon listing quotes a lower figure than Fluke does.",
    "Both show 6,000 counts, both have a backlight and a 2.000 V diode range, and both run auto-ranging.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">What counts as basic testing</h2>
        <p className="text-muted leading-7 mb-4">
          Ask ten people what they need a meter for and most lists look alike: is this battery any good, is this
          fuse blown, does this outlet have power, is this wire broken, what value is this resistor, and is this
          capacitor dead. The 107 and 113 handle that list very differently, because Fluke built them for different
          people. The 107 is a small general-purpose meter. The 113 is a utility meter whose volts function exists
          mainly to answer one question about mains wiring.
        </p>
        <DataTable
          head={["Everyday test", "Fluke 107", "Fluke 113"]}
          rows={[
            ["AA or AAA cell (about 1.5 V)", "Yes, 6 V range", "Below the 3 V autorange minimum"],
            ["9 V or 12 V battery", "Yes", "Yes, under a 3 kΩ load"],
            ["Outlet live or dead", "Yes, high-Z", "Yes, LoZ with continuity fallback"],
            ["Blown fuse or broken wire", "Beeps below 70 Ω", "Beeps below 20 Ω"],
            ["Resistor over 60 kΩ", "Yes, to 40 MΩ", "No"],
            ["Ceramic cap under 1 µF", "50 nF range", "No range that small"],
            ["Large electrolytic, 2,000 µF+", "No (1,000 µF top)", "Yes, to 9,999 µF"],
            ["Current draw", "To 10 A", "No"],
            ["LED or rectifier diode", "2.000 V range", "2.000 V range"],
            ["Fan or dimmer frequency", "To 100 kHz", "Not stated"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Count the rows and the 107 covers more of the list. The 113&apos;s wins are real but concentrated on mains
          work and very large capacitors. Fluke documents a 3 V DC minimum for VCHEK in autorange; it doesn&apos;t
          say whether manual ranging reads lower, so we wouldn&apos;t buy a 113 to check AA cells.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The ranges that decide everyday jobs</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Top resistance range, log scale: the 107 reaches about 670 times higher.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 107", value: 40000000, display: "40 MΩ", highlight: true },
                { label: "Fluke 113", value: 60000, display: "60 kΩ" },
              ]}
            />
          </Figure>
          <Figure caption={<>Smallest capacitance range, log scale: lower is better for small parts.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 107", value: 50, display: "50 nF", highlight: true },
                { label: "Fluke 113", value: 1000, display: "1,000 nF" },
              ]}
            />
          </Figure>
          <Figure caption={<>Largest capacitance range, log scale: the 113 goes ten times higher.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 107", value: 1000, display: "1,000 µF" },
                { label: "Fluke 113", value: 9999, display: "9,999 µF", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Weight per Fluke. The 113 is about twice as heavy.</>}>
            <BarChart
              items={[
                { label: "Fluke 107", value: 200, display: "200 g", highlight: true },
                { label: "Fluke 113", value: 404, display: "404 g" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The resistance gap rules out a lot of hobby work on the 113: pull-up resistors, potentiometers, many
          thermistors and anything in the hundreds of kilohms sits above its 60 kΩ ceiling. The capacitance ranges
          split the other way. Decoupling and timing capacitors in the 10 nF to 470 nF region fit the 107&apos;s
          small ranges (at ±(2% + 5) on the nF ranges) and fall below anything the 113 lists, while a large
          bus capacitor beyond 1,000 µF needs the 113.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Battery checks, worked on each meter</h2>
        <p className="text-muted leading-7 mb-4">
          Take a 9 V battery reading 9.00 V. Both meters land on their 60 V range with 0.01 V resolution. The 107&apos;s
          DC spec of ±(0.5% + 3) works out to 0.045 V plus 3 counts of 0.01 V, so ±0.075 V. The 113&apos;s VCHEK
          spec of ±(2.0% + 3) gives 0.18 V plus 0.03 V, so ±0.21 V, nearly three times the uncertainty. For a
          pass/fail check that doesn&apos;t matter; for tracking a battery&apos;s slow decline, it does.
        </p>
        <p className="text-muted leading-7 mb-4">
          There is a side effect worth knowing. At about 3 kΩ the 113 draws roughly 9 ÷ 3,000, or 3 mA, from the
          battery while you measure. That is a tiny load, far short of a proper load test, so don&apos;t treat it as
          one; our guide on{" "}
          <Link href="/multimeters/how-to-check-a-9v-battery-with-a-multimeter-under-load" className={link}>
            checking a 9 V battery under load
          </Link>{" "}
          explains the right method. The 107&apos;s 10 MΩ input draws under a microamp.
        </p>
        <KeyIdea title="Where the 3 kΩ input hurts">
          A low-impedance meter pulls weak sources down. On a car&apos;s sensor signal or a thermostat line the 113
          can show a voltage far below the true one, which is the opposite of what you want while troubleshooting.
          The 107 has no low-impedance mode, so it reads those circuits as they are. The loading arithmetic is laid
          out in{" "}
          <Link href="/multimeters/fluke-113-vs-fluke-115" className={link}>
            Fluke 113 vs Fluke 115
          </Link>
          .
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where the 113 earns a place in a basic kit</h2>
        <p className="text-muted leading-7 mb-4">
          On household wiring the 113 is the more decisive tool. Its VCHEK position shows voltage if any is present
          and switches to a continuity check if none is, so you can probe a switch leg or a receptacle without
          turning the dial. The low input impedance also drags induced ghost voltage on unused conductors toward
          zero, where the 107&apos;s high-impedance input may show a confusing reading. Fluke rates the 113 CAT IV
          600V, a step above the 107&apos;s CAT III 600V.
        </p>
        <p className="text-muted leading-7">
          Its continuity threshold is stricter too: the 113 beeps below 20 Ω and goes quiet above 250 Ω, while the
          107 beeps anywhere below 70 Ω. For a fuse either works. For a crimped connector you suspect is going
          bad, the tighter threshold tells you more. And the 113&apos;s 9,999 µF capacitance range reaches the large
          capacitors found in some motor and power-supply circuits; our{" "}
          <Link href="/multimeters/how-to-test-a-capacitor-with-a-multimeter" className={link}>
            capacitor testing guide
          </Link>{" "}
          covers discharging them first.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["If you mostly…", "Pick", "Because"]}
          rows={[
            ["Check batteries of every size", "Fluke 107", "Reads 1.5 V cells; tighter DC accuracy"],
            ["Fix small electronics or hobby circuits", "Fluke 107", "40 MΩ, 50 nF range, Hz and duty cycle"],
            ["Measure a car or appliance current draw", "Fluke 107", "4 A and 10 A ranges"],
            ["Prove outlets and switch legs dead", "Fluke 113", "VCHEK LoZ with continuity fallback"],
            ["Work near the panel feed or meter base", "Fluke 113", "CAT IV 600V per Fluke"],
            ["Test capacitors above 1,000 µF", "Fluke 113", "Range to 9,999 µF"],
            ["Want one meter in a glovebox", "Fluke 107", "200 g and 28 mm thick"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          <strong>Buy the Fluke 107</strong> if &quot;basic testing&quot; means a mix of batteries, fuses, cords,
          resistors and the odd current reading. <strong>Skip it</strong> if your main job is mains verification on
          distorted loads, since Fluke states it is not True RMS. <strong>Buy the Fluke 113</strong> if you are an
          electrician, facilities tech or utility worker who mostly confirms voltage presence and absence.{" "}
          <strong>Skip it</strong> for electronics, automotive sensors or anything below 3 V. Those whose basic kit
          includes mains work and current should also read{" "}
          <Link href="/multimeters/fluke-107-vs-fluke-115" className={link}>
            Fluke 107 vs Fluke 115
          </Link>
          , and{" "}
          <Link href="/multimeters/fluke-113-vs-fluke-117" className={link}>
            Fluke 113 vs Fluke 117
          </Link>{" "}
          shows what a full electrician&apos;s meter adds to VCHEK.
        </p>
        <Callout title="Mains safety with either meter">
          Check the meter on a known live source before and after testing any circuit you plan to work on. The
          107&apos;s CAT III 600V rating covers branch circuits and panels, not the utility side of the meter base;
          leave that to a licensed electrician. Fluke warns that low-impedance readings taken from hot to ground can
          trip a GFCI or RCD, so on protected outlets test hot to neutral with the 113. If you smell burning or see
          scorch marks at an outlet, switch off the breaker and call an electrician rather than probing it.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where the sources disagree</h2>
        <p className="text-muted leading-7">
          Fluke rates the 113 CAT IV 600V under IEC 61010-2-033, and the meter is printed that way, but a bullet on
          its Amazon listing gives CAT III 600V and CAT IV 300V; we follow Fluke. The Amazon title and the meter&apos;s
          front label say True RMS, while Fluke&apos;s spec tab mentions it only in a general footnote. Fluke does not
          state a warranty for a new 113 (the reconditioned version lists three years). For the 107 the sources agree:
          Fluke&apos;s page answers plainly that it is not True RMS and gives a two-year warranty.
        </p>
      </section>
    </>
  ),
  bottomLine:
    "For basic testing in the broad sense, the Fluke 107 is the better buy: it reads small cells, current, frequency, resistance to 40 MΩ and small capacitors, in a 200 g body. The Fluke 113 is better only when your basic test is proving mains wiring live or dead, where VCHEK and its CAT IV 600V rating earn their keep.",
  faqs: [
    {
      question: "Can the Fluke 113 test an AA battery?",
      answer:
        "Not reliably. Fluke specifies a 3 V DC minimum for the 113's VCHEK voltage function in autorange, and a fresh AA cell sits around 1.5 V. Fluke doesn't say whether manual ranging changes that. The Fluke 107 reads 1.5 V cells on its 6.000 V range with millivolt resolution, so it is the better choice for household batteries.",
    },
    {
      question: "Does the Fluke 107 have a low-impedance mode like VCHEK?",
      answer:
        "No. The 107's volts input is over 10 MΩ and there is no LoZ position, so induced voltage on an open wire can show as a reading. That high impedance is an advantage on electronics and sensors. If ghost voltage is a regular problem in your work, the 113, 114 or 117 have a low-impedance option.",
    },
    {
      question: "Which is easier for a beginner, the Fluke 107 or 113?",
      answer:
        "The 107 for most beginners. Its functions match what new users actually test, it reads current and frequency, and its 200 g body is easy to carry. The 113 is simpler on mains, with one VCHEK position for voltage and continuity, but its 60 kΩ resistance limit and 3 V minimum trip up anyone working on electronics.",
    },
    {
      question: "Can either meter measure milliamps?",
      answer:
        "No. The 107 has 4 A and 10 A ranges with 1 mA best resolution, which is too coarse for small standby or sensor currents. The 113 has no current function at all. For milliamp and microamp work, a meter with dedicated low-current ranges, such as the Fluke 15B+ with ranges starting at 400.0 µA, is the better tool.",
    },
    {
      question: "Can the Fluke 107 or 113 test a white LED?",
      answer:
        "Usually not. Both have a 2.000 V diode range, and white and blue LEDs typically need around 3 V to conduct, so they read as open. Red and some green LEDs, with forward voltages typically under 2 V, can register. Either meter checks ordinary silicon rectifier diodes, which drop well under 1 V.",
    },
    {
      question: "Is the Fluke 113 True RMS?",
      answer:
        "Amazon's title and the meter's own front label say True RMS, but Fluke's spec tab mentions it only in a general footnote. The Fluke 107 is not True RMS by Fluke's own statement. On clean sine-wave outlet voltage both are fine; on dimmers or drives a True RMS meter gives the more trustworthy AC reading.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 113 vs Fluke 115", href: "/multimeters/fluke-113-vs-fluke-115" },
    { label: "Fluke 113 vs Fluke 117", href: "/multimeters/fluke-113-vs-fluke-117" },
    { label: "Fluke 107 vs Fluke 115", href: "/multimeters/fluke-107-vs-fluke-115" },
    { label: "Fluke 106 vs Fluke 107", href: "/multimeters/fluke-106-vs-fluke-107" },
    { label: "Fluke 107 vs Fluke 101", href: "/multimeters/fluke-107-vs-fluke-101" },
    { label: "Fluke 117 vs Fluke 107", href: "/multimeters/fluke-117-vs-fluke-107" },
    { label: "Fluke 15B+ vs Fluke 107", href: "/multimeters/fluke-15b-plus-vs-fluke-107" },
    { label: "Best multimeter for beginners", href: "/multimeters/best-multimeter-for-beginners" },
  ],
};

export default function Fluke107VsFluke113Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
