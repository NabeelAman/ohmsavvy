import Link from "next/link";
import { notFound } from "next/navigation";
import { Stars } from "@/components/ui/Stars";
import { picks } from "../../../multimeters/best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";
import { isLocale, LOCALE_LABELS, LOCALES, localeAlternates, type Locale } from "@/lib/i18n";

const pick = picks.find((p) => p.name === "Fluke 117")!;

type Dict = {
  metaTitle: string;
  metaDescription: string;
  heading: string;
  labels: {
    considerIf: string;
    skipIf: string;
    tradeOff: string;
    specs: string;
    strengths: string;
    assessment: string;
    faqs: string;
    whereToBuy: string;
    checkPrice: string;
    priceNote: string;
    bestFor: string;
    specLabels: { accuracy: string; safety: string; autoRanging: string; bestFor: string };
    specValues: { bestFor: string; autoRangingYes: string };
  };
  bottomLine: string;
  considerIf: string[];
  skipIf: string[];
  tradeOffs: string;
  assessment: { heading: string; body: string }[];
  faqs: { q: string; a: string }[];
  pros: string[];
  cons: string[];
  switcherLabel: string;
  disclosure: string;
};

const DICTIONARY: Record<Locale, Dict> = {
  de: {
    metaTitle: "Fluke 117 Testbericht",
    metaDescription: "Ein ausführlicher Blick auf die True-RMS-Genauigkeit, die CAT-III-600V-Sicherheitskategorie und die berührungslose Spannungserkennung des Fluke 117.",
    heading: "Fluke 117 Testbericht",
    labels: {
      considerIf: "In Betracht ziehen, wenn",
      skipIf: "Nicht geeignet, wenn",
      tradeOff: "Der Kompromiss:",
      specs: "Wichtige technische Daten",
      strengths: "Stärken und Einschränkungen",
      assessment: "Leistungsbewertung",
      faqs: "Häufig gestellte Fragen",
      whereToBuy: "Wo kaufen",
      checkPrice: "Preis bei Amazon prüfen →",
      priceNote: "Aktueller Preis und Verfügbarkeit auf Amazon",
      bestFor: "Am besten geeignet für",
      specLabels: { accuracy: "Genauigkeit", safety: "Sicherheitskategorie", autoRanging: "Automatische Bereichswahl", bestFor: "Am besten geeignet für" },
      specValues: { bestFor: "Elektriker, ambitionierte Hobbyisten", autoRangingYes: "Ja" },
    },
    bottomLine: "Das Messgerät, das arbeitende Elektriker tatsächlich mit eigenem Geld kaufen, nicht nur das, das von Marken beworben wird.",
    considerIf: [
      "Sie arbeiten an Hausverteilern und fest verlegten Leitungen, wo CAT III 600V die richtige Kategorie ist",
      "Sie möchten einen integrierten berührungslosen Spannungsprüfer",
      "Sie benötigen ein Messgerät, das für den täglichen Einsatz im Feld robust genug ist",
    ],
    skipIf: [
      "Sie benötigen ein Messgerät nur wenige Male im Jahr für einfache Hausprüfungen — der Aufpreis lohnt sich bei gelegentlicher Nutzung nicht",
      "Sie möchten Bluetooth- oder App-Konnektivität",
      "Sie benötigen speziell CAT-IV-Schutz — dafür ist das Fluke 87V gedacht",
    ],
    tradeOffs: "Sie zahlen einen Aufpreis gegenüber Mittelklasse-Messgeräten wie dem Klein Tools MM400 für Flukes gut dokumentierte Zuverlässigkeit und den integrierten NCV-Detektor, nicht für eine höhere Sicherheitskategorie oder zusätzliche Auflösung.",
    assessment: [
      {
        heading: "Sicherheit und Genauigkeit",
        body: "CAT III 600V deckt Hausverteiler und fest verlegte Gebäudeleitungen ab, und True RMS hält Wechselspannungsmessungen auch bei nicht-sinusförmigen Lasten genau. Die automatische Bereichswahl sorgt für schnelles Arbeiten.",
      },
      {
        heading: "Berührungslose Spannungserkennung",
        body: "Der integrierte NCV-Detektor ermöglicht eine schnelle erste Prüfung auf Spannung, bevor die Messspitzen den Stromkreis überhaupt berühren — eine praktische Sicherheitsgewohnheit für alle, die an Gebäudeleitungen arbeiten.",
      },
    ],
    faqs: [
      {
        q: "Ist das Fluke 117 gut für Elektroarbeiten im Haus geeignet?",
        a: "Es ist gut geeignet, mit CAT III 600V und True RMS. Für gelegentliche einfache Prüfungen reicht möglicherweise ein günstigeres Messgerät aus unserem Leitfaden für den Hausgebrauch.",
      },
      {
        q: "Fluke 117 oder Fluke 87V?",
        a: "Das 117 deckt Wohn- und leichte Gewerbearbeiten ab. Das 87V bietet zusätzlich CAT IV 600V / CAT III 1000V Schutz, einen hochauflösenden Modus mit 19.999 Counts und eine analoge Bargraph-Anzeige für den industriellen Einsatz.",
      },
    ],
    pros: ["Bewährte, gut dokumentierte Zuverlässigkeit", "Integrierte berührungslose Spannungserkennung (NCV)", "Robust genug für den täglichen Feldeinsatz"],
    cons: ["Hoher Preis für gelegentliche Hobbynutzer", "Keine Bluetooth-/App-Konnektivität"],
    switcherLabel: "Auch verfügbar auf:",
    disclosure: "OhmSavvy erhält eine Provision für qualifizierte Amazon-Käufe über diese Links, ohne zusätzliche Kosten für Sie.",
  },
  fr: {
    metaTitle: "Avis sur le Fluke 117",
    metaDescription: "Un examen détaillé de la précision True RMS, de la catégorie de sécurité CAT III 600V et de la détection de tension sans contact du Fluke 117.",
    heading: "Avis sur le Fluke 117",
    labels: {
      considerIf: "À envisager si",
      skipIf: "À éviter si",
      tradeOff: "Le compromis :",
      specs: "Spécifications clés",
      strengths: "Points forts et limites",
      assessment: "Évaluation des performances",
      faqs: "Questions fréquentes",
      whereToBuy: "Où acheter",
      checkPrice: "Voir le prix sur Amazon →",
      priceNote: "Prix et disponibilité actuels sur Amazon",
      bestFor: "Idéal pour",
      specLabels: { accuracy: "Précision", safety: "Catégorie de sécurité", autoRanging: "Calibrage automatique", bestFor: "Idéal pour" },
      specValues: { bestFor: "Électriciens, bricoleurs expérimentés", autoRangingYes: "Oui" },
    },
    bottomLine: "Le multimètre que les électriciens professionnels achètent réellement avec leur propre argent, pas seulement celui que les marques poussent.",
    considerIf: [
      "Vous travaillez sur des tableaux électriques résidentiels et du câblage fixe, où CAT III 600V est la catégorie appropriée",
      "Vous voulez un détecteur de tension sans contact intégré",
      "Vous voulez un multimètre assez robuste pour un usage quotidien sur le terrain",
    ],
    skipIf: [
      "Vous n'avez besoin d'un multimètre que quelques fois par an pour des vérifications domestiques basiques — le surcoût n'est pas justifié pour un usage occasionnel",
      "Vous voulez la connectivité Bluetooth ou une application",
      "Vous avez spécifiquement besoin d'une protection CAT IV — c'est le rôle du Fluke 87V",
    ],
    tradeOffs: "Vous payez un surcoût par rapport aux multimètres milieu de gamme comme le Klein Tools MM400 pour la fiabilité bien documentée de Fluke et le détecteur NCV intégré, pas pour une catégorie de sécurité supérieure ou une résolution accrue.",
    assessment: [
      {
        heading: "Sécurité et précision",
        body: "Le CAT III 600V couvre les tableaux résidentiels et le câblage fixe des bâtiments, et le True RMS garde les mesures CA précises sur des charges non sinusoïdales. Le calibrage automatique permet de travailler rapidement.",
      },
      {
        heading: "Détection de tension sans contact",
        body: "Le détecteur NCV intégré permet une première vérification rapide de la présence de tension avant même que les pointes de touche ne touchent le circuit — une habitude de sécurité pratique pour quiconque travaille sur le câblage d'un bâtiment.",
      },
    ],
    faqs: [
      {
        q: "Le Fluke 117 convient-il aux travaux électriques domestiques ?",
        a: "Il convient parfaitement, avec CAT III 600V et True RMS. Pour des vérifications basiques occasionnelles, un multimètre moins cher de notre guide pour la maison peut suffire.",
      },
      {
        q: "Fluke 117 ou Fluke 87V ?",
        a: "Le 117 couvre les travaux résidentiels et commerciaux légers. Le 87V ajoute une protection CAT IV 600V / CAT III 1000V, un mode haute résolution à 19 999 points et un bargraphe analogique pour un usage industriel.",
      },
    ],
    pros: ["Fiabilité éprouvée et bien documentée", "Détection de tension sans contact (NCV) intégrée", "Assez robuste pour un usage quotidien sur le terrain"],
    cons: ["Prix élevé pour un usage occasionnel", "Pas de connectivité Bluetooth/application"],
    switcherLabel: "Également disponible en :",
    disclosure: "OhmSavvy perçoit une commission sur les achats Amazon éligibles effectués via ces liens, sans frais supplémentaires pour vous.",
  },
  it: {
    metaTitle: "Recensione del Fluke 117",
    metaDescription: "Uno sguardo approfondito alla precisione True RMS, alla categoria di sicurezza CAT III 600V e al rilevamento di tensione senza contatto del Fluke 117.",
    heading: "Recensione del Fluke 117",
    labels: {
      considerIf: "Da considerare se",
      skipIf: "Da evitare se",
      tradeOff: "Il compromesso:",
      specs: "Specifiche principali",
      strengths: "Punti di forza e limiti",
      assessment: "Valutazione delle prestazioni",
      faqs: "Domande frequenti",
      whereToBuy: "Dove acquistare",
      checkPrice: "Controlla il prezzo su Amazon →",
      priceNote: "Prezzo e disponibilità attuali su Amazon",
      bestFor: "Ideale per",
      specLabels: { accuracy: "Precisione", safety: "Categoria di sicurezza", autoRanging: "Auto-range", bestFor: "Ideale per" },
      specValues: { bestFor: "Elettricisti, hobbisti esperti", autoRangingYes: "Sì" },
    },
    bottomLine: "Lo strumento che gli elettricisti professionisti acquistano davvero con i propri soldi, non solo quello spinto dai marchi.",
    considerIf: [
      "Lavori su quadri elettrici residenziali e cablaggi fissi, dove CAT III 600V è la categoria corretta",
      "Vuoi un rilevatore di tensione senza contatto integrato",
      "Vuoi uno strumento abbastanza robusto per l'uso quotidiano sul campo",
    ],
    skipIf: [
      "Ti serve uno strumento solo poche volte all'anno per controlli domestici di base — il sovrapprezzo non si giustifica per un uso occasionale",
      "Vuoi la connettività Bluetooth o un'app",
      "Ti serve specificamente la protezione CAT IV — è a questo che serve il Fluke 87V",
    ],
    tradeOffs: "Paghi un sovrapprezzo rispetto a strumenti di fascia media come il Klein Tools MM400 per l'affidabilità ben documentata di Fluke e il rilevatore NCV integrato, non per una categoria di sicurezza superiore o una risoluzione maggiore.",
    assessment: [
      {
        heading: "Sicurezza e precisione",
        body: "CAT III 600V copre i quadri residenziali e il cablaggio fisso degli edifici, e True RMS mantiene accurate le letture CA anche su carichi non sinusoidali. L'auto-range mantiene l'uso rapido.",
      },
      {
        heading: "Rilevamento di tensione senza contatto",
        body: "Il rilevatore NCV integrato consente un controllo rapido della presenza di tensione prima ancora che i puntali tocchino il circuito — un'abitudine di sicurezza pratica per chi lavora sui cablaggi degli edifici.",
      },
    ],
    faqs: [
      {
        q: "Il Fluke 117 è adatto per lavori elettrici domestici?",
        a: "È adatto, con CAT III 600V e True RMS. Per controlli di base occasionali, uno strumento più economico dalla nostra guida per la casa potrebbe bastare.",
      },
      {
        q: "Fluke 117 o Fluke 87V?",
        a: "Il 117 copre lavori residenziali e commerciali leggeri. L'87V aggiunge protezione CAT IV 600V / CAT III 1000V, una modalità ad alta risoluzione a 19.999 conteggi e un grafico a barre analogico per uso industriale.",
      },
    ],
    pros: ["Affidabilità consolidata e ben documentata", "Rilevamento di tensione senza contatto (NCV) integrato", "Abbastanza robusto per l'uso quotidiano sul campo"],
    cons: ["Prezzo elevato per un uso hobbistico occasionale", "Nessuna connettività Bluetooth/app"],
    switcherLabel: "Disponibile anche in:",
    disclosure: "OhmSavvy riceve una commissione per gli acquisti Amazon idonei effettuati tramite questi link, senza costi aggiuntivi per te.",
  },
  es: {
    metaTitle: "Reseña del Fluke 117",
    metaDescription: "Un análisis detallado de la precisión True RMS, la categoría de seguridad CAT III 600V y la detección de voltaje sin contacto del Fluke 117.",
    heading: "Reseña del Fluke 117",
    labels: {
      considerIf: "Considéralo si",
      skipIf: "Evítalo si",
      tradeOff: "El compromiso:",
      specs: "Especificaciones clave",
      strengths: "Fortalezas y limitaciones",
      assessment: "Evaluación de rendimiento",
      faqs: "Preguntas frecuentes",
      whereToBuy: "Dónde comprar",
      checkPrice: "Ver precio en Amazon →",
      priceNote: "Precio y disponibilidad actuales en Amazon",
      bestFor: "Ideal para",
      specLabels: { accuracy: "Precisión", safety: "Categoría de seguridad", autoRanging: "Autorrango", bestFor: "Ideal para" },
      specValues: { bestFor: "Electricistas, aficionados experimentados", autoRangingYes: "Sí" },
    },
    bottomLine: "El multímetro que los electricistas profesionales compran realmente con su propio dinero, no solo el que las marcas promocionan.",
    considerIf: [
      "Trabajas en paneles residenciales y cableado fijo, donde CAT III 600V es la categoría adecuada",
      "Quieres un detector de voltaje sin contacto integrado",
      "Quieres un multímetro lo bastante resistente para uso diario en campo",
    ],
    skipIf: [
      "Solo necesitas un multímetro algunas veces al año para comprobaciones básicas en casa — el sobreprecio no se justifica para un uso ocasional",
      "Quieres conectividad Bluetooth o una app",
      "Necesitas específicamente protección CAT IV — para eso está el Fluke 87V",
    ],
    tradeOffs: "Pagas un sobreprecio frente a multímetros de gama media como el Klein Tools MM400 por la fiabilidad bien documentada de Fluke y el detector NCV integrado, no por una categoría de seguridad superior ni mayor resolución.",
    assessment: [
      {
        heading: "Seguridad y precisión",
        body: "CAT III 600V cubre paneles residenciales y cableado fijo de edificios, y True RMS mantiene precisas las lecturas de CA incluso en cargas no sinusoidales. El autorrango agiliza el uso.",
      },
      {
        heading: "Detección de voltaje sin contacto",
        body: "El detector NCV integrado permite una comprobación rápida de presencia de voltaje antes de que las puntas toquen el circuito — un hábito de seguridad práctico para quien trabaja en el cableado de edificios.",
      },
    ],
    faqs: [
      {
        q: "¿Es bueno el Fluke 117 para trabajos eléctricos domésticos?",
        a: "Es muy adecuado, con CAT III 600V y True RMS. Para comprobaciones básicas ocasionales, un multímetro más económico de nuestra guía para el hogar puede ser suficiente.",
      },
      {
        q: "¿Fluke 117 o Fluke 87V?",
        a: "El 117 cubre trabajos residenciales y comerciales ligeros. El 87V añade protección CAT IV 600V / CAT III 1000V, un modo de alta resolución de 19.999 cuentas y un gráfico de barras analógico para uso industrial.",
      },
    ],
    pros: ["Fiabilidad probada y bien documentada", "Detección de voltaje sin contacto (NCV) integrada", "Lo bastante resistente para uso diario en campo"],
    cons: ["Precio elevado para uso ocasional como aficionado", "Sin conectividad Bluetooth/app"],
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
    path: `/${locale}/multimeters/fluke-117-review`,
    image: pick.image,
    languages: localeAlternates("/multimeters/fluke-117-review"),
  });
}

export default async function LocalizedFluke117ReviewPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = DICTIONARY[locale];

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl sm:text-4xl leading-tight">{d.heading}</h1>
      <p className="mt-4 text-lg text-muted leading-7">{d.bottomLine}</p>

      <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-muted">
        <span>{d.switcherLabel}</span>
        <Link href="/multimeters/fluke-117-review" className="py-1 text-accent hover:underline">English</Link>
        {LOCALES.filter((l) => l !== locale).map((l) => (
          <Link key={l} href={`/${l}/multimeters/fluke-117-review`} className="py-1 text-accent hover:underline">
            {LOCALE_LABELS[l]}
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-xl border-2 border-accent/40 bg-surface shadow-md overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 bg-accent/10 border-b border-border">
          <span className="text-xs font-display uppercase tracking-wide text-accent">{pick.badge}</span>
          <Stars rating={pick.rating} />
        </div>
        <div className="grid md:grid-cols-[240px_1fr]">
          <div className="h-56 flex items-center justify-center bg-gradient-to-b from-surface-raised to-surface border-b md:border-b-0 md:border-r border-border">
            {pick.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={pick.image} alt={pick.name} className="max-h-full max-w-full object-contain p-6" />
            ) : null}
          </div>
          <div className="flex flex-col justify-center gap-3 p-5">
            <p className="font-semibold text-lg">{pick.name}</p>
            <a
              href={pick.ctaHref}
              target="_blank"
              rel="noopener sponsored"
              className="inline-flex items-center justify-center rounded-md bg-accent text-accent-foreground px-4 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              {d.labels.checkPrice}
            </a>
            <p className="text-xs text-muted">{d.labels.priceNote}</p>
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-10">
        <section>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-lg border border-border bg-surface p-5">
              <p className="font-display text-xs text-signal uppercase tracking-wide mb-3">{d.labels.considerIf}</p>
              <ul className="space-y-2 text-sm">
                {d.considerIf.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-signal">✓</span>
                    <span className="text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-surface p-5">
              <p className="font-display text-xs text-accent uppercase tracking-wide mb-3">{d.labels.skipIf}</p>
              <ul className="space-y-2 text-sm">
                {d.skipIf.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-accent">✕</span>
                    <span className="text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-6 text-muted leading-7">
            <span className="font-medium text-foreground">{d.labels.tradeOff} </span>
            {d.tradeOffs}
          </p>
        </section>

        <section className="grid sm:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">{d.labels.specs}</h2>
            <dl className="text-sm divide-y divide-border rounded-lg border border-border overflow-hidden">
              {[
                [d.labels.specLabels.accuracy, pick.specs[0]?.value],
                [d.labels.specLabels.safety, pick.specs[1]?.value],
                [d.labels.specLabels.autoRanging, d.labels.specValues.autoRangingYes],
                [d.labels.specLabels.bestFor, d.labels.specValues.bestFor],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 px-4 py-2.5 bg-surface">
                  <dt className="text-muted">{label}</dt>
                  <dd className="font-medium text-right">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">{d.labels.strengths}</h2>
            <div className="rounded-lg border border-border bg-surface p-5">
              <ul className="space-y-2 text-sm">
                {d.pros.map((p) => (
                  <li key={p} className="flex gap-2"><span className="text-signal">+</span><span>{p}</span></li>
                ))}
                {d.cons.map((c) => (
                  <li key={c} className="flex gap-2"><span className="text-accent">−</span><span className="text-muted">{c}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{d.labels.assessment}</h2>
          <div className="space-y-6">
            {d.assessment.map((a) => (
              <div key={a.heading}>
                <h3 className="text-lg font-semibold mb-2">{a.heading}</h3>
                <p className="text-muted leading-7">{a.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{d.labels.faqs}</h2>
          <div className="space-y-3">
            {d.faqs.map((faq) => (
              <details key={faq.q} className="group rounded-lg border border-border bg-surface p-5">
                <summary className="cursor-pointer font-medium list-none flex justify-between gap-4">
                  {faq.q}
                  <span className="text-accent group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted leading-6">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-border bg-surface-raised p-6">
          <h2 className="text-xl font-semibold mb-3">{d.labels.whereToBuy}</h2>
          <a
            href={pick.ctaHref}
            target="_blank"
            rel="noopener sponsored"
            className="inline-flex items-center justify-center rounded-md bg-accent text-accent-foreground px-4 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            {d.labels.checkPrice}
          </a>
        </section>
      </div>

      <p className="mt-10 text-xs text-muted leading-5 border-t border-border pt-6">{d.disclosure}</p>
    </article>
  );
}
