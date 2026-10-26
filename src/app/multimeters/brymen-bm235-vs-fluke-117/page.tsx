// Brymen BM235 per the BM230 Series catalog, http://www.brymen.com/images/ProductsList/BM230_List/BM230_Catalog.pdf
// (checked 2026-10-26): 6,000 counts, 5 updates/s; True RMS sensing; DC V accuracy ±(0.2% + 2) to ±(0.4% + 2) by range;
// AC V ±(0.7% + 3) at 50-60 Hz, ±(2.0% + 3) at 45-440 Hz; volts input 10 MΩ // 54 pF; AutoV (235 only) 600.0 V ±(2.0% + 3),
// threshold about 1 V; AutoV impedance from quiescence >8 MΩ below about 8 V, 25 kΩ at 9 V, 13 kΩ at 10 V, 2.6 kΩ at 50 V;
// for inputs well above 50 V it starts near 2.1 kΩ and rises within a fraction of a second to about 12 kΩ at 100 V,
// 100 kΩ at 300 V and 240 kΩ at 600 V; VFD ACV 600.0 V ±(1.0% + 3) at 10-100 Hz fundamental (to ±(10% + 3) at 400 Hz);
// current 600.0 µA / 6000 µA (0.1 mV/µA burden), 60.00 / 600.0 mA (1.9 mV/mA), 6.000 / 10.00 A (0.04 V/A), 10 A continuous,
// 20 A for 30 s; resistance 600.0 Ω to 60.00 MΩ; capacitance 20.00 nF to 10.00 mF; Type-K -40 °C to 400 °C ±(1% + 1 °C)
// excluding probe, bead probe included; frequency accuracy ±(0.03% + 2); diode 3.000 V, 0.3 mA; continuity threshold
// between 30 Ω and 480 Ω, response under 15 ms, beep plus backlight flash; Hi/Lo EF detection, antenna at the top-left end;
// CAT III 600V and CAT IV 300V; 6.0 kV transient; fuses 0.4 A/1000 V (30 kA) and 11 A/1000 V (20 kA); IP40; 2 × AAA;
// auto power-off after 30 min; 161 × 80 × 50 mm and about 334 g with holster.
// Brymen BM235 product sheet http://brymen.com/images/ProductsList/BM230_List/BM235/BM235_A4.pdf gives CAT II 1kV and
// CAT III 600V instead; the conflict is stated on the page.
// Fluke 117 per the Fluke 114/115/116/117 datasheet (2793260b) and 2020 users manual, as cited on
// /multimeters/fluke-115-vs-fluke-117: 6,000 counts, 4 updates/s, 33-segment bar graph; DC V ±(0.5% + 2); AC V ±(1.0% + 3)
// at 45-500 Hz; >10 MΩ DC, >5 MΩ AC; AutoVolt LoZ about 3 kΩ, 600.0 V ±(2.0% + 3); 6 A and 10 A, 20 A for 30 s, 1 mA best
// resolution; resistance to 40.00 MΩ; capacitance 1 nF to 9,999 µF; frequency to 50 kHz; continuity below 20 Ω; diode
// 2.000 V; no temperature (116 only); CAT III 600V; one 9V, 400 h; 167 × 84 × 46 mm; 550 g; 3-year warranty.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/brymen-bm235-vs-fluke-117";

export const metadata = buildMetadata({
  title: "Brymen BM235 vs Fluke 117",
  description:
    "Brymen BM235 vs Fluke 117: both True RMS with LoZ and NCV, but the BM235 adds VFD mode and temperature. Safety ratings, features and which to buy.",
  path: "/multimeters/brymen-bm235-vs-fluke-117",
});

const link = "text-accent hover:underline";

// Log-log axes for the LoZ impedance plot: volts 1 to 1,000 across, ohms 1 kΩ to 10 MΩ up.
const vx = (v: number) => 40 + Math.log10(v) * (260 / 3);
const ry = (r: number) => 170 - (Math.log10(r) - 3) * 35;

/** Brymen publishes how the BM235's AutoV input impedance changes with voltage; Fluke gives one figure for the 117. */
function LozImpedanceDiagram() {
  const settle = [
    [9, 25_000],
    [10, 13_000],
    [50, 2_600],
  ];
  const endUp = [
    [100, 12_000],
    [300, 100_000],
    [600, 240_000],
  ];
  const firstLeg = `M${vx(1)} ${ry(8_000_000)} H${vx(8)} ` + settle.map(([v, r]) => `L${vx(v)} ${ry(r)}`).join(" ");
  const secondLeg = `M${vx(50)} ${ry(2_600)} ` + endUp.map(([v, r]) => `L${vx(v)} ${ry(r)}`).join(" ");
  return (
    <svg
      viewBox="0 0 340 215"
      className="w-full h-auto"
      role="img"
      aria-label="Log-log plot of low-impedance input versus applied voltage. The Brymen BM235 AutoV input stays above 8 megohms below about 8 volts, falls to about 2.6 kilohms at 50 volts, and on higher voltages settles back up to about 12 kilohms at 100 volts and 240 kilohms at 600 volts. The Fluke 117 is shown as a flat line at about 3 kilohms, the single figure Fluke publishes."
    >
      <line x1="40" y1="30" x2="40" y2="170" className="stroke-border" strokeWidth="1" />
      <line x1="40" y1="170" x2="300" y2="170" className="stroke-border" strokeWidth="1" />
      {[1_000, 10_000, 100_000, 1_000_000, 10_000_000].map((r, i) => (
        <g key={r}>
          <line x1="40" x2="300" y1={ry(r)} y2={ry(r)} className="stroke-border" strokeWidth="0.5" strokeDasharray="2 3" />
          <text x="36" y={ry(r) + 3} fontSize="8.5" textAnchor="end" className="fill-muted">
            {["1k", "10k", "100k", "1M", "10M"][i]}
          </text>
        </g>
      ))}
      {[1, 10, 100, 1000].map((v) => (
        <text key={v} x={vx(v)} y="182" fontSize="8.5" textAnchor="middle" className="fill-muted">
          {v} V
        </text>
      ))}
      <text x="170" y="198" fontSize="9" textAnchor="middle" className="fill-muted">Voltage across the leads (log scale)</text>
      <text x="8" y="20" fontSize="9" className="fill-muted">Input impedance, Ω</text>
      <line x1="40" x2="300" y1={ry(3_000)} y2={ry(3_000)} className="stroke-foreground" strokeWidth="2" strokeDasharray="6 3" />
      <text x="296" y={ry(3_000) + 13} fontSize="9" textAnchor="end" className="fill-foreground">Fluke 117 AutoVolt ≈ 3 kΩ</text>
      <path d={firstLeg} className="fill-none stroke-accent" strokeWidth="2.4" strokeLinejoin="round" />
      <path d={secondLeg} className="fill-none stroke-accent" strokeWidth="2.4" strokeDasharray="4 3" />
      {[...settle, ...endUp].map(([v, r]) => (
        <circle key={v} cx={vx(v)} cy={ry(r)} r="3" className="fill-accent" />
      ))}
      <text x="46" y={ry(8_000_000) - 6} fontSize="9" className="fill-accent">BM235: above 8 MΩ under ~8 V</text>
      <text x={vx(600) - 4} y={ry(240_000) - 8} fontSize="9" textAnchor="end" className="fill-accent">rises to 240 kΩ at 600 V</text>
      <text x={vx(50) + 4} y={ry(2_600) + 14} fontSize="8.5" className="fill-muted">≈2.6 kΩ at 50 V</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Brymen BM235 vs Fluke 117",
  path,
  published: "2026-10-22",
  updated: "2026-10-26",
  intro:
    "Brymen BM235 vs Fluke 117 is the enthusiast's favorite against the electrician's standard. On the core electrician features they match: True RMS, 6,000 counts, a low-impedance voltage mode and non-contact voltage detection. The BM235 piles on a VFD mode, Type-K temperature, relative zero and µA/mA ranges; the 117 answers with a bar graph, a three-year warranty and Fluke's US support network.",
  a: {
    pick: picks.find((p) => p.name === "Brymen BM235")!,
    imageAlt: "Brymen BM235 True RMS digital multimeter, front view",
    chooseIf: [
      "You service variable-frequency drives and want a dedicated VFD voltage and frequency mode",
      "You want temperature, relative zero and µA/mA ranges in the same meter",
      "You value features per dollar over brand and US support",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 117")!,
    reviewHref: "/multimeters/fluke-117-review",
    imageAlt: "Fluke 117 True RMS multimeter, front view",
    chooseIf: [
      "You want the meter most electricians and employers already know and accept",
      "You prefer a clear CAT III 600V rating stated consistently by the maker",
      "You want a 33-segment bar graph and Fluke's three-year warranty",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "6,000 counts, 5 updates/s, white backlight", b: "6,000 counts, 4 updates/s + 33-segment bar graph" },
    { label: "DC volts accuracy", a: "±(0.2% + 2) to ±(0.4% + 2) by range", b: "±(0.5% + 2)" },
    { label: "Low-impedance mode", a: "AutoV LoZ, impedance varies with voltage", b: "AutoVolt position, about 3 kΩ" },
    { label: "Non-contact voltage", a: "Yes (Hi/Lo EF detection)", b: "Yes (VoltAlert, Lo/Hi)" },
    { label: "VFD mode", a: "Yes, 600 V, ±(1.0% + 3) at 10–100 Hz", b: "No" },
    { label: "Temperature", a: "Type-K, -40 to 400 °C, bead probe included", b: "No (Fluke datasheet: 116 only)" },
    { label: "Current ranges", a: "600 µA to 10A, six ranges", b: "6A and 10A AC/DC" },
    { label: "Capacitance", a: "20 nF to 10 mF", b: "1 nF to 9,999 µF" },
    { label: "Continuity", a: "Beep + backlight flash, 30–480 Ω threshold", b: "Beeps below 20 Ω" },
    { label: "Recording", a: "Max/Min/Avg, relative zero", b: "Min/Max/Average" },
    { label: "Max voltage", a: "Brymen sources differ (600V–1000V)", b: "600V AC/DC" },
    { label: "Ingress protection", a: "IP40", b: "Not stated" },
    { label: "Battery", a: "2 × AAA", b: "One 9V, 400 h typical" },
    { label: "Size / weight", a: "161 × 80 × 50 mm, about 334 g with holster", b: "167 × 84 × 46 mm, 550 g" },
    { label: "Warranty", a: "Not stated in our sources", b: "3 years" },
  ],
  differences: [
    "Both are True RMS with a low-impedance mode and non-contact voltage detection, so the core electrician toolkit is shared.",
    "The BM235 adds a VFD voltage and frequency mode, Type-K temperature, relative zero and µA/mA current ranges.",
    "The Fluke 117 adds a 33-segment bar graph and comes with a stated three-year warranty.",
    "Brymen's own documents disagree on the BM235's ratings: its BM230 Series catalog gives CAT III 600V and CAT IV 300V, while the BM235 product sheet and web page list CAT II 1kV and CAT III 600V.",
    "The BM235's low-impedance input changes with voltage, from above 8 MΩ to about 2.1 kΩ and back up to 240 kΩ at 600 V; Fluke quotes about 3 kΩ for the 117.",
    "The BM235's US Amazon listing is the EEVblog edition, and support runs through Brymen's distributors rather than a large US brand.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Feature-by-feature</h2>
        <DataTable
          head={["Feature", "Brymen BM235", "Fluke 117"]}
          rows={[
            ["True RMS", "Yes", "Yes"],
            ["Low-impedance voltage", "Yes", "Yes"],
            ["Non-contact voltage", "Yes", "Yes"],
            ["Automatic AC/DC selection", "Yes (AutoV)", "Yes (AutoVolt)"],
            ["VFD mode", "Yes", "No"],
            ["Temperature", "Yes", "No"],
            ["µA and mA ranges", "Yes", "No"],
            ["Relative zero", "Yes", "Not listed"],
            ["Bar graph", "Not listed", "Yes"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Brymen BM235 vs Fluke 117 spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Brymen publishes a full accuracy table for the BM230 Series in its catalog, and Fluke publishes one for the 110
          Series. Set side by side, the Brymen is the tighter instrument on paper for DC volts and line-frequency AC volts,
          and it resolves far smaller currents. The Fluke&apos;s advantages are elsewhere: the analog-style bar graph, a
          lower continuity threshold that only beeps on a near-dead short, and the paperwork behind the brand.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure
            caption={
              <>
                Best-case DC volts accuracy, ±% of reading. Lower is better. The BM235 figure is its tightest range; its
                other ranges are ±(0.3% + 2) or ±(0.4% + 2), all still inside the 117&apos;s ±(0.5% + 2).
              </>
            }
          >
            <BarChart
              items={[
                { label: "Brymen BM235", value: 0.2, display: "0.2% + 2", highlight: true },
                { label: "Fluke 117", value: 0.5, display: "0.5% + 2" },
              ]}
            />
          </Figure>
          <Figure
            caption={
              <>
                Smallest current step on a log scale. The BM235&apos;s 600.0 µA range shows 0.1 µA; the 117&apos;s 6.000 A
                range shows 1 mA, a step 10,000 times larger.
              </>
            }
          >
            <BarChart
              log
              items={[
                { label: "Brymen BM235", value: 0.0000001, display: "0.1 µA", highlight: true },
                { label: "Fluke 117", value: 0.001, display: "1 mA" },
              ]}
            />
          </Figure>
          <Figure
            caption={
              <>
                AC volts accuracy at 50/60 Hz mains, ±% of reading. Brymen widens its figure to ±(2.0% + 3) across 45 to
                440 Hz; Fluke holds ±(1.0% + 3) from 45 to 500 Hz.
              </>
            }
          >
            <BarChart
              items={[
                { label: "BM235, 50–60 Hz", value: 0.7, display: "0.7% + 3", highlight: true },
                { label: "Fluke 117, 45–500 Hz", value: 1.0, display: "1.0% + 3" },
                { label: "BM235, 45–440 Hz", value: 2.0, display: "2.0% + 3" },
              ]}
            />
          </Figure>
          <Figure
            caption={
              <>
                Weight in grams. Brymen&apos;s figure includes the holster; Fluke doesn&apos;t say whether its 550 g does,
                so treat the gap as approximate.
              </>
            }
          >
            <BarChart
              items={[
                { label: "Brymen BM235", value: 334, display: "≈334 g", highlight: true },
                { label: "Fluke 117", value: 550, display: "550 g" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          What those numbers mean on the job: for checking a 120 V receptacle, either meter is far more accurate than the
          question needs. A 0.5% error on 120 V is 0.6 V. The gap matters on a 0-10 V control signal or a 4-20 mA loop,
          where the BM235&apos;s mA ranges read loop current directly at 0.01 mA resolution and the 117 can only show
          whole milliamps on its 6 A range. For furnace flame-sensor current in microamps, only the Brymen has a range at
          all.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Two kinds of low-impedance input</h2>
        <p className="text-muted leading-7 mb-4">
          Both meters fight ghost voltage, the phantom reading a disconnected wire picks up from a live neighbor in the
          same conduit, by loading the circuit with a low input impedance. They do it differently. Fluke gives one figure
          for the 117&apos;s AutoVolt position: about 3 kΩ. Brymen publishes a curve. Below about 8 V the BM235&apos;s
          AutoV input stays above 8 MΩ, so it doesn&apos;t load a low-voltage control circuit. Between 9 V and 50 V it
          falls to about 2.6 kΩ. Push well past 50 V and it starts near 2.1 kΩ, then climbs within a fraction of a second
          to about 12 kΩ at 100 V and 240 kΩ at 600 V.
        </p>
        <Figure caption={<>Low-impedance input versus voltage. BM235 values are Brymen&apos;s typical figures; the dashed accent line is where the input settles after the first fraction of a second.</>}>
          <LozImpedanceDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Why the rise matters is our arithmetic, not a Brymen statement: at 600 V a 240 kΩ load dissipates about 1.5 W
          (600² ÷ 240,000), while a fixed 2.1 kΩ would have to absorb more than 170 W. A ghost voltage never gets that
          far, because the coupled source can&apos;t hold its voltage up once the meter loads it, so it collapses while
          the BM235 is still in its low-impedance region. A real supply holds its voltage and drives the meter up the
          curve. For a walk-through of the check itself, see{" "}
          <Link href="/multimeters/why-does-my-multimeter-show-voltage-when-measuring-a-disconnected-circuit" className={link}>
            why a multimeter shows voltage on a disconnected circuit
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Reading the BM235&apos;s safety rating</h2>
        <Figure caption={<>Ratings as published by each maker. Brymen&apos;s catalog and product sheet disagree, so we follow the catalog and the meter&apos;s markings.</>}>
          <InfoCards
            items={[
              { label: "BM235, BM230 Series catalog", desc: "CAT III 600V and CAT IV 300V, 6 kV transient" },
              { label: "BM235, product sheet and web page", desc: "CAT II 1kV and CAT III 600V" },
              { label: "Fluke 117", desc: "CAT III 600V, stated consistently" },
            ]}
          />
        </Figure>
        <div className="mt-4">
          <KeyIdea title="Practical meaning">
            For household panels and building wiring, both meters carry the CAT III 600V rating you need. The
            BM235&apos;s extra CAT IV 300V rating suits low-voltage service points; neither is a CAT IV 600V meter.
            Brymen protects the BM235&apos;s current inputs with 0.4 A and 11 A, 1000 V HBC fuses rated to interrupt
            30 kA and 20 kA.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Who each meter suits</h2>
        <p className="text-muted leading-7 mb-4">
          The BM235 is the better instrument for anyone who works across trades. An HVAC technician gets temperature,
          microamps for flame rectification and capacitance up to 10 mF for run and start capacitors in one meter. A
          maintenance technician on drives gets a VFD mode with a low-pass filter that reads the fundamental voltage of a
          PWM motor output, specified at ±(1.0% + 3) from 10 Hz to 100 Hz, a job where an ordinary True RMS input reads
          the switching noise too.
        </p>
        <p className="text-muted leading-7">
          The 117 is the safer purchase for a working electrician who wants the meter the inspector, the employer and the
          rental crib already recognize. Its bar graph tracks a drifting reading better than digits alone, its 9V battery
          lasts about 400 hours, and Fluke&apos;s three-year warranty is stated plainly. We have owner-tested the 117; the
          BM235 assessment here is desk research against Brymen&apos;s catalog. Our{" "}
          <Link href="/multimeters/fluke-117-review" className={link}>
            Fluke 117 review
          </Link>{" "}
          covers the Fluke in depth.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Brymen BM235 vs Fluke 117: which should you buy?</h2>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["Residential or commercial electrician", "Fluke 117", "Known brand, stated warranty, LoZ and VoltAlert cover daily wiring checks"],
            ["HVAC technician", "Brymen BM235", "Temperature, µA for flame sensors and capacitance in one meter"],
            ["Drive and motor maintenance", "Brymen BM235", "VFD mode reads the drive's fundamental voltage and frequency"],
            ["Controls and 4-20 mA loops", "Brymen BM235", "Dedicated mA ranges at 0.01 mA resolution"],
            ["Apprentice whose employer specifies Fluke", "Fluke 117", "Matches what the crew and the tool list expect"],
            ["Electronics hobbyist who also does house wiring", "Brymen BM235", "µA ranges and finer DC accuracy, plus LoZ for mains"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If the Fluke appeals but you don&apos;t need VoltAlert or LoZ, see{" "}
          <Link href="/multimeters/fluke-115-vs-fluke-117" className={link}>
            Fluke 115 vs Fluke 117
          </Link>
          . For a shortlist by trade, read our{" "}
          <Link href="/multimeters/best-multimeter-for-hvac-technicians" className={link}>
            best multimeter for HVAC technicians
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/best-multimeter-for-electricians" className={link}>
            best multimeter for electricians
          </Link>{" "}
          guides.
        </p>
      </section>

      <Callout title="Safety: a beep is not a voltage test">
        Neither the BM235&apos;s EF detection nor the 117&apos;s VoltAlert proves a conductor is dead: shielding, distance
        and DC all hide voltage from a non-contact sensor. Confirm with the test leads on a known live source before and
        after you test the circuit (live-dead-live). Keep both meters to CAT III 600V work, which covers panels and branch
        circuits; at the service entrance or meter base, use a CAT IV 600V meter or call a licensed electrician.
      </Callout>
    </>
  ),
  bottomLine:
    "Choose the Brymen BM235 if you want the most features for the money, especially a VFD mode and temperature, and you're comfortable buying the EEVblog edition with distributor support. Choose the Fluke 117 if you want a consistently documented rating, a three-year warranty and the meter employers and inspectors already trust.",
  faqs: [
    {
      question: "Do both the Brymen BM235 and Fluke 117 have LoZ and NCV?",
      answer:
        "Yes. Brymen lists AutoV LoZ and Hi/Lo EF non-contact detection for the BM235, and Fluke lists AutoVolt with a low-impedance input of about 3 kΩ plus VoltAlert for the 117. The Brymen's input impedance changes with the applied voltage, while Fluke quotes a single figure, but both are built to collapse ghost voltage on disconnected wires.",
    },
    {
      question: "What is the Brymen BM235's CAT rating?",
      answer:
        "Brymen's BM230 Series catalog and the meter's own markings give CAT III 600V and CAT IV 300V. Its BM235 product sheet and web page list CAT II 1kV and CAT III 600V instead. Either way it covers CAT III 600V household and panel work, the same as the Fluke 117, and neither is rated CAT IV 600V for service entrances.",
    },
    {
      question: "Why is the BM235 sold as an EEVblog meter?",
      answer:
        "The US Amazon listing we link is titled EEVblog Brymen BM235. It is the Brymen meter sold through that channel, which is how most US buyers get one. Support and warranty run through Brymen's distributors rather than a US service network, so check the seller, the contents and the return terms on the listing before you buy.",
    },
    {
      question: "Can the Fluke 117 measure a VFD output?",
      answer:
        "It can read the True RMS voltage, but Fluke doesn't list a VFD mode or low-pass filter for the 117, so the switching noise on a PWM drive output can inflate the reading. The BM235's VFD mode filters that out and reads the fundamental voltage and frequency, specified at ±(1.0% + 3) from 10 Hz to 100 Hz.",
    },
    {
      question: "Which meter is better for HVAC work?",
      answer:
        "The BM235, for most technicians. It reads Type-K temperature from -40 °C to 400 °C with an included bead probe, has a 600.0 µA range for flame-sensor current and measures capacitance up to 10 mF. Fluke's datasheet puts temperature and microamps on the Fluke 116, not the 117, so the 117 would need extra tools for those checks.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 117 review", href: "/multimeters/fluke-117-review" },
    { label: "Fluke 115 vs Fluke 117", href: "/multimeters/fluke-115-vs-fluke-117" },
    { label: "Fluke 117 vs Fluke 107", href: "/multimeters/fluke-117-vs-fluke-107" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
    { label: "Best multimeter for HVAC technicians", href: "/multimeters/best-multimeter-for-hvac-technicians" },
  ],
};

export default function BrymenBm235VsFluke117Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
