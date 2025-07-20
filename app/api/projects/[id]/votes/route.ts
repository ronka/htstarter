import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { votes, projects } from "@/db/schema";
import { eq, and, gte } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get authenticated user (optional)
    const { userId } = await auth();

    // Validate project ID
    const projectId = parseInt(params.id);
    if (isNaN(projectId)) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 }
      );
    }

    // Check if project exists
    const project = await db
      .select({ id: projects.id })
      .from(projects)
      .where(eq(projects.id, projectId))
      .limit(1);

    if (project.length === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Get today's date (start of day)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get vote counts and user vote status
    const [dailyVotes, totalVotes, userVote] = await Promise.all([
      // Count votes created today
      db
        .select({ count: votes.id })
        .from(votes)
        .where(
          and(eq(votes.projectId, projectId), gte(votes.createdAt, today))
        ),
      // Count total votes
      db
        .select({ count: votes.id })
        .from(votes)
        .where(eq(votes.projectId, projectId)),
      // Check if user has voted today (if authenticated)
      userId
        ? db
            .select({ id: votes.id })
            .from(votes)
            .where(
              and(
                eq(votes.userId, userId),
                eq(votes.projectId, projectId),
                gte(votes.createdAt, today)
              )
            )
            .limit(1)
        : Promise.resolve([]),
    ]);

    return NextResponse.json({
      success: true,
      dailyVotes: dailyVotes.length,
      totalVotes: totalVotes.length,
      hasVoted: userVote.length > 0,
      isAuthenticated: !!userId,
    });
  } catch (error) {
    console.error("Vote stats API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
