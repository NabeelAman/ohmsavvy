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
  "How to use a soldering iron, step by step: tin the tip, prep the joint, heat the metal rather than the solder, and recognise a good joint from a cold one.";

export const metadata = buildMetadata({
  title: "How to Use a Soldering Iron: Step-by-Step Guide",
  description,
  path: "/soldering-irons/how-to-use-a-soldering-iron",
});

const hakko = picks.find((p) => p.name === "Hakko FX888D")!;
const pinecil = picks.find((p) => p.name === "Pinecil V2")!;
const qming = picks.find((p) => p.name === "Q-MING 60W Kit")!;

const link = "text-accent hover:underline";

export default function HowToUseASolderingIronPage() {
  return (
    <HowToShell
      title="How to Use a Soldering Iron"
      description={description}
      path="/soldering-irons/how-to-use-a-soldering-iron"
      category="soldering-irons"
      published="2026-10-21"
      intro={
        <>
          Soldering an electronic joint well comes down to one idea: heat the metal parts until they
          are hot enough to melt solder on their own, then feed solder into that heat — never melt
          solder directly on the tip and drip it onto a cold joint. This guide walks through a complete
          first repair or build session, from tinning a brand-new tip to recognising a joint that needs
          redoing.
        </>
      }
      aside={{
        image: hakko.image,
        alt: "Hakko FX888D soldering station with iron and stand",
        caption: (
          <>
            The steps below apply to any iron, wand-style or station, including our Best Overall pick,
            the Hakko FX888D. See our{" "}
            <Link href="/soldering-irons/hakko-fx888d-review" className={link}>
              full review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "before-you-start", label: "Before you start" },
        { id: "session-overview", label: "The session at a glance" },
        { id: "tin-the-tip", label: "Tin a new or stripped tip" },
        { id: "prep-the-joint", label: "Prep the joint" },
        { id: "heat-the-joint", label: "Heat the joint, not the solder" },
        { id: "feed-the-solder", label: "Feed solder into the heat" },
        { id: "remove-and-cool", label: "Remove the iron and let it cool" },
        { id: "inspect-the-joint", label: "Inspect the joint" },
        { id: "wetting-angle", label: "What the fillet shape actually tells you" },
        { id: "common-mistakes", label: "Common first-timer mistakes" },
        { id: "blowing-on-joints", label: "Myth: blowing on a joint to cool it" },
        { id: "which-iron", label: "Which iron to practise on" },
      ]}
      faq={[
        {
          q: "How long should I hold the iron on a joint?",
          a: "Usually one to three seconds once the joint is up to temperature, for small through-hole connections on a typical PCB. If you are routinely holding the tip on a joint for five seconds or longer to get solder to flow, the iron is underpowered for the joint, the tip is dirty, or the temperature is set too low — not something to compensate for by simply waiting longer, since the extra time increases the risk of heat damage to the component or the board.",
        },
        {
          q: "Do I need flux if my solder already has a flux core?",
          a: "Core flux handles most clean, straightforward joints. Add extra liquid or paste flux when you are reworking an existing joint, soldering to a larger pad or ground plane that pulls heat away quickly, or working with an oxidised surface — the core flux in the wire alone often isn't enough once a joint needs rework rather than a first pass.",
        },
        {
          q: "Why does my solder joint look dull and grainy instead of shiny?",
          a: "That appearance is the classic sign of a cold solder joint: the solder cooled before it fully wetted the metal, usually because the joint was moved while cooling, the parts weren't hot enough when solder was applied, or the iron was removed too early. A good joint looks smooth and slightly concave (a shiny cone), not lumpy, grainy, or cracked.",
        },
        {
          q: "Can I reuse solder that's already stuck to the tip?",
          a: "Not for a new joint. Old solder sitting on the tip oxidises and loses flux activity, so it won't wet a fresh joint properly even if it still looks silver. Wipe the tip clean on a damp sponge or brass wool, re-tin it, then feed new solder from the spool into the actual joint.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/soldering-iron-tip-care",
          title: "Soldering Iron Tip Care",
          desc: "Cleaning, tinning, and knowing when a worn tip needs replacing.",
        },
        {
          href: "/soldering-irons/soldering-iron-not-melting-solder",
          title: "Why Won't My Soldering Iron Melt Solder?",
          desc: "The usual causes, from a cold tip to the wrong solder alloy.",
        },
      ]}
    >
      <Callout title="Basic safety before you plug in">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            A soldering iron tip commonly runs at 300–370°C (570–700°F) — hot enough to cause a
            serious burn instantly. Always return the iron to its stand between joints; never set it
            down on a bench.
          </li>
          <li>
            Solder fumes are mostly flux vapour, which irritates eyes and airways with prolonged
            exposure. Work in a ventilated area or use a small fan/extractor to pull fumes away from
            your face, and avoid breathing directly over the joint.
          </li>
          <li>
            Lead-based solder (60/40 or 63/37) is a health hazard if ingested — wash your hands after
            soldering and before eating, and don&apos;t eat at the bench.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="before-you-start" className="text-xl font-semibold mb-3">What you need before you start</h2>
        <p className="text-muted leading-7 mb-5">
          Beyond the iron itself, a short list of basics makes every joint easier and safer:
        </p>
        <InfoCards
          items={[
            { label: "Stand & sponge/brass wool", desc: "Holds the hot iron safely and cleans the tip between joints." },
            { label: "Rosin-core solder", desc: "60/40 or 63/37 leaded, or a lead-free alloy — flux is built into the core." },
            { label: "Liquid or paste flux", desc: "For rework, larger pads, or oxidised surfaces core flux alone won't wet." },
            { label: "Wire cutters/strippers", desc: "To trim leads flush after soldering and prep wire ends." },
            { label: "Helping-hands or vise", desc: "Frees both hands for the iron and the solder spool." },
            { label: "Ventilation", desc: "A fan or extractor pulling flux fumes away from your face." },
          ]}
        />
      </section>

      <section>
        <h2 id="session-overview" className="text-xl font-semibold mb-3">The session at a glance</h2>
        <p className="text-muted leading-7 mb-4">
          Every joint, whether it&apos;s a single wire splice or a full board of through-hole parts,
          follows the same six-stage routine. Once this becomes automatic, soldering stops being
          intimidating.
        </p>
        <Figure
          caption={
            <>
              Stage 1 covers steps below under &quot;Tin the tip&quot; and &quot;Prep the joint&quot;;
              stages 2–4 are the core heat-flow sequence that determines joint quality; stage 5 is
              where most beginner mistakes (joint movement, pulling solder too soon) happen.
            </>
          }
        >
          <FlowDiagram
            steps={[
              { label: "Tin & prep", sub: "Clean tip, clean and position the joint" },
              { label: "Heat the joint", sub: "Tip touches both metal surfaces" },
              { label: "Feed solder", sub: "Into the joint, not onto the tip" },
              { label: "Remove iron", sub: "Pull solder first, then the tip" },
              { label: "Let it cool", sub: "Hold still — no movement while molten" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="tin-the-tip">Tin a new or freshly-cleaned tip</StepHeading>
        <p className="text-muted leading-7">
          A brand-new tip ships with a thin protective coating, not solder. Heat the iron to around
          300°C, then as soon as it reaches temperature, melt a small amount of fresh solder directly
          onto the tip so it fully coats the working end in a thin, shiny layer. This is called tinning,
          and it&apos;s what actually transfers heat into a joint — a dry, untinned tip barely conducts heat
          at all, even red-hot. Re-tin after every cleaning, since wiping the tip removes the solder
          layer along with the oxide.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="prep-the-joint">Prep the joint before the iron touches it</StepHeading>
        <p className="text-muted leading-7">
          Strip wire ends to bare, clean copper and twist stranded wire so it doesn&apos;t fray. On a
          PCB, make sure the component lead sits fully through the hole and is bent slightly to hold it
          in place. Both surfaces being soldered — not just one — need to be clean metal; solder
          won&apos;t wet oxidised, painted, or greasy surfaces no matter how long you apply heat.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="heat-the-joint">Heat the joint itself, not the solder</StepHeading>
        <p className="text-muted leading-7">
          Touch the tip so it contacts both parts of the joint at once — for example, the component
          lead and the copper pad, or both wires being spliced — and hold it there for roughly one to
          two seconds before introducing any solder. The goal is for the metal itself to reach solder&apos;s
          melting point, so the solder melts because the joint is hot, not because the iron melted it
          separately. This single habit is the biggest difference between a strong joint and a cold one.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="feed-the-solder">Feed solder into the heat, away from the tip</StepHeading>
        <p className="text-muted leading-7">
          With the tip still holding the joint at temperature, touch the solder wire to the joint on
          the side opposite the iron — not to the tip itself. Properly heated metal will pull the
          molten solder in and let it flow around the joint on its own (this flow is called wetting).
          Feed just enough solder to cover the joint with a thin, smooth fillet; too much pools into a
          blob, too little leaves exposed metal or a weak mechanical bond.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="remove-and-cool">Remove the solder, then the iron, then hold still</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Pull the solder wire away first, then lift the iron a moment later. Keep the joint
          completely motionless for a few seconds while the solder solidifies — movement during this
          window is the single most common cause of a cracked or cold joint, since it disturbs the
          metal crystal structure as it sets.
        </p>
        <KeyIdea title="Why 'don't move it' matters so much">
          Solder needs to cool through its melting range undisturbed to form one continuous crystal
          structure. Jostle it mid-cool and you get a fractured, dull-grey joint with poor
          conductivity and weak mechanical strength, even though it may look fine from a glance.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={6} id="inspect-the-joint">Inspect the finished joint</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A good joint is a smooth, shiny, slightly concave cone shape that clearly wets both the lead
          and the pad or wire. Compare it against the signs below before moving to the next joint.
        </p>
        <DataTable
          head={["Look", "What it usually means"]}
          rows={[
            ["Shiny, smooth, concave cone", "Good joint — move on"],
            ["Dull, grainy, or cracked surface", "Cold joint — the metal moved while cooling, or wasn't hot enough; reheat and redo"],
            ["Ball-shaped blob, not wetted to the pad", "Joint wasn't hot enough when solder was applied — reheat and add a touch more solder"],
            ["Solder bridging two adjacent pads/pins", "Too much solder, or pins too close — remove the bridge and reflow with less solder"],
          ]}
        />
      </section>

      <section>
        <h2 id="wetting-angle" className="text-xl font-semibold mb-3">What the fillet shape actually tells you</h2>
        <p className="text-muted leading-7 mb-4">
          Looking at a joint from the side, in cross-section, says more than a quick glance from above.
          A wetted joint tapers from the pad up to the lead at a shallow, concave angle, because the
          molten solder was pulled thin across the whole surface. A cold or unwetted joint instead balls
          up at a much steeper angle, because the solder never spread properly in the first place — it
          just solidified roughly where it landed.
        </p>
        <Figure
          caption={
            <>
              Side profile of the same joint: a wetted fillet (left) tapers in a low, concave curve
              because the solder spread across the whole surface. A cold or unwetted joint (right)
              balls up at a steep angle, since it never spread before solidifying.
            </>
          }
        >
          <svg viewBox="0 0 300 120" className="w-full h-auto" role="img" aria-label="Side profile comparison of a wetted solder fillet versus a cold, unwetted joint">
            <line x1="10" y1="90" x2="140" y2="90" className="stroke-muted" strokeWidth="4" />
            <path d="M55 90 Q85 68 115 90" className="fill-accent/60 stroke-accent" strokeWidth="1.5" />
            <line x1="85" y1="90" x2="85" y2="45" className="stroke-foreground" strokeWidth="3" />
            <text x="85" y="108" fontSize="10" textAnchor="middle" className="fill-foreground">Wetted: shallow, concave</text>

            <line x1="160" y1="90" x2="290" y2="90" className="stroke-muted" strokeWidth="4" />
            <circle cx="225" cy="75" r="15" className="fill-accent/60 stroke-accent" strokeWidth="1.5" />
            <line x1="225" y1="90" x2="225" y2="45" className="stroke-foreground" strokeWidth="3" />
            <text x="225" y="108" fontSize="10" textAnchor="middle" className="fill-foreground">Cold/unwetted: steep ball</text>
          </svg>
        </Figure>
      </section>

      <section id="common-mistakes">
        <KeyIdea title="Common first-timer mistakes to watch for">
          <ul className="space-y-1 list-disc pl-5">
            <li>Melting solder directly onto the tip, then wiping it onto the joint — this skips proper heating of the joint itself.</li>
            <li>Pulling the iron away the instant solder starts to flow, before the joint is fully wetted.</li>
            <li>Holding a part in loose tweezers that lets it shift during cooling.</li>
            <li>Using a cold, oxidised tip and wondering why nothing melts — see the{" "}
              <Link href="/soldering-irons/soldering-iron-not-melting-solder" className={link}>troubleshooting guide</Link> for this specifically.
            </li>
          </ul>
        </KeyIdea>
      </section>

      <section id="blowing-on-joints">
        <KeyIdea title="Myth: blowing on a joint cools it faster, with no downside">
          It&apos;s a common habit, but moving air across a joint while it&apos;s still molten is just
          another form of disturbing it during the exact window it needs to stay still — the same
          problem as a nudged wire or a twitchy hand. If you want a joint to cool sooner, give it a
          moment longer under the iron so less heat has soaked into the surrounding board, then leave it
          alone in still air rather than blowing on it.
        </KeyIdea>
      </section>

      <section>
        <h2 id="which-iron" className="text-xl font-semibold mb-3">Which iron should you practise on?</h2>
        <p className="text-muted leading-7">
          Any iron with decent thermal recovery will work for the steps above. A station such as the{" "}
          <Link href="/soldering-irons/hakko-fx888d-review" className={link}>Hakko FX888D</Link>{" "}
          gives precise, repeatable temperature control for regular use. A portable, USB-C powered iron
          like the{" "}
          <Link href="/soldering-irons/pinecil-v2-review" className={link}>Pinecil V2</Link>{" "}
          follows the exact same steps with no bench setup. A complete starter kit like the{" "}
          <Link href="/soldering-irons/q-ming-60w-soldering-iron-kit-review" className={link}>Q-MING 60W Kit</Link>{" "}
          bundles a stand, sponge, and several tips in one box for a first purchase. The{" "}
          <Link href="/soldering-irons/soldering-iron-buying-guide" className={link}>buying guide</Link>{" "}
          covers wattage and temperature control in more depth.
        </p>
        <div className="mt-6">
          <ProductStrip
            title="Good irons to learn on"
            items={[
              {
                name: "Hakko FX888D",
                image: hakko.image,
                alt: "Hakko FX888D soldering station with iron and stand",
                href: "/soldering-irons/hakko-fx888d-review",
                note: "70W digital station with fast thermal recovery.",
              },
              {
                name: "Pinecil V2",
                image: pinecil.image,
                alt: "Pinecil V2 portable USB-C powered soldering iron",
                href: "/soldering-irons/pinecil-v2-review",
                note: "65W, USB-C PD powered, pocket-sized.",
              },
              {
                name: "Q-MING 60W Kit",
                image: qming.image,
                alt: "Q-MING 60W soldering iron kit with stand and tips",
                href: "/soldering-irons/q-ming-60w-soldering-iron-kit-review",
                note: "Complete beginner kit: iron, stand, and 5 tips.",
              },
            ]}
          />
        </div>
      </section>
    </HowToShell>
  );
}
