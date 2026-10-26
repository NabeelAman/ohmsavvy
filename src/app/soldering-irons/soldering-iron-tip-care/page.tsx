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
  "How to clean, tin, and maintain a soldering iron tip, and the clear signs that tell you it's time to replace one instead of cleaning it again.";

export const metadata = buildMetadata({
  title: "Soldering Iron Tip Care",
  description,
  path: "/soldering-irons/soldering-iron-tip-care",
});

const hakko = picks.find((p) => p.name === "Hakko FX-888DX")!;
const weller = picks.find((p) => p.name === "Weller WE1010NA")!;
const pinecil = picks.find((p) => p.name === "Pinecil V2")!;

const link = "text-accent hover:underline";

export default function SolderingIronTipCarePage() {
  return (
    <HowToShell
      title="Soldering Iron Tip Care: Cleaning, Tinning, and Replacing"
      description={description}
      path="/soldering-irons/soldering-iron-tip-care"
      category="soldering-irons"
      published="2026-10-21"
      intro={
        <>
          Nearly every tip that looks &quot;dead&quot; — black, pitted, or refusing to melt solder —
          is actually just oxidised, not worn out, and a few minutes of proper cleaning brings it back.
          This guide covers the daily cleaning routine, how plated tips differ from older copper tips,
          and the specific signs that mean a tip really has reached the end of its life.
        </>
      }
      aside={{
        image: weller.image,
        alt: "Weller WE1010NA soldering station with ESD-safe iron",
        caption: (
          <>
            Good tip care matters more on ESD-safe stations like the Weller WE1010NA, where a worn tip
            affects both heat transfer and temperature accuracy. See our{" "}
            <Link href="/soldering-irons/weller-we1010na-review" className={link}>
              full review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "why-tips-fail", label: "Why tips look “dead”" },
        { id: "tip-lifecycle", label: "A tip's life cycle, stage by stage" },
        { id: "plated-vs-copper", label: "Plated tips vs. bare copper tips" },
        { id: "daily-cleaning", label: "Daily cleaning routine" },
        { id: "sponge-vs-brass", label: "Wet sponge vs. brass wool" },
        { id: "end-of-session", label: "Tinning before you put the iron away" },
        { id: "when-to-replace", label: "When to replace a tip" },
        { id: "realistic-lifespan", label: "How long should a tip actually last?" },
        { id: "what-not-to-do", label: "What never to do to a tip" },
      ]}
      faq={[
        {
          q: "Can I file or sand a soldering iron tip to clean it?",
          a: "Not on a modern plated tip. Nearly all tips sold today have an iron-plated working surface a fraction of a millimeter thick, designed to resist the solder's dissolving effect on copper. Filing or sanding cuts straight through that plating to the base metal, which then wears away quickly. Filing is only appropriate on old-style solid, unplated copper tips, which are rare on current irons.",
        },
        {
          q: "How often should I clean the tip while soldering?",
          a: "Wipe it on a damp sponge or brass wool before most joints where you notice a dull, oxidised film building up — not necessarily every single joint on light, clean work, but often enough that the tip stays shiny. A tip that sits idle at temperature for minutes between joints oxidises faster, so clean and re-tin it before picking up the iron again.",
        },
        {
          q: "Why does my tip turn black soon after cleaning it?",
          a: "Oxidation happens continuously at soldering temperatures — the tip is reacting with oxygen in the air, and the rate increases with temperature and with time spent uncovered in air rather than coated in solder. Running the iron hotter than the job needs, or leaving it on when not in use, both speed this up. A thin solder coating left on the tip (tinning) slows oxidation between joints.",
        },
        {
          q: "Does tip shape affect how it wears?",
          a: "Yes — a fine conical tip concentrates heat into a tiny area and tends to oxidise and wear at that point faster than a broader chisel tip used on the same joints, simply because less metal surface is doing the work. Match tip shape to the job (fine point for dense SMD work, chisel for larger through-hole joints) rather than using the finest tip for everything.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/how-to-use-a-soldering-iron",
          title: "How to Use a Soldering Iron",
          desc: "The full step-by-step process, from tinning to inspecting the joint.",
        },
        {
          href: "/soldering-irons/soldering-iron-not-melting-solder",
          title: "Why Won't My Soldering Iron Melt Solder?",
          desc: "A dirty or oxidised tip is one of the most common causes — here's how to rule it out.",
        },
      ]}
    >
      <Callout title="Tips run hot — handle cleaning tools carefully">
        Brass wool and sponges sit right next to a tip running at 300–370°C. Keep the sponge
        genuinely damp (not soaking, which thermally shocks the tip) and keep both well clear of
        loose clothing, cables, and anything flammable on the bench.
      </Callout>

      <section>
        <h2 id="why-tips-fail" className="text-xl font-semibold mb-3">Why a tip looks &quot;dead&quot; long before it actually is</h2>
        <p className="text-muted leading-7">
          At soldering temperatures, a bare metal tip oxidises within seconds of exposure to air. That
          oxide layer is what turns the tip black or gray and stops solder from wetting it — the metal
          underneath is usually still fine. This is why a tip that refuses to melt solder one minute can
          work perfectly again a minute later, right after a proper clean and re-tin. Genuine
          end-of-life wear (the plating eroded through) looks different and is covered further down.
        </p>
      </section>

      <section>
        <h2 id="tip-lifecycle" className="text-xl font-semibold mb-3">A tip&apos;s life cycle, stage by stage</h2>
        <p className="text-muted leading-7 mb-4">
          Every tip cycles through the same stages repeatedly over its working life. Seeing them laid
          out end to end makes it obvious where the daily cleaning routine actually intervenes, and
          where genuine wear sits apart from it.
        </p>
        <Figure
          caption={
            <>
              The first four stages repeat constantly through a tip&apos;s working life — cleaning resets
              it back to tinned. Only the fifth stage, genuine plating wear, is one-way and means
              replacement.
            </>
          }
        >
          <FlowDiagram
            steps={[
              { label: "Fresh/tinned", sub: "Shiny, solder-wetted surface" },
              { label: "In use", sub: "Transfers heat into joints" },
              { label: "Oxidising", sub: "Film builds up between joints" },
              { label: "Cleaned & re-tinned", sub: "Back to stage one" },
              { label: "Worn out", sub: "Plating gone — replace it" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="plated-vs-copper" className="text-xl font-semibold mb-3">Plated tips vs. bare copper tips</h2>
        <p className="text-muted leading-7 mb-4">
          Copper conducts heat and alloys readily with solder — which is exactly the problem for a
          soldering tip. Molten solder slowly dissolves bare copper, eroding it with use. Modern tips
          solve this with a thin iron (sometimes nickel) plating over a copper core: the plating resists
          the solder&apos;s dissolving action while the copper core still carries the heat efficiently. The
          plating is what you must never remove.
        </p>
        <Figure
          caption={
            <>
              Cross-section of a modern soldering tip: a copper core for heat conduction, a thin iron
              plating layer that resists dissolving into molten solder, with only the very working end
              exposed to the joint.
            </>
          }
        >
          <svg viewBox="0 0 320 140" className="w-full h-auto" role="img" aria-label="Cross-section diagram of a plated soldering iron tip">
            <g className="stroke-border" strokeWidth="1" fill="none">
              <rect x="20" y="40" width="220" height="60" />
            </g>
            <rect x="20" y="40" width="220" height="60" className="fill-[#b5733f]" opacity="0.35" />
            <rect x="20" y="40" width="220" height="60" className="fill-none stroke-foreground" strokeWidth="1.5" />
            <rect x="20" y="36" width="220" height="6" className="fill-muted" opacity="0.6" />
            <rect x="20" y="98" width="220" height="6" className="fill-muted" opacity="0.6" />
            <path d="M240 40 L290 68 L240 100 Z" className="fill-[#b5733f]" opacity="0.35" stroke="currentColor" strokeWidth="1.5" />
            <path d="M240 36 L296 68 L240 104" className="fill-none stroke-muted" strokeWidth="4" opacity="0.6" />
            <g fontSize="11" className="fill-foreground">
              <text x="130" y="75" textAnchor="middle">Copper core</text>
              <text x="130" y="20" textAnchor="middle" className="fill-muted" fontSize="10">Iron plating (≈ 0.2–0.5 mm)</text>
              <text x="285" y="72" textAnchor="start" className="fill-accent" fontSize="10">exposed working tip</text>
            </g>
          </svg>
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="daily-cleaning">Clean the tip before every joint that needs it</StepHeading>
        <p className="text-muted leading-7">
          Wipe the hot tip on a damp sponge or through brass wool immediately before soldering,
          whenever you see a dull or dark film forming. This removes built-up oxide and old flux
          residue in a second or two, restoring the shiny, solder-wetted surface that actually transfers
          heat well.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="sponge-vs-brass">Choose a wet sponge or brass (tip tinner) wool</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Both clean the tip; they trade off differently, and many soldering stations and kits —
          including the Hakko FX888D and the Q-MING 60W Kit — ship with one or both.
        </p>
        <DataTable
          head={["Method", "How it works", "Trade-off"]}
          rows={[
            ["Damp cellulose sponge", "Thermal shock knocks oxide/flux off on contact", "Repeated quenching cools the tip each wipe, and can be rougher on a worn tip over time"],
            ["Brass wool / tip tinner", "Mechanical scouring strips oxide without wetting the tip", "No thermal shock, generally gentler for daily use; doesn't need water refilled"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={3} id="end-of-session">Tin the tip before putting the iron away</StepHeading>
        <p className="text-muted leading-7">
          Right before switching off or returning the iron to its stand for a longer break, melt a
          fresh, even layer of solder onto the clean tip and leave it coated rather than wiped bare.
          That solder layer is a barrier against oxygen while the tip cools and sits idle, and it means
          you start the next session with far less cleanup.
        </p>
      </section>

      <section>
        <h2 id="when-to-replace" className="text-xl font-semibold mb-3">When cleaning stops being enough</h2>
        <p className="text-muted leading-7 mb-4">
          A tip that won&apos;t take solder even right after a thorough clean and re-tin has gone past
          oxidation into genuine wear. The signs below mean replacement, not more cleaning:
        </p>
        <DataTable
          head={["Sign", "What's actually happening"]}
          rows={[
            ["Pitting or craters in the tip surface", "Plating has worn through in spots; the exposed copper is dissolving into the solder"],
            ["Tip won't tin even after a thorough clean", "Plating is compromised across the working surface, not just oxidised"],
            ["Visible deformation or a bent/mushroomed point", "Physical damage, usually from excess pressure or dropping the iron"],
            ["Noticeably slower heat-up or poor heat transfer despite cleaning", "Internal plating breakdown reducing thermal contact, separate from surface oxide"],
          ]}
        />
        <p className="mt-4 text-muted leading-7">
          Replacement tips are inexpensive relative to the iron itself, and a worn tip genuinely limits
          joint quality no matter how good your technique is — it&apos;s one of the few consumable parts
          worth replacing proactively rather than running to total failure.
        </p>
      </section>

      <section id="realistic-lifespan">
        <KeyIdea title="How long should a tip actually last?">
          There&apos;s no fixed number of hours or joints, because cleaning habits matter more than raw
          usage time — a tip cleaned and re-tinned consistently, as covered above, can stay serviceable
          for many months of regular hobby use. The same tip left dirty, run hotter than it needs to be,
          or stored uncleaned between long gaps can wear out far sooner, since oxidation and plating
          wear both accelerate with unnecessary heat and neglected cleaning rather than with calendar
          time alone.
        </KeyIdea>
      </section>

      <section id="what-not-to-do">
        <KeyIdea title="What never to do to a tip">
          <ul className="space-y-1 list-disc pl-5">
            <li>Don&apos;t file, sand, or scrape a plated tip — that removes the protective plating permanently.</li>
            <li>Don&apos;t run the iron at the top of its temperature range for routine work — excess heat accelerates oxidation and plating wear for no benefit on most joints.</li>
            <li>Don&apos;t leave the iron on, unused, at temperature for long stretches — oxidation continues the whole time it&apos;s hot.</li>
            <li>Don&apos;t force a cold, dirty tip to melt solder by pressing harder — clean and re-tin it instead.</li>
          </ul>
        </KeyIdea>
      </section>

      <section>
        <h2 id="irons-with-good-tip-systems" className="text-xl font-semibold mb-3">Irons with easy tip maintenance</h2>
        <p className="text-muted leading-7">
          Stations with a dedicated stand and sponge or brass wool built in make this routine
          effortless. The{" "}
          <Link href="/soldering-irons/weller-we1010na-review" className={link}>Weller WE1010NA</Link>{" "}
          ships with a proper stand and widely available genuine replacement tips, and the{" "}
          <Link href="/soldering-irons/weller-we1010-vs-hakko-fx-888dx" className={link}>Hakko FX-888DX</Link>{" "}
          takes the same genuine T18 tips as the FX888D. A portable iron
          like the{" "}
          <Link href="/soldering-irons/pinecil-v2-review" className={link}>Pinecil V2</Link>{" "}
          needs a separate stand and cleaning tool, since it&apos;s designed to travel light rather than
          bundle a full station.
        </p>
        <div className="mt-6">
          <ProductStrip
            title="Stations with proper tip-care accessories"
            items={[
              {
                name: "Hakko FX-888DX",
                image: hakko.image,
                alt: "Hakko FX-888DX soldering station",
                href: "/soldering-irons/weller-we1010-vs-hakko-fx-888dx",
                note: "Keeps the FX-8801 handpiece and T18 tips of the FX-888D, so the genuine tip range carries over.",
              },
              {
                name: "Weller WE1010NA",
                image: weller.image,
                alt: "Weller WE1010NA ESD-safe soldering station",
                href: "/soldering-irons/weller-we1010na-review",
                note: "ESD-safe station built for sustained daily bench use.",
              },
              {
                name: "Pinecil V2",
                image: pinecil.image,
                alt: "Pinecil V2 portable USB-C powered soldering iron",
                href: "/soldering-irons/pinecil-v2-review",
                note: "Pocket-sized — pair with a separate stand and cleaner.",
              },
            ]}
          />
        </div>
      </section>
    </HowToShell>
  );
}
