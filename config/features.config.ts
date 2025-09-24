// Базові налаштування функціональності
export const featuresConfig = {
  // Основні функції
  ENABLE_AUTH: process.env.ENABLE_AUTH !== 'false',
  ENABLE_I18N: process.env.ENABLE_I18N !== 'false',
  ENABLE_PAYMENTS: process.env.ENABLE_PAYMENTS === 'true',
  ENABLE_STORAGE: process.env.ENABLE_STORAGE === 'true',
  
  // Розробка
  ENABLE_DEBUG: process.env.DEBUG_MODE === 'true',
  ENABLE_HOT_RELOAD: process.env.ENABLE_HOT_RELOAD !== 'false',
};

export type FeaturesConfig = typeof featuresConfig;

// Допоміжні функції
export const isFeatureEnabled = (feature: keyof FeaturesConfig): boolean => {
  return featuresConfig[feature];
};
