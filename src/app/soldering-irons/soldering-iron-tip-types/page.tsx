import Link from "next/link";
import {
  DataTable,
  Figure,
  HowToShell,
  InfoCards,
  KeyIdea,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";

const description =
  "Soldering iron tip types explained: conical, chisel, bevel, and knife tips, how their shape changes heat transfer and precision, and which to pick for which job.";

export const metadata = buildMetadata({
  title: "Soldering Iron Tip Types Explained",
  description,
  path: "/soldering-irons/soldering-iron-tip-types",
});

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
      toc={[
        { id: "common-tip-shapes", label: "Common tip shapes" },
        { id: "conical", label: "Conical tips" },
        { id: "chisel", label: "Chisel tips" },
        { id: "bevel", label: "Bevel tips" },
        { id: "knife", label: "Knife tips" },
        { id: "side-by-side", label: "Side-by-side comparison" },
        { id: "choosing", label: "Choosing a tip for the job" },
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

      <section>
        <h2 id="conical" className="text-xl font-semibold mb-3">Conical tips: precision over throughput</h2>
        <p className="text-muted leading-7">
          A conical tip&apos;s small, pointed contact area makes it the easiest shape to aim precisely at
          a single pad or pin without touching its neighbours, which is why it&apos;s a common default for
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
          pin, rather than touching down on each pin individually. It&apos;s a specialised shape, not a
          general-purpose one.
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
    </HowToShell>
  );
}
