import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  InfoCards,
  KeyIdea,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const description =
  "Why does my soldering iron temperature keep dropping? Tip size, wattage, sensor placement, a wet sponge, a weak USB-C supply or a sleep timer, and how to fix each.";

export const metadata = buildMetadata({
  title: "Why Does My Soldering Iron Temperature Drop?",
  description,
  path: "/soldering-irons/why-does-my-soldering-iron-temperature-keep-dropping",
});

const all = getAllPicks("soldering-irons");
const pick = (name: string) => all.find((p) => p.name === name)!;
const spec = (name: string, label: string) => pick(name).specs.find((s) => s.label === label)!.value;
const weller = pick("Weller WE1010NA");
const pinecil = pick("Pinecil V2");
const hakko = pick("Hakko FX-888DX");
const pinecilPower = spec("Pinecil V2", "Power");

// Idealized heat budget for the worked example below: a 10 g copper lug taken
// from 25°C to 250°C needs 10 g × 0.385 J/g·K × 225 K ≈ 866 J. Time = energy ÷
// power, ignoring every loss, so real irons take longer.
const LUG_JOULES = 866;
const POWER_EXAMPLES = [
  { label: "9 V × 3 A USB-C", watts: 27 },
  { label: "20 V × 3 A USB-C", watts: 60 },
  { label: "70 W station", watts: 70 },
  { label: "88 W (24 V DC)", watts: 88 },
];

const link = "text-accent hover:underline";

export default function WhyDoesMySolderingIronTemperatureKeepDroppingPage() {
  return (
    <HowToShell
      title="Why Does My Soldering Iron Temperature Keep Dropping?"
      description={description}
      path="/soldering-irons/why-does-my-soldering-iron-temperature-keep-dropping"
      category="soldering-irons"
      published="2026-10-25"
      updated="2026-10-25"
      intro={
        <>
          A soldering iron&apos;s temperature keeps dropping because the joint pulls heat out of the tip faster
          than the iron can put it back, usually because the tip is too small, the iron or its supply is short of
          power, or the joint sits on a large area of copper. If it drops while the iron is resting in its stand,
          the cause is almost always a sleep or standby setting, or less often a loose tip, a damaged cable or a
          failing sensor. Some dip on every joint is normal; what matters is how far it sags and how quickly it
          recovers, and the checks below tell you which cause you have.
        </>
      }
      aside={{
        image: weller.image,
        alt: "Weller WE1010NA soldering station",
        caption: (
          <>
            A temperature-controlled station shows you the setpoint and reacts when the tip cools. See our{" "}
            <Link href="/soldering-irons/weller-we1010na-review" className={link}>
              Weller WE1010NA review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "two-symptoms", label: "Dropping while soldering vs. while idle" },
        { id: "quick-reference", label: "Symptoms, causes and fixes" },
        { id: "thermal-load", label: "1. The joint needs more heat than the iron can give" },
        { id: "tip", label: "2. The tip is too small or touches too little" },
        { id: "sensor", label: "3. The display isn't measuring the very end of the tip" },
        { id: "sponge", label: "4. A soaking-wet sponge" },
        { id: "supply", label: "5. A USB-C or DC iron on a weak supply" },
        { id: "idle-drop", label: "6. Sleep timers and faults when idle" },
        { id: "irons", label: "Irons that hold temperature" },
      ]}
      faq={[
        {
          q: "How much should the temperature drop when I touch a joint?",
          a: "There is no single number. It depends on the tip, the iron's power, how the controller reacts and how much copper is in the joint. What matters is the pattern: a brief dip that recovers within a second or two on small joints is normal, while a reading that falls and stays down on every joint means the iron can't keep up with the work you are asking of it.",
        },
        {
          q: "Should I just turn the temperature up to compensate?",
          a: "Only a little, and only after trying a bigger tip. A higher setpoint speeds up oxidation of the tip and flux burn-off, and on small parts it can lift pads and damage components. A wider tip that touches more of the joint usually fixes the sag without raising the setpoint at all, because it moves heat in faster rather than starting hotter.",
        },
        {
          q: "My iron has no temperature display. How do I know it's dropping?",
          a: "Watch the solder. If it melts readily on the first joint but turns sluggish or grainy on the next few, or a large joint never fully flows, the tip is cooling faster than the iron can reheat it. Irons with no temperature control can't push extra power back in when the tip cools, so this happens to them sooner than to a regulated station.",
        },
        {
          q: "Can a failing heating element cause temperature drops?",
          a: "Yes, but rule out the simpler causes first. An element or sensor that is failing often shows up as an iron that heats slowly, never reaches the setpoint, or cuts in and out with no pattern. The heating element's resistance can be checked with a multimeter while the iron is unplugged and cool, and compared with the figure in the manual.",
        },
        {
          q: "Why does my soldering iron temperature drop when soldering ground planes?",
          a: "A ground plane is a large sheet of copper, and copper conducts heat away from the joint almost as fast as the tip can deliver it. A small tip on a low-power iron simply loses that race. Use the largest tip that fits, add fresh solder to the tip to improve contact, and preheat the board if the plane is very large.",
        },
        {
          q: "Why does my Pinecil lose temperature on some chargers?",
          a: "A USB-C iron draws only the power the charger and cable negotiate. Pine64 rates the Pinecil V2 at up to 88W at 24V DC and about 60W from 20V USB-C PD. A charger limited to a lower voltage gives noticeably less, because a resistive heater's power falls with the square of the voltage. With less power in reserve, the tip sags further and recovers more slowly on every joint.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/why-does-my-soldering-iron-take-too-long-to-heat-up",
          title: "Why Does My Soldering Iron Take Too Long to Heat Up?",
          desc: "The cold-start version of the same problem: slow to reach temperature at all.",
        },
        {
          href: "/soldering-irons/soldering-iron-tip-types",
          title: "Soldering Iron Tip Types",
          desc: "Choosing a tip shape and size that carries enough heat into the joint.",
        },
      ]}
    >
      <section>
        <h2 id="two-symptoms" className="text-xl font-semibold mb-3">Dropping while soldering vs. while idle</h2>
        <p className="text-muted leading-7 mb-4">
          Start by noticing when the drop happens. The two patterns have almost no causes in common.
        </p>
        <InfoCards
          items={[
            { label: "Drops on every joint", desc: "The reading falls when the tip touches work and recovers slowly, or not at all. This is a heat-delivery problem: causes 1 to 5." },
            { label: "Drops while sitting idle", desc: "The reading falls with nothing touching the tip. This is a setting or a fault: cause 6." },
          ]}
        />
        <Figure
          caption={
            <>
              Each touch pulls heat out of the tip. A setup with enough power and a well-matched tip dips
              a little and recovers quickly (solid line). An undersized tip or weak supply dips further and
              never fully recovers between joints (dashed line). Illustrative shape, not measured data.
            </>
          }
        >
          <svg viewBox="0 0 300 140" className="w-full h-auto" role="img" aria-label="Chart of tip temperature over several joints, comparing quick recovery with a sagging temperature that never recovers">
            <g className="stroke-muted" strokeWidth="1" fill="none">
              <line x1="30" y1="15" x2="30" y2="115" />
              <line x1="30" y1="115" x2="290" y2="115" />
              <line x1="30" y1="30" x2="290" y2="30" strokeDasharray="2 3" />
            </g>
            <path d="M30 30 L70 30 L76 46 L90 31 L130 30 L136 46 L150 31 L190 30 L196 46 L210 31 L250 30 L256 46 L270 31 L290 30" className="stroke-accent" strokeWidth="1.8" fill="none" />
            <path d="M30 30 L70 30 L76 60 L110 48 L130 48 L136 76 L170 64 L190 64 L196 90 L230 80 L250 80 L256 102 L290 94" className="stroke-foreground" strokeWidth="1.6" strokeDasharray="4 3" fill="none" />
            <text x="34" y="24" fontSize="9" className="fill-muted">setpoint</text>
            <text x="160" y="132" fontSize="9" textAnchor="middle" className="fill-muted">time (each dip = touching a joint)</text>
            <text x="14" y="70" fontSize="9" textAnchor="middle" className="fill-muted" transform="rotate(-90 14 70)">tip temp</text>
            <text x="286" y="22" fontSize="9" textAnchor="end" className="fill-accent">recovers</text>
            <text x="230" y="60" fontSize="9" textAnchor="middle" className="fill-foreground">keeps sagging</text>
          </svg>
        </Figure>
      </section>

      <section>
        <h2 id="quick-reference" className="text-xl font-semibold mb-3">Symptoms, causes and fixes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Big drop on ground pads and thick wire only", "Joint needs more power than the iron gives", "Small joints fine, large ones sluggish", "Higher-wattage iron, bigger tip, or preheat the board"],
            ["Drop on every joint, even small ones", "Fine tip or poor tip-to-joint contact", "Try a chisel tip with a little fresh solder on it", "Use a tip that matches the joint; clean and re-tin"],
            ["Display steady but solder sluggish", "Tip end cooler than the sensor reading", "Solder flows poorly though the number holds", "Larger or shorter tip; judge by solder flow"],
            ["Drop right after wiping", "Sponge too wet", "Water drips when you squeeze the sponge", "Wring the sponge out, or use brass wool"],
            ["USB-C iron weak on one charger only", "Supply negotiates less voltage or power", "Swap to a charger rated for the iron's full input", "Charger and cable that support the iron's input"],
            ["Falls while resting in the stand", "Sleep or standby mode", "Drop starts after a fixed idle time", "Change the standby setting in the manual"],
            ["Drifts down or flickers with no pattern", "Loose tip, cable or failing element/sensor", "Reseat the tip; element ohms with the iron unplugged", "Replace tip, handpiece or cable; maker's service"],
          ]}
        />
        <KeyIdea title="Bigger tip before higher temperature">
          When the temperature sags on joints, the instinct is to turn the dial up. A tip that matches the
          joint, kept clean and tinned, fixes most cases without the extra oxidation and component stress
          a hotter setpoint brings.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={1} id="thermal-load">The joint needs more heat than the iron can give</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A ground pad, a thick wire, a large connector lug or a pad tied into a copper plane draws heat
          away far faster than a small signal pad. A low-power iron simply can&apos;t replace that heat as
          fast as the joint takes it, so the temperature falls and stays down. The fix is more delivered
          power: a higher-wattage iron, or a station whose controller pushes power back in as soon as the
          tip cools. For very large copper areas, preheating the board helps too. Our guide to{" "}
          <Link href="/soldering-irons/how-to-solder-copper-wire-to-a-circuit-board-ground-pad" className={link}>
            soldering to a ground pad
          </Link>{" "}
          covers that case step by step.
        </p>
        <p className="text-muted leading-7 mb-4">
          A rough heat budget shows why power matters. Copper&apos;s specific heat is about 0.385 J per gram per
          degree Celsius. Taking an illustrative 10 g copper lug from 25°C to 250°C, comfortably above the
          melting point of common lead-free solder (around 217 to 220°C for SAC305), needs about
          10 × 0.385 × 225 ≈ 866 J. Time is energy divided by power, so even if every watt reached the lug,
          which it never does, the minimum times look like this:
        </p>
        <Figure caption={<>Idealized minimum time to put 866 J into a 10 g copper lug at each power level, with zero losses. Real times are longer, because the lug, the wire and the air carry heat away while you work.</>}>
          <BarChart
            items={POWER_EXAMPLES.map((p) => ({
              label: p.label,
              value: LUG_JOULES / p.watts,
              display: `≈${Math.round(LUG_JOULES / p.watts)} s`,
              highlight: p.watts === 27,
            }))}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The 27 W case is a USB-C iron on a charger that only offers 9 V; the 88 W figure is Pine64&apos;s
          maximum rating for the Pinecil V2 on a 24 V DC supply. The point is not the exact seconds but the
          ratio: at a third of the power, the same joint takes three times as long, and in the meantime the
          tip&apos;s temperature has nowhere to go but down.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="tip">The tip is too small or touches too little</StepHeading>
        <p className="text-muted leading-7">
          Heat reaches the joint only through the area where tip and work touch, and a fine conical tip
          holds little heat of its own. On anything bigger than a small component lead, a fine point
          drains in a moment. Switching to a chisel or bevel tip that lies flat against the pad and the
          lead puts more heat in faster and gives the iron more stored heat to draw on. A thin layer of
          fresh solder on the tip also helps: molten solder bridges the gap between tip and work far
          better than a dry contact. A tip that is oxidized and won&apos;t hold solder transfers heat
          poorly, so clean and re-tin it first. See{" "}
          <Link href="/soldering-irons/why-wont-solder-stick-to-soldering-iron-tip" className={link}>
            why solder won&apos;t stick to the tip
          </Link>{" "}
          and our guide to{" "}
          <Link href="/soldering-irons/soldering-iron-tip-types" className={link}>
            soldering iron tip types
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={3} id="sensor">The display isn&apos;t measuring the very end of the tip</StepHeading>
        <p className="text-muted leading-7">
          A temperature-controlled iron reads its sensor, which sits somewhere behind the working end of
          the tip. The very end can be noticeably cooler than the number on the display while it is
          dumping heat into a joint, especially with long or thin tips. So a display that barely moves
          does not prove the joint is hot enough, and a display that dips sharply is often just showing
          the controller doing its job. Stability figures such as the ±1°C idle stability Hakko quotes for
          the FX-888DX describe the tip at rest, not under load. Judge by how the solder flows, not the number
          alone. Irons with no temperature control at all have no way to react, so they drop the furthest.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="sponge">A soaking-wet sponge</StepHeading>
        <p className="text-muted leading-7">
          Wiping a tip on a sponge full of water chills it hard, and some people wipe before every joint.
          Boiling water off the tip is expensive in energy: it takes about 2,260 J to evaporate a single gram
          of water, so flashing off even a tenth of a gram costs roughly 226 J, several seconds of a 60 W
          iron&apos;s entire output. The sponge should be damp, wrung out until no water drips. Brass wool
          cleans without cooling the tip at all, which makes it the better choice if you clean often.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="supply">A USB-C or DC iron on a weak supply</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Portable irons take their power from whatever feeds them, so the same iron delivers less heat
          on a weaker supply. The Pinecil V2, for example, is specified at &ldquo;{pinecilPower}&rdquo;.
          USB-C Power Delivery offers fixed voltages, and at the common 3 A cable limit the available power is
          simply voltage times current: 9 V gives 27 W, 15 V gives 45 W, and 20 V gives 60 W. A charger or
          power bank that only offers the lower steps leaves the iron with less reserve, so it sags further on
          every joint. When a USB-C iron sags at home but not on its proper supply, the charger or cable is
          the bottleneck. Our guide to{" "}
          <Link href="/multimeters/usb-c-charger-not-delivering-full-power" className={link}>
            USB-C chargers that don&apos;t deliver full power
          </Link>{" "}
          explains how to check what the iron is actually being given.
        </p>
        <DataTable
          head={["USB-C PD level", "Arithmetic", "Max power"]}
          mono={[2]}
          rows={[
            ["9 V at 3 A", "9 × 3", "27 W"],
            ["15 V at 3 A", "15 × 3", "45 W"],
            ["20 V at 3 A", "20 × 3", "60 W"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={6} id="idle-drop">Sleep timers and faults when idle</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A reading that falls while the iron rests in its stand is often deliberate. Many stations and
          smart irons drop to a lower standby temperature after a period without movement, then reheat
          when you pick the handle up. X-Tronic, for example, states that the 3020-XTS sleeps and cools down
          after 10 minutes. Check the manual for a sleep or standby setting before suspecting a fault.
        </p>
        <p className="text-muted leading-7">
          If the temperature drifts down with no sleep mode involved, or the display jumps around
          while the tip temperature feels steady, suspect a loose tip, a poor connection in the handle
          cable, or a failing sensor or element. A resistance check of the element, done with the iron
          unplugged, is covered in{" "}
          <Link href="/soldering-irons/how-to-test-a-soldering-iron" className={link}>
            how to test a soldering iron
          </Link>
          . If the iron needs a new handpiece or the station itself is at fault, the maker&apos;s service
          center is the right call rather than opening a mains-powered station yourself.
        </p>
        <Callout title="Unplug before you open or measure anything">
          A soldering tip runs at several hundred degrees and stays hot enough to burn for minutes after you
          switch off. Never measure inside a mains-powered iron or station while it is plugged in, and let the
          tip cool before handling it. A cracked cable, melted handle or exposed conductor is a reason to stop
          using the iron, not to test it live; have it repaired by the maker or replaced.
        </Callout>
      </section>

      <section>
        <h2 id="irons" className="text-xl font-semibold mb-3">Irons that hold temperature</h2>
        <p className="text-muted leading-7 mb-4">
          If your current iron is simply underpowered for the work, the fix is more power behind a closed-loop
          controller, with tips large enough for your biggest joints. These picks come from our verified
          soldering iron list; the specs on each card are the maker&apos;s.
        </p>
        <ProductStrip
          title="Stations and irons with power in reserve"
          items={[
            {
              name: "Hakko FX-888DX",
              image: hakko.image,
              alt: "Hakko FX-888DX soldering station",
              href: "/soldering-irons/best-soldering-irons#hakko-fx-888dx",
              note: "100W station driving a 65W iron, closed-loop 50–480°C, ±1°C idle stability, T18 tips.",
            },
            {
              name: "Weller WE1010NA",
              image: weller.image,
              alt: "Weller WE1010NA soldering station",
              href: "/soldering-irons/weller-we1010na-review",
              note: "70W digital, ESD-safe bench station; Weller states about 28 s from 50 to 350°C.",
            },
            {
              name: "Pinecil V2",
              image: pinecil.image,
              alt: "Pinecil V2 portable USB-C soldering iron",
              href: "/soldering-irons/pinecil-v2-review",
              note: "Up to 88W at 24V DC, about 60W from 20V USB-C PD: its power depends on the supply.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
