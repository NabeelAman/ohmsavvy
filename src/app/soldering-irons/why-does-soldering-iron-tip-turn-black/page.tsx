import Link from "next/link";
import { BarChart, Callout, DataTable, Figure, FlowDiagram, HowToShell, KeyIdea, ProductStrip, StepHeading } from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-soldering-irons/page";

const description =
  "A soldering iron tip turns black from oxidation and burnt flux. See what causes it, how to tell if a black tip can be saved, and the habits that keep it silver.";

export const metadata = buildMetadata({
  title: "Why Does a Soldering Iron Tip Turn Black?",
  description,
  path: "/soldering-irons/why-does-soldering-iron-tip-turn-black",
});

// The Hakko FX888D is unavailable on Amazon, so the FX-888DX stands in for it.
const fx888dx = picks.find((p) => p.name === "Hakko FX-888DX")!;
const yihua926 = picks.find((p) => p.name === "YIHUA 926 III")!;
const xtronic = picks.find((p) => p.name === "X-Tronic 3020-XTS")!;

const link = "text-accent hover:underline";

/** Three tip cross-sections: tinned, blackened but intact, and pitted through the plating. */
function TipLayersDiagram() {
  const rows = [
    { oy: 0, coat: "#eef1f3", pit: false, label: "Tinned: a solder coat sits between the air and the iron plating" },
    { oy: 90, coat: "#1d1f22", pit: false, label: "Black: oxide and burnt flux on intact plating (recoverable)" },
    { oy: 180, coat: "#1d1f22", pit: true, label: "Pitted: plating breached, copper core exposed (replace)" },
  ];
  return (
    <svg
      viewBox="0 0 360 270"
      className="w-full h-auto"
      role="img"
      aria-label="Cross-sections of three soldering iron tips: a tinned tip with a bright solder coat, a black oxidized tip whose plating is still intact, and a pitted tip where the iron plating is worn through to the copper core"
    >
      {rows.map((r) => (
        <g key={r.oy} strokeLinejoin="round">
          <path
            d={`M30 ${r.oy + 10} L210 ${r.oy + 10} L310 ${r.oy + 32} L210 ${r.oy + 54} L30 ${r.oy + 54} Z`}
            className="fill-[#c3c8ce] stroke-foreground"
            strokeWidth="1.2"
          />
          <path
            d={`M30 ${r.oy + 16} L208 ${r.oy + 16} L294 ${r.oy + 32} L208 ${r.oy + 48} L30 ${r.oy + 48} Z`}
            fill="#c87533"
          />
          <path
            d={`M236 ${r.oy + 15} L310 ${r.oy + 32} L236 ${r.oy + 49}`}
            fill="none"
            stroke={r.coat}
            strokeWidth="5"
            strokeLinecap="round"
          />
          {r.pit && <circle cx="300" cy={r.oy + 32} r="7" fill="#c87533" stroke="#7a3f12" strokeWidth="1.2" />}
          <text x="180" y={r.oy + 74} fontSize="10.5" textAnchor="middle" className="fill-foreground">
            {r.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function WhyDoesSolderingIronTipTurnBlackPage() {
  return (
    <HowToShell
      title="Why Does a Soldering Iron Tip Turn Black?"
      description={description}
      path="/soldering-irons/why-does-soldering-iron-tip-turn-black"
      category="soldering-irons"
      published="2026-10-29"
      intro={
        <>
          A soldering iron tip turns black because its hot metal surface reacts with oxygen and forms an
          oxide layer, often mixed with carbonized flux that has cooked onto it. That happens fastest when
          the tip sits hot without a protective coat of solder, runs hotter than the job needs, or is cleaned
          in ways that leave it bare. So why does a soldering iron tip turn black on one bench and stay
          silver on another? Mostly habits, and a black tip is usually recoverable as long as the plating
          underneath has not worn through.
        </>
      }
      aside={{
        image: fx888dx.image,
        alt: "Hakko FX-888DX soldering station with its digital temperature dial",
        caption: (
          <>
            Turning the setpoint down is the cheapest way to slow blackening. Stations with presets, like the
            Hakko FX-888DX, make it easy to keep a lower everyday setting. See our{" "}
            <Link href="/soldering-irons/best-soldering-irons" className={link}>
              best soldering irons
            </Link>{" "}
            roundup.
          </>
        ),
      }}
      toc={[
        { id: "what-the-black-is", label: "What the black layer actually is" },
        { id: "causes", label: "Why a tip turns black: the causes" },
        { id: "heat", label: "How temperature drives blackening" },
        { id: "save-or-replace", label: "Can a black tip be saved?" },
        { id: "step-diagnose", label: "1. Look at the tip cold" },
        { id: "step-scrub", label: "2. Scrub on brass wool while hot" },
        { id: "step-tinner", label: "3. Use tip tinner for stubborn black" },
        { id: "step-test", label: "4. Test whether it wets" },
        { id: "prevention", label: "Keeping a tip silver" },
      ]}
      faq={[
        {
          q: "Is a black soldering iron tip bad?",
          a: "It is a warning, not a death sentence. Black means the working surface is coated in oxide or burnt flux, which stops solder from wetting and slows heat transfer into the joint. If the plating underneath is intact, scrubbing on brass wool and re-tinning, or a dip in tip tinner, usually brings back a silver tip. If you can see a pit or copper color, replace the tip.",
        },
        {
          q: "Can I use sandpaper on a black soldering iron tip?",
          a: "Hakko's own cleaning procedure allows fine sandpaper to remove only the surface oxide, but the iron plating on a modern tip is thin and easy to cut through with too much pressure. Once copper is exposed the tip pits quickly. Try brass wool and tip tinner first, and if you do use sandpaper, use a very fine grit with a few light strokes.",
        },
        {
          q: "Why does my new soldering iron tip turn black so fast?",
          a: "Usually because it was never properly tinned before first use, or because the iron is set near its maximum. A brand-new tip should be heated and coated with solder straight away, then kept coated whenever it is idle. Budget kits with fixed or poorly regulated temperatures also tend to run hot, which speeds oxidation. A lower setpoint and a solder coat in the stand solve most cases.",
        },
        {
          q: "Does tip tinner damage the tip?",
          a: "Used occasionally, no. Tip tinner is solder powder mixed with an activated flux, so it strips oxide much harder than the flux in ordinary solder wire. Used every few minutes as a routine cleaner, that extra activity is unnecessary wear. Hakko also tells users to clean its FS-100 paste off the tip after tinning and to use it only for restoring tips, not as a general-purpose flux.",
        },
        {
          q: "Why does my tip go black even though I wipe it on a wet sponge?",
          a: "Wiping removes solder along with the dirt, so a freshly wiped tip is bare and starts oxidizing within seconds at working temperature. If you wipe and then park the iron, it blackens in the stand. Wipe right before you make a joint, not right before you put it down, and add a little fresh solder before the iron goes back in the holder.",
        },
        {
          q: "Is the black on my tip burnt flux or oxidation?",
          a: "Often both. Burnt flux is a crusty brown-to-black residue that wipes or brushes off fairly easily on brass wool. Oxide is a thin, hard, uniform film on the metal itself that solder will not wet. If brass wool leaves the tip dark and solder still balls up, the problem is oxide, and tip tinner or flux plus fresh solder is the next step.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/soldering-iron-tip-care",
          title: "Soldering Iron Tip Care",
          desc: "The full cleaning, tinning and replacement routine for any tip.",
        },
        {
          href: "/soldering-irons/why-wont-solder-stick-to-soldering-iron-tip",
          title: "Why Won't Solder Stick to the Tip?",
          desc: "Step-by-step re-tinning when solder balls up and rolls off.",
        },
      ]}
    >
      <section id="what-the-black-is">
        <h2 className="text-xl font-semibold mb-3">What the black layer actually is</h2>
        <p className="text-muted leading-7 mb-4">
          A typical modern tip is built in layers. A copper core carries heat from the heater to the point.
          Around the working end sits a thin iron plating, which is the surface solder actually bonds to,
          because molten solder dissolves bare copper quickly but iron only very slowly. The shank behind the
          working end usually gets a chrome or nickel finish that solder is not supposed to wet at all. When
          people ask why a soldering iron tip turns black, they are looking at what happens to that iron
          plating once it meets air at 300°C or more.
        </p>
        <p className="text-muted leading-7 mb-4">
          Two different things build up. The first is oxide: iron reacts with oxygen and forms a thin,
          hard, dark film, and the hotter the metal, the faster it grows. The second is burnt flux. Rosin
          flux is meant to boil off as you solder, but any that sits on a hot tip for long chars into a
          brown or black crust. Burnt flux looks dramatic but scrubs off easily. Oxide is the layer that
          matters, because solder cannot wet it and heat crosses it poorly, so a black tip makes slow,
          grainy joints even when the station display shows the right number.
        </p>
        <Figure caption="Top: a tinned tip, where a bright solder film shields the iron plating from air. Middle: the same tip blackened by oxide and burnt flux, with the plating still whole. Bottom: the plating has worn through at the point and the copper core is exposed, which no cleaning can fix.">
          <TipLayersDiagram />
        </Figure>
      </section>

      <section id="causes">
        <h2 className="text-xl font-semibold mb-3">Why a soldering iron tip turns black: the causes</h2>
        <p className="text-muted leading-7 mb-4">
          Most blackened tips can be traced to one or two of the causes below. The table gives the symptom
          that points to each, a quick way to check, and the fix.
        </p>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["Tip is black every time you pick the iron up", "Idling hot and bare in the stand", "Is there any shiny solder on the tip when you return to it?", "Add solder before parking; use sleep or switch off during breaks"],
            ["Turns black within a minute or two of cleaning", "Setpoint far above what the joint needs", "Compare the setpoint with the chart below; most leaded work does not need 400°C+", "Drop the setpoint in steps until joints start to slow, then go back up a little"],
            ["Brown-black crust and smoke on the shank", "Burnt flux and charred sponge residue", "Does brass wool remove it easily?", "Scrub on brass wool; keep the sponge damp, never dry"],
            ["Dark after cleaning, scratches visible", "Abrasive cleaning thinned the plating", "Look for bright scratch lines or an uneven surface", "Stop filing or sanding; use brass wool and tinner only"],
            ["Black with green or rusty traces, rapid decay", "Acid-core or corrosive plumbing flux", "Was the solder or flux sold for pipes or sheet metal?", "Use rosin or no-clean electronics flux; clean the tip and re-tin"],
            ["New budget tip blackens on day one", "Thin or uneven plating, or never tinned at first heat-up", "Did you tin it at first heat-up? Does it pit within weeks?", "Tin new tips immediately; buy genuine tips for your iron"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Notice what is missing from that list: the solder itself. Any electronics solder will coat and
          protect the tip. A tip goes black when it spends time with nothing on it, and every cause above
          either leaves it bare for longer or makes the bare surface react faster.
        </p>
      </section>

      <section id="heat">
        <h2 className="text-xl font-semibold mb-3">How temperature drives blackening</h2>
        <p className="text-muted leading-7 mb-4">
          Oxidation is a chemical reaction, and like most reactions it speeds up as temperature climbs. Hakko
          puts &quot;use soldering iron at lower set temperature&quot; on its list of ways to prevent tip
          oxidation, and its re-tinning procedure applies new solder at only 250°C. Compare that with the
          ceilings on common stations and the melting points of the solders they are used with:
        </p>
        <BarChart
          items={[
            { label: "Sn63/Pb37 leaded solder melts", value: 183, display: "183°C (361°F)" },
            { label: "SAC305 lead-free solder melts", value: 218, display: "~217–220°C" },
            { label: "Hakko re-tinning temperature", value: 250, display: "250°C" },
            { label: "Hakko FS-100 tinner dip", value: 350, display: "~350°C" },
            { label: "Weller WE1010NA maximum", value: 450, display: "450°C", highlight: true },
            { label: "Hakko FX-888DX maximum", value: 480, display: "480°C", highlight: true },
          ]}
        />
        <p className="text-muted leading-7 mt-4 text-sm">
          Melting points are standard alloy figures. Hakko values per its UK tip-cleaning guide; station
          maximums per each maker&apos;s product page (sources noted in this page&apos;s code).
        </p>
        <p className="text-muted leading-7 mt-4">
          The arithmetic makes the point. With leaded Sn63/Pb37 solder, a tip at 250°C runs about 67°C above
          the melting point (250 − 183). The same tip set to the FX-888DX&apos;s 480°C maximum runs about
          297°C above it (480 − 183), more than four times the margin, with no improvement in joint quality
          on ordinary through-hole or small-wire work. That surplus heat goes into oxidizing the plating and
          scorching flux. Raise the setpoint for heavy joints when you need to, then bring it back down. Our{" "}
          <Link href="/soldering-irons/soldering-iron-temperature-by-metal" className={link}>
            soldering temperature guide
          </Link>{" "}
          gives starting setpoints by alloy and joint type.
        </p>
      </section>

      <section id="save-or-replace">
        <h2 className="text-xl font-semibold mb-3">Can a black tip be saved?</h2>
        <p className="text-muted leading-7 mb-4">
          Whether a black tip comes back depends on one thing: is the iron plating still there? Oxide and
          burnt flux sit on top of the plating and can be removed. A pit, a crater, a hole or a coppery color
          at the point means the plating is gone, molten solder is now dissolving the copper core, and the
          tip will keep eroding however well you clean it. Hakko&apos;s guidance is blunt: if solder still
          won&apos;t wet the tip after the oxide has been removed, replace the tip.
        </p>
        <FlowDiagram
          steps={[
            { label: "Inspect cold", sub: "Pit or copper color? Replace" },
            { label: "Brass wool, hot", sub: "Removes crust and loose oxide" },
            { label: "Tip tinner", sub: "Strips the remaining oxide" },
            { label: "Wets silver?", sub: "Yes: keep it. No: replace" },
          ]}
        />
      </section>

      <section id="step-diagnose">
        <StepHeading n={1}>Look at the tip cold</StepHeading>
        <p className="text-muted leading-7">
          Let the iron cool fully and inspect the working end under good light, ideally with a magnifier.
          An even dark film on a tip that still has its original shape is oxide. A chunky crust is burnt
          flux. A notch, a hollow at the point, a shrunken profile or a pink-orange spot is worn-through
          plating. Check the shank too: if the chrome area has started holding solder, the tip has been
          overheated or abraded. A tip that will not come out of the barrel because of scale is a different
          problem, covered in{" "}
          <Link href="/soldering-irons/how-to-remove-a-soldering-iron-tip-that-is-stuck" className={link}>
            how to remove a stuck soldering iron tip
          </Link>
          .
        </p>
      </section>

      <section id="step-scrub">
        <StepHeading n={2}>Scrub on brass wool while hot</StepHeading>
        <p className="text-muted leading-7">
          Heat the iron to a normal working temperature. Push the tip into brass wool and twist it so every
          face is scrubbed. Brass is softer than the iron plating, so it removes crust and loose oxide
          without cutting the working surface. Feed in a little flux-core solder straight afterwards. On
          lightly blackened tips, that is often enough to see the end turn bright again.
        </p>
      </section>

      <section id="step-tinner">
        <StepHeading n={3}>Use tip tinner for stubborn black</StepHeading>
        <p className="text-muted leading-7">
          If the tip stays dark, press it into a tip tinner, sometimes called a tip activator, and rotate it
          until the working end turns silver. These pastes pair solder with a strongly activated flux. Hakko
          lists its FS-100 as 50% tin and 50% flux by weight, the flux built on amine hydrobromide
          activators, and gives a dipping temperature of around 350°C. Wipe the residue off on brass wool,
          add fresh solder at once, and repeat once or twice if needed. Keep tinner for rescues; for the
          everyday routine, see{" "}
          <Link href="/soldering-irons/soldering-iron-tip-care" className={link}>
            soldering iron tip care
          </Link>
          .
        </p>
      </section>

      <section id="step-test">
        <StepHeading n={4}>Test whether it wets</StepHeading>
        <p className="text-muted leading-7">
          Touch solder to the working end. A recovered tip pulls the solder into a thin, shiny film that
          spreads across the faces. If solder still beads and rolls away after two rounds of tinner, the
          oxide is not the real problem; the plating has failed. The specific symptom of solder rolling off
          is covered step by step in{" "}
          <Link href="/soldering-irons/why-wont-solder-stick-to-soldering-iron-tip" className={link}>
            why solder won&apos;t stick to the soldering iron tip
          </Link>
          , and the opposite fault, where solder clings to the tip and refuses to transfer, is in{" "}
          <Link href="/soldering-irons/why-solder-sticks-to-tip" className={link}>
            why solder sticks to the tip
          </Link>
          . If the tip is finished, it is a chance to choose{" "}
          <Link href="/soldering-irons/soldering-iron-tip-types" className={link}>
            a tip shape that fits your work
          </Link>
          .
        </p>
      </section>

      <Callout title="Heat, fumes and the wrong flux">
        The tip is at full working temperature throughout cleaning, so keep fingers clear of the barrel and
        never test it by touch. Tip tinner gives off dense smoke; ventilate or use fume extraction. Do not use
        acid-core plumbing solder or acid flux on an electronics iron: the residue corrodes tips and circuit
        boards alike.
      </Callout>

      <section id="prevention">
        <h2 className="text-xl font-semibold mb-3">Keeping a tip silver</h2>
        <p className="text-muted leading-7 mb-4">
          Prevention is mostly about how the tip spends its time between joints. Keep a small blob of solder
          on it whenever it is in the stand, and leave a generous coat when you switch off, so the coat
          oxidizes instead of the plating. Hakko&apos;s list matches: keep the end of the tip coated with
          solder, turn the power off when the iron is not in use, and don&apos;t raise the temperature
          unnecessarily.
        </p>
        <p className="text-muted leading-7 mb-4">
          Clean with brass wool or a damp, not dry and not dripping, sponge. A dry sponge does little to the
          oxide and can scorch onto the tip. Use rosin or no-clean electronics flux, and clean flux residue
          off boards afterwards rather than off the tip with abrasives; our guide to{" "}
          <Link href="/soldering-irons/how-to-clean-flux-residue-after-soldering-electronics" className={link}>
            cleaning flux residue
          </Link>{" "}
          covers that. An iron with a sleep timer also helps, because it drops the tip temperature during
          the long pauses when blackening happens. Before putting the iron away for weeks, see{" "}
          <Link href="/soldering-irons/how-to-store-a-soldering-iron" className={link}>
            how to store a soldering iron
          </Link>
          .
        </p>
        <KeyIdea title="In short">
          Black is oxide plus burnt flux, and it builds fastest on a tip that is hot, bare and set too high.
          Brass wool, tip tinner and fresh solder bring back a tip whose plating is intact; a pit or copper
          color means it needs replacing. A solder coat in the stand and a lower setpoint stop most of it.
        </KeyIdea>
      </section>

      <ProductStrip
        title="Irons that make lower temperatures and sleep easy"
        items={[
          {
            name: fx888dx.name,
            image: fx888dx.image,
            alt: "Hakko FX-888DX soldering station",
            href: "/soldering-irons/weller-we1010-vs-hakko-fx-888dx",
            note: "50–480°C with five presets, so a moderate everyday setting is one press away.",
          },
          {
            name: xtronic.name,
            image: xtronic.image,
            alt: "X-Tronic 3020-XTS soldering station",
            href: "/soldering-irons/best-soldering-irons#x-tronic-3020-xts",
            note: "Per the maker, a 10-minute sleep with auto cool-down limits bare-tip idle time.",
          },
          {
            name: yihua926.name,
            image: yihua926.image,
            alt: "YIHUA 926 III soldering station",
            href: "/soldering-irons/best-soldering-irons#yihua-926-iii",
            note: "Selectable 5, 10 or 30-minute sleep and 900M-series tips that are easy to replace.",
          },
        ]}
      />
    </HowToShell>
  );
}

// Sources for figures quoted on this page:
// Hakko re-tin at 250°C, FS-100 dip ~350°C, "use lower set temperature", keep tip coated, power off when idle,
// replace if solder won't wet after oxide removal, fine sandpaper/599B only for surface oxide — per https://hakko.co.uk/?p=4377
// FS-100 composition (flux and tin 50 wt% each; amine hydrobromate flux), clean paste off after tinning, use only for tips — per https://hakko.co.uk/product/hfs100-01-solder-tip-cleaning-paste/
// FX-888DX 50–480°C, five presets — per hakkousa.com FX-888DX page (Pick comment in ../best-soldering-irons/page.tsx)
// WE1010NA 100–450°C — per https://www.weller-tools.com/us/en/industrial-soldering/products/soldering-stations/we1010na-120v
// X-Tronic 3020-XTS 10-min sleep with auto cool-down — per xtronicusa.com 3020-XTS page (Pick comment)
// YIHUA 926 III sleep 5/10/30 min, 900M tips — per yihua-soldering.com 926LED-III page (Pick comment)
// Sn63/Pb37 183°C and SAC305 ~217–220°C are standard alloy melting figures.
