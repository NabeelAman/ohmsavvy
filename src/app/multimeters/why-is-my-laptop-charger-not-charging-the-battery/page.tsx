import Link from "next/link";
import { Callout, DataTable, Figure, HowToShell, KeyIdea, ProductStrip, StepHeading } from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "Why a laptop charger isn't charging: measure the adapter's open-circuit output voltage at the connector before suspecting the laptop itself.";

export const metadata = buildMetadata({
  title: "Why Isn't My Laptop Charger Charging?",
  description,
  path: "/multimeters/why-is-my-laptop-charger-not-charging-the-battery",
});

const fluke117 = picks.find((p) => p.name === "Fluke 117")!;

const link = "text-accent hover:underline";

export default function WhyIsMyLaptopChargerNotChargingPage() {
  return (
    <HowToShell
      title="Why Is My Laptop Charger Not Charging the Battery? How to Test the Adapter"
      description={description}
      published="2026-10-25"
      path="/multimeters/why-is-my-laptop-charger-not-charging-the-battery"
      category="multimeters"
      intro={
        <>
          For a traditional barrel-connector charger, measuring open-circuit DC voltage right at the
          connector tip is a safe, direct way to confirm the adapter itself is producing its rated output.
          For USB-C chargers, voltage alone is less conclusive since USB Power Delivery negotiates voltage
          digitally — if your charger is specifically USB-C, see{" "}
          <Link href="/multimeters/usb-c-charger-not-delivering-full-power" className="text-accent hover:underline">
            USB-C charger not delivering full power
          </Link>{" "}
          for that case instead.
        </>
      }
      aside={{
        image: fluke117.image,
        alt: "Fluke 117 digital multimeter with test leads",
        caption: (
          <>
            The Fluke 117 reads a barrel-connector adapter&apos;s output cleanly. See our{" "}
            <Link href="/multimeters/fluke-117-review" className={link}>
              Fluke 117 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "check-the-rating-label", label: "Check the rating label" },
        { id: "measure-output-voltage", label: "Measure the adapter's output voltage" },
        { id: "check-the-cable-and-connector", label: "Check the cable and connector" },
        { id: "what-voltage-alone-cant-tell-you", label: "What voltage alone can't tell you" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "Is it safe to probe a laptop charger's barrel connector?",
          a: "Yes, for a simple open-circuit voltage reading — touch the meter's probes to the connector's tip (usually positive) and outer sleeve (usually negative; check your adapter's polarity symbol) with nothing else connected. This is a low-risk, standard DC voltage measurement.",
        },
        {
          q: "What should the adapter's output voltage read?",
          a: "It should be close to the voltage printed on the adapter's label — for example, an adapter rated 19V should read close to 19V DC with nothing connected. A reading significantly off that number, or 0 V, means the adapter itself has failed.",
        },
        {
          q: "The adapter reads the correct voltage but the laptop still won't charge — what next?",
          a: "Check the cable for damage (especially near the connector ends, where cables flex most and fail most often), then try a different outlet, in case the issue is upstream. If those check out, the fault is likely inside the laptop's charging circuit or battery itself rather than the adapter.",
        },
        {
          q: "Can a laptop battery fail in a way that looks like a charger problem?",
          a: "Yes — many laptops will show a 'not charging' or 'plugged in, not charging' status specifically when the battery itself has failed or is severely degraded, even with a perfectly good adapter. If the adapter tests correctly and a different known-good adapter shows the same symptom, suspect the battery.",
        },
        {
          q: "Why does my adapter read the correct voltage but feel warm or buzz?",
          a: "Mild warmth under load is normal for many adapters, but noticeable heat, a burning smell, or an audible buzz/hum suggests internal component stress or failure that voltage alone won't reveal, even if the output currently measures correctly. Stop using an adapter showing these signs regardless of what it measures.",
        },
      ]}
      next={[
        {
          href: "/multimeters/usb-c-charger-not-delivering-full-power",
          title: "USB-C Charger Not Delivering Full Power",
          desc: "The USB-C-specific version of this problem, where voltage negotiation complicates a simple reading.",
        },
        {
          href: "/multimeters/how-to-check-a-12v-power-supply-under-load",
          title: "How to Check a 12V Power Supply Under Load",
          desc: "A related test for a different class of DC adapter.",
        },
      ]}
    >
      <Callout title="Only measure open-circuit voltage; don't probe inside the laptop">
        <ul className="space-y-2 list-disc pl-5">
          <li>Measure the adapter&apos;s output with nothing plugged into the laptop — an open-circuit voltage reading at the connector tip.</li>
          <li>Don&apos;t open the laptop or probe its internal charging circuitry unless you&apos;re specifically qualified to do so.</li>
          <li>Check the adapter&apos;s polarity symbol before probing, so you know which part of the connector is positive.</li>
        </ul>
      </Callout>

      <section>
        <StepHeading n={1} id="check-the-rating-label">Check the rating label</StepHeading>
        <p className="text-muted leading-7">
          Read the output voltage and current printed on the adapter itself (often something like
          &quot;Output: 19V, 3.42A&quot;). This is the number you&apos;re testing against — there isn&apos;t
          one universal voltage across all laptop chargers.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="measure-output-voltage">Measure the adapter&apos;s output voltage</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With the adapter plugged into power but not connected to the laptop, set the meter to DC volts and
          touch the probes to the connector tip and outer sleeve (check the polarity symbol on the label
          first).
        </p>
        <DataTable
          head={["Reading", "Likely meaning"]}
          rows={[
            ["Close to the rated voltage", "Adapter output is healthy"],
            ["Noticeably low or unstable", "Failing adapter — internal component degradation"],
            ["0 V", "Dead adapter, or a break in the cable before the connector"],
          ]}
        />
        <div className="mt-6">
          <Figure
            caption={
              <>
                Probing a center-positive barrel plug: red probe inside the tip, black probe on the outer
                sleeve, laptop disconnected. The two strain-relief zones are where a cable usually breaks.
              </>
            }
          >
            <svg viewBox="0 0 340 170" className="w-full h-auto" role="img" aria-label="Diagram of a laptop adapter brick with its cable running to a barrel plug; the red meter probe touches the center tip marked positive and the black probe touches the outer sleeve marked negative, and the two cable ends near the brick and the plug are highlighted as the most common break points">
              <g className="stroke-foreground" strokeWidth="1.6" fill="none">
                <rect x="14" y="50" width="70" height="44" rx="6" />
                <path d="M84 72 C 130 72, 150 40, 200 60 S 240 72, 250 72" />
                <rect x="250" y="62" width="40" height="20" rx="3" />
                <line x1="290" y1="66" x2="306" y2="66" />
                <line x1="290" y1="78" x2="306" y2="78" />
              </g>
              <g className="stroke-accent" strokeWidth="2" fill="none" strokeDasharray="3 3">
                <circle cx="94" cy="72" r="12" />
                <circle cx="240" cy="72" r="12" />
              </g>
              <text x="49" y="76" fontSize="10" textAnchor="middle" className="fill-foreground">adapter</text>
              <text x="49" y="110" fontSize="9" textAnchor="middle" className="fill-muted">label: e.g. 19 V</text>
              <text x="167" y="108" fontSize="9" textAnchor="middle" className="fill-accent">flex points: breaks happen here</text>
              <circle cx="310" cy="72" r="3" className="fill-accent" />
              <line x1="310" y1="72" x2="310" y2="30" className="stroke-accent" strokeWidth="1.6" />
              <text x="310" y="24" fontSize="10" textAnchor="middle" className="fill-accent">red: tip (+)</text>
              <line x1="300" y1="80" x2="300" y2="130" className="stroke-foreground" strokeWidth="1.6" />
              <text x="300" y="144" fontSize="10" textAnchor="middle" className="fill-foreground">black: sleeve (−)</text>
              <text x="14" y="160" fontSize="9" className="fill-muted">Meter on DC V; polarity per the symbol on the label</text>
            </svg>
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The polarity symbol on the label (a dot inside a C shape, with + and − at the ends) tells you which
          contact is positive. Most laptop bricks are center-positive, so a correctly connected meter shows a
          positive number. If the display shows a minus sign in front of the rated voltage, the probes are
          simply reversed; the adapter is still producing its output, and the reading is just as valid.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="check-the-cable-and-connector">Check the cable and connector</StepHeading>
        <p className="text-muted leading-7">
          If voltage reads 0 V or unstable, gently flex the cable near both ends while watching the meter —
          a reading that comes and goes with flexing points to a broken conductor inside the cable, most
          often right where it exits the adapter brick or the connector itself, since those are the points
          under the most repeated stress.
        </p>
        <div className="mt-4">
          <KeyIdea title="Try a known-good cable or adapter if you have one">
            Swapping in a compatible cable or adapter you know works is often the fastest way to confirm
            whether the fault is in the adapter, the cable, or the laptop itself.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 id="what-voltage-alone-cant-tell-you" className="text-xl font-semibold mb-3">What voltage alone can&apos;t tell you</h2>
        <p className="text-muted leading-7">
          A correct open-circuit voltage confirms the adapter can produce its rated voltage with no load, but
          doesn&apos;t fully confirm it can supply its rated current once the laptop actually draws power.
          An adapter that reads correct voltage but still can&apos;t charge the laptop, especially under
          heavier use, may still be failing under real load — a symptom voltage alone won&apos;t always
          catch.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which meter to use</h2>
        <p className="text-muted leading-7 mb-6">
          Any meter with a DC volts range handles this test. See the full{" "}
          <Link href="/multimeters/best-multimeters" className={link}>
            best multimeters
          </Link>{" "}
          roundup.
        </p>
        <ProductStrip
          title="Meters in our reviews"
          items={[
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 digital multimeter",
              href: "/multimeters/fluke-117-review",
              note: "Auto-ranging DC volts, reads adapter output cleanly.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
