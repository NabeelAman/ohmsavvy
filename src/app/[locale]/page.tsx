import Link from "next/link";
import { Stars } from "@/components/ui/Stars";
import { picks } from "../multimeters/best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";
import { isLocale, LOCALE_LABELS, LOCALES, localeAlternates, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

type Dict = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  sub: string;
  statsLabels: [string, string, string];
  categories: { label: string; desc: string; href: string; guideLabel: string }[];
  featuredLabel: string;
  featuredBottomLine: string;
  featuredCta: string;
  switcherLabel: string;
  disclosure: string;
};

const fluke117 = picks.find((p) => p.name === "Fluke 117")!;

const DICTIONARY: Record<Locale, Dict> = {
  de: {
    metaTitle: "Multimeter-, Oszilloskop- und Lötkolben-Tests",
    metaDescription: "OhmSavvy analysiert Multimeter, Lötkolben und Messgeräte anhand der Spezifikationen, die wirklich zählen — ehrliche Vergleiche, keine bezahlten Platzierungen.",
    eyebrow: "Elektronik-Messgeräte, ehrlich verglichen",
    h1: "Finden Sie das richtige Werkzeug für Ihre Werkbank — nicht das mit dem größten Werbebudget.",
    sub: "OhmSavvy analysiert Multimeter, Lötkolben und Messgeräte anhand der Spezifikationen, die wirklich zählen — CAT-Kategorien, Genauigkeit, thermische Erholung —, damit Sie mit Vertrauen kaufen können.",
    statsLabels: ["Verglichene Produkte", "Spezifikationen mit Herstellerdaten geprüft", "Bezahlte Platzierungen"],
    categories: [
      { label: "Multimeter", desc: "CAT-Sicherheitskategorien, True RMS und automatische Bereichswahl erklärt.", href: "/multimeters/best-multimeters", guideLabel: "Vollständiger Leitfaden (auf Englisch) →" },
      { label: "Lötkolben", desc: "Aufheizzeit, Temperaturregelung und Spitzenauswahl im Vergleich.", href: "/soldering-irons/best-soldering-irons", guideLabel: "Vollständiger Leitfaden (auf Englisch) →" },
      { label: "Oszilloskope", desc: "Bandbreite, Abtastrate und Kanalzahl einfach erklärt.", href: "/oscilloscopes/best-beginner-oscilloscopes", guideLabel: "Vollständiger Leitfaden (auf Englisch) →" },
    ],
    featuredLabel: "Vorgestellter Test",
    featuredBottomLine: "Das Messgerät, das arbeitende Elektriker tatsächlich mit eigenem Geld kaufen, nicht nur das, das von Marken beworben wird.",
    featuredCta: "Vollständigen Test lesen →",
    switcherLabel: "Auch verfügbar auf:",
    disclosure: "OhmSavvy erhält eine Provision für qualifizierte Amazon-Käufe über diese Links, ohne zusätzliche Kosten für Sie.",
  },
  fr: {
    metaTitle: "Multimètres, oscilloscopes, fers à souder",
    metaDescription: "OhmSavvy analyse les multimètres, fers à souder et appareils de mesure selon les spécifications qui comptent vraiment — comparaisons honnêtes, zéro placement payant.",
    eyebrow: "Équipement de test électronique, comparé honnêtement",
    h1: "Trouvez l'outil qui convient vraiment à votre établi, pas celui qui a le plus gros budget pub.",
    sub: "OhmSavvy analyse les multimètres, fers à souder et appareils de mesure selon les spécifications qui comptent vraiment — catégories CAT, précision, récupération thermique — pour que vous puissiez acheter en toute confiance.",
    statsLabels: ["Produits comparés", "Spécifications vérifiées selon le fabricant", "Placements payants"],
    categories: [
      { label: "Multimètres", desc: "Catégories de sécurité CAT, True RMS et calibrage automatique expliqués.", href: "/multimeters/best-multimeters", guideLabel: "Guide complet (en anglais) →" },
      { label: "Fers à souder", desc: "Temps de chauffe, régulation de température et choix de panne comparés.", href: "/soldering-irons/best-soldering-irons", guideLabel: "Guide complet (en anglais) →" },
      { label: "Oscilloscopes", desc: "Bande passante, taux d'échantillonnage et nombre de voies expliqués simplement.", href: "/oscilloscopes/best-beginner-oscilloscopes", guideLabel: "Guide complet (en anglais) →" },
    ],
    featuredLabel: "Avis en vedette",
    featuredBottomLine: "Le multimètre que les électriciens professionnels achètent réellement avec leur propre argent, pas seulement celui que les marques poussent.",
    featuredCta: "Lire l'avis complet →",
    switcherLabel: "Également disponible en :",
    disclosure: "OhmSavvy perçoit une commission sur les achats Amazon éligibles effectués via ces liens, sans frais supplémentaires pour vous.",
  },
  it: {
    metaTitle: "Multimetri, oscilloscopi, saldatori",
    metaDescription: "OhmSavvy analizza multimetri, saldatori e strumenti di misura in base alle specifiche che contano davvero — confronti onesti, nessun posizionamento a pagamento.",
    eyebrow: "Strumenti di test elettronici, confrontati onestamente",
    h1: "Trova lo strumento giusto per il tuo banco di lavoro, non quello con il budget pubblicitario più alto.",
    sub: "OhmSavvy analizza multimetri, saldatori e strumenti di misura in base alle specifiche che contano davvero — categorie CAT, precisione, recupero termico — così puoi acquistare con fiducia.",
    statsLabels: ["Prodotti confrontati", "Specifiche verificate con i dati del produttore", "Posizionamenti a pagamento"],
    categories: [
      { label: "Multimetri", desc: "Categorie di sicurezza CAT, True RMS e selezione automatica del range spiegati.", href: "/multimeters/best-multimeters", guideLabel: "Guida completa (in inglese) →" },
      { label: "Saldatori", desc: "Tempo di riscaldamento, controllo della temperatura e scelta della punta a confronto.", href: "/soldering-irons/best-soldering-irons", guideLabel: "Guida completa (in inglese) →" },
      { label: "Oscilloscopi", desc: "Larghezza di banda, frequenza di campionamento e numero di canali spiegati semplicemente.", href: "/oscilloscopes/best-beginner-oscilloscopes", guideLabel: "Guida completa (in inglese) →" },
    ],
    featuredLabel: "Recensione in evidenza",
    featuredBottomLine: "Lo strumento che gli elettricisti professionisti acquistano davvero con i propri soldi, non solo quello spinto dai marchi.",
    featuredCta: "Leggi la recensione completa →",
    switcherLabel: "Disponibile anche in:",
    disclosure: "OhmSavvy riceve una commissione per gli acquisti Amazon idonei effettuati tramite questi link, senza costi aggiuntivi per te.",
  },
  es: {
    metaTitle: "Multímetros, osciloscopios, soldadores",
    metaDescription: "OhmSavvy analiza multímetros, soldadores y equipos de prueba según las especificaciones que realmente importan — comparaciones honestas, sin colocaciones pagadas.",
    eyebrow: "Equipos de prueba electrónicos, comparados con honestidad",
    h1: "Encuentra la herramienta adecuada para tu banco de trabajo, no la que tiene el mayor presupuesto publicitario.",
    sub: "OhmSavvy analiza multímetros, soldadores y equipos de prueba según las especificaciones que realmente importan: categorías CAT, precisión, recuperación térmica, para que puedas comprar con confianza.",
    statsLabels: ["Productos comparados", "Especificaciones verificadas con datos del fabricante", "Colocaciones pagadas"],
    categories: [
      { label: "Multímetros", desc: "Categorías de seguridad CAT, True RMS y autorrango explicados.", href: "/multimeters/best-multimeters", guideLabel: "Guía completa (en inglés) →" },
      { label: "Soldadores", desc: "Tiempo de calentamiento, control de temperatura y elección de punta comparados.", href: "/soldering-irons/best-soldering-irons", guideLabel: "Guía completa (en inglés) →" },
      { label: "Osciloscopios", desc: "Ancho de banda, tasa de muestreo y número de canales explicados con sencillez.", href: "/oscilloscopes/best-beginner-oscilloscopes", guideLabel: "Guía completa (en inglés) →" },
    ],
    featuredLabel: "Reseña destacada",
    featuredBottomLine: "El multímetro que los electricistas profesionales compran realmente con su propio dinero, no solo el que las marcas promocionan.",
    featuredCta: "Leer la reseña completa →",
    switcherLabel: "También disponible en:",
    disclosure: "OhmSavvy recibe una comisión por las compras elegibles en Amazon realizadas a través de estos enlaces, sin costo adicional para ti.",
  },
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = DICTIONARY[locale];
  return buildMetadata({
    title: d.metaTitle,
    description: d.metaDescription,
    path: `/${locale}`,
    languages: localeAlternates("/"),
  });
}

export default async function LocalizedHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = DICTIONARY[locale];
  const totalProducts = picks.length;

  return (
    <article className="mx-auto max-w-5xl px-6 py-16">
      <p className="font-display text-sm mb-3 tracking-wide text-accent">{d.eyebrow.toUpperCase()}</p>
      <h1 className="text-3xl sm:text-4xl leading-tight max-w-2xl">{d.h1}</h1>
      <p className="mt-5 text-lg text-muted leading-7 max-w-2xl">{d.sub}</p>

      <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-muted">
        <span>{d.switcherLabel}</span>
        <Link href="/" className="text-accent hover:underline">English</Link>
        {LOCALES.filter((l) => l !== locale).map((l) => (
          <Link key={l} href={`/${l}`} className="text-accent hover:underline">
            {LOCALE_LABELS[l]}
          </Link>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-3 gap-4 border-t border-b border-border py-8">
        {[`${totalProducts}`, "100%", "$0"].map((value, i) => (
          <div key={i}>
            <p className="text-2xl sm:text-3xl font-display text-accent">{value}</p>
            <p className="mt-1 text-xs sm:text-sm text-muted">{d.statsLabels[i]}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 grid sm:grid-cols-3 gap-5">
        {d.categories.map((c) => (
          <div key={c.href} className="rounded-lg border border-border bg-surface p-5">
            <p className="font-semibold">{c.label}</p>
            <p className="mt-2 text-sm text-muted leading-6">{c.desc}</p>
            <Link href={c.href} className="mt-3 inline-block text-sm font-medium text-accent hover:underline">
              {c.guideLabel}
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-14">
        <p className="font-display text-xs text-muted uppercase tracking-wide mb-4">{d.featuredLabel}</p>
        <Link
          href={`/${locale}/multimeters/fluke-117-review`}
          className="flex flex-col sm:flex-row items-center gap-6 rounded-lg border border-border bg-surface-raised p-6 hover:border-accent transition-colors"
        >
          {fluke117.image ? (
            <div className="relative h-32 w-32 shrink-0 flex items-center justify-center bg-surface rounded-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={fluke117.image} alt={fluke117.name} className="h-full w-full object-contain p-3" />
            </div>
          ) : null}
          <div className="min-w-0">
            <p className="font-semibold text-lg">{fluke117.name}</p>
            <Stars rating={fluke117.rating} />
            <p className="mt-2 text-sm text-muted leading-6">{d.featuredBottomLine}</p>
            <span className="mt-2 inline-block text-sm font-medium text-accent">{d.featuredCta}</span>
          </div>
        </Link>
      </div>

      <p className="mt-10 text-xs text-muted leading-5 border-t border-border pt-6">{d.disclosure}</p>
    </article>
  );
}
