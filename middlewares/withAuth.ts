import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { verifyJWT } from '@/lib/auth';
import { MiddlewareFactory } from '@/middleware';

const PROTECTED_ROUTES = [
    {method: "GET", path: "/admin-dashboard"},

    {method: "POST", path: "/api/v1/articles"},
    {method: "PATCH", path: "/api/v1/articles"},
    {method: "DELETE", path: "/api/v1/articles"},
    
    {method: "POST", path: "/api/v1/projects"},
    {method: "PATCH", path: "/api/v1/projects"},
    {method: "DELETE", path: "/api/v1/projects"},
    
    {method: "GET", path: "/api/v1/requests"},
    {method: "DELETE", path: "/api/v1/requests"},
]
const ADMIN_DASHBOARD_ROUTE = '/ua/admin-dashboard';
const LOGIN_ROUTE = '/ua/admin-auth';


export const withAuth: MiddlewareFactory = (next) => {
    return async (request: NextRequest, event: NextFetchEvent) => {
        const { pathname } = request.nextUrl;
    
        const token  = request.cookies.get('token')?.value;
        const isAuthenticated = token ? Boolean(await verifyJWT(token)) : false;
        const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.includes(route.path) && route.method === request.method);
    
        // Якщо на логінці і вже зареєстрований
        if (isAuthenticated && pathname.startsWith(LOGIN_ROUTE)) {
            return NextResponse.redirect(new URL(ADMIN_DASHBOARD_ROUTE, request.url))
        }
    
        // Якщо на захищеній сторінці, але не зареєстрований
        if (isProtectedRoute && !isAuthenticated) {
            // return NextResponse.redirect(new URL(LOGIN_ROUTE, request.url))
            return NextResponse.redirect(new URL("/admin-auth", request.url))
        }

        return next(request, event);
    }
    

}