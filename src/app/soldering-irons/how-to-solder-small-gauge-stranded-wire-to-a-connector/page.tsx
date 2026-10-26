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
  "How to solder small gauge stranded wire to a connector: solder cups, pins and turrets, stripping without nicked strands, filling cups and strain relief.";

export const metadata = buildMetadata({
  title: "Solder Small Gauge Stranded Wire to a Connector",
  description,
  path: "/soldering-irons/how-to-solder-small-gauge-stranded-wire-to-a-connector",
});

const hakko = picks.find((p) => p.name === "Hakko FX-888DX")!;
const qming = picks.find((p) => p.name === "Q-MING 60W Kit")!;

const link = "text-accent hover:underline";

/** Cut-away of a connector solder cup holding a tinned wire, with heat-shrink drawn over the finished joint. */
function SolderCupDiagram() {
  return (
    <svg
      viewBox="0 0 320 190"
      className="w-full h-auto"
      role="img"
      aria-label="Cut-away view of a connector solder cup: the tinned wire sits on the bottom of the cup, solder fills it level with the opening, a small gap separates the insulation from the cup, and heat-shrink tubing covers the joint"
    >
      {/* connector body */}
      <rect x="10" y="60" width="70" height="70" className="fill-muted/30 stroke-border" strokeWidth="1" />
      <text x="45" y="148" fontSize="9" textAnchor="middle" className="fill-muted">connector body</text>
      {/* cup: back wall and floor, open face toward the viewer */}
      <path d="M80 82 L170 82 Q180 82 180 92 L180 108 Q180 118 170 118 L80 118" className="fill-surface stroke-foreground" strokeWidth="1.5" />
      {/* solder fill */}
      <path d="M84 86 L168 86 Q176 86 176 94 L176 106 Q176 114 168 114 L84 114 Z" className="fill-accent/45" />
      {/* tinned conductor */}
      <rect x="96" y="95" width="104" height="10" rx="2" className="fill-muted stroke-foreground" strokeWidth="1" />
      {/* insulation */}
      <rect x="206" y="91" width="104" height="18" rx="3" className="fill-surface stroke-foreground" strokeWidth="1.5" />
      {/* heat-shrink outline */}
      <rect x="124" y="74" width="150" height="52" rx="8" className="fill-none stroke-accent" strokeWidth="1.5" strokeDasharray="5 3" />
      {/* labels */}
      <text x="100" y="40" fontSize="10" className="fill-foreground">solder level with cup opening</text>
      <line x1="140" y1="44" x2="140" y2="86" className="stroke-border" strokeWidth="1" />
      <text x="214" y="70" fontSize="9" className="fill-accent">heat-shrink</text>
      <text x="200" y="146" fontSize="9" className="fill-muted">small gap before</text>
      <text x="200" y="158" fontSize="9" className="fill-muted">the insulation</text>
      <line x1="203" y1="112" x2="203" y2="136" className="stroke-border" strokeWidth="1" />
      <text x="96" y="176" fontSize="9" className="fill-muted">wire bottomed in the cup, strands tinned</text>
    </svg>
  );
}

export default function HowToSolderSmallGaugeStrandedWireToAConnectorPage() {
  return (
    <HowToShell
      title="How to Solder Small Gauge Stranded Wire to a Connector"
      description={description}
      published="2026-10-22"
      path="/soldering-irons/how-to-solder-small-gauge-stranded-wire-to-a-connector"
      category="soldering-irons"
      intro={
        <>
          To solder small gauge stranded wire to a connector, strip it without cutting any strands, twist and
          tin the bare end, and pre-fill the connector&apos;s solder cup or tin its pin. Then push the wire into
          the molten solder and hold it still until the joint sets. Slide heat-shrink and the connector shell on
          before you start, keep the iron away from the insulation, and finish with strain relief so the wire
          flexes at the clamp, not at the joint.
        </>
      }
      aside={{
        image: hakko.image,
        alt: "Hakko FX-888DX soldering station",
        caption: (
          <>
            Connector cups sit on a lump of brass. The Hakko FX-888DX pairs a 100W station with the 65W
            FX-8801 iron and T18 tips. See our{" "}
            <Link href="/soldering-irons/weller-we1010-vs-hakko-fx-888dx" className={link}>
              Weller WE1010 vs FX-888DX comparison
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "connector-terminal-types", label: "Solder cups, pins and turrets" },
        { id: "slide-parts-on-first", label: "Slide parts onto the cable first" },
        { id: "strip-without-nicking", label: "Strip without nicking strands" },
        { id: "twist-and-tin", label: "Twist and tin the wire" },
        { id: "fill-the-cup", label: "Fill the solder cup" },
        { id: "pins-and-turrets", label: "Pin and turret terminals" },
        { id: "insulation-shrink-back", label: "Prevent insulation shrink-back" },
        { id: "strain-relief", label: "Heat-shrink and strain relief" },
        { id: "irons", label: "Iron and tip choice" },
      ]}
      faq={[
        {
          q: "How much solder should go in a solder cup?",
          a: "Enough to fill the cup roughly level with its open edge once the wire is in, so the strands are fully surrounded with a smooth fillet along the open face. Solder bulging over the rim or running down the outside is too much and can short to the next cup, especially on closely spaced D-sub connectors.",
        },
        {
          q: "Should I tin stranded wire before soldering it to a connector?",
          a: "Yes, for solder cups and pin terminals. Tinning holds the strands together so none splay out of the cup, and it means the wire and the cup only need to melt together briefly. Tin just the stripped length. Do not tin wire that goes into a screw terminal, where solder can creep and loosen the clamp.",
        },
        {
          q: "Why do strands break next to a soldered connector?",
          a: "Solder turns the wire into a stiff rod, so bending concentrates at the spot where the solder stops. Nicked strands from stripping fail first. Prevent it by stripping cleanly, keeping solder off the wire under the insulation, and clamping the cable in the connector's strain relief so flexing happens away from the joint.",
        },
        {
          q: "What temperature should I use for connector solder cups?",
          a: "Typically about 330 °C to 360 °C for leaded solder and a little higher for lead-free, with a chisel tip large enough to touch the cup body. A larger cup on a metal shell needs more heat input, which is better supplied by a bigger tip than by turning the setpoint up and lingering.",
        },
        {
          q: "Which wire insulation handles soldering heat best?",
          a: "Silicone and PTFE insulation tolerate soldering temperatures far better than standard PVC, which softens and shrinks back from the joint. For fine connector work where the insulation sits right next to the cup, PTFE-insulated wire is a common choice. With PVC, leave a small gap and keep each joint short.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/how-to-solder-wires-without-overheating-insulation",
          title: "Solder Wires Without Overheating Insulation",
          desc: "Heat sinks, dwell time and insulation types in more depth.",
        },
        {
          href: "/soldering-irons/how-to-solder-wires-together",
          title: "How to Solder Wires Together",
          desc: "Splicing two wires end to end instead of into a terminal.",
        },
      ]}
    >
      <Callout title="Before you heat a connector">
        <ul className="space-y-2 list-disc pl-5">
          <li>Connector shells and pins hold heat for a while. Let them cool before touching or flexing the joint.</li>
          <li>Clamp the connector in a vise or helping hands so both your hands stay free and away from the tip.</li>
          <li>Ventilate the bench, and wash your hands after handling leaded solder.</li>
        </ul>
      </Callout>

      <section>
        <h2 id="connector-terminal-types" className="text-xl font-semibold mb-3">Solder cups, pins and turrets: the terminal types</h2>
        <InfoCards
          items={[
            { label: "Solder cup", desc: "A half-open tube on D-sub, XLR, DIN and many circular connectors. The wire sits inside it." },
            { label: "Pin terminal", desc: "A straight post, as on headers, banana sockets and some panel jacks. The wire lies along or wraps it." },
            { label: "Turret or eyelet", desc: "A grooved post or ring, common on amplifier boards and tag strips. The wire wraps the post." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Each type takes the same prep but a slightly different joint. Check the connector datasheet for the
          largest wire its cups accept; forcing a wire that is too thick into a small cup leaves strands outside.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="slide-parts-on-first">Slide parts onto the cable first</StepHeading>
        <p className="text-muted leading-7">
          Thread everything that goes over the wire before any soldering: the backshell or boot, the cable
          clamp, and a short sleeve of heat-shrink for each conductor. Forgetting one of these means
          desoldering every joint to fit it. Push the heat-shrink well back along the wire so the heat does not
          shrink it early.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="strip-without-nicking">Strip without nicking strands</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Fine wire may have only seven to nineteen thin strands, so losing a couple is a real loss of strength.
          Use the stripper notch for your exact gauge, or one size larger if it bites, and pull the insulation
          straight off without twisting. Avoid scoring with a blade. Strip just the cup depth, or the pin wrap
          length, plus about 0.5 mm to 1 mm. Look closely: a strand with a bright nick will break first.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="twist-and-tin">Twist and tin the wire</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Give the strands a light twist in their original lay direction, then tin the bare end with a little
          solder so it becomes a single smooth conductor. Hold the wire tip-down so solder runs to the end.
        </p>
        <KeyIdea title="Keep the solder on the bare part">
          Tin only the stripped length with a quick touch. If solder wicks up under the insulation, the wire
          becomes stiff there and tends to break at that point. Our guide to{" "}
          <Link href="/soldering-irons/how-to-solder-stranded-wire-without-solder-wicking-too-far" className={link}>
            soldering stranded wire without solder wicking too far
          </Link>{" "}
          covers how to stop it.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={4} id="fill-the-cup">Fill the solder cup</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Turn the connector so the open side of the cup faces up. Rest the tip against the back of the cup
          and feed solder in until it is about two-thirds full and fully molten. Slide the tinned wire into the
          pool until it touches the bottom, then lift the iron and hold the wire still for a few seconds. The
          finished joint is a smooth fillet level with the cup opening, with the strand outlines faintly visible.
        </p>
        <Figure
          caption={
            <>
              A finished solder cup: tinned strands bottomed in the cup, solder level with the opening, a small
              gap before the insulation, and heat-shrink ready to cover the joint.
            </>
          }
        >
          <SolderCupDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          On multi-pin connectors, work from the middle row outward, or from the far side toward you, so the iron
          never has to reach past joints you have already made.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="pins-and-turrets">Pin and turret terminals</StepHeading>
        <DataTable
          head={["Terminal", "How the wire sits", "Watch for"]}
          rows={[
            ["Solder cup (D-sub, XLR)", "Inside the cup, bottomed", "Overflow bridging to the next cup"],
            ["Straight pin", "Laid along the pin, or one wrap", "Wire pulling off before the solder sets"],
            ["Turret post", "Wrapped half to three-quarters round the groove", "Overlapping turns hiding a void"],
            ["Eyelet or tag", "Hooked through the hole, then crimped lightly", "Too much solder filling the hole"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For posts, make the mechanical connection first so the solder only has to bond, not hold the wire in
          place. The solder should outline the wire, not bury it.
        </p>
      </section>

      <section>
        <h2 id="insulation-shrink-back" className="text-xl font-semibold mb-3">How to prevent insulation shrink-back</h2>
        <p className="text-muted leading-7">
          Thin PVC insulation softens and pulls away from a hot joint, leaving bare copper exposed between cups.
          Leave a small gap, keep each joint short, and use a hot, clean tip so the joint melts quickly rather than
          slowly cooking the wire. Silicone and PTFE insulations tolerate the heat much better. Our guide to{" "}
          <Link href="/soldering-irons/how-to-solder-wires-without-overheating-insulation" className={link}>
            soldering wires without overheating insulation
          </Link>{" "}
          covers heat sinks and dwell time in more detail.
        </p>
      </section>

      <section>
        <h2 id="strain-relief" className="text-xl font-semibold mb-3">Heat-shrink and strain relief</h2>
        <p className="text-muted leading-7 mb-4">
          Once every joint has cooled, slide each heat-shrink sleeve down over its cup until it just covers the
          joint and a few millimeters of insulation, and shrink it with a heat gun. On D-sub and XLR connectors this
          also insulates neighboring cups from each other. Finally, tighten the connector&apos;s cable clamp on
          the outer jacket, not on the individual wires.
        </p>
        <Figure caption={<>The order that avoids rework. The first step is the one most often forgotten.</>}>
          <FlowDiagram
            steps={[
              { label: "Thread parts", sub: "Shell, clamp, heat-shrink" },
              { label: "Strip", sub: "Correct notch, no nicks" },
              { label: "Tin", sub: "Bare length only" },
              { label: "Fill + insert", sub: "Cup two-thirds, wire in" },
              { label: "Shrink + clamp", sub: "Cover joint, grip jacket" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="irons" className="text-xl font-semibold mb-3">Iron and tip choice for connectors</h2>
        <p className="text-muted leading-7 mb-6">
          A chisel tip around 2 mm to 3 mm wide touches the back of a cup with enough area to heat it quickly;
          see{" "}
          <Link href="/soldering-irons/soldering-iron-tip-types" className={link}>
            soldering iron tip types
          </Link>
          . Thin solder, typically 0.5 mm to 0.8 mm, gives finer control of the fill, as the{" "}
          <Link href="/soldering-irons/solder-wire-diameter-guide" className={link}>
            solder diameter guide
          </Link>{" "}
          explains. New to soldering? Start with{" "}
          <Link href="/soldering-irons/how-to-use-a-soldering-iron" className={link}>
            how to use a soldering iron
          </Link>
          .
        </p>
        <ProductStrip
          title="Irons from our soldering reviews"
          items={[
            {
              name: "Hakko FX-888DX",
              image: hakko.image,
              alt: "Hakko FX-888DX digital soldering station",
              href: "/soldering-irons/weller-we1010-vs-hakko-fx-888dx",
              note: "100W station driving a 65W FX-8801 iron; one of its five temperature presets can hold a hotter setting for brass connector cups.",
            },
            {
              name: "Q-MING 60W Kit",
              image: qming.image,
              alt: "Q-MING 60W soldering iron kit with tips and stand",
              href: "/soldering-irons/q-ming-60w-soldering-iron-kit-review",
              note: "60W with an adjustable dial, 5 tips and a stand. Suited to beginners and occasional use.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
