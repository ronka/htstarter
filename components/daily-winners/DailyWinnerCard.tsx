"use client";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { he } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { DailyWinnerWithProject } from "@/types/database";

interface DailyWinnerCardProps {
  winner: DailyWinnerWithProject;
}

export const DailyWinnerCard = ({ winner }: DailyWinnerCardProps) => {
  const { project, winDate, voteCount } = winner;
  const { title, description, image, author, category } = project;

  const handleCardClick = () => {
    // Navigation will be handled by the Link wrapper
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleCardClick();
    }
  };

  return (
    <Link href={`/project/${project.id}`} className="block">
      <Card
        className="h-full cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500"
        tabIndex={0}
        onClick={handleCardClick}
        onKeyDown={handleKeyDown}
        aria-label={`צפה בפרויקט: ${title}`}
        dir="rtl"
      >
        <CardHeader className="p-0">
          <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
            {image ? (
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200">
                <span className="text-gray-500">אין תמונה</span>
              </div>
            )}
            <div className="absolute top-3 left-3">
              <Badge variant="secondary" className="bg-white/90 text-gray-800">
                {voteCount} קולות
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="mb-3">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
              {title}
            </h3>
            <p
              className="text-gray-600 text-sm mb-3 overflow-hidden text-ellipsis"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
              }}
            >
              {description}
            </p>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            <span>מאת {author.name}</span>
            {category && (
              <Badge variant="outline" className="text-xs">
                {category.name}
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              זכה ב-{format(new Date(winDate), "d MMM yyyy", { locale: he })}
            </span>
            <span className="font-medium text-green-600">מנצח היום</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
