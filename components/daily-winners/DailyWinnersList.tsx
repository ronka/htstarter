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
      <div className="text-center py-12" dir="rtl">
        <div className="text-red-500 text-lg mb-2">נכשל בטעינת מנצחי היום</div>
        <p className="text-gray-600">אנא נסה שוב מאוחר יותר.</p>
      </div>
    );
  }

  if (!winners || winners.length === 0) {
    return (
      <div className="text-center py-12" dir="rtl">
        <div className="text-gray-500 text-lg mb-2">אין עדיין מנצחי יום</div>
        <p className="text-gray-600">
          בדוק שוב מאוחר יותר כדי לראות את הפרויקטים הזוכים!
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      dir="rtl"
    >
      {winners.map((winner) => (
        <DailyWinnerCard key={winner.id} winner={winner} />
      ))}
    </div>
  );
};
