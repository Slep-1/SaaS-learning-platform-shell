import type { OrgRole } from '@/types/Auth';
import { and, asc, eq, isNull, sql } from 'drizzle-orm';
import { db } from '@/libs/DB';
import { lessonAssignmentSchema, lessonSchema } from '@/models/Schema';
import { ORG_ROLE } from '@/types/Auth';

export type LessonSummary = {
  id: number;
  title: string;
  description: string;
};

export async function getLessonsForRole(orgId: string, role: OrgRole, userId: string) {
  if (role === ORG_ROLE.LEARNER) {
    return db
      .select({
        id: lessonSchema.id,
        title: lessonSchema.title,
        description: lessonSchema.description,
      })
      .from(lessonSchema)
      .innerJoin(lessonAssignmentSchema, eq(lessonAssignmentSchema.lessonId, lessonSchema.id))
      .where(and(
        eq(lessonSchema.orgId, orgId),
        eq(lessonAssignmentSchema.learnerUserId, userId),
      ));
  }

  return db
    .select({
      id: lessonSchema.id,
      title: lessonSchema.title,
      description: lessonSchema.description,
    })
    .from(lessonSchema)
    .where(eq(lessonSchema.orgId, orgId));
}

export async function getLessonById(orgId: string, id: number, role: OrgRole, userId: string) {
  const [lesson] = await db
    .select()
    .from(lessonSchema)
    .where(and(eq(lessonSchema.orgId, orgId), eq(lessonSchema.id, id)))
    .limit(1);

  if (!lesson) {
    return null;
  }

  if (role === ORG_ROLE.LEARNER) {
    const [assignment] = await db
      .select({ id: lessonAssignmentSchema.id })
      .from(lessonAssignmentSchema)
      .where(and(
        eq(lessonAssignmentSchema.lessonId, id),
        eq(lessonAssignmentSchema.learnerUserId, userId),
      ))
      .limit(1);

    if (!assignment) {
      return null;
    }
  }

  return lesson;
}

export type AssignmentRow = {
  id: number;
  lessonId: number;
  lessonTitle: string;
  learnerUserId: string;
  dueDate: Date | null;
  startedAt: Date | null;
  midpointAt: Date | null;
  completedAt: Date | null;
};

export type LearnerPriorityAssignment = {
  assignmentId: number;
  lessonId: number;
  lessonTitle: string;
  lessonDescription: string;
  dueDate: Date | null;
  startedAt: Date | null;
  midpointAt: Date | null;
  completedAt: Date | null;
  score: number | null;
};

export async function getLearnerPriorityAssignments(orgId: string, learnerUserId: string): Promise<LearnerPriorityAssignment[]> {
  return db
    .select({
      assignmentId: lessonAssignmentSchema.id,
      lessonId: lessonAssignmentSchema.lessonId,
      lessonTitle: lessonSchema.title,
      lessonDescription: lessonSchema.description,
      dueDate: lessonAssignmentSchema.dueDate,
      startedAt: lessonAssignmentSchema.startedAt,
      midpointAt: lessonAssignmentSchema.midpointAt,
      completedAt: lessonAssignmentSchema.completedAt,
      score: lessonAssignmentSchema.score,
    })
    .from(lessonAssignmentSchema)
    .innerJoin(lessonSchema, eq(lessonSchema.id, lessonAssignmentSchema.lessonId))
    .where(and(
      eq(lessonAssignmentSchema.orgId, orgId),
      eq(lessonSchema.orgId, orgId),
      eq(lessonAssignmentSchema.learnerUserId, learnerUserId),
    ))
    .orderBy(
      asc(sql`case when ${lessonAssignmentSchema.completedAt} is null then 0 else 1 end`),
      asc(isNull(lessonAssignmentSchema.dueDate)),
      asc(lessonAssignmentSchema.dueDate),
      asc(lessonAssignmentSchema.createdAt),
    );
}

export async function getAssignmentsForOrg(orgId: string): Promise<AssignmentRow[]> {
  return db
    .select({
      id: lessonAssignmentSchema.id,
      lessonId: lessonAssignmentSchema.lessonId,
      lessonTitle: lessonSchema.title,
      learnerUserId: lessonAssignmentSchema.learnerUserId,
      dueDate: lessonAssignmentSchema.dueDate,
      startedAt: lessonAssignmentSchema.startedAt,
      midpointAt: lessonAssignmentSchema.midpointAt,
      completedAt: lessonAssignmentSchema.completedAt,
    })
    .from(lessonAssignmentSchema)
    .innerJoin(lessonSchema, eq(lessonSchema.id, lessonAssignmentSchema.lessonId))
    .where(eq(lessonAssignmentSchema.orgId, orgId));
}
