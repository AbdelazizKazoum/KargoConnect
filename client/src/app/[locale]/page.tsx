/* eslint-disable @typescript-eslint/no-explicit-any */
import CTASection from "@/components/home/CTASection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import Header from "@/components/layout/Header";
import { getServerSession } from "next-auth";

export default async function App({ params }: any) {
  const { locale } = params;
  const session = await getServerSession();
  return (
    <>
      <Header state="public" user={session?.user || null} />
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
