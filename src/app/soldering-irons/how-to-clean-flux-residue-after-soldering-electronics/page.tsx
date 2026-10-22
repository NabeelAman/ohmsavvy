import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-soldering-irons/page";

const description =
  "How to clean flux residue after soldering electronics: when rosin, no-clean and water-soluble flux need removing, IPA brush technique and white residue fixes.";

export const metadata = buildMetadata({
  title: "Clean Flux Residue After Soldering Electronics",
  description,
  path: "/soldering-irons/how-to-clean-flux-residue-after-soldering-electronics",
});

const weller = picks.find((p) => p.name === "Weller WE1010NA")!;

const link = "text-accent hover:underline";

export default function HowToCleanFluxResidueAfterSolderingElectronicsPage() {
  return (
    <HowToShell
      title="How to Clean Flux Residue After Soldering Electronics"
      description={description}
      path="/soldering-irons/how-to-clean-flux-residue-after-soldering-electronics"
      category="soldering-irons"
      published="2026-10-22"
      intro={
        <>
          The brown, sticky or glassy film left around fresh joints is spent flux. Sometimes it is harmless
          and sometimes it is corrosive, and the difference depends almost entirely on which flux you used.
          Before you decide how to clean flux residue after soldering electronics, identify the flux type,
          because that tells you whether cleaning is mandatory, optional, or best avoided. Then the job is
          mostly technique: the right solvent, a brush to loosen the film, a wipe to carry it away, and
          enough drying time before the board sees power again.
        </>
      }
      aside={{
        image: weller.image,
        alt: "Weller WE1010NA digital soldering station",
        caption: (
          <>
            An ESD-safe bench station suits a workstation where boards are scrubbed and handled often. See
            our{" "}
            <Link href="/soldering-irons/weller-we1010na-review" className={link}>
              Weller WE1010NA review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "flux-types", label: "Rosin, no-clean and water-soluble" },
        { id: "when-to-skip", label: "When leaving no-clean is better" },
        { id: "gather-supplies", label: "1. Gather solvent, brush and wipes" },
        { id: "ipa-strength", label: "Why 99% IPA beats 70%" },
        { id: "scrub-and-wipe", label: "2. Scrub, then wipe while wet" },
        { id: "flush-and-repeat", label: "3. Flush and repeat until clear" },
        { id: "white-residue", label: "4. Deal with white residue" },
        { id: "ultrasonic", label: "Ultrasonic cleaning caveats" },
        { id: "dry-before-power", label: "5. Dry fully before power" },
        { id: "troubleshooting", label: "Troubleshooting" },
      ]}
      faq={[
        {
          q: "Do I have to clean no-clean flux?",
          a: "Usually not. No-clean flux is formulated so that its residue is benign once fully heated, and many manufacturers ship boards with it left on. Clean it when the residue is cosmetically unacceptable, when a conformal coating has to stick, or around high-impedance circuits where any surface film might matter, and clean it completely if you start.",
        },
        {
          q: "Can I use 70% rubbing alcohol to clean flux?",
          a: "It is a poor choice. Rubbing alcohol at 70% is roughly a third water, which dissolves rosin badly, dries slowly and can leave water under components. Use 99% isopropyl alcohol or a purpose-made flux remover instead.",
        },
        {
          q: "Why is there white residue after cleaning with isopropyl alcohol?",
          a: "Usually the alcohol dissolved the flux and then evaporated before the dissolved material was carried away, leaving it behind as a whitish film, or it reacted with flux residues that need a different solvent. Re-wet the area with fresh alcohol and wipe it off while still wet, or use a flux remover designed for that flux chemistry.",
        },
        {
          q: "Is water-soluble flux cleaned with alcohol or water?",
          a: "With water, as its name suggests. Its residues are aggressive and need removing soon after soldering, typically with warm deionised water and a brush, followed by thorough drying. Alcohol alone does not reliably remove it.",
        },
        {
          q: "How long should a board dry after cleaning?",
          a: "Isopropyl alcohol evaporates quickly from open surfaces, but liquid trapped under low-standoff parts, connectors and switches takes longer. Give it time in a warm, well-ventilated spot, or a gentle stream of low-heat air, and treat anything that was flooded or rinsed with water as needing considerably longer before power is applied.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/how-to-prevent-solder-bridges",
          title: "How to Prevent Solder Bridges",
          desc: "Clean boards make hairline bridges much easier to spot.",
        },
        {
          href: "/soldering-irons/how-to-fix-a-cold-solder-joint-on-a-circuit-board",
          title: "Fix a Cold Solder Joint",
          desc: "Inspect each cleaned joint and rework the dull or grainy ones.",
        },
      ]}
    >
      <section>
        <h2 id="flux-types" className="text-xl font-semibold mb-3">Rosin, no-clean and water-soluble flux</h2>
        <p className="text-muted leading-7 mb-4">
          Check the label on your solder reel or flux pen; the flux type is usually printed there. The
          three families behave very differently once soldering is finished.
        </p>
        <DataTable
          head={["Flux type", "Residue", "Cleaning", "Solvent"]}
          rows={[
            ["Rosin, mild (R, RMA)", "Amber, hard when cool", "Recommended, often optional", "IPA or flux remover"],
            ["Rosin, activated (RA)", "Amber, more active", "Should be cleaned", "IPA or flux remover"],
            ["No-clean", "Light, thin film", "Optional; all or nothing", "Matched flux remover"],
            ["Water-soluble (OA)", "Often clear, corrosive", "Required, promptly", "Warm deionised water"],
          ]}
        />
      </section>

      <section id="when-to-skip">
        <KeyIdea title="When leaving no-clean residue is better">
          No-clean residue is designed to stay put in a stable state. Wiping it half-heartedly with a little
          alcohol can dissolve part of it and spread the rest as a thin, tacky layer that still contains
          active ingredients and collects dust. If a no-clean joint looks acceptable and the circuit is not
          sensitive, leave it. If you do clean, use enough solvent to remove all of it.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={1} id="gather-supplies">Gather solvent, brush and wipes</StepHeading>
        <p className="text-muted leading-7">
          For rosin and most no-clean residue you need 99% isopropyl alcohol in a pump dispenser or a
          dedicated flux remover spray, an ESD-safe brush with fairly stiff bristles, and lint-free wipes.
          Cotton swabs work in a pinch but shed fibres that catch on pins. Disconnect power and remove any
          battery first; you should never clean a board that is energised.
        </p>
      </section>

      <section>
        <h2 id="ipa-strength" className="text-xl font-semibold mb-3">Why 99% IPA beats 70%</h2>
        <p className="text-muted leading-7 mb-4">
          Isopropyl alcohol is sold at several strengths. The remainder is water, and water does nothing to
          dissolve rosin while slowing drying and lingering under parts.
        </p>
        <Figure
          caption={
            <>
              Approximate water content of common isopropyl alcohol strengths, by volume. The 99% grade
              dissolves rosin well and evaporates fastest.
            </>
          }
        >
          <BarChart
            items={[
              { label: "99% IPA", value: 1, display: "~1% water", highlight: true },
              { label: "91% IPA", value: 9, display: "~9% water" },
              { label: "70% rubbing alcohol", value: 30, display: "~30% water" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={2} id="scrub-and-wipe">Scrub, then wipe while the solvent is wet</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Hold the board tilted so liquid runs off one edge. Wet a small area, scrub it with short strokes
          to break up the residue, and then immediately draw a lint-free wipe across it in one direction,
          toward the low edge. The point is to lift the dissolved flux away while it is still in solution;
          if the alcohol evaporates first, the residue just settles back down elsewhere.
        </p>
        <Figure
          caption={
            <>
              The brush-and-wipe technique. The board is tilted, the brush loosens residue around the joints,
              and the wipe follows straight away in one direction, carrying dissolved flux off the low edge
              instead of spreading it.
            </>
          }
        >
          <svg viewBox="0 0 320 170" className="w-full h-auto" role="img" aria-label="Diagram of a tilted circuit board being cleaned: a brush scrubs flux residue around solder joints, then a wipe moves in one direction toward the lower edge where dissolved flux runs off">
            <g transform="rotate(-8 160 95)">
              <rect x="30" y="60" width="260" height="70" rx="4" className="fill-accent/20 stroke-foreground" strokeWidth="1.2" />
              {[70, 110, 150, 190, 230].map((x) => (
                <g key={x}>
                  <circle cx={x} cy="95" r="6" className="fill-muted/60 stroke-foreground" strokeWidth="0.8" />
                  <circle cx={x} cy="95" r="11" className={x < 150 ? "fill-accent/30" : "fill-none"} />
                </g>
              ))}
              <rect x="88" y="34" width="40" height="22" rx="3" className="fill-surface stroke-foreground" strokeWidth="1.2" />
              <rect x="128" y="40" width="40" height="10" rx="2" className="fill-muted/40 stroke-foreground" strokeWidth="1" />
              {[92, 99, 106, 113, 120].map((x) => (
                <line key={x} x1={x} y1="56" x2={x} y2="66" className="stroke-foreground" strokeWidth="1.2" />
              ))}
              <rect x="190" y="72" width="44" height="46" rx="3" className="fill-surface stroke-accent" strokeWidth="1.4" strokeDasharray="4 2" />
              <line x1="200" y1="140" x2="280" y2="140" className="stroke-accent" strokeWidth="1.6" />
              <path d="M280 140 L272 136 L272 144 Z" className="fill-accent" />
            </g>
            <text x="108" y="22" fontSize="10" textAnchor="middle" className="fill-foreground">1. brush loosens</text>
            <text x="230" y="58" fontSize="10" textAnchor="middle" className="fill-accent">2. wipe follows</text>
            <text x="245" y="160" fontSize="9" textAnchor="middle" className="fill-muted">one direction, toward low edge</text>
            <text x="60" y="160" fontSize="9" textAnchor="middle" className="fill-muted">shaded rings: residue</text>
          </svg>
        </Figure>
      </section>

      <section>
        <StepHeading n={3} id="flush-and-repeat">Flush and repeat until clear</StepHeading>
        <p className="text-muted leading-7">
          Use a fresh area of wipe each pass and work across the board in small sections rather than flooding
          the whole thing at once. Finish with a final rinse of clean solvent over the area, wiped off while
          wet. Under magnification, a properly cleaned joint is bright with no amber edge or tacky feel. Our
          guide to{" "}
          <Link href="/soldering-irons/how-to-prevent-solder-bridges" className={link}>
            preventing solder bridges
          </Link>{" "}
          explains why that final inspection is easier on a clean board.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="white-residue">Deal with white residue</StepHeading>
        <p className="text-muted leading-7">
          A chalky white haze after cleaning is common. Most often the alcohol dissolved the flux and then
          evaporated before being wiped off, leaving the dissolved material spread thinly; re-wet the area,
          scrub briefly, and wipe while still wet. If the haze returns, the residue probably needs a solvent
          matched to that flux, so switch to a flux remover formulated for it. Water-soluble flux that was
          never rinsed with water can also leave white deposits.
        </p>
      </section>

      <section>
        <h2 id="ultrasonic" className="text-xl font-semibold mb-3">Ultrasonic cleaning caveats</h2>
        <p className="text-muted leading-7 mb-4">
          An ultrasonic tank cleans under parts that a brush cannot reach, but the vibration and immersion do
          not suit every component. Remove or avoid boards that carry any of these:
        </p>
        <DataTable
          head={["Component", "Risk"]}
          rows={[
            ["Quartz crystals and oscillators", "Ultrasonic energy can damage the resonator"],
            ["MEMS microphones and sensors", "Tiny moving structures can be damaged"],
            ["Buzzers and speakers", "Liquid enters the open acoustic chamber"],
            ["Unsealed switches, pots, relays", "Solvent washes out lubricant or gets trapped"],
            ["Displays and batteries", "Liquid ingress; never immerse a battery"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={5} id="dry-before-power">Dry fully before power</StepHeading>
        <p className="text-muted leading-7">
          Shake or blow off excess liquid, then leave the board in a warm, ventilated place until every
          trace of solvent has gone, paying attention to connectors, switches and parts with almost no gap
          underneath. Gentle low-heat air speeds this up. A board rinsed with water needs considerably longer
          than one cleaned with alcohol. Only then reconnect the battery or supply.
        </p>
      </section>

      <section>
        <h2 id="troubleshooting" className="text-xl font-semibold mb-3">Troubleshooting</h2>
        <DataTable
          head={["Symptom", "Likely cause", "Fix"]}
          rows={[
            ["White haze after IPA", "Solvent evaporated before wiping", "Re-wet and wipe wet; or use flux remover"],
            ["Board feels tacky", "No-clean residue partly dissolved", "Clean fully with matched remover"],
            ["Residue reappears under parts", "Flux trapped beneath and seeping out", "Flush from the edges, more solvent"],
            ["Green or white crust on joints", "Corrosive flux left uncleaned", "Clean thoroughly; reflow damaged joints"],
            ["Lint stuck to pins", "Cotton swabs or paper towel", "Brush off; switch to lint-free wipes"],
            ["Circuit misbehaves after cleaning", "Liquid still trapped under parts", "Dry longer before power"],
          ]}
        />
      </section>

      <Callout title="Safety: alcohol is flammable">
        Isopropyl alcohol and most flux remover sprays are flammable. Let the iron cool or park it well away
        before you start, never spray near a hot tip, and work with good ventilation. Wear nitrile gloves to
        keep solvent off your skin, and keep containers closed when not in use.
      </Callout>
    </HowToShell>
  );
}
