// Базові налаштування інтернаціоналізації
export const i18nConfig = {
  // Мови
  DEFAULT_LOCALE: process.env.DEFAULT_LOCALE || 'en',
  SUPPORTED_LOCALES: process.env.SUPPORTED_LOCALES 
    ? process.env.SUPPORTED_LOCALES.split(',')
    : ['en', 'uk', 'ru'],
  
  // Файли перекладів
  TRANSLATION_PATH: './languages',
  TRANSLATION_FILE_EXTENSION: '.json',
  
  // Налаштування
  DEFAULT_NAMESPACE: 'common',
  ENABLE_PLURALIZATION: true,
  
  // Форматування
  DATE_FORMAT: 'YYYY-MM-DD',
  TIME_FORMAT: 'HH:mm',
  CURRENCY_SYMBOL: '$',
};

export type I18nConfig = typeof i18nConfig;

// Допоміжні функції
export const isValidLocale = (locale: string): boolean => {
  return i18nConfig.SUPPORTED_LOCALES.includes(locale);
};

export const getLocaleFromPath = (path: string): string | null => {
  const segments = path.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  if (firstSegment && isValidLocale(firstSegment)) {
    return firstSegment;
  }
  
  return null;
};
