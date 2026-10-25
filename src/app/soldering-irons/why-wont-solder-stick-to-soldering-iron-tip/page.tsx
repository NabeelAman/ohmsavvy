import Link from "next/link";
import { Callout, DataTable, Figure, FlowDiagram, HowToShell, KeyIdea, ProductStrip, StepHeading } from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-soldering-irons/page";

const description =
  "Solder balls up and rolls off a dull black tip because the tip has oxidised. Here's why it happens, how to re-tin it, and when the tip is beyond saving.";

export const metadata = buildMetadata({
  title: "Why Won't Solder Stick to My Iron Tip?",
  description,
  path: "/soldering-irons/why-wont-solder-stick-to-soldering-iron-tip",
});

const fx888dx = picks.find((p) => p.name === "Hakko FX-888DX")!;
const pinecil = picks.find((p) => p.name === "Pinecil V2")!;
const weller = picks.find((p) => p.name === "Weller WE1010NA")!;

const link = "text-accent hover:underline";

/** Side-by-side tip cross-sections: a wetted tip vs. an oxidised one shedding a solder ball. */
function TipWettingDiagram() {
  return (
    <svg viewBox="0 0 340 170" className="w-full h-auto" role="img" aria-label="A tinned tip with solder spread across it next to an oxidised tip where solder forms a ball and rolls off">
      <g strokeLinejoin="round">
        <path d="M20 40 L120 40 L150 85 L120 130 L20 130 Z" className="fill-[#b9bec4] stroke-foreground" strokeWidth="1.5" />
        <path d="M104 36 L156 85 L104 134" fill="none" stroke="#6b7480" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M104 36 L156 85 L104 134" fill="none" stroke="#f4f6f8" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M190 40 L290 40 L320 85 L290 130 L190 130 Z" className="fill-[#b9bec4] stroke-foreground" strokeWidth="1.5" />
        <path d="M282 42 L318 85 L282 128" fill="none" stroke="#2a2d31" strokeWidth="6" strokeLinecap="round" />
        <circle cx="318" cy="112" r="10" fill="#c0c6cc" stroke="#9aa3ab" strokeWidth="1.5" />
      </g>
      <text x="85" y="158" fontSize="11" textAnchor="middle" className="fill-foreground">Tinned: solder wets and spreads</text>
      <text x="255" y="158" fontSize="11" textAnchor="middle" className="fill-foreground">Oxidised: solder balls and rolls off</text>
    </svg>
  );
}

export default function WhyWontSolderStickToSolderingIronTipPage() {
  return (
    <HowToShell
      title="Why Won't Solder Stick to the Soldering Iron Tip?"
      description={description}
      path="/soldering-irons/why-wont-solder-stick-to-soldering-iron-tip"
      category="soldering-irons"
      published="2026-10-25"
      intro={
        <>
          When solder won&apos;t stick to the soldering iron tip, melting into a bead that rolls off instead
          of coating the end, the tip has almost always oxidised. Solder can only bond to clean metal, and a
          tip that has been left hot and bare grows a dark oxide layer that solder will not wet. The good
          news is that a tip in this state can usually be recovered in a couple of minutes, as long as its
          protective plating is still intact.
        </>
      }
      aside={{
        image: fx888dx.image,
        alt: "Hakko FX-888DX soldering station",
        caption: (
          <>
            A station with adjustable temperature makes it easier to avoid the overheating that kills tips.
            See how the Hakko FX-888DX compares in our{" "}
            <Link href="/soldering-irons/weller-we1010-vs-hakko-fx-888dx" className={link}>
              Weller WE1010 vs. Hakko FX-888DX comparison
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-is-happening", label: "What is happening at the tip" },
        { id: "causes", label: "The usual causes" },
        { id: "step-clean", label: "1. Clean at working temperature" },
        { id: "step-retin", label: "2. Re-tin with flux or tip tinner" },
        { id: "step-protect", label: "3. Keep it tinned from now on" },
        { id: "beyond-saving", label: "When the tip is beyond saving" },
      ]}
      faq={[
        {
          q: "Can I sand or file a soldering iron tip to make solder stick?",
          a: "Not on a standard plated tip. Modern tips have a thin iron plating over a copper core, and filing or sanding removes it. Solder will stick to the bare copper for a while, but copper dissolves into solder quickly, so the tip pits and fails much sooner. Use brass wool and tip tinner instead.",
        },
        {
          q: "Is a black soldering iron tip ruined?",
          a: "Not necessarily. A black tip is oxidised, and if the plating underneath is intact, cleaning on brass wool and re-tinning brings it back. It is only finished when the plating is worn through, which shows as a pit, a hole or a reddish copper colour at the working end.",
        },
        {
          q: "Why does lead-free solder stick to the tip less well than leaded?",
          a: "Lead-free alloys melt at a higher temperature and wet more slowly, and the higher working temperature also speeds up tip oxidation. Keep the tip freshly tinned, use enough flux, and avoid running hotter than the joint needs.",
        },
        {
          q: "Is this the same problem as solder sticking to the tip and not flowing onto the joint?",
          a: "No, that is the opposite situation: the tip wets fine but solder clings to it instead of transferring. It is usually caused by dross build-up or a joint that is not being heated, and it is covered in our separate guide on why solder sticks to the tip.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/soldering-iron-tip-care",
          title: "Soldering Iron Tip Care",
          desc: "How tips age, and the habits that keep one working for years.",
        },
        {
          href: "/soldering-irons/why-solder-sticks-to-tip",
          title: "Why Does Solder Stick to the Tip?",
          desc: "The opposite problem: solder clinging to the tip instead of flowing onto the joint.",
        },
      ]}
    >
      <section id="what-is-happening">
        <h2 className="text-xl font-semibold mb-3">What is happening at the tip</h2>
        <p className="text-muted leading-7 mb-4">
          Solder doesn&apos;t glue itself to a surface; it wets it, forming a metallic bond with clean metal.
          Oxide is not clean metal. Once a layer of it covers the tip, molten solder has nothing to bond
          to, so surface tension pulls it into a ball. The tip may look dull grey, brown or black, and heat
          also stops transferring well, because the thin film of solder that normally carries heat from tip
          to joint is missing.
        </p>
        <Figure caption="A tinned tip (left) carries a thin, shiny coat of solder. An oxidised tip (right) is dark at the working end, and solder balls up on it instead of spreading.">
          <TipWettingDiagram />
        </Figure>
      </section>

      <section id="causes">
        <h2 className="text-xl font-semibold mb-3">The usual causes</h2>
        <DataTable
          head={["Cause", "Why it matters"]}
          rows={[
            ["Left hot without solder on it", "A bare hot tip oxidises within minutes; idle time in the stand is the biggest culprit"],
            ["Temperature set too high", "Oxidation speeds up sharply with heat; many irons are run far hotter than the job needs"],
            ["Stored without a coat of solder", "A tip switched off bare comes out oxidised next time"],
            ["Too little flux", "Flux strips light oxide as you work; solder without flux core, or a dry joint, lets oxide win"],
            ["Wiping on a very wet sponge", "Repeated thermal shock and water can encourage oxide; damp is enough"],
            ["Filed or sanded tip", "Removes the plating, so the copper underneath erodes and stops holding solder"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If solder doesn&apos;t even melt properly when it touches the tip, the cause is more likely heat
          than oxide; work through{" "}
          <Link href="/soldering-irons/soldering-iron-not-melting-solder" className={link}>
            why a soldering iron isn&apos;t melting solder
          </Link>{" "}
          first. If it melts but sits on the joint in beads, see{" "}
          <Link href="/soldering-irons/solder-beading-up-not-flowing" className={link}>
            why solder beads up instead of flowing
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">How to make solder stick again</h2>
        <FlowDiagram
          steps={[
            { label: "Heat", sub: "Normal working temperature" },
            { label: "Brass wool", sub: "Scrub off loose oxide" },
            { label: "Tinner or flux", sub: "Dissolve the rest" },
            { label: "Fresh solder", sub: "Coat the whole working end" },
          ]}
        />
      </section>

      <section id="step-clean">
        <StepHeading n={1}>Clean at working temperature</StepHeading>
        <p className="text-muted leading-7">
          Heat the iron to its usual working temperature, not the maximum. Push the tip into brass wool a
          few times, turning it so every face is scrubbed. Brass wool removes loose oxide and old solder
          without the thermal shock of a sponge and without scratching through the plating. Light oxidation
          sometimes clears at this stage, so try feeding a little flux-core solder onto the tip before going
          further.
        </p>
      </section>

      <section id="step-retin">
        <StepHeading n={2}>Re-tin with flux or tip tinner</StepHeading>
        <p className="text-muted leading-7">
          For a tip that is still dark, use a tip tinner (sometimes sold as a tip activator or refresher): a
          small tin of solder powder mixed with an aggressive flux. Roll the hot tip in it until the working
          end turns bright and silver, then wipe once on the brass wool and immediately add fresh solder. A
          generous dab of rosin flux followed by solder works on milder cases. You may need two or three
          rounds. Tip tinner is more aggressive than ordinary flux, so use it for recovery rather than as a
          routine cleaner.
        </p>
      </section>

      <section id="step-protect">
        <StepHeading n={3}>Keep it tinned from now on</StepHeading>
        <p className="text-muted leading-7">
          The habit that prevents this problem is simple: never let the tip sit hot and bare. Add a little
          solder before the iron goes back in its stand, and leave a blob on the tip when you switch off, so
          the coating, not the tip, takes the oxidation. Use the lowest temperature that makes good joints;
          our{" "}
          <Link href="/soldering-irons/soldering-iron-temperature-by-metal" className={link}>
            soldering temperature guide
          </Link>{" "}
          gives starting points. Stations with a sleep or auto-off function also help, because they drop the
          tip temperature during idle stretches.
        </p>
      </section>

      <Callout title="Tip tinner fumes and burns">
        Tip tinner smokes heavily when the hot tip goes in. Work with ventilation or fume extraction, keep
        your face out of the smoke, and remember the tip is at full temperature while you clean it.
      </Callout>

      <section id="beyond-saving">
        <h2 className="text-xl font-semibold mb-3">When the tip is beyond saving</h2>
        <p className="text-muted leading-7">
          Re-tinning only works while the plating survives. If you see a pit or crater at the working end,
          copper showing through, or the tip has visibly shrunk or changed shape, solder will either refuse
          to wet it or keep eating into it, and no cleaning will fix that. Replacement tips are cheap compared
          with the frustration of fighting a dead one, so swap it, and choose a{" "}
          <Link href="/soldering-irons/soldering-iron-tip-types" className={link}>
            tip shape suited to your work
          </Link>
          .
        </p>
      </section>

      <section>
        <KeyIdea title="In short">
          Solder won&apos;t stick to an oxidised tip. Clean it hot on brass wool, re-tin it with tip tinner or
          flux and fresh solder, and keep it coated whenever it is idle. If the plating is pitted through,
          replace the tip.
        </KeyIdea>
      </section>

      <ProductStrip
        title="Irons with temperature control and easy tip swaps"
        items={[
          { name: fx888dx.name, image: fx888dx.image, alt: "Hakko FX-888DX soldering station", href: "/soldering-irons/weller-we1010-vs-hakko-fx-888dx", note: "Digital station with adjustable temperature and replaceable tips." },
          { name: weller.name, image: weller.image, alt: "Weller WE1010NA soldering station", href: "/soldering-irons/weller-we1010na-review", note: "70W digital station with tight temperature stability." },
          { name: pinecil.name, image: pinecil.image, alt: "Pinecil V2 smart soldering iron", href: "/soldering-irons/pinecil-v2-review", note: "Portable USB-C PD iron that heats up fast." },
        ]}
      />
    </HowToShell>
  );
}
