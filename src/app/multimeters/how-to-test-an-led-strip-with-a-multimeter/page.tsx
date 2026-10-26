import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  MeterReadout,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to test an LED strip with a multimeter: check 12V or 24V at both ends, measure voltage drop, test single LEDs in diode mode and track down a dead segment.";

export const metadata = buildMetadata({
  title: "How to Test an LED Strip With a Multimeter",
  description,
  path: "/multimeters/how-to-test-an-led-strip-with-a-multimeter",
});

const kaiweets = picks.find((p) => p.name === "KAIWEETS KM200s")!;

const link = "text-accent hover:underline";

export default function HowToTestAnLedStripWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test an LED Strip With a Multimeter"
      description={description}
      path="/multimeters/how-to-test-an-led-strip-with-a-multimeter"
      category="multimeters"
      published="2026-10-22"
      intro={
        <>
          When part of a run goes dark or dim, testing the LED strip with a multimeter tells you which of
          three things failed: the power reaching it, a copper rail inside the strip, or the LEDs in one
          segment. Strips are built from short repeating groups wired in parallel across two rails, so you
          work along the strip measuring DC voltage at the cut points, then drop to diode mode for the
          individual LEDs.
        </>
      }
      aside={{
        image: kaiweets.image,
        alt: "KAIWEETS KM200s digital multimeter",
        caption: (
          <>
            DC volts and diode mode cover every check on this page. See our{" "}
            <Link href="/multimeters/kaiweets-km200s-review" className={link}>
              KAIWEETS KM200s review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-strips-are-wired", label: "How a 12V or 24V strip is wired" },
        { id: "input-voltage", label: "1. Check voltage at the input" },
        { id: "far-end-voltage", label: "2. Measure the far end and the drop" },
        { id: "dead-segment", label: "3. Find the dead segment" },
        { id: "diode-mode", label: "4. Test single LEDs in diode mode" },
        { id: "rgb-strips", label: "Common-anode RGB strips" },
        { id: "diagnosis", label: "Reading the results" },
      ]}
      faq={[
        {
          q: "Why does my LED strip get dimmer toward the end?",
          a: "The thin copper rails have resistance, so voltage falls along the run as current flows. The far end receives less than the input and the last segments run dimmer, often with a color shift on white or RGB strips. Feeding power into both ends, or into the middle, shortens the path the current has to travel and evens out the brightness.",
        },
        {
          q: "Why won't my multimeter light up a white LED on the strip?",
          a: "White and blue LEDs typically need around 2.6 to 3.2V to conduct, and some meters' diode-test output can't reach that, so they show OL on a perfectly good LED. Red LEDs need less and usually light. Check your meter's manual for its diode-test voltage, or test the segment with the strip's own power supply instead.",
        },
        {
          q: "Can one bad LED make a whole strip go out?",
          a: "Usually only its own segment. The LEDs within a segment are in series, so one open LED darkens that group of three (12V) or six (24V) LEDs, while the segments on either side keep working. If everything beyond a point goes dark, suspect a break in the copper rail or a failed solder joint at a reel splice rather than an LED.",
        },
        {
          q: "Can I power a 12V LED strip from a 24V supply?",
          a: "No. Each segment's resistor is sized for the strip's rated voltage, so doubling it drives far too much current through the LEDs and they overheat quickly. Match the supply voltage to the voltage printed on the strip, and confirm it with your meter at the supply output before connecting.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-diode-with-a-multimeter",
          title: "How to Test a Diode With a Multimeter",
          desc: "How diode mode works and why an LED is tested exactly like any other diode.",
        },
        {
          href: "/multimeters/how-to-measure-voltage-across-a-resistor",
          title: "How to Measure Voltage Across a Resistor",
          desc: "Probe placement for voltage readings across one part of a live circuit.",
        },
      ]}
    >
      <Callout title="Low voltage, but still check the supply side">
        The strip itself runs on 12V or 24V DC, but the power supply feeding it is often wired to mains. Keep
        your probes on the low-voltage output terminals and the strip pads, and leave the supply&apos;s input
        side alone unless it is unplugged.
      </Callout>

      <section>
        <h2 id="how-strips-are-wired" className="text-xl font-semibold mb-3">How a 12V or 24V LED strip is wired</h2>
        <p className="text-muted leading-7 mb-4">
          Two copper rails, positive and negative, run the full length of the tape. Between them sit repeating
          segments, each a small series string of LEDs with a current-limiting resistor. On typical 12V strips a
          segment holds three LEDs; on 24V strips it is usually six. Scissor marks with copper pads show where
          one segment ends and the next begins, and those pads are the best test points you have.
        </p>
        <Figure
          caption={
            <>
              Three segments of a typical 12V strip. Each segment is three LEDs and a resistor in series,
              connected straight across the rails, so a fault inside one segment does not affect its
              neighbors. The dashed lines are the cut points.
            </>
          }
        >
          <svg viewBox="0 0 320 140" className="w-full h-auto" role="img" aria-label="Schematic of three LED strip segments, each three LEDs and a resistor in series between the positive and negative rails, with cut lines between segments">
            <g className="stroke-foreground" strokeWidth="1.5" fill="none">
              <line x1="10" y1="25" x2="310" y2="25" className="stroke-accent" />
              <line x1="10" y1="115" x2="310" y2="115" />
              {[60, 160, 260].map((x) => (
                <g key={x}>
                  <line x1={x} y1="25" x2={x} y2="35" />
                  <rect x={x - 5} y="35" width="10" height="14" />
                  <line x1={x} y1="49" x2={x} y2="56" />
                  {[56, 74, 92].map((y) => (
                    <g key={y}>
                      <path d={`M${x - 6} ${y} L${x + 6} ${y} L${x} ${y + 10} Z`} className="fill-accent/40" />
                      <line x1={x - 6} y1={y + 10} x2={x + 6} y2={y + 10} />
                      <line x1={x} y1={y + 10} x2={x} y2={y + 18} />
                    </g>
                  ))}
                  <line x1={x} y1="110" x2={x} y2="115" />
                </g>
              ))}
              <line x1="110" y1="12" x2="110" y2="128" strokeDasharray="3 3" className="stroke-muted" />
              <line x1="210" y1="12" x2="210" y2="128" strokeDasharray="3 3" className="stroke-muted" />
            </g>
            <text x="12" y="19" fontSize="9" className="fill-accent">+12V rail</text>
            <text x="12" y="132" fontSize="9" className="fill-muted">− rail</text>
            <text x="110" y="9" fontSize="8" textAnchor="middle" className="fill-muted">cut</text>
            <text x="210" y="9" fontSize="8" textAnchor="middle" className="fill-muted">cut</text>
          </svg>
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="input-voltage">Check voltage at the input</StepHeading>
        <p className="text-muted leading-7">
          With the strip powered, set the meter to DC volts and put the red probe on the + pad where the
          supply wires land and the black probe on the − pad. You should see close to the supply&apos;s rated
          output, 12V or 24V. If the reading is near zero, the problem is upstream: the supply, a dimmer or
          controller, or the connector. Many clip-on connectors fail here, so measure on the strip side of
          the clip as well as the wire side.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="far-end-voltage">Measure the far end and the voltage drop</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Repeat the measurement on the last pair of pads at the far end with the whole strip lit. The
          difference between the two readings is the drop along the rails. A small difference is normal;
          a large one shows up as dimming and color shift toward the end. The bars below are an illustrative
          example of a long 12V run fed from one end, not a spec for any particular strip.
        </p>
        <Figure
          caption={
            <>
              Example voltage along a long single-fed 12V run. The loss builds with distance because every
              segment&apos;s current flows through the rails between it and the input. 24V strips draw half
              the current for the same power, so they usually lose less over the same length.
            </>
          }
        >
          <BarChart
            items={[
              { label: "Input pads", value: 12.0, display: "12.0 V", highlight: true },
              { label: "Quarter way", value: 11.6, display: "11.6 V" },
              { label: "Halfway", value: 11.2, display: "11.2 V" },
              { label: "Three quarters", value: 10.9, display: "10.9 V" },
              { label: "Far end", value: 10.7, display: "10.7 V" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={3} id="dead-segment">Find the dead segment</StepHeading>
        <p className="text-muted leading-7">
          Walk the strip with the meter on DC volts, measuring across the + and − pads at each cut point
          (scrape away a little silicone coating on waterproof strips). If voltage is present on the pads at
          both ends of a dark segment, the fault is inside that segment: an open LED or resistor. If the
          voltage disappears at one cut point and stays gone beyond it, a rail is broken there, often at a
          soldered splice between reel sections or where the tape has been folded sharply.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="diode-mode">Test single LEDs in diode mode</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Unplug the strip. Set the meter to diode mode and touch the red probe to the anode side of one LED
          in the dead segment and the black probe to the cathode side; the polarity mark printed on the tape
          or the direction of current from + to − tells you which is which. A good LED shows a forward
          voltage and may glow faintly, and reverses to OL. An LED that reads OL both ways is the open one.
        </p>
        <Figure
          caption={
            <>
              A red LED in diode mode, reading about 1.8V forward. White and blue LEDs typically sit around
              2.6 to 3.2V, which some meters cannot reach, so an OL on a white LED is not proof of failure.
            </>
          }
        >
          <div className="max-w-xs mx-auto">
            <MeterReadout value="1.82" unit="V" mode="diode  red LED" />
          </div>
        </Figure>
      </section>

      <section id="rgb-strips">
        <KeyIdea title="Common-anode RGB strips">
          Four-pad RGB strips usually share one positive pad (+12V or +24V) and switch the R, G and B pads to
          negative through the controller. To test a strip without the controller, connect the supply&apos;s
          positive to the shared pad and touch the supply&apos;s negative lead to one color pad at a time.
          Each color should light along the whole run. If a color works this way but not from the
          controller, the controller channel has failed, not the strip.
        </KeyIdea>
      </section>

      <section>
        <h2 id="diagnosis" className="text-xl font-semibold mb-3">Reading the results</h2>
        <DataTable
          head={["What you measure", "What it points to"]}
          rows={[
            ["No voltage at the input pads", "Supply, controller, dimmer or connector fault upstream"],
            ["Full voltage at input, much lower at the far end", "Normal rail drop on a long run; feed power at both ends"],
            ["Voltage on both sides of one dark segment", "Open LED or resistor inside that segment"],
            ["Voltage vanishes past one cut point", "Broken rail, cracked trace or failed splice joint"],
            ["One LED reads OL both ways in diode mode", "That LED is open; replace it or bridge in a new segment"],
            ["One color dead on RGB, lights when driven directly", "Controller output channel has failed"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For the supply side of the problem, confirm the adapter holds its voltage with the strip connected
          rather than unloaded; a supply that sags under load looks exactly like a strip fault. Our{" "}
          <Link href="/multimeters/how-to-use-a-multimeter" className={link}>
            multimeter basics guide
          </Link>{" "}
          covers DC voltage measurement if you are new to it.
        </p>
      </section>
    </HowToShell>
  );
}
