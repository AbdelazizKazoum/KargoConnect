"use client";

import React, { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ArrowLeft, X } from "lucide-react";
import { AccountStepForm } from "@/components/auth/AccountStepForm";
import { VehicleStepForm } from "@/components/auth/VehicleStepForm";
import { ProfileStepForm } from "@/components/auth/ProfileStepForm";
import { RoleStepForm } from "@/components/auth/RoleStepForm";
import { Button } from "@/components/ui";
import { completeProfile, register } from "@/services/auth/authService";
import axios, { AxiosError } from "axios";
import { useAuthStore } from "@/stores/authStore";
import merge from "lodash.merge";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

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
    redirectStep,
    nextStep: storeNextStep,
    prevStep: storePrevStep,
    setStep,
    setError,
    setSubmitting,
    setFormData,
  } = useAuthStore();

  const [displayStep, setDisplayStep] = useState(1);

  const isTransporter = formData.role === "transporter";
  const totalSteps = isCompletingProfile
    ? 1 + (isTransporter ? 1 : 0) + 1
    : 1 + 1 + (isTransporter ? 1 : 0) + 1;

  useEffect(() => {
    if (redirectStep) setStep(redirectStep);
  }, [redirectStep, setStep]);

  const handleNextStep = (stepData: object) => {
    if (isCompletingProfile && step === 1) {
      const currentData = useAuthStore.getState().formData;
      const newData = merge({}, currentData, stepData);
      setFormData(newData);
      setStep(3);
      setDisplayStep(2);
    } else {
      storeNextStep(stepData);
      setDisplayStep((s) => s + 1);
    }
  };

  const handlePrevStep = () => {
    if (isCompletingProfile && step === 3) {
      setStep(1);
      setDisplayStep(1);
      return;
    }

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

      if (isCompletingProfile) {
        await completeProfile(formDataToSend);
        await signIn("google", { redirect: true, callbackUrl: "/profile" });
        toast.success(t("registration_successful"));
      } else {
        await register(formDataToSend);
        await signIn("credentials", {
          redirect: true,
          callbackUrl: "/profile", // redirect directly to home
          email: completeFormData.email,
          password: completeFormData.password,
        });
        toast.success(t("registration_successful"));
      }
    } catch (err: unknown) {
      console.error("Registration error:", err);
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<
          { message?: string } | { message: { message: string } }
        >;
        let backendMessage: string | undefined;

        const msg = axiosError?.response?.data?.message;

        if (typeof msg === "string") {
          backendMessage = msg;
        } else if (msg && typeof msg === "object" && "message" in msg) {
          backendMessage = msg.message;
        }

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
      {step > 1 && (
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

      <div className={step === 1 ? "mt-12" : ""}>{renderStep()}</div>

      {error && (
        <div className="mt-6 rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700 flex items-start gap-2 max-w-md mx-auto">
          <X className="w-5 h-5 mt-0.5 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      {!isCompletingProfile && (
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
