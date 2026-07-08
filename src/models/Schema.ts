import { index, integer, pgTable, serial, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';

// This file defines the structure of your database tables using the Drizzle ORM.

// To modify the database schema:
// 1. Update this file with your desired changes.
// 2. Generate a new migration by running: `npm run db:generate`

// The generated migration file will reflect your schema changes.
// It automatically run the command `db-server:file`, which apply the migration before Next.js starts in development mode,
// Alternatively, if your database is running, you can run `npm run db:migrate` and there is no need to restart the server.

// Need a database for production? Check out https://get.neon.com/BMFYNtx
// Tested and compatible with SaaS Boilerplate

export const todoSchema = pgTable('todo', {
  id: serial('id').primaryKey(),
  ownerId: text('owner_id').notNull(),
  title: text('title').notNull(),
  message: text('message').notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

export const lessonSchema = pgTable('lesson', {
  id: serial('id').primaryKey(),
  orgId: text('org_id').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  htmlContent: text('html_content').notNull(),
  createdBy: text('created_by').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
}, table => [
  index('lesson_org_id_idx').on(table.orgId),
]);

export const lessonAssignmentSchema = pgTable('lesson_assignment', {
  id: serial('id').primaryKey(),
  orgId: text('org_id').notNull(),
  lessonId: integer('lesson_id').notNull().references(() => lessonSchema.id, { onDelete: 'cascade' }),
  learnerUserId: text('learner_user_id').notNull(),
  assignedBy: text('assigned_by').notNull(),
  dueDate: timestamp('due_date', { mode: 'date' }),
  startedAt: timestamp('started_at', { mode: 'date' }),
  midpointAt: timestamp('midpoint_at', { mode: 'date' }),
  completedAt: timestamp('completed_at', { mode: 'date' }),
  score: integer('score'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
}, table => [
  index('lesson_assignment_learner_idx').on(table.orgId, table.learnerUserId),
  uniqueIndex('lesson_assignment_lesson_learner_unique').on(table.lessonId, table.learnerUserId),
]);
