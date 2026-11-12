import Link from "@/components/AppLink";
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
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "A multimeter can't read mAh directly. Test lithium battery capacity with a constant-load discharge: current × time, with a worked 18650 example and SoC table.";

export const metadata = buildMetadata({
  title: "How to Test Lithium Battery Capacity With a Meter",
  description,
  path: "/multimeters/how-to-test-lithium-battery-capacity-with-a-multimeter",
});

const fluke15 = picks.find((p) => p.name === "Fluke 15B+")!;
const fluke17 = picks.find((p) => p.name === "Fluke 17B+")!;
const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;

const link = "text-accent hover:underline";

/** Discharge test rig: cell, series ammeter, load resistor, and a second meter across the cell. */
function DischargeRigDiagram() {
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full h-auto"
      role="img"
      aria-label="Circuit for testing lithium battery capacity with a multimeter: the cell feeds a load resistor through a meter set to DC amps in series, while a second meter set to DC volts sits directly across the cell terminals to log the voltage until the cutoff."
    >
      {/* cell */}
      <rect x="20" y="70" width="44" height="80" rx="6" className="fill-surface stroke-foreground" strokeWidth="2" />
      <rect x="34" y="62" width="16" height="8" rx="2" className="fill-muted stroke-foreground" strokeWidth="1.5" />
      <text x="42" y="105" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">18650</text>
      <text x="42" y="120" fontSize="9" textAnchor="middle" className="fill-muted">3.0–4.2 V</text>
      <text x="56" y="58" fontSize="10" fontWeight="700" className="fill-foreground">+</text>
      <text x="56" y="168" fontSize="10" fontWeight="700" className="fill-foreground">−</text>
      {/* wires */}
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        <path d="M42 62 V30 H130" />
        <path d="M200 30 H290 V80" />
        <path d="M290 130 V180 H42 V150" />
      </g>
      {/* ammeter */}
      <circle cx="165" cy="30" r="22" className="fill-surface stroke-accent" strokeWidth="2" />
      <text x="165" y="34" fontSize="12" fontWeight="700" textAnchor="middle" className="fill-accent">A</text>
      <line x1="130" y1="30" x2="143" y2="30" className="stroke-foreground" strokeWidth="1.6" />
      <line x1="187" y1="30" x2="200" y2="30" className="stroke-foreground" strokeWidth="1.6" />
      <text x="165" y="66" fontSize="9" textAnchor="middle" className="fill-muted">DC amps, in series</text>
      {/* load */}
      <rect x="278" y="80" width="24" height="50" rx="3" className="fill-surface stroke-foreground" strokeWidth="1.8" />
      <text x="272" y="100" fontSize="9" textAnchor="end" className="fill-foreground">load</text>
      <text x="272" y="113" fontSize="9" textAnchor="end" className="fill-muted">8 Ω, 10 W</text>
      {/* voltmeter */}
      <g className="stroke-accent" strokeWidth="1.4" fill="none" strokeDasharray="4 3">
        <path d="M64 80 H110" />
        <path d="M64 140 H110" />
      </g>
      <circle cx="130" cy="110" r="22" className="fill-surface stroke-accent" strokeWidth="2" />
      <text x="130" y="114" fontSize="12" fontWeight="700" textAnchor="middle" className="fill-accent">V</text>
      <path d="M110 80 L118 92" className="stroke-accent" strokeWidth="1.4" />
      <path d="M110 140 L118 128" className="stroke-accent" strokeWidth="1.4" />
      <text x="130" y="152" fontSize="9" textAnchor="middle" className="fill-muted">DC volts, across cell</text>
      <text x="215" y="160" fontSize="9" className="fill-muted">stop at cutoff voltage</text>
    </svg>
  );
}

export default function HowToTestLithiumBatteryCapacityWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test Lithium Battery Capacity With a Multimeter"
      description={description}
      published="2026-11-13"
      path="/multimeters/how-to-test-lithium-battery-capacity-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          A multimeter cannot read lithium battery capacity in mAh directly; it only measures volts and amps at
          one instant. To test lithium battery capacity with a multimeter, fully charge the cell, discharge it
          through a known load while the meter reads the current, time how long it takes to reach the cutoff
          voltage, and multiply: capacity in mAh equals current in mA times hours. This page walks through that
          discharge test on an 18650 and a 12 V LiFePO4 pack, with the arithmetic shown, and explains why a
          voltage reading alone only tells you the state of charge.
        </>
      }
      aside={{
        image: fluke15.image,
        alt: "Fluke 15B+ digital multimeter with current ranges for a battery discharge test",
        caption: (
          <>
            A meter with a 10 A current range, such as the Fluke 15B+, can sit in series with the load for the
            whole discharge. See our{" "}
            <Link href="/multimeters/fluke-15b-plus-review" className={link}>
              Fluke 15B+ review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "why-voltage-is-not-capacity", label: "Why voltage isn't capacity" },
        { id: "causes", label: "Symptoms and likely causes" },
        { id: "charge-and-rest", label: "1. Charge and rest" },
        { id: "choose-the-load", label: "2. Pick a load and current" },
        { id: "wire-the-rig", label: "3. Wire the test rig" },
        { id: "discharge-and-log", label: "4. Discharge and log" },
        { id: "calculate-mah", label: "5. Calculate mAh and Wh" },
        { id: "judge-the-result", label: "6. Judge the result" },
        { id: "voltage-soc-table", label: "Voltage vs state of charge" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "How do I check lithium battery mAh with a multimeter?",
          a: "Charge the battery fully, then discharge it through a fixed load while the meter reads the current in series. Time the run until the cell reaches its cutoff voltage, around 3.0 V for Li-ion or 2.5 V for LiFePO4. Multiply the average current in mA by the hours. A 500 mA load that lasts 5.4 hours means about 2,700 mAh.",
        },
        {
          q: "Can a voltage reading tell me how much capacity is left?",
          a: "It tells you roughly how full the battery is, not how big its tank is. A worn 18650 that holds 1,800 mAh and a new one that holds 3,000 mAh both read about 4.2 V when full. The resting voltage table gives an approximate state of charge, and only a timed discharge reveals the actual capacity.",
        },
        {
          q: "What discharge current should I use for a capacity test?",
          a: "Use the current the manufacturer quotes for its rated capacity, usually 0.2C, meaning one fifth of the rated amp-hours. For a 3,000 mAh cell that is 600 mA. Higher currents finish faster but give a lower figure, because internal resistance makes the voltage reach cutoff sooner. Keep it the same between tests so the results compare.",
        },
        {
          q: "Is a lithium battery bad if it has 80% of its capacity?",
          a: "Many makers treat 80% of rated capacity as the end of rated life, and electric vehicle and power-station warranties often use a similar line. A cell at 80% still works; it just runs for 80% as long. Below about 70%, or if it also sags badly under load or gets warm at modest currents, retire it.",
        },
        {
          q: "Why does my capacity test give less than the rated mAh?",
          a: "Rated capacity is measured at a low current, at about 25 °C, from a full charge to the maker's cutoff. A higher test current, a cold room, stopping at a higher cutoff voltage, an incomplete charge, or resistance in the test leads all lower the result. Repeat the test with the datasheet's conditions before deciding the cell is worn.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-battery-protection-circuit-with-a-multimeter",
          title: "How to Test a Battery Protection Circuit",
          desc: "When a pack reads 0 V or cuts out early, check the BMS board before blaming the cells.",
        },
        {
          href: "/multimeters/how-to-measure-milliamps-with-a-multimeter",
          title: "How to Measure Milliamps With a Multimeter",
          desc: "Lead placement, fuse ratings and range choice for series current readings.",
        },
      ]}
    >
      <Callout title="Lithium cells can burn">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            A shorted 18650 can push tens of amps. Never let the probes, a loose clip or a tool bridge the
            terminals, and remove rings and watches before you start.
          </li>
          <li>
            Don&apos;t test a swollen, dented, leaking or hot cell. Put it in a metal container outdoors and take it
            to a battery recycler.
          </li>
          <li>
            Stay with the test, keep it on a non-flammable surface, and stop if the cell gets more than warm to the
            touch. Never discharge below the maker&apos;s cutoff voltage.
          </li>
          <li>
            Test large packs (power stations, e-bike, 12 V LiFePO4) through their own output port and BMS. Don&apos;t
            open a pack to reach the cells unless you know how; a dealer or battery shop can run the test instead.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="why-voltage-is-not-capacity" className="text-xl font-semibold mb-3">
          Why a voltage reading isn&apos;t a capacity reading
        </h2>
        <p className="text-muted leading-7 mb-4">
          Capacity is charge stored, counted in milliamp-hours (mAh) or amp-hours (Ah). It is a quantity that only
          shows up over time: a 3,000 mAh cell can deliver 3,000 mA for one hour, 600 mA for five hours, and so on.
          Voltage is a pressure. A full Li-ion cell sits near 4.2 V whether it is brand new or three years and
          500 cycles old, because the chemistry sets the voltage and the amount of usable material sets the
          capacity. Worn cells lose material, not voltage.
        </p>
        <p className="text-muted leading-7">
          That is why the meter has to watch a discharge. You hold the current steady, start a clock, and stop it
          when the voltage falls to the cutoff. The meter supplies the two numbers you multiply. If you only want
          to know how full a battery is right now, the resting-voltage table further down is quicker, and the{" "}
          <Link href="/multimeters/how-to-check-a-12v-leisure-battery-with-a-multimeter" className={link}>
            12 V leisure battery check
          </Link>{" "}
          covers that approach for RV and camper batteries.
        </p>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and likely causes</h2>
        <p className="text-muted leading-7 mb-4">
          Most people run a capacity test because a device dies sooner than it used to. Match your symptom first,
          because a couple of these aren&apos;t capacity problems at all.
        </p>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Full charge, but runtime is half what it was", "Capacity fade from age and cycles", "Timed discharge (steps 1 to 5)", "Replace the cell or pack if under about 70–80%"],
            ["Reads full, then drops fast under load", "High internal resistance", "Compare resting and loaded voltage", "Replace; high resistance also means heat"],
            ["Pack shuts off early, cells look fine", "One weak cell in a series string", "Cell voltages near the end of discharge", "Battery shop or dealer; see our BMS guide"],
            ["Pack reads 0 V at the output", "BMS has tripped or a fuse opened", "Battery protection circuit test", "Wake it with the correct charger"],
            ["Swollen, hot or smells sweet", "Internal damage", "Visual only, no test", "Stop. Recycle it"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="charge-and-rest">Charge the cell fully, then let it rest</StepHeading>
        <p className="text-muted leading-7">
          Charge with the correct charger until it finishes on its own. For Li-ion that means the constant-voltage
          stage at 4.20 V per cell has tapered to a small current; for LiFePO4 the charge ends near 3.65 V per cell,
          or 14.2–14.6 V for a 12 V pack. Then leave it for an hour. The voltage settles a little after charging,
          and starting from a rested, full state makes the result repeatable. Write down the resting voltage. A
          Li-ion cell that rests well below about 4.15 V straight after a full charge points to a charger problem,
          which our guide on{" "}
          <Link href="/multimeters/why-is-my-lithium-battery-not-charging-to-100" className={link}>
            why a lithium battery won&apos;t charge to 100%
          </Link>{" "}
          works through.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="choose-the-load">Pick a load and a discharge current</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Rated capacity is quoted at a specific discharge rate, usually 0.2C: one fifth of the capacity in amps.
          For a 3,000 mAh 18650 that is 0.6 A; for a 100 Ah LiFePO4 pack it is 20 A, which is more than most
          meters can carry for hours, so large packs are usually tested at a lower rate with a clamp meter or the
          pack&apos;s own shunt monitor. Pick a current, then choose a load that draws it.
        </p>
        <p className="text-muted leading-7 mb-4">
          A power resistor is the cheapest load. By Ohm&apos;s law, R = V ÷ I, so 3.7 V ÷ 0.5 A ≈ 7.4 Ω; an 8 Ω
          resistor is close enough. Check the power: at 4.2 V, P = V² ÷ R = 17.6 ÷ 8 ≈ 2.2 W, so use a 10 W
          resistor and expect it to get hot. An adjustable electronic load is better, because it holds the current
          constant as the voltage falls, which makes the arithmetic a single multiplication.
        </p>
        <Figure caption={<>Run time for a 3,000 mAh cell at three discharge rates (ideal arithmetic: hours = mAh ÷ mA). Real cells deliver somewhat less at the higher rates.</>}>
          <BarChart
            items={[
              { label: "0.2C (600 mA)", value: 5, display: "5.0 h", highlight: true },
              { label: "0.5C (1,500 mA)", value: 2, display: "2.0 h" },
              { label: "1C (3,000 mA)", value: 1, display: "1.0 h" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={3} id="wire-the-rig">Wire the test rig: meter in series, second meter across</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Move the red lead to the A or mA jack and set the dial to DC amps. The meter goes in series: battery
          positive to the meter, meter to the load, load back to battery negative. A second meter on DC volts
          across the cell terminals tells you when to stop. With one meter, you&apos;ll have to swap modes and
          jacks at every reading, which is slow and invites the classic mistake of probing across the battery with
          the lead still in the amps jack. That shorts the cell through the meter&apos;s fuse.
        </p>
        <Figure caption={<>The discharge test: an ammeter in series with the load sets the current, and a voltmeter directly across the cell watches for the cutoff.</>}>
          <DischargeRigDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Use a proper cell holder or spot-welded tabs and short, thick wires. Every connection adds resistance,
          and at 0.5 A a 0.2 Ω path drops 0.1 V, enough to reach cutoff early. Read the voltage at the cell, not at
          the far end of the leads. Many meters also limit the 10 A range to short bursts at high current, so read
          the manual before running several amps for hours.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="discharge-and-log">Discharge and log current and voltage</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Connect the load and start a timer. With a constant-current load you only need the start time, the
          current and the stop time. With a plain resistor the current falls as the cell voltage falls, so write
          down the current every 10 or 15 minutes. Stop at the cutoff: 3.0 V is a common, cell-friendly figure for
          Li-ion (some datasheets allow 2.5 V or 2.75 V), and 2.5 V per cell for LiFePO4. Disconnect the load as soon
          as you hit it.
        </p>
        <Figure caption={<>Illustrative readings at the start of a resistor discharge on an 18650: 4.10 V across the cell and 0.51 A through the 8 Ω load.</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="4.10" unit="V" mode="DC V  across cell" />
            <MeterReadout value="0.51" unit="A" mode="DC A  in series" />
          </div>
        </Figure>
      </section>

      <section>
        <StepHeading n={5} id="calculate-mah">Calculate mAh and Wh from the log</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Constant current is simple: mAh = mA × hours. Say a 3,000 mAh cell ran at 500 mA for 5 hours 24
          minutes. 24 minutes is 0.4 h, so 500 × 5.4 = 2,700 mAh, or 90% of rating.
        </p>
        <p className="text-muted leading-7 mb-4">
          With a resistor, add up each interval. The illustrative log below covers a 3,000 mAh cell on an 8 Ω
          load, logged hourly for clarity (log more often in practice). Multiply each interval&apos;s average
          current by its length, then total.
        </p>
        <DataTable
          head={["Interval", "Cell voltage", "Average current", "mAh in interval"]}
          rows={[
            ["0–1 h", "4.10 → 3.92 V", "about 500 mA", "500"],
            ["1–2 h", "3.92 → 3.82 V", "about 485 mA", "485"],
            ["2–3 h", "3.82 → 3.74 V", "about 470 mA", "470"],
            ["3–4 h", "3.74 → 3.66 V", "about 460 mA", "460"],
            ["4–5 h", "3.66 → 3.50 V", "about 445 mA", "445"],
            ["5–5.6 h", "3.50 → 3.00 V", "about 410 mA", "246"],
            ["Total", "", "", "2,606 mAh"],
          ]}
          mono={[1, 2, 3]}
        />
        <p className="text-muted leading-7 mt-4">
          That cell delivered about 2,600 mAh, or 87% of its 3,000 mAh rating. Energy is often more useful than
          charge when comparing chemistries: Wh ≈ Ah × average voltage, so 2.6 Ah × 3.7 V ≈ 9.6 Wh. For a 12 V
          LiFePO4 pack the same idea scales up. A 100 Ah pack discharged at 10 A that reaches its BMS cutoff after
          9 hours 30 minutes held 10 × 9.5 = 95 Ah, about 1,220 Wh at 12.8 V nominal.
        </p>
      </section>

      <section>
        <StepHeading n={6} id="judge-the-result">Judge the result</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Compare your figure with the rated capacity at the same discharge rate. Many manufacturers define end of
          life at about 80% of rated capacity, and that is a sensible line for replacement in anything you rely on.
          Also look at how the voltage behaved. A cell that drops 0.3 V or more the moment you connect a 0.5 A load
          has high internal resistance, roughly R = ΔV ÷ I = 0.3 ÷ 0.5 = 0.6 Ω, which is very high for an 18650
          (healthy cells are typically a few tens of milliohms). That cell will run hot and quit early in a
          high-drain device even if its capacity looks fine at a gentle rate.
        </p>
        <Figure caption={<>The full capacity test from charger to verdict.</>}>
          <FlowDiagram
            steps={[
              { label: "Charge", sub: "Full, then rest 1 h" },
              { label: "Load", sub: "0.2C if you can" },
              { label: "Log", sub: "Current and time" },
              { label: "Stop", sub: "At cutoff voltage" },
              { label: "Multiply", sub: "mA × h = mAh" },
            ]}
          />
        </Figure>
        <KeyIdea title="The meter counts, the clock measures">
          The multimeter only gives you current and voltage at one moment. Capacity comes from current multiplied by
          time, so the test is only as good as a steady load, a full starting charge and a clean cutoff point.
        </KeyIdea>
      </section>

      <section>
        <h2 id="voltage-soc-table" className="text-xl font-semibold mb-3">
          Lithium battery voltage vs state of charge
        </h2>
        <p className="text-muted leading-7 mb-4">
          For a quick check without a discharge, measure the resting voltage (no load, no charger, at least an hour
          after use) and compare it with this table. The figures are typical per-cell values; they shift with cell
          make, temperature and age, so treat them as approximate. Multiply by the number of cells in series for a
          pack: four for a 12 V LiFePO4, three for an 11.1 V Li-ion pack.
        </p>
        <DataTable
          head={["State of charge", "Li-ion (NMC/NCA) per cell", "LiFePO4 per cell", "12 V LiFePO4 (4S)"]}
          rows={[
            ["100%", "about 4.20 V", "about 3.40 V rested", "about 13.6 V"],
            ["80%", "about 3.98 V", "about 3.32 V", "about 13.3 V"],
            ["60%", "about 3.87 V", "about 3.28 V", "about 13.1 V"],
            ["40%", "about 3.79 V", "about 3.25 V", "about 13.0 V"],
            ["20%", "about 3.70 V", "about 3.20 V", "about 12.8 V"],
            ["0% (cutoff)", "about 3.0 V", "about 2.5 V", "about 10.0 V"],
          ]}
          mono={[1, 2, 3]}
        />
        <p className="text-muted leading-7 mt-4">
          Notice how little the LiFePO4 column moves. Between 80% and 20% it changes by only about 0.12 V per cell,
          which is close to the resolution of a basic meter and smaller than the drift caused by temperature. For
          LiFePO4, voltage is a poor fuel gauge in the middle of the range, and a timed discharge or a coulomb
          counter is the only reliable answer. If a multi-cell LiFePO4 pack loses capacity because one cell runs out
          first, the{" "}
          <Link href="/multimeters/how-to-test-a-48v-lifepo4-battery-for-voltage-imbalance-between-cells" className={link}>
            48 V LiFePO4 cell imbalance test
          </Link>{" "}
          explains how to find it.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter to use to test lithium battery capacity</h2>
        <p className="text-muted leading-7 mb-6">
          You need a DC current range that covers your test current, ideally a second meter for voltage, and enough
          resolution to see a cutoff to the nearest 10 mV. A 4,000- or 6,000-count meter does that. If you only own
          one meter, put it on current and use the device&apos;s own low-voltage shutoff or a separate cheap
          voltmeter as the stop signal. For the basics of series current readings, see{" "}
          <Link href="/multimeters/how-to-measure-milliamps-with-a-multimeter" className={link}>
            how to measure milliamps with a multimeter
          </Link>
          , and for a quicker go/no-go under load on a lead-acid or lithium 12 V battery,{" "}
          <Link href="/multimeters/how-to-test-a-12v-battery-under-load" className={link}>
            how to test a 12 V battery under load
          </Link>
          .
        </p>
        <ProductStrip
          title="Meters for discharge testing"
          items={[
            {
              name: "Fluke 15B+",
              image: fluke15.image,
              alt: "Fluke 15B+ digital multimeter",
              href: "/multimeters/fluke-15b-plus-review",
              note: "µA to 10A current ranges, CAT III 600V and a 4,000-count backlit display. A plain, tough choice for the series current meter.",
            },
            {
              name: "Fluke 17B+",
              image: fluke17.image,
              alt: "Fluke 17B+ digital multimeter",
              href: "/multimeters/fluke-17b-plus-review",
              note: "Adds MIN MAX, relative mode and Type K temperature, useful for watching cell temperature during the discharge.",
            },
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR True RMS digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "6,000-count resolution at a budget price. A sensible second meter to sit across the cell and watch for the cutoff voltage.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
