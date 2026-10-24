import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { CategoryHero } from "@/components/CategoryHero";
import { ReviewArticle } from "@/components/ReviewArticle";
import { BarChart, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { picks as allPicks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";
import { guidePicks } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Top 10 Oscilloscopes for Arduino & ESP32 Projects",
  description:
    "The best oscilloscope for Arduino projects and ESP32 boards: 10 scopes ranked on channels, serial decoding and bandwidth for I2C, SPI, UART and PWM debugging.",
  path: "/oscilloscopes/best-oscilloscope-for-arduino-projects",
  image: "https://m.media-amazon.com/images/I/71FtRIGVfLL._SL1500_.jpg",
});

const names = guidePicks("/oscilloscopes/best-oscilloscope-for-arduino-projects");
const picks = names.map((n) => allPicks.find((p) => p.name === n)!).filter(Boolean);

// All figures below come from the Pick objects in ../best-beginner-oscilloscopes/page.tsx and the maker-sourced
// research files (verified-facts.md: Siglent SDS1000X-E standard decode; DS1000Z decode types and the Rigol
// datasheet-vs-product-page conflict on whether decoding is optional; Hantek DSO2000 decode list;
// miniware-ds213.json: input limits and triggers).

const fitNotes: Record<string, string> = {
  "Rigol DHO804":
    "Ranked first because it covers a full SPI bus (clock, MOSI, MISO and chip select) on four channels and decodes UART, I2C, SPI and CAN as listed by Rigol. The 12-bit converter shows small ripple on a 3.3 V rail more clearly than an 8-bit scope, and it carries our Hands-on Tested badge; the limit is 312.5 MSa/s per channel once all four inputs are on.",
  "Siglent SDS1104X-E":
    "Second place goes to the scope whose serial trigger and decode for I2C, SPI, UART, CAN and LIN Siglent lists as a free standard feature, with 100 MHz of bandwidth for faster ESP32 clocks. It also carries our Hands-on Tested badge. It sits below the DHO804 only because it is 8-bit and needs mains power on the bench.",
  "Rigol DS1054Z":
    "Four 50 MHz channels remain plenty for 16 MHz AVR boards and typical sensor buses, and this one carries our Hands-on Tested badge. It ranks third because Rigol's own sources disagree on decoding: the datasheet lists UART, I2C, SPI and parallel decode, while the product page calls bus decoding an option, so check what your unit ships with.",
  "Rigol DHO802":
    "The two-channel DHO800 keeps the 12-bit converter, touchscreen and UART, I2C, SPI and CAN decoding, which is everything an I2C or UART job needs. Two inputs fall short for a four-wire SPI capture, which is why it trails the four-channel scopes.",
  "Hantek DSO2D10":
    "A good fit for sensor projects because the built-in 25 MHz generator can stand in for an encoder, a clock or a PWM source while you test your sketch, and Hantek lists UART, I2C, SPI, CAN and LIN decode. Two channels and an 8-bit converter keep it in fifth.",
  "Hantek DSO2C10":
    "The same 100 MHz decoding bench scope as the DSO2D10 minus the generator, so it suits makers who already own a signal source or only need to read buses. With 8 Mpts on one channel it can hold a long UART exchange, but it still has only two inputs.",
  "PicoScope 2204A":
    "Its strength for microcontroller work is the PicoScope 7 software: serial decoding, math channels and a spectrum view on the laptop already running your IDE. The 10 MHz bandwidth is fine for I2C and UART, but square-edged SPI at several MHz will look rounded, hence seventh.",
  "FNIRSI 1014D":
    "Gives a budget builder two 100 MHz channels, a 7-inch screen and a DDS generator for feeding test signals into an analog input. FNIRSI lists no serial decoding, so reading an I2C conversation means counting bits by eye, which drops it to eighth.",
  "MINIWARE DS213":
    "The only pick with digital inputs besides its two analog channels, in a 129 g case you can leave next to the breadboard. Miniware lists edge, pulse and logic triggers and a ±40 Vpp limit with a 1X probe, but 15 MHz bandwidth (per the Amazon listing), a 3-inch screen and no listed decoding keep it ninth.",
  "FNIRSI DSO152":
    "Enough to confirm that a pin toggles, that a servo pulse arrives, or that a PWM duty cycle is roughly right. With one channel at 200 kHz it cannot show a clock against data or resolve I2C at 400 kHz, so it ranks last for board-level debugging.",
};

const advice = [
  {
    heading: "Count the wires on the bus you debug most",
    body: "The channel count you need follows directly from your protocols. UART needs one channel per direction, I2C needs two (SDA and SCL), and a full SPI capture needs four (clock, MOSI, MISO and chip select). If SPI displays, SD cards or radio modules are in your projects, a four-channel scope such as the DHO804, SDS1104X-E or DS1054Z saves you from capturing the bus in pieces. If you mostly read sensors over I2C, two channels are enough and the DHO802 or a Hantek DSO2000 model will do the job.",
  },
  {
    heading: "Treat serial decoding as a requirement, not an extra",
    body: "Decoding turns a row of square waves into readable bytes, addresses and ACK bits on screen. Without it you count edges and convert binary by hand, which works once and becomes tedious fast. Every scope in our top six lists UART, I2C and SPI decoding from its maker, though Rigol's sources conflict on whether the DS1054Z includes it as standard. The FNIRSI 1014D, MINIWARE DS213 and FNIRSI DSO152 list no decoding at all.",
  },
  {
    heading: "Do not overspend on bandwidth",
    body: "A 16 MHz AVR board, a 400 kHz I2C bus and a 115,200 baud serial port are slow by oscilloscope standards. Bandwidth matters mainly when you push SPI into the tens of MHz on an ESP32 or want to see ringing on fast edges. A 50 to 100 MHz scope covers nearly all maker work; the money is better spent on channels, decoding and memory depth. Our bandwidth explainer covers the rule of thumb for square-wave edges.",
  },
  {
    heading: "Look at memory depth for long captures",
    body: "Debugging often means catching one bad byte in a long burst of traffic. A scope with millions of points can capture a whole transaction at a high sample rate and let you zoom in afterwards. The Rigol DHO models list 25 Mpts on one channel and the Hantek DSO2000 models 8 Mpts, while the PicoScope 2204A has 8 kS of capture memory (it can stream more over USB) and the handhelds hold a few thousand points.",
  },
  {
    heading: "Know when you need a generator or logic inputs",
    body: "A built-in signal generator, as on the Hantek DSO2D10, FNIRSI 1014D and MINIWARE DS213, lets you feed a known waveform into an ADC pin or simulate a sensor while your code runs. Logic inputs, which only the DS213 has here, add extra digital lines without using analog channels. Neither is essential, but both shorten bench time on sensor-heavy projects.",
  },
];

const faqs = [
  {
    question: "What bandwidth do I actually need for Arduino work?",
    answer:
      "Less than most buyers expect. Classic Arduino boards run at 16 MHz, and the buses you probe most often, such as I2C at 100 or 400 kHz, UART and PWM, are far slower. A 50 MHz scope like the Rigol DS1054Z shows these with clean edges. Consider 70 to 100 MHz if you run fast SPI on an ESP32 or want to see edge ringing in detail.",
  },
  {
    question: "Is a pocket scope like the FNIRSI DSO152 enough for Arduino debugging?",
    answer:
      "For quick checks, yes: confirming a pin toggles, measuring a PWM frequency or seeing a servo pulse. Its single 200 kHz channel is the limit. You cannot compare a clock with its data line, and a 400 kHz I2C bus is beyond its bandwidth. If you debug communication between chips, a two- or four-channel bench scope with decoding is the better tool.",
  },
  {
    question: "Should I buy a logic analyzer or an oscilloscope for Arduino projects?",
    answer:
      "A logic analyzer shows only ones and zeros, while an oscilloscope also shows voltage levels, slow edges, noise and ringing, which is where many hardware faults hide. A scope with serial decoding covers most of what a cheap logic analyzer does for I2C, SPI and UART. If you need many digital lines at once, the DS213's two logic inputs or a dedicated analyzer can complement a scope.",
  },
  {
    question: "How many oscilloscope channels do I need to debug SPI?",
    answer:
      "A full SPI capture uses four signals: clock, MOSI, MISO and chip select. A four-channel scope such as the Rigol DHO804, Siglent SDS1104X-E or Rigol DS1054Z can show all of them together and decode the bytes. With two channels you can still watch clock and one data line, then move a probe to check the other, but you lose the complete picture of each transaction.",
  },
  {
    question: "Can a USB oscilloscope like the PicoScope 2204A work with an Arduino?",
    answer:
      "Yes. It is powered from your computer, sits beside the board and runs PicoScope 7 on Windows, macOS or Linux, including serial decoding. Its 10 MHz bandwidth suits I2C, UART, PWM and analog sensors. The trade-offs are that it needs a computer every time and that fast SPI edges will appear rounded at that bandwidth.",
  },
  {
    question: "Where should I clip the oscilloscope ground on an Arduino or ESP32 board?",
    answer:
      "Clip it to the board's GND pin, never to a signal or supply pin. On a mains-powered bench scope the ground clip connects to earth, so touching it to anything other than the circuit's ground can short that point. Keep the ground lead short for clean edges, and use the 10X probe setting for most digital signals to reduce loading.",
  },
];

const tableRows = [
  ["1", "Rigol DHO804", "4", "70 MHz", "UART, I2C, SPI, CAN", "Full SPI captures with 12-bit detail"],
  ["2", "Siglent SDS1104X-E", "4", "100 MHz", "I2C, SPI, UART, CAN, LIN (standard)", "Free decoding and headroom for ESP32 SPI"],
  ["3", "Rigol DS1054Z", "4", "50 MHz", "UART, I2C, SPI (sources conflict on option)", "Four channels for classic AVR boards"],
  ["4", "Rigol DHO802", "2", "70 MHz", "UART, I2C, SPI, CAN", "I2C and UART work at 12-bit"],
  ["5", "Hantek DSO2D10", "2", "100 MHz", "UART, I2C, SPI, CAN, LIN", "Simulating sensors with the built-in generator"],
  ["6", "Hantek DSO2C10", "2", "100 MHz", "UART, I2C, SPI, CAN, LIN", "Reading buses when you own a signal source"],
  ["7", "PicoScope 2204A", "2", "10 MHz", "Serial decoding in PicoScope 7", "Laptop-side debugging of slow buses"],
  ["8", "FNIRSI 1014D", "2", "100 MHz", "None listed", "Budget analog work with a test signal"],
  ["9", "MINIWARE DS213", "2 + 2 digital", "15 MHz", "None listed", "A pocket scope beside the breadboard"],
  ["10", "FNIRSI DSO152", "1", "200 kHz", "None listed", "Checking that a pin or PWM output is alive"],
];

const bandwidth = [
  { label: "Siglent SDS1104X-E", value: 100, display: "100 MHz" },
  { label: "Hantek DSO2D10", value: 100, display: "100 MHz" },
  { label: "Hantek DSO2C10", value: 100, display: "100 MHz" },
  { label: "FNIRSI 1014D", value: 100, display: "100 MHz" },
  { label: "Rigol DHO804", value: 70, display: "70 MHz", highlight: true },
  { label: "Rigol DHO802", value: 70, display: "70 MHz" },
  { label: "Rigol DS1054Z", value: 50, display: "50 MHz" },
  { label: "MINIWARE DS213", value: 15, display: "15 MHz" },
  { label: "PicoScope 2204A", value: 10, display: "10 MHz" },
  { label: "FNIRSI DSO152", value: 0.2, display: "200 kHz" },
];

const sampleRate = [
  { label: "Rigol DHO804", value: 1250, display: "1.25 GSa/s", highlight: true },
  { label: "Rigol DHO802", value: 1250, display: "1.25 GSa/s" },
  { label: "Siglent SDS1104X-E", value: 1000, display: "1 GSa/s" },
  { label: "Rigol DS1054Z", value: 1000, display: "1 GSa/s" },
  { label: "Hantek DSO2D10", value: 1000, display: "1 GSa/s" },
  { label: "Hantek DSO2C10", value: 1000, display: "1 GSa/s" },
  { label: "FNIRSI 1014D", value: 1000, display: "1 GSa/s" },
  { label: "PicoScope 2204A", value: 100, display: "100 MS/s" },
  { label: "MINIWARE DS213", value: 100, display: "100 MSa/s" },
  { label: "FNIRSI DSO152", value: 2.5, display: "2.5 MSa/s" },
];

const channels = [
  { label: "Rigol DHO804", value: 4, display: "4 analog", highlight: true },
  { label: "Siglent SDS1104X-E", value: 4, display: "4 analog" },
  { label: "Rigol DS1054Z", value: 4, display: "4 analog" },
  { label: "MINIWARE DS213", value: 4, display: "2 analog + 2 digital" },
  { label: "Rigol DHO802", value: 2, display: "2 analog" },
  { label: "Hantek DSO2D10", value: 2, display: "2 analog" },
  { label: "Hantek DSO2C10", value: 2, display: "2 analog" },
  { label: "PicoScope 2204A", value: 2, display: "2 analog" },
  { label: "FNIRSI 1014D", value: 2, display: "2 analog" },
  { label: "FNIRSI DSO152", value: 1, display: "1 analog" },
];

export default function BestOscilloscopeForArduinoProjectsPage() {
  return (
    <>
      <CategoryHero
        category="oscilloscopes"
        label="Oscilloscopes · For Arduino and ESP32"
        heading="Top 10 Best Oscilloscopes for Arduino and ESP32 Projects"
        tagline="Ranked for microcontroller debugging. No pay-for-placement."
        description="Microcontroller work rewards channels and serial decoding far more than raw bandwidth. We ranked ten scopes on how well they read I2C, SPI, UART and PWM from Arduino and ESP32 boards."
        primaryCta={{ label: "See the Full Comparison", href: "/oscilloscopes/best-beginner-oscilloscopes" }}
        secondaryCta={{ label: "Compare Side by Side", href: "#full-comparison" }}
        stats={[
          { value: `${picks.length}`, label: "Compared" },
          { value: "100%", label: "Spec-Verified" },
          { value: "$0", label: "Sponsored" },
        ]}
      />

      <section className="mx-auto max-w-4xl px-6 pt-10 space-y-8">
        <div className="space-y-4 text-muted leading-7">
          <p>
            An Arduino or ESP32 project usually fails at the boundary between chips: a sensor that never answers on
            I2C, an SPI display showing garbage, a serial port printing nonsense because the baud rate drifted. A
            multimeter only reports an average voltage on those lines. An oscilloscope shows the actual edges, the
            logic levels and the timing between clock and data, and a scope with protocol decoding labels each byte
            so you can compare it with what your sketch meant to send. Our guides to{" "}
            <Link href="/oscilloscopes/how-to-use-an-oscilloscope-to-diagnose-a-uart-communication-problem" className="text-accent underline">
              diagnosing a UART problem
            </Link>{" "}
            and{" "}
            <Link href="/oscilloscopes/how-to-measure-pwm-duty-cycle-with-an-oscilloscope" className="text-accent underline">
              measuring PWM duty cycle
            </Link>{" "}
            show the workflow step by step.
          </p>
          <p>
            That changes how you should rank scopes for this job. Microcontroller signals are slow by instrument
            standards, so bandwidth beyond 50 to 100 MHz rarely helps. What decides the ranking is how many signals
            you can watch at once, whether the maker lists I2C, SPI and UART decoding, how much memory holds a long
            transaction, and whether the scope fits on a cluttered maker desk. Ten candidates, all sold on Amazon.com,
            are ranked below on those terms. If you are new to the instrument, start with{" "}
            <Link href="/oscilloscopes/how-to-measure-a-logic-signal-with-an-oscilloscope-probe" className="text-accent underline">
              probing a logic signal
            </Link>
            .
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-display text-2xl">Quick comparison</h2>
          <DataTable
            head={["Rank", "Scope", "Channels", "Bandwidth", "Decoding listed by maker", "Best for"]}
            rows={tableRows}
            mono={[0]}
          />
        </div>

        <Figure caption="Analog bandwidth from each maker's spec (DS213 per its Amazon listing). Logarithmic scale; the highlighted bar is our top pick.">
          <BarChart items={bandwidth} log />
        </Figure>

        <Figure caption="Maximum real-time sample rate with one channel on. Most scopes split this between channels when more are enabled. Logarithmic scale.">
          <BarChart items={sampleRate} log />
        </Figure>

        <Figure caption="Inputs available at once. Four signals cover a complete SPI bus; the DS213's four are two analog plus two digital.">
          <BarChart items={channels} />
        </Figure>

        <div className="space-y-4">
          <h2 className="font-display text-2xl">What to look for in an Arduino oscilloscope</h2>
          <InfoCards
            items={[
              { label: "Channels", desc: "Two for I2C or one UART link, four for a full SPI bus with chip select." },
              { label: "Serial decoding", desc: "Bytes and addresses shown on screen instead of edges you decode by hand." },
              { label: "Bandwidth", desc: "50 to 100 MHz covers AVR boards and most ESP32 buses with margin." },
              { label: "Memory depth", desc: "Millions of points keep a whole transaction sharp when you zoom in." },
              { label: "Signal source", desc: "A generator can fake a sensor or clock while your sketch runs." },
              { label: "Desk footprint", desc: "USB-C power or a USB scope keeps the bench uncluttered." },
            ]}
          />
          <KeyIdea title="Rule of thumb">
            Match channels to your busiest protocol first, confirm decoding second, and only then compare bandwidth.
            For background on why the bandwidth figure matters less here, read{" "}
            <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className="text-accent underline">
              what oscilloscope bandwidth means
            </Link>
            , or see our head-to-heads of the{" "}
            <Link href="/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" className="text-accent underline">
              Rigol DHO804 and DS1054Z
            </Link>{" "}
            and the{" "}
            <Link href="/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d10" className="text-accent underline">
              Hantek DSO2C10 and DSO2D10
            </Link>
            .
          </KeyIdea>
        </div>
      </section>

      <ReviewArticle
        picks={picks}
        faqs={faqs}
        fitNotes={fitNotes}
        advice={advice}
        howWeChose="We ranked these ten on what microcontroller debugging needs: channels for the buses you probe, maker-listed I2C, SPI and UART decoding, memory depth and a bench-friendly size, with bandwidth weighed last. It is desk research against manufacturer specifications and official listings; only the Rigol DHO804, Siglent SDS1104X-E and Rigol DS1054Z carry our Hands-on Tested badge."
      />
      <ContentLinks category="oscilloscopes" current="/oscilloscopes/best-oscilloscope-for-arduino-projects" />
    </>
  );
}
