// Educational page. CAT (overvoltage category) ratings are a standard IEC 61010 classification — well-established,
// non-disputed engineering fact per CONTENT_STANDARDS.md §1, no per-instance citation required. Product-specific
// CAT figures below reuse existing verified Picks' own stated ratings only.
import Link from "@/components/AppLink";
import {
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  ProductStrip,
} from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const all = getAllPicks("multimeters");
const fluke117 = all.find((p) => p.name === "Fluke 117")!;
const mm720 = all.find((p) => p.name === "Klein Tools MM720")!;
const ex330 = all.find((p) => p.name === "Extech EX330")!;

const description =
  "What CAT rating you need for home wiring: CAT II, III and IV explained by room of the house, with real ratings from verified meters.";

export const metadata = buildMetadata({
  title: "What CAT Rating Do I Need for Home Wiring?",
  description,
  path: "/multimeters/what-cat-rating-do-i-need-for-home-wiring",
  image: fluke117.image,
});

const link = "text-accent hover:underline";

/** CAT zones on a simple house diagram: service entrance (IV), panel/branch circuits (III), outlets/appliances (II). */
function HouseZonesDiagram() {
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full h-auto"
      role="img"
      aria-label="A simple house wiring diagram split into three zones. The utility connection and service entrance is CAT IV. The breaker panel and the fixed branch-circuit wiring running through the walls is CAT III. The wall outlets, switches and anything you plug in is CAT II."
    >
      <path d="M10 70 L40 40 L70 70 V120 H10 Z" className="fill-surface stroke-foreground" strokeWidth="1.8" />
      <text x="40" y="35" fontSize="9" textAnchor="middle" className="fill-muted">Utility</text>
      <path d="M70 120 H120" className="stroke-foreground" strokeWidth="2" />
      <rect x="120" y="95" width="30" height="50" rx="2" className="fill-accent/30 stroke-accent" strokeWidth="1.8" />
      <text x="135" y="124" fontSize="9" fontWeight="700" textAnchor="middle" className="fill-accent">Panel</text>
      <text x="40" y="150" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">CAT IV</text>
      <text x="135" y="160" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-accent">CAT III</text>
      <path d="M150 110 H260" className="stroke-foreground" strokeWidth="1.8" />
      <path d="M150 130 H260" className="stroke-foreground" strokeWidth="1.8" />
      <rect x="260" y="90" width="60" height="80" rx="3" className="fill-surface stroke-foreground" strokeWidth="1.8" />
      <circle cx="275" cy="155" r="4" className="fill-foreground" />
      <text x="290" y="158" fontSize="8" className="fill-muted">outlet</text>
      <text x="290" y="100" fontSize="10" fontWeight="700" className="fill-foreground">CAT II</text>
      <text x="170" y="190" fontSize="10" textAnchor="middle" className="fill-muted">Fixed branch-circuit wiring in the walls</text>
    </svg>
  );
}

export default function WhatCatRatingDoINeedForHomeWiringPage() {
  return (
    <HowToShell
      title="What CAT Rating Do I Need for Home Wiring?"
      description={description}
      published="2026-11-28"
      path="/multimeters/what-cat-rating-do-i-need-for-home-wiring"
      category="multimeters"
      intro={
        <>
          For most home wiring work, a multimeter rated CAT III 600V is the practical minimum — it covers your
          breaker panel and the fixed branch-circuit wiring running through your walls. Step up to CAT IV only if
          you&apos;re working at the service entrance or the utility meter itself, where a fault can release far more
          energy. Plugged-in appliances and the outlets themselves are the lower-risk CAT II zone. This guide breaks
          down the IEC 61010 category system by what&apos;s actually in a typical house.
        </>
      }
      aside={{
        image: fluke117.image,
        alt: "Fluke 117 digital multimeter, rated CAT III 600V",
        caption: (
          <>
            CAT III 600V, like the Fluke 117 carries, is the right default for panel and branch-circuit work in a
            home. See{" "}
            <Link href="/multimeters/is-a-cheap-multimeter-accurate" className={link}>
              is a cheap multimeter accurate
            </Link>{" "}
            for why the printed rating on a budget meter&apos;s case isn&apos;t always the one to trust.
          </>
        ),
      }}
      toc={[
        { id: "what", label: "What a CAT rating actually certifies" },
        { id: "zones", label: "CAT zones in a typical house" },
        { id: "voltage", label: "Why the voltage number matters too" },
        { id: "mistakes", label: "Common mistakes" },
        { id: "which-meter", label: "Which rating to buy" },
      ]}
      faq={[
        {
          q: "Is CAT III 600V enough for my home's breaker panel?",
          a:
            "Yes, for a typical residential panel and the branch-circuit wiring feeding it, CAT III 600V is the standard recommendation. CAT IV is reserved for the utility connection and service entrance, ahead of your main breaker, where fault energy is higher.",
        },
        {
          q: "What's the difference between CAT III and CAT IV?",
          a:
            "Both describe protection against transient overvoltage, but CAT IV covers the origin of the installation (the utility connection and service entrance), while CAT III covers distribution-level circuits like a panel and the fixed wiring feeding outlets. CAT IV equipment is built to handle a higher energy transient than CAT III at the same voltage number.",
        },
        {
          q: "Do I need a CAT rating at all for checking a wall outlet?",
          a:
            "A wall outlet and anything plugged into it is generally CAT II territory, and most multimeters, even basic ones, carry at least a CAT II rating. The practical reason to buy CAT III anyway is that most homes also have a panel to check, and it's safer to own one meter rated for the highest category you'll actually encounter.",
        },
        {
          q: "Why do some meters list two CAT ratings, like CAT III 1000V and CAT IV 600V?",
          a:
            "A meter's CAT rating is really a pair: category and voltage. A single meter's two ratings reflect that its protection margin is higher at the lower voltage. The Klein MM720, for example, is rated both CAT IV 600V and CAT III 1000V — meaning it meets the tougher CAT IV standard at 600V, and the slightly less demanding CAT III standard at the higher 1000V.",
        },
        {
          q: "Can I trust the CAT rating printed on a budget meter's case?",
          a:
            "Not always. We've documented real cases among verified picks on this site where a case or Amazon listing states a higher CAT rating than the meter's own printed manual actually supports. Always check the manual as the authoritative source, as covered in our guide on cheap-multimeter accuracy.",
        },
      ]}
      next={[
        {
          href: "/multimeters/is-a-cheap-multimeter-accurate",
          title: "Is a Cheap Multimeter Accurate?",
          desc: "Why a budget meter's printed CAT rating isn't always the one its manual actually supports.",
        },
        {
          href: "/multimeters/multimeter-input-impedance-explained",
          title: "Multimeter Input Impedance Explained",
          desc: "The other spec worth understanding before you trust a reading near your panel.",
        },
      ]}
    >
      <section>
        <h2 id="what" className="text-xl font-semibold mb-3">What a CAT rating actually certifies</h2>
        <p className="text-muted leading-7 mb-4">
          CAT (overvoltage category) ratings come from the IEC 61010 safety standard and classify how much transient
          energy a meter, and its leads, are built to survive without the fault reaching the person holding it. The
          categories run from CAT I (low-energy electronic circuits) through CAT II (plug-in loads and receptacles),
          CAT III (distribution-level fixed wiring, like a panel), to CAT IV (the service entrance and utility
          connection, where available fault current is highest).
        </p>
        <p className="text-muted leading-7">
          Higher categories at the same voltage number mean a tougher internal design: better transient suppression,
          more robust fuses, and leads built to maintain their insulation under a much larger momentary surge. A
          meter rated CAT III 600V is not simply &quot;600 volts, CAT III flavor&quot; — it&apos;s specifically built to
          survive the kind of transient that distribution-level wiring can actually produce.
        </p>
      </section>

      <section>
        <h2 id="zones" className="text-xl font-semibold mb-3">CAT zones in a typical house</h2>
        <Figure caption={<>Rough CAT zones for a typical home: utility/service entrance (IV), panel and branch wiring (III), outlets and plugged-in loads (II).</>}>
          <HouseZonesDiagram />
        </Figure>
        <DataTable
          head={["Where", "Typical category", "Examples"]}
          rows={[
            ["Utility connection, service entrance, main meter", "CAT IV", "Utility meter, service drop, main disconnect"],
            ["Breaker panel, fixed branch-circuit wiring in walls", "CAT III", "Panel, subpanels, hardwired fixtures and appliances"],
            ["Wall outlets and anything plugged into them", "CAT II", "Lamps, chargers, portable tools, extension cords"],
            ["Low-voltage electronics, battery-powered circuits", "CAT I", "Arduino projects, signal-level circuits"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Most DIY homeowners only ever need CAT III, since the panel is usually the highest-energy point they&apos;ll
          actually open. Electricians who routinely work at the service entrance or utility side need CAT IV.
        </p>
      </section>

      <section>
        <h2 id="voltage" className="text-xl font-semibold mb-3">Why the voltage number matters too</h2>
        <p className="text-muted leading-7 mb-4">
          A CAT rating always comes with a voltage figure, like CAT III 600V. That number is the system voltage the
          rating applies to, not a hard ceiling on what the meter can display. A meter rated CAT III 600V is not
          automatically safer than one rated CAT II 1000V on a 240V circuit — the category matters more than the raw
          voltage number once you&apos;re above the voltage either one covers.
        </p>
        <KeyIdea title="Category first, then voltage">
          When comparing two ratings, the higher category at a given or lower voltage wins. CAT IV 600V is a higher
          safety margin for panel and service-entrance work than CAT II 1000V, even though the voltage number is
          lower.
        </KeyIdea>
      </section>

      <section>
        <h2 id="mistakes" className="text-xl font-semibold mb-3">Common mistakes</h2>
        <DataTable
          head={["Mistake", "Why it's a problem", "Fix"]}
          rows={[
            ["Buying on CAT voltage number alone", "A higher voltage at a lower category can be less protective", "Compare category first, then voltage"],
            ["Trusting the case marking over the manual", "Listings and case silkscreens sometimes overstate the rating", "Check the manufacturer's own manual or spec page"],
            ["Using a CAT II meter at the panel", "Panel work is CAT III territory; CAT II isn't built for it", "Use at least CAT III 600V for panel and branch-circuit work"],
            ["Assuming the leads share the meter's rating", "Leads can be rated lower than the meter body", "Check that your test leads carry a matching CAT rating"],
          ]}
        />
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which rating to buy</h2>
        <p className="text-muted leading-7 mb-6">
          CAT III 600V covers the large majority of home electrical work, including the panel. Go to CAT IV only if
          you expect to work at or near the service entrance.
        </p>
        <ProductStrip
          title="Verified picks by CAT rating"
          items={[
            {
              name: "Extech EX330",
              image: ex330.image,
              alt: "Extech EX330 compact multimeter",
              href: "/multimeters/extech-ex330-review",
              note: "CAT III 600V / CAT II 1000V, a solid default for outlets, switches and most panel work.",
            },
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 True RMS multimeter",
              href: "/multimeters/fluke-117-review",
              note: "CAT III 600V, hands-on tested, built around residential and light-commercial electrical work.",
            },
            {
              name: "Klein Tools MM720",
              image: mm720.image,
              alt: "Klein Tools MM720 CAT IV multimeter",
              href: "/multimeters/best-multimeter-for-electricians",
              note: "CAT IV 600V / CAT III 1000V, worth it if service-entrance work is part of your job.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
