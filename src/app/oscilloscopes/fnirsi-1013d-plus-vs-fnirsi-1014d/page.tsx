import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// FNIRSI 1013D: battery 6000 mAh, about 4 hours; USB-C charging, usable while charging; capacitive touch with
// gestures; 1X probe = 5 MHz; max test voltage 1X 40 V / 10X 400 V / 100X 4000 V; rise time <3 ns; timebase
// 50 s-10 ns; 12 auto parameters; Single/Normal/Auto edge trigger; 1 GB storage (1000 screenshots + 1000 waveforms);
// style options "1013D Std." and "1013D Plus" (SKU st-EN-1013D_P4100) per https://www.fnirsi.com/products/1013d
// and https://www.fnirsi.com/products/1013d.js (checked 2026-10-24). Item weight 2.33 lb per
// https://www.amazon.com/dp/B0BHHYMVKV; plain 1013D sold as B0BB2GTM1J (checked 2026-10-24).
// FNIRSI 1014D: 8-bit ADC; generator 2.5 Vpp, sine to 10 MHz, other waves to 2 MHz, custom to 1 MHz, 1 Hz
// resolution; external trigger input 0-40 V; max test voltage 1X 40 V / 10X 400 V; rise time <3 ns; 12 auto
// parameters; 1 GB storage; 5 V 2A/3A/4A supply per https://www.fnirsi.com/products/1014d (checked 2026-10-24).
// Item weight 3.46 lb and kit contents (2 x 1X/10X probes + P4100 100X probe) per
// https://www.amazon.com/dp/B097T5NRTZ (checked 2026-10-24).

const path = "/oscilloscopes/fnirsi-1013d-plus-vs-fnirsi-1014d";

export const metadata = buildMetadata({
  title: "FNIRSI 1013D Plus vs 1014D: Key Differences",
  description:
    "FNIRSI 1013D Plus vs FNIRSI 1014D: the same 100 MHz, 1 GSa/s scope class as a battery touchscreen tablet or a mains benchtop with a signal generator.",
  path: "/oscilloscopes/fnirsi-1013d-plus-vs-fnirsi-1014d",
  image: "https://m.media-amazon.com/images/I/71L+POCNTVL._AC_SL1500_.jpg",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "FNIRSI 1013D Plus vs FNIRSI 1014D",
  path,
  published: "2026-10-24",
  intro:
    "FNIRSI 1013D Plus vs FNIRSI 1014D is a rare comparison where the scope numbers barely move: both are two-channel, 100 MHz, 1 GSa/s instruments with a 7-inch 800 × 480 screen and a memory FNIRSI quotes as 240 Kbit. What changes is the body around them. The 1013D Plus is a battery tablet you drive by touch; the 1014D is a desktop box with a built-in signal generator.",
  a: {
    pick: picks.find((p) => p.name === "FNIRSI 1013D Plus")!,
    imageAlt: "FNIRSI 1013D Plus battery-powered tablet oscilloscope with 7-inch touchscreen",
    chooseIf: [
      "You will carry the scope to a car, a workshop or a project that isn't next to a socket",
      "You prefer pinching and swiping a waveform to turning knobs",
      "Your circuits already make their own signals, so a generator would sit unused",
      "You want the lighter unit: 2.33 lb against 3.46 lb on the Amazon listings",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "FNIRSI 1014D")!,
    imageAlt: "FNIRSI 1014D two-channel benchtop oscilloscope with built-in DDS signal generator",
    chooseIf: [
      "The scope will live on one desk and you want physical buttons and knobs",
      "You need to inject a test signal into filters, amplifiers or sensor inputs",
      "You want an external trigger input, which FNIRSI lists for the 1014D at 0 to 40 V",
      "You would rather not depend on a charged battery during a long session",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "7-inch 800 × 480 capacitive touchscreen", b: "7-inch 800 × 480" },
    { label: "Memory (as FNIRSI writes it)", a: "\"240 Kbit\"", b: "\"240Kbit\"" },
    { label: "Built-in signal generator", a: "None", b: "1 ch DDS, sine to 10 MHz, other waves to 2 MHz, 2.5 Vpp" },
    { label: "Power", a: "6000 mAh battery (about 4 h), USB-C charging", b: "5 V adapter" },
    { label: "100X high-voltage probe in the Amazon kit", a: "Yes (P4100)", b: "Yes (P4100)" },
    { label: "Weight (Amazon listing)", a: "2.33 lb", b: "3.46 lb" },
  ],
  differences: [
    "Same scope class: FNIRSI rates both at two channels, 100 MHz and 1 GSa/s, with rise time under 3 ns, 12 automatic parameters and FFT, X-Y and roll modes.",
    "Only the 1014D has a signal generator: one DDS channel at 2.5 Vpp, sine up to 10 MHz, other waveforms up to 2 MHz and a custom waveform up to 1 MHz.",
    "Only the 1013D Plus runs on a battery: 6000 mAh for about four hours, charged over USB-C and usable while charging. The 1014D runs from a 5 V adapter.",
    "The 1013D Plus is operated by capacitive touch and gestures on its 7-inch panel; the 1014D's 7-inch panel of the same resolution is driven from front-panel controls.",
    "\"Plus\" is not a faster model. It is FNIRSI's name for the 1013D sold with a P4100 100X probe; the plain 1013D has identical specs without that probe.",
    "Both Amazon kits include a P4100 100X probe, so high-voltage reach is not what separates them.",
    "FNIRSI states 8-bit resolution for the 1014D but doesn't publish the 1013D's ADC resolution. Neither page states the per-channel rate with both channels on.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Charting two scopes with identical headline ratings shows something useful: the bars only separate where
          the products do something different. Every figure below comes from FNIRSI&apos;s product pages or the
          official Amazon listings, and the conditions behind each number are in the captions.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure
            caption={
              <>
                Rated bandwidth, log scale. FNIRSI notes the 1013D drops to 5 MHz with its probe on 1X; it gives no
                1X figure for the 1014D, though any 1X probe setting usually costs bandwidth.
              </>
            }
          >
            <BarChart
              log
              items={[
                { label: "1013D Plus, 10X probe", value: 100, display: "100 MHz", highlight: true },
                { label: "1013D Plus, 1X probe", value: 5, display: "5 MHz" },
                { label: "1014D", value: 100, display: "100 MHz", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Maximum sample rate. Both are rated 1 GSa/s; neither maker figure covers two channels on.</>}>
            <BarChart
              items={[
                { label: "FNIRSI 1013D Plus", value: 1000, display: "1 GSa/s" },
                { label: "FNIRSI 1014D", value: 1000, display: "1 GSa/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Built-in generator ceiling by waveform on the 1014D. The 1013D Plus has no generator.</>}>
            <BarChart
              items={[
                { label: "1014D sine", value: 10, display: "10 MHz", highlight: true },
                { label: "1014D other waves", value: 2, display: "2 MHz" },
                { label: "1014D custom wave", value: 1, display: "1 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Item weight from each official Amazon listing. The tablet is about a third lighter.</>}>
            <BarChart
              items={[
                { label: "FNIRSI 1013D Plus", value: 2.33, display: "2.33 lb", highlight: true },
                { label: "FNIRSI 1014D", value: 3.46, display: "3.46 lb" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          At 1 GSa/s either scope draws a 100 MHz sine from ten points per cycle and a 10 MHz clock from a hundred,
          comfortably above the Nyquist minimum of two. Because FNIRSI doesn&apos;t say whether that rate is shared
          when both channels run, treat the two-channel picture as unknown on both rather than assuming the full
          rate. Our explainer on{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>{" "}
          covers why sharing matters.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Tablet or benchtop: where each one earns its keep</h2>
        <p className="text-muted leading-7 mb-4">
          Since the measuring hardware is rated the same, the honest way to choose is to picture where the scope
          will be when you need it, and what else you will have in your hands.
        </p>
        <h3 className="text-lg font-semibold mb-2">Away from the bench: the 1013D Plus</h3>
        <p className="text-muted leading-7 mb-4">
          A tablet that runs about four hours unplugged goes where a desktop box can&apos;t easily follow: into an
          engine bay to look at a sensor output, out to a solar-powered gate opener whose controller keeps resetting, or
          onto a garage floor next to a robot that won&apos;t drive straight. When the battery runs low you can keep
          working with a USB-C charger attached. The touchscreen helps here too. Dragging the trace to shift the
          timebase or pinching to zoom is faster with one free hand than hunting for a knob while the other hand
          holds a probe on a test point.
        </p>
        <h3 className="text-lg font-semibold mb-2">On a fixed desk: the 1014D</h3>
        <p className="text-muted leading-7 mb-4">
          The 1014D makes the most sense where the work is design rather than repair. Building an active filter,
          an audio preamp or an op-amp stage means feeding a known input and watching what comes out, and its
          generator supplies that input without a second instrument. Set a 1 kHz sine, put channel 1 on the input
          and channel 2 on the output, then step the frequency up in 1 Hz increments to find where the output
          starts to fall. FNIRSI also lists an external trigger input (0 to 40 V) on the 1014D, handy when a
          separate sync pulse marks the moment you care about.
        </p>
        <KeyIdea title="What 2.5 Vpp can and can't drive">
          The 1014D&apos;s generator output tops out at 2.5 Vpp. That is plenty for an op-amp input, an audio stage
          or an RC filter, which mostly want signals well under a volt or two. It is less than the full swing of
          3.3 V or 5 V logic, so don&apos;t count on it to clock a digital chip reliably at its rated levels.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What both can and can&apos;t measure</h2>
        <p className="text-muted leading-7 mb-4">
          The rated 100 MHz is the frequency where a sine reads about 30% low (−3 dB), so the usual three-to-five
          times margin puts accurate work below roughly 20 to 33 MHz on either scope. That covers PWM from any
          hobby microcontroller, UART and I2C at common speeds, audio, and the switching node of most small
          converters. Our guide to{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            oscilloscope bandwidth
          </Link>{" "}
          explains the margin.
        </p>
        <p className="text-muted leading-7 mb-4">
          The probe setting moves that ceiling. On the 1013D, FNIRSI&apos;s own note gives 5 MHz on 1X, which by the
          same margin means trusting only signals below roughly 1 to 1.7 MHz. Keep the probe on 10X for anything
          with fast edges, and use 1X only for small, slow signals where the extra sensitivity helps.
        </p>
        <p className="text-muted leading-7 mb-4">
          Both share the same blind spots. FNIRSI quotes memory as 240 Kbit without saying what that means in
          points, so long, detailed captures of a rare glitch are not a strength of either. Neither product page
          lists serial decoding or logic channels, so reading I2C or UART bytes means counting edges by eye.
        </p>
        <DataTable
          head={["Task", "1013D Plus", "1014D"]}
          rows={[
            ["Accurate signal range (10X probe)", "~20–33 MHz", "~20–33 MHz"],
            ["Accurate signal range (1X probe)", "~1–1.7 MHz (5 MHz rated)", "1X bandwidth not stated by FNIRSI"],
            ["Supply its own test signal", "No", "Yes, sine to 10 MHz at 2.5 Vpp"],
            ["Work without a socket", "Yes, about 4 h", "No battery listed"],
            ["Maker voltage limit on 100X", "4000 V (FNIRSI)", "100X probe in kit; FNIRSI limit listed for 1X/10X only"],
            ["Maker voltage limit on 10X", "400 V", "400 V"],
          ]}
        />
        <div className="mt-4">
          <Callout title="High voltage needs more than a 100X probe">
            Both kits ship with a P4100 100X probe, and FNIRSI lists 4000 V for the 1013D on 100X. That figure is
            about the probe&apos;s attenuation, not permission to clip onto mains. The two channels share a ground
            on both scopes unless FNIRSI says otherwise, and it doesn&apos;t, so a ground lead on a live conductor
            can short it through the scope. Running the tablet on battery doesn&apos;t change that. Use a
            differential probe for line-side work.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Pick", "Why"]}
          rows={[
            ["Car and motorbike sensor checks", "FNIRSI 1013D Plus", "Battery tablet goes to the vehicle, about 4 h per charge"],
            ["Designing filters and amplifiers", "FNIRSI 1014D", "Built-in sine source to 10 MHz with 1 Hz steps"],
            ["Field repair of appliances and controllers", "FNIRSI 1013D Plus", "No socket needed, lighter at 2.33 lb"],
            ["Student bench with no other gear", "FNIRSI 1014D", "Scope and signal source in one box"],
            ["Prefer touch and gestures", "FNIRSI 1013D Plus", "Capacitive touchscreen operation"],
            ["Triggering from an external sync pulse", "FNIRSI 1014D", "FNIRSI lists a 0–40 V external trigger input"],
            ["Want the 1013D but not the 100X probe", "Plain FNIRSI 1013D", "Same specs, sold without the P4100"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For the whole field, see the{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            best beginner oscilloscopes
          </Link>{" "}
          and the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>
          . If the 1014D is your shortlist, it also faces the{" "}
          <Link href="/oscilloscopes/hantek-dso2d15-vs-fnirsi-1014d" className={link}>
            Hantek DSO2D15
          </Link>
          , the{" "}
          <Link href="/oscilloscopes/hantek-dso2c10-vs-fnirsi-1014d" className={link}>
            Hantek DSO2C10
          </Link>{" "}
          and FNIRSI&apos;s own{" "}
          <Link href="/oscilloscopes/fnirsi-2c53t-vs-fnirsi-1014d" className={link}>
            2C53T handheld
          </Link>{" "}
          in separate comparisons.
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Buy the FNIRSI 1013D Plus if your scope has to travel: it is the lighter unit, runs about four hours on battery and is driven by touch, with the same 100 MHz, 1 GSa/s rating. Buy the FNIRSI 1014D if it will stay on one desk and you want to feed circuits a test signal; its built-in generator is the one capability the tablet lacks. If you don't need the 100X probe, the plain 1013D has the same specs.",
  faqs: [
    {
      question: "Is the FNIRSI 1013D Plus a different oscilloscope from the 1013D?",
      answer:
        "No. FNIRSI sells one 1013D with two options: 1013D Std. and 1013D Plus, and the Plus option's SKU adds the P4100 100X high-voltage probe. Amazon lists them as variants of one listing with identical specifications, so the Plus only makes sense if you want that probe in the box.",
    },
    {
      question: "Does the FNIRSI 1013D Plus have a signal generator like the 1014D?",
      answer:
        "No. FNIRSI lists no signal generator for the 1013D. The 1014D has a single-channel DDS generator at 2.5 Vpp: sine up to 10 MHz, other waveforms up to 2 MHz and a custom waveform up to 1 MHz. If you need to inject test signals, that is the deciding difference.",
    },
    {
      question: "Can the FNIRSI 1014D run on a battery?",
      answer:
        "FNIRSI doesn't list a battery for the 1014D; it runs from a 5 V adapter, which is included. The 1013D Plus has a 6000 mAh battery that FNIRSI rates at about four hours, charges over USB-C and can keep working while it charges.",
    },
    {
      question: "Are the FNIRSI 1013D Plus and 1014D equally fast?",
      answer:
        "On paper, yes. FNIRSI rates both at 100 MHz with a 10X probe, 1 GSa/s maximum and rise time under 3 ns. It notes the 1013D falls to 5 MHz with the probe on 1X. It doesn't state either model's sample rate per channel with both channels running.",
    },
    {
      question: "Do both FNIRSI scopes come with a 100X high-voltage probe?",
      answer:
        "On Amazon, yes. The 1014D kit includes two 1X/10X probes plus a P4100 100X probe, and the 1013D Plus is the 1013D sold with the P4100. A 100X probe extends the displayed voltage range but does not make it safe to clip a ground lead onto mains.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "Hantek DSO2D15 vs FNIRSI 1014D", href: "/oscilloscopes/hantek-dso2d15-vs-fnirsi-1014d" },
    { label: "FNIRSI 2C53T vs FNIRSI 1014D", href: "/oscilloscopes/fnirsi-2c53t-vs-fnirsi-1014d" },
    { label: "Hantek DSO2C10 vs FNIRSI 1014D", href: "/oscilloscopes/hantek-dso2c10-vs-fnirsi-1014d" },
    { label: "FNIRSI 1014D vs FNIRSI DSO-TC3", href: "/oscilloscopes/fnirsi-1014d-vs-fnirsi-dso-tc3" },
    { label: "Rigol DHO804 vs FNIRSI 1014D", href: "/oscilloscopes/rigol-dho804-vs-fnirsi-1014d" },
    { label: "HANMATEK HO52 vs OWON HDS272S", href: "/oscilloscopes/hanmatek-ho52-vs-owon-hds272s" },
    { label: "HANMATEK DOS1102 vs Hantek DSO2C10", href: "/oscilloscopes/hanmatek-dos1102-vs-hantek-dso2c10" },
    { label: "Hantek 1008B vs Hantek 6022BE", href: "/oscilloscopes/hantek-1008b-vs-hantek-6022be" },
    { label: "MINIWARE DS213 vs FNIRSI DSO152", href: "/oscilloscopes/miniware-ds213-vs-fnirsi-dso152" },
    { label: "PicoScope 2204A vs Hantek 6022BE", href: "/oscilloscopes/picoscope-2204a-vs-hantek-6022be" },
    { label: "FNIRSI DSO-TC3 vs FNIRSI DSO152", href: "/oscilloscopes/fnirsi-dso-tc3-vs-fnirsi-dso152" },
    { label: "FNIRSI DSO152 vs Hantek 6022BE", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-6022be" },
    { label: "FNIRSI DSO152 vs Hantek DSO2D10", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-dso2d10" },
    { label: "FNIRSI DSO152 vs Siglent SDS1104X-E", href: "/oscilloscopes/fnirsi-dso152-vs-siglent-sds1104x-e" },
    { label: "Hantek 2D72 vs FNIRSI 2C53T", href: "/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t" },
    { label: "Hantek 6022BE vs Hantek DSO2D10", href: "/oscilloscopes/hantek-6022be-vs-hantek-dso2d10" },
    { label: "Hantek DSO2C10 vs Hantek DSO2D10", href: "/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d10" },
    { label: "Hantek DSO2D10 vs Siglent SDS1104X-E", href: "/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" },
    { label: "Hantek DSO5102P vs Rigol DHO804", href: "/oscilloscopes/hantek-dso5102p-vs-rigol-dho804" },
    { label: "OWON HDS2202S vs FNIRSI DSO152", href: "/oscilloscopes/owon-hds2202s-vs-fnirsi-dso152" },
    { label: "OWON VDS1022I vs Hantek 6022BE", href: "/oscilloscopes/owon-vds1022i-vs-hantek-6022be" },
    { label: "PicoScope 2204A vs Analog Discovery 3", href: "/oscilloscopes/picoscope-2204a-vs-digilent-analog-discovery-3" },
    { label: "PicoScope 2206B vs Hantek 6022BE", href: "/oscilloscopes/picoscope-2206b-vs-hantek-6022be" },
    { label: "Rigol DHO802 vs FNIRSI DSO152", href: "/oscilloscopes/rigol-dho802-vs-fnirsi-dso152" },
    { label: "Rigol DHO802 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho802-vs-hantek-dso2d10" },
    { label: "Rigol DHO802 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho802-vs-rigol-ds1054z" },
    { label: "Rigol DHO804 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho804-vs-hantek-dso2d10" },
    { label: "Rigol DHO804 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" },
    { label: "Rigol DHO804 vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e" },
    { label: "Rigol DHO804 vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1202x-e" },
    { label: "Rigol DHO914 vs Rigol DHO804", href: "/oscilloscopes/rigol-dho914-vs-rigol-dho804" },
    { label: "Rigol DHO914S vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho914s-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs FNIRSI DSO152", href: "/oscilloscopes/rigol-ds1054z-vs-fnirsi-dso152" },
    { label: "Rigol DS1054Z vs Hantek 6022BE", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-6022be" },
    { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs Hantek DSO5102P", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso5102p" },
    { label: "Rigol DS1054Z vs OWON SDS1102", href: "/oscilloscopes/rigol-ds1054z-vs-owon-sds1102" },
    { label: "Rigol DS1054Z vs OWON VDS1022I", href: "/oscilloscopes/rigol-ds1054z-vs-owon-vds1022i" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1202x-e" },
    { label: "Rigol DS1102Z-E vs Siglent SDS1102CML+", href: "/oscilloscopes/rigol-ds1102z-e-vs-siglent-sds1102cml-plus" },
    { label: "Rigol DS1104Z-S Plus vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1104z-s-plus-vs-siglent-sds1104x-e" },
    { label: "Siglent SDS1104X-E vs Hantek DSO5102P", href: "/oscilloscopes/siglent-sds1104x-e-vs-hantek-dso5102p" },
    { label: "Siglent SDS1104X-E vs Rigol DHO802", href: "/oscilloscopes/siglent-sds1104x-e-vs-rigol-dho802" },
    { label: "Siglent SDS1104X-E vs SDS1202X-E", href: "/oscilloscopes/siglent-sds1104x-e-vs-siglent-sds1202x-e" },
    { label: "Siglent SDS1202X-E vs Hantek DSO2D10", href: "/oscilloscopes/siglent-sds1202x-e-vs-hantek-dso2d10" },
  ],
};

export default function Fnirsi1013dPlusVsFnirsi1014dPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
