"use client";

import React, { useEffect, useState } from "react";
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
import merge from "lodash.merge";

type AuthView = "signup" | "login";

export default function SignupView({
  setView,
  isCompletingProfile,
}: {
  setView: (view: AuthView) => void;
  isCompletingProfile: boolean;
}) {
  const t = useTranslations("auth");
  const t_global = useTranslations();

  const locale = useLocale();
  const isRTL = locale === "ar";

  const {
    step,
    formData,
    isSubmitting,
    error,
    success,
    redirectStep,
    nextStep: storeNextStep,
    prevStep: storePrevStep,
    setStep,
    setError,
    setSubmitting,
    setSuccess,
    setFormData,
  } = useAuthStore();

  // Local state to manage the displayed step number for a better user experience
  const [displayStep, setDisplayStep] = useState(1);

  // Determine the total number of steps based on the user's role and flow type
  const isTransporter = formData.role === "transporter";
  const totalSteps = isCompletingProfile
    ? 1 + (isTransporter ? 1 : 0) + 1 // Role + optional Vehicle + Profile
    : 1 + 1 + (isTransporter ? 1 : 0) + 1; // Role + Account + optional Vehicle + Profile

  useEffect(() => {
    if (redirectStep) setStep(redirectStep);
  }, [redirectStep, setStep]);

  // Custom handler for the next step to inject profile completion logic
  const handleNextStep = (stepData: object) => {
    // If completing profile and we just finished the role step (step 1),
    // skip the account step (step 2) and go directly to step 3.
    if (isCompletingProfile && step === 1) {
      const currentData = useAuthStore.getState().formData;
      const newData = merge({}, currentData, stepData);
      setFormData(newData); // Manually update form data with the role
      setStep(3); // Jump to step 3
      setDisplayStep(2); // UI shows step 2
    } else {
      storeNextStep(stepData);
      setDisplayStep((s) => s + 1);
    }
  };

  // Custom handler for the previous step
  const handlePrevStep = () => {
    // If we jumped from step 1 to 3, we need to jump back from 3 to 1.
    if (isCompletingProfile && step === 3) {
      setStep(1);
      setDisplayStep(1);
      return;
    }

    // Default behavior for new signups or other steps
    if (step > 1) {
      storePrevStep();
      setDisplayStep((s) => s - 1);
    }
  };

  const handleFinalSubmit = async (finalStepData: object) => {
    setSubmitting(true);
    setError(null);

    try {
      const completeFormData = { ...formData, ...finalStepData };
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
      console.error("Registration error:", err);
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<{ message?: string }>;

        const backendMessage = axiosError?.response?.data?.message;

        console.log("🚀 ~ handleFinalSubmit ~ backendMessage:", backendMessage);

        const translated =
          t_global.raw(`${backendMessage}`) || t_global("server_error");
        setError(translated);
      } else {
        setError(t_global("server_error"));
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
        // This case is now skipped during profile completion
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

      {/* The header is now only displayed from step 2 onwards */}
      {!success && step > 1 && (
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
              {t(`${formData.role}Title`)}
            </h1>
            <p className="text-muted-foreground">
              {t("stepOf", { step: displayStep, total: totalSteps })}
            </p>
          </div>
        </div>
      )}

      {/* Add some margin to the top of the form on step 1 to compensate for the hidden header */}
      <div className={step === 1 ? "mt-12" : ""}>{renderStep()}</div>

      {error && !success && (
        <div className="mt-6 rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700 flex items-start gap-2 max-w-md mx-auto">
          <X className="w-5 h-5 mt-0.5 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Hide the "already have an account" link when completing a profile */}
      {!success && !isCompletingProfile && (
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
