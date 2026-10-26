import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Hantek 1008B extra facts (12-bit; 4K points max on one channel; 1 MΩ inputs, DC coupling; 10 mV/div to 5 V/div at x1;
// max input 400 V peak (DC + peak); edge trigger on CH1 to CH8 with Auto/Normal/Single; 20 automatic measurements;
// add/subtract/multiply/divide math and FFT; over 80 automotive diagnostic functions with reference waveforms and video
// help; 8-channel programmable LVTTL square-wave generator, 0 to 250 kHz, able to simulate crankshaft and camshaft
// signals; USB 2.0 bus powered; Windows 7/8/10; 190 x 167 x 35 mm; 0.63 kg; 100 kHz bandwidth stated in the manual
// only) per https://hantek.com/products/detail/13169 and https://www.hantek.com/Product/Hantek1008/Hantek1008_Manual.pdf
// Appendix A (checked 2026-10-24). Conflict: the spec table shared by Hantek's 1008A/B/C pages lists one high-voltage
// ignition probe, but the kit photo on the Amazon listing B01EZWJRGG shows none.
// Hantek 6022BE extra facts (8-bit; 1 MΩ / 25 pF; DC coupling only; 20 mV to 5 V/div; rising/falling edge trigger on
// CH1/CH2 with Auto/Normal/Single; X-Y mode; FFT and add/subtract/multiply/divide math; cursors; USB 2.0 bus powered;
// diode-clamp input protection with no voltage figure; 205 x 120 x 35 mm, weight not stated; Windows 10/8/7/NT/XP/Vista;
// no generator; memory figure not clearly assigned to this model) per https://hantek.com/products/detail/31
// (checked 2026-10-24).

const path = "/oscilloscopes/hantek-1008b-vs-hantek-6022be";
const h1008 = picks.find((p) => p.name === "Hantek 1008B")!;
const h6022 = picks.find((p) => p.name === "Hantek 6022BE")!;

export const metadata = buildMetadata({
  title: "Hantek 1008B vs 6022BE: USB Scopes Compared",
  description:
    "Hantek 1008B vs Hantek 6022BE: an 8-channel 12-bit automotive USB scope against a 2-channel 20 MHz general USB scope. Which job suits each one?",
  path: "/oscilloscopes/hantek-1008b-vs-hantek-6022be",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Hantek 1008B vs Hantek 6022BE",
  path,
  published: "2026-10-24",
  intro:
    "Hantek 1008B vs Hantek 6022BE looks like a match between two screenless Hantek boxes that plug into a Windows PC, but the two were built for different work. The 1008B is an automotive tool: eight 12-bit channels, 2.4 MSa/s and 100kHz, with a crank and cam signal simulator. The 6022BE is a general electronics scope: two 8-bit channels, 48 MS/s and 20 MHz. Pick by the signals you plan to look at, not by the channel count.",
  a: {
    pick: h1008,
    imageAlt: "Hantek 1008B eight-channel automotive USB oscilloscope",
    chooseIf: [
      "You diagnose cars and want several sensors on screen at once, such as crank, cam and injector signals",
      "You want built-in automotive test routines with reference waveforms rather than a blank scope",
      "You need to feed crankshaft or camshaft style square waves into an ECU input on the bench",
      "Your signals are slow but you care about small changes in level, where 12 bits help",
    ],
  },
  b: {
    pick: h6022,
    imageAlt: "Hantek 6022BE two-channel USB PC oscilloscope",
    chooseIf: [
      "You work on Arduino, Raspberry Pi or hobby electronics rather than vehicles",
      "Your signals run from tens of kHz into the low MHz, past the 1008B's 100kHz ceiling",
      "Two channels are enough and you want X-Y mode for phase or Lissajous plots",
      "You want the cheaper of the two for learning how a scope works",
    ],
  },
  extraSpecs: [
    { label: "ADC resolution", a: "12-bit (4,096 levels)", b: "8-bit (256 levels)" },
    { label: "Memory", a: "4K points (one channel)", b: "Not clearly stated by Hantek" },
    { label: "Input coupling", a: "DC, 1 MΩ", b: "DC only, 1 MΩ / 25 pF" },
    { label: "Vertical range (x1 probe)", a: "10 mV/div to 5 V/div", b: "20 mV/div to 5 V/div" },
    { label: "Maximum input", a: "400 V peak (DC + peak)", b: "Not stated by Hantek (diode-clamp protection listed)" },
    { label: "Trigger", a: "Edge on any of CH1 to CH8; Auto, Normal, Single", b: "Rising or falling edge on CH1 or CH2; Auto, Normal, Single" },
    { label: "Built-in output", a: "8-channel LVTTL square-wave generator, 0 to 250 kHz", b: "None" },
    { label: "Software", a: "Windows 7/8/10, over 80 automotive test functions", b: "Windows 10/8/7/NT/XP/Vista" },
    { label: "Power", a: "USB 2.0 bus power", b: "USB 2.0 bus power" },
    { label: "Size", a: "190 × 167 × 35 mm, 0.63 kg", b: "205 × 120 × 35 mm (weight not stated by Hantek)" },
  ],
  differences: [
    "Purpose: the 1008B is sold as an automotive diagnostic scope with over 80 vehicle test functions in its software; the 6022BE is a plain general-purpose PC scope.",
    "Channels: eight analog inputs on the 1008B against two on the 6022BE.",
    "Speed: the 6022BE has 200 times the bandwidth (20 MHz against 100kHz) and 20 times the maximum sample rate (48 MS/s against 2.4 MSa/s with one channel on).",
    "Resolution: 12-bit on the 1008B against 8-bit on the 6022BE, so each vertical step is 16 times finer on the 1008B at the same volts-per-division setting.",
    "Signal output: the 1008B has eight square-wave outputs up to 250 kHz that can mimic crankshaft and camshaft sensors; the 6022BE has no generator.",
    "Unstated figures: Hantek gives neither model's per-channel sample rate with all channels running, and doesn't clearly assign a memory depth to the 6022BE.",
    "Ignition probe: Hantek's 1008B page lists a high-voltage ignition probe, but the kit photo on the Amazon listing we link doesn't show one. Check the box contents before you plan secondary-ignition work.",
    "Shared limits: both need a Windows PC, have no screen or battery, run from USB bus power and offer DC coupling only. Neither carries our Hands-on Tested badge.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          The charts split cleanly in two. On speed the 6022BE wins by more than an order of magnitude, so those bars use
          a log scale. On channel count and resolution the 1008B wins by a wide margin. Which half matters depends
          entirely on whether your signals are fast or numerous.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Analog bandwidth, log scale. The 1008B&apos;s 100kHz figure appears in Hantek&apos;s manual, not on its product page.</>}>
            <BarChart
              log
              items={[
                { label: "Hantek 6022BE", value: 20_000_000, display: "20 MHz", highlight: true },
                { label: "Hantek 1008B", value: 100_000, display: "100kHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Maximum sample rate, log scale. Both are single-channel or maximum figures; Hantek gives no all-channels rate for either.</>}>
            <BarChart
              log
              items={[
                { label: "Hantek 6022BE", value: 48_000_000, display: "48 MS/s", highlight: true },
                { label: "Hantek 1008B", value: 2_400_000, display: "2.4 MSa/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Analog input channels: four times as many on the 1008B.</>}>
            <BarChart
              items={[
                { label: "Hantek 1008B", value: 8, display: "8 channels", highlight: true },
                { label: "Hantek 6022BE", value: 2, display: "2 channels" },
              ]}
            />
          </Figure>
          <Figure caption={<>Vertical levels from the converter: 12-bit gives 4,096 steps, 8-bit gives 256.</>}>
            <BarChart
              items={[
                { label: "Hantek 1008B", value: 4096, display: "4,096 levels (12-bit)", highlight: true },
                { label: "Hantek 6022BE", value: 256, display: "256 levels (8-bit)" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          One more ratio is worth working out. Dividing each sample rate by its bandwidth gives 24 samples per cycle for
          the 1008B at 100kHz and 2.4 for the 6022BE at 20 MHz. The 1008B is slow, but it is sampled generously for its
          bandwidth, so a waveform near its limit still comes out with a recognizable shape. The 6022BE sits barely above
          the Nyquist floor at its rated bandwidth, so its practical ceiling for faithful waveform shape is a few MHz. See{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            what oscilloscope bandwidth means
          </Link>{" "}
          for how the two numbers interact.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Pick", "One-line reason"]}
          rows={[
            ["Checking crank and cam sensor sync on an engine", "Hantek 1008B", "Eight channels show both sensors plus others on one time base"],
            ["Learning to use a scope with an Arduino kit", "Hantek 6022BE", "20 MHz covers PWM, UART and I2C; the 1008B tops out at 100kHz"],
            ["Bench-testing an ECU or tachometer input without an engine", "Hantek 1008B", "Its square-wave outputs can simulate crankshaft and camshaft signals"],
            ["Looking at a 400kHz I2C bus or a switching regulator", "Hantek 6022BE", "Both sit far beyond the 1008B's bandwidth"],
            ["Watching a slow sensor voltage drift by a few millivolts", "Hantek 1008B", "12-bit steps are 16 times finer than 8-bit at the same setting"],
            ["Plotting the phase between two signals", "Hantek 6022BE", "Hantek lists X-Y mode for it"],
            ["A garage technician who wants guided tests", "Hantek 1008B", "Over 80 automotive functions with reference waveforms and video help"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Two different jobs: workshop or workbench</h2>
        <p className="text-muted leading-7 mb-4">
          Bandwidth is the frequency at which a sine wave reads about 30% low. The usual advice is to buy three to five
          times the highest frequency you need to see, and more for square waves, whose edges carry harmonics far above
          the fundamental. Apply that rule and the two scopes land in very different places.
        </p>
        <h3 className="text-lg font-semibold mb-2">Hantek 1008B: many slow signals at once</h3>
        <p className="text-muted leading-7 mb-4">
          With 100kHz bandwidth, the 1008B is comfortable up to roughly 20–33kHz. That sounds low until you look at what
          a car produces. Take a 60-tooth crank wheel with two missing teeth: at 6,000 rpm the engine turns 100 times a
          second, so the sensor sends about 6,000 pulses a second, comfortably inside that range. Cam sensors, wheel-speed
          sensors, throttle position, oxygen sensors and injector control signals are slower still or similar. The
          1008B&apos;s real advantage is eight channels on one time base, so you can line up a crank signal against a cam
          signal and several injectors and see which event comes first. Twelve bits matter for analog sensors, where a
          small step in a slowly changing voltage is the fault. Its 4K-point memory is shallow, though, so long captures
          at a fast sample rate will run out of points.
        </p>
        <h3 className="text-lg font-semibold mb-2">Hantek 6022BE: two fast-enough channels for electronics</h3>
        <p className="text-muted leading-7 mb-4">
          The 6022BE&apos;s 20 MHz suits signals up to roughly 4–7 MHz by the bandwidth rule, and the sample rate argues
          for the lower end of that. That covers what most hobby benches produce: microcontroller PWM, UART at common baud
          rates, 100kHz and 400kHz I2C, audio circuits and many small switching converters. It is the wrong tool in a
          car, though. Two channels can&apos;t show a crank, a cam and an injector together, it has no automotive test
          library, and Hantek doesn&apos;t give a maximum input voltage for it, only diode-clamp protection. Its 8-bit
          converter also makes small changes on a large signal harder to see than on the 1008B.
        </p>
        <div className="mt-4">
          <KeyIdea title="Why the generator outputs matter on the 1008B">
            Hantek lists eight LVTTL square-wave outputs on the 1008B, programmable from 0 to 250 kHz and able to simulate
            crankshaft and camshaft signals. That turns it into a stimulus as well as a scope: you can drive a
            tachometer, a module input or a training rig with a known pattern and watch the response on the input
            channels. Note the level is LVTTL, a low logic voltage, so check what the device under test expects before
            connecting. The 6022BE has no output of any kind.
          </KeyIdea>
        </div>
        <div className="mt-4">
          <Callout title="Grounds and high voltage">
            On both scopes the probe grounds connect to the computer&apos;s ground, and through a desktop PC or a laptop on
            a grounded charger, to mains earth. In a car, running the laptop on its own battery avoids a ground path
            through the charger. Ignition secondaries run to thousands of volts: never connect a scope input to a spark
            plug lead directly, only through a proper capacitive ignition probe, and confirm one is in your kit, given the
            conflict noted above. The 1008B&apos;s 400 V peak rating is an input limit, not a safety category, and
            neither scope is meant for probing mains wiring.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What the two have in common</h2>
        <p className="text-muted leading-7 mb-4">
          Neither box has a screen, controls or battery. Each draws its power from a USB 2.0 port and shows its traces in
          Hantek&apos;s Windows software: Windows 7, 8 and 10 for the 1008B, and Windows 10 back to XP for the 6022BE. Mac
          and Linux users should look elsewhere. Both inputs are DC-coupled at 1 MΩ, so a small ripple on a large DC level
          needs a blocking capacitor or careful offset to fill the screen. Physically they are close too: both are 35 mm
          deep, with the 1008B shorter and wider than the 6022BE.
        </p>
        <p className="text-muted leading-7">
          If your interest is electronics rather than engines, the 6022BE has several other rivals worth reading:{" "}
          <Link href="/oscilloscopes/owon-vds1022i-vs-hantek-6022be" className={link}>
            OWON VDS1022I vs Hantek 6022BE
          </Link>
          ,{" "}
          <Link href="/oscilloscopes/picoscope-2204a-vs-hantek-6022be" className={link}>
            PicoScope 2204A vs Hantek 6022BE
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/picoscope-2206b-vs-hantek-6022be" className={link}>
            PicoScope 2206B vs Hantek 6022BE
          </Link>
          . For a scope with its own screen, see{" "}
          <Link href="/oscilloscopes/hantek-6022be-vs-hantek-dso2d10" className={link}>
            Hantek 6022BE vs Hantek DSO2D10
          </Link>{" "}
          or the{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            beginner oscilloscope picks
          </Link>
          , and the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            buying guide
          </Link>{" "}
          explains each spec in plain terms.
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Buy the Hantek 1008B if you diagnose vehicles: eight 12-bit channels, guided automotive tests and a crank and cam simulator matter more there than speed, and 100kHz covers engine sensors. Buy the Hantek 6022BE for general electronics on a Windows laptop: 20 MHz and 48 MS/s handle hobby signals the 1008B can't, and two channels cover most bench jobs. Neither is a good substitute for the other.",
  faqs: [
    {
      question: "Can the Hantek 6022BE be used for car diagnostics?",
      answer:
        "It can show a single slow sensor signal, since 20 MHz is far more bandwidth than engine sensors need. But it has only two channels, no automotive test library or reference waveforms, no signal simulator and no stated maximum input voltage. For timing several engine signals against each other, the 8-channel Hantek 1008B is the tool built for that job.",
    },
    {
      question: "Is 100kHz bandwidth enough for automotive work?",
      answer:
        "For most engine sensors, yes. A 60-tooth crank wheel at 6,000 rpm produces about 6kHz, well inside the 1008B's comfortable range of roughly 20 to 33kHz. It is not enough for in-vehicle networks such as CAN at common bit rates, which need far more bandwidth to show clean edges. Hantek states the 100kHz figure in its manual rather than on the product page.",
    },
    {
      question: "Does the Hantek 1008B come with an ignition probe?",
      answer:
        "Hantek's spec table, which is the same on its 1008A, 1008B and 1008C pages, lists one high-voltage ignition probe. The kit photo on the Amazon listing we link shows a case, eight test leads, a USB cable and one x10 probe, but no ignition probe. Confirm the contents with the seller if you need to look at secondary ignition.",
    },
    {
      question: "Why does 12-bit resolution matter on the 1008B?",
      answer:
        "A 12-bit converter splits the screen's vertical range into 4,096 levels, against 256 for the 6022BE's 8-bit converter. At the same volts-per-division setting, each step is 16 times smaller. That helps when the fault is a small change in a slowly moving voltage, such as a sensor signal that dips briefly, and matters less for fast logic signals.",
    },
    {
      question: "Do either of these Hantek scopes work on a Mac?",
      answer:
        "Hantek lists Windows software only for both: Windows 7, 8 and 10 for the 1008B, and Windows 10, 8, 7, NT, XP and Vista for the 6022BE. Neither has a screen of its own, so without a Windows PC neither will display anything. Mac users who want a USB scope should look at models whose makers list macOS support.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "MINIWARE DS213 vs FNIRSI DSO152", href: "/oscilloscopes/miniware-ds213-vs-fnirsi-dso152" },
    { label: "FNIRSI 1013D Plus vs FNIRSI 1014D", href: "/oscilloscopes/fnirsi-1013d-plus-vs-fnirsi-1014d" },
    { label: "Hantek DSO2D15 vs FNIRSI 1014D", href: "/oscilloscopes/hantek-dso2d15-vs-fnirsi-1014d" },
    { label: "HANMATEK HO52 vs OWON HDS272S", href: "/oscilloscopes/hanmatek-ho52-vs-owon-hds272s" },
    { label: "HANMATEK DOS1102 vs Hantek DSO2C10", href: "/oscilloscopes/hanmatek-dos1102-vs-hantek-dso2c10" },
    { label: "FNIRSI 2C53T vs FNIRSI 1014D", href: "/oscilloscopes/fnirsi-2c53t-vs-fnirsi-1014d" },
    { label: "Hantek DSO2C10 vs FNIRSI 1014D", href: "/oscilloscopes/hantek-dso2c10-vs-fnirsi-1014d" },
    { label: "PicoScope 2204A vs Hantek 6022BE", href: "/oscilloscopes/picoscope-2204a-vs-hantek-6022be" },
    { label: "FNIRSI DSO152 vs Hantek 6022BE", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-6022be" },
    { label: "OWON VDS1022I vs Hantek 6022BE", href: "/oscilloscopes/owon-vds1022i-vs-hantek-6022be" },
    { label: "PicoScope 2206B vs Hantek 6022BE", href: "/oscilloscopes/picoscope-2206b-vs-hantek-6022be" },
    { label: "Hantek 6022BE vs Hantek DSO2D10", href: "/oscilloscopes/hantek-6022be-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs Hantek 6022BE", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-6022be" },
    { label: "Rigol DHO914 vs Rigol DHO804", href: "/oscilloscopes/rigol-dho914-vs-rigol-dho804" },
    { label: "Rigol DHO914S vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho914s-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1104Z-S Plus vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1104z-s-plus-vs-siglent-sds1104x-e" },
    { label: "Hantek DSO2C10 vs Hantek DSO2D10", href: "/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d10" },
    { label: "OWON HDS2202S vs FNIRSI DSO152", href: "/oscilloscopes/owon-hds2202s-vs-fnirsi-dso152" },
    { label: "FNIRSI DSO-TC3 vs FNIRSI DSO152", href: "/oscilloscopes/fnirsi-dso-tc3-vs-fnirsi-dso152" },
    { label: "FNIRSI DSO152 vs Hantek DSO2D10", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-dso2d10" },
    { label: "FNIRSI DSO152 vs Siglent SDS1104X-E", href: "/oscilloscopes/fnirsi-dso152-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs FNIRSI DSO152", href: "/oscilloscopes/rigol-ds1054z-vs-fnirsi-dso152" },
    { label: "Rigol DHO802 vs FNIRSI DSO152", href: "/oscilloscopes/rigol-dho802-vs-fnirsi-dso152" },
    { label: "Hantek 2D72 vs FNIRSI 2C53T", href: "/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t" },
    { label: "FNIRSI 1014D vs FNIRSI DSO-TC3", href: "/oscilloscopes/fnirsi-1014d-vs-fnirsi-dso-tc3" },
    { label: "Rigol DS1054Z vs OWON SDS1102", href: "/oscilloscopes/rigol-ds1054z-vs-owon-sds1102" },
    { label: "Rigol DS1054Z vs OWON VDS1022I", href: "/oscilloscopes/rigol-ds1054z-vs-owon-vds1022i" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1202x-e" },
    { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs Hantek DSO5102P", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso5102p" },
    { label: "Rigol DHO802 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho802-vs-rigol-ds1054z" },
    { label: "Rigol DHO802 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho802-vs-hantek-dso2d10" },
    { label: "Siglent SDS1104X-E vs Rigol DHO802", href: "/oscilloscopes/siglent-sds1104x-e-vs-rigol-dho802" },
    { label: "Rigol DHO804 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" },
    { label: "Rigol DHO804 vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e" },
    { label: "Rigol DHO804 vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1202x-e" },
    { label: "Rigol DHO804 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho804-vs-hantek-dso2d10" },
    { label: "Rigol DHO804 vs FNIRSI 1014D", href: "/oscilloscopes/rigol-dho804-vs-fnirsi-1014d" },
    { label: "Hantek DSO5102P vs Rigol DHO804", href: "/oscilloscopes/hantek-dso5102p-vs-rigol-dho804" },
    { label: "Hantek DSO2D10 vs Siglent SDS1104X-E", href: "/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" },
    { label: "Siglent SDS1202X-E vs Hantek DSO2D10", href: "/oscilloscopes/siglent-sds1202x-e-vs-hantek-dso2d10" },
    { label: "Siglent SDS1104X-E vs Hantek DSO5102P", href: "/oscilloscopes/siglent-sds1104x-e-vs-hantek-dso5102p" },
    { label: "Siglent SDS1104X-E vs Siglent SDS1202X-E", href: "/oscilloscopes/siglent-sds1104x-e-vs-siglent-sds1202x-e" },
    { label: "Rigol DS1102Z-E vs Siglent SDS1102CML+", href: "/oscilloscopes/rigol-ds1102z-e-vs-siglent-sds1102cml-plus" },
    { label: "PicoScope 2204A vs Digilent Analog Discovery 3", href: "/oscilloscopes/picoscope-2204a-vs-digilent-analog-discovery-3" },
  ],
};

export default function Hantek1008bVsHantek6022bePage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
