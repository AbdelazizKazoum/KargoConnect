import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Cairo } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "./globals.css";
import { notFound } from "next/navigation";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  display: "swap",
});

// Localized metadata generator
export async function generateMetadata({
  params,
}: {
  params: { locale: "en" | "fr" | "ar" };
}): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    en: "KargoConnect - Smart Transportation",
    fr: "KargoConnect - Transport Intelligent",
    ar: "كارغو كونيكت - منصة النقل الذكي",
  };
  const descriptions = {
    en: "Smart transportation and delivery platform",
    fr: "Plateforme intelligente de transport et de livraison",
    ar: "منصة ذكية للنقل والتوصيل",
  };

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: {
      canonical: `https://yourdomain.com/${locale}`,
      languages: {
        en: "https://yourdomain.com/en",
        fr: "https://yourdomain.com/fr",
        ar: "https://yourdomain.com/ar",
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "fr" | "ar")) {
    notFound();
  }

  const messages = await getMessages();

  // Choose font based on locale
  const fontClass = locale === "ar" ? cairo.variable : inter.variable;

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={`${fontClass} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
