// Specs per maker sources:
// - Fluke 117: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-117 (spec tab) as cited on
//   /multimeters/fluke-117-review (checked 2026-10-26): 6,000 counts; 33-segment bar graph; CAT III 600V; DC V ±(0.5% + 2);
//   AC V True RMS ±(1.0% + 3) 45-500 Hz, ±(2.0% + 3) 500 Hz-1 kHz; AutoVolt ±(2.0% + 3); 6.000 A / 10.00 A AC and DC;
//   40.00 MΩ; 9,999 µF; 50.00 kHz (datasheet; the 2020 manual says 99.99 kHz, per /multimeters/fluke-117-vs-fluke-101);
//   LoZ; VoltAlert non-contact detection; Min/Max/Average; backlight; 167 x 84 x 46 mm; 550 g; one 9 V battery, about
//   400 h without backlight; 3-year warranty; no microamp range (1 mA best resolution). LoZ input about 3 kΩ and normal
//   volts input >10 MΩ DC per the 114/115/116/117 datasheet as cited on /multimeters/fluke-116-vs-fluke-115.
//   Amazon B000O3LUEI "About this item" (checked 2026-10-29): VoltAlert, AutoVolt, 600.0 mV DC range with 0.1 mV
//   resolution, low input impedance against ghost voltage, backlight, True RMS, -10 to +50 °C, 400 h battery.
//   Hands-on tested by the owner (handsOnTested: true).
// - AstroAI DM6000AR: https://www.astroai.com/astroai-digital-multimeter-trms-6000-counts/ap/100019 (product title and
//   "Which is the Best for You?" table, DM6000AR column at 6000 counts, checked 2026-10-29): voltage, current,
//   resistance, diodes, continuity, duty cycle, capacitance, temperature; 6,000 counts; manual and auto range;
//   AC 750 V / DC 1000 V; NCV not listed (X); VFD/LoZ not listed (X); inrush not listed (X). The page's "Technical
//   Details" weight and dimensions (12.59 oz, 8.66 x 2.28 x 6.69 in) look like packaged figures, so they aren't used.
//   No warranty term is given ("Hassle-Free Warranty"). The linked user manual is an image-only PDF we couldn't read.
//   Official Amazon listing B071JL6LLL (checked 2026-10-29): True RMS for AC voltage and current; AC/DC current, AC/DC
//   voltage, capacitance, frequency, duty cycle, resistance, diode, continuity, temperature; data hold, backlit LCD,
//   auto shut-off, kickstand; F400mA/600V and F10A/600V ceramic fuses. Neither source states a CAT rating (as on the Pick),
//   current ranges, accuracy, or battery type.
// Amazon.com availability checked 2026-10-29 with Chrome at ZIP 10001: both In Stock with Add to Cart.
// Worked tolerances are arithmetic on Fluke's published specs; the ghost-voltage figures are illustrative.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-117-vs-astroai-dm6000ar";

export const metadata = buildMetadata({
  title: "Fluke 117 vs AstroAI DM6000AR: Pro or Budget?",
  description:
    "Fluke 117 vs AstroAI DM6000AR: a CAT III electrician's meter with LoZ against a budget True RMS bench meter with no stated CAT rating. Who should buy which.",
  image: picks.find((p) => p.name === "Fluke 117")!.image,
  path: "/multimeters/fluke-117-vs-astroai-dm6000ar",
});

const link = "text-accent hover:underline";

/**
 * Ghost voltage: a de-energized wire run beside a live one picks up voltage through stray capacitance. A >10 MΩ input
 * barely loads that weak source, so a phantom reading appears; the 117's ~3 kΩ LoZ input collapses it. Values illustrative.
 */
function GhostVoltageDiagram() {
  return (
    <svg
      viewBox="0 0 360 180"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram of ghost voltage: a dead conductor runs beside a live 120 volt conductor and picks up voltage through stray capacitance; a high-impedance meter such as the AstroAI DM6000AR can show a misleading phantom reading, while the Fluke 117 in LoZ mode loads the coupling and reads near zero"
    >
      <text x="20" y="24" fontSize="9.5" className="fill-foreground">Live conductor, 120 V</text>
      <line x1="20" x2="340" y1="32" y2="32" className="stroke-accent" strokeWidth="2.5" />
      <text x="20" y="84" fontSize="9.5" className="fill-foreground">Dead conductor, breaker off at the far end</text>
      <line x1="20" x2="340" y1="72" y2="72" className="stroke-muted" strokeWidth="2.5" />
      {[80, 160, 240].map((x) => (
        <g key={x}>
          <line x1={x} x2={x} y1="34" y2="46" className="stroke-muted" strokeWidth="1" strokeDasharray="2 2" />
          <line x1={x - 8} x2={x + 8} y1="48" y2="48" className="stroke-muted" strokeWidth="1.4" />
          <line x1={x - 8} x2={x + 8} y1="54" y2="54" className="stroke-muted" strokeWidth="1.4" />
          <line x1={x} x2={x} y1="56" y2="70" className="stroke-muted" strokeWidth="1" strokeDasharray="2 2" />
        </g>
      ))}
      <text x="292" y="54" fontSize="8.5" className="fill-muted">stray C</text>
      <rect x="20" y="104" width="150" height="62" rx="6" className="fill-surface stroke-border" strokeWidth="1" />
      <text x="30" y="122" fontSize="9.5" fontWeight="600" className="fill-foreground">High-impedance input</text>
      <text x="30" y="138" fontSize="9" className="fill-muted">DM6000AR (no LoZ)</text>
      <text x="30" y="156" fontSize="9.5" className="fill-accent">Phantom tens of volts</text>
      <rect x="190" y="104" width="150" height="62" rx="6" className="fill-surface stroke-accent" strokeWidth="1.2" />
      <text x="200" y="122" fontSize="9.5" fontWeight="600" className="fill-foreground">LoZ input, about 3 kΩ</text>
      <text x="200" y="138" fontSize="9" className="fill-muted">Fluke 117 AutoVolt</text>
      <text x="200" y="156" fontSize="9.5" className="fill-foreground">Collapses to near 0 V</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 117 vs AstroAI DM6000AR: Professional Meter or Budget Alternative?",
  path,
  published: "2026-10-29",
  intro:
    "Fluke 117 vs AstroAI DM6000AR splits cleanly by where you work. If any of your measurements are on building wiring, buy the Fluke 117: it's rated CAT III 600V and adds the LoZ mode, AutoVolt and VoltAlert that electricians rely on, and we bought and tested one on our own bench. If your work stays on low-voltage benches, cars and battery packs, the DM6000AR costs roughly a sixth as much on Amazon at our last check and adds temperature, duty cycle and a fused 400 mA input the 117 lacks. AstroAI states no CAT rating at all, and that one gap decides most purchases.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 117")!,
    imageAlt: "Fluke 117 electrician's True RMS multimeter, front view",
    chooseIf: [
      "You work on panels, branch circuits or hardwired equipment and need a CAT III 600V rating",
      "You need LoZ to tell ghost voltage from a real feed in shared conduit and old wiring",
      "You want VoltAlert non-contact detection and AutoVolt AC/DC selection built in",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "AstroAI DM6000AR")!,
    imageAlt: "AstroAI DM6000AR True RMS 6,000-count digital multimeter, front view",
    chooseIf: [
      "Your work is Arduino, Raspberry Pi, hobby electronics or 12 V automotive circuits",
      "You want temperature and duty cycle readings that the Fluke 117 doesn't offer",
      "You want manual ranging and a fused milliamp input on a meter that's cheap to replace",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "6,000 counts + 33-segment bar graph", b: "6,000 counts" },
    { label: "Max voltage", a: "600V AC/DC", b: "750V AC / 1000V DC (AstroAI table), with no CAT rating" },
    { label: "AC volts accuracy", a: "±(1.0% + 3), 45 to 500 Hz", b: "Not stated" },
    { label: "Current", a: "6 A and 10 A, AC and DC (1 mA best resolution)", b: "AC and DC; ranges not stated; fused at 400 mA and 10 A" },
    { label: "Low impedance (LoZ)", a: "Yes, AutoVolt", b: "No (per AstroAI's table)" },
    { label: "Non-contact voltage", a: "VoltAlert", b: "No (per AstroAI's table)" },
    { label: "Temperature", a: "No", b: "Yes; range not stated" },
    { label: "Frequency / duty cycle", a: "To 50 kHz (Fluke's manual says 99.99 kHz); no duty cycle", b: "Both listed; ranges not stated" },
    { label: "Capacitance", a: "Up to 9,999 µF", b: "Yes; range not stated" },
    { label: "Ranging", a: "Auto", b: "Auto and manual" },
    { label: "Size / weight", a: "167 × 84 × 46 mm, 550 g", b: "Not stated for the meter alone" },
    { label: "Battery", a: "One 9V, about 400 hours", b: "Not stated" },
    { label: "Warranty", a: "3 years", b: "Term not stated" },
  ],
  differences: [
    "Safety rating: the Fluke 117 is CAT III 600V; AstroAI states no CAT rating for the DM6000AR on its site or its Amazon listing, even though its table lists 1000V DC.",
    "Electrician features: the 117 has LoZ mode, AutoVolt automatic AC/DC selection and VoltAlert non-contact detection; AstroAI's own table marks NCV and LoZ as absent on the DM6000AR.",
    "Bench features: the DM6000AR reads temperature and duty cycle and has manual ranging; the 117 lists none of the first two.",
    "Small currents: the DM6000AR has a separate input fused at 400 mA; the 117's current function starts at its 6 A range, with 1 mA as its finest step.",
    "Published accuracy: Fluke prints accuracy for every function; AstroAI's pages give no accuracy figures for the DM6000AR.",
    "Both are True RMS with 6,000-count displays, so neither has a resolution edge on voltage.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">No CAT rating: the line the DM6000AR shouldn&apos;t cross</h2>
        <p className="text-muted leading-7 mb-4">
          The DM6000AR is an odd case. AstroAI&apos;s own comparison table credits it with 750 V AC and 1000 V DC,
          and its fuses are marked 600 V, yet neither AstroAI&apos;s product page nor its Amazon listing names a CAT
          category. A CAT rating is the maker&apos;s statement of what transient spike the meter&apos;s input was
          designed to survive at a given point in a building&apos;s wiring; a voltage range is only what the display
          can show. Without the first, the second tells you nothing about safety on a live panel.
        </p>
        <p className="text-muted leading-7 mb-4">
          The Fluke 117 is rated CAT III 600V, which covers the panel, the feeders and the branch circuits out to
          every hardwired load in a house or small commercial building. That rating, rather than the badge, is the
          main thing the higher price buys if you&apos;re an electrician or a serious DIYer.
        </p>
        <h3 className="text-lg font-semibold mt-6 mb-3">Worked scenario: checking a 240 V water-heater circuit</h3>
        <p className="text-muted leading-7 mb-4">
          A water heater is hardwired, so you&apos;re measuring at a disconnect or junction box, not an outlet. On the
          Fluke 117&apos;s 600.0 V range, a 240.0 V reading carries Fluke&apos;s published tolerance of
          ±(1.0% × 240.0 + 3 × 0.1) = ±2.7 V. The DM6000AR could display a number there too, but with no CAT rating
          and no published accuracy, there&apos;s no spec that says it&apos;s built for that spot or how close the
          number is. The chart below runs the same arithmetic for common North American supply voltages.
        </p>
        <Figure caption={<>The Fluke 117&apos;s published AC tolerance at common mains voltages. AstroAI publishes no accuracy, so the DM6000AR has no bars.</>}>
          <BarChart
            items={[
              { label: "120 V outlet", value: 1.5, display: "±1.5 V" },
              { label: "208 V commercial", value: 2.38, display: "±2.4 V" },
              { label: "240 V water heater", value: 2.7, display: "±2.7 V", highlight: true },
              { label: "277 V lighting", value: 3.07, display: "±3.1 V" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Ghost voltage: what the 117&apos;s LoZ mode solves</h2>
        <p className="text-muted leading-7 mb-4">
          Electricians pay for the 117 as much for LoZ as for the CAT rating. When a dead conductor runs beside a
          live one in the same conduit or cable, stray capacitance couples a weak voltage onto it. A meter with a
          normal high-impedance input, more than 10 MΩ on the 117&apos;s regular volts setting, barely loads that
          source, so it can show a convincing phantom reading on a wire that can&apos;t power anything. The 117&apos;s
          AutoVolt LoZ input, about 3 kΩ per Fluke&apos;s datasheet, draws enough current to collapse the phantom
          toward zero while a real feed holds up.
        </p>
        <Figure caption={<>Illustrative. Phantom readings depend on run length and spacing; LoZ is what separates them from a real feed.</>}>
          <GhostVoltageDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          AstroAI&apos;s table marks VFD/LoZ as absent on the DM6000AR, and it has no non-contact detector either, so
          you have no quick way to sort a coupled reading from a live one. That doesn&apos;t matter on a breadboard,
          where there&apos;s no long parallel run to couple anything. It matters a great deal when you&apos;re deciding
          whether a switch leg in an old house is safe to cut. Our explainer on{" "}
          <Link href="/multimeters/why-does-my-multimeter-show-voltage-when-measuring-a-disconnected-circuit" className={link}>
            why a multimeter shows voltage on a disconnected circuit
          </Link>{" "}
          covers the effect in depth.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where the DM6000AR is the better tool: the low-voltage bench</h2>
        <p className="text-muted leading-7 mb-4">
          Turn to a microcontroller project and the comparison flips. The 117&apos;s current function begins at its
          6 A range, so an Arduino drawing 45 mA shows as 0.045 A: one count is 1 mA, more than 2% of the reading
          before accuracy is even counted. The DM6000AR has a separate low-current input fused at 400 mA, which
          points to milliamp ranges, though AstroAI doesn&apos;t publish them. It also reads temperature and duty
          cycle, useful for checking a regulator heatsink or a PWM fan signal, and it lets you lock a range manually
          when auto-ranging hunts on a slowly changing voltage.
        </p>
        <DataTable
          head={["Bench or field job", "Better fit", "Why"]}
          rows={[
            ["Arduino and Raspberry Pi current draw", "AstroAI DM6000AR", "Fused 400 mA input; the 117 resolves only 1 mA"],
            ["PWM fan or LED dimming signal", "AstroAI DM6000AR", "Duty cycle listed; the 117 lists frequency only"],
            ["Heatsink or battery temperature", "AstroAI DM6000AR", "Temperature function; the 117 has none"],
            ["12 V car circuits and fuses", "Either", "Low voltage, no CAT rating needed; both are True RMS"],
            ["Outlets, panels, hardwired loads", "Fluke 117", "CAT III 600V; the DM6000AR states no rating"],
            ["Dead-or-live checks in old wiring", "Fluke 117", "LoZ and VoltAlert; the DM6000AR has neither"],
            ["Motor-run and supply capacitors", "Fluke 117", "Published range to 9,999 µF; AstroAI's isn't stated"],
          ]}
        />
        <div className="mt-4">
          <KeyIdea title="When the budget meter is the right call">
            If you never measure building wiring, nearly everything the 117 adds goes unused: its CAT rating, LoZ,
            AutoVolt and VoltAlert are all about mains safety. For a hobby bench, the DM6000AR&apos;s extra functions
            are the more useful set, and a meter that&apos;s cheap to replace is one you won&apos;t mind clipping into
            a circuit you might short. Our{" "}
            <Link href="/multimeters/astroai-dm6000ar-review" className={link}>
              AstroAI DM6000AR review
            </Link>{" "}
            and the guide to the{" "}
            <Link href="/multimeters/best-multimeters-for-arduino-and-circuit-board-testing" className={link}>
              best multimeters for Arduino and circuit board testing
            </Link>{" "}
            go further.
          </KeyIdea>
        </div>
        <div className="mt-4">
          <Callout title="Keep a meter with no CAT rating off mains wiring">
            Use the DM6000AR on battery-powered and low-voltage circuits only. For outlets, panels and hardwired
            equipment, use a meter rated at least CAT III for the voltage present, such as the 117, and test it on a
            known live source before and after checking that a circuit is dead. Neither meter is rated for the
            service entrance or meter base, which call for CAT IV; that work belongs to a licensed electrician.
          </Callout>
        </div>
        <p className="text-muted leading-7 mt-4">
          If you&apos;re weighing the 117 against other Fluke options rather than a budget meter, the{" "}
          <Link href="/multimeters/fluke-117-review" className={link}>
            Fluke 117 review
          </Link>{" "}
          covers our bench time with it, and{" "}
          <Link href="/multimeters/fluke-115-vs-fluke-117" className={link}>
            Fluke 115 vs Fluke 117
          </Link>{" "}
          shows what you give up by dropping LoZ and VoltAlert.
        </p>
      </section>
    </>
  ),
  chooseNeitherIf:
    "You need both mains safety and bench-grade small-current readings. The 117 has no milliamp or microamp range and the DM6000AR has no CAT rating. The Fluke 87V covers both with a CAT IV 600V / CAT III 1000V rating and a microamp range; for low-current work on a budget, see our microamp meter roundup.",
  bottomLine:
    "Buy the Fluke 117 if you measure building wiring at all: its CAT III 600V rating, LoZ mode and VoltAlert are the professional features that justify paying several times more, and it's a meter we've tested ourselves. Buy the AstroAI DM6000AR if your work stays on low-voltage electronics and cars, where its temperature, duty cycle, manual ranging and fused 400 mA input make it the more useful meter for far less money.",
  faqs: [
    {
      question: "Is the Fluke 117 worth it over the AstroAI DM6000AR?",
      answer:
        "Yes, if you work on household or commercial wiring. The 117's CAT III 600V rating, LoZ ghost-voltage mode and VoltAlert detector are features the DM6000AR doesn't have, and AstroAI states no CAT rating at all. If you only work on hobby electronics and 12 V systems, the DM6000AR covers more of what you'll use for much less.",
    },
    {
      question: "Can I use the AstroAI DM6000AR on household outlets?",
      answer:
        "We don't recommend it. AstroAI lists a 750 V AC maximum but publishes no CAT safety rating on its product page or Amazon listing, so there's no stated assurance the input will survive the voltage spikes found on mains wiring. Keep it to low-voltage and battery circuits, and use a CAT III meter such as the Fluke 117 for outlets.",
    },
    {
      question: "Which meter is better for Arduino projects?",
      answer:
        "The AstroAI DM6000AR. Its separate 400 mA fused input suits the tens of milliamps a microcontroller board draws, while the Fluke 117 resolves current only to 1 mA through its 6 A range. The DM6000AR also adds temperature, duty cycle and manual ranging. Both have 6,000-count displays, so voltage readings on a 3.3 V or 5 V rail look alike.",
    },
    {
      question: "Are both the Fluke 117 and AstroAI DM6000AR True RMS?",
      answer:
        "Yes. Fluke specifies True RMS for the 117, with AC volts accuracy of ±(1.0% + 3) from 45 to 500 Hz. AstroAI's Amazon listing says the DM6000AR is True RMS for both AC voltage and AC current, but it doesn't publish an accuracy figure or frequency range, so you can't work out a tolerance for its readings.",
    },
    {
      question: "Does the AstroAI DM6000AR have a low-impedance mode like the Fluke 117?",
      answer:
        "No. AstroAI's own comparison table marks VFD/LoZ as absent on the DM6000AR, and it has no non-contact voltage detector either. The 117's AutoVolt LoZ input, about 3 kΩ per Fluke, loads a de-energized wire enough to collapse ghost voltage, which helps electricians decide whether a conductor is really live.",
    },
    {
      question: "Has OhmSavvy tested the Fluke 117 and the DM6000AR?",
      answer:
        "We bought and tested the Fluke 117 on our own bench, which is why it carries our Hands-on Tested badge. The AstroAI DM6000AR is desk research from AstroAI's product page and its official Amazon listing. The tolerances on this page are arithmetic on Fluke's published specs, and the ghost-voltage diagram is illustrative, not a measurement.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 117 review", href: "/multimeters/fluke-117-review" },
    { label: "AstroAI DM6000AR review", href: "/multimeters/astroai-dm6000ar-review" },
    { label: "Fluke 115 vs Fluke 117", href: "/multimeters/fluke-115-vs-fluke-117" },
    { label: "Fluke 117 vs Klein Tools MM400", href: "/multimeters/fluke-117-vs-klein-mm400" },
    { label: "Best multimeters for Arduino and circuit board testing", href: "/multimeters/best-multimeters-for-arduino-and-circuit-board-testing" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
  ],
};

export default function Fluke117VsAstroaiDm6000arPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
