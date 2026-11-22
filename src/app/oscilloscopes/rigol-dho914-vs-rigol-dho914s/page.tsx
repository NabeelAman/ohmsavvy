import Link from "@/components/AppLink";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Shared DHO914 / DHO914S scope specs (125MHz, 12-bit, 1.25 GSa/s on one channel / 312.5 MSa/s on four,
// 50 Mpts on one channel down to 10 Mpts on three or four, 7-inch 1024x600 multi-touch display, HDMI/LAN,
// standard parallel/UART/I2C/SPI/CAN/LIN decoding, USB-C 15V power, 16 digital channels via the separately
// sold PLA2216 logic probe) per Rigol's DHO900 datasheet, as already cited in this site's best-beginner
// picks for both models (src/app/oscilloscopes/best-beginner-oscilloscopes/page.tsx).
// DHO914S-only: a single-channel 25 MHz arbitrary/function generator (sine to 25 MHz, square/pulse to
// 15 MHz, ramp to 150 kHz, arbitrary waveforms to 10 MHz at 156 MSa/s and 14-bit) and a Bode-plot function
// that sweeps that generator against channels 1/2 to plot a circuit's frequency response — same source.
// Prices and stock, and the PLA2216's own price, per rigolna.com/products/digital-oscilloscopes/dho900/
// (checked 2026-11-19): DHO914 $659.00, listed "In Stock"; DHO914S $769.00, listed "Ships in 8 weeks" for
// direct Rigol orders (separate from this site's own Amazon in-stock checks on both ASINs, dated
// 2026-10-24 in the picks file); PLA2216 Logic Probe $399.00. The same page states "The DHO900S is
// equipped with the Bode diagram loop analysis function," confirming Bode plot is tied to the S-series
// generator, not a separate add-on. Generator waveform types (Sine, Square, Ramp, DC, Noise, Arb) and the
// Bode-plot sweep method (the built-in generator drives the circuit under test; the scope reads the
// response) per a RIGOL DHO924S user manual excerpt indexed by manualslib.com (checked 2026-11-19),
// which covers the same DHO900S generator and Bode-plot chapter as the DHO914S.
// Weight: the DHO914 entry in this site's own picks file states 1.78 kg, per Rigol's datasheet. Rigol's
// own pages don't give a DHO914S figure; a third-party review (onesdr.com, "rigol-dho914s-vs-dho924s",
// checked 2026-11-19) estimates "about 3.5 kg" for the DHO914S, roughly double the DHO914's sourced
// weight — we flag that gap rather than present it as a confirmed fact.

const path = "/oscilloscopes/rigol-dho914-vs-rigol-dho914s";
const dho914 = picks.find((p) => p.name === "Rigol DHO914")!;
const dho914s = picks.find((p) => p.name === "Rigol DHO914S")!;

export const metadata = buildMetadata({
  title: "Rigol DHO914 vs DHO914S: Is the Generator Worth It?",
  description:
    "Rigol DHO914 vs DHO914S: the same 125MHz, 12-bit, four-channel scope, with or without a built-in 25MHz generator and Bode plot. Specs and a buying table.",
  path: "/oscilloscopes/rigol-dho914-vs-rigol-dho914s",
  image: dho914s.image,
});

const link = "text-accent hover:underline";

/** The practical trade-off: a self-contained swept-frequency test on the S model against a two-box setup on the plain DHO914. */
function BodeHookupDiagram() {
  return (
    <svg
      viewBox="0 0 440 230"
      className="w-full h-auto"
      role="img"
      aria-label="Top: the Rigol DHO914S drives its internal generator output into a filter or power supply under test, with channel 1 reading the input and channel 2 reading the output, so one box produces a swept frequency-response plot. Bottom: the Rigol DHO914 has no generator output, so the same test needs a second instrument, an external signal generator, wired to the same filter, with the DHO914 only reading channels 1 and 2 and no automated Bode-plot sweep."
    >
      <text x="8" y="16" fontSize="10" fontWeight="700" className="fill-foreground">One box: Rigol DHO914S running a Bode plot</text>
      <rect x="10" y="26" width="110" height="78" rx="8" className="fill-surface stroke-foreground" strokeWidth="1.4" />
      <text x="65" y="40" fontSize="8.5" fontWeight="700" textAnchor="middle" className="fill-foreground">DHO914S</text>
      <text x="18" y="56" fontSize="8" className="fill-foreground">GEN OUT</text>
      <circle cx="118" cy="53" r="2.6" className="fill-accent" />
      <text x="18" y="74" fontSize="8" className="fill-foreground">CH1</text>
      <circle cx="118" cy="71" r="2.6" className="fill-foreground" />
      <text x="18" y="92" fontSize="8" className="fill-foreground">CH2</text>
      <circle cx="118" cy="89" r="2.6" className="fill-foreground" />
      <rect x="195" y="30" width="80" height="60" rx="6" className="fill-surface stroke-accent" strokeWidth="1.4" />
      <text x="235" y="54" fontSize="8.5" textAnchor="middle" className="fill-foreground">Filter or</text>
      <text x="235" y="66" fontSize="8.5" textAnchor="middle" className="fill-foreground">power supply</text>
      <path d="M118 53 H160 V48 H195" className="stroke-accent fill-none" strokeWidth="1.5" />
      <path d="M118 71 H150 V48" className="stroke-foreground fill-none" strokeWidth="1.2" />
      <circle cx="150" cy="48" r="2.4" className="fill-foreground" />
      <path d="M118 89 H305 V72 H275" className="stroke-foreground fill-none" strokeWidth="1.2" />
      <circle cx="275" cy="72" r="2.4" className="fill-foreground" />
      <rect x="305" y="36" width="110" height="48" rx="6" className="fill-accent/10 stroke-border" strokeWidth="1" />
      <path d="M312 60 q6 -14 12 0 t12 0 t12 0 t12 0 t12 0 t12 0" className="fill-none stroke-accent" strokeWidth="1.3" />
      <text x="360" y="94" fontSize="8" textAnchor="middle" className="fill-muted">Bode plot: gain and phase vs. swept frequency</text>

      <line x1="0" y1="115" x2="440" y2="115" className="stroke-border" strokeWidth="1" strokeDasharray="3 3" />

      <text x="8" y="131" fontSize="10" fontWeight="700" className="fill-foreground">Two boxes: Rigol DHO914 — no generator output</text>
      <rect x="10" y="141" width="110" height="60" rx="8" className="fill-surface stroke-foreground" strokeWidth="1.4" />
      <text x="65" y="155" fontSize="8.5" fontWeight="700" textAnchor="middle" className="fill-foreground">DHO914</text>
      <text x="18" y="173" fontSize="8" className="fill-foreground">CH1</text>
      <circle cx="118" cy="170" r="2.6" className="fill-foreground" />
      <text x="18" y="191" fontSize="8" className="fill-foreground">CH2</text>
      <circle cx="118" cy="188" r="2.6" className="fill-foreground" />
      <rect x="150" y="144" width="80" height="54" rx="6" className="fill-surface stroke-accent" strokeWidth="1.4" />
      <text x="190" y="166" fontSize="8.5" textAnchor="middle" className="fill-foreground">Filter or</text>
      <text x="190" y="178" fontSize="8.5" textAnchor="middle" className="fill-foreground">power supply</text>
      <rect x="265" y="150" width="95" height="42" rx="6" className="fill-accent/10 stroke-border" strokeWidth="1" />
      <text x="312" y="168" fontSize="8" textAnchor="middle" className="fill-foreground">External</text>
      <text x="312" y="180" fontSize="8" textAnchor="middle" className="fill-foreground">signal generator</text>
      <path d="M265 171 H230 V156" className="stroke-foreground fill-none" strokeWidth="1.2" />
      <path d="M118 170 H150 V156" className="stroke-foreground fill-none" strokeWidth="1.2" />
      <circle cx="150" cy="156" r="2.4" className="fill-foreground" />
      <path d="M118 188 H230 V182" className="stroke-foreground fill-none" strokeWidth="1.2" />
      <circle cx="230" cy="182" r="2.4" className="fill-foreground" />
      <text x="190" y="218" fontSize="8" textAnchor="middle" className="fill-muted">No internal generator → no built-in Bode-plot sweep, even wired up this way</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Rigol DHO914 vs Rigol DHO914S",
  path,
  published: "2026-11-19",
  intro:
    "Rigol DHO914 vs DHO914S is a one-feature decision: both are the same 125MHz, 12-bit, four-channel scope from Rigol's DHO900 series, with the same 1.25 GSa/s sample rate, 50 Mpts of memory and 7-inch touchscreen. The DHO914S adds a single-channel, 25MHz arbitrary/function generator and the Bode-plot sweep that runs on it, for $110 more at Rigol's own direct-sale price. Everything else — bandwidth, channels, memory, screen, optional 16-channel logic probe — is identical.",
  a: {
    pick: dho914,
    imageAlt: "Rigol DHO914 four-channel 125MHz oscilloscope",
    chooseIf: [
      "You already own a bench signal generator and don't need a second one built in",
      "You want the cheapest path into Rigol's 12-bit DHO900 platform",
      "You're adding the PLA2216 logic probe and want the lowest total price with it",
      "You don't run swept frequency-response tests on filters, amps or power supplies",
    ],
  },
  b: {
    pick: dho914s,
    imageAlt: "Rigol DHO914S four-channel 125MHz oscilloscope with built-in signal generator",
    chooseIf: [
      "You want a signal source in the same box, even a modest single-channel one",
      "You test filters, amplifiers or switching power-supply loops and want the built-in Bode-plot sweep",
      "You'd rather pay $110 once than buy or carry a separate bench generator",
      "You're setting up a single-instrument bench and don't need a second channel on the generator",
    ],
  },
  extraSpecs: [
    { label: "Built-in generator", a: "None", b: "1 channel, 25MHz AFG (Sine, Square, Ramp, DC, Noise, Arb)" },
    { label: "Generator frequency by waveform", a: "—", b: "Sine 25MHz, Square/Pulse 15MHz, Ramp 150kHz, Arbitrary 10MHz at 156 MSa/s, 14-bit" },
    { label: "Bode plot (swept frequency response)", a: "Not available", b: "Built in — sweeps the internal generator while reading channels 1/2" },
    { label: "Price (rigolna.com, direct)", a: "$659.00 — \"In Stock\"", b: "$769.00 — \"Ships in 8 weeks\" direct from Rigol" },
    { label: "Bandwidth", a: "125MHz", b: "125MHz" },
    { label: "Sample rate", a: "1.25 GSa/s (1 ch); 312.5 MSa/s (4 ch)", b: "1.25 GSa/s (1 ch); 312.5 MSa/s (4 ch)" },
    { label: "Memory", a: "50 Mpts (1 ch) down to 10 Mpts (3–4 ch)", b: "50 Mpts (1 ch) down to 10 Mpts (3–4 ch)" },
    { label: "Digital channels", a: "16, via PLA2216 probe ($399, sold separately)", b: "16, via PLA2216 probe ($399, sold separately)" },
    { label: "Display", a: "7-inch 1024 × 600 multi-touch", b: "7-inch 1024 × 600 multi-touch" },
    { label: "Weight", a: "1.78 kg (per Rigol's datasheet)", b: "Not stated by Rigol; a third-party review estimates ~3.5 kg" },
  ],
  differences: [
    "The only functional difference is the generator: the DHO914S adds a single-channel, 25MHz arbitrary/function generator that the plain DHO914 doesn't have at all.",
    "Bode plot rides on that generator. Rigol's own page states the Bode-plot feature belongs to the \"S\" models, so it isn't something you can unlock on the DHO914 by wiring in an external generator — the automated sweep-and-plot needs the internal AFG.",
    "Price: $659 for the DHO914 against $769 for the DHO914S at Rigol's own direct-sale price, a $110 premium for the generator and Bode plot.",
    "Every other published figure is identical: 125MHz bandwidth, 1.25 GSa/s / 312.5 MSa/s sample rate, up to 50 Mpts memory, the same 7-inch 1024×600 touchscreen, HDMI, LAN, standard serial decoding and the same optional $399 PLA2216 16-channel logic probe.",
    "Stock status differs at Rigol's own store at the time of this check: the DHO914 shows \"In Stock,\" the DHO914S shows \"Ships in 8 weeks\" for a direct order — a Rigol-direct lead time, separate from either model's own Amazon listing.",
    "Weight is the one spec we can't confirm cleanly: this site's own DHO914 entry gives 1.78 kg from Rigol's datasheet, but Rigol doesn't publish a DHO914S figure, and the only number we found (about 3.5 kg, from a third-party review) is roughly double and unconfirmed by Rigol — so don't treat it as settled.",
    "Neither carries our Hands-on Tested badge; both assessments come from Rigol's own datasheet and product page plus one third-party review, not from buying and running either unit ourselves.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">What $110 actually buys</h2>
        <p className="text-muted leading-7 mb-4">
          Because the scope side is identical, the only numbers worth charting are the generator itself, the sticker
          price, and what the two scopes cost once you add the logic probe that turns either one into a mixed-signal
          instrument.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Built-in sine generator frequency. The plain DHO914 has none; the DHO914S tops out at 25MHz.</>}>
            <BarChart
              items={[
                { label: "Rigol DHO914S", value: 25, display: "25 MHz", highlight: true },
                { label: "Rigol DHO914", value: 0, display: "None" },
              ]}
            />
          </Figure>
          <Figure caption={<>Price at Rigol&apos;s own direct-sale store, checked 2026-11-19. The DHO914S costs $110 more.</>}>
            <BarChart
              items={[
                { label: "Rigol DHO914", value: 659, display: "$659", highlight: true },
                { label: "Rigol DHO914S", value: 769, display: "$769" },
              ]}
            />
          </Figure>
        </div>
        <Figure caption={<>Total price with the optional $399 PLA2216 logic probe added to each scope. The gap stays exactly $110.</>}>
          <BarChart
            items={[
              { label: "DHO914 + PLA2216", value: 1058, display: "$1,058", highlight: true },
              { label: "DHO914S + PLA2216", value: 1168, display: "$1,168" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The generator isn&apos;t a serious bench AWG — single channel, 25MHz sine at best, and 10MHz for arbitrary
          waveforms at 156 MSa/s — but it&apos;s enough to drive a filter, feed a reference clock, or run the scope&apos;s own
          Bode-plot sweep without a second instrument on the bench. If you&apos;re also weighing bandwidth against sample
          rate on either model, our{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            oscilloscope bandwidth
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>{" "}
          explainers cover the scope side, which is where these two are the same.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Pick", "One-line reason"]}
          rows={[
            ["Testing a switching power supply's control-loop response", "Rigol DHO914S", "Bode plot sweeps the loop and reads both channels in one setup"],
            ["Buying your first 12-bit, four-channel scope on the tightest budget", "Rigol DHO914", "$110 cheaper at rigolna.com for an identical scope"],
            ["Already own a bench signal generator or AWG", "Rigol DHO914", "The DHO914S's generator duplicates what you already have"],
            ["Checking a filter's gain and phase across a frequency sweep", "Rigol DHO914S", "One box drives the sweep; no separate generator to cable in"],
            ["Adding the PLA2216 logic probe for mixed-signal debugging", "Rigol DHO914", "$1,058 total against $1,168 for the same 16 digital channels on the S model"],
            ["Wants a quick reference clock or test tone on the bench", "Rigol DHO914S", "Sine to 25MHz or square to 15MHz from the scope's own GEN OUT port"],
            ["Stock matters right now and ordering direct from Rigol", "Rigol DHO914", "Listed \"In Stock\" at rigolna.com, against an 8-week ship time for the DHO914S at the same store"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t do</h2>
        <h3 className="text-lg font-semibold mb-2">Rigol DHO914: a complete 12-bit scope, nothing to generate signals with</h3>
        <p className="text-muted leading-7 mb-4">
          On the capture side the DHO914 does everything the DHO914S does: four 12-bit channels at 125MHz, up to
          1.25 GSa/s, 50 Mpts of memory on one channel, standard UART/I2C/SPI/CAN/LIN decoding, and 16 digital channels
          if you add the PLA2216 probe. What it can&apos;t do is produce a signal of its own. There&apos;s no GEN OUT port,
          no arbitrary waveform output and no Bode-plot menu — if you need to drive a circuit under test, that has to
          come from something else on the bench.
        </p>
        <h3 className="text-lg font-semibold mb-2">Rigol DHO914S: the same capture, plus a modest signal source</h3>
        <p className="text-muted leading-7 mb-4">
          The DHO914S&apos;s generator is useful but limited: one channel, sine to 25MHz, square/pulse to 15MHz, ramp to
          150kHz, and arbitrary waveforms to 10MHz at 156 MSa/s and 14-bit vertical resolution. It won&apos;t replace a
          dedicated multi-channel AWG for serious signal work, but it&apos;s enough to feed a test tone into an amplifier,
          clock a digital input, or — paired with the scope&apos;s own channels — run the built-in Bode-plot sweep against a
          filter or a switching supply&apos;s feedback loop, which is the one job the DHO914 genuinely can&apos;t do at all, with
          or without an outside generator wired in.
        </p>
        <Figure
          caption={
            <>
              A swept frequency-response test on each scope. The DHO914S does it with one box; the DHO914 needs a
              second instrument, and Rigol ties the automated Bode-plot sweep to the internal generator, not just to
              having a signal source present.
            </>
          }
        >
          <BodeHookupDiagram />
        </Figure>
        <div className="mt-4">
          <KeyIdea title="The generator is a convenience, not a lab AWG">
            25MHz sine and a single channel put the DHO914S&apos;s generator well below a dedicated bench AWG. Treat it as
            a built-in test-tone and sweep source that saves a cable and a second box for light duty — reference
            clocks, filter checks, quick continuity-style signal injection — not as a replacement for a real signal
            generator if your work depends on one.
          </KeyIdea>
        </div>
        <div className="mt-4">
          <Callout title="The PLA2216 probe costs more than the price gap between the two scopes">
            Rigol&apos;s PLA2216 16-channel logic probe is $399 at rigolna.com — more than three times the $110 difference
            between the DHO914 and DHO914S. If logic channels are the real goal, that purchase dwarfs whichever scope
            you start from; the generator decision is the smaller one.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The trust question</h2>
        <p className="text-muted leading-7 mb-4">
          Neither the DHO914 nor the DHO914S carries our Hands-on Tested badge. Every figure above comes from Rigol&apos;s
          own DHO900 datasheet and direct-sale product page, plus one third-party review for the weight estimate we
          flagged above — not from buying and running either unit ourselves. The scope-side specs (bandwidth, sample
          rate, memory, display) are the same figures already verified for each model&apos;s entry in our{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            beginner oscilloscope picks
          </Link>
          ; the generator, Bode-plot and pricing details here are new research for this comparison, dated 2026-11-19.
        </p>
        <p className="text-muted leading-7">
          For how the DHO914S compares against the step-up DHO924S, see{" "}
          <Link href="/oscilloscopes/rigol-dho914s-vs-rigol-dho924s" className={link}>
            Rigol DHO914S vs DHO924S
          </Link>
          , or against a Siglent rival in{" "}
          <Link href="/oscilloscopes/rigol-dho914s-vs-siglent-sds1104x-e" className={link}>
            Rigol DHO914S vs Siglent SDS1104X-E
          </Link>
          . For how the plain DHO914 stacks up against Rigol&apos;s other DHO800-series scopes, see{" "}
          <Link href="/oscilloscopes/rigol-dho914-vs-rigol-dho804" className={link}>
            Rigol DHO914 vs DHO804
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/rigol-dho814-vs-rigol-dho914" className={link}>
            Rigol DHO814 vs DHO914
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "The Rigol DHO914 and DHO914S are the same 125MHz, 12-bit, four-channel scope. Buy the DHO914S if you want a single-channel 25MHz generator and the built-in Bode-plot sweep for $110 more at Rigol's own price; buy the plain DHO914 if you already have a signal source or don't run swept frequency-response tests, and save that $110 — a gap that stays $110 even after adding the optional PLA2216 logic probe to either one.",
  chooseNeitherIf:
    "16 digital channels matter more to you than the generator debate: the PLA2216 probe adds $399 to either scope, more than three times the $110 gap between them, so if mixed-signal debugging is the real goal, price that logic probe first and treat the DHO914-vs-DHO914S choice as the smaller decision.",
  faqs: [
    {
      question: "What's the actual difference between the Rigol DHO914 and DHO914S?",
      answer:
        "One thing: a built-in signal generator. The DHO914S adds a single-channel, 25MHz arbitrary/function generator and the Bode-plot sweep that runs on it. Bandwidth, sample rate, memory, the touchscreen and the optional 16-channel logic probe are identical on both, per Rigol's own DHO900 datasheet.",
    },
    {
      question: "Is the DHO914S's built-in generator good enough to replace a dedicated signal generator?",
      answer:
        "For light duty, yes; for serious signal work, no. It's a single channel maxing out at 25MHz sine, 15MHz square/pulse, 150kHz ramp, or 10MHz arbitrary waveforms at 156 MSa/s and 14-bit. That covers test tones, reference clocks and driving a filter for a quick sweep, but it won't match a dedicated bench AWG's channel count, frequency range or modulation options.",
    },
    {
      question: "Can the Rigol DHO914 run a Bode plot if I wire up an external generator?",
      answer:
        "Not the automated version. Rigol's own product page states the Bode-plot feature belongs to the \"S\" models, meaning the sweep-and-plot function is tied to the internal generator rather than simply needing any signal source present. On the plain DHO914 you'd have to sweep an external generator manually and read gain and phase off the screen yourself.",
    },
    {
      question: "Does the extra $110 for the DHO914S buy anything besides the generator?",
      answer:
        "Not based on Rigol's published specs. Bandwidth, sample rate, memory depth, the 7-inch 1024×600 touchscreen, decoding protocols and the optional PLA2216 logic probe are the same figures on both models. The $110 premium is specifically for the generator and the Bode-plot feature it enables.",
    },
    {
      question: "Which one should I buy if I might add the PLA2216 logic probe later?",
      answer:
        "The PLA2216 is $399 on either scope, so the $110 gap between the DHO914 and DHO914S doesn't change once you add it: $1,058 total for the DHO914, $1,168 for the DHO914S. Decide on the generator and Bode plot on their own merits — the logic probe's cost is the same either way.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Rigol DHO914 vs Rigol DHO804", href: "/oscilloscopes/rigol-dho914-vs-rigol-dho804" },
    { label: "Rigol DHO814 vs Rigol DHO914", href: "/oscilloscopes/rigol-dho814-vs-rigol-dho914" },
    { label: "Rigol DHO914S vs Rigol DHO924S", href: "/oscilloscopes/rigol-dho914s-vs-rigol-dho924s" },
    { label: "Rigol DHO914S vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho914s-vs-siglent-sds1104x-e" },
    { label: "Rigol DHO924S vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-dho924s-vs-siglent-sds1202x-e" },
    { label: "Rigol DS1104Z-S Plus vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1104z-s-plus-vs-siglent-sds1104x-e" },
    { label: "Rigol DHO804 vs Rigol DHO802", href: "/oscilloscopes/rigol-dho804-vs-rigol-dho802" },
    { label: "Rigol DHO804 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" },
    { label: "Siglent SDS1104X-U vs Rigol DS1104Z-S Plus", href: "/oscilloscopes/siglent-sds1104x-u-vs-rigol-ds1104z-s-plus" },
    { label: "Siglent SDS814X HD vs Rigol DHO924S", href: "/oscilloscopes/siglent-sds814x-hd-vs-rigol-dho924s" },
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
  ],
};

export default function RigolDho914VsRigolDho914sPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
