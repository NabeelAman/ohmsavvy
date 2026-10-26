import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const description =
  "How to diagnose a solar battery that stops charging at 80%: charge limits, BMS settings, temperature cutoffs, cell balancing and inverter configuration.";

export const metadata = buildMetadata({
  title: "Solar Battery Stops Charging at 80%? Diagnose It",
  description,
  path: "/multimeters/how-to-diagnose-a-solar-battery-that-stops-charging-at-80-percent",
});

const all = getAllPicks("multimeters");
const fluke393 = all.find((p) => p.name === "Fluke 393 FC")!;
const ht208d = all.find((p) => p.name === "KAIWEETS HT208D")!;
const fluke87v = all.find((p) => p.name === "Fluke 87V")!;

const link = "text-accent hover:underline";

/** Charge current against state of charge: a normal taper versus a hard stop. */
function ChargeProfileDiagram() {
  return (
    <svg viewBox="0 0 340 190" className="w-full h-auto" role="img" aria-label="Chart of charge current against state of charge: a normal charge holds full current then tapers gently toward 100 percent, while a limited charge drops to zero abruptly at 80 percent">
      <g className="stroke-foreground" strokeWidth="1.4" fill="none">
        <line x1="40" y1="20" x2="40" y2="150" />
        <line x1="40" y1="150" x2="325" y2="150" />
      </g>
      <line x1="248" y1="20" x2="248" y2="150" className="stroke-muted" strokeWidth="1" strokeDasharray="3 3" />
      <polyline points="40,50 270,50 290,80 305,115 318,145" fill="none" className="stroke-foreground" strokeWidth="2" />
      <polyline points="40,56 248,56 248,148" fill="none" className="stroke-accent" strokeWidth="2.2" />
      <g fontSize="9.5" className="fill-muted">
        <text x="14" y="54">full</text>
        <text x="20" y="153">0</text>
        <text x="36" y="166">0%</text>
        <text x="238" y="166">80%</text>
        <text x="306" y="166">100%</text>
        <text x="150" y="182" textAnchor="middle">State of charge</text>
      </g>
      <g fontSize="9.5">
        <text x="140" y="44" textAnchor="middle" className="fill-foreground">normal: holds, then tapers near full</text>
        <text x="190" y="100" textAnchor="middle" className="fill-accent">limit or cutoff:</text>
        <text x="190" y="112" textAnchor="middle" className="fill-accent">drops to zero at 80%</text>
      </g>
    </svg>
  );
}

export default function HowToDiagnoseASolarBatteryThatStopsChargingAt80PercentPage() {
  return (
    <HowToShell
      title="How to Diagnose a Solar Battery That Stops Charging at 80%"
      description={description}
      path="/multimeters/how-to-diagnose-a-solar-battery-that-stops-charging-at-80-percent"
      category="multimeters"
      published="2026-10-25"
      intro={
        <>
          When a solar battery stops charging at 80% day after day, the round number is the clue. A battery that
          is failing tends to stall at random levels; one that halts at exactly 80% is usually obeying a limit
          someone set, in the battery&apos;s own settings, in the inverter or in a utility program. The other
          common causes are a temperature cutoff, one cell reaching its upper voltage limit before the rest, or an
          inverter configured for the wrong battery. Work through them in that order and most cases are solved from
          the app without anyone touching the hardware.
        </>
      }
      aside={{
        image: fluke393.image,
        alt: "Fluke 393 FC solar clamp meter",
        caption: (
          <>
            DC clamp meters let installers confirm charge current without breaking the circuit. See{" "}
            <Link href="/multimeters/best-multimeters-for-solar-panel-testing" className={link}>
              meters for solar panel testing
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "stopped-or-tapering", label: "Stopped, or just tapering?" },
        { id: "causes", label: "Symptoms and likely causes" },
        { id: "charge-limits", label: "Charge limits and operating modes" },
        { id: "bms-temperature", label: "BMS settings and temperature limits" },
        { id: "balancing", label: "When one cell ends the charge" },
        { id: "inverter-config", label: "Inverter configuration" },
        { id: "measurements", label: "What you can measure safely" },
        { id: "installer", label: "When to call the installer" },
      ]}
      faq={[
        {
          q: "Is charging only to 80% bad for my solar battery?",
          a: "No. Many systems cap daily charging below 100% on purpose because it can reduce wear, and LiFePO4 chemistry tolerates partial charging well. The question is whether the cap is deliberate. If you want more usable energy, raise it within the maker's guidance, keeping in mind that some systems still need an occasional full charge to recalibrate.",
        },
        {
          q: "Why does my battery reach 100% in summer but stop at 80% in winter?",
          a: "Two likely reasons: less solar energy is available in the hours the battery is allowed to charge, and lithium batteries limit or block charging when the cells are cold. Check the battery temperature in the app during the morning charge, and compare solar production with what the house used at the same time.",
        },
        {
          q: "My app shows 80% but the pack voltage looks low. Which is right?",
          a: "State of charge is estimated by counting energy in and out, then corrected when the battery hits a known point such as full. If the battery never reaches full, the estimate can drift. LiFePO4 voltage is very flat across the middle of its range, so pack voltage alone is a poor guide too. Report the mismatch to the installer.",
        },
        {
          q: "Does this differ for 230 V European systems?",
          a: "The battery-side behavior is identical, since cell chemistry and BMS limits don't depend on the grid voltage. What differs is the inverter's grid settings and export rules, which follow national grid codes, so limits on exporting or grid charging can vary by country and network operator.",
        },
        {
          q: "How long should a solar battery take to charge from 80 to 100 percent?",
          a: "Longer than the same 20% lower down. As an illustrative example, a 10 kWh battery needs about 2 kWh to go from 80 to 100%, about an hour at a steady 2 kW. Near full, the charger holds a constant voltage and the current tapers, and the BMS may pause to balance cells, so the final stretch commonly takes noticeably longer than that arithmetic suggests.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-48v-lifepo4-battery-for-voltage-imbalance-between-cells",
          title: "How to Test a 48V LiFePO4 Battery for Cell Imbalance",
          desc: "Reading cell-voltage delta and what balanced cells look like in a BMS app.",
        },
        {
          href: "/multimeters/how-to-test-a-solar-panel-with-a-multimeter",
          title: "How to Test a Solar Panel With a Multimeter",
          desc: "Open-circuit voltage and short-circuit current checks on a single panel.",
        },
      ]}
    >
      <Callout title="DC battery and PV equipment: settings only, no tools inside">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Don&apos;t open the battery, the inverter, combiner boxes or rapid-shutdown devices, and never
            disconnect PV connectors under load. Solar strings stay live whenever there is daylight, and DC arcs
            keep burning once they start.
          </li>
          <li>
            A swollen, hot or smelly battery, hissing, or smoke: leave, call 911 and say it is a lithium battery.
          </li>
          <li>
            Don&apos;t try to force a full charge by changing voltage limits beyond what the battery maker allows.
            Charge limits protect the cells.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="stopped-or-tapering" className="text-xl font-semibold mb-3">Stopped, or just tapering?</h2>
        <p className="text-muted leading-7 mb-4">
          Lithium batteries charge at a fairly steady current for most of the cycle, then the charger holds a
          fixed voltage and the current tapers as the cells fill. On some systems that final phase is slow, so the
          percentage seems to stall in the 80s or 90s. Look at the charge power in the app rather than the
          percentage. If it is falling gradually toward zero, the battery is completing a normal charge. If it
          drops from a healthy figure to nothing at a fixed percentage, something is ending the charge.
        </p>
        <p className="text-muted leading-7">
          Also check that energy is available. A battery can only charge from solar surplus unless grid charging
          is allowed, and by mid-afternoon in winter there may be none. If the house is using everything the
          panels make, the battery appears to stop for reasons that have nothing to do with the battery.
        </p>
        <Figure caption={<>A normal charge tapers smoothly near full. A configured limit or protective cutoff drops current to zero at a fixed point.</>}>
          <ChargeProfileDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and likely causes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "What to check", "Who should fix it"]}
          rows={[
            ["Stops at exactly 80% every day, any weather", "Charge limit or maximum state of charge setting", "Battery and inverter app limits", "Owner settings"],
            ["Stops at 80% only on cold mornings", "Low-temperature charge limit in the BMS", "Battery temperature during charging", "Installer if location is the cause"],
            ["Stops at varying 75–90%, one cell high in the app", "Cell imbalance; one cell hits its upper limit", "Cell voltages and delta in the BMS view", "Installer; battery maker"],
            ["Stops after an inverter update or replacement", "Wrong battery type or charge voltage in the inverter", "Battery profile and charge settings", "Installer"],
            ["Stops when export begins in the afternoon", "Export priority or utility program", "Mode, export limit, program enrollment", "Owner; installer"],
            ["Percentage stuck but voltage keeps rising", "State-of-charge estimate drifted", "Whether a full charge ever completes", "Installer"],
          ]}
        />
      </section>

      <section>
        <h2 id="charge-limits" className="text-xl font-semibold mb-3">Charge limits and operating modes</h2>
        <p className="text-muted leading-7 mb-4">
          Start with the boring explanation, because it is the most likely one. Many battery apps let you set a
          maximum charge level, and some ship with a cap below 100% to extend cell life. Inverters often have a
          separate setting, so a limit can live in either place. Utility and virtual power plant programs may also
          hold headroom in the battery so it can absorb or dispatch energy on their schedule. Read the maximum
          state of charge, the backup reserve, the operating mode and any program enrollment, and write them down
          before you change anything.
        </p>
        <p className="text-muted leading-7">
          Don&apos;t confuse the reserve with the ceiling. The reserve is the floor the battery keeps for outages;
          the ceiling is where charging stops. A system set to self-consumption with an 80% ceiling and a 20%
          reserve cycles between those two numbers and is working correctly. If you find no limit anywhere and the
          battery still halts at 80%, move on to temperature and balance.
        </p>
      </section>

      <section>
        <h2 id="bms-temperature" className="text-xl font-semibold mb-3">BMS settings and temperature limits</h2>
        <p className="text-muted leading-7 mb-4">
          The battery management system decides what the cells can accept, and it overrules the inverter.
          Lithium cells shouldn&apos;t be charged at full rate when they are cold; many LiFePO4 batteries reduce or
          block charging near freezing, around 32 °F (0 °C), and taper again when they are hot. A battery in an
          unheated garage or outdoors may wake on a winter morning too cold to charge, warm up slowly, and only
          start accepting full current after the best solar hours have passed. The result looks like a cap at a
          similar level every cold day.
        </p>
        <p className="text-muted leading-7">
          Most apps show battery or cell temperature. Log it alongside charge power for a few mornings. If charging
          resumes as the temperature rises, the BMS is protecting the cells. Some batteries include heaters; others
          need a different location, which is a conversation for the installer. BMS parameters such as charge
          voltage limits are set by the battery maker and should only be changed by them or the installer.
        </p>
      </section>

      <section>
        <h2 id="balancing" className="text-xl font-semibold mb-3">When one cell ends the charge</h2>
        <p className="text-muted leading-7 mb-4">
          A 48 V class LiFePO4 battery typically has 16 cells in series, each nominally 3.2 V, for about 51.2 V
          nominal. The BMS stops charging when any single cell reaches its upper limit, even if the others are
          still well below it. If one cell sits slightly higher in charge than its neighbors, it gets to the top
          first and ends the charge for the whole pack. The state-of-charge estimate may then read 80% or so
          because the average is still low.
        </p>
        <Figure caption={<>Illustrative BMS cell view at the moment charging stopped: one high cell reaches its limit while the rest lag behind. Bar length shows millivolts above 3.30 V.</>}>
          <BarChart
            items={[
              { label: "Cells 1–5 (average)", value: 80, display: "3.38 V" },
              { label: "Cells 6–10 (average)", value: 90, display: "3.39 V" },
              { label: "Cell 11", value: 320, display: "3.62 V", highlight: true },
              { label: "Cells 12–16 (average)", value: 80, display: "3.38 V" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          In the BMS view, compare the highest and lowest cell voltages at the moment charging ends. A small spread
          is normal. A spread that grows over weeks, or the same cell always leading, means the balancing circuit
          isn&apos;t keeping up or that cell has drifted. Many systems balance only near the top of charge, so a
          tight charge ceiling can make imbalance worse over time. The fix might be a scheduled full charge,
          a firmware update or a warranty claim, and all of those go through the installer. For more detail on
          reading cell data, see{" "}
          <Link href="/multimeters/how-to-test-a-48v-lifepo4-battery-for-voltage-imbalance-between-cells" className={link}>
            testing a 48V LiFePO4 battery for cell imbalance
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="inverter-config" className="text-xl font-semibold mb-3">Inverter configuration</h2>
        <p className="text-muted leading-7 mb-4">
          With a hybrid inverter and a battery from a different maker, the two have to agree on how the battery
          is charged. If the inverter isn&apos;t talking to the BMS, or is set to a generic lead-acid or wrong
          lithium profile, it may apply a charge voltage that is too low to finish the charge, or stop at a
          voltage it thinks means full. The same thing can happen after a firmware update resets settings, or after
          a replacement inverter goes in with default values.
        </p>
        <p className="text-muted leading-7">
          In the inverter app, check whether battery communication shows as connected, which battery type is
          selected, and the maximum charge current. A communication error usually forces the inverter into a
          conservative fallback mode. Changing the battery profile or charge voltage is commissioning work; send
          the installer screenshots of what you found.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="measurements">What you can measure safely</StepHeading>
        <p className="text-muted leading-7 mb-4">
          For a sealed, installer-fitted home battery, the measurements that matter come from the system itself:
          charge power, cell voltages, temperature and state of charge, logged over several days. Export the data
          or take timed screenshots at the moment charging stops each day. That record answers most of the
          questions above without a meter.
        </p>
        <p className="text-muted leading-7">
          Installers confirm the picture with a DC clamp meter on the battery conductors, inside enclosures that
          stay closed for homeowners. If you own a DIY pack with exposed terminals, a CAT III rated meter with
          insulated probes can read pack voltage at the terminals with the pack isolated from the inverter, but
          treat it with the same respect as mains: a 48 V pack can deliver enormous current into a slipped probe.
          Pack voltage alone won&apos;t reveal one high cell, which is why the BMS cell view is the better tool.
          Related:{" "}
          <Link href="/multimeters/how-to-test-a-battery-protection-circuit-with-a-multimeter" className={link}>
            testing a battery protection circuit
          </Link>
          .
        </p>
      </section>

      <section id="installer">
        <KeyIdea title="When to call the installer or the battery maker">
          Call the installer if no setting explains the 80% stop, if the cell spread keeps widening, if the
          inverter reports lost battery communication, or if the battery is too cold to charge on most winter
          mornings. Ask the battery maker, through the installer, about firmware and balancing behavior and about
          any warranty claim for a drifting cell. If the battery also drops overnight more than you expect, see{" "}
          <Link href="/multimeters/why-does-my-home-battery-lose-charge-overnight-even-when-nothing-is-running" className={link}>
            why a home battery loses charge overnight
          </Link>
          .
        </KeyIdea>
      </section>

      <section>
        <ProductStrip
          title="Meters installers use on solar batteries"
          items={[
            {
              name: "Fluke 393 FC",
              image: fluke393.image,
              alt: "Fluke 393 FC solar clamp meter",
              href: "/multimeters/best-multimeters-for-solar-panel-testing",
              note: "CAT III 1500V solar clamp with DC current to 999.9 A and DC power. For qualified PV work.",
            },
            {
              name: "KAIWEETS HT208D",
              image: ht208d.image,
              alt: "KAIWEETS HT208D clamp meter",
              href: "/multimeters/best-multimeters-for-solar-panel-testing",
              note: "Budget AC/DC clamp to 1000 A with 1000 V DC, rated CAT IV 600V / CAT III 1000V.",
            },
            {
              name: "Fluke 87V",
              image: fluke87v.image,
              alt: "Fluke 87V digital multimeter",
              href: "/multimeters/fluke-87v-review",
              note: "Hands-on Tested. CAT III 1000V / CAT IV 600V with a 19,999-count mode for fine voltage readings.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
