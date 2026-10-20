// Pilot locales: exactly the 4 languages where the existing Amazon Associates
// tag (ohmsavvy-20) already earns commission via "Earn Globally" (OneLink) —
// Germany, France, Italy, Spain — without needing a separate country account.
// English stays unprefixed at "/" and is not part of this list.
export const LOCALES = ["de", "fr", "it", "es"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  de: "Deutsch",
  fr: "Français",
  it: "Italiano",
  es: "Español",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** hreflang alternates map for a translated page, including the English original as x-default. */
export function localeAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = { en: path, "x-default": path };
  for (const locale of LOCALES) {
    languages[locale] = `/${locale}${path}`;
  }
  return languages;
}
