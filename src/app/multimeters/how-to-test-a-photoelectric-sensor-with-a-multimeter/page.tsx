import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  InfoCards,
  MeterReadout,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to test a photoelectric sensor with a multimeter: through-beam, retro-reflective and diffuse photo-eyes, light-on vs dark-on, and garage door sensors.";

export const metadata = buildMetadata({
  title: "How to Test a Photoelectric Sensor With a Meter",
  description,
  path: "/multimeters/how-to-test-a-photoelectric-sensor-with-a-multimeter",
});

const fluke115 = picks.find((p) => p.name === "Fluke 115")!;
const kaiweets = picks.find((p) => p.name === "KAIWEETS KM200s")!;

const link = "text-accent hover:underline";

/** The three photo-eye sensing modes, drawn as three rows. */
function SensingModesDiagram() {
  const rows = [
    { y: 20, name: "Through-beam", note: "beam blocked = detect" },
    { y: 92, name: "Retro-reflective", note: "beam blocked = detect" },
    { y: 164, name: "Diffuse", note: "light returned = detect" },
  ];
  return (
    <svg
      viewBox="0 0 340 236"
      className="w-full h-auto"
      role="img"
      aria-label="Three photoelectric sensing modes. Through-beam: an emitter on the left shines across to a separate receiver on the right, and an object detects by breaking the beam. Retro-reflective: one sensor on the left sends light to a reflector on the right and back, and an object detects by breaking it. Diffuse: one sensor on the left shines onto the object itself, which reflects light back to it."
    >
      {rows.map((r, k) => (
        <g key={r.name}>
          <text x="10" y={r.y + 4} fontSize="10.5" fontWeight="700" className="fill-foreground">{r.name}</text>
          <text x="330" y={r.y + 4} fontSize="9" textAnchor="end" className="fill-muted">{r.note}</text>
          {/* left device */}
          <rect x="10" y={r.y + 14} width="42" height="30" rx="4" className="fill-surface stroke-foreground" strokeWidth="1.5" />
          <text x="31" y={r.y + 33} fontSize="9" textAnchor="middle" className="fill-foreground">{k === 0 ? "emitter" : "sensor"}</text>
          {k === 0 && (
            <>
              <path d={`M52 ${r.y + 29} H278`} className="stroke-accent" strokeWidth="2" strokeDasharray="6 4" fill="none" />
              <rect x="278" y={r.y + 14} width="50" height="30" rx="4" className="fill-surface stroke-foreground" strokeWidth="1.5" />
              <text x="303" y={r.y + 33} fontSize="9" textAnchor="middle" className="fill-foreground">receiver</text>
            </>
          )}
          {k === 1 && (
            <>
              <path d={`M52 ${r.y + 23} H292 M292 ${r.y + 35} H52`} className="stroke-accent" strokeWidth="2" strokeDasharray="6 4" fill="none" />
              <rect x="292" y={r.y + 12} width="14" height="34" className="fill-muted stroke-foreground" strokeWidth="1.5" />
              <text x="299" y={r.y + 58} fontSize="9" textAnchor="middle" className="fill-muted">reflector</text>
            </>
          )}
          {k === 2 && (
            <>
              <path d={`M52 ${r.y + 23} L196 ${r.y + 27} M196 ${r.y + 33} L52 ${r.y + 37}`} className="stroke-accent" strokeWidth="2" strokeDasharray="6 4" fill="none" />
              <rect x="196" y={r.y + 12} width="40" height="36" rx="3" className="fill-muted stroke-foreground" strokeWidth="1.5" />
              <text x="216" y={r.y + 62} fontSize="9" textAnchor="middle" className="fill-muted">object reflects</text>
            </>
          )}
          {k < 2 && (
            <>
              <rect x="150" y={r.y + 16} width="26" height="26" rx="2" className="fill-surface stroke-border" strokeWidth="1.5" strokeDasharray="3 2" />
              <text x="163" y={r.y + 56} fontSize="9" textAnchor="middle" className="fill-muted">object</text>
            </>
          )}
        </g>
      ))}
    </svg>
  );
}

export default function HowToTestAPhotoelectricSensorWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Photoelectric Sensor With a Multimeter"
      description={description}
      published="2026-10-22"
      path="/multimeters/how-to-test-a-photoelectric-sensor-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a photoelectric sensor with a multimeter, confirm it has its rated DC supply, then watch the
          output voltage while you break and restore the light beam. The output should change state cleanly
          every time, in step with the indicator LED. If the supply is present but the output never changes,
          check alignment, the lens and the light-on/dark-on setting before replacing the sensor. The same idea
          works for industrial photo-eyes and for the safety sensors on a garage door.
        </>
      }
      aside={{
        image: fluke115.image,
        alt: "Fluke 115 compact True RMS digital multimeter, front view",
        caption: (
          <>
            The Fluke 115 is Fluke&apos;s compact field-service meter: True RMS, CAT III 600V and a 6,000-count
            backlit display, useful in a dim machine guard. See our{" "}
            <Link href="/multimeters/fluke-115-review" className={link}>
              Fluke 115 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "photo-eye-vs-ldr", label: "Photo-eye vs photoresistor" },
        { id: "sensing-modes", label: "Through-beam, retro-reflective, diffuse" },
        { id: "light-on-dark-on", label: "Light-on vs dark-on" },
        { id: "check-supply", label: "Check the supply" },
        { id: "test-the-output", label: "Test the output" },
        { id: "alignment-and-lens", label: "Alignment, lens and emitter" },
        { id: "garage-door-sensors", label: "Garage door safety sensors" },
        { id: "what-the-readings-mean", label: "What the readings mean" },
      ]}
      faq={[
        {
          q: "How do I know if my photoelectric sensor is bad?",
          a: "Power it, confirm the supply voltage at its terminals, then block and clear the beam while measuring the output. A good sensor switches its output and indicator together every time. If the indicator responds but the output does not, the output stage or wiring is suspect. If neither responds after cleaning and realigning, the sensor has probably failed.",
        },
        {
          q: "What is the difference between light-on and dark-on?",
          a: "Light-on (light-operate) turns the output on when the receiver sees its light. Dark-on (dark-operate) turns the output on when the light is missing. On a through-beam sensor, dark-on means the output switches when an object breaks the beam. Many sensors select the mode with a switch, a dial or a dedicated wire.",
        },
        {
          q: "Why do my garage door sensors have a solid light but the door still won't close?",
          a: "If both indicators are steady, the opener should see a clear beam, so check the wall control, the force and travel limits, and whether a lock or vacation mode is on. Also check for sunlight shining straight into the receiver lens, which can upset some sensors. Consult the opener manual for its specific flash codes.",
        },
        {
          q: "Can I see if an infrared photo-eye emitter is working?",
          a: "Often, yes. Many phone cameras, especially front-facing ones, pick up near-infrared light. Point the camera at the emitter lens and look for a faint glow on the screen. Many industrial sensors use visible red light anyway, which you can see on a sheet of paper held in the beam. No glow suggests no power or a dead emitter.",
        },
        {
          q: "Can a photoelectric sensor be tested with the ohms setting?",
          a: "Not meaningfully. Unlike a photoresistor, a photo-eye contains active electronics that only work when powered, so resistance across its wires tells you little. The useful exception is checking the cable: with everything disconnected, continuity along each core from sensor plug to controller terminal rules out a broken wire. Test the sensor itself powered, on DC volts.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-photoresistor-with-a-multimeter",
          title: "How to Test a Photoresistor With a Multimeter",
          desc: "Testing a single light-dependent resistor component on the ohms range.",
        },
        {
          href: "/multimeters/how-to-test-a-limit-switch-with-a-digital-multimeter",
          title: "Test a Limit Switch With a Digital Multimeter",
          desc: "Another common machine input, checked with continuity and voltage.",
        },
      ]}
    >
      <Callout title="Isolate guarded machinery and the opener first">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Photo-eyes often start or stop conveyors and robots. Apply lockout/tagout before reaching inside a
            guard, and remember the sensor itself may still be live from the 24 V DC control supply.
          </li>
          <li>
            Light curtains and other safety-rated beams protect people. Don&apos;t bypass, re-aim or swap them
            without following the machine maker&apos;s procedure.
          </li>
          <li>
            Garage door openers plug into 230 V (UK) or 120 V (North America) mains. The sensor wiring is low
            voltage, but unplug the opener before disconnecting or rewiring anything at its terminals.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="photo-eye-vs-ldr" className="text-xl font-semibold mb-3">A photo-eye is not a photoresistor</h2>
        <p className="text-muted leading-7 mb-4">
          A photoresistor (LDR) is a single passive component whose resistance falls in bright light, and you
          check it on the ohms range; see{" "}
          <Link href="/multimeters/how-to-test-a-photoresistor-with-a-multimeter" className={link}>
            how to test a photoresistor
          </Link>{" "}
          for that. An industrial photoelectric sensor is a complete powered device: an LED light source, a
          photodiode or phototransistor receiver, an amplifier and a transistor output stage in one housing,
          or split across two. You test it the way a controller would see it: powered, on DC volts.
        </p>
      </section>

      <section>
        <h2 id="sensing-modes" className="text-xl font-semibold mb-3">Through-beam, retro-reflective and diffuse sensing</h2>
        <Figure caption={<>Three sensing modes. Through-beam and retro-reflective detect an object that interrupts the light; diffuse detects light bounced back from the object itself.</>}>
          <SensingModesDiagram />
        </Figure>
        <InfoCards
          items={[
            { label: "Through-beam", desc: "Separate emitter and receiver facing each other. Longest range; the emitter usually has only power wires, so test the output at the receiver." },
            { label: "Retro-reflective", desc: "Emitter and receiver share one housing and bounce light off a reflector. Polarised versions resist false triggering from shiny objects." },
            { label: "Diffuse", desc: "The target reflects light straight back. Range depends on the object's colour and finish; background-suppression types ignore things behind it." },
          ]}
        />
      </section>

      <section>
        <h2 id="light-on-dark-on" className="text-xl font-semibold mb-3">Light-on vs dark-on operation</h2>
        <p className="text-muted leading-7 mb-4">
          Before deciding a photoelectric sensor is wrong, find out which mode it is set to. The same sensor can
          read the opposite way after someone flips its selector.
        </p>
        <DataTable
          head={["Mode", "Output on when", "Through-beam, object present", "Diffuse, object present"]}
          rows={[
            ["Light-on (L.ON)", "Receiver sees light", "Off", "On"],
            ["Dark-on (D.ON)", "Receiver sees no light", "On", "Off"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="check-supply">Check the supply at the sensor</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Most industrial photo-eyes run on 10–30 V DC, nominally 24 V DC; the label states the range. Set the
          meter to DC volts and measure between the positive and 0 V terminals, typically the brown and blue
          cores. Check both halves of a through-beam pair: a receiver with power but an emitter without it
          looks exactly like a permanently blocked beam.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="test-the-output">Test the photoelectric sensor output</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Measure from the output core (usually black) to 0 V. Block the beam with a piece of card, then
          clear it, several times. With the sensor connected to its PLC input or relay, that input supplies the
          load. On the bench, add a resistor of a few kilohms: from output to 0 V for a PNP (sourcing) sensor, or
          from output to positive for an NPN (sinking) sensor. A PNP output rises to within a volt or two of the
          supply when on; an NPN output falls close to 0 V when on, and only shows that change if the resistor
          is fitted. Some photo-eyes have a relay output instead, which you check on continuity with the sensor
          powered and the load disconnected.
        </p>
        <Figure caption={<>Typical PNP output on a 24 V DC supply, dark-on through-beam: about 0 V with the beam clear, close to the supply with the beam broken. A dark-on NPN would show the reverse.</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="0.01" unit="V DC" mode="V  beam clear" />
            <MeterReadout value="23.1" unit="V DC" mode="V  beam broken" />
          </div>
        </Figure>
      </section>

      <section>
        <h2 id="alignment-and-lens" className="text-xl font-semibold mb-3">Alignment, the lens and the emitter</h2>
        <p className="text-muted leading-7 mb-4">
          Many photo-eye faults are optical, not electrical: dust, oil mist and condensation weaken the
          received light until the sensor works only some of the time. Clean the lens with a soft cloth. Re-aim the emitter and receiver (or sensor and reflector) slowly while watching
          the stability indicator, which many sensors provide: aim for the middle of the range where it stays
          lit, not the edge where it just switches. A loose bracket that vibrates out of line gives classic
          intermittent faults.
        </p>
        <p className="text-muted leading-7">
          If the receiver never sees light, check the emitter. Visible red beams show as a spot on a piece of
          paper; infrared beams often show as a glow on a phone camera screen.
        </p>
      </section>

      <section>
        <h2 id="garage-door-sensors" className="text-xl font-semibold mb-3">Testing garage door safety sensors</h2>
        <p className="text-muted leading-7 mb-4">
          Garage door safety sensors are a small through-beam pair mounted a few inches (around 15 cm) above the
          floor on either side of the door. The opener powers them through a thin two-core wire at low voltage,
          often quoted around 12 V DC; some brands run lower or send a pulsed signal, so the meter may show an
          averaged value. Your opener manual gives the expected figure.
        </p>
        <ol className="space-y-2 list-decimal pl-5 text-muted leading-7 mb-4">
          <li>
            Look at the LEDs. On many systems the sending unit shows a steady light whenever powered, and the
            receiving unit lights steadily only when it sees the beam. A dark or flickering receiver means
            misalignment, a dirty lens or a wiring fault.
          </li>
          <li>
            With the opener plugged in, measure DC volts across each sensor&apos;s two terminals. Near zero at one
            sensor but present at the opener terminals points to a broken or stapled-through wire.
          </li>
          <li>
            Do a beam-break test: start closing the door, then pass an object such as a cardboard box through the
            beam. The door should stop and reverse. If it does not, don&apos;t use the door until it is fixed.
          </li>
        </ol>
        <Figure caption={<>A quick fault-finding order that works for both industrial photo-eyes and garage door sensors.</>}>
          <FlowDiagram
            steps={[
              { label: "Supply", sub: "Rated volts at both units" },
              { label: "Indicators", sub: "Power and output LEDs" },
              { label: "Optics", sub: "Clean lens, realign" },
              { label: "Output", sub: "Changes with the beam" },
              { label: "Wiring", sub: "Continuity to controller" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="what-the-readings-mean" className="text-xl font-semibold mb-3">What the readings mean</h2>
        <DataTable
          head={["Observation", "Most likely cause"]}
          rows={[
            ["No supply voltage at the sensor", "Fuse, power supply or cable fault upstream"],
            ["Supply fine, indicator never changes", "Misaligned, dirty lens, dead emitter, or out of range"],
            ["Indicator changes, output does not", "No load or pull-up on the bench, or a failed output"],
            ["Output works but reads backwards", "Light-on/dark-on mode set the wrong way"],
            ["Switches randomly", "Vibration, marginal alignment, reflections or strong sunlight"],
            ["Sensor fine, controller sees nothing", "Broken core or loose terminal between them"],
          ]}
        />
        <p className="text-muted leading-7 mt-4 mb-6">
          A cable fault shows up as OL on continuity along one core; see{" "}
          <Link href="/multimeters/what-does-ol-mean-on-a-multimeter" className={link}>
            what OL means on a multimeter
          </Link>
          . For the basics of DC volts and continuity, read{" "}
          <Link href="/multimeters/how-to-use-a-multimeter" className={link}>
            how to use a multimeter
          </Link>
          .
        </p>
        <ProductStrip
          title="Meters in our reviews"
          items={[
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 True RMS digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "True RMS, CAT III 600V, 6,000-count backlit display in a compact body.",
            },
            {
              name: "KAIWEETS KM200s",
              image: kaiweets.image,
              alt: "KAIWEETS KM200s True RMS digital multimeter",
              href: "/multimeters/kaiweets-km200s-review",
              note: "True RMS, CAT II 600V, auto-ranging, backlit. Our budget pick for home jobs such as garage door sensors.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
