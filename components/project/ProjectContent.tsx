import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ReactMarkdown from "react-markdown";
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
            <div className="prose prose-gray max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-lg font-bold mt-8 mb-4 text-gray-900">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-md font-semibold mt-6 mb-3 text-gray-900">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-base font-bold mt-4 mb-2 text-gray-900">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-gray-700 mb-3 leading-relaxed">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc space-y-1 my-3 mr-6 text-gray-700">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal space-y-1 my-3 mr-6 text-gray-700">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-gray-700">{children}</li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-gray-900">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-gray-700">{children}</em>
                  ),
                  code: ({ children }) => (
                    <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-gray-800">
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-gray-100 p-3 rounded-lg overflow-x-auto my-3">
                      <code className="text-sm font-mono text-gray-800">
                        {children}
                      </code>
                    </pre>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      className="text-blue-600 hover:underline hover:text-blue-800"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-r-4 border-gray-300 pr-4 my-3 italic text-gray-600">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {longDescription}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
