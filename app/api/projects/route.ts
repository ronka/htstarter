import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../db";
import { projects, users, categories } from "../../../db/schema";
import { eq, desc, asc, like, and } from "drizzle-orm";
import { z } from "zod";
import { requireAuth } from "../../../lib/auth";

// Validation schema for creating a project
const createProjectSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().min(1, "Description is required").max(2000),
  image: z.string().url().optional(),
  technologies: z.array(z.string()).optional(),
  categoryId: z.number().optional(),
  liveUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  features: z.array(z.string()).optional(),
  techDetails: z.string().optional(),
  challenges: z.string().optional(),
});

// GET /api/projects
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const authorId = searchParams.get("authorId");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const offset = (page - 1) * limit;

    // Build where conditions
    const whereConditions = [];
    if (category) {
      whereConditions.push(eq(categories.slug, category));
    }
    if (search) {
      whereConditions.push(like(projects.title, `%${search}%`));
    }
    if (authorId) {
      whereConditions.push(eq(projects.authorId, authorId));
    }

    // Build order by
    let orderBy;
    switch (sortBy) {
      case "votes":
        orderBy =
          sortOrder === "asc" ? asc(projects.votes) : desc(projects.votes);
        break;
      case "title":
        orderBy =
          sortOrder === "asc" ? asc(projects.title) : desc(projects.title);
        break;
      default:
        orderBy =
          sortOrder === "asc"
            ? asc(projects.createdAt)
            : desc(projects.createdAt);
    }

    // Get projects with author and category info
    const projectsData = await db
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
        },
        category: {
          id: categories.id,
          name: categories.name,
          slug: categories.slug,
        },
      })
      .from(projects)
      .leftJoin(users, eq(projects.authorId, users.id))
      .leftJoin(categories, eq(projects.categoryId, categories.id))
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);

    // Get total count for pagination
    const totalCount = await db
      .select({ count: projects.id })
      .from(projects)
      .leftJoin(categories, eq(projects.categoryId, categories.id))
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined);

    const total = totalCount.length;

    return NextResponse.json({
      success: true,
      data: projectsData,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST /api/projects
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await request.json();

    // Validate input
    const validatedData = createProjectSchema.parse(body);

    // Create project
    const [newProject] = await db
      .insert(projects)
      .values({
        title: validatedData.title,
        description: validatedData.description,
        image: validatedData.image,
        technologies: validatedData.technologies,
        categoryId: validatedData.categoryId,
        liveUrl: validatedData.liveUrl,
        githubUrl: validatedData.githubUrl,
        features: validatedData.features,
        techDetails: validatedData.techDetails,
        challenges: validatedData.challenges,
        authorId: user.id,
      })
      .returning();

    return NextResponse.json(
      { success: true, data: newProject },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error creating project:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create project" },
      { status: 500 }
    );
  }
}
