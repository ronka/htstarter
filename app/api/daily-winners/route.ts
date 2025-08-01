import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { dailyWinners, projects, users } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import type { DailyWinnerWithProject } from "@/types/database";

export async function GET(request: NextRequest) {
  try {
    // Fetch daily winners with project details and author
    const winners = await db
      .select({
        id: dailyWinners.id,
        projectId: dailyWinners.projectId,
        winDate: dailyWinners.winDate,
        voteCount: dailyWinners.voteCount,
        createdAt: dailyWinners.createdAt,
        projectTableId: projects.id,
        projectTitle: projects.title,
        projectDescription: projects.description,
        projectImage: projects.image,
        projectTechnologies: projects.technologies,
        projectLiveUrl: projects.liveUrl,
        projectGithubUrl: projects.githubUrl,
        projectVotes: projects.votes,
        projectFeatures: projects.features,
        projectLongDescription: projects.longDescription,
        projectCreatedAt: projects.createdAt,
        projectUpdatedAt: projects.updatedAt,
        projectAuthorId: projects.authorId,
        authorId: users.id,
        authorName: users.name,
        authorAvatar: users.avatar,
        authorBio: users.bio,
        authorLocation: users.location,
        authorJoinedDate: users.joinedDate,
        authorExperience: users.experience,
        authorWebsite: users.website,
        authorGithub: users.github,
        authorTwitter: users.twitter,
        authorSkills: users.skills,
        authorProjects: users.projects,
        authorFollowers: users.followers,
        authorFollowing: users.following,
        authorCreatedAt: users.createdAt,
        authorUpdatedAt: users.updatedAt,
      })
      .from(dailyWinners)
      .innerJoin(projects, eq(dailyWinners.projectId, projects.id))
      .innerJoin(users, eq(projects.authorId, users.id))
      .orderBy(desc(dailyWinners.winDate));

    // Transform the data to match the expected interface
    const formattedWinners: DailyWinnerWithProject[] = winners.map(
      (winner) => ({
        id: winner.id,
        projectId: winner.projectId,
        winDate: winner.winDate,
        voteCount: winner.voteCount,
        createdAt: winner.createdAt,
        project: {
          id: winner.projectTableId,
          title: winner.projectTitle,
          description: winner.projectDescription,
          image: winner.projectImage,
          authorId: winner.projectAuthorId,
          technologies: winner.projectTechnologies,
          liveUrl: winner.projectLiveUrl,
          githubUrl: winner.projectGithubUrl,
          votes: winner.projectVotes,
          features: winner.projectFeatures,
          longDescription: winner.projectLongDescription,
          createdAt: winner.projectCreatedAt,
          updatedAt: winner.projectUpdatedAt,
          author: {
            id: winner.authorId,
            name: winner.authorName,
            avatar: winner.authorAvatar,
            bio: winner.authorBio,
            location: winner.authorLocation,
            joinedDate: winner.authorJoinedDate,
            experience: winner.authorExperience,
            website: winner.authorWebsite,
            github: winner.authorGithub,
            twitter: winner.authorTwitter,
            skills: winner.authorSkills,
            projects: winner.authorProjects,
            followers: winner.authorFollowers,
            following: winner.authorFollowing,
            createdAt: winner.authorCreatedAt,
            updatedAt: winner.authorUpdatedAt,
          },
        },
      })
    );

    return NextResponse.json({
      success: true,
      data: formattedWinners,
    });
  } catch (error) {
    console.error("Error fetching daily winners:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch daily winners",
      },
      { status: 500 }
    );
  }
}
