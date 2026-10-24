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
import { picks } from "../best-multimeters/page";

const description =
  "Why does a car fuse have power on one side only? Test each side to ground to tell a blown fuse from a switched, relay-fed or unloaded circuit.";

export const metadata = buildMetadata({
  title: "Car Fuse Has Power on One Side Only?",
  description,
  path: "/multimeters/car-fuse-power-on-one-side-only",
});

const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;

const link = "text-accent hover:underline";

export default function CarFusePowerOnOneSideOnlyPage() {
  return (
    <HowToShell
      title="Why Does My Car Fuse Have Power on One Side Only? How to Test It"
      description={description}
      path="/multimeters/car-fuse-power-on-one-side-only"
      category="multimeters"
      published="2026-10-24"
      intro={
        <>
          You probe a car fuse with a test light or meter and find voltage on one tab but nothing on the
          other. Most of the time that means the fuse has blown, but not always. A fuse can also show power
          on one side only because the circuit feeding it is switched off, because a relay upstream has not
          closed, or because your probe point is the wrong end of the fuse. This guide shows how to test
          each side to ground and tell those cases apart.
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
        { id: "what-each-side-means", label: "What each side of a fuse is" },
        { id: "verify-ground", label: "Verify your ground first" },
        { id: "probe-each-side", label: "Probe each side to ground" },
        { id: "switched-and-relay-fed", label: "Ignition-switched and relay-fed fuses" },
        { id: "results-table", label: "What the readings mean" },
        { id: "both-sides-live", label: "Both sides live, circuit still dead" },
      ]}
      faq={[
        {
          q: "If only one side of the fuse has power, is the fuse definitely blown?",
          a: "Only if the side with power is the supply side and the circuit is switched on. If power appears on the input tab and nothing on the output tab, the element is open and the fuse needs replacing. Confirm by pulling it and checking continuity before you buy parts, and look for the short that blew it.",
        },
        {
          q: "Why do some fuses have no power on either side with the key off?",
          a: "Many fuses are fed through the ignition switch or a relay, so their supply bus is dead until the key is in run or accessory, or until the module energizes the relay. Check the fuse box lid or the wiring diagram to see which fuses are always hot and which are switched.",
        },
        {
          q: "Can a test light give a different answer than a multimeter on a fuse?",
          a: "Yes. A meter has very high input impedance, so it can show voltage through a corroded or nearly open connection that cannot carry real current. A test light draws a small current, so a weak feed may make it glow dimly or not at all. If the two disagree, suspect a high-resistance connection upstream.",
        },
        {
          q: "Why did the new fuse blow as soon as I put it in?",
          a: "A replacement fuse that opens immediately or when a switch is turned on points to a short to ground somewhere downstream, such as a chafed wire, a failed motor or a water-damaged connector. Never fit a higher-rated fuse to stop it blowing; find the short instead.",
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
      ]}
    >
      <Callout title="Before you probe the fuse box">
        Use the meter on DC volts with the red lead in the V jack, never the current jack. Keep metal
        probes from bridging two adjacent fuse tabs, and don&apos;t back-probe airbag circuits (usually
        marked with yellow connectors or labels on the fuse lid): your service manual explains how those
        must be tested.
      </Callout>

      <section>
        <h2 id="what-each-side-means" className="text-xl font-semibold mb-3">What each side of a fuse is</h2>
        <p className="text-muted leading-7 mb-4">
          Every fuse sits in series between a supply and a load. One tab connects to the feed, usually a
          busbar inside the fuse box; the other tab connects to the wire running out to the circuit it
          protects. Current enters on the supply side, passes through the thin metal element and leaves on
          the load side. Most modern blade fuses have small test points exposed on top, one per tab, so
          you can probe both without pulling the fuse.
        </p>
        <p className="text-muted leading-7">
          When the element is intact, both tabs sit at the same potential, so you read essentially the
          same voltage to ground on each. When it has melted open, the supply tab still reads battery
          voltage, but the load tab is cut off. It reads close to 0 V, because
          the load connects it to ground.
        </p>
        <Figure
          caption={
            <>
              Measuring each tab to a chassis ground. With an intact fuse, both tabs read supply voltage.
              With an open element, only the supply tab does; the load pulls the other tab to 0 V.
            </>
          }
        >
          <svg viewBox="0 0 320 150" className="w-full h-auto" role="img" aria-label="Diagram showing a fuse between a supply bus and a load, with each fuse tab measured to chassis ground">
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
      </section>

      <section>
        <StepHeading n={1} id="verify-ground">Verify your ground first</StepHeading>
        <p className="text-muted leading-7">
          A one-sided reading is only meaningful if your reference is solid. Clip the black lead to the
          battery negative post or a known-good chassis ground stud, not a painted bracket. Then touch the
          red probe to the battery positive post: you should see full battery voltage. With a test light,
          clip it to ground and touch the battery positive; it should light brightly. If it doesn&apos;t,
          your ground point is the problem, and every reading after this would mislead you.
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
        <p className="text-muted leading-7">
          If one side is live and the other is dead, pull the fuse and inspect it, then confirm with a
          continuity check. A reading of OL across a removed fuse confirms the element is open; see{" "}
          <Link href="/multimeters/what-does-ol-mean-on-a-multimeter" className={link}>
            what OL means on a multimeter
          </Link>
          . If you prefer to keep the fuse in place, the{" "}
          <Link href="/multimeters/how-to-test-a-fuse-without-removing-it" className={link}>
            across-the-fuse voltage method
          </Link>{" "}
          gives the same answer by reading the difference between the two tabs directly.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="switched-and-relay-fed">Check whether the fuse is ignition-switched or relay-fed</StepHeading>
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
          service manual tells you which group each fuse belongs to.
        </p>
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
        <p className="text-muted leading-7 mt-4">
          The last row catches people out. With the component switched off, nothing pulls the load side to
          ground firmly, so a blown fuse can show a stray, unstable reading on its dead side. Switch the
          load on and repeat; the dead side should then fall to zero.
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
    </HowToShell>
  );
}
