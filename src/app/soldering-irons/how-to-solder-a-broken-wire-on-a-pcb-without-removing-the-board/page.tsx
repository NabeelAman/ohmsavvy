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
  "How to solder a broken wire on a PCB without removing the board: isolating power, shielding nearby parts, a lap joint on the old pad, and working upside down.";

export const metadata = buildMetadata({
  title: "How to Solder a Broken Wire on a PCB In Place",
  description,
  path: "/soldering-irons/how-to-solder-a-broken-wire-on-a-pcb-without-removing-the-board",
});

const pinecil = picks.find((p) => p.name === "Pinecil V2")!;
const hakko = picks.find((p) => p.name === "Hakko FX-888DX")!;

const link = "text-accent hover:underline";

/** Side view of a tinned wire lapped onto an existing pad, with Kapton tape and a service loop. */
function InPlaceLapJointDiagram() {
  return (
    <svg
      viewBox="0 0 340 210"
      className="w-full h-auto"
      role="img"
      aria-label="Side view of a mounted circuit board with a tinned wire laid flat along an existing pad as a lap joint, Kapton tape covering a nearby plastic connector, a service loop of slack in the wire and a dab of glue anchoring the insulation to the board"
    >
      {/* enclosure wall */}
      <rect x="8" y="20" width="10" height="170" className="fill-muted/30 stroke-border" strokeWidth="1" />
      <text x="24" y="32" fontSize="9" className="fill-muted">enclosure wall</text>
      {/* board */}
      <rect x="18" y="140" width="312" height="14" className="fill-muted/30 stroke-border" strokeWidth="1" />
      <text x="230" y="172" fontSize="9" className="fill-muted">board stays mounted</text>
      {/* connector with kapton */}
      <rect x="40" y="110" width="44" height="30" rx="2" className="fill-surface stroke-foreground" strokeWidth="1.2" />
      <rect x="36" y="104" width="52" height="8" className="fill-accent/30 stroke-accent" strokeWidth="1" />
      <text x="34" y="96" fontSize="9" className="fill-foreground">Kapton tape over plastic</text>
      {/* pad */}
      <rect x="150" y="136" width="56" height="4" className="fill-accent" />
      {/* old solder stub */}
      <path d="M152 136 Q178 124 204 136 Z" className="fill-accent/50 stroke-accent" strokeWidth="1.2" />
      {/* tinned conductor lapped on pad */}
      <rect x="156" y="128" width="46" height="6" rx="2" className="fill-muted stroke-foreground" strokeWidth="1" />
      {/* insulation and service loop */}
      <path
        d="M202 131 L236 131 Q262 131 262 106 Q262 82 240 82 Q218 82 218 104 Q218 126 250 126 L320 126"
        fill="none"
        className="stroke-foreground"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* glue blob */}
      <ellipse cx="292" cy="133" rx="16" ry="8" className="fill-surface stroke-foreground" strokeWidth="1" strokeDasharray="3 2" />
      <text x="272" y="118" fontSize="9" className="fill-muted">glue anchor</text>
      <text x="224" y="70" fontSize="9" className="fill-muted">service loop (slack)</text>
      <text x="120" y="118" fontSize="9" className="fill-foreground">lap joint</text>
      <line x1="150" y1="122" x2="170" y2="128" className="stroke-foreground" strokeWidth="0.8" />
      <text x="140" y="190" fontSize="9" className="fill-muted">wire lies along the pad, not across it</text>
    </svg>
  );
}

export default function HowToSolderABrokenWireOnAPcbWithoutRemovingTheBoardPage() {
  return (
    <HowToShell
      title="How to Solder a Broken Wire on a PCB Without Removing the Board"
      description={description}
      published="2026-10-22"
      path="/soldering-irons/how-to-solder-a-broken-wire-on-a-pcb-without-removing-the-board"
      category="soldering-irons"
      intro={
        <>
          To solder a broken wire on a PCB without removing the board, cut all power and pull the batteries,
          mask nearby plastics and cables with Kapton tape or a small heat shield, then tin the wire end and
          lay it flat along the old pad or component lead as a lap joint. A fine tip, a little flux and a
          short touch reflow the existing solder around it. Finish by leaving a loop of slack and gluing the
          insulation so the joint never carries the pull.
        </>
      }
      aside={{
        image: pinecil.image,
        alt: "Pinecil V2 portable USB-C soldering iron",
        caption: (
          <>
            A slim handpiece such as the Pinecil V2 (USB-C PD powered, about 12 s heat-up) reaches into an
            open enclosure more easily than a bulky station pen. See our{" "}
            <Link href="/soldering-irons/pinecil-v2-review" className={link}>
              Pinecil V2 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "in-place-or-remove", label: "When an in-place repair makes sense" },
        { id: "cut-the-power", label: "Cut power and pull batteries" },
        { id: "protect-nearby-parts", label: "Protect plastics and cables" },
        { id: "access-and-tip", label: "Find an angle and a fine tip" },
        { id: "tin-the-wire", label: "Tin the broken wire" },
        { id: "lap-joint", label: "Make a lap joint on the pad" },
        { id: "slack-and-strain-relief", label: "Add slack and strain relief" },
        { id: "heat-shrink-tight-spaces", label: "Heat-shrink in tight spaces" },
        { id: "upside-down-soldering", label: "Working upside down or vertically" },
        { id: "check-the-repair", label: "Check the repair" },
      ]}
      faq={[
        {
          q: "Can I solder a wire back onto a PCB while it is still in the case?",
          a: "Yes, as long as the device is fully unpowered and you can reach the pad with the tip at a reasonable angle. Mask any plastic within a few millimetres, keep the iron's barrel clear of cables, and make the joint quickly. If you cannot see the pad clearly, removing a few screws to tilt the board is safer than soldering blind.",
        },
        {
          q: "Is a lap joint strong enough for a wire on a PCB pad?",
          a: "Electrically, yes: a well-wetted lap joint handles signal and low-current power wiring. Mechanically it is weaker than a wire through a hole, because the pad's adhesive takes any pull. That is why the slack loop and glue anchor matter; with them, the solder only holds the wire in place rather than resisting tugs.",
        },
        {
          q: "Why does my wire keep breaking at the same solder joint?",
          a: "Flexing concentrates where the rigid, solder-filled strands meet the flexible wire, so it snaps at the joint. Typical causes are no slack, a wire that moves when the case opens, or solder wicked far up the strands. Keep tinning short, add a service loop and glue the insulation down beside the pad.",
        },
        {
          q: "How do I stop solder dripping when soldering upside down?",
          a: "Use very little solder. Tin the wire and the pad first, so the final joint needs only a touch of the iron and perhaps a millimetre of fresh solder. Wipe the tip so it carries no loose bead, and use thin 0.5 mm or 0.6 mm solder. Keep your face out from under the work and wear safety glasses.",
        },
        {
          q: "What if the pad came off with the broken wire?",
          a: "Then it is no longer a simple wire job. Follow the trace from the missing pad to the nearest component lead or via on the same net, scrape back a little solder mask if needed, and attach the wire there. Our guides on lifted pads and trace repair cover both routes.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/how-to-repair-a-pcb-trace-using-solder-and-jumper-wire",
          title: "Repair a PCB Trace With Solder and Jumper Wire",
          desc: "When the copper track itself is broken, not the wire attached to it.",
        },
        {
          href: "/soldering-irons/how-to-repair-lifted-pcb-pads-after-desoldering",
          title: "How to Repair Lifted PCB Pads After Desoldering",
          desc: "Re-bond or replace a pad that tore away with the wire.",
        },
      ]}
    >
      <Callout title="Isolate the device before the iron goes in">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Unplug mains equipment and wait for supply capacitors to discharge; a mains-powered board can hold a
            dangerous charge after unplugging. Check with a meter before touching anything.
          </li>
          <li>
            Remove lithium cells or disconnect the battery connector. A hot tip touching a cell or its wiring
            can short it, and a damaged lithium cell can vent or catch fire.
          </li>
          <li>Ventilate flux smoke, park the iron in its stand, and wash your hands after handling leaded solder.</li>
        </ul>
      </Callout>

      <section>
        <h2 id="in-place-or-remove" className="text-xl font-semibold mb-3">When an in-place repair makes sense</h2>
        <p className="text-muted leading-7 mb-4">
          Wires snapping off a mounted board is a common fault in speakers, game controllers, lamps and
          battery packs: the lead flexes each time the case opens until the strands fracture at the solder.
          If the pad is intact and visible, soldering the wire back in place is quicker and less risky than
          unscrewing the board and unplugging every connector.
        </p>
        <p className="text-muted leading-7">
          This guide covers that in-situ case. If the board is already out and the wire goes through a
          plated hole, follow{" "}
          <Link href="/soldering-irons/how-to-solder-a-wire-to-a-small-pcb-through-hole" className={link}>
            how to solder a wire to a small PCB through hole
          </Link>{" "}
          instead. If the copper track itself is cracked rather than the wire, see{" "}
          <Link href="/soldering-irons/how-to-repair-a-pcb-trace-using-solder-and-jumper-wire" className={link}>
            repairing a PCB trace with jumper wire
          </Link>
          . A wire that lands on a big ground pour needs more heat than a lap joint on a signal pad; that
          case has its own guide on{" "}
          <Link href="/soldering-irons/how-to-solder-copper-wire-to-a-circuit-board-ground-pad" className={link}>
            soldering copper wire to a ground pad
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={1} id="cut-the-power">Cut power and pull the batteries</StepHeading>
        <p className="text-muted leading-7">
          Disconnect every source, not just the switch: mains lead, wall adapter, USB cable and battery. Before
          moving anything, photograph the wire&apos;s route. If you are unsure which pad it came from, the
          silkscreen labels or a matching wire on a symmetrical board usually tell you.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="protect-nearby-parts">Protect plastics and cables around the pad</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Inside a case, the risk is everything around the pad: ribbon cables, connector housings and
          enclosure plastic all melt at a light brush from the barrel.
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <strong className="text-foreground">Kapton (polyimide) tape</strong> survives soldering
            temperatures, so a strip over a connector or cable gives the tip somewhere harmless to land.
          </li>
          <li>
            <strong className="text-foreground">A heat shield:</strong> a folded piece of aluminium foil or a
            thin metal ruler slipped between the pad and a plastic wall reflects heat and blocks a slip.
          </li>
          <li>
            <strong className="text-foreground">Tie back loose wiring</strong> so nothing drifts onto the iron.
          </li>
        </ul>
      </section>

      <section>
        <StepHeading n={3} id="access-and-tip">Find an access angle and a fine tip</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Rehearse the approach with the iron cold: tip on the pad, barrel clear of the case edge, wrist
          supported. A long, slim tip keeps the handle outside the enclosure.
        </p>
        <DataTable
          head={["Situation", "Tip that usually works", "Why"]}
          rows={[
            ["Open pad, nothing close", "1.2-1.6 mm chisel", "Flat face heats pad and wire together quickly"],
            ["Pad between tall parts", "Fine conical or bent conical", "Reaches down without touching neighbours"],
            ["Pad near a case wall", "Long, slim chisel or knife", "Keeps the barrel away from plastic"],
            ["Pad on a wide copper area", "Larger chisel, higher setpoint", "Needs more heat delivered at once"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The{" "}
          <Link href="/soldering-irons/soldering-iron-tip-types" className={link}>
            soldering iron tip types guide
          </Link>{" "}
          compares shapes. A typical setpoint for a small signal pad is 320 °C to 350 °C with leaded solder and
          roughly 20 °C higher for lead-free; the{" "}
          <Link href="/soldering-irons/soldering-iron-temperature-by-metal" className={link}>
            temperature guide
          </Link>{" "}
          explains when to go higher.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="tin-the-wire">Trim and tin the broken wire</StepHeading>
        <p className="text-muted leading-7">
          Cut back past the fractured strands, which are usually stiff, dark or full of old solder. Strip
          about 2 mm to 3 mm, twist and tin lightly. If the wire is now too short to reach without tension,
          splice on an extension of the same gauge out in the open first. Slide any heat-shrink for the board
          end onto the wire now.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="lap-joint">Make a lap joint onto the existing pad or lead</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Leave the old solder on the pad as the reservoir for the new joint. Add flux, lay the tinned end flat
          along the pad in the direction the wire will run, and hold it with tweezers. Touch the tip to the wire
          on top of the pad; the old solder and the tinning melt together. Lift the tip and hold still for a
          couple of seconds.
        </p>
        <Figure
          caption={
            <>
              An in-place lap joint: the tinned wire lies along the old pad, tape protects the plastic
              connector next to it, and a slack loop plus a glue anchor take any pull off the solder.
            </>
          }
        >
          <InPlaceLapJointDiagram />
        </Figure>
      </section>

      <section>
        <StepHeading n={6} id="slack-and-strain-relief">Add slack and strain relief</StepHeading>
        <p className="text-muted leading-7">
          Whatever bent the wire before will bend it again. Route it with a small loop of slack so opening the
          case does not stretch it, then fix the insulation to the board a few millimetres from the pad with
          hot glue, neutral-cure silicone or a cable tie. The anchor, not the solder, takes the movement.
        </p>
      </section>

      <section>
        <h2 id="heat-shrink-tight-spaces" className="text-xl font-semibold mb-3">Using heat-shrink in tight spaces</h2>
        <p className="text-muted leading-7">
          Heat-shrink only works if it went on before the joint. In a cramped case, shrink it with brief
          passes of the iron&apos;s barrel (not the tip) or low hot air. Where no sleeve fits, a wrap of Kapton
          tape or a coat of glue keeps the bare copper off neighbouring pads.
        </p>
      </section>

      <section>
        <h2 id="upside-down-soldering" className="text-xl font-semibold mb-3">Soldering upside down or vertically without drips</h2>
        <p className="text-muted leading-7 mb-4">
          Surface tension holds a small molten joint in place on a board that faces down or sideways, but a
          loaded tip or a long feed of solder will drip. Aim to need almost no new solder at that moment.
        </p>
        <Figure caption={<>Pre-tinning moves most of the solder work out of the awkward position.</>}>
          <FlowDiagram
            steps={[
              { label: "Tin wire", sub: "Done in the open" },
              { label: "Flux pad", sub: "Old solder stays" },
              { label: "Wipe tip", sub: "No hanging bead" },
              { label: "Touch and hold", sub: "1-3 s, add 1 mm if dry" },
              { label: "Anchor", sub: "Slack, glue, sleeve" },
            ]}
          />
        </Figure>
        <KeyIdea title="Never put your face under the joint">
          Solder that does fall lands below the work. Tilt the device so you see the pad from the side, wear
          safety glasses, and keep a damp sponge or brass wool within reach to clear the tip.
        </KeyIdea>
      </section>

      <section>
        <h2 id="check-the-repair" className="text-xl font-semibold mb-3">Check the repair before closing the case</h2>
        <p className="text-muted leading-7 mb-6">
          Look for a smooth, shiny joint with the wire outline visible. A grainy or balled joint needs flux and
          a reflow, as shown in{" "}
          <Link href="/soldering-irons/how-to-fix-a-cold-solder-joint-on-a-circuit-board" className={link}>
            fixing a cold solder joint
          </Link>
          . On continuity, check from the wire&apos;s far end to the pad, and from the pad to its neighbours
          for a bridge. Close the case slowly so the slack loop folds where you intended.
        </p>
        <ProductStrip
          title="Irons from our soldering reviews"
          items={[
            {
              name: "Pinecil V2",
              image: pinecil.image,
              alt: "Pinecil V2 USB-C soldering iron",
              href: "/soldering-irons/pinecil-v2-review",
              note: "USB-C PD powered, OLED display, runs from a power bank. Suited to field repairs.",
            },
            {
              name: "Hakko FX-888DX",
              image: hakko.image,
              alt: "Hakko FX-888DX soldering station with FX-8801 handpiece",
              href: "/soldering-irons/weller-we1010-vs-hakko-fx-888dx",
              note: "Bench station with a 100W supply, a 65W FX-8801 handpiece and T18 tips, set by rotary dial for in-place board repairs.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
