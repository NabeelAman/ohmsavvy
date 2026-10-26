import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  InfoCards,
  KeyIdea,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-soldering-irons/page";

const description =
  "How to fix a cold solder joint on a circuit board: spot the dull, cracked or balled signs, find the cause, reflow with flux and test the repaired joint.";

export const metadata = buildMetadata({
  title: "How to Fix a Cold Solder Joint on a Circuit Board",
  description,
  path: "/soldering-irons/how-to-fix-a-cold-solder-joint-on-a-circuit-board",
});

const hakko = picks.find((p) => p.name === "Hakko FX-888DX")!;
const pinecil = picks.find((p) => p.name === "Pinecil V2")!;

const link = "text-accent hover:underline";

/** Side-by-side cross-sections: a wetted through-hole joint and a cold one. */
function ColdJointCrossSection() {
  const grain = [
    [218, 92], [228, 86], [238, 90], [250, 84], [262, 90], [272, 86], [224, 100], [244, 98], [266, 100], [232, 108], [256, 108],
  ];
  return (
    <svg
      viewBox="0 0 320 190"
      className="w-full h-auto"
      role="img"
      aria-label="Cross-section comparison: on the left a good solder joint with a smooth concave fillet wetting both the pad and the component lead; on the right a cold joint with a dull, grainy, balled lump, a crack ring around the lead and a gap where the solder never wetted the pad"
    >
      <text x="80" y="18" fontSize="11" textAnchor="middle" className="fill-foreground">Good joint</text>
      <text x="240" y="18" fontSize="11" textAnchor="middle" className="fill-foreground">Cold joint</text>
      {/* boards */}
      <rect x="10" y="120" width="140" height="22" className="fill-muted/30 stroke-border" strokeWidth="1" />
      <rect x="170" y="120" width="140" height="22" className="fill-muted/30 stroke-border" strokeWidth="1" />
      {/* pads */}
      <rect x="40" y="116" width="80" height="4" className="fill-accent" />
      <rect x="200" y="116" width="80" height="4" className="fill-accent" />
      {/* good fillet: concave sides meeting pad at a shallow angle */}
      <path d="M42 116 Q72 112 74 60 L86 60 Q88 112 118 116 Z" className="fill-accent/50 stroke-accent" strokeWidth="1.5" />
      {/* leads */}
      <rect x="75" y="30" width="10" height="122" className="fill-muted stroke-foreground" strokeWidth="1" />
      <rect x="235" y="30" width="10" height="122" className="fill-muted stroke-foreground" strokeWidth="1" />
      {/* cold blob: convex, sitting on lead, not reaching pad edges */}
      <path d="M214 112 Q206 80 240 74 Q274 80 266 112 Q240 120 214 112 Z" className="fill-muted stroke-foreground" strokeWidth="1.5" />
      {grain.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.4" className="fill-foreground/50" />
      ))}
      {/* crack ring around lead */}
      <path d="M233 78 L231 88 L234 96" className="stroke-foreground" strokeWidth="1.2" fill="none" />
      <path d="M247 78 L249 88 L246 96" className="stroke-foreground" strokeWidth="1.2" fill="none" />
      {/* labels */}
      <text x="12" y="166" fontSize="9" className="fill-muted">shiny, concave,</text>
      <text x="12" y="178" fontSize="9" className="fill-muted">wets pad and lead</text>
      <text x="172" y="166" fontSize="9" className="fill-muted">dull, grainy ball;</text>
      <text x="172" y="178" fontSize="9" className="fill-muted">crack ring, bare pad edge</text>
      <line x1="284" y1="60" x2="250" y2="86" className="stroke-border" strokeWidth="1" />
      <text x="262" y="54" fontSize="9" className="fill-foreground">crack</text>
      <line x1="290" y1="104" x2="276" y2="116" className="stroke-border" strokeWidth="1" />
      <text x="272" y="100" fontSize="9" className="fill-foreground">gap</text>
    </svg>
  );
}

export default function HowToFixAColdSolderJointOnACircuitBoardPage() {
  return (
    <HowToShell
      title="How to Fix a Cold Solder Joint on a Circuit Board"
      description={description}
      published="2026-10-22"
      path="/soldering-irons/how-to-fix-a-cold-solder-joint-on-a-circuit-board"
      category="soldering-irons"
      intro={
        <>
          To fix a cold solder joint on a circuit board, clean the area, add fresh flux, and reheat the pad and
          the lead together with a clean, tinned tip until the old solder melts completely and flows into a
          smooth, concave fillet. Add a touch of fresh solder if the joint looks starved, then hold everything
          still while it cools. If the joint is contaminated, cracked right through or badly oversized, remove
          the old solder first and remake it from scratch.
        </>
      }
      aside={{
        image: hakko.image,
        alt: "Hakko FX-888DX soldering station, a 100W temperature-controlled iron",
        caption: (
          <>
            Reflowing goes better with a tip that stays at its setpoint. The Hakko FX-888DX is a 100W digital
            station rated for ±1°C idle stability. See our{" "}
            <Link href="/soldering-irons/weller-we1010-vs-hakko-fx-888dx" className={link}>
              Weller WE1010 vs Hakko FX-888DX comparison
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-is-a-cold-joint", label: "What a cold solder joint is" },
        { id: "how-to-spot-one", label: "How to spot one" },
        { id: "causes", label: "What causes cold joints" },
        { id: "reflow-with-flux", label: "Reflow the joint with flux" },
        { id: "remove-old-solder-first", label: "When to remove the old solder" },
        { id: "lead-free-vs-leaded", label: "Lead-free vs leaded joints" },
        { id: "inspect-with-magnification", label: "Inspect with magnification" },
        { id: "test-the-repair", label: "Test the repaired joint" },
        { id: "irons", label: "Irons for rework" },
      ]}
      faq={[
        {
          q: "Can a cold solder joint work and then fail later?",
          a: "Yes, and that is what makes them troublesome. A poorly wetted joint may conduct while the board is cool and still, then open up as it warms, vibrates or flexes. That produces intermittent faults: sound cutting out, a display flickering, or a device that only works when pressed. Reflowing the joint usually ends the problem.",
        },
        {
          q: "Can I fix a cold solder joint without adding more solder?",
          a: "Often, yes. If the joint already has enough solder and is only dull or slightly cracked, fresh flux and a few seconds of heat are frequently all it needs: the old solder melts, wets the pad and lead, and sets as a proper fillet. Add solder only if the fillet is starved or bare copper shows.",
        },
        {
          q: "Is a dull solder joint always a cold joint?",
          a: "No. Lead-free alloys normally set with a matte, slightly frosted finish even when the joint is sound. Judge the shape instead: a good joint, leaded or lead-free, has smooth concave sides that blend into the pad and lead. A cold joint looks lumpy or balled, often with a visible ring or gap where it failed to wet.",
        },
        {
          q: "What temperature should I use to reflow a cold joint?",
          a: "Typically the same as making a new joint: about 320 °C to 350 °C for leaded solder and 340 °C to 370 °C for lead-free, adjusted for the size of the pad. If solder is slow to melt, use a larger tip before raising the setting. The aim is a fully liquid joint within two to four seconds.",
        },
        {
          q: "Why do cold joints keep appearing on the same connector?",
          a: "Parts that are pushed, pulled or heated in use, such as power jacks, USB sockets and large capacitors, stress their joints every cycle, and fatigue cracks the solder ring around the pin. Reflow with fresh flux and enough solder for a full fillet, and make sure mounting tabs or screws carry the mechanical load.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/solder-beading-up-not-flowing",
          title: "Why Does Solder Bead Up Instead of Flowing?",
          desc: "The wetting problems behind many cold joints, and how flux fixes them.",
        },
        {
          href: "/soldering-irons/how-to-use-a-soldering-iron",
          title: "How to Use a Soldering Iron: Step-by-Step Guide",
          desc: "The basic joint technique that stops cold joints forming in the first place.",
        },
      ]}
    >
      <Callout title="Unpowered board, hot tip, ventilated bench">
        <ul className="space-y-2 list-disc pl-5">
          <li>Unplug the device and remove the battery. Discharge large capacitors on power boards before touching them.</li>
          <li>Return the iron to its stand between joints and keep flux smoke away from your face.</li>
          <li>Wash your hands after handling leaded solder, and keep food and drink off the bench.</li>
        </ul>
      </Callout>

      <section>
        <h2 id="what-is-a-cold-joint" className="text-xl font-semibold mb-3">What a cold solder joint is</h2>
        <p className="text-muted leading-7 mb-4">
          A sound joint forms when molten solder wets both surfaces and bonds to them. In a cold joint that
          never fully happened: one surface was not hot or clean enough, or the parts moved as the solder set.
          It may still hold the part, yet electrically it is a weak or intermittent contact.
        </p>
        <Figure
          caption={
            <>
              Left, a wetted joint: the fillet curves smoothly onto the pad and up the lead. Right, a cold joint:
              a dull, grainy lump that sits on the lead, with a crack ring and an unwetted gap at the pad.
            </>
          }
        >
          <ColdJointCrossSection />
        </Figure>
      </section>

      <section>
        <h2 id="how-to-spot-one" className="text-xl font-semibold mb-3">How to spot a cold solder joint</h2>
        <InfoCards
          items={[
            { label: "Dull and grainy", desc: "A rough, frosted surface on leaded solder, a sign it was disturbed or underheated while freezing." },
            { label: "Balled or convex", desc: "A rounded blob with steep sides that meets the pad at a sharp angle instead of blending into it." },
            { label: "Cracked ring", desc: "A fine dark circle around the lead, typical of fatigue on jacks and heavy parts." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Other clues: bare copper at the pad edge, a lead that wiggles in its solder, and faults that come and
          go when you press the board.
        </p>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">What causes cold solder joints</h2>
        <DataTable
          head={["Cause", "What happened", "Prevention"]}
          rows={[
            ["Not enough heat", "Tip too small or cool for the pad or a ground plane", "Larger tip, heat the pad and lead together"],
            ["Movement while cooling", "The lead or wire shifted as the solder froze", "Clamp the board, hold still for a few seconds"],
            ["Oxide or dirt", "Old parts, tarnished pads, fingerprints", "Clean, then add fresh flux"],
            ["Flux burnt off", "Solder melted on the tip and carried to the joint", "Feed solder onto the joint, not the tip"],
            ["Dirty or dry tip", "Oxidised tip transfers heat poorly", "Clean and re-tin the tip"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If solder rolls into a bead and refuses to spread, the root cause is wetting, covered in{" "}
          <Link href="/soldering-irons/solder-beading-up-not-flowing" className={link}>
            why solder beads up instead of flowing
          </Link>
          . A blackened tip is its own problem; see{" "}
          <Link href="/soldering-irons/soldering-iron-tip-care" className={link}>
            soldering iron tip care
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={1} id="reflow-with-flux">Reflow the cold joint with flux</StepHeading>
        <ol className="space-y-2 list-decimal pl-5 text-muted leading-7 mb-4">
          <li>Clean the joint with isopropyl alcohol and a stiff brush to remove old flux and grime.</li>
          <li>Apply a small amount of liquid or paste flux directly to the joint.</li>
          <li>Wipe the tip, add a tiny bead of fresh solder, and place it so it touches pad and lead at once.</li>
          <li>Wait until the whole joint goes liquid and visibly slumps into the pad, usually two to four seconds.</li>
          <li>If the fillet looks thin, feed a little fresh solder into the joint, away from the tip.</li>
          <li>Lift the iron straight off and keep the board and lead still until the solder sets.</li>
        </ol>
        <Figure caption={<>The reflow in order. Flux is the step that turns a reheated cold joint into a properly wetted one.</>}>
          <FlowDiagram
            steps={[
              { label: "Clean", sub: "Alcohol and brush" },
              { label: "Flux", sub: "Fresh, on the joint" },
              { label: "Heat", sub: "Pad and lead together" },
              { label: "Top up", sub: "Only if starved" },
              { label: "Hold still", sub: "Until it freezes" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={2} id="remove-old-solder-first">When to remove the old solder first</StepHeading>
        <p className="text-muted leading-7">
          Reflowing alone is not always enough. Remove the old solder with wick or a pump, then remake the joint,
          when the joint is a large blob bridging toward a neighbor, when the solder is dark and contaminated after
          many reworks, when a fatigue crack has opened right round the lead, or when you are switching between
          leaded and lead-free alloys. A clean pad and fresh solder give a predictable result where a repeatedly
          reheated joint may not. The{" "}
          <Link href="/soldering-irons/how-to-remove-solder-from-circuit-board" className={link}>
            desoldering guide
          </Link>{" "}
          covers the methods.
        </p>
      </section>

      <section>
        <h2 id="lead-free-vs-leaded" className="text-xl font-semibold mb-3">Lead-free vs leaded cold joints</h2>
        <p className="text-muted leading-7 mb-4">
          Most factory boards made in recent years use lead-free solder, which melts at about 217 °C to 220 °C
          for common tin-silver-copper alloys, versus 183 °C for eutectic 63/37 leaded solder. Lead-free needs a
          hotter setpoint and sets with a duller finish, so do not mistake a sound lead-free joint for a cold one.
          The{" "}
          <Link href="/soldering-irons/60-40-vs-63-37-solder" className={link}>
            60/40 vs 63/37 comparison
          </Link>{" "}
          explains why a eutectic alloy freezes more cleanly.
        </p>
        <KeyIdea title="Judge the shape, not the shine">
          A concave fillet that blends into the pad is a good joint whatever its finish. A convex ball with a dark
          line around the lead is not.
        </KeyIdea>
      </section>

      <section>
        <h2 id="inspect-with-magnification" className="text-xl font-semibold mb-3">Inspect the joint with magnification</h2>
        <p className="text-muted leading-7">
          A 10x loupe or a low-power USB microscope shows what the eye misses. Light the board from a low angle
          and rotate it: cracks show as a thin dark line, and a non-wetted edge as a step where solder meets pad.
          Check neighboring joints too; cold joints rarely come alone on a heat-cycled board.
        </p>
      </section>

      <section>
        <h2 id="test-the-repair" className="text-xl font-semibold mb-3">Test the repaired joint</h2>
        <p className="text-muted leading-7">
          With the board unpowered, measure continuity from the lead to the trace it should reach, and confirm no
          short to neighboring pads. Press gently on the part while watching the reading. A good repair stays
          steady; a flickering beep points to another bad joint, which our page on{" "}
          <Link href="/multimeters/multimeter-continuity-beep-intermittent" className={link}>
            intermittent continuity beeps
          </Link>{" "}
          helps diagnose. Finally, power the device and repeat whatever used to trigger the fault.
        </p>
      </section>

      <section>
        <h2 id="irons" className="text-xl font-semibold mb-3">Soldering irons for rework</h2>
        <p className="text-muted leading-7 mb-6">
          Temperature control matters more than raw wattage for reflowing: a station that holds its setpoint on a
          cold pad avoids the very condition that makes cold joints.
        </p>
        <ProductStrip
          title="Irons from our soldering reviews"
          items={[
            {
              name: "Hakko FX-888DX",
              image: hakko.image,
              alt: "Hakko FX-888DX soldering station with FX-8801 handpiece",
              href: "/soldering-irons/weller-we1010-vs-hakko-fx-888dx",
              note: "100W station driving the FX-8801 handpiece, with digital 50–480°C control and five presets for repeatable reflow temperatures.",
            },
            {
              name: "Pinecil V2",
              image: pinecil.image,
              alt: "Pinecil V2 USB-C soldering iron",
              href: "/soldering-irons/pinecil-v2-review",
              note: "USB-C PD powered, about 12 s heat-up, OLED display. Portable for field repairs.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
