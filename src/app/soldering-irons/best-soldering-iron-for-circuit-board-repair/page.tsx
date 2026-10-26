import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { CategoryHero } from "@/components/CategoryHero";
import { ReviewArticle } from "@/components/ReviewArticle";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { getAllPicks } from "@/lib/catalog";
import { guidePicks } from "@/lib/content";

// Weller WE1010NA 100–450°C, ET tips, 70W iron, ±6°C stability, standby and auto setback, password lock per
// https://www.weller-tools.com/us/en/industrial-soldering/products/soldering-stations/we1010na-120v
// Pinecil V2 ST-B2 short tip fitted as default per https://pine64.org/documentation/Pinecil/Further_information/Specifications/

export const metadata = buildMetadata({
  title: "10 Best Soldering Irons for Circuit Board Repair",
  description:
    "The 10 best soldering irons for circuit board repair, ranked on hot air rework, temperature stability, ESD safety and fine tips for pads, traces and SMD parts.",
  path: "/soldering-irons/best-soldering-iron-for-circuit-board-repair",
});

const PATH = "/soldering-irons/best-soldering-iron-for-circuit-board-repair";
const all = getAllPicks("soldering-irons");
const picks = guidePicks(PATH)
  .map((n) => all.find((p) => p.name === n)!)
  .filter(Boolean);

const linkClass = "text-accent hover:underline";

const comparisonRows: string[][] = [
  ["1", "YIHUA 862BD+", "Iron + hot air", "Yes", "Not stated", "Boards where parts come off as often as they go on"],
  ["2", "Hakko FX-888DX", "Station", "Yes", "±1°C idle", "Fine pads and big connectors on one bench"],
  ["3", "Weller WE1010NA", "Station", "Yes", "±6°C", "Shared repair benches with locked settings"],
  ["4", "YIHUA 939D+", "Station", "Yes", "±1°C static (YIHUA 220V page)", "ESD-sensitive repairs on a modest budget"],
  ["5", "X-Tronic 3020-XTS", "Station", "Yes", "±2°C static", "Hobby repair benches that want a warranty"],
  ["6", "FNIRSI HS-02A", "USB-C pen", "Not stated", "Not stated", "Repairs on heavy ground planes away from a bench"],
  ["7", "Pinecil V2", "USB-C pen", "Not stated", "Not stated", "Field fixes with a short, precise tip"],
  ["8", "YIHUA 926 III", "Station", "Not stated (station)", "Not stated", "A first repair bench with calibration"],
  ["9", "Miniware TS101", "USB-C/DC pen", "Not stated", "Not stated", "Owners of TS100 tips"],
  ["10", "Liouhoum 80W Soldering Iron Kit", "Plug-in pen", "No rating", "Not stated", "Occasional single-joint fixes"],
];

const repairTasks: string[][] = [
  ["Replace an 0603 or 0805 resistor or capacitor", "Fine conical or 1–2 mm chisel tip, or hot air", "Flux on both pads; heat both ends together"],
  ["Remove a QFN, shielded or multi-pin IC", "Hot air with a nozzle sized to the part", "Shield nearby plastic parts; lift only when all pins flow"],
  ["Swap a through-hole capacitor on a ground plane", "High-power iron with a large chisel", "Add fresh solder first; a small tip will stall"],
  ["Repair a lifted pad or broken trace", "Fine tip at a low setting", "Scrape the solder mask, tin, then bridge with wire"],
  ["Replace a USB or DC jack with shield tabs", "Hot air plus a chisel tip", "Preheat the area; tabs sink a lot of heat"],
];

const lookFor = [
  {
    label: "Hot air for parts you can't reach with a tip",
    desc: "Bottom-terminated packages and shielded modules only release when every joint melts at once. An iron alone means wick, drag and risk to pads.",
  },
  {
    label: "A tip that holds its setting",
    desc: "Repair joints are often on old, oxidized boards with large copper areas. A tight control loop keeps the tip hot enough without cranking the setpoint.",
  },
  {
    label: "ESD-safe construction",
    desc: "A grounded tip protects the MOSFETs, CMOS chips and RF parts on the board you are trying to save, not just the one you are replacing.",
  },
  {
    label: "Small tips in the same family",
    desc: "Fine conical, bevel and knife shapes let you work between parts. Check that the series is sold in shapes you will use before you buy.",
  },
  {
    label: "A low minimum temperature",
    desc: "Plastic connector housings, flex cables and low-melt alloys need gentle heat. A station that goes down to 50–100°C gives you room.",
  },
  {
    label: "Locks, presets and calibration",
    desc: "Presets speed up switching between fine and heavy joints; a lock or password stops a shared bench drifting to an aggressive setting.",
  },
];

const faqs = [
  {
    question: "Do I need a hot air station to repair circuit boards?",
    answer:
      "Not for every repair. Through-hole parts, two-terminal SMD components and gull-wing ICs can all be handled with an iron, flux and wick. Hot air becomes close to essential for QFN and other bottom-terminated chips, metal shields, and connectors whose tabs pull heat away faster than a tip can supply it. If you repair phones, laptops or modern consumer boards regularly, a combined unit like the YIHUA 862BD+ pays for its bench space.",
  },
  {
    question: "What causes pads to lift during circuit board repair?",
    answer:
      "Usually too much heat for too long, or force on a part before every joint has melted. A tip that is too small makes you dwell, and a high setpoint softens the adhesive under the copper. Use a tip large enough to transfer heat quickly, add fresh flux and solder to old joints, and never pry a part off. Our pad repair guide covers fixing one that has already lifted.",
  },
  {
    question: "Is a USB-C soldering iron good enough for PCB repair?",
    answer:
      "For many jobs, yes. The Pinecil V2 and FNIRSI HS-02A reach working temperature quickly and the HS-02A can draw up to 100W from a suitable charger, which helps on ground pours. They lack the ESD rating, stand and steady thermal mass of a bench station, so they make an excellent second iron or travel kit, but a station remains the better daily tool for repair work.",
  },
  {
    question: "Should I use leaded or lead-free solder for board repairs?",
    answer:
      "Many repairers rework lead-free boards with a leaded alloy because it melts lower and flows more easily, which reduces heat stress on old pads. If the product must stay RoHS compliant, use a lead-free alloy and expect to run the tip roughly 20–30°C hotter. Either way, add fresh flux, clean residue afterwards, and wash your hands after handling leaded solder.",
  },
  {
    question: "How do I avoid damaging nearby components with hot air?",
    answer:
      "Use the smallest nozzle that covers the part, keep the airflow moderate so tiny passives don't blow away, and shield plastic connectors and electrolytic capacitors with heat-resistant tape or a scrap of metal. Preheat the area gradually rather than blasting at full temperature, and move the nozzle in small circles. Removing the part as soon as all joints melt keeps neighboring parts out of trouble.",
  },
];

const fitNotes: Record<string, string> = {
  "YIHUA 862BD+":
    "It tops a repair list because it is the only pick that can lift QFNs, shields and connectors cleanly: a 500W hot air gun at 100–480°C alongside a 75W iron at 200–480°C, each with its own LED readout, and ESD-safe per its listing. It is larger and more complex than a plain station, the US listing is the 110–127V version and the listing doesn't name the iron's tip series.",
  "Hakko FX-888DX":
    "If you only want one iron, this is it: ±1°C idle stability, a 50–480°C range, five presets, a parameter lock and the huge T18 tip catalog, on an ESD-safe 100W station with a 65W iron. It can also drive Hakko tweezers for two-terminal SMD removal. It has no hot air of its own and no stated sleep mode, which is why the YIHUA leads for repair.",
  "Weller WE1010NA":
    "An ESD-safe station with a 70W iron, ET tips, standby with auto setback and a password lock, which keeps a shared repair bench at sensible settings. Weller quotes ±6°C stability and a 450°C ceiling, both looser than the Hakko, and about 28 seconds to reach 350°C.",
  "YIHUA 939D+":
    "A transformer-based station with PID control, calibration, error detection and a detachable 907E iron; both the station and iron are ESD safe, and it takes common 900M tips. YIHUA's page for the 220V model quotes ±1°C static stability, but its power and maximum temperature figures conflict between sources, so we rank it below the Weller.",
  "X-Tronic 3020-XTS":
    "ESD safe with PID control, ±2°C static stability, a 10-minute sleep with auto cool-down and a 3-year warranty, plus five spare tips and helping hands in the kit. It runs on 110V only, and X-Tronic's pages give two different minimum temperatures.",
  "FNIRSI HS-02A":
    "Up to 100W from USB-C PD or QC gives it more reserve than any other pen iron for pads tied to ground pours, and it adds three presets, calibration and six tips with a 100W charger. ESD safety isn't stated and it always needs a supply, so it suits field repairs rather than delicate bench work on static-sensitive boards.",
  "Pinecil V2":
    "Pine64 rates it up to 88W at 24V and about 12 seconds to working temperature on a 20V-plus supply, and the short ST-B2 tip fitted as standard is precise for repair work. No stand comes in the box, it needs a capable PD supply, and Pine64 publishes neither an ESD rating nor a temperature range.",
  "YIHUA 926 III":
    "PID control from 90–480°C, digital calibration, an adjustable 5, 10 or 30 minute sleep and six 900M tips make it a capable first repair station. YIHUA doesn't state ESD safety for the station, and its wattage figures conflict: 60W on the listing versus 130W maximum and 18W rated on YIHUA's page.",
  "Miniware TS101":
    "Its 50–400°C range goes lower than most, which is gentle on plastic housings and flex cables, and TS100 tips fit. Motion-sensing sleep and a 65W adapter in the box help. The 400°C ceiling is the lowest here and Miniware's listing gives conflicting wattage, so we can't credit it with much reserve for heavy joints.",
  "Liouhoum 80W Soldering Iron Kit":
    "A digital 180–480°C readout, calibration and 5-minute auto sleep make it usable for the odd resoldered joint. It has no ESD rating, no named tip series and specs that come only from its listing, so it is the least suited of the ten to repairing valuable or static-sensitive boards.",
};

const advice = [
  {
    heading: "Buy for removal, not just soldering",
    body:
      "New builds mostly add solder; repairs mostly take it away. That shifts the priorities toward hot air, a tip large enough to melt old joints quickly and tools like wick and a solder sucker. If you already own a good iron, adding hot air may do more for your repair work than upgrading the iron itself.",
  },
  {
    heading: "Protect the board you are saving",
    body:
      "A repair is only a success if everything else on the board survives. Use an ESD-safe station or a grounded mat and wrist strap, keep the setpoint as low as still flows solder in a couple of seconds, and shield plastic parts from hot air. Pads that lift during a repair are usually the result of dwell time, not a weak iron.",
  },
  {
    heading: "Keep at least three tip shapes on hand",
    body:
      "A fine conical tip for tight spots, a 2 mm chisel for most joints and a larger chisel or bevel for connectors and ground pads cover nearly every repair. Tips from the T18, ET, 900M and TS100 families are widely sold. Swapping tips takes seconds; overheating a pad with the wrong one can't be undone.",
  },
  {
    heading: "Clean up after every repair",
    body:
      "Flux residue left around a repaired joint can attract moisture and cause leakage on high-impedance circuits. Clean with isopropyl alcohol and a brush, inspect under magnification for bridges and cold joints, and check continuity on any trace you repaired before powering the board again.",
  },
];

export default function BestSolderingIronForCircuitBoardRepairPage() {
  return (
    <>
      <CategoryHero
        category="soldering"
        label="Soldering Irons · For Circuit Board Repair"
        heading="Best Soldering Iron for Circuit Board Repair: Top 10 Ranked"
        tagline="Ranked on rework, stability, ESD and tips."
        description="Our top 10 soldering irons and stations for circuit board repair, ranked on hot air rework, published temperature stability, ESD safety and tip choice for lifting parts, fixing pads and replacing connectors without damaging the board."
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
          <h2 className="text-2xl sm:text-3xl font-semibold">The best tool for board repair, up front</h2>
          <p className="text-muted leading-7">
            The best soldering iron for circuit board repair is the YIHUA 862BD+, because it pairs a temperature-controlled
            75W iron with a 500W hot air gun, so you can remove QFN chips, shielded modules and stubborn connectors as
            well as resolder joints. If you only want a single iron, the Hakko FX-888DX has the tightest published
            stability (±1°C idle) and the widest tip range here. The Weller WE1010NA suits shared benches that need
            locked settings, and the USB-C pens further down make good second irons for repairs away from the bench.
          </p>
          <p className="text-muted leading-7">
            Repair work is harder on a soldering tool than building a kit. You are usually removing parts, not just adding
            them, often from old boards with oxidized joints, lead-free solder and wide copper pours that drain heat. The
            board itself is the thing you want to save, so pad damage and static matter more than speed. We ranked these
            ten on hot air capability, how steadily they hold temperature, ESD safety and tip choice. For mixed building
            and repair, our{" "}
            <Link href="/soldering-irons/best-soldering-irons-for-electronics" className={linkClass}>
              best soldering irons for electronics
            </Link>{" "}
            weighs things differently. Our{" "}
            <Link href="/soldering-irons/yihua-862bd-plus-review" className={linkClass}>
              YIHUA 862BD+ review
            </Link>{" "}
            and{" "}
            <Link href="/soldering-irons/weller-we1010na-vs-yihua-862bd-plus" className={linkClass}>
              Weller WE1010NA vs YIHUA 862BD+
            </Link>{" "}
            compare the top picks directly.
          </p>
        </div>

        <Callout title="Heat, static and stored energy">
          Iron tips and hot air nozzles run at several hundred degrees and stay hot after switch-off, so park them in
          their holders and never leave a powered station unattended. Unplug the device, remove its battery and discharge
          large capacitors before you start; power supply and TV boards can hold a dangerous charge long after unplugging.
          Use extraction for flux fumes, and an ESD mat or wrist strap on sensitive boards. If a swollen or damaged lithium
          battery is involved, stop and take it to a qualified repair shop.
        </Callout>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">Quick comparison</h2>
          <DataTable
            head={["#", "Tool", "Type", "ESD safe", "Stated stability", "Best for"]}
            rows={comparisonRows}
            mono={[0]}
          />
          <p className="text-xs text-muted leading-5">
            Figures come from each maker&apos;s site or the official Amazon listing. &quot;Not stated&quot; means the maker
            doesn&apos;t publish it. The 939D+ stability figure is from YIHUA&apos;s page for the 220V model; the US
            version&apos;s listing doesn&apos;t give one.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">How tightly each station holds its setting</h2>
          <Figure
            caption={
              <>
                Published temperature stability in °C (smaller is tighter). Hakko quotes its figure at idle; X-Tronic and
                YIHUA quote static stability; YIHUA&apos;s is for the 220V 939D+. The other six don&apos;t publish a
                figure, so they aren&apos;t shown.
              </>
            }
          >
            <BarChart
              items={[
                { label: "Hakko FX-888DX", value: 1, display: "±1°C", highlight: true },
                { label: "YIHUA 939D+", value: 1, display: "±1°C", highlight: true },
                { label: "X-Tronic 3020-XTS", value: 2, display: "±2°C" },
                { label: "Weller WE1010NA", value: 6, display: "±6°C" },
              ]}
            />
          </Figure>
          <Figure
            caption={
              <>
                Highest power each tool can put into a joint. The 862BD+ figure is its iron; its separate hot air gun is
                rated 500W. Miniware&apos;s and YIHUA&apos;s figures conflict between sources, so the TS101, 939D+ and
                926 III are left out.
              </>
            }
          >
            <BarChart
              items={[
                { label: "FNIRSI HS-02A", value: 100, display: "100W", highlight: true },
                { label: "Pinecil V2", value: 88, display: "88W at 24V" },
                { label: "Liouhoum 80W", value: 80, display: "80W (listing)" },
                { label: "YIHUA 862BD+", value: 75, display: "75W iron" },
                { label: "Weller WE1010NA", value: 70, display: "70W iron" },
                { label: "Hakko FX-888DX", value: 65, display: "65W" },
                { label: "X-Tronic 3020-XTS", value: 60, display: "60W iron" },
              ]}
            />
          </Figure>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">Matching the tool to the repair</h2>
          <DataTable head={["Repair", "Tool and tip", "Technique note"]} rows={repairTasks} />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">What a repair bench needs</h2>
          <InfoCards items={lookFor} />
          <KeyIdea title="Most board damage comes from dwell time">
            A pad lifts or a trace peels when heat sits on it too long, not because the tip was hot. A larger tip at a
            moderate setting melts the joint quickly and gets out; a tiny tip turned up high lingers. Our guides on{" "}
            <Link href="/soldering-irons/how-to-repair-lifted-pcb-pads-after-desoldering" className={linkClass}>
              repairing lifted pads
            </Link>
            ,{" "}
            <Link href="/soldering-irons/how-to-repair-a-pcb-trace-using-solder-and-jumper-wire" className={linkClass}>
              fixing a broken trace with jumper wire
            </Link>
            ,{" "}
            <Link href="/soldering-irons/how-to-remove-solder-from-a-plated-through-hole" className={linkClass}>
              clearing a plated through-hole
            </Link>{" "}
            and{" "}
            <Link href="/soldering-irons/how-to-fix-a-cold-solder-joint-on-a-circuit-board" className={linkClass}>
              fixing a cold solder joint
            </Link>{" "}
            walk through the common repairs, and{" "}
            <Link href="/soldering-irons/how-to-solder-a-replacement-usb-connector-onto-a-circuit-board" className={linkClass}>
              replacing a USB connector
            </Link>{" "}
            shows where hot air earns its place.
          </KeyIdea>
        </div>
      </section>

      <ReviewArticle
        picks={picks}
        faqs={faqs}
        howWeChose="We ranked these ten for removing and replacing parts on existing boards: hot air capability first, then published temperature stability and control, ESD safety, tip shapes and availability, and features such as presets, locks, calibration and sleep. Every figure comes from the maker's site or the official Amazon listing, and conflicts are noted. This is desk research; none of these ten has been hands-on tested by us."
        fitNotes={fitNotes}
        advice={advice}
      />
      <ContentLinks category="soldering-irons" current="/soldering-irons/best-soldering-iron-for-circuit-board-repair" />
    </>
  );
}
