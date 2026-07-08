'use server';

import type { OrgRole } from '@/types/Auth';
import { clerkClient } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { encodeViewAsCookie, getEffectiveAuth, roleHasPermission, VIEW_AS_COOKIE_NAME } from '@/libs/Auth';
import { Env } from '@/libs/Env';
import { ORG_PERMISSION, ORG_ROLE } from '@/types/Auth';
import { getBaseUrl } from '@/utils/Helpers';

const VIEW_AS_MAX_AGE_SECONDS = 60 * 60 * 4; // 4 hours — a safety net in case someone forgets to exit preview

export async function startViewAsAction(formData: FormData) {
  const ctx = await getEffectiveAuth();

  if (!ctx || ctx.isPreviewing || !roleHasPermission(ctx.role, ORG_PERMISSION.VIEW_AS_LEARNER)) {
    throw new Error('Not authorized');
  }

  const learnerUserId = String(formData.get('learnerUserId') ?? '');

  if (!learnerUserId) {
    throw new Error('Missing learner');
  }

  const client = await clerkClient();
  const memberships = await client.organizations.getOrganizationMembershipList({
    organizationId: ctx.orgId,
  });

  const membership = memberships.data.find(item => item.publicUserData?.userId === learnerUserId);

  if (!membership || membership.role !== ORG_ROLE.LEARNER) {
    throw new Error('Target is not a learner in this organization');
  }

  const cookieStore = await cookies();
  cookieStore.set(VIEW_AS_COOKIE_NAME, encodeViewAsCookie(ctx.orgId, learnerUserId), {
    httpOnly: true,
    sameSite: 'lax',
    secure: Env.NODE_ENV === 'production',
    maxAge: VIEW_AS_MAX_AGE_SECONDS,
    path: '/',
  });

  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function exitViewAsAction() {
  const cookieStore = await cookies();
  cookieStore.delete(VIEW_AS_COOKIE_NAME);

  revalidatePath('/dashboard');
  redirect('/dashboard');
}

const INVITABLE_ROLES: OrgRole[] = [ORG_ROLE.ADMIN, ORG_ROLE.COORDINATOR, ORG_ROLE.LEARNER];

export async function inviteMemberAction(formData: FormData) {
  const ctx = await getEffectiveAuth();

  // Org invitations are an org-management action — always Admin-only, regardless of permission
  // map entries, and never available while previewing as a learner.
  if (!ctx || ctx.isPreviewing || ctx.role !== ORG_ROLE.ADMIN) {
    throw new Error('Not authorized');
  }

  const emailAddress = String(formData.get('emailAddress') ?? '').trim();
  const role = String(formData.get('role') ?? '') as OrgRole;

  if (!emailAddress || !INVITABLE_ROLES.includes(role)) {
    throw new Error('A valid email address and role are required');
  }

  const client = await clerkClient();

  await client.organizations.createOrganizationInvitation({
    organizationId: ctx.orgId,
    emailAddress,
    role,
    inviterUserId: ctx.userId,
    // Without this, Clerk falls back to its own hosted accounts.dev portal instead of
    // returning the invited user to this app after they accept.
    redirectUrl: `${getBaseUrl()}/sign-up`,
  });

  revalidatePath('/dashboard/organization-profile/organization-members');
}
