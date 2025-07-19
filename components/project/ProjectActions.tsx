import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

interface ProjectActionsProps {
  liveUrl?: string;
  githubUrl?: string;
}

export const ProjectActions = ({ liveUrl, githubUrl }: ProjectActionsProps) => {
  return (
    <div className="flex gap-3 mb-6">
      {liveUrl && (
        <Button className="flex-1" asChild>
          <a href={liveUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4 ml-2" />
            צפה בפרויקט
          </a>
        </Button>
      )}
      {githubUrl && (
        <Button variant="outline" className="flex-1" asChild>
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            <Github className="w-4 h-4 ml-2" />
            צפה בקוד
          </a>
        </Button>
      )}
    </div>
  );
};
