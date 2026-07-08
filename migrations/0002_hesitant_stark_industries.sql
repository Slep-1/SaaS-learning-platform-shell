ALTER TABLE "lesson_assignment" ADD COLUMN "due_date" timestamp;--> statement-breakpoint
ALTER TABLE "lesson_assignment" ADD COLUMN "started_at" timestamp;--> statement-breakpoint
ALTER TABLE "lesson_assignment" ADD COLUMN "midpoint_at" timestamp;--> statement-breakpoint
ALTER TABLE "lesson_assignment" ADD COLUMN "completed_at" timestamp;--> statement-breakpoint
ALTER TABLE "lesson_assignment" ADD COLUMN "score" integer;--> statement-breakpoint
CREATE UNIQUE INDEX "lesson_assignment_lesson_learner_unique" ON "lesson_assignment" USING btree ("lesson_id","learner_user_id");