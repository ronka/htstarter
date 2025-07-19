import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../db";
import { votes, projects } from "../../../../../db/schema";
import { eq, and } from "drizzle-orm";
import { requireAuth } from "../../../../../lib/auth";

// POST /api/projects/[id]/vote
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const projectId = parseInt(params.id);

    if (isNaN(projectId)) {
      return NextResponse.json(
        { success: false, error: "Invalid project ID" },
        { status: 400 }
      );
    }

    // Check if project exists
    const [project] = await db
      .select()
      .from(projects)
      .where(eq(projects.id, projectId))
      .limit(1);

    if (!project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    // Check if user already voted
    const existingVote = await db
      .select()
      .from(votes)
      .where(and(eq(votes.userId, user.id), eq(votes.projectId, projectId)))
      .limit(1);

    if (existingVote[0]) {
      return NextResponse.json(
        { success: false, error: "User already voted for this project" },
        { status: 400 }
      );
    }

    // Create vote
    await db.insert(votes).values({
      userId: user.id,
      projectId: projectId,
    });

    // Update project vote count
    await db
      .update(projects)
      .set({ votes: project.votes + 1 })
      .where(eq(projects.id, projectId));

    return NextResponse.json({
      success: true,
      message: "Vote added successfully",
    });
  } catch (error) {
    console.error("Error adding vote:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add vote" },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[id]/vote
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const projectId = parseInt(params.id);

    if (isNaN(projectId)) {
      return NextResponse.json(
        { success: false, error: "Invalid project ID" },
        { status: 400 }
      );
    }

    // Check if project exists
    const [project] = await db
      .select()
      .from(projects)
      .where(eq(projects.id, projectId))
      .limit(1);

    if (!project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    // Check if user has voted
    const existingVote = await db
      .select()
      .from(votes)
      .where(and(eq(votes.userId, user.id), eq(votes.projectId, projectId)))
      .limit(1);

    if (!existingVote[0]) {
      return NextResponse.json(
        { success: false, error: "User has not voted for this project" },
        { status: 400 }
      );
    }

    // Remove vote
    await db
      .delete(votes)
      .where(and(eq(votes.userId, user.id), eq(votes.projectId, projectId)));

    // Update project vote count
    await db
      .update(projects)
      .set({ votes: Math.max(0, project.votes - 1) })
      .where(eq(projects.id, projectId));

    return NextResponse.json({
      success: true,
      message: "Vote removed successfully",
    });
  } catch (error) {
    console.error("Error removing vote:", error);
    return NextResponse.json(
      { success: false, error: "Failed to remove vote" },
      { status: 500 }
    );
  }
}
