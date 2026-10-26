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
  "How to prevent components from moving during hand soldering: bent leads, tape, holders, tack soldering and assembly order, with a comparison of every method.";

export const metadata = buildMetadata({
  title: "How to Prevent Components Moving During Soldering",
  description,
  path: "/soldering-irons/how-to-prevent-components-from-moving-during-hand-soldering",
});

const qming = picks.find((p) => p.name === "Q-MING 60W Kit")!;
const yihua926 = picks.find((p) => p.name === "YIHUA 926 III")!;
const fx888dx = picks.find((p) => p.name === "Hakko FX-888DX")!;

const link = "text-accent hover:underline";

function LeadClinchDiagram() {
  return (
    <svg
      viewBox="0 0 360 200"
      className="w-full h-auto"
      role="img"
      aria-label="Two boards turned upside down for soldering. On the left, a resistor with straight leads has slipped out of its holes and hangs away from the board. On the right, a resistor with leads bent outward at about 45 degrees stays seated flat against the board."
    >
      {/* left board */}
      <rect x="15" y="60" width="150" height="12" className="fill-muted stroke-border" strokeWidth="1.5" />
      <rect x="55" y="88" width="70" height="18" rx="8" className="fill-surface stroke-foreground" strokeWidth="2" />
      <line x1="55" y1="97" x2="45" y2="97" className="stroke-foreground" strokeWidth="2" />
      <line x1="45" y1="97" x2="45" y2="50" className="stroke-foreground" strokeWidth="2" />
      <line x1="125" y1="97" x2="135" y2="97" className="stroke-foreground" strokeWidth="2" />
      <line x1="135" y1="97" x2="135" y2="50" className="stroke-foreground" strokeWidth="2" />
      <text x="90" y="128" textAnchor="middle" fontSize="11" className="fill-foreground">Straight leads:</text>
      <text x="90" y="143" textAnchor="middle" fontSize="11" className="fill-foreground">part drops away</text>
      <text x="90" y="40" textAnchor="middle" fontSize="10" className="fill-foreground">solder side (up)</text>
      {/* right board */}
      <rect x="195" y="60" width="150" height="12" className="fill-muted stroke-border" strokeWidth="1.5" />
      <rect x="235" y="72" width="70" height="18" rx="8" className="fill-surface stroke-foreground" strokeWidth="2" />
      <line x1="235" y1="81" x2="225" y2="81" className="stroke-foreground" strokeWidth="2" />
      <line x1="225" y1="81" x2="225" y2="60" className="stroke-foreground" strokeWidth="2" />
      <line x1="225" y1="60" x2="208" y2="43" className="stroke-accent" strokeWidth="2.5" />
      <line x1="305" y1="81" x2="315" y2="81" className="stroke-foreground" strokeWidth="2" />
      <line x1="315" y1="81" x2="315" y2="60" className="stroke-foreground" strokeWidth="2" />
      <line x1="315" y1="60" x2="332" y2="43" className="stroke-accent" strokeWidth="2.5" />
      <text x="270" y="128" textAnchor="middle" fontSize="11" className="fill-foreground">Leads bent ~45°:</text>
      <text x="270" y="143" textAnchor="middle" fontSize="11" className="fill-foreground">part stays flat</text>
      <text x="270" y="40" textAnchor="middle" fontSize="10" className="fill-foreground">solder side (up)</text>
      <text x="180" y="180" textAnchor="middle" fontSize="10" className="fill-foreground">Board shown flipped, component side facing down</text>
    </svg>
  );
}

export default function HowToPreventComponentsFromMovingDuringHandSolderingPage() {
  return (
    <HowToShell
      title="How to Prevent Components from Moving During Hand Soldering"
      description={description}
      published="2026-10-22"
      path="/soldering-irons/how-to-prevent-components-from-moving-during-hand-soldering"
      category="soldering-irons"
      intro={
        <>
          To prevent components from moving during hand soldering, hold them mechanically before any solder
          melts: bend through-hole leads outward, tape parts down, clamp the board in a holder, or tack a
          single pad or pin first so the part is fixed while you solder the rest. Then fit parts in order
          from lowest to tallest so a flipped board presses each one flat. This guide explains why parts
          float, tilt or stand up, and compares each holding method.
        </>
      }
      aside={{
        image: qming.image,
        alt: "Q-MING 60W soldering iron kit with stand and tips",
        caption: (
          <>
            A starter kit like the Q-MING 60W comes with five tips and a stand, which frees both hands for
            holding parts. See our{" "}
            <Link href="/soldering-irons/q-ming-60w-soldering-iron-kit-review" className={link}>
              Q-MING 60W review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "why-parts-move", label: "Why parts move while you solder" },
        { id: "through-hole-vs-smd", label: "Through-hole vs SMD" },
        { id: "bend-the-leads", label: "Bend through-hole leads" },
        { id: "hold-the-board", label: "Hold the board steady" },
        { id: "tape-and-putty", label: "Tape and putty" },
        { id: "tack-one-pin", label: "Tack one pad or pin first" },
        { id: "tweezers-flux-weights", label: "Tweezers, flux and weights" },
        { id: "assembly-order", label: "Assemble low parts first" },
        { id: "compare-methods", label: "Methods compared" },
      ]}
      faq={[
        {
          q: "How do I keep a component flat against the PCB?",
          a: "Push it down fully before soldering, then lock it in place. For through-hole parts, bend two leads outward on the solder side, or lay a strip of tape or a foam pad across the parts before flipping the board. Solder one lead, check the part is flush, reheat that joint while pressing it down if needed, then do the rest.",
        },
        {
          q: "Why does my SMD part stick to the soldering iron tip?",
          a: "Molten solder wets the tip as well as the pad, so a small, light part can be pulled along with the tip as you lift it away. Use less solder, hold the part with tweezers until the joint freezes, and draw the tip away along the pad rather than lifting it straight up. A clean, well-tinned tip also releases more cleanly.",
        },
        {
          q: "Is Blu Tack safe to use when soldering?",
          a: "Used carefully, yes. It holds tall parts, connectors and wires in place well, but it softens near heat and can leave a greasy residue. Keep it away from the joint itself and the tip, press it onto the component body or board edge, and peel it off once the joints have cooled. Clean any residue with isopropyl alcohol.",
        },
        {
          q: "Can I use masking tape instead of Kapton tape?",
          a: "For holding parts on the component side, away from the iron, ordinary masking tape is usually fine. It is not heat-resistant, though, so it can scorch, shrink or leave adhesive near a hot tip or under hot air. Kapton polyimide tape tolerates soldering temperatures and peels cleanly, so it is the better choice anywhere near the joint.",
        },
        {
          q: "Should I clinch component leads before soldering?",
          a: "A slight outward bend of around 45 degrees is enough to hold a part while you flip the board, and it is easy to undo if you need to remove the part later. Fully clinching leads flat against the pads holds more firmly but makes desoldering much harder and can bridge to nearby pads. Trim leads after soldering either way.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/how-to-use-a-soldering-iron",
          title: "How to Use a Soldering Iron",
          desc: "The complete basic technique, from tinning the tip to inspecting the finished joint.",
        },
        {
          href: "/soldering-irons/how-to-solder-fine-pitch-smd-components",
          title: "How to Solder Fine-Pitch SMD Components",
          desc: "Tacking and aligning ICs so they stay put while you drag-solder the pins.",
        },
      ]}
    >
      <Callout title="Safety: keep your hands away from the tip">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Holding a part with a finger next to the joint is how most soldering burns happen. Use tweezers,
            tape or a clamp instead.
          </li>
          <li>
            Lead wires conduct heat quickly: a short lead can get too hot to hold within seconds.
          </li>
          <li>
            Return the iron to its stand between joints, ventilate flux fumes, and wash your hands after
            handling leaded solder.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="why-parts-move" className="text-xl font-semibold mb-3">Why components move during hand soldering</h2>
        <p className="text-muted leading-7 mb-4">
          Molten solder is a liquid with strong surface tension. While it is liquid, a light part effectively
          floats on it, and the solder pulls the part toward whichever surface it wets first. That explains the
          three common problems:
        </p>
        <InfoCards
          items={[
            { label: "Floating and sliding", desc: "A chip drifts off-center on liquid solder, or follows the tip as you lift it." },
            { label: "Tombstoning", desc: "One end wets first and its pull stands the part up on that end." },
            { label: "Tilting", desc: "A through-hole part slips out when the board is turned over, or a lump of solder props one side up." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Pushing on the part with the tip, springy leads, a board that slides around the bench, and gravity
          when the component side faces down all add to it. Every method below either holds the part before
          the solder melts or limits how much liquid solder can pull on it.
        </p>
      </section>

      <section>
        <h2 id="through-hole-vs-smd" className="text-xl font-semibold mb-3">Through-hole vs SMD: different holding problems</h2>
        <p className="text-muted leading-7">
          Through-hole parts are soldered from the underside, so the board is upside down and the part wants
          to fall out. Their leads give you something to grip and bend. Surface mount parts sit on the side
          you are soldering, so gravity helps, but they are tiny, have nothing to clamp, and are moved
          mainly by surface tension and the tip. For through-hole work you mostly fight gravity; for SMD you
          fight the solder itself.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="bend-the-leads">Bend through-hole leads outward</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Push the part flush against the board, then bend two of its leads outward on the solder side,
          roughly 45 degrees. That small splay stops the part sliding back through the holes when you turn
          the board over, yet is easy to straighten again. On multi-pin parts such as DIP sockets and
          connectors, bend two opposite corner pins only.
        </p>
        <Figure
          caption={
            <>
              With the board flipped, straight leads let a resistor slide out of its holes; a 45° outward bend
              on each lead keeps it seated against the board until the joints are made.
            </>
          }
        >
          <LeadClinchDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Bending a lead fully flat onto its pad holds harder but makes later removal difficult and can
          cause bridges, the subject of our guide to{" "}
          <Link href="/soldering-irons/how-to-prevent-solder-bridges" className={link}>
            preventing solder bridges
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={2} id="hold-the-board">Hold the board steady</StepHeading>
        <p className="text-muted leading-7">
          A board that slides is as bad as a part that slides. A PCB holder with spring-loaded jaws grips the
          edges and often rotates, so you can flip the board without unclamping it. Third-hand clamps with
          crocodile clips work for small boards and wires; pad the jaws with heat-shrink so they don&apos;t
          mark the board. A small bench vise with soft jaws suits heavier assemblies. Whatever you use, grip
          the board by its edge, clear of components and the area you are soldering.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="tape-and-putty">Use tape and putty</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Kapton (polyimide) tape withstands soldering temperatures and peels away cleanly, so it can sit right
          beside a joint: tape a row of resistors flat, hold a connector square, or mask neighboring parts.
          Masking tape works on the component side, away from heat. Lay one strip across a batch of parts
          before flipping the board and they all stay seated.
        </p>
        <p className="text-muted leading-7">
          Blu Tack or similar putty is handy for awkward shapes: wires, displays, tall electrolytics and
          switches. It softens with heat and can leave residue, so press it onto bodies and board edges, never
          on the joint.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="tack-one-pin">Tack one pad or pin first</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Tack soldering is the most dependable fix for every part type. Solder just one pin, check the part
          is flat and square, and adjust by reheating only that pin. Once it is right, solder the opposite
          corner, then the rest. On SMD chips the routine is to tin one pad, place the part and reflow; the{" "}
          <Link href="/soldering-irons/how-to-solder-surface-mount-resistors-without-hot-air" className={link}>
            SMD resistor guide
          </Link>{" "}
          covers it in detail, and the{" "}
          <Link href="/soldering-irons/how-to-solder-fine-pitch-smd-components" className={link}>
            fine-pitch guide
          </Link>{" "}
          applies it to ICs.
        </p>
        <KeyIdea title="Check before the second joint">
          A part held by one joint can still be corrected in seconds. A part held by two or more cannot, without
          desoldering. Always look at height and alignment after the first joint.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={5} id="tweezers-flux-weights">Tweezers, flux tackiness and weights</StepHeading>
        <p className="text-muted leading-7">
          Fine, non-magnetic tweezers hold an SMD part down while its first joint freezes; keep them still for
          a second after removing the iron. Gel or paste flux is sticky enough to hold a small chip in place
          on its pads before any solder melts. For larger work, a small weight or a foam pad pressed on the
          component side while the board is flipped holds several parts at once. Use less solder, too: a
          smaller pool has less pull, and this is the main cure for tombstoning.
        </p>
      </section>

      <section>
        <StepHeading n={6} id="assembly-order">Assemble low parts first</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Fit components in order of height. When the board is turned over onto the bench, the shortest parts
          rest on the bench surface and are pressed flat; if tall parts are already fitted, the board rocks on
          them and the low ones hang loose.
        </p>
        <Figure caption={<>A typical order for a mixed board. SMD parts go on first, while the board still lies flat.</>}>
          <FlowDiagram
            steps={[
              { label: "SMD parts", sub: "Board flat, tack first" },
              { label: "Low axial", sub: "Resistors, diodes" },
              { label: "ICs and sockets", sub: "Tack corner pins" },
              { label: "Medium parts", sub: "Small caps, transistors" },
              { label: "Tall parts", sub: "Electrolytics, connectors" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Heavy parts such as transformers and large connectors go last and may need tape or a clamp even then.
          If a part moved while a joint froze, the joint is likely to be dull and weak; see{" "}
          <Link href="/soldering-irons/how-to-fix-a-cold-solder-joint-on-a-circuit-board" className={link}>
            how to fix a cold solder joint
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="compare-methods" className="text-xl font-semibold mb-3">Methods compared: which holding method to use</h2>
        <DataTable
          head={["Method", "Best for", "Strengths", "Watch out for"]}
          rows={[
            ["Bending leads", "Through-hole", "Free, quick, no tools", "Hard to remove if bent flat"],
            ["PCB holder", "Any board", "Both hands free, flips easily", "Grip edges only"],
            ["Third-hand clamp", "Small boards, wires", "Flexible positioning", "Jaws can scratch; tips over"],
            ["Kapton tape", "Any part near heat", "Heat-resistant, clean peel", "Cost compared with masking tape"],
            ["Masking tape", "Component side", "Cheap, holds batches", "Scorches near the tip"],
            ["Blu Tack", "Wires, tall or odd parts", "Fits any shape", "Softens with heat, residue"],
            ["Tack one pin", "SMD and multi-pin parts", "Easy to correct", "Check before the next joint"],
            ["Tweezers", "SMD chips", "Precise", "Magnetised tweezers lift parts"],
            ["Flux tackiness", "Small SMD", "No extra tools", "Weak on heavier parts"],
            ["Weights or foam", "Batches of through-hole", "Holds many parts", "Must cover the right area"],
            ["Board vise", "Heavy assemblies", "Very rigid", "Pad the jaws"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Most good joints combine two: a holder for the board plus tape, bent leads or a tacked pin for the
          part. For the joint technique itself, see{" "}
          <Link href="/soldering-irons/how-to-use-a-soldering-iron" className={link}>
            how to use a soldering iron
          </Link>
          , and our{" "}
          <Link href="/soldering-irons/best-soldering-iron-for-beginners" className={link}>
            best soldering iron for beginners
          </Link>{" "}
          guide if you are choosing a first iron.
        </p>
      </section>
      <section>
        <h2 id="kits-with-holding-tools" className="text-xl font-semibold mb-3">Kits and stations that help keep parts still</h2>
        <p className="text-muted leading-7 mb-6">
          Some starter kits include the holding aids this guide relies on, such as helping hands and fine
          tweezers, which saves buying them separately. A temperature-controlled station also helps indirectly:
          a shorter dwell means less time for a part to float or drift on molten solder. Check the box contents
          rather than the headline wattage when choosing. For first-iron advice, see our{" "}
          <Link href="/soldering-irons/best-soldering-iron-for-diy-electronics" className={link}>
            best soldering iron for DIY electronics
          </Link>{" "}
          guide.
        </p>
        <ProductStrip
          title="Irons and kits for steady joints"
          items={[
            {
              name: "Q-MING 60W Kit",
              image: qming.image,
              alt: "Q-MING 60W soldering iron kit",
              href: "/soldering-irons/q-ming-60w-soldering-iron-kit-review",
              note: "Budget 60W kit with five tips and a stand, adjustable from 200 to 450°C; enough for occasional through-hole work.",
            },
            {
              name: "YIHUA 926 III",
              image: yihua926.image,
              alt: "YIHUA 926 LED III soldering station kit",
              href: "/soldering-irons/best-soldering-irons-for-electronics",
              note: "PID station kit that adds two helping hands and ESD-safe tweezers, the holding tools this guide uses.",
            },
            {
              name: "Hakko FX-888DX",
              image: fx888dx.image,
              alt: "Hakko FX-888DX soldering station",
              href: "/soldering-irons/weller-we1010-vs-hakko-fx-888dx",
              note: "Stable 100W station with five presets, so joints finish fast before a tacked part can drift.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
