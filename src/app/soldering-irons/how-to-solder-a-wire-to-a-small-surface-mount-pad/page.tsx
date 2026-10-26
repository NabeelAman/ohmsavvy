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
  "How to solder a wire to a small surface mount pad: pick thin insulated bodge wire, tin pad and wire, tack in one touch, anchor it so the pad never lifts.";

export const metadata = buildMetadata({
  title: "How to Solder a Wire to a Small Surface Mount Pad",
  description,
  path: "/soldering-irons/how-to-solder-a-wire-to-a-small-surface-mount-pad",
});

const pinecil = picks.find((p) => p.name === "Pinecil V2")!;

const link = "text-accent hover:underline";

export default function HowToSolderAWireToASmallSurfaceMountPadPage() {
  return (
    <HowToShell
      title="How to Solder a Wire to a Small Surface Mount Pad"
      description={description}
      path="/soldering-irons/how-to-solder-a-wire-to-a-small-surface-mount-pad"
      category="soldering-irons"
      published="2026-10-22"
      intro={
        <>
          Adding a bodge wire, tapping a test point for a logic analyzer, or landing a lead on the end of an
          0603 resistor all mean attaching a conductor to copper with no hole to hold it. If you want to
          solder a wire to a small surface mount pad, the soldering itself takes about a second; the real
          work is in choosing a thin enough wire, tinning both parts beforehand, and making sure nothing
          ever pulls on the joint, because a surface pad is held to the board only by a thin layer of
          adhesive under the copper.
        </>
      }
      aside={{
        image: pinecil.image,
        alt: "Pinecil V2 portable soldering iron",
        caption: (
          <>
            A compact, light handpiece is easy to steady for the single short touch this joint needs. See
            our{" "}
            <Link href="/soldering-irons/pinecil-v2-review" className={link}>
              Pinecil V2 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "why-pads-are-fragile", label: "Why SMD pads tear so easily" },
        { id: "targets", label: "Common targets and how to approach them" },
        { id: "pick-the-wire", label: "1. Pick a thin insulated wire" },
        { id: "set-up-tip", label: "2. Fit a fine tip and set the heat" },
        { id: "tin-both", label: "3. Tin the pad and the wire end" },
        { id: "tack-it", label: "4. Tack the wire in one touch" },
        { id: "anchor-it", label: "5. Anchor the wire before anything else" },
        { id: "check-for-shorts", label: "6. Check for shorts and continuity" },
        { id: "troubleshooting", label: "Troubleshooting" },
      ]}
      faq={[
        {
          q: "What wire is best for bodge wires on SMD pads?",
          a: "Thin single-core insulated wire around 30 AWG, such as Kynar-insulated wire-wrap wire, is the usual choice. It is stiff enough to stay where you route it, light enough not to lever the pad, and its insulation tolerates brief contact with the iron better than soft PVC.",
        },
        {
          q: "Should the wire run along the pad or end on top of it?",
          a: "Lay it flat along the long axis of the pad so the tinned end sits on the copper for its full length. A wire that arrives vertically or ends abruptly at the edge concentrates any pull at one corner of the pad, which is where peeling starts.",
        },
        {
          q: "Can I solder a wire straight onto an IC pin instead of the pad?",
          a: "Yes, on gull-wing packages such as SOIC or TSSOP the outer bend of the pin is often easier to reach than the pad, and the joint is still electrically identical. Keep the wire very short and anchored, because a pin can be bent or cracked off the package as easily as a pad can lift.",
        },
        {
          q: "How do I keep the wire from shorting to the neighboring pin?",
          a: "Strip only as much as the pad is long, tin it thinly so it does not swell, and approach the pad from the side away from its neighbors. Afterwards, check with a meter between the wire and each adjacent pin before power is applied.",
        },
        {
          q: "Is hot glue good enough as strain relief?",
          a: "A small dab of hot glue a few millimeters from the joint works for a quick fix or a prototype. For a repair that has to last, Kapton tape over the wire run or UV-curing solder mask or adhesive gives a thinner, tidier anchor that does not soften if the board gets warm.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/how-to-solder-surface-mount-resistors-without-hot-air",
          title: "Solder Surface Mount Resistors Without Hot Air",
          desc: "Placing and fixing the SMD parts whose pads you may later wire to.",
        },
        {
          href: "/soldering-irons/how-to-solder-fine-pitch-smd-components",
          title: "How to Solder Fine-Pitch SMD Components",
          desc: "Tip choice, flux and inspection for tightly spaced pins.",
        },
      ]}
    >
      <section>
        <h2 id="why-pads-are-fragile" className="text-xl font-semibold mb-3">Why SMD pads tear so easily</h2>
        <p className="text-muted leading-7 mb-4">
          A through-hole joint is anchored by a plated barrel that runs through the board. A surface pad has
          nothing like that: it is a patch of copper foil bonded to the laminate, connected only by its trace.
          Heat weakens that bond, and a wire acts as a lever. Pull sideways on a freshly soldered wire, or
          let it flex every time the board moves, and the pad peels up with the wire still attached. That is
          why this job differs from{" "}
          <Link href="/soldering-irons/how-to-solder-a-wire-to-a-small-pcb-through-hole" className={link}>
            soldering a wire into a through hole
          </Link>
          , where the hole takes most of the mechanical load.
        </p>
        <Figure
          caption={
            <>
              Side view of the same joint two ways. A wire that rises away from the pad turns any tug into a
              peeling force at the pad edge. A wire laid flat and glued down nearby leaves the joint carrying
              almost no load.
            </>
          }
        >
          <svg viewBox="0 0 320 150" className="w-full h-auto" role="img" aria-label="Side-view diagram comparing a wire rising steeply off an SMD pad, which levers the pad up, with a wire laid flat along the pad and held by a glue dot">
            <g>
              <rect x="10" y="80" width="140" height="18" className="fill-muted/30 stroke-foreground" strokeWidth="1" />
              <rect x="50" y="74" width="50" height="6" className="fill-accent stroke-foreground" strokeWidth="0.8" />
              <path d="M58 72 Q75 66 92 72 Z" className="fill-muted/60 stroke-foreground" strokeWidth="0.8" />
              <path d="M75 70 Q90 50 120 20" className="stroke-foreground fill-none" strokeWidth="3" strokeLinecap="round" />
              <path d="M100 74 L106 68" className="stroke-accent" strokeWidth="1.4" />
              <text x="128" y="22" fontSize="9" className="fill-foreground">pull</text>
              <text x="80" y="115" fontSize="10" textAnchor="middle" className="fill-foreground">wire rises: pad edge peels</text>
              <text x="80" y="129" fontSize="9" textAnchor="middle" className="fill-muted">lever acts on the copper bond</text>
            </g>
            <g>
              <rect x="170" y="80" width="140" height="18" className="fill-muted/30 stroke-foreground" strokeWidth="1" />
              <rect x="190" y="74" width="50" height="6" className="fill-accent stroke-foreground" strokeWidth="0.8" />
              <path d="M196 72 Q215 66 236 72 Z" className="fill-muted/60 stroke-foreground" strokeWidth="0.8" />
              <path d="M200 71 L300 71" className="stroke-foreground fill-none" strokeWidth="3" strokeLinecap="round" />
              <ellipse cx="270" cy="71" rx="11" ry="7" className="fill-accent/40 stroke-foreground" strokeWidth="0.8" />
              <text x="270" y="58" fontSize="9" textAnchor="middle" className="fill-foreground">glue</text>
              <text x="240" y="115" fontSize="10" textAnchor="middle" className="fill-accent">wire flat, anchored nearby</text>
              <text x="240" y="129" fontSize="9" textAnchor="middle" className="fill-muted">glue takes the load, not the pad</text>
            </g>
          </svg>
        </Figure>
      </section>

      <section>
        <h2 id="targets" className="text-xl font-semibold mb-3">Common targets and how to approach them</h2>
        <p className="text-muted leading-7 mb-4">
          Where you land the wire changes how much room you have. Sizes below are the standard imperial
          package outlines; check the actual board, since pad shapes vary by designer. If the trace itself is
          broken rather than just needing a new connection, our guide to{" "}
          <Link href="/soldering-irons/how-to-repair-a-pcb-trace-using-solder-and-jumper-wire" className={link}>
            repairing a PCB trace with jumper wire
          </Link>{" "}
          covers exposing copper and bridging gaps.
        </p>
        <DataTable
          head={["Target", "Typical size", "Approach"]}
          rows={[
            ["Test point pad", "Round, often 1mm or more", "Easiest; lay wire across the center"],
            ["0805 end", "Part 2.0 x 1.25mm", "Land on the solder fillet at the end cap"],
            ["0603 end", "Part 1.6 x 0.8mm", "Tin wire very thinly; approach from the end"],
            ["0402 end", "Part 1.0 x 0.5mm", "Magnification needed; tiny solder only"],
            ["SOIC pin", "1.27mm pitch", "Solder to the pin foot, not between pins"],
            ["TSSOP pin", "0.65mm pitch", "Finest wire; mask neighbors with Kapton"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="pick-the-wire">Pick a thin insulated wire</StepHeading>
        <p className="text-muted leading-7">
          Use solid-core insulated wire around 30 AWG; Kynar wire-wrap wire is popular because its jacket
          shrugs off a brief brush with the tip and strips cleanly. Heavier hookup wire is too stiff and too
          heavy for a pad this small, and stranded wire splays. Strip only about the length of the pad, often
          1-2mm. Enamelled wire is a separate technique with its own stripping problem, covered in our guide
          to{" "}
          <Link href="/soldering-irons/how-to-solder-magnet-wire" className={link}>
            soldering magnet wire
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={2} id="set-up-tip">Fit a fine tip and set the heat</StepHeading>
        <p className="text-muted leading-7">
          A fine conical or small bevel tip lets you touch the pad without also heating its neighbors. A
          typical starting point is around 300-340°C for leaded solder and a little higher for lead-free.
          The target is a joint that wets in about a second; if it takes much longer, add flux or nudge the
          setpoint rather than holding the tip on the pad, since prolonged heat is what loosens the copper.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="tin-both">Tin the pad and the wire end separately</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Flux the stripped wire end and give it a thin, even coat of solder. Then flux the pad and leave a
          small domed layer of solder on it. If the target is the end of a component, the existing fillet is
          usually enough; just refresh it with flux. With both surfaces already tinned, the final joint needs
          no fresh solder at all, which keeps your hands free to hold the wire.
        </p>
        <FlowDiagram
          steps={[
            { label: "Strip", sub: "About pad length" },
            { label: "Tin wire", sub: "Thin, even coat" },
            { label: "Tin pad", sub: "Flux, small dome" },
            { label: "Tack", sub: "One touch, ~1 s" },
            { label: "Anchor", sub: "Glue or Kapton" },
          ]}
        />
      </section>

      <section>
        <StepHeading n={4} id="tack-it">Tack the wire in one touch</StepHeading>
        <p className="text-muted leading-7">
          Route the wire so it already lies flat in its final position, held by tape or a helping hand. Add
          a touch of flux, set the tinned end along the pad, and press the tip down on the wire for a moment.
          Both solder layers melt together; lift the iron and keep the wire still until the joint dulls
          slightly as it freezes. If it did not flow, let it cool and retry rather than hovering the tip.
        </p>
      </section>

      <section id="anchor-it">
        <StepHeading n={5}>Anchor the wire before anything else</StepHeading>
        <KeyIdea title="The joint is electrical; the anchor is mechanical">
          Secure the wire a few millimeters from the joint before you handle or flip the board. Kapton tape
          laid over the run, a spot of UV-curing adhesive or solder mask, or a small dab of hot glue all
          work. Route long bodge wires along the board and tack them down at intervals so no length of wire
          can swing. If a pad does come up despite all this, see our guide to{" "}
          <Link href="/soldering-irons/how-to-repair-lifted-pcb-pads-after-desoldering" className={link}>
            repairing lifted PCB pads
          </Link>
          .
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={6} id="check-for-shorts">Check for shorts and continuity</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Clean away the flux, then inspect under magnification for solder that has crept onto an adjacent
          pad or pin. With the board unpowered, measure from the wire to the net it should join somewhere
          else on the board, then from the wire to each neighboring pin to confirm there is no connection.
        </p>
        <Figure
          caption={
            <>
              Top view of a wire landed on the end of a small chip resistor. The bare tinned end lies along
              the pad, the insulation stops just short of the joint, and a glue dot holds the wire a short
              distance away.
            </>
          }
        >
          <svg viewBox="0 0 320 140" className="w-full h-auto" role="img" aria-label="Top-view diagram of a thin insulated wire soldered along one end pad of a small chip resistor, with insulation ending near the pad and a glue anchor nearby">
            <rect x="60" y="45" width="40" height="40" rx="2" className="fill-accent/60 stroke-foreground" strokeWidth="1" />
            <rect x="150" y="45" width="40" height="40" rx="2" className="fill-accent/60 stroke-foreground" strokeWidth="1" />
            <rect x="80" y="52" width="90" height="26" rx="2" className="fill-muted/60 stroke-foreground" strokeWidth="1" />
            <text x="125" y="69" fontSize="9" textAnchor="middle" className="fill-foreground">chip part</text>
            <line x1="164" y1="65" x2="188" y2="65" className="stroke-foreground" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="188" y1="65" x2="305" y2="65" className="stroke-accent" strokeWidth="5" strokeLinecap="round" />
            <circle cx="250" cy="65" r="11" className="fill-accent/30 stroke-foreground" strokeWidth="0.8" />
            <text x="176" y="100" fontSize="9" textAnchor="middle" className="fill-foreground">tinned end on pad</text>
            <line x1="176" y1="91" x2="176" y2="69" className="stroke-foreground" strokeWidth="0.8" />
            <text x="250" y="40" fontSize="9" textAnchor="middle" className="fill-foreground">anchor dot</text>
            <text x="280" y="90" fontSize="9" textAnchor="middle" className="fill-accent">insulated wire</text>
            <text x="80" y="118" fontSize="9" textAnchor="middle" className="fill-muted">other pad untouched</text>
          </svg>
        </Figure>
      </section>

      <section>
        <h2 id="troubleshooting" className="text-xl font-semibold mb-3">Troubleshooting</h2>
        <DataTable
          head={["Symptom", "Likely cause", "Fix"]}
          rows={[
            ["Solder balls on the wire, pad stays dry", "Pad not tinned or flux burned off", "Flux and tin the pad on its own first"],
            ["Pad lifts as the wire is moved", "Heat weakened the bond, wire unsupported", "Anchor before handling; repair the pad"],
            ["Wire pops off when it cools", "Wire moved while freezing", "Hold it with tape; reflow once"],
            ["Short to the next pin", "Too much solder or stripped too long", "Wick lightly; re-strip shorter"],
            ["Insulation shrinks back from joint", "Dwell too long or PVC jacket", "Shorter touch; use Kynar-type wire"],
            ["Neighboring part shifted", "Tip too large, heated both ends", "Finer tip, approach from outside"],
          ]}
        />
      </section>

      <Callout title="Safety: power off and protect your eyes">
        Disconnect power and remove any battery before working on the board. Thin wire can flick molten
        solder when it springs free, so wear eye protection, ventilate flux smoke away from your face, and
        wash your hands after handling leaded solder.
      </Callout>
    </HowToShell>
  );
}
