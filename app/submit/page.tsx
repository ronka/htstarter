"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useSubmitProject } from "@/hooks/use-submit-project";
import {
  Step1BasicInfo,
  Step2TechnicalDetails,
  Step3ProjectInsights,
  Step4ReviewSubmit,
  ProjectFormData,
  UploadedImage,
} from "@/components/submit";

export default function SubmitPage() {
  const router = useRouter();
  const { userId } = useAuth();
  const submitProjectMutation = useSubmitProject();
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
    longDescription: "",
    image: "",
    liveUrl: "",
    githubUrl: "",
    technologies: [],
    features: [""],
  });

  const handleInputChange = (field: keyof ProjectFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFormDataChange = (newData: ProjectFormData) => {
    setFormData(newData);
  };

  const handleImageUpload = (images: UploadedImage[]) => {
    setUploadedImages(images);
    // Set the first image URL as the main image
    if (images.length > 0) {
      setFormData((prev) => ({
        ...prev,
        image: images[0].url,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        image: "",
      }));
    }
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          formData.title.trim() &&
          formData.description.trim() &&
          formData.liveUrl.trim() &&
          uploadedImages.length > 0
        );
      case 2:
        return (
          formData.technologies.length > 0 &&
          formData.features.some((f) => f.trim())
        );
      case 3:
        return formData.longDescription.trim();
      default:
        return true;
    }
  };

  const getStep1ValidationMessage = () => {
    if (!formData.title.trim()) return "שם הפרויקט נדרש";
    if (!formData.description.trim()) return "תיאור הפרויקט נדרש";
    if (!formData.liveUrl.trim()) return "קישור לדמו חי נדרש";
    if (uploadedImages.length === 0) return "תמונת הפרויקט נדרשת";
    return null;
  };

  const handleSubmit = () => {
    if (!userId) {
      console.error("User is not authenticated.");
      // Optionally, redirect to sign-in or show a message
      router.push("/sign-in");
      return;
    }

    // Validate that at least one image is uploaded
    if (uploadedImages.length === 0) {
      // Show error message and stay on step 1
      setCurrentStep(1);
      return;
    }

    // Submit the project using the mutation
    submitProjectMutation.mutate(formData);
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 ml-2" />
            חזרה לפרויקטים
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                שלח את הפרויקט שלך
              </h1>
              <p className="text-gray-600 mt-2">
                שתף את העבודה המדהימה שלך עם הקהילה
              </p>
            </div>

            <div className="flex items-center space-x-2 space-x-reverse">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === currentStep
                      ? "bg-blue-600 text-white"
                      : step < currentStep
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && "מידע בסיסי"}
              {currentStep === 2 && "פרטים טכניים"}
              {currentStep === 3 && "תובנות על הפרויקט"}
              {currentStep === 4 && "בדיקה ושליחה"}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {currentStep === 3 && (
              <Step1BasicInfo
                formData={formData}
                uploadedImages={uploadedImages}
                onInputChange={handleInputChange}
                onImageUpload={handleImageUpload}
                validationMessage={getStep1ValidationMessage()}
              />
            )}

            {currentStep === 2 && (
              <Step2TechnicalDetails
                formData={formData}
                onFormDataChange={handleFormDataChange}
              />
            )}

            {currentStep === 1 && (
              <Step3ProjectInsights
                formData={formData}
                onInputChange={handleInputChange}
              />
            )}

            {currentStep === 4 && (
              <Step4ReviewSubmit
                formData={formData}
                uploadedImages={uploadedImages}
              />
            )}

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                הקודם
              </Button>
              <div className="flex gap-2">
                {currentStep < 4 ? (
                  <Button
                    onClick={nextStep}
                    disabled={!validateStep(currentStep)}
                  >
                    הבא
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={submitProjectMutation.isPending}
                  >
                    {submitProjectMutation.isPending ? "שולח..." : "שלח פרויקט"}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
