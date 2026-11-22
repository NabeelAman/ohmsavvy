// Specs per maker sources, checked 2026-11-19:
// - Pine64 Pinecil V2 Specifications page: https://pine64.org/documentation/Pinecil/Further_information/Specifications/
//   (tip ST-B2, 86mm/8.2g included; dimensions 155mm with tip / 103mm without tip x 12.8mm x 16.2mm; weight 28g with
//   tip, 18g without; power input USB-C PD 12-20V 3A and QC 3.0 12-20V 3A, or DC barrel DC5525 12-24V min 3A, overall
//   12-24V up to 88W; processor Bouffalo BL706 32-bit RISC-V @144MHz; display OLED monochrome 0.69-inch 96x16px;
//   firmware is Ralim's open-source IronOS build; no temperature range or sensor list published on this page).
// - Pine64 Pinecil Features page: https://pine64.org/documentation/Pinecil/Features/ (idle detection, sleep mode of
//   tip, automatic shut-down; no temperature range stated; no motion-sensor or boost claim on this page).
// - Pine64 Pinecil overview page: https://pine64.org/documentation/Pinecil/ (V2 "supports 24V/88W"; BLE in the V2;
//   sleep modes and motion detection mentioned at overview level; no temperature range).
// - Official Amazon listing for this exact ASIN (B096X6SG13, fetched 2026-11-19): dual power input (USB-C PD/QC3.0,
//   or DC5525 barrel; power supply not included), "reaches operating temperature in 12 seconds," SAE 304 stainless
//   steel core in a polycarbonate shell, auto standby mode, ships with one Type B2 tip. Title and bullets describe a
//   "Pinecil" without stating V1 vs V2 on the page text itself, a known ambiguity already flagged on this site's
//   best-soldering-irons Pick for this ASIN.
// - Hakko FX-888DX: per hakkousa.com's FX-888DX page, cited the same way on this site's existing Weller WE1010 vs
//   Hakko FX-888DX comparison (hakkousa.com returns 403 to automated fetches, confirmed again 2026-11-19, so no new
//   Hakko facts were added here beyond what that page and the best-soldering-irons Pick already cite): 100W/120VAC
//   station, FX-8801 65W iron, T18 tips, 50-480C set range, +/-1C idle stability, ESD safe with tip-to-ground
//   resistance under 2 ohms, five presets, rotary dial with parameter lock, drives other Hakko handpieces (tweezers,
//   solder gun, larger irons), station 100 x 120 x 120mm, 1.2kg. Hakko states no heat-up time and no sleep/standby
//   mode for the FX-888DX.
// - Official Amazon listing for this exact ASIN (B0D4DJW54S, fetched 2026-11-19): confirms the product title "Hakko
//   FX888DX-010 - Digital Soldering Station with Rotary Encoder" and the "improves the user interface from the
//   FX-888D ... more intuitive method for adjusting temperature and includes a parameter [lock]" bullet; Amazon's
//   dynamically-loaded buy box could not be fully read by an automated fetch, so availability rests on this ASIN's
//   status as an active Pick on best-soldering-irons/page.tsx (badge "Best Overall", not marked unavailable there).
import Link from "@/components/AppLink";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-soldering-irons/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/soldering-irons/pinecil-v2-vs-hakko-fx-888dx";

export const metadata = buildMetadata({
  title: "Pinecil V2 vs Hakko FX-888DX",
  description:
    "Pinecil V2 vs Hakko FX-888DX: a pocket USB-C iron with open-source firmware against a fixed 100W ESD-safe bench station. Power, weight and who should buy which.",
  path: "/soldering-irons/pinecil-v2-vs-hakko-fx-888dx",
});

const link = "text-accent hover:underline";

/** What each iron's power actually depends on: one fixed path for the Hakko, several variable ones for the Pinecil. */
function PowerPathDiagram() {
  return (
    <svg
      viewBox="0 0 400 230"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram: the Hakko FX-888DX plugs into any AC wall outlet and always delivers its fixed 65 watts to the tip. The Pinecil V2 can be powered by several different USB-C or DC sources, and the power that actually reaches its tip changes with the source: roughly 18 watts from a basic phone charger, about 60 watts from a 20-volt USB-C PD charger or power bank, and up to 88 watts only from a dedicated 24-volt DC supply."
    >
      <text x="10" y="18" fontSize="10" fontWeight="700" className="fill-foreground">
        Hakko FX-888DX: one fixed path
      </text>
      <rect x="10" y="28" width="90" height="34" rx="6" className="fill-surface stroke-foreground" strokeWidth="1.3" />
      <text x="55" y="48" fontSize="8.5" textAnchor="middle" className="fill-foreground">
        Any AC wall
      </text>
      <text x="55" y="58" fontSize="8.5" textAnchor="middle" className="fill-foreground">
        outlet
      </text>
      <path d="M100 45 H150" className="stroke-accent fill-none" strokeWidth="1.8" />
      <rect x="150" y="26" width="110" height="38" rx="6" className="fill-accent/10 stroke-accent" strokeWidth="1.4" />
      <text x="205" y="42" fontSize="8.5" textAnchor="middle" className="fill-foreground">
        FX-888DX station
      </text>
      <text x="205" y="54" fontSize="8.5" textAnchor="middle" className="fill-foreground">
        100W, fixed
      </text>
      <path d="M260 45 H300" className="stroke-accent fill-none" strokeWidth="1.8" />
      <rect x="300" y="30" width="80" height="30" rx="5" className="fill-surface stroke-foreground" strokeWidth="1.3" />
      <text x="340" y="49" fontSize="8.5" textAnchor="middle" className="fill-foreground">
        T18 tip: 65W
      </text>

      <line x1="0" y1="86" x2="400" y2="86" className="stroke-border" strokeWidth="1" strokeDasharray="3 3" />

      <text x="10" y="104" fontSize="10" fontWeight="700" className="fill-foreground">
        Pinecil V2: power depends on the source
      </text>
      {[
        { y: 116, label: "Basic USB-C phone charger", watts: "~18W" },
        { y: 144, label: "20V USB-C PD charger / power bank", watts: "~60W" },
        { y: 172, label: "Dedicated 24V DC barrel supply", watts: "88W max" },
      ].map((row) => (
        <g key={row.label}>
          <rect x="10" y={row.y} width="170" height="22" rx="5" className="fill-surface stroke-border" strokeWidth="1" />
          <text x="18" y={row.y + 15} fontSize="8" className="fill-foreground">
            {row.label}
          </text>
          <path d={`M180 ${row.y + 11} H230`} className="stroke-muted fill-none" strokeWidth="1.4" />
          <text x="233" y={row.y + 15} fontSize="8.5" fontWeight="700" className="fill-accent">
            {row.watts}
          </text>
        </g>
      ))}
      <path d="M195 127 L195 183" className="stroke-muted fill-none" strokeWidth="1.2" strokeDasharray="2 2" />
      <path d="M195 155 H270" className="stroke-muted fill-none" strokeWidth="1.2" strokeDasharray="2 2" />
      <rect x="270" y="110" width="110" height="90" rx="6" className="fill-accent/10 stroke-accent" strokeWidth="1.4" />
      <text x="325" y="150" fontSize="8.5" textAnchor="middle" className="fill-foreground">
        Pinecil V2
      </text>
      <text x="325" y="162" fontSize="8" textAnchor="middle" className="fill-muted">
        heat-up and max
      </text>
      <text x="325" y="173" fontSize="8" textAnchor="middle" className="fill-muted">
        temp both vary
      </text>
      <text x="325" y="184" fontSize="8" textAnchor="middle" className="fill-muted">
        with the source
      </text>
      <text x="200" y="215" fontSize="8" textAnchor="middle" className="fill-muted">
        Figures are illustrative examples of common supply classes, not a Pine64-published table.
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "soldering-irons",
  heading: "Pinecil V2 vs Hakko FX-888DX",
  path,
  published: "2026-11-19",
  intro:
    "Pinecil V2 vs Hakko FX-888DX puts the site's Best Portable pick against its Best Overall pick, and the two solve different problems. The Pinecil V2 is a 28-gram USB-C iron running open-source IronOS firmware, whose power and heat-up speed depend on whatever charger or supply you plug into it. The Hakko FX-888DX is a 100W ESD-safe bench station that delivers the same fixed 65W to its T18 tip from any wall outlet, with a published 50-480°C range and five presets. One is the tool you carry; the other is the tool you can always count on for the same number.",
  a: {
    pick: picks.find((p) => p.name === "Pinecil V2")!,
    imageAlt: "Pinecil V2 portable USB-C soldering iron",
    chooseIf: [
      "You want an iron that fits in a pocket and can run from a USB-C power bank, laptop or charger you already own",
      "You need to grab a tool and go: field repairs, a shared maker space, or travel without a bench to plug into",
      "You're fine with heat-up time and top temperature varying with whatever power source is at hand",
      "You want open-source firmware (IronOS) you can inspect, configure deeply, or reflash yourself",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Hakko FX-888DX")!,
    imageAlt: "Hakko FX-888DX digital soldering station, front view",
    chooseIf: [
      "You want one plug-in station that always delivers its full 65W to the tip and a published 50-480°C range",
      "You solder at a shared or dedicated bench and want ESD-safe grounding built into the station",
      "You want multiple temperature presets you switch between with a rotary dial, not a software menu",
      "You might add other Hakko handpieces later (tweezers, solder gun); Hakko says the station drives those too",
    ],
  },
  extraSpecs: [
    { label: "Power input", a: "USB-C PD/QC3.0 12-20V 3A, or 12-24V DC barrel (min 3A); up to 88W overall", b: "100W station (120VAC); 65W FX-8801 iron" },
    { label: "Heat-up time", a: "~12 s per the listing, with a 20V+ supply", b: "Not stated by Hakko" },
    { label: "Temperature range", a: "Not published by Pine64", b: "50-480°C, ±1°C stability at idle" },
    { label: "Display / control", a: "OLED, monochrome, 0.69-inch, 96×16 px", b: "Digital readout, rotary dial, five presets, parameter lock" },
    { label: "Tips", a: "ST-B2 short tip included (86mm, 8.2g); Pinecil-specific", b: "Hakko T18 series, shared with the FX-888D" },
    { label: "Weight", a: "28g with tip, 18g without", b: "1.2 kg (station alone)" },
    { label: "Dimensions", a: "155mm with tip / 103mm without × 12.8mm × 16.2mm", b: "100 × 120 × 120mm (station)" },
    { label: "ESD / grounding", a: "No ESD rating; floats relative to earth on USB-C/DC power", b: "ESD safe, tip-to-ground resistance under 2Ω" },
    { label: "Firmware", a: "Open-source IronOS (Ralim's build), user-flashable", b: "Closed; fixed presets behind a parameter lock" },
    { label: "Sleep / standby", a: "Idle detection, tip sleep mode, automatic shutdown", b: "Not stated by Hakko" },
    { label: "Expansion", a: "Not stated", b: "Drives other Hakko handpieces: tweezers, solder gun, larger irons" },
  ],
  differences: [
    "Power ceiling: the Pinecil V2 reaches 88W only from a 24V DC supply, per Pine64's own specifications page; from a common 20V USB-C PD charger it's closer to 60W. The Hakko's 100W station delivers the same fixed 65W to its iron from any wall outlet.",
    "Temperature range: Hakko publishes 50-480°C with ±1°C idle stability for the FX-888DX. Pine64 doesn't publish any settable temperature range for the Pinecil V2, on its specifications page, its features page, or its Amazon listing.",
    "Weight: the Pinecil V2 weighs 28g with its tip; the Hakko FX-888DX station alone weighs 1.2kg, roughly 43 times as much.",
    "Grounding: the Hakko is ESD safe with tip-to-ground resistance under 2Ω. The Pinecil carries no ESD rating, and running from USB-C or DC power gives it no mains-earth reference at all.",
    "Firmware: the Pinecil runs open-source IronOS that you can inspect, reconfigure or reflash over USB. The Hakko's control logic is closed, with five fixed presets behind a parameter lock.",
    "Expansion: Hakko states the FX-888DX station can also drive its tweezers, solder gun and larger irons. Pine64 states no equivalent accessory path for the Pinecil V2.",
    "Neither carries our Hands-on Tested badge; this is desk research against Pine64's published pages and Hakko USA's product page (the latter cited the same way as our existing Weller WE1010 vs Hakko FX-888DX comparison, since hakkousa.com returns 403 to automated fetches).",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec: a fixed number vs a variable one</h2>
        <p className="text-muted leading-7 mb-4">
          The clearest way to read these two irons is that the Hakko publishes one number for almost everything that
          matters, and the Pinecil publishes a ceiling that depends on what you plug into it. The charts below use the
          figures each maker actually states; where Pine64 states no number at all (temperature range, heat-up time
          from a weak supply), the chart leaves that bar out rather than guessing.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Maximum rated wattage of the whole product. The Pinecil&apos;s 88W is reachable only from a 24V DC supply, per Pine64&apos;s specifications page.</>}>
            <BarChart
              items={[
                { label: "Hakko FX-888DX station", value: 100, display: "100W", highlight: true },
                { label: "Pinecil V2 (24V DC supply)", value: 88, display: "88W max" },
              ]}
            />
          </Figure>
          <Figure caption={<>Power that reaches the iron itself. The Hakko figure is fixed from any outlet; the Pinecil figure is one common case, not a guarantee.</>}>
            <BarChart
              items={[
                { label: "Hakko FX-8801 iron", value: 65, display: "65W, fixed", highlight: true },
                { label: "Pinecil V2 (20V USB-C PD)", value: 60, display: "~60W" },
              ]}
            />
          </Figure>
          <Figure caption={<>Weight, grams, log scale. Pine64&apos;s figure is for the complete iron with its tip; Hakko&apos;s is for the station alone, before the handpiece and cable.</>}>
            <BarChart
              log
              items={[
                { label: "Pinecil V2 (with tip)", value: 28, display: "28 g", highlight: true },
                { label: "Hakko FX-888DX station", value: 1200, display: "1.2 kg" },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where the power actually comes from</h2>
        <p className="text-muted leading-7 mb-4">
          Plugging in a Hakko FX-888DX is a non-decision: any grounded wall outlet gives the station its full 100W, and
          the FX-8801 handpiece always gets the same 65W. The Pinecil V2 has no station of its own, so the decision
          happens at the charger. Pine64 rates it for 12-24V at up to 88W overall, but a basic phone charger, a laptop&apos;s
          USB-C port and a dedicated 24V bench supply are not the same source, and the iron can only deliver what that
          source provides.
        </p>
        <Figure
          caption={
            <>
              The Hakko&apos;s path never changes. The Pinecil&apos;s does: Pine64 states ~60W from a 20V USB-C PD
              charger and up to 88W only from a 24V DC supply, so the same iron behaves differently depending on what
              you carry with it.
            </>
          }
        >
          <PowerPathDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          That dependency is also why the Pinecil&apos;s ~12-second heat-up claim comes with a condition: Pine64&apos;s
          Amazon listing states it &quot;reaches operating temperature in 12 seconds,&quot; but our existing Pinecil V2
          Pick notes this applies with a 20V-or-higher supply. A weaker charger heats more slowly. Hakko states no
          heat-up figure at all for the FX-888DX, so there&apos;s no published number to race it against either way.
        </p>
        <div className="mt-4">
          <KeyIdea title="The Amazon listing doesn't say V1 or V2 on the page text">
            Our own best-soldering-irons Pick already flags this: Pine64&apos;s Amazon listing for this ASIN describes
            dual USB-C/DC power input and a 12-second heat-up, matching the V2, but doesn&apos;t spell out &quot;V2&quot;
            in the visible bullets. Check the product images and any version marking before buying if you specifically
            need the V2&apos;s 24V/88W capability over the original Pinecil&apos;s lower ceiling.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t do</h2>
        <h3 className="text-lg font-semibold mb-2">Pinecil V2: capable, but conditional</h3>
        <p className="text-muted leading-7 mb-4">
          At 28g with its tip, the Pinecil V2 goes anywhere a USB-C cable goes: a laptop bag, a glovebox, a field
          service kit. It runs open-source IronOS, so the on-device menu, boost behavior and sleep timing are all
          configurable, and advanced users can reflash the firmware entirely. Its real limits are about certainty, not
          capability: no published temperature range means you read the number off its own screen rather than a spec
          sheet, no ESD rating means it isn&apos;t the right tool for a grounded static-sensitive bench without adding
          your own precautions, and its headline 88W is a best case that most USB-C chargers in a typical bag won&apos;t
          supply.
        </p>
        <h3 className="text-lg font-semibold mb-2">Hakko FX-888DX: predictable, but tied to a bench</h3>
        <p className="text-muted leading-7 mb-4">
          The FX-888DX trades portability for certainty. Plug it into any outlet and it is, every time, a 100W station
          driving a 65W iron across a published 50-480°C range with ±1°C idle stability. Five presets and a parameter
          lock suit a bench several people share, and ESD-safe grounding (tip-to-ground under 2Ω) is a real requirement
          on some jobs, not a nice-to-have. What it can&apos;t do is travel: at 1.2kg for the station alone, before the
          handpiece and cable, it stays on a bench, and Hakko doesn&apos;t publish any battery or USB alternative for it.
        </p>
        <Callout title="Neither is rated for mains or high-voltage work">
          Both irons are for soldering joints, not for probing live circuits. The FX-888DX&apos;s ESD-safe grounding
          protects sensitive components from static, not you from voltage, and the Pinecil has no ESD or safety rating
          published at all. Keep either iron in its stand when not in your hand, and ventilate or extract solder fumes
          during use.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Pick", "Why"]}
          rows={[
            ["Field repairs or a maker space with no spare bench outlet", "Pinecil V2", "28 g with the tip; runs from a USB-C PD charger or power bank"],
            ["A dedicated or shared electronics bench", "Hakko FX-888DX", "Fixed 100W station, always the same 65W to the tip"],
            ["Travel or a toolkit that already carries a USB-C charger", "Pinecil V2", "No separate station to pack; any PD source brings it to temperature"],
            ["Working on ESD-sensitive boards", "Hakko FX-888DX", "ESD safe, tip-to-ground under 2Ω; the Pinecil has no such rating"],
            ["Wants to inspect, configure or reflash the firmware", "Pinecil V2", "Runs open-source IronOS over USB"],
            ["Wants a published number for maximum temperature before buying", "Hakko FX-888DX", "50-480°C stated; Pine64 publishes no range for the Pinecil V2"],
            ["Might add tweezers or a heavier iron to the same station later", "Hakko FX-888DX", "Hakko says the FX-888DX also drives other Hakko handpieces"],
            ["Already owns a 24V DC bench supply or high-wattage USB-C PD charger", "Pinecil V2", "Only then does Pine64's 88W figure actually apply"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The trust question with both</h2>
        <p className="text-muted leading-7 mb-4">
          Neither iron has been bought and tested by OhmSavvy; this comparison is desk research against each maker&apos;s
          own published pages. The gaps run in different directions. Pine64&apos;s documentation for the Pinecil V2 is
          thorough on power input, dimensions and weight, but states no temperature range and no ESD rating anywhere we
          could find, which matters if either number is a condition of your purchase. Hakko&apos;s own site returned a
          403 error to our automated fetch (the same result our existing{" "}
          <Link href="/soldering-irons/weller-we1010-vs-hakko-fx-888dx" className={link}>
            Weller WE1010 vs Hakko FX-888DX
          </Link>{" "}
          comparison got), so the FX-888DX figures here trace back to that page and to this site&apos;s own Pick entry
          rather than a fresh fetch. Treat every number on this page as the maker&apos;s stated figure, not an
          independent lab measurement.
        </p>
      </section>
    </>
  ),
  bottomLine:
    "The Pinecil V2 is the better pick when portability matters more than a guaranteed number: 28g with its tip, open-source IronOS firmware, and a roughly 12-second heat-up, but its 88W ceiling needs a 24V supply you may not own, a common USB-C PD charger gets closer to 60W, and Pine64 publishes no temperature range or ESD rating at all. The Hakko FX-888DX is the better pick when you want the same answer every time: 100W station, 65W to the tip, 50-480°C, ESD safe, five presets, from any wall outlet.",
  chooseNeitherIf:
    "You need hot air for SMD or BGA rework: neither iron includes it. See the YIHUA 862BD+, which pairs a 75W soldering iron with a separate 500W hot air gun in one station.",
  faqs: [
    {
      question: "Can the Pinecil V2 really reach 480°C like the Hakko FX-888DX?",
      answer:
        "There's no official way to answer that. Hakko states a 50-480°C set range for the FX-888DX. Pine64 doesn't publish any maximum settable temperature for the Pinecil V2 on its specifications page, its features page, or its Amazon listing. The Pinecil runs open-source IronOS, which the community associates with a wide usable range, but that's a firmware characteristic, not a number Pine64 states, so we don't quote one here.",
    },
    {
      question: "Does the Pinecil V2 need a special charger to work properly?",
      answer:
        "Not a special one, but a strong one matters. Pine64 rates the Pinecil V2 for USB-C PD or QC3.0 at 12-20V (3A) or a 12-24V DC barrel supply (minimum 3A), with an overall ceiling of 88W. In practice that means about 60W from a typical 20V USB-C PD charger or power bank, and the full 88W only from a dedicated 24V DC supply. A basic phone charger will still heat the iron, just more slowly and to a lower ceiling.",
    },
    {
      question: "Is the Pinecil V2 ESD safe like the Hakko FX-888DX?",
      answer:
        "No. Hakko lists the FX-888DX as ESD safe with tip-to-ground resistance under 2 ohms. Pine64 publishes no ESD rating for the Pinecil V2, and because it's powered through USB-C or a DC barrel jack rather than a grounded AC station, it has no mains-earth reference at all while in use. For ESD-sensitive boards, that's a real reason to prefer the Hakko.",
    },
    {
      question: "Which iron heats up faster, the Pinecil V2 or the FX-888DX?",
      answer:
        "The Pinecil V2's own Amazon listing states it reaches operating temperature in about 12 seconds, though that figure assumes a 20V-or-higher supply; a weaker charger will be slower. Hakko doesn't publish a heat-up time for the FX-888DX at all, so there's no official number to compare it against either way.",
    },
    {
      question: "Can I use Hakko T18 tips on the Pinecil V2, or Pinecil tips on the Hakko?",
      answer:
        "No, the two use entirely different tip systems. The Hakko FX-888DX uses Hakko's T18 series, shared with the older FX-888D. The Pinecil V2 ships with Pine64's own ST-B2 short tip and uses Pinecil-specific tips, which don't fit a Hakko handpiece. Factor the tip ecosystem you'll keep buying into, not just the iron's price, when choosing between them.",
    },
  ],
  roundup: { label: "See the full soldering iron roundup", href: "/soldering-irons/best-soldering-irons" },
  related: [
    { label: "Pinecil V2 review", href: "/soldering-irons/pinecil-v2-review" },
    { label: "Weller WE1010 vs Hakko FX-888DX", href: "/soldering-irons/weller-we1010-vs-hakko-fx-888dx" },
    { label: "Hakko FX888D vs Weller WE1010NA", href: "/soldering-irons/hakko-fx888d-vs-weller-we1010na" },
    { label: "Pinecil V2 vs TS101 Soldering Iron", href: "/soldering-irons/pinecil-v2-vs-ts101-soldering-iron" },
    { label: "Pinecil V2 vs Q-MING 60W Kit", href: "/soldering-irons/pinecil-v2-vs-q-ming-60w-kit" },
    { label: "FNIRSI HS-02A vs Pinecil V2", href: "/soldering-irons/fnirsi-hs-02a-vs-pinecil-v2" },
    { label: "Soldering iron vs soldering station", href: "/soldering-irons/soldering-iron-vs-soldering-station" },
    { label: "Soldering iron buying guide", href: "/soldering-irons/soldering-iron-buying-guide" },
  ],
};

export default function PinecilV2VsHakkoFx888dxPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="soldering-irons" current={path} />
    </>
  );
}
