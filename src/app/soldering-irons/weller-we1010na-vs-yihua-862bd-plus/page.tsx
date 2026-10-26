// Specs per maker sources, checked 2026-10-26:
// - Weller WE1010NA 120V: https://www.weller-tools.com/us/en/industrial-soldering/products/soldering-stations/we1010na-120v
//   (85 W station, 70 W WEP 70 iron, 100-450 °C, 28 s from 50 to 350 °C, accuracy ±5 °C, stability ±6 °C, ESD safe, ET tips,
//   standby and auto setback, password-protected settings, 1.40 kg, 150 × 120 × 98 mm, includes PH 70 safety rest)
// - YIHUA 862BD+: Pick note, official Amazon listing B07RY5XWVG (75 W iron, 500 W hot air, 720 W total, 110-127 V US plug,
//   iron 200-480 °C, hot air 100-480 °C, independent LED readouts, ESD safe per the listing). YIHUA's own spec sheet lists
//   AC 220 V ±10%, 50 Hz for the model family and makes no ESD claim; both conflicts are stated on the page.
// Correction 2026-10-26: the old page called the WE1010NA a 70 W station; Weller lists 85 W for the station, 70 W for the iron.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-soldering-irons/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/soldering-irons/weller-we1010na-vs-yihua-862bd-plus";

export const metadata = buildMetadata({
  title: "Weller WE1010NA vs YIHUA 862BD+",
  description:
    "Weller WE1010NA vs YIHUA 862BD+: a dedicated ESD-safe iron station against a 2-in-1 iron and 500W hot air unit. Specs, charts and which fits your work.",
  path: "/soldering-irons/weller-we1010na-vs-yihua-862bd-plus",
});

const link = "text-accent hover:underline";

/** An iron heats one joint by contact; a hot air nozzle heats every joint of a part at once. */
function HeatPathDiagram() {
  const pads = [0, 1, 2, 3];
  return (
    <svg
      viewBox="0 0 340 190"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram: on the left, a soldering iron tip touches one pin of an eight-pin surface-mount chip, melting that joint only; on the right, a hot air nozzle blows over the whole chip, melting all eight joints together so the part can be lifted"
    >
      <text x="80" y="16" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">Iron: one joint at a time</text>
      <text x="255" y="16" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">Hot air: every joint at once</text>
      {[0, 175].map((ox, side) => (
        <g key={ox}>
          <rect x={ox + 10} y="140" width="150" height="10" rx="2" className="fill-[#2f6b3a]" />
          <rect x={ox + 50} y="112" width="70" height="22" rx="3" className="fill-foreground" />
          {pads.map((i) => (
            <g key={i}>
              <rect x={ox + 54 + i * 17} y="104" width="8" height="8" className={side === 1 || i === 0 ? "fill-accent" : "fill-muted"} />
              <rect x={ox + 54 + i * 17} y="134" width="8" height="6" className={side === 1 || i === 0 ? "fill-accent" : "fill-muted"} />
            </g>
          ))}
        </g>
      ))}
      <path d="M20 40 L52 98 L60 102 L56 94 L26 36 Z" className="fill-muted" />
      <text x="20" y="70" fontSize="8.5" className="fill-muted">tip</text>
      <text x="85" y="170" fontSize="8.5" textAnchor="middle" className="fill-muted">only the touched joint melts</text>
      <rect x="240" y="30" width="30" height="34" rx="3" className="fill-muted" />
      <rect x="236" y="62" width="38" height="8" rx="2" className="fill-muted" />
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M${232 + i * 11} 74 q3 12 -2 24`} className="fill-none stroke-accent" strokeWidth="1.4" />
      ))}
      <text x="282" y="50" fontSize="8.5" className="fill-muted">nozzle</text>
      <text x="260" y="170" fontSize="8.5" textAnchor="middle" className="fill-muted">all joints molten: lift the part</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "soldering-irons",
  heading: "Weller WE1010NA vs YIHUA 862BD+",
  path,
  published: "2026-10-26",
  intro:
    "Choose the Weller WE1010NA if you only solder and want a documented, ESD-safe, temperature-stable bench iron; choose the YIHUA 862BD+ if you also need to remove or reflow surface-mount parts, because only it has a hot air gun. The WE1010NA is an 85W station with a 70W iron, 100–450°C, a published 28-second heat-up and ±5°C accuracy. The 862BD+ pairs a 75W iron with a 500W hot air gun, both adjustable to 480°C.",
  a: {
    pick: picks.find((p) => p.name === "Weller WE1010NA")!,
    reviewHref: "/soldering-irons/weller-we1010na-review",
    imageAlt: "Weller WE1010NA digital soldering station with WEP 70 iron",
    chooseIf: [
      "You work on static-sensitive boards and want ESD-safe construction the maker documents",
      "Your work is hand soldering only: through-hole, wires, connectors and individual SMD pins",
      "You want published accuracy and stability figures, standby with auto setback and locked settings",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "YIHUA 862BD+")!,
    reviewHref: "/soldering-irons/yihua-862bd-plus-review",
    imageAlt: "YIHUA 862BD+ soldering iron and hot air rework station",
    chooseIf: [
      "You need to remove or reflow multi-pin SMD parts, QFNs or shields, which an iron alone can't do",
      "You want an iron and a hot air gun in one box instead of two stations",
      "You're in the US and buy the linked 110–127V listing",
    ],
  },
  extraSpecs: [
    { label: "Station type", a: "Single-channel soldering station", b: "Soldering iron + hot air rework" },
    { label: "Rated power", a: "85W station, 70W WEP 70 iron", b: "75W iron, 500W hot air, 720W total" },
    { label: "Iron temperature range", a: "100–450°C", b: "200–480°C" },
    { label: "Hot air range", a: "None", b: "100–480°C" },
    { label: "Heat-up time", a: "About 28 s, 50 to 350°C", b: "Not stated" },
    { label: "Temperature accuracy / stability", a: "±5°C / ±6°C", b: "Not stated" },
    { label: "ESD safe", a: "Yes, per Weller", b: "US listing says yes; YIHUA spec sheet makes no claim" },
    { label: "Tips", a: "Weller ET series", b: "Not stated in our sources" },
    { label: "Standby / lock", a: "Standby, auto setback, password-protected settings", b: "Not stated" },
    { label: "Mains voltage", a: "120V", b: "110–127V on the linked listing; spec sheet lists 220V" },
    { label: "Station size / weight", a: "150 × 120 × 98 mm; 1.40 kg", b: "Not stated in our sources" },
  ],
  differences: [
    "Only the 862BD+ has hot air: a 500W gun adjustable from 100 to 480°C for lifting and reflowing surface-mount parts. The WE1010NA is a contact iron only.",
    "Weller publishes accuracy (±5°C), stability (±6°C) and a 28-second heat-up from 50 to 350°C. YIHUA publishes no equivalent figures for the 862BD+.",
    "Weller lists the WE1010NA as ESD safe. For the 862BD+, the US Amazon listing says ESD safe, but YIHUA's own spec sheet makes no ESD claim.",
    "Iron power is close: 70W on the Weller's WEP 70 against 75W on the YIHUA. The Weller station is rated 85W in total.",
    "The Weller iron reaches down to 100°C; the YIHUA iron starts at 200°C and tops out higher, at 480°C against 450°C.",
    "The linked 862BD+ listing is the 110–127V US version, while YIHUA's spec sheet lists 220V for the model family, so check the listing you buy.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">At a glance</h2>
        <InfoCards
          items={[
            { label: "Different tools", desc: "A dedicated iron station against an iron plus hot air rework unit." },
            { label: "Weller strength", desc: "Documented ESD safety, ±5°C accuracy, standby and setback." },
            { label: "YIHUA strength", desc: "A 500W hot air gun for SMD removal and reflow." },
            { label: "Iron power", desc: "70W Weller WEP 70 against 75W on the YIHUA iron." },
            { label: "Documentation", desc: "Weller publishes far more numbers than YIHUA does." },
            { label: "Verdict", desc: "Solder only: Weller. Solder and rework SMD: YIHUA." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          This comparison is desk research against Weller&apos;s product page, the official Amazon listing for the
          862BD+ and YIHUA&apos;s spec sheet; we haven&apos;t bench-tested either station. The single-product write-ups
          are the{" "}
          <Link href="/soldering-irons/weller-we1010na-review" className={link}>
            Weller WE1010NA review
          </Link>{" "}
          and the{" "}
          <Link href="/soldering-irons/yihua-862bd-plus-review" className={link}>
            YIHUA 862BD+ review
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">WE1010NA vs 862BD+ spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          On the soldering side the two irons are close in power. The gap is in what else the box does and how much
          the maker is willing to put in writing.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Rated power of each heater. The hot air gun draws about seven times the iron&apos;s power.</>}>
            <BarChart
              items={[
                { label: "Weller WEP 70 iron", value: 70, display: "70W" },
                { label: "YIHUA iron", value: 75, display: "75W" },
                { label: "YIHUA hot air gun", value: 500, display: "500W", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Maximum set temperature, °C. The YIHUA iron and hot air both reach 480°C.</>}>
            <BarChart
              items={[
                { label: "Weller iron (from 100°C)", value: 450, display: "450°C" },
                { label: "YIHUA iron (from 200°C)", value: 480, display: "480°C", highlight: true },
                { label: "YIHUA hot air (from 100°C)", value: 480, display: "480°C", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          What the numbers mean in use: Weller&apos;s ±5°C accuracy means a 350°C setting should put the tip between
          345 and 355°C, and the ±6°C stability figure bounds how far it drifts while you work. That predictability
          matters with lead-free solder, where common SAC alloys melt around 217 to 220°C and most people work at 330 to
          370°C. YIHUA gives no comparable tolerance, so treat its displayed iron temperature as a guide. The
          Weller&apos;s lower 100°C floor also suits heat-sensitive parts and low-melt alloys; the YIHUA iron
          can&apos;t be set below 200°C.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Why an iron can&apos;t replace hot air</h2>
        <p className="text-muted leading-7 mb-4">
          To lift a surface-mount part, every one of its joints has to be molten at the same moment. An iron touches
          one or two pins at a time, and the first joint has frozen again before you reach the last. A hot air nozzle
          bathes the whole part, so on an 8-pin SOIC or a QFN with a thermal pad under it, all joints melt together and
          the part comes away cleanly. The WE1010NA can still hand-solder individual SMD pins with a fine tip, which
          covers assembly; rework is where hot air earns its place.
        </p>
        <Figure caption={<>Contact heating versus convection: why removing a multi-pin SMD part needs hot air.</>}>
          <HeatPathDiagram />
        </Figure>
        <div className="mt-4">
          <KeyIdea title="Two stations can beat one">
            If you already own a decent iron, a separate hot air unit can sit beside it. If you&apos;re buying from
            scratch and need both, the 862BD+ puts them in one box. If you need hot air only a few times a year, a
            WE1010NA plus solder wick and a low-melt removal alloy can handle occasional small-part removal without a
            second station.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Weller WE1010NA vs YIHUA 862BD+: which should you buy?</h2>
        <DataTable
          head={["Your work", "Better fit", "Why"]}
          rows={[
            ["Through-hole kits and wiring", "Weller WE1010NA", "Hot air adds nothing; the Weller documents its accuracy"],
            ["Phone and laptop board repair", "YIHUA 862BD+", "Shields, connectors and QFNs need hot air to remove"],
            ["Static-sensitive production bench", "Weller WE1010NA", "ESD safety stated by the maker, password-locked settings"],
            ["Replacing SMD capacitors and ICs", "YIHUA 862BD+", "Hot air lifts multi-pin parts without lifting pads"],
            ["Shrinking heat-shrink tubing", "YIHUA 862BD+", "The hot air gun doubles as a small heat gun"],
            ["Classroom or shared bench", "Weller WE1010NA", "Standby, auto setback and locked settings"],
            ["Outside North America", "Check the listing", "Weller sells 120V here; YIHUA lists 220V for the family"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For technique, see{" "}
          <Link href="/soldering-irons/how-to-solder-fine-pitch-smd-components" className={link}>
            soldering fine-pitch SMD components
          </Link>{" "}
          and{" "}
          <Link href="/soldering-irons/how-to-solder-surface-mount-resistors-without-hot-air" className={link}>
            soldering surface-mount resistors without hot air
          </Link>
          . To compare the Weller with Hakko&apos;s current station, read{" "}
          <Link href="/soldering-irons/weller-we1010-vs-hakko-fx-888dx" className={link}>
            Weller WE1010 vs Hakko FX-888DX
          </Link>
          .
        </p>
      </section>

      <Callout title="Safety: 480°C air and a 720W heater">
        A hot air nozzle at 480°C ignites paper and melts plastic connectors and cable insulation within seconds, and
        the nozzle stays hot after you set it down. Let the gun cool fully before you unplug or pack it away, keep it in
        its cradle, and shield nearby plastic parts with heat-resistant tape. Both stations draw from a household
        outlet; with 720W on the YIHUA, avoid daisy-chained power strips. Work with fume extraction for flux smoke, and
        if anything catches fire that you can&apos;t smother at once, leave and call 911.
      </Callout>
    </>
  ),
  bottomLine:
    "If your work is purely soldering, especially anything static-sensitive, the Weller WE1010NA is the more trustworthy tool: its maker documents ESD safety, accuracy, stability and heat-up time. If you regularly remove or reflow surface-mount parts and want one unit on the bench, the YIHUA 862BD+ does a job the Weller can't, as long as you confirm the voltage on the listing you buy.",
  faqs: [
    {
      question: "Can the Weller WE1010NA do SMD rework?",
      answer:
        "Not hot air rework. It's a contact iron with no hot air function, so lifting a multi-pin part such as an IC or a QFN is beyond it. You can still hand-solder and touch up individual SMD pins with a fine ET tip. For true rework, where every joint must melt at once, you need hot air like the 862BD+.",
    },
    {
      question: "What voltage does the YIHUA 862BD+ run on?",
      answer:
        "The US Amazon listing we link to states 110–127V with a US plug, while YIHUA's own spec sheet lists AC 220V ±10%, 50Hz for the model family. Regional versions exist, so confirm the voltage on the exact listing before you buy, and never run a 220V unit on 120V or the reverse.",
    },
    {
      question: "Is the YIHUA 862BD+ ESD safe?",
      answer:
        "The sources disagree. The US Amazon listing calls it ESD safe, but YIHUA's own spec sheet makes no ESD claim and its official photo shows no ESD-safe badge. If static-sensitive work is your priority, a station whose maker documents ESD safety, such as the Weller WE1010NA, is the safer choice.",
    },
    {
      question: "What temperature should I set the hot air to for SMD removal?",
      answer:
        "Start lower than the maximum. Many technicians begin around 300 to 350°C with moderate airflow for leaded solder and nudge up for lead-free, which melts at roughly 217 to 220°C. Heat the whole part evenly, use flux, and lift with tweezers once all joints are shiny. The 862BD+ allows up to 480°C, rarely needed.",
    },
    {
      question: "Is the Weller WE1010NA 70W or 85W?",
      answer:
        "Both figures appear because they describe different parts. Weller rates the WE1010NA station at 85W and its WEP 70 soldering iron at 70W. The iron figure is what heats the tip; the station figure includes the power supply and electronics. Listings that call it a 70W station are quoting the iron.",
    },
  ],
  roundup: { label: "See all soldering iron picks", href: "/soldering-irons/best-soldering-irons" },
  related: [
    { label: "Weller WE1010NA review", href: "/soldering-irons/weller-we1010na-review" },
    { label: "YIHUA 862BD+ review", href: "/soldering-irons/yihua-862bd-plus-review" },
    { label: "Hakko FX888D vs Weller WE1010NA", href: "/soldering-irons/hakko-fx888d-vs-weller-we1010na" },
    { label: "Weller WE1010 vs Hakko FX-888DX", href: "/soldering-irons/weller-we1010-vs-hakko-fx-888dx" },
    { label: "Soldering iron vs soldering station", href: "/soldering-irons/soldering-iron-vs-soldering-station" },
    { label: "Best soldering iron for circuit board repair", href: "/soldering-irons/best-soldering-iron-for-circuit-board-repair" },
    { label: "Soldering iron buying guide", href: "/soldering-irons/soldering-iron-buying-guide" },
  ],
};

export default function WellerWe1010naVsYihua862bdPlusPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="soldering-irons" current={path} />
    </>
  );
}
