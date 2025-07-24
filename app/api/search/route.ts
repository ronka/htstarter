import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../db";
import { projects, users } from "../../../db/schema";
import { eq, desc, asc, like, and, or, inArray, sql } from "drizzle-orm";
import { z } from "zod";

// Validation schema for search parameters
const searchParamsSchema = z.object({
  q: z.string().nullable().optional(), // search query
  filters: z.string().nullable().optional(), // comma-separated technology filters
  page: z
    .string()
    .nullable()
    .optional()
    .transform((val) => (val ? parseInt(val) : 1)),
  limit: z
    .string()
    .nullable()
    .optional()
    .transform((val) => (val ? parseInt(val) : 10)),
  sortBy: z.enum(["createdAt", "votes", "title"]).nullable().optional(),
  sortOrder: z.enum(["asc", "desc"]).nullable().optional(),
});

// GET /api/search
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse and validate search parameters
    const validatedParams = searchParamsSchema.parse({
      q: searchParams.get("q"),
      filters: searchParams.get("filters"),
      page: searchParams.get("page"),
      limit: searchParams.get("limit"),
      sortBy: searchParams.get("sortBy"),
      sortOrder: searchParams.get("sortOrder"),
    });

    const {
      q: searchQuery,
      filters: technologyFilters,
      page,
      limit,
      sortBy,
      sortOrder,
    } = validatedParams;

    // Set defaults for nullable values
    const finalPage = page || 1;
    const finalLimit = limit || 10;
    const finalSortBy = sortBy || "createdAt";
    const finalSortOrder = sortOrder || "desc";

    const offset = (finalPage - 1) * finalLimit;

    // Build where conditions
    const whereConditions = [];

    // Search by project name or description
    if (searchQuery && searchQuery.trim()) {
      const searchTerm = `%${searchQuery.trim()}%`;
      whereConditions.push(
        or(
          like(projects.title, searchTerm),
          like(projects.description, searchTerm),
          like(projects.longDescription, searchTerm)
        )
      );
    }

    // Filter by technologies
    if (technologyFilters) {
      const techArray = technologyFilters
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean);
      if (techArray.length > 0) {
        // Use JSONB containment operator to check if any of the project's technologies
        // match the provided filters
        whereConditions.push(
          or(
            ...techArray.map(
              (tech) =>
                // Check if the technology array contains the specific tech
                // Using SQL template for JSONB containment
                sql`${projects.technologies} ? ${tech}`
            )
          )
        );
      }
    }

    // Build order by
    let orderBy;
    switch (finalSortBy) {
      case "votes":
        orderBy =
          finalSortOrder === "asc" ? asc(projects.votes) : desc(projects.votes);
        break;
      case "title":
        orderBy =
          finalSortOrder === "asc" ? asc(projects.title) : desc(projects.title);
        break;
      default:
        orderBy =
          finalSortOrder === "asc"
            ? asc(projects.createdAt)
            : desc(projects.createdAt);
    }

    // Get projects with author info
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
        longDescription: projects.longDescription,
        createdAt: projects.createdAt,
        updatedAt: projects.updatedAt,
        author: {
          id: users.id,
          name: users.name,
          avatar: users.avatar,
        },
      })
      .from(projects)
      .leftJoin(users, eq(projects.authorId, users.id))
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
      .orderBy(orderBy)
      .limit(finalLimit)
      .offset(offset);

    // Get total count for pagination
    const totalCount = await db
      .select({ count: projects.id })
      .from(projects)
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined);

    const total = totalCount.length;

    return NextResponse.json({
      success: true,
      data: projectsData,
      pagination: {
        page: finalPage,
        limit: finalLimit,
        total,
        totalPages: Math.ceil(total / finalLimit),
      },
      search: {
        query: searchQuery,
        filters: technologyFilters
          ? technologyFilters.split(",").map((tech) => tech.trim())
          : [],
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid search parameters",
          details: error.errors,
        },
        { status: 400 }
      );
    }

    console.error("Error searching projects:", error);
    return NextResponse.json(
      { success: false, error: "Failed to search projects" },
      { status: 500 }
    );
  }
}
