// Specs per Fluke, checked 2026-10-27:
// - Fluke 177 product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-177
//   (6000 counts; analog bar graph and backlight; DC V ±(0.09% + 2); AC V ±(1.0% + 3); DC A ±(1.0% + 3); AC A ±(1.5% + 3);
//   0.01 mA res; 10 A; 50 MΩ ±(0.9% + 1); 10,000 µF ±(1.2% + 2); 100 kHz ±(0.1% + 1), 0.01 Hz res; no temperature;
//   CAT III 1000 V / CAT IV 600 V; 9 V, about 200 h without backlight; 43 × 90 × 185 mm; 420 g; lifetime warranty.)
// - Fluke 179 product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-179
//   (same table plus temperature ±(1.0% + 10), 0.1 °C res, −40 °C to 400 °C; backlit display with analog bar graph;
//   in the box: 80BK temperature probe, test leads, 9 V battery, quick reference guide. Conflicts on that page: its
//   comparison table lists 9,999 µF and "−40 °C to 400 °F" and names µA as an extra function, while the spec table gives
//   10,000 µF, −40 °C to 400 °C and 0.01 mA best current resolution.)
// - 179 display count (6,000) per the Fluke 179 Pick in src/app/multimeters/best-multimeters/page.tsx (170 Series datasheet).
// Worked tolerances assume 6,000-count ranges (e.g. 6.000 V, 60.00 V, 600.0 V, 60.00 mA) and use Fluke's "best accuracy"
// lines, so they are best-case figures, not per-range guarantees.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-177-vs-fluke-179";

const all = getAllPicks("multimeters");

export const metadata = buildMetadata({
  title: "Fluke 177 vs 179: Features and Accuracy Compared",
  description:
    "Fluke 177 vs Fluke 179: identical volts, amps and ohms accuracy, so is the 179's temperature function and 80BK probe worth paying more for? Worked tolerances.",
  image: all.find((p) => p.name === "Fluke 179")!.image,
  path: "/multimeters/fluke-177-vs-fluke-179",
});

const link = "text-accent hover:underline";

/** How ±(1.0% + 10 counts) splits between its percentage part and its fixed 1.0 °C part at several readings. */
function TempToleranceDiagram() {
  const rows = [
    { t: -40, pct: 0.4 },
    { t: 25, pct: 0.25 },
    { t: 100, pct: 1.0 },
    { t: 200, pct: 2.0 },
    { t: 400, pct: 4.0 },
  ];
  const x0 = 70;
  const scale = 52; // px per °C
  return (
    <svg
      viewBox="0 0 400 210"
      className="w-full h-auto"
      role="img"
      aria-label="Stacked bars of the Fluke 179's temperature tolerance at minus 40, 25, 100, 200 and 400 degrees Celsius: a fixed 1.0 degree part from the 10 counts plus a percentage part that grows from 0.25 to 4 degrees, giving totals of 1.4, 1.25, 2.0, 3.0 and 5.0 degrees"
    >
      <text x="200" y="14" fontSize="10.5" fontWeight="700" textAnchor="middle" className="fill-foreground">
        Fluke 179 temperature tolerance, ±(1.0% + 10 counts)
      </text>
      {rows.map((r, i) => {
        const y = 28 + i * 30;
        const fixedW = 1.0 * scale * 0.9;
        const pctW = r.pct * scale * 0.9;
        return (
          <g key={r.t}>
            <text x={x0 - 8} y={y + 14} fontSize="10" textAnchor="end" className="fill-foreground">
              {r.t} °C
            </text>
            <rect x={x0} y={y} width={fixedW} height="20" rx="3" className="fill-muted/40" />
            <rect x={x0 + fixedW} y={y} width={pctW} height="20" rx="3" className="fill-accent/70" />
            <text x={x0 + fixedW + pctW + 6} y={y + 14} fontSize="9.5" className="fill-foreground">
              ±{(1 + r.pct).toFixed(2).replace(/0$/, "")} °C
            </text>
          </g>
        );
      })}
      <rect x={x0} y="186" width="12" height="10" rx="2" className="fill-muted/40" />
      <text x={x0 + 18} y="195" fontSize="9" className="fill-muted">10 counts × 0.1 °C = 1.0 °C (fixed)</text>
      <rect x="250" y="186" width="12" height="10" rx="2" className="fill-accent/70" />
      <text x="268" y="195" fontSize="9" className="fill-muted">1.0% of reading</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 177 vs Fluke 179: Features and Accuracy Compared",
  path,
  published: "2026-10-27",
  updated: "2026-10-28",
  intro:
    "The Fluke 179 is a Fluke 177 with a thermometer: Fluke publishes the same accuracy line for both meters on DC volts (±0.09% + 2), AC volts, AC and DC current, resistance, capacitance and frequency, and only the 179 adds a temperature function, −40 °C to 400 °C at ±(1.0% + 10), with an 80BK probe in the box. Same 420 g body, same CAT IV 600V / CAT III 1000V rating, same backlight, battery and lifetime warranty. Buy the 179 if you will measure temperature; otherwise the 177 gives identical electrical readings.",
  a: {
    pick: all.find((p) => p.name === "Fluke 179")!,
    imageAlt: "Fluke 179 True RMS digital multimeter, the temperature model of the 170 series",
    chooseIf: [
      "You check supply and return air, motor housings, bearings or heat sinks and want temperature in the meter you already carry",
      "You want the 80BK temperature probe included rather than bought separately",
      "You would rather own the top of the 170 series once than add a thermometer later",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 177")!,
    imageAlt: "Fluke 177 True RMS digital multimeter with backlight key and test leads",
    chooseIf: [
      "Your work is volts, amps, ohms, capacitance and frequency, and you never need a temperature reading",
      "You already carry a separate thermometer or a clamp meter with temperature",
      "You want every electrical spec of the 179 for less",
    ],
  },
  extraSpecs: [
    { label: "Temperature", a: "−40 °C to 400 °C, ±(1.0% + 10), 0.1 °C res", b: "Not available" },
    { label: "Probe in the box", a: "80BK temperature probe", b: "None (test leads only)" },
    { label: "DC volts", a: "±(0.09% + 2), 0.1 mV res, 1000 V", b: "±(0.09% + 2), 0.1 mV res, 1000 V" },
    { label: "AC volts (True RMS)", a: "±(1.0% + 3), 1000 V", b: "±(1.0% + 3), 1000 V" },
    { label: "DC / AC current", a: "±(1.0% + 3) / ±(1.5% + 3), 0.01 mA to 10 A", b: "±(1.0% + 3) / ±(1.5% + 3), 0.01 mA to 10 A" },
    { label: "Resistance", a: "±(0.9% + 1), to 50 MΩ", b: "±(0.9% + 1), to 50 MΩ" },
    { label: "Capacitance", a: "±(1.2% + 2), to 10,000 µF (9,999 µF in one Fluke table)", b: "±(1.2% + 2), to 10,000 µF" },
    { label: "Frequency", a: "±(0.1% + 1), to 100 kHz", b: "±(0.1% + 1), to 100 kHz" },
    { label: "Display", a: "6,000 counts, analog bar graph, backlight", b: "6,000 counts, analog bar graph, backlight" },
    { label: "Battery", a: "9 V, about 200 h without backlight", b: "9 V, about 200 h without backlight" },
    { label: "Size / weight", a: "43 × 90 × 185 mm, 420 g", b: "43 × 90 × 185 mm, 420 g" },
    { label: "Warranty", a: "Lifetime", b: "Lifetime" },
  ],
  differences: [
    "Only the 179 measures temperature: −40 °C to 400 °C at ±(1.0% + 10) with 0.1 °C resolution, using the 80BK probe Fluke includes.",
    "Every electrical accuracy line Fluke publishes is the same on both, including the 0.09% DC volts spec.",
    "Both share the backlit display with analog bar graph, CAT IV 600V / CAT III 1000V, the 420 g case, about 200 hours on a 9 V cell and a lifetime warranty.",
    "Fluke's 179 page contradicts itself in places: its comparison table lists 9,999 µF and a 400 °F top temperature, and names µA as a function, while its spec table gives 10,000 µF, 400 °C and 0.01 mA best current resolution. We follow the spec table.",
    "Neither has LoZ, non-contact voltage or a low-pass filter.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 177 vs 179 at a glance</h2>
        <InfoCards
          items={[
            { label: "One extra function", desc: "Temperature on the 179, −40 °C to 400 °C, with the 80BK probe included." },
            { label: "Same electrical accuracy", desc: "0.09% DC volts, 1.0% AC volts and identical amps, ohms, capacitance and frequency lines." },
            { label: "Same display", desc: "Backlit, with an analog bar graph, on both meters." },
            { label: "Same protection", desc: "CAT IV 600V and CAT III 1000V, UL, CSA and TÜV listed." },
            { label: "Same ownership", desc: "One 9 V cell, about 200 hours, and a lifetime warranty." },
            { label: "Verdict", desc: "Temperature work: 179. Purely electrical work: 177." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          OhmSavvy hasn&apos;t hands-on tested either meter, so our editorial scores (4.7 for the 179, 4.6 for the 177)
          rest on Fluke&apos;s published specifications. Everything below comes from the two Fluke product pages, and the
          tolerances are our arithmetic on Fluke&apos;s numbers, not measurements.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The two accuracy tables, line by line</h2>
        <p className="text-muted leading-7 mb-4">
          Fluke prints a short accuracy table on each 170-series page, giving the best accuracy, finest resolution and
          maximum for every function. Here are the 177 and 179 tables merged. The only row that differs is the last one.
        </p>
        <DataTable
          head={["Function", "Accuracy (both)", "Best resolution", "Maximum", "177", "179"]}
          rows={[
            ["DC volts", "±(0.09% + 2)", "0.1 mV", "1000 V", "Yes", "Yes"],
            ["AC volts, True RMS", "±(1.0% + 3)", "0.1 mV", "1000 V", "Yes", "Yes"],
            ["DC current", "±(1.0% + 3)", "0.01 mA", "10 A", "Yes", "Yes"],
            ["AC current, True RMS", "±(1.5% + 3)", "0.01 mA", "10 A", "Yes", "Yes"],
            ["Resistance", "±(0.9% + 1)", "0.1 Ω", "50 MΩ", "Yes", "Yes"],
            ["Capacitance", "±(1.2% + 2)", "1 nF", "10,000 µF", "Yes", "Yes"],
            ["Frequency", "±(0.1% + 1)", "0.01 Hz", "100 kHz", "Yes", "Yes"],
            ["Temperature", "±(1.0% + 10)", "0.1 °C", "−40 to 400 °C", "No", "Yes"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Fluke footnotes these as the best accuracy for each function, which usually means the most favorable range and
          frequency band. Individual ranges can be looser, so treat every worked figure below as the best case. The
          users manual holds the full per-range tables.
        </p>
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Best-case DC volts allowance on either meter, worked from ±(0.09% + 2) on 6,000-count ranges.</>}>
            <BarChart
              items={[
                { label: "5.000 V logic rail", value: 6.5, display: "±6.5 mV" },
                { label: "24.00 V control supply", value: 41.6, display: "±41.6 mV" },
                { label: "48.00 V battery bank", value: 63.2, display: "±63.2 mV", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>179 temperature allowance at five readings, worked from ±(1.0% + 10) at 0.1 °C resolution.</>}>
            <BarChart
              items={[
                { label: "−40 °C", value: 1.4, display: "±1.4 °C" },
                { label: "25 °C", value: 1.25, display: "±1.25 °C" },
                { label: "100 °C", value: 2.0, display: "±2.0 °C" },
                { label: "200 °C", value: 3.0, display: "±3.0 °C" },
                { label: "400 °C", value: 5.0, display: "±5.0 °C", highlight: true },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Worked tolerances for everyday readings</h2>
        <p className="text-muted leading-7 mb-4">
          A spec of ±(a% + n) means a percent of the displayed value plus n steps of the last digit. On a 6,000-count
          meter the step depends on the range: 0.001 V on 6 V, 0.01 V on 60 V, 0.1 V on 600 V. The table below works
          that out for readings an electrician or technician takes every week. Because the tables match, each row holds
          for the 177 and the 179 alike.
        </p>
        <DataTable
          head={["Reading", "Spec", "% part", "Count part", "Allowance"]}
          rows={[
            ["5.000 V DC", "0.09% + 2", "4.5 mV", "2 mV", "±6.5 mV"],
            ["24.00 V DC", "0.09% + 2", "21.6 mV", "20 mV", "±41.6 mV"],
            ["120.0 V AC", "1.0% + 3", "1.2 V", "0.3 V", "±1.5 V"],
            ["480.0 V AC", "1.0% + 3", "4.8 V", "0.3 V", "±5.1 V"],
            ["20.00 mA DC loop", "1.0% + 3", "0.20 mA", "0.03 mA", "±0.23 mA"],
            ["60.00 Hz", "0.1% + 1", "0.06 Hz", "0.01 Hz", "±0.07 Hz"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Two things stand out. At low readings the count part can be as large as the percentage part: on 24 V, the
          two counts (20 mV) nearly equal 0.09% of the reading (21.6 mV). And AC volts are about ten times looser than
          DC on both meters, so a 120 V receptacle that reads anywhere from 118.5 V to 121.5 V on the display is inside
          the published tolerance if the true value is 120.0 V. For a 4–20 mA loop the ±0.23 mA allowance at full scale
          is just under 1.5% of the 16 mA span, which is fine for finding a dead transmitter but not for calibrating
          one. Our guide to{" "}
          <Link href="/multimeters/how-to-measure-milliamps-with-a-multimeter" className={link}>
            measuring milliamps
          </Link>{" "}
          covers the series connection.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">How the 179&apos;s temperature spec behaves</h2>
        <p className="text-muted leading-7 mb-4">
          The temperature line, ±(1.0% + 10), has a large count term. At 0.1 °C resolution, ten counts are a fixed
          1.0 °C, so near room temperature that fixed part is most of the allowance, and only at a few hundred degrees
          does the percentage part take over.
        </p>
        <Figure caption={<>Gray is the fixed 1.0 °C from ten counts; color is 1.0% of the reading. Meter only; probe error adds on top.</>}>
          <TempToleranceDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          These are the meter&apos;s figures alone. Any thermocouple probe has its own tolerance, and the reading you see
          includes both, so the real uncertainty is wider than the bars. In practice that means the 179 is right for
          trend and difference work: supply versus return air, a bearing that runs warmer than its twin, a heat sink
          climbing under load. For a temperature you must certify to a fraction of a degree, use a dedicated
          thermometer. To check that a probe itself is sound, see{" "}
          <Link href="/multimeters/how-to-check-a-thermocouple-with-a-multimeter" className={link}>
            how to check a thermocouple with a multimeter
          </Link>
          .
        </p>
        <KeyIdea title="A difference reading cancels some of the error">
          When you measure supply air and return air with the same meter and probe a minute apart, a fixed offset in the
          probe tends to appear in both readings and largely cancels in the difference. That makes the 179 more useful for
          a temperature split than its absolute ±(1.0% + 10) figure suggests. It doesn&apos;t cancel the percentage part,
          which differs slightly between the two readings, and it assumes the probe settles fully each time.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where Fluke&apos;s 179 page disagrees with itself</h2>
        <p className="text-muted leading-7 mb-4">
          The comparison table further down Fluke&apos;s 179 page doesn&apos;t match its own spec table in three places.
          The spec table is more detailed and agrees with the 177 page, so we use it throughout.
        </p>
        <DataTable
          head={["Item", "179 spec table", "179 comparison table"]}
          rows={[
            ["Capacitance maximum", "10,000 µF", "9,999 µF"],
            ["Temperature top end", "400 °C", "400 °F (with −40 °C at the low end)"],
            ["Small current", "0.01 mA best resolution", "Lists µA as an extra function"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The current row matters most. If the 179&apos;s finest step is 0.01 mA (10 µA), it can&apos;t resolve a furnace
          flame-sensor signal of a few microamps, whatever the comparison table says. For that check, look at the Fluke
          116 or 87V, discussed in our{" "}
          <Link href="/multimeters/fluke-87v-vs-fluke-179" className={link}>
            Fluke 87V vs 179
          </Link>{" "}
          comparison.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which features justify paying more for the 179?</h2>
        <p className="text-muted leading-7 mb-4">
          Upgrades usually bundle several improvements, so buyers assume the dearer model is better across the board.
          This pair breaks that habit. Go through everything a buyer might hope the step up delivers, and only two
          lines change: the temperature function itself and the 80BK probe that ships with it. Every other item on the
          list is either identical on the 177 or missing from both meters.
        </p>
        <DataTable
          head={["What you might expect from the step up", "Fluke 179 vs 177", "Does it justify the extra?"]}
          rows={[
            ["Temperature, −40 °C to 400 °C", "179 only, ±(1.0% + 10)", "Yes, if you take temperatures"],
            ["A thermocouple probe in the box", "179 only, 80BK", "Yes; it saves buying one"],
            ["Tighter DC or AC volts accuracy", "Same ±(0.09% + 2) and ±(1.0% + 3)", "No"],
            ["Finer current for flame sensors", "Same 0.01 mA best resolution", "No; neither resolves a few µA"],
            ["Higher safety rating", "Same CAT IV 600V / CAT III 1000V", "No"],
            ["Better display or backlight", "Same 6,000 counts, bar graph, backlight", "No"],
            ["Longer battery life or warranty", "Same 200 h on a 9 V; lifetime on both", "No"],
            ["LoZ or non-contact voltage", "Missing on both", "No"],
          ]}
        />
        <div className="mt-6">
          <Figure caption={<>Functions in Fluke&apos;s 170-series accuracy table (eight rows): how many carry an identical spec on both meters, and how many differ.</>}>
            <BarChart
              items={[
                { label: "Identical on 177 and 179", value: 7, display: "7 functions" },
                { label: "Only on the 179", value: 1, display: "1 (temperature)", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          That makes the value test unusually simple. Count how often a temperature reading would save you fetching
          another instrument. If it is part of most service calls, as on HVAC, motor and bearing checks, the 179 pays
          for itself in time and in the probe you don&apos;t have to buy separately. If you can&apos;t name a job in the
          last month where you needed one, the extra spend buys a dial position that will sit unused, and the 177 is
          the better value. Nothing about the 179 makes your volts or amps readings more trustworthy.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which jobs need the 179&apos;s extra function</h2>
        <p className="text-muted leading-7 mb-4">
          Because the electrical specs are identical, the right question is how often you&apos;d reach for a temperature
          reading. If the answer is weekly, carrying the 179 saves a second instrument. If it is never, the 177 is the
          same meter for less.
        </p>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["HVAC technician", "Fluke 179", "Temperature splits and motor checks in the same meter as volts and capacitance"],
            ["Industrial maintenance technician", "Fluke 179", "Bearing, motor-frame and enclosure temperatures alongside electrical readings"],
            ["Residential electrician", "Fluke 177", "Temperature rarely needed; identical volts, amps and CAT IV rating"],
            ["Electronics repair at a bench", "Fluke 179, or 177", "The 179 spots hot components; the 177 if you own a thermal tool already"],
            ["Solar or battery installer", "Fluke 177", "1000 V DC and 0.09% DC on both; temperature is a nice-to-have"],
            ["Owner of a clamp meter with temperature", "Fluke 177", "No reason to pay twice for the same function"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If neither temperature nor the tight DC spec appeals, step down: the{" "}
          <Link href="/multimeters/fluke-175-vs-fluke-177" className={link}>
            Fluke 175 vs 177
          </Link>{" "}
          comparison covers the cheapest 170-series meter. If your work is mostly building wiring, the{" "}
          <Link href="/multimeters/fluke-177-vs-fluke-117" className={link}>
            Fluke 177 vs 117
          </Link>{" "}
          page weighs LoZ and VoltAlert against the 170 series. HVAC buyers should also read our{" "}
          <Link href="/multimeters/best-multimeter-for-hvac-technicians" className={link}>
            best multimeter for HVAC technicians
          </Link>{" "}
          guide.
        </p>
      </section>

      <Callout title="Safety: keep the thermocouple off live parts">
        A thermocouple probe plugs into the same input jacks as the test leads, so treat it as part of the measuring
        circuit. Don&apos;t touch a bare probe tip to anything energized, and remove the probe before switching the
        179 back to volts. Respect the meter&apos;s CAT IV 600V / CAT III 1000V limits and the lower rating of any lead
        or probe in use. On hot surfaces, check the probe&apos;s own temperature rating first; a probe can be rated
        well below the meter&apos;s 400 °C. When mains equipment is involved and you&apos;re unsure, call a qualified
        technician.
      </Callout>
    </>
  ),
  bottomLine:
    "The Fluke 177 and 179 share every published electrical accuracy figure, the same backlit display, CAT IV 600V / CAT III 1000V rating, 420 g body, battery life and lifetime warranty. The 179 adds one thing: temperature from −40 °C to 400 °C at ±(1.0% + 10), with an 80BK probe in the box. Buy the 179 for HVAC, motor and maintenance work where temperature comes up; buy the 177 if your readings are purely electrical.",
  faqs: [
    {
      question: "What is the difference between the Fluke 177 and 179?",
      answer:
        "Temperature. The 179 reads −40 °C to 400 °C at ±(1.0% + 10) with 0.1 °C resolution and comes with an 80BK probe. Otherwise Fluke publishes the same accuracy for both meters on DC and AC volts, current, resistance, capacitance and frequency, and they share the same backlit display, CAT IV 600V rating and lifetime warranty.",
    },
    {
      question: "Is the Fluke 179 more accurate than the 177?",
      answer:
        "No. Fluke's product pages list identical best accuracies: ±(0.09% + 2) on DC volts, ±(1.0% + 3) on AC volts, ±(1.0% + 3) and ±(1.5% + 3) on DC and AC current, ±(0.9% + 1) on resistance, ±(1.2% + 2) on capacitance and ±(0.1% + 1) on frequency. The 179 only adds a temperature line.",
    },
    {
      question: "Does the Fluke 179 come with a temperature probe?",
      answer:
        "Yes. Fluke lists the 80BK temperature probe in the 179's box, along with test leads, an installed 9 V battery and a quick reference guide. Fluke's 179 page doesn't state the probe's own rating, so check its markings before measuring hot surfaces; a probe can be rated lower than the meter's 400 °C ceiling.",
    },
    {
      question: "Can the Fluke 179 measure microamps for a flame sensor?",
      answer:
        "Not usefully, by the spec table. Fluke gives 0.01 mA (10 µA) as the best current resolution, while flame-sensor signals are typically a few microamps. The 179 page's comparison table does list µA, which conflicts, so we follow the more detailed spec table. For flame sensors, use a meter with a 0.1 µA range such as the Fluke 116 or 87V.",
    },
    {
      question: "How accurate is the Fluke 179 at room temperature?",
      answer:
        "About ±1.25 °C at 25 °C from the meter alone, worked from Fluke's ±(1.0% + 10) spec: 1% of 25 °C is 0.25 °C, and ten counts at 0.1 °C add 1.0 °C. The probe's own tolerance adds to that. At 200 °C the meter allowance grows to ±3.0 °C, and at 400 °C to ±5.0 °C.",
    },
    {
      question: "Is the Fluke 179 worth paying more for than the 177?",
      answer:
        "Only if you will use temperature. The extra money buys one function, −40 °C to 400 °C at ±(1.0% + 10), plus an 80BK probe in the box. It does not buy better electrical accuracy, a higher safety rating, a longer warranty or finer current resolution, because Fluke lists those identically for both meters. Without temperature work, the 177 is the better value.",
    },
    {
      question: "Should an HVAC technician buy the 177 or the 179?",
      answer:
        "The 179, in most cases. HVAC work involves temperature splits, motor checks and capacitor tests, and the 179 handles all three with the probe included, at the same electrical accuracy as the 177. Pick the 177 only if you already carry a clamp meter or thermometer that covers temperature and want to avoid paying for it twice.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 175 vs Fluke 177", href: "/multimeters/fluke-175-vs-fluke-177" },
    { label: "Fluke 177 vs Fluke 117", href: "/multimeters/fluke-177-vs-fluke-117" },
    { label: "Fluke 117 vs Fluke 179", href: "/multimeters/fluke-117-vs-fluke-179" },
    { label: "Fluke 87V vs Fluke 179", href: "/multimeters/fluke-87v-vs-fluke-179" },
    { label: "Fluke 17B+ vs Fluke 179", href: "/multimeters/fluke-17b-plus-vs-fluke-179" },
    { label: "Best multimeter for HVAC technicians", href: "/multimeters/best-multimeter-for-hvac-technicians" },
  ],
};

export default function Fluke177VsFluke179Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
