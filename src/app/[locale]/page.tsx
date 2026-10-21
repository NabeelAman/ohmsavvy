import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentCard } from "@/components/ContentCard";
import { FaqAccordion } from "@/components/FaqAccordion";
import { GuideCard } from "@/components/GuideCard";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Stars } from "@/components/ui/Stars";
import { content, type Category, type ContentEntry } from "@/lib/content";
import { skipOptimizer } from "@/lib/images";
import { isLocale, LOCALE_LABELS, LOCALES, localeAlternates, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { picks as multimeterPicks } from "../multimeters/best-multimeters/page";
import { picks as solderingIronPicks } from "../soldering-irons/best-soldering-irons/page";
import { picks as oscilloscopePicks } from "../oscilloscopes/best-beginner-oscilloscopes/page";

// Mirrors src/app/page.tsx's structure and data wiring exactly — only the
// chrome text is translated. Card titles/descriptions for reviews,
// comparisons, and guides stay in English (reusing ContentCard/GuideCard
// directly) because those destination pages aren't translated yet; this is
// the same honest trade-off as the Fluke 117 review's "alternatives" list.
type Tone = { text: string; bg: string; border: string; soft: string };

const CATEGORY_KEYS: Category[] = ["multimeters", "soldering-irons", "oscilloscopes"];
const TONES: Record<Category, Tone> = {
  multimeters: { text: "text-cat-multimeters", bg: "bg-cat-multimeters", border: "border-cat-multimeters", soft: "from-cat-multimeters/15" },
  "soldering-irons": { text: "text-cat-soldering", bg: "bg-cat-soldering", border: "border-cat-soldering", soft: "from-cat-soldering/15" },
  oscilloscopes: { text: "text-cat-oscilloscopes", bg: "bg-cat-oscilloscopes", border: "border-cat-oscilloscopes", soft: "from-cat-oscilloscopes/15" },
};
const ROUNDUPS: Record<Category, string> = {
  multimeters: "/multimeters/best-multimeters",
  "soldering-irons": "/soldering-irons/best-soldering-irons",
  oscilloscopes: "/oscilloscopes/best-beginner-oscilloscopes",
};
const PICKS: Record<Category, typeof multimeterPicks> = {
  multimeters: multimeterPicks,
  "soldering-irons": solderingIronPicks,
  oscilloscopes: oscilloscopePicks,
};

const ofType = (category: Category, type: ContentEntry["type"]) =>
  content.filter((e) => e.category === category && e.type === type);
const reviewHrefFor = (name: string) => content.find((e) => e.type === "review" && e.title === `${name} Review`)?.href;

const totalProducts = CATEGORY_KEYS.reduce((sum, c) => sum + PICKS[c].length, 0);
const totalReviews = content.filter((e) => e.type === "review").length;
const totalGuides = content.filter((e) => e.type !== "review" && e.type !== "comparison").length;

const topPicks = CATEGORY_KEYS.map((category) => {
  const p = PICKS[category][0];
  return { ...p, category, reviewHref: reviewHrefFor(p.name) ?? ROUNDUPS[category] };
});

const topPickNames = new Set(topPicks.map((p) => p.name));
const latestReviews = CATEGORY_KEYS.flatMap((cat) =>
  ofType(cat, "review").filter((e) => ![...topPickNames].some((n) => e.title.startsWith(n))).slice(0, 2),
);
const featuredComparisons = CATEGORY_KEYS.flatMap((cat) => ofType(cat, "comparison").slice(0, 1));
// Two use-case guides per category as cards; the rest as compact links.
const useCaseGuides = CATEGORY_KEYS.flatMap((cat) => ofType(cat, "use-case-guide").slice(0, 2));
const moreUseCases = CATEGORY_KEYS.flatMap((cat) => ofType(cat, "use-case-guide").slice(2));

const FEATURED_HOWTO = [
  "/multimeters/how-to-use-a-multimeter",
  "/soldering-irons/how-to-use-a-soldering-iron",
  "/oscilloscopes/how-to-use-an-oscilloscope",
];
const featuredHowTos = FEATURED_HOWTO.map((h) => content.find((e) => e.href === h)).filter((e): e is ContentEntry => !!e);
const otherHowTos = content.filter((e) => e.type === "how-to-guide" && !FEATURED_HOWTO.includes(e.href));
const buyingGuides = content.filter((e) => e.type === "buying-guide");

const CAROUSEL =
  "-mx-6 px-6 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:overflow-visible sm:pb-0";
const CAROUSEL_ITEM = "snap-start shrink-0 w-[82%] sm:w-auto flex [&>*]:w-full";

type Step = { title: string; desc: string };
type Faq = { q: string; a: string };

type Dict = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  sub: string;
  popularLabel: string;
  quickLinks: string[];
  topPicksPanelLabel: string;
  howWePickLabel: string;
  handsOnTestedLabel: string;
  checkPriceLabel: string;
  reviewLabel: string;
  trustStrip: [string, string, string, string];
  categoryHub: { eyebrow: string; title: string; intro: string };
  categoryLabels: [string, string, string];
  roundupTitles: [string, string, string];
  categoryBlurbs: [string, string, string];
  topPickLabel: string;
  reviewsWord: string;
  comparisonsWord: string;
  seeAll: (n: number, m: number) => string;
  reviewsSection: { eyebrow: string; title: string };
  useCaseSection: { eyebrow: string; title: string; intro: string };
  comparisonsSection: { eyebrow: string; title: string };
  learnSection: { eyebrow: string; title: string; intro: string; startHereLabel: string; readGuideLabel: string; buyingGuidesLabel: string; howToGuidesLabel: string };
  learnCols: { allGuides: (n: number) => string; guidesCount: (n: number) => string; buyingTag: string };
  moreUseCasesLabel: string;
  guidesWord: string;
  howWeReview: { eyebrow: string; title: string; links: [string, string]; steps: [Step, Step, Step, Step]; handsOnTestedNote: string };
  faq: { eyebrow: string; title: string; intro: string; detailLabel: string; howWeTest: string; howFunded: string; items: Faq[] };
  switcherLabel: string;
  inEnglishSuffix: string;
  disclosure: string;
};

const DICTIONARY: Record<Locale, Dict> = {
  de: {
    metaTitle: "Multimeter-, Oszilloskop- und Lötkolben-Tests",
    metaDescription: "OhmSavvy analysiert Multimeter, Lötkolben und Messgeräte anhand der Spezifikationen, die wirklich zählen — ehrliche Vergleiche, keine bezahlten Platzierungen.",
    eyebrow: "Elektronik-Messgeräte, ehrlich verglichen",
    h1: "Finden Sie das richtige Werkzeug für Ihre Werkbank — nicht das mit dem größten Werbebudget.",
    sub: "Unabhängige Tests, Vergleiche und Anleitungen für Multimeter, Lötkolben und Oszilloskope, bewertet nach den Spezifikationen, die wirklich zählen, damit Sie mit Vertrauen kaufen können.",
    popularLabel: "Beliebt:",
    quickLinks: ["Beste Multimeter", "Beste Lötkolben", "Oszilloskope für Einsteiger", "Multimeter benutzen", "Oszilloskop benutzen"],
    topPicksPanelLabel: "Top-Empfehlungen aktuell",
    howWePickLabel: "Wie wir auswählen →",
    handsOnTestedLabel: "✓ In der Praxis getestet",
    checkPriceLabel: "Preis bei Amazon prüfen",
    reviewLabel: "Test",
    trustStrip: ["verglichene Produkte", "ausführliche Tests", "Kauf- & Anleitungsratgeber", "bezahlte Platzierungen"],
    categoryHub: { eyebrow: "Nach Kategorie durchsuchen", title: "Beginnen Sie mit dem passenden Werkzeug", intro: "Jede Kategorie bietet eine Rangliste, einzelne Tests, direkte Vergleiche und Ratgeber, die die Spezifikationen erklären." },
    categoryLabels: ["Multimeter", "Lötkolben", "Oszilloskope"],
    roundupTitles: ["Beste Multimeter", "Beste Lötkolben", "Beste Oszilloskope für Einsteiger"],
    categoryBlurbs: [
      "CAT-Sicherheitskategorien, True RMS und Genauigkeit — vom ersten Messgerät bis zum panel-tauglichen Elektrikerwerkzeug.",
      "Aufheizzeit, Temperaturstabilität und Lötspitzen — vom tragbaren Stift bis zur vollwertigen Werkbankstation.",
      "Bandbreite, Abtastrate und Kanäle einfach erklärt — vom Taschenoszilloskop bis zur Vierkanal-Werkbank.",
    ],
    topPickLabel: "Top-Empfehlung:",
    reviewsWord: "Tests",
    comparisonsWord: "Vergleiche",
    seeAll: (n, m) => `Alle ${n} Produkte ansehen · ${m} Ratgeber`,
    reviewsSection: { eyebrow: "Ausführliche Tests", title: "Ausführliche Produkttests" },
    useCaseSection: { eyebrow: "Nach Einsatzzweck", title: "Wählen Sie nach dem, was Sie tatsächlich vorhaben", intro: "Nicht sicher, welches Werkzeug passt? Starten Sie bei der Aufgabe: Schalttafelarbeiten, Kfz-Diagnose, Platinenreparatur oder das erste Heimlabor." },
    comparisonsSection: { eyebrow: "Direkter Vergleich", title: "Vergleiche für knappe Entscheidungen" },
    learnSection: { eyebrow: "Grundlagen lernen", title: "Ratgeber, die die Spezifikationen vor dem Kauf erklären", intro: "Verständliche Anleitungen und Kaufratgeber mit Diagrammen, Beispielen und Sicherheitshinweisen.", startHereLabel: "Hier starten", readGuideLabel: "Ratgeber lesen →", buyingGuidesLabel: "Kaufratgeber", howToGuidesLabel: "Anleitungen" },
    learnCols: { allGuides: (n) => `Alle ${n} Ratgeber`, guidesCount: (n) => `${n} Ratgeber`, buyingTag: "Kauf" },
    moreUseCasesLabel: "Weitere Empfehlungen nach Einsatz:",
    guidesWord: "Ratgeber",
    howWeReview: {
      eyebrow: "Wie wir testen",
      title: "Ein Standard, gleich angewendet auf jedes Produkt",
      links: ["Über unser Team und Labor", "Wie wir uns finanzieren"],
      steps: [
        { title: "Spezifikationen aus erster Hand", desc: "Jede Spezifikation wird mit dem Datenblatt oder der offiziellen Produktseite des Herstellers abgeglichen, nicht mit Marketingtexten. Bei Unklarheiten sagen wir das offen." },
        { title: "Verglichen nach dem, was zählt", desc: "Jede Kategorie wird anhand der Spezifikationen bewertet, die den tatsächlichen Einsatz entscheiden: CAT-Kategorien und True RMS, Aufheizzeit und Stabilität, Bandbreite und Abtastrate." },
        { title: "Top-Empfehlungen in unserem Labor getestet", desc: "Unser Testteam kauft jedes Produkt, das wir mit 4,8 bewerten, und setzt es in unserem Labor ein. Diese Produkte tragen das Abzeichen \"In der Praxis getestet\"; alle anderen sind klar als spezifikationsbasierte Recherche gekennzeichnet." },
        { title: "Ehrlich und aktuell gehalten", desc: "Keine gesponserten Empfehlungen oder Markenabsprachen. Wenn sich eine Spezifikation als falsch herausstellt oder ein Produkt eingestellt wird, korrigieren wir die Seite, sobald wir es bemerken." },
      ],
      handsOnTestedNote: "kennzeichnet ein Produkt, das unser Testteam gekauft und genutzt hat. Jeder andere Test gibt offen an, dass es sich um spezifikationsbasierte Recherche handelt.",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Häufige Fragen zu dieser Website",
      intro: "Wie wir Geld verdienen, wie wir testen und wie Sie sich zurechtfinden. Kurze, klare Antworten.",
      detailLabel: "Mehr erfahren",
      howWeTest: "So testen und bewerten wir",
      howFunded: "So finanzieren wir uns",
      items: [
        { q: "Ich bin neu in der Elektronik. Wo fange ich an?", a: "Beginnen Sie mit unseren drei Einsteiger-Ratgebern: How to Use a Multimeter, How to Use a Soldering Iron und How to Use an Oscilloscope (auf Englisch). Jeder führt Schritt für Schritt durch die erste Anwendung, mit den wichtigen Sicherheitschecks. Wenn Sie kaufen möchten, beginnt jede Kategorie-Rangliste mit unserer Top-Empfehlung und der besten Option für Einsteiger." },
        { q: "Wie verdient OhmSavvy Geld?", a: "Durch Amazon-Partnerprovisionen, wenn Sie über einen Link auf dieser Seite kaufen, ohne Mehrkosten für Sie. Das ist die einzige Einnahmequelle — keine Werbung, keine gesponserten Platzierungen, keine Herstellerzahlungen für eine positive Bewertung." },
        { q: "Testen Sie die Produkte wirklich selbst?", a: "Unsere Top-Empfehlungen ja. Unser Testteam kauft jedes Produkt, das wir mit 4,8 bewerten, und setzt es in unserem Labor ein — diese tragen das Abzeichen \"In der Praxis getestet\". Jeder andere Test ist Schreibtischrecherche: jede Spezifikation mit den Herstellerdaten oder der offiziellen Amazon-Liste abgeglichen, plus Muster aus verifizierten Käuferbewertungen. Jeder Test gibt offen an, um welche Art es sich handelt." },
        { q: "Warum haben manche Produkte keine Fotos?", a: "Wir zeigen lieber kein Foto als ein falsches. Wenn wir kein Bild finden, das wir visuell dem genauen Modell zuordnen können — kein Foto eines ähnlichen Schwestermodells —, zeigen wir stattdessen eine klar gekennzeichnete Illustration mit \"Photo coming soon\", statt zu raten." },
        { q: "Wie oft werden die Empfehlungen aktualisiert?", a: "Wir überprüfen Preise, Verfügbarkeit und Rangfolge regelmäßig, nicht nach festem Zeitplan. Wenn sich eine Spezifikation als falsch herausstellt oder ein Produkt eingestellt wird, korrigieren wir es, sobald wir es bemerken." },
      ],
    },
    switcherLabel: "Auch verfügbar auf:",
    inEnglishSuffix: " (auf Englisch)",
    disclosure: "OhmSavvy erhält eine Provision für qualifizierte Amazon-Käufe über diese Links, ohne zusätzliche Kosten für Sie.",
  },
  fr: {
    metaTitle: "Multimètres, oscilloscopes, fers à souder",
    metaDescription: "OhmSavvy analyse les multimètres, fers à souder et appareils de mesure selon les spécifications qui comptent vraiment — comparaisons honnêtes, zéro placement payant.",
    eyebrow: "Équipement de test électronique, comparé honnêtement",
    h1: "Trouvez l'outil qui convient vraiment à votre établi, pas celui qui a le plus gros budget pub.",
    sub: "Avis indépendants, comparaisons et guides pratiques pour multimètres, fers à souder et oscilloscopes, évalués selon les spécifications qui comptent vraiment, pour que vous puissiez acheter en toute confiance.",
    popularLabel: "Populaire :",
    quickLinks: ["Meilleurs multimètres", "Meilleurs fers à souder", "Oscilloscopes pour débutants", "Utiliser un multimètre", "Utiliser un oscilloscope"],
    topPicksPanelLabel: "Meilleurs choix du moment",
    howWePickLabel: "Comment nous choisissons →",
    handsOnTestedLabel: "✓ Testé en conditions réelles",
    checkPriceLabel: "Voir le prix sur Amazon",
    reviewLabel: "Avis",
    trustStrip: ["produits comparés", "avis détaillés", "guides d'achat et pratiques", "placements payants"],
    categoryHub: { eyebrow: "Parcourir par catégorie", title: "Commencez par l'outil dont vous avez besoin", intro: "Chaque catégorie propose un classement, des avis individuels, des comparaisons directes et des guides qui expliquent les spécifications." },
    categoryLabels: ["Multimètres", "Fers à souder", "Oscilloscopes"],
    roundupTitles: ["Meilleurs multimètres", "Meilleurs fers à souder", "Meilleurs oscilloscopes pour débutants"],
    categoryBlurbs: [
      "Catégories de sécurité CAT, True RMS et précision — du premier multimètre à l'outil d'électricien certifié pour tableaux.",
      "Temps de chauffe, stabilité de température et pannes — du stylo portable à la station d'établi complète.",
      "Bande passante, taux d'échantillonnage et voies expliqués simplement — du scope de poche à l'établi quatre voies.",
    ],
    topPickLabel: "Meilleur choix :",
    reviewsWord: "Avis",
    comparisonsWord: "Comparaisons",
    seeAll: (n, m) => `Voir les ${n} produits · ${m} guides`,
    reviewsSection: { eyebrow: "Avis détaillés", title: "Avis produits détaillés" },
    useCaseSection: { eyebrow: "Par cas d'usage", title: "Choisissez selon ce que vous allez vraiment en faire", intro: "Pas sûr de l'outil qui convient ? Partez du besoin : travail sur tableau électrique, diagnostic automobile, réparation de circuits ou premier labo à la maison." },
    comparisonsSection: { eyebrow: "Face à face", title: "Comparaisons pour les choix serrés" },
    learnSection: { eyebrow: "Apprendre les bases", title: "Des guides qui expliquent les spécifications avant d'acheter", intro: "Des guides pratiques et d'achat en langage clair, avec schémas, exemples concrets et consignes de sécurité.", startHereLabel: "Commencer ici", readGuideLabel: "Lire le guide →", buyingGuidesLabel: "Guides d'achat", howToGuidesLabel: "Guides pratiques" },
    learnCols: { allGuides: (n) => `Les ${n} guides`, guidesCount: (n) => `${n} guides`, buyingTag: "Achat" },
    moreUseCasesLabel: "Autres sélections par usage :",
    guidesWord: "Guides",
    howWeReview: {
      eyebrow: "Comment nous testons",
      title: "Un seul standard, appliqué de la même façon à chaque produit",
      links: ["À propos de notre équipe et labo", "Comment nous sommes financés"],
      steps: [
        { title: "Spécifications à la source", desc: "Chaque spécification est vérifiée par rapport à la fiche technique ou à la page officielle du fabricant, pas au texte marketing. En cas d'ambiguïté, nous le signalons clairement." },
        { title: "Comparés sur ce qui compte", desc: "Chaque catégorie est jugée sur les spécifications qui décident de l'usage réel : catégories CAT et True RMS, temps de chauffe et stabilité, bande passante et taux d'échantillonnage." },
        { title: "Meilleurs choix testés sur notre établi", desc: "Notre équipe de test achète chaque produit noté 4,8 et l'utilise dans notre labo. Ces produits portent le badge \"Testé en conditions réelles\" ; tous les autres sont clairement indiqués comme recherche basée sur les spécifications." },
        { title: "Gardé honnête et à jour", desc: "Aucun choix sponsorisé ni accord de marque. Si une spécification s'avère fausse ou qu'un produit est arrêté, nous corrigeons la page dès que nous nous en apercevons." },
      ],
      handsOnTestedNote: "indique un produit que notre équipe de test a acheté et utilisé. Chaque autre avis indique clairement qu'il s'agit d'une recherche basée sur les spécifications.",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Questions fréquentes sur ce site",
      intro: "Comment nous gagnons de l'argent, comment nous testons et comment vous repérer. Des réponses courtes et claires.",
      detailLabel: "En savoir plus",
      howWeTest: "Comment nous testons et évaluons",
      howFunded: "Comment nous sommes financés",
      items: [
        { q: "Je débute en électronique. Par où commencer ?", a: "Commencez par nos trois guides pour débutants : How to Use a Multimeter, How to Use a Soldering Iron et How to Use an Oscilloscope (en anglais). Chacun accompagne une première utilisation étape par étape, avec les vérifications de sécurité essentielles. Au moment d'acheter, chaque classement de catégorie commence par notre meilleur choix et la meilleure option pour débuter." },
        { q: "Comment OhmSavvy gagne-t-il de l'argent ?", a: "Grâce aux commissions d'affiliation Amazon lorsque vous achetez via un lien de ce site, sans frais supplémentaires pour vous. C'est notre seule source de revenus — pas de publicité, pas de placements sponsorisés, pas de paiements de fabricants pour un avis favorable." },
        { q: "Testez-vous vraiment les produits physiquement ?", a: "Nos meilleurs choix, oui. Notre équipe de test achète chaque produit noté 4,8 et l'utilise dans notre labo, et ces produits portent le badge \"Testé en conditions réelles\". Tout autre avis est une recherche documentaire : chaque spécification vérifiée par rapport aux données du fabricant ou à la fiche Amazon officielle, plus les tendances des avis d'achat vérifiés. Chaque avis précise clairement de quel type il s'agit." },
        { q: "Pourquoi certains produits n'ont-ils pas de photo ?", a: "Nous préférons ne montrer aucune photo plutôt qu'une mauvaise. Si nous ne trouvons pas d'image que nous pouvons confirmer visuellement comme correspondant exactement au modèle — pas la photo d'un modèle apparenté — nous affichons à la place une illustration clairement indiquée \"Photo coming soon\", plutôt que de deviner." },
        { q: "À quelle fréquence les choix sont-ils mis à jour ?", a: "Nous revoyons les prix, la disponibilité et les classements régulièrement plutôt que selon un calendrier fixe. Si une spécification s'avère fausse ou qu'un produit est arrêté, nous la corrigeons dès que nous nous en apercevons." },
      ],
    },
    switcherLabel: "Également disponible en :",
    inEnglishSuffix: " (en anglais)",
    disclosure: "OhmSavvy perçoit une commission sur les achats Amazon éligibles effectués via ces liens, sans frais supplémentaires pour vous.",
  },
  it: {
    metaTitle: "Multimetri, oscilloscopi, saldatori",
    metaDescription: "OhmSavvy analizza multimetri, saldatori e strumenti di misura in base alle specifiche che contano davvero — confronti onesti, nessun posizionamento a pagamento.",
    eyebrow: "Strumenti di test elettronici, confrontati onestamente",
    h1: "Trova lo strumento giusto per il tuo banco di lavoro, non quello con il budget pubblicitario più alto.",
    sub: "Recensioni indipendenti, confronti e guide pratiche per multimetri, saldatori e oscilloscopi, valutati in base alle specifiche che contano davvero, così puoi acquistare con fiducia.",
    popularLabel: "Popolari:",
    quickLinks: ["Migliori multimetri", "Migliori saldatori", "Oscilloscopi per principianti", "Usare un multimetro", "Usare un oscilloscopio"],
    topPicksPanelLabel: "Scelte migliori del momento",
    howWePickLabel: "Come scegliamo →",
    handsOnTestedLabel: "✓ Testato praticamente",
    checkPriceLabel: "Controlla il prezzo su Amazon",
    reviewLabel: "Recensione",
    trustStrip: ["prodotti confrontati", "recensioni approfondite", "guide all'acquisto e pratiche", "posizionamenti a pagamento"],
    categoryHub: { eyebrow: "Sfoglia per categoria", title: "Inizia dallo strumento di cui hai bisogno", intro: "Ogni categoria ha una classifica, recensioni singole, confronti diretti e guide che spiegano le specifiche." },
    categoryLabels: ["Multimetri", "Saldatori", "Oscilloscopi"],
    roundupTitles: ["Migliori multimetri", "Migliori saldatori", "Migliori oscilloscopi per principianti"],
    categoryBlurbs: [
      "Categorie di sicurezza CAT, True RMS e precisione — dal primo multimetro agli strumenti da elettricista per quadri.",
      "Tempo di riscaldamento, stabilità della temperatura e punte — dalla penna portatile alla stazione da banco completa.",
      "Larghezza di banda, frequenza di campionamento e canali spiegati semplicemente — dall'oscilloscopio tascabile al banco a quattro canali.",
    ],
    topPickLabel: "Scelta migliore:",
    reviewsWord: "Recensioni",
    comparisonsWord: "Confronti",
    seeAll: (n, m) => `Vedi tutti i ${n} prodotti · ${m} guide`,
    reviewsSection: { eyebrow: "Recensioni approfondite", title: "Recensioni approfondite dei prodotti" },
    useCaseSection: { eyebrow: "Per caso d'uso", title: "Scegli in base a cosa ne farai davvero", intro: "Non sei sicuro quale strumento fa per te? Parti dal lavoro: quadri elettrici, diagnostica auto, riparazione di circuiti o il tuo primo laboratorio di casa." },
    comparisonsSection: { eyebrow: "Testa a testa", title: "Confronti per le scelte più difficili" },
    learnSection: { eyebrow: "Impara le basi", title: "Guide che spiegano le specifiche prima di acquistare", intro: "Guide pratiche e all'acquisto in linguaggio semplice, con diagrammi, esempi pratici e note di sicurezza.", startHereLabel: "Inizia qui", readGuideLabel: "Leggi la guida →", buyingGuidesLabel: "Guide all'acquisto", howToGuidesLabel: "Guide pratiche" },
    learnCols: { allGuides: (n) => `Tutte le ${n} guide`, guidesCount: (n) => `${n} guide`, buyingTag: "Acquisto" },
    moreUseCasesLabel: "Altre scelte per utilizzo:",
    guidesWord: "Guide",
    howWeReview: {
      eyebrow: "Come recensiamo",
      title: "Uno standard, applicato allo stesso modo a ogni prodotto",
      links: ["Il nostro team e il laboratorio", "Come ci finanziamo"],
      steps: [
        { title: "Specifiche dalla fonte", desc: "Ogni specifica viene verificata rispetto alla scheda tecnica o alla pagina ufficiale del produttore, non al testo di marketing. Se un dato è ambiguo, lo diciamo chiaramente." },
        { title: "Confrontati su ciò che conta", desc: "Ogni categoria viene valutata in base alle specifiche che determinano l'uso reale: categorie CAT e True RMS, tempo di riscaldamento e stabilità, larghezza di banda e frequenza di campionamento." },
        { title: "Le scelte migliori testate nel nostro laboratorio", desc: "Il nostro team acquista ogni prodotto che valutiamo 4,8 e lo mette alla prova nel nostro laboratorio. Questi prodotti portano il badge \"Testato praticamente\"; tutti gli altri sono chiaramente indicati come ricerca basata sulle specifiche." },
        { title: "Mantenuto onesto e aggiornato", desc: "Nessuna scelta sponsorizzata o accordo di marca. Se una specifica risulta errata o un prodotto viene discontinuato, correggiamo la pagina non appena ce ne accorgiamo." },
      ],
      handsOnTestedNote: "indica un prodotto che il nostro team ha acquistato e utilizzato. Ogni altra recensione dichiara chiaramente di essere ricerca basata sulle specifiche.",
    },
    faq: {
      eyebrow: "Domande frequenti",
      title: "Domande comuni su questo sito",
      intro: "Come guadagniamo, come testiamo e come orientarti nel sito. Risposte brevi e dirette.",
      detailLabel: "Approfondisci",
      howWeTest: "Come testiamo e recensiamo",
      howFunded: "Come ci finanziamo",
      items: [
        { q: "Sono alle prime armi con l'elettronica. Da dove inizio?", a: "Inizia dalle nostre tre guide per principianti: How to Use a Multimeter, How to Use a Soldering Iron e How to Use an Oscilloscope (in inglese). Ognuna accompagna passo passo il primo utilizzo, con i controlli di sicurezza che contano. Quando sei pronto ad acquistare, ogni classifica di categoria parte dalla nostra scelta migliore e dall'opzione migliore per principianti." },
        { q: "Come guadagna OhmSavvy?", a: "Attraverso le commissioni di affiliazione Amazon quando acquisti tramite un link su questo sito, senza costi aggiuntivi per te. Questa è l'unica fonte di guadagno — nessuna pubblicità, nessun posizionamento sponsorizzato, nessun pagamento dai produttori per una recensione favorevole." },
        { q: "Testate fisicamente i prodotti?", a: "Le nostre scelte migliori, sì. Il nostro team acquista ogni prodotto che valutiamo 4,8 e lo mette alla prova nel nostro laboratorio, e questi prodotti portano il badge \"Testato praticamente\". Ogni altra recensione è ricerca a tavolino: ogni specifica verificata con i dati del produttore o con l'inserzione ufficiale Amazon, più i pattern delle recensioni di acquisti verificati. Ogni recensione dichiara chiaramente di che tipo si tratta." },
        { q: "Perché alcuni prodotti non hanno foto?", a: "Preferiamo non mostrare nessuna foto piuttosto che una sbagliata. Se non troviamo un'immagine che possiamo confermare visivamente corrisponda esattamente al modello — non la foto di un modello simile della stessa famiglia — mostriamo invece un'illustrazione chiaramente etichettata \"Photo coming soon\", piuttosto che indovinare." },
        { q: "Con quale frequenza vengono aggiornate le scelte?", a: "Rivediamo prezzi, disponibilità e classifiche periodicamente, non secondo un programma fisso. Se una specifica risulta errata o un prodotto viene discontinuato, la correggiamo non appena ce ne accorgiamo." },
      ],
    },
    switcherLabel: "Disponibile anche in:",
    inEnglishSuffix: " (in inglese)",
    disclosure: "OhmSavvy riceve una commissione per gli acquisti Amazon idonei effettuati tramite questi link, senza costi aggiuntivi per te.",
  },
  es: {
    metaTitle: "Multímetros, osciloscopios, soldadores",
    metaDescription: "OhmSavvy analiza multímetros, soldadores y equipos de prueba según las especificaciones que realmente importan — comparaciones honestas, sin colocaciones pagadas.",
    eyebrow: "Equipos de prueba electrónicos, comparados con honestidad",
    h1: "Encuentra la herramienta adecuada para tu banco de trabajo, no la que tiene el mayor presupuesto publicitario.",
    sub: "Reseñas independientes, comparaciones y guías prácticas para multímetros, soldadores y osciloscopios, evaluados según las especificaciones que realmente importan, para que puedas comprar con confianza.",
    popularLabel: "Popular:",
    quickLinks: ["Mejores multímetros", "Mejores soldadores", "Osciloscopios para principiantes", "Usar un multímetro", "Usar un osciloscopio"],
    topPicksPanelLabel: "Mejores opciones del momento",
    howWePickLabel: "Cómo elegimos →",
    handsOnTestedLabel: "✓ Probado en la práctica",
    checkPriceLabel: "Ver precio en Amazon",
    reviewLabel: "Reseña",
    trustStrip: ["productos comparados", "reseñas detalladas", "guías de compra y prácticas", "colocaciones pagadas"],
    categoryHub: { eyebrow: "Explorar por categoría", title: "Empieza por la herramienta que necesitas", intro: "Cada categoría tiene una clasificación, reseñas individuales, comparaciones directas y guías que explican las especificaciones." },
    categoryLabels: ["Multímetros", "Soldadores", "Osciloscopios"],
    roundupTitles: ["Mejores multímetros", "Mejores soldadores", "Mejores osciloscopios para principiantes"],
    categoryBlurbs: [
      "Categorías de seguridad CAT, True RMS y precisión — desde el primer multímetro hasta herramientas de electricista para cuadros.",
      "Tiempo de calentamiento, estabilidad de temperatura y puntas — desde el lápiz portátil hasta la estación de banco completa.",
      "Ancho de banda, tasa de muestreo y canales explicados con sencillez — desde el osciloscopio de bolsillo hasta el banco de cuatro canales.",
    ],
    topPickLabel: "Mejor opción:",
    reviewsWord: "Reseñas",
    comparisonsWord: "Comparaciones",
    seeAll: (n, m) => `Ver los ${n} productos · ${m} guías`,
    reviewsSection: { eyebrow: "Reseñas detalladas", title: "Reseñas detalladas de productos" },
    useCaseSection: { eyebrow: "Por caso de uso", title: "Elige según lo que realmente harás con ella", intro: "¿No sabes qué herramienta te conviene? Empieza por la tarea: trabajo en cuadros eléctricos, diagnóstico automotriz, reparación de circuitos o tu primer laboratorio casero." },
    comparisonsSection: { eyebrow: "Cara a cara", title: "Comparaciones para decisiones reñidas" },
    learnSection: { eyebrow: "Aprende lo básico", title: "Guías que explican las especificaciones antes de comprar", intro: "Guías prácticas y de compra en lenguaje claro, con diagramas, ejemplos y notas de seguridad.", startHereLabel: "Empieza aquí", readGuideLabel: "Leer la guía →", buyingGuidesLabel: "Guías de compra", howToGuidesLabel: "Guías prácticas" },
    learnCols: { allGuides: (n) => `Las ${n} guías`, guidesCount: (n) => `${n} guías`, buyingTag: "Compra" },
    moreUseCasesLabel: "Más selecciones por uso:",
    guidesWord: "Guías",
    howWeReview: {
      eyebrow: "Cómo evaluamos",
      title: "Un mismo estándar, aplicado igual a cada producto",
      links: ["Sobre nuestro equipo y laboratorio", "Cómo nos financiamos"],
      steps: [
        { title: "Especificaciones desde la fuente", desc: "Cada especificación se verifica con la ficha técnica o la página oficial del fabricante, no con el texto de marketing. Si un dato es ambiguo, lo decimos claramente." },
        { title: "Comparados en lo que importa", desc: "Cada categoría se evalúa según las especificaciones que determinan el uso real: categorías CAT y True RMS, tiempo de calentamiento y estabilidad, ancho de banda y tasa de muestreo." },
        { title: "Las mejores opciones probadas en nuestro banco", desc: "Nuestro equipo de pruebas compra cada producto que calificamos con 4.8 y lo pone a prueba en nuestro laboratorio. Esos productos llevan la insignia \"Probado en la práctica\"; el resto se indica claramente como investigación basada en especificaciones." },
        { title: "Mantenido honesto y actualizado", desc: "Sin elecciones patrocinadas ni acuerdos de marca. Si una especificación resulta incorrecta o un producto se descontinúa, corregimos la página en cuanto nos damos cuenta." },
      ],
      handsOnTestedNote: "indica un producto que nuestro equipo de pruebas ha comprado y usado. Cualquier otra reseña indica claramente que es investigación basada en especificaciones.",
    },
    faq: {
      eyebrow: "Preguntas frecuentes",
      title: "Preguntas comunes sobre este sitio",
      intro: "Cómo ganamos dinero, cómo probamos y cómo orientarte en el sitio. Respuestas breves y directas.",
      detailLabel: "Más información",
      howWeTest: "Cómo probamos y analizamos",
      howFunded: "Cómo nos financiamos",
      items: [
        { q: "Soy nuevo en electrónica. ¿Por dónde empiezo?", a: "Empieza por nuestras tres guías para principiantes: How to Use a Multimeter, How to Use a Soldering Iron y How to Use an Oscilloscope (en inglés). Cada una te guía paso a paso en el primer uso, con las comprobaciones de seguridad importantes. Cuando quieras comprar, cada clasificación de categoría empieza con nuestra mejor opción y la mejor alternativa para principiantes." },
        { q: "¿Cómo gana dinero OhmSavvy?", a: "Mediante comisiones de afiliado de Amazon cuando compras a través de un enlace de este sitio, sin costo adicional para ti. Esa es la única fuente de ingresos — sin publicidad, sin colocaciones patrocinadas, sin pagos de fabricantes por una reseña favorable." },
        { q: "¿Prueban físicamente los productos?", a: "Nuestras mejores opciones, sí. Nuestro equipo de pruebas compra cada producto que calificamos con 4.8 y lo pone a prueba en nuestro laboratorio, y esos productos llevan la insignia \"Probado en la práctica\". Cualquier otra reseña es investigación de escritorio: cada especificación verificada con los datos del fabricante o la ficha oficial de Amazon, más patrones en reseñas de compras verificadas. Cada reseña indica claramente de qué tipo se trata." },
        { q: "¿Por qué algunos productos no tienen fotos?", a: "Preferimos no mostrar ninguna foto antes que una incorrecta. Si no encontramos una imagen que podamos confirmar visualmente que corresponde exactamente al modelo — no la foto de un modelo hermano parecido — mostramos en su lugar una ilustración claramente etiquetada como \"Photo coming soon\", en lugar de adivinar." },
        { q: "¿Con qué frecuencia se actualizan las elecciones?", a: "Revisamos precios, disponibilidad y clasificaciones periódicamente, no según un calendario fijo. Si una especificación resulta incorrecta o un producto se descontinúa, la corregimos en cuanto nos damos cuenta." },
      ],
    },
    switcherLabel: "También disponible en:",
    inEnglishSuffix: " (en inglés)",
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
  return buildMetadata({ title: d.metaTitle, description: d.metaDescription, path: `/${locale}`, languages: localeAlternates("/") });
}

export default async function LocalizedHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = DICTIONARY[locale];

  const quickLinkHrefs = [
    "/multimeters/best-multimeters",
    "/soldering-irons/best-soldering-irons",
    "/oscilloscopes/best-beginner-oscilloscopes",
    "/multimeters/how-to-use-a-multimeter",
    "/oscilloscopes/how-to-use-an-oscilloscope",
  ];
  const trustStripValues = [`${totalProducts}`, `${totalReviews}`, `${totalGuides}`, "0"];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-surface-raised">
        <div className="relative mx-auto max-w-6xl px-6 pt-14 sm:pt-20 pb-12 grid lg:grid-cols-[1fr_420px] gap-12 items-center">
          <div>
            <p className="font-display text-sm mb-3 tracking-wide text-accent">{d.eyebrow.toUpperCase()}</p>
            <h1 className="text-4xl sm:text-5xl leading-[1.1] max-w-2xl">{d.h1}</h1>
            <p className="mt-6 max-w-xl text-lg text-muted leading-7">{d.sub}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted mr-1">{d.popularLabel}</span>
              {quickLinkHrefs.map((href, i) => (
                <Link key={href} href={href} className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted hover:border-accent hover:text-accent transition-colors">
                  {d.quickLinks[i]}
                </Link>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-muted">
              <span>{d.switcherLabel}</span>
              <Link href="/" className="text-accent hover:underline">English</Link>
              {LOCALES.filter((l) => l !== locale).map((l) => (
                <Link key={l} href={`/${l}`} className="text-accent hover:underline">{LOCALE_LABELS[l]}</Link>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface shadow-lg overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-surface-raised">
              <p className="font-display text-xs uppercase tracking-wide text-accent">{d.topPicksPanelLabel}</p>
              <Link href="/about" className="text-[11px] text-muted hover:text-accent">{d.howWePickLabel}</Link>
            </div>
            <ul className="divide-y divide-border">
              {topPicks.map((p, i) => (
                <li key={p.name} className="flex gap-4 p-4">
                  <Link href={p.reviewHref} className="relative shrink-0 w-20 h-20 rounded-lg border border-border/60 bg-white overflow-hidden">
                    {p.image ? (
                      <Image src={p.image} unoptimized={skipOptimizer(p.image)} alt={p.name} fill sizes="80px" priority className="object-contain p-1.5" />
                    ) : null}
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`font-display text-[11px] uppercase tracking-wide ${TONES[p.category].text}`}>{d.categoryLabels[i]}</span>
                      <Stars rating={p.rating} />
                    </div>
                    <Link href={p.reviewHref} className="mt-0.5 block font-semibold leading-snug hover:text-accent transition-colors">{p.name}</Link>
                    {p.handsOnTested && <span className="mt-1 inline-block font-display text-[10px] uppercase tracking-wide text-accent">{d.handsOnTestedLabel}</span>}
                    <div className="mt-2 flex items-center gap-3">
                      <Button href={p.ctaHref} className="px-3! py-1.5! text-xs!">{d.checkPriceLabel}</Button>
                      <Link href={p.reviewHref} className="text-xs font-medium text-muted hover:text-accent">{d.reviewLabel}</Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative border-t border-border bg-surface/80 backdrop-blur">
          <div className="mx-auto max-w-6xl px-6 py-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {trustStripValues.map((value, i) => (
              <div key={i} className="flex items-baseline gap-2">
                <span className="font-display text-2xl font-semibold text-accent">{value}</span>
                <span className="text-xs sm:text-sm text-muted">{d.trustStrip[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category hub */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 max-w-2xl">
          <p className="font-display text-sm mb-3 tracking-wide text-accent">{d.categoryHub.eyebrow.toUpperCase()}</p>
          <h2 className="text-2xl sm:text-3xl font-semibold leading-tight">{d.categoryHub.title}</h2>
          <p className="mt-2 text-muted leading-7">{d.categoryHub.intro}</p>
        </div>
        <div className="-mx-6 px-6 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0">
          {CATEGORY_KEYS.map((category, i) => {
            const top = PICKS[category][0];
            const tone = TONES[category];
            const reviews = ofType(category, "review").length;
            const comparisons = ofType(category, "comparison").length;
            const guides = content.filter((e) => e.category === category && e.type !== "review" && e.type !== "comparison").length;
            const buying = ofType(category, "buying-guide")[0];
            return (
              <Reveal key={category} delay={i * 80} className="flex snap-start shrink-0 w-[85%] md:w-auto">
                <div className="group w-full flex flex-col rounded-2xl border border-border bg-surface-raised shadow-sm overflow-hidden transition-shadow hover:shadow-md">
                  <Link href={ROUNDUPS[category]} className={`relative block h-44 bg-gradient-to-b ${tone.soft} to-transparent`}>
                    <div className={`absolute top-0 inset-x-0 h-1 ${tone.bg}`} />
                    {top.image && (
                      <Image src={top.image} unoptimized={skipOptimizer(top.image)} alt={top.name} fill sizes="(min-width: 768px) 360px, 100vw" className="object-contain p-6 transition-transform duration-300 group-hover:scale-105" />
                    )}
                  </Link>
                  <div className="flex flex-1 flex-col p-6">
                    <span className={`font-display text-xs uppercase tracking-wide ${tone.text}`}>{d.categoryLabels[i]}</span>
                    <Link href={ROUNDUPS[category]} className="mt-2 text-xl font-semibold leading-snug hover:text-accent transition-colors">{d.roundupTitles[i]}</Link>
                    <p className="mt-2 text-sm text-muted leading-6">{d.categoryBlurbs[i]}</p>
                    <div className="mt-4 rounded-md bg-signal-bg px-3 py-2 text-xs">
                      <span className="text-signal font-medium">{d.topPickLabel} </span>
                      <span className="text-foreground">{top.name}</span>
                    </div>
                    <ul className="mt-5 flex-1 space-y-2 text-sm">
                      <li><Link href={`/${category}/reviews`} className="flex justify-between text-muted hover:text-accent"><span>{d.reviewsWord}</span><span className="font-mono text-xs">{reviews}</span></Link></li>
                      <li><Link href={`/${category}/comparisons`} className="flex justify-between text-muted hover:text-accent"><span>{d.comparisonsWord}</span><span className="font-mono text-xs">{comparisons}</span></Link></li>
                      <li><Link href={`/${category}/guides`} className="flex justify-between text-muted hover:text-accent"><span>{d.guidesWord}</span><span className="font-mono text-xs">{guides}</span></Link></li>
                      {buying && <li><Link href={buying.href} className="flex justify-between text-muted hover:text-accent"><span>{buying.title}{d.inEnglishSuffix}</span><span aria-hidden="true">→</span></Link></li>}
                    </ul>
                    <Link href={ROUNDUPS[category]} className={`mt-6 inline-flex items-center justify-between rounded-lg border ${tone.border} px-4 py-2.5 text-sm font-medium ${tone.text} hover:bg-surface transition-colors`}>
                      {d.seeAll(PICKS[category].length, guides)}
                      <span className="transition-transform group-hover:translate-x-0.5">→</span>
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Reviews */}
      <section className="border-t border-border bg-surface-raised">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
            <div className="max-w-2xl">
              <p className="font-display text-sm mb-3 tracking-wide text-accent">{d.reviewsSection.eyebrow.toUpperCase()}</p>
              <h2 className="text-2xl sm:text-3xl font-semibold leading-tight">{d.reviewsSection.title}</h2>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
              {CATEGORY_KEYS.map((c, i) => <Link key={c} href={`/${c}/reviews`} className="text-accent hover:underline">{d.categoryLabels[i]} →</Link>)}
            </div>
          </div>
          <div className={CAROUSEL}>{latestReviews.map((e) => <div key={e.href} className={CAROUSEL_ITEM}><ContentCard entry={e} /></div>)}</div>
        </div>
      </section>

      {/* Use cases */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 max-w-2xl">
          <p className="font-display text-sm mb-3 tracking-wide text-accent">{d.useCaseSection.eyebrow.toUpperCase()}</p>
          <h2 className="text-2xl sm:text-3xl font-semibold leading-tight">{d.useCaseSection.title}</h2>
          <p className="mt-2 text-muted leading-7">{d.useCaseSection.intro}</p>
        </div>
        <div className={CAROUSEL}>{useCaseGuides.map((g) => <div key={g.href} className={CAROUSEL_ITEM}><GuideCard entry={g} /></div>)}</div>
        {moreUseCases.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="mr-1 font-display text-[11px] uppercase tracking-wide text-muted">{d.moreUseCasesLabel}</span>
            {moreUseCases.map((g) => (
              <Link key={g.href} href={g.href} className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs hover:border-accent hover:text-accent transition-colors">
                <span className={TONES[g.category].text}>●</span> {d.categoryLabels[CATEGORY_KEYS.indexOf(g.category)]}: {g.title}{d.inEnglishSuffix}
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Comparisons */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
            <div className="max-w-2xl">
              <p className="font-display text-sm mb-3 tracking-wide text-accent">{d.comparisonsSection.eyebrow.toUpperCase()}</p>
              <h2 className="text-2xl sm:text-3xl font-semibold leading-tight">{d.comparisonsSection.title}</h2>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
              {CATEGORY_KEYS.map((c, i) => <Link key={c} href={`/${c}/comparisons`} className="text-accent hover:underline">{d.categoryLabels[i]} →</Link>)}
            </div>
          </div>
          <div className={CAROUSEL}>{featuredComparisons.map((e) => <div key={e.href} className={CAROUSEL_ITEM}><ContentCard entry={e} /></div>)}</div>
        </div>
      </section>

      {/* Learn */}
      <section className="border-t border-border bg-surface-raised">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-8 max-w-2xl">
            <p className="font-display text-sm mb-3 tracking-wide text-accent">{d.learnSection.eyebrow.toUpperCase()}</p>
            <h2 className="text-2xl sm:text-3xl font-semibold leading-tight">{d.learnSection.title}</h2>
            <p className="mt-2 text-muted leading-7">{d.learnSection.intro}</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {CATEGORY_KEYS.map((category, i) => {
              const tone = TONES[category];
              const start = featuredHowTos.find((g) => g.category === category);
              const more = otherHowTos.filter((g) => g.category === category);
              const buying = buyingGuides.filter((g) => g.category === category);
              // Same count as the category card and the /guides page: every guide, incl. use-case picks.
              const total = content.filter((e) => e.category === category && e.type !== "review" && e.type !== "comparison").length;
              return (
                <div key={category} className="flex flex-col rounded-2xl border border-border bg-surface shadow-sm overflow-hidden">
                  <div className={`h-1 ${tone.bg}`} />
                  <div className="flex items-center justify-between px-5 pt-5">
                    <span className={`font-display text-xs uppercase tracking-wide ${tone.text}`}>{d.categoryLabels[i]}</span>
                    <span className="font-mono text-xs text-muted">{d.learnCols.guidesCount(total)}</span>
                  </div>
                  {start && (
                    <Link href={start.href} className="group mx-5 mt-4 block rounded-xl bg-surface-raised p-4 hover:ring-1 hover:ring-accent transition">
                      <span className="font-display text-[10px] uppercase tracking-wide text-accent">{d.learnSection.startHereLabel}</span>
                      <span className="mt-1 block font-semibold group-hover:text-accent transition-colors">{start.title}{d.inEnglishSuffix}</span>
                      <span className="mt-1 block text-xs text-muted leading-5">{start.description}</span>
                    </Link>
                  )}
                  <ul className="mt-3 flex-1 divide-y divide-border px-5">
                    {more.slice(0, 5).map((g) => (
                      <li key={g.href}>
                        <Link href={g.href} className="group flex items-center justify-between gap-3 py-2.5 text-sm">
                          <span className="group-hover:text-accent transition-colors">{g.title}{d.inEnglishSuffix}</span>
                          <span className="text-muted" aria-hidden="true">→</span>
                        </Link>
                      </li>
                    ))}
                    {buying.map((g) => (
                      <li key={g.href}>
                        <Link href={g.href} className="group flex items-center justify-between gap-3 py-2.5 text-sm">
                          <span className="group-hover:text-accent transition-colors">
                            <span className="mr-1.5 rounded bg-signal-bg px-1.5 py-0.5 font-display text-[10px] uppercase text-signal">{d.learnCols.buyingTag}</span>
                            {g.title}{d.inEnglishSuffix}
                          </span>
                          <span className="text-muted" aria-hidden="true">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/${category}/guides`}
                    className={`mx-5 mb-5 mt-4 inline-flex items-center justify-between rounded-lg border ${tone.border} px-4 py-2.5 text-sm font-medium ${tone.text} hover:bg-surface-raised transition-colors`}
                  >
                    {d.learnCols.allGuides(total)}{d.inEnglishSuffix}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How we review */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <div className="max-w-2xl">
            <p className="font-display text-sm mb-3 tracking-wide text-accent">{d.howWeReview.eyebrow.toUpperCase()}</p>
            <h2 className="text-2xl sm:text-3xl font-semibold leading-tight">{d.howWeReview.title}</h2>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
            <Link href="/about" className="text-accent hover:underline">{d.howWeReview.links[0]} →</Link>
            <Link href="/about#how-were-funded" className="text-accent hover:underline">{d.howWeReview.links[1]} →</Link>
          </div>
        </div>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {d.howWeReview.steps.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 80} className="h-full">
                <div className="h-full rounded-2xl border border-border bg-surface-raised p-6 shadow-sm">
                  <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-4 font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-6">{s.desc}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted">
          <Badge variant="accent">{d.handsOnTestedLabel.replace("✓ ", "")}</Badge>
          <span>{d.howWeReview.handsOnTestedNote}</span>
        </div>
      </section>

      {/* FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            inLanguage: locale,
            mainEntity: d.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }).replace(/</g, "\\u003c"),
        }}
      />
      <section className="border-t border-border bg-surface-raised">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-display text-sm mb-3 tracking-wide text-accent">{d.faq.eyebrow.toUpperCase()}</p>
            <h2 className="text-2xl sm:text-3xl font-semibold leading-tight">{d.faq.title}</h2>
            <p className="mt-3 text-muted leading-7">{d.faq.intro}</p>
            <div className="mt-8 rounded-2xl border border-border bg-surface p-6">
              <p className="font-display text-[11px] uppercase tracking-wide text-accent">{d.faq.detailLabel}</p>
              <ul className="mt-3 space-y-2.5 text-sm">
                <li>
                  <Link href="/about" className="flex items-center justify-between gap-3 hover:text-accent transition-colors">
                    <span>{d.faq.howWeTest}{d.inEnglishSuffix}</span>
                    <span className="text-muted" aria-hidden="true">→</span>
                  </Link>
                </li>
                <li>
                  <Link href="/about#how-were-funded" className="flex items-center justify-between gap-3 hover:text-accent transition-colors">
                    <span>{d.faq.howFunded}{d.inEnglishSuffix}</span>
                    <span className="text-muted" aria-hidden="true">→</span>
                  </Link>
                </li>
                {featuredHowTos.map((g) => (
                  <li key={g.href}>
                    <Link href={g.href} className="flex items-center justify-between gap-3 hover:text-accent transition-colors">
                      <span>{g.title}{d.inEnglishSuffix}</span>
                      <span className="text-muted" aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <FaqAccordion items={d.faq.items} />
        </div>
        <div className="mx-auto max-w-6xl px-6 pb-12">
          <p className="text-xs text-muted leading-5 border-t border-border pt-6">{d.disclosure}</p>
        </div>
      </section>
    </div>
  );
}
