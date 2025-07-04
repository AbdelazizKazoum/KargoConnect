import { ArrowRight } from "lucide-react";
import { Button } from "../ui";
import { useTranslations } from "next-intl";

export default function CTASection() {
  const t = useTranslations("cta");

  return (
    <section className="py-16 md:py-24 bg-slate-900 dark:bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-50">
          {t("title")}
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-300 dark:text-slate-400">
          {t("description")}
        </p>
        <div className="mt-8">
          <Button
            size="lg"
            className="bg-white text-slate-900 hover:bg-slate-200 dark:bg-white dark:hover:bg-slate-200 dark:text-slate-900"
          >
            {t("button")} <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
