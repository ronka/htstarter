import { ProjectAuthor } from "./ProjectAuthor";
import { ProjectStats } from "./ProjectStats";

interface ProjectSidebarProps {
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  votes: number;
  category?: {
    name: string;
  };
  technologiesCount: number;
}

export const ProjectSidebar = ({
  author,
  votes,
  category,
  technologiesCount,
}: ProjectSidebarProps) => {
  return (
    <div className="space-y-6">
      <ProjectAuthor author={author} />
      <ProjectStats
        votes={votes}
        category={category}
        technologiesCount={technologiesCount}
      />
    </div>
  );
};
