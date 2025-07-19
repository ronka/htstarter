"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MapPin,
  Calendar,
  Globe,
  Github,
  Twitter,
  Heart,
  MessageCircle,
  ExternalLink,
  Loader2,
} from "lucide-react";
import Header from "@/components/Header";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  location: string;
  joinedDate: string;
  experience: string;
  website: string;
  github: string;
  twitter: string;
  skills: string[];
  projects: number;
  followers: number;
  following: number;
  userProjects?: Project[];
}

interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  votes: number;
  comments: number;
  createdAt: string;
  liveUrl?: string;
  githubUrl?: string;
}

interface ProfileClientProps {
  id: string;
}

function ProfileClient({ id }: ProfileClientProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await response.json();

        if (data.success) {
          setUser(data.data);
        } else {
          throw new Error(data.error || "Failed to fetch user");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        toast.error("Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">User not found</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <div className="text-center">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  {user.name}
                </h1>
                <p className="text-gray-600 mb-2">
                  {(() => {
                    try {
                      if (user.experience) {
                        const parsed = JSON.parse(user.experience);
                        if (
                          parsed &&
                          typeof parsed === "object" &&
                          !Array.isArray(parsed) &&
                          parsed.title
                        ) {
                          return parsed.title;
                        }
                      }
                    } catch (error) {
                      // If parsing fails, show the raw experience text
                      return user.experience;
                    }
                    return user.experience;
                  })()}
                </p>
                <p className="text-sm text-gray-500 mb-4">{user.location}</p>

                <div className="flex justify-center gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">
                      {user.projects}
                    </div>
                    <div className="text-sm text-gray-500">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">
                      {user.followers}
                    </div>
                    <div className="text-sm text-gray-500">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">
                      {user.following}
                    </div>
                    <div className="text-sm text-gray-500">Following</div>
                  </div>
                </div>

                <div className="flex justify-center gap-2 mb-4">
                  <Button size="sm">Follow</Button>
                  <Button variant="outline" size="sm">
                    Send Message
                  </Button>
                </div>

                <div className="mb-6">
                  <Link href={`/profile/${user.id}/edit`}>
                    <Button variant="outline" size="sm" className="w-full">
                      Edit Profile
                    </Button>
                  </Link>
                </div>

                <p className="text-sm text-gray-600">{user.bio}</p>
              </div>
            </Card>

            {/* Skills */}
            <Card className="p-6 mt-6">
              <h3 className="font-semibold text-lg mb-4">
                Skills & Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Contact Info */}
            <Card className="p-6 mt-6">
              <h3 className="font-semibold text-lg mb-4">
                Contact Information
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium flex-shrink-0">Website:</span>
                  <a
                    href={user.website}
                    className="text-blue-600 hover:underline truncate block"
                    target="_blank"
                    rel="noopener noreferrer"
                    title={user.website}
                  >
                    {user.website}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium flex-shrink-0">Twitter:</span>
                  <span
                    className="text-gray-600 truncate block"
                    title={user.twitter}
                  >
                    {user.twitter}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium flex-shrink-0">GitHub:</span>
                  <span
                    className="text-gray-600 truncate block"
                    title={user.github}
                  >
                    {user.github}
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Experience</h2>
              <div className="space-y-6">
                {(() => {
                  try {
                    const parsedExperience = user.experience
                      ? JSON.parse(user.experience)
                      : null;
                    let experienceData: Experience[] = [];
                    let userTitle = "";

                    if (parsedExperience) {
                      if (Array.isArray(parsedExperience)) {
                        // Old format - direct array
                        experienceData = parsedExperience;
                      } else if (parsedExperience.experiences) {
                        // New format - object with title and experiences
                        experienceData = parsedExperience.experiences;
                        userTitle = parsedExperience.title || "";
                      }
                    }

                    if (experienceData.length > 0) {
                      return (
                        <div className="relative">
                          {/* Timeline line */}
                          <div className="absolute right-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                          {experienceData.map((exp, index) => (
                            <div key={index} className="relative pr-12 pb-6">
                              {/* Timeline dot */}
                              <div className="absolute right-2 top-2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-sm"></div>

                              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <h4 className="font-semibold text-gray-900 mb-1">
                                  {exp.title}
                                </h4>
                                <p className="text-blue-600 text-sm mb-1">
                                  {exp.company}
                                </p>
                                <p className="text-gray-500 text-sm mb-2">
                                  {exp.duration}
                                </p>
                                <p className="text-gray-700 text-sm">
                                  {exp.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    } else {
                      return (
                        <div className="text-center py-8 text-gray-500">
                          <p>No work experience added yet.</p>
                        </div>
                      );
                    }
                  } catch (error) {
                    // Fallback to display experience as text if JSON parsing fails
                    return (
                      <div className="border-r-2 border-blue-200 pr-4">
                        <h3 className="font-semibold text-lg">
                          {user.experience}
                        </h3>
                        <p className="text-gray-600">Experience details</p>
                      </div>
                    );
                  }
                })()}
              </div>
            </Card>

            {/* Projects */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">My Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.userProjects && user.userProjects.length > 0 ? (
                  user.userProjects.map((project) => (
                    <div
                      key={project.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Heart className="w-4 h-4" />
                          {project.votes}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2 text-sm">
                        {project.liveUrl && (
                          <Button size="sm" variant="outline" asChild>
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="w-3 h-3 mr-1" />
                              View
                            </a>
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button size="sm" variant="outline" asChild>
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github className="w-3 h-3 mr-1" />
                              Code
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8">
                    <p className="text-gray-500">No projects yet</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const params = useParams();
  const id = params?.id as string;

  return <ProfileClient id={id} />;
}
