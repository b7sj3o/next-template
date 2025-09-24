import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
 
export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;
 
  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as "ua" | "en")) {
    locale = routing.defaultLocale;
  }
 
  return {
    locale,
    messages: {
      ...(await import(`@/dictionaries/${locale}.json`)),
    },
  };
});

/* Это файл, где ты сам определяешь текущую локаль из запроса.
Он используется внутри middleware.ts и i18n.ts. */