import { Zap, Feather, Users, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui";

const features = [
  {
    icon: <Zap className="w-8 h-8 text-slate-900 dark:text-slate-50" />,
    title: "Up to 50% Cheaper",
    description:
      "Senders save money by utilizing space in vehicles already on the road.",
  },
  {
    icon: <Feather className="w-8 h-8 text-slate-900 dark:text-slate-50" />,
    title: "Earn On Your Way",
    description:
      "Transporters can monetize their empty vehicle space, turning routine trips into profitable journeys.",
  },
  {
    icon: <Users className="w-8 h-8 text-slate-900 dark:text-slate-50" />,
    title: "Community-Driven",
    description:
      "Built on trust, our platform connects you with a community of verified users.",
  },
  {
    icon: <Shield className="w-8 h-8 text-slate-900 dark:text-slate-50" />,
    title: "Secure & Transparent",
    description:
      "With secure escrow payments and a two-way review system, every transaction is protected.",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Why Choose KargoConnect?
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
            We&apos;re building a more efficient, affordable, and
            community-driven logistics network.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto bg-slate-100 dark:bg-slate-800/50 p-3 rounded-full">
                  {feature.icon}
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle as="h3" className="text-xl">
                  {feature.title}
                </CardTitle>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
