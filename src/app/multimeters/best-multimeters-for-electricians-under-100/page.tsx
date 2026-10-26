import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { CategoryHero } from "@/components/CategoryHero";
import { ReviewArticle } from "@/components/ReviewArticle";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { getAllPicks } from "@/lib/catalog";
import { guidePicks } from "@/lib/content";

export const metadata = buildMetadata({
  title: "10 Best Multimeters for Electricians Under $100",
  description:
    "The best multimeters for electricians under $100, ranked on CAT III and CAT IV ratings, LoZ for ghost voltage, non-contact detection and True RMS accuracy.",
  path: "/multimeters/best-multimeters-for-electricians-under-100",
  image: "https://m.media-amazon.com/images/I/61Ba-L7Q2RL._SL1500_.jpg",
});

const PATH = "/multimeters/best-multimeters-for-electricians-under-100";
const all = getAllPicks("multimeters");
const picks = guidePicks(PATH)
  .map((n) => all.find((p) => p.name === n)!)
  .filter(Boolean);

const linkClass = "text-accent hover:underline";

const comparisonRows: string[][] = [
  ["1", "Klein Tools MM720", "CAT IV 600V / CAT III 1000V", "LoZ yes, NCV no", "Yes", "Panels, feeders and ghost-voltage checks"],
  ["2", "KAIWEETS HT118A", "CAT IV 600V / CAT III 1000V", "LoZ no, NCV + Live", "Yes", "A full-function meter on a tight budget"],
  ["3", "KAIWEETS HT208D", "CAT IV 600V / CAT III 1000V", "LoZ yes, NCV yes", "Yes", "Load current, inrush and drive outputs by clamp"],
  ["4", "Southwire 16030A", "CAT IV 600V", "LoZ not stated, NCV yes", "Yes", "Wet or dusty sites where you only need volts"],
  ["5", "Milwaukee 2235-20", "CAT III 600V", "Not listed", "Yes", "Branch-circuit amps up to 400 A AC"],
  ["6", "KAIWEETS HT118E", "CAT IV 600V / CAT III 1000V", "LoZ no, NCV + Live", "Yes", "Higher-resolution readings for control work"],
  ["7", "UNI-T UT139C", "CAT III 600V", "NCV yes", "Yes", "A light second meter for the van"],
  ["8", "KAIWEETS KM602", "CAT III 600V", "LoZ no, NCV + Live", "Yes", "Fast outlet and fixture checks in Smart mode"],
  ["9", "Klein Tools MM450", "CAT III 600V", "Neither", "Yes", "Residential service and appliance calls"],
  ["10", "Klein Tools MM420", "CAT III 600V", "Neither", "Yes", "Indoor branch-circuit and HVAC control checks"],
];

const lookFor = [
  {
    label: "CAT rating on the meter, not the leads",
    desc: "CAT III 600V is the floor for panel work; CAT IV 600V is what you want at the meter base, service drop or outdoor feeds.",
  },
  {
    label: "Low-impedance (LoZ) voltage",
    desc: "Loads the circuit so capacitively coupled ghost voltage on an open conductor collapses instead of reading like a live feed.",
  },
  {
    label: "Non-contact voltage (NCV)",
    desc: "A quick go/no-go sense of a live conductor before the leads go anywhere. It supplements a proper test, it never replaces one.",
  },
  {
    label: "True RMS",
    desc: "LED drivers, dimmers and variable-speed drives distort the waveform; an average-responding meter misreads that AC.",
  },
  {
    label: "A way to read current",
    desc: "A 10 A jack covers small loads in series; a clamp reads motors, feeders and branch circuits without opening anything.",
  },
  {
    label: "Toughness",
    desc: "Drop ratings, IP sealing and a display you can read in a dark basement matter as much as specs on a job site.",
  },
];

const faqs = [
  {
    question: "Can a multimeter under $100 be safe for electrical panel work?",
    answer:
      "Yes, provided the meter itself carries a genuine CAT III 600V or better rating and you use leads with at least the same rating. Several meters here, including the Klein MM720 and KAIWEETS HT118A, are rated CAT IV 600V. Price says nothing about safety; the category marking printed on the meter, fused current inputs and leads in good condition are what count.",
  },
  {
    question: "Do electricians need a low-impedance (LoZ) multimeter?",
    answer:
      "It is one of the most useful features for troubleshooting. A normal high-impedance input can show tens of volts on a disconnected conductor that runs beside a live one, and that phantom reading wastes time or causes a wrong call. LoZ puts a small load across the leads so the ghost voltage collapses. Under $100, the Klein MM720 and KAIWEETS HT208D clamp both list it.",
  },
  {
    question: "Is CAT III enough, or do I need CAT IV?",
    answer:
      "CAT III covers distribution panels, feeders, fixed equipment and branch circuits inside a building. CAT IV covers the origin of the installation: the utility service, meter base, overhead drop and outdoor feeders where transients are largest. If you only work downstream of the main breaker, CAT III 600V suffices. If you ever measure at the service entrance, choose a CAT IV 600V meter.",
  },
  {
    question: "Should an electrician buy a clamp meter or a multimeter first?",
    answer:
      "Most electricians end up with both. A multimeter with fused current jacks is better for resistance, continuity, capacitance and low-current readings; a clamp reads load current on a live conductor without breaking the circuit, which is faster and safer for motors and feeders. If you can only buy one under $100, a clamp such as the KAIWEETS HT208D that also reads volts, ohms and LoZ covers more daily work.",
  },
  {
    question: "Is non-contact voltage detection reliable enough to trust?",
    answer:
      "Treat it as a warning light, not proof. NCV senses the electric field around an AC conductor, so shielded cable, DC circuits, a low battery or holding the meter at the wrong angle can all hide a live wire. Use it to spot a hot conductor quickly, then confirm with the test leads, and verify the meter on a known live source before and after testing dead.",
  },
  {
    question: "Why is the Fluke 117 not on this list?",
    answer:
      "It was listed well above $100 on Amazon when we checked in October 2026, so it falls outside this price limit. It remains our Best Overall pick and carries our Hands-on Tested badge. If your budget can stretch, compare it with the meters here; if not, the Klein MM720 matches its CAT III 600V rating and adds the CAT IV 600V rating that the 117 does not carry.",
  },
];

const fitNotes: Record<string, string> = {
  "Klein Tools MM720":
    "First place goes to the one meter here that combines CAT IV 600V, 1000 V AC and DC, LoZ and True RMS with an IP42 case and a 2 m drop rating. Its only gap for electrical work is the missing NCV, and at the time we checked its listing sat a few cents under the $100 cut-off.",
  "KAIWEETS HT118A":
    "It ranks second because it brings CAT IV 600V, NCV with a Live-wire test and fused µA-to-10 A ranges at a fraction of the price of the leader, and the display changes color above 80 V as a reminder. It has no LoZ, and KAIWEETS's product page lists a lower maximum voltage than its manual, so check the face of the unit you receive.",
  "KAIWEETS HT208D":
    "As a clamp, it reads AC or DC current to 1000 A without breaking a circuit, and it adds LoZ, NCV, a VFD filter and AC inrush, all under CAT IV 600V. It sits third because its current accuracy is a fairly loose ±(2.5% + 5) and it has no milliamp ranges for small loads.",
  "Southwire 16030A":
    "This is the toughest voltage checker in the group: CAT IV 600V, an IP67 housing, automatic AC/DC selection and a switch to voltage if you probe a live circuit in resistance mode. It cannot measure current, capacitance or frequency, so it works best alongside a clamp rather than as your only meter.",
  "Milwaukee 2235-20":
    "It earns a place for electricians who mostly need branch-circuit and motor current: 400 A AC through a 1-inch jaw, plus 600 V AC/DC and True RMS at CAT III 600V. It cannot read DC amps and has no CAT IV rating.",
  "KAIWEETS HT118E":
    "Its 20,000-count display and CAT IV 600V rating suit controls work where you want an extra digit, and it keeps the NCV, Live test and lit jacks of the HT118A. It ranks below its sibling because the extra resolution matters little on 120/240 V circuits and KAIWEETS lists no relative mode.",
  "UNI-T UT139C":
    "A True RMS, CAT III 600V meter with NCV and both automatic and manual ranging makes a sensible spare for the truck. It lacks the CAT IV rating and LoZ of the higher picks, which is why it sits mid-table for panel work.",
  "KAIWEETS KM602":
    "Smart mode decides between voltage, resistance and continuity on its own, so checking a row of receptacles goes quickly, and NCV and a Live test are built in. Its manual and meter face say CAT III 600V (the listing claims more), there is no LoZ, and current starts at a 600 mA range.",
  "Klein Tools MM450":
    "The slim 2.8 cm body, Lead-Alert jack lights and a µA-to-10 A current range make it easy to carry on residential service calls. With no LoZ or NCV, and a CAT III 600V rating on the meter (the CAT IV figure on listings refers to the leads), it ranks near the bottom for a panel-focused electrician.",
  "Klein Tools MM420":
    "It covers the basics an electrician needs indoors with True RMS, CAT III 600V, fused current ranges up to 10 A, temperature and a 2 m drop rating. Klein rates it for indoor use only and it has neither LoZ nor NCV, which puts it last here.",
};

const advice = [
  {
    heading: "Read the rating printed on the meter",
    body:
      "Listings for budget meters often quote the highest number they can find. Klein's MM450 listings show CAT IV, but that figure belongs to the supplied leads; the meter is CAT III 600V. KAIWEETS's KM602 manual and printed face say CAT III 600V while the listing claims CAT IV. We used the maker's manual or the marking on the meter in every case, and you should check the unit in your hand the same way.",
  },
  {
    heading: "Decide how you will measure current",
    body:
      "Putting a meter in series on a branch circuit means opening the circuit, and a 10 A jack is the ceiling. For motor loads, feeders and tripping breakers a clamp is faster and keeps you out of the circuit. That is why two clamps rank in this top 10. If you already own a clamp, put the money into a CAT IV handheld with LoZ instead.",
  },
  {
    heading: "Prioritize LoZ if you troubleshoot more than you install",
    body:
      "Ghost voltage shows up most on long runs, shared conduit and abandoned conductors, which is daily life on service calls. A meter without LoZ forces you to add a load or second-guess readings. The MM720 is the handheld with LoZ in this price range; the HT208D clamp also has it.",
  },
  {
    heading: "Leave room in the budget for leads and a case",
    body:
      "Good leads with shrouded tips and a CAT rating that matches the meter are part of the safety system, and a worn lead can undo a well-rated meter. Some picks include extras: the MM720 ships with a pouch and thermocouple, and the HT118A has a kickstand and flashlight. Factor that in before comparing listed prices.",
  },
];

export default function BestMultimetersForElectriciansUnder100Page() {
  return (
    <>
      <CategoryHero
        category="multimeters"
        label="Multimeters · Electricians Under $100"
        heading="Top 10 Best Multimeters for Electricians Under $100"
        tagline="Ranked on CAT rating, LoZ, NCV and current."
        description="Our top 10 best multimeters for electricians under $100, ranked for panel safety, ghost-voltage checks and load current, from a CAT IV True RMS Klein to budget clamps and a waterproof voltage checker."
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
          <h2 className="text-2xl sm:text-3xl font-semibold">What an electrician needs from a budget meter</h2>
          <p className="text-muted leading-7">
            An electrician&apos;s meter spends its life on energised equipment: receptacles, breakers, disconnects,
            motor terminals and sometimes the meter base. That puts the safety rating ahead of everything else, followed
            by features that save time on real calls: a low-impedance mode that sees through ghost voltage, a
            non-contact sensor for a quick first check, True RMS for the distorted current drawn by LED drivers and
            drives, and some way of reading load current. Our{" "}
            <Link href="/multimeters/multimeter-buying-guide" className={linkClass}>
              multimeter buying guide
            </Link>{" "}
            explains each of those terms if you are new to them, and{" "}
            <Link href="/multimeters/how-to-test-electrical-wires-with-a-multimeter" className={linkClass}>
              testing electrical wires with a multimeter
            </Link>{" "}
            shows the basic routine.
          </p>
          <p className="text-muted leading-7">
            Every meter below was listed under $100 on Amazon.com when we checked in October 2026; prices move, so the
            buy button shows today&apos;s figure. We chose the ten from our whole verified catalog by how well each one
            handles electrical work, not by brand or overall score, and two clamp meters made the cut because reading
            amps without opening a circuit matters so much in this trade. If your budget is open, our main{" "}
            <Link href="/multimeters/best-multimeter-for-electricians" className={linkClass}>
              best multimeter for electricians
            </Link>{" "}
            guide covers the Fluke models above this price, and the{" "}
            <Link href="/multimeters/clamp-meter-buying-guide" className={linkClass}>
              clamp meter buying guide
            </Link>{" "}
            helps if you are weighing a clamp against a handheld.
          </p>
        </div>

        <Callout title="Panel and service-entrance safety">
          A meter is only as safe as its lowest-rated part. Use leads rated at or above the meter&apos;s category, keep
          fingers behind the probe guards, and never connect leads plugged into the current jacks across a voltage
          source. CAT III 600V is the minimum for distribution panels; at the service entrance, meter base or outdoor
          feeders, use CAT IV 600V. Test the meter on a known live source before and after confirming a circuit is dead,
          and follow your lockout and arc-flash procedures regardless of which meter you carry.
        </Callout>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">Quick comparison</h2>
          <DataTable
            head={["#", "Meter", "Safety rating", "LoZ / NCV", "True RMS", "Best for"]}
            rows={comparisonRows}
            mono={[0]}
          />
          <p className="text-xs text-muted leading-5">
            Ratings are from the maker&apos;s manual or the marking on the meter. Where a listing claims more, we used the
            lower, documented figure. The HT208D and 2235-20 are clamp meters.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">How the ten compare on paper</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Figure
              caption={
                <>
                  Highest voltage each meter is rated for at CAT III. The Southwire 16030A is rated CAT IV 600V, the
                  stricter category, at 600 V.
                </>
              }
            >
              <BarChart
                items={[
                  { label: "Klein Tools MM720", value: 1000, display: "1000 V", highlight: true },
                  { label: "KAIWEETS HT118A", value: 1000, display: "1000 V", highlight: true },
                  { label: "KAIWEETS HT208D", value: 1000, display: "1000 V", highlight: true },
                  { label: "KAIWEETS HT118E", value: 1000, display: "1000 V", highlight: true },
                  { label: "Southwire 16030A", value: 600, display: "600 V (CAT IV)" },
                  { label: "Milwaukee 2235-20", value: 600, display: "600 V" },
                  { label: "UNI-T UT139C", value: 600, display: "600 V" },
                  { label: "KAIWEETS KM602", value: 600, display: "600 V" },
                  { label: "Klein Tools MM450", value: 600, display: "600 V" },
                  { label: "Klein Tools MM420", value: 600, display: "600 V" },
                ]}
              />
            </Figure>
            <Figure
              caption={
                <>
                  Maximum current, on a log scale. Clamps read through the jaw; the handhelds use a fused 10 A jack. The
                  16030A has no current function and our UT139C data doesn&apos;t give its current ranges.
                </>
              }
            >
              <BarChart
                log
                items={[
                  { label: "KAIWEETS HT208D", value: 1000, display: "1000 A (clamp)", highlight: true },
                  { label: "Milwaukee 2235-20", value: 400, display: "400 A AC (clamp)", highlight: true },
                  { label: "Klein Tools MM720", value: 10, display: "10 A" },
                  { label: "KAIWEETS HT118A", value: 10, display: "10 A" },
                  { label: "KAIWEETS HT118E", value: 10, display: "10 A" },
                  { label: "KAIWEETS KM602", value: 10, display: "10 A" },
                  { label: "Klein Tools MM450", value: 10, display: "10 A" },
                  { label: "Klein Tools MM420", value: 10, display: "10 A" },
                ]}
              />
            </Figure>
          </div>
          <Figure
            caption={
              <>
                Display counts. More counts mean finer resolution on the same range; on mains circuits 4,000 counts is
                usually plenty.
              </>
            }
          >
            <BarChart
              items={[
                { label: "KAIWEETS HT118E", value: 20000, display: "20,000", highlight: true },
                { label: "Klein Tools MM720", value: 6000, display: "6,000" },
                { label: "KAIWEETS HT118A", value: 6000, display: "6,000" },
                { label: "KAIWEETS HT208D", value: 6000, display: "6,000" },
                { label: "UNI-T UT139C", value: 6000, display: "6,000" },
                { label: "KAIWEETS KM602", value: 6000, display: "6,000" },
                { label: "Southwire 16030A", value: 4000, display: "4,000" },
                { label: "Klein Tools MM450", value: 4000, display: "4,000" },
                { label: "Klein Tools MM420", value: 4000, display: "4,000" },
              ]}
            />
          </Figure>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">What to look for in an electrician&apos;s meter under $100</h2>
          <InfoCards items={lookFor} />
          <KeyIdea title="Why ghost voltage fools ordinary meters">
            A disconnected conductor pulled alongside live ones picks up voltage through capacitance. A standard meter
            with a high input impedance draws almost no current, so it can display a large phantom reading. A LoZ input
            draws enough to drain that coupled charge, and the reading drops toward zero, while a genuinely live
            conductor holds its voltage. For other puzzling readings, see{" "}
            <Link href="/multimeters/unstable-multimeter-readings" className={linkClass}>
              unstable multimeter readings
            </Link>{" "}
            and{" "}
            <Link href="/multimeters/how-to-measure-ac-current-with-a-clamp-meter" className={linkClass}>
              measuring AC current with a clamp meter
            </Link>
            .
          </KeyIdea>
        </div>
      </section>

      <ReviewArticle
        picks={picks}
        faqs={faqs}
        howWeChose="We filtered our verified multimeter catalog to meters listed under $100 on Amazon.com in October 2026, then ranked them for electrical work: the CAT rating documented by the maker or printed on the meter first, then LoZ, NCV, True RMS and how each one reads current, with toughness as a tie-breaker. This is desk research against maker manuals, product pages and official listings; none of these ten carries our Hands-on Tested badge."
        fitNotes={fitNotes}
        advice={advice}
      />
      <ContentLinks category="multimeters" current="/multimeters/best-multimeters-for-electricians-under-100" />
    </>
  );
}
