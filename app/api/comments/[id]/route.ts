import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../db";
import { comments, projects } from "../../../../db/schema";
import { eq } from "drizzle-orm";
import { requireAuth, isAuthorized } from "../../../../lib/auth";

// DELETE /api/comments/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth();
    const { id } = await params;
    const commentId = parseInt(id);

    if (isNaN(commentId)) {
      return NextResponse.json(
        { success: false, error: "Invalid comment ID" },
        { status: 400 }
      );
    }

    // Get the comment to check ownership and project
    const [comment] = await db
      .select()
      .from(comments)
      .where(eq(comments.id, commentId))
      .limit(1);

    if (!comment) {
      return NextResponse.json(
        { success: false, error: "Comment not found" },
        { status: 404 }
      );
    }

    if (!isAuthorized(user.id, comment.userId)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 403 }
      );
    }

    // Get the project to update comment count
    const [project] = await db
      .select()
      .from(projects)
      .where(eq(projects.id, comment.projectId))
      .limit(1);

    if (!project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    // Delete comment
    await db.delete(comments).where(eq(comments.id, commentId));

    // Update project comment count
    await db
      .update(projects)
      .set({ comments: Math.max(0, project.comments - 1) })
      .where(eq(projects.id, comment.projectId));

    return NextResponse.json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete comment" },
      { status: 500 }
    );
  }
}
