import 'server-only';

const dictionaries = {
  en: () => import('./en.json').then((module) => module.default),
  pt: () => import('./pt.json').then((module) => module.default),
};

// Type guard to check if locale is a valid key
const isValidLocale = (locale: string | number): locale is 'en' | 'pt' => {
  return ['en', 'pt'].includes(locale as string);
};

export const getDictionary = async (locale: string | number) => {
  if (!isValidLocale(locale)) {
    throw new Error(`Invalid locale: ${locale}`);
  }
  return dictionaries[locale]();
};
