"use client";

import Image from "next/image";
import { Ship } from "lucide-react";
import React, { useState, useEffect } from "react";
import LoginView from "@/views/auth/LoginView";
import SignupView from "@/views/auth/SignupView";
import { useTranslations } from "next-intl";

type AuthView = "signup" | "login";

export default function AuthFlow() {
  const t = useTranslations("auth");
  const [view, setView] = useState<AuthView>("signup");

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#login") {
        setView("login");
      } else {
        setView("signup");
      }
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const switchView = (newView: AuthView) => {
    window.location.hash = newView === "login" ? "#login" : "#signup";
    setView(newView);
  };

  const getImageForState = () => {
    return "/images/signup_transporter.jpg";
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
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src =
              "https://placehold.co/1080x1920/1e293b/ffffff?text=KargoConnect";
          }}
        />
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
          {view === "login" ? (
            <LoginView setView={switchView} />
          ) : (
            <SignupView setView={switchView} />
          )}
        </div>
      </div>
    </div>
  );
}
