ALTER TABLE "categories" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "categories" CASCADE;--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN "category_id";