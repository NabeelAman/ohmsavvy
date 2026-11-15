import Link from "@/components/AppLink";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  MeterReadout,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "Power bank not charging? Check the adapter, cable and input port, then cold, deep discharge and BMS lockout. Meter checks and charge-time math for each cause.";

export const metadata = buildMetadata({
  title: "Why Is My Power Bank Not Charging?",
  description,
  path: "/multimeters/why-is-my-power-bank-not-charging",
});

const fluke15 = picks.find((p) => p.name === "Fluke 15B+")!;
const kaiweets = picks.find((p) => p.name === "KAIWEETS KM200s")!;
const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;

const link = "text-accent hover:underline";

/** Charge path of a power bank, with the four points a meter can check. */
function ChargePathDiagram() {
  const boxes = [
    { x: 8, label: "Wall", sub: "adapter" },
    { x: 96, label: "Cable", sub: "VBUS, GND, CC" },
    { x: 184, label: "Input port", sub: "+ charge IC" },
    { x: 272, label: "BMS", sub: "+ cells" },
  ];
  return (
    <svg
      viewBox="0 0 360 170"
      className="w-full h-auto"
      role="img"
      aria-label="Power bank charge path: wall adapter, then cable, then the bank's input port and charge controller chip, then the battery management system and lithium cells. Check point 1 is the adapter's output voltage, check point 2 is the voltage at the cable's far end, check point 3 is the input current the bank accepts, and check point 4 is whether the bank's indicator or output shows the cells responding."
    >
      {boxes.map((b, i) => (
        <g key={b.label}>
          <rect x={b.x} y="50" width="80" height="54" rx="6" className="fill-surface stroke-foreground" strokeWidth="1.8" />
          <text x={b.x + 40} y="74" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">{b.label}</text>
          <text x={b.x + 40} y="90" fontSize="8.5" textAnchor="middle" className="fill-muted">{b.sub}</text>
          {i < 3 && <path d={`M${b.x + 80} 77 H${b.x + 88}`} className="stroke-foreground" strokeWidth="2" />}
          <circle cx={b.x + 40} cy="128" r="11" className="fill-surface stroke-accent" strokeWidth="1.8" />
          <text x={b.x + 40} y="132" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-accent">{i + 1}</text>
          <line x1={b.x + 40} y1="104" x2={b.x + 40} y2="117" className="stroke-accent" strokeWidth="1.4" strokeDasharray="3 2" />
        </g>
      ))}
      <text x="180" y="30" fontSize="10" textAnchor="middle" className="fill-foreground">Energy flows left to right; a break anywhere stops charging</text>
      <text x="48" y="158" fontSize="8" textAnchor="middle" className="fill-muted">volts out</text>
      <text x="136" y="158" fontSize="8" textAnchor="middle" className="fill-muted">volts at end</text>
      <text x="224" y="158" fontSize="8" textAnchor="middle" className="fill-muted">amps in</text>
      <text x="312" y="158" fontSize="8" textAnchor="middle" className="fill-muted">LEDs, output</text>
    </svg>
  );
}

export default function WhyIsMyPowerBankNotChargingPage() {
  return (
    <HowToShell
      title="Why Is My Power Bank Not Charging?"
      description={description}
      published="2026-11-15"
      path="/multimeters/why-is-my-power-bank-not-charging"
      category="multimeters"
      intro={
        <>
          A power bank that won&apos;t charge is most often being fed by a weak adapter, a damaged or charge-only
          cable, or the wrong port, and less often it is too cold, too deeply discharged, or locked out by its
          battery management system (BMS). Work from the wall outward: confirm the adapter makes 5 V, confirm the
          cable delivers it, then measure how much current the bank actually accepts. This guide gives a meter check
          for each cause and the charge-time arithmetic that tells you whether &quot;not charging&quot; is really
          &quot;charging very slowly.&quot;
        </>
      }
      aside={{
        image: kaiweets.image,
        alt: "KAIWEETS KM200s digital multimeter for checking a power bank charger and cable",
        caption: (
          <>
            A budget True RMS meter such as the KAIWEETS KM200s covers the voltage checks on this page. See our{" "}
            <Link href="/multimeters/kaiweets-km200s-review" className={link}>
              KAIWEETS KM200s review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "causes", label: "Symptoms and likely causes" },
        { id: "slow-or-stopped", label: "Slow, or truly stopped?" },
        { id: "check-adapter", label: "1. Check the adapter" },
        { id: "check-cable", label: "2. Check the cable" },
        { id: "check-port", label: "3. Use the right input port" },
        { id: "measure-input-current", label: "4. Measure input current" },
        { id: "temperature", label: "5. Rule out cold and heat" },
        { id: "wake-the-bms", label: "6. Wake a locked BMS" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "Why is my power bank not charging but the lights are on?",
          a: "Blinking lights usually mean the bank sees input power but is charging very slowly or has paused. A low-wattage adapter, a thin cable that drops voltage, or a warm or cold bank are common reasons. Measure the voltage at the cable's far end under load and check the bank's temperature before assuming the cells have failed.",
        },
        {
          q: "Can I charge a power bank with a phone charger?",
          a: "Yes, as long as it plugs into the bank's input port. It will just be slow. A 5 V, 1 A phone charger supplies 5 W, so a 20,000 mAh bank holding 74 Wh needs roughly 17 hours or more to fill. Use an adapter that matches the input rating printed on the bank, often 18 W or higher for larger banks.",
        },
        {
          q: "How do I know if my power bank is dead?",
          a: "If a known-good adapter and cable deliver about 5 V to the input, the bank draws almost no current, its lights never respond, and its output reads 0 V even after an hour on charge at room temperature, it is likely dead. If it is swollen or hot, stop immediately and recycle it rather than trying further fixes.",
        },
        {
          q: "Why won't my power bank charge with a USB-C cable?",
          a: "USB-C sources only switch on power after detecting a device through the CC pins. A cable with a broken CC wire, an adapter that expects USB Power Delivery handshakes the bank doesn't support, or a USB-C port on the bank that is output-only can all leave it uncharged. Try another USB-C cable and check which ports the manual lists as inputs.",
        },
        {
          q: "Can a power bank be too cold to charge?",
          a: "Yes. Lithium-ion cells are commonly specified for charging only between about 0 °C and 45 °C (32 °F to 113 °F), and many power banks refuse to charge outside their own range. A bank brought in from a cold car can sit idle until it warms. Let it reach room temperature for an hour before charging it again.",
        },
        {
          q: "Will a power bank charge if it has been unused for months?",
          a: "Often yes, but slowly at first. Lithium cells self-discharge over months, and if the voltage falls low enough the protection circuit disconnects the cells. Many bank chargers then apply a small pre-charge current before charging normally. If nothing happens after an hour with a good adapter, the cells may be too deeply discharged to recover safely.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-power-bank-with-a-multimeter",
          title: "How to Test a Power Bank With a Multimeter",
          desc: "Once it charges, measure what it delivers with a timed load test.",
        },
        {
          href: "/multimeters/usb-c-charger-not-delivering-full-power",
          title: "USB-C Charger Not Delivering Full Power",
          desc: "PD profiles, e-marked cables and why a 65 W charger gives 15 W.",
        },
      ]}
    >
      <Callout title="Stop before you test if the bank is damaged">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            A swollen, cracked, rattling or unusually hot power bank should not be charged again. Unplug it, move it
            onto a non-flammable surface away from anything that can burn, and take it to a battery recycler.
          </li>
          <li>
            Don&apos;t open the case or try to charge the cells directly with a bench supply. Lithium cells that have
            been deeply discharged can be unsafe to recharge, and the BMS lockout is there for that reason.
          </li>
          <li>
            If a bank ever hisses, smokes or flames, don&apos;t touch it. Leave the area, and call 911 if the fire
            spreads.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and likely causes</h2>
        <p className="text-muted leading-7 mb-4">
          Most charging failures happen before the energy reaches the cells, so they are cheap to fix. Match the
          symptom, then jump to the step that checks it.
        </p>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["No lights at all on any adapter", "Dead cable, wrong port, or BMS lockout", "Steps 2, 3 and 6", "Swap cable and port; leave on charge 1 h"],
            ["Lights blink but the level never rises", "Adapter too weak for the bank's size", "Step 1 and the charge-time chart", "Use an adapter matching the input rating"],
            ["Charges on one cable, not another", "Charge-only, thin or broken cable", "Step 2: voltage at the far end", "Replace the cable"],
            ["USB-C won't charge, micro-USB will", "CC wiring or PD handshake problem", "Try another USB-C cable and adapter", "Use a USB-IF certified cable"],
            ["Stops in the car or outdoors", "Temperature protection", "Step 5", "Warm or cool to room temperature"],
            ["Swollen or hot while idle", "Damaged cells", "Visual only", "Stop. Recycle it"],
          ]}
        />
      </section>

      <section>
        <h2 id="slow-or-stopped" className="text-xl font-semibold mb-3">Is it slow, or truly not charging?</h2>
        <p className="text-muted leading-7 mb-4">
          A large bank on a small adapter can take so long that it looks dead. Work it out in watt-hours. A
          20,000 mAh bank with 3.7 V cells holds 20,000 × 3.7 ÷ 1,000 = 74 Wh. Charging isn&apos;t perfectly
          efficient either; allowing roughly 85%, the bank needs about 74 ÷ 0.85 ≈ 87 Wh from the wall. Divide by the
          adapter&apos;s watts to get hours.
        </p>
        <Figure caption={<>Approximate time to fill a 20,000 mAh (74 Wh) power bank from empty at different adapter powers, assuming 85% charging efficiency. Arithmetic only; the bank&apos;s own input limit caps the speed, and the last 10–20% slows down.</>}>
          <BarChart
            items={[
              { label: "5 W (5 V 1 A)", value: 17.4, display: "≈ 17.4 h" },
              { label: "10 W (5 V 2 A)", value: 8.7, display: "≈ 8.7 h" },
              { label: "18 W (9 V 2 A)", value: 4.8, display: "≈ 4.8 h", highlight: true },
              { label: "30 W (PD)", value: 2.9, display: "≈ 2.9 h" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          So a bank on an old 5 W cube that rises one LED overnight is not broken; it is starved. The fix is an
          adapter that matches the input printed on the bank&apos;s label. Going above that rating does no harm, but
          it won&apos;t charge faster than the bank allows.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="check-adapter">Check the adapter&apos;s output</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Plug a USB breakout board or USB power meter into the adapter and set your multimeter to DC volts across
          VBUS and GND. A standard USB-A port should read about 5 V; USB 2.0 ports are specified to supply at least
          500 mA, and dedicated chargers following the USB Battery Charging 1.2 specification up to 1.5 A. A USB-C
          adapter often reads 0 V on a bare breakout, because it waits to detect a device through its CC pin. Use a
          USB-C sink breakout with the 5.1 kΩ pull-down resistor, which tells the adapter to turn on 5 V.
        </p>
        <Figure caption={<>Illustrative readings: an adapter&apos;s output at its own port (left) and the same supply at the far end of a thin cable while the bank draws current (right).</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="5.08" unit="V" mode="DC V  at adapter" />
            <MeterReadout value="4.41" unit="V" mode="DC V  cable end, loaded" />
          </div>
        </Figure>
      </section>

      <section>
        <StepHeading n={2} id="check-cable">Check the cable under load</StepHeading>
        <p className="text-muted leading-7">
          The right-hand reading above is the classic hidden fault. A thin or damaged cable can deliver 5 V with
          nothing connected and sag well below 4.75 V once the bank draws current, and many charge controllers reduce
          their input current or stop when the voltage collapses. Measure at the bank end while it charges, using an
          inline USB meter or a breakout at that end. Some cables are also charge-only or have broken conductors you
          can&apos;t see; our guide on{" "}
          <Link href="/multimeters/how-to-test-a-usb-cable-with-a-multimeter" className={link}>
            how to test a USB cable with a multimeter
          </Link>{" "}
          checks each wire.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="check-port">Use the right input port</StepHeading>
        <p className="text-muted leading-7">
          Many banks have several ports, and not all of them are inputs. USB-A ports are almost always output-only.
          On banks with both micro-USB and USB-C, either may be the input, and some USB-C ports are bidirectional
          while others only charge devices. Read the markings next to each port (often IN, OUT, or a small arrow)
          or the label on the back. Inspect the port with a flashlight too: lint packed into a USB-C socket stops
          the plug seating fully, and a plug that wobbles can make and break contact as you move it.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="measure-input-current">Measure the current the bank accepts</StepHeading>
        <p className="text-muted leading-7 mb-4">
          This is the decisive test. With a breakout between the cable and the bank, put your meter on DC amps in
          series in the VBUS line. A healthy bank on a 10 W adapter usually draws over 1 A in the middle of its
          charge. A very small current, tens of milliamps, means the bank is either pre-charging deeply discharged
          cells, being held back by temperature, or not charging at all. Zero current with good voltage at the port
          points to the bank&apos;s input circuit or a protection lockout. For lead placement and fuse ranges, see{" "}
          <Link href="/multimeters/how-to-measure-milliamps-with-a-multimeter" className={link}>
            how to measure milliamps with a multimeter
          </Link>
          .
        </p>
        <Figure caption={<>Where each meter reading sits along the power bank&apos;s charge path. A break or bottleneck at any point stops or slows charging.</>}>
          <ChargePathDiagram />
        </Figure>
      </section>

      <section>
        <StepHeading n={5} id="temperature">Rule out cold and heat</StepHeading>
        <p className="text-muted leading-7">
          Lithium-ion cell datasheets commonly allow charging only between about 0 °C and 45 °C, and power bank
          controllers enforce a window like that with a temperature sensor next to the cells. A bank left in a car
          overnight in winter, or on a sunny dashboard in summer, may show lights but take no charge until it returns
          to room temperature. Bring it inside, wait an hour, and try again. A bank that gets hot while charging
          from a correct adapter is a different problem; see{" "}
          <Link href="/multimeters/why-is-my-power-bank-getting-hot" className={link}>
            why a power bank gets hot
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={6} id="wake-the-bms">Give a locked BMS time to wake</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A bank stored empty for months can fall below its protection threshold, and the BMS disconnects the cells
          to prevent further discharge. Many banks will recover on their own adapter after a slow pre-charge period.
          Leave it connected to a known-good adapter and cable for an hour while you check that it stays cool. If the
          lights come on and the input current rises, it has recovered; run a full cycle and then a{" "}
          <Link href="/multimeters/how-to-test-a-power-bank-with-a-multimeter" className={link}>
            capacity test
          </Link>{" "}
          to see how much it lost. If nothing changes, retire it. The{" "}
          <Link href="/multimeters/how-to-test-a-battery-protection-circuit-with-a-multimeter" className={link}>
            battery protection circuit guide
          </Link>{" "}
          explains how BMS lockout works on packs you can safely access.
        </p>
        <KeyIdea title="Volts at the far end, amps into the bank">
          Two readings answer most power bank charging problems: the voltage at the bank&apos;s end of the cable
          while it charges, and the current flowing into the input. Good volts with no amps means the bank; bad volts
          means the adapter or cable.
        </KeyIdea>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter to use for power bank charging problems</h2>
        <p className="text-muted leading-7 mb-6">
          Any meter with DC volts and a fused DC current range will do. A dedicated USB power meter is handy for
          quick checks, but a multimeter with a breakout lets you check the adapter, the cable and the input
          current separately. The same approach also works for a{" "}
          <Link href="/multimeters/why-is-my-laptop-charger-not-charging-the-battery" className={link}>
            laptop that won&apos;t charge
          </Link>
          .
        </p>
        <ProductStrip
          title="Meters for charging checks"
          items={[
            {
              name: "KAIWEETS KM200s",
              image: kaiweets.image,
              alt: "KAIWEETS KM200s digital multimeter",
              href: "/multimeters/kaiweets-km200s-review",
              note: "Auto-ranging True RMS with a backlit display. An affordable first meter for adapter and cable voltage checks.",
            },
            {
              name: "Fluke 15B+",
              image: fluke15.image,
              alt: "Fluke 15B+ digital multimeter",
              href: "/multimeters/fluke-15b-plus-review",
              note: "µA to 10A current ranges, so it can read both a trickle pre-charge and a 2 A input current in series.",
            },
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR True RMS digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "6,000-count resolution shows small voltage sags along a cable that a coarser meter rounds away.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
