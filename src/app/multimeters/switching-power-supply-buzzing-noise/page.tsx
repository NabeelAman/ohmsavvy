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
  "Why a switching power supply makes a buzzing noise: coil whine, light-load burst mode, hiccup protection, tired capacitors and arcing, and what to check safely.";

export const metadata = buildMetadata({
  title: "Switching Power Supply Buzzing Noise",
  description,
  path: "/multimeters/switching-power-supply-buzzing-noise",
});

const fluke115 = picks.find((p) => p.name === "Fluke 115")!;

const link = "text-accent hover:underline";

/** Normal continuous switching versus burst mode, where packets repeat at an audible rate. */
function BurstModeDiagram() {
  return (
    <svg viewBox="0 0 340 170" className="w-full h-auto" role="img" aria-label="Diagram comparing continuous switching pulses with burst mode pulse packets that repeat at an audible rate">
      <text x="10" y="18" fontSize="10" className="fill-foreground">Normal load: continuous, far above hearing</text>
      <path
        d="M10 60 L10 35 L16 35 L16 60 L22 60 L22 35 L28 35 L28 60 L34 60 L34 35 L40 35 L40 60 L46 60 L46 35 L52 35 L52 60 L58 60 L58 35 L64 35 L64 60 L70 60 L70 35 L76 35 L76 60 L82 60 L82 35 L88 35 L88 60 L94 60 L94 35 L100 35 L100 60 L106 60 L106 35 L112 35 L112 60 L118 60 L118 35 L124 35 L124 60 L130 60 L130 35 L136 35 L136 60 L142 60 L142 35 L148 35 L148 60 L154 60 L154 35 L160 35 L160 60 L166 60 L166 35 L172 35 L172 60 L178 60 L178 35 L184 35 L184 60 L190 60 L190 35 L196 35 L196 60 L202 60 L202 35 L208 35 L208 60 L214 60 L214 35 L220 35 L220 60 L226 60 L226 35 L232 35 L232 60 L238 60 L238 35 L244 35 L244 60 L250 60 L250 35 L256 35 L256 60 L262 60 L262 35 L268 35 L268 60 L274 60 L274 35 L280 35 L280 60 L286 60 L286 35 L292 35 L292 60 L298 60 L298 35 L304 35 L304 60 L330 60"
        className="stroke-foreground"
        strokeWidth="1.4"
        fill="none"
      />
      <text x="10" y="95" fontSize="10" className="fill-foreground">Light load: bursts with gaps between them</text>
      <path
        d="M10 140 L10 115 L16 115 L16 140 L22 140 L22 115 L28 115 L28 140 L34 140 L34 115 L40 115 L40 140 L110 140 L110 115 L116 115 L116 140 L122 140 L122 115 L128 115 L128 140 L134 140 L134 115 L140 115 L140 140 L210 140 L210 115 L216 115 L216 140 L222 140 L222 115 L228 115 L228 140 L234 140 L234 115 L240 115 L240 140 L310 140 L310 115 L316 115 L316 140 L330 140"
        className="stroke-accent"
        strokeWidth="1.4"
        fill="none"
      />
      <path d="M10 152 L110 152" className="stroke-muted" strokeWidth="1" />
      <path d="M10 148 L10 156 M110 148 L110 156" className="stroke-muted" strokeWidth="1" />
      <text x="60" y="166" fontSize="9.5" textAnchor="middle" className="fill-muted">burst period: can be audible</text>
    </svg>
  );
}

export default function SwitchingPowerSupplyBuzzingNoisePage() {
  return (
    <HowToShell
      title="Why Does a Switching Power Supply Make a Buzzing Noise? What to Check"
      description={description}
      path="/multimeters/switching-power-supply-buzzing-noise"
      category="multimeters"
      published="2026-10-24"
      intro={
        <>
          A switching power supply makes a buzzing noise when something inside vibrates at a frequency you can
          hear. Usually that is a coil or ceramic capacitor responding to the converter&apos;s switching
          pattern, which is mostly harmless. Sometimes the sound comes from the supply repeatedly shutting down
          under overload, from ageing capacitors, or from arcing, and those need attention. The pattern of the
          noise, and when it starts, tells you which.
        </>
      }
      aside={{
        image: fluke115.image,
        alt: "Fluke 115 digital multimeter",
        caption: (
          <>
            A multimeter confirms whether the output holds its voltage under load. See our{" "}
            <Link href="/multimeters/fluke-115-review" className={link}>
              Fluke 115 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "causes", label: "What makes the sound" },
        { id: "light-load", label: "Light-load burst mode" },
        { id: "overload", label: "Overload and hiccup mode" },
        { id: "capacitors", label: "Ageing capacitors and loose parts" },
        { id: "arcing", label: "Arcing: stop immediately" },
        { id: "what-to-measure", label: "What you can measure" },
      ]}
      faq={[
        {
          q: "Is a buzzing switching power supply dangerous?",
          a: "A steady, faint whine with normal output and no heat or smell is usually just coil whine and not a safety issue. Crackling, popping, a burning smell or visible sparks are different: unplug the supply and stop using it.",
        },
        {
          q: "Why does my power supply only buzz when the device is idle?",
          a: "Many supplies drop into a burst or skip mode at light load to save energy. The bursts repeat at a much lower rate than the normal switching frequency, sometimes low enough to hear. The noise often fades once the load increases.",
        },
        {
          q: "Can I stop coil whine by gluing the inductor?",
          a: "Manufacturers sometimes varnish or pot inductors for exactly this reason, but opening a mains supply to do it exposes you to the charged primary side. For a sealed adapter, replacing it is the safer option.",
        },
        {
          q: "Will a multimeter tell me if the supply is failing?",
          a: "It tells you whether the average output voltage is correct with a load attached, which rules a lot in or out. It cannot show ripple spikes or the rapid restart cycle of hiccup mode; an oscilloscope is needed for those.",
        },
        {
          q: "Why did my power supply start buzzing after I added more devices?",
          a: "The extra load may be pushing it near or past its rated output, so it runs hotter, regulates less comfortably, or cycles in and out of overcurrent protection. Add up the current the connected devices need and compare it with the rating on the label.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-measure-ripple-voltage-with-an-oscilloscope",
          title: "How to Measure Ripple Voltage",
          desc: "Seeing the AC noise riding on a DC output that a multimeter averages away.",
        },
        {
          href: "/multimeters/how-to-check-a-12v-power-supply-under-load",
          title: "How to Check a 12V Power Supply Under Load",
          desc: "The load test that shows whether a noisy supply still holds its voltage.",
        },
      ]}
    >
      <Callout title="Mains supplies can hold a lethal charge after unplugging">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            The primary side of an offline switching supply runs at rectified mains voltage, and its bulk
            capacitor can stay charged after the plug is pulled.
          </li>
          <li>Do not open a mains-powered supply unless you are trained to work on one.</li>
          <li>Every check below on the output side can be done with the case closed.</li>
        </ul>
      </Callout>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">What actually makes the sound</h2>
        <p className="text-muted leading-7 mb-4">
          A switching supply chops current through inductors and a transformer many thousands of times per
          second. Two physical effects turn that into sound when the energy lands in the audible range:
        </p>
        <InfoCards
          items={[
            { label: "Magnetostriction", desc: "Magnetic cores change size slightly as flux changes, so a coil or transformer can hum or whine." },
            { label: "Piezo effect", desc: "Ceramic capacitors (MLCCs) flex with applied voltage and can sing against the board." },
            { label: "Loose windings", desc: "A core or winding that is not firmly bonded rattles at the switching or burst rate." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Coil whine is a mechanical side effect rather than an electrical fault, and many supplies make some
          noise from new. What matters is change: a supply that has always whined faintly is in a different
          category from one that started buzzing last week, got louder, or now runs hot. Note whether the sound
          tracks the load, such as rising when a laptop is busy or a motor starts, since that points to the
          output stage rather than the mains input.
        </p>
      </section>

      <section>
        <h2 id="light-load" className="text-xl font-semibold mb-3">Light-load burst mode</h2>
        <p className="text-muted leading-7 mb-4">
          At normal load the switching frequency sits well above human hearing. To save energy with little or
          nothing connected, many controllers switch in short packets and then pause. The packets repeat far
          more slowly than the switching itself, and that repetition rate can fall into the audible range.
          This is why a phone charger or laptop brick may chirp with no device attached, then go quiet once
          charging starts.
        </p>
        <Figure caption={<>Continuous switching (top) is inaudible. Burst operation at light load (bottom) groups pulses into packets whose repetition can be heard.</>}>
          <BurstModeDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="overload" className="text-xl font-semibold mb-3">Overload and hiccup mode</h2>
        <p className="text-muted leading-7">
          When the output is overloaded or shorted, many supplies shut down, wait, and try again, over and over.
          That restart cycle produces a rhythmic ticking or chirping, and any LED on the supply may flicker in
          time with it. Disconnect the load: if the noise stops and the output recovers, the problem is in what
          the supply is powering, or the load simply needs more current than the supply is rated for.
        </p>
      </section>

      <section>
        <h2 id="capacitors" className="text-xl font-semibold mb-3">Ageing capacitors and loose parts</h2>
        <p className="text-muted leading-7">
          Electrolytic capacitors dry out with heat and time, and their equivalent series resistance (ESR)
          rises. The supply then has to work harder to regulate, ripple increases, and the control loop can
          become unstable enough to buzz. Bulging tops or leaked electrolyte are visible signs, but a capacitor
          can fail by ESR alone while looking normal. A multimeter&apos;s capacitance range does not measure
          ESR; an ESR meter does. For what a standard meter can check, see{" "}
          <Link href="/multimeters/how-to-test-a-capacitor-with-a-multimeter" className={link}>
            how to test a capacitor with a multimeter
          </Link>
          . A supply that started buzzing after a knock may also have a cracked core or loosened potting.
        </p>
      </section>

      <section id="arcing">
        <KeyIdea title="Crackling, popping or a burning smell means unplug it">
          Arcing sounds irregular: sharp crackles or snaps rather than a steady tone. It may come with an
          ozone or hot-plastic smell, scorch marks or flickering output. It means current is jumping a gap
          where it should not, and it can start a fire. Unplug the supply and do not use it again until a
          qualified person has inspected it, or replace it.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={1} id="what-to-measure">What you can measure, and with what</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Without opening the case, put a multimeter on DC volts across the output, first with no load and then
          with the real load or a suitable test resistor connected. The reading should stay within the
          tolerance printed on the label or in the datasheet. The full method is in{" "}
          <Link href="/multimeters/how-to-check-a-12v-power-supply-under-load" className={link}>
            how to check a 12V power supply under load
          </Link>
          .
        </p>
        <DataTable
          head={["Symptom", "Likely cause", "Tool that confirms it"]}
          rows={[
            ["Faint whine, only with no load", "Burst mode at light load", "Listen with and without load"],
            ["Steady whine at normal load", "Coil or MLCC vibration", "Output voltage normal on a multimeter"],
            ["Rhythmic ticking, output drops", "Overload or hiccup protection", "Multimeter shows low or unstable voltage; scope shows restarts"],
            ["Buzz plus heat, rising ripple", "High-ESR electrolytic capacitors", "Oscilloscope for ripple, ESR meter for caps"],
            ["Crackling, smell, sparks", "Arcing or insulation breakdown", "None: unplug and stop using it"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          A multimeter shows an averaged DC value, so it cannot reveal switching spikes, ripple or the on-off
          cycling of hiccup mode. For those, use an oscilloscope: see{" "}
          <Link href="/oscilloscopes/how-to-measure-ripple-voltage-with-an-oscilloscope" className={link}>
            how to measure ripple voltage with an oscilloscope
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/how-to-measure-a-switching-power-supply-waveform-with-an-oscilloscope" className={link}>
            measuring a switching power supply waveform
          </Link>
          .
        </p>
      </section>
    </HowToShell>
  );
}
