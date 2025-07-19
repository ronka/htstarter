import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../db";
import { comments, users, projects } from "../../../../../db/schema";
import { eq, desc } from "drizzle-orm";
import { z } from "zod";
import { requireAuth } from "../../../../../lib/auth";

// Validation schema for creating a comment
const createCommentSchema = z.object({
  content: z.string().min(1, "Comment content is required").max(1000),
});

// GET /api/projects/[id]/comments
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = parseInt(params.id);
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    if (isNaN(projectId)) {
      return NextResponse.json(
        { success: false, error: "Invalid project ID" },
        { status: 400 }
      );
    }

    const offset = (page - 1) * limit;

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

    // Get comments with user info
    const commentsData = await db
      .select({
        id: comments.id,
        content: comments.content,
        createdAt: comments.createdAt,
        updatedAt: comments.updatedAt,
        user: {
          id: users.id,
          name: users.name,
          avatar: users.avatar,
        },
      })
      .from(comments)
      .leftJoin(users, eq(comments.userId, users.id))
      .where(eq(comments.projectId, projectId))
      .orderBy(desc(comments.createdAt))
      .limit(limit)
      .offset(offset);

    // Get total count for pagination
    const totalCount = await db
      .select({ count: comments.id })
      .from(comments)
      .where(eq(comments.projectId, projectId));

    const total = totalCount.length;

    return NextResponse.json({
      success: true,
      data: commentsData,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

// POST /api/projects/[id]/comments
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const projectId = parseInt(params.id);
    const body = await request.json();

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

    // Validate input
    const validatedData = createCommentSchema.parse(body);

    // Create comment
    const [newComment] = await db
      .insert(comments)
      .values({
        content: validatedData.content,
        userId: user.id,
        projectId: projectId,
      })
      .returning();

    // Update project comment count
    await db
      .update(projects)
      .set({ comments: project.comments + 1 })
      .where(eq(projects.id, projectId));

    // Get the comment with user info
    const commentWithUser = await db
      .select({
        id: comments.id,
        content: comments.content,
        createdAt: comments.createdAt,
        updatedAt: comments.updatedAt,
        user: {
          id: users.id,
          name: users.name,
          avatar: users.avatar,
        },
      })
      .from(comments)
      .leftJoin(users, eq(comments.userId, users.id))
      .where(eq(comments.id, newComment.id))
      .limit(1);

    return NextResponse.json(
      { success: true, data: commentWithUser[0] },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error creating comment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
