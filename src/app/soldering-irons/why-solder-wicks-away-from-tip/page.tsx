import {
  Callout,
  DataTable,
  Figure,
  HowToShell,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";

const description =
  "Why solder wicks away from a soldering iron tip faster than you'd like — the same capillary action that makes good joints work, pulling too hard in one spot.";

export const metadata = buildMetadata({
  title: "Why Does Solder Wick Away From the Tip?",
  description,
  path: "/soldering-irons/why-solder-wicks-away-from-tip",
});

export default function WhySolderWicksAwayFromTipPage() {
  return (
    <HowToShell
      title="Why Does Solder Wick Away From the Tip?"
      description={description}
      path="/soldering-irons/why-solder-wicks-away-from-tip"
      category="soldering-irons"
      published="2026-10-22"
      intro={
        <>
          This is a third, distinct phenomenon from solder sticking to the tip or beading up on a
          workpiece — here, solder leaves the tip readily and flows toward the joint, but keeps going
          further or faster than you actually wanted. It&apos;s the same capillary wetting action that
          makes a good joint work in the first place, just pulling harder than intended toward a
          particularly strong destination like stranded wire or a large copper pad.
        </>
      }
      toc={[
        { id: "three-different-problems", label: "Three different tip/solder problems, not one" },
        { id: "why-it-happens", label: "Why some destinations pull solder so strongly" },
        { id: "tip-running-dry", label: "Problem 1: The tip keeps running dry" },
        { id: "overwicking-wire", label: "Problem 2: Solder travels further up a wire than intended" },
        { id: "fixes", label: "Fixes for both situations" },
        { id: "quick-reference", label: "Quick reference" },
      ]}
      faq={[
        {
          q: "Is solder wicking up a wire actually a bad thing?",
          a: "Not inherently — wicking into twisted wire strands is exactly what makes a good wire splice, covered in our wire-soldering guide. It only becomes a problem when it travels further than intended, stiffening more of the wire than needed and reducing flexibility right where the wire should stay flexible.",
        },
        {
          q: "Why does my tip run dry so fast on ground-plane joints specifically?",
          a: "A ground plane is both a strong capillary destination (clean, well-fluxed copper) and a high thermal-mass joint that needs more total solder and more dwell time anyway, covered in our temperature-by-metal guide. Both effects compound: the joint wants more solder, and it pulls what's on the tip away quickly, so you end up re-feeding more often than on a small isolated pad.",
        },
        {
          q: "Can I stop solder from wicking too far up a wire on purpose?",
          a: "A small heatsink clip placed at the point you want wicking to stop (the same tool used to protect insulation from heat) can help contain both heat and solder flow to the intended section, since capillary wicking needs both flux/clean metal and enough heat to keep pulling solder along.",
        },
        {
          q: "Does flux make wicking stronger or weaker?",
          a: "Stronger, generally — flux is exactly what lets solder wet and flow onto clean metal in the first place, so more flux on a longer stretch of wire or a larger pad tends to pull solder further, not less. Limiting flux to just the section you want wetted helps keep wicking contained to that area.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/why-solder-sticks-to-tip",
          title: "Why Does Solder Stick to the Tip?",
          desc: "The opposite-sounding but mechanically different problem — solder clinging to the tip instead of releasing.",
        },
        {
          href: "/soldering-irons/how-to-solder-wires-together",
          title: "How to Solder Wires Together",
          desc: "Where controlled wicking into twisted strands is exactly the goal.",
        },
      ]}
    >
      <section>
        <h2 id="three-different-problems" className="text-xl font-semibold mb-3">Three different tip/solder problems, not one</h2>
        <p className="text-muted leading-7 mb-4">
          It&apos;s worth being precise about which direction solder is actually moving, since the fix
          is different for each:
        </p>
        <DataTable
          head={["Symptom", "What's actually happening", "See instead"]}
          rows={[
            ["Solder clings to the tip, won't release onto the joint", "Dross or excess solder on the tip itself", "Why Does Solder Stick to the Tip?"],
            ["Solder balls up on the workpiece instead of spreading", "The workpiece surface isn't wetting (oxidised, no flux, too cold)", "Why Does Solder Bead Up Instead of Flowing?"],
            ["Solder leaves the tip and travels further/faster than wanted", "Strong capillary action at the destination — this page", "Keep reading below"],
          ]}
        />
      </section>

      <section>
        <h2 id="why-it-happens" className="text-xl font-semibold mb-3">Why some destinations pull solder so strongly</h2>
        <p className="text-muted leading-7">
          Capillary action draws molten solder toward whichever clean, fluxed, sufficiently hot metal
          surface offers it the most surface area to wet. Stranded wire is an especially strong
          destination because of the many small gaps between individual strands; a large, clean copper
          pad is strong because of its sheer surface area. The tip, by comparison, is a small reservoir
          — once a stronger pull exists nearby, solder naturally favors leaving it.
        </p>
        <Figure
          caption={
            <>
              Solder on the tip flows toward whichever nearby surface offers the strongest capillary
              pull — stranded wire&apos;s many small gaps, or a large clean pad&apos;s surface area, both
              pull harder than the tip holds on to it.
            </>
          }
        >
          <svg viewBox="0 0 300 110" className="w-full h-auto" role="img" aria-label="Diagram showing solder wicking away from a tip toward stranded wire and a large copper pad">
            <circle cx="40" cy="55" r="14" className="fill-accent/60 stroke-accent" strokeWidth="1.5" />
            <text x="40" y="90" fontSize="9" textAnchor="middle" className="fill-foreground">Tip (small reservoir)</text>
            <path d="M54 50 Q100 30 140 45" className="stroke-accent" strokeWidth="1.5" fill="none" markerEnd="url(#arrwick1)" />
            {[150, 165, 180].map((x) => (
              <line key={x} x1={x} y1="30" x2={x} y2="70" className="stroke-muted" strokeWidth="2" />
            ))}
            <text x="165" y="90" fontSize="9" textAnchor="middle" className="fill-foreground">Stranded wire</text>
            <path d="M54 60 Q100 85 230 60" className="stroke-accent" strokeWidth="1.5" fill="none" markerEnd="url(#arrwick2)" />
            <rect x="230" y="40" width="50" height="30" className="fill-none stroke-muted" strokeWidth="2" />
            <text x="255" y="90" fontSize="9" textAnchor="middle" className="fill-foreground">Large copper pad</text>
            <defs>
              <marker id="arrwick1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10z" className="fill-accent" /></marker>
              <marker id="arrwick2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10z" className="fill-accent" /></marker>
            </defs>
          </svg>
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="tip-running-dry">The tip keeps running dry mid-joint</StepHeading>
        <p className="text-muted leading-7">
          On strongly-wicking destinations, the small amount of solder carried on a freshly tinned tip
          can disappear into the joint almost immediately, leaving the tip looking bare and requiring
          another touch of the solder wire to finish. This is normal on large or multi-strand joints —
          it simply means that joint needs more total solder than a small isolated pad does.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="overwicking-wire">Solder travels further up a wire than intended</StepHeading>
        <p className="text-muted leading-7">
          On stranded wire specifically, solder can wick up past the point you meant to tin, stiffening
          a longer section of the wire than intended. Since flexibility matters most right at the
          boundary between the stiff, soldered section and the still-flexible wire, excess wicking here
          shifts that stress point further up the wire than planned — reducing the strain relief you
          were counting on.
        </p>
      </section>

      <section id="fixes">
        <Callout title="Fixes for both situations">
          <ul className="space-y-1 list-disc pl-5">
            <li>Feed solder more generously and expect to re-touch large or multi-strand joints — running dry mid-joint on these is normal, not a fault.</li>
            <li>Limit flux to just the section you want wetted, since flux is what lets wicking continue along the wire.</li>
            <li>Use a small heatsink clip at the point you want wicking to stop, containing both heat and capillary pull.</li>
            <li>Pre-tin the destination separately first (covered in our wire-splicing guide) so the final joining step needs less wicking overall.</li>
          </ul>
        </Callout>
      </section>

      <section>
        <h2 id="quick-reference" className="text-xl font-semibold mb-3">Quick reference</h2>
        <DataTable
          head={["Situation", "What to do"]}
          rows={[
            ["Tip runs dry on a large pad or ground plane", "Feed more solder; this is expected on high-thermal-mass joints"],
            ["Tip runs dry on stranded wire", "Normal — multi-strand joints pull solder quickly by design"],
            ["Solder wicks further up a wire than wanted", "Limit flux to the intended section; use a heatsink clip to contain it"],
            ["Want wicking to stop at an exact point", "Pre-tin only up to that point, keeping flux away from the rest"],
          ]}
        />
      </section>
    </HowToShell>
  );
}
