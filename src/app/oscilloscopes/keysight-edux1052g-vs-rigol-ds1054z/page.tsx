import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Keysight EDUX1052G extras per the InfiniiVision 1000 X-Series data sheet 5992-3484EN (Nov 2024)
// (https://www.keysight.com/content/dam/keysight/en/doc/ungate/data-sheets/5992-3484.pdf) and
// https://www.keysight.com/us/en/product/EDUX1052G/oscilloscope-50-mhz-2-analog-channels-waveform-generator.html:
// 50 MHz (-3 dB), calculated rise time 7 ns; 2 analog channels, external trigger viewable as a 3rd digital channel;
// 1 GSa/s on all channels; 8-bit (High Resolution mode up to 12 bits at <=20 us/div); 200 kpts; 100,000 wfm/s;
// 7.0-inch WVGA color TFT; WaveGen 20 MHz (sine to 20 MHz, square/pulse to 10 MHz, ramp to 200 kHz, AM/FM/FSK,
// up to 20 Vpp into Hi-Z, not isolated); standard I2C and UART/RS-232 trigger/decode; Bode plot; DVM; counter;
// built-in training signals; no segmented memory; USB 2.0 host+device and 10/100 LAN; 100-240 V, 50 W max;
// 314 x 165 x 130 mm, 3.23 kg; two N2142A 75 MHz probes; 3-year warranty (research file keysight-edux1052g.json,
// checked 2026-10-24).
// Rigol DS1054Z extras per the DS1000Z datasheet DSA20100-2020-09
// (https://www.rigol.com/dam/global/downloads/brochures/en/data-sheet/oscilloscopes/DS1000Z_DataSheet_EN.pdf):
// 8-bit (12-bit high-res mode), 7-inch 800x480, up to 30,000 wfm/s, 1 GSa/s (1 ch) / 500 MSa/s (2 ch) / 250 MSa/s (3-4 ch),
// decode Parallel, RS232/UART, I2C, SPI, USB host/device + LAN, 100-240 V AC 50 W max, no generator (-S models only),
// no digital channels. Conflict: https://www.rigol.com/intl/products/oscilloscope/DS1000Z.html says 12M standard /
// 24M optional memory and lists bus triggering/decoding as options; the datasheet lists 24 Mpts and decoding with no
// option label (via research/verified-facts.md, checked 2026-10-24).

const path = "/oscilloscopes/keysight-edux1052g-vs-rigol-ds1054z";

export const metadata = buildMetadata({
  title: "Keysight EDUX1052G vs DS1054Z for Beginners",
  description:
    "Keysight EDUX1052G vs Rigol DS1054Z for beginners: training signals, a 20 MHz generator and 100,000 wfm/s against four channels and deeper memory.",
  path: "/oscilloscopes/keysight-edux1052g-vs-rigol-ds1054z",
});

const link = "text-accent hover:underline";

/** Bode plot hookup: WaveGen sweeps the circuit while CH1 and CH2 measure input and output. */
function BodeSetupDiagram() {
  return (
    <svg
      viewBox="0 0 360 190"
      className="w-full h-auto"
      role="img"
      aria-label="Bode plot setup on the Keysight EDUX1052G: the built-in WaveGen output sweeps a filter or amplifier, channel 1 probes the circuit's input, channel 2 probes its output, and the scope plots gain against frequency. The Rigol DS1054Z has no generator, so the same test needs a separate source and manual frequency steps."
    >
      <rect x="10" y="20" width="130" height="125" rx="10" className="fill-surface stroke-foreground" strokeWidth="1.4" />
      <text x="75" y="14" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">Keysight EDUX1052G</text>
      <rect x="18" y="30" width="78" height="56" rx="3" className="fill-accent/10 stroke-border" strokeWidth="1" />
      <line x1="24" y1="80" x2="92" y2="80" className="stroke-border" strokeWidth="0.8" />
      <line x1="24" y1="36" x2="24" y2="80" className="stroke-border" strokeWidth="0.8" />
      <path d="M24 46 H54 C66 46 72 54 78 64 S88 78 92 79" className="fill-none stroke-accent" strokeWidth="1.6" />
      <text x="58" y="42" fontSize="7.5" textAnchor="middle" className="fill-muted">gain vs frequency</text>
      {[
        { y: 56, tag: "WaveGen" },
        { y: 100, tag: "CH1" },
        { y: 126, tag: "CH2" },
      ].map((p) => (
        <g key={p.tag}>
          <text x="134" y={p.y + 3} fontSize="8.5" fontWeight="700" textAnchor="end" className="fill-foreground">
            {p.tag}
          </text>
          <circle cx="140" cy={p.y} r="2.6" className="fill-accent" />
        </g>
      ))}
      <rect x="210" y="40" width="90" height="56" rx="6" className="fill-surface stroke-accent" strokeWidth="1.4" />
      <text x="255" y="64" fontSize="9" textAnchor="middle" className="fill-foreground">RC filter or</text>
      <text x="255" y="77" fontSize="9" textAnchor="middle" className="fill-foreground">audio amplifier</text>
      <path d="M140 56 H210" className="stroke-accent fill-none" strokeWidth="1.6" />
      <text x="172" y="50" fontSize="8" textAnchor="middle" className="fill-accent">swept sine</text>
      <path d="M140 100 H180 V56" className="stroke-foreground fill-none" strokeWidth="1.3" />
      <circle cx="180" cy="56" r="2.6" className="fill-foreground" />
      <path d="M140 126 H320 V68 H300" className="stroke-foreground fill-none" strokeWidth="1.3" />
      <circle cx="300" cy="68" r="2.6" className="fill-foreground" />
      <text x="188" y="96" fontSize="8" className="fill-muted">input</text>
      <text x="324" y="100" fontSize="8" className="fill-muted">output</text>
      <text x="180" y="172" fontSize="8.5" textAnchor="middle" className="fill-muted">
        DS1054Z: no WaveGen; add a separate generator and step it by hand
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Keysight EDUX1052G vs Rigol DS1054Z for Beginners",
  path,
  published: "2026-10-25",
  intro:
    "Keysight EDUX1052G vs Rigol DS1054Z sets two 50MHz bench scopes with very different priorities against each other. Keysight's education model gives you two channels, built-in training signals, a 20MHz function generator and a 100,000 wfm/s update rate. The Rigol, which carries our Hands-on Tested badge, gives you four channels and far deeper memory, but no generator.",
  a: {
    pick: picks.find((p) => p.name === "Keysight EDUX1052G")!,
    imageAlt: "Keysight EDUX1052G two-channel 50MHz oscilloscope with built-in WaveGen generator",
    chooseIf: [
      "You are learning on your own and want signals to practice on before you have built a circuit",
      "You want a source and a scope in one box, for filters, amplifiers and Bode plots",
      "You value the fastest screen refresh here for spotting rare glitches",
      "Two channels cover your work: input against output, or clock against data",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Rigol DS1054Z")!,
    reviewHref: "/oscilloscopes/rigol-ds1054z-review",
    imageAlt: "Rigol DS1054Z four-channel 50MHz digital bench oscilloscope",
    chooseIf: [
      "You need to watch three or four signals at once, such as a full SPI bus or a stepper driver",
      "You want long captures that keep a high sample rate, thanks to millions of points of memory",
      "Your circuits already make their own signals, or you own a separate generator",
      "You want the pick in this pairing that carries our Hands-on Tested badge",
    ],
  },
  extraSpecs: [
    { label: "Sample rate, all channels on", a: "1 GSa/s on both channels", b: "250 MSa/s with 3–4 channels (500 MSa/s with 2)" },
    { label: "Waveform update rate", a: "100,000 wfm/s", b: "Up to 30,000 wfm/s" },
    { label: "Memory depth", a: "200 kpts", b: "Rigol conflicts: 12M standard / 24M optional (product page), 24 Mpts (datasheet)" },
    { label: "ADC resolution", a: "8-bit (up to 12-bit in High Resolution mode)", b: "8-bit (up to 12-bit in high-res mode)" },
    { label: "Display", a: "7-inch WVGA color TFT", b: "7-inch WVGA, 800 × 480" },
    { label: "Built-in signal generator", a: "20MHz WaveGen (sine to 20MHz, square/pulse to 10MHz)", b: "None (Rigol fits one only to the -S models)" },
    { label: "Serial trigger and decode", a: "I2C and UART/RS-232, standard", b: "Parallel, UART/RS232, I2C, SPI (option per product page; no option label in datasheet)" },
    { label: "Digital channels", a: "None (external trigger can be shown as a 3rd digital channel)", b: "None" },
    { label: "Connectivity", a: "USB 2.0 host and device, 10/100 LAN", b: "USB host and device, LAN" },
    { label: "Power", a: "Mains, 100–240 V, 50 W max", b: "Mains, 100–240 V AC, 50 W max" },
  ],
  differences: [
    "Channels: the EDUX1052G has two analog inputs, the DS1054Z has four. That is the single biggest practical gap between them.",
    "Only the Keysight has a built-in generator: a 20MHz WaveGen that also drives its Bode plot (frequency-response) mode. The DS1054Z has none; Rigol reserves the generator for its -S models.",
    "Keysight builds training signals into the EDUX1052G, so a beginner can practice triggering and measuring without a circuit. These are not a feature Rigol lists for the DS1054Z.",
    "Update rate is 100,000 wfm/s on the Keysight against up to 30,000 wfm/s on the Rigol, so the Keysight spends less time blind between captures.",
    "Memory runs the other way: 200 kpts on the Keysight against 12 or 24 Mpts on the Rigol, depending on which Rigol document you read.",
    "The Keysight keeps 1 GSa/s with both channels on; the Rigol drops to 500 MSa/s with two channels and 250 MSa/s with three or four.",
    "Rigol's datasheet lists SPI and parallel decoding as well as UART and I2C (its product page calls decoding an option); Keysight lists I2C and UART/RS-232 as standard.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Both scopes are rated at 50MHz and both peak at 1 GSa/s, so the headline numbers suggest twins. The charts
          show where they really part company: how the sample rate holds up as channels are added, how many waveforms
          reach the screen each second, and how much memory each one has to fill.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Sample rate per channel with every channel switched on, log scale. The Keysight shares nothing; the Rigol splits its converter four ways.</>}>
            <BarChart
              log
              items={[
                { label: "EDUX1052G, 2 channels", value: 1_000_000_000, display: "1 GSa/s", highlight: true },
                { label: "DS1054Z, 2 channels", value: 500_000_000, display: "500 MSa/s" },
                { label: "DS1054Z, 4 channels", value: 250_000_000, display: "250 MSa/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Maximum waveform update rate as stated by each maker. Real rates depend on timebase and settings.</>}>
            <BarChart
              items={[
                { label: "Keysight EDUX1052G", value: 100_000, display: "100,000 wfm/s", highlight: true },
                { label: "Rigol DS1054Z", value: 30_000, display: "30,000 wfm/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Acquisition memory, log scale. Rigol&apos;s product page says 12M standard with 24M optional; its datasheet says 24 Mpts.</>}>
            <BarChart
              log
              items={[
                { label: "Keysight EDUX1052G", value: 200_000, display: "200 kpts" },
                { label: "DS1054Z (product page)", value: 12_000_000, display: "12 Mpts", highlight: true },
                { label: "DS1054Z (datasheet)", value: 24_000_000, display: "24 Mpts", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Analog input channels. The Keysight can also display its external trigger input as a third, digital trace.</>}>
            <BarChart
              items={[
                { label: "Keysight EDUX1052G", value: 2, display: "2" },
                { label: "Rigol DS1054Z", value: 4, display: "4", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Memory decides how long a capture can last at full speed: divide the points by the sample rate. At 1 GSa/s,
          200 kpts fills in 200 µs, while 12 Mpts lasts 12 ms. Ask either scope for a longer window and it lowers the
          sample rate to fit, which the Keysight has to do sixty times sooner. Bandwidth, by contrast, is a tie:
          Keysight quotes a calculated 7 ns rise time, and the usual 0.35 ÷ bandwidth approximation gives about the
          same for the Rigol. Our explainers on{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            oscilloscope bandwidth
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>{" "}
          cover the theory behind these figures.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Keysight EDUX1052G vs Rigol DS1054Z for beginners</h2>
        <p className="text-muted leading-7 mb-4">
          The awkward truth about a first oscilloscope is that it arrives before you have anything interesting to
          look at. The EDUX1052G is designed around that problem. Keysight builds training signals into the scope, so
          a newcomer can connect a probe and practice the core routine of scaling, triggering and measuring on known
          waveforms straight away. Add the 20MHz WaveGen and you also have a source: feed a sine wave into an RC
          filter or a transistor amplifier, probe the input on channel 1 and the output on channel 2, and the Bode
          plot mode will sweep the generator and chart gain against frequency for you. For someone studying alone
          rather than in a lab with a bench generator beside every scope, that is a lot of teaching material in one
          box.
        </p>
        <p className="text-muted leading-7 mb-4">
          The DS1054Z assumes you bring the signals. Without a generator, your first waveforms will come from an
          Arduino pin, a 555 timer or whatever circuit you are building, which is fine for hobbyists who already have
          projects on the go but slower for someone starting from zero. What it gives back is breadth. Four channels
          let you watch a microcontroller talk to a sensor over SPI with every line visible, or compare the four coil
          signals of a stepper driver, and its memory lets a long burst be recorded at a high sample rate and then
          zoomed into afterwards. It carries our Hands-on Tested badge, and our{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-review" className={link}>
            DS1054Z review
          </Link>{" "}
          covers it in more depth.
        </p>
        <p className="text-muted leading-7 mb-4">
          So the choice for a beginner comes down to what you lack today. If you have no signal source and want
          guided practice, the Keysight removes that obstacle. If you already have circuits to debug and expect them
          to involve more than two lines at once, the Rigol is the one you will not outgrow on channel count. Neither
          has digital channels, and neither offers more than 50MHz, so a jump to faster logic or RF work means a
          different scope whichever you pick.
        </p>
        <Figure
          caption={
            <>
              The frequency-response lab the EDUX1052G can run on its own: WaveGen sweeps the circuit, CH1 and CH2
              read input and output, and Bode mode draws the curve. The response shape shown is illustrative.
            </>
          }
        >
          <BodeSetupDiagram />
        </Figure>
        <p className="text-muted leading-7 my-4">
          The wiring is the whole lesson in one picture. Three leads leave the Keysight and one circuit sits in the
          middle, so the ratio of output to input at each frequency becomes a curve without any arithmetic on your
          part. Rebuild the same test on the DS1054Z and a second instrument joins the bench: an external generator,
          whose dial you turn and whose readings you note down step by step before plotting them yourself.
        </p>
        <KeyIdea title="Why update rate matters when you are learning">
          A digital scope captures a waveform, processes it, draws it and only then captures again; anything that
          happens in that gap is never seen. At 100,000 wfm/s the EDUX1052G re-arms more than three times as often as
          the DS1054Z at its 30,000 wfm/s maximum, so an occasional runt pulse or glitch is more likely to flash onto
          the Keysight&apos;s screen. Both are maker maximums that fall at many timebase settings. Using{" "}
          <Link href="/oscilloscopes/how-to-use-oscilloscope-persistence-to-find-intermittent-glitches" className={link}>
            persistence to find intermittent glitches
          </Link>{" "}
          makes the most of whichever rate you have.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each scope handles well, and where it runs short</h2>
        <DataTable
          head={["Job", "Keysight EDUX1052G", "Rigol DS1054Z"]}
          rows={[
            ["Practicing triggers and cursors with no circuit built yet", "Yes: built-in training signals", "Needs an external signal (Arduino, 555 timer, generator)"],
            ["Frequency response of an RC filter or audio amplifier", "Yes: WaveGen plus Bode plot mode", "Only with a separate generator, point by point"],
            ["Op-amp input against output", "Yes, both channels at 1 GSa/s", "Yes, with two channels spare"],
            ["Full SPI bus: chip select, clock, MOSI, MISO", "Two lines at a time; SPI decode not listed", "All four lines together; SPI decode listed (option status conflicts)"],
            ["I2C or UART at hobby speeds", "Yes, decode standard", "Yes, decode listed by Rigol (option status conflicts)"],
            ["A 10 ms burst kept at 1 GSa/s for later zooming", "No: 200 kpts lasts 200 µs at that rate", "Yes on one channel: 12 ms or more of memory at 1 GSa/s"],
            ["Spotting a rare glitch on a repetitive signal", "Stronger: 100,000 wfm/s", "Capable: up to 30,000 wfm/s"],
            ["Logic edges faster than about 7 ns, or RF", "No: 50MHz limit", "No: 50MHz limit"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          By the 3–5x rule, a 50MHz scope shows signals up to roughly 10–17MHz with their shape intact. That covers
          Arduino PWM, servo pulses, audio, I2C, UART and most SPI at hobby clock rates on either scope. The WaveGen&apos;s
          own limits matter too: Keysight rates sine output to 20MHz but square and pulse only to 10MHz and ramps to
          200kHz, which is plenty for filter and amplifier experiments. To put either scope to work, start with{" "}
          <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope" className={link}>
            setting up a trigger
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/how-to-use-oscilloscope-bandwidth-measurement-for-an-amplifier" className={link}>
            measuring an amplifier&apos;s bandwidth
          </Link>
          ; Keysight also notes that the EDUX1052G has no segmented memory, so the{" "}
          <Link href="/oscilloscopes/how-to-use-oscilloscope-segmented-memory-for-intermittent-faults" className={link}>
            segmented-memory technique
          </Link>{" "}
          is not available on it.
        </p>
        <div className="mt-4">
          <Callout title="Mains, earth and the generator output">
            Both scopes run from the mains, so each probe&apos;s ground clip is tied to mains earth through the power
            cord. Clipping it to a live conductor or the primary side of a power supply creates a short through the
            scope. Keysight also states that the WaveGen output is not isolated, so its ground is the same earth: never
            connect it to a circuit whose reference is not earth-safe. Beginners should stay with battery, USB and
            low-voltage bench supplies, and use a differential probe if mains ever has to be measured.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer", "Pick", "Reason"]}
          rows={[
            ["Self-taught beginner with no circuits yet", "Keysight EDUX1052G", "Training signals and a generator give you something to measure on day one"],
            ["Student studying filters and amplifiers", "Keysight EDUX1052G", "WaveGen and Bode plot turn a frequency-response lab into one setup"],
            ["Arduino or Raspberry Pi tinkerer debugging SPI", "Rigol DS1054Z", "Four channels show the whole bus at once"],
            ["Anyone recording long bursts and zooming in later", "Rigol DS1054Z", "12 or 24 Mpts against 200 kpts"],
            ["Hunting an occasional glitch on a clock line", "Keysight EDUX1052G", "100,000 wfm/s against 30,000 wfm/s"],
            ["Already owns a function generator", "Rigol DS1054Z", "The Keysight's main extra is then redundant; the extra channels are not"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If you like the Rigol platform but want a generator too, see{" "}
          <Link href="/oscilloscopes/rigol-ds1104z-s-plus-vs-siglent-sds1104x-e" className={link}>
            Rigol DS1104Z-S Plus vs Siglent SDS1104X-E
          </Link>
          . Other DS1054Z matchups include{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" className={link}>
            Rigol DS1054Z vs Siglent SDS1104X-E
          </Link>
          ,{" "}
          <Link href="/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" className={link}>
            Rigol DHO804 vs Rigol DS1054Z
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-hantek-6022be" className={link}>
            Rigol DS1054Z vs Hantek 6022BE for Beginners
          </Link>
          . For the wider field, read the{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            best beginner oscilloscopes
          </Link>{" "}
          roundup and our{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Pick the Keysight EDUX1052G if you are learning from scratch and want the scope to supply its own practice signals, a 20MHz generator and Bode plots, with the faster 100,000 wfm/s update rate as a bonus. Pick the Rigol DS1054Z if your projects already make signals and you need more of them on screen: four channels and 12 or 24 Mpts of memory serve bus debugging and long captures that two channels and 200 kpts cannot.",
  faqs: [
    {
      question: "Is the Keysight EDUX1052G or the Rigol DS1054Z better for a complete beginner?",
      answer:
        "It depends on whether you already have signals to look at. The EDUX1052G includes training signals and a 20MHz generator, so you can practice from the first day without building anything. The DS1054Z has no generator but offers four channels and much deeper memory, which matter more once you are debugging real circuits with several lines.",
    },
    {
      question: "What are the training signals on the Keysight EDUX1052G?",
      answer:
        "They are practice waveforms that Keysight builds into the EDUX1052G so a student can learn scaling, triggering and measurement without an external source. They suit self-study and classroom exercises. The DS1054Z doesn't list an equivalent, so its owners usually start with a microcontroller pin, a 555 timer or a separate function generator.",
    },
    {
      question: "Does the Rigol DS1054Z have a built-in signal generator?",
      answer:
        "No. Rigol's DS1000Z datasheet fits a generator only to the -S models, such as the DS1104Z-S Plus. The Keysight EDUX1052G includes a 20MHz WaveGen as standard, rated for sine waves up to 20MHz and square or pulse waves up to 10MHz, with up to 20 Vpp into a high-impedance load.",
    },
    {
      question: "Is 200 kpts of memory enough on a beginner oscilloscope?",
      answer:
        "For repetitive signals viewed a screen at a time, usually yes. It becomes a limit when you need a long capture at high resolution: at 1 GSa/s, 200 kpts covers only 200 µs before the EDUX1052G must lower its sample rate. The DS1054Z's 12 or 24 Mpts (Rigol's documents disagree) keeps full speed for far longer.",
    },
    {
      question: "Has OhmSavvy tested either of these scopes?",
      answer:
        "The Rigol DS1054Z carries our Hands-on Tested badge. The Keysight EDUX1052G assessment is desk research based on Keysight's InfiniiVision 1000 X-Series data sheet and product page, so every figure quoted for it here comes from Keysight's published specifications.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Rigol DS1054Z review", href: "/oscilloscopes/rigol-ds1054z-review" },
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "Rigol DS1054Z vs FNIRSI DSO152", href: "/oscilloscopes/rigol-ds1054z-vs-fnirsi-dso152" },
    { label: "Rigol DS1054Z vs Hantek 6022BE for Beginners", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-6022be" },
    { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs Hantek DSO5102P for Arduino", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso5102p" },
    { label: "Rigol DS1054Z vs OWON SDS1102", href: "/oscilloscopes/rigol-ds1054z-vs-owon-sds1102" },
    { label: "Rigol DS1054Z vs OWON VDS1022I", href: "/oscilloscopes/rigol-ds1054z-vs-owon-vds1022i" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1202x-e" },
    { label: "Rigol DHO802 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho802-vs-rigol-ds1054z" },
    { label: "Rigol DHO804 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" },
    { label: "Rigol DS1102Z-E vs DS1054Z", href: "/oscilloscopes/rigol-ds1102z-e-vs-rigol-ds1054z" },
    { label: "Rigol DS1104Z-S Plus vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1104z-s-plus-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1102Z-E vs Siglent SDS1102CML+", href: "/oscilloscopes/rigol-ds1102z-e-vs-siglent-sds1102cml-plus" },
    { label: "Rigol DS1202Z-E vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-ds1202z-e-vs-siglent-sds1202x-e" },
    { label: "Rigol DHO802 vs FNIRSI DSO152", href: "/oscilloscopes/rigol-dho802-vs-fnirsi-dso152" },
    { label: "Rigol DHO802 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho802-vs-hantek-dso2d10" },
    { label: "Rigol DHO804 vs FNIRSI 1014D for Beginners", href: "/oscilloscopes/rigol-dho804-vs-fnirsi-1014d" },
    { label: "Rigol DHO804 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho804-vs-hantek-dso2d10" },
    { label: "Rigol DHO804 vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e" },
    { label: "Rigol DHO804 vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1202x-e" },
    { label: "Rigol DHO814 vs Rigol DHO804", href: "/oscilloscopes/rigol-dho814-vs-rigol-dho804" },
    { label: "Rigol DHO914 vs Rigol DHO804", href: "/oscilloscopes/rigol-dho914-vs-rigol-dho804" },
    { label: "Rigol DHO914S vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho914s-vs-siglent-sds1104x-e" },
    { label: "Siglent SDS1104X-E vs Hantek DSO5102P", href: "/oscilloscopes/siglent-sds1104x-e-vs-hantek-dso5102p" },
    { label: "Siglent SDS1104X-E vs Rigol DHO802", href: "/oscilloscopes/siglent-sds1104x-e-vs-rigol-dho802" },
    { label: "Siglent SDS1104X-E vs Siglent SDS1202X-E", href: "/oscilloscopes/siglent-sds1104x-e-vs-siglent-sds1202x-e" },
    { label: "Siglent SDS1202X-E vs Hantek DSO2D10", href: "/oscilloscopes/siglent-sds1202x-e-vs-hantek-dso2d10" },
    { label: "Hantek DSO2D10 vs Siglent SDS1104X-E", href: "/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" },
    { label: "Hantek DSO5102P vs Rigol DHO804", href: "/oscilloscopes/hantek-dso5102p-vs-rigol-dho804" },
    { label: "Hantek DSO2C10 vs Hantek DSO2D10", href: "/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d10" },
    { label: "Hantek DSO2C10 vs Hantek DSO2D15", href: "/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d15" },
    { label: "Hantek DSO2C10 vs FNIRSI 1014D for Beginners", href: "/oscilloscopes/hantek-dso2c10-vs-fnirsi-1014d" },
    { label: "Hantek DSO2D15 vs FNIRSI 1014D", href: "/oscilloscopes/hantek-dso2d15-vs-fnirsi-1014d" },
    { label: "HANMATEK DOS1102 vs Hantek DSO2C10", href: "/oscilloscopes/hanmatek-dos1102-vs-hantek-dso2c10" },
    { label: "HANMATEK HO52 vs OWON HDS272S", href: "/oscilloscopes/hanmatek-ho52-vs-owon-hds272s" },
    { label: "Hantek 1008B vs Hantek 6022BE", href: "/oscilloscopes/hantek-1008b-vs-hantek-6022be" },
    { label: "Hantek 2D72 vs FNIRSI 2C53T", href: "/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t" },
    { label: "Hantek 6022BE vs Hantek DSO2D10", href: "/oscilloscopes/hantek-6022be-vs-hantek-dso2d10" },
    { label: "PicoScope 2204A vs Digilent Analog Discovery 3", href: "/oscilloscopes/picoscope-2204a-vs-digilent-analog-discovery-3" },
    { label: "PicoScope 2204A vs Hantek 6022BE", href: "/oscilloscopes/picoscope-2204a-vs-hantek-6022be" },
    { label: "PicoScope 2206B vs Hantek 6022BE", href: "/oscilloscopes/picoscope-2206b-vs-hantek-6022be" },
    { label: "OWON VDS1022I vs Hantek 6022BE", href: "/oscilloscopes/owon-vds1022i-vs-hantek-6022be" },
    { label: "OWON HDS2202S vs FNIRSI DSO152", href: "/oscilloscopes/owon-hds2202s-vs-fnirsi-dso152" },
    { label: "MINIWARE DS213 vs FNIRSI DSO152", href: "/oscilloscopes/miniware-ds213-vs-fnirsi-dso152" },
    { label: "FNIRSI DSO152 vs Hantek 6022BE", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-6022be" },
    { label: "FNIRSI DSO152 vs Hantek DSO2D10", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-dso2d10" },
    { label: "FNIRSI DSO152 vs Siglent SDS1104X-E", href: "/oscilloscopes/fnirsi-dso152-vs-siglent-sds1104x-e" },
    { label: "FNIRSI DSO-TC3 vs FNIRSI DSO152", href: "/oscilloscopes/fnirsi-dso-tc3-vs-fnirsi-dso152" },
    { label: "FNIRSI 1014D vs FNIRSI DSO-TC3", href: "/oscilloscopes/fnirsi-1014d-vs-fnirsi-dso-tc3" },
    { label: "FNIRSI 1013D Plus vs FNIRSI 1014D", href: "/oscilloscopes/fnirsi-1013d-plus-vs-fnirsi-1014d" },
    { label: "FNIRSI 2C53T vs FNIRSI 1014D", href: "/oscilloscopes/fnirsi-2c53t-vs-fnirsi-1014d" },
  ],
};

export default function KeysightEdux1052gVsRigolDs1054zPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
