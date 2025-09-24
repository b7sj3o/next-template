// Базові налаштування сайту
export const siteConfig = {
  // Основна інформація
  SITE_NAME: process.env.SITE_NAME || 'Next.js App',
  SITE_URL: process.env.SITE_URL || 'http://localhost:3000',
  
  // SEO
  SEO_TITLE_TEMPLATE: '%s | %s',
  SEO_DEFAULT_TITLE: 'Next.js App',
  SEO_DEFAULT_DESCRIPTION: 'A modern Next.js application',
  SEO_DEFAULT_KEYWORDS: ['nextjs', 'react', 'typescript'],

  // Користувачі
  ENABLE_USER_ACCOUNTS: process.env.ENABLE_USER_ACCOUNTS === 'true',
  
  // Аналітика
  GOOGLE_TAG_MANAGER_ID: process.env.GOOGLE_TAG_MANAGER_ID,
  
  // Розробка
  DEBUG_MODE: process.env.DEBUG_MODE === 'true',
  ENABLE_HOT_RELOAD: process.env.ENABLE_HOT_RELOAD !== 'false',
};

export type SiteConfig = typeof siteConfig;

// Допоміжні функції
export const getPageTitle = (pageTitle?: string): string => {
  if (!pageTitle) return siteConfig.SEO_DEFAULT_TITLE;
  return siteConfig.SEO_TITLE_TEMPLATE
    .replace('%s', pageTitle)
    .replace('%s', siteConfig.SITE_NAME);
};

export const getPageDescription = (pageDescription?: string): string => {
  return pageDescription || siteConfig.SEO_DEFAULT_DESCRIPTION;
};
