"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { ProjectFormData } from "./types";

interface Step2TechnicalDetailsProps {
  formData: ProjectFormData;
  onFormDataChange: (newData: ProjectFormData) => void;
}

export const Step2TechnicalDetails = ({
  formData,
  onFormDataChange,
}: Step2TechnicalDetailsProps) => {
  const [techInput, setTechInput] = useState("");

  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      onFormDataChange({
        ...formData,
        technologies: [...formData.technologies, techInput.trim()],
      });
      setTechInput("");
    }
  };

  const removeTechnology = (tech: string) => {
    onFormDataChange({
      ...formData,
      technologies: formData.technologies.filter((t) => t !== tech),
    });
  };

  const addFeature = () => {
    onFormDataChange({
      ...formData,
      features: [...formData.features, ""],
    });
  };

  const updateFeature = (index: number, value: string) => {
    onFormDataChange({
      ...formData,
      features: formData.features.map((feature, i) =>
        i === index ? value : feature
      ),
    });
  };

  const removeFeature = (index: number) => {
    onFormDataChange({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  return (
    <>
      <div>
        <Label>טכנולוגיות בשימוש *</Label>
        <div className="flex gap-2 mt-1">
          <Input
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            placeholder="הוסף טכנולוגיה"
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), addTechnology())
            }
          />
          <Button type="button" onClick={addTechnology} variant="outline">
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
        <Label>פיצ׳רים עקריים *</Label>
        <div className="space-y-2 mt-1">
          {formData.features.map((feature, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={feature}
                onChange={(e) => updateFeature(index, e.target.value)}
                placeholder={`פיצ׳ר ${index + 1}`}
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
            הוסף פיצ׳ר
          </Button>
        </div>
      </div>
    </>
  );
};
