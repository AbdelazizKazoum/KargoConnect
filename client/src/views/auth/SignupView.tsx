// SignupView.tsx (Main Component)
"use client";

import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ArrowLeft } from "lucide-react";

// Import the new step components
import { AccountStepForm } from "@/components/auth/AccountStepForm";
import { VehicleStepForm } from "@/components/auth/VehicleStepForm";
import { ProfileStepForm } from "@/components/auth/ProfileStepForm";
import { Button } from "@/components/ui";

// --- (Keep your other UI components like Input, Label, Textarea, ImageUploader, etc. here or in a separate file) ---

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

  const totalSteps = role === "transporter" ? 3 : 2;

  const handleNextStep = (stepData: object) => {
    const updatedData = { ...formData, ...stepData };
    setFormData(updatedData);
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    // Navigate back to role selection from step 1
    if (step === 1) {
      setView("role_select");
    } else {
      setStep((prev) => prev - 1);
    }
  };

  // This function is only called on the FINAL step
  const handleFinalSubmit = async (finalStepData: object) => {
    setIsSubmitting(true);
    const completeFormData = { ...formData, ...finalStepData };

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("✅ Form Data Submitted:", completeFormData);
    alert("Signup Complete! Check the console for the submitted data.");
    setIsSubmitting(false);
  };

  const renderStep = () => {
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
        // For 'sender', step 2 is the final profile step
        return (
          <ProfileStepForm
            onSuccess={handleFinalSubmit}
            initialData={formData}
            isSubmitting={isSubmitting}
          />
        );
      case 3: // This case is only for 'transporter'
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

      {/* Render the current step component */}
      {renderStep()}

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
