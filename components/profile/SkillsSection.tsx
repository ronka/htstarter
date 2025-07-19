import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface SkillsSectionProps {
  skills: string[];
}

const SkillsSection = ({ skills }: SkillsSectionProps) => {
  return (
    <Card className="p-6 mt-6">
      <h3 className="font-semibold text-lg mb-4">Skills & Technologies</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Badge key={index} variant="secondary" className="text-xs">
            {skill}
          </Badge>
        ))}
      </div>
    </Card>
  );
};

export default SkillsSection;
