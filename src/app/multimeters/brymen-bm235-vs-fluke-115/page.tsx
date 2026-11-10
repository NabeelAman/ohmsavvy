// Brymen BM235 per the BM230 Series catalog, http://www.brymen.com/images/ProductsList/BM230_List/BM230_Catalog.pdf
// (as cited on /multimeters/brymen-bm235-vs-fluke-117, checked 2026-10-26): True RMS; 6,000 counts, 5 updates/s;
// DC V ±(0.2% + 2) to ±(0.4% + 2) by range; AC V ±(0.7% + 3) at 50-60 Hz, ±(2.0% + 3) at 45-440 Hz; volts input
// 10 MΩ // 54 pF; AutoV LoZ 600.0 V ±(2.0% + 3); VFD ACV 600.0 V ±(1.0% + 3) at a 10-100 Hz fundamental (to ±(10% + 3)
// at 400 Hz); current 600.0 µA / 6000 µA, 60.00 / 600.0 mA, 6.000 / 10.00 A, 10 A continuous, 20 A for 30 s;
// resistance to 60.00 MΩ; capacitance 20.00 nF to 10.00 mF; Type-K -40 °C to 400 °C ±(1% + 1 °C) excluding probe, bead
// probe included; diode 3.000 V; continuity threshold 30 Ω to 480 Ω, response under 15 ms; Hi/Lo EF (NCV) detection;
// CAT III 600V and CAT IV 300V; fuses 0.4 A/1000 V (30 kA) and 11 A/1000 V (20 kA); IP40; 2 × AAA; auto power-off after
// 30 min; 161 × 80 × 50 mm, about 334 g with holster. The BM235 A4 product sheet
// (http://brymen.com/images/ProductsList/BM230_List/BM235/BM235_A4.pdf) says CAT II 1kV / CAT III 600V instead.
// Amazon B01JZ1ADCO: "EEVblog Brymen BM235", ships from Amazon, sold by EEVblog, add-to-cart present at ZIP 10001
// (checked 2026-11-08).
// Fluke 115 per https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-115 and the
// 114/115/116/117 datasheet (2793260b, https://media.fluke.com/ce54d963-3be9-4e70-8a3e-b1060070fdfd_original%20file.pdf),
// as cited on /multimeters/fluke-15b-plus-vs-fluke-115 and /multimeters/fluke-115-vs-klein-mm400: True RMS; CAT III 600V;
// 6,000 counts at 4 updates/s plus a 33-segment bar graph; DC V ±(0.5% + 2); AC V ±(1.0% + 3), 45-500 Hz; input >10 MΩ
// DC; 6.000 A and 10.00 A only (no mA or µA), 1 mA best resolution; 40 MΩ; 1 nF to 9,999 µF; frequency to 50 kHz;
// Min/Max/Avg; no temperature (116 only), no LoZ (114/117 only), no NCV (117 only); one 9 V, 400 h typical;
// 167 × 84 × 46 mm; 550 g; 3-year warranty. Amazon B000OCFFMW in stock at ZIP 10001 (checked 2026-11-08).
// Drive-output behavior (PWM carrier on a lower-frequency fundamental) is standard drive theory, hedged on the page.
import Link from "@/components/AppLink";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/brymen-bm235-vs-fluke-115";
const bm235 = picks.find((p) => p.name === "Brymen BM235")!;
const fluke115 = picks.find((p) => p.name === "Fluke 115")!;

export const metadata = buildMetadata({
  title: "Brymen BM235 vs Fluke 115: Drives and Extras",
  description:
    "Brymen BM235 vs Fluke 115: VFD mode, temperature and µA ranges against Fluke's 3-year warranty and simpler dial. Specs, charts and a verdict by job.",
  path: "/multimeters/brymen-bm235-vs-fluke-115",
  image: fluke115.image,
});

const link = "text-accent hover:underline";

/**
 * A drive output: a fast PWM carrier whose average follows a slower fundamental. The BM235's VFD mode is specified
 * on the fundamental from 10 to 100 Hz; the Fluke 115's AC volts spec starts at 45 Hz. Waveform is illustrative.
 */
function DriveOutputDiagram() {
  const x0 = 20;
  const w = 360;
  const mid = 80;
  // Fundamental: one full sine across the width.
  const sine = Array.from({ length: 121 }, (_, i) => {
    const t = i / 120;
    return `${(x0 + t * w).toFixed(1)},${(mid - 40 * Math.sin(2 * Math.PI * t)).toFixed(1)}`;
  }).join(" ");
  // PWM carrier: 36 slots; pulse width follows the sine, positive or negative.
  const bars: { x: number; y: number; h: number; wd: number }[] = [];
  const slots = 36;
  const slotW = w / slots;
  for (let i = 0; i < slots; i++) {
    const s = Math.sin(2 * Math.PI * ((i + 0.5) / slots));
    const wd = Math.abs(s) * slotW * 0.9;
    const xs = x0 + i * slotW + (slotW - wd) / 2;
    if (wd < 0.6) continue;
    bars.push(s >= 0 ? { x: xs, y: mid - 50, h: 50, wd } : { x: xs, y: mid, h: 50, wd });
  }
  return (
    <svg
      viewBox="0 0 400 220"
      className="w-full h-auto"
      role="img"
      aria-label="Brymen BM235 vs Fluke 115 on a motor drive output: the drive switches full-voltage pulses whose width follows a slow sine fundamental. The BM235's VFD mode is specified for a 10 to 100 hertz fundamental; the Fluke 115's AC volts accuracy is specified from 45 to 500 hertz, so a drive running below 45 hertz is outside its stated range."
    >
      <line x1={x0} x2={x0 + w} y1={mid} y2={mid} className="stroke-border" strokeWidth="0.8" />
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={b.y} width={b.wd} height={b.h} className="fill-accent/25" />
      ))}
      <polyline points={sine} fill="none" className="stroke-accent" strokeWidth="2.2" />
      <text x={x0} y="16" fontSize="10" fontWeight="700" className="fill-foreground">Drive output, one cycle of the fundamental</text>
      <text x={x0 + w} y="16" fontSize="8.5" textAnchor="end" className="fill-muted">illustrative</text>
      <text x={x0 + 4} y="146" fontSize="8.5" className="fill-muted">shaded: fast PWM pulses at full bus voltage</text>
      <text x={x0 + 4} y="158" fontSize="8.5" className="fill-accent">line: the fundamental the motor responds to</text>
      <rect x="20" y="168" width="170" height="44" rx="6" className="fill-surface stroke-accent" strokeWidth="1.2" />
      <text x="28" y="185" fontSize="9.5" fontWeight="700" className="fill-foreground">Brymen BM235, VFD mode</text>
      <text x="28" y="201" fontSize="9" className="fill-foreground">±(1.0% + 3), 10–100 Hz fundamental</text>
      <rect x="210" y="168" width="170" height="44" rx="6" className="fill-surface stroke-border" strokeWidth="1.2" />
      <text x="218" y="185" fontSize="9.5" fontWeight="700" className="fill-foreground">Fluke 115, AC volts</text>
      <text x="218" y="201" fontSize="9" className="fill-foreground">±(1.0% + 3), 45–500 Hz, no filter</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Brymen BM235 vs Fluke 115",
  path,
  published: "2026-11-08",
  intro:
    "Brymen BM235 vs Fluke 115 is a features-against-pedigree question. Both are True RMS, 6,000-count, CAT III 600V meters, but the BM235 adds a VFD mode, a Type-K temperature input, AutoV low-impedance volts, non-contact voltage and microamp and milliamp ranges. The Fluke 115 has none of those, and answers with a 3-year warranty, a 400-hour 9 V battery and a short, plain dial from the maker most US shops already stock parts for.",
  a: {
    pick: bm235,
    imageAlt: "Brymen BM235 True RMS multimeter, front view",
    chooseIf: [
      "You check motor drives and want a mode Brymen specifies on a 10–100 Hz fundamental",
      "You need microamp or milliamp ranges, for sensor loops, standby draw or flame rods",
      "You want temperature, LoZ and non-contact voltage in one meter",
      "You are comfortable buying the EEVblog edition, sold by EEVblog on Amazon",
    ],
  },
  b: {
    pick: fluke115,
    reviewHref: "/multimeters/fluke-115-review",
    imageAlt: "Fluke 115 True RMS field service multimeter, front view",
    chooseIf: [
      "Your work is volts, amps on the 6 A or 10 A range, ohms, capacitance and frequency",
      "You want Fluke's 3-year warranty and a model your employer or supplier already supports",
      "You want one 9 V battery rated for about 400 hours",
      "You prefer fewer dial positions and no modes you'll never use",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "6,000 counts, 5 updates/s", b: "6,000 counts, 4 updates/s, 33-segment bar graph" },
    { label: "DC volts accuracy", a: "±(0.2% + 2) to ±(0.4% + 2) by range", b: "±(0.5% + 2)" },
    { label: "AC volts accuracy", a: "±(0.7% + 3) at 50–60 Hz; ±(2.0% + 3) at 45–440 Hz", b: "±(1.0% + 3), 45–500 Hz" },
    { label: "VFD mode", a: "600.0 V, ±(1.0% + 3) at 10–100 Hz", b: "None" },
    { label: "Current ranges", a: "600.0 µA to 10.00 A in six ranges", b: "6.000 A and 10.00 A only" },
    { label: "Temperature", a: "Type-K, −40 to 400 °C, bead probe included", b: "None (Fluke 116 only)" },
    { label: "LoZ / NCV", a: "AutoV LoZ and Hi/Lo EF detection", b: "Neither" },
    { label: "Capacitance", a: "Up to 10.00 mF", b: "Up to 9,999 µF" },
    { label: "Safety rating", a: "CAT III 600V / CAT IV 300V (catalog); A4 sheet: CAT II 1kV / CAT III 600V", b: "CAT III 600V" },
    { label: "Power", a: "2 × AAA; auto-off after 30 min", b: "One 9 V, about 400 h" },
    { label: "Size and weight", a: "161 × 80 × 50 mm, about 334 g with holster", b: "167 × 84 × 46 mm, 550 g" },
    { label: "Warranty", a: "Not stated in Brymen's catalog", b: "3 years" },
  ],
  differences: [
    "Drives: Brymen specifies a VFD voltage mode at ±(1.0% + 3) on a 10–100 Hz fundamental. The Fluke 115 has no drive mode, and its AC volts accuracy is specified only from 45 Hz.",
    "Current: the BM235 has 600.0 µA, 6000 µA, 60.00 mA and 600.0 mA ranges below its amp ranges. The 115 has only 6.000 A and 10.00 A, so its smallest step is 1 mA.",
    "Temperature: the BM235 reads Type-K from −40 to 400 °C with a bead probe in the box. Fluke reserves temperature for the 116.",
    "Ghost voltage and live-wire checks: the BM235 has AutoV low-impedance volts and non-contact EF detection. The 115 has neither; those sit on the 117.",
    "DC accuracy: Brymen's ±(0.2% + 2) best case is tighter than the 115's ±(0.5% + 2).",
    "Safety rating: Fluke states CAT III 600V without conflict. Brymen's catalog says CAT III 600V / CAT IV 300V and its A4 sheet says CAT II 1kV / CAT III 600V.",
    "Ownership: the 115 carries a 3-year warranty and runs about 400 hours on a 9 V. Brymen's catalog states no warranty term, and the US unit is the EEVblog edition.",
    "The Fluke 115 carries our Hands-on Tested badge; the BM235 assessment is desk research from Brymen's published specs.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">What the BM235 adds over the Fluke 115</h2>
        <p className="text-muted leading-7 mb-4">
          Count the functions and the BM235 wins by five: VFD volts, temperature, low-impedance volts, non-contact
          detection and sub-amp current ranges. The two meters tie on the basics. Both are True RMS, both show 6,000
          counts, and both cover 600 V, 10 A, tens of megohms and capacitance into the millifarad range. The charts
          below show the spread on the numbers that differ.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Smallest current resolution, log scale. The BM235&apos;s 600.0 µA range steps in 0.1 µA; the 115&apos;s 6 A range steps in 1 mA.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 115", value: 1000, display: "1 mA (1,000 µA)" },
                { label: "Brymen BM235", value: 0.1, display: "0.1 µA", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Best-case DC volts accuracy, percent of reading. Smaller is better.</>}>
            <BarChart
              items={[
                { label: "Fluke 115", value: 0.5, display: "±(0.5% + 2)" },
                { label: "Brymen BM235", value: 0.2, display: "±(0.2% + 2)", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Worked on a 12.60 V battery, using each maker&apos;s own spec: the BM235 on its 60.00 V range allows
          0.2% of 12.60 (0.025 V) plus 2 digits of 0.01 V, so ±0.045 V. The Fluke allows 0.5% (0.063 V) plus 0.02 V,
          so ±0.083 V. Both are fine for judging state of charge. The gap only matters when you compare readings to a
          tight published threshold, such as a regulator&apos;s setpoint. If DC accuracy is the main reason you are
          shopping, the{" "}
          <Link href="/multimeters/fluke-115-vs-fluke-87v" className={link}>
            Fluke 115 vs 87V
          </Link>{" "}
          comparison covers a meter built for it.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Reading a motor drive output</h2>
        <p className="text-muted leading-7 mb-4">
          This is the job where the two meters part ways most clearly. A variable frequency drive builds its output
          from fast, full-voltage pulses whose width rises and falls to trace a slower sine. The motor responds to
          that slower fundamental. A True RMS meter without filtering sees the whole pulse train, carrier and all,
          so the carrier&apos;s harmonics feed into the reading along with the fundamental. That is standard drive theory, and it is why filtered drive modes exist.
        </p>
        <Figure
          caption={
            <>
              Illustrative drive waveform. The BM235&apos;s VFD mode is specified on the fundamental from 10 to 100 Hz.
              The Fluke 115 has no filter, and Fluke specifies its AC volts from 45 Hz up.
            </>
          }
        >
          <DriveOutputDiagram />
        </Figure>
        <p className="text-muted leading-7 my-4">
          Brymen publishes a dedicated VFD ACV function at ±(1.0% + 3) for a 10–100 Hz fundamental, loosening to
          ±(10% + 3) at 400 Hz. That covers the range most conveyor, fan and pump drives run in. The Fluke 115 has
          no equivalent, and there is a second problem: a fan turned down to 30 Hz is below the 45 Hz floor of the
          115&apos;s AC accuracy spec, so Fluke makes no accuracy promise for that reading at all. On the drive&apos;s
          input side, where the supply is ordinary 60 Hz mains, both meters are on solid ground.
        </p>
        <KeyIdea title="The BM235 is not an 87V on drives">
          Fluke&apos;s answer to drive work is the low-pass filter on the 87V, rated 3 dB at 1 kHz. The BM235&apos;s
          VFD mode does the same kind of job, but Brymen&apos;s catalog doesn&apos;t describe how its filter is built or give a cutoff
          frequency. For an occasional drive check it is the stronger of these two meters by a wide
          margin. For daily drive commissioning, compare it against the{" "}
          <Link href="/multimeters/fluke-87v-review" className={link}>
            Fluke 87V
          </Link>{" "}
          before you buy.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Small currents: the 115 stops at 1 mA</h2>
        <p className="text-muted leading-7 mb-4">
          The Fluke 115 has two current ranges, 6 A and 10 A, and nothing smaller. A 4–20 mA sensor loop at 12 mA
          shows as 0.012 A, three digits of 1 mA each, which tells you the loop is alive but little more. A car&apos;s
          parasitic drain of 35 mA reads 0.035 A. A flame-rod signal of a few microamps doesn&apos;t register at all.
        </p>
        <p className="text-muted leading-7 mb-4">
          The BM235 covers all three. Its 60.00 mA range shows the same loop as 12.00 mA, and its 600.0 µA range
          resolves 0.1 µA. Brymen lists the burden for each range, 1.9 mV per mA on the mA ranges and 0.1 mV per µA
          on the µA ranges, so you can work out how much the meter itself disturbs a low-voltage loop. We have
          already covered this gap in depth on{" "}
          <Link href="/multimeters/fluke-175-vs-fluke-115" className={link}>
            Fluke 175 vs 115
          </Link>{" "}
          and for HVAC on{" "}
          <Link href="/multimeters/fluke-116-vs-fluke-115" className={link}>
            Fluke 116 vs 115
          </Link>
          . The short version: if any of your work happens below 1 A, the 115 is the wrong meter.
        </p>
        <Callout title="Two fuses, two input jacks to watch">
          The BM235&apos;s µA/mA jack is protected by a 0.4 A, 1000 V fuse and its amp jack by an 11 A, 1000 V fuse. A
          lead left in a current jack and pressed across a supply will blow a fuse at best. Before you probe voltage,
          check the red lead is back in the volts jack, on either meter.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where the Fluke 115 is still the better buy</h2>
        <p className="text-muted leading-7 mb-4">
          The 115 wins on paperwork, not functions. Fluke states one safety rating, CAT III 600V, and it matches the
          meter. Brymen&apos;s catalog and the BM235&apos;s own markings give CAT III 600V with CAT IV 300V, while the
          BM235 product sheet gives CAT II 1kV with CAT III 600V. Both versions agree on CAT III 600V, which is the
          rating that matters for branch circuits and panels, so neither meter is the one for service entrances.
          See{" "}
          <Link href="/multimeters/cat-iii-vs-cat-iv-multimeter" className={link}>
            CAT III vs CAT IV
          </Link>{" "}
          for where the line falls.
        </p>
        <p className="text-muted leading-7 mb-4">
          Fluke also puts a 3-year warranty on the 115, and its 9 V battery is rated for about 400 hours. Brymen&apos;s
          catalog doesn&apos;t state a warranty term, and on Amazon the meter is the EEVblog edition, sold by EEVblog
          rather than a large US brand. For a contractor buying meters for a crew, that matters more than a VFD mode
          nobody on the crew uses. The 115&apos;s dial is also simpler, with no LoZ or NCV positions, so there are fewer
          ways to pick the wrong function.
        </p>
        <p className="text-muted leading-7">
          Weight goes the other way. Brymen gives about 334 g including the holster; Fluke gives 550 g for the 115.
          The bodies are almost the same length and width, 161 × 80 mm against 167 × 84 mm, and the BM235 is 4 mm
          thicker.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Brymen BM235 vs Fluke 115: which should you buy?</h2>
        <DataTable
          head={["Job", "Better fit", "Why"]}
          rows={[
            ["Fan, pump or conveyor drive output", "Brymen BM235", "VFD mode specified on a 10–100 Hz fundamental"],
            ["4–20 mA loops, parasitic drain, flame rods", "Brymen BM235", "µA and mA ranges; the 115 starts at 1 mA steps"],
            ["Duct, pipe or heatsink temperature", "Brymen BM235", "Type-K input with a bead probe in the box"],
            ["Dead circuits that show ghost voltage", "Brymen BM235", "AutoV low-impedance volts; the 115 has no LoZ"],
            ["Outlets, breakers and branch circuits", "Either", "Both True RMS and CAT III 600V"],
            ["Meters bought for a crew or under a company policy", "Fluke 115", "3-year warranty and Fluke support channels"],
            ["Long gaps between battery changes", "Fluke 115", "One 9 V rated for about 400 h"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Our verdict: buy the BM235 if you work on anything beyond plain mains circuits, because the 115 cannot do
          drive, milliamp, microamp or temperature work at all. Buy the 115 if your work is volts, amps, ohms and
          capacitors on building wiring and you value Fluke&apos;s warranty and support over functions. The{" "}
          <Link href="/multimeters/brymen-bm235-vs-fluke-117" className={link}>
            Brymen BM235 vs Fluke 117
          </Link>{" "}
          page compares the two low-impedance designs if ghost voltage is your main concern, and{" "}
          <Link href="/multimeters/fluke-115-vs-fluke-117" className={link}>
            Fluke 115 vs Fluke 117
          </Link>{" "}
          shows what the 115&apos;s bigger brother adds.
        </p>
      </section>
    </>
  ),
  bottomLine:
    "The Brymen BM235 is the more capable meter: VFD mode, Type-K temperature, AutoV LoZ, NCV and microamp-to-milliamp ranges the Fluke 115 lacks, with tighter DC accuracy. The Fluke 115 is the safer purchase for building-wiring work where those extras go unused, with a 3-year warranty, a 400-hour 9 V battery and one clearly stated CAT III 600V rating.",
  chooseNeitherIf:
    "You work at service entrances, meter bases or outdoor feeders: the Fluke 115 is CAT III 600V only and the BM235's CAT IV rating stops at 300V. Look at a CAT IV 600V meter such as the Fluke 179 or 87V.",
  faqs: [
    {
      question: "Is the Brymen BM235 as accurate as the Fluke 115?",
      answer:
        "On paper it is more accurate on DC volts. Brymen's catalog gives ±(0.2% + 2) on its best range against ±(0.5% + 2) for the Fluke 115. On AC volts at 50 to 60 Hz Brymen specifies ±(0.7% + 3) and Fluke ±(1.0% + 3). Both are True RMS with 6,000 counts. These are maker specifications, not our measurements.",
    },
    {
      question: "Can the Fluke 115 measure a VFD output?",
      answer:
        "It has no VFD or low-pass mode, and Fluke specifies its AC volts accuracy from 45 to 500 Hz only. A drive running below 45 Hz is outside that spec, and the PWM carrier can push readings high. The BM235 has a VFD mode Brymen specifies at ±(1.0% + 3) for a 10 to 100 Hz fundamental.",
    },
    {
      question: "Does the Fluke 115 measure milliamps?",
      answer:
        "No. The 115 has 6.000 A and 10.00 A ranges only, so its finest step is 1 mA and it has no microamp range. The BM235 has 600.0 µA, 6000 µA, 60.00 mA and 600.0 mA ranges, which suits 4 to 20 mA loops, standby draw and HVAC flame sensors.",
    },
    {
      question: "Why is the Brymen BM235 sold as an EEVblog edition?",
      answer:
        "The Amazon listing is titled EEVblog Brymen BM235 and is sold by EEVblog, with Amazon handling shipping. It is the same BM235 model in Brymen's catalog. The practical difference for a US buyer is support: warranty and service run through the seller and Brymen's distributors rather than a large US brand.",
    },
    {
      question: "Which meter is lighter to carry?",
      answer:
        "The BM235, at about 334 g including its holster according to Brymen, against 550 g for the Fluke 115. Both bodies are about the same height and width, 161 by 80 mm against 167 by 84 mm. The BM235 runs on two AAA cells and the 115 on one 9 V battery.",
    },
    {
      question: "Is the Fluke 115 worth it without LoZ or temperature?",
      answer:
        "It is if your work is outlets, breakers, appliance circuits and capacitors, where True RMS, 6,000 counts and a 3-year warranty cover what you need. If ghost voltage is a problem, the Fluke 117 adds LoZ and non-contact voltage in the same body. If you need temperature, look at the Fluke 116 or the BM235.",
    },
  ],
  roundup: { label: "See all multimeter picks", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 115 review", href: "/multimeters/fluke-115-review" },
    { label: "Brymen BM235 vs Fluke 117", href: "/multimeters/brymen-bm235-vs-fluke-117" },
    { label: "Fluke 115 vs Fluke 117", href: "/multimeters/fluke-115-vs-fluke-117" },
    { label: "Fluke 115 vs Fluke 87V", href: "/multimeters/fluke-115-vs-fluke-87v" },
    { label: "Fluke 175 vs Fluke 115", href: "/multimeters/fluke-175-vs-fluke-115" },
    { label: "Fluke 116 vs Fluke 115", href: "/multimeters/fluke-116-vs-fluke-115" },
    { label: "Fluke 114 vs Fluke 115", href: "/multimeters/fluke-114-vs-fluke-115" },
    { label: "Fluke 113 vs Fluke 115", href: "/multimeters/fluke-113-vs-fluke-115" },
    { label: "Fluke 15B+ vs Fluke 115", href: "/multimeters/fluke-15b-plus-vs-fluke-115" },
    { label: "Fluke 115 vs Klein MM400", href: "/multimeters/fluke-115-vs-klein-mm400" },
    { label: "Fluke 115 vs UNI-T UT139C", href: "/multimeters/fluke-115-vs-uni-t-ut139c" },
    { label: "Do I need a True RMS multimeter?", href: "/multimeters/do-i-need-true-rms-multimeter" },
    { label: "CAT III vs CAT IV multimeters", href: "/multimeters/cat-iii-vs-cat-iv-multimeter" },
    { label: "Best multimeters for 4–20 mA loop testing", href: "/multimeters/best-multimeters-for-4-20ma-loop-testing" },
  ],
};

export default function BrymenBm235VsFluke115Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
