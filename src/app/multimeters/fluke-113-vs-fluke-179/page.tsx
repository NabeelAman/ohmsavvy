// Specs per Fluke and the official Amazon listing, as already cited on this site's own pages (no new sources):
// - Fluke 113 per the Pick in src/lib/multimeter-catalog.ts and /multimeters/fluke-113-vs-fluke-115 (fluke.com 113 product
//   page and spec tab, Amazon B004Q05ODI): VCHEK LoZ volts only, input about 3 kΩ, 6.000/60.00/600.0 V, ±(2.0% + 3) DC and
//   45-500 Hz, 3 V DC minimum in autorange; resistance 600.0 Ω ±(0.9% + 2), 6.000/60.00 kΩ ±(0.9% + 1); capacitance
//   1,000 nF to 9,999 µF, ±(1.9% + 2) to 1,000 µF, ±(5% + 20) on the 9,999 µF range; continuity beeps <20 Ω; diode
//   2.000 V ±(2.0% + 3); 6,000 counts, backlight, Min/Max, auto and manual ranging; no current ranges, two jacks;
//   IEC 61010-2-033 CAT IV 600 V per Fluke (an Amazon bullet says CAT III 600 V / CAT IV 300 V); 9 V, about 300 h;
//   404 g; warranty for a new unit not stated; True RMS per the Amazon title and meter label, only a footnote on fluke.com;
//   LoZ phase-to-earth can trip a GFCI/RCD. Bar graph and frequency: not stated.
// - Fluke 179 per the Pick in src/app/multimeters/best-multimeters/page.tsx (fluke.com 179 page and 170 Series datasheet)
//   and /multimeters/fluke-177-vs-fluke-179 (spec tab): True RMS; 6,000 counts, 33-segment analog bar graph, backlight;
//   DC V ±(0.09% + 2) to 1000 V; AC V ±(1.0% + 3); DC A ±(1.0% + 3), AC A ±(1.5% + 3), 0.01 mA best resolution to 10 A
//   (no µA range in the spec table, although Fluke's comparison table names µA); 50 MΩ ±(0.9% + 1); 10,000 µF ±(1.2% + 2)
//   (9,999 µF in Fluke's comparison table); 100 kHz ±(0.1% + 1); temperature -40 °C to 400 °C ±(1.0% + 10) with the 80BK
//   probe in the box; Auto Hold and Min/Max-Average; CAT III 1000V / CAT IV 600V; 9 V, about 200 h; 420 g; lifetime
//   warranty; no LoZ or non-contact voltage listed. Continuity and diode details are not in the 179 spec lines we cite.
// Worked tolerances assume 6,000-count ranges (60.00 V, 600.0 V) and the accuracy lines above; arithmetic, not measurements.
// Neither meter is hands-on tested by OhmSavvy; this page is desk research against published specifications.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-113-vs-fluke-179";

const all = getAllPicks("multimeters");

export const metadata = buildMetadata({
  title: "Fluke 113 vs 179 Comparison: Useful Features",
  description:
    "Fluke 113 vs 179 comparison: a VCHEK utility meter with no amps against a True RMS meter with 10 A, temperature and 1000 V. Which features you will really use.",
  image: all.find((p) => p.name === "Fluke 113")!.image,
  path: "/multimeters/fluke-113-vs-fluke-179",
});

const link = "text-accent hover:underline";

/** Three-column overlap map: what only the 113 has, what both share, and what only the 179 adds. */
function FeatureOverlapDiagram() {
  const col = (x: number, title: string, lines: string[], accent: boolean) => (
    <g>
      <rect
        x={x}
        y="10"
        width="112"
        height="196"
        rx="10"
        className={accent ? "fill-accent/10 stroke-accent" : "fill-surface stroke-border"}
        strokeWidth="1.4"
      />
      <text x={x + 56} y="30" fontSize="10.5" fontWeight="700" textAnchor="middle" className={accent ? "fill-accent" : "fill-foreground"}>
        {title}
      </text>
      {lines.map((l, i) => (
        <text key={l} x={x + 56} y={52 + i * 19} fontSize="8.8" textAnchor="middle" className="fill-foreground">
          {l}
        </text>
      ))}
    </g>
  );
  return (
    <svg
      viewBox="0 0 360 216"
      className="w-full h-auto"
      role="img"
      aria-label="Feature overlap of the Fluke 113 and Fluke 179: only the 113 has the VCHEK low-impedance voltage test with continuity fallback; both share CAT IV 600V, 6,000 counts, a backlight, Min/Max, capacitance and resistance; only the 179 adds current to 10 A, temperature, frequency, high-impedance volts to 1000 V, 50 megohm resistance, Auto Hold and a lifetime warranty"
    >
      {col(4, "Only the 113", ["VCHEK LoZ volts", "≈3 kΩ input", "Drops to continuity", "when circuit is dead", "Ghost voltage drains", "404 g"], false)}
      {col(124, "Both meters", ["CAT IV 600V", "6,000 counts", "Backlight", "Min/Max", "Caps to ≈10,000 µF", "kΩ ohms ±(0.9% + 1)", "9 V battery"], false)}
      {col(244, "Only the 179", ["Amps to 10 A", "Temperature + 80BK", "Frequency 100 kHz", "High-Z volts, 1000 V", "Ohms to 50 MΩ", "Auto Hold, Min/Max-Avg", "Lifetime warranty", "Bar graph"], true)}
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 113 vs Fluke 179: Which Multimeter Offers More Useful Features?",
  path,
  published: "2026-10-29",
  intro:
    "The Fluke 179 offers far more useful features for nearly every buyer: True RMS volts and amps to 10 A, a temperature probe, frequency to 100 kHz, high-impedance volts to 1000 V and resistance to 50 MΩ. The Fluke 113 has exactly one feature the 179 lacks, its VCHEK low-impedance voltage test that falls back to a continuity beep on a dead circuit, and that single trick is only worth choosing if proving power wiring live or dead is your entire workload. This Fluke 113 vs 179 comparison sorts every function by who actually uses it.",
  a: {
    pick: all.find((p) => p.name === "Fluke 113")!,
    imageAlt: "Fluke 113 utility multimeter showing the VCHEK and low impedance dial markings",
    chooseIf: [
      "Most of your readings answer one question: is this conductor live, dead or carrying a phantom charge?",
      "You work in shared conduit and old buildings where induced voltage keeps fooling high-impedance meters",
      "You never measure current, temperature or frequency and want a two-jack meter with nothing extra to set",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 179")!,
    imageAlt: "Fluke 179 True RMS multimeter with backlit display and analog bar graph, front view",
    chooseIf: [
      "You measure amps, from milliamp control signals up to 10 A motor and appliance loads",
      "You check temperatures on bearings, ducts, breakers or heat sinks and want the 80BK probe in the box",
      "You read sensors, drives or electronics where a low-impedance input would distort the result",
    ],
  },
  extraSpecs: [
    { label: "Volts input", a: "VCHEK LoZ only, about 3 kΩ", b: "High impedance, no LoZ listed" },
    { label: "Highest voltage", a: "600 V", b: "1000 V" },
    { label: "DC volts accuracy", a: "±(2.0% + 3)", b: "±(0.09% + 2)" },
    { label: "AC volts accuracy", a: "±(2.0% + 3), 45–500 Hz", b: "±(1.0% + 3)" },
    { label: "Current", a: "None (two jacks)", b: "0.01 mA to 10 A, no µA range" },
    { label: "Resistance", a: "600 Ω to 60 kΩ", b: "Up to 50 MΩ" },
    { label: "Capacitance", a: "1,000 nF to 9,999 µF", b: "Up to 10,000 µF (one Fluke table: 9,999 µF)" },
    { label: "Frequency", a: "Not stated", b: "Up to 100 kHz" },
    { label: "Temperature", a: "None", b: "−40 °C to 400 °C, 80BK probe included" },
    { label: "Bar graph", a: "Not stated", b: "33-segment analog bar graph" },
    { label: "Hold / recording", a: "Min/Max", b: "Min/Max-Average, Auto Hold" },
    { label: "Safety rating", a: "CAT IV 600V per Fluke (Amazon: CAT III 600V / CAT IV 300V)", b: "CAT IV 600V / CAT III 1000V" },
    { label: "Battery", a: "9 V, about 300 h", b: "9 V, about 200 h" },
    { label: "Weight", a: "404 g", b: "420 g" },
    { label: "Warranty", a: "Not stated for a new unit", b: "Lifetime" },
  ],
  differences: [
    "Volts: the 113 can only read voltage through VCHEK, a roughly 3 kΩ input that drains ghost voltage. The 179 has ordinary high-impedance volts to 1000 V and Fluke lists no LoZ mode for it.",
    "Current: the 179 reads 0.01 mA steps up to 10 A. The 113 has two jacks and no current function of any kind.",
    "Temperature and frequency: the 179 reads −40 °C to 400 °C with the included 80BK probe and frequency to 100 kHz. The 113 has neither, and Fluke states no frequency spec for it.",
    "Resistance: the 179 reaches 50 MΩ against the 113's 60 kΩ, though on the kilohm ranges both carry the same ±(0.9% + 1) accuracy.",
    "Identical or nearly so: both are rated CAT IV 600V by Fluke, both use 6,000-count backlit displays and a 9 V battery, and they weigh 404 g and 420 g.",
    "Warranty: Fluke gives the 179 a lifetime warranty; it states no term for a new 113.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Counting features vs counting the ones you use</h2>
        <p className="text-muted leading-7 mb-4">
          A feature only earns its keep if it answers a question you actually ask on the job. So rather than tally dial
          positions, the map below splits the two meters into three groups: what the 113 alone does, what the pair
          share, and what the 179 adds. The middle column is larger than most buyers expect, and the left column is
          a single idea.
        </p>
        <Figure caption={<>Feature overlap drawn from Fluke&apos;s published specifications. The shared column covers the safety rating, display and basic passive measurements.</>}>
          <FeatureOverlapDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Read the right column as a list of jobs. Amps covers motor loads, heater elements and the milliamp draw of a
          control board. Temperature covers bearings, breaker lugs, supply air and heat sinks. Frequency covers drive
          output checks and generator setups. High-impedance volts covers anything electronic. If none of those jobs
          appears in your week, the 179&apos;s advantage shrinks to accuracy, range and warranty; if two or more
          appear, the 113 isn&apos;t really a candidate.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The full function list, side by side</h2>
        <DataTable
          head={["Function", "Fluke 113", "Fluke 179", "Who uses it"]}
          rows={[
            ["LoZ voltage test", "Yes, VCHEK ≈3 kΩ", "No", "Electricians chasing phantom readings"],
            ["Volts with auto continuity fallback", "Yes", "No", "Utility live/dead verification"],
            ["High-impedance volts", "No", "Yes, to 1000 V", "Controls, sensors, electronics"],
            ["Current", "No", "0.01 mA to 10 A", "HVAC, appliance, motor, automotive"],
            ["Temperature", "No", "−40 °C to 400 °C", "HVAC, maintenance, electronics"],
            ["Frequency", "Not stated", "To 100 kHz", "Drives, generators, power supplies"],
            ["Resistance", "To 60 kΩ", "To 50 MΩ", "Insulation leakage hints, sensors"],
            ["Capacitance", "1,000 nF to 9,999 µF", "To 10,000 µF", "Motor run and start capacitors"],
            ["Continuity", "Beeps below 20 Ω", "Not in the specs we cite", "Everyone"],
            ["Diode test", "2.000 V, ±(2.0% + 3)", "Not in the specs we cite", "Electronics"],
            ["Hold and recording", "Min/Max", "Min/Max-Average, Auto Hold", "Intermittent faults"],
            ["Bar graph", "Not stated", "33 segments", "Watching a reading settle or drift"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Two rows on that list are blank for the 179 only because the Fluke spec lines we work from don&apos;t
          itemize continuity and diode figures for it, not because Fluke says they&apos;re absent. We&apos;d rather
          mark them than guess. Every other cell comes from Fluke&apos;s spec tabs or the 113&apos;s official Amazon
          listing.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The 113&apos;s single exclusive: a voltmeter that can&apos;t be fooled</h2>
        <p className="text-muted leading-7 mb-4">
          Pull a conductor off its breaker in a conduit shared with live circuits and a high-impedance meter like the
          179 will often show tens of volts on it. That charge is coupled through the insulation and can&apos;t drive
          a load, but on the display it looks real. The 113 presents about 3 kΩ across its leads on VCHEK, which
          bleeds that coupled charge away so the reading collapses toward zero. Fluke lists no low-impedance mode for
          the 179, so its owner has to recognize the phantom some other way. Our explainer on{" "}
          <Link href="/multimeters/why-does-my-multimeter-show-voltage-when-measuring-a-disconnected-circuit" className={link}>
            voltage on a disconnected circuit
          </Link>{" "}
          covers why it happens.
        </p>
        <p className="text-muted leading-7 mb-4">
          The second half of VCHEK is what makes it quick. When no voltage is present, the same position turns into a
          continuity check that beeps below 20 Ω. Confirming that a feeder is dead and then confirming which conductor
          it is takes one dial setting instead of two.
        </p>
        <p className="text-muted leading-7">
          That same low input is a handicap away from mains wiring. A 3 kΩ load drags down any weak source, and Fluke
          notes the 113&apos;s autorange needs at least 3 V DC before it registers, so thermostat signals, sensor
          outputs and logic rails are effectively off limits. The{" "}
          <Link href="/multimeters/fluke-113-vs-fluke-115" className={link}>
            Fluke 113 vs Fluke 115
          </Link>{" "}
          page works through that loading arithmetic, and{" "}
          <Link href="/multimeters/fluke-113-vs-fluke-117" className={link}>
            Fluke 113 vs Fluke 117
          </Link>{" "}
          looks at a meter that offers LoZ as a switchable option instead of the only way to read volts.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What the tighter accuracy means on real readings</h2>
        <p className="text-muted leading-7 mb-4">
          Feature lists hide a quieter difference: how close each meter&apos;s voltage reading is guaranteed to be.
          Applying each published accuracy line to two common readings gives these worst-case bands. On a 6,000-count
          meter, 120 V sits on the 600.0 V range (one count is 0.1 V) and 24 V sits on the 60.00 V range (one count is
          0.01 V).
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Worst-case band on 120 V AC, ± volts. Lower is better. Arithmetic on Fluke specs.</>}>
            <BarChart
              items={[
                { label: "113 VCHEK", value: 2.7, display: "±2.7 V" },
                { label: "179 V AC", value: 1.5, display: "±1.5 V", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Worst-case band on 24 V DC, ± volts. Lower is better. Arithmetic on Fluke specs.</>}>
            <BarChart
              items={[
                { label: "113 VCHEK", value: 0.51, display: "±0.51 V" },
                { label: "179 V DC", value: 0.04, display: "±0.04 V", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The working: at 120 V the 113 allows 2.0% (2.4 V) plus 3 counts (0.3 V), so ±2.7 V; the 179 allows 1.0%
          (1.2 V) plus 3 counts, so ±1.5 V. At 24 V DC the 113 allows 0.48 V plus 0.03 V, about ±0.51 V; the 179
          allows 0.09% (about 0.02 V) plus 2 counts (0.02 V), about ±0.04 V. For a live-or-dead decision, ±2.7 V on a
          120 V circuit is irrelevant. For a voltage-drop calculation on a long branch circuit, or checking a 24 V
          control transformer against its nameplate, the 179&apos;s band is roughly a tenth as wide.
        </p>
        <p className="text-muted leading-7 mt-4">
          Resistance is the exception where the two match. On the 6 kΩ and 60 kΩ ranges both are specified at
          ±(0.9% + 1), so a thermistor or coil that fits inside 60 kΩ reads with equal confidence on either. Capacitance
          leans to the 179 at ±(1.2% + 2) against the 113&apos;s ±(1.9% + 2); on a 45 µF run capacitor the percentage
          part alone works out to about ±0.5 µF versus ±0.9 µF, a gap that rarely changes a pass-or-replace call.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Weight, battery and ratings: closer than the feature lists suggest</h2>
        <p className="text-muted leading-7 mb-4">
          It&apos;s easy to assume the bigger feature set comes with a heavier, thirstier meter. The published numbers
          say otherwise. Fluke lists 404 g for the 113 and 420 g for the 179, a 16 g gap you won&apos;t feel on a belt.
          Both run on one 9 V battery; the 113 is rated about 300 hours and the 179 about 200 hours, so the simpler
          meter goes roughly half as long again between battery swaps.
        </p>
        <Figure caption={<>Rated battery life on one 9 V cell, in hours, per Fluke. The simpler 113 lasts about 50% longer.</>}>
          <BarChart
            items={[
              { label: "Fluke 113", value: 300, display: "≈300 h", highlight: true },
              { label: "Fluke 179", value: 200, display: "≈200 h" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The safety ratings also overlap. Fluke rates both meters CAT IV 600V, which covers service drops and the line
          side of a meter base. The 179 adds CAT III 1000V, useful on higher-voltage DC or industrial equipment inside a
          building, and the 113 doesn&apos;t go past 600 V at all. Where the 179 pulls clearly ahead off the spec sheet
          is the warranty: lifetime, against no published term for a new 113.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Your situation", "Better fit", "Reason"]}
          rows={[
            ["Utility crew verifying de-energized lines", "Fluke 113", "VCHEK reads live or dead, then beeps continuity"],
            ["Electrician tracing circuits in crowded old conduit", "Fluke 113", "LoZ input ignores coupled phantom voltage"],
            ["Plant maintenance on motors and panels", "Fluke 179", "Amps to 10 A, temperature, 1000 V and frequency"],
            ["HVAC service calls", "Fluke 179", "Current, the 80BK probe and capacitance; no µA range on either"],
            ["Electronics and control boards", "Fluke 179", "High-impedance volts and DC accuracy of ±(0.09% + 2)"],
            ["Automotive and 12 V systems", "Fluke 179", "The 113 can't read current and needs 3 V DC to autorange"],
            ["One meter for every job in the van", "Fluke 179", "It covers all but the LoZ test"],
            ["Ghost voltage and amps in one tool", "Neither: see the 117", "LoZ on a switch plus current ranges"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <KeyIdea title="Skip the 113 if…">
            You will ever need current, temperature, frequency or readings on electronics. You also give up the
            published lifetime warranty and anything above 600 V. Its accuracy is set for go/no-go decisions, not
            measurement records.
          </KeyIdea>
          <KeyIdea title="Skip the 179 if…">
            Your whole day is proving conductors dead in shared raceways, where its high-impedance input shows phantom
            volts and it has no low-impedance setting. In that narrow role its extra functions sit unused and the
            113&apos;s longer battery life is the better trade.
          </KeyIdea>
        </div>
        <p className="text-muted leading-7 mt-4">
          For the ladder below the 179, the{" "}
          <Link href="/multimeters/fluke-175-vs-fluke-179" className={link}>
            Fluke 175 vs Fluke 179
          </Link>{" "}
          comparison shows what each rung adds. If you want the 179&apos;s breadth plus a LoZ position, the{" "}
          <Link href="/multimeters/fluke-289-vs-fluke-179" className={link}>
            Fluke 289 vs Fluke 179
          </Link>{" "}
          page covers a logging meter with both, and the{" "}
          <Link href="/multimeters/best-multimeter-for-electricians" className={link}>
            best multimeter for electricians
          </Link>{" "}
          guide lists the wider field.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Conflicting published specs to know about</h2>
        <p className="text-muted leading-7 mb-4">
          Both meters carry at least one disagreement between sources. For the 113, Fluke&apos;s spec tab and the
          terminal markings give CAT IV 600V, while one Amazon bullet says CAT III 600V and CAT IV 300V; we follow
          Fluke. Its True RMS claim appears in the Amazon title and on the meter&apos;s front label but only in a
          footnote on Fluke&apos;s spec tab, and Fluke lists a 3-year term only for the reconditioned unit.
        </p>
        <p className="text-muted leading-7">
          For the 179, Fluke&apos;s comparison table names µA as a function and gives 9,999 µF and a 400 °F
          temperature ceiling, while its detailed spec table gives 0.01 mA as the finest current step, 10,000 µF and
          400 °C. We use the spec table, which means the 179 is not a flame-sensor meter; the{" "}
          <Link href="/multimeters/fluke-177-vs-fluke-179" className={link}>
            Fluke 177 vs Fluke 179
          </Link>{" "}
          page lays those rows out, and our{" "}
          <Link href="/multimeters/best-multimeters-for-measuring-microamps" className={link}>
            microamp meter guide
          </Link>{" "}
          lists meters that do read a few microamps.
        </p>
      </section>

      <Callout title="Safety: dead means tested, not assumed">
        Use either meter only within its rating: CAT IV 600V for both at the service entrance, and never above 600 V
        with the 113. A VCHEK check from hot to ground draws real current and can trip a GFCI or RCD, as Fluke warns,
        so test hot to neutral on protected circuits. A near-zero reading is not proof of a safe conductor on its own:
        prove the meter on a known live source, test, then prove it again. Inspect the leads before each use, and leave
        service-entrance and panel work to a licensed electrician if it isn&apos;t your trade.
      </Callout>
    </>
  ),
  bottomLine:
    "For more useful features, buy the Fluke 179: it adds current, temperature, frequency, high-impedance volts to 1000 V, far wider resistance, tighter accuracy and a lifetime warranty while weighing only 16 g more. Pick the Fluke 113 only when your job is verifying power conductors live or dead, where its VCHEK low-impedance test and continuity fallback do something the 179 can't and the missing functions never come up.",
  faqs: [
    {
      question: "Does the Fluke 179 have a low-impedance (LoZ) mode like the 113?",
      answer:
        "No. Fluke lists no LoZ position for the 179, so a disconnected conductor running beside live ones can show a coupled phantom voltage on its high-impedance input. The 113 reads voltage only through VCHEK, roughly 3 kΩ, which drains that charge. If you want both LoZ and current ranges, look at the Fluke 117 or the 289.",
    },
    {
      question: "Can the Fluke 113 measure amps or temperature?",
      answer:
        "Neither. The 113 has two input jacks and no current function, and Fluke lists no thermocouple input for it. The Fluke 179 reads current in 0.01 mA steps up to 10 A and temperature from −40 °C to 400 °C with the 80BK probe Fluke packs in the box. For either job, the 113 would need a second instrument alongside it.",
    },
    {
      question: "Are the Fluke 113 and 179 both CAT IV rated?",
      answer:
        "Yes, per Fluke. Both carry CAT IV 600V, and the 179 also lists CAT III 1000V. One bullet on the 113's Amazon listing quotes a lower CAT III 600V / CAT IV 300V rating, which conflicts with Fluke's spec tab and the meter's own markings. We follow Fluke. The 113 has no ranges above 600 V either way.",
    },
    {
      question: "Which battery lasts longer, the Fluke 113 or 179?",
      answer:
        "The 113. Fluke rates it at about 300 hours on a 9 V battery against about 200 hours for the 179, both figures without the backlight. That is roughly 50% more running time for the 113. Weight is almost identical: 404 g for the 113 and 420 g for the 179, so neither is noticeably easier to carry.",
    },
    {
      question: "Can the Fluke 179 test a furnace flame sensor?",
      answer:
        "Not by Fluke's detailed spec table, which gives 0.01 mA (10 µA) as the 179's finest current step. A flame-rod signal is typically only a few microamps. Fluke's comparison table on the same page mentions µA, so the sources conflict; we follow the spec table. The 113 has no current function at all, so neither suits that test.",
    },
    {
      question: "Is the Fluke 113 good for electronics or automotive work?",
      answer:
        "No. Every voltage reading passes through its 3 kΩ VCHEK input, which loads weak signals, and Fluke notes the autorange needs at least 3 V DC to register. It has no current function for drain tests and resistance stops at 60 kΩ. The 179's high-impedance volts, 0.01 mA current steps and 50 MΩ range suit both jobs much better.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 113 vs Fluke 117", href: "/multimeters/fluke-113-vs-fluke-117" },
    { label: "Fluke 113 vs Fluke 115", href: "/multimeters/fluke-113-vs-fluke-115" },
    { label: "Fluke 117 vs Fluke 179", href: "/multimeters/fluke-117-vs-fluke-179" },
    { label: "Fluke 177 vs Fluke 179", href: "/multimeters/fluke-177-vs-fluke-179" },
    { label: "Fluke 175 vs Fluke 179", href: "/multimeters/fluke-175-vs-fluke-179" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
  ],
};

export default function Fluke113VsFluke179Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
