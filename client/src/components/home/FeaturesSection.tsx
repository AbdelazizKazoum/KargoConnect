import { Zap, Feather, Users, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui";
import { useTranslations } from "next-intl";

interface Feature {
  title: string;
  description: string;
}

const icons = [
  <Zap className="w-8 h-8 text-slate-900 dark:text-slate-50" key="zap" />,
  <Feather
    className="w-8 h-8 text-slate-900 dark:text-slate-50"
    key="feather"
  />,
  <Users className="w-8 h-8 text-slate-900 dark:text-slate-50" key="users" />,
  <Shield className="w-8 h-8 text-slate-900 dark:text-slate-50" key="shield" />,
];

export default function FeaturesSection() {
  const t = useTranslations("features");
  const features = t.raw("list");

  return (
    <section
      id="features"
      className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900"
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
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature: Feature, index: number) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto bg-slate-100 dark:bg-slate-800/50 p-3 rounded-full">
                  {icons[index]}
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
