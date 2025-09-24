// Export all configuration modules
export { authConfig, type AuthConfig } from './auth.config';
export { paymentsConfig, type PaymentsConfig } from './payments.config';
export { s3Config, type S3Config } from './s3.config';
export { i18nConfig, type I18nConfig, isRTL, isValidLocale, getLocaleFromPath } from './i18n.config';
export { 
  siteConfig, 
  type SiteConfig, 
  getPageTitle, 
  getPageDescription, 
  getPageKeywords, 
  isFeatureEnabled 
} from './site.config';

// Re-export commonly used configurations
export const config = {
  auth: authConfig,
  payments: paymentsConfig,
  s3: s3Config,
  i18n: i18nConfig,
  site: siteConfig,
} as const;

export type Config = typeof config;
