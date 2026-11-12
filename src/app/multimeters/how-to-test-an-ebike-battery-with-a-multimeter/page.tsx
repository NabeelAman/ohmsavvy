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
  "How to test an ebike battery with a multimeter: full and empty voltages for 36, 48 and 52 V packs, a voltage sag load test, self-discharge and BMS cutoff.";

export const metadata = buildMetadata({
  title: "How to Test an Ebike Battery With a Multimeter",
  description,
  path: "/multimeters/how-to-test-an-ebike-battery-with-a-multimeter",
});

const fluke17b = picks.find((p) => p.name === "Fluke 17B+")!;
const brymen = picks.find((p) => p.name === "Brymen BM235")!;
const fluke115 = picks.find((p) => p.name === "Fluke 115")!;

const link = "text-accent hover:underline";

/** A 13S ebike pack: cell groups in series, the BMS on the negative side, and the two places to put the meter. */
function PackDiagram() {
  const groups = Array.from({ length: 13 }, (_, i) => i);
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full h-auto"
      role="img"
      aria-label="How to test an ebike battery: a 48 volt pack drawn as 13 cell groups in series, with the BMS between the cells and the negative output. The meter reads about 54.6 volts across the discharge terminals when full; if the BMS has cut off, the terminals read near zero while the cells still hold voltage."
    >
      <rect x="10" y="20" width="250" height="90" rx="8" className="fill-surface stroke-foreground" strokeWidth="2" />
      <text x="135" y="14" fontSize="10" textAnchor="middle" className="fill-muted">13 cell groups in series (13S)</text>
      {groups.map((i) => (
        <g key={i}>
          <rect x={20 + i * 18} y="35" width="13" height="40" rx="2" className="fill-muted stroke-foreground" strokeWidth="1" />
          <text x={26.5 + i * 18} y="88" fontSize="6.5" textAnchor="middle" className="fill-muted">4.2</text>
        </g>
      ))}
      <text x="135" y="102" fontSize="8.5" textAnchor="middle" className="fill-foreground">13 × 4.2 V = 54.6 V when full</text>
      {/* BMS */}
      <rect x="150" y="130" width="80" height="34" rx="4" className="fill-surface stroke-accent" strokeWidth="1.8" />
      <text x="190" y="145" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-accent">BMS</text>
      <text x="190" y="157" fontSize="8" textAnchor="middle" className="fill-muted">cuts output on fault</text>
      <g fill="none" strokeWidth="1.6" className="stroke-foreground">
        <path d="M26 75 V147 H150" />
        <path d="M230 147 H285" />
        <path d="M242 55 H262 V60 H285" />
      </g>
      <circle cx="290" cy="60" r="6" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <text x="290" y="63" fontSize="9" textAnchor="middle" className="fill-foreground">+</text>
      <circle cx="290" cy="147" r="6" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <text x="290" y="150" fontSize="10" textAnchor="middle" className="fill-foreground">−</text>
      <path d="M296 60 H320 V147 H296" fill="none" strokeWidth="1.6" strokeDasharray="4 3" className="stroke-accent" />
      <rect x="300" y="88" width="36" height="30" rx="4" className="fill-surface stroke-accent" strokeWidth="1.5" />
      <text x="318" y="101" fontSize="8" textAnchor="middle" className="fill-accent">V DC</text>
      <text x="318" y="112" fontSize="7" textAnchor="middle" className="fill-muted">meter</text>
      <text x="20" y="185" fontSize="8.5" className="fill-muted">Terminals read 0 V but the pack is not dead? The BMS has opened its output.</text>
    </svg>
  );
}

export default function HowToTestAnEbikeBatteryWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test an Ebike Battery With a Multimeter"
      description={description}
      published="2026-11-13"
      path="/multimeters/how-to-test-an-ebike-battery-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test an ebike battery, set a multimeter to DC volts, measure across the discharge terminals and
          compare the reading with the full and empty voltages for your pack: about 42 V full for a 36 V pack,
          54.6 V for a 48 V pack and 58.8 V for a 52 V pack. Then check ebike battery health with a load test,
          because a worn pack often reads fine at rest and collapses the moment the motor pulls current. This
          guide covers resting voltage, voltage sag, a 48-hour self-discharge check and how to tell a tired
          pack from one the BMS has simply switched off.
        </>
      }
      aside={{
        image: fluke17b.image,
        alt: "Fluke 17B+ digital multimeter, front view",
        caption: (
          <>
            The Fluke 17B+ has MIN MAX recording, which captures the lowest voltage during a hill climb so you
            don&apos;t have to read the display while riding. See our{" "}
            <Link href="/multimeters/fluke-17b-plus-review" className={link}>
              Fluke 17B+ review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "pack-voltages", label: "Full, nominal and empty voltages" },
        { id: "resting-voltage", label: "Measure the resting voltage" },
        { id: "state-of-charge", label: "Turn volts into state of charge" },
        { id: "sag-test", label: "Load test: voltage sag" },
        { id: "self-discharge", label: "48-hour self-discharge check" },
        { id: "bms-cutoff", label: "Zero volts and BMS cutoff" },
        { id: "symptoms", label: "Symptoms, causes and fixes" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "What voltage should a fully charged 48V ebike battery read?",
          a: "A 13S lithium-ion pack charged to about 4.2 V per cell reads close to 54.6 V straight off the charger. It settles a few tenths of a volt lower after an hour of rest. Some chargers stop slightly short of 4.2 V per cell to extend pack life, so a reading around 53.5 to 54.5 V can still mean full on those systems.",
        },
        {
          q: "At what voltage is a 36V ebike battery dead?",
          a: "A 10S pack is close to empty at roughly 30 to 32 V at rest, about 3.0 to 3.2 V per cell. Most controllers cut power somewhere in that region to protect the cells. If the pack reads well under 30 V, or the terminals read near zero, the BMS has probably shut the output off, and the next step is a careful charge test.",
        },
        {
          q: "How do I check ebike battery health without special tools?",
          a: "A multimeter gives you three useful numbers: the resting voltage after a full charge, the drop in voltage under a hard load, and how much the full voltage falls over 48 hours of rest. A pack that charges to the right voltage, sags only a few volts on a hill and holds its charge on the shelf is in decent health.",
        },
        {
          q: "How long do ebike batteries last?",
          a: "Battery makers commonly quote somewhere in the range of 500 to 1,000 full charge cycles before capacity falls noticeably, which works out to a few years for most riders. Heat, storage at full charge and repeated runs down to empty shorten that. A falling range and growing voltage sag are the signs that the pack is reaching the end of its useful life.",
        },
        {
          q: "Can I measure ebike battery capacity with a multimeter?",
          a: "Not directly. A multimeter reads voltage and, within its fused current range, small currents, but capacity is amp-hours delivered over a full discharge. For that you need an inline watt meter between the pack and the controller, or a dedicated battery capacity tester. A multimeter is still the right tool to find a sagging pack, a BMS cutoff or a high self-discharge rate.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-an-ebike-controller-with-a-multimeter",
          title: "How to Test an Ebike Controller With a Multimeter",
          desc: "Battery input, throttle signal, hall supply and MOSFET checks on the controller.",
        },
        {
          href: "/multimeters/why-is-my-ebike-battery-not-charging",
          title: "Why Is My Ebike Battery Not Charging?",
          desc: "Charger output, fuses, BMS lockout, cold cells and the charge port, checked in order.",
        },
        {
          href: "/multimeters/how-to-test-a-battery-protection-circuit-with-a-multimeter",
          title: "How to Test a Battery Protection Circuit",
          desc: "Cell side versus pack side readings on a lithium protection board.",
        },
      ]}
    >
      <Callout title="Lithium pack safety">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            An ebike pack can deliver hundreds of amps into a short. A probe tip that slips across two pins, a
            ring or a wrench across the terminals can weld metal and start a fire. Use insulated probes with
            shrouded tips, take off rings and watches, and keep tools off the top of the pack.
          </li>
          <li>
            Don&apos;t open the shrink wrap or case to probe cells unless you build packs. Measure at the
            terminals only.
          </li>
          <li>
            A pack that is swollen, hot, hissing or smells sweet or chemical is a fire risk. Move it outdoors
            onto concrete, away from anything that can burn, and do not charge it. If it smokes or catches
            fire, get clear and call 911. Water won&apos;t reliably stop a lithium cell fire once it starts.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="pack-voltages" className="text-xl font-semibold mb-3">Ebike battery voltages: nominal, full and empty</h2>
        <p className="text-muted leading-7 mb-4">
          The number on the sticker is the nominal voltage, an average over the discharge, not what you will
          see on the meter. Most ebike packs use lithium-ion cells (18650 or 21700 size) wired in series
          groups. Each group sits at about 4.2 V when full, around 3.6 to 3.7 V in the middle, and about 3.0 V
          when it should be treated as empty. Multiply by the number of groups in series (the &quot;S&quot;
          count) and you have the window for your pack. The table uses those standard per-cell figures; your
          maker may set slightly different limits, so the manual or charger label wins if they disagree.
        </p>
        <DataTable
          head={["Pack", "Series groups", "Nominal", "Full (≈4.2 V/cell)", "Empty (≈3.0 V/cell)", "Charger output"]}
          rows={[
            ["36 V", "10S", "36–37 V", "42.0 V", "≈30 V", "42 V"],
            ["48 V", "13S", "46.8–48.1 V", "54.6 V", "≈39 V", "54.6 V"],
            ["52 V", "14S", "50.4–51.8 V", "58.8 V", "≈42 V", "58.8 V"],
          ]}
          mono={[2, 3, 4, 5]}
        />
        <p className="text-muted leading-7 mt-4 mb-4">
          The arithmetic is simple: 13 × 4.2 V = 54.6 V and 13 × 3.0 V = 39 V. A 48 V pack therefore swings
          about 15.6 V from full to empty, which is why voltage is a reasonable fuel gauge on these packs. If
          your charger label says 54.6 V, you have a 13S pack; 58.8 V means 14S.
        </p>
        <Figure caption={<>Full-charge voltage by pack size, using about 4.2 V per cell.</>}>
          <BarChart
            items={[
              { label: "36 V pack (10S)", value: 42, display: "42.0 V" },
              { label: "48 V pack (13S)", value: 54.6, display: "54.6 V", highlight: true },
              { label: "52 V pack (14S)", value: 58.8, display: "58.8 V" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="resting-voltage">Measure the resting voltage at the discharge terminals</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Turn the pack&apos;s switch or key on if it has one, and take it off the bike or unplug the
          controller so nothing is drawing current. Set the meter to DC volts (V with a straight line). On a
          manual-ranging meter pick the 200 V or 600 V range. Put the red probe on the positive discharge
          terminal and the black on negative. On rail-mount packs these are the two large blades or pins in
          the base; the small pins between them are usually communication or key-sense lines, so leave those
          alone.
        </p>
        <p className="text-muted leading-7 mb-4">
          A fresh-off-the-charger reading near the full figure in the table means the charger and BMS let the
          pack reach full. Let it rest an hour and read again: a healthy pack loses only a few tenths of a volt
          as surface charge settles. Note the number, because steps 3 and 4 build on it.
        </p>
        <Figure caption={<>Illustrative readings from a 48 V (13S) pack: one hour after charging, and the same pack near empty.</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="54.31" unit="V DC" mode="REST  ≈ full" />
            <MeterReadout value="40.12" unit="V DC" mode="REST  ≈ empty" />
          </div>
        </Figure>
        <Figure caption={<>Where the reading is taken, and why a cut-off BMS makes a charged pack read zero at the terminals.</>}>
          <PackDiagram />
        </Figure>
      </section>

      <section>
        <StepHeading n={2} id="state-of-charge">Turn the resting voltage into a rough state of charge</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Divide the pack reading by the series count to get volts per cell, then compare with the rough guide
          below. It only works after the pack has rested for at least 30 minutes with no load; a reading taken
          right after a ride or a charge is skewed. Cell chemistries differ, so treat the percentages as
          approximate.
        </p>
        <DataTable
          head={["Per cell (rest)", "36 V pack", "48 V pack", "52 V pack", "Rough charge"]}
          rows={[
            ["4.2 V", "42.0 V", "54.6 V", "58.8 V", "≈100%"],
            ["4.0 V", "40.0 V", "52.0 V", "56.0 V", "≈75–80%"],
            ["3.8 V", "38.0 V", "49.4 V", "53.2 V", "≈50–60%"],
            ["3.6 V", "36.0 V", "46.8 V", "50.4 V", "≈25–35%"],
            ["3.4 V", "34.0 V", "44.2 V", "47.6 V", "≈10%"],
            ["3.0 V", "30.0 V", "39.0 V", "42.0 V", "empty"],
          ]}
          mono={[0, 1, 2, 3]}
        />
      </section>

      <section>
        <StepHeading n={3} id="sag-test">Run a load test to see voltage sag</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Resting voltage tells you charge level. Health shows up under load. As cells age their internal
          resistance rises, and every amp the motor draws pulls the voltage down by that resistance (V = I ×
          R). A tired pack can show a healthy 52 V on the bench and still drop to the controller&apos;s
          low-voltage cutoff on the first steep hill, which riders describe as the bike &quot;dying at half
          battery.&quot;
        </p>
        <p className="text-muted leading-7 mb-4">
          To measure it, back-probe the battery leads where they enter the controller (or the connector at the
          pack base) with thin probes or pin adapters, route the leads so they can&apos;t catch in the wheel,
          and secure the meter to the bars. Switch on MIN MAX recording if your meter has it. Ride a short,
          steep hill at full throttle, stop, and read the MIN value. If your display shows battery voltage,
          you can use that instead, though many displays only show bars.
        </p>
        <p className="text-muted leading-7 mb-4">
          Work it through with an illustrative 48 V example. The pack rests at 52.0 V and the motor draws about
          15 A on the hill. A good pack might dip to 49.0 V: a 3.0 V sag, so 3.0 ÷ 15 = 0.2 Ω of pack
          resistance. A worn pack at the same charge dips to 45.0 V: 7.0 ÷ 15 ≈ 0.47 Ω. That is 45 ÷ 13 ≈ 3.46
          V per cell under load, close enough to many controllers&apos; cutoff that the bike starts cutting
          out with a third of the charge still in it.
        </p>
        <Figure caption={<>Illustrative sag on a 48 V pack at the same charge and load: the larger the drop, the higher the internal resistance.</>}>
          <BarChart
            items={[
              { label: "Good pack: 52.0 → 49.0 V", value: 3, display: "3.0 V sag ≈ 0.20 Ω" },
              { label: "Worn pack: 52.0 → 45.0 V", value: 7, display: "7.0 V sag ≈ 0.47 Ω", highlight: true },
            ]}
          />
        </Figure>
        <KeyIdea title="Compare the pack with itself">
          There is no universal pass mark for sag, because motor current and pack size vary so much. The useful
          test is a repeat: do the same hill, at the same charge, every few months. When the sag grows by a
          couple of volts and range falls with it, the cells are wearing out. A sudden big jump usually means
          one cell group has failed.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={4} id="self-discharge">Check self-discharge over 48 hours</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Charge the pack fully, unplug it from the charger and the bike, and let it rest for an hour. Write
          down the voltage, then measure again after 24 and 48 hours with the pack stored indoors at room
          temperature. A healthy pack typically loses only a few hundredths of a volt per cell over that
          time, so a 48 V pack might go from 54.3 V to around 54.0 V. A drop of a volt or more points to a
          cell group with a soft internal short, or a BMS that drains the pack. Either is a reason to stop
          storing that pack indoors and have it inspected.
        </p>
        <p className="text-muted leading-7">
          This is the same idea as hunting a{" "}
          <Link href="/multimeters/how-to-measure-parasitic-battery-drain" className={link}>
            parasitic battery drain
          </Link>{" "}
          on a car, except the drain is inside the pack where you can&apos;t put an ammeter in series.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="bms-cutoff">If the terminals read zero: check for BMS cutoff</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Every ebike pack has a battery management system (BMS) that disconnects the output when a cell group
          drops too low (somewhere around 2.5 to 3.0 V per cell, depending on the board), when a cell is
          overcharged, or when current is too high. When it trips, the discharge terminals read 0 V or a few
          volts even though the cells inside still hold charge. An overcurrent trip on a hard launch looks like
          the power cutting out and returning after you switch the pack off and on.
        </p>
        <p className="text-muted leading-7 mb-4">
          Connecting the correct charger for a few minutes often resets an undervoltage trip, after which the
          terminals show the real pack voltage again. If the pack reads a normal voltage at rest but cuts out
          under load, the BMS is usually reacting to one weak group sagging below its limit, which takes you
          back to the load test. Our guide to{" "}
          <Link href="/multimeters/how-to-test-a-battery-protection-circuit-with-a-multimeter" className={link}>
            testing a battery protection circuit
          </Link>{" "}
          explains the cell side versus output side readings, and if the charger won&apos;t revive it, work
          through{" "}
          <Link href="/multimeters/why-is-my-ebike-battery-not-charging" className={link}>
            why an ebike battery is not charging
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="symptoms" className="text-xl font-semibold mb-3">Ebike battery symptoms, likely causes and fixes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Range much shorter than when new", "Aged cells, lost capacity", "Full-charge voltage normal, sag larger than before", "Replace pack, or have the cells rebuilt by a pack builder"],
            ["Cuts out on hills, works on flat", "High internal resistance or weak group", "MIN reading under load near controller cutoff", "Ride gentler at low charge; plan a replacement"],
            ["Reads 0 V at terminals", "BMS cutoff (undervoltage or fault)", "Charge briefly, re-measure terminals", "If no recovery, dealer or pack specialist"],
            ["Full charge reads well below table value", "Charger stopping early, or a dead cell group", "Measure charger output; compare with label", "Replace charger, or pack service"],
            ["Loses volts while stored", "Soft-shorted cell group or BMS drain", "48-hour self-discharge check", "Stop storing indoors; dealer inspection"],
            ["Swollen, hot or smelly case", "Damaged cells", "Visual and touch only, no probing", "Isolate outdoors, recycle; 911 if smoking"],
          ]}
        />
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter to use for ebike batteries</h2>
        <p className="text-muted leading-7 mb-4">
          Any meter that reads DC volts to 60 V with a decent resolution will do the resting checks. A
          6,000-count meter typically shows a 48 V pack to two decimal places on its 60 V range, which is enough to see
          the small changes in a self-discharge test. For the sag test, MIN MAX recording is the feature that
          matters, because you can&apos;t safely read a display mid-climb. Hobbyists who already work on a{" "}
          <Link href="/multimeters/how-to-check-a-12v-leisure-battery-with-a-multimeter" className={link}>
            12 V leisure battery
          </Link>{" "}
          will find the method familiar; the voltages are just four times higher. To measure amp-hours
          rather than health, see{" "}
          <Link href="/multimeters/how-to-test-lithium-battery-capacity-with-a-multimeter" className={link}>
            how to test lithium battery capacity
          </Link>
          . For the rest of the drive
          system, see{" "}
          <Link href="/multimeters/how-to-test-an-ebike-hub-motor-with-a-multimeter" className={link}>
            how to test an electric bike hub motor
          </Link>
          .
        </p>
        <ProductStrip
          title="Meters that suit ebike battery work"
          items={[
            {
              name: "Fluke 17B+",
              image: fluke17b.image,
              alt: "Fluke 17B+ digital multimeter",
              href: "/multimeters/fluke-17b-plus-review",
              note: "MIN MAX and relative mode, CAT III 600V, 4,000-count. MIN MAX catches the lowest voltage on a hill climb.",
            },
            {
              name: "Brymen BM235",
              image: brymen.image,
              alt: "Brymen BM235 True RMS digital multimeter",
              href: "/multimeters/brymen-bm235-vs-fluke-115",
              note: "Max/Min/Avg recording and a 6,000-count display, CAT III 600V / CAT IV 300V.",
            },
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 True RMS digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "6,000-count backlit display and CAT III 600V for clear resting and self-discharge readings.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
