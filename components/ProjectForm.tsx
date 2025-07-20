import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ImageUploader } from "@/components/ImageUploader";

interface UploadedImage {
  url: string;
  filename: string;
  size: number;
}

interface ProjectFormProps {
  onClose: () => void;
  mode: "create" | "edit";
  projectId?: string;
  initialData?: {
    title: string;
    description: string;
    image: string;
    liveUrl: string;
    githubUrl: string;
    technologies: string[];
    category: string;
    features?: string[];
    techDetails?: string;
    challenges?: string;
  };
}

const ProjectForm = ({
  onClose,
  mode,
  projectId,
  initialData,
}: ProjectFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    liveUrl: "",
    githubUrl: "",
    technologies: "",
    category: "lovable",
    features: "",
    techDetails: "",
    challenges: "",
  });
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with existing data if editing
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        image: initialData.image || "",
        liveUrl: initialData.liveUrl || "",
        githubUrl: initialData.githubUrl || "",
        technologies: initialData.technologies?.join(", ") || "",
        category: initialData.category || "lovable",
        features: initialData.features?.join(", ") || "",
        techDetails: initialData.techDetails || "",
        challenges: initialData.challenges || "",
      });

      // If editing and there's an existing image, add it to uploaded images
      if (initialData.image) {
        setUploadedImages([
          {
            url: initialData.image,
            filename: "existing-image",
            size: 0,
          },
        ]);
      }
    }
  }, [mode, initialData]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    // Validate that at least one image is uploaded
    if (uploadedImages.length === 0) {
      toast.error("אנא העלה לפחות תמונה אחת לפרויקט");
      return;
    }

    setIsSubmitting(true);

    try {
      const technologiesArray = formData.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter((tech) => tech.length > 0);

      const featuresArray = formData.features
        .split(",")
        .map((feature) => feature.trim())
        .filter((feature) => feature.length > 0);

      const requestBody = {
        title: formData.title,
        description: formData.description,
        image: formData.image || "",
        liveUrl: formData.liveUrl,
        githubUrl: formData.githubUrl || "",
        technologies: technologiesArray,
        categoryId: getCategoryId(formData.category),
        features: featuresArray.length > 0 ? featuresArray : undefined,
        techDetails: formData.techDetails || "",
        challenges: formData.challenges || "",
      };

      const url =
        mode === "edit" ? `/api/projects/${projectId}` : "/api/projects";
      const method = mode === "edit" ? "PUT" : "POST";

      console.log(`Submitting ${mode} request:`, { url, method, requestBody });

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log(`Response for ${mode}:`, { status: response.status, data });

      if (response.ok && data.success) {
        toast.success(
          mode === "edit"
            ? "Project updated successfully!"
            : "Project submitted successfully!"
        );
        onClose();
        // Optionally refresh the page or update the project list
        window.location.reload();
      } else {
        const errorMessage =
          data.error || data.details || `Failed to ${mode} project`;
        console.error(`API Error for ${mode}:`, {
          status: response.status,
          data,
        });
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error(`Error ${mode}ing project:`, error);
      toast.error(
        error instanceof Error ? error.message : `Failed to ${mode} project`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryId = (categorySlug: string): number => {
    const categoryMap: Record<string, number> = {
      lovable: 13,
      cursor: 14,
      chef: 15,
      convex: 16,
      bolt: 17,
      replit: 18,
    };
    return categoryMap[categorySlug] || 13;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const categories = [
    { value: "lovable", label: "💙 מקסים" },
    { value: "cursor", label: "🖱️ קרסור" },
    { value: "chef", label: "🧑‍🍳 שף" },
    { value: "convex", label: "🟠 קונבקס" },
    { value: "bolt", label: "⚡ בזק" },
    { value: "replit", label: "🔄 רפליט" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            {mode === "edit" ? "ערוך את הפרויקט" : "שלח את הפרויקט שלך"}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">שם הפרויקט *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="הכנס את שם הפרויקט"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">תיאור *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="תאר מה הפרויקט שלך עושה..."
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="image">תמונת הפרויקט *</Label>
              <ImageUploader
                onUpload={handleImageUpload}
                maxFiles={1}
                maxSize={5}
              />
            </div>

            <div>
              <Label htmlFor="liveUrl">קישור לאתר חי *</Label>
              <Input
                id="liveUrl"
                name="liveUrl"
                value={formData.liveUrl}
                onChange={handleChange}
                placeholder="https://yourproject.com"
                type="url"
                required
              />
            </div>

            <div>
              <Label htmlFor="githubUrl">קישור GitHub</Label>
              <Input
                id="githubUrl"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/username/repo"
                type="url"
              />
            </div>

            <div>
              <Label htmlFor="technologies">טכנולוגיות בשימוש *</Label>
              <Input
                id="technologies"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                placeholder="React, TypeScript, Tailwind CSS, וכו'"
                required
              />
            </div>

            <div>
              <Label htmlFor="features">תכונות עיקריות</Label>
              <Input
                id="features"
                name="features"
                value={formData.features}
                onChange={handleChange}
                placeholder="תכונה 1, תכונה 2, תכונה 3"
              />
            </div>

            <div>
              <Label htmlFor="techDetails">פרטים טכניים</Label>
              <Textarea
                id="techDetails"
                name="techDetails"
                value={formData.techDetails}
                onChange={handleChange}
                placeholder="תאר את הפרטים הטכניים של הפרויקט..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="challenges">אתגרים ופתרונות</Label>
              <Textarea
                id="challenges"
                name="challenges"
                value={formData.challenges}
                onChange={handleChange}
                placeholder="תאר את האתגרים שנתקלת בהם ואיך פתרת אותם..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="category">קטגוריה *</Label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 pt-4 flex-row-reverse">
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {mode === "edit" ? "מעדכן..." : "שולח..."}
                  </>
                ) : mode === "edit" ? (
                  "עדכן פרויקט"
                ) : (
                  "שלח פרויקט"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                בטל
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectForm;
