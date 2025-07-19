import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const ProjectHeader = () => {
  return (
    <Link
      href="/"
      className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
    >
      <ArrowLeft className="w-4 h-4 ml-2" />
      חזרה לפרויקטים
    </Link>
  );
};
