CREATE TABLE "lesson_assignment" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" text NOT NULL,
	"lesson_id" integer NOT NULL,
	"learner_user_id" text NOT NULL,
	"assigned_by" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lesson" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"html_content" text NOT NULL,
	"created_by" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "lesson_assignment" ADD CONSTRAINT "lesson_assignment_lesson_id_lesson_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lesson"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "lesson_assignment_learner_idx" ON "lesson_assignment" USING btree ("org_id","learner_user_id");--> statement-breakpoint
CREATE INDEX "lesson_org_id_idx" ON "lesson" USING btree ("org_id");