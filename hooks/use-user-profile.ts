import { useQuery } from "@tanstack/react-query";
import { User } from "@/types/profile";

interface UserProfileResponse {
  success: boolean;
  data: User;
  error?: string;
}

async function fetchUserProfile(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("User not found");
    }
    throw new Error("Failed to fetch user profile");
  }

  const result: UserProfileResponse = await response.json();

  if (!result.success) {
    throw new Error(result.error || "Failed to fetch user profile");
  }

  return result.data;
}

export function useUserProfile(userId: string | null) {
  return useQuery({
    queryKey: ["user-profile", userId],
    queryFn: () => fetchUserProfile(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    retry: (failureCount, error) => {
      // Don't retry on 404 errors (user not found)
      if (error instanceof Error && error.message === "User not found") {
        return false;
      }
      // Retry up to 3 times for other errors
      return failureCount < 3;
    },
  });
}
