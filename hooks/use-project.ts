import { useQuery } from "@tanstack/react-query";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  technologies: string[];
  votes: number;
  comments: number;
  createdAt: string;
  liveUrl?: string;
  githubUrl?: string;
  features?: string[];
  techDetails?: string;
  challenges?: string;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
}

interface ProjectResponse {
  success: boolean;
  data: Project;
  error?: string;
}

async function fetchProject(id: string): Promise<Project> {
  const response = await fetch(`/api/projects/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch project");
  }

  const result: ProjectResponse = await response.json();

  if (!result.success) {
    throw new Error(result.error || "Failed to fetch project");
  }

  return result.data;
}

export function useProject(id: string) {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => fetchProject(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
