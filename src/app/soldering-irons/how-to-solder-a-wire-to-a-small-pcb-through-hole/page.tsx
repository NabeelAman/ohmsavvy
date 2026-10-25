import Link from "next/link";
import {
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
  "How to solder a wire to a small PCB through hole: picking a gauge that fits, strip length, tinning, heating pad and lead together, and adding strain relief.";

export const metadata = buildMetadata({
  title: "How to Solder a Wire to a Small PCB Through Hole",
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
          To solder a wire to a small PCB through hole, strip just enough insulation to pass through the
          board, twist and tin the strands, push the wire in from the component side, then touch the iron
          to the pad and the wire at the same moment and feed solder into the far side of the joint. Stop
          when a smooth, concave fillet wraps the whole pad, then trim the tail and anchor the wire so
          flexing never reaches the joint.
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
        { id: "trim-the-tail", label: "Trim the tail" },
        { id: "strain-relief", label: "Add strain relief" },
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
      ]}
      next={[
        {
          href: "/soldering-irons/how-to-solder-wires-without-overheating-insulation",
          title: "Solder Wires Without Overheating Insulation",
          desc: "Keep short dwell times and use heat sinking so the jacket stays put.",
        },
        {
          href: "/soldering-irons/solder-wire-diameter-guide",
          title: "How to Choose Solder Wire Diameter",
          desc: "Why 0.6 mm to 0.8 mm solder suits small pads better than thick wire.",
        },
      ]}
    >
      <Callout title="Hot tips, fumes and flying wire ends">
        <ul className="space-y-2 list-disc pl-5">
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
      </section>

      <section>
        <StepHeading n={1} id="strip-length">Strip the right length</StepHeading>
        <p className="text-muted leading-7">
          The bare length should equal the board thickness plus about 1 mm to 2 mm of protrusion. On a standard
          1.6 mm board that means stripping about 3 mm. Too much and bare copper above the board can touch a
          neighbouring pad; too little and the strands never reach the solder side. Use the stripper notch for
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
          Less than most beginners expect: on a 0.8 mm hole with a 1.5 mm pad, a few millimetres of 0.6 mm or
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
