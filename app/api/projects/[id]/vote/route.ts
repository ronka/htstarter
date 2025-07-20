import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { votes, projects } from "@/db/schema";
import { eq, and, gte, desc } from "drizzle-orm";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get authenticated user
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

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

    // Check if user has already voted today on this project
    const existingVote = await db
      .select({ id: votes.id })
      .from(votes)
      .where(
        and(
          eq(votes.userId, userId),
          eq(votes.projectId, projectId),
          gte(votes.createdAt, today)
        )
      )
      .limit(1);

    if (existingVote.length > 0) {
      // User has already voted today, remove the vote (toggle)
      await db.delete(votes).where(eq(votes.id, existingVote[0].id));

      // Get updated vote counts
      const [dailyVotes, totalVotes] = await Promise.all([
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
      ]);

      return NextResponse.json({
        success: true,
        hasVoted: false,
        dailyVotes: dailyVotes.length,
        totalVotes: totalVotes.length,
        action: "unvoted",
      });
    } else {
      // User hasn't voted today, create a new vote
      await db.insert(votes).values({
        userId,
        projectId,
      });

      // Get updated vote counts
      const [dailyVotes, totalVotes] = await Promise.all([
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
      ]);

      return NextResponse.json({
        success: true,
        hasVoted: true,
        dailyVotes: dailyVotes.length,
        totalVotes: totalVotes.length,
        action: "voted",
      });
    }
  } catch (error) {
    console.error("Vote API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
