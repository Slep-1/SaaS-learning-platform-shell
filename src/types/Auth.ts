import type { EnumValues } from './Enum';

export const ORG_ROLE = {
  ADMIN: 'org:admin',
  COORDINATOR: 'org:coordinator',
  LEARNER: 'org:learner',
} as const;

export type OrgRole = EnumValues<typeof ORG_ROLE>;

export const ORG_PERMISSION = {
  MANAGE_CONTENT: 'app:content:manage',
  ASSIGN_LESSONS: 'app:lessons:assign',
  VIEW_PROGRESS: 'app:progress:view',
  VIEW_AS_LEARNER: 'app:learners:impersonate',
} as const;

export type OrgPermission = EnumValues<typeof ORG_PERMISSION>;

// Single source of truth for what each role can do. Checked via `roleHasPermission()`
// (src/libs/Auth.ts) against the *effective* role (which respects "view as learner" preview
// mode) rather than Clerk's own `auth().has()`, which always reflects the real session.
export const ROLE_PERMISSIONS: Record<OrgRole, OrgPermission[]> = {
  [ORG_ROLE.ADMIN]: [
    ORG_PERMISSION.MANAGE_CONTENT,
    ORG_PERMISSION.ASSIGN_LESSONS,
    ORG_PERMISSION.VIEW_PROGRESS,
    ORG_PERMISSION.VIEW_AS_LEARNER,
  ],
  [ORG_ROLE.COORDINATOR]: [
    ORG_PERMISSION.ASSIGN_LESSONS,
    ORG_PERMISSION.VIEW_PROGRESS,
    ORG_PERMISSION.VIEW_AS_LEARNER,
  ],
  [ORG_ROLE.LEARNER]: [],
};
