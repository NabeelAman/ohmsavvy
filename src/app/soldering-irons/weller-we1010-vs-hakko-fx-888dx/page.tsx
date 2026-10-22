import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-soldering-irons/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/soldering-irons/weller-we1010-vs-hakko-fx-888dx";

export const metadata = buildMetadata({
  title: "Weller WE1010 vs Hakko FX-888DX",
  description:
    "Weller WE1010 vs Hakko FX-888DX: two ESD-safe digital bench stations compared on power, temperature range, presets, standby and tips.",
  path: "/soldering-irons/weller-we1010-vs-hakko-fx-888dx",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "soldering-irons",
  heading: "Weller WE1010 vs Hakko FX-888DX",
  path,
  published: "2026-10-22",
  intro:
    "Weller WE1010 vs Hakko FX-888DX is the current-generation bench station match-up. Both are ESD safe digital stations with a 65–70W iron. The Hakko adds a 100W station, a wider 50–480°C range and five presets; the Weller (sold in the US as the WE1010NA kit) answers with standby and auto setback, password-protected settings and a published 28-second heat-up.",
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
    { label: "Temperature range", a: "100–450°C", b: "50–480°C" },
    { label: "Heat-up time", a: "About 28 s (50–350°C)", b: "Not stated by Hakko" },
    { label: "Tips", a: "Weller ET series", b: "Hakko T18 series" },
    { label: "Presets / lock", a: "Password-protected settings", b: "Five presets, parameter lock" },
    { label: "Standby", a: "Standby with auto setback", b: "Not stated by Hakko" },
    { label: "ESD safe", a: "Yes", b: "Yes" },
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
        <h2 className="text-2xl font-semibold mb-4">Power and temperature range at a glance</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Station power rating per each maker.</>}>
            <BarChart
              items={[
                { label: "Hakko FX-888DX", value: 100, display: "100W", highlight: true },
                { label: "Weller WE1010", value: 85, display: "85W" },
              ]}
            />
          </Figure>
          <Figure caption={<>Width of the published temperature range, in °C.</>}>
            <BarChart
              items={[
                { label: "Hakko (50–480°C)", value: 430, display: "430°C span", highlight: true },
                { label: "Weller (100–450°C)", value: 350, display: "350°C span" },
              ]}
            />
          </Figure>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Which bench suits which station</h2>
        <DataTable
          head={["Bench", "Better fit", "Why"]}
          rows={[
            ["Shared lab or classroom", "Weller WE1010", "Password-protected settings, standby and setback"],
            ["Mixed work with frequent temperature changes", "Hakko FX-888DX", "Five presets and a rotary dial"],
            ["Very low-temperature work", "Hakko FX-888DX", "Settings from 50°C"],
            ["Upgrading from an FX-888D", "Hakko FX-888DX", "Same T18 tips and FX-8801 handpiece"],
          ]}
        />
        <div className="mt-4">
          <KeyIdea title="Tip ecosystems matter more than the station">
            Over a station&apos;s life you&apos;ll buy many tips, so stay with the system you already own. Our{" "}
            <Link href="/soldering-irons/soldering-iron-tip-types" className={link}>
              guide to soldering iron tip types
            </Link>{" "}
            explains which shapes to start with.
          </KeyIdea>
        </div>
      </section>
    </>
  ),
  bottomLine:
    "Choose the Hakko FX-888DX for more power, a wider range, presets and compatibility with FX-888D tips. Choose the Weller WE1010 for a shared or professional bench where standby, auto setback and password-protected settings matter more than raw range.",
  faqs: [
    {
      question: "Is the Weller WE1010 the same as the WE1010NA?",
      answer: "WE1010NA is the North American 120V kit of the WE1010 station; the specs here are from Weller's WE1010NA page.",
    },
    {
      question: "Which station heats up faster?",
      answer:
        "Weller states about 28 seconds from 50 to 350°C. Hakko doesn't publish a heat-up time for the FX-888DX, so a direct comparison isn't possible.",
    },
    {
      question: "Are both stations ESD safe?",
      answer: "Yes. Weller lists the WE1010 as ESD safe, and Hakko lists the FX-888DX as ESD safe with tip-to-ground resistance under 2 Ω.",
    },
    {
      question: "Can I use FX-888D tips on the FX-888DX?",
      answer: "Yes. The FX-888DX keeps the FX-8801 handpiece and T18 tips used by the FX-888D.",
    },
    {
      question: "Which has a sleep mode?",
      answer:
        "Weller lists standby with automatic setback for the WE1010. Hakko doesn't state a sleep or standby mode for the FX-888DX on its product page.",
    },
  ],
  roundup: { label: "See the full soldering iron roundup", href: "/soldering-irons/best-soldering-irons" },
  related: [
    { label: "Hakko FX888D vs Weller WE1010NA", href: "/soldering-irons/hakko-fx888d-vs-weller-we1010na" },
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
