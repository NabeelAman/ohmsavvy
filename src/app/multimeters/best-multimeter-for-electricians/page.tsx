import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { CategoryHero } from "@/components/CategoryHero";
import { ReviewArticle } from "@/components/ReviewArticle";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { getAllPicks } from "@/lib/catalog";
import { guidePicks } from "@/lib/content";

export const metadata = buildMetadata({
  title: "10 Best Multimeters for Electricians (2026)",
  description:
    "The 10 best multimeters for electricians, ranked on CAT III/IV rating, LoZ for ghost voltage, True RMS and NCV, plus the clamps and testers for panel work.",
  path: "/multimeters/best-multimeter-for-electricians",
});

const PATH = "/multimeters/best-multimeter-for-electricians";
const all = getAllPicks("multimeters");
const picks = guidePicks(PATH)
  .map((n) => all.find((p) => p.name === n)!)
  .filter(Boolean);

const linkClass = "text-accent hover:underline";

const comparisonRows: string[][] = [
  ["1", "Fluke 117", "Multimeter", "CAT III 600V", "Yes", "Yes", "Daily residential and commercial troubleshooting"],
  ["2", "Klein Tools MM720", "Multimeter", "CAT IV 600V / CAT III 1000V", "Yes", "No", "Service entrances and feeders on a tighter budget"],
  ["3", "Fluke 87V", "Multimeter", "CAT IV 600V / CAT III 1000V", "Not listed", "Not listed", "Industrial panels, drives and high-resolution work"],
  ["4", "Fluke 179", "Multimeter", "CAT IV 600V / CAT III 1000V", "Not listed", "No", "Maintenance crews who also log temperature"],
  ["5", "Brymen BM235", "Multimeter", "CAT III 600V / CAT IV 300V", "Yes (AutoV)", "Yes", "Feature-hungry electricians and VFD checks"],
  ["6", "Fluke 117/323 Kit", "Meter + clamp", "CAT III 600V (both)", "Yes (117)", "Yes (117)", "Apprentices kitting out in one purchase"],
  ["7", "Fluke T5-600", "Electrical tester", "CAT III 600V", "Not listed", "Not listed", "Fast voltage and load-current checks"],
  ["8", "Fluke 323", "Clamp meter", "CAT III 600V / CAT IV 300V", "Not listed", "Not listed", "Adding a clamp to an existing meter"],
  ["9", "Milwaukee 2235-20", "Clamp meter", "CAT III 600V", "Not listed", "Not listed", "Crews already on Milwaukee tools"],
  ["10", "Southwire 16030A", "Voltage/continuity meter", "CAT IV 600V", "Not listed", "Yes", "Wet sites and voltage-only checks"],
];

const lookFor = [
  {
    label: "CAT rating matched to the job",
    desc: "CAT III covers distribution panels and branch circuits; CAT IV covers the service drop, meter base and outdoor feeders. Buy for the highest point you will probe.",
  },
  {
    label: "LoZ or AutoV mode",
    desc: "A low-impedance input loads down induced voltage on dead conductors, so a ghost reading collapses while a real supply stays put.",
  },
  {
    label: "True RMS",
    desc: "Drives, LED drivers and switch-mode supplies distort current and voltage. An average-responding meter can read those waveforms wrong.",
  },
  {
    label: "A way to read current safely",
    desc: "Opening a 20 A circuit to put a meter in series is slow and risky. A clamp jaw or an open-fork tester reads load current around the conductor.",
  },
  {
    label: "Built for the van and the ladder",
    desc: "Drop ratings, IP ratings, a readable display in a dark closet and leads that store in the case all matter more on site than extra functions.",
  },
  {
    label: "NCV as a first warning",
    desc: "A built-in non-contact detector speeds up the first sweep of a box. It never replaces a contact test-before-touch with the leads.",
  },
];

const faqs = [
  {
    question: "Why do electricians need a LoZ setting on a multimeter?",
    answer:
      "Long runs of cable next to energized conductors pick up capacitively coupled voltage, and a high-impedance digital meter can show tens of volts on a wire that is actually dead. A low-impedance (LoZ) input puts a small load across the leads, so that induced voltage collapses toward zero while a genuine supply holds. The Fluke 117, Klein MM720 and Brymen BM235 in this list have it.",
  },
  {
    question: "Is CAT IV necessary for residential electrical work?",
    answer:
      "Inside a house, most work at receptacles, fixtures and the load side of the breaker panel sits in CAT III territory. CAT IV applies at the origin of the installation: the service drop, the meter socket and outdoor feeders before the main disconnect. If you replace meter bases or trace service-entrance faults, choose a CAT IV 600V meter such as the MM720, 87V, 179 or Southwire 16030A.",
  },
  {
    question: "Should an electrician buy a clamp meter or a multimeter first?",
    answer:
      "Most electricians start with a multimeter, because voltage, continuity and resistance cover the majority of service calls, and then add a clamp for load current. If you mostly balance panels or chase overloaded circuits, the clamp may earn its keep sooner. The Fluke 117/323 Kit sidesteps the question by putting both in one case, and the T5-600 combines basic volts with open-jaw amps.",
  },
  {
    question: "Can a non-contact voltage detector replace testing with leads?",
    answer:
      "No. A non-contact detector senses the electric field around an insulated conductor and can miss voltage behind shielding, in metal conduit or on a neutral that is carrying current. Use it to speed up the first sweep, then confirm with the test leads on a meter you have just proved on a known live source, and prove it again afterwards. That live-dead-live routine is what keeps you safe.",
  },
  {
    question: "Does a multimeter's CAT rating cover the test leads too?",
    answer:
      "The system is only as safe as its lowest-rated part. A CAT IV meter used with CAT II leads is a CAT II setup. Check the rating printed on the leads, the probe tips and any clip-on accessories. Klein notes that the CAT IV figure on some MM450 listings applies to the leads alone, while the meter itself is CAT III 600V, which shows why both markings matter.",
  },
  {
    question: "How often should an electrician replace multimeter test leads?",
    answer:
      "There is no fixed interval. Replace them as soon as the insulation is cracked, nicked or melted, the probe shrouds are missing, or the conductor shows through near the plug. A quick check is to measure resistance with the probes shorted; a reading that jumps or climbs well above a fraction of an ohm points to a broken strand. Our lead-testing guide walks through it.",
  },
];

const fitNotes: Record<string, string> = {
  "Fluke 117":
    "It leads because it puts the three things a service electrician uses every day into one CAT III 600V True RMS body: a LoZ input for phantom voltage, AutoVolt so the meter picks AC or DC on its own, and a built-in non-contact detector. It carries our Hands-on Tested badge. The trade-off is that it stops at CAT III, so it is not the meter for meter-base or service-drop work.",
  "Klein Tools MM720":
    "It is the most panel-ready meter in its class: CAT IV 600V and CAT III 1000V, 1000V AC/DC, LoZ for ghost voltage and True RMS on a 6,000-count reverse-contrast display. IP42 and a 2 m drop rating suit van life, and current runs from a 600.0 µA range to 10 A. Klein lists no NCV, so carry a separate pen tester.",
  "Fluke 87V":
    "It brings CAT IV 600V and CAT III 1000V protection, a 19,999-count high-resolution mode and a fast analog bar graph for watching readings move on motors and controls. It carries our Hands-on Tested badge. For a residential electrician it is more meter than the job needs, which is why the more focused 117 and MM720 rank above it.",
  "Fluke 179":
    "A CAT IV 600V True RMS meter with temperature through the supplied thermocouple, capacitance to 10,000 µF, frequency to 100 kHz and Min/Max-Average recording, with both automatic and manual ranging. It suits maintenance electricians who also check motor temperatures and capacitors. It has no non-contact voltage detection, so it sits behind the meters that combine LoZ with field-friendly extras.",
  "Brymen BM235":
    "For the feature list alone it is hard to beat: AutoV low-impedance voltage, NCV, a VFD mode for variable-speed drives, Type-K temperature and Max/Min/Avg, protected by 1000V-rated HBC fuses. Brymen's catalog and the meter's markings give CAT III 600V but only CAT IV 300V, so it belongs inside the building, and US support runs through distributors rather than a big brand.",
  "Fluke 117/323 Kit":
    "This official Fluke bundle pairs the 117 multimeter with the 323 True RMS clamp in a soft case, so a new electrician gets voltage, LoZ and NCV plus 400A AC clamp current in one purchase. Both tools are CAT III 600V. It only makes sense if you need both; anyone who already owns a good meter should buy the clamp alone.",
  "Fluke T5-600":
    "It is an electrician's tester, not a full multimeter: automatic AC/DC voltage to 600V, continuity, resistance to 1,000 Ω and up to 100A AC through the OpenJaw fork, with the probes stored in the back and a 3 m drop rating. It is average-responding rather than True RMS and has no capacitance or frequency, so treat it as a quick-check tool alongside a proper meter.",
  "Fluke 323":
    "A light 265 g True RMS clamp that reads up to 400A AC around a conductor, rated CAT III 600V and CAT IV 300V. It is the natural second tool for someone who already carries a multimeter and wants load current without opening the circuit. It cannot read DC current and has no backlight, temperature or frequency mode.",
  "Milwaukee 2235-20":
    "A True RMS clamp with a 1-inch jaw, 400A AC and 600V AC/DC at CAT III 600V, plus resistance and continuity. For a crew already standardized on Milwaukee tools it slots into the kit easily. Like the 323, it measures AC current only, and Milwaukee doesn't state auto-ranging, so it ranks just behind the Fluke clamp.",
  "Southwire 16030A":
    "A deliberately simple CAT IV 600V, IP67 meter for electricians who mostly verify voltage: it picks AC or DC itself, switches to voltage if it finds a live circuit in resistance or continuity mode, and adds a 100–600V NCV and a flashlight. It cannot measure current, capacitance or frequency and resistance stops at 400 kΩ, so it is a rugged companion rather than a main meter.",
};

const advice = [
  {
    heading: "Rate the meter for the worst place you will put it",
    body:
      "A meter that spends most days on receptacles still has to survive the one day you check a meter base. Transients near the service entrance carry far more energy than those at a branch outlet, which is why CAT IV exists. If your work ever reaches the service side, the MM720, 87V, 179 or 16030A belongs in the bag; if it never does, a CAT III 600V meter like the 117 is enough.",
  },
  {
    heading: "Pair a meter with a clamp instead of buying one tool for everything",
    body:
      "Multimeters with 10 A inputs are poor tools for load current on live circuits: you have to open the circuit, the fuse limits you and a mistake with the leads in the amps jack can arc. A clamp like the Fluke 323 or Milwaukee 2235-20, or the open fork on the T5-600, reads current around the conductor instead. Most working electricians end up carrying one of each.",
  },
  {
    heading: "Use LoZ to settle ghost voltage arguments",
    body:
      "When a circuit you have switched off still shows 30 or 40 volts on a high-impedance meter, LoZ tells you whether that voltage can drive a load. If the reading collapses under the low-impedance input, it is coupling from a neighboring conductor; if it holds, something is still connected. That saves call-backs and stops you treating a live circuit as dead.",
  },
  {
    heading: "Check the whole measuring system, not just the meter",
    body:
      "The CAT rating printed on the meter only holds if the leads, probe tips and fuses match it. Fit probe-tip covers where the code calls for them, replace fuses only with the exact rating listed in the manual, and prove the meter on a known live source before and after every dead test. Those habits matter more than any single feature on this list.",
  },
];

export default function BestMultimeterForElectriciansPage() {
  return (
    <>
      <CategoryHero
        category="multimeters"
        label="Multimeters · For Electricians"
        heading="Best Multimeter for Electricians: Top 10 for Panel and Service Work"
        tagline="Ranked on CAT rating, LoZ and field toughness."
        description="Our top 10 multimeters, clamps and testers for electricians, ranked on the safety category you can work in, ghost-voltage rejection, True RMS accuracy, current measurement and how well each survives daily site use."
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
          <h2 className="text-2xl sm:text-3xl font-semibold">The short answer for working electricians</h2>
          <p className="text-muted leading-7">
            The best multimeter for most electricians is the Fluke 117, because it combines LoZ ghost-voltage rejection,
            automatic AC/DC selection, built-in non-contact voltage and True RMS in a CAT III 600V meter we have tested
            ourselves. If you work at the service entrance, the Klein Tools MM720 adds CAT IV 600V and 1000V ranges while
            keeping LoZ, and the Fluke 87V is the step up for industrial panels and drives. The rest of the list fills the
            gaps a single meter leaves: a combo kit, two clamps, an open-jaw tester and a waterproof voltage checker.
          </p>
          <p className="text-muted leading-7">
            Electrical work asks different questions from bench electronics. Resolution in microvolts matters little; what
            matters is whether the meter survives a transient on a 480V bus, whether it can tell a dead conductor from one
            carrying induced voltage, and how quickly you can read load current without opening a circuit. We weighted the
            ranking that way, so a few meters that top general roundups sit lower here, and tools that are not full
            multimeters earn a place because they do one electrician&apos;s job well. Our{" "}
            <Link href="/multimeters/fluke-117-review" className={linkClass}>
              Fluke 117 review
            </Link>{" "}
            and{" "}
            <Link href="/multimeters/fluke-87v-review" className={linkClass}>
              Fluke 87V review
            </Link>{" "}
            go deeper on the two tested meters, and{" "}
            <Link href="/multimeters/fluke-117-vs-fluke-87v" className={linkClass}>
              Fluke 117 vs 87V
            </Link>{" "}
            explains when the bigger meter pays off. If budget is the constraint, see our{" "}
            <Link href="/multimeters/best-multimeters-for-electricians-under-100" className={linkClass}>
              electrician&apos;s meters on a budget
            </Link>
            .
          </p>
        </div>

        <Callout title="Panel work is not a place to learn">
          Opening a panel exposes you to arc-flash and shock hazards that a meter rating alone does not remove. Wear the
          PPE your work requires, use leads and probe covers rated to the same category as the meter, and follow your
          lockout/tagout procedure. Test before touch every time, proving the meter on a known live source before and
          after. If you are not qualified for the equipment in front of you, stop and call a licensed electrician or the
          utility; in an emergency involving fire or injury, call 911.
        </Callout>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">Quick comparison</h2>
          <DataTable
            head={["#", "Tool", "Type", "Safety rating", "LoZ", "NCV", "Best for"]}
            rows={comparisonRows}
            mono={[0]}
          />
          <p className="text-xs text-muted leading-5">
            Ratings and features come from each maker&apos;s page, datasheet or manual. &quot;Not listed&quot; means the
            feature isn&apos;t in our verified spec data, not that the tool definitely lacks it. Brymen&apos;s web page and
            catalog disagree on the BM235&apos;s categories; we use the catalog and the meter&apos;s markings.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">Safety category and current reach, side by side</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Figure
              caption={
                <>
                  Voltage covered at CAT IV, the category for service drops and meter bases. The Fluke 117, T5-600,
                  Milwaukee 2235-20 and the 117/323 Kit are rated CAT III only, so they are not shown.
                </>
              }
            >
              <BarChart
                items={[
                  { label: "Klein Tools MM720", value: 600, display: "600 V", highlight: true },
                  { label: "Fluke 87V", value: 600, display: "600 V", highlight: true },
                  { label: "Fluke 179", value: 600, display: "600 V", highlight: true },
                  { label: "Southwire 16030A", value: 600, display: "600 V", highlight: true },
                  { label: "Brymen BM235", value: 300, display: "300 V" },
                  { label: "Fluke 323", value: 300, display: "300 V" },
                ]}
              />
            </Figure>
            <Figure
              caption={
                <>
                  Highest current each tool reads, on a log scale. The clamps and the T5-600 read AC current around the
                  conductor; the MM720 needs the circuit opened. Current ceilings for the other meters aren&apos;t in our
                  verified data, and the 16030A has no current function.
                </>
              }
            >
              <BarChart
                log
                items={[
                  { label: "Fluke 323", value: 400, display: "400 A AC", highlight: true },
                  { label: "Milwaukee 2235-20", value: 400, display: "400 A AC", highlight: true },
                  { label: "Fluke T5-600", value: 100, display: "100 A AC" },
                  { label: "Klein Tools MM720", value: 10, display: "10 A" },
                ]}
              />
            </Figure>
          </div>
          <Figure
            caption={
              <>
                Highest voltage rated at CAT III, the category for distribution panels and branch circuits. Four of the
                ten carry a 1000V CAT III rating; the rest stop at 600V.
              </>
            }
          >
            <BarChart
              items={[
                { label: "Klein Tools MM720", value: 1000, display: "1000 V", highlight: true },
                { label: "Fluke 87V", value: 1000, display: "1000 V", highlight: true },
                { label: "Fluke 179", value: 1000, display: "1000 V", highlight: true },
                { label: "Fluke 117", value: 600, display: "600 V" },
                { label: "Brymen BM235", value: 600, display: "600 V" },
                { label: "Fluke T5-600", value: 600, display: "600 V" },
                { label: "Fluke 323", value: 600, display: "600 V" },
                { label: "Milwaukee 2235-20", value: 600, display: "600 V" },
              ]}
            />
          </Figure>
          <p className="text-xs text-muted leading-5">
            The Southwire 16030A is marked CAT IV 600V and has no separate CAT III figure in our data, so it appears only
            in the CAT IV chart.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">What separates an electrician&apos;s meter from a hobby meter</h2>
          <InfoCards items={lookFor} />
          <KeyIdea title="A ghost reading is a high-impedance meter telling the truth">
            A 10 MΩ input barely loads the circuit, so it faithfully reports voltage coupled onto an open conductor from
            its neighbors. That is correct physics and a wrong conclusion. LoZ changes the question from &quot;is there
            voltage?&quot; to &quot;can this voltage push current?&quot; Our explainer on{" "}
            <Link
              href="/multimeters/why-does-my-multimeter-show-voltage-when-measuring-a-disconnected-circuit"
              className={linkClass}
            >
              voltage on a disconnected circuit
            </Link>{" "}
            shows the effect, and{" "}
            <Link href="/multimeters/how-to-measure-ac-current-with-a-clamp-meter" className={linkClass}>
              measuring AC current with a clamp meter
            </Link>{" "}
            covers the clamp technique. For head-to-heads, read{" "}
            <Link href="/multimeters/brymen-bm235-vs-fluke-117" className={linkClass}>
              Brymen BM235 vs Fluke 117
            </Link>
            ,{" "}
            <Link href="/multimeters/fluke-117-vs-fluke-179" className={linkClass}>
              Fluke 117 vs 179
            </Link>{" "}
            and{" "}
            <Link href="/multimeters/fluke-117-vs-fluke-t5-600" className={linkClass}>
              Fluke 117 vs T5-600
            </Link>
            , or the{" "}
            <Link href="/multimeters/clamp-meter-buying-guide" className={linkClass}>
              clamp meter buying guide
            </Link>{" "}
            before choosing a clamp.
          </KeyIdea>
        </div>
      </section>

      <ReviewArticle
        picks={picks}
        faqs={faqs}
        howWeChose="We ranked tools for licensed and apprentice electricians doing residential, commercial and light industrial work. The highest CAT rating and voltage coverage came first, then LoZ or AutoV for ghost voltage, True RMS, a practical way to read load current, and durability features such as drop and IP ratings. Clamps and testers were included where they solve a daily electrician's job better than a meter. Specs come from maker pages, datasheets and manuals; the Fluke 117 and 87V carry our Hands-on Tested badge, and the rest are ranked by desk research."
        fitNotes={fitNotes}
        advice={advice}
      />
      <ContentLinks category="multimeters" current="/multimeters/best-multimeter-for-electricians" />
    </>
  );
}
