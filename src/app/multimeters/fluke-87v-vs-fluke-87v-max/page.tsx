// Specs per Fluke, checked 2026-10-27:
// - Fluke 87V MAX product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/87v-max
//   IEC 60529 IP67; drops up to 4 m (13 ft); three AA cells, 800 h typical without backlight; 698.5 g and
//   6.0 x 10.1 x 21.5 cm with holster; operating -15 to 55 °C, to -40 °C for 20 minutes when taken from 20 °C;
//   AC V ±(0.7% + 4) True RMS, 20 kHz bandwidth with low-pass filter; DC V ±(0.05% + 1); current 0.1 µA to 10 A (20 A
//   for 30 s), DC ±(0.2% + 2), AC ±(1.0% + 2); 6000 counts (4/s), 19,999 hi-res, 32-segment bar graph; two-level
//   backlight and backlit keypad; removable holster with test lead storage that doubles as a probe holder; TL175
//   TwistGuard leads, AC175 clips, 80BK-A probe, batteries; limited lifetime warranty; LoZ not listed. The page's
//   comparison table lists 87V MAX vs 87V as IP67 vs IP30, 4 m vs 3 m drop, 800 h vs 400 h, backlit keypad yes vs no,
//   and lists conductance and pulse width under the MAX only.
// - Fluke 87V product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-87v
//   IP30 (comparison table); drop "3 meters" (comparison table) but "1 Meter drop per IEC 61010-1:2001" (spec tab,
//   shock) - conflict stated on the page; alkaline 9V, ~400 h typical without backlight; 355 g (624 g with holster);
//   201 x 98 x 52 mm with holster; operating -20 to 55 °C; AC V ±(0.7% + 2) True RMS, 20 kHz with low-pass filter
//   (3 dB at 1 kHz); DC V ±(0.05% + 1); DC A ±(0.2% + 2); AC A ±(1.0% + 2); 6000 counts, 19,999 hi-res; 32-segment bar
//   graph at 40/s; two-level display backlight, keypad not backlit; conductance to 60.00 nS; 0.01 µA DC resolution;
//   removable holster with tilt-leg and test lead storage; TL75 leads, AC175 clips, 80BK probe, 9V battery;
//   withstands spikes over 8000 V; approvals CE, CSA, RCM; lifetime warranty. No pulse-width function listed.
// - Fluke 87V MAX Pick in src/lib/multimeter-catalog.ts (Amazon B07YQSBJSB); Fluke 87V Pick in best-multimeters
//   (hands-on tested, 4.8).
// IP code meanings (IEC 60529: 3 = solid objects over 2.5 mm, 6 = dust-tight, 0 = no water protection, 7 = temporary
// immersion, commonly 1 m for 30 minutes) are standard values, hedged on the page.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-87v-vs-fluke-87v-max";

const all = getAllPicks("multimeters");

export const metadata = buildMetadata({
  title: "Fluke 87V vs 87V MAX: What Is the Difference?",
  description:
    "Fluke 87V vs Fluke 87V MAX: the same 0.05% measuring core, but the MAX adds IP67 sealing, a 4 m drop rating, 800 h AA battery life and a backlit keypad.",
  image: all.find((p) => p.name === "Fluke 87V")!.image,
  path: "/multimeters/fluke-87v-vs-fluke-87v-max",
});

const link = "text-accent hover:underline";

/** IEC 60529 code decoded for both meters: the first digit is solids, the second is water. */
function IpCodeDiagram() {
  const box = (x: number, label: string, solid: string, solidTxt: string, water: string, waterTxt: string, hi: boolean) => (
    <g>
      <text x={x + 75} y="20" fontSize="11" fontWeight="700" textAnchor="middle" className={hi ? "fill-accent" : "fill-foreground"}>
        {label}
      </text>
      <rect x={x} y="30" width="70" height="56" rx="8" className={hi ? "fill-accent/15 stroke-accent" : "fill-surface stroke-border"} strokeWidth="1.4" />
      <rect x={x + 80} y="30" width="70" height="56" rx="8" className={hi ? "fill-accent/15 stroke-accent" : "fill-surface stroke-border"} strokeWidth="1.4" />
      <text x={x + 35} y="68" fontSize="26" fontWeight="700" textAnchor="middle" className="fill-foreground">
        {solid}
      </text>
      <text x={x + 115} y="68" fontSize="26" fontWeight="700" textAnchor="middle" className="fill-foreground">
        {water}
      </text>
      <text x={x + 35} y="102" fontSize="9" textAnchor="middle" className="fill-muted">solids</text>
      <text x={x + 115} y="102" fontSize="9" textAnchor="middle" className="fill-muted">water</text>
      <text x={x + 35} y="118" fontSize="8.5" textAnchor="middle" className="fill-foreground">{solidTxt}</text>
      <text x={x + 115} y="118" fontSize="8.5" textAnchor="middle" className="fill-foreground">{waterTxt}</text>
    </g>
  );
  return (
    <svg
      viewBox="0 0 360 170"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram decoding the IP codes: the Fluke 87V is IP30, meaning protection against solid objects larger than about 2.5 mm and no rated water protection; the Fluke 87V MAX is IP67, meaning dust-tight and rated for temporary immersion"
    >
      {box(10, "Fluke 87V: IP30", "3", "objects > 2.5 mm", "0", "not rated", false)}
      {box(195, "Fluke 87V MAX: IP67", "6", "dust-tight", "7", "brief immersion", true)}
      <path d="M8 140 H352" className="stroke-border" strokeWidth="0.8" />
      <text x="180" y="156" fontSize="9" textAnchor="middle" className="fill-muted">
        IEC 60529 digits. 7 is commonly tested at 1 m for 30 minutes; jacks and probes are not &quot;sealed&quot; while in use.
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 87V vs Fluke 87V MAX: What Is the Difference?",
  path,
  published: "2026-10-27",
  intro:
    "The Fluke 87V MAX measures like the 87V: Fluke lists the same ±(0.05% + 1) DC volts, the same 6,000-count display with a 19,999-count hi-res mode, the same low-pass filter, 250 µs peak capture, 10 A input and CAT IV 600V / CAT III 1000V rating. What changes is the shell around that core. The MAX is sealed to IP67 instead of IP30, rated for a 4 m drop, runs about 800 hours on three AA cells instead of about 400 on a 9V, and has a backlit keypad. It is also heavier, and its AC volts digit term is slightly looser.",
  a: {
    pick: all.find((p) => p.name === "Fluke 87V")!,
    reviewHref: "/multimeters/fluke-87v-review",
    imageAlt: "Fluke 87V True RMS industrial digital multimeter, front view",
    chooseIf: [
      "Your meter lives indoors: switchgear rooms, MCC lineups, control panels and the bench",
      "You want the lighter, more compact holstered meter (624 g against 698.5 g)",
      "You want the model we have bought and tested ourselves, at a lower price than the MAX",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 87V MAX")!,
    imageAlt: "Fluke 87V MAX IP67 True RMS multimeter with yellow holster, front view",
    chooseIf: [
      "You work outdoors, in wash-down areas, on rooftops or anywhere a meter gets rained on or dropped in a puddle",
      "You want twice the published battery life and AA cells you can buy anywhere",
      "You work in dim spaces and want the keypad, not just the display, to light up",
    ],
  },
  extraSpecs: [
    { label: "Ingress protection", a: "IP30", b: "IP67 (IEC 60529)" },
    { label: "Drop rating", a: "3 m (comparison table); 1 m per IEC 61010-1 (spec tab)", b: "4 m (13 ft)" },
    { label: "Battery", a: "One 9V alkaline, ~400 h without backlight", b: "Three AA, 800 h typical without backlight" },
    { label: "Operating temperature", a: "-20 to 55 °C", b: "-15 to 55 °C; to -40 °C for 20 min" },
    { label: "Backlight", a: "Two-level display; keypad not backlit", b: "Two-level display plus backlit keypad" },
    { label: "DC volts accuracy", a: "±(0.05% + 1)", b: "±(0.05% + 1)" },
    { label: "AC volts accuracy", a: "±(0.7% + 2) True RMS", b: "±(0.7% + 4) True RMS" },
    { label: "Current", a: "10 A (20 A for 30 s); DC ±(0.2% + 2)", b: "0.1 µA to 10 A (20 A for 30 s); DC ±(0.2% + 2)" },
    { label: "Low-pass filter / peak capture", a: "Yes / 250 µs", b: "Yes / 250 µs" },
    { label: "Weight with holster", a: "624 g (355 g bare)", b: "698.5 g" },
    { label: "Size with holster", a: "201 × 98 × 52 mm", b: "215 × 101 × 60 mm" },
    { label: "Test leads / temp probe", a: "TL75 / 80BK", b: "TL175 TwistGuard / 80BK-A" },
    { label: "Warranty", a: "Lifetime", b: "Limited lifetime" },
  ],
  differences: [
    "Sealing: Fluke rates the 87V MAX IP67 (dust-tight and rated for temporary immersion). The standard 87V is IP30, which means no rated water protection at all.",
    "Drop: the MAX is rated for 4 m. Fluke's comparison table gives the 87V 3 m, while the 87V spec tab lists a 1 m drop per IEC 61010-1, so the honest gap is between 1 m and 3 m.",
    "Power: three AA cells and about 800 hours on the MAX, against a single 9V and about 400 hours on the 87V, both quoted without the backlight on.",
    "Keypad: both have a two-level display backlight, but only the MAX lights its buttons.",
    "Accuracy: DC volts, current, resistance, frequency and temperature specs match. AC volts differ in the digit term: ±(0.7% + 2) on the 87V and ±(0.7% + 4) on the MAX.",
    "Box: the MAX ships with TL175 TwistGuard leads and the 80BK-A probe; the 87V with TL75 leads and the 80BK probe. Both holsters are removable and hold a probe.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">The difference in one screen</h2>
        <InfoCards
          items={[
            { label: "Shared core", desc: "Same DC accuracy, display, bar graph, low-pass filter, peak capture and CAT rating." },
            { label: "MAX: IP67", desc: "Dust-tight and rated for brief immersion. The 87V is IP30." },
            { label: "MAX: 4 m drop", desc: "Against 3 m (table) or 1 m (spec tab) quoted for the 87V." },
            { label: "MAX: 800 h on AAs", desc: "Double the 87V's ~400 h on one 9V cell." },
            { label: "87V: lighter", desc: "624 g holstered against 698.5 g, and a slimmer case." },
            { label: "87V: tested by us", desc: "Our Hands-on Tested pick; the MAX is rated from Fluke's specs." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          We bought and tested the 87V, and it carries our 4.8 rating. We haven&apos;t tested the 87V MAX, so its 4.7 is
          an editorial score built on Fluke&apos;s published figures, not on our bench. Everything below comes from
          Fluke&apos;s two product pages and their spec tabs. Our{" "}
          <Link href="/multimeters/fluke-87v-review" className={link}>
            Fluke 87V review
          </Link>{" "}
          covers the measuring side in more depth.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 87V vs 87V MAX spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Lay the two spec tabs side by side and most lines read identically. The rows that change are about where the
          meter can survive, how long it runs, and how big it is. Only one measuring line moves, and it moves slightly
          against the MAX.
        </p>
        <DataTable
          head={["Spec", "Fluke 87V", "Fluke 87V MAX", "Same?"]}
          rows={[
            ["Safety rating", "CAT IV 600V / CAT III 1000V", "CAT IV 600V / CAT III 1000V", "Same"],
            ["Display", "6,000 counts; 19,999 hi-res", "6,000 counts; 19,999 hi-res", "Same"],
            ["Bar graph", "32 segments", "32 segments", "Same"],
            ["DC volts", "±(0.05% + 1), to 1000 V", "±(0.05% + 1), 0.1 mV to 1000 V", "Same"],
            ["AC volts", "±(0.7% + 2), 20 kHz", "±(0.7% + 4), 20 kHz", "MAX looser"],
            ["Low-pass filter", "Yes, 3 dB at 1 kHz", "Yes", "Same"],
            ["DC / AC amps", "±(0.2% + 2) / ±(1.0% + 2)", "±(0.2% + 2) / ±(1.0% + 2)", "Same"],
            ["Resistance", "±(0.2% + 1), to 50 MΩ", "±(0.2% + 1), to 50 MΩ", "Same"],
            ["Capacitance", "To 9,999 µF", "To 9,999 µF", "Same"],
            ["Frequency", "To 200 kHz, ±(0.005% + 1)", "To 199.99 kHz, ±(0.005% + 1)", "Same"],
            ["Temperature", "-200 to 1090 °C (excl. probe)", "-200 to 1090 °C (excl. probe)", "Same"],
            ["Peak capture", "250 µs", "250 µs", "Same"],
            ["Ingress protection", "IP30", "IP67", "MAX"],
            ["Drop", "3 m (table) / 1 m (spec tab)", "4 m", "MAX"],
            ["Operating temperature", "-20 to 55 °C", "-15 to 55 °C; -40 °C for 20 min", "Differs"],
            ["Battery and life", "9V, ~400 h", "3 × AA, 800 h", "MAX"],
            ["Backlit keypad", "No", "Yes", "MAX"],
            ["Weight with holster", "624 g", "698.5 g", "87V"],
            ["Warranty", "Lifetime", "Limited lifetime", "Same in practice"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Published battery life without backlight. Higher is better.</>}>
            <BarChart
              items={[
                { label: "Fluke 87V (9V)", value: 400, display: "~400 h" },
                { label: "Fluke 87V MAX (3 × AA)", value: 800, display: "800 h", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Drop ratings as Fluke publishes them. The 87V has two figures in two places on its own page.</>}>
            <BarChart
              items={[
                { label: "87V, spec tab (IEC 61010-1)", value: 1, display: "1 m" },
                { label: "87V, comparison table", value: 3, display: "3 m" },
                { label: "87V MAX", value: 4, display: "4 m", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <div className="mt-4">
          <Figure
            caption={
              <>
                Allowed error on a 480 V AC reading on the 600.0 V range (0.1 V per count), worked from Fluke&apos;s
                accuracy lines. Lower is better; the gap is two counts.
              </>
            }
          >
            <BarChart
              items={[
                { label: "Fluke 87V: 0.7% + 2", value: 3.56, display: "±3.56 V", highlight: true },
                { label: "Fluke 87V MAX: 0.7% + 4", value: 3.76, display: "±3.76 V" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The arithmetic behind that last chart: 0.7% of 480 V is 3.36 V. The 87V adds two counts (0.2 V) for ±3.56 V,
          and the MAX adds four (0.4 V) for ±3.76 V. On a motor or feeder check that difference is smaller than the
          variation in the supply itself, so treat it as a footnote rather than a reason to choose.
        </p>
        <div className="mt-4">
          <KeyIdea title="Where Fluke's pages disagree">
            The 87V&apos;s drop rating appears twice on fluke.com: 3 m in the comparison table and 1 m per IEC 61010-1 in
            the spec tab&apos;s shock line. We show both. The comparison table on the MAX page also lists conductance and
            pulse width under the MAX only, but the 87V spec tab lists conductance to 60.00 nS, and we found no
            pulse-width range on the MAX spec tab, so we don&apos;t count either as a difference.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What IP30 and IP67 actually mean</h2>
        <p className="text-muted leading-7 mb-4">
          An IP code has two digits. The first rates protection against solids, the second against water. IP30 says the
          87V keeps out a probing finger or tool larger than about 2.5 mm and makes no water claim at all; a zero
          there means Fluke hasn&apos;t rated it, not that it dissolves in drizzle. IP67 says the MAX is dust-tight and
          survives temporary immersion, which the IEC 60529 test commonly defines as 1 m of water for 30 minutes.
        </p>
        <Figure caption={<>Decoding both ratings. The second digit is the real story: 0 against 7.</>}>
          <IpCodeDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Dust matters as much as water. Cement plants, grain handling, sawmills and mine sites push fine powder into
          every seam, where it can work into switches and the battery compartment. A dust-tight rating is the reason a
          meter like the MAX is pitched at those sites, not just at people who work in the rain.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Battery, keypad and holster: the daily-use changes</h2>
        <p className="text-muted leading-7 mb-4">
          The power change is easy to underrate. A 9V cell is one more battery type to stock, and Fluke quotes about 400
          hours for it. The MAX runs three AA cells for a quoted 800 hours. Put a technician at four hours of meter-on
          time a day, which is our illustrative assumption, and that is roughly 100 working days per 9V against roughly
          200 per set of AAs, before the backlight takes its share.
        </p>
        <p className="text-muted leading-7 mb-4">
          The backlight is the second change. Both meters have a two-level display backlight; only the MAX lights the
          buttons as well. In a dark crawlspace or a panel at night, that means finding the HOLD or MIN MAX key without
          a flashlight in your teeth. It sounds small, and on a night-shift breakdown call it isn&apos;t.
        </p>
        <p className="text-muted leading-7">
          Holsters are not a difference, despite how the MAX is sometimes marketed. Fluke describes both as removable
          and able to hold a test probe. The MAX ships with TL175 TwistGuard leads and the 80BK-A thermocouple; the 87V comes with TL75 leads and the 80BK. Both probes are K-type.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 87V vs 87V MAX: which should you buy?</h2>
        <DataTable
          head={["Your work", "Better fit", "Why"]}
          rows={[
            ["Indoor plant maintenance, MCCs, drives", "Fluke 87V", "Identical measuring core; IP67 adds little in a dry electrical room"],
            ["Solar farms, rooftops, outdoor utility", "Fluke 87V MAX", "Rain, dust and drops are the daily risk; IP67 and 4 m cover them"],
            ["Wastewater, food plants with wash-down", "Fluke 87V MAX", "An IP30 case has no water rating; the MAX is rated for immersion"],
            ["Cement, grain, mining-adjacent sites", "Fluke 87V MAX", "Dust-tight first digit keeps powder out"],
            ["Winter outdoor work", "Fluke 87V MAX", "Rated to -40 °C for 20 minutes; the 87V lists -20 °C minimum"],
            ["Electronics bench and calibration lab", "Fluke 87V", "Lighter, smaller, two counts tighter on AC volts"],
            ["Night-shift breakdown calls", "Fluke 87V MAX", "Backlit keypad and twice the battery life"],
            ["Best value per measurement", "Fluke 87V", "Same accuracy for less money; the extra buys durability only"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The cold-weather row needs care. The 87V&apos;s listed operating range starts lower, at -20 °C, than the
          MAX&apos;s -15 °C. The MAX&apos;s advantage is a short excursion: Fluke rates it down to -40 °C for 20 minutes
          when taken from 20 °C, which suits a meter carried from a warm truck to a frozen disconnect and back.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Is the MAX worth it for a field technician?</h2>
        <p className="text-muted leading-7 mb-4">
          Think about how a meter dies in the field rather than how it measures. Indoors, an 87V mostly fails from
          abuse it can be protected from: a blown fuse from leads left in the A jack, or a fall from a ladder. Outdoors,
          it faces water in the battery bay, dust in the rotary switch, and drops onto concrete or into standing water.
          Those are exactly the risks the MAX&apos;s rating targets.
        </p>
        <p className="text-muted leading-7 mb-4">
          So the question is where you spend your hours. A technician who splits time between a dry MCC room and the
          bench gets nothing measurable from the MAX and carries an extra 74.5 g on the belt. A solar O&amp;M tech, a
          utility contractor or anyone servicing pumps and lift stations is buying insurance against the most likely
          way their meter ends its life. For the solar case, our{" "}
          <Link href="/multimeters/best-multimeters-for-solar-panel-testing" className={link}>
            multimeters for solar panel testing
          </Link>{" "}
          guide explains which readings matter on a string.
        </p>
        <p className="text-muted leading-7">
          If the MAX is more meter than your job needs, compare the 87V against its smaller siblings in{" "}
          <Link href="/multimeters/fluke-87v-vs-fluke-179" className={link}>
            Fluke 87V vs Fluke 179
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/fluke-117-vs-fluke-87v" className={link}>
            Fluke 117 vs Fluke 87V
          </Link>
          . If you want logging on top of the 87V&apos;s precision, see{" "}
          <Link href="/multimeters/fluke-87v-vs-fluke-289" className={link}>
            Fluke 87V vs Fluke 289
          </Link>
          .
        </p>
      </section>

      <Callout title="Safety: a waterproof case is not a waterproof measurement">
        IP67 describes the closed meter, not the job. Once leads are plugged in, the jacks, probe tips and your hands are
        part of the circuit, and water on any of them can create a leakage path at the voltages both meters are rated
        for. Don&apos;t measure energized equipment while standing in water or with wet gloves. Dry the input jacks and
        battery door before use after a soaking. Both meters are rated CAT IV 600V / CAT III 1000V, but only with leads
        of an equal rating; check the cap on your probe tips before metering at a service entrance, and follow your
        site&apos;s lockout and PPE rules.
      </Callout>
    </>
  ),
  bottomLine:
    "Measurement-wise, the Fluke 87V and 87V MAX are the same meter, with the MAX two counts looser on AC volts. Buy the MAX for the conditions: IP67 sealing, a 4 m drop rating, 800-hour AA battery life and a backlit keypad make sense outdoors, in wet or dusty plants and on night calls. Indoors and on the bench, the standard 87V, our hands-on tested pick, is lighter and gives you the same readings for less.",
  faqs: [
    {
      question: "Is the Fluke 87V MAX more accurate than the 87V?",
      answer:
        "No. Fluke lists the same ±(0.05% + 1) DC volts, ±(0.2% + 2) DC amps, ±(1.0% + 2) AC amps and ±(0.2% + 1) resistance for both. The only measuring line that differs is AC volts, where the MAX is ±(0.7% + 4) against the 87V's ±(0.7% + 2), so the MAX is very slightly looser there.",
    },
    {
      question: "Is the Fluke 87V waterproof?",
      answer:
        "No. Fluke lists the standard 87V as IP30, and the zero means it has no rated water protection. It will usually shrug off a splash, but that is not a rating. If your meter gets rained on, used in wash-down areas or might be dropped in water, the IP67 87V MAX is the model built for it.",
    },
    {
      question: "Does the Fluke 87V MAX have LoZ?",
      answer:
        "Fluke doesn't list a low-impedance (LoZ) function for the 87V MAX, and none is listed for the 87V either. If ghost-voltage checks on building wiring are a priority, the Fluke 117 has a LoZ AutoVolt position, and the Fluke 289 also lists LoZ. Otherwise, add a known load across the leads to unmask a phantom reading.",
    },
    {
      question: "What batteries does the Fluke 87V MAX use?",
      answer:
        "Three AA cells, which Fluke rates at about 800 hours of typical use without the backlight. The standard 87V uses a single 9V alkaline battery rated about 400 hours. AA cells are easier to find on a job site, and the doubled life means fewer mid-job battery swaps on a meter that is on all shift.",
    },
    {
      question: "Can the Fluke 87V MAX be used in freezing weather?",
      answer:
        "Fluke lists its operating range as -15 °C to 55 °C, and says it can go to -40 °C for 20 minutes when taken from 20 °C. That suits short trips from a heated vehicle to an outdoor panel. Oddly, the standard 87V lists a lower continuous minimum, -20 °C, but no short-term cold rating.",
    },
    {
      question: "Do the Fluke 87V and 87V MAX use the same test leads?",
      answer:
        "No, they ship with different sets. Fluke lists TL75 test leads in the 87V box and TL175 TwistGuard leads in the 87V MAX box. Check the CAT rating printed on any replacement leads, since a meter is only as safe as its leads. Both include AC175 alligator clips and a K-type temperature probe: the 80BK with the 87V and the 80BK-A with the MAX.",
    },
    {
      question: "Is the 87V MAX heavier than the 87V?",
      answer:
        "Yes. Fluke lists the 87V MAX at 698.5 g with its holster and the 87V at 624 g with holster, so the MAX is about 75 g heavier. Its holstered case is also larger, 215 × 101 × 60 mm against 201 × 98 × 52 mm. Sealing gaskets, a thicker shell and three AA cells account for the extra mass.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 87V review", href: "/multimeters/fluke-87v-review" },
    { label: "Fluke 87V vs Fluke 179", href: "/multimeters/fluke-87v-vs-fluke-179" },
    { label: "Fluke 87V vs Fluke 289", href: "/multimeters/fluke-87v-vs-fluke-289" },
    { label: "Fluke 88V vs Fluke 87V", href: "/multimeters/fluke-88v-vs-fluke-87v" },
    { label: "Fluke 117 vs Fluke 87V", href: "/multimeters/fluke-117-vs-fluke-87v" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
  ],
};

export default function Fluke87vVsFluke87vMaxPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
