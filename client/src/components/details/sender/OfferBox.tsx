"use client";

import { ArrowRight, CheckCircle, Info } from "lucide-react";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui";
import Input from "@/components/ui/input";

// --- Child Components for Details Page ---

const OfferConfirmationModal = ({
  modalState,
  onClose,
}: {
  modalState: "closed" | "submitting" | "success";
  onClose: () => void;
}) => {
  const t = useTranslations("details.demand");
  if (modalState === "closed") return null;

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen z-50 bg-black/70 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-xl shadow-2xl w-full max-w-md mx-auto p-6 text-center space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {modalState === "submitting" && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <h3 className="text-xl font-bold">{t("submittingOfferTitle")}</h3>
            <p className="text-muted-foreground">
              {t("submittingOfferSubtitle")}
            </p>
          </>
        )}
        {modalState === "success" && (
          <>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold">{t("offerSentTitle")}</h3>
            <p className="text-muted-foreground">{t("offerSentSubtitle")}</p>
            <div className="pt-2">
              <Button className="w-full" onClick={onClose}>
                {t("done")}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const OfferBox = ({ budget }: { budget: number }) => {
  const t = useTranslations("details.demand");
  const [modalState, setModalState] = useState<
    "closed" | "submitting" | "success"
  >("closed");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalState("submitting");
    // Simulate API call
    setTimeout(() => {
      setModalState("success");
    }, 1500);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-card border rounded-xl shadow-sm p-6 space-y-4"
      >
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
            required
          />
        </div>
        <Button
          size="lg"
          className="w-full"
          type="submit"
          disabled={modalState === "submitting"}
        >
          {modalState === "submitting" ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground"></div>
          ) : (
            <>
              {t("submitOffer")} <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
        <div className="text-xs text-muted-foreground flex gap-2">
          <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <span>{t("offerNote")}</span>
        </div>
      </form>
      <OfferConfirmationModal
        modalState={modalState}
        onClose={() => setModalState("closed")}
      />
    </>
  );
};

export default OfferBox;
