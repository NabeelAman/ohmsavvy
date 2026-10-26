import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { CategoryHero } from "@/components/CategoryHero";
import { ReviewArticle } from "@/components/ReviewArticle";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { getAllPicks } from "@/lib/catalog";
import { guidePicks } from "@/lib/content";

// Pinecil V2 28 g with tip; rated 12–24V input, 88W at 24V per
// https://pine64.org/documentation/Pinecil/Further_information/Specifications/
// Weller WE1010NA 100–450°C, 70W iron, standby and auto setback per
// https://www.weller-tools.com/us/en/industrial-soldering/products/soldering-stations/we1010na-120v

export const metadata = buildMetadata({
  title: "Best Soldering Irons for Automotive Electronics",
  description:
    "The 10 best soldering irons for automotive electronics, ranked on power for thick wire, USB-C and DC input at the car, plus ESD-safe stations for modules.",
  path: "/soldering-irons/best-soldering-iron-for-automotive-electronics",
});

const PATH = "/soldering-irons/best-soldering-iron-for-automotive-electronics";
const all = getAllPicks("soldering-irons");
const picks = guidePicks(PATH)
  .map((n) => all.find((p) => p.name === n)!)
  .filter(Boolean);

const linkClass = "text-accent hover:underline";

const comparisonRows: string[][] = [
  ["1", "Pinecil V2", "USB-C PD or DC, rated 12–24V", "Up to 88W at 24V", "Not stated", "Harness repairs in the footwell or engine bay"],
  ["2", "FNIRSI HS-02A", "USB-C PD/QC, 9–20V", "Up to 100W", "100–450°C", "Thicker wire on a portable iron"],
  ["3", "Hakko FX-601", "120V mains", "67W", "240–540°C", "Battery cables, ring terminals and grounds"],
  ["4", "Miniware TS101", "USB-C PD 9–20V or DC 9–24V", "Conflicting figures", "50–400°C", "A compact iron for the glovebox or tool roll"],
  ["5", "Hakko FX-888DX", "120V mains station", "65W iron, 100W station", "50–480°C", "Bench repairs on clusters and control modules"],
  ["6", "Weller WE1010NA", "120V mains station", "70W iron", "100–450°C", "Shop benches handling customer modules"],
  ["7", "YIHUA 862BD+", "110–127V mains station", "75W iron + 500W hot air", "200–480°C iron", "Heat-shrink and SMD rework on modules"],
  ["8", "X-Tronic 3020-XTS", "110V mains station", "60W iron, 75W station", "200–480°C", "A budget ESD-safe garage bench"],
  ["9", "Liouhoum 80W Soldering Iron Kit", "110–120V mains", "80W (listing)", "180–480°C (listing)", "Occasional splices near an outlet"],
  ["10", "Q-MING 60W Kit", "Not in our data", "60W", "200–450°C", "A spare iron for simple wire joins"],
];

const autoJobs: string[][] = [
  ["Sensor or signal wire splice", "Small-gauge stranded wire", "Pen iron, small chisel", "Heat-shrink with adhesive lining over the joint"],
  ["Lighting or accessory power feed", "Mid-gauge power wire", "Pen iron with reserve power, larger chisel", "Support the wire so the joint doesn't flex"],
  ["Ring terminal or ground strap", "Heavy cable and lugs", "High-power mains iron, large tip", "Crimp first where a crimp is specified; solder only if allowed"],
  ["Instrument cluster or control module", "Board-level joints", "ESD-safe bench station", "Disconnect the battery and remove the module first"],
  ["Connector pin repair", "Fine pins in plastic housings", "Low setting and a fine tip", "Keep heat brief so the housing doesn't deform"],
];

const lookFor = [
  {
    label: "Power where the car is",
    desc: "Many repairs happen in the footwell or under the hood. USB-C PD and DC inputs let an iron run from a power bank, a laptop charger or a suitable DC source.",
  },
  {
    label: "Reserve for thick copper",
    desc: "Power and ground wiring soaks up heat. A higher-power iron with a large tip makes a full joint before the insulation starts to melt back.",
  },
  {
    label: "A tip you can steer in tight spaces",
    desc: "Short tips and slim handles reach connectors behind trim panels; a knife or chisel tip suits wire splices.",
  },
  {
    label: "ESD safety for modules",
    desc: "Body controllers, clusters and infotainment boards use the same static-sensitive chips as any electronics. Bench repairs deserve an ESD-safe station.",
  },
  {
    label: "Sleep and a secure stand",
    desc: "A hot iron balanced on a seat or carpet is a fire risk. Sleep modes and a proper holder matter more in a car than at a desk.",
  },
  {
    label: "Hot air for heat-shrink",
    desc: "Sealed heat-shrink keeps moisture out of splices. A hot air gun shrinks it evenly; a lighter scorches it.",
  },
];

const faqs = [
  {
    question: "Can I run a soldering iron from a car's 12V socket?",
    answer:
      "Some irons accept a 12V-range input. Pine64 rates the Pinecil V2 for 12–24V and Miniware lists 9–24V DC for the TS101, while the FNIRSI HS-02A takes USB-C PD or QC from 9–20V, which a capable car USB-C charger can supply. Expect less power than from a 24V or 20V source, check the socket's fuse rating, and don't run the iron with the engine off for long.",
  },
  {
    question: "Is solder or crimp better for automotive wiring repairs?",
    answer:
      "Both are used. A quality crimp with the correct tool is standard for terminals and is what many service manuals specify, because solder can stiffen the wire and crack under vibration right where it leaves the joint. Soldered splices are common for in-line repairs when supported and sealed. Follow the vehicle maker's repair procedure where one exists, and always add strain relief and adhesive-lined heat-shrink.",
  },
  {
    question: "What size wire can a portable soldering iron handle in a car?",
    answer:
      "Signal and sensor wiring is easy for any pen iron here. Lighting and accessory feeds are fine on a pen with reserve power, such as the FNIRSI HS-02A at up to 100W or the Pinecil V2 on a 24V supply, with a large chisel tip. Battery cables, ring terminals and ground straps need a high-power mains iron such as the Hakko FX-601, or a crimp instead.",
  },
  {
    question: "Do I need to disconnect the car battery before soldering?",
    answer:
      "For anything beyond a simple, isolated wire splice, yes. Disconnect the negative terminal first, then wait as the service manual directs, especially near airbag circuits, which can need several minutes to discharge. Removing a control module to solder it at the bench is safer than working on it in place. Check whether the vehicle needs radio codes or relearn procedures after reconnection.",
  },
  {
    question: "What solder should I use for car electrical repairs?",
    answer:
      "Rosin-core electronics solder is the usual choice for wiring and modules. Never use acid-core plumbing solder, because its flux corrodes copper over time. A diameter around 0.8–1.0 mm suits most wire splices, and thinner wire suits board work on modules. Clean off flux residue where moisture can reach, and seal every splice with adhesive-lined heat-shrink to keep water out.",
  },
];

const fitNotes: Record<string, string> = {
  "Pinecil V2":
    "It goes where car repairs happen: a 28 g iron rated for 12–24V input that runs from USB-C PD chargers and power banks, with up to 88W on a 24V supply and about 12 seconds to working temperature on 20V or more. That makes it ideal for splices behind dashboards and in engine bays. No stand comes in the box, and Pine64 publishes no temperature range or ESD rating.",
  "FNIRSI HS-02A":
    "With up to 100W from USB-C PD or QC at 9–20V, it has the most reserve of the portable irons for lighting and accessory feeds, and its six-tip kit (K, KU, JS, I, C2, B) includes knife shapes that suit wire work. A 100W charger, sleep, auto power-off and three presets help. It has no battery, so it always needs a supply, and ESD safety isn't stated.",
  "Hakko FX-601":
    "For battery cables, ring terminals and ground straps, its 67W heater, closed-loop control and 240–540°C range give the most heat of any pick here, and the lock key stops the setting being knocked in a busy garage. It needs a 120V outlet and has no display, and its 240°C minimum is too hot for module electronics.",
  "Miniware TS101":
    "Its DC input accepts 9–24V as well as USB-C PD, which gives the most flexible power options for working at the car, and motion-sensing sleep helps when the iron gets set down in awkward places. It takes TS100 tips and comes with a 65W adapter. The 400°C ceiling and Miniware's conflicting wattage figures limit it on heavy wire.",
  "Hakko FX-888DX":
    "When a cluster, body controller or radio comes out of the car for board-level repair, this ESD-safe station with ±1°C idle stability, a 50–480°C range and T18 tips is the best place to work on it. It is a mains bench tool with a 1.2 kg station, so it does nothing for repairs in the vehicle itself.",
  "Weller WE1010NA":
    "An ESD-safe 70W station with standby, auto setback and a password lock suits a shop bench that handles customers' modules, keeping settings consistent between technicians. Weller quotes ±6°C and a 450°C ceiling, and it is bench-only, so it ranks behind the Hakko for module work.",
  "YIHUA 862BD+":
    "The 500W hot air gun shrinks sealed heat-shrink evenly and handles SMD rework on modules, while the 75W iron covers bench soldering, both with their own readouts. It is a mains bench unit, the US listing is the 110–127V version, and it is more equipment than a garage that only splices wires needs.",
  "X-Tronic 3020-XTS":
    "An ESD-safe PID station with ±2°C static stability, a 10-minute sleep with auto cool-down and a 3-year warranty makes a sensible budget bench for occasional module repairs. Its 60W iron is modest for heavy cable, it runs on 110V only and it stays on the bench.",
  "Liouhoum 80W Soldering Iron Kit":
    "An 80W plug-in pen with a digital 180–480°C readout and a 5-minute auto sleep handles occasional splices if you can run an extension cord to the car. Its specs come only from the listing, there's no ESD rating and the tip series isn't named, so it isn't for module work.",
  "Q-MING 60W Kit":
    "A basic 60W dial iron from 200–450°C with five tips and a stand, heating in about 15 seconds. It is enough for an occasional signal-wire splice. There's no digital readout and the build suits light use, so it ranks last for regular automotive work.",
};

const advice = [
  {
    heading: "Split the job between a portable and a bench tool",
    body:
      "Automotive electronics covers two very different jobs. Wire splices and connector repairs happen in the car, where a USB-C or DC iron is far more practical than a station on an extension cord. Board-level repairs on clusters and modules are best done on a bench with an ESD-safe station. Many owners end up with a pen iron in the car kit and a station at home.",
  },
  {
    heading: "Check the power source as carefully as the iron",
    body:
      "A USB-C iron only delivers its rated power from a supply that can provide it: the Pinecil V2's 88W figure needs 24V, and the HS-02A's 100W needs a 100W PD or QC charger. A small phone charger or a car socket at 12V will run them at much lower power. Bring the right supply, or plan heavy joints for the bench.",
  },
  {
    heading: "Seal and support every splice",
    body:
      "Vehicle wiring lives with vibration, heat cycles and moisture. Stagger splices so the harness doesn't bulge, use adhesive-lined heat-shrink over each joint, and secure the repaired section so it can't flex at the solder line. Those steps matter more for long-term reliability than which iron made the joint.",
  },
  {
    heading: "Respect airbags, fuel and the battery",
    body:
      "Never probe or solder airbag wiring (usually in yellow conduit) without following the service procedure. Keep the iron well away from fuel lines and vapors, and disconnect the battery before working on anything beyond a simple isolated wire. If a fault involves airbags, hybrid high-voltage cables (often orange) or the fuel system, leave it to a qualified technician.",
  },
];

export default function BestSolderingIronForAutomotiveElectronicsPage() {
  return (
    <>
      <CategoryHero
        category="soldering"
        label="Soldering Irons · For Automotive Electronics"
        heading="Best Soldering Iron for Automotive Electronics: Top 10 Picks"
        tagline="Ranked on power, portability and module safety."
        description="Our top 10 soldering irons for automotive electronics, ranked on how well each handles thick power wiring, whether it can run from USB-C or DC power at the vehicle, and whether it is safe for board repairs on clusters and control modules."
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
          <h2 className="text-2xl sm:text-3xl font-semibold">The best iron for working on cars</h2>
          <p className="text-muted leading-7">
            The best soldering iron for automotive electronics is the Pinecil V2, because it is a 28 g iron rated for
            12–24V input that runs from USB-C PD chargers and power banks, reaching up to 88W on 24V, so you can splice
            harnesses right where the fault is. For heavier power wiring on a portable, the FNIRSI HS-02A draws up to 100W
            from USB-C, and for battery cables and ground lugs the 67W, 540°C Hakko FX-601 has the most heat. When a module
            comes out for board repair, an ESD-safe station like the Hakko FX-888DX is the right tool.
          </p>
          <p className="text-muted leading-7">
            Car electrical work splits into jobs at the vehicle and jobs at the bench. In the car you need an iron you can
            power without a wall outlet, that fits behind trim and under the dash, and that has enough reserve for power
            wiring. On the bench you need temperature control and static protection for instrument clusters, body
            controllers and radios. We ranked these ten on power for thick copper, portability and power-source options,
            and suitability for module repair. To find the fault before you heat anything, our{" "}
            <Link href="/multimeters/best-multimeter-for-automotive" className={linkClass}>
              best multimeters for automotive diagnostics
            </Link>{" "}
            and{" "}
            <Link href="/multimeters/how-to-find-a-short-circuit-in-a-car-with-a-multimeter" className={linkClass}>
              finding a short circuit in a car
            </Link>{" "}
            are the place to start, and the{" "}
            <Link href="/soldering-irons/pinecil-v2-review" className={linkClass}>
              Pinecil V2 review
            </Link>{" "}
            covers our top pick in depth.
          </p>
        </div>

        <Callout title="Batteries, airbags and fuel">
          A car battery can deliver hundreds of amps into a short, enough to weld a wrench or start a fire. Disconnect
          the negative terminal before working on anything other than a simple, isolated wire, and follow the service
          manual near airbag circuits, which may need minutes to discharge. Keep the iron away from fuel lines and
          vapors, park it in a holder rather than on upholstery, and leave hybrid or EV high-voltage systems to trained
          technicians. If you smell fuel or see smoke, stop, move away and call 911.
        </Callout>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">Quick comparison</h2>
          <DataTable
            head={["#", "Iron", "Power source", "Power", "Temperature range", "Best for"]}
            rows={comparisonRows}
            mono={[0]}
          />
          <p className="text-xs text-muted leading-5">
            Figures come from each maker&apos;s site or the official Amazon listing. Miniware&apos;s listing gives
            conflicting wattage for the TS101, so we don&apos;t quote one. The Liouhoum and Q-MING details come from their
            listings. None of these makers publishes output power at a 12V input.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">Power and heat ceiling compared</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Figure
              caption={
                <>
                  Highest heater power as published. The Pinecil V2 needs a 24V supply for 88W (about 60W from 20V USB-C
                  PD). The 862BD+ figure is its iron; its hot air gun is a separate 500W.
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
                  { label: "Hakko FX-601", value: 67, display: "67W" },
                  { label: "Hakko FX-888DX", value: 65, display: "65W" },
                  { label: "X-Tronic 3020-XTS", value: 60, display: "60W iron" },
                  { label: "Q-MING 60W Kit", value: 60, display: "60W" },
                ]}
              />
            </Figure>
            <Figure
              caption={
                <>
                  Maximum set temperature in °C. Heavy cable and lugs benefit from a high ceiling paired with a large
                  tip. Pine64 publishes no range for the Pinecil V2.
                </>
              }
            >
              <BarChart
                items={[
                  { label: "Hakko FX-601", value: 540, display: "540°C", highlight: true },
                  { label: "Hakko FX-888DX", value: 480, display: "480°C" },
                  { label: "YIHUA 862BD+", value: 480, display: "480°C" },
                  { label: "X-Tronic 3020-XTS", value: 480, display: "480°C" },
                  { label: "Liouhoum 80W", value: 480, display: "480°C" },
                  { label: "FNIRSI HS-02A", value: 450, display: "450°C" },
                  { label: "Weller WE1010NA", value: 450, display: "450°C" },
                  { label: "Q-MING 60W Kit", value: 450, display: "450°C" },
                  { label: "Miniware TS101", value: 400, display: "400°C" },
                ]}
              />
            </Figure>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">Common automotive soldering jobs</h2>
          <DataTable head={["Job", "What you are joining", "Suitable tool", "Do this too"]} rows={autoJobs} />
          <p className="text-xs text-muted leading-5">
            General guidance only. Where a vehicle maker specifies a crimp, a splice kit or a replacement harness, follow
            its repair procedure.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">What car electrical work asks of an iron</h2>
          <InfoCards items={lookFor} />
          <KeyIdea title="The joint fails where the wire flexes">
            A soldered splice is rigid, so vibration concentrates stress at the point where solder stops wicking into the
            strands. Keeping solder from running far up the wire, then supporting the joint with heat-shrink and a tie,
            matters more than the iron. Our guides on{" "}
            <Link href="/soldering-irons/how-to-solder-stranded-wire-without-solder-wicking-too-far" className={linkClass}>
              stopping solder wicking up stranded wire
            </Link>
            ,{" "}
            <Link href="/soldering-irons/how-to-solder-wires-without-overheating-insulation" className={linkClass}>
              soldering without melting insulation
            </Link>{" "}
            and{" "}
            <Link href="/soldering-irons/why-does-my-soldering-iron-fail-on-thick-wires" className={linkClass}>
              irons that struggle on thick wires
            </Link>{" "}
            cover the technique, and{" "}
            <Link href="/multimeters/how-to-test-a-car-ground-wire-with-a-multimeter" className={linkClass}>
              testing a car ground wire
            </Link>{" "}
            shows how to confirm the repair afterwards.
          </KeyIdea>
        </div>
      </section>

      <ReviewArticle
        picks={picks}
        faqs={faqs}
        howWeChose="We ranked these ten for car, truck and motorcycle electrical work: the ability to work at the vehicle without a wall outlet came first, then reserve power for thick wiring, a usable temperature range, ESD safety and stability for bench repairs on modules, and features such as sleep and secure holders. Every figure comes from the maker's site or the official Amazon listing; this is desk research, and none of these ten has been hands-on tested by us."
        fitNotes={fitNotes}
        advice={advice}
      />
      <ContentLinks category="soldering-irons" current="/soldering-irons/best-soldering-iron-for-automotive-electronics" />
    </>
  );
}
