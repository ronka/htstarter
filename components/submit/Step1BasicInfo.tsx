"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/ImageUploader";
import { UploadedImage, ProjectFormData } from "./types";

interface Step1BasicInfoProps {
  formData: ProjectFormData;
  uploadedImages: UploadedImage[];
  onInputChange: (field: keyof ProjectFormData, value: string) => void;
  onImageUpload: (images: UploadedImage[]) => void;
  validationMessage: string | null;
}

export const Step1BasicInfo = ({
  formData,
  uploadedImages,
  onInputChange,
  onImageUpload,
  validationMessage,
}: Step1BasicInfoProps) => {
  return (
    <>
      {validationMessage && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          {validationMessage}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">שם הפרויקט *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => onInputChange("title", e.target.value)}
              placeholder="הכנס את שם הפרויקט"
            />
          </div>

          <div>
            <Label htmlFor="description">תיאור קצר *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => onInputChange("description", e.target.value)}
              placeholder="תיאור קצר של הפרויקט שלך (1-2 משפטים)"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="liveUrl">קישור לדמו חי *</Label>
            <Input
              id="liveUrl"
              type="url"
              value={formData.liveUrl}
              onChange={(e) => onInputChange("liveUrl", e.target.value)}
              placeholder="https://your-project.com"
            />
          </div>

          <div>
            <Label htmlFor="githubUrl">מאגר GitHub</Label>
            <Input
              id="githubUrl"
              type="url"
              value={formData.githubUrl}
              onChange={(e) => onInputChange("githubUrl", e.target.value)}
              placeholder="https://github.com/username/repo"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="image">תמונת הפרויקט *</Label>
            <ImageUploader onUpload={onImageUpload} maxFiles={1} maxSize={5} />
          </div>
        </div>
      </div>
    </>
  );
};
