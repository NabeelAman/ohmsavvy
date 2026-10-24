import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { CategoryHero } from "@/components/CategoryHero";
import { ReviewArticle } from "@/components/ReviewArticle";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";
import { guidePicks } from "@/lib/content";

export const metadata = buildMetadata({
  title: "10 Best Multimeters for Measuring Low Resistance",
  description:
    "The best multimeters for measuring low resistance, from 2-wire meters with milliohm ranges and lead zeroing to 4-wire micro-ohm meters for shunts and windings.",
  path: "/multimeters/best-multimeters-for-measuring-low-resistance",
  image: "https://m.media-amazon.com/images/I/71LKJXNQ5CL._SL1500_.jpg",
});

const all = getAllPicks("multimeters");
const picks = guidePicks("/multimeters/best-multimeters-for-measuring-low-resistance")
  .map((n) => all.find((p) => p.name === n)!)
  .filter(Boolean);

const linkClass = "text-accent hover:underline";

const comparisonRows: string[][] = [
  ["1", "Fluke 289", "2-wire, 10 mA source", "1 mΩ (50 Ω range)", "REL", "Shunts and contacts on a full multimeter"],
  ["2", "UNI-T UT620A", "4-wire Kelvin, up to 5 A", "10 µΩ", "Zeroing", "Busbars, welds, motor windings"],
  ["3", "UNI-T UT620C+", "4-wire Kelvin, up to 1 A", "1 µΩ", "ZERO key", "Portable micro-ohm checks on wire and fuses"],
  ["4", "Fluke 287", "2-wire", "0.01 Ω (500 Ω range)", "REL", "Precise bench ohms with logging"],
  ["5", "EEVblog Brymen BM786", "2-wire", "0.01 Ω (600 Ω range)", "Relative Zero", "PCB repair and short hunting"],
  ["6", "UNI-T UT181A", "2-wire", "0.01 Ω (implied by counts)", "REL", "Logging a resistance that drifts with heat"],
  ["7", "UNI-T UT61E+", "2-wire", "0.01 Ω (220 Ω range)", "REL", "Budget 0.01 Ω readings with a PC link"],
  ["8", "OWON B41T+", "2-wire", "0.01 Ω (220 Ω range)", "Relative mode", "Budget 0.01 Ω readings over Bluetooth"],
  ["9", "OWON OW18E", "2-wire", "0.01 Ω (200 Ω range)", "REL (on display)", "The cheapest 0.01 Ω meter here"],
  ["10", "Fluke 87V", "2-wire", "0.1 Ω (600 Ω range)", "Relative mode", "Electrical work with occasional low-ohm checks"],
];

const lookFor = [
  { label: "Lowest resistance range", desc: "A 50 Ω or 200 Ω range resolves far finer than the 600 Ω range most electrician's meters start at." },
  { label: "The digit term in accuracy", desc: "On a low range, '+10 digits' or '+20 digits' can be larger than the resistance you're measuring. Read it before the percentage." },
  { label: "Lead zeroing", desc: "Test leads and probe contacts add tenths of an ohm. REL or ZERO subtracts them, so a 0.05 Ω part doesn't read 0.3 Ω." },
  { label: "4-wire (Kelvin) measurement", desc: "Separate current and sense leads take lead and contact resistance out of the reading entirely. Ordinary multimeters can't do it." },
  { label: "Test current", desc: "More current gives a bigger voltage to measure across a milliohm part. Multimeters use milliamps; micro-ohm meters use up to amps." },
  { label: "Inductive-load handling", desc: "Motor and transformer windings take time to settle and kick back when the current stops. A dedicated mode for them helps." },
];

const faqs = [
  {
    question: "Can a regular multimeter measure milliohms?",
    answer:
      "Only roughly. Most meters start at a 200 Ω to 600 Ω range with 0.01 Ω or 0.1 Ω steps, and their accuracy specs add 10 or more digits, so the fixed uncertainty is around 0.1 Ω or worse. The Fluke 289's 50 Ω range is the exception among handhelds here, at 1 mΩ resolution. For anything below a few tens of milliohms, a 4-wire micro-ohm meter is the right tool.",
  },
  {
    question: "What is 4-wire (Kelvin) resistance measurement?",
    answer:
      "One pair of leads drives a known current through the part and a second pair measures the voltage directly across it. Because almost no current flows in the sense leads, their resistance and the contact resistance at the clips don't add to the reading. That's why the UNI-T UT620A and UT620C+ can resolve micro-ohms while a 2-wire multimeter can't.",
  },
  {
    question: "How do I zero out test lead resistance on a multimeter?",
    answer:
      "Select the lowest resistance range, touch the probe tips firmly together, wait for the reading to settle and press REL (relative) or ZERO. The meter then subtracts that value from later readings. Redo it if you change leads, clips or probe tips, and keep the leads in the same position, because pressure and flexing change the contact resistance.",
  },
  {
    question: "How accurate is a multimeter on a 0.1 Ω resistor?",
    answer:
      "Work it out from the spec. On a range with 0.01 Ω resolution and a +10 digit term, the fixed part alone is 0.1 Ω, as large as the resistor. The Fluke 289's 50 Ω range, at ±(0.15% + 20 digits) with 1 mΩ resolution, gives roughly ±0.02 Ω. The UT620A's 120 mΩ range, at ±(0.25% + 25 digits) with 10 µΩ steps, gives about ±0.5 mΩ.",
  },
  {
    question: "What resistance should a motor winding or busbar joint read?",
    answer:
      "It depends on the conductor size and length, so compare against the manufacturer's figure or between phases of the same motor rather than against a universal number. Small motors and solenoid coils often read a few ohms, which a good multimeter handles, while large windings, busbar joints and welds sit in the milliohm or micro-ohm range where a 4-wire meter is needed.",
  },
  {
    question: "Why does my multimeter show a few tenths of an ohm with the leads shorted?",
    answer:
      "That's the resistance of the leads, the probe tips and the jack contacts. Typical values are a few tenths of an ohm, more if the tips are dirty or the leads are worn. Use the meter's relative mode to subtract it, clean the tips, and if the shorted reading jumps around, replace the leads before trusting any low-resistance measurement.",
  },
];

const fitNotes: Record<string, string> = {
  "Fluke 289":
    "It takes first place as the only full multimeter here with a dedicated 50 Ω range: 1 mΩ resolution from a 10 mA source, with relative mode for the leads. You get milliohm-level checks without carrying a second instrument. It's still a 2-wire measurement, so contact resistance stays in the reading, and the price is high.",
  "UNI-T UT620A":
    "For pure low-resistance accuracy it outperforms every multimeter here: 4-wire Kelvin clips, 5 A on the 120 mΩ range, 10 µΩ resolution and a published ±(0.25% + 25 digits). It ranks second only because it measures nothing but resistance, weighs 1.5 kg and costs about as much as the Fluke 289.",
  "UNI-T UT620C+":
    "It resolves 1 µΩ with 4-wire leads and a 1 A test current in a 480 g, IP54, rechargeable body, at about a third of the UT620A's price. UNI-T publishes accuracy only as up to ±0.1% of full scale, with no per-range table, and the lower test current is why it sits behind the UT620A.",
  "Fluke 287":
    "Its 500 Ω range reads to 0.01 Ω at ±(0.05% + 10 digits), a percentage term matched only by the same range on the Fluke 289, and REL removes the leads. It lacks the 289's 50 Ω range, so readings under about an ohm are limited by the 10-digit term.",
  "EEVblog Brymen BM786":
    "A 600.00 Ω range at 0.01 Ω and ±(0.085% + 10 digits), Relative Zero and a continuity beeper that responds in under 100 µs make it strong for finding shorts on circuit boards. It has no milliohm range, so treat readings under an ohm as comparisons rather than absolute values.",
  "UNI-T UT181A":
    "Its 600 Ω range at 60,000 counts implies 0.01 Ω steps, and the logger can record how a heating element's or winding's resistance changes as it warms. UNI-T doesn't publish per-range resolution or low-range accuracy, so it trails the Fluke and Brymen meters for absolute low-ohm work.",
  "UNI-T UT61E+":
    "The 220.00 Ω range resolves 0.01 Ω at ±(0.5% + 10 digits), and UNI-T's manual explicitly tells you to subtract the shorted-lead reading, which REL does for you. The 0.5% term is looser than the meters above it, but it's a capable low-cost choice.",
  "OWON B41T+":
    "Like the UT61E+, it offers a 220 Ω range at 0.01 Ω and ±(0.5% + 10 digits) with relative mode. Bluetooth and offline recording help when you're logging a resistance over time. OWON gives no CAT rating on its page, which matters only if the meter also goes near mains.",
  "OWON OW18E":
    "A 200.00 Ω range at 0.01 Ω and ±(0.5% + 10 digits) is the finest low-ohm resolution at the bottom of the price range. REL appears on the display, but OWON's spec text doesn't describe it.",
  "Fluke 87V":
    "Its 600.0 Ω range stops at 0.1 Ω with ±(0.2% + 2 digits), so it is the coarsest low-ohm meter here, though Fluke notes that relative mode removes lead resistance. It carries our Hands-on Tested badge and earns its place if your main work is electrical and low-ohm checks are occasional.",
};

const advice = [
  {
    heading: "Decide how low you actually need to go",
    body:
      "Speaker voice coils, heating elements, solenoids and relay coils sit in ohms or tens of ohms, where any 2-wire meter with a 200 Ω to 600 Ω range and REL does a good job. Current-sense shunts, relay contacts and long cable runs reach tenths of an ohm or less, which pushes you toward the Fluke 289. Busbar joints, crimps and welds need a 4-wire micro-ohm meter.",
  },
  {
    heading: "Do the uncertainty arithmetic before you buy",
    body:
      "Take the lowest range's digit term and multiply it by the resolution. On many 0.01 Ω meters that gives 0.1 Ω or more, which makes a 0.05 Ω reading meaningless as an absolute value. Comparing two similar parts with the same leads is still useful, but for a pass or fail against a milliohm limit, buy the instrument whose fixed error is well below that limit.",
  },
  {
    heading: "Treat leads and contacts as part of the measurement",
    body:
      "On a 2-wire meter, the probes, clips and the pressure you apply all add resistance. Zero the meter with the exact leads you'll use, press the tips firmly into clean metal, and take more than one reading. A 4-wire meter removes this problem, which is the main reason to buy one, more than its extra digits.",
  },
  {
    heading: "Don't overlook test current",
    body:
      "A meter that sources 1 mA through a 1 mΩ joint produces just 1 µV to measure. The Fluke 289 uses 10 mA on its 50 Ω range, the UT620C+ up to 1 A and the UT620A up to 5 A, which is why their low-range readings are steadier. The flip side is that a high current can warm a small part, so allow for that on fine wires and fuses.",
  },
];

export default function BestMultimetersForMeasuringLowResistancePage() {
  return (
    <>
      <CategoryHero
        category="multimeters"
        label="Multimeters · Low Resistance"
        heading="Top 10 Best Multimeters for Measuring Low Resistance"
        tagline="Ranked on finest ohms resolution, lead zeroing and 4-wire capability."
        description="Our top 10 best multimeters for measuring low resistance, ranked for shunts, contacts, windings and PCB shorts, with 2-wire meters that zero their leads and two 4-wire micro-ohm meters for readings no multimeter can resolve."
        primaryCta={{ label: "See the Full Roundup", href: "/multimeters/best-multimeters" }}
        secondaryCta={{ label: "Compare Side by Side", href: "#full-comparison" }}
        stats={[
          { value: `${picks.length}`, label: "Compared" },
          { value: "100%", label: "Spec-Verified" },
          { value: "$0", label: "Sponsored" },
        ]}
      />

      <section className="mx-auto max-w-4xl px-6 pt-12 space-y-10">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">Why low resistance is hard to measure</h2>
          <p className="text-muted leading-7">
            A multimeter measures resistance by pushing a small current through the part and reading the voltage it
            develops. At a kilohm that works beautifully. At a tenth of an ohm the voltage is tiny, the test leads and
            probe contacts add as much resistance as the part itself, and the meter&apos;s fixed error of 10 or 20 digits
            can swamp the reading. Those limits matter when you&apos;re{" "}
            <Link href="/multimeters/how-to-test-a-shunt-resistor-with-a-multimeter" className={linkClass}>
              testing a shunt resistor
            </Link>
            ,{" "}
            <Link href="/multimeters/how-to-measure-resistance-across-a-relay-contact-with-a-multimeter" className={linkClass}>
              checking relay contact resistance
            </Link>{" "}
            or{" "}
            <Link href="/multimeters/how-to-check-a-motor-winding-for-a-short-with-a-multimeter" className={linkClass}>
              looking for a shorted motor winding
            </Link>
            .
          </p>
          <p className="text-muted leading-7">
            We ranked these ten on the finest resolution of the lowest resistance range, the published accuracy on that
            range, whether the meter can zero out its leads, and whether it measures in 2-wire or 4-wire (Kelvin) mode. Two
            of the ten, the UNI-T UT620A and UT620C+, aren&apos;t multimeters at all: they are dedicated micro-ohm meters,
            included because no handheld multimeter reaches their resolution. For the basics of the ohms function, read{" "}
            <Link href="/multimeters/how-to-measure-resistance-in-ohms-with-a-digital-multimeter" className={linkClass}>
              measuring resistance with a digital multimeter
            </Link>
            ; for tracing a board fault, see{" "}
            <Link href="/multimeters/how-to-check-a-pcb-for-a-short-circuit-with-a-multimeter" className={linkClass}>
              checking a PCB for a short circuit
            </Link>
            .
          </p>
        </div>

        <Callout title="De-energize before you measure ohms">
          Resistance readings are only valid on a dead circuit, and a meter on its ohms range can be damaged by voltage.
          Switch off, isolate and lock out the supply, prove it dead with a voltage test, and discharge capacitors first.
          The UT620C+ lists input protection of only 36 V, so it must never touch a live conductor. Large windings store
          energy and can kick back when the test current stops, so keep the clips on until the reading has ended.
        </Callout>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">Quick comparison</h2>
          <DataTable
            head={["#", "Meter", "Method", "Finest resolution", "Lead zeroing", "Best for"]}
            rows={comparisonRows}
            mono={[0]}
          />
          <p className="text-xs text-muted leading-5">
            UNI-T lists the UT181A&apos;s 600 Ω range and 60,000 counts but not a per-range resolution. Its UT620A page also
            lists a 60 mΩ / 10 A range, while the datasheet and the meter&apos;s dial start at 120 mΩ / 5 A, which we use.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">How the ten compare on paper</h2>
          <Figure
            caption={
              <>
                Finest resistance resolution, on a log scale (shorter bar is finer). The two 4-wire meters resolve 100 to
                100,000 times finer than the multimeters.
              </>
            }
          >
            <BarChart
              log
              items={[
                { label: "UNI-T UT620C+", value: 1, display: "1 µΩ", highlight: true },
                { label: "UNI-T UT620A", value: 10, display: "10 µΩ", highlight: true },
                { label: "Fluke 289", value: 1_000, display: "1 mΩ" },
                { label: "Fluke 287", value: 10_000, display: "0.01 Ω" },
                { label: "EEVblog Brymen BM786", value: 10_000, display: "0.01 Ω" },
                { label: "UNI-T UT181A", value: 10_000, display: "0.01 Ω (implied)" },
                { label: "UNI-T UT61E+", value: 10_000, display: "0.01 Ω" },
                { label: "OWON B41T+", value: 10_000, display: "0.01 Ω" },
                { label: "OWON OW18E", value: 10_000, display: "0.01 Ω" },
                { label: "Fluke 87V", value: 100_000, display: "0.1 Ω" },
              ]}
            />
          </Figure>
          <div className="grid sm:grid-cols-2 gap-4">
            <Figure
              caption={
                <>
                  Fixed error on the lowest range: the spec&apos;s digit term times the resolution, on a log scale. Add
                  the percentage term on top. The UT620C+ and UT181A have no per-range figure.
                </>
              }
            >
              <BarChart
                log
                items={[
                  { label: "UNI-T UT620A", value: 0.25, display: "0.25 mΩ", highlight: true },
                  { label: "Fluke 289", value: 20, display: "20 mΩ" },
                  { label: "Fluke 287", value: 100, display: "100 mΩ" },
                  { label: "EEVblog Brymen BM786", value: 100, display: "100 mΩ" },
                  { label: "UNI-T UT61E+", value: 100, display: "100 mΩ" },
                  { label: "OWON B41T+", value: 100, display: "100 mΩ" },
                  { label: "OWON OW18E", value: 100, display: "100 mΩ" },
                  { label: "Fluke 87V", value: 200, display: "200 mΩ" },
                ]}
              />
            </Figure>
            <Figure
              caption={
                <>
                  Test current on the lowest range, where the maker publishes it, on a log scale. More current gives a
                  bigger signal across a milliohm part.
                </>
              }
            >
              <BarChart
                log
                items={[
                  { label: "UNI-T UT620A", value: 5000, display: "5 A", highlight: true },
                  { label: "UNI-T UT620C+", value: 1000, display: "1 A" },
                  { label: "Fluke 289", value: 10, display: "10 mA" },
                ]}
              />
            </Figure>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">What to look for in a low-resistance meter</h2>
          <InfoCards items={lookFor} />
          <KeyIdea title="2-wire vs 4-wire in one example">
            Measure a 0.1 Ω shunt with a 2-wire meter and the reading includes both leads and both probe contacts; REL
            removes the leads, but the contacts change every time you reposition the probes. A 4-wire meter sends current
            through one pair of clips and senses voltage through the other, so the contacts drop out. That&apos;s the
            difference between roughly ±0.02 Ω on the Fluke 289 and about ±0.5 mΩ on the UT620A at the same value. Long
            cables raise the same question; see{" "}
            <Link href="/multimeters/how-to-measure-continuity-on-a-long-electrical-wire" className={linkClass}>
              measuring continuity on a long wire
            </Link>{" "}
            and{" "}
            <Link href="/multimeters/how-to-measure-the-resistance-of-a-speaker-with-a-multimeter" className={linkClass}>
              measuring a speaker&apos;s resistance
            </Link>
            .
          </KeyIdea>
        </div>
      </section>

      <ReviewArticle
        picks={picks}
        faqs={faqs}
        howWeChose="We ranked these ten for low-resistance work: the finest resolution and published accuracy on the lowest ohms range first, then lead zeroing and 4-wire capability, then test current and extras like logging. Figures come from maker datasheets, manuals and official listings; this is desk research, and only the Fluke 87V carries our Hands-on Tested badge."
        fitNotes={fitNotes}
        advice={advice}
      />
      <ContentLinks category="multimeters" current="/multimeters/best-multimeters-for-measuring-low-resistance" />
    </>
  );
}
