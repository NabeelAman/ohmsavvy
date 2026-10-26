import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { CategoryHero } from "@/components/CategoryHero";
import { ReviewArticle } from "@/components/ReviewArticle";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";
import { guidePicks } from "@/lib/content";

export const metadata = buildMetadata({
  title: "10 Best Multimeters for Arduino and PCB Testing",
  description:
    "Our top 10 best multimeters for Arduino and circuit board testing, ranked on low-voltage DC accuracy, microamp sleep current, fast continuity and diode tests.",
  path: "/multimeters/best-multimeters-for-arduino-and-circuit-board-testing",
  image: "https://m.media-amazon.com/images/I/8141kUMRO1L._SL1500_.jpg",
});

const PATH = "/multimeters/best-multimeters-for-arduino-and-circuit-board-testing";
const all = getAllPicks("multimeters");
const picks = guidePicks(PATH)
  .map((n) => all.find((p) => p.name === n)!)
  .filter(Boolean);

const linkClass = "text-accent hover:underline";

const comparisonRows: string[][] = [
  ["1", "EEVblog Brymen BM786", "60,000", "0.01 µA", "Latching continuity under 100 µs, 0.03% DC volts", "Serious bench work on 3.3 V and 5 V boards"],
  ["2", "UNI-T UT61E+", "22,000", "0.01 µA", "REL mode, USB readout, ±(0.05%+5) DC volts", "The best balance of resolution and cost"],
  ["3", "Fluke 287", "50,000", "0.01 µA", "On-screen trend graphs, 102 µV/µA burden", "Logging a battery project's current for days"],
  ["4", "OWON B41T+", "22,000", "0.01 µA", "Offline recording of 10,000 points", "Overnight sleep-current logs on a budget"],
  ["5", "Fluke 87V", "6,000 (19,999 HiRes)", "0.1 µA (0.01 µA HiRes)", "100 µV/µA burden, analog bar graph", "A tough meter that covers mains work too"],
  ["6", "Brymen BM235", "6,000", "0.1 µA", "0.1 mV/µA burden, BeepLit under 15 ms", "Low-drop µA readings at a mid price"],
  ["7", "OWON OW18E", "19,999", "0.01 µA", "Bluetooth with offline recording", "Cheap Bluetooth logging for hobby boards"],
  ["8", "KAIWEETS HT118E", "20,000", "0.01 µA (implied)", "200 µA range, lit jacks", "A first fine-resolution meter for students"],
  ["9", "KAIWEETS HT118A", "6,000", "0.1 µA", "Frequency to 10 MHz, duty cycle", "PWM and general hobby checks"],
  ["10", "Klein Tools MM420", "4,000", "0.1 µA", "Lead-Alert jack lights", "Beginners who keep plugging leads in wrong"],
];

const lookFor = [
  { label: "A real µA range", desc: "A sleeping microcontroller draws microamps, so the meter needs a range of a few hundred µA with 0.1 µA or finer steps." },
  { label: "Low burden voltage", desc: "The meter's shunt drops voltage in series with your board; a few tens of millivolts can be enough to brown out a marginal 3.3 V rail." },
  { label: "Fine DC volts resolution", desc: "Checking a regulator, a divider or an analog sensor output means reading the third or fourth decimal place reliably." },
  { label: "Fast continuity", desc: "A quick, latching beeper catches a broken trace or a cold joint as you sweep the probe along a header row." },
  { label: "Diode test near 3 V", desc: "Enough open-circuit voltage to check LEDs and the protection diodes on GPIO pins." },
  { label: "Capacitance and frequency", desc: "Confirms a decoupling cap's value and a PWM output's frequency and duty cycle without reaching for a scope." },
];

const faqs = [
  {
    question: "What multimeter features do I need for Arduino projects?",
    answer:
      "Start with auto-ranging DC volts, continuity, a diode test and a microamp current range. Those cover checking a 5 V or 3.3 V rail, finding broken jumper wires, testing LEDs and measuring how much current a sketch draws in sleep. Capacitance and frequency are useful extras. Meters such as the UNI-T UT61E+ and EEVblog Brymen BM786 add the fine resolution that makes those readings trustworthy.",
  },
  {
    question: "How do I measure the sleep current of an Arduino or ESP32?",
    answer:
      "Break the supply line and put the meter in series, with the red lead in the µA/mA jack and the dial on the lowest µA range. Let the board enter sleep before reading, because start-up and Wi-Fi bursts can be hundreds of milliamps and may blow the µA fuse. Some makers short the meter with a jumper during boot, then remove it once the board sleeps.",
  },
  {
    question: "What is burden voltage and why does it matter on a 3.3 V board?",
    answer:
      "Burden voltage is the drop across the meter's internal shunt when it measures current. Brymen publishes 0.2 mV per µA for the BM786, so a 500 µA reading costs 100 mV of the board's supply. On a 3.3 V rail with little headroom that can change behavior or trigger a brown-out reset, so a lower-burden meter or a higher range helps.",
  },
  {
    question: "Is a cheap multimeter good enough for Arduino work?",
    answer:
      "For checking that 5 V is present and wires are connected, yes. Budget meters start to struggle with sleep-current work, because many lack a µA range or only resolve 0.1 mA. The KAIWEETS HT118E and OWON OW18E are among the cheaper meters here that still offer a 200 µA range with 20,000-count displays.",
  },
  {
    question: "Do I need True RMS for electronics and Arduino projects?",
    answer:
      "Rarely for the board itself, since most readings are DC. True RMS matters when you measure AC from a transformer or a distorted waveform. Be aware that a multimeter set to DC volts shows the average of a PWM signal, not its peak; for the shape of the waveform you need an oscilloscope. All ten meters here are True RMS on AC volts.",
  },
  {
    question: "Can a multimeter replace an oscilloscope for Arduino debugging?",
    answer:
      "No. A meter reads steady values: rail voltages, resistance, average current, frequency and duty cycle. It cannot show a glitch, the timing of an I2C transaction or ringing on a fast edge. Many hobbyists buy a good meter first and add a scope when serial buses or motor drivers misbehave; see our oscilloscope guide for Arduino projects.",
  },
];

const fitNotes: Record<string, string> = {
  "EEVblog Brymen BM786":
    "It leads because it combines 60,000 counts, 0.03% best DC accuracy, a 600.00 µA range at 0.01 µA and a continuity beeper that responds in under 100 µs, which is everything a microcontroller bench asks of a meter. The catch for sleep-current work is its 0.2 mV/µA burden, double the Fluke and BM235 figures.",
  "UNI-T UT61E+":
    "A 220.00 µA range at 0.01 µA, ±(0.05%+5) on its lower DC voltage ranges and REL mode put it within reach of the BM786 for far less, and the included USB cable lets you watch readings on a PC while you edit code. UNI-T doesn't publish its burden voltage, which is why it sits second rather than first.",
  "Fluke 287":
    "Its 500 µA range resolves 0.01 µA at a published 102 µV/µA, and TrendCapture graphs readings on the meter, so you can see when a board wakes and how long it stays awake. It ranks third only because the cost is hard to justify for a hobby bench.",
  "OWON B41T+":
    "Offline recording of up to 10,000 points over as long as 168 hours, with no phone attached, makes it the easiest budget way to log a battery-powered sensor's sleep current overnight. It has the same 0.01 µA and 0.01 Ω resolution as the UT61E+, but OWON gives no burden voltage or CAT rating on its page.",
  "Fluke 87V":
    "It carries our Hands-on Tested badge, and its 600.0 µA range reads 0.1 µA (0.01 µA in the 19,999-count HiRes mode) with a typical burden of 100 µV/µA. It's a big, expensive industrial meter for a breadboard, so it ranks behind the finer-resolution bench meters unless you also work on mains equipment.",
  "Brymen BM235":
    "Brymen's catalog gives 0.1 mV/µA burden on its 600.0 µA range, among the lowest here, and its BeepLit continuity reacts in under 15 ms. At 6,000 counts it can't match the resolution of the meters above it, but it's a sensible pick for anyone who also wants LoZ and NCV for household wiring.",
  "OWON OW18E":
    "A 200.00 µA range at 0.01 µA, 0.01 Ω resolution and Bluetooth with offline recording on a low-cost body make it a strong hobby meter. It ranks below the B41T+ because OWON publishes less about it, and Amazon had very little stock when we checked.",
  "KAIWEETS HT118E":
    "Its 200 µA range on a 20,000-count display implies 0.01 µA steps, at ±(0.5%+5) DC, which is enough to see a sleeping ATmega's current clearly. KAIWEETS lists no relative mode or burden voltage, so it ranks behind the OWONs for careful current work.",
  "KAIWEETS HT118A":
    "Frequency to 10 MHz and duty cycle let you confirm a PWM pin's setting, and the 600 µA range reads to 0.1 µA. The 6,000-count display and coarser µA steps place it near the bottom for sleep-current checks.",
  "Klein Tools MM420":
    "Lead-Alert lights showing which jacks to use are a real help when you switch between volts and µA many times a session, and the 400.0 µA range reads to 0.1 µA. With 4,000 counts and capacitance only to 400 µF, it has the least resolution of the ten.",
};

const advice = [
  {
    heading: "Match the µA range to the sleep current you expect",
    body:
      "A bare ATmega or ESP32 module in deep sleep can draw single-digit microamps, while a development board with a USB chip and power LED may draw milliamps even when asleep. A meter with a 200 to 600 µA range and 0.01 µA steps resolves the first case; a 0.1 µA meter is fine for the second. If you only ever measure milliamps, the cheaper meters lower in the list are enough.",
  },
  {
    heading: "Think about burden before trusting a current reading",
    body:
      "Burden is the voltage the meter steals from your circuit. Multiply the reading by the published figure: 300 µA on a 0.2 mV/µA meter is 60 mV, while on a 100 µV/µA meter it is 30 mV. If the board resets or behaves differently with the meter in line, switch up a range, which lowers the drop, or use a meter with a lower published burden.",
  },
  {
    heading: "Use logging for battery-life estimates",
    body:
      "A board that sleeps for a minute and wakes for 200 ms has an average current no single reading shows. Meters that record over time, such as the OWON B41T+, OWON OW18E and Fluke 287, let you see the pattern and estimate battery life. For the fast wake-up spikes themselves, a scope across a small shunt resistor is still the better tool.",
  },
  {
    heading: "Don't overpay for safety ratings you won't use, but don't ignore them",
    body:
      "Arduino projects run on 5 V and 3.3 V, so a CAT IV rating adds little on the bench. It matters the day you check a mains power supply or a relay board switching household loads. If your projects ever touch mains, choose one of the meters here with a published CAT III or CAT IV rating, and keep the cheap meter for the breadboard.",
  },
];

export default function BestMultimetersForArduinoAndCircuitBoardTestingPage() {
  return (
    <>
      <CategoryHero
        category="multimeters"
        label="Multimeters · Arduino & PCB Testing"
        heading="Top 10 Best Multimeters for Arduino and Circuit Board Testing"
        tagline="Ranked on µA range, DC resolution and continuity."
        description="Our top 10 best multimeters for Arduino and circuit board testing, ranked for checking 3.3 V and 5 V rails, measuring microcontroller sleep current, finding broken traces and testing diodes, LEDs and capacitors."
        primaryCta={{ label: "See the Full Roundup", href: "/multimeters/best-multimeters" }}
        secondaryCta={{ label: "Compare Side by Side", href: "#full-comparison" }}
        stats={[
          { value: `${picks.length}`, label: "Compared" },
          { value: "100%", label: "Spec-Verified" },
          { value: "$0", label: "Sponsored" },
        ]}
      />

      <section className="mx-auto max-w-4xl px-6 pt-12 space-y-10">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">What Arduino and board-level work asks of a meter</h2>
          <p className="text-muted leading-7">
            Microcontroller projects live at low voltage and low current. You check that a regulator really delivers
            3.300 V and not 3.21 V, that a voltage divider feeds the ADC the value your code expects, and that a
            battery-powered sensor sleeps at a few microamps rather than a few milliamps. On the board itself you hunt
            for open traces, solder bridges and reversed diodes. So the meters that rank well here have fine DC
            resolution, a genuine microamp range with a low or at least published burden voltage, quick continuity, and
            a diode test with enough voltage to light an LED. Our walk-throughs on{" "}
            <Link href="/multimeters/how-to-measure-current-consumption-of-an-arduino-with-a-multimeter" className={linkClass}>
              measuring an Arduino&apos;s current consumption
            </Link>
            ,{" "}
            <Link href="/multimeters/how-to-measure-a-voltage-regulator-output-with-a-multimeter" className={linkClass}>
              checking a voltage regulator&apos;s output
            </Link>{" "}
            and{" "}
            <Link href="/multimeters/how-to-check-a-voltage-divider-circuit-with-a-multimeter" className={linkClass}>
              testing a voltage divider
            </Link>{" "}
            show each job step by step.
          </p>
          <p className="text-muted leading-7">
            We ranked the ten on those needs using the makers&apos; manuals and spec pages, which puts 20,000-count and
            higher bench meters at the top and simpler 4,000 and 6,000-count meters lower down. CAT ratings count for
            less here than on an electrician&apos;s list, though they still matter if a project touches mains. For
            current measurement technique, read{" "}
            <Link href="/multimeters/how-to-measure-microamps-with-a-multimeter" className={linkClass}>
              how to measure microamps
            </Link>
            ; for board faults, see{" "}
            <Link href="/multimeters/how-to-check-a-pcb-for-a-short-circuit-with-a-multimeter" className={linkClass}>
              finding a short on a PCB
            </Link>{" "}
            and{" "}
            <Link href="/multimeters/how-to-test-a-diode-with-a-multimeter" className={linkClass}>
              testing a diode
            </Link>
            . When a meter isn&apos;t enough, our{" "}
            <Link href="/oscilloscopes/best-oscilloscope-for-arduino-projects" className={linkClass}>
              oscilloscopes for Arduino and ESP32 projects
            </Link>{" "}
            guide picks up where this one stops.
          </p>
        </div>

        <Callout title="Current mode is a short circuit">
          In µA, mA or A mode the meter is a near-zero resistance between its leads. Touch those leads across a power
          rail or a battery and you short it, which can blow the meter&apos;s fuse, damage a USB port or overheat a
          lithium cell. Always break the circuit and put the meter in series, move the red lead back to the V/Ω jack
          when you finish, and keep inrush and Wi-Fi transmit bursts off the µA range.
        </Callout>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">Quick comparison</h2>
          <DataTable
            head={["#", "Meter", "Counts", "Finest µA step", "Why it helps on a board", "Best for"]}
            rows={comparisonRows}
            mono={[0]}
          />
          <p className="text-xs text-muted leading-5">
            KAIWEETS doesn&apos;t print a per-range resolution for the HT118E; 0.01 µA follows from its 200 µA range at
            20,000 counts. The Fluke 87V reads 0.01 µA only in its 19,999-count HiRes mode. DC voltage accuracy is the
            maker&apos;s best-range figure.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">How the ten compare on paper</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Figure caption={<>Display counts, on a log scale. More counts mean more digits on low-voltage readings.</>}>
              <BarChart
                log
                items={[
                  { label: "EEVblog Brymen BM786", value: 60_000, display: "60,000", highlight: true },
                  { label: "Fluke 287", value: 50_000, display: "50,000", highlight: true },
                  { label: "UNI-T UT61E+", value: 22_000, display: "22,000" },
                  { label: "OWON B41T+", value: 22_000, display: "22,000" },
                  { label: "KAIWEETS HT118E", value: 20_000, display: "20,000" },
                  { label: "OWON OW18E", value: 19_999, display: "19,999" },
                  { label: "Fluke 87V", value: 19_999, display: "19,999 (HiRes)" },
                  { label: "Brymen BM235", value: 6_000, display: "6,000" },
                  { label: "KAIWEETS HT118A", value: 6_000, display: "6,000" },
                  { label: "Klein Tools MM420", value: 4_000, display: "4,000" },
                ]}
              />
            </Figure>
            <Figure
              caption={
                <>
                  Voltage dropped by the meter while reading 100 µA, from each maker&apos;s published µA burden (lower is
                  better). Only these four publish the figure in the documents we checked.
                </>
              }
            >
              <BarChart
                items={[
                  { label: "Fluke 87V", value: 10, display: "10 mV", highlight: true },
                  { label: "Brymen BM235", value: 10, display: "10 mV", highlight: true },
                  { label: "Fluke 287", value: 10.2, display: "10.2 mV" },
                  { label: "EEVblog Brymen BM786", value: 20, display: "20 mV" },
                ]}
              />
            </Figure>
          </div>
          <Figure
            caption={
              <>
                Full scale of the lowest current range, in µA. A smaller range puts more of the display&apos;s counts on a
                small sleep current.
              </>
            }
          >
            <BarChart
              items={[
                { label: "OWON OW18E", value: 200, display: "200 µA", highlight: true },
                { label: "KAIWEETS HT118E", value: 200, display: "200 µA", highlight: true },
                { label: "UNI-T UT61E+", value: 220, display: "220 µA" },
                { label: "OWON B41T+", value: 220, display: "220 µA" },
                { label: "Klein Tools MM420", value: 400, display: "400 µA" },
                { label: "Fluke 287", value: 500, display: "500 µA" },
                { label: "EEVblog Brymen BM786", value: 600, display: "600 µA" },
                { label: "Fluke 87V", value: 600, display: "600 µA" },
                { label: "Brymen BM235", value: 600, display: "600 µA" },
                { label: "KAIWEETS HT118A", value: 600, display: "600 µA" },
              ]}
            />
          </Figure>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">What to look for in a meter for Arduino and PCBs</h2>
          <InfoCards items={lookFor} />
          <KeyIdea title="Counts decide how many digits you see">
            On a 6,000-count meter a 3.3 V rail lands on the 6 V range and reads 3.300 V. A 22,000-count meter shows
            that rail as 3.300 V too, since it falls just past the 2.2 V range, but a 1.8 V rail or an ADC reference
            reads to 1.8000 V. At 50,000 or 60,000 counts the 5 V or 6 V range shows 3.3000 V, a full extra digit on
            the most common Arduino rail. Extra digits only help if accuracy keeps up, so
            check the maker&apos;s DC accuracy alongside the count. If your readings jump around, our guide to{" "}
            <Link href="/multimeters/unstable-multimeter-readings" className={linkClass}>
              unstable multimeter readings
            </Link>{" "}
            covers the usual causes, and{" "}
            <Link href="/multimeters/multimeter-continuity-beep-intermittent" className={linkClass}>
              an intermittent continuity beep
            </Link>{" "}
            explains slow or patchy beepers.
          </KeyIdea>
        </div>
      </section>

      <ReviewArticle
        picks={picks}
        faqs={faqs}
        howWeChose="We ranked these ten for microcontroller and circuit board work: microamp range and resolution first, then published burden voltage, display counts and DC accuracy, then continuity speed, diode test and extras such as logging. Every figure comes from the maker's manual, datasheet or product page; the ranking is desk research, and only the Fluke 87V carries our Hands-on Tested badge."
        fitNotes={fitNotes}
        advice={advice}
      />
      <ContentLinks category="multimeters" current={PATH} />
    </>
  );
}
