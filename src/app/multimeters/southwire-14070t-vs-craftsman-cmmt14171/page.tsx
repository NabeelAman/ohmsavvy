// Southwire 14070T specs per the Pick (southwire.com 14070T TechnicianPRO page) and the official Amazon listing title
// (https://www.amazon.com/dp/B01MCTPTRC): "TrueRMS Accuracy & Low Z Function - Backlit Display, LED Work Light - IP67
// Waterproof Housing - 11 Functions". Amazon showed it "Currently unavailable" at ZIP 10001 (checked 2026-10-24); the Pick
// carries unavailable -> Fluke 179. Southwire's product URL now returns 404, so ranges and counts are "Not stated" here.
// Craftsman CMMT14171 specs per the official Amazon listing (https://www.amazon.com/dp/B0CF46PFLC): "Automotive Specific
// Measurements: RPM, Temperature, Dwell, Frequency and Duty Cycle"; "Auto Ranging with True RMS function for voltage and
// current"; "CAT III 600V". craftsman.com's product URL returned 404 (checked 2026-10-24).
// Fluke 179 per the Pick (fluke.com 179 page and 170 Series datasheet).
// IEC 61010 impulse withstand values (6 kV for CAT III 600V, 8 kV for CAT III 1000V and CAT IV 600V) are the standard's
// commonly published transient test levels, stated on the page as typical.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/southwire-14070t-vs-craftsman-cmmt14171";

export const metadata = buildMetadata({
  title: "Southwire 14070T vs Craftsman CMMT14171",
  description:
    "Southwire 14070T vs Craftsman CMMT14171: an IP67, CAT IV job-site meter against an automotive meter with RPM, dwell and duty cycle. Specs and who needs which.",
  path: "/multimeters/southwire-14070t-vs-craftsman-cmmt14171",
});

const link = "text-accent hover:underline";

/** Measurement categories in a building, and which rating reaches each zone. */
function CatZonesDiagram() {
  const zones = [
    { x: 8, w: 104, label: "CAT IV", sub: "Service drop, meter", sub2: "base, outdoor feed" },
    { x: 118, w: 104, label: "CAT III", sub: "Panels, feeders,", sub2: "fixed wiring" },
    { x: 228, w: 104, label: "CAT II", sub: "Receptacles and", sub2: "plug-in loads" },
  ];
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram of measurement categories from the utility supply inward: CAT IV at the service drop and meter base, CAT III at panels and fixed wiring, CAT II at receptacles. The Southwire 14070T's CAT IV 600V rating covers all three zones; the Craftsman CMMT14171's CAT III 600V rating stops before the service entrance."
    >
      {zones.map((z, i) => (
        <g key={z.label}>
          <rect x={z.x} y="20" width={z.w} height="78" rx="8" className={i === 0 ? "fill-accent/15 stroke-accent" : "fill-surface stroke-border"} strokeWidth="1.3" />
          <text x={z.x + z.w / 2} y="44" fontSize="12" fontWeight="700" textAnchor="middle" className={i === 0 ? "fill-accent" : "fill-foreground"}>
            {z.label}
          </text>
          <text x={z.x + z.w / 2} y="64" fontSize="9" textAnchor="middle" className="fill-muted">{z.sub}</text>
          <text x={z.x + z.w / 2} y="77" fontSize="9" textAnchor="middle" className="fill-muted">{z.sub2}</text>
        </g>
      ))}
      <text x="8" y="14" fontSize="9" className="fill-muted">Utility side</text>
      <text x="332" y="14" fontSize="9" textAnchor="end" className="fill-muted">Load side</text>
      <rect x="8" y="118" width="324" height="20" rx="5" className="fill-accent" />
      <text x="170" y="132" fontSize="9.5" fontWeight="600" textAnchor="middle" fill="#ffffff">Southwire 14070T: CAT IV 600V / CAT III 1000V</text>
      <rect x="118" y="150" width="214" height="20" rx="5" className="fill-accent/40" />
      <text x="225" y="164" fontSize="9.5" fontWeight="600" textAnchor="middle" className="fill-foreground">Craftsman CMMT14171: CAT III 600V</text>
      <text x="170" y="192" fontSize="9" textAnchor="middle" className="fill-muted">A higher category rating covers every zone to its right at the same voltage.</text>
    </svg>
  );
}

/** Ignition primary signal: dwell is the share of each firing cycle the coil is switched on. */
function DwellDiagram() {
  return (
    <svg
      viewBox="0 0 340 170"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram of an ignition coil primary signal. Each firing cycle has an on period, when current builds in the coil, and an off period that ends with the spark. Duty cycle is the on time as a percentage of the cycle; dwell expresses the same on time in degrees of distributor rotation."
    >
      <path d="M20 40 H70 V110 H150 V40 H200 V110 H280 V40 H320" className="fill-none stroke-accent" strokeWidth="2.2" />
      <text x="110" y="128" fontSize="9.5" textAnchor="middle" className="fill-foreground">coil on (dwell)</text>
      <text x="45" y="32" fontSize="9.5" textAnchor="middle" className="fill-muted">off</text>
      <text x="175" y="32" fontSize="9.5" textAnchor="middle" className="fill-muted">off</text>
      <path d="M70 140 H200" className="stroke-foreground" strokeWidth="1" />
      <path d="M70 135 V145 M200 135 V145" className="stroke-foreground" strokeWidth="1" />
      <text x="135" y="158" fontSize="9.5" textAnchor="middle" className="fill-foreground">one firing cycle (90° on a 4-cylinder distributor)</text>
      <path d="M150 40 l-6 -14 l10 6 l-2 -12" className="fill-none stroke-foreground" strokeWidth="1.2" />
      <text x="160" y="20" fontSize="9" className="fill-muted">spark</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Southwire 14070T vs Craftsman CMMT14171",
  path,
  published: "2026-10-26",
  intro:
    "The Southwire 14070T vs Craftsman CMMT14171 decision follows the work, not the spec sheet. Both are True RMS, auto-ranging meters, but the Southwire is an IP67 job-site meter rated CAT IV 600V / CAT III 1000V with Low Z and a work light, while the Craftsman adds RPM, dwell and duty cycle for vehicles at CAT III 600V. One catch: Amazon currently lists the Southwire as unavailable, so the Fluke 179 is our in-stock stand-in for that side.",
  a: {
    pick: picks.find((p) => p.name === "Southwire 14070T")!,
    reviewHref: "/multimeters/southwire-14070t-review",
    imageAlt: "Southwire 14070T TechnicianPRO waterproof True RMS multimeter, front view",
    chooseIf: [
      "You work outdoors or on job sites where water, dust and drops are a daily risk",
      "You measure at service entrances or outdoor feeds, where CAT IV 600V applies",
      "You chase ghost voltage on building wiring and want a Low Z mode built in",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Craftsman CMMT14171")!,
    reviewHref: "/multimeters/craftsman-cmmt14171-review",
    imageAlt: "Craftsman CMMT14171 automotive True RMS multimeter, front view",
    chooseIf: [
      "You diagnose cars and need RPM, dwell angle or duty-cycle readings",
      "Your household electrical work stays at panels and branch circuits, inside CAT III 600V",
      "You want a meter that is in stock on Amazon today",
    ],
  },
  extraSpecs: [
    { label: "IP rating", a: "IP67 (dust-tight, temporary submersion)", b: "Not stated" },
    { label: "Low Z (ghost voltage)", a: "Yes", b: "Not listed" },
    { label: "Automotive modes", a: "None listed", b: "RPM, dwell, duty cycle" },
    { label: "Temperature", a: "Not stated in our sources", b: "Yes" },
    { label: "Frequency", a: "Not stated in our sources", b: "Yes" },
    { label: "Work light / backlight", a: "LED work light; backlit display", b: "Not stated" },
    { label: "Functions (maker count)", a: "11, per the Amazon listing title", b: "Not stated" },
    { label: "Display counts", a: "Not stated", b: "Not stated" },
    { label: "Amazon availability", a: "Currently unavailable (Fluke 179 suggested)", b: "In stock when checked" },
  ],
  differences: [
    "Safety rating: CAT IV 600V / CAT III 1000V on the Southwire against CAT III 600V on the Craftsman, so only the Southwire is rated for service-entrance work.",
    "The Southwire is IP67-rated and adds an LED work light and a Low Z function against ghost voltage; the Craftsman's listing claims neither.",
    "The Craftsman adds RPM, dwell angle and duty cycle for engine diagnostics, plus temperature and frequency.",
    "Both are True RMS and auto-ranging, so AC readings on distorted waveforms hold up on either.",
    "Amazon lists the Southwire 14070T as currently unavailable; buy buttons on this page send you to the Fluke 179, which keeps CAT IV 600V and True RMS but has no IP67 rating or work light.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">14070T vs CMMT14171 spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Neither maker publishes a full accuracy table we could check: Southwire&apos;s 14070T page now returns an error
          and Craftsman&apos;s product URL does too, so we compare what each maker and official listing actually state.
          That still separates them clearly, because the differences are in ratings and functions, not in decimal places.
        </p>
        <DataTable
          head={["Spec", "Southwire 14070T", "Craftsman CMMT14171"]}
          rows={[
            ["True RMS", "Yes", "Yes (voltage and current)"],
            ["Auto-ranging", "Yes", "Yes"],
            ["Highest CAT rating", "CAT IV 600V", "CAT III 600V"],
            ["CAT III voltage", "1000V", "600V"],
            ["Water and dust", "IP67", "Not stated"],
            ["Ghost-voltage check", "Low Z mode", "Not listed"],
            ["RPM and dwell", "No", "Yes"],
            ["Duty cycle", "Not stated", "Yes"],
            ["Temperature", "Not stated", "Yes"],
            ["Work light", "Built-in LED", "Not stated"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Highest CAT III voltage rating, per each maker&apos;s listing.</>}>
            <BarChart
              items={[
                { label: "Southwire 14070T", value: 1000, display: "CAT III 1000V", highlight: true },
                { label: "Craftsman CMMT14171", value: 600, display: "CAT III 600V" },
              ]}
            />
          </Figure>
          <Figure caption={<>Typical IEC 61010 impulse test level behind each rating, in kV. Higher means bigger surges survived.</>}>
            <BarChart
              items={[
                { label: "CAT IV 600V (Southwire)", value: 8, display: "8 kV", highlight: true },
                { label: "CAT III 1000V (Southwire)", value: 8, display: "8 kV", highlight: true },
                { label: "CAT III 600V (Craftsman)", value: 6, display: "6 kV" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The second chart uses the transient levels commonly published for the IEC 61010 categories, not a figure either
          maker prints, so treat it as typical. The point is the gap: a CAT IV 600V meter is built to survive a larger
          surge than a CAT III 600V meter, which is why the rating, not the display, decides whether a meter belongs at a
          meter base.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What CAT IV buys you on a job site</h2>
        <p className="text-muted leading-7 mb-4">
          Measurement categories describe where in a building a meter is used. Closer to the utility supply, a lightning
          strike or switching surge has more energy behind it, so the category climbs. The Craftsman&apos;s CAT III 600V
          covers distribution panels, feeders and fixed wiring, which is everything inside a typical house. The Southwire
          adds CAT IV 600V, the category for the service drop, meter base and outdoor feeds.
        </p>
        <Figure caption={<>Measurement categories from the utility supply inward, and how far each meter&apos;s rating reaches.</>}>
          <CatZonesDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Add IP67 and the gap widens for outdoor work. The 6 means dust-tight and the 7 means protection against
          temporary immersion, so rain, puddles and drywall grit are routine rather than fatal. The Low Z function draws
          enough current to collapse a phantom reading on an abandoned conductor; our guide to{" "}
          <Link href="/multimeters/how-to-measure-voltage-on-a-floating-ground-circuit" className={link}>
            spotting phantom voltage on a floating circuit
          </Link>{" "}
          explains the mechanism.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What RPM, dwell and duty cycle do in the garage</h2>
        <p className="text-muted leading-7 mb-4">
          The Craftsman&apos;s extra modes read the timing of a switched signal rather than just its voltage. Duty cycle
          is the percentage of each cycle a signal is on. Dwell is the same idea in degrees of distributor rotation:
          dwell = duty cycle × 360 ÷ number of cylinders. On a four-cylinder engine each firing cycle spans 90°, so a 50%
          duty cycle works out to 45° of dwell. Those numbers are worked arithmetic, not a spec for any engine; check
          your service manual for the target.
        </p>
        <Figure caption={<>Dwell and duty cycle describe the same on time: as a percentage, or in distributor degrees.</>}>
          <DwellDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Dwell matters mostly on older engines with points or a distributor. Duty cycle is the more useful mode on
          modern cars: fuel injectors, idle-air valves, purge solenoids and many fans are driven by PWM signals, and the
          percentage tells you what the engine computer is commanding. Our guides to{" "}
          <Link href="/multimeters/how-to-test-a-fuel-injector-with-a-multimeter" className={link}>
            testing a fuel injector
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/how-to-test-a-solenoid-coil-with-a-multimeter" className={link}>
            testing a solenoid coil
          </Link>{" "}
          put those modes to work. The Southwire&apos;s listing names no automotive modes, so it can check battery
          voltage and continuity on a car but not these timing measurements.
        </p>
        <div className="mt-4">
          <KeyIdea title="The Southwire is unavailable: what replaces it">
            The 14070T&apos;s Amazon listing shows it as currently unavailable, so buy buttons for it on this page go to
            the Fluke 179. The 179 keeps the parts of the Southwire that matter for electrical safety, CAT IV 600V,
            CAT III 1000V and True RMS, and adds temperature and a 6,000-count display with bar graph. It doesn&apos;t
            claim IP67 or a work light. See{" "}
            <Link href="/multimeters/fluke-117-vs-fluke-179" className={link}>
              Fluke 117 vs Fluke 179
            </Link>{" "}
            for how it compares with Fluke&apos;s electrician model.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Southwire 14070T vs Craftsman CMMT14171: which should you buy?</h2>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["DIY mechanic on a classic car with points", "Craftsman CMMT14171", "Dwell and RPM read the ignition directly"],
            ["Technician checking injectors and PWM solenoids", "Craftsman CMMT14171", "Duty cycle shows what the computer commands"],
            ["Electrician working at meter bases and outdoor feeds", "Southwire 14070T (or Fluke 179)", "Only these carry CAT IV 600V"],
            ["Irrigation, pool or outdoor lighting installer", "Southwire 14070T", "IP67 survives rain and puddles"],
            ["Homeowner fixing outlets and switches", "Either", "Both are True RMS and CAT III 600V or better"],
            ["Someone who needs a meter this week", "Craftsman CMMT14171", "In stock on Amazon; the Southwire is not"],
            ["Electrician chasing ghost voltage", "Southwire 14070T", "Low Z collapses phantom readings"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For a broader shortlist, see our{" "}
          <Link href="/multimeters/best-multimeter-for-automotive" className={link}>
            best multimeter for automotive
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/best-multimeter-for-electricians" className={link}>
            best multimeter for electricians
          </Link>{" "}
          guides.
        </p>
      </section>

      <Callout title="Safety: match the rating to the point you probe">
        A CAT III 600V meter like the Craftsman is not rated for the service drop, meter base or an outdoor feeder,
        whatever the voltage reads. Use a CAT IV meter there, wear rated gloves and eye protection, and test live-dead-live
        on a known source before touching a conductor. Meter-base and service work is a job for a licensed electrician or
        the utility. In a car, disconnect the battery before probing airbag circuits.
      </Callout>
    </>
  ),
  bottomLine:
    "Pick by the work. For vehicles, the Craftsman CMMT14171 is the one with dedicated RPM, dwell and duty-cycle modes, and it is in stock. For outdoor electrical work or anything that needs CAT IV protection, the Southwire 14070T was built for it, but with Amazon listing it as unavailable, the Fluke 179 is the CAT IV True RMS meter to buy instead. Either way, buying the wrong one means paying for features you won't use.",
  faqs: [
    {
      question: "Which meter has the higher safety rating?",
      answer:
        "The Southwire 14070T, rated CAT IV 600V and CAT III 1000V. The Craftsman CMMT14171 is rated CAT III 600V, which covers household panels and building wiring but not the service entrance or outdoor feeders. If you need that higher rating and the Southwire is unavailable, the Fluke 179 carries the same pair of ratings.",
    },
    {
      question: "Can the Craftsman CMMT14171 be used on household wiring?",
      answer:
        "Yes, within its CAT III 600V rating, which covers receptacles, switches, panels and branch circuits. Its True RMS function keeps readings honest on dimmers and LED drivers. It has no Low Z mode in its listing, so a disconnected wire next to a live one can show a misleading phantom voltage; confirm with a load before trusting it.",
    },
    {
      question: "Is the Southwire 14070T discontinued?",
      answer:
        "We can't confirm that from Southwire, whose product page for it now returns an error. What we can confirm is that Amazon's listing for it shows currently unavailable, with no date for restocking. Until that changes we point buyers to the Fluke 179, which matches its CAT IV 600V and CAT III 1000V ratings.",
    },
    {
      question: "How do I convert duty cycle to dwell angle?",
      answer:
        "Multiply the duty cycle by 360 and divide by the number of cylinders. On a four-cylinder engine each firing cycle is 90 degrees, so 40% duty is 36 degrees of dwell and 50% is 45 degrees. A meter with a dwell mode, like the Craftsman, does that arithmetic for you once you select the cylinder count.",
    },
    {
      question: "Do I need RPM on a multimeter if my car has a tachometer?",
      answer:
        "Not for a quick idle check, since the dash gauge shows engine speed. A meter's RPM mode helps on vehicles without a tach, on small engines and equipment, and when you want to log idle speed while adjusting something under the hood. For most modern cars, duty cycle is the more useful of the Craftsman's automotive modes.",
    },
  ],
  roundup: {
    label: "See the full multimeter roundup",
    href: "/multimeters/best-multimeters",
  },
  related: [
    { label: "Southwire 14070T review", href: "/multimeters/southwire-14070t-review" },
    { label: "Craftsman CMMT14171 review", href: "/multimeters/craftsman-cmmt14171-review" },
    { label: "Fluke 117 vs Fluke 179", href: "/multimeters/fluke-117-vs-fluke-179" },
    { label: "Best multimeter for automotive", href: "/multimeters/best-multimeter-for-automotive" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
  ],
};

export default function Southwire14070TVsCraftsmanCmmt14171Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
