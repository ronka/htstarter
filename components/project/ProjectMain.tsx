import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { ProjectImage } from "./ProjectImage";
import { ProjectContent } from "./ProjectContent";

interface ProjectMainProps {
  image: string;
  title: string;
  description: string;
  technologies: string[];
  dailyVotes: number;
  totalVotes: number;
  hasVoted: boolean;
  onVote: () => void;
  isVoting: boolean;
  liveUrl?: string;
  githubUrl?: string;
  features?: string[];
  techDetails?: string;
  challenges?: string;
  authorId: string;
  projectId: string;
}

export const ProjectMain = ({
  image,
  title,
  description,
  technologies,
  dailyVotes,
  totalVotes,
  hasVoted,
  onVote,
  isVoting,
  liveUrl,
  githubUrl,
  features,
  techDetails,
  challenges,
  authorId,
  projectId,
}: ProjectMainProps) => {
  const { userId } = useAuth();
  const router = useRouter();
  const isOwner = userId === authorId;

  const handleEdit = () => {
    router.push(`/project/${projectId}/edit`);
  };

  return (
    <Card>
      <div className="relative">
        <ProjectImage
          image={image}
          title={title}
          dailyVotes={dailyVotes}
          hasVoted={hasVoted}
          onVote={onVote}
          isVoting={isVoting}
        />
        {isOwner && (
          <div className="absolute top-4 right-4 z-10">
            <Button
              onClick={handleEdit}
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white shadow-md"
            >
              <Edit className="w-4 h-4 mr-2" />
              ערוך
            </Button>
          </div>
        )}
      </div>
      <CardContent className="p-6">
        <ProjectContent
          title={title}
          description={description}
          technologies={technologies}
          liveUrl={liveUrl}
          githubUrl={githubUrl}
          features={features}
          techDetails={techDetails}
          challenges={challenges}
        />
      </CardContent>
    </Card>
  );
};
