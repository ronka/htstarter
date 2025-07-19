"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, X, Plus } from "lucide-react";
import Header from "@/components/Header";
import { useUpdateUserProfile } from "@/hooks/use-update-user-profile";

interface Experience {
  title: string;
  company: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  isCurrentlyWorking: boolean;
  description: string;
}

// This is a placeholder for the actual user profile type
interface UserProfile {
  name: string;
  title: string;
  location: string;
  website: string;
  twitter: string;
  github: string;
  bio: string;
  skills: string[];
  experience: Experience[];
}

interface EditProfileFormProps {
  id: string;
  initialData: UserProfile;
  isNewUser?: boolean;
}

const months = [
  "ינואר",
  "פברואר",
  "מרץ",
  "אפריל",
  "מאי",
  "יוני",
  "יולי",
  "אוגוסט",
  "ספטמבר",
  "אוקטובר",
  "נובמבר",
  "דצמבר",
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

export function EditProfileForm({
  id,
  initialData,
  isNewUser = false,
}: EditProfileFormProps) {
  const updateProfileMutation = useUpdateUserProfile();

  const [formData, setFormData] = useState(initialData);

  const [newSkill, setNewSkill] = useState("");
  const [newExperience, setNewExperience] = useState<Experience>({
    title: "",
    company: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    isCurrentlyWorking: false,
    description: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleExperienceChange = (
    index: number,
    field: keyof Experience,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const handleAddExperience = () => {
    if (
      newExperience.title &&
      newExperience.company &&
      newExperience.startMonth &&
      newExperience.startYear
    ) {
      setFormData((prev) => ({
        ...prev,
        experience: [...prev.experience, newExperience],
      }));
      setNewExperience({
        title: "",
        company: "",
        startMonth: "",
        startYear: "",
        endMonth: "",
        endYear: "",
        isCurrentlyWorking: false,
        description: "",
      });
    }
  };

  const handleRemoveExperience = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const handleNewExperienceChange = (
    field: keyof Experience,
    value: string | boolean
  ) => {
    setNewExperience((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name.trim()) {
      alert("שם הוא שדה חובה");
      return;
    }

    // Transform form data to match API expectations
    const updateData = {
      name: formData.name.trim(),
      bio: formData.bio,
      location: formData.location,
      experience: JSON.stringify({
        title: formData.title,
        experiences: formData.experience,
      }), // Store both title and experiences as JSON
      website: formData.website,
      github: formData.github,
      twitter: formData.twitter,
      skills: formData.skills,
    };

    updateProfileMutation.mutate({ userId: id, data: updateData });
  };

  const formatExperienceDuration = (exp: Experience) => {
    const startDate = `${exp.startMonth} ${exp.startYear}`;
    if (exp.isCurrentlyWorking) {
      return `${startDate} - הווה`;
    }
    if (exp.endMonth && exp.endYear) {
      return `${startDate} - ${exp.endMonth} ${exp.endYear}`;
    }
    return startDate;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href={`/profile/${id}`}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            חזרה לפרופיל
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              {isNewUser ? "יצירת פרופיל" : "עריכת פרופיל"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">מידע בסיסי</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">שם מלא * (שדה חובה)</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder="הכנס את שמך המלא"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">תפקיד מקצועי</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      placeholder="למשל, מפתח Full Stack"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">מיקום</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                      placeholder="עיר, מדינה"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">אתר אינטרנט</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) =>
                        handleInputChange("website", e.target.value)
                      }
                      placeholder="https://yourwebsite.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="twitter">טוויטר</Label>
                    <Input
                      id="twitter"
                      value={formData.twitter}
                      onChange={(e) =>
                        handleInputChange("twitter", e.target.value)
                      }
                      placeholder="@username"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      value={formData.github}
                      onChange={(e) =>
                        handleInputChange("github", e.target.value)
                      }
                      placeholder="username"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">ביוגרפיה</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    placeholder="ספר לנו קצת על עצמך"
                    rows={4}
                  />
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">כישורים</h3>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="הוסף כישור חדש"
                  />
                  <Button type="button" onClick={handleAddSkill}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Experience */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">
                  ניסיון תעסוקתי (אופציונלי)
                </h3>

                {/* Experience Timeline Display */}
                {formData.experience.length > 0 && (
                  <div className="space-y-6">
                    <div className="relative">
                      {/* Timeline line */}
                      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                      {formData.experience.map((exp, index) => (
                        <div key={index} className="relative pl-12 pb-6">
                          {/* Timeline dot */}
                          <div className="absolute left-2 top-2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-sm"></div>

                          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-gray-900">
                                {exp.title}
                              </h4>
                              <button
                                type="button"
                                onClick={() => handleRemoveExperience(index)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-blue-600 text-sm mb-1">
                              {exp.company}
                            </p>
                            <p className="text-gray-500 text-sm mb-2">
                              {formatExperienceDuration(exp)}
                            </p>
                            <p className="text-gray-700 text-sm">
                              {exp.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add Experience Form */}
                <div className="space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <h4 className="font-medium text-gray-900">הוסף ניסיון חדש</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-exp-title">תפקיד</Label>
                      <Input
                        id="new-exp-title"
                        value={newExperience.title}
                        onChange={(e) =>
                          handleNewExperienceChange("title", e.target.value)
                        }
                        placeholder="למשל, מפתח Frontend בכיר"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-exp-company">חברה</Label>
                      <Input
                        id="new-exp-company"
                        value={newExperience.company}
                        onChange={(e) =>
                          handleNewExperienceChange("company", e.target.value)
                        }
                        placeholder="למשל, TechCorp Inc."
                      />
                    </div>
                  </div>

                  {/* Currently Working Checkbox */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="currently-working"
                      checked={newExperience.isCurrentlyWorking}
                      onCheckedChange={(checked) =>
                        handleNewExperienceChange(
                          "isCurrentlyWorking",
                          checked as boolean
                        )
                      }
                    />
                    <Label htmlFor="currently-working" className="text-sm">
                      אני עובד כרגע בתפקיד זה
                    </Label>
                  </div>

                  {/* Date Range */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>תאריך התחלה</Label>
                      <div className="flex gap-2">
                        <Select
                          value={newExperience.startMonth}
                          onValueChange={(value) =>
                            handleNewExperienceChange("startMonth", value)
                          }
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
                          onValueChange={(value) =>
                            handleNewExperienceChange("startYear", value)
                          }
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
                          onValueChange={(value) =>
                            handleNewExperienceChange("endMonth", value)
                          }
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
                          onValueChange={(value) =>
                            handleNewExperienceChange("endYear", value)
                          }
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
                      onChange={(e) =>
                        handleNewExperienceChange("description", e.target.value)
                      }
                      placeholder="תאר את תפקידך והישגיך"
                      rows={3}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddExperience}
                    disabled={
                      !newExperience.title ||
                      !newExperience.company ||
                      !newExperience.startMonth ||
                      !newExperience.startYear
                    }
                  >
                    <Plus className="w-4 h-4 mr-2" /> הוסף ניסיון
                  </Button>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={updateProfileMutation.isPending}
                >
                  {updateProfileMutation.isPending
                    ? "שומר..."
                    : isNewUser
                    ? "צור פרופיל"
                    : "שמור שינויים"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
