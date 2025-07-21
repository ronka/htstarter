// @jest-environment node
import { GET } from "./route";
import { db } from "@/db/index";
import { NextRequest } from "next/server";

jest.mock("@/db/index", () => ({
  db: {
    select: jest.fn(),
    insert: jest.fn().mockReturnThis(),
    values: jest.fn().mockReturnThis(),
    onConflictDoNothing: jest.fn().mockResolvedValue(undefined),
  },
}));

const mockRequest = (userAgent: string) =>
  ({
    headers: {
      get: (key: string) => (key === "user-agent" ? userAgent : undefined),
    },
  } as unknown as NextRequest);

describe("GET /api/cron/daily-winner", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns 401 if not called by Vercel Cron", async () => {
    const req = mockRequest("not-vercel");
    const res = await GET(req);
    expect(res.status).toBe(401);
  });

  it("selects a random project if no votes", async () => {
    // Mock the votes query chain to return []
    (db.select as jest.Mock).mockImplementationOnce(() => ({
      from: () => ({
        where: () => ({
          groupBy: () => [],
        }),
      }),
    }));
    // Mock the allProjects query chain to return [{ id: 42 }]
    (db.select as jest.Mock).mockImplementationOnce(() => ({
      from: () => [{ id: 42 }],
    }));

    const req = mockRequest("vercel-cron/1.0");
    const res = await GET(req);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.winners[0].projectId).toBe(42);
    expect(json.winners[0].voteCount).toBe(0);
  });

  it("selects the project with the most votes", async () => {
    // Mock the votes query chain to return two projects
    (db.select as jest.Mock).mockImplementationOnce(() => ({
      from: () => ({
        where: () => ({
          groupBy: () => [
            { projectId: 1, voteCount: 5 },
            { projectId: 2, voteCount: 3 },
          ],
        }),
      }),
    }));

    const req = mockRequest("vercel-cron/1.0");
    const res = await GET(req);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.winners).toEqual([{ projectId: 1, voteCount: 5 }]);
  });

  it("handles a tie between projects", async () => {
    // Mock the votes query chain to return a tie
    (db.select as jest.Mock).mockImplementationOnce(() => ({
      from: () => ({
        where: () => ({
          groupBy: () => [
            { projectId: 1, voteCount: 5 },
            { projectId: 2, voteCount: 5 },
          ],
        }),
      }),
    }));

    const req = mockRequest("vercel-cron/1.0");
    const res = await GET(req);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.winners).toEqual([
      { projectId: 1, voteCount: 5 },
      { projectId: 2, voteCount: 5 },
    ]);
  });
});
