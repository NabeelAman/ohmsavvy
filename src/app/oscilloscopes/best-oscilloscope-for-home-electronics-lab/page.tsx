import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { CategoryHero } from "@/components/CategoryHero";
import { ReviewArticle } from "@/components/ReviewArticle";
import { BarChart, Callout, DataTable, Figure } from "@/components/HowTo";
import { picks as allPicks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";
import { guidePicks } from "@/lib/content";

export const metadata = buildMetadata({
  title: "10 Best Oscilloscopes for Home Electronics Labs",
  description:
    "The best oscilloscope for a home electronics lab: 10 bench scopes ranked on channels, 12-bit resolution, memory, built-in generators and room to grow.",
  path: "/oscilloscopes/best-oscilloscope-for-home-electronics-lab",
  image: "https://m.media-amazon.com/images/I/71XnyEAt3lL._SL1500_.jpg",
});

const names = guidePicks("/oscilloscopes/best-oscilloscope-for-home-electronics-lab");
const picks = names.map((n) => allPicks.find((p) => p.name === n)!).filter(Boolean);

// All figures below come from the Pick objects in ../best-beginner-oscilloscopes/page.tsx and the maker-sourced
// research files: verified-facts.md (SDS1000X-E: 14 Mpts interleaved / 7 Mpts per channel, standard decode, 8-bit,
// MSO and USB AWG optional on four-channel models; DS1000Z: 8-bit, decode types, 24 Mpts in the datasheet vs 12 Mpts
// standard on Rigol's product page), rigol-dho914.json, rigol-dho914s.json, rigol-ds1104z-s-plus.json,
// hantek-dso2d15.json, and the Hantek DSO2D10 entry in verified-facts.md (8 Mpts on one channel).

const fitNotes: Record<string, string> = {
  "Rigol DHO914S":
    "Top of the list because one box covers almost every home-lab job: four 12-bit channels at 125 MHz, up to 50 Mpts, 16 digital inputs once you add the PLA2216 probe, and a 25 MHz generator with Bode plot for checking filters and amplifiers. Its limits are that the logic probe is sold separately and that it costs more than the otherwise identical DHO914.",
  "Rigol DHO804":
    "The sensible centre of a hobby bench: four channels, 12-bit resolution, a 7-inch touchscreen and USB-C power in a compact body, and it carries our Hands-on Tested badge. It drops to second because it stops at 70 MHz and has neither a generator nor logic inputs.",
  "Siglent SDS1104X-E":
    "Four 100 MHz channels, a 100,000 wfm/s update rate and free serial decoding make it a strong all-rounder that also carries our Hands-on Tested badge. It is 8-bit, and its MSO and AWG upgrades are paid options, which places it just behind the two 12-bit Rigols.",
  "Rigol DHO914":
    "Everything in the DHO914S except the generator and Bode plot, so it suits a lab that already owns a function generator. The 125 MHz bandwidth, 50 Mpts memory and 16-channel logic support (probe sold separately) outclass the DHO804, but buying a separate signal source later can cost more than choosing the S model now.",
  "Rigol DS1104Z-S Plus":
    "The only pick with a two-channel 25 MHz generator, useful for driving a circuit with two related signals, plus four 100 MHz inputs and an upgrade path to 16 logic channels via the RPL1116 kit. It ranks fifth because it is 8-bit with an 800 × 480 screen, and Rigol's sources disagree on its standard memory and decoding.",
  "Rigol DS1054Z":
    "Four 50 MHz channels still cover audio, power and microcontroller work in a typical home lab, and this scope carries our Hands-on Tested badge. Its lower bandwidth, 8-bit converter and the conflict between Rigol's datasheet and product page over memory and decoding place it sixth.",
  "Siglent SDS1202X-E":
    "The pick for a lab leaning toward faster digital and switching circuits: 200 MHz, a 100,000 wfm/s update rate and standard I2C, SPI, UART, CAN and LIN decode. Only two channels, and no MSO or AWG option on this model, make it a specialist rather than a general bench scope.",
  "Hantek DSO2D15":
    "A budget path to 150 MHz with a 25 MHz generator and UART, I2C, SPI, CAN and LIN decoding on the same bench. It is 8-bit (with a 12-bit high-resolution mode) and two-channel, so it cannot match the four-channel picks for comparing several points in a circuit.",
  "Rigol DHO802":
    "Keeps the DHO800 strengths, 12-bit resolution, 25 Mpts and a 1024 × 600 touchscreen, at two channels for a smaller budget. Two inputs are enough for input-versus-output checks, but a varied home lab will hit that ceiling sooner than with the DHO804.",
  "Hantek DSO2D10":
    "The entry ticket on this list: 100 MHz, a 25 MHz generator and Hantek-listed serial decoding in one compact mains-powered scope. Two 8-bit channels and 8 Mpts of memory make it the first one a growing lab would outgrow, which is why it ranks tenth.",
};

const advice = [
  {
    heading: "Buy channels before bandwidth",
    body: "A home lab sees varied work: an audio amplifier one weekend, a switching regulator the next, then a microcontroller bus. Four channels let you watch input, output, a supply rail and a trigger signal together, which is often how a fault finally reveals itself. Six of our ten picks have four analog channels. Most hobby circuits sit well inside 70 to 100 MHz, so extra channels usually pay off before extra bandwidth does.",
  },
  {
    heading: "Decide whether 12-bit matters to your projects",
    body: "The Rigol DHO800 and DHO900 models digitise at 12 bits, giving sixteen times finer vertical steps than an 8-bit converter. That shows up when you look at small ripple on a supply rail, low-level audio or noise riding on a larger signal. If your work is mostly digital timing, an 8-bit scope such as the Siglent SDS1104X-E or a Hantek DSO2000 model serves you well and the difference matters less.",
  },
  {
    heading: "Count the instruments a built-in generator replaces",
    body: "A signal source turns a scope into a test station: feed a sine wave into a filter, sweep an amplifier, or fake a sensor input. The DHO914S, DS1104Z-S Plus, DSO2D15 and DSO2D10 have one built in, and the DHO914S adds a Bode plot function that sweeps a circuit's frequency response automatically. If bench space or budget is tight, a combined unit avoids buying a separate function generator later.",
  },
  {
    heading: "Plan for logic channels if you build digital projects",
    body: "Mixed-signal capability lets you watch a parallel bus or several GPIO lines alongside analog signals. The DHO914 and DHO914S include 16 digital channels that need the PLA2216 probe, the DS1104Z-S Plus can be upgraded with the RPL1116 kit, and Siglent sells an MSO option for the four-channel SDS1104X-E. None of these probes is in the box, so add the cost when you compare.",
  },
  {
    heading: "Mind the bench: power, screen and footprint",
    body: "The Rigol DHO models run from a USB-C 15 V supply and are compact enough for a shelf-mounted bench; their 1024 × 600 touchscreens have more pixels than the 800 × 480 displays on the older Rigol, Siglent and Hantek designs. Mains-powered scopes are bulkier but need no external adapter. Whatever you choose, learn to compensate your probes before taking measurements you rely on.",
  },
];

const faqs = [
  {
    question: "Is a 4-channel scope worth it for a home lab, or is 2 enough?",
    answer:
      "For a general home lab, four channels are worth it. Varied projects regularly need more than two signals at once, such as a clock against data, an input against an output plus the supply rail, or a full SPI bus. Two-channel scopes like the Siglent SDS1202X-E or Rigol DHO802 make sense when bandwidth or budget matters more and your work rarely involves more than two related signals.",
  },
  {
    question: "Should I buy the higher-bandwidth option now or upgrade later?",
    answer:
      "Match bandwidth to the fastest signals you expect within a few years, not the fastest you can imagine. Audio, power supplies and microcontroller buses sit comfortably within 70 to 100 MHz. If faster digital logic or switching edges are on your roadmap, a 125 MHz DHO914 or 200 MHz SDS1202X-E avoids a second purchase. Otherwise, spend the difference on channels, memory or a generator.",
  },
  {
    question: "Is a 12-bit oscilloscope worth it for a hobbyist?",
    answer:
      "It is worth it if you measure small details on larger signals: power-supply ripple, audio distortion, sensor noise. Twelve bits give 4,096 vertical levels against 256 for an 8-bit converter, so fine detail is not lost in quantisation steps. Rigol's DHO800 and DHO900 scopes offer this at hobby prices. For mainly digital timing work, an 8-bit scope is still entirely adequate.",
  },
  {
    question: "Do I need an oscilloscope with a built-in signal generator?",
    answer:
      "Not strictly, but it is convenient. A generator lets you test filters, amplifiers and sensor inputs with a known waveform, and the DHO914S can use its generator for automatic Bode plots. If you already own a function generator, a scope without one, such as the DHO914 or DHO804, puts the money into the scope itself. If you own neither, a combined unit saves bench space.",
  },
  {
    question: "What memory depth should a home lab oscilloscope have?",
    answer:
      "Several million points is a sensible floor. Deep memory lets the scope keep a high sample rate on long time bases, so you can capture a full power-up sequence or a burst of serial traffic and zoom in without blurring. Our picks range from 8 Mpts on the Hantek DSO2000 models to 50 Mpts on the Rigol DHO900 models with one channel enabled.",
  },
  {
    question: "Can I measure mains voltage with a bench oscilloscope?",
    answer:
      "Not directly with standard probes. The ground clip on a mains-powered bench scope connects to earth, so clipping it onto a mains-referenced point creates a short circuit. Mains measurements need a differential probe or an isolation approach rated for the job. Learn on low-voltage circuits first, and treat anything connected to the wall outlet as a separate, safety-rated task.",
  },
];

const tableRows = [
  ["1", "Rigol DHO914S", "4 + 16 digital*", "125 MHz", "12-bit, 50 Mpts", "One-box lab with a 25 MHz generator and Bode plot"],
  ["2", "Rigol DHO804", "4", "70 MHz", "12-bit, 25 Mpts", "A compact 12-bit four-channel bench"],
  ["3", "Siglent SDS1104X-E", "4", "100 MHz", "8-bit, 14 Mpts", "Fast updates and free serial decoding"],
  ["4", "Rigol DHO914", "4 + 16 digital*", "125 MHz", "12-bit, 50 Mpts", "Labs that already own a function generator"],
  ["5", "Rigol DS1104Z-S Plus", "4", "100 MHz", "8-bit, 24 or 12 Mpts**", "Two generator outputs on a four-channel bench"],
  ["6", "Rigol DS1054Z", "4", "50 MHz", "8-bit, 24 or 12 Mpts**", "Audio, power and microcontroller basics"],
  ["7", "Siglent SDS1202X-E", "2", "200 MHz", "8-bit, 14 Mpts", "Faster digital and switching circuits"],
  ["8", "Hantek DSO2D15", "2", "150 MHz", "8-bit, 8 Mpts", "Budget bandwidth plus a signal source"],
  ["9", "Rigol DHO802", "2", "70 MHz", "12-bit, 25 Mpts", "Two-channel work at 12-bit"],
  ["10", "Hantek DSO2D10", "2", "100 MHz", "8-bit, 8 Mpts", "A first bench scope with a generator"],
];

const bandwidth = [
  { label: "Siglent SDS1202X-E", value: 200, display: "200 MHz" },
  { label: "Hantek DSO2D15", value: 150, display: "150 MHz" },
  { label: "Rigol DHO914S", value: 125, display: "125 MHz", highlight: true },
  { label: "Rigol DHO914", value: 125, display: "125 MHz" },
  { label: "Siglent SDS1104X-E", value: 100, display: "100 MHz" },
  { label: "Rigol DS1104Z-S Plus", value: 100, display: "100 MHz" },
  { label: "Hantek DSO2D10", value: 100, display: "100 MHz" },
  { label: "Rigol DHO804", value: 70, display: "70 MHz" },
  { label: "Rigol DHO802", value: 70, display: "70 MHz" },
  { label: "Rigol DS1054Z", value: 50, display: "50 MHz" },
];

const memory = [
  { label: "Rigol DHO914S", value: 50, display: "50 Mpts", highlight: true },
  { label: "Rigol DHO914", value: 50, display: "50 Mpts" },
  { label: "Rigol DHO804", value: 25, display: "25 Mpts" },
  { label: "Rigol DHO802", value: 25, display: "25 Mpts" },
  { label: "Rigol DS1104Z-S Plus", value: 24, display: "24 Mpts (datasheet)" },
  { label: "Rigol DS1054Z", value: 24, display: "24 Mpts (datasheet)" },
  { label: "Siglent SDS1104X-E", value: 14, display: "14 Mpts" },
  { label: "Siglent SDS1202X-E", value: 14, display: "14 Mpts" },
  { label: "Hantek DSO2D15", value: 8, display: "8 Mpts" },
  { label: "Hantek DSO2D10", value: 8, display: "8 Mpts" },
];

const resolution = [
  { label: "Rigol DHO914S", value: 4096, display: "12-bit (4,096 levels)", highlight: true },
  { label: "Rigol DHO804", value: 4096, display: "12-bit (4,096 levels)" },
  { label: "Rigol DHO914", value: 4096, display: "12-bit (4,096 levels)" },
  { label: "Rigol DHO802", value: 4096, display: "12-bit (4,096 levels)" },
  { label: "Siglent SDS1104X-E", value: 256, display: "8-bit (256 levels)" },
  { label: "Rigol DS1104Z-S Plus", value: 256, display: "8-bit (256 levels)" },
  { label: "Rigol DS1054Z", value: 256, display: "8-bit (256 levels)" },
  { label: "Siglent SDS1202X-E", value: 256, display: "8-bit (256 levels)" },
  { label: "Hantek DSO2D15", value: 256, display: "8-bit (256 levels)" },
  { label: "Hantek DSO2D10", value: 256, display: "8-bit (256 levels)" },
];

export default function BestOscilloscopeForHomeElectronicsLabPage() {
  return (
    <>
      <CategoryHero
        category="oscilloscopes"
        label="Oscilloscopes · For a Home Electronics Lab"
        heading="Top 10 Best Oscilloscopes for Home Electronics Labs"
        tagline="Ranked for a general-purpose hobby bench. No pay-for-placement."
        description="A home lab needs one scope that handles audio, power, microcontrollers and whatever comes next. We ranked ten bench scopes on channels, resolution, memory, built-in extras and room to grow."
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
            The scope on a home bench rarely gets a single job. It might check the ripple on a bench supply, follow a
            signal through a guitar pedal, verify the timing of a microcontroller bus and then help repair a broken
            gadget, all in the same month. That makes a home lab oscilloscope different from a specialist tool: it
            has to be broadly capable, comfortable to use every day and good enough that you will not want to replace
            it as your projects grow. Our{" "}
            <Link href="/oscilloscopes/oscilloscope-buying-guide" className="text-accent underline">
              oscilloscope buying guide
            </Link>{" "}
            explains the core specs if you are starting from scratch.
          </p>
          <p>
            For that reason we ranked these ten benchtop scopes on breadth rather than any single headline number.
            Four channels, 12-bit resolution, deep memory, a built-in signal generator and an upgrade path to logic
            channels each widen what one instrument can do; bandwidth matters, but most hobby circuits sit well below
            100 MHz. Every pick is a mains or USB-C powered bench model sold on Amazon.com, from compact budget
            Hantek units to Rigol&apos;s 12-bit DHO900 series. Once your scope arrives,{" "}
            <Link href="/oscilloscopes/how-to-compensate-an-oscilloscope-probe" className="text-accent underline">
              compensate the probes
            </Link>{" "}
            before anything else.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-display text-2xl">Quick comparison</h2>
          <DataTable
            head={["Rank", "Scope", "Channels", "Bandwidth", "Resolution, max memory", "Best for"]}
            rows={tableRows}
            mono={[0]}
          />
          <p className="text-xs text-muted leading-5">
            * Digital channels need Rigol&apos;s PLA2216 logic probe, sold separately. ** Rigol&apos;s DS1000Z datasheet
            lists 24 Mpts; its product page says 12 Mpts standard with 24 Mpts optional. Memory figures are with one
            channel enabled (Siglent: interleaved).
          </p>
        </div>

        <Figure caption="Analog bandwidth per each maker's specification. Logarithmic scale; the highlighted bar is our top pick.">
          <BarChart items={bandwidth} log />
        </Figure>

        <Figure caption="Maximum record length with one channel on, in millions of points. DS1000Z figures use Rigol's datasheet value; its product page lists 12 Mpts standard.">
          <BarChart items={memory} />
        </Figure>

        <Figure caption="Vertical levels per maker-stated ADC resolution. Logarithmic scale: a 12-bit converter resolves 16 times finer steps than an 8-bit one.">
          <BarChart items={resolution} log />
        </Figure>

        <div className="space-y-4">
          <h2 className="font-display text-2xl">What to look for in a home lab oscilloscope</h2>
          <DataTable
            head={["Feature", "Why it matters at home", "Picks that have it"]}
            rows={[
              ["Four analog channels", "Watch input, output, a rail and a trigger together on varied projects", "DHO914S, DHO804, SDS1104X-E, DHO914, DS1104Z-S Plus, DS1054Z"],
              ["12-bit resolution", "Reveals small ripple, noise and audio detail an 8-bit scope blurs", "DHO914S, DHO804, DHO914, DHO802"],
              ["Built-in generator", "Drives filters, amplifiers and sensor inputs with a known signal", "DHO914S, DS1104Z-S Plus, DSO2D15, DSO2D10"],
              ["Logic channel option", "Adds digital lines for buses and GPIO without using analog inputs", "DHO914S, DHO914 (PLA2216), DS1104Z-S Plus (RPL1116), SDS1104X-E (MSO option)"],
              ["Serial decoding", "Reads I2C, SPI and UART traffic from microcontroller projects", "All ten list it, though Rigol's DS1000Z sources disagree on whether it is optional"],
            ]}
          />
          <p className="text-muted leading-7">
            Weighing two of these against each other? Our comparisons of the{" "}
            <Link href="/oscilloscopes/rigol-dho914-vs-rigol-dho804" className="text-accent underline">
              Rigol DHO914 and DHO804
            </Link>
            , the{" "}
            <Link href="/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e" className="text-accent underline">
              DHO804 and Siglent SDS1104X-E
            </Link>{" "}
            and the{" "}
            <Link href="/oscilloscopes/rigol-ds1104z-s-plus-vs-siglent-sds1104x-e" className="text-accent underline">
              DS1104Z-S Plus and SDS1104X-E
            </Link>{" "}
            go spec by spec. For a first real project on your new bench, try{" "}
            <Link href="/oscilloscopes/how-to-measure-ripple-voltage-with-an-oscilloscope" className="text-accent underline">
              measuring ripple voltage
            </Link>
            .
          </p>
        </div>

        <Callout title="Mains safety on a home bench">
          A mains-powered bench oscilloscope ties every probe ground clip to earth. Never clip a ground lead onto a
          mains-referenced point or the primary side of an unisolated power supply: it creates a short through the
          scope. Use a differential probe or an isolation transformer rated for the job, and keep high-voltage work
          separate from everyday low-voltage projects.
        </Callout>
      </section>

      <ReviewArticle
        picks={picks}
        faqs={faqs}
        fitNotes={fitNotes}
        advice={advice}
        howWeChose="We ranked these ten for a general-purpose hobby bench: four channels, vertical resolution, memory depth, built-in generators and logic upgrade paths, with bandwidth judged against typical home-lab circuits rather than maximised. This is desk research against each maker's specifications and the official Amazon listings; only the Rigol DHO804, Siglent SDS1104X-E and Rigol DS1054Z carry our Hands-on Tested badge."
      />
      <ContentLinks category="oscilloscopes" current="/oscilloscopes/best-oscilloscope-for-home-electronics-lab" />
    </>
  );
}
