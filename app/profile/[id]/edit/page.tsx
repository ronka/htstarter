"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter, useParams } from "next/navigation";
import { EditProfileForm } from "./EditProfileForm";
import { useEffect, useState } from "react";

// Mock function to get user data - replace with your actual data fetching logic
async function getUserProfile(id: string) {
  // In a real app, you would fetch this from your database
  return {
    name: "Sarah Chen",
    title: "Full Stack Developer & AI Enthusiast",
    location: "San Francisco, CA",
    website: "https://sarahchen.dev",
    twitter: "@sarahchen_dev",
    github: "sarahchen",
    bio: "Passionate developer building AI-powered applications. Love creating user-friendly interfaces and solving complex problems with clean, efficient code.",
    skills: [
      "React",
      "TypeScript",
      "Node.js",
      "Python",
      "AWS",
      "MongoDB",
      "GraphQL",
      "Docker",
    ],
    experience: [
      {
        title: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        duration: "2022 - Present",
        description:
          "Leading frontend development for AI-powered SaaS platform, managing team of 5 developers.",
      },
    ],
  };
}

export default function EditProfilePage() {
  const { userId } = useAuth();
  const params = useParams();
  const router = useRouter();
  const profileId = params.id as string;
  const [userProfileData, setUserProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      router.replace("/sign-in");
      return;
    }
    if (userId !== profileId) {
      router.replace("/");
      return;
    }
    getUserProfile(profileId).then((data) => {
      setUserProfileData(data);
      setLoading(false);
    });
  }, [userId, profileId, router]);

  if (loading || !userProfileData) return null;

  return <EditProfileForm id={profileId} initialData={userProfileData} />;
}
