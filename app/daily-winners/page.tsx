import { Suspense } from "react";
import { DailyWinnersList } from "@/components/daily-winners/DailyWinnersList";
import { DailyWinnersSkeleton } from "@/components/daily-winners/DailyWinnersSkeleton";

export const metadata = {
  title: "Daily Winners | HT Starter",
  description: "View the daily winners of the HT Starter community",
};

export default function DailyWinnersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Daily Winners</h1>
        <p className="text-gray-600">
          Celebrate the projects that won each day in our community
        </p>
      </div>

      <Suspense fallback={<DailyWinnersSkeleton />}>
        <DailyWinnersList />
      </Suspense>
    </div>
  );
}
