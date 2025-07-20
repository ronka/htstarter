import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VoteButton } from "@/components/ui/vote-button";
import { VoteStatusMessage } from "@/components/ui/vote-status-message";
import { VoteCountDisplay } from "@/components/ui/vote-count-display";
import { useAuth } from "@clerk/nextjs";

interface ProjectStatsProps {
  dailyVotes: number;
  totalVotes: number;
  hasVoted: boolean;
  onVote: () => void;
  isVoting: boolean;
  technologiesCount: number;
  dailyWinsCount: number;
}

export const ProjectStats = ({
  dailyVotes,
  totalVotes,
  hasVoted,
  onVote,
  isVoting,
  technologiesCount,
  dailyWinsCount,
}: ProjectStatsProps) => {
  const { userId } = useAuth();
  const isAuthenticated = !!userId;

  const handleVoteClick = () => {
    if (!isAuthenticated) return;
    onVote();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>סטטיסטיקות הפרויקט</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Vote Statistics */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">הצבעות</span>
            <VoteCountDisplay
              dailyVotes={dailyVotes}
              totalVotes={totalVotes}
              showLabel={false}
            />
          </div>

          {/* Vote Button */}
          {isAuthenticated && (
            <div className="space-y-2">
              <VoteButton
                isVoted={hasVoted}
                isLoading={isVoting}
                onClick={handleVoteClick}
                variant="outline"
                size="sm"
                className="w-full"
              />

              {/* Vote Status Message */}
              <VoteStatusMessage
                hasVoted={hasVoted}
                isAuthenticated={isAuthenticated}
              />
            </div>
          )}

          {!isAuthenticated && (
            <VoteStatusMessage
              hasVoted={false}
              isAuthenticated={isAuthenticated}
            />
          )}
        </div>

        <div className="border-t pt-3 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">טכנולוגיות</span>
            <span className="font-semibold">{technologiesCount} כלים</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">ניצחונות יומיים</span>
            <span className="font-semibold text-green-600">
              {dailyWinsCount} פעמים
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
