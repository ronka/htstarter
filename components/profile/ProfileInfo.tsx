import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User } from "@/types/profile";

interface ProfileInfoProps {
  user: User;
}

const ProfileInfo = ({ user }: ProfileInfoProps) => {
  const getExperienceTitle = (experience: string) => {
    try {
      if (experience) {
        const parsed = JSON.parse(experience);
        if (
          parsed &&
          typeof parsed === "object" &&
          !Array.isArray(parsed) &&
          parsed.title
        ) {
          return parsed.title;
        }
      }
    } catch (error) {
      return experience;
    }
    return experience;
  };

  return (
    <Card className="p-6">
      <div className="text-center">
        <img
          src={user.avatar || "/placeholder.svg"}
          alt={user.name}
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
        />
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h1>
        <p className="text-gray-600 mb-2">
          {getExperienceTitle(user.experience)}
        </p>
        <p className="text-sm text-gray-500 mb-4">
          {user.location || "מיקום לא צוין"}
        </p>

        <p className="text-sm text-gray-600">{user.bio || "אין תיאור זמין"}</p>
      </div>
    </Card>
  );
};

export default ProfileInfo;
