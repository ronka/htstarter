// Re-export database connection and types
export { db, testConnection } from "../db";
export type {
  User,
  NewUser,
  Project,
  NewProject,
  Vote,
  NewVote,
} from "../db/schema";

// Database utility functions
export async function getProjectWithAuthor(projectId: number) {
  const { db } = await import("../db");
  const { projects, users } = await import("../db/schema");
  const { eq } = await import("drizzle-orm");

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
      longDescription: projects.longDescription,
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
    })
    .from(projects)
    .leftJoin(users, eq(projects.authorId, users.id))
    .where(eq(projects.id, projectId))
    .limit(1);

  return projectData[0] || null;
}

export async function getUserWithProjects(userId: string) {
  const { db } = await import("../db");
  const { users, projects } = await import("../db/schema");
  const { eq } = await import("drizzle-orm");

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
    return null;
  }

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

  return {
    ...userData[0],
    userProjects,
  };
}

export async function getProjectsWithFilters(filters: {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
}) {
  const { db } = await import("../db");
  const { projects, users } = await import("../db/schema");
  const { eq, desc, asc, like, and } = await import("drizzle-orm");

  const {
    page = 1,
    limit = 10,
    search,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = filters;

  const offset = (page - 1) * limit;

  // Build where conditions
  const whereConditions = [];
  if (search) {
    whereConditions.push(like(projects.title, `%${search}%`));
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
    .limit(limit)
    .offset(offset);

  // Get total count for pagination
  const totalCount = await db
    .select({ count: projects.id })
    .from(projects)
    .where(whereConditions.length > 0 ? and(...whereConditions) : undefined);

  const total = totalCount.length;

  return {
    data: projectsData,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}
