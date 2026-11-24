// AstroAI DM6000AR (ASIN B071JL6LLL) per the official Amazon listing's A+ "Specifications" table and bullets, as cited
// on /multimeters/fluke-117-vs-astroai-dm6000ar (read 2026-11-04): 5,999 counts; 2 samples/s; auto or manual range;
// operating 0-40 °C; one 9V 6F22 battery; 190 × 90 × 35 mm; approx 357 g (item-weight field says 492 g); "EN 61010-1
// CAT III 600V, CATII 1000V"; DC V 6/60/600 V ±(0.8% + 3), 1000 V ±(1% + 5); AC V 6/60/600 V ±(1.2% + 6), 750 V
// ±(1.2% + 8); DC A 600 µA to 600 mA ±(0.8% + 5), 6 A / 10 A ±(1.5% + 3); resistance to 60 MΩ; capacitance 60 nF to
// 60 mF, no accuracy; temperature -40 to 1,370 °C; True RMS on AC volts and current; F400mA/600V and F10A/600V fuses;
// backlit LCD, data hold. astroai.com /ap/100019 comparison table: no NCV, no VFD/LoZ, no inrush; its box list names a
// K-type thermocouple while Amazon's doesn't (conflict). No warranty term ("Hassle-Free Warranty"). No CAT rating on
// astroai.com.
// UNI-T UT139C (ASIN B081RBJ94W) per https://meters.uni-trend.com/product/ut139-series/, as cited on
// /multimeters/uni-t-ut139c-review (checked 2026-10-26): 6000 counts; DC V 600 V ±(0.5% + 2); AC V 600 V ±(0.8% + 3),
// True RMS, 45 Hz-1 kHz; DC A 10 A ±(0.7% + 2); AC A 10 A ±(1% + 3); resistance to 60 MΩ (series table flattened);
// capacitance to 99.99 mF ±(4% + 5); frequency 10 Hz-10 MHz; temperature -40 to 1000 °C, probe included; duty cycle;
// NCV; auto and manual ranging; MAX/MIN/REL, hold, backlight; CAT III 600V; two 1.5 V AA cells; 170 × 80 × 48 mm; 354 g.
// LoZ is listed for the UT139E/S, not the UT139C. Smaller current ranges are not broken out in the series table.
// Amazon availability at ZIP 10001 with Chrome, 2026-11-24: both show #add-to-cart-button.
// Tolerance figures are arithmetic on the published specs; the 12 V and 120 V readings are illustrative.
// Neither meter is hands-on tested by OhmSavvy.
import Link from "@/components/AppLink";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/astroai-dm6000ar-vs-uni-t-ut139c";
const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;
const ut139c = picks.find((p) => p.name === "UNI-T UT139C")!;

export const metadata = buildMetadata({
  title: "AstroAI DM6000AR vs UNI-T UT139C",
  description:
    "AstroAI DM6000AR vs UNI-T UT139C: two 6,000-count True RMS budget meters. Tolerance math on 12 V and 120 V, NCV, microamps and which one to buy.",
  path: "/multimeters/astroai-dm6000ar-vs-uni-t-ut139c",
  image: ut139c.image,
});

const link = "text-accent hover:underline";

/**
 * Worst-case tolerance windows for an illustrative 12.00 V DC reading, drawn to scale (1000 px per volt):
 * UT139C ±0.08 V, DM6000AR ±0.13 V (rounded from 0.126 V).
 */
function ToleranceDiagram() {
  const cx = 200;
  const k = 1000;
  const rows = [
    { name: "UNI-T UT139C", tol: 0.08, y: 70, label: "11.92 to 12.08 V" },
    { name: "AstroAI DM6000AR", tol: 0.126, y: 130, label: "11.87 to 12.13 V" },
  ];
  return (
    <svg
      viewBox="0 0 400 180"
      className="w-full h-auto"
      role="img"
      aria-label="Tolerance windows for a display of 12.00 volts DC, drawn to scale: the UNI-T UT139C's published spec puts the true value between 11.92 and 12.08 volts, while the AstroAI DM6000AR's spec allows 11.87 to 12.13 volts, a window about 1.6 times wider."
    >
      <text x={cx} y="16" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">Display reads 12.00 V DC: where the true value can be</text>
      <path d={`M${cx} 30 V160`} className="stroke-muted" strokeWidth="1" strokeDasharray="3 3" />
      <text x={cx} y="174" fontSize="8.5" textAnchor="middle" className="fill-muted">12.00 V</text>
      {rows.map((r) => (
        <g key={r.name}>
          <text x={cx} y={r.y - 14} fontSize="9.5" fontWeight="700" textAnchor="middle" className="fill-foreground">{r.name}</text>
          <rect x={cx - r.tol * k} y={r.y - 8} width={2 * r.tol * k} height="16" rx="3" className="fill-accent/30 stroke-accent" strokeWidth="1.2" />
          <circle cx={cx} cy={r.y} r="3" className="fill-foreground" />
          <text x={cx} y={r.y + 22} fontSize="8.5" textAnchor="middle" className="fill-muted">{r.label}</text>
        </g>
      ))}
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "AstroAI DM6000AR vs UNI-T UT139C",
  path,
  published: "2026-11-24",
  intro:
    "AstroAI DM6000AR vs UNI-T UT139C is a choice between two budget 6,000-count, True RMS meters that both offer auto and manual ranging and a temperature function. The UT139C has the tighter published accuracy, a built-in NCV detector and a maker page that states its specs. The DM6000AR reads higher voltages on its display, adds microamp ranges with stated accuracy, and costs less, but its CAT rating appears only on Amazon.",
  a: {
    pick: astro,
    imageAlt: "AstroAI DM6000AR True RMS 6000-count digital multimeter",
    chooseIf: [
      "You want published microamp and milliamp current ranges, from 600 µA up",
      "You check DC sources above 600 V on the display, up to its 1000 V range",
      "You want the lowest-cost True RMS meter of the two",
      "You don't need a non-contact voltage detector",
    ],
  },
  b: {
    pick: ut139c,
    imageAlt: "UNI-T UT139C True RMS digital multimeter",
    chooseIf: [
      "You want the tighter accuracy: ±(0.5% + 2) on DC volts against ±(0.8% + 3)",
      "You want built-in NCV to find live wires before probing",
      "You want MAX/MIN and relative modes as well as hold",
      "You prefer specs published on the maker's own website, not only on Amazon",
    ],
  },
  extraSpecs: [
    { label: "DC volts accuracy", a: "±(0.8% + 3) to 600 V; ±(1% + 5) at 1000 V", b: "±(0.5% + 2), 600 V" },
    { label: "AC volts accuracy", a: "±(1.2% + 6) to 600 V; 750 V top", b: "±(0.8% + 3), 45 Hz to 1 kHz" },
    { label: "DC current", a: "600 µA to 600 mA ±(0.8% + 5); 10 A ±(1.5% + 3)", b: "10 A ±(0.7% + 2); low ranges not broken out" },
    { label: "Capacitance", a: "60 nF to 60 mF, accuracy not stated", b: "To 99.99 mF, ±(4% + 5)" },
    { label: "Temperature", a: "−40 to 1,370 °C; probe listed on astroai.com only", b: "−40 to 1000 °C, probe included" },
    { label: "NCV", a: "No", b: "Yes" },
    { label: "Modes", a: "Hold, backlight", b: "MAX/MIN, REL, hold, backlight" },
    { label: "CAT rating", a: "CAT III 600V, CAT II 1000V (Amazon listing only)", b: "CAT III 600V (UNI-T)" },
    { label: "Battery", a: "One 9V (6F22)", b: "Two AA" },
    { label: "Size and weight", a: "190 × 90 × 35 mm, about 357 g", b: "170 × 80 × 48 mm, 354 g" },
  ],
  differences: [
    "Accuracy: UNI-T publishes ±(0.5% + 2) on DC volts and ±(0.8% + 3) on AC volts; AstroAI's figures are ±(0.8% + 3) and ±(1.2% + 6).",
    "NCV: the UT139C has a non-contact voltage detector. AstroAI's own comparison table marks NCV as absent on the DM6000AR.",
    "Display range: the DM6000AR shows up to 1000 V DC and 750 V AC; the UT139C tops out at 600 V. Both are CAT III 600V, so that headroom is a display range, not extra safety.",
    "Current: AstroAI lists accuracy for 600 µA, 6,000 µA, 60 mA and 600 mA ranges. UNI-T's series table states the 10 A range only.",
    "Sources: UNI-T publishes the UT139C's specs on its own site. The DM6000AR's accuracy table and CAT rating appear only on its Amazon listing.",
    "Power: the AstroAI runs on one 9V battery, the UNI-T on two AA cells. The two weigh about the same, roughly 355 g.",
    "Neither meter carries our Hands-on Tested badge; this is desk research from published specs.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Accuracy, worked through</h2>
        <p className="text-muted leading-7 mb-4">
          Both meters show 6,000 counts, so on the 60 V range each displays 0.01 V steps and on the 600 V range 0.1 V
          steps. What differs is the tolerance each maker stands behind. Take an illustrative 12.00 V reading on a car
          battery: the UT139C allows 0.5% of 12.00 V (0.06 V) plus 2 digits (0.02 V), so ±0.08 V. The DM6000AR allows 0.8%
          (0.096 V) plus 3 digits (0.03 V), so about ±0.13 V.
        </p>
        <Figure caption={<>Tolerance windows on an illustrative 12.00 V DC reading, from each maker&apos;s published spec.</>}>
          <ToleranceDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          On 120.0 V AC mains the gap widens. The UT139C&apos;s ±(0.8% + 3) gives 0.96 V plus 0.3 V, about ±1.3 V. The
          DM6000AR&apos;s ±(1.2% + 6) gives 1.44 V plus 0.6 V, about ±2.0 V. Neither is a problem for deciding whether an
          outlet is live or a battery is charged, but if you compare readings against a spec sheet, the UNI-T gives you
          less to argue about.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <Figure caption={<>Worst-case error on 12.00 V DC, in millivolts. Shorter is better.</>}>
            <BarChart
              items={[
                { label: "UNI-T UT139C", value: 80, display: "±80 mV", highlight: true },
                { label: "AstroAI DM6000AR", value: 126, display: "±126 mV" },
              ]}
            />
          </Figure>
          <Figure caption={<>Worst-case error on 120.0 V AC, in volts. Shorter is better.</>}>
            <BarChart
              items={[
                { label: "UNI-T UT139C", value: 1.26, display: "±1.26 V", highlight: true },
                { label: "AstroAI DM6000AR", value: 2.04, display: "±2.04 V" },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Features you will notice</h2>
        <h3 className="text-lg font-semibold mb-2">UNI-T UT139C: NCV and more modes</h3>
        <p className="text-muted leading-7 mb-4">
          The UT139C&apos;s NCV sensor lets you sweep a wall box or cord for voltage before you touch anything, which
          makes it a better first meter for household electrical work. MAX/MIN catches the lowest voltage during an engine
          crank, and REL zeroes out test-lead resistance or a baseline reading. UNI-T also includes the thermocouple probe,
          and its capacitance range has a stated ±(4% + 5) accuracy. Its two AA cells are easier to find than a 9V in most
          kitchen drawers.
        </p>
        <h3 className="text-lg font-semibold mb-2">AstroAI DM6000AR: current ranges and a 1000 V display</h3>
        <p className="text-muted leading-7 mb-4">
          AstroAI publishes accuracy for four small DC current ranges, from 600 µA to 600 mA, plus 6 A and 10 A. That is
          useful for checking a device&apos;s sleep current or a parasitic draw on a car battery, where most of the
          answer lies in milliamps. Its display reads to 1000 V DC and 750 V AC, but the CAT III 600V rating on its listing
          still sets the safe working limit. The listing and AstroAI&apos;s own site disagree on whether a thermocouple is
          in the box and on the weight, so check the box contents when it arrives.
        </p>
        <KeyIdea title="A spec on Amazon is not the same as a spec on a datasheet">
          Every accuracy figure and the CAT rating for the DM6000AR come from its Amazon listing; AstroAI&apos;s product
          page states no CAT rating at all. UNI-T publishes the UT139C&apos;s accuracy and CAT III 600V on its own website.
          Both figures may be honest, but only one maker has put its name to them on a page it controls.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which one fits your work?</h2>
        <DataTable
          head={["Use", "Pick", "Why"]}
          rows={[
            ["First meter for outlets, switches and light fixtures", "UNI-T UT139C", "NCV plus tighter AC accuracy"],
            ["Hunting a parasitic battery drain in a car", "AstroAI DM6000AR", "Stated 60 mA and 600 mA ranges"],
            ["Watching battery voltage dip during cranking", "UNI-T UT139C", "MAX/MIN records the low point"],
            ["Measuring a device's microamp sleep current", "AstroAI DM6000AR", "600 µA range with stated accuracy"],
            ["Oven or pipe temperature with the meter alone", "UNI-T UT139C", "UNI-T includes the probe"],
            ["Checking a variable-speed motor's AC current", "Either", "Both are True RMS on AC current"],
          ]}
        />
        <div className="mt-4">
          <Callout title="Budget meters and mains">
            Both meters are rated CAT III 600V at best, which covers household outlets and panels, not the meter base or
            service entrance. Inspect the test leads before every mains measurement, keep fingers behind the probe guards,
            and never measure current by putting the leads across a live outlet. If a reading suggests a wiring fault,
            switch off the breaker and call a licensed electrician.
          </Callout>
        </div>
        <p className="text-muted leading-7 mt-4">
          Each meter has its own review, the{" "}
          <Link href="/multimeters/astroai-dm6000ar-review" className={link}>
            AstroAI DM6000AR review
          </Link>{" "}
          and the{" "}
          <Link href="/multimeters/uni-t-ut139c-review" className={link}>
            UNI-T UT139C review
          </Link>
          . To see how each stacks up against a Fluke, read{" "}
          <Link href="/multimeters/fluke-117-vs-astroai-dm6000ar" className={link}>
            Fluke 117 vs AstroAI DM6000AR
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/fluke-117-vs-uni-t-ut139c" className={link}>
            Fluke 117 vs UNI-T UT139C
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "The UNI-T UT139C is the better all-round budget meter: tighter published accuracy, built-in NCV, MAX/MIN and REL, an included temperature probe, and specs on UNI-T's own site. The AstroAI DM6000AR makes sense if you need its small, specified current ranges for battery-drain and sleep-current work, or simply the lower price.",
  chooseNeitherIf:
    "You do regular panel or service work and want a LoZ mode for ghost voltages and a maker-backed multi-year warranty. Neither budget meter offers LoZ, so look at the Fluke 117 instead.",
  faqs: [
    {
      question: "Are the AstroAI DM6000AR and UNI-T UT139C both True RMS?",
      answer:
        "Yes. AstroAI's Amazon listing states True RMS for AC voltage and current on the DM6000AR, and UNI-T lists True RMS for the UT139C with an AC voltage bandwidth of 45 Hz to 1 kHz. AstroAI doesn't state a frequency band for its AC voltage spec, so on high-frequency AC the UNI-T has the clearer specification.",
    },
    {
      question: "Which is more accurate, the DM6000AR or the UT139C?",
      answer:
        "The UT139C, on published specs. UNI-T lists ±(0.5% + 2) for DC volts and ±(0.8% + 3) for AC volts. AstroAI lists ±(0.8% + 3) and ±(1.2% + 6). On a 12.00 V reading that works out to about ±0.08 V against ±0.13 V. Both are fine for household and automotive checks.",
    },
    {
      question: "Does the AstroAI DM6000AR have NCV?",
      answer:
        "No. AstroAI's own model comparison table marks non-contact voltage as absent on the DM6000AR, along with LoZ and inrush current. The UNI-T UT139C includes an NCV sensor, so it can flag a live wire or cord before you probe it. That alone makes the UT139C the better pick for home electrical work.",
    },
    {
      question: "What battery does each meter use?",
      answer:
        "The AstroAI DM6000AR takes one 9V (6F22) battery, which AstroAI includes. The UNI-T UT139C takes two 1.5 V AA cells. Neither maker publishes a battery life figure on the pages we used. Spare AA cells are cheaper and easier to find, but a single 9V is a quicker swap.",
    },
    {
      question: "Can these meters measure 1000 volts?",
      answer:
        "Only the AstroAI's display goes that high, with a 1000 V DC and 750 V AC range, and its Amazon listing adds a CAT II 1000V rating for plug-in equipment. The UNI-T stops at 600 V. For anything wired into a building, both are limited to CAT III 600V, so don't use either on higher-voltage systems.",
    },
  ],
  roundup: { label: "See all multimeter picks", href: "/multimeters/best-multimeters" },
  related: [
    { label: "AstroAI DM6000AR review", href: "/multimeters/astroai-dm6000ar-review" },
    { label: "UNI-T UT139C review", href: "/multimeters/uni-t-ut139c-review" },
    { label: "Fluke 117 vs AstroAI DM6000AR", href: "/multimeters/fluke-117-vs-astroai-dm6000ar" },
    { label: "Fluke 101 vs AstroAI DM6000AR", href: "/multimeters/fluke-101-vs-astroai-dm6000ar" },
    { label: "Fluke 117 vs UNI-T UT139C", href: "/multimeters/fluke-117-vs-uni-t-ut139c" },
    { label: "KAIWEETS KM200s vs UNI-T UT139C", href: "/multimeters/kaiweets-km200s-vs-uni-t-ut139c" },
    { label: "UNI-T UT139C vs UNI-T UT61E+", href: "/multimeters/uni-t-ut139c-vs-uni-t-ut61e-plus" },
    { label: "Best True RMS multimeters under $100", href: "/multimeters/best-true-rms-multimeters-under-100" },
  ],
};

export default function AstroaiDm6000arVsUniTUt139cPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
