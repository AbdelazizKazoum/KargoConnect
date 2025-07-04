import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

// =====================================================================
// --- Server Component (Main Page) ------------------------------------
// =====================================================================
export default async function App({
  params: { locale },
}: {
  params: { locale: string };
}) {
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
