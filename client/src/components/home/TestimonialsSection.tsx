import { Star } from "lucide-react";
import { Card, CardContent } from "../ui";
import { useTranslations } from "next-intl";

type Testimonial = {
  stars: number;
  quote: string;
  name: string;
  role: string;
};

export default function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const testimonials = t.raw("list") as Testimonial[];

  return (
    <section
      id="testimonials"
      className="py-16 md:py-24 bg-white dark:bg-slate-950"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            {t("sectionTitle")}
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
            {t("sectionDescription")}
          </p>
        </div>
        <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index: number) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <blockquote className="text-slate-700 dark:text-slate-300 italic">
                  &quot;{testimonial.quote}&quot;
                </blockquote>
                <footer className="mt-4">
                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {testimonial.role}
                  </p>
                </footer>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
