"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { ImageUploader } from "../ImageUploader";
import Label from "../ui/label";
import FormError from "../ui/FormError";
import Input from "../ui/input";
import Textarea from "../ui/Textarea";
import { Button } from "../ui";

// Form data type
type VehicleFormData = {
  vehicle: {
    type: string;
    capacity_kg: number;
    plate_number: string;
    description?: string;
    images?: File[];
  };
};

// Props
interface VehicleStepFormProps {
  onSuccess: (data: VehicleFormData) => void;
  initialData: Partial<VehicleFormData["vehicle"]>;
}

export const VehicleStepForm = ({
  onSuccess,
  initialData,
}: VehicleStepFormProps) => {
  const t = useTranslations("auth.vehicleInfo");
  const tAuth = useTranslations("auth");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VehicleFormData>({
    defaultValues: {
      vehicle: {
        type: initialData.type || "",
        capacity_kg: initialData.capacity_kg || 0,
        plate_number: initialData.plate_number || "",
        description: initialData.description || "",
        images: initialData.images || [],
      },
    },
    mode: "onTouched",
  });

  const onSubmit = (data: VehicleFormData) => {
    onSuccess(data);
  };

  React.useEffect(() => {
    register("vehicle.images");
  }, [register]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="type">{t("type")}</Label>
        <select
          id="type"
          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          {...register("vehicle.type", {
            required: tAuth("errors.required"),
          })}
        >
          <option value="">{t("options.select")}</option>
          <option value="car">{t("options.car")}</option>
          <option value="van">{t("options.van")}</option>
          <option value="pickup">{t("options.pickup")}</option>
          <option value="motorcycle">{t("options.motorcycle")}</option>
        </select>
        <FormError message={errors.vehicle?.type?.message} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="capacity_kg">{t("capacity")}</Label>
          <Input
            id="capacity_kg"
            type="number"
            placeholder="e.g., 500"
            {...register("vehicle.capacity_kg", {
              required: tAuth("errors.required"),
              valueAsNumber: true,
            })}
          />
          <FormError message={errors.vehicle?.capacity_kg?.message} />
        </div>
        <div>
          <Label htmlFor="plate_number">{t("plate")}</Label>
          <Input
            id="plate_number"
            placeholder="e.g., 123-A-45"
            {...register("vehicle.plate_number", {
              required: tAuth("errors.required"),
            })}
          />
          <FormError message={errors.vehicle?.plate_number?.message} />
        </div>
      </div>

      <div>
        <Label htmlFor="description">{t("description")}</Label>
        <Textarea
          id="description"
          placeholder={t("descriptionPlaceholder")}
          {...register("vehicle.description")}
        />
      </div>

      <ImageUploader
        onFilesChange={(files) => setValue("vehicle.images", files)}
      />

      <Button type="submit" className="w-full">
        {tAuth("continue")}
      </Button>
    </form>
  );
};
