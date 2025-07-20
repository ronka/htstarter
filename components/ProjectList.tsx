import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, GitFork, Loader2 } from "lucide-react";
import { useProjects } from "@/hooks/use-projects";
import { useVote } from "@/hooks/use-vote";
import { useState } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  technologies: string[];
  votes: number;
  createdAt: string;
  liveUrl?: string;
  githubUrl?: string;
}

interface ProjectListProps {
  initialProjects?: Project[];
  category?: string;
  search?: string;
}

const ProjectListItem = ({ project }: { project: Project }) => {
  const [voted, setVoted] = useState(false);
  const { addVote, removeVote, isAddingVote, isRemovingVote } = useVote();

  const handleVote = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAddingVote || isRemovingVote) return;

    if (voted) {
      removeVote(project.id);
      setVoted(false);
    } else {
      addVote(project.id);
      setVoted(true);
    }
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
            disabled={isAddingVote || isRemovingVote}
            className="mt-2 text-xs text-blue-600 hover:text-blue-700"
          >
            {isAddingVote || isRemovingVote ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              "Vibe it"
            )}
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
              {project.author.name}
            </Link>
            <span>
              {new Date(project.createdAt).toLocaleDateString("he-IL", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            <div className="flex items-center gap-1">
              <Heart
                className={`w-4 h-4 ${
                  voted ? "fill-current text-red-500" : ""
                }`}
              />
              <span>{project.votes}</span>
            </div>
            <div className="flex items-center gap-1">
              <GitFork className="w-4 h-4" />
              <span>GitHub</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectList = ({
  initialProjects,
  category,
  search,
}: ProjectListProps) => {
  const { data, isLoading, error } = useProjects({
    category,
    search,
  });

  const projects = data?.data || initialProjects || [];

  if (isLoading && !initialProjects) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse"
          >
            <div className="flex gap-4">
              <div className="w-20 h-16 bg-gray-200 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-400 text-6xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          Error loading projects
        </h3>
        <p className="text-gray-500">{error.message}</p>
      </div>
    );
  }

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
    </div>
  );
};

export default ProjectList;
