import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, GitFork } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  author: {
    name: string;
    avatar: string;
    id: string;
  };
  technologies: string[];
  votes: number;
  comments?: number;
  isVoted?: boolean;
  timeAgo: string;
}

interface ProjectListProps {
  projects: Project[];
}

const ProjectListItem = ({ project }: { project: Project }) => {
  const [voted, setVoted] = useState(project.isVoted || false);
  const [voteCount, setVoteCount] = useState(project.votes);

  const handleVote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (voted) {
      setVoteCount((prev) => prev - 1);
    } else {
      setVoteCount((prev) => prev + 1);
    }
    setVoted(!voted);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
      <div className="flex gap-4">
        <div className="flex flex-col items-center min-w-[60px]">
          <div className="text-2xl font-bold text-gray-900">
            {Math.floor(Math.random() * 9) + 1}
          </div>
          <div className="text-xs text-gray-500">Vibes</div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleVote}
            className="mt-2 text-xs text-blue-600 hover:text-blue-700"
          >
            Vibe it
          </Button>
        </div>

        <div className="flex-shrink-0">
          <Link href={`/project/${project.id}`}>
            <img
              src={project.image}
              alt={project.title}
              className="w-20 h-16 object-cover rounded-lg hover:opacity-80 transition-opacity"
            />
          </Link>
        </div>

        <div className="flex-1 min-w-0">
          <Link href={`/project/${project.id}`} className="group">
            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
              {project.title}
            </h3>
          </Link>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {project.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <Link
              href={`/profile/${project.author.id}`}
              className="hover:text-gray-700 transition-colors"
            >
              by {project.author.name}
            </Link>
            <span>{project.timeAgo}</span>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              <span>{project.comments || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart
                className={`w-4 h-4 ${
                  voted ? "fill-current text-red-500" : ""
                }`}
              />
              <span>{voteCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <GitFork className="w-4 h-4" />
              <span>Repo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectList = ({ projects }: ProjectListProps) => {
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <ProjectListItem key={project.id} project={project} />
      ))}

      {projects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No projects found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      <div className="text-center py-8">
        <Link href="/submit">
          <Button variant="outline" className="text-gray-600">
            Submit your vibe app
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProjectList;
