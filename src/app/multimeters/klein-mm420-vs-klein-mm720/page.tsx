// Specs per maker sources, checked 2026-11-19:
// - Klein Tools MM420: https://www.kleintools.com/product/MM420 and the Klein Tools MM420 instruction manual
//   (current table: 400.0 µA AC/DC range, 0.1 µA resolution, up to 10 A). Core figures match this site's own
//   verified Pick for the MM420 in src/lib/multimeter-catalog.ts (verifiedAt 2026-10-24, citing kleintools.com and
//   the MM420 manual): 4,000-count display, True RMS, auto-ranging, CAT III 600V, AC/DC voltage to 600V, current
//   400.0 µA (0.1 µA) to 10 A, resistance to 50 MΩ, capacitance to 400 µF, frequency to 50 kHz, temperature -40 to
//   1832°F with the included thermocouple, Lead-Alert jack lights, Min/Max, backlight, 2 m drop rating, indoor use
//   only, 2 AAA batteries. No LoZ mode or NCV. Klein's MM SelectionGuide 2026 PDF
//   (data.kleintools.com/.../MM_SelectionGuide_2026.pdf) confirms the 600V AC/DC and 10A AC/DC ranges.
// - Klein Tools MM720: https://www.kleintools.com/product/MM720 and the Klein Tools MM720 instruction manual.
//   Core figures match this site's own verified Pick for the MM720 in src/lib/multimeter-catalog.ts (verifiedAt
//   2026-10-24): CAT IV 600V / CAT III 1000V, up to 1000V AC/DC, LoZ mode for ghost voltages, True RMS,
//   auto-ranging, 6,000-count reverse-contrast display, current 600.0 µA (0.1 µA) to 10 A, resistance to 60 MΩ,
//   capacitance to 6,000 µF, temperature to 1832°F, IP42, 2 m drop rating, carrying pouch included, 2 AAA
//   batteries. No NCV. Klein's own product page lists IP42 ingress protection and a IV/III dual CAT rating.
// Amazon: ASINs confirmed against Klein Tools' own product pages and third-party resellers (toolnut.com,
// homelectrical.com, mouser.com "Klein Tools MM325, MM420, MM720 Digital Multimeters") on 2026-11-19 — WebFetch to
// amazon.com/dp/<ASIN> returned HTTP 503 (bot-blocked), so availability is cross-checked via web search per the
// fallback rule. Both ASINs match the correct model number and price tier noted in the catalog's own "Specs per"
// comments (MM420 B0B57PFFYX ~$64.96; MM720 B0B57PDQJC ~$99.96, both sold by Amazon.com, verified 2026-10-24).
// Neither meter carries this site's Hands-on Tested badge — both assessments are desk research from the maker's
// published specs and manuals, not owner testing.
import Link from "@/components/AppLink";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { pickByName } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/klein-mm420-vs-klein-mm720";
const mm420 = pickByName("Klein Tools MM420")!;
const mm720 = pickByName("Klein Tools MM720")!;

export const metadata = buildMetadata({
  title: "Klein Tools MM420 vs MM720: Which Klein Meter?",
  description:
    "Klein Tools MM420 vs MM720: a CAT III 600V everyday meter against a CAT IV 600V / CAT III 1000V meter with LoZ. Specs, charts and who should buy which.",
  image: mm420.image,
  path: "/multimeters/klein-mm420-vs-klein-mm720",
});

const link = "text-accent hover:underline";

/** Where each meter is rated to probe safely, from the utility feed down to an outlet. */
function CatZoneDiagram() {
  const zones = [
    { x: 10, w: 95, label: "Service entrance", sub: "utility feed, main panel", cat: "CAT IV" },
    { x: 115, w: 95, label: "Feeders & subpanels", sub: "branch panel, large feeders", cat: "CAT III" },
    { x: 220, w: 95, label: "Branch circuits", sub: "receptacles, fixed equipment", cat: "CAT III / II" },
    { x: 325, w: 65, label: "Outlets & cords", sub: "appliances, portable tools", cat: "CAT II" },
  ];
  return (
    <svg
      viewBox="0 0 400 190"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram of a building's power path from the utility service entrance through feeders, branch circuits, to outlets and cords. The Klein Tools MM720 is marked safe across all four zones, rated CAT IV 600V and CAT III 1000V. The Klein Tools MM420 is marked safe only in the branch-circuit and outlet zones, since it is rated CAT III 600V with no CAT IV rating."
    >
      {zones.map((z) => (
        <g key={z.label}>
          <rect x={z.x} y="34" width={z.w} height="46" rx="5" className="fill-surface stroke-border" strokeWidth="1" />
          <text x={z.x + z.w / 2} y="52" fontSize="8.3" fontWeight="700" textAnchor="middle" className="fill-foreground">
            {z.label}
          </text>
          <text x={z.x + z.w / 2} y="64" fontSize="7" textAnchor="middle" className="fill-muted">
            {z.sub}
          </text>
          <text x={z.x + z.w / 2} y="75" fontSize="7.5" fontWeight="700" textAnchor="middle" className="fill-accent">
            {z.cat}
          </text>
        </g>
      ))}
      <path d="M10 22 H390" className="stroke-border" strokeWidth="1" />
      <text x="10" y="16" fontSize="8" fontWeight="700" className="fill-foreground">Power flows left to right</text>

      <rect x="10" y="98" width="380" height="18" rx="4" className="fill-accent/15 stroke-accent" strokeWidth="1.2" />
      <text x="20" y="110.5" fontSize="8.3" fontWeight="700" className="fill-foreground">MM720: safe across all four zones (CAT IV 600V / CAT III 1000V)</text>

      <rect x="220" y="124" width="170" height="18" rx="4" className="fill-foreground/10 stroke-foreground" strokeWidth="1" />
      <text x="230" y="136.5" fontSize="8.3" fontWeight="700" className="fill-foreground">MM420: safe here (CAT III 600V)</text>

      <rect x="10" y="124" width="200" height="18" rx="4" className="fill-none stroke-muted" strokeWidth="1" strokeDasharray="4 3" />
      <text x="20" y="136.5" fontSize="8" className="fill-muted">MM420: not rated for this zone</text>

      <text x="10" y="162" fontSize="7.3" className="fill-muted">
        CAT ratings describe transient energy at a measurement point, not maximum voltage alone. Zone boundaries are
      </text>
      <text x="10" y="173" fontSize="7.3" className="fill-muted">
        illustrative; always check your local panel and wiring against each meter&apos;s own published rating first.
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Klein Tools MM420 vs MM720: Which Klein Meter?",
  path,
  published: "2026-11-19",
  intro:
    "Klein Tools MM420 vs MM720 is a choice between two True RMS, auto-ranging meters from the same brand that look similar on a shelf but are rated for different jobs. The MM420 is a CAT III 600V everyday meter: a 400.0 µA range, 50 MΩ resistance and 400 µF capacitance, built for home, car and general hobby work. The MM720 is Klein's step up for electricians: CAT IV 600V and CAT III 1000V, a LoZ mode for ghost voltages, a 600.0 µA range, 60 MΩ resistance, 6,000 µF capacitance and IP42 sealing, at roughly 1.5 times the MM420's price.",
  a: {
    pick: mm420,
    imageAlt: "Klein Tools MM420 auto-ranging True RMS digital multimeter",
    chooseIf: [
      "You work on circuits at or below 600V and don't need a CAT IV rating",
      "You want µA, mA and 10A current ranges plus temperature and capacitance for home and hobby use",
      "You're keeping the budget tight and don't need LoZ or an IP-rated case",
      "You mostly work indoors, where Klein rates the MM420 for use",
    ],
  },
  b: {
    pick: mm720,
    imageAlt: "Klein Tools MM720 True RMS digital multimeter with LoZ mode",
    chooseIf: [
      "You work near a service entrance, main panel or large feeder where CAT IV matters",
      "You need LoZ mode to rule out ghost voltages from capacitive coupling",
      "You want IP42 sealing and a 1000V DC range for tougher job-site conditions",
      "You're willing to pay more for the extra current, resistance and capacitance headroom",
    ],
  },
  extraSpecs: [
    { label: "Display counts", a: "4,000", b: "6,000" },
    { label: "Safety rating", a: "CAT III 600V", b: "CAT IV 600V / CAT III 1000V" },
    { label: "Max voltage", a: "600V AC/DC", b: "1000V AC/DC" },
    { label: "Current (µA range)", a: "400.0 µA, 0.1 µA resolution", b: "600.0 µA, 0.1 µA resolution" },
    { label: "Max current", a: "10A AC/DC", b: "10A AC/DC" },
    { label: "Resistance", a: "To 50 MΩ", b: "To 60 MΩ" },
    { label: "Capacitance", a: "To 400 µF", b: "To 6,000 µF (6 mF)" },
    { label: "Frequency", a: "To 50 kHz", b: "Listed; Klein doesn't publish an upper ceiling for the MM720" },
    { label: "LoZ mode", a: "Not listed", b: "Yes" },
    { label: "Temperature", a: "-40 to 1832°F (included thermocouple)", b: "To 1832°F (included thermocouple)" },
    { label: "Environmental rating", a: "Indoor use only", b: "IP42" },
    { label: "Drop rating", a: "2 m", b: "2 m" },
    { label: "Battery", a: "2 AAA", b: "2 AAA" },
    { label: "Included", a: "Test leads, thermocouple, instructions", b: "Test leads with CAT III/IV safety caps, thermocouple, carrying pouch, instructions" },
  ],
  differences: [
    "Safety rating: the MM420 is CAT III 600V only; the MM720 adds CAT IV 600V and extends CAT III to 1000V, the main reason it costs more.",
    "LoZ mode: the MM720 has it, letting you rule out induced \"ghost\" voltage on a de-energized conductor; Klein lists no LoZ for the MM420.",
    "Display resolution: 6,000 counts on the MM720 against 4,000 on the MM420, so the MM720 shows one more digit of resolution on some ranges.",
    "Capacitance: the MM720's 6,000 µF (6 mF) range is 15 times the MM420's 400 µF, which matters for motor-start and large filter capacitors.",
    "Current: both top out at 10A, but the MM720's microamp range reaches 600.0 µA against the MM420's 400.0 µA, both at 0.1 µA resolution.",
    "Sealing: Klein rates the MM720 IP42 and the MM420 for indoor use only, so the MM720 tolerates dust and light moisture the MM420 doesn't.",
    "Accessories: the MM720 ships with CAT III/IV-rated safety caps on its leads and a carrying pouch; Klein's MM420 listing doesn't itemize either.",
    "Price: the MM720 costs roughly 1.5 times the MM420 on Amazon at last check (about $100 against about $65).",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">The real trade-off: where you&apos;re allowed to probe</h2>
        <p className="text-muted leading-7 mb-4">
          Both meters measure volts, amps, ohms, capacitance and temperature, and both are True RMS and auto-ranging.
          The number that actually decides which one to buy is the CAT rating, because it describes how much transient
          energy a measurement point can throw at the meter, not just how many volts you expect to read.
        </p>
        <Figure
          caption={
            <>
              Illustrative zones only — always check your own panel and wiring against each meter&apos;s printed
              rating, not this diagram, before you probe.
            </>
          }
        >
          <CatZoneDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Closer to the utility feed, a fault can release far more energy in a transient than the same fault would
          downstream at a receptacle, which is why CAT IV exists as a separate, higher category from CAT III. The
          MM420&apos;s CAT III 600V rating covers most branch-circuit, receptacle and appliance work; it is not rated for
          CAT IV locations such as a main service entrance or the utility side of a meter base. The MM720&apos;s CAT IV
          600V / CAT III 1000V rating covers both, which is the entire reason an electrician would pay more for it.
          Our{" "}
          <Link href="/multimeters/cat-iii-vs-cat-iv-multimeter" className={link}>
            CAT III vs CAT IV
          </Link>{" "}
          guide explains the categories in more depth.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Away from the safety rating, the MM720 is simply the more capable meter on every published number, which
          tracks with its higher price. The gap is largest on capacitance.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Display resolution in counts, from each meter&apos;s own page.</>}>
            <BarChart
              items={[
                { label: "Klein MM720", value: 6000, display: "6,000 counts", highlight: true },
                { label: "Klein MM420", value: 4000, display: "4,000 counts" },
              ]}
            />
          </Figure>
          <Figure caption={<>Microamp range ceiling, both at 0.1 µA resolution.</>}>
            <BarChart
              items={[
                { label: "Klein MM720", value: 600, display: "600.0 µA", highlight: true },
                { label: "Klein MM420", value: 400, display: "400.0 µA" },
              ]}
            />
          </Figure>
          <Figure caption={<>Maximum resistance range.</>}>
            <BarChart
              items={[
                { label: "Klein MM720", value: 60, display: "60 MΩ", highlight: true },
                { label: "Klein MM420", value: 50, display: "50 MΩ" },
              ]}
            />
          </Figure>
          <Figure caption={<>Maximum capacitance, log scale — the MM720&apos;s range is 15 times the MM420&apos;s.</>}>
            <BarChart
              log
              items={[
                { label: "Klein MM720", value: 6000, display: "6,000 µF", highlight: true },
                { label: "Klein MM420", value: 400, display: "400 µF" },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t do</h2>
        <h3 className="text-lg font-semibold mb-2">Klein Tools MM420</h3>
        <p className="text-muted leading-7 mb-4">
          The MM420 covers the everyday list: AC/DC voltage to 600V, current from 400.0 µA up to 10A, resistance to
          50 MΩ, capacitance to 400 µF, frequency to 50 kHz and temperature with the included thermocouple. Lead-Alert
          lights flag the wrong jack before you turn the dial, and it has Min/Max and a backlight. It can&apos;t do
          LoZ ghost-voltage checks, has no non-contact voltage detection, and Klein rates it for indoor use only, so a
          damp crawlspace or a job site in the rain isn&apos;t its environment.
        </p>
        <h3 className="text-lg font-semibold mb-2">Klein Tools MM720</h3>
        <p className="text-muted leading-7 mb-4">
          The MM720 does everything the MM420 does and adds headroom: voltage to 1000V AC/DC, a 600.0 µA range,
          resistance to 60 MΩ, capacitance to 6,000 µF, and a LoZ mode that loads a floating conductor enough to
          collapse a capacitively-coupled ghost voltage so you can trust a zero reading. Its reverse-contrast display
          adjusts itself to ambient light, and IP42 sealing tolerates dust and light moisture the MM420 isn&apos;t rated
          for. Like the MM420, it has no built-in non-contact voltage detection and can&apos;t clamp current — both
          meters read current only through their test leads, in series with the circuit.
        </p>
        <KeyIdea title="Neither meter clamps current">
          Both the MM420 and MM720 measure current the traditional way: break the circuit and put the meter&apos;s leads
          in series, up to 10A on either model. If you regularly need to read motor, compressor or feeder current
          without breaking the circuit, pair either meter with a separate clamp, such as Klein&apos;s{" "}
          <Link href="/multimeters/best-multimeter-for-hvac-technicians" className={link}>
            HVAC clamp picks
          </Link>{" "}
          cover, rather than expecting either MM420 or MM720 to do that job alone.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Pick", "One-line reason"]}
          rows={[
            ["Checking outlets, batteries and small appliances at home", "Klein MM420", "CAT III 600V and the everyday ranges cover it for less money"],
            ["Working near a main panel or service entrance", "Klein MM720", "CAT IV 600V is the rating made for that location"],
            ["Chasing a reading you suspect is a ghost voltage", "Klein MM720", "LoZ loads the circuit to collapse capacitive coupling"],
            ["Testing a motor-start or large filter capacitor", "Klein MM720", "6,000 µF range against the MM420's 400 µF"],
            ["Car electrical and general hobby electronics", "Either", "Both cover µA to 10A current and the usual ranges"],
            ["Outdoor or damp job-site conditions", "Klein MM720", "IP42 sealing; Klein rates the MM420 for indoor use only"],
            ["Tightest budget for a True RMS meter", "Klein MM420", "Roughly two-thirds of the MM720's price on Amazon"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The trust question</h2>
        <p className="text-muted leading-7 mb-4">
          Neither meter carries this site&apos;s Hands-on Tested badge. Everything above comes from Klein Tools&apos;
          own product pages and instruction manuals, cross-checked against Klein&apos;s MM Selection Guide and
          third-party retail listings, not from testing either unit on our own bench.
        </p>
        <Callout title="LoZ is a check, not a guarantee">
          A LoZ reading of near-zero strongly suggests the voltage you saw was a ghost caused by induced or
          capacitively-coupled charge rather than a real source, but it isn&apos;t a substitute for proper lockout and
          verification procedures before you touch a conductor. If you&apos;re unsure whether a circuit is truly
          de-energized, treat it as live and bring in a qualified electrician.
        </Callout>
        <p className="text-muted leading-7 mt-4">
          For how Klein&apos;s lower-cost meters compare with Fluke&apos;s equivalents, see{" "}
          <Link href="/multimeters/fluke-115-vs-klein-mm720" className={link}>
            Fluke 115 vs Klein MM720
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/fluke-117-vs-klein-mm400" className={link}>
            Fluke 117 vs Klein MM400
          </Link>
          . Klein&apos;s own step-up meter in the opposite direction is covered in{" "}
          <Link href="/multimeters/klein-mm400-vs-klein-mm450" className={link}>
            Klein MM400 vs MM450
          </Link>
          , and our{" "}
          <Link href="/multimeters/best-multimeter-for-electricians" className={link}>
            best multimeter for electricians
          </Link>{" "}
          roundup ranks the MM720 alongside its rivals.
        </p>
      </section>
    </>
  ),
  bottomLine:
    "The Klein Tools MM420 is the better buy for home, car and general hobby work at or below 600V: it covers µA to 10A current, resistance, capacitance and temperature for about two-thirds of the MM720's price. The Klein Tools MM720 earns its higher price with a CAT IV 600V / CAT III 1000V rating, a LoZ mode for ghost voltages, more display resolution, a larger capacitance range and IP42 sealing — the meter to buy if you'll ever probe near a main panel or service entrance.",
  chooseNeitherIf:
    "You need to clamp current without breaking the circuit, or you need non-contact voltage detection built in — neither Klein meter clamps current or has NCV, so pair either one with a separate clamp meter or NCV tester, or look at a model that includes one.",
  faqs: [
    {
      question: "What is the real difference between the Klein MM420 and MM720?",
      answer:
        "The headline difference is the safety rating: CAT III 600V on the MM420 against CAT IV 600V / CAT III 1000V on the MM720. The MM720 also adds a LoZ mode, a 6,000-count display against 4,000, a larger 600.0 µA current range, more resistance and capacitance headroom, and IP42 sealing. Both are True RMS, auto-ranging, and read current only through their test leads.",
    },
    {
      question: "Do I need CAT IV for home and hobby electronics work?",
      answer:
        "Usually not. CAT IV covers locations like a main service entrance or the utility side of a meter base, which most hobbyists and homeowners never open. If your work stays at branch circuits, receptacles and appliances, the MM420's CAT III 600V rating is the right fit and you'll save money. Electricians who work on panels and feeders are the ones who need the MM720's CAT IV rating.",
    },
    {
      question: "What does the MM720's LoZ mode actually do?",
      answer:
        "LoZ (low impedance) deliberately loads the circuit with a low-resistance path while measuring voltage. A real voltage source holds steady under that load; a 'ghost' voltage caused by capacitive or inductive coupling from a nearby live conductor collapses toward zero. The MM420 doesn't list a LoZ mode, so on it you can't tell the difference the same way.",
    },
    {
      question: "Can either meter clamp current without breaking the circuit?",
      answer:
        "No. Both the MM420 and MM720 are standard multimeters that measure current in series through their test leads, up to 10A on either model. For motor, compressor or feeder current without opening the circuit, you need a separate clamp meter, such as the HVAC-focused clamps covered in this site's best multimeter for HVAC technicians roundup.",
    },
    {
      question: "Is the Klein MM720 worth the extra cost over the MM420?",
      answer:
        "If you ever work on panels, feeders or anything that could be a CAT IV location, yes — that rating alone justifies the price gap for anyone doing that work professionally. If your work stays at outlets, appliances, vehicles and hobby electronics at or below 600V, the MM420 covers the same everyday ranges for roughly two-thirds of the price, and the MM720's extra headroom in capacitance and resistance will rarely matter.",
    },
  ],
  roundup: { label: "See all multimeter picks", href: "/multimeters/best-multimeters" },
  related: [
    { label: "CAT III vs CAT IV multimeter", href: "/multimeters/cat-iii-vs-cat-iv-multimeter" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
    { label: "Best multimeter for home use", href: "/multimeters/best-multimeter-for-home-use" },
    { label: "Best multimeter for beginners", href: "/multimeters/best-multimeter-for-beginners" },
    { label: "Fluke 115 vs Klein MM720", href: "/multimeters/fluke-115-vs-klein-mm720" },
    { label: "Fluke 117 vs Klein MM400", href: "/multimeters/fluke-117-vs-klein-mm400" },
    { label: "Klein MM400 vs MM450", href: "/multimeters/klein-mm400-vs-klein-mm450" },
    { label: "Klein MM400 review", href: "/multimeters/klein-mm400-review" },
    { label: "Do I need a True RMS multimeter?", href: "/multimeters/do-i-need-true-rms-multimeter" },
    { label: "How to check for voltage fluctuations in your home", href: "/multimeters/how-to-check-for-voltage-fluctuations-in-your-home" },
  ],
};

export default function KleinMm420VsKleinMm720Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
