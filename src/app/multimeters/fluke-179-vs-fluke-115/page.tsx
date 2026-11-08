// Fluke 179 per https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-179 (spec tab) and the
// Fluke 170 Series detailed specifications (Pub 10824-eng), as cited on /multimeters/fluke-116-vs-fluke-179,
// /multimeters/fluke-87v-vs-fluke-179 and /multimeters/fluke-177-vs-fluke-179 (checked 2026-10-26/29): True RMS;
// DC V ±(0.09% + 2); AC V ±(1.0% + 3); DC A ±(1.0% + 3), AC A ±(1.5% + 3); ranges 60.00 mA (0.01 mA), 400.0 mA, 6.000 A,
// 10.00 A (20 A for 30 s); no µA range; 50 MΩ; capacitance ±(1.2% + 2) to 10,000 µF; frequency to 100 kHz at
// ±(0.1% + 1); temperature -40 to 400 °C, ±(1.0% + 10), 0.1 °C, 80BK probe in the box; 6,000 counts + 33-segment bar
// graph, backlight; no LoZ; Hold, Auto Hold, Min/Max-average; CAT III 1000 V / CAT IV 600 V; one 9 V, about 200 h;
// 43 × 90 × 185 mm; 420 g; lifetime warranty. Conflict on Fluke's 179 page: its comparison table lists µA, 9,999 µF and
// "400 °F", while its spec table gives 0.01 mA best current resolution, 10,000 µF and 400 °C; we follow the spec table.
// Amazon B00012Z0V6 "Only 2 left in stock", add-to-cart present at ZIP 10001 (checked 2026-11-08).
// Fluke 115 per https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-115 and the
// 114/115/116/117 datasheet (2793260b, 08/2020), as cited on /multimeters/fluke-15b-plus-vs-fluke-115: True RMS;
// CAT III 600V; 6,000 counts + 33-segment bar graph; backlight; DC V ±(0.5% + 2); AC V ±(1.0% + 3), 45-500 Hz;
// 6.000 A and 10.00 A only, DC ±(1.0% + 3), AC ±(1.5% + 3), 1 mA best resolution; 40 MΩ; 1 nF to 9,999 µF; frequency to
// 50 kHz; Min/Max/Avg; no temperature (116 only); one 9 V, 400 h typical; 167 × 84 × 46 mm; 550 g; 3-year warranty.
// Amazon B000OCFFMW in stock at ZIP 10001 (checked 2026-11-08).
// Measurement categories (CAT II/III/IV locations) follow the standard IEC 61010-1 definitions, hedged on the page.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-179-vs-fluke-115";
const f179 = picks.find((p) => p.name === "Fluke 179")!;
const f115 = picks.find((p) => p.name === "Fluke 115")!;

export const metadata = buildMetadata({
  title: "Fluke 179 vs 115: CAT IV, mA and Temperature",
  description:
    "Fluke 179 vs 115: where each one is rated to probe, milliamp ranges, temperature, DC accuracy and warranty, worked from Fluke's own spec sheets.",
  path: "/multimeters/fluke-179-vs-fluke-115",
  image: f179.image,
});

const link = "text-accent hover:underline";

/** A building's supply chain split into measurement categories, with which of the two meters is rated for each zone. */
function CategoryZonesDiagram() {
  const zones = [
    { x: 10, w: 120, cat: "CAT IV", where: "Service drop, meter base,", where2: "outdoor feeders", f179: "179: yes, to 600 V", f115: "115: not rated" },
    { x: 140, w: 130, cat: "CAT III", where: "Main and sub panels,", where2: "breakers, fixed wiring", f179: "179: yes, to 1000 V", f115: "115: yes, to 600 V" },
    { x: 280, w: 110, cat: "CAT II", where: "Receptacles and", where2: "plug-in appliances", f179: "179: yes", f115: "115: yes" },
  ];
  return (
    <svg
      viewBox="0 0 400 210"
      className="w-full h-auto"
      role="img"
      aria-label="Fluke 179 vs 115 safety ratings by location: from the utility service and meter base (CAT IV), through the panels and fixed wiring (CAT III), to receptacles and appliances (CAT II). The Fluke 179 is rated CAT IV 600 volts and CAT III 1000 volts; the Fluke 115 is rated CAT III 600 volts, so it is not rated for the service-entrance zone."
    >
      <path d="M10 60 H390" className="stroke-foreground" strokeWidth="2" />
      <polygon points="390,60 382,55 382,65" className="fill-foreground" />
      <text x="10" y="18" fontSize="10" fontWeight="700" className="fill-foreground">Utility side</text>
      <text x="390" y="18" fontSize="10" fontWeight="700" textAnchor="end" className="fill-foreground">Load side</text>
      <text x="200" y="40" fontSize="8.5" textAnchor="middle" className="fill-muted">available fault energy and transient size fall from left to right</text>
      {zones.map((z, i) => (
        <g key={z.cat}>
          <rect x={z.x} y="72" width={z.w} height="128" rx="8" className={i === 0 ? "fill-accent/15 stroke-accent" : "fill-surface stroke-border"} strokeWidth="1.2" />
          <text x={z.x + z.w / 2} y="92" fontSize="11" fontWeight="700" textAnchor="middle" className="fill-foreground">{z.cat}</text>
          <text x={z.x + z.w / 2} y="110" fontSize="8.5" textAnchor="middle" className="fill-muted">{z.where}</text>
          <text x={z.x + z.w / 2} y="122" fontSize="8.5" textAnchor="middle" className="fill-muted">{z.where2}</text>
          <text x={z.x + z.w / 2} y="158" fontSize="9" textAnchor="middle" className="fill-foreground">{z.f179}</text>
          <text x={z.x + z.w / 2} y="178" fontSize="9" textAnchor="middle" className={i === 0 ? "fill-accent" : "fill-foreground"}>{z.f115}</text>
        </g>
      ))}
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 179 vs 115",
  path,
  published: "2026-11-08",
  intro:
    "Fluke 179 vs 115 is a question of where you probe and how small the current is. Both are True RMS, 6,000-count meters with a bar graph and backlight. The 179 is rated CAT IV 600V and CAT III 1000V, adds 60 mA and 400 mA ranges, a temperature input with the 80BK probe and DC volts five times tighter, and Fluke backs it for life. The 115 is CAT III 600V, stops at 1 mA steps and carries a 3-year warranty, but its 9 V battery is rated for twice the hours.",
  a: {
    pick: f179,
    reviewHref: "/multimeters/fluke-179-review",
    imageAlt: "Fluke 179 True RMS multimeter with temperature, front view",
    chooseIf: [
      "You take readings at meter bases, service entrances or outdoor feeders (CAT IV 600V)",
      "You read 4–20 mA loops or other milliamp currents with 0.01 mA steps",
      "You want temperature with Fluke's 80BK probe in the box",
      "You want a lifetime warranty and a lighter body (420 g)",
    ],
  },
  b: {
    pick: f115,
    reviewHref: "/multimeters/fluke-115-review",
    imageAlt: "Fluke 115 True RMS field service multimeter, front view",
    chooseIf: [
      "Your work stays on the load side of the main panel, inside CAT III 600V",
      "You measure amps only on the 6 A and 10 A ranges",
      "You want the longest battery life: about 400 hours on one 9 V",
      "You want True RMS and a bar graph for less money than the 179",
    ],
  },
  extraSpecs: [
    { label: "Safety rating", a: "CAT III 1000V / CAT IV 600V", b: "CAT III 600V" },
    { label: "DC volts accuracy", a: "±(0.09% + 2)", b: "±(0.5% + 2)" },
    { label: "AC volts accuracy", a: "±(1.0% + 3)", b: "±(1.0% + 3), 45–500 Hz" },
    { label: "Current ranges", a: "60.00 mA, 400.0 mA, 6.000 A, 10.00 A", b: "6.000 A and 10.00 A" },
    { label: "Best current resolution", a: "0.01 mA", b: "1 mA" },
    { label: "Temperature", a: "−40 to 400 °C, 80BK probe included", b: "None (Fluke 116 only)" },
    { label: "Resistance", a: "To 50 MΩ", b: "To 40 MΩ" },
    { label: "Capacitance", a: "To 10,000 µF", b: "1 nF to 9,999 µF" },
    { label: "Frequency", a: "To 100 kHz", b: "To 50 kHz" },
    { label: "Recording", a: "Hold, Auto Hold, Min/Max-average", b: "Min/Max/Avg with elapsed time" },
    { label: "Battery", a: "One 9 V, about 200 h", b: "One 9 V, about 400 h typical" },
    { label: "Size and weight", a: "185 × 90 × 43 mm, 420 g", b: "167 × 84 × 46 mm, 550 g" },
    { label: "Warranty", a: "Lifetime", b: "3 years" },
  ],
  differences: [
    "Safety rating: the 179 is CAT IV 600V and CAT III 1000V; the 115 is CAT III 600V only, so it isn't rated for service-entrance work.",
    "Milliamps: the 179 has 60.00 mA and 400.0 mA ranges with 0.01 mA steps. The 115 has only 6 A and 10 A ranges with 1 mA steps. Neither has a µA range.",
    "Temperature: the 179 reads −40 to 400 °C and ships with the 80BK probe. The 115 has no temperature input.",
    "DC accuracy: ±(0.09% + 2) on the 179 against ±(0.5% + 2) on the 115.",
    "Battery: both run on one 9 V, but Fluke gives about 200 hours for the 179 and about 400 for the 115.",
    "Weight: the 179 is lighter at 420 g against 550 g, though slightly longer.",
    "Warranty: lifetime on the 179, three years on the 115.",
    "The Fluke 115 carries our Hands-on Tested badge; the 179 assessment is desk research from Fluke's published specs.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Where each meter is rated to probe</h2>
        <p className="text-muted leading-7 mb-4">
          The CAT rating is the first thing to settle, because it decides whether the 115 is allowed on the job at all.
          A measurement category describes how large a transient the meter is built to survive at a given point in
          the supply. The closer you are to the utility, the more energy a fault or lightning surge can deliver.
        </p>
        <Figure
          caption={
            <>
              Typical locations for each measurement category under IEC 61010-1. Ratings are Fluke&apos;s; the zone
              boundaries in a real building are set by your local code and the installation.
            </>
          }
        >
          <CategoryZonesDiagram />
        </Figure>
        <p className="text-muted leading-7 my-4">
          The 115&apos;s CAT III 600V covers panels, breakers, feeders inside the building, lighting circuits and
          hard-wired equipment. The 179 adds CAT IV 600V, which covers the service drop, the meter base and outdoor
          conductors before the main disconnect. It also adds CAT III to 1000V, which matters on equipment such as
          some solar and industrial systems with DC or AC above 600V. If you only work downstream of the main breaker
          in houses and light commercial buildings, the 115&apos;s rating is enough. If you ever verify voltage at the
          meter socket, it isn&apos;t.
        </p>
        <Callout title="A higher rating isn't permission">
          CAT IV 600V tells you the meter is built for that location. It doesn&apos;t make work at a live service
          entrance safe. Use rated, undamaged leads with the shrouds on, wear the PPE your arc-flash assessment
          calls for, and leave utility-side work to a licensed electrician or the utility. More detail is in{" "}
          <Link href="/multimeters/cat-iii-vs-cat-iv-multimeter" className={link}>
            CAT III vs CAT IV
          </Link>
          .
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The numbers that separate them</h2>
        <p className="text-muted leading-7 mb-4">
          After the safety rating, the 179&apos;s advantages are DC accuracy, current resolution and temperature. AC
          volts accuracy is the same on both at ±(1.0% + 3), so on mains voltage they will agree.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>DC volts accuracy, percent of reading. The 179&apos;s spec is about five times tighter.</>}>
            <BarChart
              items={[
                { label: "Fluke 115", value: 0.5, display: "±(0.5% + 2)" },
                { label: "Fluke 179", value: 0.09, display: "±(0.09% + 2)", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Finest current step, log scale: 0.01 mA on the 179&apos;s 60 mA range against 1 mA on the 115.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 115", value: 1, display: "1 mA" },
                { label: "Fluke 179", value: 0.01, display: "0.01 mA", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Worked on a 24.00 V DC control supply, both on a 60.00 V range: the 179 allows 0.09% of 24.00 (0.022 V) plus
          two digits of 0.01 V, so ±0.042 V. The 115 allows 0.12 V plus 0.02 V, so ±0.14 V. On a 4–20 mA transmitter
          reading 12 mA, the 179 shows 12.00 mA; the 115 shows 0.012 A, with nothing after the third decimal. A
          technician checking whether a transmitter sits at 4.00 mA or 4.30 mA can do that only on the 179.
        </p>
        <KeyIdea title="Neither meter reads microamps">
          Fluke&apos;s 179 spec table stops at 0.01 mA, which is 10 µA. That is enough for loops and parasitic drain,
          but too coarse for a furnace flame rod reading a few microamps. For that, the{" "}
          <Link href="/multimeters/fluke-116-vs-fluke-115" className={link}>
            Fluke 116 vs 115
          </Link>{" "}
          page covers the 116&apos;s µA range. Fluke&apos;s own 179 page lists µA in its comparison table but not its
          spec table; we follow the spec table.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Temperature, battery and warranty</h2>
        <p className="text-muted leading-7 mb-4">
          The 179 reads −40 to 400 °C with the 80BK bead probe that comes in the box, at 0.1 °C resolution and
          ±(1.0% + 10) excluding the probe. That covers supply-air and return-air checks, pipe temperatures on a
          refrigeration system and hot spots on a motor or bus connection. The 115 can&apos;t take a thermocouple at
          all.
        </p>
        <p className="text-muted leading-7 mb-4">
          Battery life goes the 115&apos;s way. Both use one 9 V battery; Fluke rates the 115 at about 400 hours and the
          179 at about 200. In practice that is the difference between changing a battery once a year and twice a
          year for a technician using the meter an hour a day.
        </p>
        <p className="text-muted leading-7">
          Fluke covers the 179 with a lifetime warranty and the 115 with three years. The 179 is also 130 g lighter,
          420 g against 550 g, though it is 18 mm longer. Both have Min/Max recording, and the 179 adds Auto Hold, which
          freezes a stable reading so you can take the probes off a live point before looking at the display.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 179 vs 115: which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Better fit", "Why"]}
          rows={[
            ["Electrician verifying voltage at meter sockets", "Fluke 179", "CAT IV 600V; the 115 is CAT III only"],
            ["Industrial tech on 4–20 mA instruments", "Fluke 179", "60.00 mA range with 0.01 mA steps"],
            ["HVAC tech checking supply and return air", "Fluke 179", "Temperature with the 80BK probe in the box"],
            ["Calibrating or checking DC control supplies", "Fluke 179", "±(0.09% + 2) against ±(0.5% + 2)"],
            ["Residential service work inside the panel and downstream", "Fluke 115", "CAT III 600V covers it, for less money"],
            ["Occasional user who forgets about batteries", "Fluke 115", "About 400 h per 9 V, twice the 179"],
            ["Flame-rod microamps", "Neither", "Neither has a µA range; see the Fluke 116"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Our verdict: the 179 is the better meter for anyone who works at the service entrance or on instruments,
          and its lifetime warranty offsets much of the price gap over years of use. The 115 remains a sound buy if
          your work stays inside CAT III 600V and your current readings are in amps. For the 179&apos;s own rivals, see{" "}
          <Link href="/multimeters/fluke-87v-vs-fluke-179" className={link}>
            Fluke 87V vs 179
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/fluke-117-vs-fluke-179" className={link}>
            Fluke 117 vs 179
          </Link>
          ; for the 115&apos;s step up in the same series, see{" "}
          <Link href="/multimeters/fluke-175-vs-fluke-115" className={link}>
            Fluke 175 vs 115
          </Link>
          , which covers the 179&apos;s sibling without temperature.
        </p>
      </section>
    </>
  ),
  bottomLine:
    "The Fluke 179 is the more capable meter: CAT IV 600V and CAT III 1000V, 60 mA and 400 mA ranges with 0.01 mA steps, temperature with the 80BK probe, DC volts about five times tighter and a lifetime warranty. The Fluke 115 suits work that stays inside CAT III 600V with amp-level currents, and its 9 V battery is rated for about twice as long.",
  chooseNeitherIf:
    "You need microamps for flame-rod or sensor work: the 179's finest current step is 0.01 mA and the 115's is 1 mA. Look at the Fluke 116 or a meter with a dedicated µA range.",
  faqs: [
    {
      question: "Is the Fluke 179 worth it over the 115?",
      answer:
        "It is if you need any of CAT IV 600V, milliamp ranges, temperature or tighter DC accuracy, and the lifetime warranty adds long-term value. If you work only on branch circuits and panels and read currents in amps, the 115 covers the job with True RMS and a bar graph for less money.",
    },
    {
      question: "Can the Fluke 115 be used on a service entrance?",
      answer:
        "Fluke rates the 115 at CAT III 600V, which covers panels and fixed wiring inside the building but not CAT IV locations such as the service drop, meter base or outdoor feeders. The Fluke 179 is rated CAT IV 600V. Utility-side work also calls for a licensed electrician and the right PPE.",
    },
    {
      question: "Does the Fluke 179 measure microamps?",
      answer:
        "Not according to Fluke's spec table, which gives 60.00 mA and 400.0 mA ranges with a best resolution of 0.01 mA, or 10 µA. The product page's comparison table lists µA, which conflicts with the spec table. For flame-rod work at a few microamps, the Fluke 116 has a dedicated µA range.",
    },
    {
      question: "Which has better battery life, the Fluke 179 or 115?",
      answer:
        "The Fluke 115. Both run on one 9 V battery, and Fluke rates the 115 at about 400 hours against about 200 hours for the 179. Backlight use shortens both figures. If you use the meter daily, budget for twice as many battery changes on the 179.",
    },
    {
      question: "Do the Fluke 179 and 115 read AC volts the same?",
      answer:
        "Yes, on paper. Fluke gives both an AC volts accuracy of ±(1.0% + 3), and both are True RMS with 6,000 counts and a 33-segment bar graph. Expect them to agree on mains voltage. The accuracy difference is on DC volts, where the 179 is specified at ±(0.09% + 2).",
    },
    {
      question: "Does the Fluke 179 come with a temperature probe?",
      answer:
        "Yes. Fluke includes the 80BK bead thermocouple, and the meter reads from −40 to 400 °C at 0.1 °C resolution. The stated accuracy of ±(1.0% + 10) excludes probe error. The Fluke 115 has no temperature input, so it can't use the probe.",
    },
  ],
  roundup: { label: "See all multimeter picks", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 179 review", href: "/multimeters/fluke-179-review" },
    { label: "Fluke 115 review", href: "/multimeters/fluke-115-review" },
    { label: "Fluke 175 vs Fluke 115", href: "/multimeters/fluke-175-vs-fluke-115" },
    { label: "Fluke 116 vs Fluke 115", href: "/multimeters/fluke-116-vs-fluke-115" },
    { label: "Fluke 87V vs Fluke 179", href: "/multimeters/fluke-87v-vs-fluke-179" },
    { label: "Fluke 117 vs Fluke 179", href: "/multimeters/fluke-117-vs-fluke-179" },
    { label: "Fluke 116 vs Fluke 179", href: "/multimeters/fluke-116-vs-fluke-179" },
    { label: "Fluke 175 vs Fluke 179", href: "/multimeters/fluke-175-vs-fluke-179" },
    { label: "Fluke 177 vs Fluke 179", href: "/multimeters/fluke-177-vs-fluke-179" },
    { label: "Fluke 115 vs Fluke 117", href: "/multimeters/fluke-115-vs-fluke-117" },
    { label: "Fluke 115 vs Fluke 87V", href: "/multimeters/fluke-115-vs-fluke-87v" },
    { label: "Fluke 289 vs Fluke 115", href: "/multimeters/fluke-289-vs-fluke-115" },
    { label: "CAT III vs CAT IV multimeters", href: "/multimeters/cat-iii-vs-cat-iv-multimeter" },
    { label: "Best multimeters for 4–20 mA loop testing", href: "/multimeters/best-multimeters-for-4-20ma-loop-testing" },
  ],
};

export default function Fluke179VsFluke115Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
