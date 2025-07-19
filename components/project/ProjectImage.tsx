import { Button } from "@/components/ui/button";
import { Heart, Loader2 } from "lucide-react";

interface ProjectImageProps {
  image: string;
  title: string;
  votes: number;
  voted: boolean;
  onVote: () => void;
  isVoting: boolean;
}

export const ProjectImage = ({
  image,
  title,
  votes,
  voted,
  onVote,
  isVoting,
}: ProjectImageProps) => {
  return (
    <div className="relative">
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-cover rounded-t-lg"
      />
      <div className="absolute top-4 left-4 flex gap-2">
        <Button
          size="sm"
          className={`${
            voted ? "bg-red-500 hover:bg-red-600" : "bg-white hover:bg-gray-100"
          } text-gray-900`}
          onClick={onVote}
          disabled={isVoting}
        >
          {isVoting ? (
            <Loader2 className="w-4 h-4 animate-spin ml-1" />
          ) : (
            <Heart className={`w-4 h-4 ml-1 ${voted ? "fill-current" : ""}`} />
          )}
          {votes}
        </Button>
      </div>
    </div>
  );
};
