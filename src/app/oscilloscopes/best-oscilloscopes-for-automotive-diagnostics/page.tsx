import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { CategoryHero } from "@/components/CategoryHero";
import { ReviewArticle } from "@/components/ReviewArticle";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { picks as allPicks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";
import { guidePicks } from "@/lib/content";

export const metadata = buildMetadata({
  title: "10 Best Oscilloscopes for Automotive Diagnostics",
  description:
    "The best oscilloscopes for automotive diagnostics, ranked for sensor, injector and CAN work: handheld 3-in-1s, an 8-channel PC scope and deep-memory picks.",
  path: "/oscilloscopes/best-oscilloscopes-for-automotive-diagnostics",
  image: "https://m.media-amazon.com/images/I/81oGP+JFe2L._SL1500_.jpg",
});

const names = guidePicks("/oscilloscopes/best-oscilloscopes-for-automotive-diagnostics");
const picks = names.map((n) => allPicks.find((p) => p.name === n)!).filter(Boolean);

const linkClass = "text-accent hover:underline";

const comparisonRows: string[][] = [
  ["1", "OWON HDS2202S", "2 ch, 200 MHz", "8K points", "Battery; 20,000-count meter + 25 MHz generator", "A do-everything handheld for the service bay"],
  ["2", "Hantek 1008B", "8 ch, 100 kHz, 12-bit", "4K points", "USB from a Windows laptop; crank/cam simulator", "Watching many slow sensors at once"],
  ["3", "PicoScope 2206B", "2 ch, 50 MHz", "32 MS (250 MS streaming)", "USB from a laptop; CAN, LIN and FlexRay decode", "Long captures and bus decoding"],
  ["4", "Hantek 2D72", "2 ch, 70 MHz", "6K points", "Battery; 4,000-count meter + generator", "A small, light kit for the toolbox"],
  ["5", "OWON HDS272S", "2 ch, 70 MHz", "8K points", "Battery; 20,000-count meter + generator", "The HDS2202S layout with less bandwidth"],
  ["6", "FNIRSI 1013D Plus", "2 ch, 100 MHz", "Not clearly stated", "Battery tablet; 7-inch touchscreen; 100X probe", "Reading waveforms on a large screen under the hood"],
  ["7", "HANMATEK HO52", "2 ch, 50 MHz", "8K points (1 ch)", "Battery; 20,000-count meter", "A scope and meter without paying for a generator"],
  ["8", "Rigol DS1054Z", "4 ch, 50 MHz", "24 Mpts (datasheet)", "Mains powered bench unit", "Four-signal timing work on the bench"],
  ["9", "FNIRSI 2C53T", "2 ch, 50 MHz", "1K points", "Battery; 19,999-count meter", "Occasional checks on a tight budget"],
  ["10", "FNIRSI DSO152", "1 ch, 200 kHz", "Not stated", "Pocket size", "Confirming a single sensor is alive"],
];

const lookFor: string[][] = [
  ["At least two channels", "Crank against cam, injector command against fuel pressure, or two CAN lines together. Eight channels (1008B) or four (DS1054Z) cover whole-engine timing."],
  ["Power source", "Battery handhelds and USB scopes run from a laptop work at the car. A mains bench scope needs an inverter or a socket nearby."],
  ["Record length and slow timebases", "A cranking or drive-cycle capture lasts seconds. Short records (1K–8K points) force a choice between duration and detail; 24–32 M point buffers do not."],
  ["Input voltage limits and probes", "Coil and injector kickback can far exceed a 12 V system voltage. Check the scope input limit and use a 10X or 100X probe rated for it."],
  ["Serial decoding", "Only the PicoScope 2206B on this list decodes CAN and LIN. Without decoding you can still check bus voltage levels and waveform shape."],
  ["A built-in meter", "Handheld 3-in-1s let you check voltage drop, resistance and fuses without a second tool in your pocket."],
];

const faqs = [
  {
    question: "Do I need an oscilloscope for car diagnostics, or is a multimeter enough?",
    answer:
      "A multimeter averages. It can tell you a crank sensor produces some AC voltage, but not that one tooth is missing, that an injector's pintle hump is absent or that a CAN line has a glitch. Whenever a signal changes faster than a meter updates, which covers most sensors and actuators, the scope shows the fault and the meter hides it.",
  },
  {
    question: "How much bandwidth does an automotive oscilloscope need?",
    answer:
      "Less than electronics work. Crank, cam, wheel-speed and injector signals live in the hertz-to-kilohertz range, so even the Hantek 1008B's 100 kHz copes. CAN buses run at hundreds of kilobits per second, so 20 MHz or more gives clean edges when you want to judge bus waveform quality. Record length and channel count matter more than headline megahertz here.",
  },
  {
    question: "Can I use a handheld oscilloscope to test ignition coils?",
    answer:
      "Primary-side checks are possible with a suitably rated attenuating probe and a scope whose input limit you respect; the OWON and HANMATEK handhelds list a 400 V input limit. Secondary voltage runs to many kilovolts and must never touch a scope probe. It is read through a dedicated capacitive pickup designed for that job.",
  },
  {
    question: "Is a PC-based USB scope practical in a garage?",
    answer:
      "Yes, if you already carry a laptop. The PicoScope 2206B and Hantek 1008B draw power from USB, weigh little and use the laptop's big screen and storage. The downsides are setup time, a cable between car and computer, and the fact that the 1008B software runs on Windows only, while PicoScope 7 also runs on macOS and Linux.",
  },
  {
    question: "How many channels do I need for automotive work?",
    answer:
      "Two is the practical minimum, because most diagnosis compares one signal with another, such as crankshaft position against camshaft position. Four lets you add an injector and an ignition trigger to the same screen. The Hantek 1008B's eight channels suit whole-engine timing checks, though each channel is slow compared with the other scopes here.",
  },
  {
    question: "Can these oscilloscopes read CAN bus traffic?",
    answer:
      "Any two-channel scope here can show CAN high and CAN low voltage levels, which is enough to spot a shorted or open line. Decoding the frames into IDs and data is a different job: of these ten, only the PicoScope 2206B lists CAN, LIN and FlexRay decoding in its software. The Rigol DS1054Z decodes UART, I2C and SPI, but not CAN.",
  },
];

const fitNotes: Record<string, string> = {
  "OWON HDS2202S":
    "It ranks first because it combines two 200 MHz channels, a 20,000-count meter and a 25 MHz signal source on an 18650 battery, so one tool covers voltage drop tests, sensor waveforms and a bus check without mains. The limit is its 8K record, which is short for a full cranking capture at a fast timebase.",
  "Hantek 1008B":
    "Eight 12-bit channels, a crank and cam simulator and more than 80 built-in automotive test routines make it the most automotive-specific option here, so it takes second place. Its 100 kHz bandwidth and 4K memory rule out CAN waveform quality checks, and it needs a Windows laptop.",
  "PicoScope 2206B":
    "Its 32 MS buffer (250 MS when streaming) captures a long drive or cranking event in detail, and it is the only pick here that decodes CAN and LIN. It sits third because its inputs top out at plus or minus 20 V, so higher-voltage actuator signals need an attenuator, and it is useless without a laptop.",
  "Hantek 2D72":
    "Packing a 70 MHz scope, a meter and a 25 MHz generator into a 624 g handheld with a stand and USB-C charging, it suits a toolbox kit. Its 2.8-inch screen and 6K record (3K per channel with both on) keep it below the OWON, and the meter is only 4,000 counts.",
  "OWON HDS272S":
    "It shares the HDS2202S body, 20,000-count meter and 25 MHz generator, so the workflow is identical. The drop to 70 MHz and 250 MSa/s barely matters for engine signals; it ranks lower only because the 2202S does the same job with more headroom.",
  "FNIRSI 1013D Plus":
    "The 7-inch touchscreen is far easier to read from the driver's seat than a 3.5-inch handheld, and the bundled 100X probe extends its range for high-voltage primary work. FNIRSI does not clearly state its memory depth, and there is no meter or generator.",
  "HANMATEK HO52":
    "It gives you a two-channel 50 MHz scope and a 20,000-count true-RMS meter in a case laid out much like the OWON handhelds. You give up the signal generator, and the record drops to 4K points per channel with both channels on.",
  "Rigol DS1054Z":
    "Four channels and up to 24 Mpts of memory make it the strongest timing tool on paper, and it carries our Hands-on Tested badge. It ranks eighth because it is a mains-powered bench scope without CAN decoding, which makes it awkward next to a running car.",
  "FNIRSI 2C53T":
    "Its 19,999-count true-RMS meter is good, and the two 50 MHz channels handle basic crank and cam checks. The 1K-point record is the shortest on this list, so slow events lose detail quickly.",
  "FNIRSI DSO152":
    "It fits in a pocket and confirms that a single sensor is producing a signal, which is sometimes all you need. One channel and 200 kHz bandwidth mean no sensor correlation and no bus work, so it is a last-place backup rather than a diagnostic scope.",
};

const advice = [
  {
    heading: "Decide where the scope will live",
    body:
      "If it rides in a toolbox and gets used in driveways, buy a battery handheld: the OWON HDS2202S, Hantek 2D72 or HANMATEK HO52. If a laptop already sits on your cart, a USB scope such as the PicoScope 2206B or Hantek 1008B gives you a bigger display and saved captures for the same trip. A bench scope like the DS1054Z only makes sense in a workshop with power at the car.",
  },
  {
    heading: "Buy channels before bandwidth",
    body:
      "Engine diagnosis is mostly about relationships in time: does the cam signal line up with the crank pattern, does the injector fire when the module commands it. A second channel is worth more than an extra hundred megahertz. If you plan to check variable valve timing or misfire patterns, four or eight channels save you from swapping leads between runs.",
  },
  {
    heading: "Budget for the right probes and leads",
    body:
      "Back-probe pins, piercing clips and long BNC leads matter as much as the scope. Rate every attenuating probe for the voltage you expect, and keep a 100X probe for coil primaries and injector kickback. A secondary ignition pickup is a separate accessory; none of these scopes should ever see secondary voltage directly.",
  },
  {
    heading: "Match memory to the event you are chasing",
    body:
      "Short records are fine for a steady idle waveform. Intermittent stalls, cranking current and slow sensor drift need seconds of data at a useful sample rate. That is where the PicoScope's 32 MS and the Rigol's datasheet 24 Mpts pull away from the 1K to 8K handhelds.",
  },
];

export default function BestOscilloscopesForAutomotiveDiagnosticsPage() {
  return (
    <>
      <CategoryHero
        category="oscilloscopes"
        label="Oscilloscopes · Automotive Diagnostics"
        heading="Top 10 Best Oscilloscopes for Automotive Diagnostics"
        tagline="Ranked for garage work, not spec-sheet totals."
        description="Our top 10 best oscilloscopes for automotive diagnostics, ranked for crank and cam sensors, injectors, ignition primaries and CAN lines: handheld 3-in-1s, USB scopes for a laptop and one bench option."
        primaryCta={{ label: "See the Full Comparison", href: "/oscilloscopes/best-beginner-oscilloscopes" }}
        secondaryCta={{ label: "Compare Side by Side", href: "#full-comparison" }}
        stats={[
          { value: `${picks.length}`, label: "Compared" },
          { value: "100%", label: "Spec-Verified" },
          { value: "$0", label: "Sponsored" },
        ]}
      />

      <section className="mx-auto max-w-4xl px-6 pt-12 space-y-10">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">What a car asks of an oscilloscope</h2>
          <p className="text-muted leading-7">
            Vehicle signals are slow by electronics standards but awkward in every other way. A crankshaft sensor
            pattern, an injector pulse or a throttle position sweep sits well below a megahertz, yet you need to see
            two or more of them together, capture several seconds while the engine cranks, and do it in a cramped bay
            far from a wall socket. Coils and injectors also throw inductive spikes far above battery voltage, so input
            ratings and probe choice matter more here than headline bandwidth. If you only need voltage, resistance and
            duty cycle readings, a meter from our{" "}
            <Link href="/multimeters/best-multimeter-for-automotive" className={linkClass}>
              automotive multimeter guide
            </Link>{" "}
            may be enough.
          </p>
          <p className="text-muted leading-7">
            That is why this ranking favors battery handhelds with a built-in meter, USB scopes that borrow a
            laptop&apos;s screen, and long records over raw speed. We ranked these ten on channel count, portability,
            memory depth, input limits and whether the scope decodes vehicle buses, using only the makers&apos;
            published specifications. For side-by-side detail, see{" "}
            <Link href="/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t" className={linkClass}>
              Hantek 2D72 vs FNIRSI 2C53T
            </Link>
            ,{" "}
            <Link href="/oscilloscopes/hanmatek-ho52-vs-owon-hds272s" className={linkClass}>
              HANMATEK HO52 vs OWON HDS272S
            </Link>{" "}
            and{" "}
            <Link href="/oscilloscopes/hantek-1008b-vs-hantek-6022be" className={linkClass}>
              Hantek 1008B vs Hantek 6022BE
            </Link>
            . New to scopes? Start with{" "}
            <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope" className={linkClass}>
              how to trigger an oscilloscope
            </Link>{" "}
            and{" "}
            <Link href="/oscilloscopes/how-to-measure-pwm-duty-cycle-with-an-oscilloscope" className={linkClass}>
              measuring PWM duty cycle
            </Link>
            , which is how most actuators are driven.
          </p>
        </div>

        <Callout title="Ignition and injector safety">
          Secondary ignition voltage reaches many kilovolts: never connect a scope probe to a plug lead or coil output;
          use a capacitive pickup made for it. Coil primaries and injectors produce kickback spikes far above 12 V, so
          stay within each scope&apos;s stated input limit and use an attenuating probe rated for the voltage. Keep
          leads clear of fans, belts and the exhaust while the engine runs, and never route them where a closing hood can
          pinch them.
        </Callout>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">Quick comparison</h2>
          <DataTable
            head={["#", "Scope", "Channels / bandwidth", "Memory", "Power and extras", "Best for"]}
            rows={comparisonRows}
            mono={[0]}
          />
          <p className="text-xs text-muted leading-5">
            Rigol&apos;s DS1000Z datasheet lists 24 Mpts; its product page says 12 Mpts standard with 24 Mpts optional.
            FNIRSI writes the 1013D&apos;s storage depth as &quot;240 Kbit&quot; without saying how many points that is.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">The numbers that matter in a garage</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Figure caption={<>Analog input channels. More channels means more sensors compared on one capture.</>}>
              <BarChart
                items={[
                  { label: "Hantek 1008B", value: 8, display: "8", highlight: true },
                  { label: "Rigol DS1054Z", value: 4, display: "4" },
                  { label: "OWON HDS2202S", value: 2, display: "2" },
                  { label: "PicoScope 2206B", value: 2, display: "2" },
                  { label: "Hantek 2D72", value: 2, display: "2" },
                  { label: "OWON HDS272S", value: 2, display: "2" },
                  { label: "FNIRSI 1013D Plus", value: 2, display: "2" },
                  { label: "HANMATEK HO52", value: 2, display: "2" },
                  { label: "FNIRSI 2C53T", value: 2, display: "2" },
                  { label: "FNIRSI DSO152", value: 1, display: "1" },
                ]}
              />
            </Figure>
            <Figure
              caption={
                <>
                  Maximum record length (single channel). The 1013D Plus and DSO152 are left out because their makers
                  do not state it in points.
                </>
              }
            >
              <BarChart
                log
                items={[
                  { label: "PicoScope 2206B", value: 32_000_000, display: "32 MS", highlight: true },
                  { label: "Rigol DS1054Z", value: 24_000_000, display: "24 Mpts" },
                  { label: "OWON HDS2202S", value: 8_000, display: "8K" },
                  { label: "OWON HDS272S", value: 8_000, display: "8K" },
                  { label: "HANMATEK HO52", value: 8_000, display: "8K" },
                  { label: "Hantek 2D72", value: 6_000, display: "6K" },
                  { label: "Hantek 1008B", value: 4_000, display: "4K" },
                  { label: "FNIRSI 2C53T", value: 1_000, display: "1K" },
                ]}
              />
            </Figure>
          </div>
          <Figure
            caption={
              <>
                Rated bandwidth. Every scope here except the DSO152 has plenty for engine sensors; the extra matters
                mostly for judging CAN edge quality.
              </>
            }
          >
            <BarChart
              log
              items={[
                { label: "OWON HDS2202S", value: 200_000_000, display: "200 MHz", highlight: true },
                { label: "FNIRSI 1013D Plus", value: 100_000_000, display: "100 MHz" },
                { label: "Hantek 2D72", value: 70_000_000, display: "70 MHz" },
                { label: "OWON HDS272S", value: 70_000_000, display: "70 MHz" },
                { label: "PicoScope 2206B", value: 50_000_000, display: "50 MHz" },
                { label: "Rigol DS1054Z", value: 50_000_000, display: "50 MHz" },
                { label: "HANMATEK HO52", value: 50_000_000, display: "50 MHz" },
                { label: "FNIRSI 2C53T", value: 50_000_000, display: "50 MHz" },
                { label: "FNIRSI DSO152", value: 200_000, display: "200 kHz" },
                { label: "Hantek 1008B", value: 100_000, display: "100 kHz" },
              ]}
            />
          </Figure>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">What to look for in an automotive scope</h2>
          <DataTable head={["Feature", "Why it matters on a vehicle"]} rows={lookFor} />
          <KeyIdea title="Rule of thumb">
            For engine sensors and actuators, rank scopes by channels, then record length, then portability. Bandwidth
            becomes the deciding spec only when you start judging network signal quality. When a fault comes and goes,{" "}
            <Link href="/oscilloscopes/how-to-use-oscilloscope-segmented-memory-for-intermittent-faults" className={linkClass}>
              segmented memory
            </Link>{" "}
            and{" "}
            <Link href="/oscilloscopes/how-to-capture-a-brief-voltage-spike-with-an-oscilloscope" className={linkClass}>
              spike capture
            </Link>{" "}
            techniques help, provided the scope&apos;s memory is long enough.
          </KeyIdea>
        </div>
      </section>

      <ReviewArticle
        picks={picks}
        faqs={faqs}
        howWeChose="We ranked these ten for vehicle work rather than general electronics: channel count first, then battery or USB power, record length, input voltage limits and CAN or LIN decoding. Every figure comes from the maker's datasheet, manual or official listing; this is desk research, and only the Rigol DS1054Z carries our Hands-on Tested badge."
        fitNotes={fitNotes}
        advice={advice}
      />
      <ContentLinks category="oscilloscopes" current="/oscilloscopes/best-oscilloscopes-for-automotive-diagnostics" />
    </>
  );
}
