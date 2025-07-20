import { Suspense } from "react";
import { DailyWinnersList } from "@/components/daily-winners/DailyWinnersList";
import { DailyWinnersSkeleton } from "@/components/daily-winners/DailyWinnersSkeleton";

export const metadata = {
  title: "מנצחי היום | HT Starter",
  description: "צפה במנצחי היום של קהילת HT Starter",
};

export default function DailyWinnersPage() {
  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">מנצחי היום</h1>
        <p className="text-gray-600">
          חגגו את הפרויקטים שזכו בכל יום בקהילה שלנו
        </p>
      </div>

      <Suspense fallback={<DailyWinnersSkeleton />}>
        <DailyWinnersList />
      </Suspense>
    </div>
  );
}
