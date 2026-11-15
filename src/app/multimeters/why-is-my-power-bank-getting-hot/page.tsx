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
  "A power bank gets warm from conversion losses during fast charging and pass-through use. Learn the heat math, safe temperature limits and when to stop using it.";

export const metadata = buildMetadata({
  title: "Why Is My Power Bank Getting Hot?",
  description,
  path: "/multimeters/why-is-my-power-bank-getting-hot",
});

const fluke179 = picks.find((p) => p.name === "Fluke 179")!;
const extech = picks.find((p) => p.name === "Extech EX330")!;
const craftsman = picks.find((p) => p.name === "Craftsman CMMT14171")!;

const link = "text-accent hover:underline";

/** Where heat is made inside a power bank: converter, cells, port and cable. */
function HeatSourcesDiagram() {
  return (
    <svg
      viewBox="0 0 360 200"
      className="w-full h-auto"
      role="img"
      aria-label="Inside a power bank, heat comes from four places: the lithium cells, which warm from current flowing through their internal resistance; the boost or buck converter chip and inductor, which lose a percentage of every watt they convert; the USB port contacts; and the cable. Wavy arrows from each part show the heat leaving the case, with the converter usually the largest source during fast charging."
    >
      <rect x="10" y="40" width="250" height="130" rx="14" className="fill-surface stroke-foreground" strokeWidth="2" />
      <text x="135" y="30" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">Power bank case</text>
      {/* cells */}
      <rect x="26" y="62" width="90" height="88" rx="6" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <text x="71" y="100" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">Li-ion cells</text>
      <text x="71" y="116" fontSize="8.5" textAnchor="middle" className="fill-muted">heat = I² × R</text>
      {/* converter */}
      <rect x="134" y="62" width="76" height="52" rx="6" className="fill-surface stroke-accent" strokeWidth="2" />
      <text x="172" y="84" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-accent">Converter</text>
      <text x="172" y="100" fontSize="8.5" textAnchor="middle" className="fill-muted">loses 5–20%</text>
      {/* port */}
      <rect x="226" y="80" width="34" height="30" rx="3" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <text x="243" y="99" fontSize="8.5" textAnchor="middle" className="fill-foreground">USB</text>
      {/* cable */}
      <path d="M260 95 H350" className="stroke-foreground" strokeWidth="3" />
      <text x="305" y="88" fontSize="8.5" textAnchor="middle" className="fill-muted">cable I²R</text>
      {/* current path */}
      <path d="M116 88 H134 M210 95 H226" className="stroke-foreground" strokeWidth="1.8" />
      {/* heat arrows */}
      <g className="stroke-accent" strokeWidth="1.6" fill="none">
        <path d="M60 150 q-4 8 0 14 q4 6 0 14" />
        <path d="M82 150 q-4 8 0 14 q4 6 0 14" />
        <path d="M160 114 q-4 10 0 18 q4 8 0 16 q-4 8 0 16" />
        <path d="M184 114 q-4 10 0 18 q4 8 0 16 q-4 8 0 16" />
        <path d="M243 110 q-4 8 0 14 q4 6 0 14" />
        <path d="M305 100 q-4 8 0 14 q4 6 0 14" />
      </g>
      <text x="172" y="196" fontSize="8.5" textAnchor="middle" className="fill-muted">largest source while fast charging</text>
    </svg>
  );
}

export default function WhyIsMyPowerBankGettingHotPage() {
  return (
    <HowToShell
      title="Why Is My Power Bank Getting Hot?"
      description={description}
      published="2026-11-15"
      path="/multimeters/why-is-my-power-bank-getting-hot"
      category="multimeters"
      intro={
        <>
          A power bank gets warm because its voltage converter wastes a share of every watt it handles as heat, and
          that share grows with fast charging, laptop loads and pass-through use, when the bank charges and discharges
          at the same time. Warm is normal; too hot to hold, hot while doing nothing, swollen, or smelling of
          chemicals is not, and means you should stop using it. This guide shows the heat arithmetic, the
          temperature limits lithium cells are typically rated for, and how to measure your bank&apos;s surface
          temperature with a multimeter&apos;s thermocouple to tell the two apart.
        </>
      }
      aside={{
        image: fluke179.image,
        alt: "Fluke 179 multimeter with temperature function for measuring a power bank's surface temperature",
        caption: (
          <>
            The Fluke 179 reads temperature with its supplied thermocouple, so you can put a number on
            &quot;hot.&quot; See our{" "}
            <Link href="/multimeters/fluke-179-review" className={link}>
              Fluke 179 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "where-heat-comes-from", label: "Where the heat comes from" },
        { id: "causes", label: "Symptoms and likely causes" },
        { id: "heat-math", label: "How much heat is normal" },
        { id: "unplug-and-inspect", label: "1. Unplug and inspect" },
        { id: "measure-temperature", label: "2. Measure the temperature" },
        { id: "check-the-load", label: "3. Check the load and mode" },
        { id: "stop-pass-through", label: "4. Stop pass-through" },
        { id: "check-cables-ports", label: "5. Check cables and ports" },
        { id: "decide", label: "6. Keep it or retire it" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "Is it normal for a power bank to get hot while charging?",
          a: "Warm is normal, especially with fast charging, because the bank's charge circuit loses some energy as heat. A case that feels noticeably warm but comfortable to hold is expected. A case too hot to keep your hand on, a bank that stays hot after unplugging, or any swelling or smell is not normal, and you should stop charging it.",
        },
        {
          q: "Is it bad to use a power bank while it is charging?",
          a: "Many banks support pass-through charging, but it makes them work harder: the input circuit and the output converter both run at once and both make heat. Some banks handle it well and others get hot or switch modes repeatedly. If your manual doesn't list pass-through as supported, avoid it, and never do it under a pillow or in a bag.",
        },
        {
          q: "What temperature is too hot for a power bank?",
          a: "Lithium-ion cell datasheets commonly allow charging up to about 45 °C (113 °F) and discharging up to about 60 °C (140 °F). The case runs cooler than the hottest cell, so a case reading in the mid-40s °C or higher during charging is a reason to stop and let it cool. Follow your bank's manual where it gives limits.",
        },
        {
          q: "Can a hot power bank explode?",
          a: "A healthy bank used within its ratings is very unlikely to fail, but damaged lithium cells can go into thermal runaway, venting hot gas and catching fire. Warning signs are swelling, hissing, popping, smoke or a sweet chemical smell. If you see them, move away, don't throw water on it or pick it up, and call 911 if anything nearby catches fire.",
        },
        {
          q: "Why does my power bank get hot when charging my laptop?",
          a: "Laptop charging can draw 45 to 100 W from a USB-C PD bank, several times a phone's load. At roughly 88% efficiency, a 65 W output turns about 9 W into heat inside the case, about as much as a small LED bulb, concentrated in a pocket-sized box. Expect real warmth, give it airflow, and keep it off soft surfaces.",
        },
        {
          q: "Can I take a power bank on a plane if it gets hot?",
          a: "Airline rules, based on IATA guidance, generally require power banks in carry-on bags, and banks up to 100 Wh are usually allowed without airline approval. Rules don't make an exception for warmth, but a bank that overheats has a fault and shouldn't travel at all. Check your airline's current rules and the Wh rating on the label.",
        },
      ]}
      next={[
        {
          href: "/multimeters/why-is-my-power-bank-not-charging",
          title: "Why Is My Power Bank Not Charging?",
          desc: "Adapter, cable, temperature limits and BMS lockout on the input side.",
        },
        {
          href: "/multimeters/how-to-test-a-power-bank-with-a-multimeter",
          title: "How to Test a Power Bank With a Multimeter",
          desc: "Measure output voltage and real capacity with a timed load test.",
        },
      ]}
    >
      <Callout title="When heat means danger: act now">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            If the bank is swollen, hissing, smoking, popping or smells sweet or chemical, unplug it only if you can
            do so safely, move people and pets away, and don&apos;t pick it up with bare hands. If it catches fire or
            anything nearby does, leave and call 911.
          </li>
          <li>
            Never puncture, crush, open or try to flatten a swollen bank. Damaged lithium cells can ignite when
            pierced.
          </li>
          <li>
            Once it has cooled, put it in a metal container or on a non-flammable surface outdoors and take it to a
            battery recycler or household hazardous waste site. Don&apos;t put it in the trash.
          </li>
          <li>
            Don&apos;t charge a power bank under a pillow, in bed, in a closed bag or on a car dashboard in the sun.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="where-heat-comes-from" className="text-xl font-semibold mb-3">Where the heat comes from</h2>
        <p className="text-muted leading-7 mb-4">
          A power bank is lithium cells plus a two-way converter. When it charges, the converter steps the input
          down to the cell voltage. When it discharges, it boosts the cells&apos; 3.7 V or so up to 5 V, or to 9,
          15 or 20 V for USB Power Delivery. No converter is lossless, and the lost energy has only one place to
          go: heat inside a sealed plastic or aluminum case.
        </p>
        <p className="text-muted leading-7">
          The cells add their own heat. Current flowing through a cell&apos;s internal resistance makes heat equal
          to I² × R. As an illustration, 3 A through a pack resistance of 0.05 Ω makes 3² × 0.05 = 0.45 W. That
          figure rises sharply with current, and it rises as cells age, because worn cells have higher internal
          resistance. An old bank therefore runs hotter than it did when new, at the same load.
        </p>
        <Figure caption={<>The four heat sources in a power bank. The converter usually dominates during fast charging and high-power output; aging cells and loose ports add to it.</>}>
          <HeatSourcesDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and likely causes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Warm during fast charging or laptop use", "Normal converter loss", "Surface temperature (step 2)", "Give it airflow; nothing to fix"],
            ["Hot when charging and powering a phone at once", "Pass-through doubles the losses", "Unplug one side and compare (step 4)", "Charge the bank first, then use it"],
            ["Hot at the USB plug only", "Worn or dirty port, loose plug", "Feel the plug; check cable drop (step 5)", "Replace the cable; stop using a loose port"],
            ["Runs hotter than it did when new", "Aging cells with higher resistance", "Capacity test", "Plan to replace it"],
            ["Hot while idle, or swollen, or smells", "Internal cell damage", "Visual only", "Stop. Isolate and recycle it"],
          ]}
        />
      </section>

      <section>
        <h2 id="heat-math" className="text-xl font-semibold mb-3">How much heat is normal: the arithmetic</h2>
        <p className="text-muted leading-7 mb-4">
          If a converter is η efficient, the heat it makes while delivering P<sub>out</sub> is P<sub>loss</sub> =
          P<sub>out</sub> × (1 ÷ η − 1). Converters in power banks are typically somewhere around 85 to 92%
          efficient, depending on design and load. Using 88% as an example, a 20 W phone fast charge loses 20 ×
          (1 ÷ 0.88 − 1) = 20 × 0.136 ≈ 2.7 W. A 65 W laptop load loses about 8.9 W. That is why the same bank feels
          barely warm charging earbuds and properly hot charging a laptop.
        </p>
        <Figure caption={<>Heat made inside the bank by the converter alone at different output powers, assuming 88% efficiency (arithmetic, not measurements). Cell and port losses come on top.</>}>
          <BarChart
            items={[
              { label: "Earbuds, 5 W", value: 0.68, display: "≈ 0.7 W" },
              { label: "Phone, 10 W", value: 1.36, display: "≈ 1.4 W" },
              { label: "Phone fast charge, 20 W", value: 2.73, display: "≈ 2.7 W" },
              { label: "Tablet, 45 W", value: 6.14, display: "≈ 6.1 W" },
              { label: "Laptop, 65 W", value: 8.86, display: "≈ 8.9 W", highlight: true },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="unplug-and-inspect">Unplug it and inspect the case</StepHeading>
        <p className="text-muted leading-7">
          Disconnect the charger and any device, and set the bank on a hard, non-flammable surface. Look along the
          seams for bulging and press the case gently on a flat table: a bank that rocks or whose shell has
          separated has swollen cells. Sniff for a sweet or solvent smell. Any of those signs ends the diagnosis;
          follow the safety box above. If the case looks normal, let it rest for 15 minutes. A healthy bank cools
          steadily once nothing is connected; one that stays hot or gets hotter while idle has an internal fault.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="measure-temperature">Measure the surface temperature</StepHeading>
        <p className="text-muted leading-7 mb-4">
          &quot;Hot&quot; is subjective, so measure it. Many multimeters have a temperature function with a Type K
          bead thermocouple. Tape the bead flat to the middle of the case with a short strip of electrical tape,
          select °C or °F, and reconnect the load that made it hot. Read the temperature every few minutes for half
          an hour. The reading will lag the cells inside and read low, because plastic insulates, so treat any case
          figure as the minimum the cells are seeing.
        </p>
        <Figure caption={<>Illustrative readings from a thermocouple taped to a power bank case: room temperature before use (left) and after 30 minutes of 20 W output (right).</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="23" unit="°C" mode="TEMP  idle" />
            <MeterReadout value="37" unit="°C" mode="TEMP  20 W, 30 min" />
          </div>
        </Figure>
        <DataTable
          head={["Case temperature (rule of thumb)", "What it suggests", "Action"]}
          rows={[
            ["Up to about 40 °C (104 °F)", "Normal warmth under load", "Carry on"],
            ["About 40–45 °C (104–113 °F)", "Hard working, near cell charging limits", "Reduce load, add airflow"],
            ["Above about 45 °C (113 °F), or rising when idle", "Too hot; protection should be acting", "Stop, let it cool, investigate"],
          ]}
          mono={[0]}
        />
        <p className="text-muted leading-7 mt-4">
          These bands are a cautious rule of thumb built on common lithium-ion cell datasheet limits of about 0 to
          45 °C for charging and up to about 60 °C for discharging. They are not your bank maker&apos;s limits; use
          the manual&apos;s figures where it gives them.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="check-the-load">Check the load and the charging mode</StepHeading>
        <p className="text-muted leading-7">
          Work out what the bank is actually delivering. A phone on USB PD may draw 20 to 27 W, a tablet 30 to 45 W,
          and a laptop 60 W or more, while a plain USB-A port at 5 V and 2.4 A is 12 W. Charging two devices at
          once adds them. If the bank only gets hot on the laptop port, that is the arithmetic from the chart, not a
          fault. Switch to the bank&apos;s lower-power port, or let the device charge more slowly, and the heat drops
          in proportion.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="stop-pass-through">Stop pass-through charging</StepHeading>
        <p className="text-muted leading-7">
          Pass-through means the bank is being charged while it charges something else. The input stage and the
          output stage then both run, so both make heat, and some banks rapidly switch between the two, which adds
          more. Compare the surface temperature with the wall charger connected and disconnected while the same
          phone charges. If the difference is large and the manual doesn&apos;t list pass-through as supported,
          charge the bank first and use it afterwards.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="check-cables-ports">Check cables and ports for resistance</StepHeading>
        <p className="text-muted leading-7">
          Heat that concentrates at the plug rather than the whole case points to resistance in the connection: a
          worn socket, a cheap cable, or lint stopping the plug seating. Contact resistance makes heat as I² × R, so
          0.1 Ω at 3 A is 0.9 W in a space the size of a fingernail. Measure the voltage at both ends of the cable
          under load; a drop of more than a few tenths of a volt is too much. Our{" "}
          <Link href="/multimeters/how-to-test-a-usb-cable-with-a-multimeter" className={link}>
            USB cable test
          </Link>{" "}
          shows how. Replace the cable, and stop using a port that is loose or discolored.
        </p>
      </section>

      <section>
        <StepHeading n={6} id="decide">Keep it or retire it</StepHeading>
        <Figure caption={<>A quick decision path for a hot power bank.</>}>
          <FlowDiagram
            steps={[
              { label: "Inspect", sub: "Swollen or smells? Stop" },
              { label: "Measure", sub: "Case temperature" },
              { label: "Reduce", sub: "Load, pass-through" },
              { label: "Retest", sub: "Cooler now?" },
              { label: "Decide", sub: "Keep or recycle" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          If the bank stays within the normal band once you lower the load and stop pass-through, keep using it
          with good airflow. If it still runs hot at modest loads, or it has also lost much of its runtime, the cells
          are aging; a{" "}
          <Link href="/multimeters/how-to-test-a-power-bank-with-a-multimeter" className={link}>
            power bank capacity test
          </Link>{" "}
          will show how much. Retire it before it becomes a hazard.
        </p>
        <KeyIdea title="Heat scales with watts">
          Converter heat is a fixed fraction of the power going through it. Double the output and you roughly double
          the heat, so a bank that is fine on a phone can be uncomfortably hot on a laptop without anything being
          wrong.
        </KeyIdea>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter to use for checking power bank heat</h2>
        <p className="text-muted leading-7 mb-6">
          A meter with a temperature function and a Type K thermocouple turns guesswork into a number you can track
          over time. The same meter checks cable voltage drop. If heat shows up along with charging trouble, our
          guide on{" "}
          <Link href="/multimeters/why-is-my-lithium-battery-not-charging-to-100" className={link}>
            why a lithium battery won&apos;t charge to 100%
          </Link>{" "}
          covers temperature limits from the cell side.
        </p>
        <ProductStrip
          title="Meters with a temperature function"
          items={[
            {
              name: "Fluke 179",
              image: fluke179.image,
              alt: "Fluke 179 True RMS digital multimeter",
              href: "/multimeters/fluke-179-review",
              note: "True RMS, temperature with the supplied thermocouple and Min/Max-Average recording, handy for catching the peak case temperature.",
            },
            {
              name: "Extech EX330",
              image: extech.image,
              alt: "Extech EX330 mini multimeter",
              href: "/multimeters/extech-ex330-review",
              note: "A pocket-sized meter with Type K temperature and non-contact voltage. Not True RMS, which doesn't matter for DC and temperature checks.",
            },
            {
              name: "Craftsman CMMT14171",
              image: craftsman.image,
              alt: "Craftsman CMMT14171 automotive digital multimeter",
              href: "/multimeters/craftsman-cmmt14171-review",
              note: "True RMS with a temperature function, plus automotive extras for anyone who also works on cars and 12 V systems.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
