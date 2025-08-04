/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ArrowLeft } from "lucide-react";

import { AccountStepForm } from "@/components/auth/AccountStepForm";
import { VehicleStepForm } from "@/components/auth/VehicleStepForm";
import { ProfileStepForm } from "@/components/auth/ProfileStepForm";
import { Button } from "@/components/ui";
import { register } from "@/services/auth/authService";

type UserRole = "sender" | "transporter" | null;
type AuthView = "role_select" | "signup" | "login";

type SignupViewProps = {
  role: UserRole;
  setView: (view: AuthView) => void;
  step: number;
  handleNextStep: () => void;
  handlePrevStep: () => void;
};

export default function SignupView({ role, setView }: SignupViewProps) {
  const t = useTranslations("auth");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const totalSteps = role === "transporter" ? 3 : 2;

  const handleNextStep = (stepData: object) => {
    const updatedData = { ...formData, ...stepData };
    setFormData(updatedData);
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    if (step === 1) {
      setView("role_select");
    } else {
      setStep((prev) => prev - 1);
    }
  };

  const handleFinalSubmit = async (finalStepData: object) => {
    setIsSubmitting(true);
    setError(null);
    const completeFormData = { ...formData, ...finalStepData };

    try {
      const res = await register(completeFormData as any);
      console.log("✅ Signup Success:", res.data);
      setSuccess(true);
    } catch (error: any) {
      console.error("❌ Signup Failed:", error);
      const errorMsg =
        error?.response?.data?.message || "Une erreur est survenue.";
      setError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    if (success) return null;

    switch (step) {
      case 1:
        return (
          <AccountStepForm onSuccess={handleNextStep} initialData={formData} />
        );
      case 2:
        if (role === "transporter") {
          return (
            <VehicleStepForm
              onSuccess={handleNextStep}
              initialData={formData}
            />
          );
        }
        return (
          <ProfileStepForm
            onSuccess={handleFinalSubmit}
            initialData={formData}
            isSubmitting={isSubmitting}
          />
        );
      case 3:
        return (
          <ProfileStepForm
            onSuccess={handleFinalSubmit}
            initialData={formData}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      <div className="flex items-center mb-6">
        <Button
          type="button"
          onClick={handlePrevStep}
          variant="ghost"
          size="icon"
          className="mr-2 h-8 w-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight capitalize">
            {role === "sender"
              ? t("senderTitle")
              : role === "transporter"
              ? t("transporterTitle")
              : t("signup")}
          </h1>
          <p className="text-muted-foreground">
            {t("stepOf", { step, total: totalSteps })}
          </p>
        </div>
      </div>

      {/* Step Form */}
      {renderStep()}

      {/* Error Message */}
      {error && (
        <p className="text-sm text-red-500 mt-4 text-center">{error}</p>
      )}

      {/* Success Message */}
      {success && (
        <div className="mt-6 p-4 rounded-lg bg-green-100 text-green-800 text-center text-sm font-medium">
          ✅ Inscription réussie ! Vous pouvez maintenant vous connecter.
        </div>
      )}

      <p className="mt-6 text-center text-sm">
        {t("alreadyAccount")}{" "}
        <button
          type="button"
          onClick={() => setView("login")}
          className="font-semibold text-primary hover:underline"
        >
          {t("login")}
        </button>
      </p>
    </div>
  );
}
