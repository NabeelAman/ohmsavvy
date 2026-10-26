import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-soldering-irons/page";

const description =
  "How to solder a replacement DC power jack on a circuit board: match 5.5x2.1 vs 5.5x2.5 sizes, free the heavy ground lugs, fit the new jack, check polarity.";

export const metadata = buildMetadata({
  title: "Solder a Replacement DC Power Jack on a PCB",
  description,
  path: "/soldering-irons/how-to-solder-a-replacement-dc-power-jack-on-a-circuit-board",
});

const hakko = picks.find((p) => p.name === "Hakko FX-888DX")!;

const link = "text-accent hover:underline";

export default function HowToSolderAReplacementDcPowerJackPage() {
  return (
    <HowToShell
      title="How to Solder a Replacement DC Power Jack on a Circuit Board"
      description={description}
      path="/soldering-irons/how-to-solder-a-replacement-dc-power-jack-on-a-circuit-board"
      category="soldering-irons"
      published="2026-10-22"
      intro={
        <>
          A barrel power jack that only works when the plug is wiggled has usually cracked its solder joints
          or broken its internal spring contact. Learning how to solder a replacement DC power jack on a
          circuit board is mostly about the removal: the jack&apos;s wide lugs are often tied into ground
          copper that soaks up heat, so the old part fights back. After that comes choosing a jack that
          really matches the plug, and proving the polarity with a meter before the device sees power.
        </>
      }
      aside={{
        image: hakko.image,
        alt: "Hakko FX-888DX soldering station, a 100W temperature-controlled iron",
        caption: (
          <>
            Heavy jack lugs reward a station with power in reserve, such as the 100W Hakko FX-888DX. See
            our{" "}
            <Link href="/soldering-irons/weller-we1010-vs-hakko-fx-888dx" className={link}>
              Weller WE1010 vs Hakko FX-888DX comparison
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "jack-anatomy", label: "Barrel jack anatomy and polarity" },
        { id: "match-the-jack", label: "1. Match the replacement jack" },
        { id: "remove-the-old-jack", label: "2. Remove the old jack" },
        { id: "clean-the-holes", label: "3. Clear and inspect the holes" },
        { id: "fit-the-new-jack", label: "4. Fit and solder the new jack" },
        { id: "verify-polarity", label: "5. Verify polarity before power" },
        { id: "troubleshooting", label: "Troubleshooting" },
      ]}
      faq={[
        {
          q: "How can I tell whether my device is center-positive or center-negative?",
          a: "Look for the polarity symbol near the power input or on the original adapter: a circle with a dot, where the line from the dot marked + means center-positive. Center-positive is far more common on electronics, but some devices, including many guitar effects pedals, are center-negative. When there is no marking, trace the center pin to the board and measure which rail it feeds.",
        },
        {
          q: "Will a 5.5x2.1mm plug fit a 5.5x2.5mm jack?",
          a: "It will usually go in, because the outer sleeve size is the same, but the 2.1mm hole fits loosely on the larger 2.5mm center pin and contact is intermittent. The reverse, a 2.5mm plug onto a 2.1mm pin, often will not seat at all. Measure the old jack's center pin with calipers and buy the matching size.",
        },
        {
          q: "Why won't the solder on the old jack melt?",
          a: "The ground lugs are usually connected to a large copper area that pulls heat away faster than a small tip can supply it. Switch to a bigger chisel tip, raise the setpoint, add flux, and add fresh solder to the old joint, which improves heat transfer and helps the old alloy flow. Preheating the board from below helps on very heavy boards.",
        },
        {
          q: "Can I replace a surface-mount DC jack with a soldering iron?",
          a: "Often yes. Many SMD jacks still have large through-hole or edge-soldered anchoring tabs, and the signal pads are big. Add flux and fresh solder to each pad, then heat the tabs while gently lifting the jack. Hot air makes removal easier, but an iron with a wide tip handles most of them.",
        },
        {
          q: "What does the third pin on a DC jack do?",
          a: "On many jacks it is a switch contact that touches the sleeve when no plug is inserted and opens when a plug goes in. Devices use it to swap from an internal battery to external power. Copy the original connections exactly; leaving it unconnected or wiring it as ground can stop the device running on battery.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/how-to-remove-solder-from-circuit-board",
          title: "How to Remove Solder from a Circuit Board",
          desc: "Wick, pump and hot air techniques for clearing the old jack's holes.",
        },
        {
          href: "/soldering-irons/soldering-iron-for-usb-port-repair",
          title: "Soldering Iron for USB Port Repair",
          desc: "The fine-pitch counterpart to this job, for USB-C and micro-USB inputs.",
        },
      ]}
    >
      <section>
        <h2 id="jack-anatomy" className="text-xl font-semibold mb-3">Barrel jack anatomy and polarity</h2>
        <p className="text-muted leading-7 mb-4">
          A barrel jack has a center pin and a sprung outer contact that grips the plug sleeve. Most
          board-mount versions add a third terminal, a switch that opens when a plug is inserted. Polarity
          describes which of the two power contacts is positive. Unlike USB ports, which are fine-pitch and
          fixed in their pin assignment, barrel jacks are big, simple, and easy to wire backwards.
        </p>
        <Figure
          caption={
            <>
              Cross-section of a plug in a jack. In a center-positive device the pin carries +V and the sleeve
              is ground; center-negative devices swap them. The polarity symbol (right) shows which.
            </>
          }
        >
          <svg viewBox="0 0 320 140" className="w-full h-auto" role="img" aria-label="Cross-section of a DC barrel plug inside a jack showing center pin and sleeve contacts, with the center-positive polarity symbol">
            <rect x="20" y="30" width="160" height="70" rx="4" className="fill-surface stroke-foreground" strokeWidth="1.4" />
            <rect x="60" y="48" width="120" height="34" className="fill-muted/40 stroke-foreground" strokeWidth="1.2" />
            <rect x="60" y="58" width="120" height="14" className="fill-surface" />
            <rect x="30" y="61" width="120" height="8" className="fill-accent" />
            <text x="48" y="22" fontSize="9" className="fill-foreground">jack body</text>
            <text x="120" y="96" fontSize="9" textAnchor="middle" className="fill-foreground">plug sleeve</text>
            <text x="90" y="56" fontSize="8" textAnchor="middle" className="fill-accent">center pin</text>
            <path d="M60 48 L50 40 M60 82 L50 90" className="stroke-foreground" strokeWidth="1.5" />
            <text x="30" y="118" fontSize="8" className="fill-muted">sprung sleeve contact</text>
            <circle cx="262" cy="65" r="16" className="fill-none stroke-foreground" strokeWidth="1.6" />
            <circle cx="262" cy="65" r="4" className="fill-foreground" />
            <line x1="262" y1="65" x2="300" y2="65" className="stroke-foreground" strokeWidth="1.4" />
            <line x1="246" y1="65" x2="226" y2="65" className="stroke-foreground" strokeWidth="1.4" />
            <text x="306" y="69" fontSize="12" className="fill-accent">+</text>
            <text x="214" y="69" fontSize="12" className="fill-foreground">−</text>
            <text x="262" y="108" fontSize="9" textAnchor="middle" className="fill-foreground">center-positive</text>
          </svg>
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="match-the-jack">Match the replacement jack</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Three things have to match: the barrel size, the footprint, and the mounting style. Barrel sizes
          are given as outer diameter by center-pin diameter. Footprints vary widely even within one size, so
          compare pin spacing and lug shape with the old part, or order by the original manufacturer part
          number if it is printed on the jack or listed in a service manual.
        </p>
        <DataTable
          head={["Size (OD x pin)", "Where you often see it", "Mix-up risk"]}
          rows={[
            ["5.5 x 2.1mm", "Routers, LED strips, CCTV, many 12V devices", "Loose and intermittent on a 2.5mm pin"],
            ["5.5 x 2.5mm", "Older laptops, some chargers and test gear", "2.1mm plugs fit poorly; looks identical"],
            ["3.5 x 1.35mm", "Small hubs, portable speakers", "Easy to confuse with 4.0 x 1.7mm"],
            ["4.0 x 1.7mm", "Some handheld and audio devices", "Fits loosely in nearby sizes"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={2} id="remove-the-old-jack">Remove the old jack</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Swap to your largest chisel tip and start around 370-400°C for leaded or 380-420°C for lead-free
          solder, framed as a starting point for heavy ground lugs, not for the rest of the board. Flux every
          joint and add a little fresh leaded solder; mixing it into old lead-free alloy lowers the melting
          point and gives the tip better thermal contact. Then clear each joint with braid or a solder pump.
        </p>
        <FlowDiagram
          steps={[
            { label: "Big tip", sub: "Wide chisel, higher setpoint" },
            { label: "Flux + fresh solder", sub: "On every lug" },
            { label: "Clear joints", sub: "Pump or braid" },
            { label: "Rock gently", sub: "Never force a stuck lug" },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If one lug refuses to clear, heat it while rocking the jack slightly toward the free lugs, and stop
          if the pad starts to move. Our guide to{" "}
          <Link href="/soldering-irons/how-to-remove-solder-from-circuit-board" className={link}>
            removing solder from a circuit board
          </Link>{" "}
          compares braid, pumps and hot air in more depth.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="clean-the-holes">Clear and inspect the holes</StepHeading>
        <p className="text-muted leading-7">
          Jack lugs are often flat slots rather than round holes, and solder left in a slot stops the new
          jack seating. Clear each one fully, clean the flux with isopropyl alcohol, and check under
          magnification that the plating inside the holes and the pads around them are intact. Torn pads need
          repair before the new jack goes in, because a jack takes mechanical stress every time a plug is
          inserted.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="fit-the-new-jack">Fit and solder the new jack</StepHeading>
        <p className="text-muted leading-7">
          Push the jack in until its body sits flat on the board and is square to the case opening; trial-fit
          the case if you can. Solder one small lug to hold it, check alignment again, then do the large ground
          lugs, letting solder flow right through the slot so the fillet appears on both sides. These joints
          carry plug-insertion force, so be generous with heat time here, but stop once the fillet is smooth.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="verify-polarity">Verify polarity before applying power</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Start with the adapter on its own, not plugged into anything: red probe inside the plug on the
          center contact, black on the outer barrel. A positive reading means center-positive. Then, with the
          board unpowered and still out of its case, use continuity mode to confirm that the
          jack&apos;s center pin connects to the trace it should, and that pin and sleeve are not shorted.
          The{" "}
          <Link href="/multimeters/how-to-use-a-multimeter" className={link}>
            multimeter guide
          </Link>{" "}
          covers DC voltage and continuity.
        </p>
        <Callout title="Reverse polarity can destroy the board">
          Many devices have no reverse-polarity protection. Measure before connecting the original adapter,
          and never test with a random adapter that merely fits the barrel: voltage and polarity must both
          match the device&apos;s label.
        </Callout>
      </section>

      <section>
        <h2 id="troubleshooting" className="text-xl font-semibold mb-3">Troubleshooting</h2>
        <DataTable
          head={["Symptom", "Likely cause", "Fix"]}
          rows={[
            ["Still cuts out when plug moves", "Wrong pin size, or a cracked joint remains", "Check 2.1 vs 2.5mm; reflow all lugs"],
            ["Device dead, adapter fine", "Switch pin wired differently from the original", "Compare with old jack; re-trace connections"],
            ["Jack sits crooked in case", "Solder left in a slot, or one lug soldered first off-square", "Reheat and re-seat while pressing flat"],
            ["Pad lifted during removal", "Forced a lug that had not fully melted", "Repair pad and anchor jack with extra solder"],
            ["Adapter gets hot or shuts off", "Pin and sleeve shorted by solder", "Unplug; find the bridge with continuity"],
          ]}
        />
      </section>

      <Callout title="Safety: heat, fumes and stored charge">
        Higher setpoints mean more flux smoke, so use extraction. Unplug the device and remove batteries
        before work, and let large capacitors discharge. Wash your hands after handling leaded solder.
      </Callout>
    </HowToShell>
  );
}
