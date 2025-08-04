// components/ImageUploader.tsx
"use client";

import React, { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { UploadCloud, Trash2 } from "lucide-react";
import Image from "next/image";
import Label from "./ui/label";

// Define the component's props
interface ImageUploaderProps {
  onFilesChange: (files: File[]) => void;
}

export const ImageUploader = ({ onFilesChange }: ImageUploaderProps) => {
  const t = useTranslations("auth.vehicleInfo");
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (selectedFiles.length === 0) return;

    const newFiles = [...files, ...selectedFiles];
    setFiles(newFiles);
    onFilesChange(newFiles);

    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveFile = (indexToRemove: number) => {
    // Revoke the object URL to prevent memory leaks
    URL.revokeObjectURL(previews[indexToRemove]);

    const newFiles = files.filter((_, i) => i !== indexToRemove);
    const newPreviews = previews.filter((_, i) => i !== indexToRemove);
    setFiles(newFiles);
    setPreviews(newPreviews);
    onFilesChange(newFiles);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      const newFiles = [...files, ...droppedFiles];
      setFiles(newFiles);
      onFilesChange(newFiles);

      const newPreviews = droppedFiles.map((file) => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  return (
    <div>
      <Label>{t("photos")}</Label>
      <div
        className="mt-1 flex justify-center rounded-lg border border-dashed border-input px-6 py-10"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
          <div className="mt-4 flex text-sm leading-6 text-muted-foreground">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-background font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 hover:text-primary/80"
            >
              <span>{t("uploadFile")}</span>
              <input
                ref={fileInputRef}
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                multiple
                onChange={handleFileChange}
                accept="image/*"
              />
            </label>
            <p className="pl-1">{t("dragAndDrop")}</p>
          </div>
          <p className="text-xs leading-5 text-muted-foreground">
            {t("fileTypes")}
          </p>
        </div>
      </div>
      {previews.length > 0 && (
        <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
          {previews.map((src, index) => (
            <div key={src} className="relative group">
              <Image
                src={src}
                alt={`Preview ${index}`}
                width={96}
                height={96}
                className="h-24 w-24 object-cover rounded-md"
                style={{ objectFit: "cover", borderRadius: "0.375rem" }}
              />
              <button
                type="button"
                onClick={() => handleRemoveFile(index)}
                className="absolute top-1 right-1 bg-destructive/80 text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
