import Link from "next/link";
import {
  BarChart,
  DataTable,
  Figure,
  HowToShell,
  InfoCards,
  KeyIdea,
  ProductStrip,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-soldering-irons/page";

const description =
  "Soldering iron tip types explained: conical, chisel, bevel, and knife tips, how shape changes heat transfer and precision, and which to pick for which job.";

export const metadata = buildMetadata({
  title: "Soldering Iron Tip Types Explained",
  description,
  path: "/soldering-irons/soldering-iron-tip-types",
});

const hakko = picks.find((p) => p.name === "Hakko FX-888DX")!;
const yihua926 = picks.find((p) => p.name === "YIHUA 926 III")!;
const hs02a = picks.find((p) => p.name === "FNIRSI HS-02A")!;

const link = "text-accent hover:underline";

export default function SolderingIronTipTypesPage() {
  return (
    <HowToShell
      title="Soldering Iron Tip Types Explained"
      description={description}
      path="/soldering-irons/soldering-iron-tip-types"
      category="soldering-irons"
      published="2026-10-21"
      intro={
        <>
          Tip shape changes two things at once: how much surface area contacts the joint (affecting
          heat transfer) and how precisely you can target a small area (affecting control). Most
          soldering work only really needs two or three tip shapes, but knowing what each one actually
          trades off makes it easier to pick the right one instead of defaulting to whichever tip came
          installed.
        </>
      }
      aside={{
        image: hakko.image,
        alt: "Hakko FX-888DX soldering station",
        caption: (
          <>
            A station with a wide genuine tip ecosystem, like the Hakko FX-888DX on Hakko&apos;s T18 tips,
            makes it easy to add shapes as your work changes. See our{" "}
            <Link href="/soldering-irons/weller-we1010-vs-hakko-fx-888dx" className={link}>
              FX-888DX comparison
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "common-tip-shapes", label: "Common tip shapes" },
        { id: "relative-heat-transfer", label: "Relative heat transfer by shape" },
        { id: "conical", label: "Conical tips" },
        { id: "chisel", label: "Chisel tips" },
        { id: "bevel", label: "Bevel tips" },
        { id: "knife", label: "Knife tips" },
        { id: "specialty-shapes", label: "Specialty shapes beyond the core four" },
        { id: "side-by-side", label: "Side-by-side comparison" },
        { id: "choosing", label: "Choosing a tip for the job" },
        { id: "tip-size", label: "Sizing the tip to the joint" },
        { id: "tip-ecosystems", label: "Irons with a good tip range" },
      ]}
      faq={[
        {
          q: "Do I need a different tip for every job, or can one tip do most work?",
          a: "A single mid-size chisel or conical tip handles most general through-hole electronics work fine. It's worth owning two or three shapes/sizes once you're doing a mix of fine SMD work and larger joints, rather than forcing one tip to do everything — the wrong shape for the job costs you either precision or heat transfer.",
        },
        {
          q: "Does tip size matter as much as tip shape?",
          a: "Both matter, in different ways. Shape determines contact area and precision character; size (the diameter or width of the working end) determines how much thermal mass and surface area that shape actually has. A fine conical tip and a broad chisel tip of the same nominal shape family can behave quite differently in practice depending on their size.",
        },
        {
          q: "Can I use a chisel tip for fine SMD work if that's all I own?",
          a: "It's workable but not ideal — a chisel tip's wider edge makes it easy to accidentally bridge adjacent fine-pitch pads. A fine conical or bevel tip gives much better control for that kind of dense, closely-spaced work, and is worth the small investment if you do SMD work regularly.",
        },
        {
          q: "Are soldering iron tips interchangeable between brands?",
          a: "Rarely directly — tip mounting (the shape and size of the barrel that inserts into the iron) varies by manufacturer and often by product line, so tips are generally brand- and sometimes model-specific. Always check compatibility with your exact iron before buying replacement tips.",
        },
        {
          q: "What do the letter and number codes on soldering tips mean?",
          a: "They are each maker's shorthand for tip shape and size, usually a series prefix, a shape letter and a width or variant number. The letters are not standardized: the same letter can mean a different profile from one brand to the next. Rely on the maker's tip chart, which shows the drawn profile and the width in millimeters, instead of the code alone, and check the series matches your iron before you order.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/soldering-iron-tip-care",
          title: "Soldering Iron Tip Care",
          desc: "Keeping whichever tip shape you choose clean, tinned, and lasting longer.",
        },
        {
          href: "/soldering-irons/soldering-iron-buying-guide",
          title: "Soldering Iron Buying Guide",
          desc: "Wattage, temperature control, and tip considerations for a new iron.",
        },
      ]}
    >
      <section>
        <h2 id="common-tip-shapes" className="text-xl font-semibold mb-3">Common tip shapes at a glance</h2>
        <p className="text-muted leading-7 mb-5">
          Manufacturers offer many specific tip shapes, but nearly all of them are variations on four
          basic families:
        </p>
        <InfoCards
          items={[
            { label: "Conical", desc: "A fine point, narrowing to the tip. Good precision, smaller contact area." },
            { label: "Chisel", desc: "A flat, angled working face. Larger contact area, faster heat transfer." },
            { label: "Bevel", desc: "A rounded, angled face between conical and chisel. A balance of both." },
            { label: "Knife", desc: "A thin, blade-like edge. Good for drag soldering fine-pitch rows." },
          ]}
        />
        <Figure
          caption={
            <>
              Rough profile of each tip shape. More surface area at the working end generally means
              faster heat transfer into larger joints; a finer point means better precision on small,
              closely-spaced work.
            </>
          }
        >
          <svg viewBox="0 0 320 110" className="w-full h-auto" role="img" aria-label="Profile diagram of conical, chisel, bevel, and knife soldering iron tip shapes">
            <g className="stroke-foreground" strokeWidth="1.6" fill="none">
              <path d="M20 20 L50 20 L35 85 Z" />
              <path d="M90 20 L120 20 L112 85 L98 85 Z" />
              <path d="M160 20 L190 20 L178 85 L168 72 Z" />
              <path d="M230 20 L238 20 L250 85 L242 85 Z" />
            </g>
            <g fontSize="9.5" className="fill-muted" textAnchor="middle">
              <text x="35" y="100">Conical</text>
              <text x="105" y="100">Chisel</text>
              <text x="174" y="100">Bevel</text>
              <text x="240" y="100">Knife</text>
            </g>
          </svg>
        </Figure>
      </section>

      <section id="relative-heat-transfer">
        <h2 className="text-xl font-semibold mb-3">Relative heat transfer by shape</h2>
        <p className="text-muted leading-7 mb-4">
          As a rough guide to how much contact area (and so heat-transfer capacity) each shape offers
          at a comparable tip size:
        </p>
        <BarChart
          items={[
            { label: "Conical — smallest contact area", value: 1, display: "lowest" },
            { label: "Knife — thin edge, longer contact line", value: 1.5, display: "low-moderate" },
            { label: "Bevel — rounded, angled face", value: 2, display: "moderate" },
            { label: "Chisel — flat, broad face", value: 3, display: "highest", highlight: true },
          ]}
        />
        <p className="mt-4 text-xs text-muted">
          A relative, qualitative comparison — actual heat transfer also depends on tip size, the
          iron&apos;s wattage, and how cleanly the tip is tinned.
        </p>
      </section>

      <section>
        <h2 id="conical" className="text-xl font-semibold mb-3">Conical tips: precision over throughput</h2>
        <p className="text-muted leading-7">
          A conical tip&apos;s small, pointed contact area makes it the easiest shape to aim precisely at
          a single pad or pin without touching its neighbors, which is why it&apos;s a common default for
          fine SMD and tightly-spaced through-hole work. The trade-off is less surface area touching the
          joint, so heat transfers somewhat more slowly than a broader shape on larger, higher
          thermal-mass joints.
        </p>
      </section>

      <section>
        <h2 id="chisel" className="text-xl font-semibold mb-3">Chisel tips: heat transfer over precision</h2>
        <p className="text-muted leading-7">
          A chisel tip&apos;s flat face puts much more metal in contact with the joint, transferring
          heat faster — useful for larger through-hole joints, wire splices, and anything with
          meaningful thermal mass. The wider contact area makes it easier to accidentally bridge
          adjacent, closely-spaced pads, so it&apos;s less suited to dense SMD work.
        </p>
      </section>

      <section>
        <h2 id="bevel" className="text-xl font-semibold mb-3">Bevel tips: a middle ground</h2>
        <p className="text-muted leading-7">
          A bevel tip&apos;s rounded, angled face sits between conical and chisel in both precision and
          heat transfer, which is why many general-purpose irons ship with one as the default tip. It
          handles a wide range of joint sizes reasonably well without excelling specifically at the
          finest SMD work or the largest thermal-mass joints.
        </p>
      </section>

      <section>
        <h2 id="knife" className="text-xl font-semibold mb-3">Knife tips: drag soldering</h2>
        <p className="text-muted leading-7">
          A knife tip&apos;s thin edge is built specifically for drag soldering — running the tip along
          a row of closely-spaced pins (common on ICs) while solder flows along the edge from pin to
          pin, rather than touching down on each pin individually. It&apos;s a specialized shape, not a
          general-purpose one.
        </p>
      </section>

      <section id="specialty-shapes">
        <h2 className="text-xl font-semibold mb-3">Specialty shapes beyond the core four</h2>
        <p className="text-muted leading-7">
          A few less common shapes show up for specific jobs. A &quot;hoof&quot; tip has a rounded,
          slightly concave face, often used for soldering connector pins and light rework where a
          chisel feels too flat-edged and a conical feels too pointed. A micro-conical tip — a much
          finer version of the standard conical shape — is aimed specifically at extremely small SMD
          packages (0201, 01005), where even a standard fine conical tip is too large to approach a
          single pad without risking its neighbors. Most hobbyists never need either, but they exist
          for a reason once work gets small or specialized enough.
        </p>
      </section>

      <section>
        <h2 id="side-by-side" className="text-xl font-semibold mb-3">Side-by-side comparison</h2>
        <DataTable
          head={["Tip shape", "Contact area", "Best suited to"]}
          rows={[
            ["Conical", "Small, pointed", "Fine SMD, closely-spaced through-hole joints"],
            ["Chisel", "Large, flat", "Larger joints, wire splices, ground connections"],
            ["Bevel", "Medium, rounded", "General-purpose, mixed joint sizes"],
            ["Knife", "Thin edge", "Drag soldering rows of fine-pitch pins"],
          ]}
        />
      </section>

      <KeyIdea title="Matching tip to job beats owning every shape">
        You don&apos;t need every tip shape to solder well — a bevel or chisel tip for general work,
        plus a fine conical tip for SMD, covers the large majority of hobby and repair soldering. See our{" "}
        <Link href="/soldering-irons/soldering-iron-buying-guide" className={link}>
          buying guide
        </Link>{" "}
        for how tip ecosystem availability factors into choosing an iron in the first place.
      </KeyIdea>

      <section>
        <h2 id="choosing" className="text-xl font-semibold mb-3">Choosing a tip for the job in front of you</h2>
        <p className="text-muted leading-7">
          If you&apos;re only buying one replacement tip, a mid-size chisel or bevel tip gives the most
          general-purpose coverage. Add a fine conical tip once SMD or tightly-spaced work becomes a
          regular part of what you solder, rather than before you actually need the precision it offers.
        </p>
      </section>

      <section>
        <h2 id="tip-size" className="text-xl font-semibold mb-3">Sizing the tip to the joint</h2>
        <p className="text-muted leading-7 mb-4">
          A practical rule many technicians use is to pick the largest tip that touches only the joint you are
          working on. A tip roughly as wide as the pad delivers heat quickly without spilling onto neighbors;
          a tip much smaller than the pad has to sit on it longer, which is harder on the board than a brief
          touch from a bigger tip. The widths below are common starting points, not fixed rules, and the
          right choice also depends on how much copper sits under the pad.
        </p>
        <DataTable
          head={["Job", "Typical tip", "Common working-end width"]}
          rows={[
            ["0402/0603 passives, fine-pitch IC pins", "Fine conical or small bevel", "About 0.2–0.5 mm"],
            ["Standard through-hole leads, 0805/1206 parts", "Small chisel or bevel", "About 1.2–2.4 mm"],
            ["Drag soldering rows of IC pins", "Knife or hoof", "Edge length matched to the row"],
            ["Wire splices, connectors, ground planes", "Broad chisel", "About 3–5 mm"],
          ]}
        />
        <p className="mt-4 text-muted leading-7">
          A useful sign that a tip is too small is a joint that takes more than a few seconds to wet even
          though the tip is clean and the temperature is sensible. Rather than turning the temperature up,
          which shortens tip life and stresses pads, try the next size up first. Our{" "}
          <Link href="/soldering-irons/soldering-iron-temperature-by-metal" className={link}>
            temperature-by-metal guide
          </Link>{" "}
          covers the settings side of the same trade-off.
        </p>
      </section>

      <section>
        <h2 id="tip-ecosystems" className="text-xl font-semibold mb-3">Irons with a good tip range</h2>
        <p className="text-muted leading-7 mb-4">
          Because tips rarely cross brands, the tip system you buy into matters as much as the iron. These
          picks from our reviews either use a long-running tip series or ship with several shapes in the box,
          so adding a knife or a fine conical later is easy.
        </p>
        <ProductStrip
          title="Irons with a wide choice of tips"
          items={[
            {
              name: "Hakko FX-888DX",
              image: hakko.image,
              alt: "Hakko FX-888DX soldering station",
              href: "/soldering-irons/weller-we1010-vs-hakko-fx-888dx",
              note: "Takes Hakko's T18 tips, the same series the FX888D used, so conical, chisel, bevel and knife shapes are all available.",
            },
            {
              name: "YIHUA 926 III",
              image: yihua926.image,
              alt: "YIHUA 926 LED III soldering station kit with tips",
              href: "/soldering-irons/best-soldering-irons#yihua-926-iii",
              note: "Uses common 900M-series tips, and the Amazon kit includes six of them to start with.",
            },
            {
              name: "FNIRSI HS-02A",
              image: hs02a.image,
              alt: "FNIRSI HS-02A USB-C smart soldering iron kit",
              href: "/soldering-irons/best-soldering-irons#fnirsi-hs-02a",
              note: "Kit ships with six tips (K, KU, JS, I, C2, B); buy HS-02A tips specifically, as the HS-02B uses a different set.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
