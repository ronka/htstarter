"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Github } from "lucide-react";
import { UploadedImage, ProjectFormData } from "./types";

interface Step4ReviewSubmitProps {
  formData: ProjectFormData;
  uploadedImages: UploadedImage[];
}

export const Step4ReviewSubmit = ({
  formData,
  uploadedImages,
}: Step4ReviewSubmitProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">תצוגה מקדימה של הפרויקט</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">{formData.title}</h4>
            <p className="text-gray-600 text-sm mb-4">{formData.description}</p>
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
          {uploadedImages.length > 0 && (
            <div>
              <img
                src={uploadedImages[0].url}
                alt={formData.title}
                className="w-full h-32 object-cover rounded border"
              />
            </div>
          )}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
        <h4 className="font-medium text-amber-800 mb-2">לפני השליחה</h4>
        <ul className="text-sm text-amber-700 space-y-1">
          <li>• וודא שכל הפרטים נכונים</li>
          <li>• בדוק שהקישורים עובדים</li>
          <li>• ודא שהתמונה הועלתה ומוצגת כראוי</li>
        </ul>
      </div>
    </div>
  );
};
