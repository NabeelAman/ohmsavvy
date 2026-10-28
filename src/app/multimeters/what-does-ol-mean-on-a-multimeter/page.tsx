import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  InfoCards,
  KeyIdea,
  MeterReadout,
  ProductStrip,
  StepHeading,
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
const fluke117 = picks.find((p) => p.name === "Fluke 117")!;
const ut139c = picks.find((p) => p.name === "UNI-T UT139C")!;

const link = "text-accent hover:underline";

/**
 * A meter on ohms connected to a part, with the four places an open path
 * hides: an unseated plug, a broken conductor inside the lead, a probe tip on
 * paint or oxide, and an open part. Any one of them makes the display read OL.
 */
function OpenPathDiagram() {
  return (
    <svg
      viewBox="0 0 360 250"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram of a multimeter on the resistance function connected by two test leads to a component. The display reads OL. Four numbered markers show where the open path can be: 1, the red plug not fully seated in its jack; 2, a broken conductor hidden inside the lead insulation; 3, the probe tip resting on paint or oxide instead of bare metal; 4, the component itself being open. Any one of these breaks the loop and produces OL."
    >
      {/* meter */}
      <rect x="20" y="30" width="100" height="120" rx="12" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <rect x="32" y="42" width="76" height="34" rx="4" className="fill-background stroke-foreground" strokeWidth="1.2" />
      <text x="70" y="66" fontSize="18" fontWeight="700" textAnchor="middle" className="fill-accent">OL</text>
      <text x="70" y="96" fontSize="10" textAnchor="middle" className="fill-muted">Ω</text>
      <circle cx="50" cy="128" r="8" className="fill-[#1a1d21] stroke-foreground" strokeWidth="1.5" />
      <circle cx="90" cy="128" r="8" className="fill-[#d13b3b] stroke-foreground" strokeWidth="1.5" />
      <g fontSize="8.5" textAnchor="middle" className="fill-muted">
        <text x="50" y="112">COM</text>
        <text x="90" y="112">VΩ</text>
      </g>
      {/* leads */}
      <g fill="none" strokeWidth="2" strokeLinecap="round">
        <path d="M90 140 V165 H150" className="stroke-[#d13b3b]" />
        <path d="M162 165 H220 V40 H262" className="stroke-[#d13b3b]" />
        <path d="M50 136 V185 H280 V150" className="stroke-foreground" />
      </g>
      {/* component */}
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        <path d="M280 40 V70 M280 120 V150" />
        <rect x="270" y="70" width="20" height="50" rx="2" />
        <path d="M273 92 L281 97 L276 100 L287 104" />
      </g>
      {/* probe tip on oxide */}
      <rect x="262" y="35" width="10" height="10" rx="2" className="fill-[#b9bec4]" />
      {/* markers */}
      <g fontSize="10" fontWeight="700" textAnchor="middle">
        <circle cx="104" cy="152" r="8" className="fill-accent" />
        <text x="104" y="156" className="fill-accent-foreground">1</text>
        <circle cx="156" cy="150" r="8" className="fill-accent" />
        <text x="156" y="154" className="fill-accent-foreground">2</text>
        <circle cx="244" cy="26" r="8" className="fill-accent" />
        <text x="244" y="30" className="fill-accent-foreground">3</text>
        <circle cx="312" cy="95" r="8" className="fill-accent" />
        <text x="312" y="99" className="fill-accent-foreground">4</text>
      </g>
      <g fontSize="9.5" className="fill-foreground">
        <text x="20" y="212">1  plug not fully seated</text>
        <text x="190" y="212">2  wire broken inside insulation</text>
        <text x="20" y="232">3  tip on paint or oxide</text>
        <text x="190" y="232">4  open part or wire</text>
      </g>
    </svg>
  );
}

export default function WhatDoesOlMeanOnAMultimeterPage() {
  return (
    <HowToShell
      title="What Does OL Mean on a Multimeter?"
      description={description}
      path="/multimeters/what-does-ol-mean-on-a-multimeter"
      category="multimeters"
      published="2026-10-21"
      updated="2026-10-29"
      intro={
        <>
          &quot;OL&quot; (sometimes shown as &quot;1&quot; or &quot;OPEN&quot; on older or simpler
          displays) means the meter can&apos;t represent the current measurement on the selected range
          or function: in resistance, continuity and diode modes it means an open path, and in voltage and
          current modes it means the value is above the selected range. What it actually implies about your circuit, though, depends entirely on which
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
        { id: "range-example", label: "Worked example: one battery, five ranges" },
        { id: "quick-reference", label: "Quick reference" },
        { id: "keeps-showing-ol", label: "Why does my multimeter keep showing OL?" },
        { id: "ol-causes", label: "Stuck-on-OL causes at a glance" },
        { id: "step-short-leads", label: "1. Short the probe tips" },
        { id: "step-jacks", label: "2. Check the jacks and plugs" },
        { id: "step-function", label: "3. Match function and range" },
        { id: "step-known-part", label: "4. Measure a known part" },
        { id: "step-trust-ol", label: "5. Trust the OL and find the open" },
        { id: "when-its-actually-a-fault", label: "When OL means a real fault" },
        { id: "meters-that-avoid-ol", label: "Auto-ranging meters that cut down on OL" },
      ]}
      faq={[
        {
          q: "Why does my multimeter keep showing OL?",
          a: "Short the probe tips together on ohms first. If that still reads OL, a lead is broken or a plug is not fully seated in its jack. If the shorted leads read near zero, check that the dial is on the function you meant and the range is high enough, then make sure the tips are on bare metal. Only after those checks does OL really mean the circuit is open.",
        },
        {
          q: "Why does my multimeter show OL when I touch the probes together?",
          a: "With the tips touching, the meter should read a fraction of an ohm on resistance or beep on continuity. OL means the loop through the leads is open: a conductor broken inside the insulation, a banana plug pushed only part way in, a red lead in the amps jack, or a damaged ohms input. Swap in a known-good lead set to tell the leads from the meter.",
        },
        {
          q: "Why does my multimeter read OL on a capacitor?",
          a: "On the resistance function the meter pushes a small current into the capacitor, which charges it. The reading starts low, climbs as the capacitor charges, and ends at OL once almost no current flows. That rising-then-OL pattern is normal for a healthy capacitor. Discharge the capacitor before testing and use the meter's capacitance function if you want its value.",
        },
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
        {
          q: "Why does my multimeter read OL when I test a resistor?",
          a: "Either the resistor's value is above the selected ohms range, or the resistor is open. A 47kΩ part on a 20kΩ range shows OL even though it's fine, so step up a range first. If it still reads OL on the top range, and the color bands say it should be far lower, the resistor has failed open or one probe isn't touching bare metal.",
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
        <p className="text-muted leading-7 mt-4">
          For a full walk-through of the ohms ranges, see <Link href="/multimeters/how-to-measure-resistance-in-ohms-with-a-digital-multimeter" className="text-accent hover:underline">how to measure resistance in ohms with a digital multimeter</Link>.
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
          a threshold added: the meter beeps when resistance falls below a low cutoff (often tens of
          ohms; the exact figure is in your manual), and shows exactly the same OL on the display as plain resistance mode does when
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

      <section id="range-example">
        <h2 className="text-xl font-semibold mb-3">Worked example: one battery, five ranges</h2>
        <p className="text-muted leading-7">
          A manual-ranging meter shows OL whenever the true value is larger than the top of the selected
          range. On a typical 2,000-count meter, each voltage range tops out at 1,999 counts, so the
          200 mV range can show at most 199.9 mV and the 20 V range at most 19.99 V. Measure a car battery
          sitting at about 12.6 V and the first two ranges overflow, while the higher ones read it at
          coarser and coarser resolution. The readings below are illustrative, worked from those range
          limits rather than taken from a specific meter.
        </p>
        <div className="mt-4">
          <DataTable
            head={["Range selected", "Largest value it can show", "Display with ~12.6 V applied", "Resolution"]}
            rows={[
              ["200 mV", "199.9 mV", "OL", "0.1 mV"],
              ["2 V", "1.999 V", "OL", "1 mV"],
              ["20 V", "19.99 V", "12.60", "10 mV"],
              ["200 V", "199.9 V", "12.6", "100 mV"],
              ["600 V", "600 V", "13", "1 V"],
            ]}
            mono={[1, 2, 3]}
          />
        </div>
        <p className="text-muted leading-7 mt-4">
          The best range is the lowest one that does not overflow: here 20 V, which resolves the battery
          to hundredths of a volt. A 6,000-count auto-ranging meter makes the same choice for you, using
          ranges such as 6 V and 60 V, which is why OL from a range mismatch almost disappears on modern
          meters. Resistance works the same way: a 2.2 kΩ resistor shows OL on a 200 Ω range and a sensible
          2.200 on the 20 kΩ range.
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

      <section>
        <h2 id="keeps-showing-ol" className="text-xl font-semibold mb-3">Why does my multimeter keep showing OL?</h2>
        <p className="text-muted leading-7 mb-4">
          If your multimeter keeps showing OL no matter what you touch, the open path is usually in the test
          setup rather than the circuit: a broken lead, a plug that is not seated, the wrong jack, the wrong
          function, or a range below the value you are measuring. The circuit is the last suspect, not the
          first. The diagram shows why: on resistance, continuity and diode modes the meter drives a small
          current out of one jack, through the lead, the probe tip, the part, the other tip and the other lead,
          and back into COM. A gap anywhere in that loop looks exactly the same on the display.
        </p>
        <Figure caption="On resistance, continuity and diode modes, any break in the measuring loop reads OL. Points 1 to 3 are in the test setup and point 4 is the part itself; the steps below check them in that order.">
          <OpenPathDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="ol-causes" className="text-xl font-semibold mb-3">Stuck-on-OL causes at a glance</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["OL even with the probe tips touching", "Lead conductor broken inside the insulation", "Short the tips on ohms and flex each cable", "Replace the lead set"],
            ["OL that comes and goes as you move the leads", "Banana plug not fully seated, or a worn jack", "Push each plug in until it stops; wiggle at the jack", "Reseat the plugs; replace leads with loose plugs"],
            ["OL on ohms and continuity, volts work", "Red lead in the A or mA jack", "Check the red plug sits in the V/Ω jack", "Move it to V/Ω"],
            ["OL on a resistor that should read fine", "Manual range below the part's value", "Compare the color code with the range's top value", "Step up one range at a time"],
            ["OL on voltage, even on high ranges", "Wrong function (for example mV) or a value beyond the meter's maximum", "Read the unit beside the digits", "Select V; stop if it is above the meter's rating"],
            ["OL across a wire, fuse or switch that should conduct", "Genuine open circuit", "Repeat with known-good leads on bare metal", "Repair or replace the open part"],
            ["OL with tips on a terminal or board", "Tip resting on paint, oxide or conformal coating", "Press harder or scrape a clean spot", "Use sharp tips; clean the contact"],
            ["OL one way in diode mode", "Normal reverse bias", "Swap the probes: one direction should read a forward drop", "Nothing; OL both ways means an open diode"],
            ["Reading climbs, then shows OL, on a capacitor", "Capacitor charging from the ohms test current", "Watch the reading rise over a few seconds", "Normal; use the capacitance function"],
            ["Ohms check from V into the A jack reads OL", "Blown internal current fuse", "Compare with the fuse-check value in the manual", "Fit the maker's specified fuse"],
          ]}
        />
      </section>

      <Callout title="Safety: OL is never proof that a circuit is dead">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            On a voltage range, OL means &quot;more than this range can show,&quot; which on mains can be
            hundreds of volts. Move to the highest range or auto-range before probing further.
          </li>
          <li>
            Only measure resistance, continuity or diodes with the power off and capacitors discharged. A live
            voltage on those functions can damage the meter or give misleading readings.
          </li>
          <li>
            If OL appears on a meter&apos;s highest voltage range, the voltage exceeds what that meter is rated
            for. Disconnect, and leave anything at that level to a licensed electrician.
          </li>
        </ul>
      </Callout>

      <section>
        <StepHeading n={1} id="step-short-leads">Short the probe tips</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set the dial to ohms or continuity and press the two probe tips firmly together. A healthy lead set
          reads well under 1 Ω, usually a few tenths, and the continuity function beeps. OL here proves the
          fault is in the leads, plugs or meter, and nothing you probe will read correctly until it is fixed.
          Flex each cable along its length, especially at the probe handle and the plug, while watching the
          display: a reading that drops in and out marks the break. Our guide on{" "}
          <Link href="/multimeters/how-to-tell-if-multimeter-test-leads-are-bad" className={link}>
            how to tell if multimeter test leads are bad
          </Link>{" "}
          covers the full lead check.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="step-jacks">Check the jacks and plugs</StepHeading>
        <p className="text-muted leading-7">
          Resistance, continuity and diode tests use the same jack as voltage, usually marked V with the Ω
          symbol. A red lead left in the A or mA jack after a current test leaves the ohms input with nothing
          connected, so the meter reads OL on every part. Push each banana plug in until it stops: shrouded
          plugs can feel seated when they are only part way in. If your meter has a fuse-check procedure, it
          usually involves reading resistance from the V/Ω jack into a current jack, and OL there points to a
          blown fuse. Our article on{" "}
          <Link href="/multimeters/why-does-a-multimeter-fuse-blow-when-measuring-current" className={link}>
            why a multimeter fuse blows
          </Link>{" "}
          explains what usually caused it.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="step-function">Match the function and range</StepHeading>
        <p className="text-muted leading-7 mb-4">
          On a manual-ranging meter, every range has a ceiling, and anything above it reads OL. On a typical
          2,000-count meter that ceiling is 1,999 counts, so the 20 kΩ range stops at 19.99 kΩ and a perfectly
          good 47 kΩ resistor reads OL until you step up. The chart puts those ceilings beside the parts used
          as examples on this page. The values are illustrative; your meter&apos;s ranges are printed on the
          dial.
        </p>
        <Figure caption="Illustrative: the largest reading on each resistance range of a typical 2,000-count meter, beside example parts. Any part larger than the range you selected reads OL. Bars use a log scale.">
          <BarChart
            log
            items={[
              { label: "Good leads shorted (typical)", value: 0.3, display: "≈0.3 Ω" },
              { label: "200 Ω range ceiling", value: 199.9, display: "199.9 Ω" },
              { label: "2.2 kΩ resistor", value: 2200, display: "2.2 kΩ" },
              { label: "20 kΩ range ceiling", value: 19990, display: "19.99 kΩ" },
              { label: "47 kΩ resistor", value: 47000, display: "47 kΩ", highlight: true },
              { label: "200 kΩ range ceiling", value: 199900, display: "199.9 kΩ" },
              { label: "20 MΩ range ceiling", value: 19990000, display: "19.99 MΩ" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Also check the function. A dial on mV shows OL on anything above a fraction of a volt, and a dial on
          diode test shows OL across most resistors above a few kilohms because the test voltage is limited.
          Our{" "}
          <Link href="/multimeters/multimeter-symbols-explained" className={link}>
            multimeter symbols guide
          </Link>{" "}
          shows which dial position is which.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="step-known-part">Measure a known part</StepHeading>
        <p className="text-muted leading-7">
          With good leads and the right function, measure something whose value you know: a resistor with
          readable color bands, a short piece of wire, or, on the volts function, a fresh AA cell at about
          1.5 to 1.6 V. A correct reading clears the meter. If it reads OL on a known part on every range, with
          leads that pass step 1, the meter&apos;s input is damaged, often by voltage applied while it was on
          ohms, and it needs repair or replacement.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="step-trust-ol">Trust the OL and find the open</StepHeading>
        <p className="text-muted leading-7">
          Once the setup is proven, OL across something that should conduct is a real result. Make sure the
          tips are on clean, bare metal, since paint, corrosion and board coating all insulate, then split the
          path in half and measure each half until you find the section that reads OL. On long cable runs,
          extend one lead with a known-good jumper as described in{" "}
          <Link href="/multimeters/how-to-measure-continuity-on-a-long-electrical-wire" className={link}>
            measuring continuity on a long wire
          </Link>
          . If the reading flickers between OL and a value instead of staying at OL, see{" "}
          <Link href="/multimeters/multimeter-continuity-beep-intermittent" className={link}>
            intermittent continuity beeps
          </Link>
          .
        </p>
      </section>

      <section id="when-its-actually-a-fault">
        <KeyIdea title="When OL actually points to a real fault">
          Context is everything: OL is a fault signal only when it contradicts what you expected to
          measure — continuity where there should be continuity, a diode that reads OL both ways, or a
          voltage reading that stays OL even on the meter&apos;s highest range. Otherwise, it&apos;s
          simply telling you the open circuit or range mismatch you&apos;d expect.
        </KeyIdea>
      </section>

      <section id="meters-that-avoid-ol">
        <h2 className="text-xl font-semibold mb-3">Auto-ranging meters that cut down on OL</h2>
        <p className="text-muted leading-7 mb-4">
          If range-related OL keeps tripping you up, an auto-ranging meter removes most of it, leaving OL to
          mean what it should: an open path or a value beyond the meter&apos;s top range.
        </p>
        <ProductStrip
          title="Auto-ranging meter picks"
          items={[
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 electrician's True RMS multimeter",
              href: "/multimeters/fluke-117-review",
              note: "Hands-on tested. True RMS, auto-ranging and CAT III 600V, with built-in non-contact voltage detection.",
            },
            {
              name: "UNI-T UT139C",
              image: ut139c.image,
              alt: "UNI-T UT139C digital multimeter",
              href: "/multimeters/uni-t-ut139c-review",
              note: "6,000-count True RMS with both auto and manual ranging, so you can see exactly how range limits work.",
            },
            {
              name: "KAIWEETS KM200s",
              image: kaiweets.image,
              alt: "KAIWEETS KM200s auto-ranging multimeter",
              href: "/multimeters/kaiweets-km200s-review",
              note: "Budget True RMS with smart auto-ranging and a backlit display. CAT II 600V, so keep it off service panels.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
