"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TechnologyBadge } from "@/components/ui/technology-badge";
import { X, Plus } from "lucide-react";
import { ProjectFormData } from "./types";
import { techOptions } from "@/lib/technologies";
import { Combobox } from "@/components/ui/Combobox";

interface Step2TechnicalDetailsProps {
  formData: ProjectFormData;
  onFormDataChange: (newData: ProjectFormData) => void;
}

// Predefined feature options with colors and emojis
const featureOptions = [
  {
    name: "אימות משתמשים",
    emoji: "🔐",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    name: "ניהול פרופיל",
    emoji: "👤",
    color: "bg-green-100 text-green-800 border-green-200",
  },
  {
    name: "חיפוש מתקדם",
    emoji: "🔍",
    color: "bg-purple-100 text-purple-800 border-purple-200",
  },
  {
    name: "העלאות קבצים",
    emoji: "📁",
    color: "bg-orange-100 text-orange-800 border-orange-200",
  },
  {
    name: "התראות בזמן אמת",
    emoji: "🔔",
    color: "bg-red-100 text-red-800 border-red-200",
  },
  {
    name: "צ'אט",
    emoji: "💬",
    color: "bg-cyan-100 text-cyan-800 border-cyan-200",
  },
  {
    name: "מערכת תגובות",
    emoji: "⭐",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  {
    name: "שיתוף ברשתות חברתיות",
    emoji: "📱",
    color: "bg-indigo-100 text-indigo-800 border-indigo-200",
  },
  {
    name: "דשבורד אנליטיקס",
    emoji: "📊",
    color: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
  {
    name: "מערכת תשלומים",
    emoji: "💳",
    color: "bg-green-100 text-green-800 border-green-200",
  },
  {
    name: "ניהול תוכן",
    emoji: "📝",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    name: "מערכת הרשאות",
    emoji: "🛡️",
    color: "bg-gray-100 text-gray-800 border-gray-200",
  },
  {
    name: "גיבוי אוטומטי",
    emoji: "💾",
    color: "bg-teal-100 text-teal-800 border-teal-200",
  },
  {
    name: "API חיצוני",
    emoji: "🔗",
    color: "bg-violet-100 text-violet-800 border-violet-200",
  },
  {
    name: "מערכת דוחות",
    emoji: "📋",
    color: "bg-amber-100 text-amber-800 border-amber-200",
  },
  {
    name: "ניהול משימות",
    emoji: "✅",
    color: "bg-lime-100 text-lime-800 border-lime-200",
  },
  {
    name: "מערכת לוח זמנים",
    emoji: "📅",
    color: "bg-rose-100 text-rose-800 border-rose-200",
  },
  {
    name: "מערכת הודעות",
    emoji: "📧",
    color: "bg-sky-100 text-sky-800 border-sky-200",
  },
  {
    name: "ניהול קטגוריות",
    emoji: "🏷️",
    color: "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200",
  },
  {
    name: "מערכת תגיות",
    emoji: "🏷️",
    color: "bg-pink-100 text-pink-800 border-pink-200",
  },
];

export const Step2TechnicalDetails = ({
  formData,
  onFormDataChange,
}: Step2TechnicalDetailsProps) => {
  const [techInput, setTechInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");

  const addTechnology = (techName?: string) => {
    const techToAdd = techName || techInput.trim();
    if (techToAdd && !formData.technologies.includes(techToAdd)) {
      onFormDataChange({
        ...formData,
        technologies: [...formData.technologies, techToAdd],
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

  const addFeature = (featureName?: string) => {
    const featureToAdd = featureName || featureInput.trim();
    if (featureToAdd && !formData.features.includes(featureToAdd)) {
      onFormDataChange({
        ...formData,
        features: [...formData.features, featureToAdd],
      });
      setFeatureInput("");
    }
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

  // Filter out already selected technologies
  const availableTechOptions = techOptions.filter(
    (tech) => !formData.technologies.includes(tech.name)
  );

  // Filter out already selected features
  const availableFeatureOptions = featureOptions.filter(
    (feature) => !formData.features.includes(feature.name)
  );

  return (
    <>
      <div className="space-y-2">
        <Label>טכנולוגיות בשימוש *</Label>

        {/* Quick add technology buttons */}
        {availableTechOptions.length > 0 && (
          <div className="mt-2">
            <p className="text-sm text-gray-600 mb-2">טכנולוגיות נפוצות:</p>
            <div className="flex flex-wrap gap-2">
              {availableTechOptions.slice(0, 12).map((tech) => (
                <Button
                  key={tech.name}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addTechnology(tech.name)}
                  className={`${tech.color} hover:opacity-80 transition-opacity`}
                >
                  <span className="mr-1">{tech.emoji}</span>
                  {tech.name}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Autocomplete Combobox for technologies */}
        <Combobox
          options={techOptions.map((tech) => ({
            value: tech.name,
            label: tech.name,
            emoji: tech.emoji,
            color: tech.color,
          }))}
          value={""}
          onChange={(val) => {
            if (val && !formData.technologies.includes(val)) {
              onFormDataChange({
                ...formData,
                technologies: [...formData.technologies, val],
              });
            }
          }}
          placeholder="הוסף טכנולוגיה מותאמת אישית"
          allowCustomValue={true}
          disabledOptions={formData.technologies}
        />

        {/* Selected technologies */}
        {formData.technologies.length > 0 && (
          <div className="mt-3">
            <p className="text-sm text-gray-600 mb-2">טכנולוגיות שנבחרו:</p>
            <div className="flex flex-wrap gap-2 flex-row-reverse">
              {formData.technologies.map((tech, index) => (
                <TechnologyBadge
                  key={index}
                  technology={tech}
                  onRemove={removeTechnology}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div>
        <Label>פיצ׳רים עקריים *</Label>

        {/* Quick add feature buttons */}
        {availableFeatureOptions.length > 0 && (
          <div className="mt-2">
            <p className="text-sm text-gray-600 mb-2">פיצ׳רים נפוצים:</p>
            <div className="flex flex-wrap gap-2">
              {availableFeatureOptions.slice(0, 12).map((feature) => (
                <Button
                  key={feature.name}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addFeature(feature.name)}
                  className={`${feature.color} hover:opacity-80 transition-opacity`}
                >
                  <span className="mr-1">{feature.emoji}</span>
                  {feature.name}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2 mt-3">
          <Input
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            placeholder="הוסף פיצ׳ר מותאם אישית"
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), addFeature())
            }
          />
          <Button type="button" onClick={() => addFeature()} variant="outline">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-2 mt-3">
          {formData.features.map((feature, index) => (
            <div key={index} className="flex gap-2">
              {formData.features.length > 0 && (
                <>
                  <Input
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    placeholder={`פיצ׳ר ${index + 1}`}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeFeature(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
