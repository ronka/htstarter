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
  });
};
