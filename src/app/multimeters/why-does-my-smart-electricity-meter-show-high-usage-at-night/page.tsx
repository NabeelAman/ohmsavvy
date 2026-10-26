import Link from "next/link";
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
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const description =
  "Smart meter showing high usage at night? Read interval data, spot standby loads, water heating, HVAC and EV schedules, and find the circuit breaker by breaker.";

export const metadata = buildMetadata({
  title: "Why Does My Smart Meter Show High Usage at Night?",
  description,
  path: "/multimeters/why-does-my-smart-electricity-meter-show-high-usage-at-night",
});

const all = getAllPicks("multimeters");
const sc480 = all.find((p) => p.name === "Fieldpiece SC480")!;
const cl445 = all.find((p) => p.name === "Klein Tools CL445")!;
const fluke323 = all.find((p) => p.name === "Fluke 323")!;

const link = "text-accent hover:underline";

/** How a night-time interval reading splits into a flat baseload plus scheduled and cycling loads. */
function NightLoadStackDiagram() {
  const hours = ["11p", "12a", "1a", "2a", "3a", "4a", "5a", "6a"];
  const base = [0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35];
  const cycling = [0.25, 0.1, 0.3, 0.1, 0.3, 0.1, 0.3, 0.25];
  const scheduled = [0, 0, 2.6, 2.6, 0, 0, 0, 0];
  const L = 40;
  const B = 140;
  const scale = 34;
  const w = 30;
  const gap = 6;
  return (
    <svg viewBox="0 0 340 185" className="w-full h-auto" role="img" aria-label="Stacked bar diagram of hourly overnight electricity use split into a constant baseload, cycling appliances such as a fridge or furnace fan, and a scheduled load such as a water heater or EV charger running at 1 to 3 a.m.">
      <line x1={L} y1={B} x2={330} y2={B} className="stroke-foreground" strokeWidth="1.2" />
      <line x1={L} y1={20} x2={L} y2={B} className="stroke-foreground" strokeWidth="1.2" />
      {[0, 1, 2, 3].map((k) => (
        <text key={k} x={L - 6} y={B - k * scale + 3} fontSize="9" textAnchor="end" className="fill-muted">
          {k}
        </text>
      ))}
      <text x={12} y={80} fontSize="9" className="fill-muted" transform="rotate(-90 12 80)" textAnchor="middle">kWh per hour</text>
      {hours.map((h, i) => {
        const x = L + 8 + i * (w + gap);
        const hb = base[i] * scale;
        const hc = cycling[i] * scale;
        const hs = scheduled[i] * scale;
        return (
          <g key={h}>
            <rect x={x} y={B - hb} width={w} height={hb} className="fill-muted" opacity="0.55" />
            <rect x={x} y={B - hb - hc} width={w} height={hc} className="fill-accent" opacity="0.45" />
            {hs > 0 && <rect x={x} y={B - hb - hc - hs} width={w} height={hs} className="fill-accent" />}
            <text x={x + w / 2} y={B + 12} fontSize="9" textAnchor="middle" className="fill-muted">{h}</text>
          </g>
        );
      })}
      <g fontSize="9">
        <rect x={60} y={160} width={9} height={9} className="fill-muted" opacity="0.55" />
        <text x={73} y={168} className="fill-foreground">always-on</text>
        <rect x={135} y={160} width={9} height={9} className="fill-accent" opacity="0.45" />
        <text x={148} y={168} className="fill-foreground">cycling</text>
        <rect x={200} y={160} width={9} height={9} className="fill-accent" />
        <text x={213} y={168} className="fill-foreground">scheduled block</text>
      </g>
    </svg>
  );
}

export default function WhyDoesMySmartElectricityMeterShowHighUsageAtNightPage() {
  return (
    <HowToShell
      title="Why Does My Smart Electricity Meter Show High Usage at Night?"
      description={description}
      path="/multimeters/why-does-my-smart-electricity-meter-show-high-usage-at-night"
      category="multimeters"
      published="2026-10-25"
      intro={
        <>
          A smart electricity meter that shows high usage at night is almost always telling the truth: something
          in the house is drawing power while everyone sleeps. The usual suspects are a larger-than-expected
          always-on baseload, a water heater or storage heater on a night tariff, heating or cooling that works
          harder after dark, and an EV, pool pump or home battery scheduled into cheap overnight hours. Less often
          the culprit is a failing appliance, a wiring fault, or a misread of the data itself. This guide shows
          how to read the interval data, separate scheduled loads from mystery ones, and track the load down
          one breaker at a time without opening anything.
        </>
      }
      aside={{
        image: sc480.image,
        alt: "Fieldpiece SC480 clamp meter that measures watts",
        caption: (
          <>
            A clamp meter that reads watts, used on a cord through a line splitter, tells you what one appliance
            really costs to run. Background:{" "}
            <Link href="/multimeters/clamp-meter-buying-guide" className={link}>
              clamp meter buying guide
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "read-the-data", label: "Read the interval data first" },
        { id: "causes", label: "Symptoms and likely causes" },
        { id: "usual-loads", label: "The loads that run at night" },
        { id: "breaker-hunt", label: "Find the load one breaker at a time" },
        { id: "measure-appliances", label: "Measure single appliances" },
        { id: "who-to-call", label: "When to call the utility or an electrician" },
      ]}
      faq={[
        {
          q: "How much overnight usage is normal for a house?",
          a: "There is no single figure. A home with a modern fridge, a router and a few chargers may idle at a couple of hundred watts, while one with a well pump, aquarium, gaming PC, second freezer or electric heating can sit well above 1 kW all night. Compare your own quiet-hour baseline over several weeks rather than a neighbor's number, and investigate when it jumps without an obvious reason.",
        },
        {
          q: "Could the smart meter itself be faulty?",
          a: "It is possible but uncommon, and it is the utility's equipment, so never open, unplug or tamper with it. If every breaker in the panel is off, including the main, and the meter display or pulse light still shows consumption, report it to the utility. They can test or swap the meter and check for a problem on the service side.",
        },
        {
          q: "My usage spikes at exactly the same time every night. What does that mean?",
          a: "A spike that starts on the same minute each night is a timer or schedule, not a fault: a water heater on an off-peak relay, an EV or home battery charging window, a pool pump, a dishwasher on delay start, or a heat pump's programmed setback ending. Check app schedules and timers before you go hunting with a meter.",
        },
        {
          q: "Will a plug-in energy monitor find the problem?",
          a: "Only for things that plug into a standard outlet. It is ideal for confirming a dehumidifier, freezer, space heater or entertainment system, but it cannot see hardwired loads such as a water heater, furnace, heat pump or well pump. For those, use the breaker-by-breaker method or have an electrician install a whole-home monitor.",
        },
        {
          q: "Can a wiring fault or leaking appliance raise my overnight usage?",
          a: "It can, but rarely by much before it becomes dangerous. Current leaking to ground inside the home still passes through the meter and is billed, yet a leak large enough to show on the bill often trips a GFCI, warms a cable or gives a tingle from a metal case. If you notice any of those, stop investigating and have an electrician test the circuits with proper equipment.",
        },
      ]}
      next={[
        {
          href: "/multimeters/why-does-my-home-battery-lose-charge-overnight-even-when-nothing-is-running",
          title: "Why Does My Home Battery Lose Charge Overnight?",
          desc: "Standby loads, inverter self-use and monitoring errors on a home battery.",
        },
        {
          href: "/multimeters/why-does-my-heat-pump-use-too-much-electricity-in-cold-weather",
          title: "Why Does My Heat Pump Use Too Much Electricity in Cold Weather?",
          desc: "Falling efficiency, backup strip heat and defrost cycles on cold nights.",
        },
      ]}
    >
      <Callout title="Keep the investigation on the outside of the panel and the meter">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Switching breaker handles and reading displays is fine. Never remove the panel&apos;s dead-front
            cover, never open or pull the utility meter, and never break the meter seal. Meter and service-side
            problems belong to the utility; anything inside the panel belongs to a licensed electrician.
          </li>
          <li>
            If you find a warm breaker, a buzzing panel, a burning smell or discolored outlets while you search,
            stop, switch off the main if you can reach it safely, and call an electrician. For smoke or fire, get
            everyone out and call 911.
          </li>
          <li>
            Before you switch circuits off, think about medical equipment, sump pumps during heavy rain, freezers
            and anything that needs a controlled shutdown, such as a computer or a home server.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="read-the-data" className="text-xl font-semibold mb-3">Read the interval data first</h2>
        <p className="text-muted leading-7 mb-4">
          Most smart meters record consumption in fixed intervals, commonly 15, 30 or 60 minutes, and the
          utility shows those blocks in its online account or app. Download a few days of that data rather than
          staring at a single monthly bill. A kWh figure per interval converts easily into average power: 0.5 kWh
          in a 30-minute block means the house averaged 1 kW for that half hour, and 0.25 kWh in a 15-minute
          block works out to the same 1 kW. Doing that conversion for the quietest hours, usually between 2 and 5
          a.m., gives you the home&apos;s baseload.
        </p>
        <p className="text-muted leading-7 mb-4">
          Then look at the shape. A flat, raised floor across the whole night means something runs continuously.
          A tall block that starts and stops on the clock means a schedule. A sawtooth of short peaks every half
          hour or so is a thermostat-controlled appliance cycling on and off. Each pattern points to a different
          group of loads, which saves a lot of guesswork later.
        </p>
        <p className="text-muted leading-7 mb-4">
          Rule out data quirks too. Some portals display intervals in standard time year-round, so a load that
          really starts at 1 a.m. may appear at midnight or 2 a.m. after a daylight-saving change. Homes with
          solar or a battery often have separate import and export channels, and reading the wrong one makes
          normal night import look strange. Estimated reads, marked as such on many portals, can also produce
          odd blocks that later correct themselves.
        </p>
        <Figure caption={<>Illustrative overnight profile: a steady always-on floor, cycling appliances on top, and a scheduled two-hour block. Your utility&apos;s interval chart usually shows the same three ingredients.</>}>
          <NightLoadStackDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and likely causes</h2>
        <DataTable
          head={["Symptom in the data", "Likely cause", "What to check", "Who should fix it"]}
          rows={[
            ["Flat raised floor all night", "Always-on loads: freezers, pumps, servers, aquariums, heaters left on", "Breaker-by-breaker hunt; plug-in monitor on suspects", "Owner"],
            ["Large block starting on the hour", "Water heater, EV, pool pump or battery on an off-peak schedule", "Timers, tariff relay, charger and battery app schedules", "Owner; installer for relay or battery settings"],
            ["Usage climbs on cold or hot nights", "Heat pump, backup strip heat, furnace fan, AC or dehumidifier", "Thermostat schedule and auxiliary-heat indicator", "Owner; HVAC technician"],
            ["New jump with no change in habits", "Failing appliance: stuck element, short-cycling compressor, worn well pump", "Which circuit holds the extra load", "Appliance service; electrician for wiring"],
            ["Consumption with every breaker off", "Meter or service-side issue, or an unlabeled feed", "Meter display with the main off", "Utility"],
            ["Night import on a solar home", "Normal: panels produce nothing after dark", "Import vs export channels in the portal", "No fix needed"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Work down the table in order. The first two rows explain the large majority of high night-time readings,
          and checking them takes nothing more than an app and a walk around the house.
        </p>
      </section>

      <section>
        <h2 id="usual-loads" className="text-xl font-semibold mb-3">The loads that run at night</h2>
        <p className="text-muted leading-7 mb-4">
          <span className="text-foreground">Phantom and always-on loads.</span> Televisions in standby, set-top
          boxes, game consoles that stay network-connected, desktop computers that never sleep, smart speakers,
          security cameras, doorbells and networking gear each take a little, and together they can add a few
          hundred watts. A second fridge or chest freezer in a hot garage, a hot tub keeping its water warm, a
          dehumidifier in the basement and a well or circulation pump are bigger contributors that people forget
          are running.
        </p>
        <p className="text-muted leading-7 mb-4">
          <span className="text-foreground">Water heating.</span> An electric tank water heater recovers after
          evening showers and the dishwasher, often well into the night. On some US utility programs and on many
          European night-rate tariffs, a relay or timer deliberately runs the water heater or electric storage
          heaters off-peak, which shows up as a big block in exactly the hours you are looking at. That is the
          tariff working as designed. A tank whose element runs far longer than it used to may have sediment, a
          failed thermostat or a leak on the hot side, all jobs for a plumber or appliance technician.
        </p>
        <p className="text-muted leading-7 mb-4">
          <span className="text-foreground">Heating and cooling.</span> A heat pump works hardest on the coldest
          hours before dawn, and if it calls for electric backup heat the draw multiplies. Programmed setbacks that
          end at 5 a.m. trigger a recovery surge. In summer, an air conditioner or dehumidifier may run all night
          in a humid climate.
        </p>
        <p className="text-muted leading-7">
          <span className="text-foreground">Scheduled big loads.</span> An EV set to charge after midnight, a pool
          pump timer, a dishwasher or washer on delayed start, and a home battery that tops up from the grid on a
          cheap overnight rate all land in night intervals. A Level 2 charger alone can account for several kWh
          per hour, so one forgotten charging schedule outweighs every phantom load in the house combined.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="breaker-hunt">Find the load one breaker at a time</StepHeading>
        <p className="text-muted leading-7 mb-4">
          You need a live view of total consumption. Many smart meters show instantaneous demand on their display
          or blink a test LED once per unit of energy; the faceplate states the pulse constant, so faster blinking
          means more power. A utility app with near-real-time data, an in-home display supplied by the utility or a
          whole-home monitor works too. Then, at night or whenever the unexplained load is present:
        </p>
        <ol className="space-y-2 list-decimal pl-5 text-muted leading-7 mb-4">
          <li>
            Note the baseline reading with the house as it normally sits overnight. Wait a minute so cycling
            appliances don&apos;t confuse you.
          </li>
          <li>
            Switch off one branch-circuit breaker by its handle, wait 30 to 60 seconds, and write down the new
            reading. Switch it back on before trying the next one, unless you want to see cumulative drops.
          </li>
          <li>
            Start with the double-pole (240 V) breakers for the water heater, HVAC, dryer, range and any EV
            circuit, since those can draw the most. Then work through the single-pole circuits.
          </li>
          <li>
            When a breaker produces a large drop, walk that circuit and unplug items one by one with the breaker
            back on, or move to a plug-in monitor to confirm which device is responsible.
          </li>
        </ol>
        <p className="text-muted leading-7">
          Keep the panel door open only while you work, touch nothing but the breaker handles, and don&apos;t
          flip breakers with wet hands or while standing on a wet floor. If a breaker is hot to the touch or the
          labels are missing so you can&apos;t tell what feeds what, stop and get an electrician to map and inspect
          the panel. An AFCI or GFCI breaker may need its own reset sequence when switched back on; the label on
          the breaker or the{" "}
          <Link href="/multimeters/why-does-my-afci-breaker-keep-tripping-with-no-obvious-cause" className={link}>
            AFCI troubleshooting guide
          </Link>{" "}
          covers what to expect.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="measure-appliances">Measure single appliances</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Once the circuit is known, measure the suspect appliance directly. A plug-in energy monitor is the
          simplest option for 120 V plug-in loads and records kWh over a whole night. A clamp meter gives an
          instant reading but must go around a single conductor, so for a cord-connected appliance use a line
          splitter between the plug and the outlet and clamp the splitter&apos;s loop, never a two-wire cord. For
          the technique, see{" "}
          <Link href="/multimeters/how-to-measure-ac-current-with-a-clamp-meter" className={link}>
            how to measure AC current with a clamp meter
          </Link>
          .
        </p>
        <p className="text-muted leading-7 mb-4">
          Multiplying amps by roughly 120 V gives apparent power in VA, which overstates the real watts for motors
          and electronics with a poor power factor. A clamp that measures true power removes that error. As a
          sanity check, an appliance drawing 1.5 A at 120 V for eight hours uses somewhere near 1.4 kWh at most,
          less if its power factor is below one.
        </p>
        <Figure caption={<>Example: a basement dehumidifier clamped through a line splitter. Current alone (left) suggests about 600 VA; a watts reading (right) shows the real draw the meter bills.</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="4.92" unit="A~" mode="A AC  splitter loop" />
            <MeterReadout value="548" unit="W" mode="Active power" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Small electronics draw too little for most clamp meters to resolve accurately, so for routers, chargers
          and standby gear a plug-in monitor is the better tool; the method in{" "}
          <Link href="/multimeters/how-to-measure-standby-current-in-an-electronic-device" className={link}>
            measuring standby current
          </Link>{" "}
          applies to bench-level work. Hardwired loads such as water heaters, well pumps and heat pumps are not
          for clamping at the panel or inside the unit by a homeowner; a whole-home monitor with sensors fitted
          inside the panel by an electrician, or the equipment&apos;s own energy reporting, is the safe route.
        </p>
        <Figure caption={<>Rough night-time energy for some common culprits over eight hours. Real figures vary widely with model, settings and climate; measure your own.</>}>
          <BarChart
            items={[
              { label: "Router + standby gear", value: 0.4, display: "~0.4 kWh" },
              { label: "Old second fridge", value: 1.2, display: "~1.2 kWh" },
              { label: "Dehumidifier", value: 4, display: "~4 kWh" },
              { label: "Electric water heater recovery", value: 9, display: "~9 kWh" },
              { label: "Level 2 EV, 3 hours", value: 21, display: "~21 kWh", highlight: true },
            ]}
          />
        </Figure>
      </section>

      <section id="who-to-call">
        <KeyIdea title="When to call the utility, an electrician or a technician">
          Call the utility if the meter records consumption with the main breaker off, if the night usage jump
          coincides with a meter exchange, or if voltage problems appear alongside it; the meter and service drop
          are theirs. Book a licensed electrician if one circuit draws power with everything on it unplugged,
          which can mean a fault or an unknown hardwired load, or if you find heat or damage at the panel. An HVAC
          technician should look at a heat pump that leans on backup heat all night, and a plumber or appliance
          tech at a water heater that runs far longer than it used to. For EV schedules, see{" "}
          <Link href="/multimeters/why-does-my-ev-charge-slowly-at-home-even-with-a-level-2-charger" className={link}>
            why an EV charges slowly on Level 2
          </Link>
          ; for wiring symptoms, see{" "}
          <Link href="/multimeters/how-to-check-for-voltage-fluctuations-in-your-home" className={link}>
            checking for voltage fluctuations
          </Link>
          .
        </KeyIdea>
      </section>

      <section>
        <ProductStrip
          title="Clamp meters for checking appliance draw"
          items={[
            {
              name: "Fieldpiece SC480",
              image: sc480.image,
              alt: "Fieldpiece SC480 clamp meter",
              href: "/multimeters/best-multimeter-for-hvac-technicians#fieldpiece-sc480",
              note: "Measures active power (W), VA and power factor as well as AC current. CAT IV 600V / CAT III 1000V.",
            },
            {
              name: "Klein Tools CL445",
              image: cl445.image,
              alt: "Klein Tools CL445 clamp meter",
              href: "/multimeters/best-multimeter-for-hvac-technicians#klein-tools-cl445",
              note: "600 A AC clamp with inrush and simultaneous volts and amps on a backlit display. CAT IV 600V.",
            },
            {
              name: "Fluke 323",
              image: fluke323.image,
              alt: "Fluke 323 clamp meter",
              href: "/multimeters/fluke-117-vs-fluke-323",
              note: "Compact True RMS AC clamp to 400A for quick amp checks through a line splitter. CAT III 600V / CAT IV 300V.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
