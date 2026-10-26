import Link from "next/link";
import { Callout, DataTable, Figure, HowToShell, InfoCards, KeyIdea, ProductStrip } from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "What every multimeter symbol means: AC and DC volts, Ω, the continuity and diode icons, capacitance, Hz, the jack labels, HOLD, REL and CAT ratings.";

export const metadata = buildMetadata({
  title: "Multimeter Symbols Explained",
  description,
  path: "/multimeters/multimeter-symbols-explained",
});

const fluke117 = picks.find((p) => p.name === "Fluke 117")!;
const kaiweets = picks.find((p) => p.name === "KAIWEETS KM200s")!;
const uniT = picks.find((p) => p.name === "UNI-T UT139C")!;

const link = "text-accent hover:underline";

/** The DC symbol (solid line over a dashed line), drawn because few fonts include U+2393. */
function DcMark() {
  return (
    <svg viewBox="0 0 18 12" width="0.95em" height="0.65em" role="img" aria-label="DC symbol" className="inline-block align-middle mx-0.5">
      <line x1="1" y1="3" x2="17" y2="3" stroke="currentColor" strokeWidth="1.8" />
      <line x1="1" y1="9" x2="17" y2="9" stroke="currentColor" strokeWidth="1.8" strokeDasharray="3.5 2.5" />
    </svg>
  );
}

/** A stylised rotary dial with the common function symbols around it. */
function DialDiagram() {
  const marks: { a: number; t: string; dc?: boolean }[] = [
    { a: -150, t: "OFF" },
    { a: -115, t: "V~" },
    { a: -80, t: "V", dc: true },
    { a: -45, t: "mV" },
    { a: -10, t: "Ω" },
    { a: 25, t: "•)))" },
    { a: 60, t: "▶|" },
    { a: 95, t: "-|(-" },
    { a: 130, t: "A~" },
    { a: 165, t: "A", dc: true },
  ];
  return (
    <svg viewBox="0 0 320 300" className="w-full h-auto max-w-sm mx-auto" role="img" aria-label="Multimeter rotary dial with function symbols around it">
      <rect x="10" y="10" width="300" height="280" rx="26" className="fill-[#f0b429]" />
      <circle cx="160" cy="150" r="62" fill="#2a2d31" />
      <line x1="160" y1="150" x2="118" y2="104" stroke="#f0b429" strokeWidth="6" strokeLinecap="round" />
      {marks.map((m) => {
        const r = (m.a * Math.PI) / 180;
        const x = 160 + Math.sin(r) * 104;
        const y = 150 - Math.cos(r) * 104;
        return (
          <g key={m.t + m.a}>
            <text x={(m.dc ? x - 7 : x).toFixed(1)} y={(y + 5).toFixed(1)} fontSize="15" textAnchor="middle" fill="#1a1d21" fontFamily="ui-monospace, monospace" fontWeight="600">
              {m.t}
            </text>
            {m.dc && (
              <g stroke="#1a1d21" strokeWidth="1.8">
                <line x1={x + 1} y1={y - 3} x2={x + 15} y2={y - 3} />
                <line x1={x + 1} y1={y + 2} x2={x + 15} y2={y + 2} strokeDasharray="3 2" />
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export default function MultimeterSymbolsExplainedPage() {
  return (
    <HowToShell
      title="Multimeter Symbols Explained"
      description={description}
      path="/multimeters/multimeter-symbols-explained"
      category="multimeters"
      published="2026-10-25"
      intro={
        <>
          Multimeter symbols are a compact shorthand printed around the dial, beside the input jacks and
          on the display, and once you can read them, any meter from any brand becomes familiar. This page
          decodes each group of markings in turn: the measurement functions, the units and their prefixes,
          the jack labels, the display annunciators and the safety markings on the case. The function
          symbols are largely standardized; the button names vary more between brands, so check your own
          manual for those.
        </>
      }
      aside={{
        image: fluke117.image,
        alt: "Fluke 117 digital multimeter with a symbol-marked rotary dial",
        caption: (
          <>
            The Fluke 117 dial uses the standard symbols covered on this page. See our{" "}
            <Link href="/multimeters/fluke-117-review" className={link}>
              Fluke 117 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "dial-functions", label: "Dial symbols: the measurement functions" },
        { id: "ac-dc-marks", label: "The AC and DC marks" },
        { id: "units-prefixes", label: "Units and prefixes on the display" },
        { id: "jack-labels", label: "Input jack labels" },
        { id: "display-annunciators", label: "Display annunciators and buttons" },
        { id: "safety-markings", label: "Safety markings on the case" },
      ]}
      faq={[
        {
          q: "What does the symbol with a wavy line next to V mean?",
          a: "The tilde (~) marks alternating current, so V~ is AC voltage, the setting for wall outlets and transformer secondaries. Some meters print it as V with a small sine wave above the letter, or write VAC instead; all three mean the same function.",
        },
        {
          q: "Why does my meter have both mA and A jacks?",
          a: "Each current jack is protected by its own fuse sized for its range. The mA/µA jack is for small currents and has a low-rated fuse; the A (often 10A) jack takes larger currents through a heavier fuse and a low-resistance shunt. Using the wrong one either blows the small fuse or loses resolution on tiny readings.",
        },
        {
          q: "What does the triangle with an exclamation mark beside the jacks mean?",
          a: "It tells you to read the manual before using those inputs, because there is a limit or hazard the panel has no room to spell out, usually the maximum voltage or current a jack can safely take. Treat the numbers printed next to it as hard limits.",
        },
        {
          q: "Is the speaker symbol the same as the diode symbol?",
          a: "No. The speaker or sound-wave icon is continuity, where the meter beeps below a low resistance threshold. The arrow-into-a-bar icon is diode test, which shows the forward voltage drop of a semiconductor junction. Many meters share one dial position between them and switch with a button.",
        },
        {
          q: "What does LoZ or AutoV mean on a multimeter dial?",
          a: "LoZ marks a low-impedance voltage setting. Instead of the usual high input resistance, the meter puts a much smaller load across the probes, which drains away the phantom or ghost voltage that unconnected wires pick up from neighboring live cables. AutoV versions also choose AC or DC by themselves. It suits electrical troubleshooting, not delicate electronics, where that load can disturb the circuit.",
        },
      ]}
      next={[
        {
          href: "/multimeters/ac-vs-dc-voltage",
          title: "AC vs. DC Voltage",
          desc: "What the AC and DC voltage settings actually measure, and where you meet each one.",
        },
        {
          href: "/multimeters/what-does-ol-mean-on-a-multimeter",
          title: "What Does OL Mean on a Multimeter?",
          desc: "The one display message that changes meaning with the dial position.",
        },
      ]}
    >
      <section id="dial-functions">
        <h2 className="text-xl font-semibold mb-3">Dial symbols: the measurement functions</h2>
        <p className="text-muted leading-7 mb-4">
          The rotary switch chooses what the meter measures. Each position carries a letter for the
          quantity (V for volts, A for amps, Ω for ohms) and often a small mark that narrows it down
          further, such as AC or DC. Reading the dial clockwise, a typical layout looks like this.
        </p>
        <Figure caption="A typical dial: off, AC volts, DC volts, millivolts, resistance, continuity, diode test, capacitance, then AC and DC current. The exact order differs between models.">
          <DialDiagram />
        </Figure>
        <div className="mt-4">
          <DataTable
            head={["Symbol", "Function", "Typical use"]}
            mono={[0]}
            rows={[
              ["V~ / VAC", "AC voltage", "Outlets, transformer outputs, motor supplies"],
              ["VDC (V + DC mark)", "DC voltage", "Batteries, power adapters, car electrics, circuit boards"],
              ["mV", "Millivolts", "Small signals, sensor outputs, voltage drop across a contact"],
              ["Ω", "Resistance", "Resistors, heating elements, coil windings"],
              ["•))) (sound waves)", "Continuity", "Fuses, wires, switches: beeps on a near-zero path"],
              ["▶| (arrow and bar)", "Diode test", "Diodes, LEDs, transistor junctions"],
              ["-|(-", "Capacitance", "Checking a capacitor's value against its marking"],
              ["Hz", "Frequency", "Mains frequency, signal or pulse rate"],
              ["A~ / ADC, mA, µA", "Current", "Load current, standby drain, sensor loops"],
              ["°C / °F", "Temperature", "With a thermocouple probe plugged in"],
              ["hFE", "Transistor gain", "Small socket for bipolar transistors on some budget meters"],
              ["NCV", "Non-contact voltage", "Sensing live AC near a cable without touching it"],
            ]}
          />
        </div>
      </section>

      <section id="ac-dc-marks">
        <h2 className="text-xl font-semibold mb-3">The AC and DC marks</h2>
        <p className="text-muted leading-7">
          These two marks cause more wrong readings than anything else on the dial. A tilde (~) or small
          sine wave means alternating current. The DC symbol is a solid line with a dashed line beneath it
          (<DcMark />); some meters write VDC or V with a straight bar instead. Pick the wrong one and the meter
          isn&apos;t broken, it is simply measuring something different. A 12V battery on the AC setting
          usually reads close to zero, and a wall outlet on the DC setting gives a small, wandering number
          rather than the voltage you expected. Our{" "}
          <Link href="/multimeters/ac-vs-dc-voltage" className={link}>
            AC vs. DC voltage guide
          </Link>{" "}
          explains why.
        </p>
      </section>

      <section id="units-prefixes">
        <h2 className="text-xl font-semibold mb-3">Units and prefixes on the display</h2>
        <p className="text-muted leading-7 mb-4">
          The display shows a number and a unit, and the unit usually carries a metric prefix. Misreading
          the prefix is a thousand-times error, so it is worth checking every time, especially on an
          auto-ranging meter that changes range on its own.
        </p>
        <InfoCards
          items={[
            { label: "µ (micro)", desc: "One millionth. 250 µA = 0.00025 A, typical of standby drain." },
            { label: "m (milli)", desc: "One thousandth. 450 mV = 0.45 V; 20 mA = 0.02 A." },
            { label: "k (kilo)", desc: "One thousand. 4.7 kΩ = 4,700 ohms." },
            { label: "M (mega)", desc: "One million. 1 MΩ = 1,000,000 ohms; easy to confuse with m." },
            { label: "nF / µF", desc: "Capacitance in nanofarads and microfarads." },
            { label: "Hz / kHz", desc: "Frequency in cycles per second, or thousands of them." },
          ]}
        />
      </section>

      <section id="jack-labels">
        <h2 className="text-xl font-semibold mb-3">Input jack labels</h2>
        <p className="text-muted leading-7 mb-4">
          The sockets at the bottom of the meter are labeled too, and plugging the red lead into the
          wrong one is how meters blow fuses. The black lead almost always stays in COM.
        </p>
        <DataTable
          head={["Jack label", "What goes in it"]}
          mono={[0]}
          rows={[
            ["COM", "Black lead, every measurement (common or reference)"],
            ["VΩ (often with ▶| and Hz)", "Red lead for voltage, resistance, continuity, diode and most other functions"],
            ["mA µA", "Red lead for small currents, through a low-rated fuse"],
            ["A or 10A", "Red lead for large currents, through a heavier fuse; often time-limited"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The figures printed beside the jacks, such as &quot;600V MAX&quot; or &quot;10A MAX FUSED&quot;,
          are the limits for that input. Current measurement is a separate skill with its own pitfalls; see{" "}
          <Link href="/multimeters/how-to-measure-milliamps-with-a-multimeter" className={link}>
            how to measure milliamps with a multimeter
          </Link>{" "}
          before you move the red lead.
        </p>
      </section>

      <section id="display-annunciators">
        <h2 className="text-xl font-semibold mb-3">Display annunciators and buttons</h2>
        <p className="text-muted leading-7 mb-4">
          Small words and icons around the digits report the meter&apos;s state. If a reading looks frozen
          or offset, one of these is usually switched on.
        </p>
        <InfoCards
          items={[
            { label: "AUTO", desc: "Auto-ranging is on; the meter picks the range itself." },
            { label: "HOLD / H", desc: "The reading is frozen until you press the button again." },
            { label: "REL / Δ", desc: "Relative mode: shows the difference from a stored value, e.g. lead resistance." },
            { label: "MIN / MAX", desc: "Records the lowest and highest readings over time." },
            { label: "Battery icon", desc: "The meter's own battery is low; readings may drift." },
            { label: "TRMS / True RMS", desc: "AC readings stay accurate on distorted, non-sine waveforms." },
          ]}
        />
      </section>

      <Callout title="Check HOLD before trusting a reading">
        A meter left in HOLD keeps showing the last value even after the probes are removed. It is an easy
        way to conclude a circuit is still live, or dead, when it isn&apos;t. Clear HOLD and confirm the
        meter on a known source before relying on it for safety.
      </Callout>

      <section id="safety-markings">
        <h2 className="text-xl font-semibold mb-3">Safety markings on the case</h2>
        <p className="text-muted leading-7">
          The markings on the case describe where the meter can safely be used. A <strong>CAT</strong>{" "}
          rating with a voltage (for example CAT III 600V) gives the measurement category and the highest
          working voltage the meter is built for in that location: CAT II covers plug-in appliances, CAT III
          fixed building wiring and distribution panels, and CAT IV the service entrance and utility side. A{" "}
          <strong>double square</strong> means double insulation. A <strong>triangle with an exclamation
          mark</strong> means read the manual for that marking, and a <strong>triangle with a lightning
          bolt</strong> warns of hazardous voltage at that point.
        </p>
      </section>

      <section>
        <KeyIdea title="A quick way to learn your own meter">
          Turn the dial through each position with the leads unplugged and note what the display shows.
          Then measure one known thing per function, such as a fresh AA battery on DC volts or a resistor whose
          color code you have read on Ω. Ten minutes of this teaches the symbols faster than any chart.
        </KeyIdea>
      </section>

      <ProductStrip
        title="Meters with clear, standard dial markings"
        items={[
          { name: fluke117.name, image: fluke117.image, alt: "Fluke 117 multimeter", href: "/multimeters/fluke-117-review", note: "Electrician's meter with NCV and True RMS." },
          { name: kaiweets.name, image: kaiweets.image, alt: "KAIWEETS KM200s multimeter", href: "/multimeters/kaiweets-km200s-review", note: "Budget auto-ranging meter with a simple layout." },
          { name: uniT.name, image: uniT.image, alt: "UNI-T UT139C multimeter", href: "/multimeters/uni-t-ut139c-review", note: "Budget True RMS meter with auto and manual ranging." },
        ]}
      />
    </HowToShell>
  );
}
