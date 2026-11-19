// Fieldpiece SC260: https://www.fieldpiece.com/product/sc260/ (checked 2026-11-19) lists 400 A AC, True RMS ("Yes"),
// resistance to 40 MΩ, capacitance and Type K temperature as features with no range stated on the page itself,
// continuity, diode test and non-contact voltage (NCV detects live voltage to 600 VAC and 24 VAC from a thermostat,
// per the page's own FAQ), a 4,000-count display, "OL"/"-OL" overrange, a measurement rate of 3 times per second
// nominal, Max/Min/Hold, a blue backlight with 5-minute auto-off, overload protection of 600 VDC or 600 VAC rms,
// test leads rated UL61010-031 CAT III 600 V or above (the page does not separately state the meter's own CAT
// rating), one 9 V alkaline battery rated about 150 hours typical, auto power-off at about 30 minutes, operating
// range 0-50°C at <70% RH, altitude to 2000 m, dimensions 205.5 x 67.4 x 45.1 mm, weight about 265 g with battery,
// and includes ADLS2 leads, an ATB1 Type K thermocouple, a velcro strap and an ANC4 case.
// Fieldpiece SC480: https://www.fieldpiece.com/product/sc480/ (checked 2026-11-19) lists 600 A AC at 0.01 A
// resolution, True RMS "through the clamp or leads," a DC microamps function (no range stated on the page), a
// low-ohm range for motor windings (no range stated), capacitance for motor run/start caps (no range stated),
// continuity, diode test, inrush mode, phase rotation (one lead on L1), a low-pass filter for VFD systems, the same
// NCV behavior as the SC260, overload protection of 1000 VDC or 750 VAC rms, CAT IV 600V / CAT III 1000V (stated
// explicitly), a 10,000-count dual display, 3.3 measurements per second, the same backlight behavior, one 9 V
// battery rated about 100 hours typical with no wireless or backlight in use, dimensions 247 x 79 x 48 mm, weight
// about 345 g, and wireless reporting to the Job Link System app (the page does not name the radio protocol).
// Jaw opening: fieldpiece.com states no jaw dimension for either model on the pages above. Third-party spec sheets
// agree both clamps share the same 1.2 in (30 mm) jaw: Zoro's SC260 listing https://www.zoro.com/fieldpiece-com-cl-meter-trms-mag-sc260/i/G112932654/
// and TestEquipmentDepot's SC480 listing https://www.testequipmentdepot.com/fieldpiece-sc480-true-rms-ac-clamp-meter-with-wireless-communication-100a600a-ac-750vac1000vdc-power-kw-phase-rotation.html
// (both checked 2026-11-19). That contradicts the common assumption that the SC480 has a bigger jaw — it doesn't;
// only its current rating and electronics are bigger.
// Capacitance range, temperature range and the SC480's exact µA/DC resolution are not printed on either fieldpiece.com
// product page. For those we reuse the already-verified Picks in src/lib/multimeter-catalog.ts, whose comments cite
// the Fieldpiece SC260 operator's manual (v22) and SC480 operator's manual (v18): SC260 capacitance 4 nF to 4 mF,
// temperature -30 to 752°F (-34 to 400°C); SC480 capacitance to 10 mF, temperature -58 to 2372°F (-50 to 1300°C),
// DC microamp range 1000 µA at 0.1 µA resolution, and active power / VA / VAr / power factor measurement.
// Both ASINs: fetching https://www.amazon.com/dp/B00KLYJG78 and https://www.amazon.com/dp/B0848S9YWT directly
// returned HTTP 503 to our fetcher both times (checked 2026-11-19), so buyability is confirmed instead by web
// search: both ASINs are current, actively priced listings at multiple authorized HVAC/electrical distributors
// (TestEquipmentDepot, SupplyHouse, Ferguson, Newegg, Walmart marketplace, eBay) as of 2026-11-19, and this site's
// own src/lib/multimeter-catalog.ts already carries an independent "Amazon-buyable 2026-10-24" verification note
// for both ASINs, under four weeks old.
import Link from "@/components/AppLink";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fieldpiece-sc260-vs-fieldpiece-sc480";

const all = getAllPicks("multimeters");
const sc260 = all.find((p) => p.name === "Fieldpiece SC260")!;
const sc480 = all.find((p) => p.name === "Fieldpiece SC480")!;

export const metadata = buildMetadata({
  title: "Fieldpiece SC260 vs SC480: Compact or Power Clamp?",
  description:
    "Fieldpiece SC260 vs SC480: both are True RMS, but the SC480 adds 600A, CAT IV 600V, inrush mode, µA DC, power/PF, phase rotation and wireless logging.",
  path,
  image: sc260.image,
});

const link = "text-accent hover:underline";

/**
 * A compressor-starting-current waveform: a brief locked-rotor spike (LRA) ahead of the steady running draw (RLA).
 * The SC480's inrush mode is built to catch that spike; the SC260 has no inrush mode and samples about three times
 * a second via ordinary Max/Min/Hold, which can miss or flatten a transient that lasts only a few AC cycles.
 */
function InrushDiagram() {
  const x0 = 20;
  const x1 = 380;
  const base = 140;
  // Rough waveform: quick rise to a spike, decaying ripple, then settling to a steady run level.
  const points: [number, number][] = [
    [x0, base],
    [40, base],
    [55, 36],
    [70, 70],
    [85, 44],
    [100, 76],
    [120, 92],
    [150, 104],
    [190, 112],
    [240, 116],
    [300, 118],
    [x1, 118],
  ];
  const path = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`).join(" ");
  return (
    <svg
      viewBox="0 0 400 190"
      className="w-full h-auto"
      role="img"
      aria-label="A compressor's starting current over about one second: a brief locked-rotor inrush spike, several times the running current, followed by the steady run-load current. A dashed box marks the inrush mode capture window, labeled SC480 only. The SC260 is marked as sampling about three times per second with ordinary Max/Min/Hold, which can miss a spike this short."
    >
      <line x1={x0} x2={x1} y1={base} y2={base} className="stroke-border" strokeWidth="1" />
      <line x1={x0} x2={x0} y1="20" y2={base} className="stroke-border" strokeWidth="1" />
      <text x={x0 - 6} y="40" fontSize="8.5" textAnchor="end" className="fill-muted">
        Amps
      </text>
      <text x={(x0 + x1) / 2} y="178" fontSize="8.5" textAnchor="middle" className="fill-muted">
        Time — roughly one second, compressor start to steady run
      </text>
      <path d={path} className="fill-none stroke-accent" strokeWidth="2" />
      <rect x="44" y="30" width="48" height="90" rx="4" className="fill-accent/10 stroke-accent" strokeWidth="1.2" strokeDasharray="3 2" />
      <text x="68" y="24" fontSize="8.5" fontWeight="700" textAnchor="middle" className="fill-foreground">
        LRA spike
      </text>
      <text x="68" y="134" fontSize="8" textAnchor="middle" className="fill-accent" fontWeight="700">
        inrush mode: SC480 only
      </text>
      <line x1="150" y1={base} x2="300" y2={base} className="stroke-foreground" strokeWidth="1" strokeDasharray="2 3" />
      <text x="225" y="152" fontSize="8.5" textAnchor="middle" className="fill-foreground">
        RLA steady run — both meters read this fine
      </text>
      <text x="340" y="30" fontSize="8" textAnchor="middle" className="fill-muted">
        SC260: ~3</text>
      <text x="340" y="40" fontSize="8" textAnchor="middle" className="fill-muted">
        readings/sec,</text>
      <text x="340" y="50" fontSize="8" textAnchor="middle" className="fill-muted">
        Max/Min/Hold</text>
      <text x="340" y="64" fontSize="8" textAnchor="middle" className="fill-muted">
        only — can miss</text>
      <text x="340" y="74" fontSize="8" textAnchor="middle" className="fill-muted">
        a short spike</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fieldpiece SC260 vs Fieldpiece SC480",
  path,
  published: "2026-11-19",
  intro:
    "Fieldpiece SC260 vs SC480 compares the two ends of Fieldpiece's compact clamp-meter line. They share the same 1.2 in (30 mm) jaw and both read True RMS, which is easy to miss since the SC480 is often assumed to be the first True RMS model in the pair — it isn't. What actually separates them is current range (400 A vs 600 A), safety category (CAT III 600V vs CAT IV 600V / CAT III 1000V), a step up from a 4,000-count to a 10,000-count dual display, and a set of HVACR-specific extras the SC480 alone carries: DC microamps for flame sensors, inrush mode for motor starting current, active power and power factor, three-phase rotation, a VFD low-pass filter, and wireless reporting to Fieldpiece's Job Link app.",
  a: {
    pick: sc260,
    imageAlt: "Fieldpiece SC260 compact HVACR clamp meter",
    chooseIf: [
      "Your loads stay under 400 A AC and you want the smaller, lighter, longer-battery-life meter",
      "You never leave CAT III 600V work — branch circuits, disconnects, control boards",
      "You want capacitance, Type K temperature and NCV in a basic clamp without paying for power metering",
      "You don't need to see a motor's starting-current spike, only its steady running draw",
    ],
  },
  b: {
    pick: sc480,
    imageAlt: "Fieldpiece SC480 wireless HVACR power clamp meter",
    chooseIf: [
      "You work on equipment up to 600 A, or anywhere Fieldpiece's CAT IV 600V / CAT III 1000V rating matters",
      "You chase flame-sensor microamps, which the SC260 has no range for",
      "You need inrush mode to capture a compressor's locked-rotor spike, or power/PF and phase-rotation checks",
      "You want readings logged wirelessly to the Job Link app instead of read off the meter by hand",
    ],
  },
  extraSpecs: [
    { label: "Max AC current", a: "400 A", b: "600 A (0.01 A resolution)" },
    { label: "DC current (clamp)", a: "No — AC clamp only", b: "No — AC clamp only" },
    { label: "DC microamps (leads)", a: "Not listed", b: "1000 µA, 0.1 µA resolution (per operator's manual)" },
    { label: "True RMS", a: "Yes", b: "Yes, through the clamp or leads" },
    { label: "Safety rating", a: "CAT III 600V (per operator's manual); leads rated CAT III 600V+", b: "CAT IV 600V / CAT III 1000V (stated on product page)" },
    { label: "Display", a: "4,000 counts", b: "10,000 counts, dual display" },
    { label: "Measurement rate", a: "~3/s nominal", b: "~3.3/s" },
    { label: "Inrush mode", a: "No", b: "Yes" },
    { label: "Power / PF / phase rotation", a: "No", b: "Active power, VA, VAr, power factor, 3-phase rotation" },
    { label: "VFD low-pass filter", a: "No", b: "Yes" },
    { label: "Resistance", a: "To 40 MΩ", b: "Low-ohm range for motor windings; range not stated by Fieldpiece" },
    { label: "Capacitance", a: "4 nF to 4 mF (per operator's manual)", b: "To 10 mF (per operator's manual)" },
    { label: "Temperature (Type K)", a: "-30 to 752°F (-34 to 400°C)", b: "-58 to 2372°F (-50 to 1300°C)" },
    { label: "Jaw opening", a: "1.2 in / 30 mm (per retailer spec sheets)", b: "1.2 in / 30 mm (per retailer spec sheets)" },
    { label: "NCV", a: "Yes, to 600 VAC and 24 VAC thermostat lines", b: "Yes, same behavior" },
    { label: "Wireless", a: "No", b: "Yes — Job Link System app" },
    { label: "Battery", a: "One 9V, ~150h typical", b: "One 9V, ~100h typical (no wireless/backlight)" },
    { label: "Size / weight", a: "205.5 × 67.4 × 45.1 mm, ~265 g", b: "247 × 79 × 48 mm, ~345 g" },
  ],
  differences: [
    "Current range: 400 A on the SC260 against 600 A on the SC480, a 50% higher ceiling.",
    "Safety category: Fieldpiece's operator's manual rates the SC260 CAT III 600V; the SC480's product page states CAT IV 600V / CAT III 1000V outright, which matters at service equipment and higher-voltage panels.",
    "Display resolution: 4,000 counts on the SC260 against a 10,000-count dual display on the SC480 — finer readings and two values on screen at once.",
    "HVACR extras exist only on the SC480: a DC microamp range for flame sensors, inrush mode for motor starting current, active power/VA/VAr/power factor, three-phase rotation, and a VFD low-pass filter.",
    "Wireless: only the SC480 reports to Fieldpiece's Job Link System app; the SC260 is read-off-the-meter only.",
    "Battery life runs the other way: Fieldpiece rates the SC260 at about 150 hours typical and the SC480 at about 100 hours, and the SC480 is the larger, heavier body (345 g against 265 g).",
    "What's identical, despite common assumptions: both are True RMS (the SC260 is not a non-RMS meter), and both share the same 1.2 in / 30 mm jaw per retailer spec sheets — the SC480 isn't a bigger-jaw clamp, just a higher-current, more-instrumented one.",
    "Neither carries our Hands-on Tested badge; both assessments are desk research from Fieldpiece's product pages, its operator's manuals (via this site's already-verified catalog entries) and retailer spec sheets.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          The SC260 and SC480 look almost identical in the hand — same jaw, same backlight behavior, same NCV — and
          the gap between them is really about ceiling and instrumentation, not size. The charts below use
          Fieldpiece&apos;s own published numbers where the product pages give them, and this site&apos;s already
          verified catalog entries (sourced to each model&apos;s operator&apos;s manual) where they don&apos;t.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Maximum AC current, per fieldpiece.com. The SC480&apos;s ceiling is 50% higher.</>}>
            <BarChart
              items={[
                { label: "Fieldpiece SC260", value: 400, display: "400 A" },
                { label: "Fieldpiece SC480", value: 600, display: "600 A", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Display resolution in counts. The SC480&apos;s dual display also shows two readings at once.</>}>
            <BarChart
              items={[
                { label: "Fieldpiece SC260", value: 4000, display: "4,000 counts" },
                { label: "Fieldpiece SC480", value: 10000, display: "10,000 counts", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Weight including battery, per fieldpiece.com. The SC480 is the heavier, larger-bodied meter.</>}>
            <BarChart
              items={[
                { label: "Fieldpiece SC260", value: 265, display: "~265 g" },
                { label: "Fieldpiece SC480", value: 345, display: "~345 g", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Typical battery life, per fieldpiece.com — one 9V in both, rated differently.</>}>
            <BarChart
              items={[
                { label: "Fieldpiece SC480", value: 100, display: "~100 h" },
                { label: "Fieldpiece SC260", value: 150, display: "~150 h", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Two specs that sound like they should differ, don&apos;t. Both pages describe the current and voltage
          functions as True RMS, so the SC260 isn&apos;t a budget average-responding meter next to a True RMS SC480
          — both read distorted HVAC loads (ECM blower motors, variable-speed drives) correctly. And neither
          fieldpiece.com product page states a jaw dimension, but retailer spec sheets for both models agree on the
          same 1.2 in (30 mm) opening, so the SC480&apos;s extra capability doesn&apos;t come with room for a bigger
          conductor or bus bar.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t measure or do</h2>
        <p className="text-muted leading-7 mb-4">
          A compressor doesn&apos;t draw a flat current from the moment it starts. It pulls a brief, large
          locked-rotor spike as the motor comes up to speed, then settles to a much lower running current. Catching
          that spike is one of the clearest, most concrete gaps between these two meters.
        </p>
        <Figure
          caption={
            <>
              A compressor start: the SC480&apos;s inrush mode is built to capture a spike like this; the SC260 has
              no inrush mode and only samples about three times a second via ordinary Max/Min/Hold, which can miss or
              flatten a transient that lasts a fraction of a second. LRA and RLA labels are typical motor behavior,
              not a spec from either meter.
            </>
          }
        >
          <InrushDiagram />
        </Figure>
        <h3 className="text-lg font-semibold mb-2 mt-4">Fieldpiece SC260: the basic compact clamp</h3>
        <p className="text-muted leading-7 mb-4">
          Within its 400 A ceiling, the SC260 covers most single residential and light-commercial AC/R loads: window
          units, split-system condensers, blower motors, control transformers. It reads True RMS current and voltage,
          checks capacitance on run and start capacitors, reads Type K temperature, and its NCV catches a live
          branch circuit or a 24 VAC thermostat line. Fieldpiece&apos;s operator&apos;s manual rates it CAT III 600V,
          which covers panelboards and feeders inside a building but not service equipment or anything the SC480 is
          rated for above 600V. It has no microamp range, so flame-sensor checks aren&apos;t possible, no power or
          phase-rotation functions, and no wireless reporting.
        </p>
        <h3 className="text-lg font-semibold mb-2">Fieldpiece SC480: the instrumented power clamp</h3>
        <p className="text-muted leading-7 mb-4">
          The SC480 does everything the SC260 does, at a higher current ceiling and a higher safety category (CAT
          IV 600V / CAT III 1000V), and adds the jobs a basic clamp can&apos;t touch: a DC microamp range for flame
          sensors, active power, VA, VAr and power factor for equipment efficiency checks, three-phase rotation
          (clip one lead to L1 and probe the others), a low-pass filter so a VFD&apos;s switching carrier doesn&apos;t
          inflate an output reading, and inrush mode for starting current. Readings can report wirelessly to the Job
          Link System app instead of being copied off the meter by hand. Neither meter clamps DC current — both are
          AC-only through the jaw — and Fieldpiece doesn&apos;t publish an exact low-ohm range or current-wattage
          limits for the SC480 on its product page.
        </p>
        <div className="mt-4">
          <KeyIdea title="True RMS on both, despite the common assumption">
            It&apos;s easy to assume the cheaper, simpler-looking SC260 is an average-responding meter and that True
            RMS is the SC480&apos;s upgrade. Fieldpiece&apos;s own SC260 product page states True RMS plainly, and
            this site&apos;s already-verified catalog entry agrees. The real upgrade in the SC480 is current range,
            safety category, display resolution and the HVACR-specific functions above — not the RMS math.
          </KeyIdea>
        </div>
        <div className="mt-4">
          <Callout title="Neither clamps DC current">
            Both meters measure AC current only through the jaw; Fieldpiece lists no DC amps function for either
            model, through the clamp or otherwise. If you need to clamp DC current — a solar string, a battery bank,
            a DC bus — look at a meter built for it, such as{" "}
            <Link href="/multimeters/best-multimeters-for-solar-panel-testing" className={link}>
              the solar-rated clamps in our solar panel testing guide
            </Link>
            , or measure DC current with a shunt and a bench meter instead.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Pick", "One-line reason"]}
          rows={[
            ["Residential split-system and window-unit service under 400 A", "Fieldpiece SC260", "Covers the load, smaller body, about 50% longer battery life"],
            ["Light-commercial rooftop units or 3-phase loads near or above 400 A", "Fieldpiece SC480", "600 A ceiling and CAT IV 600V / CAT III 1000V rating"],
            ["Chasing a furnace or boiler flame-sensor fault", "Fieldpiece SC480", "Only model here with a DC microamp range"],
            ["Diagnosing hard-starting compressors or capacitor failures at startup", "Fieldpiece SC480", "Inrush mode captures the locked-rotor spike; the SC260 can't"],
            ["Checking run/start capacitors or motor-winding temperature only", "Either", "Capacitance and Type K temperature are on both"],
            ["Verifying 3-phase rotation before connecting a compressor or motor", "Fieldpiece SC480", "Only model with a phase-rotation function"],
            ["Commissioning or troubleshooting a VFD-driven blower or pump", "Fieldpiece SC480", "Low-pass filter avoids an inflated carrier reading"],
            ["Logging readings to a tablet or phone for a service report", "Fieldpiece SC480", "Wireless reporting to the Job Link System app"],
            ["A basic backup clamp kept in the truck for occasional use", "Fieldpiece SC260", "Lighter, cheaper, and covers NCV, capacitance and temperature"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Skip the SC480 if your work never crosses 400 A, never needs microamps, inrush, power/PF or phase
          rotation — you&apos;d be paying for electronics that sit unused. Skip the SC260 if any of those jobs are
          regular work, since none of them can be added to it later. For a cheaper step beyond a basic clamp without
          the SC480&apos;s full feature set, see{" "}
          <Link href="/multimeters/fluke-117-vs-fluke-323" className={link}>
            Fluke 117 vs Fluke 323
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/fluke-t5-600-vs-fluke-323" className={link}>
            Fluke T5-600 vs 323
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The trust question with these two</h2>
        <p className="text-muted leading-7 mb-4">
          Neither the SC260 nor the SC480 carries our Hands-on Tested badge — we haven&apos;t bought or used either
          meter. Every figure on this page comes from Fieldpiece&apos;s own SC260 and SC480 product pages (checked
          2026-11-19), from this site&apos;s already-verified catalog entries that cite each model&apos;s operator&apos;s
          manual for numbers the product pages omit (capacitance range, temperature range, the SC480&apos;s exact
          microamp resolution), and from third-party retailer spec sheets for the one figure neither Fieldpiece page
          states at all: jaw opening. Where a number wasn&apos;t confirmed anywhere, we said so rather than guess —
          the SC480&apos;s exact low-ohm range and its wireless radio protocol are both left unstated by Fieldpiece.
        </p>
        <p className="text-muted leading-7">
          For HVACR buyers weighing more than these two, see the full{" "}
          <Link href="/multimeters/best-multimeter-for-hvac-technicians" className={link}>
            best multimeters for HVAC technicians
          </Link>{" "}
          roundup and the{" "}
          <Link href="/multimeters/clamp-meter-buying-guide" className={link}>
            clamp meter buying guide
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "The Fieldpiece SC260 and SC480 share the same 1.2in jaw, the same backlight and NCV behavior, and both are True RMS — the common assumption that the SC480 is the first True RMS model in the pair doesn't hold up against Fieldpiece's own SC260 page. The real split is current range and instrumentation: the SC260 covers 400 A and CAT III 600V work in a lighter, longer-battery-life body; the SC480 covers 600 A at CAT IV 600V / CAT III 1000V and adds DC microamps, inrush mode, power/PF, phase rotation, a VFD filter and wireless Job Link reporting.",
  chooseNeitherIf:
    "You need to clamp DC current, such as a solar string or a battery bank — neither meter has a DC amps function through the jaw, only AC. See our solar panel testing guide for clamps built for DC, or use a shunt with a bench meter.",
  faqs: [
    {
      question: "Is the Fieldpiece SC260 True RMS?",
      answer:
        "Yes. Fieldpiece's own SC260 product page states True RMS for the meter, and this site's already-verified catalog entry agrees. It's a common assumption that only the step-up SC480 is True RMS, but that isn't correct — both models read AC current and voltage as True RMS.",
    },
    {
      question: "What's the real difference between the SC260 and SC480?",
      answer:
        "Current ceiling (400 A against 600 A), safety category (CAT III 600V against CAT IV 600V / CAT III 1000V), display resolution (4,000 against 10,000 counts), and a set of HVACR extras only the SC480 has: DC microamps for flame sensors, inrush mode for starting current, active power/PF, three-phase rotation, a VFD low-pass filter, and wireless reporting to the Job Link app. The jaw opening, NCV behavior and backlight are the same on both.",
    },
    {
      question: "Do the SC260 and SC480 have different jaw sizes?",
      answer:
        "No, as far as published specs show. Neither fieldpiece.com product page states a jaw dimension, but retailer spec sheets for both models (Zoro for the SC260, TestEquipmentDepot for the SC480) independently list the same 1.2 in (30 mm) opening. The SC480's higher current rating comes from its electronics, not a bigger clamp.",
    },
    {
      question: "Can either meter measure DC current?",
      answer:
        "Not through the jaw. Fieldpiece lists AC current only for both the SC260 and SC480's clamp function. The SC480 does add a DC microamp range, but that's read through its test leads for flame-sensor checks, not through the clamp, and it isn't a DC amps range in the ordinary sense.",
    },
    {
      question: "Which one should an HVAC technician buy?",
      answer:
        "If your calls stay under 400 A and CAT III 600V — most residential and light-commercial split systems — the SC260 is lighter, runs longer on a battery and costs less. Choose the SC480 if you also chase flame-sensor microamp faults, diagnose hard-starting compressors with inrush mode, check power factor or phase rotation, or want readings logged wirelessly to the Job Link app.",
    },
  ],
  roundup: { label: "See all multimeter picks", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Best multimeters for HVAC technicians", href: "/multimeters/best-multimeter-for-hvac-technicians" },
    { label: "Clamp meter buying guide", href: "/multimeters/clamp-meter-buying-guide" },
    { label: "How to measure AC current with a clamp meter", href: "/multimeters/how-to-measure-ac-current-with-a-clamp-meter" },
    { label: "Best multimeters for 4-20mA loop testing", href: "/multimeters/best-multimeters-for-4-20ma-loop-testing" },
    { label: "Best multimeters for measuring microamps", href: "/multimeters/best-multimeters-for-measuring-microamps" },
    { label: "How to measure microamps with a multimeter", href: "/multimeters/how-to-measure-microamps-with-a-multimeter" },
    { label: "CAT III vs CAT IV multimeter", href: "/multimeters/cat-iii-vs-cat-iv-multimeter" },
    { label: "Fluke 117 vs Fluke 323", href: "/multimeters/fluke-117-vs-fluke-323" },
    { label: "Fluke T5-600 vs 323", href: "/multimeters/fluke-t5-600-vs-fluke-323" },
    { label: "Best multimeters for solar panel testing", href: "/multimeters/best-multimeters-for-solar-panel-testing" },
    { label: "AC vs DC voltage", href: "/multimeters/ac-vs-dc-voltage" },
    { label: "Why lights flicker when the fridge or AC starts", href: "/multimeters/why-do-my-lights-flicker-when-the-refrigerator-or-ac-starts" },
    { label: "Heat pump using too much electricity in cold weather", href: "/multimeters/why-does-my-heat-pump-use-too-much-electricity-in-cold-weather" },
    { label: "Generator shuts off when I plug in an appliance", href: "/multimeters/why-does-my-portable-generator-shut-off-when-i-plug-in-an-appliance" },
  ],
};

export default function FieldpieceSc260VsFieldpieceSc480Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
