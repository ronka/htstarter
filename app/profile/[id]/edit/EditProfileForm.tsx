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
import { ArrowLeft, X, Plus } from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

interface Experience {
  title: string;
  company: string;
  duration: string;
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
}

export function EditProfileForm({ id, initialData }: EditProfileFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const [formData, setFormData] = useState(initialData);

  const [newSkill, setNewSkill] = useState("");
  const [newExperience, setNewExperience] = useState<Experience>({
    title: "",
    company: "",
    duration: "",
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
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const handleAddExperience = () => {
    if (newExperience.title && newExperience.company) {
      setFormData((prev) => ({
        ...prev,
        experience: [...prev.experience, newExperience],
      }));
      setNewExperience({
        title: "",
        company: "",
        duration: "",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd save the data to a backend
    console.log("Updating profile for user:", id, formData);
    toast({
      title: "Profile updated!",
      description: "Your profile has been successfully updated.",
    });
    router.push(`/profile/${id}`);
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
            Back to Profile
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Edit Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Professional Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      placeholder="e.g., Full Stack Developer"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                      placeholder="City, Country"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
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
                    <Label htmlFor="twitter">Twitter</Label>
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
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    placeholder="Tell us a little about yourself"
                    rows={4}
                  />
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Skills</h3>
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
                    placeholder="Add a new skill"
                  />
                  <Button type="button" onClick={handleAddSkill}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Experience */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Work Experience</h3>
                <div className="space-y-6">
                  {formData.experience.map((exp, index) => (
                    <div
                      key={index}
                      className="space-y-2 p-4 border rounded-lg"
                    >
                      <Input
                        value={exp.title}
                        onChange={(e) =>
                          handleExperienceChange(index, "title", e.target.value)
                        }
                        placeholder="Job Title"
                      />
                      <Input
                        value={exp.company}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "company",
                            e.target.value
                          )
                        }
                        placeholder="Company"
                      />
                      <Input
                        value={exp.duration}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "duration",
                            e.target.value
                          )
                        }
                        placeholder="e.g., 2022 - Present"
                      />
                      <Textarea
                        value={exp.description}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Description"
                        rows={3}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemoveExperience(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddExperience}
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Experience
                </Button>
              </div>

              <div className="flex justify-end">
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
