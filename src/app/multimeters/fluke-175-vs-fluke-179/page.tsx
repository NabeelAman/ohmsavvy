// Specs per Fluke, as already cited in this repo (no new sources added on this page):
// - Fluke 175: the Fluke 175 Pick in src/lib/multimeter-catalog.ts ("Specs per fluke.com (Fluke 175 product/spec page)
//   and the official Amazon listing (B00012Z0UM)") and the spec comment on /multimeters/fluke-175-vs-fluke-177
//   (fluke.com 175 page, checked 2026-10-27): True RMS AC V and AC A; DC V ±(0.15% + 2); AC V ±(1.0% + 3);
//   DC A ±(1.0% + 3); AC A ±(1.5% + 3); 0.01 mA res; 10 A; 50 MΩ ±(0.9% + 1); 1 nF to 10,000 µF ±(1.2% + 2);
//   100 kHz ±(0.1% + 1); Hold, Auto Hold, Min/Max-average; CAT III 1000 V / CAT IV 600 V; 9 V, about 200 h
//   "without backlight"; 43 × 90 × 185 mm; 420 g; lifetime warranty.
// - Fluke 170 Series detailed specifications (Fluke Pub 10824-eng, via farnell.com/datasheets/2631819.pdf): the
//   backlight is on the 177 and 179 only; the 175 shares the 6,000-count display with 33-segment bar graph.
// - Fluke 177 (middle rung, mentioned only): same table except DC V ±(0.09% + 2), 6,000 counts, backlight
//   (per /multimeters/fluke-175-vs-fluke-177).
// - Fluke 179: the Fluke 179 Pick in src/app/multimeters/best-multimeters/page.tsx ("Specs per fluke.com (Fluke 179
//   product page) and the Fluke 170 Series datasheet") and the spec comment on /multimeters/fluke-177-vs-fluke-179
//   (fluke.com 179 page, checked 2026-10-27): the 177's table plus temperature ±(1.0% + 10), 0.1 °C res, −40 °C to
//   400 °C; 6,000-count backlit display with analog bar graph; 80BK probe in the box; best current resolution 0.01 mA
//   (no µA range). Conflicts on Fluke's 179 page: comparison table says 9,999 µF, "400 °F" and lists µA.
// - 80BK probe range: /multimeters/fluke-87v-vs-fluke-179 gives −40 °C to 260 °C; /multimeters/fluke-177-vs-fluke-179
//   says Fluke's 179 page doesn't state it. Both positions are reported on the page.
// Worked figures use only the percentage-of-reading term: both meters share 6,000 counts and the same +2 count term,
// so the percentage term is the whole difference. They are best-case figures from Fluke's "best accuracy" lines.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-175-vs-fluke-179";

export const metadata = buildMetadata({
  title: "Fluke 175 vs Fluke 179: Is the Upgrade Worth It?",
  description:
    "Fluke 175 vs 179 differences: the 179 adds temperature with an 80BK probe, a backlight and 0.09% DC volts. What each extra buys, and who can skip it.",
  path: "/multimeters/fluke-175-vs-fluke-179",
});

const all = getAllPicks("multimeters");
const link = "text-accent hover:underline";

/** The 170-series ladder: what each step up adds, so a 175 owner can see the 177 is a possible stopping point. */
function UpgradeLadderDiagram() {
  const rungs = [
    { x: 14, y: 120, name: "Fluke 175", tier: "Entry rung", add: ["True RMS, 1000 V, 10 A", "CAT IV 600V, lifetime"] },
    { x: 140, y: 74, name: "Fluke 177", tier: "Middle rung", add: ["+ backlit display", "+ 0.09% DC volts"] },
    { x: 266, y: 28, name: "Fluke 179", tier: "Top rung", add: ["+ temperature, −40 to 400 °C", "+ 80BK probe in the box"] },
  ];
  return (
    <svg
      viewBox="0 0 400 200"
      className="w-full h-auto"
      role="img"
      aria-label="Staircase diagram of the Fluke 170 series: the 175 is the entry step with True RMS, 1000 volts, 10 amps, CAT IV 600V and a lifetime warranty; the 177 step adds a backlit display and 0.09 percent DC volts accuracy; the 179 step adds temperature from minus 40 to 400 degrees Celsius with an 80BK probe"
    >
      {rungs.map((r, i) => (
        <g key={r.name}>
          <rect
            x={r.x}
            y={r.y}
            width="120"
            height={200 - r.y - 14}
            rx="6"
            className={i === 2 ? "fill-accent/15 stroke-accent" : "fill-surface stroke-border"}
            strokeWidth="1.2"
          />
          <text x={r.x + 60} y={r.y + 17} fontSize="11" fontWeight="700" textAnchor="middle" className={i === 2 ? "fill-accent" : "fill-foreground"}>
            {r.name}
          </text>
          <text x={r.x + 60} y={r.y + 31} fontSize="8.5" textAnchor="middle" className="fill-muted">
            {r.tier}
          </text>
          {r.add.map((line, k) => (
            <text key={line} x={r.x + 60} y={r.y + 49 + k * 14} fontSize="8.5" textAnchor="middle" className="fill-foreground">
              {line}
            </text>
          ))}
        </g>
      ))}
      <text x="200" y="198" fontSize="8.5" textAnchor="middle" className="fill-muted">
        Same 420 g case, same 9 V cell and same safety ratings on every step
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 175 vs Fluke 179: Is the Upgrade Worth It?",
  path,
  published: "2026-10-28",
  intro:
    "The upgrade from a Fluke 175 to a Fluke 179 is worth it if you measure temperature, because that is the one function the 179 adds that the 175 cannot do at all, and the 80BK probe comes in the box. The other two gains, a backlit display and DC volts accuracy of ±(0.09% + 2) instead of ±(0.15% + 2), are also available one step down on the Fluke 177. Everything else on Fluke's two spec sheets is the same: True RMS AC volts and amps, 1000 V, 10 A, 50 MΩ, 10,000 µF, 100 kHz, CAT IV 600V, the 420 g case and a lifetime warranty. If you never need a temperature reading, the 179 mostly buys convenience.",
  a: {
    pick: all.find((p) => p.name === "Fluke 179")!,
    imageAlt: "Fluke 179 True RMS multimeter, the temperature-capable top model of the Fluke 170 series",
    chooseIf: [
      "You take supply-air, pipe, motor-frame or heat-sink temperatures often enough that a second instrument is a nuisance",
      "You want the backlight and the tighter DC spec as well, in one purchase",
      "You buy a meter to keep for decades and would rather not wish later that it read temperature",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 175")!,
    imageAlt: "Fluke 175 True RMS multimeter with test leads, front panel without a backlight key",
    chooseIf: [
      "Your work is volts, amps, ohms, capacitance and frequency, never temperature",
      "You already own a thermometer, an IR gun or a clamp meter with a thermocouple input",
      "You read the meter in good light and 0.15% DC accuracy already exceeds what your jobs ask for",
    ],
  },
  extraSpecs: [
    { label: "Temperature", a: "−40 °C to 400 °C, ±(1.0% + 10), 0.1 °C res", b: "None" },
    { label: "Temperature probe", a: "80BK included", b: "None" },
    { label: "Backlight", a: "Yes", b: "No (177 and 179 only)" },
    { label: "Display count", a: "6,000, analog bar graph", b: "6,000, 33-segment bar graph" },
    { label: "DC volts", a: "±(0.09% + 2), 1000 V", b: "±(0.15% + 2), 1000 V" },
    { label: "AC volts, True RMS", a: "±(1.0% + 3), 1000 V", b: "±(1.0% + 3), 1000 V" },
    { label: "Current", a: "0.01 mA res to 10 A; no µA range", b: "0.01 mA res to 10 A; no µA range" },
    { label: "Resistance / capacitance", a: "50 MΩ / 10,000 µF", b: "50 MΩ / 10,000 µF" },
    { label: "Frequency", a: "±(0.1% + 1), 100 kHz", b: "±(0.1% + 1), 100 kHz" },
    { label: "Recording", a: "Hold, Auto Hold, Min/Max-average", b: "Hold, Auto Hold, Min/Max-average" },
    { label: "Battery", a: "9 V, about 200 h without backlight", b: "9 V, about 200 h" },
    { label: "Size / weight", a: "43 × 90 × 185 mm, 420 g", b: "43 × 90 × 185 mm, 420 g" },
    { label: "Warranty", a: "Lifetime", b: "Lifetime" },
  ],
  differences: [
    "Temperature is the only new function: the 179 reads −40 °C to 400 °C at ±(1.0% + 10) with 0.1 °C resolution, and Fluke packs the 80BK probe with it. The 175 has no thermocouple input.",
    "The 179 has a backlit display. Fluke's 175 page never mentions a backlight, and the 175's Amazon listing photo shows no backlight key.",
    "DC volts: ±(0.09% + 2) on the 179 against ±(0.15% + 2) on the 175, a percentage term 40% smaller.",
    "Display: both read to 6,000 counts with a 33-segment bar graph, but only the 179 is backlit (per Fluke's 170 Series specifications).",
    "Identical on both: True RMS AC, every current, resistance, capacitance and frequency line, CAT III 1000V / CAT IV 600V, size, weight, battery and lifetime warranty. Neither has a µA range; both stop at 0.01 mA.",
    "Fluke's 179 page has internal conflicts (9,999 µF, 400 °F and a µA entry in its comparison table). We follow its spec table, which matches the 175 and 177 pages.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">What the extra money actually buys</h2>
        <p className="text-muted leading-7 mb-4">
          An upgrade is only worth paying for if you will use what it adds. Going from the 175 to the 179 adds three
          things and changes nothing else, so the useful question is how often each one would come up in your week.
          The table below sets out each addition, the kind of buyer it helps and the kind who would never notice it.
        </p>
        <DataTable
          head={["What the 179 adds", "Helps most", "Easy to skip if…"]}
          rows={[
            ["Temperature, −40 to 400 °C, 80BK probe", "HVAC, motor and maintenance techs", "You own a thermometer or never check heat"],
            ["Backlit display", "Panels, attics, crawlspaces, footwells", "You work at a lit bench or outdoors by day"],
            ["0.09% DC volts (vs 0.15%)", "Checking regulated supplies to a tolerance", "Your DC work is batteries and controls"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The 179 is also OhmSavvy&apos;s higher-rated meter of the two (4.7 against 4.5), but neither has been hands-on
          tested by us; both scores come from desk research against Fluke&apos;s published specifications, and the
          worked numbers on this page are arithmetic on those specs, not measurements.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The 170-series ladder: stop at the rung you need</h2>
        <p className="text-muted leading-7 mb-4">
          Fluke builds the 175, 177 and 179 on one platform, and each model is the one below it plus something. That
          makes the decision a ladder rather than a head-to-head. In price terms the 175 is the entry rung, the 177 sits
          in the middle and the 179 is the top; we don&apos;t quote figures because they change weekly.
        </p>
        <Figure caption={<>Each step keeps everything below it. The middle rung already carries two of the three upgrades.</>}>
          <UpgradeLadderDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The practical consequence: if the backlight or the DC spec is what draws you away from the 175, the 177 delivers
          both, and the jump to the 179 is then purely about temperature. Our{" "}
          <Link href="/multimeters/fluke-175-vs-fluke-177" className={link}>
            Fluke 175 vs 177
          </Link>{" "}
          page covers that first step in detail, and{" "}
          <Link href="/multimeters/fluke-177-vs-fluke-179" className={link}>
            Fluke 177 vs 179
          </Link>{" "}
          covers the second. Skipping straight from the 175 to the 179 only makes sense when you know you want the
          thermometer.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 175 vs 179 differences in DC accuracy</h2>
        <p className="text-muted leading-7 mb-4">
          Both meters quote DC volts as a percentage of the reading plus two counts, on the same 6,000-count display.
          With the count term identical, the whole difference sits in the percentage term. Here it is for readings that span low-voltage electronics to a high-voltage DC string:
        </p>
        <DataTable
          head={["DC reading", "175: 0.15% of reading", "179: 0.09% of reading", "179 tighter by"]}
          rows={[
            ["3.3 V logic supply", "±4.95 mV", "±2.97 mV", "1.98 mV"],
            ["13.8 V float charger", "±20.7 mV", "±12.4 mV", "8.3 mV"],
            ["120 V DC bus", "±0.18 V", "±0.11 V", "0.07 V"],
            ["600 V DC solar string", "±0.90 V", "±0.54 V", "0.36 V"],
          ]}
        />
        <div className="mt-6">
          <Figure caption={<>Percentage term on a 13.8 V reading, in millivolts. Both meters add two counts on top.</>}>
            <BarChart
              items={[
                { label: "Fluke 175", value: 20.7, display: "±20.7 mV" },
                { label: "Fluke 179", value: 12.42, display: "±12.4 mV", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Read the gap against the job. A 13.8 V float charger that should sit between, say, 13.5 V and 14.1 V gives
          you hundreds of millivolts of margin, so the 8 mV difference between the two meters is irrelevant. It starts to
          count when the thing you are checking has its own tight limit, such as a 3.3 V rail specified to ±1%
          (±33 mV), where the meter should be several times better than the limit. Both meters pass that test; the 179
          simply passes it with more room. For the reasoning behind that rule of thumb, see{" "}
          <Link href="/multimeters/multimeter-accuracy-for-electronics-repair" className={link}>
            multimeter accuracy for electronics repair
          </Link>
          . The 3.3 V and 13.8 V limits here are illustrative examples, not specifications for any particular product.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Temperature: the only upgrade the 177 can&apos;t give you</h2>
        <p className="text-muted leading-7 mb-4">
          The 179&apos;s thermocouple function reads from −40 °C to 400 °C at ±(1.0% + 10). At 0.1 °C resolution the ten
          counts are a fixed 1.0 °C, so at typical HVAC and maintenance temperatures the allowance is a little over one
          degree from the meter alone:
        </p>
        <DataTable
          head={["Illustrative reading", "1.0% part", "10-count part", "Meter allowance"]}
          rows={[
            ["13 °C supply air", "0.13 °C", "1.0 °C", "±1.13 °C"],
            ["24 °C return air", "0.24 °C", "1.0 °C", "±1.24 °C"],
            ["65 °C motor frame", "0.65 °C", "1.0 °C", "±1.65 °C"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The probe adds its own error on top, and our pages disagree on its limit: the{" "}
          <Link href="/multimeters/fluke-87v-vs-fluke-179" className={link}>
            Fluke 87V vs 179
          </Link>{" "}
          comparison lists the 80BK as covering −40 °C to 260 °C, while our 177 vs 179 page notes that Fluke&apos;s 179
          page doesn&apos;t state the probe rating. Either way, read the markings on your probe before you press it
          against anything near the meter&apos;s 400 °C ceiling.
        </p>
        <KeyIdea title="Who doesn't need the thermometer">
          If you already carry an IR thermometer for quick surface checks, a clamp meter with a thermocouple input, or a
          dedicated digital thermometer for refrigerant-line work, the 179&apos;s temperature function duplicates a tool
          you own. For those buyers the honest upgrade from a 175 is the 177, or no upgrade at all. The 179 earns its
          place when temperature is frequent enough that carrying one meter instead of two saves time on every call.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Backlight and battery: the daily-use difference</h2>
        <p className="text-muted leading-7 mb-4">
          The backlight is the upgrade you notice on day one and every day after. A 175 owner reading a meter inside an
          unlit service panel holds a flashlight in one hand and a probe in the other; a 179 owner presses a key. Fluke
          gives the same battery note for both meters, about 200 hours from one 9 V cell, and qualifies the figure as
          &quot;without backlight&quot; even on the 175&apos;s page. Fluke doesn&apos;t say how much a lit display costs
          in hours, so if you leave the 179&apos;s light on, expect to replace the cell sooner than the headline figure
          suggests.
        </p>
        <p className="text-muted leading-7">
          The display itself is not an upgrade. Fluke&apos;s 170 Series specifications give all three models the same
          6,000-count readout with a 33-segment bar graph and 0.1 mV best DC resolution; the backlight is the only
          display difference, and it comes with the 177 and 179.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What the 179 still won&apos;t do</h2>
        <p className="text-muted leading-7 mb-4">
          Paying for the top of the 170 series doesn&apos;t buy every feature. These gaps are shared by the 175 and the
          179, so stepping up won&apos;t fix them:
        </p>
        <ul className="space-y-3 text-muted leading-7">
          <li>
            <span className="text-foreground font-medium">No microamp range.</span> Both stop at 0.01 mA (10 µA), too
            coarse for a furnace flame sensor running a few microamps. Fluke&apos;s 179 comparison table lists µA, but
            the spec table doesn&apos;t, and we follow the spec table.
          </li>
          <li>
            <span className="text-foreground font-medium">No LoZ or non-contact voltage.</span> For ghost-voltage
            checks and a built-in tester, see{" "}
            <Link href="/multimeters/fluke-117-vs-fluke-179" className={link}>
              Fluke 117 vs 179
            </Link>
            .
          </li>
          <li>
            <span className="text-foreground font-medium">No drive filter or peak capture.</span> Fluke lists neither,
            which is why VFD work points to the 87V.
          </li>
          <li>
            <span className="text-foreground font-medium">No automotive modes.</span> Neither lists duty cycle, RPM or
            pulse width; our{" "}
            <Link href="/multimeters/fluke-88v-vs-fluke-179" className={link}>
              Fluke 88V vs 179
            </Link>{" "}
            page covers what a vehicle-focused Fluke adds.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Your situation", "Best rung", "Reason"]}
          rows={[
            ["HVAC service and installs", "Fluke 179", "Temperature splits and probe included"],
            ["Plant maintenance with motor checks", "Fluke 179", "Bearing and frame temperatures in the same meter"],
            ["Electrician working dim panels", "Fluke 177", "Backlight without paying for a thermometer"],
            ["Bench electronics, good light", "Fluke 175", "0.15% DC is ample; nothing else changes"],
            ["Owner of a clamp meter with temperature", "Fluke 175 or 177", "Don't buy temperature twice"],
            ["Checking supplies against tight limits", "Fluke 177 or 179", "0.09% DC leaves more margin"],
            ["Flame-sensor microamps", "Neither", "No µA range on any 170-series model"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For the meters these two compete with across brands, see our{" "}
          <Link href="/multimeters/best-multimeters" className={link}>
            best multimeters
          </Link>{" "}
          roundup, and HVAC buyers should also read the{" "}
          <Link href="/multimeters/best-multimeter-for-hvac-technicians" className={link}>
            best multimeter for HVAC technicians
          </Link>{" "}
          guide.
        </p>
      </section>

      <Callout title="Safety: the upgrade doesn't change the rating">
        The 175 and 179 carry the same CAT IV 600V / CAT III 1000V rating, so stepping up adds no protection. Pair
        either meter with leads rated for the circuit, keep the thermocouple probe away from energized conductors, and
        unplug it before switching back to a voltage function. Verify the meter on a known live source before and after
        proving a circuit dead, and hand service-entrance work to a licensed electrician unless it is your trade.
      </Callout>
    </>
  ),
  bottomLine:
    "The Fluke 179 is worth the upgrade from the 175 if you will use its temperature function: it is the only addition you can't get from the cheaper 177, and the 80BK probe is included. If you only want the backlight or the tighter 0.09% DC spec, the 177 gives you both for less. If you work in good light and never measure temperature, the 175 reads every electrical quantity the 179 does, with the same CAT IV 600V rating and lifetime warranty.",
  faqs: [
    {
      question: "What are the Fluke 175 vs 179 differences?",
      answer:
        "Per Fluke's spec pages, the 179 adds three things: a temperature function from −40 °C to 400 °C with an 80BK probe included, a backlit display, and DC volts accuracy of ±(0.09% + 2) against the 175's ±(0.15% + 2). Fluke also states 6,000 counts for the 179 but no count for the 175. Every other published spec, including safety ratings and warranty, matches.",
    },
    {
      question: "Is the Fluke 179 worth it over the 175?",
      answer:
        "It is if you take temperature readings regularly, because that is the one function the 179 adds that the cheaper Fluke 177 lacks. If you want only a backlight or tighter DC accuracy, the 177 covers both for less. If neither matters and you work in good light, the 175 does the same electrical measurements as the 179.",
    },
    {
      question: "Is the Fluke 179 more accurate than the 175?",
      answer:
        "On DC volts only. Fluke lists ±(0.09% + 2) for the 179 and ±(0.15% + 2) for the 175, so on a 13.8 V reading the percentage term is about ±12 mV against ±21 mV. AC volts, AC and DC current, resistance, capacitance and frequency carry identical accuracy lines on both meters.",
    },
    {
      question: "Can you add temperature to a Fluke 175?",
      answer:
        "No. Fluke lists no thermocouple function for the 175, so plugging a probe into it won't give a temperature reading. Your options are a separate thermometer, a clamp meter with a temperature input, or a meter that has the function built in, such as the 179, which ships with the 80BK probe.",
    },
    {
      question: "Do the Fluke 175 and 179 have the same battery life?",
      answer:
        "Fluke quotes about 200 hours from one 9 V alkaline cell for both and qualifies the figure as without backlight. The 175 has no backlight listed, so its figure is what you get; on the 179, using the backlight will shorten it by an amount Fluke doesn't state. Both are the same 420 g, 43 × 90 × 185 mm case.",
    },
    {
      question: "Can the Fluke 175 or 179 test a flame sensor?",
      answer:
        "Not reliably. Both list 0.01 mA (10 µA) as their finest current step and have no microamp range in Fluke's spec tables, while flame-sensor currents are typically a few microamps. Fluke's 179 comparison table does mention µA, which conflicts with its spec table. For flame sensors, choose a meter with a 0.1 µA range.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 175 vs Fluke 177", href: "/multimeters/fluke-175-vs-fluke-177" },
    { label: "Fluke 177 vs Fluke 179", href: "/multimeters/fluke-177-vs-fluke-179" },
    { label: "Fluke 117 vs Fluke 179", href: "/multimeters/fluke-117-vs-fluke-179" },
    { label: "Fluke 87V vs Fluke 179", href: "/multimeters/fluke-87v-vs-fluke-179" },
    { label: "Fluke 88V vs Fluke 179", href: "/multimeters/fluke-88v-vs-fluke-179" },
    { label: "Best multimeter for HVAC technicians", href: "/multimeters/best-multimeter-for-hvac-technicians" },
  ],
};

export default function Fluke175VsFluke179Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
