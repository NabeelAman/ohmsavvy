import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  ProductStrip,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-soldering-irons/page";

const description =
  "How to choose solder wire diameter: thinner wire gives finer control for SMD work, thicker wire feeds faster on larger joints and wire splices.";

export const metadata = buildMetadata({
  title: "How to Choose Solder Wire Diameter",
  description,
  path: "/soldering-irons/solder-wire-diameter-guide",
});

const pinecil = picks.find((p) => p.name === "Pinecil V2")!;
const fx888dx = picks.find((p) => p.name === "Hakko FX-888DX")!;
const weller = picks.find((p) => p.name === "Weller WE1010NA")!;
const link = "text-accent hover:underline";

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
      aside={{
        image: pinecil.image,
        alt: "Pinecil V2 portable USB-C powered soldering iron",
        caption: (
          <>
            Pairing a finer solder diameter with a precise iron, like the Pinecil V2, is what actually
            makes fine-pitch work controllable. See our{" "}
            <Link href="/soldering-irons/pinecil-v2-review" className={link}>
              full review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "why-diameter-matters", label: "Why diameter matters beyond “more solder, faster”" },
        { id: "common-diameters", label: "Common solder wire diameters" },
        { id: "by-use-case", label: "Which diameter for which job" },
        { id: "bridging-risk", label: "Seeing the bridging risk directly" },
        { id: "the-area-math", label: "Why a small diameter change matters more than it looks" },
        { id: "diameter-vs-flux", label: "Diameter is separate from flux type and core %" },
        { id: "one-spool-or-several", label: "Do you need more than one spool?" },
        { id: "irons", label: "Irons that suit fine and heavy wire" },
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
          a: "Not directly — it's the joint's thermal mass and the solder alloy's melting point that set the required temperature, covered in our temperature guide. Diameter mainly affects feed rate and control, not the melting behavior of the solder itself.",
        },
        {
          q: "Can I use thick solder wire on fine SMD work if that's all I have?",
          a: "It's workable but awkward — a thick wire makes it harder to feed a small, controlled amount, increasing the risk of bridging adjacent fine-pitch pads with excess solder. If you do SMD work regularly, a thinner spool (0.5mm or less) is a worthwhile small investment.",
        },
        {
          q: "What solder diameter should I use for 0603 or 0402 SMD parts?",
          a: "For 0805 and 0603 passives and SOIC chips, 0.5mm wire is usually comfortable. For 0402 parts or 0.5mm-pitch ICs, many technicians drop to 0.3–0.4mm wire, or tin one pad with a touch of wire and add extra flux, because even 0.5mm wire carries more solder per millimeter than a pad that small needs.",
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
            { label: "Fine SMD, tight-pitch work", value: 0.5, display: "0.5mm (0.020\")" },
            { label: "General electronics, versatile", value: 0.6, display: "0.6mm (0.025\")", highlight: true },
            { label: "General electronics, faster feed", value: 0.8, display: "0.8mm (0.031\")" },
            { label: "Larger joints, wire splicing", value: 1.0, display: "1.0mm (0.040\")" },
            { label: "Heavy joints, bulk work", value: 1.6, display: "1.6mm (0.062\")" },
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

      <section id="bridging-risk">
        <h2 className="text-xl font-semibold mb-3">Seeing the bridging risk directly</h2>
        <p className="text-muted leading-7 mb-4">
          On a small, closely-spaced SMD pad, a thin wire lets you place just enough solder to wet
          that one pad; a thick wire feeds more than the pad can hold per touch, and the excess has
          nowhere to go but sideways — onto the neighboring pad.
        </p>
        <Figure
          caption={
            <>
              Same pad spacing, two wire diameters. The thin wire (left) deposits a controlled amount
              that stays on its own pad. The thick wire (right) feeds more solder than the pad needs,
              and the excess bridges to the pad next to it.
            </>
          }
        >
          <svg viewBox="0 0 300 120" className="w-full h-auto" role="img" aria-label="Diagram comparing thin and thick solder wire feeding onto closely-spaced SMD pads">
            <g>
              <rect x="20" y="70" width="24" height="30" rx="2" className="fill-muted/40 stroke-border" strokeWidth="1" />
              <rect x="56" y="70" width="24" height="30" rx="2" className="fill-muted/40 stroke-border" strokeWidth="1" />
              <circle cx="32" cy="72" r="6" className="fill-accent/70 stroke-accent" strokeWidth="1.2" />
              <line x1="32" y1="40" x2="32" y2="60" className="stroke-foreground" strokeWidth="2" />
              <text x="50" y="112" fontSize="10" textAnchor="middle" className="fill-foreground">Thin wire: stays on its pad</text>
            </g>
            <g>
              <rect x="200" y="70" width="24" height="30" rx="2" className="fill-muted/40 stroke-border" strokeWidth="1" />
              <rect x="236" y="70" width="24" height="30" rx="2" className="fill-muted/40 stroke-border" strokeWidth="1" />
              <ellipse cx="224" cy="72" rx="20" ry="7" className="fill-accent/70 stroke-accent" strokeWidth="1.2" />
              <line x1="212" y1="38" x2="212" y2="58" className="stroke-foreground" strokeWidth="4" />
              <text x="230" y="112" fontSize="10" textAnchor="middle" className="fill-foreground">Thick wire: bridges to the next pad</text>
            </g>
          </svg>
        </Figure>
      </section>

      <section id="the-area-math">
        <KeyIdea title="Why a small diameter change matters more than it looks">
          Wire diameter doesn&apos;t scale the amount of solder you&apos;re feeding in a straight line —
          the cross-sectional area (and so the volume fed per length of wire) scales with the diameter
          <em>squared</em>. Going from 0.5mm to 1.0mm sounds like &quot;twice as much wire,&quot; but
          it&apos;s actually about four times the solder volume for the same length fed, since area is
          proportional to diameter squared (πr²). That&apos;s the real reason a &quot;slightly
          thicker&quot; spool can feel dramatically more prone to over-applying on fine work than the
          diameter numbers alone suggest.
        </KeyIdea>
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

      <section id="irons">
        <h2 className="text-xl font-semibold mb-3">Irons that suit fine and heavy wire</h2>
        <p className="text-muted leading-7 mb-4">
          Thin wire rewards a small tip and stable temperature; thick wire on heavy joints needs an iron with
          enough power to keep up. These verified picks cover both ends.
        </p>
        <ProductStrip
          title="Irons for every solder diameter"
          items={[
            {
              name: "Pinecil V2",
              image: pinecil.image,
              alt: "Pinecil V2 USB-C soldering iron",
              href: "/soldering-irons/pinecil-v2-review",
              note: "Up to 88W at 24V with an OLED temperature display, in a pen-sized body that suits fine-wire SMD work.",
            },
            {
              name: "Hakko FX-888DX",
              image: fx888dx.image,
              alt: "Hakko FX-888DX digital soldering station",
              href: "/soldering-irons/best-soldering-irons#hakko-fx-888dx",
              note: "100W station with a 65W iron, closed-loop control from 50 to 480°C and Hakko T18 tips.",
            },
            {
              name: "Weller WE1010NA",
              image: weller.image,
              alt: "Weller WE1010NA 70W digital soldering station",
              href: "/soldering-irons/weller-we1010na-review",
              note: "70W, ESD-safe digital station that reaches 350°C in about 28 seconds from 50°C, per Weller.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
