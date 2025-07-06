import { Button } from "@/components/ui";
import Input from "@/components/ui/input";
import { ArrowRight, Info } from "lucide-react";
import { useTranslations } from "next-intl";

const OfferBox = ({ budget }: { budget: number }) => {
  const t = useTranslations("details.demand");
  return (
    <div className="bg-card border rounded-xl shadow-sm p-6 space-y-4">
      <h2 className="text-xl font-bold">{t("makeOffer")}</h2>
      <div className="text-sm">
        <p className="text-muted-foreground">{t("senderBudget")}</p>

        <p className="text-2xl font-bold text-primary">
          {budget.toFixed(2)} MAD
        </p>
      </div>
      <div>
        <label htmlFor="offer-price" className="text-sm font-medium">
          {t("yourOffer")}
        </label>
        <Input
          id="offer-price"
          type="number"
          placeholder="e.g., 180"
          className="mt-1"
        />
      </div>
      <Button size="lg" className="w-full">
        {t("submitOffer")} <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      <div className="text-xs text-muted-foreground flex gap-2">
        <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
        <span>{t("offerNote")}</span>
      </div>
    </div>
  );
};

export default OfferBox;
