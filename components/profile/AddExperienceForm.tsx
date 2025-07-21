import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import React from "react";

export interface Experience {
  title: string;
  company: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  isCurrentlyWorking: boolean;
  description: string;
}

type AddExperienceFormProps = {
  newExperience: Experience;
  onChange: (field: keyof Experience, value: string | boolean) => void;
  onAdd: () => void;
  months: string[];
  years: number[];
  disabled: boolean;
};

export const AddExperienceForm: React.FC<AddExperienceFormProps> = ({
  newExperience,
  onChange,
  onAdd,
  months,
  years,
  disabled,
}) => (
  <div className="space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
    <h4 className="font-medium text-gray-900">הוסף ניסיון חדש</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="new-exp-title">תפקיד</Label>
        <Input
          id="new-exp-title"
          value={newExperience.title}
          onChange={(e) => onChange("title", e.target.value)}
          placeholder="למשל, מפתח Frontend בכיר"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="new-exp-company">חברה</Label>
        <Input
          id="new-exp-company"
          value={newExperience.company}
          onChange={(e) => onChange("company", e.target.value)}
          placeholder="למשל, TechCorp Inc."
        />
      </div>
    </div>
    <div className="flex items-center space-x-2">
      <Checkbox
        id="currently-working"
        checked={newExperience.isCurrentlyWorking}
        onCheckedChange={(checked) =>
          onChange("isCurrentlyWorking", checked as boolean)
        }
      />
      <Label htmlFor="currently-working" className="text-sm">
        אני עובד כרגע בתפקיד זה
      </Label>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>תאריך התחלה</Label>
        <div className="flex gap-2">
          <Select
            value={newExperience.startMonth}
            onValueChange={(value) => onChange("startMonth", value)}
          >
            <SelectTrigger className="w-1/2">
              <SelectValue placeholder="חודש" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month, index) => (
                <SelectItem key={index} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={newExperience.startYear}
            onValueChange={(value) => onChange("startYear", value)}
          >
            <SelectTrigger className="w-1/2">
              <SelectValue placeholder="שנה" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label>תאריך סיום</Label>
        <div className="flex gap-2">
          <Select
            value={newExperience.endMonth}
            onValueChange={(value) => onChange("endMonth", value)}
            disabled={newExperience.isCurrentlyWorking}
          >
            <SelectTrigger className="w-1/2">
              <SelectValue placeholder="חודש" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month, index) => (
                <SelectItem key={index} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={newExperience.endYear}
            onValueChange={(value) => onChange("endYear", value)}
            disabled={newExperience.isCurrentlyWorking}
          >
            <SelectTrigger className="w-1/2">
              <SelectValue placeholder="שנה" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
    <div className="space-y-2">
      <Label htmlFor="new-exp-description">תיאור</Label>
      <Textarea
        id="new-exp-description"
        value={newExperience.description}
        onChange={(e) => onChange("description", e.target.value)}
        placeholder="תאר את תפקידך והישגיך"
        rows={3}
      />
    </div>
    <Button type="button" variant="outline" onClick={onAdd} disabled={disabled}>
      <Plus className="w-4 h-4 mr-2" /> הוסף ניסיון
    </Button>
  </div>
);
