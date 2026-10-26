import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { CategoryHero } from "@/components/CategoryHero";
import { ReviewArticle } from "@/components/ReviewArticle";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";
import { guidePicks } from "@/lib/content";

export const metadata = buildMetadata({
  title: "10 Best Multimeters for Electronics Repair",
  description:
    "Our top 10 best multimeters for electronics repair and PCB fault-finding, ranked on display counts, milliohm resolution for shorts, capacitance, µA and logging.",
  path: "/multimeters/best-multimeters-for-electronics-repair",
  image: "https://m.media-amazon.com/images/I/71LKJXNQ5CL._SL1500_.jpg",
});

const PATH = "/multimeters/best-multimeters-for-electronics-repair";
const all = getAllPicks("multimeters");
const picks = guidePicks(PATH)
  .map((n) => all.find((p) => p.name === n)!)
  .filter(Boolean);

const linkClass = "text-accent hover:underline";

// Fluke 87V maximum capacitance 9,999 µF per https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-87v
// Brymen's BM235 page (https://www.brymen.com/PD02BM230_235.html) lists no capacitance range.
const comparisonRows: string[][] = [
  ["1", "Fluke 289", "50,000", "1 mΩ (50 Ω range)", "1 nF to 100 mF", "Tracing shorted rails and logging intermittent faults"],
  ["2", "EEVblog Brymen BM786", "60,000", "0.01 Ω", "10.00 nF to 10.00 mF", "Fast continuity and fine readings without logging"],
  ["3", "Fluke 287", "50,000", "0.01 Ω", "1 nF to 100 mF", "Logged bench diagnosis without the 289's low-ohm range"],
  ["4", "UNI-T UT181A", "60,000", "0.01 Ω (implied)", "6 nF to 60 mF", "Color-screen logging and two temperature inputs"],
  ["5", "Fluke 87V", "6,000 (19,999 HiRes)", "0.1 Ω", "To 9,999 µF", "Mixed mains and board-level repair"],
  ["6", "UNI-T UT61E+", "22,000", "0.01 Ω", "22 nF to 220 mF", "Value bench meter with hFE and a PC link"],
  ["7", "OWON B41T+", "22,000", "0.01 Ω", "22 nF to 220 mF", "Budget logging of a fault that comes and goes"],
  ["8", "Brymen BM235", "6,000", "0.1 Ω", "Not stated on Brymen's page", "Appliance repair that crosses into mains wiring"],
  ["9", "OWON OW18E", "19,999", "0.01 Ω", "2 nF to 20 mF", "A low-cost second meter with Bluetooth"],
  ["10", "Fluke 179", "6,000", "0.1 Ω", "To 10,000 µF", "Rugged general repair where µA isn't needed"],
];

const lookFor = [
  { label: "Display counts", desc: "20,000 counts or more show the small differences between a healthy and a failing part, such as a regulator sagging by tens of millivolts." },
  { label: "Low-ohm resolution and REL", desc: "Finding which capacitor shorts a rail means comparing readings a few milliohms apart, with lead resistance zeroed out." },
  { label: "Capacitance range", desc: "From picofarad-level decoupling to the large filter capacitors in power supplies and amplifiers." },
  { label: "Diode test voltage", desc: "About 3 V lets you check LEDs and the body diodes of MOSFETs, not just silicon junctions." },
  { label: "Microamp current", desc: "Standby and leakage faults in battery devices show up as a few hundred microamps where there should be a few." },
  { label: "Min/Max and logging", desc: "Intermittent faults rarely appear while you watch; recording catches the dropout overnight." },
];

const faqs = [
  {
    question: "What is the best multimeter for electronics repair?",
    answer:
      "For board-level repair we rank the Fluke 289 first, because its 50 Ω range resolves 1 mΩ, which helps pin down which part is shorting a power rail, and it logs readings for intermittent faults. The EEVblog Brymen BM786 is the strongest choice without logging, and the UNI-T UT61E+ gives 0.01 Ω resolution for much less money.",
  },
  {
    question: "How many counts do I need for electronics repair?",
    answer:
      "A 6,000-count meter is enough for confirming supply voltages and checking fuses. For comparing near-identical readings, such as matching two transistors, spotting a few millivolts of drop across a connector or tracing a short by resistance, 20,000 counts or more adds a digit. All the 20,000-plus meters here also offer a relative mode to remove lead resistance.",
  },
  {
    question: "How do I find a short circuit on a PCB with a multimeter?",
    answer:
      "Power the board off, discharge it, and measure resistance between the shorted rail and ground at several points. The reading falls slightly as you get closer to the faulty part, because there is less copper between probe and short. That difference can be only milliohms, so a meter with 0.01 Ω or finer resolution and relative zero makes the search far easier.",
  },
  {
    question: "Can a multimeter test capacitors in circuit?",
    answer:
      "Sometimes, but readings are often wrong because other parts in parallel affect the result. A meter's capacitance range gives the value of a capacitor removed from the board, and a short or very low resistance reading in circuit can point to a failed one. Capacitance meters don't measure ESR, which is a common failure in electrolytic capacitors.",
  },
  {
    question: "Why does a data logging multimeter help with repair?",
    answer:
      "Many faults are intermittent: a supply that drops out when it warms up, or a device that drains its battery overnight. A logging meter such as the Fluke 289, Fluke 287 or UNI-T UT181A records readings with timestamps, so you can leave it connected and see when the fault happened and how long it lasted, instead of watching the display.",
  },
  {
    question: "Is a cheap multimeter safe for repairing mains-powered electronics?",
    answer:
      "Only if it carries a credible CAT rating and good fuses. Repair on TVs, power supplies and appliances can expose you to mains voltage and charged capacitors. The meters in this list have CAT III or CAT IV markings, though OWON doesn't state ratings on its own pages for the B41T+ and OW18E, so we would use the Fluke or Brymen meters on the mains side.",
  },
];

const fitNotes: Record<string, string> = {
  "Fluke 289":
    "First place goes to the only meter here with a 50 Ω range at 1 mΩ resolution, which turns hunting for a shorted capacitor on a rail into a matter of following falling readings. It adds 0.01 µA resolution and TrendCapture logging for intermittent faults; the drawback is price, and the low-ohm range is two-wire rather than Kelvin.",
  "EEVblog Brymen BM786":
    "Sixty thousand counts, 0.01 Ω on the 600.00 Ω range and latching BeepLit continuity in under 100 µs make it the fastest diagnostic meter in this list. It ranks second because it can't log or connect to a PC, so intermittent faults have to happen while you watch.",
  "Fluke 287":
    "It shares the 289's 50,000 counts, 100 mF capacitance and on-screen logging, so it can watch a supply rail for dropouts overnight. Without the 289's 50 Ω range, its finest resistance step is 0.01 Ω, which is still fine for most short hunting.",
  "UNI-T UT181A":
    "The color screen graphs up to 20,000 logged readings, and the two thermocouple inputs with a T1 minus T2 reading help find the part that runs hotter than its neighbor. UNI-T doesn't publish per-range resolution, so the 0.01 Ω figure is inferred from its 600 Ω range and 60,000 counts.",
  "Fluke 87V":
    "It carries our Hands-on Tested badge and switches to a 19,999-count HiRes mode, with 0.1 Ω resolution and relative mode to remove lead resistance. It suits shops that repair mains equipment as well as boards, but for milliohm short hunting the meters above it resolve ten times finer.",
  "UNI-T UT61E+":
    "A 220.00 Ω range at 0.01 Ω with REL, capacitance to 220 mF, an hFE socket for quick transistor checks and a USB link give it most of what a repair bench needs. It ranks behind the Fluke and Brymen meters because UNI-T publishes less, including no burden voltage.",
  "OWON B41T+":
    "It records up to 10,000 points over as long as 168 hours without a phone, so a budget repair bench can still catch a battery drain or a rail that sags once a night. OWON gives no CAT rating on its page and AC volts stop at 750 V, so keep it to the low-voltage side of a repair.",
  "Brymen BM235":
    "AutoV LoZ, NCV, a VFD mode and relative zero make it useful when a repair moves from the board to the appliance's mains wiring, and BeepLit continuity reacts within 15 ms. Its 6,000-count display and 0.1 Ω resolution limit fine comparisons on a PCB.",
  "OWON OW18E":
    "It matches the pricier meters' 0.01 Ω and 0.01 µA resolution on a low-cost 19,999-count body, with Bluetooth and offline recording. OWON publishes little beyond the basic specs and stock was very low on Amazon when we checked, so it ranks ninth.",
  "Fluke 179":
    "A tough CAT IV 600V meter with capacitance to 10,000 µF, Min/Max-Average and temperature covers appliance and power-supply repair well. It has no microamp range at all, its lowest current range being 60.00 mA, so it can't diagnose standby-drain faults and ranks last here.",
};

const advice = [
  {
    heading: "Buy resolution for the faults you actually chase",
    body:
      "If most of your repairs are dead power supplies and blown fuses, a 6,000-count meter like the Fluke 179 or Brymen BM235 does the job. If you repair laptops, phones or dense consumer boards, shorted rails and leaky capacitors are daily work, and 0.01 Ω or better with relative mode saves hours. That is where the Fluke 289, BM786 and UT61E+ earn their place.",
  },
  {
    heading: "Zero the leads before every low-ohm reading",
    body:
      "Test leads and probe contact add a few tenths of an ohm, which swamps the differences you look for when tracing a short. Touch the probes together, press REL or relative zero, then measure. Hold the probes with the same pressure each time, and clean oxidised test points, otherwise the reading drifts more than the board does.",
  },
  {
    heading: "Plan for intermittent faults",
    body:
      "A device that fails only when warm, or drains its battery over a weekend, needs a meter that records. The Fluke 289 and 287 graph readings on screen, the UNI-T UT181A stores 20,000 timestamped values, and the OWON B41T+ records offline. A Min/Max mode is the minimum: it at least tells you a dropout happened.",
  },
  {
    heading: "Treat every mains-powered repair as live until proven otherwise",
    body:
      "Switch-mode supplies hold dangerous voltage on their bulk capacitors after unplugging. Measure that capacitor's voltage before touching the board, discharge it through a suitable resistor, and use a meter with a published CAT rating and high-energy fuses on that side. Keep the cheapest meter for battery and low-voltage boards.",
  },
  {
    heading: "Add a scope when the fault is in the waveform",
    body:
      "A multimeter can't show ripple, ringing or a missing clock. When voltages look right but the device still misbehaves, a scope is the next tool, and our guide to the best oscilloscopes for electronics repair ranks the options.",
  },
];

export default function BestMultimetersForElectronicsRepairPage() {
  return (
    <>
      <CategoryHero
        category="multimeters"
        label="Multimeters · Electronics Repair"
        heading="Top 10 Best Multimeters for Electronics Repair"
        tagline="Ranked on counts, low-ohm resolution and logging."
        description="Our top 10 best multimeters for electronics repair and PCB fault-finding, ranked for tracing shorted rails, checking capacitors, diodes and transistors, measuring standby current and catching intermittent faults."
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
          <h2 className="text-2xl sm:text-3xl font-semibold">What repair work demands from a multimeter</h2>
          <p className="text-muted leading-7">
            Repair is detective work. A dead board usually comes down to one of a handful of causes: a shorted
            capacitor pulling a rail to ground, an open fuse or trace, a failed diode or MOSFET, a regulator that has
            drifted, or a leak that drains a battery while the device is off. Each leaves a small clue, and the meter
            has to resolve it. That means plenty of display counts, fine resistance steps with a way to cancel the lead
            resistance, a wide capacitance range, a diode test with enough voltage for LEDs and MOSFET body diodes,
            microamp current for standby faults, and some way of recording a fault that comes and goes. Our guide to{" "}
            <Link href="/multimeters/multimeter-accuracy-for-electronics-repair" className={linkClass}>
              multimeter accuracy for electronics repair
            </Link>{" "}
            explains how much precision each job really needs.
          </p>
          <p className="text-muted leading-7">
            The ranking weighs those features from the makers&apos; datasheets and manuals, so logging bench meters with
            50,000 or 60,000 counts sit at the top and robust 6,000-count field meters further down. Each step of a
            typical diagnosis has its own walk-through:{" "}
            <Link href="/multimeters/how-to-check-a-pcb-for-a-short-circuit-with-a-multimeter" className={linkClass}>
              checking a PCB for a short
            </Link>
            ,{" "}
            <Link href="/multimeters/how-to-test-a-capacitor-with-a-multimeter" className={linkClass}>
              testing a capacitor
            </Link>
            ,{" "}
            <Link href="/multimeters/how-to-test-a-mosfet-with-a-digital-multimeter" className={linkClass}>
              testing a MOSFET
            </Link>
            ,{" "}
            <Link href="/multimeters/how-to-test-a-transistor-in-circuit-with-a-multimeter" className={linkClass}>
              testing a transistor in circuit
            </Link>{" "}
            and{" "}
            <Link href="/multimeters/how-to-measure-standby-current-in-an-electronic-device" className={linkClass}>
              measuring standby current
            </Link>
            .
          </p>
        </div>

        <Callout title="Charged capacitors and mains voltage">
          Mains-powered electronics can hold hundreds of volts on their filter capacitors long after the plug is
          pulled. Measure the bulk capacitor&apos;s voltage first, discharge it through a resistor rated for the job, and
          only then switch to resistance or continuity. When you test on the primary side, use a meter with a
          published CAT rating, inspect your leads, and keep one hand away from the circuit.
        </Callout>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">Quick comparison</h2>
          <DataTable
            head={["#", "Meter", "Counts", "Finest Ω step", "Capacitance", "Best for"]}
            rows={comparisonRows}
            mono={[0]}
          />
          <p className="text-xs text-muted leading-5">
            UNI-T doesn&apos;t print the UT181A&apos;s per-range resolution; 0.01 Ω follows from its 600 Ω range at
            60,000 counts. The Fluke 87V figure is its 6,000-count mode; HiRes mode shows 19,999 counts.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">How the ten compare on paper</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Figure caption={<>Maximum display counts, on a log scale. The 87V figure is its HiRes mode.</>}>
              <BarChart
                log
                items={[
                  { label: "EEVblog Brymen BM786", value: 60_000, display: "60,000", highlight: true },
                  { label: "UNI-T UT181A", value: 60_000, display: "60,000", highlight: true },
                  { label: "Fluke 289", value: 50_000, display: "50,000" },
                  { label: "Fluke 287", value: 50_000, display: "50,000" },
                  { label: "UNI-T UT61E+", value: 22_000, display: "22,000" },
                  { label: "OWON B41T+", value: 22_000, display: "22,000" },
                  { label: "Fluke 87V", value: 19_999, display: "19,999 (HiRes)" },
                  { label: "OWON OW18E", value: 19_999, display: "19,999" },
                  { label: "Brymen BM235", value: 6_000, display: "6,000" },
                  { label: "Fluke 179", value: 6_000, display: "6,000" },
                ]}
              />
            </Figure>
            <Figure
              caption={
                <>
                  Finest resistance step in milliohms, on a log scale (shorter is finer). This is what decides how
                  closely you can follow a short to the faulty part.
                </>
              }
            >
              <BarChart
                log
                items={[
                  { label: "Fluke 289", value: 1, display: "1 mΩ", highlight: true },
                  { label: "EEVblog Brymen BM786", value: 10, display: "10 mΩ" },
                  { label: "Fluke 287", value: 10, display: "10 mΩ" },
                  { label: "UNI-T UT181A", value: 10, display: "10 mΩ (implied)" },
                  { label: "UNI-T UT61E+", value: 10, display: "10 mΩ" },
                  { label: "OWON B41T+", value: 10, display: "10 mΩ" },
                  { label: "OWON OW18E", value: 10, display: "10 mΩ" },
                  { label: "Fluke 87V", value: 100, display: "100 mΩ" },
                  { label: "Brymen BM235", value: 100, display: "100 mΩ" },
                  { label: "Fluke 179", value: 100, display: "100 mΩ" },
                ]}
              />
            </Figure>
          </div>
          <Figure
            caption={
              <>
                Largest capacitance each meter measures, in microfarads, on a log scale, for the nine whose makers list
                a capacitance range on their product pages or manuals.
              </>
            }
          >
            <BarChart
              log
              items={[
                { label: "UNI-T UT61E+", value: 220_000, display: "220 mF", highlight: true },
                { label: "OWON B41T+", value: 220_000, display: "220 mF", highlight: true },
                { label: "Fluke 289", value: 100_000, display: "100 mF" },
                { label: "Fluke 287", value: 100_000, display: "100 mF" },
                { label: "UNI-T UT181A", value: 60_000, display: "60 mF" },
                { label: "OWON OW18E", value: 20_000, display: "20 mF" },
                { label: "EEVblog Brymen BM786", value: 10_000, display: "10 mF" },
                { label: "Fluke 179", value: 10_000, display: "10,000 µF" },
                { label: "Fluke 87V", value: 9_999, display: "9,999 µF" },
              ]}
            />
          </Figure>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">What to look for in a repair multimeter</h2>
          <InfoCards items={lookFor} />
          <KeyIdea title="Why milliohms find shorts">
            A copper trace or plane has a little resistance per centimeter. When a capacitor fails short across a rail,
            the reading between rail and ground is lowest right at that capacitor and rises slightly as you probe
            further away. On a 0.1 Ω meter every point may read the same; at 0.01 Ω, and more so at the Fluke 289&apos;s
            1 mΩ, the gradient becomes visible. For a different fault, see{" "}
            <Link href="/multimeters/how-to-test-a-diode-with-a-multimeter" className={linkClass}>
              testing a diode
            </Link>{" "}
            or our{" "}
            <Link href="/multimeters/brymen-bm235-vs-fluke-117" className={linkClass}>
              Brymen BM235 vs Fluke 117
            </Link>{" "}
            comparison, and when a fault lives in a waveform, our{" "}
            <Link href="/oscilloscopes/best-oscilloscopes-for-electronics-repair" className={linkClass}>
              oscilloscopes for electronics repair
            </Link>{" "}
            ranking.
          </KeyIdea>
        </div>
      </section>

      <ReviewArticle
        picks={picks}
        faqs={faqs}
        howWeChose="We ranked these ten for bench and board-level repair: display counts and low-ohm resolution with lead zeroing first, then capacitance range, microamp current, diode test and logging for intermittent faults, with safety ratings for mains work. All specifications come from the makers' datasheets, manuals and product pages; this is desk research, and only the Fluke 87V carries our Hands-on Tested badge."
        fitNotes={fitNotes}
        advice={advice}
      />
      <ContentLinks category="multimeters" current={PATH} />
    </>
  );
}
