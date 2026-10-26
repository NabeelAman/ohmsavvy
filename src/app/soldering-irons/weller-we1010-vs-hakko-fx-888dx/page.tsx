// Specs per maker sources:
// - Weller WE1010NA 120V: https://www.weller-tools.com/us/en/industrial-soldering/products/soldering-stations/we1010na-120v
//   (checked 2026-10-26: 85 W station, 70 W WEP 70 iron, 100-450 °C / 200-850 °F, 28 s from 50 to 350 °C, accuracy ±5 °C,
//   stability ±6 °C, ESD safe, ET tips, standby mode and auto setback, password-protected settings, 150 × 120 × 98 mm, 1.40 kg,
//   heat-resistant silicone cable, PH 70 safety rest in the box).
// - Hakko FX-888DX: Pick note per hakkousa.com (100 W/120 VAC station, FX-8801 65 W iron, T18 tips, 50-480 °C, ±1 °C idle
//   stability, ESD safe, five presets, rotary dial, parameter lock, drives other Hakko handpieces; station 1.2 kg,
//   100 × 120 × 120 mm; tip-to-ground under 2 Ω). hakkousa.com returned 403 to our fetch on 2026-10-26, so no new Hakko facts
//   were added. Hakko states no heat-up time and no sleep or standby mode for the FX-888DX.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-soldering-irons/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/soldering-irons/weller-we1010-vs-hakko-fx-888dx";

export const metadata = buildMetadata({
  title: "Weller WE1010 vs Hakko FX-888DX",
  description:
    "Weller WE1010 vs Hakko FX-888DX: two ESD-safe digital bench stations compared on power, temperature range, presets, standby, tips and who should buy which.",
  path: "/soldering-irons/weller-we1010-vs-hakko-fx-888dx",
});

const link = "text-accent hover:underline";

/** Both published set-point ranges on one °C axis, showing where only the Hakko reaches. */
function RangeOverlapDiagram() {
  const x0 = 30;
  const x1 = 320;
  const t0 = 0;
  const t1 = 500;
  const x = (t: number) => x0 + ((t - t0) / (t1 - t0)) * (x1 - x0);
  return (
    <svg
      viewBox="0 0 340 170"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram: on a 0 to 500 °C axis, the Weller WE1010 sets 100 to 450 °C and the Hakko FX-888DX sets 50 to 480 °C, so only the Hakko covers 50 to 100 °C and 450 to 480 °C; the common lead-free working band of roughly 320 to 380 °C sits inside both"
    >
      <rect x={x(320)} y="18" width={x(380) - x(320)} height="104" rx="4" className="fill-accent/10" />
      <text x={(x(320) + x(380)) / 2} y="14" fontSize="8.5" textAnchor="middle" className="fill-muted">
        typical lead-free band
      </text>
      <text x={x0} y="38" fontSize="9.5" fontWeight="700" className="fill-foreground">
        Hakko FX-888DX: 50–480°C
      </text>
      <rect x={x(50)} y="44" width={x(480) - x(50)} height="16" rx="4" className="fill-accent" />
      <text x={x0} y="84" fontSize="9.5" fontWeight="700" className="fill-foreground">
        Weller WE1010: 100–450°C
      </text>
      <rect x={x(100)} y="90" width={x(450) - x(100)} height="16" rx="4" className="fill-foreground/70" />
      <rect x={x(50)} y="88" width={x(100) - x(50)} height="20" rx="3" className="fill-none stroke-accent" strokeDasharray="3 2" strokeWidth="1.2" />
      <rect x={x(450)} y="88" width={x(480) - x(450)} height="20" rx="3" className="fill-none stroke-accent" strokeDasharray="3 2" strokeWidth="1.2" />
      <line x1={x0} x2={x1} y1="132" y2="132" className="stroke-border" strokeWidth="1" />
      {[0, 100, 200, 300, 400, 500].map((t) => (
        <g key={t}>
          <line x1={x(t)} x2={x(t)} y1="129" y2="135" className="stroke-border" strokeWidth="1" />
          <text x={x(t)} y="147" fontSize="8.5" textAnchor="middle" className="fill-muted">
            {t}°C
          </text>
        </g>
      ))}
      <text x="170" y="164" fontSize="8.5" textAnchor="middle" className="fill-muted">
        Dashed boxes: settings only the Hakko offers
      </text>
    </svg>
  );
}

/** Illustrative standby timeline: what auto setback does to tip temperature during an idle gap. */
function SetbackTimeline() {
  return (
    <svg
      viewBox="0 0 340 160"
      className="w-full h-auto"
      role="img"
      aria-label="Illustrative timeline: the Weller tip holds its working temperature while soldering, drops to a lower setback temperature after the iron sits idle in standby, then reheats when picked up; a station without standby holds full temperature through the whole idle gap"
    >
      <line x1="30" y1="130" x2="320" y2="130" className="stroke-border" strokeWidth="1" />
      <line x1="30" y1="20" x2="30" y2="130" className="stroke-border" strokeWidth="1" />
      <text x="34" y="16" fontSize="8.5" className="fill-muted">tip temperature</text>
      <text x="318" y="144" fontSize="8.5" textAnchor="end" className="fill-muted">time</text>
      <polyline points="30,40 320,40" className="fill-none stroke-muted" strokeWidth="1.5" strokeDasharray="5 4" />
      <text x="318" y="34" fontSize="8.5" textAnchor="end" className="fill-muted">no standby: full heat while idle</text>
      <polyline points="30,40 100,40 125,90 220,90 240,40 320,40" className="fill-none stroke-accent" strokeWidth="2.2" strokeLinejoin="round" />
      <text x="172" y="84" fontSize="8.5" textAnchor="middle" className="fill-accent">setback temperature</text>
      <text x="65" y="58" fontSize="8.5" textAnchor="middle" className="fill-foreground">soldering</text>
      <text x="172" y="112" fontSize="8.5" textAnchor="middle" className="fill-foreground">iron idle in its stand</text>
      <text x="280" y="58" fontSize="8.5" textAnchor="middle" className="fill-foreground">picked up, reheats</text>
      <line x1="100" y1="125" x2="220" y2="125" className="stroke-foreground" strokeWidth="1" />
      <line x1="100" y1="121" x2="100" y2="129" className="stroke-foreground" strokeWidth="1" />
      <line x1="220" y1="121" x2="220" y2="129" className="stroke-foreground" strokeWidth="1" />
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "soldering-irons",
  heading: "Weller WE1010 vs Hakko FX-888DX",
  path,
  published: "2026-10-22",
  updated: "2026-10-26",
  intro:
    "Weller WE1010 vs Hakko FX-888DX is the current-generation bench station match-up. Both are ESD safe digital stations with a 65–70W iron. The Hakko adds a 100W station, a wider 50–480°C range and five presets; the Weller (sold in the US as the WE1010NA kit) answers with standby and auto setback, password-protected settings and a published 28-second heat-up. Pick the Hakko for range, presets and T18 tips; pick the Weller for a shared bench where idle tips and fiddled settings cost money.",
  a: {
    pick: picks.find((p) => p.name === "Weller WE1010NA")!,
    reviewHref: "/soldering-irons/weller-we1010na-review",
    imageAlt: "Weller WE1010NA digital soldering station",
    chooseIf: [
      "You want standby with automatic setback to save tips between joints",
      "You want password-protected settings on a shared bench",
      "You want a published heat-up time: about 28 seconds from 50 to 350°C",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Hakko FX-888DX")!,
    imageAlt: "Hakko FX-888DX digital soldering station, front view",
    chooseIf: [
      "You want five temperature presets and a rotary dial",
      "You need settings below 100°C or up to 480°C",
      "You already own T18 tips from an FX-888D",
    ],
  },
  extraSpecs: [
    { label: "Station power", a: "85W station (70W WEP 70 iron)", b: "100W station (65W FX-8801 iron)" },
    { label: "Temperature range", a: "100–450°C (200–850°F)", b: "50–480°C" },
    { label: "Heat-up time", a: "About 28 s (50–350°C)", b: "Not stated by Hakko" },
    { label: "Temperature figures", a: "Accuracy ±5°C, stability ±6°C", b: "±1°C at idle" },
    { label: "Tips", a: "Weller ET series", b: "Hakko T18 series" },
    { label: "Presets / lock", a: "Password-protected settings", b: "Five presets, parameter lock" },
    { label: "Standby", a: "Standby with auto setback", b: "Not stated by Hakko" },
    { label: "Other handpieces", a: "Not stated", b: "Drives Hakko tweezers, solder gun and larger irons" },
    { label: "ESD safe", a: "Yes", b: "Yes, tip-to-ground under 2 Ω" },
    { label: "Station size / weight", a: "150 × 120 × 98 mm; 1.40 kg", b: "100 × 120 × 120 mm; 1.2 kg" },
  ],
  differences: [
    "The Hakko station is rated 100W against the Weller's 85W station; the irons themselves are 65W (Hakko) and 70W (Weller).",
    "Hakko's 50–480°C range is wider at both ends than Weller's 100–450°C.",
    "Weller lists standby with automatic setback; Hakko doesn't state a sleep or standby mode for the FX-888DX.",
    "Hakko stores five temperature presets; Weller protects its settings with a password.",
    "They use different tips: Weller ET versus Hakko T18, which matters if you already own one system.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">At a glance</h2>
        <InfoCards
          items={[
            { label: "Shared ground", desc: "ESD-safe digital stations, single channel, 65–70W pencil irons." },
            { label: "Hakko lead", desc: "100W station, 50–480°C, five presets, ±1°C idle figure." },
            { label: "Weller lead", desc: "Standby with setback, password lock, 28 s published heat-up." },
            { label: "Tips", desc: "Weller ET against Hakko T18: the long-term running cost." },
            { label: "Footprint", desc: "Weller is wider and heavier: 1.40 kg against 1.2 kg." },
            { label: "Verdict", desc: "Home or repair bench: Hakko. Shared or production bench: Weller." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Neither station has been bought and tested by OhmSavvy, so this comparison is desk research against
          Weller&apos;s and Hakko&apos;s published specifications. Where a maker doesn&apos;t publish a number, the
          table says so instead of guessing.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Weller WE1010 vs Hakko FX-888DX spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          On raw numbers the Hakko leads on station power and on range at both ends, while the Weller is the only one of
          the pair with a published warm-up time. The two figures below show the gaps that actually change how the
          stations behave on a bench.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Station power rating, W, per each maker. The irons are closer: 65W Hakko, 70W Weller.</>}>
            <BarChart
              items={[
                { label: "Hakko FX-888DX", value: 100, display: "100W", highlight: true },
                { label: "Weller WE1010", value: 85, display: "85W" },
              ]}
            />
          </Figure>
          <Figure caption={<>Width of the published set-point range, °C. Hakko adds 50°C at the bottom and 30°C at the top.</>}>
            <BarChart
              items={[
                { label: "Hakko (50–480°C)", value: 430, display: "430°C span", highlight: true },
                { label: "Weller (100–450°C)", value: 350, display: "350°C span" },
              ]}
            />
          </Figure>
          <Figure caption={<>Published temperature tolerance, ±°C. Not a like-for-like test: Hakko quotes idle stability, Weller quotes accuracy and stability.</>}>
            <BarChart
              items={[
                { label: "Hakko, idle stability", value: 1, display: "±1°C", highlight: true },
                { label: "Weller, accuracy", value: 5, display: "±5°C" },
                { label: "Weller, stability", value: 6, display: "±6°C" },
              ]}
            />
          </Figure>
          <Figure caption={<>Station weight, kg. The Weller&apos;s case is also wider: 150 mm against Hakko&apos;s 100 mm.</>}>
            <BarChart
              items={[
                { label: "Weller WE1010", value: 1.4, display: "1.40 kg" },
                { label: "Hakko FX-888DX", value: 1.2, display: "1.2 kg", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <div className="mt-4">
          <KeyIdea title="Reading the tolerance numbers fairly">
            Hakko&apos;s ±1°C describes how steady the tip holds when nothing is touching it. Weller&apos;s ±5°C says how
            close the displayed set point is to the real tip temperature, and its ±6°C covers drift. A smaller figure is
            better, but the makers aren&apos;t measuring the same thing, so treat the chart as a hint, not a verdict. A
            tip thermometer settles the question on your own bench.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where the temperature ranges differ</h2>
        <p className="text-muted leading-7 mb-4">
          Most electronics work happens well inside both ranges. Lead-free solder is commonly run somewhere around 320 to
          380°C and tin-lead lower, so either station covers everyday joints. The extra Hakko range lives at the edges:
          settings under 100°C suit gentle jobs such as working with low-melt alloys near heat-sensitive plastic, and
          the top 30°C helps when a large tip has to push heat into a big ground pour.
        </p>
        <Figure caption={<>Both set-point ranges on one axis. The shaded band is a typical lead-free working range, not a maker figure.</>}>
          <RangeOverlapDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Turning the iron up is rarely the best fix for a stubborn joint, though. A wider tip carries more heat at a
          lower setting and is kinder to pads. Our chart of{" "}
          <Link href="/soldering-irons/soldering-iron-temperature-by-metal" className={link}>
            soldering iron temperature by metal
          </Link>{" "}
          gives starting points by alloy.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What standby and setback actually save</h2>
        <p className="text-muted leading-7 mb-4">
          A tip sitting at full heat in its stand oxidizes faster, and flux burns off between joints. Weller&apos;s standby
          mode with auto setback drops the tip to a lower temperature when the iron has been idle, then brings it back up
          when you pick it up again. Weller says this conserves energy and protects the equipment. Hakko doesn&apos;t state
          an equivalent feature for the FX-888DX, so on that station the habit falls to you: tin the tip and turn the
          dial down when you step away.
        </p>
        <Figure caption={<>Illustrative only: the shape of a setback cycle. Weller doesn&apos;t publish the setback temperature or delay on its product page.</>}>
          <SetbackTimeline />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          On a bench used all day by several people, those idle stretches add up to hours, which is where setback earns
          its keep. If your own iron seems to switch itself off or cool unexpectedly, read{" "}
          <Link href="/soldering-irons/why-does-my-soldering-iron-keep-switching-off" className={link}>
            why a soldering iron keeps switching off
          </Link>
          ; standby features are a common cause. Tip life tips are in our{" "}
          <Link href="/soldering-irons/soldering-iron-tip-care" className={link}>
            soldering iron tip care
          </Link>{" "}
          guide.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Weller WE1010 vs Hakko FX-888DX: which should you buy?</h2>
        <DataTable
          head={["Bench", "Better fit", "Why"]}
          rows={[
            ["Shared lab or classroom", "Weller WE1010", "Password-protected settings, standby and setback"],
            ["Mixed work with frequent temperature changes", "Hakko FX-888DX", "Five presets and a rotary dial"],
            ["Very low-temperature work", "Hakko FX-888DX", "Settings from 50°C"],
            ["Upgrading from an FX-888D", "Hakko FX-888DX", "Same T18 tips and FX-8801 handpiece"],
            ["Already stocked with Weller ET tips", "Weller WE1010", "Stay in the tip system you own"],
            ["Plans to add tweezers or a heavier iron later", "Hakko FX-888DX", "Hakko says it drives other Hakko handpieces"],
            ["Tight bench space", "Hakko FX-888DX", "100 mm wide and 1.2 kg"],
            ["Wants a published heat-up figure", "Weller WE1010", "About 28 s from 50 to 350°C"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Use cases in practice</h2>
        <p className="text-muted leading-7 mb-4">
          A home repair bench that moves from fine SMD rework to a chunky XT60 connector in one evening benefits most from
          the Hakko&apos;s presets: store a low, a middle and a high setting and switch with a press instead of spinning
          through 100 degrees. The FX-888DX&apos;s ability to drive other Hakko handpieces also gives a growth path
          without a second station.
        </p>
        <p className="text-muted leading-7 mb-4">
          A school lab, maker space or production line has different problems: settings that wander because someone
          turned them up, and tips left baking at full heat. The WE1010&apos;s password lock and auto setback answer both,
          and its published accuracy and stability figures make it easier to document a process.
        </p>
        <KeyIdea title="Tip ecosystems matter more than the station">
          Over a station&apos;s life you&apos;ll buy many tips, so stay with the system you already own. Our{" "}
          <Link href="/soldering-irons/soldering-iron-tip-types" className={link}>
            guide to soldering iron tip types
          </Link>{" "}
          explains which shapes to start with, and{" "}
          <Link href="/soldering-irons/soldering-iron-vs-soldering-station" className={link}>
            soldering iron vs soldering station
          </Link>{" "}
          covers whether you need a station at all.
        </KeyIdea>
      </section>

      <Callout title="Safety: both tips reach 450°C or more">
        Either iron can burn skin instantly and ignite paper or flux-soaked rags, so keep the iron in its stand whenever it
        isn&apos;t in your hand and switch the station off at the end of a session. Plug both into a grounded three-prong
        outlet; without the earth connection the ESD path doesn&apos;t work. Ventilate or extract flux fumes, and wash your
        hands after handling leaded solder.
      </Callout>
    </>
  ),
  bottomLine:
    "Choose the Hakko FX-888DX for more power, a wider range, presets and compatibility with FX-888D tips. Choose the Weller WE1010 for a shared or professional bench where standby, auto setback and password-protected settings matter more than raw range.",
  faqs: [
    {
      question: "Is the Weller WE1010 the same as the WE1010NA?",
      answer:
        "Yes, in the US. WE1010NA is the North American 120V kit of the WE1010 station, supplied with the 70W WEP 70 iron and PH 70 safety rest. The specs on this page come from Weller's WE1010NA 120V product page, so check the voltage on any listing that isn't marked NA before you buy.",
    },
    {
      question: "Which station heats up faster, the WE1010 or FX-888DX?",
      answer:
        "Weller states about 28 seconds to go from 50 to 350°C. Hakko doesn't publish a heat-up time for the FX-888DX, so there's no fair way to compare them on paper. The Hakko's 100W station gives it more power in reserve, but warm-up also depends on the heater, tip size and control loop.",
    },
    {
      question: "Are both stations ESD safe?",
      answer:
        "Yes. Weller lists the WE1010 as an ESD-safe station with a heat-resistant silicone cable, and Hakko lists the FX-888DX as ESD safe with tip-to-ground resistance under 2 Ω. That protection only works when the station is plugged into a properly grounded three-prong outlet, not through a two-prong adapter.",
    },
    {
      question: "Can I use FX-888D tips on the FX-888DX?",
      answer:
        "Yes. The FX-888DX keeps the FX-8801 handpiece and T18 tips used by the FX-888D, so a drawer of existing tips carries straight over. That compatibility is the strongest reason for an FX-888D owner to stay with Hakko rather than switch to the Weller, whose WEP 70 iron takes ET-series tips instead.",
    },
    {
      question: "Does the Hakko FX-888DX have a sleep mode?",
      answer:
        "Hakko doesn't state a sleep, standby or auto-off mode for the FX-888DX on its product page, so assume it holds the set temperature until you turn it down. Weller lists standby with automatic setback for the WE1010, which lowers the tip temperature during idle periods to save energy and tip life.",
    },
  ],
  roundup: { label: "See the full soldering iron roundup", href: "/soldering-irons/best-soldering-irons" },
  related: [
    { label: "Weller WE1010NA review", href: "/soldering-irons/weller-we1010na-review" },
    { label: "Hakko FX888D vs Weller WE1010NA", href: "/soldering-irons/hakko-fx888d-vs-weller-we1010na" },
    { label: "Weller WE1010NA vs YIHUA 862BD+", href: "/soldering-irons/weller-we1010na-vs-yihua-862bd-plus" },
    { label: "Pinecil V2 vs TS101 Soldering Iron", href: "/soldering-irons/pinecil-v2-vs-ts101-soldering-iron" },
    { label: "Best soldering iron for circuit board repair", href: "/soldering-irons/best-soldering-iron-for-circuit-board-repair" },
  ],
};

export default function WellerWe1010VsHakkoFx888dxPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="soldering-irons" current={path} />
    </>
  );
}
