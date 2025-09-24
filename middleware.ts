// middleware.ts
import { NextMiddleware, NextResponse } from 'next/server';
import { withLocale } from './middlewares/withLocale';
import { withAuth } from './middlewares/withAuth';
import { getActiveMiddlewares } from './middleware.config';

export type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;

// Helper to stack middlewares
function stackMiddlewares(functions: MiddlewareFactory[], index = 0): NextMiddleware {
  const current = functions[index];
  if (current) {
    const next = stackMiddlewares(functions, index + 1);
    return current(next);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (_req) => NextResponse.next();
}

// Отримуємо активні middleware на основі конфігурації
const middlewares = getActiveMiddlewares();

export default stackMiddlewares(middlewares);

export const config = {
    matcher: [
      "/",
      "/(ua|en)/:path*",
      "/((?!_next|_vercel|.*\\..*).*)"
    ],
};