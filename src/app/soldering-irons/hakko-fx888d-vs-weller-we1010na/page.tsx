// Specs per maker sources:
// - Hakko FX888D: hakkousa.com FX-888D page, as recorded on the Pick (70 W/120 VAC station, 65 W/26 VAC iron, ESD safe,
//   tip-to-ground under 2 ohms, T18 tips, status Discontinued, replaced by the FX-888DX). Amazon lists it as currently
//   unavailable (Pick `unavailable` note). Hakko's temperature range for the FX888D is not in our sources: shown as Not stated.
// - Hakko FX-888DX: Pick note per hakkousa.com (100 W station, FX-8801 65 W iron, T18 tips, 50-480 °C, ±1 °C idle, ESD safe,
//   five presets, parameter lock; station 1.2 kg).
// - Weller WE1010NA 120V: https://www.weller-tools.com/us/en/industrial-soldering/products/soldering-stations/we1010na-120v
//   (checked 2026-10-26: 85 W station, 70 W WEP 70 iron, 100-450 °C, 28 s from 50 to 350 °C, accuracy ±5 °C, stability ±6 °C,
//   ESD safe, ET tips, standby and auto setback, password-protected settings, 1.40 kg, 150 × 120 × 98 mm).
// Correction 2026-10-26: the old page called the WE1010NA a 70 W station; Weller rates the station 85 W and the iron 70 W.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-soldering-irons/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/soldering-irons/hakko-fx888d-vs-weller-we1010na";

export const metadata = buildMetadata({
  title: "Hakko FX888D vs Weller WE1010NA",
  description:
    "Hakko FX888D vs Weller WE1010NA: both ESD-safe digital stations, but the FX888D is discontinued. Specs, power charts and when to buy the WE1010NA or FX-888DX.",
  path: "/soldering-irons/hakko-fx888d-vs-weller-we1010na",
});

const link = "text-accent hover:underline";

/** How an ESD-safe station drains static: tip to earth through a low-resistance path. */
function GroundPathDiagram() {
  const nodes = [
    { x: 30, label: "Tip", sub: "touches the joint" },
    { x: 105, label: "Handpiece", sub: "heater + sensor" },
    { x: 180, label: "Station", sub: "ground bond" },
    { x: 255, label: "Earth pin", sub: "3-prong outlet" },
  ];
  return (
    <svg
      viewBox="0 0 340 170"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram: in an ESD-safe soldering station, the tip is bonded through the handpiece and station to the earth pin of a three-prong outlet, so static charge drains away instead of passing through a sensitive chip. Hakko specifies under 2 ohms tip-to-ground for the FX888D; Weller lists the WE1010NA as ESD safe without a published figure"
    >
      {nodes.map((n, i) => (
        <g key={n.label}>
          <rect x={n.x} y="40" width="62" height="40" rx="8" className={i === 0 ? "fill-accent/15 stroke-accent" : "fill-surface stroke-border"} strokeWidth="1.3" />
          <text x={n.x + 31} y="58" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">
            {n.label}
          </text>
          <text x={n.x + 31} y="72" fontSize="7.5" textAnchor="middle" className="fill-muted">
            {n.sub}
          </text>
          {i < nodes.length - 1 && <path d={`M${n.x + 62} 60 H${n.x + 75}`} className="stroke-accent" strokeWidth="2.4" />}
        </g>
      ))}
      <path d="M286 80 V108 M274 108 H298 M278 114 H294 M282 120 H290" className="stroke-foreground" strokeWidth="1.6" />
      <text x="170" y="22" fontSize="9.5" textAnchor="middle" className="fill-muted">static charge drains along this path, not through the chip</text>
      <text x="20" y="145" fontSize="9" className="fill-foreground">Hakko FX888D: tip-to-ground under 2 Ω (maker spec)</text>
      <text x="20" y="160" fontSize="9" className="fill-foreground">Weller WE1010NA: listed ESD safe; no ohm figure on its page</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "soldering-irons",
  heading: "Hakko FX888D vs Weller WE1010NA",
  path,
  published: "2026-10-26",
  intro:
    "Buy the Weller WE1010NA today: the Hakko FX888D is discontinued, Amazon lists it as unavailable, and Hakko's own replacement is the FX-888DX. On paper the two are close. Both are ESD-safe digital stations with a 65–70W iron; the FX888D station is rated 70W, the WE1010NA 85W. The Weller adds published accuracy figures, a 28-second heat-up, standby with auto setback and password-locked settings. If you already own an FX888D, it remains a fine station, and its T18 tips carry over to the FX-888DX.",
  a: {
    pick: picks.find((p) => p.name === "Hakko FX888D")!,
    reviewHref: "/soldering-irons/hakko-fx888d-review",
    imageAlt: "Hakko FX888D soldering station handpiece",
    chooseIf: [
      "You already own one: it still works, and new T18 tips remain available because the FX-888DX uses them",
      "You find a genuine unit from an authorized seller, knowing Hakko no longer makes it",
      "You'd rather stay with Hakko: the FX-888DX keeps the T18 tips and adds a 100W station",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Weller WE1010NA")!,
    reviewHref: "/soldering-irons/weller-we1010na-review",
    imageAlt: "Weller WE1010NA digital soldering station with WEP 70 iron",
    chooseIf: [
      "You want a station that is in production and sold new on Amazon",
      "You want standby with auto setback to protect tips, and password-locked settings on a shared bench",
      "You want published numbers: ±5°C accuracy, ±6°C stability and a 28-second heat-up",
    ],
  },
  extraSpecs: [
    { label: "Status", a: "Discontinued; Amazon lists it unavailable", b: "Current model" },
    { label: "Station power", a: "70W (120VAC)", b: "85W (120V)" },
    { label: "Iron", a: "65W (26VAC)", b: "70W WEP 70" },
    { label: "Temperature range", a: "Not stated in our sources", b: "100–450°C" },
    { label: "Heat-up time", a: "Not stated by Hakko", b: "About 28 s, 50 to 350°C" },
    { label: "Accuracy / stability", a: "Not stated in our sources", b: "±5°C / ±6°C" },
    { label: "ESD safe", a: "Yes, tip-to-ground under 2 Ω", b: "Yes" },
    { label: "Tips", a: "Hakko T18 (shared with FX-888DX)", b: "Weller ET series" },
    { label: "Standby / lock", a: "Not stated in our sources", b: "Standby, auto setback, password-protected settings" },
    { label: "Station weight", a: "Not stated in our sources", b: "1.40 kg" },
  ],
  differences: [
    "Availability: Hakko lists the FX888D as discontinued and replaced by the FX-888DX, and Amazon lists it as currently unavailable. The WE1010NA is a current Weller model.",
    "Power: the FX888D station is rated 70W with a 65W iron; Weller rates the WE1010NA station at 85W with a 70W WEP 70 iron.",
    "Both are ESD safe. Hakko publishes a tip-to-ground resistance under 2 Ω for the FX888D; Weller lists the WE1010NA as ESD safe without an ohm figure.",
    "Weller publishes a 28-second heat-up from 50 to 350°C, ±5°C accuracy and ±6°C stability. Hakko gives no heat-up time for the FX888D, so we don't compare them on speed.",
    "The WE1010NA has standby with auto setback and password-protected settings. The FX888D's T18 tips carry over to the FX-888DX, which adds five presets and a parameter lock.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">At a glance</h2>
        <InfoCards
          items={[
            { label: "Same class", desc: "ESD-safe digital bench stations with a 65–70W iron." },
            { label: "FX888D status", desc: "Discontinued by Hakko; Amazon lists it unavailable." },
            { label: "WE1010NA extras", desc: "Standby, auto setback, locked settings and published accuracy." },
            { label: "Hakko path", desc: "FX-888DX: same T18 tips, 100W station, 50–480°C, five presets." },
            { label: "Tips", desc: "Hakko T18 against Weller ET. Pick the range you'll keep buying." },
            { label: "Verdict", desc: "Buying new: WE1010NA or FX-888DX. Own an FX888D: keep it." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The owner has bought and used the FX888D, which is why it keeps a Hands-on Tested badge and a 4.8 rating;
          the WE1010NA assessment is desk research. The specs on this page come from Hakko&apos;s and Weller&apos;s own
          product pages. Full write-ups:{" "}
          <Link href="/soldering-irons/hakko-fx888d-review" className={link}>
            Hakko FX888D review
          </Link>{" "}
          and{" "}
          <Link href="/soldering-irons/weller-we1010na-review" className={link}>
            Weller WE1010NA review
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">FX888D vs WE1010NA spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Hakko published fewer numbers for the FX888D than Weller does for the WE1010NA, so several rows above read
          &quot;Not stated.&quot; The figures both makers do publish are power ratings, charted here alongside the
          FX-888DX that replaced the Hakko.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Rated iron power, W. The irons are within 5W of each other.</>}>
            <BarChart
              items={[
                { label: "Hakko FX888D iron", value: 65, display: "65W" },
                { label: "Hakko FX-888DX iron", value: 65, display: "65W" },
                { label: "Weller WEP 70 iron", value: 70, display: "70W", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Rated station power, W. Hakko&apos;s replacement jumps from 70W to 100W.</>}>
            <BarChart
              items={[
                { label: "Hakko FX888D", value: 70, display: "70W" },
                { label: "Weller WE1010NA", value: 85, display: "85W" },
                { label: "Hakko FX-888DX", value: 100, display: "100W", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          A higher station rating doesn&apos;t make the tip hotter; both irons are temperature-controlled. It matters on
          heavy joints, such as a ground plane or a thick connector pin, where the controller needs spare power to push
          the tip back to its set point after heat drains into the joint. That recovery depends on iron power, heater
          coupling and tip mass, and neither maker publishes a recovery figure. Weller&apos;s ±5°C accuracy means a
          350°C setting should hold the tip between 345 and 355°C at idle.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What &quot;ESD safe&quot; means on both stations</h2>
        <p className="text-muted leading-7 mb-4">
          A static discharge of a few hundred volts, well below what you can feel, can damage a CMOS input without any
          visible sign. An ESD-safe station bonds the tip to earth through the handpiece and the station&apos;s
          three-prong plug, so charge drains away rather than through the part. Hakko states the FX888D&apos;s
          tip-to-ground resistance as under 2 Ω; Weller lists the WE1010NA as ESD safe. Either protects
          microcontrollers and MOSFETs, provided the outlet&apos;s earth is actually connected.
        </p>
        <Figure caption={<>The ground path that makes a soldering station ESD safe.</>}>
          <GroundPathDiagram />
        </Figure>
        <div className="mt-4">
          <KeyIdea title="A two-prong adapter defeats ESD safety">
            Plug either station into a two-prong cheater adapter or an ungrounded outlet and the tip floats. The station
            still heats, so nothing looks wrong, but the ESD path is gone. Check the outlet with a plug-in tester before
            you set up a bench for sensitive work.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Hakko FX888D vs Weller WE1010NA: which should you buy?</h2>
        <DataTable
          head={["Your situation", "Best move", "Why"]}
          rows={[
            ["Buying a first bench station", "Weller WE1010NA or Hakko FX-888DX", "Both current, ESD safe and sold new"],
            ["Already own an FX888D", "Keep it", "It still works, and the current FX-888DX uses the same T18 tips"],
            ["Own a drawer of T18 tips", "Hakko FX-888DX", "Same tips, 100W station, presets and a lock"],
            ["Shared school or lab bench", "Weller WE1010NA", "Password-protected settings and auto setback"],
            ["Want published accuracy figures", "Weller WE1010NA", "±5°C accuracy, ±6°C stability, 28 s heat-up"],
            ["Offered a cheap new FX888D", "Be cautious", "Discontinued and widely counterfeited"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The current-generation match-up is covered in{" "}
          <Link href="/soldering-irons/weller-we1010-vs-hakko-fx-888dx" className={link}>
            Weller WE1010 vs Hakko FX-888DX
          </Link>
          . If you also need hot air, see{" "}
          <Link href="/soldering-irons/weller-we1010na-vs-yihua-862bd-plus" className={link}>
            Weller WE1010NA vs YIHUA 862BD+
          </Link>
          , and for tip shapes, our{" "}
          <Link href="/soldering-irons/soldering-iron-tip-types" className={link}>
            soldering iron tip types
          </Link>{" "}
          guide.
        </p>
      </section>

      <Callout title="Safety: a 450°C tip and a used-market station">
        Both irons run hot enough to burn skin instantly and to ignite paper, so always return the iron to its stand and
        switch the station off when you leave the bench. A secondhand or counterfeit FX888D may have a damaged cord or a
        missing ground bond; inspect the cord and plug, and check continuity from the tip to the plug&apos;s earth pin
        with the station unplugged before you trust it. If a station smells of burning insulation or trips a breaker,
        stop using it.
      </Callout>
    </>
  ),
  bottomLine:
    "On safety and power these two are close: both are ESD safe with a 65–70W iron. Buying new, choose the Weller WE1010NA for standby, locked settings and published accuracy, or the Hakko FX-888DX if you want to stay on T18 tips. Buy an FX888D only as a genuine unit from an authorized seller, and if you already own one, there's no reason to replace it.",
  faqs: [
    {
      question: "Are the Hakko FX888D and Weller WE1010NA both ESD safe?",
      answer:
        "Yes. Hakko lists the FX888D as ESD safe, with a tip-to-ground resistance under 2 ohms, and Weller lists the WE1010NA as ESD safe. Either is suitable for static-sensitive parts such as modern ICs and microcontrollers, as long as it is plugged into a properly grounded three-prong outlet.",
    },
    {
      question: "Is the Hakko FX888D discontinued?",
      answer:
        "Yes. Hakko USA lists it as discontinued and names the FX-888DX as its replacement, and Amazon currently lists the FX888D as unavailable. The FX-888DX uses the same FX-8801 handpiece and T18 tips, so tips you already own carry over if you upgrade.",
    },
    {
      question: "How do I avoid buying a counterfeit Hakko FX888D?",
      answer:
        "Buy only from Hakko's authorized sellers, not from an unfamiliar listing at a price that looks too good. Popular stations attract copies that look identical but may lack a proper ground bond or temperature control. Check that the tip-to-earth-pin resistance is low with the station unplugged, and be wary of any new FX888D now that Hakko no longer makes it.",
    },
    {
      question: "Can I use Hakko T18 tips on the Weller WE1010NA?",
      answer:
        "No. The WE1010NA's WEP 70 iron takes Weller ET series tips, and the FX888D takes Hakko T18 tips. The two ranges aren't interchangeable. If you own many T18 tips, Hakko's FX-888DX is the station that keeps them useful; if you're starting fresh, either tip range offers chisel, conical and bevel shapes.",
    },
    {
      question: "What replaced the Hakko FX888D?",
      answer:
        "The Hakko FX-888DX. Per Hakko, it keeps the 65W FX-8801 iron and T18 tips, raises the station to 100W, covers 50 to 480°C with ±1°C idle stability, swaps the button interface for a rotary dial, stores five presets and adds a parameter lock. It is ESD safe and also drives other Hakko handpieces.",
    },
  ],
  roundup: { label: "See the full soldering iron comparison", href: "/soldering-irons/best-soldering-irons" },
  related: [
    { label: "Hakko FX888D review", href: "/soldering-irons/hakko-fx888d-review" },
    { label: "Weller WE1010NA review", href: "/soldering-irons/weller-we1010na-review" },
    { label: "Weller WE1010 vs Hakko FX-888DX", href: "/soldering-irons/weller-we1010-vs-hakko-fx-888dx" },
    { label: "Weller WE1010NA vs YIHUA 862BD+", href: "/soldering-irons/weller-we1010na-vs-yihua-862bd-plus" },
    { label: "Best soldering iron for circuit board repair", href: "/soldering-irons/best-soldering-iron-for-circuit-board-repair" },
    { label: "Best soldering iron for beginners", href: "/soldering-irons/best-soldering-iron-for-beginners" },
  ],
};

export default function HakkoVsWellerPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="soldering-irons" current={path} />
    </>
  );
}
