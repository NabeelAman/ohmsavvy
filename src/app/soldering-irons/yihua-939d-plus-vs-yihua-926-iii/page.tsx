// YIHUA 939D+ per the official Amazon listing https://www.amazon.com/dp/B08RBPHJNQ (checked 2026-11-08): title "75W
// Equivalent", 392-896 °F (200-480 °C), built-in transformer, ESD safe, °C/°F display; PID; brushed-aluminum front panel;
// separate metal-alloy iron stand; detachable iron handle; temperature calibration; error detection; automatic detection
// of the handle's status; 110-127 V US plug; YIHUA 900M-series tips; 12-month US manufacturer coverage; spec table:
// Wattage 120 watts, Voltage 110 volts, Item Weight 2.16 kg, 5.4"D x 4.4"W x 3.6"H. In stock, add-to-cart present at ZIP
// 10001. The YIHUA 939D+ Pick adds: 907E iron (printed on the listing photo), and yihua-soldering.com's 939D+ page for a
// 220 V model quotes ±1 °C static and 200-450 °C. YIHUA's site also lists a "939D+-III" variant with 32 W (max 120 W) and a
// 5-30 min sleep at https://www.yihua-soldering.com/9-3-yihua-936a-ii-939d-iii-constant-temperature-soldering-station.html;
// the US listing doesn't call itself that variant and states no sleep mode, so we don't apply those figures.
// YIHUA 926 III per the official Amazon listing https://www.amazon.com/dp/B082F1WKP9 (checked 2026-11-08): "60W", 194-896 °F
// (90-480 °C), PID, "conforms to the UL Standard (U.S.)", integrated iron holder, metallic rear mesh with tip storage slots,
// °C/°F, sleep 5/10/30 min adjustable, digital temperature calibration, one control knob; kit: station, 2 helping hands,
// 6 tips (YIHUA #1200/900M series), 35 g lead-free solder, solder sucker, ESD-safe tweezers, solder wire dispenser, cleaning
// sponge; 110-127 V US plug; 12-month US coverage; spec table: 60 watts, 110 volts, 1.8 pounds, 7.3"D x 4.5"W x 2.8"H. In
// stock at ZIP 10001. yihua-soldering.com 926LED-III page
// (https://www.yihua-soldering.com/9-1-yihua-926led-iii-926led-iv-digital-soldering-iron-station.html, checked 2026-11-08):
// 130 W max, 18 W rated, 90-480 °C, LED display. The unit is printed "926 LED III" (per the Pick).
// The 926 III is the current Amazon version of YIHUA's 926 station line that "yihua 939d+ vs 926" searches refer to.
import Link from "@/components/AppLink";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-soldering-irons/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/soldering-irons/yihua-939d-plus-vs-yihua-926-iii";
const y939 = picks.find((p) => p.name === "YIHUA 939D+")!;
const y926 = picks.find((p) => p.name === "YIHUA 926 III")!;

export const metadata = buildMetadata({
  title: "YIHUA 939D+ vs 926: Which Station to Buy?",
  description:
    "YIHUA 939D+ vs 926 III: a transformer-based ESD-safe station against a compact kit with sleep mode. Power claims, temperature range and bench space compared.",
  path: "/soldering-irons/yihua-939d-plus-vs-yihua-926-iii",
  image: y939.image,
});

const link = "text-accent hover:underline";

/** Top-down bench footprint at 20 px per inch, from the Amazon listings' dimensions. The 939D+ stand's size isn't stated. */
function FootprintDiagram() {
  const s = 20;
  return (
    <svg
      viewBox="0 0 400 230"
      className="w-full h-auto"
      role="img"
      aria-label="YIHUA 939D+ vs 926 bench footprint seen from above, to scale from the Amazon listings: the 939D+ control box is 5.4 by 4.4 inches and needs a separate metal iron stand beside it, whose size is not stated; the 926 III is 7.3 by 4.5 inches with the iron holder built into the station."
    >
      <text x="200" y="16" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">Bench footprint from above, to scale</text>
      {/* 939D+ */}
      <rect x="20" y="40" width={4.4 * s} height={5.4 * s} rx="6" className="fill-accent/20 stroke-accent" strokeWidth="1.4" />
      <text x={20 + 2.2 * s} y={40 + 2.7 * s} fontSize="9" fontWeight="700" textAnchor="middle" className="fill-foreground">939D+</text>
      <text x={20 + 2.2 * s} y={40 + 2.7 * s + 13} fontSize="8.5" textAnchor="middle" className="fill-muted">5.4 × 4.4 in</text>
      <rect x="125" y="70" width="60" height="60" rx="8" className="fill-surface stroke-foreground" strokeWidth="1.2" strokeDasharray="4 3" />
      <text x="155" y="96" fontSize="8.5" textAnchor="middle" className="fill-foreground">separate</text>
      <text x="155" y="108" fontSize="8.5" textAnchor="middle" className="fill-foreground">iron stand</text>
      <text x="155" y="146" fontSize="8" textAnchor="middle" className="fill-muted">size not stated</text>
      <path d={`M${20 + 4.4 * s} 100 C 110 100 115 95 125 98`} className="fill-none stroke-foreground" strokeWidth="1.2" />
      {/* 926 III */}
      <rect x="220" y="40" width={4.5 * s} height={7.3 * s} rx="6" className="fill-accent/10 stroke-foreground" strokeWidth="1.4" />
      <rect x="228" y="48" width={4.5 * s - 16} height="34" rx="4" className="fill-surface stroke-border" strokeWidth="1" />
      <text x={220 + 2.25 * s} y="69" fontSize="8" textAnchor="middle" className="fill-muted">built-in holder</text>
      <text x={220 + 2.25 * s} y={40 + 4.2 * s} fontSize="9" fontWeight="700" textAnchor="middle" className="fill-foreground">926 III</text>
      <text x={220 + 2.25 * s} y={40 + 4.2 * s + 13} fontSize="8.5" textAnchor="middle" className="fill-muted">7.3 × 4.5 in</text>
      <text x="200" y="222" fontSize="8.5" textAnchor="middle" className="fill-muted">Station depth runs top to bottom; dimensions from each Amazon listing.</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "soldering-irons",
  heading: "YIHUA 939D+ vs 926 III",
  path,
  published: "2026-11-08",
  intro:
    "YIHUA 939D+ vs 926 comes down to what you want on the bench. The 939D+ is a transformer-based station, ESD safe, with a metal front panel, a detachable iron and a separate metal stand, covering 200 to 480 °C. The 926 III is a compact station with the holder built in, a wider 90 to 480 °C range and an adjustable sleep timer, sold as a kit with helping hands, six tips and solder. Both use PID control and YIHUA's 900M tips, and both listings give power figures that conflict with other YIHUA sources.",
  a: {
    pick: y939,
    imageAlt: "YIHUA 939D+ ESD-safe soldering station with 907E iron",
    chooseIf: [
      "You work on static-sensitive parts and want a station and iron the listing calls ESD safe",
      "You want a transformer-based station with a metal front panel and a separate metal stand",
      "You already own tips, solder and a stand setup and don't need a kit",
      "You prefer a heavier base (2.16 kg) that stays put when you pull the cord",
    ],
  },
  b: {
    pick: y926,
    imageAlt: "YIHUA 926 III digital soldering station kit with helping hands",
    chooseIf: [
      "You are starting from nothing and want helping hands, six tips and solder in the box",
      "You want an adjustable sleep timer of 5, 10 or 30 minutes",
      "You want to work at low temperatures, down to 90 °C",
      "You want the holder built into the station to save bench space",
    ],
  },
  extraSpecs: [
    { label: "Temperature range", a: "200–480 °C (392–896 °F)", b: "90–480 °C (194–896 °F)" },
    { label: "Power, per listing", a: "\"75W equivalent\"; spec table 120 W", b: "60 W" },
    { label: "Power, per YIHUA's site", a: "Not stated for the US model; a 939D+-III variant lists 32 W (max 120 W)", b: "130 W max, 18 W rated" },
    { label: "Control", a: "PID, calibration, error detection", b: "PID, digital calibration" },
    { label: "Sleep mode", a: "Not stated for the US version", b: "5, 10 or 30 min, adjustable" },
    { label: "ESD", a: "ESD safe (listing title)", b: "Not stated for the station; tweezers are ESD safe" },
    { label: "Iron and stand", a: "907E detachable iron, separate metal stand", b: "Holder built into the station" },
    { label: "Tips", a: "YIHUA 900M series", b: "YIHUA #1200/900M series, six in the kit" },
    { label: "In the box", a: "Station, iron and stand", b: "Station, 2 helping hands, 6 tips, 35 g solder, sucker, tweezers, dispenser, sponge" },
    { label: "Size", a: "5.4 × 4.4 × 3.6 in", b: "7.3 × 4.5 × 2.8 in" },
    { label: "Weight", a: "2.16 kg", b: "1.8 lb (about 0.82 kg)" },
    { label: "Mains and support", a: "110–127 V; 12-month US coverage", b: "110–127 V; 12-month US coverage" },
  ],
  differences: [
    "ESD: the 939D+ listing calls the station ESD safe. The 926 III listing doesn't say the station is ESD safe; only its tweezers are.",
    "Temperature: the 926 III goes down to 90 °C; the 939D+ starts at 200 °C. Both top out at 480 °C per their listings.",
    "Sleep: the 926 III has an adjustable 5, 10 or 30 minute sleep. The 939D+ US listing doesn't mention sleep.",
    "Build: the 939D+ is transformer-based with a brushed-aluminum front panel and a separate metal stand. The 926 III is a compact unit with the holder built in.",
    "Kit: the 926 III ships with helping hands, six tips, solder, a sucker and tweezers. The 939D+ ships as a station.",
    "Power: both listings conflict with YIHUA's own figures, so neither wattage can be taken at face value.",
    "Neither is owner-tested; both assessments are desk research from the Amazon listings and YIHUA's site.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">What you get for your bench</h2>
        <p className="text-muted leading-7 mb-4">
          Lead with the box contents, because they decide this for many buyers. The 926 III arrives as a 12-in-1 kit:
          the station, two helping hands, six tips, a 35 g roll of lead-free solder, a solder sucker, ESD-safe
          tweezers, a solder dispenser and a sponge. The 939D+ arrives as a station, iron and stand, with tips sold
          separately in YIHUA&apos;s store. If you have nothing yet, the 926 III gets you soldering the day it arrives.
        </p>
        <Figure
          caption={
            <>
              Footprints from each Amazon listing at 20 px per inch. The 939D+ needs room for its separate stand; the
              926 III keeps the iron in the station.
            </>
          }
        >
          <FootprintDiagram />
        </Figure>
        <p className="text-muted leading-7 my-4">
          On the bench, the layouts differ. The 939D+ control box is 5.4 × 4.4 in, and the iron rests in a separate
          metal stand you can put wherever suits your hand. The 926 III is deeper at 7.3 in, but its holder is built
          in, with tip slots in the rear guard. Weight goes strongly to the 939D+: 2.16 kg against 1.8 lb, about 0.82
          kg. A heavy base doesn&apos;t slide when you pull the iron cable, which
          matters more than it sounds on a cramped desk.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Temperature range and sleep</h2>
        <p className="text-muted leading-7 mb-4">
          Both listings top out at 480 °C (896 °F). At the low end, the 926 III goes down to 90 °C, the 939D+ to 200
          °C. Few solder jobs run below 200 °C, since common tin-lead solder melts at 183 °C and lead-free alloys
          higher, but a low setting is useful for warming heat-shrink, softening adhesive or keeping the iron idling
          cool between joints.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Lowest set temperature from each listing. Both reach 480 °C at the top.</>}>
            <BarChart
              items={[
                { label: "YIHUA 939D+", value: 200, display: "200 °C" },
                { label: "YIHUA 926 III", value: 90, display: "90 °C", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Station weight from each listing&apos;s spec table, in kg.</>}>
            <BarChart
              items={[
                { label: "YIHUA 939D+", value: 2.16, display: "2.16 kg", highlight: true },
                { label: "YIHUA 926 III", value: 0.82, display: "0.82 kg (1.8 lb)" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Sleep is the clearer advantage. The 926 III drops into sleep after 5, 10 or 30 minutes idle, which YIHUA&apos;s
          listing says reduces wear on the tip and heating element. The 939D+ listing describes automatic detection of
          the handle&apos;s status but doesn&apos;t state a sleep mode for the US model. YIHUA&apos;s site lists a
          939D+-III variant with a 5 to 30 minute sleep, but the Amazon unit doesn&apos;t claim to be that variant, so we
          don&apos;t assume it. If you leave an iron on for hours, sleep is worth having; our page on{" "}
          <Link href="/soldering-irons/soldering-iron-tip-care" className={link}>
            soldering iron tip care
          </Link>{" "}
          covers why idle heat oxidizes tips.
        </p>
        <Callout title="A 480 °C tip and a light station">
          Both irons reach 480 °C. Park the iron in its holder every time, keep the cord clear of the tip, and unplug
          the station when you leave the bench. The 926 III&apos;s light body is easier to drag by the cable, so place it
          where the cable can&apos;t catch. If a station smells of burning plastic or the cable is damaged, stop using
          it.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">ESD safety and the transformer</h2>
        <p className="text-muted leading-7 mb-4">
          The 939D+ listing title says &quot;ESD Safe&quot;, and its Pick photo shows &quot;ESD SAFE&quot; printed on the
          station. The 926 III listing makes no ESD claim for the station; only the tweezers in its kit are described as
          ESD safe. For through-hole parts, wires and connectors that rarely matters. For bare MOSFETs, CMOS chips and
          RF parts, an ESD-safe station with a grounded tip is the safer choice.
        </p>
        <KeyIdea title="ESD safe means a grounded path, not a feature switch">
          An ESD-safe station is built to keep the tip at ground potential, so the tip doesn&apos;t carry a static charge
          or leakage voltage into a sensitive pin. That only works if the outlet&apos;s ground is good. Use a properly
          grounded three-prong outlet, and add a wrist strap and mat if you handle static-sensitive boards often.
        </KeyIdea>
        <p className="text-muted leading-7 mt-4">
          Both stations use PID control, which adjusts heating power to hold the set temperature. The 939D+ adds error
          detection and a detachable handle. The 926 III adds a UL standard conformity statement in its listing. Both
          take YIHUA&apos;s 900M-series tips, so a tip collection moves between them. See{" "}
          <Link href="/soldering-irons/soldering-iron-tip-types" className={link}>
            soldering iron tip types
          </Link>{" "}
          for which shapes to buy.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The trust question: power figures</h2>
        <p className="text-muted leading-7 mb-4">
          Neither listing gives a power figure you can take at face value. The 939D+ title says &quot;75W
          equivalent&quot;, its spec table says 120 W, and a related 939D+-III variant on YIHUA&apos;s site says 32 W with
          120 W maximum. The 926 III listing says 60 W, while YIHUA&apos;s own 926LED-III page says 130 W maximum and 18 W
          rated. A rated figure usually describes steady-state draw and a maximum the heat-up surge, so the numbers may
          not contradict each other as much as they look, but YIHUA doesn&apos;t explain them.
        </p>
        <p className="text-muted leading-7">
          What that means for you: don&apos;t buy either one on wattage. Neither states a heat-up time. If you solder
          heavy wire, large ground planes or thick connectors often, a station with clearly documented power and
          recovery, such as the{" "}
          <Link href="/soldering-irons/hakko-fx888d-review" className={link}>
            Hakko FX-888D
          </Link>
          , is the better-documented choice. Our{" "}
          <Link href="/soldering-irons/what-wattage-soldering-iron-do-i-need" className={link}>
            wattage guide
          </Link>{" "}
          covers how much power each job needs.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">YIHUA 939D+ vs 926 III: which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Better fit", "Why"]}
          rows={[
            ["First station, no tools yet", "YIHUA 926 III", "Kit includes helping hands, six tips and solder"],
            ["Static-sensitive chips and boards", "YIHUA 939D+", "Listing states the station is ESD safe"],
            ["Iron left on for long sessions", "YIHUA 926 III", "Adjustable 5, 10 or 30 min sleep"],
            ["Heat-shrink and low-temperature work", "YIHUA 926 III", "Sets down to 90 °C"],
            ["Bench where the stand should sit apart", "YIHUA 939D+", "Separate metal stand, detachable iron"],
            ["Tight desk space, iron kept in the station", "YIHUA 926 III", "Holder built in"],
            ["Heavy wire and ground planes daily", "Neither", "Power figures conflict; no heat-up time stated"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Our verdict: the 926 III is the better buy for a beginner or hobbyist who wants one box with everything, a
          sleep timer and a low temperature floor. The 939D+ is the better buy for repair work on static-sensitive
          electronics, where its ESD-safe station, heavy base and separate stand earn their place. For other stations
          at similar budgets, see{" "}
          <Link href="/soldering-irons/weller-we1010na-vs-yihua-862bd-plus" className={link}>
            Weller WE1010NA vs YIHUA 862BD+
          </Link>
          ,{" "}
          <Link href="/soldering-irons/soldering-iron-vs-soldering-station" className={link}>
            soldering iron vs station
          </Link>{" "}
          and the{" "}
          <Link href="/soldering-irons/best-soldering-iron-for-beginners" className={link}>
            best soldering irons for beginners
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "The YIHUA 926 III is the better starter buy: a compact PID station with a 90 to 480 °C range, an adjustable sleep timer and a kit that includes helping hands, six tips and solder. The YIHUA 939D+ is the better choice for static-sensitive repair work, with an ESD-safe transformer station, a metal front panel and a separate stand. Treat both listings' power figures with caution.",
  chooseNeitherIf:
    "You solder heavy-gauge wire, large ground planes or battery packs every day: neither listing gives a heat-up time, and both power figures conflict with YIHUA's own pages. A station with documented power and recovery, such as the Hakko FX-888D or Weller WE1010NA, is the safer buy.",
  faqs: [
    {
      question: "Is the YIHUA 939D+ better than the 926?",
      answer:
        "For static-sensitive work, yes: its listing calls the station ESD safe, it is transformer-based and its iron sits in a separate metal stand. The 926 III is better value for a beginner, because it adds an adjustable sleep timer, a lower 90 °C minimum and a full kit with helping hands, six tips and solder.",
    },
    {
      question: "Do the YIHUA 939D+ and 926 III use the same tips?",
      answer:
        "Both listings name YIHUA's 900M-series tips, and the 926 III kit describes its six tips as #1200/900M series. In practice that means a stock of 900M tips works with either station. Check each tip's description before buying, as YIHUA sells several tip families.",
    },
    {
      question: "Does the YIHUA 939D+ have a sleep mode?",
      answer:
        "The US Amazon listing doesn't state one. It mentions automatic detection of the handle's status, temperature calibration and error detection. YIHUA's website lists a 939D+-III variant with a 5 to 30 minute sleep, but the Amazon unit doesn't claim to be that version. The 926 III has an adjustable 5, 10 or 30 minute sleep.",
    },
    {
      question: "How many watts is the YIHUA 926 III?",
      answer:
        "The Amazon listing says 60 W. YIHUA's own 926LED-III page gives 130 W maximum and 18 W rated. The figures may describe peak and steady draw, but YIHUA doesn't explain them, so treat the station as a light-duty hobby unit rather than one for heavy wire.",
    },
    {
      question: "Is the YIHUA 926 III ESD safe?",
      answer:
        "The listing doesn't say the station is ESD safe. It describes the kit's tweezers as ESD safe and says the station conforms to the UL standard. If you work on static-sensitive chips, the 939D+, whose listing calls the station ESD safe, is the better match.",
    },
    {
      question: "Which YIHUA station takes less space?",
      answer:
        "The 939D+ control box is smaller at 5.4 by 4.4 inches, but it needs a separate iron stand beside it. The 926 III is 7.3 by 4.5 inches with the holder built in, so its total footprint can end up the smaller of the two. It is also far lighter at 1.8 lb against 2.16 kg.",
    },
  ],
  roundup: { label: "See all soldering iron picks", href: "/soldering-irons/best-soldering-irons" },
  related: [
    { label: "Weller WE1010NA vs YIHUA 862BD+", href: "/soldering-irons/weller-we1010na-vs-yihua-862bd-plus" },
    { label: "YIHUA 862BD+ review", href: "/soldering-irons/yihua-862bd-plus-review" },
    { label: "Hakko FX-888D review", href: "/soldering-irons/hakko-fx888d-review" },
    { label: "Hakko FX-888D vs Weller WE1010NA", href: "/soldering-irons/hakko-fx888d-vs-weller-we1010na" },
    { label: "Weller WE1010 vs Hakko FX-888DX", href: "/soldering-irons/weller-we1010-vs-hakko-fx-888dx" },
    { label: "Soldering iron vs soldering station", href: "/soldering-irons/soldering-iron-vs-soldering-station" },
    { label: "Best soldering irons for beginners", href: "/soldering-irons/best-soldering-iron-for-beginners" },
    { label: "Best soldering irons for electronics", href: "/soldering-irons/best-soldering-irons-for-electronics" },
    { label: "Soldering iron tip types", href: "/soldering-irons/soldering-iron-tip-types" },
    { label: "Soldering iron tip care", href: "/soldering-irons/soldering-iron-tip-care" },
    { label: "What wattage soldering iron do I need?", href: "/soldering-irons/what-wattage-soldering-iron-do-i-need" },
    { label: "Soldering iron buying guide", href: "/soldering-irons/soldering-iron-buying-guide" },
  ],
};

export default function Yihua939dPlusVsYihua926IiiPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="soldering-irons" current={path} />
    </>
  );
}
