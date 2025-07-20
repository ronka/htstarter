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
  longDescription?: string;
}

export const ProjectContent = ({
  title,
  description,
  technologies,
  liveUrl,
  githubUrl,
  features,
  longDescription,
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

        {longDescription && (
          <div>
            <h3 className="text-xl font-semibold mb-3">תיאור מפורט</h3>
            <div
              className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-code:text-gray-800 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-100 prose-pre:text-gray-800"
              dangerouslySetInnerHTML={{
                __html: renderMarkdown(longDescription),
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

// Simple markdown renderer function
const renderMarkdown = (text: string): string => {
  return (
    text
      // Headers
      .replace(
        /^### (.*$)/gim,
        '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>'
      )
      .replace(
        /^## (.*$)/gim,
        '<h2 class="text-xl font-semibold mt-6 mb-3">$1</h2>'
      )
      .replace(
        /^# (.*$)/gim,
        '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>'
      )
      // Bold
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      // Italic
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      // Code blocks
      .replace(
        /```([\s\S]*?)```/g,
        '<pre class="bg-gray-100 p-3 rounded-lg overflow-x-auto"><code>$1</code></pre>'
      )
      // Inline code
      .replace(
        /`([^`]+)`/g,
        '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>'
      )
      // Lists
      .replace(/^\* (.*$)/gim, '<li class="ml-4">$1</li>')
      .replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>')
      // Wrap lists in ul tags (simple approach)
      .replace(/(<li.*<\/li>)/g, '<ul class="list-disc space-y-1 my-2">$1</ul>')
      // Line breaks
      .replace(/\n/g, "<br>")
      // Links
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>'
      )
  );
};
