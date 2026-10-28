// Specs per Fluke, checked 2026-10-27:
// - Fluke 116 product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-116
//   (600.0 µA AC/DC at 0.1 µA, DC ±(1.0% + 2), AC ±(1.5% + 3) at 45-500 Hz; no mA or A ranges; Type K temperature
//   -40 to 400 °C at 0.1 °C, ±(1% + 10), probe error excluded; Auto V/LoZ 600.0 V ±(2.0% + 3); capacitance to 9,999 µF
//   ±(1.9% + 2); resistance to 40.00 MΩ; frequency to 50.00 kHz; 6,000 counts + 33-segment bar graph; CAT III 600V;
//   one 9V, 400 h typical; 167 × 84 × 46 mm; 550 g; 3-year warranty; 80BK temperature probe in the box; the page
//   does not mention VoltAlert or non-contact detection).
// - Fluke 117 product page: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-117
// - Fluke 114/115/116/117 datasheet (2793260b): https://media.fluke.com/ce54d963-3be9-4e70-8a3e-b1060070fdfd_original%20file.pdf
//   (VoltAlert on the 117 only; 6.000 A and 10.00 A on the 115 and 117 only; µA and temperature on the 116 only;
//   AutoVolt LoZ input about 3 kΩ on the 114, 116 and 117; 20 A for 30 s on the A input).
// - Fluke 110 Series users manual (March 2020): https://media.fluke.com/5e1db354-3a6e-49cf-9edd-b10800c0e608_original%20file.pdf
//   (VoltAlert Lo/Hi sensitivity; no indication does not prove no voltage).
// Branch-circuit and loop-current figures below are standard values (15/20 A circuits, 4-20 mA loops), hedged.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-116-vs-fluke-117";

const all = getAllPicks("multimeters");

export const metadata = buildMetadata({
  title: "Fluke 116 vs Fluke 117: Electrician Comparison",
  description:
    "Fluke 116 vs Fluke 117 for electricians and HVAC techs: VoltAlert and 10 A ranges on the 117, microamps and temperature on the 116. Specs, charts and a verdict.",
  image: all.find((p) => p.name === "Fluke 117")!.image,
  path: "/multimeters/fluke-116-vs-fluke-117",
});

const link = "text-accent hover:underline";

/**
 * Log-scale current axis from 0.1 µA to 20 A, showing the span each meter's current input covers
 * and where common electrical currents sit. Positions are log10(amps).
 */
function CurrentSpanDiagram() {
  const x0 = 30;
  const x1 = 330;
  const lo = -7; // 0.1 µA
  const hi = Math.log10(20); // 20 A
  const xAt = (amps: number) => x0 + ((Math.log10(amps) - lo) / (hi - lo)) * (x1 - x0);
  const ticks: [number, string][] = [
    [1e-7, "0.1µA"],
    [1e-6, "1µA"],
    [1e-4, "100µA"],
    [1e-3, "1mA"],
    [1e-1, "100mA"],
    [10, "10A"],
  ];
  const marks: [number, string][] = [
    [3e-6, "flame rod"],
    [0.012, "4–20 mA loop"],
    [15, "15 A circuit"],
  ];
  return (
    <svg
      viewBox="0 0 360 200"
      className="w-full h-auto"
      role="img"
      aria-label="Log-scale current axis: the Fluke 116 covers 0.1 microamp to 600 microamps, the Fluke 117 covers 1 milliamp resolution up to 10 amps, and neither covers a 4 to 20 milliamp loop well or a full 15 amp branch circuit"
    >
      <line x1={x0} x2={x1} y1="120" y2="120" className="stroke-foreground" strokeWidth="1.4" />
      {ticks.map(([a, l]) => (
        <g key={l}>
          <line x1={xAt(a)} x2={xAt(a)} y1="116" y2="124" className="stroke-foreground" strokeWidth="1" />
          <text x={xAt(a)} y="138" fontSize="8.5" textAnchor="middle" className="fill-muted">
            {l}
          </text>
        </g>
      ))}
      <rect x={xAt(1e-7)} y="40" width={xAt(6e-4) - xAt(1e-7)} height="22" rx="5" className="fill-accent/30 stroke-accent" strokeWidth="1.2" />
      <text x={(xAt(1e-7) + xAt(6e-4)) / 2} y="55" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">
        Fluke 116: 600.0 µA range
      </text>
      <rect x={xAt(1e-3)} y="72" width={xAt(10) - xAt(1e-3)} height="22" rx="5" className="fill-surface stroke-foreground" strokeWidth="1.2" />
      <text x={(xAt(1e-3) + xAt(10)) / 2} y="87" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">
        Fluke 117: 6 A / 10 A (1 mA steps)
      </text>
      {marks.map(([a, l]) => (
        <g key={l}>
          <line x1={xAt(a)} x2={xAt(a)} y1="100" y2="152" className="stroke-accent" strokeWidth="1.2" strokeDasharray="3 3" />
          <text x={xAt(a)} y="166" fontSize="9" textAnchor="middle" className="fill-accent">
            {l}
          </text>
        </g>
      ))}
      <text x="180" y="190" fontSize="9" textAnchor="middle" className="fill-muted">
        Log scale: each labeled step is 10× or 100× the one before
      </text>
      <text x="180" y="22" fontSize="10" textAnchor="middle" className="fill-foreground">
        Which currents each meter can actually resolve
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 116 vs Fluke 117: Which Is Better for Electricians?",
  path,
  published: "2026-10-27",
  updated: "2026-10-28",
  intro:
    "For most electricians the Fluke 117 is the better meter: it has VoltAlert non-contact detection and 6 A and 10 A current ranges, and the Fluke 116 has neither. The 116 is Fluke's HVAC model, trading the amp ranges for a 600.0 µA range and a thermocouple input. Both share the same case, CAT III 600V rating, True RMS core and AutoVolt LoZ input, so this Fluke 116 vs Fluke 117 comparison comes down to amps and NCV against microamps and temperature.",
  a: {
    pick: all.find((p) => p.name === "Fluke 117")!,
    reviewHref: "/multimeters/fluke-117-review",
    imageAlt: "Fluke 117 electrician's True RMS multimeter with VoltAlert, front view",
    chooseIf: [
      "You wire and troubleshoot branch circuits, receptacles, lighting and panels",
      "You want a non-contact voltage sensor built into the meter you already carry",
      "You need to read load current through the leads, up to 10 A",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 116")!,
    imageAlt: "Fluke 116 HVAC True RMS multimeter, front view",
    chooseIf: [
      "Your electrical work leans toward furnaces, boilers and HVAC controls",
      "You need to read flame-sensor microamps and thermocouple temperature",
      "You already carry a clamp meter for every amp reading",
    ],
  },
  extraSpecs: [
    { label: "VoltAlert non-contact voltage", a: "Yes, Lo/Hi sensitivity", b: "No" },
    { label: "AutoVolt with LoZ input", a: "Yes, about 3 kΩ", b: "Yes, about 3 kΩ" },
    { label: "Current ranges", a: "6.000 A and 10.00 A AC/DC", b: "600.0 µA AC/DC only" },
    { label: "Finest current step", a: "1 mA", b: "0.1 µA" },
    { label: "Temperature", a: "No", b: "-40 to 400 °C, Type K (80BK probe included)" },
    { label: "Capacitance", a: "1 nF to 9,999 µF", b: "1 nF to 9,999 µF" },
    { label: "Resistance", a: "To 40.00 MΩ", b: "To 40.00 MΩ" },
    { label: "Frequency", a: "To 50.00 kHz", b: "To 50.00 kHz" },
    { label: "Display", a: "6,000 counts + 33-segment bar graph", b: "6,000 counts + 33-segment bar graph" },
    { label: "Size / weight", a: "167 × 84 × 46 mm, 550 g", b: "167 × 84 × 46 mm, 550 g" },
    { label: "Battery", a: "One 9V, 400 h typical", b: "One 9V, 400 h typical" },
    { label: "Warranty", a: "3 years", b: "3 years" },
  ],
  differences: [
    "The 117 has VoltAlert, a sensor in the top of the case that flags a live AC conductor without contact. Fluke's 116 page and datasheet list no non-contact detection for the 116.",
    "The 117 reads current on 6.000 A and 10.00 A ranges through its A jack. The 116 has no amp or milliamp range at all; its only current range is 600.0 µA.",
    "The 116 reads microamps to 0.1 µA, which is what furnace flame-rod checks need. The 117's finest current step is 1 mA, ten thousand times coarser.",
    "The 116 reads Type K temperature from -40 to 400 °C and ships with an 80BK probe. The 117 has no temperature function.",
    "Both have AutoVolt with a roughly 3 kΩ LoZ input for ghost voltage, both are True RMS and CAT III 600V, and both share the same case, display, battery and 3-year warranty.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">The short version</h2>
        <InfoCards
          items={[
            { label: "Shared core", desc: "True RMS volts, CAT III 600V, 6,000 counts, AutoVolt LoZ, capacitance, frequency." },
            { label: "117 only", desc: "VoltAlert NCV and 6 A / 10 A current through the leads." },
            { label: "116 only", desc: "600.0 µA range at 0.1 µA and a Type K thermocouple input." },
            { label: "For electricians", desc: "The 117. Amps and NCV come up every day; microamps rarely do." },
            { label: "For HVAC crossover", desc: "The 116, paired with a clamp meter for motor and compressor amps." },
            { label: "Our testing", desc: "The 117 is owner-tested; the 116 is desk research on Fluke specs." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          These two sit side by side in Fluke&apos;s 110 Series and look almost identical in a tool bag. The difference
          is in the dial and the input jacks: Fluke built the 117 around building wiring and the 116 around gas heating
          equipment. The 117 carries our Hands-on Tested badge; for the 116 we rely on Fluke&apos;s product page, its
          datasheet and the 110 Series manual. If you are weighing the 117 against the model without the electrician
          extras instead, our{" "}
          <Link href="/multimeters/fluke-115-vs-fluke-117" className={link}>
            Fluke 115 vs Fluke 117
          </Link>{" "}
          page covers that pair.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 116 vs 117 spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          On voltage, resistance, capacitance and frequency, Fluke publishes the same accuracy lines for both meters.
          The rows that change are all about current, temperature and non-contact sensing.
        </p>
        <DataTable
          head={["Spec", "Fluke 117", "Fluke 116", "Same?"]}
          rows={[
            ["DC volts", "600.0 mV to 600.0 V, ±(0.5% + 2)", "600.0 mV to 600.0 V, ±(0.5% + 2)", "Same"],
            ["AC volts, True RMS", "To 600.0 V, ±(1.0% + 3), 45–500 Hz", "To 600.0 V, ±(1.0% + 3), 45–500 Hz", "Same"],
            ["AutoVolt (LoZ)", "600.0 V, ±(2.0% + 3)", "600.0 V, ±(2.0% + 3)", "Same"],
            ["VoltAlert NCV", "Yes", "No", "117 only"],
            ["Amps AC/DC", "6.000 A and 10.00 A", "None", "117 only"],
            ["Microamps AC/DC", "None", "600.0 µA, 0.1 µA steps", "116 only"],
            ["DC µA accuracy", "Not applicable", "±(1.0% + 2)", "116 only"],
            ["Temperature", "None", "-40 to 400 °C, ±(1% + 10)", "116 only"],
            ["Resistance", "600.0 Ω to 40.00 MΩ", "600.0 Ω to 40.00 MΩ", "Same"],
            ["Continuity", "Beeps below 20 Ω", "Beeps below 20 Ω", "Same"],
            ["Capacitance", "1 nF to 9,999 µF, ±(1.9% + 2)", "1 nF to 9,999 µF, ±(1.9% + 2)", "Same"],
            ["Frequency", "To 50.00 kHz, ±(0.1% + 2)", "To 50.00 kHz, ±(0.1% + 2)", "Same"],
            ["Min/Max/Avg, backlight", "Yes", "Yes", "Same"],
            ["Safety rating", "CAT III 600V", "CAT III 600V", "Same"],
            ["In the box, beyond leads", "Holster", "Holster and 80BK temperature probe", "Differs"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Highest current each meter accepts on its current input, log scale. The 117 also tolerates 20 A for 30 seconds.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 117 (A jack)", value: 10, display: "10.00 A", highlight: true },
                { label: "Fluke 116 (µA jack)", value: 0.0006, display: "600.0 µA" },
              ]}
            />
          </Figure>
          <Figure caption={<>Smallest current step each meter can show, in microamps, log scale. Smaller is finer.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 117", value: 1000, display: "1 mA (1,000 µA)" },
                { label: "Fluke 116", value: 0.1, display: "0.1 µA", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Put those two charts together and the meters barely overlap. The 116&apos;s current input tops out at
          0.0006 A, which is below the 117&apos;s smallest displayed step of 0.001 A. One reads tiny control-circuit
          currents, the other reads loads.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each current input can see</h2>
        <p className="text-muted leading-7 mb-4">
          The diagram below puts both current ranges on one logarithmic axis and marks three currents an electrician
          meets. A flame rod sits a few microamps from zero, inside the 116&apos;s window and invisible to the 117. A 4–20
          mA process loop sits in the gap between them: it overloads the 116, and on the 117 a 12 mA reading shows as
          0.012 A with ±(1.0% + 3) DC accuracy, roughly ±3 mA, too coarse to calibrate a transmitter. A loaded 15 A
          branch circuit sits past the 117&apos;s 10.00 A continuous limit.
        </p>
        <Figure caption={<>Current coverage of the 116 and 117 on a log axis. Marked currents are typical values, not Fluke figures.</>}>
          <CurrentSpanDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The practical lesson is that neither meter is the right amp tool for most electrical work. Branch-circuit and
          motor currents belong to a clamp meter, and loop currents to a meter with a real milliamp range; our{" "}
          <Link href="/multimeters/best-multimeters-for-4-20ma-loop-testing" className={link}>
            4–20 mA loop testing guide
          </Link>{" "}
          lists those. The 117&apos;s amp ranges still earn their place for small loads, such as a bathroom fan, a
          doorbell transformer or a low-voltage lighting run. The 116 cannot take those readings at all.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The electrician&apos;s day with each meter</h2>
        <p className="text-muted leading-7 mb-4">
          Picture a service call for a dead kitchen circuit. With the 117, you sweep the receptacles with VoltAlert to
          find the last live box, switch to AutoVolt to see whether the 40-odd volts on the dead leg is coupling or a
          loose neutral, prove dead with the leads, then check continuity on the pigtails. The 116 does every step
          except the first: AutoVolt and LoZ are on its dial too, so ghost voltage fools neither meter. Without VoltAlert,
          the 116 owner touches leads to each box or pulls a pen tester from a pocket.
        </p>
        <p className="text-muted leading-7 mb-4">
          Next comes a lighting retrofit where you want to confirm a fixture draws what its label says. The 117 reads it
          in series on the 6.000 A range. The 116 can&apos;t, so you clamp it with a second tool. Then a rooftop unit
          won&apos;t fire. Here the 116 pulls ahead: it reads the flame-rod microamps and the supply-air temperature
          with the included probe, where the 117 can only confirm 24 V at the gas valve.
        </p>
        <DataTable
          head={["Electrical task", "Fluke 117", "Fluke 116"]}
          rows={[
            ["Find a live box or cord", "VoltAlert, no contact", "Leads or a separate pen"],
            ["Ghost voltage on a dead leg", "AutoVolt LoZ", "AutoVolt LoZ"],
            ["Prove dead before work", "Leads, live-dead-live", "Leads, live-dead-live"],
            ["Small load current (under 10 A)", "In series on the A jack", "Not possible"],
            ["Branch-circuit or motor amps", "Clamp meter", "Clamp meter"],
            ["Run or start capacitor", "Capacitance, to 9,999 µF", "Capacitance, to 9,999 µF"],
            ["Furnace flame sensor", "Can't resolve µA", "600.0 µA at 0.1 µA"],
            ["Supply or return air temperature", "No", "Type K, 80BK probe"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Count the rows. On wiring work, the 117 wins two and ties the rest. On heating equipment, the 116 wins two and
          the 117 wins none. That split is the whole decision for a mixed contractor: whichever kind of call fills more of
          your week decides the meter on your belt, and the other job gets a second tool. For an all-electrical
          shortlist, see the{" "}
          <Link href="/multimeters/best-multimeter-for-electricians" className={link}>
            best multimeter for electricians
          </Link>
          ; for the heating side, the{" "}
          <Link href="/multimeters/best-multimeter-for-hvac-technicians" className={link}>
            best multimeter for HVAC technicians
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Why VoltAlert matters more than it sounds</h2>
        <p className="text-muted leading-7 mb-4">
          VoltAlert is a capacitive sensor at the top of the 117. Fluke gives it two sensitivities: Lo for flush
          receptacles, power strips and cords, and Hi for recessed sockets and bare conductors from 24 V. Its value for an
          electrician isn&apos;t precision; it is speed and habit. You check every box you open before your hands go in,
          without unholstering the leads. On the 116 that check needs a separate non-contact tester, and a second tool is
          one more thing to leave in the truck.
        </p>
        <KeyIdea title="LoZ is a tie, not a tiebreaker">
          Some buyers assume the electrician&apos;s model has features the HVAC model lacks across the board. On ghost
          voltage it doesn&apos;t: Fluke lists AutoVolt with a low-impedance input of about 3 kΩ on both the 116 and the
          117, with the same ±(2.0% + 3) accuracy on the 600.0 V range. That matters on long thermostat cables as much
          as on shared conduit. The meter that lacks LoZ in this family is the 115. For how phantom voltage forms, read
          our guide to{" "}
          <Link href="/multimeters/how-to-measure-voltage-on-a-floating-ground-circuit" className={link}>
            measuring voltage on a floating circuit
          </Link>
          .
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where the 116 earns a place in an electrician&apos;s bag</h2>
        <p className="text-muted leading-7 mb-4">
          Electricians who also service residential heating, or who work in facilities where boilers and air handlers
          are part of the job, run into the two readings only the 116 can take. A gas furnace that lights and then shuts
          down within seconds often points to a weak flame signal, and the only way to see it is a microamp reading in
          series with the flame rod. Our guide to{" "}
          <Link href="/multimeters/how-to-measure-microamps-with-a-multimeter" className={link}>
            measuring microamps
          </Link>{" "}
          walks through the hookup. Temperature checks on supply air or a pipe are the other job, and the 116 ships with
          the 80BK probe to do them.
        </p>
        <p className="text-muted leading-7">
          What you give up is the A jack. The only current range Fluke lists for the 116 is the 600.0 µA one, so
          every amp reading on that kit goes to a clamp. Many HVAC technicians carry exactly that pair. An
          electrician who reads small loads in series most weeks will miss the 117&apos;s 10 A range more than they
          gain from microamps. If you want temperature without losing amps, the{" "}
          <Link href="/multimeters/fluke-117-vs-fluke-179" className={link}>
            Fluke 117 vs Fluke 179
          </Link>{" "}
          page covers a Fluke that has both.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 116 vs 117 for HVAC work</h2>
        <p className="text-muted leading-7 mb-4">
          Swap the electrician for an HVAC technician and the scorecard changes, though less than you might expect.
          Both meters share several readings HVAC calls depend on: run-capacitor microfarads (1 nF to 9,999 µF at
          ±(1.9% + 2) on each), 24 V control voltage with a LoZ position for idle thermostat conductors, and pilot
          thermocouple millivolts on the same 600.0 mV DC range. What splits them is the season. A heating call leans
          on the 116&apos;s microamps and Type K input; the 117 answers with VoltAlert at the condenser disconnect and a
          6.000 A range that reads heat-anticipator and other small control currents in series.
        </p>
        <DataTable
          head={["HVAC reading", "Call type", "Fluke 116", "Fluke 117"]}
          rows={[
            ["Flame-rod signal, a few µA", "Heating", "600.0 µA range, 0.1 µA steps", "Reads 0.000 A"],
            ["Temperature rise across the furnace", "Heating", "Type K, 80BK probe included", "No temperature input"],
            ["Pilot thermocouple millivolts", "Heating", "600.0 mV DC", "600.0 mV DC"],
            ["Heat-anticipator current, under 1 A", "Heating", "Not possible", "6.000 A range, 1 mA steps"],
            ["Run capacitor on the condenser", "Cooling", "To 9,999 µF, ±(1.9% + 2)", "To 9,999 µF, ±(1.9% + 2)"],
            ["Supply vs return air split", "Cooling", "Type K, 0.1 °C steps", "No temperature input"],
            ["Is the disconnect still live?", "Cooling", "Leads only", "VoltAlert first, then leads"],
            ["Thermostat or 24 V transformer", "Both", "V AC or AutoVolt LoZ", "V AC or AutoVolt LoZ"],
            ["Compressor or blower amps", "Both", "Clamp meter", "Clamp meter"],
          ]}
        />
        <div className="mt-6">
          <Figure caption={<>Heating-only and cooling-only rows from the table that each meter handles on its own. The two shared rows are left out.</>}>
            <BarChart
              items={[
                { label: "116, heating rows", value: 3, display: "3 of 4", highlight: true },
                { label: "117, heating rows", value: 2, display: "2 of 4" },
                { label: "116, cooling rows", value: 2, display: "2 of 3" },
                { label: "117, cooling rows", value: 2, display: "2 of 3" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Cooling work is a draw: each meter misses one reading the other takes. Heating work tips to the 116, because a
          furnace that lights and drops out can&apos;t be diagnosed without a microamp range, while the anticipator
          check the 117 wins applies only to older mechanical thermostats. An HVAC technician with gas furnaces on the
          route should carry the 116 plus a clamp; one working on heat pumps and mini-splits loses little with the 117
          and gains a non-contact check before opening a condenser panel. The heating-side detail, including the
          flame-rod hookup and temperature tolerances, is on our{" "}
          <Link href="/multimeters/fluke-116-vs-fluke-115" className={link}>
            Fluke 116 vs Fluke 115 for HVAC
          </Link>{" "}
          page rather than repeated here.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 116 vs Fluke 117: which should you buy?</h2>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["Residential or commercial electrician", "Fluke 117", "VoltAlert and the 10 A range get used daily"],
            ["Electrical apprentice", "Fluke 117", "Built-in NCV reinforces checking every box before touching"],
            ["HVAC technician", "Fluke 116", "Flame-rod µA and temperature; pair with a clamp for amps"],
            ["Electrician who also services furnaces", "Fluke 116 + clamp", "Covers the readings the 117 can't, LoZ included"],
            ["Facilities or maintenance tech", "Depends on the calls", "Wiring faults favor the 117; boilers and air handlers the 116"],
            ["Controls or instrumentation tech", "Neither alone", "4–20 mA loops need a true milliamp range"],
            ["Homeowner", "Fluke 117", "NCV and amps are more useful than microamps around the house"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Read our{" "}
          <Link href="/multimeters/fluke-117-review" className={link}>
            Fluke 117 review
          </Link>{" "}
          for the owner-tested view of the electrician&apos;s model, or the{" "}
          <Link href="/multimeters/best-multimeters" className={link}>
            best multimeters
          </Link>{" "}
          roundup for meters outside the 110 Series.
        </p>
      </section>

      <Callout title="Safety: both meters stop at CAT III 600V">
        The 116 and 117 are rated CAT III 600V, which covers panels, feeders and branch circuits but not the meter base,
        service drop or outdoor service conductors, where CAT IV applies. VoltAlert can miss a live conductor in shielded
        cable and cannot sense DC, so treat silence as &quot;not proven&quot; and confirm dead with the leads on a known
        live source before and after. Never clip a thermocouple probe to an energized part, and never put either meter in
        series with a circuit that could exceed its current input; the 116&apos;s µA jack is for flame and control
        circuits only. If you&apos;re not qualified for live work, call a licensed electrician.
      </Callout>
    </>
  ),
  bottomLine:
    "Electricians should buy the Fluke 117: VoltAlert and the 6 A and 10 A ranges serve wiring work every day, and it shares the 116's LoZ input, True RMS core and CAT III 600V rating. Buy the Fluke 116 only if furnaces, boilers or HVAC controls make up a real share of your calls, and carry a clamp meter with it for amps.",
  faqs: [
    {
      question: "What is the main difference between the Fluke 116 and 117?",
      answer:
        "The 117 is built for electricians: it adds VoltAlert non-contact detection and 6 A and 10 A current ranges. The 116 is built for HVAC: it swaps those for a 600.0 µA range at 0.1 µA and a Type K temperature input, with an 80BK probe in the box. Voltage, resistance, capacitance, LoZ and the case are shared.",
    },
    {
      question: "Does the Fluke 116 have non-contact voltage detection?",
      answer:
        "No. Fluke's 116 product page and the 110 Series datasheet list VoltAlert only on the Fluke 117. If you carry a 116 for wiring work, add a separate non-contact pen tester for quick checks, and still prove circuits dead with the test leads before touching anything.",
    },
    {
      question: "Can the Fluke 116 measure amps?",
      answer:
        "Only microamps. Its single current input reads up to 600.0 µA AC or DC with 0.1 µA resolution, which suits flame sensors and small control currents. There is no milliamp or amp range, so motor, compressor or appliance current needs a clamp meter. The 117 reads up to 10 A through its A jack.",
    },
    {
      question: "Do both the Fluke 116 and 117 have LoZ?",
      answer:
        "Yes. Both have an AutoVolt dial position that selects AC or DC automatically and drops the input to about 3 kΩ, which drains capacitively coupled ghost voltage. Fluke gives the same ±(2.0% + 3) accuracy on its 600.0 V range for both. In the 110 Series, the 115 is the model without LoZ.",
    },
    {
      question: "Can an electrician use the Fluke 116 instead of the 117?",
      answer:
        "Yes, for voltage, resistance, continuity, capacitance and ghost-voltage checks, since those functions match the 117. You lose built-in non-contact detection and any way to read load current through the leads. Electricians who already carry a clamp meter and a pen tester can manage, but most are better served by the 117.",
    },
    {
      question: "Can the Fluke 117 test a furnace flame sensor?",
      answer:
        "Not usefully. Flame-sensor current is typically a few microamps, and the 117's finest current step is 1 mA, so the display reads zero. Fluke designed the 116 for this job with its 600.0 µA range at 0.1 µA resolution. HVAC clamp meters with a µA range, such as the Klein CL445, also do it.",
    },
    {
      question: "Is the Fluke 116 or 117 better for HVAC?",
      answer:
        "For technicians who service gas furnaces, the 116: it reads flame-rod current to 0.1 µA and Type K temperature with the included 80BK probe, and the 117 can do neither. On cooling calls the two are close, since both test run capacitors and have LoZ for 24 V controls. Carry a clamp meter with either for compressor and blower amps.",
    },
    {
      question: "Are the Fluke 116 and 117 the same size?",
      answer:
        "Yes. Fluke lists both at 167 × 84 × 46 mm and 550 g, running on one 9V battery with about 400 hours of typical life without the backlight. Both carry a 3-year warranty and the same CAT III 600V rating, so holsters, hangers and accessories for one fit the other.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 117 review", href: "/multimeters/fluke-117-review" },
    { label: "Fluke 115 vs Fluke 117", href: "/multimeters/fluke-115-vs-fluke-117" },
    { label: "Fluke 116 vs Fluke 115 for HVAC", href: "/multimeters/fluke-116-vs-fluke-115" },
    { label: "Fluke 117 vs Fluke 179", href: "/multimeters/fluke-117-vs-fluke-179" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
    { label: "Best multimeter for HVAC technicians", href: "/multimeters/best-multimeter-for-hvac-technicians" },
  ],
};

export default function Fluke116VsFluke117Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
