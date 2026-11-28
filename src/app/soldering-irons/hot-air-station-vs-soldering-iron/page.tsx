// Educational page. The hot-air-vs-contact-iron distinction is well-established soldering/rework engineering
// knowledge — no per-instance citation required per CONTENT_STANDARDS.md §1. Product-specific specs below reuse
// existing verified Picks' own stated figures only (YIHUA 862BD+, Hakko FX-888DX).
import Link from "@/components/AppLink";
import {
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  ProductStrip,
} from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const all = getAllPicks("soldering-irons");
const yihua862 = all.find((p) => p.name === "YIHUA 862BD+")!;
const fx888dx = all.find((p) => p.name === "Hakko FX-888DX")!;
const pinecil = all.find((p) => p.name === "Pinecil V2")!;

const description =
  "Hot air station vs soldering iron: what each tool heats and how, when SMD/BGA rework needs hot air, with real specs from a 2-in-1 station.";

export const metadata = buildMetadata({
  title: "Hot Air Station vs Soldering Iron",
  description,
  path: "/soldering-irons/hot-air-station-vs-soldering-iron",
  image: yihua862.image,
});

const link = "text-accent hover:underline";

/** Direct-contact heating (iron) vs non-contact heated airflow (hot air gun). */
function HeatingMethodDiagram() {
  return (
    <svg
      viewBox="0 0 320 150"
      className="w-full h-auto"
      role="img"
      aria-label="Comparison of heating methods. A soldering iron transfers heat by direct physical contact between its tip and the joint. A hot air gun transfers heat with a stream of heated air that surrounds a component with no physical contact at all."
    >
      <line x1="40" y1="30" x2="70" y2="70" className="stroke-accent" strokeWidth="4" strokeLinecap="round" />
      <circle cx="75" cy="78" r="4" className="fill-accent" />
      <rect x="55" y="95" width="40" height="12" rx="2" className="fill-surface stroke-foreground" strokeWidth="1.5" />
      <text x="75" y="125" fontSize="8.5" textAnchor="middle" className="fill-muted">Direct contact (iron)</text>
      <path d="M220 35 L220 60" className="stroke-foreground" strokeWidth="3" />
      <path d="M205 60 Q220 75 235 60" className="stroke-accent" strokeWidth="2" fill="none" strokeDasharray="4 3" />
      <path d="M200 70 Q220 88 240 70" className="stroke-accent" strokeWidth="2" fill="none" strokeDasharray="4 3" />
      <rect x="205" y="90" width="30" height="12" rx="2" className="fill-surface stroke-foreground" strokeWidth="1.5" />
      <text x="220" y="125" fontSize="8.5" textAnchor="middle" className="fill-muted">Heated airflow, no contact</text>
    </svg>
  );
}

export default function HotAirStationVsSolderingIronPage() {
  return (
    <HowToShell
      title="Hot Air Station vs Soldering Iron"
      description={description}
      published="2026-11-28"
      path="/soldering-irons/hot-air-station-vs-soldering-iron"
      category="soldering-irons"
      intro={
        <>
          A soldering iron heats a joint through direct physical contact with its tip, while a hot air rework station
          heats with a stream of heated air and never touches the component at all. That difference makes hot air
          the right tool for surface-mount parts with pins or pads you can&apos;t reach with an iron, like many QFN and
          BGA packages, while an iron stays the better choice for precise, single-joint work where you need direct
          control. This guide breaks down when you genuinely need each.
        </>
      }
      aside={{
        image: yihua862.image,
        alt: "YIHUA 862BD+ combined soldering iron and hot air rework station",
        caption: (
          <>
            The YIHUA 862BD+ combines both tools in one station — a real example of why they&apos;re treated as separate
            categories rather than one replacing the other. See{" "}
            <Link href="/soldering-irons/weller-we1010na-vs-yihua-862bd-plus" className={link}>
              Weller WE1010NA vs YIHUA 862BD+
            </Link>{" "}
            for a specific head-to-head between an iron-only station and this 2-in-1 unit.
          </>
        ),
      }}
      toc={[
        { id: "what", label: "How each tool actually heats a joint" },
        { id: "when-iron", label: "When a soldering iron is the right tool" },
        { id: "when-air", label: "When you genuinely need hot air" },
        { id: "real", label: "Real specs from a combined station" },
        { id: "risks", label: "Hot air's real risks" },
        { id: "which", label: "Which to buy first" },
      ]}
      faq={[
        {
          q: "Can a soldering iron replace a hot air station?",
          a:
            "Not for every job. An iron can reach any pin or pad you can physically touch with its tip, which covers through-hole work and most leaded SMD parts. It can't reflow pads hidden underneath a component, like BGA balls under a chip, which is exactly the job hot air is built for.",
        },
        {
          q: "Can a hot air station replace a soldering iron?",
          a:
            "No. Hot air heats a wider area at once with less precise control over a single joint, and it can't apply the kind of direct, localized heat an iron gives you for everyday through-hole and accessible SMD soldering. Most rework benches keep both tools rather than choosing one.",
        },
        {
          q: "Do I need hot air for basic Arduino or hobby electronics?",
          a:
            "Usually not at first. Most hobby-level through-hole and larger SMD work (0805 and up) is entirely doable with just a soldering iron. Hot air becomes worth it once you're working with QFN, BGA, or other packages with hidden pads, or doing SMD rework where you need to remove and replace parts cleanly.",
        },
        {
          q: "Is a combined iron-and-hot-air station a good choice?",
          a:
            "Yes, if you genuinely need both and have bench space for one unit instead of two. The YIHUA 862BD+ is a real example: a 75W iron and a separate 500W hot air gun with independently adjustable temperatures in one station, aimed specifically at SMD and BGA rework alongside general soldering.",
        },
        {
          q: "What temperature does hot air rework actually need?",
          a:
            "It depends on the solder and the component, but a combined station like the YIHUA 862BD+ offers a 100–480°C hot air range specifically to cover that variation, independent from its iron's own 200–480°C range. Always start low and work up rather than defaulting to maximum heat.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/weller-we1010na-vs-yihua-862bd-plus",
          title: "Weller WE1010NA vs YIHUA 862BD+",
          desc: "A specific head-to-head between an iron-only station and a 2-in-1 hot air station.",
        },
        {
          href: "/soldering-irons/how-to-tin-a-soldering-iron-tip",
          title: "How to Tin a Soldering Iron Tip",
          desc: "Iron maintenance that matters regardless of whether you also own a hot air station.",
        },
      ]}
    >
      <section>
        <h2 id="what" className="text-xl font-semibold mb-3">How each tool actually heats a joint</h2>
        <p className="text-muted leading-7 mb-4">
          A soldering iron&apos;s tip physically touches the joint, conducting heat directly into the metal you&apos;re
          soldering. A hot air gun instead blows a stream of heated air across a wider area, heating a component and
          its surrounding joints by convection, with no physical contact at all. That single difference, contact
          versus airflow, is what defines where each tool is genuinely the right one.
        </p>
        <Figure caption={<>Direct physical contact (soldering iron) against heated, non-contact airflow (hot air gun).</>}>
          <HeatingMethodDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="when-iron" className="text-xl font-semibold mb-3">When a soldering iron is the right tool</h2>
        <p className="text-muted leading-7">
          Use an iron for through-hole components, any SMD part you can physically touch with the tip, and anywhere
          you need precise, localized heat on exactly one joint without affecting its neighbors. The iron&apos;s direct
          contact gives you tight control over exactly where the heat goes, which is exactly what most everyday
          soldering and repair work actually needs.
        </p>
      </section>

      <section>
        <h2 id="when-air" className="text-xl font-semibold mb-3">When you genuinely need hot air</h2>
        <p className="text-muted leading-7 mb-4">
          Hot air earns its place specifically for components whose solder joints an iron physically can&apos;t reach:
          BGA packages with solder balls hidden underneath the chip body, QFN packages with pads tucked under the
          component, and any situation where you need to heat an entire part evenly to remove or reseat it without
          touching individual pins.
        </p>
        <KeyIdea title="Hot air solves an access problem, not a precision problem">
          The reason hot air exists isn&apos;t that it&apos;s somehow better at soldering than an iron — it&apos;s that some
          components have joints an iron simply cannot physically touch. Once a joint is accessible to a tip, an
          iron is usually still the more precise and controllable tool.
        </KeyIdea>
      </section>

      <section>
        <h2 id="real" className="text-xl font-semibold mb-3">Real specs from a combined station</h2>
        <p className="text-muted leading-7 mb-4">
          The YIHUA 862BD+ pairs both tools in one unit, with independently adjustable temperatures for each:
        </p>
        <DataTable
          head={["Tool", "Power", "Temperature range", "Control"]}
          rows={[
            ["Iron half", "75W", "200–480°C", "Independent LED readout"],
            ["Hot air half", "500W", "100–480°C", "Independent LED readout"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For comparison, an iron-only bench station like the Hakko FX-888DX runs a 100W station with its handpiece
          drawing 65W, across a 50–480°C range, with digital closed-loop control and five saved presets — a
          dedicated iron with more precise temperature stability, but no hot air capability at all.
        </p>
      </section>

      <section>
        <h2 id="risks" className="text-xl font-semibold mb-3">Hot air&apos;s real risks</h2>
        <p className="text-muted leading-7">
          Heated airflow spreads further than an iron&apos;s tip, which means it&apos;s easy to overheat or dislodge small
          nearby components if you&apos;re not careful with airflow, nozzle size and distance. Hot air work generally
          takes more practice to control well than basic iron soldering, and it&apos;s worth practicing on scrap boards
          before attempting rework on something you can&apos;t easily replace.
        </p>
      </section>

      <section>
        <h2 id="which" className="text-xl font-semibold mb-3">Which to buy first</h2>
        <p className="text-muted leading-7 mb-6">
          Start with a soldering iron. It covers the overwhelming majority of hobby and repair soldering on its own.
          Add hot air, or step up to a combined station, once you&apos;re actually working with components an iron can&apos;t
          physically reach.
        </p>
        <ProductStrip
          title="Where to start"
          items={[
            {
              name: "Hakko FX-888DX",
              image: fx888dx.image,
              alt: "Hakko FX-888DX soldering station",
              href: "/soldering-irons/best-soldering-iron-for-circuit-board-repair",
              note: "A dedicated iron station with precise digital control, no hot air capability.",
            },
            {
              name: "Pinecil V2",
              image: pinecil.image,
              alt: "Pinecil V2 portable USB-C soldering iron",
              href: "/soldering-irons/best-soldering-iron-for-beginners",
              note: "A portable iron-only option for everyday through-hole and accessible SMD work.",
            },
            {
              name: "YIHUA 862BD+",
              image: yihua862.image,
              alt: "YIHUA 862BD+ combined soldering iron and hot air station",
              href: "/soldering-irons/best-soldering-iron-for-rework",
              note: "A genuine 2-in-1: a 75W iron and a 500W hot air gun with independent temperature control.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
