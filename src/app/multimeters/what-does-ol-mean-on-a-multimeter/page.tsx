import Link from "next/link";
import {
  Callout,
  Figure,
  HowToShell,
  InfoCards,
  KeyIdea,
  MeterReadout,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "OL on a multimeter means overload or open circuit, depending on the mode — resistance reads OL for open, voltage and current read OL for out-of-range.";

export const metadata = buildMetadata({
  title: "What Does OL Mean on a Multimeter?",
  description,
  path: "/multimeters/what-does-ol-mean-on-a-multimeter",
});

const kaiweets = picks.find((p) => p.name === "KAIWEETS KM200s")!;

const link = "text-accent hover:underline";

export default function WhatDoesOlMeanOnAMultimeterPage() {
  return (
    <HowToShell
      title="What Does OL Mean on a Multimeter?"
      description={description}
      path="/multimeters/what-does-ol-mean-on-a-multimeter"
      category="multimeters"
      published="2026-10-21"
      intro={
        <>
          &quot;OL&quot; (sometimes shown as &quot;1&quot; or &quot;OPEN&quot; on older or simpler
          displays) means the meter can&apos;t represent the current measurement on the selected range
          or function. What it actually implies about your circuit, though, depends entirely on which
          mode the dial is set to — the same letters mean something quite different in resistance mode
          than they do in voltage mode.
        </>
      }
      aside={{
        image: kaiweets.image,
        alt: "KAIWEETS KM200s digital multimeter",
        caption: (
          <>
            Any auto-ranging meter reduces how often you&apos;ll see OL from a simple range mismatch.
            See our{" "}
            <Link href="/multimeters/kaiweets-km200s-review" className={link}>
              KAIWEETS KM200s review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-ol-looks-like", label: "What OL actually looks like on screen" },
        { id: "it-depends-on-mode", label: "OL means different things in different modes" },
        { id: "resistance-and-continuity", label: "OL in resistance and continuity mode" },
        { id: "continuity-beep-mode", label: "Does continuity (beep) mode show OL too?" },
        { id: "diode-mode", label: "OL in diode mode" },
        { id: "voltage-and-current", label: "OL in voltage and current mode" },
        { id: "quick-reference", label: "Quick reference" },
        { id: "when-its-actually-a-fault", label: "When OL means a real fault" },
      ]}
      faq={[
        {
          q: "Is OL always a bad sign?",
          a: "No — in resistance or continuity mode, OL is completely normal and expected when testing an open switch, a disconnected wire, or any two points that genuinely shouldn't be connected. It only signals a problem when you expected continuity or a measurable resistance and got OL instead.",
        },
        {
          q: "My meter showed OL on voltage mode — does that mean there's a fault?",
          a: "Usually not a fault in the circuit — it almost always means the manually selected voltage range is too low for what's actually present, which is a setting issue, not a circuit problem. Select a higher range, or switch to an auto-ranging meter or function, and remeasure.",
        },
        {
          q: "Why does a good diode show OL in one direction but not the other?",
          a: "That's the expected, healthy pattern. A diode only conducts current one way, so in diode-test mode it shows a voltage-drop reading with the probes oriented for forward conduction, and OL with the probes reversed, since a healthy diode blocks current in that direction entirely.",
        },
        {
          q: "Does every multimeter display \"OL\" specifically, or do some show something else?",
          a: "Display conventions vary by manufacturer and model — some show \"OL,\" others show a lone \"1\" on the left of the display, and some older analog-style displays show the needle pinned at the far end of the scale. All of these represent the same underlying situation: the meter can't represent the value on the current range or function.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-fuse-without-removing-it",
          title: "How to Test a Fuse Without Removing It",
          desc: "An OL reading on continuity mode is exactly the signal that confirms a blown fuse.",
        },
        {
          href: "/multimeters/how-to-use-a-multimeter",
          title: "How to Use a Multimeter",
          desc: "Every multimeter mode, from the beginning.",
        },
      ]}
    >
      <section id="what-ol-looks-like">
        <h2 className="text-xl font-semibold mb-3">What OL actually looks like on screen</h2>
        <p className="text-muted leading-7 mb-4">
          The display itself looks identical whether OL means &quot;open circuit&quot; or
          &quot;overload&quot; — the only way to tell which one you&apos;re looking at is to check what
          mode the dial is set to.
        </p>
        <Figure
          caption={
            <>
              The same &quot;OL&quot; reading, shown on resistance mode (left, meaning an open circuit)
              and on voltage mode (right, meaning the reading exceeds the selected range). Nothing on
              the display itself distinguishes the two — only the dial position does.
            </>
          }
        >
          <div className="grid grid-cols-2 gap-4">
            <MeterReadout value="OL" unit="Ω" mode="RESISTANCE" />
            <MeterReadout value="OL" unit="V" mode="VOLTAGE (200V RANGE)" />
          </div>
        </Figure>
      </section>

      <section>
        <h2 id="it-depends-on-mode" className="text-xl font-semibold mb-3">OL means different things in different modes</h2>
        <p className="text-muted leading-7">
          Underneath, OL always means the same technical thing: the meter can&apos;t display a
          meaningful numeric value for what it&apos;s currently measuring, given the function and range
          selected. What that implies about your circuit changes completely depending on which mode
          you&apos;re in — in some modes it&apos;s a normal, expected result; in others it&apos;s simply
          telling you to pick a different range.
        </p>
      </section>

      <section>
        <h2 id="resistance-and-continuity" className="text-xl font-semibold mb-3">OL in resistance and continuity mode</h2>
        <p className="text-muted leading-7">
          Here, OL means infinite resistance — an open circuit between the two probe points. This is
          completely normal when testing an open switch, a disconnected wire, or two points that aren&apos;t
          supposed to be connected. It becomes diagnostically useful the moment you expected continuity
          (a fuse, a wire, a closed switch) and got OL instead — that&apos;s the signal of a genuine open
          or break.
        </p>
      </section>

      <section id="continuity-beep-mode">
        <h2 className="text-xl font-semibold mb-3">Does continuity (beep) mode show OL too?</h2>
        <p className="text-muted leading-7">
          On most meters, the audible &quot;beep&quot; continuity setting is really resistance mode with
          a threshold added: the meter beeps when resistance falls below a low cutoff (often a few
          hundred ohms), and shows exactly the same OL on the display as plain resistance mode does when
          there&apos;s no path at all — it just stays silent instead of beeping. So a dead-quiet meter
          with OL on the display and a dead-quiet meter that simply isn&apos;t beeping for some other
          reason can look identical at a glance; check the number on the screen, not just whether you
          heard a beep.
        </p>
      </section>

      <section>
        <h2 id="diode-mode" className="text-xl font-semibold mb-3">OL in diode mode</h2>
        <p className="text-muted leading-7">
          A healthy diode shows OL when the probes are oriented for reverse blocking, since current
          genuinely can&apos;t flow that direction through a good junction. OL in both probe orientations,
          instead of just one, indicates a failed, open diode rather than normal reverse blocking — see
          our{" "}
          <Link href="/multimeters/how-to-test-a-diode-with-a-multimeter" className={link}>
            diode testing guide
          </Link>{" "}
          for the full pattern.
        </p>
      </section>

      <section>
        <h2 id="voltage-and-current" className="text-xl font-semibold mb-3">OL in voltage and current mode</h2>
        <p className="text-muted leading-7">
          On a manually-ranged meter, OL here means overload — the actual voltage or current exceeds
          the range you&apos;ve selected, not that anything is wrong with the circuit. Selecting a
          higher range (or switching to an auto-ranging meter, which picks the range for you) resolves
          it immediately in most cases.
        </p>
      </section>

      <Callout title="On current mode specifically, check the fuse too">
        If a manually-ranged meter shows OL on current mode even after selecting the highest available
        range, also consider whether the measurement actually exceeds the meter&apos;s absolute maximum
        current rating for that input jack — pushing more current than a meter&apos;s fused input can
        handle is a real safety and equipment-damage risk, not just a display quirk.
      </Callout>

      <section>
        <h2 id="quick-reference" className="text-xl font-semibold mb-3">Quick reference</h2>
        <InfoCards
          items={[
            { label: "Resistance / continuity", desc: "OL = open circuit. Expected for open switches/wires; a fault if you expected continuity." },
            { label: "Diode mode", desc: "OL = normal in reverse-bias direction; OL in both directions = failed diode." },
            { label: "Voltage / current", desc: "OL = exceeds the selected range. Select a higher range or use auto-ranging." },
          ]}
        />
      </section>

      <section id="when-its-actually-a-fault">
        <KeyIdea title="When OL actually points to a real fault">
          Context is everything: OL is a fault signal only when it contradicts what you expected to
          measure — continuity where there should be continuity, a diode that reads OL both ways, or a
          voltage reading that stays OL even on the meter&apos;s highest range. Otherwise, it&apos;s
          simply telling you the open circuit or range mismatch you&apos;d expect.
        </KeyIdea>
      </section>
    </HowToShell>
  );
}
