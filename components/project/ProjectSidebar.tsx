import { ProjectAuthor } from "./ProjectAuthor";
import { ProjectStats } from "./ProjectStats";

interface ProjectSidebarProps {
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  dailyVotes: number;
  totalVotes: number;
  hasVoted: boolean;
  onVote: () => void;
  isVoting: boolean;
  technologiesCount: number;
  dailyWinsCount: number;
}

export const ProjectSidebar = ({
  author,
  dailyVotes,
  totalVotes,
  hasVoted,
  onVote,
  isVoting,
  technologiesCount,
  dailyWinsCount,
}: ProjectSidebarProps) => {
  return (
    <div className="space-y-6">
      <ProjectAuthor author={author} />
      <ProjectStats
        dailyVotes={dailyVotes}
        totalVotes={totalVotes}
        hasVoted={hasVoted}
        onVote={onVote}
        isVoting={isVoting}
        technologiesCount={technologiesCount}
        dailyWinsCount={dailyWinsCount}
      />
    </div>
  );
};
