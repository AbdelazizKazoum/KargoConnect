"use client";

import { Package, Truck } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useAuthStore } from "@/stores/authStore";

type RoleStepFormProps = {
  onSuccess: (data: { role: "sender" | "transporter" }) => void;
};

export function RoleStepForm({ onSuccess }: RoleStepFormProps) {
  const t = useTranslations("auth");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const { setFormData } = useAuthStore();

  const selectRole = (role: "sender" | "transporter") => {
    setFormData({ role });
    onSuccess({ role });
  };

  return (
    <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
      <h1 className="text-3xl font-bold">{t("roleTitle")}</h1>
      <p className="text-muted-foreground">{t("roleSubtitle")}</p>
      <div className="grid grid-cols-1 gap-4">
        <button
          onClick={() => selectRole("sender")}
          className="group text-left p-4 flex items-center gap-4 border border-input rounded-lg hover:border-primary hover:bg-accent"
        >
          <div className="flex-shrink-0 bg-secondary p-3 rounded-md">
            <Package className="h-6 w-6 text-secondary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold">{t("senderTitle")}</h3>
            <p className="text-sm text-muted-foreground">{t("senderDesc")}</p>
          </div>
        </button>
        <button
          onClick={() => selectRole("transporter")}
          className="group text-left p-4 flex items-center gap-4 border border-input rounded-lg hover:border-primary hover:bg-accent"
        >
          <div className="flex-shrink-0 bg-secondary p-3 rounded-md">
            <Truck className="h-6 w-6 text-secondary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold">{t("transporterTitle")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("transporterDesc")}
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
