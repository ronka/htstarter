import { Heart, HeartOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeartIconProps {
  isVoted: boolean;
  isLoading?: boolean;
  size?: number;
  className?: string;
}

export const HeartIcon = ({
  isVoted,
  isLoading = false,
  size = 16,
  className,
}: HeartIconProps) => {
  if (isLoading) {
    return (
      <div
        className={cn(
          "border-2 border-gray-300 border-t-red-500 rounded-full animate-spin",
          className
        )}
        style={{ width: size, height: size }}
      />
    );
  }

  if (isVoted) {
    return (
      <Heart
        className={cn("text-red-500 fill-red-500", className)}
        size={size}
      />
    );
  }

  return (
    <HeartOff
      className={cn(
        "text-gray-400 hover:text-red-500 transition-colors",
        className
      )}
      size={size}
    />
  );
};
