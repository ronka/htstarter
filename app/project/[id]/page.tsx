"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Heart, ExternalLink, Github, ArrowLeft, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import { useParams } from "next/navigation";
import { useProject } from "@/hooks/use-project";
import { useVote } from "@/hooks/use-vote";
import { useState } from "react";

interface ProjectDetailClientProps {
  id: string;
}

function ProjectDetailClient({ id }: ProjectDetailClientProps) {
  const [voted, setVoted] = useState(false);
  const { data: project, isLoading, error } = useProject(id);
  const { addVote, removeVote, isAddingVote, isRemovingVote } = useVote();

  const handleVote = async () => {
    if (!project) return;

    if (isAddingVote || isRemovingVote) return;

    if (voted) {
      removeVote(project.id);
      setVoted(false);
    } else {
      addVote(project.id);
      setVoted(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading project...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">הפרויקט לא נמצא</h1>
          <p className="text-gray-600 mb-4">{error?.message}</p>
          <Link href="/">
            <Button>חזרה לעמוד הבית</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4 ml-2" />
          חזרה לפרויקטים
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Button
                    size="sm"
                    className={`${
                      voted
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-white hover:bg-gray-100"
                    } text-gray-900`}
                    onClick={handleVote}
                    disabled={isAddingVote || isRemovingVote}
                  >
                    {isAddingVote || isRemovingVote ? (
                      <Loader2 className="w-4 h-4 animate-spin ml-1" />
                    ) : (
                      <Heart
                        className={`w-4 h-4 ml-1 ${
                          voted ? "fill-current" : ""
                        }`}
                      />
                    )}
                    {project.votes}
                  </Button>
                </div>
              </div>

              <CardContent className="p-6">
                <h1 className="text-3xl font-bold mb-3">{project.title}</h1>
                <p className="text-gray-600 text-lg mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6 flex-row-reverse">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3 mb-6">
                  {project.liveUrl && (
                    <Button className="flex-1" asChild>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 ml-2" />
                        צפה בפרויקט
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button variant="outline" className="flex-1" asChild>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 ml-2" />
                        צפה בקוד
                      </a>
                    </Button>
                  )}
                </div>

                <Separator className="my-6" />

                <div className="space-y-6">
                  {project.features && project.features.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        תכונות עיקריות
                      </h3>
                      <ul className="space-y-2">
                        {project.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-center text-gray-700"
                          >
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.techDetails && (
                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        פרטים טכניים
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {project.techDetails}
                      </p>
                    </div>
                  )}

                  {project.challenges && (
                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        אתגרים ופתרונות
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {project.challenges}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>נוצר על ידי</CardTitle>
              </CardHeader>
              <CardContent>
                <Link
                  href={`/profile/${project.author.id}`}
                  className="flex items-center space-x-3 space-x-reverse hover:bg-gray-50 p-3 rounded-lg transition-colors"
                >
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={project.author.avatar} />
                    <AvatarFallback>
                      {project.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{project.author.name}</h4>
                    <p className="text-sm text-gray-600">צפה בפרופיל ←</p>
                  </div>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>סטטיסטיקות הפרויקט</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">הצבעות</span>
                  <span className="font-semibold">{project.votes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">קטגוריה</span>
                  <Badge variant="outline">
                    {project.category?.name || "N/A"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">טכנולוגיות</span>
                  <span className="font-semibold">
                    {project.technologies.length} כלים
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params.id as string;

  return <ProjectDetailClient id={id} />;
}
