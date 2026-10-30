import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { CategoryHero } from "@/components/CategoryHero";
import { ReviewArticle } from "@/components/ReviewArticle";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { getAllPicks } from "@/lib/catalog";
import { guidePicks } from "@/lib/content";

export const metadata = buildMetadata({
  title: "10 Best True RMS Multimeters Under $100",
  description:
    "Our top 10 True RMS multimeters under $100, ranked on resolution, published AC bandwidth, safety rating and current ranges, with no average-responding meters.",
  path: "/multimeters/best-true-rms-multimeters-under-100",
  image: "https://m.media-amazon.com/images/I/61p7ga5bJnL._SL1500_.jpg",
});

const PATH = "/multimeters/best-true-rms-multimeters-under-100";
const all = getAllPicks("multimeters");
const picks = guidePicks(PATH)
  .map((n) => all.find((p) => p.name === n)!)
  .filter(Boolean);

const linkClass = "text-accent hover:underline";

const comparisonRows: string[][] = [
  ["1", "UNI-T UT61E+", "22,000", "CAT IV 600V / CAT III 1000V", "0.01 µA", "Electronics and drives: 40 Hz-10 kHz AC, low-pass filter"],
  ["2", "Klein Tools MM720", "6,000", "CAT IV 600V / CAT III 1000V", "0.1 µA", "Electrical work: LoZ and 1000 V AC/DC"],
  ["3", "KAIWEETS HT118A", "6,000", "CAT IV 600V / CAT III 1000V", "0.1 µA", "The lowest-cost all-rounder here"],
  ["4", "OWON B41T+", "22,000", "1000V CAT III (case marking)", "0.01 µA", "Logging readings without a phone attached"],
  ["5", "Klein Tools MM450", "4,000", "CAT III 600V", "0.1 µA", "A slim meter for home and appliance AC"],
  ["6", "Klein Tools MM420", "4,000", "CAT III 600V", "0.1 µA", "Indoor HVAC and household checks"],
  ["7", "UNI-T UT139C", "6,000", "CAT III 600V", "Not in our data", "A compact True RMS meter with NCV"],
  ["8", "KAIWEETS KM602", "6,000", "CAT III 600V", "0.1 mA", "Beginners who want Smart mode and a rechargeable cell"],
  ["9", "OWON OW18E", "19,999", "1000V CAT III / 600V CAT IV (case marking)", "0.01 µA", "Fine resolution and Bluetooth at the lowest cost"],
  ["10", "KAIWEETS KM200s", "4,000", "CAT II 600V", "Not in our data", "Outlet and appliance checks with NCV"],
];

const lookFor = [
  {
    label: "True RMS on the functions you use",
    desc: "Some meters apply True RMS to AC volts only. Check that AC current is covered too if you measure loads.",
  },
  {
    label: "Published AC bandwidth",
    desc: "True RMS accuracy holds only inside the meter's specified frequency range; outside it, readings drift.",
  },
  {
    label: "Display counts",
    desc: "20,000-plus counts give an extra digit on the same range, useful for sensor signals and small AC voltages.",
  },
  {
    label: "A low-pass filter",
    desc: "Strips the switching carrier from a variable-frequency drive's output so the meter reads the motor voltage.",
  },
  {
    label: "Safety rating you can trust",
    desc: "Prefer a rating the maker documents; where only the case marking states it, treat it with a little caution.",
  },
  {
    label: "Current ranges",
    desc: "A µA range helps with electronics and flame sensors; 10 A or 20 A covers small appliance loads in series.",
  },
];

const faqs = [
  {
    question: "What does True RMS mean on a multimeter?",
    answer:
      "RMS (root mean square) is the DC-equivalent heating value of an AC signal. A True RMS meter calculates it from the actual waveform, so it reads correctly on distorted AC. A cheaper average-responding meter measures the average and multiplies by a factor that is only right for a clean sine wave, so it can read well off on the output of a dimmer, LED driver, switching supply or motor drive.",
  },
  {
    question: "Do I really need True RMS under $100?",
    answer:
      "If you only check batteries, continuity and ordinary outlets, an average-responding meter will be fine. True RMS starts to matter as soon as you measure current drawn by electronic loads, a variable-speed motor, a dimmed circuit or a UPS output. Since several True RMS meters here cost about the same as basic ones, there is little reason to skip it on a new purchase.",
  },
  {
    question: "Is a 20,000-count True RMS meter better than a 6,000-count one?",
    answer:
      "For electronics, usually. More counts mean an extra digit on each range, so a 220.00 mV or 200.00 µA range resolves ten times finer than a 6,000-count range. For mains work, 6,000 counts is plenty and the safety rating, LoZ and toughness matter more. That is why the 6,000-count Klein MM720 ranks second despite its lower count.",
  },
  {
    question: "Why does my True RMS meter read differently from a cheap one on the same outlet?",
    answer:
      "Household voltage is rarely a perfect sine wave, especially with many electronic loads on the circuit, so the two methods disagree slightly. The gap is larger on current: a computer power supply or LED driver draws peaky current that an averaging meter can under-read noticeably. Within its bandwidth, the True RMS reading is the one to trust for heating and load calculations.",
  },
  {
    question: "Can a True RMS multimeter measure a VFD output?",
    answer:
      "It can, but the high-frequency switching carrier on a drive's output can confuse the reading. A low-pass filter helps: the UNI-T UT61E+ has one on its AC voltage function. Without a filter, readings may be erratic or high. Drive outputs carry hazardous voltage, so use a meter rated for the location (CAT III or better) and follow the drive maker's procedure.",
  },
  {
    question: "How is this list different from your best multimeter under $100 guide?",
    answer:
      "That guide includes meters that are not True RMS, such as the Extech EX330, chosen for value overall. This list admits only meters that are True RMS and were listed under $100 on Amazon.com in October 2026, ranked on how well they measure AC: resolution, published bandwidth, filtering, safety rating and current ranges.",
  },
];

const fitNotes: Record<string, string> = {
  "UNI-T UT61E+":
    "It leads because UNI-T publishes a True RMS AC voltage band of 40 Hz to 10 kHz, the widest in our verified data and enough for most electronics work, plus a low-pass filter for drive outputs, 22,000 counts and CAT IV 600V. UNI-T doesn't publish its burden voltage, and there is no temperature input.",
  "Klein Tools MM720":
    "The strongest choice if your AC readings are mostly on mains wiring: True RMS to 1000 V AC and DC, CAT IV 600V, LoZ and a sealed IP42 case. At 6,000 counts it resolves less finely than the leader, and Klein lists no NCV.",
  "KAIWEETS HT118A":
    "True RMS, a CAT IV 600V rating, a 600 µA range, temperature and NCV for well under half the top two's prices make it the value pick. AC voltage stops at 750 V, and the maker's product page and manual disagree on the maximum, so read the meter face.",
  "OWON B41T+":
    "Its 22,000 counts and 0.01 µA resolution match the leader, and it can record 10,000 points for up to 168 hours on its own, which suits tracking a drifting AC supply overnight. OWON's page states no CAT rating (the case says 1000V CAT III), so it ranks behind the documented meters.",
  "Klein Tools MM450":
    "For True RMS readings around the house, its slim body, self-adjusting reverse-contrast display and Lead-Alert jack lights are easy to live with. It is a 4,000-count, CAT III 600V meter without LoZ or NCV, so it trails the higher-count and CAT IV options.",
  "Klein Tools MM420":
    "It pairs True RMS with fused current ranges from 400.0 µA to 10 A, temperature and capacitance. Klein's manual limits AC voltage accuracy to 50-400 Hz and the meter is for indoor use, which keeps it in the lower half.",
  "UNI-T UT139C":
    "True RMS, 6,000 counts, NCV and CAT III 600V in a compact body cover everyday AC checks. Our verified data doesn't include its current ranges or AC bandwidth, so it can't climb above meters that publish them.",
  "KAIWEETS KM602":
    "Smart mode and a rechargeable cell make this True RMS meter friendly for newcomers. Its smallest current range is 600 mA (0.1 mA steps), so there is no µA work, and the manual rates it CAT III 600V, below what its listing claims.",
  "OWON OW18E":
    "It offers 0.01 µA and 0.01 Ω resolution, Bluetooth with offline recording, NCV and temperature at the lowest cost of the high-count meters. OWON doesn't state its CAT rating or burden voltage, which keeps it near the bottom.",
  "KAIWEETS KM200s":
    "Its official Amazon listing documents True RMS, smart auto-ranging, NCV, a backlit display and a flashlight. It is the only meter here rated just CAT II 600V, so keep it to outlets, cords and appliances rather than panels, and our verified data has no current ranges for it. That places it last.",
};

const advice = [
  {
    heading: "Match the meter to the AC you measure",
    body:
      "Mains voltage and motor current sit at 50 or 60 Hz, which every meter here handles. Audio signals, inverter outputs and switching-supply ripple run far higher, and a meter specified only to a few hundred hertz will under-read them. If you measure above mains frequency, choose a meter that publishes its AC bandwidth, like the UT61E+, and stay inside it.",
  },
  {
    heading: "Pick counts or toughness, then fill in the rest",
    body:
      "The list splits into two camps. The UT61E+, B41T+ and OW18E give about 20,000 counts or more for bench work. The MM720, HT118A and the Klein 400-series give 4,000 to 6,000 counts in tougher, simpler cases with features aimed at electrical work. Decide which side you need first; it narrows the choice quickly.",
  },
  {
    heading: "Treat case markings as the weaker evidence",
    body:
      "Both OWON meters carry CAT markings on the case, but OWON's own pages don't state a rating. KAIWEETS's KM602 listing claims more than its manual. We report the documented figure where one exists. If you will work in panels, prefer a meter whose maker publishes its CAT rating in the manual, such as the Klein or UNI-T models here.",
  },
  {
    heading: "Check stock before you rely on a pick",
    body:
      "Prices and stock at this level move quickly. The MM720 was only a few cents below $100 when we checked, and the OW18E was down to its last unit. If a meter has crossed $100 or vanished, the next pick with the same feature you need (counts, CAT IV or LoZ) is the better substitute.",
  },
];

export default function BestTrueRmsMultimetersUnder100Page() {
  return (
    <>
      <CategoryHero
        category="multimeters"
        label="Multimeters · True RMS Under $100"
        heading="Top 10 Best True RMS Multimeters Under $100"
        tagline="Only True RMS meters, ranked on AC performance."
        description="Our top 10 best True RMS multimeters under $100, every one True RMS, ranked for accurate AC on distorted waveforms: published bandwidth, display counts, filtering, safety rating and current ranges."
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
          <h2 className="text-2xl sm:text-3xl font-semibold">Why True RMS matters, and what it doesn&apos;t fix</h2>
          <p className="text-muted leading-7">
            A True RMS meter computes the real heating value of an AC signal from its shape, so it stays accurate when
            the waveform is clipped, peaky or chopped. That is the norm today: LED drivers, phone chargers, dimmers,
            inverters and variable-speed drives all distort voltage or current. An average-responding meter assumes a
            clean sine wave and can be badly off on those loads. True RMS doesn&apos;t make a meter accurate at any
            frequency, though; it only holds within the bandwidth the maker specifies, which is why we favored meters
            that publish one.
          </p>
          <p className="text-muted leading-7">
            Every meter here is True RMS and was listed under $100 on Amazon.com when we checked in October 2026; prices
            change, so the buy button shows the live figure. This is a narrower list than our{" "}
            <Link href="/multimeters/best-multimeter-under-100" className={linkClass}>
              best multimeter under $100
            </Link>{" "}
            guide, which also admits average-responding meters. For background, read the{" "}
            <Link href="/multimeters/multimeter-buying-guide" className={linkClass}>
              multimeter buying guide
            </Link>{" "}
            and{" "}
            <Link href="/multimeters/multimeter-accuracy-for-electronics-repair" className={linkClass}>
              multimeter accuracy for electronics repair
            </Link>
            ; for a close look at a cheaper True RMS option, see our{" "}
            <Link href="/multimeters/uni-t-ut139c-review" className={linkClass}>
              UNI-T UT139C review
            </Link>{" "}
            and the{" "}
            <Link href="/multimeters/kaiweets-km200s-vs-uni-t-ut139c" className={linkClass}>
              KAIWEETS KM200s vs UNI-T UT139C
            </Link>{" "}
            comparison.
          </p>
        </div>

        <Callout title="True RMS is not a safety feature">
          Accurate AC readings don&apos;t make a meter safe on mains. What protects you is the CAT rating on the meter
          and leads, fused current inputs and correct lead placement. Use a CAT III 600V or better meter in distribution
          panels and CAT IV 600V at the service entrance, never put leads that sit in the current jacks across a voltage,
          and keep fingers behind the probe guards.
        </Callout>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">Quick comparison</h2>
          <DataTable
            head={["#", "Meter", "Counts", "Safety rating", "Finest current", "Best for"]}
            rows={comparisonRows}
            mono={[0]}
          />
          <p className="text-xs text-muted leading-5">
            Counts and ratings are from the maker&apos;s manual or page, or the case marking where noted.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">How the ten compare on paper</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Figure caption={<>Display counts. Higher counts add a digit of resolution on each range.</>}>
              <BarChart
                items={[
                  { label: "UNI-T UT61E+", value: 22000, display: "22,000", highlight: true },
                  { label: "OWON B41T+", value: 22000, display: "22,000", highlight: true },
                  { label: "OWON OW18E", value: 19999, display: "19,999", highlight: true },
                  { label: "Klein Tools MM720", value: 6000, display: "6,000" },
                  { label: "KAIWEETS HT118A", value: 6000, display: "6,000" },
                  { label: "UNI-T UT139C", value: 6000, display: "6,000" },
                  { label: "KAIWEETS KM602", value: 6000, display: "6,000" },
                  { label: "Klein Tools MM450", value: 4000, display: "4,000" },
                  { label: "Klein Tools MM420", value: 4000, display: "4,000" },
                  { label: "KAIWEETS KM200s", value: 4000, display: "4,000" },
                ]}
              />
            </Figure>
            <Figure
              caption={
                <>
                  Finest current resolution in microamps, on a log scale (shorter bar is finer). UT139C and KM200s omitted:
                  their current ranges aren&apos;t in our verified data.
                </>
              }
            >
              <BarChart
                log
                items={[
                  { label: "KAIWEETS KM602", value: 100, display: "100 µA (0.1 mA)" },
                  { label: "Klein Tools MM720", value: 0.1, display: "0.1 µA" },
                  { label: "KAIWEETS HT118A", value: 0.1, display: "0.1 µA" },
                  { label: "Klein Tools MM450", value: 0.1, display: "0.1 µA" },
                  { label: "Klein Tools MM420", value: 0.1, display: "0.1 µA" },
                  { label: "UNI-T UT61E+", value: 0.01, display: "0.01 µA", highlight: true },
                  { label: "OWON B41T+", value: 0.01, display: "0.01 µA", highlight: true },
                  { label: "OWON OW18E", value: 0.01, display: "0.01 µA", highlight: true },
                ]}
              />
            </Figure>
          </div>
          <Figure
            caption={
              <>
                Highest voltage rated at CAT III. OWON figures come from the case markings because OWON&apos;s pages
                don&apos;t state a rating. The KM200s is rated CAT II 600V only, so it isn&apos;t shown.
              </>
            }
          >
            <BarChart
              items={[
                { label: "UNI-T UT61E+", value: 1000, display: "1000 V", highlight: true },
                { label: "Klein Tools MM720", value: 1000, display: "1000 V", highlight: true },
                { label: "KAIWEETS HT118A", value: 1000, display: "1000 V", highlight: true },
                { label: "OWON B41T+", value: 1000, display: "1000 V (marking)" },
                { label: "OWON OW18E", value: 1000, display: "1000 V (marking)" },
                { label: "Klein Tools MM450", value: 600, display: "600 V" },
                { label: "Klein Tools MM420", value: 600, display: "600 V" },
                { label: "UNI-T UT139C", value: 600, display: "600 V" },
                { label: "KAIWEETS KM602", value: 600, display: "600 V" },
              ]}
            />
          </Figure>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">What to look for in a True RMS meter on a budget</h2>
          <InfoCards items={lookFor} />
          <KeyIdea title="Bandwidth is the fine print of True RMS">
            UNI-T specifies the UT61E+&apos;s AC voltage accuracy from 40 Hz to 10 kHz, while Klein&apos;s MM420 manual
            specifies 50 Hz to 400 Hz. Both are True RMS, and both read a 60 Hz outlet correctly, but only the UNI-T is
            specified for the harmonics and higher-frequency AC you meet in electronics. Our verified data has no such figure
            for most of the others, so check the manual before trusting their high-frequency readings. If readings
            jump around, our guide to{" "}
            <Link href="/multimeters/unstable-multimeter-readings" className={linkClass}>
              unstable multimeter readings
            </Link>{" "}
            covers the usual causes.
          </KeyIdea>
        </div>
      </section>

      <ReviewArticle
        picks={picks}
        faqs={faqs}
        howWeChose="We kept only meters that their maker or official listing describes as True RMS and that were listed under $100 on Amazon.com in October 2026, then ranked them on AC measurement quality: published bandwidth and filtering, display counts, documented safety rating and current ranges. Figures come from maker manuals, product pages and official listings; this is desk research, and none of these ten carries our Hands-on Tested badge."
        fitNotes={fitNotes}
        advice={advice}
      />
      <ContentLinks category="multimeters" current="/multimeters/best-true-rms-multimeters-under-100" />
    </>
  );
}
