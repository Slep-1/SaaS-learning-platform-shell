import { clerkClient } from '@clerk/nextjs/server';
import { ORG_ROLE } from '@/types/Auth';

export type OrgLearner = {
  id: string;
  name: string;
};

export async function getOrgLearners(orgId: string): Promise<OrgLearner[]> {
  const client = await clerkClient();
  const memberships = await client.organizations.getOrganizationMembershipList({
    organizationId: orgId,
  });

  return memberships.data
    .filter(membership => membership.role === ORG_ROLE.LEARNER)
    .map((membership) => {
      const id = membership.publicUserData?.userId ?? '';
      const name = [membership.publicUserData?.firstName, membership.publicUserData?.lastName]
        .filter(Boolean)
        .join(' ') || membership.publicUserData?.identifier || 'Learner';

      return { id, name };
    })
    .filter(learner => learner.id !== '');
}
