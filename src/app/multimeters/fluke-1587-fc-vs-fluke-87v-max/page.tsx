// Specs per Fluke, as recorded on this repo's existing pages and Picks (checked 2026-10-27/28):
// - Fluke 1587 FC: Pick in src/lib/multimeter-catalog.ts (Amazon B017OVC2UI) and the "Specs per" notes on
//   /multimeters/fluke-1587-fc-vs-fluke-87v and /multimeters/fluke-1577-vs-fluke-1587-fc, from
//   https://www.fluke.com/en-us/product/electrical-testing/insulation-testers/fluke-1587-fc and the 1587 FC/1577
//   technical data sheet (https://media.fluke.com/ad0b1bcb-5f5e-431c-9a0f-b10600757414_original%20file.pdf):
//   insulation test 50/100/250/500/1000 V, 0.01 MΩ to 2 GΩ; PI/DAR with TrendIt graphs, memory and temperature
//   compensation over Fluke Connect (2.4 GHz); blocks the test above 30 V; auto discharge <0.5 s for 1 µF or less;
//   6000-count backlit display; DC V ±(0.09% + 2); AC V ±(1% + 3) at 50-60 Hz; low-pass filter; current 60 mA and
//   400 mA only (0.44 A fuse), no 10 A input; capacitance to 9999 µF; frequency to 99.99 kHz; temperature -40 to
//   537 °C (K-type included); CAT IV 600V / CAT III 1000V; IP40 (non-operating); operating -20 to 55 °C; 4 x AA,
//   1000 h meter use and at least 1000 insulation tests; 550 g (Amazon lists 1645 g: conflict stated); three-year
//   warranty. Drop rating: not stated in the sources above. Backlit keypad: not stated.
// - Fluke 87V MAX: Pick in src/lib/multimeter-catalog.ts (Amazon B07YQSBJSB) and the "Specs per" notes on
//   /multimeters/fluke-87v-vs-fluke-87v-max and /multimeters/fluke-28-ii-vs-fluke-87v-max, from
//   https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/87v-max: IEC 60529 IP67; drop up to
//   4 m (13 ft); operating -15 to 55 °C, to -40 °C for 20 minutes when taken from 20 °C; 3 x AA, 800 h typical
//   without backlight; 698.5 g with holster; DC V ±(0.05% + 1); AC V ±(0.7% + 4) True RMS with low-pass filter;
//   0.1 µA to 10 A (20 A for 30 s); frequency to 199.99 kHz; temperature -200 to 1090 °C; 6000 counts, 19,999 hi-res;
//   250 µs peak capture; backlit keypad; TL175 TwistGuard leads; limited lifetime warranty. No insulation test and
//   no wireless listed.
// IP digit meanings (IEC 60529: 4 = solid objects over 1 mm, 6 = dust-tight, 0 = no water rating, 7 = temporary
// immersion) and the effect of surface moisture on insulation readings are standard engineering points, hedged.
// Picks: Fluke 1587 FC (4.6) and Fluke 87V MAX (4.7); neither is hands-on tested by us.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-1587-fc-vs-fluke-87v-max";

const all = getAllPicks("multimeters");

export const metadata = buildMetadata({
  title: "Fluke 1587 FC vs 87V MAX: Insulation or Rugged?",
  description:
    "Fluke 1587 FC vs 87V MAX: a 50–1000 V insulation tester with Fluke Connect against an IP67 meter rated for 4 m drops. Pick by the task or by the site.",
  image: all.find((p) => p.name === "Fluke 1587 FC")!.image,
  path: "/multimeters/fluke-1587-fc-vs-fluke-87v-max",
});

const link = "text-accent hover:underline";

/**
 * Task-versus-environment map: the horizontal axis is the job (live troubleshooting vs de-energized insulation
 * work), the vertical axis is the site (sheltered vs wet, dusty, drop-prone). Each quadrant names the better tool.
 */
function TaskSiteMatrix() {
  const cell = (x: number, y: number, title: string, line1: string, line2: string, hi: boolean) => (
    <g>
      <rect
        x={x}
        y={y}
        width="140"
        height="70"
        rx="8"
        className={hi ? "fill-accent/15 stroke-accent" : "fill-surface stroke-border"}
        strokeWidth="1.3"
      />
      <text x={x + 70} y={y + 24} fontSize="10.5" fontWeight="700" textAnchor="middle" className={hi ? "fill-accent" : "fill-foreground"}>
        {title}
      </text>
      <text x={x + 70} y={y + 42} fontSize="8.5" textAnchor="middle" className="fill-muted">
        {line1}
      </text>
      <text x={x + 70} y={y + 56} fontSize="8.5" textAnchor="middle" className="fill-muted">
        {line2}
      </text>
    </g>
  );
  return (
    <svg
      viewBox="0 0 360 230"
      className="w-full h-auto"
      role="img"
      aria-label="Two-by-two map. Columns: live troubleshooting or de-energized insulation testing. Rows: sheltered site or wet, dusty, drop-prone site. Live work on a sheltered site: either meter. Live work on a harsh site: Fluke 87V MAX. Insulation work on a sheltered site: Fluke 1587 FC. Insulation work on a harsh site: the 1587 FC for the test itself, kept dry, often alongside a rugged meter."
    >
      <text x="140" y="16" fontSize="9.5" textAnchor="middle" className="fill-muted">Live troubleshooting</text>
      <text x="290" y="16" fontSize="9.5" textAnchor="middle" className="fill-muted">De-energized insulation work</text>
      <text x="30" y="70" fontSize="9" textAnchor="middle" className="fill-muted">Sheltered</text>
      <text x="30" y="82" fontSize="9" textAnchor="middle" className="fill-muted">site</text>
      <text x="30" y="150" fontSize="9" textAnchor="middle" className="fill-muted">Wet, dusty,</text>
      <text x="30" y="162" fontSize="9" textAnchor="middle" className="fill-muted">drop-prone</text>
      {cell(70, 30, "Either meter", "Both CAT IV 600V,", "both read VFD outputs", false)}
      {cell(220, 30, "Fluke 1587 FC", "Only one of the two", "that tests insulation", true)}
      {cell(70, 110, "Fluke 87V MAX", "IP67 and a 4 m", "drop rating", true)}
      {cell(220, 110, "1587 FC + care", "IP40 (non-operating):", "keep it dry and sheltered", false)}
      <text x="180" y="206" fontSize="8.5" textAnchor="middle" className="fill-muted">
        The task decides whether you need the 1587 FC at all;
      </text>
      <text x="180" y="219" fontSize="8.5" textAnchor="middle" className="fill-muted">
        the site decides how much the 87V MAX&apos;s sealing is worth.
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 1587 FC vs Fluke 87V MAX: Insulation Testing or Rugged Diagnostics?",
  path,
  published: "2026-10-28",
  intro:
    "Choose the Fluke 1587 FC if your work includes proving that motor windings, feeders or cables will hold up before they are switched back on: it applies 50 to 1000 V DC, reads up to 2 GΩ and logs PI and DAR tests through Fluke Connect. Choose the Fluke 87V MAX if your problem is where you work rather than what you test: it is sealed to IP67, rated for a 4 m drop, runs about 800 hours on three AA cells and reads up to 10 A. In the Fluke 1587 FC vs 87V MAX decision, one tool adds a task and the other adds survivability; neither does both.",
  a: {
    pick: all.find((p) => p.name === "Fluke 1587 FC")!,
    imageAlt: "Fluke 1587 FC insulation multimeter, front view with the yellow insulation test key",
    chooseIf: [
      "Your maintenance routine includes megohm tests on motors, feeders or transformers before re-energizing",
      "You want timed PI and DAR results stored by asset in the Fluke Connect app",
      "Most of your work happens in plant rooms, shops or switchgear spaces that stay dry",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 87V MAX")!,
    imageAlt: "Fluke 87V MAX IP67 industrial multimeter in its yellow holster",
    chooseIf: [
      "Rain, wash-down spray, dust or drops onto concrete are an everyday risk for your meter",
      "You troubleshoot live circuits and need a 10 A input, 250 µs peak capture and 0.05% DC volts",
      "Insulation testing is someone else's job, or you already carry a separate insulation tester",
    ],
  },
  extraSpecs: [
    { label: "Insulation test", a: "50 to 1000 V, 0.01 MΩ to 2 GΩ, PI/DAR", b: "No" },
    { label: "Ingress protection", a: "IP40 (non-operating)", b: "IP67 (IEC 60529)" },
    { label: "Drop rating", a: "Not stated", b: "4 m (13 ft)" },
    { label: "Operating temperature", a: "-20 to 55 °C", b: "-15 to 55 °C; -40 °C for 20 min" },
    { label: "Battery", a: "4 × AA; 1000 h meter use, ≥1000 IR tests", b: "3 × AA; 800 h without backlight" },
    { label: "Weight", a: "550 g (Amazon lists 1645 g)", b: "698.5 g with holster" },
    { label: "Wireless", a: "Fluke Connect, 2.4 GHz", b: "None listed" },
    { label: "Current", a: "60 mA and 400 mA only", b: "0.1 µA to 10 A (20 A for 30 s)" },
    { label: "DC volts accuracy", a: "±(0.09% + 2)", b: "±(0.05% + 1)" },
    { label: "AC volts accuracy", a: "±(1% + 3) at 50–60 Hz", b: "±(0.7% + 4) True RMS" },
    { label: "Peak capture / hi-res", a: "Not listed / 6,000 counts only", b: "250 µs / 19,999 counts" },
    { label: "Backlight", a: "Backlit display; keypad not stated", b: "Display and keypad backlit" },
    { label: "Warranty", a: "3 years", b: "Limited lifetime" },
  ],
  differences: [
    "Task: only the 1587 FC can put a 50 to 1000 V DC stress on insulation and read the result up to 2 GΩ. The 87V MAX has no insulation function, and no amount of ruggedness changes that.",
    "Environment: the 87V MAX is IP67 and rated for a 4 m drop. The 1587 FC is IP40, a rating Fluke qualifies as non-operating, and none of the sources we use publish a drop figure for it.",
    "Live troubleshooting: the MAX reads 0.1 µA to 10 A, captures 250 µs peaks and has a 19,999-count mode. The 1587 FC stops at 400 mA and lists neither feature.",
    "Records: the 1587 FC saves readings and PI/DAR trends to Fluke Connect. Fluke lists no wireless or logging for the 87V MAX.",
    "Shared ground: both are rated CAT IV 600V / CAT III 1000V, both have a low-pass filter for drive outputs, both run on AA cells, and both measure temperature with a K-type probe.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Task tool or site tool?</h2>
        <p className="text-muted leading-7 mb-4">
          Most comparisons pit two meters that do the same job. These two answer different questions. The 1587 FC
          answers &quot;is this insulation fit to be energized?&quot;, which is a maintenance task you schedule. The 87V
          MAX answers &quot;will my meter still work after today?&quot;, which is a property of the place you work. A
          motor shop that never sees rain gains little from IP67. A solar crew that never lifts a feeder for a megohm
          test gains nothing from a 1000 V insulation source.
        </p>
        <Figure caption={<>Read the columns for the job and the rows for the site. Highlighted cells are the clear wins.</>}>
          <TaskSiteMatrix />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Neither meter is hands-on tested by us: the 1587 FC carries an editorial 4.6 and the 87V MAX a 4.7, both from
          Fluke&apos;s published specifications and the official Amazon listings. If you are weighing the MAX against the
          standard model, our{" "}
          <Link href="/multimeters/fluke-87v-vs-fluke-87v-max" className={link}>
            Fluke 87V vs 87V MAX
          </Link>{" "}
          comparison isolates exactly what the sealed body adds. For the 1587 FC against the indoor 87V, with a
          walk-through of PI and DAR, see{" "}
          <Link href="/multimeters/fluke-1587-fc-vs-fluke-87v" className={link}>
            Fluke 1587 FC vs 87V
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What the 87V MAX&apos;s ruggedness adds</h2>
        <p className="text-muted leading-7 mb-4">
          Fluke&apos;s two ratings tell different stories. IP40 on the 1587 FC means, in IEC 60529 terms, that objects
          larger than about 1 mm are kept out and no water protection is claimed; Fluke adds &quot;non-operating&quot;,
          so even that applies to the meter while it is switched off. IP67 on the 87V MAX means dust-tight and rated for
          temporary immersion. Add the MAX&apos;s 4 m drop rating, against no published drop figure for the 1587 FC, and
          the gap is about survival on harsh sites, not about measurement.
        </p>
        <InfoCards
          items={[
            { label: "MAX: IP67", desc: "Dust-tight; rated for brief immersion." },
            { label: "MAX: 4 m drop", desc: "About 13 ft, per Fluke." },
            { label: "MAX: cold excursions", desc: "-40 °C for 20 min when brought from 20 °C." },
            { label: "1587 FC: IP40", desc: "Non-operating rating; no water claim." },
            { label: "1587 FC: drop", desc: "Not stated in our sources." },
            { label: "1587 FC: -20 °C", desc: "Lower continuous minimum than the MAX's -15 °C." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The cold-weather line cuts both ways. The 1587 FC lists a continuous operating range from -20 °C, five degrees
          lower than the MAX&apos;s -15 °C. The MAX instead publishes a short excursion to -40 °C for 20 minutes, which
          fits the pattern of carrying a meter from a heated truck to a frozen disconnect and back. If you work for hours
          in steady cold, the 1587 FC&apos;s published range is actually the wider one.
        </p>
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Published battery life on AA cells. The 1587 FC figure is meter use; Fluke also quotes at least 1000 insulation tests.</>}>
            <BarChart
              items={[
                { label: "Fluke 1587 FC (4 × AA)", value: 1000, display: "1000 h", highlight: true },
                { label: "Fluke 87V MAX (3 × AA)", value: 800, display: "800 h" },
              ]}
            />
          </Figure>
          <Figure caption={<>Weight as Fluke lists it. The MAX figure includes its holster; Amazon gives the bare 1587 FC 1645 g, which conflicts with Fluke.</>}>
            <BarChart
              items={[
                { label: "Fluke 1587 FC", value: 550, display: "550 g", highlight: true },
                { label: "Fluke 87V MAX", value: 698.5, display: "698.5 g" },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What insulation testing adds</h2>
        <p className="text-muted leading-7 mb-4">
          An ordinary ohms range, including the MAX&apos;s, drives a low voltage and tops out at 50 MΩ. That finds open
          windings and dead shorts, but not insulation that is slowly failing. The 1587 FC raises the stakes to the
          voltage the equipment actually sees, or more: 500 V for typical low-voltage motors and cables, up to 1000 V for
          heavier gear, and 50 to 250 V for control wiring that can&apos;t take more. It then reads the leakage as
          resistance up to 2 GΩ.
        </p>
        <p className="text-muted leading-7 mb-4">
          The value is in timing. A winding that reads 400 MΩ this spring and 40 MΩ next spring is telling you to
          schedule a rewind before it trips on a hot afternoon. That trend only exists if someone tests on a schedule and
          keeps the numbers, which is what the 1587 FC&apos;s Fluke Connect memory, TrendIt graphs and temperature
          compensation are for. Those figures are illustrative, not measurements.
        </p>
        <KeyIdea title="Ruggedness protects the tool; insulation testing protects the equipment">
          The 87V MAX&apos;s IP67 body keeps a 3 a.m. breakdown call from ending with a drowned meter. The 1587 FC&apos;s
          insulation test keeps a motor from failing in service in the first place. Ask which of those two losses costs
          your operation more, and the choice usually makes itself.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Insulation testing on a wet or dusty site</h2>
        <p className="text-muted leading-7 mb-4">
          The awkward case is a tech who needs megohm readings in exactly the conditions where the MAX shines: pump
          stations, outdoor feeders, wash-down areas. Here the 1587 FC&apos;s non-operating IP40 rating matters, and so
          does physics. Surface moisture and conductive dust on terminals and cable ends create leakage paths of their
          own, so an insulation reading taken on a damp afternoon often comes out lower than the same winding tested dry.
          That is a reason to clean and dry the test points, note the conditions, and compare like with like, which the
          app&apos;s temperature compensation helps with.
        </p>
        <p className="text-muted leading-7">
          In practice, crews in harsh environments often carry both: a sealed meter for live checks all shift, and an
          insulation tester that comes out of its case under cover when a motor or feeder is isolated. If your sealed
          meter needs MSHA approval as well, compare the MAX with the{" "}
          <Link href="/multimeters/fluke-28-ii-vs-fluke-87v-max" className={link}>
            Fluke 28 II
          </Link>
          ; if you only need a simpler insulation tester, the{" "}
          <Link href="/multimeters/fluke-1577-vs-fluke-1587-fc" className={link}>
            Fluke 1577 vs 1587 FC
          </Link>{" "}
          page covers the two-voltage option.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Live diagnostics: where the MAX pulls ahead</h2>
        <p className="text-muted leading-7 mb-4">
          On energized equipment the MAX is the stronger instrument. It reads current from 0.1 µA to 10 A, so a
          flame-sensor signal and a small motor&apos;s running current both go through the same meter. Its 250 µs peak
          capture catches short dropouts, and the 19,999-count mode resolves finer steps on a sensor or supply rail. DC
          volts are ±(0.05% + 1) against the 1587 FC&apos;s ±(0.09% + 2). The 1587 FC reads only 60 mA and 400 mA ranges,
          so motor amps need a clamp.
        </p>
        <DataTable
          head={["Live check", "Fluke 1587 FC", "Fluke 87V MAX"]}
          rows={[
            ["Motor running current", "Clamp needed (400 mA max)", "Up to 10 A in series"],
            ["Flame sensor µA", "Not suitable", "0.1 µA resolution"],
            ["Drive output volts", "Low-pass filter", "Low-pass filter"],
            ["Short voltage dips", "Peak capture not listed", "250 µs peak capture"],
            ["Frequency", "To 99.99 kHz", "To 199.99 kHz"],
            ["Temperature", "-40 to 537 °C", "-200 to 1090 °C"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 1587 FC vs 87V MAX: which should you buy?</h2>
        <DataTable
          head={["Your work", "Better fit", "Why"]}
          rows={[
            ["Motor repair or rewind shop", "Fluke 1587 FC", "Indoor work; insulation and PI/DAR on every job"],
            ["Plant predictive maintenance", "Fluke 1587 FC", "Scheduled megohm tests with app records"],
            ["Solar O&M on rooftops and arrays", "Fluke 87V MAX", "Rain, dust and drops; live checks dominate"],
            ["Wastewater and lift stations", "Both", "MAX for live calls; 1587 FC for isolated pump motors, kept dry"],
            ["Outdoor feeder commissioning", "Fluke 1587 FC", "Test cable insulation before first energization"],
            ["Breakdown calls in all weather", "Fluke 87V MAX", "IP67, 4 m drop, 10 A and peak capture"],
            ["Site that restricts radios", "Fluke 87V MAX", "No wireless listed; the 1587 FC uses 2.4 GHz"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For shortlists beyond these two, see the{" "}
          <Link href="/multimeters/best-multimeter-for-electricians" className={link}>
            best multimeter for electricians
          </Link>
          , our{" "}
          <Link href="/multimeters/best-multimeters-for-solar-panel-testing" className={link}>
            multimeters for solar panel testing
          </Link>{" "}
          and the{" "}
          <Link href="/multimeters/multimeter-buying-guide" className={link}>
            multimeter buying guide
          </Link>
          . For a low-voltage winding check you can do with any meter, read{" "}
          <Link href="/multimeters/how-to-check-a-motor-winding-for-a-short-with-a-multimeter" className={link}>
            how to check a motor winding for a short
          </Link>
          .
        </p>
      </section>

      <Callout title="Safety: insulation testers generate up to 1000 V by design">
        The 1587 FC creates its own high voltage, so the circuit under test becomes hazardous even though it is
        disconnected from the supply. Only qualified, authorized personnel should run insulation tests. De-energize the
        equipment, apply your lockout/tagout procedure, and verify zero voltage with a meter you have checked on a known
        live source. Isolate drives, surge protection and electronics before testing. Keep yourself and others off the
        conductors and the far end of any cable while the test runs. When it finishes, let the tester discharge the
        circuit, then confirm with a voltmeter that the stored charge is gone; long cables and large windings can hold
        more than the auto-discharge is rated for. The 30 V live-circuit block is a backstop, not a substitute for
        lockout. An IP67 meter does not make wet live work safe either: stay out of standing water, and bring in a
        qualified electrician for service-entrance or utility equipment.
      </Callout>
    </>
  ),
  bottomLine:
    "Buy the Fluke 1587 FC if insulation testing is part of your job: 50 to 1000 V tests to 2 GΩ, PI and DAR, and readings stored through Fluke Connect, in a meter best kept in dry plant rooms. Buy the Fluke 87V MAX if your meter faces rain, dust and drops while you troubleshoot live equipment: IP67, a 4 m drop rating, a 10 A input and peak capture. Crews who do both kinds of work in harsh places usually end up carrying both.",
  faqs: [
    {
      question: "Can the Fluke 87V MAX test insulation resistance?",
      answer:
        "No. Its resistance function reads to 50 MΩ using a low test voltage, which finds opens and shorts but can't stress insulation. Weak insulation can pass a low-voltage ohms check and still break down at working voltage. For megohm testing at 500 V or 1000 V you need an insulation tester such as the 1587 FC or the 1577.",
    },
    {
      question: "Is the Fluke 1587 FC waterproof?",
      answer:
        "No. Fluke rates it IP40 and qualifies that as non-operating. In IEC 60529 terms the zero means no water protection is claimed. Keep it dry, use it under cover outdoors, and dry test points before an insulation test, since moisture also lowers the reading. The 87V MAX is the sealed one, at IP67.",
    },
    {
      question: "Which is tougher, the Fluke 1587 FC or the 87V MAX?",
      answer:
        "The 87V MAX, on published ratings. Fluke lists IP67 and a 4 m drop rating for it, plus a short excursion to -40 °C. For the 1587 FC our sources give IP40 (non-operating) and no drop figure. The 1587 FC does list a lower continuous operating minimum, -20 °C against the MAX's -15 °C.",
    },
    {
      question: "Can the Fluke 1587 FC replace an 87V MAX for everyday troubleshooting?",
      answer:
        "Partly. It reads AC and DC volts with a low-pass filter, resistance, capacitance, frequency and temperature, all rated CAT IV 600V. It stops at 400 mA, so there's no 10 A input, and Fluke lists no peak capture or hi-res mode. Its DC accuracy is ±(0.09% + 2) against the MAX's ±(0.05% + 1).",
    },
    {
      question: "Does the Fluke 87V MAX have Fluke Connect?",
      answer:
        "Fluke doesn't list any wireless or logging function for the 87V MAX. Readings stay on its display, with Min/Max and peak capture for catching changes. If you want readings saved to a phone, the 1587 FC sends them over Fluke Connect, which is also how it graphs PI and DAR insulation tests.",
    },
    {
      question: "Which has better battery life?",
      answer:
        "On paper, the 1587 FC. Fluke quotes 1000 hours of meter use on four AA cells, or at least 1000 insulation tests. The 87V MAX is rated for 800 hours typical on three AA cells without the backlight. Both use AA cells, so either is easy to keep running from a hardware store shelf.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 1587 FC vs Fluke 87V", href: "/multimeters/fluke-1587-fc-vs-fluke-87v" },
    { label: "Fluke 87V vs Fluke 87V MAX", href: "/multimeters/fluke-87v-vs-fluke-87v-max" },
    { label: "Fluke 1577 vs Fluke 1587 FC", href: "/multimeters/fluke-1577-vs-fluke-1587-fc" },
    { label: "Fluke 28 II vs Fluke 87V MAX", href: "/multimeters/fluke-28-ii-vs-fluke-87v-max" },
    { label: "Fluke 87V review", href: "/multimeters/fluke-87v-review" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
  ],
};

export default function Fluke1587FcVsFluke87vMaxPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
