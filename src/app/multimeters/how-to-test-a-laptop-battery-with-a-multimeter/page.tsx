import Link from "@/components/AppLink";
import {
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  KeyIdea,
  MeterReadout,
  ProductStrip,
  StepHeading,
  BarChart,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "Test a laptop battery with a multimeter: find the pack's + and − pins, read the voltage against 3S and 4S values, and know why a good pack can read 0 V.";

export const metadata = buildMetadata({
  title: "How to Test a Laptop Battery With a Multimeter",
  description,
  path: "/multimeters/how-to-test-a-laptop-battery-with-a-multimeter",
});

const fluke107 = picks.find((p) => p.name === "Fluke 107")!;
const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;
const fluke115 = picks.find((p) => p.name === "Fluke 115")!;

const link = "text-accent hover:underline";

/** A typical removable laptop battery connector: power pins at both ends, signal pins in the middle. */
function LaptopBatteryPinoutDiagram() {
  const pins = [
    { x: 40, label: "+", sub: "power", power: true },
    { x: 80, label: "+", sub: "power", power: true },
    { x: 120, label: "ID", sub: "detect", power: false },
    { x: 160, label: "C", sub: "SMBus clock", power: false },
    { x: 200, label: "D", sub: "SMBus data", power: false },
    { x: 240, label: "T", sub: "thermistor", power: false },
    { x: 280, label: "−", sub: "ground", power: true },
    { x: 320, label: "−", sub: "ground", power: true },
  ];
  return (
    <svg
      viewBox="0 0 360 200"
      className="w-full h-auto"
      role="img"
      aria-label="Example laptop battery connector pinout with eight contacts: two positive power pins at one end, two negative ground pins at the other end, and four signal pins in between for battery detect, SMBus clock, SMBus data and the thermistor. The multimeter's red probe goes on a positive pin and the black probe on a negative pin; the signal pins are left alone."
    >
      <rect x="18" y="60" width="324" height="60" rx="8" className="fill-surface stroke-foreground" strokeWidth="2" />
      {pins.map((p, i) => (
        <g key={i}>
          <rect
            x={p.x - 12}
            y="72"
            width="24"
            height="36"
            rx="3"
            className={p.power ? "fill-muted stroke-accent" : "fill-surface stroke-foreground"}
            strokeWidth={p.power ? 2 : 1.2}
          />
          <text x={p.x} y="95" fontSize="12" fontWeight="700" textAnchor="middle" className="fill-foreground">
            {p.label}
          </text>
          <text
            x={p.x}
            y={i % 2 === 0 ? 138 : 152}
            fontSize="8"
            textAnchor="middle"
            className="fill-muted"
          >
            {p.sub}
          </text>
        </g>
      ))}
      <path d="M60 50 V60" className="stroke-accent" strokeWidth="2" />
      <text x="60" y="44" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-accent">red probe</text>
      <path d="M300 50 V60" className="stroke-foreground" strokeWidth="2" />
      <text x="300" y="44" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">black probe</text>
      <text x="180" y="180" fontSize="9" textAnchor="middle" className="fill-muted">
        Pin order varies by maker; confirm with the pack label or service manual
      </text>
    </svg>
  );
}

export default function HowToTestALaptopBatteryWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Laptop Battery With a Multimeter"
      description={description}
      published="2026-11-15"
      path="/multimeters/how-to-test-a-laptop-battery-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a laptop battery with a multimeter, take out the removable pack, set the meter to DC volts and
          read across the positive and negative power contacts, then compare with the pack&apos;s rating: a 3-cell
          (3S) 10.8–11.1 V pack reads about 9–12.6 V, and a 4-cell (4S) 14.4–14.8 V pack about 12–16.8 V,
          depending on charge. A reading of 0 V doesn&apos;t always mean the pack is dead, because many laptop
          batteries keep their output switched off until the laptop talks to them over the SMBus pins. This page
          shows how to find the right pins, what each voltage means, when the onboard battery report is the better
          test, and why you should almost never open the pack.
        </>
      }
      aside={{
        image: fluke107.image,
        alt: "Fluke 107 palm-sized multimeter for laptop battery voltage checks",
        caption: (
          <>
            A palm-sized meter such as the Fluke 107 is easy to steady on small battery contacts. See our{" "}
            <Link href="/multimeters/fluke-107-review" className={link}>
              Fluke 107 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-packs-work", label: "How a laptop battery pack works" },
        { id: "causes", label: "Symptoms and likely causes" },
        { id: "read-label", label: "1. Read the label" },
        { id: "find-pins", label: "2. Find the power pins" },
        { id: "measure", label: "3. Measure pack voltage" },
        { id: "zero-volts", label: "4. If it reads 0 V" },
        { id: "battery-report", label: "5. Check the battery report" },
        { id: "voltage-table", label: "Laptop battery voltage table" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "What voltage should a laptop battery read with a multimeter?",
          a: "It depends on how many lithium-ion cells are in series. A 3S pack labeled 10.8 or 11.1 V reads about 12.6 V full and around 9 V empty. A 4S pack labeled 14.4 or 14.8 V reads about 16.8 V full and around 12 V empty. A 2S pack labeled 7.2 or 7.4 V reads about 8.4 V full. Readings far below those suggest over-discharge or a fault.",
        },
        {
          q: "Why does my laptop battery read 0 volts?",
          a: "Many smart laptop batteries keep their output MOSFETs off until the laptop identifies the pack over SMBus, so a meter on the bare contacts sees 0 V even when the cells are fine. A pack can also read 0 V because its protection circuit tripped after deep discharge or a fault, or because a permanent-failure flag was set. Try charging it in the laptop first.",
        },
        {
          q: "Can a dead laptop battery be revived?",
          a: "Sometimes. If the pack only went to sleep, leaving it in the laptop on the charger for a few hours can wake it. If the cells were over-discharged and the controller has locked the pack, it is designed to stay locked for safety. Rebuilding packs with new cells requires resetting the controller and handling bare lithium cells, so a replacement pack is the safer choice.",
        },
        {
          q: "How do I check laptop battery health without opening it?",
          a: "Use the laptop's own report, because the pack's controller counts charge in and out. On Windows, run powercfg /batteryreport in a command prompt and compare full charge capacity with design capacity. On a Mac, hold Option and open System Information, then Power, to see cycle count and condition. Under about 80% of design capacity, expect noticeably shorter runtime.",
        },
        {
          q: "Is it safe to test the cells inside a laptop battery?",
          a: "It is risky. The plastic case is glued shut, prying it open can puncture or short a cell, and the cells are wired in series to more than 12 V with high available current. Swollen packs are especially dangerous. Unless you're experienced with lithium cells, test from the outside connector, use the battery report, and recycle or replace the pack instead.",
        },
      ]}
      next={[
        {
          href: "/multimeters/why-is-my-laptop-charger-not-charging-the-battery",
          title: "Why Is My Laptop Charger Not Charging the Battery?",
          desc: "Test the adapter's output before you blame the battery.",
        },
        {
          href: "/multimeters/how-to-test-a-battery-protection-circuit-with-a-multimeter",
          title: "How to Test a Battery Protection Circuit",
          desc: "How a BMS cuts off a pack, and how to tell a tripped board from dead cells.",
        },
      ]}
    >
      <Callout title="Laptop packs are lithium batteries: treat them that way">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Stop if the pack is swollen, cracked, hot or smells sweet. A swollen pack can push the trackpad or
            keyboard up; unplug the laptop, don&apos;t charge it, and take it to a repair shop or battery recycler.
          </li>
          <li>
            Don&apos;t pry open the pack or puncture its case. The cells inside are in series at 11–17 V and can
            deliver many amps into a short, and a punctured cell can catch fire.
          </li>
          <li>
            Touch the probes only to the power pins. Bridging adjacent pins with a probe tip can short the pack or
            damage its controller.
          </li>
          <li>
            For built-in batteries, disconnect the battery only by following the maker&apos;s service manual, or
            leave it to an authorized repair center. If a pack vents smoke, move away and call 911.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="how-packs-work" className="text-xl font-semibold mb-3">How a laptop battery pack works</h2>
        <p className="text-muted leading-7 mb-4">
          A laptop battery is a group of lithium-ion cells wired in series to raise the voltage and sometimes in
          parallel to add capacity, plus a small circuit board. The series count sets the voltage: each Li-ion
          cell is about 3.6–3.7 V nominal and 4.2 V full, so three in series (3S) give 10.8–11.1 V nominal and
          12.6 V full, and four in series (4S) give 14.4–14.8 V nominal and 16.8 V full. Older removable packs
          used 18650 cells; most newer thin laptops use flat lithium-polymer pouch cells, but the voltages are the
          same.
        </p>
        <p className="text-muted leading-7">
          The circuit board is a battery management system (BMS) with a fuel-gauge chip. It measures each cell
          group, counts charge in and out, reports to the laptop over a two-wire SMBus link (the Smart Battery
          standard most laptops follow), and controls a pair of MOSFETs that connect or disconnect the cells from
          the output pins. That last part is why a multimeter test on a laptop battery is less straightforward
          than on a car battery or an AA cell: you are often reading the BMS&apos;s output switch, not the cells
          directly.
        </p>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and likely causes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Plugged in, not charging", "Adapter, DC jack or charge circuit", "Test the adapter output first", "See the laptop charger guide"],
            ["Pack reads 0 V on the bench", "Output off until laptop wakes it, or protection trip", "Step 4", "Charge in the laptop; replace if locked"],
            ["Runtime has dropped by half", "Capacity fade", "Battery report: full charge vs design", "Replace the pack"],
            ["Shuts off at 20–30%", "Weak cell group sagging under load", "Battery report; voltage under load", "Replace the pack"],
            ["Case bulging, trackpad lifting", "Swollen cells", "Visual only, no test", "Stop using it; get it replaced"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="read-label">Read the label on the pack</StepHeading>
        <p className="text-muted leading-7">
          Power the laptop down, unplug it, and remove the battery. The label lists the nominal voltage (for
          example 11.1 V or 14.4 V), the capacity in mAh or Wh, and often the number of cells, such as
          &quot;6-cell&quot; (usually 3S2P, three in series and two in parallel) or &quot;4-cell&quot;. Write down the
          nominal voltage and divide it by 3.6 or 3.7 to find the series count: 11.1 ÷ 3.7 = 3, so the full-charge
          voltage is 3 × 4.2 = 12.6 V. The capacity figure is what the battery report will compare against later.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="find-pins">Find the positive and negative power pins</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Most removable packs have a row of 6 to 9 contacts. The power pins are usually grouped at the two ends,
          often two or three in parallel for current capacity, and the signal pins sit in between: SMBus clock and
          data, a thermistor, and a battery-present or ID line. Some packs print + and − beside the contacts; if not,
          the maker&apos;s service manual or the pack&apos;s part number usually leads to a pinout.
        </p>
        <Figure caption={<>An example removable laptop battery connector. Pin order differs between makers, so confirm before you probe.</>}>
          <LaptopBatteryPinoutDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          If there is no pinout, set the meter to DC volts and read between the two end pins. The pair that gives
          the largest steady voltage, close to the label figure, is the power pair. Signal pins usually read a few
          volts or nothing relative to ground. Fine probe tips help; avoid pushing them into the contact sleeves,
          which can spread them.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="measure">Measure the pack voltage</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Put the red probe on a positive pin and the black probe on a negative pin and hold them steady. Compare
          the reading with the table further down. A 3S pack reading 11.4 V is roughly half charged; 12.5 V is
          nearly full; 9.5 V is close to empty.
        </p>
        <Figure caption={<>Illustrative readings on a removable 11.1 V (3S) pack: partly charged (left), and the same pack after the laptop shut down on low battery (right).</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="11.42" unit="V" mode="DC V  about half" />
            <MeterReadout value="9.68" unit="V" mode="DC V  near empty" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          A reading well below the empty figure, say 6 V on a 3S pack, means the cells have been over-discharged,
          typically after months in a drawer. The controller will usually refuse to charge it, and that is a
          deliberate safety feature: deeply discharged lithium cells can develop internal shorts. Recycle that pack.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="zero-volts">If the pack reads 0 V, work out why</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Three different conditions produce 0 V at the power pins, and the multimeter alone can&apos;t always tell
          them apart. First, the pack may simply hold its output off until a host identifies it over SMBus. This
          is common on smart packs, and those cells are fine; the test is to put the pack back in the laptop and
          see whether it charges. Second, the protection circuit may have tripped on over-discharge or over-current
          and be waiting for a charge voltage to reset. Leave it in the laptop on the adapter for an hour or two.
          Third, the fuel-gauge chip may have set a permanent-failure flag after a cell fault and blown a
          chemical fuse. That pack is finished by design.
        </p>
        <p className="text-muted leading-7">
          If the pack stays at 0 V and the laptop reports &quot;no battery detected&quot; or &quot;plugged in, not
          charging&quot; with a known-good adapter, replace the pack. Before you buy, rule out the charger: the
          steps in{" "}
          <Link href="/multimeters/why-is-my-laptop-charger-not-charging-the-battery" className={link}>
            why a laptop charger isn&apos;t charging the battery
          </Link>{" "}
          take five minutes and catch a surprising number of &quot;dead battery&quot; cases. The general behavior
          of protection boards is covered in the{" "}
          <Link href="/multimeters/how-to-test-a-battery-protection-circuit-with-a-multimeter" className={link}>
            battery protection circuit test
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={5} id="battery-report">Check the laptop&apos;s battery report for capacity</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Voltage tells you charge level, not health. The pack&apos;s fuel gauge already tracks capacity, and the
          laptop will show it. On Windows, open a command prompt and run powercfg /batteryreport, then open the
          HTML file it saves and compare Full Charge Capacity with Design Capacity. On a Mac, hold Option, click
          the Apple menu, choose System Information, then Power, for cycle count and condition. Built-in batteries
          on most modern laptops can only be tested this way without opening the machine.
        </p>
        <p className="text-muted leading-7 mb-4">
          Work out the percentage. A pack designed for 56 Wh that now reports 41 Wh full is at 41 ÷ 56 ≈ 73%.
          Many makers and battery warranties use 80% of design capacity as the point where a battery is considered
          worn, so this one runs about a quarter less time than it did new.
        </p>
        <Figure caption={<>Full charge capacity as a percentage of design capacity for three illustrative battery reports.</>}>
          <BarChart
            items={[
              { label: "Pack A (1 year)", value: 94, display: "94%", highlight: true },
              { label: "Pack B (3 years)", value: 73, display: "73%" },
              { label: "Pack C (5 years)", value: 48, display: "48%" },
            ]}
          />
        </Figure>
        <Figure caption={<>Testing a laptop battery, from the outside in.</>}>
          <FlowDiagram
            steps={[
              { label: "Adapter", sub: "Rule out the charger" },
              { label: "Label", sub: "3S or 4S?" },
              { label: "Pins", sub: "Read + to −" },
              { label: "0 V?", sub: "Charge in laptop" },
              { label: "Report", sub: "Full vs design" },
            ]}
          />
        </Figure>
        <KeyIdea title="The meter checks charge; the report checks health">
          A multimeter on the pack contacts tells you whether the pack is awake and how full it is. Capacity, the
          thing that actually sets runtime, comes from the pack&apos;s own fuel gauge, which the laptop reports.
        </KeyIdea>
      </section>

      <section>
        <h2 id="voltage-table" className="text-xl font-semibold mb-3">Laptop battery voltage table</h2>
        <p className="text-muted leading-7 mb-4">
          Approximate resting voltages for Li-ion packs at room temperature, rested at least 30 minutes off the
          charger. Exact empty points depend on the maker&apos;s settings.
        </p>
        <DataTable
          head={["Pack label", "Series cells", "Full", "About 50%", "Laptop shuts down", "Over-discharged"]}
          rows={[
            ["7.2–7.4 V", "2S", "8.4 V", "about 7.6 V", "about 6.4 V", "under about 5.0 V"],
            ["10.8–11.1 V", "3S", "12.6 V", "about 11.4 V", "about 9.6 V", "under about 7.5 V"],
            ["14.4–14.8 V", "4S", "16.8 V", "about 15.2 V", "about 12.8 V", "under about 10 V"],
            ["11.4 V (high-voltage cells)", "3S", "13.05–13.2 V", "about 11.6 V", "about 9.6 V", "under about 7.5 V"],
          ]}
          mono={[2, 3, 4, 5]}
        />
        <p className="text-muted leading-7 mt-4">
          Some newer packs are labeled 11.4 V or 15.2 V. They use cells rated to 4.35–4.4 V per cell, so their
          full-charge voltage is higher than the 4.2 V-per-cell figure. If you are testing salvaged cells from an
          old pack, see the{" "}
          <Link href="/multimeters/how-to-check-18650-battery-health-with-a-multimeter" className={link}>
            18650 battery health check
          </Link>{" "}
          and the{" "}
          <Link href="/multimeters/how-to-test-lithium-battery-capacity-with-a-multimeter" className={link}>
            lithium capacity test
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter to use for laptop batteries</h2>
        <p className="text-muted leading-7 mb-6">
          Laptop packs sit under 20 V DC, so any multimeter&apos;s DC voltage range covers them. The practical
          needs are fine probe tips for small contacts, a display you can read at 0.01 V, and a meter that also
          handles the charger and wall-outlet checks that usually come next. Our guide to{" "}
          <Link href="/multimeters/how-to-test-a-dc-power-supply-with-a-multimeter" className={link}>
            testing a DC power supply
          </Link>{" "}
          covers the adapter side.
        </p>
        <ProductStrip
          title="Meters for laptop battery checks"
          items={[
            {
              name: "Fluke 107",
              image: fluke107.image,
              alt: "Fluke 107 palm-sized digital multimeter",
              href: "/multimeters/fluke-107-review",
              note: "Palm-sized at 200 g with a 6,000-count display and diode test, handy on a cluttered repair bench.",
            },
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR True RMS digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "6,000 counts and manual ranging for close readings on pack and adapter voltages at a low price.",
            },
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 True RMS digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "True RMS with a 6,000-count backlit display and CAT III 600V for the outlet and adapter checks too.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
