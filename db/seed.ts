import { db } from "./index";
import { users, categories, projects } from "./schema";
import { mockUsers, mockProjects } from "../data/mockData";

async function seed() {
  try {
    console.log("🌱 Starting database seeding...");

    // Clear existing data
    console.log("🗑️  Clearing existing data...");
    await db.delete(projects);
    await db.delete(users);
    await db.delete(categories);

    // Seed categories
    console.log("📂 Seeding categories...");
    const categoryData = [
      {
        name: "Lovable",
        slug: "lovable",
        description: "Projects that make you fall in love with them",
      },
      {
        name: "Cursor",
        slug: "cursor",
        description: "Projects built with Cursor IDE",
      },
      {
        name: "Chef",
        slug: "chef",
        description: "Cooking and recipe related projects",
      },
      {
        name: "Convex",
        slug: "convex",
        description: "Projects using Convex backend",
      },
      {
        name: "Bolt",
        slug: "bolt",
        description: "Fast and efficient projects",
      },
      {
        name: "Replit",
        slug: "replit",
        description: "Projects built on Replit",
      },
    ];

    const insertedCategories = await db
      .insert(categories)
      .values(categoryData)
      .returning();
    console.log(`✅ Inserted ${insertedCategories.length} categories`);

    // Create category map for easy lookup
    const categoryMap = new Map(
      insertedCategories.map((cat) => [cat.slug, cat.id])
    );

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
      categoryId: categoryMap.get(project.category),
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      votes: project.votes,

      features: project.features,
      techDetails: project.techDetails,
      challenges: project.challenges,
    }));

    const insertedProjects = await db
      .insert(projects)
      .values(projectData)
      .returning();
    console.log(`✅ Inserted ${insertedProjects.length} projects`);

    console.log("🎉 Database seeding completed successfully!");
    console.log(`📊 Summary:`);
    console.log(`   - ${insertedCategories.length} categories`);
    console.log(`   - ${insertedUsers.length} users`);
    console.log(`   - ${insertedProjects.length} projects`);
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
