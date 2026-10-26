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
  "How to solder two wires together: strip, twist or hook the strands, heat the joint, flow solder in, then protect it with heat-shrink for a strong, reliable splice.";

export const metadata = buildMetadata({
  title: "How to Solder Wires Together",
  description,
  path: "/soldering-irons/how-to-solder-wires-together",
});

const pinecil = picks.find((p) => p.name === "Pinecil V2")!;
const fx601 = picks.find((p) => p.name === "Hakko FX-601")!;
const fx888dx = picks.find((p) => p.name === "Hakko FX-888DX")!;

const link = "text-accent hover:underline";

export default function HowToSolderWiresTogetherPage() {
  return (
    <HowToShell
      title="How to Solder Wires Together"
      description={description}
      path="/soldering-irons/how-to-solder-wires-together"
      category="soldering-irons"
      published="2026-10-21"
      intro={
        <>
          Soldering two wires together makes a stronger, lower-resistance splice than a twist alone,
          and it&apos;s one of the most common jobs a soldering iron does outside of a PCB. The process
          differs from board-level work in a few specific ways — mechanical prep before heat,
          strand-by-strand wetting, and heat-shrink for strain relief — covered step by step below.
        </>
      }
      aside={{
        image: pinecil.image,
        alt: "Pinecil V2 portable USB-C powered soldering iron",
        caption: (
          <>
            A portable iron like the Pinecil V2 is genuinely useful for wire splicing done away from a
            bench. See our{" "}
            <Link href="/soldering-irons/pinecil-v2-review" className={link}>
              full review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-youll-need", label: "What you'll need" },
        { id: "splice-types", label: "Twist splice vs. flow splice" },
        { id: "process-overview", label: "The process at a glance" },
        { id: "strip-and-prep", label: "1. Strip and prep both wires" },
        { id: "slide-heat-shrink", label: "2. Slide heat-shrink on first" },
        { id: "join-mechanically", label: "3. Join the strands mechanically" },
        { id: "heat-and-flow", label: "4. Heat the joint and flow solder in" },
        { id: "cool-and-shrink", label: "5. Let it cool, then shrink the tubing" },
        { id: "conductivity-note", label: "Does a soldered splice conduct as well as the original wire?" },
        { id: "common-mistakes", label: "Common mistakes with wire splices" },
        { id: "irons", label: "Irons that suit wire splicing" },
      ]}
      faq={[
        {
          q: "Should solder fully encase the wire splice, or just coat it?",
          a: "Solder should flow into and wet the twisted or hooked strands so they're electrically and mechanically bonded, but you're not aiming to bury the splice in a thick blob. A properly wetted joint looks like the wire's own texture is still slightly visible under a thin, shiny solder coating — not a round lump of solder with the wire hidden inside.",
        },
        {
          q: "Can I solder stranded wire directly to a screw terminal?",
          a: "It's common but worth knowing the trade-off: solder tinning the exposed strands before inserting them under a screw terminal prevents stray strands and makes a cleaner connection, but a solid, tinned chunk of wire under a screw can crack over time from the screw's clamping force plus vibration, since solder is more brittle than the wire's bare strands. For vibration-prone connections, a proper crimp ferrule is usually the better choice.",
        },
        {
          q: "Why does my splice look fine but still feel loose or wiggly?",
          a: "That almost always means the strands weren't actually mechanically joined (twisted or hooked together) before soldering — solder bonds the metal strands to each other, but it isn't a substitute for a solid mechanical connection first. Redo the joint, twisting the bare strands together tightly before reheating and reflowing solder.",
        },
        {
          q: "Is heat-shrink tubing actually necessary, or is electrical tape enough?",
          a: "Heat-shrink is the better choice for most splices. It forms a continuous seal around the joint and adds genuine strain relief at the stiff solder point, where a flexible wire transitions into a rigid soldered section — exactly where repeated flexing is most likely to fatigue and break the wire. Electrical tape alone doesn't add that strain relief and can loosen or unwind over time.",
        },
        {
          q: "What temperature should I set to solder wires together?",
          a: "Many people start around 330–370°C (about 625–700°F) for leaded solder on thin hookup wire and go higher, toward 380–400°C, for lead-free alloys or thicker gauges that pull heat away quickly. Treat those as starting points, not rules: the right setting is the lowest one that lets solder wick through the twist within two or three seconds without scorching the insulation.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/how-to-use-a-soldering-iron",
          title: "How to Use a Soldering Iron",
          desc: "The core technique behind every joint, from tinning the tip to inspecting the result.",
        },
        {
          href: "/soldering-irons/60-40-vs-63-37-solder",
          title: "60/40 vs 63/37 Solder",
          desc: "Which solder alloy makes wire splices easier to get right.",
        },
      ]}
    >
      <Callout title="Strain relief matters more on wires than on board joints">
        A soldered wire splice is rigid exactly at the point where a flexible wire becomes stiff with
        solder — the weakest point for repeated flexing to crack. Heat-shrink tubing (or a proper
        enclosure) that extends past the solder joint on both sides is what actually prevents that, not
        the solder joint&apos;s strength alone.
      </Callout>

      <section>
        <h2 id="what-youll-need" className="text-xl font-semibold mb-3">What you&apos;ll need</h2>
        <p className="text-muted leading-7">
          A soldering iron, rosin-core solder, wire strippers, heat-shrink tubing sized to the finished
          splice, and a heat source for the tubing (a heat gun works best; the iron itself can shrink
          small tubing carefully, kept away from direct contact). Helping-hands or a vise free up both
          hands for the iron and solder, same as for board-level work — see the full{" "}
          <Link href="/soldering-irons/how-to-use-a-soldering-iron" className={link}>
            how-to guide
          </Link>{" "}
          for the base technique this builds on.
        </p>
      </section>

      <section>
        <h2 id="splice-types" className="text-xl font-semibold mb-3">Twist splice vs. flow (lap) splice</h2>
        <p className="text-muted leading-7 mb-4">
          Two common ways to mechanically join wires before soldering, each suited to different
          situations:
        </p>
        <DataTable
          head={["Splice type", "How it's made", "Best for"]}
          rows={[
            ["Twist splice", "Strip both ends, cross and twist the bare strands together tightly", "In-line repairs and extensions, round profile fits inside heat-shrink cleanly"],
            ["Lap (flow) splice", "Lay stripped ends alongside each other, solder flows between them", "Flat or tight spaces where a twisted bulge doesn't fit"],
          ]}
        />
        <div className="mt-4">
          <Figure
            caption={
              <>
                A twist splice crosses and winds both wires into one round bundle before soldering. A
                lap splice runs them alongside each other, soldered along the overlap — flatter, but
                with less mechanical interlock before the solder goes on.
              </>
            }
          >
            <svg viewBox="0 0 300 110" className="w-full h-auto" role="img" aria-label="Comparison of a twist splice versus a lap (flow) splice shape before soldering">
              <g className="stroke-foreground" strokeWidth="2.2" fill="none">
                <path d="M30 40 Q50 55 30 70 Q50 85 70 70 Q90 55 70 40 Q90 25 110 40" />
                <path d="M30 40 Q50 25 70 40 Q90 55 70 70 Q50 85 30 70" className="stroke-accent" />
              </g>
              <text x="70" y="100" fontSize="10" textAnchor="middle" className="fill-foreground">Twist splice: wound together</text>
              <g className="stroke-foreground" strokeWidth="2.2" fill="none">
                <line x1="170" y1="50" x2="230" y2="50" />
                <line x1="190" y1="60" x2="250" y2="60" className="stroke-accent" />
              </g>
              <rect x="190" y="46" width="40" height="18" className="fill-accent/15 stroke-accent" strokeWidth="1" strokeDasharray="3 2" />
              <text x="220" y="90" fontSize="10" textAnchor="middle" className="fill-foreground">Lap splice: overlapped, soldered flat</text>
            </svg>
          </Figure>
        </div>
      </section>

      <section>
        <h2 id="process-overview" className="text-xl font-semibold mb-3">The process at a glance</h2>
        <Figure
          caption={
            <>
              The order matters: heat-shrink has to go on before the splice is joined, since it can&apos;t
              be slid over a finished, bulkier joint afterward.
            </>
          }
        >
          <FlowDiagram
            steps={[
              { label: "Strip & prep", sub: "Both wire ends, strands separated" },
              { label: "Slide heat-shrink", sub: "Onto one wire, well clear of the work area" },
              { label: "Join mechanically", sub: "Twist or hook the strands together" },
              { label: "Heat & flow solder", sub: "Into the joint, not onto the iron" },
              { label: "Cool, then shrink", sub: "Slide tubing over, apply heat" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="strip-and-prep">Strip and prep both wires</StepHeading>
        <p className="text-muted leading-7">
          Strip roughly 15-20mm of insulation from each wire end, enough to twist together without
          leaving bare metal exposed once finished. Separate and straighten the strands slightly — a
          compressed, flattened strand bundle doesn&apos;t twist together as tightly or take solder as
          evenly as individually separated strands.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="slide-heat-shrink">Slide heat-shrink tubing onto one wire first</StepHeading>
        <p className="text-muted leading-7">
          Before joining anything, slide a length of heat-shrink tubing onto one of the two wires and
          push it well clear of the work area — far enough that stray heat from soldering won&apos;t
          prematurely shrink it. This step is easy to forget until the splice is already soldered, at
          which point the tubing can no longer go on without cutting the joint apart.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="join-mechanically">Join the strands mechanically before applying heat</StepHeading>
        <p className="text-muted leading-7">
          Cross the two stripped ends and twist them together several full turns by hand or with
          pliers, so the joint holds its shape without the solder&apos;s help. This mechanical bond is
          what actually gives the splice strength; solder&apos;s role is to lock that bond electrically
          and prevent the strands from working loose, not to hold two untwisted wires together on its
          own.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="heat-and-flow">Heat the joint, then flow solder into it</StepHeading>
        <p className="text-muted leading-7">
          Touch the iron to the twisted joint (not to the solder) and hold it a moment so the wire
          itself reaches temperature, then feed solder into the joint from the side opposite the iron.
          Properly heated strands pull the solder in and let it flow between individual strands by
          capillary action — you&apos;ll see it visibly wick along the twist. Stop once the joint is
          evenly coated; more solder than that just adds unnecessary bulk and stiffness.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="cool-and-shrink">Let it cool, then shrink the tubing</StepHeading>
        <p className="text-muted leading-7">
          Hold the joint still while the solder solidifies, exactly as with any other solder joint —
          movement during cooling risks the same fractured, cold-joint appearance covered in our{" "}
          <Link href="/soldering-irons/how-to-use-a-soldering-iron" className={link}>
            main how-to guide
          </Link>
          . Once cool, slide the heat-shrink tubing over the finished joint, centering it so tubing
          extends past the solder on both sides, and apply heat evenly until it shrinks down snugly.
        </p>
      </section>

      <section id="conductivity-note">
        <KeyIdea title="Does a soldered splice conduct as well as the original wire?">
          Close to it, when properly wetted — solder itself is a reasonable conductor, and a thin,
          well-bonded layer between two clean copper strands adds negligible resistance compared to the
          wire itself. What actually costs you conductivity is a poor connection: a loose twist with
          only a few strands touching, corrosion left on the wire before soldering, or a cold joint with
          a cracked, grainy bond — any of these add real resistance at the joint, far more than solder
          alloy itself ever would in a sound connection.
        </KeyIdea>
      </section>

      <KeyIdea title="Common mistakes specific to wire splices">
        <ul className="space-y-1 list-disc pl-5">
          <li>Forgetting to slide heat-shrink on before joining the wires — there&apos;s no way to add it afterward without redoing the splice.</li>
          <li>Soldering untwisted, merely-touching wire ends and relying on solder alone for mechanical strength.</li>
          <li>Using electrical tape instead of heat-shrink on a splice that will flex or vibrate, where strain relief actually matters.</li>
          <li>Overheating thin wire insulation while soldering, melting it back further than the stripped section intended.</li>
        </ul>
      </KeyIdea>

      <section>
        <h2 id="common-mistakes" className="text-xl font-semibold mb-3">When a splice isn&apos;t the right fix</h2>
        <p className="text-muted leading-7">
          For connections that see regular vibration — automotive wiring, anything bolted to a running
          engine or moving assembly — a proper crimp connector is often more durable than a soldered
          splice, since solder is more brittle than the wire itself under repeated flex. See our{" "}
          <Link href="/soldering-irons/best-soldering-iron-for-automotive-electronics" className={link}>
            automotive electronics guide
          </Link>{" "}
          for more on when each method fits.
        </p>
      </section>

      <section>
        <h2 id="irons" className="text-xl font-semibold mb-3">Irons that suit wire splicing</h2>
        <p className="text-muted leading-7 mb-4">
          Thin signal wire splices fine with almost any temperature-controlled iron. Thicker gauges are a
          different story: the copper soaks up heat, so an iron that recovers quickly or runs hotter makes
          the solder wick through the twist instead of sitting on top of it.
        </p>
        <ProductStrip
          title="Irons for splicing wires"
          items={[
            {
              name: "Pinecil V2",
              image: pinecil.image,
              alt: "Pinecil V2 portable USB-C soldering iron",
              href: "/soldering-irons/pinecil-v2-review",
              note: "Runs from USB-C PD or a 12–24V DC source, so it travels to splices in a car or out in the field.",
            },
            {
              name: "Hakko FX-601",
              image: fx601.image,
              alt: "Hakko FX-601 soldering iron with temperature dial on the handle",
              href: "/soldering-irons/best-soldering-irons#hakko-fx-601",
              note: "67W with a 240–540°C dial on the handle, aimed at heavy wire and terminals that drain heat fast.",
            },
            {
              name: "Hakko FX-888DX",
              image: fx888dx.image,
              alt: "Hakko FX-888DX digital soldering station",
              href: "/soldering-irons/best-soldering-irons#hakko-fx-888dx",
              note: "Closed-loop bench station, 50–480°C, with T18 tips from fine points to wide chisels for bigger joints.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
