import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-soldering-irons/page";

const description =
  "Why solder beads up into a ball instead of flowing and wetting a wire: an oxidized or contaminated surface, too little flux, or the workpiece not hot enough.";

export const metadata = buildMetadata({
  title: "Why Does Solder Bead Up Instead of Flowing?",
  description,
  path: "/soldering-irons/solder-beading-up-not-flowing",
});

const link = "text-accent hover:underline";

const weller = picks.find((p) => p.name === "Weller WE1010NA")!;
const hakko = picks.find((p) => p.name === "Hakko FX-888DX")!;
const pinecil = picks.find((p) => p.name === "Pinecil V2")!;

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
          Solder beads up instead of flowing because the metal it lands on isn&apos;t clean enough or hot
          enough for it to wet: an oxide or grease film, too little flux, or a wire or pad that never
          reached the solder&apos;s melting point. Clean the surface, add fresh flux, and heat the joint
          itself rather than the solder, and it will spread. This is a different problem from solder
          sticking to the tip: here the solder leaves the tip fine but pulls itself into a round ball on
          the workpiece, and the sections below show how to tell which of the three causes you have.
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
        { id: "surface-contamination", label: "1. Oxidized or contaminated surface" },
        { id: "not-enough-flux", label: "2. Not enough flux" },
        { id: "how-flux-works", label: "How flux actually fixes this" },
        { id: "workpiece-not-hot-enough", label: "3. The workpiece itself isn't hot enough" },
        { id: "lead-free-factor", label: "Does lead-free solder bead more easily?" },
        { id: "fix-it", label: "Fixing a beaded joint, step by step" },
        { id: "melting-points", label: "Melting points and working temperatures" },
        { id: "quick-reference", label: "Causes at a glance" },
        { id: "which-iron", label: "Irons that hold temperature" },
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
          a: "Yes, somewhat — bare copper oxidizes faster than pre-tinned or silver-plated wire, so bare copper that's sat exposed to air for a while is more prone to beading than freshly stripped or pre-tinned wire. This is one reason pre-tinned wire is popular for repeated or delayed soldering work.",
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
      <Callout title="Hot tools and flux fumes">
        <ul className="space-y-2 list-disc pl-5">
          <li>A soldering tip typically runs at roughly 300–400°C. Keep it in its stand between joints and never test heat with a finger.</li>
          <li>Hold small wires in helping hands or a clamp: re-flowing a stubborn joint heats the whole wire.</li>
          <li>Flux smoke irritates the airways. Work with a fan or fume extractor pulling it away from your face.</li>
          <li>Wash your hands after handling leaded solder and keep food off the bench.</li>
        </ul>
      </Callout>

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
        <StepHeading n={1} id="surface-contamination">Oxidized or contaminated surface</StepHeading>
        <p className="text-muted leading-7">
          By far the most common cause. Solder needs clean, bare metal to bond to — an oxide layer,
          old flux residue, insulation residue, oil, or grease on the wire all block that bond the same
          way an oxidized iron tip blocks heat transfer. Strip back to bright, clean metal, or clean the
          existing surface thoroughly, before trying again.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="not-enough-flux">Not enough flux reaching the surface</StepHeading>
        <p className="text-muted leading-7">
          Flux&apos;s job is removing the thin oxide layer that forms the instant bare metal is exposed
          to air, so solder can actually reach and bond to the metal underneath. Core flux built into
          solder wire is often enough for a quick, clean joint, but a surface that&apos;s already a bit
          oxidized, larger, or has been reheated a few times benefits from a touch of additional liquid
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
        <StepHeading n={4} id="fix-it">Remove the bead and start clean</StepHeading>
        <p className="text-muted leading-7">
          Don&apos;t try to persuade the existing ball to spread. Melt it and flick it off with the tip, or
          lift it with a strand of desoldering braid. The bead is now full of spent flux and oxide, and
          it will only make the next attempt harder.
        </p>
      </section>

      <section>
        <StepHeading n={5}>Clean the metal until it&apos;s bright</StepHeading>
        <p className="text-muted leading-7">
          Strip a few millimeters of fresh wire, or scrape a dull pad lightly with a fiberglass pen or a
          blade, then wipe off any finger grease with isopropyl alcohol. Bright copper or a shiny tinned
          surface is the target; a brown or rainbow-tinted film means oxide is still there.
        </p>
      </section>

      <section>
        <StepHeading n={6}>Flux, heat the joint, then feed solder</StepHeading>
        <p className="text-muted leading-7">
          Brush on a thin coat of rosin or no-clean flux. Wipe and re-tin the iron tip so it&apos;s shiny,
          press it against the wire or pad for two or three seconds, then feed solder into the joint on the
          side opposite the tip. If the workpiece is hot enough, the solder melts on contact with the
          metal and runs toward the heat in a thin film. If it still balls up, raise the temperature in
          small steps or move to a broader tip that transfers more heat.
        </p>
      </section>

      <section>
        <h2 id="melting-points" className="text-xl font-semibold mb-3">Melting points and working temperatures</h2>
        <p className="text-muted leading-7 mb-4">
          Wetting only starts once the workpiece is above the alloy&apos;s melting point, so it helps to know
          the numbers. These are the standard published values for the three alloys people use most;
          check the label on your own spool for its exact figure.
        </p>
        <BarChart
          items={[
            { label: "Sn63/Pb37 (eutectic)", value: 183, display: "183°C" },
            { label: "Sn60/Pb40", value: 190, display: "183–190°C" },
            { label: "SAC305 lead-free", value: 220, display: "~217–220°C", highlight: true },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          A tip set well above these figures is normal, because a small tip loses heat quickly into the
          joint. A common starting point is roughly 330–350°C for leaded solder and about 350–370°C for
          lead-free, adjusted up for heavy wires and ground planes. Lead-free has the narrower margin:
          its melting point is roughly 35°C higher, so an iron that sags under load drops out of the
          wetting window sooner. Our{" "}
          <Link href="/soldering-irons/60-40-vs-63-37-solder" className={link}>
            60/40 vs. 63/37 comparison
          </Link>{" "}
          explains why the eutectic alloy is the more forgiving of the two leaded options.
        </p>
      </section>

      <section>
        <h2 id="quick-reference" className="text-xl font-semibold mb-3">Causes at a glance</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["Ball forms the moment solder touches the wire", "Oxidized, dirty or greasy surface", "Wire or pad looks dull, brown or rainbow-tinted", "Strip or clean back to bright, bare metal"],
            ["Solder spreads briefly, then pulls back into a ball", "Flux used up before the joint finished", "Little or no flux smoke after the first second", "Add fresh liquid or paste flux before reheating"],
            ["Solder melts on the tip but not on the wire", "Workpiece not up to temperature", "Wire touched with solder alone doesn't melt it", "Hold the iron on the workpiece itself, not just the solder"],
            ["Started after switching to lead-free", "Lead-free alloy with marginal heat or flux", "Same joint flows with leaded solder", "Raise temperature to suit the alloy; add flux generously"],
            ["Beads on one big pad, fine on small ones", "Iron can't keep up with the heat sink", "Tip temperature drops on contact", "Use a broader tip or a higher-power iron"],
          ]}
        />
        <div className="mt-6">
          <KeyIdea title="Solder flows toward clean heat">
            Solder doesn&apos;t spread because you push it. It spreads because a clean, fluxed surface above
            its melting point pulls it in. Fix the surface and the temperature, and beading stops on its
            own.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 id="which-iron" className="text-xl font-semibold mb-3">Irons that hold temperature</h2>
        <p className="text-muted leading-7 mb-6">
          A temperature-controlled iron with a usable range of tips solves the &quot;not hot enough&quot;
          cause for good, because it feeds heat back as the joint draws it away. These are picks from our{" "}
          <Link href="/soldering-irons/best-soldering-irons" className={link}>
            best soldering irons
          </Link>{" "}
          roundup.
        </p>
        <ProductStrip
          title="Picks from our soldering iron reviews"
          items={[
            {
              name: "Hakko FX-888DX",
              image: hakko.image,
              alt: "Hakko FX-888DX soldering station with FX-8801 handpiece",
              href: "/soldering-irons/weller-we1010-vs-hakko-fx-888dx",
              note: "100W station, digital 50–480°C control and ±1°C idle stability, T18 tips.",
            },
            {
              name: "Weller WE1010NA",
              image: weller.image,
              alt: "Weller WE1010NA digital soldering station",
              href: "/soldering-irons/weller-we1010na-review",
              note: "85W ESD-safe digital station (70W iron), about 28 seconds from 50 to 350°C.",
            },
            {
              name: "Pinecil V2",
              image: pinecil.image,
              alt: "Pinecil V2 USB-C portable soldering iron",
              href: "/soldering-irons/pinecil-v2-review",
              note: "Portable USB-C iron, up to 88W at 24V, for fixes away from the bench.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
