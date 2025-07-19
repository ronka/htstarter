import { useQuery } from "@tanstack/react-query";

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
}

interface CategoriesResponse {
  success: boolean;
  data: Category[];
  error?: string;
}

async function fetchCategories(): Promise<Category[]> {
  const response = await fetch("/api/categories");

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const result: CategoriesResponse = await response.json();

  if (!result.success) {
    throw new Error(result.error || "Failed to fetch categories");
  }

  return result.data;
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}
