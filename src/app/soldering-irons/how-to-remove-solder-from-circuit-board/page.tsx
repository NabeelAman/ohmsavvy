import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  InfoCards,
  KeyIdea,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-soldering-irons/page";

const description =
  "How to remove solder from a circuit board without lifting pads, using solder wick, a solder sucker, or hot air, and when each tool is the right one.";

export const metadata = buildMetadata({
  title: "How to Remove Solder from a Circuit Board",
  description,
  path: "/soldering-irons/how-to-remove-solder-from-circuit-board",
});

const yihua = picks.find((p) => p.name === "YIHUA 862BD+")!;
const hakko = picks.find((p) => p.name === "Hakko FX-888DX")!;
const weller = picks.find((p) => p.name === "Weller WE1010NA")!;

const link = "text-accent hover:underline";

export default function HowToRemoveSolderFromCircuitBoardPage() {
  return (
    <HowToShell
      title="How to Remove Solder from a Circuit Board"
      description={description}
      path="/soldering-irons/how-to-remove-solder-from-circuit-board"
      category="soldering-irons"
      published="2026-10-21"
      intro={
        <>
          To remove solder from a circuit board, add a little fresh flux, melt the joint, and give the
          solder somewhere to go: copper wick that soaks it up, a solder sucker that vacuums it out of the
          hole, or hot air that frees a whole multi-pin part at once. Whichever you use, keep each
          heating burst short, because the real risk isn&apos;t the solder, it&apos;s overheating a thin
          copper pad until it lifts off the board.
        </>
      }
      aside={{
        image: yihua.image,
        alt: "YIHUA 862BD+ soldering iron and hot air rework station",
        caption: (
          <>
            A combined iron and hot air station like the YIHUA 862BD+ covers both single-joint and
            whole-component desoldering. See our{" "}
            <Link href="/soldering-irons/yihua-862bd-plus-review" className={link}>
              full review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "three-methods", label: "Three methods, compared" },
        { id: "learning-curve", label: "Learning curve and typical pace" },
        { id: "temperatures", label: "The temperatures involved" },
        { id: "solder-wick", label: "Using solder wick (desoldering braid)" },
        { id: "solder-sucker", label: "Using a solder sucker (vacuum pump)" },
        { id: "hot-air", label: "Using hot air for whole components" },
        { id: "protecting-pads", label: "Protecting pads and traces" },
        { id: "plated-through-holes", label: "Plated through-holes need extra care" },
        { id: "which-to-use", label: "Which method should you use" },
        { id: "tools", label: "Stations that make desoldering easier" },
      ]}
      faq={[
        {
          q: "Why did the pad lift off the board when I removed a component?",
          a: "Pads lift almost always from excess heat applied for too long to one spot, which softens the adhesive bonding the thin copper layer to the board underneath. This is especially easy to do on older or lower-quality boards. Working quickly, using fresh flux to help solder release faster, and preferring hot air over prolonged direct iron contact for stubborn joints all reduce this risk.",
        },
        {
          q: "Do I need flux to remove solder, or just to add it?",
          a: "Flux helps considerably with removal too. Adding a small amount of fresh flux to an old, oxidized joint before trying to wick or suck the solder away makes it flow and release far more easily, since old solder on a board oxidizes over time just like solder sitting on a tip does.",
        },
        {
          q: "Can I reuse desoldered solder for a new joint?",
          a: "It's better not to. Solder removed from an old joint has usually been heated multiple times already and may carry contamination from flux residue or the board itself, so it behaves less predictably than fresh solder. Desoldering braid and solder suckers are for removal, not for recycling the solder itself.",
        },
        {
          q: "Is a solder sucker or solder wick better for beginners?",
          a: "Solder wick is generally more forgiving to learn on — it doesn't have moving parts that can disturb the board, and it's easier to see exactly how much solder has been absorbed. A solder sucker removes larger amounts faster once you're comfortable with the timing of triggering it right as the solder melts.",
        },
        {
          q: "Why does a through-hole lead still feel stuck after I've cleared the visible solder?",
          a: "On a multi-layer board, the hole itself is usually plated with a thin copper lining connecting inner layers to the outer pads, and solder can remain inside that barrel even once the top of the pad looks clear. A second wicking or suction pass, sized to the pad rather than oversized, usually clears it.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/soldering-iron-vs-soldering-station",
          title: "Soldering Iron vs. Soldering Station",
          desc: "Why closed-loop temperature control makes rework like this more predictable.",
        },
        {
          href: "/soldering-irons/yihua-862bd-plus-review",
          title: "YIHUA 862BD+ Review",
          desc: "Our 2-in-1 iron and hot air rework station pick.",
        },
      ]}
    >
      <Callout title="Heat damage is the real risk, not the solder">
        Prolonged direct heat on one spot is what lifts pads and delaminates traces — not the act of
        removing solder itself. Work in short bursts, let the board cool between attempts on a stubborn
        joint, and prefer adding fresh flux over simply holding the iron there longer. The tip and any
        molten solder flicked off a wick or sucker can burn skin, so wear safety glasses, park the iron
        in its stand, and unplug the board and any battery before you start.
      </Callout>

      <section>
        <h2 id="three-methods" className="text-xl font-semibold mb-3">Three methods, compared</h2>
        <InfoCards
          items={[
            { label: "Solder wick", desc: "Copper braid wicks molten solder away by capillary action. Good for single joints and cleanup." },
            { label: "Solder sucker", desc: "Spring-loaded vacuum pump pulls molten solder out of a hole. Fast for clearing through-holes." },
            { label: "Hot air", desc: "Heats a whole component evenly so it lifts free without picking at individual pins." },
          ]}
        />
      </section>

      <section>
        <h2 id="learning-curve" className="text-xl font-semibold mb-3">Learning curve and typical pace</h2>
        <p className="text-muted leading-7 mb-4">
          None of the three methods takes long to learn, but they differ in how forgiving they are
          while you&apos;re still building confidence versus how quickly they clear solder once
          you&apos;re comfortable with the timing.
        </p>
        <DataTable
          head={["Method", "Best job", "Pace", "Main risk"]}
          rows={[
            ["Solder wick", "Single joints, bridges, flattening pads", "Slower, easy to control", "Holding the iron too long on a saturated braid"],
            ["Solder sucker", "Clearing through-hole leads", "Fast once the timing clicks", "Recoil knocking the tip into nearby parts"],
            ["Hot air", "ICs, connectors, SMD parts", "Fast on multi-pin parts", "Heating neighbors or melting plastic housings"],
          ]}
        />
      </section>

      <section>
        <h2 id="temperatures" className="text-xl font-semibold mb-3">The temperatures involved</h2>
        <p className="text-muted leading-7 mb-4">
          Desoldering only needs the joint above the alloy&apos;s melting point for a moment; what pulls
          pads is staying there. The chart puts the standard melting points next to a common iron setting
          and the top of a rework station&apos;s range, using the YIHUA 862BD+&apos;s published figures as
          the example station.
        </p>
        <BarChart
          items={[
            { label: "Sn63/Pb37 melts", value: 183, display: "183°C" },
            { label: "SAC305 lead-free melts", value: 218, display: "~217–220°C" },
            { label: "Common iron setting for wick work", value: 350, display: "~330–370°C", highlight: true },
            { label: "YIHUA 862BD+ iron/air maximum", value: 480, display: "480°C" },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The iron setting is a typical starting point rather than a rule: it sits well above the melting
          point so the braid, which is itself a heat sink, can still melt the joint in two or three
          seconds. Turning up toward the top of the range rarely helps. If a joint won&apos;t release in a
          few seconds, more flux or a broader tip is usually the answer. Most consumer boards made since the
          mid-2000s use lead-free factory solder, which is why it can feel stubborn compared with leaded
          hobby solder; flowing a little leaded solder into the joint first lowers its melting point.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="solder-wick">Using solder wick (desoldering braid)</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Lay a length of solder wick over the joint and press the iron tip onto the braid, not
          directly on the joint. Heat conducts through the braid into the solder below, which the braid
          then draws up by capillary action as it melts. Once the braid stops absorbing (it&apos;ll look
          dull and saturated rather than silver), move to a fresh section and repeat.
        </p>
        <Figure
          caption={
            <>
              Solder wick sits over the joint; the iron heats the joint through the braid, and molten
              solder wicks up into the braid&apos;s weave by capillary action, away from the board.
            </>
          }
        >
          <svg viewBox="0 0 300 130" className="w-full h-auto" role="img" aria-label="Diagram of solder wick removing solder from a circuit board pad">
            <rect x="20" y="90" width="260" height="20" rx="2" className="fill-muted/30 stroke-border" strokeWidth="1" />
            <circle cx="150" cy="100" r="9" className="fill-accent/60 stroke-accent" strokeWidth="1.5" />
            <rect x="110" y="70" width="80" height="14" rx="2" className="fill-none stroke-foreground" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="150" y="80" fontSize="9" textAnchor="middle" className="fill-foreground">braid</text>
            <path d="M150 70 L150 30 L170 15" className="stroke-foreground" strokeWidth="3" fill="none" strokeLinecap="round" />
            <text x="200" y="20" fontSize="10" className="fill-muted">iron tip presses down on braid</text>
            <text x="150" y="122" fontSize="9" textAnchor="middle" className="fill-muted">solder joint / pad</text>
          </svg>
        </Figure>
      </section>

      <section>
        <StepHeading n={2} id="solder-sucker">Using a solder sucker (vacuum pump)</StepHeading>
        <p className="text-muted leading-7">
          Cock the sucker&apos;s plunger, heat the joint with the iron until the solder is fully molten,
          then quickly swap the iron for the sucker&apos;s tip right against the melted solder and trigger
          it. Timing matters: trigger too late and the solder has already started to cool and solidify,
          pulling only partially. This method works well for clearing through-hole component leads
          quickly, especially on boards with several similar joints to clear.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="hot-air">Using hot air for whole components</StepHeading>
        <p className="text-muted leading-7">
          For a component with many pins (an IC, a connector) or SMD parts, hot air heats every joint on
          the part simultaneously and evenly, so the whole component lifts free once all its joints are
          molten together — rather than you working pin by pin with an iron and risking the part
          twisting or the board heating unevenly. A combined iron-and-hot-air station like the{" "}
          <Link href="/soldering-irons/yihua-862bd-plus-review" className={link}>YIHUA 862BD+</Link>{" "}
          is built specifically for this kind of multi-pin rework alongside normal iron work.
        </p>
      </section>

      <section>
        <h2 id="protecting-pads" className="text-xl font-semibold mb-3">Protecting pads and traces while you work</h2>
        <DataTable
          head={["Practice", "Why it helps"]}
          rows={[
            ["Add fresh flux before removal attempts", "Old, oxidized solder releases far more easily with fresh flux than without"],
            ["Work in short bursts, let the board cool between tries", "Prolonged heat on one spot is what softens pad adhesive and lifts copper"],
            ["Support the component gently, don't pry before solder is fully molten", "Forcing a joint before it's liquid risks tearing the pad rather than releasing the lead"],
            ["Match tip size to the joint", "A too-small tip concentrates heat and takes longer, increasing total heat exposure"],
          ]}
        />
      </section>

      <section id="plated-through-holes">
        <KeyIdea title="Plated through-holes need extra care">
          A through-hole pad on a multi-layer board usually has a thin copper plating lining the barrel
          of the hole itself, connecting inner layers to the outer pads. Solder can hide inside that
          barrel even after the top looks clear, so a lead may still feel stuck after a first wicking or
          suction pass. Match the wick width to the pad size — a wick noticeably wider than the pad
          mostly wastes heat on the surrounding board instead of drawing solder out of the hole — and
          expect to repeat the pass once or twice on a well-plated via before a lead pulls free cleanly.
        </KeyIdea>
      </section>

      <section id="which-to-use">
        <KeyIdea title="Which method should you use?">
          Single joint or a handful of leads: solder wick or a solder sucker both work well — wick if
          you&apos;re still building confidence, a sucker once you&apos;re comfortable with the timing.
          Multi-pin components (ICs, connectors) or SMD parts: hot air removes the whole part evenly
          in one step, which a wick or sucker can&apos;t do without working pin by pin.
        </KeyIdea>
        <p className="text-muted leading-7 mt-4">
          For the trickier cases, see our dedicated guides to{" "}
          <Link href="/soldering-irons/how-to-remove-solder-from-a-plated-through-hole" className={link}>
            clearing a plated through-hole
          </Link>
          ,{" "}
          <Link href="/soldering-irons/how-to-remove-solder-from-a-multi-pin-pcb-connector" className={link}>
            desoldering a multi-pin connector
          </Link>
          , and{" "}
          <Link href="/soldering-irons/how-to-repair-lifted-pcb-pads-after-desoldering" className={link}>
            repairing a pad that lifted anyway
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="tools" className="text-xl font-semibold mb-3">Stations that make desoldering easier</h2>
        <p className="text-muted leading-7 mb-6">
          Wick and suckers are cheap accessories; the iron behind them is what decides how quickly a joint
          melts. A temperature-controlled station recovers heat as the braid soaks it up, and a station
          with hot air adds the whole-component option.
        </p>
        <ProductStrip
          title="Stations from our soldering reviews"
          items={[
            {
              name: "YIHUA 862BD+",
              image: yihua.image,
              alt: "YIHUA 862BD+ soldering iron and hot air rework station",
              href: "/soldering-irons/yihua-862bd-plus-review",
              note: "75W iron plus 500W hot air in one station; 200–480°C iron and 100–480°C air.",
            },
            {
              name: "Hakko FX-888DX",
              image: hakko.image,
              alt: "Hakko FX-888DX soldering station with FX-8801 handpiece",
              href: "/soldering-irons/weller-we1010-vs-hakko-fx-888dx",
              note: "100W station with a 65W iron, 50–480°C digital control and T18 tips.",
            },
            {
              name: "Weller WE1010NA",
              image: weller.image,
              alt: "Weller WE1010NA digital soldering station",
              href: "/soldering-irons/weller-we1010na-review",
              note: "85W ESD-safe digital station (70W iron) for a dedicated bench.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
