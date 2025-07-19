import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface VoteResponse {
  success: boolean;
  message: string;
  error?: string;
}

async function addVote(projectId: number): Promise<VoteResponse> {
  const response = await fetch(`/api/projects/${projectId}/vote`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to add vote");
  }

  const result: VoteResponse = await response.json();

  if (!result.success) {
    throw new Error(result.error || "Failed to add vote");
  }

  return result;
}

async function removeVote(projectId: number): Promise<VoteResponse> {
  const response = await fetch(`/api/projects/${projectId}/vote`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to remove vote");
  }

  const result: VoteResponse = await response.json();

  if (!result.success) {
    throw new Error(result.error || "Failed to remove vote");
  }

  return result;
}

export function useVote() {
  const queryClient = useQueryClient();

  const addVoteMutation = useMutation({
    mutationFn: addVote,
    onSuccess: (data, projectId) => {
      // Invalidate and refetch projects queries
      queryClient.invalidateQueries({ queryKey: ["projects"] });

      // Optimistically update the project's vote count
      queryClient.setQueriesData({ queryKey: ["projects"] }, (oldData: any) => {
        if (!oldData?.data) return oldData;

        return {
          ...oldData,
          data: oldData.data.map((project: any) =>
            project.id === projectId
              ? { ...project, votes: project.votes + 1 }
              : project
          ),
        };
      });
    },
    onError: (error) => {
      toast.error("Failed to add vote");
    },
  });

  const removeVoteMutation = useMutation({
    mutationFn: removeVote,
    onSuccess: (data, projectId) => {
      // Invalidate and refetch projects queries
      queryClient.invalidateQueries({ queryKey: ["projects"] });

      // Optimistically update the project's vote count
      queryClient.setQueriesData({ queryKey: ["projects"] }, (oldData: any) => {
        if (!oldData?.data) return oldData;

        return {
          ...oldData,
          data: oldData.data.map((project: any) =>
            project.id === projectId
              ? { ...project, votes: Math.max(0, project.votes - 1) }
              : project
          ),
        };
      });
    },
    onError: (error) => {
      toast.error("Failed to remove vote");
    },
  });

  return {
    addVote: addVoteMutation.mutate,
    removeVote: removeVoteMutation.mutate,
    isAddingVote: addVoteMutation.isPending,
    isRemovingVote: removeVoteMutation.isPending,
  };
}
