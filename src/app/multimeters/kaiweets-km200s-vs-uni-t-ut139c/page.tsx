// Specs per maker sources, checked 2026-10-26:
// - KAIWEETS KM200s: official Amazon listing B0FCMBZ5TW (title and "About this item"): 4000 counts, True RMS, smart auto
//   ranging that switches between AC/DC volts, resistance and continuity, capacitance, NCV with visual and audible alerts,
//   CAT II 600V, backlit LCD, flashlight, auto-off, 2 × AAA batteries, 3-year warranty, 4.33 × 2.36 × 1.06 in.
//   kaiweets.com rate-limited our checks; current ranges, frequency and temperature are not on the listing, shown as Not stated.
// - UNI-T UT139C: https://meters.uni-trend.com/product/ut139-series/ (6000 counts, True RMS, auto and manual range, NCV,
//   CAT III 600V, DC V ±(0.5% + 2), AC V ±(0.8% + 3), 45 Hz-1 kHz, 10 A AC/DC, 60 MΩ, capacitance, 10 Hz-10 MHz frequency,
//   temperature probe included on the C, LED backlight and 31-segment analog bar listed for the series, two 1.5 V R6 cells,
//   170 × 80 × 48 mm, 354 g). The series table is flattened on UNI-T's page, so per-model rows are stated with that caveat.
// Correction 2026-10-26: the old page said the UT139C doesn't list a backlight; UNI-T lists an LED backlight for the series.
// Impulse voltages are typical IEC 61010-1 values, hedged on the page.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea, MeterReadout } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/kaiweets-km200s-vs-uni-t-ut139c";

export const metadata = buildMetadata({
  title: "KAIWEETS KM200s vs UNI-T UT139C",
  description:
    "KAIWEETS KM200s vs UNI-T UT139C: CAT II vs CAT III 600V, 4,000 vs 6,000 counts, smart vs manual ranging. Charts, a range diagram and which budget meter to buy.",
  path: "/multimeters/kaiweets-km200s-vs-uni-t-ut139c",
});

const link = "text-accent hover:underline";

/** Typical voltage range steps for a 4,000-count and a 6,000-count meter, with common voltages marked. */
function RangeLadder() {
  const W = 330;
  const left = 20;
  const span = 290;
  // log10 position from 1 V to 1000 V
  const xv = (v: number) => left + (Math.log10(v) / 3) * span;
  const marks = [
    { v: 4.2, label: "4.2 V Li-ion" },
    { v: 5, label: "5 V USB" },
    { v: 12.6, label: "12.6 V car" },
    { v: 120, label: "120 V outlet" },
  ];
  return (
    <svg
      viewBox={`0 0 ${W} 190`}
      className="w-full h-auto"
      role="img"
      aria-label="Range ladder on a log scale: a 4,000-count meter typically steps at 4, 40 and 400 volts, a 6,000-count meter at 6, 60 and 600 volts. A 5 V USB rail and a 4.2 V lithium cell fall above the 4 V step but below the 6 V step, so the 6,000-count meter shows them with one more decimal place"
    >
      {[
        { y: 50, steps: [4, 40, 400], name: "4,000 counts (KM200s)" },
        { y: 110, steps: [6, 60, 600], name: "6,000 counts (UT139C)" },
      ].map((row, r) => (
        <g key={row.name}>
          <text x={left} y={row.y - 18} fontSize="10" fontWeight="700" className={r === 1 ? "fill-accent" : "fill-foreground"}>
            {row.name}
          </text>
          <line x1={left} x2={left + span} y1={row.y} y2={row.y} className="stroke-border" strokeWidth="6" strokeLinecap="round" />
          {row.steps.map((s) => (
            <g key={s}>
              <line x1={xv(s)} x2={xv(s)} y1={row.y - 9} y2={row.y + 9} className={r === 1 ? "stroke-accent" : "stroke-foreground"} strokeWidth="2" />
              <text x={xv(s)} y={row.y + 21} fontSize="9" textAnchor="middle" className="fill-muted">
                {s} V
              </text>
            </g>
          ))}
        </g>
      ))}
      {marks.map((m, i) => (
        <g key={m.label}>
          <line x1={xv(m.v)} x2={xv(m.v)} y1="140" y2="34" className="stroke-accent" strokeWidth="0.8" strokeDasharray="2 2" />
          <text x={xv(m.v)} y={152 + (i % 2) * 12} fontSize="8.5" textAnchor="middle" className="fill-foreground">
            {m.label}
          </text>
        </g>
      ))}
      <text x={W / 2} y="186" fontSize="8.5" textAnchor="middle" className="fill-muted">
        Typical range steps, log scale. Between 4 V and 6 V, only the 6,000-count meter stays on its finest range.
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "KAIWEETS KM200s vs UNI-T UT139C",
  path,
  published: "2026-10-26",
  intro:
    "For most buyers the UNI-T UT139C is the better budget meter, because it is rated CAT III 600V for panels and building wiring, while the KAIWEETS KM200s is rated CAT II 600V for outlet-connected equipment. Both are True RMS with non-contact voltage detection and a backlit display. The UT139C adds a 6,000-count display, manual ranging, a temperature probe and published accuracy figures; the KM200s answers with smart auto-ranging that picks AC or DC for you, a flashlight and a pocket-sized body.",
  a: {
    pick: picks.find((p) => p.name === "KAIWEETS KM200s")!,
    reviewHref: "/multimeters/kaiweets-km200s-review",
    imageAlt: "KAIWEETS KM200s smart True RMS digital multimeter",
    chooseIf: [
      "Your work stays at outlets, appliances, batteries, cars and hobby circuits",
      "You want a meter that picks AC, DC, resistance or continuity for you with no range dial to learn",
      "You'll use the built-in flashlight in engine bays, crawl spaces and under sinks",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "UNI-T UT139C")!,
    reviewHref: "/multimeters/uni-t-ut139c-review",
    imageAlt: "UNI-T UT139C True RMS digital multimeter",
    chooseIf: [
      "You might ever work in a breaker panel: it's rated CAT III 600V",
      "You want 6,000-count resolution and the option to lock a range manually",
      "You need temperature, frequency or 10 A current with published accuracy",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "4,000 counts, backlit LCD", b: "6,000 counts, LED backlight, 31-segment bar (series)" },
    { label: "Ranging", a: "Smart auto (auto-selects AC/DC, Ω, continuity)", b: "Auto and manual" },
    { label: "DC volts accuracy", a: "Not stated on the listing", b: "±(0.5% + 2), to 600 V" },
    { label: "AC volts accuracy", a: "Not stated on the listing", b: "±(0.8% + 3), 45 Hz to 1 kHz" },
    { label: "Current", a: "Not stated on the listing", b: "To 10 A AC/DC" },
    { label: "Resistance", a: "Yes (range not stated)", b: "To 60 MΩ" },
    { label: "Capacitance", a: "Yes (range not stated)", b: "Yes" },
    { label: "Frequency / temperature", a: "Not stated on the listing", b: "10 Hz to 10 MHz / -40 to 1000°C, probe included" },
    { label: "Non-contact voltage", a: "Yes, visual and audible", b: "Yes" },
    { label: "Flashlight", a: "Yes", b: "Not stated" },
    { label: "Batteries", a: "2 × AAA", b: "2 × 1.5 V AA (R6)" },
    { label: "Size / weight", a: "4.33 × 2.36 × 1.06 in; weight not stated", b: "170 × 80 × 48 mm; 354 g" },
    { label: "Warranty", a: "3 years (per listing)", b: "Not stated on UNI-T's page" },
  ],
  differences: [
    "Safety rating: the KM200s is CAT II 600V; the UT139C is CAT III 600V, the minimum for panels and fixed building wiring.",
    "Resolution: 4,000 counts on the KM200s against 6,000 on the UT139C, which matters most between 4 and 6 V, for example on USB rails and lithium cells.",
    "Ranging: the KM200s's smart mode chooses AC or DC volts, resistance or continuity on its own; the UT139C offers conventional auto ranging plus a manual override.",
    "Published detail: UNI-T lists accuracy, 10 A current, 60 MΩ resistance, frequency to 10 MHz and a temperature probe. The KM200s listing gives no accuracy figures and doesn't mention current, frequency or temperature.",
    "Both are True RMS with non-contact voltage detection and a backlit display. Only the KM200s lists a flashlight.",
    "The KM200s is smaller and runs on two AAA cells; the UT139C is larger at 354 g and runs on two AA cells.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">At a glance</h2>
        <InfoCards
          items={[
            { label: "Shared basics", desc: "True RMS, non-contact voltage, backlit display, 600 V maximum." },
            { label: "Safety gap", desc: "CAT II 600V on the KM200s, CAT III 600V on the UT139C." },
            { label: "UT139C extras", desc: "6,000 counts, manual ranging, temperature, frequency, 10 A." },
            { label: "KM200s extras", desc: "Smart mode picks the function, plus a flashlight and a smaller body." },
            { label: "Documentation", desc: "UNI-T publishes accuracy figures; the KM200s listing doesn't." },
            { label: "Verdict", desc: "Panel work or more functions: UT139C. Outlets, cars, simplicity: KM200s." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          This is desk research: we compared UNI-T&apos;s UT139 series page with the official Amazon listing for the
          KM200s and have not bench-tested either meter. Full single-meter write-ups: the{" "}
          <Link href="/multimeters/kaiweets-km200s-review" className={link}>
            KAIWEETS KM200s review
          </Link>{" "}
          and the{" "}
          <Link href="/multimeters/uni-t-ut139c-review" className={link}>
            UNI-T UT139C review
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">KM200s vs UT139C spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Two numbers separate these meters: the measurement category and the display count. The first decides where
          you are allowed to probe; the second decides how fine a reading you get on low voltages.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Typical IEC 61010 test impulse for each rating. CAT III 600V is tested against a larger spike.</>}>
            <BarChart
              items={[
                { label: "KM200s: CAT II 600V", value: 4, display: "≈4 kV" },
                { label: "UT139C: CAT III 600V", value: 6, display: "≈6 kV", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Maximum display count. 50% more counts on the UT139C.</>}>
            <BarChart
              items={[
                { label: "KAIWEETS KM200s", value: 4000, display: "4,000" },
                { label: "UNI-T UT139C", value: 6000, display: "6,000", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <div className="mt-4">
          <Figure caption={<>Where the count difference shows up: typical range steps for each meter, with everyday voltages marked.</>}>
            <RangeLadder />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          A 4,000-count meter typically steps from a 4 V range to a 40 V range, so anything just above 4 V, such as a
          fully charged 4.2 V lithium cell or a 5 V USB rail, is read with two decimals. A 6,000-count meter stays on its
          6 V range up to 5.999 V and shows three. Above that the advantage fades: 12.6 V and 120 V read with the same
          resolution on both. UNI-T&apos;s ±(0.5% + 2) DC accuracy on a 5.000 V reading works out to ±0.027 V, or 25
          thousandths plus two counts of 0.001 V.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <Figure caption={<>Illustrative only: a 5 V USB rail on a 4,000-count meter&apos;s 40 V range.</>}>
            <MeterReadout value="5.03" unit="V DC" mode="KM200s  AUTO" />
          </Figure>
          <Figure caption={<>Illustrative only: the same rail on a 6,000-count meter&apos;s 6 V range.</>}>
            <MeterReadout value="5.031" unit="V DC" mode="UT139C  6 V" />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">CAT II vs CAT III in a house</h2>
        <p className="text-muted leading-7 mb-4">
          Measurement categories rate a meter for the size of voltage spike it can survive at a given point in the
          wiring. CAT II covers circuits on the far side of a receptacle: the appliance, the power tool, the extension
          cord. CAT III covers the fixed installation: the breaker panel, the feeders, hardwired equipment and the
          branch wiring inside the walls. A spike that a CAT II meter&apos;s protection is not built for can
          arc across inside the meter while it is in your hands. That is why, for anyone who will ever open a panel
          cover, the UT139C is the default.
        </p>
        <KeyIdea title="Smart mode is convenience, not accuracy">
          The KM200s&apos;s smart mode detects whether the leads see AC or DC voltage, resistance or continuity and
          switches to it, so a beginner can&apos;t pick the wrong dial position. It doesn&apos;t make readings more
          accurate, and without manual ranging you can&apos;t hold a range while a reading wanders across a range
          boundary. The UT139C makes you choose the function but lets you lock the range when you want to.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">KAIWEETS KM200s vs UNI-T UT139C: which should you buy?</h2>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["Homeowner replacing a light switch", "UNI-T UT139C", "Switch boxes are fixed wiring; CAT III is the right rating"],
            ["Checking outlets and appliance cords", "Either", "Both are True RMS with NCV; CAT II covers plug-in loads"],
            ["Car and motorcycle 12 V work", "KAIWEETS KM200s", "Smart mode, a flashlight for engine bays, and a small body"],
            ["Electronics and battery hobbyist", "UNI-T UT139C", "6,000 counts resolve 4–6 V rails; published accuracy"],
            ["HVAC and appliance repair", "UNI-T UT139C", "Temperature probe, capacitance and 10 A current"],
            ["First meter for a non-technical user", "KAIWEETS KM200s", "Fewest choices to get wrong at the dial"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          To widen the shortlist, see the{" "}
          <Link href="/multimeters/best-multimeter-for-home-use" className={link}>
            best multimeter for home use
          </Link>{" "}
          and the{" "}
          <Link href="/multimeters/best-multimeter-for-beginners" className={link}>
            best multimeter for beginners
          </Link>
          , or compare the UT139C with another CAT III budget meter in{" "}
          <Link href="/multimeters/extech-ex330-vs-uni-t-ut139c" className={link}>
            Extech EX330 vs UNI-T UT139C
          </Link>
          . Our{" "}
          <Link href="/multimeters/multimeter-buying-guide" className={link}>
            multimeter buying guide
          </Link>{" "}
          explains CAT ratings in more depth.
        </p>
      </section>

      <Callout title="Safety: match the rating to the job">
        Don&apos;t take a CAT II meter into a breaker panel, and don&apos;t trust any meter whose leads are cracked or
        unrated. Non-contact detection on both meters is a first check only: confirm with the leads on a known live
        source before and after testing a circuit you expect to be dead. If you aren&apos;t sure how to work safely
        inside a panel, call a licensed electrician.
      </Callout>
    </>
  ),
  bottomLine:
    "For most buyers the UNI-T UT139C is the safer default: CAT III 600V covers panel and building-wiring work the KM200s isn't rated for, and it adds 6,000 counts, manual ranging, temperature and published accuracy. The KAIWEETS KM200s makes sense if you'll stay at outlets, appliances and cars and value its smart mode, flashlight and smaller size.",
  faqs: [
    {
      question: "What's the difference between CAT II and CAT III?",
      answer:
        "CAT II covers equipment plugged into outlets, such as appliances and power tools. CAT III covers distribution panels, feeders and fixed building wiring, where transient spikes can be larger; a CAT III 600V meter is typically tested against a 6 kV impulse versus about 4 kV for CAT II 600V. A CAT III meter can be used on CAT II circuits, not the reverse.",
    },
    {
      question: "Does the UNI-T UT139C have a backlight?",
      answer:
        "Yes. UNI-T's UT139 series page lists an LED backlight among the series features, alongside data hold and auto power off, and describes a 31-segment analog bar. The KAIWEETS KM200s also has a backlit LCD, and adds a flashlight for lighting the work area, which UNI-T doesn't list for the UT139C.",
    },
    {
      question: "Can the KAIWEETS KM200s measure current?",
      answer:
        "The official Amazon listing doesn't say. Its title and feature bullets mention AC and DC voltage, resistance, continuity, capacitance and non-contact voltage, but no amp ranges. If you need to measure current, the UNI-T UT139C lists up to 10 A AC and DC, or check the KM200s manual before buying.",
    },
    {
      question: "Is 4,000 counts enough for a home multimeter?",
      answer:
        "For most household jobs, yes. Outlet voltage, car batteries and appliance resistance read with the same resolution on a 4,000-count and a 6,000-count meter. The extra counts help between about 4 and 6 volts, such as USB rails and lithium cells, where a 6,000-count meter shows one more decimal place.",
    },
    {
      question: "Can I use the KAIWEETS KM200s on a breaker panel?",
      answer:
        "We don't recommend it. Its CAT II 600V rating covers outlet-connected equipment, while breaker panels and fixed building wiring call for at least CAT III. For panel work, choose a CAT III 600V meter such as the UNI-T UT139C, Klein Tools MM400 or Fluke 117.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "KAIWEETS KM200s review", href: "/multimeters/kaiweets-km200s-review" },
    { label: "UNI-T UT139C review", href: "/multimeters/uni-t-ut139c-review" },
    { label: "Extech EX330 vs UNI-T UT139C", href: "/multimeters/extech-ex330-vs-uni-t-ut139c" },
    { label: "Best multimeter for home & DIY", href: "/multimeters/best-multimeter-for-home-use" },
    { label: "Best multimeter for beginners", href: "/multimeters/best-multimeter-for-beginners" },
    { label: "Multimeter buying guide", href: "/multimeters/multimeter-buying-guide" },
  ],
};

export default function KaiweetsKm200sVsUniTUt139cPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
