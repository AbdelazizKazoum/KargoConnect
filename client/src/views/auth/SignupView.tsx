import { ArrowLeft, Eye, EyeOff, Facebook, Circle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import { useTranslations, useLocale } from "next-intl";

type UserRole = "sender" | "transporter" | null;
type AuthView = "role_select" | "signup" | "login";

export default function SignupView({
  role,
  step,
  handleNextStep,
  handlePrevStep,
  setView,
}: {
  role: UserRole;
  step: number;
  handleNextStep: () => void;
  handlePrevStep: () => void;
  setView: (view: AuthView) => void;
}) {
  const totalSteps = role === "transporter" ? 3 : 2;
  const [showPassword, setShowPassword] = useState(false);
  const t = useTranslations("auth");
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      <div className="flex items-center mb-6">
        <Button
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
              ? t("senderTitle", { default: "I'm a Sender" })
              : role === "transporter"
              ? t("transporterTitle", { default: "I'm a Transporter" })
              : t("signup", { default: "Sign Up" })}
          </h1>
          <p className="text-muted-foreground">
            {t("stepOf", {
              default: "Step {step} of {total}",
              step,
              total: totalSteps,
            })}
          </p>
        </div>
      </div>

      {/* Social Auth Buttons */}
      {step === 1 && (
        <div className="flex flex-col gap-3 mb-6">
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => alert("Google Auth not implemented")}
          >
            <span className="flex items-center mx-2">
              <Circle className="h-5 w-5 text-[#EA4335]" fill="#EA4335" />
              <Circle className="h-5 w-5 -ml-3 text-[#FBBC05]" fill="#FBBC05" />
              <Circle className="h-5 w-5 -ml-3 text-[#34A853]" fill="#34A853" />
              <Circle className="h-5 w-5 -ml-3 text-[#4285F4]" fill="#4285F4" />
            </span>
            {t("continueWithGoogle", { default: "Continue with Google" })}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => alert("Facebook Auth not implemented")}
          >
            <Facebook className="h-5  w-5 text-[#1877f3]" fill="#1877f3" />
            {t("continueWithFacebook", { default: "Continue with Facebook" })}
          </Button>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200 dark:border-slate-700"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {t("or", { default: "or" })}
              </span>
            </div>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">{t("email", { default: "Email" })}</Label>
            <Input id="email" type="email" placeholder="name@example.com" />
          </div>
          <div>
            <Label htmlFor="password">
              {t("password", { default: "Password" })}
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
              />
              <Button
                variant="ghost"
                size="icon"
                className={`absolute top-0 h-full ${
                  isRTL ? "left-0" : "right-0"
                }`}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <Button onClick={handleNextStep} className="w-full">
            {t("continue", { default: "Continue" })}
          </Button>
        </div>
      )}

      {step === 2 && role === "transporter" && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="vehicleType">
              {t("vehicleType", { default: "Vehicle Type" })}
            </Label>
            <select
              id="vehicleType"
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option>
                {t("selectVehicle", { default: "Select a vehicle..." })}
              </option>
              <option>{t("car", { default: "Car (Sedan, SUV)" })}</option>
              <option>{t("van", { default: "Van" })}</option>
              <option>{t("pickup", { default: "Pickup Truck" })}</option>
              <option>
                {t("motorcycle", { default: "Motorcycle / Scooter" })}
              </option>
            </select>
          </div>
          <div>
            <Label htmlFor="capacity">
              {t("availableCapacity", { default: "Available Capacity" })}
            </Label>
            <Input
              id="capacity"
              type="text"
              placeholder={t("capacityPlaceholder", {
                default: "e.g., Trunk space for 2 boxes",
              })}
            />
          </div>
          <Button onClick={handleNextStep} className="w-full">
            {t("nextStep", { default: "Next Step" })}
          </Button>
        </div>
      )}

      {((step === 2 && role === "sender") ||
        (step === 3 && role === "transporter")) && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="fullName">
              {t("fullName", { default: "Full Name" })}
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder={t("fullNamePlaceholder", {
                default: "Enter your full name",
              })}
            />
          </div>
          <div>
            <Label htmlFor="profilePicture">
              {t("profilePicture", { default: "Profile Picture" })}
            </Label>
            <Input id="profilePicture" type="file" className="pt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {t("profilePictureHint", {
                default: "A clear photo helps build trust.",
              })}
            </p>
          </div>
          <Button onClick={() => alert("Signup Complete!")} className="w-full">
            {t("completeSignup", { default: "Complete Signup" })}
          </Button>
        </div>
      )}

      <p className="mt-6 text-center text-sm">
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
}
