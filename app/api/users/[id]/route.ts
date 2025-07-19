import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../db";
import { users, projects } from "../../../../db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { requireAuth, isAuthorized } from "../../../../lib/auth";

// Validation schema for updating a user
const updateUserSchema = z.object({
  name: z.string().min(1, "Name is required").max(100).optional(),
  bio: z.string().max(500).optional(),
  location: z.string().max(100).optional(),
  experience: z.string().max(100).optional(),
  website: z.string().url().optional(),
  github: z.string().url().optional(),
  twitter: z.string().url().optional(),
  skills: z.array(z.string()).optional(),
});

// GET /api/users/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;

    // Get user with their projects
    const userData = await db
      .select({
        id: users.id,
        name: users.name,
        avatar: users.avatar,
        bio: users.bio,
        location: users.location,
        joinedDate: users.joinedDate,
        experience: users.experience,
        website: users.website,
        github: users.github,
        twitter: users.twitter,
        skills: users.skills,
        projects: users.projects,
        followers: users.followers,
        following: users.following,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!userData[0]) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Get user's projects
    const userProjects = await db
      .select({
        id: projects.id,
        title: projects.title,
        description: projects.description,
        image: projects.image,
        technologies: projects.technologies,
        votes: projects.votes,
        comments: projects.comments,
        createdAt: projects.createdAt,
      })
      .from(projects)
      .where(eq(projects.authorId, userId))
      .orderBy(projects.createdAt);

    return NextResponse.json({
      success: true,
      data: {
        ...userData[0],
        userProjects,
      },
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

// PUT /api/users/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const userId = params.id;
    const body = await request.json();

    if (!isAuthorized(user.id, userId)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 403 }
      );
    }

    // Validate input
    const validatedData = updateUserSchema.parse(body);

    // Update user
    const [updatedUser] = await db
      .update(users)
      .set({
        ...validatedData,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error updating user:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update user" },
      { status: 500 }
    );
  }
}
