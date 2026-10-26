import Link from "next/link";
import {
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
  "How to check for voltage fluctuations in your home: log symptoms, spot-check outlets, capture Min/Max and logged readings, and tell utility from wiring causes.";

export const metadata = buildMetadata({
  title: "How to Check Voltage Fluctuations in Your Home",
  description,
  path: "/multimeters/how-to-check-for-voltage-fluctuations-in-your-home",
});

const all = getAllPicks("multimeters");
const fluke289 = all.find((p) => p.name === "Fluke 289")!;
const ut181a = all.find((p) => p.name === "UNI-T UT181A")!;
const mm420 = all.find((p) => p.name === "Klein Tools MM420")!;

const link = "text-accent hover:underline";

/** Illustrative logged trace: mostly inside the 114-126 V band, with an evening sag and a brief dip. */
function LoggedTraceChart() {
  const L = 44;
  const R = 326;
  const T = 18;
  const B = 138;
  const vMin = 104;
  const vMax = 130;
  const y = (v: number) => B - ((v - vMin) / (vMax - vMin)) * (B - T);
  const samples = [121.5, 121.8, 122.0, 121.6, 121.2, 120.4, 119.6, 118.1, 116.9, 115.8, 115.2, 109.4, 115.0, 115.6, 116.8, 118.4, 119.9, 120.8, 121.3, 121.7];
  const x = (i: number) => L + (i / (samples.length - 1)) * (R - L);
  const pts = samples.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  return (
    <svg viewBox="0 0 340 172" className="w-full h-auto" role="img" aria-label="Illustrative voltage log over a day: the reading stays inside the 114 to 126 volt band most of the time, sags in the evening and shows one brief dip to about 109 volts">
      <rect x={L} y={y(126)} width={R - L} height={y(114) - y(126)} className="fill-accent/10" />
      <g className="stroke-muted" strokeWidth="0.8" strokeDasharray="3 2">
        <line x1={L} y1={y(126)} x2={R} y2={y(126)} />
        <line x1={L} y1={y(114)} x2={R} y2={y(114)} />
      </g>
      <g className="stroke-foreground" strokeWidth="1.2">
        <line x1={L} y1={T} x2={L} y2={B} />
        <line x1={L} y1={B} x2={R} y2={B} />
      </g>
      <polyline points={pts} fill="none" className="stroke-accent" strokeWidth="2" />
      <g fontSize="9" className="fill-muted" textAnchor="end">
        <text x={L - 4} y={y(126) + 3}>126 V</text>
        <text x={L - 4} y={y(114) + 3}>114 V</text>
        <text x={L - 4} y={y(106) + 3}>106 V</text>
      </g>
      <g fontSize="9" className="fill-muted" textAnchor="middle">
        <text x={x(0)} y={B + 13}>6 am</text>
        <text x={x(10)} y={B + 13}>6 pm</text>
        <text x={x(19)} y={B + 13}>6 am</text>
      </g>
      <text x={x(11) + 6} y={y(109.4) + 4} fontSize="9" className="fill-accent">brief dip</text>
      <text x={x(4)} y={y(126) - 5} fontSize="9" className="fill-muted">Range A band</text>
      <text x={(L + R) / 2} y={168} fontSize="9" textAnchor="middle" className="fill-muted">Illustrative data, not a real recording</text>
    </svg>
  );
}

export default function HowToCheckForVoltageFluctuationsInYourHomePage() {
  return (
    <HowToShell
      title="How to Check for Voltage Fluctuations in Your Home"
      description={description}
      path="/multimeters/how-to-check-for-voltage-fluctuations-in-your-home"
      category="multimeters"
      published="2026-10-25"
      intro={
        <>
          To check for voltage fluctuations in your home, start by writing down when the symptoms happen,
          then take spot readings at a few receptacles, and finally record the voltage over time with a
          Min/Max function, a logging meter or a plug-in monitor. The pattern you capture is what separates a
          supply problem the utility must fix from a wiring fault inside the house that needs an electrician.
          Every measurement here is taken at ordinary 120 V receptacles; nothing involves opening the panel
          or the meter.
        </>
      }
      aside={{
        image: fluke289.image,
        alt: "Fluke 289 True RMS logging multimeter",
        caption: (
          <>
            A logging meter turns a vague complaint into a dated record you can hand to the utility. See
            the{" "}
            <Link href="/multimeters/best-multimeters-for-electronics-repair#fluke-289" className={link}>
              Fluke 289 in our electronics repair guide
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-counts", label: "What counts as a fluctuation" },
        { id: "symptoms", label: "Symptoms and likely causes" },
        { id: "observe", label: "Record the pattern first" },
        { id: "spot-check", label: "Spot-check receptacles" },
        { id: "capture", label: "Capture Min/Max and logs" },
        { id: "monitor", label: "Use a plug-in monitor" },
        { id: "utility-or-home", label: "Utility or in-home cause?" },
        { id: "call", label: "When to call for help" },
      ]}
      faq={[
        {
          q: "What voltage should a US outlet read?",
          a: "Homes are supplied at a nominal 120 V per leg and 240 V across both legs. ANSI C84.1 Range A, the band utilities generally aim to hold at the service, is plus or minus 5 percent, about 114 to 126 V on a 120 V circuit. Readings at a receptacle can sit a little lower than at the service because of wiring drop under load.",
        },
        {
          q: "Can a multimeter catch a quick flicker?",
          a: "Sometimes. Min/Max on many handheld meters records at its own response speed, so a dip lasting a fraction of a second may be smoothed out or missed. Check your meter's manual for its Min/Max response time, and treat a clean Min/Max as 'nothing slow happened' rather than proof of a perfect supply.",
        },
        {
          q: "Some outlets read high and others low at the same time. Is that serious?",
          a: "Yes. When readings on one set of circuits rise while others fall, especially as loads switch on, a loose or broken neutral is a common cause. It can damage electronics and overheat connections. Turn off sensitive equipment and call the utility or an electrician the same day.",
        },
        {
          q: "Will the utility come out to check my voltage?",
          a: "Most utilities investigate voltage complaints, and many will install a recorder at the meter. Dates, times and readings from your own log make the request more specific and help them decide where to look.",
        },
        {
          q: "Will a whole-house surge protector stop voltage fluctuations?",
          a: "No. A surge protective device clamps short, high-energy spikes such as those from lightning or utility switching. It does nothing about sags when a motor starts, a supply that sits high or low for minutes, or swings caused by a loose neutral. Those need the cause found and fixed. A surge protector is still worth having, but alongside the diagnosis, not instead of it.",
        },
      ]}
      next={[
        {
          href: "/multimeters/why-do-my-lights-flicker-when-the-refrigerator-or-ac-starts",
          title: "Why Do My Lights Flicker When the Fridge or AC Starts?",
          desc: "Startup current, voltage drop and when a dip points to a loose neutral.",
        },
        {
          href: "/multimeters/why-does-half-my-house-have-no-power-but-the-breakers-look-fine",
          title: "Why Does Half My House Have No Power?",
          desc: "What a lost service leg looks like and who restores it.",
        },
        {
          href: "/multimeters/how-to-find-an-intermittent-electrical-fault-with-a-multimeter",
          title: "How to Find an Intermittent Electrical Fault",
          desc: "Techniques for faults that come and go between visits.",
        },
      ]}
    >
      <Callout title="Measure safely at the receptacle only">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Use a meter rated CAT III 600V or higher, with undamaged leads and probe guards. Wear safety glasses
            and keep your fingers behind the guards.
          </li>
          <li>
            Do not remove the panel cover, open the meter base or touch the service wires. Those stay live and
            are for a licensed electrician or the utility.
          </li>
          <li>
            If you smell burning, see scorching at a receptacle or notice lights going very bright, switch off
            sensitive equipment and call an electrician; for a fire, call 911.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="what-counts" className="text-xl font-semibold mb-3">What counts as a voltage fluctuation</h2>
        <p className="text-muted leading-7 mb-4">
          &quot;Fluctuation&quot; covers several different events, and each one points somewhere different. A
          sag is a short drop, from a cycle to a few seconds, usually when something large starts. A swell is
          the opposite, a short rise, often when a heavy load switches off. A sustained low or high voltage
          lasts minutes or hours and tends to track the time of day. Flicker is repeated small changes you can
          see in the lights. Finally there are imbalances, where the two 120 V halves of the service move in
          opposite directions, which is a classic sign of a neutral problem.
        </p>
        <p className="text-muted leading-7">
          For reference, a US 120 V circuit supplied within ANSI C84.1 Range A sits at roughly 114 to 126 V,
          and the 240 V supply at roughly 228 to 252 V. Readings briefly outside that band during a motor
          start are not unusual. Readings that sit outside it for long periods, or swing widely without an
          obvious cause, are worth chasing.
        </p>
      </section>

      <section>
        <h2 id="symptoms" className="text-xl font-semibold mb-3">Symptoms and likely causes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "What to check", "Who should fix it"]}
          rows={[
            ["Whole house dims briefly when AC or well pump starts", "Normal startup sag, or a weak or long service", "Size and length of the dip on a log", "Utility if large; HVAC tech for hard starts"],
            ["Low voltage every evening, fine overnight", "Heavily loaded utility transformer or line", "24-hour log at several outlets", "Electric utility"],
            ["One room dims when its heater or vacuum runs", "Long or overloaded branch circuit, loose terminal", "Voltage drop on that circuit only", "Electrician"],
            ["Some lights brighten while others dim", "Loose or failing neutral, in-home or service", "Readings on circuits on both legs", "Utility or electrician, same day"],
            ["Random flicker, warm or buzzing outlet", "Loose connection at a receptacle or splice", "Nothing further; stop using it", "Electrician"],
            ["Fluctuations during storms or wind", "Damaged service drop or utility connection", "Whether neighbors see it too", "Electric utility"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="observe">Record the pattern before measuring</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A week of notes is often more useful than an hour with a meter. Keep a simple list with the date,
          time, which lights or devices reacted, what was running, and the weather. Within a few days most
          problems fall into one of three shapes:
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <span className="text-foreground">Tied to one appliance.</span> The dip happens when the same
            thing starts, every time. Look at that appliance&apos;s circuit and its startup current.
          </li>
          <li>
            <span className="text-foreground">Tied to the clock.</span> Low in the late afternoon and evening,
            normal at night. That usually reflects demand on the utility side.
          </li>
          <li>
            <span className="text-foreground">Random or getting worse.</span> No clear trigger, possibly with
            warm outlets or odd smells. Treat as a connection fault and move quickly.
          </li>
        </ul>
        <p className="text-muted leading-7 mt-4">
          Ask a neighbor on the same street whether their lights do the same. Shared symptoms point outward,
          to the utility.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="spot-check">Spot-check several receptacles</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set the meter to AC volts and, at a receptacle, read hot to neutral (the narrow slot to the wide
          one), hot to ground, and neutral to ground. Hot to neutral is the supply voltage. Neutral to ground
          is normally close to zero with no load and rises a little when the circuit carries current; a few
          volts under heavy load can be ordinary, but a large or unsteady value suggests a poor neutral
          connection somewhere on that run.
        </p>
        <p className="text-muted leading-7 mb-4">
          Repeat on circuits in different parts of the house, ideally including circuits on both legs of the
          service. You can tell which leg is which only from the panel directory or an electrician&apos;s
          labeling, but in practice comparing a kitchen, a bedroom and a garage receptacle usually covers both.
          If one group reads a few volts high while another reads low, and the gap widens when a large 120 V
          load turns on, stop there and call for help. Our{" "}
          <Link href="/multimeters/how-to-use-a-multimeter" className={link}>
            multimeter basics guide
          </Link>{" "}
          covers lead placement, and{" "}
          <Link href="/multimeters/unstable-multimeter-readings" className={link}>
            unstable multimeter readings
          </Link>{" "}
          helps rule out the meter itself when numbers jump.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="capture">Capture Min/Max and logged readings</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A spot reading only shows the moment you look. A meter with Min/Max holds the lowest and highest
          values it saw while recording, so you can start it, trigger the suspect appliance, and read back the
          extremes. A logging meter goes further and stores a timestamped series you can graph, which is the
          best evidence when the problem follows the clock. Stay with the meter while the probes are in a
          receptacle, keep leads where nobody can trip on them, and use probe tips that seat firmly in the
          slots. For recordings of many hours, a plug-in monitor, below, is the safer choice.
        </p>
        <Figure caption={<>What a useful log looks like: most readings inside the Range A band, a slow evening sag that suggests utility loading, and one short dip worth matching against your notes.</>}>
          <LoggedTraceChart />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Keep in mind the limits. Min/Max on a general-purpose handheld responds at the meter&apos;s update
          speed, so a dip lasting a cycle or two may not appear at its full depth. Check the manual for a fast
          peak or response-time figure. If you can see the lights flicker but the meter shows nothing, the
          event is probably faster than it can capture.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="monitor">Leave a plug-in voltage monitor running</StepHeading>
        <p className="text-muted leading-7">
          A plug-in voltage monitor goes into an ordinary receptacle, shows the live reading and, depending on
          the model, records the high and low or logs over time. Because nothing is exposed, it can safely run
          for days, which suits problems that come back at random. Move it between a few rooms over a couple
          of weeks: if every location shows the same evening sag, the cause is upstream; if only one circuit
          misbehaves, the cause is in that circuit. Treat its absolute accuracy as a rough guide and confirm
          anything surprising with a meter.
        </p>
      </section>

      <section>
        <h2 id="utility-or-home" className="text-xl font-semibold mb-3">Utility or in-home cause?</h2>
        <p className="text-muted leading-7 mb-4">
          The evidence usually sorts itself. Symptoms that hit every room at once, follow the time of day,
          appear in bad weather, or affect neighbors point to the supply: the transformer, the service drop or
          the meter connection. Symptoms confined to one circuit, triggered by a particular appliance, or
          accompanied by warm receptacles point to the house wiring. A neutral problem can sit on either side
          of the meter, which is why it is the one pattern that needs both parties to look quickly.
        </p>
        <p className="text-muted leading-7">
          If the whole-house dip coincides with the air conditioner or a fridge compressor starting, the
          startup current is the trigger. Our page on{" "}
          <Link href="/multimeters/why-do-my-lights-flicker-when-the-refrigerator-or-ac-starts" className={link}>
            lights flickering when the refrigerator or AC starts
          </Link>{" "}
          explains how much of that is normal. If part of the house loses power altogether, see{" "}
          <Link href="/multimeters/why-does-half-my-house-have-no-power-but-the-breakers-look-fine" className={link}>
            why half the house can lose power
          </Link>
          .
        </p>
      </section>

      <section id="call">
        <KeyIdea title="When to call an electrician or the utility">
          Call the electric utility when fluctuations affect the whole house, follow the time of day, show up
          at neighbors&apos; homes too, or arrive with storm damage to the overhead line. Call a licensed
          electrician when a single circuit sags badly, a receptacle is warm or discolored, or breakers trip
          alongside the dips. Call either one the same day if lights go noticeably brighter or one half of the
          house rises while the other falls, and unplug sensitive electronics until it is fixed.
        </KeyIdea>
      </section>

      <section>
        <ProductStrip
          title="Meters that record Min/Max or logs"
          items={[
            {
              name: "Fluke 289",
              image: fluke289.image,
              alt: "Fluke 289 True RMS logging multimeter",
              href: "/multimeters/best-multimeters-for-electronics-repair#fluke-289",
              note: "Logs and graphs readings on screen (TrendCapture), CAT IV 600V / CAT III 1000V. Expensive.",
            },
            {
              name: "UNI-T UT181A",
              image: ut181a.image,
              alt: "UNI-T UT181A color-screen logging multimeter",
              href: "/multimeters/best-multimeters-for-electronics-repair#uni-t-ut181a",
              note: "Stores 20,000 readings with a real-time clock and trend graph, CAT III 1000V / CAT IV 600V.",
            },
            {
              name: "Klein Tools MM420",
              image: mm420.image,
              alt: "Klein Tools MM420 True RMS digital multimeter",
              href: "/multimeters/best-multimeter-for-beginners#klein-tools-mm420",
              note: "True RMS with Min/Max and a backlight, CAT III 600V. No LoZ; Klein rates it for indoor use.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
