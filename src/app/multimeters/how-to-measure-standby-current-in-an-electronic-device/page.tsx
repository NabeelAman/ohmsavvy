import Link from "next/link";
import {
  BarChart,
  Callout,
  CircuitDiagram,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  MeterReadout,
  ProductStrip,
  ScopeScreen,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to measure standby current in an electronic device: wire the meter in series, pick the µA range, allow for burden voltage and estimate battery life.";

export const metadata = buildMetadata({
  title: "How to Measure Standby Current in a Device",
  description,
  path: "/multimeters/how-to-measure-standby-current-in-an-electronic-device",
});

const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;
const unit = picks.find((p) => p.name === "UNI-T UT139C")!;
const fluke115 = picks.find((p) => p.name === "Fluke 115")!;

const link = "text-accent hover:underline";

export default function HowToMeasureStandbyCurrentInAnElectronicDevicePage() {
  return (
    <HowToShell
      title="How to Measure Standby Current in an Electronic Device"
      description={description}
      published="2026-10-22"
      path="/multimeters/how-to-measure-standby-current-in-an-electronic-device"
      category="multimeters"
      intro={
        <>
          To measure standby current in an electronic device, you break its battery or supply lead, connect
          a multimeter in series on a microamp or milliamp range, and let the device settle into its sleep
          state before you read. The number tells you how long a battery will last, but only if you also
          account for the brief wake-ups a meter cannot average properly. This guide covers the hookup,
          range choice, burden voltage, a battery-life calculation and when to reach for a shunt and an
          oscilloscope instead.
        </>
      }
      aside={{
        image: astro.image,
        alt: "AstroAI DM6000AR digital multimeter with test leads, front view",
        caption: (
          <>
            The AstroAI DM6000AR (True RMS, 6,000-count, CAT III 600V) is the electronics-hobby pick in our
            roundup. Current ranges differ between meters, so check your manual for a µA range. See our{" "}
            <Link href="/multimeters/astroai-dm6000ar-review" className={link}>
              DM6000AR review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "break-the-supply", label: "Break the supply and connect in series" },
        { id: "choose-the-range", label: "Choose the µA or mA range" },
        { id: "burden-voltage", label: "Burden voltage and resets" },
        { id: "let-it-sleep", label: "Let the device fall asleep" },
        { id: "wake-up-spikes", label: "Wake-up spikes and averaging" },
        { id: "battery-life", label: "Estimate battery life" },
        { id: "shunt-and-scope", label: "Shunt resistor and scope for pulsed loads" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "What is a normal standby current for a battery-powered device?",
          a: "There is no single normal figure; it depends on the design and the battery. Many microcontroller boards built for battery life sleep in the low microamps to tens of microamps, while boards with power LEDs, regulators or USB chips can draw milliamps. The component datasheets give the sleep currents each part should reach, which is the best yardstick for your own device.",
        },
        {
          q: "Why does my device reset when I connect the multimeter?",
          a: "Usually burden voltage. On a microamp range the meter drops more voltage per unit of current, so when the device wakes and draws milliamps the drop can pull its supply below the brown-out level. Start the device with the meter shorted out by a jumper, remove the jumper once it sleeps, or use the mA range and accept less resolution.",
        },
        {
          q: "Can a clamp meter measure standby current?",
          a: "Not usually. A clamp meter is built for amps, not microamps, and many clamp meters only measure AC current. Standby current in battery electronics is DC and often in the microamp range, far below what a clamp can resolve. A multimeter connected in series, or a shunt resistor with a scope or meter across it, is the right method.",
        },
        {
          q: "How do I measure the standby power of a mains appliance?",
          a: "Do not open the appliance or break its mains wiring to insert a multimeter. Use a plug-in power meter that sits between the wall socket and the appliance and reports watts, which is safe and gives standby power directly. The series-meter method on this page is for battery and low-voltage DC devices.",
        },
        {
          q: "Why does the current reading keep jumping around?",
          a: "The device is probably waking up periodically, for a sensor reading, a radio check or a timer, and the meter catches some of those bursts and misses others. The lowest steady figure between jumps is the sleep current. To find the true average including the bursts, measure the pulses with a shunt and a scope and calculate it.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-measure-milliamps-with-a-multimeter",
          title: "How to Measure Milliamps With a Multimeter",
          desc: "The jacks, the fuses and the series connection, step by step, with a worked example.",
        },
        {
          href: "/multimeters/how-to-measure-parasitic-battery-drain",
          title: "How to Measure Parasitic Battery Drain",
          desc: "The same standby measurement on a car, where modules take time to sleep and currents run higher.",
        },
      ]}
    >
      <Callout title="Before you start">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Never touch the probes across a battery with the meter in a current range. The meter is close to a
            short circuit, and lithium cells in particular can deliver a very large current, blowing the
            meter&apos;s fuse, damaging the cell or causing heat and fire.
          </li>
          <li>
            This method is for battery-powered and low-voltage DC devices. Do not open mains-powered equipment
            to insert a meter; see the FAQ below for measuring standby power on a mains appliance.
          </li>
          <li>
            Work with clips rather than hand-held probes, and keep the exposed ends of battery leads apart.
          </li>
        </ul>
      </Callout>

      <section>
        <StepHeading n={1} id="break-the-supply">Break the supply and connect the meter in series</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Current has to flow through the meter to be measured, so the meter replaces a piece of the
          device&apos;s supply wire. Power the device down, then open its positive supply lead: unplug the
          battery connector and bridge it with clip leads, slip a thin insulating tab between a battery and
          one contact, or remove a jumper on the board&apos;s power input. Red lead in the meter&apos;s µA or
          mA jack goes to the battery side of the break; black lead in COM goes to the device side. The full
          procedure, with the fuse precautions, is in our guide to{" "}
          <Link href="/multimeters/how-to-measure-milliamps-with-a-multimeter" className={link}>
            measuring milliamps with a multimeter
          </Link>
          .
        </p>
        <Figure
          caption={
            <>
              The meter sits in the battery&apos;s positive lead, so every microamp the device draws passes
              through it. Nothing else may connect the device to the battery, or that path carries current the
              meter never sees.
            </>
          }
        >
          <CircuitDiagram
            mode="series"
            meter="µA"
            source="3.7 V battery"
            load="Device"
            note="Meter in the positive lead; all supply current flows through it"
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Disconnect everything else first: a USB cable, a programmer or debugger, or a serial adapter can all
          power the device through a back door, and the meter then reads only part of the current.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="choose-the-range">Choose the µA or mA range</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A sleeping device may draw a few microamps, but at power-up it can draw tens or hundreds of
          milliamps. The range that resolves the first will overload on the second. If you have no idea of
          the current, start on the mA range, or even the 10 A jack, and only move down once you know the
          steady value is well inside the smaller range&apos;s maximum. Always move leads with the device
          powered off.
        </p>
        <DataTable
          head={["Range", "Good for", "Watch out for"]}
          rows={[
            ["µA (where fitted)", "Deep-sleep current of microcontrollers and sensors", "Overloads when the device wakes; highest burden voltage"],
            ["mA", "Idle current with LEDs or radios on, start-up current", "Too coarse to show a few microamps clearly"],
            ["10 A (or A)", "Unknown or large currents, first check only", "Reads tiny currents as zero"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Not every meter has a µA range; many have only mA and A, which limits how small a current you can
          read. Your manual lists the ranges and resolution.
        </p>
      </section>

      <section>
        <h2 id="burden-voltage" className="text-xl font-semibold mb-3">Burden voltage: why the device may reset</h2>
        <p className="text-muted leading-7 mb-4">
          Inside the meter, the current flows through a shunt resistor, and the meter reads the voltage across
          it. That voltage, the burden voltage, is subtracted from what reaches the device. Lower current
          ranges use larger shunts to get resolution, so they have more burden per unit of current; manuals
          often list it per range.
        </p>
        <p className="text-muted leading-7 mb-4">
          An illustrative example: suppose a µA range used a 100 Ω shunt. At a 10 µA sleep current it drops
          100 Ω × 10 µA = 1 mV, which is harmless. But when the device wakes and tries to draw 15 mA, the same
          shunt would need to drop 100 Ω × 15 mA = 1.5 V. A 3.3 V microcontroller cannot run with 1.5 V
          missing, so it browns out and resets, and you may never see it reach sleep at all.
        </p>
        <KeyIdea title="The bypass trick">
          Clip a jumper wire across the meter&apos;s terminals before powering up. The device boots through
          the jumper with no burden. Once it has settled into sleep, remove the jumper so the current flows
          through the meter, and read. Refit the jumper before anything that wakes the device for long.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={3} id="let-it-sleep">Let the device fall asleep, then read</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Standby is a state, not a moment. Many devices stay awake for seconds or longer after power-up or
          a button press, connecting to a network, blinking an LED or waiting for input, before they drop to
          their lowest-power mode. Watch the reading fall and wait until it stops falling. Then remove the
          bypass jumper if you used one, and note the steady value.
        </p>
        <Figure
          caption={
            <>
              A device asleep between wake-ups, on the µA range: 10.2 µA, which is about 10 µA. This is the
              sleep floor used in the calculations below.
            </>
          }
        >
          <div className="max-w-xs mx-auto">
            <MeterReadout value="10.2" unit="µA DC" mode="DC µA, asleep" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          If the floor is higher than the datasheets suggest, the usual suspects are a power LED, a linear
          regulator&apos;s own quiescent current, pull-up resistors held low, a sensor left powered, or the
          back-power paths mentioned in step 1. Pull parts out of the circuit one at a time, the same
          elimination approach used for{" "}
          <Link href="/multimeters/how-to-measure-parasitic-battery-drain" className={link}>
            parasitic battery drain in cars
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="wake-up-spikes" className="text-xl font-semibold mb-3">Wake-up spikes and why a meter can&apos;t average them</h2>
        <p className="text-muted leading-7 mb-4">
          Most battery devices do not sleep continuously. They wake briefly to take a reading or check a
          radio, then sleep again. Those bursts are short, but they are often thousands of times the sleep
          current, so they can dominate the battery drain. Take a device that sleeps at 10 µA and wakes for
          20 ms every 10 seconds, drawing 15 mA while awake:
        </p>
        <DataTable
          head={["Part of each 10 s cycle", "Current × time", "Charge"]}
          rows={[
            ["Asleep (9.98 s)", "10 µA × 9.98 s", "99.8 µA·s"],
            ["Awake (0.02 s)", "15,000 µA × 0.02 s", "300 µA·s"],
            ["Whole cycle (10 s)", "99.8 + 300", "399.8 µA·s"],
            ["Average current", "399.8 µA·s ÷ 10 s", "≈ 40 µA"],
          ]}
          mono={[1, 2]}
        />
        <p className="text-muted leading-7 mt-4">
          The 20 ms bursts use three times as much charge as nearly ten seconds of sleep. A multimeter updates
          its display only a few times a second, and how it responds to a 20 ms pulse depends on its design;
          it may show a jump, show nothing, or overload on the µA range. The digits that jump about are a sign
          of bursts, not a usable average. Use the meter for the sleep floor, and find the bursts&apos; height
          and length another way. Our page on{" "}
          <Link href="/multimeters/unstable-multimeter-readings" className={link}>
            unstable multimeter readings
          </Link>{" "}
          covers other reasons a display wanders.
        </p>
      </section>

      <section>
        <h2 id="battery-life" className="text-xl font-semibold mb-3">Estimate battery life from the average current</h2>
        <p className="text-muted leading-7 mb-4">
          Battery life in hours is the capacity in milliamp-hours divided by the average current in
          milliamps. Convert microamps first: 40 µA is 0.04 mA.
        </p>
        <DataTable
          head={["Battery capacity", "Average current", "Calculation", "Estimated life"]}
          rows={[
            ["220 mAh", "10 µA (sleep only)", "220 ÷ 0.01", "22,000 h ≈ 2.5 years"],
            ["220 mAh", "40 µA (with wake-ups)", "220 ÷ 0.04", "5,500 h ≈ 229 days"],
            ["220 mAh", "200 µA", "220 ÷ 0.2", "1,100 h ≈ 46 days"],
            ["2,000 mAh", "40 µA", "2,000 ÷ 0.04", "50,000 h ≈ 5.7 years"],
            ["2,000 mAh", "1 mA", "2,000 ÷ 1", "2,000 h ≈ 83 days"],
          ]}
          mono={[2, 3]}
        />
        <div className="mt-5">
          <Figure
            caption={
              <>
                The same 220 mAh battery at four average currents: 22,000 h at 10 µA, 5,500 h at 40 µA, 1,100 h
                at 200 µA and 220 h at 1 mA. Ignoring the wake-ups (10 µA instead of 40 µA) overstates the life
                four times.
              </>
            }
          >
            <BarChart
              log
              items={[
                { label: "10 µA (sleep only)", value: 22000, display: "22,000 h" },
                { label: "40 µA (with wake-ups)", value: 5500, display: "5,500 h", highlight: true },
                { label: "200 µA", value: 1100, display: "1,100 h" },
                { label: "1 mA", value: 220, display: "220 h" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Treat the result as an upper limit. Real batteries deliver less than their rated capacity when cold,
          at high pulse currents or when the device stops working above the battery&apos;s fully discharged
          voltage, and they lose some charge to self-discharge over the years. The battery datasheet gives the
          conditions behind its rated capacity.
        </p>
      </section>

      <section>
        <h2 id="shunt-and-scope" className="text-xl font-semibold mb-3">Use a shunt resistor and a scope for pulsed loads</h2>
        <p className="text-muted leading-7 mb-4">
          To see the bursts, do what the meter does internally, but with a display fast enough to follow them.
          Put a small resistor, the shunt, in series with the device&apos;s ground lead, between the device
          and the battery&apos;s negative terminal. Clip the scope&apos;s ground lead to the battery negative
          and the probe tip to the device side of the shunt. The scope now shows the current as a voltage: I =
          V ÷ R.
        </p>
        <Figure
          caption={
            <>
              One wake-up across a 10 Ω shunt at 50 mV/div and 5 ms/div. The pulse is 3 divisions tall, 3 × 50
              mV = 150 mV, and 150 mV ÷ 10 Ω = 15 mA. It is 4 divisions wide, 4 × 5 ms = 20 ms. The 10 µA sleep
              current makes only 0.1 mV, far too small to see at this setting.
            </>
          }
        >
          <ScopeScreen
            wave="pulse"
            cycles={0.5}
            amplitude={1.5}
            offset={-0.5}
            shift={3}
            labels={{ left: "CH1 50 mV/div  DC", right: "5 ms/div" }}
            marks={[
              { x1: 5, y1: 6, x2: 5, y2: 3, text: "150 mV = 15 mA" },
              { x1: 3, y1: 2.4, x2: 7, y2: 2.4, text: "4 div = 20 ms" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4 mb-4">
          From the scope you get the burst current and duration, and from the meter the sleep floor; the table
          in the previous section combines them. Choosing the shunt is the same burden trade-off: a larger
          resistor gives a bigger, easier signal but drops more of the supply. Here 15 mA × 10 Ω = 150 mV,
          which a 3.3 V device usually tolerates; check yours against its minimum supply voltage.
        </p>
        <p className="text-muted leading-7">
          The ground side matters. A bench scope&apos;s ground clip is connected to mains earth, so it must go
          to the battery negative, never to a point that is earthed some other way. If the device is also
          plugged into a computer by USB, its ground is earthed through the computer and the earth path
          bypasses the shunt, so disconnect it. If scopes are new to you, start with{" "}
          <Link href="/oscilloscopes/how-to-use-an-oscilloscope" className={link}>
            how to use an oscilloscope
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/how-to-measure-voltage-with-an-oscilloscope" className={link}>
            how to measure voltage with an oscilloscope
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which meter to use for standby current</h2>
        <p className="text-muted leading-7 mb-6">
          For sleep currents, the deciding features are a µA range, its resolution and its burden voltage, so
          check the manual&apos;s current-range specifications rather than the headline features. A higher
          display count also helps you read small currents with more digits. The meters below are from our{" "}
          <Link href="/multimeters/best-multimeters" className={link}>
            best multimeters
          </Link>{" "}
          roundup, and the{" "}
          <Link href="/multimeters/multimeter-accuracy-for-electronics-repair" className={link}>
            multimeter accuracy guide for electronics repair
          </Link>{" "}
          explains how accuracy specifications apply at the bottom of a range.
        </p>
        <ProductStrip
          title="Meters in our reviews"
          items={[
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "True RMS, 6,000-count, auto-ranging, CAT III 600V. Our pick for microcontroller and electronics projects.",
            },
            {
              name: "UNI-T UT139C",
              image: unit.image,
              alt: "UNI-T UT139C digital multimeter",
              href: "/multimeters/uni-t-ut139c-review",
              note: "True RMS and auto-ranging with a 6,000-count display and a CAT III 600V rating, at a budget price.",
            },
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "True RMS, auto-ranging, CAT III 600V. Fluke reliability in a smaller body, for field and electronics work.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
