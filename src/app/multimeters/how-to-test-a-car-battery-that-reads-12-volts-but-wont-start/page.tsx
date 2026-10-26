import Link from "next/link";
import { Callout, DataTable, Figure, HowToShell, KeyIdea, ProductStrip, StepHeading } from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "Why a battery can read 12 volts and still not start the car: resting voltage shows charge, not cranking ability — here's the load test that does.";

export const metadata = buildMetadata({
  title: "Battery Reads 12V but Won't Start: What to Test",
  description,
  path: "/multimeters/how-to-test-a-car-battery-that-reads-12-volts-but-wont-start",
});

const craftsman = picks.find((p) => p.name === "Craftsman CMMT14171")!;
const fluke117 = picks.find((p) => p.name === "Fluke 117")!;

const link = "text-accent hover:underline";

export default function BatteryReads12VButWontStartPage() {
  return (
    <HowToShell
      title="How to Test a Car Battery That Reads 12 Volts but Won't Start"
      description={description}
      published="2026-10-25"
      path="/multimeters/how-to-test-a-car-battery-that-reads-12-volts-but-wont-start"
      category="multimeters"
      intro={
        <>
          12 V at rest only tells you the battery has some charge — it says nothing about whether it can
          deliver the hundreds of amps a starter demands. The fix is a cranking-voltage load test: watch
          voltage while the engine is actually cranked, rather than trusting the resting number alone. If
          this is a brand-new battery doing the same thing, see{" "}
          <Link href="/multimeters/car-no-crank-with-a-new-battery" className="text-accent hover:underline">
            no-crank with a new battery
          </Link>{" "}
          for causes specific to that case.
        </>
      }
      aside={{
        image: craftsman.image,
        alt: "Craftsman CMMT14171 automotive digital multimeter",
        caption: (
          <>
            The Craftsman CMMT14171 handles cranking-voltage tests well. See our{" "}
            <Link href="/multimeters/craftsman-cmmt14171-review" className={link}>
              Craftsman CMMT14171 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "why-resting-voltage-misleads", label: "Why resting voltage can mislead you" },
        { id: "cranking-test", label: "Run the cranking-voltage test" },
        { id: "check-connections", label: "Check the terminals and cables too" },
        { id: "interpreting-results", label: "Interpreting the results" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "Can a battery with a dead cell still read close to 12 volts?",
          a: "Yes. A 12V lead-acid battery has six 2V cells in series; one failed cell can drop total resting voltage to somewhere around 10 V in an obvious case, but a cell that's weak rather than fully dead can sometimes still produce a reading closer to 12 V at rest while being completely unable to deliver real current — which is exactly why a load test matters more than the static number.",
        },
        {
          q: "I jump-started the car and it ran fine — doesn't that prove the battery works?",
          a: "Not necessarily; a jump start brings in the other vehicle's battery and alternator to supply the actual cranking current, so the car can start even with a battery that couldn't have done it alone. Test the battery on its own, disconnected from any jump, for a true result.",
        },
        {
          q: "Could corroded terminals cause this even with a genuinely good battery?",
          a: "Yes — corrosion or looseness at the battery terminals adds resistance exactly like a weak battery would, dropping voltage right where the cable meets the post under heavy cranking current. Clean and tighten the terminals and retest before replacing a battery that might be fine.",
        },
        {
          q: "Does cold weather make a borderline battery look worse than it is?",
          a: "Cold doesn't make it look worse than it is — it genuinely reduces a battery's real capacity to deliver current while simultaneously increasing the current the engine needs to crank (thicker oil, more resistance). A battery that passes in summer can fail in winter for exactly this reason, so a cold-weather failure is a real failure, not a false alarm.",
        },
        {
          q: "If the cranking test passes, what else could stop the car from starting?",
          a: "A battery that holds up fine under cranking load rules out the battery as the cause — look at the starter circuit, ignition system, or fuel delivery next, depending on what the engine actually does (or doesn't do) when you turn the key.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-12v-battery-under-load",
          title: "How to Test a 12V Battery Under Load",
          desc: "Multimeter cranking test compared with a dedicated battery or conductance tester.",
        },
        {
          href: "/multimeters/why-does-my-car-starter-click-but-the-engine-wont-start",
          title: "Why Does My Car Starter Click but the Engine Won't Start?",
          desc: "If the starter itself clicks rather than turning silently with no sound at all.",
        },
      ]}
    >
      <Callout title="Keep clear of moving parts while cranking">
        <ul className="space-y-2 list-disc pl-5">
          <li>Connect meter leads securely before cranking; don&apos;t reach into the engine bay while it&apos;s being cranked.</li>
          <li>Keep hands and tools away from the battery terminals during testing.</li>
          <li>Don&apos;t load-test a battery that&apos;s visibly cracked, swollen, or leaking — replace it instead.</li>
        </ul>
      </Callout>

      <section>
        <StepHeading n={1} id="why-resting-voltage-misleads">Why resting voltage can mislead you</StepHeading>
        <p className="text-muted leading-7">
          Resting voltage is measured with essentially no current flowing, so it mainly reflects state of
          charge. A battery with internal damage can still hold a surface charge that shows a reasonable
          resting voltage, then collapse the instant real current is demanded — which a no-load reading
          simply cannot reveal.
        </p>
        <div className="mt-6">
          <Figure
            caption={
              <>
                A battery behaves like an ideal voltage source with a small internal resistance in series. At
                rest almost no current flows, so the meter sees the full source voltage; during cranking the
                starter&apos;s heavy current drops part of that voltage inside the battery itself.
              </>
            }
          >
            <svg viewBox="0 0 340 180" className="w-full h-auto" role="img" aria-label="Circuit model of a car battery: an ideal 12.6 volt cell in series with an internal resistance, connected through a switch to the starter motor; a meter across the battery terminals reads 12.6 volts with the switch open and a lower voltage while cranking because of the drop across the internal resistance">
              <rect x="20" y="24" width="120" height="120" rx="6" className="stroke-muted" strokeWidth="1.2" fill="none" strokeDasharray="4 3" />
              <g className="stroke-foreground" strokeWidth="1.6" fill="none">
                <line x1="60" y1="60" x2="80" y2="60" />
                <line x1="64" y1="68" x2="76" y2="68" />
                <line x1="70" y1="40" x2="70" y2="60" />
                <line x1="70" y1="68" x2="70" y2="84" />
                <path d="M70 84 l6 4 l-12 6 l12 6 l-12 6 l6 4" />
                <line x1="70" y1="110" x2="70" y2="130" />
                <line x1="70" y1="40" x2="140" y2="40" />
                <line x1="70" y1="130" x2="140" y2="130" />
                <line x1="140" y1="40" x2="230" y2="40" />
                <line x1="230" y1="40" x2="250" y2="30" />
                <line x1="258" y1="40" x2="290" y2="40" />
                <circle cx="290" cy="85" r="18" />
                <line x1="290" y1="40" x2="290" y2="67" />
                <line x1="290" y1="103" x2="290" y2="130" />
                <line x1="140" y1="130" x2="290" y2="130" />
              </g>
              <text x="92" y="68" fontSize="9" className="fill-foreground">12.6 V cell</text>
              <text x="84" y="101" fontSize="9" className="fill-accent">R internal</text>
              <text x="80" y="18" fontSize="9" textAnchor="middle" className="fill-muted">inside the battery</text>
              <text x="244" y="22" fontSize="9" textAnchor="middle" className="fill-muted">key</text>
              <text x="290" y="89" fontSize="9" textAnchor="middle" className="fill-foreground">starter</text>
              <circle cx="140" cy="40" r="3" className="fill-accent" />
              <circle cx="140" cy="130" r="3" className="fill-accent" />
              <text x="160" y="80" fontSize="9" className="fill-accent">meter here</text>
              <text x="20" y="162" fontSize="9" className="fill-muted">Rest: ~0 A, reads 12.6 V. Cranking: I × R lost inside</text>
            </svg>
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Here&apos;s a worked example with illustrative round numbers, not measurements. Assume the starter
          draws 200 A. A healthy battery with an internal resistance of about 0.01 Ω loses 200 × 0.01 = 2 V
          inside itself, so the terminals sit near 10.6 V while cranking. A sulfated or damaged battery that
          has climbed to 0.02 Ω loses 4 V and falls to about 8.6 V, below the common 9.6 V pass line, yet both
          batteries show the same 12.6 V on the meter when nothing is drawing current.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="cranking-test">Run the cranking-voltage test</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Connect the meter across the battery terminals, set to DC volts, and have someone crank the engine
          (or use min/max capture if testing alone) while you watch the lowest voltage reached.
        </p>
        <DataTable
          head={["Cranking voltage (12V battery, ~70°F / 21°C)", "Interpretation"]}
          rows={[
            ["Stays above about 9.6 V", "Battery is delivering adequate cranking current"],
            ["Drops below 9.6 V, engine cranks slowly or not at all", "Battery likely can't deliver enough current — further test with a dedicated tester"],
            ["Drops to near 0 V instantly", "Severe internal fault or an open connection somewhere in the circuit"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={3} id="check-connections">Check the terminals and cables too</StepHeading>
        <p className="text-muted leading-7">
          Before condemning the battery, inspect and clean the terminal connections — corrosion or looseness
          here can produce the exact same symptom as a weak battery. If cranking voltage improves noticeably
          after cleaning and tightening the terminals, the connection was the real problem.
        </p>
        <div className="mt-4">
          <KeyIdea title="A 'good' battery tester reading doesn't always settle it">
            Some basic testers only check resting voltage or a light electronic estimate rather than a true
            load. If a tester says the battery is fine but it still won&apos;t crank the engine reliably, trust
            the actual cranking-voltage behavior over the tester&apos;s summary.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 id="interpreting-results" className="text-xl font-semibold mb-3">Interpreting the results, put together</h2>
        <p className="text-muted leading-7">
          Good cranking voltage with clean, tight connections and the car still not starting points away
          from the battery — toward the starter, ignition, or fuel system. Poor cranking voltage that
          improves after cleaning the terminals was a connection issue. Poor cranking voltage even with
          clean connections and a recent full charge points to the battery itself needing replacement.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which meter to use</h2>
        <p className="text-muted leading-7 mb-6">
          A meter with min/max capture makes a solo cranking test much easier. See the full{" "}
          <Link href="/multimeters/best-multimeter-for-automotive" className={link}>
            best multimeter for automotive
          </Link>{" "}
          picks.
        </p>
        <ProductStrip
          title="Meters in our reviews"
          items={[
            {
              name: "Craftsman CMMT14171",
              image: craftsman.image,
              alt: "Craftsman CMMT14171 automotive digital multimeter",
              href: "/multimeters/craftsman-cmmt14171-review",
              note: "Built for cranking and battery diagnosis.",
            },
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 digital multimeter",
              href: "/multimeters/fluke-117-review",
              note: "Min/max recording catches the cranking voltage dip.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
