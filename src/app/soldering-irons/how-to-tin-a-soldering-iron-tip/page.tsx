// How-to page. Tip tinning/maintenance is well-established, non-disputed soldering-iron technique — no
// per-instance citation required per CONTENT_STANDARDS.md §1. Product-specific claims reuse existing verified
// Picks' own stated specs only (Hakko FX-888DX's temperature range, per its own Pick data).
import Link from "@/components/AppLink";
import {
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const all = getAllPicks("soldering-irons");
const fx888dx = all.find((p) => p.name === "Hakko FX-888DX")!;
const pinecil = all.find((p) => p.name === "Pinecil V2")!;

const description =
  "How to tin a soldering iron tip: when to do it, the exact steps for a fresh or oxidized tip, and how to tin before storage to make tips last far longer.";

export const metadata = buildMetadata({
  title: "How to Tin a Soldering Iron Tip",
  description,
  path: "/soldering-irons/how-to-tin-a-soldering-iron-tip",
  image: fx888dx.image,
});

const link = "text-accent hover:underline";

/** Tip condition: bare/oxidized (dull, poor heat transfer) vs freshly tinned (shiny, even coating). */
function TipConditionDiagram() {
  return (
    <svg
      viewBox="0 0 320 140"
      className="w-full h-auto"
      role="img"
      aria-label="Comparison of tip conditions. A bare, oxidized tip looks dull gray or black with an uneven surface and transfers heat poorly. A freshly tinned tip is coated evenly in shiny solder and transfers heat quickly and reliably."
    >
      <path d="M40 30 L55 90 L25 90 Z" className="fill-surface stroke-foreground" strokeWidth="1.8" />
      <text x="40" y="20" fontSize="9" fontWeight="700" textAnchor="middle" className="fill-foreground">Bare / oxidized</text>
      <text x="40" y="112" fontSize="8.5" textAnchor="middle" className="fill-muted">Dull, uneven, poor heat transfer</text>
      <path d="M240 30 L255 90 L225 90 Z" className="fill-accent/40 stroke-accent" strokeWidth="1.8" />
      <text x="240" y="20" fontSize="9" fontWeight="700" textAnchor="middle" className="fill-foreground">Freshly tinned</text>
      <text x="240" y="112" fontSize="8.5" textAnchor="middle" className="fill-muted">Shiny, even coating, fast heat transfer</text>
      <text x="160" y="135" fontSize="9" textAnchor="middle" className="fill-muted">A thin solder coating protects the tip and conducts heat into the joint</text>
    </svg>
  );
}

export default function HowToTinASolderingIronTipPage() {
  return (
    <HowToShell
      title="How to Tin a Soldering Iron Tip"
      description={description}
      published="2026-11-28"
      path="/soldering-irons/how-to-tin-a-soldering-iron-tip"
      category="soldering-irons"
      intro={
        <>
          Tinning a soldering iron tip means coating the clean, heated tip in a thin, even layer of fresh solder, and
          it&apos;s the single habit that extends a tip&apos;s working life the most. Do it the first time you heat up a new
          tip, any time the tip looks dull or oxidized, and again right before you turn the iron off or put it away
          for storage. A bare tip left exposed to air oxidizes quickly, which both hurts heat transfer and shortens
          the tip&apos;s usable life.
        </>
      }
      aside={{
        image: fx888dx.image,
        alt: "Hakko FX-888DX soldering station with digital temperature control",
        caption: (
          <>
            A stable, accurate temperature, like the Hakko FX-888DX&apos;s digital closed-loop control, makes tinning
            easier and more consistent. See{" "}
            <Link href="/soldering-irons/how-to-tin-a-wire-for-soldering" className={link}>
              how to tin a wire for soldering
            </Link>{" "}
            for the related but different technique of pre-coating a wire end.
          </>
        ),
      }}
      toc={[
        { id: "why", label: "Why tinning matters" },
        { id: "heat", label: "1. Heat the iron to working temperature" },
        { id: "clean", label: "2. Clean the tip" },
        { id: "apply", label: "3. Apply solder to the tip" },
        { id: "check", label: "4. Check the coating" },
        { id: "storage", label: "5. Tin again before storage" },
        { id: "causes", label: "Common problems and fixes" },
        { id: "which-iron", label: "Which iron makes this easier" },
      ]}
      faq={[
        {
          q: "How often should I tin my soldering iron tip?",
          a:
            "Tin a new tip the first time you heat it up, re-tin any time the tip looks dull, dark or won't pick up solder cleanly, and always tin again right before turning the iron off or storing it. Treat re-tinning before storage as a habit, not an occasional chore.",
        },
        {
          q: "What does a properly tinned tip look like?",
          a:
            "Shiny and evenly coated in solder, with no dull or discolored patches. If part of the tip looks dark or dry while the rest is shiny, that section isn't properly tinned and won't transfer heat well.",
        },
        {
          q: "Can I tin a badly oxidized, black tip?",
          a:
            "Often yes, with a dedicated tip-cleaning compound (sometimes called tip tinner or tip activator) that chemically cleans oxidation off before you re-apply solder. If the tip is heavily pitted or damaged rather than just oxidized, cleaning alone may not fully restore it, and replacement is the more reliable fix.",
        },
        {
          q: "Should I use brass wool or a wet sponge to clean the tip?",
          a:
            "Brass wool (sometimes sold as a 'dry' tip cleaner) is gentler on the tip's plating than a wet sponge, since it cleans without the thermal shock of repeatedly cooling a hot tip. A wet sponge works but can shorten tip life faster over time if used aggressively.",
        },
        {
          q: "Why does my tip stop accepting solder even after cleaning?",
          a:
            "This usually means the tip's plating has worn through to the base metal underneath, which no longer tins no matter how clean it is. At that point, cleaning and re-tinning won't fix it, and the tip needs replacing.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/how-to-tin-a-wire-for-soldering",
          title: "How to Tin a Wire for Soldering",
          desc: "The related technique of pre-coating a wire end rather than the iron's own tip.",
        },
        {
          href: "/soldering-irons/hot-air-station-vs-soldering-iron",
          title: "Hot Air Station vs Soldering Iron",
          desc: "What a hot air tool does differently once your iron's tip isn't the limiting factor.",
        },
      ]}
    >
      <section>
        <h2 id="why" className="text-xl font-semibold mb-3">Why tinning matters</h2>
        <p className="text-muted leading-7 mb-4">
          A bare metal tip exposed to air at soldering temperatures oxidizes within seconds, and an oxidized surface
          both conducts heat poorly into your joint and resists picking up fresh solder. A thin solder coating acts
          as a barrier against that oxidation while also giving you a much better thermal bridge between the tip and
          whatever you&apos;re soldering.
        </p>
        <Figure caption={<>A bare, oxidized tip transfers heat poorly; a freshly tinned tip is shiny and conducts heat well.</>}>
          <TipConditionDiagram />
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="heat">Heat the iron to working temperature</StepHeading>
        <p className="text-muted leading-7">
          Bring the iron up to your normal working temperature for the solder you&apos;re using. Too cool and the solder
          won&apos;t flow properly onto the tip; excessively hot accelerates oxidation and shortens tip life, so stick to
          the temperature you&apos;d actually solder at, not the iron&apos;s maximum.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="clean">Clean the tip</StepHeading>
        <p className="text-muted leading-7">
          Wipe the hot tip on brass wool (preferred, gentler on the plating) or a damp sponge to remove old solder,
          flux residue and any dark oxidation. You want bare, clean metal (or the thinnest possible existing coating)
          before you apply fresh solder.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="apply">Apply solder to the tip</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Touch solder directly to the heated tip, not to the workpiece, and let it melt and flow across the entire
          working surface of the tip. Rotate the tip as needed so solder coats all sides, not just the one facing up.
        </p>
        <KeyIdea title="Tin the tip, not just the very point">
          A tip that&apos;s only tinned at the extreme point but bare along its sides won&apos;t transfer heat evenly into a
          joint. Make sure the coating covers the whole working face you actually solder with.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={4} id="check">Check the coating</StepHeading>
        <p className="text-muted leading-7">
          Look for a uniform, shiny, silver coating with no dull or dark patches. If part of the tip still looks
          oxidized, clean that area again and reapply solder specifically there until the whole working surface is
          consistently bright.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="storage">Tin again before storage</StepHeading>
        <p className="text-muted leading-7">
          Right before you turn the iron off or set it in its stand for an extended period, wipe the tip clean and
          apply one more fresh coat of solder, then turn it off without wiping that final coat away. That protective
          layer keeps air off the tip while it&apos;s unused, which is the single biggest factor in how long a tip lasts
          between replacements.
        </p>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Common problems and fixes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "Fix"]}
          rows={[
            ["Solder beads up instead of flowing onto the tip", "Tip is oxidized or too cool", "Clean thoroughly and confirm working temperature"],
            ["Tip looks black and won't tin at all", "Heavy oxidation or worn-through plating", "Try a dedicated tip cleaner/activator; replace if that fails"],
            ["Tip tins fine but oxidizes again within minutes", "Tip left idle at full temperature between joints", "Lower idle temperature or use sleep mode if available"],
            ["New tip won't tin on first use", "Factory coating needs removing first", "Follow the manufacturer's first-use tinning instructions"],
          ]}
        />
      </section>

      <section>
        <h2 id="which-iron" className="text-xl font-semibold mb-3">Which iron makes this easier</h2>
        <p className="text-muted leading-7 mb-6">
          Stable, accurate temperature control helps you tin consistently without overheating the tip. Both of these
          give you a reliable, repeatable working temperature.
        </p>
        <ProductStrip
          title="Irons with reliable temperature control"
          items={[
            {
              name: "Hakko FX-888DX",
              image: fx888dx.image,
              alt: "Hakko FX-888DX soldering station",
              href: "/soldering-irons/best-soldering-iron-for-circuit-board-repair",
              note: "Digital closed-loop control across a 50–480°C range with five saved presets for consistent results.",
            },
            {
              name: "Pinecil V2",
              image: pinecil.image,
              alt: "Pinecil V2 portable USB-C soldering iron",
              href: "/soldering-irons/best-soldering-iron-for-beginners",
              note: "A portable USB-C iron with fast heat-up, good for keeping a consistent tinning temperature on the go.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
