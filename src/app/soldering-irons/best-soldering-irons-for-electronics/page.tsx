import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { CategoryHero } from "@/components/CategoryHero";
import { ReviewArticle } from "@/components/ReviewArticle";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { picks as allPicks } from "../best-soldering-irons/page";
import { buildMetadata } from "@/lib/metadata";
import { guidePicks } from "@/lib/content";

// Weller WE1010NA 100–450°C range, ET tips, 85W station / 70W iron, ±6°C stability, standby and auto setback, password
// lock per https://www.weller-tools.com/us/en/industrial-soldering/products/soldering-stations/we1010na-120v
// Pinecil V2 28 g with tip and ST-B2 short tip as default per
// https://pine64.org/documentation/Pinecil/Further_information/Specifications/ (Pine64 publishes no temperature range).

export const metadata = buildMetadata({
  title: "10 Best Soldering Irons for Electronics (2026)",
  description:
    "The 10 best soldering irons for electronics in 2026, ranked on temperature control, tips, ESD safety and SMD rework, from Hakko and Weller to USB-C pens.",
  path: "/soldering-irons/best-soldering-irons-for-electronics",
  image: "https://hakkousa.com/media/catalog/product/cache/df61d37d6011304edba9471c8a539a49/d/x/dx_001.jpg",
});

const names = guidePicks("/soldering-irons/best-soldering-irons-for-electronics");
const picks = names.map((n) => allPicks.find((p) => p.name === n)!).filter(Boolean);

const linkClass = "text-accent hover:underline";

const comparisonRows: string[][] = [
  ["1", "Hakko FX-888DX", "T18", "65W iron, 100W station", "50–480°C", "A long-term bench for through-hole and fine SMD"],
  ["2", "Weller WE1010NA", "Weller ET", "70W iron", "100–450°C", "ESD-controlled benches that need locked settings"],
  ["3", "YIHUA 862BD+", "Not stated on the listing", "75W iron + 500W hot air", "200–480°C iron, 100–480°C air", "Boards mixing pins with SMD parts that need hot air"],
  ["4", "YIHUA 939D+", "YIHUA 900M", "\"75W equivalent\" (listing row: 120W)", "200–480°C (listing)", "An ESD-safe station on a hobby budget"],
  ["5", "X-Tronic 3020-XTS", "5 spare tips (T-I, T-B, T-3C, T-2.4D, T-K)", "60W iron, 75W station", "200–480°C", "Hobby benches that value warranty and sleep"],
  ["6", "Pinecil V2", "Pine64 short tips (ST-B2 fitted)", "Up to 88W at 24V", "Not stated by Pine64", "Repairs away from the bench on USB-C power"],
  ["7", "FNIRSI HS-02A", "HS-02A set (K, KU, JS, I, C2, B)", "Up to 100W, USB-C 9–20V", "100–450°C", "A portable kit with power for ground planes"],
  ["8", "Miniware TS101", "TS100", "USB-C PD 9–20V or DC 9–24V", "50–400°C", "Owners of TS100 tips who want a pocket iron"],
  ["9", "YIHUA 926 III", "YIHUA 900M (6 in kit)", "60W per listing (YIHUA site: 130W max)", "90–480°C", "A first station with helping hands in the box"],
  ["10", "Liouhoum 80W Soldering Iron Kit", "5 tips, series not stated", "80W (listing)", "180–480°C (listing)", "Occasional fixes on the smallest budget"],
];

const lookFor = [
  {
    label: "Closed-loop temperature control",
    desc: "A sensor near the tip and a PID or similar loop hold the setpoint as a joint draws heat away. Look for a stated stability figure.",
  },
  {
    label: "A tip family you can keep buying",
    desc: "T18, ET, 900M and TS100 tips are sold in many shapes. A conical tip for 0603 parts and a chisel for pins and wires cover most boards.",
  },
  {
    label: "ESD safety",
    desc: "An ESD-safe iron grounds the tip so a static charge or leakage voltage doesn't reach MOSFETs, CMOS logic or RF parts.",
  },
  {
    label: "Usable power, not the box number",
    desc: "Iron wattage decides recovery on ground pours and thick leads. Station totals and \"equivalent\" figures say less than the heater rating.",
  },
  {
    label: "Hot air for SMD rework",
    desc: "QFNs, multi-pin ICs and shielded parts come off cleanly with hot air; an iron alone needs drag soldering or wick.",
  },
  {
    label: "Sleep and setback",
    desc: "Dropping the tip temperature when the iron sits idle slows oxidation, saves tips and lowers the burn risk on a busy bench.",
  },
];

const faqs = [
  {
    question: "What temperature should I set my soldering iron to for electronics?",
    answer:
      "For leaded 63/37 or 60/40 solder, many people work around 315–345°C; lead-free alloys usually need roughly 350–370°C. Large pads, ground planes and thick wires may need more, while tiny SMD parts prefer the lowest setting that still flows solder within a couple of seconds. Every iron in this list reaches at least 400°C, so range is rarely the problem; holding the setpoint under load is.",
  },
  {
    question: "Is a soldering station better than a soldering iron pen for electronics?",
    answer:
      "A station puts the controller in a separate box, which usually means a lighter handpiece, a proper holder and steadier temperature during long sessions. Pen irons like the Pinecil V2 and FNIRSI HS-02A carry the controller in the handle and run from USB-C, which suits field repairs and small benches. For daily through-hole and SMD work, a station is the comfortable choice; a pen makes a good second iron.",
  },
  {
    question: "Do I need an ESD-safe soldering iron?",
    answer:
      "If you work on MOSFETs, CMOS chips, RF parts or modern phone and laptop boards, an ESD-safe iron is worth having. It grounds the tip so static and leakage current have a safe path. In this list the Hakko FX-888DX, Weller WE1010NA, YIHUA 939D+, X-Tronic 3020-XTS and YIHUA 862BD+ are listed as ESD safe. For the others, ESD safety isn't stated, so pair them with a grounded mat and wrist strap.",
  },
  {
    question: "Can I solder SMD components with a regular soldering iron?",
    answer:
      "Yes, most two-terminal parts down to 0603, SOT-23 transistors and SOIC chips solder well with a fine conical or small chisel tip, flux and thin solder. Fine-pitch QFP packages can be drag-soldered with a hoof or bevel tip. Parts with pads hidden underneath, such as QFN and BGA, need hot air or a preheater, which is why the YIHUA 862BD+ ranks high here.",
  },
  {
    question: "How many watts does a soldering iron for electronics need?",
    answer:
      "Around 60–80W on the heater is plenty for most circuit boards when the control loop is fast. Higher ratings help most with ground planes, large connectors and heavy wire, where a weak iron lets the tip temperature sag. Be careful comparing numbers: some listings quote station totals, \"equivalent\" wattage or figures that conflict with the maker's own page, as with both YIHUA stations here.",
  },
  {
    question: "Which soldering tip shapes are best for electronics work?",
    answer:
      "A medium chisel of about 2 mm handles through-hole pins, wires and most SMD passives, and transfers heat better than a needle point. Add a fine conical tip for crowded areas and a bevel or hoof tip for drag soldering IC legs. Buy tips from the same family as your iron, such as T18, ET, 900M or TS100, so replacements fit and read temperature correctly.",
  },
];

const fitNotes: Record<string, string> = {
  "Hakko FX-888DX":
    "It ranks first because it combines a 65W iron on a 100W station, ±1°C idle stability, ESD safety and the huge T18 tip range, which covers everything from 0402 work to large terminals. Hakko has discontinued the FX888D, so this replacement takes its place here and our FX888D Pick is marked unavailable; the limits are a 1.2 kg station and no stated sleep mode.",
  "Weller WE1010NA":
    "An ESD-safe station with a 70W iron, ET tips, standby with auto setback and a password lock makes it a natural fit for shared or production-style benches. It sits second because Weller's own page quotes ±6°C stability and a 450°C ceiling, both looser than the Hakko's figures, and it takes about 28 seconds to reach 350°C.",
  "YIHUA 862BD+":
    "This is the only pick with a hot air gun, so it handles QFN, shielded and multi-pin SMD parts that defeat an iron alone, while its 75W iron covers through-hole joints. It places third rather than higher because it is larger and more complex than a plain station, and the listing doesn't name its tip series.",
  "YIHUA 939D+":
    "PID control, a transformer-based design, a detachable 907E iron and an ESD-safe station and handpiece give it the strongest feature set among the budget stations. It ranks behind the 862BD+ because sources disagree: the listing says \"75W equivalent\" while its own spec row says 120W, and YIHUA's page for the 220V model gives 450°C rather than 480°C.",
  "X-Tronic 3020-XTS":
    "It is ESD safe, holds ±2°C with PID control, sleeps and cools after 10 minutes and carries a 3-year warranty, which makes it a sound everyday bench iron. It runs on 110V only, and X-Tronic's pages give two different minimum temperatures, so it trails the 939D+.",
  "Pinecil V2":
    "Pine64 rates it at up to 88W on a 24V supply and quotes about 12 seconds to working temperature with a 20V-plus supply, so it handles most board work from a USB-C charger or power bank. As a portable it lacks a stand in the box and needs a capable PD supply, and Pine64 doesn't state ESD safety or a temperature range.",
  "FNIRSI HS-02A":
    "A 100W ceiling from USB-C, three presets, calibration and six tips with a 100W charger in the kit give it more reserve than any other pen iron here for pads tied to ground pours. It ranks below the Pinecil because ESD safety isn't stated, it needs a PD or QC supply every time, and its tips differ from the HS-02B's.",
  "Miniware TS101":
    "TS100 tip compatibility, a 50–400°C range, motion-sensing sleep and a 65W adapter in the box make it handy for anyone already invested in TS100 tips. Its 400°C ceiling is the lowest here and Miniware's listing gives conflicting wattage, so we can't credit it with the reserve of the HS-02A.",
  "YIHUA 926 III":
    "PID control, calibration, an adjustable 5, 10 or 30 minute sleep and six 900M tips cover a beginner's first electronics bench well. It sits ninth because the station's ESD safety isn't stated and its power figures conflict: 60W on the listing versus 130W maximum and 18W rated on YIHUA's page.",
  "Liouhoum 80W Soldering Iron Kit":
    "A digital readout from 180–480°C, temperature memory and a 5-minute auto sleep are useful at this price, and the listing claims a 10-second heat-up. It ranks last for electronics because no maker site backs the specs, there is no ESD rating and the tip series isn't named, so replacement tips are a guess.",
};

const advice = [
  {
    heading: "Match the tip to the joint, then pick the iron",
    body:
      "Most problems blamed on a weak iron come from a tip that is too small. A 2 mm chisel moves far more heat into a header pin than a needle point at the same setting, so you can run cooler and protect pads. Before buying, check that the iron's tip family is sold in a conical, a chisel and a bevel shape you can actually get, and read our guide to tip types for the trade-offs.",
  },
  {
    heading: "Treat ESD as part of the iron's spec",
    body:
      "Static damage often shows up weeks later as a part that fails early, not as a dead board on the bench. If your projects include MOSFETs, microcontrollers or sensors, favor the irons listed as ESD safe here and add a grounded mat. Portable USB-C irons rarely state an ESD rating, so keep them for jobs where that risk is low or the work area is already grounded.",
  },
  {
    heading: "Decide early whether you need hot air",
    body:
      "If your boards are mostly through-hole and larger SMD parts, any good iron with flux and wick will do. Once you start replacing QFN regulators, USB connectors with shield tabs or multi-pin ICs, hot air saves time and pads. A combined unit like the YIHUA 862BD+ costs less bench space than buying a separate rework station later.",
  },
  {
    heading: "Read power figures with suspicion",
    body:
      "Listings for budget stations often quote station totals, \"equivalent\" ratings or numbers that disagree with the maker's site. The YIHUA 926 III and 939D+ both show this. Compare irons on heater rating, published stability and tip mass instead, and don't assume a bigger number means faster recovery on a ground plane.",
  },
  {
    heading: "Plan for fumes, burns and a safe place to park the iron",
    body:
      "Rosin flux smoke irritates the lungs, so use a fume extractor or a fan that pulls smoke away from your face. A heavy stand that holds the iron at an angle prevents burns and rolled-off irons; the pen irons here come with light stands, so set them where they can't be knocked. Wash your hands after handling leaded solder and keep food off the bench.",
  },
];

export default function BestSolderingIronsForElectronicsPage() {
  return (
    <>
      <CategoryHero
        category="soldering"
        label="Soldering Irons · Electronics"
        heading="10 Best Soldering Irons for Electronics in 2026: Top Picks Compared"
        tagline="Ranked on temperature control, tips, ESD and rework."
        description="Our top 10 soldering irons for electronics, ranked for through-hole and SMD boards on temperature stability, tip choice, ESD safety, hot air rework and value, from Hakko and Weller stations to USB-C pen irons."
        primaryCta={{ label: "See All Soldering Iron Picks", href: "/soldering-irons/best-soldering-irons" }}
        secondaryCta={{ label: "Compare Side by Side", href: "#full-comparison" }}
        stats={[
          { value: `${picks.length}`, label: "Compared" },
          { value: "100%", label: "Spec-Verified" },
          { value: "$0", label: "Sponsored" },
        ]}
      />

      <section className="mx-auto max-w-4xl px-6 pt-12 space-y-10">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">What electronics work asks of an iron</h2>
          <p className="text-muted leading-7">
            A typical circuit board throws two opposite jobs at the same tool. Through-hole headers, terminal blocks and
            pads tied to a copper pour soak up heat, so the iron needs reserve power and a fast control loop to keep the
            tip at its setpoint. A few centimeters away sit 0603 resistors, SOT-23 transistors and fine-pitch ICs that
            want a small tip, a low setting and a steady hand, and some of those chips are sensitive to static. Our
            walkthroughs on{" "}
            <Link href="/soldering-irons/how-to-solder-a-wire-to-a-small-pcb-through-hole" className={linkClass}>
              soldering into a small through-hole
            </Link>{" "}
            and{" "}
            <Link href="/soldering-irons/how-to-solder-fine-pitch-smd-components" className={linkClass}>
              soldering fine-pitch SMD parts
            </Link>{" "}
            show how differently those joints behave.
          </p>
          <p className="text-muted leading-7">
            We ranked these ten on how well each covers both ends: published temperature stability, a tip family with
            the shapes you need, ESD safety, hot air for rework and value for the features. Hakko has discontinued the
            FX888D, so its successor, the FX-888DX, takes that slot; our FX888D Pick is marked unavailable. None of these
            ten has been through our hands-on testing, so the order rests on maker and listing specifications. If you are
            building a first kit for hobby projects, see{" "}
            <Link href="/soldering-irons/best-soldering-iron-for-diy-electronics" className={linkClass}>
              the best soldering iron for DIY electronics
            </Link>
            ; for every pick we cover, including irons for heavier work, see{" "}
            <Link href="/soldering-irons/best-soldering-irons" className={linkClass}>
              our main soldering iron roundup
            </Link>
            .
          </p>
        </div>

        <Callout title="Heat, fumes and static">
          Tips run at 300–480°C and stay hot for minutes after switch-off, so always return the iron to its stand and
          never leave a powered iron unattended. Flux smoke irritates the airways: work with extraction or ventilation.
          Unplug the board you are soldering, discharge any large capacitors first, and use a grounded mat or wrist strap
          with static-sensitive parts.
        </Callout>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">Quick comparison</h2>
          <DataTable
            head={["#", "Iron", "Tip family", "Power", "Temperature range", "Best for"]}
            rows={comparisonRows}
            mono={[0]}
          />
          <p className="text-xs text-muted leading-5">
            Figures come from each maker&apos;s site or the official Amazon listing. Weller rates the WE1010NA station at
            85W with a 70W iron. YIHUA&apos;s own page lists the 939D+ (220V model) at 200–450°C, and X-Tronic&apos;s page
            also quotes 90–480°C for the 3020-XTS iron. The Liouhoum figures come from its listing alone.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">How the ten compare on paper</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Figure
              caption={
                <>
                  Iron power as published. The 862BD+ also has a 500W hot air gun. Miniware&apos;s listing gives
                  conflicting wattage for the TS101, so it is left out; both YIHUA station figures conflict with other
                  sources (see the table).
                </>
              }
            >
              <BarChart
                items={[
                  { label: "FNIRSI HS-02A", value: 100, display: "100W", highlight: true },
                  { label: "Pinecil V2", value: 88, display: "88W at 24V" },
                  { label: "Liouhoum 80W", value: 80, display: "80W (listing)" },
                  { label: "YIHUA 862BD+", value: 75, display: "75W iron" },
                  { label: "YIHUA 939D+", value: 75, display: "75W equiv. (listing)" },
                  { label: "Weller WE1010NA", value: 70, display: "70W" },
                  { label: "Hakko FX-888DX", value: 65, display: "65W" },
                  { label: "X-Tronic 3020-XTS", value: 60, display: "60W iron" },
                  { label: "YIHUA 926 III", value: 60, display: "60W (listing)" },
                ]}
              />
            </Figure>
            <Figure
              caption={
                <>
                  Maximum set temperature. Pine64 doesn&apos;t publish a range for the Pinecil V2, so it isn&apos;t
                  shown. The 939D+ figure is the US listing&apos;s.
                </>
              }
            >
              <BarChart
                items={[
                  { label: "Hakko FX-888DX", value: 480, display: "480°C", highlight: true },
                  { label: "YIHUA 862BD+", value: 480, display: "480°C", highlight: true },
                  { label: "YIHUA 939D+", value: 480, display: "480°C", highlight: true },
                  { label: "X-Tronic 3020-XTS", value: 480, display: "480°C", highlight: true },
                  { label: "YIHUA 926 III", value: 480, display: "480°C", highlight: true },
                  { label: "Liouhoum 80W", value: 480, display: "480°C", highlight: true },
                  { label: "Weller WE1010NA", value: 450, display: "450°C" },
                  { label: "FNIRSI HS-02A", value: 450, display: "450°C" },
                  { label: "Miniware TS101", value: 400, display: "400°C" },
                ]}
              />
            </Figure>
          </div>
          <Figure
            caption={
              <>
                Lowest set temperature. A low floor helps with heat-sensitive parts, plastic connector housings and
                low-melt alloys.
              </>
            }
          >
            <BarChart
              items={[
                { label: "Hakko FX-888DX", value: 50, display: "50°C", highlight: true },
                { label: "Miniware TS101", value: 50, display: "50°C", highlight: true },
                { label: "YIHUA 926 III", value: 90, display: "90°C" },
                { label: "Weller WE1010NA", value: 100, display: "100°C" },
                { label: "FNIRSI HS-02A", value: 100, display: "100°C" },
                { label: "Liouhoum 80W", value: 180, display: "180°C" },
                { label: "YIHUA 862BD+", value: 200, display: "200°C (iron)" },
                { label: "YIHUA 939D+", value: 200, display: "200°C" },
                { label: "X-Tronic 3020-XTS", value: 200, display: "200°C" },
              ]}
            />
          </Figure>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">What to look for in an electronics soldering iron</h2>
          <InfoCards items={lookFor} />
          <KeyIdea title="Stability beats the maximum">
            Every iron here goes past 400°C, which is hotter than most board work needs. What separates them is how
            closely the tip holds its setting when a pad pulls heat away, and whether you can fit the right tip. Our
            guides to{" "}
            <Link href="/soldering-irons/soldering-iron-temperature-by-metal" className={linkClass}>
              choosing a soldering temperature
            </Link>
            ,{" "}
            <Link href="/soldering-irons/soldering-iron-tip-types" className={linkClass}>
              soldering iron tip types
            </Link>{" "}
            and{" "}
            <Link href="/soldering-irons/soldering-iron-tip-care" className={linkClass}>
              tip care
            </Link>{" "}
            cover both. When a part has to come off again, see{" "}
            <Link href="/soldering-irons/how-to-remove-solder-from-circuit-board" className={linkClass}>
              removing solder from a circuit board
            </Link>
            , and for head-to-heads read{" "}
            <Link href="/soldering-irons/weller-we1010-vs-hakko-fx-888dx" className={linkClass}>
              Weller WE1010 vs Hakko FX-888DX
            </Link>{" "}
            and{" "}
            <Link href="/soldering-irons/pinecil-v2-vs-ts101-soldering-iron" className={linkClass}>
              Pinecil V2 vs TS101
            </Link>
            .
          </KeyIdea>
        </div>
      </section>

      <ReviewArticle
        picks={picks}
        faqs={faqs}
        howWeChose="We ranked these ten for mixed through-hole and SMD board work: published temperature stability and control first, then tip family and availability, ESD safety, hot air for rework and features for the money. Every figure comes from the maker's site or the official Amazon listing, and where they conflict we say so; this is desk research, and none of these ten has been hands-on tested by us."
        fitNotes={fitNotes}
        advice={advice}
      />
      <ContentLinks category="soldering-irons" current="/soldering-irons/best-soldering-irons-for-electronics" />
    </>
  );
}
