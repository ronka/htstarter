import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface UpdateUserProfileData {
  name: string; // Required for user creation
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
    if (response.status === 400) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Invalid data provided");
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
        title: "הפרופיל נשמר!",
        description: "הפרופיל שלך נשמר בהצלחה.",
      });

      // Navigate to profile page
      router.push(`/profile/${userId}`);
    },
    onError: (error: Error) => {
      // Show error toast
      toast({
        title: "השמירה נכשלה",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
