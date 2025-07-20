import { VoteButton } from "@/components/ui/vote-button";

interface ProjectImageProps {
  image: string;
  title: string;
  dailyVotes: number;
  hasVoted: boolean;
  onVote: () => void;
  isVoting: boolean;
}

export const ProjectImage = ({
  image,
  title,
  dailyVotes,
  hasVoted,
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
      <div className="absolute top-4 left-4">
        <VoteButton
          isVoted={hasVoted}
          isLoading={isVoting}
          onClick={onVote}
          size="sm"
          variant={hasVoted ? "default" : "secondary"}
          showText={true}
          className={`${
            hasVoted
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-white/90 hover:bg-white text-gray-900"
          } backdrop-blur-sm shadow-sm`}
        >
          {dailyVotes}
        </VoteButton>
      </div>
    </div>
  );
};
