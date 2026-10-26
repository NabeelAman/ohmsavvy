import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  HowToShell,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-soldering-irons/page";

const description =
  "Why solder beads up into a ball instead of flowing and wetting a wire: an oxidised or contaminated surface, too little flux, or the workpiece not hot enough.";

export const metadata = buildMetadata({
  title: "Why Does Solder Bead Up Instead of Flowing?",
  description,
  path: "/soldering-irons/solder-beading-up-not-flowing",
});

const link = "text-accent hover:underline";

const weller = picks.find((p) => p.name === "Weller WE1010NA")!;

export default function SolderBeadingUpNotFlowingPage() {
  return (
    <HowToShell
      title="Why Does Solder Bead Up Instead of Flowing?"
      description={description}
      path="/soldering-irons/solder-beading-up-not-flowing"
      category="soldering-irons"
      published="2026-10-21"
      intro={
        <>
          This is a different problem from solder sticking to the tip — here the solder melts and
          leaves the tip just fine, but instead of spreading into a thin, bonded layer on the wire or
          pad, it draws itself into a round ball that just sits on the surface. That beading behavior
          is the visible sign of a surface that solder isn&apos;t wetting, and it has a short, specific
          list of causes.
        </>
      }
      aside={{
        image: weller.image,
        alt: "Weller WE1010NA ESD-safe soldering station",
        caption: (
          <>
            Stable, correctly-set temperature matters more for wetting than raw wattage. See our{" "}
            <Link href="/soldering-irons/weller-we1010na-review" className={link}>
              full review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "wetting-vs-beading", label: "Wetting vs. beading" },
        { id: "surface-contamination", label: "1. Oxidised or contaminated surface" },
        { id: "not-enough-flux", label: "2. Not enough flux" },
        { id: "how-flux-works", label: "How flux actually fixes this" },
        { id: "workpiece-not-hot-enough", label: "3. The workpiece itself isn't hot enough" },
        { id: "lead-free-factor", label: "Does lead-free solder bead more easily?" },
        { id: "quick-reference", label: "Quick reference" },
      ]}
      faq={[
        {
          q: "Is beading the same thing as a cold solder joint?",
          a: "They're related but not identical. Beading describes solder failing to wet the surface in the first place, usually visible as it's being applied. A cold joint can look different — dull and cracked rather than ball-shaped — and happens when a joint that did wet initially is disturbed or wasn't fully heated before cooling. Beading often leads to a weak or cold joint if forced to \"stick\" anyway, but the root cause is different.",
        },
        {
          q: "Can I just push the beaded solder onto the wire with the iron tip?",
          a: "You can mechanically force contact, but it won't create a proper bonded, wetted joint — pressing an unwetted ball of solder against the wire leaves a weak mechanical contact rather than the metallurgical bond proper wetting creates. It's better to clean the surface and add flux, then reflow, than to force a beaded joint into place.",
        },
        {
          q: "Why does solder bead up on old or previously soldered wire specifically?",
          a: "Previously soldered or stored wire often has a thin oxide layer or old, spent flux residue on its surface, both of which block proper wetting the same way a dirty soldering iron tip does. Stripping back to fresh wire, or cleaning and re-fluxing the existing surface, usually resolves it.",
        },
        {
          q: "Does wire material (copper vs. tinned vs. silver-plated) affect beading?",
          a: "Yes, somewhat — bare copper oxidises faster than pre-tinned or silver-plated wire, so bare copper that's sat exposed to air for a while is more prone to beading than freshly stripped or pre-tinned wire. This is one reason pre-tinned wire is popular for repeated or delayed soldering work.",
        },
        {
          q: "Can too much flux cause its own problems?",
          a: "Excess flux residue left around a joint isn't usually a wetting problem by itself, but it can look messy and, left uncleaned for a long time on some board types, slowly become mildly corrosive or attract dust. It's rarely the cause of beading — too little flux is far more often the actual issue — so clean up visible excess afterward rather than treating it as a wetting fix.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/why-solder-sticks-to-tip",
          title: "Why Does Solder Stick to the Tip?",
          desc: "A different symptom — solder clinging to the tip instead of releasing onto the joint.",
        },
        {
          href: "/soldering-irons/how-to-solder-wires-together",
          title: "How to Solder Wires Together",
          desc: "The full wire-splicing technique this page's wetting problem fits into.",
        },
      ]}
    >
      <section>
        <h2 id="wetting-vs-beading" className="text-xl font-semibold mb-3">Wetting vs. beading</h2>
        <p className="text-muted leading-7">
          Properly wetted solder spreads into a thin, continuous layer that clings to the metal
          underneath — the same wetting action that lets solder wick into a twisted wire splice or
          flow smoothly across a clean pad. Beading is the opposite: surface tension wins, and the
          molten solder pulls itself into a ball that sits on top of the surface rather than bonding to
          it, usually rolling off entirely if the surface is tilted.
        </p>
        <Figure
          caption={
            <>
              Wetted solder (left) spreads thin and bonds to the metal. Beaded solder (right) draws up
              into a ball that sits on top, unbonded, because the surface doesn&apos;t accept it.
            </>
          }
        >
          <svg viewBox="0 0 300 110" className="w-full h-auto" role="img" aria-label="Comparison of properly wetted solder versus beaded, unwetted solder on a wire">
            <line x1="20" y1="80" x2="130" y2="80" className="stroke-muted" strokeWidth="4" />
            <path d="M50 80 Q75 65 100 80" className="fill-accent/60 stroke-accent" strokeWidth="1.5" />
            <text x="75" y="100" fontSize="10" textAnchor="middle" className="fill-foreground">Wetted: thin, bonded layer</text>
            <line x1="170" y1="80" x2="280" y2="80" className="stroke-muted" strokeWidth="4" />
            <circle cx="225" cy="62" r="16" className="fill-accent/60 stroke-accent" strokeWidth="1.5" />
            <text x="225" y="100" fontSize="10" textAnchor="middle" className="fill-foreground">Beaded: unbonded ball</text>
          </svg>
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="surface-contamination">Oxidised or contaminated surface</StepHeading>
        <p className="text-muted leading-7">
          By far the most common cause. Solder needs clean, bare metal to bond to — an oxide layer,
          old flux residue, insulation residue, oil, or grease on the wire all block that bond the same
          way an oxidised iron tip blocks heat transfer. Strip back to bright, clean metal, or clean the
          existing surface thoroughly, before trying again.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="not-enough-flux">Not enough flux reaching the surface</StepHeading>
        <p className="text-muted leading-7">
          Flux&apos;s job is removing the thin oxide layer that forms the instant bare metal is exposed
          to air, so solder can actually reach and bond to the metal underneath. Core flux built into
          solder wire is often enough for a quick, clean joint, but a surface that&apos;s already a bit
          oxidised, larger, or has been reheated a few times benefits from a touch of additional liquid
          or paste flux applied directly before soldering.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="workpiece-not-hot-enough">The workpiece itself isn&apos;t hot enough</StepHeading>
        <p className="text-muted leading-7">
          Beading also happens when solder is melted mostly by contact with the hot solder wire or tip,
          without the wire or pad underneath actually reaching temperature — the classic mistake of
          heating the solder instead of heating the joint, covered in our{" "}
          <Link href="/soldering-irons/how-to-use-a-soldering-iron" className={link}>
            main how-to guide
          </Link>
          . Hold the iron against the workpiece itself first, then feed solder once the workpiece is
          genuinely up to temperature.
        </p>
      </section>

      <section id="how-flux-works">
        <h2 className="text-xl font-semibold mb-3">How flux actually fixes this</h2>
        <p className="text-muted leading-7 mb-4">
          Flux doesn&apos;t make solder stickier — it chemically strips the thin oxide layer off the
          metal surface right as heat is applied, exposing bare metal for solder to bond to underneath.
          Without that cleaning action, solder has nothing but oxide to try to wet, which is exactly
          when it draws up into a ball instead.
        </p>
        <Figure
          caption={
            <>
              Flux reacts with the oxide layer and lifts it away as heat is applied, exposing clean
              metal underneath right before solder reaches the surface — without this step, solder has
              only oxide to try (and fail) to bond to.
            </>
          }
        >
          <svg viewBox="0 0 300 120" className="w-full h-auto" role="img" aria-label="Diagram of flux removing an oxide layer from a metal surface before solder bonds to it">
            <rect x="20" y="70" width="260" height="14" className="fill-muted" />
            <text x="150" y="110" fontSize="9" textAnchor="middle" className="fill-muted">bare metal underneath</text>
            <rect x="20" y="58" width="110" height="10" className="fill-foreground" opacity="0.35" />
            <text x="75" y="52" fontSize="9" textAnchor="middle" className="fill-foreground">oxide layer (untouched)</text>
            <path d="M160 58 Q175 48 190 58 Q205 68 220 58 Q235 48 250 58 L270 58" className="fill-none stroke-accent" strokeWidth="2" strokeDasharray="4 3" />
            <text x="210" y="40" fontSize="9" textAnchor="middle" className="fill-accent">flux lifting oxide away</text>
            <rect x="160" y="68" width="110" height="2" className="fill-accent" opacity="0.6" />
            <text x="215" y="110" fontSize="9" textAnchor="middle" className="fill-accent">clean metal, ready for solder</text>
          </svg>
        </Figure>
      </section>

      <section id="lead-free-factor">
        <Callout title="Does lead-free solder bead more easily?">
          Common lead-free alloys have noticeably higher surface tension than traditional leaded
          solder, which makes them more prone to beading when temperature, flux, or surface
          cleanliness are even slightly marginal. If you&apos;ve recently switched from leaded to
          lead-free solder and started seeing more beading, check that your iron is running hot enough
          for the lead-free alloy&apos;s higher melting range — see our{" "}
          <Link href="/soldering-irons/soldering-iron-temperature-by-metal" className="underline">
            temperature guide
          </Link>
          .
        </Callout>
      </section>

      <section>
        <h2 id="quick-reference" className="text-xl font-semibold mb-3">Quick reference</h2>
        <DataTable
          head={["Cause", "Fix"]}
          rows={[
            ["Oxidised, dirty, or greasy surface", "Strip or clean back to bright, bare metal"],
            ["Insufficient flux", "Add fresh liquid or paste flux before soldering"],
            ["Workpiece not actually up to temperature", "Hold the iron on the workpiece itself, not just the solder"],
            ["Lead-free solder with marginal heat/flux", "Raise temperature to suit the alloy; add flux generously"],
          ]}
        />
      </section>
    </HowToShell>
  );
}
