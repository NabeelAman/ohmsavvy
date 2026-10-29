// Specs per the Fluke 106 Pick (src/app/multimeters/best-multimeters/page.tsx) and the Fluke 114 Pick
// (src/lib/multimeter-catalog.ts), plus the sources already cited on this site (checked 2026-10-26/27):
// - Fluke 106 per fluke-106-vs-fluke-107 and fluke-107-vs-fluke-101 (Fluke 106/107 product pages and the 106/107
//   Users Manual): 142 × 69 × 28 mm, 200 g, 2 × AAA, 200 h minimum; CAT III 600 V; IP40; 6,000 counts, 3 updates/s;
//   DC V 6/60/600 V ±(0.5% + 3); AC V 40-500 Hz ±(1.0% + 3); AC mV 600.0 mV ±(3.0% + 3); volts input >10 MΩ, <100 pF;
//   current 4.000 A / 10.00 A AC and DC ±(1.5% + 3), AC current 40-200 Hz, no mA or µA ranges; resistance 400.0 Ω
//   to 40.00 MΩ; capacitance 50 nF to 1,000 µF, readings take up to 18 s to settle; continuity beeps below 70 Ω;
//   auto power off after 20 min; diode, frequency and duty cycle are 107 only; positioned for "everyday
//   applications, where true-rms accuracy isn't needed". Conflicts: the Pick's verdict mentions data hold, but
//   Fluke's 106 page doesn't list hold or a backlight; warranty 2 years per Fluke's 106/107 documentation, while
//   the 106 page itself states none. A drop rating is cited for the 107 only.
// - Fluke 114 per fluke-114-vs-fluke-115 and fluke-114-vs-fluke-117 (Fluke 114 product page and spec tab, the
//   114/115/116/117 datasheet 2793260b, Amazon listing B000IZ9FD0): True RMS AC V and AC mV; DC V and DC mV
//   ±(0.5% + 2); AC V ±(1.0% + 3) 45-500 Hz, ±(2.0% + 3) 500 Hz-1 kHz; AutoVolt LoZ 600.0 V ±(2.0% + 3), automatic
//   AC/DC; resistance 600.0 Ω to 6.000 MΩ ±(0.9% + 1), 40.00 MΩ ±(5% + 2); continuity beeps <20 Ω, off >250 Ω;
//   6,000 counts + 33-segment bar graph at 32/s; white LED backlight; Min/Max/Average with elapsed time; CAT III 600 V;
//   9 V, 400 h without backlight; 167 × 84 × 46 mm, 550 g (Amazon: 0.51 kg); 3-year warranty; no current,
//   capacitance, frequency or diode test. Conflicts: the overview says "voltage and current" while the spec table
//   lists no current ranges and the meter has only COM and + jacks; a temperature footnote with no temperature function.
// - LoZ phase-to-earth GFCI/RCD trip warning per Fluke's 113 page (cited on fluke-113-vs-fluke-115).
// Ghost-voltage behavior of high-impedance inputs is standard meter theory, hedged on the page.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const all = getAllPicks("multimeters");
const path = "/multimeters/fluke-106-vs-fluke-114";
const link = "text-accent hover:underline";

export const metadata = buildMetadata({
  title: "Fluke 106 vs 114 Differences: Which to Buy?",
  description:
    "Fluke 106 vs 114 differences: a 200 g pocket meter that reads amps and capacitance against a True RMS AutoVolt LoZ voltage tester. Specs, charts, verdict.",
  image: all.find((p) => p.name === "Fluke 114")!.image,
  path: "/multimeters/fluke-106-vs-fluke-114",
});

/** Front and side outlines of both meters drawn to the same scale (1 px = 1 mm) from Fluke's published dimensions. */
function SizeOutlines() {
  const base = 190;
  return (
    <svg
      viewBox="0 0 340 236"
      className="w-full h-auto"
      role="img"
      aria-label="To-scale outlines: the Fluke 106 is 142 by 69 by 28 millimeters and the Fluke 114 is 167 by 84 by 46 millimeters, so the 114 is taller, wider and about two thirds thicker"
    >
      {/* Fluke 106: front 69 × 142, side 28 × 142 */}
      <rect x="22" y={base - 142} width="69" height="142" rx="8" className="fill-surface stroke-accent" strokeWidth="1.5" />
      <rect x="32" y={base - 130} width="49" height="30" rx="3" className="fill-none stroke-border" strokeWidth="1" />
      <circle cx="56.5" cy={base - 62} r="16" className="fill-none stroke-border" strokeWidth="1" />
      <rect x="102" y={base - 142} width="28" height="142" rx="5" className="fill-surface stroke-accent" strokeWidth="1.5" />
      <text x="76" y={base + 16} fontSize="10" fontWeight="600" textAnchor="middle" className="fill-foreground">Fluke 106</text>
      <text x="76" y={base + 30} fontSize="9" textAnchor="middle" className="fill-muted">142 × 69 × 28 mm, 200 g</text>

      {/* Fluke 114: front 84 × 167, side 46 × 167 */}
      <rect x="176" y={base - 167} width="84" height="167" rx="10" className="fill-surface stroke-border" strokeWidth="1.5" />
      <rect x="188" y={base - 154} width="60" height="34" rx="3" className="fill-none stroke-border" strokeWidth="1" />
      <circle cx="218" cy={base - 74} r="20" className="fill-none stroke-border" strokeWidth="1" />
      <rect x="272" y={base - 167} width="46" height="167" rx="6" className="fill-surface stroke-border" strokeWidth="1.5" />
      <text x="247" y={base + 16} fontSize="10" fontWeight="600" textAnchor="middle" className="fill-foreground">Fluke 114</text>
      <text x="247" y={base + 30} fontSize="9" textAnchor="middle" className="fill-muted">167 × 84 × 46 mm, 550 g</text>

      <line x1="10" x2="330" y1={base} y2={base} className="stroke-border" strokeWidth="0.8" />
      <text x="170" y="12" fontSize="8.5" textAnchor="middle" className="fill-muted">Front and side views, same scale</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 106 vs Fluke 114: Which Compact Multimeter Should You Buy?",
  path,
  published: "2026-10-29",
  intro:
    "The Fluke 106 vs 114 differences run in opposite directions. The 106 is the genuinely compact one, a 200 g palm-sized meter that reads amps and capacitance but isn't True RMS. The 114 is a full-size 110-series body that does less, measuring only volts, ohms and continuity, yet does those with True RMS, an AutoVolt low-impedance input, a bar graph and Min/Max/Average. Pick by the measurement you can't do without, not by size.",
  a: {
    pick: all.find((p) => p.name === "Fluke 106")!,
    imageAlt: "Fluke 106 palm-sized digital multimeter, front view",
    chooseIf: [
      "You need to read current, up to 10 A, as well as volts",
      "You want to check capacitors from 50 nF to 1,000 µF",
      "The meter has to live in a glovebox, kitchen drawer or small pouch",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 114")!,
    imageAlt: "Fluke 114 True RMS electrician's multimeter with AutoVolt LoZ, front view",
    chooseIf: [
      "You check building wiring and want a low-impedance input to rule out ghost voltage",
      "You need True RMS readings on dimmers, drives or electronic loads",
      "You log a fluctuating voltage with Min/Max/Average and want a fast bar graph",
    ],
  },
  extraSpecs: [
    { label: "True RMS", a: "No (average-responding)", b: "Yes, AC volts and AC mV" },
    { label: "Low-impedance volts", a: "No", b: "AutoVolt LoZ, 600.0 V, auto AC/DC" },
    { label: "DC volts accuracy", a: "±(0.5% + 3)", b: "±(0.5% + 2)" },
    { label: "AC volts accuracy", a: "±(1.0% + 3), 40–500 Hz", b: "±(1.0% + 3), 45–500 Hz; ±(2.0% + 3) to 1 kHz" },
    { label: "Millivolts", a: "AC 600.0 mV only", b: "AC and DC mV" },
    { label: "Current", a: "4 A and 10 A, AC/DC (no mA/µA)", b: "None (two jacks only)" },
    { label: "Capacitance", a: "50 nF to 1,000 µF", b: "Not listed" },
    { label: "Resistance", a: "400 Ω to 40 MΩ", b: "600 Ω to 40 MΩ" },
    { label: "Continuity beep", a: "Below 70 Ω", b: "Below 20 Ω (off above 250 Ω)" },
    { label: "Display extras", a: "6,000 counts; backlight not listed", b: "6,000 counts, 33-segment bar graph, backlight" },
    { label: "Recording", a: "Hold: see note", b: "Min/Max/Average with elapsed time" },
    { label: "Size / weight", a: "142 × 69 × 28 mm, 200 g", b: "167 × 84 × 46 mm, 550 g (Amazon: 0.51 kg)" },
    { label: "Battery", a: "2 × AAA, 200 h minimum", b: "One 9 V, 400 h without backlight" },
    { label: "Warranty", a: "2 years per Fluke docs (106 page: not stated)", b: "3 years" },
  ],
  differences: [
    "The 106 measures current on 4 A and 10 A ranges and capacitance to 1,000 µF; the 114 has only COM and V/Ω jacks and lists neither function.",
    "The 114 is True RMS and has AutoVolt, a low-impedance 600 V position that picks AC or DC for you; the 106 is average-responding with a conventional high-impedance input only.",
    "The 114 adds a 33-segment bar graph, a listed backlight and Min/Max/Average with elapsed time; Fluke's 106 page lists none of these.",
    "The 106 weighs 200 g against 550 g and is 28 mm thick against 46 mm.",
    "Both are CAT III 600V with 6,000-count displays, and their shared DC and AC voltage accuracy is close: ±(0.5% + 3) versus ±(0.5% + 2) on DC.",
    "Warranty is 3 years on the 114; Fluke's 106/107 documentation gives the 106 two years, though the 106 product page itself doesn't state one.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Only one of these is really compact</h2>
        <p className="text-muted leading-7 mb-4">
          Searchers often lump the 114 in with Fluke&apos;s small meters because it does so few things, but
          physically it shares the same 167 × 84 × 46 mm housing as the 115 and 117. The 106 belongs to a different
          family: the 101/106/107 pocket line, built around two AAA cells. Drawn to the same scale, the gap is
          obvious.
        </p>
        <Figure caption={<>Outlines from Fluke&apos;s published dimensions. The 114 is about 2.75 times heavier.</>}>
          <SizeOutlines />
        </Figure>
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <Figure caption={<>Weight per Fluke. Amazon lists the 114 at 0.51 kg.</>}>
            <BarChart
              items={[
                { label: "Fluke 106", value: 200, display: "200 g", highlight: true },
                { label: "Fluke 114", value: 550, display: "550 g" },
              ]}
            />
          </Figure>
          <Figure caption={<>Rated battery life. The 106 figure is a minimum; the 114 figure is without backlight.</>}>
            <BarChart
              items={[
                { label: "Fluke 106", value: 200, display: "200 h min" },
                { label: "Fluke 114", value: 400, display: "400 h", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The bulk buys the 114 a 9 V battery rated for twice the hours, a bar graph that refreshes 32 times a
          second and a backlight. The 106 trades all three for something you can drop in a shirt pocket. If
          &quot;compact&quot; is your top requirement, the honest answer is the 106, and the real question becomes
          whether you can live without True RMS and LoZ.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Function coverage: a crossed trade</h2>
        <p className="text-muted leading-7 mb-4">
          Most Fluke pairings are a ladder, where the pricier meter does everything the cheaper one does and more.
          This pair isn&apos;t. Each meter has functions the other lacks entirely, so the table below matters more
          than the spec sheets&apos; headline numbers.
        </p>
        <DataTable
          head={["Function", "Fluke 106", "Fluke 114"]}
          rows={[
            ["DC and AC volts to 600 V", "Yes", "Yes"],
            ["True RMS AC", "No", "Yes"],
            ["Low-impedance (LoZ) volts", "No", "Yes, AutoVolt"],
            ["DC millivolts", "Not listed", "Yes"],
            ["Current, 4 A / 10 A", "Yes", "No"],
            ["Milliamps or microamps", "No", "No"],
            ["Capacitance", "50 nF to 1,000 µF", "Not listed"],
            ["Resistance and continuity", "Yes", "Yes"],
            ["Diode test, frequency", "No (107 only)", "No"],
            ["Min/Max/Average", "Not listed", "Yes, with elapsed time"],
            ["Bar graph", "No", "33 segments"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Notice that neither meter tests diodes or reads frequency. If you need those on a pocket body, the step
          up is the 107, covered in{" "}
          <Link href="/multimeters/fluke-106-vs-fluke-107" className={link}>
            Fluke 106 vs Fluke 107
          </Link>
          . If you want the 114&apos;s voltage tools plus current and capacitance, that combination is the 117,
          compared in{" "}
          <Link href="/multimeters/fluke-114-vs-fluke-117" className={link}>
            Fluke 114 vs Fluke 117
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Two ways to be wrong about a dead wire</h2>
        <p className="text-muted leading-7 mb-4">
          The biggest practical gap is how each meter behaves on an open conductor that runs beside a live one.
          The 106&apos;s volts input is over 10 MΩ, which is what you want on electronics, but it also means a
          disconnected wire picking up voltage capacitively from its neighbor can show a sizable AC reading with
          almost no current behind it. You then have to decide whether that number is real.
        </p>
        <p className="text-muted leading-7 mb-4">
          The 114&apos;s AutoVolt position puts a low resistance across the leads. A stiff source such as a real
          120 V feed barely notices; a weak, coupled voltage collapses toward zero. As a hedged illustration, a
          coupled wire might read tens of volts on a high-impedance meter and close to nothing on LoZ, while a
          genuinely energized circuit reads about the same on both. That contrast is the diagnostic. Fluke doesn&apos;t
          publish the LoZ input resistance on the 114 page we checked; the same feature on the 113 and 117 is
          specified at roughly 3 kΩ.
        </p>
        <KeyIdea title="The 106 workaround, and its limits">
          With a 106 you can still sort ghost voltage from a live feed by confirming with a second method, such as a
          known load or a plug-in tester, but that is an extra step and an extra tool. The 114 does it in one dial
          position, and it picks AC or DC on its own, which saves a mistake when you meet a DC control circuit in a
          panel. Our{" "}
          <Link href="/multimeters/fluke-113-vs-fluke-115" className={link}>
            Fluke 113 vs Fluke 115
          </Link>{" "}
          page works through the loading arithmetic for a low-impedance input in detail.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where the 106&apos;s current and capacitance ranges win</h2>
        <p className="text-muted leading-7 mb-4">
          Current is the job the 114 simply can&apos;t start. The 106 reads up to 10 A in series, AC or DC, at
          ±(1.5% + 3), with AC current specified from 40 to 200 Hz. That covers a 12 V accessory in a car, a
          bench supply feeding a project or a low-voltage lighting run, as long as the load stays within 10 A. It has no milliamp range,
          so best resolution on the 4 A range is 1 mA and small standby currents are out of reach; see{" "}
          <Link href="/multimeters/fluke-17b-plus-vs-fluke-106" className={link}>
            Fluke 17B+ vs Fluke 106
          </Link>{" "}
          if you need finer current.
        </p>
        <p className="text-muted leading-7">
          Capacitance follows the same pattern. The 106 reads from its 50 nF range up to 1,000 µF, though Fluke notes
          readings can take up to 18 seconds to settle. That handles a furnace blower&apos;s run capacitor or a
          power-supply filter cap. The 114 lists no capacitance function at all, so an HVAC or appliance user who
          needs that test should not start with it; our{" "}
          <Link href="/multimeters/fluke-114-vs-fluke-116" className={link}>
            Fluke 114 vs Fluke 116
          </Link>{" "}
          page covers the 110-series model that adds it.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Situation", "Better fit", "Reason"]}
          rows={[
            ["Glovebox or junk-drawer meter", "Fluke 106", "200 g and 28 mm thick"],
            ["Is this outlet wire live or just induced?", "Fluke 114", "AutoVolt LoZ settles it in one step"],
            ["Current draw of a 12 V car accessory","Fluke 106", "4 A and 10 A ranges; the 114 has none"],
            ["Dimmer, LED driver or VFD output", "Fluke 114", "True RMS AC volts"],
            ["Run or filter capacitor check", "Fluke 106", "50 nF to 1,000 µF listed"],
            ["Watching a sagging supply over time", "Fluke 114", "Min/Max/Average and a 32/s bar graph"],
            ["Dim attic or crawl space", "Fluke 114", "Backlight listed; not for the 106"],
            ["Low-voltage control signals in mV DC", "Fluke 114", "DC mV range; the 106 lists AC mV only"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          <strong>Buy the Fluke 106</strong> if you&apos;re a homeowner, car owner or hobbyist who wants a tough,
          small meter that covers volts, amps, ohms and capacitance, and you mostly measure clean utility power or
          DC. <strong>Skip it</strong> if you work on building wiring for a living, because it has no LoZ, no True RMS
          and no backlight listed. <strong>Buy the Fluke 114</strong> if your day is spent proving circuits live or
          dead in panels and boxes. <strong>Skip it</strong> if you&apos;ll ever need amps or capacitance, since the
          more complete 115 and 117 share its body; compare it with the{" "}
          <Link href="/multimeters/fluke-114-vs-fluke-115" className={link}>
            Fluke 115
          </Link>{" "}
          first.
        </p>
        <Callout title="Both stop at CAT III 600V">
          Neither meter is rated for the service entrance, meter base or overhead drop, which are CAT IV locations.
          Use leads in good condition, test your meter on a known live source before and after checking a circuit you
          plan to touch, and leave anything on the utility side to a licensed electrician. On GFCI-protected
          circuits, a low-impedance reading taken hot to ground can draw enough current to trip the device; Fluke
          warns about this for its LoZ meters, so measure hot to neutral there.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where the published specs disagree</h2>
        <p className="text-muted leading-7">
          Fluke&apos;s 114 overview mentions &quot;voltage and current&quot;, but its own spec table lists no current
          range and the meter has only two jacks, so we treat it as voltage and resistance only. The same page carries
          a temperature footnote without any temperature function. Amazon gives the 114&apos;s weight as 0.51 kg
          against Fluke&apos;s 550 g. On the 106, our product summary mentions data hold, yet Fluke&apos;s 106 page
          doesn&apos;t list hold or a backlight, so treat both as unconfirmed. Fluke&apos;s 106/107 documentation
          gives a two-year warranty that the 106 product page itself doesn&apos;t repeat. A 1 m drop rating is
          published for the 107; for the 106 and 114 it is not stated in the sources we cite.
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Choose the Fluke 106 if you want a truly pocketable meter that reads current and capacitance and you mostly measure clean mains or DC. Choose the Fluke 114 if you test building wiring and value True RMS, AutoVolt LoZ, a bar graph and Min/Max/Average over amps. If you need both sets of features, look at the Fluke 117 instead of compromising.",
  chooseNeitherIf:
    "You need current/capacitance and AutoVolt/True RMS/bar graph together — neither meter covers both sets, and the Fluke 117 does.",
  faqs: [
    {
      question: "Is the Fluke 114 a compact multimeter?",
      answer:
        "Not physically. It uses the same 167 × 84 × 46 mm, 550 g housing as the Fluke 115 and 117. It is compact only in its feature list: volts, resistance and continuity. The Fluke 106 is the small one here at 142 × 69 × 28 mm and 200 g.",
    },
    {
      question: "Can the Fluke 106 detect ghost voltage?",
      answer:
        "Not directly. It has a high-impedance volts input of over 10 MΩ and no low-impedance mode, so an induced voltage on an open wire can show up as a real-looking reading. You can confirm with a second method, such as a plug-in tester or a known load. The Fluke 114's AutoVolt position is built for exactly that check.",
    },
    {
      question: "Does the Fluke 114 measure amps or capacitance?",
      answer:
        "No. Fluke's spec table lists neither, and the meter has only two input jacks, COM and V/Ω. Fluke's overview text mentions current, which conflicts with its own table, but there is no current input on the meter. For amps on this body you need the Fluke 115 or 117; for capacitance and temperature, the 116.",
    },
    {
      question: "Which is more accurate, the Fluke 106 or 114?",
      answer:
        "On clean sine-wave AC and on DC they are close: both list AC volts at ±(1.0% + 3), and DC volts at ±(0.5% + 3) on the 106 versus ±(0.5% + 2) on the 114. The real difference is waveform. The 114 is True RMS, so it stays correct on distorted AC from dimmers and drives, where the average-responding 106 can read off.",
    },
    {
      question: "Which battery lasts longer, the Fluke 106 or 114?",
      answer:
        "Fluke rates the 114 at 400 hours on one 9 V battery without the backlight, and the 106 at a minimum of 200 hours on two AAA cells. The 106 also switches itself off after 20 minutes of inactivity, which helps if it lives in a toolbox and sometimes gets left on.",
    },
    {
      question: "Do the Fluke 106 and 114 have the same continuity beeper?",
      answer:
        "Not quite. Per Fluke's documents, the 106 beeps below 70 Ω, while the 114 beeps below 20 Ω and stays silent above 250 Ω. So a corroded joint measuring 50 Ω beeps on the 106 but not on the 114, which matters when you are confirming a clean connection rather than just checking that a fuse isn't blown.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 106 vs Fluke 107", href: "/multimeters/fluke-106-vs-fluke-107" },
    { label: "Fluke 114 vs Fluke 115", href: "/multimeters/fluke-114-vs-fluke-115" },
    { label: "Fluke 114 vs Fluke 117", href: "/multimeters/fluke-114-vs-fluke-117" },
    { label: "Fluke 114 vs Fluke 116", href: "/multimeters/fluke-114-vs-fluke-116" },
    { label: "Fluke 117 vs Fluke 106", href: "/multimeters/fluke-117-vs-fluke-106" },
    { label: "Fluke 106 vs Fluke 101", href: "/multimeters/fluke-106-vs-fluke-101" },
    { label: "Fluke 15B+ vs Fluke 106", href: "/multimeters/fluke-15b-plus-vs-fluke-106" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
  ],
};

export default function Fluke106VsFluke114Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
