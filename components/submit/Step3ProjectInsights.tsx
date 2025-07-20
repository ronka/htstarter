"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectFormData } from "./types";
import ReactMarkdown from "react-markdown";

interface Step3ProjectInsightsProps {
  formData: ProjectFormData;
  onInputChange: (field: keyof ProjectFormData, value: string) => void;
}

export const Step3ProjectInsights = ({
  formData,
  onInputChange,
}: Step3ProjectInsightsProps) => {
  return (
    <div className="space-y-4">
      <Label htmlFor="longDescription">תיאור מפורט של הפרויקט</Label>

      <Tabs defaultValue="edit" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="edit">עריכה</TabsTrigger>
          <TabsTrigger value="preview">תצוגה מקדימה</TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="space-y-2">
          <Textarea
            id="longDescription"
            value={formData.longDescription}
            onChange={(e) => onInputChange("longDescription", e.target.value)}
            placeholder="תאר את הפרויקט בפירוט, כולל האדריכלות הטכנית, האתגרים שעמדת בפניהם, הפתרונות שיישמת, וכל פרט נוסף שיכול לעזור להבין את הפרויקט טוב יותר. תוכל להשתמש ב-Markdown לעיצוב הטקסט."
            rows={8}
            className="mt-1"
          />
          <p className="text-sm text-gray-500">
            תוכל להשתמש ב-Markdown לעיצוב הטקסט (כותרות, רשימות, קוד, וכו')
          </p>
        </TabsContent>

        <TabsContent value="preview" className="space-y-2">
          <div className="border rounded-md p-4 min-h-[200px] bg-gray-50">
            {formData.longDescription ? (
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
                  {formData.longDescription}
                </ReactMarkdown>
              </div>
            ) : (
              <p className="text-gray-500 italic">אין תוכן לתצוגה מקדימה</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
