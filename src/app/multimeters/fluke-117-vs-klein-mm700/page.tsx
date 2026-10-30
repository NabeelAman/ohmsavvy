// Specs per maker sources, checked 2026-10-29:
// - Fluke 117: Fluke 114/115/116/117 datasheet (2793260b) and the 117 product page
//   (https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-117), as cited on
//   /multimeters/fluke-117-vs-fluke-87v and /multimeters/fluke-117-vs-klein-mm400: True RMS; CAT III 600V; 6,000 counts +
//   33-segment bar graph; DC V ±(0.5% + 2); AC V ±(1.0% + 3), 45-500 Hz; 6 A / 10 A only (1 mA finest step); 40 MΩ;
//   9,999 µF; 50 kHz; VoltAlert NCV; AutoVolt LoZ about 3 kΩ; no temperature; 550 g; 9 V, 400 h typical; 3-year warranty.
// - Klein Tools MM700: Klein Tools MM700 Pick in src/lib/multimeter-catalog.ts, i.e. kleintools.com (discontinued, MM720
//   successor) and the MM700 manual (MM700_1390112ART_WEB.pdf): 4000 counts; CAT IV 600V / CAT III 1000V; AC V 4.000 V
//   ±(1.0% + 5), 40.00 V ±(1.2% + 5), 400.0 V and 1000 V ±(1.5% + 5) as the manual's table groups them, 50-400 Hz;
//   DC V ±(1.0% + 3) 4-400 V, ±(1.2% + 3) 1000 V; current 400.0 µA to 10.00 A; LoZ >3 kΩ, 600 V max; no NCV listed;
//   IP42; 2 m drop; 414 g (manual) vs 408 g (Klein page); warranty length not stated (manual points to kleintools.com/warranty).
// Amazon (Playwright, Chrome, ZIP 10001, 2026-10-29): both ASINs in stock with Add to Cart; Fluke about 2.3x the MM700.
// Price gap stated only as a ratio. Fluke 117 is owner hands-on tested; the MM700 assessment is desk research. Worked
// readings are arithmetic on the published specs, not measurements.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea, MeterReadout } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { pickByName } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-117-vs-klein-mm700";
const fluke = pickByName("Fluke 117")!;
const klein = pickByName("Klein Tools MM700")!;

export const metadata = buildMetadata({
  title: "Fluke 117 vs Klein MM700 for Electricians",
  description:
    "Fluke 117 vs Klein MM700: VoltAlert NCV and finer resolution against CAT IV, microamps and a lower price on a meter Klein has discontinued. Which to buy.",
  image: fluke.image,
  path: "/multimeters/fluke-117-vs-klein-mm700",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 117 vs Klein MM700: Which Multimeter Is Better for Electricians?",
  path,
  published: "2026-10-29",
  intro:
    "Buy the Fluke 117 if your days are spent proving circuits dead in houses and commercial branch wiring: it has VoltAlert non-contact detection, an auto-selecting LoZ input and 6,000 counts, and it cost a little over twice the MM700 on Amazon when we checked. Buy the Klein MM700 only if you need CAT IV 600V at the meter base or microamp ranges for controls work and can live with a meter Klein no longer makes. Klein has discontinued the MM700 and names the MM720 as its successor.",
  a: {
    pick: fluke,
    imageAlt: "Fluke 117 electrician's True RMS multimeter with VoltAlert, front view",
    chooseIf: [
      "You want a non-contact voltage check built into the meter you already carry",
      "Most of your work is 120/240 V residential and 277/480 V commercial branch circuits",
      "You want a current model with a published 3-year warranty",
    ],
  },
  b: {
    pick: klein,
    imageAlt: "Klein Tools MM700 True RMS CAT IV multimeter with pouch, leads and thermocouple",
    chooseIf: [
      "You probe at meter bases or service disconnects and need a CAT IV 600V rating",
      "You read flame-sensor or loop current, which needs µA and mA ranges",
      "You accept buying a discontinued model from third-party sellers",
    ],
  },
  extraSpecs: [
    { label: "Status", a: "Current Fluke model", b: "Discontinued by Klein; MM720 is the successor" },
    { label: "Safety category", a: "CAT III 600V", b: "CAT IV 600V / CAT III 1000V" },
    { label: "Display", a: "6,000 counts + 33-segment bar graph", b: "4,000 counts" },
    { label: "DC volts accuracy", a: "±(0.5% + 2)", b: "±(1.0% + 3) on 4–400 V; ±(1.2% + 3) at 1000 V" },
    { label: "AC volts accuracy", a: "±(1.0% + 3), 45–500 Hz", b: "±(1.0% to 1.5% + 5) by range, 50–400 Hz" },
    { label: "Non-contact voltage", a: "Yes, VoltAlert", b: "Not listed by Klein" },
    { label: "LoZ input", a: "AutoVolt, about 3 kΩ, picks AC or DC", b: "Low Z, >3 kΩ, 600 V max" },
    { label: "Lowest current range", a: "6 A (1 mA steps)", b: "400.0 µA (0.1 µA steps)" },
    { label: "Temperature", a: "No", b: "0–1500°F (-18–816°C)" },
    { label: "Drop / ingress", a: "Not stated in our sources", b: "2 m drop, IP42" },
    { label: "Weight / battery", a: "550 g, one 9 V (400 h typical)", b: "414 g (manual) or 408 g (Klein page), 2 × AAA" },
    { label: "Warranty", a: "3 years", b: "Not stated in the manual" },
  ],
  differences: [
    "Klein has discontinued the MM700 and lists the MM720 as its successor; the Fluke 117 is a current model.",
    "Only the 117 has non-contact voltage detection (VoltAlert); Klein lists no NCV on the MM700.",
    "The MM700 is rated CAT IV 600V / CAT III 1000V and reads 1000 V; the 117 is CAT III 600V and stops at 600 V.",
    "The 117 shows 6,000 counts, so 480 V reads in 0.1 V steps; the MM700's 4,000 counts push 480 V onto its 1000 V range in 1 V steps.",
    "The MM700 has µA and mA ranges down to 400.0 µA and a thermocouple input; the 117's smallest range is 6 A and it has no temperature.",
    "Fluke's DC volts spec is twice as tight: ±(0.5% + 2) against Klein's ±(1.0% + 3).",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Proving a dead circuit: VoltAlert and two kinds of LoZ</h2>
        <p className="text-muted leading-7 mb-4">
          Both meters have a low-impedance voltage input, which is the tool for telling a real feed from a phantom
          reading. A de-energized conductor run in the same conduit as a live one picks up voltage by capacitive
          coupling, and a high-impedance meter (10 MΩ on the MM700&apos;s normal volts setting, per Klein&apos;s manual)
          can display a substantial number on a wire that can&apos;t deliver any current. Loading the circuit with a few
          kilohms makes that coupled voltage collapse, while a genuine source holds up.
        </p>
        <p className="text-muted leading-7 mb-4">
          The meters get there differently. Fluke&apos;s AutoVolt input sits at about 3 kΩ and selects AC or DC on its
          own, so one switch position covers the job. Klein&apos;s Low Z position is above 3 kΩ and limited to 600 V
          RMS. The bigger gap is the step before the probes go on: the 117 has VoltAlert, a non-contact detector in the
          meter&apos;s tip, and Klein lists no NCV for the MM700. If you carry a separate pen tester anyway, that
          difference shrinks; if you don&apos;t, it is the main reason electricians pick the 117.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Illustrative only: a switched leg that is open, read on a high-impedance volts setting, can show a coupled phantom voltage.</>}>
            <MeterReadout value="38.6" unit="V AC" mode="High-Z (10 MΩ)" />
          </Figure>
          <Figure caption={<>Illustrative only: the same leg on a low-impedance input collapses toward zero because no real source is behind it.</>}>
            <MeterReadout value="0.4" unit="V AC" mode="LoZ (~3 kΩ)" />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Both meters will make the call shown above. Our{" "}
          <Link href="/multimeters/why-does-my-multimeter-show-voltage-when-measuring-a-disconnected-circuit" className={link}>
            guide to voltage on a disconnected circuit
          </Link>{" "}
          walks through the full procedure, including why you prove the meter on a known live source before and after.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">A 480Y/277 V panel: 6,000 counts against 4,000</h2>
        <p className="text-muted leading-7 mb-4">
          Commercial electricians spend a lot of time on 480Y/277 V systems, and here the count difference shows up in
          a way a spec sheet hides. The 117&apos;s 6,000-count display covers 277 V and 480 V on the same 600.0 V range in
          0.1 V steps. The MM700 tops out at 399.9 on its 400.0 V range, so 277 V reads in 0.1 V steps but 480 V forces
          the 1000 V range, where the display moves in whole volts.
        </p>
        <p className="text-muted leading-7 mb-4">
          Worked on each maker&apos;s AC spec: the 117 at ±(1.0% + 3 digits) gives a 480.0 V reading a band of
          ±(4.8 + 0.3) = ±5.1 V. Klein&apos;s manual prints ±(1.5% + 5 digits) for the 400.0 V and 1000 V rows together,
          so a 480 V reading in 1 V steps carries ±(7.2 + 5) = ±12.2 V. On 277 V the gap narrows: ±(2.8 + 0.3) = ±3.1
          V on the Fluke and ±(4.2 + 0.5) = ±4.7 V on the Klein&apos;s 400.0 V range.
        </p>
        <Figure caption={<>Allowed error on a 480 V AC reading, from each maker&apos;s published accuracy and resolution. Smaller is better.</>}>
          <BarChart
            items={[
              { label: "Fluke 117", value: 5.1, display: "±5.1 V", highlight: true },
              { label: "Klein MM700", value: 12.2, display: "±12.2 V" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Neither band will stop you confirming that a phase is present, but if you are checking voltage imbalance
          between phases, a few volts matter. Klein also specifies the MM700&apos;s AC readings for 50–400 Hz, where
          Fluke gives the 117 45–500 Hz; both cover 60 Hz mains, so that difference only shows on generator or drive
          work.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What the MM700 still does that the 117 can&apos;t</h2>
        <p className="text-muted leading-7 mb-4">
          The Klein&apos;s case rests on three things. First, it is rated CAT IV 600V and CAT III 1000V, so its rating
          reaches the line side of the service disconnect and the meter base, where the 117 is not rated. Second, its
          current input runs from a 400.0 µA range through 4000 µA, 40.00 mA and 400.0 mA before the 10 A range, which
          makes flame-rectification and 4–20 mA work possible; the 117&apos;s 6 A range shows a 12 mA signal as 0.012 A.
          Third, it has a thermocouple input to 1500°F and a 2 m drop rating with IP42.
        </p>
        <p className="text-muted leading-7 mb-4">
          Every one of those strengths is also on the MM720 that replaces it, which is the honest problem with buying
          an MM700 now. We worked through the CAT IV, microamp and 4–20 mA arithmetic on the successor in{" "}
          <Link href="/multimeters/fluke-115-vs-klein-mm720" className={link}>
            Fluke 115 vs Klein MM720
          </Link>
          , and it applies here with one change: the MM720 has 6,000 counts, which removes the 480 V resolution penalty
          above.
        </p>
        <KeyIdea title="Buying a discontinued meter">
          Amazon still sells the MM700 through a third-party seller in limited stock. Klein&apos;s manual sends warranty
          questions to kleintools.com/warranty and states no warranty length, so confirm coverage before buying. Spare
          fuses (500 mA and 10 A, both 1000 V per the manual) and AAA batteries are standard parts, so keeping one
          running isn&apos;t the issue. We assessed the MM700 from Klein&apos;s manual and product page; we did not
          bench-test it.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which one goes in the truck</h2>
        <DataTable
          head={["Call", "Fluke 117", "Klein MM700"]}
          rows={[
            ["Live-or-dead check before touching a box", "VoltAlert NCV in the tip", "No NCV listed; carry a pen tester"],
            ["Phantom voltage on a switch leg", "AutoVolt LoZ, about 3 kΩ", "Low Z, >3 kΩ, 600 V max"],
            ["480 V phase-to-phase", "0.1 V steps, ±5.1 V", "1 V steps, ±12.2 V"],
            ["Line side of a meter base", "Not rated (CAT III 600V)", "Rated, CAT IV 600V"],
            ["Furnace flame sensor (µA)", "Can't resolve it", "400.0 µA range, 0.1 µA steps"],
            ["Duct or pipe temperature", "No input", "Thermocouple, to 1500°F"],
            ["Warranty and support", "3 years, current model", "Not stated; discontinued"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For residential and light-commercial electricians the 117 is the better tool: it does the everyday
          proving-dead routine with fewer steps and reads distribution voltages more finely. We bought and tested the
          117 on our own bench, and the{" "}
          <Link href="/multimeters/fluke-117-review" className={link}>
            Fluke 117 review
          </Link>{" "}
          covers it in depth. If the MM700&apos;s CAT IV rating and current ranges are what you need, the{" "}
          <Link href="/multimeters/best-multimeter-for-electricians" className={link}>
            best multimeter for electricians
          </Link>{" "}
          roundup lists current meters that carry them.
        </p>
        <div className="mt-4">
          <Callout title="CAT III 600V stops at the main breaker">
            The Fluke 117 is rated for panelboards, feeders and branch circuits, not for the meter base, service drop or
            the line side of the main disconnect. Use a CAT IV rated meter and CAT IV rated leads there, wear arc-rated
            PPE for the available fault current, and leave utility-side work to a licensed electrician and the utility.
          </Callout>
        </div>
      </section>
    </>
  ),
  chooseNeitherIf:
    "You want CAT IV, microamps and a current model with 6,000 counts. The Klein MM720 replaces the MM700 with all of those, and the Fluke 87V adds CAT IV to Fluke's line at a much higher price.",
  bottomLine:
    "For electricians the Fluke 117 is the better buy: VoltAlert, an auto-selecting LoZ input, 6,000 counts and tighter DC accuracy, from a current model with a 3-year warranty. The Klein MM700 adds CAT IV, µA ranges and temperature at under half the price, but Klein has discontinued it, so its successor, the MM720, is the Klein to buy instead.",
  faqs: [
    {
      question: "Is the Klein MM700 discontinued?",
      answer:
        "Yes. Klein's product page says the MM700 is no longer in production and points to the MM720 as its replacement. Amazon still lists it through a third-party seller with limited stock, which is why we cover it. Klein's manual doesn't state a warranty length, so check coverage before buying, and compare it with the MM720, which keeps the CAT IV rating and adds 6,000 counts.",
    },
    {
      question: "Does the Klein MM700 have a non-contact voltage tester?",
      answer:
        "Klein lists no non-contact voltage function for the MM700, and its manual describes none. The Fluke 117 has VoltAlert, a detector in the top of the meter that signals when it is near an energized AC conductor. If you already carry a pen-style tester, this matters less; if you rely on the meter alone, it is a real point for the 117.",
    },
    {
      question: "Can the Fluke 117 be used at a service entrance?",
      answer:
        "Not within its rating. Fluke rates the 117 CAT III 600V, which covers distribution panels, feeders and branch circuits inside the building. The meter base, service drop and line side of the main disconnect are CAT IV locations. The MM700 is rated CAT IV 600V for those points, provided you also use CAT IV rated test leads.",
    },
    {
      question: "Which meter is more accurate on 480 V?",
      answer:
        "The Fluke 117. Its 6,000-count display keeps 480 V on the 600.0 V range in 0.1 V steps, and at ±(1.0% + 3) the allowed error is about ±5.1 V. The MM700's 4,000 counts move 480 V to its 1000 V range in 1 V steps, and Klein's ±(1.5% + 5) works out to about ±12.2 V on the same reading.",
    },
    {
      question: "Can either meter test a furnace flame sensor?",
      answer:
        "Only the MM700. Flame-rectification signals are typically a few microamps, and the MM700 has a 400.0 µA range with 0.1 µA steps. The Fluke 117's lowest current range is 6 A with 1 mA resolution, so a microamp signal reads as zero. Check the furnace maker's specification for the expected value on your unit before judging a sensor.",
    },
    {
      question: "Should I buy the MM700 or the newer Klein MM720?",
      answer:
        "On Klein's published specs, the MM720 does everything the MM700 does with 6,000 counts instead of 4,000, and it is the model Klein still makes and supports. Buy the MM700 only if the price difference on the day matters more to you than resolution and current support. Our Fluke 115 vs MM720 page covers the newer meter.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 115 vs Klein MM720", href: "/multimeters/fluke-115-vs-klein-mm720" },
    { label: "Fluke 117 vs Klein MM400", href: "/multimeters/fluke-117-vs-klein-mm400" },
    { label: "Fluke 117 vs Fluke 87V", href: "/multimeters/fluke-117-vs-fluke-87v" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
    { label: "Best multimeters for electricians under $100", href: "/multimeters/best-multimeters-for-electricians-under-100" },
  ],
};

export default function Fluke117VsKleinMm700Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
