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
  "How to remove solder from a plated through hole: why the barrel and ground planes fight you, the add-solder-first trick, pumping from the far side, and needles.";

export const metadata = buildMetadata({
  title: "How to Remove Solder from a Plated Through Hole",
  description,
  path: "/soldering-irons/how-to-remove-solder-from-a-plated-through-hole",
});

const hakko = picks.find((p) => p.name === "Hakko FX888D")!;
const yihua = picks.find((p) => p.name === "YIHUA 862BD+")!;
const weller = picks.find((p) => p.name === "Weller WE1010NA")!;

const link = "text-accent hover:underline";

/** Cross-section of a four-layer board: solder-filled barrel, inner ground plane pulling heat away. */
function PlatedHoleCrossSection() {
  return (
    <svg
      viewBox="0 0 320 210"
      className="w-full h-auto"
      role="img"
      aria-label="Cross-section of a four-layer circuit board showing a solder-filled plated through hole, with the iron heating the top pad while an inner ground plane conducts heat away from the barrel"
    >
      {/* board body */}
      <rect x="20" y="70" width="280" height="70" className="fill-muted/30 stroke-border" strokeWidth="1" />
      {/* inner ground plane, connected to the barrel on the left */}
      <rect x="20" y="93" width="122" height="4" className="fill-accent/70" />
      <rect x="178" y="113" width="122" height="4" className="fill-muted" />
      {/* hole region cut out of board */}
      <rect x="142" y="66" width="36" height="78" className="fill-surface" />
      {/* barrel walls */}
      <rect x="142" y="66" width="4" height="78" className="fill-accent" />
      <rect x="174" y="66" width="4" height="78" className="fill-accent" />
      {/* top and bottom pads */}
      <rect x="124" y="64" width="22" height="6" className="fill-accent" />
      <rect x="174" y="64" width="22" height="6" className="fill-accent" />
      <rect x="124" y="140" width="22" height="6" className="fill-accent" />
      <rect x="174" y="140" width="22" height="6" className="fill-accent" />
      {/* solder column and lead */}
      <rect x="146" y="60" width="28" height="90" className="fill-accent/35" />
      <rect x="156" y="40" width="8" height="122" className="fill-muted stroke-foreground" strokeWidth="1" />
      {/* iron tip */}
      <path d="M118 22 L146 58 L152 52 L126 16 Z" className="fill-foreground/80" />
      <text x="30" y="20" fontSize="10" className="fill-foreground">iron on top pad</text>
      {/* heat flow arrows along plane */}
      <path d="M134 86 L60 86" className="stroke-accent" strokeWidth="1.5" fill="none" markerEnd="url(#pth-arrow)" />
      <defs>
        <marker id="pth-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L10 5 L0 10 Z" className="fill-accent" />
        </marker>
      </defs>
      <text x="26" y="82" fontSize="9" className="fill-foreground">heat escapes into plane</text>
      <text x="26" y="110" fontSize="9" className="fill-muted">inner ground plane</text>
      <text x="200" y="108" fontSize="9" className="fill-muted">inner signal layer</text>
      <text x="200" y="60" fontSize="9" className="fill-muted">copper barrel</text>
      <text x="200" y="166" fontSize="10" className="fill-foreground">bottom solder</text>
      <text x="200" y="179" fontSize="10" className="fill-foreground">freezes first</text>
      <text x="160" y="200" fontSize="9" textAnchor="middle" className="fill-muted">component lead in a solder-filled barrel</text>
    </svg>
  );
}

export default function HowToRemoveSolderFromAPlatedThroughHolePage() {
  return (
    <HowToShell
      title="How to Remove Solder from a Plated Through Hole"
      description={description}
      published="2026-10-22"
      path="/soldering-irons/how-to-remove-solder-from-a-plated-through-hole"
      category="soldering-irons"
      intro={
        <>
          To remove solder from a plated through hole, first add a little fresh solder and flux so the joint
          melts all the way down the barrel, then clear the whole column at once: a solder pump sealed over
          the hole from the opposite side to the iron, wick worked from both faces, or a stainless needle
          pushed through while the solder is molten. The barrel and any ground plane soak up heat, so a
          larger tip and preheat beat a longer dwell.
        </>
      }
      aside={{
        image: hakko.image,
        alt: "Hakko FX888D soldering station handpiece",
        caption: (
          <>
            Thermal recovery matters on heat-sinking holes. The Hakko FX888D is a 70W digital station
            noted for recovering well under load. See our{" "}
            <Link href="/soldering-irons/hakko-fx888d-review" className={link}>
              FX888D review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "why-plated-holes-are-hard", label: "Why plated through holes are hard" },
        { id: "add-fresh-solder", label: "Add fresh solder and flux first" },
        { id: "pump-from-the-opposite-side", label: "Pump from the opposite side" },
        { id: "wick-both-sides", label: "Wick from both sides" },
        { id: "needle-trick", label: "The stainless needle and toothpick trick" },
        { id: "temperature-and-preheat", label: "Temperature, tips and preheat" },
        { id: "multilayer-boards", label: "Multilayer and ground-plane holes" },
        { id: "avoid-lifting-the-barrel", label: "Avoid lifting the barrel or pad" },
        { id: "tools", label: "Irons and stations that help" },
      ]}
      faq={[
        {
          q: "Why won't the solder come out of a through hole?",
          a: "Usually because only the top of the column is molten. The barrel and any plane it joins draw heat away, so solder at the far end stays solid and locks the lead. Add fresh solder and flux, use a larger tip, and pump or wick only once the whole joint is liquid.",
        },
        {
          q: "Can I drill out solder from a plated through hole?",
          a: "Avoid it. A drill bit that clears the solder also tends to cut away the thin copper plating lining the hole, breaking the link between both pads and any inner layers. The board can look fine yet fail electrically. Heat the hole and push a stainless needle through instead.",
        },
        {
          q: "Does adding leaded solder help desolder a lead-free board?",
          a: "Often, yes. Mixing in some leaded solder lowers the joint's melting point and adds fresh flux, so it releases more readily. The trade-off is a mixed alloy left behind, so clear the hole thoroughly before refitting, and skip this on boards that must stay lead-free for compliance.",
        },
        {
          q: "Is a desoldering gun worth it for through-hole work?",
          a: "If you clear holes regularly, such as when reworking connectors or transformers, a heated vacuum desoldering tool saves time because it heats and sucks through one nozzle. For occasional repairs, a spring pump, flux, fresh solder and the techniques here clear most plated holes.",
        },
        {
          q: "How do I know the plated hole is fully clear?",
          a: "Hold the board up to a light. A clear hole shows a clean ring of daylight inside shiny plating; a thin film or a crescent of solder on one side means more remains. If the lead wiggles freely before you pull it, the barrel has released and the part will lift without force.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/how-to-remove-solder-from-circuit-board",
          title: "How to Remove Solder from a Circuit Board",
          desc: "The general guide to wick, pumps and hot air for any joint, not just through holes.",
        },
        {
          href: "/soldering-irons/yihua-862bd-plus-review",
          title: "YIHUA 862BD+ Review",
          desc: "An iron with a separate hot air gun, useful for preheating heavy boards.",
        },
      ]}
    >
      <Callout title="Molten solder, hot leads and fumes">
        <ul className="space-y-2 list-disc pl-5">
          <li>Spring pumps can spit molten solder; wear safety glasses and keep your face clear of the nozzle.</li>
          <li>Leads and needles stay hot for a while after the iron lifts. Use pliers, not fingers.</li>
          <li>Unplug the device, discharge large capacitors, ventilate, and wash your hands after handling leaded solder.</li>
        </ul>
      </Callout>

      <p className="text-muted leading-7">
        This page covers plated through holes specifically. For braid, pumps and hot air on any joint, see{" "}
        <Link href="/soldering-irons/how-to-remove-solder-from-circuit-board" className={link}>
          how to remove solder from a circuit board
        </Link>
        .
      </p>

      <section>
        <h2 id="why-plated-holes-are-hard" className="text-xl font-semibold mb-3">Why removing solder from a plated through hole is hard</h2>
        <p className="text-muted leading-7 mb-4">
          A plated through hole (PTH) has a copper tube, the barrel, linking the pads on each face and often
          inner layers. Solder fills that tube by capillary action, so a good joint is a solid plug the full
          board thickness, and the whole plug must be liquid at once to free the lead. The barrel conducts heat
          away from the pad you touch, and a ground or power plane pulls it out faster than the tip can supply
          it. The top melts while the bottom stays solid.
        </p>
        <Figure
          caption={
            <>
              Heat enters at the top pad, but the barrel and an inner ground plane carry it away, so the solder
              at the far side freezes first and locks the lead in place.
            </>
          }
        >
          <PlatedHoleCrossSection />
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="add-fresh-solder">Add fresh solder and flux first</StepHeading>
        <p className="text-muted leading-7">
          It sounds backwards, but adding solder is the best first move. A pool of molten metal carries heat
          into the barrel far better than a dry tip on a thin, dull joint, and fresh flux cleans oxide off old
          solder. Flux both faces, then load the joint into a generous dome. On a lead-free board, a little leaded
          solder lowers the melting point; see{" "}
          <Link href="/soldering-irons/60-40-vs-63-37-solder" className={link}>
            60/40 vs 63/37 solder
          </Link>{" "}
          for why the eutectic alloy freezes cleanly.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="pump-from-the-opposite-side">Pump from the opposite side to the iron</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Stand the board on edge in a holder. Put the iron on the component-side pad and lead, and hold the
          cocked pump squarely over the hole on the solder side. When that side goes fully liquid, fire. Because
          the iron keeps heating as the vacuum pulls, the whole column moves, not just the top.
        </p>
        <Figure caption={<>A typical sequence for a stubborn plated hole. Repeat from step two if a film remains.</>}>
          <FlowDiagram
            steps={[
              { label: "Flux + solder", sub: "Load a generous dome" },
              { label: "Iron one side", sub: "Pad and lead together" },
              { label: "Pump other side", sub: "Fire once fully molten" },
              { label: "Wick leftovers", sub: "Both faces, fresh braid" },
              { label: "Check by light", sub: "Clean ring, lead loose" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={3} id="wick-both-sides">Wick from both sides</StepHeading>
        <p className="text-muted leading-7">
          Braid alone rarely empties a barrel, but it finishes the job well. Flux a fresh section of braid no
          wider than the pad, press it on with the iron, and lift both together once it stops drawing solder.
          Then flip the board and repeat on the other face. Working each side pulls the remaining film out of
          both ends of the hole. Never drag the braid while it is cooling; it can rip the pad with it.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="needle-trick">The stainless needle and toothpick trick</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Solder does not wet stainless steel, which makes a stainless needle a handy hole-clearing tool. Heat
          the pad until the plug melts, push the needle through from the opposite side, and twist it gently while
          lifting the iron. The solder freezes around a needle it cannot stick to, leaving a clean bore when you
          pull it out. A sharpened wooden toothpick does the same for small holes, though it chars, so work quickly.
        </p>
        <KeyIdea title="Match the needle to the hole">
          Choose a needle slightly smaller than the finished hole so it slides through without scraping the plating.
        </KeyIdea>
      </section>

      <section>
        <h2 id="temperature-and-preheat" className="text-xl font-semibold mb-3">Temperature, tips and preheat</h2>
        <DataTable
          head={["Problem", "Better fix", "Why"]}
          rows={[
            ["Top melts, bottom stays solid", "Larger chisel tip, more solder bridge", "Moves more heat per second into the barrel"],
            ["Joint on a ground plane", "Preheat the board from below", "Shrinks the gap between board and melting point"],
            ["Still stuck after several tries", "Raise setpoint modestly, then stop", "Long dwell lifts pads; let the board cool"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          As a typical starting point, leaded joints clear at around 330 °C to 360 °C and lead-free at 350 °C
          to 380 °C, with heavy planes needing preheat rather than ever-higher settings. The{" "}
          <Link href="/soldering-irons/soldering-iron-temperature-by-metal" className={link}>
            temperature guide
          </Link>{" "}
          explains thermal mass in detail, and{" "}
          <Link href="/soldering-irons/soldering-iron-tip-types" className={link}>
            tip types
          </Link>{" "}
          covers why a chisel outperforms a cone here.
        </p>
      </section>

      <section>
        <h2 id="multilayer-boards" className="text-xl font-semibold mb-3">Multilayer and ground-plane holes</h2>
        <p className="text-muted leading-7">
          Four-layer and thicker boards often tie holes into internal planes. Thermal relief spokes usually
          limit this, but ground pins on connectors and regulators are sometimes joined solid. Warm the whole
          board first: a hot air gun on the underside at a low setting, or a board preheater, brings the copper
          close to melting so the iron supplies only the last step. Expect two or three passes.
        </p>
      </section>

      <section>
        <h2 id="avoid-lifting-the-barrel" className="text-xl font-semibold mb-3">How to avoid lifting the barrel or pad</h2>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>Never pull a lead that is still held by solid solder. The barrel can tear out with it, taking the inner-layer link.</li>
          <li>Let the board cool between attempts instead of holding the iron on for ten seconds or more.</li>
          <li>Keep the pump nozzle square to the board so the recoil does not lever the pad.</li>
        </ul>
        <p className="text-muted leading-7 mt-4">
          If a pad does come away, it can usually be rebuilt: see{" "}
          <Link href="/soldering-irons/how-to-repair-lifted-pcb-pads-after-desoldering" className={link}>
            how to repair lifted PCB pads after desoldering
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="tools" className="text-xl font-semibold mb-3">Irons and stations that help with through holes</h2>
        <p className="text-muted leading-7 mb-6">
          A station that recovers quickly and takes large chisel tips does most of the work; hot air adds
          preheat. For more, see{" "}
          <Link href="/soldering-irons/best-soldering-iron-for-circuit-board-repair" className={link}>
            the best soldering iron for circuit board repair
          </Link>
          .
        </p>
        <ProductStrip
          title="Stations from our soldering reviews"
          items={[
            {
              name: "Hakko FX888D",
              image: hakko.image,
              alt: "Hakko FX888D soldering station handpiece",
              href: "/soldering-irons/hakko-fx888d-review",
              note: "70W digital station with excellent thermal recovery under load.",
            },
            {
              name: "YIHUA 862BD+",
              image: yihua.image,
              alt: "YIHUA 862BD+ soldering iron and hot air rework station",
              href: "/soldering-irons/yihua-862bd-plus-review",
              note: "Soldering iron and hot air gun in one station, handy for board preheat.",
            },
            {
              name: "Weller WE1010NA",
              image: weller.image,
              alt: "Weller WE1010NA digital soldering station",
              href: "/soldering-irons/weller-we1010na-review",
              note: "70W ESD-safe digital station.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
