// Fluke 289 facts per the Fluke 289 Pick in src/lib/multimeter-catalog.ts (specs per fluke.com, the 289 datasheet and
// the 287/289 Users Manual) and the manual-sourced "Specs per" comment on /multimeters/fluke-289-vs-fluke-287 (Fluke
// "287/289 True-rms Digital Multimeters Users Manual", Rev. 2, 3/09, checked 2026-10-27): 50,000 counts; True RMS;
// DC V ±(0.025% + 2) on 500 mV to 50 V; AC V 45-65 Hz ±(0.3% + 25); ranges 50.000 V / 500.00 V / 1000.0 V;
// 500 µA range at 0.01 µA, 5000 µA, 50 mA at 0.001 mA, 400 mA, 5 A, 10 A; 50 Ω low-ohm range at 0.001 Ω (289 only),
// up to 10 mA test current, REL only; resistance to 500 MΩ; capacitance 1 nF to 100 mF (also stated in the Fluke 287
// Pick's verdict as shared with the 289); frequency 0.5 Hz to 999.99 kHz; duty cycle; temperature -200 to +1350 °C
// ±(1% + 10) excluding probe; Peak 250 µs; MIN MAX; recording up to 10,000 sample intervals plus events; real-time
// clock; IR link to FlukeView Forms; LoZ AC volts, 3.2 kΩ input (289 only); AC low-pass filter that blocks above 1 kHz,
// manual ranging only (289 only); 6 AA, 100 h minimum, 200 h in logging mode; 871 g; CAT III 1000V / CAT IV 600V;
// lifetime limited warranty. Probe in the box, IP rating and drop height: not stated in our data.
// Conflict: /multimeters/fluke-87v-vs-fluke-289 (built from the Pick only) lists the 289's weight, battery, warranty,
// frequency and temperature as "Not stated"; the 287/289 manual does state them, and we use the manual here.
// Fluke 179 facts per the Fluke 179 Pick in src/app/multimeters/best-multimeters/page.tsx (fluke.com 179 page and the
// 170 Series datasheet) and the Fluke-sourced comments on /multimeters/fluke-177-vs-fluke-179 and
// /multimeters/fluke-87v-vs-fluke-179 (checked 2026-10-26/27): 6,000 counts, analog bar graph, backlight; True RMS;
// DC V ±(0.09% + 2); AC V ±(1.0% + 3); DC A ±(1.0% + 3); 0.01 mA best resolution, 10 A, no µA range; 50 MΩ;
// 10,000 µF (one Fluke table says 9,999 µF); 100 kHz ±(0.1% + 1); temperature -40 °C to 400 °C ±(1.0% + 10) with the
// included 80BK probe; Auto Hold and Min/Max-Average; no low-pass filter or LoZ listed; one 9 V, about 200 h;
// 43 × 90 × 185 mm, 420 g; CAT III 1000V / CAT IV 600V; lifetime warranty. IP rating and drop height: not stated.
// Neither meter is hands-on tested by OhmSavvy; this page is desk research against Fluke's published specifications.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-289-vs-fluke-179";

export const metadata = buildMetadata({
  title: "Fluke 289 vs Fluke 179 for Industrial Maintenance",
  description:
    "Fluke 289 vs Fluke 179 comparison for plant maintenance: same CAT IV 600V rating, but the 289 adds logging, a drive filter, LoZ and µA. Which one to carry.",
  path: "/multimeters/fluke-289-vs-fluke-179",
});

const link = "text-accent hover:underline";
const all = getAllPicks("multimeters");

/**
 * Illustrative: what each meter leaves you with after watching a motor control circuit for a shift. The 179's
 * Min/Max-Average keeps three numbers; the 289's recording keeps a time-stamped list of intervals and events.
 * Values are invented for shape only.
 */
function MinMaxVsRecordingDiagram() {
  const events = [
    { x: 96, label: "07:42", v: "21.6 V" },
    { x: 182, label: "11:15", v: "22.9 V" },
    { x: 268, label: "14:03", v: "21.9 V" },
  ];
  return (
    <svg
      viewBox="0 0 360 200"
      className="w-full h-auto"
      role="img"
      aria-label="Illustrative diagram of a 24 volt control supply watched for one shift. The Fluke 179's Min/Max-Average mode keeps three numbers: the lowest reading, the highest reading and the average. The Fluke 289's recording keeps a time-stamped list of every sag, so you can match each dip to the machine event that caused it."
    >
      <text x="12" y="18" fontSize="10" fontWeight="600" className="fill-foreground">
        Fluke 179: Min/Max-Average
      </text>
      <rect x="12" y="26" width="336" height="40" rx="6" className="fill-surface stroke-border" strokeWidth="1" />
      <text x="40" y="51" fontSize="10" className="fill-foreground" fontFamily="ui-monospace, monospace">
        MIN 21.6 V
      </text>
      <text x="150" y="51" fontSize="10" className="fill-foreground" fontFamily="ui-monospace, monospace">
        MAX 24.2 V
      </text>
      <text x="258" y="51" fontSize="10" className="fill-foreground" fontFamily="ui-monospace, monospace">
        AVG 23.9 V
      </text>
      <text x="12" y="92" fontSize="10" fontWeight="600" className="fill-foreground">
        Fluke 289: recorded intervals and events
      </text>
      <line x1="24" x2="340" y1="140" y2="140" className="stroke-border" strokeWidth="1" />
      <text x="24" y="156" fontSize="8.5" className="fill-muted">
        06:00
      </text>
      <text x="340" y="156" fontSize="8.5" textAnchor="end" className="fill-muted">
        18:00
      </text>
      {events.map((e) => (
        <g key={e.label}>
          <line x1={e.x} x2={e.x} y1="108" y2="140" className="stroke-accent" strokeWidth="2" />
          <circle cx={e.x} cy="108" r="3.5" className="fill-accent" />
          <text x={e.x} y="102" fontSize="8.5" textAnchor="middle" className="fill-accent">
            {e.v}
          </text>
          <text x={e.x} y="168" fontSize="8.5" textAnchor="middle" className="fill-foreground">
            {e.label}
          </text>
        </g>
      ))}
      <text x="180" y="190" fontSize="8.5" textAnchor="middle" className="fill-muted">
        Illustrative values. Three numbers versus a timeline you can match to the machine log.
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 289 vs Fluke 179: Which Is Better for Industrial Maintenance?",
  path,
  published: "2026-10-28",
  intro:
    "For industrial maintenance, the Fluke 179 is the better everyday meter for most technicians, and the Fluke 289 is the better tool for the faults that don't show up while you're standing there. Both carry CAT IV 600V / CAT III 1000V, both are True RMS and both read temperature. The 289 adds unattended recording with timestamps, a low-pass filter for drive outputs, LoZ, a microamp range and 50,000 counts; the 179 is half the weight, simpler to use and runs on one 9 V battery.",
  a: {
    pick: all.find((p) => p.name === "Fluke 289")!,
    imageAlt: "Fluke 289 True RMS logging multimeter for industrial maintenance, front view",
    chooseIf: [
      "You chase nuisance trips, sags and dropouts that happen between rounds, not while you watch",
      "You measure variable-frequency drive outputs and want a low-pass filter on the meter",
      "You also need microamps, LoZ for ghost voltage, or milliohm contact checks in one instrument",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 179")!,
    imageAlt: "Fluke 179 True RMS multimeter with thermocouple, front view",
    chooseIf: [
      "Your shift is mostly verifying voltage, current, continuity and temperature on fixed-speed equipment",
      "Min/Max-Average is enough to confirm a sag happened, and you don't need to know when",
      "You want a lighter meter on a single 9 V battery, with the same CAT IV 600V rating",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "50,000 counts", b: "6,000 counts, analog bar graph" },
    { label: "DC volts accuracy", a: "±(0.025% + 2)", b: "±(0.09% + 2)" },
    { label: "AC volts accuracy", a: "±(0.3% + 25) at 45–65 Hz", b: "±(1.0% + 3)" },
    { label: "Recording", a: "Up to 10,000 intervals plus events, real-time clock", b: "Min/Max-Average, Auto Hold" },
    { label: "Low-pass filter", a: "Yes, blocks above 1 kHz (manual ranging)", b: "Not listed by Fluke" },
    { label: "LoZ (ghost voltage)", a: "Yes, 3.2 kΩ AC volts input", b: "Not listed by Fluke" },
    { label: "Peak capture", a: "250 µs", b: "Not listed by Fluke" },
    { label: "Finest current step", a: "0.01 µA (500 µA range)", b: "0.01 mA; no µA range" },
    { label: "Resistance", a: "50 Ω range at 0.001 Ω; up to 500 MΩ", b: "Up to 50 MΩ" },
    { label: "Capacitance", a: "1 nF to 100 mF", b: "Up to 10,000 µF (one Fluke table: 9,999 µF)" },
    { label: "Frequency", a: "0.5 Hz to 999.99 kHz", b: "Up to 100 kHz" },
    { label: "Temperature", a: "-200 to 1350 °C, excluding probe", b: "-40 to 400 °C, 80BK probe included" },
    { label: "PC transfer", a: "IR link, FlukeView Forms", b: "None listed" },
    { label: "Battery", a: "6 AA; 100 h minimum, 200 h logging", b: "One 9 V, about 200 h" },
    { label: "Weight", a: "871 g", b: "420 g" },
    { label: "IP rating / drop height", a: "Not stated", b: "Not stated" },
    { label: "Warranty", a: "Lifetime limited", b: "Lifetime" },
  ],
  differences: [
    "Recording: the 289 stores up to 10,000 time-stamped intervals plus events and graphs them on screen. The 179 keeps a running minimum, maximum and average, with no timeline.",
    "Drives: only the 289 has a low-pass filter (it blocks content above 1 kHz and forces manual ranging). Fluke lists no filter for the 179.",
    "Low current: the 289 resolves 0.01 µA on its 500 µA range. The 179's finest step is 0.01 mA and it has no microamp range.",
    "Ghost voltage: the 289 has a LoZ position with a 3.2 kΩ input; the 179 doesn't.",
    "Accuracy: DC volts is ±(0.025% + 2) on the 289 against ±(0.09% + 2) on the 179, on a 50,000-count display against 6,000 counts.",
    "Carrying it: the 179 weighs 420 g on one 9 V cell; the 289 weighs 871 g and takes six AA cells.",
    "Identical: CAT III 1000V / CAT IV 600V, True RMS, a thermocouple input and a lifetime warranty (Fluke calls the 289's a lifetime limited warranty).",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">The maintenance question in one table</h2>
        <p className="text-muted leading-7 mb-4">
          A maintenance technician doesn&apos;t buy a meter for a spec sheet. The useful test is which jobs on a
          typical plant shift each meter finishes on its own, and which ones send you back to the crib for another
          instrument. We put the common ones side by side using Fluke&apos;s published functions. Neither meter has been
          hands-on tested by OhmSavvy, so this is desk research against Fluke&apos;s manual and spec pages.
        </p>
        <DataTable
          head={["Shift task", "Fluke 289", "Fluke 179", "Edge"]}
          rows={[
            ["Verify 480 V at an MCC bucket", "CAT IV 600V", "CAT IV 600V", "Equal"],
            ["Read a VFD output", "1 kHz low-pass filter", "No filter listed", "289"],
            ["Nuisance trip once a shift", "Time-stamped recording", "Min/Max-Average", "289"],
            ["Ghost voltage on a spare conductor", "LoZ, 3.2 kΩ", "Not listed", "289"],
            ["4-20 mA transmitter check", "0.001 mA on the 50 mA range", "0.01 mA steps", "Either"],
            ["Flame-rod microamps on a burner", "0.01 µA steps", "No µA range", "289"],
            ["Motor frame or bearing temperature", "Thermocouple input", "80BK probe included", "Either"],
            ["Contactor or busbar joint resistance", "50 Ω range, 0.001 Ω", "Standard ohms to 50 MΩ", "289"],
            ["All-day carry on a tool belt", "871 g, 6 AA", "420 g, one 9 V", "179"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The pattern is plain: the 179 matches the 289 on safety, True RMS and the routine verify-and-move-on tasks,
          and the 289 pulls ahead wherever time, filtering or very small quantities enter the job. How much that
          matters depends on how many drives and intermittent faults your site has.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Min/Max-Average versus a real recording</h2>
        <p className="text-muted leading-7 mb-4">
          Both meters can sit on a circuit while you walk away, but they remember very different things. The
          179&apos;s Min/Max-Average mode updates three registers: the lowest reading, the highest and a running average.
          When you come back you know a 24 V control supply sagged to some value, but not when, how often or for how
          long. The 289 records intervals and events against a real-time clock, up to 10,000 intervals in Fluke&apos;s
          manual, and plots them on its own screen so you can scroll back through the shift.
        </p>
        <Figure
          caption={
            <>
              Illustrative values, not a recording. The 179 tells you the worst sag; the 289 tells you each sag and the
              time it happened.
            </>
          }
        >
          <MinMaxVsRecordingDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          That timeline is what turns a recurring fault into a work order you can close. If the dips line up with a
          compressor start or a press cycle, you know where to look. A minimum value alone confirms there&apos;s a
          problem but leaves you guessing at the cause. The 289&apos;s IR link also moves the record into FlukeView Forms
          on a PC, which helps when a contractor, an OEM or a reliability engineer asks for evidence. For the general
          method, see our guide on{" "}
          <Link href="/multimeters/how-to-find-an-intermittent-electrical-fault-with-a-multimeter" className={link}>
            finding an intermittent electrical fault
          </Link>
          .
        </p>
        <KeyIdea title="When the 179's three numbers are enough">
          If you only need to prove a voltage stays inside a band across a cycle, such as a control transformer that
          should never drop below a relay&apos;s pick-up voltage, Min/Max-Average answers the question. You need the
          289&apos;s recording when the answer depends on timing.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Accuracy at plant voltages</h2>
        <p className="text-muted leading-7 mb-4">
          The 289 is the more precise instrument on paper, by a wide margin. Fluke lists ±(0.025% + 2) DC on its
          lower ranges and ±(0.3% + 25) AC at 45–65 Hz; the 179 is ±(0.09% + 2) DC and ±(1.0% + 3) AC. A percentage
          is easier to judge as volts, so here is the worst-case allowance at two readings, using the resolution of
          the range each reading falls on.
        </p>
        <DataTable
          head={["Reading", "Fluke 289 allowance", "Fluke 179 allowance"]}
          rows={[
            ["24.000 V DC control supply", "0.006 + 0.002 = ±0.008 V", "0.022 + 0.02 = ±0.042 V"],
            ["480.0 V AC, 60 Hz feeder", "1.44 + 0.25 = ±1.69 V", "4.8 + 0.3 = ±5.1 V"],
          ]}
        />
        <div className="mt-4 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Worst-case allowance on a 24 V DC reading, from Fluke&apos;s accuracy lines. Lower is better.</>}>
            <BarChart
              items={[
                { label: "Fluke 289", value: 0.008, display: "±0.008 V", highlight: true },
                { label: "Fluke 179", value: 0.042, display: "±0.042 V" },
              ]}
            />
          </Figure>
          <Figure caption={<>Worst-case allowance on a 480 V AC reading at 60 Hz. Lower is better.</>}>
            <BarChart
              items={[
                { label: "Fluke 289", value: 1.69, display: "±1.69 V", highlight: true },
                { label: "Fluke 179", value: 5.1, display: "±5.1 V" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The arithmetic: 0.025% of 24 V is 0.006 V, plus 2 counts of 0.001 V on the 289&apos;s 50.000 V range; the
          179&apos;s 0.09% is 0.0216 V, plus 2 counts of 0.01 V on its 60.00 V range. At 480 V the 289 sits on its 500.00 V
          range (25 counts of 0.01 V), the 179 on its 600.0 V range (3 counts of 0.1 V). These are limits from published
          specs, not measurements. For a go/no-go check on a 480 V feeder, ±5.1 V is perfectly usable; the 289&apos;s
          margin matters when you trend slow drift or check a transducer&apos;s output.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Drives, LoZ and the CAT rating</h2>
        <p className="text-muted leading-7 mb-4">
          The CAT rating is a tie. Both are rated CAT III 1000V and CAT IV 600V, so either can go from the service
          entrance down to a machine&apos;s control panel. The split comes from the 289&apos;s two field functions. Its
          low-pass filter blocks AC content above 1 kHz so a drive&apos;s output reads close to the fundamental the motor
          responds to; with the filter on, the meter switches to manual ranging. Fluke lists no such filter for the 179,
          so on a PWM drive output its True RMS reading includes the switching energy and can sit well away from the
          value the drive&apos;s own display shows.
        </p>
        <p className="text-muted leading-7 mb-4">
          LoZ is the second. On long cable runs in trays, an isolated conductor picks up voltage capacitively from its
          live neighbors, and a 10 MΩ meter input shows it as a real-looking reading. The 289&apos;s LoZ position loads
          the line with about 3.2 kΩ and collapses that phantom. A 179 user has to reason it out or carry a separate
          tester. The 289 also lists 250 µs peak capture, which Fluke doesn&apos;t list for the 179.
        </p>
        <Callout title="Filter and LoZ have limits">
          Fluke warns not to use the low-pass filter to decide whether voltage is present, because it can hide some of
          it: test unfiltered first. Don&apos;t use LoZ on circuits that a roughly 3 kΩ load could disturb or damage.
          Whatever the CAT rating, follow your site&apos;s lockout/tagout and arc-flash rules, and prove the meter on a
          known live source before and after a dead test. Drive DC bus capacitors can stay charged after isolation.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Current, temperature and resistance on the plant floor</h2>
        <p className="text-muted leading-7 mb-4">
          Current is where the 179 runs out first. Its finest step is 0.01 mA and it has no microamp range, which is
          fine for a 4-20 mA loop (0.01 mA is 0.0625% of the 16 mA span) but rules out flame-rod current on burner
          management systems, typically a few microamps. The 289&apos;s 500 µA range resolves 0.01 µA, and its 50 mA range
          resolves 0.001 mA for loop work. Both top out at 10 A, so motor current still goes to a clamp meter.
        </p>
        <Figure caption={<>Finest current step, log scale. The 289 resolves 1,000 times smaller steps than the 179.</>}>
          <BarChart
            log
            items={[
              { label: "Fluke 289", value: 0.01, display: "0.01 µA", highlight: true },
              { label: "Fluke 179", value: 10, display: "0.01 mA" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Temperature is closer than the ranges suggest. The 289 accepts -200 to 1350 °C excluding the probe, the 179
          -40 to 400 °C, and Fluke ships the 179 with the 80BK bead probe. Our data doesn&apos;t say whether a probe comes
          with the 289. Motor frames, bearings, enclosures and panel hot spots all sit inside the 179&apos;s range; the
          289&apos;s reach only helps with a suitable high-temperature probe on ovens, kilns or cryogenic lines.
        </p>
        <p className="text-muted leading-7 mt-4">
          On resistance the 289 has a 50 Ω range that resolves 0.001 Ω using up to 10 mA of test current, with REL to
          subtract the leads. That makes it possible to compare contact resistance across a contactor&apos;s poles or a
          bolted busbar joint. It&apos;s still two-terminal, not four-wire Kelvin. The 179 reads up to 50 MΩ with no
          low-ohm range, adequate for continuity, coils and heater elements. Our{" "}
          <Link href="/multimeters/best-multimeters-for-measuring-low-resistance" className={link}>
            low-resistance meter guide
          </Link>{" "}
          covers dedicated alternatives.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Weight, batteries and daily carry</h2>
        <p className="text-muted leading-7 mb-4">
          Fluke lists the 289 at 871 g on six AA cells, rated 100 hours minimum and 200 hours in logging mode. The 179
          weighs 420 g on one 9 V battery, about 200 hours. Neither spec source we use gives an IP rating or drop height,
          so we don&apos;t rank them on ruggedness. Both carry lifetime warranties, so long-term support is a wash.
        </p>
        <Figure caption={<>Weight per Fluke. The 179 is less than half the 289&apos;s mass.</>}>
          <BarChart
            items={[
              { label: "Fluke 289", value: 871, display: "871 g" },
              { label: "Fluke 179", value: 420, display: "420 g", highlight: true },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          In practice many maintenance departments solve this by owning both: a 179-class meter for every technician
          and a 289 kept in the shop for the faults that need a recording. If you can only carry one, decide by how
          often you face drives and intermittent faults.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Scenario", "Better fit", "Deciding spec"]}
          rows={[
            ["Plant with many variable-frequency drives", "Fluke 289", "Low-pass filter, 250 µs peak"],
            ["Trips or resets nobody can catch live", "Fluke 289", "Time-stamped recording"],
            ["Reliability reports and OEM warranty claims", "Fluke 289", "Logged data to FlukeView Forms"],
            ["Burner and boiler flame-rod checks", "Fluke 289", "500 µA range at 0.01 µA"],
            ["Facilities rounds: lighting, HVAC, pumps", "Fluke 179", "Same CAT IV 600V, lighter, simpler"],
            ["Bearing and motor temperatures", "Fluke 179", "80BK probe in the box"],
            ["Apprentice or second-shift meter", "Fluke 179", "Fewer modes, one 9 V battery"],
            ["Service entrance and switchgear", "Either", "CAT III 1000V / CAT IV 600V on both"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Who should buy or skip each</h2>
        <InfoCards
          items={[
            { label: "Buy the 289", desc: "Controls and reliability techs who need evidence of when a fault happened." },
            { label: "Skip the 289", desc: "If you diagnose live and never leave a meter connected; you'd carry extra weight for nothing." },
            { label: "Buy the 179", desc: "Maintenance generalists on fixed-speed motors, lighting, heaters and HVAC." },
            { label: "Skip the 179", desc: "If drives, flame rods or overnight logging are part of every week." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If the choice is really between two field meters, read{" "}
          <Link href="/multimeters/fluke-87v-vs-fluke-179" className={link}>
            Fluke 87V vs Fluke 179
          </Link>
          ; the 87V adds a drive filter and peak capture without the logging. For the 289 against the 87V, see{" "}
          <Link href="/multimeters/fluke-87v-vs-fluke-289" className={link}>
            Fluke 87V vs Fluke 289
          </Link>
          , and for the 289 against its bench sibling, see{" "}
          <Link href="/multimeters/fluke-289-vs-fluke-287" className={link}>
            Fluke 289 vs Fluke 287
          </Link>
          . Both meters also appear in our{" "}
          <Link href="/multimeters/best-multimeter-for-electricians" className={link}>
            best multimeter for electricians
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/best-multimeters-for-4-20ma-loop-testing" className={link}>
            4-20 mA loop testing
          </Link>{" "}
          guides.
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Buy the Fluke 179 as the everyday industrial maintenance meter: same CAT IV 600V protection, True RMS, an included temperature probe and a lifetime warranty, at less than half the weight. Buy the Fluke 289 when your work includes drives, intermittent trips you can't watch for, flame-rod microamps or reports that need recorded data. It is a troubleshooting and documentation instrument, not a lighter daily meter.",
  faqs: [
    {
      question: "Is the Fluke 289 better than the Fluke 179 for industrial maintenance?",
      answer:
        "For drive work and intermittent faults, yes: the 289 adds a 1 kHz low-pass filter, time-stamped recording, LoZ and a microamp range. For routine rounds the 179 does the same core jobs with the same CAT IV 600V rating, at 420 g against 871 g. Many sites keep one 289 in the shop and give each technician a 179-class meter.",
    },
    {
      question: "Does the Fluke 179 have data logging?",
      answer:
        "No. It has Min/Max-Average and Auto Hold, which keep the lowest, highest and average readings but not when they happened. Fluke lists no recording memory, clock or PC link for it. The Fluke 289 records up to 10,000 intervals plus events against a real-time clock and transfers them over its IR link.",
    },
    {
      question: "Can the Fluke 179 measure VFD output voltage?",
      answer:
        "It will show a True RMS number, but Fluke lists no low-pass filter for the 179, so the reading includes the drive's switching energy and may not match what the motor sees. The 289 has a filter that blocks content above 1 kHz, which brings the reading close to the fundamental. Measure unfiltered first to confirm voltage is present.",
    },
    {
      question: "Do the Fluke 289 and 179 have the same safety rating?",
      answer:
        "Yes. Fluke rates both CAT III 1000V and CAT IV 600V, so either is suitable from the service entrance and switchgear down to machine control panels. The rating covers transient protection only; lockout/tagout, arc-flash PPE and proving the meter on a known live source still apply on every job.",
    },
    {
      question: "Can the Fluke 179 measure microamps for flame sensors?",
      answer:
        "No. The 179's finest current step is 0.01 mA and Fluke's spec table lists no microamp range, though one comparison table on Fluke's page mentions µA. We follow the spec table. Flame-rod signals are typically a few microamps, so you need the 289's 500 µA range, which resolves 0.01 µA, or another meter with a µA input.",
    },
    {
      question: "How long do the batteries last in the Fluke 289 and 179?",
      answer:
        "Fluke lists the 289 at 100 hours minimum on six AA cells, rising to 200 hours in logging mode, and the 179 at about 200 hours on one 9 V battery. For a multi-day recording run on the 289, start with fresh cells, because a flat battery ends the record early.",
    },
  ],
  roundup: { label: "See the best multimeters for electricians", href: "/multimeters/best-multimeter-for-electricians" },
  related: [
    { label: "Fluke 87V vs Fluke 179", href: "/multimeters/fluke-87v-vs-fluke-179" },
    { label: "Fluke 87V vs Fluke 289", href: "/multimeters/fluke-87v-vs-fluke-289" },
    { label: "Fluke 289 vs Fluke 287", href: "/multimeters/fluke-289-vs-fluke-287" },
    { label: "Fluke 177 vs Fluke 179", href: "/multimeters/fluke-177-vs-fluke-179" },
    { label: "Fluke 289 vs Fluke 115", href: "/multimeters/fluke-289-vs-fluke-115" },
    { label: "Best multimeters for 4-20 mA loop testing", href: "/multimeters/best-multimeters-for-4-20ma-loop-testing" },
    { label: "Full multimeter roundup", href: "/multimeters/best-multimeters" },
  ],
};

export default function Fluke289VsFluke179Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
