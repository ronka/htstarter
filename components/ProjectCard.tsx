import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, ExternalLink } from "lucide-react";

interface ProjectCardProps {
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
  votes: number;
  isVoted?: boolean;
}

const ProjectCard = ({
  id,
  title,
  description,
  image,
  author,
  technologies,
  votes,
  isVoted = false,
}: ProjectCardProps) => {
  const [voted, setVoted] = useState(isVoted);
  const [voteCount, setVoteCount] = useState(votes);

  const handleVote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (voted) {
      setVoteCount((prev) => prev - 1);
    } else {
      setVoteCount((prev) => prev + 1);
    }
    setVoted(!voted);
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-0 shadow-sm bg-white">
      <Link href={`/project/${id}`}>
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <Button
              variant={voted ? "default" : "secondary"}
              size="sm"
              onClick={handleVote}
              className={`${
                voted
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-white/90 hover:bg-white"
              } backdrop-blur-sm shadow-sm`}
            >
              <Heart
                className={`w-4 h-4 ml-1 ${voted ? "fill-current" : ""}`}
              />
              {voteCount}
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {description}
          </p>

          <div className="flex flex-wrap gap-1 mb-3 justify-end">
            {technologies.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {technologies.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{technologies.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="px-4 py-3 border-t bg-gray-50/50">
          <div className="flex items-center justify-between w-full">
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 hover:text-blue-700"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>

            <Link
              href={`/profile/${author.id}`}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <Avatar className="w-6 h-6">
                <AvatarImage src={author.avatar} />
                <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-600">{author.name}</span>
            </Link>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ProjectCard;
