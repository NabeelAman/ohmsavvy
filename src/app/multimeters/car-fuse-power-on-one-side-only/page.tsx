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
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const description =
  "Why does a car fuse have power on one side only? Test each side to ground to tell a blown fuse from a switched, relay-fed or unloaded circuit.";

export const metadata = buildMetadata({
  title: "Car Fuse Has Power on One Side Only?",
  description,
  path: "/multimeters/car-fuse-power-on-one-side-only",
});

const all = getAllPicks("multimeters");
const astro = all.find((p) => p.name === "AstroAI DM6000AR")!;
const dm300 = all.find((p) => p.name === "Power Probe DM300AUTO")!;
const ht118a = all.find((p) => p.name === "KAIWEETS HT118A")!;
const craftsman = all.find((p) => p.name === "Craftsman CMMT14171")!;

const link = "text-accent hover:underline";

export default function CarFusePowerOnOneSideOnlyPage() {
  return (
    <HowToShell
      title="Why Does My Car Fuse Have Power on One Side Only? How to Test It"
      description={description}
      path="/multimeters/car-fuse-power-on-one-side-only"
      category="multimeters"
      published="2026-10-24"
      updated="2026-10-25"
      intro={
        <>
          A car fuse with power on one side only is usually blown: the supply tab still sees battery voltage,
          but the melted element stops it reaching the load tab. The exception is a fuse whose load is
          switched off, which can leave a few stray volts or nothing at all on the dead side, so you confirm
          with the circuit switched on and a continuity check. This guide shows how to read each tab to ground,
          how to tell a blown fuse from an ignition-switched or relay-fed one, and what to do when the fuse
          turns out to be fine.
        </>
      }
      aside={{
        image: astro.image,
        alt: "AstroAI DM6000AR digital multimeter",
        caption: (
          <>
            Any meter with a DC volts range will do this check, as will a simple test light. See our{" "}
            <Link href="/multimeters/astroai-dm6000ar-review" className={link}>
              AstroAI DM6000AR review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "causes", label: "Causes at a glance" },
        { id: "what-each-side-means", label: "What each side of a fuse is" },
        { id: "verify-ground", label: "Verify your ground first" },
        { id: "probe-each-side", label: "Probe each side to ground" },
        { id: "confirm-open", label: "Confirm the fuse is open" },
        { id: "switched-and-relay-fed", label: "Ignition-switched and relay-fed fuses" },
        { id: "results-table", label: "What the readings mean" },
        { id: "fuse-numbers", label: "Fuse ratings and the numbers" },
        { id: "both-sides-live", label: "Both sides live, circuit still dead" },
        { id: "meters", label: "Meters for this job" },
      ]}
      faq={[
        {
          q: "If only one side of the fuse has power, is the fuse definitely blown?",
          a: "Only if the side with power is the supply side and the circuit is switched on. If power appears on the input tab and nothing on the output tab, the element is open and the fuse needs replacing. Confirm by pulling it and checking continuity before you buy parts, and look for the short that blew it.",
        },
        {
          q: "Why do some fuses have no power on either side with the key off?",
          a: "Many fuses are fed through the ignition switch or a relay, so their supply bus is dead until the key is in run or accessory, or until the module energizes the relay. Check the fuse box lid or the wiring diagram to see which fuses are always hot and which are switched before assuming anything has failed.",
        },
        {
          q: "Can a test light give a different answer than a multimeter on a fuse?",
          a: "Yes. A meter has very high input impedance, so it can show voltage through a corroded or nearly open connection that cannot carry real current. A test light draws a small current, so a weak feed may make it glow dimly or not at all. If the two disagree, suspect a high-resistance connection upstream of the fuse.",
        },
        {
          q: "Why did the new fuse blow as soon as I put it in?",
          a: "A replacement fuse that opens immediately, or as soon as a switch is turned on, points to a short to ground somewhere downstream, such as a chafed wire, a failed motor or a water-damaged connector. Never fit a higher-rated fuse to stop it blowing; that moves the weak point to the wiring. Find the short instead.",
        },
        {
          q: "Why does the dead side of a blown fuse show a few volts on my meter?",
          a: "With the load switched off, nothing holds the load side firmly at ground, so the meter's 10 MΩ input picks up leakage through modules, indicator bulbs or moisture and shows a few volts that wander. It is not usable power. Switch the load on, or load the tab with a test light, and the reading should drop to zero.",
        },
        {
          q: "Can a fuse look fine but still be blown?",
          a: "Yes. Blade fuses sometimes crack at the leg where it joins the element, or open inside a cloudy housing you cannot see through, so a visual check is not proof. Mini and low-profile fuses are especially hard to read by eye. Use the test points or a continuity check: an intact fuse beeps and reads close to 0 Ω, a blown one reads OL.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-fuse-without-removing-it",
          title: "How to Test a Fuse Without Removing It",
          desc: "Measure across the fuse itself instead of to ground, with the load running.",
        },
        {
          href: "/multimeters/how-to-test-an-automotive-relay-with-a-multimeter",
          title: "How to Test an Automotive Relay",
          desc: "When the fuse is dead on both sides because the relay feeding it never closes.",
        },
        {
          href: "/multimeters/why-does-my-car-keep-blowing-fuses",
          title: "Why Does My Car Keep Blowing Fuses?",
          desc: "Tracking down the short once you know the fuse is open.",
        },
      ]}
    >
      <Callout title="Before you probe the fuse box">
        Use the meter on DC volts with the red lead in the V jack, never the current jack. Keep metal
        probes from bridging two adjacent fuse tabs, and don&apos;t back-probe airbag circuits (usually
        marked with yellow connectors or labels on the fuse lid): your service manual explains how those
        must be tested. Large fuses and fusible links near the battery carry hundreds of amps; if a main
        fuse or link has blown, or anything in the box smells hot or looks melted, disconnect the battery
        negative and have a mechanic inspect the wiring before you power it up again.
      </Callout>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Causes at a glance</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Supply tab 12 V, load tab 0 V, load switched on", "Blown fuse (open element)", "Pull it and test continuity: OL means open", "Find the short, then fit the same rating"],
            ["Supply tab 12 V, load tab a few volts that wander", "Blown fuse with the load switched off", "Switch the load on or add a test light, then re-read", "As above once confirmed"],
            ["Both tabs 0 V with the key off", "Ignition-switched or relay-fed feed", "Turn the key to run and repeat", "Normal; test again with the circuit active"],
            ["Both tabs 0 V with the key on", "Relay not closing, upstream fuse or fusible link open", "Check the relay and the main fuse feeding the bus", "Relay test; a mechanic for main links"],
            ["Both tabs 12 V, circuit still dead", "Fault downstream: wire, switch, connector or ground", "Back-probe feed and ground at the component", "Voltage drop test along the circuit"],
            ["Meter shows 12 V but a test light stays dim", "High-resistance connection in the feed", "Measure voltage drop on the supply side under load", "Clean or repair the terminal or busbar"],
            ["New fuse blows at once", "Short to ground downstream", "Isolate sections of the circuit one at a time", "Repair the chafed wire or failed component"],
          ]}
        />
      </section>

      <section>
        <h2 id="what-each-side-means" className="text-xl font-semibold mb-3">What each side of a fuse is</h2>
        <p className="text-muted leading-7 mb-4">
          Every fuse sits in series between a supply and a load. One tab connects to the feed, usually a
          busbar inside the fuse box; the other tab connects to the wire running out to the circuit it
          protects. Current enters on the supply side, passes through the thin metal element and leaves on
          the load side. Most modern blade fuses have small test points exposed on top, one per tab, so
          you can probe both without pulling the fuse.
        </p>
        <p className="text-muted leading-7 mb-4">
          When the element is intact, both tabs sit at the same potential, so you read essentially the
          same voltage to ground on each. When it has melted open, the supply tab still reads battery
          voltage, but the load tab is cut off. It reads close to 0 V, because the load connects it to ground.
        </p>
        <Figure
          caption={
            <>
              Measuring each tab to a chassis ground. With an intact fuse, both tabs read supply voltage.
              With an open element, only the supply tab does; the load pulls the other tab to 0 V.
            </>
          }
        >
          <svg viewBox="0 0 320 150" className="w-full h-auto" role="img" aria-label="Diagram showing a fuse between a supply bus and a load, with each fuse tab measured to chassis ground: a good fuse reads 12 volts on both tabs, an open fuse reads 12 volts on the supply tab and 0 volts on the load tab">
            <g className="stroke-foreground" strokeWidth="1.6" fill="none">
              <line x1="20" y1="40" x2="100" y2="40" />
              <rect x="100" y="30" width="60" height="20" rx="3" />
              <line x1="160" y1="40" x2="240" y2="40" />
              <rect x="240" y="28" width="50" height="24" rx="3" />
              <line x1="265" y1="52" x2="265" y2="110" />
              <line x1="250" y1="110" x2="280" y2="110" />
              <line x1="255" y1="115" x2="275" y2="115" />
              <line x1="260" y1="120" x2="270" y2="120" />
            </g>
            <text x="20" y="30" fontSize="10" className="fill-muted">supply</text>
            <text x="130" y="24" fontSize="10" textAnchor="middle" className="fill-foreground">fuse</text>
            <text x="265" y="20" fontSize="10" textAnchor="middle" className="fill-muted">load</text>
            <circle cx="103" cy="40" r="3" className="fill-accent" />
            <circle cx="157" cy="40" r="3" className="fill-accent" />
            <text x="103" y="70" fontSize="10" textAnchor="middle" className="fill-accent">A</text>
            <text x="157" y="70" fontSize="10" textAnchor="middle" className="fill-accent">B</text>
            <text x="20" y="98" fontSize="10" className="fill-foreground">Good fuse: A = 12 V, B = 12 V</text>
            <text x="20" y="116" fontSize="10" className="fill-foreground">Open fuse: A = 12 V, B = 0 V</text>
            <text x="20" y="140" fontSize="10" className="fill-muted">Black lead on chassis ground for both</text>
          </svg>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Why does the dead tab read zero rather than something in between? Because the meter and the load
          form a voltage divider. Suppose the load is a lamp of about 2 Ω and the meter&apos;s input is
          10 MΩ. With the fuse open, whatever tiny voltage leaks onto the load tab is shared between them,
          and the lamp&apos;s 2 Ω is five million times smaller than the meter, so the tab is held within a
          few microvolts of ground. Switch the lamp off and that 2 Ω path disappears; the tab now floats,
          and the meter can show a few volts of leakage that means nothing.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="verify-ground">Verify your ground first</StepHeading>
        <p className="text-muted leading-7">
          A one-sided reading is only meaningful if your reference is solid. Clip the black lead to the
          battery negative post or a known-good chassis ground stud, not a painted bracket. Then touch the
          red probe to the battery positive post: you should see full battery voltage, typically about
          12.6 V on a charged battery with the engine off. With a test light, clip it to ground and touch
          the battery positive; it should light brightly. If it doesn&apos;t, your ground point is the
          problem, and every reading after this would mislead you. Our guide to{" "}
          <Link href="/multimeters/how-to-test-a-car-ground-wire-with-a-multimeter" className={link}>
            testing a car ground wire
          </Link>{" "}
          covers finding a good reference.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="probe-each-side">Probe each side of the fuse to ground</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Turn the key to the position the circuit needs (many circuits only work in run) and switch on the
          component the fuse protects. Touch the red probe to one test point on the fuse, note the reading,
          then the other. You are looking for one of three patterns: both sides at battery voltage, one
          side at battery voltage and the other near zero, or both sides at zero.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 items-center">
          <Figure caption={<>Illustrative reading: supply tab A to ground, key on.</>}>
            <MeterReadout value="12.48" unit="V DC" mode="tab A (supply)" />
          </Figure>
          <Figure caption={<>Illustrative reading: load tab B on the same fuse, load switched on.</>}>
            <MeterReadout value="0.00" unit="V DC" mode="tab B (load)" />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          That pair of readings, full voltage in and nothing out with the load on, is the signature of an
          open fuse. A pair that reads within a few hundredths of a volt of each other, such as 12.48 V and
          12.46 V, means current is passing through the element normally.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="confirm-open">Confirm the fuse is open</StepHeading>
        <p className="text-muted leading-7">
          If one side is live and the other is dead, pull the fuse with the circuit off and look at the
          element, then confirm with a continuity check across its two blades. An intact fuse beeps and
          reads close to 0 Ω (most of what you see is your test leads); a reading of OL confirms the
          element is open. See{" "}
          <Link href="/multimeters/what-does-ol-mean-on-a-multimeter" className={link}>
            what OL means on a multimeter
          </Link>{" "}
          and our general guide to{" "}
          <Link href="/multimeters/how-to-test-a-fuse-with-a-multimeter" className={link}>
            testing a fuse with a multimeter
          </Link>
          . If you prefer to keep the fuse in place, the{" "}
          <Link href="/multimeters/how-to-test-a-fuse-without-removing-it" className={link}>
            across-the-fuse voltage method
          </Link>{" "}
          gives the same answer by reading the difference between the two tabs directly.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="switched-and-relay-fed">Check whether the fuse is ignition-switched or relay-fed</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Not every fuse is hot all the time. If both sides read zero, the fuse may simply be on a supply
          that is not active yet. Typical feeds fall into a few groups:
        </p>
        <InfoCards
          items={[
            { label: "Always hot (battery)", desc: "Live with the key out. Hazard lights, horn and memory circuits often sit here." },
            { label: "Ignition-switched", desc: "Live only in accessory or run. Dead on both sides with the key off is normal." },
            { label: "Relay-fed", desc: "Live only when a relay closes, often commanded by a module. Dead until the relay pulls in." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          With a relay-fed fuse, power on neither side may point upstream to the relay or its control
          circuit rather than to the fuse. Our guide to{" "}
          <Link href="/multimeters/how-to-test-an-automotive-relay-with-a-multimeter" className={link}>
            testing an automotive relay
          </Link>{" "}
          walks through the coil and contact checks. The fuse box lid label or the wiring diagram in your
          service manual tells you which group each fuse belongs to. If a whole row of fuses is dead with
          the key on, suspect the main fuse or fusible link that feeds that busbar.
        </p>
        <div className="mt-4">
          <FlowDiagram
            steps={[
              { label: "Ground OK?", sub: "Battery + reads ~12.6 V to your ground" },
              { label: "Circuit on", sub: "Key in run, component switched on" },
              { label: "Read A and B", sub: "Each tab to ground, DC volts" },
              { label: "Interpret", sub: "12/12 good, 12/0 open, 0/0 no feed" },
            ]}
          />
        </div>
      </section>

      <section>
        <h2 id="results-table" className="text-xl font-semibold mb-3">What the readings mean</h2>
        <DataTable
          head={["Supply side", "Load side", "Most likely meaning"]}
          rows={[
            ["Battery voltage", "Battery voltage", "Fuse is intact; look downstream if the circuit is dead"],
            ["Battery voltage", "About 0 V", "Fuse is open (blown); find the cause before replacing"],
            ["About 0 V", "About 0 V", "Feed not active: key position, relay or upstream fuse/fusible link"],
            ["Battery voltage", "Floating, a few volts", "Fuse open with the load switched off, or a poor connection"],
          ]}
        />
        <p className="text-muted leading-7 mt-4 mb-4">
          The last row catches people out. With the component switched off, nothing pulls the load side to
          ground firmly, so a blown fuse can show a stray, unstable reading on its dead side. Switch the
          load on and repeat; the dead side should then fall to zero. The chart shows what tab B typically
          reads in each case, using illustrative figures for a 12 V system.
        </p>
        <Figure caption={<>Illustrative tab B (load side) readings to ground on a 12 V car. Only a firmly held 0 V with the load on proves the fuse is open.</>}>
          <BarChart
            items={[
              { label: "Intact fuse, load on", value: 12.4, display: "~12.4 V" },
              { label: "Open fuse, load off", value: 3, display: "0–5 V" },
              { label: "Open fuse, load on", value: 0.05, display: "~0 V", highlight: true },
              { label: "Feed not active", value: 0.05, display: "0 V" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="fuse-numbers" className="text-xl font-semibold mb-3">Fuse ratings and the numbers behind them</h2>
        <p className="text-muted leading-7 mb-4">
          Blade fuses use a standard color code, so you can check that the fuse in the slot matches the
          rating on the lid. The rating is the current the fuse carries continuously; circuits are designed
          to run well below it, so a fuse that blows is usually reacting to a fault rather than a normal load.
          Multiplying by system voltage gives a rough feel for what each rating protects (P = V × I):
        </p>
        <DataTable
          head={["Color", "Rating", "Power at 12 V (V × I)", "Typical circuits (varies by car)"]}
          mono={[1, 2]}
          rows={[
            ["Tan", "5 A", "12 × 5 = 60 W", "Sensors, module feeds, small relays"],
            ["Brown", "7.5 A", "12 × 7.5 = 90 W", "Lighting and control circuits"],
            ["Red", "10 A", "12 × 10 = 120 W", "Lamps, radio memory, ignition feeds"],
            ["Blue", "15 A", "12 × 15 = 180 W", "Horn, fuel pump, power outlets"],
            ["Yellow", "20 A", "12 × 20 = 240 W", "Power seats, sunroof, outlets"],
            ["Clear / natural", "25 A", "12 × 25 = 300 W", "Blower motors, window circuits"],
            ["Green", "30 A", "12 × 30 = 360 W", "Fans, larger motors, defrosters"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          An intact fuse is a very small resistance, not a perfect conductor. Fuse makers publish a maximum
          voltage drop at rated current, and for blade fuses it is typically in the tens of millivolts to
          around 0.1 V or so, depending on rating and size. As a worked example, a fuse with about
          10 mΩ of element resistance carrying 5 A drops 5 × 0.010 = 0.05 V, which is why the two tabs of a
          healthy fuse read within a few hundredths of a volt of each other. Some meters, such as the
          Power Probe DM300AUTO below, use exactly this drop to estimate the current through a fuse without
          pulling it.
        </p>
      </section>

      <section id="both-sides-live">
        <KeyIdea title="Both sides live, but the circuit still doesn't work">
          If both tabs read battery voltage with the component switched on, the fuse is doing its job and
          the fault is further along: an open wire, a failed switch, a bad connector or a missing ground at
          the component itself. Back-probe the component&apos;s feed and ground terminals while it is
          switched on, and use a{" "}
          <Link href="/multimeters/how-to-check-voltage-drop-on-a-car" className={link}>
            voltage drop test
          </Link>{" "}
          on the feed and ground paths to find a connection that reads fine unloaded but fails under
          current.
        </KeyIdea>
      </section>

      <section>
        <h2 id="meters" className="text-xl font-semibold mb-3">Meters for this job</h2>
        <p className="text-muted leading-7 mb-4">
          Every check on this page needs only DC volts and continuity, so any working digital meter will do.
          These picks from our verified automotive list add features that speed up fuse-box work.
        </p>
        <ProductStrip
          title="Meters for fuse and circuit checks"
          items={[
            {
              name: "Power Probe DM300AUTO",
              image: dm300.image,
              alt: "Power Probe DM300AUTO automotive multimeter",
              href: "/multimeters/best-multimeter-for-automotive#power-probe-dm300auto",
              note: "Fuse-current mode estimates current through MINI, ATC and MAXI fuses up to 80 A from the voltage drop. Voltage accuracy ±(2% + 3).",
            },
            {
              name: "KAIWEETS HT118A",
              image: ht118a.image,
              alt: "KAIWEETS HT118A True RMS digital multimeter",
              href: "/multimeters/best-multimeter-for-automotive#kaiweets-ht118a",
              note: "Budget True RMS, 6,000-count, with current from a 600 µA range to 10 A and Min/Max. Maker's page and manual disagree on max voltage.",
            },
            {
              name: "Craftsman CMMT14171",
              image: craftsman.image,
              alt: "Craftsman CMMT14171 automotive digital multimeter",
              href: "/multimeters/craftsman-cmmt14171-review",
              note: "True RMS, CAT III 600V, with RPM, dwell, duty cycle, frequency and temperature for wider car diagnosis.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
