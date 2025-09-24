import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { routing } from "@/modules/i18n/routing";
import { MiddlewareFactory } from "@/middleware";

// Middleware для next-intl с дефолтным языком без префикса
export const withLocale: MiddlewareFactory = (next) => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const { pathname } = request.nextUrl;
    const url = request.nextUrl.clone();

    // Пропускаем API и статику
    if (pathname.startsWith("/api") || pathname.startsWith("/_next") || pathname.includes(".")) {
      return NextResponse.next();
    }

    // Проверяем, есть ли локаль в URL
    const hasLocale = routing.locales.some(
      (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
    );

    if (hasLocale) {
      // Если дефолтный язык имеет префикс /ua, редиректим на /
      // if (pathname.startsWith(`/${routing.defaultLocale}`)) {
      //   url.pathname = pathname.replace(`/${routing.defaultLocale}`, "") || "/";
      //   return NextResponse.redirect(url);
      // }
      return NextResponse.next();
    }

    // Берем локаль из cookie или дефолтную
    const locale = request.cookies.get("NEXT_LOCALE")?.value || routing.defaultLocale;

    // if (locale === routing.defaultLocale) {
    //   // Дефолтный язык остаётся на /
    //   return NextResponse.next();
    // }

    // Для других языков добавляем префикс
    url.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(url);
  }
}

// Настройка matcher, чтобы middleware применялся ко всем страницам, кроме API и статики
export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
