import { cn } from "@/lib/utils";

interface VoteCountDisplayProps {
  dailyVotes: number;
  totalVotes: number;
  showLabel?: boolean;
  className?: string;
  dailyClassName?: string;
  totalClassName?: string;
}

export const VoteCountDisplay = ({
  dailyVotes,
  totalVotes,
  showLabel = true,
  className,
  dailyClassName,
  totalClassName,
}: VoteCountDisplayProps) => {
  return (
    <div className={cn("text-right", className)}>
      {showLabel && <div className="text-gray-600 text-sm mb-1">הצבעות</div>}
      <div className={cn("font-semibold text-lg", dailyClassName)}>
        {dailyVotes} הצבעות היום
      </div>
      <div className={cn("text-sm text-gray-500", totalClassName)}>
        {totalVotes} סה"כ הצבעות
      </div>
    </div>
  );
};
