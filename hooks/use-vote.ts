import { useState, useCallback, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";

interface VoteResponse {
  success: boolean;
  hasVoted: boolean;
  dailyVotes: number;
  totalVotes: number;
  action: "voted" | "unvoted";
}

interface UseVoteOptions {
  projectId: number;
  initialDailyVotes?: number;
  initialTotalVotes?: number;
  initialHasVoted?: boolean;
}

export const useVote = ({
  projectId,
  initialDailyVotes = 0,
  initialTotalVotes = 0,
  initialHasVoted = false,
}: UseVoteOptions) => {
  const { userId } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Local state for optimistic updates
  const [dailyVotes, setDailyVotes] = useState(initialDailyVotes);
  const [totalVotes, setTotalVotes] = useState(initialTotalVotes);
  const [hasVoted, setHasVoted] = useState(initialHasVoted);

  // Update state when initial values change (e.g., when project data loads)
  useEffect(() => {
    setDailyVotes(initialDailyVotes);
    setTotalVotes(initialTotalVotes);
    setHasVoted(initialHasVoted);
  }, [initialDailyVotes, initialTotalVotes, initialHasVoted]);

  // Vote mutation
  const voteMutation = useMutation({
    mutationFn: async (): Promise<VoteResponse> => {
      const response = await fetch(`/api/projects/${projectId}/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to vote");
      }

      return response.json();
    },
    onMutate: async () => {
      // Optimistic update
      const previousDailyVotes = dailyVotes;
      const previousTotalVotes = totalVotes;
      const previousHasVoted = hasVoted;

      // Update local state optimistically
      if (hasVoted) {
        setDailyVotes(Math.max(0, dailyVotes - 1));
        setTotalVotes(Math.max(0, totalVotes - 1));
        setHasVoted(false);
      } else {
        setDailyVotes(dailyVotes + 1);
        setTotalVotes(totalVotes + 1);
        setHasVoted(true);
      }

      // Invalidate related queries
      await queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["today-projects"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["project", projectId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["vote-stats", projectId],
      });

      return {
        previousDailyVotes,
        previousTotalVotes,
        previousHasVoted,
      };
    },
    onSuccess: (data) => {
      // Update state with actual response
      setDailyVotes(data.dailyVotes);
      setTotalVotes(data.totalVotes);
      setHasVoted(data.hasVoted);

      // Show success toast
      toast({
        title: data.action === "voted" ? "הצבעה נוספה!" : "הצבעה הוסרה!",
        description:
          data.action === "voted"
            ? "ההצבעה שלך נרשמה להיום."
            : "ההצבעה שלך הוסרה.",
      });
    },
    onError: (error, variables, context) => {
      // Revert optimistic update
      if (context) {
        setDailyVotes(context.previousDailyVotes);
        setTotalVotes(context.previousTotalVotes);
        setHasVoted(context.previousHasVoted);
      }

      // Show error toast
      toast({
        title: "ההצבעה נכשלה",
        description:
          error.message || "לא ניתן היה לעבד את ההצבעה שלך. נסה שוב.",
        variant: "destructive",
      });
    },
  });

  // Toggle vote function
  const toggleVote = useCallback(() => {
    if (!userId) {
      toast({
        title: "נדרש להתחבר",
        description: "אנא התחבר כדי להצביע לפרויקטים.",
        variant: "destructive",
      });
      return;
    }

    voteMutation.mutate();
  }, [userId, voteMutation, toast]);

  // Check if user can vote (hasn't voted today)
  const canVote = !hasVoted;

  // Loading state
  const isLoading = voteMutation.isPending;

  return {
    // State
    dailyVotes,
    totalVotes,
    hasVoted,
    canVote,
    isLoading,

    // Actions
    toggleVote,

    // Utilities
    isAuthenticated: !!userId,
  };
};
