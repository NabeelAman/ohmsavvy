import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  MeterReadout,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const description =
  "Test a 48V LiFePO4 battery for cell imbalance: read per-cell voltages and delta in the BMS app, top vs bottom balancing, and why pack voltage hides weak cells.";

export const metadata = buildMetadata({
  title: "48V LiFePO4 Battery Cell Imbalance Test",
  description,
  path: "/multimeters/how-to-test-a-48v-lifepo4-battery-for-voltage-imbalance-between-cells",
});

const all = getAllPicks("multimeters");
const fluke87v = all.find((p) => p.name === "Fluke 87V")!;
const fluke289 = all.find((p) => p.name === "Fluke 289")!;
const ht208d = all.find((p) => p.name === "KAIWEETS HT208D")!;

const link = "text-accent hover:underline";

// Illustrative per-cell voltages near the top of charge for a 16S pack with one runaway cell.
const cells = [3.452, 3.448, 3.455, 3.449, 3.451, 3.447, 3.453, 3.45, 3.446, 3.452, 3.612, 3.449, 3.451, 3.448, 3.454, 3.444];

/** Sixteen cell bars near full charge: fifteen sit together, cell 11 has run ahead and will trip the BMS. */
function CellBarsDiagram() {
  const base = 3.4;
  const scale = 500; // px per volt above base
  return (
    <svg viewBox="0 0 340 190" className="w-full h-auto" role="img" aria-label="Bar chart of sixteen LiFePO4 cell voltages near full charge. Fifteen cells sit close to 3.45 volts while cell 11 has risen to about 3.61 volts, near the BMS over-voltage cutoff.">
      <line x1="20" y1="150" x2="330" y2="150" className="stroke-foreground" strokeWidth="1.2" />
      <line x1="20" y1={150 - (3.65 - base) * scale} x2="330" y2={150 - (3.65 - base) * scale} className="stroke-accent" strokeWidth="1.2" strokeDasharray="4 3" />
      <text x="330" y={144 - (3.65 - base) * scale} fontSize="9" textAnchor="end" className="fill-accent">typical cell cutoff ≈ 3.65 V</text>
      {cells.map((v, i) => {
        const h = (v - base) * scale;
        const x = 24 + i * 19;
        return (
          <g key={i}>
            <rect x={x} y={150 - h} width="13" height={h} className={i === 10 ? "fill-accent" : "fill-muted"} opacity={i === 10 ? 1 : 0.5} />
            <text x={x + 6.5} y="163" fontSize="8" textAnchor="middle" className="fill-muted">{i + 1}</text>
          </g>
        );
      })}
      <text x="175" y="182" fontSize="9.5" textAnchor="middle" className="fill-muted">cell number (bars start at 3.40 V to exaggerate the gap)</text>
    </svg>
  );
}

export default function HowToTestA48vLifepo4BatteryForCellImbalancePage() {
  return (
    <HowToShell
      title="How to Test a 48V LiFePO4 Battery for Voltage Imbalance Between Cells"
      description={description}
      path="/multimeters/how-to-test-a-48v-lifepo4-battery-for-voltage-imbalance-between-cells"
      category="multimeters"
      published="2026-10-25"
      intro={
        <>
          To test a 48V LiFePO4 battery for voltage imbalance between cells, read the individual cell voltages
          the battery management system (BMS) reports, and compare the highest and lowest cell at rest, near
          full charge and under load. The gap between them, the delta, is the number that matters. The total
          pack voltage can look perfect while one cell is racing ahead of the others, because sixteen cells add
          up and a single outlier disappears in the sum. For installed home batteries the whole check is done
          from the app; only owners of DIY packs should ever measure at the cells, and then only with the pack
          isolated.
        </>
      }
      aside={{
        image: fluke87v.image,
        alt: "Fluke 87V digital multimeter",
        caption: (
          <>
            A high-resolution, CAT-rated meter verifies the BMS&apos;s numbers on an isolated DIY pack. See the{" "}
            <Link href="/multimeters/fluke-87v-review" className={link}>
              Fluke 87V review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "why-imbalance", label: "Why pack voltage hides imbalance" },
        { id: "causes", label: "Symptoms and likely causes" },
        { id: "normal-values", label: "What normal cell voltages look like" },
        { id: "bms-test", label: "Test the cells from the BMS app" },
        { id: "balancing", label: "Top balancing vs bottom balancing" },
        { id: "diy-meter", label: "Verifying a DIY pack with a meter" },
        { id: "escalate", label: "When to stop and call the installer" },
      ]}
      faq={[
        {
          q: "What cell delta is too much on a 48V LiFePO4 battery?",
          a: "There's no single universal figure, and your battery maker's documentation takes priority. As a hedged guide, a healthy pack at rest in the middle of its charge often shows a delta of a few millivolts to a couple of tens of millivolts. A delta that grows past roughly 50 to 100 mV near full or near empty, or keeps growing week after week, deserves attention.",
        },
        {
          q: "Can I fix an imbalanced battery by charging it to 100% and leaving it?",
          a: "Often, yes, if the cause is a state-of-charge imbalance and the BMS has balancing. Most BMS boards balance near the top of charge, and their balancing current is small, so holding the pack at full charge for several hours or a few days lets the high cells bleed down. If one cell is always the outlier and the delta returns quickly, it is more likely a weak cell that balancing can't cure.",
        },
        {
          q: "My inverter says the battery is full but it only reached 54 V. Why?",
          a: "A 16-cell LiFePO4 pack at 3.4 V per cell sits at about 54.4 V, and the BMS will stop charging as soon as any one cell reaches its over-voltage limit. If one cell gets there early, charging stops with the pack total below the expected full voltage. That is exactly the pattern a cell imbalance produces.",
        },
        {
          q: "Is it safe to open my home battery to check the cells?",
          a: "No, not for a factory-built home storage system. Its enclosure holds a high-energy DC pack, opening it can void the warranty, and the BMS app already shows the cell data. Only owners of self-built packs, who already work on them, should consider direct cell measurements, and only with the pack isolated.",
        },
        {
          q: "How often should I check the cell balance on my 48V battery?",
          a: "A quick look at the highest and lowest cell voltages in the BMS app once a month is a sensible habit, plus a check after long storage, a deep discharge or a firmware update. Compare readings taken at a similar state of charge, ideally near full, because that is where LiFePO4 cells reveal their differences. Write the delta down so you can tell whether it is slowly creeping wider.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-diagnose-a-solar-battery-that-stops-charging-at-80-percent",
          title: "How to Diagnose a Solar Battery That Stops Charging at 80%",
          desc: "Charge limits, BMS settings, temperature and cell balancing.",
        },
        {
          href: "/multimeters/how-to-test-a-battery-protection-circuit-with-a-multimeter",
          title: "How to Test a Battery Protection Circuit",
          desc: "How cell-level protection cuts off charging and discharging.",
        },
      ]}
    >
      <Callout title="A 48 V lithium pack can deliver huge fault current">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Do not open the enclosure of a home energy storage system, a rack battery or an inverter. Cell
            checks on those are done through the app or by the installer.
          </li>
          <li>
            A swollen, hissing, hot or smoking battery, or an electrolyte smell, means stop. Don&apos;t charge
            or discharge it, keep people away, and call the installer or manufacturer; call 911 for fire or
            smoke. Lithium battery fires are hard to extinguish.
          </li>
          <li>
            On a DIY pack, a probe slipping between two busbars can short several cells and arc instantly. Any
            direct measurement needs the pack isolated, insulated tools and probes, no jewelry, and eye
            protection.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="why-imbalance" className="text-xl font-semibold mb-3">Why pack voltage hides imbalance</h2>
        <p className="text-muted leading-7 mb-4">
          A typical &quot;48 V&quot; LiFePO4 battery is sixteen cells in series, often written 16S. Each cell
          has a nominal voltage of 3.2 V, so the pack&apos;s nominal figure is 51.2 V. Because the cells sit
          in series, they all carry the same current, but they are never quite identical in capacity, internal
          resistance or self-discharge. Over many cycles those small differences let some cells drift to a
          higher state of charge than others.
        </p>
        <p className="text-muted leading-7 mb-4">
          The pack meter only sees the total. Fifteen cells at 3.45 V and one at 3.61 V add up to about 55.4 V, a
          completely ordinary number. LiFePO4 makes this worse because its voltage curve is unusually flat
          across most of the charge range: in the middle, every cell reads close to 3.3 V regardless of
          whether it is at 30% or 70%. Differences only become visible at the steep ends of the curve, near
          full and near empty, which is where the BMS acts.
        </p>
        <Figure caption={<>Illustrative cell voltages near the top of charge. Cell 11 reaches the BMS&apos;s over-voltage limit while the rest still have room, so charging stops early even though the pack total looks normal.</>}>
          <CellBarsDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and likely causes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "What to check", "Who should fix it"]}
          rows={[
            ["Charging stops before the pack reaches full voltage", "One cell hits its over-voltage limit first", "Max cell voltage and delta at end of charge", "BMS balancing; installer if it persists"],
            ["Usable capacity has shrunk", "A low-capacity cell limits the whole string", "Which cell is low at the bottom of discharge", "Installer or battery maker"],
            ["Low-voltage cutoff while pack shows charge left", "Weak cell drops to its minimum under load", "Min cell voltage during a heavy load", "Installer or battery maker"],
            ["Same cell is high at the top and low at the bottom", "Cell with lower capacity than the rest", "Cell numbers in the BMS log", "Cell replacement by a qualified person"],
            ["Delta large at the top, small at the bottom", "State-of-charge imbalance", "Delta after several hours at full charge", "BMS balancing (often self-correcting)"],
            ["One cell sags far more under load", "High internal resistance or a loose busbar", "Cell readings at rest vs under load", "Installer; DIY owner with care"],
            ["BMS reports cell over-temperature", "Hot cell or hot connection", "Cell temperature sensors in the app", "Stop and call the installer"],
          ]}
        />
      </section>

      <section>
        <h2 id="normal-values" className="text-xl font-semibold mb-3">What normal cell voltages look like</h2>
        <p className="text-muted leading-7 mb-4">
          Exact limits differ between manufacturers, so treat these as typical, hedged figures and check your
          battery&apos;s datasheet. Fully charged LiFePO4 cells commonly settle around 3.35 to 3.4 V after
          resting, with charge targets usually somewhere between about 3.45 and 3.6 V per cell, which is 55.2
          to 57.6 V for the pack. BMS over-voltage protection is often set near 3.65 V per cell. At the empty
          end, cells drop quickly below about 3.0 V, and protection commonly cuts in around 2.5 to 2.8 V.
        </p>
        <p className="text-muted leading-7">
          The delta depends on when you look. In the flat middle of the curve, even a badly matched pack can
          show a small delta, which is why a mid-charge reading proves little. Near the top, while balancing
          is active, a modest spread is normal and should shrink as the BMS works. A delta that is large at
          the top, does not shrink after hours at full charge, and widens again every cycle is the pattern to
          act on.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="bms-test">Test the cells from the BMS app</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Most home batteries and many DIY BMS boards show every cell&apos;s voltage, the highest and lowest
          cell numbers, the delta, cell temperatures and whether balancing is active, through a phone app or the
          inverter&apos;s display. Take four snapshots, each with a screenshot and a timestamp.
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7 mb-4">
          <li>
            <span className="text-foreground">At rest, mid-charge.</span> No charging or discharging for an
            hour. This gives a baseline and usually a small delta.
          </li>
          <li>
            <span className="text-foreground">At the end of a full charge.</span> The most revealing reading.
            Note which cell is highest and how far it sits above the lowest.
          </li>
          <li>
            <span className="text-foreground">Under a steady load.</span> With a large appliance running, see
            whether one cell drops noticeably further than the rest. That suggests higher internal resistance
            or a poor connection.
          </li>
          <li>
            <span className="text-foreground">Near the bottom of discharge,</span> if your normal use takes it
            there. The lowest cell here is the one limiting usable capacity.
          </li>
        </ul>
        <p className="text-muted leading-7">
          Repeat the end-of-charge snapshot over a week. If the same cell number always leads, the BMS is
          either still catching up or that cell is genuinely different. Also compare the pack voltage the BMS
          reports with the voltage the inverter shows; a gap of more than a fraction of a volt can mean a
          calibration issue or a resistive connection between them, which the installer should check.
        </p>
      </section>

      <section>
        <h2 id="balancing" className="text-xl font-semibold mb-3">Top balancing vs bottom balancing</h2>
        <p className="text-muted leading-7 mb-4">
          Balancing means bringing cells to the same state of charge at a chosen point. Top balancing aligns
          them at full charge, which suits most home storage because the batteries spend much of their time
          near the top. Most BMS boards do it passively, bleeding a little current from the highest cells
          through resistors once they cross a threshold voltage. The bleed current is small, so correcting a
          large imbalance can take many hours or several days at full charge. Active balancers move energy from
          high cells to low ones and work faster.
        </p>
        <p className="text-muted leading-7">
          Bottom balancing aligns cells at the empty end and is mainly a DIY assembly technique, used when a
          pack is regularly run low. The two approaches tell you different things when you diagnose. If a cell
          is high at the top but normal at the bottom, its state of charge has drifted and balancing will fix
          it. If the same cell is high at the top and low at the bottom, it has less capacity than its
          neighbors, so it fills and empties first, and no amount of balancing will restore the lost energy.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="diy-meter">Verifying a DIY pack with a meter</StepHeading>
        <p className="text-muted leading-7 mb-4">
          This section applies only to owners of self-built packs who already maintain them. If that isn&apos;t
          you, skip it and give your BMS screenshots to the installer. Before any probing, switch off the
          inverter and charge sources, open the battery&apos;s DC disconnect or breaker, and confirm the pack is
          isolated. Use a meter rated CAT III 1000 V or better, insulated probes with minimal exposed tip,
          insulated tools, safety glasses, and remove rings and watches. Measure one cell at a time, across that
          cell&apos;s own two terminals only, never reaching across busbars.
        </p>
        <Figure caption={<>Direct readings across two cells on an isolated DIY pack at full charge. The BMS reported 3.452 V and 3.611 V for the same cells, so its sensing is accurate and the imbalance is real.</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="3.451" unit="V DC" mode="cell 3" />
            <MeterReadout value="3.610" unit="V DC" mode="cell 11" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The purpose is to confirm the BMS, not replace it. If the meter and the app agree within a few
          millivolts, trust the app for ongoing monitoring. If one cell&apos;s reading disagrees with the BMS,
          suspect a loose sense lead or busbar on that cell, which is a common source of false imbalance. A
          DC clamp on one of the pack&apos;s main cables lets you compare actual charge or discharge current
          with what the BMS reports. For background on how protection boards react to cell voltages, see{" "}
          <Link href="/multimeters/how-to-test-a-battery-protection-circuit-with-a-multimeter" className={link}>
            testing a battery protection circuit
          </Link>
          .
        </p>
      </section>

      <section id="escalate">
        <KeyIdea title="When to stop and call the installer">
          Call the installer or battery manufacturer if the delta stays large after the pack has spent a day or
          more at full charge, if one cell repeatedly triggers over-voltage or under-voltage protection, if
          usable capacity has dropped sharply, if a cell temperature alarm appears, or if the BMS and inverter
          disagree about pack voltage. Installed systems are usually under warranty, and the maker may be able
          to read deeper logs remotely. For swelling, heat, hissing or smell, stop using the battery
          immediately. If your battery stops charging early, read{" "}
          <Link href="/multimeters/how-to-diagnose-a-solar-battery-that-stops-charging-at-80-percent" className={link}>
            a solar battery that stops charging at 80%
          </Link>
          , and if it drains overnight,{" "}
          <Link href="/multimeters/why-does-my-home-battery-lose-charge-overnight-even-when-nothing-is-running" className={link}>
            a home battery that loses charge overnight
          </Link>
          .
        </KeyIdea>
      </section>

      <section>
        <ProductStrip
          title="Meters for verifying a DIY battery bank"
          items={[
            {
              name: "Fluke 87V",
              image: fluke87v.image,
              alt: "Fluke 87V digital multimeter",
              href: "/multimeters/fluke-87v-review",
              note: "Hands-on Tested. CAT III 1000V / CAT IV 600V with a 19,999-count high-resolution mode for millivolt cell comparisons.",
            },
            {
              name: "Fluke 289",
              image: fluke289.image,
              alt: "Fluke 289 logging multimeter",
              href: "/multimeters/best-multimeters-for-measuring-low-resistance",
              note: "50,000-count logging meter, CAT IV 600V / CAT III 1000V, with on-screen TrendCapture to watch a cell over time.",
            },
            {
              name: "KAIWEETS HT208D",
              image: ht208d.image,
              alt: "KAIWEETS HT208D AC/DC clamp meter",
              href: "/multimeters/best-multimeters-for-solar-panel-testing",
              note: "Budget AC/DC clamp to 1000 A, rated CAT IV 600V / CAT III 1000V, for reading DC current on a pack cable.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
