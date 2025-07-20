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
    <>
      <div>
        <Label htmlFor="techDetails">יישום טכני</Label>
        <Textarea
          id="techDetails"
          value={formData.techDetails}
          onChange={(e) => onInputChange("techDetails", e.target.value)}
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
          onChange={(e) => onInputChange("challenges", e.target.value)}
          placeholder="מה היו האתגרים העיקריים שעמדת בפניהם ואיך פתרת אותם?"
          rows={5}
          className="mt-1"
        />
      </div>
    </>
  );
};
