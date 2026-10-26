import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { CategoryHero } from "@/components/CategoryHero";
import { ReviewArticle } from "@/components/ReviewArticle";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { getAllPicks } from "@/lib/catalog";
import { guidePicks } from "@/lib/content";

// Pinecil V2 28 g with tip per https://pine64.org/documentation/Pinecil/Further_information/Specifications/
// Weller WE1010NA 100–450°C, ET tips, 70W iron per
// https://www.weller-tools.com/us/en/industrial-soldering/products/soldering-stations/we1010na-120v

export const metadata = buildMetadata({
  title: "10 Best Soldering Irons for DIY Electronics",
  description:
    "The 10 best soldering irons for DIY electronics projects, ranked on versatility across kits, wiring, LEDs and SMD modules, from bench stations to USB-C pens.",
  path: "/soldering-irons/best-soldering-iron-for-diy-electronics",
});

const PATH = "/soldering-irons/best-soldering-iron-for-diy-electronics";
const all = getAllPicks("soldering-irons");
const picks = guidePicks(PATH)
  .map((n) => all.find((p) => p.name === n)!)
  .filter(Boolean);

const linkClass = "text-accent hover:underline";

const comparisonRows: string[][] = [
  ["1", "Hakko FX-888DX", "Station", "50–480°C", "T18", "Every kind of hobby project on one bench"],
  ["2", "Pinecil V2", "USB-C pen", "Not stated by Pine64", "Pine64 short tips", "Makers who solder at the desk, the club and on the road"],
  ["3", "YIHUA 939D+", "Station", "200–480°C (listing)", "900M", "A sturdy ESD-safe bench for less"],
  ["4", "YIHUA 862BD+", "Iron + hot air", "200–480°C iron, 100–480°C air", "Not stated", "Projects with SMD modules and heat-shrink"],
  ["5", "FNIRSI HS-02A", "USB-C pen", "100–450°C", "HS-02A set", "Thick wires and connectors on a pen iron"],
  ["6", "X-Tronic 3020-XTS", "Station", "200–480°C", "Five spare tips in kit", "Kit builders who want a warranty"],
  ["7", "YIHUA 926 III", "Station", "90–480°C", "900M", "A compact desk station with helping hands"],
  ["8", "Weller WE1010NA", "Station", "100–450°C", "Weller ET", "Makerspaces and shared benches"],
  ["9", "Hakko FX-601", "Stationless iron", "240–540°C", "T19", "Battery packs, speaker wire and big terminals"],
  ["10", "Liouhoum 80W Soldering Iron Kit", "Plug-in pen", "180–480°C (listing)", "Not named", "Occasional projects on the smallest budget"],
];

const projectTypes: string[][] = [
  ["Arduino shields and sensor breakouts", "Header pins, through-hole", "A 1.5–2 mm chisel and steady temperature", "FX-888DX, 939D+, 926 III"],
  ["LED strips and lighting", "Wire to flat copper pads", "Enough power for wide pads; low dwell on flex", "FX-888DX, HS-02A, Pinecil V2"],
  ["Guitar pedals and audio kits", "Pots, jacks, lugs", "A chisel tip with reserve for metal lugs", "FX-888DX, X-Tronic 3020-XTS"],
  ["Drones, RC and battery packs", "Thick wire, large connectors", "High power and a large tip", "FX-601, HS-02A"],
  ["SMD modules and USB connectors", "Small pads, shield tabs", "Fine tip plus hot air for removal", "862BD+, FX-888DX"],
];

const lookFor = [
  {
    label: "Range from fine pins to fat wires",
    desc: "DIY work swings from 0.1-inch headers to 12 AWG battery leads. Reserve power and a big tip matter as much as a fine point.",
  },
  {
    label: "A tip system with real choice",
    desc: "Conical, chisel, bevel and knife shapes in one family let a single iron cover more projects. T18, 900M and ET tips are easy to find.",
  },
  {
    label: "Portability if you build away from home",
    desc: "A USB-C pen runs from a laptop charger or power bank at a makerspace, a workshop or on vacation.",
  },
  {
    label: "Hot air if you salvage or rework",
    desc: "Pulling parts from old boards, fitting SMD modules or shrinking tubing all go faster with a hot air gun on the bench.",
  },
  {
    label: "Readable temperature and presets",
    desc: "Switching between lead-free kits, leaded wiring and heat-sensitive plastics is easier with numbered settings you can recall.",
  },
  {
    label: "ESD safety for microcontrollers",
    desc: "Arduino, ESP32 and sensor boards carry static-sensitive chips. A grounded tip or a grounded mat protects them.",
  },
];

const faqs = [
  {
    question: "What wattage soldering iron do I need for DIY electronics?",
    answer:
      "Around 60–80W on the heater handles nearly all hobby projects, provided the iron is temperature-controlled. Header pins and small wires need little power; LED strip pads, guitar jack lugs and 12 AWG battery leads pull far more heat. A higher-power iron at the same set temperature recovers faster on those joints. The FX-601 and HS-02A in this list offer the most reserve for heavy work.",
  },
  {
    question: "Can I solder thick battery wires with an electronics soldering iron?",
    answer:
      "Often, if you fit the largest chisel tip you have and the iron has reserve power. A tiny conical tip on a low-power iron will sit on the joint for ages and still leave a cold, grainy result, which is a real risk on battery leads. For regular work on XT60 connectors or thick pack wiring, a high-power iron such as the Hakko FX-601 is the safer choice.",
  },
  {
    question: "Is the Pinecil V2 good enough as my only soldering iron?",
    answer:
      "For many hobbyists, yes. Pine64 rates it up to 88W at 24V, it heats in about 12 seconds on a suitable supply and it runs from USB-C PD. The catches are that no stand comes in the box, it needs a capable PD supply for full power, and Pine64 doesn't publish a temperature range or ESD rating. A bench station is more comfortable for long sessions.",
  },
  {
    question: "Do I need a fume extractor for hobby soldering?",
    answer:
      "Rosin flux smoke irritates the eyes and airways, and regular exposure is worth avoiding. A small fan that pulls smoke away from your face and toward an open window helps a lot; a filtered fume extractor with activated carbon is better for frequent sessions. Leaded solder doesn't vaporize at normal iron temperatures, so the main concern is flux smoke plus washing your hands afterwards.",
  },
  {
    question: "What is the difference between a soldering iron and a hot air station?",
    answer:
      "An iron heats one joint at a time through direct contact with the tip, which suits pins, wires and most surface-mount parts. A hot air station blows heated air over an area so several joints melt at once, which is how you remove multi-pin chips, salvage parts or shrink tubing. The YIHUA 862BD+ combines both in one unit for makers who need each.",
  },
];

const fitNotes: Record<string, string> = {
  "Hakko FX-888DX":
    "It earns first place for sheer range: a 50–480°C station with ±1°C idle stability, a 65W iron and the T18 tip catalog covers everything from header pins to LED strip pads, and the station can also drive Hakko's tweezers, solder gun and larger irons as projects grow. It is ESD safe with five presets. The trade-offs are a 1.2 kg station and no stated sleep mode.",
  "Pinecil V2":
    "The most versatile place to solder from: Pine64 rates it up to 88W at 24V, it weighs 28 g with its tip and it runs from USB-C PD chargers or power banks, so the same iron works at the desk, the makerspace or a friend's house. It needs a capable PD supply, there's no stand by default and Pine64 lists no temperature range or ESD rating.",
  "YIHUA 939D+":
    "A transformer-based, ESD-safe station with PID control, calibration, a detachable 907E iron, a metal stand and common 900M tips gives hobbyists solid bench hardware without stretching to a Hakko. The listing's power figures conflict (75W equivalent versus 120W) and YIHUA's 220V page quotes a lower maximum temperature, so read its headline numbers with care.",
  "YIHUA 862BD+":
    "Makers who salvage parts, fit SMD modules or shrink tubing get a 500W hot air gun alongside a 75W iron, with separate readouts, in one ESD-safe station. If your projects are all through-hole kits, the hot air side will gather dust and the unit takes more bench space than a plain station; the iron's tip series isn't named on the listing.",
  "FNIRSI HS-02A":
    "With up to 100W from USB-C, three presets and six tips, it is the pen iron for projects that include thick wires and big connectors as well as small pads, and the 100W charger is in the kit. It weighs 61 g. It always needs a PD or QC supply, ESD safety isn't stated and its tips differ from the HS-02B's.",
  "X-Tronic 3020-XTS":
    "A reliable kit-builder's station: ESD safe, PID control at ±2°C, sleep with auto cool-down after 10 minutes, and a box with helping hands, a silicone mat, five tips and lead-free solder, all under a 3-year warranty. It runs on 110V only and X-Tronic's pages disagree on the minimum temperature.",
  "YIHUA 926 III":
    "Its iron holder is built into a compact body, which suits a small desk, and it brings PID control from 90–480°C, calibration, an adjustable sleep and six 900M tips plus helping hands. YIHUA doesn't state ESD safety for the station, and the listing and maker disagree on its wattage.",
  "Weller WE1010NA":
    "An ESD-safe 70W station with Weller ET tips, standby with auto setback and a password lock, which is ideal for a makerspace where several people share one bench. For a single hobbyist, the Hakko offers a wider range and tighter published stability, and the Weller's 450°C ceiling is lower.",
  "Hakko FX-601":
    "A 67W mains iron with closed-loop control in the handle, a 240–540°C dial and a lock key, built for heavy wire, terminals and stained glass. That makes it the right partner iron for battery packs, speaker wiring and large connectors. It has no display and its 240°C minimum is too warm for delicate SMD parts, so it is a second iron for most makers.",
  "Liouhoum 80W Soldering Iron Kit":
    "An 80W plug-in pen with an LCD from 180–480°C, temperature memory and a 5-minute auto sleep, with solder, flux, five tips and a stand in the kit. It covers occasional projects. Its specs come only from the listing, there's no ESD rating and the tip series isn't named, so replacements are a guess.",
};

const advice = [
  {
    heading: "Plan for the heaviest joint in your hobby",
    body:
      "Most DIY irons are chosen for fine work and then struggle the first time you solder a battery lead or a speaker terminal. List the biggest joint you expect, whether that's a 12 AWG wire, a jack lug or a ground pad on an LED strip, and make sure your iron has the power and a large enough tip for it. A second, heavier iron is often cheaper than overbuying one.",
  },
  {
    heading: "Think about where you will solder",
    body:
      "A station is the most comfortable tool for long sessions at a fixed desk. If you build at a makerspace, in a garage or while traveling, a USB-C pen such as the Pinecil V2 or FNIRSI HS-02A goes where you go. Plenty of makers end up with one of each, using the pen as the portable or backup iron.",
  },
  {
    heading: "Grow into hot air rather than starting with it",
    body:
      "Hot air is excellent for salvaging parts, fitting SMD modules and heat-shrink, but most first projects don't need it. If your interests move toward surface-mount boards, repairing gadgets or building your own PCBs, a combined unit like the 862BD+ or a separate hot air tool is the natural next step.",
  },
  {
    heading: "Keep consumables in the same family",
    body:
      "Buy spare tips from the iron's own family, a solder diameter that suits your work (0.6–0.8 mm covers most hobby boards) and a flux pen for SMD and rework. A brass tip cleaner and tip tinner keep tips alive longer. Stocking the right consumables does more for joint quality than a pricier iron.",
  },
];

export default function BestSolderingIronForDiyElectronicsPage() {
  return (
    <>
      <CategoryHero
        category="soldering"
        label="Soldering Irons · For DIY Electronics Projects"
        heading="Best Soldering Iron for DIY Electronics Projects: Top 10 for Makers"
        tagline="Ranked on versatility, tips, power and portability."
        description="Our top 10 soldering irons for DIY electronics, ranked on how well each handles the full spread of hobby projects, from Arduino headers and LED strips to battery wiring and SMD modules, at the desk or on the move."
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
          <h2 className="text-2xl sm:text-3xl font-semibold">The best all-round iron for makers</h2>
          <p className="text-muted leading-7">
            The best soldering iron for DIY electronics projects is the Hakko FX-888DX, because its 50–480°C range, ±1°C
            idle stability and huge T18 tip catalog cover everything from Arduino headers to LED strip pads on one bench.
            If you build in more than one place, the Pinecil V2 is the most versatile second choice: a 28 g USB-C iron
            that runs from a laptop charger or power bank. Makers who salvage parts or use SMD modules should look at the
            YIHUA 862BD+, which adds hot air, and the Hakko FX-601 is the partner iron for battery packs and thick wire.
          </p>
          <p className="text-muted leading-7">
            DIY electronics is defined by variety. One weekend it is a sensor breakout with fine header pins; the next it
            is a drone battery lead, an LED strip or a guitar pedal full of metal lugs. Rather than ranking for one kind
            of joint, we ranked these ten on how much of that spread each can handle well: temperature range and control,
            tip choice, reserve power for heavy joints, portability and whether it grows with you into hot air and SMD.
            For a narrower focus on electronics boards, see our{" "}
            <Link href="/soldering-irons/best-soldering-irons-for-electronics" className={linkClass}>
              best soldering irons for electronics
            </Link>
            , and our{" "}
            <Link href="/soldering-irons/pinecil-v2-review" className={linkClass}>
              Pinecil V2 review
            </Link>{" "}
            and{" "}
            <Link href="/soldering-irons/pinecil-v2-vs-ts101-soldering-iron" className={linkClass}>
              Pinecil V2 vs TS101
            </Link>{" "}
            look closely at the portable option.
          </p>
        </div>

        <Callout title="Heat, fumes and battery packs">
          Tips run at 300–540°C and stay hot after switch-off, so always use the holder and unplug the iron when you
          leave the bench. Work with ventilation or extraction for flux smoke and wash your hands after handling leaded
          solder. Lithium battery packs can short, vent or catch fire if overheated or bridged: disconnect them first,
          insulate exposed terminals and never solder directly onto a cell without proper training. If a pack swells,
          smokes or hisses, move away and call 911.
        </Callout>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">Quick comparison</h2>
          <DataTable
            head={["#", "Iron", "Type", "Temperature range", "Tip family", "Best for"]}
            rows={comparisonRows}
            mono={[0]}
          />
          <p className="text-xs text-muted leading-5">
            Figures come from each maker&apos;s site or the official Amazon listing. YIHUA&apos;s own page lists the
            939D+ (220V model) at 200–450°C. The Liouhoum figures come from its listing alone.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">Which iron suits which kind of project</h2>
          <DataTable head={["Project", "Typical joints", "What matters", "Strong picks here"]} rows={projectTypes} />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">Temperature ceiling and handheld weight</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Figure
              caption={
                <>
                  Highest set temperature in °C. A higher ceiling helps on large terminals and heavy wire; Pine64
                  doesn&apos;t publish a range for the Pinecil V2. The 939D+ figure is the US listing&apos;s.
                </>
              }
            >
              <BarChart
                items={[
                  { label: "Hakko FX-601", value: 540, display: "540°C", highlight: true },
                  { label: "Hakko FX-888DX", value: 480, display: "480°C" },
                  { label: "YIHUA 939D+", value: 480, display: "480°C" },
                  { label: "YIHUA 862BD+", value: 480, display: "480°C" },
                  { label: "X-Tronic 3020-XTS", value: 480, display: "480°C" },
                  { label: "YIHUA 926 III", value: 480, display: "480°C" },
                  { label: "Liouhoum 80W", value: 480, display: "480°C" },
                  { label: "Weller WE1010NA", value: 450, display: "450°C" },
                  { label: "FNIRSI HS-02A", value: 450, display: "450°C" },
                ]}
              />
            </Figure>
            <Figure
              caption={
                <>
                  Weight of the iron itself in grams, where the maker publishes it: the Pinecil V2 with its tip, the
                  HS-02A per FNIRSI and the FX-601 per Hakko. Station handpiece weights aren&apos;t in our data.
                </>
              }
            >
              <BarChart
                items={[
                  { label: "Pinecil V2", value: 28, display: "28 g", highlight: true },
                  { label: "FNIRSI HS-02A", value: 61, display: "61 g" },
                  { label: "Hakko FX-601", value: 68, display: "68 g" },
                ]}
              />
            </Figure>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">What a maker&apos;s soldering iron needs</h2>
          <InfoCards items={lookFor} />
          <KeyIdea title="Tip size does more than wattage">
            A 2 mm chisel tip transfers heat into a joint far faster than a needle point at the same setting, so you can
            run cooler and finish sooner. Most &quot;my iron is too weak&quot; problems disappear with a bigger tip. Our
            guides on{" "}
            <Link href="/soldering-irons/soldering-iron-tip-types" className={linkClass}>
              soldering iron tip types
            </Link>
            ,{" "}
            <Link href="/soldering-irons/why-does-my-soldering-iron-fail-on-thick-wires" className={linkClass}>
              an iron that fails on thick wires
            </Link>
            ,{" "}
            <Link href="/soldering-irons/how-to-solder-wires-to-battery-terminals" className={linkClass}>
              soldering wires to battery terminals
            </Link>{" "}
            and{" "}
            <Link href="/soldering-irons/how-to-solder-a-jst-connector-without-damaging-the-plastic-housing" className={linkClass}>
              soldering a JST connector without melting it
            </Link>{" "}
            cover the joints makers meet most. To check your finished project, see the{" "}
            <Link href="/multimeters/best-multimeters-for-arduino-and-circuit-board-testing" className={linkClass}>
              best multimeters for Arduino and board testing
            </Link>
            .
          </KeyIdea>
        </div>
      </section>

      <ReviewArticle
        picks={picks}
        faqs={faqs}
        howWeChose="We ranked these ten for hobbyists who build a wide mix of projects: how much of the range from fine header pins to heavy battery wiring each iron can handle, then temperature control and tip choice, portability, room to grow into hot air and SMD work, and ESD safety. Every figure comes from the maker's site or the official Amazon listing, and conflicts are noted; this is desk research, and none of these ten has been hands-on tested by us."
        fitNotes={fitNotes}
        advice={advice}
      />
      <ContentLinks category="soldering-irons" current="/soldering-irons/best-soldering-iron-for-diy-electronics" />
    </>
  );
}
