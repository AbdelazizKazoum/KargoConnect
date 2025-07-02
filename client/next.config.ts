import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  i18n: {
    locales: ["fr", "en"], // List your supported locales
    defaultLocale: "fr", // The default locale
    // localeDetection: true, // Automatically detect user language
  },
};

export default nextConfig;
