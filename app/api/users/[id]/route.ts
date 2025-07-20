import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../db";
import { users, projects } from "../../../../db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { requireAuth, isAuthorized } from "../../../../lib/auth";

// Validation schema for creating/updating a user
const userSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  bio: z.string().max(500).optional(),
  location: z.string().max(100).optional(),
  experience: z.string().max(2000).optional(), // Increased limit for JSON experience data
  website: z.string().url().optional(),
  github: z.string().optional(),
  twitter: z.string().optional(),
  skills: z.array(z.string()).optional(),
});

// GET /api/users/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: userId } = await params;

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

// POST /api/users/[id] - Create a new user
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const clerkUser = await requireAuth();
    const { id: userId } = await params;
    const body = await request.json();

    if (!isAuthorized(clerkUser.id, userId)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 403 }
      );
    }

    // Check if user already exists
    const existingUser = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (existingUser[0]) {
      return NextResponse.json(
        { success: false, error: "User already exists" },
        { status: 409 }
      );
    }

    // Validate input
    const validatedData = userSchema.parse(body);

    // Create new user
    const [newUser] = await db
      .insert(users)
      .values({
        id: userId,
        name: validatedData.name,
        bio: validatedData.bio || null,
        location: validatedData.location || null,
        experience: validatedData.experience || null,
        website: validatedData.website || null,
        github: validatedData.github || null,
        twitter: validatedData.twitter || null,
        skills: validatedData.skills || [],
        joinedDate: new Date().toISOString(),
      })
      .returning();

    return NextResponse.json(
      {
        success: true,
        data: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error creating user:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create user" },
      { status: 500 }
    );
  }
}

// PUT /api/users/[id] - Update existing user or create if doesn't exist
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const clerkUser = await requireAuth();
    const { id: userId } = await params;
    const body = await request.json();

    if (!isAuthorized(clerkUser.id, userId)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 403 }
      );
    }

    // Validate input
    const validatedData = userSchema.parse(body);

    // Check if user exists
    const existingUser = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    let result;

    if (existingUser[0]) {
      // Update existing user
      const [updatedUser] = await db
        .update(users)
        .set({
          ...validatedData,
          updatedAt: new Date(),
        })
        .where(eq(users.id, userId))
        .returning();

      result = updatedUser;
    } else {
      // Create new user
      const [newUser] = await db
        .insert(users)
        .values({
          id: userId,
          name: validatedData.name,
          bio: validatedData.bio || null,
          location: validatedData.location || null,
          experience: validatedData.experience || null,
          website: validatedData.website || null,
          github: validatedData.github || null,
          twitter: validatedData.twitter || null,
          skills: validatedData.skills || [],
          joinedDate: new Date().toISOString(),
        })
        .returning();

      result = newUser;
    }

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error updating/creating user:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update/create user" },
      { status: 500 }
    );
  }
}
