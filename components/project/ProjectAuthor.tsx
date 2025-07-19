import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProjectAuthorProps {
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
}

export const ProjectAuthor = ({ author }: ProjectAuthorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>נוצר על ידי</CardTitle>
      </CardHeader>
      <CardContent>
        <Link
          href={`/profile/${author.id}`}
          className="flex items-center space-x-3 space-x-reverse hover:bg-gray-50 p-3 rounded-lg transition-colors"
        >
          <Avatar className="w-12 h-12">
            <AvatarImage src={author.avatar} />
            <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold">{author.name}</h4>
            <p className="text-sm text-gray-600">צפה בפרופיל ←</p>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};
