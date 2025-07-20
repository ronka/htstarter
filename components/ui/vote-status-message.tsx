import { cn } from "@/lib/utils";

interface VoteStatusMessageProps {
  hasVoted: boolean;
  isAuthenticated: boolean;
  className?: string;
}

export const VoteStatusMessage = ({
  hasVoted,
  isAuthenticated,
  className,
}: VoteStatusMessageProps) => {
  if (!isAuthenticated) {
    return (
      <div className={cn("text-xs text-center text-gray-500", className)}>
        התחבר כדי להצביע
      </div>
    );
  }

  return (
    <div className={cn("text-xs text-center", className)}>
      {hasVoted ? (
        <span className="text-green-600 font-medium">הצבעת היום</span>
      ) : (
        <span className="text-gray-500">הצבע שוב מחר</span>
      )}
    </div>
  );
};
