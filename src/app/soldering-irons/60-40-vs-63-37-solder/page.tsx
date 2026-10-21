import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  InfoCards,
  KeyIdea,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";

const description =
  "63/37 is the eutectic alloy, melting at one single temperature with no soft plastic phase, while 60/40 passes through a plastic range on the way to solid.";

export const metadata = buildMetadata({
  title: "60/40 vs 63/37 Solder: What's the Difference?",
  description,
  path: "/soldering-irons/60-40-vs-63-37-solder",
});

const link = "text-accent hover:underline";

export default function SolderComparisonPage() {
  return (
    <HowToShell
      title="60/40 vs 63/37 Solder: What's the Difference?"
      description={description}
      path="/soldering-irons/60-40-vs-63-37-solder"
      category="soldering-irons"
      published="2026-10-21"
      intro={
        <>
          Both 60/40 and 63/37 are tin-lead solder alloys, and both solder electronics perfectly well —
          the real difference is in how each one transitions from liquid to solid while cooling. 63/37
          is the eutectic ratio, meaning it melts and solidifies at one single temperature with no soft,
          in-between phase; 60/40 passes through a genuine plastic (pasty) range on the way down. That
          one metallurgical fact is behind almost every practical difference between them.
        </>
      }
      toc={[
        { id: "what-the-numbers-mean", label: "What the numbers mean" },
        { id: "eutectic-vs-non-eutectic", label: "Eutectic vs. non-eutectic, explained" },
        { id: "melting-ranges", label: "Melting ranges compared" },
        { id: "why-it-matters", label: "Why the plastic range actually matters" },
        { id: "side-by-side", label: "Side-by-side comparison" },
        { id: "which-to-buy", label: "Which one should you buy" },
      ]}
      faq={[
        {
          q: "Is 63/37 solder objectively better than 60/40?",
          a: "For hand soldering electronics, most people find 63/37 noticeably more forgiving because there's no plastic range to hold still through — the joint simply goes from liquid to solid at one point. 60/40 isn't defective or low quality; it just demands slightly more care (staying still a moment longer while it passes through its plastic range) to avoid a fractured joint.",
        },
        {
          q: "Can I mix 60/40 and 63/37 solder on the same joint?",
          a: "You can, and it won't damage anything, but the resulting mixture is neither ratio anymore — its melting behaviour shifts toward whichever alloy dominates the mix, and you lose the predictability of either pure ratio. For consistent, repeatable results, it's better to stick with one alloy per spool and avoid topping up a leftover joint with a different ratio.",
        },
        {
          q: "Does the tin percentage affect how long solder lasts on the shelf?",
          a: "Not meaningfully — both 60/40 and 63/37 solder wire store well for years if kept reasonably dry and away from extreme heat; shelf life issues with solder wire usually come from the flux core degrading or drying out over a very long time, not the metal alloy itself changing.",
        },
        {
          q: "Why do some irons list a minimum temperature around 300°C if solder melts near 183°C?",
          a: "The iron's tip needs to run meaningfully hotter than the solder's melting point so it can transfer enough heat into the joint fast enough, since the joint itself is constantly losing heat to the surrounding metal and air. Setting the iron only a few degrees above the solder's melting point means very slow, unreliable melting in practice.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/how-to-use-a-soldering-iron",
          title: "How to Use a Soldering Iron",
          desc: "Where solder choice fits into the full soldering process.",
        },
        {
          href: "/soldering-irons/soldering-iron-not-melting-solder",
          title: "Why Won't My Soldering Iron Melt Solder?",
          desc: "Using the wrong solder-to-temperature match is one of the causes covered there.",
        },
      ]}
    >
      <section>
        <h2 id="what-the-numbers-mean" className="text-xl font-semibold mb-3">What the numbers actually mean</h2>
        <p className="text-muted leading-7">
          Both figures describe the alloy by weight: 60/40 solder is 60% tin and 40% lead; 63/37 is 63%
          tin and 37% lead. That small, 3-percentage-point shift in the tin-to-lead ratio happens to land
          almost exactly on the eutectic point for this alloy system — the one specific ratio where the
          metal behaves fundamentally differently while cooling, covered next.
        </p>
      </section>

      <section>
        <h2 id="eutectic-vs-non-eutectic" className="text-xl font-semibold mb-3">Eutectic vs. non-eutectic, explained simply</h2>
        <p className="text-muted leading-7 mb-4">
          A pure metal, or an alloy at its eutectic ratio, melts and freezes at one single, sharp
          temperature — liquid above that point, solid below it, with no in-between state. Most alloy
          mixtures, including 60/40 tin-lead, don&apos;t share this property: they have a melting range
          with a lower temperature (solidus, fully solid below this) and a higher one (liquidus, fully
          liquid above this), and between those two points the alloy exists as a soft, semi-solid
          &quot;plastic&quot; or &quot;pasty&quot; mush — not fully liquid, not fully solid. 63/37 sits at
          tin-lead&apos;s eutectic ratio, so it skips that pasty phase entirely.
        </p>
        <Figure
          caption={
            <>
              Cooling behaviour of each alloy. 63/37 (eutectic) drops straight from liquid to solid at a
              single point. 60/40 (non-eutectic) passes through a plastic/pasty range between its
              liquidus and solidus temperatures, where any movement can fracture the forming joint.
            </>
          }
        >
          <svg viewBox="0 0 320 170" className="w-full h-auto" role="img" aria-label="Cooling curve comparison of 63/37 eutectic solder versus 60/40 non-eutectic solder">
            <g className="stroke-border" strokeWidth="1">
              <line x1="40" y1="10" x2="40" y2="150" />
              <line x1="40" y1="150" x2="300" y2="150" />
            </g>
            <text x="20" y="20" fontSize="9" className="fill-muted" textAnchor="middle" transform="rotate(-90 20 85)">Temperature</text>
            <text x="170" y="165" fontSize="9" className="fill-muted" textAnchor="middle">Time (cooling →)</text>

            <path d="M50 30 L160 30 L300 120" fill="none" className="stroke-accent" strokeWidth="2.2" />
            <circle cx="160" cy="30" r="3" className="fill-accent" />
            <text x="165" y="26" fontSize="9" className="fill-accent">183°C — melts/freezes instantly</text>
            <text x="55" y="24" fontSize="9" className="fill-accent">63/37 (eutectic)</text>

            <path d="M50 46 L140 46 L210 96 L300 134" fill="none" className="stroke-foreground" strokeWidth="2" strokeDasharray="5 3" />
            <circle cx="140" cy="46" r="3" className="fill-foreground" />
            <circle cx="210" cy="96" r="3" className="fill-foreground" />
            <text x="213" y="92" fontSize="9" className="fill-foreground">183°C solidus</text>
            <text x="100" y="40" fontSize="9" className="fill-foreground">191°C liquidus</text>
            <text x="55" y="40" fontSize="9" className="fill-foreground">60/40 (non-eutectic)</text>
            <rect x="140" y="46" width="70" height="50" className="fill-foreground" opacity="0.08" />
            <text x="175" y="70" fontSize="8" textAnchor="middle" className="fill-muted">plastic / pasty range</text>
          </svg>
        </Figure>
      </section>

      <section>
        <h2 id="melting-ranges" className="text-xl font-semibold mb-3">Melting ranges compared</h2>
        <BarChart
          items={[
            { label: "63/37 melts/freezes at", value: 183, display: "183°C (single point)", highlight: true },
            { label: "60/40 solidus (fully solid below)", value: 183, display: "183°C" },
            { label: "60/40 liquidus (fully liquid above)", value: 191, display: "191°C" },
          ]}
        />
        <p className="mt-4 text-muted leading-7">
          Note that both alloys share the same 183°C lower bound — that figure is actually the tin-lead
          eutectic temperature itself. 63/37&apos;s entire transition happens right at that point; 60/40
          needs another 8°C of cooling past it before it&apos;s genuinely solid all the way through.
        </p>
        <div className="mt-5">
          <InfoCards
            items={[
              { label: "Wire splicing", desc: "63/37 is easier to keep still through — no plastic window to protect." },
              { label: "General PCB repair", desc: "Either works well; 60/40 is fine if the joint can stay undisturbed while cooling." },
              { label: "Fine-pitch / SMD rework", desc: "63/37's sharp set point is the safer default when movement is hard to avoid." },
            ]}
          />
        </div>
      </section>

      <section id="why-it-matters">
        <Callout title="Why the plastic range actually matters for joint quality">
          During 60/40&apos;s plastic range, the joint is soft enough that movement — a nudged wire, a
          bumped board, even vibration — can disturb the forming crystal structure, producing exactly
          the dull, grainy, fractured appearance of a cold solder joint described in our{" "}
          <Link href="/soldering-irons/how-to-use-a-soldering-iron" className="underline">
            how-to guide
          </Link>
          . 63/37 has no such window to protect, which is the main practical reason many hobbyists
          prefer it for hand soldering.
        </Callout>
      </section>

      <section>
        <h2 id="side-by-side" className="text-xl font-semibold mb-3">Side-by-side comparison</h2>
        <DataTable
          head={["", "60/40", "63/37"]}
          rows={[
            ["Composition", "60% tin, 40% lead", "63% tin, 37% lead"],
            ["Melting behaviour", "Non-eutectic — 183–191°C plastic range", "Eutectic — melts/freezes at 183°C sharply"],
            ["Sensitivity to movement while cooling", "Higher — must stay still through the plastic range", "Lower — solidifies almost instantly"],
            ["Typical cost", "Usually slightly cheaper", "Usually a small premium over 60/40"],
            ["Common use", "General hand soldering, less critical joints", "Preferred for fine work and hand-soldering precision"],
          ]}
        />
      </section>

      <KeyIdea title="Both are leaded alloys — the same safety handling applies">
        Neither ratio is lead-free. Wash your hands after handling either, avoid eating at the bench,
        and ensure reasonable ventilation for flux fumes — the safety basics covered in our{" "}
        <Link href="/soldering-irons/how-to-use-a-soldering-iron" className={link}>
          how-to guide
        </Link>{" "}
        apply equally to both alloys.
      </KeyIdea>

      <section id="third-alloy">
        <Callout title="There's a third common alloy worth knowing about: 62/36/2">
          Adding roughly 2% silver to the 63/37 ratio (giving 62% tin, 36% lead, 2% silver) produces an
          alloy with a very similar eutectic-like melting behaviour, slightly stronger joints, and
          better wetting on silver-plated components and terminals. It costs more than plain 63/37 and
          isn&apos;t necessary for everyday work, but it&apos;s a reasonable upgrade specifically for
          silver-plated connectors and RF/precision work where the extra wetting and joint strength pay
          off.
        </Callout>
      </section>

      <section>
        <h2 id="which-to-buy" className="text-xl font-semibold mb-3">Which one should you buy?</h2>
        <p className="text-muted leading-7">
          For general hobby and repair work, either alloy solders a sound joint when the technique in
          our{" "}
          <Link href="/soldering-irons/how-to-use-a-soldering-iron" className={link}>
            how-to guide
          </Link>{" "}
          is followed — holding the joint still while it cools matters for 60/40, and is simply less
          critical for 63/37. Many hobbyists choose 63/37 specifically to remove that one variable,
          especially for fine-pitch or SMD work where even small movement is harder to avoid. Whichever
          you choose, set your iron&apos;s temperature with the correct melting point in mind — see our{" "}
          <Link href="/soldering-irons/soldering-iron-not-melting-solder" className={link}>
            troubleshooting guide
          </Link>{" "}
          if solder isn&apos;t melting the way you expect.
        </p>
      </section>
    </HowToShell>
  );
}
