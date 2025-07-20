import { Button } from "@/components/ui/button";
import { HeartIcon } from "@/components/ui/heart-icon";
import { cn } from "@/lib/utils";

interface VoteButtonProps {
  isVoted: boolean;
  isLoading?: boolean;
  onClick: (event?: React.MouseEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  disabled?: boolean;
  size?: "sm" | "default" | "lg";
  variant?: "default" | "outline" | "ghost" | "secondary";
  className?: string;
  children?: React.ReactNode;
  showText?: boolean;
}

export const VoteButton = ({
  isVoted,
  isLoading = false,
  onClick,
  onKeyDown,
  disabled = false,
  size = "sm",
  variant = "outline",
  className,
  children,
  showText = true,
}: VoteButtonProps) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
    onKeyDown?.(event);
  };

  const getIconSize = () => {
    switch (size) {
      case "sm":
        return 16;
      case "default":
        return 18;
      case "lg":
        return 20;
      default:
        return 16;
    }
  };

  const getButtonText = () => {
    if (!showText) return null;
    if (isLoading) return "טוען...";
    return isVoted ? "הסר הצבעה" : "הצבע";
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      disabled={disabled || isLoading}
      className={cn(
        "flex items-center justify-center gap-2 transition-all duration-200",
        "hover:scale-105 focus:scale-105 active:scale-95",
        "focus:ring-2 focus:ring-red-500 focus:ring-offset-2",
        className
      )}
      aria-label={isVoted ? "Remove vote" : "Add vote"}
      tabIndex={0}
    >
      <HeartIcon isVoted={isVoted} isLoading={isLoading} size={getIconSize()} />
      {children || getButtonText()}
    </Button>
  );
};
