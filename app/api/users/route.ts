import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../db";
import { users } from "../../../db/schema";
import { desc, asc, like } from "drizzle-orm";

// GET /api/users
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const offset = (page - 1) * limit;

    // Build where conditions
    const whereConditions = [];
    if (search) {
      whereConditions.push(like(users.name, `%${search}%`));
    }

    // Build order by
    let orderBy;
    switch (sortBy) {
      case "name":
        orderBy = sortOrder === "asc" ? asc(users.name) : desc(users.name);
        break;
      case "projects":
        orderBy =
          sortOrder === "asc" ? asc(users.projects) : desc(users.projects);
        break;
      case "followers":
        orderBy =
          sortOrder === "asc" ? asc(users.followers) : desc(users.followers);
        break;
      default:
        orderBy =
          sortOrder === "asc" ? asc(users.createdAt) : desc(users.createdAt);
    }

    // Get users
    const usersData = await db
      .select()
      .from(users)
      .where(whereConditions.length > 0 ? whereConditions[0] : undefined)
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);

    // Get total count for pagination
    const totalCount = await db
      .select({ count: users.id })
      .from(users)
      .where(whereConditions.length > 0 ? whereConditions[0] : undefined);

    const total = totalCount.length;

    return NextResponse.json({
      success: true,
      data: usersData,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
