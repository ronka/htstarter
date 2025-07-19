import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ProjectErrorProps {
  error?: Error | null;
}

export const ProjectError = ({ error }: ProjectErrorProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">הפרויקט לא נמצא</h1>
        <p className="text-gray-600 mb-4">{error?.message}</p>
        <Link href="/">
          <Button>חזרה לעמוד הבית</Button>
        </Link>
      </div>
    </div>
  );
};
