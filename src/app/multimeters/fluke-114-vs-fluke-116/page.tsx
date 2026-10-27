// Specs per the Picks in src/lib/multimeter-catalog.ts (Fluke 114, Fluke 116) and the sources already cited on
// fluke-114-vs-fluke-115, fluke-114-vs-fluke-117, fluke-116-vs-fluke-115 and fluke-116-vs-fluke-117 (checked 2026-10-27):
// - Fluke 114 product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-114
//   (True RMS AC V and AC mV; DC V and DC mV ±(0.5% + 2); AC V ±(1.0% + 3) 45-500 Hz; Auto V LoZ 600.0 V ±(2.0% + 3),
//   automatic AC/DC selection; resistance 600.0 Ω to 6.000 MΩ ±(0.9% + 1), 40.00 MΩ ±(5% + 2); continuity beeps <20 Ω,
//   off >250 Ω; 6,000 counts, 33-segment bar graph; white LED backlight; Min/Max/Average with elapsed time; auto-ranging
//   with manual override; CAT III 600 V; 9 V, 400 h; 167 × 84 × 46 mm, 550 g; 3-year warranty. Conflicts: the overview
//   says "voltage and current" but the spec table lists no current ranges and the meter has only COM and + jacks; a
//   temperature footnote appears with no temperature function listed. Amazon B000IZ9FD0 gives 0.51 kg.)
// - Fluke 116 product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-116
//   (600.0 µA AC/DC at 0.1 µA, DC ±(1.0% + 2), AC ±(1.5% + 3); no mA or A ranges; Type K temperature -40 to 400 °C
//   (-40 to 752 °F) at 0.1 °C, ±(1% + 10), probe error excluded, 80BK probe in the box; Auto V/LoZ 600.0 V ±(2.0% + 3);
//   DC mV 600.0 mV ±(0.5% + 2); DC V ±(0.5% + 2), AC V ±(1.0% + 3); capacitance to 9,999 µF ±(1.9% + 2) (100.0 µF
//   range at 0.1 µF steps); resistance to 40.00 MΩ; frequency to 50.00 kHz; 6,000 counts + 33-segment bar graph;
//   Min/Max/Avg; CAT III 600 V; 9 V, 400 h; 167 × 84 × 46 mm, 550 g; 3-year warranty; no VoltAlert listed;
//   auto-ranging not stated (the Pick notes a manual RANGE button)).
// - Fluke 114/115/116/117 datasheet (2793260b): https://media.fluke.com/ce54d963-3be9-4e70-8a3e-b1060070fdfd_original%20file.pdf
//   (µA and temperature on the 116 only; AutoVolt LoZ about 3 kΩ on the 114, 116 and 117; normal V input >10 MΩ DC,
//   >5 MΩ AC; capacitance and frequency not on the 114).
// The 35 µF ±6% run capacitor is an illustrative label value, hedged on the page.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-114-vs-fluke-116";

export const metadata = buildMetadata({
  title: "Fluke 114 vs Fluke 116: Electrician or HVAC?",
  description:
    "Fluke 114 vs 116 comparison: same LoZ core and case, but the 116 adds microamps, temperature and capacitance for HVAC. Which meter fits an electrician's work.",
  path: "/multimeters/fluke-114-vs-fluke-116",
});

const link = "text-accent hover:underline";
const all = getAllPicks("multimeters");

/**
 * Nested function map: per Fluke's published specs, everything the 114 measures is also on the 116,
 * and the 116 adds four HVAC-oriented functions around that shared core.
 */
function FunctionMapDiagram() {
  return (
    <svg
      viewBox="0 0 360 250"
      className="w-full h-auto"
      role="img"
      aria-label="Nested diagram: the Fluke 114's functions, True RMS volts, millivolts, AutoVolt LoZ, resistance to 40 megohms, continuity and Min Max Average, sit inside the Fluke 116's set, which adds microamps, Type K temperature, capacitance and frequency; neither meter has an amps range"
    >
      <rect x="8" y="8" width="344" height="200" rx="16" className="fill-surface stroke-accent" strokeWidth="1.6" />
      <text x="20" y="28" fontSize="11" fontWeight="700" className="fill-accent">Fluke 116</text>
      <rect x="20" y="40" width="190" height="156" rx="12" className="fill-accent/10 stroke-foreground" strokeWidth="1.4" />
      <text x="32" y="60" fontSize="11" fontWeight="700" className="fill-foreground">Fluke 114 (shared core)</text>
      <text x="32" y="82" fontSize="9.5" className="fill-foreground">True RMS AC volts to 600 V</text>
      <text x="32" y="100" fontSize="9.5" className="fill-foreground">DC volts and millivolts</text>
      <text x="32" y="118" fontSize="9.5" className="fill-foreground">AutoVolt LoZ, about 3 kΩ</text>
      <text x="32" y="136" fontSize="9.5" className="fill-foreground">Resistance to 40 MΩ</text>
      <text x="32" y="154" fontSize="9.5" className="fill-foreground">Continuity beeper</text>
      <text x="32" y="172" fontSize="9.5" className="fill-foreground">Min/Max/Avg, backlight</text>
      <text x="32" y="188" fontSize="9" className="fill-muted">CAT III 600V, 550 g, 9 V</text>
      <text x="228" y="62" fontSize="9.5" fontWeight="700" className="fill-accent">116 adds:</text>
      <text x="228" y="84" fontSize="9.5" className="fill-foreground">600.0 µA, 0.1 µA</text>
      <text x="228" y="106" fontSize="9.5" className="fill-foreground">Type K temperature</text>
      <text x="228" y="128" fontSize="9.5" className="fill-foreground">Capacitance</text>
      <text x="228" y="150" fontSize="9.5" className="fill-foreground">Frequency to 50 kHz</text>
      <text x="228" y="172" fontSize="9" className="fill-muted">80BK probe in box</text>
      <rect x="8" y="218" width="344" height="26" rx="8" className="fill-surface stroke-border" strokeWidth="1.2" />
      <text x="180" y="235" fontSize="9.5" textAnchor="middle" className="fill-foreground">Outside both: amps and milliamps. Load current needs a clamp meter.</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 114 vs Fluke 116: Which Meter Fits Your Work?",
  path,
  published: "2026-10-28",
  intro:
    "Pick the Fluke 114 if you are an electrician who checks voltage, continuity and resistance on building wiring; pick the Fluke 116 if you service furnaces, boilers or air conditioning. The two share a case, a True RMS voltage core, AutoVolt LoZ and a CAT III 600V rating. The 116 adds a 600.0 µA flame-sensor range, Type K temperature, capacitance and frequency. Neither reads load amps, so both belong next to a clamp meter.",
  a: {
    pick: all.find((p) => p.name === "Fluke 114")!,
    imageAlt: "Fluke 114 electrician's True RMS multimeter with the AUTO-V LoZ dial position, front view",
    chooseIf: [
      "Your day is receptacles, switch legs, feeders and panels, not heating equipment",
      "You want the shortest dial in the series, with LoZ and nothing you won't use",
      "You carry a clamp meter for current and never need to read a capacitor",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 116")!,
    imageAlt: "Fluke 116 HVAC True RMS multimeter with microamp and temperature functions, front view",
    chooseIf: [
      "You check gas furnace flame sensors, which need a microamp range",
      "You want supply, return or line temperature without a second instrument",
      "You test run and start capacitors on condensers, blowers and pumps",
    ],
  },
  extraSpecs: [
    { label: "AutoVolt LoZ", a: "600.0 V, ±(2.0% + 3)", b: "600.0 V, ±(2.0% + 3)" },
    { label: "DC / AC volts accuracy", a: "±(0.5% + 2) / ±(1.0% + 3)", b: "±(0.5% + 2) / ±(1.0% + 3)" },
    { label: "Millivolts", a: "AC and DC mV", b: "DC mV, 600.0 mV (AC mV not stated)" },
    { label: "Current", a: "None (two jacks)", b: "600.0 µA AC/DC only, 0.1 µA steps" },
    { label: "Temperature", a: "None", b: "-40 to 400 °C, Type K, 80BK probe included" },
    { label: "Capacitance", a: "Not listed", b: "To 9,999 µF, ±(1.9% + 2)" },
    { label: "Frequency", a: "Not listed", b: "To 50.00 kHz" },
    { label: "Resistance", a: "To 40.00 MΩ", b: "To 40.00 MΩ" },
    { label: "Display", a: "6,000 counts + 33-segment bar graph", b: "6,000 counts + 33-segment bar graph" },
    { label: "Recording", a: "Min/Max/Avg with elapsed time", b: "Min/Max/Avg" },
    { label: "Weight", a: "550 g (Amazon: 0.51 kg)", b: "550 g" },
    { label: "Battery / warranty", a: "9 V, 400 h; 3 years", b: "9 V, 400 h; 3 years" },
  ],
  differences: [
    "The 116 has a 600.0 µA range with 0.1 µA resolution for flame-rectification checks. The 114 has no current function of any kind.",
    "Only the 116 measures temperature, through a Type K input from -40 to 400 °C, and it ships with an 80BK probe.",
    "Only the 116 lists capacitance (to 9,999 µF) and frequency (to 50 kHz).",
    "Both have AutoVolt with a low-impedance input of about 3 kΩ and the same voltage accuracy, so ghost-voltage handling is identical.",
    "Case, display, CAT III 600V rating, battery life and 3-year warranty are the same. Neither has amp or milliamp ranges.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">One meter is the other plus four functions</h2>
        <p className="text-muted leading-7 mb-4">
          Lay Fluke&apos;s two spec tabs side by side and the relationship is unusual for a comparison: nothing the
          114 measures is missing from the 116. Voltage, millivolts, the AutoVolt low-impedance position, resistance,
          continuity and Min/Max/Avg all appear on both, with matching voltage accuracy lines. The 116 then adds four
          functions that only an HVAC technician uses every week.
        </p>
        <Figure caption={<>Function map from Fluke&apos;s published specifications. The 114 sits entirely inside the 116.</>}>
          <FunctionMapDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Two small items run the other way. The 114&apos;s spec tab lists AC millivolts as well as DC; for the 116 we
          could only confirm the DC 600.0 mV range. Fluke also states auto-ranging with manual override for the 114,
          while the 116 entry in our catalog notes a manual RANGE button and no explicit auto-ranging statement. Neither
          changes the decision for most buyers. Neither meter carries our Hands-on Tested badge; this page is desk
          research against Fluke&apos;s spec tabs, the 110 Series datasheet and the official Amazon listings.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 114 vs 116 comparison, spec by spec</h2>
        <DataTable
          head={["Spec", "Fluke 114", "Fluke 116", "Same?"]}
          rows={[
            ["AC volts, True RMS", "To 600.0 V, ±(1.0% + 3)", "To 600.0 V, ±(1.0% + 3)", "Same"],
            ["DC volts", "To 600.0 V, ±(0.5% + 2)", "To 600.0 V, ±(0.5% + 2)", "Same"],
            ["AutoVolt LoZ", "About 3 kΩ, AC/DC auto", "About 3 kΩ, AC/DC auto", "Same"],
            ["Resistance", "To 40.00 MΩ", "To 40.00 MΩ", "Same"],
            ["Continuity", "Beeps below 20 Ω", "Beeps below 20 Ω", "Same"],
            ["Microamps", "No", "600.0 µA AC/DC", "116 only"],
            ["DC µA accuracy", "Not applicable", "±(1.0% + 2)", "116 only"],
            ["Temperature", "No", "Type K, 0.1 °C steps, ±(1% + 10)", "116 only"],
            ["Capacitance", "Not listed", "To 9,999 µF", "116 only"],
            ["Frequency", "Not listed", "To 50.00 kHz", "116 only"],
            ["Amps / milliamps", "No", "No", "Same"],
            ["Safety rating", "CAT III 600V", "CAT III 600V", "Same"],
            ["Temperature probe in the box", "No", "80BK", "116 only"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Measurement functions each meter lists, out of the 11 in the function table further down.</>}>
            <BarChart
              items={[
                { label: "Fluke 114", value: 7, display: "7 of 11" },
                { label: "Fluke 116", value: 11, display: "11 of 11", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Checks on a typical HVAC service call each meter can take alone, out of 8 (table below).</>}>
            <BarChart
              items={[
                { label: "Fluke 114", value: 4, display: "4 of 8" },
                { label: "Fluke 116", value: 7, display: "7 of 8", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The two charts count rows from the tables on this page, not Fluke figures. The 116&apos;s temperature line
          excludes probe error, so the 80BK adds its own tolerance on top. Everything else in the table comes straight
          from Fluke&apos;s spec tabs, with the 114&apos;s missing functions marked &quot;Not listed&quot; where Fluke
          simply doesn&apos;t mention them.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The electrician&apos;s view: what the 116&apos;s extras are worth</h2>
        <p className="text-muted leading-7 mb-4">
          For a wiring electrician, the 116&apos;s additions mostly sit unused. A receptacle check, a ghost reading on a
          switch leg, a continuity test on a home run and a resistance check on a baseboard heating element are
          the same on both meters, because the voltage, LoZ and resistance lines are identical. The microamp jack and
          thermocouple input exist for gas heating equipment.
        </p>
        <p className="text-muted leading-7 mb-4">
          Capacitance is the exception that can tip an electrician toward the 116. Ceiling fans with a slow speed,
          bath fans that hum and condenser fans on a service call all point at a run capacitor, and the 114 can&apos;t
          read one. Frequency helps too if you check portable or standby generators. If those calls are rare, the
          114&apos;s shorter dial is a fair trade; if they come up monthly, the 116 earns its place even without a
          furnace in sight.
        </p>
        <DataTable
          head={["Function", "Fluke 114", "Fluke 116"]}
          rows={[
            ["True RMS AC volts", "Yes", "Yes"],
            ["DC volts", "Yes", "Yes"],
            ["Millivolts", "AC and DC", "DC"],
            ["AutoVolt LoZ", "Yes", "Yes"],
            ["Resistance", "Yes", "Yes"],
            ["Continuity", "Yes", "Yes"],
            ["Min/Max/Avg", "Yes, elapsed time", "Yes"],
            ["Microamps", "No", "Yes"],
            ["Temperature", "No", "Yes"],
            ["Capacitance", "No", "Yes"],
            ["Frequency", "No", "Yes"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The HVAC technician&apos;s view: why the 114 falls short</h2>
        <p className="text-muted leading-7 mb-4">
          On heating and cooling equipment the picture flips. Take a typical no-heat or no-cool call and count the
          readings a technician reaches for. The 114 handles the voltage side well, including thermostat wiring where
          its LoZ position sorts induced voltage on spare conductors from a real 24 V call. It stops at the components.
        </p>
        <DataTable
          head={["HVAC service check", "Fluke 114", "Fluke 116"]}
          rows={[
            ["Line voltage at the disconnect", "Yes", "Yes"],
            ["24 V transformer secondary", "Yes", "Yes"],
            ["Induced voltage on thermostat wire", "AutoVolt LoZ", "AutoVolt LoZ"],
            ["Igniter or heating element ohms", "Yes", "Yes"],
            ["Run or start capacitor", "No", "Yes, µF"],
            ["Furnace flame-rod current", "No", "600.0 µA range"],
            ["Supply and return air temperature", "No", "Type K, 80BK probe"],
            ["Blower or compressor amps", "Clamp meter", "Clamp meter"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The three rows the 116 adds are the ones that find failed parts. A burner that lights and drops out points
          at the flame signal; our guide to{" "}
          <Link href="/multimeters/how-to-measure-microamps-with-a-multimeter" className={link}>
            measuring microamps with a multimeter
          </Link>{" "}
          covers the series hookup, and the{" "}
          <Link href="/multimeters/fluke-116-vs-fluke-115" className={link}>
            Fluke 116 vs Fluke 115
          </Link>{" "}
          page works through flame-signal and temperature accuracy in detail. For the voltage rows, see{" "}
          <Link href="/multimeters/how-to-check-a-24v-transformer-with-a-multimeter" className={link}>
            checking a 24 V transformer
          </Link>
          , which either meter handles.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Can the 116 tell you a capacitor is out of tolerance?</h2>
        <p className="text-muted leading-7 mb-4">
          This is the 116 function electricians and HVAC technicians share, so it is worth checking that the accuracy is
          good enough. Run capacitors are commonly labeled with a tolerance such as ±6%. Take an illustrative 35 µF
          capacitor with that marking: the acceptable band is 35 × 0.94 = 32.9 µF to 35 × 1.06 = 37.1 µF.
        </p>
        <DataTable
          head={["Illustrative reading", "116 allowance, ±(1.9% + 2)", "Possible true value", "Verdict"]}
          rows={[
            ["35.0 µF", "0.67 + 0.2 = ±0.87 µF", "34.1 to 35.9 µF", "In tolerance"],
            ["33.5 µF", "0.64 + 0.2 = ±0.84 µF", "32.7 to 34.3 µF", "Borderline: recheck"],
            ["31.0 µF", "0.59 + 0.2 = ±0.79 µF", "30.2 to 31.8 µF", "Out of tolerance"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The 2-count term assumes the 100.0 µF range with 0.1 µF steps. Readings well inside or well outside the band
          are clear; one within about 1 µF of the edge deserves a second reading after the capacitor has been
          discharged and isolated. The 114 can only show whether a capacitor is shorted on its resistance ranges, which
          is not a capacitance test. Our guide to{" "}
          <Link href="/multimeters/how-to-test-a-fan-motor-capacitor-with-a-multimeter" className={link}>
            testing a fan motor capacitor
          </Link>{" "}
          gives the full procedure.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Neither one measures load current</h2>
        <InfoCards
          items={[
            { label: "Fluke 114", desc: "Two jacks, COM and +. No current function at all." },
            { label: "Fluke 116", desc: "A µA input that tops out at 600.0 µA, under a milliamp." },
            { label: "What that means", desc: "Motor, blower, compressor and appliance amps need a clamp." },
            { label: "If you want amps", desc: "The 117 adds 6 A and 10 A ranges but no µA or temperature." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          It is easy to read &quot;µA&quot; on the 116&apos;s dial and assume it covers current in general. It
          doesn&apos;t: 600.0 µA is 0.0006 A, far below a 24 V control load, let alone a motor. Buyers coming from the
          114 sometimes expect the 116 to fill that gap, and it won&apos;t. In practice both meters ride in a bag with a
          clamp meter; our{" "}
          <Link href="/multimeters/clamp-meter-buying-guide" className={link}>
            clamp meter buying guide
          </Link>{" "}
          covers that second tool. If one meter with amps matters more than microamps, compare the{" "}
          <Link href="/multimeters/fluke-114-vs-fluke-117" className={link}>
            Fluke 114 vs Fluke 117
          </Link>{" "}
          or{" "}
          <Link href="/multimeters/fluke-116-vs-fluke-117" className={link}>
            Fluke 116 vs Fluke 117
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["Residential or commercial electrician", "Fluke 114", "Voltage, LoZ and continuity cover the work"],
            ["New-construction installer", "Fluke 114", "Nothing on the 116's extra positions gets used"],
            ["HVAC service technician", "Fluke 116", "Flame-rod µA, temperature and capacitors"],
            ["Electrician who also services furnaces", "Fluke 116", "Same electrical core plus the heating functions"],
            ["Electrician who replaces fan capacitors", "Fluke 116", "The 114 can't read µF"],
            ["Facilities maintenance tech", "Fluke 116", "Boilers, air handlers and capacitors on one meter"],
            ["Anyone who needs amps through the leads", "Neither", "Look at the Fluke 117, or add a clamp"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Compare current prices before deciding. Because the 116 covers every 114 function, a small price gap favors
          the 116 for anyone who touches HVAC equipment even occasionally. For broader shortlists, see the{" "}
          <Link href="/multimeters/best-multimeter-for-electricians" className={link}>
            best multimeter for electricians
          </Link>{" "}
          and the{" "}
          <Link href="/multimeters/best-multimeter-for-hvac-technicians" className={link}>
            best multimeter for HVAC technicians
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Notes on Fluke&apos;s published specs</h2>
        <KeyIdea title="Conflicts we found">
          Fluke&apos;s 114 page describes True RMS &quot;voltage and current&quot; in its overview, yet the spec table
          lists no current range and the meter has only two jacks, so we treat it as having none. The same page carries
          a temperature footnote with no temperature function listed; only the 116 measures temperature. Fluke gives the
          114 as 550 g while Amazon lists 0.51 kg. For the 116, Fluke doesn&apos;t state auto-ranging explicitly.
        </KeyIdea>
      </section>

      <Callout title="Safety: CAT III 600V, and the µA jack is for control circuits only">
        Both meters are rated CAT III 600V, suitable for panels, feeders, branch circuits and HVAC disconnects, but not
        the meter base or service drop. Put the 116&apos;s µA input in series only with flame-sensor or similar
        low-current control circuits, never across a voltage source. Discharge capacitors before measuring them, and
        don&apos;t attach the thermocouple probe to energized parts. Prove circuits dead with a live-dead-live check, and
        call a licensed electrician or HVAC contractor for work you aren&apos;t qualified to do.
      </Callout>
    </>
  ),
  bottomLine:
    "Electricians who only check voltage, continuity and resistance on building wiring are well served by the Fluke 114, with its AutoVolt LoZ and short dial. Anyone who works on furnaces, air conditioners or motor capacitors should buy the Fluke 116: it keeps every 114 function and adds microamps, temperature, capacitance and frequency. Pair either with a clamp meter, because neither reads amps.",
  faqs: [
    {
      question: "Is the Fluke 116 just a Fluke 114 with HVAC functions?",
      answer:
        "Close to it. Per Fluke's spec tabs, the 116 has every measurement the 114 has, with the same voltage accuracy, AutoVolt LoZ input and 40 MΩ resistance, and adds a 600.0 µA range, Type K temperature, capacitance and frequency. The 114 lists AC millivolts and states auto-ranging explicitly; the 116 page we used does not.",
    },
    {
      question: "Does the Fluke 114 measure temperature?",
      answer:
        "No. The 114's spec tab carries a temperature footnote, but no temperature function or range is listed, and the meter has no thermocouple input. In the 110 Series, Fluke's datasheet gives temperature to the 116 only, which reads -40 to 400 °C with a Type K probe and ships with the 80BK.",
    },
    {
      question: "Can the Fluke 114 test a run capacitor?",
      answer:
        "No. Capacitance isn't among the 114's functions, so it can only show whether a capacitor is shorted on a resistance range. The 116 measures up to 9,999 µF at ±(1.9% + 2), which is tight enough to compare most run capacitors against the tolerance printed on the can.",
    },
    {
      question: "Can either the Fluke 114 or 116 measure amps?",
      answer:
        "Not load current. The 114 has no current function. The 116's only current input reads up to 600.0 µA, intended for flame sensors and small control currents. For blower, compressor or appliance current, use a clamp meter, or choose the Fluke 117, which has 6 A and 10 A ranges.",
    },
    {
      question: "Do the Fluke 114 and 116 both have LoZ?",
      answer:
        "Yes. Both have the AutoVolt position, which selects AC or DC and drops the input to about 3 kΩ so coupled ghost voltage drains away. Fluke gives the same ±(2.0% + 3) accuracy on the 600.0 V range for both, so they behave identically on spare thermostat conductors or abandoned branch wiring.",
    },
    {
      question: "Which is better for a furnace that won't stay lit?",
      answer:
        "The Fluke 116. A burner that lights and then shuts down often has a weak flame signal, and the only way to read it is a microamp range in series with the flame rod. The 116's 600.0 µA range resolves 0.1 µA steps. The 114 can confirm voltages and check igniter resistance but can't read the flame signal.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 114 vs Fluke 115", href: "/multimeters/fluke-114-vs-fluke-115" },
    { label: "Fluke 114 vs Fluke 117", href: "/multimeters/fluke-114-vs-fluke-117" },
    { label: "Fluke 116 vs Fluke 115 for HVAC", href: "/multimeters/fluke-116-vs-fluke-115" },
    { label: "Fluke 116 vs Fluke 117", href: "/multimeters/fluke-116-vs-fluke-117" },
    { label: "Best multimeter for HVAC technicians", href: "/multimeters/best-multimeter-for-hvac-technicians" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
  ],
};

export default function Fluke114VsFluke116Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
