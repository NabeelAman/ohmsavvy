import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  KeyIdea,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-soldering-irons/page";

const description =
  "How to store a soldering iron safely between uses and for the long term: cool it fully, tin the tip, protect the cord, and keep it somewhere dry and ventilated.";

export const metadata = buildMetadata({
  title: "How to Store a Soldering Iron Safely",
  description,
  path: "/soldering-irons/how-to-store-a-soldering-iron",
});

const qming = picks.find((p) => p.name === "Q-MING 60W Kit")!;

const link = "text-accent hover:underline";

export default function HowToStoreASolderingIronPage() {
  return (
    <HowToShell
      title="How to Store a Soldering Iron Safely"
      description={description}
      path="/soldering-irons/how-to-store-a-soldering-iron"
      category="soldering-irons"
      published="2026-10-21"
      intro={
        <>
          Proper storage protects two things at once: you, from a hot iron left somewhere unsafe, and
          the iron itself, from a tip that oxidises away or a cord that gets damaged in a drawer. The
          routine is quick — a minute or two between sessions, a bit more care for long-term storage —
          and it noticeably extends how long a tip and iron both stay in good working condition.
        </>
      }
      aside={{
        image: qming.image,
        alt: "Q-MING 60W soldering iron kit with stand and tips",
        caption: (
          <>
            A kit that ships with its own stand, like the Q-MING 60W Kit, makes the storage routine
            below effortless. See our{" "}
            <Link href="/soldering-irons/q-ming-60w-soldering-iron-kit-review" className={link}>
              full review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "between-joints", label: "Between joints, during a session" },
        { id: "end-of-session", label: "Shutting down at the end of a session" },
        { id: "long-term-storage", label: "Storing an iron for weeks or months" },
        { id: "traveling-with-an-iron", label: "Traveling or transporting an iron" },
        { id: "what-to-avoid", label: "What to avoid" },
        { id: "quick-reference", label: "Quick reference" },
      ]}
      faq={[
        {
          q: "Is it okay to leave a soldering iron on and unused for a while?",
          a: "Short breaks (a few minutes) are generally fine with the iron back in its stand. For longer gaps — stepping away for an extended period — switching it off is better practice: it saves the tip from continuous oxidation at temperature and is simply safer, since an unattended hot iron is a real fire and burn risk regardless of how briefly you expect to be away.",
        },
        {
          q: "Should I store a soldering iron with solder still on the tip?",
          a: "Yes — a thin, fresh layer of solder left on the tip before storage (tinning it right before shutdown) acts as a barrier against oxidation while it sits unused, and means less cleanup is needed before the next session. This is different from leaving old, dross-covered solder on the tip, which should be cleaned off first.",
        },
        {
          q: "Can I store a soldering iron in its carrying case right after use?",
          a: "Only once it's genuinely cool to the touch. Closing a hot iron into a case, bag, or drawer traps heat against the case material and anything else inside, which is both a fire risk and can damage the case itself. Let it cool fully in open air on its stand first.",
        },
        {
          q: "Does humidity affect a stored soldering iron?",
          a: "It can, over time — a damp storage environment accelerates corrosion on an iron's metal parts, including the tip and any exposed connector contacts on a station handpiece. A dry location is one of the simplest ways to protect an iron you're not using daily.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/soldering-iron-tip-care",
          title: "Soldering Iron Tip Care",
          desc: "The cleaning and tinning routine storage protects between sessions.",
        },
        {
          href: "/soldering-irons/how-to-test-a-soldering-iron",
          title: "How to Test a Soldering Iron",
          desc: "Worth doing after long-term storage, before relying on the iron again.",
        },
      ]}
    >
      <Callout title="A hot iron is a real risk even for a minute">
        Never set a soldering iron down anywhere other than its stand, even briefly — a tip running at
        300-370°C ignites paper, fabric, and many plastics almost instantly, and causes a serious burn on
        contact. This applies during a session just as much as at shutdown.
      </Callout>

      <section>
        <h2 id="between-joints" className="text-xl font-semibold mb-3">Between joints, during a session</h2>
        <p className="text-muted leading-7">
          Always return the iron to its stand when not actively soldering, even for a few seconds
          between joints. A stand holds the tip safely clear of the bench, cables, and anything
          flammable, and it&apos;s the single habit that prevents the most common soldering accidents —
          a hot tip set down on something it shouldn&apos;t touch.
        </p>
      </section>

      <section>
        <h2 id="end-of-session" className="text-xl font-semibold mb-3">Shutting down at the end of a session</h2>
        <p className="text-muted leading-7 mb-4">
          A short routine before switching off protects the tip for next time:
        </p>
        <FlowDiagram
          steps={[
            { label: "Clean the tip", sub: "Wipe on sponge/brass wool" },
            { label: "Re-tin it", sub: "Fresh solder layer as a barrier" },
            { label: "Power off", sub: "Switch off at the station/plug" },
            { label: "Let it cool fully", sub: "In open air, on its stand" },
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="long-term-storage">Storing an iron for weeks or months</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Beyond the end-of-session routine, longer storage benefits from a few extra precautions:
          coil the cord loosely rather than tightly (tight coils stress the cord&apos;s internal
          conductors at the bend points over time), store it somewhere dry to limit corrosion, and avoid
          stacking heavy items on top of a case containing the iron and its stand. If the iron uses
          replaceable tips, leaving the currently-installed tip tinned, as covered above, protects it
          through the storage period too.
        </p>
        <Figure
          caption={
            <>
              A good storage setup: the iron resting tip-up in its stand, the cord coiled in a loose
              loop rather than a tight wrap, well clear of anything stacked on top.
            </>
          }
        >
          <svg viewBox="0 0 300 130" className="w-full h-auto" role="img" aria-label="Diagram of a soldering iron properly stored in a stand with a loosely coiled cord">
            <g className="stroke-foreground" strokeWidth="1.6" fill="none">
              <path d="M70 40 L140 70" strokeLinecap="round" strokeWidth="3" />
              <circle cx="70" cy="40" r="4" className="fill-accent stroke-accent" />
              <path d="M60 95 L100 85 L80 110 Z" />
              <line x1="80" y1="95" x2="80" y2="110" />
            </g>
            <text x="80" y="124" fontSize="9" textAnchor="middle" className="fill-muted">stand</text>
            <path d="M140 70 C 170 90, 150 110, 180 105 C 210 100, 190 75, 215 80" className="fill-none stroke-muted" strokeWidth="2.5" strokeDasharray="1 5" strokeLinecap="round" />
            <text x="185" y="35" fontSize="9" textAnchor="middle" className="fill-foreground">tip held up, clear of bench</text>
            <text x="190" y="120" fontSize="9" textAnchor="middle" className="fill-muted">cord: loose loop, not tight coils</text>
          </svg>
        </Figure>
      </section>

      <section id="traveling-with-an-iron">
        <h2 className="text-xl font-semibold mb-3">Traveling or transporting an iron</h2>
        <p className="text-muted leading-7">
          A portable, USB-C powered iron like the{" "}
          <Link href="/soldering-irons/pinecil-v2-review" className={link}>Pinecil V2</Link>{" "}
          raises a slightly different storage question: there&apos;s no base station to hold the tip
          safely, so a dedicated silicone or metal tip cover (sold separately or sometimes included)
          matters more than it does for a bench iron. A cover protects the tip from knocks in a bag, and
          — just as importantly — keeps anything else in the bag away from a tip that may still be warm
          immediately after use. Let a portable iron cool fully before capping and packing it away,
          exactly as you would with a bench iron&apos;s stand.
        </p>
      </section>

      <section id="what-to-avoid">
        <KeyIdea title="What to avoid">
          <ul className="space-y-1 list-disc pl-5">
            <li>Setting a hot iron down anywhere other than its stand, even for a moment.</li>
            <li>Closing a warm iron into a case or bag before it&apos;s genuinely cool.</li>
            <li>Storing it with a dirty, dross-covered tip rather than a freshly tinned one.</li>
            <li>Coiling the cord very tightly around the iron body for storage, which stresses it at the bend points.</li>
            <li>Leaving it powered on and unattended for extended periods between uses.</li>
          </ul>
        </KeyIdea>
      </section>

      <section>
        <h2 id="quick-reference" className="text-xl font-semibold mb-3">Quick reference</h2>
        <DataTable
          head={["Situation", "What to do"]}
          rows={[
            ["Between joints, same session", "Return to stand; leave powered if the break is short"],
            ["End of session", "Clean tip, re-tin, power off, let cool fully before moving it"],
            ["Storing for weeks or months", "Tinned tip, cord coiled loosely, dry location"],
            ["Stepping away for an extended period mid-session", "Switch off rather than leaving it unattended and hot"],
          ]}
        />
        <p className="mt-4 text-muted leading-7">
          See our{" "}
          <Link href="/soldering-irons/soldering-iron-tip-care" className={link}>
            tip care guide
          </Link>{" "}
          for the full cleaning and tinning process referenced above.
        </p>
      </section>
    </HowToShell>
  );
}
