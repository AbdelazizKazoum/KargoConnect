// components/auth/ProfileStepForm.tsx
"use-client";

import React from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import Label from "../ui/label";
import FormError from "../ui/FormError";
import Input from "../ui/input";
import { Button } from "../ui";

// Define the shape of the form data for this step
type ProfileFormData = {
  country: string;
  city: string;
  phone: string;
  profilePicture?: FileList;
};

// Define the component's props
interface ProfileStepFormProps {
  onSuccess: (data: ProfileFormData) => void;
  initialData: Partial<ProfileFormData>;
  isSubmitting: boolean; // To show loading state on the button
}

export const ProfileStepForm = ({
  onSuccess,
  initialData,
  isSubmitting,
}: ProfileStepFormProps) => {
  const t = useTranslations("auth");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: initialData,
    mode: "onTouched",
  });

  const onSubmit = (data: ProfileFormData) => {
    onSuccess(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="country">{t("personalInfo.country")}</Label>
          <Input
            id="country"
            placeholder={t("personalInfo.countryPlaceholder")}
            {...register("country", { required: t("errors.required") })}
          />
          <FormError message={errors.country?.message} />
        </div>
        <div>
          <Label htmlFor="city">{t("personalInfo.city")}</Label>
          <Input
            id="city"
            placeholder={t("personalInfo.cityPlaceholder")}
            {...register("city", { required: t("errors.required") })}
          />
          <FormError message={errors.city?.message} />
        </div>
      </div>
      <div>
        <Label htmlFor="phone">{t("personalInfo.phone")}</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+212 6 00 00 00 00"
          {...register("phone", { required: t("errors.required") })}
        />
        <FormError message={errors.phone?.message} />
      </div>
      <div>
        <Label htmlFor="profilePicture">
          {t("personalInfo.profilePicture")}
        </Label>
        <Input
          id="profilePicture"
          type="file"
          className="pt-2"
          accept="image/*"
          {...register("profilePicture")}
        />
        <p className="text-xs text-muted-foreground mt-1">
          {t("personalInfo.profilePictureHint")}
        </p>
      </div>

      <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
        {isSubmitting ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground"></div>
        ) : (
          t("completeSignup")
        )}
      </Button>
    </form>
  );
};
