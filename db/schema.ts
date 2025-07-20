import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  boolean,
  jsonb,
  varchar,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Users table
export const users = pgTable("users", {
  id: text("id").primaryKey(), // Clerk user ID
  name: text("name").notNull(),
  avatar: text("avatar"),
  bio: text("bio"),
  location: text("location"),
  joinedDate: text("joined_date"),
  experience: text("experience"),
  website: text("website"),
  github: text("github"),
  twitter: text("twitter"),
  skills: jsonb("skills").$type<string[]>(),
  projects: integer("projects").default(0),
  followers: integer("followers").default(0),
  following: integer("following").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Categories table
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Projects table
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image"),
  authorId: text("author_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  technologies: jsonb("technologies").$type<string[]>(),
  categoryId: integer("category_id").references(() => categories.id),
  liveUrl: text("live_url"),
  githubUrl: text("github_url"),
  votes: integer("votes").default(0),
  features: jsonb("features").$type<string[]>(),
  techDetails: text("tech_details"),
  challenges: text("challenges"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Votes table
export const votes = pgTable(
  "votes",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    projectId: integer("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    userProjectIdx: index("votes_user_project_idx").on(
      table.userId,
      table.projectId
    ),
    projectCreatedIdx: index("votes_project_created_idx").on(
      table.projectId,
      table.createdAt
    ),
    userCreatedIdx: index("votes_user_created_idx").on(
      table.userId,
      table.createdAt
    ),
  })
);

// Comments table
export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  projectId: integer("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Daily Winners table
export const dailyWinners = pgTable(
  "daily_winners",
  {
    id: serial("id").primaryKey(),
    projectId: integer("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    winDate: timestamp("win_date").notNull(),
    voteCount: integer("vote_count").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    winDateIdx: index("daily_winners_win_date_idx").on(table.winDate),
    projectWinDateIdx: index("daily_winners_project_win_date_idx").on(
      table.projectId,
      table.winDate
    ),
  })
);

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  projects: many(projects),
  votes: many(votes),
  comments: many(comments),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  author: one(users, {
    fields: [projects.authorId],
    references: [users.id],
  }),
  category: one(categories, {
    fields: [projects.categoryId],
    references: [categories.id],
  }),
  votes: many(votes),
  comments: many(comments),
  dailyWinners: many(dailyWinners),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  projects: many(projects),
}));

export const votesRelations = relations(votes, ({ one }) => ({
  user: one(users, {
    fields: [votes.userId],
    references: [users.id],
  }),
  project: one(projects, {
    fields: [votes.projectId],
    references: [projects.id],
  }),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  user: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
  project: one(projects, {
    fields: [comments.projectId],
    references: [projects.id],
  }),
}));

export const dailyWinnersRelations = relations(dailyWinners, ({ one }) => ({
  project: one(projects, {
    fields: [dailyWinners.projectId],
    references: [projects.id],
  }),
}));

// TypeScript types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;

export type Vote = typeof votes.$inferSelect;
export type NewVote = typeof votes.$inferInsert;

export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;

export type DailyWinner = typeof dailyWinners.$inferSelect;
export type NewDailyWinner = typeof dailyWinners.$inferInsert;
