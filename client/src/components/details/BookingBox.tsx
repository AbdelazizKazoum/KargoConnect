"use client";
import { ArrowRight, Shield } from "lucide-react";
import { Button } from "../ui";
import { useTranslations } from "next-intl";

const BookingBox = ({
  price,
  fee,
  total,
}: {
  price: number;
  fee: number;
  total: number;
}) => {
  const t = useTranslations("details.transporter");

  return (
    <div className="bg-card border rounded-xl shadow-sm p-6 space-y-4">
      <h2 className="text-xl font-bold">{t("confirmBooking")}</h2>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">{t("tripPrice")}</span>
          <span>{price.toFixed(2)} MAD</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">{t("platformFee")}</span>
          <span>{fee.toFixed(2)} MAD</span>
        </div>
        <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
          <span>{t("total")}</span>
          <span>{total.toFixed(2)} MAD</span>
        </div>
      </div>
      <div className="text-xs text-muted-foreground flex gap-2">
        <Shield className="h-4 w-4 flex-shrink-0 mt-0.5" />
        <span>{t("paymentNote")}</span>
      </div>
      <Button size="lg" className="w-full">
        {t("proceedToPayment")} <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default BookingBox;
