import { useQuery } from "@tanstack/react-query";
import type { DailyWinnerWithProject } from "@/types/database";

interface DailyWinnersResponse {
  success: boolean;
  data: DailyWinnerWithProject[];
  error?: string;
}

const fetchDailyWinners = async (): Promise<DailyWinnerWithProject[]> => {
  const response = await fetch("/api/daily-winners");
  const data: DailyWinnersResponse = await response.json();

  if (!data.success) {
    throw new Error(data.error || "Failed to fetch daily winners");
  }

  return data.data;
};

export const useDailyWinners = () => {
  return useQuery({
    queryKey: ["daily-winners"],
    queryFn: fetchDailyWinners,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3, // Retry failed requests up to 3 times
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });
};

export const useYesterdaysWinner = () => {
  return useQuery({
    queryKey: ["yesterdays-winner"],
    queryFn: async (): Promise<DailyWinnerWithProject | null> => {
      try {
        // Add timeout to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        const response = await fetch("/api/daily-winners", {
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          return null;
        }

        const data: DailyWinnersResponse = await response.json();

        if (!data.success || !data.data || data.data.length === 0) {
          return null;
        }

        // Get yesterday's date in YYYY-MM-DD format
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toISOString().split("T")[0];

        // Find yesterday's winner by comparing date strings
        const yesterdaysWinner = data.data.find((winner) => {
          const winnerDateString = new Date(winner.winDate)
            .toISOString()
            .split("T")[0];
          return winnerDateString === yesterdayString;
        });

        return yesterdaysWinner || null;
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          console.warn("Yesterday winner fetch timed out");
        }
        return null;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 0, // No retries to avoid hanging
    refetchOnWindowFocus: false, // Prevent refetch on focus
    enabled: true, // Always enabled
  });
};
