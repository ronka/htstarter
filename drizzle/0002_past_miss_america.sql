CREATE INDEX "votes_user_project_idx" ON "votes" USING btree ("user_id","project_id");--> statement-breakpoint
CREATE INDEX "votes_project_created_idx" ON "votes" USING btree ("project_id","created_at");--> statement-breakpoint
CREATE INDEX "votes_user_created_idx" ON "votes" USING btree ("user_id","created_at");