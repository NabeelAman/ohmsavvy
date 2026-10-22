import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "Why a multimeter shows negative voltage: on DC mode it means the red probe is at a lower potential than the black one — reversing the probes flips the sign.";

export const metadata = buildMetadata({
  title: "Why Does My Multimeter Show Negative Voltage?",
  description,
  path: "/multimeters/why-does-my-multimeter-show-negative-voltage",
});

const fluke117 = picks.find((p) => p.name === "Fluke 117")!;

const link = "text-accent hover:underline";

export default function WhyDoesMyMultimeterShowNegativeVoltagePage() {
  return (
    <HowToShell
      title="Why Does My Multimeter Show Negative Voltage?"
      description={description}
      path="/multimeters/why-does-my-multimeter-show-negative-voltage"
      category="multimeters"
      published="2026-10-22"
      intro={
        <>
          On DC voltage mode, a negative sign simply means the probes are connected the opposite way
          round from the circuit&apos;s actual polarity at that point — the red probe is touching
          somewhere at a lower potential than the black probe. It&apos;s not a fault, and on a digital
          meter it causes no damage; the magnitude of the reading is identical either way, only the
          sign flips.
        </>
      }
      aside={{
        image: fluke117.image,
        alt: "Fluke 117 digital multimeter",
        caption: (
          <>
            Any digital multimeter&apos;s DC voltage mode handles reversed probes safely. See our{" "}
            <Link href="/multimeters/fluke-117-review" className={link}>
              Fluke 117 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-negative-means", label: "What the negative sign actually means" },
        { id: "common-situations", label: "Common situations where it shows up" },
        { id: "digital-vs-analog", label: "Digital meters vs. old analog meters" },
        { id: "ac-mode-difference", label: "Why AC mode never shows negative" },
        { id: "when-it-signals-a-problem", label: "When a negative reading does signal a problem" },
      ]}
      faq={[
        {
          q: "Does a negative voltage reading mean my circuit is broken?",
          a: "Not by itself. It only tells you which probe is at the higher potential — the circuit can be working exactly as designed. It's worth investigating further only if the sign or magnitude contradicts what the circuit's documentation or schematic says you should see at that point.",
        },
        {
          q: "Can reversed DC probes damage my multimeter?",
          a: "No, on a standard digital multimeter. The input circuitry handles either polarity on DC voltage mode without any risk — this is specifically one of the advantages digital meters have over old moving-coil analog meters, which could be damaged by a hard reverse-polarity deflection on some ranges.",
        },
        {
          q: "Why did my reading flip from positive to negative when I touched a different point?",
          a: "That's expected in an AC-to-DC circuit (like a bridge rectifier's output) or around any component where current direction reverses, such as during a switching cycle. The sign is simply tracking which side is instantaneously higher — probing a point on the other side of a component often flips it.",
        },
        {
          q: "Is there a difference between -5V and 5V with reversed probes?",
          a: "Electrically, no — both readings describe the exact same potential difference, just referenced from opposite probes. If a schematic specifically calls for a negative supply rail (common in op-amp circuits needing a dual supply), that's a genuinely different, intentionally negative voltage relative to the circuit's own ground — not just a probe-reversal artifact.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-measure-voltage-across-a-resistor",
          title: "How to Measure Voltage Across a Resistor",
          desc: "Probe polarity and what a negative reading means there specifically.",
        },
        {
          href: "/multimeters/how-to-test-a-bridge-rectifier-with-a-multimeter",
          title: "How to Test a Bridge Rectifier",
          desc: "A circuit where current direction — and therefore sign — reverses by design.",
        },
      ]}
    >
      <section>
        <h2 id="what-negative-means" className="text-xl font-semibold mb-3">What the negative sign actually means</h2>
        <p className="text-muted leading-7">
          A digital multimeter on DC voltage mode reports the potential at the red probe relative to
          the black probe. When the red probe is at a higher potential, the display reads positive;
          when it&apos;s at a lower potential than the black probe, the display reads negative. Swapping
          the two probes on the exact same two points simply flips the sign — the magnitude stays
          identical.
        </p>
        <Figure
          caption={
            <>
              The same two points, probed both ways. Swapping red and black doesn&apos;t change what&apos;s
              actually happening in the circuit — it only changes which probe the reading is measured
              relative to.
            </>
          }
        >
          <svg viewBox="0 0 300 120" className="w-full h-auto" role="img" aria-label="Diagram showing how swapping multimeter probes flips the sign of a DC voltage reading">
            <g className="stroke-foreground" strokeWidth="1.6" fill="none">
              <line x1="20" y1="40" x2="130" y2="40" />
              <line x1="170" y1="40" x2="280" y2="40" />
            </g>
            <circle cx="20" cy="40" r="4" className="fill-accent" />
            <circle cx="280" cy="40" r="4" className="fill-muted" />
            <text x="20" y="24" fontSize="10" textAnchor="middle" className="fill-accent">+ red</text>
            <text x="280" y="24" fontSize="10" textAnchor="middle" className="fill-muted">− black</text>
            <text x="150" y="44" fontSize="11" textAnchor="middle" className="fill-foreground">reads +5V</text>

            <g transform="translate(0,55)">
              <g className="stroke-foreground" strokeWidth="1.6" fill="none">
                <line x1="20" y1="40" x2="130" y2="40" />
                <line x1="170" y1="40" x2="280" y2="40" />
              </g>
              <circle cx="20" cy="40" r="4" className="fill-muted" />
              <circle cx="280" cy="40" r="4" className="fill-accent" />
              <text x="20" y="24" fontSize="10" textAnchor="middle" className="fill-muted">− black</text>
              <text x="280" y="24" fontSize="10" textAnchor="middle" className="fill-accent">+ red</text>
              <text x="150" y="44" fontSize="11" textAnchor="middle" className="fill-foreground">reads −5V</text>
            </g>
          </svg>
        </Figure>
      </section>

      <section>
        <h2 id="common-situations" className="text-xl font-semibold mb-3">Common situations where it shows up</h2>
        <DataTable
          head={["Situation", "Why the sign flips"]}
          rows={[
            ["Probing a battery with leads swapped", "Red probe simply landed on the negative terminal"],
            ["Measuring across a resistor with assumed current direction wrong", "Actual current flows the opposite way to what you expected"],
            ["Checking a bridge rectifier's output pins", "Current direction through each internal diode alternates by design"],
            ["Probing a dual-supply op-amp circuit's negative rail", "A genuinely negative voltage relative to the circuit's own ground — not a probe artifact"],
          ]}
        />
      </section>

      <section>
        <h2 id="digital-vs-analog" className="text-xl font-semibold mb-3">Digital meters vs. old analog meters</h2>
        <p className="text-muted leading-7">
          This is one area where digital meters are simply easier to use than the moving-coil analog
          meters they&apos;ve mostly replaced. An analog meter&apos;s needle physically deflects in one
          direction only; reversed polarity drives it hard against the mechanical stop, which can
          damage the movement on some ranges. A digital meter has no such risk — it just displays a
          minus sign and the correct magnitude, regardless of which way the probes are connected.
        </p>
      </section>

      <section id="ac-mode-difference">
        <Callout title="Why AC mode never shows a negative sign">
          AC voltage is, by definition, constantly reversing direction many times a second, so a
          meaningful single sign doesn&apos;t apply the way it does to a steady DC level. AC voltage
          mode reports a magnitude (typically the RMS value) with no sign at all — if you&apos;re
          expecting to see &quot;negative AC,&quot; that&apos;s not how the measurement works; see our{" "}
          <Link href="/oscilloscopes/oscilloscope-vs-multimeter" className="underline">
            oscilloscope vs multimeter
          </Link>{" "}
          guide if you need to see the actual shape of a signal that reverses over time.
        </Callout>
      </section>

      <section>
        <h2 id="when-it-signals-a-problem" className="text-xl font-semibold mb-3">When a negative reading does signal a problem</h2>
        <p className="text-muted leading-7">
          Treat it as a real issue only when it contradicts what the circuit is supposed to do at that
          exact point — for example, a supply rail that a schematic specifies as positive relative to
          ground reading persistently negative, or a reading that flips unexpectedly compared to a
          known-good reference unit. In those cases the polarity itself is informative and worth
          following up, rather than just a result of probe placement.
        </p>
      </section>

      <KeyIdea title="The quick check">
        If a negative reading surprises you, swap the two probes on the same two points before assuming
        anything is wrong. If the sign simply flips back to positive with the same magnitude, the
        circuit is behaving normally — you were just reading it backward.
      </KeyIdea>
    </HowToShell>
  );
}
