import { useQuery } from "@tanstack/react-query";

interface UserProfile {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
  location?: string;
  joinedDate?: string;
  experience?: string;
  website?: string;
  github?: string;
  twitter?: string;
  skills?: string[];
  projects?: any[];
  followers?: number;
  following?: number;
  createdAt: string;
  updatedAt: string;
}

interface UserProfileResponse {
  success: boolean;
  data: UserProfile;
  error?: string;
}

async function fetchUserProfile(id: string): Promise<UserProfile> {
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
