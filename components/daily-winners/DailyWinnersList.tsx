"use client";

import { useDailyWinners } from "@/hooks/use-daily-winners";
import { DailyWinnerCard } from "./DailyWinnerCard";
import { DailyWinnersSkeleton } from "./DailyWinnersSkeleton";

export const DailyWinnersList = () => {
  const { data: winners, isLoading, error } = useDailyWinners();

  if (isLoading) {
    return <DailyWinnersSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg mb-2">
          Failed to load daily winners
        </div>
        <p className="text-gray-600">Please try again later.</p>
      </div>
    );
  }

  if (!winners || winners.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-2">No daily winners yet</div>
        <p className="text-gray-600">
          Check back later to see the winning projects!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {winners.map((winner) => (
        <DailyWinnerCard key={winner.id} winner={winner} />
      ))}
    </div>
  );
};
