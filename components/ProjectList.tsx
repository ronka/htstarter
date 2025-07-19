import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, GitFork, Loader2 } from "lucide-react";
import { toast } from "sonner";

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
  comments: number;
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
  const [voteCount, setVoteCount] = useState(project.votes);
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isVoting) return;

    setIsVoting(true);

    try {
      if (voted) {
        // Remove vote
        const response = await fetch(`/api/projects/${project.id}/vote`, {
          method: "DELETE",
        });

        if (response.ok) {
          setVoteCount((prev) => prev - 1);
          setVoted(false);
        } else {
          toast.error("Failed to remove vote");
        }
      } else {
        // Add vote
        const response = await fetch(`/api/projects/${project.id}/vote`, {
          method: "POST",
        });

        if (response.ok) {
          setVoteCount((prev) => prev + 1);
          setVoted(true);
        } else {
          toast.error("Failed to add vote");
        }
      }
    } catch (error) {
      toast.error("An error occurred while voting");
    } finally {
      setIsVoting(false);
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
            <span>
              {new Date(project.createdAt).toLocaleDateString("he-IL", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
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

const ProjectList = ({
  initialProjects,
  category,
  search,
}: ProjectListProps) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects || []);
  const [loading, setLoading] = useState(!initialProjects);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        if (category) params.append("category", category);
        if (search) params.append("search", search);

        const response = await fetch(`/api/projects?${params.toString()}`);

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();

        if (data.success) {
          setProjects(data.data);
        } else {
          throw new Error(data.error || "Failed to fetch projects");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        toast.error("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [category, search]);

  if (loading) {
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
        <p className="text-gray-500">{error}</p>
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
