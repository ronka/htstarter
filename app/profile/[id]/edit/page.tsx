import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { EditProfileForm } from "./EditProfileForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface EditProfilePageProps {
  params: {
    id: string;
  };
}

// Mock function to get user data - replace with your actual data fetching logic
async function getUserProfile(id: string) {
  console.log("Fetching profile for id:", id);
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

export default async function EditProfilePage({
  params,
}: EditProfilePageProps) {
  const { userId } = await auth();
  const profileId = params.id;

  console.log("--- Authorizing Profile Edit Page ---");
  console.log("Clerk User ID:", userId);
  console.log("URL Profile ID:", profileId);
  console.log("Do they match?", userId === profileId);
  console.log("------------------------------------");

  if (!userId) {
    // This should be handled by middleware, but as a fallback
    redirect("/sign-in");
  }

  if (userId !== profileId) {
    redirect("/");
  }

  // Fetch the user's current data
  const userProfileData = await getUserProfile(profileId);

  return <EditProfileForm id={profileId} initialData={userProfileData} />;
}
