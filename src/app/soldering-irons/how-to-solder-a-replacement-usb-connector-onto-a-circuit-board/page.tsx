import Link from "next/link";
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
  "How to solder a replacement USB connector onto a circuit board: match the part, remove the old port, tack the shell, solder the pins and check for bridges.";

const path = "/soldering-irons/how-to-solder-a-replacement-usb-connector-onto-a-circuit-board";

export const metadata = buildMetadata({
  title: "How to Solder a Replacement USB Connector",
  description,
  path: "/soldering-irons/how-to-solder-a-replacement-usb-connector-onto-a-circuit-board",
});

const yihua = picks.find((p) => p.name === "YIHUA 862BD+")!;
const hakko = picks.find((p) => p.name === "Hakko FX-888DX")!;
const weller = picks.find((p) => p.name === "Weller WE1010NA")!;

const link = "text-accent hover:underline";

/** Top view of a surface-mount Micro-USB B footprint: five signal pads between two pairs of shell tabs. */
function MicroUsbFootprint() {
  const pins = ["VBUS", "D−", "D+", "ID", "GND"];
  return (
    <svg viewBox="0 0 340 210" className="w-full h-auto" role="img" aria-label="Micro-USB footprint with five signal pads and four shell anchor tabs">
      <rect x="20" y="20" width="300" height="150" rx="6" className="fill-surface stroke-border" strokeWidth="1.2" />
      <text x="170" y="38" fontSize="10" textAnchor="middle" className="fill-muted">board edge (plug side) ↑</text>
      {/* connector body outline */}
      <rect x="90" y="48" width="160" height="70" rx="4" className="fill-none stroke-foreground" strokeWidth="1.2" strokeDasharray="5 3" />
      {/* shell tabs */}
      {[
        [62, 58],
        [254, 58],
        [62, 96],
        [254, 96],
      ].map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="24" height="18" rx="2" className="fill-accent/40 stroke-accent" strokeWidth="1.2" />
      ))}
      {/* signal pads */}
      {pins.map((p, i) => (
        <g key={p}>
          <rect x={136 + i * 16} y="122" width="8" height="26" rx="1" className="fill-accent stroke-accent" />
          <text x={140 + i * 16} y="162" fontSize="8.5" textAnchor="middle" className="fill-foreground">{i + 1}</text>
        </g>
      ))}
      <text x="74" y="136" fontSize="9" textAnchor="middle" className="fill-accent">shell tabs</text>
      <text x="266" y="136" fontSize="9" textAnchor="middle" className="fill-accent">shell tabs</text>
      <text x="170" y="192" fontSize="9.5" textAnchor="middle" className="fill-muted">Pins 1–5 at 0.65 mm pitch: VBUS, D−, D+, ID, GND</text>
      <text x="170" y="205" fontSize="9" textAnchor="middle" className="fill-muted">Layout is illustrative; always match your board&apos;s actual footprint</text>
    </svg>
  );
}

export default function HowToSolderAReplacementUsbConnectorPage() {
  return (
    <HowToShell
      title="How to Solder a Replacement USB Connector Onto a Circuit Board"
      description={description}
      published="2026-10-22"
      path={path}
      category="soldering-irons"
      intro={
        <>
          To solder a replacement USB connector onto a circuit board, first buy a part with exactly the same
          footprint, then remove the old port with flux and plenty of heat, clean the pads flat, tack the
          metal shell tabs to hold the new connector square, and solder the tiny signal pins last. Finish with
          a careful look under magnification and a meter check that power and ground are not shorted. The
          steps below apply to Micro-USB and USB-C ports on phones, controllers, power banks and development
          boards.
        </>
      }
      aside={{
        image: yihua.image,
        alt: "YIHUA 862BD+ soldering iron and hot air rework station",
        caption: (
          <>
            A combined iron and hot-air station like the YIHUA 862BD+ makes connector removal far easier. See
            our{" "}
            <Link href="/soldering-irons/yihua-862bd-plus-review" className={link}>
              YIHUA 862BD+ review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "match-the-part", label: "Match the replacement part" },
        { id: "pin-sizes", label: "How small the pins are" },
        { id: "remove-the-old-port", label: "Remove the old connector" },
        { id: "prepare-the-pads", label: "Clean and prepare the pads" },
        { id: "tack-the-shell", label: "Align and tack the shell" },
        { id: "solder-the-pins", label: "Solder the signal pins" },
        { id: "inspect-and-test", label: "Inspect and test" },
        { id: "faults", label: "Common faults after replacement" },
        { id: "tools", label: "Tools for the job" },
      ]}
      faq={[
        {
          q: "Can I replace a USB port with just a soldering iron, without hot air?",
          a: "Often, yes. Shell tabs that pass through the board can be cleared one at a time with flux, fresh solder and desoldering braid, and some people use a low-melting-point removal alloy to keep all the joints liquid at once. Hot air makes the job quicker and gentler on the pads, especially for USB-C ports with many contacts.",
        },
        {
          q: "Do I need a 16-pin or 24-pin USB-C connector?",
          a: "Match whatever was fitted. Charge-only and USB 2.0 devices commonly use 16-pin parts, while boards that carry USB 3 data or video use full 24-pin connectors. The two footprints are not interchangeable, so compare the pad count and layout on your board, or the original part number, before ordering.",
        },
        {
          q: "Why does my phone still not charge after a new USB port?",
          a: "Check for a bridge between VBUS and GND first, then for a lifted pad or a signal pin not wetted to its pad. On USB-C, missing or bridged CC pin connections can stop a charger from supplying power at all. If everything checks out, the fault may be upstream, in the charging circuit rather than the connector.",
        },
        {
          q: "What causes USB ports to break off the board?",
          a: "Leverage. A cable pulled sideways puts the whole force on the shell tabs, and on surface-mount connectors only solder holds them down. Over time the joints crack or the pads lift. That is why fully soldering every shell tab, not just tacking them, is the most important step for a lasting repair.",
        },
        {
          q: "What temperature should I use to solder a USB connector?",
          a: "Use a moderate setting for the fine signal pins and turn it up for the shell tabs, which sit on larger copper areas and need more heat to flow properly. Our soldering iron temperature guide gives starting points by alloy, and adding leaded solder to old lead-free joints lowers the melting point during removal.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/soldering-iron-for-usb-port-repair",
          title: "Soldering Iron for USB Port Repair",
          desc: "Tips, temperature control and when hot air earns its place for connector work.",
        },
        {
          href: "/soldering-irons/how-to-solder-fine-pitch-smd-components",
          title: "How to Solder Fine-Pitch SMD Components",
          desc: "Tack, drag-solder and inspect: the technique behind the signal pins on modern ports.",
        },
      ]}
    >
      <Callout title="Before you open the device">
        <ul className="space-y-2 list-disc pl-5">
          <li>Disconnect the battery or power source before any soldering. Phones and power banks hold lithium cells.</li>
          <li>Shield nearby plastic parts, ribbon connectors and small components from hot air with heat-resistant tape.</li>
          <li>Use flux generously and work with ventilation: flux fumes are an irritant.</li>
          <li>Pads on small boards lift easily when overheated or levered. Never pry a connector off before all its joints are molten.</li>
        </ul>
      </Callout>

      <section>
        <StepHeading n={1} id="match-the-part">Match the replacement part</StepHeading>
        <p className="text-muted leading-7 mb-4">
          USB connectors that look alike often have different footprints. Before ordering, photograph the old
          port and the board underneath, count the signal pads, and note how the shell is anchored.
        </p>
        <p className="text-muted leading-7 mt-4">
          Barrel-style charging sockets use through-hole pins instead; see <Link href="/soldering-irons/how-to-solder-a-replacement-dc-power-jack-on-a-circuit-board" className="text-accent hover:underline">how to solder a replacement DC power jack</Link>.
        </p>
        <DataTable
          head={["Detail to match", "Why it matters"]}
          rows={[
            ["Connector type", "Micro-USB B, USB-C 16-pin and USB-C 24-pin all use different footprints"],
            ["Mounting style", "Top-mount sits on the board; mid-mount drops into a cut-out so the opening lines up with the case"],
            ["Shell tabs", "Surface-mount tabs, through-hole legs, or both; the replacement must anchor the same way"],
            ["Body length and height", "Decides whether the plug opening lines up with the hole in the case"],
            ["Original part number", "The surest match where it is printed on the board, part or service documentation"],
          ]}
        />
      </section>

      <section>
        <h2 id="pin-sizes" className="text-xl font-semibold mb-3">How small the pins are</h2>
        <p className="text-muted leading-7 mb-4">
          Pin pitch, the distance between neighboring contacts, is what makes this job harder than replacing
          a full-size USB-A socket. The smaller the pitch, the finer the tip and the more magnification you
          need.
        </p>
        <Figure caption={<>Nominal contact pitch for common USB receptacles. USB-C and Micro-USB pins sit closer together than the lines on a millimeter ruler.</>}>
          <BarChart
            items={[
              { label: "USB-A (2.0)", value: 2.5, display: "2.5 mm" },
              { label: "Micro-USB B", value: 0.65, display: "0.65 mm", highlight: true },
              { label: "USB-C", value: 0.5, display: "0.5 mm", highlight: true },
            ]}
          />
        </Figure>
        <DataTable
          head={["Micro-USB pin", "Signal", "Notes"]}
          rows={[
            ["1", "VBUS", "+5 V supply; a bridge to GND here stops charging"],
            ["2", "D−", "USB 2.0 data"],
            ["3", "D+", "USB 2.0 data"],
            ["4", "ID", "Used for OTG detection; often unconnected or tied to ground"],
            ["5", "GND", "Ground; the shell is normally grounded too"],
          ]}
          mono={[0]}
        />
      </section>

      <section>
        <StepHeading n={2} id="remove-the-old-port">Remove the old connector</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Factory joints are usually lead-free and the shell tabs sit on large copper areas, so they resist
          a plain iron. Brush flux over every joint, then add a little fresh leaded solder to each one: mixing
          it in lowers the melting point and helps the heat spread.
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <strong className="text-foreground">With hot air:</strong> heat the whole connector evenly with a
            nozzle sized to the part, moving in small circles. Once every joint is molten, lift it straight up
            with tweezers.
          </li>
          <li>
            <strong className="text-foreground">With an iron only:</strong> clear through-hole shell legs with
            desoldering braid, or flood all the joints with a low-melting-point removal alloy so they stay
            liquid together, then slide the connector off.
          </li>
        </ul>
        <p className="text-muted leading-7 mt-4">
          If the part does not move freely, it is not ready. Forcing it is how pads tear off.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="prepare-the-pads">Clean and prepare the pads</StepHeading>
        <p className="text-muted leading-7">
          Add flux and wick the old solder away so each pad is flat and bright, keeping the braid moving so it
          does not stick. Clean off the flux residue with isopropyl alcohol and inspect the pads closely. A
          torn signal pad needs a trace repair before you continue; our guide to{" "}
          <Link href="/soldering-irons/how-to-remove-solder-from-circuit-board" className={link}>
            removing solder from a circuit board
          </Link>{" "}
          covers wick technique in detail.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="tack-the-shell">Align and tack the shell</StepHeading>
        <Figure caption={<>A typical surface-mount Micro-USB footprint. The shell tabs carry the mechanical load; the five small pads only carry signals.</>}>
          <MicroUsbFootprint />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Place the new connector so every signal pin sits centred on its pad and any locating pegs drop into
          their holes. Hold it down with tweezers and tack a single shell tab. Check the alignment under
          magnification; if it has slipped, reheat that tab and nudge it. Only when every pin lines up should
          you solder the remaining tabs.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="solder-the-pins">Solder the signal pins</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Add flux along the row of pins. With a fine conical or small bevel tip, touch each pin and its pad
          together with a very small amount of solder, or drag a lightly loaded tip along the row and let the
          flux pull solder onto each joint. Rear-row pins on USB-C connectors are often hidden under the body:
          those footprints usually rely on hot air or careful reflow to reach them.
        </p>
        <Figure caption={<>The replacement in order. Alignment before tacking saves most failed repairs.</>}>
          <FlowDiagram
            steps={[
              { label: "Match", sub: "Same footprint and mount" },
              { label: "Remove", sub: "Flux, fresh solder, heat" },
              { label: "Clean pads", sub: "Wick flat, IPA" },
              { label: "Tack shell", sub: "Check alignment" },
              { label: "Pins, then tabs", sub: "Inspect and test" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Return to the shell tabs last and solder each one fully, filling through-holes from both sides
          where the board allows. These joints take the strain every time a cable is plugged in.
        </p>
      </section>

      <section>
        <h2 id="inspect-and-test" className="text-xl font-semibold mb-3">Inspect and test before you reassemble</h2>
        <p className="text-muted leading-7 mb-4">
          Clean away flux and look along the pins under a magnifier or microscope. Each joint should be a
          small, smooth fillet with a clear gap to its neighbors. Then set a multimeter to continuity and
          probe between VBUS and GND: it must not beep. Also check VBUS and GND each reach the circuit they
          feed. Bridges are covered in{" "}
          <Link href="/soldering-irons/how-to-prevent-solder-bridges" className={link}>
            how to prevent solder bridges
          </Link>
          .
        </p>
        <KeyIdea title="First power-up">
          Connect to a low-cost charger or a USB power meter first rather than a laptop port. If the current
          reads zero or the charger cuts out, disconnect and recheck for a bridge.
        </KeyIdea>
      </section>

      <section>
        <h2 id="faults" className="text-xl font-semibold mb-3">Common faults after a USB connector replacement</h2>
        <DataTable
          head={["Symptom", "Likely cause"]}
          rows={[
            ["Charges but no data", "D+ or D− pin not wetted, or bridged to its neighbor"],
            ["Nothing at all, charger cuts out", "VBUS bridged to GND"],
            ["Works only at an angle", "Connector not seated flat, or a cracked pin joint"],
            ["Plug will not go in fully", "Mid-mount part swapped for top-mount, or body sitting proud of the case"],
            ["Port loose within weeks", "Shell tabs only tacked, not fully soldered"],
          ]}
        />
      </section>

      <section>
        <h2 id="tools" className="text-xl font-semibold mb-3">Tools for replacing a USB connector</h2>
        <p className="text-muted leading-7 mb-6">
          You need a temperature-controlled iron with a fine tip, good flux, thin solder, desoldering braid,
          tweezers and magnification. Hot air is optional for Micro-USB but strongly helps with USB-C. Our
          guide to the{" "}
          <Link href="/soldering-irons/best-soldering-iron-for-circuit-board-repair" className={link}>
            best soldering iron for circuit board repair
          </Link>{" "}
          compares the options.
        </p>
        <ProductStrip
          title="Stations from our reviews"
          items={[
            {
              name: "YIHUA 862BD+",
              image: yihua.image,
              alt: "YIHUA 862BD+ iron and hot air rework station",
              href: "/soldering-irons/yihua-862bd-plus-review",
              note: "75W iron plus 500W hot air with independent readouts, for SMD rework alongside general soldering.",
            },
            {
              name: "Hakko FX-888DX",
              image: hakko.image,
              alt: "Hakko FX-888DX soldering station with FX-8801 handpiece",
              href: "/soldering-irons/weller-we1010-vs-hakko-fx-888dx",
              note: "100W station with a 65W iron and a parameter lock; ESD safe for work right next to a USB controller.",
            },
            {
              name: "Weller WE1010NA",
              image: weller.image,
              alt: "Weller WE1010NA digital soldering station",
              href: "/soldering-irons/weller-we1010na-review",
              note: "70W ESD-safe digital station with tight temperature stability for bench repair.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
