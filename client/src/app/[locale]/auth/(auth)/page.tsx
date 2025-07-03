"use client";

import Image from "next/image";
import { Package, Ship, Truck } from "lucide-react";
import React, { useState, useEffect } from "react";
import LoginView from "@/views/auth/LoginView";
import SignupView from "@/views/auth/SignupView";
import { useTranslations, useLocale } from "next-intl";

// --- Main Authentication Flow Component ---

type AuthView = "role_select" | "signup" | "login";
type UserRole = "sender" | "transporter" | null;

export default function AuthFlow() {
  const t = useTranslations("auth");
  const [view, setView] = useState<AuthView>("role_select");
  const [role, setRole] = useState<UserRole>(null);
  const [step, setStep] = useState(1);

  // Handle hash changes for login/signup
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#login") {
        setView("login");
      } else if (window.location.hash === "#signup") {
        setView("signup");
      } else {
        setView("role_select");
      }
    };

    handleHashChange(); // Set initial view based on hash

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // When switching views, update the hash
  const switchView = (newView: AuthView) => {
    if (newView === "login") {
      window.location.hash = "#login";
    } else if (newView === "signup") {
      window.location.hash = "#signup";
    } else {
      window.location.hash = "";
    }
    setView(newView);
  };

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    switchView("signup");
    setStep(1);
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      setView("role_select");
      setRole(null);
    }
  };

  const getImageForState = () => {
    if (view === "signup" && role === "sender")
      return "/images/signup_sender.jpg";
    if (view === "signup" && role === "transporter")
      return "/images/signup_transporter.jpg";
    return "/images/signup_transporter.jpg";
  };

  const renderContent = () => {
    if (view === "login") {
      return <LoginView setView={switchView} />;
    }
    if (view === "signup") {
      return (
        <SignupView
          role={role}
          step={step}
          handleNextStep={handleNextStep}
          handlePrevStep={handlePrevStep}
          setView={switchView}
        />
      );
    }
    return (
      <RoleSelectionView
        handleRoleSelect={handleRoleSelect}
        setView={switchView}
        t={t}
      />
    );
  };

  return (
    <div className="w-full min-h-screen pt-16 lg:pt-0 lg:grid lg:grid-cols-2">
      <div className="hidden lg:flex relative bg-slate-100 max-h-screen items-center justify-center">
        <Image
          src={getImageForState()}
          alt="KargoConnect background"
          className="h-full w-full object-cover transition-all duration-500"
          width={1080}
          height={1920}
          style={{ objectPosition: "center" }}
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src =
              "https://placehold.co/1080x1920/1e293b/ffffff?text=KargoConnect";
          }}
        />
        {/* Subtle dark overlay for readability, not hiding the image */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <Ship className="h-14 w-14 text-primary drop-shadow-lg" />
          <span className="mt-4 text-3xl font-extrabold text-white drop-shadow-lg tracking-tight">
            KargoConnect
          </span>
          <span className="mt-2 text-lg text-slate-200 font-medium drop-shadow">
            Smart, Social Shipping
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="mx-auto w-full max-w-md space-y-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

// --- Sub-Component for Role Selection ---

const RoleSelectionView = ({
  handleRoleSelect,
  setView,
  t,
}: {
  handleRoleSelect: (role: UserRole) => void;
  setView: (view: AuthView) => void;
  t: ReturnType<typeof useTranslations>;
}) => {
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <div className="space-y-6">
      <div
        className={`  ${isRTL ? "text-right" : ""}`}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <h1 className="text-3xl font-bold tracking-tight">
          {t("roleTitle", { default: "Join us" })}
        </h1>
        <p className="text-muted-foreground mt-2">
          {t("roleSubtitle", {
            default: "First, tell us what you'd like to do.",
          })}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <button
          onClick={() => handleRoleSelect("sender")}
          className="group text-left p-4 flex items-center gap-4 border border-input rounded-lg hover:border-primary hover:bg-accent transition-all"
          dir={isRTL ? "rtl" : "ltr"}
        >
          <div className="flex-shrink-0 bg-secondary p-3 rounded-md">
            <Package className="h-6 w-6 text-secondary-foreground" />
          </div>
          <div>
            <h3
              className={` font-semibold text-base ${
                isRTL ? "text-right" : ""
              }`}
            >
              {t("senderTitle", { default: "I'm a Sender" })}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("senderDesc", {
                default: "I want to ship packages affordably.",
              })}
            </p>
          </div>
        </button>
        <button
          onClick={() => handleRoleSelect("transporter")}
          className="group text-left p-4 flex items-center gap-4 border border-input rounded-lg hover:border-primary hover:bg-accent transition-all"
          dir={isRTL ? "rtl" : "ltr"}
        >
          <div className="flex-shrink-0 bg-secondary p-3 rounded-md">
            <Truck className="h-6 w-6 text-secondary-foreground" />
          </div>
          <div
            className={` font-semibold text-base ${isRTL ? "text-right" : ""}`}
          >
            <h3 className="font-semibold text-base">
              {t("transporterTitle", { default: "I'm a Transporter" })}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("transporterDesc", {
                default: "I want to earn money while driving.",
              })}
            </p>
          </div>
        </button>
      </div>
      <p
        className={`text-center text-sm ${isRTL ? "text-right" : ""}`}
        dir={isRTL ? "rtl" : "ltr"}
      >
        {t("alreadyAccount", { default: "Already have an account?" })}{" "}
        <button
          onClick={() => setView("login")}
          className="font-semibold text-primary hover:underline"
        >
          {t("login", { default: "Log In" })}
        </button>
      </p>
    </div>
  );
};
