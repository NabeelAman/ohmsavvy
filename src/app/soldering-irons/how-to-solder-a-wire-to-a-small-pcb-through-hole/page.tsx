import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  KeyIdea,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-soldering-irons/page";

const description =
  "How to solder a wire to a PCB through hole: match the gauge to the hole, strip about 3 mm, tin, heat pad and wire together, and fix solder that will not flow.";

// Metadata title carries the exact search phrase; the H1 below keeps "Small" to match the slug.
export const metadata = buildMetadata({
  title: "How to Solder a Wire to a PCB Through Hole",
  description,
  path: "/soldering-irons/how-to-solder-a-wire-to-a-small-pcb-through-hole",
});

const pinecil = picks.find((p) => p.name === "Pinecil V2")!;
const hakko = picks.find((p) => p.name === "Hakko FX-888DX")!;

const link = "text-accent hover:underline";

/** Cross-section of a tinned wire passing through a plated hole, with the solder fillet on the far side. */
function WireThroughHoleDiagram() {
  return (
    <svg
      viewBox="0 0 320 200"
      className="w-full h-auto"
      role="img"
      aria-label="Cross-section of a stranded wire inserted through a plated PCB hole from the component side, with insulation stopping just above the board and a concave solder fillet on the solder side"
    >
      {/* board halves either side of the hole */}
      <rect x="30" y="92" width="110" height="24" className="fill-muted/30 stroke-border" strokeWidth="1" />
      <rect x="180" y="92" width="110" height="24" className="fill-muted/30 stroke-border" strokeWidth="1" />
      {/* plating: pads and barrel */}
      <rect x="112" y="88" width="28" height="4" className="fill-accent" />
      <rect x="180" y="88" width="28" height="4" className="fill-accent" />
      <rect x="112" y="116" width="28" height="4" className="fill-accent" />
      <rect x="180" y="116" width="28" height="4" className="fill-accent" />
      <rect x="137" y="92" width="3" height="24" className="fill-accent" />
      <rect x="180" y="92" width="3" height="24" className="fill-accent" />
      {/* insulation above board */}
      <rect x="146" y="14" width="28" height="64" rx="3" className="fill-surface stroke-foreground" strokeWidth="1.5" />
      {/* bare tinned conductor */}
      <rect x="153" y="78" width="14" height="62" className="fill-muted stroke-foreground" strokeWidth="1" />
      {/* fillet on solder side */}
      <path d="M118 120 Q150 124 153 140 L167 140 Q170 124 202 120 Z" className="fill-accent/50 stroke-accent" strokeWidth="1.5" />
      {/* solder in barrel */}
      <rect x="140" y="92" width="13" height="24" className="fill-accent/40" />
      <rect x="167" y="92" width="13" height="24" className="fill-accent/40" />
      {/* labels */}
      <text x="182" y="40" fontSize="10" className="fill-foreground">insulation</text>
      <text x="182" y="80" fontSize="9" className="fill-muted">0.5-1 mm gap</text>
      <text x="10" y="84" fontSize="9" className="fill-muted">component side</text>
      <text x="10" y="136" fontSize="9" className="fill-muted">solder side</text>
      <text x="215" y="134" fontSize="10" className="fill-foreground">concave fillet</text>
      <text x="215" y="105" fontSize="9" className="fill-muted">plated barrel</text>
      <text x="160" y="160" fontSize="9" textAnchor="middle" className="fill-muted">trim to about 1 mm</text>
      <line x1="140" y1="176" x2="180" y2="176" className="stroke-foreground" strokeWidth="1" />
      <text x="160" y="192" fontSize="9" textAnchor="middle" className="fill-muted">hole a little wider than the strands</text>
    </svg>
  );
}

/** Top view of three 2.54 mm pitch pads with wires, showing the 0.84 mm copper gap and a stray strand bridging two pads. */
function HeaderRowDiagram() {
  return (
    <svg
      viewBox="0 0 320 170"
      className="w-full h-auto"
      role="img"
      aria-label="Top view of three round PCB pads on 2.54 mm pitch, each 1.7 mm wide with a wire soldered in the center, leaving a 0.84 mm copper gap between pads; one stray strand from the middle wire reaches across the gap to the next pad"
    >
      {/* scale 40 px/mm: pad 1.7 mm = 68 px, pitch 2.54 mm = 102 px, 22 AWG bundle 0.76 mm = 30 px */}
      <circle cx="58" cy="80" r="34" className="fill-accent/40 stroke-accent" strokeWidth="1.5" />
      <circle cx="160" cy="80" r="34" className="fill-accent/40 stroke-accent" strokeWidth="1.5" />
      <circle cx="262" cy="80" r="34" className="fill-accent/40 stroke-accent" strokeWidth="1.5" />
      <circle cx="58" cy="80" r="15" className="fill-muted stroke-foreground" strokeWidth="1" />
      <circle cx="160" cy="80" r="15" className="fill-muted stroke-foreground" strokeWidth="1" />
      <circle cx="262" cy="80" r="15" className="fill-muted stroke-foreground" strokeWidth="1" />
      {/* stray strand from the middle wire onto the right pad */}
      <path d="M174 76 Q205 66 232 72" fill="none" className="stroke-foreground" strokeWidth="2" />
      <line x1="211" y1="126" x2="207" y2="74" className="stroke-foreground" strokeWidth="0.75" />
      <text x="211" y="138" fontSize="9" textAnchor="middle" className="fill-foreground">stray strand = short</text>
      {/* gap between left and middle pad */}
      <line x1="92" y1="128" x2="126" y2="128" className="stroke-foreground" strokeWidth="1" />
      <text x="109" y="142" fontSize="9" textAnchor="middle" className="fill-muted">0.84 mm gap</text>
      {/* pitch */}
      <line x1="58" y1="22" x2="160" y2="22" className="stroke-foreground" strokeWidth="1" />
      <text x="109" y="16" fontSize="9" textAnchor="middle" className="fill-muted">2.54 mm pitch</text>
      <text x="58" y="160" fontSize="9" textAnchor="middle" className="fill-muted">1.7 mm pad</text>
    </svg>
  );
}

export default function HowToSolderAWireToASmallPcbThroughHolePage() {
  return (
    <HowToShell
      title="How to Solder a Wire to a Small PCB Through Hole"
      description={description}
      published="2026-10-22"
      path="/soldering-irons/how-to-solder-a-wire-to-a-small-pcb-through-hole"
      category="soldering-irons"
      intro={
        <>
          To solder a wire to a PCB through hole, strip about 3 mm of insulation, twist and tin the strands,
          push the wire in from the component side, then hold the iron on the pad and wire together and feed
          solder into the far side of the joint. On a small pad that takes roughly two to four seconds at a
          typical 320-350 °C leaded setpoint, and you stop when a smooth, concave fillet wraps the whole pad.
          Then trim the tail to about 1 mm and anchor the wire so flexing never reaches the joint. If solder
          refuses to go into the hole, jump to the{" "}
          <a href="#troubleshooting" className={link}>causes and fixes table</a>.
        </>
      }
      aside={{
        image: pinecil.image,
        alt: "Pinecil V2 portable USB-C soldering iron",
        caption: (
          <>
            A compact iron such as the Pinecil V2 (USB-C PD powered, about 12 s heat-up) suits small
            board work. See our{" "}
            <Link href="/soldering-irons/pinecil-v2-review" className={link}>
              Pinecil V2 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "choose-the-wire-gauge", label: "Choose a wire gauge for the hole" },
        { id: "strip-length", label: "Strip the right length" },
        { id: "tin-the-wire", label: "Twist and tin the wire" },
        { id: "insert-from-component-side", label: "Insert from the component side" },
        { id: "heat-pad-and-lead", label: "Heat the pad and wire together" },
        { id: "how-much-solder", label: "How much solder to feed" },
        { id: "good-fillet", label: "What a good fillet looks like" },
        { id: "hole-fill", label: "Does solder need to come through?" },
        { id: "trim-the-tail", label: "Trim the tail" },
        { id: "strain-relief", label: "Add strain relief" },
        { id: "troubleshooting", label: "Solder won't flow: causes and fixes" },
        { id: "header-rows", label: "Wires in a row of header holes" },
        { id: "fine-wire", label: "Soldering fine wire into a hole" },
        { id: "unplated-holes", label: "Plated vs unplated holes" },
        { id: "which-iron", label: "Which iron and tip to use" },
      ]}
      faq={[
        {
          q: "Should a wire be soldered on the top or bottom of a PCB?",
          a: "Push the wire in from the component side, the face where parts sit, and make the fillet on the opposite solder side. The insulation and bend stay on one face and the joint on the other, so the board supports the wire. On a plated hole, solder drawn up the barrel shows as a small ring on the component side.",
        },
        {
          q: "My wire is too thick for the PCB hole. What can I do?",
          a: "Use the next thinner gauge if the current is low, as it is for most signal and sensor wiring. If you need the thicker wire, solder it to a header pin or a short tail of thinner wire first. Never drill out a plated hole: the drill removes the copper barrel linking the pads.",
        },
        {
          q: "Can I solder a wire to a PCB pad without putting it through the hole?",
          a: "You can tack a tinned wire onto a pad's surface, but it is much weaker. The thin copper pad and its adhesive take all the pull, and a sharp tug can lift it. Passing the wire through the hole lets the barrel and both pads share the load.",
        },
        {
          q: "How long should the iron stay on a through-hole joint?",
          a: "Typically two to four seconds for a small pad and thin wire with a suitable tip. If solder has not flowed by about five seconds, lift off, let it cool and fix the cause: a bigger tip, a slightly higher setpoint or fresh flux. Holding on longer mostly melts insulation.",
        },
        {
          q: "Do I need extra flux when soldering a wire to a PCB?",
          a: "Rosin-core solder carries enough flux for a clean new board and freshly tinned wire. Add a little liquid or paste flux when the pad is old, tarnished or reworked, or the tinned strands have dulled. Clean the residue off with isopropyl alcohol unless the flux is a no-clean type.",
        },
        {
          q: "Why won't solder go through the hole to the other side?",
          a: "Usually the barrel never reached melting temperature, so solder caps the top instead of being drawn down. Heat the pad and wire together, not the wire alone, and feed solder opposite the tip. Old oxidized plating needs extra flux, and a hole tied to a ground plane may need a bigger tip. If the hole is plugged with old solder, clear it first.",
        },
        {
          q: "Do you need solder on both sides of a through hole?",
          a: "No. On a plated hole you solder from one side, and the barrel carries solder through. A fillet on the solder side plus a thin ring around the wire on the component side shows good fill. Adding a second fillet from the top just reheats the joint and risks melting insulation. Unplated holes only ever get solder on the copper side.",
        },
        {
          q: "Can you put two wires in one PCB hole?",
          a: "You can if both fit with room for solder, but it is rarely the best option. Two 26 AWG bundles side by side span about 0.96 mm, too tight for a 1.0 mm hole. Twist and tin two thin wires together first, or join them off the board with heat-shrink and run a single wire into the hole. Each wire needs strain relief either way.",
        },
        {
          q: "How do I stop a thin wire falling out of the hole while soldering?",
          a: "Put a small bend in the tail after it pokes through, and tape the insulation to the board a few millimeters away. With very fine wire, fold the tinned end back on itself so it fills more of the hole. Clamp the board in a holder rather than holding it, so your free hand feeds solder and nothing moves while the joint cools.",
        },
        {
          q: "Is it okay to solder a wire to a PCB hole meant for a header pin?",
          a: "Yes. Header holes on development boards are normally plated and sized around 1.0 mm, which suits 22-26 AWG stranded wire. Pre-tin each wire, solder alternate holes so the row stays cool, and check neighbors for shorts. If the wire may need to come off later, fit a header pin and a jumper connector instead of soldering the wire directly.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/how-to-solder-wires-without-overheating-insulation",
          title: "Solder Wires Without Overheating Insulation",
          desc: "Keep short dwell times and use heat sinking so the jacket stays put.",
        },
        {
          href: "/soldering-irons/how-to-remove-solder-from-a-plated-through-hole",
          title: "How to Remove Solder from a Plated Through Hole",
          desc: "Clear a blocked hole before you put a new wire through it.",
        },
      ]}
    >
      <Callout title="Hot tips, fumes and flying wire ends">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Unplug the device and remove any battery before the iron goes near the board. If a lithium pack is
            swollen, hot or hissing, stop, move it outdoors onto a nonflammable surface and call 911 if it
            starts to smoke.
          </li>
          <li>Park the iron in its stand between joints; the tip runs well above 300 °C.</li>
          <li>Ventilate the bench: flux smoke irritates the airways. Wash your hands after handling leaded solder.</li>
          <li>Wear eye protection when trimming; clipped wire ends fly.</li>
        </ul>
      </Callout>

      <section>
        <h2 id="choose-the-wire-gauge" className="text-xl font-semibold mb-3">Choose a wire gauge that fits the PCB hole</h2>
        <p className="text-muted leading-7 mb-4">
          Work backwards from the hole. Small boards and breakout modules mostly use finished holes of about
          0.8 mm to 1.0 mm, sized for component leads and 2.54 mm headers. As a typical rule, aim for a hole
          roughly 0.2 mm to 0.4 mm wider than the conductor so solder can flow down the gap.
        </p>
        <DataTable
          head={["AWG", "Conductor diameter (nominal)", "Typical hole it fits", "Common use"]}
          rows={[
            ["30", "0.25 mm", "0.6 mm and up", "Wire-wrap, mods, bodge wires"],
            ["28", "0.32 mm", "0.6-0.8 mm", "Ribbon cable, fine signal wiring"],
            ["26", "0.40 mm", "0.8 mm", "Sensors, servo leads, I2C runs"],
            ["24", "0.51 mm", "0.8-1.0 mm", "Signal and low-current power"],
            ["22", "0.64 mm", "1.0 mm", "Hook-up wire, LED strips"],
            ["20", "0.81 mm", "1.2 mm and up", "Small power leads"],
          ]}
          mono={[1]}
        />
        <p className="text-muted leading-7 mt-4">
          These are solid-equivalent diameters; a stranded bundle measures slightly more, so test-fit a
          tinned end first. For wires carrying real current, size the wire for the load, not the hole.
        </p>
        {/* Hole-size rule: IPC-2222 PTH lead-to-hole allowance; KiCad Library Convention F7.6 uses
            max lead + 0.2 mm (https://klc.kicad.org/footprint/f7/f7.6.html). 7-strand bundle =
            3 x strand diameter (1+6 lay). Strand diameters are standard AWG values:
            38 AWG 0.101, 36 AWG 0.127, 34 AWG 0.160, 32 AWG 0.203, 30 AWG 0.255, 28 AWG 0.321 mm. */}
        <p className="text-muted leading-7 mt-4">
          You can check the fit with simple arithmetic. Board designers commonly size a plated hole at the
          largest lead diameter plus about 0.2 mm, a clearance derived from the IPC-2222 design standard. For
          stranded hook-up wire, the lead is the whole bundle: seven strands laid around a center strand
          measure about three strand diameters across. A 22 AWG 7/30 wire therefore spans 3 × 0.255 mm ≈
          0.76 mm, and 0.76 + 0.2 = 0.96 mm, so it slides into a 1.0 mm hole with room for solder. A 24 AWG
          7/32 wire spans 3 × 0.203 ≈ 0.61 mm and wants about 0.81 mm, which makes a 0.8 mm hole a tight,
          borderline fit unless the tinning is thin.
        </p>
        <Figure caption={<>Approximate smallest comfortable hole for common 7-strand wire, shown as bundle diameter (3 × strand) → hole (bundle plus a 0.2 mm solder gap). 24 AWG in a 0.8 mm hole is a tight fit. Typical values; measure your wire.</>}>
          <BarChart
            items={[
              { label: "30 AWG (7/38)", value: 0.5, display: "0.30 → 0.5 mm" },
              { label: "28 AWG (7/36)", value: 0.58, display: "0.38 → 0.6 mm" },
              { label: "26 AWG (7/34)", value: 0.68, display: "0.48 → 0.7 mm" },
              { label: "24 AWG (7/32)", value: 0.81, display: "0.61 → 0.8 mm" },
              { label: "22 AWG (7/30)", value: 0.96, display: "0.76 → 1.0 mm", highlight: true },
              { label: "20 AWG (7/28)", value: 1.16, display: "0.96 → 1.2 mm" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="strip-length">Strip the right length</StepHeading>
        <p className="text-muted leading-7">
          The bare length should equal the board thickness plus about 1 mm to 2 mm of protrusion. On a standard
          1.6 mm board that means stripping about 3 mm. Too much and bare copper above the board can touch a
          neighboring pad; too little and the strands never reach the solder side. Use the stripper notch for
          your gauge so no strands are cut, and leave roughly 0.5 mm to 1 mm between insulation and board.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="tin-the-wire">Twist and tin the wire</StepHeading>
        <p className="text-muted leading-7">
          Twist the strands tightly in the direction of their lay, then touch the iron under the wire and let a
          little solder run into the strands, binding them into one smooth rod rather than leaving a blob on the
          end. Tinning stops stray strands fanning over the pad. If the tinned end will not pass through the
          hole, it is carrying too much solder.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="insert-from-component-side">Insert the wire from the component side</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Push the tinned end through from the side where parts sit, so the joint forms on the opposite face.
          A slight bend in the tail stops it dropping out. Clamp the board in a holder so nothing moves while
          the solder sets.
        </p>
        <Figure
          caption={
            <>
              A tinned wire through a plated hole: insulation just above the board, a filled barrel, and a
              concave fillet on the solder side.
            </>
          }
        >
          <WireThroughHoleDiagram />
        </Figure>
      </section>

      <section>
        <StepHeading n={4} id="heat-pad-and-lead">Heat the pad and the wire together</StepHeading>
        <p className="text-muted leading-7">
          Lay the side of the tip against the copper pad and the wire at once; a small bead of solder on the
          tip acts as a heat bridge. After about a second, feed solder where wire meets pad, away from the
          tip, so it flows down into the hole. Typical setpoints are 320 °C to 350 °C leaded and 340 °C to
          370 °C lead-free; see our{" "}
          <Link href="/soldering-irons/soldering-iron-temperature-by-metal" className={link}>
            soldering temperature guide
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={5} id="how-much-solder">How much solder to feed</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Less than most beginners expect: on a 0.8 mm hole with a 1.5 mm pad, a few millimeters of 0.6 mm or
          0.8 mm solder is usually enough. Stop once the fillet covers the pad while the wire outline still
          shows. Withdraw the solder, then the iron, and hold the wire still while the joint freezes.
        </p>
        <Figure caption={<>One wire from prep to anchoring. Strain relief is the step most often skipped.</>}>
          <FlowDiagram
            steps={[
              { label: "Strip", sub: "Board thickness + 1-2 mm" },
              { label: "Tin", sub: "Twist, then bind strands" },
              { label: "Insert", sub: "From the component side" },
              { label: "Solder", sub: "Heat pad and wire together" },
              { label: "Trim + anchor", sub: "1 mm tail, relieve strain" },
            ]}
          />
        </Figure>
        {/* Worked example, geometry only: solder wire cross-section = pi/4 x d^2.
            The fillet volume is an illustrative estimate, not a measurement. */}
        <p className="text-muted leading-7 mt-4">
          A worked example shows why so little is needed. Take a 22 AWG wire (about 0.76 mm across) in a
          1.0 mm hole through a 1.6 mm board. The ring of space around the wire is π/4 × (1.0² − 0.76²) ≈
          0.33 mm², and over the 1.6 mm barrel that is roughly 0.53 mm³. Add an illustrative 0.3-0.4 mm³ for
          a concave fillet on a 1.8 mm pad and a small ring on the top side, and the joint holds about 1 mm³
          of metal. A 0.8 mm solder wire carries π/4 × 0.8² ≈ 0.50 mm³ per millimeter, so about 2 mm of
          feed fills it; with 0.6 mm solder (0.28 mm³ per millimeter) it is closer to 3.5 mm. Allow a little
          extra for the flux core and the film left on the tip, and you land on the 2-4 mm most joints take.
          Past that, you are building a ball, not a better joint. The{" "}
          <Link href="/soldering-irons/solder-wire-diameter-guide" className={link}>
            solder wire diameter guide
          </Link>{" "}
          covers which thickness to buy.
        </p>
      </section>

      <section>
        <h2 id="good-fillet" className="text-xl font-semibold mb-3">What a good through-hole wire joint looks like</h2>
        <DataTable
          head={["What you see", "What it means", "Fix"]}
          rows={[
            ["Smooth, shiny, concave cone around the wire", "Solder wetted both pad and wire", "None needed"],
            ["Round ball sitting on the pad", "Too much solder or the pad never got hot", "Wick off excess, reheat with flux"],
            ["Bare copper ring visible on the pad", "Not enough solder or poor wetting", "Add flux and a little more solder"],
            ["Dull, grainy surface", "Wire moved while cooling or too little heat", "Reflow and hold still"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          On a plated hole, a small solder ring on the component side shows the barrel filled. For more on
          judging fillet shape, see{" "}
          <Link href="/soldering-irons/how-to-use-a-soldering-iron" className={link}>
            how to use a soldering iron
          </Link>
          .
        </p>
      </section>

      {/* IPC-A-610 vertical fill: 75% for Class 2/3 in most holes, relief for some plane-connected holes.
          Secondary sources: https://www.ipc.org/system/files/technical_resource/E16%26S29-02.pdf and
          https://resources.pcb.cadence.com/blog/acceptable-plated-through-hole-fill-ratio-in-ipc-standards */}
      <section>
        <h2 id="hole-fill" className="text-xl font-semibold mb-3">Does solder need to come through to the other side?</h2>
        <p className="text-muted leading-7">
          Not all the way, but most of the way. The IPC-A-610 workmanship standard is commonly summarized
          as asking for at least 75% vertical fill of a plated barrel on Class 2 and Class 3 assemblies,
          with some relief for holes tied to large copper planes. On a 1.6 mm board, 0.75 × 1.6 = 1.2 mm of
          the barrel should hold solder. In practice, when the fillet on your side is concave and a thin
          silver ring or meniscus shows around the wire on the component side, the barrel has filled. No
          ring at all usually means the solder only capped the hole; reheat with fresh flux rather than
          adding more solder on top.
        </p>
      </section>

      <section>
        <StepHeading n={6} id="trim-the-tail">Trim the tail</StepHeading>
        <p className="text-muted leading-7">
          Trim the end to about 1 mm with flush cutters, flat face toward the board, in one clean snip.
          Twisting the cutters can crack a fresh joint. Trimming before soldering also works if enough still
          pokes through for a fillet.
        </p>
      </section>

      <section>
        <StepHeading n={7} id="strain-relief">Add strain relief</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A solder joint is rigid and the wire beside it is not, so bends concentrate where the solder stops
          and strands break there. Support the wire so the joint never takes the load:
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>Loop the wire up through a spare or dedicated strain-relief hole first.</li>
          <li>Run a bead of hot glue or neutral-cure silicone over the insulation and board.</li>
        </ul>
        <KeyIdea title="Keep the heat off thin insulation">
          A short dwell with a hot, clean tip beats a long, cool touch. See{" "}
          <Link href="/soldering-irons/how-to-solder-wires-without-overheating-insulation" className={link}>
            soldering wires without overheating insulation
          </Link>
          .
        </KeyIdea>
      </section>

      <section>
        <h2 id="troubleshooting" className="text-xl font-semibold mb-3">Why solder won&apos;t flow into a PCB hole: causes and fixes</h2>
        <p className="text-muted leading-7 mb-4">
          Most failed wire joints on a through hole trace back to a few repeat offenders. Find your
          symptom, run the quick check, then apply the fix before you reach for more solder.
        </p>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["Solder balls on the wire and never enters the hole", "Pad not hot; iron touching only the wire", "Watch where the tip sits; the pad should go shiny first", "Lay the tip flat on pad and wire together with a small solder bead as a bridge"],
            ["Wire will not go into the hole", "Bundle too thick or tinning too heavy", "Compare bundle size with the hole using the chart above", "Wick off excess tinning, use a thinner gauge, or trim one or two strands if current is low"],
            ["Hole is already filled with old solder", "Previous part or wire left a plug", "Hold the board to a light; no light means blocked", "Clear it first: see removing solder from a plated through hole"],
            ["Pad heats for 5+ s and solder stays pasty", "Hole is tied to a ground or power plane", "Look for spokes or a copper pour around the pad", "Use a larger chisel tip and a slightly higher setpoint; see the ground pad guide"],
            ["Solder sits on top, nothing shows on the other side", "Barrel not wetted; oxidized plating", "Inspect for a dull, gray ring inside the hole", "Add flux to both sides and reheat for two to three seconds"],
            ["Insulation shrinks back or melts", "Dwell too long or stripped too short", "Measure the bare gap above the board", "Restrip, keep the touch short and clip a heat sink on the wire"],
            ["Solder runs far up the stranded wire", "Too much flux and heat on the strands", "Flex the wire; a stiff section above the joint is wicking", "Tin only the bare length; see the wicking guide"],
            ["Short to the next pad", "A stray strand escaped during tinning", "Check with a loupe and a continuity meter", "Cut the strand with flush cutters, then reflow"],
            ["Pad lifts or turns with the wire", "Overheating or pulling while hot", "Pad edge peels from the board", "Stop and repair the pad before resoldering"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Related fixes:{" "}
          <Link href="/soldering-irons/how-to-remove-solder-from-a-plated-through-hole" className={link}>clearing a blocked plated hole</Link>,{" "}
          <Link href="/soldering-irons/how-to-solder-copper-wire-to-a-circuit-board-ground-pad" className={link}>soldering to a ground pad</Link>,{" "}
          <Link href="/soldering-irons/how-to-solder-stranded-wire-without-solder-wicking-too-far" className={link}>stopping solder wicking up the wire</Link>,{" "}
          <Link href="/soldering-irons/how-to-repair-lifted-pcb-pads-after-desoldering" className={link}>repairing a lifted pad</Link>{" "}
          and{" "}
          <Link href="/soldering-irons/how-to-fix-a-cold-solder-joint-on-a-circuit-board" className={link}>fixing a cold joint</Link>.
        </p>
      </section>

      {/* 2.54 mm (0.1 in) header pitch is the standard. 1.7 mm pad is the KiCad library default for
          PinHeader_2.54mm footprints (typical, not universal). */}
      <section>
        <h2 id="header-rows" className="text-xl font-semibold mb-3">Soldering wires to a row of header holes (Arduino, ESP32 and sensor boards)</h2>
        <p className="text-muted leading-7 mb-4">
          Development boards and breakout modules put their connection holes on a 2.54 mm grid, and those
          holes are the usual place you end up soldering wires directly. A typical pad there is about 1.7 mm
          across, so the copper gap between neighbors is only 2.54 − 1.7 = 0.84 mm. A single escaped strand
          from 22 AWG wire is about 0.25 mm thick and easily reaches across, so the risk on a header row is a
          short, not a weak joint.
        </p>
        <Figure caption={<>Pads on a 2.54 mm grid leave well under a millimeter of bare board between them. One loose strand is enough to bridge it.</>}>
          <HeaderRowDiagram />
        </Figure>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7 mt-4">
          <li>Work from one end of the row and solder every other hole first, so the board between joints cools.</li>
          <li>Pre-tin every wire end before any of them goes in; tinning in place is how strands escape.</li>
          <li>Alternate insulation colors and dress the wires the same way, so you can spot a crossed lead.</li>
          <li>Check adjacent pins with a meter on continuity before powering up.</li>
        </ul>
        <p className="text-muted leading-7 mt-4">
          If the wires will be unplugged later, a header pin plus a jumper housing is often the better
          choice than direct wiring. For general bridge prevention, see{" "}
          <Link href="/soldering-irons/how-to-prevent-solder-bridges" className={link}>how to prevent solder bridges</Link>.
        </p>
      </section>

      <section>
        <h2 id="fine-wire" className="text-xl font-semibold mb-3">How to solder fine wire (28-30 AWG) into a through hole</h2>
        <p className="text-muted leading-7">
          Fine wire has the opposite problem from thick wire: it rattles in the hole, wanders while you
          feed solder and breaks next to the joint. A 30 AWG 7/38 wire spans about 0.30 mm, which leaves
          roughly 0.35 mm of empty space on each side in a 1.0 mm hole. Three fixes help. Fold the tinned
          end back on itself once to double its thickness to about 0.6 mm, so it fills the hole and grips
          before you heat it. Tape the insulation to the board a few millimeters from the hole, so the wire
          cannot move while the joint freezes. Then drop to a 0.5-0.6 mm solder and a small chisel tip, and
          keep the touch to two or three seconds, because thin insulation gives up first. Once the joint
          cools, glue the wire down: fine conductors fatigue within a few bends. For enamel-coated wire,
          the coating has to come off or burn through first; follow{" "}
          <Link href="/soldering-irons/how-to-solder-enamelled-wire-to-a-pcb-pad" className={link}>soldering enamelled wire to a PCB pad</Link>{" "}
          or{" "}
          <Link href="/soldering-irons/how-to-solder-magnet-wire" className={link}>how to solder magnet wire</Link>.
        </p>
      </section>

      <section>
        <h2 id="unplated-holes" className="text-xl font-semibold mb-3">Plated vs unplated holes (perfboard and single-sided boards)</h2>
        <p className="text-muted leading-7">
          Everything above assumes a plated through hole, where a copper barrel joins the pads on both
          faces and solder is pulled through it. Cheap perfboard, stripboard and many single-sided boards
          have bare holes with copper on one side only. There, the hole just locates the wire: insert it
          from the bare side, make the fillet on the copper side, and do not expect solder to climb the
          hole. The joint relies on that one pad&apos;s adhesive, so strain relief matters even more. Hold
          the board up to a light to tell: a plated hole shows a copper lining, a bare one shows fiberglass.
          Mounting holes are often unplated, so never use one as an electrical connection.
        </p>
      </section>

      <section>
        <h2 id="which-iron" className="text-xl font-semibold mb-3">Which soldering iron and tip to use for small through holes</h2>
        <p className="text-muted leading-7 mb-6">
          Any temperature-controlled iron works; the tip matters more. A 1.5 mm to 2 mm chisel moves more heat
          into a pad than a needle-point conical and still fits between close holes. The{" "}
          <Link href="/soldering-irons/soldering-iron-tip-types" className={link}>
            tip types guide
          </Link>{" "}
          compares the shapes; for wire-to-wire splices, see{" "}
          <Link href="/soldering-irons/how-to-solder-wires-together" className={link}>
            how to solder wires together
          </Link>
          .
        </p>
        <ProductStrip
          title="Irons from our soldering reviews"
          items={[
            {
              name: "Pinecil V2",
              image: pinecil.image,
              alt: "Pinecil V2 USB-C soldering iron",
              href: "/soldering-irons/pinecil-v2-review",
              note: "USB-C PD powered, about 12 s heat-up, OLED display. Compact for small boards and field work.",
            },
            {
              name: "Hakko FX-888DX",
              image: hakko.image,
              alt: "Hakko FX-888DX soldering station with rotary dial",
              href: "/soldering-irons/weller-we1010-vs-hakko-fx-888dx",
              note: "100W station on the same T18 tips as the FX-888D; a rotary dial and five presets let you save a setting for larger pads.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
