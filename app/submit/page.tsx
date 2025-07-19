"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Upload,
  X,
  Plus,
  Eye,
  Github,
  ExternalLink,
} from "lucide-react";
import Header from "@/components/Header";
import { useSubmitProject } from "@/hooks/use-submit-project";
import { useCategories } from "@/hooks/use-categories";

interface ProjectFormData {
  title: string;
  description: string;
  longDescription: string;
  image: string;
  liveUrl: string;
  githubUrl: string;
  technologies: string[];
  category: string;
  features: string[];
  techDetails: string;
  challenges: string;
}

export default function SubmitPage() {
  const router = useRouter();
  const { userId } = useAuth();
  const submitProjectMutation = useSubmitProject();
  const { data: categories = [], isLoading: categoriesLoading } =
    useCategories();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
    longDescription: "",
    image: "",
    liveUrl: "",
    githubUrl: "",
    technologies: [],
    category: "",
    features: [""],
    techDetails: "",
    challenges: "",
  });

  const [techInput, setTechInput] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  // Set default category when categories are loaded
  useEffect(() => {
    if (categories.length > 0 && !formData.category) {
      setFormData((prev) => ({ ...prev, category: categories[0].slug }));
    }
  }, [categories, formData.category]);

  // Helper function to get emoji for category
  const getCategoryEmoji = (slug: string) => {
    const emojiMap: Record<string, string> = {
      chef: "🧑‍🍳",
      convex: "🟠",
      lovable: "💙",
      tempo: "⏱️",
      cursor: "🖱️",
      bolt: "⚡",
      replit: "🔄",
      v0: "v0",
      windsurf: "🏄",
      base44: "🟧",
    };
    return emojiMap[slug] || "📁";
  };

  const handleInputChange = (field: keyof ProjectFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()],
      }));
      setTechInput("");
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }));
  };

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.map((feature, i) =>
        i === index ? value : feature
      ),
    }));
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleImageUrlChange = (url: string) => {
    handleInputChange("image", url);
    setImagePreview(url);
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          formData.title.trim() &&
          formData.description.trim() &&
          formData.liveUrl.trim()
        );
      case 2:
        return (
          formData.technologies.length > 0 &&
          formData.features.some((f) => f.trim())
        );
      case 3:
        return formData.techDetails.trim() || formData.challenges.trim();
      default:
        return true;
    }
  };

  const handleSubmit = () => {
    if (!userId) {
      console.error("User is not authenticated.");
      // Optionally, redirect to sign-in or show a message
      router.push("/sign-in");
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
      <Header />

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
            {currentStep === 1 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">שם הפרויקט *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) =>
                          handleInputChange("title", e.target.value)
                        }
                        placeholder="הכנס את שם הפרויקט"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">תיאור קצר *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleInputChange("liveUrl", e.target.value)
                        }
                        placeholder="https://your-project.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="githubUrl">מאגר GitHub</Label>
                      <Input
                        id="githubUrl"
                        type="url"
                        value={formData.githubUrl}
                        onChange={(e) =>
                          handleInputChange("githubUrl", e.target.value)
                        }
                        placeholder="https://github.com/username/repo"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="image">קישור לתמונת הפרויקט</Label>
                      <Input
                        id="image"
                        type="url"
                        value={formData.image}
                        onChange={(e) => handleImageUrlChange(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                      />
                      {imagePreview && (
                        <div className="mt-2">
                          <img
                            src={imagePreview}
                            alt="תצוגה מקדימה"
                            className="w-full h-32 object-cover rounded border"
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="category">קטגוריה *</Label>
                      <select
                        id="category"
                        value={formData.category}
                        onChange={(e) =>
                          handleInputChange("category", e.target.value)
                        }
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={categoriesLoading}
                      >
                        {categoriesLoading ? (
                          <option>טוען קטגוריות...</option>
                        ) : (
                          categories.map((cat) => (
                            <option key={cat.slug} value={cat.slug}>
                              {getCategoryEmoji(cat.slug)} {cat.name} -{" "}
                              {cat.description || ""}
                            </option>
                          ))
                        )}
                      </select>
                    </div>
                  </div>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <div>
                  <Label>טכנולוגיות בשימוש *</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      placeholder="הוסף טכנולוגיה"
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(), addTechnology())
                      }
                    />
                    <Button
                      type="button"
                      onClick={addTechnology}
                      variant="outline"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3 flex-row-reverse">
                    {formData.technologies.map((tech, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {tech}
                        <X
                          className="w-3 h-3 cursor-pointer"
                          onClick={() => removeTechnology(tech)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>תכונות עיקריות *</Label>
                  <div className="space-y-2 mt-1">
                    {formData.features.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={feature}
                          onChange={(e) => updateFeature(index, e.target.value)}
                          placeholder={`תכונה ${index + 1}`}
                        />
                        {formData.features.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeFeature(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addFeature}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 ml-2" />
                      הוסף תכונה
                    </Button>
                  </div>
                </div>
              </>
            )}

            {currentStep === 3 && (
              <>
                <div>
                  <Label htmlFor="techDetails">יישום טכני</Label>
                  <Textarea
                    id="techDetails"
                    value={formData.techDetails}
                    onChange={(e) =>
                      handleInputChange("techDetails", e.target.value)
                    }
                    placeholder="תאר את האדריכלות הטכנית, הספריות העיקריות ופרטי היישום..."
                    rows={5}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="challenges">אתגרים ופתרונות</Label>
                  <Textarea
                    id="challenges"
                    value={formData.challenges}
                    onChange={(e) =>
                      handleInputChange("challenges", e.target.value)
                    }
                    placeholder="מה היו האתגרים העיקריים שעמדת בפניהם ואיך פתרת אותם?"
                    rows={5}
                    className="mt-1"
                  />
                </div>
              </>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">
                    תצוגה מקדימה של הפרויקט
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        {formData.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-4">
                        {formData.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4 flex-row-reverse">
                        {formData.technologies.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                        {formData.technologies.length > 3 && (
                          <Badge variant="outline">
                            +{formData.technologies.length - 3}
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 ml-1" />
                          צפה
                        </Button>
                        {formData.githubUrl && (
                          <Button size="sm" variant="outline">
                            <Github className="w-4 h-4 ml-1" />
                            GitHub
                          </Button>
                        )}
                      </div>
                    </div>
                    {formData.image && (
                      <div>
                        <img
                          src={formData.image}
                          alt={formData.title}
                          className="w-full h-32 object-cover rounded border"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                  <h4 className="font-medium text-amber-800 mb-2">
                    לפני השליחה
                  </h4>
                  <ul className="text-sm text-amber-700 space-y-1">
                    <li>• וודא שכל הפרטים נכונים</li>
                    <li>• בדוק שהקישורים עובדים</li>
                    <li>• ודא שהתמונה מוצגת כראוי</li>
                  </ul>
                </div>
              </div>
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
