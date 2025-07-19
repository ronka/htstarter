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

interface UserProjectsResponse {
  success: boolean;
  data: Project[];
  error?: string;
}

async function fetchUserProjects(
  userId: string
): Promise<UserProjectsResponse> {
  const response = await fetch(`/api/projects?authorId=${userId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch user projects");
  }

  const result: UserProjectsResponse = await response.json();

  if (!result.success) {
    throw new Error(result.error || "Failed to fetch user projects");
  }

  return result;
}

export function useUserProjects(userId: string) {
  return useQuery({
    queryKey: ["user-projects", userId],
    queryFn: () => fetchUserProjects(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
