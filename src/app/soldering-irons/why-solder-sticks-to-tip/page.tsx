import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";

const description =
  "Why solder sticks, blobs, or clumps on a soldering iron tip instead of flowing into the joint, and how dross, excess solder, and oxidation each cause it differently.";

export const metadata = buildMetadata({
  title: "Why Does Solder Stick to the Tip?",
  description,
  path: "/soldering-irons/why-solder-sticks-to-tip",
});

const link = "text-accent hover:underline";

export default function WhySolderSticksToTipPage() {
  return (
    <HowToShell
      title="Why Does Solder Stick to the Soldering Iron Tip?"
      description={description}
      path="/soldering-irons/why-solder-sticks-to-tip"
      category="soldering-irons"
      published="2026-10-21"
      intro={
        <>
          This is almost the opposite complaint to solder not melting at all: here, solder melts fine
          but clings to the tip in a blob instead of flowing cleanly onto the joint. The usual causes
          are leftover dross (burnt, de-alloyed solder residue), simple excess solder with nowhere to
          go, or a tip that&apos;s partially oxidised in a way that still lets it melt solder but won&apos;t
          let that solder release and wet a clean joint properly.
        </>
      }
      toc={[
        { id: "sticking-vs-not-melting", label: "Sticking vs. not melting — different problems" },
        { id: "what-is-dross", label: "What dross actually is" },
        { id: "clean-the-tip", label: "1. Clean off dross and old solder" },
        { id: "reduce-solder-feed", label: "2. Feed less solder at a time" },
        { id: "re-tin-properly", label: "3. Re-tin with fresh solder" },
        { id: "check-the-joint", label: "4. Confirm the joint itself is clean" },
        { id: "quick-reference", label: "Quick reference" },
      ]}
      faq={[
        {
          q: "Is dross the same thing as flux residue?",
          a: "No, they're different byproducts. Flux residue is the spent, usually brown or amber film left after flux does its job cleaning the joint — generally harmless and often left in place. Dross is the solder alloy itself after its tin has oxidised out through repeated heating, leaving a dull, grey, grainy mass that no longer wets properly and should be wiped away.",
        },
        {
          q: "Why does solder stick to the tip only on some joints, not others?",
          a: "This usually points at the joint itself, not the tip. A joint that's dirty, oxidised, or has old flux residue on it won't accept solder well even from a perfectly clean tip, so the solder tends to stay on the tip instead of transferring. Clean the joint's surface — not just the tip — before soldering it.",
        },
        {
          q: "Does flux help solder release from the tip?",
          a: "Indirectly, yes. Flux's main job is cleaning oxides off the metal being joined so solder can wet it, and a joint that wets well pulls solder off the tip naturally during soldering. Adding a touch of extra flux to a stubborn joint, rather than more solder, is often the actual fix when solder keeps balling up on the tip.",
        },
        {
          q: "Can I use anything other than a sponge or brass wool to remove dross?",
          a: "A dedicated tip-tinner/cleaner (a small tin of solid flux-and-solder compound you wipe the hot tip into) works well specifically for dross and stubborn buildup that a simple wipe doesn't fully clear. Avoid abrasive tools like sandpaper or files on a plated tip, covered in our tip care guide.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/soldering-iron-tip-care",
          title: "Soldering Iron Tip Care",
          desc: "The full cleaning and tinning routine that prevents dross buildup in the first place.",
        },
        {
          href: "/soldering-irons/soldering-iron-not-melting-solder",
          title: "Why Won't My Soldering Iron Melt Solder?",
          desc: "The opposite problem — solder not melting at all — and its usual causes.",
        },
      ]}
    >
      <section>
        <h2 id="sticking-vs-not-melting" className="text-xl font-semibold mb-3">A different problem from solder not melting</h2>
        <p className="text-muted leading-7">
          It&apos;s worth separating this from a tip that won&apos;t melt solder at all, which is almost
          always a temperature or oxidation problem covered in our{" "}
          <Link href="/soldering-irons/soldering-iron-not-melting-solder" className={link}>
            not-melting troubleshooting guide
          </Link>
          . Here, the solder clearly melts — it just won&apos;t leave the tip and flow onto the joint the
          way it should, which points at a different set of causes.
        </p>
      </section>

      <section>
        <h2 id="what-is-dross" className="text-xl font-semibold mb-3">What dross actually is</h2>
        <p className="text-muted leading-7 mb-4">
          Every time solder is heated, a small amount of its tin content oxidises. Do that repeatedly
          to the same bit of solder sitting on a tip — reheating old solder instead of feeding fresh
          solder for each joint — and the tin content keeps thinning out, leaving a duller, less fluid
          residue behind: dross. Dross doesn&apos;t wet a joint properly no matter how long it&apos;s
          heated, and it tends to sit on the tip as a stubborn blob rather than transferring.
        </p>
        <Figure
          caption={
            <>
              Fresh solder (left) is shiny, fluid, and wets a clean joint readily. Dross (right) is the
              same alloy after repeated reheating has oxidised out much of its tin — dull, grainy, and
              resistant to flowing onto a joint.
            </>
          }
        >
          <svg viewBox="0 0 300 120" className="w-full h-auto" role="img" aria-label="Comparison of fresh solder versus oxidised dross on a tip">
            <circle cx="70" cy="60" r="34" className="fill-accent/70 stroke-accent" strokeWidth="2" />
            <circle cx="60" cy="48" r="8" className="fill-white" opacity="0.5" />
            <text x="70" y="108" fontSize="11" textAnchor="middle" className="fill-foreground">Fresh solder</text>
            <circle cx="230" cy="60" r="34" className="fill-muted/50 stroke-muted" strokeWidth="2" />
            {[
              [214, 42], [226, 38], [240, 45], [250, 55], [252, 68], [244, 78],
              [232, 82], [218, 76], [210, 62], [220, 54], [238, 60], [228, 70],
              [246, 44], [216, 70],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="2" className="fill-foreground" opacity="0.3" />
            ))}
            <text x="230" y="108" fontSize="11" textAnchor="middle" className="fill-foreground">Dross (oxidised)</text>
          </svg>
        </Figure>
      </section>

      <Callout title="Don't keep reheating the same blob of solder">
        If solder is sticking to the tip, the instinct to keep pressing it against the joint and
        reheating doesn&apos;t fix it — it makes it worse, oxidising that solder further into more dross.
        Wipe it off and start with fresh solder instead.
      </Callout>

      <section>
        <StepHeading n={1} id="clean-the-tip">Clean off dross and old solder first</StepHeading>
        <p className="text-muted leading-7">
          Wipe the hot tip on a damp sponge or brass wool to remove the stuck solder and any dross
          along with it. This is the same routine covered in our{" "}
          <Link href="/soldering-irons/soldering-iron-tip-care" className={link}>
            tip care guide
          </Link>
          , and it&apos;s the first thing to try whenever solder is clinging to the tip rather than
          flowing properly.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="reduce-solder-feed">Feed less solder at a time</StepHeading>
        <p className="text-muted leading-7">
          Excess solder sitting on the tip with nowhere to go is a simple, common cause on its own —
          feed a smaller amount per joint, letting the joint itself pull solder in by capillary action
          rather than loading the tip up first and trying to transfer a large blob all at once.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="re-tin-properly">Re-tin with fresh solder</StepHeading>
        <p className="text-muted leading-7">
          After cleaning, melt a small amount of fresh solder directly onto the tip so it&apos;s evenly
          coated again before the next joint. A freshly tinned tip releases solder into a joint far more
          readily than one still carrying old, partially oxidised solder from several joints back.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="check-the-joint">Confirm the joint itself is clean</StepHeading>
        <p className="text-muted leading-7">
          If solder keeps sticking to the tip on one specific joint even with a freshly cleaned, freshly
          tinned tip, check the joint&apos;s own surface. An oxidised, painted, or greasy surface won&apos;t
          wet solder either, and solder with nowhere to wet onto tends to stay where you put it — on the
          tip.
        </p>
      </section>

      <section>
        <h2 id="quick-reference" className="text-xl font-semibold mb-3">Quick reference</h2>
        <DataTable
          head={["Symptom", "Likely cause", "Fix"]}
          rows={[
            ["Dull, grey residue won't release from tip", "Dross from repeatedly reheated solder", "Clean, wipe off, re-tin with fresh solder"],
            ["Solder balls up rather than flowing to the joint", "Too much solder fed at once", "Feed less solder per joint; let the joint draw it in"],
            ["Solder sticks on one specific joint only", "That joint's surface is dirty or oxidised", "Clean the joint itself, add flux if needed"],
            ["Tip stays coated even right after cleaning", "Tip genuinely worn, plating compromised", "See the tip care guide's replacement signs"],
          ]}
        />
      </section>

      <KeyIdea title="The core idea">
        Solder wants to wet whichever clean, hot metal surface it can bond to best. If the joint is
        cleaner and hotter than the tip&apos;s own surface, solder flows onto the joint. If the tip is
        carrying dross or the joint isn&apos;t properly prepped, solder has less reason to leave the tip —
        the fix is almost always to clean one side or the other, not to apply more heat or more solder.
      </KeyIdea>
    </HowToShell>
  );
}
