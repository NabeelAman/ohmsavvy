import Link from "next/link";
import {
  BarChart,
  Callout,
  CircuitDiagram,
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
  "A multimeter fuse blows when the ammeter is wired across a source instead of in series, the leads stay in the amps jack, or the current exceeds the jack rating.";

export const metadata = buildMetadata({
  title: "Why Does a Multimeter Fuse Blow?",
  description,
  path: "/multimeters/why-does-a-multimeter-fuse-blow-when-measuring-current",
});

const fluke117 = picks.find((p) => p.name === "Fluke 117")!;
const fluke87v = picks.find((p) => p.name === "Fluke 87V")!;
const kaiweets = picks.find((p) => p.name === "KAIWEETS KM200s")!;

const link = "text-accent hover:underline";

/**
 * Generic four-jack meter: what sits behind each input. The A and mA jacks
 * each run through a fuse and a low-value shunt to COM; the V jack feeds a
 * high-impedance input with no current fuse in its path.
 */
function JackLayoutDiagram() {
  return (
    <svg
      viewBox="0 0 360 250"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram of the inside of a typical four-jack multimeter. The 10 amp jack connects through a fuse and a very low resistance shunt to COM. The milliamp jack connects through its own smaller fuse and a shunt to COM. The volts and ohms jack connects to a high resistance input of about 10 megohms with no current fuse. Plugging into a current jack puts only the fuse and shunt, a fraction of an ohm, between the probes."
    >
      {/* meter case */}
      <rect x="12" y="12" width="336" height="186" rx="14" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <g className="stroke-foreground" strokeWidth="1.6" fill="none" strokeLinecap="round">
        {/* common bus to COM */}
        <path d="M60 46 H300" />
        <path d="M220 46 V164" />
        {/* 10 A path */}
        <path d="M60 164 V146 M60 116 V104 M60 64 V46" />
        <path d="M60 104 L52 99 L68 92 L52 85 L68 78 L52 71 L60 64" />
        {/* mA path */}
        <path d="M140 164 V146 M140 116 V104 M140 64 V46" />
        <path d="M140 104 L132 99 L148 92 L132 85 L148 78 L132 71 L140 64" />
        {/* V input */}
        <path d="M300 164 V128 M300 82 V46" />
      </g>
      {/* fuses */}
      <rect x="48" y="116" width="24" height="30" rx="4" className="fill-[#b9bec4] stroke-foreground" strokeWidth="1.4" />
      <rect x="130" y="119" width="20" height="24" rx="4" className="fill-[#b9bec4] stroke-foreground" strokeWidth="1.4" />
      <path d="M60 119 V143 M140 122 V140" className="stroke-foreground" strokeWidth="1" />
      {/* high-impedance input */}
      <rect x="288" y="82" width="24" height="46" rx="3" className="fill-surface stroke-accent" strokeWidth="1.8" />
      {/* jacks */}
      <g strokeWidth="2">
        <circle cx="60" cy="174" r="10" className="fill-[#d13b3b] stroke-foreground" />
        <circle cx="140" cy="174" r="10" className="fill-[#d13b3b] stroke-foreground" />
        <circle cx="220" cy="174" r="10" className="fill-[#1a1d21] stroke-foreground" />
        <circle cx="300" cy="174" r="10" className="fill-[#d13b3b] stroke-foreground" />
      </g>
      <g fontSize="10" className="fill-foreground">
        <text x="78" y="134">fuse</text>
        <text x="78" y="88">shunt</text>
        <text x="156" y="134">fuse</text>
        <text x="156" y="88">shunt</text>
        <text x="282" y="70" textAnchor="middle">≈10 MΩ</text>
        <text x="226" y="100">to COM</text>
      </g>
      <g fontSize="11" fontWeight="700" textAnchor="middle" className="fill-foreground">
        <text x="60" y="216">10 A</text>
        <text x="140" y="216">mA µA</text>
        <text x="220" y="216">COM</text>
        <text x="300" y="216">V Ω</text>
      </g>
      <g fontSize="9.5" textAnchor="middle" className="fill-muted">
        <text x="100" y="232">current jacks: fuse + shunt, a fraction of an ohm</text>
        <text x="300" y="232">no current fuse</text>
        <text x="180" y="246">Typical layout; jack names and fuse positions vary by meter</text>
      </g>
    </svg>
  );
}

export default function WhyDoesAMultimeterFuseBlowPage() {
  return (
    <HowToShell
      title="Why Does a Multimeter Fuse Blow When Measuring Current?"
      description={description}
      path="/multimeters/why-does-a-multimeter-fuse-blow-when-measuring-current"
      category="multimeters"
      published="2026-10-25"
      intro={
        <>
          A multimeter fuse blows when more current flows through the meter&apos;s current jack than the fuse
          is rated for, and by far the most common reason is connecting the meter across a voltage source
          (in parallel) instead of in series with the load. On the amps setting the meter is close to a dead
          short, so placing it across a battery or supply lets that source push as much current as it can
          through the fuse. The other usual causes are forgetting the leads are still in the A or mA jack when
          you go to measure volts, using the mA jack for a load that draws amps, and startup surges from motors
          and capacitors. The fuse did its job; the steps below show how to stop it happening again and how to
          replace it safely.
        </>
      }
      aside={{
        image: fluke87v.image,
        alt: "Fluke 87V industrial True RMS multimeter",
        caption: (
          <>
            Industrial meters carry CAT IV ratings, but any meter&apos;s current fuse protects it only if the
            replacement matches. See our{" "}
            <Link href="/multimeters/fluke-87v-review" className={link}>
              Fluke 87V review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "why-it-blows", label: "Why an ammeter blows its fuse" },
        { id: "causes", label: "Causes at a glance" },
        { id: "worked-example", label: "The arithmetic of a short" },
        { id: "ratings", label: "Jack ratings and surge currents" },
        { id: "step-confirm", label: "1. Confirm the fuse is blown" },
        { id: "step-find-cause", label: "2. Work out what blew it" },
        { id: "step-replace", label: "3. Fit the correct replacement" },
        { id: "step-measure", label: "4. Measure current the safe way" },
        { id: "breaking-capacity", label: "Why breaking capacity matters" },
        { id: "meters", label: "Meters and alternatives" },
      ]}
      faq={[
        {
          q: "Can I use a regular glass fuse to replace my multimeter fuse?",
          a: "No, unless the manual specifies one. Most meters designed for electrical work specify a ceramic, high-breaking-capacity fuse with a particular current and voltage rating and physical size. A glass automotive or electronics fuse of the same amp value may interrupt only a small fault current, so a short on a mains circuit can arc across it instead of clearing. Buy the exact part number from the manual.",
        },
        {
          q: "Why did my multimeter fuse blow when I measured voltage?",
          a: "Almost certainly because the red lead was still plugged into the A or mA jack from an earlier current measurement. That jack connects the probes through a fuse and a shunt of a fraction of an ohm, so touching them across a battery or outlet is a short circuit. The fuse blowing is the protection working. Always move the red lead back to the V jack after measuring current.",
        },
        {
          q: "How do I know if my multimeter's current fuse is blown?",
          a: "The usual symptom is a current range that reads zero on a circuit that is clearly drawing power, while voltage and resistance still work. Many meters let you check the fuse by measuring resistance from the V jack into the current jack; the manual gives the expected value. Otherwise, remove the fuse and test it for continuity with a second meter or on the meter's own ohms range.",
        },
        {
          q: "Is it safe to bypass a multimeter fuse with wire or foil?",
          a: "No. The fuse is the only thing that stops a mistake on the current jack from turning into a dead short across the source. Without it, the shunt and leads carry the full fault current, which can melt them, burn the meter and cause an arc flash at your hands on a mains or high-energy battery circuit. Replace it with the specified fuse or do not use the current range.",
        },
        {
          q: "How long can I measure 10 amps with a multimeter?",
          a: "That depends on the meter, so check its manual. Many handheld meters allow their highest current only for a limited time, often stated as a number of seconds on followed by a longer rest period, because the shunt heats up. Some allow a little over 10 A briefly. For continuous monitoring at several amps, a clamp meter is the better tool because nothing heats in series with the load.",
        },
        {
          q: "Why does my multimeter fuse keep blowing when measuring a car's parasitic draw?",
          a: "Opening a door, waking the modules or turning the key can draw several amps for a moment, which exceeds the mA jack's rating instantly. Start on the 10 A jack, keep doors closed and the ignition off, wait for the modules to sleep, and only then move to the mA range if the reading is small enough. A clamp meter designed for low DC current avoids breaking the circuit at all.",
        },
      ]}
      next={[
        {
          href: "/multimeters/can-you-measure-current-without-breaking-the-circuit-with-a-multimeter",
          title: "Can You Measure Current Without Breaking the Circuit?",
          desc: "Clamp meters and the shunt method: current readings with no fuse at risk.",
        },
        {
          href: "/multimeters/how-to-measure-milliamps-with-a-multimeter",
          title: "How to Measure Milliamps With a Multimeter",
          desc: "The correct series connection and range order, step by step.",
        },
        {
          href: "/multimeters/why-does-my-multimeter-read-0-volts-on-a-working-circuit",
          title: "Why Does My Multimeter Read 0 Volts on a Working Circuit?",
          desc: "Leads in the amps jack are one cause of a flat zero; here are the rest.",
        },
      ]}
    >
      <Callout title="Safety: the current jack is the most dangerous input on the meter">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Never put the meter&apos;s current jack across a mains outlet, a panel, a car battery or a lithium
            pack. On those sources a short can deliver hundreds or thousands of amps, and the result is an arc
            at the probe tips, not just a blown fuse.
          </li>
          <li>
            Use a meter whose CAT rating matches the location (CAT III 600V or better for household panels and
            branch circuits), and never bypass, bridge or upsize the meter&apos;s fuse.
          </li>
          <li>
            For mains current, use a clamp meter around a single conductor. Work inside a panel is for a
            licensed electrician.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="why-it-blows" className="text-xl font-semibold mb-3">Why an ammeter blows its fuse</h2>
        <p className="text-muted leading-7 mb-4">
          A voltmeter and an ammeter are opposites. On the voltage function the meter presents a very high
          input resistance, typically around 10 MΩ, so it barely disturbs the circuit and you can safely
          connect it across anything within its rating. On the current function the meter must carry the
          whole circuit current through itself, so its designers make its resistance as low as possible:
          the 10 A path is usually a shunt of a few hundredths of an ohm plus the fuse and leads, and the mA
          path a few ohms at most. The meter works out the current from the small voltage dropped across
          that shunt.
        </p>
        <p className="text-muted leading-7 mb-4">
          That low resistance is only safe in series, where the load sets the current and the meter just
          rides along. Wire the same meter across the supply and nothing limits the current except the
          meter&apos;s own fraction of an ohm, the leads and the source&apos;s internal resistance. The two
          diagrams below show the difference. The circuit on the left is how current is measured; the one on
          the right is how meter fuses are blown.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption="Correct: the meter breaks the circuit and sits in series, so the load limits the current that flows through it.">
            <CircuitDiagram mode="series" meter="A" source="12 V" load="Load" note="Current set by the load" />
          </Figure>
          <Figure caption="Wrong: the meter on its amps jack is placed across the load, and so directly across the supply. Its fraction of an ohm shorts the source and the fuse blows.">
            <CircuitDiagram mode="parallel" meter="A" source="12 V" load="Load" note="Ammeter across the supply = short" />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          You can see the same thing from the inside. Behind each current jack there is a fuse and a shunt
          leading straight to COM; behind the V jack there is a high-resistance input with no current fuse
          at all. Plug the red lead into a current jack and the only thing between your probe tips is the fuse
          and the shunt.
        </p>
        <Figure caption="What sits behind each jack on a typical four-jack meter. The current jacks are nearly a short to COM, protected only by their fuses; the V jack is a high-impedance input. Layouts vary, so check your meter's manual.">
          <JackLayoutDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Causes at a glance</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["Fuse blew the instant the probes touched", "Meter placed across the source (parallel) on the amps function", "Were the probes on both battery or supply terminals?", "Break the circuit and put the meter in series with the load"],
            ["Fuse blew while measuring volts", "Red lead left in the A or mA jack", "Check where the red plug was", "Move the red lead to V after every current test"],
            ["mA fuse blew, 10 A fuse still fine", "Load drew more than the mA jack's rating", "Compare expected current with the rating printed by the jack", "Start every unknown on the 10 A jack, then step down"],
            ["Fuse blew at switch-on, not while running", "Inrush current of a motor, transformer or capacitor-input supply", "Does the device have a motor or a large input capacitor?", "Connect with power off, or use a clamp meter"],
            ["10 A fuse blew after minutes on a steady load", "Exceeded the jack's time limit at high current", "Check the manual's on-time and rest-period limits", "Keep measurements short, or use a clamp meter"],
            ["Fuse blew on a car parasitic-draw test", "Door, ignition or module wake-up current on the mA jack", "Did anything switch on during the test?", "Use the 10 A jack until modules sleep"],
            ["Current reads 0 on a working circuit", "Fuse already blown by an earlier mistake", "Ohms check from V into the current jack, or test the fuse", "Replace with the specified fuse"],
          ]}
        />
      </section>

      <section>
        <h2 id="worked-example" className="text-xl font-semibold mb-3">The arithmetic of a short</h2>
        <p className="text-muted leading-7 mb-4">
          Ohm&apos;s law shows why there is no gentle version of this mistake. Take a 12 V battery and a
          meter on its 10 A jack. Suppose the whole path through the meter, fuse, shunt and both test leads
          adds up to roughly 0.1 Ω. The current the battery tries to drive is:
        </p>
        <p className="font-mono text-sm leading-7 mb-4 px-4 py-3 rounded-lg border border-border">
          I = V ÷ R = 12 V ÷ 0.1 Ω = 120 A
        </p>
        <p className="text-muted leading-7 mb-4">
          That figure is illustrative. In reality the battery&apos;s own internal resistance and the contact
          resistance at the probe tips add to the total, so the current is lower, but a healthy car battery
          can still deliver well over 100 A for a moment, which is more than ten times the rating of a typical
          10 A fuse. Compare that with the same meter in series with a 12 V, 24 W lamp: the lamp draws
          24 W ÷ 12 V = 2 A, and the meter&apos;s 0.1 Ω drops only 2 A × 0.1 Ω = 0.2 V. Same meter, same
          battery; the only difference is where the load sits.
        </p>
        <p className="text-muted leading-7">
          On the mA jack the path resistance is higher, often a few ohms, but its fuse is rated in hundreds of
          milliamps. A 9 V battery across a 2 Ω mA path would try to drive 9 ÷ 2 = 4.5 A, more than ten times
          a typical 400 mA fuse. On a mains outlet the available fault current is set by the building wiring
          and can reach thousands of amps, which is why the type of fuse matters as much as its rating.
        </p>
      </section>

      <section>
        <h2 id="ratings" className="text-xl font-semibold mb-3">Jack ratings and surge currents</h2>
        <p className="text-muted leading-7 mb-4">
          The chart puts the numbers from this article side by side on a log scale. The jack ratings are
          typical of many handheld meters, not a specific model; your meter&apos;s limits are printed beside
          its jacks and in the manual. The motor and short-circuit figures are illustrative.
        </p>
        <Figure caption="Typical jack ratings compared with illustrative circuit currents. Each step on the log scale is ten times the last. Check your own meter's ratings before measuring.">
          <BarChart
            log
            items={[
              { label: "LED indicator circuit", value: 0.02, display: "≈20 mA" },
              { label: "mA jack limit (typical)", value: 0.4, display: "≈400 mA" },
              { label: "12 V, 24 W lamp", value: 2, display: "2 A" },
              { label: "Small motor running (illustrative)", value: 2, display: "2 A" },
              { label: "Same motor at start, 5–8× (illustrative)", value: 12, display: "10–16 A", highlight: true },
              { label: "10 A jack limit (typical)", value: 10, display: "10 A" },
              { label: "12 V across 0.1 Ω (illustrative)", value: 120, display: "≈120 A", highlight: true },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4 mb-4">
          Two rows deserve attention. Motors commonly draw several times their running current for a fraction
          of a second while they get up to speed, often quoted as five to eight times for induction motors,
          so a 2 A motor can briefly ask for more than the 10 A jack allows. Capacitor-input power supplies,
          LED drivers and anything with a large input capacitor do the same: at switch-on the empty capacitor
          looks almost like a short until it charges. A meter connected before power is applied sees that
          surge in full.
        </p>
        <DataTable
          head={["Input", "Typical use", "Typical protection", "What to check in the manual"]}
          rows={[
            ["µA / mA jack", "Sensors, LEDs, standby and sleep current", "Fuse in the hundreds of mA", "Exact fuse rating, voltage rating and size"],
            ["10 A (or A) jack", "Lamps, small motors, 12 V accessories", "Fuse around 10 A; very cheap meters may leave it unfused", "Maximum on-time at full current and required rest period"],
            ["V / Ω jack", "Voltage, resistance, continuity", "No current fuse; protected by its high input impedance", "CAT rating and maximum voltage"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Time limits are the least-read line in most manuals. Many meters let you measure their full rated
          current only for a short period, often stated as a number of seconds on followed by minutes of rest,
          because the shunt heats and its resistance drifts. Exceeding that duty cycle can blow the fuse on a
          load that is technically within rating, so check your meter&apos;s figures rather than assuming
          10 A means 10 A indefinitely.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="step-confirm">Confirm the fuse is blown</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A blown current fuse rarely announces itself. The meter powers up, voltage and resistance still
          work, and the current range simply reads zero on a circuit that is obviously drawing power.
        </p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Figure caption="Illustrative: a 2 A lamp circuit read through a good fuse.">
            <MeterReadout value="2.01" unit="A DC" mode="10 A jack, fuse OK" />
          </Figure>
          <Figure caption="Illustrative: the same lamp, still lit, with the fuse open.">
            <MeterReadout value="0.00" unit="A DC" mode="10 A jack, fuse open" />
          </Figure>
        </div>
        <p className="text-muted leading-7">
          Many manuals describe a quick check: set the meter to ohms, plug the red lead into the V jack and
          touch its probe into the current jack, then compare the reading with the value the manual gives. OL
          means the fuse is open. Otherwise switch off, remove the battery, open the case as the manual
          describes and test the fuse itself; our guide to{" "}
          <Link href="/multimeters/how-to-test-a-fuse-with-a-multimeter" className={link}>
            testing a fuse with a multimeter
          </Link>{" "}
          covers the continuity check, using a second meter if you have one.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="step-find-cause">Work out what blew it</StepHeading>
        <p className="text-muted leading-7">
          Replace the fuse without understanding the cause and the new one goes the same way. Think back to
          the moment it happened. If the probes were on two terminals of a battery or supply, it was a
          parallel connection. If you were measuring volts, the red lead was in a current jack. If it blew
          at switch-on, suspect inrush. If it blew on the mA jack, the load drew more than expected. And if
          the current meter went to zero on a car battery test the moment a door opened, the modules woke up.
          Each of those maps to one row of the causes table above.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="step-replace">Fit the correct replacement</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The replacement must match the original in four ways, all of which are printed on the fuse body
          and in the manual&apos;s specifications or maintenance section:
        </p>
        <ul className="text-muted leading-7 mb-4 list-disc pl-5 space-y-1">
          <li><strong>Current rating</strong>, the same amps or milliamps. Larger lets the shunt overheat.</li>
          <li><strong>Voltage rating</strong>, at least as high as the original, which on CAT-rated meters is often the meter&apos;s full voltage rating.</li>
          <li><strong>Physical size</strong>, so it seats firmly in the clips without stress or gaps.</li>
          <li><strong>Breaking capacity and type</strong>, usually a ceramic, sand-filled high-breaking-capacity (HRC) fuse of the type the maker specifies.</li>
        </ul>
        <p className="text-muted leading-7">
          Buy the maker&apos;s part number, or an equivalent that matches every line of its specification.
          Never fit a glass automotive or electronics fuse because it has the right amp value, and never
          bridge the clips with wire or foil. Close the case fully before using the meter again.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="step-measure">Measure current the safe way</StepHeading>
        <FlowDiagram
          steps={[
            { label: "Estimate", sub: "Watts ÷ volts ≈ amps" },
            { label: "Power off", sub: "Break the circuit" },
            { label: "10 A jack", sub: "In series, highest range" },
            { label: "Step down", sub: "mA only if it fits" },
            { label: "Lead back", sub: "Red to V when done" },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Estimate the current first, from the device&apos;s wattage or a label. Turn the circuit off, break it
          at one point and connect the meter so the current must flow through it. Start with the red lead in
          the 10 A jack and move to mA only once you know the reading fits. Switch on, read, switch off,
          disconnect. Then move the red lead back to the V jack immediately, since that single habit prevents
          the most common blown fuse. Our step-by-step guide to{" "}
          <Link href="/multimeters/how-to-measure-milliamps-with-a-multimeter" className={link}>
            measuring milliamps with a multimeter
          </Link>{" "}
          walks through the connection in detail. For mains appliances, motors, or anything you cannot safely
          open, skip the current jack entirely: a clamp meter measures through the magnetic field around one
          conductor, as explained in{" "}
          <Link href="/multimeters/how-to-measure-ac-current-with-a-clamp-meter" className={link}>
            how to measure AC current with a clamp meter
          </Link>
          , and the shunt method in{" "}
          <Link href="/multimeters/can-you-measure-current-without-breaking-the-circuit-with-a-multimeter" className={link}>
            measuring current without breaking the circuit
          </Link>{" "}
          keeps the meter on its voltage input.
        </p>
      </section>

      <section>
        <h2 id="breaking-capacity" className="text-xl font-semibold mb-3">Why breaking capacity matters</h2>
        <p className="text-muted leading-7 mb-4">
          Every fuse has two ratings that sound alike. The current rating is the point at which it opens. The
          breaking capacity (or interrupting rating) is the largest fault current it can safely stop. When a
          fuse element melts under a heavy fault, an arc forms across the gap and keeps conducting. A small
          glass fuse can only quench a modest fault current; above that, the arc can persist, the glass can
          shatter and the current keeps flowing.
        </p>
        <p className="text-muted leading-7">
          Meter fuses intended for electrical work are typically ceramic bodies packed with sand, which absorbs
          the energy and smothers the arc, and they are commonly rated to interrupt thousands of amps rather
          than tens. That is what lets a CAT-rated meter survive a lead in the amps jack touching a mains
          outlet: the fuse clears before the arc can grow into an arc flash at the probe tips. A cheap
          substitute with the right amp number but the wrong breaking capacity quietly removes that margin,
          and a CAT rating on the front of the meter assumes the correct fuse is inside.
        </p>
      </section>

      <section>
        <KeyIdea title="Series, not across">
          On its current function a multimeter is nearly a short circuit. Put it in series, where the load
          limits the current, start on the 10 A jack, keep within the manual&apos;s time limits, and move the
          red lead back to V the moment you finish. When the fuse does blow, replace it with the exact type
          the maker specifies.
        </KeyIdea>
      </section>

      <section>
        <h2 id="meters" className="text-xl font-semibold mb-3">Meters and alternatives</h2>
        <p className="text-muted leading-7 mb-4">
          The safest blown-fuse prevention is choosing the right tool for the current you are measuring. For
          small electronics currents, any fused multimeter used in series is fine. For anything at mains
          voltage, look at a clamp meter first. These picks come from our verified multimeter list.
        </p>
        <ProductStrip
          title="Meters from our verified picks"
          items={[
            {
              name: fluke117.name,
              image: fluke117.image,
              alt: "Fluke 117 True RMS electrician's multimeter",
              href: "/multimeters/fluke-117-review",
              note: "True RMS and CAT III 600V for household electrical work, with built-in NCV. Hands-on Tested.",
            },
            {
              name: fluke87v.name,
              image: fluke87v.image,
              alt: "Fluke 87V industrial True RMS multimeter",
              href: "/multimeters/fluke-87v-review",
              note: "CAT III 1000V / CAT IV 600V for industrial use, with a 19,999-count high-resolution mode. Hands-on Tested.",
            },
            {
              name: kaiweets.name,
              image: kaiweets.image,
              alt: "KAIWEETS KM200s True RMS multimeter",
              href: "/multimeters/kaiweets-km200s-review",
              note: "Budget True RMS and auto-ranging for home use. CAT II 600V, so not meant for service-panel work.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
