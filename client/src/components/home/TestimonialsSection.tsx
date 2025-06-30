import { Star } from "lucide-react";
import { Card, CardContent } from "../ui";

const testimonials = [
  {
    name: "Amina K.",
    role: "Sender",
    quote:
      "KargoConnect was a lifesaver! I needed to send a gift to my family in another city, and it was so much cheaper and faster than the post office.",
    stars: 5,
  },
  {
    name: "Youssef B.",
    role: "Transporter",
    quote:
      "I drive from Casablanca to Marrakech every week for work. Now, I cover my fuel costs and make extra money by carrying packages. The app is super easy to use.",
    stars: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-16 md:py-24 bg-white dark:bg-slate-950"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Trusted by our Community
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
            Real stories from the people connecting through our platform.
          </p>
        </div>
        <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
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
