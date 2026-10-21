import Link from "next/link";
import {
  Callout,
  DataTable,
  FlowDiagram,
  HowToShell,
  KeyIdea,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";

const description =
  "How to test a soldering iron before relying on it: a cold continuity check with a multimeter, a visual inspection, then a timed heat-up and solder-melt test.";

export const metadata = buildMetadata({
  title: "How to Test a Soldering Iron",
  description,
  path: "/soldering-irons/how-to-test-a-soldering-iron",
});

const link = "text-accent hover:underline";

export default function HowToTestASolderingIronPage() {
  return (
    <HowToShell
      title="How to Test a Soldering Iron"
      description={description}
      path="/soldering-irons/how-to-test-a-soldering-iron"
      category="soldering-irons"
      published="2026-10-21"
      intro={
        <>
          Whether you&apos;re checking a new iron, a used one bought secondhand, or one you suspect has
          developed a fault, the same three-part test works: a cold electrical check before it&apos;s
          even plugged in, a visual inspection of the cord and tip, and a timed heat-up and solder test
          once powered on. Together they catch most of what actually goes wrong with a soldering iron.
        </>
      }
      toc={[
        { id: "why-test-first", label: "Why test before you rely on it" },
        { id: "cold-continuity-check", label: "1. Cold continuity check (unplugged)" },
        { id: "visual-inspection", label: "2. Visual inspection" },
        { id: "heat-up-test", label: "3. Timed heat-up test" },
        { id: "solder-melt-test", label: "4. Solder-melt test" },
        { id: "interpreting-results", label: "Interpreting the results" },
      ]}
      faq={[
        {
          q: "Is it safe to test continuity on a soldering iron with a multimeter?",
          a: "Yes, as long as the iron is fully unplugged from the wall first. You're measuring resistance through the heating element with the multimeter's own small test current, not mains voltage, so there's no shock risk done this way — never test continuity on a live, plugged-in iron.",
        },
        {
          q: "What resistance reading should a healthy heating element show?",
          a: "It varies by iron and wattage, so there's no single universal number — what matters is that you get a stable, finite resistance reading (typically tens to a few hundred ohms depending on the model) rather than infinite resistance (open circuit, meaning a broken element) or a reading near zero ohms (a short).",
        },
        {
          q: "My iron heats up but the multimeter showed infinite resistance when unplugged — what does that mean?",
          a: "That combination suggests the problem isn't the heating element itself, but something else entirely — recheck your multimeter leads and settings (make sure it's set to resistance/continuity mode, not voltage), since a genuinely open heating element wouldn't heat up at all.",
        },
        {
          q: "How long should a healthy iron take to reach working temperature?",
          a: "It depends heavily on wattage and element type — see our ceramic vs. nichrome heating element comparison — but as a rough guide, many common 60-80W irons reach a usable temperature within 30-60 seconds from cold. A dramatic, sudden slowdown compared to an iron's own past performance is more telling than any single absolute number.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/soldering-iron-not-melting-solder",
          title: "Why Won't My Soldering Iron Melt Solder?",
          desc: "If the iron passes these tests but still won't melt solder reliably, start here.",
        },
        {
          href: "/soldering-irons/ceramic-vs-nichrome-heating-element",
          title: "Ceramic vs Nichrome Heating Elements",
          desc: "What's inside the heating element you're testing, and how each type behaves.",
        },
      ]}
    >
      <Callout title="Always test continuity unplugged">
        Never test a soldering iron&apos;s heating element with a multimeter while it&apos;s plugged in.
        Unplug it fully first — you&apos;re measuring resistance through the element itself, and mains
        voltage present at the same time risks damaging the multimeter or causing a shock.
      </Callout>

      <section>
        <h2 id="why-test-first" className="text-xl font-semibold mb-3">Why test before you rely on it</h2>
        <p className="text-muted leading-7 mb-4">
          A quick test catches problems before they cost you a ruined joint or a damaged board —
          particularly worth doing on a secondhand iron, one that&apos;s been in storage a long time, or
          one you suspect has started failing. The four checks below go from safest and simplest (fully
          unplugged) to most informative (actually soldering with it).
        </p>
        <FlowDiagram
          steps={[
            { label: "Cold continuity", sub: "Unplugged, multimeter on the element" },
            { label: "Visual check", sub: "Cord, plug, tip condition" },
            { label: "Timed heat-up", sub: "Plugged in, watch how fast it heats" },
            { label: "Solder-melt test", sub: "Confirm it actually solders well" },
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="cold-continuity-check">Cold continuity check (always unplugged)</StepHeading>
        <p className="text-muted leading-7">
          With the iron fully unplugged, set a multimeter to resistance (ohms) mode and touch the
          probes across the heating element&apos;s terminals (on a two-part station, this is usually
          accessible at the handpiece connector; on a simple iron, check the manufacturer&apos;s
          documentation for where the element terminals are exposed, if at all). A stable, finite
          reading means the element has continuity; an infinite or &quot;OL&quot; reading points at an
          open, failed element; a reading at or very near zero ohms suggests a short.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="visual-inspection">Visual inspection of cord, plug, and tip</StepHeading>
        <p className="text-muted leading-7">
          Check the power cord along its full length for cracks, fraying, or exposed conductor,
          especially near the plug and near where the cord enters the iron&apos;s handle — flex points
          that see repeated bending. Check the plug for scorch marks or bent/loose prongs. Inspect the
          tip for the signs of genuine wear covered in our{" "}
          <Link href="/soldering-irons/soldering-iron-tip-care" className={link}>
            tip care guide
          </Link>{" "}
          — a worn tip can make a perfectly healthy iron seem faulty.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="heat-up-test">Timed heat-up test</StepHeading>
        <p className="text-muted leading-7">
          Plug the iron in (away from anything flammable, on its stand) and time how long it takes to
          reach a usable soldering temperature, whether that&apos;s shown on a digital display or judged
          by how readily it melts solder. Compare this against the manufacturer&apos;s stated figures, or
          against the iron&apos;s own past performance if you&apos;ve used it before. A healthy element
          heats at a consistent, predictable rate every time.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="solder-melt-test">Solder-melt test</StepHeading>
        <p className="text-muted leading-7">
          Once heated, touch a small amount of solder to the tip. It should melt within a second or two
          and flow smoothly across a clean tip. Slow, reluctant melting on a known-clean, freshly-tinned
          tip — ruling out the common causes in our{" "}
          <Link href="/soldering-irons/soldering-iron-not-melting-solder" className={link}>
            troubleshooting guide
          </Link>{" "}
          — points toward a genuine heat-output problem rather than tip condition or temperature
          setting.
        </p>
      </section>

      <section>
        <h2 id="interpreting-results" className="text-xl font-semibold mb-3">Interpreting the results together</h2>
        <DataTable
          head={["Result pattern", "Likely meaning"]}
          rows={[
            ["Good continuity, heats normally, melts solder fine", "Iron is healthy — safe to rely on"],
            ["Infinite resistance (open), doesn't heat at all", "Heating element has failed — needs repair or replacement"],
            ["Good continuity, but heats very slowly compared to before", "Element may be degrading, or check for a power/voltage supply issue"],
            ["Heats fine, but solder won't melt or wet properly", "Likely a tip condition or temperature-setting issue, not the element — see the not-melting guide"],
          ]}
        />
      </section>

      <KeyIdea title="When to stop and not use the iron">
        A cord with exposed conductor, a scorched or loose plug, or a short detected on the continuity
        check are all reasons to stop and repair or replace the iron before using it again — these are
        safety issues, not just performance ones.
      </KeyIdea>
    </HowToShell>
  );
}
