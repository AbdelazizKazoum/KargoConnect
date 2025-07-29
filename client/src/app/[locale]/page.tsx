/* eslint-disable @typescript-eslint/no-explicit-any */
import CTASection from "@/components/home/CTASection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import Header from "@/components/layout/Header";
import { getServerSession } from "next-auth";
import { createTranslator } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function App({ params }: any) {
  const { locale } = params;
  const messages = await getMessages(); // This gets messages based on the current locale
  const t = createTranslator({ locale, messages });

  const session = await getServerSession();
  return (
    <>
      <Header
        additionalLinksForRoot={[
          { name: t("header.dashboard"), href: `/${locale}/dashboard` },
        ]}
        state="public"
        user={session?.user || null}
      />
      <main className="pt-16">
        <HeroSection locale={locale} />
        <HowItWorksSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
      </main>
    </>
  );
}
