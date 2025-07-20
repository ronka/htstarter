"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useProject } from "@/hooks/use-project";
import ProjectForm from "@/components/ProjectForm";

export default function EditProjectPage() {
  const { userId, isLoaded } = useAuth();
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  const [showForm, setShowForm] = useState(true);

  const { data: project, isLoading, error } = useProject(projectId);

  // Handle authentication and authorization using useEffect
  useEffect(() => {
    if (!isLoaded) return;

    if (!userId) {
      router.replace("/sign-in");
      return;
    }

    if (project && userId !== project.author.id) {
      router.replace("/");
      return;
    }
  }, [userId, project, router, isLoaded]);

  // Show loading state
  if (isLoading) {
    return (
      <div
        className="min-h-screen bg-gray-50 flex items-center justify-center"
        dir="rtl"
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">טוען פרויקט...</p>
        </div>
      </div>
    );
  }

  // Handle error states
  if (error || !project) {
    return (
      <div
        className="min-h-screen bg-gray-50 flex items-center justify-center"
        dir="rtl"
      >
        <div className="text-center">
          <p className="text-red-600 mb-4">שגיאה בטעינת הפרויקט</p>
          <p className="text-gray-600 mb-4">
            {error instanceof Error ? error.message : "הפרויקט לא נמצא"}
          </p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            חזור
          </button>
        </div>
      </div>
    );
  }

  const handleCloseForm = () => {
    router.push(`/project/${projectId}`);
  };

  const initialData = {
    title: project.title,
    description: project.description,
    image: project.image || "",
    liveUrl: project.liveUrl,
    githubUrl: project.githubUrl || "",
    technologies: project.technologies,
    category: project.category.slug,
    features: project.features,
    techDetails: project.techDetails,
    challenges: project.challenges,
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {showForm && (
        <ProjectForm
          onClose={handleCloseForm}
          mode="edit"
          projectId={projectId}
          initialData={initialData}
        />
      )}
    </div>
  );
}
