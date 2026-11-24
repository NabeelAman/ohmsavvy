// Hakko FX-888DX (ASIN B0D4DJW54S) per hakkousa.com's FX-888DX page, as cited in the best-soldering-irons Pick and on
// /soldering-irons/weller-we1010-vs-hakko-fx-888dx and /soldering-irons/pinecil-v2-vs-hakko-fx-888dx: 100 W / 120 VAC
// station; FX-8801 65 W iron; T18 tips; 50-480 °C set range; ±1 °C idle stability; ESD safe, tip-to-ground under 2 Ω;
// five presets; push-button rotary dial with digital °F/°C display; parameter lock; drives Hakko tweezers, solder gun and
// larger irons; station 1.2 kg, 100 × 120 × 120 mm. Hakko states no heat-up time and no sleep or standby mode.
// hakkousa.com returns 403 to automated fetches, so no new Hakko facts were added here.
// YIHUA 939D+ (ASIN B08RBPHJNQ) per the official Amazon listing, as cited on /soldering-irons/yihua-939d-plus-vs-yihua-926-iii
// (checked 2026-11-08) and in the Pick: title "75W Equivalent"; spec table Wattage 120 watts (conflict); 200-480 °C
// (392-896 °F); built-in transformer; ESD safe; PID; °C/°F; brushed-aluminum front panel; separate metal stand; detachable
// 907E iron; temperature calibration; error detection; handle-status detection; 900M-series tips; 110-127 V; 12-month US
// coverage; Item Weight 2.16 kg; 5.4"D × 4.4"W × 3.6"H. yihua-soldering.com's 939D+ page (220 V model) quotes ±1 °C static
// and 200-450 °C. Sleep mode not stated for the US version.
// Amazon availability at ZIP 10001 with Chrome, 2026-11-24: both show #add-to-cart-button, In Stock.
// Solder melting points (Sn63/Pb37 183 °C, SAC305 about 217-220 °C) are standard values, hedged on the page.
// Neither station is hands-on tested by OhmSavvy (the owner tested the older FX888D, not the FX-888DX).
import Link from "@/components/AppLink";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-soldering-irons/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/soldering-irons/hakko-fx-888dx-vs-yihua-939d-plus";
const hakko = picks.find((p) => p.name === "Hakko FX-888DX")!;
const yihua = picks.find((p) => p.name === "YIHUA 939D+")!;

export const metadata = buildMetadata({
  title: "Hakko FX-888DX vs YIHUA 939D+",
  description:
    "Hakko FX-888DX vs YIHUA 939D+: two ESD-safe bench stations to 480 °C. Presets and T18 tips against a transformer build at a hobby price. Charts, verdict.",
  path: "/soldering-irons/hakko-fx-888dx-vs-yihua-939d-plus",
  image: hakko.image,
});

const link = "text-accent hover:underline";

/** Set-temperature ranges on one axis (100 °C to 500 °C), with the melting points of two common solders marked. */
function TempRangeDiagram() {
  const x = (c: number) => 30 + ((c - 0) / 500) * 340;
  return (
    <svg
      viewBox="0 0 400 190"
      className="w-full h-auto"
      role="img"
      aria-label="Temperature range diagram on a 0 to 500 degree Celsius axis: the Hakko FX-888DX can be set from 50 to 480 degrees, the YIHUA 939D+ from 200 to 480 degrees. Leaded 63/37 solder melts at about 183 degrees and lead-free SAC305 at about 217 to 220 degrees, so both stations cover normal soldering, while only the Hakko can be set below 200 degrees."
    >
      <text x="200" y="16" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">Set range, °C</text>
      <rect x={x(50)} y="36" width={x(480) - x(50)} height="22" rx="4" className="fill-accent/30 stroke-accent" strokeWidth="1.2" />
      <text x={x(385)} y="51" fontSize="9.5" fontWeight="700" textAnchor="middle" className="fill-foreground">Hakko FX-888DX: 50–480</text>
      <rect x={x(200)} y="70" width={x(480) - x(200)} height="22" rx="4" className="fill-surface stroke-foreground" strokeWidth="1.2" />
      <text x={x(340)} y="85" fontSize="9.5" fontWeight="700" textAnchor="middle" className="fill-foreground">YIHUA 939D+: 200–480</text>
      <path d={`M${x(183)} 30 V112`} className="stroke-muted" strokeWidth="1.2" strokeDasharray="3 3" />
      <path d={`M${x(218)} 30 V112`} className="stroke-muted" strokeWidth="1.2" strokeDasharray="3 3" />
      <text x={x(183) - 6} y="126" fontSize="8.5" textAnchor="end" className="fill-muted">63/37 melts ~183</text>
      <text x={x(218) + 6} y="142" fontSize="8.5" className="fill-muted">SAC305 ~217–220</text>
      <path d={`M${x(0)} 160 H${x(500)}`} className="stroke-foreground" strokeWidth="1.2" />
      {[0, 100, 200, 300, 400, 500].map((c) => (
        <g key={c}>
          <path d={`M${x(c)} 156 V164`} className="stroke-foreground" strokeWidth="1.2" />
          <text x={x(c)} y="178" fontSize="8.5" textAnchor="middle" className="fill-muted">{c}</text>
        </g>
      ))}
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "soldering-irons",
  heading: "Hakko FX-888DX vs YIHUA 939D+",
  path,
  published: "2026-11-24",
  intro:
    "Hakko FX-888DX vs YIHUA 939D+ compares the bench station many hobbyists aim for with one of the most popular budget alternatives. Both are ESD safe and reach 480 °C. The Hakko adds a 100 W station, five presets, a parameter lock, ±1 °C idle stability and Hakko's T18 tip range. The YIHUA counters with a built-in transformer, PID control, a metal front panel and common 900M tips, at a much lower price, but its power figures conflict.",
  a: {
    pick: hakko,
    imageAlt: "Hakko FX-888DX digital soldering station with FX-8801 iron",
    chooseIf: [
      "You switch between leaded and lead-free work and want presets to jump between temperatures",
      "You want a parameter lock so other users can't change your settings",
      "You may add Hakko tweezers or a larger iron to the same station later",
      "You want a maker that publishes ±1 °C idle stability for the exact US model",
    ],
  },
  b: {
    pick: yihua,
    imageAlt: "YIHUA 939D+ ESD-safe soldering station with 907E iron and metal stand",
    chooseIf: [
      "You want an ESD-safe, temperature-controlled station on a hobby budget",
      "You like a separate metal iron stand you can place anywhere on the bench",
      "You want widely sold 900M-series tips",
      "You can live with power and temperature figures that differ between YIHUA's sources",
    ],
  },
  extraSpecs: [
    { label: "Set range", a: "50–480 °C", b: "200–480 °C (Amazon); 200–450 °C on YIHUA's 220 V page" },
    { label: "Station power", a: "100 W (FX-8801 iron 65 W)", b: "\"75W equivalent\" in the title; 120 W in the spec table" },
    { label: "Stability", a: "±1 °C at idle", b: "±1 °C static on YIHUA's 220 V page; not stated for the US model" },
    { label: "Controls", a: "Rotary dial, 5 presets, parameter lock", b: "PID, °C/°F, calibration, error detection" },
    { label: "Tips", a: "Hakko T18 series", b: "YIHUA 900M series" },
    { label: "Iron", a: "FX-8801", b: "907E, detachable" },
    { label: "Stand", a: "Not detailed in our sources", b: "Separate metal stand" },
    { label: "Other handpieces", a: "Tweezers, solder gun, larger irons", b: "Not stated" },
    { label: "Sleep / standby", a: "Not stated by Hakko", b: "Not stated for the US version" },
    { label: "Weight", a: "Station 1.2 kg", b: "2.16 kg (listing item weight)" },
    { label: "Coverage", a: "Buy from authorized sellers; counterfeits exist", b: "12-month US coverage" },
  ],
  differences: [
    "Low end: the Hakko sets down to 50 °C; the YIHUA starts at 200 °C. Both top out at 480 °C on their US listings.",
    "Controls: the Hakko has five presets and a parameter lock. YIHUA lists calibration and error detection but no presets.",
    "Power: Hakko rates the station at 100 W. YIHUA's listing calls the 939D+ \"75W equivalent\" in its title and 120 W in its spec table.",
    "Tips: Hakko T18 tips against YIHUA 900M tips. They are not interchangeable.",
    "Expansion: the FX-888DX also drives Hakko tweezers, a solder gun and larger irons. YIHUA states no other handpieces for the 939D+.",
    "Weight: 2.16 kg for the YIHUA, per its listing, against 1.2 kg for the Hakko station; the listing doesn't say whether that includes the separate stand.",
    "Neither has a stated sleep mode. Neither carries our Hands-on Tested badge.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Temperature range against real solder</h2>
        <p className="text-muted leading-7 mb-4">
          The Hakko&apos;s wider range looks like a big win on paper, but the part that matters for soldering sits well
          above 200 °C. Leaded 63/37 solder melts at about 183 °C and common lead-free SAC305 at about 217 to 220 °C, and
          irons usually run well above the melting point so heat flows quickly into the joint. Both stations cover that
          working band in full.
        </p>
        <Figure caption={<>Each station&apos;s set range, with two common solder melting points marked. Melting points are typical values.</>}>
          <TempRangeDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The low end on the Hakko is useful mainly for keeping an idle tip cool, or for gentle work with low-melt
          alloys. The real difference for daily use is how you change temperature. On the FX-888DX you dial in five
          presets once, then switch between them. On the 939D+ you adjust the set point each time.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The power figures, untangled</h2>
        <p className="text-muted leading-7 mb-4">
          Hakko keeps it simple: a 100 W station driving a 65 W iron. YIHUA&apos;s listing gives two different numbers for
          the same unit, &quot;75W equivalent&quot; in the title and 120 W in the spec table, and a 939D+-III variant on
          YIHUA&apos;s own site lists 32 W rated with a 120 W maximum. YIHUA doesn&apos;t explain how the figures relate, so we don&apos;t
          rank the two stations on wattage.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Station power as each maker states it. YIHUA&apos;s two figures come from the same Amazon listing.</>}>
            <BarChart
              items={[
                { label: "YIHUA 939D+ (spec table)", value: 120, display: "120 W" },
                { label: "Hakko FX-888DX", value: 100, display: "100 W", highlight: true },
                { label: "YIHUA 939D+ (title)", value: 75, display: "75 W equiv." },
              ]}
            />
          </Figure>
          <Figure caption={<>Station weight. YIHUA&apos;s is the listing&apos;s item weight.</>}>
            <BarChart
              items={[
                { label: "YIHUA 939D+", value: 2.16, display: "2.16 kg" },
                { label: "Hakko FX-888DX", value: 1.2, display: "1.2 kg", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <KeyIdea title="Watts are not the whole story">
          Heat reaches the joint through the tip, so tip shape and size often matter more than the station&apos;s rating.
          A chisel tip pushes far more heat into a ground plane than a fine conical tip on the same station. Before you
          buy, check that the tip range you want exists for the iron: T18 for the Hakko, 900M for the YIHUA. Our{" "}
          <Link href="/soldering-irons/soldering-iron-tip-types" className={link}>
            soldering iron tip types guide
          </Link>{" "}
          shows which shape fits which job.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which station for which bench?</h2>
        <DataTable
          head={["Bench", "Better fit", "Reason"]}
          rows={[
            ["Repair shop moving between leaded and lead-free boards", "Hakko FX-888DX", "Five presets make switching fast"],
            ["Shared school or makerspace bench", "Hakko FX-888DX", "Parameter lock stops settings drifting"],
            ["First temperature-controlled station on a tight budget", "YIHUA 939D+", "ESD safe and PID controlled at a hobby price"],
            ["Bench that may add hot tweezers for SMD parts later", "Hakko FX-888DX", "Drives Hakko tweezers from the same station"],
            ["Builder who wants cheap, easy-to-find tips", "YIHUA 939D+", "900M tips are widely sold"],
            ["Through-hole kits and wire splicing", "Either", "Both cover the full soldering range"],
          ]}
        />
        <div className="mt-4">
          <Callout title="Heat and fumes">
            Both irons reach 480 °C, hot enough to burn skin instantly and ignite paper. Always return the iron to its
            stand, unplug the station when you leave the bench, and keep a fume extractor or a fan pulling smoke away from
            your face. Wash your hands after handling leaded solder. For a burn larger than a coin, or any burn to the
            eyes, get medical help; call 911 in an emergency.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Buying either one safely</h2>
        <p className="text-muted leading-7 mb-4">
          Counterfeit Hakko stations circulate, so buy the FX-888DX from Hakko&apos;s authorized sellers and check the
          listing&apos;s seller before you order. The YIHUA&apos;s risk is different: its listing mixes figures from
          other variants, so judge it on the features its US listing states plainly, namely ESD safety, PID control, the
          transformer and the 200 to 480 °C range, rather than the wattage. If you are still choosing between a station
          and a portable iron, read{" "}
          <Link href="/soldering-irons/soldering-iron-vs-soldering-station" className={link}>
            soldering iron vs soldering station
          </Link>
          .
        </p>
        <p className="text-muted leading-7">
          More station matchups:{" "}
          <Link href="/soldering-irons/weller-we1010-vs-hakko-fx-888dx" className={link}>
            Weller WE1010 vs Hakko FX-888DX
          </Link>
          ,{" "}
          <Link href="/soldering-irons/pinecil-v2-vs-hakko-fx-888dx" className={link}>
            Pinecil V2 vs Hakko FX-888DX
          </Link>{" "}
          and{" "}
          <Link href="/soldering-irons/yihua-939d-plus-vs-yihua-926-iii" className={link}>
            YIHUA 939D+ vs YIHUA 926 III
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "The Hakko FX-888DX is the better station if you solder often: five presets, a parameter lock, published ±1 °C idle stability, T18 tips and room to add Hakko tweezers. The YIHUA 939D+ is the better buy for a first ESD-safe, temperature-controlled bench station on a budget, as long as you judge it on its features rather than its conflicting wattage figures.",
  chooseNeitherIf:
    "You solder away from a bench, in a car or on site. A portable USB-C iron such as the Pinecil V2 suits that better than either mains-powered station.",
  faqs: [
    {
      question: "Is the YIHUA 939D+ as good as a Hakko?",
      answer:
        "On the core job, holding a set temperature on an ESD-safe tip, the 939D+ covers the same 200 to 480 °C working range with PID control. The Hakko adds presets, a parameter lock, a stated ±1 °C idle stability for the US model, and the option to run other Hakko handpieces. Those extras matter most on a busy repair bench.",
    },
    {
      question: "Can I use Hakko T18 tips on the YIHUA 939D+?",
      answer:
        "No. The 939D+ takes YIHUA's 900M-series tips, and the FX-888DX's FX-8801 iron takes Hakko T18 tips. The two families have different shapes and are not interchangeable. 900M tips are widely sold and inexpensive, while T18 tips cover a broad range of shapes from Hakko itself.",
    },
    {
      question: "How many watts is the YIHUA 939D+?",
      answer:
        "Its Amazon listing gives two figures: \"75W equivalent\" in the title and 120 W in the spec table. A 939D+-III variant on YIHUA's own site lists 32 W rated and 120 W maximum, but the US listing doesn't say it is that variant. YIHUA doesn't reconcile the figures, so judge the station on its other features.",
    },
    {
      question: "Does the Hakko FX-888DX have a sleep mode?",
      answer:
        "Hakko doesn't state one for the FX-888DX, and YIHUA doesn't state one for the US 939D+ either. To protect tips on either station, lower the set temperature during long breaks and switch the station off when you leave the bench. A tinned tip at a lower idle temperature lasts noticeably longer.",
    },
    {
      question: "Is the FX-888DX worth it over the older FX-888D?",
      answer:
        "Hakko replaced the FX-888D with the FX-888DX, keeping the same FX-8801 handpiece and T18 tips. The DX raises the station from 70 W to 100 W and adds a rotary dial, five presets and a parameter lock. If you already own T18 tips, they carry over, which makes the upgrade easy.",
    },
  ],
  roundup: { label: "See all soldering iron picks", href: "/soldering-irons/best-soldering-irons" },
  related: [
    { label: "Weller WE1010 vs Hakko FX-888DX", href: "/soldering-irons/weller-we1010-vs-hakko-fx-888dx" },
    { label: "Pinecil V2 vs Hakko FX-888DX", href: "/soldering-irons/pinecil-v2-vs-hakko-fx-888dx" },
    { label: "YIHUA 939D+ vs YIHUA 926 III", href: "/soldering-irons/yihua-939d-plus-vs-yihua-926-iii" },
    { label: "Weller WE1010NA vs YIHUA 862BD+", href: "/soldering-irons/weller-we1010na-vs-yihua-862bd-plus" },
    { label: "Soldering iron vs soldering station", href: "/soldering-irons/soldering-iron-vs-soldering-station" },
    { label: "Soldering iron tip types", href: "/soldering-irons/soldering-iron-tip-types" },
    { label: "Best soldering iron for circuit board repair", href: "/soldering-irons/best-soldering-iron-for-circuit-board-repair" },
  ],
};

export default function HakkoFx888dxVsYihua939dPlusPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="soldering-irons" current={path} />
    </>
  );
}
