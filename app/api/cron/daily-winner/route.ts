import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/index";
import { votes, projects, dailyWinners } from "@/db/schema";
import { eq, and, gte, lt, desc, sql } from "drizzle-orm";

// Helper to get UTC midnight for a date
const getUTCMidnight = (date: Date) => {
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
};

export const GET = async (req: NextRequest) => {
  // Security: Only allow Vercel Cron
  if (req.headers.get("user-agent") !== "vercel-cron/1.0") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Calculate previous day UTC range
  const now = new Date();
  const todayMidnight = getUTCMidnight(now);
  const yesterdayMidnight = new Date(
    todayMidnight.getTime() - 24 * 60 * 60 * 1000
  );

  // Query: votes per project for yesterday
  const voteResults = await db
    .select({
      projectId: votes.projectId,
      voteCount: sql`COUNT(*)`.as("voteCount"),
    })
    .from(votes)
    .where(
      and(
        gte(votes.createdAt, yesterdayMidnight),
        lt(votes.createdAt, todayMidnight)
      )
    )
    .groupBy(votes.projectId);

  let winners: { projectId: number; voteCount: number }[] = [];

  if (voteResults.length > 0) {
    // Find max vote count
    const maxVotes = Math.max(...voteResults.map((v) => Number(v.voteCount)));
    // All projects with max votes (handle tie)
    winners = voteResults
      .filter((v) => Number(v.voteCount) === maxVotes)
      .map((v) => ({
        projectId: v.projectId,
        voteCount: Number(v.voteCount),
      }));
  } else {
    // No votes: pick one random project
    const allProjects = await db.select().from(projects);
    if (allProjects.length === 0) {
      return NextResponse.json({ error: "No projects found" }, { status: 404 });
    }
    const randomIdx = Math.floor(Math.random() * allProjects.length);
    winners = [{ projectId: allProjects[randomIdx].id, voteCount: 0 }];
  }

  // Insert winners into dailyWinners
  const winDate = yesterdayMidnight;
  for (const winner of winners) {
    // Avoid duplicate for same day/project
    await db
      .insert(dailyWinners)
      .values({
        projectId: winner.projectId,
        winDate,
        voteCount: winner.voteCount,
      })
      .onConflictDoNothing();
  }

  return NextResponse.json({ success: true, winners });
};
