import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-soldering-irons/page";
import { buildMetadata } from "@/lib/metadata";

// Miniware TS101 per its Amazon listing https://www.amazon.com/dp/B0BF63H4ZC (checked 2026-11-07; Miniware's own site is
// unreachable, as noted on the TS101 Pick): 50-400 C on an OLED; DC 9-24 V or PD3.0 9-20 V; "PD power up to 100W" in
// the bullets while the listing's Wattage field says 65 watts; 65 W USB wall adapter included; open-source code with a
// parameter file for custom temperature-rise curves; "dual-temperature and accelerated sensors"; sleep mode and
// over-heating warning; One Boost button raises 300 C to 400 C "within a short time"; TS100 tips and accessories fit.
// Heat-up time and weight not stated.
// FNIRSI HS-02A per https://www.fnirsi.com/products/hs-02 (description text, checked 2026-11-07): 9-20 V, 100 W max,
// PD/QC over Type-C, 0.96-inch IPS color screen, 100-450 C, 3 presets, sleep, auto power-off, child lock, "2 S
// tinning", HS-02A tips I/JS/K/KU/B/C2 (HS-02B: I/IS/K), no built-in battery, 100 W adapter in the kit. Amazon listing
// https://www.amazon.com/dp/B0DBLMH1HS (checked 2026-11-07): 3 s, built-in calibration, 61 g, six tips. Mini stand and
// the 2-year direct-order warranty per this site's HS-02A Pick.
// Both ASINs had a buy box at ZIP 10001 on 2026-11-07.
// Solder melting points (Sn63/Pb37 183 C eutectic; SAC305 about 217-220 C) and the working-temperature bands in the
// diagram are standard reference values, hedged as typical, not product claims.

const path = "/soldering-irons/ts101-vs-fnirsi-hs-02a";
const ts101 = picks.find((p) => p.name === "Miniware TS101")!;
const hs02a = picks.find((p) => p.name === "FNIRSI HS-02A")!;

export const metadata = buildMetadata({
  title: "TS101 vs FNIRSI HS-02A: Portable Irons",
  description:
    "TS101 vs FNIRSI HS-02A: Miniware's TS100-tip iron with DC input and Boost against FNIRSI's 100 W, 450 °C USB-C kit. Temperature, tips, power, verdict.",
  path: "/soldering-irons/ts101-vs-fnirsi-hs-02a",
  image: hs02a.image,
});

const link = "text-accent hover:underline";

/** Temperature map: each iron's set range against solder melting points and typical working bands. */
function TemperatureMapDiagram() {
  const X = (c: number) => 20 + (c / 500) * 310;
  return (
    <svg
      viewBox="0 0 350 200"
      className="w-full h-auto"
      role="img"
      aria-label="TS101 vs FNIRSI HS-02A temperature ranges: the Miniware TS101 sets 50 to 400 degrees C with a Boost button from 300 to 400, the FNIRSI HS-02A sets 100 to 450 degrees C. Leaded solder melts at 183 C and lead-free SAC305 at about 217 to 220 C; typical tip settings run about 300 to 350 C for leaded and 350 to 400 C for lead-free, both inside each iron's range, with only the HS-02A reaching above 400 C."
    >
      {[0, 100, 200, 300, 400, 500].map((c) => (
        <g key={c}>
          <line x1={X(c)} x2={X(c)} y1="14" y2="168" className="stroke-border" strokeWidth="0.6" strokeDasharray="2 3" />
          <text x={X(c)} y="182" fontSize="8.5" textAnchor="middle" className="fill-muted">{c} °C</text>
        </g>
      ))}
      <text x={X(0)} y="24" fontSize="9" fontWeight="700" className="fill-foreground">Miniware TS101</text>
      <rect x={X(50)} y="30" width={X(400) - X(50)} height="14" rx="3" className="fill-accent/40" />
      <rect x={X(300)} y="30" width={X(400) - X(300)} height="14" rx="3" className="fill-accent" />
      <text x={X(350)} y="40" fontSize="8" textAnchor="middle" className="fill-background">Boost</text>
      <text x={X(52)} y="40" fontSize="8" className="fill-foreground">50–400</text>
      <text x={X(0)} y="64" fontSize="9" fontWeight="700" className="fill-foreground">FNIRSI HS-02A</text>
      <rect x={X(100)} y="70" width={X(450) - X(100)} height="14" rx="3" className="fill-accent/40" />
      <rect x={X(400)} y="70" width={X(450) - X(400)} height="14" rx="3" className="fill-accent" />
      <text x={X(102)} y="80" fontSize="8" className="fill-foreground">100–450</text>
      <text x={X(425)} y="80" fontSize="8" textAnchor="middle" className="fill-background">+50</text>
      <line x1={X(183)} x2={X(183)} y1="96" y2="126" className="stroke-foreground" strokeWidth="1.2" />
      <text x={X(183) - 3} y="106" fontSize="8" textAnchor="end" className="fill-foreground">Sn63/Pb37 melts 183</text>
      <line x1={X(218)} x2={X(218)} y1="96" y2="126" className="stroke-foreground" strokeWidth="1.2" strokeDasharray="3 2" />
      <text x={X(218) + 3} y="118" fontSize="8" className="fill-foreground">SAC305 ~217–220</text>
      <rect x={X(300)} y="134" width={X(350) - X(300)} height="10" className="fill-muted/40" />
      <text x={X(298)} y="142" fontSize="8" textAnchor="end" className="fill-muted">typical leaded tip</text>
      <rect x={X(350)} y="150" width={X(400) - X(350)} height="10" className="fill-muted/40" />
      <text x={X(348)} y="158" fontSize="8" textAnchor="end" className="fill-muted">typical lead-free tip</text>
      <text x="175" y="196" fontSize="8" textAnchor="middle" className="fill-muted">Typical bands are common starting points, not maker figures.</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "soldering-irons",
  heading: "TS101 vs FNIRSI HS-02A",
  path,
  published: "2026-11-07",
  intro:
    "TS101 vs FNIRSI HS-02A pits two portable irons that both ship with a USB-C charger against each other, and they differ in the details that shape daily use. Miniware's TS101 sets 50 to 400 °C, takes TS100 tips, runs from USB-C PD or a 9 to 24 V DC supply and has a Boost button. FNIRSI's HS-02A sets 100 to 450 °C, is rated at 100 W from USB-C, stores three presets and comes with six tips and a 100 W charger against the TS101's 65 W.",
  a: {
    pick: ts101,
    imageAlt: "Miniware TS101 smart soldering iron kit with 65 W USB-C adapter",
    chooseIf: [
      "You already own TS100 tips, which Miniware says fit the TS101",
      "You want a DC barrel option from 9 to 24 V as well as USB-C",
      "You like a Boost button that jumps from 300 °C to 400 °C on demand",
      "You want to edit a parameter file for custom heating curves",
    ],
  },
  b: {
    pick: hs02a,
    imageAlt: "FNIRSI HS-02A 100 W portable soldering iron kit with six tips",
    chooseIf: [
      "You want headroom to 450 °C for heavy joints",
      "You want the bigger charger in the box: 100 W against 65 W",
      "You switch between set temperatures and want three presets",
      "You want six tip shapes in the kit from day one",
    ],
  },
  extraSpecs: [
    { label: "Temperature range", a: "50–400 °C", b: "100–450 °C" },
    { label: "USB-C input", a: "PD3.0, 9–20 V", b: "PD or QC, 9–20 V" },
    { label: "DC barrel input", a: "9–24 V", b: "None" },
    { label: "Rated power", a: "Conflicting: 65 W (listing field), PD up to 100 W (bullets)", b: "100 W max" },
    { label: "Charger in the kit", a: "65 W USB-C", b: "100 W" },
    { label: "Quick temperature change", a: "Boost button, 300 °C to 400 °C", b: "Three stored presets" },
    { label: "Display", a: "OLED", b: "0.96-inch IPS color" },
    { label: "Tips", a: "TS100 tips fit", b: "Six in the kit: K, KU, JS, I, C2, B" },
    { label: "Sleep and safety", a: "Motion sensor sleep, overheat warning", b: "Sleep, auto power-off, child lock" },
    { label: "Calibration", a: "Not stated", b: "Built in" },
    { label: "Weight", a: "Not stated", b: "61 g" },
  ],
  differences: [
    "Temperature: the HS-02A reaches 450 °C, 50 °C above the TS101's 400 °C ceiling; the TS101 goes lower, to 50 °C against 100 °C.",
    "Power input: the TS101 adds a 9–24 V DC input; the HS-02A runs from USB-C only but lists QC as well as PD.",
    "Kit charger: 100 W with the HS-02A, 65 W with the TS101.",
    "Tips: the TS101 takes the long-established TS100 range; the HS-02A uses FNIRSI's own tips and ships with six.",
    "Controls: a Boost button on the TS101, three presets and calibration on the HS-02A.",
    "Firmware: Miniware describes the TS101's code as open source with an editable parameter file; FNIRSI doesn't say that about the HS-02A.",
    "Sources: the TS101's specs come only from its Amazon listing, which states its power two ways. FNIRSI publishes the HS-02A's specs on its own site.",
    "Neither carries our Hands-on Tested badge; this is desk research from the makers' pages and Amazon listings.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">TS101 vs FNIRSI HS-02A: temperature reach</h2>
        <p className="text-muted leading-7 mb-4">
          Both ranges cover normal electronics work. Eutectic Sn63/Pb37 solder melts at 183 °C and SAC305 lead-free at about
          217 to 220 °C, and common starting tip settings sit around 300 to 350 °C for leaded and 350 to 400 °C for
          lead-free. The difference is at the top. Only the HS-02A can go past 400 °C.
        </p>
        <Figure caption={<>Set ranges per Miniware&apos;s Amazon listing and FNIRSI&apos;s site, against standard solder melting points. The bands below the ranges are typical starting points.</>}>
          <TemperatureMapDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Those last 50 °C help with heavy, lead-free joints, where the TS101 is already at its limit. The TS101&apos;s Boost
          button covers a related case from the other side: hold it, and Miniware says the tip rises from 300 °C to 400 °C
          within a short time. For the reasoning behind tip temperature, see{" "}
          <Link href="/soldering-irons/soldering-iron-temperature-by-metal" className={link}>
            soldering iron temperature by metal
          </Link>{" "}
          and{" "}
          <Link href="/soldering-irons/leaded-vs-lead-free-solder" className={link}>
            leaded vs lead-free solder
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Charger supplied in each kit.</>}>
            <BarChart
              items={[
                { label: "FNIRSI HS-02A", value: 100, display: "100 W", highlight: true },
                { label: "Miniware TS101", value: 65, display: "65 W" },
              ]}
            />
          </Figure>
          <Figure caption={<>Highest set temperature.</>}>
            <BarChart
              items={[
                { label: "FNIRSI HS-02A", value: 450, display: "450 °C", highlight: true },
                { label: "Miniware TS101", value: 400, display: "400 °C" },
              ]}
            />
          </Figure>
          <Figure caption={<>Highest input voltage each iron accepts. The TS101&apos;s 24 V is on its DC input.</>}>
            <BarChart
              items={[
                { label: "Miniware TS101", value: 24, display: "24 V DC", highlight: true },
                { label: "FNIRSI HS-02A", value: 20, display: "20 V USB-C" },
              ]}
            />
          </Figure>
          <Figure caption={<>Lowest set temperature.</>}>
            <BarChart
              items={[
                { label: "Miniware TS101", value: 50, display: "50 °C", highlight: true },
                { label: "FNIRSI HS-02A", value: 100, display: "100 °C" },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Tips: an established range against a full kit</h2>
        <p className="text-muted leading-7 mb-4">
          Miniware says TS100 tips fit the TS101. If you
          owned a TS100, your tips carry over, and you pick the shapes yourself. FNIRSI takes the opposite approach: its own tip
          design, with six shapes in the HS-02A kit (K, KU, JS, I, C2 and B). That covers knife, chisel and fine conical work
          on day one. The catch is that FNIRSI lists a different tip set for the HS-02B (I, IS and K), so check you buy
          HS-02A tips.
        </p>
        <KeyIdea title="Count the tips you will actually use">
          Most electronics work runs on two or three tips: a fine conical or bevel for small pads, a chisel for general
          joints and a broad knife or chisel for wires and ground planes. The HS-02A kit covers that range. With the TS101
          you choose your own TS100 tips, which suits someone who already knows the shapes they like.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The wattage question with the TS101</h2>
        <p className="text-muted leading-7 mb-4">
          Miniware&apos;s site is unreachable, so the TS101&apos;s specs come from its Amazon listing, and that listing states
          power two ways. The Wattage field says 65 W, matching the adapter in the box. A bullet says USB-C &quot;PD power up
          to 100W&quot;. We don&apos;t quote either as the iron&apos;s rating. In practice the 65 W adapter sets the ceiling
          until you supply something bigger. FNIRSI&apos;s 100 W rating is on its own product page, and its kit charger
          matches it.
        </p>
        <p className="text-muted leading-7 mb-4">
          The TS101 does have one power trick the HS-02A lacks: a DC input up to 24 V, so a laptop brick or a bench supply
          works as well as a USB-C charger. The HS-02A needs a USB-C PD or QC source every time.
        </p>
        <Callout title="Portable irons and safe handling">
          Both tips reach at least 400 °C. Use a stand every time you put the iron down, keep the cable away from the hot
          end, and unplug the iron when you leave the bench. The HS-02A&apos;s child lock and auto power-off and the
          TS101&apos;s motion-sensing sleep help, but don&apos;t replace unplugging. Work with ventilation or a fume extractor
          to keep flux smoke away from your face.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Pick", "Why"]}
          rows={[
            ["Upgrading from a TS100 with a drawer of tips", "Miniware TS101", "TS100 tips fit"],
            ["Heavy lead-free joints and thick wire", "FNIRSI HS-02A", "450 °C ceiling and a 100 W charger"],
            ["Running from a 19 V laptop brick or bench supply", "Miniware TS101", "DC input from 9 to 24 V"],
            ["Switching between two or three temperatures through the day", "FNIRSI HS-02A", "Three stored presets"],
            ["Wanting to tune heating behavior yourself", "Miniware TS101", "Open-source code and an editable parameter file"],
            ["A complete kit for a first portable iron", "FNIRSI HS-02A", "Six tips, charger and stand in the box"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The TS101 against Pine64&apos;s iron is covered in{" "}
          <Link href="/soldering-irons/pinecil-v2-vs-ts101-soldering-iron" className={link}>
            Pinecil V2 vs TS101
          </Link>
          , and the HS-02A against it in{" "}
          <Link href="/soldering-irons/fnirsi-hs-02a-vs-pinecil-v2" className={link}>
            FNIRSI HS-02A vs Pinecil V2
          </Link>
          . For tip shapes in depth, see our{" "}
          <Link href="/soldering-irons/soldering-iron-tip-types" className={link}>
            soldering iron tip types guide
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Buy the FNIRSI HS-02A for the higher ceiling and the fuller kit: 100 to 450 °C, a 100 W rating stated on FNIRSI's site, a 100 W charger, six tips and three presets. Buy the Miniware TS101 if you already have TS100 tips, want a 9 to 24 V DC input or like a Boost button and editable firmware, and can live with power figures stated only on its Amazon listing.",
  chooseNeitherIf:
    "You want a portable iron with a clearly published power figure and the lightest body. The Pinecil V2 lists 88 W at 24 V and weighs 28 g with its tip, though it ships without a charger, stand or extra tips.",
  faqs: [
    {
      question: "Is the FNIRSI HS-02A better than the Miniware TS101?",
      answer:
        "On published figures the HS-02A has the higher temperature ceiling (450 °C against 400 °C), the bigger kit charger (100 W against 65 W), presets and calibration. The TS101 wins on tip availability, since TS100 tips fit, and on input flexibility, with a 9 to 24 V DC jack. Which is better depends on those needs.",
    },
    {
      question: "Do TS100 tips fit the FNIRSI HS-02A?",
      answer:
        "FNIRSI doesn't say they do. It lists its own tips for the HS-02A (I, JS, K, KU, B and C2) and a different set for the HS-02B. Miniware says TS100 tips fit the TS101. If you have a drawer of TS100 tips, the TS101 is the iron that uses them.",
    },
    {
      question: "How many watts is the Miniware TS101?",
      answer:
        "Its Amazon listing gives two answers: 65 W in the Wattage field and \"PD power up to 100W\" in a bullet. Miniware's own site is unreachable, so we can't settle it. The kit's 65 W USB-C adapter sets the practical ceiling unless you use a larger PD charger or a DC supply.",
    },
    {
      question: "Can the TS101 run from a laptop power brick?",
      answer:
        "Yes, if the brick's voltage is between 9 and 24 V and its plug fits the TS101's DC input. Miniware lists DC 9 to 24 V alongside USB-C PD 9 to 20 V. The HS-02A only accepts USB-C, so it needs a PD or QC charger or power bank.",
    },
    {
      question: "Which is better for lead-free solder?",
      answer:
        "Both cover typical lead-free work, which usually starts around 350 to 400 °C with SAC305 melting near 217 to 220 °C. The HS-02A has more headroom with a 450 °C ceiling. The TS101 tops out at 400 °C, which its Boost button reaches from 300 °C, so heavy lead-free joints push it to its limit.",
    },
  ],
  roundup: { label: "See all soldering iron picks", href: "/soldering-irons/best-soldering-irons" },
  related: [
    { label: "FNIRSI HS-02A vs Pinecil V2", href: "/soldering-irons/fnirsi-hs-02a-vs-pinecil-v2" },
    { label: "Pinecil V2 vs TS101", href: "/soldering-irons/pinecil-v2-vs-ts101-soldering-iron" },
    { label: "Pinecil V2 review", href: "/soldering-irons/pinecil-v2-review" },
    { label: "Soldering iron tip types", href: "/soldering-irons/soldering-iron-tip-types" },
    { label: "Soldering iron temperature by metal", href: "/soldering-irons/soldering-iron-temperature-by-metal" },
    { label: "Leaded vs lead-free solder", href: "/soldering-irons/leaded-vs-lead-free-solder" },
    { label: "What wattage soldering iron do I need?", href: "/soldering-irons/what-wattage-soldering-iron-do-i-need" },
  ],
};

export default function Ts101VsFnirsiHs02aPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="soldering-irons" current={path} />
    </>
  );
}
