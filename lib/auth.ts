import { auth } from "@clerk/nextjs/server";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export async function getCurrentUser() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);
    return user[0] || null;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}

export async function getClerkUser() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  return { id: userId };
}

export async function createUserIfNotExists(clerkUser: any) {
  if (!clerkUser?.id) {
    throw new Error("Invalid user data");
  }

  try {
    // Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.id, clerkUser.id))
      .limit(1);

    if (existingUser[0]) {
      return existingUser[0];
    }

    // Create new user
    const newUser = {
      id: clerkUser.id,
      name:
        clerkUser.firstName && clerkUser.lastName
          ? `${clerkUser.firstName} ${clerkUser.lastName}`
          : clerkUser.username || "Anonymous",
      avatar: clerkUser.imageUrl,
      bio: "",
      location: "",
      joinedDate: new Date().toLocaleDateString("he-IL", {
        year: "numeric",
        month: "long",
      }),
      experience: "",
      website: "",
      github: "",
      twitter: "",
      skills: [],
      projects: 0,
      followers: 0,
      following: 0,
    };

    const [createdUser] = await db.insert(users).values(newUser).returning();
    return createdUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function requireAuth() {
  const clerkUser = await getClerkUser();

  if (!clerkUser) {
    throw new Error("Authentication required");
  }

  return clerkUser;
}

export async function requireExistingUser() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User not found in database");
  }

  return user;
}

export function isAuthorized(userId: string, resourceUserId: string) {
  return userId === resourceUserId;
}
