import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  KeyIdea,
  MeterReadout,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

// Fluke 117 continuity: beeper on below 20 Ω, off above 250 Ω, detects opens or shorts of 500 µs or longer per https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-117
// Fluke 117 A input fuse: 11 A, 1000 V FAST per https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-117
// Southwire 16030A switches from resistance/continuity to voltage above 2.6 V, Fluke 113 VCHEK falls back to continuity,
// BM786 BeepLit <100 µs, Klein MM460S Smart mode: per the Picks in src/lib/multimeter-catalog.ts (maker sources cited there).

const path = "/multimeters/why-is-my-multimeter-not-beeping-in-continuity-mode";
const description =
  "Multimeter continuity mode not beeping? Check the dial and function button, lead jacks, a broken lead, the beep threshold, a muted beeper and a live circuit.";

export const metadata = buildMetadata({
  title: "Multimeter Not Beeping in Continuity Mode?",
  description,
  path: "/multimeters/why-is-my-multimeter-not-beeping-in-continuity-mode",
});

const all = getAllPicks("multimeters");
const fluke117 = all.find((p) => p.name === "Fluke 117")!;
const bm786 = all.find((p) => p.name === "EEVblog Brymen BM786")!;
const fluke114 = all.find((p) => p.name === "Fluke 114")!;

const link = "text-accent hover:underline";

/** Resistance scale with the Fluke 117's published beep and silence points, plus where common parts land. */
function ThresholdScaleDiagram() {
  // Log scale: x = 40 + (log10(R) + 1) * 70, for R from 0.1 Ω to 10 kΩ (5 decades, 350 px).
  const x = (r: number) => 40 + (Math.log10(r) + 1) * 70;
  const ticks = [0.1, 1, 10, 100, 1000, 10000];
  const tickLabel = ["0.1 Ω", "1 Ω", "10 Ω", "100 Ω", "1 kΩ", "10 kΩ"];
  const marks = [
    { r: 0.5, label: "100 ft loop of 14 AWG", dy: 0 },
    { r: 9.6, label: "1,500 W heater element", dy: 1 },
    { r: 240, label: "60 W bulb, hot", dy: 0 },
    { r: 400, label: "12 V relay coil", dy: 1 },
  ];
  return (
    <svg
      viewBox="0 0 420 230"
      className="w-full h-auto"
      role="img"
      aria-label="A logarithmic resistance scale from 0.1 ohm to 10 kilohms. Below 20 ohms is shaded as the zone where a Fluke 117 beeps. Between 20 and 250 ohms is shaded as an uncertain zone. Above 250 ohms the beeper is off. A 100 foot loop of 14 gauge wire at 0.5 ohm and a 1,500 watt heater element at 9.6 ohms fall in the beep zone; a hot 60 watt bulb at 240 ohms sits in the uncertain zone; a 12 volt relay coil at 400 ohms is silent."
    >
      <text x="10" y="18" fontSize="12" fontWeight="600" className="fill-foreground">
        Where the beep starts and stops (Fluke 117 spec)
      </text>
      <rect x={x(0.1)} y="60" width={x(20) - x(0.1)} height="34" className="fill-accent/30" />
      <rect x={x(20)} y="60" width={x(250) - x(20)} height="34" className="fill-accent/10" />
      <rect x={x(250)} y="60" width={x(10000) - x(250)} height="34" className="fill-surface stroke-border" strokeWidth="1" />
      <g fontSize="10" textAnchor="middle" className="fill-foreground">
        <text x={(x(0.1) + x(20)) / 2} y="81" fontWeight="700">BEEPS</text>
        <text x={(x(20) + x(250)) / 2} y="76">either</text>
        <text x={(x(20) + x(250)) / 2} y="88">way</text>
        <text x={(x(250) + x(10000)) / 2} y="81" fontWeight="700">SILENT</text>
      </g>
      <g className="stroke-accent" strokeWidth="2">
        <line x1={x(20)} y1="52" x2={x(20)} y2="100" />
        <line x1={x(250)} y1="52" x2={x(250)} y2="100" />
      </g>
      <g fontSize="10" textAnchor="middle" className="fill-accent">
        <text x={x(20)} y="46">20 Ω</text>
        <text x={x(250)} y="46">250 Ω</text>
      </g>
      <line x1={x(0.1)} y1="100" x2={x(10000)} y2="100" className="stroke-foreground" strokeWidth="1.4" />
      {ticks.map((t, i) => (
        <g key={t}>
          <line x1={x(t)} y1="100" x2={x(t)} y2="106" className="stroke-foreground" strokeWidth="1.2" />
          <text x={x(t)} y="118" fontSize="9" textAnchor="middle" className="fill-muted">
            {tickLabel[i]}
          </text>
        </g>
      ))}
      {marks.map((m) => (
        <g key={m.label}>
          <line
            x1={x(m.r)}
            y1="122"
            x2={x(m.r)}
            y2={m.dy ? 172 : 142}
            className="stroke-foreground"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
          <circle cx={x(m.r)} cy="100" r="3.5" className="fill-foreground" />
          <text x={x(m.r)} y={m.dy ? 186 : 156} fontSize="9.5" textAnchor="middle" className="fill-foreground">
            {m.label}
          </text>
        </g>
      ))}
      <text x="10" y="214" fontSize="9.5" className="fill-muted">
        Positions calculated from standard formulas; thresholds differ between meter models.
      </text>
    </svg>
  );
}

export default function NotBeepingInContinuityModePage() {
  return (
    <HowToShell
      title="Why Is My Multimeter Not Beeping in Continuity Mode?"
      description={description}
      path={path}
      category="multimeters"
      published="2026-10-29"
      intro={
        <>
          A multimeter in continuity mode stays silent either because it isn&apos;t really in continuity mode (wrong
          dial position, function button not pressed, leads in the wrong jacks) or because the resistance between
          the probes is above the meter&apos;s beep threshold, which on many meters is only a few tens of ohms. Touch
          the probe tips together first: if that beeps, the meter is fine and the part you&apos;re testing simply
          isn&apos;t a low-resistance path; if it doesn&apos;t, the problem is in the meter, its settings or its
          leads. This guide covers the multimeter continuity mode not beeping at all, from the 10-second checks to
          the less obvious causes like a muted beeper or a circuit that is still powered.
        </>
      }
      aside={{
        image: fluke117.image,
        alt: "Fluke 117 digital multimeter with continuity beeper",
        caption: (
          <>
            Fluke publishes its beep points: on below 20 Ω, off above 250 Ω. See our{" "}
            <Link href="/multimeters/fluke-117-review" className={link}>
              Fluke 117 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-the-beep-works", label: "How the continuity beep decides" },
        { id: "causes", label: "Causes at a glance" },
        { id: "threshold", label: "The threshold is lower than you think" },
        { id: "short-the-probes", label: "1. Short the probes together" },
        { id: "dial-and-button", label: "2. Check the dial and function button" },
        { id: "jacks-and-leads", label: "3. Check the jacks and test leads" },
        { id: "beeper-settings", label: "4. Look for a muted beeper or low battery" },
        { id: "power-off", label: "5. Make sure the circuit is dead" },
        { id: "read-the-ohms", label: "6. Read the ohms instead of the beep" },
        { id: "fuse-myth", label: "Is a blown fuse to blame?" },
        { id: "meters", label: "Meters with a dependable beeper" },
      ]}
      faq={[
        {
          q: "Why does my multimeter show a reading but not beep on continuity?",
          a: "The display shows the measured resistance, but the beeper only sounds below the meter's threshold. If the screen reads, say, 85 Ω, the meter is measuring correctly and the path is simply too resistive to count as continuity. On a Fluke 117, anything above 250 Ω is guaranteed silent. Switch to the ohms function, note the value and decide from the number whether that path is good.",
        },
        {
          q: "Why does my multimeter not beep when I touch the probes together?",
          a: "With the tips shorted, a working meter in continuity mode should read close to zero and beep. If it shows OL, a lead is broken, a plug isn't fully seated or the red lead is in a current jack. If it reads near zero but stays silent, the meter isn't in the beep function, the beeper is turned off in setup, or the buzzer itself or its battery supply has failed.",
        },
        {
          q: "Do all multimeters beep at the same resistance?",
          a: "No. Each maker picks its own threshold, and many publish it in the specifications. Fluke lists the 117 as beeping below 20 Ω and staying silent above 250 Ω, with the region in between left undefined. Other meters use different figures, so check the continuity line in your own manual before deciding that a wire or contact is bad because it didn't beep.",
        },
        {
          q: "Can a low battery stop the continuity beeper?",
          a: "It can. The buzzer is one of the larger loads in a handheld meter, and as the battery sags it may get quiet, sound distorted or stop before the display fades. Many meters show a battery symbol well before the readings go wrong. If the probes-shorted test reads zero but the beep is faint or missing, fit a fresh battery before suspecting the buzzer.",
        },
        {
          q: "Why won't my multimeter beep on a fuse or switch I know is good?",
          a: "First confirm it's isolated: a fuse still in a powered circuit can make the meter refuse continuity or show a voltage warning. Then look at the contacts. Oxidized fuse caps, a dirty switch or probe tips resting on paint or plastic can add enough resistance to stay above the threshold. Press the tips firmly onto bare metal and read the ohms value to see how close it is.",
        },
        {
          q: "Is there a setting that turns off the continuity beep?",
          a: "On some meters, yes. Several models let you disable the beeper or all key tones in a setup menu or with a power-on button combination, and a meter set that way stays silent in continuity mode. The procedure varies, so check the setup or power-on options section of the manual. Meters without a setup menu generally have a beeper that can't be muted.",
        },
      ]}
      next={[
        {
          href: "/multimeters/multimeter-continuity-beep-intermittent",
          title: "Why Does My Multimeter's Continuity Beep Cut Out?",
          desc: "The beep comes and goes: wiggle-testing for broken strands and loose joints.",
        },
        {
          href: "/multimeters/why-does-my-multimeter-continuity-tester-keep-beeping",
          title: "Why Does My Continuity Tester Keep Beeping?",
          desc: "The opposite problem: a beep on paths that shouldn't be connected.",
        },
        {
          href: "/multimeters/how-to-tell-if-multimeter-test-leads-are-bad",
          title: "How to Tell If Multimeter Test Leads Are Bad",
          desc: "Find a broken conductor or a worn plug in your leads.",
        },
        {
          href: "/multimeters/what-does-ol-mean-on-a-multimeter",
          title: "What Does OL Mean on a Multimeter?",
          desc: "What OL means in ohms and continuity mode.",
        },
      ]}
    >
      <Callout title="Safety: continuity is a dead-circuit test">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Switch off and lock out the circuit, unplug the appliance or disconnect the battery before testing
            continuity. Confirm it is dead with the voltage function first, using a meter and leads rated for that
            circuit (CAT III 600V or better on household branch circuits).
          </li>
          <li>
            Discharge large capacitors in power supplies, motor drives and microwave ovens before probing. A charged
            capacitor can damage the meter and can injure you.
          </li>
          <li>
            If a household circuit won&apos;t go dead at the breaker, or you aren&apos;t sure which breaker feeds it,
            stop and call a licensed electrician.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="how-the-beep-works" className="text-xl font-semibold mb-3">
          How the continuity beep decides
        </h2>
        <p className="text-muted leading-7 mb-4">
          Continuity mode is a resistance measurement with a yes-or-no output attached. The meter pushes a small
          test current out of the V/Ω jack, through whatever sits between the probes and back into COM, works out
          the resistance from the voltage that develops, and compares the result with a fixed threshold. Below the
          threshold, it switches on the buzzer. Above it, the buzzer stays off, even though the display may still
          show a perfectly valid number.
        </p>
        <p className="text-muted leading-7">
          That gives a silent meter exactly two families of explanation. Either the measurement never happens
          properly (meter in the wrong function, a lead open, a jack wrong, a beeper disabled), or it happens fine
          and the answer is &quot;more ohms than the threshold.&quot; Shorting the probe tips together separates the two
          in a few seconds, which is why it is step 1 below. A beep that sounds sometimes and drops out is a
          different fault with its own method, covered in{" "}
          <Link href="/multimeters/multimeter-continuity-beep-intermittent" className={link}>
            why the continuity beep cuts in and out
          </Link>
          , and a beep that won&apos;t stop is covered in{" "}
          <Link href="/multimeters/why-does-my-multimeter-continuity-tester-keep-beeping" className={link}>
            why a continuity tester keeps beeping
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Causes at a glance</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["Shorted probes read ohms, no beep", "Dial on Ω, not on the continuity function", "Look for the speaker or diode symbol on the display", "Press the function (often yellow) button until the beep symbol shows"],
            ["Shorted probes read OL", "Broken lead or plug not fully seated", "Flex each lead while shorted; swap in a known-good pair", "Push plugs fully home or replace the leads"],
            ["Shorted probes read OL, leads proven good", "Red lead in an A or mA jack", "Check which jack the red plug is in", "Move red to the V/Ω jack"],
            ["Display near 0 Ω, still silent", "Beeper muted in setup, weak battery or failed buzzer", "Check setup options and the battery icon; try a fresh battery", "Re-enable the beeper; replace the battery; service the meter"],
            ["Probes shorted beep, the part doesn't", "Part is above the beep threshold", "Read its resistance on the Ω function", "Judge the path by its ohms value, not the beep"],
            ["Meter shows volts or a warning instead of beeping", "Circuit still powered", "Measure voltage across the same points", "De-energize and discharge, then retest"],
            ["Readings fine on bare wire, silent on a terminal", "Oxide, paint or coating under the probe", "Scrape a small spot clean and press firmly", "Clean the contact point; use sharp probe tips"],
          ]}
        />
      </section>

      <section>
        <h2 id="threshold" className="text-xl font-semibold mb-3">
          The threshold is lower than you think
        </h2>
        <p className="text-muted leading-7 mb-4">
          Most of the &quot;my meter won&apos;t beep&quot; questions about real parts come down to the threshold. Fluke
          specifies the 117 as beeping below 20 Ω and turning the beeper off above 250 Ω. Between those two points
          the spec makes no promise, so a part sitting at 60 Ω may beep on one meter and not another. Other makers
          choose their own numbers, which is why the continuity line in your manual matters more than any general
          rule.
        </p>
        <p className="text-muted leading-7 mb-4">
          Plenty of parts that are working perfectly sit above that range. A 12 V relay coil rated at 30 mA has a
          resistance of about 400 Ω (12 ÷ 0.03). A 60 W, 120 V incandescent bulb runs at about 240 Ω when hot (120² ÷
          60), and although its cold filament reads much lower, some bulbs still land in the undecided zone. A
          motor winding, a transformer primary or a long run of thin signal wire can all be intact and silent.
          At the other end, a 1,500 W, 120 V heater element is about 9.6 Ω (120² ÷ 1,500) and a 100 ft loop of 14
          AWG copper at roughly 2.5 Ω per 1,000 ft is about 0.5 Ω, so both beep easily.
        </p>
        <Figure
          caption={
            <>
              The Fluke 117&apos;s published beep and silence points on a log scale, with calculated resistances for
              common parts. A good relay coil is silent; a good heater element beeps.
            </>
          }
        >
          <ThresholdScaleDiagram />
        </Figure>
        <BarChart
          log
          items={[
            { label: "100 ft loop, 14 AWG wire", value: 0.5, display: "≈ 0.5 Ω" },
            { label: "1,500 W, 120 V heater element", value: 9.6, display: "9.6 Ω" },
            { label: "Fluke 117 beep-on point", value: 20, display: "20 Ω", highlight: true },
            { label: "60 W, 120 V bulb (hot)", value: 240, display: "240 Ω" },
            { label: "Fluke 117 beep-off point", value: 250, display: "250 Ω", highlight: true },
            { label: "12 V, 30 mA relay coil", value: 400, display: "400 Ω" },
          ]}
        />
        <p className="text-muted leading-7 mt-4 text-sm">
          Part values calculated (R = V ÷ I, or R = V² ÷ P at the rated operating point), not measured. Wire
          resistance per 1,000 ft is a typical handbook figure for copper at room temperature.
        </p>
      </section>

      <KeyIdea title="Silence is a measurement, not a malfunction">
        Once the shorted-probe test beeps, a silent part means &quot;higher than the threshold,&quot; nothing more.
        Switch to ohms and read the actual number, then compare it with what that part should measure.
      </KeyIdea>

      <section>
        <p className="text-muted leading-7 mb-4">
          Work through the steps in order. The first three take under a minute and catch the large majority of
          silent meters.
        </p>
        <FlowDiagram
          steps={[
            { label: "Short probes", sub: "Beep or not?" },
            { label: "Function", sub: "Dial and button" },
            { label: "Jacks, leads", sub: "V/Ω and COM" },
            { label: "Settings", sub: "Beeper, battery" },
            { label: "Read ohms", sub: "Above threshold?" },
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="short-the-probes">Short the probes together</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set the meter to continuity and press the two metal tips firmly together. A healthy meter reads a fraction
          of an ohm, typically somewhere around 0.1 to 0.5 Ω for a decent pair of leads, and beeps immediately. The
          result tells you where to look next. A beep means the meter, leads and settings are fine, so skip to step
          6. OL means the loop is open somewhere in the meter or leads, so go to step 3. A near-zero reading with no
          sound points to the function selection or the beeper itself, covered in steps 2 and 4.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 items-center">
          <Figure caption={<>Illustrative: probes shorted, meter in plain ohms mode. A value, but no beep.</>}>
            <MeterReadout value="0.2" unit="Ω" mode="ohms (no beep symbol)" />
          </Figure>
          <Figure caption={<>Illustrative: probes shorted with a broken lead. The loop never closes.</>}>
            <MeterReadout value="OL" unit="Ω" mode="continuity" />
          </Figure>
        </div>
      </section>

      <section>
        <StepHeading n={2} id="dial-and-button">Check the dial and function button</StepHeading>
        <p className="text-muted leading-7 mb-4">
          On many meters, resistance, continuity and diode test share one dial position, and the meter starts in
          plain ohms. You have to press a function key (often colored yellow or labeled SELECT or FUNC) to step to
          continuity, and the display shows a small speaker or sound-wave symbol when you get there. If you
          don&apos;t see that symbol, the meter is measuring resistance correctly and was never going to beep. The
          symbol set varies by brand; our{" "}
          <Link href="/multimeters/multimeter-symbols-explained" className={link}>
            guide to multimeter symbols
          </Link>{" "}
          shows the common ones.
        </p>
        <p className="text-muted leading-7">
          Smart and auto-function meters add their own twist. Klein&apos;s MM460S in Smart mode picks voltage,
          resistance or continuity for you; the Southwire 16030A switches from resistance or continuity to voltage
          if it sees more than 2.6 V; and the Fluke 113&apos;s VCHEK position only falls back to continuity when no
          voltage is present. On meters like these, a small residual voltage on the circuit can keep the meter out
          of continuity entirely, so read what the display says it is measuring before trusting the silence.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="jacks-and-leads">Check the jacks and test leads</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Continuity uses the COM jack and the jack marked with V and Ω. If the red lead is still in the A or mA
          jack from an earlier current measurement, there is no path for the test current and the meter reads OL.
          Plugs that aren&apos;t pushed fully home, especially shrouded safety plugs, can do the same. Re-seat both
          firmly and short the tips again.
        </p>
        <p className="text-muted leading-7">
          Leads fail more often than meters. The copper inside breaks just behind the probe or the plug, where it
          flexes most, while the insulation looks perfect. Short the tips and slowly bend each lead along its length
          and at both ends; a reading that flicks from OL to near zero has found the break. Our page on{" "}
          <Link href="/multimeters/how-to-tell-if-multimeter-test-leads-are-bad" className={link}>
            how to tell if multimeter test leads are bad
          </Link>{" "}
          goes further, but the simplest proof is a known-good pair: if borrowed leads beep and yours don&apos;t, buy
          new leads, not a new meter.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="beeper-settings">Look for a muted beeper or low battery</StepHeading>
        <p className="text-muted leading-7 mb-4">
          If the display reads close to zero with the continuity symbol showing and there is still no sound, the
          meter has made its decision and the buzzer isn&apos;t reporting it. Some meters let you switch the beeper
          off, sometimes together with key-press tones, through a setup menu or by holding a button while turning
          the meter on. A meter that was set that way, by you or a previous owner, will stay silent in continuity
          mode. The manual&apos;s power-on options or setup section tells you whether yours has this and how to
          reverse it.
        </p>
        <p className="text-muted leading-7">
          A weak battery is the next suspect. The piezo buzzer draws noticeably more current than the display, so
          the beep can fade, crackle or quit while the digits still look normal. Fit a fresh battery of the correct
          type and try again. If the meter still reads zero and stays silent with a new battery and the beeper
          enabled, the buzzer or its driver has failed and the meter needs service; until then you can still test
          continuity by reading the ohms value.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="power-off">Make sure the circuit is dead</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Continuity is meant for unpowered circuits. If voltage is present, the meter&apos;s own small test voltage is
          swamped, and depending on the model you&apos;ll see an unstable value, OL, a negative number or a switch to
          a voltage reading instead of a beep. Before testing, switch to volts and measure across the same two
          points. Anything more than a fraction of a volt means the circuit is still fed, or a capacitor is still
          charged.
        </p>
        <p className="text-muted leading-7">
          Kill the power, discharge any large capacitors, and retest. On equipment with a battery backup, a
          stored-energy capacitor or a second supply, disconnect every source, not just the main switch. Residual
          voltage is a common reason a smart-mode meter refuses to enter continuity at all.
        </p>
      </section>

      <section>
        <StepHeading n={6} id="read-the-ohms">Read the ohms instead of the beep</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With the meter proven, a silent part is simply above the threshold. Switch to the Ω function, let the
          reading settle and compare it with what the part should measure. A switch contact or fuse should be well
          under 1 Ω; a reading of tens of ohms on a closed switch means burnt or dirty contacts, even if a different
          meter with a higher threshold would have beeped. A coil or winding should match the maker&apos;s figure. The
          full procedure is in{" "}
          <Link href="/multimeters/how-to-measure-resistance-in-ohms-with-a-digital-multimeter" className={link}>
            how to measure resistance with a digital multimeter
          </Link>
          , and fuses have their own walkthrough in{" "}
          <Link href="/multimeters/how-to-test-a-fuse-with-a-multimeter" className={link}>
            how to test a fuse with a multimeter
          </Link>
          .
        </p>
        <p className="text-muted leading-7">
          Probe contact deserves a second look before you condemn anything. Paint, varnish on magnet wire, plating
          oxide on old terminals and the protective coating on circuit boards can all keep the tips from touching
          metal. Press firmly, rotate the tip slightly to cut through the film, or scrape a tiny spot clean. On very
          long cable runs, the wire&apos;s own resistance can push the total past the threshold; see{" "}
          <Link href="/multimeters/how-to-measure-continuity-on-a-long-electrical-wire" className={link}>
            how to measure continuity on a long wire
          </Link>{" "}
          for the arithmetic and the workarounds.
        </p>
      </section>

      <section>
        <h2 id="fuse-myth" className="text-xl font-semibold mb-3">Is a blown fuse to blame?</h2>
        <p className="text-muted leading-7 mb-4">
          Usually not, and it&apos;s worth knowing why before you open the case. The fuses in a multimeter protect
          the current jacks. On the Fluke 117, for example, the 11 A fuse protects the A input. Resistance and
          continuity use the V/Ω jack, which on typical meters is protected against accidental voltage by other
          circuitry, such as a positive-temperature-coefficient thermistor, rather than by the current fuses. So a
          meter with a blown amps fuse normally still beeps on continuity.
        </p>
        <p className="text-muted leading-7">
          There are exceptions, so check your manual: some inexpensive designs route other functions through a
          shared path. And applying voltage to the ohms input can damage that protection circuitry, which may
          leave continuity reading OL permanently even after the battery and leads check out. That&apos;s a service
          job, not a fuse swap. If the fuse is the thing you actually want to check, the current-side story is in{" "}
          <Link href="/multimeters/why-does-a-multimeter-fuse-blow-when-measuring-current" className={link}>
            why a multimeter fuse blows when measuring current
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="meters" className="text-xl font-semibold mb-3">Meters with a dependable beeper</h2>
        <p className="text-muted leading-7 mb-4">
          Any working meter can do these checks. A published threshold and a fast, latching beeper make continuity
          work quicker. These picks come from our verified multimeter list.
        </p>
        <ProductStrip
          title="Meters for continuity checks"
          items={[
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 electrician's True RMS multimeter",
              href: "/multimeters/fluke-117-review",
              note: "Beeper on below 20 Ω and off above 250 Ω per Fluke's spec, catches opens and shorts of 500 µs or longer. Hands-on Tested.",
            },
            {
              name: "EEVblog Brymen BM786",
              image: bm786.image,
              alt: "EEVblog Brymen BM786 bench multimeter",
              href: "/multimeters/best-multimeters-for-electronics-repair#eevblog-brymen-bm786",
              note: "BeepLit continuity responds in under 100 µs, with 0.01 Ω resolution on its lowest ohms range.",
            },
            {
              name: "Fluke 114",
              image: fluke114.image,
              alt: "Fluke 114 True RMS electrical multimeter",
              href: "/multimeters/fluke-114-vs-fluke-117",
              note: "Voltage, resistance and continuity only, with AutoVolt LoZ to sort ghost voltage before you test.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
