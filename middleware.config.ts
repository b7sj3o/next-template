import { withAuth } from './middlewares/withAuth';
import { withLocale } from './middlewares/withLocale';
import { siteConfig } from './config/site.config';
import { i18nConfig } from './config/i18n.config';

// Умовна система middleware на основі конфігурації
export function getActiveMiddlewares() {
  const middlewares = [];

  // Додаємо auth middleware тільки якщо увімкнена авторизація
  if (siteConfig.ENABLE_USER_ACCOUNTS) {
    middlewares.push(withAuth);
  }

  // Додаємо i18n middleware тільки якщо є підтримувані локалі
  if (i18nConfig.SUPPORTED_LOCALES.length > 1) {
    middlewares.push(withLocale);
  }

  return middlewares;
}
