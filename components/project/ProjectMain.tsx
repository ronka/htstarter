import { Card, CardContent } from "@/components/ui/card";
import { ProjectImage } from "./ProjectImage";
import { ProjectContent } from "./ProjectContent";

interface ProjectMainProps {
  image: string;
  title: string;
  description: string;
  technologies: string[];
  votes: number;
  voted: boolean;
  onVote: () => void;
  isVoting: boolean;
  liveUrl?: string;
  githubUrl?: string;
  features?: string[];
  techDetails?: string;
  challenges?: string;
}

export const ProjectMain = ({
  image,
  title,
  description,
  technologies,
  votes,
  voted,
  onVote,
  isVoting,
  liveUrl,
  githubUrl,
  features,
  techDetails,
  challenges,
}: ProjectMainProps) => {
  return (
    <Card>
      <ProjectImage
        image={image}
        title={title}
        votes={votes}
        voted={voted}
        onVote={onVote}
        isVoting={isVoting}
      />
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
