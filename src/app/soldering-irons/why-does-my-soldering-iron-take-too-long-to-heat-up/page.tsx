import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const description =
  "Why does my soldering iron take too long to heat up? Compare against the maker's figure, then check the supply, tip, element type, settings and the element itself.";

export const metadata = buildMetadata({
  title: "Why Is My Soldering Iron Slow to Heat Up?",
  description,
  path: "/soldering-irons/why-does-my-soldering-iron-take-too-long-to-heat-up",
});

const all = getAllPicks("soldering-irons");
const pick = (name: string) => all.find((p) => p.name === name)!;
const spec = (name: string, label: string) => pick(name).specs.find((s) => s.label === label)!.value;
const heatUp = (name: string) => spec(name, "Heat-up time");
const pinecil = pick("Pinecil V2");
const qming = pick("Q-MING 60W Kit");
const weller = pick("Weller WE1010NA");

// Heat-up figures as each maker or official listing states them (see the Pick data);
// the bars show the stated seconds; the table under the chart gives each full
// stated figure with its conditions, read straight from the Pick.
const STATED = [
  { name: "Pinecil V2", seconds: 12, short: "~12 s" },
  { name: "Q-MING 60W Kit", seconds: 15, short: "~15 s" },
  { name: "Weller WE1010NA", seconds: 28, short: "~28 s" },
  { name: "X-Tronic 3020-XTS", seconds: 30, short: "under 30 s" },
];

// Illustrative energy budget: an iron that reaches temperature in 12 s on 60 W
// has taken in at most 60 × 12 = 720 J. Idealized time = 720 J ÷ supply power.
const BUDGET_J = 720;
const SUPPLIES = [
  { label: "20 V × 3 A", watts: 60 },
  { label: "15 V × 3 A", watts: 45 },
  { label: "9 V × 3 A", watts: 27 },
  { label: "5 V × 3 A", watts: 15 },
];

const link = "text-accent hover:underline";

/** Heat path from supply to joint, with the three places heat-up time is usually lost. */
function HeatPathDiagram() {
  return (
    <svg
      viewBox="0 0 340 150"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram of a soldering iron's heat path: the supply feeds the handle and the heating element with its temperature sensor, which heats the tip. Three weak points are marked: a supply that offers too little voltage or power, a tip that is not seated on the element, and an oxidized tip end that solder will not wet."
    >
      <text x="170" y="18" fontSize="10" textAnchor="middle" className="fill-foreground">Heat flows supply → element → tip → joint</text>
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        <rect x="8" y="58" width="56" height="34" rx="4" className="fill-surface" />
        <path d="M64 75 H96" />
        <rect x="96" y="60" width="70" height="30" rx="10" className="fill-surface" />
        <path d="M250 63 L312 72 L328 75 L312 78 L250 87 Z" className="fill-surface" />
      </g>
      <rect x="166" y="64" width="84" height="22" rx="3" className="fill-surface stroke-accent" strokeWidth="1.8" />
      <g fontSize="10" textAnchor="middle" className="fill-foreground">
        <text x="36" y="79">Supply</text>
        <text x="131" y="79">handle</text>
        <text x="208" y="79" fontSize="9" className="fill-accent">element</text>
      </g>
      <text x="208" y="54" fontSize="9" textAnchor="middle" className="fill-muted">element + sensor</text>
      <text x="290" y="54" fontSize="9" textAnchor="middle" className="fill-muted">tip</text>
      {[
        [80, "1"],
        [250, "2"],
        [322, "3"],
      ].map(([x, n]) => (
        <g key={n as string}>
          <circle cx={x as number} cy="100" r="7" className="fill-accent" />
          <text x={x as number} y="103.5" fontSize="9" textAnchor="middle" className="fill-surface">{n}</text>
        </g>
      ))}
      <g fontSize="9.5" className="fill-muted">
        <text x="16" y="122">1  supply: too little voltage or power</text>
        <text x="16" y="135">2  tip not seated: heat crosses a gap</text>
        <text x="16" y="148">3  oxidized end: solder won&apos;t wet it</text>
      </g>
    </svg>
  );
}

export default function WhyDoesMySolderingIronTakeTooLongToHeatUpPage() {
  return (
    <HowToShell
      title="Why Does My Soldering Iron Take Too Long to Heat Up?"
      description={description}
      path="/soldering-irons/why-does-my-soldering-iron-take-too-long-to-heat-up"
      category="soldering-irons"
      published="2026-10-25"
      updated="2026-10-25"
      intro={
        <>
          A soldering iron that takes too long to heat up is usually short of power, most often a USB-C or DC
          iron on a charger or cable that can&apos;t supply its full voltage, or it is held back by a loose or
          oxidized tip, a low setpoint, a standby mode, or an element that is starting to fail. Before chasing any
          of those, compare your time with the maker&apos;s stated figure: among the irons we compare, stated
          heat-up times run from about 12 seconds to around half a minute, each measured under its own
          conditions, and some irons are simply slow by design.
        </>
      }
      aside={{
        image: pinecil.image,
        alt: "Pinecil V2 portable soldering iron",
        caption: (
          <>
            Pine64 states a heat-up time for the Pinecil V2 only with a 20V or higher supply. See our{" "}
            <Link href="/soldering-irons/pinecil-v2-review" className={link}>
              Pinecil V2 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "whats-normal", label: "What counts as slow" },
        { id: "quick-reference", label: "Symptoms, causes and fixes" },
        { id: "supply", label: "1. The supply can't deliver full power" },
        { id: "tip", label: "2. A heavy, loose or oxidized tip" },
        { id: "element", label: "3. The element design" },
        { id: "settings", label: "4. Settings that look like slow heating" },
        { id: "failing", label: "5. A failing element or sensor" },
        { id: "irons", label: "Irons with a stated heat-up time" },
      ]}
      faq={[
        {
          q: "How long should a soldering iron take to heat up?",
          a: "Use your own iron's published figure, measured the way the maker measured it. Among the irons in our comparison, stated figures run from about 12 seconds to around half a minute, each measured under its own conditions such as supply voltage and start and end temperature. Several makers, including Hakko for the FX-888DX, don't publish a figure at all, so time yours when it is new.",
        },
        {
          q: "Why does my USB-C iron heat quickly on one charger and slowly on another?",
          a: "The iron can only draw what the charger and cable negotiate. A charger that offers a lower voltage, or a cable that limits current, gives the iron less power, so it heats more slowly and sags more on joints. For a resistive heater, power falls with the square of the voltage, so a modest voltage drop costs a lot of heat. Portable irons often state their fastest time only for one supply.",
        },
        {
          q: "The display says it's at temperature but the tip won't melt solder. Is that slow heating?",
          a: "Usually not. The display reads a sensor behind the end of the tip. If the very end is oxidized or the tip isn't seated properly, the sensor reaches the setpoint while the working surface stays too cool to melt solder. Clean and re-tin the tip and check it is fully seated before suspecting the element, the sensor or the station itself.",
        },
        {
          q: "Does a higher-wattage iron always heat up faster?",
          a: "Not always. Wattage sets how much power is available, but heat-up time also depends on how close the element sits to the tip, how much metal the tip has and how the controller manages power. A 70 W station with a heavy tip can be slower than a 60 W pen-style iron with the element built into the tip. Compare the stated heat-up figures rather than wattage alone.",
        },
        {
          q: "Why did my soldering iron start heating slowly after I changed the tip?",
          a: "Either the new tip is larger, which means more metal to heat and a slower start that is perfectly normal, or it isn't seated fully on the element. A gap between element and tip slows heat transfer badly. Check the manual for how far the tip should go on and how it is secured, and make sure it is a genuine tip made for your iron.",
        },
        {
          q: "Is it better to leave a soldering iron on than wait for it to heat up?",
          a: "For short breaks, a standby or sleep mode is the better compromise: the tip cools enough to slow oxidation, then reheats quickly. Leaving a tip at full temperature for long periods with no solder on it wears it out faster. For longer breaks, switch off. A fast-heating iron makes this decision easy, because the wait is only seconds.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/why-does-my-soldering-iron-temperature-keep-dropping",
          title: "Why Does My Soldering Iron Temperature Keep Dropping?",
          desc: "Heats up fine, then sags on every joint: the recovery problem.",
        },
        {
          href: "/soldering-irons/how-to-test-a-soldering-iron",
          title: "How to Test a Soldering Iron",
          desc: "The unplugged resistance check and a timed heat-up test.",
        },
      ]}
    >
      <section>
        <h2 id="whats-normal" className="text-xl font-semibold mb-3">What counts as slow</h2>
        <p className="text-muted leading-7 mb-4">
          Heat-up time is only meaningful against your own iron&apos;s figure, measured under the same
          conditions. Makers state it differently: some to a working temperature, some over a stated range,
          some only with a particular supply. Here is what the makers of the irons in our comparison state:
        </p>
        <Figure
          caption={
            <>
              Heat-up times as stated by each maker or its official listing, with their conditions. They
              aren&apos;t measured the same way, so treat this as a sense of scale rather than a ranking.
              Hakko, for one, doesn&apos;t publish a figure for the FX-888DX.
            </>
          }
        >
          <BarChart
            items={STATED.map((s) => ({ label: s.name, value: s.seconds, display: s.short, highlight: s.name === "Pinecil V2" }))}
          />
        </Figure>
        <div className="mt-4">
          <DataTable
            head={["Iron", "Heat-up time as stated, with conditions"]}
            rows={STATED.map((s) => [s.name, heatUp(s.name)])}
          />
        </div>
        <p className="text-muted leading-7 mt-4">
          Time your iron from cold with a clock, using the same supply, tip and setpoint each time, and stop
          the clock when solder touched to the tip melts and flows rather than when the display first shows
          the setpoint. If it is close to the maker&apos;s figure, nothing is wrong. If it takes several times
          longer, or noticeably longer than it used to, work through the causes below. Note the time down: a
          baseline from when the iron was new makes later problems obvious.
        </p>
      </section>

      <section>
        <h2 id="quick-reference" className="text-xl font-semibold mb-3">Symptoms, causes and fixes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["USB-C or DC iron slow on one supply only", "Supply gives less voltage or power", "Time it on the maker's recommended supply", "Charger and cable that meet the iron's input rating"],
            ["Slower with a big tip than a small one", "More metal to heat", "Compare times with each tip", "Normal; use the smaller tip when you can"],
            ["Display at setpoint, solder won't melt", "Oxidized or badly seated tip", "Look for a dull, black tip end; check it is fully home", "Clean, re-tin and reseat the tip, or replace it"],
            ["Always slow since new", "Element design", "Compare with the maker's stated figure", "Normal for the design; consider a faster iron"],
            ["Slow only after resting", "Standby or sleep mode", "Delay starts after a fixed idle time", "Change the sleep setting in the manual"],
            ["Got slower over time, or erratic", "Failing element, sensor or cable", "Element ohms with the iron unplugged vs the manual", "Replace the element or handpiece; maker's service"],
          ]}
        />
        <Figure caption={<>Where heat-up time is usually lost. The display reads the sensor beside the element, so problems at points 2 and 3 can leave the number looking right while the tip end is still too cool.</>}>
          <HeatPathDiagram />
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="supply">The supply can&apos;t deliver full power</StepHeading>
        <p className="text-muted leading-7 mb-4">
          This is the most common cause with USB-C and DC-powered irons. They can only draw what the supply
          offers. Pine64 states the Pinecil V2&apos;s heat-up time as &ldquo;{heatUp("Pinecil V2")}&rdquo;,
          so a charger that negotiates a lower voltage gives a slower start. A phone charger, a laptop
          charger that doesn&apos;t offer the higher Power Delivery voltages, or a thin cable can all hold
          an iron back. Try the supply the maker recommends. If the iron is fast on that, the original
          supply was the cause. Our guide to{" "}
          <Link href="/multimeters/usb-c-charger-not-delivering-full-power" className={link}>
            USB-C chargers that don&apos;t deliver full power
          </Link>{" "}
          explains how to check what is actually being supplied.
        </p>
        <p className="text-muted leading-7 mb-4">
          Voltage matters more than it looks. A heating element is a resistor, and a resistor driven flat out
          turns P = V² ÷ R into heat, so its power scales with the square of the voltage. Pine64&apos;s own
          figures fit that rule: it rates the Pinecil V2 at &ldquo;{spec("Pinecil V2", "Power")}&rdquo;, and
          (20 ÷ 24)² × 88 ≈ 61 W. The same rule says halving the voltage leaves a quarter of the power.
        </p>
        <p className="text-muted leading-7 mb-4">
          Heat-up time then stretches roughly in proportion. Take an illustrative iron that reaches working
          temperature in 12 seconds on a 60 W supply: it has taken in at most 60 × 12 = 720 J. Divide that same
          energy by a smaller supply and the minimum time grows, before counting the extra heat lost to the air
          during the longer wait.
        </p>
        <Figure caption={<>Illustrative only: idealized time to deliver 720 J at each USB-C Power Delivery level (3 A limit), losses ignored. Real irons do worse at low power, and some won&apos;t run at all below their minimum input voltage.</>}>
          <BarChart
            items={SUPPLIES.map((s) => ({
              label: s.label,
              value: BUDGET_J / s.watts,
              display: `≈${Math.round(BUDGET_J / s.watts)} s`,
              highlight: s.watts === 60,
            }))}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={2} id="tip">A heavy, loose or oxidized tip</StepHeading>
        <p className="text-muted leading-7">
          The element has to heat the tip as well as itself, so a large chisel or heavy bent tip takes
          longer to come up to temperature than a fine one on the same iron. That is normal. What isn&apos;t
          normal is a tip that isn&apos;t pushed fully home or held firmly, since heat crosses the joint
          between element and tip poorly when they don&apos;t make good contact. Check the tip is seated as
          the manual describes. An oxidized tip also feels &ldquo;slow&rdquo; even when the iron is at
          temperature, because solder won&apos;t wet it. Cleaning and re-tinning, covered in our{" "}
          <Link href="/soldering-irons/soldering-iron-tip-care" className={link}>
            tip care guide
          </Link>
          , sorts that out. If a tip is badly pitted or the plating is gone, no amount of cleaning will fix it,
          and a replacement tip made for your iron is the cheapest repair there is.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="element">The element design</StepHeading>
        <p className="text-muted leading-7">
          Some irons are simply slow by design. Basic plug-in irons that heat a separate tip from a
          wire-wound element behind it generally take longer to warm up than irons that build the element
          and sensor close to the tip. If your iron has always taken a long time, that is probably its
          design rather than a fault. Our comparison of{" "}
          <Link href="/soldering-irons/ceramic-vs-nichrome-heating-element" className={link}>
            ceramic and nichrome heating elements
          </Link>{" "}
          explains the difference, and{" "}
          <Link href="/soldering-irons/soldering-iron-vs-soldering-station" className={link}>
            soldering iron vs soldering station
          </Link>{" "}
          covers what a station&apos;s controller adds.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="settings">Settings that look like slow heating</StepHeading>
        <p className="text-muted leading-7">
          Before blaming the hardware, check the setpoint. An iron set lower than you think, or set in
          Fahrenheit when you meant Celsius, will reach its target and then not melt solder properly: 350°F is
          only about 177°C, below the roughly 183°C at which 63/37 tin-lead solder melts, while 350°C is a
          common working setpoint. On irons with a sleep or standby mode, picking the iron up after it has
          dropped to standby means waiting for it to climb back, which can feel like a slow start. Some stations
          also offer a boost or power setting worth checking in the manual. For setpoints by job, see{" "}
          <Link href="/soldering-irons/soldering-iron-temperature-by-metal" className={link}>
            soldering iron temperature by metal
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={5} id="failing">A failing element or sensor</StepHeading>
        <p className="text-muted leading-7">
          An iron that used to heat quickly and has gradually slowed down, never reaches the setpoint, or
          heats in fits and starts may have a failing element, sensor or handle cable. With the iron
          unplugged and cool, measure the element&apos;s resistance and compare it with the figure in the
          manual. A reading well above the stated value means less power at the same voltage; OL means an open
          element or broken cable. Flexing the cable gently while you watch the reading catches an intermittent
          break. Our guide to{" "}
          <Link href="/soldering-irons/how-to-test-a-soldering-iron" className={link}>
            testing a soldering iron
          </Link>{" "}
          walks through that check and a timed heat-up test. Replacement elements and handpieces are sold for
          most stations; for anything inside the mains-powered base, use the maker&apos;s service.
        </p>
        <Callout title="Test unplugged, and let it cool">
          A soldering tip runs at several hundred degrees and stays hot enough to burn for minutes after you
          switch off. Only measure an iron&apos;s element with the plug pulled and the tip cool. Stop using any
          iron with a damaged cable or cracked handle rather than testing it powered, and don&apos;t open a
          mains-powered station base yourself.
        </Callout>
        <KeyIdea title="Same iron, different supply, different iron">
          For a portable iron, the supply is part of the tool. Most &ldquo;slow iron&rdquo; complaints about
          USB-C irons disappear on a charger that offers the voltage the maker quotes.
        </KeyIdea>
      </section>

      <section>
        <h2 id="irons" className="text-xl font-semibold mb-3">Irons with a stated heat-up time</h2>
        <p className="text-muted leading-7 mb-4">
          If yours is slow by design, a faster iron is the fix. These picks from our verified soldering iron
          list all have a heat-up figure published by the maker or on the official listing; the cards quote it
          as stated.
        </p>
        <ProductStrip
          title="Irons with published heat-up figures"
          items={[
            {
              name: "Pinecil V2",
              image: pinecil.image,
              alt: "Pinecil V2 portable USB-C soldering iron",
              href: "/soldering-irons/pinecil-v2-review",
              note: `Stated heat-up: ${heatUp("Pinecil V2")}. Power: ${spec("Pinecil V2", "Power")}.`,
            },
            {
              name: "Q-MING 60W Kit",
              image: qming.image,
              alt: "Q-MING 60W soldering iron kit",
              href: "/soldering-irons/q-ming-60w-soldering-iron-kit-review",
              note: `Stated heat-up: ${heatUp("Q-MING 60W Kit")}. ${spec("Q-MING 60W Kit", "Temperature control")}, no digital readout.`,
            },
            {
              name: "Weller WE1010NA",
              image: weller.image,
              alt: "Weller WE1010NA soldering station",
              href: "/soldering-irons/weller-we1010na-review",
              note: `Stated heat-up: ${heatUp("Weller WE1010NA")}. 70W digital, ESD-safe bench station.`,
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
