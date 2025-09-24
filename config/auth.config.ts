// Базові налаштування авторизації
export const authConfig = {
  // JWT
  JWT_SECRET: process.env.JWT_SECRET || '',
  JWT_EXPIRES_IN: '7d',
  JWT_REFRESH_EXPIRES_IN: '30d',
  
  // Сесії
  SESSION_SECRET: process.env.SESSION_SECRET || '',
  SESSION_MAX_AGE: 2592000, // 30 днів
  
  // Паролі
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_REQUIRE_UPPERCASE: true,
  PASSWORD_REQUIRE_LOWERCASE: true,
  PASSWORD_REQUIRE_NUMBERS: true,
  PASSWORD_REQUIRE_SYMBOLS: false,
  
  // Безпека
  LOGIN_ATTEMPTS_LIMIT: 5,
  LOGIN_ATTEMPTS_WINDOW: 900, // 15 хвилин
};

export type AuthConfig = typeof authConfig;
