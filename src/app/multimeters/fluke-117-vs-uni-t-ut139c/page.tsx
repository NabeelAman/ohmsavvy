// Specs per these sources:
// - Fluke 117: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-117 (spec tab) and the
//   114/115/116/117 datasheet (2793260b, 08/2020), as cited on /multimeters/fluke-117-review and
//   /multimeters/brymen-bm235-vs-fluke-117 (checked 2026-10-26): True RMS; 6,000 counts at 4/s, 33-segment bar graph at
//   32/s; CAT III 600V; DC V ±(0.5% + 2); AC V ±(1.0% + 3) 45-500 Hz; AutoVolt automatic AC/DC selection ±(2.0% + 3) with
//   a LoZ input of about 3 kΩ; volts input >10 MΩ DC, >5 MΩ AC; VoltAlert non-contact detection; 6 A / 10 A AC and DC,
//   20 A for 30 s; 40 MΩ; 9,999 µF; 50 kHz; Min/Max/Average; backlight; no temperature (116 only); no µA range;
//   one 9V, about 400 h; 167 × 84 × 46 mm; 550 g; 3-year warranty.
//   Official Amazon listing B000O3LUEI (checked 2026-10-29): VoltAlert, AutoVolt, "Low input impedance: helps prevent
//   false readings due to ghost voltage", white LED backlight, True RMS, -10 to +50 °C operating, 400 h battery; item
//   weight 689 g (Fluke states 550 g; we use Fluke's figure).
// - UNI-T UT139C: https://meters.uni-trend.com/product/ut139-series/ (series overview re-checked 2026-10-29; spec table
//   as cited on /multimeters/uni-t-ut139c-review, 2026-10-26): "CAT III 600V digital multimeters designed for
//   electricians"; NCV "by measuring EM field intensity"; "The new UT139E/S models include special features such as LoZ
//   (ACV)", so not the C; True RMS AC V ±(0.8% + 3) 45 Hz-1 kHz; DC V ±(0.5% + 2); 10 A AC/DC; temperature -40 to 1000 °C,
//   probe included; capacitance to 99.99 mF; auto/manual ranging; MAX/MIN/REL, hold, LED backlight; two AA; 354 g.
//   Input impedance, NCV voltage range, automatic AC/DC selection and warranty: not stated in these sources.
// Amazon availability checked 2026-10-29 with Chrome: UT139C in stock with a buy box; Fluke 117 buy box present but
// showing "cannot be shipped to your selected delivery location" (headless Chrome stuck on a UAE address), which counts
// as buyable. The 117's US price wasn't visible; the price comparison is relative to the 115 (lower price per the Pick).
// Fluke 117 hands-on tested by the owner (no measurements published); UT139C is desk research.
// NEMA 14-30 voltages are nominal US values; scenario rows describe what each meter's published functions allow.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-117-vs-uni-t-ut139c";

export const metadata = buildMetadata({
  title: "Fluke 117 vs UNI-T UT139C for Electricians",
  description:
    "Fluke 117 vs UNI-T UT139C for electricians: both CAT III 600V with NCV, but only the Fluke has LoZ for ghost voltage. When the cheaper UT139C is enough.",
  image: picks.find((p) => p.name === "Fluke 117")!.image,
  path: "/multimeters/fluke-117-vs-uni-t-ut139c",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 117 vs UNI-T UT139C: Which Is Better for Electricians?",
  path,
  published: "2026-10-29",
  intro:
    "For an electrician who works in existing buildings, the Fluke 117 is the better meter, and the reason is one function: LoZ. Both meters are True RMS, rated CAT III 600V and have non-contact voltage detection, but only the 117 can tell a phantom reading on an abandoned conductor from a real feed at the turn of the dial. When we checked Amazon the 117 cost more than the Fluke 115, which itself ran about three times the UT139C's price. An apprentice, a new-construction installer or a homeowner can save that money and buy the UT139C.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 117")!,
    imageAlt: "Fluke 117 electrician's True RMS multimeter with VoltAlert tip, front view",
    chooseIf: [
      "You troubleshoot existing wiring, where ghost voltage on abandoned or open conductors is common",
      "You want AutoVolt to pick AC or DC for you on one dial position",
      "You need a published input impedance, a 20 A, 30-second current rating and a 3-year warranty",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "UNI-T UT139C")!,
    imageAlt: "UNI-T UT139C electrician's True RMS multimeter with NCV, front view",
    chooseIf: [
      "You mostly wire new construction, where every conductor is accounted for",
      "You want temperature for checking motors or HVAC work alongside electrical",
      "You're an apprentice or homeowner who needs CAT III 600V and NCV at a budget price",
    ],
  },
  extraSpecs: [
    { label: "LoZ (ghost voltage)", a: "Yes, about 3 kΩ on AutoVolt", b: "No (UT139E/S only)" },
    { label: "Non-contact voltage", a: "VoltAlert", b: "Yes; voltage range not stated" },
    { label: "Automatic AC/DC selection", a: "AutoVolt, ±(2.0% + 3)", b: "Not stated" },
    { label: "Volts input impedance", a: ">10 MΩ DC, >5 MΩ AC", b: "Not stated" },
    { label: "AC volts accuracy", a: "±(1.0% + 3), 45 to 500 Hz", b: "±(0.8% + 3), 45 Hz to 1 kHz" },
    { label: "Current", a: "6 A and 10 A AC/DC; 20 A for 30 s", b: "10 A AC/DC" },
    { label: "Temperature", a: "No", b: "-40 to 1000 °C, probe included" },
    { label: "Bar graph", a: "33 segments, 32 updates/s", b: "31 segments listed for the series" },
    { label: "Weight", a: "550 g", b: "354 g" },
    { label: "Warranty", a: "3 years", b: "Not stated in our sources" },
  ],
  differences: [
    "The Fluke 117 has a LoZ input of about 3 kΩ that drains phantom voltage; UNI-T lists LoZ for the UT139E and UT139S, not the UT139C.",
    "The 117's AutoVolt position chooses AC or DC automatically; UNI-T doesn't list automatic AC/DC selection for the UT139C.",
    "Both are rated CAT III 600V and both detect voltage without contact; neither is rated CAT IV.",
    "The UT139C adds a temperature input with a probe and capacitance to 99.99 mF; the 117 has no temperature function.",
    "Fluke publishes the 117's input impedance and a 20 A, 30-second current rating; UNI-T's sources state neither for the UT139C.",
    "The 117 carries a 3-year warranty; we found no warranty term for the UT139C.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">LoZ is the 117&apos;s whole case against the UT139C</h2>
        <p className="text-muted leading-7 mb-4">
          Strip away the features the two share and one electrician-specific function is left. A conductor that runs
          alongside a live one, but isn&apos;t connected to anything, picks up voltage through stray capacitance. A
          normal high-impedance volts input barely loads that coupling, so the meter shows a convincing number on a
          wire that can&apos;t deliver any power. The 117&apos;s AutoVolt position switches to a low-impedance input
          of about 3 kΩ, and the phantom collapses while a genuine supply holds up. The UT139C has no equivalent:
          UNI-T&apos;s own page says LoZ belongs to the newer UT139E and UT139S.
        </p>
        <Figure
          caption={
            <>
              Fluke 117 input impedance by function, on a log scale, per Fluke&apos;s datasheet. UNI-T doesn&apos;t
              publish the UT139C&apos;s input impedance, so it can&apos;t be plotted.
            </>
          }
        >
          <BarChart
            log
            items={[
              { label: "117 volts DC", value: 10000000, display: ">10 MΩ" },
              { label: "117 volts AC", value: 5000000, display: ">5 MΩ" },
              { label: "117 AutoVolt (LoZ)", value: 3000, display: "≈3 kΩ", highlight: true },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          That impedance drop of more than a thousand times is what does the work. We&apos;ve already shown the
          voltage-divider arithmetic in{" "}
          <Link href="/multimeters/fluke-115-vs-fluke-117" className={link}>
            Fluke 115 vs Fluke 117
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/fluke-117-vs-klein-mm400" className={link}>
            Fluke 117 vs Klein MM400
          </Link>
          , so here the practical question is what a UT139C owner does instead. The answer is to load the conductor
          yourself, with a low-impedance plug-in tester or a resistor across the leads, as our guide to{" "}
          <Link href="/multimeters/how-to-measure-voltage-on-a-floating-ground-circuit" className={link}>
            spotting phantom voltage on a floating circuit
          </Link>{" "}
          describes. It works, but it&apos;s a second tool and a second step on every suspect reading.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Worked scenario: de-energizing a 240V dryer circuit in an old house</h2>
        <p className="text-muted leading-7 mb-4">
          You&apos;re replacing a NEMA 14-30 dryer receptacle in a house with a crowded panel and an old conduit run
          shared with other circuits. Nominal readings on a live 14-30 are 240V between the two hots, 120V from each
          hot to neutral and about 0V from neutral to ground. The job is live-dead-live: prove the meter, prove the
          circuit dead, prove the meter again.
        </p>
        <DataTable
          head={["Step", "Fluke 117", "UNI-T UT139C"]}
          rows={[
            ["Prove the meter on a known live outlet", "Yes; AutoVolt reads 120V AC without choosing AC", "Yes; select AC volts"],
            ["Quick check that the receptacle is live before work", "VoltAlert NCV", "NCV"],
            ["Breaker off: read X-Y, X-N, Y-N and X-G, Y-G", "Expect about 0V on every pair", "Expect about 0V on every pair"],
            ["One pair shows tens of volts with the breaker off", "AutoVolt (LoZ): a phantom collapses toward 0V, a real feed holds", "Reading alone can't separate phantom from feed; add a load and retest"],
            ["Prove the meter again on the live outlet", "Yes", "Yes"],
            ["Check the dryer element's resistance, unplugged", "Yes", "Yes"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The fourth row is the only place the meters differ, and it&apos;s exactly the reading that matters. A real
          voltage there means a mislabeled breaker or a backfeed, and you must not touch the conductors. A phantom
          means you&apos;re safe to proceed. The 117 answers that in one turn of the dial. With the UT139C you
          treat the reading as live until a loaded test proves otherwise, which is the correct, slower habit. For
          more on unexpected readings at 240V outlets, see{" "}
          <Link href="/multimeters/why-does-my-multimeter-read-120v-instead-of-240v" className={link}>
            why a meter reads 120V instead of 240V
          </Link>
          .
        </p>
        <Callout title="CAT III 600V on both, CAT IV on neither">
          Both meters are rated CAT III 600V, which covers panelboards, feeders, branch circuits and receptacles like
          this one, including 277V lighting and 480V three-phase equipment inside a building. Neither is rated CAT
          IV, so neither should be used on the service entrance, meter base or outdoor service conductors. If that
          work is yours, look at a CAT IV meter such as the one in{" "}
          <Link href="/multimeters/fluke-117-vs-fluke-179" className={link}>
            Fluke 117 vs Fluke 179
          </Link>
          . Never treat an NCV beep, or its silence, as proof that a conductor is dead.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where the UT139C is enough for electrical work</h2>
        <p className="text-muted leading-7 mb-4">
          LoZ earns its keep in remodels, service calls and troubleshooting, where you don&apos;t know what every
          conductor in a box is connected to. In new construction you pulled every wire yourself, phantom readings are
          rare, and the UT139C covers the job: True RMS for LED drivers and variable-speed equipment, CAT III 600V for
          panels, NCV for a fast first check and a 10A range. Its AC volts spec, ±(0.8% + 3), is even slightly tighter
          on paper than the 117&apos;s ±(1.0% + 3).
        </p>
        <p className="text-muted leading-7 mb-4">
          It also does two things the 117 can&apos;t. The included temperature probe reads -40 to 1000 °C, handy for
          checking a motor frame or a condenser line, and its capacitance range reaches 99.99 mF. Electricians who
          also do light HVAC work may value those more than LoZ. And at roughly a third of a Fluke&apos;s price,
          it&apos;s a sensible apprentice meter or a second meter for the van.
        </p>
        <KeyIdea title="Who should pay for the 117">
          Pay for the 117 if you work in occupied buildings with unknown wiring, if your employer or insurer expects a
          name-brand meter with a documented warranty, or if you want AutoVolt and LoZ on one dial position. We
          bought a Fluke 117 and use it on our own bench, which is why it carries our Hands-on Tested badge; we
          haven&apos;t published readings from it. Our UT139C assessment is desk research from UNI-T&apos;s
          documentation and the Amazon listing.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Electrician feature checklist</h2>
        <DataTable
          head={["Feature", "Fluke 117", "UNI-T UT139C", "Why electricians care"]}
          rows={[
            ["LoZ", "Yes", "No", "Separates ghost voltage from a real feed"],
            ["NCV", "Yes (VoltAlert)", "Yes", "Fast live check before opening a box"],
            ["Auto AC/DC", "Yes (AutoVolt)", "Not stated", "One dial position for mixed AC and DC controls"],
            ["True RMS", "Yes", "Yes", "Correct readings on LED drivers and drives"],
            ["CAT rating", "CAT III 600V", "CAT III 600V", "Panels and branch circuits; not the service"],
            ["Temperature", "No", "Yes", "Motor and HVAC checks"],
            ["Warranty", "3 years", "Not stated", "Cost of a failed meter mid-job"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If the 117 is more than you need but you want a Fluke, the 115 drops LoZ, AutoVolt and VoltAlert; we set it
          against the same UNI-T for general field work in{" "}
          <Link href="/multimeters/fluke-115-vs-uni-t-ut139c" className={link}>
            Fluke 115 vs UNI-T UT139C
          </Link>
          . For more picks, see the{" "}
          <Link href="/multimeters/best-multimeter-for-electricians" className={link}>
            best multimeter for electricians
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/best-multimeters-for-electricians-under-100" className={link}>
            the best multimeters for electricians under $100
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "For electricians who troubleshoot existing buildings, the Fluke 117 is worth its higher price because LoZ settles ghost-voltage readings instantly, AutoVolt saves dial changes, and Fluke backs it for three years. The UNI-T UT139C is the right call for new-construction work, apprentices and homeowners: it matches the 117 on True RMS, CAT III 600V and NCV and adds temperature, at a fraction of the cost.",
  faqs: [
    {
      question: "Does the UNI-T UT139C have LoZ?",
      answer:
        "No. UNI-T's UT139 series page says LoZ for AC volts is a feature of the newer UT139E and UT139S models, not the UT139C. Without it, a phantom voltage on an open conductor looks like a real reading, so you need a separate low-impedance tester or a deliberate load to check. The Fluke 117 has LoZ through its AutoVolt position.",
    },
    {
      question: "Are the Fluke 117 and UNI-T UT139C both safe for panel work?",
      answer:
        "Both are rated CAT III 600V, which covers panelboards, feeders and branch circuits inside a building, including 277V and 480V equipment. Neither is rated CAT IV, so neither belongs on the service entrance or meter base. Use leads with the same or higher rating, and prove the meter on a known live source before and after testing.",
    },
    {
      question: "Is the NCV on the UT139C as good as Fluke's VoltAlert?",
      answer:
        "We can't compare them directly: neither maker's sources we checked publish a voltage range for the detector, and we haven't bench-tested the UT139C. UNI-T says its NCV works by sensing electric field strength. Treat either as a quick first check only, never as proof that a conductor is dead.",
    },
    {
      question: "Is the Fluke 117 worth the money for an apprentice?",
      answer:
        "Often not at first. An apprentice working under supervision on new installations gets True RMS, CAT III 600V and NCV from the UT139C at a fraction of the price. Once you start troubleshooting existing wiring on your own, the 117's LoZ and 3-year warranty become worth paying for, and the UT139C can stay in the van as a backup.",
    },
    {
      question: "Can either meter measure a 30A circuit's current?",
      answer:
        "Not continuously. Both top out at 10 A through the leads. Fluke rates the 117 for 20 A for up to 30 seconds; UNI-T doesn't state an overload time for the UT139C. For load current on larger circuits, use a clamp meter, which measures without breaking the circuit and keeps you out of the series path.",
    },
    {
      question: "Which meter reads temperature?",
      answer:
        "Only the UNI-T UT139C. UNI-T lists -40 to 1000 °C with a probe included, which helps when checking motor frames, condenser lines or a hot connection after it's de-energized. The Fluke 117 has no temperature function; in Fluke's 110 Series that's the 116, which drops the 117's 6 A and 10 A current ranges.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
    { label: "Best multimeters for electricians under $100", href: "/multimeters/best-multimeters-for-electricians-under-100" },
    { label: "Spotting phantom voltage on a floating circuit", href: "/multimeters/how-to-measure-voltage-on-a-floating-ground-circuit" },
    { label: "Extech EX330 vs UNI-T UT139C", href: "/multimeters/extech-ex330-vs-uni-t-ut139c" },
  ],
};

export default function Fluke117VsUniTUt139cPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
