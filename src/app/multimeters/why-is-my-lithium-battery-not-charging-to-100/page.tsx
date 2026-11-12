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
  "Lithium battery stuck below 100%? Check charger voltage, BMS balancing, temperature limits, the LiFePO4 voltage plateau and charge-limit settings with a meter.";

export const metadata = buildMetadata({
  title: "Why Is My Lithium Battery Not Charging to 100%?",
  description,
  path: "/multimeters/why-is-my-lithium-battery-not-charging-to-100",
});

const fluke115 = picks.find((p) => p.name === "Fluke 115")!;
const fluke17 = picks.find((p) => p.name === "Fluke 17B+")!;
const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;

const link = "text-accent hover:underline";

/** CC/CV charge profile with the point where a low-voltage charger stops short. */
function ChargeCurveDiagram() {
  return (
    <svg
      viewBox="0 0 340 210"
      className="w-full h-auto"
      role="img"
      aria-label="Why a lithium battery is not charging to 100 percent: a constant-current, constant-voltage charge curve. Voltage rises during the constant-current stage, then holds at 4.20 volts per cell while current tapers to a small tail. A charger set to 4.10 volts reaches its voltage early and stops the battery at roughly 85 to 90 percent."
    >
      {/* axes */}
      <g className="stroke-foreground" strokeWidth="1.4">
        <line x1="40" y1="20" x2="40" y2="180" />
        <line x1="40" y1="180" x2="325" y2="180" />
      </g>
      <text x="182" y="200" fontSize="9" textAnchor="middle" className="fill-muted">charge time</text>
      <text x="14" y="100" fontSize="9" textAnchor="middle" className="fill-muted" transform="rotate(-90 14 100)">volts / amps</text>
      {/* stage divider */}
      <line x1="170" y1="20" x2="170" y2="180" className="stroke-border" strokeWidth="1" strokeDasharray="3 3" />
      <text x="105" y="32" fontSize="9" textAnchor="middle" className="fill-muted">constant current</text>
      <text x="248" y="32" fontSize="9" textAnchor="middle" className="fill-muted">constant voltage</text>
      {/* voltage curve */}
      <path d="M40 130 C80 105, 130 80, 170 55 L320 55" fill="none" className="stroke-accent" strokeWidth="2.2" />
      <text x="322" y="50" fontSize="9" textAnchor="end" className="fill-accent">4.20 V</text>
      {/* low-voltage charger line */}
      <line x1="40" y1="70" x2="320" y2="70" className="stroke-foreground" strokeWidth="1" strokeDasharray="5 3" />
      <text x="322" y="82" fontSize="9" textAnchor="end" className="fill-foreground">4.10 V charger stops here</text>
      <circle cx="146" cy="70" r="4" className="fill-foreground" />
      {/* current curve */}
      <path d="M40 95 L170 95 C200 120, 240 150, 320 168" fill="none" className="stroke-foreground" strokeWidth="2" />
      <text x="60" y="90" fontSize="9" className="fill-foreground">current</text>
      <text x="318" y="162" fontSize="9" textAnchor="end" className="fill-muted">tail ≈ C/20: done</text>
      <text x="100" y="145" fontSize="9" textAnchor="middle" className="fill-accent">voltage</text>
    </svg>
  );
}

export default function WhyIsMyLithiumBatteryNotChargingTo100Page() {
  return (
    <HowToShell
      title="Why Is My Lithium Battery Not Charging to 100%?"
      description={description}
      published="2026-11-13"
      path="/multimeters/why-is-my-lithium-battery-not-charging-to-100"
      category="multimeters"
      intro={
        <>
          A lithium battery not charging to 100% is usually being stopped on purpose: by a charge-limit setting,
          by a charger whose voltage is set too low, by the BMS cutting off when one cell fills first, or by a
          temperature limit. Less often the battery is full and only the gauge is wrong, which is common with
          LiFePO4 because its voltage barely changes between 20% and 90%. This page covers phones, laptops, power
          stations, e-bike packs and 12 V LiFePO4 batteries, with the meter checks that tell those causes apart.
        </>
      }
      aside={{
        image: fluke115.image,
        alt: "Fluke 115 True RMS digital multimeter for checking charger and battery voltage",
        caption: (
          <>
            A 6,000-count meter like the Fluke 115 resolves the 10 mV steps that matter at the top of a lithium
            charge. See our{" "}
            <Link href="/multimeters/fluke-115-review" className={link}>
              Fluke 115 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "causes", label: "Causes at a glance" },
        { id: "how-charging-ends", label: "How a lithium charge ends" },
        { id: "check-the-setting", label: "1. Check for a charge limit" },
        { id: "charger-voltage", label: "2. Measure charger voltage" },
        { id: "voltage-drop", label: "3. Check for voltage drop" },
        { id: "temperature", label: "4. Check temperature" },
        { id: "bms-balancing", label: "5. Check cells and balancing" },
        { id: "gauge-sync", label: "6. Resync the gauge" },
        { id: "lifepo4-plateau", label: "The LiFePO4 plateau" },
        { id: "when-to-stop", label: "When to call the dealer" },
      ]}
      faq={[
        {
          q: "Is it bad if my lithium battery never charges to 100%?",
          a: "No. Stopping at 80 to 90% is gentler on lithium cells, which age faster when held at full voltage, especially when warm. Many phones, laptops and EVs do it deliberately. The only downside is less runtime. LiFePO4 packs with a BMS do benefit from an occasional full charge, because that is when the cells get balanced and the gauge resets.",
        },
        {
          q: "Why does my LiFePO4 battery stop at 13.3 V?",
          a: "13.3 to 13.4 V is a typical resting voltage for a full 12 V LiFePO4 battery, so it may already be charged. If it reads that while the charger is still connected, the charger is probably in a float or lead-acid mode. LiFePO4 needs about 14.2 to 14.6 V during absorption to finish. Check the charger's battery-type setting first.",
        },
        {
          q: "Can I use a lead-acid charger on a lithium battery?",
          a: "Only if it has a lithium or LiFePO4 mode. A flooded lead-acid profile may float too low to finish the charge, and some run an equalization or desulfation stage at 15 V or more, which can trip the BMS or damage cells. Chargers with an AGM setting sometimes come close but rarely hold absorption long enough to balance the pack.",
        },
        {
          q: "Why does my battery charge to 100% in summer but not in winter?",
          a: "Cold. Most lithium cells must not be charged below about 0 °C (32 °F), and many BMS boards reduce charge current from around 5 to 10 °C. In a cold garage or RV the BMS may refuse charge entirely or cut it short. Self-heating batteries solve this; otherwise move the battery somewhere warmer or charge after it has warmed.",
        },
        {
          q: "How long should a LiFePO4 battery balance at full charge?",
          a: "It depends on the imbalance and the BMS balance current, which is often only 30 to 100 mA on passive balancers. A pack a few hundred mAh out of line can need several hours at absorption voltage. Leaving the charger at absorption until the tail current is small, then keeping it there an extra hour or two, usually lets a passive balancer catch up.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-diagnose-a-solar-battery-that-stops-charging-at-80-percent",
          title: "Solar Battery Stops Charging at 80%?",
          desc: "Home storage systems: inverter modes, reserve settings and installer escalation.",
        },
        {
          href: "/multimeters/how-to-test-lithium-battery-capacity-with-a-multimeter",
          title: "How to Test Lithium Battery Capacity",
          desc: "Once it charges fully, a timed discharge tells you how many mAh it really holds.",
        },
      ]}
    >
      <Callout title="Lithium battery safety">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Never raise a charger above the battery maker&apos;s maximum voltage to force a higher reading, and
            never bypass or bridge a BMS. Overcharged lithium cells can vent and catch fire.
          </li>
          <li>
            Stop charging and move the battery to a safe place outdoors if it swells, hisses, smells sweet or gets
            hot. For a fire, leave and call 911.
          </li>
          <li>
            Don&apos;t charge lithium below freezing unless the battery has built-in heating; it can plate lithium
            metal inside the cell.
          </li>
          <li>
            Measure at external terminals or ports only. Opening a phone, laptop, power station or e-bike pack is a
            job for the dealer or a battery shop.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Causes at a glance</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Stops at exactly 80%, 85% or 90%", "Charge limit or battery-care setting", "Device or app settings", "Raise or disable the limit"],
            ["Never above about 90%, voltage looks low", "Charger voltage too low or wrong profile", "Meter at charger output", "Set the right battery type or replace the charger"],
            ["Charger reads right, battery reads less", "Voltage drop in cables or connectors", "Meter at both ends while charging", "Shorter, thicker cables; clean lugs"],
            ["Stops early, pack jumps to 100% later", "One cell hits its limit, BMS stops charge", "Cell voltages in the BMS app", "Long absorption to balance; dealer if one cell stays off"],
            ["Won't charge or charges slowly when cold", "BMS low-temperature cutoff", "Battery temperature", "Warm the battery; heated battery for winter"],
            ["Gauge says 70% after a full charge", "LiFePO4 plateau, gauge out of sync", "Resting voltage and charger tail current", "Full charge to resync the gauge"],
          ]}
        />
      </section>

      <section>
        <h2 id="how-charging-ends" className="text-xl font-semibold mb-3">How a lithium charge is supposed to end</h2>
        <p className="text-muted leading-7 mb-4">
          Lithium chargers use constant current, then constant voltage (CC/CV). During the first stage the charger
          pushes a set current and the voltage climbs. When the voltage reaches the target, 4.20 V per cell for most
          Li-ion and about 3.45 to 3.65 V per cell for LiFePO4, the charger holds that voltage and the current falls
          away. It calls the battery full when the current drops to a small tail, often around C/20 (5 A for a
          100 Ah pack, 150 mA for a 3,000 mAh cell).
        </p>
        <p className="text-muted leading-7 mb-4">
          The last 10 to 15% goes in during that constant-voltage taper. Anything that lowers the target voltage or
          cuts the taper short leaves the battery at 85 to 90%. On Li-ion, a charger that stops at 4.10 V instead of
          4.20 V typically gives up roughly 10% of capacity.
        </p>
        <Figure caption={<>A CC/CV charge. The last part of the charge happens while current tapers at full voltage, so a charger set even 0.1 V low per cell ends the charge early.</>}>
          <ChargeCurveDiagram />
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="check-the-setting">Check for a charge limit before you pick up the meter</StepHeading>
        <p className="text-muted leading-7">
          Most stuck-at-80% complaints are a setting. iPhones and many Android phones have optimized or 80% limit
          modes, laptops from most big brands have battery-health modes that cap at 80% or 60%, EVs default to a
          daily limit, and many power stations and solar batteries let you set a maximum state of charge in the app.
          E-bike and scooter chargers sometimes have a storage or long-life switch. If the number it stops at is a
          round figure and it&apos;s the same every time, look for the setting first. For laptops, our guide to{" "}
          <Link href="/multimeters/why-is-my-laptop-charger-not-charging-the-battery" className={link}>
            a laptop charger not charging the battery
          </Link>{" "}
          covers the adapter side.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="charger-voltage">Measure the charger&apos;s output voltage</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set the meter to DC volts, put the leads in COM and V, and measure the charger output with the battery
          connected and charging near the end of the charge. Some smart chargers show 0 V with no battery attached,
          so an open-circuit reading can mislead. Compare what you see with the target for the chemistry and
          series cell count.
        </p>
        <DataTable
          head={["Battery", "Cells in series", "Full-charge target (typical)"]}
          rows={[
            ["Li-ion single cell (18650, phone)", "1S", "4.20 V"],
            ["11.1 V Li-ion pack", "3S", "12.6 V"],
            ["36 V e-bike Li-ion", "10S", "42.0 V"],
            ["48 V e-bike Li-ion", "13S", "54.6 V"],
            ["12 V LiFePO4", "4S", "14.2–14.6 V absorption"],
            ["24 V LiFePO4", "8S", "28.4–29.2 V absorption"],
            ["48 V LiFePO4 (51.2 V nominal)", "16S", "56.8–58.4 V absorption"],
          ]}
          mono={[2]}
        />
        <p className="text-muted leading-7 mt-4 mb-4">
          Always go by the battery maker&apos;s figure where one is published. A charger reading 0.5 V or more below
          target on a 12 V LiFePO4, or 0.1 V or more below per cell on Li-ion, will leave the battery short. The usual
          culprit on RVs and boats is a converter or charger still set to a lead-acid float voltage of about 13.5 V.
        </p>
        <Figure caption={<>Illustrative readings from a 12 V LiFePO4 setup: a charger floating at 13.5 V (left) cannot finish the charge; at 14.4 V (right) it can.</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="13.50" unit="V" mode="DC V  lead-acid float" />
            <MeterReadout value="14.40" unit="V" mode="DC V  LiFePO4 absorb" />
          </div>
        </Figure>
      </section>

      <section>
        <StepHeading n={3} id="voltage-drop">Check for voltage drop between charger and battery</StepHeading>
        <p className="text-muted leading-7">
          While it charges, measure at the charger output terminals, then at the battery terminals. The difference
          is the drop in the cables, fuses and connectors. At 20 A, a 0.02 Ω path costs 0.4 V, enough for the
          battery to see 14.0 V when the charger is making 14.4 V. The battery then never reaches its absorption
          voltage, and the charger&apos;s tail-current logic ends the charge early. A drop above about 0.2 V on a
          12 V system is worth fixing. Feel each connection too: a lug that is warm while everything else is cool is
          the high-resistance joint.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="temperature">Check the battery&apos;s temperature</StepHeading>
        <p className="text-muted leading-7">
          Lithium cells are typically allowed to charge from about 0 °C to 45 °C (32 °F to 113 °F). A BMS that sees
          a cell below its low limit blocks charging altogether; many also reduce current near the edges, which can
          make a charger time out before the battery is full. A battery in a hot engine bay or in direct sun can
          hit the upper limit. Measure the case temperature with a thermocouple-equipped meter or an infrared
          thermometer. If it reads near either edge, bring it to room temperature and try again before suspecting
          anything else.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="bms-balancing">Check cell voltages and give the BMS time to balance</StepHeading>
        <p className="text-muted leading-7 mb-4">
          In a series pack, the charge ends when the highest cell reaches its limit, not when the pack voltage does.
          If one LiFePO4 cell runs up to 3.65 V while the other three sit at 3.40 V, the BMS stops the charge at
          about 3.65 + 3 × 3.40 = 13.85 V, and the gauge shows something short of full. Most Bluetooth BMS apps list
          each cell voltage; on a pack with exposed balance leads you can read them with the meter.
        </p>
        <p className="text-muted leading-7 mb-4">
          The fix is balancing time. Passive balancers bleed the high cell with tens of milliamps, so leave the
          charger at absorption voltage for a few hours after the current tapers. If the same cell is always high
          and always the first to empty, it has lower capacity than its neighbors, and our{" "}
          <Link href="/multimeters/how-to-test-a-48v-lifepo4-battery-for-voltage-imbalance-between-cells" className={link}>
            LiFePO4 cell imbalance test
          </Link>{" "}
          shows how to confirm it. A pack that reads 0 V at the output after a charge attempt has tripped its
          protection; see{" "}
          <Link href="/multimeters/how-to-test-a-battery-protection-circuit-with-a-multimeter" className={link}>
            how to test a battery protection circuit
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={6} id="gauge-sync">Resync the state-of-charge gauge</StepHeading>
        <p className="text-muted leading-7">
          Most battery monitors count amp-hours in and out (a coulomb counter) and only correct themselves at a known
          point, usually full. If the battery hasn&apos;t seen a full charge in weeks, small counting errors build up
          and the gauge can read 70% on a battery that is close to full. Charge until the charger reports complete
          and the tail current is small, hold it there briefly, and the monitor should snap to 100%. If it
          doesn&apos;t, check its configured capacity and charged-voltage settings against the battery label.
        </p>
      </section>

      <section>
        <h2 id="lifepo4-plateau" className="text-xl font-semibold mb-3">
          Why LiFePO4 voltage makes it look like the battery isn&apos;t charging to 100%
        </h2>
        <p className="text-muted leading-7 mb-4">
          LiFePO4 has an unusually flat voltage curve. Resting, a cell sits around 3.20 V at 20% and about 3.35 V at
          90%, so 70% of its capacity lives inside roughly 0.15 V. A Li-ion cell covers the same span over roughly
          0.36 V. If you judge a LiFePO4 battery by a voltage chart, a 0.05 V error from temperature or meter
          accuracy can move your estimate by 20% or more.
        </p>
        <Figure caption={<>Typical resting-voltage change per cell from 20% to 90% state of charge. The smaller the bar, the worse voltage works as a fuel gauge.</>}>
          <BarChart
            items={[
              { label: "Li-ion (NMC), per cell", value: 0.36, display: "≈ 0.36 V" },
              { label: "LiFePO4, per cell", value: 0.15, display: "≈ 0.15 V", highlight: true },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4 mb-4">
          LiFePO4 also settles after charging. It may read 3.55 to 3.60 V per cell on the charger and fall to about
          3.40 V within an hour, which looks like lost charge but is normal. A full 12 V LiFePO4 resting at 13.4 V is
          full. Judge it by the charger finishing and the tail current, not by the resting number.
        </p>
        <KeyIdea title="Full is a current, not a voltage">
          A lithium battery is full when the charger has held the target voltage and the current has tapered to a
          small tail. If the voltage never reaches the target, or the taper is cut off by a timer, temperature or a
          single high cell, the battery stops short no matter what the gauge says.
        </KeyIdea>
      </section>

      <section>
        <h2 id="when-to-stop" className="text-xl font-semibold mb-3">When to stop and call the dealer or installer</h2>
        <p className="text-muted leading-7 mb-6">
          Call the battery maker or dealer if a cell stays more than about 0.1 V away from the others after a long
          balance, if the pack gets warm while charging at a modest current, or if it trips its BMS on every charge.
          Those point to a weak cell or a fault inside the pack, and most warranties are void once you open it. For
          home storage tied to an inverter, start with the installer;{" "}
          <Link href="/multimeters/how-to-diagnose-a-solar-battery-that-stops-charging-at-80-percent" className={link}>
            our solar battery guide
          </Link>{" "}
          covers inverter modes and reserve settings that this page doesn&apos;t.
        </p>
        <ProductStrip
          title="Meters for lithium charging checks"
          items={[
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 True RMS digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "True RMS, CAT III 600V and a 6,000-count backlit display for reading charger and battery voltage side by side.",
            },
            {
              name: "Fluke 17B+",
              image: fluke17.image,
              alt: "Fluke 17B+ digital multimeter",
              href: "/multimeters/fluke-17b-plus-review",
              note: "Temperature with the supplied Type K probe plus MIN MAX, handy for catching a cold or hot battery and a sagging charger.",
            },
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR True RMS digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "6,000-count resolution at a budget price, enough to see the small voltage steps at the top of a lithium charge.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
