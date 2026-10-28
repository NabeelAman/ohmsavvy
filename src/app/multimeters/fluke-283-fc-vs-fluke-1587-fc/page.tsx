// Specs per this repo's existing Picks and "Specs per" notes (no new sources fetched for this page):
// - Fluke 283 FC/PV: Pick in src/lib/multimeter-catalog.ts and the notes on /multimeters/fluke-283-fc-vs-fluke-87v and
//   /multimeters/fluke-283-fc-vs-fluke-289, from fluke.com
//   (https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/283-fcpv-solar-digital-multimeter,
//   checked 2026-10-28) and Amazon B0DGBYD8ZK. KIT: no bare 283 FC is listed on Amazon.com, so the Pick is the
//   283 FC/PV kit (283 FC meter, a283 FC wireless clamp, Stäubli MC4 leads, TL175-HV TwistGuard leads, case,
//   magnetic strap). 6000 counts; DC V 6/60/600 V ±(0.09% + 3), 1500 V ±(0.15% + 2); AC V to 1000 V ±(1.0% + 3) at
//   45-500 Hz; current only through the a283 FC clamp: 60 A AC/DC, 0.01 A resolution, ±(1.5% + 0.15 A), 34 mm jaw;
//   no current jacks on the meter; resistance 600 Ω-6 MΩ ±(0.5% + 4), 50 MΩ ±(1.5% + 4); capacitance to 9999 µF;
//   frequency to 99.99 kHz ±(0.1% + 2); calculated AC VA to 60 kVA, DC VA to 90 kVA; polarity indicators; user limit
//   gauge; readiness self-check; logging with real-time clock (memory size not stated); Fluke Connect; CAT III 1500V /
//   CAT IV 1000V; IP52; 2 m drop; operating -10 to 60 °C; meter 3 x AA, >150 h without backlight, >100 h linked to the
//   clamp; clamp 2 x AAA >80 h; meter 0.7 kg (Amazon "16 ounces": conflict), clamp 0.375 kg; meter limited lifetime
//   warranty, clamp 1 year. LoZ, low-pass filter, temperature and insulation testing are not listed.
// - Fluke 1587 FC: Pick in src/lib/multimeter-catalog.ts (Amazon B017OVC2UI, bare meter; I400/62MAX+/MDT kits are
//   separate ASINs) and the notes on /multimeters/fluke-1587-fc-vs-fluke-87v and /multimeters/fluke-1577-vs-fluke-1587-fc
//   (fluke.com 1587 FC page and the 1587 FC/1577 technical data sheet, checked 2026-10-27/28): 6000 counts; insulation
//   test 50/100/250/500/1000 V (+20%/-0%), 0.01 MΩ to 2 GΩ, 1 mA nominal; accuracy ±(3% + 5) at 50/100 V,
//   ±(1.5% + 5) at 250-1000 V, ±(10% + 3) for 0.6-2.0 GΩ; PI/DAR with TrendIt graphs, app memory and temperature
//   compensation over Fluke Connect; inhibits the test above 30 V; auto discharge <0.5 s for 1 µF or less; max
//   capacitive load 1 µF; DC V ±(0.09% + 2) to 1000 V; AC V ±(1% + 3) at 50-60 Hz, ±(2% + 3) to 5 kHz; low-pass
//   filter; current 60 mA and 400 mA only; resistance 600 Ω-6 MΩ ±(0.9% + 2), 50 MΩ ±(1.5% + 3); capacitance to
//   9999 µF; frequency to 99.99 kHz ±(0.1% + 1); temperature -40 to 537 °C, K-type included; CAT IV 600V /
//   CAT III 1000V; IP40 (non-operating); operating -20 to 55 °C; 4 x AA, 1000 h meter use, at least 1000 insulation
//   tests; 550 g (Amazon 1645 g: conflict); three-year warranty, extendable to five with registration within 45 days
//   per the data sheet ("offer may be discontinued without notice"). Drop rating not stated.
// Picks: Fluke 283 FC/PV (4.5) and Fluke 1587 FC (4.6); neither is hands-on tested by us. The maintenance-visit task
// list is a general workflow, not a test we ran. We give no PV insulation test voltage: that comes from the module,
// inverter and installation documentation.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-283-fc-vs-fluke-1587-fc";

export const metadata = buildMetadata({
  title: "Fluke 283 FC vs 1587 FC Comparison: PV or Motors",
  description:
    "Fluke 283 FC vs 1587 FC comparison for maintenance: a 1500 V solar kit with a wireless 60 A clamp against a 1000 V insulation multimeter with PI/DAR tests.",
  path: "/multimeters/fluke-283-fc-vs-fluke-1587-fc",
});

const link = "text-accent hover:underline";
const all = getAllPicks("multimeters");

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 283 FC vs Fluke 1587 FC: Which Is Better for Electrical Maintenance?",
  path,
  published: "2026-10-29",
  intro:
    "This Fluke 283 FC vs 1587 FC comparison is about which assets you maintain. If your rounds cover solar arrays and other DC systems up to 1500 V, the 283 FC is the better fit: it is rated CAT III 1500V and reads string current through a wireless 60 A AC/DC clamp. If your rounds cover motors, cables and switchgear, the 1587 FC is better: it tests insulation at 50 to 1000 V up to 2 GΩ and stores PI/DAR results. Both report to the Fluke Connect app. On Amazon the 283 FC is sold only as the 283 FC/PV kit, which is what we compare here; neither has been hands-on tested by us.",
  a: {
    pick: all.find((p) => p.name === "Fluke 283 FC/PV")!,
    imageAlt: "Fluke 283 FC/PV kit laid out with the 1500 V meter, a283 FC clamp, MC4 test leads and case",
    chooseIf: [
      "You maintain PV strings, combiners or battery systems up to 1500 V DC",
      "You need DC current without breaking the circuit, from a clamp you can read at a distance",
      "Your work is outdoors, where IP52 and a 2 m drop rating matter",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 1587 FC")!,
    imageAlt: "Fluke 1587 FC insulation multimeter, front view showing the insulation test position on the dial",
    chooseIf: [
      "Your preventive maintenance includes insulation resistance on motors, cables or transformers",
      "You want PI and DAR trends with temperature compensation saved per asset",
      "You also check VFD outputs and equipment temperatures on the same round",
    ],
  },
  extraSpecs: [
    { label: "Amazon listing", a: "283 FC/PV kit only (meter, clamp, leads)", b: "Bare meter" },
    { label: "Safety rating", a: "CAT III 1500V / CAT IV 1000V", b: "CAT III 1000V / CAT IV 600V" },
    { label: "DC volts", a: "To 1500 V; ±(0.09% + 3) to 600 V", b: "To 1000 V; ±(0.09% + 2)" },
    { label: "AC volts", a: "To 1000 V; ±(1.0% + 3) at 45–500 Hz", b: "To 1000 V; ±(1% + 3) at 50–60 Hz" },
    { label: "Current", a: "a283 FC clamp, 60 A AC/DC; no jacks", b: "Jacks, 60 mA and 400 mA only" },
    { label: "Insulation test", a: "Not listed", b: "50–1000 V, 0.01 MΩ to 2 GΩ, PI/DAR" },
    { label: "Resistance", a: "To 50 MΩ, ±(0.5% + 4) to 6 MΩ", b: "To 50 MΩ, ±(0.9% + 2) to 6 MΩ" },
    { label: "Capacitance", a: "To 9,999 µF", b: "To 9,999 µF" },
    { label: "Frequency", a: "To 99.99 kHz", b: "To 99.99 kHz" },
    { label: "Temperature", a: "Not listed", b: "-40 to 537 °C, K-type included" },
    { label: "Low-pass filter", a: "Not listed", b: "Yes" },
    { label: "Solar tools", a: "Polarity alert, limit gauge, VA, MC4 leads", b: "None" },
    { label: "Fluke Connect", a: "Yes; logging with real-time clock", b: "Yes; PI/DAR TrendIt, app memory" },
    { label: "Sealing / drop", a: "IP52; 2 m", b: "IP40 (non-operating); not stated" },
    { label: "Operating temperature", a: "-10 to 60 °C", b: "-20 to 55 °C" },
    { label: "Battery", a: "3 × AA, >150 h; clamp 2 × AAA", b: "4 × AA, 1000 h; 1000+ insulation tests" },
    { label: "Weight", a: "Meter 0.7 kg; clamp 0.375 kg", b: "550 g (Amazon lists 1645 g)" },
    { label: "Warranty", a: "Meter limited lifetime; clamp 1 year", b: "3 years" },
  ],
  differences: [
    "The 283 FC is rated and ranged for 1500 V DC (CAT III 1500V); the 1587 FC tops out at 1000 V (CAT III 1000V / CAT IV 600V).",
    "Only the 1587 FC tests insulation, at five voltages from 50 to 1000 V, with PI and DAR; Fluke lists no insulation function for the 283 FC.",
    "The 283 FC reads up to 60 A AC/DC through its wireless clamp and has no current jacks; the 1587 FC measures current in series only to 400 mA and has no clamp in the bare-meter listing.",
    "Only the 1587 FC lists temperature and a low-pass filter; only the 283 FC has polarity alerts, a limit gauge and calculated VA.",
    "Capacitance (to 9,999 µF), frequency (to 99.99 kHz), top resistance (50 MΩ) and display size (6,000 counts) are the same on both.",
    "The 283 FC is IP52 with a 2 m drop rating and lifetime coverage on the meter; the 1587 FC is IP40 with a three-year warranty.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Two Fluke Connect tools, two kinds of asset</h2>
        <p className="text-muted leading-7 mb-4">
          The &quot;FC&quot; in both names means the same thing: each meter pushes its readings to the Fluke Connect
          app, so a technician can file results against an asset instead of writing them on a clipboard. What ends
          up in that file is where they part ways. A 283 FC record describes a power source at work: string
          voltage, string current, polarity and the calculated VA at the time of the check. A 1587 FC record
          describes the health of something that is switched off: how many megohms its insulation holds at a
          chosen test voltage, and whether that number climbs properly over ten minutes.
        </p>
        <InfoCards
          items={[
            { label: "283 FC records", desc: "Volts to 1500 V DC and amps to 60 A, time-stamped." },
            { label: "283 FC alerts", desc: "Reversed polarity and readings outside your limit gauge." },
            { label: "283 FC in the field", desc: "IP52, 2 m drop, -10 to 60 °C operating." },
            { label: "1587 FC records", desc: "Insulation in MΩ or GΩ at 50 to 1000 V." },
            { label: "1587 FC trends", desc: "PI and DAR graphs with temperature compensation." },
            { label: "1587 FC on the bench", desc: "Low-pass filter and K-type temperature." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          A maintenance department that owns both kinds of equipment ends up with both kinds of record in the
          same app, which is a reasonable argument for owning both meters. If you have to choose one, choose by
          which failure costs you more: a string that quietly stops producing, or a motor that fails to ground.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The ratings and ranges that set their limits</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Highest DC voltage each meter is rated to measure (CAT III).</>}>
            <BarChart
              items={[
                { label: "Fluke 1587 FC", value: 1000, display: "1000 V" },
                { label: "Fluke 283 FC", value: 1500, display: "1500 V", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Highest current each reads, log scale: in-series jacks versus a clamp.</>}>
            <BarChart
              log
              items={[
                { label: "1587 FC jacks", value: 0.4, display: "0.4 A" },
                { label: "283 FC clamp", value: 60, display: "60 A", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Rated meter battery life in hours (Fluke figures; 283 FC is a minimum).</>}>
            <BarChart
              items={[
                { label: "283 FC with clamp", value: 100, display: ">100 h" },
                { label: "283 FC alone", value: 150, display: ">150 h" },
                { label: "1587 FC meter use", value: 1000, display: "1000 h", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Highest resistance reported, log scale. The gigohm reading needs the 1587 FC&apos;s insulation test.</>}>
            <BarChart
              log
              items={[
                { label: "283 FC ohms", value: 50, display: "50 MΩ" },
                { label: "1587 FC ohms", value: 50, display: "50 MΩ" },
                { label: "1587 FC insulation", value: 2000, display: "2 GΩ", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The voltage chart is the one with consequences. A 1500 V string can exceed the 1587 FC&apos;s rating
          even before you account for cold mornings, so the 1587 FC belongs nowhere near the DC side of a
          utility or large commercial array. Below 1000 V the rule changes: on a residential string or a 480 V
          motor control center, both meters are within their ratings for voltage checks. Several numbers are
          simply identical, though, so don&apos;t pay for a difference that isn&apos;t there: both show 6,000
          counts, reach 50 MΩ on the ohms range, measure capacitance to 9,999 µF and frequency to 99.99 kHz.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">A preventive-maintenance round, task by task</h2>
        <p className="text-muted leading-7 mb-4">
          Here is how a typical mixed site&apos;s checklist splits between the two. This is a general task list,
          not a test procedure we ran; your own procedures and equipment manuals take priority.
        </p>
        <DataTable
          head={["Maintenance task", "283 FC/PV kit", "1587 FC"]}
          rows={[
            ["String open-circuit voltage up to 1500 V", "Yes, MC4 leads", "No, rated to 1000 V"],
            ["String or combiner current", "Yes, clamp to 60 A DC", "No, 400 mA max"],
            ["Polarity check before connecting", "Audible and visual alert", "Reads sign only"],
            ["Motor winding insulation to ground", "Not listed", "Yes, 50–1000 V, PI/DAR"],
            ["Feeder cable insulation after a repair", "Not listed", "Yes, to 2 GΩ"],
            ["Voltage at a drive output", "No filter listed", "Low-pass filter"],
            ["Bearing or terminal temperature", "Not listed", "K-type, -40 to 537 °C"],
            ["Run capacitor value", "To 9,999 µF", "To 9,999 µF"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The pattern is clear: the 283 FC does energized checks on DC generation, and the 1587 FC does
          de-energized checks on AC equipment plus routine meter work. For more on each specialty, see{" "}
          <Link href="/multimeters/fluke-283-fc-vs-fluke-87v" className={link}>
            Fluke 283 FC vs Fluke 87V
          </Link>{" "}
          for string voltage and clamp technique, and{" "}
          <Link href="/multimeters/fluke-1587-fc-vs-fluke-87v" className={link}>
            Fluke 1587 FC vs Fluke 87V
          </Link>{" "}
          for how an insulation test and its PI ratio work.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Can the 1587 FC check PV insulation?</h2>
        <p className="text-muted leading-7 mb-4">
          It is a fair question, since damaged insulation on DC wiring is one possible reason for a PV ground-fault
          alarm. Three facts
          from Fluke limit the answer. First, the 1587 FC&apos;s highest test voltage is 1000 V and its
          measurement rating is CAT III 1000V, so it should not be connected to a system that can exceed that.
          Second, it refuses to start a test when more than 30 V is present on its terminals, and a string
          exposed to daylight generates voltage, so the conductors must be isolated from the modules before a
          test can even begin. Third, its maximum capacitive load is 1 µF, and long DC runs add capacitance.
        </p>
        <p className="text-muted leading-7">
          We don&apos;t give a PV test voltage here: that comes from the module, inverter and installation
          documentation, and the work belongs to a qualified PV technician. The 283 FC does not try to cover this
          job at all. For ground-fault symptoms you can investigate with a meter first, see our guides to{" "}
          <Link href="/multimeters/how-to-diagnose-dc-arc-fault-warnings-in-a-solar-inverter" className={link}>
            DC arc-fault warnings in a solar inverter
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/how-to-test-a-solar-panel-with-a-multimeter" className={link}>
            testing a solar panel with a multimeter
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What you get in the box, and how long it is covered</h2>
        <p className="text-muted leading-7 mb-4">
          The listings are not like for like. Amazon.com sells the 283 FC only as the 283 FC/PV kit, so you
          receive the meter, the a283 FC clamp, Stäubli MC4 leads, TL175-HV TwistGuard leads, a case and a
          magnetic strap whether you need all of it or not. The 1587 FC listing we link is the bare meter with
          its remote probe and K-type thermocouple; bundles that add a current clamp or other accessories are
          separate listings. If you need current readings on AC equipment as well, weigh the kit against the
          1587 FC plus a separate clamp meter, since the bare 1587 FC stops at 400 mA.
        </p>
        <p className="text-muted leading-7">
          Coverage differs as well. Fluke gives the 283 FC meter a limited lifetime warranty and the clamp one
          year. The 1587 FC carries three years, which Fluke&apos;s data sheet says can extend to five if you
          register within 45 days, an offer Fluke says may end without notice. Two source conflicts appear in
          the specs: Amazon lists the 283 FC/PV at 16 ounces against Fluke&apos;s 0.7 kg for the meter, and the
          1587 FC at 1645 g against Fluke&apos;s 550 g. We use Fluke&apos;s figures in both cases.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 283 FC vs 1587 FC: which should you buy?</h2>
        <DataTable
          head={["Your maintenance role", "Choose", "Reason"]}
          rows={[
            ["Solar O&M technician on 1000–1500 V arrays", "283 FC/PV kit", "Only one rated for 1500 V DC"],
            ["Plant electrician with motors and pumps", "1587 FC", "Insulation tests with PI/DAR history"],
            ["Contractor commissioning new feeders", "1587 FC", "Megohm readings before energizing"],
            ["Battery storage or DC data center checks", "283 FC/PV kit", "60 A AC/DC clamp, 1500 V rating"],
            ["Technician on drive-fed HVAC equipment", "1587 FC", "Low-pass filter and temperature"],
            ["Outdoor work in dust and rain", "283 FC/PV kit", "IP52 and 2 m drop vs IP40"],
            ["Mixed site with PV and rotating equipment", "Both", "No overlap in their specialties"],
          ]}
        />
        <div className="mt-4">
          <KeyIdea title="Choose by the failure you need to prevent">
            The 283 FC helps you catch a string that is underproducing, reversed or outside its expected voltage.
            The 1587 FC helps you catch insulation that is drifting toward a fault before it trips a breaker or
            burns a winding. Buying the wrong one leaves that failure unchecked, whatever its other specs. For
            the simpler insulation model, see{" "}
            <Link href="/multimeters/fluke-1577-vs-fluke-1587-fc" className={link}>
              Fluke 1577 vs Fluke 1587 FC
            </Link>
            ; for more solar options, see the{" "}
            <Link href="/multimeters/best-multimeters-for-solar-panel-testing" className={link}>
              best multimeters for solar panel testing
            </Link>
            .
          </KeyIdea>
        </div>
      </section>

      <Callout title="Safety: high test voltage and live DC both need qualified hands">
        An insulation test drives up to 1000 V DC into the circuit, and PV strings stay energized whenever light
        reaches the modules. Only qualified, trained personnel should do either job. Before an insulation test,
        de-energize the equipment, apply lockout/tagout, verify absence of voltage with a meter proven on a known
        live source, and disconnect electronics the test voltage could damage. Keep everyone clear of the
        conductors during the test, then let the 1587 FC discharge the circuit and confirm zero before you touch
        anything, because cables and windings hold charge. Never open an MC4 connector or a fuse holder under load:
        a DC arc does not self-extinguish. Use the clamp for string current, use leads rated for the system
        voltage, and never use the 1587 FC on a system that can exceed 1000 V. If anything is scorched, damaged or
        repeatedly faulting, stop and call a licensed electrician or PV installer.
      </Callout>
    </>
  ),
  bottomLine:
    "The Fluke 283 FC/PV kit is the better maintenance tool for solar and other DC systems up to 1500 V, thanks to its 1500 V rating, wireless 60 A AC/DC clamp, polarity alerts and IP52 body. The Fluke 1587 FC is the better tool for motors, cables and switchgear, because only it tests insulation from 50 to 1000 V with PI/DAR and temperature compensation. They share a 6,000-count display and Fluke Connect but little else, so pick the one that matches the equipment you look after.",
  faqs: [
    {
      question: "Can the Fluke 283 FC test insulation resistance?",
      answer:
        "Fluke doesn't list an insulation test function for the 283 FC. Its resistance range reaches 50 MΩ using the ordinary ohms circuit, which is useful for continuity and component checks but does not apply a high test voltage. For insulation resistance at 50 to 1000 V, with PI and DAR, you need an insulation multimeter such as the 1587 FC.",
    },
    {
      question: "Can I use the Fluke 1587 FC on a 1500 V solar array?",
      answer:
        "No. The 1587 FC is rated CAT III 1000V / CAT IV 600V and its voltage ranges end at 1000 V, so it should not be connected to a system that can exceed that. The 283 FC is rated CAT III 1500V for exactly that job. Any insulation testing on an array should follow the manufacturer's procedure and be done by a qualified PV technician.",
    },
    {
      question: "Can I buy the Fluke 283 FC without the clamp?",
      answer:
        "Not on Amazon.com when we checked. The only listing is the 283 FC/PV kit, which includes the 283 FC meter, the a283 FC wireless AC/DC clamp, Stäubli MC4 leads, TL175-HV leads and a case. That matters because the meter itself has no current jacks: without the clamp it cannot measure current at all.",
    },
    {
      question: "Do the Fluke 283 FC and 1587 FC both work with Fluke Connect?",
      answer:
        "Yes, both send readings to the Fluke Connect app. The 283 FC adds logging with a real-time clock, live trends and shareable reports, though Fluke doesn't state its memory size. The 1587 FC uses the app to store insulation results and draw PI and DAR trends as TrendIt graphs, with temperature compensation for comparing tests over time.",
    },
    {
      question: "Which is tougher for outdoor maintenance work?",
      answer:
        "The 283 FC, on Fluke's ratings. It is sealed to IP52, drop-rated to 2 m and works from -10 to 60 °C. The 1587 FC is rated IP40 when not operating, Fluke doesn't state a drop height in our sources, and it works from -20 to 55 °C, so it handles cold slightly better but offers less protection from dust and water.",
    },
    {
      question: "Which has the longer battery life, the 283 FC or the 1587 FC?",
      answer:
        "The 1587 FC. Fluke rates it at 1000 hours of meter use and at least 1000 insulation tests on four AA cells. The 283 FC meter runs more than 150 hours on three AA cells without the backlight, or more than 100 hours while linked to the clamp, and the clamp itself runs more than 80 hours on two AAA cells.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 283 FC vs Fluke 87V", href: "/multimeters/fluke-283-fc-vs-fluke-87v" },
    { label: "Fluke 283 FC vs Fluke 289", href: "/multimeters/fluke-283-fc-vs-fluke-289" },
    { label: "Fluke 1577 vs Fluke 1587 FC", href: "/multimeters/fluke-1577-vs-fluke-1587-fc" },
    { label: "Fluke 1587 FC vs Fluke 87V", href: "/multimeters/fluke-1587-fc-vs-fluke-87v" },
    { label: "Fluke 1587 FC vs Fluke 87V MAX", href: "/multimeters/fluke-1587-fc-vs-fluke-87v-max" },
    { label: "Fluke 3000 FC vs Fluke 87V", href: "/multimeters/fluke-3000-fc-vs-fluke-87v" },
  ],
};

export default function Fluke283FcVsFluke1587FcPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
