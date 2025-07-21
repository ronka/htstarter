import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User } from "@/types/profile";
import { ExperienceTimeline } from "@/components/profile/ExperienceTimeline";

interface ProfileInfoProps {
  user: User;
}

const ProfileInfo = ({ user }: ProfileInfoProps) => {
  let experiences: any[] = [];
  if (user.experience) {
    try {
      const parsed = JSON.parse(user.experience);
      if (
        parsed &&
        typeof parsed === "object" &&
        Array.isArray(parsed.experiences)
      ) {
        experiences = parsed.experiences;
      }
    } catch (error) {
      // ignore error
    }
  }

  return (
    <Card className="p-6">
      <div className="text-center">
        <img
          src={user.avatar || "/placeholder.svg"}
          alt={user.name}
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
        />
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h1>
        <p className="text-sm text-gray-500 mb-4">
          {user.location || "מיקום לא צוין"}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          {user.bio || "אין תיאור זמין"}
        </p>
      </div>
    </Card>
  );
};

export default ProfileInfo;
