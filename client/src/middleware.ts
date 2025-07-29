import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { AUTH_ONLY_PATHS, PROTECTED_PATHS } from "./lib/constants";

// Create the i18n middleware
const intlMiddleware = createMiddleware(routing);

// Define your public (no auth required) and auth-only paths
// const PUBLIC_PATHS = ["/", "/auth", "/auth/login", "/auth/register"];

const authSecret = process.env.AUTH_SECRET;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({ req: request, secret: authSecret });
  const locale = pathname.split("/")[1]; // e.g., /en/dashboard → 'en'

  // 1. Redirect unauthenticated users trying to access protected routes
  const isProtected = PROTECTED_PATHS.some((path) =>
    pathname.startsWith(`/${locale}${path}`)
  );
  if (!token && isProtected) {
    return NextResponse.redirect(new URL(`/${locale}/auth#login`, request.url));
  }

  // 2. Redirect authenticated users away from auth-only pages
  const isAuthOnly = AUTH_ONLY_PATHS.some((path) =>
    pathname.startsWith(`/${locale}${path}`)
  );
  if (token && isAuthOnly) {
    return NextResponse.redirect(new URL(`/${locale}/`, request.url));
  }

  // 3. Apply i18n middleware by default
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(ar|en|fr)/:path*"], // Matches all localized routes
};
