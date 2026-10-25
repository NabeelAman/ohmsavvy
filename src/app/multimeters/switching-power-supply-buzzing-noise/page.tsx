import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  InfoCards,
  KeyIdea,
  MeterReadout,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const description =
  "Why a switching power supply makes a buzzing noise: coil whine, light-load burst mode, hiccup protection, tired capacitors and arcing, and what to check safely.";

export const metadata = buildMetadata({
  title: "Switching Power Supply Buzzing Noise",
  description,
  path: "/multimeters/switching-power-supply-buzzing-noise",
});

const all = getAllPicks("multimeters");
const fluke115 = all.find((p) => p.name === "Fluke 115")!;
const fluke179 = all.find((p) => p.name === "Fluke 179")!;
const ut61e = all.find((p) => p.name === "UNI-T UT61E+")!;

const link = "text-accent hover:underline";

/** Normal continuous switching versus burst mode, where packets repeat at an audible rate. */
function BurstModeDiagram() {
  return (
    <svg
      viewBox="0 0 340 170"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram comparing continuous switching pulses at normal load, which are far above hearing, with burst mode at light load, where groups of pulses separated by gaps repeat at a rate that can be audible"
    >
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

/** Hiccup mode: output rises, protection trips, waits, and retries. */
function HiccupDiagram() {
  return (
    <svg
      viewBox="0 0 340 150"
      className="w-full h-auto"
      role="img"
      aria-label="Timeline of hiccup mode: the output voltage repeatedly rises briefly, collapses when overcurrent protection trips, stays off for a wait period and then retries, producing a rhythmic tick"
    >
      <g className="stroke-foreground" strokeWidth="1.2" fill="none">
        <line x1="30" y1="110" x2="325" y2="110" />
        <line x1="30" y1="110" x2="30" y2="20" />
      </g>
      <line x1="30" y1="40" x2="325" y2="40" className="stroke-muted" strokeWidth="1" strokeDasharray="3 3" />
      <path
        d="M30 110 L40 60 L50 110 L120 110 L130 60 L140 110 L210 110 L220 60 L230 110 L300 110 L310 60 L320 110"
        className="stroke-accent"
        strokeWidth="2"
        fill="none"
      />
      <g fontSize="9.5" className="fill-muted">
        <text x="36" y="34">rated output</text>
        <text x="20" y="24" textAnchor="middle">V</text>
        <text x="318" y="124" textAnchor="middle">time</text>
      </g>
      <g fontSize="9.5" textAnchor="middle" className="fill-foreground">
        <text x="45" y="52">retry</text>
        <text x="85" y="100">off, waiting</text>
      </g>
      <text x="170" y="142" fontSize="9.5" textAnchor="middle" className="fill-accent">
        each retry is a tick; the output never reaches its rated voltage
      </text>
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
      updated="2026-10-25"
      intro={
        <>
          A switching power supply buzzes when a coil, transformer or ceramic capacitor inside it vibrates at a
          frequency you can hear, usually because light-load burst mode or an overload has pulled its normally
          ultrasonic switching down into the audible range. A faint, steady whine with a correct output voltage
          is coil whine and mostly harmless; a rhythmic ticking means the supply is repeatedly shutting down
          under overload, and crackling, popping or a burning smell means arcing and you should unplug it now.
          The pattern of the noise, when it starts, and whether the output holds its voltage under load tell you
          which case you have.
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
        { id: "causes", label: "Causes at a glance" },
        { id: "what-makes-the-sound", label: "What makes the sound" },
        { id: "frequencies", label: "Why you can hear it: the frequencies" },
        { id: "listen", label: "Characterize the noise" },
        { id: "change-the-load", label: "Change the load" },
        { id: "measure-output", label: "Measure the output under load" },
        { id: "load-budget", label: "Check the load against the rating" },
        { id: "heat-and-capacitors", label: "Heat and ageing capacitors" },
        { id: "arcing", label: "Arcing: stop immediately" },
        { id: "meters", label: "Meters for supply checks" },
      ]}
      faq={[
        {
          q: "Is a buzzing switching power supply dangerous?",
          a: "A steady, faint whine with normal output voltage and no heat or smell is usually just coil whine and not a safety issue. Crackling, popping, a burning or hot-plastic smell, scorch marks or visible sparks are different: they point to arcing or insulation breakdown. Unplug the supply at once and replace it, or have a qualified technician inspect it before any further use.",
        },
        {
          q: "Why does my power supply only buzz when the device is idle?",
          a: "Many supplies drop into a burst or skip mode at light load to save energy. Instead of switching continuously at tens or hundreds of kilohertz, they fire short packets of pulses with gaps between them, and the packet rate can fall to somewhere in the hundreds of hertz to a few kilohertz, well within hearing. The noise often fades once the load increases.",
        },
        {
          q: "Can I stop coil whine by gluing the inductor?",
          a: "Manufacturers sometimes varnish or pot inductors for exactly this reason, but opening a mains supply to do it exposes you to the charged primary side, and the wrong adhesive can trap heat. For a sealed adapter, replacing it is the safer option. Changing the load, for example by not leaving a charger plugged in with nothing attached, sometimes moves the noise out of the audible range.",
        },
        {
          q: "Will a multimeter tell me if the supply is failing?",
          a: "It tells you whether the average output voltage is correct with a real load attached, which rules a lot in or out. A 12 V supply that reads 12.1 V unloaded and 11.9 V at full load is regulating fine. A multimeter can't show ripple spikes or the fast restart cycle of hiccup mode, though Min/Max recording can catch dropouts. An oscilloscope shows those directly.",
        },
        {
          q: "Why did my power supply start buzzing after I added more devices?",
          a: "The extra load may be pushing it near or past its rated output, so it runs hotter, regulates less comfortably, or cycles in and out of overcurrent protection. Add up the current the connected devices need and compare it with the rating on the label. As a rule of thumb, keep continuous load at or below about 80% of the rating for headroom and a longer life.",
        },
        {
          q: "Why does my laptop charger make a high-pitched noise?",
          a: "Most laptop and phone chargers are small switching supplies that enter burst mode at light load, so a faint squeal when the laptop is fully charged or unplugged is common and usually harmless. If the noise is new, loud, comes with heat or a smell, or the laptop reports charging problems, stop using that charger and replace it with one from the laptop maker.",
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
            The primary side of an offline switching supply runs at rectified mains voltage, roughly 170 V DC from
            a 120 V outlet (120 × √2 ≈ 170) and about 340 V DC from 240 V, and its bulk capacitor can stay charged
            after the plug is pulled.
          </li>
          <li>Do not open a mains-powered supply unless you are trained to work on one.</li>
          <li>Every check below on the output side can be done with the case closed.</li>
          <li>
            If you see smoke or flames, unplug only if it is safe to do so, and call 911 (or your local emergency
            number) if a fire starts.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Causes at a glance</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Faint whine only with little or no load", "Burst mode at light load", "Listen with and without the load connected", "Normal; unplug when not in use"],
            ["Steady whine at normal load, output correct", "Coil or MLCC vibration (coil whine)", "Multimeter shows correct voltage under load", "Usually harmless; replace if it bothers you"],
            ["Rhythmic ticking, LED flickers, output low", "Overload or short: hiccup protection", "Disconnect the load; does output recover?", "Fix the load fault or fit a larger supply"],
            ["Noise after adding devices; supply hot", "Running at or over its rating", "Add up load current vs the label", "Reduce load or upsize the supply"],
            ["Buzz plus heat, output sagging over months", "High-ESR electrolytic capacitors", "Scope for ripple; ESR meter on caps", "Replace the supply, or a qualified repairer"],
            ["Noise started after a drop or knock", "Cracked core or loosened windings", "Visual check of the case; output test", "Replace the supply"],
            ["Crackling, popping, smell, sparks", "Arcing or insulation breakdown", "None: do not test further", "Unplug and replace; never reuse"],
          ]}
        />
      </section>

      <section>
        <h2 id="what-makes-the-sound" className="text-xl font-semibold mb-3">What actually makes the sound</h2>
        <p className="text-muted leading-7 mb-4">
          A switching supply chops current through inductors and a transformer many thousands of times per
          second. Three physical effects turn that into sound when the energy lands in the audible range:
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
          tracks the load, such as rising when a laptop is busy or a motor starts, since that points to the output
          stage rather than the mains input.
        </p>
      </section>

      <section>
        <h2 id="frequencies" className="text-xl font-semibold mb-3">Why you can hear it: the frequencies</h2>
        <p className="text-muted leading-7 mb-4">
          Human hearing spans roughly 20 Hz to 20 kHz, and the upper limit falls with age, so many adults hear
          little above about 15 kHz. Most switching supplies run continuously far above that, commonly somewhere
          from about 50 kHz to several hundred kilohertz, which is why a healthy supply at a steady load is
          silent. The sound appears when something slower modulates the switching: burst packets at light load,
          typically repeating in the hundreds of hertz to a few kilohertz, or hiccup retries a few times per
          second. The ear is most sensitive around 2 to 5 kHz, right where burst-mode packets often land.
        </p>
        <Figure caption={<>Typical, hedged frequencies on a log scale. Exact values depend on the controller and the load; only those below about 20 kHz can be heard.</>}>
          <BarChart
            log
            items={[
              { label: "Hiccup retries", value: 5, display: "~5 Hz" },
              { label: "Burst packets", value: 1000, display: "~1 kHz", highlight: true },
              { label: "Upper hearing limit", value: 20000, display: "20 kHz" },
              { label: "Normal switching", value: 100000, display: "~100 kHz" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="listen">Characterize the noise</StepHeading>
        <p className="text-muted leading-7">
          Listen before you measure. A continuous high whine is coil or capacitor vibration. A buzz or chirp that
          appears only with nothing plugged in is burst mode. A regular tick, often with an LED blinking in time,
          is hiccup mode. A sharp, irregular crackle is arcing, and that ends the investigation: skip to the arcing
          section below. Note whether the sound changes with the load, the temperature or the time since
          switch-on, because each of those points to a different cause in the table above.
        </p>
        <p className="text-muted leading-7 mt-4">
          Pin down where the sound comes from, too. A charger brick that whines from its own body is a different
          case from a desktop computer whose noise comes from the graphics card&apos;s power stage, or a monitor
          that buzzes only at certain brightness settings. Brightness and load changes shift the converter&apos;s
          operating point, which is why a sound can appear at one setting and vanish at the next. A short phone
          recording made close to the case, noting what was connected at the time, gives you a baseline to
          compare against if the noise changes, and it is useful evidence for a repair shop or a warranty claim.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="change-the-load">Change the load</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Disconnect everything from the output and listen, then reconnect the load. If the noise appears only
          unloaded and stops with the device attached, it is burst mode and harmless. If it ticks with the load
          and stops when you disconnect it, the supply is in overcurrent protection: the load is faulty or too
          big. If it is the same either way, it is coil whine from the supply itself.
        </p>
        <Figure caption={<>Continuous switching (top) is inaudible. Burst operation at light load (bottom) groups pulses into packets whose repetition can be heard.</>}>
          <BurstModeDiagram />
        </Figure>
        <Figure caption={<>Hiccup mode: under overload the supply starts, trips, waits and retries, and each retry is an audible tick.</>}>
          <HiccupDiagram />
        </Figure>
      </section>

      <section>
        <StepHeading n={3} id="measure-output">Measure the output under load</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Without opening the case, put a multimeter on DC volts across the output, first with no load and then
          with the real load or a suitable test resistor connected. Size the resistor with Ohm&apos;s law: for a
          12 V supply at half of a 5 A rating, R = V ÷ I = 12 ÷ 2.5 = 4.8 Ω, and it dissipates P = V²÷R = 12² ÷ 4.8 = 30 W,
          so it needs a power resistor rated well above 30 W and it will get hot. The reading should stay within
          the tolerance printed on the label or datasheet; many supplies hold within a few percent. The full
          method is in{" "}
          <Link href="/multimeters/how-to-check-a-12v-power-supply-under-load" className={link}>
            how to check a 12V power supply under load
          </Link>
          .
        </p>
        <div className="grid sm:grid-cols-2 gap-4 items-center">
          <Figure caption={<>Illustrative reading: a 12 V supply holding its voltage at half load. The buzz is likely harmless whine.</>}>
            <MeterReadout value="11.94" unit="V DC" mode="V⎓  2.5 A load" />
          </Figure>
          <Figure caption={<>Illustrative reading: an average that sags and wanders, typical of a supply cycling in protection.</>}>
            <MeterReadout value="7.3" unit="V DC" mode="V⎓  unstable" />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          A multimeter shows an averaged DC value, so it can&apos;t reveal switching spikes, ripple or the on-off
          cycling of hiccup mode, though a Min/Max recording mode catches dropouts. For the waveform itself, see{" "}
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

      <section>
        <StepHeading n={4} id="load-budget">Check the load against the rating</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A supply that started buzzing after you added devices may simply be overloaded. Add up the current each
          device needs and compare it with the label. Example: three devices on a 12 V, 5 A (60 W) supply drawing
          1.5 A, 2 A and 2 A total 5.5 A, which is 5.5 ÷ 5 = 110% of the rating. The supply will run hot and may tick
          in and out of protection. A common rule of thumb is to keep the continuous load at or below about 80%
          of the rating, here 0.8 × 5 = 4 A.
        </p>
        <DataTable
          head={["Load on a 12 V, 5 A supply", "Current", "Share of rating", "Verdict"]}
          rows={[
            ["One LED strip", "2.0 A", "40%", "Comfortable"],
            ["Strip + controller + fan", "3.8 A", "76%", "Fine, within 80%"],
            ["Three devices (example above)", "5.5 A", "110%", "Overloaded: expect heat and hiccup"],
          ]}
          mono={[1, 2]}
        />
        <p className="text-muted leading-7 mt-4">
          If an LED driver is shutting off rather than buzzing, the same arithmetic applies; see{" "}
          <Link href="/multimeters/why-does-my-led-power-supply-keep-shutting-off" className={link}>
            why an LED power supply keeps shutting off
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={5} id="heat-and-capacitors">Check heat and ageing capacitors</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Electrolytic capacitors dry out with heat and time, and their equivalent series resistance (ESR) rises.
          The supply then has to work harder to regulate, ripple increases, and the control loop can become
          unstable enough to buzz. A widely used rule of thumb says electrolytic life roughly doubles for every
          10 °C drop in operating temperature, so a capacitor rated 2,000 hours at 105 °C might last on the order
          of 2,000 × 2 = 4,000 hours at 95 °C and 8,000 hours at 85 °C. Heat is what ages a supply, which is why a
          buzzing supply in a closed cabinet deserves attention.
        </p>
        <Figure caption={<>Estimated life of an illustrative 2,000-hour, 105 °C capacitor using the hedged 10 °C doubling rule.</>}>
          <BarChart
            items={[
              { label: "105 °C", value: 2000, display: "2,000 h" },
              { label: "95 °C", value: 4000, display: "4,000 h" },
              { label: "85 °C", value: 8000, display: "8,000 h" },
              { label: "75 °C", value: 16000, display: "16,000 h", highlight: true },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Bulging tops or leaked electrolyte are visible signs, but a capacitor can fail by ESR alone while looking
          normal. A multimeter&apos;s capacitance range does not measure ESR; an ESR meter does. For what a standard
          meter can check, see{" "}
          <Link href="/multimeters/how-to-test-a-capacitor-with-a-multimeter" className={link}>
            how to test a capacitor with a multimeter
          </Link>
          . Give the supply open air around it, and replace a sealed adapter that buzzes and runs hot rather than
          opening it.
        </p>
      </section>

      <section id="arcing">
        <KeyIdea title="Crackling, popping or a burning smell means unplug it">
          Arcing sounds irregular: sharp crackles or snaps rather than a steady tone. It may come with an ozone or
          hot-plastic smell, scorch marks or flickering output. It means current is jumping a gap where it should
          not, and it can start a fire. Unplug the supply and do not use it again until a qualified person has
          inspected it, or replace it. A steady tone with a correct output, on the other hand, is almost always
          harmless whine.
        </KeyIdea>
      </section>

      <section>
        <h2 id="meters" className="text-xl font-semibold mb-3">Meters for supply checks</h2>
        <p className="text-muted leading-7 mb-4">
          A dependable DC voltage reading under load answers most buzzing-supply questions, and Min/Max recording
          helps catch a supply that drops out. These picks come from our verified multimeter list.
        </p>
        <ProductStrip
          title="Meters for load tests and dropout checks"
          items={[
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 True RMS digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "True RMS, CAT III 600V, 6,000-count backlit display, with capacitance and frequency. Hands-on Tested.",
            },
            {
              name: "Fluke 179",
              image: fluke179.image,
              alt: "Fluke 179 True RMS digital multimeter",
              href: "/multimeters/best-multimeters#fluke-179",
              note: "True RMS, CAT IV 600V, 6,000-count with analog bar graph and Min/Max-Average recording for catching dropouts.",
            },
            {
              name: "UNI-T UT61E+",
              image: ut61e.image,
              alt: "UNI-T UT61E+ True RMS digital multimeter",
              href: "/multimeters/best-multimeters-for-electronics-repair#uni-t-ut61e+",
              note: "22,000-count True RMS with ±(0.05%+5) DC volts, frequency to 220 MHz and a USB PC link.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
