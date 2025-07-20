import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Loader2 } from "lucide-react";
import { ImageUploader } from "./ImageUploader";
import { useSubmitProject } from "@/hooks/use-submit-project";

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
    features?: string[];
    longDescription?: string;
  };
}

const ProjectForm = ({
  onClose,
  mode,
  projectId,
  initialData,
}: ProjectFormProps) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    image: initialData?.image || "",
    liveUrl: initialData?.liveUrl || "",
    githubUrl: initialData?.githubUrl || "",
    technologies: initialData?.technologies?.join(", ") || "",
    features: initialData?.features?.join(", ") || "",
    longDescription: initialData?.longDescription || "",
  });

  const [initialImage, setInitialImage] = useState<string | undefined>(
    initialData?.image
  );

  const submitProject = useSubmitProject();

  const isSubmitting = submitProject.isPending;

  const handleImageUpload = (images: UploadedImage[]) => {
    if (images.length > 0) {
      setFormData({
        ...formData,
        image: images[0].url,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "edit" && projectId) {
      // Handle edit mode
      try {
        const response = await fetch(`/api/projects/${projectId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            image: formData.image,
            liveUrl: formData.liveUrl,
            githubUrl: formData.githubUrl,
            technologies: formData.technologies
              .split(",")
              .map((tech) => tech.trim())
              .filter((tech) => tech.length > 0),
            features: formData.features
              .split(",")
              .map((feature) => feature.trim())
              .filter((feature) => feature.length > 0),
            longDescription: formData.longDescription,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update project");
        }

        onClose();
      } catch (error) {
        console.error("Error updating project:", error);
      }
    } else {
      // Handle create mode
      submitProject.mutate({
        title: formData.title,
        description: formData.description,
        image: formData.image,
        liveUrl: formData.liveUrl,
        githubUrl: formData.githubUrl,
        technologies: formData.technologies
          .split(",")
          .map((tech) => tech.trim())
          .filter((tech) => tech.length > 0),
        features: formData.features
          .split(",")
          .map((feature) => feature.trim())
          .filter((feature) => feature.length > 0),
        longDescription: formData.longDescription,
      });
    }
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
                initialImages={
                  mode === "edit" && initialImage
                    ? [
                        {
                          url: initialImage,
                          filename: "existing-image",
                          size: 0,
                        },
                      ]
                    : []
                }
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
              <Label htmlFor="longDescription">תיאור מפורט</Label>
              <Textarea
                id="longDescription"
                name="longDescription"
                value={formData.longDescription}
                onChange={handleChange}
                placeholder="תאר את הפרטים הטכניים של הפרויקט..."
                rows={3}
              />
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
