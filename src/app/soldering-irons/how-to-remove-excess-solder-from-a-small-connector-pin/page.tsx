import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  KeyIdea,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-soldering-irons/page";

const description =
  "How to remove excess solder from a small connector pin: drag blobs off with a clean tinned tip and flux, size wick to the pin, and reflow to a proper fillet.";

export const metadata = buildMetadata({
  title: "Remove Excess Solder From a Small Connector Pin",
  description,
  path: "/soldering-irons/how-to-remove-excess-solder-from-a-small-connector-pin",
});

const pinecil = picks.find((p) => p.name === "Pinecil V2")!;

const link = "text-accent hover:underline";

export default function HowToRemoveExcessSolderFromASmallConnectorPinPage() {
  return (
    <HowToShell
      title="How to Remove Excess Solder From a Small Connector Pin"
      description={description}
      path="/soldering-irons/how-to-remove-excess-solder-from-a-small-connector-pin"
      category="soldering-irons"
      published="2026-10-22"
      intro={
        <>
          A header or connector pin wearing a ball of solder, a sharp peak, or a fillet that has crept toward
          its neighbor is not a failed joint yet; it just has more alloy than it needs. To remove excess
          solder from a small connector pin you rarely need to desolder anything. The goal is to take the
          surplus away while leaving a correctly shaped joint behind, without cooking the plastic body that
          sits a millimeter or two above the board.
        </>
      }
      aside={{
        image: pinecil.image,
        alt: "Pinecil V2 portable soldering iron",
        caption: (
          <>
            A compact iron with fast heat-up is easy to angle in between connector bodies. See our{" "}
            <Link href="/soldering-irons/pinecil-v2-review" className={link}>
              Pinecil V2 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "fillet-shapes", label: "Good, excess and starved fillets" },
        { id: "method-by-pitch", label: "Which method suits the pitch" },
        { id: "clean-the-tip", label: "1. Clean and tin the tip" },
        { id: "flux-and-drag", label: "2. Flux, then drag the surplus off" },
        { id: "use-wick", label: "3. Wick what the tip can't lift" },
        { id: "reflow-the-fillet", label: "4. Reflow to a proper fillet" },
        { id: "protect-the-plastic", label: "Protecting the connector body" },
        { id: "inspect", label: "Inspection and fixes" },
      ]}
      faq={[
        {
          q: "Why does wiping the tip on a sponge help remove solder from a pin?",
          a: "A freshly cleaned and lightly tinned tip has a wettable surface with little solder on it, so when it touches a blob, surface tension pulls part of the molten solder onto the tip. A tip already carrying a large bead cannot accept more and tends to push solder around instead. Clean it, then touch the pin, then clean again.",
        },
        {
          q: "Is a solder sucker useful on a 2.54mm header pin?",
          a: "It can lift a large blob, but on small pins it often removes too much and leaves a starved joint, and the recoil can knock the tip into the connector body. A clean tip or a narrow strip of wick gives more control for trimming the surplus off one pin.",
        },
        {
          q: "What width of solder wick should I use for header pins?",
          a: "Match the braid to the pin and pad: something around 1.5mm wide suits 2.54mm and 2.0mm pitch headers, while finer 1.0mm-pitch parts want a narrower braid. Wick that is wider than the pad soaks up heat from neighboring joints and is more likely to pull solder from pins you meant to leave alone.",
        },
        {
          q: "How do I know when a fillet is the right size?",
          a: "A good joint on a through-hole pin is a smooth, concave cone that wets both the pad and the pin, with the pin outline still visible under the solder. If the joint is rounded and bulging, or hides the pin completely, there is surplus to take off. If you can see bare pad or a gap where solder meets the pin, add a little more.",
        },
        {
          q: "Can I cut a solder peak off with flush cutters?",
          a: "It is better not to. Cutting cold solder stresses the joint and the pad, and can crack the fillet. Reflow the pin with fresh flux instead; the surface tension of the molten solder rounds off the peak on its own.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/how-to-prevent-solder-bridges",
          title: "How to Prevent Solder Bridges",
          desc: "Stop surplus solder joining neighboring pins in the first place.",
        },
        {
          href: "/soldering-irons/how-to-remove-solder-from-circuit-board",
          title: "How to Remove Solder from a Circuit Board",
          desc: "Full desoldering with wick, pumps and hot air when a part must come out.",
        },
      ]}
    >
      <section>
        <h2 id="fillet-shapes" className="text-xl font-semibold mb-3">Good, excess and starved fillets</h2>
        <p className="text-muted leading-7 mb-4">
          Before removing anything, decide what the finished joint should look like. On a through-hole pin
          the target is a concave cone: solder sweeps up from the edge of the pad to the pin. Excess solder
          shows as a convex dome that hides the pin. A starved joint is the opposite, with bare pad visible
          and a thin ring that barely climbs the pin.
        </p>
        <Figure
          caption={
            <>
              Side profiles of a pin joint. Aim for the concave fillet on the left; remove solder from the
              middle shape, and add a touch more to the starved joint on the right.
            </>
          }
        >
          <svg viewBox="0 0 320 130" className="w-full h-auto" role="img" aria-label="Side-profile diagram of three solder joints on a connector pin: a good concave fillet, an excess convex blob, and a starved joint">
            {[55, 160, 265].map((x) => (
              <g key={x}>
                <rect x={x - 45} y="80" width="90" height="10" className="fill-accent/30 stroke-foreground" strokeWidth="1" />
                <line x1={x} y1="20" x2={x} y2="95" className="stroke-foreground" strokeWidth="4" />
              </g>
            ))}
            <path d="M22 80 Q50 78 52 45 L58 45 Q60 78 88 80 Z" className="fill-muted/60 stroke-foreground" strokeWidth="1" />
            <path d="M120 80 Q115 30 160 28 Q205 30 200 80 Z" className="fill-muted/60 stroke-foreground" strokeWidth="1" />
            <path d="M250 80 Q258 79 262 72 L268 72 Q272 79 280 80 Z" className="fill-muted/60 stroke-foreground" strokeWidth="1" />
            <g fontSize="10" textAnchor="middle">
              <text x="55" y="110" className="fill-accent">good: concave</text>
              <text x="160" y="110" className="fill-foreground">excess: domed</text>
              <text x="265" y="110" className="fill-foreground">starved</text>
              <text x="55" y="123" fontSize="8" className="fill-muted">pin outline visible</text>
              <text x="160" y="123" fontSize="8" className="fill-muted">pin hidden, may bridge</text>
              <text x="265" y="123" fontSize="8" className="fill-muted">bare pad showing</text>
            </g>
          </svg>
        </Figure>
      </section>

      <section>
        <h2 id="method-by-pitch" className="text-xl font-semibold mb-3">Which method suits the pitch</h2>
        <p className="text-muted leading-7 mb-4">
          This is a trimming job, not full removal of a part. For pulling a component out of a board, see
          our guide to{" "}
          <Link href="/soldering-irons/how-to-remove-solder-from-circuit-board" className={link}>
            removing solder from a circuit board
          </Link>
          . For trimming surplus, the right tool depends mostly on how close the pins sit:
        </p>
        <DataTable
          head={["Method", "2.54mm headers", "2.0mm (e.g. PH)", "1.0-1.27mm"]}
          rows={[
            ["Clean tinned tip + flux", "Works well", "Works well", "Best first choice"],
            ["Narrow solder wick", "Good for large blobs", "Good, use a narrow braid", "Use the finest braid"],
            ["Solder sucker", "Large blobs only", "Hard to control", "Rarely useful"],
            ["Hot air", "Overkill", "Risks the housing", "Risks moving the part"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="clean-the-tip">Clean and lightly tin the tip</StepHeading>
        <p className="text-muted leading-7">
          Wipe the tip on brass wool or a damp sponge until it is bright, then give it the thinnest film of
          solder. A small chisel or bevel tip around the width of the pad is ideal; it contacts the joint
          well and has a flat face to carry solder away. Starting around 330-350°C for leaded solder keeps the
          blob fluid long enough to move.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="flux-and-drag">Add flux, then drag the surplus off the pin</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Put fresh flux on the joint, then touch the tip to the side of the blob and draw it slowly down
          and away from the pin, off the end of the pad. Solder follows the tip. Wipe the tip, re-flux, and
          repeat until the dome flattens. Two or three short passes are better than holding the iron on one
          joint for several seconds.
        </p>
        <FlowDiagram
          steps={[
            { label: "Wipe tip", sub: "Bright, thin film only" },
            { label: "Flux joint", sub: "Fresh every pass" },
            { label: "Touch & drag", sub: "Down and away from pin" },
            { label: "Wipe again", sub: "Dump what the tip lifted" },
          ]}
        />
      </section>

      <section>
        <StepHeading n={3} id="use-wick">Wick what the tip can&apos;t lift</StepHeading>
        <p className="text-muted leading-7">
          If the tip moves solder around but the joint stays domed, lay a short length of fluxed wick across
          the pad beside the pin and press the tip onto the braid for a second or two. Lift the iron and the
          wick together, so the braid does not cool and freeze to the joint. Use a fresh section each time;
          saturated wick does nothing.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="reflow-the-fillet">Reflow to a proper fillet</StepHeading>
        <p className="text-muted leading-7">
          After wicking, a joint can look dull or slightly starved. Add a dab of flux and touch the pin once
          more; the solder that remains redistributes into a concave cone. If bare pad is showing, feed in a
          very small amount of thin solder during that touch. Keep the result smaller than you think it
          needs to be; most beginners leave connector pins too full.
        </p>
      </section>

      <section id="protect-the-plastic">
        <KeyIdea title="Protecting the connector body">
          Angle the iron so the tip approaches the joint from the side, below the plastic, rather than
          straight down along the pin. Take breaks between pins so the housing never stays hot. If a mating
          plug is available, fit it to keep the pins aligned while you work. A blob sitting high on the pin
          near the plastic is best wicked rather than dragged upward toward the body.
        </KeyIdea>
      </section>

      <section>
        <h2 id="inspect" className="text-xl font-semibold mb-3">Inspection and fixes</h2>
        <p className="text-muted leading-7 mb-4">
          Inspect with magnification and side lighting, then check neighboring pins for continuity with a
          meter. If surplus has joined two pins, our guide to{" "}
          <Link href="/soldering-irons/how-to-prevent-solder-bridges" className={link}>
            preventing solder bridges
          </Link>{" "}
          covers clearing bridges specifically.
        </p>
        <DataTable
          head={["What you see", "Likely cause", "Fix"]}
          rows={[
            ["Solder spreads but won't leave", "Tip too loaded or flux spent", "Wipe tip, re-flux, drag again"],
            ["Wick stuck to the pad", "Lifted the iron before the braid", "Reheat and lift both together"],
            ["Sharp spike after dragging", "Flux burned off, solder froze as tip left", "Add flux and reflow once"],
            ["Joint now looks grainy", "Overworked joint, too many passes", "Flux, single clean reflow"],
            ["Plastic glossy near the pin", "Tip or heat close to the body", "Approach from the side; wick instead"],
          ]}
        />
      </section>

      <Callout title="Safety: fumes and hot braid">
        Wick and pins stay hot for several seconds after the iron leaves, so do not touch them to check the
        joint. Ventilate flux smoke away from your face, and wash your hands after working with leaded
        solder.
      </Callout>
    </HowToShell>
  );
}
