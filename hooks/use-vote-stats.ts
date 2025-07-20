import { useQuery } from "@tanstack/react-query";

interface VoteStats {
  dailyVotes: number;
  totalVotes: number;
  hasVoted: boolean;
  isAuthenticated: boolean;
}

interface UseVoteStatsOptions {
  projectId: number;
  enabled?: boolean;
}

export const useVoteStats = ({
  projectId,
  enabled = true,
}: UseVoteStatsOptions) => {
  return useQuery({
    queryKey: ["vote-stats", projectId],
    queryFn: async (): Promise<VoteStats> => {
      const response = await fetch(`/api/projects/${projectId}/votes`);

      if (!response.ok) {
        throw new Error("Failed to fetch vote stats");
      }

      const data = await response.json();
      return data;
    },
    enabled: enabled && projectId > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};
