import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface UpdateUserProfileData {
  name?: string;
  bio?: string;
  location?: string;
  experience?: string;
  website?: string;
  github?: string;
  twitter?: string;
  skills?: string[];
}

interface UpdateUserProfileResponse {
  success: boolean;
  data: any;
  error?: string;
}

async function updateUserProfile(
  userId: string,
  data: UpdateUserProfileData
): Promise<any> {
  const response = await fetch(`/api/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    if (response.status === 403) {
      throw new Error("Unauthorized to update this profile");
    }
    if (response.status === 404) {
      throw new Error("User not found");
    }
    throw new Error("Failed to update profile");
  }

  const result: UpdateUserProfileResponse = await response.json();

  if (!result.success) {
    throw new Error(result.error || "Failed to update profile");
  }

  return result.data;
}

export function useUpdateUserProfile() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({
      userId,
      data,
    }: {
      userId: string;
      data: UpdateUserProfileData;
    }) => updateUserProfile(userId, data),
    onSuccess: (data, { userId }) => {
      // Invalidate and refetch user profile
      queryClient.invalidateQueries({ queryKey: ["user-profile", userId] });

      // Show success toast
      toast({
        title: "Profile updated!",
        description: "Your profile has been successfully updated.",
      });

      // Navigate to profile page
      router.push(`/profile/${userId}`);
    },
    onError: (error: Error) => {
      // Show error toast
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
