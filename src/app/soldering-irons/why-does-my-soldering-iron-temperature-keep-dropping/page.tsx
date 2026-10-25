import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  HowToShell,
  InfoCards,
  KeyIdea,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-soldering-irons/page";

const description =
  "Why does my soldering iron temperature keep dropping? Tip size, wattage, sensor placement, a wet sponge, a weak USB-C supply or a sleep timer, and how to fix each.";

export const metadata = buildMetadata({
  title: "Why Does My Soldering Iron Temperature Drop?",
  description,
  path: "/soldering-irons/why-does-my-soldering-iron-temperature-keep-dropping",
});

const weller = picks.find((p) => p.name === "Weller WE1010NA")!;
const pinecil = picks.find((p) => p.name === "Pinecil V2")!;
const pinecilPower = pinecil.specs.find((s) => s.label === "Power")!.value;

const link = "text-accent hover:underline";

export default function WhyDoesMySolderingIronTemperatureKeepDroppingPage() {
  return (
    <HowToShell
      title="Why Does My Soldering Iron Temperature Keep Dropping?"
      description={description}
      path="/soldering-irons/why-does-my-soldering-iron-temperature-keep-dropping"
      category="soldering-irons"
      published="2026-10-25"
      intro={
        <>
          Every iron loses some heat the moment the tip touches a joint, because the joint soaks it up.
          What separates a good setup from a frustrating one is how far the temperature sags and how fast
          it comes back. If your display dives every time you touch a pad, or the reading drifts down
          while the iron sits in its stand, the cause is usually the tip, the power available, or a
          setting, not a broken iron. Here is how to tell which.
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
        { id: "thermal-load", label: "1. The joint needs more heat than the iron can give" },
        { id: "tip", label: "2. The tip is too small or touches too little" },
        { id: "sensor", label: "3. The display isn't measuring the very end of the tip" },
        { id: "sponge", label: "4. A soaking-wet sponge" },
        { id: "supply", label: "5. A USB-C or DC iron on a weak supply" },
        { id: "idle-drop", label: "6. Sleep timers and faults when idle" },
        { id: "quick-reference", label: "Quick reference" },
      ]}
      faq={[
        {
          q: "How much should the temperature drop when I touch a joint?",
          a: "There is no single number. It depends on the tip, the iron's power, how the controller reacts and how much copper is in the joint. What matters is the pattern: a brief dip that recovers within a second or two on small joints is normal, while a reading that falls and stays down on every joint means the iron can't keep up with the work.",
        },
        {
          q: "Should I just turn the temperature up to compensate?",
          a: "Only a little, and only after trying a bigger tip. A higher setpoint speeds up oxidation of the tip and flux burn-off, and on small parts it can damage pads and components. A wider tip that touches more of the joint usually fixes the sag without raising the setpoint at all.",
        },
        {
          q: "My iron has no temperature display. How do I know it's dropping?",
          a: "Watch the solder. If it melts readily on the first joint but turns sluggish or grainy on the next few, or a large joint never fully flows, the tip is cooling faster than the iron can reheat it. Irons with no temperature control can't push extra power back in when the tip cools, so this happens to them sooner.",
        },
        {
          q: "Can a failing heating element cause temperature drops?",
          a: "Yes, but rule out the simpler causes first. An element or sensor that is failing often shows up as an iron that heats slowly, never reaches the setpoint, or cuts in and out. The heating element's resistance can be checked with a multimeter while the iron is unplugged.",
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
              never fully recovers between joints (dashed line).
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
        <StepHeading n={1} id="thermal-load">The joint needs more heat than the iron can give</StepHeading>
        <p className="text-muted leading-7">
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
      </section>

      <section>
        <StepHeading n={2} id="tip">The tip is too small or touches too little</StepHeading>
        <p className="text-muted leading-7">
          Heat reaches the joint only through the area where tip and work touch, and a fine conical tip
          holds little heat of its own. On anything bigger than a small component lead, a fine point
          drains in a moment. Switching to a chisel or bevel tip that lies flat against the pad and the
          lead puts more heat in faster and gives the iron more stored heat to draw on. A thin layer of
          fresh solder on the tip also helps: molten solder bridges the gap between tip and work far
          better than a dry contact. A tip that is oxidised and won&apos;t hold solder transfers heat
          poorly, so clean and re-tin it first. See{" "}
          <Link href="/soldering-irons/why-wont-solder-stick-to-soldering-iron-tip" className={link}>
            why solder won&apos;t stick to the tip
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
          the controller doing its job. Judge by how the solder flows, not the number alone. Irons with
          no temperature control at all have no way to react, so they drop the furthest.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="sponge">A soaking-wet sponge</StepHeading>
        <p className="text-muted leading-7">
          Wiping a tip on a sponge full of water chills it hard, and some people wipe before every joint.
          The sponge should be damp, wrung out until no water drips. Brass wool cleans without cooling
          the tip at all, which makes it the better choice if you clean often.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="supply">A USB-C or DC iron on a weak supply</StepHeading>
        <p className="text-muted leading-7">
          Portable irons take their power from whatever feeds them, so the same iron delivers less heat
          on a weaker supply. The Pinecil V2, for example, is specified at &ldquo;{pinecilPower}&rdquo;.
          A charger or power bank that can only offer a lower voltage leaves even less. When a USB-C iron
          sags on joints at home but not on its proper supply, the charger or cable is the bottleneck. Our
          guide to{" "}
          <Link href="/multimeters/usb-c-charger-not-delivering-full-power" className={link}>
            USB-C chargers that don&apos;t deliver full power
          </Link>{" "}
          explains how to check what the iron is actually being given.
        </p>
      </section>

      <section>
        <StepHeading n={6} id="idle-drop">Sleep timers and faults when idle</StepHeading>
        <p className="text-muted leading-7">
          A reading that falls while the iron rests in its stand is often deliberate. Many stations and
          smart irons drop to a lower standby temperature after a period without movement, then reheat
          when you pick the handle up. Check the manual for a sleep or standby setting before suspecting a
          fault. If the temperature drifts down with no sleep mode involved, or the display jumps around
          while the tip temperature feels steady, suspect a loose tip, a poor connection in the handle
          cable, or a failing sensor or element. A resistance check of the element, done with the iron
          unplugged, is covered in{" "}
          <Link href="/soldering-irons/how-to-test-a-soldering-iron" className={link}>
            how to test a soldering iron
          </Link>
          .
        </p>
        <Callout title="Unplug before you open or measure anything">
          Never measure inside a mains-powered iron or station while it is plugged in, and let the tip
          cool before handling it. A cracked cable or exposed conductor is a reason to stop using the iron,
          not to test it live.
        </Callout>
      </section>

      <section>
        <h2 id="quick-reference" className="text-xl font-semibold mb-3">Quick reference</h2>
        <DataTable
          head={["What you see", "Likely cause", "First thing to try"]}
          rows={[
            ["Big drop on ground pads and thick wire only", "Joint needs more power than the iron gives", "Higher-wattage iron, or preheat the board"],
            ["Drop on every joint, even small ones", "Fine tip or poor contact", "Chisel tip, fresh solder on the tip"],
            ["Display steady but solder sluggish", "Tip end cooler than the sensor reading", "Larger tip; judge by solder flow"],
            ["Drop right after wiping", "Sponge too wet", "Wring the sponge out, or use brass wool"],
            ["USB-C iron weak on one charger only", "Supply offers less power", "Use a charger and cable that support the iron's full input"],
            ["Falls while resting in the stand", "Sleep or standby mode", "Check the standby setting in the manual"],
            ["Drifts down or flickers with no pattern", "Loose tip, cable or failing element", "Reseat the tip; test the element unplugged"],
          ]}
        />
        <KeyIdea title="Bigger tip before higher temperature">
          When the temperature sags on joints, the instinct is to turn the dial up. A tip that matches the
          joint, kept clean and tinned, fixes most cases without the extra oxidation and component stress
          a hotter setpoint brings.
        </KeyIdea>
      </section>
    </HowToShell>
  );
}
