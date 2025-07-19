import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../db";
import { categories } from "../../../db/schema";
import { asc } from "drizzle-orm";

// GET /api/categories
export async function GET(request: NextRequest) {
  try {
    const categoriesData = await db
      .select({
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
        description: categories.description,
      })
      .from(categories)
      .orderBy(asc(categories.name));

    return NextResponse.json({
      success: true,
      data: categoriesData,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
