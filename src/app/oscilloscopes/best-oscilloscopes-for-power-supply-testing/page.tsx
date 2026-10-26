import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { CategoryHero } from "@/components/CategoryHero";
import { ReviewArticle } from "@/components/ReviewArticle";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { picks as allPicks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";
import { guidePicks } from "@/lib/content";

export const metadata = buildMetadata({
  title: "10 Best Oscilloscopes for Power Supply Testing",
  description:
    "Our ranking of the best oscilloscopes for power supply testing: 12-bit resolution for ripple, deep memory for start-up and transients, and Bode plot for loops.",
  path: "/oscilloscopes/best-oscilloscopes-for-power-supply-testing",
  image: "https://m.media-amazon.com/images/I/71XnyEAt3lL._SL1500_.jpg",
});

const names = guidePicks("/oscilloscopes/best-oscilloscopes-for-power-supply-testing");
const picks = names.map((n) => allPicks.find((p) => p.name === n)!).filter(Boolean);

const linkClass = "text-accent hover:underline";

const comparisonRows: string[][] = [
  ["1", "Rigol DHO914S", "12-bit", "4 ch, 125 MHz", "50 Mpts", "Loop response checks with the built-in Bode plot"],
  ["2", "Rigol DHO914", "12-bit", "4 ch, 125 MHz", "50 Mpts", "Multi-rail ripple and sequencing without the generator"],
  ["3", "Rigol DHO804", "12-bit", "4 ch, 70 MHz", "25 Mpts", "Low-millivolt ripple on a smaller budget"],
  ["4", "Siglent SDS1104X-E", "8-bit", "4 ch, 100 MHz", "14 Mpts", "Fast-updating views of switching noise on four inputs"],
  ["5", "Rigol DHO802", "12-bit", "2 ch, 70 MHz", "25 Mpts", "Input-versus-output ripple on two channels"],
  ["6", "Siglent SDS1202X-E", "8-bit", "2 ch, 200 MHz", "14 Mpts", "Switch-node edges and ringing"],
  ["7", "Hantek DSO2D15", "8-bit (12-bit high-res mode)", "2 ch, 150 MHz", "8 Mpts", "A budget bench with a load-step signal source"],
  ["8", "Rigol DS1054Z", "8-bit (12-bit high-res mode)", "4 ch, 50 MHz", "24 Mpts (datasheet)", "Linear supplies and power sequencing"],
  ["9", "PicoScope 2206B", "8-bit (enhanced to 12-bit)", "2 ch, 50 MHz", "32 MS", "Long logging runs from a laptop"],
  ["10", "OWON HDS2202S", "8-bit", "2 ch, 200 MHz", "8K points", "Battery-powered spot checks away from the bench"],
];

const lookFor = [
  { label: "Vertical resolution", desc: "12-bit ADCs resolve millivolt ripple on a volts-level rail far more finely than 8-bit ones." },
  { label: "Memory depth", desc: "Start-up ramps and load transients span milliseconds; deep memory keeps the sample rate up across them." },
  { label: "Channel count", desc: "Input, output, switch node and a current probe add up to four channels quickly." },
  { label: "Bandwidth", desc: "Enough to show switch-node edges and ringing; ripple itself rarely needs much." },
  { label: "Bode plot", desc: "Sweeps the control loop to read gain and phase margin, with an injection transformer." },
  { label: "Measurements and math", desc: "Automatic pk-pk, mean and RMS, plus FFT to tie noise spikes to the switching frequency." },
];

const faqs = [
  {
    question: "What oscilloscope specs matter most for power supply testing?",
    answer:
      "Vertical resolution and memory depth come first. Ripple and noise are often tens of millivolts on a rail of several volts, so a 12-bit converter shows detail an 8-bit one rounds off. Start-up and load-step events last milliseconds, so deep memory keeps the sample rate high across them. Bandwidth matters for switch-node edges, and four channels let you watch several rails at once.",
  },
  {
    question: "Is a 12-bit oscilloscope worth it for measuring ripple?",
    answer:
      "For low-voltage switching supplies, usually yes. With an 8-bit scope set to 10 mV/div across eight divisions, each step is about 0.31 mV; a 12-bit scope at the same setting steps about 0.02 mV. High-resolution modes on 8-bit scopes narrow the gap by averaging, at the cost of effective bandwidth. For a quick pass or fail check, 8-bit is fine.",
  },
  {
    question: "How much bandwidth do I need to test a switching power supply?",
    answer:
      "The switching frequency itself is low, often tens of kilohertz to a few megahertz, but the edges at the switch node are fast. A common rule is to choose bandwidth of about 0.35 divided by the fastest rise time you need to see. For ripple measurements, many engineers enable a 20 MHz bandwidth limit anyway to cut out-of-band noise.",
  },
  {
    question: "Can I measure a mains-powered supply with a normal oscilloscope probe?",
    answer:
      "Not on the primary side without precautions. A bench scope's probe ground connects to mains earth, so clipping it onto a non-isolated node creates a short circuit. Use a differential probe or an isolation transformer on the device under test, and measure the isolated secondary side with standard probes. None of the scopes here have isolated channels.",
  },
  {
    question: "What is a Bode plot used for in power supply design?",
    answer:
      "It shows how a supply's control loop responds across frequency, so you can read gain margin and phase margin and judge whether the regulator will oscillate or ring after a load step. The Rigol DHO914S runs a Bode sweep from 10 Hz to 25 MHz with its built-in generator; you still need an injection transformer and resistor in the feedback loop.",
  },
  {
    question: "Do I need four channels for power supply work?",
    answer:
      "Two channels cover input against output ripple and a single rail's start-up. Four become useful for power sequencing on boards with several rails, or for watching gate drive, switch node, output and a current probe together. If you mostly test bench supplies or single regulators, a two-channel scope such as the DHO802 or SDS1202X-E is enough.",
  },
];

const fitNotes: Record<string, string> = {
  "Rigol DHO914S":
    "It takes first place because it pairs four 12-bit channels and 50 Mpts with a 25 MHz generator and a Bode plot, so ripple, sequencing and control-loop response all happen on one instrument. The trade-off is cost over the DHO914, and the 16 logic channels need the separately sold PLA2216 probe.",
  "Rigol DHO914":
    "The same 12-bit, four-channel, 125 MHz acquisition as the DHO914S, with up to 50 Mpts, makes it just as good for ripple and multi-rail start-up captures. It ranks second only because loop-response testing needs an external generator.",
  "Rigol DHO804":
    "Four 12-bit channels and up to 25 Mpts cover ripple and sequencing well, and it carries our Hands-on Tested badge. Its 70 MHz bandwidth is the limit when you want sharp switch-node edges, and memory falls to 5 Mpts with all four channels on.",
  "Siglent SDS1104X-E":
    "Four 100 MHz channels, 14 Mpts and a 100,000 wfm/s update rate make switching noise and rare glitches easy to see, and it carries our Hands-on Tested badge. It sits behind the DHOs because its 8-bit converter resolves small ripple less finely; Siglent sells the AWG and Bode plot as options for its four-channel models.",
  "Rigol DHO802":
    "It keeps the DHO800's 12-bit resolution and 25 Mpts on a two-channel body, ideal for comparing input and output ripple on one regulator. Two channels rule out multi-rail sequencing in a single capture.",
  "Siglent SDS1202X-E":
    "At 200 MHz it has the most bandwidth of the bench scopes here, which suits ringing at a fast switch node, and it keeps 14 Mpts and 100,000 wfm/s. Two 8-bit channels make it weaker for small ripple on multiple rails.",
  "Hantek DSO2D15":
    "A 150 MHz two-channel bench with a 25 MHz generator for simple load-step stimulus, two DVMs and a frequency counter gives broad coverage at a lower tier. The 8-bit converter (12-bit only in high-resolution mode) and 4 Mpts per channel with both on keep it mid-table.",
  "Rigol DS1054Z":
    "Four channels and the datasheet's 24 Mpts handle linear supplies and sequencing, and it carries our Hands-on Tested badge. At 50 MHz and 8-bit, with high-resolution mode as the workaround, it is outclassed for switching ripple by the 12-bit DHOs.",
  "PicoScope 2206B":
    "Its 32 MS buffer, 250 MS streaming and resolution enhancement to 12-bit suit long logging of a supply's drift or a slow brown-out from a laptop. Inputs limited to plus or minus 20 V and 50 MHz bandwidth place it near the bottom for general supply testing.",
  "OWON HDS2202S":
    "Battery operation and a built-in 20,000-count meter make it handy for checking a supply in a cabinet or on site. Its 8K record and 8-bit converter limit start-up and fine ripple work, so it ranks last for a dedicated power bench.",
};

const advice = [
  {
    heading: "Prioritize resolution if you design low-voltage rails",
    body:
      "Point-of-load converters for 3.3 V, 1.8 V and lower rails often have ripple budgets of a few tens of millivolts. A 12-bit scope such as the DHO914S, DHO914, DHO804 or DHO802 shows that ripple at fine vertical steps without relying on averaging. If you mostly work on 12 V and 24 V supplies with looser limits, an 8-bit scope with a high-resolution mode is a reasonable saving.",
  },
  {
    heading: "Buy memory for the slowest event you care about",
    body:
      "A soft-start ramp, a hold-up test after mains removal or a slow load cycle can last tens or hundreds of milliseconds. To see switching detail inside that window you need millions of points per channel. Check the figure with all the channels you plan to use enabled, because most scopes here split memory as channels switch on.",
  },
  {
    heading: "Get the probing right before blaming the scope",
    body:
      "A long ground lead adds an inductive loop that turns switching edges into fake ringing on a ripple trace. Use the probe's spring ground tip, AC coupling with the bandwidth limit on for ripple, and a current probe if you need inductor or output current. A differential probe is the safe way onto any node referenced to mains.",
  },
  {
    heading: "Decide whether you will test the control loop",
    body:
      "Loop stability testing needs a swept signal source and gain and phase analysis. The DHO914S does this on board. With any other scope here you need a separate generator or frequency response analyzer, which can cost more than the price gap between the DHO914 and DHO914S.",
  },
];

export default function BestOscilloscopesForPowerSupplyTestingPage() {
  return (
    <>
      <CategoryHero
        category="oscilloscopes"
        label="Oscilloscopes · Power Supply Testing"
        heading="Top 10 Best Oscilloscopes for Power Supply Testing"
        tagline="Ranked on resolution, memory and loop tools."
        description="Our top 10 best oscilloscopes for power supply testing, ranked for ripple and noise, start-up and load transients, switch-node edges and control-loop response, from 12-bit four-channel benches to a battery handheld."
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
          <h2 className="text-2xl sm:text-3xl font-semibold">What power supply work demands from a scope</h2>
          <p className="text-muted leading-7">
            Testing a supply means looking for small things riding on big ones. Ripple of a few millivolts sits on a
            rail of several volts; a load step drags the output down for microseconds inside a capture that has to last
            milliseconds; a soft-start ramp needs to be timed against an enable line and two other rails. Those jobs
            reward fine vertical resolution, deep memory and enough channels, while bandwidth mainly matters for the fast
            edges at the switch node. Our guides to{" "}
            <Link href="/oscilloscopes/how-to-measure-ripple-voltage-with-an-oscilloscope" className={linkClass}>
              measuring ripple voltage
            </Link>
            ,{" "}
            <Link href="/oscilloscopes/how-to-capture-a-power-supply-transient-with-an-oscilloscope" className={linkClass}>
              capturing a power supply transient
            </Link>{" "}
            and{" "}
            <Link href="/oscilloscopes/how-to-measure-power-supply-startup-time-with-an-oscilloscope" className={linkClass}>
              timing start-up
            </Link>{" "}
            walk through each measurement.
          </p>
          <p className="text-muted leading-7">
            So this list leans toward 12-bit Rigol DHO models, then fast-updating Siglent benches, with cheaper and more
            portable options lower down. Each placement reflects resolution, memory per channel, channel count,
            bandwidth and whether the scope can sweep a control loop, using the makers&apos; own specifications. For how
            much bandwidth a switcher really needs, read{" "}
            <Link href="/oscilloscopes/oscilloscope-bandwidth-for-switching-power-supplies" className={linkClass}>
              oscilloscope bandwidth for switching power supplies
            </Link>
            ; for head-to-head detail, see{" "}
            <Link href="/oscilloscopes/rigol-dho914s-vs-siglent-sds1104x-e" className={linkClass}>
              Rigol DHO914S vs Siglent SDS1104X-E
            </Link>{" "}
            and{" "}
            <Link href="/oscilloscopes/rigol-dho804-vs-siglent-sds1202x-e" className={linkClass}>
              Rigol DHO804 vs Siglent SDS1202X-E
            </Link>
            .
          </p>
        </div>

        <Callout title="Mains and high-voltage safety">
          The primary side of an offline supply is referenced to mains, and bulk capacitors can hold a lethal charge
          after unplugging. A grounded scope&apos;s probe clip is tied to earth, so connecting it to a non-isolated node
          causes a short and can destroy the probe or the supply. Use a differential probe or power the device under
          test through an isolation transformer, discharge capacitors before touching anything, and never defeat the
          scope&apos;s earth connection.
        </Callout>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">Quick comparison</h2>
          <DataTable
            head={["#", "Scope", "Resolution", "Channels / bandwidth", "Max memory", "Best for"]}
            rows={comparisonRows}
            mono={[0]}
          />
          <p className="text-xs text-muted leading-5">
            Memory is the single-channel maximum. Rigol&apos;s DS1000Z product page lists 12 Mpts standard and 24 Mpts
            optional, while its datasheet lists 24 Mpts. The SDS1104X-E figure is 14 Mpts interleaved, 7 Mpts per
            channel otherwise.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">How the ten compare on paper</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Figure
              caption={
                <>
                  Vertical levels from native ADC bits (higher is finer): at 10 mV/div that is a 0.02 mV step at 12-bit
                  against 0.31 mV at 8-bit. High-resolution modes on 8-bit scopes are not counted.
                </>
              }
            >
              <BarChart
                items={[
                  { label: "Rigol DHO914S", value: 4096, display: "4,096 (12-bit)", highlight: true },
                  { label: "Rigol DHO914", value: 4096, display: "4,096 (12-bit)", highlight: true },
                  { label: "Rigol DHO804", value: 4096, display: "4,096 (12-bit)", highlight: true },
                  { label: "Rigol DHO802", value: 4096, display: "4,096 (12-bit)", highlight: true },
                  { label: "Siglent SDS1104X-E", value: 256, display: "256 (8-bit)" },
                  { label: "Siglent SDS1202X-E", value: 256, display: "256 (8-bit)" },
                  { label: "Hantek DSO2D15", value: 256, display: "256 (8-bit)" },
                  { label: "Rigol DS1054Z", value: 256, display: "256 (8-bit)" },
                  { label: "PicoScope 2206B", value: 256, display: "256 (8-bit)" },
                  { label: "OWON HDS2202S", value: 256, display: "256 (8-bit)" },
                ]}
              />
            </Figure>
            <Figure caption={<>Maximum single-channel memory depth, on a log scale.</>}>
              <BarChart
                log
                items={[
                  { label: "Rigol DHO914S", value: 50_000_000, display: "50 Mpts", highlight: true },
                  { label: "Rigol DHO914", value: 50_000_000, display: "50 Mpts", highlight: true },
                  { label: "PicoScope 2206B", value: 32_000_000, display: "32 MS" },
                  { label: "Rigol DHO804", value: 25_000_000, display: "25 Mpts" },
                  { label: "Rigol DHO802", value: 25_000_000, display: "25 Mpts" },
                  { label: "Rigol DS1054Z", value: 24_000_000, display: "24 Mpts" },
                  { label: "Siglent SDS1104X-E", value: 14_000_000, display: "14 Mpts" },
                  { label: "Siglent SDS1202X-E", value: 14_000_000, display: "14 Mpts" },
                  { label: "Hantek DSO2D15", value: 8_000_000, display: "8 Mpts" },
                  { label: "OWON HDS2202S", value: 8_000, display: "8K" },
                ]}
              />
            </Figure>
          </div>
          <Figure
            caption={
              <>
                Rated bandwidth. It matters most for switch-node edges; for ripple alone, a 20 MHz limit is often
                switched on.
              </>
            }
          >
            <BarChart
              items={[
                { label: "Siglent SDS1202X-E", value: 200, display: "200 MHz", highlight: true },
                { label: "OWON HDS2202S", value: 200, display: "200 MHz", highlight: true },
                { label: "Hantek DSO2D15", value: 150, display: "150 MHz" },
                { label: "Rigol DHO914S", value: 125, display: "125 MHz" },
                { label: "Rigol DHO914", value: 125, display: "125 MHz" },
                { label: "Siglent SDS1104X-E", value: 100, display: "100 MHz" },
                { label: "Rigol DHO804", value: 70, display: "70 MHz" },
                { label: "Rigol DHO802", value: 70, display: "70 MHz" },
                { label: "Rigol DS1054Z", value: 50, display: "50 MHz" },
                { label: "PicoScope 2206B", value: 50, display: "50 MHz" },
              ]}
            />
          </Figure>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">What to look for in a power supply scope</h2>
          <InfoCards items={lookFor} />
          <KeyIdea title="Why the step size matters">
            Ripple of 20 mV peak-to-peak spans only about 64 levels on an 8-bit scope at 10 mV/div, but about 1,000 on a
            12-bit one. Averaging and high-resolution modes help on 8-bit scopes but trade away bandwidth and single-shot
            detail. For noise you can&apos;t pin down, see{" "}
            <Link href="/oscilloscopes/how-to-measure-noise-floor-with-an-oscilloscope" className={linkClass}>
              measuring an oscilloscope&apos;s noise floor
            </Link>{" "}
            and{" "}
            <Link href="/oscilloscopes/how-to-measure-a-switching-power-supply-waveform-with-an-oscilloscope" className={linkClass}>
              reading a switching supply waveform
            </Link>
            .
          </KeyIdea>
        </div>
      </section>

      <ReviewArticle
        picks={picks}
        faqs={faqs}
        howWeChose="We ranked these ten for supply and regulator testing: native vertical resolution and memory per channel first, then channel count, bandwidth for switching edges and built-in loop-analysis tools. All figures come from maker datasheets, product pages or official listings; the ranking is desk research, and only the Rigol DHO804, Siglent SDS1104X-E and Rigol DS1054Z carry our Hands-on Tested badge."
        fitNotes={fitNotes}
        advice={advice}
      />
      <ContentLinks category="oscilloscopes" current="/oscilloscopes/best-oscilloscopes-for-power-supply-testing" />
    </>
  );
}
