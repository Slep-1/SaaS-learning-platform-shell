import type { OrgPermission, OrgRole } from '@/types/Auth';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { cookies } from 'next/headers';
import { ORG_PERMISSION, ORG_ROLE, ROLE_PERMISSIONS } from '@/types/Auth';

// Only ever set by `startViewAsAction` (src/features/dashboard/actions.ts) after it has
// verified the actor has VIEW_AS_LEARNER and the target is a learner in the same org.
export const VIEW_AS_COOKIE_NAME = 'view_as_learner';

export function roleHasPermission(role: OrgRole, permission: OrgPermission): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}

export function encodeViewAsCookie(orgId: string, learnerUserId: string) {
  return `${orgId}:${learnerUserId}`;
}

function parseViewAsCookie(rawCookie: string | undefined, orgId: string): string | null {
  if (!rawCookie) {
    return null;
  }

  const [cookieOrgId, learnerUserId] = rawCookie.split(':');

  return cookieOrgId === orgId && learnerUserId ? learnerUserId : null;
}

/**
 * Pure, runtime-agnostic role resolution shared by `getEffectiveAuth()` (Server
 * Components/Actions, reads the cookie via `next/headers`) and `proxy.ts` (middleware, reads
 * the cookie via `NextRequest.cookies` since `next/headers` isn't available there) — this is
 * what keeps preview-mode gating consistent between the two runtimes without duplicating the
 * actual decision logic.
 */
export function resolveEffectiveRole(realRole: OrgRole, rawViewAsCookie: string | undefined, orgId: string): OrgRole {
  const learnerUserId = parseViewAsCookie(rawViewAsCookie, orgId);

  if (learnerUserId && roleHasPermission(realRole, ORG_PERMISSION.VIEW_AS_LEARNER)) {
    return ORG_ROLE.LEARNER;
  }

  return realRole;
}

export type EffectiveAuthContext = {
  userId: string;
  orgId: string;
  role: OrgRole;
  isPreviewing: boolean;
  previewLearner: { id: string; name: string } | null;
};

/**
 * The single source of truth for "who is acting, and with what role" — every authorization
 * decision (nav visibility, page/layout gating, Server Action permission checks, library
 * scoping) should go through this instead of reading `auth()` directly, so "view as learner"
 * preview mode is respected everywhere automatically rather than needing to be special-cased
 * per call site.
 */
export async function getEffectiveAuth(): Promise<EffectiveAuthContext | null> {
  const { userId, orgId, orgRole } = await auth();

  if (!userId || !orgId || !orgRole) {
    return null;
  }

  const realRole = orgRole as OrgRole;
  const cookieStore = await cookies();
  const rawCookie = cookieStore.get(VIEW_AS_COOKIE_NAME)?.value;
  const learnerUserId = parseViewAsCookie(rawCookie, orgId);

  if (learnerUserId && roleHasPermission(realRole, ORG_PERMISSION.VIEW_AS_LEARNER)) {
    try {
      const client = await clerkClient();
      const learner = await client.users.getUser(learnerUserId);

      return {
        userId: learnerUserId,
        orgId,
        role: ORG_ROLE.LEARNER,
        isPreviewing: true,
        previewLearner: {
          id: learnerUserId,
          name: learner.fullName ?? learner.username ?? learner.primaryEmailAddress?.emailAddress ?? 'Learner',
        },
      };
    } catch {
      // Stale/invalid cookie (e.g. the learner was removed) — fall back to the real identity.
    }
  }

  return {
    userId,
    orgId,
    role: realRole,
    isPreviewing: false,
    previewLearner: null,
  };
}
