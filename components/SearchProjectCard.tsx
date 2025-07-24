"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { VoteButton } from "@/components/ui/vote-button";
import { useVote } from "@/hooks/use-vote";

interface SearchProjectCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  author: {
    name: string;
    avatar: string;
    id: string;
  };
  technologies: string[];
  totalVotes?: number;
  hasVoted?: boolean;
}

export const SearchProjectCard = ({
  id,
  title,
  description,
  image,
  author,
  technologies,
  totalVotes = 0,
  hasVoted = false,
}: SearchProjectCardProps) => {
  const {
    toggleVote,
    dailyVotes: currentDailyVotes,
    hasVoted: currentHasVoted,
    isLoading,
  } = useVote({
    projectId: parseInt(id),
    initialDailyVotes: 0,
    initialTotalVotes: totalVotes,
    initialHasVoted: hasVoted,
  });

  const handleVote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleVote();
  };

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
    <Link href={`/project/${id}`} className="block">
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
              <VoteButton
                isVoted={currentHasVoted}
                isLoading={isLoading}
                onClick={handleVote}
                size="sm"
                variant={currentHasVoted ? "default" : "secondary"}
                showText={true}
                className={`${
                  currentHasVoted
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-white/90 hover:bg-white"
                } backdrop-blur-sm shadow-sm`}
              >
                {currentDailyVotes} היום
              </VoteButton>
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
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">{totalVotes} קולות סה&quot;כ</span>
            <div className="flex flex-wrap gap-1">
              {technologies.slice(0, 2).map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="text-xs bg-gray-50"
                >
                  {tech}
                </Badge>
              ))}
              {technologies.length > 2 && (
                <Badge variant="outline" className="text-xs bg-gray-50">
                  +{technologies.length - 2}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
