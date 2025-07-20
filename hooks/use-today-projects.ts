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
  todayVotes: number; // Today's vote count
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

interface TodayProjectsResponse {
  success: boolean;
  data: Project[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  error?: string;
}

interface TodayProjectsParams {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}

async function fetchTodayProjects(
  params: TodayProjectsParams = {}
): Promise<TodayProjectsResponse> {
  const searchParams = new URLSearchParams();

  if (params.category) searchParams.append("category", params.category);
  if (params.search) searchParams.append("search", params.search);
  if (params.page) searchParams.append("page", params.page.toString());
  if (params.limit) searchParams.append("limit", params.limit.toString());
  if (params.sortBy) searchParams.append("sortBy", params.sortBy);
  if (params.sortOrder) searchParams.append("sortOrder", params.sortOrder);

  const response = await fetch(
    `/api/projects/today?${searchParams.toString()}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch today's projects");
  }

  const result: TodayProjectsResponse = await response.json();

  if (!result.success) {
    throw new Error(result.error || "Failed to fetch today's projects");
  }

  return result;
}

export function useTodayProjects(params: TodayProjectsParams = {}) {
  return useQuery({
    queryKey: ["today-projects", params],
    queryFn: () => fetchTodayProjects(params),
    staleTime: 1000 * 60 * 2, // 2 minutes - shorter stale time for today's data
  });
}
