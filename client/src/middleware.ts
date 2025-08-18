import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { AUTH_ONLY_PATHS, PROTECTED_PATHS } from "./lib/constants";

// Create the i18n middleware
const intlMiddleware = createMiddleware(routing);

const authSecret = process.env.AUTH_SECRET;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({ req: request, secret: authSecret });
  console.log("🚀 ~ middleware ~ token:", token);
  const locale = pathname.split("/")[1] || "en"; // Default to 'en' if no locale is present
  const authPath = `/${locale}/auth`;

  // Check if the current path is an auth-only path
  const isAuthOnly = AUTH_ONLY_PATHS.some((path) =>
    pathname.startsWith(`/${locale}${path}`)
  );

  // NEW: Force profile completion
  // If a user is logged in but their profile is incomplete,
  // and they are NOT trying to access the auth page,
  // redirect them to the auth page to finish registration.
  if (token && token.isProfileComplete === false && !isAuthOnly) {
    // You can redirect to a specific part of your auth page, e.g., using a hash
    return NextResponse.redirect(
      new URL(`${authPath}#complete-profile`, request.url)
    );
  }

  // 1. Redirect unauthenticated users trying to access protected routes
  const isProtected = PROTECTED_PATHS.some((path) =>
    pathname.startsWith(`/${locale}${path}`)
  );
  if (!token && isProtected) {
    return NextResponse.redirect(new URL(`${authPath}#login`, request.url));
  }

  // 2. Redirect authenticated users with COMPLETE profiles away from auth-only pages
  if (token && isAuthOnly) {
    if (token.isProfileComplete) {
      // If the profile is complete, they have no reason to be on the auth page.
      return NextResponse.redirect(new URL(`/${locale}/`, request.url));
    }
    // If their profile is INCOMPLETE, they are allowed to be on the auth page.
    // The middleware will continue to the next step, allowing the page to render.
  }

  // 3. Apply i18n middleware for all other cases
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/",
    // Exclude API, Next.js internals, favicon, and static asset folders
    "/((?!api|_next|favicon.ico|images|videos|profile-pictures).*)",
    "/(ar|en|fr)/:path*",
  ],
};
