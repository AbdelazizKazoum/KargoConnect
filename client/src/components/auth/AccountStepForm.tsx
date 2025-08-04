// components/auth/AccountStepForm.tsx
"use-client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations, useLocale } from "next-intl";
import { Eye, EyeOff } from "lucide-react";
import Label from "../ui/label";
import Input from "../ui/input";
import { Button } from "../ui";
import FormError from "../ui/FormError";

// Define the shape of the form data for this step
type AccountFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

// Define the component's props
interface AccountStepFormProps {
  onSuccess: (data: AccountFormData) => void;
  initialData: Partial<AccountFormData>;
}

export const AccountStepForm = ({
  onSuccess,
  initialData,
}: AccountStepFormProps) => {
  const t = useTranslations("auth");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountFormData>({
    defaultValues: initialData,
    mode: "onTouched",
  });

  // This function is called only when this step's form is valid
  const onSubmit = (data: AccountFormData) => {
    onSuccess(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">{t("firstName")}</Label>
          <Input
            id="firstName"
            placeholder={t("firstNamePlaceholder")}
            {...register("firstName", { required: t("errors.required") })}
          />
          <FormError message={errors.firstName?.message} />
        </div>
        <div>
          <Label htmlFor="lastName">{t("lastName")}</Label>
          <Input
            id="lastName"
            placeholder={t("lastNamePlaceholder")}
            {...register("lastName", { required: t("errors.required") })}
          />
          <FormError message={errors.lastName?.message} />
        </div>
      </div>
      <div>
        <Label htmlFor="email">{t("email")}</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          {...register("email", {
            required: t("errors.required"),
            pattern: { value: /^\S+@\S+$/i, message: t("errors.invalidEmail") },
          })}
        />
        <FormError message={errors.email?.message} />
      </div>
      <div>
        <Label htmlFor="password">{t("password")}</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            {...register("password", {
              required: t("errors.required"),
              minLength: { value: 8, message: t("errors.passwordLength") },
            })}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={`absolute top-0 h-full ${isRTL ? "left-0" : "right-0"}`}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
        <FormError message={errors.password?.message} />
      </div>

      <Button type="submit" className="w-full">
        {t("continue")}
      </Button>
    </form>
  );
};
