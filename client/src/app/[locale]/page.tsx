/* eslint-disable @typescript-eslint/no-explicit-any */
import CTASection from "@/components/home/CTASection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";

export default async function App({ params }: any) {
  const { locale } = params;
  return (
    <>
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
