"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import { EditProfileForm } from "./EditProfileForm";
import { EditProfileSkeleton } from "@/components/profile/EditProfileSkeleton";
import { useUserProfile } from "@/hooks/use-user-profile";

// Default empty profile data for new users
const defaultProfileData = {
  name: "",
  title: "",
  location: "",
  website: "",
  twitter: "",
  github: "",
  bio: "",
  skills: [],
  experience: [],
};

export default function EditProfilePage() {
  const { userId } = useAuth();
  const params = useParams();
  const router = useRouter();
  const profileId = params.id as string;

  // Use React Query to fetch user profile
  const {
    data: userProfileData,
    isLoading,
    error,
    isError,
  } = useUserProfile(profileId);

  // Handle authentication and authorization using useEffect
  useEffect(() => {
    if (!userId) {
      router.replace("/sign-in");
      return;
    }

    if (userId !== profileId) {
      router.replace("/");
      return;
    }
  }, [userId, profileId, router]);

  // Show loading state
  if (isLoading) {
    return <EditProfileSkeleton />;
  }

  // Handle error states
  if (isError) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to load profile";

    // If user not found, show empty form with message for new user
    if (errorMessage === "User not found") {
      return (
        <>
          <div
            className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">
              Welcome! Let&apos;s create your profile. Fill in the details below
              to get started.
            </span>
          </div>
          <EditProfileForm
            id={profileId}
            initialData={defaultProfileData}
            isNewUser={true}
          />
        </>
      );
    }

    // For other errors, show error message
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load profile</p>
          <p className="text-gray-600 mb-4">{errorMessage}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Transform API data to match form expectations
  const formData = userProfileData
    ? {
        name: userProfileData.name || "",
        title: (() => {
          try {
            if (userProfileData.experience) {
              const parsed = JSON.parse(userProfileData.experience);
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
            console.log("Failed to parse title from experience data:", error);
          }
          return ""; // Default to empty string
        })(),
        location: userProfileData.location || "",
        website: userProfileData.website || "",
        twitter: userProfileData.twitter || "",
        github: userProfileData.github || "",
        bio: userProfileData.bio || "",
        skills: userProfileData.skills || [],
        experience: (() => {
          try {
            // Try to parse experience as JSON (new format)
            if (userProfileData.experience) {
              const parsed = JSON.parse(userProfileData.experience);
              if (Array.isArray(parsed)) {
                // Old format - direct array
                return parsed;
              } else if (parsed.experiences) {
                // New format - object with title and experiences
                return parsed.experiences;
              }
            }
          } catch (error) {
            // If parsing fails, return empty array
            console.log("Failed to parse experience data:", error);
          }
          return []; // Default to empty array
        })(),
      }
    : defaultProfileData;

  return (
    <EditProfileForm id={profileId} initialData={formData} isNewUser={false} />
  );
}
