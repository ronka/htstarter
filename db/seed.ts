import { db } from "./index";
import { users, projects, dailyWinners } from "./schema";
import { mockUsers, mockProjects } from "../data/mockData";

async function seed() {
  try {
    console.log("🌱 Starting database seeding...");

    // Clear existing data
    console.log("🗑️  Clearing existing data...");
    await db.delete(dailyWinners);
    await db.delete(projects);
    await db.delete(users);

    // Seed users
    console.log("👥 Seeding users...");
    const userData = mockUsers.map((user) => ({
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      bio: user.bio,
      location: user.location,
      joinedDate: user.joinedDate,
      experience: user.experience,
      website: user.website,
      github: user.github,
      twitter: user.twitter,
      skills: user.skills,
      projects: user.projects,
      followers: user.followers,
      following: user.following,
    }));

    const insertedUsers = await db.insert(users).values(userData).returning();
    console.log(`✅ Inserted ${insertedUsers.length} users`);

    // Create user map for easy lookup
    const userMap = new Map(insertedUsers.map((user) => [user.id, user.id]));

    // Seed projects
    console.log("🚀 Seeding projects...");
    const projectData = mockProjects.map((project) => ({
      title: project.title,
      description: project.description,
      image: project.image,
      authorId: project.author.id,
      technologies: project.technologies,
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      votes: project.votes,
      features: project.features,
      longDescription: project.longDescription,
    }));

    const insertedProjects = await db
      .insert(projects)
      .values(projectData)
      .returning();
    console.log(`✅ Inserted ${insertedProjects.length} projects`);

    // Seed daily winners
    console.log("🏆 Seeding daily winners...");
    const today = new Date();
    const dailyWinnersData = [
      {
        projectId: insertedProjects[0].id,
        winDate: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000), // Yesterday
        voteCount: 45,
      },
      {
        projectId: insertedProjects[1].id,
        winDate: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        voteCount: 38,
      },
      {
        projectId: insertedProjects[2].id,
        winDate: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        voteCount: 52,
      },
      {
        projectId: insertedProjects[3].id,
        winDate: new Date(today.getTime() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
        voteCount: 29,
      },
      {
        projectId: insertedProjects[4].id,
        winDate: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        voteCount: 41,
      },
      {
        projectId: insertedProjects[0].id,
        winDate: new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
        voteCount: 33,
      },
      {
        projectId: insertedProjects[1].id,
        winDate: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        voteCount: 47,
      },
    ];

    const insertedDailyWinners = await db
      .insert(dailyWinners)
      .values(dailyWinnersData)
      .returning();
    console.log(`✅ Inserted ${insertedDailyWinners.length} daily winners`);

    console.log("🎉 Database seeding completed successfully!");
    console.log(`📊 Summary:`);
    console.log(`   - ${insertedUsers.length} users`);
    console.log(`   - ${insertedProjects.length} projects`);
    console.log(`   - ${insertedDailyWinners.length} daily winners`);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

// Run the seed function
seed()
  .then(() => {
    console.log("✅ Seeding completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  });
