import { useQuery } from "@tanstack/react-query";
import { Project } from "@/db/schema";
import { useDebounce } from "./use-debounce";

interface SearchParams {
  q?: string;
  filters?: string[];
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "votes" | "title";
  sortOrder?: "asc" | "desc";
}

interface SearchResponse {
  success: boolean;
  data: (Project & {
    author: {
      id: string;
      name: string;
      avatar: string | null;
    };
  })[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  search: {
    query?: string;
    filters: string[];
  };
}

export function useSearchProjects(params: SearchParams) {
  const {
    q: searchQuery,
    filters = [],
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = params;

  // Debounce the search query and filters to prevent excessive API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 300); // 300ms delay
  const debouncedFilters = useDebounce(filters, 300); // 300ms delay

  // Build query parameters
  const queryParams = new URLSearchParams();
  if (debouncedSearchQuery) queryParams.set("q", debouncedSearchQuery);
  if (debouncedFilters.length > 0)
    queryParams.set("filters", debouncedFilters.join(","));
  if (page > 1) queryParams.set("page", page.toString());
  if (limit !== 10) queryParams.set("limit", limit.toString());
  if (sortBy !== "createdAt") queryParams.set("sortBy", sortBy);
  if (sortOrder !== "desc") queryParams.set("sortOrder", sortOrder);

  const queryString = queryParams.toString();
  const url = `/api/search${queryString ? `?${queryString}` : ""}`;

  return useQuery<SearchResponse>({
    queryKey: [
      "search-projects",
      debouncedSearchQuery,
      debouncedFilters,
      page,
      limit,
      sortBy,
      sortOrder,
    ],
    queryFn: async () => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to search projects");
      }
      return response.json();
    },
    enabled: Boolean(debouncedSearchQuery || debouncedFilters.length > 0),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
