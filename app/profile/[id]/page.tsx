"use client";

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
} from "lucide-react";
import Header from "@/components/Header";
import { mockUsers, mockProjects } from "@/data/mockData";
import { useParams } from "next/navigation";

interface ProfileClientProps {
  id: string;
}

function ProfileClient({ id }: ProfileClientProps) {
  // Mock user data - in a real app, you'd fetch this based on the ID
  const user = {
    id: id || "1",
    name: "שרה חן",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612c757",
    title: "מפתחת פול-סטק וחובבת בינה מלאכותית",
    location: "סן פרנסיסקו, קליפורניה",
    website: "https://sarahchen.dev",
    twitter: "@sarahchen_dev",
    github: "sarahchen",
    bio: "מפתחת נלהבת הבונה אפליקציות מבוססות בינה מלאכותית. אוהבת ליצור ממשקי משתמש ידידותיים ולפתור בעיות מורכבות עם קוד נקי ויעיל.",
    stats: {
      projects: 12,
      followers: 1250,
      following: 340,
      totalVibes: 2890,
    },
    skills: [
      "React",
      "TypeScript",
      "Node.js",
      "Python",
      "AWS",
      "MongoDB",
      "GraphQL",
      "Docker",
      "Kubernetes",
      "Machine Learning",
      "AI/ML",
      "Tailwind CSS",
    ],
    experience: [
      {
        title: "מפתחת פרונטאנד בכירה",
        company: "TechCorp Inc.",
        duration: "2022 - היום",
        description:
          "מובילה פיתוח פרונטאנד לפלטפורמת SaaS מבוססת בינה מלאכותית, מנהלת צוות של 5 מפתחים.",
      },
      {
        title: "מפתחת פול-סטק",
        company: "StartupXYZ",
        duration: "2020 - 2022",
        description:
          "בנתה ותחזקה מספר אפליקציות ווב באמצעות React, Node.js ושירותי AWS.",
      },
      {
        title: "מפתחת זוטרה",
        company: "DevStudio",
        duration: "2018 - 2020",
        description:
          "פיתחה אפליקציות ווב רספונסיביות ולמדה שיטות פיתוח מודרניות.",
      },
    ],
  };

  const userProjects = mockProjects.filter(
    (project) => project.author.id === user.id
  );

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
                <p className="text-gray-600 mb-2">{user.title}</p>
                <p className="text-sm text-gray-500 mb-4">{user.location}</p>

                <div className="flex justify-center gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">
                      {user.stats.projects}
                    </div>
                    <div className="text-sm text-gray-500">פרויקטים</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">
                      {user.stats.followers}
                    </div>
                    <div className="text-sm text-gray-500">עוקבים</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">
                      {user.stats.totalVibes}
                    </div>
                    <div className="text-sm text-gray-500">סך הכל לייקים</div>
                  </div>
                </div>

                <div className="flex justify-center gap-2 mb-4">
                  <Button size="sm">עקוב</Button>
                  <Button variant="outline" size="sm">
                    שלח הודעה
                  </Button>
                </div>

                <div className="mb-6">
                  <Link href={`/profile/${user.id}/edit`}>
                    <Button variant="outline" size="sm" className="w-full">
                      ערוך פרופיל
                    </Button>
                  </Link>
                </div>

                <p className="text-sm text-gray-600 text-right">{user.bio}</p>
              </div>
            </Card>

            {/* Skills */}
            <Card className="p-6 mt-6">
              <h3 className="font-semibold text-lg mb-4">
                כישורים וטכנולוגיות
              </h3>
              <div className="flex flex-wrap gap-2 flex-row-reverse">
                {user.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Contact Info */}
            <Card className="p-6 mt-6">
              <h3 className="font-semibold text-lg mb-4">יצירת קשר</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 flex-row-reverse">
                  <span className="font-medium">:אתר</span>
                  <a
                    href={user.website}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {user.website}
                  </a>
                </div>
                <div className="flex items-center gap-2 flex-row-reverse">
                  <span className="font-medium">:טוויטר</span>
                  <span className="text-gray-600">{user.twitter}</span>
                </div>
                <div className="flex items-center gap-2 flex-row-reverse">
                  <span className="font-medium">:GitHub</span>
                  <span className="text-gray-600">{user.github}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">ניסיון מקצועי</h2>
              <div className="space-y-6">
                {Array.isArray(user.experience) &&
                  user.experience.map((exp, index) => (
                    <div
                      key={index}
                      className="border-r-2 border-blue-200 pr-4"
                    >
                      <h3 className="font-semibold text-lg">{exp.title}</h3>
                      <p className="text-blue-600 font-medium">{exp.company}</p>
                      <p className="text-sm text-gray-500 mb-2">
                        {exp.duration}
                      </p>
                      <p className="text-gray-600">{exp.description}</p>
                    </div>
                  ))}
              </div>
            </Card>

            {/* Projects */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">הפרויקטים שלי</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userProjects.map((project) => (
                  <div
                    key={project.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{project.title}</h3>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Heart className="w-4 h-4" />
                        {project.votes}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3 flex-row-reverse">
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
                      <Button size="sm" variant="outline">
                        <ExternalLink className="w-3 h-3 ml-1" />
                        צפה
                      </Button>
                      <Button size="sm" variant="outline">
                        <Github className="w-3 h-3 ml-1" />
                        קוד
                      </Button>
                    </div>
                  </div>
                ))}
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
