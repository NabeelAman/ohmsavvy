// Pinecil V2 per https://pine64.org/documentation/Pinecil/Further_information/Specifications/ (checked 2026-10-26):
// 12-24 V, 88 W; USB-C PD 12-20 V 3 A and QC 3.0 12-20 V 3 A; DC5525 barrel 12-24 V, minimum 3 A; a 12 V USB-C charger heats
// slower than a 65 W 20 V/3 A PD charger; tentative 28 V EPR support; 155 mm with tip (103 mm without) x 12.8 x 16.2 mm;
// 28 g with tip, 18 g without; ST-B2 short tip included; Ralim's IronOS; 0.69-inch 96 x 16 OLED. No temperature range,
// sleep or heat-up figure on that page; the ~12 s heat-up and ~60 W on 20 V PD figures come from the Pinecil V2 Pick.
// Q-MING 60W Kit per the Pick and its official Amazon listing (https://www.amazon.com/dp/B098JD8HD3): 60 W, ceramic heating
// element, adjustable dial 200-450 C, ~15 s heat-up, 5 tips and a stand. No maker site found; weight, tip series and ESD not stated.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-soldering-irons/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/soldering-irons/pinecil-v2-vs-q-ming-60w-kit";

export const metadata = buildMetadata({
  title: "Pinecil V2 vs Q-MING 60W Kit",
  description:
    "Pinecil V2 vs Q-MING 60W Kit: a portable USB-C smart iron against a complete mains starter kit. Power, heat-up, temperature control and what comes in the box.",
  path: "/soldering-irons/pinecil-v2-vs-q-ming-60w-kit",
});

const link = "text-accent hover:underline";

/** Where each iron gets its power, and how much the source can deliver. */
function PowerPathDiagram() {
  const box = "fill-surface stroke-border";
  return (
    <svg
      viewBox="0 0 340 210"
      className="w-full h-auto"
      role="img"
      aria-label="Power path diagram. The Pinecil V2 draws from a USB-C Power Delivery charger at up to 20 volts and 3 amps, about 60 watts, or from a 24 volt DC supply for up to 88 watts; a 12 volt source heats it more slowly. The Q-MING 60W kit plugs straight into a wall outlet and runs at a fixed 60 watt rating, with a dial setting temperature between 200 and 450 degrees Celsius."
    >
      <text x="8" y="16" fontSize="10" fontWeight="700" className="fill-accent">Pinecil V2</text>
      <rect x="8" y="24" width="96" height="34" rx="6" className={box} strokeWidth="1.2" />
      <text x="56" y="39" fontSize="9" textAnchor="middle" className="fill-foreground">USB-C PD charger</text>
      <text x="56" y="51" fontSize="8.5" textAnchor="middle" className="fill-muted">20 V × 3 A = 60 W</text>
      <rect x="8" y="66" width="96" height="34" rx="6" className={box} strokeWidth="1.2" />
      <text x="56" y="81" fontSize="9" textAnchor="middle" className="fill-foreground">24 V DC supply</text>
      <text x="56" y="93" fontSize="8.5" textAnchor="middle" className="fill-muted">up to 88 W</text>
      <path d="M104 41 H150 V62 M104 83 H150 V62 H176" className="fill-none stroke-accent" strokeWidth="1.8" />
      <rect x="176" y="46" width="156" height="32" rx="16" className="fill-accent/15 stroke-accent" strokeWidth="1.5" />
      <text x="254" y="60" fontSize="9.5" textAnchor="middle" className="fill-foreground">Pinecil: OLED, set temp</text>
      <text x="254" y="72" fontSize="8.5" textAnchor="middle" className="fill-muted">28 g with tip</text>
      <text x="8" y="116" fontSize="8.5" className="fill-muted">A 12 V source works but heats more slowly.</text>

      <text x="8" y="146" fontSize="10" fontWeight="700" className="fill-muted">Q-MING 60W Kit</text>
      <rect x="8" y="154" width="96" height="34" rx="6" className={box} strokeWidth="1.2" />
      <text x="56" y="169" fontSize="9" textAnchor="middle" className="fill-foreground">Wall outlet</text>
      <text x="56" y="181" fontSize="8.5" textAnchor="middle" className="fill-muted">mains cord</text>
      <path d="M104 171 H176" className="stroke-foreground" strokeWidth="1.8" />
      <rect x="176" y="155" width="156" height="32" rx="16" className="fill-surface stroke-foreground" strokeWidth="1.5" />
      <text x="254" y="169" fontSize="9.5" textAnchor="middle" className="fill-foreground">60 W pen, dial 200–450 °C</text>
      <text x="254" y="181" fontSize="8.5" textAnchor="middle" className="fill-muted">no display</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "soldering-irons",
  heading: "Pinecil V2 vs Q-MING 60W Kit",
  path,
  published: "2026-10-26",
  intro:
    "Pinecil V2 vs Q-MING 60W Kit is a choice between a smart portable iron and a complete starter box. The Pinecil V2 runs from USB-C Power Delivery or a 12–24V DC supply, shows its temperature on an OLED, and reaches up to 88W at 24V. The Q-MING plugs into a wall outlet, sets temperature with a 200–450°C dial, and ships with a stand and five tips. Buy the Pinecil for control and portability, the Q-MING to start soldering with nothing else to buy.",
  a: {
    pick: picks.find((p) => p.name === "Pinecil V2")!,
    reviewHref: "/soldering-irons/pinecil-v2-review",
    imageAlt: "Pinecil V2 USB-C portable soldering iron with OLED display",
    chooseIf: [
      "You solder away from a bench, or want an iron that fits in a pocket at 28 g",
      "You want a digital set temperature and already own a USB-C PD charger or power bank",
      "You may later run it from a 24V supply for more power on heavy joints",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Q-MING 60W Kit")!,
    reviewHref: "/soldering-irons/q-ming-60w-soldering-iron-kit-review",
    imageAlt: "Q-MING 60W soldering iron kit with stand and five tips",
    chooseIf: [
      "You're new to soldering and want iron, stand and tips in one box",
      "You solder a few times a month and prefer a simple dial",
      "You don't own a USB-C PD charger and don't want to buy one",
    ],
  },
  extraSpecs: [
    { label: "Power input", a: "USB-C PD 12–20V 3A, or DC barrel 12–24V", b: "Mains outlet, corded" },
    { label: "Maximum power", a: "88W at 24V; about 60W on 20V PD", b: "60W rated" },
    { label: "Temperature range", a: "Not published by Pine64", b: "200–450°C (dial)" },
    { label: "Display", a: "0.69-inch OLED, 96 × 16", b: "None (marked dial)" },
    { label: "Length / weight", a: "155 mm with tip; 28 g with tip", b: "Not stated" },
    { label: "Included tip", a: "ST-B2 short tip", b: "5 interchangeable tips" },
    { label: "Stand", a: "Not included by default", b: "Included" },
    { label: "Firmware", a: "Open-source IronOS", b: "None (analog)" },
  ],
  differences: [
    "Power: up to 88W at 24V (about 60W from a 20V USB-C PD charger) for the Pinecil against a fixed 60W rating for the Q-MING.",
    "Heat-up: about 12 seconds on a 20V or higher supply for the Pinecil against about 15 seconds for the Q-MING.",
    "Temperature control: the Pinecil sets and shows a number on its OLED; the Q-MING uses a dial marked 200–450°C with no readout.",
    "In the box: the Q-MING includes a stand and five tips; the Pinecil ships with one ST-B2 tip and no stand by default.",
    "Power source: the Pinecil needs a USB-C PD charger, power bank or 12–24V DC supply; the Q-MING plugs into a standard outlet.",
    "Size: the Pinecil weighs 28 g with its tip, light enough to carry in a pocket or repair kit.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Pinecil V2 vs Q-MING spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Pine64 publishes a detailed spec page for the Pinecil V2; Q-MING publishes no maker page, so its figures come
          from our Pick and the official Amazon listing. Where one side is missing a number, we say so rather than
          guess. Power and heat-up are the two figures both sides state.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Maximum power in watts. The Pinecil&apos;s figure depends on the supply it runs from.</>}>
            <BarChart
              items={[
                { label: "Pinecil V2, 24V DC", value: 88, display: "88 W", highlight: true },
                { label: "Pinecil V2, 20V PD", value: 60, display: "≈60 W" },
                { label: "Q-MING 60W Kit", value: 60, display: "60 W" },
              ]}
            />
          </Figure>
          <Figure caption={<>Approximate heat-up time in seconds, per our Picks. Lower is faster.</>}>
            <BarChart
              items={[
                { label: "Pinecil V2 (20V+)", value: 12, display: "≈12 s", highlight: true },
                { label: "Q-MING 60W Kit", value: 15, display: "≈15 s" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          On the most common supply, a 65W USB-C PD charger, the Pinecil and the Q-MING have the same 60W on paper. The
          arithmetic is simple: Power Delivery tops out at 20V and 3A for this iron, and 20 × 3 = 60W. To reach the 88W
          rating you need a 24V DC supply on the barrel jack. Pine64 also notes that a 12V source works but heats more
          slowly, which matters if you plan to run it from a small power bank.
        </p>
        <Figure caption={<>Where each iron gets its power, and the ceiling each source sets.</>}>
          <PowerPathDiagram />
        </Figure>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Digital set point against a dial</h2>
        <p className="text-muted leading-7 mb-4">
          The Pinecil runs IronOS, open-source firmware that sets a target temperature and shows it on the OLED, so you
          can return to the same setting every time: one value for leaded solder, a higher one for lead-free, a lower one
          for small parts. The Q-MING&apos;s dial is marked from 200°C to 450°C, which gets you into a usable range quickly
          but gives no readout of what the tip is actually doing.
        </p>
        <p className="text-muted leading-7 mb-4">
          Pine64&apos;s spec page doesn&apos;t publish a temperature range for the Pinecil, so we can&apos;t chart the two
          ranges side by side. As a general guide, many solder makers suggest a tip somewhere around 315–370°C for common
          leaded solder and higher for lead-free; check the data sheet of the solder you buy. Both irons cover that band.
          If your joints come out dull or grainy, our guide to{" "}
          <Link href="/soldering-irons/soldering-iron-not-melting-solder" className={link}>
            fixing an iron that won&apos;t melt solder
          </Link>{" "}
          walks through tip and temperature checks.
        </p>
        <KeyIdea title="What the box costs you later">
          The Q-MING is complete on day one: iron, stand and five tips. The Pinecil needs a USB-C PD charger or DC supply
          you may already own, plus a stand you probably don&apos;t. Before choosing on the iron alone, add up what each
          option needs to be usable on your desk.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Pinecil V2 vs Q-MING: which should you buy?</h2>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["First-time solderer with no tools", "Q-MING 60W Kit", "Stand and five tips included; plugs into the wall"],
            ["Hobbyist who already owns a 65W USB-C charger", "Pinecil V2", "Digital set point and OLED with no extra power brick"],
            ["Field repairs, drones or RC away from mains", "Pinecil V2", "Runs from a USB-C PD power bank, 28 g"],
            ["Heavy wires and large connectors", "Pinecil V2 on 24V", "Up to 88W on a 24V DC supply"],
            ["Occasional household fixes", "Q-MING 60W Kit", "Simple dial, nothing to configure"],
            ["Learning on lead-free solder", "Pinecil V2", "Repeatable temperature setting helps with hotter solder"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For another USB-C option, see{" "}
          <Link href="/soldering-irons/pinecil-v2-vs-ts101-soldering-iron" className={link}>
            Pinecil V2 vs TS101
          </Link>
          . If you are just starting out, our{" "}
          <Link href="/soldering-irons/best-soldering-iron-for-beginners" className={link}>
            best soldering iron for beginners
          </Link>{" "}
          guide and{" "}
          <Link href="/soldering-irons/how-to-use-a-soldering-iron" className={link}>
            how to use a soldering iron
          </Link>{" "}
          cover the first joints.
        </p>
      </section>

      <Callout title="Safety: both tips run hotter than 200°C">
        Always rest either iron in a stand, never on the bench. The Pinecil has no stand in the box, so buy or improvise a
        heat-proof holder before first use. Solder in a ventilated space to keep flux fumes away from your face, wash your
        hands after handling leaded solder, and unplug or disconnect the iron when you walk away. A burn that blisters
        widely or chars the skin needs medical care.
      </Callout>
    </>
  ),
  bottomLine:
    "For a first-time buyer who just wants to start, the Q-MING kit removes every extra purchase: plug it in, set the dial and solder. If portability, a repeatable digital temperature or more power from a 24V supply matter to you, the Pinecil V2 is the more capable tool, as long as you budget for a stand and have a USB-C PD charger.",
  faqs: [
    {
      question: "Does the Pinecil V2 need a special power supply?",
      answer:
        "It needs a USB-C Power Delivery or QC 3.0 source that offers 12–20V at 3A, or a 12–24V DC supply on its DC5525 barrel jack. Pine64 rates it at up to 88W from 24V, and a 65W 20V PD charger gives about 60W. A phone charger that only offers 5V won't heat it properly.",
    },
    {
      question: "Can the Pinecil V2 run from a power bank?",
      answer:
        "Yes, if the power bank supports USB-C Power Delivery at 12V or higher. A bank that offers 20V at 3A gets close to the iron's 60W PD figure; a 12V-only bank works but heats more slowly, as Pine64 notes. Check the bank's output label for its PD voltages before relying on it for a field repair.",
    },
    {
      question: "Which is better for a complete beginner?",
      answer:
        "The Q-MING 60W Kit, if you want everything in one box: it includes a stand and five tips and plugs into the wall. The Pinecil V2 suits beginners who want a digital temperature readout and portability, already own a USB-C PD charger, and don't mind buying a stand separately.",
    },
    {
      question: "Is the Q-MING 60W temperature dial accurate?",
      answer:
        "Q-MING doesn't publish an accuracy figure, so treat the 200–450°C markings as a guide rather than a measurement. Start in the middle of the dial and turn it up only until solder flows cleanly within a couple of seconds. If you need to know the real tip temperature, a tip thermometer is the only way to check it.",
    },
    {
      question: "Can I use other tips on the Pinecil V2?",
      answer:
        "Pine64 lists the ST-B2 short tip as the one included with the V2. If you add more shapes, use tips sold for the Pinecil rather than random pen-iron tips, because the tip carries the heater and sensor connection. The Q-MING includes five tips, but its listing does not name the tip series, so buy spares from the same listing.",
    },
  ],
  roundup: {
    label: "See all soldering iron picks",
    href: "/soldering-irons/best-soldering-irons",
  },
  related: [
    { label: "Pinecil V2 review", href: "/soldering-irons/pinecil-v2-review" },
    { label: "Q-MING 60W kit review", href: "/soldering-irons/q-ming-60w-soldering-iron-kit-review" },
    { label: "Pinecil V2 vs TS101", href: "/soldering-irons/pinecil-v2-vs-ts101-soldering-iron" },
    { label: "Soldering iron buying guide", href: "/soldering-irons/soldering-iron-buying-guide" },
  ],
};

export default function PinecilV2VsQMing60wKitPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="soldering-irons" current={path} />
    </>
  );
}
