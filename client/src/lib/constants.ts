export const PUBLIC_PATHS = ["/", "/auth"];

export const PROTECTED_PATHS = [
  "/dashboard",
  "/[locale]/(private)/profile",
  "/details",
];
export const LOADING_COMPONENTS = [
  "/dashboard/loading",
  "/auth/loading",
  "/loading",
  "/[locale]/(public)/loading",
  "/[locale]/(private)/loading",
  "/[locale]/auth/loading",
];

export const AUTH_ONLY_PATHS = ["/auth"];

export const LOCALES = ["en", "ar", "fr", "es", "de"];

export const DEFAULT_LOCALE = "en";
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

export const APP_NAME = "KargoConnect";
