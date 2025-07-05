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

interface EditProfileClientProps {
  id: string;
}

function EditProfileClient({ id }: EditProfileClientProps) {
  const router = useRouter();
  const { toast } = useToast();

  // Mock current user data - in a real app, you'd fetch this based on the ID
  const [formData, setFormData] = useState({
    name: "Sarah Chen",
    title: "Full Stack Developer & AI Enthusiast",
    location: "San Francisco, CA",
    website: "https://sarahchen.dev",
    twitter: "@sarahchen_dev",
    github: "sarahchen",
    bio: "Passionate developer building AI-powered applications. Love creating user-friendly interfaces and solving complex problems with clean, efficient code.",
    skills: [
      "React",
      "TypeScript",
      "Node.js",
      "Python",
      "AWS",
      "MongoDB",
      "GraphQL",
      "Docker",
    ],
    experience: [
      {
        title: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        duration: "2022 - Present",
        description:
          "Leading frontend development for AI-powered SaaS platform, managing team of 5 developers.",
      },
      {
        title: "Full Stack Developer",
        company: "StartupXYZ",
        duration: "2020 - 2022",
        description:
          "Built and maintained multiple web applications using React, Node.js, and AWS services.",
      },
      {
        title: "Junior Developer",
        company: "DevStudio",
        duration: "2018 - 2020",
        description:
          "Developed responsive web applications and learned modern development practices.",
      },
    ] as Experience[],
  });

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
                    placeholder="Tell us about yourself..."
                    rows={4}
                  />
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Skills & Technologies</h3>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a skill..."
                      onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                    />
                    <Button type="button" onClick={handleAddSkill}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-sm flex items-center gap-2"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="ml-1 hover:text-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Experience</h3>

                {/* Current Experience */}
                <div className="space-y-4">
                  {formData.experience.map((exp, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-medium">Experience {index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveExperience(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Job Title</Label>
                          <Input
                            value={exp.title}
                            onChange={(e) =>
                              handleExperienceChange(
                                index,
                                "title",
                                e.target.value
                              )
                            }
                            placeholder="Job title"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Company</Label>
                          <Input
                            value={exp.company}
                            onChange={(e) =>
                              handleExperienceChange(
                                index,
                                "company",
                                e.target.value
                              )
                            }
                            placeholder="Company name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Duration</Label>
                          <Input
                            value={exp.duration}
                            onChange={(e) =>
                              handleExperienceChange(
                                index,
                                "duration",
                                e.target.value
                              )
                            }
                            placeholder="e.g., 2020 - Present"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label>Description</Label>
                          <Textarea
                            value={exp.description}
                            onChange={(e) =>
                              handleExperienceChange(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                            placeholder="Describe your role and achievements..."
                            rows={3}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Add New Experience */}
                <Card className="p-4 border-dashed">
                  <h4 className="font-medium mb-4">Add New Experience</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Job Title</Label>
                      <Input
                        value={newExperience.title}
                        onChange={(e) =>
                          setNewExperience((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        placeholder="Job title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Company</Label>
                      <Input
                        value={newExperience.company}
                        onChange={(e) =>
                          setNewExperience((prev) => ({
                            ...prev,
                            company: e.target.value,
                          }))
                        }
                        placeholder="Company name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Duration</Label>
                      <Input
                        value={newExperience.duration}
                        onChange={(e) =>
                          setNewExperience((prev) => ({
                            ...prev,
                            duration: e.target.value,
                          }))
                        }
                        placeholder="e.g., 2020 - Present"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Description</Label>
                      <Textarea
                        value={newExperience.description}
                        onChange={(e) =>
                          setNewExperience((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        placeholder="Describe your role and achievements..."
                        rows={3}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Button type="button" onClick={handleAddExperience}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Experience
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Submit */}
              <div className="flex justify-end gap-4 pt-6 border-t">
                <Link href={`/profile/${id}`}>
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Server component wrapper
interface EditProfilePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProfilePage({
  params,
}: EditProfilePageProps) {
  const { id } = await params;
  return <EditProfileClient id={id} />;
}
