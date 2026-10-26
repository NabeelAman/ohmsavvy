import Link from "next/link";
import {
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
  "Why is my breaker panel buzzing? Tell a faint normal hum from a warning buzz, crackle, heat or burning smell, what to do at once and who to call for each sign.";

export const metadata = buildMetadata({
  title: "Why Is My Breaker Panel Buzzing?",
  description,
  path: "/multimeters/why-is-my-breaker-panel-buzzing",
});

const all = getAllPicks("multimeters");
const fluke117 = all.find((p) => p.name === "Fluke 117")!;
const mm720 = all.find((p) => p.name === "Klein Tools MM720")!;
const fluke323 = all.find((p) => p.name === "Fluke 323")!;

const link = "text-accent hover:underline";

/** Severity ladder: what each panel sound or sign means and the response it calls for. */
function PanelWarningLadder() {
  const rows = [
    { y: 30, sign: "Faint, steady hum", act: "Note it; listen again under load", hot: false },
    { y: 70, sign: "Hum grows loud with big loads", act: "Book an electrician", hot: false },
    { y: 110, sign: "Crackle, sizzle, snapping", act: "Kill loads, call electrician today", hot: true },
    { y: 150, sign: "Heat, smell, smoke, scorch", act: "Main off if safe; leave; 911 if smoke", hot: true },
  ];
  return (
    <svg viewBox="0 0 340 185" className="w-full h-auto" role="img" aria-label="Four-step ladder of breaker panel warning signs, from a faint steady hum to heat, burning smell or smoke, with the action each one calls for">
      <line x1="22" y1="22" x2="22" y2="160" className="stroke-accent" strokeWidth="2.2" />
      <polygon points="16,160 28,160 22,172" className="fill-accent" />
      {rows.map((r) => (
        <g key={r.y}>
          <rect x="34" y={r.y - 16} width="296" height="32" rx="4" className={r.hot ? "fill-surface stroke-accent" : "fill-surface stroke-foreground"} strokeWidth="1.4" />
          <text x="44" y={r.y - 2} fontSize="10" className="fill-foreground">{r.sign}</text>
          <text x="44" y={r.y + 11} fontSize="9.5" className={r.hot ? "fill-accent" : "fill-muted"}>{r.act}</text>
        </g>
      ))}
      <text x="22" y="14" fontSize="9" textAnchor="middle" className="fill-muted">urgency</text>
    </svg>
  );
}

export default function WhyIsMyBreakerPanelBuzzingPage() {
  return (
    <HowToShell
      title="Why Is My Breaker Panel Buzzing? Electrical Warning Signs to Check"
      description={description}
      path="/multimeters/why-is-my-breaker-panel-buzzing"
      category="multimeters"
      published="2026-10-25"
      intro={
        <>
          If your breaker panel is buzzing, the first job is deciding whether you are hearing an ordinary
          electrical hum or the sound of a connection that is overheating. A barely audible, steady hum that
          rises a little when the air conditioner runs is often harmless. A loud buzz, a crackle, a sizzle,
          warmth on the panel door or any burning smell is a warning sign that needs a licensed electrician,
          and sometimes the fire department. This guide walks through what each sound usually means, the
          checks a homeowner can make without opening anything, and who to call.
        </>
      }
      aside={{
        image: fluke117.image,
        alt: "Fluke 117 True RMS digital multimeter",
        caption: (
          <>
            A meter is for checking receptacles on the affected circuits, never for probing inside the
            panel. See our{" "}
            <Link href="/multimeters/fluke-117-review" className={link}>
              Fluke 117 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "hum-or-warning", label: "Normal hum or warning buzz?" },
        { id: "causes", label: "Likely causes by symptom" },
        { id: "act-now", label: "Immediate safety actions" },
        { id: "homeowner-checks", label: "Checks you can make safely" },
        { id: "meter-checks", label: "What a meter can tell you" },
        { id: "cover-stays-on", label: "Why the cover stays on" },
        { id: "who-to-call", label: "Electrician or utility?" },
      ]}
      faq={[
        {
          q: "Is it normal for a breaker panel to hum?",
          a: "A very faint, steady hum that you have to put your ear close to hear, and that does not change much, is common and usually not a concern. A hum you can hear across the room, one that pulses, or one that has recently got louder deserves an electrician's inspection.",
        },
        {
          q: "Can a single breaker buzz?",
          a: "Yes. A breaker that is overloaded, failing internally or loosely seated on the bus can buzz on its own. If the sound clearly comes from one handle, or that handle feels warm, leave it alone and have an electrician replace or reseat it. Do not keep cycling it.",
        },
        {
          q: "Should I turn off the main breaker if the panel is buzzing?",
          a: "If there is heat, smoke, a burning smell or crackling, and you can reach the main without touching anything hot or standing in water, switching it off removes power from the branch circuits. It does not de-energize the wires coming in from the utility, so stay clear and call for help. With only a faint hum and no other signs, you do not need to cut power before calling an electrician.",
        },
        {
          q: "Why does my panel buzz only when the AC or dryer is on?",
          a: "Large loads put more current through the breakers, bus and lugs. A good connection may hum slightly louder; a loose or corroded one heats up and can buzz. Because the sound tracks the load, an electrician can find the joint under load with a thermal camera.",
        },
        {
          q: "Is it safe to stay in the house overnight with a buzzing panel?",
          a: "With only a faint, steady hum and no heat, odor, crackling or flickering lights, most households book an electrician and carry on as normal in the meantime. Make sure the smoke alarms work and keep boxes, laundry and other clutter away from the panel. If the sound grows louder, the cover feels warm or anything smells scorched, treat it as urgent rather than waiting until morning.",
        },
      ]}
      next={[
        {
          href: "/multimeters/why-does-a-circuit-breaker-keep-tripping",
          title: "Why Does a Circuit Breaker Keep Tripping?",
          desc: "Overloads, short circuits and ground faults, and how to tell them apart.",
        },
        {
          href: "/multimeters/why-does-half-my-house-have-no-power-but-the-breakers-look-fine",
          title: "Why Does Half My House Have No Power?",
          desc: "Lost service legs, hidden trips and when the utility has to fix it.",
        },
        {
          href: "/multimeters/how-to-test-a-whole-house-surge-protector",
          title: "How to Test a Whole-House Surge Protector",
          desc: "Reading the status lights on a panel-mounted surge device.",
        },
      ]}
    >
      <Callout title="Heat, smell, crackling or scorch marks: stop here">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            If you see smoke or flames, get everyone out and call 911. Do not try to reach the panel.
          </li>
          <li>
            If there is a burning or hot-plastic smell, crackling, a warm door or brown and black marks, and you
            can reach the main breaker while standing on a dry floor without touching anything hot, switch the
            main off. Then call a licensed electrician.
          </li>
          <li>
            Never remove the panel cover or the inner dead-front, and never push, tighten or pull anything
            inside. Wires from the utility stay live even with the main off.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="hum-or-warning" className="text-xl font-semibold mb-3">Normal hum or warning buzz?</h2>
        <p className="text-muted leading-7 mb-4">
          Alternating current reverses direction 60 times a second in a US home, and anything magnetic that
          carries it can vibrate at twice that rate, which the ear hears as a low hum. A breaker&apos;s
          internal trip mechanism contains a small coil and metal parts that respond to that field, so a panel
          carrying a heavy evening load can give off a faint, even drone. If you have to stand close to
          notice it, the pitch is steady, and nothing else seems wrong, that is generally within normal
          behavior. Note it and listen again the next time the house is busy.
        </p>
        <p className="text-muted leading-7 mb-4">
          The sounds that matter are different in character. Arcing across a loose or corroded connection
          makes an irregular crackle or sizzle, sometimes with snapping, because the current is jumping a
          tiny gap and burning the metal around it. A loud buzz that you can hear from the next room, or one
          that has grown louder over weeks, suggests parts that are under strain. Any of these together with
          warmth, a smell, lights dimming or a breaker that feels hot is a fault in progress, not a quirk.
        </p>
        <Figure caption={<>Move down the ladder as the signs get worse. The bottom two rows are not wait-and-see problems.</>}>
          <PanelWarningLadder />
        </Figure>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Likely causes by symptom</h2>
        <p className="text-muted leading-7 mb-4">
          Several different faults can sound alike from outside the cover. The table lists what a homeowner
          can observe, what usually produces it, and where the work belongs. Most of the right-hand column
          says electrician because nearly every cause sits behind the dead-front.
        </p>
        <DataTable
          head={["Symptom", "Likely cause", "What to check", "Who should fix it"]}
          rows={[
            ["Faint even hum, louder with AC or dryer running", "Normal magnetic hum under load", "Whether it changes when big loads stop", "No action unless it grows; mention at next inspection"],
            ["Buzz from one breaker, handle warm", "Overloaded, failing or loosely seated breaker", "Which circuit it feeds; loads on that circuit", "Licensed electrician"],
            ["Crackle or sizzle, maybe with flicker", "Arcing at a loose lug, bus stab or wire terminal", "Nothing inside; note when it happens", "Licensed electrician, urgently"],
            ["Burning smell, warm door, scorch marks", "Overheating connection or melting insulation", "Do not investigate; main off if safe", "Electrician now; 911 for smoke or fire"],
            ["Sound from the meter or outside, whole house dims", "Service drop, meter base or utility equipment", "Whether neighbors notice dimming too", "Electric utility (meter side), electrician (your side)"],
            ["Hum from a box next to the panel", "Doorbell or other small transformer, surge device", "Which device the sound comes from", "Electrician if hot or loud"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="act-now">Take the immediate safety actions</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Treat smoke, flames or a strong burning odor as a fire, not an electrical question: leave the
          building and call 911 from outside. Firefighters deal with energized equipment routinely and the
          utility can cut the supply at the street.
        </p>
        <p className="text-muted leading-7 mb-4">
          For a crackle, warmth or a faint hot smell without smoke, switch off the large appliances first:
          the air conditioner at its thermostat, the electric dryer, the oven, any EV charging session. Less
          current through the panel means less heat at a bad joint. Then decide about the main. Turn it off
          only if the floor is dry, the panel front is not hot, and you can do it with one hand without
          touching any exposed metal. Afterward, leave the panel alone, keep children and pets away, and call
          an electrician, saying that you have a hot or arcing panel so they triage it correctly.
        </p>
        <p className="text-muted leading-7">
          Do not reset breakers repeatedly, spray anything on the panel, or wedge the door open to cool it.
          Resetting can restart arcing at the same damaged joint.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="homeowner-checks">Make the checks you can do safely</StepHeading>
        <p className="text-muted leading-7 mb-4">
          If the only sign is a hum or a mild buzz with no heat or smell, a few observations from outside the
          panel will make the electrician&apos;s visit faster:
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <span className="text-foreground">Pin down the source.</span> Stand back and listen. Is it the
            panel itself, the meter outside, a small transformer box mounted nearby, or something in the next
            room, such as an HVAC contactor or a fluorescent ballast?
          </li>
          <li>
            <span className="text-foreground">Tie it to a load.</span> Turn the AC, water heater, dryer and
            other big appliances off at their own controls one at a time and note whether the sound fades.
            Write down which one changes it.
          </li>
          <li>
            <span className="text-foreground">Feel for heat without touching.</span> Hold the back of your
            hand an inch from the closed door. Radiant warmth you can feel is a stop sign; go back to step 1.
          </li>
          <li>
            <span className="text-foreground">Look, do not open.</span> With the door open but the cover in
            place, look for discoloration around breaker handles, a handle sitting between ON and OFF, or a
            breaker that looks raised compared with its neighbors.
          </li>
          <li>
            <span className="text-foreground">Check the rest of the house.</span> Flickering lights,
            receptacles that feel warm, or appliances running oddly at the same time point to a shared
            connection problem and raise the urgency.
          </li>
        </ul>
        <p className="text-muted leading-7 mt-4">
          You can switch off a single breaker to see whether the sound stops, as long as no handle is warm
          and there is no smell. If the handle you need is the one that seems to be buzzing, skip it and let
          the electrician handle it.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="meter-checks">What a meter can tell you from the receptacles</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A multimeter does not diagnose a panel, but it can show whether a noisy circuit is also delivering
          poor voltage, which is useful evidence. Use a meter rated at least CAT III 600V with leads in good
          condition, wear safety glasses, keep fingers behind the probe guards, and measure only at ordinary
          receptacles with the probes in the slots. Our{" "}
          <Link href="/multimeters/how-to-use-a-multimeter" className={link}>
            how to use a multimeter
          </Link>{" "}
          guide covers the AC voltage setup.
        </p>
        <p className="text-muted leading-7 mb-4">
          On a receptacle fed from the circuit you suspect, read hot to neutral with the circuit lightly
          loaded, then again while a known load such as a space heater runs on the same circuit. A 120 V
          nominal supply is generally expected to sit between roughly 114 and 126 V, the ANSI C84.1 Range A
          band of plus or minus 5 percent. A small dip under load is normal; a reading that falls several
          volts further than on other circuits, or wanders while you watch, points to resistance somewhere in
          that circuit, possibly at the breaker terminal you can hear.
        </p>
        <Figure caption={<>Example readings at one receptacle: idle (left) and with a heater running on the same circuit (right). A drop this large on one circuit only is worth reporting to the electrician.</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="121.6" unit="V" mode="AC  idle" />
            <MeterReadout value="109.3" unit="V" mode="AC  heater on" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          A clamp meter tells you how hard a circuit is working. Clamp a single conductor using a plug-in line
          splitter between an appliance and the receptacle, never around a cord with both wires inside, and
          compare the reading with the breaker&apos;s rating. If the circuit runs close to its limit for long
          periods, that alone can explain a warm breaker. Our guide to{" "}
          <Link href="/multimeters/how-to-measure-ac-current-with-a-clamp-meter" className={link}>
            measuring AC current with a clamp meter
          </Link>{" "}
          shows the technique.
        </p>
      </section>

      <section>
        <h2 id="cover-stays-on" className="text-xl font-semibold mb-3">Why the cover stays on</h2>
        <p className="text-muted leading-7">
          The panel cover and the dead-front behind it are what separate you from the bus bars and the
          service conductors. The conductors that land on the main breaker come straight from the utility
          transformer, have no breaker of their own ahead of them in the house, and remain energized when the
          main is off. A fault there can deliver far more energy than a branch circuit. Tightening lugs,
          reseating breakers and checking torque are jobs for a licensed electrician with insulated tools and
          the right protective equipment, and in many places they also require a permit. Whatever a video
          online suggests, removing the cover is not a homeowner troubleshooting step.
        </p>
      </section>

      <section id="who-to-call">
        <KeyIdea title="Electrician, utility or fire department?">
          Call 911 for smoke, flames or a strong burning smell. Call a licensed electrician the same day for
          crackling, warmth, scorch marks, a hot breaker or a buzz that is clearly getting worse, and book one
          for a hum that is louder than it used to be. Call the electric utility if the noise comes from the
          meter or the overhead or underground service, or if the whole house dims together and neighbors see
          the same; the meter and everything upstream of it belong to them. If an older panel has been
          flagged at a home inspection, ask the electrician whether replacement is the better fix than repair.
        </KeyIdea>
      </section>

      <section>
        <ProductStrip
          title="Meters for receptacle checks"
          items={[
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 True RMS digital multimeter",
              href: "/multimeters/fluke-117-review",
              note: "True RMS, CAT III 600V, with non-contact voltage detection. Hands-on tested by OhmSavvy.",
            },
            {
              name: "Klein Tools MM720",
              image: mm720.image,
              alt: "Klein Tools MM720 True RMS digital multimeter",
              href: "/multimeters/best-multimeters-for-electricians-under-100#klein-tools-mm720",
              note: "CAT IV 600V / CAT III 1000V, True RMS, with a LoZ mode for ghost voltages. No NCV.",
            },
            {
              name: "Fluke 323",
              image: fluke323.image,
              alt: "Fluke 323 True RMS clamp meter",
              href: "/multimeters/best-multimeters#fluke-323",
              note: "True RMS AC clamp to 400A, CAT III 600V / CAT IV 300V, for circuit load checks. AC current only.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
