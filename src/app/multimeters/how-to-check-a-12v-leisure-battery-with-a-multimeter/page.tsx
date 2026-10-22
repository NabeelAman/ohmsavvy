import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  InfoCards,
  KeyIdea,
  MeterReadout,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to check a 12V leisure battery with a multimeter: resting voltage, charge tables for lead-acid, AGM and lithium, and charger, solar and split-charge checks.";

export const metadata = buildMetadata({
  title: "Check a 12V Leisure Battery With a Multimeter",
  description,
  path: "/multimeters/how-to-check-a-12v-leisure-battery-with-a-multimeter",
});

const southwire = picks.find((p) => p.name === "Southwire 14070T")!;
const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;
const kaiweets = picks.find((p) => p.name === "KAIWEETS KM200s")!;

const link = "text-accent hover:underline";

export default function HowToCheckA12vLeisureBatteryWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Check a 12V Leisure Battery With a Multimeter"
      description={description}
      published="2026-10-22"
      path="/multimeters/how-to-check-a-12v-leisure-battery-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To check a 12V leisure battery with a multimeter, disconnect every charging source, let the battery rest
          for at least four hours, then measure DC volts directly across its terminals and compare the figure
          with a state-of-charge table for your battery type. A fully charged lead-acid or AGM leisure battery rests
          at around 12.7 V; a lithium (LiFePO4) one sits higher and much flatter, which changes how you read it. This
          guide covers caravans, motorhomes, campervans and boats, and also shows how to confirm that your mains
          charger, solar panel and split-charge system are actually doing their jobs.
        </>
      }
      aside={{
        image: southwire.image,
        alt: "Southwire 14070T TechnicianPRO waterproof multimeter, front view",
        caption: (
          <>
            The Southwire 14070T is IP67-rated with a magnetic hanging strap, handy in a damp battery locker or
            bilge. Any DC volts range will run these checks. See our{" "}
            <Link href="/multimeters/southwire-14070t-review" className={link}>
              14070T review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "leisure-vs-starter", label: "Leisure vs starter batteries" },
        { id: "isolate-and-rest", label: "Isolate and rest the battery" },
        { id: "measure-resting-voltage", label: "Measure the resting voltage" },
        { id: "lead-acid-agm-table", label: "Lead-acid and AGM charge table" },
        { id: "lithium-batteries", label: "Lithium (LiFePO4) batteries" },
        { id: "load-check", label: "Check under a real load" },
        { id: "charging-sources", label: "Check charger, solar and split charge" },
        { id: "what-it-means", label: "Interpreting the results" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "What voltage is too low for a leisure battery?",
          a: "For lead-acid and AGM leisure batteries, a resting voltage of around 12.2 V means roughly half charge, and many makers advise not discharging below that point routinely because deep discharges shorten the battery's life. Below about 11.9 V the battery is effectively flat and should be recharged as soon as possible. Lithium batteries have their own limits set by the built-in battery management system.",
        },
        {
          q: "Why does my leisure battery read 13.5 V when the caravan is on hook-up?",
          a: "Because you are reading the charger, not the battery. With mains hook-up, solar or the vehicle engine connected, the charging voltage props up the reading. Switch off or disconnect every charging source and wait several hours before taking a resting reading, or the figure will look healthier than the battery really is.",
        },
        {
          q: "Can a multimeter tell me the amp-hours left in a lithium leisure battery?",
          a: "Not reliably. A LiFePO4 battery holds an almost constant voltage across most of its charge, so a difference of a few hundredths of a volt can mean a large change in remaining capacity. Use the battery's own Bluetooth app or a battery monitor with a shunt for state of charge. A multimeter is still useful for checking charging voltages and spotting a battery that has shut itself down.",
        },
        {
          q: "How often should I check my caravan battery over winter?",
          a: "If the battery stays in the caravan or motorhome during storage, a monthly resting-voltage check is a good habit for lead-acid and AGM types, and topping up the charge whenever it falls towards 12.4 V helps prevent sulphation. Disconnect it, or use the isolator switch, to stop small standing loads such as alarms and trackers draining it.",
        },
        {
          q: "Is it safe to measure a leisure battery while things are switched on?",
          a: "Measuring voltage is safe with loads running; the meter only draws a tiny current. It simply will not give you a true resting figure. Never put the meter on its amps range across the battery terminals: that is a direct short through the meter and can blow its fuse or worse.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-check-a-12v-power-supply-under-load",
          title: "How to Check a 12V Power Supply Under Load",
          desc: "Test a 12 V charger or converter properly by measuring it while it delivers current.",
        },
        {
          href: "/multimeters/how-to-measure-parasitic-battery-drain",
          title: "How to Measure Parasitic Battery Drain",
          desc: "Track down the trackers, alarms and standby loads that flatten a battery in storage.",
        },
      ]}
    >
      <Callout title="Before you start">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Lead-acid leisure batteries can release hydrogen, especially while charging. Keep the battery locker
            ventilated and keep flames and sparks away.
          </li>
          <li>
            Remove rings and metal watch straps. A short across the terminals can deliver enough current to burn
            skin and melt metal, even at 12 V.
          </li>
          <li>
            Always measure with the meter set to DC volts and the red lead in the V socket. Never touch the
            battery terminals with the meter on its current range.
          </li>
          <li>If the battery case is swollen, hot or leaking, stop and replace it.</li>
        </ul>
      </Callout>

      <section>
        <h2 id="leisure-vs-starter" className="text-xl font-semibold mb-3">Leisure batteries vs starter batteries</h2>
        <p className="text-muted leading-7 mb-4">
          A vehicle starter battery delivers a huge burst of current for a few seconds and is then recharged. A
          leisure battery does the opposite job: it supplies lights, a water pump, a fridge or a heater fan for hours
          at a time and is repeatedly run down and recharged. That is why checking its state of charge matters so
          much: the deeper and more often a lead-acid battery is drained, the shorter its life.
        </p>
        <InfoCards
          items={[
            { label: "Flooded lead-acid", desc: "Cheapest, may need topping up with distilled water. Rests near 12.7 V when full." },
            { label: "AGM", desc: "Sealed, spill-proof, tolerates vibration. Similar resting voltages, often slightly higher." },
            { label: "Gel", desc: "Sealed with gelled electrolyte. Sensitive to over-voltage; check the charger profile." },
            { label: "Lithium (LiFePO4)", desc: "Light, deep-cycle, very flat voltage curve. Built-in BMS protects it." },
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="isolate-and-rest">Isolate and rest the battery</StepHeading>
        <p className="text-muted leading-7">
          Switch off mains hook-up, cover or disconnect any solar panel, and make sure the tow vehicle or engine is
          not connected or running. Turn off the 12 V system at the control panel or isolator. Then wait: at least
          four hours, and ideally overnight, so that the surface charge left by recent charging fades. A reading
          taken straight after charging can be several tenths of a volt optimistic.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="measure-resting-voltage">Measure the resting voltage</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set the meter to DC volts, black lead in COM, red in V. Put the red probe on the battery&apos;s positive
          terminal and the black on the negative, touching the lead posts or terminal studs themselves. If you
          measure at the control panel or a fuse box instead, you add the voltage drop of the wiring, so take the
          primary reading at the battery.
        </p>
        <Figure
          caption={
            <>
              Example resting readings: an AGM leisure battery at 12.71 V, about full (left), and the same type at
              12.18 V after a weekend off-grid, about half charged and due a recharge (right).
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="12.71" unit="V DC" mode="V⎓  AGM, rested" />
            <MeterReadout value="12.18" unit="V DC" mode="V⎓  AGM, after use" />
          </div>
        </Figure>
      </section>

      <section>
        <h2 id="lead-acid-agm-table" className="text-xl font-semibold mb-3">Lead-acid and AGM leisure battery charge table</h2>
        <p className="text-muted leading-7 mb-4">
          These are approximate resting voltages for a 12 V lead-acid or AGM battery at around 20 °C. Exact figures
          vary by maker and chemistry, so check your battery&apos;s data sheet if it gives one. The point to note is
          how small the window is: the difference between full and flat is less than one volt.
        </p>
        <DataTable
          head={["Resting voltage", "Approx. state of charge", "Advice"]}
          rows={[
            ["12.7 V and above", "100%", "Fully charged"],
            ["12.5 V", "About 75%", "Healthy; plenty in reserve for a night off-grid"],
            ["12.3 V", "About 50%", "Recharge soon; avoid regular discharges below here"],
            ["12.1 V", "About 25%", "Deep discharge: recharge now to limit damage"],
            ["11.9 V and below", "Flat", "Recharge immediately and retest after resting"],
          ]}
          mono={[0]}
        />
        <Figure
          caption={
            <>
              Approximate lead-acid and AGM resting voltage by state of charge. The usable range is compressed into
              about 0.8 V, which is why a meter with two decimal places is worth having.
            </>
          }
        >
          <BarChart
            items={[
              { label: "100%", value: 12.7, display: "12.7 V", highlight: true },
              { label: "75%", value: 12.5, display: "12.5 V" },
              { label: "50% (recharge point)", value: 12.3, display: "12.3 V" },
              { label: "25%", value: 12.1, display: "12.1 V" },
              { label: "Flat", value: 11.9, display: "11.9 V" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="lithium-batteries" className="text-xl font-semibold mb-3">Lithium (LiFePO4) leisure batteries</h2>
        <p className="text-muted leading-7 mb-4">
          Lithium iron phosphate batteries rest higher than lead-acid, typically around 13.2 to 13.4 V for most of
          their usable charge, and the curve is remarkably flat until the battery is nearly full or nearly empty.
          That makes voltage a poor fuel gauge: a reading of 13.25 V could be anywhere from about 30% to 70%.
        </p>
        <DataTable
          head={["Typical LiFePO4 resting voltage", "Rough state of charge"]}
          rows={[
            ["About 13.4 V and above", "Nearly full"],
            ["About 13.2–13.3 V", "Anywhere in the broad middle range"],
            ["About 13.0 V", "Getting low"],
            ["About 12.8 V and below", "Close to empty; the BMS may soon disconnect"],
            ["0 V or a few volts", "BMS has shut the battery off to protect it"],
          ]}
          mono={[0]}
        />
        <KeyIdea title="Use the meter to check charging, not to count amp-hours">
          For lithium, rely on the battery&apos;s app or a shunt-based monitor for state of charge. The multimeter
          earns its place by confirming that chargers deliver the voltage the battery maker specifies, and by
          showing when a battery management system has tripped the output to near zero.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={3} id="load-check">Check under a real load</StepHeading>
        <p className="text-muted leading-7">
          A battery can rest at a respectable voltage and still sag badly once it has to work. With the battery
          charged and rested, switch on a steady load such as the interior lights and the water pump, and measure
          again after a minute. A healthy lead-acid battery will drop a little, perhaps a tenth or two of a volt,
          and hold steady. A worn battery falls quickly and keeps falling. Lights that dim when the pump runs, with
          the voltage diving at the same moment, point to a battery that has lost much of its capacity, or to a
          loose or corroded connection worth checking first.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="charging-sources">Check the charger, solar and split charge</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Now reconnect each charging source one at a time and measure at the battery terminals. You are looking
          for a voltage clearly higher than the resting figure, which shows current is flowing into the battery.
        </p>
        <DataTable
          head={["Source", "What to do", "Typical sign it is working"]}
          rows={[
            ["Mains hook-up charger", "Switch on hook-up and the charger", "Rises to roughly 13.6–14.4 V depending on stage and profile"],
            ["Solar regulator", "Uncover the panel in daylight", "Rises above resting voltage in good light; check the regulator display"],
            ["Split charge / DC-DC", "Start the vehicle engine", "Leisure battery rises once the relay or charger switches in"],
          ]}
        />
        <Figure caption={<>Work through the sources one at a time so you know which one is, or is not, charging.</>}>
          <FlowDiagram
            steps={[
              { label: "Rest", sub: "All sources off, 4 h+" },
              { label: "Resting V", sub: "Compare with table" },
              { label: "Load", sub: "Lights + pump on" },
              { label: "Hook-up", sub: "Voltage should rise" },
              { label: "Solar / engine", sub: "Each one in turn" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          If a source shows no rise, check its fuse first, then the voltage at the source&apos;s own output
          terminals. Voltage present at the charger but missing at the battery means a wiring or fuse fault in
          between; the techniques in{" "}
          <Link href="/multimeters/how-to-check-voltage-drop-on-a-car" className={link}>
            checking voltage drop
          </Link>{" "}
          apply just as well to a caravan&apos;s 12 V wiring.
        </p>
      </section>

      <section>
        <h2 id="what-it-means" className="text-xl font-semibold mb-3">Interpreting the results</h2>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <strong className="text-foreground">Good resting voltage, holds under load, rises on charge:</strong>{" "}
            battery and charging are healthy.
          </li>
          <li>
            <strong className="text-foreground">Low resting voltage that recovers after a full charge:</strong>{" "}
            the battery was just discharged. Look for standing loads or a charging source that is not working.
          </li>
          <li>
            <strong className="text-foreground">Fully charged, but sags fast under load:</strong> capacity has
            dropped, common in older lead-acid batteries that were left flat over winter.
          </li>
          <li>
            <strong className="text-foreground">Will not climb above about 12.4 V however long it charges:</strong>{" "}
            likely sulphation or a failed cell.
          </li>
          <li>
            <strong className="text-foreground">Battery drains while stored:</strong> measure the standby current
            to find the culprit, as in our{" "}
            <Link href="/multimeters/how-to-measure-parasitic-battery-drain" className={link}>
              parasitic drain guide
            </Link>
            .
          </li>
        </ul>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter to use</h2>
        <p className="text-muted leading-7 mb-6">
          Any meter with a DC volts range and two decimal places on its 20 V range is enough. In a damp battery
          box or on a boat, a sealed, rugged meter is worth considering. Compare options in our{" "}
          <Link href="/multimeters/best-multimeters" className={link}>
            best multimeters
          </Link>{" "}
          roundup.
        </p>
        <ProductStrip
          title="Meters from our reviews"
          items={[
            {
              name: "Southwire 14070T",
              image: southwire.image,
              alt: "Southwire 14070T waterproof multimeter",
              href: "/multimeters/southwire-14070t-review",
              note: "IP67 waterproof, CAT IV 600V / CAT III 1000V, with a work light and magnetic strap.",
            },
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR True RMS digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "True RMS, 6,000-count, auto and manual ranging. Compact and lightweight.",
            },
            {
              name: "KAIWEETS KM200s",
              image: kaiweets.image,
              alt: "KAIWEETS KM200s True RMS digital multimeter",
              href: "/multimeters/kaiweets-km200s-review",
              note: "Auto-ranging, True RMS, backlit display for dim battery lockers.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
