import { Eye, EyeOff, Facebook, Circle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import { useTranslations, useLocale } from "next-intl";

type AuthView = "role_select" | "signup" | "login";

export default function LoginView({
  setView,
}: {
  setView: (view: AuthView) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const t = useTranslations("auth");
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
      <div className={` ${isRTL ? "text-right" : ""}`}>
        <h1 className="text-3xl font-bold tracking-tight">
          {t("loginTitle", { default: "Welcome Back" })}
        </h1>
        <p className="text-muted-foreground mt-2">
          {t("loginSubtitle", { default: "Log in to access your dashboard." })}
        </p>
      </div>
      {/* Social Auth Buttons */}
      <div className="flex flex-col gap-3">
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          onClick={() => alert("Google Auth not implemented")}
        >
          <span className="flex items-center">
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
          <Facebook className="h-5 w-5 text-[#1877f3]" fill="#1877f3" />
          {t("continueWithFacebook", { default: "Continue with Facebook" })}
        </Button>
      </div>
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
      <div className="space-y-4">
        <div>
          <Label htmlFor="email">{t("email", { default: "Email" })}</Label>
          <Input id="email" type="email" placeholder="name@example.com" />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="password">
              {t("password", { default: "Password" })}
            </Label>
            <a
              href="#"
              className="text-sm font-medium text-primary hover:underline"
            >
              {t("forgotPassword", { default: "Forgot password?" })}
            </a>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className={isRTL ? "" : ""}
            />
            <Button
              variant="ghost"
              size="icon"
              className={`absolute top-0 h-full ${
                isRTL ? "left-0" : "right-0"
              }`}
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              type="button"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        <Button className="w-full">{t("login", { default: "Log In" })}</Button>
      </div>
      <p className={`text-center text-sm ${isRTL ? "text-right" : ""}`}>
        {t("noAccount", { default: "Don't have an account?" })}{" "}
        <button
          onClick={() => setView("role_select")}
          className="font-semibold text-primary hover:underline"
        >
          {t("signup", { default: "Sign Up" })}
        </button>
      </p>
    </div>
  );
}
