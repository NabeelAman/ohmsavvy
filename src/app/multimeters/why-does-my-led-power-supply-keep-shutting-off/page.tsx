import Link from "next/link";
import { Callout, DataTable, Figure, HowToShell, KeyIdea, ProductStrip, StepHeading } from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "Why an LED power supply keeps shutting off: check the connected load against its rated wattage, measure output voltage at shutdown, and check for overheating.";

export const metadata = buildMetadata({
  title: "Why Does My LED Power Supply Shut Off?",
  description,
  path: "/multimeters/why-does-my-led-power-supply-keep-shutting-off",
});

const fluke117 = picks.find((p) => p.name === "Fluke 117")!;

const link = "text-accent hover:underline";

export default function WhyDoesMyLedPowerSupplyKeepShuttingOffPage() {
  return (
    <HowToShell
      title="Why Does My LED Power Supply Keep Shutting Off? How to Troubleshoot It"
      description={description}
      published="2026-10-25"
      path="/multimeters/why-does-my-led-power-supply-keep-shutting-off"
      category="multimeters"
      intro={
        <>
          Most LED drivers shut themselves off deliberately — as a protection response to overload,
          overheating, or an output short — rather than simply failing outright. Comparing your connected
          LED load&apos;s total wattage against the driver&apos;s rated capacity, and checking output voltage
          right as it shuts down, usually points straight at which protection feature is tripping.
        </>
      }
      aside={{
        image: fluke117.image,
        alt: "Fluke 117 digital multimeter with test leads",
        caption: (
          <>
            The Fluke 117 reads both the driver&apos;s input and output cleanly. See our{" "}
            <Link href="/multimeters/fluke-117-review" className={link}>
              Fluke 117 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "check-the-load-wattage", label: "Check your LED load's total wattage" },
        { id: "measure-output-at-shutdown", label: "Measure output voltage right at shutdown" },
        { id: "check-for-overheating", label: "Check for overheating" },
        { id: "check-for-a-short", label: "Check for a short in the LED circuit" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "How do I know if I'm overloading the driver?",
          a: "Add up the rated wattage of every LED strip or fixture connected to the driver and compare the total against the driver's maximum rated output wattage, printed on its label. Running right at or above that limit is a common and simple cause of repeated shutdowns, especially after adding more LEDs to an existing run.",
        },
        {
          q: "Why would a driver work fine for a while, then start shutting off?",
          a: "Thermal protection is a common cause: a driver installed in a poorly ventilated space can run fine when the surrounding temperature is cool, then start tripping its thermal protection once ambient temperature rises (seasonally, or simply after running for a longer stretch). Check the installation location's ventilation if shutdowns correlate with heat.",
        },
        {
          q: "Could a short in the LED strip itself cause the driver to shut down?",
          a: "Yes — a damaged LED strip with a short somewhere along its length can trip a driver's short-circuit or overcurrent protection, shutting it down even though the driver itself is healthy. Disconnect sections of the LED run and reconnect them one at a time to isolate a shorted section.",
        },
        {
          q: "Does cutting an LED strip at the wrong point cause this kind of problem?",
          a: "Yes, if cut somewhere other than the marked cut points (usually indicated by a line and scissor icon on the strip), you can create a short or an open circuit at that exact spot. Inspect any recently cut ends closely if the problem started after modifying the strip length.",
        },
        {
          q: "My driver has a cooling fan — could that be the actual problem?",
          a: "Yes — a failed or clogged cooling fan on a driver that relies on active cooling can cause it to overheat and shut down even under a normal load it would otherwise handle fine. Check that any fan is spinning freely and that vents aren't blocked by dust.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-an-led-strip-with-a-multimeter",
          title: "How to Test an LED Strip With a Multimeter",
          desc: "For isolating a fault in the LED load itself rather than the driver.",
        },
        {
          href: "/multimeters/how-to-test-a-dc-power-supply-with-a-multimeter",
          title: "How to Test a DC Power Supply With a Multimeter",
          desc: "The general voltage-and-stability test this guide's checks are built on.",
        },
      ]}
    >
      <Callout title="Let a hot driver cool before touching it">
        <ul className="space-y-2 list-disc pl-5">
          <li>Allow a driver that&apos;s shut down from overheating to cool before handling it.</li>
          <li>Disconnect power before inspecting or reconnecting any LED strip sections.</li>
          <li>Don&apos;t exceed the driver&apos;s rated wattage even temporarily to &quot;test&quot; whether it holds.</li>
        </ul>
      </Callout>

      <section>
        <StepHeading n={1} id="check-the-load-wattage">Check your LED load&apos;s total wattage</StepHeading>
        <p className="text-muted leading-7">
          Add up the rated wattage of every strip or fixture connected to the driver, including anything
          added since the system last worked reliably, and compare the total against the driver&apos;s
          maximum rated output. A load at or beyond that limit is one of the most common, simplest causes of
          repeated shutdowns.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="measure-output-at-shutdown">Measure output voltage right at shutdown</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With the meter connected across the driver&apos;s DC output and the system running, watch the
          voltage as the shutdown occurs (or immediately check it right after). Output voltage dropping to
          0 V at the moment of shutdown is the expected behavior of a driver&apos;s protection circuit
          doing its job.
        </p>
        <DataTable
          head={["Pattern observed", "Likely cause"]}
          rows={[
            ["Shuts off quickly, cools, then works again briefly", "Thermal protection — check ventilation and ambient temperature"],
            ["Shuts off the moment load is applied", "Overload or a short somewhere in the connected LEDs"],
            ["Shuts off randomly with no clear pattern", "Possible internal driver fault — consider a replacement"],
            ["Output voltage never recovers after shutdown", "Driver has failed outright, not just tripped a protection feature"],
          ]}
        />
        <div className="mt-6">
          <Figure
            caption={
              <>
                Two protection signatures as seen on the output voltage (schematic, not to scale). Overload or
                short protection often &quot;hiccups&quot;: rapid off-and-retry cycles that make LEDs blink. Thermal
                shutdown comes after a long run and stays off until the driver cools.
              </>
            }
          >
            <svg viewBox="0 0 340 190" className="w-full h-auto" role="img" aria-label="Two voltage-versus-time traces for a 12 volt LED driver: the top trace shows overload or short protection, with the output switching off and retrying in short repeated pulses; the bottom trace shows thermal protection, with the output steady at 12 volts for a long time, then dropping to zero and staying off for a long cooling period before returning">
              <text x="12" y="16" fontSize="10" className="fill-foreground">Overload or short: hiccup</text>
              <g className="stroke-foreground" strokeWidth="1.2">
                <line x1="40" y1="80" x2="330" y2="80" />
                <line x1="40" y1="170" x2="330" y2="170" />
              </g>
              <polyline
                points="40,36 90,36 90,80 120,80 120,36 128,36 128,80 158,80 158,36 166,36 166,80 196,80 196,36 204,36 204,80 234,80 234,36 242,36 242,80 330,80"
                className="stroke-accent"
                strokeWidth="2"
                fill="none"
              />
              <text x="12" y="106" fontSize="10" className="fill-foreground">Thermal shutdown</text>
              <polyline
                points="40,126 200,126 200,170 290,170 290,126 330,126"
                className="stroke-accent"
                strokeWidth="2"
                fill="none"
              />
              <text x="36" y="40" fontSize="9" textAnchor="end" className="fill-muted">12 V</text>
              <text x="36" y="84" fontSize="9" textAnchor="end" className="fill-muted">0 V</text>
              <text x="36" y="130" fontSize="9" textAnchor="end" className="fill-muted">12 V</text>
              <text x="36" y="174" fontSize="9" textAnchor="end" className="fill-muted">0 V</text>
              <text x="120" y="120" fontSize="9" textAnchor="middle" className="fill-muted">runs normally, heats up</text>
              <text x="245" y="162" fontSize="9" textAnchor="middle" className="fill-muted">cooling</text>
              <text x="185" y="186" fontSize="9" textAnchor="middle" className="fill-muted">time →</text>
            </svg>
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The wattage check from step 1 is simple arithmetic, so work it on paper first. Take an illustrative
          16.4 ft (5 m) reel of 12 V strip rated at 14.4 W per meter: 5 × 14.4 = 72 W. On a 60 W driver that
          load is 120% of capacity, which is exactly the situation that produces the top trace. A widely used
          rule of thumb is to keep the load at or below about 80% of the driver&apos;s rating for headroom and
          cooler running, so this strip wants a driver of at least 72 ÷ 0.8 = 90 W. Use the per-foot or
          per-meter figure printed on your own strip&apos;s spec sheet rather than these example values.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="check-for-overheating">Check for overheating</StepHeading>
        <p className="text-muted leading-7">
          Check the driver&apos;s installation location for adequate ventilation, and confirm any built-in
          cooling fan is actually spinning and unobstructed. Many drivers include thermal shutdown
          specifically to protect themselves, so a pattern of shutting off after running a while, then
          working again once cooled, strongly suggests heat as the trigger.
        </p>
        <div className="mt-4">
          <KeyIdea title="Disconnect sections to isolate a shorted strip">
            If you suspect a short in a long LED run rather than overload, disconnect it into shorter
            sections and reconnect them to the driver one at a time until the shutdown returns — that
            section contains the fault.
          </KeyIdea>
        </div>
      </section>

      <section>
        <StepHeading n={4} id="check-for-a-short">Check for a short in the LED circuit</StepHeading>
        <p className="text-muted leading-7">
          With the driver off and unplugged, check resistance across the output terminals with the LED
          load still connected. A reading at or near 0 Ω (rather than the higher resistance expected through
          working LEDs) suggests a short somewhere in the connected strip or fixture wiring.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which meter to use</h2>
        <p className="text-muted leading-7 mb-6">
          A meter with DC volts and resistance ranges covers this whole test. See the full{" "}
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
              note: "DC volts and resistance for driver and LED-circuit diagnosis.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
