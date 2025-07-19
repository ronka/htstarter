"use client";

import { useParams } from "next/navigation";
import Header from "@/components/Header";
import { useUserProfile } from "@/hooks/use-user-profile";
import ProfileInfo from "@/components/profile/ProfileInfo";
import SkillsSection from "@/components/profile/SkillsSection";
import ContactInfo from "@/components/profile/ContactInfo";
import ExperienceSection from "@/components/profile/ExperienceSection";
import ProjectsSection from "@/components/profile/ProjectsSection";
import ProfileLoading from "@/components/profile/ProfileLoading";
import ProfileError from "@/components/profile/ProfileError";

export default function ProfilePage() {
  const params = useParams();
  const id = params?.id as string;

  const { data: user, isLoading, error } = useUserProfile(id);

  if (isLoading) {
    return <ProfileLoading />;
  }

  if (error || !user) {
    return <ProfileError error={error?.message || "משתמש לא נמצא"} />;
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <ProfileInfo user={user} />
            <SkillsSection skills={user.skills || []} />
            <ContactInfo
              website={user.website || ""}
              twitter={user.twitter || ""}
              github={user.github || ""}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <ExperienceSection experience={user.experience || ""} />
            <ProjectsSection projects={user.projects || []} />
          </div>
        </div>
      </div>
    </div>
  );
}
