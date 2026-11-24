// Fluke 323 (ASIN B00AQKIEXY) per https://www.fluke.com/en-us/product/electrical-testing/clamp-meters/fluke-323, as cited
// on /multimeters/fluke-t5-600-vs-fluke-323 and /multimeters/fieldpiece-sc260-vs-fluke-323 (checked 2026-11-08 and
// 2026-11-19): 400.0 A AC True RMS, ±(2% + 5) at 45-65 Hz and ±(2.5% + 5) at 65-400 Hz; no DC current; 600.0 V AC
// ±(1.5% + 5); 600.0 V DC ±(1.0% + 5); resistance 400.0 Ω / 4000 Ω ±(1.0% + 5); continuity at 70 Ω or less; largest
// conductor 30 mm (600 MCM); 207 × 75 × 34 mm; 265 g; CAT III 600 V / CAT IV 300 V; data hold; no backlight,
// capacitance, frequency, temperature or min/max; two AAA cells per the 323/324/325 users manual; 2-year warranty.
// Milwaukee 2235-20 (ASIN B004F5KXBM) per https://www.milwaukeetool.com/products/details/400-a-clamp-meter/2235-20 (spec
// table as cited on /multimeters/milwaukee-2235-20-review; feature list re-read 2026-11-24): 400 A AC, 1.0 in jaw with a
// thin profile, 600 V AC/DC, True RMS, CAT III 600 V, black-on-white backlit display, LED work light, hold, audible
// continuity, resistance listed as 400 Ω, 2 × AAA, 5-year warranty, test leads included. The 2235-20NST kit page (same meter
// plus a NIST certificate) says resistance to 4000 Ω and a jaw that fits up to 350 MCM. Milwaukee publishes no accuracy,
// size or weight figure on the product page.
// Amazon availability at ZIP 10001 with Chrome, 2026-11-24: both show #add-to-cart-button (2235-20: "Only 1 left in stock").
// The 15.0 A tolerance is arithmetic on Fluke's spec; the 15 A load is illustrative. Neither meter is hands-on tested here.
import Link from "@/components/AppLink";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-323-vs-milwaukee-2235-20";
const f323 = picks.find((p) => p.name === "Fluke 323")!;
const m2235 = picks.find((p) => p.name === "Milwaukee 2235-20")!;

export const metadata = buildMetadata({
  title: "Fluke 323 vs Milwaukee 2235-20 Clamp Meters",
  description:
    "Fluke 323 vs Milwaukee 2235-20: two 400A AC True RMS clamps. CAT IV 300V and published accuracy against a work light, backlight and 5-year warranty.",
  path: "/multimeters/fluke-323-vs-milwaukee-2235-20",
  image: f323.image,
});

const link = "text-accent hover:underline";

/**
 * Where each clamp is rated to work in a typical US 120/240 V house: CAT IV covers the service drop and meter base,
 * CAT III the panel and fixed wiring. The Fluke 323 carries CAT IV 300 V as well as CAT III 600 V; the 2235-20 is CAT III 600 V.
 */
function CategoryZoneDiagram() {
  return (
    <svg
      viewBox="0 0 400 210"
      className="w-full h-auto"
      role="img"
      aria-label="Measurement category zones in a house: CAT IV covers the utility drop and the meter base outside, CAT III covers the main panel, feeders and fixed wiring, and CAT II covers plug-in loads. The Fluke 323 is rated CAT IV 300 volts and CAT III 600 volts, so it is rated for all three zones on a 120/240 volt service. The Milwaukee 2235-20 is rated CAT III 600 volts, so it is rated from the panel inward."
    >
      <rect x="8" y="34" width="112" height="120" rx="6" className="fill-accent/15 stroke-accent" strokeWidth="1.2" />
      <rect x="128" y="34" width="150" height="120" rx="6" className="fill-accent/10 stroke-border" strokeWidth="1.2" />
      <rect x="286" y="34" width="106" height="120" rx="6" className="fill-surface stroke-border" strokeWidth="1.2" />
      <text x="64" y="26" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">CAT IV</text>
      <text x="203" y="26" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">CAT III</text>
      <text x="339" y="26" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">CAT II</text>
      {/* utility drop and meter */}
      <path d="M14 52 H60 V80" className="stroke-foreground fill-none" strokeWidth="1.6" />
      <circle cx="60" cy="96" r="15" className="fill-surface stroke-foreground" strokeWidth="1.4" />
      <text x="60" y="99" fontSize="8" textAnchor="middle" className="fill-foreground">meter</text>
      <text x="64" y="132" fontSize="8.5" textAnchor="middle" className="fill-muted">utility drop,</text>
      <text x="64" y="143" fontSize="8.5" textAnchor="middle" className="fill-muted">meter base</text>
      {/* panel */}
      <path d="M75 96 H150" className="stroke-foreground fill-none" strokeWidth="1.6" />
      <rect x="150" y="62" width="44" height="68" rx="3" className="fill-surface stroke-foreground" strokeWidth="1.4" />
      {[74, 86, 98, 110].map((y) => (
        <rect key={y} x="158" y={y} width="28" height="7" rx="1" className="fill-accent/30" />
      ))}
      <path d="M194 80 H270 M194 112 H270" className="stroke-foreground fill-none" strokeWidth="1.4" />
      <text x="232" y="74" fontSize="8.5" textAnchor="middle" className="fill-muted">feeders,</text>
      <text x="232" y="106" fontSize="8.5" textAnchor="middle" className="fill-muted">fixed wiring</text>
      <text x="172" y="143" fontSize="8.5" textAnchor="middle" className="fill-muted">main panel</text>
      {/* outlet and load */}
      <rect x="300" y="72" width="26" height="40" rx="4" className="fill-surface stroke-foreground" strokeWidth="1.4" />
      <circle cx="313" cy="86" r="2.4" className="fill-foreground" />
      <circle cx="313" cy="98" r="2.4" className="fill-foreground" />
      <path d="M326 92 H350 V80 H380 V104 H350 V92" className="stroke-foreground fill-none" strokeWidth="1.3" />
      <text x="339" y="143" fontSize="8.5" textAnchor="middle" className="fill-muted">plug-in loads</text>
      {/* rating bars */}
      <rect x="8" y="166" width="384" height="12" rx="3" className="fill-accent" />
      <text x="200" y="175" fontSize="8.5" fontWeight="700" textAnchor="middle" className="fill-background">Fluke 323: CAT IV 300 V + CAT III 600 V</text>
      <rect x="128" y="186" width="264" height="12" rx="3" className="fill-accent/40" />
      <text x="260" y="195" fontSize="8.5" fontWeight="700" textAnchor="middle" className="fill-foreground">Milwaukee 2235-20: CAT III 600 V</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 323 vs Milwaukee 2235-20",
  path,
  published: "2026-11-24",
  intro:
    "Fluke 323 vs Milwaukee 2235-20 is a close match: both clamp to 400 A AC with True RMS, read 600 V AC and DC, check resistance and continuity, run on two AAA cells and skip DC current. The differences are in the details. Fluke adds a CAT IV 300V rating, a slightly larger 30 mm jaw and a published accuracy spec; Milwaukee adds a backlit display, an LED work light and a 5-year warranty, but publishes no accuracy figure.",
  a: {
    pick: f323,
    imageAlt: "Fluke 323 True RMS clamp meter with 400 A jaw",
    chooseIf: [
      "You take readings at the meter base or service entrance, where a CAT IV rating applies",
      "You want a stated current accuracy you can quote in a report: ±(2% + 5) at 45–65 Hz",
      "You clamp conductors up to 600 MCM, beyond the 350 MCM Milwaukee quotes",
      "You work in lit spaces and don't need a backlight",
    ],
  },
  b: {
    pick: m2235,
    imageAlt: "Milwaukee 2235-20 400 amp clamp meter with red and black housing",
    chooseIf: [
      "You work in attics, crawlspaces and dark panels, where a backlight and work light help",
      "You want the longer warranty: Milwaukee lists 5 years against Fluke's 2",
      "Your work stays at CAT III: panels, feeders, motors and fixed equipment",
      "You want a thin jaw for picking single wires out of a crowded panel",
    ],
  },
  extraSpecs: [
    { label: "AC current accuracy", a: "±(2% + 5) at 45–65 Hz; ±(2.5% + 5) to 400 Hz", b: "Not published by Milwaukee" },
    { label: "Largest conductor", a: "30 mm (600 MCM)", b: "1.0 in jaw; 350 MCM per the NIST-kit page" },
    { label: "Volts", a: "600.0 V AC ±(1.5% + 5); DC ±(1.0% + 5)", b: "600 V AC/DC, accuracy not published" },
    { label: "Resistance", a: "400.0 Ω and 4000 Ω, ±(1.0% + 5)", b: "400 Ω (spec table) or 4000 Ω (NIST-kit page)" },
    { label: "Continuity", a: "Beeps at 70 Ω or less", b: "Audible, threshold not stated" },
    { label: "Safety rating", a: "CAT III 600V and CAT IV 300V", b: "CAT III 600V" },
    { label: "Display light", a: "No backlight listed", b: "Backlit, black on white, plus LED work light" },
    { label: "Batteries", a: "Two AAA", b: "Two AAA" },
    { label: "Size and weight", a: "207 × 75 × 34 mm, 265 g", b: "Not stated on Milwaukee's page" },
    { label: "Warranty", a: "2 years", b: "5 years" },
  ],
  differences: [
    "Safety category: the Fluke 323 adds CAT IV 300V to its CAT III 600V rating. Milwaukee rates the 2235-20 CAT III 600V only.",
    "Accuracy: Fluke publishes ±(2% + 5 digits) for AC current from 45 to 65 Hz. Milwaukee's page gives no accuracy for current, volts or ohms.",
    "Jaw: Fluke states a 30 mm (600 MCM) maximum conductor. Milwaukee gives a 1.0 in (25.4 mm) opening and, on its NIST-kit page, 350 MCM.",
    "Lighting: the 2235-20 has a backlit display and an LED work light. Fluke lists neither for the 323.",
    "Warranty: 5 years from Milwaukee against 2 years from Fluke.",
    "Resistance: Fluke lists 400.0 Ω and 4000 Ω ranges. Milwaukee's own pages disagree, giving 400 Ω on one and 4000 Ω on the other.",
    "Both are AC-only for current, so neither suits solar, battery or automotive DC amps. Both assessments are desk research, not hands-on tests.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">The numbers side by side</h2>
        <p className="text-muted leading-7 mb-4">
          On the headline figures the two clamps tie: 400 A AC, 600 V, True RMS, two AAA cells. The charts below show
          the few places where the makers publish different numbers, and one where only Fluke publishes a number at all.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Largest conductor each maker states. Milwaukee gives 350 MCM on its NIST-kit page for the same meter.</>}>
            <BarChart
              items={[
                { label: "Fluke 323", value: 600, display: "600 MCM", highlight: true },
                { label: "Milwaukee 2235-20", value: 350, display: "350 MCM" },
              ]}
            />
          </Figure>
          <Figure caption={<>Warranty in years, per each maker&apos;s product page.</>}>
            <BarChart
              items={[
                { label: "Milwaukee 2235-20", value: 5, display: "5 years", highlight: true },
                { label: "Fluke 323", value: 2, display: "2 years" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          A spec you can calculate with matters more than it sounds. Clamp a 15.0 A load with the 323: 2% of 15.0 A is
          0.3 A, and five digits at 0.1 A resolution add 0.5 A, so the true current sits within ±0.8 A of the display,
          anywhere from 14.2 A to 15.8 A. With the 2235-20 you can&apos;t do that sum, because Milwaukee doesn&apos;t
          publish the figure. Its readings may be just as good; you simply have no written spec to hold it to.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">CAT IV 300V: what the extra rating covers</h2>
        <p className="text-muted leading-7 mb-4">
          Measurement categories describe how much transient energy a meter can survive at a given point in the system.
          The closer you work to the utility transformer, the higher the category you need. On a US 120/240 V split-phase
          service, each leg sits at about 120 V to ground, so a CAT IV 300V rating covers the meter base and service
          entrance conductors, while CAT III 600V covers the panel and everything wired from it.
        </p>
        <Figure
          caption={
            <>
              Category zones on a typical home service. The Fluke 323&apos;s rating reaches the meter base; the Milwaukee
              2235-20&apos;s starts at the panel.
            </>
          }
        >
          <CategoryZoneDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          If your clamp work happens at the main panel, on feeders, or on HVAC and motor circuits, both meters are rated
          for it. The Fluke&apos;s extra category only pays off if you check current on service entrance conductors or at
          the meter socket, which is common for service upgrades and utility-side troubleshooting. Our{" "}
          <Link href="/multimeters/cat-iii-vs-cat-iv-multimeter" className={link}>
            CAT III vs CAT IV guide
          </Link>{" "}
          explains the categories in full.
        </p>
        <div className="mt-4">
          <Callout title="Working at the service entrance">
            A CAT IV rating doesn&apos;t make live work at the meter base safe on its own. Service conductors have no
            overcurrent protection ahead of them, so a slip can release far more energy than a branch circuit fault. Wear
            arc-rated PPE suited to the job, keep test leads in their own CAT-rated condition, and leave meter-socket work
            to a licensed electrician or the utility if it isn&apos;t your trade.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which clamp for which job?</h2>
        <DataTable
          head={["Job", "Better fit", "Why"]}
          rows={[
            ["Checking service conductor load before a panel upgrade", "Fluke 323", "CAT IV 300V and a jaw stated to 600 MCM"],
            ["Reading compressor amps in a dark attic air handler", "Milwaukee 2235-20", "Backlit display and LED work light"],
            ["Logging motor current for a maintenance report", "Fluke 323", "Published ±(2% + 5) accuracy to cite"],
            ["Picking one wire out of a packed residential panel", "Milwaukee 2235-20", "Milwaukee designs the jaw with a thin profile"],
            ["Tracing a tripping 20 A branch circuit", "Either", "Both clamp to 400 A AC with True RMS"],
            ["Measuring a solar string or a car's charging current", "Neither", "Both read AC current only"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For the step-by-step method, including why you clamp one conductor and never the whole cable, see{" "}
          <Link href="/multimeters/how-to-measure-ac-current-with-a-clamp-meter" className={link}>
            how to measure AC current with a clamp meter
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Light, resistance and the small print</h2>
        <h3 className="text-lg font-semibold mb-2">Fluke 323: a bare instrument with full paperwork</h3>
        <p className="text-muted leading-7 mb-4">
          The 323 is the entry clamp in Fluke&apos;s 320 family, and it shows: no backlight, no capacitance, no
          frequency, no temperature and no min/max. What it does have is a complete spec sheet, with accuracy for every
          function, two resistance ranges to 4000 Ω, a continuity beeper that sounds at 70 Ω or less, and a stated weight
          of 265 g. If you need DC current, capacitance or temperature, Fluke puts those on the 324 and 325 instead.
        </p>
        <h3 className="text-lg font-semibold mb-2">Milwaukee 2235-20: built for the job site</h3>
        <p className="text-muted leading-7 mb-4">
          Milwaukee pitches the 2235-20 at electricians who work in poor light, and the backlit black-on-white screen and
          LED work light make that case. The 5-year warranty is two and a half times Fluke&apos;s. The weak spot is
          documentation: no accuracy figures, no size or weight on the product page, and resistance listed as 400 Ω on
          one Milwaukee page and 4000 Ω on another. Either range covers fuses, switches, heating elements and motor
          windings, but not kilohm sensor circuits.
        </p>
        <KeyIdea title="Same battery, same blind spot">
          Both clamps run on two AAA cells and both stop at AC current. Neither has a DC amps range, so neither can check a
          battery bank, a solar string or a vehicle&apos;s alternator output. If that work is coming, buy a DC-capable clamp
          now rather than a second clamp later; for a meter that pairs a clamp with full multimeter functions, compare the{" "}
          <Link href="/multimeters/fluke-117-vs-fluke-117-323-kit" className={link}>
            Fluke 117/323 kit
          </Link>
          .
        </KeyIdea>
        <p className="text-muted leading-7 mt-4">
          For more clamp matchups, see{" "}
          <Link href="/multimeters/fluke-t5-600-vs-fluke-323" className={link}>
            Fluke T5-600 vs 323
          </Link>
          ,{" "}
          <Link href="/multimeters/fieldpiece-sc260-vs-fluke-323" className={link}>
            Fieldpiece SC260 vs Fluke 323
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/fluke-117-vs-milwaukee-2235-20" className={link}>
            Fluke 117 vs Milwaukee 2235-20
          </Link>
          , or start with the{" "}
          <Link href="/multimeters/clamp-meter-buying-guide" className={link}>
            clamp meter buying guide
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Buy the Fluke 323 if you work at the service entrance or need a published accuracy spec: it adds CAT IV 300V, a jaw stated to 600 MCM and ±(2% + 5) current accuracy. Buy the Milwaukee 2235-20 if your clamp work stays at the panel and beyond, often in poor light: its backlight, work light and 5-year warranty are worth more there than a spec sheet.",
  chooseNeitherIf:
    "You need DC current for solar, battery or automotive work. Both clamps read AC amps only, so look at a DC-capable clamp meter instead.",
  faqs: [
    {
      question: "Is the Fluke 323 more accurate than the Milwaukee 2235-20?",
      answer:
        "Nobody can say from the specs, because Milwaukee doesn't publish an accuracy figure for the 2235-20. Fluke rates the 323 at ±(2% + 5 digits) for AC current between 45 and 65 Hz. That doesn't prove the Milwaukee is worse; it means only the Fluke gives you a written tolerance to calculate with and to cite.",
    },
    {
      question: "Can either clamp meter measure DC amps?",
      answer:
        "No. Fluke lists AC current only for the 323; its sources place DC current on the higher 320-series models. Milwaukee rates the 2235-20 for 400 A AC with no DC current range. Both read DC volts to 600 V, so you can check a battery's voltage, but not the current flowing from it.",
    },
    {
      question: "Does the Fluke 323 have a backlight?",
      answer:
        "Fluke doesn't list one, and the 323's spec sheet has no backlight entry. The Milwaukee 2235-20 has a backlit black-on-white display plus an LED work light aimed at the jaw. If you often read current inside dim cabinets, attics or crawlspaces, that difference matters more than any spec in the table.",
    },
    {
      question: "Which clamp has the bigger jaw?",
      answer:
        "The Fluke, on paper. Fluke states a 30 mm maximum conductor, given as 600 MCM. Milwaukee gives a 1.0 inch opening, about 25.4 mm, and its NIST-kit page for the same meter says it fits up to 350 MCM. Both take any residential branch-circuit wire and most service conductors.",
    },
    {
      question: "Which one has the longer warranty?",
      answer:
        "The Milwaukee 2235-20, with 5 years listed on Milwaukee's product page. Fluke gives the 323 a 2-year warranty. Both take two AAA cells, so running costs are the same, and Milwaukee includes test leads in the box. The warranty gap is worth weighing if the clamp will live in a work van.",
    },
  ],
  roundup: { label: "See all multimeter picks", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Milwaukee 2235-20 review", href: "/multimeters/milwaukee-2235-20-review" },
    { label: "Clamp meter buying guide", href: "/multimeters/clamp-meter-buying-guide" },
    { label: "How to measure AC current with a clamp meter", href: "/multimeters/how-to-measure-ac-current-with-a-clamp-meter" },
    { label: "Fluke T5-600 vs Fluke 323", href: "/multimeters/fluke-t5-600-vs-fluke-323" },
    { label: "Fieldpiece SC260 vs Fluke 323", href: "/multimeters/fieldpiece-sc260-vs-fluke-323" },
    { label: "Fluke 117 vs Fluke 323", href: "/multimeters/fluke-117-vs-fluke-323" },
    { label: "Fluke 117 vs Milwaukee 2235-20", href: "/multimeters/fluke-117-vs-milwaukee-2235-20" },
    { label: "CAT III vs CAT IV multimeter", href: "/multimeters/cat-iii-vs-cat-iv-multimeter" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
  ],
};

export default function Fluke323VsMilwaukee2235Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
