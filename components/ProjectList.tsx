import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, GitFork, Loader2, ChevronDown } from "lucide-react";
import { useTodayProjects } from "@/hooks/use-today-projects";
import { useVote } from "@/hooks/use-vote";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  todayVotes: number; // Today's vote count
  createdAt: string;
  liveUrl?: string;
  githubUrl?: string;
}

interface ProjectListProps {
  initialProjects?: Project[];
  category?: string;
  search?: string;
}

type SortOption = {
  value: string;
  label: string;
  order: string;
};

const sortOptions: SortOption[] = [
  { value: "createdAt", label: "הכי חדש", order: "desc" },
  { value: "createdAt", label: "הכי ישן", order: "asc" },
  { value: "votes", label: "הכי פופולרי", order: "desc" },
  { value: "votes", label: "הכי פחות פופולרי", order: "asc" },
];

const ProjectListItem = ({ project }: { project: Project }) => {
  const { toggleVote, hasVoted, dailyVotes, isLoading } = useVote({
    projectId: project.id,
    initialDailyVotes: project.todayVotes, // Use today's vote count from API
    initialTotalVotes: project.votes,
    initialHasVoted: false,
  });

  const handleVote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleVote();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
      <div className="flex gap-4">
        <div className="flex flex-col items-center min-w-[60px]">
          <div className="text-2xl font-bold text-gray-900">{dailyVotes}</div>
          <div className="text-xs text-gray-500">Vibes</div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleVote}
            disabled={isLoading}
            className="mt-2 text-xs text-blue-600 hover:text-blue-700"
          >
            {isLoading ? (
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
                  hasVoted ? "fill-current text-red-500" : ""
                }`}
              />
              <span>{dailyVotes} votes today</span>
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
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const { data, isLoading, error } = useTodayProjects({
    category,
    search,
    sortBy,
    sortOrder,
  });

  const projects = data?.data || initialProjects || [];

  // Get today's date in Hebrew format
  const today = new Date().toLocaleDateString("he-IL", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleSortChange = (option: SortOption) => {
    setSortBy(option.value);
    setSortOrder(option.order);
  };

  const getCurrentSortLabel = () => {
    const currentOption = sortOptions.find(
      (option) => option.value === sortBy && option.order === sortOrder
    );
    return currentOption?.label || "מיון";
  };

  if (isLoading && !initialProjects) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            פרויקטי היום
          </h2>
          <p className="text-gray-600">{today}</p>
        </div>
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
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            פרויקטי היום
          </h2>
          <p className="text-gray-600">{today}</p>
        </div>
        <div className="text-center py-12">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            שגיאה בטעינת הפרויקטים
          </h3>
          <p className="text-gray-500">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-right">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            פרויקטי היום
          </h2>
          <p className="text-gray-600">{today}</p>
        </div>

        {/* Sort Controls */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  טוען...
                </>
              ) : (
                <>
                  {getCurrentSortLabel()}
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {sortOptions.map((option, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => handleSortChange(option)}
                className={
                  sortBy === option.value && sortOrder === option.order
                    ? "bg-blue-50"
                    : ""
                }
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <ProjectListItem key={project.id} project={project} />
        ))}

        {projects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              לא נמצאו פרויקטים
            </h3>
            <p className="text-gray-500">
              נסה לשנות את החיפוש או קריטריוני הסינון
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
