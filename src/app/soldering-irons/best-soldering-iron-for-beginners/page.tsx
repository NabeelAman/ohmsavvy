import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { CategoryHero } from "@/components/CategoryHero";
import { ReviewArticle } from "@/components/ReviewArticle";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { getAllPicks } from "@/lib/catalog";
import { guidePicks } from "@/lib/content";

// Weller WE1010NA standby and auto setback, password lock per
// https://www.weller-tools.com/us/en/industrial-soldering/products/soldering-stations/we1010na-120v

export const metadata = buildMetadata({
  title: "10 Best Soldering Irons for Beginners (2026)",
  description:
    "The 10 best soldering irons for beginners, ranked on sleep modes, readable temperature control, complete starter kits and how forgiving each is to learn on.",
  path: "/soldering-irons/best-soldering-iron-for-beginners",
});

const PATH = "/soldering-irons/best-soldering-iron-for-beginners";
const all = getAllPicks("soldering-irons");
const picks = guidePicks(PATH)
  .map((n) => all.find((p) => p.name === n)!)
  .filter(Boolean);

const linkClass = "text-accent hover:underline";

const comparisonRows: string[][] = [
  ["1", "X-Tronic 3020-XTS", "LED, °C/°F", "10-min sleep, auto cool-down", "Yes", "Helping hands, silicone mat, 5 tips, solder"],
  ["2", "YIHUA 926 III", "LED, °C/°F", "5, 10 or 30 min sleep", "Not stated", "Helping hands, 6 tips, solder, sucker, tweezers"],
  ["3", "Hakko FX-888DX", "Digital, rotary dial", "Not stated", "Yes", "Five presets and a parameter lock"],
  ["4", "Liouhoum 80W Soldering Iron Kit", "LCD, °C/°F", "5-min auto sleep", "No rating", "5 tips, solder, flux, sponge, stand"],
  ["5", "Q-MING 60W Kit", "Dial only", "Not stated", "Not stated", "5 tips and a stand"],
  ["6", "YIHUA 939D+", "LED, °C/°F", "Not stated (US version)", "Yes", "Separate metal stand"],
  ["7", "FNIRSI HS-02A", "Color screen", "Sleep, auto-off, child lock", "Not stated", "6 tips, 100W charger, mini stand"],
  ["8", "Weller WE1010NA", "Digital", "Standby with auto setback", "Yes", "Password lock"],
  ["9", "Pinecil V2", "OLED", "Not in our data", "Not stated", "No stand by default"],
  ["10", "Miniware TS101", "OLED", "Motion-sensing sleep", "Not stated", "65W USB-C adapter"],
];

const lookFor = [
  {
    label: "A temperature you can read",
    desc: "A number on a screen lets you follow a guide's suggested setting and learn what works. A dial without markings turns that into guesswork.",
  },
  {
    label: "Sleep or auto-off",
    desc: "Beginners put the iron down and forget it. A sleep timer protects the tip, the bench and anyone who reaches past it.",
  },
  {
    label: "A heavy, stable holder",
    desc: "A light stand that tips over is a burn waiting to happen. Station holders and weighted stands keep the hot end pointing away from you.",
  },
  {
    label: "A complete kit",
    desc: "Solder, a cleaning sponge or brass wool and two tip shapes are the minimum. Helping hands and a silicone mat make first projects easier.",
  },
  {
    label: "Replaceable tips you can buy",
    desc: "First tips wear quickly while you learn. A named tip family such as 900M or T18 means replacements fit the first time.",
  },
  {
    label: "Simple controls",
    desc: "Two buttons or one knob is plenty. Menus, calibration and presets are welcome later, not on the first evening.",
  },
];

const faqs = [
  {
    question: "What temperature should a beginner set a soldering iron to?",
    answer:
      "Start around 330°C (about 625°F) for common leaded 60/40 or 63/37 solder and around 360°C (about 680°F) for lead-free. If solder takes more than two or three seconds to flow, turn it up 10–20°C rather than pressing harder. Too hot burns flux away before it can work, leaving dull, lumpy joints. Every iron in our top four shows its temperature, which makes this easy.",
  },
  {
    question: "Should a beginner buy a soldering station or a soldering pen?",
    answer:
      "A station is usually easier to learn on: the handpiece is lighter, the holder is sturdier and the controls sit on the bench where you can see them. Pen irons such as the Pinecil V2 and FNIRSI HS-02A are compact and quick, but they need a capable USB-C supply and come with lighter stands. If you have the bench space, start with a station.",
  },
  {
    question: "What solder should a beginner use?",
    answer:
      "A rosin-core solder around 0.6 to 0.8 mm thick suits most beginner kits and through-hole boards. Leaded 63/37 melts at a single point and is the most forgiving to learn with, while lead-free alloys need more heat and look duller when done right. If you use leaded solder, work with ventilation, keep food away from the bench and wash your hands afterwards.",
  },
  {
    question: "Why won't solder stick to my soldering iron tip?",
    answer:
      "The tip has usually oxidized, often because it sat hot without solder on it or was cleaned on a dry sponge. Turn the iron on, wipe the tip on brass wool, then immediately feed solder onto it so it turns shiny. Keep a small blob on the tip whenever it rests in the holder. If the tip stays black after that, it needs a tip tinner or replacing.",
  },
  {
    question: "Is a cheap soldering iron kit good enough to learn on?",
    answer:
      "It can be, if it has a readable temperature, a stable stand and tips you can replace. The Liouhoum 80W kit shows the actual temperature and sleeps after five minutes, which covers the essentials. Plain dial irons like the Q-MING 60W Kit work too, but you learn the right setting by feel. Stations such as the X-Tronic 3020-XTS add sleep, ESD safety and a warranty.",
  },
];

const fitNotes: Record<string, string> = {
  "X-Tronic 3020-XTS":
    "It does the most to keep a beginner out of trouble: an ESD-safe PID station holding ±2°C, a clear LED readout with a C/F switch, and a sleep that cools the tip after 10 minutes idle. The kit adds two helping hands, a silicone mat, five spare tips, a 50 g lead-free roll and a brass cleaner, and X-Tronic backs it with a 3-year warranty. It is 110V only.",
  "YIHUA 926 III":
    "A compact PID station from 90–480°C with the iron holder built into the body, an adjustable 5, 10 or 30 minute sleep and digital calibration. The kit includes two helping hands, six 900M tips, lead-free solder, a solder sucker and ESD-safe tweezers. YIHUA doesn't state ESD safety for the station itself, and its wattage figures disagree between the listing and its site.",
  "Hakko FX-888DX":
    "For a beginner who wants to buy once, this ESD-safe 100W station with a 65W iron, 50–480°C range, push-button rotary dial and five presets will still suit you years from now, and T18 tips are sold in every shape. The 1.2 kg station takes bench space and Hakko states no sleep mode, so build the habit of switching it off.",
  "Liouhoum 80W Soldering Iron Kit":
    "The lowest-cost way to get a digital temperature readout: an LCD from 180–480°C, temperature memory, calibration and a 5-minute auto sleep, with five tips, rosin-core solder, flux, a sponge and a basic stand in the kit. The specs come only from its listing, there's no ESD rating and the tip series isn't named.",
  "Q-MING 60W Kit":
    "A 60W pen iron with a dial from 200–450°C, about 15 seconds to heat, five tips and a stand in one box, which makes it a simple first purchase. The dial has no digital readout, so you set temperature by feel, and the build suits light, occasional use rather than a growing hobby.",
  "YIHUA 939D+":
    "An ESD-safe, transformer-based station with PID control, a °C/°F display, calibration and a separate metal stand, taking common 900M tips. It is a step up for a beginner who wants station-grade construction. Its power and maximum-temperature figures conflict between sources, and sleep isn't stated for the US version.",
  "FNIRSI HS-02A":
    "It is the only pick with a child lock, alongside sleep, auto power-off, three presets and a color screen, and the kit includes six tips, a 100W charger and a mini stand. It is very light at 61 g. It always needs a USB-C PD or QC supply, ESD safety isn't stated and the stand is small, so set up a stable spot for it.",
  "Weller WE1010NA":
    "Standby with auto setback and a password lock make it a safe station for a classroom or makerspace where several beginners share it, and it is ESD safe with a 70W iron. For one person learning at home it is more station than needed, and Weller quotes about 28 seconds to reach 350°C.",
  "Pinecil V2":
    "Small, fast to heat (about 12 seconds on a 20V-plus supply per Pine64) and able to run from a USB-C PD power bank. For a first iron, it has practical gaps: no stand by default, the need for a capable PD supply, and an Amazon listing that still describes the original Pinecil, so check you are getting the V2.",
  "Miniware TS101":
    "An OLED pen iron with a 50–400°C range, motion-sensing sleep, an overheat warning and a 65W USB-C adapter in the kit, taking TS100 tips. It suits a beginner who already has TS100 tips or needs a portable iron, but Miniware's listing gives conflicting wattage and the kit comes from a third-party seller.",
};

const advice = [
  {
    heading: "Start with the temperature you can see",
    body:
      "The most common beginner problems, from dull joints to lifted pads, come from the wrong temperature or too much time on the joint. An iron with a readout lets you follow a suggested setting and adjust in small steps. That is why the top four here all show a number, and why the dial-only Q-MING sits in the middle despite its complete kit.",
  },
  {
    heading: "Set up the bench before the first joint",
    body:
      "Put the holder on the side of your working hand, clear anything flammable from around it, and lay down a silicone mat if you have one. Tape the board or use helping hands so you have one hand for the iron and one for the solder. Run a small fan that pulls fumes away from your face, and keep a damp sponge or brass wool beside the holder.",
  },
  {
    heading: "Practice on something cheap",
    body:
      "A beginner practice kit or an old circuit board is a better first project than an expensive module. Solder twenty through-hole joints, compare them with photos of good joints, and only then move on to wires and small surface-mount parts. Tips last longer when you keep them tinned and turn the iron down between sessions.",
  },
  {
    heading: "Know when to upgrade",
    body:
      "If you find yourself soldering most weekends, want to work with surface-mount parts or keep fighting a tip that loses heat on larger joints, a station like the FX-888DX or WE1010NA is the next step. Many people keep their first kit as a backup or for messy jobs, so it isn't wasted.",
  },
];

export default function BestSolderingIronForBeginnersPage() {
  return (
    <>
      <CategoryHero
        category="soldering"
        label="Soldering Irons · For Beginners"
        heading="Best Soldering Iron for Beginners: Top 10 Easy, Safe Picks"
        tagline="Ranked on safety, simplicity and complete kits."
        description="Our top 10 soldering irons for beginners, ranked on safety features like sleep and sturdy holders, a temperature you can read, kits that include what a first project needs, and how much room each leaves to grow."
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
          <h2 className="text-2xl sm:text-3xl font-semibold">Our pick for someone soldering for the first time</h2>
          <p className="text-muted leading-7">
            The best soldering iron for beginners is the X-Tronic 3020-XTS, because it shows the exact temperature, sleeps
            and cools itself after 10 minutes, is ESD safe and comes with helping hands, a mat, spare tips and solder,
            all backed by a 3-year warranty. The YIHUA 926 III is a close second with a more compact kit and an adjustable
            sleep timer, and the Hakko FX-888DX is the choice if you would rather buy a station you will never need to
            replace. On a very small budget, the Liouhoum 80W kit still gives you a digital readout and auto sleep.
          </p>
          <p className="text-muted leading-7">
            Learning to solder is mostly about heat control and habits. A beginner needs to see what temperature the tip
            is at, needs the iron to look after itself when it is forgotten in the holder, and needs a kit that removes
            the guesswork from the first project. We ranked these ten on those three things, then on how far each will
            carry you as your skills grow. Two of our twelve verified irons are left out: the YIHUA 862BD+ adds hot air a
            beginner won&apos;t need yet, and the Hakko FX-601 has no display and a 240°C minimum. If you have never used
            an iron, read{" "}
            <Link href="/soldering-irons/how-to-use-a-soldering-iron" className={linkClass}>
              how to use a soldering iron
            </Link>{" "}
            first, and{" "}
            <Link href="/soldering-irons/soldering-iron-vs-soldering-station" className={linkClass}>
              soldering iron vs soldering station
            </Link>{" "}
            explains the difference between the two types on this list.
          </p>
        </div>

        <Callout title="Burns, fumes and lead">
          A soldering tip runs at well over 300°C and stays dangerously hot for several minutes after you switch it off.
          Always return it to its holder, never catch a falling iron, and keep it out of reach of children and pets. Work
          in a ventilated room with a fan or extractor pulling smoke away from your face, wear safety glasses against
          spitting flux, and wash your hands after handling leaded solder. Treat a serious burn with cool running water
          and seek medical help; call 911 for a fire.
        </Callout>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">Quick comparison</h2>
          <DataTable
            head={["#", "Iron", "Readout", "Sleep / idle safety", "ESD safe", "In the kit or notable"]}
            rows={comparisonRows}
            mono={[0]}
          />
          <p className="text-xs text-muted leading-5">
            Figures come from each maker&apos;s site or the official Amazon listing. The Liouhoum and Q-MING details come
            from their listings alone. &quot;Not stated&quot; means the maker doesn&apos;t publish it.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">Heat-up and idle protection compared</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Figure
              caption={
                <>
                  Published heat-up time in seconds. The makers measure differently: Weller to 350°C from 50°C, X-Tronic
                  from 200 to 480°C, Pine64 with a 20V-plus supply, and Liouhoum&apos;s and Q-MING&apos;s figures are
                  listing claims. Treat it as a rough guide.
                </>
              }
            >
              <BarChart
                items={[
                  { label: "Liouhoum 80W", value: 10, display: "10 s (listing)", highlight: true },
                  { label: "Pinecil V2", value: 12, display: "~12 s" },
                  { label: "Q-MING 60W Kit", value: 15, display: "~15 s" },
                  { label: "Weller WE1010NA", value: 28, display: "~28 s" },
                  { label: "X-Tronic 3020-XTS", value: 30, display: "under 30 s" },
                ]}
              />
            </Figure>
            <Figure
              caption={
                <>
                  Shortest automatic sleep time in minutes, where the maker states one. The 926 III can also be set to 10
                  or 30 minutes. The HS-02A, TS101 and WE1010NA sleep or set back too, but their timings aren&apos;t in
                  our data.
                </>
              }
            >
              <BarChart
                items={[
                  { label: "Liouhoum 80W", value: 5, display: "5 min", highlight: true },
                  { label: "YIHUA 926 III", value: 5, display: "5 min", highlight: true },
                  { label: "X-Tronic 3020-XTS", value: 10, display: "10 min + cool-down" },
                ]}
              />
            </Figure>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">What a first soldering iron should have</h2>
          <InfoCards items={lookFor} />
          <KeyIdea title="Heat the joint, not the solder">
            The habit that fixes most beginner joints is to touch the tip to both the pad and the component lead, wait a
            second, then feed solder into the joint rather than onto the tip. The solder should flow and wet both metals
            within two or three seconds. Our guides to{" "}
            <Link href="/soldering-irons/how-to-solder-wires-together" className={linkClass}>
              soldering wires together
            </Link>
            ,{" "}
            <Link href="/soldering-irons/how-to-prevent-solder-bridges" className={linkClass}>
              preventing solder bridges
            </Link>
            ,{" "}
            <Link href="/soldering-irons/60-40-vs-63-37-solder" className={linkClass}>
              60/40 vs 63/37 solder
            </Link>{" "}
            and{" "}
            <Link href="/soldering-irons/soldering-iron-tip-care" className={linkClass}>
              tip care
            </Link>{" "}
            build on it. Choosing between a pen and a starter kit? Compare{" "}
            <Link href="/soldering-irons/pinecil-v2-vs-q-ming-60w-kit" className={linkClass}>
              Pinecil V2 vs Q-MING 60W Kit
            </Link>{" "}
            or read our{" "}
            <Link href="/soldering-irons/q-ming-60w-soldering-iron-kit-review" className={linkClass}>
              Q-MING 60W kit review
            </Link>
            .
          </KeyIdea>
        </div>
      </section>

      <ReviewArticle
        picks={picks}
        faqs={faqs}
        howWeChose="We ranked these ten for someone who has never soldered before: safety features such as sleep, idle setback, sturdy holders and ESD safety first, then a temperature readout and simple controls, then what the kit includes and how far the iron can grow with you. Every figure comes from the maker's site or the official Amazon listing; this is desk research, and none of these ten has been hands-on tested by us."
        fitNotes={fitNotes}
        advice={advice}
      />
      <ContentLinks category="soldering-irons" current="/soldering-irons/best-soldering-iron-for-beginners" />
    </>
  );
}
