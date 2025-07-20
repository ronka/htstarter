CREATE TABLE "daily_winners" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"win_date" timestamp NOT NULL,
	"vote_count" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "daily_winners" ADD CONSTRAINT "daily_winners_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "daily_winners_win_date_idx" ON "daily_winners" USING btree ("win_date");--> statement-breakpoint
CREATE INDEX "daily_winners_project_win_date_idx" ON "daily_winners" USING btree ("project_id","win_date");