// Specs per maker sources, checked 2026-10-29:
// - Fluke 117: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-117 (spec tab) and the
//   114/115/116/117 datasheet (2793260b), as cited on /multimeters/fluke-117-review and
//   /multimeters/fluke-117-vs-klein-mm400: True RMS; CAT III 600V; 6,000 counts + 33-segment bar graph; DC V
//   ±(0.5% + 2); AC V ±(1.0% + 3) 45-500 Hz; AutoVolt LoZ input about 3 kΩ, ±(2.0% + 3); VoltAlert non-contact
//   detection; 6.000 A / 10.00 A AC and DC (1 mA best resolution, no µA range), 20 A for 30 s; 40.00 MΩ; 9,999 µF;
//   50.00 kHz; no temperature (116 only); Min/Max/Average; backlight; 167 x 84 x 46 mm; 550 g; one 9 V battery,
//   about 400 h; 3-year warranty.
// - KAIWEETS HT118A: the Pick (KAIWEETS HT118A user manual: CAT III 1000V / CAT IV 600V, 1000 V DC / 750 V AC,
//   600 µA range at 0.1 µA, 2 x AA; kaiweets.com 3-year warranty) and the kaiweets.com product page spec table
//   (https://kaiweets.com/products/ht118a-digital-multimeter, checked 2026-10-29): 6,000 counts; DC V 600 mV-1000 V
//   ±(0.5% + 3); AC V to 750 V ±(0.8% + 3); DC and AC current 600 µA, 6000 µA, 60 mA, 600 mA ±(1.0% + 3), 10 A
//   ±(1.5% + 3); resistance to 60 MΩ ±(0.8% + 5); capacitance 10 nF to 10 mF ±(4.0% + 3), 100 mF ±(5.0% + 3);
//   frequency 10 Hz to 10 MHz ±(1.0% + 3); duty cycle 1-99%; temperature -40 to 1000 °C / -40 to 1832 °F, K-type
//   probe included; NCV; Live-wire alarm; Min/Max/Average; data hold; flashlight; kickstand; backlight; 3-year warranty.
//   No LoZ mode and no input impedance listed. Weight 550 g per its Amazon listing (as cited on
//   /multimeters/best-multimeter-for-beginners and /multimeters/best-multimeter-for-home-use).
// Conflicts stated on the page: kaiweets.com descriptive text says 600V AC/DC while its spec table and the manual give
// 1000 V DC / 750 V AC; the product page says 2 x AAA while the manual (per the Pick) says 2 x AA; the product page
// gives the display as 2.9" in one place and 2.7" in another.
// Amazon (Playwright, Chrome, ZIP 10001, 2026-10-29): B000O3LUEI and B07SHLS639 both in stock with Add to Cart.
// Price gap stated only as a rough ratio. Fluke 117 is owner hands-on tested; the HT118A assessment is desk research.
// Worked readings are arithmetic on the published specs, not measurements.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea, MeterReadout } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { pickByName } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-117-vs-kaiweets-ht118a";
const fluke = pickByName("Fluke 117")!;
const kaiweets = pickByName("KAIWEETS HT118A")!;

export const metadata = buildMetadata({
  title: "Fluke 117 vs KAIWEETS HT118A: Worth the Cost?",
  description:
    "Fluke 117 vs KAIWEETS HT118A: the budget meter has more functions, the Fluke adds LoZ and consistent ratings. When the extra cost pays off, and when it won't.",
  image: fluke.image,
  path: "/multimeters/fluke-117-vs-kaiweets-ht118a",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 117 vs KAIWEETS HT118A: Is Fluke Worth the Extra Cost?",
  path,
  published: "2026-10-29",
  intro:
    "Fluke 117 vs KAIWEETS HT118A: the Fluke cost roughly six to seven times as much on Amazon when we checked, and the KAIWEETS lists more functions. Homeowners, car and HVAC hobbyists should buy the HT118A for its microamp range, temperature probe and 1000 V rating. Electricians who prove circuits dead every day should pay for the 117: its LoZ mode rejects ghost voltages, and Fluke's ratings agree across every document it publishes.",
  a: {
    pick: fluke,
    imageAlt: "Fluke 117 electrician's True RMS multimeter with VoltAlert, front view",
    chooseIf: [
      "You verify de-energized circuits for a living and want LoZ to rule out ghost voltages",
      "You want a meter whose safety rating reads the same on the product page, datasheet and meter",
      "You'd rather buy the meter we bought and tested on our own bench",
    ],
  },
  b: {
    pick: kaiweets,
    imageAlt: "KAIWEETS HT118A True RMS digital multimeter with kickstand, front view",
    chooseIf: [
      "You need microamps for flame sensors or milliamps for a car's parasitic draw",
      "You want a K-type temperature probe and capacitance well past 9,999 µF",
      "Your budget is closer to a pair of test leads than to a Fluke",
    ],
  },
  extraSpecs: [
    { label: "Safety category", a: "CAT III 600V", b: "CAT III 1000V / CAT IV 600V (manual)" },
    { label: "Max voltage", a: "600V AC/DC", b: "1000V DC / 750V AC (maker's text also says 600V)" },
    { label: "AC volts accuracy", a: "±(1.0% + 3)", b: "±(0.8% + 3)" },
    { label: "LoZ (ghost-voltage) mode", a: "Yes, AutoVolt about 3 kΩ", b: "Not listed" },
    { label: "Non-contact voltage", a: "VoltAlert", b: "NCV plus Live-wire alarm" },
    { label: "Lowest current range", a: "6.000 A (1 mA steps)", b: "600 µA (0.1 µA steps)" },
    { label: "Capacitance", a: "To 9,999 µF", b: "To 100 mF" },
    { label: "Temperature", a: "No", b: "-40°F to 1832°F, probe included" },
    { label: "Battery", a: "One 9V, about 400 h", b: "2 × AA (manual) or 2 × AAA (product page)" },
    { label: "Weight / warranty", a: "550 g / 3 years", b: "550 g (Amazon listing) / 3 years" },
  ],
  differences: [
    "The Fluke 117 has AutoVolt LoZ, a low-impedance input of about 3 kΩ that drains ghost voltages; KAIWEETS lists no LoZ mode for the HT118A.",
    "The HT118A reads current from a 600 µA range in 0.1 µA steps; the 117's smallest current step is 1 mA.",
    "The HT118A adds a K-type temperature probe, capacitance to 100 mF and frequency to 10 MHz; the 117 has no temperature input and stops at 9,999 µF and 50 kHz.",
    "KAIWEETS's manual rates the HT118A CAT III 1000V / CAT IV 600V, but its own product text also says 600V AC/DC; Fluke's 117 documents all say CAT III 600V.",
    "On paper the HT118A's AC volts spec is slightly tighter, ±(0.8% + 3) against the 117's ±(1.0% + 3); DC volts are close at ±(0.5% + 3) and ±(0.5% + 2).",
    "Both carry a 3-year warranty; the Fluke runs on one 9V battery rated for about 400 hours.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">The feature count favors KAIWEETS by a wide margin</h2>
        <p className="text-muted leading-7 mb-4">
          Put the two spec sheets side by side and the HT118A covers more ground. It measures microamps, milliamps,
          temperature, frequency to 10 MHz and capacitance to 100 mF, and adds a flashlight, a kickstand and a
          Live-wire alarm. The 117&apos;s function list is shorter: volts, amps from 6 A up, resistance, continuity,
          capacitance, frequency to 50 kHz and its two electrician&apos;s tools, VoltAlert and AutoVolt LoZ.
        </p>
        <p className="text-muted leading-7 mb-4">
          Worked example: tracking an illustrative 25 mA parasitic drain on a parked truck. The HT118A in series on its
          60 mA range shows 25.00 mA, and KAIWEETS&apos;s ±(1.0% + 3 digits) spec gives ±(0.25 + 0.03) = ±0.28 mA. The
          117 has to use its 6 A range, where the display reads 0.025 A in 1 mA steps, so a 2 or 3 mA circuit behind one
          fuse changes the display by only two or three digits. For automotive and battery work that difference is decisive, and the{" "}
          <Link href="/multimeters/best-multimeter-for-automotive" className={link}>
            best multimeter for automotive
          </Link>{" "}
          guide ranks the HT118A on exactly that basis.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Fluke 117 on a 25 mA drain: 6 A range, 1 mA steps. Illustrative display.</>}>
            <MeterReadout value="0.025" unit="A DC" mode="6 A range" />
          </Figure>
          <Figure caption={<>KAIWEETS HT118A on the same drain: 60 mA range, 0.01 mA steps. Illustrative display.</>}>
            <MeterReadout value="25.00" unit="mA DC" mode="60 mA range" />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The same logic applies to furnace flame sensors, whose signal is typically a few microamps. The HT118A&apos;s
          600 µA range shows it in 0.1 µA steps; the 117 cannot display it at all. Our{" "}
          <Link href="/multimeters/best-multimeters-for-measuring-microamps" className={link}>
            microamp meter picks
          </Link>{" "}
          go further on that job.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What the Fluke 117 does that the HT118A doesn&apos;t: LoZ on a dead circuit</h2>
        <p className="text-muted leading-7 mb-4">
          The 117&apos;s case rests on one job: confirming that a conductor is dead before you touch it. A
          high-impedance meter can show tens of volts on a disconnected wire that runs beside a live one, because
          capacitive coupling puts a voltage on it that has almost no current behind it. Fluke&apos;s AutoVolt position
          switches the input to about 3 kΩ, which drains that coupled voltage away, and it selects AC or DC on its own.
          KAIWEETS publishes no LoZ mode and no input impedance figure for the HT118A, so it cannot do this.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>A high-impedance meter on an abandoned conductor sharing a conduit with a live circuit. Illustrative ghost reading.</>}>
            <MeterReadout value="38.6" unit="V AC" mode="High-Z input" />
          </Figure>
          <Figure caption={<>The Fluke 117 on AutoVolt (LoZ, about 3 kΩ) on the same conductor. Illustrative reading.</>}>
            <MeterReadout value="0.4" unit="V AC" mode="AutoVolt LoZ" />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Those numbers are illustrative, not measured; the point is the behavior. Without LoZ you are left guessing
          whether 38 V means a back-fed circuit or harmless coupling, and the safe answer is to keep investigating.
          The HT118A&apos;s NCV and Live-wire alarm help find a live conductor but can&apos;t tell you a phantom reading
          is harmless. Our article on{" "}
          <Link href="/multimeters/why-does-my-multimeter-show-voltage-when-measuring-a-disconnected-circuit" className={link}>
            voltage on a disconnected circuit
          </Link>{" "}
          explains the mechanism, and the{" "}
          <Link href="/multimeters/fluke-117-review" className={link}>
            Fluke 117 review
          </Link>{" "}
          covers how we tested the meter on our own bench.
        </p>
        <div className="mt-4">
          <Callout title="A LoZ reading is not a lockout">
            Even when LoZ shows near zero, follow lockout/tagout, test your meter on a known live source before and
            after, and treat every conductor as live until proven otherwise. A low-impedance input loads the circuit, so
            use it to check for voltage rather than on sensitive electronic or control circuits. Both meters list CAT ratings
            that cover branch circuits and panels; the HT118A&apos;s CAT IV claim comes from its manual and meter face,
            while its maker&apos;s own product text says 600V, so treat service-entrance work as a job for a licensed
            electrician with a meter whose rating is documented consistently.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Ratings you can check: why the paperwork matters</h2>
        <p className="text-muted leading-7 mb-4">
          The Fluke 117 sources we used, its product page spec tab and the 110 Series datasheet, say the same thing:
          CAT III 600V, one 9V battery, about 400 hours of life. The HT118A&apos;s documents don&apos;t agree with each
          other. KAIWEETS&apos;s spec table and manual give 1000 V DC and 750 V AC under CAT III 1000V / CAT IV 600V,
          but descriptive text on the same product page says 600V AC/DC. The product page lists two AAA batteries
          where the manual lists two AA, and gives the screen as 2.9 inches in one place and 2.7 in another.
        </p>
        <p className="text-muted leading-7 mb-4">
          None of that proves the HT118A is unsafe; we have not tested it, and this is desk research from its
          maker&apos;s documents. It does mean the most conservative reading of its rating is 600 V, the same as the
          Fluke&apos;s, so we would not count the 1000 V figure as a reason to buy it for high-energy work.
        </p>
        <Figure caption={<>Allowed error reading a 120 V receptacle, worked from each maker&apos;s AC volts spec. The HT118A&apos;s published figure is slightly tighter.</>}>
          <BarChart
            items={[
              { label: "Fluke 117", value: 1.5, display: "±1.5 V" },
              { label: "KAIWEETS HT118A", value: 1.26, display: "±1.3 V", highlight: true },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The chart is a reminder that the Fluke premium isn&apos;t about headline accuracy: on a 120 V outlet the 117
          allows ±(1.2 + 0.3) = ±1.5 V and the HT118A ±(0.96 + 0.3) ≈ ±1.3 V. What you pay Fluke for is LoZ, a rating
          documented the same way everywhere, and, on this site, a meter we have actually used.
        </p>
        <KeyIdea title="A cheaper Fluke with LoZ doesn't exist in this pair">
          If you want the 117&apos;s body without LoZ and VoltAlert, the{" "}
          <Link href="/multimeters/fluke-115-vs-fluke-117" className={link}>
            Fluke 115
          </Link>{" "}
          costs less, but then the HT118A beats it on almost every function. LoZ is the reason to choose the 117.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Who should buy the Fluke 117, and who the HT118A</h2>
        <DataTable
          head={["Buyer and job", "Better fit", "Deciding spec"]}
          rows={[
            ["Electrician proving circuits dead daily", "Fluke 117", "AutoVolt LoZ, about 3 kΩ"],
            ["Homeowner checking outlets and breakers", "KAIWEETS HT118A", "True RMS and NCV at a fraction of the price"],
            ["Car, RV or boat parasitic draw", "KAIWEETS HT118A", "60 mA range, 0.01 mA steps"],
            ["Furnace flame sensor", "KAIWEETS HT118A", "600 µA range, 0.1 µA steps"],
            ["Supply and return air temperature", "KAIWEETS HT118A", "K-type probe included"],
            ["Variable-speed drive output voltage", "Either", "Both True RMS"],
            ["Low-light work in an attic or crawlspace", "KAIWEETS HT118A", "Flashlight and kickstand"],
            ["A meter you want documented consistently", "Fluke 117", "CAT III 600V on every source"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For a wider view of the budget side, see{" "}
          <Link href="/multimeters/best-multimeter-for-beginners" className={link}>
            best multimeter for beginners
          </Link>
          , where the HT118A ranks near the top, and{" "}
          <Link href="/multimeters/fluke-117-vs-klein-mm400" className={link}>
            Fluke 117 vs Klein MM400
          </Link>{" "}
          for another lower-cost alternative to the 117.
        </p>
      </section>
    </>
  ),
  bottomLine:
    "For most buyers the KAIWEETS HT118A is the better value: more functions, a microamp range, temperature and NCV for a small fraction of the Fluke's price. The Fluke 117 is worth the extra cost for electricians who test for dead circuits every day, where AutoVolt LoZ and consistently documented CAT III 600V ratings matter more than a longer feature list.",
  faqs: [
    {
      question: "Is the KAIWEETS HT118A as accurate as the Fluke 117?",
      answer:
        "On paper, yes, and slightly better on AC volts: KAIWEETS lists ±(0.8% + 3) against Fluke's ±(1.0% + 3). DC volts are close, ±(0.5% + 3) against ±(0.5% + 2). Those are each maker's published specs; we bench-tested the Fluke but not the KAIWEETS, so we can't confirm how the HT118A holds its spec over time.",
    },
    {
      question: "Does the HT118A have a LoZ mode?",
      answer:
        "KAIWEETS lists none on the HT118A product page, and it publishes no input impedance figure. It has NCV and a Live-wire alarm, which help locate live conductors, but neither drains a ghost voltage the way LoZ does. The Fluke 117's AutoVolt switches to about 3 kΩ and picks AC or DC automatically.",
    },
    {
      question: "Is the HT118A really rated CAT IV 600V?",
      answer:
        "Its manual and meter face say CAT III 1000V / CAT IV 600V, and the product page's spec table agrees. Descriptive text on the same page says 600V AC/DC, though, so KAIWEETS's own sources conflict. We'd treat 600 V as the safe working limit and keep service-entrance work for a meter with a consistently documented CAT IV rating.",
    },
    {
      question: "Can the Fluke 117 measure temperature?",
      answer:
        "No. Fluke's datasheet for the 110 Series gives the thermocouple input to the Fluke 116 only, so the 117 has no temperature function. The HT118A includes a K-type probe and reads -40°F to 1832°F. If HVAC temperature work matters, that is a strong point for the KAIWEETS or for the Fluke 116.",
    },
    {
      question: "Which has the better warranty?",
      answer:
        "They match on length: Fluke gives the 117 a 3-year warranty and KAIWEETS gives the HT118A 3 years as well, per each maker's site. Fluke also publishes battery life, about 400 hours from one 9V cell without the backlight. The KAIWEETS product page we checked lists no battery-life figure, and its documents disagree on whether the meter takes AA or AAA cells.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 117 vs Klein Tools MM400", href: "/multimeters/fluke-117-vs-klein-mm400" },
    { label: "Fluke 115 vs Fluke 117", href: "/multimeters/fluke-115-vs-fluke-117" },
    { label: "Best multimeter for beginners", href: "/multimeters/best-multimeter-for-beginners" },
    { label: "Best multimeter for HVAC technicians", href: "/multimeters/best-multimeter-for-hvac-technicians" },
    { label: "Best True RMS multimeters under $100", href: "/multimeters/best-true-rms-multimeters-under-100" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
  ],
};

export default function Fluke117VsKaiweetsHt118aPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
