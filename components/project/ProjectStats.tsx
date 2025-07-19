import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProjectStatsProps {
  votes: number;
  category?: {
    name: string;
  };
  technologiesCount: number;
}

export const ProjectStats = ({
  votes,
  category,
  technologiesCount,
}: ProjectStatsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>סטטיסטיקות הפרויקט</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">הצבעות</span>
          <span className="font-semibold">{votes}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">קטגוריה</span>
          <Badge variant="outline">{category?.name || "N/A"}</Badge>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">טכנולוגיות</span>
          <span className="font-semibold">{technologiesCount} כלים</span>
        </div>
      </CardContent>
    </Card>
  );
};
