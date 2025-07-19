import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Heart, ExternalLink, Github } from "lucide-react";
import { Project } from "@/types/profile";

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-6">הפרויקטים שלי</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects && projects.length > 0 ? (
          projects.map((project) => (
            <div
              key={project.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{project.title}</h3>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Heart className="w-4 h-4" />
                  {project.votes}
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1 mb-3">
                {project.technologies.slice(0, 3).map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{project.technologies.length - 3}
                  </Badge>
                )}
              </div>
              <div className="flex gap-2 text-sm">
                {project.liveUrl && (
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      צפה
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-3 h-3 mr-1" />
                      קוד
                    </a>
                  </Button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center py-8">
            <p className="text-gray-500">אין פרויקטים עדיין</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProjectsSection;
