import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../db";
import { projects, users, categories, votes } from "../../../../db/schema";
import { eq, desc, asc, like, and, gte, lt, sql } from "drizzle-orm";
import { z } from "zod";

// GET /api/projects/today
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

    // Get today's date range (start of day to end of day)
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );

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
        // Order by today's vote count
        orderBy =
          sortOrder === "asc"
            ? asc(sql`COALESCE(today_votes.count, 0)`)
            : desc(sql`COALESCE(today_votes.count, 0)`);
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

    // Get projects with today's vote count
    const projectsData = await db
      .select({
        id: projects.id,
        title: projects.title,
        description: projects.description,
        image: projects.image,
        technologies: projects.technologies,
        liveUrl: projects.liveUrl,
        githubUrl: projects.githubUrl,
        votes: projects.votes, // Keep original votes for backward compatibility
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
        todayVotes: sql<number>`COALESCE(today_votes.count, 0)`.as(
          "todayVotes"
        ),
      })
      .from(projects)
      .leftJoin(users, eq(projects.authorId, users.id))
      .leftJoin(categories, eq(projects.categoryId, categories.id))
      .leftJoin(
        db
          .select({
            projectId: votes.projectId,
            count: sql<number>`count(*)`.as("count"),
          })
          .from(votes)
          .where(
            and(gte(votes.createdAt, startOfDay), lt(votes.createdAt, endOfDay))
          )
          .groupBy(votes.projectId)
          .as("today_votes"),
        eq(projects.id, sql`today_votes.project_id`)
      )
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
    console.error("Error fetching today's projects:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch today's projects" },
      { status: 500 }
    );
  }
}
