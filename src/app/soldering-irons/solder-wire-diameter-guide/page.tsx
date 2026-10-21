import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  HowToShell,
  KeyIdea,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";

const description =
  "How to choose solder wire diameter: thinner wire gives finer control for SMD work, thicker wire feeds faster on larger joints and wire splices.";

export const metadata = buildMetadata({
  title: "How to Choose Solder Wire Diameter",
  description,
  path: "/soldering-irons/solder-wire-diameter-guide",
});

export default function SolderWireDiameterGuidePage() {
  return (
    <HowToShell
      title="How to Choose Solder Wire Diameter for Electronics Repair"
      description={description}
      path="/soldering-irons/solder-wire-diameter-guide"
      category="soldering-irons"
      published="2026-10-21"
      intro={
        <>
          Solder wire diameter is really about control. A thinner wire lets you feed a small, precise
          amount onto a tiny pad without over-applying; a thicker wire feeds solder faster when you need
          to cover a bigger joint without taking forever. Most hobbyists end up with one general-purpose
          diameter plus a finer spool for detailed work, rather than a single size that does everything
          equally well.
        </>
      }
      toc={[
        { id: "why-diameter-matters", label: "Why diameter matters beyond “more solder, faster”" },
        { id: "common-diameters", label: "Common solder wire diameters" },
        { id: "by-use-case", label: "Which diameter for which job" },
        { id: "diameter-vs-flux", label: "Diameter is separate from flux type and core %" },
        { id: "one-spool-or-several", label: "Do you need more than one spool?" },
      ]}
      faq={[
        {
          q: "What's a good general-purpose solder diameter if I only want to buy one spool?",
          a: "0.6mm to 0.8mm (roughly 0.025\" to 0.031\") covers most general through-hole electronics and hobby repair work reasonably well. It's thin enough for a reasonable degree of control, and thick enough not to feel painfully slow on everyday joints.",
        },
        {
          q: "Is thinner solder wire always better for precision?",
          a: "Not in every case — very thin wire is excellent for feeding tiny, exact amounts onto fine SMD pads, but it can feel slow and fussy on larger through-hole joints or wire splices, where you'd need to feed a lot of wire to build up enough solder. Match diameter to the joint size, not just \"always thinner for precision.\"",
        },
        {
          q: "Does solder diameter affect how hot I need to run my iron?",
          a: "Not directly — it's the joint's thermal mass and the solder alloy's melting point that set the required temperature, covered in our temperature guide. Diameter mainly affects feed rate and control, not the melting behaviour of the solder itself.",
        },
        {
          q: "Can I use thick solder wire on fine SMD work if that's all I have?",
          a: "It's workable but awkward — a thick wire makes it harder to feed a small, controlled amount, increasing the risk of bridging adjacent fine-pitch pads with excess solder. If you do SMD work regularly, a thinner spool (0.5mm or less) is a worthwhile small investment.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/60-40-vs-63-37-solder",
          title: "60/40 vs 63/37 Solder",
          desc: "The alloy question, separate from diameter — which to buy and why.",
        },
        {
          href: "/soldering-irons/soldering-iron-tip-types",
          title: "Soldering Iron Tip Types Explained",
          desc: "Matching tip shape to the same jobs this page matches solder diameter to.",
        },
      ]}
    >
      <section>
        <h2 id="why-diameter-matters" className="text-xl font-semibold mb-3">Why diameter matters beyond &quot;more solder, faster&quot;</h2>
        <p className="text-muted leading-7">
          Thinner wire gives you finer control over exactly how much solder reaches a joint per touch,
          which matters most on small, closely-spaced pads where even a slight excess risks bridging two
          connections together. Thicker wire delivers more solder per length fed, which matters on
          larger joints and wire splices where you&apos;d otherwise need to feed a long length of thin
          wire just to build up enough solder.
        </p>
      </section>

      <section>
        <h2 id="common-diameters" className="text-xl font-semibold mb-3">Common solder wire diameters</h2>
        <BarChart
          items={[
            { label: "0.5mm (0.020\")", value: 0.5, display: "Fine SMD, tight-pitch work" },
            { label: "0.6mm (0.025\")", value: 0.6, display: "General electronics, versatile", highlight: true },
            { label: "0.8mm (0.031\")", value: 0.8, display: "General electronics, slightly faster feed" },
            { label: "1.0mm (0.040\")", value: 1.0, display: "Larger joints, wire splicing" },
            { label: "1.6mm (0.062\")", value: 1.6, display: "Heavy joints, bulk/production work" },
          ]}
        />
      </section>

      <section>
        <h2 id="by-use-case" className="text-xl font-semibold mb-3">Which diameter for which job</h2>
        <DataTable
          head={["Job", "Suggested diameter", "Why"]}
          rows={[
            ["Fine-pitch SMD, dense boards", "0.5mm or thinner", "Precise, small feed amounts reduce bridging risk"],
            ["General through-hole electronics repair", "0.6–0.8mm", "Balances control and feed speed for most common joints"],
            ["Wire splicing, larger connectors", "0.8–1.0mm", "Faster to build up enough solder for bigger thermal mass joints"],
            ["Heavy-gauge wire, bulk/production soldering", "1.0mm or thicker", "Minimizes feed time across many larger joints"],
          ]}
        />
      </section>

      <section id="diameter-vs-flux">
        <Callout title="Diameter is separate from flux type and core percentage">
          A solder spool&apos;s diameter, its flux core percentage, and its alloy (leaded vs.
          lead-free, or the specific ratio like{" "}
          <Link href="/soldering-irons/60-40-vs-63-37-solder" className="underline">
            60/40 vs 63/37
          </Link>
          ) are three independent specs. Don&apos;t assume a thinner spool automatically has different
          flux or alloy — check the label for all three separately when choosing a spool.
        </Callout>
      </section>

      <section>
        <h2 id="one-spool-or-several" className="text-xl font-semibold mb-3">Do you need more than one spool?</h2>
        <p className="text-muted leading-7">
          For general hobby and repair work, one 0.6-0.8mm spool handles the large majority of jobs
          reasonably well. Add a thinner 0.5mm or smaller spool once SMD or fine-pitch work becomes a
          regular part of what you solder, and consider a thicker spool only if you&apos;re regularly
          doing wire splicing or larger-joint work where feed speed genuinely matters.
        </p>
      </section>

      <KeyIdea title="When in doubt, start with 0.6mm">
        It&apos;s the most forgiving general-purpose diameter for someone building a first soldering
        kit — fine enough to control on most through-hole joints, and not so thin that general repair
        work feels slow.
      </KeyIdea>
    </HowToShell>
  );
}
