import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProjectActions } from "./ProjectActions";

interface ProjectContentProps {
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  features?: string[];
  techDetails?: string;
  challenges?: string;
}

export const ProjectContent = ({
  title,
  description,
  technologies,
  liveUrl,
  githubUrl,
  features,
  techDetails,
  challenges,
}: ProjectContentProps) => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-3">{title}</h1>
      <p className="text-gray-600 text-lg mb-4">{description}</p>

      <div className="flex flex-wrap gap-2 mb-6 flex-row-reverse">
        {technologies.map((tech) => (
          <Badge key={tech} variant="secondary">
            {tech}
          </Badge>
        ))}
      </div>

      <ProjectActions liveUrl={liveUrl} githubUrl={githubUrl} />

      <Separator className="my-6" />

      <div className="space-y-6">
        {features && features.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-3">תכונות עיקריות</h3>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full ml-3" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {techDetails && (
          <div>
            <h3 className="text-xl font-semibold mb-3">פרטים טכניים</h3>
            <p className="text-gray-700 leading-relaxed">{techDetails}</p>
          </div>
        )}

        {challenges && (
          <div>
            <h3 className="text-xl font-semibold mb-3">אתגרים ופתרונות</h3>
            <p className="text-gray-700 leading-relaxed">{challenges}</p>
          </div>
        )}
      </div>
    </>
  );
};
