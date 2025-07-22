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
import { useUpdateUserProfile } from "@/hooks/use-update-user-profile";
import {
  AddExperienceForm,
  Experience,
} from "@/components/profile/AddExperienceForm";
import { ExperienceTimeline } from "@/components/profile/ExperienceTimeline";

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
  avatar?: string;
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
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiList = [
    "😀",
    "😎",
    "🦄",
    "👩‍💻",
    "👨‍💻",
    "🚀",
    "🐱",
    "🐶",
    "🦊",
    "🐻",
    "🐼",
    "🐸",
    "🐵",
    "🦁",
    "🐯",
    "🐨",
    "🐔",
    "🐧",
    "🐦",
    "🐤",
    "🐣",
    "🦆",
    "🦉",
    "🦇",
    "🐺",
    "🐗",
    "🐴",
    "🦄",
    "🐝",
    "🐛",
    "🦋",
    "🐌",
    "🐞",
    "🐜",
    "🦗",
    "🕷",
    "🦂",
    "🐢",
    "🐍",
    "🦎",
    "🦖",
    "🦕",
    "🐙",
    "🦑",
    "🦐",
    "🦞",
    "🦀",
    "🐡",
    "🐠",
    "🐟",
    "🐬",
    "🐳",
    "🐋",
    "🦈",
    "🐊",
    "🐅",
    "🐆",
    "🦓",
    "🦍",
    "🦧",
    "🐘",
    "🦛",
    "🦏",
    "🐪",
    "🐫",
    "🦒",
    "🦘",
    "🦬",
    "🐃",
    "🐂",
    "🐄",
    "🐎",
    "🐖",
    "🐏",
    "🐑",
    "🦙",
    "🐐",
    "🦌",
    "🐕",
    "🐩",
    "🦮",
    "🐕‍🦺",
    "🐈",
    "🐈‍⬛",
    "🪶",
    "🐓",
    "🦃",
    "🦤",
    "🦚",
    "🦜",
    "🦢",
    "🦩",
    "🕊",
    "🐇",
    "🦝",
    "🦨",
    "🦡",
    "🦫",
    "🦦",
    "🦥",
    "🐁",
    "🐀",
    "🐿",
    "🦔",
  ];

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

  const handleMoveExperienceUp = (index: number) => {
    if (index <= 0) return;
    setFormData((prev) => {
      const newExp = [...prev.experience];
      [newExp[index - 1], newExp[index]] = [newExp[index], newExp[index - 1]];
      return { ...prev, experience: newExp };
    });
  };

  const handleMoveExperienceDown = (index: number) => {
    setFormData((prev) => {
      const newExp = [...prev.experience];
      if (index < newExp.length - 1) {
        [newExp[index], newExp[index + 1]] = [newExp[index + 1], newExp[index]];
      }
      return { ...prev, experience: newExp };
    });
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
      avatar: formData.avatar || "😀",
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
              {/* Avatar Emoji Picker */}
              <div className="flex flex-col items-center mb-6">
                <label className="mb-2 font-semibold">אווטאר (אימוג'י)</label>
                <button
                  type="button"
                  className="text-4xl bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mb-2 border border-gray-300 hover:bg-gray-200 transition"
                  onClick={() => setShowEmojiPicker((v) => !v)}
                  aria-label="בחר אימוג'י"
                >
                  {formData.avatar || "😀"}
                </button>
                {showEmojiPicker && (
                  <div className="grid grid-cols-8 gap-2 max-h-40 overflow-y-auto bg-white border p-2 rounded shadow-lg z-10">
                    {emojiList.map((emoji, index) => (
                      <button
                        key={emoji + index}
                        type="button"
                        className="text-2xl hover:bg-gray-200 rounded p-1"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, avatar: emoji }));
                          setShowEmojiPicker(false);
                        }}
                        aria-label={`בחר ${emoji}`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
                <input
                  type="text"
                  className="mt-2 text-center border rounded p-1 w-16"
                  maxLength={2}
                  value={formData.avatar || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, avatar: e.target.value }))
                  }
                  placeholder="😀"
                  aria-label="הכנס אימוג&rsquo;י"
                />
              </div>
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
                <ExperienceTimeline
                  experiences={formData.experience}
                  onRemove={handleRemoveExperience}
                  showRemove
                  onMoveUp={handleMoveExperienceUp}
                  onMoveDown={handleMoveExperienceDown}
                  showReorder
                />

                {/* Add Experience Form */}
                <AddExperienceForm
                  newExperience={newExperience}
                  onChange={handleNewExperienceChange}
                  onAdd={handleAddExperience}
                  months={months}
                  years={years}
                  disabled={
                    !newExperience.title ||
                    !newExperience.company ||
                    !newExperience.startMonth ||
                    !newExperience.startYear
                  }
                />
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
