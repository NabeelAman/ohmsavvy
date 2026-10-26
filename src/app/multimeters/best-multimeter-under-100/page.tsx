import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { CategoryHero } from "@/components/CategoryHero";
import { ReviewArticle } from "@/components/ReviewArticle";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { getAllPicks } from "@/lib/catalog";
import { guidePicks } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Best Multimeter Under $100: 10 Budget Picks",
  description:
    "The 10 best budget multimeters, ranked on safety rating, True RMS, resolution and job fit, from Klein and KAIWEETS all-rounders to UNI-T bench meters.",
  path: "/multimeters/best-multimeter-under-100",
});

const PATH = "/multimeters/best-multimeter-under-100";
const all = getAllPicks("multimeters");
const picks = guidePicks(PATH)
  .map((n) => all.find((p) => p.name === n)!)
  .filter(Boolean);

const linkClass = "text-accent hover:underline";

const comparisonRows: string[][] = [
  ["1", "KAIWEETS HT118A", "6,000", "CAT III 1000V / CAT IV 600V", "Yes", "One meter for house, car and hobby"],
  ["2", "Klein Tools MM420", "4,000", "CAT III 600V", "Yes", "A big-brand meter for appliances and HVAC"],
  ["3", "UNI-T UT61E+", "22,000", "CAT III 1000V / CAT IV 600V", "Yes", "Electronics benches that need fine resolution"],
  ["4", "Klein Tools MM460S", "4,000", "CAT III 600V", "Yes", "Occasional users who want the meter to choose"],
  ["5", "KAIWEETS KM602", "6,000", "CAT III 600V", "Yes", "No batteries to buy, ever"],
  ["6", "UNI-T UT139C", "6,000", "CAT III 600V", "Yes", "The plain, low-cost True RMS option"],
  ["7", "OWON B41T+", "22,000", "1000V CAT III (case marking)", "Yes", "Logging readings to a phone or overnight"],
  ["8", "KAIWEETS HT118E", "20,000", "CAT III 1000V / CAT IV 600V", "Yes", "Sleep-current checks at the lowest cost"],
  ["9", "KAIWEETS KM200s", "Not in our data", "CAT II 600V", "Yes", "Plug-in appliances, batteries and hobby kits"],
  ["10", "Klein Tools MM325", "2,000", "CAT III 600V", "No", "Battery and continuity checks only"],
];

const byBuyer: string[][] = [
  ["Homeowner who checks outlets and appliances", "KAIWEETS HT118A", "NCV, temperature and a CAT IV 600V rating in one body"],
  ["Appliance or HVAC tinkerer", "Klein Tools MM420", "Temperature probe included, µA to 10 A, Lead-Alert jacks"],
  ["Arduino or PCB repair hobbyist", "UNI-T UT61E+", "22,000 counts, 0.01 Ω and 0.01 µA resolution, REL mode"],
  ["Battery-powered project builder", "OWON B41T+", "Logs 10,000 points over up to 168 hours without a phone"],
  ["Someone who hates dials", "Klein Tools MM460S or KAIWEETS KM602", "Smart mode picks V, Ω or continuity for you"],
  ["Glovebox or junk-drawer meter", "Klein Tools MM325", "1.5V/9V battery test, CAT III 600V, backlight"],
];

const lookFor = [
  {
    label: "A real, documented safety rating",
    desc: "Low-cost meters vary most here. Trust the manual and the marking on the case; where a listing claims more, we use the lower figure.",
  },
  {
    label: "True RMS where you need it",
    desc: "Most of this list is True RMS. It matters for dimmers, inverters and motor drives, and barely at all for batteries and fuses.",
  },
  {
    label: "Counts and resolution",
    desc: "A 20,000-count meter shows a 5V rail to the millivolt and resolves 0.01 Ω on its lowest range; a 4,000-count meter cannot.",
  },
  {
    label: "Current ranges that fit your work",
    desc: "A µA range matters for sleep current in battery projects. Household users rarely need more than the 10 A input.",
  },
  {
    label: "Warranty and support",
    desc: "KAIWEETS gives a 3-year warranty on the HT118A and KM602, and Klein is a major US tool brand with an established warranty process.",
  },
  {
    label: "What's in the box",
    desc: "A thermocouple, a USB cable or a rechargeable cell adds real value; check the listing for exactly which accessories ship.",
  },
];

const faqs = [
  {
    question: "Is a budget multimeter accurate enough for real work?",
    answer:
      "For most household, automotive and hobby measurements, yes. The UNI-T UT61E+ quotes ±(0.05% + 5) on DC volts and the OWON B41T+ ±(0.1% + 2), both far tighter than a typical 12V or 120V check needs. What you give up on low-cost meters is usually support, documentation consistency and ruggedness, not basic accuracy. Use a calibrated professional meter when a job demands a certificate.",
  },
  {
    question: "Which budget multimeter is safest for household outlets?",
    answer:
      "Pick one whose manual and case both state CAT III 600V or higher. On this list the HT118A, HT118E and UT61E+ add CAT IV 600V, and the Klein MM420, MM460S and MM325, UNI-T UT139C and KAIWEETS KM602 are CAT III 600V. The KM200s is CAT II, so keep it to plug-in appliances, batteries and electronics rather than fixed wiring or panels.",
  },
  {
    question: "What does 6,000 count mean on a multimeter?",
    answer:
      "It is the largest number the display can show before switching range, roughly 5,999 plus a sign. On a 6V range a 6,000-count meter resolves 0.001V, while a 4,000-count meter switches up a range sooner and loses a digit around 4V. Higher counts, like the 22,000 on the UT61E+, give finer readings on low voltages and resistances, which helps electronics work more than household checks.",
  },
  {
    question: "Are KAIWEETS and UNI-T multimeters good brands?",
    answer:
      "Both publish manuals with full specification tables, which is what we rely on, and the CAT rating is printed on the case of each meter we list. Where their listings and manuals disagree, as on the KAIWEETS KM602's CAT rating and the HT118A's maximum voltage, we use the lower figure from the manual or the meter face. They lack the dealer network of Klein or Fluke, so check warranty terms before buying.",
  },
  {
    question: "Do I need Bluetooth on a budget multimeter?",
    answer:
      "Only if you want to record readings over time. The OWON B41T+ sends data to a phone over Bluetooth and stores up to 10,000 points by itself, which helps when watching a battery drain overnight or a temperature over an afternoon. For checking a fuse or an outlet, Bluetooth adds pairing steps and nothing else, so most buyers are better served by a plainer meter.",
  },
];

const fitNotes: Record<string, string> = {
  "KAIWEETS HT118A":
    "It gives the broadest coverage of any low-cost meter here: True RMS on 6,000 counts, CAT III 1000V / CAT IV 600V per the manual, current from a 600 µA range to 10 A, temperature, NCV, Min/Max, jack lights and a flashlight, backed by a 3-year warranty. KAIWEETS's product page lists a lower maximum voltage than its manual, and the body is bulky.",
  "Klein Tools MM420":
    "A True RMS CAT III 600V Klein with AC/DC current from a 400.0 µA range to 10 A, temperature with the included thermocouple, capacitance to 400 µF and Lead-Alert jack lights. It ranks second because of the brand's US support and the thermocouple in the box. There's no NCV or LoZ, and Klein rates it for indoor use.",
  "UNI-T UT61E+":
    "For electronics this is the strongest budget meter here: 22,000 counts, 0.01 µA and 0.01 Ω resolution, REL mode to subtract lead resistance, capacitance to 220 mF, frequency to 220 MHz, NCV and a USB link, all at CAT III 1000V / CAT IV 600V. It lacks temperature and UNI-T doesn't publish burden voltage, which keeps it behind the two all-rounders.",
  "Klein Tools MM460S":
    "Smart mode works out AC or DC voltage, resistance or continuity without turning the dial, from a minimum of 0.8V, and Lead-Alert gives visual and audible warnings for a misplaced lead. It also reads current from a 400.0 µA range to 10 A and temperature to 1832°F. It is CAT III 600V with no NCV or LoZ, and it is an indoor meter.",
  "KAIWEETS KM602":
    "A built-in 1,200 mAh lithium cell charged by cable, a color display, Smart mode with a manual fallback, NCV and temperature make it the most convenient meter on the list to live with. Current starts at a 600 mA range with no µA, and the manual and meter face say CAT III 600V, below the figure on its listing.",
  "UNI-T UT139C":
    "A straightforward True RMS, 6,000-count meter with auto and manual ranging, NCV and CAT III 600V. It does the core jobs well at a lower cost than most of the list. UNI-T is less established in the US than Klein, and the build is adequate rather than rugged, which matters little for occasional use.",
  "OWON B41T+":
    "Its party trick is logging: Bluetooth 4.0 to a phone app, plus 10,000 stored points over up to 168 hours with no phone attached. The 22,000-count display resolves 0.01 µA and 0.01 Ω, with relative mode and temperature. OWON's page states no CAT rating (the case says 1000V CAT III), AC voltage stops at 750 V and burden voltage isn't published.",
  "KAIWEETS HT118E":
    "It brings 20,000 counts and a 200 µA range to a very low-cost meter, with CAT III 1000V / CAT IV 600V, temperature, capacitance, NCV and lit jacks. KAIWEETS doesn't print per-range resolution, its 200 Ω range is only ±(1.0% + 15) and there's no relative mode, so it suits sleep-current checks better than low-ohm work.",
  "KAIWEETS KM200s":
    "The entry ticket to an auto-ranging True RMS meter with NCV and a backlight. It handles batteries, cords, holiday lights and hobby projects comfortably. Its CAT II 600V rating places it below the CAT III meters for fixed wiring, and the build isn't meant for daily site use.",
  "Klein Tools MM325":
    "The simplest meter here: manual-ranging, 2,000 counts, CAT III 600V, DC current from a 200 µA range to 10 A, a 1.5V/9V battery-test position, Lead-Alert lights and a backlight. Klein doesn't claim True RMS, and it can't measure AC current, capacitance or temperature, so it suits a glovebox or drawer rather than a bench.",
};

const advice = [
  {
    heading: "Spend on the safety rating before the feature list",
    body:
      "A low-cost meter with a documented CAT III 600V rating, fused current inputs and sound leads is a better buy than a feature-packed one with no stated category. Meters with no stated rating, such as the AstroAI DM6000AR, were left out of this list on purpose. If a listing promises CAT IV but the manual or case says CAT III, believe the manual.",
  },
  {
    heading: "Choose resolution only if you work on electronics",
    body:
      "Counts and microamp resolution are what separate the UT61E+, B41T+ and HT118E from the rest. They matter for measuring a microcontroller's sleep current or a 0.5 Ω shunt. For household and automotive checks, a 4,000- or 6,000-count meter already shows more digits than the job needs, and its simpler dial is easier to use.",
  },
  {
    heading: "Factor in the running costs",
    body:
      "A budget meter's real costs are batteries, fuses and leads. The KM602 avoids batteries with its rechargeable cell; the others use AA or 9V cells. Check that replacement fuses with the rating printed in the manual are easy to buy, and plan on a better set of leads if the included ones feel stiff or thin.",
  },
  {
    heading: "Know when to step up",
    body:
      "If you start working inside distribution panels every week, need an industrial warranty or want LoZ for ghost voltage, a budget meter is the wrong tool. Our guides for electricians and HVAC technicians cover meters built for daily trade use. Until then, any of these ten will cover the vast majority of home, car and hobby jobs.",
  },
];

export default function BestMultimeterUnder100Page() {
  return (
    <>
      <CategoryHero
        category="multimeters"
        label="Multimeters · Budget Tier"
        heading="Best Multimeter Under $100: Top 10 Budget Meters Ranked"
        tagline="Ranked on safety, accuracy and fit for the job."
        description="Our top 10 budget multimeters, ranked on documented safety ratings, True RMS, display resolution and current ranges, with a clear pick for homeowners, appliance tinkerers, electronics hobbyists and anyone who just wants a meter in the drawer."
        primaryCta={{ label: "See the Full Roundup", href: "/multimeters/best-multimeters" }}
        secondaryCta={{ label: "Compare Side by Side", href: "#full-comparison" }}
        stats={[
          { value: `${picks.length}`, label: "Compared" },
          { value: "100%", label: "Spec-Verified" },
          { value: "0", label: "Sponsored Picks" },
        ]}
      />

      <section className="mx-auto max-w-4xl px-6 pt-12 space-y-10">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">The best budget multimeter, in brief</h2>
          <p className="text-muted leading-7">
            The best budget multimeter for most people is the KAIWEETS HT118A: it is True RMS, rated CAT III 1000V /
            CAT IV 600V in its manual, and adds NCV, temperature and microamp current, so it covers the house, the car and
            hobby electronics. Choose the Klein Tools MM420 if you prefer a major US tool brand with a thermocouple in the
            box, or the UNI-T UT61E+ if you mostly work on circuit boards and want 22,000 counts. The other seven each win
            for a narrower buyer, from rechargeable Smart-mode meters to a basic manual-ranging Klein.
          </p>
          <p className="text-muted leading-7">
            Budget meters differ far more from each other than premium ones do. Some publish a full manual with
            accuracy tables and a CAT rating printed on the case; others make claims on the listing that the manual
            doesn&apos;t support. We only considered meters whose safety rating is documented by the maker or marked on the
            case, and where sources disagree we used the lower figure. This guide ranks for the general buyer; if you need
            True RMS above all, our{" "}
            <Link href="/multimeters/best-true-rms-multimeters-under-100" className={linkClass}>
              True RMS budget ranking
            </Link>{" "}
            weighs that first, and trade users should read the{" "}
            <Link href="/multimeters/best-multimeters-for-electricians-under-100" className={linkClass}>
              electricians&apos; budget meters
            </Link>{" "}
            guide. For a head-to-head between two of the cheapest picks, see{" "}
            <Link href="/multimeters/kaiweets-km200s-vs-uni-t-ut139c" className={linkClass}>
              KAIWEETS KM200s vs UNI-T UT139C
            </Link>
            .
          </p>
        </div>

        <Callout title="A low-cost meter still has to be safe">
          The CAT rating, fused current inputs and lead insulation are what stand between you and a mains fault. Use a
          CAT III 600V meter or better on anything wired into the wall, keep CAT II meters to plug-in appliances and
          electronics, and never measure voltage with the red lead in an amps jack. Replace damaged leads straight away,
          and call a licensed electrician for panel or service work.
        </Callout>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">Quick comparison</h2>
          <DataTable
            head={["#", "Meter", "Counts", "Safety rating", "True RMS", "Best for"]}
            rows={comparisonRows}
            mono={[0, 2]}
          />
          <p className="text-xs text-muted leading-5">
            Ratings come from each maker&apos;s manual or the meter&apos;s marking. The KM602 listing claims CAT IV, but its
            manual and case say CAT III 600V, which we use. OWON&apos;s page gives no CAT rating for the B41T+, so the
            figure shown is the one marked on the case.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">Which budget meter fits which buyer</h2>
          <DataTable head={["If you are a…", "Start with", "Why"]} rows={byBuyer} />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">Resolution and current sensitivity compared</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Figure
              caption={
                <>
                  Display counts. The KM200s isn&apos;t shown because its count isn&apos;t in our verified data. The OWON
                  and UNI-T figures are as sold (22,000 counts).
                </>
              }
            >
              <BarChart
                items={[
                  { label: "UNI-T UT61E+", value: 22000, display: "22,000", highlight: true },
                  { label: "OWON B41T+", value: 22000, display: "22,000", highlight: true },
                  { label: "KAIWEETS HT118E", value: 20000, display: "20,000" },
                  { label: "KAIWEETS HT118A", value: 6000, display: "6,000" },
                  { label: "KAIWEETS KM602", value: 6000, display: "6,000" },
                  { label: "UNI-T UT139C", value: 6000, display: "6,000" },
                  { label: "Klein Tools MM420", value: 4000, display: "4,000" },
                  { label: "Klein Tools MM460S", value: 4000, display: "4,000" },
                  { label: "Klein Tools MM325", value: 2000, display: "2,000" },
                ]}
              />
            </Figure>
            <Figure
              caption={
                <>
                  Smallest current step on the lowest range, in µA, log scale (shorter is finer). The HT118E value
                  follows from its 200 µA range at 20,000 counts; KAIWEETS doesn&apos;t print it. The KM602 starts at a
                  600 mA range.
                </>
              }
            >
              <BarChart
                log
                items={[
                  { label: "UNI-T UT61E+", value: 0.01, display: "0.01 µA", highlight: true },
                  { label: "OWON B41T+", value: 0.01, display: "0.01 µA", highlight: true },
                  { label: "KAIWEETS HT118E", value: 0.01, display: "0.01 µA (implied)", highlight: true },
                  { label: "KAIWEETS HT118A", value: 0.1, display: "0.1 µA" },
                  { label: "Klein Tools MM420", value: 0.1, display: "0.1 µA" },
                  { label: "KAIWEETS KM602", value: 100, display: "0.1 mA" },
                ]}
              />
            </Figure>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">What to check before you buy a budget meter</h2>
          <InfoCards items={lookFor} />
          <KeyIdea title="Cheap meters fail at the edges, not in the middle">
            Nearly every meter here will read a 12V battery or a 120V outlet correctly. The differences show up at the
            extremes: microamps, fractions of an ohm, distorted AC and high-energy transients. Decide which of those edges
            you will actually reach. Our guides to{" "}
            <Link href="/multimeters/how-to-measure-microamps-with-a-multimeter" className={linkClass}>
              measuring microamps
            </Link>
            ,{" "}
            <Link href="/multimeters/multimeter-accuracy-for-electronics-repair" className={linkClass}>
              multimeter accuracy for electronics repair
            </Link>{" "}
            and the{" "}
            <Link href="/multimeters/multimeter-buying-guide" className={linkClass}>
              multimeter buying guide
            </Link>{" "}
            explain each one, and our{" "}
            <Link href="/multimeters/kaiweets-km200s-review" className={linkClass}>
              KAIWEETS KM200s review
            </Link>{" "}
            looks closely at the entry-level end.
          </KeyIdea>
        </div>
      </section>

      <ReviewArticle
        picks={picks}
        faqs={faqs}
        howWeChose="We considered only budget meters with a safety rating documented in the maker's manual or marked on the case, then ranked them for a general buyer: how many everyday jobs one meter covers safely first, then True RMS, display counts and current resolution, convenience features such as NCV, Smart mode or a rechargeable cell, and warranty. Specs come from maker manuals, product pages and official listings; where they conflict we use the lower figure. This is desk research, and none of these ten has been hands-on tested by us."
        fitNotes={fitNotes}
        advice={advice}
      />
      <ContentLinks category="multimeters" current="/multimeters/best-multimeter-under-100" />
    </>
  );
}
