'use server';

import type { OrgPermission } from '@/types/Auth';
import { and, eq, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getEffectiveAuth, roleHasPermission } from '@/libs/Auth';
import { db } from '@/libs/DB';
import { lessonAssignmentSchema, lessonSchema } from '@/models/Schema';
import { ORG_PERMISSION, ORG_ROLE } from '@/types/Auth';

const MAX_HTML_BYTES = 5 * 1024 * 1024; // 5MB

async function requirePermission(permission: OrgPermission) {
  const ctx = await getEffectiveAuth();

  if (!ctx || !roleHasPermission(ctx.role, permission)) {
    throw new Error('Not authorized');
  }

  return ctx;
}

function readHtmlFile(formData: FormData) {
  const file = formData.get('htmlFile');

  if (!(file instanceof File) || file.size === 0) {
    return null;
  }

  if (file.size > MAX_HTML_BYTES) {
    throw new Error('HTML file is too large (max 5MB)');
  }

  if (!file.name.toLowerCase().endsWith('.html') && file.type !== 'text/html') {
    throw new Error('File must be an .html file');
  }

  return file;
}

export async function createLessonAction(formData: FormData) {
  const ctx = await requirePermission(ORG_PERMISSION.MANAGE_CONTENT);

  const title = String(formData.get('title') ?? '').trim();
  const description = String(formData.get('description') ?? '').trim();
  const file = readHtmlFile(formData);

  if (!title || !description || !file) {
    throw new Error('Title, description, and an HTML file are required');
  }

  await db.insert(lessonSchema).values({
    orgId: ctx.orgId,
    title,
    description,
    htmlContent: await file.text(),
    createdBy: ctx.userId,
  });

  revalidatePath('/dashboard/library/admin');
  revalidatePath('/dashboard/library');
  redirect('/dashboard/library/admin');
}

export async function updateLessonAction(id: number, formData: FormData) {
  const ctx = await requirePermission(ORG_PERMISSION.MANAGE_CONTENT);

  const title = String(formData.get('title') ?? '').trim();
  const description = String(formData.get('description') ?? '').trim();
  const file = readHtmlFile(formData);

  if (!title || !description) {
    throw new Error('Title and description are required');
  }

  await db
    .update(lessonSchema)
    .set({
      title,
      description,
      ...(file ? { htmlContent: await file.text() } : {}),
    })
    .where(and(eq(lessonSchema.id, id), eq(lessonSchema.orgId, ctx.orgId)));

  revalidatePath('/dashboard/library/admin');
  revalidatePath(`/dashboard/library/${id}`);
  redirect('/dashboard/library/admin');
}

export async function deleteLessonAction(id: number) {
  const ctx = await requirePermission(ORG_PERMISSION.MANAGE_CONTENT);

  await db
    .delete(lessonSchema)
    .where(and(eq(lessonSchema.id, id), eq(lessonSchema.orgId, ctx.orgId)));

  revalidatePath('/dashboard/library/admin');
  revalidatePath('/dashboard/library');
}

export async function assignLessonAction(formData: FormData) {
  const ctx = await requirePermission(ORG_PERMISSION.ASSIGN_LESSONS);

  const lessonId = Number(formData.get('lessonId'));
  const learnerUserIds = formData.getAll('learnerUserIds').map(String).filter(Boolean);
  const dueDateRaw = String(formData.get('dueDate') ?? '').trim();
  const dueDate = dueDateRaw ? new Date(dueDateRaw) : null;

  if (!Number.isInteger(lessonId) || learnerUserIds.length === 0) {
    throw new Error('A lesson and at least one learner are required');
  }

  await db
    .insert(lessonAssignmentSchema)
    .values(learnerUserIds.map(learnerUserId => ({
      orgId: ctx.orgId,
      lessonId,
      learnerUserId,
      assignedBy: ctx.userId,
      dueDate,
    })))
    .onConflictDoUpdate({
      target: [lessonAssignmentSchema.lessonId, lessonAssignmentSchema.learnerUserId],
      set: { dueDate, assignedBy: ctx.userId },
    });

  revalidatePath('/dashboard/library/assignments');
}

export async function unassignLessonAction(assignmentId: number) {
  const ctx = await requirePermission(ORG_PERMISSION.ASSIGN_LESSONS);

  await db
    .delete(lessonAssignmentSchema)
    .where(and(eq(lessonAssignmentSchema.id, assignmentId), eq(lessonAssignmentSchema.orgId, ctx.orgId)));

  revalidatePath('/dashboard/library/assignments');
}

export async function updateAssignmentDueDateAction(assignmentId: number, formData: FormData) {
  const ctx = await requirePermission(ORG_PERMISSION.ASSIGN_LESSONS);

  const dueDateRaw = String(formData.get('dueDate') ?? '').trim();
  const dueDate = dueDateRaw ? new Date(dueDateRaw) : null;

  await db
    .update(lessonAssignmentSchema)
    .set({ dueDate })
    .where(and(eq(lessonAssignmentSchema.id, assignmentId), eq(lessonAssignmentSchema.orgId, ctx.orgId)));

  revalidatePath('/dashboard/library/assignments');
}

export async function recordLessonProgressAction(lessonId: number, hook: 'start' | 'midpoint' | 'finished', score?: number) {
  const ctx = await getEffectiveAuth();

  // Preview mode ("view as learner") never writes real progress data, and only a real Learner
  // has an assignment row of their own to update.
  if (!ctx || ctx.role !== ORG_ROLE.LEARNER || ctx.isPreviewing) {
    return;
  }

  const whereClause = and(
    eq(lessonAssignmentSchema.orgId, ctx.orgId),
    eq(lessonAssignmentSchema.lessonId, lessonId),
    eq(lessonAssignmentSchema.learnerUserId, ctx.userId),
  );

  if (hook === 'start') {
    await db
      .update(lessonAssignmentSchema)
      .set({ startedAt: sql`coalesce(${lessonAssignmentSchema.startedAt}, now())` })
      .where(whereClause);
  } else if (hook === 'midpoint') {
    await db
      .update(lessonAssignmentSchema)
      .set({ midpointAt: sql`coalesce(${lessonAssignmentSchema.midpointAt}, now())` })
      .where(whereClause);
  } else {
    const normalizedScore = typeof score === 'number' ? Math.max(0, Math.min(100, Math.round(score))) : undefined;

    await db
      .update(lessonAssignmentSchema)
      .set({
        completedAt: sql`coalesce(${lessonAssignmentSchema.completedAt}, now())`,
        ...(normalizedScore !== undefined ? { score: normalizedScore } : {}),
      })
      .where(whereClause);
  }

  revalidatePath('/dashboard/library/assignments');
}
