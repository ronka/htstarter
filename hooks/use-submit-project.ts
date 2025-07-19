import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useCategories } from "@/hooks/use-categories";

interface ProjectFormData {
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  technologies: string[];
  category: string;
  features: string[];
  techDetails?: string;
  challenges?: string;
}

interface SubmitProjectResponse {
  success: boolean;
  data: any;
  error?: string;
}

async function submitProject(
  data: ProjectFormData,
  categories: any[]
): Promise<any> {
  // Find the category ID by slug
  const category = categories.find((cat) => cat.slug === data.category);

  const response = await fetch("/api/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: data.title,
      description: data.description,
      image: data.image,
      liveUrl: data.liveUrl,
      githubUrl: data.githubUrl,
      technologies: data.technologies,
      categoryId: category?.id,
      features: data.features.filter((f) => f.trim()), // Remove empty features
      techDetails: data.techDetails,
      challenges: data.challenges,
    }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("You must be signed in to submit a project");
    }
    if (response.status === 400) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Invalid data provided");
    }
    throw new Error("Failed to submit project");
  }

  const result: SubmitProjectResponse = await response.json();

  if (!result.success) {
    throw new Error(result.error || "Failed to submit project");
  }

  return result.data;
}

export function useSubmitProject() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();
  const { data: categories = [] } = useCategories();

  return useMutation({
    mutationFn: (data: ProjectFormData) => submitProject(data, categories),
    onSuccess: (data) => {
      // Invalidate and refetch projects list
      queryClient.invalidateQueries({ queryKey: ["projects"] });

      // Show success toast
      toast({
        title: "Project submitted!",
        description:
          "Your project has been successfully submitted and is now live.",
      });

      // Navigate to the project page
      router.push(`/project/${data.id}`);
    },
    onError: (error: Error) => {
      // Show error toast
      toast({
        title: "Submission failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
