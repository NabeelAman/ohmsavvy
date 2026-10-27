// Specs per Fluke, checked 2026-10-27:
// - Fluke 107 product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-107
//   (not True RMS per the page FAQ; 6,000 counts, 3 updates/s, backlit; DC V 6.000/60.00/600.0 V ±(0.5% + 3), no DC mV
//   range listed; AC mV 600.0 mV ±(3.0% + 3); AC V 40-500 Hz ±(1.0% + 3); DC/AC A 4.000 A and 10.00 A ±(1.5% + 3), AC
//   40-200 Hz; resistance 400.0 Ω ±(0.5% + 3), 4.000 kΩ-4.000 MΩ ±(0.5% + 2), 40.00 MΩ ±(1.5% + 3); capacitance
//   50.00 nF and 500.0 nF ±(2% + 5), 5.000 µF to 1,000 µF ±(5% + 5); frequency 10 Hz-100 kHz ±(0.1% + 3); duty cycle
//   1-99%; diode 2.000 V, 10% accuracy; CAT III 600V; 11 A 1000 V fuse; IP40; 1 m drop; 2 × AAA, at least 200 h;
//   142 × 69 × 28 mm; 200 g; 2-year warranty; TL75 leads and SmartStrap magnetic lanyard in the box; auto-ranging not
//   stated on the page (our Pick notes the Auto indicator on Fluke's display photo).
// - Fluke 106/107 users manual: https://media.fluke.com/8eaf269b-51d3-435f-9e69-b10800c0e4df_original%20file.pdf
//   (continuity beeps below 70 Ω; capacitance readings can take up to 18 s to settle; auto power-off after 20 min).
// - Fluke 115 product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-115
//   (True RMS; auto-ranging; 6,000 counts 4/s + 33-segment bar graph 32/s; DC mV 600.0 mV and DC V ±(0.5% + 2); AC V
//   ±(1.0% + 3); A 6.000 A and 10.00 A, DC ±(1.0% + 3), AC ±(1.5% + 3) 45-500 Hz; resistance 600.0 Ω-6.000 MΩ
//   ±(0.9% + 1), 40.00 MΩ ±(5% + 2); continuity beeps below 20 Ω; diode 2.00 V ±(0.9% + 2); capacitance 1,000 nF
//   (1 nF steps) to 9,999 µF ±(1.9% + 2); frequency to 50.00 kHz ±(0.1% + 2); Min/Max/Avg; CAT III 600V; one 9V,
//   400 h typical; 167 × 84 × 46 mm; 550 g; 3-year warranty).
// LED forward voltages, the 20 mA LED current and Arduino PWM frequency are standard hobby values, hedged on the page.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea, MeterReadout } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-107-vs-fluke-115";

export const metadata = buildMetadata({
  title: "Fluke 107 vs Fluke 115 for Electronics Beginners",
  description:
    "Fluke 107 vs Fluke 115 for beginners learning electronics: resistor, capacitor, diode and current accuracy worked out, True RMS, safety and size compared.",
  path: "/multimeters/fluke-107-vs-fluke-115",
});

const link = "text-accent hover:underline";
const all = getAllPicks("multimeters");

/** Front and side outlines of both meters drawn to the same scale (1 unit = 1 mm). */
function SizeOutlineDiagram() {
  return (
    <svg
      viewBox="0 0 360 230"
      className="w-full h-auto"
      role="img"
      aria-label="To-scale outlines: the Fluke 107 front is 69 by 142 millimeters and 28 millimeters thick; the Fluke 115 front is 84 by 167 millimeters and 46 millimeters thick"
    >
      <g transform="translate(20 34)">
        <rect x="0" y="0" width="69" height="142" rx="10" className="fill-accent/20 stroke-accent" strokeWidth="1.6" />
        <rect x="10" y="12" width="49" height="34" rx="3" className="fill-surface stroke-accent" strokeWidth="1" />
        <circle cx="34.5" cy="88" r="17" className="fill-none stroke-accent" strokeWidth="1.2" />
        <rect x="80" y="0" width="28" height="142" rx="6" className="fill-accent/20 stroke-accent" strokeWidth="1.6" />
        <text x="54" y="160" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">Fluke 107</text>
        <text x="54" y="173" fontSize="8.5" textAnchor="middle" className="fill-muted">142 × 69 × 28 mm, 200 g</text>
      </g>
      <g transform="translate(170 9)">
        <rect x="0" y="0" width="84" height="167" rx="12" className="fill-surface stroke-foreground" strokeWidth="1.6" />
        <rect x="12" y="14" width="60" height="40" rx="3" className="fill-surface stroke-foreground" strokeWidth="1" />
        <circle cx="42" cy="104" r="21" className="fill-none stroke-foreground" strokeWidth="1.2" />
        <rect x="96" y="0" width="46" height="167" rx="8" className="fill-surface stroke-foreground" strokeWidth="1.6" />
        <text x="71" y="185" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">Fluke 115</text>
        <text x="71" y="198" fontSize="8.5" textAnchor="middle" className="fill-muted">167 × 84 × 46 mm, 550 g</text>
      </g>
      <text x="180" y="224" fontSize="8.5" textAnchor="middle" className="fill-muted">Front and side views, same scale</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 107 vs Fluke 115 for Electronics Beginners",
  path,
  published: "2026-10-27",
  intro:
    "For a beginner learning electronics on the bench, the Fluke 107 is the better fit: it reads small resistors and small ceramic capacitors more precisely than the Fluke 115, adds duty cycle for PWM, and costs and weighs less. The 115 wins if your learning includes mains AC, because it is True RMS, and it has a finer DC millivolt range and a far tighter diode test. Neither has a milliamp range, which is the gap every electronics beginner should know about before buying.",
  a: {
    pick: all.find((p) => p.name === "Fluke 107")!,
    imageAlt: "Fluke 107 palm-sized digital multimeter, front view",
    chooseIf: [
      "You are learning on breadboards, Arduino boards and kits rather than house wiring",
      "You want the closer resistor and small-capacitor readings and a duty-cycle function",
      "You want a light meter that lives on the bench or in a backpack",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 115")!,
    reviewHref: "/multimeters/fluke-115-review",
    imageAlt: "Fluke 115 True RMS digital multimeter, front view",
    chooseIf: [
      "Your learning will move on to mains appliances, motors or HVAC controls",
      "You want True RMS AC readings and a 600.0 mV DC range",
      "You want a bar graph and Min/Max/Avg to watch values change",
    ],
  },
  extraSpecs: [
    { label: "True RMS", a: "No (Fluke says so)", b: "Yes" },
    { label: "Display", a: "6,000 counts, 3 updates/s", b: "6,000 counts, 4 updates/s + bar graph" },
    { label: "Lowest DC volts range", a: "6.000 V (1 mV steps)", b: "600.0 mV (0.1 mV steps)" },
    { label: "Resistance, lowest range", a: "400.0 Ω, ±(0.5% + 3)", b: "600.0 Ω, ±(0.9% + 1)" },
    { label: "Capacitance", a: "50.00 nF to 1,000 µF", b: "1,000 nF (1 nF steps) to 9,999 µF" },
    { label: "Diode test", a: "2.000 V, 10%", b: "2.00 V, ±(0.9% + 2)" },
    { label: "Current", a: "4.000 A and 10.00 A", b: "6.000 A and 10.00 A" },
    { label: "Frequency / duty cycle", a: "To 100 kHz / 1–99%", b: "To 50 kHz / not listed" },
    { label: "Continuity beep", a: "Below 70 Ω", b: "Below 20 Ω" },
    { label: "Safety rating", a: "CAT III 600V", b: "CAT III 600V" },
    { label: "Battery", a: "2 × AAA, at least 200 h", b: "One 9V, 400 h typical" },
    { label: "Size / weight", a: "142 × 69 × 28 mm, 200 g", b: "167 × 84 × 46 mm, 550 g" },
    { label: "Warranty", a: "2 years", b: "3 years" },
  ],
  differences: [
    "The 115 is True RMS; Fluke states the 107 is not, so the 107's AC readings drift on distorted waveforms such as dimmers and switch-mode supplies.",
    "The 107 has tighter resistance accuracy on its lower ranges, ±(0.5% + 2 or 3), against ±(0.9% + 1) on the 115.",
    "The 107 has a 50.00 nF capacitance range with 0.01 nF steps; the 115's smallest range is 1,000 nF with 1 nF steps, so small ceramics read far more precisely on the 107.",
    "The 115 has a 600.0 mV DC range and a ±(0.9% + 2) diode test; the 107's DC volts start at 6.000 V and its diode test is specified at 10%.",
    "The 107 adds duty cycle and reads frequency to 100 kHz; the 115 adds a bar graph, Min/Max/Avg and a 3-year warranty.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">What a beginner actually measures</h2>
        <p className="text-muted leading-7 mb-4">
          Most first months with a multimeter look the same: checking battery and supply voltages, sorting resistors
          from a mixed bag, confirming a wire or solder joint is continuous, finding which way round a diode or LED
          goes, reading a capacitor that lost its markings, and trying to see how much current a project draws. The
          table below takes those jobs one at a time.
        </p>
        <DataTable
          head={["Beginner task", "Fluke 107", "Fluke 115", "Edge"]}
          rows={[
            ["Battery or 5 V / 3.3 V rail", "6.000 V range, ±(0.5% + 3)", "6.000 V range, ±(0.5% + 2)", "Tie"],
            ["Sorting resistors", "400.0 Ω range, ±(0.5% + 3)", "600.0 Ω range, ±(0.9% + 1)", "107"],
            ["Small ceramic capacitors", "50.00 nF range, 0.01 nF steps", "1,000 nF range, 1 nF steps", "107"],
            ["Electrolytic capacitors", "To 1,000 µF, ±(5% + 5)", "To 9,999 µF, ±(1.9% + 2)", "115"],
            ["Diode or LED direction", "2.000 V, 10%", "2.00 V, ±(0.9% + 2)", "115"],
            ["Continuity on a wire or joint", "Beeps below 70 Ω", "Beeps below 20 Ω", "115"],
            ["Arduino PWM pin", "Frequency + duty cycle", "Frequency only", "107"],
            ["Project current in mA", "1 mA steps, ±3 counts", "1 mA steps, ±3 counts", "Neither"],
            ["Wall-outlet AC", "Average-responding", "True RMS", "115"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Four rows go to the 115, three to the 107, one is a tie, and one is a gap in both. The rows the 107 wins are
          the bench-electronics ones; the 115 wins on diodes, continuity, big capacitors and mains. Our{" "}
          <Link href="/multimeters/how-to-use-a-multimeter" className={link}>
            how to use a multimeter
          </Link>{" "}
          guide covers each of these measurements from scratch, and{" "}
          <Link href="/multimeters/multimeter-symbols-explained" className={link}>
            multimeter symbols explained
          </Link>{" "}
          decodes the dial on either meter.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 107 vs 115 spec by spec, worked out</h2>
        <p className="text-muted leading-7 mb-4">
          Accuracy lines like ±(0.5% + 3) only mean something once you apply them to a real part. Here they are on
          values a beginner meets on day one. One count is the last digit of the range in use.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Allowed error reading a 220 Ω resistor, in ohms. Lower is better.</>}>
            <BarChart
              items={[
                { label: "Fluke 107 (400.0 Ω)", value: 1.4, display: "±1.4 Ω", highlight: true },
                { label: "Fluke 115 (600.0 Ω)", value: 2.08, display: "±2.1 Ω" },
              ]}
            />
          </Figure>
          <Figure caption={<>Allowed error reading a 10 nF ceramic capacitor, in nanofarads. Lower is better.</>}>
            <BarChart
              items={[
                { label: "Fluke 107 (50.00 nF)", value: 0.25, display: "±0.25 nF", highlight: true },
                { label: "Fluke 115 (1,000 nF)", value: 2.19, display: "±2.2 nF" },
              ]}
            />
          </Figure>
          <Figure caption={<>Allowed error reading a 47 µF electrolytic, in microfarads. Lower is better.</>}>
            <BarChart
              items={[
                { label: "Fluke 107 (50.00 µF)", value: 2.4, display: "±2.4 µF" },
                { label: "Fluke 115 (100.0 µF)", value: 1.09, display: "±1.1 µF", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Allowed error on a 0.6 V silicon diode drop, in millivolts. Lower is better.</>}>
            <BarChart
              items={[
                { label: "Fluke 107 (10%)", value: 60, display: "±60 mV" },
                { label: "Fluke 115", value: 7.4, display: "±7 mV", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The arithmetic behind the charts: for 220 Ω, the 107 allows 0.5% (1.1 Ω) plus 3 × 0.1 Ω, while the 115
          allows 0.9% (2.0 Ω) plus 0.1 Ω. For 10 nF, the 107 allows 2% (0.2 nF) plus 5 × 0.01 nF; the 115 reads it on
          a range with 1 nF steps, so its 2-count allowance alone is 2 nF, or 20% of the part. For 47 µF the tables turn:
          the 107&apos;s ±(5% + 5) gives about ±2.4 µF against about ±1.1 µF on the 115. For a 0.6 V diode drop, the
          107&apos;s 10% means ±60 mV; the 115 allows 0.9% plus 2 mV, about ±7 mV.
        </p>
        <div className="mt-4">
          <KeyIdea title="Precision isn't the same as being the better beginner meter">
            Typical hobby resistors carry a 1% or 5% tolerance, so either meter sorts them correctly. The 10 nF case is
            the one that changes outcomes: on the 115 the reading carries more uncertainty than a 10% ceramic&apos;s own
            tolerance. Our guide to{" "}
            <Link href="/multimeters/how-to-check-a-ceramic-capacitor-with-a-multimeter" className={link}>
              checking a ceramic capacitor
            </Link>{" "}
            shows how to get a clean reading. Fluke&apos;s 107 manual warns capacitance can take up to 18 seconds to
            settle, so be patient.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The current-range trap for beginners</h2>
        <p className="text-muted leading-7 mb-4">
          Beginners almost always want to measure current: how much an LED, a motor or an Arduino sketch draws. Neither
          Fluke has a milliamp or microamp jack. The 107&apos;s smallest current range is 4.000 A and the 115&apos;s is
          6.000 A, both with 1 mA steps and a 3-count allowance. On an LED driven at a typical 20 mA, the 107 allows 0.3
          mA plus 3 mA, about ±3.3 mA; the 115&apos;s DC line of ±(1.0% + 3) gives about ±3.2 mA. Either way the
          reading is uncertain by roughly 16%, and a microcontroller sleeping at a few hundred microamps reads 0.000 A
          on both.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <Figure caption={<>Illustrative: a 20 mA LED circuit on the 107&apos;s 4 A range.</>}>
            <MeterReadout value="0.020" unit="A DC" mode="A  (4.000 range)" />
          </Figure>
          <Figure caption={<>Illustrative: a sleeping microcontroller on the 115&apos;s 6 A range.</>}>
            <MeterReadout value="0.000" unit="A DC" mode="A  (6.000 range)" />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          If measuring project current matters to you, either meter needs a partner, or you should pick a meter with
          real mA and µA ranges from our{" "}
          <Link href="/multimeters/best-multimeters-for-arduino-and-circuit-board-testing" className={link}>
            Arduino and circuit board multimeter
          </Link>{" "}
          guide. The workaround with either Fluke is to measure the voltage across a known resistor and divide, as our
          guide to{" "}
          <Link href="/multimeters/how-to-measure-current-consumption-of-an-arduino-with-a-multimeter" className={link}>
            measuring an Arduino&apos;s current consumption
          </Link>{" "}
          explains. Here the 115&apos;s 600.0 mV DC range helps: 20 mA through a 10 Ω resistor drops 200 mV, which it
          reads in 0.1 mV steps, while the 107 reads it on its 6.000 V range in 1 mV steps.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">True RMS, safety ratings and size</h2>
        <p className="text-muted leading-7 mb-4">
          True RMS matters less to a bench beginner than marketing suggests. Breadboard work is DC, and on a clean sine
          from a wall transformer the average-responding 107 and the True RMS 115 agree within spec. The gap opens on
          distorted AC: dimmer outputs, switch-mode supply inputs and motor drives, where the 107 can read wrong and the
          115 stays honest. The 107&apos;s AC current is also specified only from 40 to 200 Hz. If your next step
          after kits is appliance repair, that is a reason to choose the 115.
        </p>
        <p className="text-muted leading-7 mb-4">
          On safety, the two are equals: both are rated CAT III 600V, far beyond anything on a hobby bench, and Fluke lists an 11 A,
          1000 V fast-acting fuse on the 107&apos;s current input. The commonest beginner accident is leaving the red lead in the A jack and then
          probing a battery or outlet as if measuring volts; that shorts the source through the fuse. Read{" "}
          <Link href="/multimeters/why-does-a-multimeter-fuse-blow-when-measuring-current" className={link}>
            why a multimeter fuse blows when measuring current
          </Link>{" "}
          before your first current reading.
        </p>
        <Figure caption={<>The two meters drawn to the same scale. The 107 is about 36% of the 115&apos;s weight.</>}>
          <SizeOutlineDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Size cuts both ways. The 107 weighs 200 g against 550 g and is 28 mm thick against 46 mm, so it sits on a
          crowded bench or in a backpack without fuss, and its AAA cells are cheap and easy to find. The 115&apos;s larger
          display adds a 33-segment bar graph that updates 32 times a second, which helps when you turn a
          potentiometer and want to watch the trend, and Min/Max/Avg catches a supply that dips while a motor starts.
        </p>
        <InfoCards
          items={[
            { label: "Fluke 107 strengths", desc: "Small parts precision, duty cycle, 100 kHz, 200 g, AAA cells." },
            { label: "Fluke 115 strengths", desc: "True RMS, 600.0 mV DC, tight diode test, bar graph, 3-year warranty." },
            { label: "Shared limits", desc: "No mA or µA ranges, no temperature, CAT III 600V on both." },
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 107 vs Fluke 115 for beginners: which should you buy?</h2>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["Learning on breadboards and kits", "Fluke 107", "Better small-resistor and ceramic-capacitor readings, duty cycle"],
            ["Learning Arduino and PWM", "Fluke 107", "Duty cycle and frequency to 100 kHz; pair with a mA-capable meter"],
            ["Student who will move into electrical trades", "Fluke 115", "True RMS and a body built for field work"],
            ["Hobbyist repairing appliances or audio gear", "Fluke 115", "True RMS on AC, 600.0 mV DC, tight diode test"],
            ["Carrying a meter in a backpack", "Fluke 107", "200 g and 28 mm thick"],
            ["Wanting the longest warranty", "Fluke 115", "3 years against 2"],
            ["Mainly measuring project current", "Neither", "No mA or µA ranges on either"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The Fluke 115 is one of the meters the owner has bought and tested; our 107 assessment is desk research against
          Fluke&apos;s published specifications. For more starter options, see our{" "}
          <Link href="/multimeters/best-multimeter-for-beginners" className={link}>
            best multimeter for beginners
          </Link>{" "}
          guide. To see the 107 against a True RMS electrician&apos;s meter, read{" "}
          <Link href="/multimeters/fluke-117-vs-fluke-107" className={link}>
            Fluke 117 vs Fluke 107
          </Link>
          ; against its cheaper twin, read{" "}
          <Link href="/multimeters/fluke-106-vs-fluke-107" className={link}>
            Fluke 106 vs Fluke 107
          </Link>
          .
        </p>
      </section>

      <Callout title="Safety for first-time meter users">
        Bench projects at 5 V or 12 V are low risk, but wall outlets are not. Before probing mains, check the dial and the
        lead jacks, hold both probes by their finger guards, and never measure current across an outlet. Large
        electrolytic capacitors in power supplies can hold a dangerous charge long after unplugging, and lithium cells
        can burn if shorted through the current jack. Both meters are CAT III 600V, but the rating protects you only when
        the leads are in good condition. Leave panel and service work to a licensed electrician.
      </Callout>
    </>
  ),
  bottomLine:
    "For a beginner learning electronics, buy the Fluke 107: it reads small resistors and ceramic capacitors more precisely, adds duty cycle, and is easy to carry. Choose the Fluke 115 if your learning will reach mains appliances or trade work, where True RMS, a 600.0 mV range and a tight diode test matter. With either, plan for a separate meter with mA and µA ranges if you need to measure project current.",
  faqs: [
    {
      question: "Is the Fluke 107 good for beginners?",
      answer:
        "Yes, especially for electronics. It is small and light, rated CAT III 600V, reads resistance with ±(0.5% + 3) accuracy on its lowest range and has a 50.00 nF capacitance range for small ceramics. Its limits are no True RMS, a loose 10% diode test and no milliamp range, so it can't read small project currents precisely.",
    },
    {
      question: "Is the Fluke 115 overkill for a beginner?",
      answer:
        "Not if you'll work on mains equipment. Its True RMS, bar graph and Min/Max/Avg are useful once you move past kits. For purely breadboard learning, though, it is bigger and heavier than needed, and it reads small capacitors and low resistances less precisely than the Fluke 107. It is the more versatile long-term meter of the two.",
    },
    {
      question: "Can the Fluke 107 or 115 measure milliamps?",
      answer:
        "Only coarsely. Neither has a milliamp or microamp jack; their smallest current ranges are 4.000 A and 6.000 A, both with 1 mA steps and a 3-count allowance. A 20 mA LED reads with about ±3 mA of uncertainty. For Arduino sleep currents, use a meter with true mA and µA ranges or measure voltage across a known resistor.",
    },
    {
      question: "Does a beginner need a True RMS multimeter?",
      answer:
        "Not for battery, breadboard and DC work, where True RMS makes no difference. It matters on distorted AC, such as dimmer outputs, switch-mode power supplies and motor drives, where an average-responding meter like the 107 can misread. If you expect to work on mains appliances soon, the True RMS Fluke 115 is worth choosing.",
    },
    {
      question: "Can the Fluke 107 test LEDs?",
      answer:
        "Partly. Its diode test runs to 2.000 V with about 2.0 V available, which covers many red LEDs but not blue or white ones, which typically need around 3 V and show overload. The 115's diode range also stops at 2 V. Accuracy differs: the 107 is specified at 10%, the 115 at ±(0.9% + 2).",
    },
    {
      question: "Which is safer for a beginner, the Fluke 107 or 115?",
      answer:
        "They share the same CAT III 600V rating, so neither is safer by rating. Safety for a beginner comes from habits: checking the dial and lead jacks before each reading, using lead finger guards, and never measuring current across a voltage source. Replace damaged test leads before using either meter on mains.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 115 review", href: "/multimeters/fluke-115-review" },
    { label: "Fluke 117 vs Fluke 107", href: "/multimeters/fluke-117-vs-fluke-107" },
    { label: "Fluke 106 vs Fluke 107", href: "/multimeters/fluke-106-vs-fluke-107" },
    { label: "Fluke 107 vs Fluke 101", href: "/multimeters/fluke-107-vs-fluke-101" },
    { label: "Best multimeter for beginners", href: "/multimeters/best-multimeter-for-beginners" },
    { label: "Best multimeters for Arduino and circuit boards", href: "/multimeters/best-multimeters-for-arduino-and-circuit-board-testing" },
  ],
};

export default function Fluke107VsFluke115Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
