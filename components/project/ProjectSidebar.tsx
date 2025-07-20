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
  category?: {
    name: string;
  };
  technologiesCount: number;
}

export const ProjectSidebar = ({
  author,
  dailyVotes,
  totalVotes,
  hasVoted,
  onVote,
  isVoting,
  category,
  technologiesCount,
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
        category={category}
        technologiesCount={technologiesCount}
      />
    </div>
  );
};
