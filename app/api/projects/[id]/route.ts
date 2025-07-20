import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../db";
import { projects, users, categories } from "../../../../db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { requireAuth, isAuthorized } from "../../../../lib/auth";

// Validation schema for updating a project
const updateProjectSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().min(1, "Description is required").max(2000),
  image: z
    .string()
    .optional()
    .refine((val) => !val || val === "" || /^https?:\/\/.+/.test(val), {
      message: "Image must be a valid URL or empty",
    }),
  technologies: z.array(z.string()),
  categoryId: z.number(),
  liveUrl: z.string().url("Live URL must be a valid URL"),
  githubUrl: z
    .string()
    .optional()
    .refine((val) => !val || val === "" || /^https?:\/\/.+/.test(val), {
      message: "GitHub URL must be a valid URL or empty",
    }),
  features: z.array(z.string()).optional(),
  techDetails: z.string().optional(),
  challenges: z.string().optional(),
});

// GET /api/projects/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const projectId = parseInt(id);

    if (isNaN(projectId)) {
      return NextResponse.json(
        { success: false, error: "Invalid project ID" },
        { status: 400 }
      );
    }

    const projectData = await db
      .select({
        id: projects.id,
        title: projects.title,
        description: projects.description,
        image: projects.image,
        technologies: projects.technologies,
        liveUrl: projects.liveUrl,
        githubUrl: projects.githubUrl,
        votes: projects.votes,

        features: projects.features,
        techDetails: projects.techDetails,
        challenges: projects.challenges,
        createdAt: projects.createdAt,
        updatedAt: projects.updatedAt,
        author: {
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
        },
        category: {
          id: categories.id,
          name: categories.name,
          slug: categories.slug,
          description: categories.description,
        },
      })
      .from(projects)
      .leftJoin(users, eq(projects.authorId, users.id))
      .leftJoin(categories, eq(projects.categoryId, categories.id))
      .where(eq(projects.id, projectId))
      .limit(1);

    if (!projectData[0]) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: projectData[0],
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

// PUT /api/projects/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth();
    const { id } = await params;
    const projectId = parseInt(id);
    const body = await request.json();

    console.log("PUT request body:", body);

    if (isNaN(projectId)) {
      return NextResponse.json(
        { success: false, error: "Invalid project ID" },
        { status: 400 }
      );
    }

    // Get the project to check ownership
    const [existingProject] = await db
      .select()
      .from(projects)
      .where(eq(projects.id, projectId))
      .limit(1);

    if (!existingProject) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    if (!isAuthorized(user.id, existingProject.authorId)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 403 }
      );
    }

    // Validate input
    let validatedData;
    try {
      validatedData = updateProjectSchema.parse(body);
      console.log("Validated data:", validatedData);
    } catch (validationError) {
      console.error("Validation error:", validationError);
      if (validationError instanceof z.ZodError) {
        return NextResponse.json(
          {
            success: false,
            error: "Validation error",
            details: validationError.errors,
          },
          { status: 400 }
        );
      }
      throw validationError;
    }

    // Update project
    const [updatedProject] = await db
      .update(projects)
      .set({
        ...validatedData,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, projectId))
      .returning();

    console.log("Updated project:", updatedProject);

    return NextResponse.json({
      success: true,
      data: updatedProject,
    });
  } catch (error) {
    console.error("Error updating project:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation error",
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth();
    const { id } = await params;
    const projectId = parseInt(id);

    if (isNaN(projectId)) {
      return NextResponse.json(
        { success: false, error: "Invalid project ID" },
        { status: 400 }
      );
    }

    // Get the project to check ownership
    const [existingProject] = await db
      .select()
      .from(projects)
      .where(eq(projects.id, projectId))
      .limit(1);

    if (!existingProject) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    if (!isAuthorized(user.id, existingProject.authorId)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 403 }
      );
    }

    // Delete project
    await db.delete(projects).where(eq(projects.id, projectId));

    // Update user's project count
    const [userData] = await db
      .select({ projects: users.projects })
      .from(users)
      .where(eq(users.id, existingProject.authorId))
      .limit(1);

    if (userData) {
      await db
        .update(users)
        .set({ projects: Math.max(0, userData.projects - 1) })
        .where(eq(users.id, existingProject.authorId));
    }

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
