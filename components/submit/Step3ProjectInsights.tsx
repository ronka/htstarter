"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ProjectFormData } from "./types";

interface Step3ProjectInsightsProps {
  formData: ProjectFormData;
  onInputChange: (field: keyof ProjectFormData, value: string) => void;
}

export const Step3ProjectInsights = ({
  formData,
  onInputChange,
}: Step3ProjectInsightsProps) => {
  return (
    <div>
      <Label htmlFor="longDescription">תיאור מפורט של הפרויקט</Label>
      <Textarea
        id="longDescription"
        value={formData.longDescription}
        onChange={(e) => onInputChange("longDescription", e.target.value)}
        placeholder="תאר את הפרויקט בפירוט, כולל האדריכלות הטכנית, האתגרים שעמדת בפניהם, הפתרונות שיישמת, וכל פרט נוסף שיכול לעזור להבין את הפרויקט טוב יותר. תוכל להשתמש ב-Markdown לעיצוב הטקסט."
        rows={8}
        className="mt-1"
      />
      <p className="text-sm text-gray-500 mt-2">
        תוכל להשתמש ב-Markdown לעיצוב הטקסט (כותרות, רשימות, קוד, וכו')
      </p>
    </div>
  );
};
