import Link from "@/components/AppLink";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  KeyIdea,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-soldering-irons/page";

const description =
  "How to solder an SMD LED on a PCB: find the cathode mark, tin one pad, tack the LED with tweezers, solder the other side and test it in diode mode.";

export const metadata = buildMetadata({
  title: "How to Solder an SMD LED on a PCB",
  description,
  path: "/soldering-irons/how-to-solder-an-smd-led-on-a-pcb",
});

const hakko = picks.find((p) => p.name === "Hakko FX-888DX")!;
const yihua = picks.find((p) => p.name === "YIHUA 862BD+")!;
const pinecil = picks.find((p) => p.name === "Pinecil V2")!;

const link = "text-accent hover:underline";

/** Top view of a two-pad SMD LED footprint with the cathode mark, and the tin, tack, solder sequence. */
function SmdLedFootprintDiagram() {
  return (
    <svg
      viewBox="0 0 360 210"
      className="w-full h-auto"
      role="img"
      aria-label="Top view of soldering a two-pad SMD LED. Left: the bare footprint with two copper pads, the cathode pad marked on the silkscreen with a line or K. Step one: a small blob of solder is added to one pad only. Middle: the LED is held in place with tweezers by its sides, not its lens, while the pre-tinned pad is reheated to tack it, with the LED's cathode mark lined up with the board's cathode mark. Right: the second pad is soldered with a small fillet, then the first pad is touched again to reflow it."
    >
      {/* panel 1 */}
      <text x="60" y="20" textAnchor="middle" fontSize="10" fontWeight="700" className="fill-foreground">1. Tin one pad</text>
      <rect x="22" y="70" width="28" height="40" rx="3" className="fill-accent" opacity="0.6" />
      <rect x="70" y="70" width="28" height="40" rx="3" className="fill-accent" opacity="0.6" />
      <ellipse cx="36" cy="90" rx="10" ry="12" className="fill-muted" opacity="0.8" />
      <line x1="16" y1="64" x2="16" y2="116" className="stroke-foreground" strokeWidth="2" />
      <text x="36" y="130" textAnchor="middle" fontSize="9" className="fill-muted">K (cathode)</text>
      <text x="84" y="130" textAnchor="middle" fontSize="9" className="fill-muted">A</text>
      {/* panel 2 */}
      <text x="180" y="20" textAnchor="middle" fontSize="10" fontWeight="700" className="fill-foreground">2. Tack with tweezers</text>
      <rect x="142" y="70" width="28" height="40" rx="3" className="fill-accent" opacity="0.6" />
      <rect x="190" y="70" width="28" height="40" rx="3" className="fill-accent" opacity="0.6" />
      <rect x="150" y="76" width="60" height="28" rx="3" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <circle cx="180" cy="90" r="8" className="fill-accent" opacity="0.25" />
      <rect x="152" y="78" width="6" height="24" className="fill-foreground" opacity="0.7" />
      <path d="M180 30 L172 72 M180 30 L188 72" className="stroke-foreground" strokeWidth="2" fill="none" />
      <text x="180" y="130" textAnchor="middle" fontSize="9" className="fill-muted">hold the body, not the lens</text>
      {/* panel 3 */}
      <text x="300" y="20" textAnchor="middle" fontSize="10" fontWeight="700" className="fill-foreground">3. Solder the other side</text>
      <rect x="262" y="70" width="28" height="40" rx="3" className="fill-accent" opacity="0.6" />
      <rect x="310" y="70" width="28" height="40" rx="3" className="fill-accent" opacity="0.6" />
      <rect x="270" y="76" width="60" height="28" rx="3" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <circle cx="300" cy="90" r="8" className="fill-accent" opacity="0.25" />
      <path d="M330 80 L338 74 L338 106 L330 100 Z" className="fill-muted" opacity="0.8" />
      <path d="M270 80 L262 74 L262 106 L270 100 Z" className="fill-muted" opacity="0.8" />
      <text x="300" y="130" textAnchor="middle" fontSize="9" className="fill-muted">small fillet both ends</text>
      <text x="180" y="170" textAnchor="middle" fontSize="10" className="fill-foreground">Match the LED&apos;s cathode mark to the board&apos;s K or line mark</text>
      <text x="180" y="190" textAnchor="middle" fontSize="9" className="fill-muted">Keep each touch short: plastic and silicone lenses are heat sensitive</text>
    </svg>
  );
}

export default function HowToSolderAnSmdLedOnAPcbPage() {
  return (
    <HowToShell
      title="How to Solder an SMD LED on a PCB"
      description={description}
      published="2026-11-18"
      path="/soldering-irons/how-to-solder-an-smd-led-on-a-pcb"
      category="soldering-irons"
      intro={
        <>
          To solder an SMD LED on a PCB, find the cathode mark on both the LED and the board, put a small blob of
          solder on one pad, hold the LED in place with tweezers and reheat that pad to tack it, then solder the other
          pad and briefly reflow the first. Keep every touch to a few seconds, because the plastic body and lens are
          the most heat-sensitive part of the job. This guide covers reading polarity marks on common packages,
          iron and hot air settings, the tack technique, LEDs with a center thermal pad, and how to test the result
          with a multimeter.
        </>
      }
      aside={{
        image: hakko.image,
        alt: "Hakko FX-888DX soldering station with digital display",
        caption: (
          <>
            A temperature-controlled station such as the Hakko FX-888DX keeps SMD LED joints quick and repeatable. See
            our{" "}
            <Link href="/soldering-irons/weller-we1010-vs-hakko-fx-888dx" className={link}>
              Weller WE1010 vs Hakko FX-888DX comparison
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "packages", label: "SMD LED packages and marks" },
        { id: "problems", label: "Problems and fixes" },
        { id: "polarity", label: "1. Confirm polarity" },
        { id: "setup", label: "2. Set up iron and flux" },
        { id: "tin", label: "3. Tin one pad" },
        { id: "tack", label: "4. Tack the LED" },
        { id: "second-pad", label: "5. Solder the second pad" },
        { id: "test", label: "6. Test the LED" },
        { id: "thermal-pad", label: "LEDs with a thermal pad" },
        { id: "tools", label: "Tools to use" },
      ]}
      faq={[
        {
          q: "Which side of an SMD LED is negative?",
          a: "It depends on the maker, so check the datasheet. Common marks are a green line or dot on top, a notched or cut corner, or a T, triangle or arrow on the underside, where the bar or point usually marks the cathode. On the board, the cathode pad is often marked with a line, a K or a filled corner. If in doubt, a multimeter in diode mode settles it in seconds.",
        },
        {
          q: "Can you solder SMD LEDs with a regular soldering iron?",
          a: "Yes. Two-pad packages such as 0603, 0805, 1206 and 3528 solder well with a temperature-controlled iron, a fine tip, flux and tweezers. LEDs with a large center thermal pad underneath, common on high-power LEDs, need hot air, a hotplate or reflow, because the iron can't reach the pad that carries most of the heat away.",
        },
        {
          q: "How hot can an SMD LED get when soldering?",
          a: "Check the datasheet's soldering section. Many LED datasheets give a hand-soldering limit in the region of 300 to 350 °C for about three seconds per terminal, often once only, and a reflow profile peaking near 260 °C. Exceeding those can discolor the lens, crack the package or damage the bond wires, so keep the iron moving and each touch short.",
        },
        {
          q: "Why doesn't my SMD LED light after soldering?",
          a: "The most common causes are reversed polarity, a dry joint on one pad, a solder bridge across the two pads, or heat damage. Test in diode mode across the LED on the board: no reading both ways suggests an open joint or dead LED, a reading near zero suggests a bridge. Also check the current-limiting resistor and that the circuit is actually driving the LED.",
        },
        {
          q: "Should I use hot air for SMD LEDs?",
          a: "Hot air is useful for removing LEDs and for parts with thermal pads, but it must be gentle. Use a low airflow so the tiny part doesn't blow away, keep the nozzle moving, and heat the board around the LED rather than blasting the lens. Silicone-lens LEDs, common in 5050 strips, are easy to damage with too much heat or with tweezers pressing on top.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-check-led-polarity-with-a-multimeter",
          title: "How to Check LED Polarity With a Multimeter",
          desc: "Diode mode readings and why blue and white LEDs may not glow.",
        },
        {
          href: "/soldering-irons/how-to-solder-a-small-surface-mount-diode-by-hand",
          title: "How to Solder a Small Surface-Mount Diode by Hand",
          desc: "The same polarity-first approach for SMD diodes.",
        },
      ]}
    >
      <Callout title="Heat, small parts and fumes">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            The iron tip and hot air nozzle run at several hundred degrees, and the board stays hot after you lift the
            iron. Always use the stand, and don&apos;t touch the board right after reflow.
          </li>
          <li>
            Wear eye protection. Tweezers can launch tiny LEDs, and molten solder can spit when flux boils.
          </li>
          <li>
            Use a fume extractor or ventilation for flux smoke, and wash your hands after using leaded solder.
          </li>
          <li>
            Disconnect power before soldering. For LED strips and fixtures that run from mains drivers, unplug the
            driver and let it discharge; never solder on a powered strip.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="packages" className="text-xl font-semibold mb-3">SMD LED packages and polarity marks</h2>
        <p className="text-muted leading-7 mb-4">
          SMD LEDs come in chip packages named after their size, the same codes used for resistors and capacitors,
          and in larger plastic-leaded packages such as 3528 and 5050 used on LED strips. The name tells you the size
          of the job: an 0603 LED is 1.6 mm long and needs a fine tip and a steady hand, while a 5050 is 5 mm square
          and much easier to handle. The polarity mark varies by maker, so treat the table as a guide and confirm
          with the datasheet or a meter.
        </p>
        <DataTable
          head={["Package", "Size (L × W)", "Pads", "Common cathode mark"]}
          rows={[
            ["0603", "1.6 × 0.8 mm", "2", "Green line or T on underside"],
            ["0805", "2.0 × 1.25 mm", "2", "Green line or T on underside"],
            ["1206", "3.2 × 1.6 mm", "2", "Green line or T on underside"],
            ["3528 (PLCC-2)", "3.5 × 2.8 mm", "2", "Cut corner on top"],
            ["5050 (PLCC-6)", "5.0 × 5.0 mm", "6 (often 3 LEDs)", "Cut corner on top"],
          ]}
        />
        <Figure caption={<>Body length of common SMD LED packages (standard package dimensions). Smaller packages leave less room for the tip and for error.</>}>
          <BarChart
            items={[
              { label: "0603", value: 1.6, display: "1.6 mm", highlight: true },
              { label: "0805", value: 2.0, display: "2.0 mm" },
              { label: "1206", value: 3.2, display: "3.2 mm" },
              { label: "3528", value: 3.5, display: "3.5 mm" },
              { label: "5050", value: 5.0, display: "5.0 mm" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="problems" className="text-xl font-semibold mb-3">Problems and fixes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["LED doesn't light", "Reversed polarity", "Diode mode across the LED", "Remove and refit the right way round"],
            ["LED tombstones (stands on one end)", "One pad heated much longer than the other", "Visual", "Reflow and press down; equal solder on both pads"],
            ["Flickers when the board is tapped", "Dry joint on one pad", "Magnifier, wiggle test", "Reflow with fresh flux"],
            ["Dim or discolored lens", "Overheating during soldering", "Compare with a new LED", "Replace; shorter touches, lower heat"],
            ["Reads near 0 V in diode mode", "Solder bridge under the LED", "Diode mode both ways", "Wick the excess; refit"],
            ["LED blown off the board", "Hot air flow too high", "Part missing", "Lower airflow; hold the board, not the part"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="polarity">Confirm the polarity before you heat anything</StepHeading>
        <p className="text-muted leading-7">
          Find the cathode mark on the LED and the cathode pad on the board, often a line, a K, a bar on a diode
          symbol, or a filled corner on the silkscreen. If the marks are unclear, put the meter in diode mode and touch
          the probes to the LED&apos;s ends: when it shows a forward voltage (and red or green parts often glow
          faintly), the red probe is on the anode. Our guide to{" "}
          <Link href="/multimeters/how-to-check-led-polarity-with-a-multimeter" className={link}>
            checking LED polarity with a multimeter
          </Link>{" "}
          explains why blue and white LEDs may not light on some meters.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="setup">Set up the iron, flux and tweezers</StepHeading>
        <p className="text-muted leading-7">
          Use a fine conical or small chisel tip, a little flux on both pads, thin solder of 0.5 mm (0.020 in) or less,
          and fine tweezers. Many LED datasheets set a hand-soldering limit in the region of 300 to 350 °C for about
          three seconds per terminal; read yours and stay inside it. With leaded solder, which melts at 183 °C,
          that leaves plenty of margin; lead-free alloys around 217–220 °C need the iron near the top of that window.
          Clean the board first so solder wets quickly; a pad that takes ten seconds to wet will cook the LED.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="tin">Tin one pad only</StepHeading>
        <p className="text-muted leading-7">
          Touch the tip to one pad, usually the one easiest to reach for your hand, and add a small blob of solder,
          about the size of the pad. Leave the other pad bare. If you tin both, the LED rocks on two bumps and won&apos;t
          sit flat. Right-handed people usually find it easiest to pre-tin the right pad and hold the tweezers in the
          left hand.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="tack">Tack the LED in place</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Pick the LED up by its sides with the tweezers, never by the lens: silicone domes on many strip LEDs dent
          and tear easily. Line up its cathode mark with the board&apos;s, hold it against the board beside the tinned
          pad, then touch the iron to the solder blob and slide the LED into the melted solder until it sits flat and
          centered. Lift the iron and keep holding the LED for a second while the joint freezes. Check alignment now;
          one joint is easy to reheat and straighten.
        </p>
        <Figure caption={<>Tin one pad, tack the LED with tweezers holding its body, then solder the second pad.</>}>
          <SmdLedFootprintDiagram />
        </Figure>
      </section>

      <section>
        <StepHeading n={5} id="second-pad">Solder the second pad and reflow the first</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Touch the iron to the bare pad and the LED&apos;s terminal together and feed a little solder into the
          junction. You want a small, concave fillet up the end of the LED, not a ball. Then return to the first pad
          for a second with a touch of flux so its joint reflows cleanly; the tack joint is often slightly cold. If
          you have several LEDs in a row, tack them all first, check the alignment of the whole row, then finish the
          second pads. For more on tiny two-terminal parts, see{" "}
          <Link href="/soldering-irons/how-to-solder-surface-mount-resistors-without-hot-air" className={link}>
            soldering surface-mount resistors without hot air
          </Link>
          .
        </p>
        <Figure caption={<>Soldering an SMD LED, in order.</>}>
          <FlowDiagram
            steps={[
              { label: "Polarity", sub: "Match K marks" },
              { label: "Tin", sub: "One pad only" },
              { label: "Tack", sub: "Tweezers on body" },
              { label: "Second pad", sub: "Small fillet" },
              { label: "Reflow + test", sub: "Diode mode" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={6} id="test">Test the LED on the board</StepHeading>
        <p className="text-muted leading-7">
          With the board unpowered, put the meter in diode mode with red on the anode pad and black on the cathode pad.
          A healthy LED shows a forward voltage, and many glow faintly; reversed, it should read OL. A reading near 0 V
          both ways points to a bridge; OL both ways points to an open joint or a damaged LED, though some meters
          can&apos;t supply enough voltage for blue and white LEDs. Then power the circuit and confirm the LED lights at
          normal brightness. If it&apos;s dim, check the current-limiting resistor; see{" "}
          <Link href="/multimeters/how-to-test-a-current-limiting-resistor-with-a-multimeter" className={link}>
            how to test a current-limiting resistor
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="thermal-pad" className="text-xl font-semibold mb-3">LEDs with a center thermal pad</h2>
        <p className="text-muted leading-7 mb-4">
          High-power LEDs and many COB and 3030-style parts have a large pad under the body that conducts heat into the
          board. An iron can&apos;t reach it, so solder it with hot air, a hotplate or reflow. Apply a thin layer of
          solder paste to all pads, place the LED, and heat the board area from a little way off with low airflow
          until the paste turns shiny and the LED settles. On aluminum-core LED boards, a hotplate under the board
          works better than air from above, because the metal core pulls heat away so quickly.
        </p>
        <p className="text-muted leading-7">
          The same caution applies when removing a dead LED from a strip: heat the area, lift it gently once the solder
          melts, and clean the pads with wick before fitting a new one. For fine-pitch parts on the same board, see{" "}
          <Link href="/soldering-irons/how-to-solder-fine-pitch-smd-components" className={link}>
            how to solder fine-pitch SMD components
          </Link>
          , and for a strip that still won&apos;t light,{" "}
          <Link href="/multimeters/how-to-test-an-led-strip-with-a-multimeter" className={link}>
            how to test an LED strip with a multimeter
          </Link>
          .
        </p>
        <KeyIdea title="Polarity first, heat last">
          Most failed SMD LED jobs are either backwards or overheated. Confirm the cathode before the iron touches
          anything, tack one pad, check, then finish with short touches.
        </KeyIdea>
      </section>

      <section>
        <h2 id="tools" className="text-xl font-semibold mb-3">Tools for soldering SMD LEDs</h2>
        <p className="text-muted leading-7 mb-6">
          A temperature-controlled iron with a fine tip handles two-pad LEDs; hot air adds the ability to fit LEDs with
          thermal pads and to remove parts cleanly. See our{" "}
          <Link href="/soldering-irons/best-soldering-iron-for-circuit-board-repair" className={link}>
            best soldering iron for circuit board repair
          </Link>{" "}
          for more options.
        </p>
        <ProductStrip
          title="Irons and hot air for SMD LEDs"
          items={[
            {
              name: "Hakko FX-888DX",
              image: hakko.image,
              alt: "Hakko FX-888DX soldering station with digital display",
              href: "/soldering-irons/weller-we1010-vs-hakko-fx-888dx",
              note: "ESD-safe 100W station with closed-loop control and T18 tips; five presets hold separate settings for fine pins and ground pads.",
            },
            {
              name: "YIHUA 862BD+",
              image: yihua.image,
              alt: "YIHUA 862BD+ soldering iron and hot air rework station",
              href: "/soldering-irons/yihua-862bd-plus-review",
              note: "500W hot air adjustable from 100 to 480 °C plus a 75W iron, for LEDs with thermal pads and clean removal.",
            },
            {
              name: "Pinecil V2",
              image: pinecil.image,
              alt: "Pinecil V2 portable USB-C soldering iron",
              href: "/soldering-irons/pinecil-v2-review",
              note: "About 60W from 20V USB-C PD (up to 88W at 24V), ~12 second heat-up and an OLED display; built for portability and field repairs.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
