import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getTechnologyStyle } from "@/lib/technologies";

interface SkillsSectionProps {
  skills: string[];
}

const SkillsSection = ({ skills }: SkillsSectionProps) => {
  return (
    <Card className="p-6 mt-6">
      <h3 className="font-semibold text-lg mb-4">כישורים וטכנולוגיות</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => {
          const { emoji, color } = getTechnologyStyle(skill);
          return (
            <Badge
              key={index}
              variant="secondary"
              className={`text-xs ${color}`}
            >
              {emoji && <span className="mr-1">{emoji}</span>}
              {skill}
            </Badge>
          );
        })}
      </div>
    </Card>
  );
};

export default SkillsSection;
