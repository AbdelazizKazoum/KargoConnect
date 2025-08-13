"use client";

import React, { useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ArrowLeft, X, CheckCircle2 } from "lucide-react";
import { AccountStepForm } from "@/components/auth/AccountStepForm";
import { VehicleStepForm } from "@/components/auth/VehicleStepForm";
import { ProfileStepForm } from "@/components/auth/ProfileStepForm";
import { RoleStepForm } from "@/components/auth/RoleStepForm";
import { Button } from "@/components/ui";
import { register } from "@/services/auth/authService";
import axios, { AxiosError } from "axios";
import { useAuthStore } from "@/stores/authStore";

type AuthView = "signup" | "login";

export default function SignupView({
  setView,
}: {
  setView: (view: AuthView) => void;
}) {
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
  console.log("🚀 ~ SignupView ~ formData:", formData);

  const totalSteps = formData.role === "transporter" ? 4 : 3;

  useEffect(() => {
    if (redirectStep) setStep(redirectStep);
  }, [redirectStep, setStep]);

  const handleNextStep = (stepData: object) => nextStep(stepData);

  const handlePrevStep = () => {
    if (step === 1) {
      setView("login");
    } else {
      prevStep();
    }
  };

  const handleFinalSubmit = async (finalStepData: object) => {
    setSubmitting(true);
    setError(null);

    try {
      const completeFormData = { ...formData, ...finalStepData };
      console.log(
        "🚀 ~ handleFinalSubmit ~ completeFormData:",
        completeFormData
      );

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

      await register(formDataToSend);
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
        return <RoleStepForm onSuccess={handleNextStep} />;
      case 2:
        return (
          <AccountStepForm onSuccess={handleNextStep} initialData={formData} />
        );
      case 3:
        if (formData.role === "transporter") {
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
      case 4:
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
      {success && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center">
          <div className="bg-white rounded-xl shadow-2xl p-8 m-4 max-w-sm w-full text-center">
            <CheckCircle2 className="h-10 w-10 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold">{t("successModal.title")}</h3>
            <p className="mb-6">{t("successModal.message")}</p>
            <Button
              onClick={() => setView("login")}
              className="w-full bg-primary text-white font-bold"
            >
              {t("successModal.loginButton")}
            </Button>
          </div>
        </div>
      )}

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
              {formData.role ? t(`${formData.role}Title`) : t("signup")}
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
