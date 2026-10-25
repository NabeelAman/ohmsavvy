import Link from "next/link";
import { Callout, DataTable, Figure, HowToShell, InfoCards, KeyIdea, ScopeScreen } from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "AC vs. DC voltage explained: how each one behaves, where you meet them at home and in cars, RMS vs. peak, and which multimeter setting to use.";

export const metadata = buildMetadata({
  title: "AC vs. DC Voltage: What's the Difference?",
  description,
  path: "/multimeters/ac-vs-dc-voltage",
});

const fluke117 = picks.find((p) => p.name === "Fluke 117")!;

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

export default function AcVsDcVoltagePage() {
  return (
    <HowToShell
      title="AC vs. DC Voltage: What's the Difference and When Is Each Used?"
      description={description}
      path="/multimeters/ac-vs-dc-voltage"
      category="multimeters"
      published="2026-10-25"
      intro={
        <>
          The difference between AC and DC voltage is direction. DC (direct current) voltage keeps the same
          polarity all the time, so current flows one way, as it does from a battery. AC (alternating
          current) voltage reverses polarity many times a second, so current flows back and forth, as it
          does at a wall outlet. Both are measured in volts, but they behave differently, they come from
          different sources, and a multimeter needs to be told which one it is looking at.
        </>
      }
      aside={{
        image: fluke117.image,
        alt: "Fluke 117 digital multimeter",
        caption: (
          <>
            A True RMS meter reads AC accurately even when the waveform isn&apos;t a clean sine. See our{" "}
            <Link href="/multimeters/fluke-117-review" className={link}>
              Fluke 117 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-they-differ", label: "How AC and DC voltage differ" },
        { id: "where-used", label: "Where each one is used" },
        { id: "why-mains-is-ac", label: "Why mains is AC but electronics run on DC" },
        { id: "rms-and-peak", label: "RMS and peak: what an AC reading means" },
        { id: "measuring", label: "Measuring each with a multimeter" },
        { id: "wrong-setting", label: "What happens on the wrong setting" },
      ]}
      faq={[
        {
          q: "Is AC or DC more dangerous?",
          a: "Both can kill, and the risk depends mainly on the voltage, the current path through the body and the duration of contact. Household AC is a familiar hazard because it is everywhere and the frequency used for mains can disturb the heart's rhythm; high-voltage DC, such as in EV battery packs and solar arrays, is equally serious and can sustain an arc that is hard to break. Treat any voltage above about 50V as hazardous whichever kind it is.",
        },
        {
          q: "Can I measure AC voltage on the DC setting?",
          a: "Not usefully. On the DC setting, the meter averages the input, and a symmetrical AC wave averages to roughly zero, so you see a small, wandering number instead of the real voltage. Switch to V~ for any outlet, transformer or mains-powered circuit.",
        },
        {
          q: "Why does my 120V outlet measure 118V or 124V instead of exactly 120V?",
          a: "Nominal mains voltage is a target, not a fixed value. Utilities allow a tolerance band around it, and the voltage at your outlet also drops a little under heavy household load. A reading a few volts either side of nominal is normal.",
        },
        {
          q: "What is the difference between AC and DC current, as opposed to voltage?",
          a: "Voltage is the push, current is the flow it causes. AC voltage drives AC current and DC voltage drives DC current, so the same direction rule applies. A multimeter has separate settings for each (A~ and ADC), and measuring current needs the leads in the current jacks and the meter in series with the load.",
        },
      ]}
      next={[
        {
          href: "/multimeters/multimeter-symbols-explained",
          title: "Multimeter Symbols Explained",
          desc: "The AC and DC marks, and every other symbol on the dial.",
        },
        {
          href: "/multimeters/how-to-use-a-multimeter",
          title: "How to Use a Multimeter",
          desc: "Voltage, resistance, continuity and current, step by step.",
        },
      ]}
    >
      <section id="how-they-differ">
        <h2 className="text-xl font-semibold mb-3">How AC and DC voltage differ</h2>
        <p className="text-muted leading-7 mb-4">
          Plot voltage against time and the difference is obvious. DC is a flat line above zero: a 9V
          battery sits at 9 volts, falling slowly only as it discharges. AC traces a sine wave that rises to
          a positive peak, falls through zero to an equal negative peak, and comes back again. How often it
          repeats is the frequency, measured in hertz: mains electricity runs at 60 Hz in North America and
          50 Hz in the UK, Europe and most of the rest of the world.
        </p>
        <Figure caption="DC (left) holds a steady voltage at one polarity. AC (right) swings above and below zero, reversing direction every half cycle.">
          <div className="grid grid-cols-2 gap-4">
            <ScopeScreen wave="flat" offset={2} labels={{ left: "DC", right: "steady" }} />
            <ScopeScreen wave="sine" cycles={2} amplitude={3} labels={{ left: "AC", right: "alternating" }} />
          </div>
        </Figure>
      </section>

      <section id="where-used">
        <h2 className="text-xl font-semibold mb-3">Where each one is used</h2>
        <p className="text-muted leading-7 mb-4">
          As a rule, anything that plugs into the wall is fed AC, and anything that runs from a battery, or
          from an adapter or charger, works on DC internally. Typical examples:
        </p>
        <DataTable
          head={["Source", "Type", "Typical nominal voltage"]}
          mono={[2]}
          rows={[
            ["US / Canada wall outlet", "AC, 60 Hz", "120 V (240 V for large appliances)"],
            ["UK / EU wall outlet", "AC, 50 Hz", "230 V"],
            ["Doorbell or thermostat transformer", "AC", "16–24 V"],
            ["AA / AAA cell", "DC", "1.5 V"],
            ["USB port", "DC", "5 V (higher with USB-C fast charging)"],
            ["Car electrical system", "DC", "12 V (about 13.5–14.5 V with the engine running)"],
            ["Home solar panel string", "DC", "Tens to hundreds of volts, depending on panel count"],
          ]}
        />
      </section>

      <section id="why-mains-is-ac">
        <h2 className="text-xl font-semibold mb-3">Why mains is AC but electronics run on DC</h2>
        <p className="text-muted leading-7">
          AC won for power distribution because transformers can step it up to very high voltages for
          long-distance lines, where lower current means less energy lost as heat, and step it back down
          near your home. That only works with a changing voltage. Electronics, on the other hand, need a
          steady supply: chips, LEDs and batteries all work on DC. So every phone charger, laptop brick and
          TV power supply converts AC to DC with a rectifier and regulator. The reverse job, turning
          battery or solar DC into household AC, is done by an inverter.
        </p>
      </section>

      <section id="rms-and-peak">
        <h2 className="text-xl font-semibold mb-3">RMS and peak: what an AC reading means</h2>
        <p className="text-muted leading-7 mb-4">
          Because AC is always changing, a single number has to summarise it. The standard is RMS (root
          mean square): the DC voltage that would deliver the same heating power to a resistor. When an
          outlet is described as 120V or 230V, that is the RMS value, and it is what a multimeter shows. The
          wave actually peaks higher. For a pure sine wave, peak = RMS × 1.414.
        </p>
        <InfoCards
          items={[
            { label: "120 V RMS", desc: "Peaks at about 170 V, so about 340 V peak to peak." },
            { label: "230 V RMS", desc: "Peaks at about 325 V, so about 650 V peak to peak." },
            { label: "24 V RMS", desc: "A thermostat transformer peaks at about 34 V." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Those peak figures are one reason meter and probe voltage ratings matter. They also explain why
          an oscilloscope, which shows the whole waveform, can display a bigger number than a meter on the
          same outlet; our article on{" "}
          <Link href="/oscilloscopes/why-does-an-oscilloscope-show-different-voltage-readings-from-a-multimeter" className={link}>
            why oscilloscope and multimeter voltage readings differ
          </Link>{" "}
          goes into that.
        </p>
      </section>

      <section id="measuring">
        <h2 className="text-xl font-semibold mb-3">Measuring each with a multimeter</h2>
        <p className="text-muted leading-7">
          Set the dial to V<DcMark /> (a solid line over a dashed line, or VDC) for DC sources and to V~ (a tilde, or
          VAC) for AC. The leads go in COM and VΩ for both. With DC, polarity matters: red on the positive
          terminal gives a positive reading, and reversed leads give the same number with a minus sign,
          which is harmless; see{" "}
          <Link href="/multimeters/why-does-my-multimeter-show-negative-voltage" className={link}>
            why a multimeter shows negative voltage
          </Link>
          . With AC there is no fixed positive side, so lead orientation doesn&apos;t change the reading.
          For AC from motor drives, dimmers or LED drivers, whose waveforms are far from a clean sine, a True
          RMS meter gives an accurate figure where an average-responding meter can read noticeably off.
        </p>
      </section>

      <Callout title="Mains AC needs a meter rated for it">
        Measuring an outlet or panel puts the full mains voltage across your meter and leads. Use a meter
        and probes with a CAT rating that covers the location (CAT II for plug-in loads, CAT III for fixed
        wiring and panels), hold the probes behind their finger guards, and connect one probe at a time,
        black first.
      </Callout>

      <section id="wrong-setting">
        <h2 className="text-xl font-semibold mb-3">What happens on the wrong setting</h2>
        <p className="text-muted leading-7">
          A battery measured on V~ (AC) usually reads zero or close to it, because there is no alternating part
          for the AC circuit to respond to. An outlet measured on V<DcMark /> (DC) shows a small number that drifts around
          zero instead of 120V or 230V. Neither mistake normally harms a modern meter, since both settings
          are voltage ranges with a high input impedance, but either one can convince you a live circuit is
          dead. If a reading makes no sense, the dial setting is the first thing to check, before the
          circuit.
        </p>
      </section>

      <section>
        <KeyIdea title="The one-line version">
          DC holds one direction (batteries, USB, cars, electronics); AC reverses many times a second (wall
          outlets, transformers). Match the meter&apos;s DC or AC voltage setting to the source, and remember that an
          AC reading is an RMS value, so the real peak is higher.
        </KeyIdea>
      </section>
    </HowToShell>
  );
}
