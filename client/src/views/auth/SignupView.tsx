/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ArrowLeft, X, CheckCircle2 } from "lucide-react";

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
};

// Success Modal Component
const SuccessModal = ({
  isOpen,
  onClose,
  onLoginClick,
}: {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}) => {
  const t = useTranslations("auth.successModal");

  if (!isOpen) return null;

  return (
    // Backdrop
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center">
      {/* Modal Content */}
      <div className="bg-white rounded-xl shadow-2xl p-8 m-4 max-w-sm w-full text-center relative transform transition-all duration-300 ease-in-out scale-100">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{t("title")}</h3>
        <p className="text-gray-600 mb-6">{t("message")}</p>
        <Button
          onClick={onLoginClick}
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg"
        >
          {t("loginButton")}
        </Button>
      </div>
    </div>
  );
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
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const totalSteps = role === "transporter" ? 3 : 2;

  const handleNextStep = (stepData: object) => {
    const updatedData = { ...formData, role, ...stepData };
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
    const completeFormData = { ...formData, ...finalStepData, role };
    console.log("🚀 ~ handleFinalSubmit ~ completeFormData:", completeFormData);

    try {
      const res = await register(completeFormData as any);
      console.log("✅ Signup Success:", res.data);
      setSuccess(true);
      setShowSuccessModal(true);
    } catch (error: any) {
      console.error("❌ Signup Failed:", error);
      const errorMsg = error?.response?.data?.message || "An error occurred.";
      setError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    // This logic is already correct: it hides the form steps on success.
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
      {/* The modal remains unchanged and will appear on top */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onLoginClick={() => setView("login")}
      />

      {/* CHANGE 1: Simplified condition. Show header only if NOT successful. */}
      {!success && (
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
      )}

      {/* This will render the form steps, which are correctly hidden on success */}
      {renderStep()}

      {/* Error Message */}
      {error && !success && (
        <p className="text-sm text-red-500 mt-4 text-center">{error}</p>
      )}

      {/* CHANGE 2: Simplified condition. Show success card AS SOON as success is true. */}
      {success && (
        <div className="mt-6 p-6 rounded-lg bg-green-50 border border-green-200 text-center">
          <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-3" />
          <h3 className="text-xl font-semibold text-green-800">
            Account Created!
          </h3>
          <p className="text-green-700 mt-1">
            You can now log in using your credentials.
          </p>
        </div>
      )}

      {/* CHANGE 3: Simplified condition. Hide the "already have account" link on success. */}
      {!success && (
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
      )}
    </div>
  );
}
