import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { getTechnologyStyle } from "@/lib/technologies";

interface TechnologyBadgeProps {
  technology: string;
  onRemove?: (tech: string) => void;
  className?: string;
}

export const TechnologyBadge = ({
  technology,
  onRemove,
  className = "",
}: TechnologyBadgeProps) => {
  const { color, emoji } = getTechnologyStyle(technology);

  return (
    <Badge
      variant="secondary"
      className={`flex items-center gap-1 ${color} ${className}`}
    >
      {emoji && <span>{emoji}</span>}
      {technology}
      {onRemove && (
        <X
          className="w-3 h-3 cursor-pointer hover:text-red-600"
          onClick={() => onRemove(technology)}
        />
      )}
    </Badge>
  );
};
