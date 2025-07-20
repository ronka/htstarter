-- Add the new long_description column
ALTER TABLE "projects" ADD COLUMN "long_description" text;

-- Migrate existing data by combining tech_details and challenges
UPDATE "projects" 
SET "long_description" = CASE 
    WHEN "tech_details" IS NOT NULL AND "challenges" IS NOT NULL 
    THEN "tech_details" || E'\n\n' || "challenges"
    WHEN "tech_details" IS NOT NULL 
    THEN "tech_details"
    WHEN "challenges" IS NOT NULL 
    THEN "challenges"
    ELSE NULL
END;

-- Drop the old columns
ALTER TABLE "projects" DROP COLUMN "tech_details";
ALTER TABLE "projects" DROP COLUMN "challenges";