import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface SubmitFormProps {
  onClose: () => void;
}

const SubmitForm = ({ onClose }: SubmitFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    liveUrl: "",
    githubUrl: "",
    technologies: "",
    category: "lovable",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const technologiesArray = formData.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter((tech) => tech.length > 0);

      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          image: formData.image || undefined,
          liveUrl: formData.liveUrl,
          githubUrl: formData.githubUrl || undefined,
          technologies: technologiesArray,
          categoryId: getCategoryId(formData.category),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success("Project submitted successfully!");
        onClose();
        // Optionally refresh the page or update the project list
        window.location.reload();
      } else {
        throw new Error(data.error || "Failed to submit project");
      }
    } catch (error) {
      console.error("Error submitting project:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to submit project"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryId = (categorySlug: string): number => {
    const categoryMap: Record<string, number> = {
      chef: 3,
      convex: 4,
      lovable: 1,
      cursor: 2,
      bolt: 5,
      replit: 6,
    };
    return categoryMap[categorySlug] || 1;
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
    { value: "chef", label: "🧑‍🍳 שף" },
    { value: "convex", label: "🟠 קונבקס" },
    { value: "lovable", label: "💙 מקסים" },
    { value: "tempo", label: "⏱️ טמפו" },
    { value: "cursor", label: "🖱️ קרסור" },
    { value: "bolt", label: "⚡ בזק" },
    { value: "replit", label: "🔄 רפליט" },
    { value: "v0", label: "v0 v0" },
    { value: "windsurf", label: "🏄 וינדסרף" },
    { value: "base44", label: "🟧 בסיס44" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>שלח את הפרויקט שלך</CardTitle>
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
              <Label htmlFor="image">קישור לתמונת הפרויקט</Label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.png"
                type="url"
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
                    שולח...
                  </>
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

export default SubmitForm;
