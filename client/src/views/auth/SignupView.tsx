"use client";

import React, { useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ArrowLeft, X, CheckCircle2 } from "lucide-react";

import { AccountStepForm } from "@/components/auth/AccountStepForm";
import { VehicleStepForm } from "@/components/auth/VehicleStepForm";
import { ProfileStepForm } from "@/components/auth/ProfileStepForm";
import { Button } from "@/components/ui";
import { register } from "@/services/auth/authService";
import axios, { AxiosError } from "axios";
import { useAuthStore } from "@/stores/authStore";

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
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center">
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

  const {
    step,
    formData,
    isSubmitting,
    error,
    success,
    redirectStep,
    nextStep,
    prevStep,
    setStep,
    setError,
    setSubmitting,
    setSuccess,
    setFormData,
  } = useAuthStore();

  const totalSteps = role === "transporter" ? 3 : 2;

  // Set initial role if not already in store
  useEffect(() => {
    if (!formData.role) setFormData({ role });
  }, [role, formData.role, setFormData]);

  // Handle programmatic redirect
  useEffect(() => {
    if (redirectStep) setStep(redirectStep);
  }, [redirectStep, setStep]);

  const handleNextStep = (stepData: object) => nextStep(stepData);

  const handlePrevStep = () => {
    if (step === 1) {
      setView("role_select");
    } else {
      prevStep();
    }
  };

  const handleFinalSubmit = async (finalStepData: object) => {
    setSubmitting(true);
    setError(null);

    try {
      const completeFormData = { ...formData, ...finalStepData, role };

      const formDataToSend = new FormData();
      const vehicleImages: File[] = [];
      let profilePictureFile: File | null = null;

      if (completeFormData.vehicle?.images) {
        completeFormData.vehicle.images.forEach((file: File | string) => {
          if (file instanceof File) vehicleImages.push(file);
        });
      }

      if (completeFormData.profilePicture?.[0] instanceof File) {
        profilePictureFile = completeFormData.profilePicture[0];
      }

      const dataToSerialize = {
        ...completeFormData,
        vehicle: { ...completeFormData.vehicle, images: undefined },
        profilePicture: undefined,
      };

      formDataToSend.append("data", JSON.stringify(dataToSerialize));

      if (profilePictureFile)
        formDataToSend.append("profilePicture", profilePictureFile);
      vehicleImages.forEach((file) =>
        formDataToSend.append("vehicleImages", file)
      );

      const res = await register(formDataToSend);
      console.log("✅ Signup Success:", res.data);

      setSuccess(true);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<{ message?: string }>;
        const backendMessage = axiosError?.response?.data?.message;
        const translated =
          t.raw(`${backendMessage}`) || t("errors.server_error");
        setError(translated);
      } else {
        setError(t("errors.server_error"));
      }
    } finally {
      setSubmitting(false);
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
              initialData={formData.vehicle || {}}
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
      <SuccessModal
        isOpen={success}
        onClose={() => setSuccess(false)}
        onLoginClick={() => setView("login")}
      />

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

      {renderStep()}

      {error && !success && (
        <div className="mt-6 rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700 flex items-start gap-2 max-w-md mx-auto">
          <X className="w-5 h-5 mt-0.5 text-red-500" />
          <span>{error}</span>
        </div>
      )}

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
